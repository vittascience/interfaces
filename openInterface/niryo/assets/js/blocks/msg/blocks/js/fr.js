/**
 * @fileoverview French messages for Niryo Ned2. (FR)
 */
'use strict';

// NIRYO

Blockly.Msg['NIRYO_MOVE_JOINTS_TITLE'] = '[Niryo] articulations %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_TOOLTIP'] = 'Permet de contrôler l\'angle des joints du robot Niryo Ned2 (en radians).';
Blockly.Msg['NIRYO_JOINTS_TITLE'] = 'joints: j1%1 j2%2 j3%3 j4%4 j5%5 j6%6';
Blockly.Msg['NIRYO_JOINTS_TOOLTIP'] = 'Permet de contrôler l\'angle des joints du robot Niryo Ned2 (en radians).';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TITLE'] = '[Niryo] articulations %1';
Blockly.Msg['NIRYO_MOVE_JOINTS_VALUES_TOOLTIP'] = 'Permet de contrôler l\'angle des joints du robot Niryo Ned2 (en radians).';


// NIRYO_POSE_TITLE

Blockly.Msg['NIRYO_SLEEP_POSE_TITLE'] = '[Niryo] position d\'origine';
Blockly.Msg['NIRYO_SLEEP_POSE_TOOLTIP'] = 'Permet de déplacer le robot Niryo Ned2 dans sa position d\'origine.';
Blockly.Msg['NIRYO_POSE_TITLE'] = 'pose x%1 y%2 z%3 roulis%4 tangage%5 lacet%6';
Blockly.Msg['NIRYO_POSE_TOOLTIP'] = 'Permet de déplacer le robot Niryo Ned2 dans une position donnée (coordonnées x, y et z en mètre). En mode standard, le mouvement est le plus direct. en mode linéaire, le robot suit une trajectoire linéaire.';
Blockly.Msg['NIRYO_MOVE_POSE_TITLE'] = '[Niryo] %1 positionnement %2';
Blockly.Msg['NIRYO_MOVE_POSE_TOOLTIP'] = 'Permet de déplacer le robot Niryo Ned2 dans une position donnée (coordonnées x, y et z en mètre). En mode standard, le mouvement est le plus direct. en mode linéaire, le robot suit une trajectoire linéaire.';

Blockly.Msg['NIRYO_SHIFT_POSE_TITLE'] = '[Niryo] %1 Décaler la pose sur l\'axe %2 de %3';
Blockly.Msg['NIRYO_SHIFT_POSE_TOOLTIP'] = 'Permet de décaler la pose du robot Niryo Ned2 sur un axe donné (coordonnées x, y et z en mètre).';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_X'] = 'axe x';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Y'] = 'axe y';
Blockly.Msg['NIRYO_SHIFT_POSE_AXIS_Z'] = 'axe z';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_ROLL'] = 'roulis';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_PITCH'] = 'tangage';
Blockly.Msg['NIRYO_SHIFT_POSE_ROT_YAW'] = 'lacet';

Blockly.Msg['NIRYO_MOVE_POSE_TYPE_STANDARD'] = 'standard';
Blockly.Msg['NIRYO_MOVE_POSE_TYPE_LINEAR'] = 'linéaire';

// TOOLS
Blockly.Msg['TOOL_OPEN_GRIPPER_TITLE'] = '[Niryo] ouvrir la pince à la vitesse %1';
Blockly.Msg['TOOL_OPEN_GRIPPER_TOOLTIP'] = 'Permet d\'ouvrir la pince du robot Niryo Ned2.';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TITLE'] = '[Niryo] fermer la pince à la vitesse %1';
Blockly.Msg['TOOL_CLOSE_GRIPPER_TOOLTIP'] = 'Permet de fermer la pince du robot Niryo Ned2.';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_1'] = '1/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_2'] = '2/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_3'] = '3/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_4'] = '4/5';
Blockly.Msg['TOOL_OPEN_GRIPPER_SPEED_5'] = '5/5';

