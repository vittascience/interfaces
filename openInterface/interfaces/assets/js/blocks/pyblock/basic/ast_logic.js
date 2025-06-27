// Block for if/elseif/else condition.
PyBlock.prototype.ast_If = function (node) {
  const test = node.test;
  const body = node.body;
  let orelse = node.orelse;
  let hasOrelse = 0;
  let elifCount = 0; // check if it's ifreturn block if immediatly follow by a return

  if (
    orelse != undefined &&
    orelse.length == 0 &&
    node.body[0]._astname == "Return"
  ) {
    let _values = {
      CONDITION: this.convert(test, node),
    };
    let returnType;

    if (node.body[0].value != null) {
      PyBlock.incrementLevel();
      _values["VALUE"] = this.convert(node.body[0].value, node);
      returnType = PyBlock.getVarType(_values["VALUE"]);
    }

    let res = PyBlock.create_block(
      "procedures_ifreturn",
      node.lineno,
      returnType,
      {},
      _values,
    );
    PyBlock.decrementLevel();
    return res;
  }

  let values = {
    IF0: this.convert(test, node),
  };
  PyBlock.incrementLevel();
  let statements = {
    DO0: this.convertBody(body, node),
  };
  PyBlock.decrementLevel();

  while (orelse !== undefined && orelse.length > 0) {
    if (orelse.length === 1) {
      if (orelse[0]._astname === "If") {
        // This is an ELIF
        this.heights.shift();
        elifCount++;
        values["IF" + elifCount] = this.convert(orelse[0].test, node);
        PyBlock.incrementLevel();
        statements["DO" + elifCount] = this.convertBody(orelse[0].body, node);
        PyBlock.decrementLevel();
      } else {
        hasOrelse = 1;
        PyBlock.incrementLevel();
        statements["ELSE"] = this.convertBody(orelse, node);
        PyBlock.decrementLevel();
      }
    } else {
      hasOrelse = 1;
      PyBlock.incrementLevel();
      statements["ELSE"] = this.convertBody(orelse, node);
      PyBlock.decrementLevel();
    }

    orelse = orelse[0].orelse;
  }

  return PyBlock.create_block(
    "controls_if",
    node.lineno,
    undefined,
    {},
    values,
    {},
    {
      "@else": hasOrelse,
      "@elseif": elifCount,
    },
    statements,
  );
};

// Block for comparison operator.
PyBlock.CONVDICT = {
  Eq: "EQ",
  NotEq: "NEQ",
  Lt: "LT",
  LtE: "LTE",
  Gt: "GT",
  GtE: "GTE",
  Is: "IS",
  IsNot: "ISNOT",
  In: "IN",
  NotIn: "NOTIN",
};

// Block for comparison operator.
PyBlock.prototype.ast_Compare = function (node, parent) {
  const ops = node.ops;
  const left = node.left;
  const values = node.comparators;
  let result_block_left = this.convert(left, node); // on cherche si  X

  if (ops.length == 2) {
    const fields = {}
    for (let i = 0; i < ops.length; i++) {
      fields["OP" + i] = PyBlock.CONVDICT[ops[i].prototype._astname];
    } 
    return PyBlock.create_block(
      "logic_compare_2",
      0,
      "bool",
      fields,
      {
        A: result_block_left,
        B: this.convert(values[0], node),
        C: this.convert(values[1], node),
      },
      {
        inline: "true",
      },
    )
  }
  // Deal with modulo
  if (left.op != undefined && left.op.prototype._astname === "Mod") {
    if (left.right.n != undefined && left.right.n.v === 2) {
      // 2
      if (ops[0].prototype._astname === "Eq") {
        // ==
        if (values[0] != undefined && values[0].n.v === 0) {
          // 0 <=> pair
          return PyBlock.create_block(
            "math_number_property",
            0,
            "bool",
            {
              PROPERTY: "EVEN",
            },
            {
              NUMBER_TO_CHECK: this.convert(left.left, node),
            },
            { inline: "true" },
          );
        }

        if (values[0] != undefined && values[0].n.v === 1) {
          // 1 <=> impair
          return PyBlock.create_block(
            "math_number_property",
            0,
            "bool",
            {
              PROPERTY: "ODD",
            },
            {
              NUMBER_TO_CHECK: this.convert(left.left, node),
            },
            { inline: "true" },
          );
        }
      }
    }

    if (left.right.n != undefined && left.right.n.v === 1) {
      // 1 <=> is integer
      return PyBlock.create_block(
        "math_number_property",
        0,
        "bool",
        {
          PROPERTY: "WHOLE",
        },
        {
          NUMBER_TO_CHECK: this.convert(left.left, node),
        },
        { inline: "true" },
      );
    }

    if (left.right != undefined) {
      // Random numer
      if (ops[0].prototype._astname === "Eq") {
        // ==
        if (values[0].n != undefined && values[0].n && values[0].n.v === 0) {
          // 0 <=> divisible par
          return PyBlock.create_block(
            "math_number_property",
            0,
            "bool",
            {
              PROPERTY: "DIVISIBLE_BY",
            },
            {
              NUMBER_TO_CHECK: this.convert(left.left, node),
              DIVISOR: this.convert(left.right, node),
            },
            { inline: "true" },
          );
        }
      }
    }
  }

  // display is poritive / negativ insteed of < 0 or > 0
  if (ops[0].prototype._astname === "Gt") {
    // X >
    if (values[0] != undefined && values[0].n && values[0].n.v === 0) {
      // 0 <=> positif
      return PyBlock.create_block(
        "math_number_property",
        0,
        "bool",
        {
          PROPERTY: "POSITIVE",
        },
        {
          NUMBER_TO_CHECK: this.convert(left, node),
        },
        { inline: "true" },
      );
    }
  }

  if (ops[0].prototype._astname === "Lt") {
    // X <
    if (values[0] != undefined && values[0].n && values[0].n.v === 0) {
      // 0 <=> négatif
      return PyBlock.create_block(
        "math_number_property",
        0,
        "bool",
        {
          PROPERTY: "NEGATIVE",
        },
        {
          NUMBER_TO_CHECK: this.convert(left, node),
        },
        { inline: "true" },
      );
    }
  }

  // special block for "a in dictionary"
  if (
    values[0] &&
    values[0].func != undefined &&
    values[0].func.attr != undefined &&
    (values[0].func.attr.v == "keys" || values[0].func.attr.v == "values")
  ) {
    let blockData = PyBlock.prototype.METHODS_BLOCKS["Dictionary"][
      values[0].func.attr.v
    ](values[0].func, node);
    blockData.values["VALUE"] = result_block_left;
    if (ops[0].prototype._astname == "NotIn") blockData.fields["OP"] = "NOT";
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

    return block;
  }

  for (let i = 0; i < values.length; i += 1) {
    result_block_left = PyBlock.create_block(
      "logic_compare",
      0,
      "bool",
      {
        OP: PyBlock.CONVDICT[ops[i].prototype._astname],
      },
      {
        A: result_block_left,
        B: this.convert(values[i], node),
      },
      {
        inline: "true",
      },
    );
  }

  return result_block_left;
};

