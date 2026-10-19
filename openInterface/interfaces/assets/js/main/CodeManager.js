/**
 * Workspace CodeManager: CodeManager
 * Copyright 2019 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is vittascience's intellectual property.
 * 
 * This class purpose to provide an abstracted set of actions that handle the code generated 
 * by the application and its different states.
 */

/** 
 * @fileoverview WorkSpace CodeManager 
 * @author: Dainer (Oussama Ben Ghorbel)
 */

/**
 * @class CodeManager
 */
class CodeManager {

    static STATUS = {
        'DOM': {
            xmlError: 'ProjectLoadingDOM_xmlError',
            xmlSuccess: 'ProjectLoadingDOM_xmlSuccess',
        }
    }

    /**
     * Creates an instance of CodeManager.
     * @private
     * @param {string} codeMode
     * @param {Blockly.Workspace} workspace
     * @param {Blockly.Generator} generator
     * @param {string} xml
     */

    constructor(codeMode, workspace, generator, xml) {
        this.REGEXP_INTERFACES = /.*(arduinoq|arduino|microbit|python|adacraft|wb55|l476|esp32|TI-83|galaxia|raspberrypi|niryo|nao|GalaxiaCircuitPython|mBot|m5stack|buddy|cyberpi|eliobot|thymio|letsstartcoding|pico|winky|web|sphero|lotibot|bluebot|spike|photon|codey|steami|alphai|primastem).*/g;
        if (typeof ltiVariables13 != 'undefined') {
            this._interface = ltiVariables13.interface;
        } else if (typeof ltiVariables != 'undefined') {
            this._interface = ltiVariables.interface;
        } else if (window.location.pathname.startsWith('/student-experiment')) {
            this._interface = 'python';
        } else {
            this._interface = window.location.pathname.replace(this.REGEXP_INTERFACES, "$1");
        }
        this.localStorageManager = new LocalStorageManager();
        switch (this._interface) {
            case 'arduino':
            case 'microbit':
            case 'python':
            case 'adacraft':
            case 'esp32':
            case 'wb55':
            case 'l476':
            case 'TI-83':
            case 'galaxia':
            case 'raspberrypi':
            case 'niryo':
            case 'nao':
            case 'GalaxiaCircuitPython':
            case 'mBot':
            case 'm5stack':
            case 'buddy':
            case 'cyberpi':
            case 'eliobot':
            case 'thymio':
            case 'letsstartcoding':
            case 'pico':
            case 'web':
            case 'winky':
            case 'sphero':
            case 'lotibot':
            case 'bluebot':
            case 'spike':
            case 'photon':
            case 'codey':
            case 'steami':
            case 'alphai':
            case 'arduinoq':
            case 'primastem':
                this._lStorage = this._interface + "CurrentProject";
                this._lSaveStorage = this._interface + "SavedProjects"; //[! NOT USED: Visitor need account to save his projects]
                break;
            default:
                console.error("Unknow interface named '" + this._interface + "'")
        }
        switch (this._interface) {
            case 'python':
            case 'adacraft':
                this._currentExercise = {};
                break;
            case 'web':
                this._lStorage = 'webCurrentProject';
                this._lSaveStorage = 'webSavedProjects';
                this._interface = 'web';
                break;
        }
        CodeManager.instance = this;
        this._workspace = workspace;
        this._generator = generator;
        this._textCode = this.getDefaultCodeStart();
        this._generatedCode = this.getDefaultCodeStart();
        this.codeWasManuallyModified = false; //always check where this got modified
        this._xml = xml;
        let localstorage = null;
        this.convertOldWebProjectCodeLStorage();
        if (this.localStorageManager.getLocalProjectContent()) {
            localstorage = this.localStorageManager.getLocalProjectContent();
        }
        if (localstorage != null && typeof localstorage.code === 'string') {
            $('#project-name').html(CodeManager.getProjectDisplayName(localstorage.name));
            $('#project-name').attr('data-bs-title', `<span class="tooltip-title">${localstorage.name}</span><span class="tooltip-author">${i18next.t('code.tooltip.anonymousAuthor')}</span><span class="tooltip-description">${CodeManager.getProjectDisplayDescription(localstorage.description)}</span>`);
            this._textCode = localstorage.codeText;
            this._xml = localstorage.code;
            this.codeWasManuallyModified = localstorage.codeManuallyModified;
        }
        /**
         * A codeMode
         * @typedef {Object} CodeMode
         * @property {string} MODE_CODE - Code mode
         * @property {string} MODE_BLOCKS - Blocks mode
         * @property {string} MODE_MIXED - Mixed mode
         * @property {string} MODE_CODE_ONLY - Code Only mode
         * @property {string} MODE_CONSOLE_ONLY - Console Only mode
         * @property {string} MODE_SIMU_ONLY - Simulator Only mode
         */
        this._mode = {
            MODE_CODE: {
                isSelected: codeMode == MODE_CODE,
                label: "code"
            },
            MODE_BLOCKS: {
                isSelected: codeMode == MODE_BLOCKS,
                label: "blocks"
            },
            MODE_MIXED: {
                isSelected: codeMode == MODE_MIXED,
                label: "mixed"
            },
            MODE_CODE_ONLY: {
                isSelected: codeMode == MODE_CODE_ONLY,
                label: "codeOnly"
            },
            MODE_CONSOLE_ONLY: {
                isSelected: codeMode == MODE_CONSOLE_ONLY,
                label: "consoleOnly"
            },
            MODE_SIMU_ONLY: {
                isSelected: codeMode == MODE_SIMU_ONLY,
                label: "simuOnly"
            }
        };
        //this can come up from the database or localstorage
        return this;
    }

