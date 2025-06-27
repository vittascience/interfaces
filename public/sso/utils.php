<?php

use Utils\Mailer;
use Aiken\i18next\i18next; 
use CoderCat\JWKToPEM\JWKConverter;
use MailerLiteApi\MailerLite;

function getActualUrl(): string 
{
    $host = $_SERVER['HTTP_HOST'];
    return "https://" . $host;
}

function getRandomIcon(): string
{
    $icons = [];
    for ($i = 1; $i <= 26; $i++) {
        $icons[] = "Icon-$i.svg";
    }

    $randomIndex = array_rand($icons);
    return $icons[$randomIndex];
}

function initTranslator() {
    $userLang = isset($_COOKIE['lng']) ? htmlspecialchars(strip_tags(trim($_COOKIE['lng']))) : 'fr';
    i18next::init($userLang, "../content/lang/__lng__/ns.json");
}

function manageErrorReportToSupport($message, $mail) {
    $emailTtemplateBody = "fr_defaultMailerTemplate";
    $emailSubject = "Un utilisateur a rencontré une erreur lors de la connexion SSO";
    $body = "L'utilisateur : $mail , a rencontré une erreur lors de la connexion SSO : $message";

    try {
        $emailSent = Mailer::sendMail("logs@vittascience.com", $emailSubject, $body, strip_tags($body), $emailTtemplateBody);
        if (!$emailSent) {
            exit("Une erreur est survenue, si le problème persiste, contactez le support technique. code A");
        }
    } catch (Exception $e) {
        exit("Une erreur est survenue, si le problème persiste, contactez le support technique. code B");
    }

    exit("Une erreur est survenue, si le problème persiste, contactez le support technique. code C");
}

function getApplePublicKeyPEM($kid): string {
    $jwksJson = file_get_contents('https://appleid.apple.com/auth/keys');
    $jwks = json_decode($jwksJson, true);

    if (!empty($jwks['keys'])) {
        foreach ($jwks['keys'] as $key) {
            if (isset($key['kid']) && $key['kid'] === $kid) {
                $jwkConverter = new JWKConverter();
                $publicKeyPEM = $jwkConverter->toPEM($key);
                return $publicKeyPEM;
            }
        }
    }
    showErrorWithCode(8);
}

function showErrorWithCode($code) {
    $actualUrl = getActualUrl();
    echo i18next::getTranslation("sso.messages.error");
    echo "code $code";
    header("refresh:3;url=$actualUrl");
    exit;
}

function activateMailerLiteForUser(string $email, string $firstName, bool $newsletter): array {
    $apiKey  = $_ENV['VS_SHOP_MAILERLITE_API_KEY'] ?? '';
    $groupId = '111807604';

    // Validation de base
    if (empty($apiKey)) {
        return ['success' => false, 'message' => 'Erreur interne : configuration manquante'];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'message' => "Email invalide : {$email}"];
    }

    $subscriber = [
        'email'  => $email,
        'fields' => [
            'name'       => $firstName,
            'newsletter' => $newsletter ? 1 : 0,
        ],
    ];

    try {
        $client = new MailerLite(['api_key' => $apiKey]);
        $response = $client->groups()->addSubscriber($groupId, $subscriber);

        return ['success' => true, 'message' => 'Abonné ajouté (ID '.$response->id.')'];

    } catch (\Throwable $e) {
        return ['success' => false, 'message' => 'Erreur inattendue lors de l’activation'];
    }
}

function updateMailerLiteForUser(string $email, bool $newsletter, string $firstName): array {
    $apiKey = $_ENV['VS_SHOP_MAILERLITE_API_KEY'] ?? '';

    // Validation de base
    if (empty($apiKey)) {
        return ['success' => false, 'message' => 'Erreur interne : configuration manquante'];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'message' => "Email invalide : {$email}"];
    }

    try {
        $client = new MailerLite(['api_key' => $apiKey]);
        $subscriberApi = $client->subscribers();

        $found = $subscriberApi->find($email);
        if (empty($found) || !isset($found->id)) {
            return ['success' => false, 'message' => "Aucun abonné trouvé pour {$email}"];
        }

        $updateData = [
            'fields' => [
                'name'       => $firstName,
                'newsletter' => $newsletter ? 1 : 0,
            ],
        ];
        $updated = $subscriberApi->update($found->id, $updateData);

        return ['success' => true, 'message' => 'Abonné mis à jour (ID '.$updated->id.')'];

    } catch (\Throwable $e) {
        return ['success' => false, 'message' => 'Erreur inattendue lors de la mise à jour'];
    }
}
