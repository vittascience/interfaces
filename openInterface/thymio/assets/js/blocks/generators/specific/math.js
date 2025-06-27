
// Thymio generators for math module blocks

Blockly.Python.math_thymio_copy = function(block) {
    const variable_var = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_copy(${variable_result}, ${variable_var})\n`;
};

Blockly.Python.math_thymio_add = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_add(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_subtract = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_sub(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_multiply = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_mul(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_divide = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_div(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_min = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_min(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_max = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_var2 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR2'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_max(${variable_result}, ${variable_var1}, ${variable_var2})\n`;
};

Blockly.Python.math_thymio_random = function(block) {
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_rand(${variable_result})\n`
};

// sin
Blockly.Python.math_thymio_sin = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_sin(${variable_result}, ${variable_var1})\n`;
};

// cos
Blockly.Python.math_thymio_cos = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_cos(${variable_result}, ${variable_var1})\n`
};

// sqrt
Blockly.Python.math_thymio_sqrt = function(block) {
    const variable_var1 = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR1'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable_result = Blockly.Python.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    return `nf_math_sqrt(${variable_result}, ${variable_var1})\n`
};