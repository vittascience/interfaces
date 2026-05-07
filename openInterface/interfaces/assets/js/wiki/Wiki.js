'use strict';

Blockly.Wiki = Object.create(null);

Blockly.Wiki.init = async function (categoryId) {
    Blockly.Wiki.url = new URL(window.location.href);
    Blockly.Wiki.setUrlParameters('interface', INTERFACE_NAME);
    Blockly.Wiki.previewWorkspace = Blockly.inject('previewBlocklyDiv', { renderer: 'zelos' });
    Blockly.Wiki.toolboxMode = Blockly.Constants.getToolboxStyle();
    Blockly.Wiki.toolbox = ToolboxManager.toolboxDefined(Blockly.Wiki.toolboxMode);
    Blockly.Wiki.blockDB = ToolboxManager.DB_.get();
    ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION = true;
    ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION = true;
    Blockly.Wiki.anchorLoaded = undefined;
    Blockly.Wiki.currentLoadingId = null;
    Blockly.Wiki.isLoading = false;
    Blockly.Wiki.blockCache = new Map(); // Cache pour les workspaces déjà créés
    Blockly.Wiki.errorNotif = new VittaNotif(5);
    Blockly.Wiki.createCategories();
    Blockly.Wiki.changeCategory(categoryId);
    if (window.location.hash) {
        Blockly.Wiki.anchorLoaded = false;
        Blockly.Wiki.blocker = new VittaBlocker(undefined, '#wiki-content', undefined, `${CDN_PATH}/public/content/img/loader.gif`);
    }
    // Ace editor color syntax
    Blockly.Wiki.inoInterfaces = ["arduino", "mBot"];
    Blockly.Wiki.language = (Blockly.Wiki.inoInterfaces.includes(INTERFACE_NAME) ? "c_cpp" : "python");
    await Blockly.Wiki.showCategoryContent();

    if (window.location.hash) {
        const blockType = window.location.hash.substring(1).replace("Div-container", "");
        const subCatId = Blockly.Wiki.url.searchParams.get('subcategory') || Blockly.Wiki.getSubCat(blockType);
        if (subCatId) {
            await sleep_ms(500)
            Blockly.Wiki.changeCategory(subCatId);
            await Blockly.Wiki.showCategoryContent();
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

// Méthode pour obtenir un bloc depuis le cache
Blockly.Wiki.getBlockFromCache = function (blockType, categoryId) {
    const cacheKey = `${categoryId}_${blockType}`;
    return Blockly.Wiki.blockCache.get(cacheKey);
};

// Méthode pour sauvegarder un bloc dans le cache
Blockly.Wiki.saveBlockToCache = function (blockType, categoryId, blockData) {
    const cacheKey = `${categoryId}_${blockType}`;
    Blockly.Wiki.blockCache.set(cacheKey, {
        blockType,
        html: blockData.html, // Sauvegarder le HTML complet au lieu de recréer
        code: blockData.code,
        timestamp: Date.now()
    });
};

// Méthode pour vider le cache (optionnel, utile pour le debug)
Blockly.Wiki.clearCache = function () {
    Blockly.Wiki.blockCache.clear();
};

// Méthode pour obtenir les statistiques du cache (optionnel, utile pour le debug)
Blockly.Wiki.getCacheStats = function () {
    return {
        size: Blockly.Wiki.blockCache.size,
        entries: Array.from(Blockly.Wiki.blockCache.keys())
    };
};

// Méthode pour vérifier si une catégorie entière est en cache
Blockly.Wiki.isCategoryInCache = function (categoryId, blocksList) {
    return blocksList.every(blockType => {
        const cacheKey = `${categoryId}_${blockType}`;
        return Blockly.Wiki.blockCache.has(cacheKey);
    });
};

// Fonction optimisée pour créer le DOM d'un bloc
Blockly.Wiki.createBlockDOM = function (blockType, blockDivName, topBlock) {
    const blockDivContainer = document.createElement('div');
    blockDivContainer.id = blockDivName + "-container";
    blockDivContainer.className = 'block-container mt-4 mb-4';

    const blockDivContainerRow = document.createElement('div');
    blockDivContainerRow.className = 'block-container-row';

    const blockDiv = document.createElement('div');
    blockDiv.id = blockDivName;
    blockDiv.className = 'blocklyBlockCanvas';
    blockDiv.style.cssText = `height: ${topBlock.height * 1.4 + 10}px; width: ${topBlock.width * 1.2}px;`;

    const downloadBlockBtn = document.createElement('button');
    downloadBlockBtn.id = blockDivName + "DownloadBtn";
    downloadBlockBtn.className = 'btn btn-download-block btn-sm mt-2 mb-2 ml-2 mr-2';
    downloadBlockBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBlockBtn.addEventListener('click', function () {
        html2canvas(document.querySelector("#" + blockDivName)).then(canvas => {
            const link = document.createElement('a');
            link.download = blockType + '.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    blockDivContainerRow.appendChild(blockDiv);
    blockDivContainerRow.appendChild(downloadBlockBtn);
    blockDivContainer.appendChild(blockDivContainerRow);

    return { blockDivContainer, blockDivContainerRow };
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

Blockly.Wiki.loadBlock = function (blockType, searchMode = false, loadingId = null) {
    return new Promise((resolve, reject) => {
        // Vérifier si c'est toujours le bon chargement
        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            return resolve();
        }

        const currentCategory = (searchMode ? '' : getParamValue('category'));

        // Vérifier le cache d'abord
        const cachedBlock = Blockly.Wiki.getBlockFromCache(blockType, currentCategory);
        if (cachedBlock) {
            // Rendu ultra-rapide depuis le cache HTML
            Blockly.Wiki.renderCachedBlockFast(cachedBlock, blockType, loadingId)
                .then(resolve)
                .catch(reject);
            return;
        }

        // Si pas dans le cache, charger normalement
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

        let xmlToLoad = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml">' + blockXml + '</xml>');
        Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);

        if (['arduino', 'mBot'].includes(INTERFACE_NAME)) {
            let block = Blockly.Wiki.getTopBlock(Blockly.Wiki.previewWorkspace.blockDB_);
            const xmlToLoadStart = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="on_start"><statement name="DO">';
            const xmlToLoadEnd = '</statement></block></xml>';

            if (['display', 'io', 'communication', 'sensors', 'actuators', 'logic', 'math', 'text', 'variables'].includes(Blockly.Wiki.category) &&
                !BLOCKS_OUTSIDE_SCOPE.includes(blockType)) {
                if ((block.previousConnection !== null && block.nextConnection !== null)) {
                    xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + blockXml + xmlToLoadEnd);
                } else {
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
            } else if (['network'].includes(Blockly.Wiki.category) && !BLOCKS_OUTSIDE_SCOPE.includes(blockType)) {
                if ((block.previousConnection !== null && block.nextConnection !== null)) {
                    if (Blockly.Constants.HTML_BLOCKS.includes(blockType)) {
                        xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + '<block type="network_server_sendWebPage"><statement name="BODY">' + blockXml + '</statement></block>' + xmlToLoadEnd);
                    } else {
                        xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + blockXml + xmlToLoadEnd);
                    }
                } else {
                    block.workspace.createVariable('variable');
                    xmlToLoad = Blockly.Xml.textToDom(xmlToLoadStart + '<block type="variables_set"><field name="VAR">variable</field><value name="VALUE">' + blockXml + '</value></block>' + xmlToLoadEnd);
                }
            }
            Blockly.Wiki.domToWorkspace(xmlToLoad, Blockly.Wiki.previewWorkspace);
        }

        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            return resolve();
        }

        const blockDivName = Blockly.Wiki.setWorkspaceBlock(blockType, Blockly.Wiki.previewWorkspace.blockDB_);

        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
            const element = document.getElementById(blockDivName + "-container");
            if (element) element.remove();
            return resolve();
        }

        const workspace = Blockly.inject(blockDivName, {
            readOnly: true,
            move: {
                scrollbars: { horizontal: true, vertical: false },
                drag: false,
                wheel: true
            },
            renderer: 'zelos'
        });

        workspace.clear();
        Blockly.Xml.domToWorkspace(xmlToLoad, workspace);
        workspace.setTheme(Blockly.Themes.ClassicBase);

        try {
            const codeBlock = (typeof Blockly.Python === 'undefined' ?
                Blockly.Arduino.workspaceToCode(workspace) :
                Blockly.Python.workspaceToCode(workspace));

            Blockly.Wiki.displayCodeBlock(blockDivName + "-container", (codeBlock !== undefined ? codeBlock : ''));

            const copyButton = document.createElement('button');
            copyButton.setAttribute('class', 'btn btn-copy');
            copyButton.setAttribute('id', blockDivName + '-copyButton');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';

            document.querySelector('#' + blockDivName + '-container .code-container').appendChild(copyButton);
            document.getElementById(blockDivName + '-copyButton').onclick = function (elem) {
                copyBlockCode(elem);
            }

            // Sauvegarder le HTML complet dans le cache pour un rendu ultra-rapide
            const containerElement = document.getElementById(blockDivName + "-container");
            if (containerElement) {
                Blockly.Wiki.saveBlockToCache(blockType, currentCategory, {
                    html: containerElement.cloneNode(true),
                    code: codeBlock
                });
            }
        } catch (e) {
            console.error(e);
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

Blockly.Wiki.renderCachedBlock = function (cachedBlock, blockType, loadingId) {
    return new Promise((resolve, reject) => {
        try {
            if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
                return resolve();
            }

            // Recréer le workspace et le DOM à partir du cache
            Blockly.Wiki.domToWorkspace(cachedBlock.xmlToLoad, Blockly.Wiki.previewWorkspace);

            const blockDivName = Blockly.Wiki.setWorkspaceBlock(blockType, Blockly.Wiki.previewWorkspace.blockDB_);

            if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
                const element = document.getElementById(blockDivName + "-container");
                if (element) element.remove();
                return resolve();
            }

            const workspace = Blockly.inject(blockDivName, {
                readOnly: true,
                move: {
                    scrollbars: { horizontal: true, vertical: false },
                    drag: false,
                    wheel: true
                },
                renderer: 'zelos'
            });

            workspace.clear();
            Blockly.Xml.domToWorkspace(cachedBlock.xmlToLoad, workspace);
            workspace.setTheme(Blockly.Themes.ClassicBase);

            // Utiliser le code mis en cache
            Blockly.Wiki.displayCodeBlock(blockDivName + "-container", cachedBlock.code || '');

            const copyButton = document.createElement('button');
            copyButton.setAttribute('class', 'btn btn-copy');
            copyButton.setAttribute('id', blockDivName + '-copyButton');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';

            document.querySelector('#' + blockDivName + '-container .code-container').appendChild(copyButton);
            document.getElementById(blockDivName + '-copyButton').onclick = function (elem) {
                copyBlockCode(elem);
            }

            resolve();
        } catch (e) {
            console.error('Error rendering cached block:', e);
            reject(e);
        }
    });
};

Blockly.Wiki.renderCachedBlockFast = function (cachedBlock, blockType, loadingId) {
    return new Promise((resolve, reject) => {
        try {
            if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) {
                return resolve();
            }

            const blocksDiv = document.getElementById('blocks');
            if (!blocksDiv) {
                return reject('blocks container not found');
            }

            // Cloner le HTML depuis le cache et l'insérer directement
            const clonedElement = cachedBlock.html.cloneNode(true);
            blocksDiv.appendChild(clonedElement);

            // Réactiver le bouton de copie
            const blockDivName = blockType + "Div";
            const copyButton = document.getElementById(blockDivName + '-copyButton');
            if (copyButton) {
                copyButton.onclick = function (elem) {
                    copyBlockCode(elem);
                };
            }

            // Réactiver le bouton de téléchargement
            const downloadButton = document.getElementById(blockDivName + 'DownloadBtn');
            if (downloadButton) {
                downloadButton.onclick = function () {
                    html2canvas(document.querySelector("#" + blockDivName)).then(canvas => {
                        const link = document.createElement('a');
                        link.download = blockType + '.png';
                        link.href = canvas.toDataURL();
                        link.click();
                    });
                };
            }

            // Réinitialiser l'éditeur Ace
            let codeBlockId = `${clonedElement.id}-codeblock`;

            // Fallback au cas où (si le DOM a évolué)
            if (!document.getElementById(codeBlockId)) {
                const pre = clonedElement.querySelector('pre.wiki-codeblock');
                if (pre && pre.id) codeBlockId = pre.id;
            }

            if (!document.getElementById(codeBlockId)) {
                return reject(`Ace target not found: ${codeBlockId}`);
            }

            const editor = ace.edit(codeBlockId);
            editor.session.setMode("ace/mode/" + Blockly.Wiki.language);
            editor.setValue(cachedBlock.code || '', -1);
            editor.setReadOnly(true);
            editor.setOptions({
                minLines: 10,
                maxLines: 100,
                fontSize: "12pt",
                wrapBehavioursEnabled: true,
                highlightActiveLine: false
            });

            if (Blockly.Wiki.language === "c_cpp") {
                editor.container.classList.add("ace-ar");
            }

            resolve();
        } catch (e) {
            console.error('Error rendering cached block:', e);
            reject(e);
        }
    });
};

// Fonction pour charger les blocs par batch
Blockly.Wiki.loadBlocksBatch = async function (blockTypes, searchMode = false, loadingId = null, batchSize = 5) {
    let loadedBlocks = 0;

    const yieldToBrowser = async () => {
        // 1 frame minimum pour laisser le browser peindre
        await new Promise(r => requestAnimationFrame(r));
    };

    await yieldToBrowser();

    for (let i = 0; i < blockTypes.length; i += batchSize) {
        if (loadingId && Blockly.Wiki.currentLoadingId !== loadingId) return;

        const batch = blockTypes.slice(i, i + batchSize);

        // Charge le batch (DOM lourd)
        await Promise.all(batch.map(blockType => Blockly.Wiki.loadBlock(blockType, searchMode, loadingId)));

        loadedBlocks += batch.length;
        await yieldToBrowser();

        // Petit délai seulement si pas full cache (optionnel)
        const currentCategory = searchMode ? '' : getParamValue('category');
        const allCached = batch.every(blockType => Blockly.Wiki.blockCache.has(`${currentCategory}_${blockType}`));
        if (!allCached) {
            await new Promise(r => setTimeout(r, 5));
            await yieldToBrowser();
        }
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
    // Add the name, type, value and classes
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
    label.style.setProperty("--_color", Blockly.Wiki.toolbox.theme[categoryStyle]["colourPrimary"]);
    if (parentCat) {
        label.style.setProperty("display", 'none');
    }
    // also add it to the body as a variable so that we can use it in the CSS
    document.body.style.setProperty("--_current-color", Blockly.Wiki.toolbox.theme[categoryStyle]["colourPrimary"]);
    // check if the category exists in the TOOLBOXES_SVGS variable
    if (typeof TOOLBOXES_SVGS !== 'undefined' && Object.keys(TOOLBOXES_SVGS).includes(category.style)) {
        // if it does, add the SVG to the label
        label.innerHTML += `<i>${TOOLBOXES_SVGS[category.style]}</i>`;
    } else if (parentCat && typeof TOOLBOXES_SVGS !== 'undefined' && Object.keys(TOOLBOXES_SVGS).includes(category.toolboxitemid + '_subcategory')) {
        label.innerHTML += `<i>${TOOLBOXES_SVGS[category.toolboxitemid + '_subcategory']}</i>`;
    } else {
        const categoryIcon = category.cssConfig.icon;
        label.innerHTML += `<i class="${categoryIcon}"></i>`;
    }

    label.innerHTML += Blockly.Wiki.getCategoryName(category.name);
    // Put the radio into the label, into the container, into the selector
    label.appendChild(radio);
    return label;
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
            const catSelector = Blockly.Wiki.createCat(category);
            toolboxMenu.appendChild(catSelector);
            if (Blockly.Wiki.toolbox.subcategories) {
                const subcat = Blockly.Wiki.toolbox.subcategories[category.toolboxitemid];
                if (subcat) {
                    for (const cat of subcat) {
                        if (ToolboxManager.hasToBeAdded(cat)) {
                            toolboxMenu.appendChild(Blockly.Wiki.createCat(cat, category.toolboxitemid));
                        }
                    }
                }
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
                    await Blockly.Wiki.showCategoryContent();
                } else {
                    if (Blockly.Wiki.toolbox.subcategories && Blockly.Wiki.toolbox.subcategories[Blockly.Wiki.currentCategoryShow]) {
                        Blockly.Wiki.setUrlParameters('subcategory', null);
                        await Blockly.Wiki.showCategoryContent();
                    }
                }
            });
        }
    );
};

