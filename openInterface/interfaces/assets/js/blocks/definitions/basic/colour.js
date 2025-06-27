/**
 * @fileoverview Colour blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for colour picker.
  {
    "type": "colour_picker",
    "message0": "%1",
    "args0": [{
      "type": "field_colour",
      "name": "COLOUR",
      "colour": "#ff0000"
    }],
    "output": "Colour",
    "helpUrl": "%{BKY_COLOUR_PICKER_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_PICKER_TOOLTIP}",
  },

  // Block for random colour.
  {
    "type": "colour_random",
    "message0": "%{BKY_COLOUR_RANDOM_TITLE}",
    "output": "Colour",
    "helpUrl": "%{BKY_COLOUR_RANDOM_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_RANDOM_TOOLTIP}"
  },

  // Block for composing a colour from RGB components.
  {
    "type": "colour_rgb",
    "message0": "R %1 G %2 B %3",
    "args0": [{
      "type": "input_value",
      "name": "RED",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "GREEN",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "BLUE",
      "check": "Number",
      "align": "RIGHT"
    }
    ],
    "output": "Colour",
    "inputsInline": true,
    "helpUrl": "%{BKY_COLOUR_RGB_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_RGB_TOOLTIP}"
  },

  // Block for blending two colours together.
  {
    "type": "colour_blend",
    "message0": "%{BKY_COLOUR_BLEND_TITLE} %{BKY_COLOUR_BLEND_COLOUR1} " +
      "%1 %{BKY_COLOUR_BLEND_COLOUR2} %2 %{BKY_COLOUR_BLEND_RATIO} %3",
    "args0": [{
      "type": "input_value",
      "name": "COLOUR1",
      "check": "Colour",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "COLOUR2",
      "check": "Colour",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "RATIO",
      "check": "Number",
      "align": "RIGHT"
    }
    ],
    "output": "Colour",
    "helpUrl": "%{BKY_COLOUR_BLEND_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_BLEND_TOOLTIP}"
  }

]); // END JSON EXTRACT (Do not delete this comment.)