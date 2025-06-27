/**
 * @fileoverview English messages for Raspberry Pi Pico. (EN)
 */

'use strict';

// Display - Pico
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = '[Pico] compruebe el LED integrado (GP25) en el estado %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Le permite controlar el estado del LED integrado de la Raspberry Pi Pico.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_W_TITLE'] = '[Pico] compruebe el LED integrado (GPI0) en el estado %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_W_TOOLTIP'] = 'Le permite controlar el estado del LED integrado de la Raspberry Pi Pico W.';
// Display - Screen
Blockly.Msg['DISPLAY_LCD_SETTEXT_TITLE'] = '[LCD] mostrar texto %1 en la línea %2 posición %3 en el puerto %4';
Blockly.Msg['DISPLAY_LCD_SETTEXT_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Mostrar texto en la pantalla lcd 1602 de Grove. Conecte el lcd en el puerto I2C';
Blockly.Msg['DISPLAY_LCD_CLEAR_TITLE'] = '[LCD] limpiar pantalla en el puerto %1';
Blockly.Msg['DISPLAY_LCD_CLEAR_TOOLTIP'] = IMG_MODULE_LCD_3V3 + Blockly.Tooltip.SEP + 'Habilitar para borrar todo el texto del lcd. Conecte el lcd en el puerto I2C';
Blockly.Msg['DISPLAY_OLED_ADDTEXT_TITLE'] = '[Pantalla OLED] mostrar texto %1 en la posición x %2 y %3 en el puerto %4';
Blockly.Msg['DISPLAY_OLED_ADDTEXT_TOOLTIP'] = IMG_MODULE_OLED + Blockly.Tooltip.SEP + 'Activar la escritura de texto en la pantalla OLED. Conecte la pantalla OLED en el puerto I2C';
Blockly.Msg['DISPLAY_OLED_SETPIXEL_TITLE'] = '[Pantalla OLED] controla el píxel x %1 y %2 al estado %3 en el puerto %4';
Blockly.Msg['DISPLAY_OLED_SETPIXEL_TOOLTIP'] = IMG_MODULE_OLED + Blockly.Tooltip.SEP + 'Habilitar para controlar cada píxel de la pantalla OLED. Conecte la pantalla OLED en el puerto I2C';
Blockly.Msg['DISPLAY_OLED_CLEARSCREEN_TITLE'] = '[Pantalla OLED] limpiar pantalla en el puerto %1';
Blockly.Msg['DISPLAY_OLED_CLEARSCREEN_TOOLTIP'] = IMG_MODULE_OLED + Blockly.Tooltip.SEP + 'Habilitar para borrar toda la pantalla oled. Conecte la pantalla OLED en el puerto I2C';
Blockly.Msg['DISPLAY_OLED_DRAWICON_TITLE'] = '[OLED] mostrar icono %1 posición x %2 y %3 en el puerto %4';
Blockly.Msg['DISPLAY_OLED_DRAWICON_TOOLTIP'] = IMG_MODULE_OLED + Blockly.Tooltip.SEP + 'Muestra un icono de la biblioteca de imágenes Pico en la posición (x,y) de la pantalla OLED de la arboleda. Conecte la pantalla a un puerto I2C';
// Display - Neopixel
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TITLE'] = '[Neopixel] define %1 LED en el pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_DEFINE_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite definir el número de LED del neopixel. Este bloque debe utilizarse en la configuración';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TITLE'] = '[Neopixel] establece el LED %1 en R %2 G %3 B %4 en el pin %5';
Blockly.Msg['DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar cada color de LED de los neopíxeles como (R,G,B) de 0 a 255. Utilizar P15 para ajustar el neopixel Maqueen';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE'] = '[Neopixel] establece el LED %1 a %2 en el pin %3';
Blockly.Msg['DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Habilitar para controlar cada color del LED del neopixel. Utilizar P15 para ajustar el neopixel Maqueen';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE'] = '[Neopixel] establece todos los LED al color R %1 G %2 B %3 en el pin %4';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Permite controlar todos los LED del neopixel al valor de color elegido como (R,G,B) de 0 a 255. Utilice P15 para ajustar el neopixel Maqueen';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE'] = '[Neopixel] establece todos los LED al color %1 en el pin %2';
Blockly.Msg['DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Habilitar para controlar todos los LED del neopixel al valor de color elegido. Utilizar P15 para ajustar el neopixel Maqueen';
Blockly.Msg['DISPLAY_NEOPIXEL_RAINBOW_TITLE'] = '[Neopixel] establece un arco iris en el pin %1';
Blockly.Msg['DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP'] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + 'Habilitar para mostrar un arco iris en el módulo neopixel, establecer el pin y el número de LED';
// Display - LED modules
Blockly.Msg['DISPLAY_SETGROVELED_TITLE'] = '[LED] controla el LED al estado %1 en el pin %2';
Blockly.Msg['DISPLAY_SETGROVELED_TOOLTIP'] = IMG_MODULE_LED + Blockly.Tooltip.SEP + 'Permite encender o apagar el kit de LEDs Grove (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['DISPLAY_SETLEDINTENSITY_TITLE'] = '[LED] establece la intensidad del LED a %1 en el pin %2';
Blockly.Msg['DISPLAY_SETLEDINTENSITY_TOOLTIP'] = IMG_MODULE_LED_PWM + Blockly.Tooltip.SEP + 'Habilitar para establecer la intensidad del LED de 0 a 255 en los pines PWM';
Blockly.Msg['DISPLAY_4DIGIT_SETNUMBER_TITLE'] = '[Módulo de 4 dígitos] mostrar %1 %2 en los pines CLK %3 DIO %4';
Blockly.Msg['DISPLAY_4DIGIT_SETNUMBER_TOOLTIP'] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + 'Habilitar para mostrar los números o la temperatura en la pantalla de 4 dígitos del módulo (TM1637) en los pines digitales de P0 a P20.';
Blockly.Msg['DISPLAY_4DIGIT_SETCLOCK_TITLE'] = '[Módulo de 4 dígitos] mostrar reloj en los pines CLK %1 DIO %2';
Blockly.Msg['DISPLAY_4DIGIT_SETCLOCK_TOOLTIP'] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + 'Habilitar para mostrar el reloj en la pantalla de 4 dígitos (TM1637) en los pines digitales de P0 a P20. Advertencia, obtener el reloj real sólo es posible si el Raspberry Pi Pico Pi Pico permanece en modo de encendido';
Blockly.Msg['DISPLAY_4DIGIT_NUMBER'] = 'número';
Blockly.Msg['DISPLAY_4DIGIT_TEMPERATURE'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['DISPLAY_MY9221_SET_LEVEL_TITLE'] = '[Módulo de barra de LEDs] establece el nivel de %1 en los pines DI %2 DCKI %3';
Blockly.Msg['DISPLAY_MY9221_SET_LEVEL_TOOLTIP'] = IMG_MODULE_LED_BAR + Blockly.Tooltip.SEP + 'Habilitar para mostrar el nivel del valor de entrada en la pantalla de la barra de LEDs de la ranura (MY9221) en los pines digitales.';
Blockly.Msg['DISPLAY_MY9221_REVERSE_TITLE'] = '[Módulo de barra de LEDs] invierte la pantalla %1 DI pins %2 DCKI %3';
Blockly.Msg['DISPLAY_MY9221_REVERSE_TOOLTIP'] = IMG_MODULE_LED_BAR + Blockly.Tooltip.SEP + 'Permite invertir los 10 LEDs del módulo MY9221 con los pines digitales.';
// Display - Chainable LED
Blockly.Msg['DISPLAY_CHAINABLERGBLED_DEFINE_TITLE'] = '[LED encadenable] establecer %1 LED en pines CIN %2 DIN %3';
Blockly.Msg['DISPLAY_CHAINABLERGBLED_DEFINE_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Permite configurar la cadena de LEDs RGB definiendo el número de módulos en serie en los pines digitales.';
Blockly.Msg['DISPLAY_CHAINABLE_RGBLED_TITLE'] = '[LED encadenable] controla el LED %1 a R %2 G %3 B %4 en los pines CIN %5 DIN %6';
Blockly.Msg['DISPLAY_CHAINABLE_RGBLED_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Bloque que controla el color del LED RGB, da un valor entre 0 y 255 para el Rojo, el Verde y el Azul';
Blockly.Msg['DISPLAY_CHAINABLE_PALETTERGBLED_TITLE'] = '[LED encadenable] controla el LED %1 a %2 en los pines CIN %3 DIN %4';
Blockly.Msg['DISPLAY_CHAINABLE_PALETTERGBLED_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Bloque que controla el color del LED RGB, elige un color de la paleta';
Blockly.Msg['DISPLAY_CHAINABLE_ALLRGBLED_TITLE'] = '[LED encadenable] controla todos los LEDs en R %1 G %2 B %3 en los pines CIN %4 DIN %5';
Blockly.Msg['DISPLAY_CHAINABLE_ALLRGBLED_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Bloque que controla el color de los LEDs RGB, da un valor entre 0 y 255 para el Rojo, Verde y Azul';
Blockly.Msg['DISPLAY_CHAINABLE_PALETTEALLRGBLED_TITLE'] = '[LED encadenable] controla todos los LEDs en %1 en los pines CIN %2 DIN %3';
Blockly.Msg['DISPLAY_CHAINABLE_PALETTEALLRGBLED_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Bloque que controla el color de los LEDs RGB, elige un color de la paleta';
Blockly.Msg['DISPLAY_CHAINABLE_RESETALLRGBLED_TITLE'] = '[LED encadenable] se apaga en los pines CIN %1 DIN %2';
Blockly.Msg['DISPLAY_CHAINABLE_RESETALLRGBLED_TOOLTIP'] = IMG_MODULE_LED_RGB + Blockly.Tooltip.SEP + 'Bloquea el apagado de todos los LEDs RGB';
// Input/Output - Microphone module
Blockly.Msg['IO_MICRO_LOUD'] = 'fuerte';
Blockly.Msg['IO_MICRO_QUIET'] = 'silencioso';
Blockly.Msg['IO_MICRO_IS'] = 'es';
Blockly.Msg['IO_MICRO_WAS'] = 'era';
Blockly.Msg['IO_MICRO_ONSOUNDDETECTED_TITLE'] = '[Micro] si %1 sonido %2 detectado entonces';
Blockly.Msg['IO_MICRO_ONSOUNDDETECTED_TOOLTIP'] = 'Ejecutar instrucciones si se detecta la condición de sonido (fuerte/silencioso). Opción \'era\': Ejecutar instrucciones si se ha producido un sonido (fuerte/silencioso) desde la última llamada a \'was_sound()\'';
Blockly.Msg['IO_MICRO_GETCURRENTSOUND_TITLE'] = '[Micro] condición de sonido';
Blockly.Msg['IO_MICRO_GETCURRENTSOUND_TOOLTIP'] = 'Devuelve la condición de sonido (fuerte/silencioso)';
Blockly.Msg['IO_MICRO_WASSOUNDDETECTED_TITLE'] = '[Micro] %1 sonido fue detectado';
Blockly.Msg['IO_MICRO_WASSOUNDDETECTED_TOOLTIP'] = 'Devuelve True si se ha producido un sonido (fuerte/silencioso) desde la última llamada a \'was_sound()\'';
Blockly.Msg['IO_MICRO_GETSOUNDLEVEL_TITLE'] = '[Micro] nivel de sonido';
Blockly.Msg['IO_MICRO_GETSOUNDLEVEL_TOOLTIP'] = 'Habilitar du obtener el nivel de sonido de 0 a 255';
Blockly.Msg['IO_MICRO_GETHISTORYSOUND_TITLE'] = '[Micro] historial de sonidos';
Blockly.Msg['IO_MICRO_GETHISTORYSOUND_TOOLTIP'] = 'Devuelve el historial de sonidos desde la última llamada a \'get_sounds()\'';
Blockly.Msg['IO_MICRO_SETSOUNDTHRESHOLD_TITLE'] = '[Micro] establece %1 umbral de sonido a %2';
Blockly.Msg['IO_MICRO_SETSOUNDTHRESHOLD_TOOLTIP'] = 'Habilitar para establecer el umbral de sonido alto/silencioso de 0 a 255';
Blockly.Msg['IO_MICRO_SOUNDCONDITION_TITLE'] = '[Micro] %1';
Blockly.Msg['IO_MICRO_SOUNDCONDITION_TOOLTIP'] = 'Habilitar para utilizar las constantes (LOUD/QUIET) del módulo de micrófono en la categoría \'Lógica\'';
// Input/Output - External modules
Blockly.Msg['IO_GROVEKEYPAD_GETNUMBER_TITLE'] = '[Teclado numérico táctil] obtener número en los pines RX %1 TX %2';
Blockly.Msg['IO_GROVEKEYPAD_GETNUMBER_TOOLTIP'] = IMG_MODULE_KEYPAD + Blockly.Tooltip.SEP + 'Habilitar para obtener el número tocado del módulo de teclado numérico en los pines RX y TX. Cuando conectes el dispositivo, asegúrate de "cruzar" los cables. El pin TX de Raspberry Pi Pico tiene que estar conectado con el pin RX del dispositivo, y el pin RX con el pin TX del dispositivo';
Blockly.Msg['IO_GROVEJOYSTICK_GETAXIS_TITLE'] = '[Módulo Joystick] valor del eje del joystick %1 en los pines A0 %2 A1 %3';
Blockly.Msg['IO_GROVEJOYSTICK_GETAXIS_TOOLTIP'] = IMG_MODULE_JOYSTICK + Blockly.Tooltip.SEP + 'Devuelve el valor del eje del joystick (de 0 a 1023) en los pines analógicos P0 a P4, o P10';
Blockly.Msg['IO_GROVECOLOREDBUTTON_GET_TITLE'] = '[Módulo de botones de colores] estado en el pin SIG2 %1';
Blockly.Msg['IO_GROVECOLOREDBUTTON_GET_TOOLTIP'] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + 'Devuelve el estado del botón de color Grove (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['IO_GROVECOLOREDBUTTON_SETLED_TITLE'] = '[Módulo de botones de color] controla el LED al estado %1 en el pin SIG1 %2';
Blockly.Msg['IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP'] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + 'Permite encender o apagar el LED Button Grove (0 o 1) en los pines digitales P0 hasta P20';
Blockly.Msg['IO_GETGROVEROTARYANGLE_TITLE'] = '[Módulo de ángulo rotativo] ángulo en el pin %1';
Blockly.Msg['IO_GETGROVEROTARYANGLE_TOOLTIP'] = IMG_MODULE_ROTARY_ANGLE + Blockly.Tooltip.SEP + 'Devuelve la posición del ángulo rotativo de la ranura (de 0 a 1023) en los pines analógicos P0 a P4, o P10';
Blockly.Msg['IO_GETGROVESLIDEPOTENTIOMETER_TITLE'] = '[Potenciómetro de deslizamiento] valor de posición en el pin %1';
Blockly.Msg['IO_GETGROVESLIDEPOTENTIOMETER_TOOLTIP'] = IMG_MODULE_SLIDE_POT + Blockly.Tooltip.SEP + 'Devuelve el valor de posición del potenciómetro de deslizamiento de la ranura (de 0 a 1023) en los pines analógicos P0 a P4, o P10';
Blockly.Msg['IO_GETGROVETACTILE_TITLE'] = '[Sensor táctil] estado del tacto en el pin %1 ';
Blockly.Msg['IO_GETGROVETACTILE_TOOLTIP'] = IMG_MODULE_TOUCH + Blockly.Tooltip.SEP + 'Devuelve el estado del sensor táctil de la arboleda (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['IO_GETGROVEBUTTON_TITLE'] = '[Módulo de botones] estado del botón en el pin %1 ';
Blockly.Msg['IO_GETGROVEBUTTON_TOOLTIP'] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + 'Devuelve el estado del botón Grove (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['IO_GETGROVESWITCH_TITLE'] = '[Módulo de Interruptores] estado del interruptor en el pin %1 ';
Blockly.Msg['IO_GETGROVESWITCH_TOOLTIP'] = IMG_MODULE_SWITCH + Blockly.Tooltip.SEP + 'Devuelve el estado del interruptor de la ranura (0 o 1) en los pines digitales P0 hasta P20';
// Input/Output - Pins
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'ALTO (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'BAJO (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Devuelve un valor booleano (1 si es HIGH o 0 si es LOW)';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'leer pin digital %1';
Blockly.Msg['IO_READDIGITALPIN_TOOLTIP'] = 'Habilitar para leer el valor digital de los pines (0 o 1)';
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'escribir en el pin digital %1 estado %2';
Blockly.Msg['IO_WRITEDIGITALPIN_TOOLTIP'] = 'Habilitar para escribir el valor (0 o 1) en el pin digital';
Blockly.Msg['IO_READANALOGPIN_TITLE'] = 'leer pin analógico %1';
Blockly.Msg['IO_READANALOGPIN_TOOLTIP'] = 'Habilitar para leer el valor analógico de los pines (0-1023)';
Blockly.Msg['IO_WRITEANALOGPIN_TITLE'] = 'Escribe en el pin analógico %1 el valor %2';
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Habilitar para escribir en el pin analógico el valor (0-1023). Esta función no escribe realmente el valor analógico, escribe la señal PWM. Por ejemplo, escribiendo 511 tiene un ciclo de trabajo del 50%, la tensión media es de 1,65V';
Blockly.Msg['IO_SETPWM_TITLE'] = 'aplicar una señal de periodo %1 %2 en el pin %3';
Blockly.Msg['IO_SETPWM_TOOLTIP'] = 'Habilitar para aplicar una señal PWM en un pin';
Blockly.Msg['IO_WRITEPWMPIN_TITLE'] = 'escribe el valor %1 en el pin PWM %2';
Blockly.Msg['IO_WRITEPWMPIN_TOOLTIP'] = 'Permite aplicar una señal PWM con una frecuencia fija de 10kH y cambiando el ciclo de 0 a 1023. El valor 512 corresponderá al 50% del ciclo, es decir, a unos 1,66V';
Blockly.Msg['IO_READPULSEIN_TITLE'] = 'Leer pulso en (μs) del estado %1 en el pin %2';
Blockly.Msg['IO_READPULSEIN_TOOLTIP'] = 'Devuelve la duración del pulso en. Elección del estado (HIGH o LOW)';
// Input/Output - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'espera %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Detener la ejecución del código (duración en segundos o milisegundos)';
Blockly.Msg['IO_WAIT_SECOND'] = 'segundo.s';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milisegundo.s';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microsegundo.s';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'espera hasta %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Detener la ejecución del código hasta que se cumpla la condición';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Inicializar el cronómetro';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Permite inicializar el cronómetro (en segundos)';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Obtener cronómetro en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Devuelve el valor del cronómetro desde la inicialización en segundos o milisegundos';
//Communication - Internal Bluetooth
Blockly.Msg['COMMUNICATION_START_BT_TITLE'] = '[Pico Bluetooth] iniciar Bluetooth %1';
Blockly.Msg['COMMUNICATION_START_BT_TOOLTIP'] = 'Permite inicializar el servicio Bluetooth del Pico con un nombre asignado.';
Blockly.Msg['COMMUNICATION_SEND_BT_TITLE'] = '[Pico Bluetooth] enviar datos %1';
Blockly.Msg['COMMUNICATION_SEND_BT_TOOLTIP'] = 'Permite el envío de datos a través de la conexión Bluetooth del Pico.';
Blockly.Msg['COMMUNICATION_BLE_READ_DATA_TITLE'] = '[Pico Bluetooth] si el mensaje se recibe en %1 entonces';
Blockly.Msg['COMMUNICATION_BLE_READ_DATA_TOOLTIP'] = 'Permite ejecutar instrucciones si se reciben datos por Bluetooth (BLE).';
// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'escribir en el puerto serie %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Escribe una cadena en el puerto serie';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'con';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'newline(s)';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'escribir gráfico';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Este bloque permite escribir datos (digitales) que serán visibles en el trazador. Se puede utilizar con uno o más bloques en formato  "Nombre" y  "Datos". Haga clic en el icono \'Modo gráfico\' para mostrar los gráficos';
Blockly.Msg['COMMUNICATION_DATA'] = 'Datos';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Nombre %1 Datos %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Este bloque debe utilizarse en el bloque "Escribir en gráfico". Debe contener el nombre del valor (de texto) a mostrar y el valor en cuestión';
Blockly.Msg['COMMUNICATION_COMPUTER_PLAYNOTE_TITLE'] = 'reproducir música %1 en el puerto serie';
Blockly.Msg['COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP'] = 'Reproducir la nota seleccionada hasta la ejecución del bloque "Detener la música"';
Blockly.Msg['COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE'] = 'reproduce la frecuencia %1 (Hz) en el ordenador';
Blockly.Msg['COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP'] = 'Este bloque permite reproducir una frecuencia determinada en el ordenador';
Blockly.Msg['COMMUNICATION_COMPUTER_STOPMUSIC_TITLE'] = 'detener la música del puerto serie';
Blockly.Msg['COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP'] = 'detener la nota actual del puerto serie';
Blockly.Msg['COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE'] = 'sobre los datos serie recibidos en %1 entonces';
Blockly.Msg['COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP'] = 'Permite ejecutar instrucciones si se reciben datos por el puerto serie en la variable \'serialData\'';
// Comunicación - Radio
Blockly.Msg['COMMUNICATION_RADIO_SENDSTRING_TITLE'] = '[Radio] enviar cadena %1';
Blockly.Msg['COMMUNICATION_RADIO_SENDSTRING_TOOLTIP'] = 'Habilitar el envío de cadena por el módulo de radio de Raspberry Pi Pico Pi Pico';
Blockly.Msg['COMMUNICATION_RADIO_SEND_TITLE'] = '[Radio] enviar número o lista %1';
Blockly.Msg['COMMUNICATION_RADIO_SEND_TOOLTIP'] = 'Habilitar el envío de números o listas por el módulo de radio';
Blockly.Msg['COMMUNICATION_RADIO_SENDVALUE_TITLE'] = '[Radio] enviar valor %1 como %2';
Blockly.Msg['COMMUNICATION_RADIO_SENDVALUE_TOOLTIP'] = 'Habilitar el envío de datos con \'nombre\' y su valor por módulo de radio';
Blockly.Msg['COMMUNICATION_RADIO_ONSTRINGRECEIVED_TITLE'] = '[Radio] sobre datos recibidos en %1 entonces';
Blockly.Msg['COMMUNICATION_RADIO_ONSTRINGRECEIVED_TOOLTIP'] = 'Permite ejecutar instrucciones sobre la cadena recibida por la radio en la variable \'stringData\'';
Blockly.Msg['COMMUNICATION_RADIO_ONNUMBERRECEIVED_TITLE'] = '[Radio] sobre los datos recibidos en %1 entonces';
Blockly.Msg['COMMUNICATION_RADIO_ONNUMBERRECEIVED_TOOLTIP'] = 'Permite ejecutar instrucciones sobre el número recibido por la radio en la variable \'numberData\'';
Blockly.Msg['COMMUNICATION_RADIO_ONVALUERECEIVED_TITLE'] = '[Radio] sobre datos recibidos en %1 %2 entonces';
Blockly.Msg['COMMUNICATION_RADIO_ONVALUERECEIVED_TOOLTIP'] = 'Permite ejecutar instrucciones sobre el nombre como cadena y el valor como número recibidos por la radio en las variables \'nombre\' y \'valor\'';
Blockly.Msg['COMMUNICATION_RADIO_CONFIG_TITLE'] = '[Radio] set Channel %1 Power %2 Data size %3 Group %4';
Blockly.Msg['COMMUNICATION_RADIO_CONFIG_TOOLTIP'] = 'Permite configurar el canal de frecuencia (de 0 a 83), el tamaño de los datos (bytes), la potencia de transmisión (de 0 a 7) y el grupo (de 0 a 255)';
// Communication - Data logging
Blockly.Msg['COMMUNICATION_OPENLOG_WRITE_TITLE'] = '[Openlog] escribe en la tarjeta SD %1 placa %2 en los pines RXI %3 TXO %4 %5 Datas %6';
Blockly.Msg['COMMUNICATION_OPENLOG_WRITE_TOOLTIP'] = IMG_MODULE_OPENLOG + Blockly.Tooltip.SEP + 'El bloque permite escribir datos en la tarjeta SD del módulo Openlog. Para el openlog, el baudrate tiene que ser definido a la mitad del baudrate de Raspberry Pi Pico Pi Pico. Ejemplo: Raspberry Pi Pico Pi Pico v1 (9600 en el archivo config.txt), la tasa de baudios es 4800 en la función uart.init()';
// Communication - Wireless
Blockly.Msg['COMMUNICATION_BLUETOOTH_SENDDATA_TITLE'] = '[Bluetooth] enviar en los pines RX %1 TX %2 mensaje %3';
Blockly.Msg['COMMUNICATION_BLUETOOTH_SENDDATA_TOOLTIP'] = IMG_MODULE_HC05 + Blockly.Tooltip.SEP + 'Habilitar el envío de cualquier dato por el módulo Bluetooth HC05 en los pines RX/TX';
Blockly.Msg['COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TITLE'] = '[Bluetooth] sobre mensaje recibido RX %1 TX %2 en %3 entonces';
Blockly.Msg['COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TOOLTIP'] = IMG_MODULE_HC05 + Blockly.Tooltip.SEP + 'Permite ejecutar instrucciones sobre los datos recibidos por el módulo Bluetooth HC05 en la variable \'bluetoothData\' en los pines TX/RX';
Blockly.Msg['COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TITLE'] = '[HM10 BT] enviar en los pines RX %1 TX %2 mensaje %3';
Blockly.Msg['COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TOOLTIP'] = IMG_MODULE_HM10_BT + Blockly.Tooltip.SEP + 'Habilitar el envío de cualquier dato por el módulo Bluetooth HM10 en los pines RX/TX';
Blockly.Msg['COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TITLE'] = '[HM10 BT] en mensaje recibido RX %1 TX %2 en %3 entonces';
Blockly.Msg['COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TOOLTIP'] = IMG_MODULE_HM10_BT + Blockly.Tooltip.SEP + 'Permite ejecutar instrucciones sobre los datos recibidos por el módulo Bluetooth HM10 en la variable \'HM10Data\' en los pines TX/RX. Por defecto, el nombre del módulo es MLT-BT05';
// Communication - Tracking modules
Blockly.Msg['COMMUNICATION_GPS_INFO_TYPE'] = 'tipo de trama';
Blockly.Msg['COMMUNICATION_GPS_INFO_CLOCK'] = 'reloj (h, m, s)';
Blockly.Msg['COMMUNICATION_GPS_INFO_LATITUDE'] = 'latitud (°)';
Blockly.Msg['COMMUNICATION_GPS_INFO_LONGITUDE'] = 'longitud (°)';
Blockly.Msg['COMMUNICATION_GPS_INFO_SATELLITE'] = 'número de satélites utilizados';
Blockly.Msg['COMMUNICATION_GPS_INFO_ALTITUDE'] = 'altitud (m)';
Blockly.Msg['COMMUNICATION_GPS_INFO_ALL_FRAME'] = 'todos los fotogramas';
Blockly.Msg['COMMUNICATION_GPS_GET_NMEA_TITLE'] = '[GPS] NMEA frames on pins RX %1 TX %2';
Blockly.Msg['COMMUNICATION_GPS_GET_NMEA_TOOLTIP'] = IMG_MODULE_GPS + Blockly.Tooltip.SEP + 'Devuelve la lista de tramas NMEA leídas con el módulo GPS Grove SIM28 o Air530 en los pines RX/TX. No es necesario invertir los cables entre los pines del módulo y los indicados en el bloque. La inversión se hace automáticamente en el código python.NAdvertencia: Si utiliza la consola para mostrar los datos del GPS, conecte su tarjeta a la interfaz antes de enviar el programa haciendo clic en el botón [>_ REPL]. Luego transfiera su programa usando el botón [Descargar .hex]';
Blockly.Msg['COMMUNICATION_GPS_GGA_GETINFORMATIONS_TITLE'] = '[GPS] get %3 on RX %1 TX %2 pins';
Blockly.Msg['COMMUNICATION_GPS_GGA_GETINFORMATIONS_TOOLTIP'] = IMG_MODULE_GPS + Blockly.Tooltip.SEP + 'Devuelve los datos seleccionados entre (tipo de trama, reloj, latitud, longitud, altitud) analizados de la trama NMEA (GNGGA o GPGGA) leída con el módulo GPS Grove SIM28 o Air530 en los pines RX/TX. No es necesario invertir los cables entre los pines del módulo y los indicados en el bloque. La inversión se hace automáticamente en el código python.NAdvertencia: Si utiliza la consola para mostrar los datos del GPS, conecte su tarjeta a la interfaz antes de enviar el programa haciendo clic en el botón [>_ REPL]. Luego, transfiera su programa utilizando el botón [Descargar .hex]';
// 05/22 The 2 following blocks removed from toolbox. We keep the block cause of user projects.
Blockly.Msg['COMMUNICATION_GPS_ONDATARECEIVED_TITLE'] = '[GPS] sobre los datos recibidos en los pines TX %1 RX %2 en %3 entonces';
Blockly.Msg['COMMUNICATION_GPS_ONDATARECEIVED_TOOLTIP'] = IMG_MODULE_GPS + Blockly.Tooltip.SEP + 'Permite ejecutar instrucciones sobre los datos recibidos por el módulo GPS en la variable \'gpsData\' en los pines TX/RX';
Blockly.Msg['COMMUNICATION_GPS_GETINFORMATIONS_TITLE'] = '[GPS] obtiene %1 con datos %2';
Blockly.Msg['COMMUNICATION_GPS_GETINFORMATIONS_TOOLTIP'] = IMG_MODULE_GPS + Blockly.Tooltip.SEP + 'Devuelve los datos analizados del módulo gps grove elegido en (\'reloj\',\'latitud,\'longitud\')';
// end of the 2 blocks
Blockly.Msg['COMMUNICATION_RTC_MODULE_PCF85063TP'] = 'Alta precisión (0x51)';
Blockly.Msg['COMMUNICATION_RTC_MODULE_DS1307'] = 'v1.2 (0x68)';
Blockly.Msg['COMMUNICATION_GROVERTC_SETDATE_TITLE'] = '[Clock RTC %1] initialize at %2 date %3';
Blockly.Msg['COMMUNICATION_GROVERTC_SETDATE_TOOLTIP'] = IMG_MODULE_RTC + Blockly.Tooltip.SEP + 'Permite inicializar el módulo de reloj RTC de alta precisión de Grove (PCF85063TP) o RTC v1.2 (DS1307) para poder leer la fecha y la hora exactas mediante el bloque \'Leer módulo de reloj\'. Coloca el bloque \'on start\'. Conecte el módulo en el puerto I2C. Advertencia: Para que funcione, el módulo DS1307 debe tener una pequeña batería descargada';
Blockly.Msg['DAY_MONDAY'] = 'lunes';
Blockly.Msg['DAY_TUESDAY'] = 'martes';
Blockly.Msg['DAY_WEDNESDAY'] = 'miércoles';
Blockly.Msg['DAY_THURSDAY'] = 'thursday';
Blockly.Msg['DAY_FRIDAY'] = 'viernes';
Blockly.Msg['DAY_SATURDAY'] = 'sábado';
Blockly.Msg['DAY_SUNDAY'] = 'domingo';
Blockly.Msg['COMMUNICATION_GROVERTC_SETHOUR_TITLE'] = '[Clock RTC %1] initialize at hour %2 minute %3 second %4';
Blockly.Msg['COMMUNICATION_GROVERTC_SETHOUR_TOOLTIP'] = IMG_MODULE_RTC + Blockly.Tooltip.SEP + 'Permite inicializar el módulo de reloj RTC de alta precisión de Grove (PCF85063TP) o RTC v1.2 (DS1307) para poder leer la fecha y la hora exactas mediante el bloque \'Leer módulo de reloj\'. Coloca el bloque \'on start\'. Conecte el módulo en el puerto I2C. Advertencia: Para que funcione, el módulo DS1307 debe tener una pequeña batería descargada';
Blockly.Msg['COMMUNICATION_GROVERTC_READTIME_TITLE'] = '[Clock RTC %1] read %2';
Blockly.Msg['COMMUNICATION_GROVERTC_READTIME_TOOLTIP'] = IMG_MODULE_RTC + Blockly.Tooltip.SEP + 'Lea la fecha y la hora (elija en el menú desplegable) del módulo de reloj RTC de alta precisión de Grove (PCF85063TP) o RTC v1.2 (DS1307). Para obtener un resultado correcto, utilice primero los dos bloques "Inicializar el módulo de reloj". Conecte el módulo en el puerto I2C. Advertencia: Para que funcione, el módulo DS1307 debe tener una pequeña batería descargada';
Blockly.Msg['CLOCK_ALL_DATA'] = 'tiempo';
Blockly.Msg['CLOCK_YEAR'] = 'año';
Blockly.Msg['CLOCK_MONTH'] = 'mes';
Blockly.Msg['CLOCK_MONTH_DAY'] = 'día del mes';
Blockly.Msg['CLOCK_WEEK_DAY'] = 'día de la semana';
Blockly.Msg['CLOCK_HOUR'] = 'hora';
Blockly.Msg['CLOCK_MINUTE'] = 'minuto';
Blockly.Msg['CLOCK_SECOND'] = 'segundo';
// Communication - UART
Blockly.Msg['COMMUNICATION_SERIAL_INIT_TITLE'] = '[uart] redirigir serie a RX %2 TX %3 baudrate %1';
Blockly.Msg['COMMUNICATION_SERIAL_INIT_TOOLTIP'] = 'Habilitar para redirigir la conexión serie con RX y TX. Cuando conectes el dispositivo, asegúrate de "cruzar" los cables. El pin TX de Raspberry Pi Pico Pi Pico debe estar conectado con el pin RX del dispositivo, y el pin RX con el pin TX del dispositivo';
Blockly.Msg['COMMUNICATION_SERIAL_REDIRECTTOUSB_TITLE'] = '[uart] redirige el puerto serie al puerto USB';
Blockly.Msg['COMMUNICATION_SERIAL_REDIRECTTOUSB_TOOLTIP'] = 'Habilitar para redirigir la conexión serie a USB. Se utiliza si se conectan algunos dispositivos UART al mismo tiempo';
Blockly.Msg['COMMUNICATION_UART_WRITE_TITLE'] = '[uart] escribir datos %1';
Blockly.Msg['COMMUNICATION_UART_WRITE_TOOLTIP'] = 'Escribir datos en el puerto uart';
Blockly.Msg['COMMUNICATION_UART_READ_TITLE'] = '[uart] leer datos';
Blockly.Msg['COMMUNICATION_UART_READ_TOOLTIP'] = 'leer datos del puerto uart';
Blockly.Msg['COMMUNICATION_UART_DATA_AVAILABLE_TITLE'] = '[uart] Datos disponibles';
Blockly.Msg['COMMUNICATION_UART_DATA_AVAILABLE_TOOLTIP'] = 'Devuelve un boolen (1 si hay datos para leer 0 si no)';
// Sensors - common msg
Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperatura';
Blockly.Msg['SENSORS_TEMPERATURE_IN'] = 'en';
Blockly.Msg['SENSORS_HUMIDITY'] = 'humedad (%)';
Blockly.Msg['SENSORS_PRESSURE'] = 'presión (Pa)';
Blockly.Msg['SENSORS_ALTITUDE'] = 'altitud (m)';
// Sensors - Gas
Blockly.Msg['SENSORS_SGP30_READDATA_TITLE'] = '[Sensor SGP30] gas %1 en el puerto %2';
Blockly.Msg['SENSORS_SGP30_READDATA_TOOLTIP'] = IMG_MODULE_SGP30 + Blockly.Tooltip.SEP + 'Devuelve la cantidad de CO2 (en ppm) o TVOC (en ppb) en el aire del sensor sgp30. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_SGP30_CO2'] = 'dióxido de carbono (CO2) (ppm) en el puerto %1';
Blockly.Msg['SENSORS_SGP30_TVOC'] = 'compuestos orgánicos volátiles (TVOC) (ppb) en el puerto %1';
Blockly.Msg['SENSORS_MULTICHANNEL_GETGAS_TITLE'] = '[Sensor de gas multicanal] gas %1 (ppm) en el puerto %2';
Blockly.Msg['SENSORS_MULTICHANNEL_GETGAS_TOOLTIP'] = IMG_MODULE_MULTICHANNEL + Blockly.Tooltip.SEP + 'Devuelve la cantidad de gas elegida en el aire (en ppm) del sensor de gas multicanal de Grove. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_MULTICHANNELV2_GETGAS_TITLE'] = '[Sensor de gas multicanal v2] gas %1 (V)';
Blockly.Msg['SENSORS_MULTICHANNELV2_GETGAS_TOOLTIP'] = IMG_MODULE_MULTICHANNEL_V2 + Blockly.Tooltip.SEP + 'Devuelve la cantidad de gas elegida en el aire (en V) del sensor multicanal de gas V2. Conecte el sensor en el puerto I2C';
Blockly.Msg['GAS_CO'] = 'monóxido de carbono (CO)';
Blockly.Msg['GAS_NO2'] = 'dióxido de nitrógeno (NO2)';
Blockly.Msg['GAS_C2H5OH'] = 'etanol (C2H5OH)';
Blockly.Msg['GAS_H2'] = 'dihidrógeno (H2)';
Blockly.Msg['GAS_NH3'] = 'amoníaco (NH3)';
Blockly.Msg['GAS_CH4'] = 'metano (CH4)';
Blockly.Msg['GAS_C3H8'] = 'propano (C3H8)';
Blockly.Msg['GAS_C4H10'] = 'isopropano (C4H10)';
Blockly.Msg['GAS_VOC'] = 'compuestos orgánicos volátiles (COV)';
Blockly.Msg['SENSORS_O2_GAS_READDATA_TITLE'] = '[Sensor de gas oxígeno] O2 (%) en el pin %1';
Blockly.Msg['SENSORS_O2_GAS_READDATA_TOOLTIP'] = IMG_MODULE_O2 + Blockly.Tooltip.SEP + 'Devuelve la concentración de O2 (en %) del sensor de O2 del surco en los pines P0 a P4, o P10';
Blockly.Msg['SENSORS_SCD30_READDATA_TITLE'] = '[Sensor SCD30] %1 en el puerto %2';
Blockly.Msg['SENSORS_SCD30_READDATA_TOOLTIP'] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + 'Devuelve la concentración de CO2 (en ppm), la humedad (en %) o la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K) del sensor SCD30 de Grove. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_SCD30_CO2'] = 'dióxido de carbono (CO2) (ppm)';
Blockly.Msg['SENSORS_SCD30_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_SCD30_HUM'] = Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSORS_SCD30_FORCED_CALIBRATION_TITLE'] = '[Capteur SCD30] forzar recalibración a %1 (ppm) en el puerto %2';
Blockly.Msg['SENSORS_SCD30_FORCED_CALIBRATION_TOOLTIP'] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + 'Forzar la calibración del sensor SCD30 al valor dado (en ppm). Salga al exterior (donde la concentración sea de aproximadamente 420 ppm, es decir, aire limpio), reinicie la placa y espere 2 minutos. Consejo: Utilice el botón A o B de la placa BBC Raspberry Pi Pico Pi Pico para controlar el inicio de la calibración. De lo contrario, al volver a conectar la placa, el programa se lanza y vuelve a realizar una calibración no necesariamente deseada';
Blockly.Msg['SENSORS_AIR_QUALITY_GETVALUE_TITLE'] = '[Sensor de calidad del aire] valor en el pin %1';
Blockly.Msg['SENSORS_AIR_QUALITY_GETVALUE_TOOLTIP'] = IMG_MODULE_AIR_QUALITY + Blockly.Tooltip.SEP + 'Devuelve el valor de la calidad del aire (de 0 a 1023) en los pines P0 a P4, o P10.';
Blockly.Msg['SENSORS_HM330X_GETPARTICULE_TITLE'] = '[Sensor HM330X] concentración de partículas %1 (µg/m3) en el puerto %2';
Blockly.Msg['SENSORS_HM330X_GETPARTICULE_TOOLTIP'] = IMG_MODULE_HM330X + Blockly.Tooltip.SEP + 'Detecta la densidad de partículas en el aire con el sensor HM330X. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_HM330X_ATM_PM1'] = 'PM1.0';
Blockly.Msg['SENSORS_HM330X_ATM_PM2_5'] = 'PM2.5';
Blockly.Msg['SENSORS_HM330X_ATM_PM10'] = 'PM10.0';
// Sensors - Climate
Blockly.Msg['SENSORS_BMP280_READDATA_TITLE'] = '[Sensor BMP280 %1] %2 en el puerto %3';
Blockly.Msg['SENSORS_BMP280_READDATA_TOOLTIP'] = IMG_MODULE_BMP280 + Blockly.Tooltip.SEP + 'Devuelve la temperatura ambiente en grados Celius (°C), Fahrenheit (°F) o Kelvin (K), presión (en Pa). La altitud se inicializa en 0 cuando el programa se pone en marcha. Utiliza el sensor de barómetro Grove (dirección: 0x77, color: azul) o el sensor HW-611 280 (dirección: 0x76, color: púrpura). Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_BMP280_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_BMP280_PRESS'] = Blockly.Msg['SENSORS_PRESSURE'];
Blockly.Msg['SENSORS_BMP280_ALT'] = Blockly.Msg['SENSORS_ALTITUDE'];
Blockly.Msg['SENSORS_GETGROVEHIGHTEMP_TITLE'] = '[sensor H.T°] temperatura en %1 en los pines A0 %2 A1 %3';
Blockly.Msg['SENSORS_GETGROVEHIGHTEMP_TOOLTIP'] = IMG_MODULE_HIGH_TEMPERATURE + Blockly.Tooltip.SEP + 'Devuelve la temperatura del termopar entre 50 y 600 °C con el sensor de alta temperatura de Grove. Conecte el sensor en los pines analógicos';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TITLE'] = '[Sensor de humedad] humedad en el pin %1';
Blockly.Msg['SENSORS_GETGROVEMOISTURE_TOOLTIP'] = IMG_MODULE_MOISTURE + Blockly.Tooltip.SEP + 'Devuelve la medición de humedad (de 0 a 1023) del sensor de humedad de la arboleda en los pines P0 a P4, o P10';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TITLE'] = '[Sensor de temperatura] temperatura en %1 en el pin %2';
Blockly.Msg['SENSORS_GETGROVETEMPERATURE_TOOLTIP'] = IMG_MODULE_TEMPERATURE + Blockly.Tooltip.SEP + 'Devuelve el valor del sensor de temperatura de la arboleda en grados Celius (°C), Fahrenheit (°F) o Kelvin (K) en los pines analógicos P0 a P4, o P10';
Blockly.Msg['SENSORS_DHT11_READDATA_TITLE'] = '[Sensor DHT11] %1 en pin %2';
Blockly.Msg['SENSORS_DHT11_READDATA_TOOLTIP'] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K), o la humedad (en %) del sensor dht11 en los pines digitales';
Blockly.Msg['SENSORS_DHT22_READDATA_TITLE'] = '[Sensor DHT22] %1 en pin %2';
Blockly.Msg['SENSORS_DHT22_READDATA_TOOLTIP'] = IMG_MODULE_DHT22 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K), o la humedad (en %) con gran precisión gracias al sensor grove dht22 en los pines digitales';
Blockly.Msg['SENSORS_TH02_READDATA_TITLE'] = '[Sensor TH02] %1 en el puerto %2';
Blockly.Msg['SENSORS_TH02_READDATA_TOOLTIP'] = IMG_MODULE_TH02 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K), o la humedad del aire (en %) del sensor TH02. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_SHT31_READDATA_TITLE'] = '[Sensor SHT31] %1 en el puerto %2';
Blockly.Msg['SENSORS_SHT31_READDATA_TOOLTIP'] = IMG_MODULE_SHT31 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K), o la humedad del aire (en %) del sensor SHT31. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_MPX5700AP_GETPRESSURE_TITLE'] = '[Sensor MPX5700AP] presión (kPa) en el pin %1';
Blockly.Msg['SENSORS_MPX5700AP_GETPRESSURE_TOOLTIP'] = IMG_MODULE_MPX5700AP + Blockly.Tooltip.SEP + 'Permite leer la presión del sensor de ranura con la calculadora TI-83';
Blockly.Msg['SENSORS_MPX5700AP_CALIBRATE_TITLE'] = '[Sensor MPX5700AP] calibrar sensor de presión m %1 b %2';
Blockly.Msg['SENSORS_MPX5700AP_CALIBRATE_TOOLTIP'] = IMG_MODULE_MPX5700AP + Blockly.Tooltip.SEP + 'Habilitar para calibrar el sensor de presión con la calculadora TI-83';
Blockly.Msg['SENSORS_GETGROVEWATER_TITLE'] = '[Sensor de agua] cantidad de agua en el pin %1';
Blockly.Msg['SENSORS_GETGROVEWATER_TOOLTIP'] = IMG_MODULE_WATER + Blockly.Tooltip.SEP + 'Devuelve la cantidad de agua (de 0 a 255) del sensor de agua de la arboleda en los pines P0 a P4, o P10';
Blockly.Msg['SENSORS_GETRAINGAUGE_TITLE'] = '[Sensor de pluviómetro] valor de estado en el pin %1';
Blockly.Msg['SENSORS_GETRAINGAUGE_TOOLTIP'] = IMG_MODULE_RAIN_GAUGE + Blockly.Tooltip.SEP + 'Devuelve el estado del pluviómetro (1 si está lloviendo o 0 si no) en los pines digitales P0 a P20';
Blockly.Msg['SENSORS_GETANEMOMETER_TITLE'] = '[Anemómetro] valor del estado en el pin %1';
Blockly.Msg['SENSORS_GETANEMOMETER_TOOLTIP'] = IMG_MODULE_ANEMOMETER + Blockly.Tooltip.SEP + 'Devuelve el estado del anemómetro de la arboleda (dos veces el estado HIGH en cada rotación) en los pines digitales P0 hasta P20';
// Sensors - Sound & Light
Blockly.Msg['SENSORS_GETGROVELIGHT_TITLE'] = '[Sensor de luz] nivel de luz en el pin %1';
Blockly.Msg['SENSORS_GETGROVELIGHT_TOOLTIP'] = IMG_MODULE_LIGHT + Blockly.Tooltip.SEP + 'Devuelve el valor del sensor de luz de la arboleda (de 0 a 1023) en los pines analógicos P0 a P4, o P10';
Blockly.Msg['SENSORS_SI1145_GETLIGHT_TITLE'] = '[Sensor SI1145] obtener luz %1 en el puerto %2';
Blockly.Msg['SENSORS_SI1145_GETLIGHT_TOOLTIP'] = IMG_MODULE_SI1145 + Blockly.Tooltip.SEP + 'Devuelve el índice de luz ultravioleta, luz IR (en lumen) o luz visible (en lumen) del sensor si1145. Funciona con el sensor de luz solar Grove o el sensor GY1145. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_SI1145_UV'] = 'Índice UV';
Blockly.Msg['SENSORS_SI1145_VISIBLE'] = 'visible (lumen)';
Blockly.Msg['SENSORS_SI1145_IR'] = 'infrarrojo (lumen)';
Blockly.Msg['SENSORS_GETUVINDEX_TITLE'] = '[Sensor Ultravioleta] Índice UV en el pin %1';
Blockly.Msg['SENSORS_GETUVINDEX_TOOLTIP'] = IMG_MODULE_UV + Blockly.Tooltip.SEP + 'Devuelve el índice UV, para las ondas entre 240 nm y 380 nm, con el sensor de rayos UV en los pines analógicos A0 a A5';
Blockly.Msg['SENSORS_GROVECOLOR_GETDATA_TITLE'] = '[Sensor de color] %1 en el puerto %2';
Blockly.Msg['SENSORS_GROVECOLOR_GETDATA_TOOLTIP'] = IMG_MODULE_I2C_COLOR + Blockly.Tooltip.SEP + 'Permite leer el nivel de uno de los tres colores primarios con el sensor de color Grove, devuelve un nivel entre 0 y 255. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_GETGROVESOUND_TITLE'] = '[Sensor de sonido] nivel de sonido (dB) en el pin %1 ';
Blockly.Msg['SENSORS_GETGROVESOUND_TOOLTIP'] = IMG_MODULE_SOUND_LOUDNESS + Blockly.Tooltip.SEP + 'Devuelve el valor del sensor de sonido de la arboleda (de 0 a 1023 convertido en dB) en los pines analógicos P0 a P4, o P10';
// Sensors - Distance & Motion
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TITLE'] = '[Sensor Ultrasónico %1] obtiene %2';
Blockly.Msg['SENSORS_GETGROVEULTRASONIC_TOOLTIP'] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + 'Devuelve la medida de la distancia (en cm) o la duración del viaje de ida y vuelta (en µs) del sensor ultrasónico del ranger en los pines digitales P0 a P20. Atención, si es un sensor de ranger, TRIG y ECHO están conectados a SIG';
Blockly.Msg['SENSORS_ULTRASONIC_DISTANCE'] = 'distancia (cm)';
Blockly.Msg['SENSORS_ULTRASONIC_DURATION'] = 'duración del viaje de ida y vuelta (µs)';
Blockly.Msg['SENSORS_ULTRASONIC_1PIN'] = 'en el pin';
Blockly.Msg['SENSORS_ULTRASONIC_2PINS'] = 'en pines';
Blockly.Msg['SENSORS_GETGESTURE_TITLE'] = '[Sensor de gestos] tipo de gesto';
Blockly.Msg['SENSORS_GETGESTURE_TOOLTIP'] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + 'Devuelve el tipo de gesto (\'derecha\', \'izquierda\', \'arriba\', \'abajo\', \'hacia delante\', \'hacia atrás\', \'en el sentido de las agujas del reloj\', \'en sentido contrario\') del sensor de gestos Grove. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_ONGESTUREDETECTED_TITLE'] = '[Sensor de gestos] en el gesto %1 detectado entonces';
Blockly.Msg['SENSORS_ONGESTUREDETECTED_TOOLTIP'] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + 'Ejecuta las instrucciones si el sensor de gestos de Grove detecta el gesto seleccionado. Conecte el sensor en el puerto I2C';
Blockly.Msg['SENSORS_GESTURE_RIGHT'] = 'derecho';
Blockly.Msg['SENSORS_GESTURE_LEFT'] = 'izquierda';
Blockly.Msg['SENSORS_GESTURE_UP'] = 'arriba';
Blockly.Msg['SENSORS_GESTURE_DOWN'] = 'abajo';
Blockly.Msg['SENSORS_GESTURE_FORWARD'] = 'hacia adelante';
Blockly.Msg['SENSORS_GESTURE_BACKWARD'] = 'hacia atrás';
Blockly.Msg['SENSORS_GESTURE_CLOCKWISE'] = 'en el sentido de las agujas del reloj';
Blockly.Msg['SENSORS_GESTURE_ANTICLOCKWISE'] = 'en sentido contrario a las agujas del reloj';
Blockly.Msg['SENSORS_GESTURE_WAVE'] = 'onda';
Blockly.Msg['SENSORS_GETGROVELINEFINDER_TITLE'] = '[Sensor del buscador de líneas] estado del buscador de líneas en el pin %1';
Blockly.Msg['SENSORS_GETGROVELINEFINDER_TOOLTIP'] = IMG_MODULE_LINE_FINDER + Blockly.Tooltip.SEP + 'Devuelve el estado del sensor táctil de ranura (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['SENSORS_GETGROVEMOTION_TITLE'] = '[Sensor de movimiento PIR] valor del estado de movimiento en el pin %1';
Blockly.Msg['SENSORS_GETGROVEMOTION_TOOLTIP'] = IMG_MODULE_MOTION + Blockly.Tooltip.SEP + 'Devuelve el estado de movimiento del PIR (0 si hay movimiento o 1 en caso contrario) en los pines digitales P0 a P20';
Blockly.Msg['SENSORS_GETPIEZOVIBRATION_TITLE'] = '[Sensor de vibración piezoeléctrico] valor del estado en el pin %1';
Blockly.Msg['SENSORS_GETPIEZOVIBRATION_TOOLTIP'] = IMG_MODULE_VIBRATIONS + Blockly.Tooltip.SEP + 'Devuelve el estado de vibración (0 o 1) del sensor piezoeléctrico de vibración en los pines digitales P0 a P20';
Blockly.Msg['SENSORS_GETGROVETILT_TITLE'] = '[Módulo de inclinación] estado de inclinación en el pin %1';
Blockly.Msg['SENSORS_GETGROVETILT_TOOLTIP'] = IMG_MODULE_TILT + Blockly.Tooltip.SEP + 'Devuelve el estado de inclinación de la arboleda (0 o 1) en los pines digitales P0 hasta P20';
// Other sensors
Blockly.Msg['SENSORS_GETGROVEBUTTON_TITLE'] = '[Módulo de botones] botón %1 en el pin %2';
Blockly.Msg['SENSORS_GETGROVEBUTTON_TOOLTIP'] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + 'Devuelve el valor numérico del botón Grove (0/1 o 0V/3.3V) en los pines digitales P0 hasta P20';
Blockly.Msg['SENSORS_GETGROVEBUTTON_VOLTAGE'] = 'voltaje';
Blockly.Msg['SENSORS_GETGROVEBUTTON_STATE'] = 'estado';
Blockly.Msg['SENSORS_DS18B20_GETTEMPERATURE_TITLE'] = '[Sensor DS18B20] temperatura en %1 en el pin %2';
Blockly.Msg['SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP'] = IMG_MODULE_DS18B20 + Blockly.Tooltip.SEP + 'Devuelve la temperatura en grados Celsius (°C), Fahrenheit (°F) o Kelvin (K) del sensor de temperatura resistente al agua DS18B20 en los pines digitales';
// Actuators
Blockly.Msg['ACTUATORS_SERVO_SETANGLE_TITLE'] = '[Servomotor] establece el ángulo a %1 en el pin %2';
Blockly.Msg['ACTUATORS_SERVO_SETANGLE_TOOLTIP'] = IMG_MODULE_SERVO + Blockly.Tooltip.SEP + 'Permite controlar el ángulo del servomotor (de 0 a 180) en los pines digitales de P0 a P20. Atención, el Raspberry Pi Pico debe ser alimentado por una batería externa para proporcionar suficiente energía al servomotor';
Blockly.Msg['ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE'] = '[Servomotor continuo] establece la velocidad en %1 (%) dirección %2 en el pin %3';
Blockly.Msg['ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP'] = IMG_MODULE_CONTINUOUS_SERVO + Blockly.Tooltip.SEP + 'Habilitar para controlar la velocidad del servomotor continuo (de 0 a 100 %) en los pines PWM';
Blockly.Msg['ACTUATORS_MOTOR_SETPOWER_TITLE'] = '[Motor] establece la potencia a %1 en el pin %2';
Blockly.Msg['ACTUATORS_MOTOR_SETPOWER_TOOLTIP'] = IMG_MODULE_MOTOR + Blockly.Tooltip.SEP + 'Permite controlar la potencia del motor de CC (de 0 a 1023) en los pines digitales P0 a P20. Atención, el Raspberry Pi Pico tiene que ser alimentado por una batería externa para proporcionar suficiente energía al motor DC';
Blockly.Msg['ACTUATORS_GROVERELAY_CONTROL_TITLE'] = '[Módulo de relés] controla el relé al estado %1 en el pin %2';
Blockly.Msg['ACTUATORS_GROVERELAY_CONTROL_TOOLTIP'] = IMG_MODULE_RELAY + Blockly.Tooltip.SEP + 'Habilitar para controlar el estado del módulo de relé de la ranura (0 o 1) en los pines digitales P0 a P20';
Blockly.Msg['ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE'] = '[Motor de vibración] controlar el motor al estado %1 en el pin %2';
Blockly.Msg['ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP'] = IMG_MODULE_VIBRATION_MOTOR + Blockly.Tooltip.SEP + 'Habilitar para controlar el estado del motor de vibración de la ranura (0 o 1) en los pines digitales P0 a P20';
// Actuators - MOSFET
Blockly.Msg['ACTUATORS_MOSFET_SETSTATE_TITLE'] = '[MOSFET] control state to %1 on pin %2';
Blockly.Msg['ACTUATORS_MOSFET_SETSTATE_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Allows you to control the state of the MOSFET transistor (0 or 1) on a PWM pin.';
Blockly.Msg['ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE'] = '[MOSFET] control power to %1 (%) on pin %2';
Blockly.Msg['ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Allows you to control the output power of the MOSFET transistor (from 0 to 100%) on a PWM pin.';
Blockly.Msg['ACTUATORS_MOSFET_SETFREQUENCY_TITLE'] = '[MOSFET] control frequency to %1 (Hz) on pin %2';
Blockly.Msg['ACTUATORS_MOSFET_SETFREQUENCY_TOOLTIP'] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + 'Allows you to control the cycle frequency (Hz) of the MOSFET transistor on a PWM pin.';
Blockly.Msg['ACTUATORS_MOSFET_PULL'] = 'pull';
// Actuators - Music
Blockly.Msg['ACTUATORS_MUSIC_PLAYMUSIC_TITLE'] = '[Música] reproducir música %1 en %2';
Blockly.Msg['ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Habilita la reproducción de la música elegida en el altavoz Raspberry Pi Pico incorporado o en el módulo buzzer de Grove en los pines digitales P0 a P20';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TITLE'] = '[Música] reproducir notas en';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Activar la reproducción de notas en el altavoz Raspberry Pi Pico incorporado o en el módulo de zumbido (o altavoz) en los pines digitales P0 a P20';
Blockly.Msg['ACTUATORS_MUSIC_NOTE_TITLE'] = 'nota %1 en la octava %2 con duración %3';
Blockly.Msg['ACTUATORS_MUSIC_NOTE_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Define una nota con octava y duración';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE'] = '[Música] reproducir frecuencia %1 durante %2 (ms) en %3';
Blockly.Msg['ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Activar la reproducción de la frecuencia entera en el módulo zumbador o en el altavoz en los pines digitales P0 a P20';
Blockly.Msg['ACTUATORS_MUSIC_STOP_TITLE'] = '[Música] detener la música en %1';
Blockly.Msg['ACTUATORS_MUSIC_STOP_TOOLTIP'] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + 'Activar para detener la música del módulo zumbador (o altavoz) Grove en los pines digitales';
// Notes
Blockly.Msg['NOTE_C'] = 'C';
Blockly.Msg['NOTE_C_SHARP'] = 'C#';
Blockly.Msg['NOTE_D'] = 'D';
Blockly.Msg['NOTE_D_SHARP'] = 'D#';
Blockly.Msg['NOTE_E'] = 'E';
Blockly.Msg['NOTE_F'] = 'F';
Blockly.Msg['NOTE_F_SHARP'] = 'F#';
Blockly.Msg['NOTE_G'] = 'G';
Blockly.Msg['NOTE_G_SHARP'] = 'G#';
Blockly.Msg['NOTE_A'] = 'A';
Blockly.Msg['NOTE_A_SHARP'] = 'A#';
Blockly.Msg['NOTE_B'] = 'B';
Blockly.Msg['MUSIC_SILENCE'] = 'Silencio';

// Process
Blockly.Msg['ON_START_CORE0_TITLE'] = '[core0] Al inicio';
Blockly.Msg['ON_START_CORE0_TOOLTIP'] = 'Inicia la cola de ejecución principal en core0 de la Raspberry Pi Pico.';
Blockly.Msg['FOREVER_CORE0_TITLE'] = '[core0] Repetir indefinidamente';
Blockly.Msg['PROCESS_FOREVER_CORE1_TITLE'] = '[core1] Repetir indefinidamente';
Blockly.Msg['PROCESS_ON_START_CORE1_TITLE'] = '[core1] Al inicio';
Blockly.Msg['PROCESS_ON_START_CORE1_TOOLTIP'] = 'Se utiliza para iniciar una segunda cola de ejecución en core1 de la Raspberry Pi Pico.';
Blockly.Msg['PROCESS_EXIT_CORE1_TITLE'] = '[core1] exit process';
Blockly.Msg['PROCESS_EXIT_CORE1_TOOLTIP'] = 'Se utiliza para salir de core1 de la Raspberry Pi Pico.';
Blockly.Msg['PROCESS_GLOBAL_VAR_TITLE'] = 'make %1 a global variable';
Blockly.Msg['PROCESS_GLOBAL_VAR_TOOLTIP'] = 'Transforms a local variable into a global variable so that processes can communicate with each other.';


Blockly.Msg["ROBOTS_KITRO_MOVE_TITLE"] = "[Kitronik] controlar robot %1 velocidad %2 %";
Blockly.Msg["ROBOTS_KITRO_MOVE_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Permite controlar la dirección del robot Kitronik";
Blockly.Msg["ROBOTS_KITRO_MOVE_FORWARD"] = "avanzar";
Blockly.Msg["ROBOTS_KITRO_MOVE_BACKWARD"] = "retroceder";

Blockly.Msg["ROBOTS_KITRO_ROTATE_TITLE"] = "[Kitronik] girar robot hacia %1 velocidad %2 %";
Blockly.Msg["ROBOTS_KITRO_ROTATE_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Permite girar el robot Kitronik a la derecha o izquierda a una velocidad entre 70% y 100%";
Blockly.Msg["ROBOTS_KITRO_ROTATE_RIGHT"] = "derecha";
Blockly.Msg["ROBOTS_KITRO_ROTATE_LEFT"] = "izquierda";

Blockly.Msg["ROBOTS_KITRO_STOP_TITLE"] = "[Kitronik] detener el robot";
Blockly.Msg["ROBOTS_KITRO_STOP_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Detiene el robot Kitronik";

Blockly.Msg["ROBOTS_KITRO_CONTROL_MOTOR_TITLE"] = "[Kitronik] controlar motor %1 dirección %2 velocidad %3 %";
Blockly.Msg["ROBOTS_KITRO_CONTROL_MOTOR_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Controla el motor derecho o izquierdo del robot Kitronik en la dirección (↻: ADELANTE, ↺: ATRÁS) y velocidad deseada (de 70% a 100%)";
Blockly.Msg["ROBOTS_KITRO_MOTOR_RIGHT"] = "derecho";
Blockly.Msg["ROBOTS_KITRO_MOTOR_LEFT"] = "izquierdo";

Blockly.Msg["ROBOTS_KITRO_SETANGLE_TITLE"] = "[Kitronik] girar el robot por %1 °";
Blockly.Msg["ROBOTS_KITRO_SETANGLE_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Controla la dirección del robot (en grados)";

Blockly.Msg["ROBOTS_KITRO_MOVE_ONE_SQUARE_FORWARD_TITLE"] = "[Kitronik] avanzar un cuadro";
Blockly.Msg["ROBOTS_KITRO_MOVE_ONE_SQUARE_FORWARD_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Mueve el robot Kitronik adelante por un cuadro";

Blockly.Msg["ROBOTS_KITRO_MOVE_ONE_SQUARE_BACKWARD_TITLE"] = "[Kitronik] retroceder un cuadro";
Blockly.Msg["ROBOTS_KITRO_MOVE_ONE_SQUARE_BACKWARD_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Mueve el robot Kitronik atrás por un cuadro";

Blockly.Msg["ROBOTS_KITRO_ROTATE_LEFT_TITLE"] = "[Kitronik] girar a la izquierda";
Blockly.Msg["ROBOTS_KITRO_ROTATE_LEFT_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Gira el robot Kitronik 90° a la izquierda";

Blockly.Msg["ROBOTS_KITRO_ROTATE_RIGHT_TITLE"] = "[Kitronik] girar a la derecha";
Blockly.Msg["ROBOTS_KITRO_ROTATE_RIGHT_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Gira el robot Kitronik 90° a la derecha";

Blockly.Msg["ROBOTS_KITRO_ULTRASONICRANGER_TITLE"] = "[Kitronik] %1 en sensor %2";
Blockly.Msg["ROBOTS_KITRO_ULTRASONICRANGER_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Devuelve la distancia (en cm) o duración (en μs) del viaje redondo de la onda entre un obstáculo y el robot Kitronik gracias al sensor ultrasónico";
Blockly.Msg["ROBOTS_KITRO_ULTRASONIC_DISTANCE"] = "distancia (cm)";
Blockly.Msg["ROBOTS_KITRO_ULTRASONIC_DURATION"] = "duración del viaje redondo (μs)";
Blockly.Msg["ROBOTS_KITRO_ULTRASONIC_SENSOR_FRONT"] = "delantero";
Blockly.Msg["ROBOTS_KITRO_ULTRASONIC_SENSOR_BACK"] = "trasero";

Blockly.Msg["ROBOTS_KITRO_READ_LINE_FINDER_TITLE"] = "[Kitronik] estado del sensor de línea %1";
Blockly.Msg["ROBOTS_KITRO_READ_LINE_FINDER_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Lee el estado del sensor seguidor de línea izquierdo o derecho del robot Kitronik. El bloque devuelve 1 si el sensor está sobre la línea";
Blockly.Msg["ROBOTS_KITRO_LINE_RIGHT"] = "derecho";
Blockly.Msg["ROBOTS_KITRO_LINE_LEFT"] = "izquierdo";
Blockly.Msg["ROBOTS_KITRO_LINE_CENTER"] = "centro";

Blockly.Msg["ROBOTS_KITRO_CONTROL_LED_COLOR_TITLE"] = "[Kitronik] controlar LED RGB %1 %2";
Blockly.Msg["ROBOTS_KITRO_CONTROL_LED_COLOR_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Lee el estado del sensor seguidor de línea izquierdo o derecho del robot Kitronik. El bloque devuelve 1 si el sensor está sobre la línea";
Blockly.Msg["ROBOTS_KITRO_TOP_LEFT"] = "delantero izquierdo (0)";
Blockly.Msg["ROBOTS_KITRO_TOP_RIGHT"] = "delantero derecho (1)";
Blockly.Msg["ROBOTS_KITRO_BOT_RIGHT"] = "trasero derecho (2)";
Blockly.Msg["ROBOTS_KITRO_BOT_LEFT"] = "trasero izquierdo (3)";

Blockly.Msg["ROBOTS_KITRO_CONTROL_RGB_LED_TITLE"] = "[Kitronik] controlar LED RGB %1 R %2 G %3 B %4";
Blockly.Msg["ROBOTS_KITRO_CONTROL_RGB_LED_TOOLTIP"] = IMG_ROBOT_KITRONIK_PICO + Blockly.Tooltip.SEP + "Lee el estado del sensor seguidor de línea izquierdo o derecho del robot Kitronik. El bloque devuelve 1 si el sensor está sobre la línea";

// Cámara - Wio lite AI
Blockly.Msg['WIO_GET_DATA_TITLE'] = '[Wio lite] recuperar todos los datos en el puerto %1';
Blockly.Msg['WIO_GET_CLASS_DATA_BY_ID_TITLE'] = '[Wio lite] probabilidad de la clase n.º %1 en el puerto %2';
Blockly.Msg['WIO_GET_CLASS_MAX_ID_TITLE'] = '[Wio lite] ID de la clase detectada en el puerto %1';
Blockly.Msg['WIO_GET_STATUS_TITLE'] = '[Wio lite] obtener %1 en el puerto %2';