'use strict';

/**
 * @fileoverview Block extensions of the interface (like MakeCode extensions), picked by the user from a static
 * catalog (BLOCK_EXTENSIONS_CATALOG, defined by the interface). The project stores the ids in use.
 *
 * An extension is plain data: the blocks are defined from a declarative description and their Python code comes
 * from templates such as "ring.set({N}, {C})". Texts are either strings or { msg: KEY } objects, translated with
 * Blockly.Msg[KEY]: the messages of an extension are in the Blockly msg files of its interface.
 * {
 *   "id": "ledring",
 *   "name": "LED ring",
 *   "description": { "msg": "EXT_LEDRING_DESCRIPTION" },
 *   "image": "ledring.jpg",                      // in the interface media/extensions folder (or "icon": "fa-plug")
 *   "tags": ["display", "lights"],               // catalog filters, see BlockExtensions.Panel.FILTERS
 *   "blocks": [{
 *     "name": "set_color",                       // the block type is ext_<id>_<name>: never rename it
 *     "kind": "statement",                       // statement | number | text | boolean | any
 *     "text": { "msg": "EXT_LEDRING_BLOCKS_SET_COLOR" },        // "set LED {N} to {C}": {ARG} adds a parameter
 *     "args": [{ "name": "N", "type": "number", "default": "0" },   // number | text | boolean | colour | dropdown
 *              { "name": "C", "type": "dropdown", "options": [["red", "(255, 0, 0)"], "pin0"] }],  // [label, code] or code
 *     "imports": "import ledring",               // one import per line
 *     "code": "ledring.set({N}, {C})"
 *   }]
 * }
 * An extension can also gather blocks already defined by the interface (their generators are kept): "toolbox" lists
 * their types, by groups with an optional label, instead of "blocks". Such an extension is added as soon as one of its
 * blocks is in the workspace (projects created before the blocks were moved to an extension).
 *   "toolbox": [{ "label": "%{BKY_SUBCATEGORY_ZIP_HALO}", "blocks": ["display_controlZipHaloLed"] }],
 *   "style": "display_category",                 // category style of the interface (else "Extensions"), its blocks: "display_blocks"
 *   "svgIcon": "display_kitronik_subcategory"    // TOOLBOXES_SVGS icon of the interface (else a puzzle piece)
 * The extensions tagged "robotics" are in the "Robots" category of the interface (when it has one), with a button
 * opening the catalog on the robots, the others in the "Extensions" category.
 * The project stores the ids in options.extensions as an object { id: true } (a JSON array at this level would
 * break the server-side options sanitizing).
 */
