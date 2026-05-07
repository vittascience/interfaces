/**
 * @fileoverview English messages for Raspberry Pi. (EN)
 */
'use strict';

// Notes
Blockly.Msg["NOTE_C"] = "C";
Blockly.Msg["NOTE_C_SHARP"] = "C#";
Blockly.Msg["NOTE_D"] = "D";
Blockly.Msg["NOTE_D_SHARP"] = "D#";
Blockly.Msg["NOTE_E"] = "E";
Blockly.Msg["NOTE_F"] = "F";
Blockly.Msg["NOTE_F_SHARP"] = "F#";
Blockly.Msg["NOTE_G"] = "G";
Blockly.Msg["NOTE_G_SHARP"] = "G#";
Blockly.Msg["NOTE_A"] = "A";
Blockly.Msg["NOTE_A_SHARP"] = "A#";
Blockly.Msg["NOTE_B"] = "B";
Blockly.Msg["MUSIC_SILENCE"] = "Silence";

// Display - Sense HAT - LED matrix
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
// Display - LCD
Blockly.Msg["DISPLAY_LCD_SETTEXT_TITLE"] = "[LCD address %1] show text %2 on line %3 position %4";
Blockly.Msg["DISPLAY_LCD_SETTEXT_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Show text on the grove lcd 1602 display. Connect lcd on I2C port.";
Blockly.Msg["DISPLAY_LCD_CLEAR_TITLE"] = "[LCD address %1] clear display";
Blockly.Msg["DISPLAY_LCD_CLEAR_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Enable to clear the entire lcd text. Connect lcd on I2C port.";
// Display - Neopixel
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TITLE"] = "[Neopixel] define %1 LED on pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to define LED number of neopixel. This block have to be used in setup.";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TITLE"] = "[Neopixel] set LED %1 to R %2 G %3 B %4 on pin %5";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control each LED color of neopixels as (R,G,B) from 0 to 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE"] = "[Neopixel] set LED %1 to %2 on pin %3";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control each LED color of neopixel.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[Neopixel] set all LED to colour R %1 G %2 B %3 on pin %4";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control all LED of neopixel to the choosed colour value as (R,G,B) from 0 to 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[Neopixel] set all LED to colour %1 on pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to control all LED of neopixel to the choosed colour value.";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TITLE"] = "[Neopixel] set a rainbow on pin %1";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Enable to show a rainbow on neopixel module, set pin and the number of LED.";
// Display - LED modules
Blockly.Msg["DISPLAY_SETGROVELED_TITLE"] = "[LED] control LED to state %1 on pin %2";
Blockly.Msg["DISPLAY_SETGROVELED_TOOLTIP"] = IMG_MODULE_LED + Blockly.Tooltip.SEP + "Enable to switch on or switch off the LED socket kit Grove (0 or 1) on digital pins.";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TITLE"] = "[LED] set LED intensity to %1 (%) on pin %2";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TOOLTIP"] = IMG_MODULE_LED_PWM + Blockly.Tooltip.SEP + "Enable to set the LED intensity from 0 to 100% on PWM pins.";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TITLE"] = "[Variable Color LED] set intensity to %1 (%) on pin %2";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP"] = IMG_MODULE_LED_VARIABLE_COLOR + Blockly.Tooltip.SEP + "Enable to set the LED intensity from 0 to 100 (%) on PWM pins. When using the module for the first time, RGB are set to 0. Use a screwdriver on R, G or B behind module to control LED color.";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TITLE"] = "[4-Digit module] show %1 %2 on pins CLK %3 DIO %4";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Enable to show numbers or temperature on grove 4-digit display (TM1637) on digital pins.";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TITLE"] = "[4-Digit module] show clock on pins CLK %1 DIO %2";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Enable to show clock on grove 4-digit display (TM1637) on digital pins. Warning, getting real clock is possible only if ESP32 stay in power on mode.";
Blockly.Msg["DISPLAY_4DIGIT_NUMBER"] = "number";
Blockly.Msg["DISPLAY_4DIGIT_TEMPERATURE"] = "temperature";

