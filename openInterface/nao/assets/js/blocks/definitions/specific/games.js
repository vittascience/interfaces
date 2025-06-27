

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    
    // countries and capitals
    {
        "type": "game_capital_init",
        "message0": "%{BKY_GAME_CAPITAL_INIT_TITLE}",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_CAPITAL_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_capital_play",
        "message0": "%{BKY_GAME_CAPITAL_PLAY_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "country",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_CAPITAL_PLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_capital_get_random_country",
        "message0": "%{BKY_GAME_CAPITAL_GET_RANDOM_COUNTRY_TITLE}",
        "output": "String",
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_CAPITAL_GET_RANDOM_COUNTRY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_capital_get_element_from_country",
        "message0": "%{BKY_GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ELEMENT",
                "options": [
                    [
                        "%{BKY_GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_CAPITAL}",
                        "capital"
                    ],
                    [
                        "%{BKY_GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_HINT}",
                        "hint"
                    ],
                    [
                        "%{BKY_GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_POPOULATION}",
                        "population"
                    ]
                ]
            },
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "country",
            },
        ],
        "output": "String",
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // dynamic story
    // imports
    {
        "type": "game_dynamic_story_init",
        "message0": "%{BKY_GAME_DYNAMIC_STORY_INIT_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STORY",
                "options": [
                    [
                        "%{BKY_GAME_DYNAMIC_STORY_INIT_STORY1}",
                        "story1"
                    ],
                    [
                        "%{BKY_GAME_DYNAMIC_STORY_INIT_STORY2}",
                        "story2"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_DYNAMIC_STORY_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_play_current_scene",
        "message0": "%{BKY_GAME_PLAY_CURRENT_SCENE_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "current_scene",
            }
        ],
        "output": "Array",
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_PLAY_CURRENT_SCENE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]

    },

    // Mental Math
    {
        "type": "game_mental_math_init",
        "message0": "%{BKY_GAME_MENTAL_MATH_INIT_TITLE}",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_MENTAL_MATH_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_mental_math_play",
        "message0": "%{BKY_GAME_MENTAL_MATH_PLAY_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "result",
            },
            {
                "type": "field_dropdown",
                "name": "OPERATION",
                "options": [
                    [
                        "%{BKY_GAME_MENTAL_MATH_PLAY_OPERATION_ADD}",
                        "add"
                    ],
                    [
                        "%{BKY_GAME_MENTAL_MATH_PLAY_OPERATION_SUB}",
                        "sub"
                    ],
                    [
                        "%{BKY_GAME_MENTAL_MATH_PLAY_OPERATION_RANDOM}",
                        "random"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_MENTAL_MATH_PLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "game_mental_math_get_number",
        "message0": "%{BKY_GAME_MENTAL_MATH_GET_NUMBER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NUMBER",
                "check": "Number"
            }
        ],
        "output": "String",
        "style": "game_blocks",
        "tooltip": "%{BKY_GAME_MENTAL_MATH_GET_NUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);