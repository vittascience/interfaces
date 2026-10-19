<?php

namespace Public\Sso\Tests;

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../saml_lux_helpers.php';

/**
 * Simule, avec les 8 profils élèves transmis par le client (aucun compte de
 * test réel disponible côté IdP Luxembourg), la résolution du tier de
 * restriction SAML : EF I (fondamental cycles 2-3, aucun accès), EF II
 * (fondamental cycle 4, accès limité classe), ES I (secondaire 7e-4e, IA
 * classe uniquement), ES II (secondaire 3e-1ère, accès libre).
 */
class SamlLuxHelpersTest extends TestCase
{
    public static function studentProfilesProvider(): array
    {
        return [
            'EF I - Student 1 (Cycle 3.2)' => ['2026-2027:EP-CSAE-BEI_:Cycle 3.2:C3 B:::::', 'EF_I'],
            'EF I - Student 2 (Cycle 2.1)' => ['2026-2027:EP-ETAT-ISML:Cycle 2.1:1c:::::', 'EF_I'],
            'EF II - Student 1 (Cycle 4.2)' => ['2026-2027:EP-ETAT-ISML:Cycle 4.2:6c:::::', 'EF_II'],
            'EF II - Student 2 (Cycle 4.2)' => ['2026-2027:EP-KOER-KAER:Cycle 4.2:C4.2:::::', 'EF_II'],
            'ES I - Student 1 (7G)' => ['2026-2027:ALR:7G:7G2:::7G2::', 'ES_I'],
            'ES I - Student 2 (6P)' => ['2026-2027:BLL:6P:6P1:::6P1::', 'ES_I'],
            'ES II - Student 1 (1CN)' => ['2026-2027:ECG:1CN:1CN:::1CN:T:', 'ES_II'],
            'ES II - Student 2 (3GT2S-)' => ['2026-2027:EPF:3GT2S-:3GT2S:::3GT2S-::', 'ES_II'],
        ];
    }

    /**
     * @dataProvider studentProfilesProvider
     */
    public function testResolvesTierForTransmittedStudentProfiles(string $rawAssignment, string $expectedTier): void
    {
        $this->assertSame($expectedTier, resolveLuxRestrictionTier($rawAssignment));
    }

    public function testAcceptsMultivaluedSamlAttributeArray(): void
    {
        $this->assertSame('ES_II', resolveLuxRestrictionTier(['2026-2027:ECG:1CN:1CN:::1CN:T:']));
    }

    public function testEmptyInputIsUnknown(): void
    {
        $this->assertSame('UNKNOWN', resolveLuxRestrictionTier(''));
        $this->assertSame('UNKNOWN', resolveLuxRestrictionTier(null));
    }

    public function testUnrecognizedFormatIsUnknown(): void
    {
        $this->assertSame('UNKNOWN', resolveLuxRestrictionTier('2026-2027:SNJ:SNJ:Stagiaire - Fonctionnaire A1::CLAURIVE::'));
    }

    public function testCycle1FallsBackToMostRestrictiveTier(): void
    {
        // Cycle 1 (précoce/préscolaire) n'est pas listé dans la politique transmise ;
        // on le rattache par défaut à EF I (le plus restrictif) plutôt que d'ouvrir l'accès.
        $this->assertSame('EF_I', resolveLuxRestrictionTier('2026-2027:EP-TEST:Cycle 1.1:C1 A:::::'));
    }

    public function testEducationPrecoceIsEfI(): void
    {
        // Avant le Cycle 1 (dès 3 ans), pas de numéro de cycle dans l'attribut.
        $this->assertSame('EF_I', resolveLuxRestrictionTier('2026-2027:EP-TEST:Précoce:PREC A:::::'));
        $this->assertSame('EF_I', resolveLuxRestrictionTier('2026-2027:EP-TEST:PRECOCE:PREC A:::::'));
    }

    /**
     * Régime technique (10SN-13SN, confirmé sur men.public.lu) : numérotation
     * propre, distincte de l'échelle 7-1. Pas de tier fiable sans confirmation
     * MENJE -> UNKNOWN plutôt qu'un tier deviné.
     */
    public static function regimeTechniqueProvider(): array
    {
        return [
            '10SN' => ['2026-2027:LTAM:10SN:10SN1:::::'],
            '11SN' => ['2026-2027:LTAM:11SN:11SN1:::::'],
            '12SN' => ['2026-2027:LTAM:12SN:12SN1:::::'],
            '13SN' => ['2026-2027:LTAM:13SN:13SN1:::::'],
        ];
    }

    /**
     * @dataProvider regimeTechniqueProvider
     */
    public function testRegimeTechniqueIsUnknownNotGuessed(string $rawAssignment): void
    {
        $this->assertSame('UNKNOWN', resolveLuxRestrictionTier($rawAssignment));
    }

    /**
     * Exemples officiels du RTFS luxembourgeois (capture transmise par le client),
     * jamais testés jusque-là.
     */
    public function testResolvesTierForOfficialDocExamples(): void
    {
        $this->assertSame('ES_II', resolveLuxRestrictionTier('2025-2026:ENSA:1GSI:1GSI12::ENSA1:1GSI12:T:'));
        $this->assertSame('ES_I', resolveLuxRestrictionTier('2025-2026:LNB:7P:7P1::ALLIANCE:7P1::'));
    }
}
