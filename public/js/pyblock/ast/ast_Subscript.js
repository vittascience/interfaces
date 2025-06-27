var isWeirdSliceCase = function isWeirdSliceCase(slice) {
  return (
    slice.lower == null &&
    slice.upper == null &&
    slice.step !== null &&
    slice.step._astname === "NameConstant" &&
    slice.step.value === Sk.builtin.none.none$
  );
};

PyBlock.prototype.addSliceDim = function (slice, i, values, mutations, node) {
  const sliceKind = slice._astname;

  if (sliceKind === "Index") {
    values["INDEX" + i] = this.convert(slice.value, node);
    mutations.push("I");
  } else if (sliceKind === "Slice") {
    var L = "0",
      U = "0",
      S = "0";

    if (slice.lower !== null) {
      values["SLICELOWER" + i] = this.convert(slice.lower, node);
      L = "1";
    }

    if (slice.upper !== null) {
      values["SLICEUPPER" + i] = this.convert(slice.upper, node);
      U = "1";
    }

    if (slice.step !== null && !isWeirdSliceCase(slice)) {
      values["SLICESTEP" + i] = this.convert(slice.step, node);
      S = "1";
    }

    mutations.push("S" + L + U + S);
  }
};

PyBlock.prototype["ast_Index"] = function (node) {
  const value = node.value;
  const num = this.convert(value, node);
  return PyBlock.create_block("math_number", 0, PyBlock.getVarType(num), {
    NUM: num,
  });
};

PyBlock.prototype["ast_Slice"] = function () {
  return null;
};

