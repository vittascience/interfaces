/**
 * @fileoverview English messages for Arduino UNO Q. (EN)
 */

'use strict';

// Start blocks cpp.

// Start blocks linux.

// Bridge blocks

// Brick Blocks

// UNO Q: the built-in LED is the red of the RGB LED 3 (no LED on D13)

Blockly.Msg["CPP_ON_START_TITLE"] = "[Arduino] Al iniciar";
Blockly.Msg["CPP_ON_START_TOOLTIP"] = "Añade instrucciones en este bloque para ejecutar cuando el chip STM32 de la placa Arduino Q arranca.";
Blockly.Msg["CPP_FOREVER_TITLE"] = "[Arduino] Repetir indefinidamente";
Blockly.Msg["CPP_FOREVER_TOOLTIP"] = "Añade instrucciones en este bloque para ejecutar en bucle.";
Blockly.Msg["PY_ON_START_TITLE"] = "[Python] Al iniciar";
Blockly.Msg["PY_ON_START_TOOLTIP"] = "Añade instrucciones en este bloque para ejecutar cuando la placa Arduino Q arranca en Linux.";
Blockly.Msg["PY_FOREVER_TITLE"] = "[Python] Repetir indefinidamente";
Blockly.Msg["PY_FOREVER_TOOLTIP"] = "Añade instrucciones en este bloque para ejecutar en bucle.";
Blockly.Msg["Q_BRIDGES_PROVIDE_TITLE"] = "[Puente] expone la función %1 con ID %2";
Blockly.Msg["Q_BRIDGES_PROVIDE_TOOLTIP"] = "Crea un puente de comunicación entre el script Python en Linux y el procesador STM32 de la placa Arduino Q. Este bloque expone una función con un ID.";
Blockly.Msg["Q_BRIDGES_CALL_TITLE"] = "[Puente] llama a la función con ID %1";
Blockly.Msg["Q_BRIDGES_CALL_TOOLTIP"] = "Llama a la función expuesta en el canal mediante el ID. Haz clic en el botón más para añadir argumentos a la función expuesta.";
Blockly.Msg["Q_BRIDGES_CALL_WITH_ARGUMENTS"] = "con argumentos";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TITLE"] = "[Puente] resultado de la función con ID %1 de tipo %2";
Blockly.Msg["Q_BRIDGES_CALL_RETURN_TOOLTIP"] = "Llama a la función expuesta en el canal mediante el ID y devuelve su resultado. El tipo (String, int, float, bool) solo se usa en C++. Haz clic en el botón más para añadir argumentos a la función expuesta.";
Blockly.Msg["CONTROLS_FOREVER_TITLE"] = "repetir indefinidamente";
Blockly.Msg["CONTROLS_FOREVER_TOOLTIP"] = "Repite las instrucciones en bucle sin fin.";
Blockly.Msg["BRICKS_APP_RUN_TITLE"] = "iniciar la aplicación";
Blockly.Msg["BRICKS_APP_RUN_TOOLTIP"] = "Inicia la aplicación web al final del programa Python.";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TITLE"] = "[Interfaz web] envía el mensaje %2 con ID %1";
Blockly.Msg["BRICKS_WEBUI_SEND_MESSAGE_TOOLTIP"] = "Envía un mensaje a una aplicación web. Todos los clientes conectados al servidor Arduino Q ven este mensaje. Este mensaje puede ser interceptado desde la página web.";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TITLE"] = "[Interfaz web] si se recibe un mensaje con ID %1";
Blockly.Msg["BRICKS_WEBUI_ON_MESSAGE_TOOLTIP"] = "Permite ejecutar instrucciones si se recibe un mensaje con un ID concreto desde un cliente conectado.";
Blockly.Msg["BRICKS_WEBUI_APP_RUN_USER_LOOP"] = "en bucle: ";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = "[Arduino] establecer el LED integrado (LED 3 rojo) en %1";
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = "Enciende (HIGH) o apaga (LOW) el LED integrado de la placa Arduino UNO Q: el rojo del LED RGB #3.";
Blockly.Msg["UNOQ_RGB_LED_TITLE"] = "[Arduino] establecer LED RGB #%1 en %2";
Blockly.Msg["UNOQ_RGB_LED_TOOLTIP"] = "Ilumina el LED RGB #3 o #4 de la placa Arduino UNO Q (controlado por el microcontrolador) en uno de 7 colores, o lo apaga.";
Blockly.Msg["UNOQ_RGB_LED_OFF"] = "apagado";
Blockly.Msg["UNOQ_RGB_LED_RED"] = "rojo";
Blockly.Msg["UNOQ_RGB_LED_GREEN"] = "verde";
Blockly.Msg["UNOQ_RGB_LED_BLUE"] = "azul";
Blockly.Msg["UNOQ_RGB_LED_YELLOW"] = "amarillo";
Blockly.Msg["UNOQ_RGB_LED_CYAN"] = "cian";
Blockly.Msg["UNOQ_RGB_LED_MAGENTA"] = "magenta";
Blockly.Msg["UNOQ_RGB_LED_WHITE"] = "blanco";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TITLE"] = "[Python] establecer LED RGB #%1 en %2";
Blockly.Msg["UNOQ_LINUX_RGB_LED_TOOLTIP"] = "Ilumina el LED RGB #1 o #2 de la placa Arduino UNO Q (controlado por Linux) en uno de 7 colores, o lo apaga.";
