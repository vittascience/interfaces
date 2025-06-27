import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_communication.js'; // communication blocks
import '/openInterface/microbit/assets/js/blocks/code2Blocks/ast_robot.js'; // robot blocks


const LIB_IMPORT = {
    // micropython libraries
    IMPORT_UTIME: "import utime",
    IMPORT_TIME: "import time",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_GC: "import gc",
    IMPORT_SYS: "import sys",
    IMPORT_OS: "import os",
    IMPORT_USTRUCT: "import ustruct",
    IMPORT_NEOPIXEL: "import neopixel",
    // microbit libraries
    IMPORT_MICROBIT_ALL: "from microbit import *",
    IMPORT_RADIO: "import radio",
    IMPORT_MUSIC: "import music",
    IMPORT_SPEECH: "import speech",
    IMPORT_AUDIO: "import audio",
    IMPORT_MACHINE_PULSE_MS: "from machine import time_pulse_us",
    IMPORT_LOG: "import log",
    // custom libraries
    IMPORT_GAME: "from game import GAME",
    IMPORT_SPRITE: "from sprite import SPRITE",
    // robot libraries
    IMPORT_BUGGY_MOVE: "from buggyMove import MOVEMotor",
    IMPORT_CUTEBOT: "import cutebot",
    IMPORT_MAQUEEN_PLUS_V2: "import maqueenplusv2",
    IMPORT_MAQUEEN_PLUS_V1: "import maqueenplusv1",
    // grove modules libraries - I2C
    IMPORT_BMP280: "from bmp280 import BMP280",
    IMPORT_COLOR_SENSOR: "from color_sensor import GroveI2cColorSensorV2",
    IMPORT_DS1307: "from ds1307 import DS1307",
    IMPORT_MULTICHANNELGAS: "from multichannel_gas import GAS",
    IMPORT_GAS_GMXXX: "from gas_gmxxx import GAS_GMXXX",
    IMPORT_HM330X: "from hm330x import HM330X",
    IMPORT_LCD1602: "from lcd_i2c import LCD1602",
    IMPORT_PCF85063TP: "from pcf85063tp import RTC_HP",
    IMPORT_SCD30: "from scd30 import SCD30",
    IMPORT_SGP30: "from sgp30 import SGP30",
    IMPORT_SHT31: "from sht31 import SHT31",
    IMPORT_SI1145: "from si1145 import SI1145",
    IMPORT_TH02: "from th02 import TH02",
    IMPORT_GESTURE: "from gesture import GESTURE",
    IMPORT_TCS3472: "from tcs3472 import TCS3472",
    IMPORT_BME280: "from bme280 import BME280",
    IMPORT_OLED: "from oled import OLED",
    IMPORT_OLEDM: "from oled_mp import OLEDM",
    IMPORT_MORPION: "from morpion import MORPION",
    IMPORT_HT16K33_MATRIX: "from ht16k33matrix import HT16K33Matrix",
    IMPORT_RGB_LED_MATRIX: "from rgb_led_matrix import GroveTwoRGBLedMatrix",
    IMPORT_HUSKYLENS: "from HuskyLens import HuskyLensLibrary",
    // grove modules libraries - Pins
    IMPORT_TM1637: "from tm1637 import TM1637",
    IMPORT_MY9221: "from my9221 import MY9221",
    IMPORT_DHT11: "from dht11 import DHT11",
    IMPORT_DHT11_V2: "from dht11_v2 import DHT11",
    // grove modules libraries - custom
    IMPORT_NEC_REMOTE: "from nec_remote import NEC_8, NEC_16",
    IMPORT_TELLO: "from tello import Tello"
};

const EXCLUDED_COMMENTS = ["Water Atomizer on","Electromagnet on","Servo on pin","MOSFET on pin","Vibration Motor on ","Fan on pin", "Force Sensor on pin","EMG Detector on pin","Ear Clip on pin","Tilt Sensor on pin","PIR Motion Sensor on","Vibration Sensor on pin","Line Finder on","Ultrasonic TRIG on pin","Ultrasonic on pin","Sound Sensor on pin","UV Sensor on pin","Light Sensor on pin","Anemometer on pin","Rain Gauge on pin","Water Sensor on pin","MPX5700 on pin","DHT11 Sensor on pin","High Temperature room on pin","High Temperature thmc on pin","Temperature Sensor on", "Capacitive Moisture Sensor on","Moisture Sensor on","Air Quality Sensor","Dioxygen Sensor on pin", '# Motor on pin2', 'Continuous Servo on pin1','Servo on pin2', 'Serial Receive used', 'Neopixel on pin', 'Buzzer on pin', 'LED Module on pin', '4 Digit Display', "If micro:bit is powered off", "Warning, the clock is recovered", "LED Bar DI on", "LED Bar DCKI", "Traffic Light", "# Simple Button on", "# Switch Button on", "# Magnetic Switch on", "# Touch Button on", "# Potentiometer on", "# Colored Button / read on", "# Colored Button / write on"] 
const EXCLUDED_DOCSTRINGS = ["Cutebot Pro robot"]


