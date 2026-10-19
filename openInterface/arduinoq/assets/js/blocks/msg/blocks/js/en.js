/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.
Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] On startup";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Add instructions in this block to execute when the STM32 chip on the Arduino Q board starts up.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Repeat indefinitely";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Add instructions in this block to execute in a loop.";

// Start blocks linux.
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] On startup";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Add instructions in this block to execute when the Arduino Q board boots into Linux.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Repeat indefinitely";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Add instructions in this block to execute in a loop.";

// Bridge blocks
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Bridge] expose function %1 with ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Creates a communication bridge between the Linux Python script and the STM32 processor of the Arduino Q board. This block exposes a function with an ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Bridge] call function ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Calls the exposed function on the channel via the ID. Click the plus button to add arguments to the exposed function.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "with arguments";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Bridge] result of function ID %1 of type %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Calls the exposed function on the channel via the ID and returns its result. The type (String, int, float, bool) is only used in C++. Click the plus button to add arguments to the exposed function.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "repeat forever";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Repeats the instructions in a loop, endlessly.";

// Brick Blocks
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "launch the application";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Starts the web application at the end of the Python program.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] sends message %2 with ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Sends a message to a web application. All clients connected to the Arduino Q server see this message. This message can be intercepted from the web page.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] if a message is received with ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Allows execution of instructions if a message of a certain ID is received from a connected client.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "en boucle: ";

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] set built-in LED (LED 3 red) to %1";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Turns on (HIGH) or off (LOW) the built-in LED of the Arduino UNO Q board: the red of the RGB LED #3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] set RGB LED #%1 to %2";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Lights the RGB LED #3 or #4 of the Arduino UNO Q board (driven by the microcontroller) in one of 7 colours, or turns it off.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "off";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "red";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "green";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "blue";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "yellow";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "cyan";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "magenta";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "white";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] set RGB LED #%1 to %2";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Lights the RGB LED #1 or #2 of the Arduino UNO Q board (driven by Linux) in one of 7 colours, or turns it off.";
