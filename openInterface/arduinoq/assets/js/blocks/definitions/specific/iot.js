/**
 * @fileoverview Python blocks of the connected objects (Linux part of the Arduino UNO Q): Shelly plug over Wi-Fi or Bluetooth.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // SHELLY PLUG: Wi-Fi
    {
        "type": "iot_shelly_wifi_switch",
        "message0": "%{BKY_IOT_SHELLY_WIFI_SWITCH_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "ACTION",
            "options": [
                ["%{BKY_IOT_SHELLY_ON}", "on"],
                ["%{BKY_IOT_SHELLY_OFF}", "off"],
                ["%{BKY_IOT_SHELLY_TOGGLE}", "toggle"]
            ]
        }, {
            "type": "input_value",
            "name": "IP",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_WIFI_SWITCH_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "iot_shelly_wifi_is_on",
        "message0": "%{BKY_IOT_SHELLY_WIFI_IS_ON_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IP",
            "check": "String"
        }],
        "inputsInline": true,
        "output": "Boolean",
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_WIFI_IS_ON_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "iot_shelly_wifi_measure",
        "message0": "%{BKY_IOT_SHELLY_WIFI_MEASURE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MEASURE",
            "options": [
                ["%{BKY_IOT_SHELLY_POWER}", "power"],
                ["%{BKY_IOT_SHELLY_ENERGY}", "energy"],
                ["%{BKY_IOT_SHELLY_VOLTAGE}", "voltage"],
                ["%{BKY_IOT_SHELLY_CURRENT}", "current"],
                ["%{BKY_IOT_SHELLY_TEMPERATURE}", "temperature"]
            ]
        }, {
            "type": "input_value",
            "name": "IP",
            "check": "String"
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_WIFI_MEASURE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "iot_shelly_wifi_start_pairing",
        "message0": "%{BKY_IOT_SHELLY_WIFI_START_PAIRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IP",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_WIFI_START_PAIRING_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    // SHELLY PLUG: Bluetooth
    {
        "type": "iot_shelly_ble_pair",
        "message0": "%{BKY_IOT_SHELLY_BLE_PAIR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_BLE_PAIR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "iot_shelly_ble_switch",
        "message0": "%{BKY_IOT_SHELLY_BLE_SWITCH_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ACTION",
                "options": [
                    ["%{BKY_IOT_SHELLY_ON}", "on"],
                    ["%{BKY_IOT_SHELLY_OFF}", "off"],
                    ["%{BKY_IOT_SHELLY_TOGGLE}", "toggle"]
                ]
            },
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_BLE_SWITCH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "iot_shelly_ble_is_on",
        "message0": "%{BKY_IOT_SHELLY_BLE_IS_ON_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_BLE_IS_ON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "iot_shelly_ble_measure",
        "message0": "%{BKY_IOT_SHELLY_BLE_MEASURE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MEASURE",
                "options": [
                    ["%{BKY_IOT_SHELLY_POWER}", "power"],
                    ["%{BKY_IOT_SHELLY_ENERGY}", "energy"],
                    ["%{BKY_IOT_SHELLY_VOLTAGE}", "voltage"],
                    ["%{BKY_IOT_SHELLY_CURRENT}", "current"],
                    ["%{BKY_IOT_SHELLY_TEMPERATURE}", "temperature"]
                ]
            },
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "py_iot_blocks",
        "tooltip": "%{BKY_IOT_SHELLY_BLE_MEASURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
