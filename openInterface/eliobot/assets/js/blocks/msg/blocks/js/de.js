/**
 * @fileoverview English messages for Eliobot. (EN)
 */
'use strict';

// Display - Buint-in LED
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TITLE'] = 'integrierte LED steuern %1';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP'] = 'Schaltet die integrierte RGB-LED des Eliobot ein.';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE'] = 'integrierte LED ausschalten';
Blockly.Msg['DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP'] = 'Schaltet die integrierte RGB-LED des Eliobot aus.';
// Display - Eyes
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'Farbe von %1 auf %2 ändern';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Ändert die Farbe der Augen des Eliobot.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'vom linken Auge';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'vom rechten Auge';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'beide Augen';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'Emotion %1 auf %2 anzeigen';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Zeigt eine vordefinierte Emotion auf den Augen des Eliobot an.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'müde';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'glücklich';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'traurig';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'wütend';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'verwirrt';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'überrascht';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'schläfrig';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutral';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'begeistert';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'schwindelig';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'Musik';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'Liebe';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'erstaunt';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'Pfeil nach links';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'Pfeil nach rechts';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'Pfeil nach unten';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'Pfeil nach oben';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'Auf der Augenmatrix anzeigen (einfarbig)';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Zeigt ein individuelles Bild auf den Augen des Eliobot an.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'rechtes Auge';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'linkes Auge';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "Auf der Augenmatrix anzeigen (Palette)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Zeigt ein individuelles Bild auf den Augen des Eliobot an. Jeder Pixel der Matrix kann mit einer anderen Farbe konfiguriert werden.';

// Input/Output - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'warten %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausiert die Ausführung des Codes.';
Blockly.Msg['IO_WAIT_SECOND'] = 'Sekunde(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'Millisekunde(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'Mikrosekunde(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'warten bis %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppt die Ausführung des Codes, bis die Bedingung erfüllt ist.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Chronometer auf 0 zurücksetzen';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Setzt den Chronometer auf 0 (in Sekunden).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Wert des Chronometers in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Gibt den Wert des Chronometers seit der Initialisierung zurück (in Sekunden oder Millisekunden).';

// Communication - Serial connection
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'In die Konsole schreiben %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Schreibt Daten in die Konsole.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'mit';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'Zeilenumbrüche';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE'] = 'Graph zeichnen';
Blockly.Msg['COMMUNICATION_WRITEGRAPH_TOOLTIP'] = 'Dieser Block schreibt numerische Daten, die im Plotter sichtbar sind. Er kann mit einem oder mehreren Blöcken im Format "Name" und "Daten" verwendet werden. Um die Grafiken anzuzeigen, klicken Sie in der Konsole auf das Symbol \'Graphmodus\'.';
Blockly.Msg["COMMUNICATION_DATA"] = "Daten";
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TITLE'] = 'Name %1 Wert %2';
Blockly.Msg['COMMUNICATION_PRINT_DATAS_TOOLTIP'] = 'Dieser Block wird zusammen mit dem Block "Graph zeichnen" benutzt. Er muss den Namen des anzuzeigenden Werts (Text) und den Wert selbst (Zahl) enthalten.';
// Communication - IR remote
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'Signal vom Sensor %1 lesen';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Liest den von der Infrarotfernbedienung des Eliobot gesendeten Befehl. Dieser Block gibt eine Zeichenkette zurück, die der empfangenen Taste entspricht (oben, unten, links, rechts, Mitte).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'vorwärts';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'rückwärts';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'wenn der Befehl %1 von der Infrarotfernbedienung empfangen wird, dann';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Liest den von der Infrarotfernbedienung des Eliobot gesendeten Befehl. Dieser Block gibt eine Zeichenkette zurück, die der empfangenen Taste entspricht (oben, unten, links, rechts, Mitte).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'Der Befehl %1 wurde von der Infrarotfernbedienung empfangen';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Prüft, ob ein bestimmter Befehl der Infrarotfernbedienung des Eliobot empfangen wurde. Dieser Block gibt einen booleschen Wert zurück: wahr, wenn der angegebene Befehl empfangen wurde, sonst falsch.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'oben';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'unten';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'links';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'rechts';
Blockly.Msg['COMMUNICATION_IR_REMOTE_OK'] = 'ok';
Blockly.Msg['COMMUNICATION_IR_REMOTE_1'] = '1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_2'] = '2';
Blockly.Msg['COMMUNICATION_IR_REMOTE_3'] = '3';
Blockly.Msg['COMMUNICATION_IR_REMOTE_4'] = '4';
Blockly.Msg['COMMUNICATION_IR_REMOTE_5'] = '5';
Blockly.Msg['COMMUNICATION_IR_REMOTE_6'] = '6';
Blockly.Msg['COMMUNICATION_IR_REMOTE_7'] = '7';
Blockly.Msg['COMMUNICATION_IR_REMOTE_8'] = '8';
Blockly.Msg['COMMUNICATION_IR_REMOTE_9'] = '9';
Blockly.Msg['COMMUNICATION_IR_REMOTE_0'] = '0';
Blockly.Msg['COMMUNICATION_IR_REMOTE_HT'] = '#';
Blockly.Msg['COMMUNICATION_IR_REMOTE_ST'] = '*';

