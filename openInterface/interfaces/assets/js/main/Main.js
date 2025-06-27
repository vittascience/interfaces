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
    Code.hidden_workspace = null;
    Code.initFocus = false;


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
        Code.pyBlock = new PyBlock();
    }

    /**
     * For Python Interface
     * recursive function to check height of next blocks that are connected to the parent block
     * @param {block} block 
     **/
    function getTotalBlockHeight(block) {
        let totalHeight = block.height;
        let nextBlock = block.getNextBlock();
        if (nextBlock) {
            totalHeight += getTotalBlockHeight(nextBlock) - 8 // -8 (px?) to avoid extra space added to total height (empirical value)
        }
        return totalHeight;
    }

    /**
     * For Python Interface
     * move block to a specific position
     * @param {block} block blockly block
     * @param {number} x position in workspace for moveBy function
     * @param {number} y position in workspace for moveBy function
     * @returns {void}
     **/
    function moveBlock(block, x, y) {
        let currentPosition = block.getRelativeToSurfaceXY();
        block.moveBy(x - currentPosition.x, y - currentPosition.y); // reset position
    }

    /**
     * For Python Interface
     * reorganize blocks in the workspace
     * @param {workspace} workspaceToOrganize
     *  
     **/
    function reorganizeBlocks(workspaceToOrganize) {
        let workspace = workspaceToOrganize;
        const allBlocks = workspace.getAllBlocks();

        // parent blocks are the blocks that have no previous block
        const topBlocks = allBlocks.filter(block => !block.getParent());
        let yPosition = 0;
        let yPositionFunctions = 0;
        const fixedX = 30;
        const fixedXFonctions = 300; // maybe need to adjust this value in the future to avoid overlapping, or dynamically calculate it with .ide-block container size
        for (let i = 0; i < topBlocks.length; i++) {
            let block = topBlocks[i];
            if (block.type === 'procedures_defreturn' || block.type === 'procedures_defnoreturn') {
                let blockHeight = block.height;
                moveBlock(block, fixedXFonctions, yPositionFunctions);
                yPositionFunctions += blockHeight + 10;
            } else {
                // next blocks are connected to the parent block, they are not child blocks
                const checkNextBlock = block.getNextBlock();
                let blockHeight
                if (checkNextBlock !== null) {
                    blockHeight = getTotalBlockHeight(block);
                } else {
                    blockHeight = block.height;
                }
                moveBlock(block, fixedX, yPosition);
                yPosition += blockHeight;
            }
        }
    }

    function updatePyBlockCode() {
        /**
         * PyBlock : transform python into block
         * 
        */
        const code = Main.getCodeEditor().container.getValue();
        let oldCode = PyBlock.oldCode || "";
        if (code == oldCode) return;

        PyBlock.oldCode = code;
        const xml = Code.pyBlock.convertSource("__main__.py", code);
        const xmlDom = Blockly.Xml.textToDom(xml.xml);
        if (Main.getWorkSpace) {
            const workspace = Main.getWorkSpace();
            Blockly.Events.disable();
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace);
            reorganizeBlocks(workspace);
            Blockly.Events.enable();
        }
        CodeManager.getSharedInstance().setXml();
        if ($("#toolboxRestriction").is(':checked')) {
            const workspaceBlocks = Blockly.getMainWorkspace().getAllBlocks().filter(block => !block.isShadow_);
            const restrictedBlockTypes = Code.toolbox.updateVariantBlocks(workspaceBlocks);
            Code.toolbox.restrictTo(restrictedBlockTypes);
        }
    }

    Code.editor = {};
    Code.initEditor = function () {
        const interfaceName = Code.getInterface();
        if (interfaceName == "arduino" || interfaceName == "letsstartcoding" || interfaceName == "mBot") {
            var langMode = ace.require("ace/mode/c_cpp").Mode;
        } else if (interfaceName == "web") {
            var langMode = ace.require("ace/mode/html").Mode;
        } else {
            var langMode = ace.require("ace/mode/python").Mode;
        }
        var langTools = ace.require("ace/ext/language_tools");

        // Ace editor handler
        Code.editor.container = ace.edit(document.getElementById("content_code"));
        Code.editor.container.session.setMode(new langMode());
        Code.editor.container.setOptions({
            // to make popup appear automatically, without explicit _ctrl+space_
            enableLiveAutocompletion: true,
            fontSize: '12pt',
            cursorStyle: 'wide',
            wrapBehavioursEnabled: true,
            tabSize: 2,
            useSoftTabs: true,
            hScrollBarAlwaysVisible: false,
            vScrollBarAlwaysVisible: false,
            wrap: -1,
            indentedSoftWrap: true,
            showPrintMargin: false,
            highlightActiveLine: false,
            highlightGutterLine: true
        });

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
            if (INTERFACE_NAME === 'TI-83' && getParamValue('mode') === 'code') {
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
            <button class="btn-zoom-editor" onclick="Main.toggleZoomInEditor()" tabindex=0 data-toggle="tooltip" data-placement="top" title="Zoom-in" data-i18n="[title]code.editor.buttons.zoomIn">
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
            <button class="btn-zoom-editor" onclick="Main.toggleZoomOutEditor()" tabindex=0 data-toggle="tooltip" data-placement="top" title="Zoom-out" data-i18n="[title]code.editor.buttons.zoomOut">
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
            <button class="btn-zoom-editor" onclick="Main.copyEditorCode()" tabindex=0 data-bs-toggle="tooltip" data-bs-placement="top" title="Copy" data-i18n="[title]code.editor.buttons.copy">
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

        Code.editor.container.on("change", function () {
            if ((Main.hasCpp2Blocks() || Main.hasPython2Blocks()) && Code.isEditorLocked && Code.userConsentCodeToBlocks === null && Code.editor.container.isFocused()) {
                Code.getUserConsentForTrad();
            }
            if (CodeManager.getSharedInstance().isCodeSelected() == true || CodeManager.getSharedInstance().isCodeOnlySelected() || !Main.getIsXmlBasedInterface()) {
                CodeManager.getSharedInstance().codeWasManuallyModified = true;
                CodeManager.getSharedInstance().updateTextCode(Code.editor.container.getSession().getValue());
                if (typeof projectManager !== 'undefined' && projectManager) {
                    projectManager._refreshProjectStatus();
                }
            }
            if (INTERFACE_NAME === 'python' || Main.hasCpp2Blocks() || Main.hasPython2Blocks()) {
                CodeManager.getSharedInstance().updateTextCode(Code.editor.container.getSession().getValue());
                if (Main.getCodingMode() !== 'block' && Code.editor.container.isFocused()) {
                    CodeManager.getSharedInstance().codeWasManuallyModified = true;
                    if (INTERFACE_NAME === 'python') {
                        updatePyBlockCode();
                    } else if (Main.hasCpp2Blocks()) {
                        if (Cpp2Blocks !== "undefined" && Cpp2Blocks.initialized === true) {
                            Cpp2Blocks.injectBlocks();
                        };
                    } else if (Main.hasPython2Blocks()) {
                        if (Python2Blocks !== "undefined" && Python2Blocks.initialized === true) {
                            Python2Blocks.prepareInjection();
                        }
                    }
                    if (typeof projectManager !== 'undefined' && projectManager) {
                        projectManager._refreshProjectStatus();
                    }
                }

            }
            if (Main.getCodingMode !== 'code' && Main.hasDragAndDrop()) {
                dragAndDrop.updateDictionnaries();
            }
            if (typeof Simulator !== 'undefined') {
                Simulator.lastUpdate = Date.now();
                if (Simulator.isOpen && Simulator.isStopped) {
                    Simulator.replay();
                }
            }
            if (INTERFACE_NAME === "winky" && typeof projectManager._rpc !== 'undefined') {
                if (projectManager._rpc !== null && projectManager.localStorageManager.getLocalProjectContent()) {
                    projectManager._rpc.call('get_local_storage', [projectManager.localStorageManager.getLocalProjectContent()]);
                }
            }
        });

        if (["wb55", "l476", "arduino", "letsstartcoding", "mBot", "cyberpi"].includes(Code.getInterface())) {
            try {
                const tipDict = generateDictionary(assignTips(Code.getInterface()));
                const customCompleter = {
                    getCompletions: (editor, session, pos, prefix, callback) => {
                        callback(null, tipDict);
                    },
                }
                langTools.addCompleter(customCompleter);
            } catch (error) {
                console.error(error);
            }
        }

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
            Code.editor.container.session.setValue(CodeManager.getSharedInstance().getCode());
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
            if (Code.getInterface() === 'python' || Main.hasCpp2Blocks() || Main.hasPython2Blocks()) return;
            if (mode != "code" && mode != "codeOnly") {
                const currentInterfaceLS = CodeManager.getSharedInstance().localStorageManager.getLocalProjectContent();
                if (typeof projectManager !== 'undefined' && projectManager && projectManager.getCurrentProject().code != instance.getDefaultXmlStart() && currentInterfaceLS != null) {
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
    Code.isParentSetup = function (block) {
        if (typeof BLOCKS_OUTSIDE_SCOPE !== 'undefined' && BLOCKS_OUTSIDE_SCOPE.includes(block.type) == true) {
            return true;
        }
        if (block.parentBlock_ === null) {
            return false;
        }
        return Code.isParentSetup(block.parentBlock_);
    };

    Code.vittaNotif = new VittaNotif(5);

    Code.displayBlockNotification = function (block) {
        Blockly.Events.disable(); // Désactiver les événements Blockly temporairement
        block.dispose(); // Supprimer le bloc ajouté
        Blockly.Events.enable(); // Réactiver les événements Blockly
        Code.vittaNotif.displayNotification(null, `${jsonPath('code.blockly.warning.blocks')} ${block.type}`, "bg-warning");
    };
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
            if (event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_DELETE || event.type == Blockly.Events.BLOCK_MOVE) {
                if (Code.getInterface() !== 'python' && Code.getInterface() !== 'web') {
                    const currentBlocks = Code.workspace.getAllBlocks();
                    for (let i = 1; i < currentBlocks.length; i++) {
                        if (Code.isParentSetup(currentBlocks[i]) == false) {
                            currentBlocks[i].setEnabled(false);
                        } else {
                            currentBlocks[i].setEnabled(true);
                        }
                        // warn the user if the block is not allowed for translation
                        if (typeof EXCLUDED_BLOCKS_FOR_TRADUCTION !== "undefined" && EXCLUDED_BLOCKS_FOR_TRADUCTION.includes(currentBlocks[i].type)) {
                            if (!currentBlocks[i].disabled) {
                                Code.isEditorLocked = true;
                            } else {
                                Code.isEditorLocked = false;
                            }
                        }
                    }
                    Code.lockedEditor();
                    if (Code.getInterface() === 'pico' || Code.getInterface() === 'winky') {
                        if (event.type === Blockly.Events.BLOCK_CREATE) {
                            const block = Blockly.getMainWorkspace().getBlockById(event.blockId);
                            if (typeof block !== 'undefined') {
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
                Blockly.Constants.DISABLE_BLOCKS_ON_EVENT('forever', ['io_event_start', 'io_event_is_press', 'io_event_receive']);
            }
        }
    };

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
        if (Code.initFocus || (!Main.hasPython2Blocks() && !Main.hasCpp2Blocks())) {
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
            return Code.editor.container.getSession().setValue(CodeManager.getSharedInstance().getTextCode());
        }
        if (!Code.editor.container.isFocused()) {
            Code.editor.updateCode();
        }
        if (typeof projectManager !== 'undefined' && projectManager) {
            projectManager._refreshProjectStatus()
        }
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
        const popupWarning = document.getElementById('mixed-popup-warning');
        if (popupWarning) {
            popupWarning.style.visibility = Code.isEditorLocked ? 'visible' : 'hidden';
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
            Blockly.alert(msg); // Assuming synchronous. No callback.
        }
        return valid;
    };

    Code.toolbox = null;

    /**
     * Initialize Blockly. Called on page load.
     */
    Code.init = function (interfaceName) {
        return new Promise(function (resolve, reject) {
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
            Code.workspace = Blockly.inject('content_blocks', {
                grid: {
                    spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                },
                media: _PATH + '/interfaces/assets/js/external/blockly/media/',
                rtl: isRtl,
                renderer: renderer,
                toolbox: toolbox_,
                trashcan: true,
                zoom: {
                    controls: true,
                    screenshot: true,
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
                disable: true
            });

            // init workspace
            document.getElementById('content_blocks').style.visibility = 'visible';
            Code.workspace.setVisible(true);
            Main.resizeWorkSpace();
            //init Code Manager
            switch (interfaceName) {
                case "arduino":
                case "letsstartcoding":
                case "mBot":
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
                case "letsstartcoding":
                case "mBot":
                    $('#content_code').addClass('ace-ar');
                    break;
            }

            if (interfaceName !== "bluebot") {
                CodeManager.getSharedInstance("mixed", Code.workspace, codeLang);
            } else {
                CodeManager.getSharedInstance("blocks", Code.workspace, codeLang);
            }

            if (Main.getIsXmlBasedInterface()) {
                CodeManager.getSharedInstance().loadBlocks();
            }

            //init language
            Code.setLanguageAndMode();
            //init editor
            Code.initEditor();
            //Listener that will render code for every change
            Code.workspace.addChangeListener(Code.renderContent);

            // init toolbox
            const toolboxMode = Blockly.Constants.getToolboxStyle();
            if (ToolboxManager.toolboxDefined(toolboxMode)) {
                Code.toolbox = new ToolboxManager(Code.workspace, { mode: toolboxMode });
            } else {
                Code.toolbox = new ToolboxManager(Code.workspace);
            }

            Code.toolbox.setToolbox();
            switch (interfaceName) {
                case "letsstartcoding":
                    Main.getWorkSpace().registerButtonCallback('createVariableButtonHandler',
                        function (button) {
                            Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'int');
                            const lastVarName = Main.getWorkSpace().getAllVariableNames().slice(-1);
                            Code.toolbox.pushVariable(lastVarName);
                        }
                    );
                    break;
                default:
                    break;
            }
            Code.isToolboxLoaded = true;

            Blockly.Tooltip.HOVER_MS = 200;

            if (Main.hasDragAndDrop()) {
                Code.hidden_workspace = Blockly.inject('hidden_workspace', { media: _PATH + '/interfaces/assets/js/external/blockly/media/' });

                Code.workspace.addChangeListener(dragAndDrop.initDictionnaries.bind(dragAndDrop));
                //observers
                dragAndDrop.blocklyFlyout = document.getElementsByClassName('blocklyFlyout')[1];
                dragAndDrop.blocklyBlockDragSurface = document.getElementsByClassName('blocklyBlockDragSurface')[0];

                // tip to know the position of a block that is being dragged by the user
                dragAndDrop.observerBlocklyBlockDragSurface = new MutationObserver(dragAndDrop.trackBlock);
                dragAndDrop.observerBlocklyFlyout = new MutationObserver(dragAndDrop.fixedFlyout);
            }
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

            resolve("done");
        });
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
            if (Main.hasPython2Blocks() || Main.hasCpp2Blocks()) {
                const codeToBlocks = Main.hasPython2Blocks() ? Python2Blocks : Cpp2Blocks;
                if (typeof codeToBlocks !== "undefined" && codeToBlocks.initialized === true) {
                    const maxIndex = codeToBlocks.previousXml.length;

                    if (action === false) { // Undo
                        const newIndex = codeToBlocks.indexPreviousXml === null
                            ? maxIndex - 1
                            : Math.max(codeToBlocks.indexPreviousXml - 1, 0);

                        if (codeToBlocks.previousXml[newIndex]) {
                            Code.workspace.clear();
                            Blockly.Xml.domToWorkspace(codeToBlocks.previousXml[newIndex], Code.workspace);
                            codeToBlocks.indexPreviousXml = newIndex;
                        }
                    } else { // Redo
                        const newIndex = codeToBlocks.indexPreviousXml === null
                            ? 0
                            : Math.min(codeToBlocks.indexPreviousXml + 1, maxIndex);

                        if (codeToBlocks.previousXml[newIndex]) {
                            Code.workspace.clear();
                            Blockly.Xml.domToWorkspace(codeToBlocks.previousXml[newIndex], Code.workspace);
                            codeToBlocks.indexPreviousXml = newIndex;
                        }
                    }
                }
            } else {
                Code.workspace.undo(action);
            }
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
            return /(arduino|microbit|wb55|l476|esp32|TI-83|raspberrypi|niryo|nao|galaxia|GalaxiaCircuitPython|mBot|m5stack|buddy|cyberpi|pico|eliobot|thymio|winky|sphero|lotibot|bluebot|spike|photon)/.test(Code.getInterface());
        },
        /**
        * Returns true if interface has a robot simulator.
        * @public
        * @returns {boolean}
        */
        hasRobotSimulator: function () {
            return ["microbit", "wb55", "l476", "TI-83", "mBot", "buddy", "cyberpi", "pico", "eliobot", "thymio", "sphero", "lotibot", "bluebot", "photon"].includes(INTERFACE_NAME);
        },

        has3DRobotSimulator: function () {
            return ["esp32", "l476"].includes(INTERFACE_NAME);
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
            return /(arduino|microbit|esp32|wb55|l476|TI-83|galaxia|raspberrypi|buddy|niryo|nao|GalaxiaCircuitPython|mBot|m5stack|cyberpi|eliobot|thymio|pico|winky|sphero|lotibot|bluebot|spike|photon)/.test(Code.getInterface());
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
            return /(esp32|pico|arduino|raspberrypi)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has trad <> to bloc management (this one is only for python Interface => ro rework).
         * @public
         * @returns {boolean}
         */
        hasPyToBlocks: function () {
            return /(python)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has python 2 blocks. For all other interfaces than python that use python 2 blocks.
         * @public
         * @returns {boolean}
         * */
        hasPython2Blocks: function () {
            return /(microbit|esp32|galaxia|m5stack|pico|cyberpi|eliobot|wb55|l476|thymio|lotibot|sphero|bluebot|spike|photon|nao)/.test(Code.getInterface());
        },
        /**
         * Returns true if interface has cpp 2 blocks.
         * @public
         * @returns {boolean}
         * */
        hasCpp2Blocks: function () {
            return /(arduino|mBot)/.test(Code.getInterface());
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
         * Returns hidden workspace.
         * @public
         * @returns {Blockly.Worspace}
         */
        getHiddenWorkSpace: function () {
            return Code.hidden_workspace;
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
            if (!(this.getInterface() == "TI-83" && toolboxMode == TOOLBOX_STYLE_TI_CODE)) {
                Main.getWorkSpace().getAllBlocks().forEach((block) => {
                    const blockDef = Blockly.Constants.Utils.BlockStyling.blocks[block.type];
                    if (blockDef && blockDef.colour) {
                        Blockly.Extensions.ALL_['block_init_color'].call(block);
                    }
                    else if (this.getInterface() === "TI-83") {
                        Blockly.Extensions.ALL_['block_init_color'].call(block);
                    }
                    if (blockDef && blockDef.category) {
                        Blockly.Extensions.ALL_['block_init_helpurl'].call(block);
                    }
                    else if (this.getInterface() === "TI-83") {
                        Blockly.Extensions.ALL_['block_init_helpurl'].call(block);
                    }
                });
            }
            Code.toolbox = new ToolboxManager(Code.workspace, { mode: toolboxMode });
            Blockly.Themes.ClassicBase.blockStyles = get_defaultBlockStyles();
            Blockly.Themes.ClassicBase.categoryStyles = get_categoryStyles(get_defaultBlockStyles());
            Code.toolbox.setToolbox();
        },
        /**
         * Switch restriction of workspace toolbox.
         * @public
         * @param {boolean} state
         * @param {Array<string>} data [OPTIONAL] Restrict toolbox with only blocks from workspace if null else use data
         */
        restrictToolbox(data = null) {
            if (data) {
                if (data.blocks && Array.isArray(data.blocks)) {
                    Code.toolbox.restrictTo(data.blocks);
                }
                if (data.variables && Array.isArray(data.variables)) {
                    Code.toolbox.setWorkspaceVariables(data.variables);
                }
                $("input[name='toolboxRestrictionName']#toolboxRestriction").attr("checked", "checked");
            } else {
                if ($("#toolboxRestriction").is(':checked')) {
                    const workspaceBlocks = this.getWorkSpace().getAllBlocks().filter(block => !block.isShadow_);
                    const restrictedBlockTypes = Code.toolbox.updateVariantBlocks(workspaceBlocks);
                    Code.toolbox.restrictTo(restrictedBlockTypes);
                } else {
                    Code.toolbox.resetRestriction();
                    $("input[name='toolboxRestrictionName']#toolboxRestriction").removeAttr("checked");
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
         * check if the code editor is locked
         * @returns {boolean}
         * @public
         * */
        // isEditorLocked() {
        //     return Code.isEditorLocked;
        // }
    }

}());