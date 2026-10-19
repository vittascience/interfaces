'use strict';

/**
 * @fileoverview Block extensions of the interface (like MakeCode extensions), picked by the user from a static
 * catalog (BLOCK_EXTENSIONS_CATALOG, defined by the interface). The project stores the ids in use.
 *
 * An extension is plain data: the blocks are defined from a declarative description and their Python code comes
 * from templates such as "ring.set({N}, {C})". Texts are either strings or { en, fr, ... } objects.
 * {
 *   "id": "ledring",
 *   "name": "LED ring",
 *   "description": { "en": "...", "fr": "..." },
 *   "image": "ledring.jpg",                      // in the interface media/extensions folder
 *   "colour": "#e67e22",
 *   "blocks": [{
 *     "name": "set_color",                       // the block type is ext_<id>_<name>: never rename it
 *     "kind": "statement",                       // statement | number | text | boolean | any
 *     "text": { "en": "set LED {N} to {C}" },     // {ARG} adds a parameter
 *     "args": [{ "name": "N", "type": "number", "default": "0" },   // number | text | boolean | dropdown
 *              { "name": "C", "type": "dropdown", "options": [["red", "(255, 0, 0)"], "pin0"] }],  // [label, code] or code
 *     "imports": "import ledring",               // one import per line
 *     "code": "ledring.set({N}, {C})"
 *   }]
 * }
 * The project stores the ids in options.extensions as an object { id: true } (a JSON array at this level would
 * break the server-side options sanitizing).
 */