// Input/Output - Time
Blockly.Msg["IO_WAIT_TITLE"] = "wait %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stop the code execution (duration in seconds or milliseconds).";
Blockly.Msg["IO_WAIT_SECOND"] = "second(s)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisecond(s)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "microsecond(s)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "wait until %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stop the code execution until the satisfied condition.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initialize the chronometer";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Allows you to initialize the chronometer (in seconds).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "get chronometer in %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returns the chronometer value from the initialization in seconds or milliseconds.";
Blockly.Msg['IO_DATETIME_YMD_HMS_TITLE'] = 'current timestamp (YMD_HMS)';
Blockly.Msg['IO_DATETIME_YMD_HMS_TOOLTIP'] = 'Returns the current timestamp in a string in the format: YMD_HMS (year month day hour minutes seconds). Very useful for naming a picture file, for example.';
// IO - Sense HAT - Joystick
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] wait for joystick event';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Waits for an event on the Sense HAT joystick.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] get %1 from joystick event";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains the direction or action from a joystick event.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "direction";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "action";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] get array of joystick events";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains an array containing a list of joystick events.";
// IO - Pins
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HIGH (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LOW (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returns boolean value (1 if HIGH or 0 if LOW).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "read digital pin %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Enable to read the digital value of pins (0 or 1).";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "write state %1 on digital pin %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Enable to write the value (0 or 1) on digital pin.";
Blockly.Msg["IO_WRITEPWMPIN_TITLE"] = "write value %1 on PWM pin %2";
Blockly.Msg["IO_WRITEPWMPIN_TOOLTIP"] = "Enable to apply PWM signal with fixed 5kHz-frequency. You can change value from 0 to 1023. 512 will be 50% of duty cycle, as around 1.66V.";
Blockly.Msg["IO_SETPWM_TITLE"] = "apply a square signal of %1 (Hz) frequency on pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Enable to apply a PWM square signal with 50% of duty cycle. You can change frequency of the signal.";
Blockly.Msg["IO_STOPPWM_TITLE"] = "stop PWM signal of pin %1";
Blockly.Msg["IO_STOPPWM_TOOLTIP"] = "Enable to stop applied PWM signal of a pin.";
// Input/Output - External modules
Blockly.Msg["IO_GETGROVEBUTTON_TITLE"] = "[Button Module] button state on pin %1 ";
Blockly.Msg["IO_GETGROVEBUTTON_TOOLTIP"] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + "Returns grove button state (0 or 1) on digital pins.";
Blockly.Msg["IO_GETGROVESWITCH_TITLE"] = "[Switch Module] switch state on pin %1 ";
Blockly.Msg["IO_GETGROVESWITCH_TOOLTIP"] = IMG_MODULE_SWITCH + Blockly.Tooltip.SEP + "Returns grove switch state (0 or 1) on digital pins.";
Blockly.Msg['IO_GETMAGNETICSWITCH_TITLE'] = '[Magnetic switch module] state on pin %1';
Blockly.Msg['IO_GETMAGNETICSWITCH_TOOLTIP'] = IMG_MODULE_MAGNETIC_SWITCH + Blockly.Tooltip.SEP + 'Returns the value of the Grove magnetic switch (0 or 1) on digital pins.';
Blockly.Msg["IO_GETGROVETACTILE_TITLE"] = "[Touch Sensor] touch state on pin %1 ";
Blockly.Msg["IO_GETGROVETACTILE_TOOLTIP"] = IMG_MODULE_TOUCH + Blockly.Tooltip.SEP + "Returns grove touch sensor state (0 or 1) on digital pins.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TITLE"] = "[Colored Button Module] state on pin SIG2 %1";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Returns grove colored button state (0 or 1) on digital pins.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TITLE"] = "[Colored Button Module] control LED to state %1 on pin SIG1 %2";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Enable to switch on or switch off the LED Button Grove (0 or 1) on digital pins.";

// Communication - Serial connection - Raspberry Pi
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'write to console %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Allows writing data to the console.';
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "write graph";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "This block makes it possible to write (digital) data that will be visible in the plotter. It can be used with one or more blocks in \"Name\" and \"Data\" format. Click on icon 'Graphic mode' to display graphics.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Name %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "This block is to be used in the \"Write in graphic\" block. It must contain the name of the (text) value to display and the value in question.";

Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperature';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humidity (%)';
Blockly.Msg['SENSORS_TEMPERATURE_IN'] = 'en';
// Sensors - Cameras
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[RPI Camera] take a picture';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Takes a picture with the Raspberry Pi camera and returns the picture data as a NumPy array with dimensions (height, width, 3).';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[RPi Camera] take a video for %1 second.s in %2';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Allows you to take a video with the Raspberry Pi camera and save it to an .mp4 file. By default, the size is (640, 480)';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TITLE'] = '[RPi Camera] set the image size to %1';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Allows you to configure the size of the images taken with the Raspberry Pi camera. By default, the size is (640, 480).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TITLE'] = '[USB Camera] take a picture';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TOOLTIP'] = 'Allows you to take a picture with a camera connected to a USB port on the Raspberry Pi. This block returns the picture data as a NumPy array with dimensions (height, width, 3).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TITLE'] = '[USB Camera] take a video for %1 second.s in %2';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TOOLTIP'] = 'Allows you to take a video with a camera connected to a USB port on the Raspberry Pi and save it to an .mp4 file. By default, the size is (640, 480)';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TITLE'] = '[USB Camera] set the image size to %1';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TOOLTIP'] = 'Allows you to configure the size of images taken with a camera connected to a USB port on the Raspberry Pi. By default, the size is (640, 480).';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TITLE'] = '[Cameras] save photo %1 to file %2';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TOOLTIP'] = 'Allows you to save the data from the photo taken by a camera to a .jpg file in the ~/vittascience-api/workspace/static/images folder on the Raspberry Pi.';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TITLE'] = '[Cameras] display photo %1 in Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TOOLTIP'] = 'Allows you to display the photo taken by a camera connected to the Raspberry Pi in the Vittascience interface. You can use the photo data in a variable or directly the filename of the image to display.';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TITLE'] = '[Cameras] Display video %1 in Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TOOLTIP'] = 'Allows you to display the video taken by a camera connected to the Raspberry Pi in the Vittascience interface. Use the filename of the video to display directly.';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TITLE'] = '[Cameras] list of recorded images';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TOOLTIP'] = 'Provides a list of photos taken by a camera and saved on the Raspberry Pi in the folder ~/vittascience-api/workspace/static/images.';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TITLE'] = '[Cameras] list of recorded videos';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TOOLTIP'] = 'Provides a list of videos taken by a camera and saved on the Raspberry Pi in the folder ~/vittascience-api/workspace/static/videos.';
// Sense HAT - sensors
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] temperature in %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K) from the Sense HAT temperature sensor.';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] ' + Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the humidity (in %) from the Sense HAT humidity sensor.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] temperature in %1 from %2 sensor';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Returns the temperature in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K) from the Sense HAT humidity or pressure sensor.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'pressure';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] pressure in %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returns the pressure (in millibars) from the Sense HAT pressure sensor.';
// Sense HAT - IMU 
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 gyroscope %2 %3 accelerometer %4 %5 compass';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Configures the Sense HAT IMU (inertial measurement unit) sensors.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'enable';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'disable';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TITLE'] = '[Sense HAT] orientation in %1 (x, y, z)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Obtains the orientation in radians or degrees (pitch, roll, yaw) from the Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS'] = 'radians';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES'] = 'degrees';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TITLE'] = '[Sense HAT] get orientation in degrees (x, y, z)';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Obtains the orientation in degrees (pitch, roll, yaw) from the Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] get compass orientation";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Obtains the compass orientation from the Sense HAT.";
// Sensors - Gas
Blockly.Msg["SENSORS_SGP30_READDATA_TITLE"] = "[SGP30 Sensor] gas %1";
Blockly.Msg["SENSORS_SGP30_READDATA_TOOLTIP"] = IMG_MODULE_SGP30 + Blockly.Tooltip.SEP + "Returns the amount of CO2 (in ppm) or TVOC (in ppb) in the air from sgp30 sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_SGP30_CO2"] = "carbon dioxide (CO2) (ppm)";
Blockly.Msg["SENSORS_SGP30_TVOC"] = "volatile organic compounds (TVOC) (ppb)";
Blockly.Msg["SENSORS_SCD30_READDATA_TITLE"] = "[SCD30 Sensor] %1";
Blockly.Msg["SENSORS_SCD30_READDATA_TOOLTIP"] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + "Returns CO2 concentration (in ppm), humidity (in %) or temperature in Celsius (°C), Fahrenheit (°F) or Kelvin (K) from the grove SCD30 sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_SCD30_CO2"] = "carbon dioxide (CO2) (ppm)";
Blockly.Msg['SENSORS_SCD30_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_SCD30_HUM'] = Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TITLE"] = "[HM330X Sensor] concentration of particle matter %1 (µg/m3)";
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TOOLTIP"] = IMG_MODULE_HM330X + Blockly.Tooltip.SEP + "Detect the density of particles in the air with the HM330X sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_HM330X_ATM_PM1"] = "PM1.0";
Blockly.Msg["SENSORS_HM330X_ATM_PM2_5"] = "PM2.5";
Blockly.Msg["SENSORS_HM330X_ATM_PM10"] = "PM10.0";
// Sensors - Climate
Blockly.Msg["SENSORS_BMP280_READDATA_TITLE"] = "[BMP280 Sensor %1] %2";
Blockly.Msg["SENSORS_BMP280_READDATA_TOOLTIP"] = IMG_MODULE_BMP280 + Blockly.Tooltip.SEP + "Returns the ambient temperature in Celius degree (°C), Fahrenheit (°F) or Kelvin (K), pressure (in Pa). The altitude is initialized at 0 when program is flashed. It use Grove Barometer Sensor (address: 0x77, color: blue) or HW-611 280 sensor (address: 0x76, color: purple). Connect sensor on I2C port.";
Blockly.Msg["SENSORS_BMP280_TEMP"] = "temperature";
Blockly.Msg["SENSORS_BMP280_PRESS"] = "pressure (Pa)";
Blockly.Msg["SENSORS_BMP280_ALT"] = "altitude (m)";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TITLE"] = "[DS18B20 Sensor] temperature in %1 on pin %2";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP"] = IMG_MODULE_DS18B20 + Blockly.Tooltip.SEP + "Returns the DS18B20 waterproof temperature sensor value in Celius degree (°C), Fahrenheit (°F) or Kelvin (K) on digital pins.";
Blockly.Msg["SENSORS_DHT11_READDATA_TITLE"] = "[DHT11 Sensor] %1 on pin %2";
Blockly.Msg["SENSORS_DHT11_READDATA_TOOLTIP"] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + "Returns temperature in Celius degree (°C), Fahrenheit (°F) or Kelvin (K), or air humidity (in %) from dht11 sensor on digital pins.";
Blockly.Msg["SENSORS_DHT22_READDATA_TITLE"] = "[DHT22 Sensor] %1 on pin %2";
Blockly.Msg["SENSORS_DHT22_READDATA_TOOLTIP"] = IMG_MODULE_DHT22 + Blockly.Tooltip.SEP + "Returns temperature in Celius degree (°C), Fahrenheit (°F) or Kelvin (K), or air humidity (in %) with good accuracy from dht22 sensor on digital pins.";
Blockly.Msg["SENSORS_SHT31_READDATA_TITLE"] = "[SHT31 Sensor] %1";
Blockly.Msg["SENSORS_SHT31_READDATA_TOOLTIP"] = IMG_MODULE_SHT31 + Blockly.Tooltip.SEP + "Returns temperature in Celsius degree (°C), Fahrenheit (°F) or Kelvin (K), or air humidity (in %) from SHT31 sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_GETRAINGAUGE_TITLE"] = "[Rain Gauge sensor] state value on pin %1";
Blockly.Msg["SENSORS_GETRAINGAUGE_TOOLTIP"] = IMG_MODULE_RAIN_GAUGE + Blockly.Tooltip.SEP + "Returns rain gauge grove state (1 if it's raining or 0 else) on digital pins.";
Blockly.Msg["SENSORS_GETANEMOMETER_TITLE"] = "[Anemometer] state value on pin %1";
Blockly.Msg["SENSORS_GETANEMOMETER_TOOLTIP"] = IMG_MODULE_ANEMOMETER + Blockly.Tooltip.SEP + "Returns grove anemometer state (twice state HIGH on each rotation) on digital pins.";
// Sensors - Sound & Light
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TITLE"] = "[Sunlight Sensor %1] get %2";
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TOOLTIP"] = IMG_MODULE_SI1145 + Blockly.Tooltip.SEP + "Returns Ultraviolet light index, IR light (in lumen) or Visible light (in lumen) from si1145 sensor. It works with Grove Sunlight Sensor or GY1145 sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_SUNLIGHT_UV"] = "UV index";
Blockly.Msg["SENSORS_SUNLIGHT_VISIBLE"] = "visible (lumen)";
Blockly.Msg["SENSORS_SUNLIGHT_IR"] = "infrared (lumen)";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TITLE"] = "[Color Sensor V2] %1";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TOOLTIP"] = IMG_MODULE_I2C_COLOR + Blockly.Tooltip.SEP + "Lets you read the level of one of the three primary colors with the Grove color sensor V2, returns a level between 0 and 255.";
// Sensors - Distance & Motion
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TITLE"] = "[Ultrasonic Sensor %1] get %2";
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TOOLTIP"] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + "Returns distance measurement (in centimeters) from the ultrasonic ranger sensor on digital pins. Warning, if it's a grove sensor, TRIG and ECHO are both connected to SIG.";
Blockly.Msg["SENSORS_ULTRASONIC_DISTANCE"] = "distance (cm)";
Blockly.Msg["SENSORS_ULTRASONIC_DURATION"] = "round-trip duration (µs)";
Blockly.Msg["SENSORS_ULTRASONIC_1PIN"] = "on pin";
Blockly.Msg["SENSORS_ULTRASONIC_2PINS"] = "on pins ";
Blockly.Msg["SENSORS_GETGESTURE_TITLE"] = "[Gesture Sensor] gesture type";
Blockly.Msg["SENSORS_GETGESTURE_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Returns the gesture type ('right', 'left', 'up', 'down', 'forward', 'backward', 'clockwise', 'anticlockwise') from grove gesture sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TITLE"] = "[Gesture Sensor] on gesture %1 detected then";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Execute instructions if selected gesture id detected by the grove gesture sensor. Connect sensor on I2C port.";
Blockly.Msg["SENSORS_GESTURE_RIGHT"] = "right";
Blockly.Msg["SENSORS_GESTURE_LEFT"] = "left";
Blockly.Msg["SENSORS_GESTURE_UP"] = "up";
Blockly.Msg["SENSORS_GESTURE_DOWN"] = "down";
Blockly.Msg["SENSORS_GESTURE_FORWARD"] = "forward";
Blockly.Msg["SENSORS_GESTURE_BACKWARD"] = "backward";
Blockly.Msg["SENSORS_GESTURE_CLOCKWISE"] = "clockwise";
Blockly.Msg["SENSORS_GESTURE_ANTICLOCKWISE"] = "anticlockwise";
Blockly.Msg["SENSORS_GESTURE_WAVE"] = "wave";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TITLE"] = "[Line Finder Sensor] line finder state on pin %1";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TOOLTIP"] = IMG_MODULE_LINE_FINDER + Blockly.Tooltip.SEP + "Returns grove touch sensor state (0 or 1) on digital pins.";
Blockly.Msg["SENSORS_GETGROVEMOTION_TITLE"] = "[PIR Motion Sensor] movement state value on pin %1";
Blockly.Msg["SENSORS_GETGROVEMOTION_TOOLTIP"] = IMG_MODULE_MOTION + Blockly.Tooltip.SEP + "Returns grove PIR Motion state (0 if there is movement or 1 else) on digital pins.";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TITLE"] = "[Piezo Vibration Sensor] state value on pin %1";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TOOLTIP"] = IMG_MODULE_VIBRATIONS + Blockly.Tooltip.SEP + "Returns vibration state (0 or 1) from piezo vibration grove sensor on digital pins.";
Blockly.Msg["SENSORS_GETGROVETILT_TITLE"] = "[Tilt Module] tilt state on pin %1";
Blockly.Msg["SENSORS_GETGROVETILT_TOOLTIP"] = IMG_MODULE_TILT + Blockly.Tooltip.SEP + "Returns grove tilt state (0 or 1) on digital pins.";

