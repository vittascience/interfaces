Blockly.Arduino.pins_ = Object.create(null);

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 */
Blockly.Arduino.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};

Blockly.Arduino.recurseArrayType = function (varName, varsWithTypes) {
    if (!varsWithTypes[varName].arrayType || varsWithTypes[varName].arrayType instanceof Blockly.Type) {
        var arrayDimension = '';
        if (varsWithTypes[varName].arrayType) {
            var subArray = varsWithTypes[varName].arrayType;
            arrayDimension = '[' + varsWithTypes[varName].arraySize + ']';
            while (subArray.arrayType) {
                arrayDimension += '[' + subArray.arraySize + ']';
                subArray = subArray.arrayType;
            }
            if (!(subArray instanceof Blockly.Type)) {
                varName = subArray[1];
                if (varsWithTypes[varName].arrayType) {
                    var varType = Blockly.Arduino.recurseArrayType(varName, varsWithTypes);
                    return varType.substr(0, varType.indexOf('[')) + arrayDimension + varType.substr(varType.indexOf('['));
                }
            }
        }
        return Blockly.Arduino.getArduinoType_(varsWithTypes[varName]) + arrayDimension;
    } else {
        var varTab = varsWithTypes[varName].arrayType[1];
        if (varTab == varName || !varsWithTypes[varTab]) {
            return 'undefined';
        } else {
            var varType = Blockly.Arduino.recurseArrayType(varTab, varsWithTypes);
            return Blockly.Arduino.insertParentArraySize(varType, varsWithTypes[varName].arraySize);
        }
    }
};

Blockly.Arduino.insertParentArraySize = function (varType, parentArraySize) {
  if (varType.indexOf('[') >= 0) {
    return varType.substr(0, varType.indexOf('[')) + '[' + parentArraySize + ']' + varType.substr(varType.indexOf('['));
  } else {
    return varType + '[' + parentArraySize + ']';
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
Blockly.Arduino.reservePin = function(block, pin, pinType, warningTag) {
  if (Blockly.Arduino.pins_[pin] !== undefined) {
    if (Blockly.Arduino.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
		   .replace('%2', warningTag).replace('%3', pinType)
		   .replace('%4', Blockly.Arduino.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.Arduino.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};
