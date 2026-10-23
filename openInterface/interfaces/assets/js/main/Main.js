/**
 * Blockly Demos: Code
 * Copyright 2019 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is vittascience's intellectual property.
 * 
 * This file was widely edited and was written on top of the original code.js provided by Google.
 * This code purpose is to provide necessary features for the platform on top of Blockly's Code demo.
 * See recycle_code.js for the original Blockly's Code demo
 */

/** 
 * @fileoverview JavaScript for Blockly's Code 
 * @author: Dainer (Oussama Ben Ghorbel)
 */

'use strict';

/**
 * Create a namespace for the application.
 * In case of ambiguity with the scoping refer to: 
 * https://kamranahmed.info/blog/2015/01/03/private-and-public-scopes-in-javascript/?fbclid=IwAR04JN1Flp6KcjtAtUOfOA1sO39h_JuBY9SJfh5MIicIZHHXIJwf7Z5ZO14
 */
const Main = (function () {
    const Code = {
        timeoutChange: true
    };
    Code.previousCode = '';
    Code.isEditorLocked = false;
    Code.userConsentCodeToBlocks = null;

    /**
     * Blockly's main workspace.
     * @type {Blockly.WorkspaceSvg}
     */
    Code.workspace = null;
    Code.initFocus = false;
    Code.forceGeneration = false;

    Code.isToolboxLoaded = false;

    Code.inIframe = function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };

    Code.getInterface = function () {
        return CodeManager.getSharedInstance().getInterface();
    };

    /**
     * Extracts a parameter from the URL.
     * If the parameter is absent default_value is returned.
     * @param {string} name The name of the parameter.
     * @param {string} defaultValue Value to return if parameter not found.
     * @return {string} The parameter value or the default value if not found.
     */
    Code.getStringParamFromUrl = function (name, defaultValue) {
        var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
        return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
    };

    Code.getCodeMode = function (fromFinder = false) {
        let codeMode = null;
        if (fromFinder && typeof projectManager !== 'undefined' && projectManager && projectManager._currentProject) {
            codeMode = projectManager._currentProject.mode;
        }
        if (!codeMode && $_GET("mode")) {
            codeMode = $_GET("mode");
        }
        if (!codeMode && typeof projectManager !== 'undefined' && projectManager && projectManager._currentProject) {
            codeMode = projectManager._currentProject.mode;
        }
        if (!codeMode && $(window).width() < 600) {
            codeMode = MODE_BLOCKS;
        }
        if (!codeMode) {
            codeMode = MODE_MIXED;
        }
        return codeMode;
    };

    /**
     * Reload with a needed language and mode
     */
    Code.setLanguageAndMode = function () {
        // Store the blocks for the duration of the reload.
        // MSIE 11 does not support sessionStorage on file:// URLs.
        if (window.sessionStorage) {
            const xml = Blockly.Xml.workspaceToDom(Code.workspace);
            const text = Blockly.Xml.domToText(xml);
            window.sessionStorage.loadOnceBlocks = text;
        }
    };

    /**
     * User's language (e.g. "fr").
     * @type {string}
     */
    Code.LANG = 'fr';
    if (getCookie('lng').length > 0) {
        Code.LANG = getCookie('lng');
    }

    if (INTERFACE_NAME == 'python') {
        Sk.configure({
            __future__: Sk.python3,
            read: function (filename) {
                if (Sk.builtinFiles === undefined ||
                    Sk.builtinFiles["files"][filename] === undefined) {
                    throw "File not found: '" + filename + "'";
                }
                return Sk.builtinFiles["files"][filename];
            }
        });
    }

    /**
     * Python interface: after the conversion of the code into blocks (Python2Blocks), keep the project XML in sync with
     * the workspace and apply the toolbox restriction.
     */
    if (INTERFACE_NAME == 'python') {
        document.addEventListener('python2blocks:injected', () => {
            if (typeof projectManager !== 'undefined' && projectManager && projectManager._currentProject) {
                projectManager._currentProject.code = CodeManager.getSharedInstance().getXml();
            }
            if ($("#toolboxRestriction").is(':checked')) {
                const workspaceBlocks = Blockly.getMainWorkspace().getAllBlocks().filter(block => !block.isShadow());
                const restrictedBlockTypes = Code.toolbox.updateVariantBlocks(workspaceBlocks);
                Code.toolbox.restrictTo(restrictedBlockTypes);
            }
        });
    }

    Code.editor = {};
    Code.initEditor = function () {

        Code.editor.container = ace.edit(document.getElementById("content_code"));

        const codeManager = CodeManager.getSharedInstance();
        if (INTERFACE_NAME == 'arduinoq' && typeof MultiCodeManager !== 'undefined' && codeManager instanceof MultiCodeManager) {
            codeManager.initGeneratedCodeTabs(Code.editor.container);
        }

        InterfaceAutocomplete.init(Code.editor.container, Code.getInterface());

        /**
         * Keybord escape from Ace editor : Esc + tab
         * https://github.com/ajaxorg/ace/issues/3149
         */
        Code.editor.container.commands.addCommand({
            name: "escape",
            bindKey: { win: "Esc", mac: "Esc" },
            exec: () => {
                const editor = this.editor;
                editor.setCommandEnabled(editor.container, "indent", false);
                editor.setCommandEnabled(editor.container, "outdent", false);
            }
        });
        /**
         * hide the flyout when the code editor is focused in code mode for interfaces with drag and drop (TI-83), and no workspace
        */
        Code.editor.container.on('focus', () => {
            Code.previousCode = CodeManager.getSharedInstance().getTextCode();
            if (INTERFACE_NAME === 'TI-83' && Main.getCodingMode() === MODE_CODE) {
                Main.getWorkSpace().getFlyout().hide();
            }
            const editor = this.editor;
            editor.setCommandEnabled(editor.container, "indent", true);
            editor.setCommandEnabled(editor.container, "outdent", true);
        });

        /**
         * @description Zoom in/out the editor
         */
        const parentContentCode = document.getElementById('content_code').parentElement;
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="btn-zoom-editor" onclick="Main.toggleZoomInEditor()" tabindex=0 data-toggle="tooltip" data-placement="top" title="Zoom-in" data-i18n="[title]code.editor.buttons.zoomIn;[aria-label]code.editor.buttons.zoomIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 41">
                    <g id="zoom" transform="translate(-1172 -644)">
                    <g id="Ellipse_834" data-name="Ellipse 834" transform="translate(1172 644)" fill="none" stroke="currentColor" stroke-width="3">
                        <circle cx="20.5" cy="20.5" r="20.5" stroke="none"/>
                        <circle cx="20.5" cy="20.5" r="19.5" fill="none"/>
                    </g>
                    <line id="Ligne_908" data-name="Ligne 908" y2="18" transform="translate(1192.5 656.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                    <line id="Ligne_909" data-name="Ligne 909" x2="18" transform="translate(1183.5 665.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                    </g>
                </svg>
            </button>
            <button class="btn-zoom-editor" onclick="Main.toggleZoomOutEditor()" tabindex=0 data-toggle="tooltip" data-placement="top" title="Zoom-out" data-i18n="[title]code.editor.buttons.zoomOut;[aria-label]code.editor.buttons.zoomOut">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 41">
                    <g id="dezoom" transform="translate(-1172 -689)">
                        <g id="Ellipse_835" data-name="Ellipse 835" transform="translate(1172 689)" fill="none" stroke="currentColor" stroke-width="3">
                        <circle cx="20.5" cy="20.5" r="20.5" stroke="none"/>
                        <circle cx="20.5" cy="20.5" r="19.5" fill="none"/>
                        </g>
                        <line id="Ligne_910" data-name="Ligne 910" x2="18" transform="translate(1183.5 710.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                    </g>
                </svg>
            </button>
            <button class="btn-zoom-editor" onclick="Main.copyEditorCode()" tabindex=0 data-bs-toggle="tooltip" data-bs-placement="top" title="Copy" data-i18n="[title]code.editor.buttons.copy;[aria-label]code.editor.buttons.copy">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 41">
                    <path id="icon-copy" d="M210.425,102.151h-23a6.007,6.007,0,0,0-6,6,6.007,6.007,0,0,0-6,6v23a6.007,6.007,0,0,0,6,6h23a6.006,6.006,0,0,0,6-6,6.006,6.006,0,0,0,6-6v-23A6.006,6.006,0,0,0,210.425,102.151Zm3,29a3,3,0,0,1-3,3v-20a6.006,6.006,0,0,0-6-6h-20a3,3,0,0,1,3-3h23a3,3,0,0,1,3,3Z" transform="translate(-175.425 -102.151)" fill="currentColor"/>
                </svg>
            </button>
            <div id="copy-editor-action-notif"></div>`;

        div.classList.add('zomm-in-out-buttons');
        parentContentCode.appendChild(div);
        // Set timeout + localize check to avoid error with undefined localize method
        function tryLocalize() {
            if (typeof $('.btn-zoom-editor').localize === 'undefined') {
                return setTimeout(tryLocalize, 100);
            }
            $('.btn-zoom-editor').localize().tooltip();
        }
        tryLocalize();

        Code.editor.container.on("change", function (event) {
            const code2Blocks = Code.getCode2Blocks();
            const manualEdit = code2Blocks !== null && Code.editor.container.isFocused();
            if (manualEdit && !code2Blocks.initialized) {
                // first manual edit: tree-sitter is loaded, then the consent / translation (Code.loadCode2Blocks)
                Code.loadCode2Blocks(code2Blocks);
            } else if (manualEdit && Code.isEditorLocked && Code.userConsentCodeToBlocks === null) {
                Code.getUserConsentForTrad();
            }
            if (Code.editor.container.isFocused() && typeof projectManager !== 'undefined' && projectManager !== null && projectManager._isInitializing) {
                projectManager._userTypedDuringInit = true;
            }
            let code = Code.editor.container.getSession().getValue();
            if (INTERFACE_NAME == 'arduinoq') {
                code = CodeManager.getSharedInstance().getMergeEditorTabsCode();
            }
            if (CodeManager.getSharedInstance().isCodeSelected() || CodeManager.getSharedInstance().isCodeOnlySelected() || !Main.getIsXmlBasedInterface()) {
                const codeBlock = CodeManager.getSharedInstance().getGeneratedCode();
                if (code) {
                    if (codeBlock !== code) {
                        CodeManager.getSharedInstance().codeWasManuallyModified = true;
                    }
                    CodeManager.getSharedInstance().updateTextCode(code);
                    if (typeof projectManager !== 'undefined' && projectManager) {
                        projectManager._refreshProjectStatus();
                    }
                }
            }
            if (INTERFACE_NAME === 'python' || Main.hasCpp2Blocks() || Main.hasPython2Blocks()) {
                CodeManager.getSharedInstance().updateTextCode(code);
                if (Main.getCodingMode() === MODE_MIXED && Code.editor.container.isFocused()) {
                    CodeManager.getSharedInstance().codeWasManuallyModified = true;
                    // before the loading of tree-sitter: translated once loaded (Code.loadCode2Blocks)
                    if (code2Blocks && code2Blocks.initialized) Code.editor.convertCodeToBlocks();
                }
            }
            if (typeof Simulator !== 'undefined') {
                Simulator.lastUpdate = Date.now();
                if (Simulator.getWatchedCode() !== Simulator._userCode && Simulator.isOpen && Simulator.isStopped) {
                    Simulator.replay();
                }
            }
            if (INTERFACE_NAME === "winky" && projectManager !== null && typeof projectManager._rpc !== 'undefined') {
                if (projectManager._rpc !== null && projectManager.localStorageManager.getLocalProjectContent()) {
                    projectManager._rpc.call('get_local_storage', [projectManager.localStorageManager.getLocalProjectContent()]);
                }
            }
        });

        //not needed in actual version may be needed in future versions when certain features are introduced
        Code.editor.collapseExternalLibrariesCode = function (pattern, countToLastLine, lastLineCharCount) {
            setTimeout(() => {
                var cursor = Code.editor.container.getSearchCursor(pattern);
                while (cursor.findNext()) {
                    Code.editor.container.getDoc().markText(
                        cursor.from(), {
                        line: cursor.from().line + countToLastLine,
                        ch: lastLineCharCount
                    }, {
                        collapsed: true
                    }
                    );
                    break;
                }
            }, 1);
        };
        /**
         * Update code in the editor
         * @param {string} code Code to be inserted
         */
        Code.editor.updateCode = function () {
            const codeManager = CodeManager.getSharedInstance();
            if (typeof MultiCodeManager !== 'undefined' && codeManager instanceof MultiCodeManager) {
                codeManager.updateEditorFile();
                return;
            }
            Code.editor.container.getSession().setValue(codeManager.getCode());
        };
        /**
         * Change the current ide mode
         * @param {string} mode New mode
         */
        Code.editor.switchCodingMode = function (mode) {
            const modeChangeEvent = new CustomEvent("modeChangeEvent", {
                detail: { mode }
            });
            document.dispatchEvent(modeChangeEvent);

            const instance = CodeManager.getSharedInstance();
            instance.setCodeMode(mode);
            replaceParam("mode", mode);
            if (mode !== MODE_CODE && mode !== MODE_CODE_ONLY) {
                const currentInterfaceLS = CodeManager.getSharedInstance().localStorageManager.getLocalProjectContent();
                if (currentInterfaceLS !== null && typeof currentInterfaceLS.code === 'string') {
                    instance.setXml(currentInterfaceLS.code);
                } else {
                    if (Main.getIsXmlBasedInterface()) {
                        instance.setXml(instance.getDefaultXmlStart());
                    }
                }
            } else {
                if (instance.codeWasManuallyModified == false) {
                    instance.updateTextCode();
                }
            }
            Code.editor.updateCode();
        };
        Code.editor.convertCodeToBlocks = async function () {
            const code2Blocks = Code.getCode2Blocks();
            if (code2Blocks) {
                if (!code2Blocks.initialized) {
                    try {
                        await code2Blocks.initParser();
                    } catch (error) {
                        console.error('[code2blocks] tree-sitter not loaded', error);
                        return;
                    }
                }
                if (Main.hasCpp2Blocks()) {
                    code2Blocks.injectBlocks();
                } else {
                    code2Blocks.prepareInjection();
                }
            }
            if (typeof projectManager !== 'undefined' && projectManager) {
                projectManager._refreshProjectStatus();
            }
        };
        /**
         * https://stackoverflow.com/questions/24963246/ace-editor-simply-re-enable-command-after-disabled-it
         */
        Code.editor.setCommandEnabled = function (editor, name, enabled) {
            let command = editor.commands.byName[name]
            if (!command.bindKeyOriginal)
                command.bindKeyOriginal = command.bindKey
            command.bindKey = enabled ? command.bindKeyOriginal : null;
            editor.commands.addCommand(command);
            // special case for backspace and delete which will be called from
            // textarea if not handled by main commandb binding
            if (!enabled) {
                let key = command.bindKeyOriginal;
                if (key && typeof key == "object") {
                    key = key[editor.commands.platform];
                }
                if (/backspace|delete/i.test(key)) {
                    editor.commands.bindKey(key, "null")
                }
            }
        };
    };

    /**
     * Return true if the block greatest parent is a setup block
     * @param {*} block
     * @returns {boolean} 
     */
    Code.isParentTopBlock = function (block) {
        if (typeof BLOCKS_OUTSIDE_SCOPE !== 'undefined' && BLOCKS_OUTSIDE_SCOPE.includes(block.type)) {
            return true;
        }
        if (block.parentBlock_ === null) {
            return false;
        }
        return Code.isParentTopBlock(block.parentBlock_);
    };

    Code.vittaNotif = new VittaNotif(5);

    Code.displayBlockNotification = function (block) {
        Blockly.Events.disable(); // Désactiver les événements Blockly temporairement
        block.dispose(); // Supprimer le bloc ajouté
        Blockly.Events.enable(); // Réactiver les événements Blockly
        Code.vittaNotif.displayNotification(null, `${jsonPath('code.blockly.warning.blocks')} ${block.type}`, "bg-warning");
    };
    var draggedByGroup = null;
    /**
     *  Populate the pane with content generated from the blocks
     *  @param {object} event Event firing the render.
     */
    Code.renderContent = function (event) {
        if (typeof projectManager === undefined || !projectManager) {
            setTimeout(() => {
                Code.renderContent(event);
            }, 50);
            return;
        }
        if (event != null && event != undefined) {

            if (event.type === Blockly.Events.BLOCK_DRAG) {
                const draggedBlock = Code.workspace.getBlockById(event.blockId);
                if (draggedBlock && typeof BLOCKS_OUTSIDE_SCOPE !== 'undefined' && !BLOCKS_OUTSIDE_SCOPE.includes(draggedBlock.type)) {
                    draggedByGroup = new Set((event.blocks || []).map(b => b.id));
                }
                return;
            }

            if (event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_DELETE || event.type == Blockly.Events.BLOCK_MOVE) {
                if (Code.getInterface() !== 'python' && Code.getInterface() !== 'web') {
                    Code.manageBlocksDisabling();
                    Code.lockedEditor();
                    if (Code.getInterface() === 'pico' || Code.getInterface() === 'winky') {
                        if (event.type === Blockly.Events.BLOCK_CREATE) {
                            const block = Code.workspace.getBlockById(event.blockId);
                            if (block) {
                                if (block.type === 'process_on_start_core1') {
                                    if (typeof Blockly.Python.core1BlockUsed !== 'undefined' && Blockly.Python.core1BlockUsed !== event.blockId) {
                                        Code.displayBlockNotification(block);
                                    } else {
                                        Blockly.Python.core1BlockUsed = event.blockId; // Marquer le bloc comme utilisé
                                    }
                                }
                                if (block.type === 'network_connectWinky') {
                                    if (typeof Blockly.Python.winkyConnectBlockUsed !== 'undefined' && Blockly.Python.winkyConnectBlockUsed !== event.blockId) {
                                        Code.displayBlockNotification(block);
                                    } else {
                                        Blockly.Python.winkyConnectBlockUsed = event.blockId; // Marquer le bloc comme utilisé
                                    }
                                }
                            }
                        }
                        if (event.type === Blockly.Events.BLOCK_DELETE) {
                            if (typeof Blockly.Python.core1BlockUsed !== 'undefined' && Blockly.Python.core1BlockUsed === event.blockId) {
                                Blockly.Python.core1BlockUsed = undefined;
                            }
                            if (typeof Blockly.Python.winkyConnectBlockUsed !== 'undefined' && Blockly.Python.winkyConnectBlockUsed === event.blockId) {
                                Blockly.Python.winkyConnectBlockUsed = undefined;
                            }
                        }
                    }
                }
                if (Code.getInterface() === 'web') {
                    projectManager.renderContent(event, Code.workspace);
                }
                Code.generateCode();
            } else if (event.type == Blockly.Events.BLOCK_CHANGE && Code.timeoutChange == true) {
                Code.generateCode();
                Code.timeoutChange = false;
                setTimeout(function () {
                    Code.timeoutChange = true;
                }, 40);
            }
            if (Code.getInterface() === 'cyberpi' && (event.type == Blockly.Events.BLOCK_MOVE || event.type == Blockly.Events.BLOCK_DELETE || event.type == Blockly.Events.BLOCK_DRAG || event.type == Blockly.Events.BLOCK_CHANGE)) {
                Blockly.Constants.Utils.DISABLE_BLOCKS_ON_EVENT('forever', ['io_event_start', 'io_event_is_press', 'io_event_receive']);
            }
        }
    };

    function getHTMLInnerStatement(block) {
        const exclude = [];
        const keep = [];
        block.inputList.forEach(input => {
            if (input.type === Blockly.NEXT_STATEMENT) {
                let child = input.connection && input.connection.targetBlock();
                while (child) {
                    if (!child.outputConnection) {
                        if (Blockly.Constants.HTML_BLOCKS.includes(child.type)) {
                            keep.push(child.id);
                        } else {
                            exclude.push(child.id);
                        }
                    }
                    child = child.getNextBlock();
                }
            }
        });
        return {
            keep: keep, exclude: exclude
        }
    };

    Code.invalidBlocksMsgSeen = false;

    function displayInvalidBlocksWarning() {
        if (!Code.invalidBlocksMsgSeen) {
            pseudoModal.openModal('modal-warning-invalidBlocks');
            const firstBoards = Code.toolbox.notAllowedBoardsReason[0];
            if (firstBoards) {
                if (typeof INTERFACE_BOARDS !== 'undefined') {
                    let names = "";
                    if (typeof firstBoards == 'string') {
                        const boardName = INTERFACE_BOARDS[firstBoards].name;
                        if (boardName) names = boardName;
                    } else if (Array.isArray(firstBoards)) {
                        const boardNames = Object.values(INTERFACE_BOARDS).filter(board => firstBoards.includes(board.id)).map(board => board.name);
                        names = boardNames.join(', ');
                    }
                    if (names) {
                        document.getElementById("invalidBlocks-board-names").innerHTML = jsonPath('modals.warning.project.blocksAvailableOn') + '<b>' + names + '</b>';
                    }
                }
            }
            Code.invalidBlocksMsgSeen = true;
        }
    };

    Code.manageBlocksDisabling = function () {
        // Auto-enabling/disabling blocks is derived state. Keep it out of undo/redo history.
        Blockly.Events.disable();
        try {
        const currentBlocks = Code.workspace.getAllBlocks();
        let innerBlocksToExclude = [];
        let innerBlocksToKeep = [];
        if (draggedByGroup) {
            for (const id of draggedByGroup) {
                const b = Code.workspace.getBlockById(id);
                if (b) {
                    b.setDisabledReason(false, Blockly.constants.MANUALLY_DISABLED);
                }
            }
            draggedByGroup = null;
        }
        for (let i = 1; i < currentBlocks.length; i++) {
            // Recompute state from scratch to avoid blocks staying disabled after undo/redo.
            currentBlocks[i].setDisabledReason(false, Blockly.constants.MANUALLY_DISABLED);

            if (Code.isParentTopBlock(currentBlocks[i])) {
                if (Code.toolbox.notAllowedToRenderBlocks.includes(currentBlocks[i].type)) {
                    currentBlocks[i].setDisabledReason(true, Blockly.constants.MANUALLY_DISABLED);
                    Code.forceGeneration = true;
                    displayInvalidBlocksWarning();
                }
                if (Blockly.Constants.Network && typeof Blockly.Constants.Network.HTML_CONTAINER_BLOCKS !== 'undefined'
                    && Blockly.Constants.Network.HTML_CONTAINER_BLOCKS.includes(currentBlocks[i].type)
                    && typeof Blockly.Constants.HTML_BLOCKS !== 'undefined') {
                    const innerHTML = getHTMLInnerStatement(currentBlocks[i]);
                    innerBlocksToExclude.push(...innerHTML.exclude);
                    innerBlocksToKeep.push(...innerHTML.keep);
                }
                if (innerBlocksToExclude.includes(currentBlocks[i].id)) {
                    currentBlocks[i].setDisabledReason(true, Blockly.constants.MANUALLY_DISABLED);
                }
            } else {
                currentBlocks[i].setDisabledReason(true, Blockly.constants.MANUALLY_DISABLED);
            }
            // warn the user if the block is not allowed for translation
            if (typeof EXCLUDED_BLOCKS_FOR_TRADUCTION !== "undefined" && EXCLUDED_BLOCKS_FOR_TRADUCTION.includes(currentBlocks[i].type)) {
                if (currentBlocks[i].isEnabled()) {
                    Code.isEditorLocked = true;
                } else {
                    Code.isEditorLocked = false;
                }
            }
        }
        if (typeof Blockly.Constants.HTML_BLOCKS !== 'undefined') {
            const typeSet = new Set(Blockly.Constants.HTML_BLOCKS);
            const htmlBlocks = Code.workspace.getAllBlocks(false).filter(block => typeSet.has(block.type));
            for (const block of htmlBlocks) {
                if (!innerBlocksToKeep.includes(block.id) && !block.outputConnection) {
                    block.setDisabledReason(true, Blockly.constants.MANUALLY_DISABLED);
                }
            }
        }
        } finally {
            Blockly.Events.enable();
        }
    }
    /**
     * Need to find a better way to handle this
     * @description Init the code generation if the focus is on the content_blocks
     * @returns {void}
     * */
    document.addEventListener('focusin', function firstFocusContentBlock() {
        if (document.activeElement.closest('#content_blocks')) {
            Code.initFocus = true;
            document.removeEventListener('focusin', firstFocusContentBlock);
        }
    });

    /**
     * Refresh the localstorage then attempt to generate the code and display it in the UI, pretty printed.
     */
    Code.generateCode = function () {
        if (Code.initFocus || Code.forceGeneration || (!Main.hasPython2Blocks() && !Main.hasCpp2Blocks())) {
            try {
                if (Main.getIsXmlBasedInterface()) {
                    CodeManager.getSharedInstance().setXml();
                    CodeManager.getSharedInstance().setGeneratedCode();
                } else {
                    CodeManager.getSharedInstance().setGeneratedCode();
                    CodeManager.getSharedInstance().setXml(CodeManager.getSharedInstance().getGeneratedCode());
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            const codeManager = CodeManager.getSharedInstance();
            if (typeof MultiCodeManager !== 'undefined' && codeManager instanceof MultiCodeManager) {
                return codeManager.updateEditorFile();
            }
            return Code.editor.container.getSession().setValue(codeManager.getTextCode());
        }
        if (!Code.editor.container.isFocused()) {
            CodeManager.getSharedInstance().codeWasManuallyModified = false;
            Code.editor.updateCode();
        }
        if (typeof projectManager !== 'undefined' && projectManager) {
            projectManager._refreshProjectStatus()
        }
    };

    /**
     * Reverse translation (code -> blocks) of the interface, null if none.
     */
    Code.getCode2Blocks = function () {
        if (Main.hasCpp2Blocks()) return window.Cpp2Blocks || null;
        if (Main.hasPython2Blocks()) return window.Python2Blocks || null;
        return null;
    };

    /**
     * First manual edit of the code: load tree-sitter, then ask the consent (blocks without translation, known once
     * loaded) or translate the code in mixed mode. One loading for the edits made meanwhile.
     */
    Code.loadCode2Blocks = function (code2Blocks) {
        if (Code.code2BlocksLoading) return;
        Code.code2BlocksLoading = code2Blocks.initParser().then(() => {
            if (Code.isEditorLocked && Code.userConsentCodeToBlocks === null) return Code.getUserConsentForTrad();
            if (Main.getCodingMode() === MODE_MIXED) Code.editor.convertCodeToBlocks();
        }).catch((error) => console.error('[code2blocks] tree-sitter not loaded', error))
            .finally(() => { Code.code2BlocksLoading = null; });
    };

    /**
     * lock or unlock the editor depending of the content or the workspace
     * @returns {void}
     * */
    Code.lockedEditor = function () {
        if (!Main.hasPython2Blocks() && !Main.hasCpp2Blocks()) return;
        if (Code.userConsentCodeToBlocks === true || !Code.isEditorLocked) {
            Main.setOptionForEditor('readOnly', false);
        } else {
            Code.userConsentCodeToBlocks = null;
        }
    };

    /**
     * @description Get the user consent to translate the code to blocks. Specific modal usage to restore code if the user refuse the consent, or escape or even click outside the modal
     * @returns {Promise}
     * */
    Code.getUserConsentForTrad = () => {
        return new Promise((resolve, reject) => {
            const acceptButton = document.getElementById('modal-code-to-blocks-accept');
            const refuseButton = document.getElementById('modal-code-to-blocks-refuse');
            const modalID = 'modal-code-to-blocks-consent';
            const storedCursorPosition = Code.editor.container.getCursorPosition();

            const closeAndResolve = () => {
                pseudoModal.closeModal(modalID);
                acceptButton.removeEventListener('click', onAccept);
                refuseButton.removeEventListener('click', onRefuse);
                document.removeEventListener('keydown', onEscape);
                document.removeEventListener('click', onClickOutside);
                const oldCode = Code.previousCode || '';
                Code.editor.container.setValue(oldCode);
                Code.editor.container.gotoLine(storedCursorPosition.row + 1, storedCursorPosition.column, true);
                return resolve();
            };

            const onAccept = () => {
                Main.setOptionForEditor('readOnly', false);
                Code.userConsentCodeToBlocks = true;
                closeAndResolve();
            };

            const onRefuse = () => {
                Main.setOptionForEditor('readOnly', true);
                Code.userConsentCodeToBlocks = false;
                closeAndResolve();
            };

            const onEscape = (e) => {
                if (e.key === 'Escape') {
                    closeAndResolve();
                }
            };

            const onClickOutside = (e) => {
                const modalElement = document.getElementById(modalID);
                if (!modalElement.contains(e.target)) {
                    closeAndResolve();
                }
            };

            acceptButton.addEventListener('click', onAccept);
            refuseButton.addEventListener('click', onRefuse);
            document.addEventListener('keydown', onEscape);
            document.addEventListener('click', onClickOutside);

            Code.editor.container.gotoLine(1, 0, true);

            try {
                pseudoModal.clickOnExit('modal-code-to-blocks-consent', () => {
                    closeAndResolve();
                });
                pseudoModal.openModal(modalID);
                acceptButton.focus();
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * Check whether all blocks in use have generator functions.
     * @param generator {!Blockly.Generator} The generator to use.
     */
    Code.checkAllGeneratorFunctionsDefined = function (generator) {
        const blocks = Code.workspace.getAllBlocks(false);
        const missingBlockGenerators = [];
        for (var i = 0; i < blocks.length; i++) {
            const blockType = blocks[i].type;
            if (!generator[blockType]) {
                if (missingBlockGenerators.indexOf(blockType) === -1) {
                    missingBlockGenerators.push(blockType);
                }
            }
        }
        const valid = missingBlockGenerators.length == 0;
        if (!valid) {
            const msg = 'The generator code for the following blocks not specified for ' +
                generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
            Blockly.dialog.alert(msg); // Assuming synchronous. No callback.
        }
        return valid;
    };

    Code.toolbox = null;

    /**
     * Initialize Blockly. Called on page load.
     */
    Code.init = async function (interfaceName) {
        {
            // The toolbox XML specifies each category name using Blockly's messaging
            // format (eg. `<category name="%{BKY_CATLOGIC}">`).
            // These message keys need to be defined in `Blockly.Msg` in order to
            // be decoded by the library. Therefore, we'll use the `Blockly.MESSAGES` dictionary that's
            // been defined for each language to import each category name message
            // into `Blockly.Msg`.
            // TODO: Clean up the message files so this is done explicitly instead of
            // through this for-loop.

            Code._codeBasedInterfaces = ['web']; // List of the code based interfaces
            Code._isXmlBasedInterface = !Code._codeBasedInterfaces.includes(interfaceName);

            for (var messageKey in Blockly.MESSAGES) {
                if (messageKey.indexOf('cat') == 0) {
                    Blockly.Msg[messageKey.toUpperCase()] = Blockly.MESSAGES[messageKey];
                }
            }

            // Set the renderer of Blockly
            var match = location.search.match(/renderer=([^&]+)/);
            var renderer = match ? match[1] : 'zelos';
            window.history.pushState({}, '', removeParam("renderer", window.location.href));

            setTimeout(function () {
                if (renderer === 'zelos') {
                    $('#ide-radio-block-style-modern').prop('checked', true);
                } else {
                    $('#ide-radio-block-style-classic').prop('checked', true);
                }
            }, 2000);

            // Set initial zoom grid value
            var zoomStyle = 0.9;
            // get direction of the html element to correctly set Blockly's direction
            var isRtl = $('html').attr('dir') == 'rtl' ? true : false;
            if (renderer == 'geras') zoomStyle = 1;

            let toolbox_ = null;
            if (typeof TOOLBOXES != 'undefined' && TOOLBOXES[0].categories) {
                toolbox_ = {
                    "kind": "categoryToolbox",
                    "id": "toolbox",
                    "contents": [{
                        "kind": "category",
                        "toolboxitemid": "search",
                        "name": null,
                        "style": "search_category",
                        "cssConfig": {
                            "icon": "icon_blockly fas fa-search"
                        }
                    }]
                };
            } else {
                toolbox_ = {
                    "kind": "flyoutToolbox",
                    "id": "toolbox",
                    "contents": []
                };
            }
            Blockly.blockRendering.ConstantProvider.prototype.FIELD_COLOUR_FULL_BLOCK = false;

            // Origamia : toolbox en bande horizontale en haut (sinon disposition verticale par défaut).
            // On lit la classe posée au parse (fiable même après réécriture d'URL) plutôt que $_GET.
            const isOrigamiaProvider = document.documentElement.classList.contains('provider-origamia');

            // Origamia : toolbox PLATE (flyout, sans catégories). La populer en blocs
            // de l'exercice est géré par origamia.js (patch de ToolboxManager.setToolbox).
            if (isOrigamiaProvider) {
                toolbox_ = { "kind": "flyoutToolbox", "id": "toolbox", "contents": [] };
            }

            Code.workspace = Blockly.inject('content_blocks', {
                grid: {
                    spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                },
                media: CDN_PATH + '/openInterface/interfaces/assets/js/external/blockly/media/',
                rtl: isRtl,
                renderer: renderer,
                toolbox: toolbox_,
                horizontalLayout: isOrigamiaProvider,
                toolboxPosition: 'start',
                trashcan: true,     /* origamia : poubelle masquée en CSS (la désactiver casse le rendu des contrôles) */
                zoom: {
                    controls: true,
                    screenshot: !isOrigamiaProvider,   /* origamia : pas de bouton photo */
                    startScale: zoomStyle
                },
                move: {
                    scrollbars: {
                        horizontal: true,
                        vertical: true
                    },
                    drag: true,
                    wheel: true
                },
                comments: true,
                disable: true,
                // Auto-scroll when a block is dragged near the workspace edge (@blockly/plugin-scroll-options)
                plugins: typeof ScrollOptions !== 'undefined' ? {
                    // No auto-scroll over a drop zone (toolbox, trashcan, backpack): dropping a block there must not shift the view
                    blockDragger: class extends ScrollBlockDragger {
                        scrollWorkspaceWhileDragging_(e) {
                            if (this.dragTarget) return this.stopAutoScrolling();
                            super.scrollWorkspaceWhileDragging_(e);
                        }
                        // Only the cursor reaching an edge scrolls, not the dragged block's bounds
                        computeBlockCandidateScrolls_() { }
                    },
                    metricsManager: ScrollMetricsManager
                } : {}
            });
            // Distances in workspace units from the edge (negative = inside the workspace): slow scroll near the edge, fast once the cursor is past it
            if (typeof ScrollOptions !== 'undefined') new ScrollOptions(Code.workspace).init({ edgeScrollOptions: { slowMouseStartDistance: -30, fastMouseStartDistance: 0 } });

            Code.workspace.getRenderer().getConstants().FIELD_COLOUR_FULL_BLOCK = false;

            // WCAG 4.1.2: aria-label on a div without role is prohibited
            try {
                const injectionDiv = document.querySelector('#content_blocks .injectionDiv');
                if (injectionDiv) {
                    injectionDiv.setAttribute('role', 'region');
                }
            } catch (e) { }

            setBlocklyControlsA11y();

            // init workspace
            document.getElementById('content_blocks').style.visibility = 'visible';
            Code.workspace.setVisible(true);
            Main.resizeWorkSpace();
            // empty workspace painted before the code manager, the project blocks and the editor (no code manager yet:
            // nothing can read the project during this yield)
            await yieldToMain();
            //init Code Manager
            switch (interfaceName) {
                case "arduino":
                case "letsstartcoding":
                case "mBot":
                case "arduinoq":
                    var codeLang = Blockly.Arduino;
                    break;
                case 'web':
                    var codeLang = Blockly.JavaScript;
                    break;
                default:
                    var codeLang = Blockly.Python;
                    break;
            }
            // init code editor style
            switch (interfaceName) {
                case "TI-83":
                    $('#content_code').addClass('ace-ti');
                    break;
                case "arduino":
                case "arduinoq":
                case "letsstartcoding":
                case "mBot":
                    $('#content_code').addClass('ace-ar');
                    break;
            }

            let codeManagerClass = CodeManager;
            let codeMode = "mixed";
            switch (interfaceName) {
                case "arduinoq":
                    codeManagerClass = MultiCodeManager;
                    break;
                case "bluebot":
                case "primastem":
                    codeMode = "blocks";
                    break;
            }
            if (interfaceName === "arduinoq" && CodeManager.instance && !(CodeManager.instance instanceof MultiCodeManager)) {
                CodeManager.instance = null;
            }
            codeManagerClass.getSharedInstance(codeMode, Code.workspace, codeLang);

            if (Main.getIsXmlBasedInterface()) {
                CodeManager.getSharedInstance().loadBlocks();
            }

            //init language
            Code.setLanguageAndMode();
            //init editor
            Code.initEditor();
            //Listener that will render code for every change
            Code.workspace.addChangeListener(Code.renderContent);
            Code.workspace.addChangeListener(Blockly.Constants.WARN_DUPLICATE_PINS);

            // init toolbox
            const toolboxMode = Blockly.Constants.getToolboxStyle();
            if (ToolboxManager.toolboxDefined(toolboxMode)) {
                Code.toolbox = new ToolboxManager(Code.workspace, { mode: toolboxMode });
            } else {
                Code.toolbox = new ToolboxManager(Code.workspace);
            }
            // workspace, code manager, editor and toolbox manager ready: paint before filling the toolbox
            await yieldToMain();

            Code.toolbox.setToolbox();
            switch (interfaceName) {
                case "letsstartcoding":
                    Main.getWorkSpace().registerButtonCallback('createVariableButtonHandler',
                        function (button) {
                            Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'int');
                            const lastVarName = Main.getWorkSpace().getVariableMap().getAllVariables().map((v) => v.getName()).slice(-1);
                            Code.toolbox.pushVariable(lastVarName);
                        }
                    );
                    break;
                default:
                    break;
            }
            Code.isToolboxLoaded = true;

            Blockly.Tooltip.HOVER_MS = 200;

            // Add backpacks
            Code.backpack = new Backpack(Code.workspace);
            Code.backpack.init();
            $(".blocklyBackpack").hover(function () {
                $(this).attr('xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzcuMDggNDQuMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48Zz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMS41Nyw0LjAzaC05LjE4YzAtLjA5LC4wMy0uMTcsLjAzLS4yNiwwLTIuMDgtMS42OS0zLjc3LTMuNzctMy43N3MtMy43NywxLjY5LTMuNzcsMy43N2MwLC4wOSwuMDIsLjE3LC4wMywuMjZINS43MmMtLjg1LDAtMS41NCwuNjktMS41NCwxLjU0djExLjI5YzAsLjg1LC42OSwxLjU0LDEuNTQsMS41NGg0LjE2di0yLjIxYzAtLjU1LC40NS0xLDEtMWgxLjM2Yy41NSwwLDEsLjQ1LDEsMXYyLjIxaDEwLjc5di0yLjIxYzAtLjU1LC40NS0xLDEtMWgxLjM2Yy41NSwwLDEsLjQ1LDEsMXYyLjIxaDQuMTZjLjg1LDAsMS41NC0uNjksMS41NC0xLjU0VjUuNTdjMC0uODUtLjY5LTEuNTQtMS41NC0xLjU0Wm0tMTAuNiwwaC00LjY1YzAtLjA5LS4wMy0uMTctLjAzLS4yNiwwLTEuMywxLjA2LTIuMzUsMi4zNS0yLjM1czIuMzUsMS4wNSwyLjM1LDIuMzVjMCwuMDktLjAyLC4xNy0uMDMsLjI2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIuODMsMjEuNGgtLjI3Yy0xLjQyLDAtMi41NywxLjE1LTIuNTcsMi41N3YxMy44OGMwLDEuNDIsMS4xNSwyLjU3LDIuNTcsMi41N2guMjdWMjEuNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNC41MSwyMS40aC0uMDV2MTkuMDFoLjA1YzEuNDIsMCwyLjU3LTEuMTUsMi41Ny0yLjU3di0xMy44OGMwLTEuNDItMS4xNS0yLjU3LTIuNTctMi41N1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMS41NywxOS44MmgtNC4xNnYyLjIxYzAsLjU1LS40NSwxLTEsMWgtMS4zNmMtLjU1LDAtMS0uNDUtMS0xdi0yLjIxSDEzLjI1djIuMjFjMCwuNTUtLjQ1LDEtMSwxaC0xLjM2Yy0uNTUsMC0xLS40NS0xLTF2LTIuMjFINS43MmMtLjU0LDAtMS4wNC0uMTYtMS40Ny0uNDF2MjIuNGMwLDEuMjYsMS4wMywyLjI5LDIuMjksMi4yOUgzMC43NWMxLjI2LDAsMi4yOS0xLjAzLDIuMjktMi4yOVYxOS40MWMtLjQ0LC4yNS0uOTMsLjQxLTEuNDcsLjQxWm0tMTIuOTIsMTkuOTJjLTEwLjE5LDAtMTAuMjctNi40Ni0xMC4xOS02Ljg1LC4wOC0uMzgsMS40My01LjU3LDEwLjE5LTUuNTdzMTAuNDksNS4yLDEwLjU2LDUuNThjLjA3LC4zOCwwLDYuODQtMTAuNTYsNi44NFoiLz48L2c+PC9nPjwvc3ZnPg==')
            }, function () {
                $(this).attr('xlink:href', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzcuMDggNDQuMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48Zz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMS41Nyw0LjAzaC05LjE4YzAtLjA5LC4wMy0uMTcsLjAzLS4yNiwwLTIuMDgtMS42OS0zLjc3LTMuNzctMy43N3MtMy43NywxLjY5LTMuNzcsMy43N2MwLC4wOSwuMDIsLjE3LC4wMywuMjZINS43MmMtLjg1LDAtMS41NCwuNjktMS41NCwxLjU0djExLjI5YzAsLjg1LC42OSwxLjU0LDEuNTQsMS41NGg0LjE2di0yLjIxYzAtLjU1LC40NS0xLDEtMWgxLjM2Yy41NSwwLDEsLjQ1LDEsMXYyLjIxaDEwLjc5di0yLjIxYzAtLjU1LC40NS0xLDEtMWgxLjM2Yy41NSwwLDEsLjQ1LDEsMXYyLjIxaDQuMTZjLjg1LDAsMS41NC0uNjksMS41NC0xLjU0VjUuNTdjMC0uODUtLjY5LTEuNTQtMS41NC0xLjU0Wm0tMTAuNiwwaC00LjY1YzAtLjA5LS4wMy0uMTctLjAzLS4yNiwwLTEuMywxLjA2LTIuMzUsMi4zNS0yLjM1czIuMzUsMS4wNSwyLjM1LDIuMzVjMCwuMDktLjAyLC4xNy0uMDMsLjI2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIuODMsMjEuNGgtLjI3Yy0xLjQyLDAtMi41NywxLjE1LTIuNTcsMi41N3YxMy44OGMwLDEuNDIsMS4xNSwyLjU3LDIuNTcsMi41N2guMjdWMjEuNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNC41MSwyMS40aC0uMDV2MTkuMDFoLjA1YzEuNDIsMCwyLjU3LTEuMTUsMi41Ny0yLjU3di0xMy44OGMwLTEuNDItMS4xNS0yLjU3LTIuNTctMi41N1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMS41NywxOS44MmgtNC4xNnYyLjIxYzAsLjU1LS40NSwxLTEsMWgtMS4zNmMtLjU1LDAtMS0uNDUtMS0xdi0yLjIxSDEzLjI1djIuMjFjMCwuNTUtLjQ1LDEtMSwxaC0xLjM2Yy0uNTUsMC0xLS40NS0xLTF2LTIuMjFINS43MmMtLjU0LDAtMS4wNC0uMTYtMS40Ny0uNDF2MjIuNGMwLDEuMjYsMS4wMywyLjI5LDIuMjksMi4yOUgzMC43NWMxLjI2LDAsMi4yOS0xLjAzLDIuMjktMi4yOVYxOS40MWMtLjQ0LC4yNS0uOTMsLjQxLTEuNDcsLjQxWm0tMi45MywxMy45MWMtLjIyLC4wNC01LjU0LDEuMDEtOS45OSwxLjAxcy05LjQyLS45Ny05LjYzLTEuMDFjLS4zOC0uMDgtLjYzLS40NS0uNTYtLjgzLC4wOC0uMzgsLjQ1LS42MywuODMtLjU2LC4wNSwwLDUuMDQsLjk5LDkuMzYsLjk5czkuNjgtLjk4LDkuNzQtLjk5Yy4zOC0uMDcsLjc1LC4xOCwuODMsLjU3LC4wNywuMzgtLjE4LC43NS0uNTcsLjgzWiIvPjwvZz48L2c+PC9zdmc+')
            });

            //Looks for the local storage for the theme value, if not found looks for the OS settings
            setAccessibility();

            return "done";
        }
    };

    // Public section
    // Any change within the private object Code taken place outside this scope is done through the public methods exposed here.
    return {
        init: function (interfaceName) {
            this.forcedCodeMode = null;
            return Code.init(interfaceName);
        },
        /**
         * @public
         * @param {boolean} action The action, false for undo and true for redo.
         */
        undo: function (action) {
            const workspace = Code.workspace;
            if (!workspace) {
                return;
            }

            if (action === false && Main.getInterface() !== 'python') {
                const blocks = workspace.getAllBlocks().filter((block) => !block.isShadow());
                if (blocks.length === 1 && (blocks[0].type === 'on_start' || blocks[0].type === 'scratch_on_start')) {
                    return;
                }
            }

            const workspaceToText = () => Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

            workspace.undo(action);
            const afterUndo = workspaceToText();

            if (action === false && afterUndo === '<xml xmlns="https://developers.google.com/blockly/xml"></xml>') {
                workspace.undo(true);
                return;
            }
        },
        /**
         * Get the blocks and the code before a translation of the code into blocks (see recordCodeToBlocks).
         * @public
         * @return {Object} state
         */
        getCodeToBlocksState: function () {
            return { xml: Blockly.Xml.workspaceToDom(Code.workspace), code: CodeManager.getSharedInstance().getGeneratedCode() };
        },
        /**
         * Record a translation of the code typed into blocks (done with the Blockly events disabled) as one step of the
         * Blockly history: undo/redo then go through the changes of the blocks and of the code in their order, and
         * restore the blocks and the code together. The translations while the editor keeps the focus are one step.
         * @public
         * @param {Object} before - state returned by getCodeToBlocksState before the translation
         */
        recordCodeToBlocks: function (before) {
            const codeManager = CodeManager.getSharedInstance();
            // Only the code typed by the user (not the loading of a project), not with several files (MultiCodeManager)
            if (!Code.editor.container.isFocused() || typeof MultiCodeManager !== 'undefined' && codeManager instanceof MultiCodeManager) return;
            const after = Main.getCodeToBlocksState();
            if (before.code === after.code) return;
            const restore = (state) => {
                Blockly.Events.disable();
                try {
                    Code.workspace.clear();
                    Blockly.Xml.domToWorkspace(state.xml, Code.workspace);
                } finally {
                    Blockly.Events.enable();
                }
                codeManager.setGeneratedCode(state.code);
                codeManager.updateTextCode(state.code);
                codeManager.setXml();
                Code.editor.container.setValue(state.code, 1);
                if (typeof projectManager !== 'undefined' && projectManager) projectManager._refreshProjectStatus();
            };
            const undoStack = Code.workspace.getUndoStack();
            const step = Code.codeToBlocksStep;
            if (step && undoStack[undoStack.length - 1] === step) {
                step.after = after;
            } else {
                Code.codeToBlocksStep = { group: '', recordUndo: true, before, after, run(redo) { restore(redo ? this.after : this.before); } };
                undoStack.push(Code.codeToBlocksStep);
                Code.editor.container.once('blur', () => { Code.codeToBlocksStep = null; });
            }
            Code.workspace.getRedoStack().length = 0;
        },
        /**
         * @public
         * @param {boolean} action The action, false for undo and true for redo.
         */
        undoCodeMode: function (action) {
            if (action === true) {
                Code.editor.container.undo();
                CodeManager.getSharedInstance().setTextCode(Code.editor.container.session.getValue())
            } else {
                Code.editor.container.redo();
                CodeManager.getSharedInstance().setTextCode(Code.editor.container.session.getValue())
            }
        },
        /**
         * @public
         * @return {Blockly.Block[]} Blocks in workspace.
         */
        getAllBlocks: function () {
            return Code.workspace.getAllBlocks();
        },
        /**
         * @public
         * @returns {Blockly.Block[]}
         */
        getTopBlocks: function () {
            return Code.workspace.getTopBlocks();
        },
        /**
         * @public 
         * @param {string} mode The Code mode switched to.
         */
        switchCodingMode: function (mode) {
            Code.editor.switchCodingMode(mode);
        },
        /**
         * Get selected coding mode.
         * @public
         * @return {string}
         */
        getCodingMode: function () {
            return CodeManager.getSharedInstance()._getSelectedMode();
        },
        /**
         * Get interface name.
         * @public
         * @return {string}
         */
        getInterface: function () {
            return Code.getInterface();
        },
        /**
         * _isXmlBasedInterface getter
         * @public
         * @returns {Boolean}
         */
        getIsXmlBasedInterface: function () {
            return Code._isXmlBasedInterface;
        },
        /**
         * Get workspace backpack.
         * @public
         * @returns 
         */
        getBackpack: function () {
            return Code.backpack;
        },
        /**
         * @public
         * @param {string} option The option.
         * @param {*} value The option new value.
         */
        setOptionForEditor: function (option, value) {
            Code.editor.container.setOption(option, value);
        },
        /**
         * Resize Ace editor.
         * @public
         */
        resizeAceEditor: function () {
            if (Code.getInterface() !== "adacraft") {
                Code.editor.container.resize();
            }
        },
        /**
         * Synchronizes the code mode with the mixed mode.
         * @public
         * @return {void}
         */
        synchronizeCode: function () {
            CodeManager.getSharedInstance().codeWasManuallyModified = false;
            CodeManager.getSharedInstance().setTextCode();
            Code.editor.updateCode();
        },
        /**
         * Update ide code editor.
         * @public
         */
        updateCodeEditor: function () {
            Code.editor.updateCode();
        },
        /**
         * Puts code read from an imported file into the CodeManager code.
         * @public
         * @param {string} code
         * @returns {void}
         */
        importCode: function (code) {
            CodeManager.getSharedInstance().codeWasManuallyModified = true;
            CodeManager.getSharedInstance().setTextCode(code);
            Code.editor.updateCode();
        },
        /**
         * @public
         * @return {string} Text code as string.
         */
        getTextCode: function () {
            return CodeManager.getSharedInstance().getTextCode();
        },
        /**
         * Gets workspace.
         * @public
         * @returns {Blockly.Workspace}
         */
        getWorkSpace: function () { //get back to this not needed
            return Code.workspace;
        },
        /**
         * Resize workspace.
         * @public
         * @returns {void}
         */
        resizeWorkSpace: function () {
            Blockly.svgResize(Main.getWorkSpace());
        },
        /**
         * Get the language of the workspace.
         * @public
         * @returns {string} Language code
         */
        getCodeLanguage: function () {
            return Code.LANG;
        },
        /**
         * Returns true if the workspace was loaded in an iframe mode.
         * @public
         * @returns {boolean}
         */
        inIframe: function () {
            return Code.inIframe();
        },
        /**
         * Returns true if interface has a simulator.
         * @public
         * @returns {boolean}
         */
        hasSimulator: function () {
            return /(arduinoq|arduino|microbit|wb55|l476|esp32|TI-83|raspberrypi|niryo|nao|galaxia|GalaxiaCircuitPython|mBot|m5stack|buddy|cyberpi|pico|eliobot|thymio|winky|sphero|lotibot|bluebot|spike|photon|codey|steami|alphai|primastem)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has an auto-corrector.
         * @public
         * @returns {boolean}
         */
        hasAutoCorrector: function () {
            return /(microbit|esp32|wb55|l476|TI-83|galaxia|raspberrypi|m5stack|buddy|GalaxiaCircuitPython|pico|eliobot|thymio)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has an auto-corrector.
         * @public
         * @returns {boolean}
         */
        hasToolboxModes: function () {
            return ["arduino", "microbit", "esp32", "wb55", "l476", "TI-83", "galaxia", "raspberrypi", "buddy", "niryo", "nao", "GalaxiaCircuitPython", "mBot", "m5stack", "cyberpi", "eliobot", "thymio", "pico", "winky", "sphero", "lotibot", "bluebot", "spike", "photon", "codey", "steami", "alphai", "primastem"].includes(Code.getInterface());
        },
        /**
         * Returns true if interface has the drag and drop feature.
         * @public
         * @returns {boolean}
         */
        hasDragAndDrop: function () {
            return /(TI-83)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has board management.
         * @public
         * @returns {boolean}
         */
        hasBoardSelector: function () {
            return ['esp32', 'pico', 'arduino', 'raspberrypi'].includes(Code.getInterface());
        },
        /**
         * Returns true for the Python interface (code written freely, run from its text).
         * @public
         * @returns {boolean}
         */
        hasPyToBlocks: function () {
            return /(python)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has python 2 blocks (reverse translation of the Python code with Python2Blocks).
         * @public
         * @returns {boolean}
         * */
        hasPython2Blocks: function () {
            return /(python|microbit|esp32|galaxia|m5stack|pico|cyberpi|eliobot|wb55|l476|thymio|lotibot|sphero|bluebot|spike|photon|nao|codey|steami|primastem|buddy|niryo|raspberrypi|winky)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has cpp 2 blocks.
         * @public
         * @returns {boolean}
         * */
        hasCpp2Blocks: function () {
            return ['arduino', 'mBot'].includes(Code.getInterface());
        },
        /**
         * Returns true if untranslated blocks are present in the workspace.
         * @public
         * @returns {boolean}
         * */
        isEditorLocked: function () {
            return Code.isEditorLocked;
        },
        /**
         * Lock or unlock the editor depending of the content or the workspace (called in Cpp2Blocks and Python2Blocks).
         * @public
         * @returns {void}
         * */
        lockEditor: function (value) {
            return Code.isEditorLocked = value;
        },
        /**
         * Returns code editor.
         * @public
         * @returns {object}
         */
        getCodeEditor: function () {
            return Code.editor;
        },
        /**
         * Returns code mode.
         * @public
         * @returns {String}
         */
        getCodeMode: function () {
            return Code.getCodeMode();
        },
        /**
         * Set workspace theme.
         * @public
         */
        setBlocklyTheme: function () {
            Code.toolbox.setBlocklyTheme();
        },
        /**
         * Get workspace toolbox.
         * @public
         * @returns {ToolboxManager}
         */
        getToolboxManager: function () {
            return Code.toolbox;
        },
        /**
         * Set workspace toolbox.
         * @public
         * @param {String} toolboxMode
         */
        setToolboxManager: function (toolboxMode) {
            // update toolbox
            Code.toolbox = new ToolboxManager(Code.workspace, { mode: toolboxMode });
            const blockStyles = get_defaultBlockStyles();
            const categoryStyles = get_categoryStyles(blockStyles);
            for (const t in Blockly.Themes) {
                Blockly.Themes[t].blockStyles = blockStyles;
                Blockly.Themes[t].categoryStyles = categoryStyles;
            }
            Code.toolbox.setToolbox();
            // Refresh workspace
            if (this.getInterface() == "TI-83" && toolboxMode == TOOLBOX_STYLE_TI_CODE) {
                return;
            }
            const xml = CodeManager.getSharedInstance()._workspaceToXml();
            Code.workspace.clear();
            CodeManager.getSharedInstance()._xmlToWorkspace(xml);
        },
        /**
         * Switch restriction of workspace toolbox.
         * @public
         * @param {boolean} state
         * @param {Array<string>} data [OPTIONAL] Restrict toolbox with only blocks from workspace if null else use data
         */
        restrictToolbox(data = null) {
            const toolboxRestrictionSwitchId = (typeof IS_CAPYTALE_CONTEXT !== 'undefined') ? '#toolbox-restriction-capytale' : '#toolboxRestriction';
            if (data) {
                if (data.blocks && Array.isArray(data.blocks)) {
                    Code.toolbox.restrictTo(data.blocks);
                }
                if (data.variables && Array.isArray(data.variables)) {
                    Code.toolbox.setWorkspaceVariables(data.variables);
                }
                $(`input[name='toolboxRestrictionName']${toolboxRestrictionSwitchId}`).attr("checked", "checked");
            } else {
                if ($(toolboxRestrictionSwitchId).is(':checked')) {
                    const workspaceBlocks = this.getWorkSpace().getAllBlocks().filter(block => !block.isShadow());
                    const restrictedBlockTypes = Code.toolbox.updateVariantBlocks(workspaceBlocks);
                    Code.toolbox.restrictTo(restrictedBlockTypes);
                } else {
                    Code.toolbox.resetRestriction();
                    $(`input[name='toolboxRestrictionName']${toolboxRestrictionSwitchId}`).removeAttr("checked");
                }
            }
            if (typeof projectManager !== 'undefined' && projectManager) {
                projectManager._refreshProjectStatus();
            }
        },
        /**
         * Zoom in in the text code editor.
         */
        toggleZoomInEditor() {
            const increment = 4;
            const editor = document.getElementById('content_code');
            const initialFont = !editor.style.getPropertyValue("--ace-font-size") ? "16px" : editor.style.getPropertyValue("--ace-font-size");
            editor.style.setProperty("--ace-font-size", Number(initialFont.split("px")[0]) + increment + "px");
        },
        /**
         * Zoom out in the text code editor.
         */
        toggleZoomOutEditor() {
            const decrement = 4;
            const editor = document.getElementById('content_code');
            const initialFont = !editor.style.getPropertyValue("--ace-font-size") ? "16px" : editor.style.getPropertyValue("--ace-font-size");
            if (initialFont.split('px')[0] - decrement < 2) return;
            editor.style.setProperty("--ace-font-size", Number(initialFont.split("px")[0]) - decrement + "px");
        },
        /**
         * Copy text editor content to clipboard.
         */
        copyEditorCode() {
            const editor = ace.edit(document.getElementById("content_code"));
            const codeContent = editor.getValue();
            const copy = document.createElement('textarea');
            copy.value = codeContent;
            document.body.appendChild(copy);
            copy.select();
            document.execCommand('copy');
            document.body.removeChild(copy);

            // success copy notification
            const successNotif = new VittaNotif()
            successNotif.displayNotification('#copy-editor-action-notif', 'Code copié avec succès', 'bg-success');
        },
        /**
         * Convert text code to blocks code.
         */
        convertCodeToBlocks() {
            return Code.editor.convertCodeToBlocks();
        },
        resetInvalidBlocksWarning() {
            Code.invalidBlocksMsgSeen = false;
        },
        /**
         * check if the code editor is locked
         * @returns {boolean}
         * @public
         * */
        // isEditorLocked() {
        //     return Code.isEditorLocked;
        // }
    }

}());