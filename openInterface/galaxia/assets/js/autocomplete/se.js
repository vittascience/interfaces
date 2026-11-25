// galaxia (Thingz) - thingz module

// galaxia - accel/compass

// galaxia - button / touch

// galaxia - led

// galaxia - log

// galaxia - radio

// galaxia - sound

// galaxia - display

ACMsg.GALAXIA_THINGZ_MODULE = "Thingz-modul för Galaxia-kortet: få åtkomst till inbyggda komponenter (knappar, touchplattor, LED, sensorer, radio, display, logg).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Galaxias fysiska knapp A (instans av <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Galaxias fysiska knapp B (instans av <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Galaxias beröringsknapp Nord (instans av <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Galaxias beröringsknapp Syd (instans av <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Galaxias beröringsknapp Ost (instans av <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Galaxias beröringsknapp Väst (instans av <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "Galaxias RGB-LED (instans av <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Galaxias accelerometer (instans av <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Galaxias magnetometer/kompass (instans av <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Galaxias ljudutgång (jack) (instans av <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Galaxias radiokommunikation (instans av <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Galaxias LCD-display (instans av <b>Display</b>).";
ACMsg.GALAXIA_THINGZ_LOG = "Galaxias interna CSV-logg (instans av <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Returnerar den aktuella temperaturen från den interna sensorn.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Applicerar en kalibreringsoffset (i grader) till den interna temperatursensorn.";
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Thingz-modul för accelerometer och kompass.";
ACMsg.GALAXIA_ACCEL_CLASS = "Hantera Galaxias accelerometer.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Skapa ett <b>Accel</b>-objekt.";
ACMsg.GALAXIA_COMPASS_CLASS = "Hantera Galaxias magnetometer.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Skapa ett <b>Compass</b>-objekt.";
ACMsg.GALAXIA_ACCEL_GET_X = "Returnerar accelerationsvärdet på X-axeln (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Returnerar accelerationsvärdet på Y-axeln (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Returnerar accelerationsvärdet på Z-axeln (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Returnerar accelerationsvärden för alla tre axlar som en lista: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Returnerar aktuell gest (t.ex. upp, ner, vänster, höger, uppåtvänd, nedåtvänd, fritt fall, 3g, 6g, 8g, skakning, ingen).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Returnerar <b>True</b> om aktuell gest matchar <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Returnerar <b>True</b> om <b>gesture</b> inträffade sedan senaste anropet.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Returnerar gesthistoriken (nyaste sist).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Registrerar en callback för gesthändelser; gesten skickas till callbacken.";
ACMsg.GALAXIA_COMPASS_GET_X = "Returnerar magnetfältets värde på X-axeln (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Returnerar magnetfältets värde på Y-axeln (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Returnerar magnetfältets värden för de tre axlarna som en lista: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Returnerar aktuell riktning (grader).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Kalibrerar magnetometern: rotera kortet runt Z-axeln under kalibreringen.";
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Thingz-modul för knappar.";
ACMsg.GALAXIA_BUTTON_CLASS = "Hantera Galaxias fysiska knappar.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Skapa ett <b>Button</b>-objekt.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Returnerar <b>True</b> om knappen för närvarande är nedtryckt.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Returnerar <b>True</b> om knappen trycktes sedan senaste anropet.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Returnerar antalet tryck sedan senaste anropet.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Registrerar en callback för tryckhändelsen; knappobjektet skickas till callbacken.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Thingz-modul för beröringsknappar.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Hantera Galaxias kapacitiva beröringsknappar.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Skapa ett <b>ButtonTouch</b>-objekt.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Returnerar <b>True</b> om beröringsknappen för tillfället är berörd.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Returnerar <b>True</b> om beröringsknappen vidrördes sedan senaste anropet.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Returnerar antalet beröringar sedan senaste anropet.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Registrerar en callback för beröringshändelsen; knappobjektet skickas till callbacken.";
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Thingz LED-modul.";
ACMsg.GALAXIA_LED_CLASS = "Hantera Galaxias RGB-LED.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Skapa ett <b>Led</b>-objekt.";
ACMsg.GALAXIA_LED_SET_COLORS = "Ställer in LED-färg med <b>red</b>, <b>green</b>, <b>blue</b>-värden (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Ställer in värdet för den röda kanalen (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Ställer in värdet för den gröna kanalen (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Ställer in värdet för den blå kanalen (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Returnerar nuvarande värde för den röda kanalen (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Returnerar nuvarande värde för den gröna kanalen (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Returnerar nuvarande värde för den blå kanalen (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Returnerar omgivande ljusnivå (0 = mörkt, 100 = ljust).";
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Thingz-modul för intern datalogger.";
ACMsg.GALAXIA_LOG_CLASS = "Spara data i Galaxias interna minne som CSV (exporteras till USB som data.csv vid uppstart).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Skapa ett <b>Log</b>-objekt.";
ACMsg.GALAXIA_LOG_ADD = "Lägg till en rad i loggen. Data är en lista med tupler: (column_name, value).";
ACMsg.GALAXIA_LOG_DELETE = "Radera all data som sparats i loggen.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Definierar CSV-kolumner (nollställer loggen varje gång kolumnerna omdefinieras).";
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Thingz-modul för radio.";
ACMsg.GALAXIA_RADIO_CLASS = "Skicka och ta emot meddelanden mellan kort.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Skapa ett <b>Radio</b>-objekt.";
ACMsg.GALAXIA_RADIO_SEND = "Sänder ett textmeddelande till närliggande kort på samma kanal.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Väntar på och returnerar mottaget meddelande.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Ställer in radiokanalen (1 till 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Returnerar aktuell radiokanal.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Returnerar radio-MAC-adressen som bytes.";
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Thingz-ljudmodul.";
ACMsg.GALAXIA_SOUND_CLASS = "Spela upp ljud via Galaxias jackkontakt.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Skapa ett <b>Sound</b>-objekt.";
ACMsg.GALAXIA_SOUND_PLAY = "Slår på/av frekvensgenerering på jackuttaget och ställer in frekvensen (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Ställer in utgångsfrekvensen i Hz.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Ställer in volymen (0–100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Spelar upp en WAV-fil från den angivna sökvägen.";
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Thingz displaymodul.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Styr Galaxias LCD-display.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Skapa ett <b>Display</b>-objekt.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Plot-gränssnitt (instans av <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Konsolgränssnitt som visar REPL-utdata (instans av <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Gränssnitt för rå grafik (instans av <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Thingz display-konsolundermodul.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Visa REPL-utdata på skärmen.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Skapa ett <b>Console</b>-objekt.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Visar REPL på displayen.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Thingz display-plotundermodul.";
ACMsg.GALAXIA_PLOT_CLASS = "Använd LCD-skärmen som ett diagram.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Skapa ett <b>Plot</b>-objekt.";
ACMsg.GALAXIA_PLOT_SHOW = "Visar diagrammet på displayen.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Lägger till en ny punkt i diagrammet (Y-värde).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Ställer in Y-skalan med min- och maxvärden.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Konfigurerar en funktion som anropas var <b>interval</b> sekund för att lägga till en punkt.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Thingz display-undermodul för rå grafik.";
ACMsg.GALAXIA_RAW_CLASS = "Använd LCD-skärmen för att visa grafiska element.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Skapa ett <b>Raw</b>-objekt.";
ACMsg.GALAXIA_RAW_SHOW = "Visar gränssnittet för rå grafik.";
ACMsg.GALAXIA_RAW_PRINT = "Skriver ut texten <b>txt</b> på positionen (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Visar en BMP-fil från <b>path</b> på positionen (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Bildelement för rågränssnittet.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Skapar ett bildelement från en BMP-fil och visar det.";
ACMsg.GALAXIA_IMG_SHOW = "Visa/dölj bilden.";
ACMsg.GALAXIA_IMG_X = "Ställer in x-positionen.";
ACMsg.GALAXIA_IMG_Y = "Ställer in y-positionen.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Ersätter vita pixlar med en angiven färg.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Returnerar <b>True</b> om bilden visas.";
ACMsg.GALAXIA_IMG_GET_X = "Returnerar x-positionen.";
ACMsg.GALAXIA_IMG_GET_Y = "Returnerar y-positionen.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Returnerar bildens bredd.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Returnerar bildens höjd.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Returnerar den aktuella färgen som ersätter vitt.";
ACMsg.GALAXIA_RECT_CLASS = "Rektangelement för rågränssnittet.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Skapar ett rektangelement och visar det.";
ACMsg.GALAXIA_RECT_SHOW = "Visa/dölj rektangeln.";
ACMsg.GALAXIA_RECT_X = "Ställer in x-positionen.";
ACMsg.GALAXIA_RECT_Y = "Ställer in y-positionen.";
ACMsg.GALAXIA_RECT_COLOR = "Ställer in rektangelns färg.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Returnerar <b>True</b> om rektangeln visas.";
ACMsg.GALAXIA_RECT_GET_X = "Returnerar x-positionen.";
ACMsg.GALAXIA_RECT_GET_Y = "Returnerar y-positionen.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Returnerar rektangelns bredd.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Returnerar rektangelns höjd.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Returnerar rektangelns färg.";
ACMsg.GALAXIA_TEXT_CLASS = "Textelement för rågränssnittet.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Skapar ett textelement och visar det.";
ACMsg.GALAXIA_TEXT_SHOW = "Visa/dölj texten.";
ACMsg.GALAXIA_TEXT_X = "Ställer in x-positionen.";
ACMsg.GALAXIA_TEXT_Y = "Ställer in y-positionen.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Ställer in den visade texten.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Returnerar <b>True</b> om texten visas.";
ACMsg.GALAXIA_TEXT_GET_X = "Returnerar x-positionen.";
ACMsg.GALAXIA_TEXT_GET_Y = "Returnerar y-positionen.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Returnerar textens bredd.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Returnerar textens höjd.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Returnerar textens färg.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Returnerar den aktuella texten (obs: dokumentationen anger int).";
