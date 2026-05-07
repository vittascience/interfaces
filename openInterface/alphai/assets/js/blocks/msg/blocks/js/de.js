/**
 * @fileoverview French messages for AlphAI. (FR)
 */

'use strict';

// IO - Time
Blockly.Msg['IO_WAIT_TITLE'] = 'attendre %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['IO_WAIT_SECOND'] = 'seconde(s)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'milliseconde(s)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'microseconde(s)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'attendre jusqu\'à %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'démarrer le chronomètre';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'valeur du chronomètre en %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';
// Robot - Communication
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'afficher dans la console %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Affiche un message dans la console de sortie.';
// Robot - Actuators
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 à la vitesse %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'Déplace le robot dans la direction choisie à la vitesse spécifiée (entre -100 et 100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'vitesse moteur gauche %1 moteur droit %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'Contrôle la vitesse des moteurs gauche et droit du robot (entre -100 et 100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'pendant';
Blockly.Msg['ROBOT_FORWARD'] = 'avancer';
Blockly.Msg['ROBOT_BACKWARD'] = 'reculer';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'pivoter à gauche';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'pivoter à droite';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'arrêter le robot';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'Arrête le robot.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 le buzzer';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'Active ou désactive le buzzer du robot.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'activer';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'désactiver';
// Robot - Sensors
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'le robot est bloqué ?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Renvoie vrai si le robot est bloqué, sinon renvoie faux.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'valeur du capteur de distance (en cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Renvoie la valeur du capteur de distance du robot (en cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'valeurs des capteurs de ligne noire %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Permet de lire les valeurs des capteurs de suiveur de ligne de l\'ordre de 0-500 (noir) à 500-1000 (blanc). L\'option \'tous\' du bloc permet de retourner le tableau avec les valeurs des 5 capteurs.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'tous';
// Robot - Camera
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'activer la caméra avec la résolution %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Active la caméra du robot avec la résolution choisie.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'image de la caméra';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Renvoie l\'image capturée par la caméra du robot.Si la résolution choisie est \'1x1\', renvoie une liste de 3 entiers (composantes R, G, B), entre 0 et 255. Si la résolution est \'1x2\', renvoie une liste de 2 listes de 3 entiers. Dans les autres cas, renvoie une liste de n_lignes listes de n_colonnes listes de 3 entiers.';
// Robot - Display
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'contrôler les LEDs à R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Contrôle les LEDs du robot en spécifiant les composantes rouge, verte et bleue (entre 0 et 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'contrôler les LEDs à %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Contrôle les LEDs du robot en choisissant une couleur dans la palette.';
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
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'in die Konsole schreiben %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'Schreibt eine Nachricht in die Ausgabekonsole.';
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
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'Ist der Roboter blockiert?';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'Gibt true zurück, wenn der Roboter blockiert ist, sonst false.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'Abstandssensorwert (in cm)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'Gibt den Wert des Abstandssensors des Roboters zurück (in cm).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'Werte der Linienfolgesensoren %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'Ermöglicht das Lesen der Werte der Linienfolgesensoren von 0-500 (schwarz) bis 500-1000 (weiß). Die Option \'alle\' im Block gibt ein Array mit den Werten der 5 Sensoren zurück.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'alle';
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'Kamera mit Auflösung %1 aktivieren';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'Aktiviert die Kamera des Roboters mit der gewählten Auflösung.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'Kamerabild';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'Gibt das von der Kamera des Roboters aufgenommene Bild zurück. Wenn die gewählte Auflösung \'1x1\' ist, wird eine Liste mit 3 Ganzzahlen (R-, G-, B-Komponenten) zwischen 0 und 255 zurückgegeben. Bei der Auflösung \'1x2\' wird eine Liste mit 2 Listen mit je 3 Ganzzahlen zurückgegeben. In anderen Fällen wird eine Liste von n_zeilen Listen von n_spalten Listen mit jeweils 3 Ganzzahlen zurückgegeben.';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'LEDs steuern R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'Steuert die LEDs des Roboters, indem die Rot-, Grün- und Blauwerte angegeben werden (zwischen 0 und 255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'LEDs auf %1 setzen';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'Stellt die LEDs des Roboters auf eine Farbe aus der Palette ein.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'alle';
