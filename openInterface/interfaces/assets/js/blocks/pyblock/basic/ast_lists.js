/**
 * @fileoverview List traduction block to python.
 */

// Creating a list with items
PyBlock.prototype.ast_List = function (node) {
  const elts = node.elts;
  let block;
  const values = this.convertElements("ADD", elts, node);

  block = PyBlock.create_block(
    "lists_create_with", // type
    0, // width
    "List",
    {}, // fields
    values, //values
    { inline: "true"}, // settings
    {
      "@items": elts.length, // mutations
    },
    {}, // statements
  );
  block.elementsType = PyBlock.getVarType(values["ADD0"]);
  return block;
};

// Block list reapete is spécial block, in ast_BinOp

// length of List or String
PyBlock.prototype.FUNCTIONS_BLOCKS["len"] = function (args, node) {
  const value_block = PyBlock.prototype.convert(args[0], node);
  if (PyBlock.getVarType(value_block) === "Str")
    return {
      name: "text_length",
      fields: {},
      // tag field of the block <field ...>
      values: {
        VALUE: value_block, // recursive conversion for args[0]
      },
      settings: { inline: "true" },
      // tag value
      statements: {}, //tag statement
    };
  else if (PyBlock.getVarType(value_block) === "Dictionary")
    return {
      name: "dictionaries_length",
      fields: {},
      // tag field of the block <field ...>
      values: {
        DICT: value_block, // recursive conversion for args[0]
      },
      settings: { inline: "true" },
      // tag value
      statements: {}, //tag statement
    };
  return {
    name: "lists_length",
    fields: {},
    // tag field of the block <field ...>
    values: {
      VALUE: value_block, // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    // tag value
    statements: {}, //tag statement
  };
};

// lists_append => lists_setIndex

// Math on List : Sum
PyBlock.prototype.METHOD_GLOBAL["sum"] = function (args, node) {
  return {
    name: "math_on_list",
    fields: { OP: "SUM" },
    values: { LIST: PyBlock.prototype.convert(args[0], node) },
    statements: {},
    returnType: "int",
  };
};
// Math on List : Min
PyBlock.prototype.METHOD_GLOBAL["min"] = function (args, node) {
  return {
    name: "math_on_list",
    fields: { OP: "MIN" },
    values: { LIST: PyBlock.prototype.convert(args[0], node) },
    statements: {},
    returnType: "int",
  };
};

// Math on List : Max => Math_min_max
// Math on List : Average
PyBlock.prototype.FUNCTIONS_BLOCKS["math_mean"] = function (args, node) {
  return {
    name: "math_on_list",
    fields: { OP: "AVERAGE" },
    values: { NUM: PyBlock.prototype.convert(args[0], node) },
    settings: { inline: "true" },
    statements: {},
  };
};

// Math on List : Median
PyBlock.prototype.FUNCTIONS_BLOCKS["math_median"] = function (args, node) {
  return {
    name: "math_on_list",
    fields: { OP: "MEDIAN" },
    values: { NUM: PyBlock.prototype.convert(args[0], node) },
    settings: { inline: "true" },
    statements: {},
  };
};

// Math on List : Mode
PyBlock.prototype.FUNCTIONS_BLOCKS["math_modes"] = function (args, node) {
  return {
    name: "math_on_list",
    fields: { OP: "MODE" },
    values: { NUM: PyBlock.prototype.convert(args[0], node) },
    settings: { inline: "true" },
    statements: {},
  };
};

// Math on List : Std dev

PyBlock.prototype.FUNCTIONS_BLOCKS["math_standard_deviation"] = function (
  args,
  node,
) {
  return {
    name: "math_on_list",
    fields: { OP: "STD_DEV" },
    values: { NUM: PyBlock.prototype.convert(args[0], node) },
    settings: { inline: "true" },
    statements: {},
  };
};

// Math on List : Random => Random

// Lists_isEmpty is spécial block => UnaryOp

// Block List_reverse
PyBlock.prototype.METHOD_GLOBAL["reversed"] = function (args, node) {
  return {
    name: "lists_reverse",
    fields: {},
    values: { LIST: PyBlock.prototype.convert(args[0], node) },
    statements: {},
  };
};

// Block Sort List
PyBlock.prototype.FUNCTIONS_BLOCKS["lists_sort"] = function (args, node) {
  const list = PyBlock.prototype.convert(args[0], node);
  const type = args[1].s.v;
  const direction = args[2].value.v == 0 ? 1 : -1;

  return {
    name: "lists_sort",
    fields: {
      TYPE: type,
      DIRECTION: direction,
    },
    values: {
      LIST: list,
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "List",
  };
};

// in list insert at last, args[0] is the list
PyBlock.prototype.METHODS_BLOCKS["List"]["sort"] = function (args, node) {
  const values = {
    LIST: PyBlock.prototype.convert(node.func.value, node),
  };

  let type = "NUMERIC";
  if (args[1] != undefined) type = args[1].s.v;

  let direction = 1;
  if (args[2] != undefined) direction = args[2].value.v;

  return {
    name: "lists_sort",
    fields: {
      TYPE: type,
      DIRECTION: direction,
    },
    values: values,
    settings: { inline: "true" },
    mutations: {
      "@at": "false",
    },
    statements: {},
    returnType: values["VALUE"],
  };
};

// in list find last occurence of item
PyBlock.prototype.FUNCTIONS_BLOCKS["last_index"] = function (args, node) {
  return {
    name: "lists_indexOf",
    fields: {
      END: "LAST",
    },
    // tag field of the block <field ...>
    values: {
      VALUE: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
      FIND: PyBlock.prototype.convert(args[1], node), // recursive conversion for args[1]
    },
    // tag value
    statements: {}, //tag statement
    returnType: "int",
  };
};

// in list find first occurrence of item
PyBlock.prototype.FUNCTIONS_BLOCKS["first_index"] = function (args, node) {
  return {
    name: "lists_indexOf",
    fields: {
      END: "FIRST",
    },
    // tag field of the block <field ...>
    values: {
      VALUE: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
      FIND: PyBlock.prototype.convert(args[1], node), // recursive conversion for args[1]
    },
    // tag value
    statements: {}, //tag statement
    returnType: "int",
  };
};

// in list get and remove, args[0] is the list, args[1] is the index
PyBlock.prototype.METHODS_BLOCKS["List"]["pop"] = function (args, node) {
  let value = args;
  let mode = "REMOVE";
  let where = "FROM_START";
  let at = "true";
  let statement = "true";
  const values = {
    VALUE: PyBlock.prototype.convert(node.func.value, node),
  };

  if (node._parent != undefined && node._parent._astname === "Assign") {
    mode = "GET_REMOVE";
    statement = "false";
  }

  if (
    args[1] != undefined &&
    args[1].op != undefined &&
    args[1].op.prototype._astname === "USub"
  ) {
    where = "FROM_END";
    value = PyBlock.prototype.convert(args[1].operand, node);
  } else if (
    args[1] != undefined &&
    args[1].n != undefined &&
    args[1].n.v == 0
  ) {
    where = "FIRST";
    at = "false";
  } else if (args[1] == undefined) {
    where = "LAST";
    at = "false";
  }

  if (args[1] != undefined && where != "FROM_END") {
    if (args[1]._astname == "Num") {
      args[1].n.v += 1;
      value = PyBlock.prototype.convert(args[1], node);
    } else {
      const right = PyBlock.createNumBlock(1, "int", node);
      value = PyBlock.createOpBlock(
        "ADD",
        PyBlock.prototype.convert(args[1], node),
        right,
        "int",
        node,
      );
    }
  }

  if (at == "true") {
    Object.assign(values, {
      AT: value,
    });
  }

  return {
    name: "lists_getIndex",
    fields: {
      MODE: mode,
      WHERE: where,
    },
    values: values,
    settings: {},
    mutations: {
      "@statement": statement,
      "@at": at,
    },
    statements: {},
    returnType: values["VALUE"].elementsType,
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["random"]["choice"] = function (args, node) {
  let value = PyBlock.prototype.convert(args[0], node);
  return {
    name: "lists_getIndex",
    fields: {
      MODE: "GET",
      WHERE: "RANDOM",
    },
    values: {
      VALUE: value,
    },
    settings: { inline: "true" },
    mutations: {
      "@statement": "false",
      "@at": "false",
    },
    statements: {},
    returnType: PyBlock.getVarType(value),
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["random"]["shuffle"] = function (args, node) {
  return {
    name: "lists_shuffle",
    fields: {},
    values: {
      LIST: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "List",
  };
};

PyBlock.prototype.METHODS_BLOCKS["List"]["index"] = function (args, node) {
  return {
    name: "lists_getIndex",
    fields: {},
    values: {
      LIST: PyBlock.prototype.convert(node.func.value, node),
    },
  };
};

PyBlock.prototype.METHOD_GLOBAL["lists_remove_random_item"] = function (args, node) {
    let mode, statement;
    if (node._parent != undefined && node._parent._astname === "Assign") {
        mode = "GET_REMOVE";
        statement = "false";
    } else {
        mode = "REMOVE";
        statement = "true";
    }
    return {
        name: "lists_getIndex",
        fields: {
            MODE: mode,
            WHERE: "RANDOM",
        },
        values: {
            VALUE: PyBlock.prototype.convert(args[0], node)
        },
    }
}
// in list insert at, args[0] is the list, args[1] is the index, args[2] is the value
PyBlock.prototype.METHODS_BLOCKS["List"]["insert"] = function (args, node) {
  const value = args;
  let where = "FROM_START";
  let at = "true";
  let values = {
    LIST: PyBlock.prototype.convert(node.func.value, node),
  };

  if (
    args[1] != undefined &&
    args[1].op != undefined &&
    args[1].op.prototype._astname === "USub"
  ) {
    where = "FROM_END";
    value = PyBlock.prototype.convert(args[1].operand, node);
  } else if (
    args[1] != undefined &&
    args[1].n != undefined &&
    args[1].n.v == 0
  ) {
    where = "FIRST";
    at = "false";
  }

  if (args[1] != undefined && where != "FROM_END") {
    value = args[1];
  }

  if (at == "true") {
    if (where == "FROM_START") {
      if (args[1]._astname == "Num") {
        args[1].n.v += 1;
        value = PyBlock.prototype.convert(args[1], node);
      } else {
        let right = PyBlock.createNumBlock(1, "int", node);
        value = PyBlock.createOpBlock(
          "ADD",
          PyBlock.prototype.convert(args[1], node),
          right,
          "int",
          node,
        );
      }
    }

    Object.assign(values, {
      AT: value,
    });
  }

  Object.assign(values, {
    TO: PyBlock.prototype.convert(args[2], node),
  });
  return {
    name: "lists_setIndex",
    fields: {
      MODE: "INSERT",
      WHERE: where,
    },
    values: values,
    settings: {},
    mutations: {
      "@at": at,
    },
    statements: {},
    returnType: undefined,
  };
};

// in list insert at last, args[0] is the list
PyBlock.prototype.METHODS_BLOCKS["List"]["append"] = function (args, node) {
  const values = {
    LIST: PyBlock.prototype.convert(node.func.value, node),
  };

  if (args[1] != undefined) {
    Object.assign(values, {
      TO: PyBlock.prototype.convert(args[1], node),
    });
  }

  return {
    name: "lists_setIndex",
    fields: {
      MODE: "INSERT",
      WHERE: "LAST",
    },
    values: values,
    settings: {},
    mutations: {
      "@at": "false",
    },
    statements: {},
    returnType: undefined,
  };
};

// make list from text args[0] with delimiter args[1]
PyBlock.prototype.METHOD_GLOBAL["split"] = function (args, node) {
  const values = {
    INPUT: PyBlock.prototype.convert(args[0], node),
  };

  if (args[1] != undefined) {
    Object.assign(values, {
      DELIM: PyBlock.prototype.convert(args[1], node),
    });
  }

  return {
    name: "lists_split",
    fields: {
      MODE: "SPLIT",
    },
    values: values,
    settings: { inline: "true" },
    mutations: {
      "@mode": "SPLIT",
    },
    statements: {},
    returnType: "List",
  };
};

// Block GetSublist is a special block => ast_Supcript
