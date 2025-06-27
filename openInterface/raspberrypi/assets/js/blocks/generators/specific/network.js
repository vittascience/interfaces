/**
 * @fileoverview Network generators for Esp32.
 */

// pi connection
Blockly.Python.network_get_pi_name = function (block) {
    let name = Blockly.Python.valueToCode(block, "PINAME", Blockly.Python.ORDER_NONE) || "''";
    return 'hostname = ' + name + NEWLINE;
};
