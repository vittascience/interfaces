/**
 * Make Blockly zoom controls and trashcan keyboard-accessible.
 * Strategy: put tabindex="0" on a <rect> child sized to the visible clip area,
 * NOT on the <g> parent — this ensures the browser focus ring is the right size
 * and no double-outline occurs.
 * Must be called after Blockly has fully rendered (use a small timeout).
 */
function setBlocklyControlsA11y() {
    setTimeout(() => {

        const SVG_NS = 'http://www.w3.org/2000/svg';

        /**
         * Dispatch events so Blockly's native handlers fire on the <g>.
         * In modern browsers Blockly's conditionalBind maps mousedown → pointerdown
         * (via Blockly.Touch.TOUCH_MAP), so we must dispatch PointerEvents.
         */
        function triggerClick(group) {
            const rect = group.getBoundingClientRect();
            const baseOpts = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: rect.left + rect.width  / 2,
                clientY: rect.top  + rect.height / 2,
            };
            if (window.PointerEvent) {
                const ptrOpts = { ...baseOpts, pointerId: 1, pointerType: 'mouse', isPrimary: true };
                group.dispatchEvent(new PointerEvent('pointerdown', ptrOpts));
                group.dispatchEvent(new PointerEvent('pointerup',   ptrOpts));
            } else {
                group.dispatchEvent(new MouseEvent('mousedown', baseOpts));
                group.dispatchEvent(new MouseEvent('mouseup',   baseOpts));
            }
            group.dispatchEvent(new MouseEvent('click', baseOpts));
        }

        /**
         * Add an HTML <button> inside a <foreignObject> as the real focus target.
         * HTML buttons respond to `outline:none` reliably (unlike SVG elements in Chrome).
         * A separate SVG <rect> with stroke handles the custom visual focus indicator.
         * The <g> itself is removed from tab order.
         */
        function addFocusTarget(group, w, h, label) {
            group.setAttribute('tabindex', '-1');

            // SVG stroke rect — purely visual, no tabindex
            const focusRing = document.createElementNS(SVG_NS, 'rect');
            focusRing.setAttribute('width',  w);
            focusRing.setAttribute('height', h);
            focusRing.setAttribute('rx', '3');
            focusRing.setAttribute('fill', 'none');
            focusRing.setAttribute('stroke', 'transparent');
            focusRing.setAttribute('stroke-width', '2.5');
            focusRing.setAttribute('pointer-events', 'none');
            group.appendChild(focusRing);

            // HTML <button> inside <foreignObject> — receives focus, outline suppressed via CSS
            const fo = document.createElementNS(SVG_NS, 'foreignObject');
            fo.setAttribute('width',  w);
            fo.setAttribute('height', h);
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', label);
            btn.style.cssText = 'width:100%;height:100%;background:transparent;border:none;padding:0;cursor:pointer;';
            fo.appendChild(btn);
            group.appendChild(fo);

            btn.addEventListener('focus', () => focusRing.setAttribute('stroke', '#4d90fe'));
            btn.addEventListener('blur',  () => focusRing.setAttribute('stroke', 'transparent'));
            btn.addEventListener('click', () => triggerClick(group));
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerClick(group);
                }
            });

            return btn;
        }

        // ── 1. Zoom controls ───────────────────────────────────────────────

        const ZOOM_CFG = {
            Zoomreset:  { label: 'Réinitialiser le zoom', w: 32, h: 32 },
            Zoomin:     { label: 'Zoom avant',            w: 32, h: 32 },
            Zoomout:    { label: 'Zoom arrière',           w: 32, h: 32 },
            Screenshot: { label: "Capture d'écran",       w: 38, h: 32 },
        };

        const zoomMap = {};
        document.querySelectorAll('.blocklyZoom').forEach(group => {
            const clipId = group.querySelector('clipPath')?.id ?? '';
            const key = Object.keys(ZOOM_CFG).find(k => clipId.includes(k));
            if (!key) return;
            zoomMap[key] = group;
            const cfg = ZOOM_CFG[key];
            addFocusTarget(group, cfg.w, cfg.h, cfg.label);
        });

        // Reorder zoom siblings: reset → in → out → screenshot
        const firstZoom = Object.values(zoomMap)[0];
        const zoomContainer = firstZoom?.parentElement;
        if (zoomContainer) {
            ['Screenshot', 'Zoomreset', 'Zoomin', 'Zoomout']
                .map(k => zoomMap[k])
                .filter(Boolean)
                .forEach(g => zoomContainer.appendChild(g));
        }

        // ── 2. Backpack ────────────────────────────────────────────────────────
        // .blocklyBackpack is on the <image> child (where aria-label is set by
        // blockly-accessibility.js); we need the <g> parent for the focus target.
        const backpackImg = document.querySelector('.blocklyBackpack');
        const backpack = backpackImg?.parentElement ?? null;
        if (backpack) {
            const label = backpackImg?.getAttribute('aria-label') || 'Sac à dos';
            addFocusTarget(backpack, 50, 50, label);
        }

        // ── 3. Trash ───────────────────────────────────────────────────────

        const trash = document.querySelector('.blocklyTrash');
        if (trash) {
            addFocusTarget(trash, 47, 60, 'Corbeille');
        }

        // ── 4. Tab order in SVG: backpack → zoom container → trash ─────────
        const svgRoot = document.querySelector('.blocklySvg');
        if (svgRoot) {
            [backpack, zoomContainer, trash]
                .filter(Boolean)
                .forEach(el => svgRoot.appendChild(el));
        }

    }, 500);
}

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