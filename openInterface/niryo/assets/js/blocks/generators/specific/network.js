/**
 * @fileoverview Network generators for Niryo.
 */

// pi connection

Blockly.Python.network_get_pi_name = function (block) {
    const name = Blockly.Python.valueToCode(block, "PINAME", Blockly.Python.ORDER_NONE) || "''";
    return 'IP_addresse = ' + name + NEWLINE;
};

 
