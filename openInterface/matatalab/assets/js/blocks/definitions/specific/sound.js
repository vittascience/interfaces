/**
 * @fileoverview Sound blocks for Matatalab.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sound_playNote",
        "message0": "%{BKY_SOUND_PLAY_NOTE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "NOTE",
                "options": [
                    ["C3", "C3"],
                    ["D3", "D3"],
                    ["E3", "E3"],
                    ["F3", "F3"],
                    ["G3", "G3"],
                    ["A3", "A3"],
                    ["B3", "B3"],
                    ["C4", "C4"],
                    ["D4", "D4"],
                    ["E4", "E4"],
                    ["F4", "F4"],
                    ["G4", "G4"],
                    ["A4", "A4"],
                    ["B4", "B4"],
                    ["C5", "C5"]
                ]
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_PLAY_NOTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_playMelody",
        "message0": "%{BKY_SOUND_PLAY_MELODY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_PLAY_MELODY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_playMusic",
        "message0": "%{BKY_SOUND_PLAY_MUSIC_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_PLAY_MUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
