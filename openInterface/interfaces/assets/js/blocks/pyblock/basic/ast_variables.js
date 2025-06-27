PyBlock.getName = function (block) {
  return block.variableName;
};

PyBlock.setName = function (block, var_name) {
  block.variableName = var_name;
  return block;
};

PyBlock.prototype.ast_Tuple = function (node) {
  mutations = {};
  values = {};

  mutations['@items'] = node.elts.length;

  for (let i = 0; i < node.elts.length; i++) {
    values['ITEM' + i] = PyBlock.prototype.convert(node.elts[i]);
  }

  return PyBlock.create_block("variables_tuple", 0, 'tuple', {}, values, { inline: 'true' }, mutations);
};


PyBlock.prototype["ast_Assign"] = function (node) {
  const targets = node.targets;
  const value = node.value;

  let values;
  const fields = {};
  const simpleTarget = targets.length === 1 && targets[0]._astname === "Name";
  let valueNode; // in list set #
  let name = "variables_set";
  let set_values = {};
  if (targets[0]._astname === "Subscript") {
    let _valueNode = this.convert(targets[0].value, node);
    let _typeNode = PyBlock.getVarType(_valueNode);
    let _blockName, _foundType, _fields;
    let at = "true";
    if (_typeNode == "Dictionary") {
      _blockName = "dictionaries_update_item";
      _foundType = "Dictionary";
      _fields = {};
      at = "true";
      set_values = {
        DICT: _valueNode,
        KEY: PyBlock.prototype.convert(targets[0].slice.value, node),
        VALUE: PyBlock.prototype.convert(value, node),
      };
    } else {
      _blockName = "lists_setIndex";

      let mode = "SET";
      at = "true";
      let where = "FROM_START";
      let index = targets[0].slice.value;
      set_values = {
        LIST: this.convert(targets[0].value, node),
      };

      // # from end
      if (
        index != null &&
        index.op != undefined &&
        index.op.prototype._astname === "USub"
      ) {
        index = index.operand;
        where = "FROM_END"; // last

        if (index.n != undefined && index.n.v == 1) {
          at = "false";
          where = "LAST";
        }
      }
      // first
      else if (index.n != undefined && index.n.v == 0) {
        at = "false";
        where = "FIRST";
      }

      if (at == "true") {
        Object.assign(set_values, {
          AT: this.convert(index, node),
        });
      }

      Object.assign(set_values, {
        TO: this.convert(value, node),
      });

      _foundType = PyBlock.getVarType(set_values["LIST"]);
      _fields = { MODE: mode, WHERE: where };
    }

    for (key in Blockly.Python.inits_) {
      if (key.split("[")[0] == targets[0].value.id.v)
        return null
    }
    return PyBlock.create_block(
      _blockName,
      node.lineno,
      _foundType,
      _fields,
      set_values,
      {},
      {
        "@at": at, // mutations
      },
      {}, // statements
    );
  }

  const mutations = {
    "@targets": targets.length,
    "@simple": simpleTarget,
  }

  if (simpleTarget) {
    valueNode = this.convert(value, node); // Check if it's append
    if (valueNode.blockGuess === "text_append") {
      // Search if our variable is the first of the operation
      if (
        valueNode.nodesComputed[0].querySelector("block").variableName ===
        Sk.ffi.remapToJs(targets[0].id)
      ) {
        valueNode.nodesComputed.splice(0, 1);
        let block;

        if (valueNode.nodesComputed.length == 1) {
          block = valueNode.nodesComputed[0];
        } else {
          let _values2 = {};
          valueNode.nodesComputed.forEach(function (element, i) {
            _values2["ADD" + i] = element;
          });
          block = PyBlock.create_block(
            "text_join",
            node.lineno,
            "Str",
            {},
            _values2,
            {},
            {
              "@items": valueNode.nodesComputed.length,
            },
          );
        }

        if (targets[0] && targets[0].id.v in Blockly.Python.inits_)
          return null

        return PyBlock.create_block(
          "text_append",
          node.lineno,
          "Str",
          {
            VAR: Sk.ffi.remapToJs(targets[0].id),
          },
          {
            TEXT: block,
          },
          {},
        );
      }
    }

    // If the value blockGuess is defined, this mean the detected block is not the good one
    if (valueNode.blockGuess == "ACTUAL") {
      return this.convert(value, node);
    } else if (valueNode.blockGuess != undefined) {
      return PyBlock.create_block(valueNode.blockGuess, 0, undefined);
    }

    values = {};
    fields["VAR"] = Sk.ffi.remapToJs(targets[0].id); // save variable type

    PyBlock.setVariable(fields["VAR"], PyBlock.getVarType(valueNode));
    values["VALUE"] = valueNode;
  } else {
    // tuple assignement
    if (targets[0]._astname == "Tuple") {
      valueNode = this.convert(value, node); // Check if it's append

      values = {};
      mutations['@items'] = targets[0].elts.length;
      for (let i = 0; i < targets[0].elts.length; i++) {
        values['ITEM' + i] = PyBlock.prototype.convert(targets[0].elts[i]);
        PyBlock.setVariable(value["ITEM" + i], PyBlock.getVarType(valueNode));
      }
      name = "variables_set_tuple";
      values["VALUE"] = valueNode;
    } else {
      values = this.convertElements("TARGET", targets, node);
    }
  }
  // if (targets[0] && targets[0].id && targets[0].id.v in Blockly.Python.inits_)
  //   return null
  return PyBlock.create_block(
    name,
    node.lineno,
    undefined,
    fields,
    values,
    {},
    mutations,
  );
};

