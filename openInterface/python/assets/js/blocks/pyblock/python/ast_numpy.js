PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["array"] = function (args, node) {
  if (args[0] == undefined) {
    return {
      name: "numpy_create_table_with",
      fields: {},
      values: {},
      mutations: { "@items": 0 },
      settings: { inline: "true" },
      statements: {}, //tag statement
    };
  }
  values = {};
  if (args[0].elts.length > 0 && args[0].elts[0].elts == undefined) {
    for (let i = 0; i < args[0].elts.length; i++) {
      values["ADD" + i] = PyBlock.prototype.convert(args[0].elts[i], node);
    }
    return {
      name: "numpy_create_table_with",
      fields: {},
      values,
      mutations: { "@items": args[0].elts.length.toString() },
      settings: { inline: "true" },
      statements: {}, //tag statement
    };
  }

  const fields = {};
  const value = {};
  for (let j = 0; j < args[0].elts.length; j++) {
    for (let i = 0; i < args[0].elts[j].elts.length; i++) {
      fields["element_" + j + i] = args[0].elts[j].elts[i].n.v;
    }
  }

  return {
    name: "numpy_square_matrix",
    fields: fields,
    values: value,
    mutations: { "@dim": args[0].elts.length.toString() },
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["linspace"] = function (
  args,
  node,
) {
  return {
    name: "numpy_linspace",
    fields: {},
    values: {
      MIN: PyBlock.prototype.convert(args[0], node),
      MAX: PyBlock.prototype.convert(args[1], node),
      N: PyBlock.prototype.convert(args[2], node),
    },
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["arange"] = function (args, node) {
  return {
    name: "numpy_arange",
    fields: {},
    values: {
      MIN: PyBlock.prototype.convert(args[0], node),
      MAX: PyBlock.prototype.convert(args[1], node),
      STEP: PyBlock.prototype.convert(args[2], node),
    },
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["sqrt"] = function (args, node) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block(
        "math_number",
        0,
        undefined,
        { NUM: 0 },
        {},
        {},
        {},
        {},
      ),
    };
  }
  return {
    name: "numpy_single",
    fields: {
      OP: "ROOT",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["absolute"] = function (
  args,
  node,
) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block("math_number", 0, undefined, { NUM: 0 }),
    };
  }
  return {
    name: "numpy_single",
    fields: {
      OP: "ABS",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["exp"] = function (args, node) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block("math_number", 0, undefined, { NUM: 0 }),
    };
  }
  return {
    name: "numpy_single",
    fields: {
      OP: "EXP",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["sin"] = function (args, node) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block("math_number", 0, undefined, { NUM: 0 }),
    };
  }
  return {
    name: "numpy_trig",
    fields: {
      OP: "SIN",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["cos"] = function (args, node) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block("math_number", 0, undefined, { NUM: 0 }),
    };
  }
  return {
    name: "numpy_trig",
    fields: {
      OP: "COS",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["numpy"]["tan"] = function (args, node) {
  let values;
  if (args[0]) {
    values = { NUM: PyBlock.prototype.convert(args[0], node) };
  } else {
    values = {
      NUM: PyBlock.create_block("math_number", 0, undefined, { NUM: 0 }),
    };
  }
  return {
    name: "numpy_trig",
    fields: {
      OP: "TAN",
    },
    values,
    settings: { inline: "true" },
    statements: {},
  };
};