const BlockExtensions = {
    PLACEHOLDER_REGEXP: /\{([A-Za-z_][A-Za-z0-9_]{0,29})\}/g,
    CHECKS: { number: 'Number', text: 'String', boolean: 'Boolean' },
    _extensions: [],
    _loadedKey: null,
    _project: undefined,
    _listenedContainer: null,

    /**
     * Translate a key of code.blockExtensions (texts of the extensions panel, common to the interfaces).
     * @param {string} key
     * @param {Object} [params]
     * @returns {string}
     */
    t(key, params) {
        return typeof i18next !== 'undefined' ? i18next.t('code.blockExtensions.' + key, params) : key;
    },

    /**
     * Replace the { msg: KEY } texts of a value by their translation in the current language (Blockly.Msg).
     * @param {*} value
     * @returns {*}
     */
    localize(value) {
        if (Array.isArray(value)) return value.map(item => this.localize(item));
        if (!value || typeof value !== 'object') return value;
        if (typeof value.msg === 'string') return Blockly.Msg[value.msg] ?? value.msg;
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.localize(item)]));
    },

    /**
     * Get the extensions of the catalog, in the current language.
     * @returns {Array<Object>}
     */
    getCatalog() {
        return typeof BLOCK_EXTENSIONS_CATALOG !== 'undefined'
            ? this.localize(BLOCK_EXTENSIONS_CATALOG).map(ext => ({ blocks: [], toolbox: [], ...ext })) : [];
    },

    /**
     * Get the block types of an extension: its own blocks, then the interface blocks of its toolbox.
     * @param {Object} ext
     * @returns {Array<string>}
     */
    getBlockTypes(ext) {
        return [...ext.blocks.map(block => this.getBlockType(ext, block)),
            ...ext.toolbox.flatMap(group => group.blocks.map(type => type.split('-')[0]))];
    },

    /**
     * Whether an extension is in the "Robots" category.
     * @param {Object} ext
     * @returns {boolean}
     */
    isRobot(ext) {
        return (ext.tags || []).includes('robotics');
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
        // Colour of the category: "Robots" for the robots, else "Extensions" (block styles of the theme)
        const style = ext.style ? ext.style.replace(/_category$/, '_blocks') : 'block_extensions_blocks';
        const json = { type: this.getBlockType(ext, block), message0, args0, style, inputsInline: true, tooltip: ext.name };
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
        const EMPTY_VALUES = { number: '0', text: "''", boolean: 'False', colour: '(0, 0, 0)' };
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
            case 'colour': // the colour picker generates an (r, g, b) tuple, its input accepts any block
                return { type: 'colour_picker', fields: { COLOUR: arg.default || '#ff0000' } };
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
        let option;
        if (currentProject) {
            if (currentProject === this._project) return;
            this._project = currentProject;
            option = currentProject.options && currentProject.options.extensions;
        } else if (this._project === undefined) {
            this._project = null;
            const localProject = CodeManager.getSharedInstance().localStorageManager.getLocalProjectContent();
            option = localProject && localProject.options && localProject.options.extensions;
        } else {
            return;
        }
        this.load(this.fromOption({ ...option, ...this._takeUrlExtensions() }));
    },

    /**
     * Get once the extensions of the URL parameter ?extension=id1,id2 (links of the programming page, e.g. TPBot robot),
     * added to the first project loaded.
     * @private
     * @returns {Object} ids as { id: true }
     */
    _takeUrlExtensions() {
        // ?drone=Tello: old links of the programming page, the Tello blocks are in the "tello" extension now.
        const drone = $_GET('drone');
        const param = this._urlExtensionsTaken ? null : [$_GET('extension'), drone && drone.toLowerCase()].filter(Boolean).join(',');
        this._urlExtensionsTaken = true;
        return param ? Object.fromEntries(param.split(',').map(id => [id, true])) : {};
    },

    /**
     * Whether the extensions of the current project have been loaded (they can be written in its options).
     * @returns {boolean}
     */
    isSynced() {
        return this._project !== undefined;
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
        const kept = new Set(extensions.flatMap(ext => this.getBlockTypes(ext)));
        const used = new Set(this._extensions.flatMap(ext => this.getBlockTypes(ext)));
        return Main.getWorkSpace().getAllBlocks(false).filter(block => used.has(block.type) && !kept.has(block.type));
    },

    /**
     * Add the catalog extensions of the interface blocks in the workspace (a project, pasted blocks, blocks converted
     * from Python...) or in a toolbox restriction: those blocks were in the toolbox categories before.
     */
    addUsedExtensions() {
        const workspace = typeof Main !== 'undefined' && Main.getWorkSpace && Main.getWorkSpace();
        const toolbox = typeof Main !== 'undefined' && Main.getToolboxManager && Main.getToolboxManager();
        const restriction = toolbox && Array.isArray(toolbox._reducedToolboxBlocks) ? toolbox._reducedToolboxBlocks : [];
        const types = new Set(restriction.map(type => type.split('-')[0]));
        if (workspace) workspace.getAllBlocks(false).forEach(block => types.add(block.type));
        const used = new Set(this._extensions.map(ext => ext.id));
        const catalog = this.getCatalog();
        const added = catalog.filter(ext => !used.has(ext.id) && ext.toolbox.some(group => group.blocks.some(type => types.has(type.split('-')[0]))));
        if (added.length) this.load(catalog.filter(ext => used.has(ext.id) || added.includes(ext)));
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
     * Get the extensions of the catalog matching a search, not in use yet.
     * @param {string} keyword
     * @returns {Array<Object>}
     */
    getSuggestions(keyword) {
        if (!keyword.trim()) return [];
        const used = new Set(this._extensions.map(ext => ext.id));
        return this.getCatalog().filter(ext => !used.has(ext.id) && ToolboxManager.isMatchingText([ext.name, ext.description,
            ...ext.blocks.map(block => block.text.replace(this.PLACEHOLDER_REGEXP, '')),
            ...ext.toolbox.flatMap(group => group.blocks.map(type => ToolboxManager.getSearchText(type)))].join(' '), keyword));
    },

    /**
     * Add an extension of the catalog to the project.
     * @param {string} id
     */
    add(id) {
        this.save(this.getCatalog().filter(ext => ext.id === id || this._extensions.some(used => used.id === ext.id)));
    },

    /**
     * Remove an extension from the project, after confirmation when its blocks are in the workspace.
     * @param {string} id
     */
    remove(id) {
        const extensions = this._extensions.filter(ext => ext.id !== id);
        const count = this.getRemovedBlocks(extensions).length;
        if (count && !confirm(this.t('confirmRemoveUsed', { count }))) return;
        this.save(extensions);
    },

    /**
     * Add a remove button to the toolbox row of each extension in use (called after each toolbox render).
     * The Delete key on the focused row does the same (BlockExtensions._listenManageCategory).
     * @param {Blockly.WorkspaceSvg} workspace
     */
    /**
     * Whether the toolbox is restricted to some blocks (by the teacher, ToolboxManager.restrictTo).
     * @param {ToolboxManager} toolbox
     * @returns {boolean}
     */
    isRestricted(toolbox) {
        return !!toolbox && Array.isArray(toolbox._reducedToolboxBlocks) && toolbox._reducedToolboxBlocks.length > 0;
    },

    addRemoveButtons(workspace) {
        // Toolbox restricted by the teacher: the extensions can't be removed (nor managed, see pushToolbox)
        if (this.isRestricted(typeof Main !== 'undefined' && Main.getToolboxManager && Main.getToolboxManager())) return;
        for (const ext of this._extensions) {
            const row = workspace.getInjectionDiv().querySelector(`[id="ext_${ext.id}"] .blocklyToolboxCategory, .blocklyToolboxCategory[id="ext_${ext.id}"]`);
            if (!row || row.querySelector('.bext-remove')) continue;
            // a span, not a button: the row is a treeitem, whose content is not focusable
            const cross = Object.assign(document.createElement('span'), {
                className: 'bext-remove fas fa-times', title: this.t('remove', { name: ext.name }), ariaHidden: 'true'
            });
            cross.dataset.id = ext.id;
            (row.querySelector('.blocklyTreeRowContentContainer') || row).append(cross);
        }
    },

    /**
     * Add the "Extensions" category just before the toolbox separator (at the end without separator). Its first
     * sub-category opens the catalog, then comes a sub-category per extension in use. The robots are in the "Robots"
     * category of the interface instead, after its "Manage robots" sub-category (called each time the toolbox is built).
     * @param {ToolboxManager} toolbox
     */
    pushToolbox(toolbox) {
        const content = toolbox._getToolboxTreeContent();
        // During a search: the matching blocks, and the extensions of the catalog to add.
        const keyword = toolbox.keyword || '';
        const searching = keyword.trim() !== '';
        const extensions = this._extensions.map((ext) => {
            const blocks = ext.blocks.filter(block => ToolboxManager.isMatchingBlock(this.getBlockType(ext, block), keyword, ext.name));
            const groups = ext.toolbox.map(group => ({
                label: group.label,
                blocks: group.blocks.filter(type => ToolboxManager.isMatchingBlock(type, keyword, ext.name + ' ' + (group.label || '')))
            })).filter(group => group.blocks.length);
            // An extension added from a search can match by its description only.
            return blocks.length || groups.length || !ToolboxManager.isMatchingText(ext.description, keyword)
                ? { ext, blocks, groups } : { ext, blocks: ext.blocks, groups: ext.toolbox };
        }).filter(({ blocks, groups }) => !searching || blocks.length || groups.length);
        // Toolbox restricted by the teacher (ToolboxManager.restrictTo): no "Manage" entry nor extension to add
        const restricted = this.isRestricted(toolbox);
        const suggestions = restricted ? [] : this.getSuggestions(keyword);
        const robotsCategory = this.getCatalog().some(ext => this.isRobot(ext))
            && (toolbox.getToolboxBase().categories || []).find(item => item.toolboxitemid === 'robots');
        const isInRobots = ext => robotsCategory && this.isRobot(ext);
        const subCategory = (toolboxitemid, name, icon, style = 'block_extensions_category') => ({
            kind: 'category', toolboxitemid, name, style, cssConfig: { icon: 'icon_blockly fas ' + icon }, contents: []
        });
        const toSubCategory = ({ ext, blocks }) => {
            const item = subCategory('ext_' + ext.id, ext.name, 'fa-puzzle-piece', ext.style || 'block_extensions_category');
            // "svgIcon": icon of the interface (TOOLBOXES_SVGS key), injected by the toolbox from the sub-category id
            if (ext.svgIcon && typeof TOOLBOXES_SVGS !== 'undefined' && TOOLBOXES_SVGS[ext.svgIcon]) {
                TOOLBOXES_SVGS[`ext_${ext.id}_subcategory`] = TOOLBOXES_SVGS[ext.svgIcon];
                item.cssConfig.icon = 'icon_blockly svgIcon';
            }
            item.contents = blocks.map(block => this.toToolboxItem(ext, block));
            return item;
        };
        const category = {
            ...subCategory('block_extensions', this.t('category'), 'fa-puzzle-piece'),
            contents: [...(searching || restricted ? [] : [subCategory('block_extensions_manage', this.t('manage'), 'fa-plus')]),
                ...extensions.filter(({ ext }) => !isInRobots(ext)).map(toSubCategory),
                ...suggestions.map(ext => subCategory('block_extensions_add_' + ext.id, ext.name, 'fa-plus'))]
        };
        // Show the extensions in use right away.
        if (extensions.length || suggestions.length) category.expanded = 'true';
        const separatorIndex = content.findIndex(item => item.kind === 'sep');
        if (category.contents.length) content.splice(separatorIndex === -1 ? content.length : separatorIndex, 0, category);
        if (robotsCategory) this._pushRobots(toolbox, robotsCategory, extensions.filter(({ ext }) => isInRobots(ext)).map(toSubCategory), searching || restricted);
        // The blocks of the interface are added like those of its categories (shadows of the blockDB, board restrictions).
        for (const { ext, groups } of extensions) {
            for (const group of groups) {
                if (group.label) toolbox._addLabel('ext_' + ext.id, Blockly.utils.parsing.replaceMessageReferences(group.label));
                group.blocks.forEach(type => toolbox._addBlock('ext_' + ext.id, type));
            }
        }
        this._listenManageCategory(toolbox._workspace);
    },

    /**
     * Add the robots in use to the "Robots" category, after its "Manage robots" sub-category. The category is placed
     * as in the interface categories when it has no block of its own.
     * @private
     * @param {ToolboxManager} toolbox
     * @param {Object} definition category of the interface
     * @param {Array<Object>} robots sub-categories
     * @param {boolean} noManage searching, or toolbox restricted: no "Manage robots" (nor category without robot)
     */
    _pushRobots(toolbox, definition, robots, noManage) {
        const content = toolbox._getToolboxTreeContent();
        let category = content.find(item => item.toolboxitemid === 'robots');
        if (!category) {
            if (noManage && !robots.length) return;
            category = { ...definition, contents: [] };
            const order = toolbox.getToolboxBase().categories.map(item => item.toolboxitemid);
            const before = order.slice(0, order.indexOf('robots'));
            // after the categories before it in the interface, else after the search row
            const index = content.reduce((last, item, i) => before.includes(item.toolboxitemid) ? i : last,
                content.findIndex(item => item.toolboxitemid === 'search'));
            content.splice(index + 1, 0, category);
        }
        const manage = {
            kind: 'category', toolboxitemid: 'block_extensions_manage_robots', name: this.t('manageRobots'),
            style: definition.style, cssConfig: { icon: 'icon_blockly fas fa-plus' }, contents: []
        };
        category.contents.unshift(...(noManage ? [] : [manage]), ...robots);
        if (robots.length) category.expanded = 'true';
    },

    /**
     * Open the catalog when the "Manage extensions" sub-category is clicked (or activated with the keyboard).
     * The DOM event is listened instead of the toolbox selection: Blockly selects the last focused category again
     * when the toolbox gets the focus back, which would open the catalog again after each close.
     * @private
     * @param {Blockly.WorkspaceSvg} workspace
     */
    _listenManageCategory(workspace) {
        const container = workspace.getInjectionDiv();
        if (this._listenedContainer === container) return;
        this._listenedContainer = container;
        const open = (event) => {
            const remove = event.target.closest && event.target.closest('.bext-remove');
            if (remove) {
                event.stopPropagation();
                this.remove(remove.dataset.id);
                return;
            }
            const item = event.target.closest && event.target.closest('[id^="block_extensions_manage"], [id^="block_extensions_add_"]');
            if (!item) return;
            // After Blockly has handled the click (selection of the empty category).
            setTimeout(() => {
                const toolbox = workspace.getToolbox();
                if (toolbox) toolbox.clearSelection();
                if (item.id === 'block_extensions_manage') this.Panel.open();
                else if (item.id === 'block_extensions_manage_robots') this.Panel.open('robotics');
                else this.add(item.id.replace('block_extensions_add_', ''));
            });
        };
        // capture: before Blockly selects the category under the cross
        container.addEventListener('click', open, true);
        container.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') open(event);
            const row = (event.key === 'Delete' || event.key === 'Backspace') && event.target.closest && event.target.closest('[id^="ext_"]');
            if (row && this._extensions.some(ext => 'ext_' + ext.id === row.id)) {
                event.preventDefault();
                this.remove(row.id.slice(4));
            }
        });
        // Blocks of an extension not in use yet: pasted, converted from Python...
        workspace.addChangeListener((event) => {
            if (event.type === Blockly.Events.BLOCK_CREATE) this.addUsedExtensions();
        });
    }
};

