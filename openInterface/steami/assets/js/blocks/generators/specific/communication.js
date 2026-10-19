/**
 * @fileoverview Communication generators for STeaMi.
 */

Blockly.Python.communication_setup_logs = function () {
    Blockly.Python.addImport('daplink_bridge', IMPORT_DAPLINK_BRIDGE);
    Blockly.Python.addImport('daplink_flash', IMPORT_DAPLINK_FLASH);
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addInit('daplink_bridge', 'bridge = DaplinkBridge(machine.I2C(1))');
    Blockly.Python.addInit('daplink_flash', 'flash = DaplinkFlash(bridge)');
    Blockly.Python.addInit('log_file', 'flash.set_filename("DATA", "CSV")');
};

Blockly.Python.communication_extract_logs_data = function (block) {
    const labelArray = [];
    for (let i = 1; i < block.itemCount_ + 1; i++) {
        const label = Blockly.Python.valueToCode(block, "ADD" + (i - 1), Blockly.Python.ORDER_NONE);
        labelArray.push(label.replaceAll("'", ""));
    }
    return labelArray;
};

Blockly.Python.communication_log_setLabel = function (block) {
    Blockly.Python.communication_setup_logs();
    const labels = Blockly.Python.communication_extract_logs_data(block);
    return `flash.write_line("${labels.join(",")}")` + NEWLINE;
};

Blockly.Python.communication_log_addData = Blockly.Python.communication_log_setLabel;

Blockly.Python.communication_log_deleteLogs = function () {
    Blockly.Python.communication_setup_logs();
    Blockly.Python.addFunction('log_erase', FUNCTIONS_STEAMI.DEF_LOG_ERASE);
    return 'log_erase()' + NEWLINE;

}