/**
 * @fileoverview Display blocks for Lego Spike.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_show_leds",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "PORT",
                "options": [
                    ["A", "A"],
                    ["B", "B"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLACK"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(238, 130, 238);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "VIOLET"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(128, 0, 128);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "PURPLE"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLUE"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 127, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "AZURE"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(64, 224, 208);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "TURQUOISE"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 128, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "GREEN"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "YELLOW"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 165, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "ORANGE"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "RED"],
                    [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "WHITE"]
                ]
            },
            {
                "type": "field_input",
                "name": "HIDDEN_LEDS_MATRIX"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SHOW_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "display_show_leds_init"
        ]
    },
    {
        "type": "display_set_pixel",
        "message0": "%{BKY_DISPLAY_SET_PIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLACK"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(238, 130, 238);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "VIOLET"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(128, 0, 128);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "PURPLE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 0, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "BLUE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 127, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "AZURE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(64, 224, 208);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "TURQUOISE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(0, 128, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "GREEN"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "YELLOW"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 165, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "ORANGE"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 0, 0);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "RED"],
                [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(255, 255, 255);stroke:white'/></svg>", width: 20, height: 20, alt: "" }, "WHITE"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_intensity",
        "message0": "%{BKY_DISPLAY_SET_INTENSITY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "input_value",
            "name": "INTENSITY",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_INTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);

Blockly.Constants.Display = Object.create(null);

/**
* Performs setup of 'show_leds' block for screen checkboxes display.
* @this {Blockly.Block}
*/
Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    const HIDDEN_LEDS_MATRIX = this.getField('HIDDEN_LEDS_MATRIX');
    HIDDEN_LEDS_MATRIX.setVisible(false);

    const colorMapping = {
        "BLACK": "rgb(0, 0, 0)",
        "VIOLET": "rgb(238, 130, 238)",
        "PURPLE": "rgb(128, 0, 128)",
        "BLUE": "rgb(0, 0, 255)",
        "AZURE": "rgb(0, 127, 255)",
        "TURQUOISE": "rgb(64, 224, 208)",
        "GREEN": "rgb(0, 128, 0)",
        "YELLOW": "rgb(255, 255, 0)",
        "ORANGE": "rgb(255, 165, 0)",
        "RED": "rgb(255, 0, 0)",
        "WHITE": "rgb(255, 255, 255)"
    };

    for (let row = 0; row < 3; row++) {
        const rowBoxes = this.appendDummyInput("ROW" + row);
        for (let column = 0; column < 3; column++) {
            const box = new Blockly.FieldCheckboxColor("0", { 'height': 24, 'width': 24 });
            box.setValidator(function (newValue) {
                const ledValues = JSON.parse(this.getField("HIDDEN_LEDS_MATRIX").value_);
                const color = this.getField("COLOR").value_;
                if (newValue === 'TRUE') {
                    ledValues[row * 3 + column] = color;
                }
                this.getField("HIDDEN_LEDS_MATRIX").setValue(JSON.stringify(ledValues));
            }.bind(this));
            rowBoxes.appendField(box, "LED" + row + "" + column);
            box.setValidator(function (newValue) {
                const sourceBlock = this.sourceBlock_;
                const currentBlockLabel = this.name;
                let image = "";
                for (let row = 0; row < 3; row++) {
                    for (let column = 0; column < 3; column++) {
                        const label = "LED" + row + "" + column;
                        const led = sourceBlock.getField(label);
                        if (label === currentBlockLabel) {
                            if (typeof this.borderRect_ !== 'undefined' && this.borderRect_ !== null) {
                                if (newValue === 'FALSE') {
                                    image += colorMapping['BLACK'];
                                } else {
                                    image += this.color_;
                                }
                                image += "/";
                            }
                        } else if (typeof led.borderRect_ !== 'undefined' && led.borderRect_ !== null) {
                            if (led.getValue() === 'FALSE') {
                                image += colorMapping['BLACK'];
                            } else {
                                image += led.borderRect_.style.fill;
                            }
                            image += "/";
                        }
                    }
                }
                if (image !== '') {
                    sourceBlock.getField('HIDDEN_LEDS_MATRIX').setValue(image.replace(/.$/, ""));
                }
            });
        }
    }

    if (typeof Main !== 'undefined') {
        Main.getWorkSpace().addChangeListener((e) => {
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                const colorsValuesString = HIDDEN_LEDS_MATRIX.getValue();
                if (colorsValuesString !== '') {
                    const colorsValuesArray = colorsValuesString.split('/');
                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 3; column++) {
                            const label = "LED" + row + "" + column;
                            const led = this.getField(label);
                            if (led !== null && typeof led.borderRect_ !== 'undefined' && led.borderRect_ !== null) {
                                led.borderRect_.style.fill = colorsValuesArray[(row * 3) + column];
                            }
                        }
                    }
                }
                CodeManager.getSharedInstance().setGeneratedCode();
                Main.getCodeEditor().updateCode();
            }
        });
    }

    // Event listener pour mettre à jour les couleurs des cases à cocher
    const dropdownField = this.getField("COLOR");
    dropdownField.setValidator(function (newValue) {
        const selectedColor = colorMapping[newValue];
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                const box = this.getField("LED" + row + "" + column);
                box.color_ = selectedColor;
                if (typeof box.borderRect_ !== 'undefined' && box.borderRect_ !== null) {
                    box.borderRect_.classList.add('spike-led-matrix');
                }
            }
        }
    }.bind(this));

    // init hidden field
    const hiddenLedValues = this.getField('HIDDEN_LEDS_MATRIX');
    hiddenLedValues.setVisible(false);
};

// Initialization extensions
Blockly.Extensions.register("display_show_leds_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);