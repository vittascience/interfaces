function replaceXmlCode(to, xmlString = null) {
    let workspaceXml = null;
    let xmlToLoad = null;
    if (xmlString !== null) {
        workspaceXml = Blockly.Xml.textToDom(xmlString);
        xmlToLoad = xmlString;
    } else {
        workspaceXml = Blockly.Xml.workspaceToDom(Main.getWorkSpace());
        xmlToLoad = Blockly.Xml.domToText(workspaceXml);
    }
    if ((typeof TOOLBOX_STYLE_SCRATCH != 'undefined' && to == TOOLBOX_STYLE_SCRATCH) || (typeof TOOLBOX_STYLE_TI != 'undefined' && to == TOOLBOX_STYLE_TI) || (typeof TOOLBOX_STYLE_HARDWARE != 'undefined' && to == TOOLBOX_STYLE_HARDWARE)) {
        let isNotScratch = !/type=\"scratch_on_start\"/.test(xmlToLoad);
        if (isNotScratch) {
            xmlToLoad = adaptVittascienceToScratch(workspaceXml);
        }
    } else {
        let isNotVitta = !/type=\"on_start\"/.test(xmlToLoad);
        if (isNotVitta) {
            xmlToLoad = adaptScratchToVittascience(workspaceXml);
        }
    }
    return xmlToLoad;
};

function adaptVittascienceToScratch(workspaceXml) {
    // Créer un nouveau document XML propre
    const newXml = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>');
    
    let user_start = null;
    let user_variables = null;
    const user_forever = [];
    const user_functions = [];

    // 1. Identifier les différents éléments
    for (let i = 0; i < workspaceXml.childNodes.length; i++) {
        const n = workspaceXml.childNodes[i];
        if (n.nodeType !== 1) continue; // Ignorer les noeuds non-éléments
        
        const h = n.outerHTML || '';
        if (n.tagName === 'variables') {
            user_variables = n;
        } else if (/type="on_start"/.test(h)) {
            user_start = n;
        } else if (/type="forever"/.test(h)) {
            user_forever.push(n);
        } else {
            user_functions.push(n);
        }
    }

    // 2. Ajouter les variables en premier
    if (user_variables) {
        newXml.appendChild(user_variables.cloneNode(true));
    }

    // 3. Traiter le bloc on_start
    if (user_start) {
        const startClone = user_start.cloneNode(true);
        startClone.setAttribute('type', 'scratch_on_start');
        
        // Si le on_start a un statement DO, le convertir en next
        const statementDo = startClone.querySelector('statement[name="DO"]');
        if (statementDo) {
            const nextElement = newXml.ownerDocument.createElement('next');
            while (statementDo.firstChild) {
                nextElement.appendChild(statementDo.firstChild);
            }
            startClone.appendChild(nextElement);
            startClone.removeChild(statementDo);
        }
        
        newXml.appendChild(startClone);
    }

    // 4. Chaîner les blocs forever après le on_start
    if (user_forever.length > 0) {
        const onStartBlock = newXml.querySelector('block[type="scratch_on_start"]');
        if (onStartBlock) {
            let currentBlock = onStartBlock;
            
            // Trouver le dernier bloc dans la chaîne
            while (currentBlock.querySelector('next > block')) {
                currentBlock = currentBlock.querySelector('next > block');
            }
            
            // Ajouter chaque forever à la suite
            user_forever.forEach((foreverBlock) => {
                const foreverClone = foreverBlock.cloneNode(true);
                foreverClone.setAttribute('type', 'scratch_forever');
                
                // Créer l'élément next
                const nextElement = newXml.ownerDocument.createElement('next');
                nextElement.appendChild(foreverClone);
                
                currentBlock.appendChild(nextElement);
                currentBlock = foreverClone;
            });
        }
    }

    // 5. Ajouter les fonctions (en convertissant les forever internes)
    user_functions.forEach(n => {
        const functionClone = n.cloneNode(true);
        
        // Convertir les forever internes en scratch_forever
        const foreverBlocks = functionClone.querySelectorAll('block[type="forever"]');
        foreverBlocks.forEach(block => {
            block.setAttribute('type', 'scratch_forever');
        });
        
        newXml.appendChild(functionClone);
    });
    
    return Blockly.Xml.domToText(newXml);
};

function gettingOnStartBlocks(children) {
    const XMLCode = {
        "childNode": children,
        "blockCode": null,
    }
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName == "next") {
            let outerCode = children[i].childNodes[0].outerHTML;
            XMLCode.blockCode = outerCode
            XMLCode.childNode = children[i].childNodes[0].childNodes
        } else if (i == children.length - 1) {
            XMLCode.childNode = null;
        }
    }
    return XMLCode;
};

