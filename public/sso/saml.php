<?php
require_once '../../simplesaml/lib/_autoload.php';
require_once '../../bootstrap.php';
require_once 'utils.php';
require_once 'users.php';

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


$user = [
    'email' => $userId . '@luxsaml.com',
    'givenName' => $first('givenName'),
    'sn' => $first('snInitial') ?? '',
    'name' => $first('givenName') . ' ' . ($first('snInitial') ?? ''),
    'MEN-Affilation' => $first('MEN-Affilation'),
    'idP' => $first('IdP'),
];

$formattedUser = formatUserData($user, 'saml');
manageUserFromSSO($entityManager, $formattedUser, $actualUrl, 'saml');
die();