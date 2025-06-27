import '/openInterface/pico/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/pico/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/pico/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/pico/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_MACHINE_ALL: "from machine import *",
    IMPORT_UTIME: "import utime",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_UJSON: "import ujson",
    IMPORT_GC: "import gc",
    IMPORT_SYS: "import sys",
    IMPORT_OS: "import os",
    IMPORT_RE: "import re",
    IMPORT_BINASCII: "import binascii",
    IMPORT_USTRUCT: "import ustruct",
    IMPORT_NEOPIXEL: "import neopixel",
    IMPORT_DHT: "import dht",
    IMPORT_THREAD: "import _thread",
    IMPORT_NETWORK: "import network",
    IMPORT_SOCKET: "import socket",
    IMPORT_UREQUESTS: "import urequests",
    IMPORT_ONEWIRE: "import onewire",

    // Bluetooth custom libraries
    IMPORT_BLUETOOTH: "import bluetooth",
    IMPORT_ESP32_BLE: "from esp32_ble import BlueUart",
    IMPORT_ESP32_BLE_UART: "from esp32_ble_uart import UART_BLE",

    // Pico libraries
    IMPORT_KITRONIK_PICO: "from PicoAutonomousRobotics import KitronikPicoRobotBuggy",
    IMPORT_VITTA_SERVER: "from vitta_server import SERVER",

    // Grove modules libraries - I2C
    IMPORT_ESP32_BMP280: "from esp32_bmp280 import BMP280",
    IMPORT_ESP32_COLOR_SENSOR: "from esp32_colorSensor import GroveI2cColorSensorV2",
    IMPORT_ESP32_DS1307: "from esp32_ds1307 import DS1307",
    IMPORT_ESP32_GAS: "from esp32_gas import GAS",
    IMPORT_ESP32_GAS_GMXXX: "from esp32_gas_gmxxx import GAS_GMXXX",
    IMPORT_ESP32_HM330X: "from esp32_hm330x import HM330X",
    IMPORT_ESP32_LCD1602: "from esp32_lcd_i2c import LCD1602",
    IMPORT_ESP32_PCF85063TP: "from esp32_pcf85063tp import RTC_HP",
    IMPORT_ESP32_SCD30: "from esp32_scd30 import SCD30",
    IMPORT_ESP32_SGP30: "from esp32_sgp30 import SGP30",
    IMPORT_ESP32_SHT31: "from esp32_sht31 import SHT31",
    IMPORT_ESP32_SI1145: "from esp32_si1145 import SI1145",
    IMPORT_ESP32_SSD1306_I2C: "from esp32_ssd1306 import SSD1306, SSD1306_I2C",
    IMPORT_ESP32_TH02: "from esp32_th02 import TH02",

    // Grove modules libraries - Pins
    IMPORT_ESP32_P9813: "from esp32_chainableLED import P9813",
    IMPORT_ESP32_TM1637: "from esp32_tm1637 import TM1637",
    IMPORT_ESP32_MY9221: "from esp32_my9221 import MY9221",
    IMPORT_ESP32_DS18B20: "from esp32_ds18b20 import DS18X20"

};


const EXCLUDED_COMMENTS = ['Neopixel on p', 'Buzzer on p', 'LED Module on p', 'Builtin LED on', "Ultrasonic on p", "Servo on p", "Temperature Sensor on p"] 

const CLASS_METHODS = {
    "neopixel": {
        "subscript": { astCallBack: "set_neopixel", argsNode: 'tuple'}
    },
    // "Image":{
    //     "call": { astCallBack: "define_image", argsNode: 'string'}
    // },
    "LCD1602": {
        "call": { astCallBack: "LCD1602", argsNode: ''}
    },
    "BMP280": {
        "call": { astCallBack: "BMP280", argsNode: ''}
    },
};

const MICROPYTHON_CLASSES = {
    "Pin": {
        "call": { astCallBack: "define_pin", argsNode: 'string'}
    },
    "PWM": {
        "call": { astCallBack: "define_pwm", argsNode: 'string'}
    },
    "ADC": {
        "call": { astCallBack: "define_adc", argsNode: 'string'}
    },
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES};


