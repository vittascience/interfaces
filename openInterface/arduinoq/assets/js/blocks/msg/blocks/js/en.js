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

// Brick Blocks
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "launch the application";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Starts the web application at the end of the Python program.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[WebUI] sends message %2 with ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Sends a message to a web application. All clients connected to the Arduino Q server see this message. This message can be intercepted from the web page.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[WebUI] if a message is received with ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Allows execution of instructions if a message of a certain ID is received from a connected client.";