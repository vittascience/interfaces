// galaxia (Thingz) - module thingz
ACMsg.GALAXIA_THINGZ_MODULE = "Module Thingz pour la carte Galaxia : accès aux composants intégrés (boutons, pads tactiles, LED, capteurs, radio, écran, log).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Bouton physique A de la Galaxia (instance de <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Bouton physique B de la Galaxia (instance de <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Bouton tactile Nord de la Galaxia (instance de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Bouton tactile Sud de la Galaxia (instance de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Bouton tactile Est de la Galaxia (instance de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Bouton tactile Ouest de la Galaxia (instance de <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "LED RGB de la Galaxia (instance de <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Accéléromètre de la Galaxia (instance de <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Magnétomètre/boussole de la Galaxia (instance de <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Sortie audio jack de la Galaxia (instance de <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Communication radio de la Galaxia (instance de <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Écran LCD de la Galaxia (instance de <b>Display</b>).";
ACMsg.GALAXIA_THINGZ_LOG = "Enregistreur CSV interne de la Galaxia (instance de <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Renvoie la température courante via le capteur interne.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Applique un offset de calibration (en degrés) au capteur de température interne.";

// galaxia - accel/compass
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Module Thingz accéléromètre et boussole.";
ACMsg.GALAXIA_ACCEL_CLASS = "Contrôle l'accéléromètre de la Galaxia.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Crée un objet <b>Accel</b>.";
ACMsg.GALAXIA_COMPASS_CLASS = "Contrôle le magnétomètre de la Galaxia.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Crée un objet <b>Compass</b>.";
ACMsg.GALAXIA_ACCEL_GET_X = "Renvoie l'accélération sur l'axe X (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Renvoie l'accélération sur l'axe Y (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Renvoie l'accélération sur l'axe Z (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Renvoie les accélérations 3 axes sous forme de liste : [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Renvoie le geste courant (ex. up, down, left, right, face up, face down, freefall, 3g, 6g, 8g, shake, none).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Renvoie <b>True</b> si le geste courant correspond à <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Renvoie <b>True</b> si <b>gesture</b> a eu lieu depuis le dernier appel.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Renvoie l'historique des gestes (le plus récent en dernier).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Enregistre un callback pour un geste ; le geste est passé au callback.";
ACMsg.GALAXIA_COMPASS_GET_X = "Renvoie le champ magnétique sur l'axe X (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Renvoie le champ magnétique sur l'axe Y (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Renvoie les champs magnétiques 3 axes sous forme de liste : [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Renvoie le cap/heading courant (degrés).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Calibre le magnétomètre : faire tourner la carte autour de l'axe Z pendant la calibration.";

// galaxia - button / touch
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Module Thingz des boutons physiques.";
ACMsg.GALAXIA_BUTTON_CLASS = "Contrôle les boutons physiques de la Galaxia.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Crée un objet <b>Button</b>.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Renvoie <b>True</b> si le bouton est actuellement enfoncé.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Renvoie <b>True</b> si le bouton a été pressé depuis le dernier appel.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Renvoie le nombre d'appuis depuis le dernier appel.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Enregistre un callback sur l'événement d'appui ; l'objet bouton est passé au callback.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Module Thingz des boutons tactiles.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Contrôle les boutons tactiles capacitifs de la Galaxia.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Crée un objet <b>ButtonTouch</b>.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Renvoie <b>True</b> si le bouton tactile est actuellement touché.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Renvoie <b>True</b> si le bouton tactile a été touché depuis le dernier appel.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Renvoie le nombre de touches depuis le dernier appel.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Enregistre un callback sur l'événement de touch ; l'objet bouton est passé au callback.";

// galaxia - led
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Module Thingz de la LED.";
ACMsg.GALAXIA_LED_CLASS = "Contrôle la LED RGB de la Galaxia.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Crée un objet <b>Led</b>.";
ACMsg.GALAXIA_LED_SET_COLORS = "Définit la couleur via <b>red</b>, <b>green</b>, <b>blue</b> (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Définit le canal rouge (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Définit le canal vert (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Définit le canal bleu (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Renvoie la valeur courante du canal rouge (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Renvoie la valeur courante du canal vert (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Renvoie la valeur courante du canal bleu (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Renvoie le niveau de lumière ambiante (0 = sombre, 100 = lumineux).";

// galaxia - log
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Module Thingz d'enregistrement interne.";
ACMsg.GALAXIA_LOG_CLASS = "Enregistre des données en CSV dans la mémoire interne (export vers USB en data.csv au démarrage).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Crée un objet <b>Log</b>.";
ACMsg.GALAXIA_LOG_ADD = "Ajoute une ligne au log. Data est une liste de tuples : (nom_colonne, valeur).";
ACMsg.GALAXIA_LOG_DELETE = "Efface toutes les données du log.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Définit les colonnes du CSV (réinitialise le log à chaque redéfinition).";

// galaxia - radio
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Module Thingz de la radio.";
ACMsg.GALAXIA_RADIO_CLASS = "Envoie et reçoit des messages entre cartes.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Crée un objet <b>Radio</b>.";
ACMsg.GALAXIA_RADIO_SEND = "Diffuse un message texte aux cartes proches sur le même canal.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Attend un message et le renvoie.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Définit le canal radio (1 à 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Renvoie le canal radio courant.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Renvoie l'adresse MAC radio sous forme de bytes.";

// galaxia - sound
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Module Thingz du son.";
ACMsg.GALAXIA_SOUND_CLASS = "Sortie sonore via le connecteur jack de la Galaxia.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Crée un objet <b>Sound</b>.";
ACMsg.GALAXIA_SOUND_PLAY = "Active/désactive la génération de fréquence sur le jack et fixe la fréquence (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Définit la fréquence de sortie en Hz.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Définit le volume (0 à 100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Lit un sample WAV depuis le chemin de fichier fourni.";

// galaxia - display
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Module Thingz de l'écran.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Contrôle l'écran LCD de la Galaxia.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Crée un objet <b>Display</b>.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Interface de tracé (instance de <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Console affichant la sortie REPL (instance de <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Interface graphique bas niveau (instance de <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Sous-module console de l'écran Thingz.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Affiche la sortie REPL à l'écran.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Crée un objet <b>Console</b>.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Affiche le REPL sur l'écran.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Sous-module plot de l'écran Thingz.";
ACMsg.GALAXIA_PLOT_CLASS = "Utilise l'écran LCD comme un graphique.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Crée un objet <b>Plot</b>.";
ACMsg.GALAXIA_PLOT_SHOW = "Affiche le graphique à l'écran.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Ajoute un nouveau point au graphique (valeur Y).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Définit l'échelle Y avec une valeur minimale et maximale.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Configure une fonction appelée toutes les <b>interval</b> secondes pour ajouter un point.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Sous-module graphique raw de l'écran Thingz.";
ACMsg.GALAXIA_RAW_CLASS = "Utilise l'écran LCD pour afficher des éléments graphiques.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Crée un objet <b>Raw</b>.";
ACMsg.GALAXIA_RAW_SHOW = "Affiche l'interface raw.";
ACMsg.GALAXIA_RAW_PRINT = "Affiche le texte <b>txt</b> à la position (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Affiche un fichier BMP situé à <b>path</b> à la position (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Élément image pour l'interface raw.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Crée un élément image depuis un BMP et l'affiche.";
ACMsg.GALAXIA_IMG_SHOW = "Affiche/masque l'image.";
ACMsg.GALAXIA_IMG_X = "Définit la position x.";
ACMsg.GALAXIA_IMG_Y = "Définit la position y.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Remplace les pixels blancs par une couleur donnée.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Renvoie <b>True</b> si l'image est affichée.";
ACMsg.GALAXIA_IMG_GET_X = "Renvoie la position x.";
ACMsg.GALAXIA_IMG_GET_Y = "Renvoie la position y.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Renvoie la largeur de l'image.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Renvoie la hauteur de l'image.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Renvoie la couleur de remplacement du blanc.";
ACMsg.GALAXIA_RECT_CLASS = "Élément rectangle pour l'interface raw.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Crée un élément rectangle et l'affiche.";
ACMsg.GALAXIA_RECT_SHOW = "Affiche/masque le rectangle.";
ACMsg.GALAXIA_RECT_X = "Définit la position x.";
ACMsg.GALAXIA_RECT_Y = "Définit la position y.";
ACMsg.GALAXIA_RECT_COLOR = "Définit la couleur du rectangle.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Renvoie <b>True</b> si le rectangle est affiché.";
ACMsg.GALAXIA_RECT_GET_X = "Renvoie la position x.";
ACMsg.GALAXIA_RECT_GET_Y = "Renvoie la position y.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Renvoie la largeur du rectangle.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Renvoie la hauteur du rectangle.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Renvoie la couleur du rectangle.";
ACMsg.GALAXIA_TEXT_CLASS = "Élément texte pour l'interface raw.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Crée un élément texte et l'affiche.";
ACMsg.GALAXIA_TEXT_SHOW = "Affiche/masque le texte.";
ACMsg.GALAXIA_TEXT_X = "Définit la position x.";
ACMsg.GALAXIA_TEXT_Y = "Définit la position y.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Définit le texte affiché.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Renvoie <b>True</b> si le texte est affiché.";
ACMsg.GALAXIA_TEXT_GET_X = "Renvoie la position x.";
ACMsg.GALAXIA_TEXT_GET_Y = "Renvoie la position y.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Renvoie la largeur du texte.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Renvoie la hauteur du texte.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Renvoie la couleur du texte.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Renvoie le texte courant (note : la doc indique int).";
