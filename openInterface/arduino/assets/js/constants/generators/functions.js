// You can modify functions but don't refactoring strings writing format, it is used if C++ code has to be changed
const FUNCTIONS_ARDUINO = {

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

// Display blocks

/**
 * Setup Grove OLED display by I2C transmission.
 * @return {void} 
 */
DEF_SETUP_SEEED_OLED:
`void SeeedOled_setup() {
  SeeedOled.init(); 
  SeeedOled.clearDisplay();
  SeeedOled.setNormalDisplay();
  SeeedOled.setPageMode();
}`,

/**
 * Draw icon on Grove OLED display of size 128x64.
 * @param {uint8_t [] PROGMEM} icon
 * @param {uint8_t} x
 * @param {uint8_t} y
 * @return {void} 
 */
DEF_OLED_DRAW_ICON:
`void SeeedOled_drawIcon(uint8_t icon [] PROGMEM, uint8_t x, uint8_t y) {
  SeeedOled.setTextXY(x, y);
  for (int i; i<8; i++) SeeedOled.sendData(pgm_read_byte(&icon[i]));
}`,

// PB

/**
 * Show all LED of neopixel module.
 * @param {Adafruit_NeoPixel} neoPx
 * @param {uint8_t} ledCount
 * @param {uint8_t} red
 * @param {uint8_t} green
 * @param {uint8_t} blue
 * @return {void} 
 */
DEF_NEOPIXEL_SHOW_ALL_LED:
`void neopixel_showAllLed(Adafruit_NeoPixel *neoPx, uint8_t ledCount, uint8_t r, uint8_t g, uint8_t b) {
  for (int i=0; i<ledCount; i++) { 
    neoPx->setPixelColor(i, neoPx->Color(r, g, b));
  } 
  neoPx->show();
}`,

// PB

/**
 * Set a rainbow on Grove neopixel module.
 * @param {Adafruit_NeoPixel} neoPx
 * @param {uint8_t} ledCount
 * @return {void}
 */
DEF_NEOPIXEL_RAINBOW:
`void neopixel_rainbow(Adafruit_NeoPixel *neoPx, uint8_t ledCount) {
  uint8_t R = 255;
  uint8_t G = 50; 
  uint8_t B = 50; 
  for (G; G<254; G=G+5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
  for (R; R>49; R=R-5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
  for (B; B<254; B=B+5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
  for (G; G>49; G=G-5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
  for (R; R<254; R=R+5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
  for (B; B>49; B=B-5) {
    neopixel_showAllLed(neoPx, ledCount, R, G, B);
    delay(5);
  }
}`,

/**
 * Set clock on Grove 4 digits display.
 * @return {void} 
 */
DEF_4DIGIT_SET_TIME:
`void setClock(int t[]) {
  int min0=(millis()-chrono0Clk)/1000/60;
  int h0=min0/60;
  int last_mins=MIN_START+(int)min0-(int)h0*60;
  if (last_mins>59) {
    t[1]=last_mins-60;
    t[0]=HOUR_START+(int)h0+1;
  } else {
    t[1]=last_mins;
    t[0]=HOUR_START+(int)h0;
  }
}`,

/**
 * Set temperature on Grove 4 digits display.
 * @return {void} 
 */
DEF_4DIGIT_SET_TEMP: 
`void setTemperature(int8_t digits[], float t) {
  if (t<100 && t>-10) {
    if (t<-1) {
      digits[0] = '-';
   	  digits[1] = (int8_t)abs((int)t);
    } else {
      digits[0] = (int8_t)((int)t/10);
      digits[1] = (int8_t)((int)t%10);
    }
  } else {
    digits[0] = '_';
   	digits[1] = '_';
  }
  digits[2] = '*';
  digits[3] = 'C';
}`,

// I/O blocks

/**
 * Get button of keypad module.
 * @return {uint8_t} key
 */
DEF_KEYPAD_GETNUMBER:
`String getKeypadNumber() {
  uint8_t data;
  while (!keypad.available()) {
  }
  while (keypad.available()) {
    data = keypad.read() - 224;
  }
  if (data > 0 && data < 13) {
    if (data==10) {
      return "*";
    } else if (data == 11) {
      return "0";
    } else if (data == 12) {
      return "#";
    } else {
      return String(data);
    }
  } else {
    return "";
  }
}`,

DEF_MP3_READ_SONG_NAME:
`
void readSongName(struct Play_history* ph, uint32_t num, STROAGE disk) {
  Mp3Player.volume(0);
  delay(100);
  switch (disk) {
    case SPIFLASH:
      Mp3Player.playSPIFlashSong(0x0001);
      break;
    case SD:
      Mp3Player.playSDRootSong(0x0001);
      break;
    case UDISK:
      Mp3Player.playUDiskRootSong(0x0001);
      break;
  }
  for (int i = 0; i < num ; i++) {
    delay(300);
    ph[i].disk = disk;
    ph[i].index = Mp3Player.getTracks();
    Mp3Player.getSongName(ph[i].name);
    Mp3Player.next();
  }
  Mp3Player.pause_or_play();
  Mp3Player.volume(14);
  delay(100);
}`,

DEF_MP3_GET_ALL_SONG: 
`
void getAllSong() {
  uint8_t diskstatus = Mp3Player.getDiskStatus();
  spi_flash_songs = Mp3Player.getSPIFlashMp3FileNumber();
  if (spi_flash_songs > 0) {
    SPISong = (struct Play_history*)malloc((spi_flash_songs + 1) * sizeof(struct Play_history));
    readSongName(SPISong, spi_flash_songs, SPIFLASH);
  }
  if (diskstatus && 0x02) { // have SD
    sd_songs = Mp3Player.getSDMp3FileNumber();
    if (sd_songs > 0) {
      SDSong = (struct Play_history*)malloc((sd_songs + 1) * sizeof(struct Play_history));
      readSongName(SDSong, sd_songs, SD);
    }
  }
}`,

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
 * Setup SD shield module by SPI transmission.
 * @param {uint8_t} pin
 * @return {void}
 */
DEF_SD_SPI_SETUP_CARD:
`void sd_setupCard(uint8_t pin) {
  Serial.println("Initialisation de la carte SD...");
  while (!SD.begin(pin)) {
    Serial.println("Initialisation non aboutie ! Insérer une carte SD dans le module.");
    delay(1000);
  }
  Serial.println("Initialisation du module SD réussie.");
  delay(50);
}`,

/**
 * Write data in SD card by SPI transmission.
 * @param {String} data
 * @return {void}
 */
DEF_SD_SPI_WRITE_DATA:
`void sd_writeData(String data) {
  dataFile = SD.open(fileName, FILE_WRITE);
  if (dataFile) {
    Serial.println("Ecriture dans le fichier " + String(fileName));
    dataFile.println(data);
    dataFile.close();
    Serial.println("Donnée écrite.");
    delay(50);
  } 
  else {
    Serial.println("Erreur lors de l'ouverture du fichier " + String(fileName));
    delay(1000);
  }
}`,

/**
 * Setup Grove bluetooth connection by serial transmission.
 * @return {void}
 */
DEF_SETUP_BT_CONNECTION:
`void bluetooth_setupConnection(String name, String mode, String pin) {
  blueToothSerial.begin(9600);
  blueToothSerial.print("AT");
  delay(400);
  blueToothSerial.print("AT+DEFAULT");           // Restore all setup value to factory setup
  delay(2000);
  blueToothSerial.print("AT+NAME" + name);  // set the bluetooth name, the length of bluetooth name must less than 12 characters.
  delay(400);
  blueToothSerial.print("AT+PIN" + pin);           // set the pair code to connect
  delay(400);
  blueToothSerial.print("AT+ROLE" + mode);             // set the bluetooth working mode
  delay(400);
  blueToothSerial.print("AT+AUTH1");            
  delay(400);
  blueToothSerial.print("AT+CLEAR");             // Clear connected device mac address
  delay(400);
  blueToothSerial.flush();
  delay(1000);
}`,

/**
 * Setup the radio RF 433 MHz module by serial transmission.
 * @return {void}
 */
SETUP_RADIO_433_RECEIVER:
`void radioRF433_setupReceiver() {
  Serial.println("Setup: getting 433 MHz radio message");
  Serial.println("Pin: " + String(PIN_RF_RX) + "(RX)");
  vw_set_rx_pin(PIN_RF_RX);  // Setup receive pin.
  vw_setup(2000); // Transmission speed in bits per second.
  vw_rx_start(); // Start the PLL receiver.
}`,

/**
 * Setup the radio NRF24L01 by SPI transmission.
 * @param {uint8_t} channel
 * @return {void}
 */
DEF_RADIO_NRF24_INIT:
`void nrf24_init(uint8_t channel) {
  printf_begin();
  radioNRF.begin();
  radioNRF.setChannel(channel); // communication channel (0-125)
  radioNRF.setDataRate(RF24_250KBPS); // communication speed (RF24_250KBPS, RF24_1MBPS, RF24_2MBPS)
  radioNRF.enableDynamicPayloads();
  radioNRF.setPALevel(RF24_PA_HIGH);// amplification (RF24_PA_MIN, RF24_PA_LOW, RF24_PA_HIGH et RF24_PA_MAX)
  radioNRF.printDetails();
}`,

/**
 * Send data by radio NRF24L01.
 * @param {String} dataToSend
 * @return {void}
 */
DEF_RADIO_NRF24_SEND_DATA:
`bool nrf24_sendData(String dataToSend) {
  delay(50);
  Serial.println("Envoi de: " + dataToSend);
  radioNRF.stopListening();
  char inputChar[dataToSend.length() + 1] ;
  dataToSend.toCharArray(inputChar, dataToSend.length()+1);
  return radioNRF.write(&inputChar, sizeof(inputChar));
}`,

/**
 * Decode the IR message from NEC remote, return the associated button.
 * @param {uint32_t} code
 * @return {String} button
 */
DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON:
`String remoteNEC_getButton(int HexCode) {
  if (HexCode == 0x30cf) return "1";
  else if (HexCode == 0x18e7) return "2";
  else if (HexCode == 0x7a85) return "3";
  else if (HexCode == 0x10ef) return "4";
  else if (HexCode == 0x38c7) return "5";
  else if (HexCode == 0x5aa5) return "6";
  else if (HexCode == 0x42bd) return "7";
  else if (HexCode == 0x4ab5) return "8";
  else if (HexCode == 0x52ad) return "9";
  else if (HexCode == 0x6897) return "0";
  else if (HexCode == 0x2fd) return "up";
  else if (HexCode == 0xffff9867) return "down";
  else if (HexCode == 0xffffe01f) return "left";
  else if (HexCode == 0xffff906f) return "right";
  else if (HexCode == 0xffffa857) return "ENTER/SAVE";
  else if (HexCode == 0xffffb04f) return "Back";
  else if (HexCode == 0xffffa25d) return "VOL-";
  else if (HexCode == 0xffffe21d) return "VOL+";
  else if (HexCode == 0x629d) return "PLAY/PAUSE";
  else if (HexCode == 0x22dd) return "SETUP";
  else if (HexCode == 0xffffc23d) return "STOP/MODE";
  else return "NEC remote code error";
}`,

/**
 * Setup Grove GPS module by serial transmision.
 * @return {void}
 */
DEF_SETUP_GPS:
`void gps_setup() {
  Serial.println("Setup: getting GPS Data");
  gpsSerial.begin(9600);
}`,

/**
 * Get data of Grove GPS module.
 * @return {String} data
 */
DEF_GPS_GET_DATA:
`String gps_getBufferData() {
  String dta;
  while (gpsSerial.available()) {
    buffer[count++] = gpsSerial.read();
    if (count == 64) break;
  }
  dta = (char*)buffer;
  clearBufferArray();
  return dta;
}`,

/**
 * Get ID card of Grove RFID module.
 * @return {String} id
 */
DEF_RFID_GET_STRING_CARD_ID:
`String rfid_getStringCardID() {
  String frame = "";
  if (rfid.available()) {
      while (rfid.available()) {
        buffer[count++] = rfid.read();
        if (count == 64) break;
      }
      frame += String((char *)buffer);
      clearBufferArray();
      count = 0;
  }
  return frame.substring(1, frame.length()-1);
}`,

/**
 * Get any parameter of Grove clock RTC module (PCD85063TP).
 * @param {PCD85063TP} rtc
 * @param {uint8_t} select
 * @return {uint16_t} day | month | year | hour | minute | second
 */
DEF_PCD85063TP_RTC_GET_TIME:
`uint16_t pcd85063tp_RTC_getTime(PCD85063TP *rtc, uint8_t select) {
  rtc->getTime();
  delay(10);
  switch (select) {
    case 0: return rtc->dayOfMonth;
    case 1: return rtc->month;
    case 2: return rtc->year + 2000;
    case 3: return rtc->hour;
    case 4: return rtc->minute;
    case 5: return rtc->second;
  }
}`,

/**
 * Get the string name of day with Grove clock RTC module (PCD85063TP).
 * @param {PCD85063TP} rtc
 * @return {String} day name
 */
DEF_PCD85063TP_RTC_GET_DAY_NAME:
`String pcd85063tp_RTC_getDayName(PCD85063TP *rtc) {
  rtc->getTime();
  delay(10);
  switch (rtc->dayOfWeek) {
    case MON: return "MON";
    case TUE: return "TUE";
    case WED: return "WED";
    case THU: return "THU";
    case FRI: return "FRI";
    case SAT: return "SAT";
    case SUN: return "SUN";
  }
}`,

/**
 * Get any parameter of Grove clock RTC module (DS1307).
 * @param {DS1307} rtc
 * @param {uint8_t} select
 * @return {uint16_t} day | month | year | hour | minute | second
 */
DEF_DS1307_RTC_GET_TIME:
`uint16_t ds1307_RTC_getTime(DS1307 *rtc, uint8_t select) {
  rtc->getTime();
  delay(10);
  switch (select) {
    case 0: return rtc->dayOfMonth;
    case 1: return rtc->month;
    case 2: return rtc->year + 2000;
    case 3: return rtc->hour;
    case 4: return rtc->minute;
    case 5: return rtc->second;
  }
}`,

/**
 * Get the string name of day with Grove clock RTC module (DS1307).
 * @param {DS1307} rtc
 * @return {String} day name
 */
DEF_DS1307_RTC_GET_DAY_NAME:
`String ds1307_RTC_getDayName(DS1307 *rtc) {
  rtc->getTime();
  delay(10);
  switch (rtc->dayOfWeek) {
    case MON: return "MON";
    case TUE: return "TUE";
    case WED: return "WED";
    case THU: return "THU";
    case FRI: return "FRI";
    case SAT: return "SAT";
    case SUN: return "SUN";
  }
}`,

// Sensors blocks

SETUP_SGP30_CHECK:
`while (!sgp30.begin()) {
  Serial.println("En attente du capteur SGP30...");
  delay(1000);
}`,

/**
 * Get the CO2 value in ppm from SGP30 sensor by I2C transmission.
 * @return {uint16_t} co2
 */
DEF_SGP30_GET_CO2:
`uint16_t sgp30_readCO2() {
  if (!sgp30.IAQmeasure()) {
    Serial.println("Measurement failed");
    return 0;
  }
  else return sgp30.eCO2;
}`,

/**
 * Get the TVOC value in ppm from Grove SGP30 sensor by I2C transmission.
 * @return {uint16_t} tvoc
 */
DEF_SGP30_GET_TVOC:
`uint16_t sgp30_readTVOC() {
  if (!sgp30.IAQmeasure()) {
    Serial.println("Measurement failed");
    return 0;
  }
  else return sgp30.TVOC;
}`,

/**
 * Declare Vref Grove O2 sensor.
 */
DECLARE_O2_GAS:
`// It need about about 5-10 minutes to preheat the O2 gas sensor
// modify VRef if needed
const float VRef = 3.3;   // voltage of adc reference`,

/**
 * Get data from Grove O2 sensor by analog reading.
 * @param {uint8_t} pin
 * @param {uint8_t} select
 * @return {float} Vout | o2
 */
DEF_O2_SENSOR_GET_DATA:
`float o2Sensor_readData(uint8_t pin, uint8_t select) {
  float vout = getAnalogMean(pin, 10)*VRef/${READ_ANALOG_MAX_VALUE}.0;
  if (select == 0) {
    return vout;
  } else {
    return vout * 0.21 / 2 * 100;
  }
}`,

/**
 * Get high 12 section value of I2C water sensor.
 */
DEF_WATER_GET_HIGH_12_VALUE:
`void getHigh12SectionValue() {
  memset(water_high_data, 0, sizeof(water_high_data));
  Wire.requestFrom(ATTINY1_HIGH_ADDR, 12);
  while (12 != Wire.available());
  for (int i = 0; i < 12; i++) {
    water_high_data[i] = Wire.read();
  }
  delay(10);
}`,

/**
 * Get low 8 section value of I2C water sensor.
 */
DEF_WATER_GET_LOW_8_VALUE:
`void getLow8SectionValue(void) {
  memset(water_low_data, 0, sizeof(water_low_data));
  Wire.requestFrom(ATTINY2_LOW_ADDR, 8);
  while (8 != Wire.available());
  for (int i = 0; i < 8 ; i++) {
    water_low_data[i] = Wire.read(); // receive a byte as character
  }
  delay(10);
}`,

/**
 * Get water level in percent from I2C water sensor.
 * @returns {int} water_level
 */
DEF_WATER_I2C_GET_LEVEL:
`int getWaterLevel() {
  uint32_t touch_val = 0;
  uint8_t trig_section = 0;
  getLow8SectionValue();
  getHigh12SectionValue();
  for (int i = 0 ; i < 8; i++) {
    if (water_low_data[i] > WATER_THRESHOLD) {
      touch_val |= 1 << i;
    }
  }
  for (int i = 0 ; i < 12; i++) {
    if (water_high_data[i] > WATER_THRESHOLD) {
      touch_val |= (uint32_t)1 << (8 + i);
    }
  }
  while (touch_val & 0x01) {
    trig_section++;
    touch_val >>= 1;
  }
  return trig_section * 5;
}`,

/**
 * Get CO2 concentration in ppm from Grove MQ135 sensor by analog reading.
 * @param {uint8_t} pin
 * @return {float} co2
 */
DEF_MQ135_GET_CONCENTRATION:
`float mq135_readCO2(uint8_t pin) {
  float R = ((${READ_ANALOG_MAX_VALUE}./(float)getAnalogMean(pin, 5))*5.-1.)*10.0;
  return 116.6020682 * pow((R/RESISTANCE_ZERO), -2.769034857);
}`,

/**
 * Get CO2 concentration in ppm, temperature or humidity from Grove SCD30 sensor by I2C transmission.
 * @param {uint8_t} dataSelect
 * @return {float} data
 */
DEF_SCD30_READ:
`float scd30_read(uint8_t dataSelect) {
  t_scd = millis() - t_scd;
  if (t_scd > 1000 && scd30.isAvailable()) {
    float result[3] = {0};
    scd30.getCarbonDioxideConcentration(result);
    scd30_co2 = result[0];
    scd30_t = result[1];
    scd30_h = result[2];
  }
  switch (dataSelect) {
    case 0:
      return scd30_co2;
    case 1:
      return scd30_t;
    case 2:
      return scd30_h;
  }
}`,

DEF_SCD30_CALIBRATE:
`void scd30_calibrateSensor(uint16_t co2ppm) {
  Serial.println("[SCD30_INFO] Go outside, and wait for 2 minutes. You can reset the board to restart program and redo calibration.");
  Serial.println("[SCD30_INFO] Start sensor calibration...");
  float result[3] = {0};
  for (uint8_t i = 0; i < 60; i++) {
    scd30.getCarbonDioxideConcentration(result);
    delay(2000);
  }
  scd30.setForcedRecalibration(co2ppm);
  Serial.println("[SCD30_INFO] End of calibration forced to " + String(co2ppm) + " ppm.");
}`,

/**
 * Get resistance 0 in ohm from Grove MQ135 sensor by analog reading.
 * @param {uint8_t} pin
 * @return {float} R0
 */
DEF_MQ135_GET_RZERO_CALIBRATOR:
`// Report return value in constante RESISTANCE_ZERO
float mq135_getResistance(uint8_t pin) {
  float R = ((${READ_ANALOG_MAX_VALUE}./(float)getAnalogMean(pin, 5))*5. - 1.) * 10.0;
  return R*pow((ATM_CO2_CALIBRATOR/116.6020682),(1./2.769034857));
}`,

DEF_AIR_QUALITY_SETUP:
`void airQuality_setup(AirQualitySensor *sensor, int pin) {
  String pinStr = pin >= 14 ? 'A' + String(pin - 14) : 'D' + String(pin);
  Serial.println("Initialisation du capteur de qualité de l'air sur la broche " + pinStr + "... (20s.)");
  delay(20000); //wait 20s for init
  if (sensor->init()) {
    Serial.println("Capteur de qualité de l'air prêt.");
    delay(50);
  } else {
    Serial.println("En attente du capteur de qualité de l'air...");
    return;
  }
}`,

/**
 * Get data from Grove dust sensor by pusle in transmission.
 * @param {uint8_t} pin
 * @param {uint8_t} select
 * @return {float} concentration | ratio
 */
DEF_DUST_GET_PARTICULATE_DATA:
`float dustSensor_readParticulate(uint8_t pin, uint8_t select) {
  uint32_t duration;
  uint32_t lowpulseoccupancy = 0;
  float ratio = 0;
  float concentration = 0;
  Serial.println("PPD42 sensor measure...");
  while ((millis()-t_dust) < SAMPLETIME_MS) {
    duration = pulseIn(pin, LOW);
    lowpulseoccupancy += duration;
  }
  ratio = lowpulseoccupancy / (SAMPLETIME_MS*10.0);
  concentration = 1.1*pow(ratio, 3) - 3.8*pow(ratio, 2) + 520*ratio + 0.62;
  lowpulseoccupancy = 0;
  t_dust = millis();
  if (select == 0) {
    return concentration;
  } else {
    return ratio;
  }
}`,

SETUP_HM330X_CHECK:
`if (hm330x.init()) {
  Serial.println("Initialisation du capteur HM330X...");
  return;
}`,

/**
 * Parse data measured by Grove HM330X sensor.
 * @param {uint8_t*} data
 * @param {uint8_t} select
 * @return {HM330XErrorCode} ERROR_PARAM
 */
DEF_HM330X_PARSE_RESULT:
`HM330XErrorCode parse_result(uint8_t *data, uint8_t select) {
  uint16_t value=0;
  if (NULL==data) {
    return ERROR_PARAM;
  }
  for(int i=1 ; i<8 ; i++) {
    value = (uint16_t)data[i*2] << 8|data[i*2+1];
    if (i==select) {
      measure = value;
    }
  }
}`,

/**
 * Get data from Grove HM330X sensor.
 * @param {uint8_t} select
 * @return {uint16_t} PM1.0 | PM2.5 | PM10.0
 */
DEF_HM330X_GET_MEASURE:
`uint16_t hm330x_measure(uint8_t select) {
  if (hm330x.read_sensor_value(buf, 29)) {
    Serial.println("La mesure avec le capteur HM330X n'a pas abouti !");
  }
  parse_result(buf, select);
  delay(5);
  return measure;
}`,

/**
 * Check and measure data with Grove MHZ-19 sensor.
 * @return {bool} data received
 */
DEF_MHZ19_DATARECEIVE:
`bool mhz19_dataReceived() {
  byte data[9];
  int i = 0;
  for(i=0; i<sizeof(cmd_get_mhz19); i++) {
    mhz19.write(cmd_get_mhz19[i]);
  }
  delay(10);
  if (mhz19.available()) {
    while (mhz19.available()) {
      for(int i=0;i<9; i++) {
        data[i] = mhz19.read();
      }
    }
  }
  if ((i != 9) || (1 + (0xFF ^ (byte)(data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + data[7]))) != data[8]) {
    return false;
  }
  mhz19_CO2PPM = (int)data[2] * 256 + (int)data[3];
  mhz19_temperature = (int)data[4] - 40;
  return true;
}`,

/**
 * Get temperature from Grove MHZ19 sensor.
 * @return {int} temperature
 */
DEF_MHZ19_GETTEMP:
`int mhz19_readTemperature() {
  if (mhz19_dataReceived()) {
    return mhz19_temperature;
  }
}`,

/**
 * Get CO2 value in ppm from Grove MHZ19 sensor.
 * @return {int} co2
 */
DEF_MHZ19_GETCO2:
`int mhz19_readCO2() {
  if (mhz19_dataReceived()) {
    return mhz19_CO2PPM;
  }
}`,

SETUP_BMP280_CHECK:
`while (!bmp280.begin(BMP280_I2C_ADDR)) {
  Serial.println("En attente du capteur BMP280...");
  delay(1000);
}`,

/**
 * Setup DPS310 sensor.
 */
DEF_GROVE_DPS310_SETUP:
`bool dps310_setup() {
  Dps310PressureSensor.begin(Wire);
  int16_t temp_mr = 2; //temperature measure rate (value from 0 to 7)
  int16_t temp_osr = 2; //temperature oversampling rate (value from 0 to 7)
  int16_t prs_mr = 2; //pressure measure rate (value from 0 to 7)
  int16_t prs_osr = 2; //pressure oversampling rate (value from 0 to 7)
  int16_t ret = Dps310PressureSensor.startMeasureBothCont(temp_mr, temp_osr, prs_mr, prs_osr);
  if (ret != 0) {
    Serial.print("Init FAILED! ret = " + String(ret));
    delay(10);
    return false;
  } else {
    Serial.println("Init complete!");
    delay(10);
    return true;
  }
}`,

DEF_GROVE_DPS310_GETDATA:
`float dps310_readData(uint8_t size, uint8_t data) {
  float pressure[size];
  float temperature[size];
  int16_t ret = Dps310PressureSensor.getContResults(temperature, size, pressure, size);
  if (ret != 0) {
    Serial.print("DPS310 measure failed ! ret=" + String(ret));
    return NULL;
  } else {
    float t = 0;
    for (uint8_t i = 0; i < size; i++) {
      t += temperature[i];
    }
    t = t/(float)size;
    float p = 0;
    for (uint8_t i = 0; i < size; i++) {
      p += pressure[i];
    }
    p = p/(float)size;
    if (data == 0) {
      return t;
    } else if (data == 1) {
      return p;
    } else {
      Serial.print("DPS310 data '" + String(data) + "' is not an option");
      return NULL;
    }
  }
}`,

/**
 * Get temperature from Grove temperature sensor by analog reading.
 * @param {uint8_t} pin
 * @param {uint8_t} select (temperature unit)
 * @return {float} temperature
 */
DEF_GROVE_GET_TEMP:
`float getGroveTemperature(uint8_t pin, uint8_t unit) {
  float R = ${READ_ANALOG_MAX_VALUE}.0/getAnalogMean(pin, 5) - 1;
  float t = 1/(log(R)/4275+1/298.15) - 273.15; // celsius
  switch (unit) {
    case 1: // fahrenheit
      t = t * 9/5 + 32;
      break;
    case 2: // kelvin
      t += 273.15;
      break;
  }
  return t;
}`,

/**
 * Declare errors enumeration for DS18B20 temperature sensor.
 */
DEF_DS18B20_ERRORS:
`enum DS18B20_RCODES {
  READ_OK,
  NO_SENSOR_FOUND,
  INVALID_ADDRESS,
  INVALID_SENSOR
};`,

/**
 * Start the measure of temperature with DS18B20 sensor by one wire transmission.
 * @param {float*} temperature
 * @param {byte} reset_search
 * @return {byte} read_ok 
 */
DEF_DS18B20_MEASURE:
`byte ds18b20_measure(OneWire *ds, float *temperature, byte reset_search) {
  byte data[9], addr[8];
  if (reset_search) {
    ds->reset_search();
  }
  if (!ds->search(addr)) {
    return NO_SENSOR_FOUND;
  }
  if (OneWire::crc8(addr, 7) != addr[7]) {
    return INVALID_ADDRESS;
  }
  if (addr[0] != 0x28) {
    return INVALID_SENSOR;
  }
  ds->reset();
  ds->select(addr);
  ds->write(0x44, 1);
  delay(800);
  ds->reset();
  ds->select(addr);
  ds->write(0xBE);
  for (byte i=0; i<9; i++) {
    data[i] = ds->read();
  }
  *temperature = (int16_t) ((data[1] << 8) | data[0]) * 0.0625;
  return READ_OK;
}`,

/**
 * Get temperature in degres of DS18B20 sensor.
 * @return {float} temperature
 */
DEF_DS18B20_GET_TEMPERATURE:
`float ds18b20_readTemperature(OneWire *ds) {
  float temp;
  if (ds18b20_measure(ds, &temp, true) != READ_OK) {
    Serial.println(F("Erreur de lecture du capteur."));
    return 0;
  }
  return temp;
}`,

/**
 * Get pressure from Grove MPX5700 sensor by analog reading.
 * @param {uint8_t} pin
 * @return {float} pressure
 */
DEF_MPX5700AP_GET_PRESSURE:
`float mpx5700_readPressure(uint8_t pin) {
  uint16_t rawValue = 0;
  for (int i=0; i<10; i++) {
    rawValue += analogRead(pin);
  }
  return (rawValue-410) * 700.0 / 9220;
}`,

/**
 * Start measure with the Grove BME680 sensor by I2C transmission.
 * @return {void}
 */
DEF_BME680_MEASURE:
`void bme680_measure() {
  if (bme680.read_sensor_data()) {
    Serial.println("Impossible d'obtenir les données du capteur BME680.");
    return;
  }
}`,

/**
 * Get temperature in degres from Grove BME680 sensor.
 * @return {float} temperature
 */
DEF_BME680_GET_TEMPERATURE:
`float bme680_readTemperature() {
  bme680_measure();
  return bme680.sensor_result_value.temperature;
}`,

/**
 * Get pressure in Pa from Grove BME680 sensor.
 * @return {float} pressure
 */
DEF_BME680_GET_PRESSURE:
`float bme680_readPressure() {
  bme680_measure();
  return bme680.sensor_result_value.pressure;
}`,

/**
 * Get humidity in % from Grove BME680 sensor.
 * @return {float} humidity
 */
DEF_BME680_GET_HUMIDITY:
`float bme680_readHumidity() {
  bme680_measure();
  return bme680.sensor_result_value.humidity;
}`,

/**
 * Get gas value in ppm from Grove BME680 sensor.
 * @return {float} gas
 */
DEF_BME680_GET_GAS:
`float bme680_readGas() {
  bme680_measure();
  return bme680.sensor_result_value.gas;
}`,

/**
 * Get distance (cm) or duration (us) of HC-SR04 sensor.
 * @return {uint8_t} trigPin
 * @return {uint8_t} echoPin
 * @return {uint8_t} data
 */
DEF_HCSR04_GET_ULTRASONIC_DATA:
`float hcsr04_getUltrasonicData(uint8_t trigPin, uint8_t echoPin, uint8_t data) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  float duration = pulseIn(echoPin, HIGH);
  if (data == 0) {
    return duration*0.034/2.;
  } else if (data == 1) {
    return duration;
  } else {
    Serial.println("hcsr04_getDistance: invalid option '" + String(data) + "'");
  }
}`,

/**
 * Setup Grove SI1145 sensor by I2C transmission.
 * @return {void}
 */
DEF_SETUP_SI1145:
`void si1145_setup() {
  if (!si1145.begin()) {
    Serial.println("En attente du capteur Si1145...");
    while (1);
  }
  Serial.println("Le capteur Si1145 est prêt!");
  delay(50);
}`,

/**
 * Get pressure from Grove MPX5700 sensor by analog reading.
 * @param {uint8_t} pin
 * @return {float} UV index
 */
DEF_GET_UV_INDEX:
`float getUVindex(uint8_t pin) {
  float meanVal = getAnalogMean(pin, 10);
  float Vout = meanVal/${READ_ANALOG_MAX_VALUE}.0*5;
  return Vout*307/200;
}`,

/**
 * Setup Grove color sensor by I2C transmission.
 * @return {void}
 */
DEF_COLOR_SENSOR_SETUP:
`void colorSensor_setup() {
  if (colorSensor.begin()) {
    Serial.println("Capteur de couleur branché.");
    delay(50);
  } else {
    Serial.println("Impossible de trouver le capteur de couleurs ... vérifier les branchements!");
    return;
  }
}`,

/**
 * Get data from Grove color sensor.
 * @param {uint8_t} select
 * @return {uint16_t} red | green | blue | luminosity | color temperature
 */
DEF_COLOR_SENSOR_GET_DATA:
`uint16_t colorSensor_getData(uint8_t select) {
  uint16_t clear, r, g, b, temp, lux;
  delay(30);
  colorSensor.getRawData(&r, &g, &b, &clear);
  temp = colorSensor.calculateColorTemperature(r, g, b);
  lux = colorSensor.calculateLux(r, g, b);
  colorSensor.setInterrupt(true);
  uint16_t datas[5] = {r, g, b, temp, lux};
  return datas[select];
}`,

DEF_PULSE_SENSOR_GET_BPM: 
`float getBPM(uint8_t pin) {
  for (int i = 0; i < samp_size; i++)
    reads[i] = 0;
  while(1)
  {
    n = 0;
    start = millis();
    reader = 0.;
    do
    {
      reader += analogRead(pin);
      n++;
      now = millis();
    }
    while (now < start + 20);
    reader /= n;
    sum -= reads[ptr];
    sum += reader;
    reads[ptr] = reader;
    last = sum / samp_size;
    if (last > before) {
      rise_count++;
      if (!rising && rise_count > rise_threshold) {
        rising = true;
        first = millis() - last_beat;
        last_beat = millis();
        bpm = 60000. / (0.4 * first + 0.3 * second + 0.3 * third);
        third = second;
        second = first;
        return bpm;
      }
    } else {
      rising = false;
      rise_count = 0;
    }
    before = last;
    ptr++;
    ptr %= samp_size;
  }
}`,

/**
 * Take picture with camera module and save it in SD card of shield SD module.
 * @return {void}
 */
DEF_TAKE_PICTURE:
`void takePicture() {
  Serial.println("Prise de la photo dans 3 secondes");
  delay(3000);
  if (!cam.takePicture())
    Serial.println("Erreur lors de la prise de la photo");
  else
    Serial.println("Photo capturée !");
  char filename[13];
  strcpy(filename, "IMAGE00.JPG");
  for (int i = 0; i < 100; i++) {
    filename[5] = '0' + i/10;
    filename[6] = '0' + i%10;
    if (!SD.exists(filename)) {
      break;
    }
  }
  File imgFile = SD.open(filename, FILE_WRITE);
  uint16_t jpglen = cam.frameLength();
  Serial.print("Sauvegarde en cours...");
  pinMode(8, OUTPUT);
  byte wCount = 0;
  while (jpglen > 0) {
    uint8_t *buffer;
    uint8_t bytesToRead = min(32, jpglen);
    buffer = cam.readPicture(bytesToRead);
    imgFile.write(buffer, bytesToRead);
    if (++wCount >= 64) {
      wCount = 0;
    }
    jpglen -= bytesToRead;
  }
  imgFile.close();
  Serial.println("\\nSauvegardé.");
  while (!cam.reset()) {
    Serial.println("Impossible de reprendre une photo.");
  }
}`,

/**
 * Get analog mean.
 * @param {uint8_t} pin
 * @param {long} n
 * @return {long} mean
 */
DEF_GET_ANALOG_MEAN:
`uint16_t getAnalogMean(uint8_t pin, long n) {
  int sum = 0;
  for (int i = 0; i < n; i++) {
    sum += analogRead(pin);
    delay(1);
  }
  return sum / n;
}`,

/**
 * Get voltage divider data.
 * @param {uint8_t} pin
 * @param {long} n
 * @return {long} mean
 */
DEF_GET_VOLTAGE_DIVIDER_DATA:
`float getVoltageDividerData(uint8_t pin, long n, int divider, int volt) {
  long sensorValue = analogRead(pin);
  long sum = 0;
  for(int i = 0; i < n; i++) {
    sum=sensorValue+sum;
    sensorValue=analogRead(pin);
    delay(1);
  }
  float voltageDividerData = divider*(sum/n)*4980/1023;
  return voltageDividerData/volt;
}`,

/**
 * Get the gesture type of Grove gesture sensor by I2C transmission.
 * @return {String} gesture
 */
DEF_GESTURE_GET:
`String getGestureType() {  
  uint8_t data = 0;
  paj7620ReadReg(0x43, 1, &data);
  if (data == GES_RIGHT_FLAG) return "right";
  else if (data == GES_LEFT_FLAG) return "left";
  else if (data == GES_UP_FLAG) return "up";
  else if (data == GES_DOWN_FLAG) return "down";
  else if (data == GES_FORWARD_FLAG) return "forward";
  else if (data == GES_BACKWARD_FLAG) return "backward";
  else if (data == GES_CLOCKWISE_FLAG) return "clockwise";
  else if (data == GES_COUNT_CLOCKWISE_FLAG) return "anticlockwise";
  else if (data == GES_WAVE_FLAG) return "wave";
  else return "gesture not detected";
}`,

// Actuators blocks

/**
 * Play the gamme with Grove buzzer or speaker module.
 * @param {uint8_t} pin
 * @return {void}
 */
DEF_BUZZER_GAMME:
`void BuzzerGamme(uint8_t pin) { 
  float NOTES[8] = {261.63, 293.66, 329.54, 349.23, 392, 440, 493.88, 523.25}; 
  for (int i=0; i<8; i++) { 
    tone(pin, NOTES[i], 250);
    delay(50);
  }
}`,

/**
 * Play Star Wars theme with Grove buzzer or speaker module.
 * @param {uint8_t} pin
 * @return {void}
 */
DEF_BUZZER_STAR_WARS:
`void BuzzerStarWars(uint8_t pin) { 
  float NOTES[19] = {293.66, 293.66, 293.66, 392.0, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 554.37, 454}; 
  uint8_t DURATIONS[19] = {180, 180, 180, 800, 800, 180, 180, 180, 800, 400, 180, 180, 180, 800, 400, 180, 180, 180, 1000};
  uint8_t SILENCE_DELAYS[19] = {40, 40, 40, 100, 100, 40, 40, 40, 100, 50, 40, 40, 40, 100, 50, 40, 40, 40, 100};
  for (int i=0; i<19; i++)  { 
    tone(pin, NOTES[i], DURATIONS[i]);
    delay(SILENCE_DELAYS[i]);
  }
}`,

/**
 * Play R2D2 theme on a Grove buzzer or speaker module.
 * @param {uint8_t} pin
 * @return {void}
 */
DEF_BUZZER_R2D2:
`void BuzzerR2D2(uint8_t pin) { 
  float R2D2_NOTES[16] = {3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01, 3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01};
  for (int i=0; i<16; i++)  { 
    tone(pin, R2D2_NOTES[i], 80);
    delay(20);
  }
}`,

/**
 * Delayed function for mini i2c motor driver.
 * @param {uint8_t} t
 * @return {void}
 */
DEF_DELAY_UNTIL:
`void delayUntil(uint32_t t) {
  uint32_t startTime = millis();
  while (startTime + t > millis()) {
    if (digitalRead(FAULTn) == LOW) {
      byte result = motor1.getFault();
      if (result & FAULT) {
        Serial.print("Motor 1 fault: ");
        if (result & OCP) Serial.println("Chip overcurrent!");
        if (result & ILIMIT) Serial.println("Load current limit!");
        if (result & UVLO) Serial.println("Undervoltage!");
        if (result & OTS) Serial.println("Over temp!");
        break;
      }
      result = motor2.getFault();
      if (result & FAULT) {
        Serial.print("Motor 2 fault: ");
        if (result & OCP) Serial.println("Chip overcurrent!");
        if (result & ILIMIT) Serial.println("Load current limit!");
        if (result & UVLO) Serial.println("Undervoltage!");
        if (result & OTS) Serial.println("Over temp!");
        break;
      }
    }
  }
}`,

MC33926_STOP_IF_FAULT:
`void mc33926_stopIfFault() {
  if (motorShield.getFault()) {
    Serial.println("Got fault from dual MC33926 motor shield.");
    while(1);
  }
}`,

// Robots blocks

/**
 * Run motors of mBot. 
 * @param {int8_t} dir
 * @param {uint8_t} speed
 * @return {void}
 */
DEF_MBOT_GO:
`void moveMBot(int8_t dir, uint8_t speed) {
  motor_R.run((9) == M1 ? -(dir*speed) : (dir*speed));
  motor_L.run((10) == M1 ? -(dir*speed) : (dir*speed)); 
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

  // Wio Lite AI
  DEF_READ_WIO_DATA: 
`int* wio_get_class_data() {
  static int integer_result[WIO_DATA_LENGTH];
  delay(1000);  // Pause de 1 seconde

  // Démarrage de la communication : écriture de l'adresse du registre (3)
  Wire.beginTransmission(WIO_ADDR);
  Wire.write(3);
  Wire.endTransmission();

  // Demande de lecture de WIO_DATA_LENGTH octets
  Wire.requestFrom(WIO_ADDR, WIO_DATA_LENGTH);
  int i = 0;
  while (Wire.available() && i < WIO_DATA_LENGTH) {
    integer_result[i] = Wire.read();
    i++;
  }

  return integer_result;
}`,

  DEF_WIO_GET_CLASS_DATA_MAX:
`int wio_get_class_data_max() {
  int* data = wio_get_class_data();
  int maxVal = data[0];
  int maxIndex = 0;
  for (int i = 1; i < WIO_DATA_LENGTH; i++) {
    if (data[i] > maxVal) {
      maxVal = data[i];
      maxIndex = i;
    }
  }
  return maxIndex + 1;
}`,

  DEF_WIO_GET_CLASS_DATA_AT:
`int wio_get_class_data_at(int pos) {
  if (pos < 1 || pos > WIO_DATA_LENGTH) {
    return -1; // Position invalide
  }
  int* data = wio_get_class_data();
  return data[pos - 1];
}`,

  DEF_WIO_GET_INFO: 
`int wio_get_info(String query) {
  byte info[2];
  
  // Écriture de l'adresse du registre (1)
  Wire.beginTransmission(WIO_ADDR);
  Wire.write(1);
  Wire.endTransmission();

  // Lecture de 2 octets
  Wire.requestFrom(WIO_ADDR, 2);
  int i = 0;
  while (Wire.available() && i < 2) {
    info[i++] = Wire.read();
  }
  
  if (query == "status") {
    return info[0];
  } else if (query == "version") {
    return info[1];
  } else {
    return -1;  // Indicateur de requête invalide
  }
}`

};