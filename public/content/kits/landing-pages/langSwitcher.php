<div id="landing-page-language-switcher" class="container text-center pt-5">

    <p class="h3 fw-bold" data-i18n="landing_page.global.language">Bienvenue, choisissez votre langue :</p>
    <div class="row">

        <?php
    $hostNameArray = explode(".", $_SERVER['HTTP_HOST']);

    foreach ($langsAvailable as $langFlag) {
        $currentLangClass = "";
        echo "<div class='col-md'>";
        if ($lang == $langFlag['langcode']) {
            $currentLangClass = "active";
        }

        if (count($hostNameArray) === 1 || filter_var($_SERVER['HTTP_HOST'], FILTER_VALIDATE_IP) || in_array($hostNameArray[0], ['vdelta', 'valpha', 'vbeta', 'vgamma', "vdelta" ,"vepsilon", "vzeta", "veta", "vtheta" ,"viota" ,"vkappa",'vdev']) == 1) {
            echo '<a href="#" class="'.$currentLangClass.'" onclick="switchLang(\'' . $langFlag['langcode'] . '\')">'.
                $langFlag['name'].
            '</a>';
        } else {
            $currentUri = $_SERVER['REQUEST_URI'];
            if (!empty($_GET['lang'])) {
                $currentUri = preg_replace('/&lang=[a-z]+/', "&lang={$langFlag['langcode']}", $currentUri);
            }

            
            switch ($langFlag['langcode']) {
                case 'fr': 
                    $languageName = 'Français';
                    break;
                case 'en':
                    $languageName = 'English';
                    break;
                case 'it':
                    $languageName = 'Italiano';
                    break;
                case 'ar':
                    $languageName = 'العربية';
                    break;
                case 'es':
                    $languageName = 'Español';
                    break;
                default:
                    $languageName = $langFlag['name'];
                    break;
            }

            echo '<a href="https://' . $langFlag['langcode'] . '.vittascience.com' . $currentUri . '" class="'.$currentLangClass.'">'.
                $languageName.
            '</a>';
        }

        echo "</div>";
    }
    ?>
    </div>

</div>