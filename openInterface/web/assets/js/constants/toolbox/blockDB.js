/**
 * Database of defaut blocks in BBC micro:bit toolbox.
 * There is only the blocks which require default inputs.
 */
const TOOLBOXES_BLOCKS_CONTENT = {
    specific: {
        textContent: () => '<value name="content"><block type="emptytext"></block></value>',
    },
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            'span': this.specific.textContent(),
            'paragraph': this.specific.textContent(),
            'header': this.specific.textContent(),
            'link': this.specific.textContent(),
            'table': this.Set.valueInput("content", '<block type="tablerow"></block>') + this.Set.valueInput("content", '<block type="tablerow"></block>'),
            'tableheading': this.specific.textContent(),
            'tabledata': this.specific.textContent(),
            'unorderedlist': this.Set.valueInput("content", '<block type="listitem">' + this.specific.textContent() + '</block>'),
            'orderedlist': this.Set.valueInput("content", '<block type="listitem">' + this.specific.textContent() + '</block>'),
            'listitem': this.specific.textContent(),
            'label': this.specific.textContent(),
            'colornew': this.Set.colour_picker('#fff', "value"),
            'textshadownew': this.Set.colour_picker('#fff', "color"),
            'bgcolornew': this.Set.colour_picker('#fff', "value"),
            'bordernew': this.Set.colour_picker('#fff', "color"),
            'borderedge': this.Set.colour_picker('#fff', "color"),
            'boxshadownew': this.Set.colour_picker('#fff', "color"),
            'transition': this.Set.valueInput("timing-function", '<block type="transitiontimingdropdown"></block>'),
            'controls_repeat_ext': this.Set.number("TIMES", 10),
            'controls_for': this.Set.number("FROM", 1) + this.Set.number("TO", 10) + this.Set.number("BY", 1),
            'bi_math_arithmetic': this.Set.number("A", 1) + this.Set.number("B", 1),
            'math_single': this.Set.number("NUM", 1),
            'math_trig': this.Set.number("NUM", 45),
            'math_number_property': this.Set.number("NUMBER_TO_CHECK"),
            'math_change': this.Set.number("DELTA", 1),
            'math_round': this.Set.number("NUM", 3.1),
            'math_modulo': this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            'math_constrain': this.Set.number("VALUE", 50) + this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            'math_random_int': this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            'text_append': this.Set.text("TEXT"),
            'text_length': this.Set.text("VALUE", 'abc'),
            'text_isEmpty': this.Set.text("VALUE"),
            'text_indexOf': this.Set.variable("VALUE", 'text') + this.Set.text("FIND", 'abc'),
            'text_charAt': this.Set.variable("VALUE", 'text'),
            'text_getSubstring': this.Set.variable("STRING", 'text'),
            'text_changeCase': this.Set.text("VALUE", 'abc'),
            'text_trim': this.Set.text("VALUE", 'abc'),
            'text_print': this.Set.text("VALUE", 'abc'),
            'text_prompt_ext': this.Set.text("VALUE", 'abc'),
            'lists_repeat': this.Set.number("NUM", 5),
            'lists_indexOf': this.Set.variable("VALUE", 'list'),
            'lists_getIndex': this.Set.variable("VALUE", 'list'),
            'lists_setIndex': this.Set.variable("LIST", 'list'),
            'lists_getSublist': this.Set.variable("LIST", 'list'),
            'lists_split': this.Set.text("DELIM", ','),
            'colour_rgb': this.Set.number("RED", 100) + this.Set.number("GREEN", 50) + this.Set.number("BLUE"),
            'colour_blend': this.Set.colour_picker('#ff0000', "COLOUR1") + this.Set.colour_picker('#3333ff', "COLOUR2") + this.Set.number("RATIO", 0.5)
        }
    }
};