// Actuators - Motors
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TITLE"] = "[Servomotor] set angle to %1 on pin %2";
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TOOLTIP"] = IMG_MODULE_SERVO + Blockly.Tooltip.SEP + "Enable to control servo angle (from 0 to 180) on digital pins.";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE"] = "[Continuous Servomotor] set speed to %1 (%) direction %2 on pin %3";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP"] = IMG_MODULE_CONTINUOUS_SERVO + Blockly.Tooltip.SEP + "Enable to control continuous servo speed (from 0 to 100 %) on PWM pins.";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TITLE"] = "[Motor] set power to %1 on pin %2";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TOOLTIP"] = IMG_MODULE_MOTOR + Blockly.Tooltip.SEP + "Enable to control DC motor power (from 0 to 100 %) on digital pins. Warning, Raspberry Pï has to be powered by external batterie in order to provide enough energy to DC motor.";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE"] = "[Vibration motor] control motor to state %1 on pin %2";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP"] = IMG_MODULE_VIBRATION_MOTOR + Blockly.Tooltip.SEP + "Enable to control state of grove vibration motor (0 or 1) on digital pins.";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TITLE"] = "[Relay module] control relay to state %1 on pin %2";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TOOLTIP"] = IMG_MODULE_RELAY + Blockly.Tooltip.SEP + "Enable to control state grove relay module (0 or 1) on digital pins.";
// Actuators - MOSFET
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TITLE"] = "[MOSFET] set state to %1 on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Enable to set the state of MOSFET transistor to HIGH or LOW on the PWM pins.";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE"] = "[MOSFET] set value to %1 (%) on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Enable to control the MOSFET transistor cycle time (from 0 to 100 %) on PWM pins.";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TITLE"] = "[MOSFET] set cycle frequency to %1 (Hz) on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Enable to control MOSFET cycle frequency (in Hz) on PWM pins.";
// Actuators - Music
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TITLE"] = "[Buzzer/Speaker] play music %1 on %2";
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Enable to play the choosen music on Grove buzzer module (or speaker) on digital pins.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TITLE"] = "[Buzzer/Speaker] play notes on";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Enable to play notes on Grove buzzer module (or speaker) on digital pins.";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TITLE"] = "note %1 at octave %2 with duration %3";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Define a note with octave and duration.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE"] = "[Buzzer/Speaker] play frequency %1 during %2 (ms) on %3";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Enable to play integer frequency on Grove buzzer module (or speaker) on digital pins.";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TITLE"] = "[Buzzer/Speaker] stop music on %1";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Enable to stop music from Grove buzzer module (or speaker) on digital pins.";

// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Raspberry Pi server] hostname %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Allow the interface to recover the name of your Raspberry Pi card and configure the Raspberry Pi OS installation instructions. Il permet de faire le lien avec le serveur python qui tourne sur la carte pour communiquer avec l\'interface.';

// Robots - units
Blockly.Msg['ROBOTS_GO_FORWARD'] = 'move forward';
Blockly.Msg['ROBOTS_GO_BACKWARD'] = 'move backward';
// Robots - Yahboom GATank - Detection
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TITLE'] = '[Yahboom G1 - Ultrasonic] %1';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Measures the distance (in cm) or the round-trip time of the wave (in µs) in front of the Yahboom G1 Tank robot with the ultrasonic sensor.';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TITLE'] = '[Yahboom G1 - black line] sensor state %1';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Returns the state of one of the four infrared black line sensors (0 or 1) located under the Yahboom G1 Tank robot. The names P1, P2, P3, or P3 are printed under the robot.';
// Robots - Yahboom GATank - Control
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE'] = '[Yahboom G1] control the front LEDs %1 to %2';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to control the two front LEDs of the Yahboom G1 Tank robot by turning red, green, or blue on/off.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE'] = '[Yahboom G1] control the RGB LEDs at R %1 G %2 B %3';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to control the two RGB LEDs on the front of the Yahboom G1 Tank robot with the values ​​R, G, and B (from 0 to 255).';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE'] = '[Yahboom G1] control the RGB LEDs at %1';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Enables control of the two RGB LEDs at the front of the Yahboom G1 Tank robot by selecting a color from the palette.';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE'] = '[Front servo motor] Controls the PAN angle to %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Controls the angle (PAN) of the front servo motor (from 0 to 180) of the Yahboom G1 Tank robot.';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TITLE'] = '[Yahboom G1 - KEY Button] Wait for a press';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Waits for the KEY button on the Yahboom G1 Tank robot\'s board to be pressed.';
// Robots - Yahboom G1 Tank - Moving
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TITLE'] = '[Yahboom G1 Tank] %1 at speed %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to control the motors of the Yahboom G1 Tank robot to move it forward or backward at a speed between 0 and 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TITLE'] = '[Yahboom G1 Tank] stop the robot\'s motors';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to stop the motors of the Yahboom G1 Tank robot.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TITLE'] = '[Yahboom G1 Tank] rotate at %1 speed %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to control the motors of the Yahboom G1 Tank robot to rotate it (left or right) at a speed between 0 and 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_LEFT'] = 'left';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TITLE'] = '[Yahboom G1 Tank] rotate at %1 speed %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows you to control the motors of the Yahboom G1 Tank robot to rotate it (left or right) at a speed between 0 and 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE'] = '[Yahboom G1 Tank] control motor %1 direction %2 speed %3 (%)';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows control of the right and left motors by changing the direction (↻: FORWARD, ↺: BACKWARD) and speed (from 0 to 100%) of the Yahboom G1 Tank robot.';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_LEFT'] = 'left';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_BOTH'] = 'left & right';
// Robots - Yahboom G1Tank - Camera
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE'] = '[Camera Servomotors] control the PAN angle to %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows control of the angle (PAN - horizontal) of the servomotor of the USB camera module (from 0 to 180) of the Yahboom G1 Tank robot.';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE'] = '[Camera Servomotors] control the TILT angle at %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Allows control of the angle (TILT - vertically) of the servomotor of the USB camera module (from 0 to 180) of the Yahboom G1 Tank robot.';
