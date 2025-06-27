// This file tells what each block should generate
// in terms of Python language.

/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Python = new Blockly.Generator('Python');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial. This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
  'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
  'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
  'or,pass,print,raise,return,try,while,with,yield,' +
  'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
  'ArithmeticError,AssertionError,AttributeError,BaseException,' +
  'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
  'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
  'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
  'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
  'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
  'ImportWarning,IndentationError,IndexError,InterruptedError,' +
  'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
  'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
  'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
  'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
  'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
  'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
  'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
  'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
  'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
  'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
  '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
  'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
  'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
  'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
  'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
  'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
  'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
  'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
  'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
);

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Python.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Python.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Python.ORDER_MEMBER = 2.1;          // . []
Blockly.Python.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.Python.ORDER_EXPONENTIATION = 3;    // **
Blockly.Python.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Python.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Python.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Python.ORDER_ADDITIVE = 6;          // + -
Blockly.Python.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Python.ORDER_BITWISE_AND = 8;       // &
Blockly.Python.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Python.ORDER_BITWISE_OR = 10;       // |
Blockly.Python.ORDER_RELATIONAL = 11;       // in, not in, is, is not, <, <=, >, >=, <>, !=, ==
Blockly.Python.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Python.ORDER_LOGICAL_AND = 13;      // and
Blockly.Python.ORDER_LOGICAL_OR = 14;       // or
Blockly.Python.ORDER_CONDITIONAL = 15;      // if else
Blockly.Python.ORDER_LAMBDA = 16;           // lambda
Blockly.Python.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Python.ORDER_OVERRIDES = [
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_MEMBER],
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_FUNCTION_CALL],
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_MEMBER],
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_FUNCTION_CALL],
  [Blockly.Python.ORDER_LOGICAL_NOT, Blockly.Python.ORDER_LOGICAL_NOT],
  [Blockly.Python.ORDER_LOGICAL_AND, Blockly.Python.ORDER_LOGICAL_AND],
  [Blockly.Python.ORDER_LOGICAL_OR, Blockly.Python.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 * @this {Blockly.Generator}
 */
Blockly.Python.init = function (workspace) {
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  Blockly.Python.BREAK = this.INDENT + 'break\n';
  // Create a dictionary of imports to be printed at the top of code.
  Blockly.Python.imports_ = Object.create(null);
  // Create a dictionary of constants to be printed after definitions.
  Blockly.Python.constants_ = Object.create(null);
  // Create a dictionary of hidden constants (not printed in code).
  Blockly.Python.hiddenConstants_ = Object.create(null);
  // Create a dictionary of class to be printed after constants.
  Blockly.Python.classes_ = Object.create(null);
  // Create a dictionary of object initializations to be printed after definitions.
  Blockly.Python.inits_ = Object.create(null);
  // Create a dictionary of code functions to be printed after user functions.
  Blockly.Python.codeFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names in codeFunctions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);
  // Create a dictionary of powers to be printed after definitions.
  Blockly.Python.powers_ = Object.create(null);
  // Create a dictionary of onEvents to be printed after user functions (specicic to Thymio)
  Blockly.Python.powersEvents_ = Object.create(null);
  // Create a dictionary of user functions to be printed after powers.
  Blockly.Python.userOnStart_ = Object.create(null);
  // Create a dictionary of user functions to be printed after user on_start.
  Blockly.Python.userEvents_ = Object.create(null);
  // Create a dictionary of user setups to be printed after user functions.
  Blockly.Python.userFunctions_ = Object.create(null);
  // Create a string for userLoop code
  Blockly.Python.forEver_ = '';
  // Create a dictionnary of user variable in userLoop
  Blockly.Python.userLoopVar_ = Object.create(null);
  // Create a dictionary of events for Thymio
  Blockly.Python.onEvents_ = '';
  // Create a dictionary of globals for Thymio
  Blockly.Python.globals_ = [];
  // Create a dictionary of python variables (needed for asynchronous code execution => global scope)
  Blockly.Python.variables_ = [];

  if (["esp32", "m5stack", "galaxia", "pico"].includes(INTERFACE_NAME)) {
    // Create a dictionary of javascript code to be after user setups to generate script.js file.
    Blockly.Python.jsCodes_ = Object.create(null);
    // Create a dictionary of css code to be added after user setups to generate style.css file.
    Blockly.Python.cssStyles_ = Object.create(null);

    // Create a dictionary of html id and its span value.
    Blockly.Python.htmlSpans_ = Object.create(null);
    // Create a dictionary of html id and its gauge value.
    Blockly.Python.htmlGauges_ = Object.create(null);
    // Create a dictionary of html id and its image data.
    Blockly.Python.htmlImages_ = Object.create(null);
  }

  if (!Blockly.Python.nameDB_) {
    Blockly.Python.nameDB_ = new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.nameDB_.reset();
  }
  Blockly.Python.nameDB_.setVariableMap(workspace.getVariableMap());
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} userLoop Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function (userLoop) {
  // Create all definitions in head of python code.
  const imports = Blockly.Python.convertObjectInLists(Blockly.Python.imports_),
    constants = Blockly.Python.convertObjectInLists(Blockly.Python.constants_),
    classes = Blockly.Python.convertObjectInLists(Blockly.Python.classes_),
    inits = Blockly.Python.convertObjectInLists(Blockly.Python.inits_),
    codeFunctions = Blockly.Python.convertObjectInLists(Blockly.Python.codeFunctions_),
    powers = Blockly.Python.convertObjectInLists(Blockly.Python.powers_),
    powersEvents = Blockly.Python.convertObjectInLists(Blockly.Python.powersEvents_),
    userFunctions = Blockly.Python.convertObjectInLists(Blockly.Python.userFunctions_),
    userLoopVars = Blockly.Python.convertObjectInLists(Blockly.Python.userLoopVar_);

  const head = imports.join("\n") + "\n\n" + constants.join("\n") + "\n"
    + classes.join("\n") + "\n\n" + inits.join("\n")
    + codeFunctions.join("\n\n") + powers.join("\n") + userFunctions.join("\n\n") + powersEvents.join("\n") + "\n";

  // Add user setups after head of python code (from block 'on_start').
  const userOnStart = Blockly.Python.convertObjectInLists(Blockly.Python.userOnStart_);
  const userEvents = Blockly.Python.convertObjectInLists(Blockly.Python.userEvents_);
  const setup = userOnStart.join("\n") + userEvents.join("\n\n");

  if (Blockly.Python.forEver_ !== '') {
    let splitForEver = Blockly.Python.forEver_.split('\n'),
      userLoopSplit = userLoop.split('\n'),
      newCode = [];
    for (let i = 0; i < splitForEver.length; i++)
      splitForEver[i] = "  " + splitForEver[i];
    newCode.push(userLoopSplit[0]);
    for (let i = 0; i < splitForEver.length - 1; i++)
      newCode.push(splitForEver[i]);
    for (let i = 1; i < userLoopSplit.length - 1; i++)
      newCode.push(userLoopSplit[i]);
    userLoop = newCode.join('\n');
  }
  if (userLoopVars.length > 0) {
    let userLoopSplit = userLoop.split('\n'),
      newCode = [userLoopSplit[0]];
    for (let i = 0; i < userLoopVars.length; i++)
      if (userLoopVars[i] != '\n')
        newCode.push("  " + userLoopVars[i]);
    for (let i = 1; i < userLoopSplit.length - 1; i++)
      newCode.push(userLoopSplit[i]);
    userLoop = newCode.join("\n");
  }

  // Deleting objects and reseting workspace variables.
  delete Blockly.Python.userFunctions_;
  delete Blockly.Python.userOnStart_;
  delete Blockly.Python.userEvents_;
  delete Blockly.Python.functionNames_;
  if (["esp32", "m5stack", "galaxia", "pico"].includes(INTERFACE_NAME)) {
    delete Blockly.Python.htmlSpans_;
    delete Blockly.Python.htmlGauges_;
    delete Blockly.Python.htmlImages_;
  }
  Blockly.Python.nameDB_.reset();

  return (head + setup).replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + userLoop;
};

