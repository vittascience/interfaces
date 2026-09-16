/**
 * @fileoverview English messages for Eliobot. (EN)
 */

'use strict';

// Display

// Display - Eyes

// Input/Output

// Communication - Serial connection
// Communication - IR remote

// Sensors
// Actuators
// Backpack - Display
// Backpack - Sensors
// Backpack - IO - Buttons
// Backpack - IO - Potentiometer
// Backpack - Actuators - Motors
// Backpack - Actuators - Buzzer

// Network - Wifi
// Network - HTML

Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TITLE"] = "ändra färg på den inbyggda LED:n %1";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP"] = "Gör det möjligt att tända den inbyggda RGB-LED:n på Eliobot-roboten.";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE"] = "släck den inbyggda LED:n";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP"] = "Gör det möjligt att släcka den inbyggda RGB-LED:n på Eliobot-roboten.";
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'ändra färg %1 till %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Gör det möjligt att ändra ögonfärgen på Eliobot-roboten.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'det vänstra ögat';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'det högra ögat';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'båda ögonen';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'visa uttrycket %1 på %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Gör det möjligt att visa ett förinställt uttryck i Eliobots ögon.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'trött';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'glad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'ledsen';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'arg';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'förvirrad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'överraskad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'sömnig';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutral';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'exalterad';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'yr';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'musik';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'kärlek';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'häpen';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'pil åt vänster';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'pil åt höger';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'pil nedåt';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'pil uppåt';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'visa på ögonmatrisen';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Gör det möjligt att visa en egen bild i Eliobots ögon.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'höger öga';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'vänster öga';
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppar kodkörningen (varaktighet i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stoppar kodkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "Initiera tidtagaren";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Gör det möjligt att initiera tidtagaren (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "läs tidtagaren i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returnerar tidtagarvärdet från initieringen i sekunder eller millisekunder.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "skriv på seriell port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Skriv en sträng till seriell port.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "med";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "radbrytning(ar)";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "skriv graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block gör det möjligt att skriva (digitala) data som blir synliga i plottaren. Det kan användas med ett eller flera block i formatet \"Name\" och \"Data\". Klicka på ikonen 'Graphic mode' för att visa grafer.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block ska användas i blocket \"Write in graphic\". Det måste innehålla namnet på (text-)värdet som ska visas och själva värdet.";
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'läs signal från sensor %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Läser kommandot som skickats med Eliobots IR-fjärrkontroll. Detta block returnerar en sträng som motsvarar det mottagna kommandot (framåt, bakåt, vänster, höger, mitten).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'framåt';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'bakåt';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'om kommandot %1 tas emot av IR-fjärrkontrollen då';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Läser kommandot som skickats med Eliobots IR-fjärrkontroll. Detta block returnerar en sträng som motsvarar det mottagna kommandot (framåt, bakåt, vänster, höger, mitten).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'kommandot %1 tas emot av IR-fjärrkontrollen';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Kontrollerar om ett visst kommando från Eliobots IR-fjärrkontroll har mottagits. Detta block returnerar ett booleskt värde: true om det angivna kommandot mottogs, annars false.';
Blockly.Msg['COMMUNICATION_IR_REMOTE_UP'] = 'upp';
Blockly.Msg['COMMUNICATION_IR_REMOTE_DOWN'] = 'ner';
Blockly.Msg['COMMUNICATION_IR_REMOTE_LEFT'] = 'vänster';
Blockly.Msg['COMMUNICATION_IR_REMOTE_RIGHT'] = 'höger';
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
Blockly.Msg["SENSORS_READ_OBSTACLE_TITLE"] = "ett hinder finns %1";
Blockly.Msg["SENSORS_READ_OBSTACLE_TOOLTIP"] = "Gör att du kan upptäcka om det finns ett hinder.";
Blockly.Msg["SENSORS_READ_OBSTACLE_FORWARD"] = "framför";
Blockly.Msg["SENSORS_READ_OBSTACLE_BACKWARD"] = "bakom";
Blockly.Msg["SENSORS_READ_OBSTACLE_RIGHT"] = "till höger";
Blockly.Msg["SENSORS_READ_OBSTACLE_LEFT"] = "till vänster";
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'följ linjen';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Låter Eliobot följa en linje.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'känslighet för linjeföljning %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Låter dig ändra känsligheten hos Eliobots sensorer.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'status för linjeföljningssensor %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Returnerar status för en av linjeföljningssensorerna.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "vänster";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "mitten till vänster";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "mitten";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "mitten till höger";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "höger";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'värde för linjesensor %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Returnerar värdet från en av Eliobots linjeföljningssensorer.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'automatisk kalibrering av linjesensorer';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Låter dig kalibrera linjesensorerna automatiskt. Roboten måste stå på en ljus yta och sedan på en mörk yta för att kalibreringen ska bli korrekt.';
Blockly.Msg["ROBOT_MOVE_TITLE"] = "rör sig %1";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Gör att du kan styra Eliobots motorer för att köra framåt eller bakåt.";
Blockly.Msg["ROBOT_MOVE_FORWARD"] = "framåt";
Blockly.Msg["ROBOT_MOVE_BACKWARD"] = "bakåt";
Blockly.Msg["ROBOT_ROTATE_TITLE"] = "rotera åt %1";
Blockly.Msg["ROBOT_ROTATE_TOOLTIP"] = "Roterar Eliobot åt vänster eller höger.";
Blockly.Msg["ROBOT_ROTATE_RIGHT"] = "höger";
Blockly.Msg["ROBOT_ROTATE_LEFT"] = "vänster";
Blockly.Msg["ROBOT_STOP_TITLE"] = "stoppa roboten";
Blockly.Msg["ROBOT_STOP_TOOLTIP"] = "Stoppar Eliobots motorer.";
Blockly.Msg['ROBOT_SET_SPEED_TITLE'] = 'hastighet %1 %';
Blockly.Msg['ROBOT_SET_SPEED_TOOLTIP'] = 'Ändrar Eliobots hastighet.';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'rotera med %1 av %2°';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Roterar Eliobot åt vänster eller höger med önskad vinkel.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'vrid hjul %1 åt %2';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Vrider ett av Eliobots hjul i önskad riktning.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'rör sig %1 med %2 steg(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Låter Eliobot röra sig framåt i steg.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 med %2 steg(s)';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Låter Eliobot röra sig framåt i steg.';
Blockly.Msg['ROBOT_TURN_90_TITLE']= 'sväng %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Låter Eliobot svänga åt vänster eller höger 90°.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'kvadratstorlek %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Anger storleken på en kvadrat för Eliobots stegbaserade rörelser.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'höger';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'vänster';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'vänta %1 %2 innan motorerna stoppas';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Låter Eliobot vänta en viss tid innan motorerna stoppas.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'sekund(er)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'millisekund(er)';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'spela ton %1 i %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Detta block låter dig spela en ton. Tonen anges med dess namn (C, D, E, F, G, A, B) och hur länge den spelas.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'spela frekvens %1 (Hz) i %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Detta block låter dig spela upp en frekvens. Frekvensen anges i Hertz (Hz) och hur länge den spelas.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'spela musik %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Detta block låter dig spela upp fördefinierad musik. Flera färdiga stycken finns tillgängliga.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'sätt volymen till %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Detta block justerar volymen. Volymnivån anges i procent.'
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Detta block låter dig ställa in volymnivån för Eliobot. Volymen anges i procent.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'spela upp ljud %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Detta block låter dig spela upp ett fördefinierat ljud. Flera förinställda ljud finns.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'hopp';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'fråga';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'fel';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'explosion';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'landning';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'glad';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'seger';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'larm';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'hej';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'uppstart';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'stöt';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'blinkning';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[OLED-skärm] visa text %1 på rad %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Visar text på SSD1306 OLED-skärmen.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[OLED-skärm] rensa skärmen';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Rensar texten på SSD1306 OLED-skärmen.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[5x5 RGB-matris] visa bild';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Visar en bild på 5x5 RGB-LED-matrisen.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[5x5 RGB-matris] rensa matrisen';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Rensar 5x5 RGB-LED-matrisen.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[5x5 RGB-matris] visa %1 i %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Visar en ikon i önskad färg.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[5x5 RGB-matris] rulla text %1 i %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Rullar en textsträng i önskad färg över 5x5 LED-matrisen.';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Returnerar temperaturen i grader Celsius (°C) eller luftfuktigheten (i %) med hjälp av DHT11-sensorn.';
Blockly.Msg['SENSOR_TEMPERATURE'] = 'temperatur';
Blockly.Msg['SENSOR_HUMIDITY'] = 'fuktighet';
Blockly.Msg['SENSOR_PRESSURE'] = 'tryck';
Blockly.Msg['SENSOR_ALTITUDE'] = 'höjd';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Returnerar omgivningstemperatur i grader Celsius (°C) från -40 till 85 °C, Fahrenheit (°F) eller Kelvin (K), fuktighet (i %), tryck (i Pascal) eller höjd (i m) med BME280-sensorn.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = '[BME280] ställ in havsnivåtrycket till %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Ställer in havsnivåtrycket för BME280-sensorn, som används vid beräkning av höjd.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] avstånd';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Returnerar avståndet i cm med HC-SR04 ultraljudssensorn.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = '[Ljussensor] ljusstyrka på stift %1';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Returnerar ljusstyrkan från sensorn på valt stift.';
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TITLE"] = "[Knapp] %1 nedtryckt på %2";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TOOLTIP"] = "Returnerar True om knappen är nedtryckt, annars False.";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_PRESSED"] = "är";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_NOT_PRESSED"] = "är inte";
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potentiometer] värde %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Returnerar potentiometervärdet anslutet på IO2 eller IO15';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = '[Servo-motor] ställ in vinkel till %1° på stift %2';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Styr vinkeln (0–180°) på en servomotor på PWM-stiften.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = '[Kontinuerlig servomotor] ställ in hastighet %1 (%) riktning %2 på stift %3';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Styr hastigheten (0–100%) på en kontinuerlig servomotor på PWM-stiften.';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = '[Buzzer] spela frekvens %1 med volym %2 på stift %3';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Spelar en frekvens på Grove-buzzern med angiven volym på valt stift.';
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Anslut till Wi‑Fi-nätverk SSID %1 lösenord %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Ansluter Eliobot till ett Wi‑Fi-nätverk med angivet namn (SSID) och lösenord.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Koppla från Wi‑Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Kopplar bort Eliobot från det Wi‑Fi-nätverk som den är ansluten till.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Öppna en Wi‑Fi-åtkomstpunkt SSID %1 lösenord %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Skapar en Wi‑Fi-åtkomstpunkt från Eliobot med angivet namn och lösenord.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Ställ in värdnamn %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Ställer in Eliobots värdnamn i nätverket. Det här namnet kan användas för att nå Eliobot från en webbläsare.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Ställ in Wi‑Fi-antennens effekt %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Anger sändningseffekten för Eliobots Wi‑Fi-antenn (i dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'ansluten till Wi‑Fi?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Returnerar true om Eliobot är ansluten till ett Wi‑Fi-nätverk, annars false.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'sök efter tillgängliga Wi‑Fi-nätverk';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Returnerar listan över Wi‑Fi-nätverk som finns i närheten av Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'Eliobots IP-adress';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Returnerar Eliobots IP-adress i Wi‑Fi-nätverket.';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Skapa en webbsida med titel %1 och innehåll';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Skapar en webbsida som går att nå från en webbläsare. Lägg till HTML-element i innehållsområdet.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Lägg till en knapp %1 %2 åtgärd';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Lägger till en knapp på webbsidan. Block inne i "action" körs av Eliobot när knappen trycks.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Visa värde %1 med namn %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Visar ett värde på webbsidan och uppdaterar det automatiskt varje sekund.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Tagg %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Skapar en HTML-tagg (div eller center) för att organisera innehållet på din webbsida.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Rubrik %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Lägger till en HTML-rubrik (h1 till h6) på din webbsida. h1 är störst, h6 är minst.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Stycke %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Lägger till ett stycke text på din webbsida.';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "Visa på ögonmatrisen (färgpalett)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Visar en egen bild på Eliobots ögon. Varje pixel i matrisen kan få en egen färg.'