// Sensors
Blockly.Msg['SENSORS_READ_OBSTACLE_TITLE'] = 'Ein Hindernis ist %1';
Blockly.Msg['SENSORS_READ_OBSTACLE_TOOLTIP'] = 'Erkennt, ob ein Hindernis vorhanden ist.';
Blockly.Msg['SENSORS_READ_OBSTACLE_FORWARD'] = 'vorne';
Blockly.Msg['SENSORS_READ_OBSTACLE_BACKWARD'] = 'hinten';
Blockly.Msg['SENSORS_READ_OBSTACLE_RIGHT'] = 'rechts';
Blockly.Msg['SENSORS_READ_OBSTACLE_LEFT'] = 'links';
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'Linie folgen';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Lässt den Eliobot einer Linie folgen.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'Empfindlichkeit der Linienverfolgung %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Ändert die Empfindlichkeit der Liniensensoren des Eliobot.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'Zustand des Liniensensors %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Gibt den Zustand eines Linienfolgesensors zurück.';
Blockly.Msg['SENSORS_LINE_LEFT'] = 'links';
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = 'mittellinks';
Blockly.Msg['SENSORS_LINE_MIDDLE'] = 'mitte';
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = 'mittelrechts';
Blockly.Msg['SENSORS_LINE_RIGHT'] = 'rechts';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'Wert des Liniensensors %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Gibt den Wert eines Liniensensors des Eliobot zurück.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'Automatische Kalibrierung der Liniensensoren';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Kalibriert automatisch die Liniensensoren des Eliobot. Der Roboter muss dazu zuerst auf eine helle und dann auf eine dunkle Oberfläche gestellt werden.';

// Actuators - robot
Blockly.Msg['ROBOT_MOVE_TITLE'] = ' %1';
Blockly.Msg['ROBOT_MOVE_TOOLTIP'] = 'Ermöglicht die Steuerung der Motoren des Eliobot zum Vor- oder Rückwärtsfahren.';
Blockly.Msg['ROBOT_MOVE_FORWARD'] = 'vorwärts';
Blockly.Msg['ROBOT_MOVE_BACKWARD'] = 'rückwärts';
Blockly.Msg['ROBOT_ROTATE_TITLE'] = 'drehen nach %1';
Blockly.Msg['ROBOT_ROTATE_TOOLTIP'] = 'Dreht den Eliobot nach links oder rechts.';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'rechts';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'links';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'Motoren stoppen';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Stoppt die Motoren des Eliobot.';
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'Geschwindigkeit auf %1 % einstellen';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Ändert die Geschwindigkeit des Eliobot.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'drehen nach %1 um %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Dreht den Eliobot nach links oder rechts um den gewünschten Winkel.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'Rad %1 in Richtung %2 drehen';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Dreht eines der Räder des Eliobot in die gewünschte Richtung.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 um %2 Feld(er)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Ermöglicht dem Eliobot, sich feldweise zu bewegen.';
Blockly.Msg['ROBOT_TURN_90_TITLE'] = 'drehen nach %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Dreht den Eliobot um 90° nach links oder rechts.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'Größe eines Feldes %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Legt die Größe eines Feldes für die feldweise Bewegung des Eliobot fest.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'rechts';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'links';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'warten %1 %2 bevor die Motoren gestoppt werden';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Lässt den Eliobot vor dem Anhalten eine bestimmte Zeit warten.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'Sekunde(n)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'Millisekunde(n)';
// Actuators - Buzzer
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'Spiele die Note %1 für %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Dieser Block spielt eine Note. Die Note wird durch ihren Namen (Do, Ré, Mi, Fa, Sol, La, Si) und die Dauer bestimmt.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'Spiele die Frequenz %1 (Hz) für %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Dieser Block spielt eine Frequenz. Sie wird in Hertz (Hz) angegeben und die Dauer legt fest, wie lange sie gespielt wird.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'Spiele die Musik %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Dieser Block spielt eine vordefinierte Melodie. Es sind mehrere vorgefertigte Melodien verfügbar.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'Lautstärke auf %1 % einstellen';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Ändert die Lautstärke des Eliobot.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'Spiele den Ton %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Dieser Block spielt einen vordefinierten Ton. Es sind mehrere Töne verfügbar.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'Sprung';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'Laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'Frage';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'Fehler';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'Explosion';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'Landung';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'fröhlich';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'Sieg';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'Alarm';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'Hallo';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'Start';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'Kollision';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'Blinken';

