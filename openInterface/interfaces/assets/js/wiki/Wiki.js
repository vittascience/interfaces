'use strict';

Blockly.Wiki = Object.create(null);

Blockly.Wiki.init = async function (category) {
    Blockly.Wiki.url = new URL(window.location.href);
    Blockly.Wiki.setUrlParameters('interface', INTERFACE_NAME);
    Blockly.Wiki.previewWorkspace = Blockly.inject('previewBlocklyDiv', { renderer: 'zelos' });
    Blockly.Wiki.toolboxMode = Blockly.Constants.getToolboxStyle();
    Blockly.Wiki.toolbox = ToolboxManager.toolboxDefined(Blockly.Wiki.toolboxMode);
    Blockly.Wiki.blockDB = ToolboxManager.DB_.get();
    ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION = true;
    ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION = true;
    Blockly.Wiki.anchorLoaded = undefined;
    Blockly.Wiki.errorNotif = new VittaNotif(5);
    Blockly.Wiki.createCategories();
    Blockly.Wiki.changeCategory(category);
    if (window.location.hash) {
        Blockly.Wiki.anchorLoaded = false;
        Blockly.Wiki.blocker = new VittaBlocker(undefined, '#wiki-content', undefined, `${CDN_PATH}/public/content/img/loader.gif`);
    }
    // Ace editor color syntax
    Blockly.Wiki.inoInterfaces = ["arduino", "mBot"];
    Blockly.Wiki.language = (Blockly.Wiki.inoInterfaces.includes(INTERFACE_NAME) ? "c_cpp" : "python");
    await Blockly.Wiki.showCategoryContent();

    if (typeof Blockly.Wiki.anchorLoaded !== 'undefined' && !Blockly.Wiki.anchorLoaded) {
        const anchor = document.getElementById(window.location.hash.substring(1));
        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth" });
        }
        Blockly.Wiki.anchorLoaded = true;
        Blockly.Wiki.blocker.end();
    }
};

Blockly.Wiki._displayProgressBar = function () {
    document.querySelector('#progress-bar-wiki').style.width = '0%';
    document.querySelector('#global-overlay').style.display = 'flex';
    document.querySelector('#progress-bar-container').style.display = 'flex';
};

Blockly.Wiki._hideProgressBar = function () {
    document.querySelector('#progress-bar-container').style.display = 'none';
    document.querySelector('#global-overlay').style.display = 'none';
    document.querySelector('#progress-bar-wiki').style.width = '0%';
};