const SPECIFIC_INIT = {

}

const SPECIFIC_END = {
    // HT16K33Matrix : LedMatrixModalManager.updateImageMono()
}

const CLASS_METHODS = {
    "neopixel": {
        "subscript": { astCallBack: "set_neopixel", argsNode: 'tuple'}
    },
    "Image":{
        "call": { astCallBack: "define_image", argsNode: 'string'}
    },
    "LCD1602": {
        "call": { astCallBack: "LCD1602", argsNode: ''}
    },
    "OLED": {
        "call": { astCallBack: "OLED", argsNode: ''}
    },
    "OLEDM": {
        "call": { astCallBack: "OLEDM", argsNode: ''}
    },
    "MORPION": {
        "call": { astCallBack: "MORPION", argsNode: ''}
    },
    "TM1637": {
        "call": { astCallBack: "TM1637", argsNode: ''}
    },
    "MY9221": {
        "call": { astCallBack: "MY9221", argsNode: ''}
    }, 
    "HT16K33Matrix": {
        "call": { astCallBack: "HT16K33Matrix", argsNode: ''}
    },
    "GroveTwoRGBLedMatrix": {
        "call": { astCallBack: "GroveTwoRGBLedMatrix", argsNode: ''}
    },
    "GAME": {
        "call": { astCallBack: "GAME", argsNode: ''}
    },
    "TCS3472": {
        "call": { astCallBack: "TCS3472", argsNode: ''}
    },
    "BME280": {
        "call": { astCallBack: "BME280", argsNode: ''}
    },
    "SGP30": {
        "call": { astCallBack: "SGP30", argsNode: ''}
    },
    "SHT31": {
        "call": { astCallBack: "SHT31", argsNode: ''}
    },
    "SCD30": {
        "call": { astCallBack: "SCD30", argsNode: ''}
    },
    "GAS": {
        "call": { astCallBack: "GAS", argsNode: ''}
    },
    "GAS_GMXXX": {
        "call": { astCallBack: "GAS_GMXXX", argsNode: ''}
    },
    "HM330X": {
        "call": { astCallBack: "HM330X", argsNode: ''}
    },
    "BMP280": {
        "call": { astCallBack: "BMP280", argsNode: ''}
    },
    "DHT11": {
        "call": { astCallBack: "DHT11", argsNode: ''}
    },
    "TH02": {
        "call": { astCallBack: "TH02", argsNode: ''}
    },
    "SHT31": {
        "call": { astCallBack: "SHT31", argsNode: ''}
    },
    "SHT35": {
        "call": { astCallBack: "SHT35", argsNode: ''}
    },
    "SI1145": {
        "call": { astCallBack: "SI1145", argsNode: ''}
    },
    "VL53L0X": {
        "call": { astCallBack: "VL53L0X", argsNode: ''}
    },
    "HP206C": {
        "call": { astCallBack: "HP206C", argsNode: ''}
    },
    "GESTURE": {
        "call": { astCallBack: "GESTURE", argsNode: ''}
    },
    "CBP": {
        "call": { astCallBack: "CBP", argsNode: ''}
    },

};

const PYTHON_MICROCONTROLER_BUILTIN = ['write_digital', 'write_analog', 'read_digital', 'read_analog', 'pinMode', 'set_analog_period', "set_analog_period_microseconds"];

const PYTHON_EXCLUDED_VARIABLES_DISPLAY= ["NP_LED_COUNT_", "STAMP_BUTTERFLY", "STAMP_HAPPY", "STAMP_SAD", "STAMP_HEART", "STAMP_YES", "STAMP_NO", "STAMP_STICKFIGURE", "STAMP_PITCHFORK", "STAMP_UMBRELLA", "STAMP_SKULL", "STAMP_CHESSBOARD", "MIN_START", "HOUR_START"]

const PYTHON_EXCLUDED_VARIABLES_COMMUNICATION = ["stringData", "numberData"]

const PYTHON_EXCLUDED_VARIABLES_SENSORS = ["ENVIROBIT_SOUND_OFFSET"]

const PYTHON_EXCLUDED_VARIABLES = [...PYTHON_EXCLUDED_VARIABLES_DISPLAY, ...PYTHON_EXCLUDED_VARIABLES_COMMUNICATION, ...PYTHON_EXCLUDED_VARIABLES_SENSORS];

const RESERVED_WORDS = [
    "radio_receiveValue()", "t_scd", "scd30_data","Var_VtoT_K", "tempRoom_0", "tempRoom_1", "tempRoom_2", "tempRoom_3", "tempRoom_4", "tempRoom_10"
];

export default {LIB_IMPORT, EXCLUDED_COMMENTS, EXCLUDED_DOCSTRINGS,  CLASS_METHODS, PYTHON_MICROCONTROLER_BUILTIN, PYTHON_EXCLUDED_VARIABLES, RESERVED_WORDS};


