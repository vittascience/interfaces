'use strict';

Blockly.Wiki = Object.create(null);

Blockly.Wiki.init = async function (categoryId) {
    Blockly.Wiki.url = new URL(window.location.href);
    Blockly.Wiki.setUrlParameters('interface', INTERFACE_NAME);
    Blockly.Wiki.previewWorkspace = Blockly.inject('previewBlocklyDiv', { renderer: 'zelos' });
    Blockly.Wiki.toolboxMode = Blockly.Constants.getToolboxStyle();
    Blockly.Wiki.toolbox = ToolboxManager.toolboxDefined(Blockly.Wiki.toolboxMode);
    // Toolboxes without categories (letsstartcoding): nothing to list.
    if (!Array.isArray(Blockly.Wiki.toolbox.categories)) return;
    Blockly.Wiki.blockDB = ToolboxManager.DB_.get();
    Blockly.Wiki.addExtensions();
    ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION = true;
    ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION = true;
    Blockly.Wiki.anchorLoaded = undefined;
    Blockly.Wiki.currentLoadingId = null;
    Blockly.Wiki.isLoading = false;
    // blocks rendered when they get near the screen (Blockly workspace and Ace editor are heavy)
    Blockly.Wiki.pendingRenders = new Map();
    Blockly.Wiki.renderObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) Blockly.Wiki.render(entry.target);
    }), { rootMargin: '600px 0px' });
    window.addEventListener('beforeprint', Blockly.Wiki.renderAll);
    Blockly.Wiki.errorNotif = new VittaNotif(5);
    Blockly.Wiki.createCategories();
    Blockly.Wiki.changeCategory(categoryId);
    // ?mode=api: the page is replaced by the JSON of the blocks of the category (type and tooltip)
    if (Blockly.Wiki.isApiMode()) {
        await Blockly.Wiki.showCategoryContent();
        return;
    }
    if (window.location.hash) {
        Blockly.Wiki.anchorLoaded = false;
        Blockly.Wiki.blocker = new VittaBlocker(undefined, '#wiki-content', undefined, `${CDN_PATH}/public/content/img/loader.gif`);
    }
    // Ace editor color syntax
    Blockly.Wiki.showCategoryContent();

    if (window.location.hash) {
        const blockType = window.location.hash.substring(1).replace("Div-container", "");
        const subCatId = Blockly.Wiki.url.searchParams.get('subcategory') || Blockly.Wiki.getSubCat(blockType);
        if (subCatId) {
            await sleep_ms(500)
            Blockly.Wiki.changeCategory(subCatId);
            Blockly.Wiki.showCategoryContent();
        }
    }

    if (typeof Blockly.Wiki.anchorLoaded !== 'undefined' && !Blockly.Wiki.anchorLoaded) {
        const anchor = document.getElementById(window.location.hash.substring(1));
        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth" });
        }
        Blockly.Wiki.anchorLoaded = true;
        Blockly.Wiki.blocker.end();
    }
};

Blockly.Wiki.handleKeyUp = function (event) {
    if (event.key === "Enter") {
        Blockly.Wiki.searchFunction();
    }
};

Blockly.Wiki.searchFunction = function () {
    if (document.querySelector("#search-block input").value.length < 2) {
        // make a bootstrap tooltip appear on the button that says "enter at least 2 characters"
        const tooltip = new bootstrap.Tooltip(document.getElementById("search-btn"), {
            title: i18next.t('wiki.enterAtLeast2Chars'),
            placement: 'bottom',
            trigger: 'manual'
        });
        tooltip.show();
        setTimeout(function () {
            tooltip.hide();
        }, 1000);
        return;
    }
    Blockly.Wiki.clearBlocks();
    $('#category-title').empty();
    const categorySelected = document.querySelector('input[name="category"]:checked');
    if (categorySelected !== null) {
        categorySelected.checked = false;
        document.querySelector('.category-selected').classList.remove('category-selected');
    }

    const searchInput = document.querySelector('#search-block input');
    const keyword = searchInput.value;

    // every block once, sub-categories included
    const shown = new Set();
    Blockly.Wiki.toolbox.categories.forEach(async (category) => {
        if (category.kind !== "category" || !ToolboxManager.hasToBeAdded(category)) return;
        for (const blockType of Blockly.Wiki.getCategoryBlocks(category.toolboxitemid, false)) {
            if (shown.has(blockType) || !ToolboxManager.isMatchingBlock(blockType, keyword, Blockly.Wiki.getCategoryName(category.name))) continue;
            shown.add(blockType);
            await Blockly.Wiki.loadBlock(blockType, true);
        }
    });

    const blocks = document.querySelector('#blocks');
    if (blocks && blocks.children.length === 0) {
        Blockly.Wiki.errorNotif.displayNotification('#blocks', `${jsonPath('wiki.blocksNotFound')} '${keyword}.'`, 'bg-warning');
    }
};

