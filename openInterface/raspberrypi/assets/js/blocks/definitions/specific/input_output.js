/**
 * @fileoverview Input/Output blocks for Raspberry pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin Time blocks*/

    // BLOCK DATETIME YMD_HMS
    {
        "type": "io_datetime_ymd_hms",
        "message0": "%{BKY_IO_DATETIME_YMD_HMS_TITLE}",
        "output": "String",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_DATETIME_YMD_HMS_TOOLTIP}",
    },

    /** Begin Sense HAT joystick blocks */

    {
        "type": "sensehat_wait_for_event",
        "message0": "%{BKY_SENSE_HAT_WAIT_FOR_EVENT_TITLE}",
        'previousStatement': null,
        'nextStatement': null,
        "tooltip": "%{BKY_SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },
    {
        "type": "sensehat_get_event_action_direction",
        "message0": "%{BKY_SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'EVENT_TYPE',
            'options': [
                ['%{BKY_SENSE_HAT_GET_EVENT_DIRECTION}', 'direction'],
                ['%{BKY_SENSE_HAT_GET_EVENT_ACTION}', 'action'],
            ]
        }],
        "output": "String",
        "tooltip": "%{BKY_SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },
    {
        'type': 'sensehat_get_event_joystick',
        'message0': '%{BKY_SENSE_HAT_GET_EVENT_JOYSTICK_TITLE}',
        'previousStatement': null,
        'nextStatement': null,
        'tooltip': '%{BKY_SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP}',
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    }

]); // END JSON EXTRACT (Do not delete this comment.)