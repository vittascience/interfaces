// This file tells what each block should generate
// in terms of Arduino language (C++)

/**
 * Arduino code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Arduino = new Blockly.Generator('Arduino');
Blockly.Arduino.StaticTyping = new Blockly.StaticTyping();

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * Arduino specific keywords defined in: http://arduino.cc/en/Reference/HomePage
 * @private
 */
Blockly.Arduino.addReservedWords(
  'Blockly,' + // In case JS is evaled in the current window.
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
  'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
  'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
  'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
  'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
  'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
  'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
  'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
  'detachInterrupt,interrupts,noInterrupts');

/** Order of operation ENUMs. */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/**
 * Arduino generator short name for
 * Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_
 * @type {!string}
 */
Blockly.Arduino.DEF_FUNC_NAME = Blockly.Arduino
  .FUNCTION_NAME_PLACEHOLDER_;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function (workspace) {
  // Create a dictionary of definitions to be printed at the top of the sketch (#include)
  Blockly.Arduino.includes_ = Object.create(null);
  // Create a dictionary of global definitions to be printed after includes (#define)
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of comments oustitde the setup and loop
  Blockly.Arduino.comments_ = Object.create(null);
  // Create a dictionary of declarations to be printed at the top of the sketch (objects)
  Blockly.Arduino.declarations_ = Object.create(null);
  // Create a dictionary of code variables
  Blockly.Arduino.codeVariables_ = Object.create(null);
  // Create a dictionary of functions from the code generator
  Blockly.Arduino.codeFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names 
  // in head to avoid collision with codeFunctions_
  Blockly.Arduino.functionNames_ = Object.create(null);
  // Create a dictionary of setups to be printed in the setup() function
  Blockly.Arduino.codeSetup_ = Object.create(null);
  // Create a dictionary of powers to be printed in the setup() function
  Blockly.Arduino.powers_ = Object.create(null);

  // Create a dictionary of variables
  Blockly.Arduino.variables_ = Object.create(null);
  // Create a dictionary for stacking user functions
  Blockly.Arduino.userFunctions_ = Object.create(null);
  // Create a dictionnary for stacking user elements in setup
  Blockly.Arduino.userSetup_ = Object.create(null);
  // Create a dictionnary for stacking user elements in loop
  Blockly.Arduino.userLoop_ = Object.create(null);

  if (!Blockly.Arduino.nameDB_) {
    Blockly.Arduino.nameDB_ = new Blockly.Names(Blockly.Arduino
      .RESERVED_WORDS_);
  } else {
    Blockly.Arduino.nameDB_.reset();
  }

  // Below line added for the variable names to work
  Blockly.Arduino.nameDB_.setVariableMap(workspace.getVariableMap());

  // Iterate through to capture all blocks types and set the function arguments
  var varsWithTypes = Blockly.Arduino.StaticTyping
    .collectVarsWithTypes(workspace);
  var varListId = Blockly.Arduino.StaticTyping.collectListsId(
    workspace);
  Blockly.Arduino.StaticTyping.setProcedureArgs(workspace,
    varsWithTypes);

  for (var variable in varsWithTypes) {
    if (!Blockly.StaticTyping.getProcedureVarType(workspace, variable)) {
      if (varListId[variable] == null) {
        let varName = Blockly.Arduino.nameDB_.getName(
          variable, Blockly.Variables.NAME_TYPE);
        let varType = Blockly.Arduino.getArduinoType_(varsWithTypes[
          variable]);
        Blockly.Arduino.addVariable(variable, varType + " " +
          varName + ";");
      }
    }
  }
};

/**
 * Convert an object into list of object values.
 * @param {Object} object
 * @return {!Array.<string>} list
 */
Blockly.Arduino.convertObjectInLists = function (object, setLine) {
  var list = [];
  if (setLine) {
    for (var i in object) {
      list.push(object[i]);
    }
    if (list.length) {
      list.push('\n');
    }
  } else {
    list.push("");
    for (var i in object) {
      list.push(object[i]);
    }
  }
  delete object;
  return list;
};

/**
 * Prepare all generated code to be placed in the sketch specific locations.
 * @return {string} Completed sketch code.
 */
