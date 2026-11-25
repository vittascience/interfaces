/**
 * @fileoverview PICAXE BASIC generators for the blocks of the PICAXE interface.
 */

Blockly.Python.on_start = function (block) {
  // de-indent: the statements are at the top level of the program
  // statementToCode first: a block inside may replace userOnStart_ (groveLcdInit)
  const code = Blockly.Python.statementToCode(block, 'DO').replace(/^  /gm, '');
  Blockly.Python.userOnStart_.setup = code;
  return ""; // DO NOT CHANGE
};

Blockly.Python.forever = function (block) {
  return 'main:' + NEWLINE + 'do' + NEWLINE + Blockly.Python.statementToCode(block, 'DO') + 'loop' + NEWLINE;
};

Blockly.Python.io_picaxe_digital_write = function (block) {
  return block.getFieldValue('STATE').toLowerCase() + ' ' + block.getFieldValue('PIN') + NEWLINE;
};

Blockly.Python.io_picaxe_digital_read = function (block) {
  return ['pin' + block.getFieldValue('PIN'), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_picaxe_analog_read = function (block) {
  const name = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return block.getFieldValue('RES') + ' ' + block.getFieldValue('PIN') + ', ' + Blockly.Python.picaxeVar(name) + NEWLINE;
};

Blockly.Python.io_picaxe_pause = function (block) {
  return 'pause ' + (Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '0') + NEWLINE;
};

Blockly.Python.communication_picaxe_sertxd = function (block) {
  const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
  const isText = block.getInputTargetBlock('VALUE')?.type === 'text';
  return 'sertxd(' + (isText ? value : '#' + value) + ',13,10)' + NEWLINE;
};

Blockly.Python.actuators_picaxe_servo = function (block) {
  return 'servo ' + block.getFieldValue('PIN') + ', ' + (Blockly.Python.valueToCode(block, 'POS', Blockly.Python.ORDER_NONE) || '150') + NEWLINE;
};

Blockly.Python.actuators_picaxe_sound = function (block) {
  const note = Blockly.Python.valueToCode(block, 'NOTE', Blockly.Python.ORDER_NONE) || '100';
  const duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_NONE) || '50';
  return 'sound ' + block.getFieldValue('PIN') + ', (' + note + ', ' + duration + ')' + NEWLINE;
};

Blockly.Python.autoprog_digital_sensor = function (block) {
  // all the AutoProg on/off modules are active at 1
  return ['pin' + block.getFieldValue('PIN') + ' = 1', Blockly.Python.ORDER_NONE];
};

// readadc -> degC, linear fit T = (x * 100 - offset) / slope, 0 under min (a word cannot be negative)
// TEMP_C: AutoProg eco thermistor (A4 sheet); NTC_C: Grove temperature v1.2 (NTC B=4275), +-1.3 degC from 2 to 45 degC
const PICAXE_CELSIUS = { TEMP_C: [22, 2172, 329], NTC_C: [53, 5263, 295] };

Blockly.Python.autoprog_analog_sensor = function (block) {
  const name = Blockly.Python.picaxeVar(Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME));
  let code = 'readadc ' + block.getFieldValue('PIN') + ', ' + name + NEWLINE;
  const celsius = PICAXE_CELSIUS[block.getFieldValue('MODULE')];
  if (celsius) {
    // eco temperature (thermistor), AutoProg A4 sheet: b0 = 6.58 x + 69.42 with x = point number (16..32 degC)
    // -> T = (b0 - 23.36) / 3.29. No parentheses, left to right. < min -> 0: a word cannot be negative.
    const [min, offset, slope] = celsius;
    const I = Blockly.Python.INDENT;
    code += 'if ' + name + ' < ' + min + ' then' + NEWLINE
      + I + 'let ' + name + ' = 0' + NEWLINE
      + 'else' + NEWLINE
      + I + 'let ' + name + ' = ' + name + ' * 100 - ' + offset + ' / ' + slope + NEWLINE
      + 'endif' + NEWLINE;
  }
  return code;
};

