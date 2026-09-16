/**
 * @fileoverview English messages for Raspberry Pi. (EN)
 */
'use strict';

// Notes

// Display - Sense HAT - LED matrix
// Display - LCD
// Display - Neopixel
// Display - LED modules

// Input/Output - Time
// IO - Sense HAT - Joystick
// IO - Pins
// Input/Output - External modules

// Communication - Serial connection - Raspberry Pi

// Sensors - Cameras
// Sense HAT - sensors
// Sense HAT - IMU 
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TITLE'] = '[Sense HAT] get orientation in degrees (x, y, z)';
// Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Obtains the orientation in degrees (pitch, roll, yaw) from the Sense HAT.';
// Sensors - Gas
// Sensors - Climate
// Sensors - Sound & Light
// Sensors - Distance & Motion

// Actuators - Motors
// Actuators - MOSFET
// Actuators - Music

// Wifi - Raspberry Pi

// Robots - units
// Robots - Yahboom GATank - Detection
// Robots - Yahboom GATank - Control
// Robots - Yahboom G1 Tank - Moving
// Robots - Yahboom G1Tank - Camera

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
Blockly.Msg["MUSIC_SILENCE"] = "Tystnad";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TITLE'] = '[Sense HAT] sätt pixel vid x %1 och y %2, R %3 G %4 B %5';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sätter färgen på en pixel på Sense HAT med en RGB-färg.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE'] = '[Sense HAT] sätt pixel vid x %1 y %2 med färg %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sätter färgen på en pixel på Sense HAT med en färg från paletten.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE'] = "[Sense HAT] sätt bild %1 med %2 på bakgrund %3";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Definierar en bild på Sense HATs LED-matris med RGB-färger.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TITLE'] = '[Sense HAT] färg på pixel vid x %1 och y %2';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar färgen för en pixel på Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TITLE'] = '[Sense HAT] hämta färger för pixlar';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar färgerna för pixlarna på Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TITLE'] = '[Sense HAT] rensa displayen';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Rensar LED-displayen på Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE'] = '[Sense HAT] rensa displayen med färg %1';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Rensar LED-displayen på Sense HAT med en RGB-färg.';
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE'] = "[Sense HAT] visa bild med färg %1";
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar en bild på Sense HATs LED-matris med RGB-färger.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE'] = '[Sense HAT] visa meddelande %1 med hastighet %2, färg %3 och bakgrund %4';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar ett meddelande på Sense HATs LED-matris med en RGB-färg.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE'] = '[Sense HAT] visa bokstav %1 med färg %2 på bakgrund %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar en bokstav på Sense HATs LED-matris med en RGB-färg.';
Blockly.Msg["DISPLAY_LCD_SETTEXT_TITLE"] = "[LCD address %1] visa text %2 på rad %3 position %4";
Blockly.Msg["DISPLAY_LCD_SETTEXT_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Visar text på Grove LCD 1602-displayen. Anslut LCD till I2C-porten.";
Blockly.Msg["DISPLAY_LCD_CLEAR_TITLE"] = "[LCD address %1] rensa displayen";
Blockly.Msg["DISPLAY_LCD_CLEAR_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Rensar all text på LCD. Anslut LCD till I2C-porten.";
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TITLE"] = "[Neopixel] definiera %1 LED på pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ange antal neopixel-LED. Detta block måste användas i setup.";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TITLE"] = "[Neopixel] sätt LED %1 till R %2 G %3 B %4 på pin %5";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att styra varje neopixel-LEDs färg som (R,G,B) mellan 0 och 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE"] = "[Neopixel] sätt LED %1 till %2 på pin %3";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att styra färgen på varje neopixel-LED.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[Neopixel] sätt alla LED till färg R %1 G %2 B %3 på pin %4";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa alla neopixel-LED till vald färg som (R,G,B) mellan 0 och 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[Neopixel] sätt alla LED till färg %1 på pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att ställa alla neopixel-LED till vald färg.";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TITLE"] = "[Neopixel] visa en regnbåge på pin %1";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Visar en regnbåge på neopixel-modulen. Ange pin och antal LED.";
Blockly.Msg["DISPLAY_SETGROVELED_TITLE"] = "[LED] sätt LED till %1 på pin %2";
Blockly.Msg["DISPLAY_SETGROVELED_TOOLTIP"] = IMG_MODULE_LED + Blockly.Tooltip.SEP + "Slår på eller av Grove-LED (0 eller 1) på digitala pinnar.";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TITLE"] = "[LED] sätt LED-intensiteten till %1 (%) på pin %2";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TOOLTIP"] = IMG_MODULE_LED_PWM + Blockly.Tooltip.SEP + "Ställer in LED-intensiteten från 0 till 100% på PWM-pinnar.";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TITLE"] = "[Variable Color LED] sätt intensitet till %1 (%) på pin %2";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP"] = IMG_MODULE_LED_VARIABLE_COLOR + Blockly.Tooltip.SEP + "Ställer in LED-intensiteten från 0 till 100 (%) på PWM-pinnar. När modulen används första gången är RGB satt till 0. Använd en skruvmejsel på R, G eller B bakom modulen för att justera färgen.";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TITLE"] = "[4-siffrig modul] visa %1 %2 på pinnar CLK %3 DIO %4";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Visar siffror eller temperatur på Grove 4-siffriga displayen (TM1637) på digitala pinnar.";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TITLE"] = "[4-siffrig modul] visa klocka på pinnar CLK %1 DIO %2";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Visar klocka på Grove 4-siffriga displayen (TM1637) på digitala pinnar. Obs: att få korrekt klocka är bara möjligt om ESP32 hålls påslagen.";
Blockly.Msg["DISPLAY_4DIGIT_NUMBER"] = "nummer";
Blockly.Msg["DISPLAY_4DIGIT_TEMPERATURE"] = "temperatur";
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppar kodexekveringen (varaktighet i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stannar kodkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initiera stoppur";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Gör det möjligt att initiera stoppuret (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "hämta stoppurets värde i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returnerar stoppurets värde sedan initiering i sekunder eller millisekunder.";
Blockly.Msg['IO_DATETIME_YMD_HMS_TITLE'] = 'aktuell tidsstämpel (YMD_HMS)';
Blockly.Msg['IO_DATETIME_YMD_HMS_TOOLTIP'] = 'Returnerar den aktuella tidsstämpeln som en sträng i formatet: YMD_HMS (år månad dag timme minut sekund). Mycket användbart för att t.ex. namnge en bildfil.';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] vänta på joystickhändelse';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Väntar på en händelse från Sense HAT-joysticken.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] hämta %1 från joystickhändelse";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar riktningen eller åtgärden från en joystickhändelse.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "riktning";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "åtgärd";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] hämta lista med joystickhändelser";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar en lista (array) med joystickhändelser.";
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HÖG (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LÅG (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returnerar ett booleskt värde (1 om HÖG, 0 om LÅG).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "läs digital pinne %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Gör det möjligt att läsa det digitala värdet från en pinne (0 eller 1).";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "skriv tillstånd %1 på digital pinne %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Gör det möjligt att skriva värdet (0 eller 1) till en digital pinne.";
Blockly.Msg["IO_WRITEPWMPIN_TITLE"] = "skriv värde %1 på PWM-pin %2";
Blockly.Msg["IO_WRITEPWMPIN_TOOLTIP"] = "Gör det möjligt att applicera en PWM-signal med fast frekvens 5 kHz. Värdet kan vara 0–1023. 512 ger cirka 50 % arbetscykel, motsvarande ungefär 1,66 V.";
Blockly.Msg["IO_SETPWM_TITLE"] = "applicera en fyrkantsignal på %1 Hz på pinne %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Gör det möjligt att applicera en PWM-fyrkantsignal med 50 % arbetscykel. Du kan ändra signalens frekvens.";
Blockly.Msg["IO_STOPPWM_TITLE"] = "stoppa PWM-signalen på pinne %1";
Blockly.Msg["IO_STOPPWM_TOOLTIP"] = "Gör det möjligt att stoppa PWM-signalen på en pinne.";
Blockly.Msg['IO_SETPINMODE_TITLE'] = 'sätt läge %1 på pinne %2';
Blockly.Msg['IO_SETPINMODE_TOOLTIP'] = 'Applicera läget (PUD_OFF, PUD_DOWN, PUD_UP) på en pinne.';
Blockly.Msg["IO_GETGROVEBUTTON_TITLE"] = "[Button Module] knappens tillstånd på pinne %1 ";
Blockly.Msg["IO_GETGROVEBUTTON_TOOLTIP"] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + "Returnerar Grove-knappens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GETGROVESWITCH_TITLE"] = "[Switch Module] omkopplarens tillstånd på pinne %1 ";
Blockly.Msg["IO_GETGROVESWITCH_TOOLTIP"] = IMG_MODULE_SWITCH + Blockly.Tooltip.SEP + "Returnerar Grove-omkopplarens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg['IO_GETMAGNETICSWITCH_TITLE'] = '[Magnetic switch module] tillstånd på pinne %1';
Blockly.Msg['IO_GETMAGNETICSWITCH_TOOLTIP'] = IMG_MODULE_MAGNETIC_SWITCH + Blockly.Tooltip.SEP + 'Returnerar värdet från Grove magnetkontakt (0 eller 1) på digitala pinnar.';
Blockly.Msg["IO_GETGROVETACTILE_TITLE"] = "[Touch Sensor] beröringstillstånd på pinne %1 ";
Blockly.Msg["IO_GETGROVETACTILE_TOOLTIP"] = IMG_MODULE_TOUCH + Blockly.Tooltip.SEP + "Returnerar Grove-beröringssensorns tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TITLE"] = "[Colored Button Module] tillstånd på pin SIG2 %1";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Returnerar Grove-färgknappens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TITLE"] = "[Colored Button Module] styr LED till tillstånd %1 på pin SIG1 %2";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Gör det möjligt att slå på eller av Grove LED-knappen (0 eller 1) på digitala pinnar.";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv till konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Gör det möjligt att skriva data till konsolen.';
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "skriv graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block låter dig skriva (numeriska) data som syns i plottaren. Det kan användas med ett eller flera block i formatet \"Namn\" och \"Data\". Klicka på ikonen 'Grafikläge' för att visa graferna.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block används i blocket \"Skriv i graf\". Det ska innehålla namnet på det (text)värde som ska visas och värdet i fråga.";
Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperatur';
Blockly.Msg['SENSORS_HUMIDITY'] = 'fuktighet (%)';
Blockly.Msg['SENSORS_TEMPERATURE_IN'] = 'i';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[RPI Camera] ta en bild';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Tar en bild med Raspberry Pi-kameran och returnerar bilddata som en NumPy-array med dimensionerna (höjd, bredd, 3).';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[RPi Camera] spela in video i %1 sekunder i %2';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Gör det möjligt att spela in video med Raspberry Pi-kameran och spara den som en .mp4-fil. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TITLE'] = '[RPi Camera] ställ in bildstorleken till %1';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Gör det möjligt att konfigurera bildstorleken för bilder tagna med Raspberry Pi-kameran. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TITLE'] = '[USB Camera] ta en bild';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TOOLTIP'] = 'Gör det möjligt att ta en bild med en kamera ansluten till Raspberry Pi via USB. Blocket returnerar bilddata som en NumPy-array med dimensionerna (höjd, bredd, 3).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TITLE'] = '[USB Camera] spela in video i %1 sekunder i %2';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TOOLTIP'] = 'Gör det möjligt att spela in video med en kamera ansluten via USB till Raspberry Pi och spara som .mp4-fil. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TITLE'] = '[USB Camera] ställ in bildstorleken till %1';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TOOLTIP'] = 'Gör det möjligt att konfigurera bildstorleken för bilder tagna med en USB-kamera på Raspberry Pi. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TITLE'] = '[Cameras] spara foto %1 till fil %2';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TOOLTIP'] = 'Gör det möjligt att spara bilddata från en kamera till en .jpg-fil i mappen ~/vittascience-api/workspace/static/images på Raspberry Pi.';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TITLE'] = '[Cameras] visa foto %1 i Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TOOLTIP'] = 'Gör det möjligt att visa en bild tagen med en kamera på Raspberry Pi i Vittascience-gränssnittet. Du kan använda bilddata i en variabel eller ange filnamnet direkt.';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TITLE'] = '[Cameras] visa video %1 i Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TOOLTIP'] = 'Gör det möjligt att visa en video tagen med en kamera på Raspberry Pi i Vittascience-gränssnittet. Använd videofilens filnamn för att visa den direkt.';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TITLE'] = '[Cameras] lista över sparade bilder';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TOOLTIP'] = 'Ger en lista över bilder tagna med en kamera och sparade i mappen ~/vittascience-api/workspace/static/images på Raspberry Pi.';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TITLE'] = '[Cameras] lista över sparade videor';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TOOLTIP'] = 'Ger en lista över videor tagna med en kamera och sparade i mappen ~/vittascience-api/workspace/static/videos på Raspberry Pi.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] temperatur i %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar temperaturen från Sense HAT:s temperatursensor i grader Celsius (°C), Fahrenheit (°F) eller Kelvin (K).';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] ' + Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar fuktigheten (i %) från Sense HAT:s fuktsensor.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] temperatur i %1 från %2-sensorn';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Returnerar temperaturen i grader Celsius (°C), Fahrenheit (°F) eller Kelvin (K) från Sense HAT:s fukt- eller trycksensor.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'tryck';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] tryck i %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar trycket (i millibar) från Sense HAT:s trycksensor.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 gyroskop %2 %3 accelerometer %4 %5 kompass';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Konfigurerar Sense HAT:s IMU-sensorer (inertialmätningsenhet).';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'aktivera';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'inaktivera';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TITLE'] = '[Sense HAT] orientering i %1 (x, y, z)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar orienteringen i radianer eller grader (pitch, roll, yaw) från Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS'] = 'radianer';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES'] = 'grader';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] hämta kompassorientering";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar kompassorientering från Sense HAT.";
Blockly.Msg["SENSORS_SGP30_READDATA_TITLE"] = "[SGP30-sensor] gas %1";
Blockly.Msg["SENSORS_SGP30_READDATA_TOOLTIP"] = IMG_MODULE_SGP30 + Blockly.Tooltip.SEP + "Returnerar mängden CO2 (i ppm) eller TVOC (i ppb) i luften från SGP30-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SGP30_CO2"] = "koldioxid (CO2) (ppm)";
Blockly.Msg["SENSORS_SGP30_TVOC"] = "flyktiga organiska ämnen (TVOC) (ppb)";
Blockly.Msg["SENSORS_SCD30_READDATA_TITLE"] = "[SCD30-sensor] %1";
Blockly.Msg["SENSORS_SCD30_READDATA_TOOLTIP"] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + "Returnerar CO2-koncentration (i ppm), luftfuktighet (i %) eller temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K) från Grove SCD30-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SCD30_CO2"] = "koldioxid (CO2) (ppm)";
Blockly.Msg['SENSORS_SCD30_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_SCD30_HUM'] = Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TITLE"] = "[HM330X-sensor] partikelkoncentration %1 (µg/m3)";
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TOOLTIP"] = IMG_MODULE_HM330X + Blockly.Tooltip.SEP + "Mäter partikeltätheten i luften med HM330X-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_HM330X_ATM_PM1"] = "PM1.0";
Blockly.Msg["SENSORS_HM330X_ATM_PM2_5"] = "PM2.5";
Blockly.Msg["SENSORS_HM330X_ATM_PM10"] = "PM10.0";
Blockly.Msg["SENSORS_BMP280_READDATA_TITLE"] = "[BMP280-sensor %1] %2";
Blockly.Msg["SENSORS_BMP280_READDATA_TOOLTIP"] = IMG_MODULE_BMP280 + Blockly.Tooltip.SEP + "Returnerar omgivningstemperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), och tryck (i Pa). Höjden är initierad till 0 när programmet flashas. Använder Grove Barometer Sensor (adress: 0x77, färg: blå) eller HW-611 BMP280-sensor (adress: 0x76, färg: lila). Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_BMP280_TEMP"] = "temperatur";
Blockly.Msg["SENSORS_BMP280_PRESS"] = "tryck (Pa)";
Blockly.Msg["SENSORS_BMP280_ALT"] = "höjd (m)";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TITLE"] = "[DS18B20-sensor] temperatur i %1 på pinne %2";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP"] = IMG_MODULE_DS18B20 + Blockly.Tooltip.SEP + "Returnerar värdet från DS18B20:s vattentäta temperatursensor i Celsius (°C), Fahrenheit (°F) eller Kelvin (K) på digitala pinnar.";
Blockly.Msg["SENSORS_DHT11_READDATA_TITLE"] = "[DHT11-sensor] %1 på pinne %2";
Blockly.Msg["SENSORS_DHT11_READDATA_TOOLTIP"] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) från DHT11-sensorn på digitala pinnar.";
Blockly.Msg["SENSORS_DHT22_READDATA_TITLE"] = "[DHT22-sensor] %1 på pinne %2";
Blockly.Msg["SENSORS_DHT22_READDATA_TOOLTIP"] = IMG_MODULE_DHT22 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) med god noggrannhet från DHT22-sensorn på digitala pinnar.";
Blockly.Msg["SENSORS_SHT31_READDATA_TITLE"] = "[SHT31-sensor] %1";
Blockly.Msg["SENSORS_SHT31_READDATA_TOOLTIP"] = IMG_MODULE_SHT31 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) från SHT31-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_GETRAINGAUGE_TITLE"] = "[Regnmätare] tillståndsvärde på pinne %1";
Blockly.Msg["SENSORS_GETRAINGAUGE_TOOLTIP"] = IMG_MODULE_RAIN_GAUGE + Blockly.Tooltip.SEP + "Returnerar Grove-regnmätarens tillstånd (1 om det regnar, annars 0) på digitala pinnar.";
Blockly.Msg["SENSORS_GETANEMOMETER_TITLE"] = "[Anemometer] tillstånd på pinne %1";
Blockly.Msg["SENSORS_GETANEMOMETER_TOOLTIP"] = IMG_MODULE_ANEMOMETER + Blockly.Tooltip.SEP + "Returnerar Grove-anemometerns tillstånd (två gånger HIGH per rotation) på digitala pinnar.";
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TITLE"] = "[Solsensor %1] hämta %2";
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TOOLTIP"] = IMG_MODULE_SI1145 + Blockly.Tooltip.SEP + "Returnerar UV-index, IR-ljus (i lumen) eller synligt ljus (i lumen) från SI1145-sensorn. Fungerar med Grove Sunlight Sensor eller GY1145. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SUNLIGHT_UV"] = "UV-index";
Blockly.Msg["SENSORS_SUNLIGHT_VISIBLE"] = "synligt ljus (lumen)";
Blockly.Msg["SENSORS_SUNLIGHT_IR"] = "infrarött (lumen)";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TITLE"] = "[Färgsensor V2] %1";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TOOLTIP"] = IMG_MODULE_I2C_COLOR + Blockly.Tooltip.SEP + "Låter dig läsa nivån för en av de tre primärfärgerna med Grove färgsensor V2; returnerar ett värde mellan 0 och 255.";
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TITLE"] = "[Ultraljudssensor %1] hämta %2";
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TOOLTIP"] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + "Returnerar avståndsmätning (i centimeter) från ultraljudsavståndssensorn på digitala pinnar. OBS: om det är en Grove-sensor är både TRIG och ECHO kopplade till SIG.";
Blockly.Msg["SENSORS_ULTRASONIC_DISTANCE"] = "avstånd (cm)";
Blockly.Msg["SENSORS_ULTRASONIC_DURATION"] = "rundturstid (µs)";
Blockly.Msg["SENSORS_ULTRASONIC_1PIN"] = "på pinne";
Blockly.Msg["SENSORS_ULTRASONIC_2PINS"] = "på pinnar ";
Blockly.Msg["SENSORS_GETGESTURE_TITLE"] = "[Gestsensor] gesttyp";
Blockly.Msg["SENSORS_GETGESTURE_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Returnerar gesttypen ('right', 'left', 'up', 'down', 'forward', 'backward', 'clockwise', 'anticlockwise') från Grove-gestsensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TITLE"] = "[Gestsensor] när gest %1 upptäcks då";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Utför instruktioner när vald gest upptäcks av Grove-gestsensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_GESTURE_RIGHT"] = "höger";
Blockly.Msg["SENSORS_GESTURE_LEFT"] = "vänster";
Blockly.Msg["SENSORS_GESTURE_UP"] = "upp";
Blockly.Msg["SENSORS_GESTURE_DOWN"] = "ner";
Blockly.Msg["SENSORS_GESTURE_FORWARD"] = "framåt";
Blockly.Msg["SENSORS_GESTURE_BACKWARD"] = "bakåt";
Blockly.Msg["SENSORS_GESTURE_CLOCKWISE"] = "medurs";
Blockly.Msg["SENSORS_GESTURE_ANTICLOCKWISE"] = "moturs";
Blockly.Msg["SENSORS_GESTURE_WAVE"] = "vinka";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TITLE"] = "[Linjesensor] tillstånd på pinne %1";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TOOLTIP"] = IMG_MODULE_LINE_FINDER + Blockly.Tooltip.SEP + "Returnerar Grove-linjefinnarsensorns tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["SENSORS_GETGROVEMOTION_TITLE"] = "[PIR-rörelsesensor] rörelsetillstånd på pinne %1";
Blockly.Msg["SENSORS_GETGROVEMOTION_TOOLTIP"] = IMG_MODULE_MOTION + Blockly.Tooltip.SEP + "Returnerar Grove PIR-rörelsesensorns tillstånd (0 om det finns rörelse, annars 1) på digitala pinnar.";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TITLE"] = "[Piezo-vibrationssensor] tillstånd på pinne %1";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TOOLTIP"] = IMG_MODULE_VIBRATIONS + Blockly.Tooltip.SEP + "Returnerar vibrationsstatus (0 eller 1) från Grove piezo-vibrationssensorn på digitala pinnar.";
Blockly.Msg["SENSORS_GETGROVETILT_TITLE"] = "[Tiltmodul] lutningstillstånd på pinne %1";
Blockly.Msg["SENSORS_GETGROVETILT_TOOLTIP"] = IMG_MODULE_TILT + Blockly.Tooltip.SEP + "Returnerar Grove tilt-tillstånd (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TITLE"] = "Blockly.Msg[\"ACTUATORS_SERVO_SETANGLE_TITLE\"] = \"[Servomotor] sätt vinkel till %1 på stift %2\";";
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TOOLTIP"] = IMG_MODULE_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra servovinkeln (0–180) på digitala stift.";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE"] = "Blockly.Msg[\"ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE\"] = \"[Kontinuerlig servomotor] sätt hastighet till %1 (%) riktning %2 på stift %3\";";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP"] = IMG_MODULE_CONTINUOUS_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra hastigheten på kontinuerlig servomotor (0–100 %) på PWM-stift.";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TITLE"] = "[Motor] set power to %1 on pin %2";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TOOLTIP"] = IMG_MODULE_MOTOR + Blockly.Tooltip.SEP + "Gör det möjligt att styra DC-motorns effekt (0–100 %) på digitala stift. Varning: Raspberry Pi måste ha extern batteriförsörjning för att kunna ge tillräcklig energi till DC-motorn.";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE"] = "[Vibration motor] control motor to state %1 on pin %2";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP"] = IMG_MODULE_VIBRATION_MOTOR + Blockly.Tooltip.SEP + "Gör det möjligt att styra Grove vibrationsmotorns tillstånd (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TITLE"] = "[Relay module] control relay to state %1 on pin %2";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TOOLTIP"] = IMG_MODULE_RELAY + Blockly.Tooltip.SEP + "Gör det möjligt att styra tillståndet för Grove-relämodulen (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TITLE"] = "[MOSFET] set state to %1 on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att sätta MOSFET-transistorns tillstånd till HIGH eller LOW på PWM-stiften.";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE"] = "[MOSFET] set value to %1 (%) on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att styra MOSFET-transistorns cykeltid (0–100 %) på PWM-stift.";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TITLE"] = "[MOSFET] set cycle frequency to %1 (Hz) on pin %2";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att styra MOSFET-cykelfrekvensen (Hz) på PWM-stift.";
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TITLE"] = "Blockly.Msg[\"ACTUATORS_MUSIC_PLAYMUSIC_TITLE\"] = \"[Summer/Högtalare] spela musik %1 på %2\";";
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att spela vald musik på Grove-summern (eller högtalaren) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TITLE"] = "Blockly.Msg[\"ACTUATORS_MUSIC_PLAY_NOTES_TITLE\"] = \"[Summer/Högtalare] spela toner på\";";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att spela toner på Grove-summern (eller högtalaren) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TITLE"] = "Blockly.Msg[\"ACTUATORS_MUSIC_NOTE_TITLE\"] = \"ton %1 i oktav %2 med varaktighet %3\";";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Definiera en ton med oktav och varaktighet.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE"] = "Blockly.Msg[\"ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE\"] = \"[Summer/Högtalare] spela frekvens %1 under %2 (ms) på %3\";";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Spela upp en frekvens (heltal) på Grove-summern (eller högtalaren) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TITLE"] = "Blockly.Msg[\"ACTUATORS_MUSIC_STOP_TITLE\"] = \"[Summer/Högtalare] stoppa musik på %1\";";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Stoppa uppspelning av musik från Grove-summern (eller högtalaren) på digitala stift.";
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Raspberry Pi server] hostname %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Tillåt gränssnittet att hämta namnet på din Raspberry Pi och konfigurera installationsinstruktionerna för Raspberry Pi OS. Det gör det möjligt att koppla till den Python-server som körs på kortet för att kommunicera med gränssnittet.';
Blockly.Msg['ROBOTS_GO_FORWARD'] = 'Blockly.Msg[\'ROBOTS_GO_FORWARD\'] = \'kör framåt\';';
Blockly.Msg['ROBOTS_GO_BACKWARD'] = 'Blockly.Msg[\'ROBOTS_GO_BACKWARD\'] = \'kör bakåt\';';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TITLE'] = '[Yahboom G1 - Ultrasonic] %1';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Mäter avståndet (i cm) eller rundresan för vågen (i µs) framför Yahboom G1 Tank-roboten med ultraljudssensorn.';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TITLE'] = '[Yahboom G1 - black line] sensor state %1';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Returnerar tillståndet för en av de fyra infraröda svartlinjesensorerna (0 om upptäckt annars 1) som sitter under Yahboom G1 Tank-roboten. Namnen P1, P2, P3 eller P3 är tryckta under roboten. Använd de fysiska potentiometrarna för att justera sensorns detektion efter kretsens förhållanden.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE\'] = \'[Yahboom G1] styr de främre LED-lamporna %1 till %2\';';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan styra de två främre LED-lamporna på Yahboom G1 Tank-roboten genom att slå rött, grönt eller blått på/av.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE\'] = \'[Yahboom G1] styr RGB-LED:arna med R %1 G %2 B %3\';';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan styra de två RGB-LED:arna på framsidan av Yahboom G1 Tank-roboten med värdena R, G och B (0–255).';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE\'] = \'[Yahboom G1] styr RGB-LED:arna till %1\';';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Ger möjlighet att styra de två RGB-LED:arna på framsidan av Yahboom G1 Tank-roboten genom att välja en färg från paletten.';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE\'] = \'[Främre servomotor] styr PAN-vinkeln till %1 (°)\';';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Styr vinkeln (PAN) för den främre servomotorn (0–180) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_WAIT_KEY_TITLE\'] = \'[Yahboom G1 - KEY-knapp] vänta på tryck\';';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Väntar på att KEY-knappen på Yahboom G1 Tank-robotens kort ska tryckas.';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_SETGO_TITLE\'] = \'[Yahboom G1 Tank] %1 med hastighet %2 %\';';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan styra motorerna på Yahboom G1 Tank-roboten för att köra den framåt eller bakåt med en hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_STOP_TITLE\'] = \'[Yahboom G1 Tank] stoppa robotens motorer\';';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan stoppa motorerna på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_TURN_TITLE\'] = \'[Yahboom G1 Tank] rotera %1 med hastighet %2 %\';';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan styra motorerna på Yahboom G1 Tank-roboten för att rotera den (vänster eller höger) med en hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_RIGHT'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_TURN_RIGHT\'] = \'höger\';';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_LEFT'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_TURN_LEFT\'] = \'vänster\';';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_SPIN_TITLE\'] = \'[Yahboom G1 Tank] snurra %1 med hastighet %2 %\';';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör att du kan styra motorerna på Yahboom G1 Tank-roboten för att snurra den (vänster eller höger) med en hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE\'] = \'[Yahboom G1 Tank] styr motor %1 riktning %2 hastighet %3 (%)\';';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra höger och vänster motor genom att ändra riktningen (↻: FORWARD, ↺: BACKWARD) och hastigheten (0–100%) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_LEFT'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_MOTOR_LEFT\'] = \'vänster\';';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_RIGHT'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_MOTOR_RIGHT\'] = \'höger\';';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_BOTH'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_MOTOR_BOTH\'] = \'vänster & höger\';';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE\'] = \'[Kamera servomotorer] styr PAN-vinkeln till %1 (°)\';';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra PAN-vinkeln (horisontell) för servomotorn i USB-kameramodulen (0–180) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE'] = 'Blockly.Msg[\'ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE\'] = \'[Kamera servomotorer] styr TILT-vinkeln till %1 (°)\';';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra vinkeln (TILT – vertikal) för servomotorn i USB-kameramodulen (0–180) på Yahboom G1 Tank-roboten.';
