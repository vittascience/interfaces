/**
 * @fileoverview Music blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // CODEY AUDIO - BLOCK PLAY MELODY
    {
        "type": "actuators_audio_play_melody",
        "message0": "%{BKY_SPEAKER_PLAY_MELODY_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MELODY",
            "options": [
                ["hello", "hello"],
                ["hi", "hi"],
                ["bye", "bye"],
                ["yeah", "yeah"],
                ["wow", "wow"],
                ["laugh", "laugh"],
                ["hum", "hum"],
                ["sad", "sad"],
                ["sigh", "sigh"],
                ["annoyed", "annoyed"],
                ["angry", "angry"],
                ["surprised", "surprised"],
                ["scared", "scared"],
                ["yummy", "yummy"],
                ["pettish", "pettish"],
                ["curious", "curious"],
                ["embarrassed", "embarrassed"],
                ["ready", "ready"],
                ["sprint", "sprint"],
                ["snore", "snore"],
                ["meow", "meow"],
                ["start", "start"],
                ["switch", "switch"],
                ["beeps", "beeps"],
                ["buzzing", "buzzing"],
                ["air-out", "air-out"],
                ["explosion", "explosion"],
                ["gotcha", "gotcha"],
                ["painful", "painful"],
                ["jump", "jump"],
                ["laser", "laser"],
                ["level-up", "level-up"],
                ["low-energy", "low-energy"],
                ["metal-clash", "metal-clash"],
                ["prompt-tone", "prompt-tone"],
                ["right", "right"],
                ["wrong", "wrong"],
                ["ringtone", "ringtone"],
                ["score", "score"],
                ["shot", "shot"],
                ["step_1.wav", "step_1"],
                ["step_2", "step_2"],
                ["activate", "activate"],
                ["warning", "warning"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "music_blocks",
        "tooltip": "%{BKY_SPEAKER_PLAY_MELODY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CODEY AUDIO - BLOCK PLAY MELODY UNTIL DONE
    {
        "type": "actuators_audio_play_melody_until_done",
        "message0": "%{BKY_SPEAKER_PLAY_MELODY_UNTIL_DONE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MELODY",
            "options": [
                ["hello", "hello"],
                ["hi", "hi"],
                ["bye", "bye"],
                ["yeah", "yeah"],
                ["wow", "wow"],
                ["laugh", "laugh"],
                ["hum", "hum"],
                ["sad", "sad"],
                ["sigh", "sigh"],
                ["annoyed", "annoyed"],
                ["angry", "angry"],
                ["surprised", "surprised"],
                ["scared", "scared"],
                ["yummy", "yummy"],
                ["pettish", "pettish"],
                ["curious", "curious"],
                ["embarrassed", "embarrassed"],
                ["ready", "ready"],
                ["sprint", "sprint"],
                ["snore", "snore"],
                ["meow", "meow"],
                ["start", "start"],
                ["switch", "switch"],
                ["beeps", "beeps"],
                ["buzzing", "buzzing"],
                ["air-out", "air-out"],
                ["explosion", "explosion"],
                ["gotcha", "gotcha"],
                ["painful", "painful"],
                ["jump", "jump"],
                ["laser", "laser"],
                ["level-up", "level-up"],
                ["low-energy", "low-energy"],
                ["metal-clash", "metal-clash"],
                ["prompt-tone", "prompt-tone"],
                ["right", "right"],
                ["wrong", "wrong"],
                ["ringtone", "ringtone"],
                ["score", "score"],
                ["shot", "shot"],
                ["step_1.wav", "step_1"],
                ["step_2", "step_2"],
                ["activate", "activate"],
                ["warning", "warning"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "music_blocks",
        "tooltip": "%{BKY_SPEAKER_PLAY_MELODY_UNTIL_DONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CODEY AUDIO - BLOCK PLAY NOTE
    {
        "type": "actuators_audio_play_note",
        "message0": "%{BKY_SPEAKER_PLAY_NOTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NOTE",
            "check": ["String", "Number"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_PLAY_NOTE_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "actuators_audio_play_note_init"
        ],
        "mutator": "actuators_audio_play_note_mutator",
    },

    // CODEY AUDIO - BLOCK PLAY TONE
    {
        "type": "actuators_audio_play_tone",
        "message0": "%{BKY_SPEAKER_PLAY_TONE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_PLAY_TONE_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "actuators_audio_play_tone_init"
        ],
        "mutator": "actuators_audio_play_tone_mutator",
    },

    // CODEY AUDIO - BLOCK REST
    {
        "type": "actuators_audio_rest",
        "message0": "%{BKY_SPEAKER_REST_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_REST_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CODEY AUDIO - BLOCK STOP SOUNDS
    {
        "type": "actuators_audio_stop_sounds",
        "message0": "%{BKY_SPEAKER_STOP_SOUNDS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_STOP_SOUNDS_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CODEY AUDIO - BLOCK SET VOLUME
    {
        "type": "actuators_audio_set_volume",
        "message0": "%{BKY_SPEAKER_SET_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_SET_VOLUME_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus"
        ]
    },

    // CODEY AUDIO - BLOCK GET VOLUME
    {
        "type": "actuators_audio_get_volume",
        "message0": "%{BKY_SPEAKER_GET_VOLUME_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SPEAKER_GET_VOLUME_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CODEY AUDIO - BLOCK SET TEMPO
    {
        "type": "actuators_audio_set_tempo",
        "message0": "%{BKY_SPEAKER_SET_TEMPO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEMPO",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SPEAKER_SET_TEMPO_TOOLTIP}",
        "style": "music_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus"
        ]
    },

    // CODEY AUDIO - BLOCK GET TEMPO
    {
        "type": "actuators_audio_get_tempo",
        "message0": "%{BKY_SPEAKER_GET_TEMPO_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SPEAKER_GET_TEMPO_TOOLTIP}",
        "style": "music_blocks",
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
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'SPEAKER_PLAY_TONE_DURATION', 'input', 1, "(s)");

// Initialization extensions
Blockly.Extensions.register('actuators_audio_play_tone_init',
    Blockly.Constants.Actuators.AUDIO_PLAY_TONE_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("actuators_audio_play_tone_mutator",
    Blockly.Constants.Actuators.AUDIO_PLAY_TONE_DURATION_MUTATOR_MIXIN);

/**
* Performs final setup of 'actuators_audio_play_note' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Actuators.AUDIO_PLAY_NOTE_INIT_EXTENSION = function () {
    this.duration_ = false;
    this.update_(this.updateField_);
};

/**
* Mixin for mutator functions in the 'actuators_audio_play_note' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Actuators.AUDIO_PLAY_NOTE_DURATION_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'SPEAKER_PLAY_NOTE_DURATION', 'input', 1, "(s)");

// Initialization extensions
Blockly.Extensions.register('actuators_audio_play_note_init',
    Blockly.Constants.Actuators.AUDIO_PLAY_NOTE_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("actuators_audio_play_note_mutator",
    Blockly.Constants.Actuators.AUDIO_PLAY_NOTE_DURATION_MUTATOR_MIXIN);