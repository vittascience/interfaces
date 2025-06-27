/**
 * @fileoverview Rover blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  /* Begin Rover - Drive blocks */

  // BLOCK ROVER - CONTROL GO
  {
    "type": "robots_rover_setGo",
    "message0": "%{BKY_TI_ROVER_GO_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["%{BKY_TI_ROVER_GO_FORWARD}", "FORWARD"],
        ["%{BKY_TI_ROVER_GO_REVERSE}", "BACKWARD"]
      ]
    }, {
      "type": "input_value",
      "name": "UNIT",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_GO_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - CONTROL GO IN DURATION
  {
    "type": "robots_rover_setGoTime",
    "message0": "%{BKY_TI_ROVER_GO_TIME_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["%{BKY_TI_ROVER_GO_FORWARD}", "FORWARD"],
        ["%{BKY_TI_ROVER_GO_REVERSE}", "BACKWARD"]
      ]
    }, {
      "type": "input_value",
      "name": "DURATION",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_GO_TIME_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - TURN TO (RIGHT or LEFT)
  {
    "type": "robots_rover_turnTo",
    "message0": "%{BKY_TI_ROVER_TURNTO_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "DIRECTION",
      "options": [
        ["%{BKY_TI_ROVER_RIGHT_BIS}", "RIGHT"],
        ["%{BKY_TI_ROVER_LEFT}", "LEFT"]
      ]
    }, {
      "type": "input_value",
      "name": "ANGLE",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_TURNTO_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - CONTROL MOTOR
  {
    "type": "robots_rover_controlMotor",
    "message0": "%{BKY_TI_ROVER_CONTROLMOTOR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MOTOR",
      "options": [
        ["%{BKY_TI_ROVER_RIGHT}", "RIGHT"],
        ["%{BKY_TI_ROVER_LEFT}", "LEFT"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "DIR",
      "options": [
        ["↻", "CLOCKWISE"],
        ["↺", "ANTICLOCKWISE"]
      ]
    }, {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "DURATION",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_CONTROLMOTOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - MOVE TO XY
  {
    "type": "robots_rover_moveToXY",
    "message0": "%{BKY_TI_ROVER_MOVETOXY_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "X",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "Y",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_MOVETOXY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - MOVE TO POLAR
  {
    "type": "robots_rover_moveToPolar",
    "message0": "%{BKY_TI_ROVER_MOVETOPOLAR_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "R",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "THETA",
      "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_MOVETOPOLAR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - STOP
  {
    "type": "robots_rover_stop",
    "message0": "%{BKY_TI_ROVER_STOP_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_STOP_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - RESUME
  {
    "type": "robots_rover_resume",
    "message0": "%{BKY_TI_ROVER_RESUME_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_RESUME_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER -  STAY
  {
    "type": "robots_rover_stay",
    "message0": "%{BKY_TI_ROVER_STAY_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "DURATION",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_STAY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  /* Begin Rover - Inputs blocks */

  // BLOCK ROVER - GET ULTRASONIC RANGER
  {
    "type": "robots_rover_getUltrasonicRange",
    "message0": "%{BKY_TI_ROVER_ULTRASONICRANGER_TITLE}",
    "output": "Number",
    "inputsInline": true,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_ULTRASONICRANGER_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - GET COLOR LEVEL
  {
    "type": "robots_rover_getColorLevel",
    "message0": "%{BKY_TI_ROVER_COLORSENSOR_GETLEVEL_TITLE}",
    "args0": [{
      "type": "field_dropdown",
      "name": "COLOR",
      "options": [
        ["%{BKY_TI_ROVER_COLOR_GRAY}", "gray"],
        ["%{BKY_TI_ROVER_COLOR_RED}", "red"],
        ["%{BKY_TI_ROVER_COLOR_GREEN}", "green"],
        ["%{BKY_TI_ROVER_COLOR_BLUE}", "blue"]
      ]
    }],
    "output": "Number",
    "inputsInline": true,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_COLORSENSOR_GETLEVEL_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER - GET COLOR
  {
    "type": "robots_rover_getColor",
    "message0": "%{BKY_TI_ROVER_COLORSENSOR_GETCOLOR_TITLE}",
    "output": "Number",
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_COLORSENSOR_GETCOLOR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER GYROSCOPE - GET ANGULAR SPEED
  {
    "type": "robots_rover_getAngularSpeed",
    "message0": "%{BKY_TI_ROVER_GYROSCOPE_GETANGULARSPEED_TITLE}",
    "output": "Number",
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_GYROSCOPE_GETANGULARSPEED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER GYROSCOPE - GET ANGLE
  {
    "type": "robots_rover_getRobotAngle",
    "message0": "%{BKY_TI_ROVER_GYROSCOPE_GETANGLE_TITLE}",
    "output": "Number",
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_GYROSCOPE_GETANGLE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  /* Begin Rover - Outputs blocks */

  // BLOCK ROVER RGB _ SET COLOR R,G,B
  {
    "type": "robots_rover_setLEDRGB",
    "message0": "%{BKY_TI_ROVER_SETRGBLED_TITLE}",
    "args0": [{
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
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_SETRGBLED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER RGB _ SET COLOR R,G,B
  {
    "type": "robots_rover_setLEDRGBPalette",
    "message0": "%{BKY_TI_ROVER_SETRGBLEDPALETTE_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "COLOR",
      "check": "Colour"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_SETRGBLEDPALETTE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER RGB _ BLINK LED
  {
    "type": "robots_rover_blinkLEDRGB",
    "message0": "%{BKY_TI_ROVER_BLINKRGBLED_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "FREQ",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "DURATION",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_BLINKRGBLED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // BLOCK ROVER RGB - STOP LED
  {
    "type": "robots_rover_stopLEDRGB",
    "message0": "%{BKY_TI_ROVER_STOPRGBLED_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "style": "ti_rover_blocks",
    "tooltip": "%{BKY_TI_ROVER_STOPRGBLED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

]); // END JSON EXTRACT (Do not delete this comment.)
