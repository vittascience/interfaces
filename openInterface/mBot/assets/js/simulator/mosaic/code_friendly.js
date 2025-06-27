Simulator.CodeFriendly = Object.create(null);

Simulator.CodeFriendly.getSetups = function (userCode) {
	Simulator.CodeFriendly.setups = [];
	Simulator.CodeFriendly.objects = ['SoftwareSerial', 'MeLightSensor', 'MeCompass', 'MeUltrasonicSensor', 'MeSoundSensor', 'MeLineFollower', 'MePIRMotionSensor', 'MeTemperature', 'MeFlameSensor', 'MeGasSensor', 'MePort', 'MeColorSensor', 'MeDCMotor', 'MeLEDMatrix']
	for (var x in Simulator.CodeFriendly.objects) {
		const obj = Simulator.CodeFriendly.objects[x];
		const SSmodules_regExp = obj + / (.*)\((.*)\);/.source;
		const SSmodules = userCode.match(new RegExp(SSmodules_regExp, 'g'));
		userCode = userCode.replace(new RegExp(SSmodules_regExp, 'g'), obj + ' $1;');
		for (var i in SSmodules) {
			const component = SSmodules[i].match(new RegExp(SSmodules_regExp));
			const initCode = component[1] + '.__init__(' + component[2];
			if (obj == 'SoftwareSerial') {
				Simulator.CodeFriendly.setups.push(initCode + ', false, "' + component[1] + '");')
			} else {
				Simulator.CodeFriendly.setups.push(initCode + ');')
			}
		}
	}
	return userCode;
};

Simulator.CodeFriendly.getCode = function (userCode, _setups) {
	return `#include <SoftwareSerial.h>
using namespace std;
${userCode}
int main() {
  SoftwareSerial Serial;
  Serial.__init__(0, 0, false, "Serial");
  ${_setups}
  setup();
  do {
    loop();
  }
  while(true);
  return 0;
}`;
}

Simulator.CodeFriendly.getAdaptedCode = function (codeIn) {
	codeOut = Simulator.CodeFriendly.replace_pinModules(codeIn);
	//type
	codeOut = Simulator.CodeFriendly.typing(codeOut);
	// serial
	codeOut = Simulator.CodeFriendly.serial(codeOut);
	// Serial print
	codeOut = Simulator.CodeFriendly.print(codeOut);
	// adding setups and user code
	codeOut = Simulator.CodeFriendly.getSetups(codeOut);
	codeOut = Simulator.CodeFriendly.getCode(codeOut, Simulator.CodeFriendly.setups.join('\n'));
	return codeOut;
};