PyBlock.prototype["ast_AnnAssign"] = function (node) {
  const targets = node.target;
  const value = node.value;
  let values;
  let fields = {};
  let valueNode; // in list set #
  valueNode = this.convert(value, node); // Check if it's append

  values = {};
  fields["VAR"] = Sk.ffi.remapToJs(targets.id); // save variable type

  PyBlock.setVariable(fields["VAR"], PyBlock.getVarType(valueNode));
  values["VALUE"] = valueNode;

  return PyBlock.create_block(
    "variables_set",
    node.lineno,
    undefined,
    fields,
    values,
    {},
    {
      "@targets": targets.length,
      "@simple": true,
    },
  );
};

PyBlock.prototype["ast_AugAssign"] = function (node, parent) {
  let node_BinOp = _objectSpread({}, node);

  node_BinOp.left = node.target;
  node_BinOp.right = node.value;
  node_BinOp._astname = "BinOp";
  node_BinOp._parent = node;
  node.value = node_BinOp;
  node.targets = [node.target];
  return PyBlock.prototype.ast_Assign(node, parent);
};

PyBlock.prototype.CONSTANTS = function (node) {
  // identifier le golden ratio
  if (node.op != undefined && node.op.prototype._astname === "Div") {
    if (
      node.right != undefined &&
      node.right.v != undefined &&
      node.right.n.v === 2
    ) {
      if (
        node.left != undefined &&
        node.left.op != undefined &&
        node.left.op.prototype._astname === "Add"
      ) {
        if (node.left.left != undefined && node.left.left.n.v === 1) {
          if (
            node.left.right != undefined &&
            node.left.right.func != undefined &&
            node.left.right.func.attr != undefined &&
            node.left.right.func.attr.v === "sqrt"
          ) {
            if (node.left.right.args[0].n.v === 5) {
              return PyBlock.create_block(
                "math_constant",
                node.lineno,
                "float",
                {
                  CONSTANT: "GOLDEN_RATIO",
                },
                {},
                {},
              );
            }
          }
        }
      }
    }
  }

  const attr = node.attr;

  if (
    (attr != undefined && Sk.ffi.remapToJs(attr) === "pi") ||
    Sk.ffi.remapToJs(attr) === "e"
  ) {
    return PyBlock.create_block("math_constant", node.lineno, "float", {
      CONSTANT: Sk.ffi.remapToJs(attr).toUpperCase(),
    });
  }

  const func = node.func;
  const args = node.args; // constant infinity -> float('inf')

  if (
    func != undefined &&
    args != undefined &&
    Sk.ffi.remapToJs(func.id) === "float" &&
    Sk.ffi.remapToJs(args[0].s) === "inf"
  ) {
    return PyBlock.create_block("math_constant", node.lineno, "float", {
      CONSTANT: "INFINITY",
    });
  } else if (
    func != undefined &&
    func.attr != undefined &&
    Sk.ffi.remapToJs(func.attr) === "sqrt" &&
    args[0].n != undefined &&
    args[0].n.v === 2
  ) {
    return PyBlock.create_block("math_constant", node.lineno, "float", {
      CONSTANT: "SQRT2",
    });
  } else if (
    func != undefined &&
    func.attr != undefined &&
    Sk.ffi.remapToJs(func.attr) === "sqrt" &&
    args[0].left != undefined &&
    args[0].right != undefined &&
    args[0].op != undefined
  ) {
    if (
      args[0].left != undefined &&
      args[0].op != undefined &&
      args[0].right != undefined
    ) {
      if (
        args[0].left.n != undefined &&
        args[0].op.prototype._astname === "Div" &&
        args[0].right.n != undefined
      ) {
        if (args[0].left.n.v === 1 && args[0].right.n.v === 2) {
          return PyBlock.create_block("math_constant", node.lineno, "float", {
            CONSTANT: "SQRT1_2",
          });
        }
      }
    }
  }

  const value = node.value;

  if (value != undefined && value === Sk.builtin.bool.true$) {
    return PyBlock.create_block(
      "logic_boolean",
      node.lineno,
      "bool",
      {
        BOOL: "TRUE",
      },
      {},
      { inline: "true" },
    );
  } else if (value != undefined && value === Sk.builtin.bool.false$) {
    return PyBlock.create_block(
      "logic_boolean",
      node.lineno,
      "bool",
      {
        BOOL: "FALSE",
      },
      {},
      { inline: "true" },
    );
  }

  return undefined;
};


PyBlock.prototype["ast_Name"] = function (node) {
  const id = node.id;

  if (id.v == Blockly.Python.blank) {
    return null;
  } else {
    let res = PyBlock.create_block(
      "variables_get",
      node.lineno,
      PyBlock.getVariable(id.v),
      {
        VAR: id.v,
      },
      {},
      { inline: "true" },
    );
    res.variableName = id.v; // if(PyBlock.variableName[res.variableName] != undefined){
    //     res.foundType = PyBlock.variableName[res.variableName].type;
    // }

    return res;
  }
};


