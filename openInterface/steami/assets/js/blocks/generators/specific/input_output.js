Blockly.Python.io_steami_onSwitchButtonState = function (block) {
    const sw = block.getFieldValue("SWITCH");
    const switchName = sw.toLowerCase();
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const steami_mcp23009e_buttons = ["UP_BUTTON", "DOWN_BUTTON", "LEFT_BUTTON", "RIGHT_BUTTON"];
    if (steami_mcp23009e_buttons.includes(sw)) {
        Blockly.Python.addImport('mcp23009e', IMPORT_MCP23009E);
        Blockly.Python.addImport('mcp23009e_const', IMPORT_MCP23009E_CONST);
        Blockly.Python.addInit('mcp', 'mcp = MCP23009E(machine.I2C(1), address=MCP23009_I2C_ADDR, reset_pin=machine.Pin("RST_EXPANDER", machine.Pin.OUT))');
        Blockly.Python.addFunction('init_mcp23009e_buttons', FUNCTIONS_WB55.DEF_MCP23009E_INIT_BUTTONS);
        Blockly.Python.addPowerOn('init_mcp23009e_buttons', 'initSteamiButtons()');
        Blockly.Python.addFunction('read_mcp23009e_buttons', FUNCTIONS_WB55.DEF_MCP23009E_READ_BUTTON);
        switch (block.getFieldValue("STATE")) {
            case "PRESSED":
                return `if readSteamiButton('${sw}') == MCP23009_LOGIC_LOW:` + NEWLINE + branchCode;
            case "RELEASED":
                return `if readSteamiButton('${sw}') != MCP23009_LOGIC_LOW:` + NEWLINE + branchCode;
        }
    } else {
        Blockly.Python.addImport('pyb', IMPORT_PYB);
        Blockly.Python.addInit(switchName, switchName + " = pyb.Pin(\'" + sw + "\')");
        Blockly.Python.addInit(switchName + '_init', switchName + ".init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)");
        switch (block.getFieldValue("STATE")) {
            case "PRESSED":
                return "if not " + switchName + ".value():" + NEWLINE + branchCode;
            case "RELEASED":
                return "if " + switchName + ".value():" + NEWLINE + branchCode;
        }
    }
};