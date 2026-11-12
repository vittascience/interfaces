<?php

use League\OAuth2\Client\Provider\Google;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Aiken\i18next\i18next;

require_once '../../bootstrap.php';
require_once 'utils.php';
require_once 'users.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$isCallback = isset($_GET['code']) || isset($_GET['error']);
$isStart = $_SERVER['REQUEST_METHOD'] === 'POST' && !$isCallback;

if (!$isStart && !$isCallback) {
    ssoGoneResponse();
}

if ($isStart) {
    rememberBackurl($_POST['backurl'] ?? null);
}

$actualUrl = getActualUrl();
$googleProvider = new Google([
    'clientId'     => $_ENV['VS_SSO_GOOGLE_CLIENT_ID'],
    'clientSecret' => $_ENV['VS_SSO_GOOGLE_CLIENT_SECRET'],
    'redirectUri'  => $actualUrl . '/public/sso/google.php',
]);
$translatorInit = initTranslator();


if ($isStart) {
    $authUrl = $googleProvider->getAuthorizationUrl();
    $_SESSION['oauth2state'] = $googleProvider->getState();
    header('Location: ' . $authUrl);
    exit;
} else if (!isset($_GET['code']) || empty($_GET['state']) || ($_GET['state'] !== ($_SESSION['oauth2state'] ?? null))) {
    unset($_SESSION['oauth2state']);
    showErrorWithCode(7);
} else {
    try {
        $token = $googleProvider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        $user = $googleProvider->getResourceOwner($token);
        $userData = $user->toArray();
        $formatedUserData = formatUserData($userData, 'google');

        if ($userData['email_verified'] !== true) {
            echo i18next::getTranslation("sso.messages.emailNotVerified");
            header("refresh:3;url=$actualUrl");
        }

        manageUserFromSSO($entityManager, $formatedUserData, $actualUrl, 'google');
        die();
    } catch (IdentityProviderException $e) {
        exit($e->getMessage());
    }
}
