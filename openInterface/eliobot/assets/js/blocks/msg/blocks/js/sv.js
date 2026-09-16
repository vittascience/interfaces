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

Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TITLE"] = "ändra färg på den inbyggda LED-lampan %1";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP"] = "Gör att du kan tända den inbyggda RGB-LED-lampan på Eliobot-roboten.";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE"] = "släck den inbyggda LED-lampan";
Blockly.Msg["DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP"] = "Gör att du kan släcka den inbyggda RGB-LED-lampan på Eliobot-roboten.";
Blockly.Msg['DISPLAY_EYES_COLOR_TITLE'] = 'ändra färgen på %1 till %2';
Blockly.Msg['DISPLAY_EYES_COLOR_TOOLTIP'] = 'Gör att du kan ändra ögonens färg på Eliobot-roboten.';
Blockly.Msg['DISPLAY_EYES_COLOR_LEFT'] = 'på vänster öga';
Blockly.Msg['DISPLAY_EYES_COLOR_RIGHT'] = 'på höger öga';
Blockly.Msg['DISPLAY_EYES_COLOR_BOTH'] = 'på båda ögonen';
Blockly.Msg['DISPLAY_EYES_EMOTION_TITLE'] = 'visa uttryck %1 i %2';
Blockly.Msg['DISPLAY_EYES_EMOTION_TOOLTIP'] = 'Gör att du kan visa ett fördefinierat uttryck i Eliobot-robotens ögon.';
Blockly.Msg['DISPLAY_EYES_EMOTION_TIRED'] = 'trött';
Blockly.Msg['DISPLAY_EYES_EMOTION_HAPPY'] = 'glad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SAD'] = 'ledsen';
Blockly.Msg['DISPLAY_EYES_EMOTION_ANGRY'] = 'arg';
Blockly.Msg['DISPLAY_EYES_EMOTION_CONFUSED'] = 'förvirrad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SURPRISED'] = 'överraskad';
Blockly.Msg['DISPLAY_EYES_EMOTION_SLEEPY'] = 'sömnig';
Blockly.Msg['DISPLAY_EYES_EMOTION_NEUTRAL'] = 'neutral';
Blockly.Msg['DISPLAY_EYES_EMOTION_THRILLED'] = 'upprymd';
Blockly.Msg['DISPLAY_EYES_EMOTION_DIZZY'] = 'yr';
Blockly.Msg['DISPLAY_EYES_EMOTION_MUSIC'] = 'musik';
Blockly.Msg['DISPLAY_EYES_EMOTION_LOVE'] = 'kärlek';
Blockly.Msg['DISPLAY_EYES_EMOTION_KO'] = 'KO';
Blockly.Msg['DISPLAY_EYES_EMOTION_AMAZED'] = 'häpen';
Blockly.Msg['DISPLAY_EYES_EMOTION_LEFT_ARROW'] = 'vänsterpil';
Blockly.Msg['DISPLAY_EYES_EMOTION_RIGHT_ARROW'] = 'högerpil';
Blockly.Msg['DISPLAY_EYES_EMOTION_DOWN_ARROW'] = 'Blockly.Msg[\'DISPLAY_EYES_EMOTION_DOWN_ARROW\'] = \'nedåtpil\';';
Blockly.Msg['DISPLAY_EYES_EMOTION_UP_ARROW'] = 'Blockly.Msg[\'DISPLAY_EYES_EMOTION_UP_ARROW\'] = \'uppåtpil\';';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TITLE'] = 'visa på ögonmatrisen';
Blockly.Msg['DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP'] = 'Gör att du kan visa en egen bild på Eliobot-robotens ögon.';
Blockly.Msg['DISPLAY_RIGHT_EYE'] = 'höger öga';
Blockly.Msg['DISPLAY_LEFT_EYE'] = 'vänster öga';
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppar programkörningen (tidsangivelse i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stoppar programkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "Initiera tidtagaren";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Gör att du kan initiera tidtagaren (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "hämta tidtagare i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Blockly.Msg[\"IO_GETCHRONOMETER_TOOLTIP\"] = \"Returnerar tidtagarens värde från initieringen i sekunder eller millisekunder.\";";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "skriv till seriell port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Skriv en sträng till den seriella porten.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "med";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "ny rad(er)";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "skriv graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block gör det möjligt att skriva (digitala) data som syns i plottern. Det kan användas med ett eller flera block i formatet \"Name\" och \"Data\". Klicka på ikonen 'Graphic mode' för att visa grafer.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block används i blocket \"Skriv i graf\". Det måste innehålla namnet på det (text-)värde som ska visas och värdet i fråga.";
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TITLE'] = 'läs signal från sensor %1';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_TOOLTIP'] = 'Läser kommandot som skickats från Eliobots IR-fjärrkontroll. Blocket returnerar en sträng som motsvarar mottaget kommando (framåt, bakåt, vänster, höger, mitten).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_FORWARD'] = 'framåt';
Blockly.Msg['COMMUNICATION_IR_REMOTE_READ_BACKWARD'] = 'bakåt';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TITLE'] = 'om kommandot %1 tas emot av IR-fjärrkontrollen då';
Blockly.Msg['COMMUNICATION_IR_REMOTE_TOOLTIP'] = 'Läser kommandot som skickas från Eliobots IR-fjärrkontroll. Blocket returnerar en sträng som motsvarar mottaget kommando (framåt, bakåt, vänster, höger, mitten).';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE'] = 'kommandot %1 tas emot av IR-fjärrkontrollen';
Blockly.Msg['COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP'] = 'Kontrollerar om ett specifikt kommando från Eliobots IR-fjärrkontroll har mottagits. Blocket returnerar en boolean: true om det angivna kommandot mottogs, annars false.';
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
Blockly.Msg["SENSORS_READ_OBSTACLE_TITLE"] = "det finns ett hinder %1";
Blockly.Msg["SENSORS_READ_OBSTACLE_TOOLTIP"] = "Gör det möjligt att upptäcka om ett hinder finns.";
Blockly.Msg["SENSORS_READ_OBSTACLE_FORWARD"] = "framför";
Blockly.Msg["SENSORS_READ_OBSTACLE_BACKWARD"] = "bakom";
Blockly.Msg["SENSORS_READ_OBSTACLE_RIGHT"] = "till höger";
Blockly.Msg["SENSORS_READ_OBSTACLE_LEFT"] = "till vänster";
Blockly.Msg['SENSORS_LINE_FOLLOW_TITLE'] = 'följ linjen';
Blockly.Msg['SENSORS_LINE_FOLLOW_TOOLTIP'] = 'Gör att Eliobot kan följa en linje.';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TITLE'] = 'linjeföljningskänslighet %1';
Blockly.Msg['SENSORS_LINE_SET_SENSITIVITY_TOOLTIP'] = 'Gör det möjligt att ändra känsligheten hos Eliobots sensorer.';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TITLE'] = 'status för linjesensor %1';
Blockly.Msg['SENSORS_LINE_IS_PRESENT_TOOLTIP'] = 'Returnerar status för en av linjesensorerna.';
Blockly.Msg['SENSORS_LINE_LEFT'] = "vänster";
Blockly.Msg['SENSORS_LINE_MIDDLE_LEFT'] = "mitten-vänster";
Blockly.Msg['SENSORS_LINE_MIDDLE'] = "mitten";
Blockly.Msg['SENSORS_LINE_MIDDLE_RIGHT'] = "mitten-höger";
Blockly.Msg['SENSORS_LINE_RIGHT'] = "höger";
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TITLE'] = 'värde för linjesensor %1';
Blockly.Msg['SENSORS_LINE_SENSOR_VALUE_TOOLTIP'] = 'Returnerar värdet från en av Eliobots linjesensorer.';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION'] = 'automatisk kalibrering av linjesensorerna';
Blockly.Msg['SENSORS_AUTO_LINE_CALIBRATION_TOOLTIP'] = 'Kalibrerar automatiskt Eliobots linjesensorer. Roboten måste stå först på en ljus yta och sedan på en mörk yta för att kalibreringen ska bli korrekt.';
Blockly.Msg["ROBOT_MOVE_TITLE"] = "Blockly.Msg[\"ROBOT_MOVE_TITLE\"] = \"flytta %1\";";
Blockly.Msg["ROBOT_MOVE_TOOLTIP"] = "Gör det möjligt att styra Eliobots motorer för att köra framåt eller bakåt.";
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
Blockly.Msg['ROBOT_ROTATE_DEGREES_TITLE'] = 'Blockly.Msg[\'ROBOT_ROTATE_DEGREES_TITLE\'] = \'rotera %1 av %2°\';';
Blockly.Msg['ROBOT_ROTATE_DEGREES_TOOLTIP'] = 'Roterar Eliobot åt vänster eller höger med önskad vinkel.';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TITLE'] = 'Blockly.Msg[\'ROBOT_SPIN_ONE_WHEEL_TITLE\'] = \'vrid hjul %1 i riktning %2\';';
Blockly.Msg['ROBOT_SPIN_ONE_WHEEL_TOOLTIP'] = 'Vrid ett av Eliobots hjul i önskad riktning.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = 'flytta %1 med %2 steg';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Gör det möjligt för Eliobot att förflytta sig stegvis.';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TITLE'] = '%1 med %2 steg';
Blockly.Msg['ROBOT_MOVE_ONE_STEP_TOOLTIP'] = 'Gör det möjligt för Eliobot att förflytta sig stegvis.';
Blockly.Msg['ROBOT_TURN_90_TITLE']= 'sväng %1';
Blockly.Msg['ROBOT_TURN_90_TOOLTIP'] = 'Gör att Eliobot kan svänga 90° åt vänster eller höger.';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TITLE'] = 'kvadratstorlek %1 cm';
Blockly.Msg['ROBOT_SET_SQUARE_SIZE_TOOLTIP'] = 'Ställer in kvadratens storlek för Eliobots stegvisa förflyttningar.';
Blockly.Msg['ROBOT_TURN_RIGHT'] = 'höger';
Blockly.Msg['ROBOT_TURN_LEFT'] = 'vänster';
Blockly.Msg['ROBOT_WAITING_TITLE'] = 'vänta %1 %2 innan motorerna stoppas';
Blockly.Msg['ROBOT_WAITING_TOOLTIP'] = 'Gör att Eliobot kan vänta en viss tid innan motorerna stoppas.';
Blockly.Msg['ROBOT_UNIT_SECONDS'] = 'sekund(er)';
Blockly.Msg['ROBOT_UNIT_MILLISECONDS'] = 'millisekund(er)';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TITLE'] = 'spela ton %1 i %2 %3';
Blockly.Msg['ACTUATORS_PLAY_NOTE_TOOLTIP'] = 'Detta block låter dig spela en ton. Tonen anges med namn (C, D, E, F, G, A, B) och hur länge den ska spelas.';
Blockly.Msg['ACTUATORS_FREQUENCY_TITLE'] = 'spela frekvens %1 (Hz) i %2 %3';
Blockly.Msg['ACTUATORS_FREQUENCY_TOOLTIP'] = 'Detta block låter dig spela en frekvens. Frekvensen anges i Hertz (Hz) och hur länge den ska spelas.';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TITLE'] = 'spela musik %1';
Blockly.Msg['ACTUATORS_PLAY_MUSIC_TOOLTIP'] = 'Detta block låter dig spela förinställd musik. Flera färdiga låtar finns tillgängliga.';
Blockly.Msg['ACTUATORS_SET_VOLUME_TITLE'] = 'sätt volymen till %1 %';
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Detta block justerar volymen. Volymnivån anges i procent.'
Blockly.Msg['ACTUATORS_SET_VOLUME_TOOLTIP'] = 'Detta block låter dig ställa in Eliobots volym. Volymen anges i procent.';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TITLE'] = 'spela ljud %1';
Blockly.Msg['ACTUATORS_PLAY_SOUND_TOOLTIP'] = 'Detta block låter dig spela ett förinställt ljud. Flera färdiga ljud finns tillgängliga.';
Blockly.Msg['ACTUATORS_SOUND_JUMP'] = 'hoppa';
Blockly.Msg['ACTUATORS_SOUND_LASER'] = 'laser';
Blockly.Msg['ACTUATORS_SOUND_QUESTION'] = 'fråga';
Blockly.Msg['ACTUATORS_SOUND_ERROR'] = 'fel';
Blockly.Msg['ACTUATORS_SOUND_EXPLOSION'] = 'explosion';
Blockly.Msg['ACTUATORS_SOUND_LAND'] = 'landning';
Blockly.Msg['ACTUATORS_SOUND_HAPPY'] = 'glad';
Blockly.Msg['ACTUATORS_SOUND_WIN'] = 'vinst';
Blockly.Msg['ACTUATORS_SOUND_ALERT'] = 'varning';
Blockly.Msg['ACTUATORS_SOUND_HELLO'] = 'hej';
Blockly.Msg['ACTUATORS_SOUND_STARTUP'] = 'uppstart';
Blockly.Msg['ACTUATORS_SOUND_BUMP'] = 'stöt';
Blockly.Msg['ACTUATORS_SOUND_BLINK'] = 'blinka';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TITLE'] = '[OLED Screen] visa text %1 på rad %2';
Blockly.Msg['BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP'] = 'Visar text på SSD1306 OLED-skärmen.';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TITLE'] = '[OLED Screen] rensa skärmen';
Blockly.Msg['BACKPACK_DISPLAY_OLED_CLEAR_TOOLTIP'] = 'Rensar texten på SSD1306 OLED-skärmen.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE'] = '[5x5 RGB Matrix] visa bild';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP'] = 'Visar en teckning på 5x5 RGB LED-matrisen.';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE'] = '[5x5 RGB Matrix] rensa matrisen';
Blockly.Msg['BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP'] = 'Rensar 5x5 RGB LED-matrisen.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE'] = '[5x5 RGB Matrix] visa %1 i %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP'] = 'Visar en ikon i vald färg.';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE'] = '[5x5 RGB Matrix] rulla text %1 i %2';
Blockly.Msg['BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP'] = 'Rullar en textsträng i vald färg över 5x5 LED-matrisen.';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TITLE'] = '[DHT11] %1';
Blockly.Msg['BACKPACK_DHT11_SENSOR_TOOLTIP'] = 'Returnerar temperaturen i grader Celsius (°C) eller luftfuktigheten (i %) från DHT11-sensorn.';
Blockly.Msg['SENSOR_TEMPERATURE'] = 'temperatur';
Blockly.Msg['SENSOR_HUMIDITY'] = 'fuktighet';
Blockly.Msg['SENSOR_PRESSURE'] = 'tryck';
Blockly.Msg['SENSOR_ALTITUDE'] = 'höjd';
Blockly.Msg['BACKPACK_BME280_SENSOR_TITLE'] = '[BME280] %1';
Blockly.Msg['BACKPACK_BME280_SENSOR_TOOLTIP'] = 'Returnerar omgivningstemperatur i grader Celsius (°C) från -40 till 85 °C, i Fahrenheit (°F) eller Kelvin (K), samt fuktighet (i %), tryck (i Pascal) eller höjd (i m) från BME280-sensorn.';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE'] = 'Blockly.Msg[\'BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE\'] = \'[BME280] sätt havsnivåtrycket till %1\';';
Blockly.Msg['BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP'] = 'Sätter havsnivåtrycket för BME280-sensorn, som används vid beräkning av höjd.';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE'] = '[HC-SR04] avstånd';
Blockly.Msg['BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP'] = 'Returnerar avståndet i cm med HC-SR04 ultraljudssensor.';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TITLE'] = 'Blockly.Msg[\'BACKPACK_SENSORS_GETLIGHT_TITLE\'] = \'[Ljussensor] ljusstyrka på stift %1\';';
Blockly.Msg['BACKPACK_SENSORS_GETLIGHT_TOOLTIP'] = 'Returnerar ljusnivån från sensorn på valt stift.';
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TITLE"] = "[Button] %1 tryckt på %2";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_TOOLTIP"] = "Returnerar True om knappen är nedtryckt, annars False.";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_PRESSED"] = "är";
Blockly.Msg["BACKPACK_IO_BUTTON_STATE_NOT_PRESSED"] = "är inte";
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TITLE'] = '[Potentiometer] värde %1';
Blockly.Msg['BACKPACK_IO_KNOB_VALUE_TOOLTIP'] = 'Returnerar värdet från potentiometern ansluten till IO2 eller IO15';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE'] = 'Blockly.Msg[\'BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE\'] = \'[Servomotor] ställ in vinkel till %1° på stift %2\';';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP'] = 'Styr vinkeln (0–180°) på en servomotor via PWM-stiften.';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE'] = 'Blockly.Msg[\'BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE\'] = \'[Kontinuerlig servomotor] ställ in hastighet %1 (%) riktning %2 på stift %3\';';
Blockly.Msg['BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP'] = 'Styr hastigheten (0–100%) på en kontinuerlig servomotor via PWM-stiften.';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE'] = 'Blockly.Msg[\'BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE\'] = \'[Summer] spela frekvens %1 med volym %2 på stift %3\';';
Blockly.Msg['BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP'] = 'Spelar en ton med angiven frekvens och volym på valt stift för Grove-buzzern.';
Blockly.Msg['NETWORK_WIFI_CONNECT_TITLE'] = 'Anslut till Wi-Fi-nätverk SSID %1 lösenord %2';
Blockly.Msg['NETWORK_WIFI_CONNECT_TOOLTIP'] = 'Ansluter Eliobot till ett Wi‑Fi-nätverk med angivet namn (SSID) och lösenord.';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TITLE'] = 'Koppla från Wi-Fi';
Blockly.Msg['NETWORK_WIFI_DISCONNECT_TOOLTIP'] = 'Kopplar från det Wi‑Fi-nätverk som Eliobot är ansluten till.';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TITLE'] = 'Öppna en Wi-Fi-åtkomstpunkt SSID %1 lösenord %2';
Blockly.Msg['NETWORK_WIFI_OPEN_ACCESS_POINT_TOOLTIP'] = 'Skapar en Wi‑Fi-åtkomstpunkt från Eliobot med angivet namn och lösenord.';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TITLE'] = 'Ange värdnamn %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_HOST_NAME_TOOLTIP'] = 'Anger Eliobots värdnamn i nätverket. Detta namn kan användas för att nå Eliobot via en webbläsare.';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TITLE'] = 'Ange Wi-Fi antenneffekt %1';
Blockly.Msg['NETWORK_WIFI_DEFINE_ANTENNA_POWER_TOOLTIP'] = 'Ställer in sändningseffekten för Eliobots Wi‑Fi-antenna (i dBm).';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TITLE'] = 'ansluten till Wi-Fi?';
Blockly.Msg['NETWORK_WIFI_IS_CONNECTED_TOOLTIP'] = 'Returnerar true om Eliobot är ansluten till ett Wi‑Fi-nätverk, annars false.';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TITLE'] = 'skanna tillgängliga Wi-Fi-nätverk';
Blockly.Msg['NETWORK_WIFI_SCAN_NETWORKS_TOOLTIP'] = 'Returnerar listan över Wi‑Fi-nätverk som finns runt Eliobot.';
Blockly.Msg['NETWORK_WIFI_GET_IP_TITLE'] = 'Eliobots IP-adress';
Blockly.Msg['NETWORK_WIFI_GET_IP_TOOLTIP'] = 'Returnerar Eliobots IP-adress i Wi‑Fi-nätverket.';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TITLE'] = 'Skapa en webbsida med titel %1 och innehåll';
Blockly.Msg['NETWORK_HTML_CREATE_PAGE_TOOLTIP'] = 'Skapar en webbsida som kan nås via en webbläsare. Lägg till HTML-element i innehållsområdet.';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TITLE'] = 'Lägg till en knapp %1 med åtgärd %2';
Blockly.Msg['NETWORK_HTML_CREATE_BUTTON_TOOLTIP'] = 'Lägger till en knapp på webbsidan. Blocken i "action" körs av Eliobot när knappen trycks.';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TITLE'] = 'Visa värde %1 med namn %2';
Blockly.Msg['NETWORK_HTML_DISPLAY_VALUE_TOOLTIP'] = 'Visar ett värde på webbsidan och uppdaterar det automatiskt varje sekund.';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TITLE'] = 'Tagg %1';
Blockly.Msg['NETWORK_HTML_CREATE_TAG_TOOLTIP'] = 'Skapar ett HTML-element (div eller center) för att organisera innehållet på webbsidan.';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TITLE'] = 'Rubrik %1 %2';
Blockly.Msg['NETWORK_HTML_CREATE_TITLE_TAG_TOOLTIP'] = 'Lägger till en HTML-rubrik (h1–h6) på din webbsida. h1 är störst, h6 minst.';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TITLE'] = 'Stycke %1';
Blockly.Msg['NETWORK_HTML_CREATE_PARAGRAPH_TOOLTIP'] = 'Lägger till ett stycke text på din webbsida.';
Blockly.Msg['DISPLAY_EYES_MATRIX_TITLE'] = "Visa på ögonmatrisen (palett)";
Blockly.Msg['DISPLAY_EYES_MATRIX_TOOLTIP'] = 'Visar en egen bild på Eliobots ögon. Varje pixel i matrisen kan tilldelas en egen färg.';
