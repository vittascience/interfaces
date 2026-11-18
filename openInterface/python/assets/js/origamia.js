(function () {
    const root = document.documentElement;
    if (!root.classList.contains('provider-origamia')) return;

    const MIN_SCALE = 0.5;
    const KEEP_LAYOUT_SCALE = 0.75;
    const FIT_MARGIN = 24;

    root.classList.add('og-side');

    function showLoader() {
        if (document.getElementById('origamia-loader')) return;
        const ld = document.createElement('div');
        ld.id = 'origamia-loader';
        ld.innerHTML = '<div class="origamia-loader-inner"><div class="origamia-spinner"></div>' +
                       '<p>Chargement de l\'interface en cours…</p></div>';
        (document.body || document.documentElement).appendChild(ld);
    }
    function hideLoader() {
        const ld = document.getElementById('origamia-loader');
        if (!ld) return;
        ld.style.opacity = '0';
        setTimeout(function () { if (ld.parentNode) ld.parentNode.removeChild(ld); }, 450);
    }
    showLoader();

    function mainWorkspace() {
        return (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace) ? Blockly.getMainWorkspace() : null;
    }

    let consoleOpenings = 0;
    function openConsole() {
        const monitor = document.getElementById('monitor');
        if (typeof InterfaceMonitor === 'undefined' || !monitor) return false;
        if (monitor.classList.contains('monitor-closed') && consoleOpenings < 10) {
            consoleOpenings++;
            InterfaceMonitor.toggle();
        }
        return true;
    }
    const consoleTimer = setInterval(function () {
        if (!openConsole()) return;
        clearInterval(consoleTimer);
        new MutationObserver(openConsole).observe(document.getElementById('monitor'), { attributes: true, attributeFilter: ['class'] });
    }, 200);
    setTimeout(function () { clearInterval(consoleTimer); }, 20000);

    function disableLocalDraft() {
        if (typeof ProjectManager === 'undefined' || !ProjectManager.prototype) return false;
        ProjectManager.prototype._isLocalDraftEnabled = function () { return false; };
        return true;
    }
    if (!disableLocalDraft()) {
        const draftTimer = setInterval(function () { if (disableLocalDraft()) clearInterval(draftTimer); }, 20);
        setTimeout(function () { clearInterval(draftTimer); }, 10000);
    }

    function flatToolbox(manager) {
        const seen = new Set();
        const contents = [];
        (manager._reducedToolboxBlocks || []).forEach(function (type) {
            if (seen.has(type)) return;
            seen.add(type);
            const xml = ToolboxManager.getXmlByBlockType(type);
            if (xml) contents.push({ kind: 'block', blockxml: xml });
        });
        return { kind: 'flyoutToolbox', id: 'toolbox', contents: contents };
    }

    let toolboxEmpty = false;
    function collapseFlyout(workspace) {
        const flyout = workspace.getFlyout();
        if (!flyout || (!flyout.isVisible() && flyout.getHeight() === 0)) return;
        flyout.hide();
        flyout.height_ = 0;
        workspace.resize();
    }

    if (typeof ToolboxManager !== 'undefined' && ToolboxManager.prototype
        && !ToolboxManager.prototype.__origamiaFlat) {
        ToolboxManager.prototype.__origamiaFlat = true;
        ToolboxManager.prototype.setToolbox = function () {
            try {
                this._hasCategories = false;
                const toolbox = flatToolbox(this);
                const flyoutSvg = document.querySelector('#content_blocks .injectionDiv > .blocklyFlyout');
                if (flyoutSvg) flyoutSvg.classList.add('blocklyToolboxFlyout');
                this._workspace.updateToolbox(toolbox);
                toolboxEmpty = !toolbox.contents.length;
                root.classList.toggle('og-no-toolbox', toolboxEmpty);
                if (typeof this.setBlocklyTheme === 'function') this.setBlocklyTheme();
                Blockly.svgResize(this._workspace);
            } catch (e) {
                console.warn('[origamia] toolbox plate échouée', e);
            }
            syncLayout();
        };
    }

    let controlsDone = false;
    function dropHiddenControls(workspace) {
        if (controlsDone) return;
        controlsDone = true;
        ['trashcan', 'backpack'].forEach(function (id) {
            try { workspace.getComponentManager().removeComponent(id); } catch (e) {}
        });
        workspace.resize();
    }

    let lastSize = '';
    function syncLayout() {
        const workspace = mainWorkspace();
        const editor = document.querySelector('.ide-editor');
        if (!workspace || !editor) return;

        if (!document.getElementById('origamia-ws-frame')) {
            const frame = document.createElement('div');
            frame.id = 'origamia-ws-frame';
            editor.appendChild(frame);
        }

        dropHiddenControls(workspace);

        const size = editor.offsetWidth + 'x' + editor.offsetHeight;
        if (size !== lastSize) {
            lastSize = size;
            Blockly.svgResize(workspace);
        }

        if (toolboxEmpty) collapseFlyout(workspace);
        const flyout = workspace.getFlyout();
        const top = flyout && !toolboxEmpty ? Math.round(flyout.getHeight()) : 0;
        root.style.setProperty('--og-top', top + 'px');
    }

    let userTouched = false;
    document.addEventListener('pointerdown', function (event) {
        if (event.target.closest && event.target.closest('#content_blocks')) userTouched = true;
    }, true);

    function fitScale(workspace) {
        const box = workspace.getBlocksBoundingBox();
        const metrics = workspace.getMetrics();
        return Math.min(
            (metrics.viewWidth - FIT_MARGIN) / Math.max(box.right, 1),
            (metrics.viewHeight - FIT_MARGIN) / Math.max(box.bottom, 1)
        );
    }

    function fitWorkspace() {
        const workspace = mainWorkspace();
        if (!workspace || userTouched || !workspace.getTopBlocks(false).length) return;
        const startScale = (workspace.options.zoomOptions && workspace.options.zoomOptions.startScale) || 1;
        workspace.setScale(startScale);
        let scale = fitScale(workspace);
        if (scale < KEEP_LAYOUT_SCALE && workspace.getTopBlocks(false).length > 1) {
            workspace.cleanUp();
            scale = fitScale(workspace);
        }
        workspace.setScale(Math.max(MIN_SCALE, Math.min(startScale, scale)));
        workspace.scroll(0, 0);
    }

    let fitTimer = null;
    function scheduleLayout() {
        syncLayout();
        clearTimeout(fitTimer);
        fitTimer = setTimeout(function () { syncLayout(); fitWorkspace(); }, 150);
    }
    window.addEventListener('resize', scheduleLayout);

    const observed = new Set();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleLayout) : null;
    function observePanels() {
        if (!observer) return;
        ['.ide-editor', '#monitor'].forEach(function (selector) {
            const element = document.querySelector(selector);
            if (element && !observed.has(element)) {
                observed.add(element);
                observer.observe(element);
            }
        });
    }

    const ORIGAMIA_BLOCKED_MODALS = ['modal-unittests', 'modal-turtle-auto-corrector-validation'];
    function patchPseudoModal() {
        if (!window.pseudoModal || typeof pseudoModal.openModal !== 'function' || pseudoModal.__origamiaPatched) return false;
        const orig = pseudoModal.openModal.bind(pseudoModal);
        pseudoModal.openModal = function (modal) {
            if (ORIGAMIA_BLOCKED_MODALS.indexOf(modal) !== -1) return;
            return orig.apply(this, arguments);
        };
        pseudoModal.__origamiaPatched = true;
        return true;
    }
    const pmTimer = setInterval(function () { if (patchPseudoModal()) clearInterval(pmTimer); }, 200);
    setTimeout(function () { clearInterval(pmTimer); }, 10000);

    let stableCount = 0;
    let lastState = '';
    const stableTimer = setInterval(function () {
        const workspace = mainWorkspace();
        const ws = document.getElementById('content_blocks');
        observePanels();
        if (!workspace || !ws || ws.offsetWidth <= 2) {
            stableCount = 0;
            return;
        }
        syncLayout();
        const state = lastSize + '|' + root.style.getPropertyValue('--og-top') + '|' + workspace.getAllBlocks(false).length;
        stableCount = state === lastState ? stableCount + 1 : 0;
        lastState = state;
        if (stableCount >= 3) {
            clearInterval(stableTimer);
            fitWorkspace();
            hideLoader();
        }
    }, 200);
    setTimeout(function () { clearInterval(stableTimer); scheduleLayout(); hideLoader(); }, 15000);
})();
