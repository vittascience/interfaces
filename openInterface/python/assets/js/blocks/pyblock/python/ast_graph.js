PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["grid"] = function () {
  return {
    name: "graph_matplotlib_grid",
    fields: {},
    values: {},
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["text"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_text",
    fields: {},
    values: {
      X: PyBlock.prototype.convert(args[0], node),
      Y: PyBlock.prototype.convert(args[1], node),
      TEXT: PyBlock.prototype.convert(args[2], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["title"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_settitle",
    fields: {},
    values: {
      TITLE_LABEL: PyBlock.prototype.convert(args[0], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["xlabel"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_xlabel",
    fields: {},
    values: {
      X_LABEL: PyBlock.prototype.convert(args[0], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["ylabel"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_ylabel",
    fields: {},
    values: {
      Y_LABEL: PyBlock.prototype.convert(args[0], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["plot"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_plot_create",
    fields: {},
    values: {
      X: PyBlock.prototype.convert(args[0], node),
      Y: PyBlock.prototype.convert(args[1], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["scatter"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_scatter_create",
    fields: {},
    values: {
      X: PyBlock.prototype.convert(args[0], node),
      Y: PyBlock.prototype.convert(args[1], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["bar"] = function (
  args,
  node,
) {
  return {
    name: "graph_matplotlib_bar_create",
    fields: {},
    values: {
      LEFT: PyBlock.prototype.convert(args[0], node),
      HEIGHT: PyBlock.prototype.convert(args[1], node),
    },
    statements: {}, //tag statement
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["matplotlib.pyplot"]["show"] = function () {
  return {
    name: "graph_matplotlib_show",
    fields: {},
    values: {},
    statements: {}, //tag statement
  };
};
