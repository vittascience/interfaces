//micropython libraries
const IMPORT_UTIME = "import utime";
const IMPORT_MATH = "import math";
const IMPORT_RANDOM = "import random";
const IMPORT_UJSON = "import ujson";
const IMPORT_GC = "import gc";
const IMPORT_SYS = "import sys";
const IMPORT_OS = "import os";
const IMPORT_RE = "import re";
const IMPORT_BINASCII = "import binascii";
const IMPORT_USTRUCT = "import ustruct";
const IMPORT_NEOPIXEL = "import neopixel";
const IMPORT_DHT = "import dht";
const IMPORT_ONEWIRE = "import onewire";
//esp32 libraries
const IMPORT_MACHINE_ALL = "from machine import *";
const IMPORT_ESP32 = "import esp32";
const IMPORT_ESP = "import esp";
const IMPORT_NETWORK = "import network";
const IMPORT_UREQUESTS = "import urequests";
const IMPORT_SOCKET = "import socket";
const IMPORT_SUPERVISOR = "import supervisor";
const IMPORT_ESP32_MPU6050 = "from esp32_mpu6050 import MPU6050";
//wifi custom libraries
const IMPORT_VITTA_SERVER = "from vitta_server import SERVER";
const IMPORT_VITTA_CLIENT = "from vitta_client import CLIENT";
const IMPORT_ESP32_UMAIL = "import esp32_umail";
const IMPORT_VITTA_MQTT = "from vitta_mqtt import SimpleMQTTClient";
//bluetooth custom libraries
const IMPORT_BLUETOOTH = "import bluetooth";
const IMPORT_ESP32_BLE = 'from esp32_ble import BlueUart';
const IMPORT_ESP32_BLE_UART = "from esp32_ble_uart import UART_BLE";
//camera from custom firmware
const IMPORT_CAMERA = "import camera";
const IMPORT_SDCARD = "import sdcard";
//grove modules libraries - I2C
const IMPORT_ESP32_BMP280 = "from esp32_bmp280 import BMP280";
const IMPORT_ESP32_COLOR_SENSOR = "from esp32_colorSensor import GroveI2cColorSensorV2";
const IMPORT_ESP32_DS1307 = "from esp32_ds1307 import DS1307";
const IMPORT_ESP32_GAS = "from esp32_gas import GAS";
const IMPORT_ESP32_GAS_GMXXX = "from esp32_gas_gmxxx import GAS_GMXXX";
const IMPORT_ESP32_HM330X = "from esp32_hm330x import HM330X";
const IMPORT_ESP32_LCD1602 = "from esp32_lcd_i2c import LCD1602";
const IMPORT_ESP32_PCF85063TP = "from esp32_pcf85063tp import RTC_HP";
const IMPORT_ESP32_SCD30 = "from esp32_scd30 import SCD30";
const IMPORT_ESP32_SGP30 = "from esp32_sgp30 import SGP30";
const IMPORT_ESP32_SHT31 = "from esp32_sht31 import SHT31";
const IMPORT_ESP32_SHT35 = "from esp32_sht3x import SHT35";
const IMPORT_ESP32_SI1145 = "from esp32_si1145 import SI1145";
const IMPORT_ESP32_SSD1306_I2C = "from esp32_ssd1306 import SSD1306, SSD1306_I2C";
const IMPORT_ESP32_TH02 = "from esp32_th02 import TH02";
const IMPORT_ESP32_HP206C = "from esp32_hp206c import HP206C";
const IMPORT_WATER_LEVEL_SENSOR = "import esp32_water_level as waterLevelSensor"
//grove modules libraries - Pins
const IMPORT_ESP32_P9813 = "from esp32_chainableLED import P9813";
const IMPORT_ESP32_TM1637 = "from esp32_tm1637 import TM1637";
const IMPORT_ESP32_MY9221 = "from esp32_my9221 import MY9221";
const IMPORT_ESP32_DS18B20 = "from esp32_ds18b20 import DS18X20";
//grove modules libraries - custom
const IMPORT_NEC_REMOTE = "from nec_remote import NEC_8, NEC_16";
//robots
const IMPORT_ILO = "import V011 as ilo";
// Gravity modules
const IMPORT_ESP32_DISSOLVED_OXYGEN_PROBE = "from esp32_dissolved_oxygen_probe import DISSOLVED_OXYGEN_PROBE"