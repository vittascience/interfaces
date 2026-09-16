/**
 * @fileoverview English messages for Codey. (EN)
 */

'use strict';

// Display
// IO
// IO - Time

// Communication 

// Sensors 

// Actuators

// Robots

Blockly.Msg['DISPLAY_SHOWRGB_TITLE'] = '[Inbyggd LED] R %1 G %2 B %3';
Blockly.Msg['DISPLAY_SHOWRGB_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SHOWRGB_TOOLTIP\'] = \'Visar den angivna färgen på Codeys inbyggda LED i RGB-format (0 ~ 255).\';';
Blockly.Msg['DISPLAY_SETRED_TITLE'] = '[Inbyggd LED] röd intensitet %1';
Blockly.Msg['DISPLAY_SETRED_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SETRED_TOOLTIP\'] = \'Ställer in den röda intensiteten för Codeys inbyggda LED (0 ~ 255).\';';
Blockly.Msg['DISPLAY_SETGREEN_TITLE'] = '[Inbyggd LED] grön intensitet %1';
Blockly.Msg['DISPLAY_SETGREEN_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SETGREEN_TOOLTIP\'] = \'Ställer in den gröna intensiteten för Codeys inbyggda LED (0 ~ 255).\';';
Blockly.Msg['DISPLAY_SETBLUE_TITLE'] = '[Inbyggd LED] blå intensitet %1';
Blockly.Msg['DISPLAY_SETBLUE_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SETBLUE_TOOLTIP\'] = \'Ställer in den blå intensiteten för Codeys inbyggda LED (0 ~ 255).\';';
Blockly.Msg['DISPLAY_OFF_TITLE'] = '[Inbyggd LED] stäng av';
Blockly.Msg['DISPLAY_OFF_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_OFF_TOOLTIP\'] = \'Stänger av Codeys inbyggda LED.\';';
Blockly.Msg['DISPLAY_SHOW_TITLE'] = '[Matris] visa %1';
Blockly.Msg['DISPLAY_SHOW_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SHOW_TOOLTIP\'] = \'Visar den angivna texten på Codeys LED-matris.\';';
Blockly.Msg['DISPLAY_SETPIXEL_TITLE'] = '[Matris] pixel X %1 Y %2 tillstånd %3';
Blockly.Msg['DISPLAY_SETPIXEL_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_SETPIXEL_TOOLTIP\'] = \'Sätter pixelns tillstånd vid position X och Y på Codeys LED-matris.\';';
Blockly.Msg['DISPLAY_GETPIXEL_TITLE'] = '[Matris] pixelens tillstånd X %1 Y %2';
Blockly.Msg['DISPLAY_GETPIXEL_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_GETPIXEL_TOOLTIP\'] = \'Returnerar pixelns tillstånd vid position X och Y på Codeys LED-matris.\';';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TITLE'] = '[Matris] växla pixel X %1 Y %2';
Blockly.Msg['DISPLAY_TOGGLEPIXEL_TOOLTIP'] = 'Blockly.Msg[\'DISPLAY_TOGGLEPIXEL_TOOLTIP\'] = \'Växlar pixelns tillstånd vid position X och Y på Codeys LED-matris.\';';
Blockly.Msg['DISPLAY_CLEAR_TITLE'] = '[Matris] rensa';
Blockly.Msg['DISPLAY_CLEAR_TOOLTIP'] = 'Rensar LED-matrisen på Codey.';
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HÖG (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'LÅG (0)';
Blockly.Msg['IO_DIGITAL_SIGNAL_TOOLTIP'] = 'Returnerar ett booleskt värde (1 om HÖG eller 0 om LÅG).';
Blockly.Msg['IO_WAIT_TITLE'] = 'vänta %1 %2';
Blockly.Msg['IO_WAIT_TOOLTIP'] = 'Stoppar kodkörningen (varaktighet i sekunder eller millisekunder).';
Blockly.Msg['IO_WAIT_SECOND'] = 'sekund(er)';
Blockly.Msg['IO_WAIT_MILLISECOND'] = 'millisekund(er)';
Blockly.Msg['IO_WAIT_MICROSECOND'] = 'mikrosekund(er)';
Blockly.Msg['IO_WAIT_UNTIL_TITLE'] = 'vänta tills %1';
Blockly.Msg['IO_WAIT_UNTIL_TOOLTIP'] = 'Stoppar kodkörningen tills villkoret är uppfyllt.';
Blockly.Msg['IO_INITCHRONOMETER_TITLE'] = 'starta tidtagaren';
Blockly.Msg['IO_INITCHRONOMETER_TOOLTIP'] = 'Gör det möjligt att starta tidtagaren (i sekunder).';
Blockly.Msg['IO_GETCHRONOMETER_TITLE'] = 'hämta tidtagaren i %1';
Blockly.Msg['IO_GETCHRONOMETER_TOOLTIP'] = 'Returnerar tidtagarens värde sedan initiering i sekunder eller millisekunder.';
Blockly.Msg['IO_ONBUTTONPRESSED_TITLE'] = 'om knapp %1 trycks då';
Blockly.Msg['IO_ONBUTTONPRESSED_TOOLTIP'] = 'Kör instruktioner om knapp A, B eller C är nedtryckt.';
Blockly.Msg['IO_BUTTON_STATE_TITLE'] = 'knapp %1 tillstånd';
Blockly.Msg['IO_BUTTON_STATE_TOOLTIP'] = 'Returnerar tillståndet för knapp A, B eller C (true/false).';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TITLE'] = 'potentiometervärde';
Blockly.Msg['IO_POTENTIOMETER_GET_VALUE_TOOLTIP'] = 'Returnerar potentiometervärdet (0 ~ 100).';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TITLE'] = '[IR] infraröd mottagning';
Blockly.Msg['COMMUNICATION_IRRECEIVE_TOOLTIP'] = 'Returnerar strängen som mottagits av IR-mottagaren. Data som skickas från IR-sändaren måste slutas med \\n. För NEC-fjärrprotokoll, använd receive_remote_code().';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TITLE'] = '[IR] infraröd mottagning (NEC)';
Blockly.Msg['COMMUNICATION_IRRECEIVEREMOTECODE_TOOLTIP'] = 'Returnerar koden för den senaste mottagna infraröda signalen som en array. Första elementet är adressen, det andra är innehållet.';
Blockly.Msg['COMMUNICATION_IRSEND_TITLE'] = '[IR] skicka %1';
Blockly.Msg['COMMUNICATION_IRSEND_TOOLTIP'] = 'Skickar en sträng via infrarött.';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TITLE'] = '[IR] starta inlärning';
Blockly.Msg['COMMUNICATION_IRSTARTLEARNING_TOOLTIP'] = 'Startar inlärning av en infraröd signal. Endast kompatibelt med NEC-fjärrkontroller.';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TITLE'] = '[IR] stoppa inlärning';
Blockly.Msg['COMMUNICATION_IRSTOPLEARNING_TOOLTIP'] = 'Avslutar inlärning av en infraröd signal.';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TITLE'] = '[IR] spara inlärd signal vid index %1';
Blockly.Msg['COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP'] = 'Blockly.Msg[\'COMMUNICATION_IRSAVELEARNEDRESULT_TOOLTIP\'] = \'Sparar den inlärda infraröda signalen i Codeys minne (index 0 till 15).\';';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TITLE'] = '[IR] skicka signal från index %1';
Blockly.Msg['COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP'] = 'Blockly.Msg[\'COMMUNICATION_IRSENDLEARNEDRESULT_TOOLTIP\'] = \'Skickar den inlärda infraröda signalen från Codeys minne.\';';
Blockly.Msg['COMMUNICATION_IRLEARN_TITLE'] = '[IR] lär in i %1 s';
Blockly.Msg['COMMUNICATION_IRLEARN_TOOLTIP'] = 'Lär in en infraröd signal under angiven tid (i sekunder).';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TITLE'] = '%1';
Blockly.Msg['SENSORS_GETROTATION_EULER_ANGLES_TOOLTIP'] = 'Returnerar rotationsvärdet längs den valda axeln (x, y, z).';
Blockly.Msg['SENSORS_PITCH'] = "lutning";
Blockly.Msg['SENSORS_ROLL'] = "rullning";
Blockly.Msg['SENSORS_YAW'] = "gir";
Blockly.Msg['SENSORS_GETROTATION_TITLE'] = "vinkel på axel %1";
Blockly.Msg['SENSORS_GETROTATION_TOOLTIP'] = "Returnerar Codeys rotationsvinkel på de tre axlarna. Moturs är positivt.";
Blockly.Msg['SENSORS_RESETROTATION_TITLE'] = "nollställ rotationsvinkel på axel %1";
Blockly.Msg['SENSORS_RESETROTATION_TOOLTIP'] = "Nollställer Codeys rotationsvinkel till 0 på den valda axeln.";
Blockly.Msg['SENSORS_ALL_AXIS'] = "alla axlar";
Blockly.Msg['SENSORS_IS_SHAKED_TITLE'] = "skakad?";
Blockly.Msg['SENSORS_IS_SHAKED_TOOLTIP'] = "Returnerar true om en skakning upptäcks.";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TITLE'] = "skakningsintensitet";
Blockly.Msg['SENSORS_GET_SHAKE_STRENGTH_TOOLTIP'] = "Returnerar intensiteten för den senaste upptäckta skakningen.";
Blockly.Msg['SENSORS_GETPOSITION_TITLE'] = "%1?";
Blockly.Msg['SENSORS_IS_TILTED_LEFT'] = "lutad åt vänster";
Blockly.Msg['SENSORS_IS_TILTED_RIGHT'] = "lutad åt höger";
Blockly.Msg['SENSORS_IS_EARS_UP'] = "öron upp";
Blockly.Msg['SENSORS_IS_EARS_DOWN'] = "öronen nedåt";
Blockly.Msg['SENSORS_IS_DISPLAY_UP'] = "display uppåt";
Blockly.Msg['SENSORS_IS_DISPLAY_DOWN'] = "display nedåt";
Blockly.Msg['SENSORS_IS_UPRIGHT'] = "upprätt";
Blockly.Msg['SENSORS_GETPOSITION_TOOLTIP'] = "Returnerar true om enheten är i den angivna positionen.";
Blockly.Msg['SENSORS_GETACCELERATION_TITLE'] = "acceleration på %1";
Blockly.Msg['SENSORS_GETACCELERATION_TOOLTIP'] = "Returnerar accelerationsvärdet på vald axel eller den totala kraften.";
Blockly.Msg['SENSORS_GETGYROSCOPE_TITLE'] = "gyroskop på axel %1";
Blockly.Msg['SENSORS_GETGYROSCOPE_TOOLTIP'] = "Returnerar gyroskopvärdet på vald axel.";
Blockly.Msg['SENSORS_GET_LOUDNESS_TITLE'] = 'ljudnivå';
Blockly.Msg['SENSORS_GET_LOUDNESS_TOOLTIP'] = 'Returnerar ljudnivån (0 ~ 100).';
Blockly.Msg['SENSORS_GET_LIGHT_TITLE'] = 'ljussensorns värde';
Blockly.Msg['SENSORS_GET_LIGHT_TOOLTIP'] = 'Returnerar värdet från ljussensorn (0 ~ 100).';
Blockly.Msg['SPEAKER_PLAY_MELODY_TITLE'] = "spela upp ljud %1";
Blockly.Msg['SPEAKER_PLAY_MELODY_TOOLTIP'] = "Spelar upp en förinställd melodi.";
Blockly.Msg['SPEAKER_PLAY_MELODY_UNTIL_DONE_TITLE'] = "spela upp ljud %1 tills det är klart";
Blockly.Msg['SPEAKER_PLAY_MELODY_UNTIL_DONE_TOOLTIP'] = "Spelar upp en förinställd melodi och väntar tills den är klar.";
Blockly.Msg['SPEAKER_PLAY_NOTE_TITLE'] = "spela ton %1";
Blockly.Msg['SPEAKER_PLAY_NOTE_TOOLTIP'] = "Spelar en musikton.";
Blockly.Msg['SPEAKER_PLAY_TONE_TITLE'] = "spela ton %1 Hz";
Blockly.Msg['SPEAKER_PLAY_TONE_TOOLTIP'] = "Spelar en ton med en given frekvens.";
Blockly.Msg['SPEAKER_REST_TITLE'] = "pausa i %1 takt(er)";
Blockly.Msg['SPEAKER_REST_TOOLTIP'] = "Infogar en paus i musiken.";
Blockly.Msg['SPEAKER_STOP_SOUNDS_TITLE'] = "stoppa alla ljud";
Blockly.Msg['SPEAKER_STOP_SOUNDS_TOOLTIP'] = "Stoppar alla ljud som spelas upp.";
Blockly.Msg['SPEAKER_SET_VOLUME_TITLE'] = "sätt volymen till %1";
Blockly.Msg['SPEAKER_SET_VOLUME_TOOLTIP'] = "Ställer in ljudvolymen.";
Blockly.Msg['SPEAKER_GET_VOLUME_TITLE'] = "hämta volymen";
Blockly.Msg['SPEAKER_GET_VOLUME_TOOLTIP'] = "Returnerar aktuell volym.";
Blockly.Msg['SPEAKER_SET_TEMPO_TITLE'] = "sätt tempot till %1";
Blockly.Msg['SPEAKER_SET_TEMPO_TOOLTIP'] = "Ställer in tempot för ljuden.";
Blockly.Msg['SPEAKER_GET_TEMPO_TITLE'] = "hämta tempot";
Blockly.Msg['SPEAKER_GET_TEMPO_TOOLTIP'] = "Returnerar aktuellt tempo.";
Blockly.Msg['SPEAKER_PLAY_TONE_DURATION'] = "i";
Blockly.Msg['SPEAKER_PLAY_NOTE_DURATION'] = Blockly.Msg['SPEAKER_PLAY_TONE_DURATION'];
Blockly.Msg['ROBOTS_STOP_TITLE'] = '[Rocky] stoppa motorerna';
Blockly.Msg['ROBOTS_STOP_TOOLTIP'] = 'Stoppar alla motorer på Rocky-roboten.';
Blockly.Msg['ROBOTS_MOVE_TITLE'] = '[Rocky] %1 med hastighet %2';
Blockly.Msg['ROBOTS_MOVE_TOOLTIP'] = 'Flyttar Rocky-roboten i den angivna riktningen med angiven hastighet (+/- 100).';
Blockly.Msg['ROBOTS_FORWARD'] = 'framåt';
Blockly.Msg['ROBOTS_BACKWARD'] = 'bakåt';
Blockly.Msg['ROBOTS_LEFT'] = 'sväng åt vänster';
Blockly.Msg['ROBOTS_RIGHT'] = 'sväng åt höger';
Blockly.Msg['ROBOTS_DRIVE_TITLE'] = '[Rocky] vänster motorhastighet %1 höger motorhastighet %2';
Blockly.Msg['ROBOTS_DRIVE_TOOLTIP'] = 'Ställer in hastigheten för Rocky-robotens vänstra och högra motorer (+/- 100).';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TITLE'] = '[Rocky] %1 med %2 °';
Blockly.Msg['ROBOTS_TURN_BY_DEGREE_TOOLTIP'] = 'Vänder Rocky-roboten ett visst antal grader (+/- 360).';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TITLE'] = '[Rocky] färgvärde för %1';
Blockly.Msg['ROBOTS_SENSORS_RED'] = 'röd';
Blockly.Msg['ROBOTS_SENSORS_GREEN'] = 'grön';
Blockly.Msg['ROBOTS_SENSORS_BLUE'] = 'blå';
Blockly.Msg['ROBOTS_SENSORS_GET_RGB_TOOLTIP'] = 'Returnerar IR-färgsensorns värde för vald färg (röd, grön, blå).';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TITLE'] = '[Rocky] är färgen %1?';
Blockly.Msg['ROBOTS_SENSORS_IS_COLOR_TOOLTIP'] = 'Returnerar true om IR-färgsensorn upptäcker den angivna färgen (röd, grön, blå, gul, cyan, magenta, vit, svart).';
Blockly.Msg['ROBOTS_SENSORS_YELLOW'] = 'gul';
Blockly.Msg['ROBOTS_SENSORS_CYAN'] = 'cyan';
Blockly.Msg['ROBOTS_SENSORS_MAGENTA'] = 'magenta';
Blockly.Msg['ROBOTS_SENSORS_WHITE'] = 'vit';
Blockly.Msg['ROBOTS_SENSORS_BLACK'] = 'svart';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TITLE'] = '[Rocky] ljusnivå för %1';
Blockly.Msg['ROBOTS_SENSORS_AMBIENT'] = 'omgivande ljus';
Blockly.Msg['ROBOTS_SENSORS_REFLECTED'] = 'reflekterat ljus';
Blockly.Msg['ROBOTS_SENSORS_GREYNESS'] = 'gråhet';
Blockly.Msg['ROBOTS_SENSORS_GET_LIGHT_TOOLTIP'] = 'Returnerar IR-ljussensorns värde för vald typ (omgivande ljus, reflekterat ljus, gråhet).';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TITLE'] = '[Rocky] hinder framför?';
Blockly.Msg['ROBOTS_SENSORS_IS_OBSTACLE_AHEAD_TOOLTIP'] = 'Returnerar true om ett hinder upptäcks framför Rocky-roboten.';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TITLE'] = '[Rocky] LED-färg %1';
Blockly.Msg['ROBOTS_SENSORS_SET_LED_COLOR_TOOLTIP'] = 'Ställer in LED-färgen på Rocky-roboten (röd, grön, blå, gul, cyan, magenta, vit, svart).';