Blockly.Wiki.setUrlParameters = function (parameter, value = null) {
    (value === null ? Blockly.Wiki.url.searchParams.delete(parameter) : Blockly.Wiki.url.searchParams.set(parameter, value));
    window.history.pushState({}, '', Blockly.Wiki.url.href);
};

Blockly.Wiki.changeCategory = function (categoryId) {
    const radios = document.querySelectorAll('input[name="category"]');
    let categoryFound = false;
    // Find the radio element corresponding to the category
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === categoryId) {
            radios[i].checked = categoryFound = true;
            return;
        }
    }
    // If the category in the URL does not exist, use the first category as the default category. 
    if (!categoryFound) {
        const radio = document.querySelector('input[name="category"]');
        radio.checked = true;
    }
};

Blockly.Wiki.setWorkspaceBlock = function (blockType, blocks) {
    const blockDivName = blockType + "Div";
    const blocksDiv = document.getElementById('blocks');
    const blockDivContainer = document.createElement('div');
    blockDivContainer.id = blockDivName + "-container";
    blockDivContainer.classList = ('block-container mt-4 mb-4');

    // create a block and button container
    const blockDivContainerRow = document.createElement('div');
    // make it a flex row
    blockDivContainerRow.classList = ('block-container-row');

    // blockDiv element
    const blockDiv = document.createElement('div');
    blockDiv.id = blockDivName;
    blockDiv.classList.add('blocklyBlockCanvas');
    const topBlock = Blockly.Wiki.getTopBlock(blocks); // We use the first block because it's the biggest => in the case of on_start for example
    blockDiv.style = "height: " + (topBlock.height * 1.4 + 10) + "px; width: " + topBlock.width * 1.2 + "px;"; // +10px for the scrollbar

    // Add the download block button
    const downloadBlockBtn = document.createElement('button');
    downloadBlockBtn.id = blockDivName + "DownloadBtn";
    downloadBlockBtn.classList = 'btn btn-download-block btn-sm mt-2 mb-2 ml-2 mr-2';
    downloadBlockBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBlockBtn.addEventListener('click', function () {
        html2canvas(document.querySelector("#" + blockDivName)).then(canvas => {
            // Download the image
            const link = document.createElement('a');
            link.download = blockType + '.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    blockDivContainerRow.appendChild(blockDiv);
    blockDivContainerRow.appendChild(downloadBlockBtn);

    blockDivContainer.appendChild(blockDivContainerRow);
    blocksDiv.appendChild(blockDivContainer);

    // The block itself, not the on_start or variable it is shown in. blockType may be a blockDB preset (logic_compare-eq).
    const type = blockType.replace(/-.*$/, '');
    const tooltipBlock = blocks.find(block => block.type === type) || null;
    // Title: the text of the block, then its type (anchor of the url: #<blockType>Div-container)
    const title = $(`<h5 id="${blockType}" style="word-wrap: break-word;"></h5>`).text(Blockly.Wiki.getBlockTitle(tooltipBlock) || (tooltipBlock && tooltipBlock.toString()) || type);
    title.append($('<small class="d-block text-muted fw-normal mt-1"></small>').text(type));
    title.insertBefore(blockDivContainerRow);
    // Sometimes tooltips are generated dynamically by a function.
    if (tooltipBlock && typeof (tooltipBlock.tooltip) === 'function') tooltipBlock.tooltip = tooltipBlock.tooltip();

    if (tooltipBlock !== null && typeof (tooltipBlock.tooltip) === "string") {
        if (tooltipBlock.tooltip.match(Blockly.Tooltip.SEP)) {
            const imgPath = tooltipBlock.tooltip.split(Blockly.Tooltip.SEP)[0];
            const txt = tooltipBlock.tooltip.split(Blockly.Tooltip.SEP)[1];
            $('<p>' + txt + '</p>').insertBefore(blockDivContainerRow);
            $('<img src="' + imgPath + `" style="height: 80px;" alt="${i18next.t("wiki.imgDescription")}">`).insertBefore(blockDivContainerRow);
        } else {
            $('<p>' + tooltipBlock.tooltip + '</p>').insertBefore(blockDivContainerRow);
        }
    }
    return blockDivName;
};

/**
 * Title of a block: its labels and the chosen options of its dropdowns, not the pictures, and a placeholder for its
 * values (plugged blocks, typed texts and numbers): "afficher l'image", "répéter indéfiniment", "afficher …".
 * Not block.toString(): checkboxes gave "FALSE" (25 times for the LEDs of show_leds), and pictures, colours and the
 * blocks plugged into it were written too.
 * @param {Blockly.Block} block
 * @return {string} the title, empty without label nor dropdown (math_number, text: their whole text is taken)
 */
Blockly.Wiki.TITLE_PLACEHOLDER = '…';
Blockly.Wiki.getBlockTitle = function (block) {
    if (!block) return '';
    const texts = [];
    for (const input of block.inputList) {
        for (const field of input.fieldRow) {
            if (field instanceof Blockly.FieldLabel) {
                texts.push(field.getText());
            } else if (field instanceof Blockly.FieldDropdown) {
                // not a picture option (icons): its text is the alt of the picture ("heart icon")
                const option = field.getOptions(false).find(option => Array.isArray(option) && option[1] === field.getValue());
                if (!option || typeof option[0] === 'string') texts.push(field.getText());
            } else if (field instanceof Blockly.FieldTextInput || field instanceof Blockly.FieldNumber) {
                texts.push(Blockly.Wiki.TITLE_PLACEHOLDER); // text or number typed in the block
            }
        }
        // where a block is plugged: "afficher …"
        if (input.type === Blockly.inputs.inputTypes.VALUE) texts.push(Blockly.Wiki.TITLE_PLACEHOLDER);
    }
    // values only (math_number, text): no title, their whole text is taken
    if (texts.every(text => text === Blockly.Wiki.TITLE_PLACEHOLDER)) return '';
    return texts.join(' ').replace(/\s+/g, ' ').trim();
};

Blockly.Wiki.getTopBlock = function (blocks) {
    return blocks[0];
};

Blockly.Wiki.domToWorkspace = function (xmlToLoad, previewWorkspace) {
    Blockly.Wiki.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(xmlToLoad, previewWorkspace);
};

Blockly.Wiki.isApiMode = function () {
    return Blockly.Wiki.url.searchParams.get('mode') === 'api';
};

/**
 * Text of a tooltip: messages replaced (%{BKY_X}, {X}), without the image part (image + Blockly.Tooltip.SEP + text).
 * @param {string} tooltip
 * @return {string|null}
 */
Blockly.Wiki.resolveTooltipText = function (tooltip) {
    if (typeof tooltip !== 'string') return null;
    const text = tooltip
        .replace(/%\{BKY_([A-Z0-9_]+)\}/g, (match, key) => (typeof Blockly.Msg !== 'undefined' && Blockly.Msg[key]) || match)
        .replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) => (typeof Blockly.MESSAGES !== 'undefined' && Blockly.MESSAGES[key]) || match);
    return text.match(Blockly.Tooltip.SEP) ? text.split(Blockly.Tooltip.SEP)[1] : text;
};

/**
 * Tooltip of a block definition when it is static (no block to create).
 * @param {string} blockType may be a blockDB preset (logic_compare-eq)
 * @return {string|null}
 */
Blockly.Wiki.getStaticTooltipText = function (blockType) {
    const definition = Blockly.Blocks[blockType.replace(/-.*$/, '')];
    if (!definition) return null;
    if (typeof definition.tooltip === 'string') return Blockly.Wiki.resolveTooltipText(definition.tooltip);
    if (definition.json && typeof definition.json.tooltip === 'string') return Blockly.Wiki.resolveTooltipText(definition.json.tooltip);
    return null;
};

/**
 * Tooltip of a created block (tooltips may be functions).
 * @param {string} blockType
 * @param {Array<Blockly.Block>} blocks blocks of the preview workspace
 * @return {string}
 */
Blockly.Wiki.getBlockTooltipText = function (blockType, blocks) {
    const block = blocks.find(block => block.type === blockType.replace(/-.*$/, ''));
    if (!block) return '';
    const tooltip = typeof block.tooltip === 'function' ? block.tooltip.call(block) : block.tooltip;
    return Blockly.Wiki.resolveTooltipText(tooltip) || '';
};

/** ?mode=api: the page shows only the JSON of the blocks. */
Blockly.Wiki.renderApiResponse = function (blocks) {
    document.body.innerHTML = '<pre id="wiki-api-output" style="white-space: pre-wrap; word-break: break-word; margin: 0;"></pre>';
    document.getElementById('wiki-api-output').textContent = JSON.stringify(blocks.map(block => ({
        type: block.type,
        tooltip: block.tooltip
    })), null, 2);
};

/**
 * Shows a block (workspace, tooltip, code). With apiMode, resolves with its type and tooltip instead, without display.
 * @param {string} blockType
 * @param {boolean} [searchMode=false]
 * @param {number} [loadingId=null]
 * @param {boolean} [apiMode=false]
 */
Blockly.Wiki.loadBlock = function (blockType, searchMode = false, loadingId = null, apiMode = false) {
    return new Promise((resolve, reject) => {
        // Vérifier si c'est toujours le bon chargement
        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            return resolve();
        }

        if (apiMode) {
            const staticTooltip = Blockly.Wiki.getStaticTooltipText(blockType);
            if (staticTooltip !== null) return resolve({ type: blockType, tooltip: staticTooltip });
        }

        const currentCategory = (searchMode ? '' : getParamValue('category'));

        let blockXml = null;
        Blockly.Wiki.category = currentCategory;

        if (Object.keys(Blockly.Wiki.custom_blocks).includes(Blockly.Wiki.category) &&
            Object.keys(Blockly.Wiki.custom_blocks[Blockly.Wiki.category]).includes(blockType)) {
            blockXml = Blockly.Wiki.custom_blocks[Blockly.Wiki.category][blockType];
        } else {
            blockXml = ToolboxManager.getXmlByBlockType(blockType);
        }

        if (!blockXml) {
            return reject('block is undefined');
        }

        const message = blockXml.match(/{([a-zA-Z0-9])+}/g);
        if (message !== null && typeof Blockly.MESSAGES !== 'undefined') {
            const var_name = message[0].slice(1, -1);
            if (Object.keys(Blockly.MESSAGES).includes(var_name)) {
                blockXml = blockXml.replace('{' + var_name + '}', Blockly.MESSAGES[var_name]);
            }
        }

        let xmlToLoad = Blockly.utils.xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml">' + blockXml + '</xml>');
        Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);

        if (apiMode) {
            return resolve({
                type: blockType,
                tooltip: Blockly.Wiki.getBlockTooltipText(blockType, Blockly.Wiki.previewWorkspace.getAllBlocks(false))
            });
        }

        // The generator of the block (arduinoq has several, web only JavaScript). blockType may be a
        // blockDB preset ("autoprog_output-led"): the generator is the one of the block type.
        const type = blockType.replace(/-.*$/, '');
        const generator = [Blockly.Python, Blockly.Arduino, Blockly.JavaScript]
            .find(gen => gen && gen.forBlock && typeof gen.forBlock[type] === 'function');

        // Arduino code is only written inside setup/loop: the block is shown in on_start, a value block in a variable.
        // Blocks without previous connection nor output (on_start, functions, events) are shown alone.
        const outsideScope = typeof BLOCKS_OUTSIDE_SCOPE !== 'undefined' && BLOCKS_OUTSIDE_SCOPE.includes(type);
        // start block of the interface (arduinoq: cpp_on_start, its python one is py_on_start)
        const startType = ['on_start', 'cpp_on_start'].find(t => Blockly.Blocks[t]);
        if (generator && generator === Blockly.Arduino && !outsideScope && startType) {
            const block = Blockly.Wiki.getTopBlock(Blockly.Wiki.previewWorkspace.getAllBlocks(false));
            const wrap = (xml) => '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml + '</xml>';
            const inStart = (xml) => '<block type="' + startType + '"><statement name="DO">' + xml + '</statement></block>';
            const inFunction = (def) => '<block type="' + def + '"><mutation name="nom_de_la_fonction"></mutation><field name="NAME">nom_de_la_fonction</field><statement name="STACK">' + blockXml + '</statement></block>';
            let xml = null;
            if (blockType === 'procedures_ifreturn-0' || blockType === 'procedures_ifreturn-1') {
                // only allowed in a function: without (-0) or with (-1) a returned value
                xml = inFunction(blockType.endsWith('1') ? 'procedures_defreturn' : 'procedures_defnoreturn');
            } else if (block.outputConnection) {
                Blockly.Wiki.previewWorkspace.getVariableMap().createVariable('variable');
                xml = inStart('<block type="variables_set"><field name="VAR">variable</field><value name="VALUE">' + blockXml + '</value></block>');
            } else if (block.previousConnection) {
                // html blocks only in a web page sent by the server
                xml = inStart(Blockly.Constants.HTML_BLOCKS && Blockly.Constants.HTML_BLOCKS.includes(type)
                    ? '<block type="network_server_sendWebPage"><statement name="BODY">' + blockXml + '</statement></block>'
                    : blockXml);
            }
            if (xml) {
                xmlToLoad = Blockly.utils.xml.textToDom(wrap(xml));
                Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);
            }
        }

        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            return resolve();
        }

        const blockDivName = Blockly.Wiki.setWorkspaceBlock(blockType, Blockly.Wiki.previewWorkspace.getAllBlocks(false));

        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            const element = document.getElementById(blockDivName + "-container");
            if (element) element.remove();
            return resolve();
        }

        // the code now (plain text, readable before the editor), the workspace and the editor when visible
        const workspace = new Blockly.Workspace();
        Blockly.Xml.domToWorkspace(xmlToLoad, workspace);
        const code = (generator && generator.workspaceToCode(workspace)) || '';
        workspace.dispose();
        const container = document.getElementById(blockDivName + "-container");
        Blockly.Wiki.displayCodeBlock(container, code);
        const language = Blockly.Wiki.languageOf(generator);
        Blockly.Wiki.pendingRenders.set(container, () => {
            const visible = Blockly.inject(blockDivName, {
                readOnly: true,
                move: {
                    scrollbars: { horizontal: true, vertical: false },
                    drag: false,
                    wheel: true
                },
                renderer: 'zelos'
            });
            Blockly.Xml.domToWorkspace(xmlToLoad, visible);
            visible.setTheme(Blockly.Themes.ClassicBase);
            Blockly.Wiki.highlightCode(container.querySelector('pre'), language);
        });
        // on the screen already (first blocks of a category): now, not after the whole category is loaded
        if (container.getBoundingClientRect().top < window.innerHeight) {
            Blockly.Wiki.render(container);
        } else {
            Blockly.Wiki.renderObserver.observe(container);
        }

        resolve();
    });
};

