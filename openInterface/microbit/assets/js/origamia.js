(function () {
    if (!document.documentElement.classList.contains('provider-origamia')) return;

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

    let simuDone = false;
    const ensureSimulatorOpen = function () {
        if (simuDone) return;
        const simulator = document.getElementById('simulator');
        if (!simulator) return;
        if (simulator.offsetWidth === 0 && typeof toggleSimulator === 'function') {
            toggleSimulator();
        }
        simuDone = true;
    };
    const simuTimer = setInterval(function () {
        ensureSimulatorOpen();
        if (simuDone) clearInterval(simuTimer);
    }, 200);
    setTimeout(function () { clearInterval(simuTimer); }, 6000);

    function buildFlatFlyout(manager) {
        const db = (ToolboxManager.DB_ && ToolboxManager.DB_.get) ? ToolboxManager.DB_.get() : {};
        let types = manager._reducedToolboxBlocks;
        if (!types || !types.length) types = Object.keys(db);
        const contents = types.map(function (type) {
            const inner = (db[type] != null) ? db[type] : '';
            return { kind: 'block', blockxml: '<block type="' + type + '">' + inner + '</block>' };
        });
        return { kind: 'flyoutToolbox', id: 'toolbox', contents: contents };
    }

    if (typeof ToolboxManager !== 'undefined' && ToolboxManager.prototype
        && !ToolboxManager.prototype.__origamiaFlat) {
        ToolboxManager.prototype.__origamiaFlat = true;
        ToolboxManager.prototype.setToolbox = function () {
            try {
                this._hasCategories = false;
                this._workspace.updateToolbox(buildFlatFlyout(this));
                if (typeof this.setBlocklyTheme === 'function') this.setBlocklyTheme();
                if (typeof Blockly !== 'undefined' && Blockly.svgResize) Blockly.svgResize(this._workspace);
            } catch (e) {
                console.warn('[origamia] toolbox plate échouée', e);
            }
        };
    }

    function moveZoomLeft() {
        const z = document.querySelector('.blocklyZoom');
        const parent = z && z.parentNode;
        if (!parent || typeof parent.getAttribute !== 'function') return;
        const t = parent.getAttribute('transform') || '';
        const m = t.match(/translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);
        if (!m) return;
        const targetX = 14;
        const ws = document.getElementById('content_blocks');
        const wsH = ws ? ws.getBoundingClientRect().height : 0;
        const targetY = wsH ? Math.round(wsH - 109 - 22) : parseFloat(m[2]);
        if (Math.abs(parseFloat(m[1]) - targetX) > 0.5 || Math.abs(parseFloat(m[2]) - targetY) > 0.5) {
            parent.setAttribute('transform', 'translate(' + targetX + ',' + targetY + ')');
        }
    }

    const GAP_TOP = 28;
    const MASK_UP = 9;
    const GAP_RIGHT = 18;
    function updateWorkspaceFrame() {
        const base = document.querySelector('.ide-base');
        const ws = document.getElementById('content_blocks');
        if (!base || !ws) return;
        const simulator = document.getElementById('simulator');

        let toolboxH = 80;
        try {
            const fl = (window.Code && Code.workspace && Code.workspace.getFlyout)
                ? Code.workspace.getFlyout() : null;
            if (fl && typeof fl.getHeight === 'function' && fl.getHeight()) toolboxH = fl.getHeight();
        } catch (e) { /* fallback 80 */ }

        const baseR = base.getBoundingClientRect();
        const wsR = ws.getBoundingClientRect();
        const simuOpen = simulator && simulator.offsetWidth > 0;
        const simuR = simuOpen ? simulator.getBoundingClientRect() : null;

        const top = (wsR.top - baseR.top) + toolboxH + GAP_TOP;
        const left = Math.max(0, wsR.left - baseR.left);
        const right = simuR ? (baseR.right - simuR.left + GAP_RIGHT) : 8;
        const bottom = Math.max(0, baseR.bottom - wsR.bottom);

        let frame = document.getElementById('origamia-ws-frame');
        if (!frame) {
            frame = document.createElement('div');
            frame.id = 'origamia-ws-frame';
            base.appendChild(frame);
        }
        frame.style.top = top + 'px';
        frame.style.left = left + 'px';
        frame.style.right = right + 'px';
        frame.style.bottom = bottom + 'px';

        let mask = document.getElementById('origamia-ws-mask');
        if (!mask) {
            mask = document.createElement('div');
            mask.id = 'origamia-ws-mask';
            mask.style.cssText = 'position:absolute;background:#fffeed;pointer-events:none;z-index:6;';
            base.appendChild(mask);
        }
        mask.style.top = ((wsR.top - baseR.top) + toolboxH - MASK_UP) + 'px';
        mask.style.height = (GAP_TOP + MASK_UP) + 'px';
        mask.style.left = '0px';
        mask.style.right = '0px';

        const RADIUS = 12;
        const ensureCorner = function (id, gradPos) {
            let c = document.getElementById(id);
            if (!c) {
                c = document.createElement('div');
                c.id = id;
                c.style.cssText = 'position:absolute;width:' + RADIUS + 'px;height:' + RADIUS +
                    'px;pointer-events:none;z-index:5;background:radial-gradient(circle at ' +
                    gradPos + ', transparent ' + RADIUS + 'px, #fffeed ' + (RADIUS + 0.5) + 'px);';
                base.appendChild(c);
            }
            return c;
        };
        const cTL = ensureCorner('origamia-corner-tl', '100% 100%');
        const cTR = ensureCorner('origamia-corner-tr', '0% 100%');
        const cBL = ensureCorner('origamia-corner-bl', '100% 0%');
        const cBR = ensureCorner('origamia-corner-br', '0% 0%');
        cTL.style.top = top + 'px';        cTL.style.left = left + 'px';    cTL.style.right = 'auto';      cTL.style.bottom = 'auto';
        cTR.style.top = top + 'px';        cTR.style.right = right + 'px';  cTR.style.left = 'auto';       cTR.style.bottom = 'auto';
        cBL.style.bottom = bottom + 'px';  cBL.style.left = left + 'px';    cBL.style.right = 'auto';      cBL.style.top = 'auto';
        cBR.style.bottom = bottom + 'px';  cBR.style.right = right + 'px';  cBR.style.left = 'auto';       cBR.style.top = 'auto';

        let backing = document.getElementById('origamia-right-backing');
        if (!backing) {
            backing = document.createElement('div');
            backing.id = 'origamia-right-backing';
            backing.style.cssText = 'position:absolute;background:#fffeed;pointer-events:none;z-index:4;';
            base.appendChild(backing);
        }
        backing.style.top = top + 'px';
        backing.style.right = '0px';
        backing.style.bottom = '0px';
        backing.style.left = 'auto';
        backing.style.width = right + 'px';

        moveZoomLeft();
    }
    window.addEventListener('resize', updateWorkspaceFrame);
    setInterval(updateWorkspaceFrame, 400);

    const ORIGAMIA_BLOCKED_MODALS = [
        'modal-auto-corrector-correct',
        'modal-auto-corrector-incorrect',
        'modal-auto-corrector-creation'
    ];
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
    const stableTimer = setInterval(function () {
        const ws = document.getElementById('content_blocks');
        const ready = ws && ws.offsetWidth > 2 && document.querySelector('.blocklySvg');
        if (ready) {
            stableCount++;
            if (stableCount >= 3) {
                clearInterval(stableTimer);
                updateWorkspaceFrame();
                hideLoader();
            }
        } else {
            stableCount = 0;
        }
    }, 200);
    setTimeout(function () { clearInterval(stableTimer); hideLoader(); }, 15000);
})();
