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
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TITLE'] = '[Sense HAT] sätt pixel på x %1 och y %2, R %3 G %4 B %5';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sätter färgen på en pixel på Sense HAT med ett RGB-värde.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE'] = '[Sense HAT] sätt pixel på x %1 y %2 med färg %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Sätter pixelns färg på Sense HAT med en färg från paletten.';
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE'] = "[Sense HAT] sätt bild %1 med %2 på bakgrund %3";
Blockly.Msg['SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Definierar en bild på Sense HAT:s LED-matris med RGB-färger.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TITLE'] = '[Sense HAT] färg på pixel på x %1 och y %2';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar färgen på en pixel på Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TITLE'] = '[Sense HAT] hämta färger för pixlarna';
Blockly.Msg['SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar färger från Sense HAT:s pixlar.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TITLE'] = '[Sense HAT] rensa displayen';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Rensar LED-displayen på Sense HAT.';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE'] = '[Sense HAT] rensa displayen med färg %1';
Blockly.Msg['SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Rensar LED-displayen på Sense HAT med en RGB-färg.';
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE'] = "[Sense HAT] visa bild med färg %1";
Blockly.Msg['SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar en bild på Sense HAT:s LED-matris med RGB-färger.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE'] = '[Sense HAT] visa meddelande %1 med hastighet %2 med färg %3 och bakgrund %4';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar ett meddelande på Sense HAT:s LED-matris med en RGB-färg.';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE'] = '[Sense HAT] visa bokstav %1 med färg %2 på bakgrund %3';
Blockly.Msg['SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Visar en bokstav på Sense HAT:s LED-matris med en RGB-färg.';
Blockly.Msg["DISPLAY_LCD_SETTEXT_TITLE"] = "[LCD address %1] visa text %2 på rad %3 position %4";
Blockly.Msg["DISPLAY_LCD_SETTEXT_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Visa text på Grove LCD 1602-displayen. Anslut LCD till I2C-porten.";
Blockly.Msg["DISPLAY_LCD_CLEAR_TITLE"] = "[LCD address %1] rensa displayen";
Blockly.Msg["DISPLAY_LCD_CLEAR_TOOLTIP"] = IMG_MODULE_LCD_I2C + Blockly.Tooltip.SEP + "Rensar all text på LCD:n. Anslut LCD till I2C-porten.";
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TITLE"] = "[Neopixel] definiera %1 LED på pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_DEFINE_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Ställ in antal LED på Neopixel. Detta block måste användas i setup.";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TITLE"] = "[Neopixel] sätt LED %1 till R %2 G %3 B %4 på pin %5";
Blockly.Msg["DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att styra varje LED:s färg på Neopixel som (R,G,B) mellan 0 och 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE"] = "[Neopixel] sätt LED %1 till %2 på pin %3";
Blockly.Msg["DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att styra varje LED:s färg på Neopixel.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE"] = "[Neopixel] sätt alla LED till färg R %1 G %2 B %3 på pin %4";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att sätta alla LED på Neopixel till vald färg som (R,G,B) mellan 0 och 255.";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE"] = "[Neopixel] sätt alla LED till färg %1 på pin %2";
Blockly.Msg["DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Gör det möjligt att sätta alla LED på Neopixel till vald färg.";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TITLE"] = "[Neopixel] sätt en regnbåge på pin %1";
Blockly.Msg["DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP"] = IMG_MODULE_NEOPIXEL + Blockly.Tooltip.SEP + "Visar en regnbåge på Neopixel-modulen. Ange pin och antal LED.";
Blockly.Msg["DISPLAY_SETGROVELED_TITLE"] = "Blockly.Msg[\"DISPLAY_SETGROVELED_TITLE\"] = \"[LED] ställ LED i tillstånd %1 på pin %2\";";
Blockly.Msg["DISPLAY_SETGROVELED_TOOLTIP"] = IMG_MODULE_LED + Blockly.Tooltip.SEP + "Gör det möjligt att slå på eller av LED på Grove-kontakten (0 eller 1) på digitala pinnar.";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TITLE"] = "[LED] sätt LED-intensitet till %1 (%) på pin %2";
Blockly.Msg["DISPLAY_SETLEDINTENSITY_TOOLTIP"] = IMG_MODULE_LED_PWM + Blockly.Tooltip.SEP + "Gör det möjligt att sätta LED-intensiteten från 0 till 100% på PWM-pinnar.";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TITLE"] = "[LED med variabel färg] sätt intensitet till %1 (%) på pin %2";
Blockly.Msg["DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP"] = IMG_MODULE_LED_VARIABLE_COLOR + Blockly.Tooltip.SEP + "Ställ in LED-intensitet från 0 till 100 (%) på PWM-pinnar. Vid första användning är RGB satta till 0. Använd en skruvmejsel på R, G eller B på baksidan av modulen för att ställa in färgen.";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TITLE"] = "[4-siffrig modul] visa %1 %2 på pins CLK %3 DIO %4";
Blockly.Msg["DISPLAY_4DIGIT_SETNUMBER_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Visar siffror eller temperatur på Grove 4-siffriga displayen (TM1637) på digitala pinnar.";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TITLE"] = "[4-siffrig modul] visa klocka på pins CLK %1 DIO %2";
Blockly.Msg["DISPLAY_4DIGIT_SETCLOCK_TOOLTIP"] = IMG_MODULE_4DIGITDISPLAY + Blockly.Tooltip.SEP + "Visar klocka på Grove 4-siffriga displayen (TM1637) på digitala pinnar. Obs: att få riktig klocktid är bara möjligt om ESP32 förblir påslagen.";
Blockly.Msg["DISPLAY_4DIGIT_NUMBER"] = "nummer";
Blockly.Msg["DISPLAY_4DIGIT_TEMPERATURE"] = "temperatur";
Blockly.Msg["IO_WAIT_TITLE"] = "vänta %1 %2";
Blockly.Msg["IO_WAIT_TOOLTIP"] = "Stoppar kodkörningen (varaktighet i sekunder eller millisekunder).";
Blockly.Msg["IO_WAIT_SECOND"] = "sekund(er)";
Blockly.Msg['IO_WAIT_MILLISECOND'] = "millisekund(er)";
Blockly.Msg['IO_WAIT_MICROSECOND'] = "mikrosekund(er)";
Blockly.Msg["IO_WAIT_UNTIL_TITLE"] = "vänta tills %1";
Blockly.Msg["IO_WAIT_UNTIL_TOOLTIP"] = "Stoppar kodkörningen tills villkoret är uppfyllt.";
Blockly.Msg["IO_INITCHRONOMETER_TITLE"] = "initiera tidtagarur";
Blockly.Msg["IO_INITCHRONOMETER_TOOLTIP"] = "Gör det möjligt att initiera tidtagaruret (i sekunder).";
Blockly.Msg["IO_GETCHRONOMETER_TITLE"] = "hämta tidtagarur i %1";
Blockly.Msg["IO_GETCHRONOMETER_TOOLTIP"] = "Returnerar tidtagarurets värde sedan initiering i sekunder eller millisekunder.";
Blockly.Msg['IO_DATETIME_YMD_HMS_TITLE'] = 'aktuell tidsstämpel (YMD_HMS)';
Blockly.Msg['IO_DATETIME_YMD_HMS_TOOLTIP'] = 'Returnerar aktuell tidsstämpel som en sträng i formatet: YMD_HMS (år månad dag timme minuter sekunder). Mycket användbart, till exempel för att namnge en bildfil.';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TITLE'] = '[Sense HAT] vänta på joystickhändelse';
Blockly.Msg['SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Väntar på en händelse från Sense HAT-joysticken.';
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE'] = "[Sense HAT] hämta %1 från joystickhändelse";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar riktningen eller åtgärden från en joystickhändelse.";
Blockly.Msg['SENSE_HAT_GET_EVENT_DIRECTION'] = "riktning";
Blockly.Msg['SENSE_HAT_GET_EVENT_ACTION'] = "åtgärd";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TITLE'] = "[Sense HAT] hämta en lista med joystickhändelser";
Blockly.Msg['SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar en lista med joystickhändelser.";
Blockly.Msg["IO_DIGITAL_SIGNAL_TITLE"] = "%1";
Blockly.Msg["IO_DIGITAL_SIGNAL_HIGH"] = "HÖG (1)";
Blockly.Msg["IO_DIGITAL_SIGNAL_LOW"] = "LÅG (0)";
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "Returnerar ett boolskt värde (1 om HÖG eller 0 om LÅG).";
Blockly.Msg["IO_READDIGITALPIN_TITLE"] = "läs digital pin %1";
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "Låter dig läsa det digitala värdet på en pinne (0 eller 1).";
Blockly.Msg["IO_WRITEDIGITALPIN_TITLE"] = "skriv tillstånd %1 på digital pin %2";
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "Låter dig skriva värdet (0 eller 1) på en digital pin.";
Blockly.Msg["IO_WRITEPWMPIN_TITLE"] = "skriv värde %1 på PWM-pin %2";
Blockly.Msg["IO_WRITEPWMPIN_TOOLTIP"] = "Låter dig applicera en PWM-signal med fast frekvens på 5 kHz. Värdet kan ändras mellan 0 och 1023. 512 ger cirka 50% arbetscykel, motsvarande ungefär 1,66 V.";
Blockly.Msg["IO_SETPWM_TITLE"] = "applicera en fyrkantsignal med frekvens %1 (Hz) på pin %2";
Blockly.Msg["IO_SETPWM_TOOLTIP"] = "Låter dig applicera en PWM-fyrkantsignal med 50% arbetscykel. Du kan ändra signalens frekvens.";
Blockly.Msg["IO_STOPPWM_TITLE"] = "stoppa PWM-signal på pin %1";
Blockly.Msg["IO_STOPPWM_TOOLTIP"] = "Låter dig stoppa PWM-signalen på en pin.";
Blockly.Msg['IO_SETPINMODE_TITLE'] = 'sätt läge %1 på pin %2';
Blockly.Msg['IO_SETPINMODE_TOOLTIP'] = 'Sätter (PUD_OFF, PUD_DOWN, PUD_UP)-läget på en pin.';
Blockly.Msg["IO_GETGROVEBUTTON_TITLE"] = "[Knappmodul] knappens tillstånd på pin %1 ";
Blockly.Msg["IO_GETGROVEBUTTON_TOOLTIP"] = IMG_MODULE_BUTTON + Blockly.Tooltip.SEP + "Returnerar Grove-knappens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GETGROVESWITCH_TITLE"] = "[Brytarmodul] brytarens tillstånd på pin %1 ";
Blockly.Msg["IO_GETGROVESWITCH_TOOLTIP"] = IMG_MODULE_SWITCH + Blockly.Tooltip.SEP + "Returnerar Grove-brytarens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg['IO_GETMAGNETICSWITCH_TITLE'] = '[Magnetisk brytarmodul] tillstånd på pin %1';
Blockly.Msg['IO_GETMAGNETICSWITCH_TOOLTIP'] = IMG_MODULE_MAGNETIC_SWITCH + Blockly.Tooltip.SEP + 'Returnerar värdet från Grove-magnetbrytaren (0 eller 1) på digitala pinnar.';
Blockly.Msg["IO_GETGROVETACTILE_TITLE"] = "[Beröringssensor] beröringstillstånd på pin %1 ";
Blockly.Msg["IO_GETGROVETACTILE_TOOLTIP"] = IMG_MODULE_TOUCH + Blockly.Tooltip.SEP + "Returnerar Grove-beröringssensorns tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TITLE"] = "[Färgad knappmodul] tillstånd på pin SIG2 %1";
Blockly.Msg["IO_GROVECOLOREDBUTTON_GET_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Returnerar Grove-färgknappens tillstånd (0 eller 1) på digitala pinnar.";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TITLE"] = "[Färgad knappmodul] sätt LED till %1 på pin SIG1 %2";
Blockly.Msg["IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP"] = IMG_MODULE_LED_BUTTON + Blockly.Tooltip.SEP + "Låter dig slå på eller stänga av Grove LED-knappen (0 eller 1) på digitala pinnar.";
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TITLE'] = 'skriv i konsolen %1';
Blockly.Msg['COMMUNICATION_SERIAL_WRITE_TOOLTIP'] = 'Låter dig skriva data till konsolen.';
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TITLE"] = "skriv till graf";
Blockly.Msg["COMMUNICATION_WRITEGRAPH_TOOLTIP"] = "Detta block låter dig skriva (digitala) data som syns i plottern. Det kan användas med ett eller flera block i formatet \"Name\" och \"Data\". Klicka på ikonen 'Graphic mode' för att visa grafen.";
Blockly.Msg["COMMUNICATION_DATA"] = "Data";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TITLE"] = "Namn %1 Data %2";
Blockly.Msg["COMMUNICATION_PRINT_DATAS_TOOLTIP"] = "Detta block ska användas i blocket \"Skriv i grafen\". Det måste innehålla namnet på det (text)värde som ska visas och själva värdet.";
Blockly.Msg['SENSORS_TEMPERATURE'] = 'temperatur';
Blockly.Msg['SENSORS_HUMIDITY'] = 'fuktighet (%)';
Blockly.Msg['SENSORS_TEMPERATURE_IN'] = 'i';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE'] = '[RPI-kamera] ta en bild';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Tar en bild med Raspberry Pi-kameran och returnerar bilddata som en NumPy-array med dimensionerna (höjd, bredd, 3).';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE'] = '[RPi-kamera] spela in video i %1 sekunder i %2';
Blockly.Msg['SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Låter dig spela in video med Raspberry Pi-kameran och spara den som en .mp4-fil. Standardstorleken är (640, 480)';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TITLE'] = '[RPi-kamera] sätt bildstorleken till %1';
Blockly.Msg['SENSORS_RPI_CAMERA_CHANGE_SIZE_TOOLTIP'] = IMG_MODULE_PI_CAMERA + Blockly.Tooltip.SEP + 'Låter dig konfigurera storleken på bilder tagna med Raspberry Pi-kameran. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TITLE'] = '[USB-kamera] ta en bild';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_PICTURE_TOOLTIP'] = 'Låter dig ta en bild med en kamera ansluten till en USB-port på Raspberry Pi. Blocket returnerar bilddata som en NumPy-array med dimensionerna (höjd, bredd, 3).';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TITLE'] = '[USB-kamera] spela in video i %1 sekunder i %2';
Blockly.Msg['SENSORS_USB_CAMERA_TAKE_VIDEO_TOOLTIP'] = 'Låter dig spela in video med en kamera ansluten till en USB-port på Raspberry Pi och spara den som en .mp4-fil. Standardstorleken är (640, 480)';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TITLE'] = '[USB-kamera] sätt bildstorleken till %1';
Blockly.Msg['SENSORS_USB_CAMERA_CHANGE_SIZE_TOOLTIP'] = 'Låter dig konfigurera storleken på bilder tagna med en kamera ansluten till en USB-port på Raspberry Pi. Standardstorleken är (640, 480).';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TITLE'] = '[Kameror] spara foto %1 till fil %2';
Blockly.Msg['SENSORS_CV2_CAMERA_SAVE_PICTURE_TOOLTIP'] = 'Låter dig spara bilddata från en kamera till en .jpg-fil i mappen ~/vittascience-api/workspace/static/images på Raspberry Pi.';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TITLE'] = '[Kameror] visa foto %1 i Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TOOLTIP'] = 'Låter dig visa ett foto taget med en kamera ansluten till Raspberry Pi i Vittascience-gränssnittet. Du kan använda bilddata i en variabel eller ange filnamnet direkt.';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TITLE'] = '[Kameror] visa video %1 i Vittascience';
Blockly.Msg['SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TOOLTIP'] = 'Låter dig visa en video tagen med en kamera ansluten till Raspberry Pi i Vittascience-gränssnittet. Ange filmens filnamn för att visa den direkt.';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TITLE'] = '[Kameror] lista över inspelade bilder';
Blockly.Msg['SENSORS_CAMERA_GET_PICTURE_FILES_TOOLTIP'] = 'Returnerar en lista över foton tagna med en kamera och sparade på Raspberry Pi i mappen ~/vittascience-api/workspace/static/images.';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TITLE'] = '[Kameror] lista över inspelade videor';
Blockly.Msg['SENSORS_CAMERA_GET_VIDEO_FILES_TOOLTIP'] = 'Returnerar en lista över videor tagna med en kamera och sparade på Raspberry Pi i mappen ~/vittascience-api/workspace/static/videos.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TITLE'] = '[Sense HAT] temperatur i %1';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar temperaturen i grader Celsius (°C), Fahrenheit (°F) eller Kelvin (K) från Sense HAT:s temperatursensor.';
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TITLE'] = '[Sense HAT] ' + Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg['SENSE_HAT_GET_HUMIDITY_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar fuktigheten (i %) från Sense HAT:s fuktsensor.';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TITLE'] = '[Sense HAT] temperatur i %1 från %2-sensor';
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Returnerar temperaturen i grader Celsius (°C), Fahrenheit (°F) eller Kelvin (K) från Sense HAT:s fuktsensor eller trycksensor.";
Blockly.Msg['SENSE_HAT_GET_TEMPERATURE_PRESSURE'] = 'tryck';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TITLE'] = '[Sense HAT] tryck i %1';
Blockly.Msg['SENSE_HAT_GET_PRESSURE_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Returnerar trycket (i millibar) från Sense HAT:s trycksensor.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TITLE'] = '[Sense HAT] %1 gyroskop %2 %3 accelerometer %4 %5 kompass';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Konfigurerar Sense HAT:s IMU (tröghetsmätningsenhet) sensorer.';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_ON'] = 'aktivera';
Blockly.Msg['SENSE_HAT_SET_IMU_CONFIG_OFF'] = 'inaktivera';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TITLE'] = '[Sense HAT] orientering i %1 (x, y, z)';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + 'Hämtar orienteringen i radianer eller grader (pitch, roll, yaw) från Sense HAT.';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_RADIANS'] = 'radianer';
Blockly.Msg['SENSE_HAT_IMU_GET_ORIENTATION_DEGREES'] = 'grader';
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TITLE'] = "[Sense HAT] hämta kompassorientering";
Blockly.Msg['SENSE_HAT_IMU_GET_COMPASS_TOOLTIP'] = IMG_MODULE_SENSE_HAT + Blockly.Tooltip.SEP + "Hämtar kompassorienteringen från Sense HAT.";
Blockly.Msg["SENSORS_SGP30_READDATA_TITLE"] = "[SGP30-sensor] gas %1";
Blockly.Msg["SENSORS_SGP30_READDATA_TOOLTIP"] = IMG_MODULE_SGP30 + Blockly.Tooltip.SEP + "Returnerar mängden CO2 (i ppm) eller TVOC (i ppb) i luften från SGP30-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SGP30_CO2"] = "koldioxid (CO2) (ppm)";
Blockly.Msg["SENSORS_SGP30_TVOC"] = "flyktiga organiska föreningar (TVOC) (ppb)";
Blockly.Msg["SENSORS_SCD30_READDATA_TITLE"] = "[SCD30-sensor] %1";
Blockly.Msg["SENSORS_SCD30_READDATA_TOOLTIP"] = IMG_MODULE_SCD30 + Blockly.Tooltip.SEP + "Returnerar CO2‑koncentration (i ppm), luftfuktighet (i %) eller temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K) från Grove SCD30-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SCD30_CO2"] = "koldioxid (CO2) (ppm)";
Blockly.Msg['SENSORS_SCD30_TEMP'] = Blockly.Msg['SENSORS_TEMPERATURE'];
Blockly.Msg['SENSORS_SCD30_HUM'] = Blockly.Msg['SENSORS_HUMIDITY'];
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TITLE"] = "[HM330X-sensor] partikelkoncentration %1 (µg/m3)";
Blockly.Msg["SENSORS_HM330X_GETPARTICULE_TOOLTIP"] = IMG_MODULE_HM330X + Blockly.Tooltip.SEP + "Mäter partikelhalten i luften med HM330X-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_HM330X_ATM_PM1"] = "PM1.0";
Blockly.Msg["SENSORS_HM330X_ATM_PM2_5"] = "PM2.5";
Blockly.Msg["SENSORS_HM330X_ATM_PM10"] = "PM10.0";
Blockly.Msg["SENSORS_BMP280_READDATA_TITLE"] = "[BMP280-sensor %1] %2";
Blockly.Msg["SENSORS_BMP280_READDATA_TOOLTIP"] = IMG_MODULE_BMP280 + Blockly.Tooltip.SEP + "Returnerar omgivningstemperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), samt tryck (i Pa). Höjden initieras till 0 när programmet flashas. Fungerar med Grove Barometer Sensor (adress: 0x77, färg: blå) eller HW-611 BMP280-sensor (adress: 0x76, färg: lila). Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_BMP280_TEMP"] = "temperatur";
Blockly.Msg["SENSORS_BMP280_PRESS"] = "tryck (Pa)";
Blockly.Msg["SENSORS_BMP280_ALT"] = "höjd (m)";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TITLE"] = "[DS18B20-sensor] temperatur i %1 på pin %2";
Blockly.Msg["SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP"] = IMG_MODULE_DS18B20 + Blockly.Tooltip.SEP + "Returnerar värdet från DS18B20-vattentäta temperatursensorn i Celsius (°C), Fahrenheit (°F) eller Kelvin (K) på digitala pinnar.";
Blockly.Msg["SENSORS_DHT11_READDATA_TITLE"] = "[DHT11-sensor] %1 på pin %2";
Blockly.Msg["SENSORS_DHT11_READDATA_TOOLTIP"] = IMG_MODULE_DHT11 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) från DHT11-sensorn på digitala pinnar.";
Blockly.Msg["SENSORS_DHT22_READDATA_TITLE"] = "[DHT22-sensor] %1 på pin %2";
Blockly.Msg["SENSORS_DHT22_READDATA_TOOLTIP"] = IMG_MODULE_DHT22 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) med god noggrannhet från DHT22-sensorn på digitala pinnar.";
Blockly.Msg["SENSORS_SHT31_READDATA_TITLE"] = "[SHT31-sensor] %1";
Blockly.Msg["SENSORS_SHT31_READDATA_TOOLTIP"] = IMG_MODULE_SHT31 + Blockly.Tooltip.SEP + "Returnerar temperatur i Celsius (°C), Fahrenheit (°F) eller Kelvin (K), eller luftfuktighet (i %) från SHT31-sensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_GETRAINGAUGE_TITLE"] = "[Regnmätare] tillstånd på pin %1";
Blockly.Msg["SENSORS_GETRAINGAUGE_TOOLTIP"] = IMG_MODULE_RAIN_GAUGE + Blockly.Tooltip.SEP + "Returnerar regnmätarens status (1 om det regnar, annars 0) på digitala pinnar.";
Blockly.Msg["SENSORS_GETANEMOMETER_TITLE"] = "[Vindmätare] tillstånd på pin %1";
Blockly.Msg["SENSORS_GETANEMOMETER_TOOLTIP"] = IMG_MODULE_ANEMOMETER + Blockly.Tooltip.SEP + "Returnerar vindmätarens status (två HIGH-signaler per varv) på digitala pinnar.";
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TITLE"] = "[Solljussensor %1] hämta %2";
Blockly.Msg["SENSORS_SUNLIGHT_GETDATA_TOOLTIP"] = IMG_MODULE_SI1145 + Blockly.Tooltip.SEP + "Returnerar UV-index, IR‑ljus (i lumen) eller synligt ljus (i lumen) från SI1145‑sensorn. Fungerar med Grove Sunlight Sensor eller GY1145. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_SUNLIGHT_UV"] = "UV-index";
Blockly.Msg["SENSORS_SUNLIGHT_VISIBLE"] = "synligt (lumen)";
Blockly.Msg["SENSORS_SUNLIGHT_IR"] = "infrarött (lumen)";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TITLE"] = "[Färgsensor V2] %1";
Blockly.Msg["SENSORS_GROVECOLORV2_GETDATA_TOOLTIP"] = IMG_MODULE_I2C_COLOR + Blockly.Tooltip.SEP + "Läser nivån för en av de tre primärfärgerna med Grove färgsensor V2, returnerar ett värde mellan 0 och 255.";
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TITLE"] = "[Ultraljudssensor %1] hämta %2";
Blockly.Msg["SENSORS_GETGROVEULTRASONIC_TOOLTIP"] = IMG_MODULE_ULTRASONIC + Blockly.Tooltip.SEP + "Returnerar avstånd (i centimeter) från ultraljudssensorn på digitala pinnar. Obs: om det är en Grove-sensor är både TRIG och ECHO kopplade till SIG.";
Blockly.Msg["SENSORS_ULTRASONIC_DISTANCE"] = "avstånd (cm)";
Blockly.Msg["SENSORS_ULTRASONIC_DURATION"] = "tid för rundresa (µs)";
Blockly.Msg["SENSORS_ULTRASONIC_1PIN"] = "på pin";
Blockly.Msg["SENSORS_ULTRASONIC_2PINS"] = "på pinnar ";
Blockly.Msg["SENSORS_GETGESTURE_TITLE"] = "[Gestersensor] gesttyp";
Blockly.Msg["SENSORS_GETGESTURE_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Returnerar gesttypen ('right', 'left', 'up', 'down', 'forward', 'backward', 'clockwise', 'anticlockwise') från Grove gestsensor. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TITLE"] = "[Gestersensor] när gest %1 upptäcks då";
Blockly.Msg["SENSORS_ONGESTUREDETECTED_TOOLTIP"] = IMG_MODULE_GESTURE + Blockly.Tooltip.SEP + "Kör instruktioner om den valda gesten upptäcks av Grove gestsensorn. Anslut sensorn till I2C-porten.";
Blockly.Msg["SENSORS_GESTURE_RIGHT"] = "höger";
Blockly.Msg["SENSORS_GESTURE_LEFT"] = "vänster";
Blockly.Msg["SENSORS_GESTURE_UP"] = "upp";
Blockly.Msg["SENSORS_GESTURE_DOWN"] = "ner";
Blockly.Msg["SENSORS_GESTURE_FORWARD"] = "framåt";
Blockly.Msg["SENSORS_GESTURE_BACKWARD"] = "bakåt";
Blockly.Msg["SENSORS_GESTURE_CLOCKWISE"] = "medurs";
Blockly.Msg["SENSORS_GESTURE_ANTICLOCKWISE"] = "moturs";
Blockly.Msg["SENSORS_GESTURE_WAVE"] = "vinka";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TITLE"] = "[Linjefinnare] status på pin %1";
Blockly.Msg["SENSORS_GETGROVELINEFINDER_TOOLTIP"] = IMG_MODULE_LINE_FINDER + Blockly.Tooltip.SEP + "Returnerar linjeföljarsensorns status (0 eller 1) på digitala pinnar.";
Blockly.Msg["SENSORS_GETGROVEMOTION_TITLE"] = "[PIR-rörelsesensor] rörelsestatus på pin %1";
Blockly.Msg["SENSORS_GETGROVEMOTION_TOOLTIP"] = IMG_MODULE_MOTION + Blockly.Tooltip.SEP + "Returnerar PIR-rörelsesensorstatus (0 vid rörelse, annars 1) på digitala pinnar.";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TITLE"] = "[Piezo vibrationssensor] status på pin %1";
Blockly.Msg["SENSORS_GETPIEZOVIBRATION_TOOLTIP"] = IMG_MODULE_VIBRATIONS + Blockly.Tooltip.SEP + "Returnerar vibrationsstatus (0 eller 1) från piezo-vibrationssensorn på digitala pinnar.";
Blockly.Msg["SENSORS_GETGROVETILT_TITLE"] = "[Tiltmodul] tiltstatus på pin %1";
Blockly.Msg["SENSORS_GETGROVETILT_TOOLTIP"] = IMG_MODULE_TILT + Blockly.Tooltip.SEP + "Returnerar Grove tilt-tillstånd (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TITLE"] = "[Servomotor] ställ in vinkel till %1 på stift %2";
Blockly.Msg["ACTUATORS_SERVO_SETANGLE_TOOLTIP"] = IMG_MODULE_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra servomotorns vinkel (0–180) på digitala stift.";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE"] = "[Continuous Servomotor] ställ in hastighet till %1 (%) riktning %2 på stift %3";
Blockly.Msg["ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP"] = IMG_MODULE_CONTINUOUS_SERVO + Blockly.Tooltip.SEP + "Gör det möjligt att styra den kontinuerliga servons hastighet (0–100 %) på PWM-stift.";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TITLE"] = "[Motor] ställ in effekt till %1 på stift %2";
Blockly.Msg["ACTUATORS_MOTOR_SETPOWER_TOOLTIP"] = IMG_MODULE_MOTOR + Blockly.Tooltip.SEP + "Gör det möjligt att styra likströmsmotorns effekt (0–100 %) på digitala stift. Varning: Raspberry Pi måste drivas av ett externt batteri för att ge tillräcklig energi till DC-motorn.";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE"] = "[Vibration motor] ställ motor i tillstånd %1 på stift %2";
Blockly.Msg["ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP"] = IMG_MODULE_VIBRATION_MOTOR + Blockly.Tooltip.SEP + "Gör det möjligt att styra tillståndet för Grove-vibrationsmotorn (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TITLE"] = "[Relay module] ställ relä till tillstånd %1 på stift %2";
Blockly.Msg["ACTUATORS_GROVERELAY_CONTROL_TOOLTIP"] = IMG_MODULE_RELAY + Blockly.Tooltip.SEP + "Gör det möjligt att styra tillståndet för Grove-relämodulen (0 eller 1) på digitala stift.";
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TITLE"] = "[MOSFET] ställ in tillstånd till %1 på stift %2";
Blockly.Msg["ACTUATORS_MOSFET_SETSTATE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att sätta MOSFET-transistorns tillstånd till HIGH eller LOW på PWM-stiften.";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE"] = "[MOSFET] ställ in värde till %1 (%) på stift %2";
Blockly.Msg["ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att styra MOSFET-transistorns arbetscykel (0–100 %) på PWM-stift.";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TITLE"] = "[MOSFET] ställ in cykelfrekvens till %1 (Hz) på stift %2";
Blockly.Msg["ACTUATORS_MOSFET_SETFREQUENCY_TOOLTIP"] = IMG_MODULE_MOSFET + Blockly.Tooltip.SEP + "Gör det möjligt att styra MOSFET-cykelfrekvensen (i Hz) på PWM-stift.";
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TITLE"] = "[Buzzer/Speaker] spela upp musik %1 på %2";
Blockly.Msg["ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att spela vald musik på Grove-buzzer-modulen (eller högtalare) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TITLE"] = "[Buzzer/Speaker] spela noter på";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_NOTES_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att spela noter på Grove-buzzer-modulen (eller högtalare) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TITLE"] = "ton %1 i oktav %2 med varaktighet %3";
Blockly.Msg["ACTUATORS_MUSIC_NOTE_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Definiera en ton med oktav och varaktighet.";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE"] = "[Buzzer/Speaker] spela frekvens %1 i %2 (ms) på %3";
Blockly.Msg["ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att spela en frekvens (heltal) på Grove-buzzer-modulen (eller högtalare) på digitala stift.";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TITLE"] = "[Buzzer/Speaker] stoppa musiken på %1";
Blockly.Msg["ACTUATORS_MUSIC_STOP_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "Gör det möjligt att stoppa musiken från Grove-buzzer-modulen (eller högtalare) på digitala stift.";
Blockly.Msg['NETWORK_GET_PI_NAME_TITLE'] = "[Raspberry Pi server] hostname %1";
Blockly.Msg['NETWORK_GET_PI_NAME_TOOLTIP'] = 'Gör det möjligt för gränssnittet att hämta namnet på din Raspberry Pi och konfigurera installationsinstruktionerna för Raspberry Pi OS. Det gör också att gränssnittet kan kommunicera med Python-servern som körs på kortet.';
Blockly.Msg['ROBOTS_GO_FORWARD'] = 'kör framåt';
Blockly.Msg['ROBOTS_GO_BACKWARD'] = 'kör bakåt';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TITLE'] = '[Yahboom G1 - Ultraljud] %1';
Blockly.Msg['ROBOTS_YAHBOOM_GETULTRASONIC_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Mäter avståndet (i cm) eller rundresan för vågen (i µs) framför Yahboom G1 Tank-roboten med ultraljudssensorn.';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TITLE'] = '[Yahboom G1 - svart linje] sensorstatus %1';
Blockly.Msg['ROBOTS_YAHBOOM_GET_LINE_FINDER_STATE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Returnerar tillståndet för en av de fyra infraröda svartlinjesensorerna (0 om detekterat annars 1) som sitter under Yahboom G1 Tank-roboten. Namnen P1, P2, P3 eller P4 står tryckta under roboten. Använd de fysiska potentiometrarna för att justera sensorns detektion efter kretsens förhållanden.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TITLE'] = '[Yahboom G1] styr front-LEDs %1 till %2';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra de två front-LED:arna på Yahboom G1 Tank-roboten genom att slå rött, grönt eller blått på/av.';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TITLE'] = '[Yahboom G1] styr RGB-LEDs med R %1 G %2 B %3';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_RGB_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra de två RGB-LED:arna på framsidan av Yahboom G1 Tank-roboten med värdena R, G och B (0–255).';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TITLE'] = '[Yahboom G1] styr RGB-LED:arna till %1';
Blockly.Msg['ROBOTS_YAHBOOM_SET_LED_COLOR_PALETTE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra de två RGB-LED:arna längst fram på Yahboom G1 Tank-roboten genom att välja en färg från paletten.';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TITLE'] = '[Front servo motor] ställ in PAN-vinkeln till %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_LED_SERVO_SETANGLE_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Styr PAN-vinkeln på den främre servomotorn (0–180) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TITLE'] = '[Yahboom G1 - KEY Button] vänta på tryck';
Blockly.Msg['ROBOTS_YAHBOOM_WAIT_KEY_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Väntar på att KEY-knappen på Yahboom G1 Tank-robotens kort trycks ned.';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TITLE'] = '[Yahboom G1 Tank] %1 med hastighet %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SETGO_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra motorerna på Yahboom G1 Tank-roboten för att köra den framåt eller bakåt med hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TITLE'] = '[Yahboom G1 Tank] stoppa robotens motorer';
Blockly.Msg['ROBOTS_YAHBOOM_STOP_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att stoppa motorerna på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TITLE'] = '[Yahboom G1 Tank] rotera %1 med hastighet %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra motorerna på Yahboom G1 Tank-roboten för att rotera den (vänster eller höger) med hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_RIGHT'] = 'höger';
Blockly.Msg['ROBOTS_YAHBOOM_TURN_LEFT'] = 'vänster';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TITLE'] = '[Yahboom G1 Tank] snurra %1 med hastighet %2 %';
Blockly.Msg['ROBOTS_YAHBOOM_SPIN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra motorerna på Yahboom G1 Tank-roboten för att rotera den (vänster eller höger) med hastighet mellan 0 och 100%.';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TITLE'] = '[Yahboom G1 Tank] styr motor %1 riktning %2 hastighet %3 (%)';
Blockly.Msg['ROBOTS_YAHBOOM_CONTROLMOTOR_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra höger och vänster motor genom att ändra riktning (↻: FRAMÅT, ↺: BAKÅT) och hastighet (0–100 %) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_LEFT'] = 'vänster';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_RIGHT'] = 'höger';
Blockly.Msg['ROBOTS_YAHBOOM_MOTOR_BOTH'] = 'vänster & höger';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TITLE'] = '[Camera Servomotors] ställ in PAN-vinkel till %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_PAN_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra vinkeln (PAN - horisontell) på servomotorn till USB-kameramodulen (0–180) på Yahboom G1 Tank-roboten.';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TITLE'] = '[Camera Servomotors] ställ in TILT-vinkel till %1 (°)';
Blockly.Msg['ROBOTS_YAHBOOM_CAMERA_SETANGLE_TILT_TOOLTIP'] = IMG_ROBOT_YAHBOOM_G1TANK + Blockly.Tooltip.SEP + 'Gör det möjligt att styra vinkeln (TILT - vertikal) på servomotorn till USB-kameramodulen (0–180) på Yahboom G1 Tank-roboten.';
