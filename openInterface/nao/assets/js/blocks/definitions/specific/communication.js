/**
 * @fileoverview Communication blocks for Nao.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "communication_animatedSpeech_say",
        "message0": "%{BKY_COMMUNICATION_ANIMATED_SPEECH_SAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ANIMATED_SPEECH_SAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_textToSpeech_say",
        "message0": "%{BKY_COMMUNICATION_TEXT_TO_SPEECH_SAY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_TEXT_TO_SPEECH_SAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // ASR
    {
        "type": "communication_asr_setLanguage",
        "message0": "%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "LANGUAGE",
            "options": [
                ["%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_OPTION_FRENCH}", "French"],
                ["%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ENGLISH}", "English"],
                ["%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_OPTION_SPANISH}", "Spanish"],
                ["%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_OPTION_GERMAN}", "German"],
                ["%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ITALIAN}", "Italian"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ASR_SET_LANGUAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_asr_setVocabulary",
        "message0": "%{BKY_COMMUNICATION_ASR_SET_VOCABULARY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOCABULARY"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ASR_SET_VOCABULARY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_asr_startRecognition",
        "message0": "%{BKY_COMMUNICATION_ASR_START_RECOGNITION_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ASR_START_RECOGNITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]

    },
    {
        "type": "communication_asr_stopRecognition",
        "message0": "%{BKY_COMMUNICATION_ASR_STOP_RECOGNITION_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ASR_STOP_RECOGNITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_asr_getLastWord_callback_decorated",
        "message0": "%{BKY_COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "word"
        }],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        // "inputsInline": true,
        // "previousStatement": null,
        // "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]

    }
    
]); // END JSON EXTRACT (Do not delete this comment.)