/**
 * Ace mode of the code written by a generator (modes loaded by wiki.php).
 * @param {Blockly.CodeGenerator} generator
 * @return {string}
 */
Blockly.Wiki.languageOf = function (generator) {
    if (INTERFACE_NAME === 'picaxe') return 'picaxe'; // PICAXE BASIC, written by the Blockly.Python object
    if (generator && generator === Blockly.Arduino) return 'c_cpp';
    if (generator && generator === Blockly.JavaScript) return 'html'; // web pages: html, css and js
    return 'python';
};

/**
 * Code of a block, in plain text with a copy button (the Ace editor comes with highlightCode).
 * @param {HTMLElement} container block container
 * @param {string} code
 */
Blockly.Wiki.displayCodeBlock = function (container, code) {
    const codeContainerDiv = document.createElement('div');
    codeContainerDiv.className = 'code-container';
    const codeDiv = document.createElement('pre');
    codeDiv.className = 'wiki-codeblock';
    codeDiv.id = container.id + '-codeblock';
    codeDiv.textContent = code;
    codeContainerDiv.appendChild(codeDiv);
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-copy';
    copyButton.id = container.id.replace(/-container$/, '') + '-copyButton';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.onclick = copyBlockCode;
    codeContainerDiv.appendChild(copyButton);
    container.appendChild(codeContainerDiv);
};

