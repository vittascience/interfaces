/**
 * @fileoverview English messages for Raspberry pi. (EN)
 */

'use strict';

// Raspberry pi
// Communication - Serial connection - Raspberry Pi
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Allows writing data to the console.';
// Input/Output - Raspberry Pi
Blockly.Msg['IO_WAIT_TITLE'] = 'wait %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pauses the code execution.';
Blockly.Msg['IO_WAIT_SECOND'] = 'second(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'wait until %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Halts code execution until the condition is met.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'start the stopwatch';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initializes a stopwatch at 0 (in seconds).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'stopwatch value in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returns the stopwatch value from initialization (in seconds or milliseconds).';
// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[raspberry] hostname %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Retrieves the hostname of the Raspberry Pi.';
// Actuators - Raspberry Pi
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE'] = '[Buzzer/Speaker] play frequency %1 for %2 (ms) on %3';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Allows playing a frequency with a Grove buzzer (or speaker) module on the PWM pins of the GrovePi HAT.';
// Display Raspberry Pi
Blockly.Msg['DISPLAY_LCD_SETTEXT_TITLE'] = '[LCD] display text %1 on line %2 position %3';
Blockly.Msg['DISPLAY_LCD_SETTEXT_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Displays text on one of the two lines of the Grove LCD1602 screen. Connect the module to an I2C port of the GrovePi HAT.';
Blockly.Msg['DISPLAY_LCD_CLEAR_TITLE'] = '[LCD] clear the screen';
Blockly.Msg['DISPLAY_LCD_CLEAR_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Clears all characters from the LCD screen. Connect the module to an I2C port of the GrovePi HAT.';
// Display - Neopixel Raspberry Pi
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TITLE'] = '[Neopixel] define %1 LED on pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Defines the number of LEDs in the Neopixel. This block should be used within the "On start" block.';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TITLE'] = '[Neopixel] control LED %1 with R %2 G %3 B %4 on pin %5';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Allows controlling the color of each Neopixel LED using RGB values from 0 to 255.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Neopixel] control LED %1 with %2 on pin %3';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Allows controlling the color of each Neopixel LED using the color palette.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE'] = '[Neopixel] control all LEDs with R %1 G %2 B %3 on pin %4';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Allows controlling all Neopixel LEDs to the selected color using RGB values from 0 to 255.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE'] = '[Neopixel] control all LEDs with %1 on pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Allows controlling all Neopixel LEDs to the selected color using the color palette.';
// Sensors Raspberry Pi
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TITLE'] = '[Ultrasonic Sensor] get distance on pin %1';
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TOOLTIP'] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + 'Returns the distance (in cm) measured by the Grove ultrasonic sensor on the digital pins of the GrovePi HAT.';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TITLE'] = '[Moisture Sensor] soil moisture on pin %1';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TOOLTIP'] = IMG_MODULE_MOISTURE + Blockly.Tooltip.SEP + 'Returns the moisture level (from 0 to 65535) measured by the Grove moisture sensor on the analog pins of the GrovePi HAT.';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TITLE'] = '[Temperature Sensor] temperature in %1 on pin %2';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TOOLTIP'] = IMG_MODULE_TEMPERATURE + Blockly.Tooltip.SEP + 'Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K) from the Grove temperature sensor on the analog pins of the GrovePi HAT.';
Blockly.Msg['SENSORS_DHT11_READDATA_TITLE'] = '[DHT11 Sensor] %1 on pin %2';
Blockly.Msg['SENSORS_DHT11_READDATA_TOOLTIP'] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + 'Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K), or the humidity (in %) from the Grove DHT11 sensor on the PWM pins of the GrovePi HAT.';
Blockly.Msg['SENSORS_GETGROVELIGHT_TITLE'] = '[Light Sensor] light intensity on pin %1';
Blockly.Msg['SENSORS_GETGROVELIGHT_TOOLTIP'] = IMG_MODULE_LIGHT + Blockly.Tooltip.SEP + 'Returns the light intensity (from 0 to 65535) measured by the Grove light sensor on the analog pins of the GrovePi HAT.';
Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperature';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humidity (%)';
// SenseHat
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] temperature in %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K) from the Sense HAT temperature sensor.';
// TEMPERATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humidity';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the humidity (in %) from the Sense HAT humidity sensor.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] temperature in %1 from %2 sensor';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K) from the Sense HAT humidity or pressure sensor.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_HUMIDITY'] = 'humidity';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'pressure';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humidity';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the humidity (in %) from the Sense HAT humidity sensor.';
// TEMPERATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] pressure in %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the pressure (in millibars) from the Sense HAT pressure sensor.';
// Display
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TITLE'] = '[Sense HAT] set pixel at x %1 and y %2, R %3 G %4 B %5';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sets the color of a pixel on the Sense HAT with an RGB color.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE'] = '[Sense HAT] set pixel at x %1 y %2 with color %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sets the color of a pixel on the Sense HAT using a color from the palette.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE'] = "[Sense HAT] set image %1 with %2 on background %3";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Defines an image on the Sense HAT LED matrix using RGB colors.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TITLE'] = '[Sense HAT] color of pixel at x %1 and y %2';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Retrieves the color of a pixel on the Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TITLE'] = '[Sense HAT] get colors of pixels';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Retrieves the colors of pixels on the Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TITLE'] = '[Sense HAT] clear display';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Clears the LED display on the Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE'] = '[Sense HAT] clear display with color %1';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Clears the LED display on the Sense HAT with an RGB color.';
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE'] = "[Sense HAT] show image with color %1";
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Displays an image on the Sense HAT LED matrix using RGB colors.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE'] = '[Sense HAT] show message %1 at speed %2 with color %3 and background %4';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Displays a message on the Sense HAT LED matrix with an RGB color.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE'] = '[Sense HAT] show letter %1 with color %2 on background %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Displays a letter on the Sense HAT LED matrix with an RGB color.';
// IO
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] wait for joystick event';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Waits for an event on the Sense HAT joystick.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] get %1 from joystick event";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains the direction or action from a joystick event.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "direction";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "action";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] get array of joystick events";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains an array containing a list of joystick events.";
// IMU 
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 gyroscope %2 %3 accelerometer %4 %5 compass';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Configures the Sense HAT IMU (inertial measurement unit) sensors.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'enable';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'disable';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TITLE'] = '[Sense HAT] get orientation in radians (pitch, roll, yaw)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Obtains the orientation in radians (pitch, roll, yaw) from the Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS'] = 'radians';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES'] = 'degrees';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TITLE'] = '[Sense HAT] get orientation in degrees (x, y, z)';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Obtains the orientation in degrees (pitch, roll, yaw) from the Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] get compass orientation";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains the compass orientation from the Sense HAT.";
// Raspberry Pi Camera
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[Raspberry Pi Camera] take a picture';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Allows taking a picture with the Raspberry Pi camera.';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[Raspberry Pi Camera] take a video for %1 seconds';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Allows taking a video with the Raspberry Pi camera.';