Blockly.Arduino.finish = function () {
  // Merge all functions defined by user and by blocks code
  Blockly.Arduino.functions_ = Object.assign({},
    Blockly.Arduino.codeFunctions_,
    Blockly.Arduino.userFunctions_);

  // Merge all variables defined by user and by blocks code
  Blockly.Arduino.allVariables_ = Object.assign({},
    Blockly.Arduino.codeVariables_,
    Blockly.Arduino.variables_);

  // Recover the includes, definitions, declarations 
  // and functions to generate head code
  var includes = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.includes_, true),
    defines = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.definitions_, true),
    declarations = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.declarations_, true),
    variables = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.allVariables_, true),
    comments = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.comments_, true),
    functions = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.functions_, true);

  var headCode = includes.join("\n") + defines.join("\n")
    + declarations.join("\n") + variables.join("\n") + comments.join("\n")
    + functions.join("\n\n");

  // Recover code setups and user setups to generate setup function code
  var codeSetupStack = Blockly.Arduino.convertObjectInLists(
    Blockly.Arduino.codeSetup_, false);
  var powersStack = Blockly.Arduino.convertObjectInLists(
    Blockly.Arduino.powers_, false);
  // This for codeSetup has been added to add indent on the setup block 
  // for the "automatic code generation"
  for (let j = 0; j < codeSetupStack.length; j++) {
    codeSetupStack[j] = "  " + codeSetupStack[j].replace(/[\n]/g,
      "\n  ");
  }
  for (let j = 0; j < powersStack.length; j++) {
    powersStack[j] = "  " + powersStack[j].replace(/[\n]/g,
      "\n  ");
  }

  var userSetupStack = Blockly.Arduino.convertObjectInLists(
    Blockly.Arduino.userSetup_, false);
  var setupCode = "void setup() {" + codeSetupStack.join("\n") +
    powersStack.join("\n") + userSetupStack.join("\n") + "\n}\n\n";

  // Recover loop function and user setups to generate setup function code
  var userLoopStack = Blockly.Arduino.convertObjectInLists(
    Blockly.Arduino.userLoop_, false);
  var loopCode = "void loop() {" + userLoopStack.join("\n") + "\n}";

  Blockly.Arduino.nameDB_.reset();
  delete Blockly.Arduino.functionNames_;

  return headCode + setupCode + loopCode
};

/**
 * Adds a string of comments to be added to the sketch.
 * Once a comment is added it will not get overwritten with new code.
 * @param {!string} commentTag Identifier for this comment.
 * @param {!string} comment Comment to be included in the sketch.
 */
Blockly.Arduino.addComment = function (commentTag, comment) {
  if (Blockly.Arduino.comments_[commentTag] === undefined) {
    Blockly.Arduino.comments_[commentTag] = comment;
  }
};

/**
 * Adds a string of "#include" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} includeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.addInclude = function (includeTag, code) {
  if (Blockly.Arduino.includes_[includeTag] === undefined) {
    Blockly.Arduino.includes_[includeTag] = code;
  }
};

/**
 * Adds a string of "#define" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} defineTag Identifier for this include code.
 * @param {!string} code Code to be added below the includes.
 */
