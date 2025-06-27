/**
 * 
 * @param {string} theme : dark or light 
 */
function setBlocklyWorkspaceIcons(theme) {
    const themeIcons = {
        light: "/openInterface/interfaces/assets/js/external/blockly/media/spritesLight.png",
        dark: "/openInterface/interfaces/assets/js/external/blockly/media/spritesDark.png"
    };
    const icons = document.querySelectorAll('.blocklyZoom image, .blocklyTrash image');
    if (themeIcons[theme]) {
        icons.forEach(icon => {
            icon.setAttribute('xlink:href', themeIcons[theme]);
        });
    } else {
        console.error("Theme not recognized:", theme);
    }
}

function updateWebsiteAcessibility(formElement) {
    projectManager.multiUpdateWebsiteAccessibility(formElement);
    var accesibilityInputs = formElement.serializeArray();

    // first value is theme
    var theme = accesibilityInputs[0].value;

    // second value is contrast
    if (accesibilityInputs[1])
        var contrast = accesibilityInputs[1].value;

    // third value is font
    if (accesibilityInputs[2])
        var font = accesibilityInputs[2].value;

    setTheme(theme);
    setContrast(contrast);
    setFont(font);

    if (window.location.pathname.split('/')[1] == "adacraft") {
        switch (theme) {
            case "dark":
                adacraft.switchToDarkTheme();
                break;
            case "light":
            default:
                adacraft.switchToLightTheme();
                break;
        }
    }

    const arInterfaces = ['arduino', 'microbit', 'python', 'esp32', 'wb55', 'TI-83', 'letsstartcoding', 'pico'];
    if (arInterfaces.includes((window.location.pathname).split('/')[1])) {
        Main.setBlocklyTheme();
        setTimeout(function () {
            Main.setBlocklyTheme()
        }, 50);
    }

    if ((window.location.pathname).split('/')[1] == "web") {
        projectManager.setBlocklyTheme();
        setTimeout(function () {
            projectManager.setBlocklyTheme();
        }, 50);
    }
};

// function to set a given theme/color-scheme
function setTheme(givenThemeName) {
    let themesTypes = ['light', 'dark'];
    localStorage.setItem('theme', givenThemeName);

    themesTypes.forEach(theme => {
        if (givenThemeName == theme) {
            $('html').addClass("theme-" + theme);
        } else {
            $('html').removeClass("theme-" + theme)
        }
    });

    if (localStorage.getItem('theme') === 'dark') {
        $(".navbar-logo").attr("src", `${CDN_PATH}/public/content/img/vittascience-footer.png`);
    } else {
        $(".navbar-logo").attr("src", `${CDN_PATH}/public/content/img/vittascience-logo.png`);
    }

    setBlocklyWorkspaceIcons(givenThemeName);

    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;

    $('#radio-' + givenThemeName + '-theme').prop('checked', true);
    $('[data-a11y-theme-' + givenThemeName + ']').prop('checked', true);
}


//function to set a given contrast

function setContrast(givenContrastSetting) {
    let contrastOptions = ['normal', 'high'];

    localStorage.setItem('contrast', givenContrastSetting);

    contrastOptions.forEach(contrast => {
        if (givenContrastSetting == contrast) {
            $('html').addClass("contrast-" + contrast);
        } else {
            $('html').removeClass("contrast-" + contrast);
        }
    });

    // Changing the footer logo depending on theme and contrast
    if (localStorage.getItem('contrast') === 'high' && localStorage.getItem('theme') === 'light') {
        $(".footer-logo").attr("src", "/public/content/img/vittascience-logo.png");
    } else {
        $(".footer-logo").attr("src", "/public/content/img/vittascience-footer.png");
    }


    if (localStorage.getItem('contrast') === 'high') {
        // enable stylesheet
        $("#hc-css-stylesheet").attr("disabled", false);
    } else {
        // disable stylesheet
        $("#hc-css-stylesheet").attr("disabled", true);
    }


    $('#radio-' + givenContrastSetting + '-contrast').prop('checked', true);
    $('[data-a11y-contrast-' + givenContrastSetting + ']').prop('checked', true);
}

// function to set a given font
function setFont(givenFontName) {
    let fontTypes = ['basic', 'dys', 'luciole', 'arial', 'verdana'];

    localStorage.setItem('font', givenFontName);

    fontTypes.forEach(font => {
        if (givenFontName == font) {
            $('html').addClass("font-" + font);
        } else {
            $('html').removeClass("font-" + font)
        }
    });

    $('#radio-' + givenFontName + '-font').prop('checked', true);
    $('[data-a11y-font-' + givenFontName + ']').prop('checked', true);
}

function setAccessibility() {
    // check if the user has already selected a specific theme
    if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'));
    } else {
        // check if the user has a dark theme and or high contrast mode enabled
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // check if the user has already selected a specific contrast
    if (localStorage.getItem('contrast')) {
        setContrast(localStorage.getItem('contrast'));
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            setContrast('high');
        } else {
            setContrast('normal');
        }
    }

    // check if the user has already selected a specific font
    if (localStorage.getItem('font')) {
        setFont(localStorage.getItem('font'));
    } else {
        setFont('basic');
    }
}

/**
 * Open blockly settings.
 */
function openSettings() {
    setAccessibility();
    pseudoModal.openModal('modal-blocklysettings');
    const accessForm = document.querySelector('#access-form-ide');
    accessForm.addEventListener("change", function (e) {
        updateWebsiteAcessibility($(this));
    });

    if (getParamValue('mode') === 'codeOnly') {
        $('#blocks-settings-style').hide();
    }

    if (Main.inIframe() && typeof IS_CAPYTALE_CONTEXT === 'undefined') {
        $('#modal-blockly-knowmore').hide();
    }
};