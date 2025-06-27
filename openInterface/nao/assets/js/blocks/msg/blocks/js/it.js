/**
 * @fileoverview Italian messages for Nao. (IT)
 */
'use strict';

// Display
Blockly.Msg["DISPLAY_FADE_TITLE"] = "cambiare intensità %1 intensità %2 % per %3 s";
Blockly.Msg["DISPLAY_FADE_TOOLTIP"] = "Modifica gradualmente l'intensità dei LED specificati.";
Blockly.Msg["DISPLAY_ALL_LEDS_GROUP"] = "tutti i LED";
Blockly.Msg["DISPLAY_BRAIN_LEDS_GROUP"] = "LED della testa";
Blockly.Msg["DISPLAY_EAR_LEDS_GROUP"] = "LED delle orecchie";
Blockly.Msg["DISPLAY_FACE_LEDS_GROUP"] = "LED del viso";
Blockly.Msg["DISPLAY_CHEST_LEDS_GROUP"] = "LED del petto";
Blockly.Msg["DISPLAY_FEET_LEDS_GROUP"] = "LED dei piedi";
Blockly.Msg["DISPLAY_FADE_RGB_TITLE"] = "cambiare colore %1 a R %2 % G %3 % B %4 % per %5 s";
Blockly.Msg["DISPLAY_FADE_RGB_TOOLTIP"] = "Modifica gradualmente il colore dei LED specificati utilizzando valori RGB.";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TITLE"] = "cambiare colore %1 a %2 per %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_PALETTE_TOOLTIP"] = "Modifica gradualmente il colore dei LED specificati utilizzando un colore della palette.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TITLE"] = "cambiare colore del LED n°%1 dell'occhio %2 a R %3 % G %4 % B %5 % per %6 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_TOOLTIP"] = "Modifica gradualmente il colore dei LED specificati utilizzando valori RGB.";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TITLE"] = "cambiare colore del LED n°%1 dell'occhio %2 a %3 per %4 s";
Blockly.Msg["DISPLAY_FADE_FACE_RGB_PALETTE_TOOLTIP"] = "Modifica gradualmente il colore dei LED specificati utilizzando un colore della palette.";
Blockly.Msg["DISPLAY_FACE_LEFT"] = "sinistro";
Blockly.Msg["DISPLAY_FACE_RIGHT"] = "destro";
Blockly.Msg["DISPLAY_FACE_LEFT&RIGHT"] = "sinistra e destra";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TITLE"] = "cambiare colore %1 a %2 per %3 s";
Blockly.Msg["DISPLAY_FADE_RGB_COLOR_NAME_TOOLTIP"] = "Modifica gradualmente il colore dei LED specificati utilizzando un colore denominato.";
Blockly.Msg["DISPLAY_WHITE_COLOR"] = "bianco";
Blockly.Msg["DISPLAY_RED_COLOR"] = "rosso";
Blockly.Msg["DISPLAY_GREEN_COLOR"] = "verde";
Blockly.Msg["DISPLAY_BLUE_COLOR"] = "blu";
Blockly.Msg["DISPLAY_YELLOW_COLOR"] = "giallo";
Blockly.Msg["DISPLAY_MAGENTA_COLOR"] = "magenta";
Blockly.Msg["DISPLAY_CYAN_COLOR"] = "ciano";
Blockly.Msg["DISPLAY_ROTATE_EYES_TITLE"] = "animazione rotazione occhi %1 tempo di rotazione %2 s durata animazione %3 s";
Blockly.Msg["DISPLAY_ROTATE_EYES_TOOLTIP"] = "Attiva un effetto luminoso sugli occhi.";
Blockly.Msg["DISPLAY_SET_INTENSITY_TITLE"] = "impostare intensità %1 a %2 %";
Blockly.Msg["DISPLAY_SET_INTENSITY_TOOLTIP"] = "Imposta l'intensità dei LED specificati.";
Blockly.Msg["DISPLAY_OFF_TITLE"] = "spegnere %1";
Blockly.Msg["DISPLAY_OFF_TOOLTIP"] = "Spegne i LED specificati.";
Blockly.Msg["DISPLAY_ON_TITLE"] = "accendere %1";
Blockly.Msg["DISPLAY_ON_TOOLTIP"] = "Accende i LED specificati.";
Blockly.Msg["DISPLAY_RANDOM_EYES_TITLE"] = "colori occhi casuali per %1 s";
Blockly.Msg["DISPLAY_RANDOM_EYES_TOOLTIP"] = "Modifica casualmente i colori dei LED degli occhi.";
Blockly.Msg["DISPLAY_RASTA_TITLE"] = "animazione rasta per %1 s";
Blockly.Msg["DISPLAY_RASTA_TOOLTIP"] = "Attiva un effetto luminoso tipo rasta.";
Blockly.Msg["DISPLAY_RESET_TITLE"] = "reimpostare %1";
Blockly.Msg["DISPLAY_RESET_TOOLTIP"] = "Reimposta i LED specificati al loro stato predefinito.";

