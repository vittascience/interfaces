<?php
/**
 * saml_lux_helpers.php — Fonctions pures extraites de users.php / saml.php.
 *
 * Isolées ici (même logique que gar_saml_helpers.php pour le GAR) pour être
 * testables unitairement sans dépendance à SimpleSAMLphp, Doctrine ou la
 * session PHP.
 */

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

/**
 * Résout le tier de restriction élève (EF I / EF II / ES I / ES II) depuis
 * l'attribut MEN-CurrentStudentAssignments.
 *
 * Format positionnel (documenté dans saml.php) :
 *   Année scolaire:École:Année d'études:Classe:Alias classe:Annexe:Code classe:Terminale
 * Exemples réels :
 *   2026-2027:EP-CSAE-BEI_:Précoce:PREC A:::::           → EF I  (éducation précoce, avant le cycle 1)
 *   2026-2027:EP-CSAE-BEI_:Cycle 3.2:C3 B:::::           → EF I  (fondamental, cycles 2-3)
 *   2026-2027:EP-ETAT-ISML:Cycle 4.2:6c:::::             → EF II (fondamental, cycle 4)
 *   2026-2027:ALR:7G:7G2:::7G2::                         → ES I  (secondaire, 7e à 4e)
 *   2026-2027:ECG:1CN:1CN:::1CN:T:                       → ES II (secondaire, 3e à 1ère)
 *
 * @param string|list<string>|null $studentAssignments Valeur brute (ou tableau SAML multivalué) de MEN-CurrentStudentAssignments
 * @return 'EF_I'|'EF_II'|'ES_I'|'ES_II'|'UNKNOWN'
 */
function resolveLuxRestrictionTier($studentAssignments = null): string
{
    $raw = is_array($studentAssignments) ? ($studentAssignments[0] ?? '') : (string) $studentAssignments;
    $raw = trim($raw);

    if ($raw === '') {
        return 'UNKNOWN';
    }

    $anneeEtudes = trim(explode(':', $raw)[2] ?? '');
    if ($anneeEtudes === '') {
        return 'UNKNOWN';
    }

    // Éducation précoce (avant le Cycle 1, dès 3 ans) : pas de numéro de cycle,
    // rattachée à EF I (le plus restrictif) comme le Cycle 1.
    if (preg_match('/pr[ée]coce/iu', $anneeEtudes)) {
        return 'EF_I';
    }

    // Fondamental : "Cycle 2.1", "Cycle 3.2", "Cycle 4.2"...
    if (preg_match('/Cycle\s*([1-4])/i', $anneeEtudes, $m)) {
        return ((int) $m[1] >= 4) ? 'EF_II' : 'EF_I';
    }

    // Régime technique/professionnel (CCP/DAP/DT) : numérotation propre 10e-13e
    // (ex. "10SN", "13SN"), distincte de l'échelle 7-1 du classique/général. Sa
    // correspondance EF/ES n'est pas confirmée (10e-12e = cycle moyen, 13e = début
    // du cycle supérieur selon men.public.lu) et aucun profil transmis ne l'utilise :
    // on ne devine pas un tier, UNKNOWN (repli sur l'ancien comportement) plutôt
    // qu'un mauvais tier. À traiter explicitement si un vrai cas se présente.
    if (preg_match('/^\d{2,}/', $anneeEtudes)) {
        return 'UNKNOWN';
    }

    // Secondaire classique/général : classes numérotées de 7 (7e, début) à 1 (1ère, fin)
    if (preg_match('/^([1-7])/', $anneeEtudes, $m)) {
        return ((int) $m[1] >= 4) ? 'ES_I' : 'ES_II';
    }

    return 'UNKNOWN';
}
