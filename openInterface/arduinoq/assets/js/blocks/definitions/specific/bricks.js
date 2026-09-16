/**
 * @fileoverview Bricks blocks for Arduino Q.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "bricks_app_run",
        "message0": "%{BKY_BRICKS_APP_RUN_TITLE}",
        "previousStatement": null,
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_APP_RUN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "bricks_app_run_init"
        ],
        "mutator": "bricks_app_run_mutator"
    },
    {
        "type": "bricks_webui_send_message",
        "message0": "%{BKY_BRICKS_WEBUI_SEND_MESSAGE_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "ID",
            "text": "request_id"
        }, {
            "type": "input_value",
            "name": "MESSAGE",
            "check": "String"
        }],
        "nextStatement": null,
        "previousStatement": null,
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "bricks_webui_on_message",
        "message0": "%{BKY_BRICKS_WEBUI_ON_MESSAGE_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "ID",
            "text": "request_id"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "style": "bricks_blocks",
        "tooltip": "%{BKY_BRICKS_WEBUI_ON_MESSAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]);

Blockly.Constants.Bricks = Object.create(null);

/**
 * Performs final setup of 'bricks_app_run' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Extensions.register("bricks_app_run_init",
    Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'bricks_app_run' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('user_loop', 'BRICKS_WEBUI_APP_RUN_USER_LOOP', 'input');

Blockly.Extensions.registerMutator('bricks_app_run_mutator',
    Blockly.Constants.Bricks.BRICKS_WEBUI_APP_RUN_MUTATOR_MIXIN);

