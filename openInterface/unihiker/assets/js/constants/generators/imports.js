// python3 libraries
const IMPORT_TIME = "import time";
const IMPORT_MATH = "import math";
const IMPORT_RANDOM = "import random";
const IMPORT_SYS = "import sys";
const IMPORT_OS = "import os";
const IMPORT_DATETIME = "from datetime import datetime";
const IMPORT_THREADING = "import threading";

// UNIHIKER M10 libraries
const IMPORT_GUI = "from unihiker import GUI";
const IMPORT_AUDIO = "from unihiker import Audio";
const IMPORT_PINPONG_BOARD = "from pinpong.board import Board, Pin";
const IMPORT_PINPONG_UNIHIKER = "from pinpong.extension.unihiker import *";
const IMPORT_PIL_IMAGE = "from PIL import Image";
// Vittascience AI library (assets/lib/vitta_ai.py), sent with the program
const IMPORT_VITTA_AI = "from vitta_ai import *";

// Modules (blocks of the micro:bit and ESP32 modules): PinPong objects and drivers of the board
const IMPORT_PINPONG_I2C = "from pinpong.board import I2C";
const IMPORT_PINPONG_UART = "from pinpong.board import UART";
const IMPORT_PINPONG_SPI = "from pinpong.board import SPI";
const IMPORT_PINPONG_SERVO = "from pinpong.board import Servo";
const IMPORT_PINPONG_NEOPIXEL = "from pinpong.board import NeoPixel";
const IMPORT_PINPONG_TONE = "from pinpong.board import Tone";
const IMPORT_PINPONG_DHT11 = "from pinpong.board import DHT11";
const IMPORT_PINPONG_SR04 = "from pinpong.board import SR04_URM10";
const IMPORT_PINPONG_BME280 = "from pinpong.libs.dfrobot_bme280 import BME280";
const IMPORT_PINPONG_BMP280 = "from pinpong.libs.dfrobot_bmp280 import BMP280";
const IMPORT_PINPONG_DS1307 = "from pinpong.libs.dfrobot_ds1307 import DS1307";
const IMPORT_PINPONG_PAJ7620 = "from pinpong.libs.dfrobot_paj7620u2 import PAJ7620U2";
const IMPORT_PINPONG_SSD1306 = "from pinpong.libs.dfrobot_ssd1306 import SSD1306_I2C";
const IMPORT_PINPONG_LCD1602 = "from pinpong.libs.lcd1602 import LCD1602_I2C";
const IMPORT_PINPONG_SHT31 = "from pinpong.libs.dfrobot_sht31 import SHT31";
const IMPORT_PINPONG_TCS34725 = "from pinpong.libs.dfrobot_tcs34725 import TCS34725";
const IMPORT_PINPONG_VL53L0 = "from pinpong.libs.dfrobot_vl53l0 import VL53L0";
const IMPORT_PINPONG_PCA9685 = "from pinpong.libs.microbit_motor import COMMON as PCA9685";
// Drivers without PinPong driver on the board (assets/lib, from the ESP32 and micro:bit libraries), sent with the program
const IMPORT_UNIHIKER_SGP30 = "from unihiker_sgp30 import SGP30";
const IMPORT_UNIHIKER_SCD30 = "from unihiker_scd30 import SCD30";
const IMPORT_UNIHIKER_HM330X = "from unihiker_hm330x import HM330X";
const IMPORT_UNIHIKER_HP206C = "from unihiker_hp206c import HP206C";
const IMPORT_UNIHIKER_GAS = "from unihiker_gas import GAS";
const IMPORT_UNIHIKER_GAS_GMXXX = "from unihiker_gas_gmxxx import GAS_GMXXX";
const IMPORT_UNIHIKER_SI1145 = "from unihiker_si1145 import SI1145";
const IMPORT_UNIHIKER_SI1151 = "from unihiker_si1151 import SI1151";
const IMPORT_UNIHIKER_TH02 = "from unihiker_th02 import TH02";
const IMPORT_UNIHIKER_TM1637 = "from unihiker_tm1637 import TM1637";
const IMPORT_UNIHIKER_MY9221 = "from unihiker_my9221 import MY9221";
const IMPORT_UNIHIKER_WATER_LEVEL = "import unihiker_water_level as water_level";
const IMPORT_UNIHIKER_PCF85063TP = "from unihiker_pcf85063tp import RTC_HP";
const IMPORT_UNIHIKER_HT16K33_MATRIX = "from unihiker_ht16k33matrix import HT16K33Matrix";
const IMPORT_UNIHIKER_MFRC522 = "from unihiker_mfrc522 import MFRC522";
const IMPORT_UNIHIKER_LCD_I2C = "from unihiker_lcd_i2c import LCD1602";
const IMPORT_UNIHIKER_RGB_LED_MATRIX = "from unihiker_rgb_led_matrix import GroveTwoRGBLedMatrix";
const IMPORT_UNIHIKER_VEML6040 = "from unihiker_veml6040 import VEML6040";
const IMPORT_UNIHIKER_FINGERPRINT = "import unihiker_fingerprint as fingerprint";
const IMPORT_UNIHIKER_RFID_READER = "import unihiker_rfid_reader as rfid_reader";
const IMPORT_UNIHIKER_REKABIT = "import unihiker_rekabit as rekabit";
const IMPORT_UNIHIKER_STEPPER = "from unihiker_stepper import StepperMotor";
const IMPORT_UNIHIKER_DFR0548 = "import unihiker_dfr0548 as dfr0548";
