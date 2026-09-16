<?php

use User\Entity\Regular;
use Aiken\i18next\i18next;
use User\Entity\User;
use Database\DataBaseManager;
use Classroom\Entity\Groups;
use Classroom\Entity\UsersLinkGroups;
use User\Entity\SamlUserConnection;
use User\Entity\UserConnectionHistory;


require_once '../../vendor/autoload.php';
require_once '../../bootstrap.php';
require_once 'utils.php';


if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


const MAX_PICTURE_LENGTH = 240;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['terms'])) {
    finalizeRegistration();
    exit;
}

function formatUserData($userData, $sso)
{
    switch ($sso) {
        case 'google':
            return [
                'email' => $userData['email'],
                'given_name' => $userData['given_name'],
                'family_name' => $userData['family_name'],
                'name' => $userData['name'],
                'picture' => $userData['picture'],
            ];
        case 'microsoft':
            return [
                'email' => $userData['mail'] ?? null,
                'given_name' => $userData['givenName'] ?? "firstname",
                'family_name' => $userData['surname'] ?? "lastname",
                'name' => $userData['displayName'] ?? "username",
                'picture' => null,
            ];
        case 'apple':
            return [
                'email' => $userData['email'] ?? null,
                'given_name' => $userData['name']['firstName'] ?? "firstname",
                'family_name' => $userData['name']['lastName'] ?? "lastname",
                'name' => ($userData['name']['firstName'] ?? "firstname") . ' ' . ($userData['name']['lastName'] ?? "lastname"),
                'picture' => null,
            ];
        case 'saml':
            return [
                'email' => $userData['email'] ?? null,
                'given_name' => $userData['givenName'] ?? "firstname",
                'family_name' => $userData['sn'] ?? "lastname",
                'name' => ($userData['givenName'] ?? "firstname") . ' ' . ($userData['sn'] ?? "lastname"),
                'picture' => null,
                'MEN-Affilation' => $userData['MEN-Affilation'] ?? null,
                'idP' => $userData['idP'] ?? null,
                'MEN-CurrentStudentAssignments' => $userData['MEN-CurrentStudentAssignments'] ?? '',
                'MEN-CurrentTeachingAssignments' => $userData['MEN-CurrentTeachingAssignments'] ?? '',
                'MEN-CurrentOtherAssignments' => $userData['MEN-CurrentOtherAssignments'] ?? '',
                'MEN-ClassAssignment' => $userData['MEN-ClassAssignment'] ?? '',
            ];
        default:
            return null;
    }
}


function triggerConnection($entityManager, $id = null) {
    $results = getUserConnexionDetails();

    $idUser = isset($_SESSION['id']) ? intval($_SESSION['id']) : null;
    if ($id !== null) {
        $idUser = intval($id);
    }
    if (!$idUser) {
        return ['error' => 'ID utilisateur manquant'];
    }

    $login = new UserConnectionHistory();
    $login->setUserId($idUser);
    $login->setTimestamp((new DateTime('now', new DateTimeZone('Europe/Luxembourg'))));
    $login->setDevice($_SERVER['HTTP_USER_AGENT'] ?? null);
    $login->setCountry($results['country_code'] ?? null);
    $login->setIp($results['ip'] ?? null);

    $entityManager->persist($login);
    $entityManager->flush();
}


function createUserFromSSO($userData, $entityManager)
{
    $anonymousTranslation = i18next::getTranslation("sso.words.anonymous");
    $userTranslation = i18next::getTranslation("sso.words.user");

    $user = new User();
    $substituteIcon = getRandomIcon();
    $user->setFirstname(!empty($userData['given_name']) ? $userData['given_name'] : $userTranslation);
    $user->setSurname(!empty($userData['family_name']) ? $userData['family_name'] : $anonymousTranslation);
    $user->setPseudo(!empty($userData['name']) ? $userData['name'] : $anonymousTranslation . " " . $userTranslation);
    $pictureToUse = $substituteIcon;
    if (!empty($userData['picture']) && strlen($userData['picture']) < MAX_PICTURE_LENGTH) {
        $pictureToUse = $userData['picture'];
    }
    $user->setPicture($pictureToUse);
    $randomPassword = bin2hex(random_bytes(10));
    $passwordHash = password_hash($randomPassword, PASSWORD_BCRYPT);
    $user->setPassword($passwordHash);
    $entityManager->persist($user);
    $entityManager->flush();

    return $user;
}