/**
 * Read-only Ace editor on the code of a block.
 * @param {HTMLElement} pre
 * @param {string} language ace mode (languageOf)
 */
Blockly.Wiki.highlightCode = function (pre, language) {
    const editor = ace.edit(pre);
    editor.session.setMode("ace/mode/" + language);
    // read-only code: no syntax check worker (not served next to the wiki's ace)
    editor.session.setUseWorker(false);
    editor.setReadOnly(true);
    editor.setOptions({
        minLines: 10,
        maxLines: 100,
        fontSize: "12pt",
        wrapBehavioursEnabled: true,
        highlightActiveLine: false
    });
    // C++: ace-ar class for the right colors
    if (language === "c_cpp") {
        editor.container.classList.add("ace-ar");
    }
};

/**
 * Blockly workspace and Ace editor of a block container (once).
 * @param {HTMLElement} container
 */
Blockly.Wiki.render = function (container) {
    const render = Blockly.Wiki.pendingRenders.get(container);
    if (!render) return;
    Blockly.Wiki.pendingRenders.delete(container);
    Blockly.Wiki.renderObserver.unobserve(container);
    try {
        render();
    } catch (e) {
        console.warn('Erreur chargement block', container.id.replace(/Div-container$/, ''), e);
    }
};

/** Empties the block list (and forgets the blocks waiting to be rendered). */
Blockly.Wiki.clearBlocks = function () {
    Blockly.Wiki.renderObserver.disconnect();
    Blockly.Wiki.pendingRenders.clear();
    $("#blocks").empty();
};

