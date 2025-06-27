/**
 * @fileoverview Display blocks for Photon.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_change_color",
        "message0": "%{BKY_DISPLAY_CHANGE_COLOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 127, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "LIGHTBLUE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "YELLOW"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "RED"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(32, 255, 110);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "LIGHTGREEN"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(64, 224, 208);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "TURQUOISE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 128, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "DARKGREEN"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLUE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(128, 0, 128);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "PURPLE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 165, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "ORANGE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(238, 130, 238);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "PINK"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "WHITE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLACK"]
            ]

        }, {
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_DISPLAY_MODE_EYES}", "eyes"],
                ["%{BKY_DISPLAY_MODE_EARS}", "ears"],
                ["%{BKY_DISPLAY_MODE_BOTH}", "both"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHANGE_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_change_color_rgb",
        "message0": "%{BKY_DISPLAY_CHANGE_COLOR_RGB_TITLE}",
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
        }, {
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_DISPLAY_MODE_EYES}", "eyes"],
                ["%{BKY_DISPLAY_MODE_EARS}", "ears"],
                ["%{BKY_DISPLAY_MODE_BOTH}", "both"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHANGE_COLOR_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_change_color_rgb_palette",
        "message0": "%{BKY_DISPLAY_CHANGE_COLOR_RGB_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOUR",
            "check": "Colour"
        }, {
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_DISPLAY_MODE_EYES}", "eyes"],
                ["%{BKY_DISPLAY_MODE_EARS}", "ears"],
                ["%{BKY_DISPLAY_MODE_BOTH}", "both"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHANGE_COLOR_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)