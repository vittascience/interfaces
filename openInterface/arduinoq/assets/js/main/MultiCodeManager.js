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
        cpp: ['cpp_on_start', 'cpp_forever', 'cpp_scratch_on_start', 'cpp_procedures_defreturn', 'cpp_procedures_defnoreturn', 'io_attachInterrupt'],
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
        this.updateFileTabNeighbors();
    }

    updateFileTabNeighbors() {
        this.tabsEl.forEach(tab => {
            tab.classList.remove('left-active', 'right-active');
            const prev = tab.previousElementSibling;
            const next = tab.nextElementSibling;
            if (!tab.classList.contains('active')) {
                if (prev && prev.classList.contains('active')) tab.classList.add('left-active');
                if (next && next.classList.contains('active')) tab.classList.add('right-active');
            }
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

            const code = this.generateLanguageFromCurrentWorkspace(language, generator).trimEnd();
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
        const previousStates = this.allBlocks.map(b => ({ block: b, enabled: b.isEnabled() }));
        const previousStatesMap = new Map();
        previousStates.forEach(s => previousStatesMap.set(s.block, s.enabled));
        this.disableOtherLanguages(language, previousStatesMap);
        this.disableBlocksByTopBlock();
        const code = generator.workspaceToCode(this._workspace);

        // restore tous les blocs
        previousStates.forEach(s => {
            if (!s.block.isDisposed()) {
                s.block.setEnabled(s.enabled);
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
            block.setEnabled(true);
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
        block.setEnabled(false);
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

            let state = block.isEnabled(); // conserve l'état actuel par défaut

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

            block.setEnabled(state);
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