/** Renders every block not rendered yet (a printed page, tests). */
Blockly.Wiki.renderAll = function () {
    [...Blockly.Wiki.pendingRenders.keys()].forEach(Blockly.Wiki.render);
};

// Fonction pour charger les blocs par batch
Blockly.Wiki.loadBlocksBatch = async function (blockTypes, searchMode = false, loadingId = null, batchSize = 3) {
    for (let i = 0; i < blockTypes.length; i += batchSize) {
        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) return;

        const batch = blockTypes.slice(i, i + batchSize);

        // Charger le batch avec try/catch pour éviter crash
        await Promise.all(batch.map(async blockType => {
            try {
                await Blockly.Wiki.loadBlock(blockType, searchMode, loadingId);
            } catch (e) {
                console.warn('Erreur chargement block', blockType, e);
            }
        }));

        // Laisser le navigateur respirer
        await new Promise(r => requestAnimationFrame(r));
    }
};


Blockly.Wiki.getCategoryName = function (categoryName) {
    const categoryRegex = /%{BKY_(.*?)}/;
    if (categoryName.match(categoryRegex) !== null) {
        return '<span>' + Blockly.Msg[categoryName.match(categoryRegex)[1]] + '</span>';
    } else {
        return '<span>' + categoryName + '</span>';
    }
};

