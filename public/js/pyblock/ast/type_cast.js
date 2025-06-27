PyBlock.CAST_TYPE = {
  // cast_function : type
  str: "Str",
  int: "int",
  float: "float",
  bool: "bool",
  list: "List",
  dict: "Dictionary",
  char: "char",
  long: "long",
};

for (let type in PyBlock.CAST_TYPE) {
  PyBlock.prototype.METHODS_BLOCKS[PyBlock.CAST_TYPE[type]] = {};
}

PyBlock.setVarType = function (block, typeName) {
  block.foundType = typeName;
  return block;
};

PyBlock.getVarType = function (block) {
  return block != undefined && block != undefined ? block.foundType : undefined;
};

PyBlock.prototype.METHOD_GLOBAL["type"] = function (args, node) {
  return {
    name: "variables_type_of",
    fields: {},
    values: { VAR: PyBlock.prototype.convert(args[0], node) },
    settings: { inline: "true" },
    statements: {},
    returnType: "int",
  };
};
