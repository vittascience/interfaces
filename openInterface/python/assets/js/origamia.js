/* Origamia — comportements JS de l'interface Python/Blockly. */
(function () {
    if (!document.documentElement.classList.contains('provider-origamia')) return;

    // ── Loader plein écran : masque toute la mise en place 
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

    // ── Console OUVERTE par défaut 
    let consoleDone = false;
    const ensureConsoleOpen = function () {
        if (consoleDone) return;
        const monitor = document.getElementById('monitor');
        if (typeof InterfaceMonitor === 'undefined' || !monitor) return; // pas prêt
        if (monitor.classList.contains('monitor-closed')) {
            InterfaceMonitor.toggle(); // ouvre
        }
        consoleDone = true;
    };
    const consoleTimer = setInterval(function () {
        ensureConsoleOpen();
        if (consoleDone) clearInterval(consoleTimer);
    }, 200);
    setTimeout(function () { clearInterval(consoleTimer); }, 6000);

    // ── Toolbox PLATE (flyout) avec uniquement les blocs de l'exercice
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

    // ── Contrôles de zoom Blockly déplacés EN BAS À GAUCHE 
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

    // ── Cadre du workspace
    const GAP_TOP = 28;
    const MASK_UP = 9;
    let activeFlyoutSb = null;
    const GAP_RIGHT = 18;
    let hsbOffset = null;
    let vsbOffset = null;
    const SCROLLBAR_AUTO = true;
    function updateWorkspaceFrame() {
        const base = document.querySelector('.ide-base');
        const ws = document.getElementById('content_blocks');
        if (!base || !ws) return;
        const monitor = document.getElementById('monitor');

        let toolboxH = 80;
        try {
            const fl = (window.Code && Code.workspace && Code.workspace.getFlyout)
                ? Code.workspace.getFlyout() : null;
            if (fl && typeof fl.getHeight === 'function' && fl.getHeight()) toolboxH = fl.getHeight();
        } catch (e) { /* fallback 80 */ }

        const baseR = base.getBoundingClientRect();
        const wsR = ws.getBoundingClientRect();
        const monOpen = monitor && monitor.classList.contains('monitor-open') && monitor.offsetWidth > 0;
        const monR = monOpen ? monitor.getBoundingClientRect() : null;

        const top = (wsR.top - baseR.top) + toolboxH + GAP_TOP;
        const left = Math.max(0, wsR.left - baseR.left);
        const right = monR ? (baseR.right - monR.left + GAP_RIGHT) : 8;
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
            backing.style.cssText = 'position:absolute;background:#fffeed;pointer-events:none;z-index:99;';
            base.appendChild(backing);
        }
        backing.style.top = top + 'px';
        backing.style.right = '0px';
        backing.style.bottom = '0px';
        backing.style.left = 'auto';
        backing.style.width = right + 'px';

        const FADE_W = 50;
        const ensureFade = function (id, side) {
            let f = document.getElementById(id);
            if (!f) {
                f = document.createElement('div');
                f.id = id;
                f.style.cssText = 'position:absolute;pointer-events:none;z-index:7;display:none;'
                    + 'background:linear-gradient(to ' + side + ', rgba(255,254,237,0), #fffeed);';
                base.appendChild(f);
            }
            return f;
        };
        const fadeR = ensureFade('origamia-toolbox-fade-r', 'right');
        const fadeL = ensureFade('origamia-toolbox-fade-l', 'left');
        [fadeR, fadeL].forEach(function (f) {
            f.style.top = (wsR.top - baseR.top) + 'px';
            f.style.height = toolboxH + 'px';
            f.style.width = FADE_W + 'px';
        });
        fadeR.style.left = 'auto'; fadeR.style.right = '0px';
        fadeL.style.left = '0px'; fadeL.style.right = 'auto';
        
        if (monitor) monitor.style.setProperty('top', top + 'px', 'important');

        const navbar = document.querySelector('.ide-navbar');
        if (navbar) navbar.style.setProperty('top', (top + 8) + 'px', 'important');

        if (SCROLLBAR_AUTO) {
        const hsb = document.querySelector('.blocklyScrollbarHorizontal.blocklyMainWorkspaceScrollbar');
        const hbg = hsb && hsb.querySelector('.blocklyScrollbarBackground');
        const handle = hsb && hsb.querySelector('.blocklyScrollbarHandle');
        if (hsb && hbg && handle) {
            if (hsbOffset != null) {
                if (hsb.style.width !== '63%') hsb.style.setProperty('width', '63%', 'important');
                const w = Math.round(parseFloat(getComputedStyle(hsb).width)) || 0;
                if (w) {
                    if (hbg.getAttribute('width') != w) hbg.setAttribute('width', w);
                    const newHw = Math.max(16, Math.round(w - hsbOffset));
                    if (handle.getAttribute('width') != newHw) handle.setAttribute('width', newHw);
                }
            }
        }
        
        const vsb = document.querySelector('.blocklyScrollbarVertical.blocklyMainWorkspaceScrollbar');
        const vbg = vsb && vsb.querySelector('.blocklyScrollbarBackground');
        const vhandle = vsb && vsb.querySelector('.blocklyScrollbarHandle');
        if (vsb && vbg && vhandle && vsbOffset != null) {
            const h = Math.round(parseFloat(getComputedStyle(vsb).height)) || 0;
            if (h) {
                if (vbg.getAttribute('height') != h) vbg.setAttribute('height', h);
                const newVh = Math.max(16, Math.round(h - vsbOffset));
                if (vhandle.getAttribute('height') != newVh) vhandle.setAttribute('height', newVh);
            }
        }

        const fsbs = Array.from(document.querySelectorAll('.blocklyScrollbarHorizontal.blocklyFlyoutScrollbar'));
        const fsbY = function (f) {
            const t = f.getAttribute('transform') || f.style.transform || '';
            const m = t.match(/translate\(\s*-?[\d.]+(?:px)?[ ,]+(-?[\d.]+)/);
            return m ? parseFloat(m[1]) : -Infinity;
        };
        let bestFsb = null, bestY = -Infinity;
        fsbs.forEach(function (f) { const y = fsbY(f); if (y > bestY) { bestY = y; bestFsb = f; } });
        activeFlyoutSb = bestFsb;
        fsbs.forEach(function (f) {
            const active = (f === bestFsb);
            const fbg = f.querySelector('.blocklyScrollbarBackground');
            if (fbg) fbg.style.fill = active ? '#fffeed' : '';
            f.style.background = active ? '#fffeed' : '';
            f.style.left = active ? '-3px' : '';
        });
        }

        moveZoomLeft();
        updateToolboxFades();
    }

    
    function updateToolboxFades() {
        const fadeR = document.getElementById('origamia-toolbox-fade-r');
        const fadeL = document.getElementById('origamia-toolbox-fade-l');
        if (!fadeR || !fadeL) return;
        let showL = false, showR = false;
        const sb = activeFlyoutSb;
        if (sb && document.body.contains(sb)) {
            const bg = sb.querySelector('.blocklyScrollbarBackground');
            const hd = sb.querySelector('.blocklyScrollbarHandle');
            if (bg && hd) {
                const tR = bg.getBoundingClientRect();
                const hR = hd.getBoundingClientRect();
                if (tR.width - hR.width > 3) {
                    showL = hR.left > tR.left + 2;
                    showR = hR.right < tR.right - 2;
                }
            }
        }
        fadeR.style.display = showR ? 'block' : 'none';
        fadeL.style.display = showL ? 'block' : 'none';
    }
    window.addEventListener('resize', updateWorkspaceFrame);
    setInterval(updateWorkspaceFrame, 400);
    setInterval(updateToolboxFades, 120);

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
    const stableTimer = setInterval(function () {
        const gen = document.getElementById('generator');
        const hsb = document.querySelector('.blocklyScrollbarHorizontal.blocklyMainWorkspaceScrollbar');
        const hbg = hsb && hsb.querySelector('.blocklyScrollbarBackground');
        const handle = hsb && hsb.querySelector('.blocklyScrollbarHandle');
        const blocksReady = gen && gen.offsetWidth <= 2;
        if (blocksReady && hbg && handle) {
            stableCount++;
            if (stableCount >= 3) {
                clearInterval(stableTimer);
                if (hsbOffset === null) {
                    const bg0 = parseFloat(hbg.getAttribute('width')) || 0;
                    const h0 = parseFloat(handle.getAttribute('width')) || 0;
                    if (bg0 > 20 && h0 > 0 && bg0 > h0) hsbOffset = bg0 - h0;
                    console.log('[origamia] stable -> offset H:', hsbOffset, '| fond:', bg0, '| poignée:', h0);
                }
                if (vsbOffset === null) {
                    const vsb = document.querySelector('.blocklyScrollbarVertical.blocklyMainWorkspaceScrollbar');
                    const vbg = vsb && vsb.querySelector('.blocklyScrollbarBackground');
                    const vhandle = vsb && vsb.querySelector('.blocklyScrollbarHandle');
                    if (vbg && vhandle) {
                        const vbg0 = parseFloat(vbg.getAttribute('height')) || 0;
                        const vh0 = parseFloat(vhandle.getAttribute('height')) || 0;
                        if (vbg0 > 20 && vh0 > 0 && vbg0 > vh0) vsbOffset = vbg0 - vh0;
                        console.log('[origamia] stable -> offset V:', vsbOffset, '| fond:', vbg0, '| poignée:', vh0);
                    }
                }
                updateWorkspaceFrame();
                hideLoader();
            }
        } else {
            stableCount = 0;
        }
    }, 200);
    setTimeout(function () { clearInterval(stableTimer); hideLoader(); }, 15000);
})();
