/*
 * File: pyblock.js
 * Description: JavaScript code for converting Python code to Blockly XML representation
 */

"use strict";

function ownKeys(object, enumerableOnly) {
    let keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        let symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key),
                );
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

/**
 * This function initializes the properties and sets up the initial state of the PyBlock object.
 */
function PyBlock() {
    this.hiddenImports = ["plt"];
    this.strictAnnotations = ["int", "float", "str", "bool"];
    Blockly.defineBlocksWithJsonArray(PyBlock.BLOCKS);
    this.currentLevel = 0;

    for (let module in PyBlock.prototype.METHODS_BLOCKS) {
        for (let func in PyBlock.prototype.METHODS_BLOCKS[module]) {
            PyBlock.prototype.DEFAULT_METHODS_BLOCKS[func] =
                PyBlock.prototype.METHODS_BLOCKS[module][func];
        }
    }
};

PyBlock.xmlToString = function (xml) {
    return new XMLSerializer().serializeToString(xml);
};

PyBlock.prototype.convertSourceToCodeBlock = function (python_source) {
    const event = new CustomEvent('python_translation_error', {
        detail: {
            message: 'Un morceau de code Python est incorrect. Veuillez vérifier votre syntaxe.'
        }
    });
    window.dispatchEvent(event);

    let xml = document.createElement("xml");
    xml.appendChild(PyBlock.raw_block(python_source));
    return PyBlock.xmlToString(xml);
};
 
PyBlock.getDefaultXml = function () {
    let defaultXML = CodeManager.getSharedInstance().getDefaultXmlStart();
    const pars = new DOMParser();
    const defaultXmlDoc = pars.parseFromString(defaultXML, "text/xml");
    if (defaultXmlDoc.documentElement.querySelector(`block[type="on_start"]`) != undefined) {
        PyBlock.on_start = true;
    } else {
        PyBlock.on_start = false;
    }
};

/**
 * The main function for converting a string representation of Python
 * code to the Blockly XML representation.
 *
 * @param {string} filename - The filename being parsed.
 * @param {string} python_source - The string representation of Python
 *      code (e.g., "a = 0").
 * @returns {Object} An object which will either have the converted
 *      source code or an error message and the code as a code-block.
 */