Blockly.Wiki.createCat = function (category, parentCat = null) {
    const radio = document.createElement("input");
    const label = document.createElement("label");
    radio.type = "radio";
    radio.name = "category";
    radio.value = category.toolboxitemid;
    if (parentCat) {
        radio.className = 'isChildCat';
    } else if (Blockly.Wiki.toolbox.subcategories && Blockly.Wiki.toolbox.subcategories[radio.value]) {
        radio.className = "hasSubcats";
    }
    label.className = "category" + (parentCat ? " subcategory " + parentCat : "");
    // Take the category style from the toolbox declaration
    // Replace "_category" by "_blocks" to find the block style 
    // thus: "display_category" becomes "display_blocks"
    const categoryStyle = category.style.replace("_category", "_blocks");
    const themeStyle = Blockly.Wiki.toolbox.theme[categoryStyle]
        || Blockly.Wiki.toolbox.theme[category.style]
        || { colourPrimary: '#5b80a5' };
    label.style.setProperty("--_color", themeStyle.colourPrimary);
    if (parentCat) {
        label.style.setProperty("display", 'none');
    }
    // also add it to the body as a variable so that we can use it in the CSS
    document.body.style.setProperty("--_current-color", themeStyle.colourPrimary);
    // Same icon as in the toolbox of the interface (ToolboxManager._setToolboxMenuStyle): an icon of TOOLBOXES_SVGS when
    // the category asks for it ("svgIcon"), the style of the category for a category, "<id>_subcategory" for a
    // sub-category (its style is the one of its category), else the Font Awesome icon of the category.
    const categoryIcon = category.cssConfig?.icon || '';
    if (categoryIcon.split(' ').includes('svgIcon')) {
        const svg = typeof TOOLBOXES_SVGS !== 'undefined' && TOOLBOXES_SVGS[parentCat ? category.toolboxitemid + '_subcategory' : category.style];
        label.innerHTML += `<i>${svg || ''}</i>`;
    } else if (categoryIcon) {
        label.innerHTML += `<i class="${categoryIcon}"></i>`;
    }

    label.innerHTML += Blockly.Wiki.getCategoryName(category.name);
    label.appendChild(radio);
    return label;
};

/**
 * Add the block extensions of the catalog (BlockExtensions.js) to the wiki toolbox, as in the interface: one
 * sub-category per extension, in the "Robots" category for the robots (when the interface has one), else in an
 * "Extensions" category. The blocks of the catalog are defined, their shadows added to the blockDB.
 */
Blockly.Wiki.addExtensions = function () {
    const catalog = typeof BlockExtensions !== 'undefined' ? BlockExtensions.getCatalog() : [];
    if (!catalog.length) return;
    BlockExtensions.load(catalog);
    const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const db = { ...Blockly.Wiki.blockDB };
    for (const ext of catalog) {
        for (const block of ext.blocks) {
            const { inputs } = BlockExtensions.toToolboxItem(ext, block);
            db[BlockExtensions.getBlockType(ext, block)] = Object.entries(inputs).map(([name, { shadow }]) => '<value name="' + name + '"><shadow type="' + shadow.type + '">'
                + Object.entries(shadow.fields).map(([field, value]) => '<field name="' + field + '">' + escape(value) + '</field>').join('') + '</shadow></value>').join('');
        }
    }
    Blockly.Wiki.blockDB = ToolboxManager._dbCache = db;
    const toolbox = Blockly.Wiki.toolbox = {
        ...Blockly.Wiki.toolbox,
        categories: [...Blockly.Wiki.toolbox.categories],
        subcategories: { ...Blockly.Wiki.toolbox.subcategories },
        content: { ...Blockly.Wiki.toolbox.content }
    };
    const hasRobots = toolbox.categories.some(category => category.toolboxitemid === 'robots');
    if (catalog.some(ext => !(hasRobots && BlockExtensions.isRobot(ext)))) {
        toolbox.categories.push({
            kind: 'category', toolboxitemid: 'block_extensions', name: BlockExtensions.t('category'),
            style: 'block_extensions_category', cssConfig: { icon: 'icon_blockly fas fa-puzzle-piece' }
        });
    }
    for (const ext of catalog) {
        const parent = hasRobots && BlockExtensions.isRobot(ext) ? 'robots' : 'block_extensions';
        const id = 'ext_' + ext.id;
        // "svgIcon": icon of the interface, found by createCat from the sub-category id (as BlockExtensions.pushToolbox)
        const hasSvgIcon = ext.svgIcon && typeof TOOLBOXES_SVGS !== 'undefined' && TOOLBOXES_SVGS[ext.svgIcon];
        if (hasSvgIcon) TOOLBOXES_SVGS[id + '_subcategory'] = TOOLBOXES_SVGS[ext.svgIcon];
        toolbox.subcategories[parent] = [...(toolbox.subcategories[parent] || []), {
            kind: 'category', toolboxitemid: id, name: ext.name, style: ext.style || 'block_extensions_category',
            cssConfig: { icon: hasSvgIcon ? 'icon_blockly svgIcon' : 'icon_blockly fas fa-puzzle-piece' }
        }];
        toolbox.content[parent] = [...(toolbox.content[parent] || []), {
            subCategoryId: id,
            contents: [...ext.toolbox, { blocks: ext.blocks.map(block => BlockExtensions.getBlockType(ext, block)) }]
        }];
    }
};

