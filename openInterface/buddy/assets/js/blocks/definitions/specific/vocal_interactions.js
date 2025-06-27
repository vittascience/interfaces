/**
 * @fileoverview Vocal interactions blocks for Buddy.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
{
    "type": "vi_startSpeaking",
    "message0": "%{BKY_VI_START_SPEAKING_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "TEXT",
        "text": null,
        "check" : "String"
    },
    {
        "type": "field_grid_dropdown",
        "name": "EXPRESSION",
        "options": [
            ["%{BKY_VI_START_SPEAKING_SPEAK_ANGRY}", "SPEAK_ANGRY"],
            ["%{BKY_VI_START_SPEAKING_NO_FACE}", "NO_FACE"],
            ["%{BKY_VI_START_SPEAKING_SPEAK_HAPPY}", "SPEAK_HAPPY"],
            ["%{BKY_VI_START_SPEAKING_NEUTRAL}", "NEUTRAL"]
        ]
    },
    {
        "type": "field_grid_dropdown",
        "name": "LOCK",
        "options": [
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "True"],
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "False"],
        ]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_START_SPEAKING_TOOLTIP}",
    "extensions" : [
        "block_init_helpurl",
        "lock_tooltip"
    ]
},
{
    "type": "vi_stopSpeaking",
    "message0": "%{BKY_VI_STOP_SPEAKING_TITLE}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_STOP_SPEAKING_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_isSpeaking",
    "message0": "%{BKY_VI_IS_SPEAKING_TITLE}",
    "output": "Boolean",
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_IS_SPEAKING_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
}, 
{
    "type": "vi_setSpeakerVoice",
    "message0": "%{BKY_VI_SET_SPEAKER_VOICE_TITLE}",
    "args0": [{
        "type": "field_grid_dropdown",
        "name": "VOICE",
        "options": [
            ["%{BKY_VI_SET_SPEAKER_VOICE_ROXANE}", "roxane"],
            ["%{BKY_VI_SET_SPEAKER_VOICE_KATE}", "kate"]
        ]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_SET_SPEAKER_VOICE_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_setSpeakerVolume",
    "message0": "%{BKY_VI_SET_SPEAKER_VOLUME_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "VOLUME",
        "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_SET_SPEAKER_VOLUME_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_getSpeakerVolume",
    "message0": "%{BKY_VI_GET_SPEAKER_VOLUME_TITLE}",
    "output": "Number",
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_GET_SPEAKER_VOLUME_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_setSpeakerSpeed",
    "message0": "%{BKY_VI_SET_SPEAKER_SPEED_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "SPEED",
        "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_SET_SPEAKER_SPEED_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_getSpeakerSpeed",
    "message0": "%{BKY_VI_GET_SPEAKER_SPEED_TITLE}",
    "output": "Number",
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_GET_SPEAKER_SPEED_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
}, 
{
    "type": "vi_setSpeakerPitch",
    "message0": "%{BKY_VI_SET_SPEAKER_PITCH_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "PITCH",
        "check": "Number"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_SET_SPEAKER_PITCH_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vi_getSpeakerPitch",
    "message0": "%{BKY_VI_GET_SPEAKER_PITCH_TITLE}",
    "output": "Number",
    "style": "vi_blocks",
    "tooltip": "%{BKY_VI_GET_SPEAKER_PITCH_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
}, 
]); // END JSON EXTRACT (Do not delete this comment.)