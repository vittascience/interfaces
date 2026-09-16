<?php
$sectionRaised = true;
$nextSectionIsRaised = function () use (&$sectionRaised) {
    return $sectionRaised = !$sectionRaised;
};
?>
<div id="landing-page-container">
    <div>
        <?php
        require_once(__DIR__ . "/langSwitcher.php");
        ?>
    </div>
    <section id="head-section">
        <div class="container py-5">
            <div class="row align-items-center">
                <div class="col-md-6 order-2 order-md-1">
                    <h2 data-i18n="[html]landing_page.<?= $i18nKey ?>.title"><?= $fallbackTitle ?></h2>
                    <p data-i18n="landing_page.<?= $i18nKey ?>.desc"><?= $fallbackDesc ?></p>
                    <?php if (!empty($shopLink)): ?>
                        <a href="<?= $shopLink ?>" class="btn btn-custom" style="--vitta-custom-color: var(--landing-page-color);">
                            <span data-i18n="landing_page.global.access_product_shop">Accéder au produit dans la boutique</span>
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    <?php endif ?>
                </div>
                <div class="col-md-6 order-md-2">
                    <img id="product-img" class="board-product-img" src="<?= $boardImg ?>" alt="">
                </div>
            </div>
        </div>

        <div id="bottom-arrow">
            <i class="fa fa-arrow-right"></i>
        </div>
    </section>

    <?php $raised = $nextSectionIsRaised(); ?>
    <section class="landing-section<?= $raised ? ' landing-band' : '' ?>">
        <div class="landing-cards-row">
            <div class="landing-cards-header text-center">
                <h2 data-i18n="[html]landing_page.global.resources.title">Ressources <span>complémentaires</span></h2>

                <a href="<?= $resourcesLink ?>" class="btn btn-custom" style="--vitta-custom-color: var(--landing-page-color);">
                    <span data-i18n="landing_page.global.resources.button">Voir toutes les ressources</span>
                    <i class="fa fa-chevron-right"></i>
                </a>
            </div>

            <div class="landing-cards-list">
                <?php
                for ($i = 0; $i < count($resources); $i++) {
                    $course = \DAO\CoursesDAO::getSharedInstance()->getCourseById($resources[$i]);

                    if (!$course) {
                        continue;
                    }

                    echo "<a class='resources-card-container' href='/learn/tutorial.php?id=" . $course['id'] . "'>
                    <div class='top-part'>
                        <img src='" . \Utils\UserDataUrl::resolve('tuto_img/' . $course['img']) . "' alt='" . $course['title'] . "'>
                    </div>
                    <div class='bottom-part'>
                        <h4 class='resource-title'>" . $course['title'] . "</h4>
                        <span>
                            <i class='fa fa-eye' aria-hidden='true'></i>
                            " . $course['views'] . "
                            <span data-i18n='index.resources.views'>vues</span>
                        </span>
                    </div>
                </a>";
                }
                ?>
            </div>
        </div>
    </section>

    <?php if (!empty($videos)): ?>
        <?php $raised = $nextSectionIsRaised(); ?>
        <section id="videos-section" class="landing-section<?= $raised ? ' landing-band' : '' ?> text-center">
            <h2 data-i18n="[html]landing_page.global.videos.title">Regarder des <span>tutoriels</span></h2>

            <div id="videos-list">
                <?php foreach ($videos as $video): ?>
                    <a class="resources-card-container video-card-container" target="_blank" rel="noopener"
                        href="https://www.youtube.com/watch?v=<?= urlencode($video['youtubeId']) ?>">
                        <div class="top-part">
                            <img src="https://img.youtube.com/vi/<?= urlencode($video['youtubeId']) ?>/hqdefault.jpg"
                                alt="<?= htmlspecialchars($video['title'], ENT_QUOTES) ?>">
                            <span class="video-play-badge"><i class="fa fa-play" aria-hidden="true"></i></span>
                        </div>
                        <div class="bottom-part">
                            <h4 class="resource-title"><?= htmlspecialchars($video['title']) ?></h4>
                            <span><?= htmlspecialchars($video['author']) ?></span>
                        </div>
                    </a>
                <?php endforeach ?>
            </div>
        </section>
    <?php endif ?>

    <?php $raised = $nextSectionIsRaised(); ?>
    <div class="landing-section<?= $raised ? ' white-full-width' : '' ?>">
        <div class="text-center">
            <h3 data-i18n="landing_page.global.help.title">Il vous reste des questions ?</h3>
            <div>
                <a href="/support/" class="btn btn-custom mt-3" style="--vitta-custom-color: var(--landing-page-color);">
                    <span data-i18n="landing_page.global.help.buttons.1">Accéder au centre d'aide</span>
                    <i class="fa fa-chevron-right"></i>
                </a>

                <a href="/about#contact" class="btn btn-custom-outline mt-3" style="--vitta-custom-color: var(--landing-page-color);">
                    <span data-i18n="landing_page.global.help.buttons.2">Nous contacter</span>
                    <i class="fa fa-chevron-right"></i>
                </a>
            </div>
        </div>
    </div>

</div>

<?php
require_once(__DIR__ . "/../../../vittafooter.php");
require_once(__DIR__ . "/../../../footer.php");
