<?php

use Utils\Mailer;
use Aiken\i18next\i18next; 
use CoderCat\JWKToPEM\JWKConverter;
use Shop\Brevo;
use GeoIp2\Database\Reader;

function getActualUrl(): string 
{
    $allowedBaseDomains = [
        'vittascience.com',
    ];

    $host = $_SERVER['HTTP_HOST'] ?? '';
    $hostWithoutPort = strtolower(explode(':', $host)[0]);

    $isAllowed = false;
    foreach ($allowedBaseDomains as $domain) {
        if ($hostWithoutPort === $domain || str_ends_with($hostWithoutPort, '.' . $domain)) {
            $isAllowed = true;
            break;
        }
    }

    if (!$isAllowed) {
        error_log("getActualUrl: host non autorisé — " . $host);
        http_response_code(400);
        exit("Requête invalide.");
    }

    return "https://" . $host;
}

function sanitizeBackurl($backurl): string
{
    if (!is_string($backurl) || $backurl === '') {
        return '';
    }
    // Uniquement un chemin relatif au domaine, pour éviter tout open redirect
    if ($backurl[0] !== '/'
        || str_starts_with($backurl, '//')
        || str_contains($backurl, '\\')
        || str_contains($backurl, "\r")
        || str_contains($backurl, "\n")) {
        return '';
    }
    return $backurl;
}

function getRandomIcon(): string
{
    $icons = [];
    for ($i = 1; $i <= 26; $i++) {
        $icons[] = "users-icons/Icon-$i";
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

function sendErrorReportToSupport($message, $mail): void {
    $emailTtemplateBody = "fr_defaultMailerTemplate";
    $emailSubject = "Un utilisateur a rencontré une erreur lors de la connexion SSO";
    $body = "L'utilisateur : $mail , a rencontré une erreur lors de la connexion SSO : $message";
    try {
        Mailer::sendMail("logs@vittascience.com", $emailSubject, $body, strip_tags($body), $emailTtemplateBody);
    } catch (Exception $e) {
        error_log('sendErrorReportToSupport: failed to send email — ' . $e->getMessage());
    }
}


function sendMailToContact($subject, $body): bool {
    $emailTtemplateBody = "fr_defaultMailerTemplate";
    try {
        $emailSent = Mailer::sendMail("contact@vittascience.com", $subject, $body, strip_tags($body), $emailTtemplateBody);
        if (!$emailSent) {
            error_log("sendMailToContact: échec d'envoi — sujet: $subject");
            return false;
        }
    } catch (Exception $e) {
        error_log("sendMailToContact: exception — " . $e->getMessage());
        return false;
    }

    return true;
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
    echo i18next::getTranslation("sso.messages.error");
    echo "code $code";

    $actualDomain = $_SERVER['HTTP_HOST'];
    $errorPageUrl = "https://$actualDomain/public/errPage.php?code=$code&isSSO=true";
    header("Location: $errorPageUrl");
    exit;
}

function activateBrevoForUser(string $email, string $firstName, bool $newsletter): array {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'message' => "Email invalide : {$email}"];
    }

    try {
        $ok = Brevo::addContactToList($email, Brevo::LIST_ACCOUNTS, [
            'FIRSTNAME'  => $firstName,
            'NEWSLETTER' => (bool) $newsletter,
        ]);
        return $ok
            ? ['success' => true, 'message' => 'Contact ajouté à Brevo']
            : ['success' => false, 'message' => "Erreur lors de l'ajout du contact Brevo"];

    } catch (\Throwable $e) {
        return ['success' => false, 'message' => 'Erreur inattendue lors de l’activation'];
    }
}

function updateBrevoForUser(string $email, bool $newsletter, string $firstName): array {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['success' => false, 'message' => "Email invalide : {$email}"];
    }

    try {
        if (!Brevo::contactExists($email)) {
            return ['success' => false, 'message' => "Aucun contact trouvé pour {$email}"];
        }

        $ok = Brevo::updateContact($email, [
            'FIRSTNAME'  => $firstName,
            'NEWSLETTER' => (bool) $newsletter,
        ]);
        return $ok
            ? ['success' => true, 'message' => 'Contact mis à jour']
            : ['success' => false, 'message' => 'Erreur lors de la mise à jour du contact Brevo'];

    } catch (\Throwable $e) {
        return ['success' => false, 'message' => 'Erreur inattendue lors de la mise à jour'];
    }
}


function getClientIpRaw(): ?string {
    $candidates = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_REAL_IP',
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR'
    ];

    foreach ($candidates as $h) {
        if (!empty($_SERVER[$h])) {
            $val = $_SERVER[$h];
            $parts = array_map('trim', explode(',', $val));
            foreach ($parts as $ip) {
                if (strpos($ip, '::ffff:') === 0) {
                    $ip = substr($ip, 7);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
    }
    return null;
}


function anonymizeIp(string $ip, int $v4Mask = 24, int $v6Mask = 48): ?string {
    $bin = @inet_pton($ip);
    if ($bin === false) return null;

    $len = strlen($bin);
    $maskBits = ($len === 4) ? $v4Mask : $v6Mask;

    $fullBytes = intdiv($maskBits, 8);
    $remBits   = $maskBits % 8;

    $mask = str_repeat("\xFF", $fullBytes);
    if ($remBits > 0) {
        $mask .= chr((0xFF << (8 - $remBits)) & 0xFF);
    }
    $mask = str_pad($mask, $len, "\x00");

    $out = '';
    for ($i = 0; $i < $len; $i++) {
        $out .= chr(ord($bin[$i]) & ord($mask[$i]));
    }

    return inet_ntop($out) ?: null;
}

function getUserConnexionDetails(): array
{
    $ip = getClientIpRaw();
    $countryCode = null;
    $ipAnon = null;

    $mmdbPath = __DIR__ . '/../../bin/GeoLite2-Country.mmdb';

    if ($ip !== null) {
        $ipAnon = anonymizeIp($ip, 24, 48);
        $_SESSION['truncated_ip'] = $ipAnon;
    }

    if (file_exists($mmdbPath) && $ip !== null) {
        try {
            $reader = new Reader($mmdbPath);
            $record = $reader->country($ip);
            $countryCode = $record->country->isoCode ?? null;
        } catch (\Throwable $e) {
            error_log("GeoIP: Unexpected error - " . $e->getMessage());
        }
    }

    return [
        'ip' => $ipAnon,
        'country_code' => $countryCode,
    ];
}

