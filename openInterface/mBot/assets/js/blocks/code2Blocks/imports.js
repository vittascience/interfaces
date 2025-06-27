import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_mCore.js'; // mCore blocks
import '/openInterface/mBot/assets/js/blocks/code2Blocks/ast_communication.js'; // communication blocks


const LIB_IMPORT = {
    // Standard includes
    INCLUDE_MATH: "#include <math.h>",
    INCLUDE_PRINTF: "#include <printf.h>",

    // Material includes for Arduino
    INCLUDE_ARDUINO: "#include <Arduino.h>",
    INCLUDE_AVR_PGMSPACE: "#include <avr/pgmspace.h>",
    INCLUDE_SOFTWARE_SERIAL: "#include <SoftwareSerial.h>",
    INCLUDE_SOFTWARE_SERIAL_2: "#include <SoftwareSerial2.h>",
    INCLUDE_SPI: "#include <SPI.h>",
    INCLUDE_VIRTUAL_WIRE: "#include <VirtualWire.h>",
    INCLUDE_WIRE: "#include <Wire.h>",
    INCLUDE_SERVO: "#include <Servo.h>",

    // Robots modules
    INCLUDE_MEMCORE: "#include <MeMCore.h>"
};

const EXCLUDED_COMMENTS = ["Me7SegmentDisplay on PORT_","Neopixel on PORT_","RGB LED on PORT_","Maximum brightness", "LED Matrix on PORT_","Waterproof Sensor on PORT_", "Flame Sensor on PORT_","MQ2 Sensor on PORT_","Sound Sensor on PORT_","Color Sensor on PORT_","Light Sensor on PORT_","Compass on PORT_","Motion Sensor on PORT_","Servo on PORT_","Ultrasonic on ", "Line Finder on"]
const RESERVED_WORD = ["drawTemp"]

export default {LIB_IMPORT, EXCLUDED_COMMENTS, RESERVED_WORD};