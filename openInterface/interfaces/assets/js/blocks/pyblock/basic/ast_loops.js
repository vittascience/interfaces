// Block for loop / foreach
PyBlock.prototype.ast_For = function (node) {
    const target = node.target;
    const iter = node.iter;
    const body = node.body;
    const fields = {};
    let blockName;
    let bodies;
    let iter_val; // for i in range(...)

    // list loop
    if (iter.func != undefined && iter.func.id != undefined && iter.func.id.v === 'range') {
        let varUsedBefore = PyBlock.isVariableUsed(Sk.ffi.remapToJs(target.id));
        PyBlock.incrementLevel();
        PyBlock.setVariable(Sk.ffi.remapToJs(target.id), 'int');
        PyBlock.setVariableUsed(Sk.ffi.remapToJs(target.id), false);
        bodies = {
            DO: this.convertBody(body, node),
        };
        let varIsUsed = PyBlock.isVariableUsed(Sk.ffi.remapToJs(target.id));
        PyBlock.decrementLevel();

        // "for i in range(x)" block repeat x times
        if (!varUsedBefore && iter.args.length == 1 && !varIsUsed) {
            blockName = 'controls_repeat';
            iter_val = {
                TIMES: this.convert(iter.args[0], node),
            };
        }
        // for i in range(x, y, step)
        else {
            let from_block;
            let by_block;
            let to_block;

            // "for i in range(x, y)" or range(x) and i is used inside
            if (iter.args.length < 3) {
                if (iter.args.length == 1) {
                    from_block = PyBlock.createNumBlock(0, 'int', node);
                    to_block = this.convert(iter.args[0], node);
                } else {
                    from_block = this.convert(iter.args[0], node);
                    to_block = this.convert(iter.args[1], node);
                }

                by_block = PyBlock.createNumBlock(1, 'int', node);
            } else {
                from_block = this.convert(iter.args[0], node);
                to_block = this.convert(iter.args[1], node);
                by_block = this.convert(iter.args[2], node);
            }

            blockName = 'controls_for';
            iter_val = {
                FROM: from_block,
                TO: to_block,
                BY: by_block,
            };
            fields['VAR'] = Sk.ffi.remapToJs(target.id);
        }
    } // dictionary loop
    else if (
        iter.func != undefined &&
        iter.func.attr != undefined &&
        (iter.func.attr.v == 'keys' || iter.func.attr.v == 'items' || iter.func.attr.v == 'values')
    ) {
        blockName = 'dictionaries_loop';
        if (iter.func.attr.v == 'keys') fields['OP'] = 'KEY';
        else if (iter.func.attr.v == 'values') fields['OP'] = 'VALUE';
        else if (iter.func.attr.v == 'items') fields['OP'] = 'TUPLE';

        varUsedBefore = PyBlock.isVariableUsed(Sk.ffi.remapToJs(target.id));
        PyBlock.incrementLevel();
        PyBlock.setVariable(Sk.ffi.remapToJs(target.id), 'int');
        PyBlock.setVariableUsed(Sk.ffi.remapToJs(target.id), false);
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
        iter_val = { DICT: this.convert(iter.func.value, node) };
        bodies = {
            DO: this.convertBody(body, node),
        };
    } else {
        blockName = 'controls_forEach';
        PyBlock.incrementLevel();
        bodies = {
            DO: this.convertBody(body, node),
        };
        PyBlock.decrementLevel();
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
        iter_val = {
            LIST: this.convert(iter, node),
        };
    }

    return PyBlock.create_block(blockName, node.lineno, undefined, fields, iter_val, {}, {}, bodies);
};

PyBlock.prototype.controls_repeat_ext = PyBlock.prototype.ast_For;

// Block while
PyBlock.prototype.ast_While = function (node) {
    let values = {
        BOOL: this.convert(node.test, node),
    };
    PyBlock.incrementLevel();
    const statements = {
        DO: this.convertBody(node.body, node),
    };
    PyBlock.decrementLevel();
    let mode;

    if (node.test.op != undefined && node.test.op.prototype._astname == 'Not') {
        mode = 'UNTIL';
        values = {
            BOOL: this.convert(node.test.operand, node),
        };
    } else {
        mode = 'WHILE';
        values = {
            BOOL: this.convert(node.test, node),
        };
    }

    if (PyBlock.on_start && mode == 'WHILE' && values.BOOL.innerText == 'TRUE') {
        return PyBlock.create_block('forever', node.lineno, undefined, {}, {}, { inline: 'true' }, {}, statements);
    }
    return PyBlock.create_block(
        'controls_whileUntil',
        node.lineno,
        undefined,
        {
            MODE: mode,
        },
        values,
        {},
        {},
        statements,
    );
};

// Block controls_flow_statements : break
PyBlock.prototype.ast_Break = function (node) {
    return PyBlock.create_block('controls_flow_statements', node.lineno, undefined, {
        FLOW: 'BREAK',
    });
};

// Block controls_flow_statements : continue
PyBlock.prototype.ast_Continue = function (node) {
    return PyBlock.create_block('controls_flow_statements', node.lineno, undefined, {
        FLOW: 'CONTINUE',
    });
};

// Block controls_pass_statements : pass
PyBlock.prototype.ast_Pass = function () {
    return PyBlock.create_block('controls_pass_statements', 0, undefined);
};

PyBlock.prototype.FUNCTIONS_BLOCKS["range"] = function (args, node) {
    const values = {}
    if (args.length > 2) 
        values["STEP"] = PyBlock.prototype.convert(args[2], node);
    if (args.length > 1) {
        values["START"] = PyBlock.prototype.convert(args[0], node);
        values["END"] = PyBlock.prototype.convert(args[1], node);
    } else if (args.length == 1) {
        values["END"] = PyBlock.prototype.convert(args[0], node);
    }

    return {
        name:'controls_range', 
        values: values,
        settings : { "inline": "true" },
        mutations: {"@items": args.length.toString()}
    }
}

PyBlock.prototype.ast_ListComp = function (node) {
    let generators = node.generators;
    let elt = node.elt;
    const fields = {}, values = {};


    // TODO : add ifs [ x for x in range(20) if x % 2 == 0]
    // perhaps after in the block ?
    if (generators[0]) {
        // Target
        let varName = Sk.ffi.remapToJs(generators[0].target.id);
        PyBlock.setVariable(varName, 'int');
        PyBlock.setVariableUsed(varName, false);
        fields['VAR'] = Sk.ffi.remapToJs(varName);

        // i in range
        // Iter
        values["LIST"] = this.convert(generators[0].iter, node);

        // if
        const mutation = {}
        if (generators[0].ifs != null) {
            mutation["@items"] = (generators[0].ifs.length + 1).toString();
            for (let i = 0; i < generators[0].ifs.length; i++) {
                values["ITEM" + (i + 1)] = this.convert(generators[0].ifs[i]);
            }
        }

        // elts
        values["EXPR"] = this.convert(elt, node);

        return PyBlock.create_block("controls_ListComp", node.lineno, undefined, fields, values, {"inline": "true"}, mutation);
    }
}