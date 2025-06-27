/**
 * @fileoverview Robots blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  /* Begin motors blocks */

  // BLOCK MBOT2 - MOVE
  {
    "type": "robots_mbot2_move",
    "message0": "%{BKY_ROBOTS_MBOT2_MOVE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOVE_FORWARD}", "forward"],
        ["%{BKY_ROBOTS_MBOT2_MOVE_REVERSE}", "backward"]
      ]
    }, {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_MOVE_TOOLTIP}",
    "extensions": [
      "block_init_color",
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "robots_mbot2_move_init"
    ],
    "mutator": "robots_mbot2_move_mutator"
  },

  // BLOCK MBOT2 - MOVE BY
  {
    "type": "robots_mbot2_move_by",
    "message0": "%{BKY_ROBOTS_MBOT2_MOVE_BY_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOVE_FORWARD}", "1"],
        ["%{BKY_ROBOTS_MBOT2_MOVE_REVERSE}", "-1"]
      ]
    }, {
      "type": "input_value",
      "name": "DISTANCE",
      "check": "Number"
    }, {
      "type": "field_grid_dropdown",
      "name": "UNIT",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOVE_BY_CM}", "CM"],
        ["%{BKY_ROBOTS_MBOT2_MOVE_BY_INCHS}", "INCHS"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_MOVE_BY_TOOLTIP}",
    "extensions": [
      "block_init_color",
      "block_init_helpurl",
    ]
  },

  // BLOCK MBOT2 - TURN
  {
    "type": "robots_mbot2_turn",
    "message0": "%{BKY_ROBOTS_MBOT2_TURN_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_TURN_LEFT}", "-1"],
        ["%{BKY_ROBOTS_MBOT2_TURN_RIGHT}", "1"]
      ]
    }, {
      "type": "input_value",
      "name": "ANGLE",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_TURN_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - CONTROL MOTOR
  {
    "type": "robots_mbot2_control_motor",
    "message0": "%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"],
        ["%{BKY_ROBOTS_MBOT2_BOTH_MOTORS}", "ALL"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["↻", "1"],
        ["↺", "-1"]
      ]
    }, {
      "type": "input_value",
      "name": "VALUE",
      "check": "Number"
    }, {
      "type": "field_grid_dropdown",
      "name": "UNIT",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOTOR_SPEED}", "SPEED"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_POWER}", "POWER"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - CONTROL MOTOR ROTATION
  {
    "type": "robots_mbot2_turn_motor",
    "message0": "%{BKY_ROBOTS_MBOT2_TURN_MOTOR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"],
        ["%{BKY_ROBOTS_MBOT2_BOTH_MOTORS}", "ALL"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["↻", "1"],
        ["↺", "-1"]
      ]
    }, {
      "type": "input_value",
      "name": "ANGLE",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_TURN_MOTOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - STOP MOTOR
  {
    "type": "robots_mbot2_stop_motor",
    "message0": "%{BKY_ROBOTS_MBOT2_STOP_MOTOR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_BOTH_MOTORS}", "ALL"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_STOP_MOTOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - GET MOTOR ENCODING
  {
    "type": "robots_mbot2_get_motor_encoding",
    "message0": "%{BKY_ROBOTS_MBOT2_GET_MOTOR_ENCODING_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "TYPE",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOTOR_SPEED}", "SPEED"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_POWER}", "POWER"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_ANGLE}", "ANGLE"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_ROBOTS_MBOT2_GET_MOTOR_ENCODING_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - RESET MOTOR ANGULAR POSITION
  {
    "type": "robots_mbot2_reset_motor_angular_position",
    "message0": "%{BKY_ROBOTS_MBOT2_RESET_MOTOR_ANGULAR_POSITION_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_BOTH_MOTORS}", "ALL"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_RESET_MOTOR_ANGULAR_POSITION_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 - CONTROL MOTOR LOCKING
  {
    "type": "robots_mbot2_control_motor_locking",
    "message0": "%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_LOCKING_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_BOTH_MOTORS}", "ALL"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_LEFT}", "EM1"],
        ["%{BKY_ROBOTS_MBOT2_MOTOR_RIGHT}", "EM2"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "STATE",
      "options": [
        ["%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_LOCKING_ENABLE}", "1"],
        ["%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_LOCKING_DISABLE}", "0"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_ROBOTS_MBOT2_CONTROl_MOTOR_LOCKING_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  /* Begin ultrasonic blocks */

  // BLOCK MBOT2 ULTRASONIC - GET DISTANCE
  {
    "type": "robots_mbot2_ultrasonic_getDistance",
    "message0": "%{BKY_MBUILD_SENSORS_ULTRASONIC_GET_DISTANCE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_ULTRASONIC_GET_DISTANCE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 ULTRASONIC - SET BRIGHTNESS
  {
    "type": "robots_mbot2_ultrasonic_setBrightness",
    "message0": "%{BKY_MBUILD_SENSORS_ULTRASONIC_SET_BRIGHTNESS_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "input_value",
      "name": "ID",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "BRIGHTNESS",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_ULTRASONIC_SET_BRIGHTNESS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 ULTRASONIC - GET BRIGHTNESS
  {
    "type": "robots_mbot2_ultrasonic_getBrightness",
    "message0": "%{BKY_MBUILD_SENSORS_ULTRASONIC_GET_BRIGHTNESS_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "input_value",
      "name": "ID",
      "check": "Number"
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_ULTRASONIC_GET_BRIGHTNESS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 ULTRASONIC - STOP LED
  {
    "type": "robots_mbot2_ultrasonic_stopLED",
    "message0": "%{BKY_MBUILD_SENSORS_ULTRASONIC_STOP_LED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "input_value",
      "name": "ID",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_ULTRASONIC_STOP_LED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK MBOT2 ULTRASONIC - PLAY LED
  {
    "type": "robots_mbot2_ultrasonic_playLED",
    "message0": "%{BKY_MBUILD_SENSORS_ULTRASONIC_PLAY_LED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "EMOTION",
      "options": [
        ["%{BKY_MBUILD_SENSORS_ULTRASONIC_EMOTION_SLEEPY}", "sleepy"],
        ["%{BKY_MBUILD_SENSORS_ULTRASONIC_EMOTION_HAPPPY}", "happy"],
        ["%{BKY_MBUILD_SENSORS_ULTRASONIC_EMOTION_DIZZY}", "dizzy"],
        ["%{BKY_MBUILD_SENSORS_ULTRASONIC_EMOTION_WINK}", "wink"],
        ["%{BKY_MBUILD_SENSORS_ULTRASONIC_EMOTION_THINKING}", "thinking"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_ULTRASONIC_PLAY_LED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  /* Begin quad RGB sensor blocks */

  // BLOCK QUAD RGB - DETECTION L1 R1 IS ?
  {
    "type": "sensors_mbuild_quad_RGB_detection_L1_R1_is",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_L1_R1_DETECTION_IS_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_LINE}", "line"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GROUND}", "ground"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_WHITE}", "white"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_RED}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_YELLOW}", "yellow"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GREEN}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CYAN}", "cyan"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLUE}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_PURPLE}", "purple"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLACK}", "black"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CUSTOM}", "custom"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "RESULT",
      "options": [
        ["0 (00)", "0"],
        ["1 (01)", "1"],
        ["2 (10)", "2"],
        ["3 (11)", "3"]
      ]
    }],
    "output": "Boolean",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_L1_R1_DETECTION_IS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - GET DETECTION L1 R1 VALUE
  {
    "type": "sensors_mbuild_quad_RGB_get_detection_L1_R1",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_L1_R1_DETECTION_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_LINE}", "line"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GROUND}", "ground"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_WHITE}", "white"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_RED}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_YELLOW}", "yellow"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GREEN}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CYAN}", "cyan"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLUE}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_PURPLE}", "purple"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLACK}", "black"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CUSTOM}", "custom"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_L1_R1_DETECTION_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - DETECTION IS ?
  {
    "type": "sensors_mbuild_quad_RGB_detection_is",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_DETECTION_IS_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_LINE}", "line"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GROUND}", "ground"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_WHITE}", "white"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_RED}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_YELLOW}", "yellow"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GREEN}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CYAN}", "cyan"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLUE}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_PURPLE}", "purple"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLACK}", "black"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CUSTOM}", "custom"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "RESULT",
      "options": [
        ["0 (0000)", "0"],
        ["1 (0001)", "1"],
        ["2 (0010)", "2"],
        ["3 (0011)", "3"],
        ["4 (0100)", "4"],
        ["5 (0101)", "5"],
        ["6 (0110)", "6"],
        ["7 (0111)", "7"],
        ["8 (1000)", "8"],
        ["9 (1001)", "9"],
        ["10 (1010)", "10"],
        ["11 (1011)", "11"],
        ["12 (1100)", "12"],
        ["13 (1101)", "13"],
        ["14 (1110)", "14"],
        ["15 (1111)", "15"],
      ]
    }],
    "output": "Boolean",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_DETECTION_IS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - GET DETECTION VALUE
  {
    "type": "sensors_mbuild_quad_RGB_get_detection",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_DETECTION_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_LINE}", "line"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GROUND}", "ground"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_WHITE}", "white"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_RED}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_YELLOW}", "yellow"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GREEN}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CYAN}", "cyan"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLUE}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_PURPLE}", "purple"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLACK}", "black"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CUSTOM}", "custom"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_DETECTION_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - IS COLOR DETECTED
  {
    "type": "sensors_mbuild_quad_RGB_is_color_detected",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_IS_COLOR_DETECTED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "PROBE",
      "options": [
        ["L1", "L1"],
        ["R1", "R1"],
        ["L2", "L2"],
        ["R2", "R2"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_LINE}", "line"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GROUND}", "background"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_WHITE}", "white"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_RED}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_YELLOW}", "yellow"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_GREEN}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CYAN}", "cyan"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLUE}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_PURPLE}", "purple"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_BLACK}", "black"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_MODE_CUSTOM}", "custom"]
      ]
    }],
    "output": "Boolean",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_IS_COLOR_DETECTED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - GET PROBE DATA
  {
    "type": "sensors_mbuild_quad_RGB_get_probe_data",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_PROBE_DATA_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "DATA",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_R}", "red"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_G}", "green"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_B}", "blue"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_GRAY_LEVEL}", "gray"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_LIGHT}", "light"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DATA_COLOR}", "color_sta"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "PROBE",
      "options": [
        ["L1", "L1"],
        ["R1", "R1"],
        ["L2", "L2"],
        ["R2", "R2"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_PROBE_DATA_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - GET OFFSET TRACK
  {
    "type": "sensors_mbuild_quad_RGB_get_offset_track",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_OFFSET_TRACK_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }],
    "output": "Number",
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_GET_OFFSET_TRACK_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB - DEFINE COLOR
  {
    "type": "sensors_mbuild_quad_RGB_define_color",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_DEFINE_COLOR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "COLOR",
      "options": [
        ["%{BKY_COLOUR_RED}", "red"],
        ["%{BKY_COLOUR_GREEN}", "green"],
        ["%{BKY_COLOUR_BLUE}", "blue"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_DEFINE_COLOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB _ SET LED COLOR FROM LIST
  {
    "type": "sensors_mbuild_quad_RGB_set_color_list",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_LIST_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "COLOR",
      "options": [
        ["%{BKY_COLOUR_WHITE}", "white"],
        ["%{BKY_COLOUR_PURPLE}", "purple"],
        ["%{BKY_COLOUR_BLACK}", "black"],
        ["%{BKY_COLOUR_RED}", "red"],
        ["%{BKY_COLOUR_YELLOW}", "yellow"],
        ["%{BKY_COLOUR_GREEN}", "green"],
        ["%{BKY_COLOUR_CYAN}", "cyan"],
        ["%{BKY_COLOUR_BLUE}", "blue"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_LIST_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB _ SET RGB LED
  {
    "type": "sensors_mbuild_quad_RGB_set_color_RGB",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_RGB_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "input_value",
      "name": "R",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "G",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "B",
      "check": "Number"
    }],
    "extensions": [
      "block_init_color"
    ],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_RGB_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "sensors_quad_RGB_set_color_init"
    ],
    "mutator": "sensors_quad_RGB_set_color_mutator",
  },

  // BLOCK QUAD RGB _ SET PALETTE RGB LED
  {
    "type": "sensors_mbuild_quad_RGB_set_color_palette",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_PALETTE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }, {
      "type": "input_value",
      "name": "COLOR",
      "check": "Colour"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_SET_COLOR_PALETTE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color",
      "block_buttons_plus_minus",
      "sensors_quad_RGB_set_color_init"
    ],
    "mutator": "sensors_quad_RGB_set_color_mutator",
  },

  // BLOCK QUAD RGB _ SET LED OFF
  {
    "type": "sensors_mbuild_quad_RGB_close_led",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_CLOSE_LED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_CLOSE_LED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB _ CALIBRATE
  {
    "type": "sensors_mbuild_quad_RGB_calibrate",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_CALIBRATE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "SENSOR",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_CALIBRATE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK QUAD RGB _ SET MODE DETECTION
  {
    "type": "sensors_mbuild_quad_RGB_color_mode",
    "message0": "%{BKY_MBUILD_SENSORS_QUAD_RGB_COLOR_MODE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DETECTION_MODE_STANDARD}", "standard"],
        ["%{BKY_MBUILD_SENSORS_QUAD_RGB_DETECTION_MODE_ENHANCE}", "enhance"]
      ]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_MBUILD_SENSORS_QUAD_RGB_COLOR_MODE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Robots = Object.create(null);

/**
 * Performs final setup of 'robots_mbot2_move' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robots.ROBOTS_MBOT2_MOVE_INIT_EXTENSION = function () {
  this.duration_ = false;
  this.update_(this.updateField_);
};

/**
 * Performs final setup of 'sensors_mbuild_quad_RGB_set_color_RGB' and 'sensors_mbuild_quad_RGB_set_color_palette' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robots.SENSORS_QUAD_RGB_SET_COLOR_INIT_EXTENSION = function () {
  this.tolerance_ = false;
  this.update_(this.updateField_);
};

/**
* Mixin for mutator functions in the 'robots_mbot2_move' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Robots.ROBOTS_MBOT2_MOVE_MUTATOR_MIXIN =
  Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'ROBOTS_MBOT2_MOVE_DURATION', 'input', 1);

/**
 * Mixin for mutator functions in the 'sensors_mbuild_quad_RGB_set_color_RGB' and 'sensors_mbuild_quad_RGB_set_color_palette' extensions.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Robots.SENSORS_QUAD_RGB_SET_COLOR_MUTATOR_MIXIN =
  Blockly.Constants.Utils.addOptionMutatorMixin('tolerance', 'MBUILD_SENSORS_QUAD_RGB_SET_COLOR_TOLERANCE', 'input', 50, "(%)");


// Initialization extensions
Blockly.Extensions.register('robots_mbot2_move_init',
  Blockly.Constants.Robots.ROBOTS_MBOT2_MOVE_INIT_EXTENSION);

Blockly.Extensions.register('sensors_quad_RGB_set_color_init',
  Blockly.Constants.Robots.SENSORS_QUAD_RGB_SET_COLOR_INIT_EXTENSION);

// Mutator*
Blockly.Extensions.registerMutator("robots_mbot2_move_mutator",
  Blockly.Constants.Robots.ROBOTS_MBOT2_MOVE_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator("sensors_quad_RGB_set_color_mutator",
  Blockly.Constants.Robots.SENSORS_QUAD_RGB_SET_COLOR_MUTATOR_MIXIN);