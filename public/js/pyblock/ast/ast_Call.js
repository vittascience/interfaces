function getModuleName(node_func) {
  if (node_func == undefined || node_func.value == undefined) {
    return undefined;
  }

  if (node_func.value.id != undefined) {
    const name = Sk.ffi.remapToJs(node_func.value.id);

    const _type = PyBlock.getVariable(name);

    if (_type != undefined) {
      return _type;
    }

    if (
      typeof PyBlock.prototype.IMPORT[name] == "undefined" &&
      typeof PyBlock.prototype.FUNCTIONS_BLOCKS[name] == "undefined" &&
      typeof PyBlock.prototype.IMPORT_FUNCTIONS[name] == "undefined"
    ) {
      return null;
    }

    return name;
  }

  return node_func.value._astname;
}

PyBlock.prototype["ast_Call"] = function (node) {
  const func = node.func;
  let args = node.args; // Can we make any guesses about this based on its name?

  let mModule = getModuleName(func);
  let blockDataFunc;
  let functionName; // Functions from an integrated module or function defined by user in blockly

  if (mModule === undefined) {
    functionName = Sk.ffi.remapToJs(node.func.id); // If it's a cast register his type

    if (PyBlock.CAST_TYPE[functionName] != undefined && node.args.length == 1) {
      node.args[0].python_type = PyBlock.CAST_TYPE[functionName];
      let res = this.convert(node.args[0], node);
      res = PyBlock.setVarType(res, PyBlock.CAST_TYPE[functionName]);
      if (node.args[0].python_type.toLowerCase() == "list") return res;
      return PyBlock.create_block(
        "variables_force_type",
        0,
        undefined,
        { TYPE: node.args[0].python_type.toLowerCase() },
        { VALUE: res },
        { inline: "true" },
      );
    }

    blockDataFunc = PyBlock.prototype.LOCAL_FUNCTIONS[functionName];

    if (blockDataFunc == undefined) {
      if (PyBlock.prototype.IMPORT_FUNCTIONS[functionName] != undefined) {
        blockDataFunc = PyBlock.prototype.IMPORT_FUNCTIONS[functionName];
      }
    }

    if (blockDataFunc === undefined) {
      blockDataFunc = PyBlock.prototype.FUNCTIONS_BLOCKS[functionName];
    }
  } else if (
    PyBlock.prototype.IMPORT[mModule] != undefined &&
    PyBlock.prototype.FUNCTIONS_BLOCKS[PyBlock.prototype.IMPORT[mModule]] !==
      undefined
  ) {
    functionName = Sk.ffi.remapToJs(node.func.attr);
    blockDataFunc =
      PyBlock.prototype.FUNCTIONS_BLOCKS[PyBlock.prototype.IMPORT[mModule]][
        functionName
      ];
  } else if (PyBlock.prototype.IMPORT_FUNCTIONS[mModule]) {
    functionName = Sk.ffi.remapToJs(node.func.attr);
    if (
      PyBlock.prototype.IMPORT_FUNCTIONS[mModule][functionName] != undefined
    ) {
      blockDataFunc = PyBlock.prototype.IMPORT_FUNCTIONS[mModule][functionName];
    }
  } else {
    try {
      let valueNode = this.convert(func.value);
      let varType = PyBlock.getVarType(valueNode);
      if (PyBlock.prototype.FUNCTIONS_BLOCKS[varType] !== undefined) {
        functionName = Sk.ffi.remapToJs(node.func.attr);
        blockDataFunc =
          PyBlock.prototype.FUNCTIONS_BLOCKS[varType][functionName];
      }
    } catch (e) {}
    // Methods
    functionName = Sk.ffi.remapToJs(node.func.attr);

    args = args == null ? [node.func.value] : [node.func.value].concat(args);
    let methodsBlock =
      mModule === null
        ? PyBlock.prototype.DEFAULT_METHODS_BLOCKS
        : PyBlock.prototype.METHODS_BLOCKS[mModule];

    if (methodsBlock != undefined) blockDataFunc = methodsBlock[functionName];
  }

  if (blockDataFunc !== undefined) {
    let blockData = blockDataFunc(args, node);

    let block = PyBlock.create_block(
      blockData.name,
      0,
      blockData.returnType,
      blockData.fields,
      blockData.values,
      blockData.settings,
      blockData.mutations,
      blockData.statements,
    );

    if (blockData.parentBlock != undefined)
      block = blockData.parentBlock(block);
    if (blockData.foundType != undefined) block.foundType = blockData.foundType;
    if (blockData.blockGuess != undefined)
      block.blockGuess = blockData.blockGuess;

    return block;
  } else {
    if (functionName in PyBlock.prototype.METHOD_GLOBAL) {
      blockDataFunc = PyBlock.prototype.METHOD_GLOBAL[functionName];
      blockData = blockDataFunc(args, node);
      block = PyBlock.create_block(
        blockData.name,
        0,
        blockData.returnType,
        blockData.fields,
        blockData.values,
        blockData.settings,
        blockData.mutations,
        blockData.statements,
      );
      if (blockData.parentBlock != undefined)
        block = blockData.parentBlock(block);
      if (blockData.foundType != undefined)
        block.foundType = blockData.foundType;
      if (blockData.blockGuess != undefined)
        block.blockGuess = blockData.blockGuess;

      return block;
    }
  }

  throw new Error("Python undefined function " + functionName);
};
