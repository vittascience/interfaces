/**
 * @fileoverview Actuators blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // CYBERPI AUDIO - PLAY
    {
        "type": "actuators_audio_play",
        "message0": "%{BKY_ACTUATORS_AUDIO_PLAY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SOUND",
            "options": [
                ["%{BKY_ACTUATORS_AUDIO_PLAY_HI}", "hi"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_BYE}", "bye"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_YEAH}", "yeah"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_WOW}", "wow"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_LAUGH}", "laugh"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_HUM}", "hum"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_SAD}", "sad"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_SIGH}", "sigh"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_ANNOYED}", "annoyed"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_ANGRY}", "angry"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_SURPRISED}", "surprised"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_YUMMY}", "yummy"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_CURIOUS}", "curious"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_EMBARRASSED}", "embarrassed"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_READY}", "ready"],
                ["%{BKY_ACTUATORS_AUDIO_PLAY_SPRINT}", "sprint"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_PLAY_TOOLTIP}",
    },

    // CYBERPI AUDIO - PLAY FREQUENCY
    {
        "type": "actuators_audio_play_tone",
        "message0": "%{BKY_ACTUATORS_AUDIO_PLAY_TONE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_AUDIO_PLAY_TONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "block_buttons_plus_minus",
            "actuators_audio_play_tone_init"
        ],
        "mutator": "actuators_audio_play_tone_mutator",
    },

    // CYBERPI AUDIO - PLAY NOTE
    {
        "type": "actuators_audio_play_note",
        "message0": "%{BKY_ACTUATORS_AUDIO_PLAY_NOTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NOTE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_PLAY_NOTE_TOOLTIP}",
    },

    // CYBERPI AUDIO - PLAY DRUM
    {
        "type": "actuators_audio_play_drum",
        "message0": "%{BKY_ACTUATORS_AUDIO_PLAY_DRUM_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SONG",
            "options": [
                ["%{BKY_ACTUATORS_AUDIO_DRUM_SNARE}", "snare"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_BASS_DRUM}", "bass-drum"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_SIDE_STICK}", "side-stick"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_CRASH_SYMBAL}", "crash-cymbal"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_OPEN_HI_HAT}", "open-hi-hat"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_CLOSED_HI_HAT}", "closed-hi-hat"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_TAMOURINE}", "tamourine"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_HAND_CLAP}", "hand-clap"],
                ["%{BKY_ACTUATORS_AUDIO_DRUM_CLAVES}", "claves"]
            ]
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_PLAY_DRUM_TOOLTIP}",
    },

    // CYBERPI AUDIO - START RECORDING
    {
        "type": "actuators_audio_start_recording",
        "message0": "%{BKY_ACTUATORS_AUDIO_START_RECORDING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_START_RECORDING_TOOLTIP}",
    },

    // CYBERPI AUDIO - STOP RECORDING
    {
        "type": "actuators_audio_stop_recording",
        "message0": "%{BKY_ACTUATORS_AUDIO_STOP_RECORDING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_STOP_RECORDING_TOOLTIP}",
    },

    // CYBERPI AUDIO - PLAY RECORDING
    {
        "type": "actuators_audio_play_recording",
        "message0": "%{BKY_ACTUATORS_AUDIO_PLAY_RECORDING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_PLAY_RECORDING_TOOLTIP}",
    },

    // CYBERPI AUDIO - ADD TEMPO
    {
        "type": "actuators_audio_add_tempo",
        "message0": "%{BKY_ACTUATORS_AUDIO_ADD_TEMPO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEMPO",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_ADD_TEMPO_TOOLTIP}",
    },

    // CYBERPI AUDIO - SET TEMPO
    {
        "type": "actuators_audio_set_tempo",
        "message0": "%{BKY_ACTUATORS_AUDIO_SET_TEMPO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEMPO",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_SET_TEMPO_TOOLTIP}",
    },

    // CYBERPI AUDIO _ GET TEMPO
    {
        "type": "actuators_audio_get_tempo",
        "message0": "%{BKY_ACTUATORS_AUDIO_GET_TEMPO_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_GET_TEMPO_TOOLTIP}",
    },

    // CYBERPI AUDIO - ADD VOLUME
    {
        "type": "actuators_audio_add_volume",
        "message0": "%{BKY_ACTUATORS_AUDIO_ADD_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_ADD_VOLUME_TOOLTIP}",
    },

    // CYBERPI AUDIO - SET VOLUME
    {
        "type": "actuators_audio_set_volume",
        "message0": "%{BKY_ACTUATORS_AUDIO_SET_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_ADD_VOLUME_TOOLTIP}",
    },

    // CYBERPI AUDIO _ GET VOLUME
    {
        "type": "actuators_audio_get_volume",
        "message0": "%{BKY_ACTUATORS_AUDIO_GET_VOLUME_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_GET_VOLUME_TOOLTIP}",
    },

    // CYBERPI AUDIO - STOP
    {
        "type": "actuators_audio_stop",
        "message0": "%{BKY_ACTUATORS_AUDIO_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_AUDIO_STOP_TOOLTIP}",
    },

    /* Begin motors M1 & M2 */

    // CYBERPI MOTORS - SET POWER
    {
        "type": "mbot2_motors_set_power",
        "message0": "%{BKY_MBOT2_MOTORS_SET_POWER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["M1", "M1"],
                ["M2", "M2"],
                ["M1 & M2", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_MOTORS_SET_POWER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI MOTORS - ADD POWER
    {
        "type": "mbot2_motors_add_power",
        "message0": "%{BKY_MBOT2_MOTORS_ADD_POWER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["M1", "M1"],
                ["M2", "M2"],
                ["M1 & M2", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_MOTORS_ADD_POWER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI MOTORS - GET POWER
    {
        "type": "mbot2_motors_get_power",
        "message0": "%{BKY_MBOT2_MOTORS_GET_POWER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["M1", "M1"],
                ["M2", "M2"],
                ["M1 & M2", "all"]
            ]
        }],
        "output": "Number",
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_MOTORS_GET_POWER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI MOTORS - STOP
    {
        "type": "mbot2_motors_stop",
        "message0": "%{BKY_MBOT2_MOTORS_STOP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["M1 & M2", "all"],
                ["M1", "M1"],
                ["M2", "M2"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_MOTORS_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin servos blocks */

    // CYBERPI SERVOS - SET ANGLE
    {
        "type": "mbot2_servos_set_angle",
        "message0": "%{BKY_MBOT2_SERVOS_SET_ANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["S1", "S1"],
                ["S2", "S2"],
                ["S3", "S3"],
                ["S4", "S4"],
                ["S1 à S4", "all"],
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_SERVOS_SET_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI SERVOS - ADD ANGLE
    {
        "type": "mbot2_servos_add_angle",
        "message0": "%{BKY_MBOT2_SERVOS_ADD_ANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["S1", "S1"],
                ["S2", "S2"],
                ["S3", "S3"],
                ["S4", "S4"],
                ["S1 à S4", "all"],
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_SERVOS_ADD_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI SERVOS - GET ANGLE
    {
        "type": "mbot2_servos_get_angle",
        "message0": "%{BKY_MBOT2_SERVOS_GET_ANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["S1", "S1"],
                ["S2", "S2"],
                ["S3", "S3"],
                ["S4", "S4"],
                ["S1 à S4", "all"],
            ]
        }],
        "output": "Number",
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_SERVOS_GET_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CYBERPI SERVOS - RESET
    {
        "type": "mbot2_servos_reset",
        "message0": "%{BKY_MBOT2_SERVOS_RESET_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["S1", "S1"],
                ["S2", "S2"],
                ["S3", "S3"],
                ["S4", "S4"],
                ["S1 à S4", "all"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_MBOT2_SERVOS_RESET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Actuators = Object.create(null);

/**
 * Performs final setup of 'actuators_audio_play_tone' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Actuators.AUDIO_PLAY_TONE_INIT_EXTENSION = function () {
    this.duration_ = false;
    this.update_(this.updateField_);
};

/**
* Mixin for mutator functions in the 'actuators_audio_play_tone' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Actuators.AUDIO_PLAY_TONE_DURATION_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'ACTUATORS_AUDIO_PLAY_TONE_DURATION', 'input', 1, "(s)");

// Initialization extensions
Blockly.Extensions.register('actuators_audio_play_tone_init',
    Blockly.Constants.Actuators.AUDIO_PLAY_TONE_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("actuators_audio_play_tone_mutator",
    Blockly.Constants.Actuators.AUDIO_PLAY_TONE_DURATION_MUTATOR_MIXIN);