/**
 * @fileoverview Display generators for Thymio.
 */

// Thymio


Blockly.Python.display_turnAllLedsOff = function () {
    return `nf_leds_top(0, 0, 0)\nnf_leds_bottom_left(0, 0, 0)\nnf_leds_bottom_right(0, 0, 0)\nnf_leds_circle(0, 0, 0, 0, 0, 0, 0, 0)\nnf_leds_prox_h(0, 0, 0, 0, 0, 0, 0, 0)\nnf_leds_prox_v(0, 0)\nnf_leds_rc(0)\nnf_leds_buttons(0, 0, 0, 0)\nnf_leds_temperature(0, 0)\nnf_leds_sound(0)\n`;
};

Blockly.Python.display_timer_flash_led = function (block) {
	const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const red = Math.round(color[0]*32/255);
    const green = Math.round(color[1]*32/255);
    const blue = Math.round(color[2]*32/255);
	const timer = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || '0'
	Blockly.Python.addInit('leds_flash', `nf_leds_top(${red}, ${green}, ${blue})\nnf_leds_bottom_right(${red}, ${green}, ${blue})\nnf_leds_bottom_left(${red}, ${green}, ${blue})\ntimer_period[0] = ${timer*1000}`);
	Blockly.Python.addInit('waiting', 'waiting = 1');
	Blockly.Python.addPowerOn(`timer0_flash_led`, `@onevent\ndef timer0():${NEWLINE}  global nf_leds_top, waiting, nf_leds_bottom_right, nf_leds_bottom_left\n  if waiting == 1:\n    nf_leds_top(0, 0, 0)\n    nf_leds_bottom_right(0, 0, 0)\n    nf_leds_bottom_left(0, 0, 0)\n    waiting = 0\n  else:\n    nf_leds_top(${red}, ${green}, ${blue})\n    nf_leds_bottom_right(${red}, ${green}, ${blue})\n    nf_leds_bottom_left(${red}, ${green}, ${blue})\n    waiting = 1`)
	return "";
};


Blockly.Python.display_RGBLed_turnOff = function (block) {
    const ledPos = block.getFieldValue("LED");
    let ledNumber;
    switch (ledPos) {
        case "top":
            ledNumber = 3;
            break;
        case "bottom_left":
            ledNumber = 3;
            break;
        case "bottom_right":
            ledNumber = 3;
            break;
        case "circle":
            ledNumber = 8;
            break;
        case "prox_h":
            ledNumber = 8;
            break;
        case "prox_v":
            ledNumber = 2;
            break;
        case "rc":
            ledNumber = 1;
            break;
        case "buttons":
            ledNumber = 4;
            break;
        case "temperature":
            ledNumber = 2;
            break;
        case "sound":
            ledNumber = 1;
            break;
    }

    return `nf_leds_${ledPos}(${"0".repeat(ledNumber).split('').join(',')})\n`; 
};


Blockly.Python.display_RGBLed_setColor = function (block) {
    // get R, G, B value
    const ledPos = block.getFieldValue("LED");
    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE);
    const green = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE);
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE);
    
    return `nf_leds_${ledPos}(${red}, ${green}, ${blue})\n`;
}

Blockly.Python.display_RGBLed_setColorPalette = function (block) {
    const ledPos = block.getFieldValue("LED");
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const red = Math.round(color[0]*32/255);
    const green = Math.round(color[1]*32/255);
    const blue = Math.round(color[2]*32/255);
    return `nf_leds_${ledPos}(${red}, ${green}, ${blue})\n`;
}


Blockly.Python.display_circleLed_turnOn = function (block) {
    const front= Blockly.Python.valueToCode(block, "FRONT", Blockly.Python.ORDER_NONE);
    const frontRight = Blockly.Python.valueToCode(block, "FRONT_RIGHT", Blockly.Python.ORDER_NONE);
    const right = Blockly.Python.valueToCode(block, "RIGHT", Blockly.Python.ORDER_NONE);
    const backRight = Blockly.Python.valueToCode(block, "BACK_RIGHT", Blockly.Python.ORDER_NONE);
    const back = Blockly.Python.valueToCode(block, "BACK", Blockly.Python.ORDER_NONE);
    const backLeft = Blockly.Python.valueToCode(block, "BACK_LEFT", Blockly.Python.ORDER_NONE);
    const left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE);
    const frontLeft = Blockly.Python.valueToCode(block, "FRONT_LEFT", Blockly.Python.ORDER_NONE);

    return `nf_leds_circle(${front}, ${frontRight}, ${right}, ${backRight}, ${back}, ${backLeft}, ${left}, ${frontLeft})\n`;
};

//display_proximityLed_turnOn

Blockly.Python.display_proximityLed_turnOn = function (block) {
    const frontLeft = Blockly.Python.valueToCode(block, "FRONT_LEFT", Blockly.Python.ORDER_NONE);
    const frontLeftCentral = Blockly.Python.valueToCode(block, "FRONT_LEFT_CENTRAL", Blockly.Python.ORDER_NONE);
    const frontCentralLeft = Blockly.Python.valueToCode(block, "FRONT_CENTRAL_LEFT", Blockly.Python.ORDER_NONE);
    const frontCentralRight = Blockly.Python.valueToCode(block, "FRONT_CENTRAL_RIGHT", Blockly.Python.ORDER_NONE);
    const frontRightCentral = Blockly.Python.valueToCode(block, "FRONT_RIGHT_CENTRAL", Blockly.Python.ORDER_NONE);
    const frontRight = Blockly.Python.valueToCode(block, "FRONT_RIGHT", Blockly.Python.ORDER_NONE);
    const backLeft = Blockly.Python.valueToCode(block, "BACK_LEFT", Blockly.Python.ORDER_NONE);
    const backRight = Blockly.Python.valueToCode(block, "BACK_RIGHT", Blockly.Python.ORDER_NONE);

    return `nf_leds_prox_h(${frontLeft}, ${frontLeftCentral}, ${frontCentralLeft}, ${frontCentralRight}, ${frontRightCentral}, ${frontRight}, ${backLeft}, ${backRight})\n`;
};

//display_groundSensorLed_turnOn

Blockly.Python.display_groundSensorLed_turnOn = function (block) {
    const left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE);
    const right = Blockly.Python.valueToCode(block, "RIGHT", Blockly.Python.ORDER_NONE);

    return `nf_leds_prox_v(${left}, ${right})\n`;
};

//display_ledButtons_turnOn

Blockly.Python.display_ledButtons_turnOn = function (block) {
    const front = Blockly.Python.valueToCode(block, "FRONT", Blockly.Python.ORDER_NONE);
    const back = Blockly.Python.valueToCode(block, "BACK", Blockly.Python.ORDER_NONE);
    const left = Blockly.Python.valueToCode(block, "LEFT", Blockly.Python.ORDER_NONE);
    const right = Blockly.Python.valueToCode(block, "RIGHT", Blockly.Python.ORDER_NONE);

    return `nf_leds_buttons(${front}, ${right}, ${back}, ${left})\n`;
};

//display_temperatureLed_turnOn

Blockly.Python.display_temperatureLed_turnOn = function (block) {

    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE);
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE);

    return `nf_leds_temperature(${red}, ${blue})\n`;
};

//display_rc_sound_SensorLed_turnOn

Blockly.Python.display_rc_sound_SensorLed_turnOn = function (block) {
    const option = block.getFieldValue("LED");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return `nf_leds_${option}(${value})\n`;
};