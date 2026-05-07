Simulator.CodeFriendly = Object.create(null);

Simulator.CodeFriendly.getCode = function (userCode, _setups) {
	return `#include <Arduino.h>
#include <SoftwareSerial.h>
using namespace std;
${userCode}
int main() {
  ${_setups}
  setup();
  do {
    loop();
  }
  while(true);
  return 0;
}`;
};

Simulator.CodeFriendly.getAdaptedCode = function (code) {
	// functions
	code = Simulator.CodeFriendly.remove_functions(code);
	// pin modules
	code = Simulator.CodeFriendly.replace_pinModules(code);
	// pulse sensor
	code = Simulator.CodeFriendly.pulseSensor(code);
	// type
	code = Simulator.CodeFriendly.typing(code);
	// serial
	code = Simulator.CodeFriendly.serial(code);
	// serial print
	code = Simulator.CodeFriendly.print(code);
	// wifi
	code = Simulator.CodeFriendly.setDeclarations(code);
	// adding setups and user code
	code = Simulator.CodeFriendly.getSetups(code);
	code = Simulator.CodeFriendly.getCode(code, Simulator.CodeFriendly.setups.join('\n'));
	return code;
};

Simulator.CodeFriendly.getSetups = function (userCode) {
	Simulator.CodeFriendly.setups = [];
	Simulator.CodeFriendly.objects = ['SoftwareSerial', 'DHT', 'HighTemp', 'AirQualitySensor', 'TM1637', 'Grove_LED_Bar', 'Ultrasonic', 'OneWire', 'Adafruit_NeoPixel', 'ChainableLED', 'LiquidCrystal_I2C']
	for (const obj of Simulator.CodeFriendly.objects) {
		const SSmodules_regExp = obj + / (.*)\((.*)\);/.source;
		const SSmodules = userCode.match(new RegExp(SSmodules_regExp, 'g'));
		if (SSmodules) {
			userCode = userCode.replace(new RegExp(SSmodules_regExp, 'g'), obj + ' $1;');
			for (var i in SSmodules) {
				const component = SSmodules[i].match(new RegExp(SSmodules_regExp));
				const initCode = component[1] + '.__init__(' + component[2];
				if (obj == 'SoftwareSerial') {
					Simulator.CodeFriendly.setups.push(initCode + ', false, "' + component[1] + '");')
				} else {
					Simulator.CodeFriendly.setups.push(initCode + ');');
				}
			}
		}
	}
	return userCode;
};

Simulator.CodeFriendly.setDeclarations = function (userCode) {
	const objects = [
		'IPAddress', 'WiFiServer', 'Vittascience_Server', 
		'U8G2_SSD1306_128X64_NONAME_2_HW_I2C', 'U8G2_SSD1315_128X64_NONAME_2_HW_I2C', 'U8G2_SSD1306_128X64_NONAME_F_HW_I2C', 'U8G2_SSD1315_128X64_NONAME_F_HW_I2C'
	];
	for (obj of objects) {
		const re = obj + /\s+([A-Za-z_0-9]\w*)\s*\(([^)]*)\)\s*;/.source;
		const declarations = userCode.match(new RegExp(re, 'g'));
		if (declarations) {
			userCode = userCode.replace(new RegExp(re, 'g'), `${obj} $1 = ${obj}($2);`);
			if (obj == 'IPAddress') {
				for (const ip of declarations) {
					const component = ip.match(re);
					const toString_re = new RegExp(component[1] + /.toString\(\)/.source, 'g');
					userCode = userCode.replace(toString_re, component[1] + '.toStringCPP()');
				}
			}
		}
	}
	return userCode;
};

/**
 * These functions may to be implemented in cpp interpretor for Arduino. It's clean working with blocks
 * but useless for code mode.
 */
