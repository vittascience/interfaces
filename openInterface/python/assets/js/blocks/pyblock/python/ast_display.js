PyBlock.prototype.FUNCTIONS_BLOCKS["time"]["sleep"] = function (args, node) {
  return {
    name: "time_sleep",
    fields: {},
    values: {
      TIME: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["time"]["time"] = function (args, node) {
  return {
    name: "time_time",
    fields: {},
    values: {
      TIME: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["time"]["clock"] = function () {
  return {
    name: "time_initChronometer",
    fields: {},
    values: {},
    blockGuess: "time_initChronometer",
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["time"]["ctime"] = function () {
  return {
    name: "time_getDate",
    fields: {},
    values: {},
    settings: { inline: "true" },
    statements: {},
  };
};
