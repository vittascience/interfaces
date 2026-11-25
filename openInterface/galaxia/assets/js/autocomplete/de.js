// galaxia (Thingz) - thingz module

// galaxia - accel/compass

// galaxia - button / touch

// galaxia - led

// galaxia - log

// galaxia - radio

// galaxia - sound

// galaxia - display

ACMsg.GALAXIA_THINGZ_MODULE = "Thingz-Modul für das Galaxia-Board: Zugriff auf eingebaute Komponenten (Tasten, Touchpads, LED, Sensoren, Funk, Display, Log).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Die physische Taste A von Galaxia (Instanz von <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Die physische Taste B von Galaxia (Instanz von <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Die Touch-Taste Nord von Galaxia (Instanz von <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Die Touch-Taste Süd von Galaxia (Instanz von <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Die Touch-Taste Ost von Galaxia (Instanz von <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Die Touch-Taste West von Galaxia (Instanz von <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "Die RGB-LED von Galaxia (Instanz von <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Der Beschleunigungssensor von Galaxia (Instanz von <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Das Magnetometer/der Kompass von Galaxia (Instanz von <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Der Klangausgang (Klinke) von Galaxia (Instanz von <b>Sound</b).";
ACMsg.GALAXIA_THINGZ_RADIO = "Die Funkkommunikation von Galaxia (Instanz von <b>Radio</b).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Das LCD-Display von Galaxia (Instanz von <b>Display</b).";
ACMsg.GALAXIA_THINGZ_LOG = "Der interne CSV-Logger von Galaxia (Instanz von <b>Log</b).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Gibt die aktuelle Temperatur des internen Sensors zurück.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Wendet einen Kalibrierungsoffset (in Grad) auf den internen Temperatursensor an.";
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Thingz-Modul für Beschleunigungssensor und Kompass.";
ACMsg.GALAXIA_ACCEL_CLASS = "Steuert den Beschleunigungssensor von Galaxia.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Erzeugt ein <b>Accel</b>-Objekt.";
ACMsg.GALAXIA_COMPASS_CLASS = "Steuert das Magnetometer von Galaxia.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Erzeugt ein <b>Compass</b>-Objekt.";
ACMsg.GALAXIA_ACCEL_GET_X = "Gibt die Beschleunigung auf der X-Achse zurück (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Gibt die Beschleunigung auf der Y-Achse zurück (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Gibt die Beschleunigung auf der Z-Achse zurück (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Gibt die 3-Achsen-Beschleunigungswerte als Liste zurück: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Gibt die aktuelle Geste zurück (z. B. oben, unten, links, rechts, mit der Anzeige nach oben, mit der Anzeige nach unten, freier Fall, 3g, 6g, 8g, Schütteln, keine).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Gibt <b>True</b> zurück, wenn die aktuelle Geste mit <b>gesture</b> übereinstimmt.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Gibt <b>True</b> zurück, wenn <b>gesture</b> seit dem letzten Aufruf aufgetreten ist.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Gibt die Gestenhistorie zurück (älteste zuerst, neueste zuletzt).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Registriert einen Callback für Gestenereignisse; die Geste wird an den Callback übergeben.";
ACMsg.GALAXIA_COMPASS_GET_X = "Gibt den Magnetfeldwert auf der X-Achse zurück (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Gibt den Magnetfeldwert auf der Y-Achse zurück (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Gibt die Magnetfeldwerte der 3 Achsen als Liste zurück: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Gibt die aktuelle Richtung (Grad) zurück.";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Kalibriert das Magnetometer: Während der Kalibrierung das Board um die Z-Achse drehen.";
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Thingz-Tastenmodul.";
ACMsg.GALAXIA_BUTTON_CLASS = "Steuert die physischen Tasten von Galaxia.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Erzeugt ein <b>Button</b>-Objekt.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Gibt <b>True</b> zurück, wenn die Taste momentan gedrückt ist.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Gibt <b>True</b> zurück, wenn die Taste seit dem letzten Aufruf gedrückt wurde.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Gibt die Anzahl der Drücke seit dem letzten Aufruf zurück.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Registriert einen Callback für das Druck-Ereignis; das Button-Objekt wird an den Callback übergeben.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Thingz-Touch-Tasten-Modul.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Steuert die kapazitiven Touch-Tasten von Galaxia.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Erzeugt ein <b>ButtonTouch</b>-Objekt.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Gibt <b>True</b> zurück, wenn die Touch-Taste gerade berührt wird.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Gibt <b>True</b> zurück, wenn die Touch-Taste seit dem letzten Aufruf berührt wurde.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Gibt die Anzahl der Berührungen seit dem letzten Aufruf zurück.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Registriert einen Callback für das Touch-Ereignis; das Button-Objekt wird an den Callback übergeben.";
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Thingz-LED-Modul.";
ACMsg.GALAXIA_LED_CLASS = "Steuert die RGB-LED von Galaxia.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Erzeugt ein <b>Led</b>-Objekt.";
ACMsg.GALAXIA_LED_SET_COLORS = "Setzt die LED-Farbe mit den Werten <b>red</b>, <b>green</b>, <b>blue</b> (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Setzt den Wert des Rot-Kanals (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Setzt den Wert des Grün-Kanals (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Setzt den Wert des Blau-Kanals (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Gibt den aktuellen Wert des Rot-Kanals zurück (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Gibt den aktuellen Wert des Grün-Kanals zurück (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Gibt den aktuellen Wert des Blau-Kanals zurück (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Gibt den Umgebungslichtwert zurück (0 = dunkel, 100 = hell).";
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Thingz-Modul für den internen Datenlogger.";
ACMsg.GALAXIA_LOG_CLASS = "Speichert Daten im internen Speicher von Galaxia als CSV (wird beim Start per USB als data.csv exportiert).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Erzeugt ein <b>Log</b>-Objekt.";
ACMsg.GALAXIA_LOG_ADD = "Fügt dem Log eine Zeile hinzu. Daten sind eine Liste von Tupeln: (Spaltenname, Wert).";
ACMsg.GALAXIA_LOG_DELETE = "Löscht alle im Log gespeicherten Daten.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Definiert die CSV-Spalten (setzt das Log bei jeder Neudefinition der Spalten zurück).";
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Thingz-Funkmodul.";
ACMsg.GALAXIA_RADIO_CLASS = "Sendet und empfängt Nachrichten zwischen Boards.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Erzeugt ein <b>Radio</b>-Objekt.";
ACMsg.GALAXIA_RADIO_SEND = "Sendet eine Zeichenketten-Nachricht an benachbarte Boards auf demselben Kanal.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Wartet auf eine empfangene Nachricht und gibt sie zurück.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Setzt den Funkkanal (1 bis 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Gibt den aktuellen Funkkanal zurück.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Gibt die MAC-Adresse des Funkmoduls als Bytes zurück.";
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Thingz-Sound-Modul.";
ACMsg.GALAXIA_SOUND_CLASS = "Gibt Ton über Galaxias Klinkenanschluss aus.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Erstellt ein <b>Sound</b>-Objekt.";
ACMsg.GALAXIA_SOUND_PLAY = "Aktiviert/deaktiviert die Frequenz­erzeugung am Klinkenanschluss und legt die Frequenz (Hz) fest.";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Legt die Ausgabefrequenz in Hz fest.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Legt die Lautstärke (0 bis 100) fest.";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Spielt eine WAV-Datei vom angegebenen Pfad ab.";
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Thingz-Display-Modul.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Steuert das Galaxia-LCD-Display.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Erstellt ein <b>Display</b>-Objekt.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Plot-Schnittstelle (Instanz von <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Konsolenschnittstelle zur Anzeige der REPL-Ausgabe (Instanz von <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Rohgrafik-Schnittstelle (Instanz von <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Thingz-Display-Konsolen-Submodul.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Zeigt die REPL-Ausgabe auf dem Bildschirm an.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Erstellt ein <b>Console</b>-Objekt.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Zeigt das REPL auf dem Display an.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Thingz-Display-Plot-Submodul.";
ACMsg.GALAXIA_PLOT_CLASS = "Verwendet das LCD als Plot.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Erstellt ein <b>Plot</b>-Objekt.";
ACMsg.GALAXIA_PLOT_SHOW = "Zeigt den Plot auf dem Display an.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Fügt dem Plot einen neuen Punkt hinzu (Y-Wert).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Legt die Y-Skala mit Minimal- und Maximalwerten fest.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Konfiguriert eine Funktion, die alle <b>interval</b> Sekunden aufgerufen wird, um einen Punkt hinzuzufügen.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Thingz-Display-Rohgrafik-Submodul.";
ACMsg.GALAXIA_RAW_CLASS = "Verwendet das LCD zur Anzeige grafischer Elemente.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Erstellt ein <b>Raw</b>-Objekt.";
ACMsg.GALAXIA_RAW_SHOW = "Zeigt die Rohgrafik-Schnittstelle an.";
ACMsg.GALAXIA_RAW_PRINT = "Gibt den Text <b>txt</b> an Position (<b>x</b>, <b>y</b>) aus.";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Gibt eine BMP-Datei vom Pfad <b>path</b> an Position (<b>x</b>, <b>y</b>) aus.";
ACMsg.GALAXIA_IMG_CLASS = "Bildelement für die Rohgrafik-Schnittstelle.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Erstellt ein Bildelement aus einer BMP-Datei und zeigt es an.";
ACMsg.GALAXIA_IMG_SHOW = "Bild anzeigen/ausblenden.";
ACMsg.GALAXIA_IMG_X = "Legt die X-Position fest.";
ACMsg.GALAXIA_IMG_Y = "Legt die Y-Position fest.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Ersetzt weiße Pixel durch eine angegebene Farbe.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Gibt <b>Wahr</b> zurück, wenn das Bild angezeigt wird.";
ACMsg.GALAXIA_IMG_GET_X = "Gibt die X-Position zurück.";
ACMsg.GALAXIA_IMG_GET_Y = "Gibt die Y-Position zurück.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Gibt die Bildbreite zurück.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Gibt die Bildhöhe zurück.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Gibt die aktuelle Ersatzfarbe für Weiß zurück.";
ACMsg.GALAXIA_RECT_CLASS = "Rechteckelement für die Rohgrafik-Schnittstelle.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Erstellt ein Rechteckelement und zeigt es an.";
ACMsg.GALAXIA_RECT_SHOW = "Rechteck anzeigen/ausblenden.";
ACMsg.GALAXIA_RECT_X = "Legt die X-Position fest.";
ACMsg.GALAXIA_RECT_Y = "Legt die Y-Position fest.";
ACMsg.GALAXIA_RECT_COLOR = "Legt die Rechteckfarbe fest.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Gibt <b>Wahr</b> zurück, wenn das Rechteck angezeigt wird.";
ACMsg.GALAXIA_RECT_GET_X = "Gibt die X-Position zurück.";
ACMsg.GALAXIA_RECT_GET_Y = "Gibt die Y-Position zurück.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Gibt die Rechteckbreite zurück.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Gibt die Rechteckhöhe zurück.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Gibt die Rechteckfarbe zurück.";
ACMsg.GALAXIA_TEXT_CLASS = "Textelement für die Rohgrafik-Schnittstelle.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Erstellt ein Textelement und zeigt es an.";
ACMsg.GALAXIA_TEXT_SHOW = "Text anzeigen/ausblenden.";
ACMsg.GALAXIA_TEXT_X = "Legt die X-Position fest.";
ACMsg.GALAXIA_TEXT_Y = "Legt die Y-Position fest.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Legt den angezeigten Text fest.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Gibt <b>Wahr</b> zurück, wenn der Text angezeigt wird.";
ACMsg.GALAXIA_TEXT_GET_X = "Gibt die X-Position zurück.";
ACMsg.GALAXIA_TEXT_GET_Y = "Gibt die Y-Position zurück.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Gibt die Textbreite zurück.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Gibt die Texthöhe zurück.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Gibt die Textfarbe zurück.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Gibt den aktuellen Text zurück (Hinweis: In der Dokumentation steht int).";
