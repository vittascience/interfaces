var languageWhitelist = ['fr', 'en', 'it', 'ar', 'es', 'de', 'ru', 'cat'];
i18next.use(window.i18nextXHRBackend)
    .init({
        debug: false,
        lng: getCookie('lng'),
        whitelist: languageWhitelist,
        fallbackLng: 'en',
        backend: {
            loadPath: `${CDN_PATH}/public/content/lang/{{lng}}/ns.json`,
            crossDomain: true
        }
    }, (err, t) => {
        document.dispatchEvent(new CustomEvent('i18nextReady'));

        jqueryI18next.init(i18next, $, {
            optionsAttr: 'i18n-options',
            useOptionsAttr: true,
            useDataAttrOptions: true,
            parseDefaultValueFromContent: true
        });

        window.addEventListener('load', () => {
            $(document).localize();
            runTooltips();
        });
    });

function getCookie(cname) {
    if (cname === 'lng' && typeof IS_CAPYTALE_CONTEXT !== 'undefined') return 'fr';
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    let url = window.location.href,
        lng = "en";
    if (cname === "lng") {
        if (/fr\.vittascience/.test(url)) {
            lng = "fr";
        } else if (/en\.vittascience/.test(url)) {
            lng = "en";
        } else if (/it\.vittascience/.test(url)) {
            lng = "it";
        } else if (/ar\.vittascience/.test(url)) {
            lng = "ar";
        } else if (/es\.vittascience/.test(url)) {
            lng = "es";
        }
        return lng;
    }
    return "";
}

function runTooltips() {
    if (!$().modal) {
        setTimeout(runTooltips, 100);
        return;
    }

    if (i18next === undefined) {
        setTimeout(runTooltips, 100);
        return;
    }

    if (i18next.isInitialized) {
        loadTooltips();
    }
}

function loadTooltips() {
    if($("[data-toggle='tooltip']").tooltip) {
        $("[data-toggle='tooltip']").tooltip();
        $("[data-bs-toggle='tooltip']").tooltip();
    }
}