Blockly.Wiki._updateProgressBar = function (percentage) {
    const progressBarElt = document.querySelector('#progress-bar-wiki');
    progressBarElt.textContent = `${percentage}%`;
    getComputedStyle(progressBarElt).width;
    progressBarElt.style.width = `${percentage}%`;
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
    $("#blocks").empty();
    $('#category-title').empty();
    const categorySelected = document.querySelector('input[name="category"]:checked');
    if (categorySelected !== null) {
        categorySelected.checked = false;
        document.querySelector('.category-selected').classList.remove('category-selected');
    }

    const searchInput = document.querySelector('#search-block input');
    const keyword = searchInput.value;

    Blockly.Wiki.toolbox.categories.forEach(async (category) => {
        if (category.kind === "category") {
            const categoryContent = Blockly.Wiki.toolbox.content[category.toolboxitemid];
            if (typeof categoryContent === 'object') {
                for (let i = 0; i < categoryContent.length; i++) {
                    if (Object.keys(categoryContent[i]).includes('blocks')) {
                        for (let j = 0; j < categoryContent[i].blocks.length; j++) {
                            const isMatching = ToolboxManager.isMatchingBlock(categoryContent[i].blocks[j], keyword, Blockly.Wiki.getCategoryName(category.name));
                            if (isMatching) {
                                await Blockly.Wiki.loadBlock(categoryContent[i].blocks[j], true);
                            }
                        }
                    }
                }
            }
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

Blockly.Wiki.changeCategory = function (category) {
    const selector = document.querySelectorAll('input[name="category"]');
    let categoryFound = false;
    // Find the radio element corresponding to the category
    for (let i = 0; i < selector.length; i++) {
        if (selector[i].value === category) {
            selector[i].checked = categoryFound = true;
            return;
        }
    }
    // If the category in the URL does not exist, use the first category as the default category. 
    if (!categoryFound) {
        const selector = document.querySelector('input[name="category"]');
        selector.checked = true;
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

    $(`<h5 id="${blockType}" style="word-wrap: break-word;">` + blockType.replace(/^[^_]*_/, "") + '</h5>').insertBefore(blockDivContainerRow);
    let tooltipBlock = null;
    // Search for the block using its type to find the tooltip
    for (let db in blocks) {
        if (blockType.includes('-') && blockType.includes(blocks[db].type)) { // for blocks with mutation like  logic_compare-eq and logic_operation-and
            tooltipBlock = blocks[db];
            break;
        } else if (blocks[db].type === blockType) {
            tooltipBlock = blocks[db];
            break;
        }
    }
    // Sometimes tooltips are generated dynamically by a function.
    if (typeof (tooltipBlock.tooltip) === 'function') tooltipBlock.tooltip = tooltipBlock.tooltip();

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

Blockly.Wiki.getTopBlock = function (blockDB_) {
    for (const db in blockDB_) return blockDB_[db];
};

Blockly.Wiki.domToWorkspace = function (xmlToLoad, previewWorkspace) {
    Blockly.Wiki.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(xmlToLoad, previewWorkspace);
};

Blockly.Wiki.loadBlock = function (blockType, searchMode = false) {
    return new Promise((resolve, reject) => {
        let blockXml = null;
        Blockly.Wiki.category = (searchMode ? '' : getParamValue('category'));
        if (Object.keys(Blockly.Wiki.custom_blocks).includes(Blockly.Wiki.category) && Object.keys(Blockly.Wiki.custom_blocks[Blockly.Wiki.category]).includes(blockType)) {
            blockXml = Blockly.Wiki.custom_blocks[Blockly.Wiki.category][blockType];
        } else {
            blockXml = ToolboxManager.getXmlByBlockType(blockType);
        }

        // block generation
        if (blockXml === null) {
            return reject();
        } else {
            const message = blockXml.match(/{([a-zA-Z0-9])+}/g);
            if (message !== null && typeof Blockly.MESSAGES !== 'undefined') { // Check for a Blockly message in the block
                const var_name = message[0].slice(1, -1);
                if (Object.keys(Blockly.MESSAGES).includes(var_name)) {
                    blockXml = blockXml.replace('{' + var_name + '}', Blockly.MESSAGES[var_name]);
                }
            }
            let xmlToLoad = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml">' + blockXml + '</xml>');
            Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);
            if (['arduino', 'mBot'].includes(INTERFACE_NAME)) { // Specific Xml for C++ interfaces
                let block = Blockly.Wiki.getTopBlock(Blockly.Wiki.previewWorkspace.blockDB_);
                const xmlToLoadStart = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="on_start"><statement name="DO">';
                const xmlToLoadEnd = '</statement></block></xml>';
                if (['io', 'logic', 'math', 'text', 'variables'].includes(Blockly.Wiki.category) && !BLOCKS_OUTSIDE_SCOPE.includes(blockType)) {
                    if ((block.previousConnection !== null && block.nextConnection !== null)) { // Some blocks need to be added to an on_start block to display the generated code
                        xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + blockXml + xmlToLoadEnd);
                    } else { // Some blocks need to be added to a variable and included in an on_start block to display the generated code
                        block.workspace.createVariable('variable');
                        xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + '<block type="variables_set"><field name="VAR">variable</field><value name="VALUE">' + blockXml + '</value></block>' + xmlToLoadEnd);
                    }
                } else if (['loops'].includes(Blockly.Wiki.category)) {
                    xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + blockXml + xmlToLoadEnd);
                } else if (['procedures'].includes(Blockly.Wiki.category)) {
                    switch (blockType) {
                        case 'procedures_callnoreturn':
                            xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + blockXml + xmlToLoadEnd);
                            break;
                        case 'procedures_callreturn':
                            xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + '<block type="variables_set"><field name="VAR">variable</field><value name="VALUE">' + blockXml + '</value></block>' + xmlToLoadEnd);
                            break;
                        case 'procedures_ifreturn-0':
                            xmlToLoad = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_defnoreturn"><mutation name="nom_de_la_fonction"></mutation><field name="NAME">nom_de_la_fonction</field><statement name="STACK">' + blockXml + '</statement></block></xml>');
                            break;
                        case 'procedures_ifreturn-1':
                            xmlToLoad = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_defreturn"><mutation name="nom_de_la_fonction"></mutation><field name="NAME">nom_de_la_fonction</field><statement name="STACK">' + blockXml + '</statement></block></xml>');
                            break;
                    }
                }
                Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);
            }
            // Display the code block
            const blockDivName = Blockly.Wiki.setWorkspaceBlock(blockType, Blockly.Wiki.previewWorkspace.blockDB_);
            const workspace = Blockly.inject(blockDivName,
                {
                    readOnly: true,
                    move: {
                        scrollbars: {
                            horizontal: true,
                            vertical: false
                        },
                        drag: false,
                        wheel: true
                    },
                    renderer: 'zelos'
                });
            workspace.clear();
            Blockly.Xml.domToWorkspace(xmlToLoad, workspace);
            workspace.setTheme(Blockly.Themes.ClassicBase);

            try {
                // Display the code block
                const codeBlock = (typeof Blockly.Python === 'undefined' ? Blockly.Arduino.workspaceToCode(workspace) : Blockly.Python.workspaceToCode(workspace));
                Blockly.Wiki.displayCodeBlock(blockDivName + "-container", (codeBlock !== undefined ? codeBlock : ''));

                // Add a button to copy the code
                const copyButton = document.createElement('button');
                copyButton.setAttribute('class', 'btn btn-copy');
                copyButton.setAttribute('id', blockDivName + '-copyButton');
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';

                // add it to the pre element in the block container
                document.querySelector('#' + blockDivName + '-container .code-container').appendChild(copyButton);

                // Apply the copyCodeBlock function to the button
                document.getElementById(blockDivName + '-copyButton').onclick = function (elem) {
                    copyBlockCode(elem);
                }
            } catch (e) {
                console.error(e);
            }
        }
        resolve();
    });
};