Blockly.Python.autoprog_output = function (block) {
  return block.getFieldValue('STATE').toLowerCase() + ' ' + block.getFieldValue('PIN') + NEWLINE;
};

Blockly.Python.autoprog_servo = Blockly.Python.actuators_picaxe_servo;
Blockly.Python.autoprog_buzzer = Blockly.Python.actuators_picaxe_sound;

// Grove modules (AutoProgX2): same BASIC as the AutoProg / servo / sound blocks
Blockly.Python.grove_digital_sensor = Blockly.Python.autoprog_digital_sensor;
Blockly.Python.grove_analog_sensor = Blockly.Python.autoprog_analog_sensor;
Blockly.Python.grove_output = Blockly.Python.autoprog_output;
Blockly.Python.grove_servo = Blockly.Python.actuators_picaxe_servo;
Blockly.Python.grove_buzzer = Blockly.Python.actuators_picaxe_sound;

// Grove 16x2 LCD (I2C 0x3E), Grove I2C board: In3 = SCL (C.3), In4 = SDA (C.4). Checked on the AutoProgX2.
Blockly.Python.addReservedWords('lcdnum,lcddiv,lcdchr,grove_lcd_number');
const GROVE_LCD_INIT = ['hi2csetup i2cmaster, %01111100, i2cslow, i2cbyte', 'pause 100', 'hi2cout ($80, $28)', 'pause 5',
  'hi2cout ($80, $0C)', 'pause 5', 'hi2cout ($80, $01)', 'pause 5', 'hi2cout ($80, $06)'].join(NEWLINE) + NEWLINE;
// once, before the "on start" code (finish keeps the key order of userOnStart_)
const groveLcdInit = () => Blockly.Python.userOnStart_ = { grove_lcd: GROVE_LCD_INIT, ...Blockly.Python.userOnStart_ };

// significant digits only (no padding), 5 digits max (a word)
const GROVE_LCD_NUMBER = ['grove_lcd_number:', '  let lcddiv = 10000', '  do while lcddiv > 0', '    if lcdnum >= lcddiv or lcddiv = 1 then',
  '      let lcdchr = lcdnum / lcddiv // 10 + 48', '      hi2cout ($40, lcdchr)', '    endif', '    let lcddiv = lcddiv / 10', '  loop', '  return'].join(NEWLINE) + NEWLINE;

Blockly.Python.grove_lcd_print = function (block) {
  groveLcdInit();
  const cursor = 'hi2cout ($80, ' + ((block.getFieldValue('LINE') === '1' ? 192 : 128) + Number(block.getFieldValue('POS'))) + ')' + NEWLINE;
  const child = block.getInputTargetBlock('TEXT');
  if (!child || child.type === 'text') {
    // the LCD only shows ASCII: accents removed, " dropped (string delimiter), cut at the end of the line
    const text = (child?.getFieldValue('TEXT') || '').normalize('NFD').replace(/[^ -~]|["]/g, '').slice(0, 16 - Number(block.getFieldValue('POS')));
    return cursor + (text ? 'hi2cout ($40, "' + text + '")' + NEWLINE : '');
  }
  const value = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '0';
  picaxeWarn(block, !!child.outputConnection?.getCheck()?.includes('Boolean'), 'PICAXE_WARNING_CONDITION');
  ['lcdnum', 'lcddiv', 'lcdchr'].forEach(v => Blockly.Python.picaxeVar(v));
  Blockly.Python.userFunctions_['%grove_lcd_number'] = GROVE_LCD_NUMBER;
  return cursor + 'let lcdnum = ' + value + NEWLINE + 'gosub grove_lcd_number' + NEWLINE;
};

Blockly.Python.grove_lcd_clear = function () {
  groveLcdInit();
  return 'hi2cout ($80, $01)' + NEWLINE + 'pause 2' + NEWLINE;
};
