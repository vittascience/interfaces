<?php

use User\Entity\Regular;
use Aiken\i18next\i18next;
use User\Entity\User;
use Database\DataBaseManager;
use Classroom\Entity\Groups;
use Classroom\Entity\UsersLinkGroups;
use User\Entity\SamlUserConnection;
use User\Entity\UserConnectionHistory;


require_once '../../simplesaml/lib/_autoload.php';
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
                'given_name' => $userData['givenName'] ?? null,
                'family_name' => $userData['surname'] ?? null,
                'name' => $userData['displayName'] ?? null,
                'picture' => null,
            ];
        case 'apple':
            return [
                'email' => $userData['email'] ?? null,
                'given_name' => $userData['name']['firstName'] ?? null,
                'family_name' => $userData['name']['lastName'] ?? null,
                'name' => ($userData['name']['firstName'] ?? '') . ' ' . ($userData['name']['lastName'] ?? null),
                'picture' => null,
            ];
        case 'saml':
            return [
                'email' => $userData['email'] ?? null,
                'given_name' => $userData['givenName'] ?? null,
                'family_name' => $userData['sn'] ?? null,
                'name' => ($userData['givenName'] ?? '') . ' ' . ($userData['sn'] ?? null),
                'picture' => null,
                'MEN-Affilation' => $userData['MEN-Affilation'] ?? null,
                'idP' => $userData['idP'] ?? null,
            ];
        default:
            return null;
    }
}


function triggerConnection($entityManager = null, $id = null) {
    $results = getUserConnexionDetails();

    if ($entityManager === null) {
        global $entityManager;
    }

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
    $userRegular = new Regular($legacyUser, $userData['email'], null, null, false, false, null, null, true, false, false, false, $confirmationToken);
    $userRegular->setUser($legacyUser);
    $userRegular->setEmail($userData['email']);
    $userRegular->setFromSso($ssoDetails);
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

function manageStudentsFromSAML($legacyUser)
{
    $_SESSION["id"] = $legacyUser->getId();
    $_SESSION["token"] = createToken($legacyUser->getId());


    $_SESSION['finalizedRegistration'] = true;
    $_SESSION['studentSaml'] = true;
    $_SESSION['originalId'] = $legacyUser->getId();
    $_SESSION['originalToken'] = createToken($legacyUser->getId());
    session_write_close();

    clearSessionData();
    echo json_encode(["status" => "success", "message" => i18next::getTranslation("sso.messages.success"), "redirect_to" => "https://vittascience.com/classroom-dashboard"]);
    exit;
}

function manageTeachersFromSAML($entityManager, $user)
{
    $luxembourgGrp = $entityManager->getRepository(Groups::class)->findOneBy(['name' => 'Licences Luxembourg']);
    if (!$luxembourgGrp) {
        echo i18next::getTranslation("sso.messages.groupNotFound");
        exit;
    }

    try {
        checkGroupLimits($entityManager, $luxembourgGrp);
        $UsersLinkGroups = new UsersLinkGroups();
        $UsersLinkGroups->setGroup($luxembourgGrp);
        $UsersLinkGroups->setUser($user);
        $UsersLinkGroups->setRights(0);

        $entityManager->persist($UsersLinkGroups);
        $entityManager->flush();
    } catch (Exception $e) {
        manageErrorReportToSupport($e->getMessage(), $user->getEmail());
        echo i18next::getTranslation("sso.messages.errorAddingUserToGroup");
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

    // if group limit < 100 mail to contact
    if ($maxUsers - count($currentUserCount) < 100) {
        $soonLimited = true;
    } else {
        $soonLimited = false;
    }

    if ($soonLimited) {
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
            error_log('SSP cleanup error: '.$e->getMessage());
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
    $userExist = $entityManager->getRepository(Regular::class)->findOneBy(['email' => $formatedUserData['email']]);

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
    $_SESSION["id"]    = $userRegular->getUser()->getId();
    $_SESSION["token"] = createToken($userRegular->getUser()->getId());
    if (strcasecmp($sso, 'saml') === 0) {
        $_SESSION['luxSamlSession'] = true;
        $when = new \DateTime('now');
        $legacyUser = $entityManager->find(User::class, $userRegular->getUser()->getId());
        if ($legacyUser) {
            $entityManager->getRepository(SamlUserConnection::class)->trackLogin($legacyUser, $when);
        }

        if (str_contains($storedFrom, 'STUDENT')) {
            $_SESSION['studentSaml'] = true;
            $_SESSION['finalizedRegistration'] = true;
            $_SESSION['originalId'] = $_SESSION["id"];
            $_SESSION['originalToken'] = $_SESSION["token"];
        }
    }
    triggerConnection($entityManager, $userRegular->getUser()->getId());

    session_write_close();
    echo i18next::getTranslation("sso.messages.success");

    if ($_SESSION['studentSaml'] === true) {
        header("Location: https://vittascience.com/classroom-dashboard");
        exit;
    }
    redirectTo($actualUrl);
    exit;
}



function redirectTo($actualUrl, $cgu = false)
{
    $cguParam = $cgu ? (str_contains($actualUrl, '?') ? '&cgu=1' : '?cgu=1') : '';
    if (!empty($_SESSION['backurl'])) {
        header("refresh:1;url=$actualUrl" . $_SESSION['backurl'] . $cguParam);
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
        echo i18next::getTranslation("sso.messages.emptyData");
        exit;
    }

    if (empty($sso)) {
        echo i18next::getTranslation("sso.messages.emptySSO");
        exit;
    }

    try {
        $acceptedSSO = ['google', 'microsoft', 'apple', 'saml'];
        if (!in_array($sso, $acceptedSSO)) {
            echo i18next::getTranslation("sso.messages.unknownSSO");
            exit;
        }


        $legacyUser = createUserFromSSO($formatedUserData, $entityManager);
        $userRegular = createRegularFromSSO($legacyUser, $formatedUserData, $entityManager, $sso);
        triggerConnection($entityManager, $legacyUser->getId());

        if ($sso === 'saml') {
            $when = new \DateTime('now');
            $entityManager->getRepository(SamlUserConnection::class)->trackLogin($legacyUser, $when);
        }

        if ($sso === "saml" && str_contains($formatedUserData['MEN-Affilation'], "STUDENT")) {
            manageStudentsFromSAML($legacyUser);
            exit;
        }

        // should be AL-TEACHER but let TEACHER for security
        if ($sso === "saml" && (str_contains($formatedUserData['MEN-Affilation'], "TEACHER") || str_contains($formatedUserData['MEN-Affilation'], "OTHER"))) {
            manageTeachersFromSAML($entityManager, $legacyUser);
        }

        if (isset($_POST['newsletter']) && $sso != 'saml') {
            activateMailerLiteForUser($formatedUserData['email'], $formatedUserData['given_name'], true);
        }

        $_SESSION["id"] = $legacyUser->getId();
        $_SESSION["token"] = createToken($legacyUser->getId());

        clearSessionData();
        echo json_encode(["status" => "success", "message" => i18next::getTranslation("sso.messages.success"), "redirect_to" => $actualUrl]);
        exit;
    } catch (Exception $e) {
        if ($sso === 'saml') {
            error_log('SSO SAML registration error: '.$e->getMessage());
        } else {
            manageErrorReportToSupport($e->getMessage(), $formatedUserData['email']);
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
}
