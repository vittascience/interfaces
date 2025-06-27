/**
 * Database of defaut blocks in Let's Start Coding toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return [
            // Comment
            {
                "kind": "block",
                "type": "text_comment",
                "blockxml":
                    '<block type="text_comment">' + ToolboxManager.DB_.Set.field("TEXT", "Insert comment here") + '</block>'
            },
            // I-O
            {
                "kind": "block",
                "type": "io_pinMode",
                "blockxml":
                    '<block type="io_pinMode">' + ToolboxManager.DB_.Set.field("PIN", '5') + '</block>'
            },
            {
                "kind": "block",
                "type": "io_writeDigitalPin",
                "blockxml":
                    '<block type="io_writeDigitalPin">' + ToolboxManager.DB_.Set.pin("digital") + ToolboxManager.DB_.Set.state() + '</block>'
            },
            {
                "kind": "block",
                "type": "io_wait",
                "blockxml":
                    '<block type="io_wait">' + ToolboxManager.DB_.Set.number("TIME", 1000) + '</block>'
            },
            {
                "kind": "block",
                "type": "io_readDigitalPin",
                "blockxml":
                    '<block type="io_readDigitalPin">' + ToolboxManager.DB_.Set.field("PIN", '4') + '</block>'
            },
            {
                "kind": "block",
                "type": "io_writeAnalogPin",
                "blockxml":
                    '<block type="io_writeAnalogPin">' + ToolboxManager.DB_.Set.pin("analog") + ToolboxManager.DB_.Set.number("VALUE", 255) + '</block>'
            },
            {
                "kind": "block",
                "type": "io_digital_signal",
                "blockxml":
                    '<block type="io_digital_signal"></block>'
            },
            // Actuators
            {
                "kind": "block",
                "type": "actuators_tone",
                "blockxml":
                    '<block type="actuators_tone">' + ToolboxManager.DB_.Set.field("PIN", '2') + ToolboxManager.DB_.Set.number("FREQUENCY", 440) + '</block>'
            },
            {
                "kind": "block",
                "type": "actuators_noTone",
                "blockxml":
                    '<block type="actuators_noTone">' + ToolboxManager.DB_.Set.field("PIN", '2') + '</block>'
            },
            // Math
            {
                "kind": "block",
                "type": "math_number"
            },
            {
                "kind": "block",
                "type": "math_arithmetic",
                "blockxml":
                    '<block type="math_arithmetic">' + ToolboxManager.DB_.Set.field("OP", 'ADD') + ToolboxManager.DB_.Set.number("B", 1) + '</block>'
            },
            {
                "kind": "block",
                "type": "math_random_int",
                "blockxml":
                    '<block type="math_random_int">' + ToolboxManager.DB_.Set.number("FROM", 1) + ToolboxManager.DB_.Set.number("TO", 100) + '</block>'
            },
            // Logic
            {
                "kind": "block",
                "type": "controls_if",
                "blockxml":
                    '<block type="controls_if">' + "<value name='IF0'><block type='logic_compare'>" + ToolboxManager.DB_.Set.number("B", 1) + "</block></value>" + '</block>'
            },
            {
                "kind": "block",
                "type": "logic_compare"
            },
            {
                "kind": "block",
                "type": "logic_operation"
            },
            // Loops
            {
                "kind": "block",
                "type": "controls_for",
                "blockxml":
                    '<block type="controls_for">' + ToolboxManager.DB_.Set.number("FROM", 1) + ToolboxManager.DB_.Set.number("TO", 10) + ToolboxManager.DB_.Set.number("BY", 1) + '</block>'
            },
            {
                "kind": "block",
                "type": "controls_whileUntil"
            }

        ]
    }
};