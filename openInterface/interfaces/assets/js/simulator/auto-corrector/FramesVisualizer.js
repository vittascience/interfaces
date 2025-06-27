var FramesVisualizer = {

    ROW_WIDTH: 300,
    ROW_HEIGHT: 119,
    MODULE_WIDTH: 200,
    SEPARATOR_WIDTH: 1.5,
    SEPARATOR_HEIGHT: 1.5,
    DOT_RESOLUTION: 10,
    DOT_RESOLUTION_FRAME: 5,
    DOT_RESOLUTION_ERROR: 12,
    MARGIN_UP_BOTTOM: 20,
    LINKER_DOT_LENGTH: 30,

    COLOR_ROW: "var(--bg-4)",

    leftSVG: null,
    rightSVG: null,
    linker: false,
    previousValues: {},

    /**
     * Get the SVG left for modules and SVG right for module rows.
     * @public
     * @param {Array<Array<Object>>} framesTable 
     * @returns {Array<SVG>} [leftSVG, rightSVG]
     */
    generateExerciseSVG: function (framesTable, linker = true) {
        this.linker = linker;
        const rowIds = framesTable[0].map((modules) => modules.id_component);
        // creating left SVG for components
        this.leftSVG = SVG().size(
            this.MODULE_WIDTH,
            this.ROW_HEIGHT * rowIds.length
        ).addClass("visualizer-left-svg");
        // creating right SVG for values
        this.rightSVG = SVG().size(
            this.ROW_WIDTH,
            this.ROW_HEIGHT * rowIds.length
        ).addClass("visualizer-right-svg");
        // drawing row and module div
        rowIds.map((id, index) => {
            // check if user added the right module in the code
            // add module to SVG left if module is not simulated
            this._drawExerciseModule(index, id);
            // grab the values for current row
            const values = framesTable.map((frames) => frames[index].value);
            // draw the row & component 
            this._drawExerciseRow(index, values, id);
        });
        return [this.leftSVG, this.rightSVG];
    },

    /**
     * Draw the row of a module by id in right SVG.
     * @param {int} index 
     * @param {Array<string>} values 
     * @param {string} id 
     */
    _drawExerciseRow: function (index, values, id) {
        let row = this.rightSVG
            .rect(this.ROW_WIDTH, this.ROW_HEIGHT)
            .attr({
                fill: "var(--bg-0)",
                y: this.ROW_HEIGHT * index,
            })
            .addClass('visualizer-' + id)
            .data({
                "dotRes": this.DOT_RESOLUTION,
                "rowNumber": index,
                "valLength": values.length
            });
        let rowGroup = this.rightSVG.group();
        // if not the first row, draw a separator
        if (index > 0) {
            this.rightSVG
                .rect(this.ROW_WIDTH, this.SEPARATOR_WIDTH)
                .attr({
                    fill: "var(--bg-3)",
                    y: this.ROW_HEIGHT * index + this.SEPARATOR_WIDTH
                });
        }
        // setting up tooltip string
        let tooltipString = this._getModuleTooltip(id);
        // checking if component returns number or boolean-style values
        if (parseFloat(values[0]) >= 0) {
            // if we have numbers, parse the values as true numbers
            values = values.map((value) => parseFloat(value));
            // grab min and max values from the frames
            const min = Math.min.apply(null, values);
            const max = Math.max.apply(null, values);
            if (min === max) {
                Object.entries(values).forEach(([key, value]) => {
                    const xValue = this.ROW_WIDTH * key / values.length;
                    const yValue = this.ROW_HEIGHT * (1 / 2 + index);
                    rowGroup
                        .circle(this.DOT_RESOLUTION)
                        .center(xValue, yValue)
                        .attr({
                            "fill": this.COLOR_ROW,
                            "data-toggle": "tooltip",
                            "title": value
                        });
                });
            } else {
                // add min and max values to tooltip
                tooltipString += " [" + min + ";" + max + "]";
                // save min and max values to the row
                row.data({
                    "minValue": min,
                    "maxValue": max
                });
                const minRow = this._getMinRow(index);
                const maxRow = this._getMaxRow(index);
                // draw the values
                if (this.linker) {
                    this.isDotResolution = false;
                    this.previousValues["rows"] = {
                        pos: {
                            x: null,
                            y: null
                        },
                        value: null
                    };
                }
                Object.entries(values).forEach(([key, value]) => {
                    const xValue = this.ROW_WIDTH * key / values.length;
                    const yValue = this._getValueScale(value, max, min, maxRow, minRow);
                    rowGroup
                        .circle(this.DOT_RESOLUTION)
                        .center(xValue, yValue)
                        .attr({
                            "fill": this.COLOR_ROW,
                            "data-toggle": "tooltip",
                            "title": value
                        });
                    this.drawLinker(rowGroup, "rows", value, xValue, yValue);
                });
            }
        } else {
            Object.entries(values).forEach(([key, value]) => {
                // for each value : value = "None" or "OFF" -> no dot
                if (!(value == "None" || value == "OFF")) {
                    const xValue = this.ROW_WIDTH * key / values.length;
                    const yValue = this.ROW_HEIGHT * (1 / 2 + index);
                    rowGroup
                        .rect(value === null ? 1 : this.DOT_RESOLUTION, value === null ? 1 : this.DOT_RESOLUTION)
                        .center(xValue, yValue)
                        .radius(3)
                        .attr({
                            "fill": this.COLOR_ROW,
                            "data-toggle": "tooltip",
                            "title": value
                        });
                }
            });
        }
        // add tooltip to row
        row.attr({
            "data-toggle": "tooltip",
            "title": tooltipString
        });
    },

    /**
     * Draw the module div by id in left SVG.
     * @param {int} index 
     * @param {string} id 
     */
    _drawExerciseModule: function (index, id) {
        const yValue = this.ROW_HEIGHT * index + (index > 0 ? this.SEPARATOR_WIDTH : 0)
        const html = Simulator.getExerciseModuleDiv(id);
        this.leftSVG
            .foreignObject(this.MODULE_WIDTH, this.ROW_HEIGHT)
            .add(SVG(html))
            .attr({
                y: yValue
            });
    },

    /**
     * Draw the dot frame during validation of exercise. 
     * @public
     * @param {Object} frame 
     * @param {boolean} isCorrect 
     */
    drawDotFrame: function (frame, isCorrect) {
        // getting corresponsing SVG
        const rightSVG = SVG('.visualizer-right-svg');
        const row = SVG('.visualizer-' + frame.id_component);
        if (row) {
            // getting values stored in the row SVG
            const index = row.data('rowNumber');
            const xValue = this.ROW_WIDTH * frame.frame / row.data('valLength');
            // setting the elt color
            const color = isCorrect ? 'var(--vitta-green)' : 'var(--vitta-orange-light)';
            // checking if component returns number or boolean-style values
            let value = frame.value;
            if (value !== "None" && value !== "OFF") {
                const min = row.data('minValue');
                const max = row.data('maxValue');
                let yValue = this.ROW_HEIGHT * (1 / 2 + index);
                // if we have numbers, parse the value as true number
                value = parseFloat(value);
                if (min !== undefined && max !== undefined) {
                    const minRow = this._getMinRow(index);
                    const maxRow = this._getMaxRow(index);
                    yValue = this._getValueScale(value, max, min, maxRow, minRow);
                }
                
                rightSVG
                    .circle(isCorrect ? this.DOT_RESOLUTION_FRAME : this.DOT_RESOLUTION_ERROR)
                    .center(xValue, yValue)
                    .attr({
                        "fill": color,
                        "data-toggle": "tooltip",
                        "title": value
                    })
                    .addClass('visualizer-frame');
                this.isDotResolution = true;
                if (isCorrect) {
                    this.drawLinker(rightSVG, frame.id_component, value, xValue, yValue, 'var(--vitta-green)');
                }
            } else if (!(value == "None" || value == "OFF")){
                // if we have string/boolean
                // for each value : value = "None" or "OFF" -> no dot
                const yValue = this.ROW_HEIGHT * (1 / 2 + index);
                SVG(rightSVG)
                    .rect(this.DOT_RESOLUTION_FRAME, this.DOT_RESOLUTION_FRAME)
                    .center(xValue, yValue)
                    .radius(3)
                    .attr({
                        "fill": color,
                        "data-toggle": "tooltip",
                        "title": value
                    })
                    .addClass('visualizer-frame');
            }
        }
    },

    /**
     * Reset previous dotted frame in Visualizer.
     */
    resetValidator: function () {
        $('.visualizer-right-svg').removeClass("visualizer-frame");
        $(".visualizer-frame").remove();
        for (var i in this.previousValues) {
            this.previousValues[i] = {
                pos: {
                    x: null,
                    y: null
                },
                value: null
            };
        }
    },

    /**
     * Get y value in the module row.
     * @param {int} value
     * @param {int} inMin
     * @param {int} inMax
     * @param {int} outMin
     * @param {int} outMax
     * @returns yValue
     */
    _getValueScale: function (value, inMin, inMax, outMin, outMax) {
        const yValue = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
        if (yValue < outMin) {
            return outMin;
        } else if (yValue > outMax) {
            return outMax;
        }
        return yValue;
    },

    /**
     * Get tooltip of module to add it in module row.
     * @param {string} id 
     * @returns tooltip
     */
    _getModuleTooltip: function (id) {
        const genericId = id.split('_')[0];
        const pinName = id.split('_')[1];
        const mod = Simulator.getModuleByKey(genericId);
        let tooltip = mod.title;
        tooltip += " (";
        if (pinName) {
            tooltip += pinName;
        } else {
            tooltip += mod.pin;
        }
        tooltip += ")";
        return tooltip;
    },

    /**
     * Draw linker previous the current value.
     * @param {Svg/group} row 
     * @param {string} id
     * @param {float} value 
     * @param {float} xValue 
     * @param {float} yValue 
     */
    drawLinker: function (row, id, value, xValue, yValue, color = this.COLOR_ROW) {
        if (this.linker && this.previousValues[id]) {
            if (this.previousValues[id].value !== null && this.previousValues[id].value !== value) {
                // Draw the dots between 2 values.
                this._link2Values(row, this.previousValues[id], xValue, yValue, color);
            }
        }
        this.previousValues[id] = {
            pos: {
                x: xValue,
                y: yValue
            },
            value: value
        };
    },

    /**
     * Add dots bewtween 2 values.
     * @param {Svg/group} rowGroup 
     * @param {int} from_x 
     * @param {int} from_y 
     * @param {int} to_x 
     * @param {int} to_y 
     */
    _link2Values: function (rowGroup, previousValue, to_x, to_y, color = this.COLOR_ROW) {
        const linkingPoints_X = linspace(previousValue.pos.x, to_x, this.LINKER_DOT_LENGTH);
        const linkingPoints_Y = linspace(previousValue.pos.y, to_y, this.LINKER_DOT_LENGTH);
        for (var i = 0; i < this.LINKER_DOT_LENGTH; i++) {
            if (this.isDotResolution) {
                rowGroup
                    .circle(this.DOT_RESOLUTION_FRAME)
                    .center(linkingPoints_X[i], linkingPoints_Y[i])
                    .attr({
                        "fill": color,
                        "data-toggle": "tooltip",
                        "title": previousValue.value
                    })
                    .addClass('visualizer-frame');
            } else {
                rowGroup
                    .circle(this.DOT_RESOLUTION)
                    .center(linkingPoints_X[i], linkingPoints_Y[i])
                    .attr({
                        "fill": color,
                        "data-toggle": "tooltip",
                        "title": previousValue.value
                    });
            }
        }
    },

    /**
     * Get minimum row.
     * @param {int} index 
     * @returns minRow
     */
    _getMinRow: function (index) {
        return this.ROW_HEIGHT * (1 + index) - this.DOT_RESOLUTION / 2 - this.MARGIN_UP_BOTTOM;
    },

    /**
     * Get maximum row.
     * @param {int} index 
     * @returns maxRow
     */
    _getMaxRow: function (index) {
        return this.ROW_HEIGHT * index + this.DOT_RESOLUTION / 2 + this.MARGIN_UP_BOTTOM;
    }

};

/**
 * Create an array of 'len' values bewtween 'min' and 'max' extremums.
 * @param {int} min 
 * @param {int} max 
 * @param {int} len 
 * @returns {Array} arr
 */
function linspace(min, max, len) {
    const step = (max - min) / (len - 1);
    let arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(min + (step * i));
    }
    return arr;
};
