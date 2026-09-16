/**
 * @fileoverview English messages for mBot. (EN)
 */

'use strict';
//COMMENT - Arduino
// Display - MeMCore
// Input/Output - MeMCore
// Input/Output - Pins

// Communication - Serial connection

// Robots - mBot basic modules

// Display - LED matrix
// Display - Neopixel
// Display - RGB LED
// Display - 4 Digit

// Robots - Makeblock sensors
// Robots - Makeblock actuators
// Robots - Makeblock input/output

Blockly.Msg['CALL_EXPRESSION_COMMENT_TITLE'] = 'kommentar %1';
Blockly.Msg['CALL_EXPRESSION_COMMENT_TOOLTIP'] = 'Det här blocket låter dig lägga till en kommentar i din kod.';
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TITLE"] = "[MeMCore] sätt inbyggda blå LED till %1";
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TOOLTIP"] = "Slå på eller av den blå lysdioden på MeMCore-kortet.";
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppa kodkörningen (tidsangivelse i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stoppa kodkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initiera kronometern";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Gör det möjligt att initiera kronometern (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "hämta kronometer i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returnerar kronometervärdet från initieringen i sekunder eller millisekunder.";
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HÖG (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LÅG (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returnerar ett booleskt värde (HÖG eller LÅG).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "läs digital pin %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Det här blocket läser en digital ingång och returnerar värdet.";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "skriv på digital pin %1 tillstånd %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Gör det möjligt att skriva ett tillstånd på en digital pin.";
Blockly.Msg["IO_WRITEANALOGPIN_TITLE"] = "skriv på analog pin %1 värde %2";
Blockly.Msg["IO_WRITEANALOGPIN_TOOLTIP"] = "Gör det möjligt att skriva ett värde (0-255) på en analog pin."
Blockly.Msg["IO_READANALOGPIN_TITLE"] = "läs analog pin %1";
Blockly.Msg["IO_READANALOGPIN_TOOLTIP"] = "Gör det möjligt att läsa analogt värde från pinnarna (0-1023).";
Blockly.Msg["IO_SETPWM_TITLE"] = "applicera PWM-signal med arbetscykel %1 (%) på pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Applicera en PWM-signal på PWM-pinnen (~) med inställd arbetscykel (i %). För pinnarna D3, D9, D10 och D11 är signalfrekvensen 490 Hz (period 2.04 ms). För pinnarna D5 och D6 är den 980 Hz (period 1.02 ms).";
Blockly.Msg["IO_READPULSEIN_TITLE"] = "läs pulslängd av tillstånd %1 på pin %2";
Blockly.Msg["IO_READPULSEIN_TOOLTIP"] = "Returnerar pulslängden (i μs). Välj vilket tillstånd som ska mätas (HÖG eller LÅG). Fungerar för pulser från 10 μs upp till 3 minuter.";
Blockly.Msg["IO_ATTACH_INTERRUPT_TITLE"] = "när %1 upptäcks på pin %2 då";
Blockly.Msg["IO_ATTACH_INTERRUPT_TOOLTIP"] = "Gör det möjligt att sätta upp en händelse på pinnarna 2 eller 3. Detta block kör instruktioner så fort en stigande, fallande flank eller båda upptäcks på pinne 2 eller 3.";
Blockly.Msg["IO_RISING_EDGE"] = "stigande flank";
Blockly.Msg["IO_FALLING_EDGE"] = "fallande flank";
Blockly.Msg["IO_BOTH_EDGE"] = "ändring";
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TITLE'] = 'initiera seriell kommunikation vid %1 baud';
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TOOLTIP'] = 'Detta block initierar seriell kommunikation med angiven baudhastighet. Det måste användas i setup-blocket.';
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "skriv på seriell port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Detta block används för att skriva data av valfri typ till seriell port. De visas i konsolen när programmet körs.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "med";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "radbrytning(ar)";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TITLE'] = 'skriv talet %1 till konsolen i %2-format';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TOOLTIP'] = 'Gör det möjligt att visa ett tal i konsolen i valt format (HEX: hexadecimal, DEC: decimal).';
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE"] = "när seriell data tas emot i %1 då";
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP"] = "Gör det möjligt att köra instruktioner om data tas emot via seriell port i variabeln 'serialData'.";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "visa i graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block gör det möjligt att skriva (digitala) data som blir synliga i plottern. Det kan användas med ett eller flera block i formatet \"Name\" och \"Data\".";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block ska användas i blocket \"Skriv i graf\". Det måste innehålla namnet på det textvärde som ska visas och det värde som ska visas.";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TITLE"] = "spela musik %1 via seriell port";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP"] = "Spela vald ton tills blocket \"Stoppa musik\" körs.";
Blockly.Msg["NOTE_C"] = "C";
Blockly.Msg["NOTE_C_SHARP"] = "C#";
Blockly.Msg["NOTE_D"] = "D";
Blockly.Msg["NOTE_D_SHARP"] = "D#";
Blockly.Msg["NOTE_E"] = "E";
Blockly.Msg["NOTE_F"] = "F";
Blockly.Msg["NOTE_F_SHARP"] = "F#";
Blockly.Msg["NOTE_G"] = "G";
Blockly.Msg["NOTE_G_SHARP"] = "G#";
Blockly.Msg["NOTE_A"] = "A";
Blockly.Msg["NOTE_A_SHARP"] = "A#";
Blockly.Msg["NOTE_B"] = "B";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE"] = "spela frekvens %1 (Hz) på datorn";
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP"] = "Detta block låter dig spela en given frekvens på datorn";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TITLE"] = "stoppa musiken på seriell port";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP"] = "Stoppa den aktuella tonen på seriell port.";
Blockly.Msg["ROBOTS_MBOT_GO_TITLE"] = "[Motorer] %1 med hastighet %2 (%)";
Blockly.Msg["ROBOTS_MBOT_GO_FORWARD"] = "framåt";
Blockly.Msg["ROBOTS_MBOT_GO_REVERSE"] = "bakåt";
Blockly.Msg["ROBOTS_MBOT_GO_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra körningen (FRAMÅT/BAKTÅT) och motornas hastighet (0 till 100 %) hos mBot-roboten.";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TITLE"] = "[Motorer] styr motor %1 riktning %2 hastighet %3 (%)";
Blockly.Msg["ROBOTS_MBOT_RIGHT"] = "höger";
Blockly.Msg["ROBOTS_MBOT_LEFT"] = "vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT"] = "höger & vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT_F"] = "höger";
Blockly.Msg["ROBOTS_MBOT_LEFT_F"] = "vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT_F"] = "höger & vänster";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra höger motor (9) och vänster motor (10) genom att ändra riktning (↻ : FRAMÅT, ↺ : BAKÅT) eller hastighet (0–100 %) för mBot-roboten.";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TITLE"] = "[Motorer] stoppa motor %1";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att stoppa höger, vänster eller båda motorerna på mBot-roboten.";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_SETRGBLED_TITLE\"] = \"[Kort] ställ färg R %1 G %2 B %3 på LED %4\";";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra RGB-LED-färgen på mBot-kortet som (R,G,B)-värden från 0 till 255.";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_SETPALETTERGBLED_TITLE\"] = \"[Kort] ställ färg %1 på LED %2\";";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att välja RGB-färg för LED på mBot-kortet från en palett.";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_SETBUZZER_TITLE\"] = \"[Kort] ställ in summern på frekvens %1 under %2 (ms)\";";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra mBot:s summer vid valfri frekvens under valfri tid (millisekunder)";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_PLAYMUSIC_TITLE\"] = \"[Kort] spela musik %1\";";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att spela musik på mBot:s summer.";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_GETLIGHT_TITLE\"] = \"[Kort] ljusnivå\";";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returnerar ljusnivån från mBot-kortets sensor.";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_GETBUTTONSTATE_TITLE\"] = \"[Kort] är knappen nedtryckt ?\";";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returnerar knappens tillstånd på mBot-kortet.";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_SENDIRMESSAGE_TITLE\"] = \"[Kort] skicka meddelande %1 via IR\";";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Skickar meddelande via IR från roboten.";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE"] = "[Remote control] button %1 is pressed";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_REMOTE_CONTROL + Blockly.Tooltip.SEP + "Returnerar sant eller falskt om någon knapp på mBot-fjärrkontrollen är nedtryckt.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE"] = "[LED Matrix] show text %1 at position x %2 y %3 on port %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Låter dig rita text på Makeblocks 16x8 LED-matris. Positionen har räckvidden x (0-15) och y (0-7). Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE"] = "[LED Matrix] show number %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Låter dig visa ett nummer på Makeblocks 16x8 LED-matris. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE"] = "[LED Matrix] show clock %1 : %2 on port %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Låter dig visa en klocka på Makeblocks 16x8 LED-matris. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE"] = "[LED Matrix] show draw %1 at position x %2 y %3 on port %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Låter dig visa en teckning på Makeblocks 16x8 LED-matris. Positionen har räckvidden x (0-15) och y (0-7). Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE"] = "[Neopixel] define %1 LED on port %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ange antal LED på Makeblocks neopixel. Detta block måste användas i setup. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE"] = "[Neopixel] set LED %1 to R %2 G %3 B %4 on port %5 slot %6";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa in LED-färg som (R,G,B) 0–255 på Makeblocks neopixel. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE"] = "[Neopixel] set LED %1 to %2 on port %3 slot %4";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att välja LED-färg från paletten på Makeblocks neopixel. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[Neopixel] set all LED to colour R %1 G %2 B %3 on port %4 slot %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa alla LED på Makeblocks neopixelmodul till vald färg som (R,G,B) 0–255. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[Neopixel] set all LED to colour %1 on port %2 slot %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa alla LED på Makeblocks neopixelmodul till vald färg. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE"] = "[Neopixel] set a rainbow on port %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att visa en regnbåge på Makeblocks neopixelmodul; ange pin och antal LED. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TITLE"] = "[RGB LED] set color R %1 G %2 B %3 on LED %4 on port %5";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Låter dig ställa RGB-LED på Makeblock till färg (R,G,B) 0–255. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ALL_LED"] = "alla";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE"] = "[RGB LED] set color %1 on LED %2 on port %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Låter dig välja RGB-LED-färg från paletten på Makeblock. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE"] = "[7-segment Display] show %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_7SEGMENT_DISPLAY + Blockly.Tooltip.SEP + "Låter dig visa ett nummer på Makeblocks 7-segmentsdisplay. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE"] = "[Ultrasonic Sensor] distance in %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_ULTRASONIC + Blockly.Tooltip.SEP + "Returnerar avståndsmätning (i centimeter) från Makeblocks ultraljudssensor. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE"] = "[Line Follower] sensor %1 inside of black line on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LINEFINDER + Blockly.Tooltip.SEP + "Returnerar tillståndet för linjeföljarmodulen (0 eller 1) från sensor1 (vänster) eller sensor2 (höger). Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_LEFT_1"] = "vänster";
Blockly.Msg["ROBOTS_MAKEBLOCK_RIGHT_2"] = "höger";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE"] = "[PIR Motion Sensor] state on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_PIR_MOTION + Blockly.Tooltip.SEP + "Returnerar tillstånd (1 om rörelse upptäckt, annars 0) från Makeblocks PIR-rörelsesensor. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE"] = "[DS18B20 Sensor] temperature on port %1 slot %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_WATERPROOF_TEMPERATURE + Blockly.Tooltip.SEP + "Låter dig avläsa temperaturen med Makeblocks vattentäta DS18B20-sensor. Välj plats (1 eller 2) på RJ45-adaptern. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TITLE"] = "[Light Sensor] light level on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LIGHT + Blockly.Tooltip.SEP + "Låter dig läsa ljusnivån med Makeblocks ljussensor. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TITLE"] = "[Color Sensor] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COLOR + Blockly.Tooltip.SEP + "Låter dig läsa nivån av en av de tre primärfärgerna med Makeblocks färgsensor. Den returnerar också den uppmätta färgen som 0 (White), 1 (Pinke), 2 (Red), 3 (Orange), 4 (Yellow), 5 (Green), 5 (Cyan), 6 (Blue), 7 (Purple), 8 (Black), 9 (Gold). Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COLOR"] = "färg";
Blockly.Msg["ROBOTS_MAKEBLOCK_RED"] = "nivå av rött";
Blockly.Msg["ROBOTS_MAKEBLOCK_GREEN"] = "nivå av grönt";
Blockly.Msg["ROBOTS_MAKEBLOCK_BLUE"] = "nivå av blått";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TITLE"] = "[Sound Sensor] sound level on port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SOUND + Blockly.Tooltip.SEP + "Låter dig avläsa ljudnivån med Makeblocks ljudsensor. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TITLE"] = "[Gas MQ2 Sensor] %1 on port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_GAS + Blockly.Tooltip.SEP + "Låter dig mäta mängden gas med Makeblocks MQ2-gassensor. Det går att få ett digitalt tillstånd 0 (no gas) eller 1 (gas). Använd potentiometern på modulen för att ställa lämplig tröskel. Anslut sensorn till RJ45-port 1 eller 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_DIGITAL"] = "tillstånd";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_ANALOG"] = "värde";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TITLE"] = "[Flamsensor] %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_FLAME + Blockly.Tooltip.SEP + "Gör att du kan läsa om Makeblock-flamsensorn upptäcker en flamma. Ger ett tillståndsvärde: 0 (ingen flamma) eller 1 (flamma). Använd potentiometern på modulen för att ställa lämplig tröskel. Sensorn upptäcker infrarött ljus med våglängd från 700 nm till 1200 nm. Anslut sensorn till RJ45-port 1 eller 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_DIGITAL"] = "tillstånd";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_ANALOG"] = "värde";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TITLE"] = "[Kompass] %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COMPASS + Blockly.Tooltip.SEP + "Låter dig läsa kompassdata från Makeblock. Anslut sensorn till RJ45-port 1 eller 4 på mBot-roboten.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_X"] = "X-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Y"] = "Y-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Z"] = "Z-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_ANGLE"] = "vinkel (°)";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TITLE"] = "[Servomotor] ställ in vinkel till %1 på pin %2 plats %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra servons vinkel (0 till 180) ansluten till en RJ45-adapter från Makeblock. Välj plats (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TITLE"] = "[Mini-fläkt] ställ in riktning till %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MINI_FAN + Blockly.Tooltip.SEP + "Gör det möjligt att styra Makeblocks mini-fläkt.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CLOCKWISE"] = "medurs";
Blockly.Msg["ROBOTS_MAKEBLOCK_ANTICLOCKWISE"] = "moturs";
Blockly.Msg["ROBOTS_MAKEBLOCK_STOP"] = "stopp";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TITLE"] = "[Ändlägesbrytare] tillstånd på port %1 plats %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SWITCH + Blockly.Tooltip.SEP + "Låter dig läsa tillståndet för Makeblock-brytarmodulen. Välj plats (1 eller 2) på RJ45-adaptern. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TITLE"] = "[Joystick] värde för axel %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_JOYSTICK + Blockly.Tooltip.SEP + "Låter dig läsa axelvärdet (X eller Y) från Makeblocks joystickmodul. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TITLE"] = "[Potentiometer] värde på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_POTENTIOMETER + Blockly.Tooltip.SEP + "Låter dig läsa potentiometervärdet från Makeblock-modulen. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TITLE"] = "[4-knappsmodul] tryckt knapp på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_4_BUTTONS + Blockly.Tooltip.SEP + "Returnerar den tryckta knappen från Makeblocks 4-knappsmodul. Anslut modulen till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TITLE"] = "[Beröringssensor] tillstånd på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_TOUCH_SENSOR + Blockly.Tooltip.SEP + "Returnerar tillståndet från Makeblocks beröringssensor. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Blockly.Msg[\'IO_WRITEANALOGPIN_TOOLTIP\'] = \'Gör det möjligt att skriva ett värde till en analog ingång (0-255).\';';
