/**
 * @fileoverview Input/Output blocks for Lego Spike.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK COLOR
    {
        "type": "sensors_color",
        "message0": "%{BKY_SENSORS_COLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }],
        "output": "String",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COLOR
    {
        "type": "sensors_colorDetection",
        "message0": "%{BKY_SENSORS_COLOR_DETECTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Black"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(128, 0, 128);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Purple"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 127, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Blue"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 128, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Green"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Yellow"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 165, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Orange"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "Red"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "White"]
            ]
        }],
        "output": "Boolean",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_COLOR_DETECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);
