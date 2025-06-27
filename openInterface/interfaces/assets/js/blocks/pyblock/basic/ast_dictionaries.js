PyBlock.prototype.ast_Dict = function (node, parent) {
  console.log(node)
  let values = this.convertElements("VAL", node.values, node);
  let keys = this.convertElements("KEY", node.keys, node)

  for (let e in keys)
    values[e] = keys[e];
    
  return PyBlock.create_block(
    "dictionaries_create_with",
    0,
    "Dictionary",
    {},
    values,
    { inline: "true" },
    {"@items": node.keys.length.toString()}
  );
};

PyBlock.prototype.FUNCTIONS_BLOCKS["set"] = function (args, node) {
  if (args != null)
    return {
      name: "dictionaries_from_list",
      values: { "LIST": PyBlock.prototype.convert(args[0], node) },
      returnType: "Dictionary",
      settings: { inline: "true" },
    };
  return {
    name: "dictionaries_create_empty",
    returnType: "Dictionary",
    settings: { inline: "true" },
  };
};


PyBlock.prototype.METHODS_BLOCKS.Dictionary["keys"] = function (args, node) {
  return {
    name: "dictionaries_include",
    fields: {
      ITEM: "KEY",
    },
    values: {
      DICT: PyBlock.prototype.convert(args.value, node),
    },
    blockguess: "dictionaries_include",
  };
};

PyBlock.prototype.METHODS_BLOCKS.Dictionary["values"] = function (args, node) {
  return {
    name: "dictionaries_include",
    fields: {
      ITEM: "VALUE",
    },
    values: {
      DICT: PyBlock.prototype.convert(args.value, node),
    },
    blockguess: "dictionaries_include",
  };
};

PyBlock.prototype.METHODS_BLOCKS.Dictionary["clear"] = function (args, node) {
  return {
    name: "dictionaries_clear",
    fields: {},
    values: {
      DICT: PyBlock.prototype.convert(args[0], node),
    },
  };
};
PyBlock.prototype["ast_Delete"] = function (node, parent) {
  return PyBlock.create_block(
    "dictionaries_delete_tuple",
    0,
    undefined,
    {},
    {
      DICT: PyBlock.prototype.convert(node.targets[0].value),
      KEY: PyBlock.prototype.convert(node.targets[0].slice.value),
    },
  );
};