PyBlock.prototype["ast_Subscript"] = function (node) {
  const value = node.value;
  const slice = node.slice;

  // in list get sub-list from (a[2:3])
  if (slice._astname === "Slice") {
    let lower = slice.lower;
    let lower_value;
    let upper = slice.upper;
    let where1 = "FROM_START";
    let where2 = "FROM_START";
    let step = slice.step;
    let at1 = "true";
    let at2 = "true";
    let blockName;
    let foundType;
    let valueNode = this.convert(value, node);
    let values;

    if (valueNode.blockGuess == "ACTUAL") {
      return this.convert(value, node);
    } else if (valueNode.blockGuess != undefined) {
      return PyBlock.create_block(valueNode.blockGuess, 0, undefined);
    }

    if (PyBlock.getVarType(valueNode) === "Str") {
      blockName = "text_getSubstring";
      foundType = "Str";
      values = {
        STRING: valueNode,
      };
    } else {
      blockName = "lists_getSublist";
      foundType = "List";
      values = {
        LIST: valueNode,
      };
    }

    if (
      lower != null &&
      lower.op != undefined &&
      lower.op.prototype._astname === "USub"
    ) {
      lower = lower.operand;
      lower_value = this.convert(lower, node);
      where1 = "FROM_END";
    }

    if (
      upper != null &&
      upper.op != undefined &&
      upper.op.prototype._astname === "USub"
    ) {
      upper = upper.operand;
      where2 = "FROM_END";
    }

    if (lower == null) {
      at1 = "false";
      where1 = "FIRST";
    } else {
      if (where1 != "FROM_END") {
        if (lower._astname == "Num") {
          lower_value = this.convert(lower, node);
        } else {
          let right = PyBlock.createNumBlock(1, "int", node);
          lower_value = PyBlock.createOpBlock(
            "ADD",
            this.convert(lower, node),
            right,
            "int",
            node,
          );
        }
      }

      Object.assign(values, {
        AT1: lower_value,
      });
    }

    if (upper == null) {
      at2 = "false";
      where2 = "LAST";
    } else {
      upper.n.v -= 1;
      Object.assign(values, {
        AT2: this.convert(upper, node),
      });
    }

    // TODO step not implem in blocks (a[::3])
    if (step != undefined) {
      if (
        upper == null &&
        lower == null &&
        step.op.prototype._astname === "USub" &&
        step.operand.n.v == "1"
      ) {
        return PyBlock.create_block(
          "text_reverse",
          0,
          undefined,
          {},
          { TEXT: valueNode },
          { "inline": "true"}
        );
      }
    }

    return PyBlock.create_block(
      blockName, // type
      0,
      foundType,
      {
        WHERE1: where1,
        WHERE2: where2,
      }, // fields
      values, //values
      { "inline": "true"}, // settings
      {
        "@at1": at1,
        "@at2": at2, // mutations
      },
      {}, // statements
    );
  }

  // in list get element from index (a[3])
  if (slice._astname === "Index") {
    let mode = "GET";
    let at = "true";
    let where = "FROM_START";
    let statement = "false";
    let settings = {
      inline: "true",
    };
    let _blockName;

    let _valueNode = this.convert(value, node);
    let _typeNode = PyBlock.getVarType(_valueNode);
    let _foundType, _values3;

    if (_valueNode.blockGuess == "ACTUAL") {
      _valueNode.blockGuess = null;
      return _valueNode;
    } else if (_valueNode.blockGuess != undefined) {
      return PyBlock.create_block(_valueNode.blockGuess, 0, undefined);
    }

    if (_typeNode === "Str") {
      _blockName = "text_charAt";
      _foundType = "char";

      _values3 = {
        VALUE: _valueNode,
      };
    } else if (_typeNode == "Dictionary") {
      _blockName = "dictionaries_get_item";
      _foundType = PyBlock.Lists[PyBlock.getName(_valueNode)];
      _values3 = {
        DICT: _valueNode,
        KEY: PyBlock.prototype.convert(slice.value),
      };

      return PyBlock.create_block(
        _blockName,
        0,
        _foundType,
        {},
        _values3,
        settings,
      );
    } else {
      // NumPy get element i (np.array(1))
      if (value.func != undefined && value.func.value.id.v == "np") {
        return PyBlock.create_block(
          "numpy_getElement_list",
          0,
          undefined,
          {},
          { LIST: this.convert(value), I: this.convert(slice.value) },
          settings,
          {},
          {},
        );
      } else {
        _blockName = "lists_getIndex";
        if (_valueNode.foundType != undefined)
          _foundType = _valueNode.foundType;
        else _foundType = "List";
      }

      _values3 = {
        VALUE: _valueNode,
      };
    }

    // in list get # from start par defaut

    // in list get # from end et in list get last
    if (
      slice.value.op != undefined &&
      slice.value.op.prototype._astname === "USub"
    ) {
      // in list get last
      if (slice.value.operand.n != undefined && slice.value.operand.n.v == 1) {
        where = "LAST";
        at = "false";
      } // in list get # from end
      else {
        where = "FROM_END";
        Object.assign(_values3, {
          AT: this.convert(slice.value.operand, node),
        });
      }
    } // in list get first
    else if (
      slice.value != undefined &&
      slice.value.n != undefined &&
      slice.value.n.v == 0
    ) {
      where = "FIRST";
      at = "false";
    } else if (at == "true") {
      let _value;

      if (slice.value._astname == "Num") {
        _value = this.convert(slice.value, node);
      } else {
        let _right = PyBlock.createNumBlock(1, "int", node);

        _value = PyBlock.createOpBlock(
          "ADD",
          this.convert(slice.value, node),
          _right,
          "int",
          node,
        );
      }

      Object.assign(_values3, {
        AT: _value,
      });
    }

    let fields = {};

    if (_foundType != "char") {
      Object.assign(fields, {
        MODE: mode,
      });
    }

    Object.assign(fields, {
      WHERE: where,
    });
    return PyBlock.create_block(
      _blockName, // type
      0,
      _foundType,
      fields, // fields
      _values3,
      settings, // settings
      {
        "@statement": statement,
        "@at": at, // mutations
      },
      {}, // statements
    );
  }

  // NumPy getElement I, J (np.array()[1, 2])
  if (slice._astname == "ExtSlice") {
    return PyBlock.create_block(
      "numpy_getElement_matrix",
      0,
      undefined,
      {},
      {
        LIST: this.convert(value),
        I: this.convert(slice.dims[0].value),
        J: this.convert(slice.dims[1].value),
      },
      {},
      {},
      {},
    );
  }
};