/**
 * Convert an object into list of object values.
 * @param {Object} object
 * @return {!Array.<string>} list
 */
Blockly.Python.convertObjectInLists = function (object) {
  let list = Object.keys(object).map((key) => [object[key]]);
  if (list.length) {
    list.push('\n');
  }
  delete object;
  return list;
};

/**
 * Adds a string of "userLoopVar" code to be added at the top of sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} varTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addUserLoopVar = function (varTag, code) {
  if (Blockly.Python.userLoopVar_[varTag] === undefined) {
    Blockly.Python.userLoopVar_[varTag] = code;
  }
};

/**
 * Adds a string of "import" code to be added at the top of sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} importTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addImport = function (importTag, code) {
  if (Blockly.Python.imports_[importTag] === undefined) {
    Blockly.Python.imports_[importTag] = code;
  }
};

/**
 * Adds a string of "constant" code to be added after the imports.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} constantTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addConstant = function (constantTag, code) {
  if (Blockly.Python.constants_[constantTag] === undefined) {
    Blockly.Python.constants_[constantTag] = code;
  }
};

/**
 * 
 * @param {*} constantTag 
 * @param {*} code 
 */
Blockly.Python.addHiddenConstant = function (constantTag, code) {
  if (Blockly.Python.hiddenConstants_[constantTag] === undefined) {
    Blockly.Python.hiddenConstants_[constantTag] = code;
  }
};