    /**
     * Gets the shared instance of CodeManager.
     * @public
     * @static
     * @param {string} [codeMode=null] codeMode
     * @param {Blockly.Workspace} [workspace=null] workspace
     * @param {Blockly.Generator} [generator=null] generator
     * @param {string} [xml=null] xml
     */
    /**
     * Gets the project description from the #project-name tooltip.
     * Takes the innermost .tooltip-description so descriptions polluted by nested tooltip html get cleaned.
     * @public
     * @returns {string} description
     */
    /**
     * Name of the project displayed in the page: the translated default name ("Nouveau projet") for a project without
     * name or with the former default name "no name".
     * @param {string} name
     * @returns {string}
     */
    static getProjectDisplayName(name) {
        const decodedName = name ? String(name).replace(/%20/g, ' ').trim() : '';
        if (!decodedName || decodedName.toLowerCase() === 'no name' || decodedName.toLowerCase() === 'no-name') {
            return typeof i18next !== 'undefined' && i18next.isInitialized ? i18next.t('code.newProject') : 'Nouveau projet';
        }
        return name;
    };
    /**
     * Description of the project displayed in the page: empty for the former default description "No-description".
     * @param {string} description
     * @returns {string}
     */
    static getProjectDisplayDescription(description) {
        return !description || description === 'undefined' || /^no[-\s]?description$/i.test(String(description).trim()) ? '' : description;
    };
    static getProjectDescription() {
        return $('<div>').html($('#project-name').attr('data-bs-title') || '').find('.tooltip-description').last().text();
    };
    static getSharedInstance(codeMode = null, workspace = null, generator = null, xml = null) {
        if (!!CodeManager.instance) {
            return CodeManager.instance;
        } else
            return new CodeManager(codeMode, workspace, generator, xml);
    };

