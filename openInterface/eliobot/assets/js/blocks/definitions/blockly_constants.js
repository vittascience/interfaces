Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
    'forever',
    'scratch_forever',
    'controls_repeat',
    'controls_forEach',
    'controls_for',
    'controls_whileUntil'
];

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

Blockly.Constants.Pins.analog_read = {
    [BOARD_ELIOBOT]: [
        ["I02", "2"],
        ["I015", "15"]
    ]
};

Blockly.Constants.Pins.PWM = {
    [BOARD_ELIOBOT]: [
        ["M1", "1"],
        ["M2", "2"],
        ["M3", "3"],
        ["IO2", "4"],
        ["IO15", "5"]]
};

Blockly.Constants.Pins.digital = {
    [BOARD_ELIOBOT]: []
};