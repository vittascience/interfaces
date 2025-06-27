/**
 * @fileoverview Camera blocks.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    {
        "type": "wio_make_prediction",
        "message0": "%{BKY_WIO_MAKE_PREDICTION_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "cameras_blocks",
        "tooltip": "%{BKY_WIO_MAKE_PREDICTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_data",
        "message0": "%{BKY_WIO_GET_DATA_TITLE}",
        "output": "Array",
        "inputsInline": true,
        "style": "cameras_blocks",
        "tooltip": "%{BKY_WIO_GET_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_data_by_id",
        "message0": "%{BKY_WIO_GET_CLASS_DATA_BY_ID_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "cameras_blocks",
        "tooltip": "%{BKY_WIO_GET_CLASS_DATA_BY_ID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_class_max_id",
        "message0": "%{BKY_WIO_GET_CLASS_MAX_ID_TITLE}",
        "output": "Number",
        "inputsInline": true,
        "style": "cameras_blocks",
        "tooltip": "%{BKY_WIO_GET_CLASS_MAX_ID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "wio_get_status",
        "message0": "%{BKY_WIO_GET_STATUS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_WIO_GET_STATUS}", "status"],
                ["%{BKY_WIO_GET_VERSION}", "version"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "cameras_blocks",
        "tooltip": "%{BKY_WIO_GET_STATUS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);  // END JSON EXTRACT (Do not delete this comment.)