/**
 * Workspace MicropythonRepl: MultiCodeManager
 * Copyright 2026 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide an extension for multiple CodeManager in order to manage
 * different files as sketch.ino / main.py / index.html for Arduino UNO Q.
 */

/** 
 * @fileoverview WorkSpace MultiCodeManager 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class MultiCodeManager
 */
class MultiCodeManager extends CodeManager {

    static getSharedInstance(codeMode = null, workspace = null, generator = null, xml = null) {
        if (!!CodeManager.instance) {
            return CodeManager.instance;
        }
        return new MultiCodeManager(codeMode, workspace, generator, xml);
    }

    constructor(codeMode, workspace, generator, xml) {
        super(codeMode, workspace, generator, xml);

        this._multiGenerators = {
            cpp: Blockly.Arduino,
            py: Blockly.Python,
            html: Blockly.JavaScript
        };

        this._multiSections = {
            cpp: { filename: 'sketch.ino', comment: '//' },
            py: { filename: 'main.py', comment: '#' },
            html: { filename: 'index.html', commentStart: '<!--', commentEnd: '-->' }
        };

        this._generatedFiles = {
            'sketch.ino': '',
            'main.py': '',
            'index.html': ''
        };
        this._projectFiles = Object.assign({}, this._generatedFiles);

        this._activeGeneratedFile = 'main.py';
        this._editor = null;
        this._isSwitchingGeneratedFile = false;

        this.tabsEl = document.querySelectorAll('#file-tabs .file-tab');
    }

    static _multiRootBlocks = {
        cpp: ['cpp_on_start', 'cpp_forever', 'cpp_on_start_forever', 'cpp_scratch_on_start', 'cpp_procedures_defreturn', 'cpp_procedures_defnoreturn', 'io_attachInterrupt'],
        py: ['py_on_start', 'py_forever', 'py_scratch_on_start', 'py_procedures_defreturn', 'py_procedures_defnoreturn', 'bricks_webui_on_message'],
        html: ['html_page']
    };

    getCodeFiles() {
        return this.splitCodeBySections(this.getCode());
    }

    getFile(filename = null) {
        const file = filename || this._activeGeneratedFile;
        const files = this.getCodeFiles() || {};
        return files[file] || '';
    }

