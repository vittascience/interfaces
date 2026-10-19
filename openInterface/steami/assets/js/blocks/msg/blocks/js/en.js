/**
 * @fileoverview English messages for STeaMi. (EN)
 */
'use strict';

// Display - STeaMi OLED (128x128)
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TITLE'] = '[Ecran] afficher le texte %1 à la position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP'] = 'Permet d\'écrire du texte sur un l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TITLE'] = '[Ecran] contrôler le pixel x %1 y %2 état %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP'] = 'Permet de contrôler chaque pixel de l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TITLE'] = '[Ecran] dessiner une ligne de (%1, %2) à (%3, %4)';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP'] = 'Permet de dessiner une ligne entre deux points de l\'écran OLED de la carte STeaMi de taille 128x128.';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE'] = '[Ecran] définir le fond en %1';
Blockly.Msg['DISPLAY_STEAMI_OLED_WHITE'] = 'blanc';
Blockly.Msg['DISPLAY_STEAMI_OLED_BLACK'] = 'noir';
Blockly.Msg['DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP'] = 'Permet d\'inverser le rétroélcairage de l\'écran.';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE'] = '[Ecran] effacer l\'écran';
Blockly.Msg['DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP'] = 'Permet d\'effacer le contenu de l\'écran OLED.';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TITLE'] = '[Ecran] afficher l\'icône %1 position x %2 y %3';
Blockly.Msg['DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP'] = 'Permet d\'afficher une icône de la librairie Image de STM32, à la position (x,y) sur l\'écran grove OLED. Brancher l\'afficheur sur un port I2C.';
// Input/Output - STeaMi Buttons
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TITLE'] = 'if button %1 is %2 then';
Blockly.Msg['IO_STEAMI_ONSWITCHBUTTONPRESSED_TOOLTIP'] = 'Allows executing instructions based on the state of the buttons integrated into the STeaMi board (A, B, Menu, Up, Down, Left, Right).';
// Sensors - STeaMi APDS9960 - Ambient Light / Proximity / Gesture
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TITLE"] = "[APDS9960] %1";
Blockly.Msg["SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP"] = "Returns the ambient light level (in lux), the measured distance (maximum 100 mm), or the detected gesture (left, right, up, down, near, far, or 'unknown' if no gesture detected) from the APDS9960 sensor";
Blockly.Msg["SENSORS_STEAMI_APDS9960_AMBIENTLIGHT"] = "ambient light";
Blockly.Msg["SENSORS_STEAMI_APDS9960_PROXIMITY"] = "distance";
Blockly.Msg["SENSORS_STEAMI_APDS9960_GESTURE"] = "gesture";
// Sensors - STeaMi HTS221 - Read Data
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TITLE"] = "[HTS221] %1";
Blockly.Msg["SENSORS_STEAMI_HTS221_TEMPERATURE"] = "temperature";
Blockly.Msg["SENSORS_STEAMI_HTS221_HUMIDITY"] = "humidity";
Blockly.Msg["SENSORS_STEAMI_HTS221_READDATA_TOOLTIP"] = "Returns data from the HTS221 sensor (temperature in °C or humidity in %)";
// Sensors - STeaMi VL53L1X - Read Distance
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TITLE"] = "[VL53L1X] distance (%1)";
Blockly.Msg["SENSORS_STEAMI_VL53L1X_READ_TOOLTIP"] = "Returns the distance measured by the VL53L1X sensor in millimeters, centimeters, or meters";
// Sensors - STeaMi BQ27441 - Read Data
Blockly.Msg["SENSORS_STEAMI_BQ27441_READDATA_TITLE"] = "[BQ27441] %1";
Blockly.Msg["SENSORS_STEAMI_BQ27441_READDATA_TOOLTIP"] = "Returns battery data measured by the BQ27441 sensor";
Blockly.Msg["SENSORS_STEAMI_BQ27441_SOC"] = "state of charge (%)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_VOLTAGE"] = "voltage (mV)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_CURRENT"] = "average current (mA)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_FULL_CAPACITY"] = "full capacity (mAh)";
Blockly.Msg["SENSORS_STEAMI_BQ27441_REMAINING_CAPACITY"] = "remaining capacity (mAh)";
// Sensors - STeaMi WSEN_HIDS - Read Data
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_READDATA_TITLE"] = "[WSEN_HIDS] %1";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_READDATA_TOOLTIP"] = "Returns the humidity or temperature measured by the WSEN_HIDS sensor.";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_HUMIDITY"] = "humidity";
Blockly.Msg["SENSORS_STEAMI_WSEN_HIDS_TEMPERATURE"] = "temperature";
// Sensors - STeaMi WSEN_PADS - Read Data
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_READDATA_TITLE"] = "[WSEN_PADS] %1";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_READDATA_TOOLTIP"] = "Returns the pressure or temperature measured by the WSEN_PADS sensor.";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_PRESSURE"] = "pressure";
Blockly.Msg["SENSORS_STEAMI_WSEN_PADS_TEMPERATURE"] = "temperature";
// Sensors - STeaMi LIS2MDL - Read Data
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_READDATA_TITLE"] = "[LIS2MDL] %1";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_READDATA_TOOLTIP"] = "Returns the magnetic field on the X/Y/Z axes or the temperature measured by the LIS2MDL sensor.";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_X"] = "magnetic field axis X";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_Y"] = "magnetic field axis Y";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_MAG_Z"] = "magnetic field axis Z";
Blockly.Msg["SENSORS_STEAMI_LIS2MDL_TEMP"] = "temperature";
// Sensors - STeaMi ISM330DL - Read Data
Blockly.Msg["SENSORS_STEAMI_ISM330DL_READDATA_TITLE"] = "[ISM330DL] %1";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_READDATA_TOOLTIP"] = "Returns the acceleration on the X/Y/Z axes, the angular velocity on the X/Y/Z axes, or the temperature measured by the ISM330DL sensor.";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_X"] = "acceleration X";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_Y"] = "acceleration Y";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_ACCELERATION_Z"] = "acceleration Z";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_X"] = "gyroscope X";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_Y"] = "gyroscope Y";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_GYROSCOPE_Z"] = "gyroscope Z";
Blockly.Msg["SENSORS_STEAMI_ISM330DL_TEMPERATURE"] = "temperature";
// Robots - Donutbot
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_DONUTBOT_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_DONUTBOT_LEFT'] = 'left';
Blockly.Msg['ROBOTS_DONUTBOT_ULTRASONICRANGER_TITLE'] = '[Donutbot - Ultrasonic Sensor] distance %1';
Blockly.Msg['ROBOTS_DONUTBOT_ULTRASONICRANGER_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns the distance (in cm) between an object and the Donutbot robot using the ultrasonic distance sensor.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_TITLE'] = '[Donutbot] line sensor state %1';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns the state of the line sensor (right/left/center) of the Donutbot robot.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TITLE'] = '[Donutbot] follow the line';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_FUNCTION_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Allows the Donutbot robot to follow a black line.';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TITLE'] = '[Donutbot] line sensor threshold %1';
Blockly.Msg['ROBOTS_DONUTBOT_LINE_DETECTOR_THRESHOLD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Allows you to set the threshold for the line sensor (right/left/center) on the Donutbot robot.';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_TITLE'] = '[Donutbot] color sensor state %1';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns the state (color in (r,g,b) format) of the line sensor (right/left/center) of the Donutbot robot.';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_MIDDLE'] = 'center';
Blockly.Msg['ROBOTS_DONUTBOT_DETECTOR_LEFT'] = 'left';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TITLE'] = '[Donutbot] average color of the color sensors';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_AVERAGE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns the average color (r,g,b) from the Donutbot robot’s color sensors.';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TITLE'] = '[Donutbot] color name under sensor %1';
Blockly.Msg['ROBOTS_DONUTBOT_COLOR_DETECTOR_NAME_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns the name of the color ("white", "orange", "purple", "pink", "brown", "yellow", "green", "blue", "red") detected by the Donutbot robot.';
Blockly.Msg['ROBOTS_DONUTBOT_DISTANCE_TITLE'] = '[Donutbot - ToF] distance %1';
Blockly.Msg['ROBOTS_DONUTBOT_DISTANCE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Returns distance measurements from the Time Of Flight VL53L0X sensor on the I2C port.';
Blockly.Msg['ROBOTS_DONUTBOT_GO_TITLE'] = '[Donutbot] %1 at speed %2 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_GO_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Controls the movement (FORWARD/REVERSE) and speed (0 to 100%) of the Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_TITLE'] = '[Donutbot] turn to the %1 speed %2 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Allows the Donutbot to turn right or left at a specific speed (0 to 100%).';
Blockly.Msg['ROBOTS_DONUTBOT_CONTROLMOTOR_TITLE'] = '[Donutbot] control motor %1 direction %2 speed %3 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Controls the right and left motors by changing direction (↻: FORWARD, ↺: REVERSE) and speed (0 to 100%) of the Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TITLE'] = '[Donutbot] move forward one square';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_FORWARD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Moves the Donutbot robot forward one square.';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TITLE'] = '[Donutbot] move backward one square';
Blockly.Msg['ROBOTS_DONUTBOT_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Moves the Donutbot robot backward one square.';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_LEFT_TITLE'] = '[Donutbot] turn left';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_LEFT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Rotates the Donutbot robot 90° to the left.';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT_TITLE'] = '[Donutbot] turn right';
Blockly.Msg['ROBOTS_DONUTBOT_TURN_RIGHT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Rotates the Donutbot robot 90° to the right.';
Blockly.Msg['ROBOTS_DONUTBOT_STOPMOTORS_TITLE'] = '[Donutbot] stop motor %1';
Blockly.Msg['ROBOTS_DONUTBOT_STOPMOTORS_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Stops the right or left motor of the Donutbot.';
Blockly.Msg['ROBOTS_DONUTBOT_RELEASEMOTORS_TITLE'] = '[Donutbot] release motor %1';
Blockly.Msg['ROBOTS_DONUTBOT_RELEASEMOTORS_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Stops the right or left motor of the Donutbot and releases it from control. Once disabled, the motor becomes completely free and can move without constraints.';
Blockly.Msg['ROBOTS_DONUTBOT_RIGHT&LEFT'] = 'right & left';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TITLE'] = '[Donutbot] control LED %1 at R %2 G %3 B %4';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETCOLOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Controls the color of each LED of the neopixel of the Donutbot robot (pin15) with R, G, B values between 0 and 255. The neopixel is connected to pin P15.';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Donutbot] control LED %1 to %2';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Controls the color of each LED of the neopixel module. Use the palette to change the color.';
Blockly.Msg['ROBOTS_DONUTBOT_BLINK_ROBOT_TITLE'] = '[Donutbot] blink robot in %1';
Blockly.Msg['ROBOTS_DONUTBOT_BLINK_ROBOT_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Makes the Donutbot robot blink.';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TITLE'] = '[Donutbot] rainbow';
Blockly.Msg['ROBOTS_DONUTBOT_NEOPIXEL_SETRAINBOW_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Displays the color spectrum on the RGB LEDs (pin15).';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TITLE'] = '[Donutbot] button %1 is %2';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_ONPRESSED_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Executes instructions if a Donutbot button is pressed.';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_PRESSED'] = 'pressed';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTONS_RELEASED'] = 'released';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_FRONT'] = 'front';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_LEFT'] = 'left';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_RIGHT'] = 'right';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_BACK'] = 'back';
Blockly.Msg['ROBOTS_DONUTBOT_BUTTON_CENTER'] = 'center';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_SEND_DATA_TITLE'] = '[Donutbot] send data %1';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_SEND_DATA_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Send data via Bluetooth (BLE).';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_READ_DATA_TITLE'] = '[Donutbot] if message received in %1 then';
Blockly.Msg['ROBOTS_DONUTBOT_BLE_READ_DATA_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Executes instructions if data is received via Bluetooth (BLE).';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_ANGLE_TITLE'] = '[Donutbot] turn to the %1 by %2 ° speed %3 (%)';
Blockly.Msg['ROBOTS_DONUTBOT_TURNTO_ANGLE_TOOLTIP'] = IMG_ROBOT_DONUTBOT + Blockly.Tooltip.SEP + 'Controls the right and left motors by changing direction (↻: FORWARD, ↺: REVERSE) and speed (0 to 100%) to rotate the Donutbot by a certain angle.';
Blockly.Msg['COMMUNICATION_LOG_SETLABEL_TITLE'] = '[Log] set label(s)';
Blockly.Msg['COMMUNICATION_LOG_SETLABEL_TOOLTIP'] = 'Allows you to add a label to the data column of the log. The label can be text or a number.';
Blockly.Msg['COMMUNICATION_LOG_ADDDATA_TITLE'] = '[Log] add data';
Blockly.Msg['COMMUNICATION_LOG_ADDDATA_TOOLTIP'] = 'Allows you to add data to the data column of the log. The data can be text or a number.';
Blockly.Msg['COMMUNICATION_LOG_DELETE_TITLE'] = '[Log] delete logs';
Blockly.Msg['COMMUNICATION_LOG_DELETE_TOOLTIP'] = 'Allows you to delete all saved logs.';