function adaptScratchToVittascience(workspaceXml) {
    const xml = Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>');

    let userStart = null;
    let userVariables = null;
    const userFunctions = [];

    const HORIZONTAL_STEP = 200;
    const VERTICAL_PRIORITY_STEP = 28;
    const FOREVER_OFFSET_X = 524;
    const FOREVER_OFFSET_Y = -25;

    const isElement = (node) => node && node.nodeType === 1;
    const getType = (node) => isElement(node) ? node.getAttribute('type') : null;
    const parseCoord = (value, fallback = 0) => {
        const n = parseInt(value, 10);
        return Number.isFinite(n) ? n : fallback;
    };

    function getDirectChild(node, tagName) {
        return Array.from(node.childNodes).find(
            (child) => isElement(child) && child.tagName === tagName
        ) || null;
    }

    function getDirectNextBlock(block) {
        const next = getDirectChild(block, 'next');
        if (!next) return null;
        return Array.from(next.childNodes).find(
            (child) => isElement(child) && child.tagName === 'block'
        ) || null;
    }

    function removeDirectChildren(node, tagName) {
        Array.from(node.childNodes)
            .filter((child) => isElement(child) && child.tagName === tagName)
            .forEach((child) => node.removeChild(child));
    }

    function cloneWithoutDirectNext(block) {
        const clone = block.cloneNode(true);
        removeDirectChildren(clone, 'next');
        return clone;
    }

    function appendNext(parentBlock, childBlock) {
        const next = xml.ownerDocument.createElement('next');
        next.appendChild(childBlock);
        parentBlock.appendChild(next);
    }

    function appendChainToStatement(statement, blocks) {
        if (!blocks.length) return;
        statement.appendChild(blocks[0]);
        let current = blocks[0];
        for (let i = 1; i < blocks.length; i++) {
            appendNext(current, blocks[i]);
            current = blocks[i];
        }
    }

    function ensureWhileShape(block) {
        if (!block || getType(block) !== 'scratch_forever') return;

        block.setAttribute('type', 'controls_whileUntil');

        const elementChildren = Array.from(block.childNodes).filter(isElement);
        const hasModeField = elementChildren.some(
            (child) => child.tagName === 'field' && child.getAttribute('name') === 'MODE'
        );
        const hasBoolValue = elementChildren.some(
            (child) => child.tagName === 'value' && child.getAttribute('name') === 'BOOL'
        );

        if (!hasModeField) {
            const field = xml.ownerDocument.createElement('field');
            field.setAttribute('name', 'MODE');
            field.textContent = 'WHILE';
            block.insertBefore(field, elementChildren[0] || null);
        }

        if (!hasBoolValue) {
            const value = xml.ownerDocument.createElement('value');
            value.setAttribute('name', 'BOOL');

            const boolBlock = xml.ownerDocument.createElement('block');
            boolBlock.setAttribute('type', 'logic_boolean');

            const boolField = xml.ownerDocument.createElement('field');
            boolField.setAttribute('name', 'BOOL');
            boolField.textContent = 'TRUE';

            boolBlock.appendChild(boolField);
            value.appendChild(boolBlock);

            const statementDo = elementChildren.find(
                (child) => child.tagName === 'statement' && child.getAttribute('name') === 'DO'
            );
            block.insertBefore(value, statementDo || null);
        }
    }

    function convertNestedScratchForever(root) {
        if (!root || !root.querySelectorAll) return;
        if (getType(root) === 'scratch_forever') ensureWhileShape(root);
        root.querySelectorAll('block[type="scratch_forever"]').forEach(ensureWhileShape);
    }

    function appendDisabledBlock(block) {
        if (!block) return;
        const clone = block.cloneNode(true);
        convertNestedScratchForever(clone);
        clone.setAttribute('disabled', 'true');
        xml.appendChild(clone);

        if (typeof InterfaceMonitor !== 'undefined' && InterfaceMonitor.writeConsole) {
            InterfaceMonitor.writeConsole("Certains blocs n'ont pas pu être convertis au style Vittascience.\n");
        }
    }

    // 1) Séparer variables / start / autres blocs top-level
    for (const node of Array.from(workspaceXml.childNodes)) {
        if (!isElement(node)) continue;

        if (node.tagName === 'variables') {
            userVariables = node;
        } else if (getType(node) === 'scratch_on_start') {
            userStart = node;
        } else {
            userFunctions.push(node);
        }
    }

    // 2) Variables
    if (userVariables) {
        xml.appendChild(userVariables.cloneNode(true));
    }

    let baseForeverX = 300;
    let baseForeverY = 0;

    // 3) scratch_on_start -> on_start + forevers top-level
    if (userStart) {
        const startX = parseCoord(userStart.getAttribute('x'));
        const startY = parseCoord(userStart.getAttribute('y'));

        baseForeverX = startX + FOREVER_OFFSET_X;
        baseForeverY = startY + FOREVER_OFFSET_Y;

        const startClone = userStart.cloneNode(false);
        startClone.setAttribute('type', 'on_start');
        removeDirectChildren(startClone, 'next');
        removeDirectChildren(startClone, 'statement');

        const startChain = [];
        const forevers = [];

        let current = getDirectNextBlock(userStart);

        while (current) {
            if (getType(current) === 'scratch_forever') {
                let cursor = current;
                while (cursor && getType(cursor) === 'scratch_forever') {
                    forevers.push(cursor);
                    cursor = getDirectNextBlock(cursor);
                }
                if (cursor) appendDisabledBlock(cursor);
                break;
            }

            const clone = cloneWithoutDirectNext(current);
            convertNestedScratchForever(clone);
            startChain.push(clone);
            current = getDirectNextBlock(current);
        }

        if (startChain.length) {
            const statement = xml.ownerDocument.createElement('statement');
            statement.setAttribute('name', 'DO');
            appendChainToStatement(statement, startChain);
            startClone.appendChild(statement);
        }

        xml.appendChild(startClone);

        forevers.forEach((scratchForever, index) => {
            const foreverClone = cloneWithoutDirectNext(scratchForever);
            foreverClone.setAttribute('type', 'forever');

            const deletable = scratchForever.getAttribute('deletable');
            if (deletable !== null) foreverClone.setAttribute('deletable', deletable);

            foreverClone.setAttribute('x', String(baseForeverX + index * HORIZONTAL_STEP));
            foreverClone.setAttribute('y', String(baseForeverY + index * VERTICAL_PRIORITY_STEP));

            xml.appendChild(foreverClone);
        });
    }

    // 4) Autres blocs top-level
    userFunctions.forEach((node, index) => {
        const clone = node.cloneNode(true);

        if (getType(clone) === 'scratch_forever') {
            clone.setAttribute('type', 'forever');
            clone.setAttribute('x', String(parseCoord(clone.getAttribute('x'), baseForeverX) + index * HORIZONTAL_STEP));
            clone.setAttribute('y', String(parseCoord(clone.getAttribute('y'), baseForeverY) + index * VERTICAL_PRIORITY_STEP));
        } else {
            convertNestedScratchForever(clone);
        }

        xml.appendChild(clone);
    });

    return Blockly.Xml.domToText(xml);
};

