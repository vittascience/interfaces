import '/openInterface/l476/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/l476/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/l476/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/l476/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/l476/assets/js/blocks/code2Blocks/ast_robot.js'; // robot blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_UTIME: "import utime",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_UJSON: "import ujson",
    IMPORT_GC: "import gc",
    IMPORT_SYS: "import sys",
    IMPORT_OS: "import os",
    IMPORT_RE: "import re",
    IMPORT_USTRUCT: "import ustruct",
    IMPORT_BINASCII: "import binascii",
    IMPORT_NEOPIXEL: "import neopixel",
    IMPORT_DHT: "import dht",
    IMPORT_ONEWIRE: "import onewire",

    // STM32 libraries
    IMPORT_MACHINE: "import machine",
    IMPORT_PYB: "import pyb",

    // Shield
    IMPORT_HTS221: "import HTS221",
    IMPORT_LIS2DW12: "import LIS2DW12",
    IMPORT_LIS2MDL: "import LIS2MDL",
    IMPORT_LPS22: "import LPS22",
    IMPORT_LSM6DSO: "import LSM6DSO",
    IMPORT_STTS751: "import STTS751",

    // Robot libraries
    IMPORT_STM32_ALPHABOT_V2: "from stm32_alphabot_v2 import AlphaBot_v2",
    IMPORT_STM32_TRSENSORS: "from stm32_TRsensors import TRSensors",

    // Grove modules libraries - I2C
    IMPORT_STM32_BMP280: "from stm32_bmp280 import BMP280",
    IMPORT_STM32_COLOR_SENSOR: "from stm32_colorSensor import GroveI2cColorSensorV2",
    IMPORT_STM32_GAS: "from stm32_gas import GAS",
    IMPORT_STM32_HM330X: "from stm32_hm330x import HM330X",
    IMPORT_STM32_LCD1602: "from stm32_lcd_i2c import LCD1602",
    IMPORT_STM32_PCF85063TP: "from stm32_pcf85063tp import RTC",
    IMPORT_STM32_SCD30: "from stm32_scd30 import SCD30",
    IMPORT_STM32_SGP30: "from stm32_sgp30 import SGP30",
    IMPORT_STM32_SHT31: "from stm32_sht31 import SHT31",
    IMPORT_STM32_SI1145: "from stm32_si1145 import SI1145",
    IMPORT_STM32_SSD1306_I2C: "from stm32_ssd1306 import SSD1306, SSD1306_I2C",
    IMPORT_STM32_TH02: "from stm32_th02 import TH02",
    IMPORT_STM32_HT16K33_MATRIX: "from stm32_ht16k33matrix import HT16K33Matrix",
    IMPORT_STM32_RGB_LED_MATRIX: "from stm32_rgb_led_matrix import GroveTwoRGBLedMatrix",
    IMPORT_STM32_VL53L0X: "from stm32_vl53l0x import VL53L0X",
    IMPORT_STM32_M24SR64: "from stm32_m24sr64 import NFCTag",

    // Grove modules libraries - Pins
    IMPORT_STM32_CHAINABLE_LED: "from stm32_chainableLED import P9813",
    IMPORT_STM32_TM1637: "from stm32_tm1637 import TM1637",
    IMPORT_STM32_MY9221: "from stm32_my9221 import MY9221",
    IMPORT_STM32_DHT11: "from stm32_dht import DHT11",
    IMPORT_STM32_DHT22: "from stm32_dht import DHT22",
    IMPORT_STM32_DS18X20: "from stm32_ds18x20 import DS18X20",

    // Grove modules libraries - custom
    IMPORT_STM32_NEC: "from stm32_nec import NEC_8, NEC_16",
    IMPORT_STM32_LORA: "from stm32_LoRa import *"
};

const SPECIFIC_INIT = {

}

const SPECIFIC_END = {
    // HT16K33Matrix : LedMatrixModalManager.updateImageMono()
}

const EXCLUDED_COMMENTS = ["Ultrasonic on D", "Neopixel on D"]

const CLASS_METHODS = {
    "pyb.Pin": {
        "call": { astCallBack: "define_pyb_pin", argsNode: 'string'}
    },
    "pyb": {
        "call": { astCallBack: "define_pyb_led", argsNode: ''}
    },
    "neopixel": {
        "subscript": { astCallBack: "set_neopixel", argsNode: 'tuple'}
    },

    "LCD1602": {
        "call": { astCallBack: "define_lcd", argsNode: ''}
    },
    "AlphaBot_v2": {
        "call": { astCallBack: "AlphaBot_v2", argsNode: ''}
    },
    "SSD1306_I2C": {
        "call": { astCallBack: "SSD1306_I2C", argsNode: ''}
    },
    "HT16K33Matrix": {
        "call": { astCallBack: "HT16K33Matrix", argsNode: ''}
    },
    "LCD1602": {
        "call": { astCallBack: "LCD1602", argsNode: ''}
    },
    "GroveTwoRGBLedMatrix": {
        "call": { astCallBack: "GroveTwoRGBLedMatrix", argsNode: ''}
    },
};

const MICROPYTHON_CLASSES = {
    "Pin": {
        "call": { astCallBack: "define_pin", argsNode: 'string'}
    },
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES};