// Communications
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TITLE"] = "dire %1 con animazione";
Blockly.Msg["COMMUNICATION_ANIMATED_SPEECH_SAY_TOOLTIP"] = "Pronuncia il testo annotato dato e lo anima con animazioni inserite nel testo.";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TITLE"] = "dire %1";
Blockly.Msg["COMMUNICATION_TEXT_TO_SPEECH_SAY_TOOLTIP"] = "Pronuncia il testo dato.";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TITLE"] = "imposta la lingua per il riconoscimento vocale %1";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ENGLISH"] = "Inglese";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_FRENCH"] = "Francese";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_SPANISH"] = "Spagnolo";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_GERMAN"] = "Tedesco";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_OPTION_ITALIAN"] = "Italiano";
Blockly.Msg["COMMUNICATION_ASR_SET_LANGUAGE_TOOLTIP"] = "Imposta la lingua per il riconoscimento vocale.";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TITLE"] = "avvia il riconoscimento vocale";
Blockly.Msg["COMMUNICATION_ASR_START_RECOGNITION_TOOLTIP"] = "Avvia il riconoscimento vocale.";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TITLE"] = "ferma il riconoscimento vocale";
Blockly.Msg["COMMUNICATION_ASR_STOP_RECOGNITION_TOOLTIP"] = "Ferma il riconoscimento vocale.";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TITLE"] = "definire l'elenco di vocabolario %1";
Blockly.Msg["COMMUNICATION_ASR_SET_VOCABULARY_TOOLTIP"] = "Definisce un insieme specifico di parole chiave per il riconoscimento vocale.";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TITLE"] = "quando una parola viene riconosciuta in %1";
Blockly.Msg["COMMUNICATION_ASR_GET_LAST_WORD_CALLBACK_TOOLTIP"] = "Memorizza l'ultima parola riconosciuta dal riconoscimento vocale nella variabile specificata.";



// Movements
Blockly.Msg["MOVEMENTS_POSE_MODE_TITLE"] = "adottare la postura %1";
Blockly.Msg["MOVEMENTS_POSE_MODE_TOOLTIP"] = "Cambia la postura di NAO alla posa specificata.";
Blockly.Msg["MOVEMENTS_POSE_MODE_YEAH"] = "Yeah";
Blockly.Msg["MOVEMENTS_POSE_MODE_HANDSONHIPS"] = "Mani sui fianchi";
Blockly.Msg["MOVEMENTS_POSE_MODE_SCANNINGHORIZON"] = "Scansione dell'orizzonte";
Blockly.Msg["MOVEMENTS_POSE_MODE_RELAXED"] = "Rilassato";
Blockly.Msg["MOVEMENTS_POSE_MODE_TPOSE"] = "T-Pose";

Blockly.Msg["MOVEMENTS_HAND_TITLE"] = "%1 la mano %2";
Blockly.Msg["MOVEMENTS_OPEN_HAND"] = "aprire";
Blockly.Msg["MOVEMENTS_CLOSE_HAND"] = "chiudere";
Blockly.Msg["MOVEMENTS_LEFT_HAND"] = "sinistra";
Blockly.Msg["MOVEMENTS_RIGHT_HAND"] = "destra";
Blockly.Msg["MOVEMENTS_HAND_TOOLTIP"] = "Apre o chiude la mano specificata.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TITLE"] = "muoversi %1 di %2 cm";
Blockly.Msg["MOVEMENTS_MOVE_TO_FORWARD"] = "avanti";
Blockly.Msg["MOVEMENTS_MOVE_TO_BACKWARD"] = "indietro";
Blockly.Msg["MOVEMENTS_ROTATE_TITLE"] = "ruotare verso %1 di %2 °";
Blockly.Msg["MOVEMENTS_ROTATE_LEFT"] = "sinistra";
Blockly.Msg["MOVEMENTS_ROTATE_RIGHT"] = "destra";
Blockly.Msg["MOVEMENTS_ROTATE_TOOLTIP"] = "Ruota NAO nella direzione specificata secondo l'angolo dato.";
Blockly.Msg["MOVEMENTS_MOVE_TO_TOOLTIP"] = "Muove NAO nella direzione specificata per una distanza data.";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TITLE"] = "muoversi a X %1 Y %2 angolo %3 °";
Blockly.Msg["MOVEMENTS_MOVE_TO_XY_TOOLTIP"] = "Muove NAO verso una posizione specifica in centimetri con un angolo dato (in gradi).";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TITLE"] = "animazione %1 velocità %2 %";
Blockly.Msg["MOVEMENTS_STAND_POSTURE"] = "in piedi";
Blockly.Msg["MOVEMENTS_SIT_POSTURE"] = "seduto";
Blockly.Msg["MOVEMENTS_GO_TO_POSTURE_TOOLTIP"] = "Esegui un'animazione con NAO alla velocità specificata.";