Blockly.Wiki.createCategories = function () {
    const toolboxMenu = document.getElementById("radioContainer");
    // if radioContainer is not present, we don't need to create categories
    if (toolboxMenu === null) return;

    Blockly.Wiki.toolbox.categories.forEach(function (category) {
        if (category.kind === "category") {
            if (!ToolboxManager.hasToBeAdded(category)) {
                return;
            }
            const subcats = ((Blockly.Wiki.toolbox.subcategories || {})[category.toolboxitemid] || [])
                .filter(cat => ToolboxManager.hasToBeAdded(cat) && Blockly.Wiki.getCategoryBlocks(cat.toolboxitemid, true).length);
            // no entry for a category without blocks for this board or robot
            const hasSubcats = Blockly.Wiki.toolbox.subcategories && Blockly.Wiki.toolbox.subcategories[category.toolboxitemid];
            if (hasSubcats ? !subcats.length : !Blockly.Wiki.getCategoryBlocks(category.toolboxitemid, false).length) {
                return;
            }
            toolboxMenu.appendChild(Blockly.Wiki.createCat(category));
            for (const cat of subcats) {
                toolboxMenu.appendChild(Blockly.Wiki.createCat(cat, category.toolboxitemid));
            }
        }
    });
    // event listener for radio buttons
    const radios = document.querySelectorAll('input[name="category"]');
    radios.forEach(
        function (radio) {
            radio.addEventListener('click', async function () {
                if (Blockly.Wiki.currentCategoryShow !== this.value) {
                    Blockly.Wiki.setUrlParameters('subcategory', null);
                    Blockly.Wiki.showCategoryContent();
                } else {
                    if (Blockly.Wiki.toolbox.subcategories && Blockly.Wiki.toolbox.subcategories[Blockly.Wiki.currentCategoryShow]) {
                        Blockly.Wiki.setUrlParameters('subcategory', null);
                        Blockly.Wiki.showCategoryContent();
                    }
                }
            });
        }
    );
};

/**
 * Blocks of a category, as listed in the toolbox content (those the board or robot does not have are left out).
 * @param {string} categoryId toolboxitemid of the category
 * @param {boolean} isChild sub-category
 * @return {Array<string>} block types (or blockDB presets)
 */
Blockly.Wiki.getCategoryBlocks = function (categoryId, isChild) {
    if (categoryId == "variables" || categoryId == "procedures") {
        // only the blocks the interface defines ("procedures_ifreturn-0" -> procedures_ifreturn)
        return Object.keys(Blockly.Wiki.custom_blocks[categoryId]).filter(type => Blockly.Blocks[type.replace(/-.*$/, '')]);
    }
    let subcategories = Blockly.Wiki.toolbox.content[categoryId];
    if (isChild) {
        for (const id in Blockly.Wiki.toolbox.content) {
            const cat = Blockly.Wiki.toolbox.content[id];
            const subcat = Array.isArray(cat) && cat.find(item => item.subCategoryId === categoryId);
            if (subcat) {
                subcategories = subcat.contents;
                break;
            }
        }
    }
    // sub-categories may have their own sub-categories (arduinoq: basic > math > math_calculations)
    const blocks = [];
    const collect = (items) => items.forEach((item) => {
        if (!ToolboxManager.hasToBeAdded(item)) return;
        if (item.blocks) blocks.push(...item.blocks);
        if (Array.isArray(item.contents)) collect(item.contents);
    });
    if (Array.isArray(subcategories)) collect(subcategories);
    return blocks;
};

