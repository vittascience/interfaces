const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "basic",
        "name": "%{BKY_CATEGORY_BASIC}",
        "style": "basic_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cube"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "cpp",
        "name": "Arduino",
        "style": "cpp_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "python",
        "name": "Python",
        "style": "python_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-python"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "html",
        "name": "HTML",
        "style": "html_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-code"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "style",
        "name": "Style",
        "name": "%{BKY_CATEGORY_STYLE}",
        "style": "style_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-sheet-plastic"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "javascript",
        "name": "Javascript",
        "style": "javascript_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-js"
        },
        "contents": []
    }
];


const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "basic": [
        {
            'kind': 'category',
            'toolboxitemid': 'logic',
            'name': '%{BKY_CATEGORY_LOGIC}',
            'style': 'logic_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-code-branch'
            },
            'contents': []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'loops',
            'name': '%{BKY_CATEGORY_LOOPS}',
            'style': 'loops_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-redo-alt'
            },
            'contents': []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'time',
            'name': '%{BKY_CATEGORY_TIME}',
            'style': 'time_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-clock'
            },
            'contents': []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'math',
            'name': '%{BKY_CATEGORY_MATH}',
            'style': 'math_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-calculator'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "math_calculations",
                    "name": "%{BKY_TOOLBOX_LABEL_CALCULATIONS}",
                    "style": "math_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-calculator"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "math_rounding",
                    "name": "%{BKY_SUBCATEGORY_SHORT_ROUNDING}",
                    "style": "math_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-ruler-horizontal"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "math_random",
                    "name": "%{BKY_TOOLBOX_LABEL_RANDOM}",
                    "style": "math_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-dice"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'text',
            'name': '%{BKY_CATEGORY_TEXT}',
            'style': 'text_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-font'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "text_create",
                    "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
                    "style": "text_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-pen"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "text_search",
                    "name": "%{BKY_TOOLBOX_LABEL_SEARCH}",
                    "style": "text_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-magnifying-glass"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "text_transform",
                    "name": "%{BKY_TOOLBOX_LABEL_TRANSFORM}",
                    "style": "text_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-wand-magic-sparkles"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'variables',
            'name': '%{BKY_CATEGORY_VARIABLES}',
            'custom': 'VARIABLE',
            'style': 'variable_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-cog'
            }
        },
        {
            'kind': 'category',
            'toolboxitemid': 'lists',
            'name': '%{BKY_CATEGORY_LISTS}',
            'style': 'lists_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-list'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "lists_create",
                    "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
                    "style": "lists_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-plus"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "lists_read",
                    "name": "%{BKY_TOOLBOX_LABEL_READ}",
                    "style": "lists_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-eye"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "lists_modify",
                    "name": "%{BKY_TOOLBOX_LABEL_MODIFY}",
                    "style": "lists_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-pen-to-square"
                    },
                    "contents": []
                }
            ]
        },
    ],
    "cpp": [
        {
            'kind': 'category',
            'toolboxitemid': 'cpp_display',
            'name': '%{BKY_CATEGORY_DISPLAY}',
            'style': 'cpp_display_category',
            'cssConfig': {
                'icon': 'icon_blockly svgIcon'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "cpp_display_arduino",
                    "name": "Arduino",
                    "style": "cpp_display_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "cpp_display_screens",
                    "name": "%{BKY_SUBCATEGORY_SCREENS}",
                    "style": "cpp_display_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-display"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "cpp_display_leds",
                    "name": "%{BKY_SUBCATEGORY_LED}",
                    "style": "cpp_display_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'io',
            'name': '%{BKY_CATEGORY_IO}',
            'style': 'io_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-exchange-alt'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "io_inputs",
                    "name": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
                    "style": "io_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-toggle-on"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "io_mp3",
                    "name": "MP3",
                    "style": "io_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-music"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "io_pins",
                    "name": "%{BKY_SUBCATEGORY_PINS}",
                    "style": "io_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'communication',
            'name': '%{BKY_CATEGORY_COMMUNICATION}',
            'style': 'communication_category',
            'cssConfig': {
                'icon': 'icon_blockly far fa-comment-dots'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "communication_serial",
                    "name": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-terminal"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "communication_datalog",
                    "name": "%{BKY_SUBCATEGORY_SHORT_DATA_LOGGING}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-sd-card"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "communication_bluetooth",
                    "name": "%{BKY_SUBCATEGORY_SHORT_BLUETOOTH}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly fab fa-bluetooth-b"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "communication_wireless",
                    "name": "%{BKY_SUBCATEGORY_SHORT_WIRELESS}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-tower-broadcast"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "communication_ir",
                    "name": "%{BKY_SUBCATEGORY_SHORT_INFRARED}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "communication_tracking",
                    "name": "%{BKY_SUBCATEGORY_SHORT_TRACKING}",
                    "style": "communication_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-location-dot"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'sensors',
            'name': '%{BKY_CATEGORY_SENSORS}',
            'style': 'sensors_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-plug'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_gas",
                    "name": "%{BKY_SUBCATEGORY_SHORT_GAS}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-smog"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_climate",
                    "name": "%{BKY_SUBCATEGORY_SHORT_WEATHER}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-temperature-half"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_soundlight",
                    "name": "%{BKY_SUBCATEGORY_SHORT_SOUND_LIGHT}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_distance",
                    "name": "%{BKY_SUBCATEGORY_SHORT_DISTANCE_MOVEMENT}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-ruler"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_health",
                    "name": "%{BKY_SUBCATEGORY_SHORT_HEALTH}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-heart-pulse"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "sensors_other",
                    "name": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
                    "style": "sensors_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-ellipsis"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'actuators',
            'name': '%{BKY_CATEGORY_ACTUATORS}',
            'style': 'actuators_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-fan'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "actuators_motors",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MOTORS}",
                    "style": "actuators_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-gears"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "actuators_music",
                    "name": "%{BKY_SUBCATEGORY_MUSIC}",
                    "style": "actuators_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-music"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "actuators_other",
                    "name": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
                    "style": "actuators_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-ellipsis"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'modulino',
            'name': 'Modulino',
            'style': 'modulino_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-puzzle-piece'
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_buttons",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_BUTTONS}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-circle-dot"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_buzzer",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_BUZZER}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-bell"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_pixels",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_PIXELS}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_knob",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_KNOB}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-sliders"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_distance",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_DISTANCE}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-ruler"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_movement",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_MOVEMENT}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-arrows-up-down-left-right"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "modulino_thermo",
                    "name": "%{BKY_SUBCATEGORY_SHORT_MODULINO_THERMO}",
                    "style": "modulino_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-temperature-half"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'robots',
            'name': '%{BKY_CATEGORY_ROBOTS}',
            'style': 'robots_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-robot'
            },
            'contents': [],
            "onlyBoards": "uno"
        },
        {
            "kind": "category",
            "toolboxitemid": "ia",
            "name": "%{BKY_CATEGORY_IA_CAMERAS}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-brain"
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "ia_huskylens",
                    "name": "%{BKY_SUBCATEGORY_HUSKYLENS}",
                    "style": "ia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-camera"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "ia_wio",
                    "name": "Wio Lite AI",
                    "style": "ia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-eye"
                    },
                    "contents": []
                }
            ]
        },
        {
            "kind": "category",
            "toolboxitemid": "cpp_bridges",
            "name": "%{BKY_CATEGORY_BRIDGES}",
            "style": "bridges_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bridge"
            },
            "contents": []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'cpp_procedures',
            'name': '%{BKY_CATEGORY_PROCEDURES}',
            'custom': 'PROCEDURE_CPP',
            'style': 'cpp_category',
            'cssConfig': {
                'icon': 'icon_blockly svgIcon'
            },
            "contents": []
        }
    ],
    "python": [
        {
            "kind": "category",
            "toolboxitemid": "py_display",
            "name": "%{BKY_CATEGORY_DISPLAY}",
            "style": "py_display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-desktop"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "graph",
            "name": "%{BKY_CATEGORY_GRAPHICS}",
            "style": "graph_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-chart-line"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "numpy",
            "name": "%{BKY_CATEGORY_NUMPY}",
            "style": "numpy_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-table"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "vittaia",
            "name": "%{BKY_CATEGORY_VITTAIA}",
            "style": "vittaia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-brain"
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "vittaia_image",
                    "name": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
                    "style": "vittaia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-image"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "vittaia_posture",
                    "name": "%{BKY_SUBCATEGORY_VITTAIA_POSTURE}",
                    "style": "vittaia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-person"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "vittaia_hand",
                    "name": "%{BKY_SUBCATEGORY_VITTAIA_HAND}",
                    "style": "vittaia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-hand"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "vittaia_sound",
                    "name": "%{BKY_SUBCATEGORY_VITTAIA_SOUND}",
                    "style": "vittaia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-microphone"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "vittaia_sensor",
                    "name": "%{BKY_SUBCATEGORY_SENSOR_DATA}",
                    "style": "vittaia_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-chart-line"
                    },
                    "contents": []
                }
            ]
        },
        {
            "kind": "category",
            "toolboxitemid": "py_sound",
            "name": "%{BKY_SUBCATEGORY_SOUND}",
            "style": "py_sound_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-volume-high"
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "py_sound_computer",
                    "name": "%{BKY_TOOLBOX_LABEL_COMPUTER}",
                    "style": "py_sound_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-laptop"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "py_sound_board",
                    "name": "%{BKY_TOOLBOX_LABEL_BOARD}",
                    "style": "py_sound_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-volume"
                    },
                    "contents": []
                }
            ]
        },
        {
            "kind": "category",
            "toolboxitemid": "py_http",
            "name": "%{BKY_SUBCATEGORY_HTTP}",
            "style": "py_http_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "py_datalog",
            "name": "Data log",
            "style": "py_datalog_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-file-csv"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "bricks",
            "name": "%{BKY_CATEGORY_BRICKS}",
            "style": "bricks_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-cubes"
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_webui",
                    "name": "WebUI",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-globe"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_codes",
                    "name": "%{BKY_SUBCATEGORY_SHORT_QR_CODES}",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-qrcode"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_objects",
                    "name": "%{BKY_SUBCATEGORY_SHORT_OBJECTS}",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-vector-polygon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_camera",
                    "name": "%{BKY_BRICKS_LABEL_CAMERA}",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-camera"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_keyword",
                    "name": "%{BKY_SUBCATEGORY_SHORT_KEYWORD}",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-microphone"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_llm",
                    "name": "%{BKY_SUBCATEGORY_SHORT_LOCAL_AI}",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-comment-nodes"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_ble",
                    "name": "Bluetooth",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fab fa-bluetooth-b"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_mqtt",
                    "name": "MQTT",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-circle-nodes"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_cloud",
                    "name": "Arduino Cloud",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly svgIcon"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "bricks_telegram",
                    "name": "Telegram",
                    "style": "bricks_category",
                    "cssConfig": {
                        "icon": "icon_blockly fab fa-telegram"
                    },
                    "contents": []
                }
            ]
        },
        {
            "kind": "category",
            "toolboxitemid": "py_bridges",
            "name": "%{BKY_CATEGORY_BRIDGES}",
            "style": "bridges_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bridge"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "dictionaries",
            "name": "%{BKY_CATEGORY_DICTIONARIES}",
            "style": "dictionaries_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-book"
            },
            "contents": [
                {
                    "kind": "category",
                    "toolboxitemid": "dictionaries_create",
                    "name": "%{BKY_TOOLBOX_LABEL_CREATE}",
                    "style": "dictionaries_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-plus"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "dictionaries_read",
                    "name": "%{BKY_TOOLBOX_LABEL_READ}",
                    "style": "dictionaries_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-eye"
                    },
                    "contents": []
                },
                {
                    "kind": "category",
                    "toolboxitemid": "dictionaries_modify",
                    "name": "%{BKY_TOOLBOX_LABEL_MODIFY}",
                    "style": "dictionaries_category",
                    "cssConfig": {
                        "icon": "icon_blockly fas fa-pen-to-square"
                    },
                    "contents": []
                }
            ]
        },
        {
            'kind': 'category',
            'toolboxitemid': 'py_procedures',
            'name': '%{BKY_CATEGORY_PROCEDURES}',
            'custom': 'PROCEDURE_PY',
            'style': 'python_category',
            'cssConfig': {
                'icon': 'icon_blockly svgIcon'
            }
        },
        {
            'kind': 'category',
            'toolboxitemid': 'exception',
            'name': '%{BKY_CATEGORY_EXCEPTION}',
            'style': 'exception_category',
            'cssConfig': {
                'icon': 'icon_blockly fa fa-circle-exclamation'
            },
            "contents": []
        }
    ],
    "html": [
        {
            "kind": "category",
            "toolboxitemid": "html_structure",
            "name": "%{BKY_HTML_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-sitemap"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_attributes",
            "name": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
            "style": "html_attributes_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-tags"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_text",
            "name": "%{BKY_HTML_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-font"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_tables",
            "name": "%{BKY_HTML_CATEGORY_TABLES}",
            "style": "html_tables_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-table"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_lists",
            "name": "%{BKY_HTML_CATEGORY_LISTS}",
            "style": "html_lists_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-list-ul"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_forms",
            "name": "%{BKY_HTML_CATEGORY_FORMS}",
            "style": "html_forms_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-pen-to-square"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_medias",
            "name": "%{BKY_HTML_CATEGORY_MEDIAS}",
            "style": "html_medias_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-photo-film"
            },
            "contents": []
        }
    ],
    "style": [
        {
            "kind": "category",
            "toolboxitemid": "css_structure",
            "name": "%{BKY_CSS_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-layer-group"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_text",
            "name": "%{BKY_CSS_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-text-height"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_display",
            "name": "%{BKY_CSS_CATEGORY_DISPLAY}",
            "style": "css_display_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-table-columns"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_dimensions",
            "name": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
            "style": "css_dimensions_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-ruler-combined"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_colors",
            "name": "%{BKY_CSS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-palette"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_backgrounds",
            "name": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
            "style": "css_backgrounds_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-image"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_borders",
            "name": "%{BKY_CSS_CATEGORY_BORDERS}",
            "style": "css_borders_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-border-all"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_miscellaneous",
            "name": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
            "style": "css_miscellaneous_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-sliders"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_transitions",
            "name": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
            "style": "css_transitions_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-wand-magic-sparkles"
            },
            "contents": []
        }
    ],
    "javascript": [
        {
            "kind": "category",
            "toolboxitemid": "js_loops",
            "name": "%{BKY_JS_CATEGORY_LOOPS}",
            "style": "js_loops_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-rotate-right"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_math",
            "name": "%{BKY_JS_CATEGORY_MATH}",
            "style": "js_math_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-calculator"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_colors",
            "name": "%{BKY_JS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-palette"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_dom",
            "name": "%{BKY_JS_CATEGORY_DOM}",
            "style": "js_dom_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-object-group"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_socket",
            "name": "%{BKY_JS_CATEGORY_SOCKET}",
            "style": "js_socket_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-plug"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_variables",
            "name": "%{BKY_JS_CATEGORY_VARIABLES}",
            "style": "js_variables_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-gear"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_functions",
            "name": "%{BKY_JS_CATEGORY_FUNCTIONS}",
            "style": "js_functions_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-gears"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_advancedjs",
            "name": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
            "style": "js_advancedjs_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-terminal"
            },
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "basic": [
        {
            "subCategoryId": 'logic',
            "contents": [
                {
                    "blocks": [
                        'controls_if',
                        'controls_if-else',
                        'logic_compare-eq',
                        'logic_operation-and',
                        'logic_negate',
                        'logic_boolean',
                        'logic_null',
                        'logic_ternary'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'loops',
            "contents": [
                {
                    "blocks": [
                        'controls_forever',
                        'controls_repeat',
                        'controls_whileUntil',
                        'controls_for',
                        'controls_flow_statements'
                    ]
                }
            ]
        },
        {
            // Common time blocks: they generate Arduino or Python code according to the thread
            "subCategoryId": 'time',
            "contents": [
                {
                    "blocks": [
                        'io_wait',
                        'io_waitUntil',
                        'io_initChronometer',
                        'io_getChronometer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'math',
            "contents": [
                {
                    "subCategoryId": "math_calculations",
                    "contents": [
                        {
                            "blocks": [
                                'math_number',
                                'math_arithmetic-add',
                                'math_single',
                                'math_trig',
                                'math_atan2',
                                'math_constant',
                                'math_modulo',
                                'math_number_property'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "math_rounding",
                    "contents": [
                        {
                            "blocks": [
                                'math_round',
                                'math_round_ndigits',
                                'math_constrain',
                                'math_map'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "math_random",
                    "contents": [
                        {
                            "blocks": [
                                'math_random_int',
                                'math_random_float'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'text',
            "contents": [
                {
                    "subCategoryId": "text_create",
                    "contents": [
                        {
                            "blocks": [
                                'text_comment',
                                'text',
                                'text_join',
                                'text_newline',
                                'text_append',
                                'bi_string_return'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "text_search",
                    "contents": [
                        {
                            "blocks": [
                                'text_length',
                                'text_isEmpty',
                                'text_includesSubstr',
                                'text_indexOf',
                                'text_charAt',
                                'text_count_characters',
                                'text_count'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "text_transform",
                    "contents": [
                        {
                            "blocks": [
                                'text_getSubstring',
                                'text_trim',
                                'text_changeCase',
                                'text_reverse',
                                'text_replace',
                                'text_random_string'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'variables',
            "contents": 'customized'
        },
        {
            "subCategoryId": 'lists',
            "contents": [
                {
                    "subCategoryId": "lists_create",
                    "contents": [
                        {
                            "blocks": [
                                'lists_create_with-0',
                                'lists_create_with',
                                'lists_repeat',
                                'lists_split'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "lists_read",
                    "contents": [
                        {
                            "blocks": [
                                'lists_length',
                                'lists_isEmpty',
                                'math_on_list',
                                'lists_indexOf',
                                'lists_getIndex',
                                'lists_getSublist',
                                'bi_index'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "lists_modify",
                    "contents": [
                        {
                            "blocks": [
                                'lists_append',
                                'lists_setIndex',
                                'lists_reverse',
                                'lists_shuffle',
                                'lists_sort'
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "cpp": [
        {
            "subCategoryId": 'cpp_display',
            "contents": [
                {
                    "subCategoryId": "cpp_display_arduino",
                    "contents": [
                        {
                            "label": "Arduino",
                            "blocks": [
                                    'io_control_arduino_led',
                                    'display_unoq_rgbLed'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_SHORT_BUILTIN_MATRIX}",
                            "blocks": [
                                    'display_builtinMatrix_drawBitmap',
                                    'display_builtinMatrix_drawString',
                                    'display_builtinMatrix_showNumber',
                                    'display_builtinMatrix_setPixel',
                                    'display_builtinMatrix_clearScreen'
                                ]
                            }
                    ]
                },
                {
                    "subCategoryId": "cpp_display_screens",
                    "contents": [
                        {
                            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
                            "blocks": [
                                    'display_lcdRGBSetText',
                                    'display_lcdRGBClear',
                                    'display_setDisplay',
                                    'display_lcdRGBSetColor',
                                    'display_lcdRGBSetPaletteColor'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
                            "blocks": [
                                    'display_addOledText',
                                    'display_oledScreen_drawIcon',
                                    'display_oledScreen_drawBitmapLogo',
                                    'display_clearOledScreen'
                                ]
                            }
                    ]
                },
                {
                    "subCategoryId": "cpp_display_leds",
                    "contents": [
                        {
                            "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
                            "blocks": [
                                    'display_defineNeopixel',
                                    'display_controlNeopixelLed',
                                    'display_controlColorNeopixelLed',
                                    'display_neopixel_controlAllLedRGB',
                                    'display_neopixel_controlAllLedPalette',
                                    'display_rainbowNeopixel'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_LED}",
                            "blocks": [
                                    'display_setGroveSocketLed',
                                    'display_setLEDintensity',
                                    'display_setVariableColorLED',
                                    'display_setNumberGrove4Digit',
                                    'display_setClockGrove4Digit',
                                    'display_setTemperatureGrove4Digit',
                                    'display_setLevelLedBar',
                                    'display_setGreenToRedLedBar',
                                    'display_setLedLedBar'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_CHAINABLE_LED_RGB}",
                            "blocks": [
                                    'display_defineChainableRGBLed',
                                    'display_setColorChainableRGBLed',
                                    'display_setPaletteColorChainableRGBLed',
                                    'display_setColorAllChainableRGBLed',
                                    'display_setPaletteAllChainableRGBLed'
                                ]
                            }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'io',
            "contents": [
                {
                    "subCategoryId": "io_inputs",
                    "contents": [
                        {
                            "blocks": [
                                'io_getGroveButton',
                                'io_getReversedButton',
                                'io_getGroveSwitch',
                                'io_getGroveTactile',
                                'io_getGroveRotaryAngle',
                                'io_getGroveSlidePotentiometer',
                                'io_getGroveEncoderValue',
                                'io_getKeypadNumber',
                                'io_getGroveThumbJoystick'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "io_mp3",
                    "contents": [
                        {
                            "blocks": [
                                'io_groveMp3_init',
                                'io_groveMp3_play_pause',
                                'io_groveMp3_next',
                                'io_groveMp3_playSDSong',
                                'io_groveMp3_playSDDirectorySong',
                                'io_groveMp3_KT403A_playSongSpecify',
                                'io_groveMp3_getVolume',
                                'io_groveMp3_setVolume',
                                'io_groveMp3_changePlayingMode'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "io_pins",
                    "contents": [
                        {
                            "blocks": [
                                'io_digital_signal',
                                'io_readDigitalPin',
                                'io_readDigitalPin_input',
                                'io_writeDigitalPin',
                                'io_writeDigitalPin_input',
                                'io_readAnalogPin',
                                'io_readAnalogPin_input',
                                'io_writeAnalogPin',
                                'io_writeAnalogPin_input',
                                'io_setPwm',
                                'io_readPulseIn',
                                'io_attachInterrupt',
                                'io_detachInterrupt',
                                'io_setPinMode'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'communication',
            "contents": [
                {
                    "subCategoryId": "communication_serial",
                    "contents": [
                        {
                            "blocks": [
                                'communication_serialWrite',
                                'communication_NumberSerialWrite',
                                'communication_onSerialDataReceived',
                                'communication_graphSerialWrite',
                                'communication_playComputerMusic',
                                'communication_playComputerFrequency',
                                'communication_stopComputerMusic'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "communication_datalog",
                    "contents": [
                        {
                            "blocks": [
                                'communication_writeOpenLogSd',
                                'communication_SDWriteDataSPI'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "communication_bluetooth",
                    "contents": [
                        {
                            "blocks": [
                                'communication_groveSerialBluetooth_setATCommand',
                                'communication_groveSerialBluetooth_getATCommand',
                                'communication_sendSerialBluetoothData',
                                'communication_onSerialBluetoothDataReceived',
                                'communication_hc05_setATCommand',
                                'communication_hc05_getATCommand',
                                'communication_hc05_changeBaudrateTransmission',
                                'communication_hc05_sendBluetoothData',
                                'communication_hc05_onBluetoothDataReceived',
                                'communication_hm10_setATCommand',
                                'communication_hm10_getATCommand',
                                'communication_hm10_sendBluetoothData',
                                'communication_hm10_onBluetoothDataReceived'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "communication_wireless",
                    "contents": [
                        {
                            "blocks": [
                                'communication_sendRadioNRF24Data',
                                'communication_onRadioNRF24_dataReceived',
                                'communication_sendRadio433mhzData',
                                'communication_onRadio433mhzDataReceived'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "communication_ir",
                    "contents": [
                        {
                            "blocks": [
                                'communication_ir_sendNECCommand',
                                'communication_ir_sendFrame',
                                'communication_onIRDataReceived',
                                'communication_ir_getProtocoleParam',
                                'communication_onRemoteCommandReceived',
                                'communication_onRemoteCommandReceived_car_mp3_gray'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "communication_tracking",
                    "contents": [
                        {
                            "blocks": [
                                'communication_rfid_getCardID',
                                'communication_onGPSDataReceived',
                                'communication_clockRTC_setDate',
                                'communication_clockRTC_setHour',
                                'communication_clockRTC_readTime'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'sensors',
            "contents": [
                {
                    "subCategoryId": "sensors_gas",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getSgp30Gas',
                                'sensors_getMultichannelGas',
                                'sensors_getMultichannelGasV2',
                                'sensors_getO2gas',
                                'sensors_SCD30_readData',
                                'sensors_SCD30_forcedCalibration',
                                'sensors_getMq135gas',
                                'sensors_getAirQualityValue',
                                'sensors_onAirQualityIndexAs',
                                'sensors_getDustConcentration',
                                'sensors_getParticulateMatter',
                                'sensors_getMhz19Data'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "sensors_climate",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getBmp280Data',
                                'sensors_bme280_getData',
                                'sensors_getDps310Data',
                                'sensors_getGroveMoisture',
                                'sensors_getGroveTemperature',
                                'sensors_getGroveHighTemperature',
                                'sensors_ds18b20_getTemperature',
                                'sensors_getMax6675Temp',
                                'sensors_dhtReadData',
                                'sensors_TH02readData',
                                'sensors_SHT31readData',
                                'sensors_mpx5700ap_getPressure',
                                'sensors_getBme680Data',
                                'sensors_getGroveWaterAmount',
                                'sensors_getGroveWaterAmountI2C',
                                'sensors_getRainGauge',
                                'sensors_getAnemometer'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "sensors_soundlight",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getGroveLight',
                                'sensors_getSi1145Light',
                                'sensors_getUVindex',
                                'sensors_colorSensor_getData',
                                'sensors_colorSensor_onColorDetected',
                                'sensors_cameraTakePicture',
                                'sensors_getGroveSound'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "sensors_distance",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getGroveUltrasonicRanger',
                                'sensors_getGesture',
                                'sensors_onGestureTypeDetected',
                                'sensors_getGroveLineFinder',
                                'sensors_getGroveTilt',
                                'sensors_getGroveMotion',
                                'sensors_getPiezoVibration'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "sensors_health",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getPulse',
                                'sensors_getPulseBpm',
                                'sensors_mlx90614_readObjectTemperature',
                                'sensors_getEarClipHeartRate',
                                'sensors_dfrobot_max30102_takeMeasure',
                                'sensors_dfrobot_max30102_getData'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "sensors_other",
                    "contents": [
                        {
                            "blocks": [
                                'sensors_getIna219Data',
                                'sensors_getVoltageDividerData',
                                'sensors_getFsr402Force'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'actuators',
            "contents": [
                {
                    "subCategoryId": "actuators_motors",
                    "contents": [
                        {
                            "label": "%{BKY_SUBCATEGORY_SERVOMOTORS}",
                            "blocks": [
                                    'actuators_setServoAngle',
                                    'actuators_continuousServo_setSpeed',
                                    'actuators_servo_detach'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_SHORT_MOTOR_I2C}",
                            "blocks": [
                                    'actuators_DCMotor_setSpeed',
                                    'actuators_DCMotor_stop',
                                    'actuators_stepperMotor_run',
                                    'actuators_DCMotor_setSpeed',
                                    'actuators_DCMotor_stop'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_SHORT_MINI_MOTOR_I2C}",
                            "blocks": [
                                    'actuators_MiniDriver_DCMotor_drive',
                                    'actuators_MiniDriver_DCMotor_stop'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_SHORT_MOTOR_SHIELD}",
                            "blocks": [
                                    'actuators_MC33926MotorShield_setSpeed',
                                    'actuators_MC33926MotorShield_getCurrent'
                                ]
                            }
                    ]
                },
                {
                    "subCategoryId": "actuators_music",
                    "contents": [
                        {
                            "blocks": [
                                'actuators_controlGroveBuzzerState',
                                'actuators_playNoteGroveBuzzer',
                                'actuators_playNoteDurationGroveBuzzer',
                                'actuators_tone',
                                'actuators_toneDuration',
                                'actuators_noTone',
                                'actuators_playMusicGroveBuzzer'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "actuators_other",
                    "contents": [
                        {
                            "label": "%{BKY_SUBCATEGORY_MOSFET}",
                            "blocks": [
                                    'actuators_mosfet_setState',
                                    'actuators_mosfet_setPercentValue'
                                ]
                            },
                        {
                            "label": "%{BKY_SUBCATEGORY_SHORT_OTHER}",
                            "blocks": [
                                    'actuators_setGroveRelayState',
                                    'actuators_SPDTRelay_defineNCNO',
                                    'actuators_SPDTRelay_controlState',
                                    'actuators_setVibrationMotorState',
                                    'actuators_setWaterAtomizerState',
                                    'actuators_setElectromagnetState'
                                ]
                            }
                    ]
                }
            ]
        },
        {
            // Modulino blocks of the arduino interface (Qwiic connector of the UNO Q)
            "subCategoryId": 'modulino',
            "contents": [
                {
                    "subCategoryId": "modulino_buttons",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_buttons_isPressed',
                                'modulino_buttons_setLeds'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_buzzer",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_buzzer_tone',
                                'modulino_buzzer_noTone'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_pixels",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_pixels_setColor',
                                'modulino_pixels_setRGB',
                                'modulino_pixels_clear'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_knob",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_knob_get',
                                'modulino_knob_isPressed',
                                'modulino_knob_set'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_distance",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_distance_get'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_movement",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_movement_getAcceleration',
                                'modulino_movement_getRotation'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "modulino_thermo",
                    "contents": [
                        {
                            "blocks": [
                                'modulino_thermo_getData'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'ia',
            "contents": [
                {
                    "subCategoryId": "ia_huskylens",
                    "contents": [
                        {
                            "blocks": [
                                'cameras_huskylens_setMode',
                                'cameras_huskylens_setText',
                                'cameras_huskylens_clearScreen',
                                'cameras_huskylens_learnID',
                                'cameras_huskylens_customName',
                                'cameras_huskylens_forgetIDs',
                                'cameras_huskylens_getData',
                                'cameras_huskylens_requestBlocksData',
                                'cameras_huskylens_requestArrowsData',
                                'cameras_huskylens_requestBlockXY',
                                'cameras_huskylens_getNumberOfDetectedElements',
                                'cameras_huskylens_getDataByID',
                                'cameras_huskylens_checkID',
                                'cameras_huskylens_getLineDirection',
                                'cameras_huskylens_saveModel',
                                'cameras_huskylens_loadModel'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "ia_wio",
                    "contents": [
                        {
                            "blocks": [
                                'wio_get_class_data',
                                'wio_get_class_data_by_id',
                                'wio_get_class_max_id',
                                'wio_get_status'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'cpp_bridges',
            "contents": [
                {
                    "blocks": [
                        'bridges_provide',
                        'bridges_call',
                        'bridges_call_return'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'cpp_procedures',
            "contents": 'customized'
        },
    ],
    "python": [
        {
            "subCategoryId": 'py_display',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_CONSOLE}",
                    "blocks": [
                        'display_print',
                        'display_input',
                        'display_input_number'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_LED}",
                    "blocks": [
                        'display_unoq_linuxRgbLed'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'graph',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_MATPLOTLIB}",
                    "blocks": [
                        'graph_matplotlib_setLabel',
                        'graph_matplotlib_grid',
                        'graph_matplotlib_text',
                        'graph_matplotlib_plot',
                        'graph_matplotlib_scatter',
                        'graph_matplotlib_bar'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'numpy',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_ARRAYS_MATRIX}",
                    "blocks": [
                        'numpy_linspace',
                        'numpy_arange',
                        'numpy_table_with_shape',
                        'numpy_create_table_with',
                        'numpy_square_matrix'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_OPERATIONS}",
                    "blocks": [
                        'numpy_getSizeShape',
                        'numpy_getElement_matrix',
                        'numpy_getElement_list',
                        'numpy_single',
                        'numpy_trig'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "vittaia",
            "contents": [
                {
                    "subCategoryId": "vittaia_image",
                    "contents": [
                        {
                            "blocks": [
                                'vittaia_load_model',
                                'vittaia_load_local_model',
                                'vittaia_load_model_default',
                                'vittaia_make_predictions_webcam',
                                'vittaia_make_predictions_pc_webcam',
                                // 'vittaia_make_predictions_file',
                                'vittaia_make_predictions_from_url',
                                'vittaia_get_highest_probability_class',
                                'vittaia_get_confidence_rate',
                                'vittaia_get_predictions',
                                'vittaia_detect_class',
                                'vittaia_list_webcams',
                                'vittaia_init_webcam'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "vittaia_posture",
                    "contents": [
                        {
                            "blocks": [
                                'vittaia_load_posture_model',
                                'vittaia_load_local_posture_model',
                                'vittaia_make_posture_predictions_webcam',
                                'vittaia_make_posture_predictions_pc_webcam',
                                'vittaia_get_highest_probability_class_posture',
                                'vittaia_get_confidence_rate_posture',
                                'vittaia_detect_class_posture'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "vittaia_hand",
                    "contents": [
                        {
                            "blocks": [
                                'vittaia_load_hand_model',
                                'vittaia_load_local_hand_model',
                                'vittaia_make_hand_predictions_webcam',
                                'vittaia_make_hand_predictions_pc_webcam',
                                'vittaia_get_highest_probability_class_hand',
                                'vittaia_get_confidence_rate_hand',
                                'vittaia_detect_class_hand'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "vittaia_sound",
                    "contents": [
                        {
                            "blocks": [
                                'vittaia_load_sound_model',
                                'vittaia_load_local_sound_model',
                                'vittaia_make_sound_predictions_microphone',
                                'vittaia_make_sound_predictions_pc_microphone',
                                'vittaia_get_highest_probability_class_sound',
                                'vittaia_get_confidence_rate_sound',
                                'vittaia_detect_class_sound'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "vittaia_sensor",
                    "contents": [
                        {
                            "blocks": [
                                'vittaia_load_sensor_model',
                                'vittaia_load_local_sensor_model',
                                'vittaia_make_sensor_predictions',
                                'vittaia_get_highest_probability_class_sensor',
                                'vittaia_get_confidence_rate_sensor',
                                'vittaia_detect_class_sensor'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_bridges',
            "contents": [
                {
                    "blocks": [
                        'bridges_provide',
                        'bridges_call',
                        'bridges_call_return'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_sound',
            "contents": [
                {
                    "subCategoryId": "py_sound_computer",
                    "contents": [
                        {
                            "blocks": [
                                'py_sound_say_computer',
                                'py_sound_frequency_computer'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "py_sound_board",
                    "contents": [
                        {
                            "blocks": [
                                'py_sound_say_board',
                                'py_sound_listen_board',
                                'py_sound_note_board',
                                'py_sound_abc_board',
                                'py_sound_chord_board',
                                'py_sound_volume_board',
                                'py_sound_waveform_board',
                                'py_sound_effect_board'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_http',
            "contents": [
                {
                    "blocks": [
                        'py_http_get_text',
                        'py_http_get_json',
                        'py_http_post_json',
                        'py_weather_get',
                        'py_weather_forecast_is',
                        'py_weather_forecast_temperature'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_datalog',
            "contents": [
                {
                    "blocks": [
                        'py_datalog_set_columns',
                        'py_datalog_add_line',
                        'py_datalog_clear'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'bricks',
            "contents": [
                {
                    "blocks": [
                        'bricks_app_run'
                    ]
                },
                {
                    "subCategoryId": "bricks_webui",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_webui_send_message',
                                'bricks_webui_on_message',
                                'bricks_webui_console'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_codes",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_code_on_read',
                                'bricks_code_last',
                                'bricks_code_last_type',
                                'bricks_code_kinds'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_objects",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_object_on_detect',
                                'bricks_object_count',
                                'bricks_object_position',
                                'bricks_object_confidence',
                                'bricks_object_list',
                                'bricks_object_threshold'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_camera",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_camera_rotation',
                                'bricks_camera_flip',
                                'bricks_camera_image',
                                'bricks_camera_colors',
                                'bricks_camera_save_photo',
                                'bricks_camera_save_photo_folder',
                                'bricks_camera_make_stopmotion'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_keyword",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_keyword_on_heard'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_llm",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_llm_ask',
                                'bricks_llm_model',
                                'bricks_llm_personality',
                                'bricks_llm_options',
                                'bricks_llm_stream',
                                'bricks_llm_memory',
                                'bricks_llm_clear',
                                'bricks_llm_tool',
                                'bricks_llm_tool_param',
                                'bricks_llm_choose'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_ble",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_ble_connect',
                                'bricks_ble_send',
                                'bricks_ble_on_message',
                                'bricks_ble_message',
                                'bricks_ble_connected',
                                'bricks_ble_disconnect',
                                'bricks_ble_server_start',
                                'bricks_ble_server_send',
                                'bricks_ble_server_on_message',
                                'bricks_ble_server_connected'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_mqtt",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_mqtt_connect',
                                'bricks_mqtt_publish',
                                'bricks_mqtt_on_message',
                                'bricks_mqtt_message',
                                'bricks_mqtt_topic'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_cloud",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_cloud_set',
                                'bricks_cloud_get',
                                'bricks_cloud_on_change'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "bricks_telegram",
                    "contents": [
                        {
                            "blocks": [
                                'bricks_telegram_start',
                                'bricks_telegram_on_message',
                                'bricks_telegram_on_command',
                                'bricks_telegram_message_text',
                                'bricks_telegram_chat_id',
                                'bricks_telegram_reply',
                                'bricks_telegram_send',
                                'bricks_telegram_send_photo'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'dictionaries',
            "contents": [
                {
                    "subCategoryId": "dictionaries_create",
                    "contents": [
                        {
                            "blocks": [
                                'dictionaries_create_empty',
                                'dictionaries_create_with'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "dictionaries_read",
                    "contents": [
                        {
                            "blocks": [
                                'dictionaries_length',
                                'dictionaries_get_item',
                                'dictionaries_include',
                                'dictionaries_loop'
                            ]
                        }
                    ]
                },
                {
                    "subCategoryId": "dictionaries_modify",
                    "contents": [
                        {
                            "blocks": [
                                'dictionaries_update_item',
                                'dictionaries_add_tuple',
                                'dictionaries_delete_tuple',
                                'dictionaries_clear'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_procedures',
            "contents": 'customized'
        },
        {
            "subCategoryId": 'exception',
            "contents": [
                {
                    "blocks": [
                        'exception_raise',
                        'exception_exception',
                        'exception_type',
                        'exception_try'
                    ]
                }
            ]
        },
    ],
    "html": [
        {
            "subCategoryId": 'html_structure',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_STRUCTURE}",
                "blocks": [
                    "html_page",
                    "head",
                    "meta_unknown",
                    "script_tag",
                    "metaviewport",
                    "title",
                    "body",
                    "headertag",
                    "footertag",
                    "divider",
                    "button",
                    "linebreak",
                    "hline"
                ]
            }]
        },
        {
            "subCategoryId": 'html_attributes',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
                "blocks": [
                    "args",
                    "class",
                    "id",
                    "emptyarg"
                ]
            }]
        },
        {
            "subCategoryId": 'html_text',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TEXTS}",
                "blocks": [
                    "htmlcomment",
                    "emptytext",
                    "span",
                    "paragraph",
                    "header",
                    "link"
                ]
            }]
        },
        {
            "subCategoryId": 'html_tables',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TABLES}",
                "blocks": [
                    "table",
                    "emptytable",
                    "tablerow",
                    "tableheading",
                    "tabledata"
                ]
            }]
        },
        {
            "subCategoryId": 'html_lists',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_LISTS}",
                "blocks": [
                    "unorderedlist",
                    "orderedlist",
                    "listitem"
                ]
            }]
        },
        {
            "subCategoryId": 'html_forms',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_FORMS}",
                "blocks": [
                    "form",
                    "input",
                    "label"
                ]
            }]
        },
        {
            "subCategoryId": 'html_medias',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_MEDIAS}",
                "blocks": [
                    "image",
                    "audio",
                    "video",
                    "html_object_detection_video",
                    "html_camera_video",
                    "html_llm_chat"
                ]
            }]
        }
    ],
    "style": [
        {
            "subCategoryId": 'css_structure',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_STRUCTURE}",
                "blocks": [
                    "style",
                    "cssitem",
                    "othercss",
                    "cssevents",
                    "cssnot",
                    "csscomment"
                ]
            }]
        },
        {
            "subCategoryId": 'css_text',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TEXTS}",
                "blocks": [
                    "fontfamily",
                    "fontsize",
                    "fontweight",
                    "colornew",
                    "colordropdown",
                    "textshadownew",
                    "texttransform",
                    "textalign",
                    "letterspacing"
                ]
            }]
        },
        {
            "subCategoryId": 'css_display',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DISPLAY}",
                "blocks": [
                    "display",
                    "margin",
                    "padding",
                    "overflow",
                    "float",
                    "verticalalign"
                ]
            }]
        },
        {
            "subCategoryId": 'css_dimensions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
                "blocks": [
                    "width",
                    "height"
                ]
            }]
        },
        {
            "subCategoryId": 'css_colors',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_COLORS}",
                "blocks": [
                    "color_picker",
                    "hex_picker",
                    "rgba_picker"
                ]
            }]
        },
        {
            "subCategoryId": 'css_backgrounds',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
                "blocks": [
                    "bgcolornew",
                    "bgimage",
                    "bgposition",
                    "bgrepeat",
                    "bgsize"
                ]
            }]
        },
        {
            "subCategoryId": 'css_borders',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BORDERS}",
                "blocks": [
                    "bordernew",
                    "borderedge",
                    "bordercol",
                    "borderrad"
                ]
            }]
        },
        {
            "subCategoryId": 'css_miscellaneous',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
                "blocks": [
                    "cursor",
                    "boxshadownew"
                ]
            }]
        },
        {
            "subCategoryId": 'css_transitions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
                "blocks": [
                    "transition",
                    "transitiontimingdropdown",
                    "transitiontimingbezier"
                ]
            }]
        }
    ],
    "javascript": [
        {
            "subCategoryId": 'js_loops',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_LOOPS}",
                "blocks": [
                    "bi_throw",
                    "bi_yield",
                    "bi_yield_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_math',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_MATH}",
                "blocks": [
                    "bi_parenthesis",
                    "bi_unary",
                    "bi_unary_return",
                    "bi_unary_postfix",
                    "bi_unary_postfix_return",
                    "bi_math_arithmetic",
                ]
            }]
        },
        {
            "subCategoryId": 'js_colors',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_COLORS}",
                "blocks": [
                    "colour_picker",
                    "colour_random",
                    "colour_rgb",
                    "colour_blend"
                ]
            }]
        },
        {
            "subCategoryId": 'js_dom',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_DOM}",
                "blocks": [
                    "getelementbyid",
                    "getelementsbyclassname",
                    "getelementsbytagname",
                    "addeventlistener",
                    "addeventlistenerOnLoad",
                    "editattribut"
                ]
            }]
        },
        {
            "subCategoryId": 'js_socket',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_SOCKET}",
                "blocks": [
                    "socket_emit_message",
                    "socket_on_message_receive"
                ]
            }]
        },
        {
            "subCategoryId": 'js_variables',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_VARIABLES}",
                "blocks": [
                    "bi_var",
                    "bi_var_name",
                    "bi_assignment",
                    "bi_assignment_return",
                    "bi_field",
                    "bi_field_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_functions',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_FUNCTIONS}",
                "blocks": [
                    "bi_function",
                    "bi_call_editable",
                    "bi_call_editable_return",
                    "bi_direct_call_editable",
                    "bi_direct_call_editable_return",
                    "bi_return",
                    "bi_spread"
                ]
            }]
        },
        {
            "subCategoryId": 'js_advancedjs',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
                "blocks": [
                    "bi_try_catch",
                    "bi_catch",
                    "bi_export",
                    "bi_import",
                    "bi_import_as",
                    "bi_comment"
                ]
            }]
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;