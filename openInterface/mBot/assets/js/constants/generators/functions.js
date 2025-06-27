// You can modify functions but don't refactoring strings writing format, it is used if C++ code has to be changed
const FUNCTIONS_MBOT = {

// Math blocks

/**
 * Return true if integer input is prime, else return false.
 * @param {int} n
 * @return {boolean} is prime ?
 */
DEF_MATH_IS_PRIME:
`boolean mathIsPrime(int n) {
  if (n == 2 || n == 3) {
    return true;
  }
  // False if n is NaN, negative, is 1.
  // And false if n is divisible by 2 or 3.
  if (isnan(n) || (n <= 1) || (n == 1) || (n % 2 == 0) || (n % 3 == 0)) {
    return false;
  }
  // Check all the numbers of form 6k +/- 1, up to sqrt(n).
  for (int x = 6; x <= sqrt(n) + 1; x += 6) {
    if (n % (x - 1) == 0 || n % (x + 1) == 0) {
      return false;
    }
  }
  return true;
}`,

// Text blocks

/**
 * Return true if text input is empty, else return false.
 * @param {String} msg
 * @return {boolean} is empty ?
 */
DEF_TEXT_IS_STRING_EMPTY:
`boolean isStringEmpty(String msg) {
  if (msg.length() == 0) {
    return true;
  } else {
    return false;
  }
}`,

DEF_TEXT_TO_TITLE_CASE:
`void toTitleCase(String &str) {
  str.toLowerCase();
  bool nouveauMot = true;
  for (int i = 0; i < str.length(); i++) {
    if (str[i] == ' ') {
      nouveauMot = true;
    } else if (nouveauMot && str[i] >= 'a' && str[i] <= 'z') {
      str[i] = str[i] - ('a' - 'A');  // Convertir en majuscule
      nouveauMot = false;
    }
  }
}`,

// Variables blocks

DEFINE_VARIABLE_TYPE:
`// Generic catch-all implementation.
template <typename T_ty> struct TypeInfo {static const char* name;};
template <typename T_ty> const char* TypeInfo<T_ty>::name = "unknown";
// Handy macro to make defining stuff easier.
#define MAKE_TYPE_INFO(type) template <> const char* TypeInfo<type>::name = #type;
// Type-specific implementations.
MAKE_TYPE_INFO(char)
MAKE_TYPE_INFO(String)
MAKE_TYPE_INFO(boolean)
MAKE_TYPE_INFO(short)
MAKE_TYPE_INFO(int)
MAKE_TYPE_INFO(long)
MAKE_TYPE_INFO(float)
// Handy macro to make querying stuff easier.
#define TYPE_NAME(var) TypeInfo<typeof(var)>::name`,

// Communication blocks

/**
 * Clear buffer array.
 * @return {void}
 */
DEF_CLEAR_BUFFER_ARRAY: 
`void clearBufferArray() {
  for (int i = 0; i < count; i++)
    buffer[i] = NULL;
  count = 0;
}`,

DEF_SETUP_SERIAL_CONNECTION:
`void serial_setupConnection(int baudrate) {
  Serial.begin(baudrate);
  while (!Serial) {
    Serial.println("En attente de l'ouverture du port série...");
    delay(1000);
  }
  Serial.println("Port série activé. Baudrate: " + String(baudrate));
  delay(50);
}`,

/**
 * Get sound value from Grove sound sensor by analog reading.
 * @param {uint8_t} pin
 * @return {uint16_t} sound
 */
DEF_GET_ANALOG_MEAN:
`uint16_t getAnalogMean(uint8_t pin) {
  uint16_t sum = 0;
  for(int i=0; i<32; i++) {
    sum += analogRead(pin);
  }
  sum >>= 5;
  return sum;
}`,

// Display function

/**
 * Show all LED of neopixel module.
 * @param {MeRGBLed} neoPx
 * @param {uint8_t} red
 * @param {uint8_t} green
 * @param {uint8_t} blue
 * @return {void} 
 */
DEF_NEOPIXEL_SHOW_ALL_LED:
`void neopixel_showAllLed(MeRGBLed *neoPx, uint8_t r, uint8_t g, uint8_t b) {
  for (int i; i<30; i++) { 
     neoPx->setColor(i, r, g, b);
  } 
  neoPx->show();
}`,

/**
 * Set a rainbow on Grove neopixel module.
 * @param {Adafruit_NeoPixel} neoPx
 * @param {uint8_t} ledCount
 * @return {void}
 */
DEF_NEOPIXEL_RAINBOW:
`void neopixel_rainbow(MeRGBLed *neoPx, uint8_t ledCount) {
   int R = 255;
   int G = 50;
   int B = 50;
   for (int G = 50; G<254; G=G+5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
   for (int R = 255; R>49; R=R-5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
   for (int B = 50; B<254; B=B+5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
   for (int G = 255; G>49; G=G-5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
   for (int R = 50; R<254; R=R+5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
   for (int B = 255; B>49; B=B-5) {
     neopixel_showAllLed(neoPx, ledCount, R, G, B);
     delay(50);
   }
 }`,

// Robots blocks

/**
 * Run motor left of mBot. 
 * @param {int8_t} dir
 * @param {uint8_t} speed
 * @return {void}
 */
DEF_MBOT_SET_MOTOR_LEFT:
`void mBot_setMotorLeft(int8_t dir, int16_t speed) {
  speed = speed/100.0*255;
  motor_L.run((9) == M1 ? -(dir*speed) : (dir*speed));
}`,

/**
 * Run motor right of mBot. 
 * @param {int8_t} dir
 * @param {uint8_t} speed
 * @return {void}
 */
DEF_MBOT_SET_MOTOR_RIGHT:
`void mBot_setMotorRight(int8_t dir, int16_t speed) {
  speed = speed/100.0*255;
  motor_R.run((10) == M1 ? -(dir*speed) : (dir*speed));
}`,

/**
 * Play the gamme on buzzer of mBot.
 * @return {void}
 */
DEF_MBOT_BUZZER_GAMME:
`void BuzzerGamme() { 
  float NOTES[8] = {261.63, 293.66, 329.54, 349.23, 392, 440, 493.88, 523.25}; 
  for (int i=0; i<8; i++) { 
    buzzer.tone(NOTES[i], 250);
    delay(50);
  }
}`,

/**
 * Play Star Wars theme on buzzer of mBot.
 * @return {void}
 */
DEF_MBOT_BUZZER_STARWARS:
`void BuzzerStarWars() { 
  float NOTES[19] = {293.66, 293.66, 293.66, 392.0, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 554.37, 454}; 
  uint16_t DURATIONS[19] = {180, 180, 180, 800, 800, 180, 180, 180, 800, 400, 180, 180, 180, 800, 400, 180, 180, 180, 1000};
  uint8_t SILENCE_DELAYS[19] = {40, 40, 40, 100, 100, 40, 40, 40, 100, 50, 40, 40, 40, 100, 50, 40, 40, 40, 100};
  for (int i=0; i<19; i++)  { 
    buzzer.tone(NOTES[i], DURATIONS[i]);
    delay(SILENCE_DELAYS[i]);
  }
}`,

/**
 * Play R2D2 theme on buzzer of mBot.
 * @return {void}
 */
DEF_MBOT_BUZZER_R2D2:
`void BuzzerR2D2() { 
  float R2D2_NOTES[16] = {3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01, 3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01};
  for (int i=0; i<16; i++)  { 
    buzzer.tone(R2D2_NOTES[i], 80);
    delay(20);
  }
}`,

/**
 * Get color from Makeblock color sensor.
 * @param {uint8_t} select
 * @return {uint16_t} red | green | blue
 */
DEF_MAKEBLOCK_COLOR_SENSOR_GET_COLOR:
`uint16_t colorSensor_getData(MeColorSensor *colorSensor, uint8_t select) {
  colorSensor->ColorDataRead();
  if (select == 1) {
    return colorSensor->Redvalue;
  } else if (select == 2) {
    return colorSensor->Greenvalue;
  } else {
    return colorSensor->Bluevalue;
  }
}`,

/**
 * Set direction of the Makeblock mini fan.
 * @param {uint8_t} port
 * @param {int8_t} dir
 * @return {void}
 */
DEF_MAKEBLOCK_RUN_MINI_FAN:
`void miniFan_run(uint8_t port, int8_t dir) {
  pinMode(miniFan.pin1(), OUTPUT);
  pinMode(miniFan.pin2(), OUTPUT);
  if (dir == 1) {
    digitalWrite(miniFan.pin2(), 0);
    digitalWrite(miniFan.pin1(), 1);
  }
  else if (dir == -1) {
    digitalWrite(miniFan.pin1(), 0);
    digitalWrite(miniFan.pin2(), 1);
  }
  else {
    digitalWrite(miniFan.pin1(), 0);
    digitalWrite(miniFan.pin2(), 0);
  }
}`,

DEF_BUTON_PRESSED:
`int buttonPressed() {
  return analogRead(A7) <= 10 ? 1 : 0;
}`,

}