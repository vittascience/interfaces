const ARDUINO_H = {

    "String.h": {
        load: function (rt) {

            const String_t = rt.newClass("String", [
                {
                    type: rt.arrayPointerType(rt.charTypeLiteral),
                    name: "_value",
                    initialize(rt, _this) { return rt.charArray_makeFromJSString("") }
                }, {
                    type: rt.arrayPointerType(rt.charTypeLiteral),
                    name: "_capacity",
                    initialize(rt, _this) { return rt.val(rt.unsignedintTypeLiteral, 0) }
                }
            ]);

            rt.String_makeValueFromArray = function (charArray) {
                return {
                    t: String_t,
                    v: {
                        members: {
                            _value: charArray,
                            _capacity: rt.val(rt.unsignedintTypeLiteral, charArray.v.target.length)
                        }
                    },
                    left: true
                }
            };
            rt.String_makeValueFromJSString = function (str) {
                const charArray = rt.charArray_makeFromJSString(str);
                return rt.String_makeValueFromArray(charArray);
            };
            rt.String_getJSString = function (str) {
                if (rt.isStringClass(str)) str = str.v.members._value;
                return rt.charArray_getJSString(str);
            };
            rt.isStringClass = function (type) {
                if ('t' in type) {
                    return rt.isStringClass(type.t);
                }
                return type.type == 'class' && type.name == "String";
            };
            rt.String_t = String_t;

            rt.regFunc(function (rt, _this, input) {
                if (!input) input = rt.charArray_makeFromJSString("");
                if (rt.isPrimitiveType(input)) {
                    if (input.t.name === "char") {
                        input = rt.charArray_makeFromJSString(String.fromCharCode(input.v));
                    } else {
                        input = rt.charArray_makeFromJSString(String(input.v));
                    }
                } else if (rt.isStringClass(input)) {
                    input = input.v.members._value;
                }
                if (rt.isStringType(input)) {
                    return rt.String_makeValueFromArray(input);
                } else {
                    throw new Error('Unable to make String class with value: ' + String(input));
                }
            }, "global", "String", ['?'], String_t);

            /****  basics methods ****/

            const length = (rt, _this) => rt.val(rt.unsignedintTypeLiteral, _this.v.members._value.v.target.length - 1);
            rt.regFunc(length, String_t, "length", [], rt.unsignedintTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._value;
            }, String_t, "c_str", [], rt.arrayPointerType(rt.charTypeLiteral));

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, length(rt, _this).v == 0);
            }, String_t, "isEmpty", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, index) {
                if (index.v < 0) index.v = rt.config.limits['unsigned int'].max;
                else if (index.v < length(rt, _this).v) {
                    return _this.v.members._value.v.target[index.v];
                }
                return rt.val(rt.charTypeLiteral, index.v);
            }, String_t, "charAt", [rt.unsignedintTypeLiteral], rt.charTypeLiteral);

            /****  memory ****/

            rt.regFunc(function (rt, _this, size) {
                _this.v.members._capacity.v = size.v;
            }, String_t, "reserve", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._capacity;
            }, String_t, "capacity", [], rt.unsignedintTypeLiteral);

            /****  search & substring ****/

            const indexOf = function (rt, _this, str, indexOf) {
                const index = rt.String_getJSString(_this).indexOf(str, indexOf);
                return rt.val(rt.intTypeLiteral, index);
            }
            // indexOf(char ch)
            rt.regFunc(function (rt, _this, char) {
                return indexOf(rt, _this, String.fromCharCode(char.v));
            }, String_t, "indexOf", [rt.charTypeLiteral], rt.intTypeLiteral);

            // indexOf(char ch, fromIndex)
            rt.regFunc(function (rt, _this, char, fromIndex) {
                return indexOf(rt, _this, String.fromCharCode(char.v), fromIndex.v);
            }, String_t, "indexOf", [rt.charTypeLiteral, rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            // indexOf(const String& str)
            rt.regFunc(function (rt, _this, str) {
                return indexOf(rt, _this, rt.String_getJSString(str));
            }, String_t, "indexOf", [String_t], rt.unsignedintTypeLiteral);

            // indexOf(const String& str, fromIndex)
            rt.regFunc(function (rt, _this, str, fromIndex) {
                return indexOf(rt, _this, rt.String_getJSString(str), fromIndex.v);
            }, String_t, "indexOf", [String_t, rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            // indexOf(const char* str)
            rt.regFunc(function (rt, _this, str) {
                return indexOf(rt, _this, rt.charArray_getJSString(str));
            }, String_t, "indexOf", [rt.arrayPointerType(rt.charTypeLiteral)], rt.unsignedintTypeLiteral);

            // indexOf(const char* str, fromIndex)
            rt.regFunc(function (rt, _this, str, fromIndex) {
                return indexOf(rt, _this, rt.charArray_getJSString(str), fromIndex.v);
            }, String_t, "indexOf", [rt.arrayPointerType(rt.charTypeLiteral), rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);


            const lastIndexOf = function (rt, _this, str, indexOf) {
                const index = rt.String_getJSString(_this).lastIndexOf(str, indexOf);
                return rt.val(rt.intTypeLiteral, index);
            };
            // lastIndexOf(char ch)
            rt.regFunc(function (rt, _this, char) {
                return lastIndexOf(rt, _this, String.fromCharCode(char.v));
            }, String_t, "lastIndexOf", [rt.charTypeLiteral], rt.intTypeLiteral);

            // lastIndexOf(char ch, fromIndex)
            rt.regFunc(function (rt, _this, char, fromIndex) {
                return lastIndexOf(rt, _this, String.fromCharCode(char.v), fromIndex.v);
            }, String_t, "lastIndexOf", [rt.charTypeLiteral, rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            // lastIndexOf(const String& str)
            rt.regFunc(function (rt, _this, str) {
                return lastIndexOf(rt, _this, rt.String_getJSString(str));
            }, String_t, "lastIndexOf", [String_t], rt.unsignedintTypeLiteral);

            // lastIndexOf(const String& str, fromIndex)
            rt.regFunc(function (rt, _this, str, fromIndex) {
                return lastIndexOf(rt, _this, rt.String_getJSString(str), fromIndex.v);
            }, String_t, "lastIndexOf", [String_t, rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            // lastIndexOf(const char* str)
            rt.regFunc(function (rt, _this, str) {
                return lastIndexOf(rt, _this, rt.charArray_getJSString(str));
            }, String_t, "lastIndexOf", [rt.arrayPointerType(rt.charTypeLiteral)], rt.unsignedintTypeLiteral);

            // lastIndexOf(const char* str, fromIndex)
            rt.regFunc(function (rt, _this, str, fromIndex) {
                return lastIndexOf(rt, _this, rt.charArray_getJSString(str), fromIndex.v);
            }, String_t, "lastIndexOf", [rt.arrayPointerType(rt.charTypeLiteral), rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);


            const startsWith = function (rt, _this, str, offset) {
                const isStart = rt.String_getJSString(_this).startsWith(str, offset);
                return rt.val(rt.boolTypeLiteral, isStart);
            };
            // startsWith(const String& s)
            rt.regFunc(function (rt, _this, str) {
                return startsWith(rt, _this, rt.String_getJSString(str));
            }, String_t, "startsWith", [String_t], rt.boolTypeLiteral);

            // startsWith(const String& s, offset)
            rt.regFunc(function (rt, _this, str, offset) {
                return startsWith(rt, _this, rt.String_getJSString(str), offset.v);
            }, String_t, "startsWith", [String_t, rt.unsignedintTypeLiteral], rt.boolTypeLiteral);

            // startsWith(const char* s)
            rt.regFunc(function (rt, _this, charArray) {
                return startsWith(rt, _this, rt.charArray_getJSString(charArray));
            }, String_t, "startsWith", [rt.arrayPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

            // startsWith(const char* s, offset)
            rt.regFunc(function (rt, _this, charArray, offset) {
                return startsWith(rt, _this, rt.charArray_getJSString(charArray), offset.v);
            }, String_t, "startsWith", [rt.arrayPointerType(rt.charTypeLiteral), rt.unsignedintTypeLiteral], rt.boolTypeLiteral);

            const endsWith = function (rt, _this, str) {
                const isEnd = rt.String_getJSString(_this).startsWith(str);
                return rt.val(rt.boolTypeLiteral, isEnd);
            };
            // endsWith(const String& s)
            rt.regFunc(function (rt, _this, str) {
                return endsWith(rt, _this, rt.String_getJSString(str), offset.v);
            }, String_t, "endsWith", [String_t], rt.boolTypeLiteral);

            // endsWith(const char* s)
            rt.regFunc(function (rt, _this, charArray) {
                return endsWith(rt, _this, rt.charArray_getJSString(charArray), offset.v);
            }, String_t, "endsWith", [rt.arrayPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

            // substring(from)
            rt.regFunc(function (rt, _this, from) {
                rt.raiseException('[String] <b>substring()</b> is not yet implemented.');
            }, String_t, "substring", [rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            // substring(from, to)
            rt.regFunc(function (rt, _this, from, to) {
                rt.raiseException('[String] <b>substring()</b> is not yet implemented.');
            }, String_t, "substring", [rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

            /****  comparison ****/

            rt.regFunc(function (rt, _this, str) {
                rt.raiseException('[String] <b>equals()</b> is not yet implemented.');
            }, String_t, "equals", [String_t], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                rt.raiseException('[String] <b>equalsIgnoreCase()</b> is not yet implemented.');
            }, String_t, "equalsIgnoreCase", [String_t], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                rt.raiseException('[String] <b>compareTo()</b> is not yet implemented.');
            }, String_t, "compareTo", [String_t], rt.intTypeLiteral);

            /****  conversion ****/

            rt.regFunc(function (rt, _this) {
                let integer = parseInt(rt.String_getJSString(_this));
                if (isNaN(integer)) integer = 0;
                return rt.val(rt.longTypeLiteral, integer);
            }, String_t, "toInt", [], rt.longTypeLiteral);

            rt.regFunc(function (rt, _this) {
                let float = parseFloat(rt.String_getJSString(_this));
                if (isNaN(float)) float = 0;
                return rt.val(rt.floatTypeLiteral, float);
            }, String_t, "toFloat", [], rt.floatTypeLiteral);

            // toCharArray(char *buf, size_t bufsize)
            rt.regFunc(function (rt, _this, charArray, bufsize) {
                rt.raiseException('[String] <b>toCharArray()</b> is not yet implemented.');
            }, String_t, "toCharArray", [rt.arrayPointerType(rt.charTypeLiteral), rt.unsignedintTypeLiteral], rt.floatTypeLiteral);

            /**** operators ****/

            const plus = function (rt, _this, str) {
                const string = rt.String_getJSString(_this) + str;
                return rt.charArray_makeFromJSString(string);
            };
            rt.regFunc(function (rt, _this, str) {
                return rt.String_makeValueFromArray(plus(rt, _this, rt.String_getJSString(str)));
            }, String_t, "o(+)", [String_t], String_t);

            rt.regFunc(function (rt, _this, charArray) {
                return rt.String_makeValueFromArray(plus(rt, _this, rt.charArray_getJSString(charArray)));
            }, String_t, "o(+)", [rt.arrayPointerType(rt.charTypeLiteral)], String_t);

            rt.regFunc(function (rt, _this, str) {
                _this.v.members._value = plus(rt, _this, rt.String_getJSString(str));
            }, String_t, "o(+=)", [String_t], String_t);

            rt.regFunc(function (rt, _this, charArray) {
                _this.v.members._value = plus(rt, _this, rt.charArray_getJSString(charArray));
            }, String_t, "o(+=)", [rt.arrayPointerType(rt.charTypeLiteral)], String_t);

            rt.String_compare = function (a, b, operator) {
                a = rt.String_getJSString(a);
                b = rt.String_getJSString(b);
                function compare(x, y) {
                    const len = Math.min(x.length, y.length);
                    for (let i = 0; i < len; i++) {
                        const cx = x.charCodeAt(i) | 0;
                        const cy = y.charCodeAt(i) | 0;
                        if (cx !== cy) {
                            return cx - cy;
                        }
                    }
                }
                const cmp = compare(a, b);
                switch (operator) {
                    case "o(<)":
                        return this.val(this.boolTypeLiteral, cmp < 0);
                    case "o(>)":
                        return this.val(this.boolTypeLiteral, cmp > 0);
                    case "o(>=)":
                        return this.val(this.boolTypeLiteral, cmp >= 0);
                    case "o(<=)":
                        return this.val(this.boolTypeLiteral, cmp <= 0);
                    default:
                        throw new Error("invalid operator: use (<) (>) (>=) or (<=)");
                }
            };

            rt.regFunc(function (rt, _this, charArray) {
                return rt.String_compare(_this, charArray, 'o(>)');
            }, String_t, "o(>)", [rt.arrayPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                return rt.String_compare(_this, str, 'o(>)');
            }, String_t, "o(>)", [String_t], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, charArray) {
                return rt.String_compare(_this, charArray, 'o(<)');
            }, String_t, "o(<)", [rt.arrayPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                return rt.String_compare(_this, str, 'o(<)');
            }, String_t, "o(<)", [String_t], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, charArray) {
                return rt.types["pointer"].handlers["o(==)"].default(rt, _this.v.members._value, charArray);
            }, String_t, "o(==)", [rt.arrayPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, int) {
                return rt.types["pointer"].handlers["o(==)"].default(rt, _this.v.members._value, int);
            }, String_t, "o(==)", [rt.intTypeLiteral], rt.boolTypeLiteral);

        }
    },
    "Print.h": {
        load: function (rt) {

            const Print_t = rt.newClass("Print", []);

            rt.defVar("DEC", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 10));
            rt.defVar("HEX", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 16));
            rt.defVar("OCT", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 8));

            const getString = function (rt, input, option) {
                let string = '\r';
                if (input) {
                    if (rt.isIntegerType(input)) {
                        const base = option ? option.v : rt.readVar('DEC').v;
                        string = input.v.toString(base)
                    } else if (rt.isFloatType(input)) {
                        const digits = option ? option.v : 2;
                        string = number.v.toFixed(digits.v);
                    } else {
                        if (option) rt.raiseException("invalid arguments")
                        if (rt.isCharType(input)) {
                            string = String.fromCharCode(input.v);
                        } else if (rt.isStringType(input)) {
                            string = rt.charArray_getJSString(input);
                        } else if (rt.isStringClass(input)) {
                            string = rt.String_getJSString(input);
                        } else if (rt.isClassType(input)) {
                            string = rt.getFunc(input.t, "toStringCPP", [])(rt, input);
                            string = rt.String_getJSString(string);
                        } else {
                            string = String(input.v);
                        }
                    }
                }
                return string;
            };

            rt.regFunc(function (rt, _this, input, option) {
                const string = getString(rt, input, option);
                const buffer = rt.charArray_makeFromJSString(string);
                return rt.getFunc(_this.t, "write", ['?'])(rt, _this, buffer);
            }, Print_t, "print", ['?'], rt.intTypeLiteral, [rt.intTypeLiteral]);

            rt.regFunc(function (rt, _this, input, option) {
                const string = getString(rt, input, option) + '\n';
                const buffer = rt.charArray_makeFromJSString(string);
                return rt.getFunc(_this.t, "write", ['?'])(rt, _this, buffer);
            }, Print_t, "println", ['?'], rt.intTypeLiteral, [rt.intTypeLiteral]);
        }
    },
    "HardwareSerial.h": {
        load: function (rt) {
            const HardwareSerial_t = rt.newClass(
                "HardwareSerial",
                [{
                    type: rt.unsignedcharTypeLiteral,
                    name: "_rx"
                }, {
                    type: rt.unsignedcharTypeLiteral,
                    name: "_dx"
                }],
                ["Print"]);

            const HardwareSerial = function (rx, tx) {
                return {
                    t: HardwareSerial_t,
                    v: {
                        members: {
                            _rx: rt.val(rt.unsignedcharTypeLiteral, rx),
                            _tx: rt.val(rt.unsignedcharTypeLiteral, tx)
                        }
                    },
                    left: false
                }
            };

            rt.defVar("Serial", HardwareSerial_t, HardwareSerial(0, 1));

            if (typeof BOARD_ARDUINO_UNO_R4_WIFI !== 'undefined' && rt.config.board.id === BOARD_ARDUINO_UNO_R4_WIFI) {
                rt.defVar("Serial1", HardwareSerial_t, HardwareSerial(0, 1));
            }

            if (typeof BOARD_ARDUINO_MEGA !== 'undefined' && rt.config.board.id === BOARD_ARDUINO_MEGA) {
                rt.defVar("Serial1", HardwareSerial_t, HardwareSerial(19, 18));
                rt.defVar("Serial2", HardwareSerial_t, HardwareSerial(17, 16));
                rt.defVar("Serial3", HardwareSerial_t, HardwareSerial(15, 14));
            }

            const begin = function (rt, _this, speed) {
                const baud = rt.val(rt.doubleTypeLiteral, speed.v);
            };
            rt.regFunc(begin, HardwareSerial_t, "begin", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            const read = function (rt, _this) {
                const char = Simulator.serialData.charAt(0);
                if (char) {
                    Simulator.serialData = Simulator.serialData.slice(1);
                    return rt.val(rt.intTypeLiteral, char);
                } else {
                    return rt.val(rt.intTypeLiteral, -1);
                }
            };
            rt.regFunc(read, HardwareSerial_t, "read", [], rt.intTypeLiteral);

            const readString = function (rt, _this) {
                const data = Simulator.serialData;
                Simulator.serialData = "";
                return rt.String_makeValueFromJSString(data);
            };
            rt.regFunc(readString, HardwareSerial_t, "readString", [], rt.String_t);

            const write = function (rt, _this, data) {
                let string = "";
                if (rt.isCharType(data.t)) {
                    string = String.fromCharCode(data.v);
                } else if (rt.isStringType(data)) {
                    string = rt.charArray_getJSString(data);
                } else if (rt.isStringClass(data)) {
                    rt.raiseException("no matching function for call to 'HardwareSerial::write(String)'");
                } else {
                    string = String(data.v);
                }
                const strLength = string.length;
                // write behavior for 'Serial' TO DO: behavior with another component on material ports
                if (string.match(/\n/)) {
                    InterfaceMonitor.sendDataToChart(Simulator.outputMemory);
                    Simulator.outputMemory = '';
                } else {
                    Simulator.outputMemory += string;
                }
                const cons = document.getElementById('console');
                string = string.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                cons.innerHTML += string.replace(/\n/g, '</br>');
                cons.scrollTo(0, cons.scrollHeight);
                return rt.val(rt.intTypeLiteral, strLength);
            }
            rt.regFunc(write, HardwareSerial_t, "write", ['?'], rt.intTypeLiteral);

            const available = function (rt, _this) {
                return rt.val(rt.intTypeLiteral, Simulator.serialData.length);
            };
            rt.regFunc(available, HardwareSerial_t, "available", [], rt.intTypeLiteral);
        }
    },
    'Arduino.h': {

        load: function (rt) {

            // includes
            rt.include("String.h");
            rt.include("Print.h");
            rt.include("HardwareSerial.h");

            // constants cpp
            rt.defVar("PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 3.1415926535897932384626433832795));
            rt.defVar("HALF_PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 1.5707963267948966192313216916398));
            rt.defVar("TWO_PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 6.283185307179586476925286766559));
            rt.defVar("DEG_TO_RAD", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.017453292519943295769236907684886));
            rt.defVar("RAD_TO_DEG", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 57.295779513082320876798154814105));
            rt.defVar("M_PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 3.141592653589793238462643));
            rt.defVar("M_E", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 2.7182818284590452354));
            rt.defVar("M_LOG2E", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 1.4426950408889634074));
            rt.defVar("M_LOG10E", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.43429448190325182765));
            rt.defVar("M_LN2", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.69314718055994530942));
            rt.defVar("M_LN10", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 2.30258509299404568402));
            rt.defVar("M_1_PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.31830988618379067154));
            rt.defVar("M_2_PI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.63661977236758134308));
            rt.defVar("M_2_SQRTPI", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 1.12837916709551257390));
            rt.defVar("M_SQRT2", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 1.41421356237309504880));
            rt.defVar("M_SQRT1_2", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0.70710678118654752440));

            if (typeof BOARD_ARDUINO_UNO_R4_WIFI !== 'undefined' && rt.config.board.id == BOARD_ARDUINO_UNO_R4_WIFI) {
                const t = rt.primitiveType("long double");
                rt.defVar("INFINITY", t, rt.val(t, 1.79769e+308));
            } else {
                rt.defVar("INFINITY", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 0x7f800000));
            }

            // char()
            rt.regFunc((function (rt, _this, value) {
                if (value.t.eleType && x.t.eleType.name == "char") {
                    return rt.nullPointer;
                }
                if (value.t && (x.t.name == "unsigned int" || value.t.name == "double")) {
                    let tabChar = [{
                        t: rt.charTypeLiteral,
                        v: value.v
                    }, {
                        t: rt.charTypeLiteral,
                        v: 0
                    }]
                    let char = {
                        t: rt.normalPointerType(rt.charTypeLiteral),
                        v: {
                            target: tabChar,
                            position: 0
                        }
                    };
                    return char;
                }
            }), "global", "char", ["?"], rt.normalPointerType(rt.charTypeLiteral));

            // boolean()
            const boolean = function (rt, _this, value) {
                if (value.t.targetType && value.t.targetType.name == "void") {
                    return rt.val(rt.boolTypeLiteral, false);
                }
                if (value.v) {
                    return rt.val(rt.boolTypeLiteral, true);
                } else {
                    return rt.val(rt.boolTypeLiteral, false);
                }
            };
            rt.regFunc(boolean, "global", "boolean", ['?'], rt.boolTypeLiteral);
            rt.regFunc(boolean, "global", "bool", ['?'], rt.boolTypeLiteral);

            // int()
            rt.regFunc((function (rt, _this, value) {
                let number = Math.trunc(Number(value.v));
                if (number) {
                    return rt.val(rt.intTypeLiteral, number);
                } else {
                    number = parseInt(Simulator.getStringFromInterpretor(value));
                    if (number) {
                        return rt.val(rt.intTypeLiteral, number);
                    } else {
                        return rt.nullPointer;
                    }
                }
            }), "global", "vitta_to_int", ['?'], rt.intTypeLiteral);

            // float()
            rt.regFunc((function (rt, _this, value) {
                let number = Number(value.v).toFixed(2);
                if (!isNaN(number)) {
                    if (number) {
                        return rt.val(rt.floatTypeLiteral, number);
                    } else {
                        number = Number(Simulator.getStringFromInterpretor(value)).toFixed(2);
                        if (number) {
                            Simulator.replay();
                            return rt.val(rt.floatTypeLiteral, number);
                        }
                    }
                } else {
                    rt.raiseException('invalid cast from type \'const char*\' to type \'float\'');
                }
            }), "global", "vitta_to_float", ['?'], rt.floatTypeLiteral);

            // char()
            rt.regFunc((function (rt, _this, value) {
                if (value) {
                    return rt.val(rt.charTypeLiteral, value.v);
                } else {
                    return rt.nullPointer;
                }
            }), "global", "vitta_to_char", ['?'], rt.charTypeLiteral);

            const delay = async function (rt, _this, x) {
                await Simulator.sleep_ms(x.v);
            };
            const Susp_delay = function (rt, _this, x) {
                return rt.asyncToSuspension(delay, [rt, _this, x]);
            };
            rt.regAsyncFunc(Susp_delay, delay);
            rt.regFunc(Susp_delay, "global", "delay", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            const delayMicroseconds = async function (rt, _this, x) {
                await Simulator.sleep_ms(x.v / 1000);
            };
            const Susp_delayMicroseconds = function (rt, _this, x) {
                return rt.asyncToSuspension(delayMicroseconds, [rt, _this, x]);
            };
            rt.regAsyncFunc(Susp_delayMicroseconds, delayMicroseconds);
            rt.regFunc(Susp_delayMicroseconds, "global", "delayMicroseconds", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            //millis
            rt.regFunc(function (rt, _this) {
                const t = Math.round(Date.now() - Simulator.startTime);
                return rt.val(rt.doubleTypeLiteral, t);
            }, "global", "millis", [], rt.doubleTypeLiteral);

            //micros
            rt.regFunc(function (rt, _this) {
                const t = Math.floor((Date.now() - Simulator.startTime) * 1000);
                return rt.val(rt.doubleTypeLiteral, t);
            }, "global", "micros", [], rt.doubleTypeLiteral);

            //random
            rt.regFunc(function (rt, _this, min, max) {
                const rand = rt.getFunc("global", "rand", [])(rt, _this).v;
                const n = Math.round(rand * (max.v - 1 - min.v) / rt.scope[0].variables["RAND_MAX"].v + min.v);
                return rt.val(rt.doubleTypeLiteral, n);
            }, "global", "random", [rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.doubleTypeLiteral);

            //random
            rt.regFunc((function (rt, _this, seed) {
                rt.getFunc("global", "srand", [rt.unsignedintTypeLiteral])(rt, _this, seed);
            }), "global", "randomSeed", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

            //constrain
            rt.regFunc((function (rt, _this, value, minimum, maximum) {
                const constrain = (x, min, max) => Math.max(min, Math.min(x, max));
                return rt.val(rt.doubleTypeLiteral, constrain(value.v, minimum.v, maximum.v));
            }), "global", "constrain", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.doubleTypeLiteral);

            // constants arduino
            rt.defVar("HIGH", rt.boolTypeLiteral, rt.val(rt.boolTypeLiteral, true));
            rt.defVar("LOW", rt.boolTypeLiteral, rt.val(rt.boolTypeLiteral, false));
            rt.defVar("A0", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 14));
            rt.defVar("A1", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 15));
            rt.defVar("A2", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 16));
            rt.defVar("A3", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 17));
            rt.defVar("A4", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 18));
            rt.defVar("A5", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 19));
            rt.defVar("A6", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 20));
            rt.defVar("A7", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 21));

            rt.defVar('OUTPUT', rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 1));
            rt.defVar('INPUT', rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0));
            rt.defVar('INPUT_PULLUP', rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 2));

            rt.defVar('FALLING', rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0));
            rt.defVar('RISING', rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 1));

            rt.regFunc((function (rt, _this, pin, mode) {
                const pinStr = Simulator.getPinString(pin.v);
                const pinComponent = Simulator.pinList.find((component) => component.pin == pinStr);
                if (typeof pinComponent === "undefined") return;
                const id = pinComponent.id;
                switch (mode.v) {
                    case 1:
                        Simulator.Components.Button.setPull(id, 'output');
                        break;
                    case 2:
                        Simulator.Components.Button.setPull(id, 'up');
                        break;
                    case 0:
                    default:
                        Simulator.Components.Button.setPull(id, 'down');
                }
            }), "global", "pinMode", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

            //digitalRead
            rt.regFunc(function (rt, _this, pin) {
                const pinStr = Simulator.getPinString(pin.v);
                if (pin.v === 13) {
                    const board = document.getElementById("board-viewer").contentDocument;
                    if (board != null) {
                        let led = board.getElementById("ar-led13");
                        if (led != null) {
                            if (led.style.fill === "red")
                                return rt.val(rt.boolTypeLiteral, true);
                            else
                                return rt.val(rt.boolTypeLiteral, false);
                        }
                    }
                }
                return rt.val(rt.boolTypeLiteral, Simulator.getPinSliderValue(pinStr));
            }, "global", "digitalRead", [rt.unsignedcharTypeLiteral], rt.boolTypeLiteral);

            //digitalWrite
            rt.regFunc((function (rt, _this, pin, state) {
                const pinStr = Simulator.getPinString(pin.v);
                let id = 'write-digital';
                const component = Simulator.pinList.find((component) => component.pin == pinStr);
                if (component !== undefined) {
                    id = component.id;
                } else if (pin.v === 13) {
                    if (INTERFACE_NAME == 'arduino' || INTERFACE_NAME == "letsstartcoding") {
                        id = 'arduino-led13'
                    } else if (INTERFACE_NAME == 'mBot') {
                        id = 'mCoreBuiltinBlueLED';
                    }
                }
                const module = Simulator.getModuleByKey(id.split('_')[0]);
                Simulator.setAnimator(module, id, state.v);
            }), "global", "digitalWrite", [rt.unsignedcharTypeLiteral, rt.boolTypeLiteral], rt.voidTypeLiteral);

            //analogRead
            rt.regFunc((function (rt, _this, pin) {
                if (INTERFACE_NAME == 'mBot' && pin.v == 21) {
                    return rt.val(rt.unsignedintTypeLiteral, Simulator.getSliderValue('mCoreButton'));
                } else {
                    const A_pin = 'A' + (pin.v - 14);
                    const modulePin = Simulator.pinList.find(obj => obj.pin == A_pin);
                    if (modulePin && modulePin.id.includes('joystick')) {
                        const value = Simulator.Components.Joystick.read(modulePin.id, A_pin);
                        return rt.val(rt.unsignedintTypeLiteral, value);
                    } else {
                        return rt.val(rt.unsignedintTypeLiteral, Simulator.getPinSliderValue(A_pin));
                    }
                }
            }), "global", "analogRead", [rt.unsignedcharTypeLiteral], rt.unsignedintTypeLiteral);

            //analogWrite
            rt.regFunc((function (rt, _this, pin, value) {
                const pinStr = Simulator.getPinString(pin.v);
                let id = 'write-analog';
                const component = Simulator.pinList.find((component) => component.pin == pinStr);
                if (component !== undefined) {
                    id = component.id;
                }
                const module = Simulator.getModuleByKey(id.split('_')[0]);
                Simulator.setAnimator(module, id, value.v);
                if (value.v > 255) {
                    UIManager.showWarningMessage("warning-message", '<b>' + pinStr + ':</b> La valeur de la fonction <i>analogWrite</i> doit être comprise entre 0 et 255.');
                }
            }), "global", "analogWrite", [rt.unsignedcharTypeLiteral, rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

            //pulseIn
            rt.regFunc((function (rt, _this, pin, state) {
                const pinStr = Simulator.getPinString(pin.v);
                return rt.val(rt.doubleTypeLiteral, Simulator.getPinSliderValue(pinStr));
            }), "global", "pulseIn", [rt.unsignedcharTypeLiteral, rt.boolTypeLiteral], rt.doubleTypeLiteral);

            //attachInterrupt
            rt.regFunc((async function (rt, _this, pinToInterrupt, onEvent, mode) {
                Simulator.Mosaic.interruptions[pinToInterrupt.v] = {
                    rt: rt,
                    _this: _this,
                    ret: onEvent,
                    mode: mode.v
                };
                return rt.val(rt.boolTypeLiteral, true);
            }), "global", "attachInterrupt", [rt.unsignedcharTypeLiteral, rt.functionType(rt.voidTypeLiteral, []), rt.intTypeLiteral], rt.boolTypeLiteral);

            //digitalPinToInterrupt
            rt.regFunc((function (rt, _this, pin) {
                return rt.val(rt.unsignedcharTypeLiteral, pin.v);
            }), "global", "digitalPinToInterrupt", [rt.unsignedcharTypeLiteral], rt.unsignedcharTypeLiteral);

            // isPrime
            rt.regFunc((function (rt, _this, x) {
                const upper = Math.sqrt(x.v);
                for (var cnum = 2; cnum <= upper; cnum++) {
                    const mod = x.v % cnum;
                    if (mod == 0) {
                        return rt.val(rt.boolTypeLiteral, false);
                    }
                }
                return rt.val(rt.boolTypeLiteral, true);
            }), "global", "isPrime", [rt.doubleTypeLiteral], rt.boolTypeLiteral);

            // isWhole
            rt.regFunc((function (rt, _this, x) {
                if (x.v == Math.floor(x.v)) {
                    return rt.val(rt.boolTypeLiteral, true);
                } else {
                    return rt.val(rt.boolTypeLiteral, false);
                }
            }), "global", "isWhole", [rt.doubleTypeLiteral], rt.boolTypeLiteral);

            // round
            rt.regFunc((function (rt, _this, x) {
                return rt.val(rt.doubleTypeLiteral, Math.round(x.v));
            }), "global", "round", [rt.doubleTypeLiteral], rt.doubleTypeLiteral);

            // map
            rt.regFunc((function (rt, _this, x, y, z, za, zb) {
                const result = Math.round((x.v - y.v) * (zb.v - za.v) / (z.v - y.v) + za.v);
                return rt.val(rt.intTypeLiteral, result);
            }), "global", "map", [rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            //memcpy
            rt.regFunc((function (rt, _this, pointer_to, from, len) {
                const args = rt.interp.currentNode.args;
                Simulator.setVariable(rt, args[0], from);
            }), "global", "memcpy", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.normalPointerType(rt.unsignedcharTypeLiteral), rt.intTypeLiteral], rt.voidTypeLiteral);

            //free
            rt.regFunc((function (rt, _this, buffer) {
                const args = rt.interp.currentNode.args;
                Simulator.setVariable(rt, args[0], rt.val(rt.normalPointerType(rt.unsignedcharTypeLiteral)));
            }), "global", "free", [rt.normalPointerType(rt.unsignedcharTypeLiteral)], rt.voidTypeLiteral);

            //tone
            rt.regFunc(async function (rt, _this, pin, freq, duration) {
                const pinStr = Simulator.getPinString(pin.v);
                $('#buzzer_' + pinStr + '_value').html(freq.v);
                $('#buzzer_' + pinStr + '_anim').css('opacity', 1);
                await Simulator.music.startAudio();
                await Simulator.music.pitch(freq.v, duration.v);
                $('#buzzer_' + pinStr + '_value').html('OFF');
                $('#buzzer_' + pinStr + '_anim').css('opacity', 0);
            }, "global", "tone", [rt.unsignedintTypeLiteral, rt.doubleTypeLiteral, '?'], rt.voidTypeLiteral);

            //noTone
            rt.regFunc(function (rt, _this, pin) {
                const pinStr = Simulator.getPinString(pin.v);
                $('#buzzer_' + pinStr + '_value').html('OFF');
                Simulator.music.stop();
                $('#buzzer_' + pinStr + '_anim').css('opacity', 0);
            }, "global", "noTone", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);
        }
    }
};