Simulator.CodeFriendly.replace_pinModules = function (code) {
	//analog mean
	code = code.replace(/getAnalogMean\(/, 'analogRead(');
	//typeOf
	code = code.replace(/\/\/ Generic catch-all implementation\.([ \n])*template <typename T_ty> struct TypeInfo \{static const char\* name;\};([ \n])*template <typename T_ty> const char\* TypeInfo<T_ty>::name = "unknown";([ \n])*\/\/ Handy macro to make defining stuff easier\.([ \n])*#define MAKE_TYPE_INFO\(type\) template <> const char\* TypeInfo<type>::name = #type;([ \n])*\/\/ Type\-specific implementations\.([ \n])*MAKE_TYPE_INFO\(char\)([ \n])*MAKE_TYPE_INFO\(String\)([ \n])*MAKE_TYPE_INFO\(boolean\)([ \n])*MAKE_TYPE_INFO\(short\)([ \n])*MAKE_TYPE_INFO\(int\)([ \n])*MAKE_TYPE_INFO\(long\)([ \n])*MAKE_TYPE_INFO\(float\)([ \n])*\/\/ Handy macro to make querying stuff easier\.([ \n])*#define TYPE_NAME\(var\) TypeInfo<typeof\(var\)>::name/, '');
	code = code.replace(/String\(TYPE_NAME\((.*)\)\)/g, 'typeOf($1)');
	// pow
	code = code.replace(/Math\.pow/g, 'pow');
	//wire
	code = code.replace(/  Wire.begin\(\);/g, '');
	//matrix
	code = code.replace(/drawTemp = new uint8_t\[16\] /gi, "uint8_t drawTemp [16] = ");
	//neopixel
	code = code.replace(/MeRGBLed neopixel_([0-9])_(1|2)\(PORT_[0-9],( |)(1|2),( |)[0-9]{1,2}\);/g, "MeRGBLed neopixel_$1_$2;");
	code = code.replace(/neopixel_([0-9])_(1|2).setColor\(/gi, "neopixel_$1_$2.setColor($1$2,");
	code = code.replace(/neopixel_([0-9])_(1|2).show\(\);/gi, "neopixel_$1_$2.show($1$2);");
	code = code.replace(/void neopixel_showAllLed\(/, 'void neopixel_showAllLed_NOT_USE(');
	code = code.replace(/neopixel_showAllLed\(&neopixel_([0-9])_(1|2),/gi, "neopixel_showAllLed($1$2,");
	code = code.replace(/neopixel_rainbow\(&neopixel_([0-9])_(1|2),/gi, "neopixel_rainbow($1$2,");
	code = code.replace(/void neopixel_rainbow\(MeRGBLed \*neoPx,/, "void neopixel_rainbow(uint8_t port,");
	code = code.replace(/neopixel_showAllLed\(neoPx,/gi, "neopixel_showAllLed(port,")
	//RGBLED on board
	code = code.replace(/MeRGBLed rgbled_board\(7,( |)2\);/, "MeRGBLed rgbled_board;");
	code = code.replace(/rgbled_board.setColor\(/gi, "rgbled_board.setColor(7,");
	code = code.replace(/rgbled_board.show\(\);/gi, "rgbled_board.show(7);");
	//RGBLED on port
	code = code.replace(/MeRGBLed rgbled_([0-9])\(PORT_[0-9],( |)[0-9]{1,2}\);/gi, "MeRGBLed rgbled_$1;");
	code = code.replace(/rgbled_([0-9]).setColor\(/gi, "rgbled_$1.setColor($1,");
	code = code.replace(/rgbled_([0-9]).show\(\);/gi, "rgbled_$1.show($1);");
	// Display4digit
	code = code.replace(/Me7SegmentDisplay display4digit_([0-9])\(PORT_[0-9]\);/g, "Me7SegmentDisplay display4digit_$1;");
	code = code.replace(/display4digit_([0-9]).init\(\)/gi, 'display4digit_$1.init($1)');
	code = code.replace(/display4digit_([0-9]).(set|display|point)\(/gi, 'display4digit_$1.$2($1,');
	return code;
};

Simulator.CodeFriendly.typing = function (code) {
	code = code.replace(/uint8_t/g, 'unsigned char');
	code = code.replace(/\(byte\)/g, '(unsigned char)');
	code = code.replace(/byte /g, 'unsigned char ');
	code = code.replace(/int8_t/g, 'signed char');
	code = code.replace(/int16_t/g, 'short');
	code = code.replace(/uint16_t/g, 'unsigned short');
	code = code.replace(/uint32_t/g, 'unsigned int');
	code = code.replace(/boolean /g, 'bool ');
	code = code.replace(/\((boolean|bool)\)/g, 'boolean');
	code = code.replace(/\(int\)\(/g, 'to_int(');
	code = code.replace(/([{[,( ])int\(/g, '$1to_int(');
	code = code.replace(/\(float\)\(/g, 'float(');
	code = code.replace(/([0-9]{1,10})\.(\/|\*|\+|\-)/g, '$1$2');
	code = code.replace(/\.c_str\(\)/g, '');
	code = code.replace(/ \+ ""/g, '');
	code = code.replace(/::/g, '.')
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
