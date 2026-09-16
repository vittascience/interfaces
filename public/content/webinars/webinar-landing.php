<?php
require_once(__DIR__ . "/../../../services/get/agendaLinks.php");

$w = $landingWebinar;
$isFr = (isset($_COOKIE['lng']) ? $_COOKIE['lng'] : 'fr') === 'fr';

$titre = $isFr ? $w['title_fr'] : ($w['title_en'] ?: $w['title_fr']);
$courte = $isFr ? $w['description_fr'] : ($w['description_en'] ?: $w['description_fr']);
$longue = $isFr ? $w['long_description_fr'] : ($w['long_description_en'] ?: $w['long_description_fr']);

$startTs = strtotime($w['start_datetime']);
$estPasse = $startTs < time();
$duree = max(1, (int)$w['duration_minutes']);

$startUtc = new DateTime($w['start_datetime'], new DateTimeZone('Europe/Paris'));
$startUtc->setTimezone(new DateTimeZone('UTC'));
$endUtc = clone $startUtc;
$endUtc->modify('+' . $duree . ' minutes');
$agenda = buildAgendaLinks($titre, (string)$courte, $startUtc, $endUtc, $duree, $w['replay_url'] ?? '');

$peutSInscrire = !$estPasse && !empty($w['brevo_list_id']);
$moisFr = [1=>'janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
$dateLisible = $isFr
    ? date('j', $startTs) . ' ' . $moisFr[(int)date('n', $startTs)] . ' ' . date('Y', $startTs) . ' à ' . date('H\hi', $startTs)
    : date('F j, Y \a\t g:ia', $startTs);
?>
<div class="webinar-landing">
    <section class="webinar-landing-head">
        <div class="webinar-landing-head-text">
            <h1 class="webinar-landing-title"><?= htmlspecialchars($titre) ?></h1>
            <p class="webinar-landing-meta">
                <?= htmlspecialchars($dateLisible) ?>
                <span class="webinar-landing-sep">·</span>
                <?= $duree ?> min
                <span class="webinar-landing-sep">·</span>
                <span class="webinar-landing-lang"><?= strtoupper(htmlspecialchars($w['language'] ?? 'fr')) ?></span>
            </p>
            <?php if (!empty($courte)) : ?>
                <p class="webinar-landing-short"><?= nl2br(htmlspecialchars($courte)) ?></p>
            <?php endif; ?>
        </div>
        <?php if (!empty($w['thumbnail'])) : ?>
            <div class="webinar-landing-thumb">
                <img src="<?= \Utils\UserDataUrl::resolve('webinar-medias/' . $w['thumbnail']) ?>" alt="<?= htmlspecialchars($titre) ?>">
            </div>
        <?php endif; ?>
    </section>

    <?php if ($estPasse) : ?>
        <section class="webinar-landing-box webinar-landing-replay">
            <p class="webinar-landing-box-label"><?= $isFr ? 'Ce webinaire est terminé' : 'This webinar has ended' ?></p>
            <?php if (!empty($w['replay_url'])) : ?>
                <a class="webinar-replay-btn" href="<?= htmlspecialchars($w['replay_url']) ?>" target="_blank" rel="noopener">
                    <i class="fa-solid fa-play" aria-hidden="true"></i> <?= $isFr ? 'Voir le replay' : 'Watch the replay' ?>
                </a>
            <?php else : ?>
                <span class="webinar-replay-btn is-disabled"><i class="fa-solid fa-play" aria-hidden="true"></i> <?= $isFr ? 'Replay bientôt disponible' : 'Replay coming soon' ?></span>
            <?php endif; ?>
        </section>
    <?php else : ?>
        <section class="webinar-landing-box webinar-landing-countdown" data-start="<?= (int)$startTs ?>">
            <p class="webinar-landing-box-label"><?= $isFr ? 'Webinaire dans' : 'Webinar starts in' ?></p>
            <p class="webinar-landing-timer" id="webinar-countdown">—</p>
        </section>

        <?php if ($peutSInscrire) : ?>
            <form class="webinar-landing-signup" id="webinar-landing-signup" data-webinar-id="<?= (int)$w['id'] ?>">
                <input type="email" name="email" id="webinar-landing-email" required
                       placeholder="<?= $isFr ? 'Votre adresse email' : 'Your email address' ?>">
                <button type="submit" class="webinar-inscription-btn" id="webinar-landing-submit"><?= $isFr ? 'Inscription' : 'Sign up' ?></button>
            </form>
            <p class="webinar-landing-feedback" id="webinar-landing-feedback" hidden></p>
        <?php endif; ?>
    <?php endif; ?>

    <?php if (!empty($longue)) : ?>
        <section class="webinar-landing-long"><?= nl2br(htmlspecialchars($longue)) ?></section>
    <?php endif; ?>

    <?php if (!$estPasse) : ?>
        <section class="webinar-landing-box webinar-landing-agenda">
            <p class="webinar-landing-box-label"><?= $isFr ? "Ajouter l'évènement à l'agenda" : 'Add the event to your calendar' ?></p>
            <div class="webinar-agenda">
                <a class="webinar-agenda-link" href="<?= htmlspecialchars($agenda['google']) ?>" target="_blank" rel="noopener" aria-label="Google Agenda"><i class="fa-brands fa-google" aria-hidden="true"></i></a>
                <a class="webinar-agenda-link" href="<?= htmlspecialchars($agenda['yahoo']) ?>" target="_blank" rel="noopener" aria-label="Yahoo Calendar"><i class="fa-brands fa-yahoo" aria-hidden="true"></i></a>
                <a class="webinar-agenda-link" href="<?= htmlspecialchars($agenda['outlook']) ?>" target="_blank" rel="noopener" aria-label="Outlook"><i class="fa-brands fa-microsoft" aria-hidden="true"></i></a>
            </div>
        </section>
    <?php endif; ?>

    <p class="webinar-landing-back"><a href="/webinars"><?= $isFr ? '← Tous les webinaires' : '← All webinars' ?></a></p>
</div>

<script>
(function () {
    var box = document.querySelector('.webinar-landing-countdown');
    if (box) {
        var cible = parseInt(box.getAttribute('data-start'), 10) * 1000;
        var sortie = document.getElementById('webinar-countdown');
        var libelles = <?= json_encode($isFr ? ['j','h','min','s'] : ['d','h','min','s']) ?>;
        (function tick() {
            var reste = cible - Date.now();
            if (reste <= 0) { sortie.textContent = <?= json_encode($isFr ? "C'est maintenant !" : "It's starting!") ?>; return; }
            var s = Math.floor(reste / 1000);
            var j = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600),
                m = Math.floor((s % 3600) / 60), sec = s % 60;
            var parts = [];
            if (j) parts.push(j + ' ' + libelles[0]);
            parts.push(h + ' ' + libelles[1], m + ' ' + libelles[2], sec + ' ' + libelles[3]);
            sortie.textContent = parts.join(' ');
            setTimeout(tick, 1000);
        })();
    }

    var form = document.getElementById('webinar-landing-signup');
    if (form) {
        var feedback = document.getElementById('webinar-landing-feedback');
        var submit = document.getElementById('webinar-landing-submit');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.getElementById('webinar-landing-email').value.trim();
            if (!email) return;
            submit.disabled = true;
            var fd = new FormData();
            fd.append('email', email);
            fd.append('webinarId', form.getAttribute('data-webinar-id'));
            if (window.WEBINARS_USER && window.WEBINARS_USER.firstname) fd.append('firstname', window.WEBINARS_USER.firstname);
            fetch('/services/post/postWebinarSubscribe.php', { method: 'POST', body: fd })
                .then(function (r) { return r.json().catch(function () { return { success: false }; }); })
                .then(function (data) {
                    submit.disabled = false;
                    feedback.hidden = false;
                    if (data && data.success) {
                        form.hidden = true;
                        feedback.className = 'webinar-landing-feedback is-success';
                        feedback.textContent = <?= json_encode($isFr ? "Inscription confirmée ! Vous recevrez les informations par email." : "You're signed up! Details will arrive by email.") ?>;
                    } else {
                        feedback.className = 'webinar-landing-feedback is-error';
                        feedback.textContent = (data && data.message) ? data.message : <?= json_encode($isFr ? "Une erreur est survenue." : "Something went wrong.") ?>;
                    }
                })
                .catch(function () {
                    submit.disabled = false;
                    feedback.hidden = false;
                    feedback.className = 'webinar-landing-feedback is-error';
                    feedback.textContent = <?= json_encode($isFr ? "Une erreur est survenue." : "Something went wrong.") ?>;
                });
        });
    }
})();
</script>