function createRegularFromSSO($legacyUser, $userData, $entityManager, $sso = null)
{
    $ssoDetails = $sso;
    if ($sso === 'saml') {
        $ssoDetails = 'SAML-' . ($userData['MEN-Affilation'] ?? '') . '-' . ($userData['idP'] ?? 'UnknownProvider');
    }
    $confirmationToken = bin2hex(random_bytes(16));

    $userRegular = new Regular();
    $userRegular->setUser($legacyUser);
    $userRegular->setEmail($userData['email']);
    $userRegular->setFromSso($ssoDetails);
    $userRegular->setConfirmationToken($confirmationToken);
    $userRegular->setEmailConfirmed(true);

    $entityManager->persist($userRegular);
    $entityManager->flush();

    return [
        'isUserAdded' => true,
        "userRegular" => $userRegular,
    ];
}

function createToken($id)
{
    try {
        $successDeletion = DataBaseManager::getSharedInstance()->exec("DELETE FROM connection_tokens WHERE user_ref = ?", [$id]);
        if (!$successDeletion) {
            return false;
        }

        $token = bin2hex(random_bytes(32));
        $res = DataBaseManager::getSharedInstance()->exec("INSERT INTO connection_tokens (token,user_ref) VALUES (?, ?)", [$token, $id]);
        if ($res) {
            return $token;
        }
    } catch (\Exception $e) {
        return false;
    }

    return false;
}

function manageStudentsFromSAML($legacyUser, $ssoData = null)
{
    $token = createToken($legacyUser->getId());
    $_SESSION["id"] = $legacyUser->getId();
    $_SESSION["token"] = $token;
    $_SESSION['finalizedRegistration'] = true;

    // Déterminer et stocker le niveau de liberté étudiant (1..3)
    try {
        $raw = null;
        if (is_array($ssoData) && isset($ssoData['MEN-CurrentStudentAssignments'])) {
            $raw = $ssoData['MEN-CurrentStudentAssignments'];
        } elseif (isset($_SESSION['ssoData']) && is_array($_SESSION['ssoData']) && isset($_SESSION['ssoData']['MEN-CurrentStudentAssignments'])) {
            $raw = $_SESSION['ssoData']['MEN-CurrentStudentAssignments'];
        }

        $level = assignStudentFreedomLevel($raw);
        $_SESSION['studentSamlLevel'] = $level;
        error_log('SAML student freedom level resolved for user ' . $legacyUser->getId() . ': ' . json_encode(['raw' => $raw, 'level' => $level]));
    } catch (Throwable $e) {
        error_log('Error while assigning student freedom level: ' . $e->getMessage());
    }

    $_SESSION['studentSaml'] = true;
    $_SESSION['originalId'] = $legacyUser->getId();
    $_SESSION['originalToken'] = $token;
    session_write_close();
    echo json_encode(["status" => "success", "message" => i18next::getTranslation("sso.messages.success"), "redirect_to" => "https://vittascience.com/classroom-dashboard"]);
    exit;
}