// DISPLAY
Blockly.Msg['DISPLAY_LED_RING_COLORS_TITLE'] = 'R: %1 V: %2 B: %3';
Blockly.Msg['DISPLAY_LED_RING_COLORS_TOOLTIP'] = 'Permet de définir les valeurs des LED RGB de l\'anneau de LED du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TITLE'] = 'Couleur %1';
Blockly.Msg['DISPLAY_LED_RING_COLORS_PICKER_TOOLTIP'] = 'Permet de définir les valeurs des LED RGB de l\'anneau de LED du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TITLE'] = '[Anneau LED] Couleur unie %1, attendre %2';
Blockly.Msg['DISPLAY_LED_RING_SOLID_COLOR_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_WAIT_TRUE'] = "oui";
Blockly.Msg['DISPLAY_LED_RING_WAIT_FALSE'] = "non";
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TITLE'] = '[Anneau LED] Couleur pulsée %1, durée %2 répétition %3 attendre %4';
Blockly.Msg['DISPLAY_LED_RING_FLASHING_COLOR_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme de pulse du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TITLE'] = '[Anneau LED] Couleur défilante %1, durée %2 répétition %3 attendre %4';
Blockly.Msg['DISPLAY_LED_RING_CHASE_COLOR_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme de défilement du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TITLE'] = '[Anneau LED] Définir LED %1 à la couleur %2';
Blockly.Msg['DISPLAY_LED_RING_SET_LED_TOOLTIP'] = 'Permet de définir la couleur d\'une LED RGB de l\'anneau de LED du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TITLE'] = '[Anneau LED] balayage de la couleur %1, durée %2 attendre %3';
Blockly.Msg['DISPLAY_LED_RING_WIPE_COLOR_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme de défilement du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TITLE'] = '[Anneau LED] arc-en-ciel, durée %1 répétition %2 attendre %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_PATTERN_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme d\'arc-en-ciel du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TITLE'] = '[Anneau LED] arc-en-ciel cyclique, durée %1 répétition %2 attendre %3';
Blockly.Msg['DISPLAY_LED_RING_RAINBOW_CYCLE_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme d\'arc-en-ciel cyclique du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TITLE'] = '[Anneau LED] montée de couleur %1, durée %2 répétition %3 attendre %4';
Blockly.Msg['DISPLAY_LED_RING_GO_UP_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme ascendante du robot Niryo Ned2.';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TITLE'] = '[Anneau LED] montée et descente de couleur %1, durée %2 répétition %3 attendre %4';
Blockly.Msg['DISPLAY_LED_RING_GO_DOWN_TOOLTIP'] = 'Permet de définir la couleur des LED RGB de l\'anneau de LED sous forme montante et descendante du robot Niryo Ned2.';

// Utility
Blockly.Msg['UTILITY_WAIT_TITLE'] = 'attendre %1 seconde.s';
Blockly.Msg['UTILITY_WAIT_TOOLTIP'] = 'Permet d\'attendre un certain nombre de secondes.';
Blockly.Msg['UTILITY_BREAK_POINT_TITLE'] = 'point d\'arrêt';
Blockly.Msg['UTILITY_BREAK_POINT_TOOLTIP'] = 'Permet de mettre un point d\'arrêt dans le code.';
Blockly.Msg['UTILITY_COMMENT_TITLE'] = 'commentaire %1';
Blockly.Msg['UTILITY_COMMENT_TOOLTIP'] = 'Permet d\'ajouter un commentaire dans le code.';


// Wifi - Raspberry Pi
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Ned2] adresse IP %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = "Permet de récupérer l'adresse IP du Niryo Ned2.";


Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TITLE'] = '[Niryo] convoyeur n° %1';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_TOOLTIP'] = "Permet d\'activer le convoyeur du robot Niryo Ned2. Attention, il est impératif de brancher le câble d'alimentation du sur le convoyeur en premier avant de le brancher sur le robot.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_1'] = '1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_2'] = '2';

Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TITLE'] = '[Niryo] Controler le convoyeur %1 à la vitesse (%) %2 direction %3';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_TOOLTIP'] = "Permet de contrôler la vitesse du convoyeur du robot Niryo Ned2. Attention, il est impératif de brancher le câble d'alimentation du sur le convoyeur en premier avant de le brancher sur le robot.";
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_FORWARD'] = 'avant';
Blockly.Msg['NIRYO_ACTUATOR_SET_CONVEYOR_SPEED_DIRECTION_BACKWARD'] = 'arrière';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TITLE'] = '[Niryo] Arrêter le convoyeur %1';
Blockly.Msg['NIRYO_ACTUATOR_STOP_CONVEYOR_TOOLTIP'] = "Permet d'arrêter le convoyeur du robot Niryo Ned2.";
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TITLE'] = '[Niryo] capteur infrarouge detecte %1';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_LOW'] = 'quelque chose';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_HIGH'] = 'rien';
Blockly.Msg['NIRYO_ACTUATOR_CONVEYOR_IR_SENSOR_TOOLTIP'] = "Permet de savoir si le capteur infrarouge du convoyeur du robot Niryo Ned2 détecte quelque chose ou non.";