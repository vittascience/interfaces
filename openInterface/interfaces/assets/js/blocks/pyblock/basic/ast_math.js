// Block for numeric value.
PyBlock.prototype.ast_Num = function (node) {
  const n = node.n;
  return PyBlock.createNumBlock(Sk.ffi.remapToJs(n), 'float', node);
};

// Block for basic arithmetic operator.
PyBlock.CONVERT_BINOPS = {
  Sub: 'MINUS',
  Add: 'ADD',
  Mult: 'MULTIPLY',
  Div: 'DIVIDE',
  Pow: 'POWER',
  FloorDiv: 'DIVIDE',
};

PyBlock.prototype.ast_BinOp = function (node) {
  const left = node.left;
  const op = node.op.prototype._astname;
  const right = node.right;
  let blockName = 'math_arithmetic';
  let leftNode = this.convert(left, node);
  let rightNode = this.convert(right, node); // create list with item [...] repeated n times (voir ast_List)

  if (PyBlock.getVarType(leftNode) === 'List' && op === 'Mult') {
    let item;

    if (left._astname === 'List') {
      item = this.convert(left.elts[0], left);
    } else {
      item = leftNode;
    }

    let block = PyBlock.create_block(
      'lists_repeat',
      node.lineno,
      'List',
      {},
      {
        ITEM: item,
        NUM: rightNode,
      },
      { inline: 'true' },
      {},
      {},
    );
    block.elementsType = PyBlock.getVarType(item);
    return block;
  }

  if (left._astname == 'List') {
    return this.convert(left, node);
  } // both left and right are String so String op

  // For the moment, I'm removing the generation of the 'text_join' block because we want to keep the + or * operations on strings. 
  // TO DO : generate a 'text_join' block only in the case str(a) op str(b)
  // if (
  //   (PyBlock.getVarType(leftNode) === 'Str' ||
  //   PyBlock.getVarType(rightNode) === 'Str' ||
  //   (PyBlock.getVarType(leftNode) === 'Str' && PyBlock.getVarType(rightNode) === 'Str'))
  // ) {
  //   let res, values, nodesComputed, blockGuess; //the left node is already a text_join so create a new one with text on the right

  //   if (leftNode.currentBlock === 'text_join') {
  //     nodesComputed = leftNode.nodesComputed.concat([rightNode]);
  //     values = {};
  //     nodesComputed.forEach(function (element, i) {
  //       values['ADD' + i] = element;
  //     });
  //     blockGuess = leftNode.blockGuess;
  //   } else {
  //     nodesComputed = [leftNode, rightNode];
  //     values = {
  //       ADD0: leftNode,
  //       ADD1: rightNode,
  //     };
  //   }

  //   res = PyBlock.create_block(
  //     'text_join',
  //     node.lineno,
  //     'Str',
  //     {},
  //     values,
  //     { inline: 'true' },
  //     {
  //       '@items': nodesComputed.length,
  //     },
  //   );

  //   if (leftNode.getAttribute('type') == 'variables_force_type' && leftNode.querySelector('block').variableName != undefined) {
  //     //Maybe it's an append op
  //     blockGuess = 'text_append';
  //   }

  //   res.blockGuess = blockGuess;
  //   res.nodesComputed = nodesComputed; //Save computed sub_block if we have to change block later

  //   res.currentBlock = 'text_join'; //Say we just finished a text_join block so don't do another one concat them

  //   return res;
  // }

  if (op === 'Mod') {
    blockName = 'math_modulo';
    return PyBlock.create_block(
      blockName,
      node.lineno,
      'int',
      {},
      {
        DIVIDEND: leftNode,
        DIVISOR: rightNode,
      },
      { inline: 'true' },
    );
  } // Math op between 2 number so if one element is a float or it's a division result will be a float otherwise it's an int

  let typeLeft = PyBlock.getVarType(leftNode),
    typeRight = PyBlock.getVarType(rightNode);
  let block_op = PyBlock.CONVERT_BINOPS[op]; // check if

  // If (time.clock() - t0) then custom block
  if (block_op == 'MINUS' && leftNode.getAttribute('type') == 'time_initChronometer') {
    return PyBlock.create_block('time_getChronometer', 0, undefined, {}, {}, { inline: 'true' }, {}, {});
  }

  if (block_op === 'ADD' && leftNode.blockGuess === 'find') {
    if (right._astname === 'Num') {
      let num = Sk.ffi.remapToJs(right.n);
      leftNode = leftNode.childNodes[1].childNodes[0];

      if (num === 1) {
        return leftNode;
      } else {
        rightNode = PyBlock.createNumBlock(num - 1, 'int', node);
      }
    }
  }

  let type = op === 'DIVIDE' || 'FLOOR_DIVIDE' || typeLeft === 'float' || typeRight === 'float' ? 'float' : 'int';
  return PyBlock.create_block(
    blockName,
    node.lineno,
    type,
    {
      OP: block_op,
    },
    {
      A: leftNode,
      B: rightNode,
    },
    {
      inline: true,
    },
  );
};

PyBlock.prototype.math_arithmetic = PyBlock.prototype.ast_BinOp;