function searchingNextBlocks(children) {
    const XMLCode = {
        "childNode": children,
        "nextBlocksCode": null,
        "foreverCode": null,
        "statementCode": null
    }

    for (var j = 0; j < XMLCode.childNode.length; j++) {
        if (XMLCode.childNode[j].tagName == 'next') {
            XMLCode.nextBlocksCode = XMLCode.childNode[j].innerHTML;
        }
    }

    while (true) {
        for (var j = 0; j < XMLCode.childNode.length; j++) {
            if (XMLCode.childNode[j].tagName == 'next') {
                if (XMLCode.childNode[j].innerHTML.substring(0, 29) == '<block type="scratch_forever"') {
                    // if next block is 'scratch_forever' type
                    XMLCode.nextBlocksCode = XMLCode.nextBlocksCode.replace(XMLCode.childNode[j].innerHTML, '');
                    let foreverBlock = XMLCode.childNode[j].childNodes[0];
                    XMLCode.foreverCode = foreverBlock.outerHTML.replace(foreverBlock.innerHTML, '');
                    if (foreverBlock.firstChild) {
                        if (foreverBlock.firstChild.tagName == 'statement') {
                            XMLCode.statementCode = foreverBlock.firstChild.outerHTML;
                        }
                        // return next block node if 'scratch_forever' has next blocks
                        XMLCode.childNode = XMLCode.childNode[j].firstChild.childNodes;
                    } else {
                        // return null in order to break 'forever' adder
                        XMLCode.childNode = null;
                    }
                    return XMLCode;
                } else {
                    // continue loop if next block is not 'scratch_forever' block
                    XMLCode.childNode = XMLCode.childNode[j].firstChild.childNodes;
                    if (XMLCode.childNode.length == 0) {
                        // return null in order to break 'forever' adder
                        XMLCode.childNode = null;
                        return XMLCode;
                    }
                }
            } else if (j == XMLCode.childNode.length - 1) {
                // if any 'scratch_forever' node doesn't exist
                if (XMLCode.nextBlocksCode !== null) {
                    XMLCode.nextBlocksCode = XMLCode.nextBlocksCode.replace(XMLCode.childNode[j].outerHTML, '');
                }
                // return null in order to break 'forever' adder
                XMLCode.childNode = null;
                return XMLCode;
            }
        }
    }
};