<div id="landing-page-language-switcher" class="container text-center pt-5">

    <p class="h3 fw-bold" data-i18n="landing_page.global.language">Bienvenue, choisissez votre langue :</p>
    <div class="row">

        <?php
    require_once __DIR__ . '/../../../appEnv.php';
    // Language subdomains only exist on production / preprod: elsewhere (local, test servers, IP) switch in place
    ['baseDomain' => $langBaseDomain] = detectAppEnv();

    foreach ($langsAvailable as $langFlag) {
        $currentLangClass = "";
        echo "<div class='col-md'>";
        if ($lang == $langFlag['langcode']) {
            $currentLangClass = "active";
        }

        if ($langBaseDomain === null) {
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
                case 'de':
                    $languageName = 'Deutsch';
                    break;
                case 'ru':
                    $languageName = 'Русский';
                    break;
                case 'zh':
                    $languageName = '中文';
                    break;
                case 'jp':
                    $languageName = '日本語';
                    break;
                case 'pt':
                    $languageName = 'Português';
                    break;
                    
                default:
                    $languageName = $langFlag['name'];
                    break;
            }

            echo '<a href="https://' . $langFlag['langcode'] . '.' . $langBaseDomain . $currentUri . '" class="'.$currentLangClass.'">'.
                $languageName.
            '</a>';
        }

        echo "</div>";
    }
    ?>
    </div>

</div>