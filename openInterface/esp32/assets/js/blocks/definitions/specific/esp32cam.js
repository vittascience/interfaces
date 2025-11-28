/**
 * @fileoverview ESP32-CAM blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    
    /* Begin ESP32-CAM blocks */

    // BLOCK GET CAPTURED DATA OF CAM
    {
        "type": "esp32Cam_getCaptureData",
        "message0": "%{BKY_ESP32_CAM_GET_CAPTURED_DATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BASE",
            "options": [
                ["base64", "BASE64"],
                ["base16", "BASE16"]
            ]
        }],
        "output": "Array",
        "style": "esp32cam_blocks",
        "tooltip": "%{BKY_ESP32_CAM_GET_CAPTURED_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET IMAGE SIZE
    {
        "type": "esp32Cam_setImageSize",
        "message0": "%{BKY_ESP32_CAM_SET_IMAGE_SIZE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FRAMESIZE",
            "options": [
                ["640 x 480", "VGA"],
                ["96 x 96", "96X96"],
                ["160 x 120", "QQVGA"],
                ["176 x 144", "QCIF"],
                ["240 x 176", "HQVGA"],
                ["240 x 240", "240X240"],
                ["320 x 240", "QVGA"],
                ["400 x 296", "CIF"],
                ["480 x 320", "HVGA"],
                ["800 x 600", "SVGA"],
                ["1024 x 768", "XGA"],
                ["1280 x 720", "HD"],
                ["1280 x 1024", "SXGA"],
                ["1600 x 1200", "UXGA"],
                ["1920 x 1080", "FHD"],
                ["720 x 1280", "P_HD"],
                ["864 x 1536", "P_3MP"],
                ["2048 x 1536", "QXGA"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "esp32cam_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SET_IMAGE_SIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM FLASH LED  
    {
        "type": "esp32Cam_controlFlashLED",
        "message0": "%{BKY_ESP32_CAM_CONTROL_FLASH_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "esp32cam_blocks",
        "tooltip": "%{BKY_ESP32_CAM_CONTROL_FLASH_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM SDCARD - SAVE PIC 
    {
        "type": "esp32Cam_SDcard_savePic",
        "message0": "%{BKY_ESP32_CAM_SDCARD_SAVE_PIC_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA",
            "check": "Array"
        }, {
            "type": "field_grid_dropdown",
            "name": "BASE",
            "options": [
                ["base64", "BASE64"],
                ["base16", "BASE16"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "esp32cam_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SDCARD_SAVE_PIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM SDCARD - SAVE DATA 
    {
        "type": "esp32Cam_SDcard_saveData",
        "message0": "%{BKY_ESP32_CAM_SDCARD_SAVE_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "esp32cam_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SDCARD_SAVE_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)