Blockly.Msg["MOVEMENTS_YAW"] = "imbardata";
Blockly.Msg["MOVEMENTS_PITCH"] = "beccheggio";
Blockly.Msg["MOVEMENTS_ROLL"] = "rollio";
Blockly.Msg["MOVEMENTS_YAW&PITCH"] = "imbardata&beccheggio";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_1_TITLE"] = "muovere la giuntura %1 %2 di %3 ° velocità %4 %";
Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_4_TITLE"] = "muovere la giuntura %1 di %2 ° velocità %3 %";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TITLE"] = "Crea una postura in radianti: Testa %1 %2 Braccio sinistro %3 %4 %5 %6 %7 %8 Braccio destro %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_TOOLTIP"] = "Crea una postura per la testa e le braccia di NAO con gli angoli specificati (in radianti).";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TITLE"] = "Crea una postura in gradi: Testa %1 %2 Braccio sinistro %3 %4 %5 %6 %7 %8 Braccio destro %9 %10 %11 %12 %13 %14";
Blockly.Msg["MOVEMENTS_SET_ANGLES_UPPER_BODY_DEGRES_TOOLTIP"] = "Crea una postura per la testa e le braccia di NAO con gli angoli specificati (in gradi).";

// Pitch or Roll

Blockly.Msg["MOVEMENTS_L_SHOULDER_JOINT"] = "spalla sinistra";
Blockly.Msg["MOVEMENTS_R_SHOULDER_JOINT"] = "spalla destra";

Blockly.Msg["MOVEMENTS_L_ANKLE_JOINT"] = "caviglia sinistra";
Blockly.Msg["MOVEMENTS_R_ANKLE_JOINT"] = "caviglia destra";

// Yaw or Roll
Blockly.Msg["MOVEMENTS_L_ELBOW_JOINT"] = "gomito sinistro";
Blockly.Msg["MOVEMENTS_R_ELBOW_JOINT"] = "gomito destro";

Blockly.Msg["MOVEMENTS_HEAD_JOINT"] = "testa";

// Pitch or Roll / Only Pitch and Yaw
Blockly.Msg["MOVEMENTS_L_HIP_JOINT"] = "anca sinistra";
Blockly.Msg["MOVEMENTS_R_HIP_JOINT"] = "anca destra";

// Only Pitch 
Blockly.Msg["MOVEMENTS_L_KNEE_JOINT"] = "ginocchio sinistro";
Blockly.Msg["MOVEMENTS_R_KNEE_JOINT"] = "ginocchio destro";

// Only Yaw
Blockly.Msg["MOVEMENTS_L_WRIST_JOINT"] = "polso sinistro";
Blockly.Msg["MOVEMENTS_R_WRIST_JOINT"] = "polso destro";

Blockly.Msg["MOVEMENTS_ANGLE_INTERPOLATION_WITH_SPEED_TOOLTIP"] = "Interpola un angolo per la giuntura selezionata alla velocità data.";

// Game

