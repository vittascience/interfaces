PyBlock.prototype.detectNewLines = function (text) {
  let numberOfNewLines = (text.match(/\n/g) || []).length;
  return numberOfNewLines;
};

PyBlock.prototype.isDocString = function (node, parent) {
  return (parent  &&
    parent._astname === "Expr" &&
    parent._parent &&
    ["FunctionDef", "ClassDef"].indexOf(parent._parent._astname) !== -1 &&
    parent._parent.body[0] === parent
  );
};

PyBlock.prototype.isSimpleString = function (text) {
  return text.split("\n").length <= 2 && text.length <= 40;
};

PyBlock.prototype.dedent = function (text, levels, isDocString) {
  if (!isDocString && text.charAt(0) === "\n") {
    return text;
  }

  const split = text.split("\n");
  const indentation = "    ".repeat(levels);
  const recombined = [];

  // Are all lines indented?
  for (let i = 0; i < split.length; i++) {
    // This was a blank line, add it unchanged unless its the first line
    if (split[i] === "") {
      if (i !== 0) {
        recombined.push("");
      }

      // If it has our ideal indentation, add it without indentation
    } else if (split[i].startsWith(indentation)) {
      const unindentedLine = split[i].substr(indentation.length);
      if (unindentedLine !== "" || i !== split.length - 1) {
        recombined.push(unindentedLine);
      }

      // If it's the first line, then add it unmodified
    } else if (i === 0) {
      recombined.push(split[i]);
      // This whole structure cannot be uniformly dedented, better give up.
    } else {
      return text;
    }
  }

  return recombined.join("\n");
};

// Block for adding comment in code
PyBlock.prototype["ast_Comment"] = function (txt) {
  let commentText = txt.slice(1);
  if (commentText.length && commentText[0] === " ") {
    commentText = commentText.substring(1);
  }

  if (commentText.match(/ on pin\w+/g))
  {
    let res = commentText.split(" ");
    let split = commentText.split('/');
    PyBlock.prototype.PIN[res[res.length - 1]] = res[0];

    return null
  }

  return PyBlock.create_block("text_comment", 0, undefined, {
    TEXT: commentText,
  });
};

// Block for text value
// TODO: Handle indentation intelligently
PyBlock.prototype.ast_Str = function (node, parent) {
  const s = node.s;
  const text = Sk.ffi.remapToJs(s);
  /*if (text.startsWith("http") && text.endsWith(".png")) {
      return PyBlock.create_block("ast_Image", 0, {}, {}, {},
          {"@src": text});
  } else*/

  if (this.detectNewLines(text) > 0) {
    return PyBlock.create_block(
      "text_newline",
      0,
      "Str",
      {},
      {
        N: PyBlock.createNumBlock(this.detectNewLines(text), undefined, node),
      },
    );
  } else if (this.isDocString(node, parent)) {
    let dedented = this.dedent(text, this.levelIndex - 1, true);
    return [
      PyBlock.create_block("ast_StrDocstring", 0, undefined, {
        TEXT: dedented,
      }),
    ];
  } else if (text.indexOf("\n") === -1) {
    return PyBlock.create_block(
      "text",
      0,
      "Str",
      {
        TEXT: text,
      },
      {},
      { inline: "true" },
    );
  } else {
    let _dedented = this.dedent(text, this.levelIndex - 1, false);

    return PyBlock.create_block(
      "text",
      0,
      "Str",
      {
        TEXT: _dedented,
      },
      {},
      { inline: "true" },
    );
  }
};

// Block for joining text items
PyBlock.prototype.METHOD_GLOBAL.format = function (args, node) {
  const values = {};
  const mutations = {};
  if (args) {
    mutations["@items"] = args.length - 1;
    for (let i = 1; i < args.length; i++) {
      values["ADD" + (i - 1)] = PyBlock.prototype.convert(args[i], node);
    }
  } else {
    mutations["@items"] = 0;
  }

  return {
    name: "text_join",
    fields: {},
    values,
    settings: { inline: "true" },
    statements: {},
    mutations,
  };
};

