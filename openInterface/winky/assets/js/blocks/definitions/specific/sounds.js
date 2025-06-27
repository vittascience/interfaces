
/**
 * @fileoverview Sounds blocks for Winky.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sounds_setVolume",
        "message0": "%{BKY_SOUNDS_SET_VOLUME_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VOLUME",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sounds_blocks",
        "tooltip": "%{BKY_SOUNDS_SET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sounds_playSound",
        "message0": "%{BKY_SOUNDS_PLAY_SOUND_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SOUND",
                "options": [
                    ['%{BKY_SOUNDS_PLAY_SOUND_AMUSED}', 'Amused01'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_ANGRY}', 'Angry03,Angry04,Angry05'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_BORED}', 'Bored06,Bored07,Bored09'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_SAD}', 'Sad02,Sad08,Sad09'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_HAPPY}', 'Happy01,Happy03,Happy04'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_TIRED}', 'Tired01'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_SLEEP}', 'Sleep01,Sleep02'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_INLOVE}', 'Inlove01,Inlove03'],
                    ['%{BKY_SOUNDS_PLAY_SOUND_QUESTION}', 'Question01,Question02'],
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sounds_blocks",
        "tooltip": "%{BKY_SOUNDS_PLAY_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);