PyBlock.prototype.convertSource = function (filename, python_source) {
    let xml = document.createElement("xml");

    // Attempt parsing - might fail!
    let parse,
        ast = null,
        error;
    let badChunks = [];
    // remove if function
    for (const e in FUNCTIONS) {
        if (python_source.includes(FUNCTIONS[e])) {
            python_source = python_source.replace(FUNCTIONS[e], "");
        }
    }

    const constantName = `FUNCTIONS_${INTERFACE_NAME.toUpperCase()}`;
    try {
        if (eval(constantName)) {
            for (const e in eval(constantName)) {
                if (python_source.includes(eval(constantName)[e])) {
                    python_source = python_source.replace(eval(constantName)[e], "");
                }
            }
        }
    } catch (e) { }
    let originalSource = python_source;
    this.source = python_source.split("\n");
    let previousLine = 1 + this.source.length;

    PyBlock.prototype.LOCAL_FUNCTIONS = {};
    PyBlock.prototype.IMPORT = {};
    PyBlock.prototype.IMPORT_FUNCTIONS = {};

    // reset the offset of the block
    PyBlock.offset_y = 0;

    while (ast === null) {
        // if no code in input
        if (python_source.trim() === "") {
            if (badChunks.length) {
                const event = new CustomEvent('python_translation_error', {
                    detail: {
                        message: 'Un morceau de code Python est incorrect. Veuillez vérifier votre syntaxe.'
                    }
                });
                window.dispatchEvent(event);

                xml.appendChild(PyBlock.raw_block(badChunks.join("\n")));
            }

            return {
                xml: PyBlock.xmlToString(xml),
                error: null,
                rawXml: xml,
            };
        }
        PyBlock.reset();

        // first try of parse the code.
        try {
            parse = Sk.parse(filename, python_source);
            ast = Sk.astFromParse(parse.cst, filename, parse.flags);
        } catch (e) {
            //console.error(e);
            error = e;
            const cursorPos = Main.getCodeEditor().container.getCursorPosition();

            badChunks = this.source.splice(cursorPos.row, 1);
            python_source = this.source.join("\n");

            // if the first parse fail, try without the actual line
            try {
                parse = Sk.parse(filename, python_source);
                ast = Sk.astFromParse(parse.cst, filename, parse.flags);
            } catch (e) {
                this.source = originalSource.split("\n");
                if (
                    cursorPos.row >= 0 &&
                    cursorPos.row < this.source.length &&
                    this.source[cursorPos.row].replace(/ /g, "") == ""
                )
                    this.source[cursorPos.row] = this.source[cursorPos.row] + "pass";
                //console.log(this.source)
                badChunks = [];

                python_source = this.source.join("\n");

                // If the second parse fail; try without the 2 lines (for e in : \n)
                try {
                    parse = Sk.parse(filename, python_source);
                    ast = Sk.astFromParse(parse.cst, filename, parse.flags);
                } catch (e) {
                    //console.log(e)
                    this.source[cursorPos.row] = "";
                    if (
                        e.traceback &&
                        e.traceback.length &&
                        e.traceback[0].lineno &&
                        e.traceback[0].lineno < previousLine
                    ) {
                        previousLine = e.traceback[0].lineno - 1;
                        badChunks = badChunks.concat(this.source.slice(previousLine));
                        this.source = this.source.slice(0, previousLine);
                        python_source = this.source.join("\n");
                    } else {
                        const event = new CustomEvent('python_translation_error', {
                            detail: {
                                message: e.message
                            }
                        });
                        window.dispatchEvent(event);

                        xml.appendChild(PyBlock.raw_block(originalSource));
                        return {
                            xml: PyBlock.xmlToString(xml),
                            error: error,
                            rawXml: xml,
                        };
                    }
                }
            }
        }
    }

    // Create an object to store block positions
    PyBlock.blockPositions = {};
    let counter = 0;

    // Iterate over all blocks in the workspace
    Main.getWorkSpace()
        .getAllBlocks()
        .forEach(function (block) {
            // Get the position of the block
            let position = block.getRelativeToSurfaceXY();

            // Store the position in the object
            PyBlock.blockPositions[counter] = {
                x: position.x,
                y: position.y,
            };

            counter++;
        });

    this.comments = {};
    for (let commentLocation in parse.comments) {
        let lineColumn = commentLocation.split(",");
        let yLocation = parseInt(lineColumn[0], 10);
        let xLocation = parseInt(lineColumn[1], 10);
        this.comments[yLocation] =
            xLocation + "|" + parse.comments[commentLocation];
    }

    this.highestLineSeen = 0;
    this.levelIndex = 0;
    this.nextExpectedLine = 0;
    this.measureNode(ast);

    if (PyBlock.on_start) {
        let onStart = {
            _astname: "on_start",
            _parent: ast,
            body: [],
            level: 0,
            lineno: 0,
        };

        let indexOnStart = [];
        for (const e in ast.body) {
            if (
                ast.body[e]._astname != "ImportFrom" &&
                ast.body[e]._astname != "Import" &&
                ast.body[e]._astname != "While" &&
                ast.body[e]._astname != "Expr"
            ) {
                onStart.body.push(ast.body[e]);
                indexOnStart.unshift(parseInt(e));
            }
        }
        indexOnStart.forEach(function (e) {
            ast.body.splice(e, 1);
        });
        ast.body.splice(
            indexOnStart[indexOnStart.length - 1] || ast.body.length,
            0,
            onStart,
        );
    }

    let converted = this.convert(ast);
    if (converted.length > 0) {
        for (let block = 0; block < converted.length; block += 1) {
            xml.appendChild(converted[block]);
        }
    }

    if (badChunks.length) {
        const event = new CustomEvent('python_translation_error', {
            detail: {
                message: 'Un morceau de code Python est incorrect. Veuillez vérifier votre syntaxe.'
            }
        });
        window.dispatchEvent(event);

        xml.appendChild(PyBlock.raw_block(badChunks.join("\n")));
    }

    return {
        xml: PyBlock.xmlToString(xml),
        error: null,
        lineMap: this.lineMap,
        comments: this.comments,
        rawXml: xml,
    };
};

