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

    /**
     * Creates an instance of CodeManager.
     * @private
     * @param {string} codeMode
     * @param {Blockly.Workspace} workspace
     * @param {Blockly.Generator} generator
     * @param {string} xml
     */

    constructor(codeMode, workspace, generator, xml) {
        this.REGEXP_INTERFACES = /.*(arduino|microbit|python|adacraft|wb55|l476|esp32|TI-83|galaxia|raspberrypi|niryo|nao|GalaxiaCircuitPython|mBot|m5stack|buddy|cyberpi|eliobot|thymio|letsstartcoding|pico|winky|web|sphero|lotibot|bluebot|spike|photon).*/g;
        if (typeof ltiVariables13 != 'undefined') {
            this._interface = ltiVariables13.interface;
        } else if (typeof ltiVariables != 'undefined') {
            this._interface = ltiVariables.interface;
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
            $('#project-name').html(localstorage.name);
            $('#project-name').attr('data-bs-title', `<span class="tooltip-title">${localstorage.name}</span><span class="tooltip-author">${i18next.t('code.tooltip.anonymousAuthor')}</span><span class="tooltip-description">${localstorage.description}</span>`);
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
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this._workspace);
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
        if (this._workspace !== null) {
            this._workspace.clear();
            if (xml !== null) {
                try {
                    this._xmlToWorkspace(xml);
                } catch (e) {
                    console.error(e)
                    this._xmlToWorkspace(this.getDefaultXmlStart());
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
            }
        }
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
        const currentProjectState = {
            'code': this.getXml(),
            'codeText': this.getTextCode(),
            'codeManuallyModified': this.isCodeManuallyModified(),
            'mode': this._getSelectedMode(),
            'name': $('#project-name').html(),
            'description': $('#project-name').attr('data-bs-title') 
        };
        
        if (this.localStorageManager.getLocalProjectContent() && this.localStorageManager.getLocalProjectContent().options) currentProjectState.options = this.localStorageManager.getLocalProjectContent().options;

        this.localStorageManager.setLocalProject(currentProjectState);
        window.localStorage.currentExercise = JSON.stringify({
            "codeText": this.getTextCode(),
            'code': this.getXml(),
            'manuallyModified': this.codeWasManuallyModified
        });
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
            this._generatedCode = code
        } else {
            this._generatedCode = this._generator.workspaceToCode(this._workspace);
        }
    };
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
        const currentProjectState = {
            'code': this._xml,
            'codeText': this.getTextCode(),
            'codeManuallyModified': this.isCodeManuallyModified(),
            'mode': this._getSelectedMode(),
            'name': $('#project-name').html(),
            'description': $('#project-name').attr('data-bs-title'),
        };

        if (this.localStorageManager.getLocalProjectContent() && this.localStorageManager.getLocalProjectContent().options) currentProjectState.options = this.localStorageManager.getLocalProjectContent().options;

        this.localStorageManager.setLocalProject(currentProjectState);
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
        const localstorage = this.localStorageManager.getLocalProjectContent();
        if (!localstorage || !localstorage.code) return;
        const localStorageCode = this.checkAndParseJSON(localstorage.code);
        if (!localStorageCode && typeof localstorage.code !== 'object') return;
        const adaptedCode = this._adaptOldWebCode(localStorageCode);
        localstorage.code = adaptedCode;
        this.localStorageManager.setLocalProject(localstorage);
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
}