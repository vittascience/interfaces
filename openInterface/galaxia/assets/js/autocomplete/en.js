// galaxia (Thingz) - thingz module
ACMsg.GALAXIA_THINGZ_MODULE = "Thingz module for the Galaxia board: access built-in components (buttons, touch pads, LED, sensors, radio, display, log).";
ACMsg.GALAXIA_THINGZ_BUTTON_A = "Galaxia's physical button A (instance of <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_BUTTON_B = "Galaxia's physical button B (instance of <b>Button</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_N = "Galaxia's touch button North (instance of <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_S = "Galaxia's touch button South (instance of <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_E = "Galaxia's touch button East (instance of <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_TOUCH_W = "Galaxia's touch button West (instance of <b>ButtonTouch</b>).";
ACMsg.GALAXIA_THINGZ_LED = "Galaxia's RGB LED (instance of <b>Led</b>).";
ACMsg.GALAXIA_THINGZ_ACCELEROMETER = "Galaxia's accelerometer (instance of <b>Accel</b>).";
ACMsg.GALAXIA_THINGZ_COMPASS = "Galaxia's magnetometer/compass (instance of <b>Compass</b>).";
ACMsg.GALAXIA_THINGZ_SOUND = "Galaxia's jack sound output (instance of <b>Sound</b>).";
ACMsg.GALAXIA_THINGZ_RADIO = "Galaxia's radio communication (instance of <b>Radio</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY = "Galaxia's LCD display (instance of <b>Display</b>).";
ACMsg.GALAXIA_THINGZ_LOG = "Galaxia's internal CSV logger (instance of <b>Log</b>).";
ACMsg.GALAXIA_THINGZ_TEMPERATURE = "Returns the current temperature using the internal sensor.";
ACMsg.GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET = "Applies a calibration offset (in degrees) to the internal temperature sensor.";

// galaxia - accel/compass
ACMsg.GALAXIA_THINGZ_ACCEL_MODULE = "Thingz accelerometer and compass module.";
ACMsg.GALAXIA_ACCEL_CLASS = "Control Galaxia's accelerometer.";
ACMsg.GALAXIA_ACCEL_CONSTRUCTOR = "Create an <b>Accel</b> object.";
ACMsg.GALAXIA_COMPASS_CLASS = "Control Galaxia's magnetometer.";
ACMsg.GALAXIA_COMPASS_CONSTRUCTOR = "Create a <b>Compass</b> object.";
ACMsg.GALAXIA_ACCEL_GET_X = "Returns the acceleration value on the X axis (mG).";
ACMsg.GALAXIA_ACCEL_GET_Y = "Returns the acceleration value on the Y axis (mG).";
ACMsg.GALAXIA_ACCEL_GET_Z = "Returns the acceleration value on the Z axis (mG).";
ACMsg.GALAXIA_ACCEL_GET_VALUES = "Returns the 3-axis acceleration values as a list: [x, y, z].";
ACMsg.GALAXIA_ACCEL_CURRENT_GESTURE = "Returns the current gesture (e.g. up, down, left, right, face up, face down, freefall, 3g, 6g, 8g, shake, none).";
ACMsg.GALAXIA_ACCEL_IS_GESTURE = "Returns <b>True</b> if the current gesture matches <b>gesture</b>.";
ACMsg.GALAXIA_ACCEL_WAS_GESTURE = "Returns <b>True</b> if <b>gesture</b> occurred since the last call.";
ACMsg.GALAXIA_ACCEL_GET_GESTURES = "Returns the gesture history (most recent last).";
ACMsg.GALAXIA_ACCEL_ON_GESTURE = "Registers a callback for a gesture event; the gesture is passed to the callback.";
ACMsg.GALAXIA_COMPASS_GET_X = "Returns the magnetic field value on the X axis (uT).";
ACMsg.GALAXIA_COMPASS_GET_Y = "Returns the magnetic field value on the Y axis (uT).";
ACMsg.GALAXIA_COMPASS_GET_VALUES = "Returns the 3-axis magnetic field values as a list: [x, y, z].";
ACMsg.GALAXIA_COMPASS_HEADING = "Returns the current heading (degrees).";
ACMsg.GALAXIA_COMPASS_CALIBRATE = "Calibrates the magnetometer: rotate the board around the Z axis during calibration.";

// galaxia - button / touch
ACMsg.GALAXIA_THINGZ_BUTTON_MODULE = "Thingz button module.";
ACMsg.GALAXIA_BUTTON_CLASS = "Control Galaxia's physical buttons.";
ACMsg.GALAXIA_BUTTON_CONSTRUCTOR = "Create a <b>Button</b> object.";
ACMsg.GALAXIA_BUTTON_IS_PRESSED = "Returns <b>True</b> if the button is currently pressed.";
ACMsg.GALAXIA_BUTTON_WAS_PRESSED = "Returns <b>True</b> if the button was pressed since the last call.";
ACMsg.GALAXIA_BUTTON_GET_PRESSES = "Returns the number of presses since the last call.";
ACMsg.GALAXIA_BUTTON_ON_PRESSED = "Registers a callback for the press event; the button object is passed to the callback.";
ACMsg.GALAXIA_THINGZ_BUTTON_TOUCH_MODULE = "Thingz touch button module.";
ACMsg.GALAXIA_BUTTONTOUCH_CLASS = "Control Galaxia's capacitive touch buttons.";
ACMsg.GALAXIA_BUTTONTOUCH_CONSTRUCTOR = "Create a <b>ButtonTouch</b> object.";
ACMsg.GALAXIA_BUTTONTOUCH_IS_TOUCHED = "Returns <b>True</b> if the touch button is currently touched.";
ACMsg.GALAXIA_BUTTONTOUCH_WAS_TOUCHED = "Returns <b>True</b> if the touch button was touched since the last call.";
ACMsg.GALAXIA_BUTTONTOUCH_GET_TOUCHES = "Returns the number of touches since the last call.";
ACMsg.GALAXIA_BUTTONTOUCH_ON_TOUCHED = "Registers a callback for the touch event; the button object is passed to the callback.";

// galaxia - led
ACMsg.GALAXIA_THINGZ_LED_MODULE = "Thingz LED module.";
ACMsg.GALAXIA_LED_CLASS = "Control Galaxia's RGB LED.";
ACMsg.GALAXIA_LED_CONSTRUCTOR = "Create a <b>Led</b> object.";
ACMsg.GALAXIA_LED_SET_COLORS = "Sets the LED color using <b>red</b>, <b>green</b>, <b>blue</b> values (0-255).";
ACMsg.GALAXIA_LED_SET_RED = "Sets the red channel value (0-255).";
ACMsg.GALAXIA_LED_SET_GREEN = "Sets the green channel value (0-255).";
ACMsg.GALAXIA_LED_SET_BLUE = "Sets the blue channel value (0-255).";
ACMsg.GALAXIA_LED_GET_RED = "Returns the current red channel value (0-255).";
ACMsg.GALAXIA_LED_GET_GREEN = "Returns the current green channel value (0-255).";
ACMsg.GALAXIA_LED_GET_BLUE = "Returns the current blue channel value (0-255).";
ACMsg.GALAXIA_LED_READ_LIGHT_LEVEL = "Returns the ambient light level (0 = dark, 100 = bright).";

// galaxia - log
ACMsg.GALAXIA_THINGZ_LOG_MODULE = "Thingz internal data logger module.";
ACMsg.GALAXIA_LOG_CLASS = "Save data inside Galaxia internal memory as CSV (exported to USB as data.csv at boot).";
ACMsg.GALAXIA_LOG_CONSTRUCTOR = "Create a <b>Log</b> object.";
ACMsg.GALAXIA_LOG_ADD = "Append a row to the log. Data is a list of tuples: (column_name, value).";
ACMsg.GALAXIA_LOG_DELETE = "Erase all data saved in the log.";
ACMsg.GALAXIA_LOG_SET_COLUMNS = "Defines CSV columns (resets the log each time columns are redefined).";

// galaxia - radio
ACMsg.GALAXIA_THINGZ_RADIO_MODULE = "Thingz radio module.";
ACMsg.GALAXIA_RADIO_CLASS = "Send and receive messages between boards.";
ACMsg.GALAXIA_RADIO_CONSTRUCTOR = "Create a <b>Radio</b> object.";
ACMsg.GALAXIA_RADIO_SEND = "Broadcasts a string message to nearby boards on the same channel.";
ACMsg.GALAXIA_RADIO_RECEIVE = "Waits for and returns the received message.";
ACMsg.GALAXIA_RADIO_SET_CHANEL = "Sets the radio channel (1 to 10).";
ACMsg.GALAXIA_RADIO_GET_CHANNEL = "Returns the current radio channel.";
ACMsg.GALAXIA_RADIO_GET_MAC = "Returns the radio MAC address as bytes.";

// galaxia - sound
ACMsg.GALAXIA_THINGZ_SOUND_MODULE = "Thingz sound module.";
ACMsg.GALAXIA_SOUND_CLASS = "Output sound using Galaxia's jack connector.";
ACMsg.GALAXIA_SOUND_CONSTRUCTOR = "Create a <b>Sound</b> object.";
ACMsg.GALAXIA_SOUND_PLAY = "Enables/disables frequency generation on the jack and sets the frequency (Hz).";
ACMsg.GALAXIA_SOUND_SET_FREQUENCY = "Sets the output frequency in Hz.";
ACMsg.GALAXIA_SOUND_SET_VOLUME = "Sets the volume (0 to 100).";
ACMsg.GALAXIA_SOUND_PLAY_SAMPLE = "Plays a WAV sample from the given file path.";

// galaxia - display
ACMsg.GALAXIA_THINGZ_DISPLAY_MODULE = "Thingz display module.";
ACMsg.GALAXIA_DISPLAY_CLASS = "Control Galaxia LCD display.";
ACMsg.GALAXIA_DISPLAY_CONSTRUCTOR = "Create a <b>Display</b> object.";
ACMsg.GALAXIA_DISPLAY_PLOT = "Plot interface (instance of <b>Plot</b>).";
ACMsg.GALAXIA_DISPLAY_CONSOLE = "Console interface showing REPL output (instance of <b>Console</b>).";
ACMsg.GALAXIA_DISPLAY_RAW = "Raw graphics interface (instance of <b>Raw</b>).";
ACMsg.GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE = "Thingz display console submodule.";
ACMsg.GALAXIA_CONSOLE_CLASS = "Show the REPL output on the screen.";
ACMsg.GALAXIA_CONSOLE_CONSTRUCTOR = "Create a <b>Console</b> object.";
ACMsg.GALAXIA_CONSOLE_SHOW = "Shows the REPL on the display.";
ACMsg.GALAXIA_THINGZ_DISPLAY_PLOT_MODULE = "Thingz display plot submodule.";
ACMsg.GALAXIA_PLOT_CLASS = "Use the LCD as a plot.";
ACMsg.GALAXIA_PLOT_CONSTRUCTOR = "Create a <b>Plot</b> object.";
ACMsg.GALAXIA_PLOT_SHOW = "Shows the plot on the display.";
ACMsg.GALAXIA_PLOT_ADD_POINT = "Adds a new point to the plot (Y value).";
ACMsg.GALAXIA_PLOT_SET_Y_SCALE = "Sets the Y scale with minimum and maximum values.";
ACMsg.GALAXIA_PLOT_SET_ANIMATE_FUNCTION = "Configures a function called every <b>interval</b> seconds to add a point.";
ACMsg.GALAXIA_THINGZ_DISPLAY_RAW_MODULE = "Thingz display raw graphics submodule.";
ACMsg.GALAXIA_RAW_CLASS = "Use the LCD to display graphical elements.";
ACMsg.GALAXIA_RAW_CONSTRUCTOR = "Create a <b>Raw</b> object.";
ACMsg.GALAXIA_RAW_SHOW = "Shows the raw graphics interface.";
ACMsg.GALAXIA_RAW_PRINT = "Prints text <b>txt</b> at position (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_RAW_PRINT_BMP = "Prints a BMP file located at <b>path</b> at position (<b>x</b>, <b>y</b>).";
ACMsg.GALAXIA_IMG_CLASS = "Image element for the raw interface.";
ACMsg.GALAXIA_IMG_CONSTRUCTOR = "Creates an image element from a BMP file and displays it.";
ACMsg.GALAXIA_IMG_SHOW = "Show/hide the image.";
ACMsg.GALAXIA_IMG_X = "Sets the x position.";
ACMsg.GALAXIA_IMG_Y = "Sets the y position.";
ACMsg.GALAXIA_IMG_WHITE_REPLACEMENT_COLOR = "Replaces white pixels with a given color.";
ACMsg.GALAXIA_IMG_GET_SHOW = "Returns <b>True</b> if the image is shown.";
ACMsg.GALAXIA_IMG_GET_X = "Returns the x position.";
ACMsg.GALAXIA_IMG_GET_Y = "Returns the y position.";
ACMsg.GALAXIA_IMG_GET_WIDTH = "Returns the image width.";
ACMsg.GALAXIA_IMG_GET_HEIGHT = "Returns the image height.";
ACMsg.GALAXIA_IMG_GET_WHITE_REPLACEMENT = "Returns the current white replacement color.";
ACMsg.GALAXIA_RECT_CLASS = "Rectangle element for the raw interface.";
ACMsg.GALAXIA_RECT_CONSTRUCTOR = "Creates a rectangle element and displays it.";
ACMsg.GALAXIA_RECT_SHOW = "Show/hide the rectangle.";
ACMsg.GALAXIA_RECT_X = "Sets the x position.";
ACMsg.GALAXIA_RECT_Y = "Sets the y position.";
ACMsg.GALAXIA_RECT_COLOR = "Sets the rectangle color.";
ACMsg.GALAXIA_RECT_GET_SHOW = "Returns <b>True</b> if the rectangle is shown.";
ACMsg.GALAXIA_RECT_GET_X = "Returns the x position.";
ACMsg.GALAXIA_RECT_GET_Y = "Returns the y position.";
ACMsg.GALAXIA_RECT_GET_WIDTH = "Returns the rectangle width.";
ACMsg.GALAXIA_RECT_GET_HEIGHT = "Returns the rectangle height.";
ACMsg.GALAXIA_RECT_GET_COLOR = "Returns the rectangle color.";
ACMsg.GALAXIA_TEXT_CLASS = "Text element for the raw interface.";
ACMsg.GALAXIA_TEXT_CONSTRUCTOR = "Creates a text element and displays it.";
ACMsg.GALAXIA_TEXT_SHOW = "Show/hide the text.";
ACMsg.GALAXIA_TEXT_X = "Sets the x position.";
ACMsg.GALAXIA_TEXT_Y = "Sets the y position.";
ACMsg.GALAXIA_TEXT_SET_TEXT = "Sets the displayed text.";
ACMsg.GALAXIA_TEXT_GET_SHOW = "Returns <b>True</b> if the text is shown.";
ACMsg.GALAXIA_TEXT_GET_X = "Returns the x position.";
ACMsg.GALAXIA_TEXT_GET_Y = "Returns the y position.";
ACMsg.GALAXIA_TEXT_GET_WIDTH = "Returns the text width.";
ACMsg.GALAXIA_TEXT_GET_HEIGHT = "Returns the text height.";
ACMsg.GALAXIA_TEXT_GET_COLOR = "Returns the text color.";
ACMsg.GALAXIA_TEXT_GET_TEXT = "Returns the current text (note: doc lists int).";