/**
 * This recursive function measures the height of each block in the Blockly workspace.
 * @param {object} node - The current node being measured.
 * @param {number} nextBlockLine - The line number of the next block.
 */
PyBlock.prototype.recursiveMeasure = function (node, nextBlockLine) {
    if (node === undefined) {
        return;
    }

    let myNext = nextBlockLine;

    if ("orelse" in node && node.orelse.length > 0) {
        if (node.orelse.length === 1 && node.orelse[0]._astname === "If") {
            myNext = node.orelse[0].lineno - 1;
        } else {
            myNext = node.orelse[0].lineno - 1 - 1;
        }
    }

    this.heights.push(nextBlockLine);

    if ("body" in node) {
        for (let i = 0; i < node.body.length; i++) {
            let next = void 0;

            if (i + 1 === node.body.length) {
                next = myNext;
            } else {
                next = node.body[i + 1].lineno - 1;
            }

            this.recursiveMeasure(node.body[i], next);
        }
    }

    if ("orelse" in node) {
        for (let _i = 0; _i < node.orelse.length; _i++) {
            let _next = void 0;

            if (_i === node.orelse.length) {
                _next = nextBlockLine;
            } else {
                _next = 1 + (node.orelse[_i].lineno - 1);
            }

            this.recursiveMeasure(node.orelse[_i], _next);
        }
    }
};

/**
 * This function is responsible for measuring the heights of blocks in the Blockly representation of Python code.
 * It initializes the heights array, calls the recursiveMeasure function, and removes the first element from the heights array.
 * @param {Object} node - The root node of the code being measured.
 */
PyBlock.prototype.measureNode = function (node) {
    this.heights = [];
    this.recursiveMeasure(node, this.source.length - 1);
    this.heights.shift();
};

/**
 * This function is used to retrieve a specific range of source code lines from the Python code.
 * @param {int} frm - The starting line number of the code range
 * @param {int} to - The enfing line number
 * @returns The source code lines within the specified range.
 */
PyBlock.prototype.getSourceCode = function (frm, to) {
    let lines = this.source.slice(frm - 1, to); // Strip out any starting indentation.

    if (lines.length > 0) {
        let indentation = lines[0].search(/\S/);

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].substring(indentation);
        }
    }

    return lines.join("\n");
};

/**
 * This function is responsible for converting the body of a python code in the Blockly representation
 * @param {Object} node - The body node to be converted
 * @param {Object} parent - The parent block of the body node
 * @returns {Array} An array representing the hierarchy of converted blocks
 */
