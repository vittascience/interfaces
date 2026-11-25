/**
 * @fileoverview PICAXE BASIC generators for the blocks of the shared logic, loops, math, variables and procedures.
 * PICAXE BASIC: no parentheses in let/if, expressions are evaluated from left to right.
 */

// PICAXE BASIC: reuses the Blockly.Python generator object (shared code expects it), only the output changes.
// keywords taken from the tokens of the official compilers (picaxe08m2..picaxe28x2): a variable named like one of them is a syntax error
Blockly.Python.addReservedWords('a,b,c,d,abs,adcconfig,and,andnot,asm,atan,backward,bcdtoascii,bcdtobin,bintoascii,bintobcd,bit,booti2c,branch,button,byte,calibadc,calibadc10,calibfreq,case,clear,clearbit,compsetup,const,cos,count,daclevel,dacsetup,data,dcd,debug,dec,dig,dirs,dirsa,dirsb,dirsc,dirsd,disablebod,disabletime,disconnect,do,downto,doze,eeprom,else,elseif,enablebod,enabletime,end,endif,endselect,exit,flags,for,forward,fvrsetup,get,gosub,goto,halt,hibernate,high,hintsetup,hpwm,hpwmduty,hserin,hserout,hspiin,hspiout,i2cread,i2cslave,i2cwrite,if,inc,infrain,infrain2,infraout,input,inputtype,inv,irin,irout,is,kbin,keyin,keyled,let,lookdown,lookup,loop,low,main,max,min,nand,nap,ncd,next,nob,nor,not,off,on,or,ornot,output,outpins,owin,owout,pause,pauseus,peek,peeksfr,pins,pinsa,pinsb,pinsc,pinsd,play,poke,pokesfr,pop,popram,pot,ptr,pullup,pulsin,pulsout,push,pushram,put,pwm,pwmdiv16,pwmdiv4,pwmdiv64,pwmduty,pwmout,random,read,readadc,readadc10,readdac,readdac10,readfirmware,readinternaltemp,readmem,readoutputs,readowclk,readowsn,readportc,readrevision,readsilicon,readtable,readtemp,readtemp12,reconnect,reset,resetowclk,restart,resume,return,rev,reverse,rfin,rfout,run,select,serin,serout,serrxd,sertxd,servo,servopos,set,setbit,setfreq,setint,setintflags,settimer,setupi2c,setupserial,setupspi,setuptimer,shiftin,shiftout,sin,sleep,slot,sound,sqr,srlatch,srreset,srset,step,stop,suspend,swap,switch,symbol,table,tablecopy,then,time,timer,tmr3setup,to,toggle,togglebit,touch,touch16,tune,ultra,until,wait,while,word,write,writemem,xor,xornot'
  + ',' + [...Array(56).keys()].map(i => 'b' + i) + ',' + [...Array(28).keys()].map(i => 'w' + i));

const pythonInit = Blockly.Python.init;
Blockly.Python.init = function (workspace) {
  pythonInit.call(this, workspace);
  Blockly.Python.picaxeSymbols_ = Object.create(null);
  // PICAXE BASIC is case-insensitive: "Count" clashes with the count command, "Toto" with "toto"
  const nameDB = Blockly.Python.nameDB_;
  if (!nameDB.picaxeCaseless_) {
    [nameDB.reservedWords, nameDB.dbReverse].forEach(set => {
      const has = set.has.bind(set), add = set.add.bind(set);
      set.has = (word) => has(String(word).toLowerCase());
      set.add = (word) => add(String(word).toLowerCase());
    });
    nameDB.picaxeCaseless_ = true;
  }
};

// every user variable is a word register: w0..w13 on M2, w0..w27 on X2 (PICAXE_BOARD.words)
Blockly.Python.picaxeVar = function (name) {
  const symbols = Blockly.Python.picaxeSymbols_;
  if (!(name in symbols)) symbols[name] = 'w' + Object.keys(symbols).length;
  return name;
};

