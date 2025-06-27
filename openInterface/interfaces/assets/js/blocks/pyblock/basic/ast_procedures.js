/**
 * @fileoverview Procedures.
 */

PyBlock.prototype.create_block_functionDef = function (
  name,
  mutation,
  type,
  returnType,
) {
  return function (args, node) {
    let values = {};

    if (args != null && args != undefined) {
      args.forEach(function (arg, i) {
        values["ARG" + i] = PyBlock.prototype.convert(arg, node);
      });
    }

    return {
      name: type, // block type=name
      fields: {
        NAME: name,
      }, // tag field of the block <field ...>
      values: values, // tag value
      mutations: mutation, //tag mutation
      statements: {}, //tag statement
      returnType: returnType,
    };
  };
};

//block to define function without return
PyBlock.prototype.ast_FunctionDef = function (node) {
  const name = node.name;
  let blockName = "procedures_defnoreturn";
  let function_type = "procedures_callnoreturn";
  let returnNode;
  let returnType;
  let returnValue;
  const values = {};

  // Search return and remove all items after in the block because useless
  node.body.forEach(function (element, i, tab) {
    if (element._astname === "Return") {
      if (element.value != null) {
        blockName = "procedures_defreturn";
        function_type = "procedures_callreturn";
        returnValue = element.value;
      }

      tab.splice(i);
    }
  });

  PyBlock.incrementLevel();
  let stack = this.convertBody(node.body, node);
  if (blockName == "procedures_defreturn") {
    returnNode = this.convert(returnValue, node);
    returnType = PyBlock.getVarType(returnNode);
    values["RETURN"] = returnNode;
  }
  PyBlock.decrementLevel();

  // Args
  let mutation = {};

  for (let i = 0; i < node.args.args.length; i += 1) {
    mutation[node.args.args[i].arg.v] = null;
  }

  // Register functions
  PyBlock.prototype.LOCAL_FUNCTIONS[name] =
    PyBlock.prototype.create_block_functionDef(
      name,
      mutation,
      function_type,
      returnType,
    );
  return PyBlock.create_block(
    blockName,
    node.lineno,
    undefined,
    {
      NAME: Sk.ffi.remapToJs(name),
    },
    values,
    {},
    mutation,
    {
      STACK: stack,
    },
  );
};

PyBlock.prototype["ast_Return"] = function (node) {
  const value = node.value;

  if (value == null) {
    return BlockMirrorTextToBlocks.create_block("ast_Return", node.lineno);
  } else {
    return BlockMirrorTextToBlocks.create_block(
      "ast_ReturnFull",
      node.lineno,
      {},
      {
        VALUE: this.convert(value, node),
      },
    );
  }
};