// Block for logical operations: 'and', 'or'.
PyBlock.prototype.ast_BoolOp = function (node, parent) {
  const op = node.op;
  const values = node.values;
  let result_block = this.convert(values[0], node);

  for (let i = 1; i < values.length; i += 1) {
    result_block = PyBlock.create_block(
      "logic_operation",
      0,
      "bool",
      {
        OP: op.prototype._astname.toUpperCase(),
      },
      {
        A: result_block,
        B: this.convert(values[i], node),
      },
      {
        inline: "true",
      },
    );
  }

  return result_block;
};

// Block logic boolean in Constant file

// Block for negation.
PyBlock.OPS = {
  USub: "NEG",
};

PyBlock.prototype.ast_UnaryOp = function (node) {
  const op = node.op.prototype._astname;
  const operand = node.operand;

  if (op === "Not") {
    // not len
    if (typeof operand.func !== "undefined" && operand.func.id.v === "len") {
      let value_block;

      if (operand.args[0] != undefined) {
        value_block = PyBlock.prototype.convert(operand.args[0], node);
      } // String is empty text, args[0] is the String

      if (PyBlock.getVarType(value_block) == "Str") {
        return PyBlock.create_block(
          "text_isEmpty",
          0,
          "bool",
          {},
          {
            VALUE: value_block,
          },
          {},
          {},
          {},
        );
      } // list is empty test, args[0] is the list
      else {
        return PyBlock.create_block(
          "lists_isEmpty",
          0,
          "bool",
          {},
          {
            VALUE: value_block,
          },
          { inline: "true" },
          {},
          {},
        );
      }
    } else {
      return PyBlock.create_block(
        "logic_negate",
        "bool",
        0,
        {},
        {
          BOOL: this.convert(operand, node),
        },
        {
          inline: true,
        },
      );
    }
  }

  let num = this.convert(operand, node);
  return PyBlock.create_block(
    "math_single",
    0,
    PyBlock.getVarType(num),
    {
      OP: PyBlock.OPS[op],
    },
    {
      NUM: num,
    },
    { inline: "true" },
  );
};

// Block for null data type.
PyBlock.prototype.ast_NameConstant = function (node) {
  let value = node.value;

  if (value === Sk.builtin.none.none$) {
    return PyBlock.create_block(
      "logic_null",
      node.lineno,
      undefined,
      {},
      {},
      { inline: "true" },
      {},
      {},
    );
  }
};

// Block for ternary operator.
PyBlock.prototype.ast_IfExp = function (node) {
  const test = node.test;
  let nodeThen = this.convert(node.body, node);
  let nodeElse = this.convert(node.orelse, node); // For now only take the type of the then node

  return PyBlock.create_block(
    "logic_ternary",
    0,
    PyBlock.getVarType(nodeThen),
    {},
    {
      IF: this.convert(test, node),
      THEN: nodeThen,
      ELSE: nodeElse,
    },
  );
};

// Block for assert.
PyBlock.prototype.ast_Assert = function (node, parent) {
  const test = node.test;
  const msg = node.msg;
  if (msg == null) {
    return PyBlock.create_block(
      "logic_assert",
      node.lineno,
      undefined,
      {},
      {
        BOOL: this.convert(test, node),
      },
    );
  } else {
    return PyBlock.create_block(
      "logic_assert",
      node.lineno,
      undefined,
      {},
      {
        BOOL: this.convert(test, node),
        THEN: this.convert(msg, node),
      },
    );
  }
};