    /**
     * Gets currently selected coding mode.
     * @private
     * @returns {string}
     */
    _getSelectedMode() {
        if (this._mode[Object.keys(this._mode).find(key => this._mode[key].isSelected === true)] === undefined)
            return MODE_MIXED;
        else
            return this._mode[Object.keys(this._mode).find(key => this._mode[key].isSelected === true)].label;
    };
    /**
     * Takes xml and represent it in the workspace.
     * @private
     * @param {string} xml
     * @returns {void}
     */
    _xmlToWorkspace(xml) {
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), this._workspace);
    };
    /**
     * Converts workspace dom to code in xml form.
     * @private
     * @returns {string}
     */
    _workspaceToXml() {
        if (this._interface === 'adacraft') {
            return adacraft.getCurrentProjectJson();
        }
        return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this._workspace));
    };
    /**
     * Clears workspace and load blocks, if no xml passed load defined _xml blocks.
     * @public
     * @param {string} [xml=this._xml] Text representation of blocks.
     * @returns {void}
     */
    loadBlocks(xml = this._xml) {
        let status = CodeManager.STATUS.DOM.xmlSuccess;
        if (this._workspace !== null) {
            this._workspace.clear();
            if (typeof BlockExtensions !== 'undefined') BlockExtensions.syncFromProject();
            if (xml !== null) {
                if (typeof REPLACE_CODE_REQUESTS !== 'undefined') {
                    for (const request of Object.values(REPLACE_CODE_REQUESTS)) {
                        xml = xml.replace(request[0], request[1]);
                    }
                }
                if (typeof ProjectsCleaner !== 'undefined') {
                    for (const request of Object.values(ProjectsCleaner.DB)) {
                        if (request.targets.includes(this._interface)) {
                            xml = request.handler(xml);
                        }
                    }
                }
                if (typeof REMOVE_INPUT_VALUE_CONNECTION !== 'undefined') {
                    for (const input in REMOVE_INPUT_VALUE_CONNECTION) {
                        xml = this._disconnectInputFromBlock(xml, input, REMOVE_INPUT_VALUE_CONNECTION[input])
                    }
                }
                try {
                    this._xmlToWorkspace(xml);
                } catch (e) {
                    console.error(e)
                    this._xmlToWorkspace(this.getDefaultXmlStart());
                    status = CodeManager.STATUS.DOM.xmlError;
                };
            } else {
                this._xmlToWorkspace(this.getDefaultXmlStart());
            }
            if (this._interface !== 'adacraft') {
                this.setGeneratedCode();
            }
        } else {
            if (this._interface !== 'adacraft') {
                console.error('Main is not defined in initialization parts.')
                status = CodeManager.STATUS.DOM.xmlError;
            }
        }
        return status;
    };
    /**
     * Sets a coding mode.
     * @public
     * @param {string} codeMode
     */
    setCodeMode(codeMode) {
        this._mode = {
            MODE_CODE: {
                isSelected: (codeMode == MODE_CODE || codeMode == "python"),
                label: "code"
            },
            MODE_BLOCKS: {
                isSelected: codeMode == MODE_BLOCKS,
                label: "blocks"
            },
            MODE_MIXED: {
                isSelected: codeMode == MODE_MIXED,
                label: "mixed"
            },
            MODE_CODE_ONLY: {
                isSelected: codeMode == MODE_CODE_ONLY,
                label: "codeOnly"
            },
            MODE_CONSOLE_ONLY: {
                isSelected: codeMode == MODE_CONSOLE_ONLY,
                label: "consoleOnly"
            },
            MODE_SIMU_ONLY: {
                isSelected: codeMode == MODE_SIMU_ONLY,
                label: "simuOnly"
            }
        };
    };
    /**
     * Gets current code mode state.
     * @public
     * @returns {CodeMode}
     * @memberof CodeManager
     */
    getCodeModes() {
        return this._mode;
    };
    /**
     * Gets code based on the current coding mode.
     * @public
     * @returns {string} code
     */
    getCode() {
        return (this._getSelectedMode() == MODE_CODE || this._getSelectedMode() == MODE_CODE_ONLY) ? this.getTextCode() : this.getGeneratedCode();
    };
    /**
     * Gets default xml code.
     * @public
     */
    getDefaultXmlStart() {
        if (typeof DEFAULT_XML_START == 'object' && INTERFACE_NAME !== "adacraft" && Blockly.Constants !== undefined) {
            return DEFAULT_XML_START[Blockly.Constants.getToolboxStyle()];
        } else {
            return DEFAULT_XML_START;
        }
    };
    /**
     * Gets default text code.
     * @public
     */
    getDefaultCodeStart() {
        if (typeof DEFAULT_CODE_START == 'object' && INTERFACE_NAME !== "adacraft" && Blockly.Constants !== undefined) {
            return DEFAULT_CODE_START[Blockly.Constants.getToolboxStyle()];
        } else if (this._interface === 'web') {
            return defaultProject.code.ace.html;
        } else {
            return DEFAULT_CODE_START;
        }
    };
    /**
     * Sets xml and update mixed code since they are always synchronized.
     * @public 
     * @param {string} [xml=this._workspaceToXml()]
     * @returns {void}
     */
    setXml(xml = this._workspaceToXml()) {
        this._xml = xml;
        this._saveLocalProjectState(this.getXml());
        window.localStorage.currentExercise = JSON.stringify({
            "codeText": this.getTextCode(),
            'code': this.getXml(),
            'manuallyModified': this.codeWasManuallyModified
        });
    };
    /**
     * Save the current state of the project in the localStorage (current project id).
     * While the project is loading (project manager not ready yet or initializing), the page does not show its name and
     * description yet: the ones already saved are kept.
     * @private
     * @param {string} code - blocks (xml) or code of the project
     * @returns {void}
     */
    _saveLocalProjectState(code) {
        const savedProject = this.localStorageManager.getLocalProjectContent();
        const pageName = $('#project-name').html();
        const isInitializing = typeof projectManager === 'undefined' || !projectManager || projectManager._isInitializing;
        const isLoading = (isInitializing || !pageName) && savedProject && savedProject.name;
        const currentProjectState = {
            'code': code,
            'codeText': this.getTextCode(),
            'codeManuallyModified': this.isCodeManuallyModified(),
            'mode': this._getSelectedMode(),
            'name': isLoading ? savedProject.name : pageName,
            'description': isLoading ? savedProject.description : CodeManager.getProjectDescription()
        };
        if (savedProject && savedProject.options) currentProjectState.options = savedProject.options;
        this.localStorageManager.setLocalProject(currentProjectState);
    };
    /**
     * Gets xml.
     * @public 
     * @returns {string} xml
     */
    getXml() {
        return this._xml;
    };
    /**
     * Generate code from workspace blocks. In case of reverse trad this function will be called to override the generated code from the workspace.
     * @public 
     * @returns {void}
     */
    setGeneratedCode(code = null) {
        if (code !== null) {
            this._generatedCode = code;
        } else {
            this._generatedCode = this._generator.workspaceToCode(this._workspace);
        }
    };

    // Step by step mode (Simulator.Debugger, PythonDebugger): block of the line being run

    /**
     * Ids of the statement blocks that generated each line of the code editor (null: line of no statement block).
     * The code is generated again with marker lines around the code of each statement block (blockToCode wrapped),
     * the innermost block is kept for each line. Computed again when the code changes. The lines of the editor are
     * aligned with the generated lines (code typed by hand may be written differently).
     * @returns {Array<string|null>}
     */
    getLineBlocks() {
        const workspace = this._workspace;
        const generator = this._generator;
        const editorCode = Main.getCodeEditor().container.getValue();
        if (this.lineBlocks && this.lineBlocks.code === editorCode) {
            return this.lineBlocks.blocks;
        }
        this.lineBlocks = { code: editorCode, blocks: [] };
        if (!workspace || !generator) {
            return this.lineBlocks.blocks;
        }
        const comment = generator === Blockly.Python ? '#' : '//';
        const marker = /^\s*(?:#|\/\/)@@vitta-(start|end):(\S+)\s*$/;
        const ownBlockToCode = Object.prototype.hasOwnProperty.call(generator, 'blockToCode') ? generator.blockToCode : null;
        const blockToCode = generator.blockToCode;
        let code;
        try {
            // Only the statement blocks (the value blocks return [code, order]) whose code is full lines
            generator.blockToCode = function (block, thisOnly) {
                const blockCode = blockToCode.call(this, block, thisOnly);
                if (!block || typeof blockCode !== 'string' || !blockCode.endsWith('\n')) return blockCode;
                return `${comment}@@vitta-start:${block.id}\n${blockCode}${comment}@@vitta-end:${block.id}\n`;
            };
            code = generator.workspaceToCode(workspace);
        } catch (error) {
            console.warn('Step by step: blocks of the lines not found', error);
            return this.lineBlocks.blocks;
        } finally {
            if (ownBlockToCode) {
                generator.blockToCode = ownBlockToCode;
            } else {
                delete generator.blockToCode;
            }
        }
        // Lines of the code with their block, without the markers
        const stack = [];
        const lines = [];
        for (const line of code.split('\n')) {
            const match = line.match(marker);
            if (!match) {
                lines.push({ text: line, block: stack.length ? stack[stack.length - 1] : null });
            } else if (match[1] === 'start') {
                stack.push(match[2]);
            } else if (stack.lastIndexOf(match[2]) !== -1) {
                stack.length = stack.lastIndexOf(match[2]);
            }
        }
        // The code typed in the editor (mixed mode) may be written differently from the code of its blocks (e.g.
        // range(3) / range(0, 3, 1)): the lines are aligned as a diff. Same lines (longest common subsequence of the
        // non-blank lines), then between two of them the same number of different lines on both sides are the same
        // lines written differently; otherwise no block (rather than a wrong one).
        const generated = lines.filter(line => line.text.trim() !== '');
        const editorLines = editorCode.split('\n');
        const edited = editorLines.map((text, index) => ({ text: text.trim(), index })).filter(line => line.text !== '');
        const n = edited.length;
        const m = generated.length;
        const lcs = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                lcs[i][j] = edited[i].text === generated[j].text.trim() ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
            }
        }
        const blocks = editorLines.map(() => null);
        const pairGap = (fromI, toI, fromJ, toJ) => {
            if (toI - fromI === toJ - fromJ) {
                for (let k = 0; k < toI - fromI; k++) blocks[edited[fromI + k].index] = generated[fromJ + k].block;
            }
        };
        let i = 0, j = 0, gapI = 0, gapJ = 0;
        while (i < n && j < m) {
            if (edited[i].text === generated[j].text.trim()) {
                pairGap(gapI, i, gapJ, j);
                blocks[edited[i].index] = generated[j].block;
                i++; j++;
                gapI = i; gapJ = j;
            } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
                i++;
            } else {
                j++;
            }
        }
        pairGap(gapI, n, gapJ, m);
        this.lineBlocks.blocks = blocks;
        return this.lineBlocks.blocks;
    }

    /**
     * Select (yellow outline) the block of a line of the code editor, scrolled into view.
     * @param {int|null} line - null to unselect
     */
    selectLineBlock(line) {
        try {
            if (this.debugBlock && !this.debugBlock.isDeadOrDying()) {
                this.debugBlock.removeSelect();
            }
            this.debugBlock = null;
            if (line === null || Main.getCodeMode?.() === 'code') return;
            const id = this.getLineBlocks()[line];
            const block = id ? this._workspace.getBlockById(id) : null;
            if (!block) return;
            block.addSelect();
            block.workspace.scrollBoundsIntoView?.(block.getBoundingRectangleWithoutChildren?.() || block.getBoundingRectangle());
            this.debugBlock = block;
        } catch (error) {
            console.warn('Step by step: block of the line not selected', error);
        }
    }

    /**
     * Gets generated code.
     * @public 
     * @returns {string} generatedCode
     */
    getGeneratedCode() {
        return this._generatedCode;
    };
    /**
     * Updates text code by mixed_mode code if it was not manually modified, 
     * by code_mode code else.
     * @public
     * @param {string} textCode
     * @returns {void}
     */
    updateTextCode(textCode) {
        this.setTextCode(textCode);
        this._saveLocalProjectState(this._xml);
        window.localStorage.currentExercise = JSON.stringify({
            "codeText": this.getTextCode(),
            'code': this._xml
        });
    };
    /**
     * Sets text code.
     * @public
     * @param {string} textCode
     * @returns {void}
     */
    setTextCode(textCode) {
        if (this.isCodeManuallyModified() && textCode) {
            this._textCode = textCode;
        } else {
            this._textCode = this.getGeneratedCode();
        }
    };
    /**
     * Gets text code.
     * @public
     * @returns {string}
     */
    getTextCode() {
        return this._textCode;
    };
    /**
     * Returns true if code mode is currently selected
     * @returns {boolean}
     * @memberof CodeManager
     */
    isCodeSelected() {
        return this._getSelectedMode() == MODE_CODE;
    };
    /**
     * Returns true if code only mode is currently selected
     * @returns {boolean}
     * @memberof CodeManager
     */
    isCodeOnlySelected() {
        return this._getSelectedMode() == MODE_CODE_ONLY;
    };
    /**
     * Sets link.
     * @public
     * @param {string} link
     * @returns {void}
     */
    setLink(link) {
        this._link = link;
    };
    /**
     * Gets link.
     * @public
     * @returns {string}
     */
    getLink() {
        return this._link;
    };
    /**
     * Gets link.
     * @public
     * @returns {bool}
     */
    isCodeManuallyModified() {
        return this.codeWasManuallyModified ? this.codeWasManuallyModified : false;
    };
    /**
     * Get interface name.
     * @return {string}
     */
    getInterface() {
        return this._interface;
    };

    /**
     * Return a JSON from a stringified JSON or false if it failed to parse
     * @public
     * @param {String} stringifiedJSON - A stringified JSON 
     * @returns The JSON object, false if the provided argument isn't JSON parsable
     */
    checkAndParseJSON(stringifiedJSON) {
        try {
            const parsedJSON = JSON.parse(stringifiedJSON);
            return parsedJSON;
        } catch (error) {
            console.warn(`The provided argument isn't JSON parsable!`);
            return false;
        }
    }

    /**
     * Convert the html entities into human readable characters
     * @public
     * @param {string} sanitizedString 
     * @returns {string|false} The decoded string. False if the provided argument isn't a string
     */
    decodeSanitizedString(sanitizedString) {
        const sanitizedStringType = typeof sanitizedString;
        if (sanitizedStringType !== 'string') {
            console.error(`${String(sanitizedString)} must be a string, ${sanitizedStringType} provided!`);
            return "";
        }
        const textAreaDecoderElt = document.createElement('textarea');
        let previousState = sanitizedString,
            decodedString = previousState,
            securityCount = 0;
        do {
            previousState = decodedString;
            textAreaDecoderElt.innerHTML = previousState;
            decodedString = textAreaDecoderElt.value;
            securityCount++;
        } while (previousState !== decodedString && securityCount < 20);
        return decodedString;
    };

    /**
     * Convert old web project code from localStorage
     * @public
     * @returns {undefined} In early return context
     */
    convertOldWebProjectCodeLStorage() {
        if (this._interface !== 'web') return;
        if (!this.localStorageManager.getLocalProjectContent()) return;
        const project = this.localStorageManager.getLocalProjectContent();
        if (!project || !project.code) return;
        const parsedCode = this.checkAndParseJSON(project.code);
        if (!parsedCode && typeof project.code !== 'object') return;
        project.code = this._adaptOldWebCode(parsedCode);
        this.localStorageManager.setLocalProject(project);
    }

    /**
     * Convert old web project code from projectManager
     * @public
     * @returns {undefined} In early return context
     */
    convertOldWebProjectCode() {
        const currentProjectCode = projectManager._currentProject.code;
        const parsedProjectCode = this.checkAndParseJSON(currentProjectCode);
        if (!parsedProjectCode) return;
        if (!parsedProjectCode.blockly) return;
        const adaptedCode = this._adaptOldWebCode(parsedProjectCode);
        projectManager._currentProject.code = adaptedCode;
    }

    /**
     * Load the old project.blockly.html xml code into Blockly workspace and return the generated textual code
     * @private
     * @param {Object} oldWebProjectCode - The object containing blockly and ace codes
     * @returns {String} The converted code or default project code if noone is available
     */
    _adaptOldWebCode(oldWebProjectCode) {
        if (!oldWebProjectCode.blockly || !oldWebProjectCode.ace) return defaultProject.code.ace.html;
        let veryOldProject = false;
        if (oldWebProjectCode.blockly.css) veryOldProject = true;
        const decodedHtml = this.decodeSanitizedString(oldWebProjectCode.blockly.html);
        // We remove the hyphen in the block types
        const decodedHtmlConvertedBlockType = decodedHtml.replace(/type="([^"]*)"/g, (match, p1) => {
            return `type="${p1.replace(/-/g, '')}"`;
        });
        this.loadBlocks(decodedHtmlConvertedBlockType);
        if (veryOldProject) {
            setTimeout(() => { pseudoModal.openModal('web-old-model-conversion') }, 200); // Let some time for the openProject function to work
            return `<html>${this.getGeneratedCode()}</html>`;
        }
        return this.getGeneratedCode();
    }
    /**
     * Disconnect input from block in xml.
     * @public
     * @param {string} xml
     * @param {string} blockType
     * @param {string} inputName
     * @returns {string} xml
     */
    _disconnectInputFromBlock(xml, blockType, inputName) {
        const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
        const blocks = xmlDoc.querySelectorAll('block[type="' + blockType + '"]');
        blocks.forEach((block) => {
            const dataValue = Array.from(block.children).find(
                (child) => child.tagName === "value" && child.getAttribute("name") === inputName
            );
            if (dataValue) {
                block.removeChild(dataValue);
            }
        });
        return new XMLSerializer().serializeToString(xmlDoc);
    }
}