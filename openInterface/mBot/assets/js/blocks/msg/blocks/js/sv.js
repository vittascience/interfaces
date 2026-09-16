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
Blockly.Msg['CALL_EXPRESSION_COMMENT_TOOLTIP'] = 'Detta block låter dig lägga till en kommentar i din kod.';
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TITLE"] = "[MeMCore] sätt den inbyggda blå LED:en till %1";
Blockly.Msg["MCORE_CONTROL_BUILTIN_LED_TOOLTIP"] = "Tänd eller släck den blå LED:en på MeMCore-kortet.";
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppa programkörningen (varaktighet i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stoppa programkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initiera kronometern";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Initierar kronometern (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "hämta kronometervärde i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returnerar kronometervärdet från initieringen i sekunder eller millisekunder.";
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HÖG (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LÅG (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returnerar ett booleskt värde (HÖG eller LÅG).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "läs digital pin %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Detta block läser en digital ingång och returnerar värdet.";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "skriv på digital pin %1 tillstånd %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Skriver ett tillstånd till en digital pin.";
Blockly.Msg["IO_WRITEANALOGPIN_TITLE"] = "skriv på analog pin %1 värde %2";
Blockly.Msg["IO_WRITEANALOGPIN_TOOLTIP"] = "Skriver värdet (0-255) på en analog pin."
Blockly.Msg["IO_READANALOGPIN_TITLE"] = "läs analog pin %1";
Blockly.Msg["IO_READANALOGPIN_TOOLTIP"] = "Läser det analoga värdet från pinnar (0-1023).";
Blockly.Msg["IO_SETPWM_TITLE"] = "applicera PWM-signal med arbetscykel %1 (%) på pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Applicera en PWM-signal på PWM-stift (~) med angiven arbetscykel (i %). För stiften D3, D9, D10 och D11 är signalfrekvensen 490 Hz (period 2,04 ms). För stiften D5 och D6 är den 980 Hz (period 1,02 ms).";
Blockly.Msg["IO_READPULSEIN_TITLE"] = "läs pulslängd för tillstånd %1 på pin %2";
Blockly.Msg["IO_READPULSEIN_TOOLTIP"] = "Returnerar varaktigheten av pulsen (i μs). Välj tillstånd att mäta (HÖG eller LÅG). Fungerar på pulser från 10 μs upp till 3 minuter.";
Blockly.Msg["IO_ATTACH_INTERRUPT_TITLE"] = "när %1 upptäcks på pin %2 då";
Blockly.Msg["IO_ATTACH_INTERRUPT_TOOLTIP"] = "Gör det möjligt att sätta en händelse på stift 2 eller 3. Detta block kör instruktioner när som helst så snart en stigande/fallande flank eller båda upptäcks på stift 2 eller 3.";
Blockly.Msg["IO_RISING_EDGE"] = "stigande flank";
Blockly.Msg["IO_FALLING_EDGE"] = "fallande flank";
Blockly.Msg["IO_BOTH_EDGE"] = "ändring";
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TITLE'] = 'initiera seriell kommunikation vid %1 baud';
Blockly.Msg['COMMUNICATION_SERIAL_BEGIN_TOOLTIP'] = 'Detta block initierar seriell kommunikation med en given baud-hastighet. Det måste användas i setup-blocket.';
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TITLE"] = "skriv till seriell port %1";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_TOOLTIP"] = "Detta block används för att skriva vilken typ av data som helst till seriellporten. De kommer att visas i konsolen när programmet körs.";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_WITH"] = "med";
Blockly.Msg["COMMUNICATION_SERIAL_WRITE_NEWLINES"] = "radbrytning(ar)";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TITLE'] = 'skriv numret %1 till konsolen i %2-format';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NUMBER_TOOLTIP'] = 'Gör det möjligt att visa ett tal i konsolen i valt format (HEX: hexadecimalt, DEC: decimalt).';
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE"] = "när seriell data tas emot i %1 då";
Blockly.Msg["COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP"] = "Gör det möjligt att köra instruktioner om data tas emot via seriellporten i variabeln 'serialData'.";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "visa i graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block gör det möjligt att skriva (digitala) data som syns i plottern. Det kan användas med ett eller flera block i \"Namn\"- och \"Data\"-format.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block används i \"Visa i graf\"-blocket. Det måste innehålla namnet på (text)värdet som ska visas och det värde som avses.";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TITLE"] = "spela musik %1 via seriellporten";
Blockly.Msg["COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP"] = "Spela vald ton tills \"stoppa musik\"-blocket körs.";
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
Blockly.Msg["COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP"] = "Detta block låter spela en given frekvens på datorn";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TITLE"] = "stoppa musik";
Blockly.Msg["COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP"] = "Stoppar den aktuella tonen som spelas via seriellporten.";
Blockly.Msg["ROBOTS_MBOT_GO_TITLE"] = "[Motorer] %1 med hastighet %2 (%)";
Blockly.Msg["ROBOTS_MBOT_GO_FORWARD"] = "framåt";
Blockly.Msg["ROBOTS_MBOT_GO_REVERSE"] = "bakåt";
Blockly.Msg["ROBOTS_MBOT_GO_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra robotens körning (FRAMÅT/BAKTÅT) och motorhastigheten (0–100 %) för mBot-roboten.";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TITLE"] = "[Motorer] styr motor %1 riktning %2 hastighet %3 (%)";
Blockly.Msg["ROBOTS_MBOT_RIGHT"] = "höger";
Blockly.Msg["ROBOTS_MBOT_LEFT"] = "vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT"] = "höger och vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT_F"] = "höger";
Blockly.Msg["ROBOTS_MBOT_LEFT_F"] = "vänster";
Blockly.Msg["ROBOTS_MBOT_RIGHT&LEFT_F"] = "höger och vänster";
Blockly.Msg["ROBOTS_MBOT_CONTROLMOTOR_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra höger motor (9) och vänster motor (10), ändra riktning (↻ : framåt, ↺ : bakåt) eller hastighet (från 0 till 100 %) på mBot-roboten.";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TITLE"] = "[Motors] stoppa motor %1";
Blockly.Msg["ROBOTS_MBOT_STOPMOTORS_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att stoppa höger, vänster eller båda motorerna på mBot.";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TITLE"] = "[Board] sätt färg R %1 G %2 B %3 på LED %4";
Blockly.Msg["ROBOTS_MBOT_SETRGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra RGB-LED-färgen på mBot-kortet som (R,G,B) med värden 0–255.";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TITLE"] = "[Board] sätt färg %1 på LED %2";
Blockly.Msg["ROBOTS_MBOT_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att välja RGB-LED-färg på mBot-kortet via paletten.";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TITLE"] = "[Board] sätt summern till frekvens %1 i %2 (ms)";
Blockly.Msg["ROBOTS_MBOT_SETBUZZER_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att styra mBots summer med valfri frekvens under angiven tid i millisekunder";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TITLE"] = "[Board] spela musik %1";
Blockly.Msg["ROBOTS_MBOT_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Gör det möjligt att spela musik på mBots summer.";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TITLE"] = "[Board] ljusnivå";
Blockly.Msg["ROBOTS_MBOT_GETLIGHT_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returnerar ljusnivån från mBot-kortets sensor.";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TITLE"] = "[Board] är knappen nedtryckt ?";
Blockly.Msg["ROBOTS_MBOT_GETBUTTONSTATE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Returnerar knappens tillstånd på mBot-kortet.";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TITLE"] = "[Board] skicka meddelande %1 via IR";
Blockly.Msg["ROBOTS_MBOT_SENDIRMESSAGE_TOOLTIP"] = IMG_MODULE_MBOT + Blockly.Tooltip.SEP + "Skicka meddelande via IR från roboten.";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE"] = "Blockly.Msg[\"ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE\"] = \"[Fjärrkontroll] är knapp %1 nedtryckt ?\";";
Blockly.Msg["ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_REMOTE_CONTROL + Blockly.Tooltip.SEP + "Returnerar sant eller falskt om någon knapp på mBots fjärrkontroll är nedtryckt.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TITLE\"] = \"[LED-matris] visa text %1 vid position x %2 y %3 på port %4\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWSTRING_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Ritar text på Makeblocks 16x8 LED-matris. Positionen har området x (0–15) och y (0–7). Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TITLE\"] = \"[LED-matris] visa nummer %1 på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Visar ett tal på Makeblocks 16x8 LED-matris. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TITLE\"] = \"[LED-matris] visa klocka %1 : %2 på port %3\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_SHOWCLOCK_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Visar klocka på Makeblocks 16x8 LED-matris. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TITLE\"] = \"[LED-matris] visa ritning %1 vid position x %2 y %3 på port %4\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_MATRIX_DRAWBITMAPICON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MATRIX16X8_DISPLAY + Blockly.Tooltip.SEP + "Visar en ritning på Makeblocks 16x8 LED-matris. Positionen har området x (0–15) och y (0–7). Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TITLE\"] = \"[Neopixel] definiera %1 LED på port %2 slot %3\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att definiera antal LED på Makeblocks Neopixel. Detta block ska användas i setup. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TITLE\"] = \"[Neopixel] sätt LED %1 till R %2 G %3 B %4 på port %5 slot %6\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_CONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att sätta LED-färg som (R,G,B) 0–255 på Makeblocks Neopixel. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TITLE\"] = \"[Neopixel] sätt LED %1 till %2 på port %3 slot %4\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_PALETTECONTROLLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att sätta LED-färg via paletten på Makeblocks Neopixel. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TITLE\"] = \"[Neopixel] sätt alla LED till färg R %1 G %2 B %3 på port %4 slot %5\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa in alla LED på Makeblocks Neopixel-modul till vald färg som (R,G,B) med värden 0–255. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TITLE\"] = \"[Neopixel] sätt alla LED till färg %1 på port %2 slot %3\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa in alla LED på Makeblocks Neopixel-modul till vald färg. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TITLE\"] = \"[Neopixel] visa en regnbåge på port %1 slot %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_NEOPIXEL + Blockly.Tooltip.SEP + "Visar en regnbåge på Makeblocks Neopixel-modul. Ange pinne och antal LED. Välj slot (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_SETRGBLED_TITLE\"] = \"[RGB LED] sätt färg R %1 G %2 B %3 på LED %4 på port %5\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETRGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Ställ in färg som (R,G,B) med värden 0–255 på Makeblocks RGB-LED. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ALL_LED"] = "alla";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TITLE\"] = \"[RGB LED] sätt färg %1 på LED %2 på port %3\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETPALETTERGBLED_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_RGB_LED + Blockly.Tooltip.SEP + "Ställ in färg via paletten på Makeblocks RGB-LED. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TITLE\"] = \"[7-segmentsdisplay] visa %1 på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_7SEGMENT_DISPLAY + Blockly.Tooltip.SEP + "Visar ett tal på Makeblocks 7-segmentsdisplay. Anslut displayen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE\"] = \"[Ultraljudssensor] avstånd i %1 på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_ULTRASONIC + Blockly.Tooltip.SEP + "Returnerar avståndet (i centimeter) från Makeblocks ultraljudssensor. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE\"] = \"[Linjeföljare] sensor %1 i den svarta linjen på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_READLINEFINDER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LINEFINDER + Blockly.Tooltip.SEP + "Returnerar tillståndet för linjeföljarmodulen (0 eller 1) från sensor1 (vänster) eller sensor2 (höger). Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_LEFT_1"] = "vänster";
Blockly.Msg["ROBOTS_MAKEBLOCK_RIGHT_2"] = "höger";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE\"] = \"[PIR-rörelsesensor] tillstånd på port %1\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_READPIRSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_PIR_MOTION + Blockly.Tooltip.SEP + "Returnerar tillståndet (1 om rörelse upptäckt, annars 0) från Makeblocks PIR-rörelsesensor. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE\"] = \"[DS18B20-sensor] temperatur på port %1 slot %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_WATERPROOF_TEMPERATURE + Blockly.Tooltip.SEP + "Läser temperaturen med Makeblocks vattentäta DS18B20-sensor. Välj slot (1 eller 2) på RJ45-adaptern. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_GETLIGHT_TITLE\"] = \"[Ljussensor] ljusnivå på port %1\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETLIGHT_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_LIGHT + Blockly.Tooltip.SEP + "Läser ljusnivån med Makeblocks ljussensor. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_GETCOLOR_TITLE\"] = \"[Färgsensor] %1 på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOLOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COLOR + Blockly.Tooltip.SEP + "Läser nivån för en av de tre primärfärgerna med Makeblocks färgsensor. Returnerar också den uppmätta färgen som 0 (vit), 1 (rosa), 2 (röd), 3 (orange), 4 (gul), 5 (grön), 5 (cyan), 6 (blå), 7 (lila), 8 (svart), 9 (guld). Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COLOR"] = "färg";
Blockly.Msg["ROBOTS_MAKEBLOCK_RED"] = "nivå av rött";
Blockly.Msg["ROBOTS_MAKEBLOCK_GREEN"] = "nivå av grönt";
Blockly.Msg["ROBOTS_MAKEBLOCK_BLUE"] = "nivå av blått";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_GETSOUND_TITLE\"] = \"[Ljudsensor] ljudnivå på port %1\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSOUND_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SOUND + Blockly.Tooltip.SEP + "Läser ljudnivån med Makeblocks ljudsensor. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TITLE"] = "Blockly.Msg[\"ROBOTS_MAKEBLOCK_GETGAS_TITLE\"] = \"[Gassensor MQ2] %1 på port %2\";";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETGAS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_GAS + Blockly.Tooltip.SEP + "Läser gasmängden med Makeblocks MQ2-gassensor. Det går att få ett digitalt tillstånd 0 (ingen gas) eller 1 (gas). Använd potten på modulen för att ställa in lämplig tröskel. Anslut sensorn till RJ45-port 1 eller 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_DIGITAL"] = "tillstånd";
Blockly.Msg["ROBOTS_MAKEBLOCK_GAS_ANALOG"] = "värde";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TITLE"] = "[Flamsensor] %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETFLAME_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_FLAME + Blockly.Tooltip.SEP + "Läser av om Makeblock-flamsensorn upptäcker en flamma. Returnerar 0 (ingen flamma) eller 1 (flamma). Använd potentiometern på modulen för att ställa in lämplig tröskel. Sensorn upptäcker infrarött ljus med våglängd 700–1200 nm. Anslut sensorn till RJ45-port 1 eller 2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_DIGITAL"] = "läge";
Blockly.Msg["ROBOTS_MAKEBLOCK_FLAME_ANALOG"] = "värde";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TITLE"] = "[Kompass] %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_COMPASS + Blockly.Tooltip.SEP + "Låter dig läsa kompassdata från Makeblock. Anslut sensorn till RJ45-port 1 eller 4 på mBot.";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_X"] = "X-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Y"] = "Y-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_Z"] = "Z-axel";
Blockly.Msg["ROBOTS_MAKEBLOCK_COMPASS_ANGLE"] = "vinkel (°)";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TITLE"] = "[Servomotor] sätt vinkel till %1 på pin %2 plats %3";
Blockly.Msg["ROBOTS_MAKEBLOCK_SETSERVOANGLE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra servons vinkel (0–180) ansluten till en RJ45-adapter från Makeblock. Välj uttag (1 eller 2) på RJ45-adaptern. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TITLE"] = "[Mini-fläkt] ställ in riktning till %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_MINI_FAN + Blockly.Tooltip.SEP + "Gör det möjligt att styra Makeblocks mini-fläkt.";
Blockly.Msg["ROBOTS_MAKEBLOCK_CLOCKWISE"] = "medurs";
Blockly.Msg["ROBOTS_MAKEBLOCK_ANTICLOCKWISE"] = "moturs";
Blockly.Msg["ROBOTS_MAKEBLOCK_STOP"] = "stopp";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TITLE"] = "[Ändlägesbrytare] tillstånd på port %1 plats %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_SWITCH + Blockly.Tooltip.SEP + "Låter dig läsa tillståndet hos Makeblocks brytarmodul. Välj uttag (1 eller 2) på RJ45-adaptern. Anslut sensorn till RJ45-port 1–4.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TITLE"] = "[Joystick] värde för axel %1 på port %2";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_JOYSTICK + Blockly.Tooltip.SEP + "Låter dig läsa värdet för axeln (X eller Y) från Makeblocks joystickmodul. Anslut modulen till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TITLE"] = "[Potentiometer] värde på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_POTENTIOMETER + Blockly.Tooltip.SEP + "Låter dig läsa potentiometerns värde från Makeblock-modulen. Anslut sensorn till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TITLE"] = "[4-knappsmodul] nedtryckt knapp på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_4_BUTTONS + Blockly.Tooltip.SEP + "Returnerar vilken knapp som är nedtryckt på Makeblocks 4-knappsmodul. Anslut modulen till RJ45-port 1–2.";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TITLE"] = "[Beröringssensor] tillstånd på port %1";
Blockly.Msg["ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TOOLTIP"] = IMG_MODULE_MAKEBLOCK_TOUCH_SENSOR + Blockly.Tooltip.SEP + "Returnerar tillståndet från Makeblocks beröringssensor. Anslut modulen till RJ45-port 1–4.";
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'Tillåter att skriva ett värde till en analog ingång (0-255).';
