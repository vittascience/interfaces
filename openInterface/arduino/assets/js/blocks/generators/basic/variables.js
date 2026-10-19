/**
 * @fileoverview Variables generators for Arduino.
 */

Blockly.Arduino.variables_get = function (block) {
    const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return [varName, Blockly.Arduino.ORDER_ATOMIC]
};

function isListConstructionBlock_(block) {
    return !!block && ['lists_create_with', 'lists_repeat'].includes(block.type);
}

function isPositiveIntegerLiteral_(value) {
    return /^[1-9]\d*$/.test(String(value));
}

function normalizeArrayDimension_(value) {
    return value === "0" ? "1" : value;
}

function getListConstructionDimensions_(block) {
    if (!isListConstructionBlock_(block)) return [];

    if (block.type == 'lists_repeat') {
        const size = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0";
        const item = block.getInputTargetBlock && block.getInputTargetBlock("ITEM");
        return [size].concat(getListConstructionDimensions_(item));
    }

    const dimensions = [String(block.itemCount_ || 0)];
    for (let i = 0; i < block.itemCount_; i++) {
        const item = block.getInputTargetBlock && block.getInputTargetBlock("ADD" + i);
        if (isListConstructionBlock_(item)) {
            return dimensions.concat(getListConstructionDimensions_(item));
        }
    }

    return dimensions;
}

function variableHasListDeclaration_(workspace, variableId) {
    if (!workspace || !variableId) return false;
    const blocks = workspace.getAllBlocks(false);
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        if (b.type !== 'variables_set') continue;
        const varField = b.getField('VAR');
        if (!varField || !varField.getVariable() || varField.getVariable().getId() !== variableId) continue;
        const valueConnection = b.inputList && b.inputList[0] ? b.inputList[0].connection : null;
        const valueBlock = valueConnection ? valueConnection.targetBlock() : null;
        if (isListConstructionBlock_(valueBlock)) return true;
    }
    return false;
}

Blockly.Arduino.variables_set = function (block) {
    let value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "NULL";
    const variableId = block.getField('VAR') && block.getField('VAR').getVariable()
        ? block.getField('VAR').getVariable().getId()
        : null;
    const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);

    // case we declare a list in order to have the ITEM TYPE and the LENGHT OF LIST
    const connection = block.inputList[0].connection;
    const child = typeof connection !== 'undefined' ? connection.targetBlock() : null;
    if (isListConstructionBlock_(child)) {
        const listDimensions = getListConstructionDimensions_(child);
        let listType = "int";
        if (typeof child.getItemType === 'function') {
            listType = Blockly.Arduino.getArduinoType_(child.getItemType());
            if (listType === 'invalidBlocklyType') listType = 'int';
        }

        const useGlobalDeclaration = listDimensions.length > 0 && listDimensions.every(isPositiveIntegerLiteral_);
        const arrayDimensions = listDimensions.map(normalizeArrayDimension_);
        const declaration = listType + " " + varName + arrayDimensions.map(function (dimension) {
            return "[" + dimension + "]";
        }).join('') + " = " + value + ";";

        if (useGlobalDeclaration) {
            Blockly.Arduino.addVariable(varName, declaration, true);
            return '';
        }

        return declaration + NEWLINE;
    }

    // If this variable is used as a list elsewhere, ignore scalar assignments
    // like "liste = 0" that would generate invalid Arduino code.
    if (variableHasListDeclaration_(block.workspace, variableId)) {
        return '';
    }

    // case we are not declaring a list
    return varName + " = " + value + ";" + NEWLINE;
};

Blockly.Arduino.variables_increment = function (block) {
    const increment = Blockly.Arduino.valueToCode(block, "DELTA", Blockly.Arduino.ORDER_ADDITIVE) || "0";
    return Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME) + " += " + increment + ";" + NEWLINE;
};

Blockly.Arduino.variables_force_type = function (block) {
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "0";
    const type = block.getFieldValue("TYPE");
    const arduinoType = Blockly.Arduino.getArduinoType_(Blockly.Types[type]);
    if (type == "TEXT") {
        return [arduinoType + "(" + value + ")", Blockly.Arduino.ORDER_ATOMIC];
    } else {
        return ["(" + arduinoType + ")" + value, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.variables_type_of = function (block) {
    const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    Blockly.Arduino.addDefine('define_variable_types', FUNCTIONS_ARDUINO.DEFINE_VARIABLE_TYPE);
    return ["String(TYPE_NAME(" + varName + "))", Blockly.Arduino.ORDER_ATOMIC]
};