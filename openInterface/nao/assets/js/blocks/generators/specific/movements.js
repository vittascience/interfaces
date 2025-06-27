/**
 * @fileoverview Movements generators for Nao.
 */

Blockly.Python.movements_hand = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const direction = block.getFieldValue("DIRECTION");
    const hand = block.getFieldValue("HAND");
    return `motion_service.${direction}('${hand}')` + NEWLINE;
};

Blockly.Python.movements_moveTo = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const direction = block.getFieldValue("DIRECTION");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.moveTo(${(direction === 'forward' ? '' : '-')}${distance}, 0, 0)` + NEWLINE;
};

Blockly.Python.movements_rotate = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const direction = block.getFieldValue("DIRECTION");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.moveTo(0, 0, ${(direction === 'left' ? '' : '-')}${(angle * (Math.PI / 180)).toFixed(3)})` + NEWLINE;
};

Blockly.Python.movements_moveToXY = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const theta = Blockly.Python.valueToCode(block, "THETA", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.moveTo(${x}, ${y}, ${(theta * (Math.PI / 180)).toFixed(3)})` + NEWLINE;
};

Blockly.Python.movements_goToPosture = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const posture = block.getFieldValue("POSTURE");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.goToPosture('${posture}', ${speed})` + NEWLINE;
};

Blockly.Python.movements_poseMode = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const pose = block.getFieldValue("POSE");
    return `motion_service.pose('${pose}')` + NEWLINE;
};

Blockly.Python.movements_angleInterpolationWithSpeed_1 = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const joint = block.getFieldValue("JOINT");
    const rotation = block.getFieldValue("ROTATION");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.angleInterpolationWithSpeed('${joint}${rotation}', ${angle * (Math.PI / 180)}, ${speed / 100})` + NEWLINE;
};

Blockly.Python.movements_angleInterpolationWithSpeed_2 = Blockly.Python.movements_angleInterpolationWithSpeed_1;
Blockly.Python.movements_angleInterpolationWithSpeed_3 = Blockly.Python.movements_angleInterpolationWithSpeed_1;

Blockly.Python.movements_angleInterpolationWithSpeed_4 = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const joint = block.getFieldValue("JOINT");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return `motion_service.angleInterpolationWithSpeed('${joint}', ${angle * (Math.PI / 180)}, ${speed / 100})` + NEWLINE;
};

Blockly.Python.movements_angleInterpolationWithSpeed_5 = Blockly.Python.movements_angleInterpolationWithSpeed_4;

const jointsList = '["HeadYaw", "HeadPitch", "LShoulderPitch", "LShoulderRoll", "LElbowYaw", "LElbowRoll", "LWristYaw", "LHand", "RShoulderPitch", "RShoulderRoll", "RElbowYaw", "RElbowRoll", "RWristYaw", "RHand"]';

Blockly.Python.movements_setAnglesArmes_radians = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const headYaw = Blockly.Python.valueToCode(block, "HEAD_YAW", Blockly.Python.ORDER_NONE) || "0";
    const headPitch = Blockly.Python.valueToCode(block, "HEAD_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const lShoulderPitch = Blockly.Python.valueToCode(block, "L_SHOULDER_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const lShoulderRoll = Blockly.Python.valueToCode(block, "L_SHOULDER_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const lElbowYaw = Blockly.Python.valueToCode(block, "L_ELBOW_YAW", Blockly.Python.ORDER_NONE) || "0";
    const lElbowRoll = Blockly.Python.valueToCode(block, "L_ELBOW_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const lWristYaw = Blockly.Python.valueToCode(block, "L_WRIST_YAW", Blockly.Python.ORDER_NONE) || "0";
    const lHand = Blockly.Python.valueToCode(block, "L_HAND", Blockly.Python.ORDER_NONE) || "0";
    const rShoulderPitch = Blockly.Python.valueToCode(block, "R_SHOULDER_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const rShoulderRoll = Blockly.Python.valueToCode(block, "R_SHOULDER_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const rElbowYaw = Blockly.Python.valueToCode(block, "R_ELBOW_YAW", Blockly.Python.ORDER_NONE) || "0";
    const rElbowRoll = Blockly.Python.valueToCode(block, "R_ELBOW_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const rWristYaw = Blockly.Python.valueToCode(block, "R_WRIST_YAW", Blockly.Python.ORDER_NONE) || "0";
    const rHand = Blockly.Python.valueToCode(block, "R_HAND", Blockly.Python.ORDER_NONE) || "0";
    const angleList = [headYaw, headPitch, lShoulderPitch, lShoulderRoll, lElbowRoll, lElbowYaw, lWristYaw, lHand, rShoulderPitch, rShoulderRoll, rElbowRoll, rElbowYaw, rWristYaw, rHand];
    return `motion_service.setAnglesRad("upperBody", [${angleList.join(',')}])` + NEWLINE;
};

Blockly.Python.movements_setAnglesArmes_degres = function (block) {
    Blockly.Python.addImport('motion_service', IMPORT_MOTION_SERVICE);
    const headYaw = Blockly.Python.valueToCode(block, "HEAD_YAW", Blockly.Python.ORDER_NONE) || "0";
    const headPitch = Blockly.Python.valueToCode(block, "HEAD_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const lShoulderPitch = Blockly.Python.valueToCode(block, "L_SHOULDER_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const lShoulderRoll = Blockly.Python.valueToCode(block, "L_SHOULDER_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const lElbowYaw = Blockly.Python.valueToCode(block, "L_ELBOW_YAW", Blockly.Python.ORDER_NONE) || "0";
    const lElbowRoll = Blockly.Python.valueToCode(block, "L_ELBOW_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const lWristYaw = Blockly.Python.valueToCode(block, "L_WRIST_YAW", Blockly.Python.ORDER_NONE) || "0";
    const lHand = Blockly.Python.valueToCode(block, "L_HAND", Blockly.Python.ORDER_NONE) || "0";
    const rShoulderPitch = Blockly.Python.valueToCode(block, "R_SHOULDER_PITCH", Blockly.Python.ORDER_NONE) || "0";
    const rShoulderRoll = Blockly.Python.valueToCode(block, "R_SHOULDER_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const rElbowYaw = Blockly.Python.valueToCode(block, "R_ELBOW_YAW", Blockly.Python.ORDER_NONE) || "0";
    const rElbowRoll = Blockly.Python.valueToCode(block, "R_ELBOW_ROLL", Blockly.Python.ORDER_NONE) || "0";
    const rWristYaw = Blockly.Python.valueToCode(block, "R_WRIST_YAW", Blockly.Python.ORDER_NONE) || "0";
    const rHand = Blockly.Python.valueToCode(block, "R_HAND", Blockly.Python.ORDER_NONE) || "0";
    const angleList = [headYaw, headPitch, lShoulderPitch, lShoulderRoll, lElbowRoll, lElbowYaw, lWristYaw, lHand, rShoulderPitch, rShoulderRoll, rElbowRoll, rElbowYaw, rWristYaw, rHand];
    return `motion_service.setAnglesDeg("upperBody", [${angleList.join(',')}])` + NEWLINE;
};