function manageTeachersFromSAML($entityManager, $user, $ssoData = null)
{
    try {
        $ssoSource = is_array($ssoData) ? $ssoData : (isset($_SESSION['ssoData']) && is_array($_SESSION['ssoData']) ? $_SESSION['ssoData'] : []);

        $teachingRaw = $ssoSource['MEN-CurrentTeachingAssignments'] ?? null;
        if (!empty($teachingRaw)) {
            $_SESSION['teacherSamlLevel'] = assignTeacherFreedomLevel($teachingRaw);
            $_SESSION['teacherSaml'] = true;
            error_log('SAML teacher freedom level resolved (first registration) for user ' . $user->getId() . ': ' . json_encode(['raw' => $teachingRaw, 'level' => $_SESSION['teacherSamlLevel']]));
        }

        $otherRaw = $ssoSource['MEN-CurrentOtherAssignments'] ?? null;
        if (!empty($otherRaw)) {
            $_SESSION['otherSamlLevel'] = assignOtherFreedomLevel($otherRaw);
            $_SESSION['otherSaml'] = true;
            error_log('SAML other freedom level resolved (first registration) for user ' . $user->getId() . ': ' . json_encode(['raw' => $otherRaw, 'level' => $_SESSION['otherSamlLevel']]));
        }
    } catch (\Throwable $e) {
        error_log('Error while assigning teacher/other freedom level on first registration: ' . $e->getMessage());
    }

    $luxembourgGrp = $entityManager->getRepository(Groups::class)->findOneBy(['name' => 'Licences Luxembourg']);
    if (!$luxembourgGrp) {
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.groupNotFound"), "redirect_to" => ""]);
        exit;
    }

    try {
        $limitCheck = checkGroupLimits($entityManager, $luxembourgGrp);
        if (!$limitCheck['status']) {
            error_log('SAML Luxembourg group limit reached: ' . $limitCheck['message']);
        }
        $UsersLinkGroups = new UsersLinkGroups();
        $UsersLinkGroups->setGroup($luxembourgGrp);
        $UsersLinkGroups->setUser($user);
        $UsersLinkGroups->setRights(0);

        $entityManager->persist($UsersLinkGroups);
        $entityManager->flush();
    } catch (Exception $e) {
        sendErrorReportToSupport($e->getMessage(), $user->getEmail());
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.errorAddingUserToGroup"), "redirect_to" => ""]);
        exit;
    }
}


function checkGroupLimits($entityManager, Groups $group): array
{
    $maxUsers = (int)$group->getMaxTeachers();

    if ($maxUsers === -1) {
        return ["status" => true, "message" => "Group has no user limit."];
    }

    $currentUserCount = $entityManager->getRepository(UsersLinkGroups::class)->findBy(['group' => $group->getId()]);
    if (count($currentUserCount) >= $maxUsers) {
        return ["status" => false, "message" => i18next::getTranslation("sso.messages.groupUserLimitReached")];
    }

    if ($maxUsers - count($currentUserCount) < 100) {
        $groupName = $group->getName();
        $emailSubject = "Group User Limit Warning for Group: $groupName";
        $emailBody = "The group '$groupName' is approaching its user limit of $maxUsers users. Current user count: " . count($currentUserCount) . ".";
        sendMailToContact($emailSubject, $emailBody);
    }

    return ["status" => true, "message" => "Group user limit not reached."];
}


function ensureAppSession() {
    if (class_exists('\SimpleSAML\Session')) {
        try {
            $ssp = \SimpleSAML\Session::getSessionFromRequest();
            if ($ssp !== null) {
                $ssp->cleanup();
            }
        } catch (\Throwable $e) {
            error_log('SSP cleanup error: ' . $e->getMessage());
        }
    }

    if (session_status() === PHP_SESSION_ACTIVE) {
        session_write_close();
    }

    session_name('PHPSESSID');
    session_start();
}