Blockly.Msg["GAME_CAPITAL_INIT_TITLE"] = "inizia il gioco delle capitali";
Blockly.Msg["GAME_CAPITAL_INIT_TOOLTIP"] = "Inizia il gioco delle capitali.";
Blockly.Msg["GAME_CAPITAL_PLAY_TITLE"] = "gioca al gioco delle capitali con %1";
Blockly.Msg["GAME_CAPITAL_PLAY_TOOLTIP"] = "Avvia il gioco delle capitali con la capitale del paese specificato.";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TITLE"] = "ottieni un paese casuale";
Blockly.Msg["GAME_CAPITAL_GET_RANDOM_COUNTRY_TOOLTIP"] = "Restituisce un paese casuale.";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TITLE"] = "ottieni %1 da %2";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_CAPITAL"] = "la capitale";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_HINT"] = "un indizio";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_POPULATION"] = "la popolazione";
Blockly.Msg["GAME_CAPITAL_GET_ELEMENT_FROM_COUNTRY_TOOLTIP"] = "Restituisce la capitale, un indizio o la popolazione del paese specificato.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TITLE"] = "inizializza %1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_TOOLTIP"] = "Inizializza la storia dinamica. Scegli una storia da raccontare dall'elenco.";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY1"] = "storia_1";
Blockly.Msg["GAME_DYNAMIC_STORY_INIT_STORY2"] = "storia_2";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TITLE"] = "gioca la scena %1 e restituisci le scelte possibili";
Blockly.Msg["GAME_PLAY_CURRENT_SCENE_TOOLTIP"] = "Riproduce la scena attuale e restituisce le scelte possibili per la prossima parte della storia.";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TITLE"] = "inizializzare il gioco di calcolo mentale";
Blockly.Msg["GAME_MENTAL_MATH_INIT_TOOLTIP"] = "Inizializza il gioco di calcolo mentale.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TITLE"] = "in %1 ottenere %2";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_TOOLTIP"] = "Avvia il gioco di calcolo mentale con un'operazione di somma, sottrazione o casuale.";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_ADD"] = "un'addizione";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_SUB"] = "una sottrazione";
Blockly.Msg["GAME_MENTAL_MATH_PLAY_OPERATION_RANDOM"] = "un'operazione casuale";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TITLE"] = "converti il numero %1 in lettere";
Blockly.Msg["GAME_MENTAL_MATH_GET_NUMBER_TOOLTIP"] = "Restituisce il numero dato in parole.";


// Sensors
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TITLE"] = "%1 della testa è toccato";
Blockly.Msg["SENSORS_FRONT_TACTIL"] = "sensore frontale";
Blockly.Msg["SENSORS_MIDDLE_TACTIL"] = "sensore centrale";
Blockly.Msg["SENSORS_REAR_TACTIL"] = "sensore posteriore";
Blockly.Msg["SENSORS_ALL_TACTIL"] = "uno dei sensori";
Blockly.Msg["SENSORS_TACTIL_TOUCHED_TOOLTIP"] = "Restituisce vero se il sensore tattile specificato è toccato.";

Blockly.Msg["SENSORS_HAND_TOUCHED_TITLE"] = "%1 della %2 è toccato";
Blockly.Msg["SENSORS_LEFT"] = "sensore sinistro";
Blockly.Msg["SENSORS_RIGHT"] = "sensore destro";
Blockly.Msg["SENSORS_BACK"] = "sensore posteriore";
Blockly.Msg["SENSORS_ALL"] = "uno dei sensori";
Blockly.Msg["SENSORS_LEFT_HAND"] = "mano sinistra";
Blockly.Msg["SENSORS_RIGHT_HAND"] = "mano destra";
Blockly.Msg["SENSORS_HAND_TOUCHED_TOOLTIP"] = "Restituisce vero se il sensore della mano specificata è toccato.";

Blockly.Msg["SENSORS_BUMPER_PRESSED_TITLE"] = "%1 è premuto";
Blockly.Msg["SENSORS_BUMPER_LEFT"] = "bumper sinistro";
Blockly.Msg["SENSORS_BUMPER_RIGHT"] = "bumper destro";
Blockly.Msg["SENSORS_BUMPER_ALL"] = "uno dei bumpers";
Blockly.Msg["SENSORS_BUMPER_PRESSED_TOOLTIP"] = "Restituisce vero se il bumper specificato è premuto.";


Blockly.Msg["SENSORS_SONAR_DETECTION_TITLE"] = "%1 rilevato con il sonar a %2";
Blockly.Msg["SENSORS_SONAR_DETECTED"] = "qualcosa è";
Blockly.Msg["SENSORS_SONAR_NOTHING"] = "niente è";
Blockly.Msg["SENSORS_SONAR_DETECTION_TOOLTIP"] = "Restituisce vero se il sonar rileva qualcosa.";

Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TITLE"] = "livello della batteria";
Blockly.Msg["SENSORS_GET_BATTERY_CHARGE_TOOLTIP"] = "Restituisce il livello attuale della batteria come percentuale.";

Blockly.Msg['TIME_WAIT_TITLE'] = 'aspettare %1 %2';
Blockly.Msg['TIME_WAIT_TOOLTIP'] = "Sospende l'esecuzione del codice.";
Blockly.Msg['TIME_WAIT_SECOND'] = 'secondo.i';
Blockly.Msg['TIME_WAIT_MILLISECOND'] = 'millisecondo.i';
Blockly.Msg['TIME_WAIT_MICROSECOND'] = 'microsecondo.i';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = 'aspettare fino a %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = "Interrompe l'esecuzione del codice fino a quando la condizione è soddisfatta.";