Blockly.Wiki.showCategoryContent = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const loadingId = Date.now() + Math.random();
            Blockly.Wiki.currentLoadingId = loadingId;
            Blockly.Wiki.isLoading = true;

            $("#blocks").empty();

            const radio = document.querySelector('input[name="category"]:checked');
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
                Blockly.Wiki.isLoading = false;
                resolve();
            } else {
                // Collecter tous les blocs à charger
                let allBlocks = [];

                if (radio.value == "variables" || radio.value == "procedures") {
                    allBlocks = Object.keys(Blockly.Wiki.custom_blocks[radio.value]);
                } else {
                    let subcategories = Blockly.Wiki.toolbox.content[radio.value];
                    if (radio.classList.contains('isChildCat')) {
                        let catContent;
                        for (const id in Blockly.Wiki.toolbox.content) {
                            const cat = Blockly.Wiki.toolbox.content[id];
                            if (Array.isArray(cat)) {
                                for (const subcat of cat) {
                                    if (subcat.subCategoryId === radio.value) {
                                        catContent = cat;
                                        break;
                                    }
                                }
                            }
                            if (catContent) break;
                        }
                        if (catContent) {
                            subcategories = catContent.find(subcat => subcat.subCategoryId === radio.value).contents;
                        }
                    }
                    if (subcategories) {
                        for (const subcat of subcategories) {
                            if (ToolboxManager.hasToBeAdded(subcat)) {
                                if (typeof subcat.blocks !== 'undefined') {
                                    allBlocks.push(...subcat.blocks);
                                }
                            }
                        }
                    }
                }

                // Vérifier si toute la catégorie est déjà en cache
                const categoryInCache = Blockly.Wiki.isCategoryInCache(radio.value, allBlocks);

                if (categoryInCache) {
                    // Chargement depuis le cache - batch size plus grand
                    console.log('Loading from cache for category:', radio.value);
                    await Blockly.Wiki.loadBlocksBatch(allBlocks, false, loadingId, 15); // 15 blocs à la fois depuis le cache
                } else {
                    // Chargement normal
                    console.log('Loading fresh data for category:', radio.value);
                    await Blockly.Wiki.loadBlocksBatch(allBlocks, false, loadingId, 5);
                }

                Blockly.Wiki.isLoading = false;
                resolve();
            }
        } catch (error) {
            Blockly.Wiki.isLoading = false;
            reject();
            console.error(error);
        }
    });
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