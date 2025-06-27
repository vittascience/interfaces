//internal libraries
//somme from Galaxia and some from CircuitPython
const IMPORT_GPIO = "import RPi.GPIO as GPIO";
const IMPORT_THINGZ_ALL = "from thingz import *";
const IMPORT_GALAXIAUI_ALL = "from galaxiaUi import *";
const IMPORT_BOARD = "import board";
const IMPORT_DIGITALIO = "import digitalio";
const IMPORT_ANALOGIO = "import analogio";
const IMPORT_PULSEIO = "import pulseio";
const IMPORT_PWMIO = "import pwmio";
const IMPORT_BUSIO = "import busio";
const IMPORT_SUPERVISOR = "import supervisor";
const IMPORT_TIME = "import time";
const IMPORT_MATH = "import math";
const IMPORT_RANDOM = "import random";
const IMPORT_SYS = "import sys";
// const IMPORT_NEOPIXEL = "import neopixel";
//added to internal libraries
const IMPORT_MACHINE_ALL = "from machine import *";
const IMPORT_UTIME = "import time";
const IMPORT_NETWORK = "import network";
const IMPORT_UREQUESTS = "import urequests";
const IMPORT_UJSON = "import ujson";
const IMPORT_SOCKET = "import socket";
const IMPORT_BLUETOOTH = "import bluetooth";
const IMPORT_ONEWIRE = "import onewire";
const IMPORT_GC = "import gc";
const IMPORT_ESP = "import esp";

//custom liraries
const IMPORT_SIMPLE_WIFI = "import simple_wifi";
const IMPORT_SIMPLE_MQTT = "import simple_mqtt";
const IMPORT_VITTA_SERVER = "from vitta_server import SERVER";
const IMPORT_VITTA_CLIENT = "from vitta_client import CLIENT";
//galaxia external libraries
const IMPORT_NEC_REMOTE = "from nec_remote import NEC_8, NEC_16"; // TO DO

//esp32 external libraries
//external libraries
const IMPORT_ESP32_BLE = 'from esp32_ble import BlueUart';
const IMPORT_ESP32_BLE_UART = "from esp32_ble_uart import UART_BLE";
const IMPORT_ESP32_BMP280 = "from esp32_bmp280 import BMP280";
const IMPORT_ESP32_COLOR_SENSOR = "from esp32_colorSensor import GroveI2cColorSensorV2";
const IMPORT_ESP32_DS1307 = "from esp32_ds1307 import DS1307";
const IMPORT_ESP32_DS18B20 = "from esp32_ds18b20 import DS18X20";
const IMPORT_ESP32_GAS = "from esp32_gas import GAS";
const IMPORT_ESP32_GAS_GMXXX = "from esp32_gas_gmxxx import GAS_GMXXX";
const IMPORT_ESP32_HM330X = "from esp32_hm330x import HM330X";

const IMPORT_ESP32_P9813 = "from esp32_chainableLED import P9813";
const IMPORT_ESP32_PCF85063TP = "from esp32_pcf85063tp import RTC_HP";
const IMPORT_ESP32_MY9221 = "from esp32_my9221 import MY9221";
const IMPORT_ESP32_SCD30 = "from esp32_scd30 import SCD30";
const IMPORT_ESP32_SGP30 = "from esp32_sgp30 import SGP30";
const IMPORT_ESP32_SHT31 = "from esp32_sht31 import SHT31";
const IMPORT_ESP32_SI1145 = "from esp32_si1145 import SI1145";
const IMPORT_ESP32_SSD1306_I2C = "from esp32_ssd1306 import SSD1306, SSD1306_I2C";
const IMPORT_ESP32_TH02 = "from esp32_th02 import TH02";
const IMPORT_ESP32_TM1637 = "from esp32_tm1637 import TM1637";
const IMPORT_ESP32_ROTARY = "from esp32_rotary import RotaryIRQ";
const IMPORT_ESP32_LINKY = "from esp32_linky import Linky";

// NEW Raspberry Pi 

const IMPORT_ULTRASONIC_RANGER = "from ultrasonic_ranger import GroveUltrasonicRanger";

// DISPLAY
const IMPORT_LCD1602 = "from lcd1602 import LCD1602";
const IMPORT_NEOPIXEL = "import neopixel";
const IMPORT_NEOPIXEL_COLOR = "from rpi_ws281x import Color";
const IMPORT_ADC = "from adc import ADC";
const IMPORT_GROVE_BUZZER = "from buzzer import GroveBuzzer";
const IMPORT_DHT = "from dht import DHT";

// sense-hat

const IMPORT_SENSE_HAT_ALL = "from sense_hat import SenseHat";

// rpi camera

const IMPORT_RPI_CAMERA = "from pi_camera import Camera";