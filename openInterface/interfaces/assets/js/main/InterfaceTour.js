/**
 * Guided tour of the interface: one step per part of the page (projects, blocks, code, upload, simulator, console…).
 * Loaded at the first use (startInterfaceTour, events/buttons.js), with Shepherd.
 * A step is shown only when its element is on the page and visible: the tour fits every interface (with or without
 * simulator, console…) and the current mode (blocks, hybrid, code).
 * Texts: code.tour.<step id>.title / .text of ns.json.
 */
const InterfaceTour = {
    SHEPHERD_PATH: '/openInterface/interfaces/assets/js/external/shepherd.js@10.0.1/sheperd',

    // targets: candidate elements, the first visible one is highlighted (selector, or function for the ones without id)
    STEPS: [
        { id: 'welcome' },
        { id: 'project', targets: ['.project-title-row', '#edit-project-name'], on: 'bottom' },
        { id: 'files', targets: ['#manage-button-panel', '.ide-dropdown-files'], on: 'bottom' },
        { id: 'undo', targets: ['#code-buttons-panel'], on: 'bottom' },
        { id: 'toolbox', targets: ['.blocklyToolbox'], on: 'right' },
        { id: 'workspace', targets: ['#content_blocks'], on: 'right' },
        { id: 'workspaceTools', targets: [() => InterfaceTour.region('#content_blocks svg.blocklySvg > g > foreignObject > button')], on: 'left' },
        { id: 'code', targets: ['#content_code'], on: 'left' },
        { id: 'modes', targets: ['.ide-btn-group-mode', '.ide-dropdown-modes'], on: 'bottom' },
        // in the browser (Python, web page) or on the hardware (board, robot, calculator)
        { id: 'upload', targets: ['#execution-buttons-panel'], on: 'bottom', variant: () => document.querySelector('#runButtonPython, #executeCode') ? 'run' : 'upload' },
        { id: 'simulator', targets: ['#simulator-btn-panel'], on: 'bottom' },
        { id: 'console', targets: ['#monitor-content', '#console'], on: 'top' },
        { id: 'consoleModes', targets: ['#monitor-view-group-btn'], on: 'left' },
        { id: 'consoleTools', targets: [() => document.querySelector('#repl-control, #tracer-export')?.parentElement, '#serial-input-group'], on: 'top' },
        { id: 'fullscreen', targets: ['.fullscreen-btn-panel'], on: 'bottom' },
        { id: 'settings', targets: [() => document.querySelector('.ide-btn-group-settings')?.parentElement], on: 'bottom' },
        { id: 'end' }
    ],

    /**
     * After the tour, a first program built by the user: open the category (path: category then sub-category), drag the
     * block into the start block (into, null: anywhere), then start the simulator (run: 'simulator') or the program
     * (run: 'python'). Only where the interface declares one.
     */
    MISSIONS: {
        microbit: { path: ['display', 'display_microbit'], block: 'show_string', into: 'forever', run: 'simulator' },
        arduino: { path: ['display', 'display_arduino_arduino'], block: 'io_control_arduino_led', into: 'forever', run: 'simulator' },
        esp32: { path: ['display', 'display_esp32'], block: 'display_controlBuiltInLED', into: 'forever', run: 'simulator' },
        galaxia: { path: ['display', 'display_galaxia'], block: 'display_galaxia_screen_set_text', into: 'forever', run: 'simulator' },
        picaxe: { path: ['autoprog'], block: 'autoprog_output', into: 'forever', run: 'simulator' },
        python: { path: ['display', 'display_console'], block: 'display_print', into: null, run: 'python' }
    },

    /**
     * @return {Object|null} the mission of the interface, when it can be done here (blocks shown, categories of the
     * board, start block in the workspace)
     */
    mission() {
        const mission = this.MISSIONS[INTERFACE_NAME];
        if (!mission || !this.isVisible(document.querySelector('.blocklyToolbox')) || !Blockly.Blocks[mission.block]) return null;
        const workspace = Main.getWorkSpace();
        const toolbox = workspace.getToolbox();
        if (!toolbox || mission.path.some(id => !toolbox.getToolboxItemById(id))) return null;
        if (mission.into && !workspace.getTopBlocks(false).some(block => block.type === mission.into)) return null;
        return mission;
    },

    /**
     * Elements without common parent (the workspace tools: backpack, screenshot, zoom, trash): a transparent box over
     * all of them, for Shepherd to highlight.
     * @param {string} selector
     * @return {Element|null}
     */
    region(selector) {
        const rects = [...document.querySelectorAll(selector)].filter(e => this.isVisible(e)).map(e => e.getBoundingClientRect());
        if (!rects.length) return null;
        const box = document.createElement('div');
        box.className = 'interface-tour-region';
        const left = Math.min(...rects.map(r => r.left)), top = Math.min(...rects.map(r => r.top));
        Object.assign(box.style, {
            position: 'fixed', pointerEvents: 'none', left: left + 'px', top: top + 'px',
            width: Math.max(...rects.map(r => r.right)) - left + 'px', height: Math.max(...rects.map(r => r.bottom)) - top + 'px'
        });
        document.body.appendChild(box);
        return box;
    },

    /**
     * @param {Element} element
     * @return {boolean} displayed with a size (not in a hidden panel or mode: the code editor of the blocks mode is 1px wide)
     */
    isVisible(element) {
        if (!element) return false;
        if (typeof element.checkVisibility === 'function' && !element.checkVisibility()) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 10 && rect.height > 10;
    },

    /**
     * @param {Object} step
     * @return {Element|null} the first visible target of the step
     */
    findTarget(step) {
        for (const target of step.targets) {
            const element = typeof target === 'function' ? target() : document.querySelector(target);
            if (this.isVisible(element)) return element;
        }
        return null;
    },

    /**
     * Steps of this page: without target (welcome, end) or with a visible one.
     * @return {Array<{id: string, element: Element|null, on: string}>}
     */
    availableSteps() {
        return this.STEPS
            .map(step => ({ ...step, id: step.variant ? step.variant() : step.id, element: step.targets ? this.findTarget(step) : null }))
            .filter(step => !step.targets || step.element);
    },

    /**
     * Vittabot guides the tour: the text of a step said by him, in a speech bubble. Bigger on the steps without target
     * (welcome, end) and on the success of the mission (classes: interface-tour-big)
     * @param {string} text
     * @return {string}
     */
    say(text) {
        return `<div class="interface-tour-bot"><span class="interface-tour-face"><img src="${CDN_PATH}/openInterface/interfaces/assets/media/vittabot.png" alt=""><i class="interface-tour-mouth"></i></span><div class="interface-tour-speech">${text}</div></div>`;
    },

    /**
     * Vittabot says the text of the shown step letter by letter, like in a dialogue (a click on the bubble shows it
     * all). The bubble keeps the size of the whole text, and screen readers get the whole text at once.
     * @param {Element} element of the step
     */
    type(element) {
        const speech = element && element.querySelector('.interface-tour-speech');
        if (!speech || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // the whole text, transparent, sizes the bubble; the typed one over it
        speech.innerHTML = `<span class="interface-tour-whole">${speech.innerHTML}</span><span aria-hidden="true">${speech.innerHTML}</span>`;
        const walker = document.createTreeWalker(speech.lastElementChild, NodeFilter.SHOW_TEXT);
        const texts = [];
        while (walker.nextNode()) texts.push({ node: walker.currentNode, text: walker.currentNode.data });
        texts.forEach(({ node }) => node.data = '');
        const bot = speech.parentElement;
        bot.classList.add('interface-tour-talking');
        const stop = () => {
            clearInterval(timer);
            bot.classList.remove('interface-tour-talking');
        };
        let k = 0;
        const timer = setInterval(() => {
            const current = texts[k];
            if (!current || !speech.isConnected) return stop();
            current.node.data = current.text.slice(0, current.node.data.length + 2);
            if (current.node.data.length >= current.text.length) k++;
        }, 30);
        speech.addEventListener('click', () => {
            stop();
            texts.forEach(({ node, text }) => node.data = text);
        });
    },

    // above the Blockly and Ace widgets, colours of the interface theme (light or dark)
    CSS: `
        .interface-tour-bot { --bot-height: 130px; display: flex; align-items: flex-start; gap: 14px; }
        .shepherd-element.interface-tour-big { max-width: 460px; }
        .interface-tour-big .interface-tour-bot { --bot-height: 220px; }
        @media (max-width: 767px) { .interface-tour-big .interface-tour-bot { --bot-height: 130px; } }
        .interface-tour-face { position: relative; flex: none; animation: interface-tour-bot .4s ease-out; }
        .interface-tour-face img { display: block; height: var(--bot-height); }
        /* the mouth (not in vittabot.png): opens and closes while Vittabot talks (type) */
        .interface-tour-mouth { position: absolute; left: 51%; top: 30.15%; width: 6.2%; aspect-ratio: 1; border-radius: 50%; background: #333; transform: translate(-50%, -50%); }
        .interface-tour-bot.interface-tour-talking .interface-tour-mouth { animation: interface-tour-talk .18s ease-in-out infinite alternate; }
        @keyframes interface-tour-talk { from { transform: translate(-50%, -50%) scale(1.3, .35); } to { transform: translate(-50%, -50%) scale(1, 1.5); } }
        /* the bubble beside the head of Vittabot, its tip at his mouth (30% of his height) */
        .interface-tour-speech { position: relative; flex: 1; padding: 8px 12px; border-radius: 12px; background: var(--bg-2, #f1f5f3); }
        .interface-tour-speech:has(.interface-tour-whole) { display: grid; }
        .interface-tour-speech:has(.interface-tour-whole) > span { grid-area: 1 / 1; }
        .interface-tour-whole { opacity: 0; }
        .interface-tour-speech kbd:empty { display: none; }
        .interface-tour-speech:before { content: ''; position: absolute; left: -7px; top: min(calc(var(--bot-height) * .3 - 7px), calc(100% - 21px)); border: 7px solid transparent; border-left: 0; border-right-color: var(--bg-2, #f1f5f3); }
        @keyframes interface-tour-bot { from { transform: translateY(6px) rotate(-8deg); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .interface-tour-face { animation: none; } }
        .shepherd-element.interface-tour { max-width: 380px; z-index: 100000; background: var(--bg-1, #fff); color: var(--text-1, #222); }
        .interface-tour .shepherd-header { background: transparent !important; padding: 12px 16px 0; }
        .interface-tour .shepherd-title { color: var(--vitta-green, #22b573); font-weight: 700; flex: 1; }
        .interface-tour .interface-tour-progress { float: right; font-size: .8rem; font-weight: 400; color: var(--text-2, #777); margin-left: 8px; }
        .interface-tour .shepherd-text { color: inherit; padding: 8px 16px; }
        .interface-tour .shepherd-footer { gap: 8px; padding: 0 16px 12px; }
        .interface-tour .shepherd-arrow:before { background: var(--bg-1, #fff) !important; }
        .shepherd-modal-overlay-container { z-index: 99999; }
        body.interface-tour-mission .shepherd-target { outline: 3px solid var(--vitta-green, #22b573); outline-offset: 2px; border-radius: 6px; }
        .interface-tour-pulse { animation: interface-tour-pulse 1.2s ease-in-out infinite; }
        @keyframes interface-tour-pulse { 50% { filter: drop-shadow(0 0 6px #22b573) drop-shadow(0 0 2px #22b573); } }
        @media (prefers-reduced-motion: reduce) { .interface-tour-pulse { animation: none; filter: drop-shadow(0 0 4px #22b573); } }
    `,

    async loadShepherd() {
        if (!document.getElementById('interface-tour-style')) {
            const style = document.createElement('style');
            style.id = 'interface-tour-style';
            style.textContent = this.CSS;
            document.head.appendChild(style);
        }
        if (typeof Shepherd !== 'undefined') return;
        await Promise.all([
            VittaInterface.loadResources([`${CDN_PATH}${this.SHEPHERD_PATH}.js`], VittaInterface.loadScript),
            VittaInterface.loadResources([`${CDN_PATH}${this.SHEPHERD_PATH}.css`], VittaInterface.loadCSS)
        ]);
    },

    async start() {
        await this.loadShepherd();
        if (this.tour) this.tour.cancel();
        document.querySelectorAll('.interface-tour-region').forEach(box => box.remove());
        const steps = this.availableSteps();
        const tour = this.tour = new Shepherd.Tour({
            useModalOverlay: true,
            keyboardNavigation: true,
            exitOnEsc: true,
            defaultStepOptions: {
                classes: 'interface-tour',
                when: { show() { InterfaceTour.type(this.getElement()); } },
                cancelIcon: { enabled: true, label: jsonPath('code.tour.buttons.quit') },
                scrollTo: { behavior: 'smooth', block: 'center' },
                modalOverlayOpeningPadding: 4,
                modalOverlayOpeningRadius: 8
            }
        });
        steps.forEach((step, i) => {
            const first = i === 0, last = i === steps.length - 1;
            const buttons = [];
            if (!first) buttons.push({ text: jsonPath('code.tour.buttons.previous'), classes: 'btn btn-outline-secondary', action: tour.back });
            if (last && this.mission()) {
                buttons.push({ text: jsonPath('code.tour.buttons.finish'), classes: 'btn btn-outline-secondary', action: tour.complete });
                buttons.push({ text: jsonPath('code.tour.buttons.try'), classes: 'btn btn-primary', action: () => { tour.complete(); this.startMission(); } });
            } else {
                buttons.push(last
                    ? { text: jsonPath('code.tour.buttons.finish'), classes: 'btn btn-primary', action: tour.complete }
                    : { text: jsonPath('code.tour.buttons.next'), classes: 'btn btn-primary', action: tour.next });
            }
            tour.addStep({
                id: 'tour-' + step.id,
                title: `${jsonPath(`code.tour.${step.id}.title`)} <span class="interface-tour-progress">${i + 1}/${steps.length}</span>`,
                text: this.say(jsonPath(`code.tour.${step.id}.text`) + (last && this.mission() ? ' ' + jsonPath('code.tour.mission.invite') : '')),
                attachTo: step.element ? { element: step.element, on: step.on } : undefined,
                classes: step.element ? 'interface-tour' : 'interface-tour interface-tour-big',
                buttons
            });
        });
        const end = () => {
            this.tour = null;
            document.querySelectorAll('.interface-tour-region').forEach(box => box.remove());
        };
        tour.on('complete', end);
        tour.on('cancel', end);
        tour.start();
        return tour;
    },

    /**
     * The mission (MISSIONS): a tour without overlay, the user acts on the page, each step goes on by itself once done.
     */
    async startMission() {
        const mission = this.mission();
        if (!mission) return;
        const workspace = Main.getWorkSpace();
        const toolbox = workspace.getToolbox();
        // the text of a block: its labels only, no alt text of the images (*), no token for the empty inputs (?)
        const label = (block) => {
            const alts = new Set(block.getDescendants(false).flatMap(child => child.inputList.flatMap(input => input.fieldRow))
                .filter(field => field instanceof Blockly.FieldImage).map(field => field.getText()));
            return block.toString(undefined, '').split(/\s+/).filter(word => word && !alts.has(word)).join(' ');
        };
        // the block as shown in the toolbox (its xml may have placeholders: {hello})
        const blockText = (() => {
            const xml = (ToolboxManager.getXmlByBlockType(mission.block) || `<block type="${mission.block}"></block>`)
                .replace(/\{([a-zA-Z0-9]+)\}/g, (all, key) => (typeof Blockly.MESSAGES !== 'undefined' && Blockly.MESSAGES[key]) || key);
            const ws = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(`<xml>${xml}</xml>`), ws);
            const block = ws.getTopBlocks(false)[0];
            const text = block ? label(block) : mission.block;
            ws.dispose();
            return text;
        })();
        // the flyout may show the block several times (show_string with a number, with a text): the one of the toolbox xml
        const flyoutBlock = () => {
            const flyout = workspace.getFlyout();
            const blocks = flyout && flyout.isVisible() ? flyout.getWorkspace().getTopBlocks(true).filter(block => block.type === mission.block) : [];
            return blocks.find(block => label(block) === blockText) || blocks[0];
        };
        const intoText = mission.into && label(workspace.getTopBlocks(false).find(block => block.type === mission.into));
        // blocks of the mission in place: the mission goes on when there is one more
        const placed = () => workspace.getAllBlocks(false)
            .filter(block => block.type === mission.block && (!mission.into || block.getRootBlock().type === mission.into)).length;
        const placedAtStart = placed();

        const tour = this.tour = new Shepherd.Tour({
            useModalOverlay: false,
            keyboardNavigation: false,
            exitOnEsc: true,
            defaultStepOptions: {
                classes: 'interface-tour',
                when: { show() { InterfaceTour.type(this.getElement()); } },
                cancelIcon: { enabled: true, label: jsonPath('code.tour.buttons.quit') },
                scrollTo: { behavior: 'smooth', block: 'center' },
                // Shepherd focuses each step: Blockly would then close the flyout the user has to drag from
                popperOptions: { modifiers: [{ name: 'focusAfterRender', enabled: false }] }
            }
        });
        const skip = { text: jsonPath('code.tour.buttons.skip'), classes: 'btn btn-outline-secondary', action: () => tour.next() };
        const title = (key, i, n) => `${jsonPath(`code.tour.mission.${key}.title`)} <span class="interface-tour-progress">${i}/${n}</span>`;
        const total = mission.path.length + 3;
        mission.path.forEach((id, k) => tour.addStep({
            id: `mission-category-${k}`,
            title: title('category', k + 1, total),
            text: this.say(jsonPath('code.tour.mission.category.text').replace('{name}', toolbox.getToolboxItemById(id).getName())),
            attachTo: { element: `#${CSS.escape(id)}`, on: 'right' },
            buttons: [skip]
        }));
        const blockStep = tour.addStep({
            id: 'mission-block',
            title: title('block', mission.path.length + 1, total),
            text: this.say((mission.into ? jsonPath('code.tour.mission.block.text').replace('{into}', intoText) : jsonPath('code.tour.mission.block.textAnywhere'))
                .replace('{block}', blockText)),
            // the block in the toolbox, once its category is open
            beforeShowPromise: () => waitFor(() => flyoutBlock()).then(() => {
                const block = flyoutBlock();
                const svg = block.getSvgRoot();
                // the flyout scrolls itself, not the page: block at the top of it
                const flyoutWorkspace = workspace.getFlyout().getWorkspace();
                flyoutWorkspace.scrollbar?.setY(block.getRelativeToSurfaceXY().y * flyoutWorkspace.scale - 40);
                svg.classList.add('interface-tour-pulse');
                // the text of the block shown (its defaults may differ from the toolbox xml)
                blockStep.options.text = blockStep.options.text.replace(blockText, label(block));
                blockStep.options.attachTo = { element: svg, on: 'bottom' };
            }),
            buttons: [skip]
        });
        const run = mission.run === 'python'
            ? { key: 'run', element: '#execution-buttons-panel', advanceOn: { selector: '#runButtonPython', event: 'click' } }
            : { key: 'simulator', element: '#simulator-btn-panel' };
        tour.addStep({
            id: 'mission-run',
            title: title(run.key, mission.path.length + 2, total),
            text: this.say(jsonPath(`code.tour.mission.${run.key}.text`)),
            attachTo: { element: run.element, on: 'bottom' },
            advanceOn: run.advanceOn,
            buttons: [skip]
        });
        // the result: simulator, or console of the Python interface
        const result = mission.run === 'python' ? '#console' : '#simulator';
        tour.addStep({
            id: 'mission-done',
            classes: 'interface-tour interface-tour-big',
            title: title('done', total, total),
            text: this.say(jsonPath(mission.run === 'python' ? 'code.tour.mission.done.textConsole' : 'code.tour.mission.done.text')),
            // once the panel has finished opening: placed during its animation, the bubble stays hidden
            beforeShowPromise: () => {
                let last;
                return waitFor(() => {
                    const element = document.querySelector(result);
                    const rect = element && this.isVisible(element) && JSON.stringify(element.getBoundingClientRect());
                    const stable = rect && rect === last;
                    last = rect;
                    return stable;
                }, 300);
            },
            attachTo: { element: result, on: mission.run === 'python' ? 'top' : 'left' },
            buttons: [{ text: jsonPath('code.tour.buttons.finish'), classes: 'btn btn-primary', action: () => tour.complete() }]
        });

        // the actions of the user move the mission on
        const current = () => tour.getCurrentStep() && tour.getCurrentStep().id;
        const listener = (event) => {
            if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT && event.newItem) {
                // event.newItem is the category name, the path holds ids
                const selected = workspace.getToolbox().getSelectedItem();
                const k = selected ? mission.path.indexOf(selected.getId()) : -1;
                if (k === mission.path.length - 1 && /^mission-category/.test(current())) tour.show('mission-block');
                else if (k >= 0 && current() === `mission-category-${k}`) tour.next();
            } else if (current() === 'mission-block' && placed() > placedAtStart) {
                tour.next();
            }
        };
        workspace.addChangeListener(listener);
        const running = mission.run === 'simulator' && setInterval(() => {
            if (current() === 'mission-run' && typeof Simulator !== 'undefined' && Simulator.isRunning) tour.next();
        }, 300);
        document.body.classList.add('interface-tour-mission');
        const end = () => {
            workspace.removeChangeListener(listener);
            clearInterval(running);
            document.body.classList.remove('interface-tour-mission');
            document.querySelectorAll('.interface-tour-pulse').forEach(element => element.classList.remove('interface-tour-pulse'));
            this.tour = null;
        };
        tour.on('complete', end);
        tour.on('cancel', end);
        tour.start();
        return tour;
    }
};
