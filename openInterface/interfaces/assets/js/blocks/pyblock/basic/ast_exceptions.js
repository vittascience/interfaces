/**
 * @fileoverview Exception traduction block to python.
 */

// Raise block.
PyBlock.prototype.ast_Raise = function (node) {
  const exc = node.exc;
  const cause = node.cause;
  const values = {};
  if (exc !== null) {
    values["EXC"] = this.convert(exc, node);
  }
  if (cause !== null) {
    values["EXC"] = this.convert(cause, node);
  }
  return PyBlock.create_block(
    "exception_raise",
    node.lineno,
    undefined,
    {},
    values,
    {},
    {},
  );
};

// Exception block
PyBlock.prototype.FUNCTIONS_BLOCKS.Exception = function (args, node) {
  if (args[0].id != undefined && args[0].id.v) {
    return {
      name: "exception_exception",
      fields: {},
      values: {
        EXC: PyBlock.create_block("exception_type", 0, undefined, {
          TYPE: args[0].id.v,
        }),
      },
      settings: { inline: "true" },
      statements: {}, //tag statement
    };
  }
  return {
    name: "exception_exception",
    fields: {},
    values: {
      EXC: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: "true" },
    statements: {}, //tag statement
  };
};

// Exception type
PyBlock.prototype.exception_type = function (node) {
  return PyBlock.create_block("exception_type", 0, undefined, {
    TYPE: node.id,
  });
};

// Exception try
PyBlock.prototype.ast_Try = function (node) {
  const body = node.body;
  const handlers = node.handlers;
  const orelse = node.orelse;
  const fields = {};
  const values = {};
  const statements = {};
  let mutations;

  mutations = {
    "@exceptarg": 1,
    "@except": handlers.length - 1,
  };
  if (
    handlers[handlers.length - 1] &&
    handlers[handlers.length - 1].type != null
  ) {
    mutations = {
      "@exceptarg": 0,
      "@except": handlers.length,
    };
  }

  statements["EXC"] = this.convertBody(body, node);

  if (orelse !== null) {
    statements["ORELSE"] = this.convertBody(orelse, node);
  }

  const handledLevels = [];
  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    if (handler.type == null) {
      statements["EXCEPTARG"] = this.convertBody(handler.body, node);
    } else {
      statements["DO" + (i + 1)] = this.convertBody(handler.body, node);
      values["EXCEPT" + (i + 1)] = this.exception_type(handler.type, node);
    }
  }

  mutations["ARG"] = handledLevels;

  let block = PyBlock.create_block(
    "exception_try",
    node.lineno,
    undefined,
    fields,
    values,
    {},
    mutations,
    statements,
  );
  return block;
};