PyBlock.prototype.convertBody = function (node, parent) {
    this.levelIndex += 1;
    let is_top_level = this.isTopLevel(parent);

    // Empty body, return nothing
    /*if (node.length === 0) {
        return null;
    }*/

    // Final result list
    let children = [], // The complete set of peers
        root = null, // The top of the current peer
        current = null, // The bottom of the current peer
        positionIndex = 0;

    function addFloat(peer) {
        if (PyBlock.blockPositions.hasOwnProperty(positionIndex)) {
            peer.setAttribute("x", PyBlock.blockPositions[positionIndex].x);
            peer.setAttribute("y", PyBlock.blockPositions[positionIndex].y);

            positionIndex++;
        }

        if (root == null) {
            children.push(peer);
        } else {
            children.push(root);
        }

        root = peer;
        //current = peer;
    }

    function addPeer(peer) {
        if (PyBlock.blockPositions.hasOwnProperty(positionIndex)) {
            peer.setAttribute("x", PyBlock.blockPositions[positionIndex].x);
            peer.setAttribute("y", PyBlock.blockPositions[positionIndex].y);

            positionIndex++;
        }

        if (root == null) {
            children.push(peer);
        } else {
            children.push(root);
        }

        root = peer;
        current = peer;
    }

    function finalizePeers() {
        if (root != null) {
            children.push(root);
        }
    }

    function nestChild(child) {
        if (root == null) {
            root = child;
            current = child;
        } else if (current == null) {
            root = current;
        } else {
            let nextElement = document.createElement("next");
            nextElement.appendChild(child);
            current.appendChild(nextElement);
            current = child;
        }
    }

    let lineNumberInBody = 0,
        lineNumberInProgram,
        previousLineInProgram = null,
        distance,
        skipped_line,
        commentCount,
        previousHeight = null,
        previousWasStatement = false,
        visitedFirstLine = false,
        wasFirstLine = false;

    // Iterate through each node
    nextnode: for (let i = 0; i < node.length; i++) {
        lineNumberInBody += 1;

        lineNumberInProgram = node[i].lineno;
        distance = 0;
        wasFirstLine = true;

        if (previousLineInProgram != null) {
            distance = lineNumberInProgram - previousLineInProgram - 1;
            wasFirstLine = false;
        }

        lineNumberInBody += distance;

        // Handle earlier comments
        commentCount = 0;
        for (let _commentLineInProgram in this.comments) {
            if (_commentLineInProgram <= lineNumberInProgram) {
                let comment = this.comments[_commentLineInProgram].split("|", 2);

                if (parseInt(comment[0], 10) / 2 == this.levelIndex - 1) {
                    let commentLine = comment[1];
                    let commentChild = this.ast_Comment(
                        commentLine,
                        _commentLineInProgram,
                    );

                    if (previousLineInProgram == null) {
                        nestChild(commentChild);
                    } else {
                        previousLineInProgram += 1;
                        let skipped_previous_line =
                            Math.abs(previousLineInProgram - _commentLineInProgram) > 1;

                        if (is_top_level && skipped_previous_line) {
                            addPeer(commentChild);
                        } else {
                            nestChild(commentChild);
                        }
                    }

                    previousLineInProgram = parseInt(_commentLineInProgram, 10);
                    this.highestLineSeen = Math.max(
                        this.highestLineSeen,
                        parseInt(_commentLineInProgram, 10),
                    );
                    distance = lineNumberInProgram - previousLineInProgram;
                    delete this.comments[_commentLineInProgram];
                    commentCount += 1;
                }
                visitedFirstLine = true;
                previousWasStatement = true;
            }
        }

        for (let e in Blockly.Python.powers_) {
            if (Blockly.Python.powers_[e] == this.source[lineNumberInProgram - 1]) {
                continue nextnode;
            }
        };
        for (let e in Blockly.Python.constants_) {
            if (Blockly.Python.constants_[e] == this.source[lineNumberInProgram - 1]) {
                continue nextnode;
            }
        };

        if (node[i]._astname == "While") {
            PyBlock.isWhilePassed = true;
            is_top_level = this.isTopLevel(parent);
        }

        distance = lineNumberInProgram - this.highestLineSeen;
        this.highestLineSeen = Math.max(lineNumberInProgram, this.highestLineSeen);

        // Now convert the actual node
        let height = this.heights.shift();
        let originalSourceCode = this.getSourceCode(lineNumberInProgram, height);
        let newChild = this.convertStatement(node[i], originalSourceCode, parent);

        // Skip null blocks (e.g., imports)
        if (newChild == null) {
            continue;
        }

        skipped_line = distance > 1;
        previousLineInProgram = lineNumberInProgram;
        previousHeight = height;

        // Handle top-level expression blocks
        if (is_top_level && newChild.constructor === Array) {
            addPeer(newChild[0]);
            // Handle skipped line
        } else if (is_top_level && skipped_line && visitedFirstLine) {
            addPeer(newChild);
            // The previous line was not a Peer
        } else if (
            is_top_level &&
            (!previousWasStatement ||
                newChild.getAttribute("type") == "procedures_defnoreturn" ||
                newChild.getAttribute("type") == "procedures_defreturn")
        ) {
            addPeer(newChild);
        } else if (
            newChild.getAttribute("inline") != undefined &&
            newChild.getAttribute("inline") == "true"
        ) {
            addFloat(newChild);

            // REMOVED 17/10/2023 : fix for defnoreturn but the blocks are no longer linked => to be reworked
            // If the parent is a function with no return and the current element is not indented, this means it is the end of the function.
            // } else if (typeof parent.body[parent.body.length - 2] !== 'undefined' && parent.body[parent.body.length - 2].returns == null && node[i].col_offset == 0) {
            //   addPeer(newChild);
        } else { // Otherwise, always embed it in there.
            nestChild(newChild);
        }

        previousWasStatement = newChild.constructor !== Array;

        visitedFirstLine = true;
    }

    // Handle comments that are on the very last line
    let lastLineNumber = lineNumberInProgram + 1;

    if (lastLineNumber in this.comments) {
        let comment = this.comments[lastLineNumber].split("|", 2);

        if (parseInt(comment[0], 10) / 2 == this.levelIndex - 1) {
            let lastComment = comment[1];

            let _commentChild = this.ast_Comment(lastComment, lastLineNumber);

            if (is_top_level && !previousWasStatement) {
                addPeer(_commentChild);
            } else {
                nestChild(_commentChild);
            }

            delete this.comments[lastLineNumber];

            this.highestLineSeen += 1;
        }
    }

    // Handle any extra comments that stuck around
    if (is_top_level) {
        for (let commentLineInProgram in this.comments) {
            let comment = this.comments[commentLineInProgram].split("|", 2);

            if (parseInt(comment[0], 10) / 2 == this.levelIndex - 1) {
                let commentInProgram = comment[1];

                let _commentChild2 = this.ast_Comment(
                    commentInProgram,
                    commentLineInProgram,
                );

                previousLineInProgram++;
                distance = commentLineInProgram - previousLineInProgram;

                if (previousLineInProgram == null) {
                    addPeer(_commentChild2);
                } else if (distance > 1) {
                    addPeer(_commentChild2);
                } else {
                    nestChild(_commentChild2);
                }

                previousLineInProgram = commentLineInProgram;
                delete this.comments[lastLineNumber];
            }
        }
    }

    finalizePeers();
    this.levelIndex -= 1;

    return children;
};