Simulator.CodeFriendly.remove_functions = function (code) {
	code = code.replace("uint16_t hm330x_measure(", 'uint16_t hm330x_measure_NOTUSE(');
	code = code.replace("void SeeedOled_drawIcon(", 'void SeeedOled_drawIcon_NOTUSE(');
	code = code.replace("byte ds18b20_measure(", 'byte ds18b20_measure_NOTUSE(');
	code = code.replace("float ds18b20_readTemperature(", 'float ds18b20_readTemperature_NOTUSE(');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_DS18B20_ERRORS + NEWLINE, '/*' + FUNCTIONS_ARDUINO.DEF_DS18B20_ERRORS + '*/\n');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_HM330X_GET_MEASURE + NEWLINE, '');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_MPX5700AP_GET_PRESSURE + NEWLINE, '');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_HCSR04_GET_ULTRASONIC_DATA + NEWLINE, '');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_SCD30_READ + NEWLINE, '');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_MP3_V3_READ_SONG_NAME + NEWLINE, '');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_MP3_V3_GET_ALL_SONG + NEWLINE, '');
	return code;
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	// LED module
	code = code.replace(/#define PIN_LED_MODULE_13  13/, '');
	code = code.replace(/PIN_LED_MODULE_13/g, '13');
	//grove i2c driver
	code = code.replace(/#include <Grove_I2C_Motor_Driver.h>/, '');
	code = code.replace(/#define MOTOR_I2C_ADDR 0x0f/g, '');
	code = code.replace(/Motor.begin\(MOTOR_I2C_ADDR\);/g, '');
	code = code.replace(/Motor.(speed|stop)\(MOTOR(1|2)/g, 'Motor_$1($2');
	code = code.replace(/Motor.StepperRun\(/g, 'Motor_StepperRun(');
	//gesture sensor
	code = code.replace(/#include <paj7620.h>/, '#include <paj7620.h>\nconst int GES_RIGHT_FLAG= 0; \nconst int GES_LEFT_FLAG= 1;  \nconst int GES_UP_FLAG= 2; \nconst int GES_DOWN_FLAG= 3; \nconst int GES_FORWARD_FLAG= 4; \nconst int GES_BACKWARD_FLAG= 5; \nconst int GES_CLOCKWISE_FLAG= 6; \nconst int GES_COUNT_CLOCKWISE_FLAG= 7; \nconst int GES_WAVE_FLAG= 8;');
	code = code.replace(/paj7620Init\(\);/, '');
	code = code.replace(/paj7620ReadReg\(0x43, 1, &data\);/, 'data = paj7620ReadReg();');
	//bmp280
	code = code.replace(/#define BMP280_I2C_ADDR         (0x76|0x77)/g, '');
	code = code.replace(/Adafruit_BMP280 bmp280;/g, '');
	code = code.replace(/while \(\!bmp280\.begin\(BMP280_I2C_ADDR\)\) \{([ \n])*delay\(50\);([ \n])*Serial.println\("En attente du capteur BMP280\.\.\."\);([ \n])*delay\(1000\);([ \n])*\}/g, '');
	code = code.replace(/bmp280\./g, 'bmp280_');
	code = code.replace(/readAltitude\(\)/g, 'readAltitude(-1)');
	//bme680
	code = code.replace(/#include <seeed_bme680.h>/g, '');
	code = code.replace(/Seeed_BME680 bme680\(BME680_I2C_ADDR\);\n/g, '');
	code = code.replace(/bme680\./g, 'bme680_');
	//sgp30
	code = code.replace(/Adafruit_SGP30 sgp30;/g, '');
	code = code.replace(/([ \n])*if \(!sgp30\.IAQmeasure\(\)\) \{([ \n])*Serial\.println\("Measurement failed"\);([ \n])*return 0;([ \n])*\}/g, 'if(true==false){}');
	code = code.replace(/uint16_t sgp30_readTVOC/g, 'int sgp30_myTVOC');
	code = code.replace(/uint16_t sgp30_readCO2/g, 'int sgp30_myCO2');
	code = code.replace(/sgp30\./g, 'sgp30_');
	//multichannel
	code = code.replace(/#define MULTICHANNEL_I2C_ADDR   0x04/g, '');
	code = code.replace(/gas\.begin\(MULTICHANNEL_I2C_ADDR\);/g, '');
	code = code.replace(/gas\.powerOn\(\);/g, '');
	code = code.replace(/gas\.measure/g, 'gas_measure');
	//multichannel v2
	code = code.replace(/#include <Multichannel_Gas_GMXXX.h>\n/g, '');
	code = code.replace(/#define MULTICHANNEL_I2C_ADDR_V2   0x08\n/g, '');
	code = code.replace(/GAS_GMXXX<TwoWire> multichannel_v2;\n/g, '');
	code = code.replace(/multichannel_v2.begin\(Wire, MULTICHANNEL_I2C_ADDR_V2\);\n/g, '');
	code = code.replace(/multichannel_v2\.getGM102B/g, 'multichannel_v2_getGM102B'); // NO2
	code = code.replace(/multichannel_v2\.getGM702B/g, 'multichannel_v2_getGM702B'); // CO
	code = code.replace(/multichannel_v2\.getGM302B/g, 'multichannel_v2_getGM302B'); // C2H5OH
	code = code.replace(/multichannel_v2\.getGM502B/g, 'multichannel_v2_getGM502B'); // COV
	//hm330x
	code = code.replace(/HM330XErrorCode/g, 'int');
	//air quality
	code = code.replace(/AirQualitySensor::FORCE_SIGNAL/g, '0');
	code = code.replace(/AirQualitySensor::HIGH_POLLUTION/g, '1');
	code = code.replace(/AirQualitySensor::LOW_POLLUTION/g, '2');
	code = code.replace(/AirQualitySensor::FRESH_AIR/g, '3');
	//si1145
	code = code.replace(/Adafruit_SI1145 si1145( |)=( |)Adafruit_SI1145\(\);\n/g, '');
	code = code.replace(/si1145\./g, 'si1145_');
	//th02
	code = code.replace(/#include <TH02_dev.h>/g, '#include <TH02_dev.h>\nTH02_dev TH02;');
	//sht31
	code = code.replace(/SHT31 sht31 = SHT31\(\);\n/, '');
	code = code.replace(/sht31\./g, 'sht31_');
	//oled
	code = code.replace(/#include (<|")SeeedOLED.h(>|")/, "#include <SeeedOLED.h>\nSeeedOled SeeedOled;");
	code = code.replace(/#include <avr\/pgmspace.h>/, '');
	code = code.replace(/(vittascienceLogo|arduinoLogo|seeedLogo|microbitLogo)( |)\[\] PROGMEM/g, '$1[1024]');
	code = code.replace(/\((int|uint8_t)\*\)(vittascienceLogo|arduinoLogo|seeedLogo|microbitLogo)/g, '$2');
	code = code.replace(/( |)\[\] (U8X8_|)PROGMEM/g, '[]');
	//color sensor
	code = code.replace(/Adafruit_TCS34725 (.*) = Adafruit_TCS34725\((.*)\);/g, 'Adafruit_TCS34725 $1;');
	//onewire ds18b20
	code = code.replace(/ds18b20_readTemperature\(&ds18b20_((A|D|)[0-9]{1,2})\)/g, 'ds18b20_readTemperature($1)');
	//clock rtc
	code = code.replace(/DS1307 clock;\n/, '');
	code = code.replace(/clock\.fillDayOfWeek\(([A-Z]{3})\)/g, 'clock.fillDayOfWeek("$1")');
	code = code.replace(/clock\.(begin|fill|setTime|startClock)/gi, 'clock_$1');
	code = code.replace(/ds1307_RTC_getTime\(&clock, ([0-5])\)/g, 'clock_ds1307_RTC_getTime($1)');
	code = code.replace(FUNCTIONS_ARDUINO.DEF_DS1307_RTC_GET_TIME, '');
	//buzzer
	code = code.replace(/( |  |   |    )tone\(pin, (G|SW|R2D2)_NOTES\[i\], (250|DURATIONS\[i\]|80)\);\n/gi, '$1tone(pin, $2_NOTES[i]);\n$1delay($3);\n');
	code = code.replace(/Buzzer(Gamme|R2D2|StarWars)\(.*([1-9])\)/gi, 'Buzzer$1(PIN_BUZZER_$2);\nnoTone(PIN_BUZZER_$2);\n');
	//typeOf
	code = code.replace(/\/\/ Generic catch-all implementation\.([ \n])*template <typename T_ty> struct TypeInfo \{static const char\* name;\};([ \n])*template <typename T_ty> const char\* TypeInfo<T_ty>::name = "unknown";([ \n])*\/\/ Handy macro to make defining stuff easier\.([ \n])*#define MAKE_TYPE_INFO\(type\) template <> const char\* TypeInfo<type>::name = #type;([ \n])*\/\/ Type\-specific implementations\.([ \n])*MAKE_TYPE_INFO\(char\)([ \n])*MAKE_TYPE_INFO\(String\)([ \n])*MAKE_TYPE_INFO\(boolean\)([ \n])*MAKE_TYPE_INFO\(short\)([ \n])*MAKE_TYPE_INFO\(int\)([ \n])*MAKE_TYPE_INFO\(long\)([ \n])*MAKE_TYPE_INFO\(float\)([ \n])*\/\/ Handy macro to make querying stuff easier\.([ \n])*#define TYPE_NAME\(var\) TypeInfo<typeof\(var\)>::name/, '');
	code = code.replace(/String\(TYPE_NAME\((.*)\)\)/g, 'typeOf($1)');
	// pow
	code = code.replace(/Math\.pow/g, 'pow');
	//wire
	code = code.replace(/  Wire.begin\(\);/g, '');
	//neopixel
	if (/Adafruit_NeoPixel\.h/.test(code)) {
		code = code.replace(/for \((R|G|B); (R|G|B)/g, 'for ((unsigned char)$1; $1')
	}
	//scd30
	code = code.replace(/scd30\./g, 'scd30_');
	//mp3
	if (/SeeedGroveMP3\.h/.test(code)) {
		code = Simulator.CodeFriendly.mp3(code);
	}
	// Grove Encoder
	if (/GroveEncoder\.h/.test(code)) {
		code = code.replace(/GroveEncoder encoder_2\(2, NULL\);/g, '');
		code = code.replace(/encoder_2\.getValue\(\)/g, 'encoder_2getValue()');
		code = code.replace(/#include <GroveEncoder.h>/g, '');
	}
	// Arduino R4 LED Matrix
	code = code.replace(/const Font(& | &)/g, 'Font ');
	return code;
};

Simulator.CodeFriendly.typing = function (code) {
	// 8 bits
	code = code.replace(/\b(uint8_t|byte)\b */g, 'unsigned char ');
	code = code.replace(/\( *(uint8_t|byte) *\)/g, '(unsigned char)');
	code = code.replace(/\bint8_t\b */g, 'signed char ');
	code = code.replace(/\( *int8_t *\)/g, '(signed char)');
	if (Simulator.board.id == BOARD_ARDUINO_UNO_R4_WIFI) {
		// 16 bits
		code = code.replace(/\bint16_t\b */g, 'short ');
		code = code.replace(/\( *int16_t *\)/g, '(short)');
		code = code.replace(/\b(uint16_t|wchar_t)\b */g, 'unsigned short ');
		code = code.replace(/\( *(uint16_t|wchar_t) *\)/g, '(unsigned short)');
		// 32 bits
		code = code.replace(/\bint32_t\b */g, 'int ');
		code = code.replace(/\( *int32_t *\)/g, '(int)');
		code = code.replace(/\buint32_t\b */g, 'unsigned int ');
		code = code.replace(/\( *uint32_t *\)/g, '(unsigned int)');
	} else {
		// 16 bits
		code = code.replace(/\bint16_t\b */g, 'int ');
		code = code.replace(/\( *int16_t *\)/g, '(int)');
		code = code.replace(/\b(uint16_t|wchar_t)\b */g, 'unsigned int ');
		code = code.replace(/\( *(uint16_t|wchar_t) *\)/g, '(unsigned int)');
		// 32 bits
		code = code.replace(/\bint32_t\b */g, 'long ');
		code = code.replace(/\( *int32_t *\)/g, '(long)');
		code = code.replace(/\buint32_t\b */g, 'unsigned long ');
		code = code.replace(/\( *uint32_t *\)/g, '(unsigned long)');
	}
	// 64 bits
	code = code.replace(/\bint64_t\b */g, 'long long ');
	code = code.replace(/\( *int64_t *\)/g, '(long long)');
	code = code.replace(/\buint64_t\b */g, 'unsigned long long ');
	code = code.replace(/\( *uint64_t *\)/g, '(unsigned long long)');
	// AVR (16 bits) - R4 (32 bits)
	code = code.replace(/\b(size_t|uintptr_t)\b */g, 'unsigned int ');
	code = code.replace(/\( *(size_t|uintptr_t) *\)/g, '(unsigned int)');
	code = code.replace(/\b(ssize_t|ptrdiff_t|intptr_t)\b */g, 'int ');
	code = code.replace(/\( *(ssize_t|ptrdiff_t|intptr_t) *\)/g, '(int)');
	// boolean
	code = code.replace(/\bboolean\b(?! *\()/g, 'bool');
	code = code.replace(/\( *boolean *\)/g, '(bool)');
	// float() / int() / char() raise parsing errors with JSCPP
	code = code.replace(/(?<![A-Za-z0-9_])int *\(/g, 'vitta_to_int(');
	code = code.replace(/(?<![A-Za-z0-9_])float *\(/g, 'vitta_to_float(');
	code = code.replace(/(?<![A-Za-z0-9_])char *\(/g, 'vitta_to_char(');
	// TO DO : what is it ?
	code = code.replace(/([0-9]{1,10})\.(\/|\*|\+|\-)/g, '$1$2');
	// other
	code = code.replace(/ \+ ""/g, '');
	code = code.replace(/::/g, '.');
	code = code.replace(/Stream& /g, 'SoftwareSerial ');
	code = code.replace(/const String(& | &)/g, 'const String ');
	return code;
};

Simulator.CodeFriendly.serial = function (code) {
	code = code.replace(/\(!Serial\)/g, '(false)');
	return code;
};

Simulator.CodeFriendly.print = function (code) {
	code = code.replace(/String\(([^\)\()]*)\).length\(\)/g, 'length($1)');
	return code;
};

Simulator.CodeFriendly.mp3 = function (code) {
	code = code.replace('#define COMSerial SSerial', '');
	code = code.replace('WT2003S<SoftwareSerial>', 'SeeedGroveMP3');
	code = code.replace('STROAGE workdisk = SD;', '');
	code = code.replace(FUNCTIONS_ARDUINO.DECLARE_STRUCT_MP3_PLAY_HISTORY, '');
	code = code.replace('Mp3Player.init(COMSerial);', 'Mp3Player.init();');
	code = code.replace(/SoftwareSerial SSerial\(.+\);(\n|)/g, '');
	code = code.replace('MP3_V3_getAllSong()', 'Mp3Player.getAllSong()');
	return code;
};

Simulator.CodeFriendly.pulseSensor = function (code) {
	//pulse sensor
	const pulseSensorBpmSimu = `
float getBPM(uint8_t pin) {
	double startTime = millis();
	double duration = 2000; // Durée d'échantillonnage : 2 secondes
	long sum = 0;
	int count = 0;

	// Accumuler les valeurs pendant 2 secondes
	while (millis() - startTime < duration) {
		sum += analogRead(pin);
		count++;
	}
	
	// Calcul de la moyenne des valeurs lues
	float average = (float)sum / count;

	// Conversion de la valeur moyenne en BPM
	// Ici, on mappe de 0 -> 60 BPM et 1023 -> 180 BPM
	float bpm = 60 + (average / 1023.0) * 140;
	return bpm;
}`;
	code = code.replace(FUNCTIONS_ARDUINO.DEF_PULSE_SENSOR_GET_BPM, pulseSensorBpmSimu);
	return code;
}