// Block for advanced math operators with single operand.
// math_single : Sqrt
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['sqrt'] = function (args, node) {
  // Give node.args and node
  return {
    name: 'math_single',
    fields: {
      OP: 'ROOT',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_single : Abs
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['fabs'] = function (args, node) {
  // Give node.args and node
  return {
    name: 'math_single',
    fields: {
      OP: 'ABS',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_single : LN
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['log'] = function (args, node) {
  // Give node.args and node
  return {
    name: 'math_single',
    fields: {
      OP: 'LN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_single : LN10
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['log10'] = function (args, node) {
  return {
    name: 'math_single',
    fields: {
      OP: 'LOG10',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_single : EXP
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['exp'] = function (args, node) {
  return {
    name: 'math_single',
    fields: {
      OP: 'EXP',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_single : Pow10
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['pow'] = function (args, node) {
  return {
    name: 'math_single',
    fields: {
      OP: 'POW10',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[1], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : Sin
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['sin'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'SIN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : Cos
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['cos'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'COS',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : Tan
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['tan'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'TAN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : ASin
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['asin'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'ASIN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : ACos
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['acos'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'ACOS',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_trig : ATan
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['atan'] = function (args, node) {
  return {
    name: 'math_trig_rad',
    fields: {
      OP: 'ATAN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['random']['randint'] = function (args, node) {
  // Give node.args and node
  return {
    name: 'math_random_int',
    fields: {},
    // tag field of the block <field ...>
    values: {
      FROM: PyBlock.prototype.convert(args[0], node),
      // recursive conversion for args[0]
      TO: PyBlock.prototype.convert(args[1], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    // tag value
    statements: {},
    //tag statement
    returnType: 'int',
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['random']['random'] = function () {
  // Give node.args and node
  return {
    name: 'math_random_float',
    fields: {},
    // tag field of the block <field ...>
    values: {},
    settings: { inline: 'true' },
    // tag value
    statements: {},
    //tag statement
    returnType: 'int',
  };
};

// math_trig : ATan2
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['atan2'] = function (args, node) {
  return {
    name: 'math_atan2_rad',
    fields: {},
    values: {
      X: PyBlock.prototype.convert(args[0], node),
      Y: PyBlock.prototype.convert(args[1], node),
    },
    settings: { inline: 'true' },
    returnType: 'float',
  };
};

// math_number_property : In ast_If, directly created

// Block for mapping number.
PyBlock.prototype.FUNCTIONS_BLOCKS['map'] = function (args, node) {
  return {
    name: 'math_map',
    fields: {},
    values: {
      VALUE: PyBlock.prototype.convert(args[0], node),
      MIN1: PyBlock.prototype.convert(args[1], node),
      MAX1: PyBlock.prototype.convert(args[2], node),
      MIN2: PyBlock.prototype.convert(args[3], node),
      MAX2: PyBlock.prototype.convert(args[4], node),
    },
    statements: {},
  };
};

// Block for rounding functions : round
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['round'] = function (args, node) {
  return {
    name: 'math_round',
    fields: {
      OP: 'ROUND',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'int',
  };
};

// Block for rounding functions : ciel
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['ceil'] = function (args, node) {
  return {
    name: 'math_round',
    fields: {
      OP: 'ROUNDUP',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'int',
  };
};

// Block for rounding functions : floor
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['floor'] = function (args, node) {
  return {
    name: 'math_round',
    fields: {
      OP: 'ROUNDDOWN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    returnType: 'int',
  };
};

// Block for remainder of a division : done in BinOp

PyBlock.prototype.FUNCTIONS_BLOCKS['math_isPrime'] = function (args, node) {
  return {
    name: 'math_number_property',
    fields: { PROPERTY: 'PRIME' },
    values: {
      NUMBER_TO_CHECK: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['math_mean'] = function (args, node) {
  return {
    name: 'math_on_list',
    fields: {
      OP: 'AVERAGE',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: 'true' },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['math_standard_deviation'] = function (args, node) {
  return {
    name: 'math_on_list',
    fields: {
      OP: 'STD_DEV',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: 'true' },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['math_median'] = function (args, node) {
  return {
    name: 'math_on_list',
    fields: {
      OP: 'MEDIAN',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: 'true' },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['math_modes'] = function (args, node) {
  return {
    name: 'math_on_list',
    fields: {
      OP: 'MODE',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: 'true' },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['round'] = function (args, node) {
  // Map function générate a round(map())
  if (args[0].func != undefined && args[0].func.id.v == 'map') return PyBlock.prototype.FUNCTIONS_BLOCKS['map'](args[0].args, args[0]);
  return {
    name: 'math_round',
    fields: {
      OP: 'round',
    },
    values: {
      NUM: PyBlock.prototype.convert(args[0], node),
    },
    settings: { inline: 'true' },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['min'] = function (args) {
  const values = {};
  const mutations = {};
  if (args) {
    mutations['@items'] = args.length;
    for (let i = 0; i < args.length; i++) {
      values['ADD' + i] = PyBlock.prototype.convert(args[i]);
    }
  } else {
    mutations['@items'] = 0;
  }
  return {
    name: 'math_min_max',
    fields: {
      OP: 'MIN',
    },
    values,
    settings: { inline: 'true' },
    statements: {},
    mutations,
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS['max'] = function (args) {
  const values = {};
  const mutations = {};
  if (args) {
    mutations['@items'] = args.length;
    for (let i = 0; i < args.length; i++) {
      values['ADD' + i] = PyBlock.prototype.convert(args[i]);
    }
  } else {
    mutations['@items'] = 0;
  }
  return {
    name: 'math_min_max',
    fields: {
      OP: 'MAX',
    },
    values,
    settings: { inline: 'true' },
    statements: {},
    mutations,
  };
};

// Math on List : Sum
PyBlock.prototype.FUNCTIONS_BLOCKS['math']['sum'] = function (args, node) {
  const num_list = PyBlock.prototype.convert(args[0], node);
  return {
    name: 'math_on_list',
    fields: { OP: 'SUM' },
    values: { NUM: num_list },
    settings: { inline: 'true' },
    returnType: num_list.elementsType !== 'int' ? 'float' : 'int',
  };
};