Blockly.Python.finish = function (code) {
  const symbols = Object.entries(Blockly.Python.picaxeSymbols_).map(([n, r]) => `symbol ${n} = ${r}`);
  const tooMany = symbols.length > PICAXE_BOARD.words ? `' ERREUR : ${PICAXE_BOARD.words} variables maximum sur ${PICAXE_BOARD.chip}` : '';
  const out = [`#picaxe ${PICAXE_BOARD.chip}`, tooMany, ...symbols, ...Object.values(Blockly.Python.userOnStart_), code, 'end', ...Object.values(Blockly.Python.userFunctions_)];
  Blockly.Python.nameDB_.reset();
  return out.filter(Boolean).join('\n').replace(/\n\n+/g, '\n') + '\n';
};

Blockly.Python.quote_ = (s) => '"' + s.replace(/"/g, "'") + '"';

// scrub_ (python/init.js) prefixes the comments with '# ' but '#' starts a directive in PICAXE BASIC
const prefixLines = Blockly.Python.prefixLines;
Blockly.Python.prefixLines = function (text, prefix) { return prefixLines.call(this, text, prefix === '# ' ? "' " : prefix); };

// the warning is set by the generator (the generator runs on each change of the workspace)
const picaxeWarn = (block, isInvalid, key) => block.setWarningText(isInvalid ? Blockly.Msg[key] : null);

// logic
Blockly.Python.controls_if = function (block) {
  let n = 0;
  let code = '';
  do {
    const condition = Blockly.Python.valueToCode(block, 'IF' + n, Blockly.Python.ORDER_NONE) || '0 = 1';
    code += (n == 0 ? 'if ' : 'elseif ') + condition + ' then' + NEWLINE + Blockly.Python.statementToCode(block, 'DO' + n);
    ++n;
  } while (block.getInput('IF' + n));
  if (block.getInput('ELSE')) {
    code += 'else' + NEWLINE + Blockly.Python.statementToCode(block, 'ELSE');
  }
  return code + 'endif' + NEWLINE;
};

Blockly.Python.logic_compare = function (block) {
  const OPERATORS = { 'EQ': '=', 'NEQ': '<>', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' };
  let argument0 = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_NONE) || '0';
  let argument1 = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_NONE) || '0';
  let operator = OPERATORS[block.getFieldValue('OP')];
  // only a number, a variable or an input in a comparison: no calculation
  const isInvalid = ['A', 'B'].some(name => {
    const child = block.getInputTargetBlock(name);
    return child && !['math_number', 'variables_get', 'io_picaxe_digital_read'].includes(child.type);
  });
  // the left side must be a variable or an input ("if 5 < x" is a syntax error): x > 5
  const isNumber = text => /^\d+$/.test(text);
  if (isNumber(argument0) && !isNumber(argument1)) {
    [argument0, argument1] = [argument1, argument0];
    operator = { '<': '>', '>': '<', '<=': '>=', '>=': '<=' }[operator] || operator;
  }
  const isConstant = isNumber(argument0) && isNumber(argument1);
  picaxeWarn(block, isInvalid || isConstant, isInvalid ? 'PICAXE_WARNING_COMPARE' : 'PICAXE_WARNING_COMPARE_NUMBERS');
  return [argument0 + ' ' + operator + ' ' + argument1, Blockly.Python.ORDER_NONE];
};

Blockly.Python.logic_operation = function (block) {
  const operator = block.getFieldValue('OP') == 'AND' ? 'and' : 'or';
  const argument0 = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_NONE) || '0 = 1';
  const argument1 = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_NONE) || '0 = 1';
  return [argument0 + ' ' + operator + ' ' + argument1, Blockly.Python.ORDER_NONE];
};

// loops
Blockly.Python.controls_repeat = function (block) {
  const repeats = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_NONE) || '0';
  const branch = Blockly.Python.statementToCode(block, 'DO');
  const v = Blockly.Python.picaxeVar(Blockly.Python.nameDB_.getDistinctName('count', Blockly.VARIABLE_CATEGORY_NAME));
  return 'for ' + v + ' = 1 to ' + repeats + NEWLINE + branch + 'next ' + v + NEWLINE;
};

