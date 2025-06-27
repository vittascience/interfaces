const mBot_getPin = function (port) {
    let pin = 'PORT';
    if (port.v > 10) {
        pin += String(port.v)[0] + '-' + String(port.v)[1];
    } else {
        pin += port.v;
    }
    return pin;
};

const LIBRARIES_H = {
    "Wire.h": {
        load: function (rt) { }
    },
    "SoftwareSerial.h": {
        load: function (rt) {
            const SoftwareSerial_t = rt.newClass("SoftwareSerial", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "receivePin"
                }, {
                    type: rt.unsignedcharTypeLiteral,
                    name: "transmitPin"
                }, {
                    type: rt.boolTypeLiteral,
                    name: "inverse_logic"
                }, {
                    type: rt.arrayPointerType(rt.charTypeLiteral),
                    name: "serialType"
                }
            ]);

            rt.defVar("DEC", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 10));
            rt.defVar("HEX", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 16));
            rt.defVar("OCT", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 8));

            const __init__ = function (rt, _this, receivePin, transmitPin, inverse_logic, serialType) {
                _this.v.members.receivePin.v = receivePin.v;
                _this.v.members.transmitPin.v = transmitPin.v;
                _this.v.members.inverse_logic.v = inverse_logic.v;
                _this.v.members.serialType.v = Simulator.getStringFromInterpretor(serialType);
            };
            rt.regFunc(__init__, SoftwareSerial_t, "__init__", [rt.intTypeLiteral, rt.intTypeLiteral, rt.boolTypeLiteral, rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

            const begin = function (rt, _this, speed) {
                const baud = rt.val(rt.doubleTypeLiteral, speed.v);
            };
            rt.regFunc(begin, SoftwareSerial_t, "begin", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            const _write = function (members, buffer) {
                if (buffer) {
                    if (members.serialType.v.includes('Serial')) {
                        if (buffer.match(/\n/)) {
                            InterfaceMonitor.sendDataToChart(Simulator.outputMemory);
                            Simulator.outputMemory = '';
                        } else {
                            Simulator.outputMemory += buffer;
                        }
                        const cons = document.getElementById('console');
                        cons.innerHTML += buffer.replace(/\n/g, '</br>');
                        cons.scrollTo(0, cons.scrollHeight);
                    }
                }
            };

            const write = function (rt, _this, data) {
                let buffer = "";
                if (rt.isCharType(data.t)) {
                    buffer = String.fromCharCode(data.v);
                } else if (rt.isArrayType(data)) {
                    buffer = Simulator.getStringFromInterpretor(data);
                } else if (rt.isPrimitiveStringType(data.t)) {
                    if (_this.v.members.serialType.v.includes('Serial')) {
                        rt.raiseException("no matching function for call to 'HardwareSerial::write(String)'");
                    } else {
                        rt.raiseException("no matching function for call to 'SoftwareSerial::write(String)'")
                    }
                } else {
                    buffer = String(data.v);
                }
                _write(_this.v.members, buffer);
                return rt.val(rt.intTypeLiteral, buffer.length);
            }
            rt.regFunc(write, SoftwareSerial_t, "write", ['?'], rt.intTypeLiteral);

            const print = function (rt, _this, buffer) {
                _write(_this.v.members, buffer);
                return rt.val(rt.intTypeLiteral, buffer.length);
            };

            // print candidates

            // print(const String &);
            rt.regFunc(function (rt, _this, string) {
                return print(rt, _this, string.v);
            }, SoftwareSerial_t, "print", [rt.StringTypeLiteral], rt.intTypeLiteral);

            // print(const char[]);
            rt.regFunc(function (rt, _this, charArray) {
                return print(rt, _this, Simulator.getStringFromInterpretor(charArray));
            }, SoftwareSerial_t, "print", [rt.arrayPointerType(rt.charTypeLiteral)], rt.intTypeLiteral);

            // print(char);
            rt.regFunc(function (rt, _this, char) {
                return print(rt, _this, String.fromCharCode(char.v));
            }, SoftwareSerial_t, "print", [rt.charTypeLiteral], rt.intTypeLiteral);
            
            // print(int);
            rt.regFunc(function (rt, _this, n) {
                return print(rt, _this, n.v.toString(10));
            }, SoftwareSerial_t, "print", [rt.intTypeLiteral], rt.intTypeLiteral);

            // print(unsigned char, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v));
            }, SoftwareSerial_t, "print", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // print(int, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v));
            }, SoftwareSerial_t, "print", [rt.intTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // print(unsigned int, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v));
            }, SoftwareSerial_t, "print", [rt.unsignedintTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // print(long, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v));
            }, SoftwareSerial_t, "print", [rt.longTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // print(double, int = 2);
            rt.regFunc(function (rt, _this, n, digits) {
                return print(rt, _this, n.v.toFixed(digits.v));
            }, SoftwareSerial_t, "print", [rt.doubleTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // print(float, int = 2);
            rt.regFunc(function (rt, _this, n, digits) {
                return print(rt, _this, n.v.toFixed(digits.v));
            }, SoftwareSerial_t, "print", [rt.floatTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println candidates

            // println(const String &);
            rt.regFunc(function (rt, _this, string) {
                return print(rt, _this, string.v + '\n');
            }, SoftwareSerial_t, "println", [rt.StringTypeLiteral], rt.intTypeLiteral);

            // println(const char[]);
            rt.regFunc(function (rt, _this, charArray) {
                return print(rt, _this, Simulator.getStringFromInterpretor(charArray) + '\n');
            }, SoftwareSerial_t, "println", [rt.arrayPointerType(rt.charTypeLiteral)], rt.intTypeLiteral);

            // println(char);
            rt.regFunc(function (rt, _this, char) {
                return print(rt, _this, String.fromCharCode(char.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.charTypeLiteral], rt.intTypeLiteral);

            // println(unsigned char, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(int, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.intTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(unsigned int, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.unsignedintTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(long, int = DEC);
            rt.regFunc(function (rt, _this, n, base) {
                return print(rt, _this, n.v.toString(base.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.longTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(double, int = 2);
            rt.regFunc(function (rt, _this, n, digits = rt.val(rt.intTypeLiteral, 2)) {
                return print(rt, _this, n.v.toFixed(digits.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.doubleTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(float, int = 2);
            rt.regFunc(function (rt, _this, n, digits = rt.val(rt.intTypeLiteral, 2)) {
                return print(rt, _this, n.v.toFixed(digits.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.floatTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            const _read = function (members, isForString) {
                if (members.serialType.v.includes('Serial')) {
                    if (Simulator.serialData) {
                        if (isForString) {
                            const data = Simulator.serialData;
                            Simulator.serialData = "";
                            return data;
                        } else {
                            const char = Simulator.serialData.charAt(0);
                            Simulator.serialData = Simulator.serialData.slice(1);
                            return char.charCodeAt(0);
                        }
                    } else {
                        return -1;
                    }
                }
            };

            const read = function (rt, _this) {
                return rt.val(rt.intTypeLiteral, _read(_this.v.members, false));
            };
            rt.regFunc(read, SoftwareSerial_t, "read", [], rt.intTypeLiteral);

            const readString = function (rt, _this) {
                return rt.val(rt.StringTypeLiteral, String(_read(_this.v.members, true)));
            };
            rt.regFunc(readString, SoftwareSerial_t, "readString", [], rt.StringTypeLiteral);

            const available = function (rt, _this) {
                if (_this.v.members.serialType.v.includes('Serial')) {
                    return rt.val(rt.intTypeLiteral, Simulator.serialData.length);
                }
                return rt.val(rt.intTypeLiteral, 0);
            };
            rt.regFunc(available, SoftwareSerial_t, "available", [], rt.intTypeLiteral);

            const listen = function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, true);
            };
            rt.regFunc(listen, SoftwareSerial_t, "listen", [], rt.boolTypeLiteral);

            const flush = function (rt, _this) {
                if (_this.v.members.serialType.v.includes('Serial')) {
                    Simulator.serialData = "";
                }
                return rt.val(rt.boolTypeLiteral, true);
            };
            rt.regFunc(flush, SoftwareSerial_t, "flush", [], rt.voidTypeLiteral);

        }
    },
    "OneWire.h": {
        load: function (rt) { }
    },
    "Servo.h": {
        load: function (rt) {

            const Servo_t = rt.newClass("Servo", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }, {
                    type: rt.unsignedcharTypeLiteral,
                    name: "slot"
                }
            ]);

            rt.regFunc(function (rt, _this, route) {
                _this.v.members.port.v = route.v[0].v;
                _this.v.members.slot.v = route.v[1].v;
            }, Servo_t, "attach", [rt.arrayPointerType(rt.intTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, angle) {
                const pin = 'PORT' + _this.v.members.port.v + '-' + _this.v.members.slot.v;
                const module = Simulator.getModuleByKey('makeblockServo');
                Simulator.setAnimator(module, 'makeblockServo_' + pin, angle.v);
            }, Servo_t, "write", [rt.intTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "MePort.h": {
        load: function (rt) {
            rt.defVar("PORT_1", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0x01));
            rt.defVar("PORT_2", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0x02));
            rt.defVar("PORT_3", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0x03));
            rt.defVar("PORT_4", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0x04));

            const MePort_t = rt.newClass("MePort", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port"
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v
            }, MePort_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.arrayPointerType(rt.intTypeLiteral), [_this.v.members.port, rt.val(rt.intTypeLiteral, 1)]);
            }, MePort_t, "pin1", [], rt.arrayPointerType(rt.intTypeLiteral));

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.arrayPointerType(rt.intTypeLiteral), [_this.v.members.port, rt.val(rt.intTypeLiteral, 2)]);
            }, MePort_t, "pin2", [], rt.arrayPointerType(rt.intTypeLiteral));
        }
    },
    "MeDCMotor.h": {
        load: function (rt) {

            const MeDCMotor_t = rt.newClass("MeDCMotor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "pin"
                }
            ]);

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members.pin.v = pin.v;
            }, MeDCMotor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.defVar("M1", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 9));
            rt.defVar("M2", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 10));

            const speedError = function (speed) {
                if (speed > WRITE_ANALOG_MAX_VALUE || speed < -WRITE_ANALOG_MAX_VALUE) {
                    UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 255');
                    return true;
                } else {
                    if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
                        UIManager.resetMessage("error-message");
                    }
                    return false;
                }
            }

            const setMotor = function (motor, speed, direction) {
                direction = direction == 1 ? 'forward' : 'backward';
                if (speed != 0) {
                    $('.mBot-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
                } else {
                    $('.mBot-motor' + motor).css('animation', 'none');
                }
            };

            rt.regFunc(function (rt, _this, result) {
                if (!speedError(result.v)) {
                    if (_this.v.members.pin.v == 9) {
                        $('#mBot-motorLeft_value').html(Math.round(result.v));
                        const direction = result.v * -1 > 0 ? 1 : -1;
                        const speed = Math.abs(result.v / WRITE_ANALOG_MAX_VALUE * 100);
                        setMotor('Left', speed, direction);
                    }
                    else if (_this.v.members.pin.v == 10) {
                        $('#mBot-motorRight_value').html(Math.round(result.v))
                        const direction = result.v > 0 ? 1 : -1;
                        const speed = Math.abs(result.v / WRITE_ANALOG_MAX_VALUE * 100);
                        setMotor('Right', speed, direction);
                    }
                }
            }, MeDCMotor_t, "run", [rt.intTypeLiteral], rt.voidTypeLiteral);

        }
    },
    "MeLEDMatrix.h": {
        load: function (rt) {

            const MeLEDMatrix_t = rt.newClass("MeLEDMatrix", [
                {
                    type: rt.intTypeLiteral,
                    name: "port",
                }
            ]);

            rt.defVar("LED_BUFFER_SIZE", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 16));

            const reset = function (_this) {
                const mBot_columns = getColumns(_this);
                for (var i = 0; i < mBot_columns.length; i++) {
                    const column = $(mBot_columns[i]).children();
                    for (var j = 0; j < column.length; j++) {
                        $(column[j]).css('background-color', '#f5f5f5');
                    }
                }
            };

            const getColumns = function (_this) {
                return $('#makeblockMatrix_PORT' + _this.v.members.port.v + '_value .mbot-grid .mbot-column');
            };

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;

                const id = 'makeblockMatrix_PORT' + port.v;
                _this.v.members.LEDS = new Array(128);

                let html = '<div class="mbot-grid">',
                    column = '<div class="mbot-column"><div class="mbot-led ' + id + '"></div>';
                _this.v.members.LEDS[0] = [50, 50, 50];
                for (var led = 0; led < _this.v.members.LEDS.length; led++) {
                    if ((led + 1) % 8 == 0) {
                        html += column + "</div>";
                        column = '<div class="mbot-column">';
                    }
                    column += '<div class="mbot-led ' + id + '"></div>';
                    _this.v.members.LEDS[led] = [50, 50, 50];
                }
                html += "</div>";
                $('#' + id + '_value').html(html);

            }, MeLEDMatrix_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, brightness) {
            }, MeLEDMatrix_t, "setBrightness", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, colorIndex) {
            }, MeLEDMatrix_t, "setColorIndex", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, number) {
                let mBot_columns = getColumns(_this),
                    digits = '',
                    n = number.v.toString();
                if (number.v > 9999) {
                    n = '9999';
                    UIManager.showErrorMessage("error-message", 'Le nombre à afficher est supérieur à 9999.');
                } else if (number.v < -999) {
                    n = '-999';
                    UIManager.showErrorMessage("error-message", 'Le nombre à afficher est inférieur à -999.');
                }
                for (let i = 0; i < n.length; i++) {
                    CHAR_3x8[n[i]].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                    digits += '0'.repeat(8) + ',';
                }
                if (n.length < 4) {
                    for (let i = 0; i < (4 - n.length); i++) {
                        CHAR_3x8[' '].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                        digits += '0'.repeat(8) + ',';
                    }
                }
                digits = digits.slice(0, -1).split(',');
                reset(_this);
                for (let i = 0; i < mBot_columns.length; i++) {
                    const column = $(mBot_columns[i]).children();
                    for (let j = 0; j < column.length; j++) {
                        if (digits[i][j] == 1)
                            $(column[j]).css('background-color', '#00b9ff');
                    }
                }
            }, MeLEDMatrix_t, "showNum", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y, text) {
                let message = "",
                    mBot_columns = getColumns(_this),
                    digits = '';
                text.v.target.forEach(decimal_char => message += String.fromCharCode(decimal_char.v));
                for (let i = 0; i < message.length - 1; i++)
                    CHAR_6x8[message[i]].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                if (message.length - 1 < 4) {
                    for (let i = 0; i < (4 - message.length); i++) {
                        CHAR_6x8[' '].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                    }
                }
                digits = digits.slice(0, -1).split(',');
                reset(_this);
                for (let i = 0; i < mBot_columns.length; i++) {
                    let column = $(mBot_columns[i + x.v]).children();
                    for (let j = 0; j < column.length; j++) {
                        if (digits[i][j] == 1)
                            $(column[j + y.v]).css('background-color', '#00b9ff');
                    }
                }
            }, MeLEDMatrix_t, "drawStr", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.normalPointerType(rt.unsignedcharTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y, size, draw) {
                let decimal_img = draw.v,
                    binary_img = [],
                    mBot_columns = getColumns(_this);

                for (var i = 0; i < decimal_img.target.length; i++) {
                    if (i > mBot_columns.length)
                        break;
                    let binary = decimal_img.target[i].v.toString(2),
                        length = binary.length;
                    binary_img.push(((length < 8) ? '0'.repeat(8 - length) : '') + binary);
                }
                reset(_this);
                for (var i = 0; i < binary_img.length; i++) {
                    for (var j = 0; j < binary_img[i].length; j++) {
                        let row = $(mBot_columns[i + x.v]).children();
                        if (binary_img[i][j] == 1)
                            $(row[j + y.v]).css('background-color', '#00b9ff');
                    }
                }
            }, MeLEDMatrix_t, "drawBitmap", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.intTypeLiteral, rt.normalPointerType(rt.unsignedcharTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, h, m, state) {
                let hours = (h.v.toString().length < 2) ? '0' + h.v.toString() : h.v.toString(),
                    minutes = (m.v.toString().length < 2) ? '0' + m.v.toString() : m.v.toString(),
                    mBot_columns = getColumns(_this),
                    digits = '';
                if (h.v > 24) {
                    hours = '24';
                    UIManager.showErrorMessage("error-message", 'Les heures à afficher sont supérieures à 24.');
                } else if (h.v < 0) {
                    hours = '00';
                    UIManager.showErrorMessage("error-message", 'Les heures à afficher sont inférieures à 0.');
                }
                if (m.v > 60) {
                    minutes = '59';
                    UIManager.showErrorMessage("error-message", 'Les minutes à afficher sont supérieures à 59.');
                } else if (m.v < 0) {
                    minutes = '00';
                    UIManager.showErrorMessage("error-message", 'Les minutes à afficher sont inférieures à 0.');
                }
                for (let i = 0; i < hours.length; i++) {
                    CHAR_3x8[hours[i]].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                    if ((i + 1) < hours.length) digits += '0'.repeat(8) + ',';
                }
                digits += '0'.repeat(8) + ',' + '0'.repeat(8) + ',';
                for (let i = 0; i < minutes.length; i++) {
                    CHAR_3x8[minutes[i]].split(',').forEach(hex => { digits += parseInt(hex, 16).toString(2).padStart(8, '0') + ',' });
                    if ((i + 1) < minutes.length) digits += '0'.repeat(8) + ',';
                }
                digits = digits.slice(0, -1).split(',');
                for (let i = 0; i < mBot_columns.length; i++) {
                    let column = $(mBot_columns[i]).children();
                    for (let j = 0; j < column.length; j++) {
                        if (digits[i][j] == 1)
                            $(column[j]).css('background-color', '#00b9ff');
                        else
                            $(column[j]).css('background-color', '#f5f5f5');
                    }
                }
            }, MeLEDMatrix_t, "showClock", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.boolTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "MeRGBLed.h": {
        load: function (rt) {

            const MeRGBLed_t = rt.newClass("MeRGBLed", [
                {
                    type: rt.intTypeLiteral,
                    name: "port",
                }, {
                    type: rt.intTypeLiteral,
                    name: "slot"
                }
            ]);

            rt.data.neoPx = Object.create(null);
            rt.data.rgbled_board = {
                'left': [50, 50, 50],
                'right': [50, 50, 50]
            };

            const neopx = Simulator.pinList.filter(p => p.id.match(/(neopixel_PORT|MeRGBLed_PORT)/) ? true : false);
            if (neopx) {
                for (var i = 0; i < neopx.length; i++) {
                    const coreId = neopx[i].id.split('_')[0];
                    let size = 30;
                    if (/MeRGBLed_PORT/.test(neopx[i].id)) {
                        size = Simulator.getModuleByKey(coreId).size;
                    }
                    rt.data.neoPx[neopx[i].pin] = {
                        LEDS: new Array(size),
                        coreId: coreId
                    };

                    let html = '<div class=row>';
                    for (var led = 0; led < rt.data.neoPx[neopx[i].pin].LEDS.length; led++) {
                        html += '<div class="neopixel-block ' + coreId + '-' + neopx[i].pin + '" style="background-color:#000000;"></div>';
                        rt.data.neoPx[neopx[i].pin].LEDS[led] = [50, 50, 50];
                    }
                    html += "</div>";
                    $('#' + coreId + '_' + neopx[i].pin + '_value').html(html);
                }
            }

            rt.regFunc(function (rt, _this, port) {
                const pin = mBot_getPin(port);
                if (rt.data.neoPx[pin]) {
                    const ledArray = rt.data.neoPx[pin].LEDS;
                    for (var i = 0; i < ledArray.length; i++) {
                        if (typeof ledArray === 'object') {
                            const color = ledArray[i];
                            $("." + rt.data.neoPx[pin].coreId + "-" + pin).eq(i).css("background-color", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
                        }
                    }
                } else if (port.v == 7) {
                    const setLed = function (position) {
                        const R = rt.data.rgbled_board[position][0],
                            G = rt.data.rgbled_board[position][1],
                            B = rt.data.rgbled_board[position][2],
                            color = 'rgb(' + R + ',' + G + ',' + B + ')';
                        const board = document.getElementById("board-viewer").contentDocument;
                        if (board !== null) {
                            const led = board.querySelector('#led' + (position === 'left' ? '1' : '2') + '_rgb');
                            if (led !== null) {
                                led.style.fill = color;
                            }
                        }
                        $("#mCoreRGBLED-" + position + "_anim").css('background-color', color);
                    };
                    setLed('right');
                    setLed('left');
                }
            }, MeRGBLed_t, "show", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, port, led, r, g, b) {
                const pin = mBot_getPin(port);
                if (rt.data.neoPx[pin]) {
                    if (led.v == 0) {
                        for (var i = 0; i < rt.data.neoPx[pin].LEDS.length; i++) {
                            rt.data.neoPx[pin].LEDS[i] = [r.v, g.v, b.v];
                        }
                    } else {
                        rt.data.neoPx[pin].LEDS[led.v - 1] = [r.v, g.v, b.v];

                    }
                } else if (port.v == 7) {
                    if (led.v == 1) {
                        rt.data.rgbled_board['right'] = [r.v, g.v, b.v];
                    } else if (led.v == 2) {
                        rt.data.rgbled_board['left'] = [r.v, g.v, b.v];
                    } else {
                        rt.data.rgbled_board['right'] = [r.v, g.v, b.v];
                        rt.data.rgbled_board['left'] = [r.v, g.v, b.v];
                    }
                }
            }, MeRGBLed_t, "setColor", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, port, led, r, g, b) {
                const pin = mBot_getPin(port);
                if (rt.data.neoPx[pin]) {
                    for (var i = 0; i < led.v; i++) {
                        rt.data.neoPx[pin].LEDS[i] = [r.v, g.v, b.v];
                    }
                }
                rt.getFunc(MeRGBLed_t, "show", [rt.unsignedcharTypeLiteral])(rt, _this, port);
            }, "global", "neopixel_showAllLed", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

        }
    },
    "Me7SegmentDisplay.h": {
        load: function (rt) {
            const Me7SegmentDisplay_t = rt.newClass("Me7SegmentDisplay", []);

            rt.data.Me7SegmentDisplay = {};

            rt.defVar("BRIGHTNESS_0", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0));
            rt.defVar("BRIGHTNESS_1", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 1));
            rt.defVar("BRIGHTNESS_2", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 2));
            rt.defVar("BRIGHTNESS_3", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 3));
            rt.defVar("BRIGHTNESS_4", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 4));
            rt.defVar("BRIGHTNESS_5", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 5));
            rt.defVar("BRIGHTNESS_6", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 6));
            rt.defVar("BRIGHTNESS_7", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 7));

            var displayDigits = function (pinStr) {
                let str = '';
                for (var i = 0; i < 4; i++) {
                    str += rt.data.Me7SegmentDisplay[pinStr].display[i];
                    if (i == 1 && rt.data.Me7SegmentDisplay[pinStr].points) {
                        str += ':';
                        rt.data.Me7SegmentDisplay[pinStr].points = false;
                    }
                }
                $('#Me7SegmentDisplay_' + pinStr + '_value').html(str);
            };

            rt.regFunc(function (rt, _this, pin) {
                const pinStr = 'PORT' + pin.v;
                rt.data.Me7SegmentDisplay[pinStr] = {
                    display: ['0', '0', '0', '0'],
                    points: false,
                };
            }, Me7SegmentDisplay_t, "init", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, pin, brightness) {
                const pinStr = 'PORT' + pin.v;
                $('#Me7SegmentDisplay_' + pinStr + '_value').css("color", "rgb(220, 53, 69, 1/" + brightness.v + ")")
            }, Me7SegmentDisplay_t, "set", [rt.unsignedcharTypeLiteral, rt.floatTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, pin, number) {
                const pinStr = 'PORT' + pin.v;
                let n = number.v;
                if (n > 9999) {
                    n = 9999;
                    UIManager.showErrorMessage("error-message", 'Le nombre à afficher est supérieur à 9999.');
                } else if (n < -999) {
                    n = -999;
                    UIManager.showErrorMessage("error-message", 'Le nombre à afficher est inférieur à -999.');
                } else if (n < 9999 & n > -999) {
                    UIManager.resetMessage("error-message");
                }
                let mil = Math.trunc(n / 1000),
                    cent = Math.trunc((n - mil * 1000) / 100),
                    dix = Math.trunc((n - mil * 1000 - cent * 100) / 10),
                    unite = Math.trunc(n - mil * 1000 - cent * 100 - dix * 10);
                rt.data.Me7SegmentDisplay[pinStr].display[0] = String(mil);
                rt.data.Me7SegmentDisplay[pinStr].display[1] = String(cent);
                rt.data.Me7SegmentDisplay[pinStr].display[2] = String(dix);
                rt.data.Me7SegmentDisplay[pinStr].display[3] = String(unite);
                if (n < 999) {
                    rt.data.Me7SegmentDisplay[pinStr].display[0] = '0';
                    if (n < 99) {
                        rt.data.Me7SegmentDisplay[pinStr].display[1] = '0';
                        if (n < 9) {
                            rt.data.Me7SegmentDisplay[pinStr].display[2] = '0';
                        }
                    }
                }
                displayDigits(pinStr);
            }, Me7SegmentDisplay_t, "display", [rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "MeBuzzer.h": {
        load: function (rt) {
            const MeBuzzer_t = rt.newClass("MeBuzzer", []);

            rt.regFunc(async function (rt, _this, freq, duration) {
                Simulator.setAnimator(Simulator.getModuleByKey('mCoreBuzzer'), 'mCoreBuzzer', freq.v);
                Simulator.music.startAudio();
                await Simulator.music.pitch(freq.v, duration.v);
                $('.buzzer').css('animation-iteration-count', '0');
            }, MeBuzzer_t, "tone", [rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral);
        }
    },
    /**
     * Sensors
     */
    "MeUltrasonicSensor.h": {
        load: function (rt) {
            const MeUltrasonicSensor_t = rt.newClass("MeUltrasonicSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeUltrasonicSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const t = Simulator.getSliderValue('ultrasonic_' + pin, '_t');
                const cm = roundFloat(343 * t / 1e6 / 2 * 100, 1);
                return rt.val(rt.floatTypeLiteral, cm);
            }, MeUltrasonicSensor_t, "distanceCm", [], rt.floatTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const t = Simulator.getSliderValue('ultrasonic_' + pin, '_t');
                const cm = roundFloat(343 * t / 1e6 / 2 * 100, 1);
                const inches = roundFloat(cm / 2.54, 2);
                return rt.val(rt.floatTypeLiteral, inches);
            }, MeUltrasonicSensor_t, "distanceInch", [], rt.floatTypeLiteral);

        }
    },
    "MeLineFollower.h": {
        load: function (rt) {

            const MeLineFollower_t = rt.newClass("MeLineFollower", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeLineFollower_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const state = Simulator.getSliderValue('makeblockFinder-left_' + pin, '_v');
                return rt.val(rt.boolTypeLiteral, !state);
            }, MeLineFollower_t, "readSensor1", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const state = Simulator.getSliderValue('makeblockFinder-right_' + pin, '_v');
                return rt.val(rt.boolTypeLiteral, !state);
            }, MeLineFollower_t, "readSensor2", [], rt.boolTypeLiteral);
        }
    },
    "MePIRMotionSensor.h": {
        load: function (rt) {
            const MePIRMotionSensor_t = rt.newClass("MePIRMotionSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MePIRMotionSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const state = Simulator.getSliderValue('makeblockPIR_' + pin);
                return rt.val(rt.boolTypeLiteral, state);
            }, MePIRMotionSensor_t, "isHumanDetected", [], rt.boolTypeLiteral);
        }
    },
    "MeCompass.h": {
        load: function (rt) {
            const MeCompass_t = rt.newClass("MeCompass", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeCompass_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockCompass-heading_' + pin, '_x');
                return rt.val(rt.intTypeLiteral, value);
            }, MeCompass_t, "getHeadingX", [], rt.intTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockCompass-heading_' + pin, '_y');
                return rt.val(rt.intTypeLiteral, value);
            }, MeCompass_t, "getHeadingY", [], rt.intTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockCompass-heading_' + pin, '_z');
                return rt.val(rt.intTypeLiteral, value);
            }, MeCompass_t, "getHeadingZ", [], rt.intTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockCompass-angle_' + pin);
                return rt.val(rt.intTypeLiteral, value);
            }, MeCompass_t, "getAngle", [], rt.intTypeLiteral);
        }
    },
    "MeLightSensor.h": {
        load: function (rt) {

            const MeLightSensor_t = rt.newClass("MeLightSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeLightSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                if (_this.v.members.port.v == 6) {
                    const value = Simulator.getSliderValue('mCoreLight');
                    return rt.val(rt.intTypeLiteral, value);
                } else {
                    const pin = 'PORT' + _this.v.members.port.v;
                    const value = Simulator.getSliderValue('makeblockLight_' + pin);
                    return rt.val(rt.intTypeLiteral, value);
                }
            }, MeLightSensor_t, "read", [], rt.intTypeLiteral);
        }
    },
    "MeColorSensor.h": {
        load: function (rt) {

            const
                WHITE = 0,
                PINKE = 1,
                RED = 2,
                ORANGE = 3,
                YELLOW = 4,
                GREEN = 5,
                CYAN = 6,
                BLUE = 7,
                PURPLE = 8,
                BLACK = 9,
                GOLD = 10;

            const MeColorSensor_t = rt.newClass("MeColorSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                },
                {
                    type: rt.unsignedshortTypeLiteral,
                    name: "Redvalue",
                },
                {
                    type: rt.unsignedshortTypeLiteral,
                    name: "Greenvalue",
                },
                {
                    type: rt.unsignedshortTypeLiteral,
                    name: "Bluevalue",
                },
                {
                    type: rt.unsignedshortTypeLiteral,
                    name: "Colorvalue",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeColorSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, MeColorSensor_t, "SensorInit", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, MeColorSensor_t, "TurnOnmodule", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {

            }, MeColorSensor_t, "TurnOffmodule", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, MeColorSensor_t, "TurnOnLight", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const port = 'PORT' + _this.v.members.port.v;
                _this.v.members.Redvalue.v = Simulator.getSliderValue('makeblockColorSensor_' + port, '_r') * 20;
                _this.v.members.Greenvalue.v = Simulator.getSliderValue('makeblockColorSensor_' + port, '_g') * 30;
                _this.v.members.Bluevalue.v = Simulator.getSliderValue('makeblockColorSensor_' + port, '_b') * 20;
                _this.v.members.Colorvalue.v = 1;
            }, MeColorSensor_t, "ColorDataRead", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                rt.getFunc(MeColorSensor_t, "ColorDataRead", [])(rt, _this);
                let r = _this.v.members.Redvalue.v;
                let g = _this.v.members.Greenvalue.v;
                let b = _this.v.members.Greenvalue.v;
                const Colorvalue = _this.v.members.Colorvalue.v;
                if (r < 1200 && g < 1700 && b < 1200) {
                    if ((g + r + b) < 700) {
                        result = BLACK;
                    } else if (b < r && r <= g) {
                        if (((g + r + b) > 300) && (g > 1.5 * r) && (g > (b + b))) {
                            result = GREEN;
                        } else if ((g > (b + b)) && (r > (b + b)) && ((r + g + b) > 120)) {
                            result = YELLOW;
                        } else if (r > 450 && g > 580 && b > 320) {
                            result = WHITE;
                        } else {
                            result = BLACK;
                        }
                    } else if (g < r && b < g) {
                        if ((r + g + b > 500) && r > 300) {
                            result = RED;
                        } else {
                            result = BLACK;
                        }
                    } else if (g <= b && r < b) {
                        result = BLUE;
                    } else if (r <= g && b >= r) {
                        if (r + g + b > 400) {
                            if (g > 2.2 * r && g > 2.2 * b) {
                                result = GREEN;
                            } else {
                                result = BLUE;
                            }
                        } else {
                            result = BLACK;
                        }
                    } else if ((g < (r + b)) && ((g + r + b) > 700)) {
                        result = WHITE;
                    } else {
                        result = BLACK;
                    }
                } else {
                    r = r / Colorvalue;
                    g = g / Colorvalue;
                    b = b / Colorvalue;
                    if (r >= 9 && g <= 4 && b <= 1) {
                        result = RED;
                    } else if (r > 10 && g <= 4 && b <= 4) {
                        result = RED;
                    } else if (r < 3 && g <= 4 && b < 3) {
                        result = BLACK;
                    } else if (r <= 5 && g > 10 && b < 5) {
                        result = GREEN;
                    } else if ((r < 5 && g < 5 && b > 10) || (r <= 3 && g >= 8 && b >= 8)) {
                        result = BLUE;
                    } else if (r >= 5 && g > 6 && b >= 7) {
                        result = BLUE;
                    } else if (r <= 4 && g >= 10 && b >= 6) {
                        result = BLUE;
                    } else if (r <= 8 && r >= 6 && g >= 6 && b < 2) {
                        result = YELLOW;
                    } else if (r >= 10 && g <= 7 && b < 2) {
                        result = RED;
                    } else if (r >= 4 && g >= 9 && b >= 4) {
                        result = WHITE;
                    } else {
                        result = WHITE;
                    }
                }

                return rt.val(rt.intTypeLiteral, result);
            }, MeColorSensor_t, "Returnresult", [], rt.intTypeLiteral);


            rt.regFunc(function (rt, _this) {
                const r = _this.v.members.Redvalue.v >> 8;
                const g = _this.v.members.Greenvalue.v >> 8;
                const b = _this.v.members.Bluevalue.v >> 8;
                let gray = (r * 38 + g * 75 + b * 15) >> 4;
                if (gray > 255) {
                    gray = 255;
                }
                return rt.val(rt.unsignedshortTypeLiteral, gray);
            }, MeColorSensor_t, "ReturnGrayscale", [], rt.unsignedshortTypeLiteral);

        }
    },
    "MeSoundSensor.h": {
        load: function (rt) {
            const MeSoundSensor_t = rt.newClass("MeSoundSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeSoundSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockSoundSensor_' + pin);
                return rt.val(rt.intTypeLiteral, value);
            }, MeSoundSensor_t, "strength", [], rt.intTypeLiteral);
        }
    },
    "MeGasSensor.h": {
        load: function (rt) {
            const MeGasSensor_t = rt.newClass("MeGasSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeGasSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const state = Simulator.getSliderValue('makeblockMQ2_' + pin);
                return rt.val(rt.intTypeLiteral, state);
            }, MeGasSensor_t, "readDigital", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblockMQ2_' + pin);
                return rt.val(rt.intTypeLiteral, value);
            }, MeGasSensor_t, "readAnalog", [rt.unsignedcharTypeLiteral], rt.intTypeLiteral);
        }
    },
    "MeFlameSensor.h": {
        load: function (rt) {
            const MeFlameSensor_t = rt.newClass("MeFlameSensor", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                }
            ]);

            rt.regFunc(function (rt, _this, port) {
                _this.v.members.port.v = port.v;
            }, MeFlameSensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const state = Simulator.getSliderValue('makeblock-flameSensor_' + pin);
                return rt.val(rt.intTypeLiteral, state);
            }, MeFlameSensor_t, "readDigital", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v;
                const value = Simulator.getSliderValue('makeblock-flameSensor_' + pin);
                return rt.val(rt.intTypeLiteral, value);
            }, MeFlameSensor_t, "readAnalog", [], rt.intTypeLiteral);
        }
    },
    "MeTemperature.h": {
        load: function (rt) {
            const MeTemperature_t = rt.newClass("MeTemperature", [
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "port",
                },
                {
                    type: rt.unsignedcharTypeLiteral,
                    name: "slot",
                }
            ]);

            rt.regFunc(function (rt, _this, port, slot) {
                _this.v.members.port.v = port.v;
                _this.v.members.slot.v = slot.v;
            }, MeTemperature_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pin = 'PORT' + _this.v.members.port.v + '-' + _this.v.members.slot.v;
                const value = Simulator.getSliderValue('makeblockDS18B20_' + pin);
                return rt.val(rt.intTypeLiteral, value);
            }, MeTemperature_t, "temperature", [], rt.intTypeLiteral);
        }
    },
    "MeMCore.h": {
        load: function (rt) {
            rt.data = new Object(null);
            rt.include("MePort.h");
            rt.include("MeDCMotor.h");
            // display
            rt.include("MeLEDMatrix.h");
            rt.include("MeRGBLed.h");
            rt.include("Me7SegmentDisplay.h");
            // sensors
            rt.include("MeUltrasonicSensor.h");
            rt.include("MeLineFollower.h");
            rt.include("MePIRMotionSensor.h");
            rt.include("MeCompass.h");
            rt.include("MeLightSensor.h");
            rt.include("MeColorSensor.h");
            rt.include("MeSoundSensor.h");
            rt.include("MeGasSensor.h");
            rt.include("MeFlameSensor.h");
            rt.include("MeTemperature.h");
            rt.include("MeBuzzer.h");
        }
    }
};