PyBlock.prototype.TOP_LEVEL_NODES = [
    "Module",
    "Expression",
    "Interactive",
    "Suite",
];

PyBlock.prototype.isTopLevel = function (parent) {
    return !parent || this.TOP_LEVEL_NODES.indexOf(parent._astname) !== -1;
};

/**
 * Converts a Python code node to its corresponding Blockly XML representation.
 *
 * @param {object} node - The Python code node to convert.
 * @param {object} parent - The parent node of the current code node.
 * @returns {object} - The Blockly XML representation of the code node.
 * @throws {Error} - If the corresponding conversion function for the node is not found.
 */
PyBlock.prototype.convert = function (node, parent) {
    let functionName = "ast_" + node._astname; // Check if it's a constant

    // if it's a constant return the constant
    let constantBlock = PyBlock.prototype.CONSTANTS(node, parent);
    //console.log(functionName)

    if (constantBlock != undefined) {
        return constantBlock;
    }

    //console.log(functionName)
    // if it's a fonction search for the name
    if (this[functionName] === undefined) {
        throw new Error("Could not find function: " + functionName);
    }

    node._parent = parent;
    return this[functionName](node, parent);
};

function arrayMax(array) {
    return array.reduce(function (a, b) {
        return Math.max(a, b);
    });
}

function arrayMin(array) {
    return array.reduce(function (a, b) {
        return Math.min(a, b);
    });
}

