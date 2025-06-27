'use strict';

/**
 * Workspace ToolboxManager: ToolboxManager
 * Copyright 2021 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide a blockly toolbox creator.
 */

/** 
 * @fileoverview WorkSpace ToolboxManager 
 * @author: leomlr (Léo Meillier)
 */

/***
 * Let see default category definition by Blockly.
 * {
 *   "kind": "category",
 *   "id": "default",
 *   "name": "A category",
 *   "custom": null,
 *   "catagoryStyle": null,
 *   "cssConfig": {
 *       "icon": "icon_blockly [icon]",
 *   },
 *   "contents": []
 * }
 */

/**
 * @class ToolboxManager
 */
class ToolboxManager {
    /**
     * Creates an instance of ToolboxManager.
     * @private
     * @param {Blockly.Workspace} workspace
     * @param {Object} options
     */
    constructor(workspace, options) {
        this._workspace = workspace;
        this._level = "2";
        this._CAT_TOOLBOX = {
            "kind": "categoryToolbox",
            "id": "toolbox",
            "style": null,
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
        this._FLYOUT_TOOLBOX = {
            "kind": "flyoutToolbox",
            "id": "toolbox",
            "contents": []
        };
        this._CREATE_VAR_BTN = {
            "kind": "button",
            "text": "Create variable...",
            "callbackKey": "createVariableButtonHandler"
        };
        this._options = {
            mode: TOOLBOX_STYLE_DEFAULT,
            theme: Blockly.Themes.ClassicBase,
            toolboxes: JSON.parse(JSON.stringify(TOOLBOXES))
        }
        if (options) {
            for (var key in options) {
                if (typeof options[key] !== 'undefined') {
                    this._options[key] = options[key];
                }
            }
        }
        this._mode = this._options.mode;
        this._theme = this._options.theme;
        const data = this.getToolboxBase(this._options.mode);
        this._hasCategories = (data && data.categories) ? true : false;
        this._flyoutVariables = (data && data.variable && !this._hasCategories) ? data.variable : null;
        this._toolboxTree = this._hasCategories ? this._CAT_TOOLBOX : this._FLYOUT_TOOLBOX;
        this._reducedToolboxBlocks = this._options.reducedToolboxBlocks ? this._options.reducedToolboxBlocks : null;
        this._variableNames = this._options.variableNames ? this._options.variableNames : null;
        this.keyword = "";
        this._variantBlockTypes = [
            {
                type: 'controls_if', default: '', getVariant: function (block) {
                    return 'controls_if' + (block.inputList.map(input => input.name).includes('ELSE') ? '-else' : '');
                }
            }, {
                type: 'logic_operation', default: 'and', getVariant: function (blockSVG) {
                    const op = blockSVG.getField('OP').value_.toLowerCase();
                    return this.type + '-' + (Main.getToolboxManager().isVariantInToolbox(blockSVG) ? op : this.default);
                }
            }, {
                type: 'logic_compare', default: 'eq', getVariant: function (blockSVG) {
                    const op = blockSVG.getField('OP').value_.toLowerCase();
                    return this.type + '-' + (Main.getToolboxManager().isVariantInToolbox(blockSVG) ? op : this.default);
                }
            },
            {
                type: 'math_arithmetic', default: 'add', getVariant: function (blockSVG) {
                    const op = blockSVG.getField('OP').value_.toLowerCase();
                    return this.type + '-' + (Main.getToolboxManager().isVariantInToolbox(blockSVG) ? op : this.default);
                }
            },
        ];
        return this;
    };
    static DISABLE_BLOCK_HELPURL_EXTENSION = false;
    static DISABLE_BLOCK_COLOR_EXTENSION = false;
    static DISABLE_DISABLING_DUPLICATES_EXTENSION = false;
    /**
     * Init toolbox on workspace.
     * @public
     */
    setToolbox() {
        if (this._hasCategories) {
            this._setToolboxTree();
            this._updateToolbox();
            this.setBlocklyTheme();
            this._setToolboxMenuStyle();
            this._setToolboxHeader();
        } else {
            this._setToolboxTree();
            this._updateToolbox();
            this.setBlocklyTheme();
        }
        Blockly.svgResize(this._workspace);
        if (Main.getInterface() == 'TI-83') {
            if (this._getMode() == TOOLBOX_STYLE_TI_CODE) {
                this._setBlockStyleForTiCode(true);
            } else {
                this._setBlockStyleForTiCode(false);
            }
        }
        setTimeout(() => {
            this._addVariables();
        }, 500);

    };
    /**
     * Set mode of toolbox.
     * @public
     * @param {String} mode
     */
    setMode(mode) {
        this._mode = mode;
    };
    /**
     * Restrict toolbox only with some block types.
     * @public
     * @param {Array<String>} blockTypes
     */
    restrictTo(blockTypes) {
        this._reducedToolboxBlocks = blockTypes;
        this.setToolbox();
    };
    /**
     * Reset restriction of toolbox.
     * @public
     */
    resetRestriction() {
        this._reducedToolboxBlocks = null;
        this.setToolbox();
    };
    /**
     * Setup specific variables in toolbox.
     * @public
     * @param {Array<String>} variableNames
     */
    setWorkspaceVariables(variableNames) {
        this._variableNames = variableNames;
        this.setToolbox();
    };
    /**
     * Get mode of toolbox.
     * @private
     * @return {String} mode
     */
    _getMode() {
        return this._mode;
    };
    /**
     * Set level of toolbox.
     * @private
     * @param {String} level
     */
    _setLevel(level) {
        this._level = level;
    };
    /**
     * Get level of toolbox.
     * @private
     * @return {String} mode
     */
    _getLevel() {
        return this._level;
    };
    /**
     * Update toolbox on workspace.
     * @param {Object} tree
     * @private
     */
    _updateToolbox(tree) {
        if (tree === undefined) {
            tree = Object.assign({}, this._getToolboxTree());
        }
        this._workspace.updateToolbox(tree);
    };
    /**
     * Get defined toolbox.
     * @private
     * @return {Object} toolbox
     */
    _getToolbox() {
        return this._workspace.getToolbox();
    };
    /**
     * Get defined toolbox tree.
     * @return {Object} tree
     */
    _getToolboxTree() {
        return this._toolboxTree;
    };
    /**
     * Get defined toolbox tree.
     * @private
     * @return {Array<Object>} tree.contents
     */
    _getToolboxTreeContent() {
        return this._getToolboxTree().contents;
    };
    /**
     * Get category by Id.
     * @private
     * @param {String} categoryId
     * @return {Blockly.ToolboxCategory} category
     */
    _getCategory(categoryId) {
        return this._getToolbox().getToolboxItemById(categoryId);
    };
    /**
     * Get content of category.
     * @private
     * @param {String} categoryId
     * @return {Array<Object>} mode
     */
    _getCategoryContent(categoryId) {
        return this._getCategory(categoryId).toolboxItemDef_.contents;
    };
    /**
     * Get toolbox constants data by mode.
     * @public
     * @param {String} mode
     * @return {Object} toolboxData
     */
    getToolboxBase(mode) {
        if (mode === undefined) {
            mode = this._getMode();
        }
        return Object.assign({}, this._options.toolboxes.find(obj => obj.id === mode));
    };
    /**
     * Get list of block types defined to restrict the toolbox.
     * @public
     * @returns {Array<string>} reducedToolboxBlocks
     */
    getToolboxRestricted() {
        return this._reducedToolboxBlocks;
    };
    /**
     * Set toolbox of workspace blockly.
     * @private
     */
    _setToolboxTree() {
        this._emptyToolboxTree();
        if (this._hasCategories) {
            this._toolboxTree.kind = "";
            const categories = this.getToolboxBase().categories;
            const subcategories = this.getToolboxBase().subcategories;
            const baseContents = this._getLevel() === "1" ? this.getToolboxBase()['content-simple'] : this.getToolboxBase()['content'];
            if (categories !== null) {
                for (var i = 0; i < categories.length; i++) {
                    const catContent = baseContents ? baseContents[categories[i].toolboxitemid] : null;
                    const subCatContent = subcategories ? subcategories[categories[i].toolboxitemid] : null;
                    this._pushCategoryContent(categories[i], catContent, subCatContent);
                }
            }
        } else {
            this._pushFlyout(ToolboxManager.DB_.get());
            this.pushVariable('variable', true);
        }

    };
    /**
     * Empty toolbox of workspace blockly.
     * @private
     */
    _emptyToolboxTree() {
        let len = this._getToolboxTreeContent().length;
        const toolboxContents = this._getToolboxTreeContent();
        for (var i = 0; i < len; i++) {
            const empty = function (item) {
                if (item.contents && item.contents.length > 0) {
                    for (var j = 0; j < item.contents.length; j++) {
                        if (item.contents[j].kind === "category") {
                            empty(item.contents[j]);
                        }
                    }
                    item.contents.length = 0;
                }
            }
            empty(toolboxContents[i]);
        }

        if (toolboxContents[0] && toolboxContents[0].toolboxitemid == 'search') {
            len = len - 1;
        }
        for (var i = 0; i < len; i++) {
            toolboxContents.pop();
        }
        this._updateToolbox();
    };
    /**
     * Push a flyout tree with blocks and update.
     * @private
     * @param {Object} category
     */
    _pushFlyout(blocks) {
        blocks.forEach(e => this._getToolboxTreeContent().push(e));
        this._updateToolbox();
    };
    /**
     * Push variable to flyout.
     * @public
     */
    pushVariable(name, button) {
        if (this._flyoutVariables) {
            const blocks = this._flyoutVariables(name ? name : 'variable');
            if (button) {
                this._getToolboxTreeContent().push(this._CREATE_VAR_BTN);
            }
            blocks.forEach(e => this._getToolboxTreeContent().push(e));
            this._updateToolbox();
        }
    };
    /**
     * Push a category in toolbox and update.
     * @private
     * @param {Object} category
     */
    _pushCategory(category) {
        this._getToolboxTreeContent().push(category);
        this._updateToolbox();
    };
    /**
     * Push a sub category in category of toolbox and update.
     * @private
     * @param {Object} category
     */
    _pushSubCategory(categoryId, subCategory) {
        this._getToolboxTreeContent().filter(cat => cat.toolboxitemid === categoryId)[0].contents.push(subCategory);
        this._updateToolbox();
    };
    /**
     * Push content of a category in toolbox.
     * @private
     * @param {Object} category
     * @param {Array<Object> | string} catContent
     * @param {Array<Object>} subCatContent
     */
    _pushCategoryContent(category, catContent, subCatContent) {
        if (category.kind === "sep") {
            this._pushCategory(category);
        } else if (catContent) {
            if (Object.keys(catContent).includes('0') || Object.keys(catContent).includes('1')) {
                this._pushContent(category, catContent, subCatContent);
            } else {
                this._pushCategory(category);
                const pushTest = (category) => {
                    for (var i = 0; i < category.contents.length; i++) {
                        const subCat = category.contents[i];
                        if (Array.isArray(subCat.contents)) {
                            for (const sub of subCat.contents) {
                                if (sub.kind === "category") {
                                    pushTest(sub);
                                }
                            }
                        }
                        const pushElements = (item, id) => {
                            const hasLabel = item.label !== null && item.label !== undefined;
                            let label = "";
                            for (var k = 0; k < item.blocks.length; k++) {
                                if (hasLabel && item.label !== label) {
                                    label = item.label;
                                    this._addLabel(id, item.label);
                                }
                                this._addBlock(id, item.blocks[k]);
                            }
                        };
                        const subCategoryId = category.contents[i].toolboxitemid;
                        const subCategoryContent = catContent[subCategoryId];
                        if (subCategoryContent) {
                            for (var j = 0; j < subCategoryContent.length; j++) {
                                pushElements(subCategoryContent[j], subCategoryId);
                            }
                            if (!Array.isArray(subCategoryContent) && Object.keys(subCategoryContent).length > 0) {
                                for (const sub in subCategoryContent) {
                                    if (subCategoryContent[sub].length > 0) {
                                        for (var k = 0; k < subCategoryContent[sub].length; k++) {
                                            pushElements(subCategoryContent[sub][k], sub);
                                        }
                                    }
                                }
                            }
                        }
                    };
                };
                pushTest(category);
            }
        } else {
            this._pushCategory(category);
        }
    };
    /**
     * Push content of a category in toolbox.
     * @private
     * @param {Object} category
     * @param {Array<Object> | string} content
     * @param {Array<Object>} subCatContent
     */
    _pushContent(category, content, subCatContent) {
        let categoryId = category.toolboxitemid;
        if (content == "customized") {
            if (this._reducedToolboxBlocks && this._reducedToolboxBlocks.length) {
                const pushIfPresence = (cat) => {
                    const types = Object.keys(Blockly.Blocks).filter(type => type.includes(cat));
                    if (this._reducedToolboxBlocks.some(type => types.includes(type))) {
                        this._pushCategory(category);
                    }
                };
                if (category.custom === "VARIABLE") {
                    pushIfPresence('variables_');
                } else if (category.custom === "PROCEDURE") {
                    pushIfPresence('procedures_');
                }
            } else {
                this._pushCategory(category);
            }
        } else if (content.length > 0) {
            let categoryAdded = false;
            const pushElements = (cnt, id) => {
                let subCategoryAdded = false;
                for (var j = 0; j < cnt.length; j++) {
                    if (cnt[j] && cnt[j].blocks && cnt[j].blocks.length > 0) {
                        if (id && subCatContent) {
                            categoryId = id;
                        }
                        let labelAdded = false;
                        for (var blockIndex = 0; blockIndex < cnt[j].blocks.length; blockIndex++) {
                            const hasLabel = cnt[j].label !== null && cnt[j].label !== undefined;
                            const catLabel = this._getCategoryLabels(hasLabel, categoryId, cnt[j].label);
                            const blockType = cnt[j].blocks[blockIndex];
                            const isMatching = ToolboxManager.isMatchingBlock(blockType, this.keyword, catLabel);
                            const blockInRestriction = this._reducedToolboxBlocks && this._reducedToolboxBlocks.includes(blockType);
                            if ((this.keyword == "" || isMatching) && (!this._reducedToolboxBlocks || blockInRestriction)) {
                                if (!categoryAdded) {
                                    this._pushCategory(category);
                                    categoryAdded = true;
                                }
                                if (!subCategoryAdded && id && subCatContent) {
                                    const subCat = subCatContent.filter(item => item.toolboxitemid == id)[0];
                                    this._pushSubCategory(category.toolboxitemid, subCat);
                                    subCategoryAdded = true;
                                }
                                if (hasLabel && !labelAdded) {
                                    this._addLabel(categoryId, cnt[j].label);
                                    labelAdded = true;
                                }
                                this._addBlock(categoryId, blockType);
                            }
                        }
                    } else if (cnt[j] && cnt[j].contents) {
                        pushElements(cnt[j].contents, cnt[j].subCategoryId);
                    } else if (cnt[j] && cnt[j].message) {
                        if (!categoryAdded) {
                            this._pushCategory(category)
                            categoryAdded = true;
                        }
                        this._addLabel(categoryId, cnt[j].label);
                    }
                }
            }
            pushElements(content);
        }
    };
    /**
     * Get defined xml by block type.
     * @static
     * @param {string} blockType 
     * @returns {string} xml
     */
    static getXmlByBlockType(blockType) {
        const content = ToolboxManager.DB_?.get()[blockType];
        blockType = blockType.split('-')[0];
        if (Blockly.Blocks[blockType]) {
            return '<block type="' + blockType + '">' + (content ? content : '') + '</block>';
        } else {
            console.error("[ToolboxManager] Block with type '" + blockType + "' is not defined.")
        }
    };
    /**
     * Add block in toolbox by category id.
     * @private
     * @param {String} categoryId
     * @param {String} blockType
     */
    _addBlock(categoryId, blockType) {
        let xml = ToolboxManager.getXmlByBlockType(blockType);
        if (xml) {
            if (Blockly.MESSAGES !== undefined) {
                xml = xml.replace(/(^|[^%]){(\w+)}/g, (m, p1, p2) => p1 + Blockly.MESSAGES[p2]);
            }
            try {
                Blockly.Xml.textToDom(xml);
                const block = {
                    "kind": "block",
                    "blockxml": xml
                }
                if (INTERFACE_NAME == 'TI-83' && this._mode === TOOLBOX_STYLE_TI_CODE) {
                    block['gap'] = '16';
                }
                this._getCategoryContent(categoryId).push(block);
            } catch (e) {
                console.error(e)
            }
        }
    };
    /**
     * Add label in toolbox by category id.
     * @private
     * @param {String} categoryId
     * @param {String} label
     */
    _addLabel(categoryId, label) {
        this._getCategoryContent(categoryId).push({
            "kind": "label",
            "text": label,
            "web-class": "myLabelStyle"
        });
    };
    /**
     * Update specific variables in toolbox.
     * @private
     */
    _addVariables() {
        if (this._variableNames) {
            for (var i of this._variableNames) {
                this._workspace.createVariable(i);
            }
        }
    };
    /**
     * Change theme of workspace blockly by user local storage.
     * @public
     * @param {Blockly.Theme} theme
     */
    setBlocklyTheme() {
        const themeLabel = localStorage.getItem('theme') || "light";
        const font = localStorage.getItem('font') || "basic";
        this._theme = Blockly.Themes[THEMES[themeLabel][font]] || Blockly.Themes.ClassicBase;
        this._workspace.setTheme(this._theme);
    };
    /**
     * Set border-left color, tree icon html, tree icon color and tree label color.
     * @private
     */
    _setToolboxMenuStyle() {
        const rows = document.getElementsByClassName('blocklyTreeRow');
        const toolboxCat = this._getToolboxTree().contents;
        let i = 0;
        const setStyle = (categories, subcat = false) => {
            for (var cat in categories) {
                if (categories[cat].kind == "category") {
                    const catStyle = categories[cat].style;
                    if (catStyle) {
                        let colour = "#000";
                        if (this._theme.categoryStyles[catStyle]) {
                            colour = this._theme.categoryStyles[catStyle].colour;
                        }
                        if (catStyle !== "search_category") {
                            const blocklyRow = document.getElementById(categories[cat].toolboxitemid);
                            const blocklyInput = document.getElementById(categories[cat].toolboxitemid + ".label");
                            if (rows[i] && !subcat) {
                                blocklyRow.style.cssText = "padding-inline-start: 0px; font-family:var(--text-1); border-inline-start: 8px solid; text-align: start;";
                            }
                            blocklyRow.style.color = colour;
                            blocklyInput.style.color = colour;
                        }
                        ToolboxManager._injectSVGIcons(catStyle, colour);
                    }
                    if (!subcat) {
                        i++;
                    }
                    setStyle(categories[cat].contents, true);
                }
            }
        };
        setStyle(toolboxCat);
    };
    /**
     * Control block style without color in texas-instruments-code toolbox mode. (TI-83)
     * @private
     * @param {Boolean} enable
     */
    _setBlockStyleForTiCode(enable) {
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if (enable) {
            toolboxDiv.addEventListener('click', ToolboxManager._updateToolboxSizeEvent);
            const checkStyle = document.getElementById('blocklyStyleTiCode');
            if (checkStyle) checkStyle.remove();
            const style = document.createElement('style');
            style.innerHTML = `
                .blocklyPath {
                    fill: white !important;
                    stroke: var(--text-0) !important;
                    stroke-width: 2 !important;
                } 
                .blocklyText{
                    fill: #000000 !important;
                }
                .blocklyPath[filter^="url(#blocklySelectedGlowFilter"] {
                    fill: transparent !important;
                    filter: none;
                    stroke: yellow;
                }`;
            style.id = 'blocklyStyleTiCode';
            document.head.appendChild(style);
        } else {
            toolboxDiv.removeEventListener('click', ToolboxManager._updateToolboxSizeEvent);
            const style = document.getElementById('blocklyStyleTiCode');
            if (style) style.remove();
        }
    };
    /**
     * Animation to update editor size in case of subcategories (TI-83)
     * @private
     * @static
     */
    static _updateToolboxSizeEvent() {
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if ($_GET('simu') == 1) {
            $('#generator').animate({
                width: $(window).width() - toolboxDiv.offsetWidth - 500,
            }, '100');
        } else {
            $('#generator').animate({
                width: $(window).width() - toolboxDiv.offsetWidth,
            }, '100');
        }
    };
    /**
     * Inject SVG icons in the toolbox for a specific category.
     * @private
     * @static
     * @param {String} catStyle
     * @param {String} colour
     * */
    static _injectSVGIcons(catStyle) {
        const inject = (id) => $(id + " .svgIcon").html(TOOLBOXES_SVGS[catStyle]);
        switch (catStyle) {
            case "procedure_category":
                inject("#procedures");
                break;
            default:
                inject("#" + catStyle.split('_')[0]);
                break;
        }
    };
    /**
     * Set toolbox header by adding search input and toolbox level.
     * @private
     * @return {void}
     */
    _setToolboxHeader() {
        const searchInputId = "search-block-input";
        const searchAttributes = {
            "id": searchInputId,
            "type": "text",
            "placeholder": Blockly.MESSAGES.search,
            "class": "blocklyTreeSearch",
            "maxlength": "30",
            "size": "10",
            "value": this.keyword
        };
        // Set input attributes
        const search = document.createElement("input");
        for (let attr in searchAttributes) {
            search.setAttribute(attr, searchAttributes[attr]);
        }
        // Removing pointer events on category button
        const container = document.getElementsByClassName("blocklyToolboxContents")[0].firstChild;
        const pointerEvent = container.getElementsByClassName("blocklyTreeRowContentContainer")[0];
        pointerEvent.style.removeProperty("pointer-events");
        // Replacing span label by a search input
        let searchCat = document.getElementById("search.label");
        if (searchCat !== null) {
            searchCat.replaceWith(search);
        }
        if (INTERFACE_NAME == "esp32") {
            const levelDiv = document.getElementById("toolbox-level");
            if (levelDiv === null) {
                this._appendLevelDiv(searchInputId);
            }
        }
        // Define search behaviour
        var that = this;
        const delay = function (callback, ms) {
            var timer = 0;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        };
        // Add search event listener on key up
        $("#" + searchInputId).keyup(delay(function (e) {
            if (!(e.keyCode == 65 && e.ctrlKey) && !(e.ctrlKey) && !(e.keyCode == 17)) {
                that.keyword = $("#" + searchInputId).val();
                that.setToolbox();
                $("#" + searchInputId).val("");
                document.getElementById(searchInputId).focus();
                $("#" + searchInputId).val(that.keyword);
            }
        }, 100));
    };
    /**
     * Append level div after search div at the top of toolbox.
     * @private
     * @param {String} searchInputId 
     */
    _appendLevelDiv(searchInputId) {
        const levelDiv = document.createElement("div");
        levelDiv.setAttribute("id", "toolbox-level");
        document.getElementById(searchInputId).after(levelDiv);
        $('#toolbox-level').append('<span>' + Blockly.MESSAGES.setLevel + '</span>');
        const checkedSimple = this._getLevel() === "1" ? "checked" : "";
        const checkedAdvanced = this._getLevel() === "2" ? "checked" : "";
        const switcherHtml = '<div class="d-flex">'
            + '<div class="switcher">'
            + '<input type="radio" name="toolboxLevelToggler" value="1" id="toggleToolboxLevel" class="switcher__input switcher__input--yin toolboxSwitcher" ' + checkedSimple + '>'
            + '<label for="toggleToolboxLevel" class="switcher__label">1</label>'
            + '<input type="radio" name="toolboxLevelToggler" value="2" id="toggleToolboxAdvanced" class="switcher__input switcher__input--right toolboxSwitcher" ' + checkedAdvanced + '>'
            + '<label for="toggleToolboxAdvanced" class="switcher__label">2</label>'
            + '<span class="switcher__toggle"></span>'
            + '</div>';
        $('#toolbox-level').append(switcherHtml);
        var that = this;
        $('input[type=radio][name=toolboxLevelToggler]').change(function () {
            that._setLevel(this.value);
            that.setToolbox();
            if (this.value === "1") {
                switchBlockMode();
            } else {
                switchMixedMode();
            }
        });
    };
    /**
     * Return true if block is matching with keyword to be added in toolbox.
     * @static
     * @param {String} blockType
     * @param {String} keywords 
     * @param {String} catLabel
     * @return {boolean}
     */
    static isMatchingBlock(blockType, keyword, catLabel, searchInCode = false) {
        keyword = ToolboxManager.cleanString(keyword);
        if (blockType && ToolboxManager.cleanString(blockType).search(keyword) > -1) {
            return true;
        }
        // if keyword is matching with category name or subcategory label
        if (catLabel && ToolboxManager.cleanString(catLabel).search(keyword) > -1) {
            return true;
        }
        const blockXml = ToolboxManager.getXmlByBlockType(blockType);
        if (blockXml) {
            // if keyword is matching with block xml definition
            if (ToolboxManager.cleanString(blockXml).search(keyword) > -1) {
                return true;
            }
            // if keyword is matching with tooltip or text in block
            if (Blockly._searchWorkspace === null) {
                Blockly._searchWorkspace = Blockly.inject('searchBlocklyDiv', { css: false, scrollbars: false, trashcan: false });
            }
            Blockly._searchWorkspace.clear();
            const xmlToLoad = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml">' + blockXml + '</xml>');
            ToolboxManager.DISABLE_BLOCK_COLOR_EXTENSION = true;
            ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION = true;
            ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION = true;
            Blockly.Xml.domToWorkspace(xmlToLoad, Blockly._searchWorkspace);
            ToolboxManager.DISABLE_BLOCK_COLOR_EXTENSION = false;
            ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION = false;
            ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION = false;
            if (searchInCode) {
                const codeBlock = (typeof Blockly.Python === 'undefined' ? Blockly.Arduino.workspaceToCode(Blockly._searchWorkspace) : Blockly.Python.workspaceToCode(Blockly._searchWorkspace));
                if (codeBlock.search(keyword) > -1) {
                    return true;
                }
            }
            const blockDB = Blockly._searchWorkspace.getAllBlocks();
            const blockSvg = blockDB[Object.keys(blockDB).find(key => blockDB[key].type === blockType)];
            if (blockSvg !== undefined && ToolboxManager.searchBlock(blockSvg, keyword)) {
                return true;
            }
        }
    };
    /**
     * Search for the given keywords in the block's tooltip and fields.
     * @static
     * @param {Blockly.blockSvg} blockSvg
     * @param {!Array.<string>|string} keywords 
     * @return {boolean} result.
     */
    static searchBlock(blockSvg, keyword) {
        let blockText = blockSvg.type;
        if (!(blockSvg.tooltip instanceof Function)) {
            blockText += " " + blockSvg.tooltip;
        } else if (!(blockSvg.getTooltip() instanceof Function)) {
            blockText += " " + blockSvg.getTooltip();
        } else if (!(blockSvg.getTooltip()() instanceof Function)) {
            blockText += " " + blockSvg.getTooltip()();
        }
        for (var i = 0, input; input = blockSvg.inputList[i]; i++) {
            if (input.name !== undefined) {
                blockText += ' ' + input.name;
            }
            for (var j = 0, field; field = input.fieldRow[j]; j++) {
                if (field.name !== undefined) {
                    blockText += ' ' + field.name;
                }
                if (field instanceof Blockly.FieldLabel) {
                    blockText += ' ' + field.value_;
                }
                if (field instanceof Blockly.FieldDropdown) {
                    const menuItems = field.menuGenerator_;
                    for (var k = 0; k < menuItems.length; k++) {
                        blockText += ' ' + menuItems[k][0];
                    }
                }
            }
        }
        return ToolboxManager.cleanString(blockText).search(keyword) > -1;
    };
    /**
     * Get category and subcategory labels of a block.
     * @private
     * @param {boolean} hasLabel
     * @param {String} categoryId
     * @param {String} subcatLabel
     * @return {String} catText.
     */
    _getCategoryLabels(hasLabel, categoryId, subcatLabel) {
        const catText = Blockly.Msg["CATEGORY_" + categoryId.toUpperCase()];
        if (hasLabel) {
            if (subcatLabel.includes("BKY_")) {
                let subcatText = subcatLabel.split('BKY_')[1];
                subcatText = Blockly.Msg[subcatText.substring(0, subcatText.length - 1)];
                return catText + " " + subcatText;
            } else {
                return subcatLabel;
            }
        } else if (catText) {
            return catText;
        } else {
            return categoryId;
        }
    };
    /**
     * Update variant block types when using toolbox restriction tool.
     * @public
     * @param {Array<Blockly.BlockSvg>} blocksSvg
     * @return {Array<String>} restrictedBlockTypes.
     */
    updateVariantBlocks(blocksSVG) {
        let restrictedBlockTypes = blocksSVG.map(block => block.type);
        for (var i = 0; i < restrictedBlockTypes.length; i++) {
            const variantBlock = this._variantBlockTypes.find(obj => obj.type === restrictedBlockTypes[i]);
            if (variantBlock) {
                restrictedBlockTypes[i] = variantBlock.getVariant(blocksSVG[i])
            }
        }
        return restrictedBlockTypes;
    };
    /**
     * Check if variant block is present in current toolbox.
     * @public
     * @param {Array<Blockly.BlockSvg>} blocksSvg
     * @return {Boolean} isVariantInToolbox
     */
    isVariantInToolbox(blockSVG) {
        let isVariantInToolbox = false;
        const toolboxBlocks = Main.getToolboxManager()._getToolboxTreeContent();
        for (var cat = 0; cat < toolboxBlocks.length; cat++) {
            const content = toolboxBlocks[cat].contents;
            if (content) {
                isVariantInToolbox = content.find(block => block.blockxml && (block.blockxml.includes(blockSVG.type) && block.blockxml.includes(blockSVG.getField('OP').value_)));
                if (isVariantInToolbox) {
                    return true;
                }
            }
        }
    };
    /**
     * Clean string for research.
     * @static
     * @param {String} text
     * @return {String}
     */
    static cleanString(text) {
        return text.toLowerCase().replace(/[áàâäãå]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòôöõ]/gi, 'o');
    };
    /**
     * Get toolbox definition by the mode.
     * @static
     * @param {String} mode
     * @returns {Object} toolbox
     */
    static toolboxDefined(mode) {
        if (typeof TOOLBOXES !== 'undefined') {
            return TOOLBOXES.find(obj => obj.id === mode);
        }
    };
    static DB_ = {
        Set: {
            valueInput: function (name, content) {
                return '<value name="' + name + '">' + content + '</value>';
            },
            text: function (name, value = '') {
                return this.valueInput(name, '<shadow type="text"><field name="TEXT">' + value + '</field></shadow>');
            },
            number: function (name, value, isBlock = false) {
                if (value == undefined) {
                    return this.valueInput(name, '<shadow type="math_number"></shadow>');
                } else {
                    return this.valueInput(name, '<' + (isBlock ? 'block' : 'shadow') + ' type="math_number">' + this.field("NUM", value) + '</' + (isBlock ? 'block' : 'shadow') + '>');
                }
            },
            variable: function (name, varName = 'variable') {
                return this.valueInput(name, '<block type="variables_get">' + this.field("VAR", varName) + '</block>');
            },
            state: function () {
                return this.valueInput("STATE", '<shadow type="io_digital_signal"></shadow>');
            },
            colour_picker: function (color, name = "COLOR") {
                if (color == undefined) {
                    return this.valueInput(name, '<block type="colour_picker"></block>');
                } else {
                    return this.valueInput(name, '<block type="colour_picker">' + this.field("COLOUR", color) + '</block>');
                }
            },
            colour_rgb: function (name, r = 255, g = 255, b = 255) {
                return this.valueInput(name, '<block type="colour_rgb">' + this.number("RED", r) + this.number("GREEN", g) + this.number("BLUE", b) + '</block>');
            },
            field: function (name, value) {
                return '<field name="' + name + '">' + value + '</field>';
            },
            // for TI-83
            chartData: function (name, label, value) {
                return this.valueInput(name, '<block type="ce_chart_dataChart">' + this.text("LABEL", label) + this.number("VALUE", value) + '</block>');
            },
            // for lets start coding
            pin: function (type) {
                return this.valueInput("PIN", '<shadow type="io_' + type + 'Pin"></shadow>');
            }
        }
    };
}

Object.assign(ToolboxManager.DB_, typeof TOOLBOXES_BLOCKS_CONTENT !== 'undefined' ? TOOLBOXES_BLOCKS_CONTENT : {});