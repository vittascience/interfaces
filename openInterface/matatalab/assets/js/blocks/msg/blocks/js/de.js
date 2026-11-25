/**
 * @fileoverview English messages for Matatalab. (EN)
 */

'use strict';

// IO - Time

// Actuators

// Sound

// Display

// Communication

// MatataCon

// Options

// Search keywords of the blocks: <X>_KEYWORDS completes the block whose tooltip is <X>_TOOLTIP (see ToolboxManager)

Blockly.Msg['IO_WAIT_TITLE'] = 'warte %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausiere die Ausführung des Codes.';
Blockly.Msg['IO_WAIT_SECOND'] = 'Sekunde(n)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'Millisekunde(n)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'Mikrosekunde(n)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'warte bis %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppe die Ausführung des Codes, bis die Bedingung erfüllt ist.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'Chronometer starten';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialisiere ein Chronometer bei 0 (in Sekunden).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'Chronometerwert in %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Gibt den Wert des Chronometers seit der Initialisierung zurück (in Sekunden oder Millisekunden).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 Schritte';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Bewegt den MatataBot-Roboter um eine Anzahl von Schritten (1 Schritt = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'bewege %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Bewegt den MatataBot-Roboter um eine Entfernung in cm. Ein negativer Wert lässt ihn rückwärts fahren.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'drehe %1 um %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Dreht den MatataBot-Roboter auf der Stelle.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'setze %1 auf Gang %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Lässt ein oder beide Räder laufen, von Gang -6 (rückwärts) bis 6 (vorwärts). 0 stoppt das Rad.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'setze Radgeschwindigkeit: links %1 rechts %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Setzt die Geschwindigkeit beider Räder, zwischen -16 und 16 cm/s. Ein negativer Wert lässt das Rad rückwärts laufen.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stoppe %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stoppt ein oder beide Räder.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'tanze n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'Der MatataBot-Roboter tanzt, von 1 bis 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'führe Aktion n°%1 aus';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'Der MatataBot-Roboter führt eine Aktion aus, von 1 bis 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'spiele Note %1 für %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Spielt eine Note auf dem MatataBot-Roboter für eine Dauer in Millisekunden.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'spiele Melodie n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Spielt eine Melodie des MatataBot-Roboters, von 1 bis 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'spiele Lied n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Spielt ein Lied des MatataBot-Roboters, von 1 bis 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'beleuchte %1 in %2 mit Helligkeit %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Beleuchtet die Augen des MatataBot-Roboters mit einer Helligkeit von 0 bis 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'beleuchte %1 mit Farbe %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Beleuchtet die Augen des MatataBot-Roboters mit einer gewählten Farbe.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'schalte die Augen aus';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Schaltet die Augen des MatataBot-Roboters aus.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'schreibe in Konsole %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Schreibt Daten in den seriellen Port.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'mit';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'Zeilenumbruch(e)';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'Taste %1 gedrückt';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Gibt True zurück, wenn die Taste des MatataCon-Controllers gedrückt ist.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'Controller %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Gibt True zurück, wenn diese Bewegung des MatataCon-Controllers erkannt wird.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'Farbe %1 erkannt';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Gibt True zurück, wenn der Farbsensor des MatataCon-Controllers diese Farbe erkennt.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'Geräusch erkannt';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Gibt True zurück, wenn der MatataCon-Controller ein Geräusch erkennt.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'Hindernis erkannt';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Gibt True zurück, wenn der MatataCon-Controller ein Hindernis erkennt.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 erkannt';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Gibt True zurück, wenn der MatataCon-Controller das Licht oder die Dunkelheit erkennt.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'Helligkeit';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Gibt die Helligkeit zurück, die vom MatataCon-Controller gemessen wird, von 0 bis 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = '%1 Wert des Farbsensors';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Gibt den Rot-, Grün- oder Blauwert zurück, der vom MatataCon-Controller gemessen wird, von 0 bis 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 Winkel (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Gibt den Winkel des MatataCon-Controllers in Grad zurück.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'Beschleunigung auf Achse %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Gibt die Beschleunigung des MatataCon-Controllers auf einer Achse zurück.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'Schüttelintensität';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Gibt die Schüttelintensität des MatataCon-Controllers zurück.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Ring] beleuchte LED n°%1 in %2 mit Helligkeit %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Beleuchtet eine LED des Rings des MatataCon-Controllers, von 1 bis 12, mit einer Helligkeit von 0 bis 6. Die Zahl 0 beleuchtet alle LEDs.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Ring] beleuchte LED n°%1 mit Farbe %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Beleuchtet eine LED des Rings des MatataCon-Controllers, von 1 bis 12, mit einer gewählten Farbe. Die Zahl 0 beleuchtet alle LEDs.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Ring] beleuchte die LEDs %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Wählt die Farbe der 12 LEDs des Rings des MatataCon-Controllers, von LED n°1 bis LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Ring] starte Animation %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Startet eine Lichtanimation am Ring des MatataCon-Controllers.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Ring] schalte alle LEDs aus';
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Schaltet den Ring des MatataCon-Controllers aus.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'Nachricht senden Nr. %1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Sendet eine Nachricht, von 1 bis 6, an die anderen MatataCon-Controller.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'Nachricht Nr. %1 empfangen';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Gibt True zurück, wenn der MatataCon-Controller diese Nachricht, von 1 bis 6, empfangen hat.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'empfangene Nachricht';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Gibt die Nummer der empfangenen Nachricht durch den MatataCon-Controller zurück, oder 0, wenn keine Nachricht vorhanden ist.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'vorwärts bewegen';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'rückwärts bewegen';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'links';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'rechts';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'beide Räder';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'das linke Rad';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'das rechte Rad';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'beide Augen';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'das linke Auge';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'das rechte Auge';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'weiß';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'rot';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'gelb';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'grün';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'blau';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'lila';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'schwarz';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'winken';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'Meteor';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'Regenbogen';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'Glühwürmchen';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'Farbwischen';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'atmen';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'spielen';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'löschen';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'vorwärts';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'rückwärts';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'links';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'rechts';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'Musik';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'geschüttelt';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'nach links geneigt';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'nach rechts geneigt';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'nach vorne geneigt';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'nach hinten geneigt';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'im freien Fall';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'nach oben gerichtet';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'nach unten gerichtet';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'hell';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'dunkel';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'Neigung';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'Roll';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'Gier';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'Verzögerung, warten';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'warten, pausieren';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'Stoppuhr, starten, zurücksetzen';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'Stoppuhr, vergangene Zeit';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'vorwärts, rückwärts, bewegen';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'vorwärts, rückwärts, Distanz';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'drehen, Rotation';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'Motor, Rad, Geschwindigkeit';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'Motor, Rad, Geschwindigkeit';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'Motor, Rad';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'tanzen';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'Bewegung, Animation';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'Musik, Klang, Ton';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'Musik, Klang';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'Musik, Klang';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, Augen, Farbe';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, Augen, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, löschen';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, Ring, Farbe';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, Ring, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, Ring, Farben';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, Ring, Effekt';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, Ring, löschen';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'Konsole, übertragen, senden';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'senden, Funk';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'empfangen, Funk';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'empfangen, Rundfunk';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'Taste, Schlüssel';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'Bewegung, Geste, Beschleunigungssensor';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'Sensor, Farbe';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'Mikrofon, Geräusch';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'Infrarot, Abstand';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'Helligkeit, Licht';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'Licht, Sensor';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, Farbe';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'neigen, Gyroskop';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'Beschleunigungssensor';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'schütteln, Beschleunigungssensor';