const BlockExtensions = {
    PLACEHOLDER_REGEXP: /\{([A-Za-z_][A-Za-z0-9_]{0,29})\}/g,
    CHECKS: { number: 'Number', text: 'String', boolean: 'Boolean' },
    _extensions: [],
    _loadedKey: null,
    _project: undefined,
    _listenedWorkspace: null,

    /**
     * Translate a key of code.blockExtensions.
     * @param {string} key
     * @param {Object} [params]
     * @returns {string}
     */
    t(key, params) {
        return typeof i18next !== 'undefined' ? i18next.t('code.blockExtensions.' + key, params) : key;
    },

    /**
     * Replace the { en, fr, ... } texts of a value by the text of the current language (English by default).
     * @param {*} value
     * @param {string} [lang]
     * @returns {*}
     */
    localize(value, lang = (typeof i18next !== 'undefined' && i18next.language || 'en').slice(0, 2)) {
        if (Array.isArray(value)) return value.map(item => this.localize(item, lang));
        if (!value || typeof value !== 'object') return value;
        if (typeof value.en === 'string') return value[lang] || value.en;
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.localize(item, lang)]));
    },

    /**
     * Get the extensions of the catalog, in the current language.
     * @returns {Array<Object>}
     */
    getCatalog() {
        return typeof BLOCK_EXTENSIONS_CATALOG !== 'undefined' ? this.localize(BLOCK_EXTENSIONS_CATALOG) : [];
    },

    /**
     * Get the parameter names written as {NAME} in a text, in order of appearance.
     * @param {string} text
     * @returns {Array<string>}
     */
    getPlaceholders(text) {
        return [...String(text).matchAll(this.PLACEHOLDER_REGEXP)].map(match => match[1]);
    },

    /**
     * Replace the {ARG} placeholders of a code template. Other braces (dict, set, f-string) are kept.
     * @param {string} template
     * @param {Array<Object>} args
     * @param {function(Object): string} getValue
     * @returns {string}
     */
    fillTemplate(template, args, getValue) {
        return template.replace(this.PLACEHOLDER_REGEXP, (match, name) => {
            const arg = args.find(arg => arg.name === name);
            return arg ? getValue(arg) : match;
        });
    },

    /**
     * Get the Blockly type of an extension block.
     * @param {Object} ext
     * @param {Object} block
     * @returns {string}
     */
    getBlockType(ext, block) {
        return `ext_${ext.id}_${block.name}`;
    },

    /**
     * Build the Blockly JSON definition of an extension block.
     * @param {Object} ext
     * @param {Object} block
     * @returns {Object}
     */
    toBlockJson(ext, block) {
        const args0 = [];
        // "%%" is a literal "%" for Blockly, then every {ARG} becomes %1, %2...
        const message0 = block.text.replace(/%/g, '%%').replace(this.PLACEHOLDER_REGEXP, (match, name) => {
            const arg = block.args.find(arg => arg.name === name);
            args0.push(arg.type === 'dropdown'
                ? { type: 'field_dropdown', name, options: arg.options.map(option => Array.isArray(option) ? option : [option, option]) }
                : { type: 'input_value', name, check: this.CHECKS[arg.type] });
            return '%' + args0.length;
        });
        const json = { type: this.getBlockType(ext, block), message0, args0, colour: ext.colour, inputsInline: true, tooltip: ext.name };
        if (block.kind === 'statement') {
            json.previousStatement = null;
            json.nextStatement = null;
        } else {
            json.output = this.CHECKS[block.kind] || null;
        }
        return json;
    },

    /**
     * Define the Python generator of an extension block.
     * @param {Object} block
     * @param {string} type
     */
    defineGenerator(block, type) {
        const EMPTY_VALUES = { number: '0', text: "''", boolean: 'False' };
        Blockly.Python[type] = (blockSvg) => {
            for (const line of (block.imports || '').split('\n').map(line => line.trim()).filter(Boolean)) {
                Blockly.Python.addImport(line, line);
            }
            const code = this.fillTemplate(block.code, block.args, (arg) => arg.type === 'dropdown'
                ? blockSvg.getFieldValue(arg.name)
                : Blockly.Python.valueToCode(blockSvg, arg.name, Blockly.Python.ORDER_NONE) || EMPTY_VALUES[arg.type]);
            return block.kind === 'statement' ? code + NEWLINE : [code, Blockly.Python.ORDER_NONE];
        };
    },

    /**
     * Get the toolbox item of an extension block, with shadows in its inputs (dropdowns are fields, not inputs).
     * @param {Object} ext
     * @param {Object} block
     * @returns {Object}
     */
    toToolboxItem(ext, block) {
        const inputs = {};
        for (const arg of block.args.filter(arg => arg.type !== 'dropdown')) {
            inputs[arg.name] = { shadow: this._getShadow(arg) };
        }
        return { kind: 'block', type: this.getBlockType(ext, block), inputs };
    },

    /**
     * Get the shadow block state of a value input argument.
     * @private
     * @param {Object} arg
     * @returns {Object}
     */
    _getShadow(arg) {
        switch (arg.type) {
            case 'number':
                return { type: 'math_number', fields: { NUM: Number(arg.default) || 0 } };
            case 'text':
                return { type: 'text', fields: { TEXT: arg.default || '' } };
            default:
                return { type: 'logic_boolean', fields: { BOOL: 'TRUE' } };
        }
    },

    /**
     * Get the extensions currently in use.
     * @returns {Array<Object>}
     */
    getExtensions() {
        return this._extensions;
    },

    /**
     * Get the catalog extensions of the project option (object keyed by id). Unknown ids are ignored.
     * @param {Object} option
     * @returns {Array<Object>}
     */
    fromOption(option) {
        if (!option || typeof option !== 'object') return [];
        return this.getCatalog().filter(ext => Object.prototype.hasOwnProperty.call(option, ext.id));
    },

    /**
     * Write the extensions in use in project options (called by ProjectManager.getCurrentOptionsStatus).
     * @param {Object} options
     */
    writeOption(options) {
        if (this._extensions.length) {
            options.extensions = Object.fromEntries(this._extensions.map(ext => [ext.id, true]));
        } else {
            delete options.extensions;
        }
    },

    /**
     * Load the extensions of the current project when another project is opened (called before loading the blocks).
     * Loading the same project again (RTC, toolbox switch...) keeps the extensions changed since.
     */
    syncFromProject() {
        const currentProject = this._getCurrentProject();
        if (currentProject) {
            if (currentProject === this._project) return;
            this._project = currentProject;
            this.load(this.fromOption(currentProject.options && currentProject.options.extensions));
        } else if (this._project === undefined) {
            this._project = null;
            const localProject = CodeManager.getSharedInstance().localStorageManager.getLocalProjectContent();
            this.load(this.fromOption(localProject && localProject.options && localProject.options.extensions));
        }
    },

    /**
     * Get the project of the project manager, null before it is loaded.
     * @private
     * @returns {Object|null}
     */
    _getCurrentProject() {
        return typeof projectManager !== 'undefined' && projectManager && projectManager._currentProject || null;
    },

    /**
     * Define the blocks, generators and toolbox of a list of catalog extensions.
     * @param {Array<Object>} extensions
     */
    load(extensions) {
        const key = extensions.map(ext => ext.id).join();
        if (key === this._loadedKey) return;
        for (const ext of this._extensions) {
            for (const block of ext.blocks) {
                delete Blockly.Blocks[this.getBlockType(ext, block)];
                delete Blockly.Python[this.getBlockType(ext, block)];
            }
        }
        this._extensions = extensions;
        this._loadedKey = key;
        Blockly.defineBlocksWithJsonArray(extensions.flatMap(ext => ext.blocks.map(block => this.toBlockJson(ext, block))));
        for (const ext of extensions) {
            for (const block of ext.blocks) {
                this.defineGenerator(block, this.getBlockType(ext, block));
            }
        }
        const toolbox = typeof Main !== 'undefined' && Main.getToolboxManager();
        if (toolbox) toolbox.setToolbox();
    },

    /**
     * Get the blocks of the workspace that belong to an extension which is not in a list.
     * @param {Array<Object>} extensions
     * @returns {Array<Blockly.Block>}
     */
    getRemovedBlocks(extensions) {
        const kept = new Set(extensions.flatMap(ext => ext.blocks.map(block => this.getBlockType(ext, block))));
        const used = new Set(this._extensions.flatMap(ext => ext.blocks.map(block => this.getBlockType(ext, block))));
        return Main.getWorkSpace().getAllBlocks(false).filter(block => used.has(block.type) && !kept.has(block.type));
    },

    /**
     * Use a new list of catalog extensions in the current project (the project is saved with its options).
     * The blocks of the removed extensions are deleted from the workspace.
     * @param {Array<Object>} extensions
     */
    save(extensions) {
        const codeManager = CodeManager.getSharedInstance();
        Blockly.Events.disable();
        try {
            this.getRemovedBlocks(extensions).forEach(block => block.dispose(true));
        } finally {
            Blockly.Events.enable();
        }
        this._project = this._getCurrentProject() || this._project;
        this.load(extensions);
        codeManager.setGeneratedCode();
        codeManager.setXml();
        const localProject = codeManager.localStorageManager.getLocalProjectContent();
        if (localProject) {
            localProject.options = localProject.options || {};
            this.writeOption(localProject.options);
            codeManager.localStorageManager.setLocalProject(localProject);
        }
        if (typeof projectManager !== 'undefined' && projectManager) projectManager._refreshProjectStatus();
    },

    /**
     * Add a category per extension in use before the toolbox separator (at the end without separator), then the
     * "Extensions" category at the end, which opens the catalog (called each time the toolbox is built).
     * @param {ToolboxManager} toolbox
     */
    pushToolbox(toolbox) {
        const content = toolbox._getToolboxTreeContent();
        const separatorIndex = content.findIndex(item => item.kind === 'sep');
        const categories = this._extensions.map(ext => ({
            kind: 'category',
            toolboxitemid: 'ext_' + ext.id,
            name: ext.name,
            style: `ext_${ext.id}_category`,
            cssConfig: { icon: 'icon_blockly fas fa-puzzle-piece' },
            contents: ext.blocks.map(block => this.toToolboxItem(ext, block))
        }));
        content.splice(separatorIndex === -1 ? content.length : separatorIndex, 0, ...categories);
        content.push({
            kind: 'category',
            toolboxitemid: 'block_extensions',
            name: this.t('category'),
            style: 'block_extensions_category',
            cssConfig: { icon: 'icon_blockly fas fa-plus' },
            contents: []
        });
        // The toolbox colours its categories from their theme style, like the Vittascience categories.
        const styles = Object.fromEntries(this._extensions.map(ext => [`ext_${ext.id}_category`, { colour: ext.colour }]));
        styles.block_extensions_category = { colour: '#5b67a5' };
        for (const theme of Object.values(Blockly.Themes)) {
            if (theme.categoryStyles) Object.assign(theme.categoryStyles, styles);
        }
        this._listenCatalogCategory(toolbox._workspace);
        toolbox._updateToolbox();
    },

    /**
     * Open the catalog instead of a flyout when the "Extensions" category is selected (mouse or keyboard).
     * @private
     * @param {Blockly.WorkspaceSvg} workspace
     */
    _listenCatalogCategory(workspace) {
        if (this._listenedWorkspace === workspace) return;
        this._listenedWorkspace = workspace;
        workspace.addChangeListener((event) => {
            if (event.type !== Blockly.Events.TOOLBOX_ITEM_SELECT) return;
            // The event gives the category name (translated), the selected item gives its id.
            const toolbox = workspace.getToolbox();
            const item = toolbox && toolbox.getSelectedItem();
            if (!item || item.getId() !== 'block_extensions') return;
            toolbox.clearSelection();
            this.Panel.open();
        });
    }
};