Blockly.Arduino.addDefine = function (defineTag, code) {
  if (Blockly.Arduino.definitions_[defineTag] === undefined) {
    Blockly.Arduino.definitions_[defineTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} declarationTag Identifier for this declaration code.
 * @param {!string} code Code to be added below the defines.
 */
Blockly.Arduino.addDeclaration = function (declarationTag, code) {
  if (Blockly.Arduino.declarations_[declarationTag] === undefined) {
    Blockly.Arduino.declarations_[declarationTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} variableTag Identifier for this variable code.
 * @param {!string} code Code to be added below the defines.
 */
Blockly.Arduino.addCodeVariable = function (variableTag, code) {
  if (Blockly.Arduino.codeVariables_[variableTag] === undefined) {
    Blockly.Arduino.codeVariables_[variableTag] = code;
  }
};

/**
 * Adds a string of code to declare a variable globally to the sketch.
 * Only if overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} varName The name of the variable to declare.
 * @param {!string} code Code to be added for the declaration.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the declaration overwrote a previous one.
 */
Blockly.Arduino.addVariable = function (varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.variables_[varName] ===
    undefined)) {
    Blockly.Arduino.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code into the Arduino setup() function. It takes an
 * identifier to not repeat the same kind of initialisation code from several
 * blocks. If overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} setupTag Identifier for the type of set up code.
 * @param {!string} code Code to be included in the setup() function.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the new setup code overwrote a previous one.
 */
Blockly.Arduino.addSetup = function (setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.codeSetup_[setupTag] ===
    undefined)) {
    Blockly.Arduino.codeSetup_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of "powers" code to be added after code setupes.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} powerTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.addPowerOn = function (powerTag, code) {
  if (Blockly.Arduino.powers_[powerTag] === undefined) {
    Blockly.Arduino.powers_[powerTag] = code;
  }
};

/**
 * Adds a string of code into the user setup stack.
 * @param {string} id Identifier for the type of set up code.
 * @param {string} code Code to be included in the setup() function.
 * @return {boolean} true
 */
Blockly.Arduino.addUserSetup = function (id, code) {
  Blockly.Arduino.userSetup_[id] = code;
  return (true);
};

/**
 * Adds a string of code into the user loop stack.
 * @param {string} id Identifier for the type of set up code.
 * @param {string} code Code to be included in the setup() function.
 * @return {boolean} true
 */
Blockly.Arduino.addUserLoop = function (id, code) {
  Blockly.Arduino.userLoop_[id] = code;
  return (true);
};

/**
 * Adds a string of code as a function. It takes an identifier (meant to be the
 * function name) to only keep a single copy even if multiple blocks might
 * request this function to be created.
 * A function (and its code) will only be added on first request.
 * @param {!string} preferedName Identifier for the function.
 * @param {!string} code Code to be included in the setup() function.
 * @return {!string} A unique function name based on input name.
 */
Blockly.Arduino.addFunction = function (preferedName, code) {
  if (Blockly.Arduino.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.Arduino.nameDB_.getDistinctName(
      preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.codeFunctions_[preferedName] =
      code.replace(Blockly.Arduino.DEF_FUNC_NAME, uniqueName);
    Blockly.Arduino.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.Arduino.functionNames_[preferedName];
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function (string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n')
    .replace(/\$/g, '\\$').replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.Arduino.scrub_ = function (block, code) {
  if (code === null) {
    return '';
  } // Block has handled code generation itself

  var commentCode = '';
  // Only collect comments for blocks that aren't inline
  if (!block.outputConnection || !block.outputConnection
    .targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments
    // Don't collect comments for nested statements
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection
          .targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection
    .targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Get the c++ type string by defined types in Blockly.Types
 * @param {Blockly.Type} type
 * @return {String} c++ type
 */
Blockly.Arduino.getArduinoType_ = function (type) {
  switch (type) {
    case Blockly.Types.CHARACTER:
      return "char";
    case Blockly.Types.TEXT:
      return "String";
    case Blockly.Types.BOOLEAN:
      return "boolean";
    case Blockly.Types.SHORT_NUMBER:
      return "short";
    case Blockly.Types.NUMBER:
      return "int";
    case Blockly.Types.LARGE_NUMBER:
      return "long";
    case Blockly.Types.DECIMAL:
      return "float";
    case Blockly.Types.NULL:
      return "void";
    case Blockly.Types.UNDEF:
      return "undefined";
    default:
      return "invalidBlocklyType"
  }
};

/** Used for not-yet-implemented block code generators (output) */
Blockly.Arduino.noGeneratorCodeInline = function () {
  return ['', Blockly.Arduino.ORDER_ATOMIC];
};

/** Used for not-yet-implemented block code generators*/
Blockly.Arduino.noGeneratorCodeLine = function () {
  return '';
};

/**
 * Indents the given string.
 * @param {string} str String to be indented.
 * @param {number} numOfIndents Indents to place before lines.
 * @return {string} Indentend string.
 */
Blockly.Arduino.indent = function (str, numOfIndents) {
  return str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('  '));
};