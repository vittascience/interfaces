import '/openInterface/arduino/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/arduino/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/arduino/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks


const LIB_IMPORT = {
    INCLUDE_MATH: "#include <math.h>",
    INCLUDE_ARDUINO: "#include <Arduino.h>",
    INCLUDE_AVR_PGMSPACE: "#include <avr/pgmspace.h>",
    INCLUDE_ONE_WIRE: "#include <OneWire.h>",
    INCLUDE_SOFTWARE_SERIAL: "#include <SoftwareSerial.h>",
    INCLUDE_SOFTWARE_SERIAL_2: "#include <SoftwareSerial2.h>",
    INCLUDE_SPI: "#include <SPI.h>",
    INCLUDE_VIRTUAL_WIRE: "#include <VirtualWire.h>",
    INCLUDE_WIRE: "#include <Wire.h>",
    INCLUDE_PRINTF: "#include <printf.h>",
    INCLUDE_DS1307: "#include <DS1307.h>",
    INCLUDE_PCF85063TP: "#include <PCF85063TP.h>",
    INCLUDE_IR_REMOTE: "#include <IRremote.h>",
    INCLUDE_NRF24L01: "#include <nRF24L01.h>",
    INCLUDE_RF24: "#include <RF24.h>",
    INCLUDE_SD: "#include <SD.h>",
    INCLUDE_SEEED_RFID: "#include <SeeedRFID.h>",
    INCLUDE_ADAFRUIT_NEOPIXEL: "#include <Adafruit_NeoPixel.h>",
    INCLUDE_CHAINABLE_LED: "#include <ChainableLED.h>",
    INCLUDE_GROVE_LED_BAR: "#include <Grove_LED_Bar.h>",
    INCLUDE_RGB_LCD: "#include <rgb_lcd.h>",
    INCLUDE_LIQUID_CRYSTAL_I2C: "#include <LiquidCrystal_I2C.h>",
    INCLUDE_RGB_LED_MATRIX: "#include <grove_two_rgb_led_matrix.h>",
    INCLUDE_SEEED_OLED: "#include <SeeedOLED.h>",
    INCLUDE_TM1637: "#include <TM1637.h>",
    INCLUDE_SERVO: "#include <Servo.h>",
    INCLUDE_GROVE_I2C_MOTOR_DRIVER: "#include <Grove_I2C_Motor_Driver.h>",
    INCLUDE_SPARK_FUN_MINI_MOTO: "#include <SparkFunMiniMoto.h>",
    INCLUDE_DUAL_MC33926_MOTOR_SHIELD: "#include <DualMC33926MotorShield.h>",
    INCLUDE_ADAFRUIT_BMP280: "#include <Adafruit_BMP280_I2C.h>",
    INCLUDE_ADAFRUIT_INA219: "#include <Adafruit_INA219.h>",
    INCLUDE_ADAFRUIT_SGP30: "#include <Adafruit_SGP30.h>",
    INCLUDE_ADAFRUIT_SI1145: "#include <Adafruit_SI1145.h>",
    INCLUDE_ADAFRUIT_TCS34725: "#include <Adafruit_TCS34725.h>",
    INCLUDE_ADAFRUIT_VC0706: "#include <Adafruit_VC0706.h>",
    INCLUDE_AIR_QUALITY_SENSOR: "#include <Air_Quality_Sensor.h>",
    INCLUDE_DHT: "#include <DHT.h>",
    INCLUDE_DPS310: "#include <Dps310.h>",
    INCLUDE_HIGH_TEMP: "#include <High_Temp.h>",
    INCLUDE_MAX6675: "#include <max6675.h>",
    INCLUDE_MULTICHANNEL_GAS_SENSOR: "#include <MutichannelGasSensor.h>",
    INCLUDE_MULTICHANNEL_GAS_GMXXX: "#include <Multichannel_Gas_GMXXX.h>",
    INCLUDE_PAJ7620: "#include <paj7620.h>",
    INCLUDE_TH02_DEV: "#include <TH02_dev.h>",
    INCLUDE_SCD30: "#include <SCD30.h>",
    INCLUDE_SHT31: "#include <SHT31.h>",
    INCLUDE_ULTRASONIC: "#include <Ultrasonic.h>",
    INCLUDE_SEEED_BME680: "#include <seeed_bme680.h>",
    INCLUDE_SEEED_HM330X: "#include <Seeed_HM330X.h>",
    INCLUDE_SEEED_GROVE_MP3: "#include <SeeedGroveMP3.h>"
};

const EXCLUDED_COMMENTS = [];

export default {LIB_IMPORT, EXCLUDED_COMMENTS};