/**
 * Adds a string of "constant" code to be added after the imports.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} classTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addClass = function (classTag, code) {
  if (Blockly.Python.classes_[classTag] === undefined) {
    Blockly.Python.classes_[classTag] = code;
  }
};

/**
 * Adds a string of "init" code to be added after functions.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} initTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addInit = function (initTag, code) {
  if (Blockly.Python.inits_[initTag] === undefined) {
    Blockly.Python.inits_[initTag] = code;
  }
};

/**
 * Adds a string of "function" code to be added after constants.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} functionTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 * @param {!string} replacing Force the function storage if it exists
 */
Blockly.Python.addFunction = function (functionTag, code, replacing = false) {
  if (Blockly.Python.codeFunctions_[functionTag] === undefined || replacing) {
    Blockly.Python.codeFunctions_[functionTag] = code;
  }
};

/**
 * Adds a string of "powers" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} powerTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addPowerOn = function (powerTag, code) {
  if (Blockly.Python.powers_[powerTag] === undefined) {
    Blockly.Python.powers_[powerTag] = code;
  }
};

/**
 * Adds a string of "powersEvents" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {string} powerTag Identifier for this include code.
 * @param {string} code Code to be included at the very top of the sketch.
 * */
Blockly.Python.addPowerOnEvent = function (powerTag, code) {
  if (Blockly.Python.powersEvents_[powerTag] === undefined) {
    Blockly.Python.powersEvents_[powerTag] = code;
  }
};

/**
 * Adds a string of "events" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} eventTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.addEvent = function (eventTag, code) {
  if (Blockly.Python.userEvents_[eventTag] === undefined) {
    Blockly.Python.userEvents_[eventTag] = code;
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function (line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function (string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n');

  // Follow the CPython behaviour of repr() for a non-byte string.
  var quote = '\'';
  if (string.indexOf('\'') !== -1) {
    if (string.indexOf('"') === -1) {
      quote = '"';
    } else {
      string = string.replace(/'/g, '\\\'');
    }
  };
  return quote + string + quote;
};

/**
 * Encode a string as a properly escaped multiline Python string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.multiline_quote_ = function (string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/'''/g, '\\\'\\\'\\\'');
  return '\'\'\'' + string + '\'\'\'';
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function (block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
        Blockly.Python.COMMENT_WRAP - 3);
      commentCode += Blockly.Python.prefixLines(comment + '\n', '# ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Python.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  block.workspace.options.oneBasedIndex = false;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.Python.ORDER_ADDITIVE :
    Blockly.Python.ORDER_NONE;
  var at = Blockly.Python.valueToCode(block, atId, atOrder) || defaultAtIndex;
  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
    }
  }
  return at;
};

/**
 * Indents the given string.
 * @param {string} str String to be indented.
 * @param {number} numOfIndents Indents to place before lines.
 * @return {string} Indentend string.
 */
Blockly.Python.indent = function (str, numOfIndents) {
  return str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('  '));
};

/**
 * Get code of global vars used in functions blocks defined by user.
 * @param {Blockly.Block} block
 * @param {string} blockCode
 * @return {string} globalVar
 */
Blockly.Python.getUsedGlobalVarInBlock = function (block, blockCode) {
  /// Get the workspace's variables
  const variables = block.workspace.getVariablesOfType("");
  const isVarInWorkspace = Object.keys(variables).length > 0;
  let usedVariables = [];
  let globalVar = "";
  /// The names of the variables found in the generated code (branch) are declared as global at the start of the function.
  if (isVarInWorkspace) {
    for (var variable of variables) {
      var name = Blockly.Python.nameDB_.getName(variable.name, Blockly.VARIABLE_CATEGORY_NAME);
      if (blockCode.includes(name)) {
        usedVariables.push(name);
      }
    }
    if (usedVariables.length > 0) {
      globalVar = Blockly.Python.INDENT + "global " + usedVariables.toString().replaceAll(",", ", ") + NEWLINE;
    }
  }
  return globalVar;
};