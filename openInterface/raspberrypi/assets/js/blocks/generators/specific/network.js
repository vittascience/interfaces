/**
 * @fileoverview Network generators for Esp32.
 */

// pi connection
Blockly.Python.network_get_pi_name = function (block) {
    const name = Blockly.Python.valueToCode(block, "PINAME", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addConstant('VITTA_API_HOSTNAME', "VITTA_API_HOSTNAME = " + name);
    return "";
};