/**
 * Catalog panel: search the extensions and add them to (or remove them from) the project.
 */
BlockExtensions.Panel = {
    _dialog: null,

    /**
     * Create an element.
     * @param {string} tag
     * @param {Object} [props] properties, "dataset" and "on" (events) included
     * @param {Array<Node|string>} [children]
     * @returns {HTMLElement}
     */
    _el(tag, props = {}, children = []) {
        const element = document.createElement(tag);
        for (const [key, value] of Object.entries(props)) {
            if (key === 'on') {
                for (const [event, handler] of Object.entries(value)) element.addEventListener(event, handler);
            } else if (key === 'dataset') {
                Object.assign(element.dataset, value);
            } else {
                element[key] = value;
            }
        }
        element.append(...children.filter(child => child !== null));
        return element;
    },

    /**
     * Open the catalog.
     */
    open() {
        if (!this._dialog) this._createDialog();
        this._search.value = '';
        this._render();
        this._dialog.showModal();
    },

    /**
     * Create the dialog skeleton.
     * @private
     */
    _createDialog() {
        const t = (key) => BlockExtensions.t(key);
        this._search = this._el('input', {
            type: 'search', className: 'bext-search-input', placeholder: t('search'), ariaLabel: t('search'),
            on: { input: () => this._render() }
        });
        this._grid = this._el('div', { className: 'bext-grid' });
        this._dialog = this._el('dialog', { className: 'bext-dialog', ariaLabel: t('title') }, [
            this._el('header', { className: 'bext-header' }, [
                this._el('h2', { textContent: t('title') }),
                this._el('button', {
                    type: 'button', className: 'bext-close', ariaLabel: t('close'),
                    on: { click: () => this._dialog.close() }
                }, [this._el('i', { className: 'fas fa-times', ariaHidden: 'true' })])
            ]),
            this._el('p', { className: 'bext-note', textContent: t('note') }),
            this._el('label', { className: 'bext-search' }, [this._search, this._el('i', { className: 'fas fa-search', ariaHidden: 'true' })]),
            this._grid
        ]);
        document.body.appendChild(this._dialog);
    },

    /**
     * Render the extensions of the catalog matching the search.
     * @private
     */
    _render() {
        const simplify = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
        const search = simplify(this._search.value.trim());
        const used = new Set(BlockExtensions.getExtensions().map(ext => ext.id));
        const extensions = BlockExtensions.getCatalog().filter(ext => simplify(ext.name + ' ' + ext.description).includes(search));
        const media = `${CDN_PATH}/openInterface/${INTERFACE_NAME}/assets/media/extensions/`;
        this._grid.replaceChildren(...extensions.map(ext => this._el('button', {
            type: 'button', className: 'bext-card', ariaPressed: String(used.has(ext.id)), dataset: { id: ext.id },
            on: { click: () => this._toggle(ext.id) }
        }, [
            this._el('span', { className: 'bext-card-image' }, [
                this._el('img', { src: media + ext.image, alt: '', loading: 'lazy' }),
                ext.logo ? this._el('img', { className: 'bext-card-logo', src: media + ext.logo, alt: '' }) : null,
                used.has(ext.id) ? this._el('span', { className: 'bext-card-badge' }, [
                    this._el('i', { className: 'fas fa-check', ariaHidden: 'true' }), ' ' + BlockExtensions.t('added')
                ]) : null
            ]),
            this._el('strong', { className: 'bext-card-title', textContent: ext.name }),
            this._el('span', { className: 'bext-card-description', textContent: ext.description })
        ])));
        if (!extensions.length) this._grid.append(this._el('p', { className: 'bext-empty', textContent: BlockExtensions.t('noResult') }));
    },

    /**
     * Add an extension to the project, or remove it.
     * @private
     * @param {string} id
     */
    _toggle(id) {
        const used = new Set(BlockExtensions.getExtensions().map(ext => ext.id));
        used.has(id) ? used.delete(id) : used.add(id);
        const extensions = BlockExtensions.getCatalog().filter(ext => used.has(ext.id));
        const removedCount = BlockExtensions.getRemovedBlocks(extensions).length;
        if (removedCount && !confirm(BlockExtensions.t('confirmRemoveUsed', { count: removedCount }))) return;
        BlockExtensions.save(extensions);
        this._render();
    }
};

if (typeof module !== 'undefined') module.exports = BlockExtensions;