Blockly.Wiki.showCategoryContent = async function () {
        try {
            const loadingId = Date.now() + Math.random();
            Blockly.Wiki.currentLoadingId = loadingId;
            Blockly.Wiki.isLoading = true;

            const radio = document.querySelector('input[name="category"]:checked');

            if (Blockly.Wiki.isApiMode()) {
                const apiBlocks = [];
                for (const blockType of Blockly.Wiki.getCategoryBlocks(radio.value, radio.classList.contains('isChildCat'))) {
                    try {
                        apiBlocks.push(await Blockly.Wiki.loadBlock(blockType, false, loadingId, true));
                    } catch (e) {
                        console.warn('Erreur chargement block', blockType, e);
                    }
                }
                Blockly.Wiki.renderApiResponse(apiBlocks.filter(Boolean));
                Blockly.Wiki.isLoading = false;
                return;
            }

            Blockly.Wiki.clearBlocks();

            const categoryTitleSelector = document.querySelector('#category-title');
            let newTitle = radio.parentNode.innerHTML.replace('<span>', '<span class="ms-2">').replace(/<input.*?>/g, '');
            if (newTitle.includes('<i>')) newTitle = newTitle.replace('<i>', '<i class="svgIcon">');
            categoryTitleSelector.innerHTML = newTitle;
            categoryTitleSelector.style.color = radio.parentNode.style.getPropertyValue('--_color');

            const helper = document.querySelector("#wiki-subcat-helper");
            if (radio.classList.contains('hasSubcats')) {
                if (!helper) {
                    const subCatSelect = `<h6 id="wiki-subcat-helper" data-i18n="wiki.selectSubCategory" style="text-align:left;">
                        Veuillez sélectionner une sous-catégorie dans le menu pour voir le contenu.
                    </h6>`
                    categoryTitleSelector.insertAdjacentHTML('afterend', subCatSelect);
                }
            } else if (helper) {
                helper.remove();
            }

            if (radio.classList.contains('isChildCat')) {
                Blockly.Wiki.setUrlParameters('subcategory', radio.value);
            } else {
                Blockly.Wiki.setUrlParameters('category', radio.value);
            }

            document.querySelectorAll('input[name="category"]').forEach(function (radio) {
                radio.parentElement.classList.remove("category-selected");
            });

            document.querySelector('input[name="category"]:checked').parentElement.classList.add("category-selected");
            Blockly.Wiki.currentCategoryShow = radio.value;

            if (Blockly.Wiki.toolbox.subcategories && Blockly.Wiki.toolbox.subcategories[radio.value]) {
                const subcats = document.querySelectorAll('.subcategory.' + radio.value);
                for (const cat of subcats) {
                    cat.style.display = cat.style.display == "none" ? "block" : "none";
                }
                // arrow of the category (wiki.css)
                radio.parentElement.classList.toggle('expanded', subcats.length > 0 && subcats[0].style.display !== 'none');
                Blockly.Wiki.isLoading = false;
                return;
            } else {
                const allBlocks = Blockly.Wiki.getCategoryBlocks(radio.value, radio.classList.contains('isChildCat'));

                Blockly.Wiki.loadBlocksBatch(allBlocks, false, loadingId, 10);

                Blockly.Wiki.isLoading = false;
            }
        } catch (error) {
            Blockly.Wiki.isLoading = false;
            console.error(error);
        }
};

Blockly.Wiki.getSubCat = function (blockType) {
    const radio = document.querySelector('input[name="category"]:checked');
    if (Blockly.Wiki.toolbox.subcategories) {
        const subcat = Blockly.Wiki.toolbox.content[radio.value];
        if (subcat) {
            for (const cat of subcat) {
                if (cat && 'contents' in cat) {
                    for (const items of cat.contents) {
                        if (items.blocks.includes(blockType)) {
                            return cat.subCategoryId;
                        }
                    }
                }
            }
        }
    }
};

const copyBlockCode = (event) => {
    // get the parent with the class "block-container"
    const blockContainer = event.target.closest('.block-container');

    // get the ace instance for the block
    const aceInstance = ace.edit(blockContainer.querySelector('.code-container pre'));

    // select the code
    const code = aceInstance.getValue();

    // create a textarea to copy the code to
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    document.body.removeChild(textarea);

    // make a bootstrap tooltip appear on the button
    const tooltip = new bootstrap.Tooltip(event.target, {
        title: i18next.t('wiki.copied'),
        placement: 'top',
        trigger: 'manual'
    });
    tooltip.show();
    setTimeout(function () {
        tooltip.hide();
    }, 1000);

};

Blockly.Wiki.custom_blocks = {
    "variables": {
        'variables_set-number': '<block type="variables_set"><field name="VAR">variable</field><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>',
        'variables_set-text': '<block type="variables_set"><field name="VAR">variable</field><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
        'variables_get': '<block type="variables_get"><field name="VAR">variable</field></block>',
        'variables_increment': '<block type="variables_increment"><field name="VAR">variable</field><value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
        'variables_force_type': '<block type="variables_force_type"><field name="TYPE">float</field><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>',
        'variables_type_of': '<block type="variables_type_of"><field name="VAR">variable</field></block>'
    },
    "procedures": {
        'procedures_defnoreturn': '<block type="procedures_defnoreturn"><mutation name="nom_de_la_fonction"></mutation><field name="NAME">nom_de_la_fonction</field></block>',
        'procedures_callnoreturn': '<block type="procedures_callnoreturn"><mutation name="nom_de_la_fonction"></mutation></block>',
        'procedures_defreturn': '<block type="procedures_defreturn"><mutation name="nom_de_la_fonction"></mutation><field name="NAME">nom_de_la_fonction</field></block>',
        'procedures_callreturn': '<block type="procedures_callreturn"><mutation name="nom_de_la_fonction"></mutation></block>',
        'procedures_ifreturn-0': '<block type="procedures_ifreturn"><mutation value="0"></mutation></block>',
        'procedures_ifreturn-1': '<block type="procedures_ifreturn"><mutation value="1"></mutation></block>',
    }
};