PyBlock.prototype.convertStatement = function (node, full_source, parent) {
    try {
        return this.convert(node, parent);
    } catch (e) {
        let heights = this.getChunkHeights(node);
        let extractedSource = this.getSourceCode(
            arrayMin(heights),
            arrayMax(heights),
        );

        const event = new CustomEvent('python_translation_error', {
            detail: {
                message: e.message
            }
        });
        window.dispatchEvent(event);
        
        return PyBlock.raw_block(extractedSource);
    }
};

PyBlock.prototype.getChunkHeights = function (node) {
    let lineNumbers = [];

    if (node.hasOwnProperty("lineno")) {
        lineNumbers.push(node.lineno);
    }

    if (node.hasOwnProperty("body")) {
        for (let i = 0; i < node.body.length; i += 1) {
            let subnode = node.body[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }

    if (node.hasOwnProperty("orelse")) {
        for (let _i2 = 0; _i2 < node.orelse.length; _i2 += 1) {
            let _subnode = node.orelse[_i2];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(_subnode));
        }
    }

    return lineNumbers;
};

// list of all the first blocks for move the block to the right
PyBlock.TOP_LEVEL_BLOCKS = [
    "procedures_defreturn",
    "procedures_defnoreturn",
    "ast_Raw",
];

/**
 * A function to create a Blockly XML representation.
 *
 * @param {string} type - Type of block to create.
 * @param {number} linenumber - the bunber of the line of the block
 * @param {string} python_type - Associated Python block type (optional).
 * @param {Object} fields - Values of the block's fields.
 * @param {Object} values - Values of the "value" type blocks linked to the current block.
 * @param {Object} settings - Additional parameters of the block.
 * @param {Object} mutations - Mutations of the block (optional).
 * @param {Object} statements - Statement blocks linked to the current block (optional).
 * @returns {Element} - Created block element.
 */
PyBlock.create_block = function (
    type,
    linenumber,
    python_type,
    fields,
    values,
    settings,
    mutations,
    statements,
) {
    let newBlock = document.createElement("block"); // Settings

    newBlock.setAttribute("type", type);

    let offset_y = this.offset_y || 200;

    if (PyBlock.TOP_LEVEL_BLOCKS.indexOf(type) != -1) {
        newBlock.setAttribute("x", offset_y);
        this.offset_y += 200;
    }

    for (let setting in settings) {
        let settingValue = settings[setting];
        newBlock.setAttribute(setting, settingValue);
    }

    // Mutations
    if (mutations !== undefined && Object.keys(mutations).length > 0) {
        let newMutation = document.createElement("mutation");

        for (let mutation in mutations) {
            let mutationValue = mutations[mutation];

            if (mutation.charAt(0) === "@") {
                newMutation.setAttribute(mutation.substr(1), mutationValue);
            } else if (mutationValue != null && mutationValue.constructor === Array) {
                for (let i = 0; i < mutationValue.length; i++) {
                    let mutationNode = document.createElement(mutation);
                    mutationNode.setAttribute("name", mutationValue[i]);
                    newMutation.appendChild(mutationNode);
                }
            } else {
                let _mutationNode = document.createElement("arg");

                if (mutation.charAt(0) === "!") {
                    _mutationNode.setAttribute("name", "");
                } else {
                    _mutationNode.setAttribute("name", mutation);
                }

                if (mutationValue !== null) {
                    _mutationNode.appendChild(mutationValue);
                }

                newMutation.appendChild(_mutationNode);
            }
        }

        newBlock.appendChild(newMutation);
    }

    // Fields
    for (let field in fields) {
        let fieldValue = fields[field];
        let newField = document.createElement("field");
        newField.setAttribute("name", field);
        newField.appendChild(document.createTextNode(fieldValue));
        newBlock.appendChild(newField);
    }

    // Values
    for (let value in values) {
        let valueValue = values[value];
        let newValue = document.createElement("value");

        if (valueValue !== null) {
            newValue.setAttribute("name", value);
            newValue.appendChild(valueValue);
            newBlock.appendChild(newValue);
        }
    }

    // Statements
    if (statements !== undefined && Object.keys(statements).length > 0) {
        for (let statement in statements) {
            let statementValue = statements[statement];

            if (statementValue == null) {
                continue;
            } else {
                for (let _i3 = 0; _i3 < statementValue.length; _i3 += 1) {
                    // In most cases, you really shouldn't ever have more than
                    //  one statement in this list. I'm not sure Blockly likes
                    //  that.
                    let newStatement = document.createElement("statement");
                    newStatement.setAttribute("name", statement);
                    newStatement.appendChild(statementValue[_i3]);
                    newBlock.appendChild(newStatement);
                }
            }
        }
    }

    return PyBlock.setVarType(newBlock, python_type); // set the python type and return the block
};

PyBlock.BLOCKS = [];

PyBlock.prototype["ast_Module"] = function (node) {
    let body = this.convertBody(node.body, node);
    return body;
};

PyBlock.prototype["ast_Interactive"] = function (node) {
    return this.convertBody(node.body, node);
};

PyBlock.prototype["ast_on_start"] = function (node) {
    return PyBlock.create_block(
        "on_start",
        0,
        undefined,
        {},
        {},
        { inline: "true" },
        {},
        { DO: this.convertBody(node.body) },
    );
};

PyBlock.prototype["ast_Expression"] = PyBlock.prototype["ast_Interactive"];
PyBlock.prototype["ast_Suite"] = PyBlock.prototype["ast_Module"];

PyBlock.createNumBlock = function (num, type, node) {
    return PyBlock.create_block("math_number", node.lineno, type, {
        NUM: num,
    });
};

PyBlock.createOpBlock = function (op, left, right, returnType, node) {
    return PyBlock.create_block(
        "math_arithmetic",
        node.lineno,
        returnType,
        {
            OP: op,
        },
        {
            A: left,
            B: right,
        },
        {
            inline: true,
        },
    );
};

PyBlock.prototype.convertElements = function (key, values, parent) {
    let output = {};

    for (let i = 0; i < values.length; i++) {
        output[key + i] = this.convert(values[i], parent);
    }

    return output;
};

// Blockly.Python['blank'] = '___';
PyBlock.prototype.LOCKED_BLOCK = {
    inline: "true",
    deletable: "false",
    movable: "false",
};

PyBlock.prototype["ast_Expr"] = function (node) {
    let value = node.value;
    let converted = this.convert(value, node);

    if (converted.constructor === Array) {
        return converted[0];
    } else {
        return converted;
    }
};

// Define the diffferents blocks
PyBlock.prototype.FUNCTIONS_BLOCKS = {};
PyBlock.prototype.METHODS_BLOCKS = {};
PyBlock.prototype.DEFAULT_METHODS_BLOCKS = {};
PyBlock.prototype.METHOD_GLOBAL = {};

PyBlock.prototype.FUNCTIONS_BLOCKS["print"] = function (args, node) {
    let values;
    if (args != undefined) {
        values = {
            TEXT: PyBlock.prototype.convert(args[0], node),
        };
    } else {
        values = {
            TEXT: PyBlock.create_block("text", 0, "Str", { TEXT: "" }),
        };
    }
    return {
        name: "display_print",
        fields: {},
        values: values,
        statements: {},
        returnType: undefined,
    };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["input"] = function (args, node) {
    const values = {};
    if (args.length > 0)
        values["TEXT"] = PyBlock.prototype.convert(args[0], node);

    return {
        name: "display_input",
        fields: {},
        values: values,
        settings: { inline: "true" },
        statements: {},
    };
};

// TODO set as global variable
PyBlock.prototype["ast_Global"] = function () {
    return null;
};

// Define the different lib
PyBlock.prototype.FUNCTIONS_BLOCKS["math"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["time"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"] = {};
PyBlock.prototype.FUNCTIONS_BLOCKS["random"] = {};