function manageUserFromSSO($entityManager, $formatedUserData, $actualUrl, $sso)
{
    initTranslator();

    $email = $formatedUserData['email'] ?? null;
    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.emptyEmail"), "redirect_to" => ""]);
        exit;
    }

    $userExist = $entityManager->getRepository(Regular::class)->findOneBy(['email' => $email]);

    if (!$userExist) {
        if (strcasecmp($sso, 'saml') === 0) {
            ensureAppSession();
        } else {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }
        }

        $_SESSION['ssoData'] = $formatedUserData;
        $_SESSION['showCGUModal'] = false;
        $_SESSION['sso'] = $sso;
        $_SESSION['finalizedRegistration'] = false;
        $_SESSION['actualUrl'] = $actualUrl;

        session_write_close();
        redirectTo($actualUrl, true);
        exit();
    }

    $storedFrom = (string) $userExist->isFromSSO();
    $isOk = false;
    if (strcasecmp($sso, 'saml') === 0) {
        $isOk = (strncasecmp($storedFrom, 'SAML', 4) === 0) && (strlen($storedFrom) === 4 || $storedFrom[4] === '-');
    } else {
        $isOk = (strcasecmp($storedFrom, $sso) === 0);
    }

    if (!$isOk) {
        echo i18next::getTranslation("sso.messages.accountWithEmailAlreadyExists");
        session_write_close();
        redirectTo($actualUrl);
        exit;
    }

    ensureAppSession();
    $userRegular = $userExist;
    $_SESSION["id"] = $userRegular->getUser()->getId();
    $_SESSION["token"] = createToken($userRegular->getUser()->getId());

    if (strcasecmp($sso, 'saml') === 0) {
        $_SESSION['luxSamlSession'] = true;
        $when = new \DateTime('now');
        $legacyUser = $entityManager->find(User::class, $userRegular->getUser()->getId());
        if ($legacyUser) {
            $entityManager->getRepository(SamlUserConnection::class)->trackLogin($legacyUser, $when);
        }

        $ssoSource = is_array($formatedUserData) ? $formatedUserData : (isset($_SESSION['ssoData']) && is_array($_SESSION['ssoData']) ? $_SESSION['ssoData'] : []);

        if (str_contains($storedFrom, 'STUDENT')) {
            $_SESSION['studentSaml'] = true;
            $_SESSION['finalizedRegistration'] = true;
            $_SESSION['originalId'] = $_SESSION["id"];
            $_SESSION['originalToken'] = $_SESSION["token"];

            try {
                $studentRaw = $ssoSource['MEN-CurrentStudentAssignments'] ?? null;
                if (!empty($studentRaw)) {
                    $_SESSION['studentSamlLevel'] = assignStudentFreedomLevel($studentRaw);
                    error_log('SAML student freedom level resolved (login) for user ' . $_SESSION["id"] . ': ' . json_encode(['raw' => $studentRaw, 'level' => $_SESSION['studentSamlLevel']]));
                }
            } catch (\Throwable $e) {
                error_log('Error while assigning student freedom level on login: ' . $e->getMessage());
            }
        }

        // Calcul teacher/other levels
        try {
            $teachingRaw = $ssoSource['MEN-CurrentTeachingAssignments'] ?? null;
            if (!empty($teachingRaw)) {
                $_SESSION['teacherSamlLevel'] = assignTeacherFreedomLevel($teachingRaw);
                $_SESSION['teacherSaml'] = true;
                error_log('SAML teacher freedom level resolved for user ' . $_SESSION["id"] . ': ' . json_encode(['raw' => $teachingRaw, 'level' => $_SESSION['teacherSamlLevel']]));
            }

            $otherRaw = $ssoSource['MEN-CurrentOtherAssignments'] ?? null;
            if (!empty($otherRaw)) {
                $_SESSION['otherSamlLevel'] = assignOtherFreedomLevel($otherRaw);
                $_SESSION['otherSaml'] = true;
                error_log('SAML other freedom level resolved for user ' . $_SESSION["id"] . ': ' . json_encode(['raw' => $otherRaw, 'level' => $_SESSION['otherSamlLevel']]));
            }
        } catch (\Throwable $e) {
            error_log('Error while assigning teacher/other freedom level: ' . $e->getMessage());
        }
    }

    triggerConnection($entityManager, $userRegular->getUser()->getId());

    $isStudentSaml = ($_SESSION['studentSaml'] ?? false) === true;
    session_write_close();

    if ($isStudentSaml) {
        header("Location: https://vittascience.com/classroom-dashboard");
        exit;
    }
    redirectTo($actualUrl);
    exit;
}


