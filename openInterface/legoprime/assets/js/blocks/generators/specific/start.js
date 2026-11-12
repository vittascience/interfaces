/**
 * @fileoverview Start generators for Lego Spike Prime.
 * The hub runs `runloop.run(main())`: the whole program is a coroutine, procedures are coroutines too.
 */

// names that would shadow the modules of the generated code, or break `async def main` / `await`
Blockly.Python.addReservedWords('main,async,await,runloop,motor,motor_pair,color,color_sensor,distance_sensor,force_sensor,port,light,light_matrix,sound,button,motion_sensor');

// Blockly variables are module globals in the generated code, but local once wrapped in main(): declare them global.
const legoPrimeGlobalLine = (names, body, args = []) => {
    const used = names.filter(name => !args.includes(name) && new RegExp('\\b' + name + '\\b').test(body));
    return used.length ? Blockly.Python.INDENT + 'global ' + used.join(', ') + NEWLINE : '';
};

const legoPrimeFinish = Blockly.Python.finish;
Blockly.Python.finish = function (userLoop) {
    Blockly.Python.addImport('runloop', IMPORT_RUNLOOP);
    // every variable of the workspace (loop variables too), as named in the generated code
    const workspace = typeof Main !== 'undefined' ? Main.getWorkSpace() : Blockly.getMainWorkspace();
    const variables = workspace.getVariableMap().getVariablesOfType("").map(variable => Blockly.Python.nameDB_.getName(variable.name, Blockly.VARIABLE_CATEGORY_NAME));
    for (const key of Object.keys(Blockly.Python.userFunctions_)) {
        const code = Blockly.Python.userFunctions_[key].replace(/^def (\w+)\((.*)\):\n/m, (header, name, args, offset, whole) => {
            // a global declaration on a parameter is a SyntaxError
            const global = legoPrimeGlobalLine(variables, whole.slice(offset + header.length), args.split(',').map(a => a.trim()));
            return 'async def ' + name + '(' + args + '):\n' + global;
        });
        Blockly.Python.userFunctions_[key] = code;
    }
    const setup = Blockly.Python.userOnStart_.setup || '';
    delete Blockly.Python.userOnStart_.setup;
    let body = (setup + userLoop).trim() || Blockly.Python.PASS.trim();
    // when a program ends the hub goes back to its slot number: keep running so that the display stays until Stop
    if (!/^while True:/m.test(body)) {
        body += NEWLINE + 'while True:' + NEWLINE + Blockly.Python.INDENT + 'await runloop.sleep_ms(100)';
    }
    const main = 'async def main():\n' + legoPrimeGlobalLine(variables, body)
        + Blockly.Python.prefixLines(body, Blockly.Python.INDENT) + '\n\nrunloop.run(main())\n';
    return legoPrimeFinish(main);
};

Blockly.Python.procedures_callreturn = function (block) {
    const funcName = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.PROCEDURE_CATEGORY_NAME),
        args = [];
    for (let i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.Python.valueToCode(block, "ARG" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    return ["await " + funcName + "(" + args.join(", ") + ")", Blockly.Python.ORDER_UNARY_SIGN];
};

Blockly.Python.on_start = function (block) {
    let statementStack = Blockly.Python.statementToCode(block, "DO");
    statementStack = statementStack.substr(2).replace(/\n  /g, '\n');
    Blockly.Python.userOnStart_.setup = statementStack;
    return ""; // DO NOT CHANGE
};

// a tight loop must yield to the runloop (LEGO doc), and keep the hub reactive to the stop button
Blockly.Python.forever = function (block) {
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block) + Blockly.Python.INDENT + 'await runloop.sleep_ms(1)' + NEWLINE;
    return 'while True:' + NEWLINE + statements;
};

Blockly.Python.scratch_on_start = function () {
    return ""; // DO NOT CHANGE
};

Blockly.Python.scratch_forever = function (block) {
    const prevBlock = block.previousConnection.targetBlock();
    const n = (prevBlock !== null && prevBlock.type === 'scratch_on_start' ? "" : NEWLINE);
    let statements = Blockly.Python.statementToCode(block, "DO");
    statements = Blockly.Python.addLoopTrap(statements, block) + Blockly.Python.INDENT + 'await runloop.sleep_ms(1)' + NEWLINE;
    return n + 'while True:' + NEWLINE + statements;
};
