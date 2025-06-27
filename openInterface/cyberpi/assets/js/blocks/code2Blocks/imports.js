import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_robot.js'; // robot blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_network.js'; // network blocks
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/ast_communication.js'; // communication blocks


// Interceptors
import '/openInterface/cyberpi/assets/js/blocks/code2Blocks/interceptors/binaryInterceptors.js'; // binary interceptors

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
    IMPORT_BINASCII: "import binascii",
    IMPORT_USTRUCT: "import ustruct",
    IMPORT_NEOPIXEL: "import neopixel",
    IMPORT_DHT: "import dht",

    // ESP32 libraries
    IMPORT_MACHINE: "import machine",
    IMPORT_ESP32: "import esp32",
    IMPORT_ESP: "import esp",
    IMPORT_NETWORK: "import network",
    IMPORT_UREQUESTS: "import urequests",
    IMPORT_SOCKET: "import socket",

    // WiFi custom libraries
    IMPORT_VITTA_SERVER: "from vitta_server import SERVER",
    IMPORT_VITTA_CLIENT: "from vitta_client import CLIENT",

    // CyberPi libraries
    IMPORT_CYBERPI: "import cyberpi",
    IMPORT_MBOT2: "import mbot2",
    IMPORT_MBUILD: "import mbuild",
    IMPORT_EVENT: "import event",
    IMPORT_CONFIG: "import config"
};


const EXCLUDED_COMMENTS = ["Servo on all", "Servo on S",'Neopixel on p', 'Buzzer on p', 'LED Module on p', 'Builtin LED on', "Ultrasonic on p", "Servo on p", "Temperature Sensor on p"]

const SPECIFIC_INIT = {
    time_sleep_count: 0,
}

const CLASS_METHODS = {
    "machine.Pin": {
        "call": { astCallBack: "define_machine_pin", argsNode: 'string'}
    },
    "neopixel": {
        "subscript": { astCallBack: "set_neopixel", argsNode: 'tuple'}
    },
    "machine.PWM": {
        "call": { astCallBack: "define_pwm", argsNode: 'string'}
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
    // "PWM": {
    //     "call": { astCallBack: "define_pwm", argsNode: 'string'}
    // },
    "ADC": {
        "call": { astCallBack: "define_adc", argsNode: 'string'}
    },
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES, SPECIFIC_INIT};