function redirectTo($actualUrl, $cgu = false)
{
    $cguParam = $cgu ? (str_contains($actualUrl, '?') ? '&cgu=1' : '?cgu=1') : '';
    $backurl = sanitizeBackurl($_SESSION['backurl'] ?? '');
    if ($backurl !== '') {
        header("refresh:1;url=$actualUrl" . $backurl . $cguParam);
    } else {
        header("refresh:1;url=$actualUrl/" . $cguParam);
    }
}

function applyEncodeOfIncomingData($dataArray)
{
    $valueToCheck = ['given_name', 'family_name', 'name'];

    foreach ($dataArray as $key => $value) {
        if (is_array($value)) {
            $dataArray[$key] = applyEncodeOfIncomingData($value);
        } else {
            if (in_array($key, $valueToCheck)) {
                $dataArray[$key] = mb_convert_encoding($value, 'UTF-8', 'ISO-8859-1');
            }
        }
    }

    return $dataArray;
}


function finalizeRegistration()
{
    initTranslator();

    global $entityManager;
    $formatedUserData = isset($_SESSION['ssoData']) ? $_SESSION['ssoData'] : [];
    $sso = isset($_SESSION['sso']) ? $_SESSION['sso'] : '';
    $actualUrl = isset($_SESSION['actualUrl']) ? $_SESSION['actualUrl'] : '';

    if (empty($formatedUserData)) {
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.emptyData"), "redirect_to" => ""]);
        exit;
    }

    if (empty($sso)) {
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.emptySSO"), "redirect_to" => ""]);
        exit;
    }

    $email = $formatedUserData['email'] ?? null;
    if (empty($email)) {
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.emptyEmail"), "redirect_to" => ""]);
        exit;
    }

    try {
        $acceptedSSO = ['google', 'microsoft', 'apple', 'saml'];
        if (!in_array($sso, $acceptedSSO)) {
            echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.unknownSSO"), "redirect_to" => ""]);
            exit;
        }

        $legacyUser = createUserFromSSO($formatedUserData, $entityManager);
        $userRegular = createRegularFromSSO($legacyUser, $formatedUserData, $entityManager, $sso);
        triggerConnection($entityManager, $legacyUser->getId());

        if ($sso === 'saml') {
            $when = new \DateTime('now');
            $entityManager->getRepository(SamlUserConnection::class)->trackLogin($legacyUser, $when);
        }

        if ($sso === "saml" && str_contains($formatedUserData['MEN-Affilation'] ?? '', "STUDENT")) {
            manageStudentsFromSAML($legacyUser, $formatedUserData);
            exit;
        }

        if ($sso === "saml" && (str_contains($formatedUserData['MEN-Affilation'] ?? '', "TEACHER") || str_contains($formatedUserData['MEN-Affilation'] ?? '', "OTHER"))) {
            manageTeachersFromSAML($entityManager, $legacyUser, $formatedUserData);
        }

        if (isset($_POST['newsletter']) && $sso != 'saml') {
            activateBrevoForUser($formatedUserData['email'], $formatedUserData['given_name'], true);
        }

        $_SESSION["id"] = $legacyUser->getId();
        $_SESSION["token"] = createToken($legacyUser->getId());

        $backurl = sanitizeBackurl($_SESSION['backurl'] ?? '');
        clearSessionData();
        echo json_encode(["status" => "success", "message" => i18next::getTranslation("sso.messages.success"), "redirect_to" => $actualUrl . ($backurl !== '' ? $backurl : '/')]);
        exit;
    } catch (Exception $e) {
        if ($sso === 'saml') {
            error_log('SSO SAML registration error: ' . $e->getMessage());
        } else {
            sendErrorReportToSupport($e->getMessage(), $formatedUserData['email']);
        }

        clearSessionData();
        $actualDomain = $_SERVER['HTTP_HOST'];
        $errorPageUrl = "https://$actualDomain/public/errPage.php?code=500&isSSO=true";
        echo json_encode(["status" => "error", "message" => i18next::getTranslation("sso.messages.error"), "redirect_to" => $errorPageUrl]);
        exit;
    }
}

