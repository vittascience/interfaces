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

Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Pausa kodens exekvering.';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppar kodens exekvering tills villkoret är uppfyllt.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta stoppur';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Initierar ett stoppur på 0 (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'stoppurvärde i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Återger värdet av stoppuret från initiering (i sekunder eller millisekunder).';
Blockly.Msg['ACTUATORS_MOVE_TITLE'] = '%1 %2 steg';
Blockly.Msg['ACTUATORS_MOVE_TOOLTIP'] = 'Flyttar MatataBot-roboten ett antal steg (1 steg = 10 cm).';
Blockly.Msg['ACTUATORS_MOVE_CM_TITLE'] = 'flytta %1 cm';
Blockly.Msg['ACTUATORS_MOVE_CM_TOOLTIP'] = 'Flyttar MatataBot-roboten en viss sträcka i cm. Ett negativt värde får den att åka bakåt.';
Blockly.Msg['ACTUATORS_TURN_TITLE'] = 'sväng %1 med %2 °';
Blockly.Msg['ACTUATORS_TURN_TOOLTIP'] = 'Svänger MatataBot-roboten på plats.';
Blockly.Msg['ACTUATORS_SET_GEAR_TITLE'] = 'ställ in %1 till växel %2';
Blockly.Msg['ACTUATORS_SET_GEAR_TOOLTIP'] = 'Kör ett eller båda hjulen, från växel -6 (bakåt) till 6 (framåt). 0 stoppar hjulet.';
Blockly.Msg['ACTUATORS_SET_SPEED_TITLE'] = 'ställ in hjulens hastighet: vänster %1 höger %2 (cm/s)';
Blockly.Msg['ACTUATORS_SET_SPEED_TOOLTIP'] = 'Ställer in hastigheten för båda hjulen, mellan -16 och 16 cm/s. Ett negativt värde får hjulet att gå bakåt.';
Blockly.Msg['ACTUATORS_STOP_TITLE'] = 'stoppa %1';
Blockly.Msg['ACTUATORS_STOP_TOOLTIP'] = 'Stoppar ett eller båda hjulen.';
Blockly.Msg['ACTUATORS_DANCE_TITLE'] = 'gör dans n°%1';
Blockly.Msg['ACTUATORS_DANCE_TOOLTIP'] = 'MatataBot-roboten dansar, från 1 till 6.';
Blockly.Msg['ACTUATORS_ACTION_TITLE'] = 'utför åtgärd n°%1';
Blockly.Msg['ACTUATORS_ACTION_TOOLTIP'] = 'MatataBot-roboten gör en åtgärd, från 1 till 6.';
Blockly.Msg['SOUND_PLAY_NOTE_TITLE'] = 'spela ton %1 i %2 ms';
Blockly.Msg['SOUND_PLAY_NOTE_TOOLTIP'] = 'Spelar en ton på MatataBot-roboten under en viss tid i millisekunder.';
Blockly.Msg['SOUND_PLAY_MELODY_TITLE'] = 'spela melodi n°%1';
Blockly.Msg['SOUND_PLAY_MELODY_TOOLTIP'] = 'Spelar en melodi på MatataBot-roboten, från 1 till 10.';
Blockly.Msg['SOUND_PLAY_MUSIC_TITLE'] = 'spela låt n°%1';
Blockly.Msg['SOUND_PLAY_MUSIC_TOOLTIP'] = 'Spelar en låt på MatataBot-roboten, från 1 till 6.';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TITLE'] = 'ljus %1 i %2 med ljusstyrka %3';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_TOOLTIP'] = 'Belyser ögonen på MatataBot-roboten med en ljusstyrka från 0 till 6.';
Blockly.Msg['DISPLAY_SET_EYES_TITLE'] = 'ljus %1 med färg %2';
Blockly.Msg['DISPLAY_SET_EYES_TOOLTIP'] = 'Belyser ögonen på MatataBot-roboten med en vald färg.';
Blockly.Msg['DISPLAY_CLEAR_EYES_TITLE'] = 'släck ögonen';
Blockly.Msg['DISPLAY_CLEAR_EYES_TOOLTIP'] = 'Stänger av ögonen på MatataBot-roboten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Skriver data till den seriella porten.';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'] = 'med';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES'] = 'ny rad(er)';
Blockly.Msg['MATATACON_IS_BUTTON_TITLE'] = 'knapp %1 tryckt';
Blockly.Msg['MATATACON_IS_BUTTON_TOOLTIP'] = 'Återger Sant om knappen på MatataCon-kontrollern är tryckt.';
Blockly.Msg['MATATACON_IS_GESTURE_TITLE'] = 'kontroller %1';
Blockly.Msg['MATATACON_IS_GESTURE_TOOLTIP'] = 'Återger Sant om denna rörelse av MatataCon-kontrollern upptäckts.';
Blockly.Msg['MATATACON_IS_COLOR_TITLE'] = 'färg %1 upptäckt';
Blockly.Msg['MATATACON_IS_COLOR_TOOLTIP'] = 'Återger Sant om färgsensorn på MatataCon-kontrollern upptäcker denna färg.';
Blockly.Msg['MATATACON_IS_SOUND_TITLE'] = 'ljud upptäckt';
Blockly.Msg['MATATACON_IS_SOUND_TOOLTIP'] = 'Återger Sant om MatataCon-kontrollern upptäcker ett ljud.';
Blockly.Msg['MATATACON_IS_OBSTACLE_TITLE'] = 'hinder upptäckt';
Blockly.Msg['MATATACON_IS_OBSTACLE_TOOLTIP'] = 'Återger Sant om MatataCon-kontrollern upptäcker ett hinder.';
Blockly.Msg['MATATACON_IS_LIGHT_TITLE'] = '%1 upptäckt';
Blockly.Msg['MATATACON_IS_LIGHT_TOOLTIP'] = 'Återger Sant om MatataCon-kontrollern upptäcker ljus eller mörker.';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TITLE'] = 'ljusstyrka';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_TOOLTIP'] = 'Återger ljusstyrkan mätt av MatataCon-kontrollern, från 0 till 255.';
Blockly.Msg['MATATACON_GET_COLOR_TITLE'] = '%1 värde av färgsensorn';
Blockly.Msg['MATATACON_GET_COLOR_TOOLTIP'] = 'Återger det röda, gröna eller blå värdet mätt av MatataCon-kontrollern, från 0 till 255.';
Blockly.Msg['MATATACON_GET_ANGLE_TITLE'] = '%1 vinkel (°)';
Blockly.Msg['MATATACON_GET_ANGLE_TOOLTIP'] = 'Återger vinkeln på MatataCon-kontrollern, i grader.';
Blockly.Msg['MATATACON_GET_ACCELERATION_TITLE'] = 'acceleration på axel %1';
Blockly.Msg['MATATACON_GET_ACCELERATION_TOOLTIP'] = 'Återger accelerationen av MatataCon-kontrollern på en axel.';
Blockly.Msg['MATATACON_GET_SHAKING_TITLE'] = 'skakningsintensitet';
Blockly.Msg['MATATACON_GET_SHAKING_TOOLTIP'] = 'Återger skakningsintensiteten av MatataCon-kontrollern.';
Blockly.Msg['MATATACON_SET_RING_COLOR_TITLE'] = '[Ring] ljus LED n°%1 i %2 med ljusstyrka %3';
Blockly.Msg['MATATACON_SET_RING_COLOR_TOOLTIP'] = 'Belyser en LED av ringen på MatataCon-kontrollern, från 1 till 12, med en ljusstyrka från 0 till 6. Nummer 0 tänder alla LEDs.';
Blockly.Msg['MATATACON_SET_RING_TITLE'] = '[Ring] ljus LED n°%1 med färg %2';
Blockly.Msg['MATATACON_SET_RING_TOOLTIP'] = 'Belyser en LED av ringen på MatataCon-kontrollern, från 1 till 12, med en vald färg. Nummer 0 tänder alla LEDs.';
Blockly.Msg['MATATACON_SET_RING_LEDS_TITLE'] = '[Ring] ljus LED %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12';
Blockly.Msg['MATATACON_SET_RING_LEDS_TOOLTIP'] = 'Väljer färgen på de 12 LEDs av ringen på MatataCon-kontrollern, från LED n°1 till LED n°12.';
Blockly.Msg['MATATACON_RING_ANIMATION_TITLE'] = '[Ring] starta animation %1';
Blockly.Msg['MATATACON_RING_ANIMATION_TOOLTIP'] = 'Startar en ljusanimation på ringen av MatataCon-kontrollern.';
Blockly.Msg['MATATACON_CLEAR_RING_TITLE'] = '[Ring] stäng av alla LEDs'; 
Blockly.Msg['MATATACON_CLEAR_RING_TOOLTIP'] = 'Stänger av ringen på MatataCon-kontrollern.';
Blockly.Msg['MATATACON_SEND_MESSAGE_TITLE'] = 'skicka meddelande nr %1';
Blockly.Msg['MATATACON_SEND_MESSAGE_TOOLTIP'] = 'Skickar ett meddelande, från 1 till 6, till de andra MatataCon-kontrollerna.';
Blockly.Msg['MATATACON_IS_MESSAGE_TITLE'] = 'meddelande nr %1 mottaget';
Blockly.Msg['MATATACON_IS_MESSAGE_TOOLTIP'] = 'Återger True om MatataCon-kontrollen tog emot detta meddelande, från 1 till 6.';
Blockly.Msg['MATATACON_GET_MESSAGE_TITLE'] = 'mottaget meddelande';
Blockly.Msg['MATATACON_GET_MESSAGE_TOOLTIP'] = 'Återger numret på det meddelande som mottagits av MatataCon-kontrollen, eller 0 om inget meddelande.';
Blockly.Msg['MATATALAB_DIR_FORWARD'] = 'röra sig framåt';
Blockly.Msg['MATATALAB_DIR_BACKWARD'] = 'röra sig bakåt';
Blockly.Msg['MATATALAB_DIR_LEFT'] = 'vänster';
Blockly.Msg['MATATALAB_DIR_RIGHT'] = 'höger';
Blockly.Msg['MATATALAB_WHEEL_BOTH'] = 'båda hjulen';
Blockly.Msg['MATATALAB_WHEEL_LEFT'] = 'vänstra hjulet';
Blockly.Msg['MATATALAB_WHEEL_RIGHT'] = 'högra hjulet';
Blockly.Msg['MATATALAB_EYE_BOTH'] = 'båda ögonen';
Blockly.Msg['MATATALAB_EYE_LEFT'] = 'vänstra ögat';
Blockly.Msg['MATATALAB_EYE_RIGHT'] = 'högra ögat';
Blockly.Msg['MATATALAB_COLOR_WHITE'] = 'vit';
Blockly.Msg['MATATALAB_COLOR_RED'] = 'röd';
Blockly.Msg['MATATALAB_COLOR_YELLOW'] = 'gul';
Blockly.Msg['MATATALAB_COLOR_GREEN'] = 'grön';
Blockly.Msg['MATATALAB_COLOR_BLUE'] = 'blå';
Blockly.Msg['MATATALAB_COLOR_PURPLE'] = 'lila';
Blockly.Msg['MATATALAB_COLOR_BLACK'] = 'svart';
Blockly.Msg['MATATALAB_ANIMATION_SPOONDRIFT'] = 'vinka';
Blockly.Msg['MATATALAB_ANIMATION_METEOR'] = 'meteor';
Blockly.Msg['MATATALAB_ANIMATION_RAINBOW'] = 'regnbåge';
Blockly.Msg['MATATALAB_ANIMATION_FIREFLY'] = 'eldfluga';
Blockly.Msg['MATATALAB_ANIMATION_COLORWIPE'] = 'färgborttagning';
Blockly.Msg['MATATALAB_ANIMATION_BREATHE'] = 'andas';
Blockly.Msg['MATATALAB_BUTTON_PLAY'] = 'spela';
Blockly.Msg['MATATALAB_BUTTON_DELETE'] = 'ta bort';
Blockly.Msg['MATATALAB_BUTTON_FORWARD'] = 'framåt';
Blockly.Msg['MATATALAB_BUTTON_BACKWARD'] = 'bakåt';
Blockly.Msg['MATATALAB_BUTTON_LEFT'] = 'vänster';
Blockly.Msg['MATATALAB_BUTTON_RIGHT'] = 'höger';
Blockly.Msg['MATATALAB_BUTTON_MUSIC'] = 'musik';
Blockly.Msg['MATATALAB_GESTURE_SHAKE'] = 'skakade';
Blockly.Msg['MATATALAB_GESTURE_TILT_LEFT'] = 'lutade vänster';
Blockly.Msg['MATATALAB_GESTURE_TILT_RIGHT'] = 'lutade höger';
Blockly.Msg['MATATALAB_GESTURE_TILT_FORWARD'] = 'lutade framåt';
Blockly.Msg['MATATALAB_GESTURE_TILT_BACKWARD'] = 'lutade bakåt';
Blockly.Msg['MATATALAB_GESTURE_FALL'] = 'i fritt fall';
Blockly.Msg['MATATALAB_GESTURE_FACE_UP'] = 'vänd uppåt';
Blockly.Msg['MATATALAB_GESTURE_FACE_DOWN'] = 'vänd neråt';
Blockly.Msg['MATATALAB_LIGHT_BRIGHT'] = 'ljus';
Blockly.Msg['MATATALAB_LIGHT_DARK'] = 'mörker';
Blockly.Msg['MATATALAB_ANGLE_PITCH'] = 'lutning';
Blockly.Msg['MATATALAB_ANGLE_ROLL'] = 'rullning';
Blockly.Msg['MATATALAB_ANGLE_YAW'] = 'sväng';
Blockly.Msg['IO_WAIT_KEYWORDS'] = 'fördröjning, vänta';
Blockly.Msg['IO_WAIT_UNTIL_KEYWORDS'] = 'vänta, paus';
Blockly.Msg['IO_INITCHRONOMETER_KEYWORDS'] = 'stoppur, starta, återställ';
Blockly.Msg['IO_GETCHRONOMETER_KEYWORDS'] = 'stoppur, förfluten tid';
Blockly.Msg['ACTUATORS_MOVE_KEYWORDS'] = 'framåt, bakåt, röra';
Blockly.Msg['ACTUATORS_MOVE_CM_KEYWORDS'] = 'framåt, bakåt, avstånd';
Blockly.Msg['ACTUATORS_TURN_KEYWORDS'] = 'rotera, rotation';
Blockly.Msg['ACTUATORS_SET_GEAR_KEYWORDS'] = 'motor, hjul, hastighet';
Blockly.Msg['ACTUATORS_SET_SPEED_KEYWORDS'] = 'motor, hjul, hastighet';
Blockly.Msg['ACTUATORS_STOP_KEYWORDS'] = 'motor, hjul';
Blockly.Msg['ACTUATORS_DANCE_KEYWORDS'] = 'dansa';
Blockly.Msg['ACTUATORS_ACTION_KEYWORDS'] = 'rörelse, animation';
Blockly.Msg['SOUND_PLAY_NOTE_KEYWORDS'] = 'musik, ljud, ton';
Blockly.Msg['SOUND_PLAY_MELODY_KEYWORDS'] = 'musik, ljud';
Blockly.Msg['SOUND_PLAY_MUSIC_KEYWORDS'] = 'musik, ljud';
Blockly.Msg['DISPLAY_SET_EYES_COLOR_KEYWORDS'] = 'LED, ögon, färg';
Blockly.Msg['DISPLAY_SET_EYES_KEYWORDS'] = 'LED, ögon, RGB';
Blockly.Msg['DISPLAY_CLEAR_EYES_KEYWORDS'] = 'LED, rensa';
Blockly.Msg['MATATACON_SET_RING_COLOR_KEYWORDS'] = 'LED, ring, färg';
Blockly.Msg['MATATACON_SET_RING_KEYWORDS'] = 'LED, ring, RGB';
Blockly.Msg['MATATACON_SET_RING_LEDS_KEYWORDS'] = 'LED, ring, färger';
Blockly.Msg['MATATACON_RING_ANIMATION_KEYWORDS'] = 'LED, ring, effekt';
Blockly.Msg['MATATACON_CLEAR_RING_KEYWORDS'] = 'LED, ring, rensa';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_KEYWORDS'] = 'konsol, överför, skicka';
Blockly.Msg['MATATACON_SEND_MESSAGE_KEYWORDS'] = 'skicka, radio';
Blockly.Msg['MATATACON_IS_MESSAGE_KEYWORDS'] = 'ta emot, radio';
Blockly.Msg['MATATACON_GET_MESSAGE_KEYWORDS'] = 'mottag, radio';
Blockly.Msg['MATATACON_IS_BUTTON_KEYWORDS'] = 'knapp, tangent';
Blockly.Msg['MATATACON_IS_GESTURE_KEYWORDS'] = 'rörelse, gest, accelerometer';
Blockly.Msg['MATATACON_IS_COLOR_KEYWORDS'] = 'sensor, färg';
Blockly.Msg['MATATACON_IS_SOUND_KEYWORDS'] = 'mikrofon, ljud';
Blockly.Msg['MATATACON_IS_OBSTACLE_KEYWORDS'] = 'infraröd, avstånd';
Blockly.Msg['MATATACON_IS_LIGHT_KEYWORDS'] = 'ljusstyrka, ljus';
Blockly.Msg['MATATACON_GET_BRIGHTNESS_KEYWORDS'] = 'ljus, sensor';
Blockly.Msg['MATATACON_GET_COLOR_KEYWORDS'] = 'RGB, färg';
Blockly.Msg['MATATACON_GET_ANGLE_KEYWORDS'] = 'lutning, gyro';
Blockly.Msg['MATATACON_GET_ACCELERATION_KEYWORDS'] = 'accelerometer';
Blockly.Msg['MATATACON_GET_SHAKING_KEYWORDS'] = 'skaka, accelerometer';