    initGeneratedCodeTabs(editor) {
        this._editor = editor;
        this.tabsEl.forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();

                const filename = button.dataset.codeTarget;
                this.openFile(filename, true);
            });
        });
        this.updateFileTabs();
        this.updateFileAceMode(this._activeGeneratedFile);
        this.alignFileTabsWithGutter();
    }

    /**
     * The tabs start above the code: the line numbers column (its width changes with the number of lines and the
     * zoom) goes on in the tabs bar
     */
    alignFileTabsWithGutter() {
        const tabsElt = document.getElementById('file-tabs');
        const renderer = this._editor && this._editor.renderer;
        if (!tabsElt || !renderer) return;
        renderer.on('afterRender', () => {
            const width = renderer.gutterWidth + 'px';
            const gutterElt = renderer.$gutter;
            const color = gutterElt ? getComputedStyle(gutterElt).backgroundColor : '';
            if (tabsElt.style.getPropertyValue('--gutter-width') !== width) tabsElt.style.setProperty('--gutter-width', width);
            if (tabsElt.style.getPropertyValue('--gutter-color') !== color) tabsElt.style.setProperty('--gutter-color', color);
        });
    }

    openFile(filename, manual = false) {
        if (!filename) return;

        if (this._getSelectedMode() == 'code') {
            const previousCode = this._editor.getSession().getValue();
            this._projectFiles[this._activeGeneratedFile] = previousCode;
        }

        this._activeGeneratedFile = filename;
        this.updateEditorFile(filename);

        if (manual) {
            this.updateFileTabs();
        }
    }

    updateEditorFile(filename = null) {
        if (!this._editor) return;

        const targetFile = filename || this._activeGeneratedFile;
        const code = this.getFile(targetFile);

        this._isSwitchingGeneratedFile = true;

        this._editor.session.setValue(code);
        this.updateFileTabs();
        this.updateFileAceMode(targetFile);

        setTimeout(() => {
            this._isSwitchingGeneratedFile = false;
        }, 0);
    }

    updateFileTabs() {
        const activeFile = this._activeGeneratedFile;

        this.tabsEl.forEach(button => {
            const isActive = button.dataset.codeTarget === activeFile;
            button.classList.toggle('active', isActive);
        });
    }

    updateFileAceMode(filename) {
        if (!this._editor || !filename) return;

        const session = this._editor.getSession();

        if (filename.endsWith('.py')) {
            session.setMode('ace/mode/python');
        } else if (filename.endsWith('.ino') || filename.endsWith('.cpp') || filename.endsWith('.h')) {
            session.setMode('ace/mode/c_cpp');
        } else if (filename.endsWith('.html')) {
            session.setMode('ace/mode/html');
        } else if (filename.endsWith('.css')) {
            session.setMode('ace/mode/css');
        } else if (filename.endsWith('.js')) {
            session.setMode('ace/mode/javascript');
        } else {
            session.setMode('ace/mode/text');
        }
    }

    isSwitchingGeneratedFile() {
        return this._isSwitchingGeneratedFile === true;
    }

    // ---------- Generated code management ----------

    setGeneratedCode(code = null) {
        if (code !== null) {
            this._generatedCode = code;
            this._generatedFiles = this.splitCodeBySections(code);
            this._projectFiles = Object.assign({}, this._generatedFiles);
            return;
        }
        this._generatedCode = this.workspaceToMultiCode();
        this._projectFiles = Object.assign({}, this._generatedFiles);
    }

    getMergeEditorTabsCode() {
        if (!this._editor) return '';

        // Liste des fichiers générés connus
        const filenames = Object.keys(this._projectFiles);
        const mergedSections = [];

        filenames.forEach(filename => {
            // Récupère le code actuel affiché dans l'éditeur si cet onglet est actif
            const code = (this._activeGeneratedFile === filename)
                ? this._editor.getSession().getValue()
                : this._projectFiles[filename] || '';

            if (code.trim()) {
                // On ajoute les balises start/end pour garder la structure
                const section = this.wrapGeneratedSection(
                    Object.keys(this._multiSections).find(lang => this._multiSections[lang].filename === filename),
                    code
                );
                mergedSections.push(section);
            }
        });

        return mergedSections.join('\n\n');
    }

    workspaceToMultiCode(activeLanguage = null) {
        const sections = [];
        this._generatedFiles = { 'sketch.ino': '', 'main.py': '', 'index.html': '' };

        Object.keys(this._multiGenerators).forEach(language => {
            const generator = this._multiGenerators[language];
            const section = this._multiSections[language];
            if (!generator || !section) return;

            let code = this.generateLanguageFromCurrentWorkspace(language, generator).trimEnd();
            if (language === 'py') {
                // index.html is only served by the WebUI brick
                const usesHtml = this._workspace.getBlocksByType('html_page', false).some(block => block.isEnabled());
                if (usesHtml && !/WebUI\(\)/.test(code)) {
                    code += '\n\nfrom arduino.app_bricks.web_ui import WebUI\nui = WebUI()';
                }
                // Without App.run() (or a top-level forever loop) the script ends right after Bridge.provide()
                // and the bridge dies with it; bricks such as WebUI are also only started by App.run()
                if (/Bridge\.provide\(|WebUI\(\)/.test(code) && !/App\.run\(/.test(code) && !/^while True:/m.test(code)) {
                    if (!/from arduino\.app_utils import/.test(code)) {
                        code += '\nfrom arduino.app_utils import *';
                    }
                    code += '\nApp.run()';
                }
            }
            // The shared Arduino blocks write to Serial, which is not the sketch console on the UNO Q
            if (language === 'cpp') {
                code = code.replace(/\bSerial\b/g, 'Monitor');
            }
            this._generatedFiles[section.filename] = code;

            if (code.trim()) sections.push(this.wrapGeneratedSection(language, code));
        });

        if (activeLanguage && this._multiSections[activeLanguage]) {
            this._activeGeneratedFile = this._multiSections[activeLanguage].filename;
        }

        return sections.join('\n\n');
    }

    generateLanguageFromCurrentWorkspace(language, generator) {
        this.allBlocks = this._workspace.getAllBlocks(false);
        // enabled: aggregate state, used by the temporary generation logic.
        // manuallyDisabled: the manual reason only, which is what is restored afterwards (a block
        // disabled for another reason, e.g. orphaned, must not be left manually disabled).
        const previousStates = this.allBlocks.map(b => ({
            block: b,
            enabled: b.isEnabled(),
            manuallyDisabled: b.hasDisabledReason(Blockly.constants.MANUALLY_DISABLED)
        }));
        const previousStatesMap = new Map();
        previousStates.forEach(s => previousStatesMap.set(s.block, s.enabled));
        this.disableOtherLanguages(language, previousStatesMap);
        this.disableBlocksByTopBlock();
        const code = generator.workspaceToCode(this._workspace);

        // restore tous les blocs
        previousStates.forEach(s => {
            if (!s.block.isDisposed()) {
                s.block.setDisabledReason(s.manuallyDisabled, Blockly.constants.MANUALLY_DISABLED);
            }
        });
        this.disableBlocksByTopBlock();

        return code;
    }

    // ---------- Temporary and permanent disable logic ----------

    disableOtherLanguages(language, previousStatesMap = null) {
        const topBlocks = this._workspace.getTopBlocks(true);
        topBlocks.forEach(block => {
            if (block.isEnabled()) {
                const blockLanguage = MultiCodeManager.getRootBlockLanguage(block.type);
                if (blockLanguage === language) {
                    this.enableRecursive(block, previousStatesMap);
                } else {
                    this.disableRecursive(block);
                }
            }
        });
    }

    enableRecursive(block, previousStatesMap = null) {
        if (!previousStatesMap || previousStatesMap.get(block)) {
            block.setDisabledReason(false, Blockly.constants.MANUALLY_DISABLED);
        }
        let next = block.getNextBlock();
        while (next) {
            this.enableRecursive(next, previousStatesMap);
            next = next.getNextBlock();
        }
        if (block.inputList) {
            block.inputList.forEach(input => {
                if (input.connection && input.connection.targetBlock()) {
                    this.enableRecursive(input.connection.targetBlock(), previousStatesMap);
                }
            });
        }
    }

    disableRecursive(block) {
        block.setDisabledReason(true, Blockly.constants.MANUALLY_DISABLED);
        let next = block.getNextBlock();
        while (next) {
            this.disableRecursive(next);
            next = next.getNextBlock();
        }
        if (block.inputList) {
            block.inputList.forEach(input => {
                if (input.connection && input.connection.targetBlock()) {
                    this.disableRecursive(input.connection.targetBlock());
                }
            });
        }
    }

    disableBlocksByTopBlock() {
        const maps = this.buildBlocksLanguageMap();
        const allBlocks = this._workspace.getAllBlocks(false);

        allBlocks.forEach(block => {
            const topBlock = block.getRootBlock ? block.getRootBlock() : block;
            const topType = topBlock ? topBlock.type : null;
            const topLanguage = MultiCodeManager.getRootBlockLanguage(topType);
            // A block from another language category (e.g. Arduino block on the Python thread) is disabled
            // with its own reason, so it comes back as soon as it is moved to the right thread
            block.setDisabledReason(!MultiCodeManager.isBlockAllowedIn(topLanguage, block.type, this._multiGenerators[topLanguage]), MultiCodeManager.WRONG_LANGUAGE_DISABLED);
            // Common procedure blocks: colour of the language of their thread, else of the flyout they come from
            if (MultiCodeManager.COMMON_PROCEDURE_BLOCKS.includes(block.type)) {
                const language = ['py', 'cpp'].includes(topLanguage) ? topLanguage : block.data;
                const style = Blockly.Constants.Procedures.getLanguageStyle(language ? language + '_' : block.type);
                if (block.getStyleName() !== style) block.setStyle(style);
            }

            // conserve l'état actuel par défaut (raison manuelle seulement, pas l'état global)
            let state = !block.hasDisabledReason(Blockly.constants.MANUALLY_DISABLED);

            // On parcourt tous les langages
            for (const language of Object.keys(MultiCodeManager._multiRootBlocks)) {
                const topBlocks = new Set(MultiCodeManager._multiRootBlocks[language]);
                if (topBlocks.has(topType)) {
                    if (!maps[`${language}Blocks`][block.type]) {
                        console.warn(`No ${language.toUpperCase()} generator for block '${block.type}'`);
                        state = false;
                    }
                    break; // dès qu'on a trouvé le langage correspondant, on sort de la boucle
                }
            }

            block.setDisabledReason(!state, Blockly.constants.MANUALLY_DISABLED);
        });
    }

    buildBlocksLanguageMap() {
        const maps = {};
        const blocks = this.allBlocks || this._workspace.getAllBlocks(false);

        Object.keys(this._multiGenerators).forEach(language => {
            const generator = this._multiGenerators[language];
            maps[`${language}Blocks`] = {};

            blocks.forEach(block => {
                const type = block.type;
                maps[`${language}Blocks`][type] = !!(generator && generator[type]);
            });
        });

        return maps;
    }

    static WRONG_LANGUAGE_DISABLED = 'WRONG_LANGUAGE';

    // Procedure blocks common to the Arduino and Python functions (the call blocks follow their definition)
    static COMMON_PROCEDURE_BLOCKS = ['procedures_functionReference', 'procedures_simple_return', 'procedures_ifreturn'];

    // Toolbox categories allowed under the root blocks of each language
    static _allowedToolboxCategories = {
        cpp: ['basic', 'cpp'],
        py: ['basic', 'python'],
        html: ['basic', 'html', 'style', 'javascript']
    };

    /**
     * @param {string} language - cpp, py or html
     * @param {string} type - block type
     * @param {Object} generator - generator of the language: the common blocks (Base) are only allowed where
     * they generate code (e.g. Time: Arduino and Python waits)
     */
    static isBlockAllowedIn(language, type, generator = null) {
        if (!language) return true;
        if (!MultiCodeManager._toolboxCategories) {
            // block type -> top level toolbox categories listing it ('controls_if-else' variants -> 'controls_if')
            const map = {};
            const walk = (node, category) => {
                if (Array.isArray(node)) {
                    node.forEach(child => walk(child, category));
                } else if (node && typeof node === 'object') {
                    (node.blocks || []).forEach(block => {
                        if (typeof block === 'string') (map[block.split('-')[0]] ||= new Set()).add(category);
                    });
                    walk(node.contents, category);
                }
            };
            Object.entries(TOOLBOX_VITTASCIENCE_CONTENT).forEach(([category, content]) => walk(content, category));
            MultiCodeManager._toolboxCategories = map;
        }
        const categories = MultiCodeManager._toolboxCategories[type];
        // Blocks not listed in the toolbox (function calls, shadows...) are not restricted
        return !categories || [...categories].some(category => MultiCodeManager._allowedToolboxCategories[language].includes(category)
            && (category !== 'basic' || !generator || typeof generator[type] === 'function'));
    }

    // ---------- Helper for temporary state ----------

    static getRootBlockLanguage(type) {
        if (!type) return null;
        for (const language in MultiCodeManager._multiRootBlocks) {
            if (MultiCodeManager._multiRootBlocks[language].includes(type)) return language;
        }
        return null;
    }

    wrapGeneratedSection(language, code) {
        const section = this._multiSections[language];
        if (!section || !code.trim()) return '';
        return [`@vitta:start ${section.filename}`, code.trimEnd(), `@vitta:end ${section.filename}`].join('\n');
    }

    splitCodeBySections(code) {
        const sections = {};
        const regex = /^@vitta:start ([^\n\r]+)\r?\n([\s\S]*?)\r?\n@vitta:end \1$/gm;
        let match;
        while ((match = regex.exec(code)) !== null) {
            sections[match[1].trim()] = match[2].trimEnd();
        }
        return sections;
    }
}