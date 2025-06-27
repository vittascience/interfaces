/**
 * @fileoverview Network generators for Winky.
 */

Blockly.Python.network_connectWinky = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "WINKY-FCDF";
    WEB_BLE.name = name.replaceAll("'","");
    return `winky.connect(${name})` + NEWLINE;
};