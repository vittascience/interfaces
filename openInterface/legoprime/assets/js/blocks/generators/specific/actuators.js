/**
 * @fileoverview Actuators generators for Lego Spike Prime.
 * Speeds are in degrees per second, as in the hub API. Functions marked Awaitable are awaited.
 */

const legoPrimeMotorImports = () => {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor', IMPORT_MOTOR);
};

// the hub API expects integers: a decimal (12.5, a division) is truncated
const legoPrimeInt = (block, name, dflt = "0") => {
    const value = Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE) || dflt;
    return /^-?\d+$/.test(value) ? value : `int(${value})`;
};

// value of a number input, negated for the backward direction
const legoPrimeSigned = (block, name) => {
    const value = legoPrimeInt(block, name);
    return block.getFieldValue("DIR") === "backward" ? "-" + value : value;
};

Blockly.Python.actuators_startMotorContinuous = function (block) {
    legoPrimeMotorImports();
    return `motor.run(port.${block.getFieldValue("PORT")}, ${legoPrimeSigned(block, "SPEED")})` + NEWLINE;
};

Blockly.Python.actuators_startMotorForTime = function (block) {
    legoPrimeMotorImports();
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
    return `await motor.run_for_time(port.${block.getFieldValue("PORT")}, int(${time} * 1000), ${legoPrimeSigned(block, "SPEED")})` + NEWLINE;
};

Blockly.Python.actuators_moveMotorToPosition = function (block) {
    legoPrimeMotorImports();
    const angle = legoPrimeInt(block, "ANGLE");
    const speed = legoPrimeInt(block, "SPEED");
    return `await motor.run_to_absolute_position(port.${block.getFieldValue("PORT")}, ${angle}, ${speed})` + NEWLINE;
};

Blockly.Python.actuators_moveMotorByDegrees = function (block) {
    legoPrimeMotorImports();
    const angle = legoPrimeInt(block, "ANGLE");
    return `await motor.run_for_degrees(port.${block.getFieldValue("PORT")}, ${angle}, ${legoPrimeSigned(block, "SPEED")})` + NEWLINE;
};

Blockly.Python.actuators_stopMotor = function (block) {
    legoPrimeMotorImports();
    return `motor.stop(port.${block.getFieldValue("PORT")})` + NEWLINE;
};

Blockly.Python.actuators_resetMotorPosition = function (block) {
    legoPrimeMotorImports();
    return `motor.reset_relative_position(port.${block.getFieldValue("PORT")}, 0)` + NEWLINE;
};

// motor pairs: a single pair (PAIR_1) is enough for the blocks
Blockly.Python.actuators_pair = function (block) {
    Blockly.Python.addImport('port', IMPORT_PORT);
    Blockly.Python.addImport('motor_pair', IMPORT_MOTOR_PAIR);
    return `motor_pair.pair(motor_pair.PAIR_1, port.${block.getFieldValue("LEFT")}, port.${block.getFieldValue("RIGHT")})` + NEWLINE;
};

Blockly.Python.actuators_pairMove = function (block) {
    Blockly.Python.addImport('motor_pair', IMPORT_MOTOR_PAIR);
    const steering = legoPrimeInt(block, "STEERING");
    const speed = legoPrimeInt(block, "SPEED");
    return `motor_pair.move(motor_pair.PAIR_1, ${steering}, velocity=${speed})` + NEWLINE;
};

Blockly.Python.actuators_pairMoveDegrees = function (block) {
    Blockly.Python.addImport('motor_pair', IMPORT_MOTOR_PAIR);
    const angle = legoPrimeInt(block, "ANGLE");
    const steering = legoPrimeInt(block, "STEERING");
    const speed = legoPrimeInt(block, "SPEED");
    return `await motor_pair.move_for_degrees(motor_pair.PAIR_1, ${angle}, ${steering}, velocity=${speed})` + NEWLINE;
};

Blockly.Python.actuators_pairStop = function () {
    Blockly.Python.addImport('motor_pair', IMPORT_MOTOR_PAIR);
    return "motor_pair.stop(motor_pair.PAIR_1)" + NEWLINE;
};

// Sound

Blockly.Python.actuators_beep = function (block) {
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    const freq = legoPrimeInt(block, "FREQ", "440");
    const time = legoPrimeInt(block, "TIME", "500");
    const volume = legoPrimeInt(block, "VOLUME", "100");
    return `await sound.beep(${freq}, ${time}, ${volume})` + NEWLINE;
};

Blockly.Python.actuators_stopSound = function () {
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    return "sound.stop()" + NEWLINE;
};

Blockly.Python.actuators_setVolume = function (block) {
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    return `sound.volume(${legoPrimeInt(block, "VOLUME", "100")})` + NEWLINE;
};