function clearSessionData() {
    unset($_SESSION['ssoData']);
    unset($_SESSION['sso']);
    unset($_SESSION['actualUrl']);
    unset($_SESSION['backurl']);
}


function detectFreedomLevel(string $raw, array $lvl1, array $lvl2, array $lvl3, string $splitPattern = '/[:;|,\/\s]+/', string $context = 'unknown'): int
{
    $tokens = preg_split($splitPattern, $raw);
    $detected = [];

    foreach ($tokens as $t) {
        $t = trim($t);
        if ($t === '') continue;

        // Ignorer les années scolaires (4 chiffres)
        if (preg_match('/^\d{4}$/', $t)) continue;
        if (preg_match('/\b(19|20)\d{2}\b/', $t)) continue;

        // Tokens purement numériques courts (1–2 chiffres) → interprétés comme années d'études
        if (preg_match('/^\d{1,2}$/', $t)) {
            $n = (int) $t;
            // Années d'études MEN : 1–4 → primaire bas, 5–8 → intermédiaire, 9–13 → secondaire
            if ($n >= 1 && $n <= 4)  { $detected[] = 1; continue; }
            if ($n >= 5 && $n <= 8)  { $detected[] = 2; continue; }
            if ($n >= 9 && $n <= 13) { $detected[] = 3; continue; }
            continue;
        }

        $matched = false;
        foreach ($lvl3 as $re) {
            if (preg_match($re, $t)) { $detected[] = 3; $matched = true; break; }
        }
        if ($matched) continue;

        foreach ($lvl2 as $re) {
            if (preg_match($re, $t)) { $detected[] = 2; $matched = true; break; }
        }
        if ($matched) continue;

        foreach ($lvl1 as $re) {
            if (preg_match($re, $t)) { $detected[] = 1; break; }
        }
    }

    if (empty($detected)) {
        error_log('detectFreedomLevel [' . $context . ']: no pattern matched for raw="' . $raw . '", defaulting to 2');
        return 2;
    }

    return (int) min($detected);
}


function assignStudentFreedomLevel($studentLevels = null): int
{
    $raw = is_array($studentLevels) ? implode(' ', $studentLevels) : (string) $studentLevels;
    $raw = trim($raw);

    if ($raw === '') {
        error_log('assignStudentFreedomLevel: empty input, defaulting to 2');
        return 2;
    }

    // Niveau 1 : maternelle + primaire bas (M1–M2, P1–P4), âge 4–9
    $lvl1 = [
        '/\bM[12]\b/i',
        '/\bP[1-4]\b/i',
    ];

    // Niveau 2 : primaire haut + début secondaire (P5, S1–S3, 1G–3G), âge 10–13
    $lvl2 = [
        '/\bP5\b/i',
        '/\bS[1-3]\b/i',
        '/\b[1-3]G\b/i',
        '/\b[1-3]I(?!EC)\b/i',
        '/\b[5-7]IEC\b/i',
    ];

    // Niveau 3 : secondaire supérieur / voies pro, âge 14+
    $lvl3 = [
        '/\bCCP\b/i',
        '/\bDAP\b/i',
        '/\b[1-3]T\b/i',
        '/\bS[4-9]\b/i',
        '/\b[4-9]G\b/i',
        '/\b[4-9]I(?!EC)\b/i',
        '/\b[1-4]IEC\b/i',
        '/\b[5-7]P\b/i',
        '/\b[1-9]AD\b/i',
        '/\bGSI\b/i',
        '/\b[12]IB\b/i',
    ];

    return detectFreedomLevel($raw, $lvl1, $lvl2, $lvl3, '/[:;|,\/\s]+/', 'student');
}