Blockly.Wiki.displayCodeBlock = async function (blockDivContainerId, code) {
    const codeDiv = document.createElement('pre');
    const codeContainerDiv = document.createElement('div');
    codeContainerDiv.setAttribute('class', 'code-container');
    codeContainerDiv.appendChild(codeDiv);

    // add default class
    codeDiv.setAttribute('class', 'wiki-codeblock');
    // add ID for specific block 
    codeDiv.setAttribute('id', blockDivContainerId + '-codeblock');

    const blockDivContainer = document.getElementById(blockDivContainerId);
    codeDiv.innerText = code;
    blockDivContainer.appendChild(codeContainerDiv);

    const editor = ace.edit(blockDivContainerId + "-codeblock");

    // Put ace in C++ mode
    editor.session.setMode("ace/mode/" + Blockly.Wiki.language);

    editor.setValue(code, -1)
    editor.setReadOnly(true);
    editor.setOptions({
        minLines: 10,
        maxLines: 100,
        fontSize: "12pt",
        wrapBehavioursEnabled: true,
        highlightActiveLine: false
    });

    // if we're in a C++ based language 
    if (Blockly.Wiki.language === "c_cpp") {
        // add a ace-ar class to get the right colors
        editor.container.classList.add("ace-ar");
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

Blockly.Wiki.createCategories = function () {
    const categorySelector = document.getElementById("radioContainer");
    // if radioContainer is not present, we don't need to create categories
    if (categorySelector === null) return;

    Blockly.Wiki.toolbox.categories.forEach(function (category) {
        if (category.kind === "category") {
            const radio = document.createElement("input");
            const label = document.createElement("label");
            // Add the name, type, value and classes
            radio.type = "radio";
            radio.name = "category";
            radio.value = category.toolboxitemid;
            label.className = "category";
            // Take the category style from the toolbox declaration
            // Replace "_category" by "_blocks" to find the block style 
            // thus: "display_category" becomes "display_blocks"
            const categoryStyle = category.style.replace("_category", "_blocks");
            label.style.setProperty("--_color", Blockly.Wiki.toolbox.theme[categoryStyle]["colourPrimary"]);
            // also add it to the body as a variable so that we can use it in the CSS
            document.body.style.setProperty("--_current-color", Blockly.Wiki.toolbox.theme[categoryStyle]["colourPrimary"]);

            // check if the category exists in the TOOLBOXES_SVGS variable
            if (typeof TOOLBOXES_SVGS !== 'undefined' && Object.keys(TOOLBOXES_SVGS).includes(category.style)) {
                // if it does, add the SVG to the label
                label.innerHTML += `<i>${TOOLBOXES_SVGS[category.style]}</i>`;
            } else {
                const categoryIcon = category.cssConfig.icon;
                label.innerHTML += `<i class="${categoryIcon}"></i>`;
            }

            label.innerHTML += Blockly.Wiki.getCategoryName(category.name);
            // Put the radio into the label, into the container, into the selector
            label.appendChild(radio);
            categorySelector.appendChild(label);
        }
    });
    // event listener for radio buttons
    const radios = document.querySelectorAll('input[name="category"]');
    radios.forEach(
        function (radio) {
            radio.addEventListener('change', async function () {
                await Blockly.Wiki.showCategoryContent();
            });
        }
    );
};

Blockly.Wiki.showCategoryContent = function () {
    return new Promise(async (resolve, reject) => {
        try {
            $("#blocks").empty();
                // Check the value of the radio button
                const selector = document.querySelector('input[name="category"]:checked');
                const value = selector.value;
                // let numberOfBlocksToBeLoaded = 0;
                // let numberOfBlocksLoaded = 0;
                // Change the category title
                const categoryTitleSelector = document.querySelector('#category-title');
                let newTitle = selector.parentNode.innerHTML.replace('<span>', '<span class="ms-2">').replace(/<input.*?>/g, '');
                if (newTitle.includes('<i>')) newTitle = newTitle.replace('<i>', '<i class="svgIcon">');
                categoryTitleSelector.innerHTML = newTitle;
                categoryTitleSelector.style.color = selector.parentNode.style.getPropertyValue('--_color');
                Blockly.Wiki.setUrlParameters('category', value);
                // Remove selected class from all labels
                document.querySelectorAll('input[name="category"]').forEach(function (radio) {
                    radio.parentElement.classList.remove("category-selected");
                });
                // Add selected class to the label for styling
                document.querySelector('input[name="category"]:checked').parentElement.classList.add("category-selected");
                if (value == "variables" || value == "procedures") {
                    // numberOfBlocksToBeLoaded = Blockly.Wiki.custom_blocks[value].length;
                    for (const blockType in Blockly.Wiki.custom_blocks[value]) {
                        // await Blockly.Wiki._updateProgressBar(numberOfBlocksLoaded / numberOfBlocksToBeLoaded);
                        await Blockly.Wiki.loadBlock(blockType);
                        // numberOfBlocksLoaded += 1;
                    }
                } else {
                    const subcategories = Blockly.Wiki.toolbox.content[value];
                    // numberOfBlocksToBeLoaded = subcategories.reduce((count, category) => {
                    //     return count + category.blocks.length;
                    // }, 0);
                    for (let subcategorie in subcategories) {
                        for (let block in subcategories[subcategorie].blocks) {
                            await new Promise(resolve => setTimeout(resolve, 0));
                            const blockType = subcategories[subcategorie].blocks[block];
                            await Blockly.Wiki.loadBlock(blockType);
                            // numberOfBlocksLoaded += 1;
                        }
                    }
                }
            resolve();

        } catch (error) {
            reject();
            console.error(error);
        }
    });
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
    let tooltip = new bootstrap.Tooltip(event.target, {
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