Blockly.Python.controls_whileUntil = function (block) {
  const condition = Blockly.Python.valueToCode(block, 'BOOL', Blockly.Python.ORDER_NONE) || '0 = 1';
  return 'do ' + (block.getFieldValue('MODE') == 'UNTIL' ? 'until ' : 'while ') + condition + NEWLINE
    + Blockly.Python.statementToCode(block, 'DO') + 'loop' + NEWLINE;
};

Blockly.Python.controls_for = function (block) {
  const v = Blockly.Python.picaxeVar(Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME));
  const from = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || '0';
  const to = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || '0';
  const by = Blockly.Python.valueToCode(block, 'BY', Blockly.Python.ORDER_NONE) || '1';
  return 'for ' + v + ' = ' + from + ' to ' + to + (by === '1' ? '' : ' step ' + by) + NEWLINE
    + Blockly.Python.statementToCode(block, 'DO') + 'next ' + v + NEWLINE;
};

// math: a word is an integer from 0 to 65535
Blockly.Python.math_number = function (block) {
  const value = Number(block.getFieldValue('NUM'));
  picaxeWarn(block, !Number.isInteger(value) || value < 0 || value > 65535, 'PICAXE_WARNING_NUMBER');
  return [String(Math.min(Math.max(Math.trunc(value) || 0, 0), 65535)), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.math_arithmetic = function (block) {
  const OPERATORS = { 'ADD': ' + ', 'MINUS': ' - ', 'MULTIPLY': ' * ', 'DIVIDE': ' / ', 'POWER': ' ** ' };
  const argument0 = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_NONE) || '0';
  const argument1 = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_NONE) || '0';
  // no parentheses and no precedence (left to right): "a * (b + c)" would be read "(a * b) + c"
  const right = block.getInputTargetBlock('B');
  if (block.getFieldValue('OP') === 'POWER') {
    picaxeWarn(block, true, 'PICAXE_WARNING_POWER');
  } else {
    picaxeWarn(block, right && right.type === 'math_arithmetic', 'PICAXE_WARNING_RIGHT');
  }
  return [argument0 + OPERATORS[block.getFieldValue('OP')] + argument1, Blockly.Python.ORDER_NONE];
};

// variables
Blockly.Python.variables_get = function (block) {
  const name = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return [Blockly.Python.picaxeVar(name), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.variables_set = function (block) {
  const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
  const name = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  // a text or a condition (comparison, on/off sensor) is not a word value (the flyout proposes a text shadow)
  const child = block.getInputTargetBlock('VALUE');
  const isCondition = !!child?.outputConnection?.getCheck()?.includes('Boolean');
  picaxeWarn(block, child?.type === 'text' || isCondition, isCondition ? 'PICAXE_WARNING_CONDITION' : 'PICAXE_WARNING_TEXT');
  return 'let ' + Blockly.Python.picaxeVar(name) + ' = ' + value + NEWLINE;
};

// numbers are clamped to 0..65535: a negative delta is not possible (a word wraps around)
Blockly.Python.variables_increment = function (block) {
  const delta = Blockly.Python.valueToCode(block, 'DELTA', Blockly.Python.ORDER_NONE) || '1';
  const name = Blockly.Python.picaxeVar(Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME));
  return 'let ' + name + ' = ' + name + ' + ' + delta + NEWLINE;
};

// procedures: subroutines without argument nor return value, after "end"
Blockly.Python.procedures_defnoreturn = function (block) {
  const name = Blockly.Python.nameDB_.getName(block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  picaxeWarn(block, block.arguments_ && block.arguments_.length, 'PICAXE_WARNING_ARGS');
  const branch = Blockly.Python.statementToCode(block, 'STACK');
  Blockly.Python.userFunctions_['%' + name] = Blockly.Python.scrub_(block, name + ':' + NEWLINE + branch + Blockly.Python.INDENT + 'return' + NEWLINE);
  return null;
};
Blockly.Python.procedures_defreturn = Blockly.Python.procedures_defnoreturn;

Blockly.Python.procedures_callnoreturn = function (block) {
  return 'gosub ' + Blockly.Python.nameDB_.getName(block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME) + NEWLINE;
};