/**
 * Catalog panel: search the extensions and add them to (or remove them from) the project.
 */
BlockExtensions.Panel = {
    // Filters shown when an extension of the catalog has the tag (label: code.blockExtensions.filters.<tag>).
    FILTERS: ['model', 'robotics', 'display', 'lights', 'sensors', 'actuators', 'ai', 'games', 'communication'],
    _dialog: null,
    _filter: 'all',

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
     * @param {string} [filter] tag of the extensions shown
     */
    open(filter = 'all') {
        if (!this._dialog) this._createDialog();
        this._search.value = '';
        this._filter = filter;
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
        this._filters = this._el('div', { className: 'bext-filters', role: 'group', ariaLabel: t('filter') });
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
            this._filters,
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
        const catalog = BlockExtensions.getCatalog();
        const tags = ['all', ...this.FILTERS.filter(tag => catalog.some(ext => (ext.tags || []).includes(tag)))];
        this._filters.replaceChildren(...tags.map(tag => this._el('button', {
            type: 'button', className: 'bext-filter', ariaPressed: String(tag === this._filter), dataset: { tag },
            textContent: BlockExtensions.t('filters.' + tag),
            on: { click: () => { this._filter = tag; this._render(); } }
        })));
        const extensions = catalog.filter(ext => (this._filter === 'all' || (ext.tags || []).includes(this._filter))
            && simplify(ext.name + ' ' + ext.description).includes(search));
        const media = `${_PATH}/${INTERFACE_NAME}/assets/media/extensions/`;
        this._grid.replaceChildren(...extensions.map(ext => this._el('button', {
            type: 'button', className: 'bext-card', ariaPressed: String(used.has(ext.id)), dataset: { id: ext.id },
            on: { click: () => this._toggle(ext.id) }
        }, [
            this._el('span', { className: 'bext-card-image' }, [
                // without picture (generic modules such as UART): the icon of the extension
                ext.image ? this._el('img', { src: media + ext.image, alt: '', loading: 'lazy' })
                    : this._el('i', { className: 'bext-card-icon fas ' + (ext.icon || 'fa-puzzle-piece'), ariaHidden: 'true' }),
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
        BlockExtensions.getExtensions().some(ext => ext.id === id) ? BlockExtensions.remove(id) : BlockExtensions.add(id);
        this._render();
    }
};

if (typeof module !== 'undefined') module.exports = BlockExtensions;
