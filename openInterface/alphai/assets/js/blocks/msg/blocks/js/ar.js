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
Blockly.Msg['IO_WAIT_TITLE'] = 'انتظر %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'يُوقِف تنفيذ الكود مؤقتًا.';
Blockly.Msg['IO_WAIT_SECOND'] = 'ثانية(ثوانٍ)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'ميلي ثانية(ميلي ثوانٍ)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'ميكروثانية(ميكروثوانٍ)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'انتظر حتى %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'يُوقِف تنفيذ الكود حتى يتحقق الشرط.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'بدء المؤقت';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'يهيئ المؤقت إلى 0 (بالثواني).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'قيمة المؤقت بوحدة %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'يعيد قيمة المؤقت منذ تهيئته (بالثواني أو بالميلي ثانية).';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TITLE'] = 'عرض في وحدة التحكم %1';
Blockly.Msg['ROBOT_PRINT_MESSAGE_TOOLTIP'] = 'يعرض رسالة في نافذة الإخراج.';
Blockly.Msg['ROBOT_SET_DIRECTION_TITLE'] = '%1 بسرعة %2';
Blockly.Msg['ROBOT_SET_DIRECTION_TOOLTIP'] = 'يحرك الروبوت في الاتجاه المختار بالسرعة المحددة (بين -100 و100).';
Blockly.Msg['ROBOT_SET_MOTOR_TITLE'] = 'سرعة المحرك الأيسر %1 المحرك الأيمن %2';
Blockly.Msg['ROBOT_SET_MOTOR_TOOLTIP'] = 'يتحكم بسرعة محركي الروبوت الأيسر والأيمن (بين -100 و100).';
Blockly.Msg['ROBOT_SET_DURATION'] = 'لمدة';
Blockly.Msg['ROBOT_FORWARD'] = 'السير للأمام';
Blockly.Msg['ROBOT_BACKWARD'] = 'السير للخلف';
Blockly.Msg['ROBOT_ROTATE_LEFT'] = 'الدوران لليسار';
Blockly.Msg['ROBOT_ROTATE_RIGHT'] = 'الدوران لليمين';
Blockly.Msg['ROBOT_STOP_TITLE'] = 'إيقاف الروبوت';
Blockly.Msg['ROBOT_STOP_TOOLTIP'] = 'يوقف الروبوت.';
Blockly.Msg['ROBOT_SET_BUZZER_TITLE'] = '%1 الصفارة';
Blockly.Msg['ROBOT_SET_BUZZER_TOOLTIP'] = 'يشغّل أو يوقف صفارة الروبوت.';
Blockly.Msg['ROBOT_BUZZER_ON'] = 'تشغيل';
Blockly.Msg['ROBOT_BUZZER_OFF'] = 'إيقاف';
Blockly.Msg['ROBOT_IS_BLOCKED_TITLE'] = 'Blockly.Msg[\'ROBOT_IS_BLOCKED_TITLE\'] = \'هل الروبوت عالق؟\';';
Blockly.Msg['ROBOT_IS_BLOCKED_TOOLTIP'] = 'يعيد صحيحًا إذا كان الروبوت عالقًا، وإلا يعيد خطأ.';
Blockly.Msg['ROBOT_GET_DISTANCE_TITLE'] = 'قيمة مستشعر المسافة (بالسم)';
Blockly.Msg['ROBOT_GET_DISTANCE_TOOLTIP'] = 'يعيد قيمة مستشعر المسافة في الروبوت (بالسم).';
Blockly.Msg['ROBOT_GET_INFRA_RED_TITLE'] = 'قيم حساسات تتبع الخط الأسود %1';
Blockly.Msg['ROBOT_GET_INFRA_RED_TOOLTIP'] = 'تسمح بقراءة قيم حساسات تتبع الخط التي تتراوح من 0-500 (أسود) إلى 500-1000 (أبيض). خيار \'الكل\' في البلوك يسمح بإرجاع مصفوفة تحتوي على قيم الحساسات الخمسة.';
Blockly.Msg['ROBOT_ALL_SENSORS'] = 'الكل';
Blockly.Msg['ROBOT_SET_CAMERA_TITLE'] = 'تشغيل الكاميرا بدقة %1';
Blockly.Msg['ROBOT_SET_CAMERA_TOOLTIP'] = 'يشغّل كاميرا الروبوت بالدقة المختارة.';
Blockly.Msg['ROBOT_GET_CAMERA_TITLE'] = 'صورة الكاميرا';
Blockly.Msg['ROBOT_GET_CAMERA_TOOLTIP'] = 'يعيد الصورة الملتقطة بواسطة كاميرا الروبوت. إذا كانت الدقة المختارة هي \'1x1\', يعيد قائمة من 3 أعداد صحيحة (مكونات R و G و B) بين 0 و 255. إذا كانت الدقة \'1x2\', يعيد قائمة مكوّنة من قائمتين كل منهما من 3 أعداد صحيحة. في الحالات الأخرى، يعيد قائمة من n_lignes قوائم من n_colonnes قوائم من 3 أعداد صحيحة.';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TITLE'] = 'ضبط مصابيح LED إلى R %1 G %2 B %3';
Blockly.Msg['ROBOT_SET_LEDS_RGB_TOOLTIP'] = 'يتحكم في مصابيح LED للروبوت بتحديد مركبات اللون الأحمر والأخضر والأزرق (بين 0 و255).';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TITLE'] = 'ضبط مصابيح LED إلى %1';
Blockly.Msg['ROBOT_SET_LEDS_PALETTE_TOOLTIP'] = 'يتحكم في مصابيح LED للروبوت باختيار لون من اللوحة.';
Blockly.Msg['ROBOT_ROBOT_ALL_SENSORS'] = 'الكل';
