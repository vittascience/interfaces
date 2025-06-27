// create a block of raw code
PyBlock.raw_block = function (txt) {
  // TODO: lineno as second parameter!
  return PyBlock.create_block("ast_Raw", 0, undefined, { TEXT: txt }, {});
};

PyBlock.prototype["ast_Attribute"] = function (node) {
  const value = node.value;
  const attr = node.attr;

  if (value._astname == "Name") {
    return PyBlock.create_block(
      "ast_Attribute",
      0,
      undefined,
      {
        VALUE: Sk.ffi.remapToJs(value.id),
        ATTR: Sk.ffi.remapToJs(attr),
      },
      {},
      { inline: "true" },
    );
  } else {
    // np.Array.size()
    if (value.func.attr.v == "array" && node.attr.v == "size") {
      if (value.args == null)
        return PyBlock.create_block(
          "numpy_getSizeShape",
          0,
          undefined,
          {},
          {},
          { inline: "true" },
        );
      else
        return PyBlock.create_block(
          "numpy_getSizeShape",
          0,
          undefined,
          {},
          { LIST: this.convert(value) },
          { inline: "true" },
        );
    }
    // np.Array.shape()
    if (value.func.attr.v == "array" && node.attr.v == "shape") {
      if (value.args == null)
        return PyBlock.create_block(
          "numpy_getSizeShape",
          0,
          undefined,
          { TYPE: "shape" },
          {},
          { inline: "true" },
        );
      else
        return PyBlock.create_block(
          "numpy_getSizeShape",
          0,
          undefined,
          { TYPE: "shape" },
          { LIST: this.convert(value) },
          { inline: "true" },
        );
    }

    return PyBlock.create_block(
      "ast_AttributeFull",
      0,
      undefined,
      {
        ATTR: Sk.ffi.remapToJs(attr),
      },
      {
        VALUE: this.convert(value, node),
      },
      { inline: "true" },
    );
  }
};
