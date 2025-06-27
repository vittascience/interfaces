const LIBRARIES_H = {
    // arduino libraries
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
                const pinRX = Simulator.getPinString(_this.v.members.receivePin.v, true);
                const pinTX = Simulator.getPinString(_this.v.members.transmitPin.v, true);
                const subtitle = 'UART - ' + pinRX + ' / ' + pinTX;
                if (_this.v.members.serialType.v.includes("HM10")) {
                    _this.v.members.moduleId = 'hm10';
                    $('#' + _this.v.members.moduleId).find(".subtitle-module").html(subtitle);
                }
                else if (_this.v.members.serialType.v.includes("blueToothSerial")) {
                    _this.v.members.moduleId = 'groveBT';
                    $('#' + _this.v.members.moduleId).find(".subtitle-module").html(subtitle);
                }
                else if (_this.v.members.serialType.v.includes('OpenLog')) {
                    $("#openlog_" + _this.v.members.receivePin.v).find(".subtitle-module").html(subtitle);
                }
                else if (_this.v.members.serialType.v.includes('mhz19')) {
                    const co2 = Simulator.getSliderValue('mhz19-co2');
                    const temp = Simulator.getSliderValue('mhz19-temp');
                    _this.v.members._rx_buffer = Simulator.Mosaic.grove.calculs.getMHZ19Data(co2, temp);
                    $('#mhz19-co2').find(".subtitle-module").html(subtitle);
                    $('#mhz19-temp').find(".subtitle-module").html(subtitle);
                }
            };
            rt.regFunc(__init__, SoftwareSerial_t, "__init__", [rt.intTypeLiteral, rt.intTypeLiteral, rt.boolTypeLiteral, rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

            const begin = function (rt, _this, speed) {
                const baud = rt.val(rt.doubleTypeLiteral, speed.v);
            };
            rt.regFunc(begin, SoftwareSerial_t, "begin", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            const _write = function (members, buffer) {
                if (buffer) {
                    if (members.serialType.v.includes('HM10') || members.serialType.v.includes('blueToothSerial')) {
                        sendBluetoothData(buffer);
                        const date = new Date();
                        var s = '';
                        if (date.getSeconds() < 10) {
                            s = "0" + date.getSeconds();
                        } else {
                            s = date.getSeconds();
                        }
                        const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
                        InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par bluetooth : '" + buffer + "'\n");
                        Simulator.setAnimator(Simulator.getModuleByKey(members.moduleId), members.moduleId, 'write');
                    }
                    else if (members.serialType.v.includes('OpenLog')) {
                        const module = Simulator.pinList.find(module => module.pin == members.receivePin.v);
                        if (module) {
                            Simulator.setAnimator(Simulator.getModuleByKey('openlog'), module.id);
                        }
                    }
                    else if (members.serialType.v.includes('Serial')) {
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
            rt.regFunc(function (rt, _this, n, digits) {
                return print(rt, _this, n.v.toFixed(digits.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.doubleTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            // println(float, int = 2);
            rt.regFunc(function (rt, _this, n, digits) {
                return print(rt, _this, n.v.toFixed(digits.v) + '\n');
            }, SoftwareSerial_t, "println", [rt.floatTypeLiteral, rt.intTypeLiteral], rt.intTypeLiteral);

            const _read = function (members, isForString) {
                if (members.serialType.v.includes('HM10') || members.serialType.v.includes('blueToothSerial')) {
                    return checkBluetoothData('read', members.moduleId, isForString);
                }
                else if (members.serialType.v.includes('Serial')) {
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
                else if (members.serialType.v.includes('mhz19')) {
                    return members._rx_buffer.shift();
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
                if (_this.v.members.serialType.v.includes('HM10') || _this.v.members.serialType.v.includes('blueToothSerial')) {
                    return rt.val(rt.intTypeLiteral, checkBluetoothData('available', _this.v.members.moduleId));
                }
                else if (_this.v.members.serialType.v.includes('Serial')) {
                    return rt.val(rt.intTypeLiteral, Simulator.serialData.length);
                }
                else if (_this.v.members.serialType.v.includes('mhz19')) {
                    if (_this.v.members._rx_buffer.length == 1) {
                        _this.v.members._rx_buffer = Simulator.Mosaic.grove.calculs.getMHZ19Data(Simulator.getSliderValue('mhz19-co2'), Simulator.getSliderValue('mhz19-temp'));
                        return rt.val(rt.intTypeLiteral, 0);
                    }
                    return rt.val(rt.intTypeLiteral, _this.v.members._rx_buffer.length - 1);
                }
                return rt.val(rt.intTypeLiteral, 0);
            };
            rt.regFunc(available, SoftwareSerial_t, "available", [], rt.intTypeLiteral);

            const listen = function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, true);
            };
            rt.regFunc(listen, SoftwareSerial_t, "listen", [], rt.boolTypeLiteral);

            const flush = function (rt, _this) {
                if (_this.v.members.serialType.v.includes('HM10') || _this.v.members.serialType.v.includes('blueToothSerial')) {
                    checkBluetoothData('flush', _this.v.members.moduleId);
                }
                else if (_this.v.members.serialType.v.includes('Serial')) {
                    Simulator.serialData = "";
                }
                return rt.val(rt.boolTypeLiteral, true);
            };
            rt.regFunc(flush, SoftwareSerial_t, "flush", [], rt.voidTypeLiteral);

            function sendBluetoothData(buffer) {
                const data = {
                    'timestamp': Date.now(),
                    'content': buffer
                };
                const multiEditorLS = localStorage.getItem('multiEditor');
                if (multiEditorLS) {
                    const multiEditor = JSON.parse(multiEditorLS);
                    const editor = multiEditor[INTERFACE_NAME][VittaInterface.id];
                    editor.dateUpdated = Math.floor(new Date() / 1000);
                    if (editor.bluetooth) {
                        editor.bluetooth['_tx_buffer'].push(data);
                    } else {
                        editor.bluetooth = {
                            '_tx_buffer': [data]
                        };
                    }
                    multiEditor[INTERFACE_NAME][VittaInterface.id] = editor;
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                } else {
                    InterfaceMonitor.writeConsole("Bluetooth Error: no service");
                }
            };

            function checkBluetoothData(command, modId, isForString) {
                const multiEditorLS = localStorage.getItem('multiEditor');
                if (multiEditorLS) {
                    const multiEditor = JSON.parse(multiEditorLS);
                    const mutiEditorInterface = multiEditor[INTERFACE_NAME];
                    var validEditors = [];
                    for (var id in mutiEditorInterface) {
                        if (mutiEditorInterface[id].dateUpdated && mutiEditorInterface[id].bluetooth) {
                            validEditors.push({
                                "id": id,
                                "dateUpdated": mutiEditorInterface[id].dateUpdated,
                                "bluetooth": mutiEditorInterface[id].bluetooth
                            });
                        }
                    }
                    const editor = validEditors.sort(function (a, b) {
                        return b.dateUpdated - a.dateUpdated;
                    })[0];
                    if (editor !== undefined) {
                        if (command == 'read') {
                            const data = readBluetoothData(multiEditor, editor, isForString);
                            if (data) {
                                if (isForString) {
                                    Simulator.setAnimator(Simulator.getModuleByKey(modId), modId, command + 'String');
                                } else {
                                    Simulator.setAnimator(Simulator.getModuleByKey(modId), modId, command);
                                }
                                return data;
                            } else {
                                return -1;
                            }
                        } else if (command == 'available') {
                            const buffer = editor.bluetooth._tx_buffer;
                            if (buffer && buffer.length) {
                                const len = buffer.map((data) => data.content).join('').length;
                                Simulator.setAnimator(Simulator.getModuleByKey(modId), modId, command + ':' + len);
                                return len;
                            }
                            return 0;
                        } else if (command == 'flush') {
                            Simulator.setAnimator(Simulator.getModuleByKey(modId), modId, command);
                            flushBluetoothData(multiEditor, editor);
                        }
                    }
                } else {
                    InterfaceMonitor.writeConsole("Bluetooth Error: no service");
                }
                if (command == 'read') {
                    return -1;
                } else if (command == 'available') {
                    return 0;
                }
            };

            function readBluetoothData(multiEditor, editor, isForString) {
                if (editor.bluetooth._tx_buffer) {
                    multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
                    let dataArray = editor.bluetooth._tx_buffer;
                    if (dataArray) {
                        if (isForString) {
                            multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                                '_tx_buffer': new Array()
                            };
                            localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                            return dataArray.map((data) => data.content).join('');
                        } else {
                            const firstData = dataArray[0].content;
                            if (firstData.length > 0) {
                                const charToRead = firstData[0];
                                if (firstData.length > 1) {
                                    dataArray[0] = {
                                        timestamp: Date.now(),
                                        content: firstData.slice(1)
                                    };
                                } else if (firstData.length == 1) {
                                    dataArray = dataArray.slice(1);
                                }
                                multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                                    '_tx_buffer': dataArray
                                };
                                localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                                return charToRead.charCodeAt(0);
                            }
                        }
                    }
                }
            };

            function flushBluetoothData(multiEditor, editor) {
                if (editor.bluetooth._tx_buffer) {
                    multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
                    multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                        '_tx_buffer': new Array()
                    };
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                }
            };
        }
    },
    "rgb_lcd.h": {
        load: function (rt) {

            const rgb_lcd = rt.newClass("rgb_lcd", []);

            rt.regFunc(function (rt, _this, c, r) {
                $("#lcdGrove").find(".subtitle-module").html('I2C (0x3e)');
                _this.v.members.cursorCol = c.v;
                _this.v.members.cursorRow = r.v;
                _this.v.members.l0 = '';
                _this.v.members.l1 = '';
                _this.v.members.display = true;
            }, rgb_lcd, "begin", [rt.intTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y) {
                _this.v.members.cursorCol = x.v;
                _this.v.members.cursorRow = y.v;
            }, rgb_lcd, "setCursor", [rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                const myString = Simulator.getStringFromInterpretor(str);
                const formatString = function (line, myString) {
                    let temp = line.replaceAll('&nbsp;', ' ');
                    if (temp.length < _this.v.members.cursorCol) {
                        temp += ' '.repeat(_this.v.members.cursorCol - temp.length);
                    }
                    line = temp.substr(0, _this.v.members.cursorCol) + myString;
                    if (temp.length > line.length) {
                        line += temp.substr(line.length, temp.length);
                    }
                    return line.substr(0, 15).replaceAll(' ', '&nbsp;');
                }
                if (_this.v.members.cursorRow == 0) {
                    _this.v.members.l0 = formatString(_this.v.members.l0, myString);
                } else {
                    _this.v.members.l1 = formatString(_this.v.members.l1, myString);
                }
                $('#lcdGrove_value').html(_this.v.members.l0 + "<br/>" + _this.v.members.l1)
            }, rgb_lcd, "print", ['?'], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                if (!_this.v.members.display) {
                    $('#lcdGrove_value').css("background-color", "rgb(255, 255, 255)");
                    $('#lcdGrove_value').css("outline", "9px solid rgb(180, 183, 218)");
                    $('#lcdGrove_value').css("border", "2px rgb(150, 150, 150) solid");
                    _this.v.members.display = true;
                }
            }, rgb_lcd, "display", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                if (_this.v.members.display) {
                    $('#lcdGrove_value').html('');
                    $('#lcdGrove_value').css("background-color", "rgb(160, 160, 160, 0.8)");
                    $('#lcdGrove_value').css("outline", "9px solid rgb(180, 183, 218, 0.5)");
                    _this.v.members.display = false;
                }
            }, rgb_lcd, "noDisplay", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y, z) {
                $('#lcdGrove_value').css("background-color", "rgb(" + x.v + "," + y.v + "," + z.v + ", 0.5)");
            }, rgb_lcd, "setRGB", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                _this.v.members.l0 = '';
                _this.v.members.l1 = '';
                $('#lcdGrove_value').html('');
            }, rgb_lcd, "clear", [], rt.voidTypeLiteral);
        }
    },
    "LiquidCrystal_I2C.h": {
        load: function (rt) {

            const LiquidCrystal_I2C_t = rt.newClass("LiquidCrystal_I2C", [{
                type: rt.unsignedcharTypeLiteral,
                name: 'addr'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'cols'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'rows'
            }]);

            rt.defVar("LCD_5x8DOTS", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0));

            rt.regFunc(function (rt, _this, lcd_Addr, lcd_cols, lcd_rows) {
                $("#lcd").find(".subtitle-module").html('I2C (0x3f)');
                _this.v.members.addr.v = lcd_Addr.v;
                _this.v.members.cursorCol = lcd_cols.v;
                _this.v.members.cursorRow = lcd_rows.v;
                _this.v.members.l0 = '';
                _this.v.members.l1 = '';
            }, LiquidCrystal_I2C_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, cols, rows, charsize) {
            }, LiquidCrystal_I2C_t, "begin", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                _this.v.members.display = true;
            }, LiquidCrystal_I2C_t, "init", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, LiquidCrystal_I2C_t, "backlight", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, state) {
            }, LiquidCrystal_I2C_t, "setBacklight", [rt.boolTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y) {
                _this.v.members.cursorCol = x.v;
                _this.v.members.cursorRow = y.v;
            }, LiquidCrystal_I2C_t, "setCursor", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                const myString = Simulator.getStringFromInterpretor(str);
                const formatString = function (line, string) {
                    let temp = line.replaceAll('&nbsp;', ' ');
                    if (temp.length < _this.v.members.cursorCol) {
                        temp += ' '.repeat(_this.v.members.cursorCol - temp.length);
                    }
                    line = temp.substr(0, _this.v.members.cursorCol) + string;
                    if (temp.length > line.length) {
                        line += temp.substr(line.length, temp.length);
                    }
                    return line.substr(0, 15).replaceAll(' ', '&nbsp;');
                }
                if (_this.v.members.cursorRow == 0) {
                    _this.v.members.l0 = formatString(_this.v.members.l0, myString);
                } else {
                    _this.v.members.l1 = formatString(_this.v.members.l1, myString);
                }
                $('#lcd_value').html(_this.v.members.l0 + "<br/>" + _this.v.members.l1)
            }, LiquidCrystal_I2C_t, "print", ['?'], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                if (!_this.v.members.display) {
                    $('#lcd_value').css("background-color", "rgba(148, 116, 241, 0.8)");
                    $('#lcd_value').css("outline", "9px solid rgb(114, 211, 146)");
                    $('#lcd_value').css("border", "2px rgb(46, 46, 46) solid");
                    _this.v.members.display = true;
                }
            }, LiquidCrystal_I2C_t, "display", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                if (_this.v.members.display) {
                    $('#lcd_value').html('');
                    $('#lcd_value').css("background-color", "rgb(160, 160, 160, 0.8)");
                    $('#lcd_value').css("outline", "9px solid rgb(114, 211, 146, 0.5)");
                    _this.v.members.display = false;
                }
            }, LiquidCrystal_I2C_t, "noDisplay", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                _this.v.members.l0 = '';
                _this.v.members.l1 = '';
                $('#lcd_value').html('');
            }, LiquidCrystal_I2C_t, "clear", [], rt.voidTypeLiteral);
        }
    },
    "Adafruit_NeoPixel.h": {
        load: function (rt) {

            const Adafruit_NeoPixel_t = rt.newClass("Adafruit_NeoPixel", [{
                type: rt.unsignedintTypeLiteral,
                name: 'count'
            }, {
                type: rt.unsignedintTypeLiteral,
                name: 'pin'
            }, {
                type: rt.intTypeLiteral,
                name: 'type'
            }]);

            rt.defVar("NEO_GRB", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0));
            rt.defVar("NEO_KHZ800", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 1));

            rt.regFunc(function (rt, _this, count, pin, type) {
                _this.v.members.count.v = count.v;
                _this.v.members.pin.v = pin.v;
                _this.v.members.type.v = type.v;
                _this.v.members.neoPx = [];
                let html = '<div class=row>';
                let led = _this.v.members.count.v;
                if (led > 70) {
                    led = 70;
                    UIManager.showErrorMessage('error-message', 'Le simulateur ne peut simuler plus de 70 LED.');
                }
                const pinStr = Simulator.getPinString(pin.v);
                for (var i = 0; i < parseInt(led); i++) {
                    _this.v.members.neoPx.push('#000000');
                    html += '<div class="neopixel-block neopixel-' + pinStr + '" style="background-color:' + _this.v.members.neoPx[i] + ';"></div>';
                }
                html += "</div>";
                $('#neopixel_' + pinStr + '_value').html(html);
            }, Adafruit_NeoPixel_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, Adafruit_NeoPixel_t, "begin", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, n, c) {
                _this.v.members.neoPx[n.v] = "rgb(" + c.v[0].v + "," + c.v[1].v + "," + c.v[2].v + ")";
            }, Adafruit_NeoPixel_t, "setPixelColor", [rt.unsignedintTypeLiteral, rt.arrayPointerType(rt.unsignedcharTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, r, g, b) {
                const rgb = [r, g, b];
                return rt.val(rt.arrayPointerType(rt.unsignedcharTypeLiteral), rgb);
            }, Adafruit_NeoPixel_t, "Color", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinStr = Simulator.getPinString(_this.v.members.pin.v);
                for (index in _this.v.members.neoPx) {
                    $(".neopixel-" + pinStr).eq(index).css("background-color", _this.v.members.neoPx[index]);
                }
            }, Adafruit_NeoPixel_t, "show", [], rt.voidTypeLiteral);
        }
    },
    "TM1637.h": {
        load: function (rt) {

            const TM1637_t = rt.newClass("TM1637", [{
                type: rt.unsignedcharTypeLiteral,
                name: 'clk'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'data'
            }]);

            const displayDigits = function (_this) {
                let str = '';
                for (var i = 0; i < 4; i++) {
                    str += _this.v.members.display[i];
                    if (i == 1 && _this.v.members.points) {
                        str += ':';
                        _this.v.members.points = false;
                    }
                }
                const mod = Simulator.getModuleByKey('tm1637');
                const pinStr = Simulator.getPinString(_this.v.members.clk.v);
                Simulator.setAnimator(mod, mod.id + '_' + pinStr, str);
            };

            rt.regFunc(function (rt, _this, clk, data) {
                _this.v.members.clk.v = clk.v;
                _this.v.members.data.v = data.v;
                _this.v.members.display = ['0', '0', '0', '0'];
                _this.v.members.points = false;
                const pinDCKI = Simulator.getPinString(_this.v.members.clk.v, true);
                const pinDI = Simulator.getPinString(_this.v.members.data.v, true)
                const subtitle = pinDCKI + ' / ' + pinDI;
                $("#tm1637_" + _this.v.members.clk.v).find(".subtitle-module").html(subtitle);
            }, TM1637_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                rt.getFunc(TM1637_t, "clearDisplay", [])(rt, _this);
            }, TM1637_t, "init", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, brightness) {
                const pinStr = Simulator.getPinString(_this.v.members.clk.v);
                $('#tm1637_' + pinStr + '_value').css("color", "rgb(220, 53, 69, 1/" + brightness.v + ")")
            }, TM1637_t, "set", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, number) {
                let n = number.v
                if (n > 9999) {
                    n = 9999;
                    UIManager.showErrorMessage('error-message', 'Le nombre à afficher est supérieur à 9999.');
                }
                if (n < -999) {
                    UIManager.showErrorMessage('error-message', 'Le nombre à afficher est inférieur à -999.');
                    n = -999;
                }
                if (n < 9999 & n > -999) {
                    UIManager.resetMessage('error-message');
                }
                const mil = Math.trunc(n / 1000);
                const cent = Math.trunc((n - mil * 1000) / 100);
                const dix = Math.trunc((n - mil * 1000 - cent * 100) / 10);
                const unite = Math.trunc(n - mil * 1000 - cent * 100 - dix * 10);
                _this.v.members.display = [String(mil), String(cent), String(dix), String(unite)];
                if (n < 999) {
                    _this.v.members.display[0] = '0';
                    if (n < 99) {
                        _this.v.members.display[1] = '0';
                        if (n < 9) {
                            _this.v.members.display[2] = '0';
                        }
                    }
                }
                displayDigits(_this);
            }, TM1637_t, "displayNum", [rt.floatTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, state) {
                _this.v.members.points = state.v;
            }, TM1637_t, "point", [rt.boolTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, digits) {
                const myString = Simulator.getStringFromInterpretor(digits, true);
                for (var i = 0; i < 4; i++) {
                    _this.v.members.display[i] = myString[i];
                    if (_this.v.members.display[i] == '*') {
                        _this.v.members.display[i] = '°';
                    }
                }
                displayDigits(_this);
            }, TM1637_t, "display", ['?'], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                _this.v.members.display = ['0', '0', '0', '0'];
                displayDigits(_this);
            }, TM1637_t, "clearDisplay", [], rt.voidTypeLiteral);
        }
    },
    "Grove_LED_Bar.h": {
        load: function (rt) {

            const Grove_LED_Bar_t = rt.newClass("Grove_LED_Bar", [{
                type: rt.unsignedcharTypeLiteral,
                name: 'pinClock'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'pinData'
            }, {
                type: rt.boolTypeLiteral,
                name: 'greenToRed'
            }]);

            const ledBarReset = function (pinClock) {
                const ledBars = document.querySelectorAll(`#ledBar_${pinClock} > div.module-body.body-output > div.ledBar-container > div.ledBar`);
                // Réinitialise toutes les barres
                ledBars.forEach((bar) => {
                    bar.style.backgroundColor = ''; // Réinitialise les barres non concernées
                });
            };

            /**
             * Colore les barres dans une direction donnée jusqu'à un indice spécifié.
             * @param {number} index - L'indice jusqu'auquel colorer les barres.
             * @param {string} direction - La direction 'greenToRed' : 0 ou 1.
             */
            const colorLedBarsUntil = function (pinClock, index, direction = 0) {
                const ledBars = document.querySelectorAll(`#ledBar_${pinClock} > div.module-body.body-output > div.ledBar-container > div.ledBar`);

                // Vérifie que l'index est valide
                if (index < 0 || index > ledBars.length) {
                    console.error('Index hors des limites des barres.');
                    return;
                }

                ledBarReset(pinClock);

                if (!direction) {
                    // Mode Rouge -> Vert (de gauche à droite)
                    ledBars.forEach((bar, i) => {
                        if (i > index) {
                            return;
                        } else if (i === 0) {
                            bar.style.backgroundColor = 'red'; // Première barre rouge
                        } else if (i === 1) {
                            bar.style.backgroundColor = 'orange'; // Deuxième barre orange
                        } else {
                            bar.style.backgroundColor = 'green'; // Les autres barres vertes
                        }
                    });
                } else {
                    // Mode Vert -> Rouge (de droite à gauche)
                    const totalBars = ledBars.length;
                    index = index + 1;
                    for (let i = totalBars - index; i < totalBars; i++) {
                        if (i === 0) {
                            ledBars[i].style.backgroundColor = 'red'; // Barre rouge
                        } else if (i === 1) {
                            ledBars[i].style.backgroundColor = 'orange'; // Barre orange
                        } else {
                            ledBars[i].style.backgroundColor = 'green'; // Barres vertes
                        }
                    }
                }
            };

            /**
             * Colore uniquement une barre donnée selon la direction.
             * @param {number} index - L'indice de la barre à colorer.
             * @param {string} direction - La direction ('redToGreen' ou 'greenToRed').
             */
            const colorSingleLedBar = function (pinClock, index, direction = 0, state) {
                const ledBars = document.querySelectorAll(`#ledBar_${pinClock} > div.module-body.body-output > div.ledBar-container > div.ledBar`);

                // Vérifie que l'index est valide
                if (index < 0 || index > ledBars.length) {
                    console.error('Index hors des limites des barres.');
                    return;
                }

                if (direction) {
                    const totalBars = ledBars.length;
                    index = totalBars - index;
                } else { 
                    index = index - 1;
                }
                if (index < 0) index = 0;
                if (index > 9) index = 9;

                if (state === 0) {
                    ledBars[index].style.backgroundColor = ''
                    return;
                }

                // Colore la barre spécifiée en rouge, orange ou vert
                if (index === 0) {
                    ledBars[index].style.backgroundColor = 'red';
                } else if (index === 1) {
                    ledBars[index].style.backgroundColor = 'orange';
                } else {
                    ledBars[index].style.backgroundColor = 'green';
                }
            };

            rt.regFunc(function (rt, _this, pinClock, pinData, greenToRed) {
                _this.v.members.pinClock.v = pinClock.v;
                _this.v.members.pinData.v = pinData.v;
                _this.v.members.greenToRed.v = greenToRed.v;
                const pinCLK = Simulator.getPinString(_this.v.members.pinClock.v, true);
                const pinDATA = Simulator.getPinString(_this.v.members.pinData.v, true);
                const subtitle = pinCLK + ' / ' + pinDATA;
                $("#ledBar_" + _this.v.members.pinClock.v).find(".subtitle-module").html(subtitle);
                const htmlString = `
                <div class="ledBar-container">
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                </div>`;
                const ledBarModule = document.querySelector(`#ledBar_${_this.v.members.pinClock.v} > div.module-body.body-output`);
                if (ledBarModule && ledBarModule.children.length < 2) ledBarModule.insertAdjacentHTML('afterbegin', htmlString);
            }, Grove_LED_Bar_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.boolTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, Grove_LED_Bar_t, "begin", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, level) {
                const pinStr = Simulator.getPinString(_this.v.members.pinClock.v);
                const mod = Simulator.getModuleByKey('ledBar');
                Simulator.setAnimator(mod, mod.id + '_' + pinStr, level.v);
                const lebBarIndex = Math.round(level.v);
                if (lebBarIndex === 0) {
                    ledBarReset(_this.v.members.pinClock.v);
                } else if (lebBarIndex - 1 >= 0) {
                    colorLedBarsUntil(_this.v.members.pinClock.v, lebBarIndex - 1, _this.v.members.greenToRed.v);
                }
            }, Grove_LED_Bar_t, "setLevel", [rt.floatTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, greenToRed) {
                _this.v.members.greenToRed.v = greenToRed.v;
            }, Grove_LED_Bar_t, "setGreenToRed", [rt.boolTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, index, state) {
                colorSingleLedBar(_this.v.members.pinClock.v, index.v, _this.v.members.greenToRed.v, state.v);
            }, Grove_LED_Bar_t, "setLed", [rt.intTypeLiteral, rt.boolTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "SeeedOLED.h": {
        load: function (rt) {

            const SeeedOled = rt.newClass("SeeedOled", []);

            rt.SeeedOled = {
                display: [],
                pos_x: 0,
                pos_y: 0
            };

            rt.regFunc(function (rt, _this, icon, x, y) {
                rt.SeeedOled.pos_x = x.v;
                rt.SeeedOled.pos_y = y.v;
                let iconArray = []
                for (var i = 0; i < icon.v.target.length; i++) {
                    iconArray.push(icon.v.target[i].v)
                }
                setChar(rt.SeeedOled.pos_x, rt.SeeedOled.pos_y, iconArray)
            }, "global", "SeeedOled_drawIcon", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            var convertToChar = function (c) {
                charArray = []
                for (let i = 0; i < 8; i++) {
                    charArray.push(("00000000" + c[i].toString(2)).substr(-8));
                }
                for (let i = 0; i < 3; i++) {
                    charArray = charArray.map((val, index) => charArray.map(row => row[index]).reverse())
                }
                return charArray;
            };
            var setChar = function (x, y, char) {
                let index = y * 128 + x;
                for (var i = 0; i < 8; i++) {
                    let line = convertToChar(char)[i];
                    for (var j = 0; j < 8; j++) {
                        if (rt.SeeedOled.display[index + j] != line[j]) {
                            rt.SeeedOled.display[index + j] = line[j];
                            $(".oled-block").eq(index + j).css("background-color", (rt.SeeedOled.display[index + j] == '1' ? "#caf9ff" : "#000000"));
                        }
                    }
                    index += 128;
                }
            };
            var sendData = function (data) {
                let strChar = ("00000000" + data.toString(2)).substr(-8).split('').reverse().join('');
                for (let i = 0; i < 8; i++) {
                    let index = (rt.SeeedOled.pos_y + i) * 128 + rt.SeeedOled.pos_x;
                    if (rt.SeeedOled.display[index] != strChar[i]) {
                        rt.SeeedOled.display[index] = strChar[i];
                        $(".oled-block").eq(index).css("background-color", (rt.SeeedOled.display[index] == '1' ? "#caf9ff" : "#000000"));
                    }
                }
            };

            rt.regFunc(function (rt, _this) {
                html = '';
                for (let y = 0; y < 65; y++) {
                    html += '<div class=row>';
                    for (let x = 0; x < 128; x++) {
                        let index = y * 128 + x;
                        rt.SeeedOled.display.push('0');
                        html += '<div class="oled-block" style="background-color:' + (rt.SeeedOled.display[index] == '1' ? "#00bfff" : "#000000") + ';"></div>';
                    }
                    html += "</div>";
                }
                $('#oled_value').html(html);
            }, SeeedOled, "init", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, SeeedOled, "setPageMode", [], rt.voidTypeLiteral);
            rt.regFunc(function (rt, _this) { }, SeeedOled, "setNormalDisplay", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, x, y) {
                rt.SeeedOled.pos_x = x.v;
                rt.SeeedOled.pos_y = y.v;
            }, SeeedOled, "setTextXY", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, str) {
                let myString = Simulator.getStringFromInterpretor(str);
                for (let i = 0; i < myString.length; i++) {
                    let x = 8 * (rt.SeeedOled.pos_y + i) + 1;
                    let y = 8 * rt.SeeedOled.pos_x + 1;
                    if (ALPHABET_8X8[myString[i]]) {
                        setChar(x, y, ALPHABET_8X8[myString[i]]);
                    }
                }
            }, SeeedOled, "putString", ['?'], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                for (let i = 0; i < rt.SeeedOled.display.length; i++) {
                    if (rt.SeeedOled.display[i] == "1") {
                        rt.SeeedOled.display[i] = "0";
                        $(".oled-block").eq(i).css("background-color", "#000000");
                    }
                }
            }, SeeedOled, "clearDisplay", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, command) {
                sendData(command.v);
            }, SeeedOled, "sendData", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, bitmap, size) {
                for (let i = 0; i < size.v; i++) {
                    rt.SeeedOled.pos_x = i - 128 * parseInt(i / 128);
                    rt.SeeedOled.pos_y = 8 * parseInt(i / 128);
                    if (bitmap.v.target[i].v != 0) {
                        sendData(bitmap.v.target[i].v);
                    }
                }
            }, SeeedOled, "drawBitmap", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "Adafruit_SGP30.h": {
        load: function (rt) { }
    },
    "SHT31.h": {
        load: function (rt) { }
    },
    "Adafruit_BMP280_I2C.h": {
        load: function (rt) { }
    },
    "MutichannelGasSensor.h": {
        load: function (rt) { }
    },
    "SCD30.h": {
        load: function (rt) { }
    },
    "TH02_dev.h": {
        load: function (rt) {

            const TH02_dev = rt.newClass("TH02_dev", []);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, true);
            }, TH02_dev, "begin", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.doubleTypeLiteral, Simulator.getSliderValue('th02-temp'));
            }, TH02_dev, "ReadTemperature", [], rt.doubleTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.doubleTypeLiteral, Simulator.getSliderValue('th02-hum'));
            }, TH02_dev, "ReadHumidity", [], rt.doubleTypeLiteral);
        }
    },
    "Adafruit_SI1145.h": {
        load: function (rt) { }
    },
    "Adafruit_TCS34725.h": {
        load: function (rt) { }
    },
    "paj7620.h": {
        load: function (rt) { }
    },
    "Seeed_HM330X.h": {

        load: function (rt) {

            const HM330X = rt.newClass("HM330X", []);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, false);
            }, HM330X, "init", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, data) {
                switch (data.v) {
                    case 5:
                        return rt.val(rt.doubleTypeLiteral, Simulator.getSliderValue('hm330x', suffix = '_pm1'));
                    case 6:
                        return rt.val(rt.doubleTypeLiteral, Simulator.getSliderValue('hm330x', suffix = '_pm2_5'));
                    case 7:
                        return rt.val(rt.doubleTypeLiteral, Simulator.getSliderValue('hm330x', suffix = '_pm10'));
                }
            }, "global", "hm330x_measure", [rt.unsignedcharTypeLiteral], rt.doubleTypeLiteral);
        }
    },
    "DS1307.h": {
        load: function (rt) {
        }
    },
    "Air_Quality_Sensor.h": {
        load: function (rt) {

            const AirQualitySensor_t = rt.newClass("AirQualitySensor", [
                {
                    type: rt.intTypeLiteral,
                    name: 'FORCE_SIGNAL'
                }, {
                    type: rt.intTypeLiteral,
                    name: 'HIGH_POLLUTION'
                }, {
                    type: rt.intTypeLiteral,
                    name: 'LOW_POLLUTION'
                }, {
                    type: rt.intTypeLiteral,
                    name: 'FRESH_AIR'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_pin'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_lastVoltage'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_currentVoltage'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_standardVoltage'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_voltageSum'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_volSumCount'
                }, {
                    type: rt.intTypeLiteral,
                    name: '_lastStdVolUpdated'
                }
            ]);

            const millis = function (rt, _this) {
                return rt.getFunc("global", "millis", [])(rt, _this).v;
            };

            const analogRead = function (members) {
                return Simulator.getSliderValue('airQuality_A' + (members._pin.v - 14));
            };

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members._pin.v = pin.v;
                _this.v.members.FORCE_SIGNAL.v = 0;
                _this.v.members.HIGH_POLLUTION.v = 1;
                _this.v.members.LOW_POLLUTION.v = 2;
                _this.v.members.FRESH_AIR.v = 3;
                _this.v.members._voltageSum.v = 0;
                _this.v.members._volSumCount.v = 0;
            }, AirQualitySensor_t, "__init__", [rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const initVoltage = analogRead(_this.v.members);
                if (10 < initVoltage && initVoltage < 798) {
                    _this.v.members._currentVoltage.v = initVoltage;
                    _this.v.members._lastVoltage.v = initVoltage;
                    _this.v.members._standardVoltage.v = initVoltage;
                    _this.v.members._lastStdVolUpdated.v = millis(rt, _this);
                    return rt.val(rt.boolTypeLiteral, true);
                } else {
                    return rt.val(rt.boolTypeLiteral, false);
                }
            }, AirQualitySensor_t, "init", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                _this.v.members._lastVoltage.v = _this.v.members._currentVoltage.v;
                _this.v.members._currentVoltage.v = analogRead(_this.v.members);
                _this.v.members._voltageSum.v += _this.v.members._currentVoltage.v;
                _this.v.members._volSumCount.v += 1;
                rt.getFunc(AirQualitySensor_t, "updateStandardVoltage", [])(rt, _this);
                const diff_lv = _this.v.members._currentVoltage.v - _this.v.members._lastVoltage.v;
                const _cv = _this.v.members._currentVoltage.v;
                const _diff_sv = _this.v.members._currentVoltage.v - _this.v.members._standardVoltage.v;
                if (diff_lv > 400 || _cv > 700) {
                    return rt.val(rt.intTypeLiteral, _this.v.members.FORCE_SIGNAL.v);
                } else if ((diff_lv > 400 && _cv < 700) || _diff_sv > 150) {
                    return rt.val(rt.intTypeLiteral, _this.v.members.HIGH_POLLUTION.v);
                } else if ((diff_lv > 200 && _cv < 700) || _diff_sv > 50) {
                    return rt.val(rt.intTypeLiteral, _this.v.members.LOW_POLLUTION.v);
                } else {
                    return rt.val(rt.intTypeLiteral, _this.v.members.FRESH_AIR.v);
                }
            }, AirQualitySensor_t, "slope", [], rt.intTypeLiteral);


            rt.regFunc(function (rt, _this) {
                if (millis(rt, _this) - _this.v.members._lastStdVolUpdated.v > 500000) {
                    _this.v.members._standardVoltage.v = _this.v.members._voltageSum.v / _this.v.members._volSumCount.v;
                    _this.v.members._lastStdVolUpdated.v = millis(rt, _this);
                    _this.v.members._voltageSum.v = 0;
                    _this.v.members._volSumCount.v = 0;
                }
            }, AirQualitySensor_t, "updateStandardVoltage", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                // TO DO: check if library do the same with sensor ...
                // return rt.val(rt.intTypeLiteral, _this.v.members._currentVoltage.v); from Air_Quality_Sensor.cpp
                return rt.val(rt.intTypeLiteral, analogRead(_this.v.members));
            }, AirQualitySensor_t, "getValue", [], rt.doubleTypeLiteral);

        }
    },
    "High_Temp.h": {
        load: function (rt) {

            const HighTemp = rt.newClass("HighTemp", [{
                type: rt.unsignedcharTypeLiteral,
                name: 'pinRoom'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'pinTemp'
            }]);

            rt.regFunc(function (rt, _this, pinRoom, pinTemp) {
                _this.v.members.pinTemp.v = pinTemp.v;
                _this.v.members.pinRoom.v = pinRoom.v;
            }, HighTemp, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinName_room = 'A' + (_this.v.members.pinRoom.v - 100);
                const duty_room = Simulator.getSliderValue('highTemp-room_' + pinName_room);
                _this.v.members.roomTemp = Simulator.Mosaic.grove.calculs.getRoomTemp(duty_room);
                return rt.val(rt.boolTypeLiteral, true);
            }, HighTemp, "begin", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinName_thmc = 'A' + (_this.v.members.pinTemp.v - 100);
                const duty_thmc = Simulator.getSliderValue('highTemp-thmc_' + pinName_thmc);
                const thmc = Simulator.Mosaic.grove.calculs.getThmcTemp(duty_thmc, _this.v.members.roomTemp);
                return rt.val(rt.doubleTypeLiteral, thmc);
            }, HighTemp, "getThmc", [], rt.doubleTypeLiteral);
        }
    },
    "DHT.h": {
        load: function (rt) {

            const DHT = rt.newClass("DHT", [{
                type: rt.unsignedcharTypeLiteral,
                name: "pin"
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: "type"
            }]);

            rt.defVar("DHT11", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 0));
            rt.defVar("DHT22", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 1));

            rt.regFunc(function (rt, _this, pin, type) {
                _this.v.members.pin.v = pin.v;
                _this.v.members.type.v = type.v;
            }, DHT, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.boolTypeLiteral, true);
            }, DHT, "begin", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinStr = Simulator.getPinString(_this.v.members.pin.v);
                const module = Simulator.pinList.find(module => module.pin == pinStr);
                if (module) {
                    return rt.val(rt.doubleTypeLiteral, $("#" + module.id.replace('-hum', '-temp') + '_slider').slider('option', 'value'));
                }
            }, DHT, "readTemperature", [], rt.doubleTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinStr = Simulator.getPinString(_this.v.members.pin.v);
                const module = Simulator.pinList.find(module => module.pin == pinStr);
                if (module) {
                    return rt.val(rt.doubleTypeLiteral, $("#" + module.id.replace('-temp', '-hum') + '_slider').slider('option', 'value'));
                }
            }, DHT, "readHumidity", [], rt.doubleTypeLiteral);
        }
    },
    "Adafruit_TCS34725.h": {
        load: function (rt) {

            const Adafruit_TCS34725 = rt.newClass("Adafruit_TCS34725", []);

            rt.regFunc(function (rt, _this) {
                $("#colorSensor").find(".subtitle-module").html('I2C (0x29)');
                return rt.val(rt.boolTypeLiteral, true);
            }, Adafruit_TCS34725, "begin", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, pointer_r, pointer_g, pointer_b, pointer_clear) {
                const r = Simulator.getSliderValue('colorSensor', '_r');
                const g = Simulator.getSliderValue('colorSensor', '_g');
                const b = Simulator.getSliderValue('colorSensor', '_b');
                const args = rt.interp.currentNode.args;
                Simulator.setVariable(rt, args[0], rt.val(rt.unsignedcharTypeLiteral, r));
                Simulator.setVariable(rt, args[1], rt.val(rt.unsignedcharTypeLiteral, g));
                Simulator.setVariable(rt, args[2], rt.val(rt.unsignedcharTypeLiteral, b));
                Simulator.setVariable(rt, args[3], rt.val(rt.unsignedcharTypeLiteral, 1));
            }, Adafruit_TCS34725, "getRawData", [rt.normalPointerType(rt.unsignedcharTypeLiteral), rt.normalPointerType(rt.unsignedcharTypeLiteral), rt.normalPointerType(rt.unsignedcharTypeLiteral), rt.normalPointerType(rt.unsignedcharTypeLiteral)], rt.floatTypeLiteral);

            rt.regFunc(function (rt, _this, r, g, b) {
                return rt.val(rt.floatTypeLiteral, 0);
            }, Adafruit_TCS34725, "calculateColorTemperature", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.floatTypeLiteral);

            rt.regFunc(function (rt, _this, r, g, b) {
                return rt.val(rt.floatTypeLiteral, 0);
            }, Adafruit_TCS34725, "calculateLux", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.floatTypeLiteral);

            rt.regFunc(function (rt, _this, state) {

            }, Adafruit_TCS34725, "setInterrupt", [rt.boolTypeLiteral], rt.voidTypeLiteral);
        }
    },
    "Servo.h": {
        load: function (rt) {

            const Servo = rt.newClass("Servo", [{
                type: rt.unsignedcharTypeLiteral,
                name: "pin"
            }]);

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members.pin.v = pin.v;
            }, Servo, "attach", [rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, angle) {
                if (angle.v > 180 || angle.v < 0) {
                    UIManager.showErrorMessage('error-message', 'L\'angle du servomoteur doit être compris entre 0 et 180');
                } else {
                    UIManager.resetMessage('error-message');
                    const module = Simulator.pinList.find(module => module.pin == _this.v.members.pin.v);
                    if (module) {
                        if (/continuousServo/.test(module.id)) {
                            const mod = Simulator.getModuleByKey('continuousServo')
                            Simulator.setAnimator(mod, module.id, angle.v);
                        } else {
                            const mod = Simulator.getModuleByKey('servo')
                            Simulator.setAnimator(mod, module.id, angle.v);
                        }
                    }

                }
            }, Servo, "write", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const module = Simulator.pinList.find(module => module.pin === _this.v.members.pin.v);
                if (module) {
                    $('#' + module.id + '_value').html("0");
                    $('#' + module.id + '_anim').css('animation', 'rotation-forward 0s infinite linear');
                    $('#' + module.id + '_anim').css('transform', 'rotate(0deg)');
                }
            }, Servo, "detach", [], rt.voidTypeLiteral);

        }
    },
    "Ultrasonic.h": {
        load: function (rt) {

            const Ultrasonic_t = rt.newClass("Ultrasonic", [{
                type: rt.intTypeLiteral,
                name: 'pin'
            }]);

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members.pin.v = pin.v;
            }, Ultrasonic_t, "__init__", [rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinStr = Simulator.getPinString(_this.v.members.pin.v);
                const distance = $('#ultrasonic_' + pinStr + '_slider_d').slider('option', 'value') / 29 / 2;
                return rt.val(rt.longTypeLiteral, distance);
            }, Ultrasonic_t, "MeasureInCentimeters", [], rt.longTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinStr = Simulator.getPinString(_this.v.members.pin.v);
                const distance = $('#ultrasonic_' + pinStr + '_slider_d').slider('option', 'value') / 29 / 2;
                return rt.val(rt.longTypeLiteral, distance / 2.54);
            }, Ultrasonic_t, "MeasureInInches", [], rt.longTypeLiteral);
        }
    },
    "ChainableLED.h": {
        load: function (rt) {

            const ChainableLED_t = rt.newClass("ChainableLED", [{
                type: rt.unsignedcharTypeLiteral,
                name: 'clk'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'data'
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: 'n'
            }]);

            rt.regFunc(function (rt, _this, clk, data, n) {
                _this.v.members.clk.v = clk.v;
                _this.v.members.data.v = data.v;
                _this.v.members.n.v = n.v;
                const pinCIN = Simulator.getPinString(_this.v.members.clk.v, true);
                const pinDIN = Simulator.getPinString(_this.v.members.data.v, true);
                for (var i = 0; i < _this.v.members.n.v; i++) {
                    const subtitle = pinCIN + ' / ' + pinDIN + ' - LED ' + i;
                    $("#RGBLed_" + _this.v.members.data.v + '-' + i).find(".subtitle-module").html(subtitle);
                }
            }, ChainableLED_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const mod = Simulator.getModuleByKey("RGBLed");
                Simulator.setAnimator(mod, 'RGBLed_' + _this.v.members.data.v + '-' + _this.v.members.n.v, [0, 0, 0]);
            }, ChainableLED_t, "init", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, led, r, g, b) {
                const mod = Simulator.getModuleByKey("RGBLed");
                Simulator.setAnimator(mod, mod.id + '_' + _this.v.members.clk.v + '-' + led.v, [r.v, g.v, b.v]);
            }, ChainableLED_t, "setColorRGB", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);
        }
    },
    'SeeedGroveMP3.h': {
        load: function (rt) {
            const MP3Player = rt.newClass("SeeedGroveMP3", []);

            const addPlayerBtn = function (mod, btn) {
                const player_btn = document.getElementById("mp3_player_btn");
                if (!player_btn) {
                    const parentElement = document.querySelector("#" + mod.id + " > div.module-body.body-output > div.module-value");
                    const iconElement = document.createElement("i");
                    iconElement.id = "mp3_player_btn";
                    iconElement.className = "me-1 fa-solid " + btn;
                    const firstChild = parentElement.firstChild;
                    parentElement.insertBefore(iconElement, firstChild);
                } else {
                    const current_btn_class = player_btn.classList[player_btn.classList.length - 1];
                    player_btn.classList.remove(current_btn_class);
                    player_btn.classList.add(btn);
                }
            };

            rt.regFunc(function (rt, _this) {
                const mod = Simulator.getModuleByKey("groveMP3");
                $('#' + mod.id + '_value').text('PLAY')
                addPlayerBtn(mod, "fa-play");
            }, MP3Player, "init", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const mod = Simulator.getModuleByKey("groveMP3");
                const player_btn = document.getElementById("mp3_player_btn");
                if (player_btn.classList.contains('fa-play')) {
                    $('#' + mod.id + '_value').text('PAUSE');
                    addPlayerBtn(mod, "fa-pause");
                } else {
                    $('#' + mod.id + '_value').text('PLAY');
                    addPlayerBtn(mod, "fa-play");
                }
            }, MP3Player, "pause_or_play", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const mod = Simulator.getModuleByKey("groveMP3");
                addPlayerBtn(mod, "fa-forward");
                $('#' + mod.id + '_value').text('NEXT')
                setTimeout(function () {
                    addPlayerBtn(mod, "fa-play");
                    $('#' + mod.id + '_value').text('PLAY')
                }, 1000);
            }, MP3Player, "next", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, MP3Player, "volume", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, MP3Player, "getVolume", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, MP3Player, "getAllSong", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, MP3Player, "playSDSong", ['?'], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) { }, MP3Player, "playSDDirectorySong", ['?'], rt.voidTypeLiteral);
        }
    },
    "OneWire.h": {
        load: function (rt) {

            const OneWire_t = rt.newClass("OneWire", [{
                type: rt.unsignedcharTypeLiteral,
                name: "pin"
            }]);

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members.pin.v = pin.v;
            }, OneWire_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "begin", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "reset", [], rt.unsignedcharTypeLiteral);

            rt.regFunc(function (rt, _this, v) {
            }, OneWire_t, "write_bit", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "read_bit", [], rt.unsignedcharTypeLiteral);

            rt.regFunc(function (rt, _this, v, power) {
            }, OneWire_t, "write", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, buf, count, power) {
            }, OneWire_t, "write_bytes", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.unsignedshortTypeLiteral, rt.boolTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "read", [], rt.unsignedcharTypeLiteral);

            rt.regFunc(function (rt, _this, buf, count) {
            }, OneWire_t, "read_bytes", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.unsignedshortTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, rom) {
            }, OneWire_t, "select", [rt.arrayPointerType(rt.unsignedcharTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "skip", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "depower", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, OneWire_t, "reset_search", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, family_code) {
            }, OneWire_t, "target_search", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, newAddr, search_mode) {
            }, OneWire_t, "search", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.boolTypeLiteral], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this, addr, len) {
            }, OneWire_t, "crc8", [rt.arrayPointerType(rt.unsignedcharTypeLiteral), rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, pin) {
                const pinStr = Simulator.getPinString(pin.v)
                const temp = $('#ds18x20_' + pinStr + '_slider').slider('option', 'value')
                return rt.val(rt.floatTypeLiteral, temp);
            }, "global", "ds18b20_readTemperature", [rt.intTypeLiteral], rt.floatTypeLiteral);
        }
    },
};