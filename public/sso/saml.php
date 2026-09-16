<?php
require_once '../../vendor/autoload.php';
require_once '../../bootstrap.php';
require_once 'utils.php';
require_once 'users.php';

\SimpleSAML\Configuration::setConfigDir(__DIR__ . '/../../simplesaml/config');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$auth = new SimpleSAML\Auth\Simple('prod-sp');
$auth->requireAuth();
$attrs  = $auth->getAttributes();
$nameId = $auth->getAuthData('saml:sp:NameID');

$actualUrl = getActualUrl();

$first = fn($k) => isset($attrs[$k][0]) ? $attrs[$k][0] : null;

$userId = $first('eduPersonUniqueId');
if (!$userId && $nameId) {
    $userId = $nameId->getValue();
}

if (empty($userId)) {
    error_log('SAML Luxembourg: aucun identifiant utilisateur reçu (eduPersonUniqueId et NameID absents)');
    http_response_code(500);
    exit("Une erreur est survenue lors de l'identification. Si le problème persiste, contactez le support.");
}

//	MEN-CurrentStudentAssignments 	MEN-CurrentTeachingAssignments 	MEN-CurrentOtherAssignments 	MEN-ClassAssignment
//exemple 1 	2025-2026:ENSA:1GSI:1GSI12::ENSA1:1GSI12:T: 	2025-2026:LBV:6G:6-7:DIGSC::6G3 	2025-2026:SNJ:SNJ:Stagiaire - Fonctionnaire A1::CLAURIVE:: 	LGK:4GT2S
//exemple 2 	2025-2026:LNB:7P:7P1::ALLIANCE:7P1:: 	2025-2026:EP-DIPP-CENT:Cycle 3.2:Cycle 3.2 A:DR03:TIT 	2025-2026:EP-DIFF-CENT::EF-INFOR:DR04: 	LJBM:7G4
//Explication des données, exemple: 	Année scolaire:École/Lycée:Année d'études:Classe:Alias classe:Annexe:Code classe:Terminale 	Année scolaire:Administration/École:Année d'étude:Classe:Direction:Titulaire de la class 	Année scolaire:Administration:Service:Fonction:Lieu de travail 1:Lieu de travail 2: 	École/Lycée:Alias Classe
$user = [
    'email' => $userId . '@luxsaml.com',
    'givenName' => $first('givenName'),
    'sn' => $first('snInitial') ?? '',
    'name' => $first('givenName') . ' ' . ($first('snInitial') ?? ''),
    'MEN-Affilation' => $first('MEN-Affilation'),
    'idP' => $first('IdP'),
    'MEN-CurrentStudentAssignments' => $first('MEN-CurrentStudentAssignments') ?? '',
    'MEN-CurrentTeachingAssignments' => $first('MEN-CurrentTeachingAssignments') ?? '',
    'MEN-CurrentOtherAssignments' => $first('MEN-CurrentOtherAssignments') ?? '',
    'MEN-ClassAssignment' => $first('MEN-ClassAssignment') ?? '',
];

$formattedUser = formatUserData($user, 'saml');

ensureAppSession();
unset($_SESSION['backurl']);
$isStudent = str_contains($user['MEN-Affilation'] ?? '', 'STUDENT');
if (!$isStudent) {
    $backurl = sanitizeBackurl($_GET['backurl'] ?? 'vittascience.com/ia/');
    if ($backurl !== '') {
        $_SESSION['backurl'] = $backurl;
    }
}

manageUserFromSSO($entityManager, $formattedUser, $actualUrl, 'saml');
die();