// in text (args[0]) find first occurence of text (args[1])
PyBlock.prototype.METHODS_BLOCKS["Str"]["find"] = function (args, node) {
  const values = {
    VALUE: PyBlock.prototype.convert(args[0], node),
  };

  if (args[1] != undefined) {
    Object.assign(values, {
      FIND: PyBlock.prototype.convert(args[1], node),
    });
  }

  return {
    name: "text_indexOf",
    fields: {
      END: "FIRST",
    },
    values: values,
    statements: {},
    settings: { inline: "true" },
    returnType: "int",
    guessType: "find",
  };
};

// in text (args[0]) find last occurence of text (args[1])
PyBlock.prototype.METHODS_BLOCKS["Str"]["rfind"] = function (args, node) {
  const values = {
    VALUE: PyBlock.prototype.convert(args[0], node),
  };

  if (args[1] != undefined) {
    Object.assign(values, {
      FIND: PyBlock.prototype.convert(args[1], node),
    });
  }

  return {
    name: "text_indexOf",
    fields: {
      END: "LAST",
    },
    values: values,
    settings: { inline: "true" },
    statements: {},
    returnType: "int",
    guessType: "find",
  };
};

// Trim spaces from both sides of string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["strip"] = function (args, node) {
  return {
    name: "text_trim",
    fields: {
      MODE: "BOTH",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "Str",
  };
};

// Trim spaces from left side of string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["lstrip"] = function (args, node) {
  return {
    name: "text_trim",
    fields: {
      MODE: "LEFT",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "Str",
  };
};

// Trim spaces from right side of string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["rstrip"] = function (args, node) {
  return {
    name: "text_trim",
    fields: {
      MODE: "RIGHT",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "Str",
  };
};

// to UPPER CASE from string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["upper"] = function (args, node) {
  return {
    name: "text_changeCase",
    fields: {
      CASE: "UPPERCASE",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "Str",
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["random_letter"] = function (args, node) {
  return {
    name: "text_charAt",
    fields: {
      WHERE: "RANDOM",
    },
    values: {
      VALUE: PyBlock.prototype.convert(args[0], node),
    },
    statements: {},
  };
};

// to lower case from string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["lower"] = function (args, node) {
  return {
    name: "text_changeCase",
    fields: {
      CASE: "LOWERCASE",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    statements: {},
    returnType: "Str",
  };
};

// to Title Case from string, args[0] is the string
PyBlock.prototype.METHODS_BLOCKS["Str"]["title"] = function (args, node) {
  return {
    name: "text_changeCase",
    fields: {
      CASE: "TITLECASE",
    },
    values: {
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    statements: {},
    returnType: "Str",
  };
};

// replace args[1] into args[2] in text
PyBlock.prototype.METHODS_BLOCKS["Str"]["replace"] = function (args, node) {
  return {
    name: "text_replace",
    fields: {},
    values: {
      FROM: PyBlock.prototype.convert(args[1], node),
      TO: PyBlock.prototype.convert(args[2], node),
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    mutations: {},
    statements: {},
  };
};

// make list from text args[0] with delimiter args[1]
PyBlock.prototype.METHODS_BLOCKS["Str"]["split"] = function (args, node) {
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

// make text from list args[1] with delimiter args[0]
PyBlock.prototype.METHODS_BLOCKS["Str"]["join"] = function (args, node) {
  const values = {
    INPUT: PyBlock.prototype.convert(args[1], node),
  };

  if (args[0] != undefined) {
    Object.assign(values, {
      DELIM: PyBlock.prototype.convert(args[0], node),
    });
  }

  return {
    name: "lists_split",
    fields: {
      MODE: "JOIN",
    },
    values: values,
    settings: { inline: "true" },
    mutations: {
      "@mode": "JOIN",
    },
    statements: {},
    returnType: "Str",
  };
};

// count the number of args[1] in text
PyBlock.prototype.METHODS_BLOCKS["Str"]["count"] = function (args, node) {
  return {
    name: "text_count",
    fields: {},
    values: {
      SUB: PyBlock.prototype.convert(args[1], node),
      TEXT: PyBlock.prototype.convert(args[0], node), // recursive conversion for args[0]
    },
    settings: { inline: "true" },
    mutations: {},
    statements: {},
  };
};
