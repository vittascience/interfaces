PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["forward"] = function (
  args,
  node,
) {
  return {
    name: "turtle_direction",
    fields: {
      DIR: "FORWARD",
    },
    values: {
      DISTANCE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["backward"] = function (
  args,
  node,
) {
  return {
    name: "turtle_direction",
    fields: {
      DIR: "BACKWARD",
    },
    values: {
      DISTANCE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["right"] = function (args, node) {
  return {
    name: "turtle_turn",
    fields: {
      DIR: "RIGHT",
    },
    values: {
      DISTANCE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["left"] = function (args, node) {
  return {
    name: "turtle_turn",
    fields: {
      DIR: "LEFT",
    },
    values: {
      DISTANCE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["goto"] = function (args, node) {
  return {
    name: "turtle_goto",
    fields: {},
    values: {
      X: PyBlock.prototype.convert(args[0], node),
      Y: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["circle"] = function (args, node) {
  if (args.length == 2) {
    return {
      name: "turtle_arc",
      fields: {},
      values: {
        RADIUS: PyBlock.prototype.convert(args[0], node),
        ANGLE: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
    };
  }
  return {
    name: "turtle_circle",
    fields: {},
    values: {
      RADIUS: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["write"] = function (args, node) {
  return {
    name: "turtle_write",
    fields: {},
    values: {
      TYPE: PyBlock.prototype.convert(args[0], node),
      VALUE: PyBlock.create_block("math_number", node.lineno, undefined, {
        NUM: args[3].s.v.slice(0, -9),
      }),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["shape"] = function (args) {
  return {
    name: "turtle_shape",
    fields: {
      TYPE: args[0].s.v,
    },
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["penup"] = function () {
  return {
    name: "turtle_pen",
    fields: {
      PEN: "UP",
    },
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["pendown"] = function () {
  return {
    name: "turtle_pen",
    fields: {
      PEN: "DOWN",
    },
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["showturtle"] = function () {
  return {
    name: "turtle_visibility",
    fields: {
      VISIBILITY: "SHOW",
    },
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["hideturtle"] = function () {
  return {
    name: "turtle_visibility",
    fields: {
      VISIBILITY: "HIDE",
    },
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["stamp"] = function () {
  return {
    name: "turtle_stamp",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["speed"] = function (args, node) {
  return {
    name: "turtle_speed",
    fields: {},
    values: {
      VALUE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["reset"] = function () {
  return {
    name: "turtle_reset",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["color"] = function (args) {
  let result = args[0].right.elts
    .map(function (obj) {
      let value = parseInt(obj.n.v, 16);
      return value < 10 ? "0" + value : value.toString();
    })
    .join("");
  return {
    name: "turtle_color",
    fields: {},
    values: {
      COLOR: PyBlock.create_block("colour_picker", 0, undefined, {
        COLOUR: result,
      }),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["width"] = function (args, node) {
  return {
    name: "turtle_width",
    fields: {},
    values: {
      WIDTH: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["fillcolor"] = function (args) {
  let result = args[0].right.elts
    .map(function (obj) {
      let value = parseInt(obj.n.v, 16);
      return value < 10 ? "0" + value : value.toString();
    })
    .join("");
  return {
    name: "turtle_fillcolor",
    fields: {},
    values: {
      COLOR: PyBlock.create_block("colour_picker", 0, undefined, {
        COLOUR: result,
      }),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["begin_fill"] = function () {
  return {
    name: "turtle_fillbegin",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["turtle"]["end_fill"] = function () {
  return {
    name: "turtle_fillend",
    fields: {},
    values: {},
    statements: {},
  };
};
