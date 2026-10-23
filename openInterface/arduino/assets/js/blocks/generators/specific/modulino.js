/**
 * @fileoverview Modulino generators for Arduino (Arduino_Modulino library).
 */

/**
 * Declare a Modulino module and start it in setup(), after Modulino.begin() (Qwiic bus Wire1 of the UNO R4 WiFi and UNO Q).
 * @param {string} className - e.g. ModulinoButtons
 * @returns {string} name of the module object
 */
Blockly.Arduino.Generators.setupModulino = function (className) {
    const objName = 'modulino_' + className.replace('Modulino', '').toLowerCase();
    Blockly.Arduino.addInclude('modulino', INCLUDE_MODULINO);
    Blockly.Arduino.addDeclaration(objName, className + ' ' + objName + ';');
    Blockly.Arduino.addSetup('modulino_begin', 'Modulino.begin();');
    Blockly.Arduino.addSetup(objName + '_begin', objName + '.begin();');
    return objName;
};

// MODULINO BUTTONS _ IS BUTTON PRESSED
Blockly.Arduino.modulino_buttons_isPressed = function (block) {
    Blockly.Arduino.Generators.setupModulino('ModulinoButtons');
    // The button states are read from the module by update()
    Blockly.Arduino.addFunction('modulino_buttonPressed',
`bool modulino_buttonPressed(int index) {
  modulino_buttons.update();
  return modulino_buttons.isPressed(index);
}`);
    return ['modulino_buttonPressed(' + block.getFieldValue('BUTTON') + ')', Blockly.Arduino.ORDER_ATOMIC];
};

// MODULINO BUTTONS _ SET LEDS
Blockly.Arduino.modulino_buttons_setLeds = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoButtons');
    const leds = ['LED_A', 'LED_B', 'LED_C'].map(led => block.getFieldValue(led));
    return objName + '.setLeds(' + leds.join(', ') + ');' + NEWLINE;
};

// MODULINO BUZZER _ PLAY A FREQUENCY
Blockly.Arduino.modulino_buzzer_tone = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoBuzzer');
    const frequency = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_NONE) || '0';
    const duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE) || '0';
    return objName + '.tone(' + frequency + ', ' + duration + ');' + NEWLINE;
};

// MODULINO BUZZER _ STOP
Blockly.Arduino.modulino_buzzer_noTone = function () {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoBuzzer');
    return objName + '.noTone();' + NEWLINE;
};

// MODULINO PIXELS _ SET LED COLOR
Blockly.Arduino.modulino_pixels_setColor = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoPixels');
    const led = Blockly.Arduino.valueToCode(block, 'LED', Blockly.Arduino.ORDER_NONE) || '0';
    // colour blocks generate "r, g, b"
    const colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || '0, 0, 0';
    const brightness = Blockly.Arduino.valueToCode(block, 'BRIGHTNESS', Blockly.Arduino.ORDER_NONE) || '25';
    return objName + '.set(' + led + ', ' + colour + ', ' + brightness + ');' + NEWLINE
        + objName + '.show();' + NEWLINE;
};

// MODULINO PIXELS _ SET LED RGB COLOUR
Blockly.Arduino.modulino_pixels_setRGB = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoPixels');
    const value = (name, def) => Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_NONE) || def;
    return objName + '.set(' + value('LED', '0') + ', ' + value('R', '0') + ', ' + value('G', '0') + ', ' + value('B', '0') + ', ' + value('BRIGHTNESS', '25') + ');' + NEWLINE
        + objName + '.show();' + NEWLINE;
};

// MODULINO PIXELS _ CLEAR ALL LEDS
Blockly.Arduino.modulino_pixels_clear = function () {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoPixels');
    return objName + '.clear();' + NEWLINE + objName + '.show();' + NEWLINE;
};

// MODULINO KNOB _ GET POSITION
Blockly.Arduino.modulino_knob_get = function () {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoKnob');
    return [objName + '.get()', Blockly.Arduino.ORDER_ATOMIC];
};

// MODULINO KNOB _ IS PRESSED
Blockly.Arduino.modulino_knob_isPressed = function () {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoKnob');
    return [objName + '.isPressed()', Blockly.Arduino.ORDER_ATOMIC];
};

// MODULINO KNOB _ SET POSITION
Blockly.Arduino.modulino_knob_set = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoKnob');
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    return objName + '.set(' + value + ');' + NEWLINE;
};

// MODULINO DISTANCE _ GET DISTANCE (cm / mm)
Blockly.Arduino.modulino_distance_get = function (block) {
    Blockly.Arduino.Generators.setupModulino('ModulinoDistance');
    // A new measure is not always ready: keep the last one (global variable, also supported by the simulator)
    Blockly.Arduino.addDeclaration('modulino_lastDistance', 'float modulino_lastDistance = 0;');
    Blockly.Arduino.addFunction('modulino_getDistance',
`float modulino_getDistance() {
  if (modulino_distance.available()) {
    modulino_lastDistance = modulino_distance.get();
  }
  return modulino_lastDistance;
}`);
    if (block.getFieldValue('UNIT') === 'MM') {
        return ['modulino_getDistance()', Blockly.Arduino.ORDER_ATOMIC];
    }
    return ['modulino_getDistance() / 10.0', Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

// MODULINO MOVEMENT _ GET ACCELERATION (g) / ROTATION SPEED (°/s)
Blockly.Arduino.Generators.modulinoMovement = function (getter) {
    Blockly.Arduino.Generators.setupModulino('ModulinoMovement');
    // e.g. getX -> modulino_movementGetX(): the values are read from the sensor by update()
    const funcName = 'modulino_movement' + getter.charAt(0).toUpperCase() + getter.slice(1);
    Blockly.Arduino.addFunction(funcName,
`float ${funcName}() {
  modulino_movement.update();
  return modulino_movement.${getter}();
}`);
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.modulino_movement_getAcceleration = function (block) {
    return Blockly.Arduino.Generators.modulinoMovement('get' + block.getFieldValue('AXIS'));
};

Blockly.Arduino.modulino_movement_getRotation = function (block) {
    return Blockly.Arduino.Generators.modulinoMovement('get' + block.getFieldValue('AXIS'));
};

// MODULINO THERMO _ GET TEMPERATURE (°C) / HUMIDITY (%)
Blockly.Arduino.modulino_thermo_getData = function (block) {
    const objName = Blockly.Arduino.Generators.setupModulino('ModulinoThermo');
    return [objName + '.get' + block.getFieldValue('DATA') + '()', Blockly.Arduino.ORDER_ATOMIC];
};
