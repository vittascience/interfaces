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
    if ((typeof TOOLBOX_STYLE_SCRATCH != 'undefined' && to == TOOLBOX_STYLE_SCRATCH) || (typeof TOOLBOX_STYLE_TI != 'undefined' && to == TOOLBOX_STYLE_TI)) {
        let isNotScratch = !/type=\"scratch_on_start\"/.test(xmlToLoad);
        if (isNotScratch) {
            xmlToLoad = adaptVittascienceToScratch(workspaceXml);
        }
    } else {
        let isNotVitta = !/type=\"on_start\"/.test(xmlToLoad)
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
    var user_start = null;
    var user_functions = [];
    var user_variables = null;
    var start_pos = [0, 0];

    // Get scratch_on_start node, variables stack and user functions
    for (var i = 0; i < workspaceXml.childNodes.length; i++) {
        const block = workspaceXml.childNodes[i]
        if (/type=\"scratch_on_start\"/.test(block.outerHTML)) {
            user_start = block
        } else if (/<variables>/.test(block.outerHTML)) {
            user_variables = block;
        } else {
            user_functions.push(block);
        }
    }

    // add user variables to workspace xml
    if (user_variables !== null) {
        xml.appendChild(user_variables);
    }

    if (user_start !== null) {
        let XMLCode = {
            "childNode": user_start.childNodes
        };
        let x_pos = parseInt(start_pos[0])
        let startBlockInit = true;

        // loop on typed 'scratch_forever_blocks' in user project code
        if (user_start.childNodes.length > 0) {

            while (XMLCode.childNode !== null) {

                XMLCode = searchingNextBlocks(XMLCode.childNode);
                if (startBlockInit) {
                    // convert 'scratch_on_start' block to vittascience 'on_start' block with statement "DO"
                    let startXml = user_start.outerHTML.replace(user_start.innerHTML, '')
                    // get position of 'scratch_on_start' block
                    let position = startXml.match(/deletable=\"false\" x=\"([0-9]{0,3})\" y=\"([0-9]{0,3})\"/);
                    if (position) {
                        start_pos = [position[1], position[2]];
                    }
                    startXml = Blockly.Xml.textToDom(startXml);
                    if (XMLCode.nextBlocksCode !== null && XMLCode.nextBlocksCode.length > 0) {
                        // add blocks in 'on_start' if 'scratch_on_start' has next statement different of 'scratch_forever'
                        let regExpForever = /type=\"scratch_forever\" id=\"(.{20,20})\">/g;
                        replacement = 'type=\"controls_whileUntil\" id=\"$1\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_boolean\" id=\"9YHj@-zEIez}TFTAfZro\"><field name=\"BOOL\">TRUE</field></block></value>';
                        XMLCode.nextBlocksCode = XMLCode.nextBlocksCode.replace(regExpForever, replacement);
                        startXml.appendChild(Blockly.Xml.textToDom('<statement name=\"DO\">' + XMLCode.nextBlocksCode + '</statement>'));
                    }
                    // append 'on_start' block to workspace xml
                    xml.appendChild(Blockly.Xml.textToDom(Blockly.Xml.domToText(startXml).replace(/type=\"scratch_on_start\"/, 'type=\"on_start\"')));
                    startBlockInit = false;
                } else {
                    // if next connection of 'scratch_forever' has blocks, push them in workspace in disabled mode 
                    if (XMLCode.nextBlocksCode !== null && XMLCode.nextBlocksCode.length > 0) {
                        let regExpForever = /type=\"scratch_forever\" id=\"(.{20,20})\">/g;
                        replacement = 'type=\"controls_whileUntil\" id=\"$1\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_boolean\" id=\"9YHj@-zEIez}TFTAfZro\"><field name=\"BOOL\">TRUE</field></block></value>';
                        XMLCode.nextBlocksCode = XMLCode.nextBlocksCode.replace(regExpForever, replacement);
                        let disabledBlocks = XMLCode.nextBlocksCode.replace(/<block type=\"(.{1,50})\" id=\"(.{20,20})\">/, '<block type=\"$1\" id=\"$2\" disabled=\"true\">');
                        xml.appendChild(Blockly.Xml.textToDom(disabledBlocks));
                        InterfaceMonitor.writeConsole("Certains blocs n'ont pas pu être convertis au style Vittascience.\n");
                    }
                }

                if (XMLCode.foreverCode !== null && XMLCode.foreverCode.length > 0) {
                    x_pos += 200;
                    // convert 'scratch_forever' block into 'forever' changing x position 
                    let regExpForever = /type=\"scratch_forever\" id=\"(.{20,20})\" deletable=\"false\">/g;
                    let deletable = "true";
                    if (regExpForever.test(XMLCode.foreverCode)) {
                        deletable = "false";
                    } else {
                        regExpForever = /type=\"scratch_forever\" id=\"(.{20,20})\">/g;
                    }
                    let replacement = "type=\"forever\" id=\"$1\" deletable=\"" + deletable + "\" x=\"" + x_pos + "\" y=\"" + start_pos[1] + "\">";
                    let loopCode = XMLCode.foreverCode.replace(regExpForever, replacement);
                    if (XMLCode.statementCode) {
                        // replacing 'scratch_on_start' blocks from input statement into 'control_whileUntil' block
                        replacement = 'type=\"controls_whileUntil\" id=\"$1\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_boolean\" id=\"9YHj@-zEIez}TFTAfZro\"><field name=\"BOOL\">TRUE</field></block></value>';
                        XMLCode.statementCode = XMLCode.statementCode.replace(regExpForever, replacement);
                        // push blocks in statement "DO"
                        loopCode = loopCode.substring(0, loopCode.length - 8) + XMLCode.statementCode + '</block>';
                    }
                    // append 'forever' block to workspace xml
                    loopXml = Blockly.Xml.textToDom(loopCode);
                    xml.appendChild(loopXml)
                }
            }
        } else {
            const startCode = user_start.outerHTML.replace(/type=\"scratch_on_start\"/, 'type=\"on_start\"');
            xml.appendChild(Blockly.Xml.textToDom(startCode));
        }
    }
    // add user functions and disabled blocks to workspace xml
    if (user_functions.length > 0) {
        for (var j = 0; j < user_functions.length; j++) {
            const replacedCode = 'type=\"controls_whileUntil\" id=\"$1\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_boolean\" id=\"9YHj@-zEIez}TFTAfZro\"><field name=\"BOOL\">TRUE</field></block></value>';
            const functionCode = Blockly.Xml.domToText(user_functions[j]).replace(/type=\"scratch_forever\" id=\"(.{20,20})\">/, replacedCode)
            xml.appendChild(Blockly.Xml.textToDom(functionCode));
        }
    }

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