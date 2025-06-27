/**
 * @fileoverview Process generators for Raspberry Pi Pico.
 */

Blockly.Python.process_on_start_core1 = function (block) {
    Blockly.Python.addImport('_thread', IMPORT_THREAD);
    const statements = Blockly.Python.statementToCode(block, "DO");
    const core1_function = 'def core1_thread():' + NEWLINE + (statements === '' ? TAB + 'pass' : statements);
    const functionTag = 'core1_thread';
    Blockly.Python.addFunction(functionTag, core1_function);
    Blockly.Python.addPowerOn('process_on_start_core1', 'pico_thread_core1 = _thread.start_new_thread(core1_thread, ())');
    return '';
};

Blockly.Python.process_forever_core1 = Blockly.Python.forever;

Blockly.Python.process_exit_core1 = function () {
    return 'return' + NEWLINE;
};

Blockly.Python.process_global_var = function(block) {
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return `global ${dataVar}` + NEWLINE;
};