function assignTeacherFreedomLevel($teachingLevels = null): int
{
    $raw = is_array($teachingLevels) ? implode(' ', $teachingLevels) : (string) $teachingLevels;
    $raw = trim($raw);

    if ($raw === '') {
        error_log('assignTeacherFreedomLevel: empty input, defaulting to 2');
        return 2;
    }

    // Niveau 1 : maternelle / primaire bas
    $lvl1 = [
        '/\bM[12]\b/i',
        '/\bP[1-4]\b/i',
        '/\bCycle[- ]?[12]\b/i',
    ];

    // Niveau 2 : primaire haut / début secondaire
    $lvl2 = [
        '/\bP5\b/i',
        '/\bCycle[- ]?3(?:\.\d)?\b/i', // Cycle 3 ou Cycle 3.2
        '/\bS[1-3]\b/i',
        '/\b[1-3]G\b/i',
        '/\b[1-3]I(?!EC)\b/i',
        '/\b[5-7]IEC\b/i',
        '/\bDR0[1-2]\b/i',
    ];

    // Niveau 3 : secondaire supérieur / voies pro
    $lvl3 = [
        '/\bCCP\b/i',
        '/\bDAP\b/i',
        '/\b[1-3]T\b/i',
        '/\bS[4-9]\b/i',
        '/\b[4-9]G\b/i',
        '/\b[4-9]I(?!EC)\b/i',
        '/\b[1-4]IEC\b/i',
        '/\b[5-7]P\b/i',
        '/\b[12]IB\b/i',
        '/\bCycle[- ]?4\b/i',
        '/\bDR0[3-9]\b/i',
        '/\bDIGSC\b/i',
        '/\bTITULAIRE\b/i',
    ];

    // On pré-traite les plages du type "6-7" avant tokenisation
    $raw = preg_replace_callback('/\b(\d{1,2})-(\d{1,2})\b/', function ($m) {
        // Remplacer la plage par la valeur la plus haute (le plus permissif pour un prof)
        return (string) max((int)$m[1], (int)$m[2]);
    }, $raw);

    return detectFreedomLevel($raw, $lvl1, $lvl2, $lvl3, '/[:;|,\/\s]+/', 'teacher');
}


function assignOtherFreedomLevel($otherLevels = null): int
{
    $raw = is_array($otherLevels) ? implode(' ', $otherLevels) : (string) $otherLevels;
    $raw = trim($raw);

    if ($raw === '') {
        error_log('assignOtherFreedomLevel: empty input, defaulting to 2');
        return 2;
    }

    // Niveau 1 : personnel lié à la petite enfance / primaire bas
    $lvl1 = [
        '/\bMAT\b/i',
        '/\bCRECHE\b/i',
        '/\bENFANCE\b/i',
        '/\bPRIM\b/i',
        '/\bEP-DIFF(?!-CENT)\b/i',
        '/\bEPDIFF\b/i',
        '/\bSEA\b/i',
    ];

    // Niveau 2 : services mixtes / intermédiaires
    $lvl2 = [
        '/\bSNJ\b/i',
        '/\bJEUN\b/i',
        '/\bSTAGIAIRE\b/i',
        '/\bFONCTIONNAIRE[- ]?A1\b/i', // FIX : "A1" seul trop générique
        '/\bEF\b/i',
        '/\bDR0[1-2]\b/i',
    ];

    // Niveau 3 : admin supérieur / secondaire / spécialisé
    $lvl3 = [
        '/\bEP-DIFF-CENT\b/i',
        '/\bEF-INFOR\b/i',
        '/\bLYC\b/i',
        '/\bSEC\b/i',
        '/\bADMIN\b/i',
        '/\bDIR\b/i',
        '/\bINSP\b/i',
        '/\bCENT\b/i',
        '/\bDR0[3-9]\b/i',
        '/\bFONCTIONNAIRE[- ]?A[2-5]\b/i', // FIX : grades supérieurs avec contexte
        '/\bCLAURIVE\b/i',
        '/\bFONCT\b/i',
    ];

    // pour préserver les tokens composés comme EP-DIFF-CENT, EF-INFOR
    return detectFreedomLevel($raw, $lvl1, $lvl2, $lvl3, '/[:;|,\/\s]+/', 'other');
}