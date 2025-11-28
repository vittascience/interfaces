/**
 * @fileoverview Communication blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK IR RECEIVE
    {
        "type": "communication_irReceive",
        "message0": "%{BKY_COMMUNICATION_IRRECEIVE_TITLE}",
        "output": "String",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRRECEIVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IR RECEIVE REMOTE CODE
    {
        "type": "communication_irReceiveRemoteCode",
        "message0": "%{BKY_COMMUNICATION_IRRECEIVEREMOTECODE_TITLE}",
        "output": "Array",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IR SEND
    {
        "type": "communication_irSend",
        "message0": "%{BKY_COMMUNICATION_IRSEND_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRSEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IR START LEARNING
    {
        "type": "communication_irStartLearning",
        "message0": "%{BKY_COMMUNICATION_IRSTARTLEARNING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRSTARTLEARNING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IR STOP LEARNING
    {
        "type": "communication_irStopLearning",
        "message0": "%{BKY_COMMUNICATION_IRSTOPLEARNING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRSTOPLEARNING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IR SAVE LEARNED RESULT
    {
        "type": "communication_irSaveLearnedResult",
        "message0": "%{BKY_COMMUNICATION_IRSAVELEARNEDRESULT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "INDEX"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SEND LEARNED RESULT
    {
        "type": "communication_irSendLearnedResult",
        "message0": "%{BKY_COMMUNICATION_IRSENDLEARNEDRESULT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "INDEX"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK LEARN
    {
        "type": "communication_irLearn",
        "message0": "%{BKY_COMMUNICATION_IRLEARN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IRLEARN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)