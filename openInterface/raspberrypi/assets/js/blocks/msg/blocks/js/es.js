/**
 * @fileoverview Es messages for Raspberry pi. (EN)
 */
'use strict';

// Comunicación
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en la consola %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Permite escribir datos en la consola.';
// Entrada/Salida - Raspberry Pi
Blockly.Msg['IO_WAIT_TITLE'] = 'esperar %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Realiza una pausa en la ejecución del código.';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo/s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo/s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo/s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'esperar hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detiene la ejecución del código hasta que se cumpla la condición.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'iniciar cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Inicializa un cronómetro en 0 (segundos).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valor del cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización (en segundos o milisegundos).';
// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = '[Raspberry] nombre del host %1';
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Permite recuperar el nombre del host de la Raspberry Pi.';
// Actuadores - Raspberry Pi
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE'] = '[Zumbador/Altavoz] reproducir frecuencia %1 durante %2 (ms) en %3';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Permite reproducir una frecuencia con un módulo Grove buzzer (o speaker) en los pines pwm del GrovePi hat.';
// Pantalla Raspberry Pi
Blockly.Msg['DISPLAY_LCD_SETTEXT_TITLE'] = '[LCD] mostrar texto %1 en la línea %2 posición %3';
Blockly.Msg['DISPLAY_LCD_SETTEXT_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Muestra texto en una de las dos líneas de la pantalla LCD1602 grove. Conecta el módulo a un puerto I2C del GrovePi hat.';
Blockly.Msg['DISPLAY_LCD_CLEAR_TITLE'] = '[LCD] borrar pantalla';
Blockly.Msg['DISPLAY_LCD_CLEAR_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Permite borrar todos los caracteres de la pantalla LCD. Conecta el módulo a un puerto I2C del GrovePi hat.';
// Pantalla - Neopixel Raspberry Pi
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TITLE'] = '[Neopixel] definir %1 LED en el pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite definir el número de LEDs del neopixel. Este bloque debe usarse en el bloque "Al Iniciar".';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TITLE'] = '[Neopixel] controlar LED %1 con R %2 G %3 B %4 en el pin %5';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar el color de cada LED como (R,G,B) de 0 a 255 del módulo neopixel.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Neopixel] configurar LED %1 con color %2 en el pin %3';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar el color de cada LED del módulo neopixel. Usa la paleta para cambiar el color.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE'] = '[Neopixel] controlar todos los LEDs con R %1 G %2 B %3 en el pin %4';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar todos los LEDs del módulo neopixel con el color seleccionado como (R,G,B) de 0 a 255.';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE'] = '[Neopixel] controlar todos los LEDs con %1 en el pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar todos los LEDs del módulo neopixel con el color seleccionado. Usa la paleta para cambiar el color.';
// Sensores Raspberry Pi
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TITLE'] = '[Sensor ultrasónico] obtener distancia en el pin %1';
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TOOLTIP'] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + 'Devuelve la distancia (en cm) medida por el sensor Grove ultrasónico en los pines digitales del GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TITLE'] = '[Sensor de humedad] humedad del suelo en el pin %1';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TOOLTIP'] = IMG_MODULE_MOISTURE + Blockly.Tooltip.SEP + 'Devuelve la humedad (de 0 a 65535) medida por el sensor de humedad grove en los pines analógicos del GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TITLE'] = '[Sensor de temperatura] temperatura en %1 en el pin %2';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TOOLTIP'] = IMG_MODULE_TEMPERATURE + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K) del sensor de temperatura Grove en los pines analógicos del GrovePi Hat.';
Blockly.Msg['SENSORS_DHT11_READDATA_TITLE'] = '[Sensor DHT11] %1 en el pin %2';
Blockly.Msg['SENSORS_DHT11_READDATA_TOOLTIP'] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K), o la humedad (en %) medida por el sensor dht11 grove en los pines pwm del GrovePi hat.';
Blockly.Msg['SENSORS_GETGROVELIGHT_TITLE'] = '[Sensor de luz] luminosidad en el pin %1';
Blockly.Msg['SENSORS_GETGROVELIGHT_TOOLTIP'] = IMG_MODULE_LIGHT + Blockly.Tooltip.SEP + 'Devuelve la luminosidad (de 0 a 65535) medida por el sensor de luz Grove en los pines analógicos del GrovePi hat.';
Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperatura';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humedad (%)';
// SenseHat
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] temperatura en %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K) del sensor de temperatura del Sense HAT.';
// TEMPRATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humedad';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Devuelve la humedad (en %) medida por el sensor de humedad del Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] temperatura en %1 desde el sensor %2';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K) utilizando el sensor de humedad o de presión del Sense HAT.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_HUMIDITY'] = 'humedad';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'presión';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] humedad';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Devuelve la humedad (en %) medida por el sensor de humedad del Sense HAT.';
// TEMPRATURE FROM HUMIDITY/ PRESSURE SENSOR
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] presión en %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Devuelve la presión (en milibares) medida por el sensor de presión del Sense HAT.';
// Pantalla
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TITLE'] = '[Sense HAT] definir píxel en x %1 y %2, R %3 V %4 A %5';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite definir el color de un píxel en el Sense HAT con un color RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE'] = '[Sense HAT] definir píxel en x %1 y %2 con el color %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite definir el color de un píxel en el Sense HAT con un color de la paleta.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE'] = "[Sense HAT] definir imagen %1 con %2 en el fondo %3";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite definir una imagen en la matriz LED del Sense HAT con un color RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TITLE'] = '[Sense HAT] color del píxel en x %1 y %2';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite recuperar el color de un píxel del Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TITLE'] = '[Sense HAT] obtener colores de píxeles';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite recuperar los colores de los píxeles del Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TITLE'] = '[Sense HAT] borrar pantalla';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite borrar la pantalla LED del Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE'] = '[Sense HAT] borrar pantalla con el color %1';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite borrar la pantalla LED del Sense HAT con un color RGB.';
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE'] = "[Sense HAT] mostrar imagen con el color %1";
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite mostrar una imagen en la matriz LED del Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE'] = '[Sense HAT] mostrar mensaje %1 con velocidad %2 color %3 y fondo %4';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite mostrar un mensaje en la matriz LED del Sense HAT con un color RGB.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE'] = '[Sense HAT] mostrar letra %1 con el color %2 en el fondo %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite mostrar una letra en la matriz LED del Sense HAT con un color RGB.';
// IO
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] esperar evento del joystick';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite esperar un evento en el Sense HAT.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] obtener %1 del evento del joystick";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permite obtener la dirección o acción del evento del joystick.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "dirección";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "acción";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] obtener lista de eventos del joystick";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permite obtener una lista que contiene los eventos del joystick.";
// IMU 
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 giroscopio %2 %3 acelerómetro %4 %5 brújula';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite configurar los sensores IMU (unidad de medición inercial) del Sense HAT.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'encender';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'apagar';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS_TITLE'] = '[Sense HAT] obtener orientación en radianes (cabeceo, alabeo, guiñada)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite obtener la orientación en radianes (cabeceo, alabeo, guiñada) del Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TITLE'] = '[Sense HAT] obtener orientación en grados (x, y, z)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Permite obtener la orientación en grados (cabeceo, alabeo, guiñada) del Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] obtener orientación de brújula";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Permite obtener la orientación de la brújula del Sense HAT.";
// Cámara Raspberry Pi
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[Cámara Raspberry Pi] tomar una foto';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permite tomar una foto con la cámara de la Raspberry Pi.';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[Cámara Raspberry Pi] grabar un video durante %1 segundos';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Permite grabar un video con la cámara de la Raspberry Pi.';