// Backpack - Display
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[OLED-Display] Text %1 in Zeile %2 anzeigen';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Zeigt Text auf dem SSD1306-OLED-Display an.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[OLED-Display] Display löschen';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Löscht den Text auf dem SSD1306-OLED-Display.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[5x5 RGB-Matrix] Bild anzeigen';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Zeigt eine Grafik auf der 5x5 RGB-LED-Matrix an.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[5x5 RGB-Matrix] Matrix löschen';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Löscht die 5x5 RGB-LED-Matrix.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[5x5 RGB-Matrix] %1 in %2 anzeigen';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Zeigt ein Symbol in der gewünschten Farbe an.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[5x5 RGB-Matrix] Text %1 in %2 scrollen';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Lässt eine Zeichenfolge in der gewünschten Farbe über die 5x5-LED-Matrix laufen.';
// Backpack - Sensors
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Gibt die Temperatur in Grad Celsius (°C) oder die Luftfeuchtigkeit (in %) des DHT11-Sensors zurück.';
Blockly.Msg['SENSOR_TEMPERATURE'] = 'Temperatur';
Blockly.Msg['SENSOR_HUMIDITY'] = 'Luftfeuchtigkeit';
Blockly.Msg['SENSOR_PRESSURE'] = 'Druck';
Blockly.Msg['SENSOR_ALTITUDE'] = 'Höhe';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Gibt vom BME280-Sensor die Temperatur (°C von −40 bis 85, °F oder K), die Luftfeuchte (in %), den Druck (in Pascal) oder die Höhe (in m) zurück.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] Luftdruck auf Meereshöhe auf %1 einstellen';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Ermöglicht das Festlegen des Meeresspiegeldrucks für den BME280-Sensor, der zur Berechnung der Höhe verwendet wird.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] Entfernung';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Gibt die Entfernung in cm mit dem Ultraschallsensor HC-SR04 zurück.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Lichtsensor] Helligkeit an Pin %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Gibt den Helligkeitswert des Sensors am ausgewählten Pin zurück.';
// Backpack - IO - Buttons
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TITLE'] = '[Taster] %1 an Pin %2 gedrückt';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_TOOLTIP'] = 'Gibt den Zustand des Tasters zurück, der an IO2 oder IO15 angeschlossen ist.';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_PRESSED'] = 'ist';
Blockly.Msg['BACKPACK_IO_BUTTON_STATE_NOT_PRESSED'] = 'ist nicht';
// Backpack - IO - Potentiometer
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potentiometer] Wert an Pin %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Gibt den Wert des am Pin IO2 oder IO15 angeschlossenen Potentiometers zurück.';
// Backpack - Actuators - Motors
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servomotor] Winkel auf %1° an Pin %2 einstellen';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Ermöglicht die Steuerung des Winkels (0–180°) eines Servomotors an PWM-Pins.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Kontinuierlicher Servomotor] Geschwindigkeit %1 (%) Richtung %2 an Pin %3 einstellen';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Ermöglicht die Steuerung der Drehgeschwindigkeit (0–100 %) eines kontinuierlichen Servomotors an PWM-Pins.';
// Backpack - Actuators - Buzzer
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] Frequenz %1 mit Lautstärke %2 an Pin %3 abspielen';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Ermöglicht das Abspielen einer Frequenz mit einem Grove-Buzzer-Modul.';

// Network - Wifi
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Mit WLAN verbinden: SSID %1, Passwort %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Verbindet Eliobot mit einem WLAN anhand des angegebenen Namens (SSID) und Passworts.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Vom WLAN trennen';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Trennt Eliobot vom aktuell verbundenen WLAN.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'WLAN-Zugangspunkt öffnen: SSID %1, Passwort %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Erstellt auf dem Eliobot einen WLAN-Zugangspunkt mit dem angegebenen Namen und Passwort.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Hostname festlegen %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Legt den Hostnamen von Eliobot im Netzwerk fest. Über diesen Namen kann man Eliobot im Browser erreichen.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Sendeleistung der WLAN-Antenne festlegen %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Stellt die Sendeleistung der WLAN-Antenne von Eliobot ein (in dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'Mit WLAN verbunden?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Gibt true zurück, wenn Eliobot mit einem WLAN verbunden ist, sonst false.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'Verfügbare WLAN-Netze scannen';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Gibt die Liste der in der Nähe verfügbaren WLAN-Netze zurück.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'IP-Adresse von Eliobot';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Gibt die IP-Adresse von Eliobot im WLAN zurück.';
// Network - HTML
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Eine Webseite erstellen mit Titel %1 und Inhalt';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Erstellt eine Webseite, die im Browser erreichbar ist. Fügt HTML-Elemente zum Seiteninhalt hinzu.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Button hinzufügen %1 %2 Aktion';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Fügt der Webseite einen Button hinzu. Die Blöcke in "action" werden von Eliobot ausgeführt, wenn der Button gedrückt wird.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Den Wert %1 unter dem Namen %2 anzeigen';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Zeigt einen Wert auf der Webseite an und aktualisiert ihn automatisch jede Sekunde.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Tag %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Erstellt ein HTML-Tag (div oder center), um den Inhalt der Webseite zu strukturieren.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Titel %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Fügt der Webseite eine HTML-Überschrift (h1 bis h6) hinzu. h1 ist die größte, h6 die kleinste.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Absatz %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Fügt deiner Webseite einen Absatz hinzu.';
