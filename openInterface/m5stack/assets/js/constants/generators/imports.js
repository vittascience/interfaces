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
const IMPORT_MACHINE = "from machine import *";
const IMPORT_ESP32 = "import esp32";
const IMPORT_ESP = "import esp";
const IMPORT_NETWORK = "import network";
const IMPORT_UREQUESTS = "import urequests";
const IMPORT_SOCKET = "import socket";
//wifi custom libraries
const IMPORT_VITTA_SERVER = "from vitta_server import SERVER";
const IMPORT_VITTA_CLIENT = "from vitta_client import CLIENT";
const IMPORT_VITTA_MQTT = "from vitta_mqtt import SimpleMQTTClient";
//bluetooth custom libraries
const IMPORT_BLUETOOTH = "import bluetooth";
const IMPORT_ESP32_BLE = 'from esp32_ble import BlueUart';
const IMPORT_ESP32_BLE_UART = "from esp32_ble_uart import UART_BLE";
//m5stack libraries
const IMPORT_M5SATCK_ALL = "from m5stack import *";
const IMPORT_M5UI_ALL = "from m5ui import *";
const IMPORT_UIFLOW_ALL = "from uiflow import *";
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
const IMPORT_ESP32_SI1145 = "from esp32_si1145 import SI1145";
const IMPORT_ESP32_SSD1306_I2C = "from esp32_ssd1306 import SSD1306, SSD1306_I2C";
const IMPORT_ESP32_TH02 = "from esp32_th02 import TH02";
//grove modules libraries - Pins
const IMPORT_ESP32_P9813 = "from esp32_chainableLED import P9813";
const IMPORT_ESP32_TM1637 = "from esp32_tm1637 import TM1637";
const IMPORT_ESP32_MY9221 = "from esp32_my9221 import MY9221";
const IMPORT_ESP32_DS18B20 = "from esp32_ds18b20 import DS18X20";

// TO DO: define an esp32 library, not like microbit library
const IMPORT_BME280 = "from bme280 import BME280";