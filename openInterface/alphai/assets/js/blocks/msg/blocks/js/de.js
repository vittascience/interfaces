/**
 * @fileoverview Deutsch messages for AlphAI. (FR)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'warten %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Unterbricht die Ausführung des Codes.';
Blockly.Msg['IO_WAIT_SECOND'] = 'Sekunde(n)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'Millisekunde(n)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'Mikrosekunde(n)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'warten bis %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppt die Ausführung des Codes, bis die Bedingung erfüllt ist.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Stoppuhr starten';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Setzt die Stoppuhr auf 0 (Sekunden).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Stoppuhrwert in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Gibt den Stoppuhrwert seit dem Start zurück (in Sekunden oder Millisekunden).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'in die Konsole schreiben %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Schreibt eine Nachricht in die Ausgabekonsole.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 mit Geschwindigkeit %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Bewegt den Roboter in die gewählte Richtung mit der angegebenen Geschwindigkeit (zwischen -100 und 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'Geschwindigkeit linker Motor %1 rechter Motor %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Steuert die Geschwindigkeit der linken und rechten Motoren des Roboters (zwischen -100 und 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'für';
Blockly.Msg['ROBOT_FORWARD'] = 'vorwärts';
Blockly.Msg['ROBOT_BACKWARD'] = 'rückwärts';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'nach links drehen';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'nach rechts drehen';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'Roboter anhalten';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Hält den Roboter an.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 den Summer';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Schaltet den Summer des Roboters ein oder aus.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'einschalten';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'ausschalten';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'Ist der Roboter blockiert?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Gibt true zurück, wenn der Roboter blockiert ist, sonst false.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'Abstandssensorwert (in cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Gibt den Wert des Abstandssensors des Roboters zurück (in cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'Werte der Linienfolgesensoren %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Ermöglicht das Lesen der Werte der Linienfolgesensoren von 0-500 (schwarz) bis 500-1000 (weiß). Die Option \'alle\' im Block gibt ein Array mit den Werten der 5 Sensoren zurück.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'alle';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'Kamera mit Auflösung %1 aktivieren';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Aktiviert die Kamera des Roboters mit der gewählten Auflösung.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'Kamerabild';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Gibt das von der Kamera des Roboters aufgenommene Bild zurück. Wenn die gewählte Auflösung \'1x1\' ist, wird eine Liste mit 3 Ganzzahlen (R-, G-, B-Komponenten) zwischen 0 und 255 zurückgegeben. Bei der Auflösung \'1x2\' wird eine Liste mit 2 Listen mit je 3 Ganzzahlen zurückgegeben. In anderen Fällen wird eine Liste von n_zeilen Listen von n_spalten Listen mit jeweils 3 Ganzzahlen zurückgegeben.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'LEDs steuern R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Steuert die LEDs des Roboters, indem die Rot-, Grün- und Blauwerte angegeben werden (zwischen 0 und 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'LEDs auf %1 setzen';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Stellt die LEDs des Roboters auf eine Farbe aus der Palette ein.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'alle';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'verzögern, warten';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'warten, pausieren';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'zurücksetzen, Stoppuhr';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'Stoppuhr, vergangene, Zeit';
Blockly.Msg['ROBOT_PRINT_MESSAGE_KEYWORDS'] = 'Konsole, Nachricht';
Blockly.Msg['ROBOT_SET_DIRECTION_KEYWORDS'] = 'fahren, steuern';
Blockly.Msg['ROBOT_SET_MOTOR_KEYWORDS'] = 'fahren, rollen';
Blockly.Msg['ROBOT_STOP_KEYWORDS'] = 'stoppen, bremsen';
Blockly.Msg['ROBOT_SET_BUZZER_KEYWORDS'] = 'Signalgeber, Alarm';
Blockly.Msg['ROBOT_IS_BLOCKED_KEYWORDS'] = 'Hindernis, festgefahren, Hindernis';
Blockly.Msg['ROBOT_GET_DISTANCE_KEYWORDS'] = 'Hindernis, Entfernung, Nähe';
Blockly.Msg['ROBOT_GET_INFRA_RED_KEYWORDS'] = 'infrarot, Sensor, Linie';
Blockly.Msg['ROBOT_SET_CAMERA_KEYWORDS'] = 'Webcam, Video, Aufnahme';
Blockly.Msg['ROBOT_GET_CAMERA_KEYWORDS'] = 'Kamera, Foto, Bild';
Blockly.Msg['ROBOT_SET_LEDS_RGB_KEYWORDS'] = 'LED, Farbe, RGB';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_KEYWORDS'] = 'LED, Farbe, Palette';
