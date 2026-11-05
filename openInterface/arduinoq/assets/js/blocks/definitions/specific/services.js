/**
 * @fileoverview Python blocks of the Linux part of the Arduino UNO Q: sound, web (HTTP, weather) and data logging.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // SOUND
    {
        "type": "py_sound_say_computer",
        "message0": "%{BKY_PY_SOUND_SAY_COMPUTER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_SAY_COMPUTER_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_say_board",
        "message0": "%{BKY_PY_SOUND_SAY_BOARD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            // Piper voices (huggingface.co/rhasspy/piper-voices): the smallest of each language, the fastest on the board
            "type": "field_dropdown",
            "name": "VOICE",
            "options": [
                ["français", "fr_FR-siwis-low"],
                ["English", "en_US-lessac-low"],
                ["Deutsch", "de_DE-thorsten-low"],
                ["español", "es_ES-carlfm-x_low"],
                ["italiano", "it_IT-riccardo-x_low"],
                ["русский", "ru_RU-irina-medium"],
                ["svenska", "sv_SE-nst-medium"],
                ["العربية", "ar_JO-kareem-low"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_SAY_BOARD_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_listen_board",
        "message0": "%{BKY_PY_SOUND_LISTEN_BOARD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }, {
            // Small Vosk models (alphacephei.com/vosk/models, about 40 MB): the larger Arabic and Swedish ones are left out
            "type": "field_dropdown",
            "name": "LANGUAGE",
            "options": [
                ["français", "vosk-model-small-fr-0.22"],
                ["English", "vosk-model-small-en-us-0.15"],
                ["Deutsch", "vosk-model-small-de-0.15"],
                ["español", "vosk-model-small-es-0.42"],
                ["italiano", "vosk-model-small-it-0.22"],
                ["русский", "vosk-model-small-ru-0.22"]
            ]
        }],
        "inputsInline": true,
        "output": "String",
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_LISTEN_BOARD_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_frequency_computer",
        "message0": "%{BKY_PY_SOUND_FREQUENCY_COMPUTER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_FREQUENCY_COMPUTER_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_note_board",
        "message0": "%{BKY_PY_SOUND_NOTE_BOARD_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "NOTE",
            "options": [
                ["%{BKY_PY_SOUND_NOTE_DO}", "C"],
                ["%{BKY_PY_SOUND_NOTE_DO_SHARP}", "C#"],
                ["%{BKY_PY_SOUND_NOTE_RE}", "D"],
                ["%{BKY_PY_SOUND_NOTE_MI_FLAT}", "Eb"],
                ["%{BKY_PY_SOUND_NOTE_MI}", "E"],
                ["%{BKY_PY_SOUND_NOTE_FA}", "F"],
                ["%{BKY_PY_SOUND_NOTE_FA_SHARP}", "F#"],
                ["%{BKY_PY_SOUND_NOTE_SOL}", "G"],
                ["%{BKY_PY_SOUND_NOTE_SOL_SHARP}", "G#"],
                ["%{BKY_PY_SOUND_NOTE_LA}", "A"],
                ["%{BKY_PY_SOUND_NOTE_SI_FLAT}", "Bb"],
                ["%{BKY_PY_SOUND_NOTE_SI}", "B"],
                ["%{BKY_PY_SOUND_NOTE_REST}", "REST"]
            ]
        }, {
            "type": "input_value",
            "name": "OCTAVE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_NOTE_BOARD_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_abc_board",
        "message0": "%{BKY_PY_SOUND_ABC_BOARD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ABC",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_ABC_BOARD_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_sound_chord_board",
        "message0": "%{BKY_PY_SOUND_CHORD_BOARD_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NOTES",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_CHORD_BOARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "py_sound_volume_board",
        "message0": "%{BKY_PY_SOUND_VOLUME_BOARD_TITLE}",
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
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_VOLUME_BOARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "py_sound_waveform_board",
        "message0": "%{BKY_PY_SOUND_WAVEFORM_BOARD_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "WAVE",
                "options": [
                    [
                        "%{BKY_PY_SOUND_WAVE_SINE}",
                        "sine"
                    ],
                    [
                        "%{BKY_PY_SOUND_WAVE_SQUARE}",
                        "square"
                    ],
                    [
                        "%{BKY_PY_SOUND_WAVE_TRIANGLE}",
                        "triangle"
                    ],
                    [
                        "%{BKY_PY_SOUND_WAVE_SAWTOOTH}",
                        "sawtooth"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_WAVEFORM_BOARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "py_sound_effect_board",
        "message0": "%{BKY_PY_SOUND_EFFECT_BOARD_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EFFECT",
                "options": [
                    [
                        "%{BKY_PY_SOUND_EFFECT_NONE}",
                        "none"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_ADSR}",
                        "adsr"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_TREMOLO}",
                        "tremolo"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_VIBRATO}",
                        "vibrato"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_CHORUS}",
                        "chorus"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_OVERDRIVE}",
                        "overdrive"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_BITCRUSHER}",
                        "bitcrusher"
                    ],
                    [
                        "%{BKY_PY_SOUND_EFFECT_OCTAVER}",
                        "octaver"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_sound_blocks",
        "tooltip": "%{BKY_PY_SOUND_EFFECT_BOARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // HTTP
    {
        "type": "py_http_get_text",
        "message0": "%{BKY_PY_HTTP_GET_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "URL",
            "check": "String"
        }],
        "output": "String",
        "inputsInline": true,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_HTTP_GET_TEXT_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_http_get_json",
        "message0": "%{BKY_PY_HTTP_GET_JSON_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "URL",
            "check": "String"
        }],
        "output": null,
        "inputsInline": true,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_HTTP_GET_JSON_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_http_post_json",
        "message0": "%{BKY_PY_HTTP_POST_JSON_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }, {
            "type": "input_value",
            "name": "URL",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_HTTP_POST_JSON_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_weather_get",
        "message0": "%{BKY_PY_WEATHER_GET_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MEASURE",
            "options": [
                ["%{BKY_PY_WEATHER_TEMPERATURE}", "temperature_2m"],
                ["%{BKY_PY_WEATHER_HUMIDITY}", "relative_humidity_2m"],
                ["%{BKY_PY_WEATHER_WIND}", "wind_speed_10m"],
                ["%{BKY_PY_WEATHER_PRECIPITATION}", "precipitation"],
                ["%{BKY_PY_WEATHER_CLOUDS}", "cloud_cover"]
            ]
        }, {
            "type": "input_value",
            "name": "CITY",
            "check": "String"
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_WEATHER_GET_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_weather_forecast_is",
        "message0": "%{BKY_PY_WEATHER_FORECAST_IS_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "WEATHER",
                "options": [
                    [
                        "%{BKY_PY_WEATHER_SUNNY}",
                        "sunny"
                    ],
                    [
                        "%{BKY_PY_WEATHER_CLOUDY}",
                        "cloudy"
                    ],
                    [
                        "%{BKY_PY_WEATHER_RAINY}",
                        "rainy"
                    ],
                    [
                        "%{BKY_PY_WEATHER_SNOWY}",
                        "snowy"
                    ],
                    [
                        "%{BKY_PY_WEATHER_FOGGY}",
                        "foggy"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "CITY",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "DAYS",
                "check": "Number"
            }
        ],
        "output": "Boolean",
        "inputsInline": true,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_WEATHER_FORECAST_IS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "py_weather_forecast_temperature",
        "message0": "%{BKY_PY_WEATHER_FORECAST_TEMPERATURE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MEASURE",
                "options": [
                    [
                        "%{BKY_PY_WEATHER_TEMPERATURE_MAX}",
                        "temperature_2m_max"
                    ],
                    [
                        "%{BKY_PY_WEATHER_TEMPERATURE_MIN}",
                        "temperature_2m_min"
                    ],
                    [
                        "%{BKY_PY_WEATHER_PRECIPITATION_SUM}",
                        "precipitation_sum"
                    ],
                    [
                        "%{BKY_PY_WEATHER_WIND_MAX}",
                        "wind_speed_10m_max"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "CITY",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "DAYS",
                "check": "Number"
            }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "py_http_blocks",
        "tooltip": "%{BKY_PY_WEATHER_FORECAST_TEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // DATA LOGGING
    {
        "type": "py_datalog_set_columns",
        "message0": "%{BKY_PY_DATALOG_SET_COLUMNS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FILE",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "COLUMNS"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_datalog_blocks",
        "tooltip": "%{BKY_PY_DATALOG_SET_COLUMNS_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_datalog_add_line",
        "message0": "%{BKY_PY_DATALOG_ADD_LINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FILE",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "VALUES"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_datalog_blocks",
        "tooltip": "%{BKY_PY_DATALOG_ADD_LINE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "py_datalog_clear",
        "message0": "%{BKY_PY_DATALOG_CLEAR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FILE",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_datalog_blocks",
        "tooltip": "%{BKY_PY_DATALOG_CLEAR_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
