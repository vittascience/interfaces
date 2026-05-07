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
            ], ["Print"]);

            const __init__ = function (rt, _this, receivePin, transmitPin, inverse_logic, serialType) {
                _this.v.members.receivePin.v = receivePin.v;
                _this.v.members.transmitPin.v = transmitPin.v;
                _this.v.members.inverse_logic.v = inverse_logic.v;
                _this.v.members.serialType.v = Simulator.getStringFromInterpretor(serialType);
                const pinRX = Simulator.getPinString(_this.v.members.receivePin.v, true);
                const pinTX = Simulator.getPinString(_this.v.members.transmitPin.v, true);
                const subtitle = 'UART - ' + pinRX + ' / ' + pinTX;
                if (_this.v.members.serialType.v.includes("HC05")) {
                    _this.v.members.moduleId = 'hc05';
                    $('#' + _this.v.members.moduleId).find(".subtitle-module").html(subtitle);
                }
                else if (_this.v.members.serialType.v.includes("HM10")) {
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
            rt.regFunc(__init__, SoftwareSerial_t, "__init__", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.boolTypeLiteral, rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

            const component_write = function (buffer, members) {
                if (!buffer) return;
                if (members.serialType.v.includes('HC05') || members.serialType.v.includes('HM10') || members.serialType.v.includes('blueToothSerial')) {
                    BluetoothSimulator.sendBluetoothData(buffer);
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
            };

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
                component_write(string, _this.v.members);
                return rt.val(rt.intTypeLiteral, strLength);
            }
            rt.regFunc(write, SoftwareSerial_t, "write", ['?'], rt.intTypeLiteral);

            const begin = function (rt, _this, speed) {
                const baud = rt.val(rt.doubleTypeLiteral, speed.v);
            };
            rt.regFunc(begin, SoftwareSerial_t, "begin", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            const _read = function (members, isForString) {
                if (members.serialType.v.includes('HC05') || members.serialType.v.includes('HM10') || members.serialType.v.includes('blueToothSerial')) {
                    return BluetoothSimulator.checkBluetoothData('read', members.moduleId, isForString);
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
                return rt.String_makeValueFromJSString(String(_read(_this.v.members, true)));
            };
            rt.regFunc(readString, SoftwareSerial_t, "readString", [], rt.String_t);

            const available = function (rt, _this) {
                if (_this.v.members.serialType.v.includes('HC05') || _this.v.members.serialType.v.includes('HM10') || _this.v.members.serialType.v.includes('blueToothSerial')) {
                    return rt.val(rt.intTypeLiteral, BluetoothSimulator.checkBluetoothData('available', _this.v.members.moduleId));
                } else if (_this.v.members.serialType.v.includes('mhz19')) {
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
                if (_this.v.members.serialType.v.includes('HC05') || _this.v.members.serialType.v.includes('HM10') || _this.v.members.serialType.v.includes('blueToothSerial')) {
                    BluetoothSimulator.checkBluetoothData('flush', _this.v.members.moduleId);
                }
                else if (_this.v.members.serialType.v.includes('Serial')) {
                    Simulator.serialData = "";
                }
                return rt.val(rt.boolTypeLiteral, true);
            };
            rt.regFunc(flush, SoftwareSerial_t, "flush", [], rt.voidTypeLiteral);
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
                type: rt.unsignedcharTypeLiteral,
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
            }, Adafruit_NeoPixel_t, "__init__", [rt.unsignedintTypeLiteral, rt.unsignedcharTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

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
                const pinCLK = Simulator.getPinString(pinClock, true);
                const pinId = /^D\d+$/.exec(pinCLK) ? pinClock : pinCLK;
                const ledBars = document.querySelectorAll(`#ledBar_${pinId} > div.module-body.body-output > div.ledBar-container > div.ledBar`);
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
                const pinCLK = Simulator.getPinString(pinClock, true);
                const pinId = /^D\d+$/.exec(pinCLK) ? pinClock : pinCLK;
                const ledBars = document.querySelectorAll(`#ledBar_${pinId} > div.module-body.body-output > div.ledBar-container > div.ledBar`);

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
                const pinCLK = Simulator.getPinString(pinClock, true);
                const pinId = /^D\d+$/.exec(pinCLK) ? pinClock : pinCLK;
                const ledBars = document.querySelectorAll(`#ledBar_${pinId} > div.module-body.body-output > div.ledBar-container > div.ledBar`);

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
                const pinId = /^D\d+$/.exec(pinCLK) ? pinClock.v : pinCLK;
                $("#ledBar_" + pinId).find(".subtitle-module").html(subtitle);
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
                const ledBarModule = document.querySelector(`#ledBar_${pinId} > div.module-body.body-output`);
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
                    type: rt.unsignedcharTypeLiteral,
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
            }, AirQualitySensor_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

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
                updateStandardVoltage(rt, _this);
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

            const updateStandardVoltage = function (rt, _this) {
                if (millis(rt, _this) - _this.v.members._lastStdVolUpdated.v > 500000) {
                    _this.v.members._standardVoltage.v = _this.v.members._voltageSum.v / _this.v.members._volSumCount.v;
                    _this.v.members._lastStdVolUpdated.v = millis(rt, _this);
                    _this.v.members._voltageSum.v = 0;
                    _this.v.members._volSumCount.v = 0;
                }
            };
            rt.regFunc(updateStandardVoltage, AirQualitySensor_t, "updateStandardVoltage", [], rt.voidTypeLiteral);

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
                _this.v.members.roomTemp = Simulator.Mosaic.grove_analog.calculs.getRoomTemp(duty_room);
                return rt.val(rt.boolTypeLiteral, true);
            }, HighTemp, "begin", [], rt.boolTypeLiteral);

            rt.regFunc(function (rt, _this) {
                const pinName_thmc = 'A' + (_this.v.members.pinTemp.v - 100);
                const duty_thmc = Simulator.getSliderValue('highTemp-thmc_' + pinName_thmc);
                const thmc = Simulator.Mosaic.grove.calculs_analog.getThmcTemp(duty_thmc, _this.v.members.roomTemp);
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
                    const analog_pins = { 14: 'A0', 15: 'A1', 16: 'A2', 17: 'A3', 18: 'A4', 19: 'A5' }
                    const module = Simulator.pinList.find(module => (module.pin == _this.v.members.pin.v || module.pin == analog_pins[_this.v.members.pin.v]));
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
                type: rt.unsignedcharTypeLiteral,
                name: 'pin'
            }]);

            rt.regFunc(function (rt, _this, pin) {
                _this.v.members.pin.v = pin.v;
            }, Ultrasonic_t, "__init__", [rt.unsignedcharTypeLiteral], rt.voidTypeLiteral);

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
    "ArduinoGraphics.h": {
        load: function (rt) {
            const Font_t = rt.newClass("Font", []);
            rt.defVar("Font_5x7", Font_t, rt.val(Font_t, ALPHABET_5X7));
            rt.defVar("SCROLL_LEFT", rt.unsignedintTypeLiteral, rt.val(rt.unsignedintTypeLiteral, 1));

            const ArduinoGraphics_t = rt.newClass("ArduinoGraphics", [], ["Print"]);

        }
    },
    "Arduino_LED_Matrix.h": {
        load: function (rt) {
            const ArduinoLEDMatrix_t = rt.newClass("ArduinoLEDMatrix", [], ["ArduinoGraphics"]);
            const Font_5x7 = rt.readVar('Font_5x7');

            function setLED(x, y, state) {
                const boardSvg = document.getElementById("board-viewer").contentDocument;
                if (boardSvg !== null) {
                    const ledId = `#led${y + 1}-${x + 1}_on`;
                    const led = boardSvg.querySelector(ledId);
                    if (state) {
                        led.style.display = 'block';
                    } else {
                        led.style.display = 'none';
                    }
                }
            };

            rt.regFunc(function (rt, _this) {
                _this.stroke = 0;
                _this.matrix = Array.from({ length: 8 }, () => Array(12).fill(_this.stroke));
            }, ArduinoLEDMatrix_t, "begin", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
            }, ArduinoLEDMatrix_t, "clear", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, value) {
                _this.stroke = value.v;
            }, ArduinoLEDMatrix_t, "stroke", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

            // Arduino Graphics functions

            rt.regFunc(function (rt, _this) {
            }, ArduinoLEDMatrix_t, "beginDraw", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                for (var y = 0; y < 8; y++) {
                    for (var x = 0; x < 12; x++) {
                        setLED(x, y, _this.matrix[y][x]);
                    }
                }
            }, ArduinoLEDMatrix_t, "endDraw", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, xx, yy) {
                const point = {
                    x: xx.v,
                    y: yy.v
                };
                _this.matrix[point.y][point.x] = _this.stroke;
            }, ArduinoLEDMatrix_t, "point", [rt.intTypeLiteral, rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, speed) {
                rt.raiseException("<b>textScrollSpeed()</b> from <b>ArduinoLEDMatrix</b> is not yet implemented.")
                _this.speed = speed.v;
            }, ArduinoLEDMatrix_t, "textScrollSpeed", [rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, font) {
                _this.font = font.v;
            }, ArduinoLEDMatrix_t, "textFont", [Font_5x7.t], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, param1, param2, stroke) {
                _this.beginText = {
                    param1: param1.v,
                    param2: param2.v,
                    stroke: stroke.v
                };
            }, ArduinoLEDMatrix_t, "beginText", [rt.intTypeLiteral, rt.intTypeLiteral, rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, direction) {
                _this.direction = direction.v;
            }, ArduinoLEDMatrix_t, "endText", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, frame) {
                rt.raiseException("<b>loadFrame()</b> from <b>ArduinoLEDMatrix</b> is not yet implemented.")
            }, ArduinoLEDMatrix_t, "loadFrame", [rt.arrayPointerType(rt.unsignedintTypeLiteral)], rt.voidTypeLiteral);

        }
    },
    "WiFi.h": {
        load: function (rt) {

            const val = (value) => rt.val(rt.unsignedcharTypeLiteral, value);

            rt.include('IPAddress.h');
            rt.include('WiFiTypes.h');

            const WiFi_t = rt.newClass("WiFi", []);
            const IPAddress_t = { name: 'IPAddress', type: 'class' };

            rt.scope[0].variables["WiFi"] = {
                t: WiFi_t,
                v: {
                    members: {
                        _status: rt.readVar("WL_NO_MODULE")
                    }
                },
                left: false
            };

            rt.regFunc(function (rt, _this) {
                return _this.v.members._status;
            }, WiFi_t, "status", [], rt.intTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return rt.String_makeValueFromJSString("2.0.0");
            }, WiFi_t, "firmwareVersion", [], rt.String_t);

            rt.regFunc(function (rt, _this, ssid, password) {
                _this.v.members._ssid = rt.String_makeValueFromJSString(Simulator.getStringFromInterpretor(ssid));
                _this.v.members._password = rt.String_makeValueFromJSString(Simulator.getStringFromInterpretor(password));
                _this.v.members._status = rt.readVar("WL_CONNECTED");
                _this.v.members._ip = rt.val(IPAddress_t, {
                    members: { a: val(192), b: val(168), c: val(1), d: val(10) }
                });
                return _this.v.members._status;
            }, WiFi_t, "begin", ["?"], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._ssid;
            }, WiFi_t, "SSID", [], rt.String_t);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._ip;
            }, WiFi_t, "localIP", [], IPAddress_t);

            rt.regFunc(function (rt, _this) {
                return rt.val(rt.longTypeLiteral, -50);
            }, WiFi_t, "RSSI", [], rt.longTypeLiteral);

            rt.readVar('WiFi').v.members._status = rt.readVar("WL_IDLE_STATUS");
        }
    },
    "WiFiTypes.h": {
        load: function (rt) {

            rt.defVar("WL_NO_MODULE", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0xff));

            rt.defVar("WL_IDLE_STATUS", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x00));
            rt.defVar("WL_NO_SSID_AVAIL", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x01));
            rt.defVar("WL_SCAN_COMPLETED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x02));

            rt.defVar("WL_CONNECTED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x03));
            rt.defVar("WL_CONNECTION_FAILED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x04));
            rt.defVar("WL_CONNECTION_LOST", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x05));
            rt.defVar("WL_DISCONNECTED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x06));

            rt.defVar("WL_AP_LISTENING", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x07));
            rt.defVar("WL_AP_CONNECTED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x08));
            rt.defVar("WL_AP_FAILED", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0x09));
        }
    },
    "IPAddress.h": {
        load: function (rt) {

            const val = (value) => rt.val(rt.unsignedcharTypeLiteral, value);

            const IPAddress_t = rt.newClass("IPAddress", [{
                type: rt.unsignedcharTypeLiteral,
                name: "a",
                initialize(rt, _this) { return val(0) }
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: "b",
                initialize(rt, _this) { return val(0) }
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: "c",
                initialize(rt, _this) { return val(0) }
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: "d",
                initialize(rt, _this) { return val(0) }
            }]);

            rt.defVar("INADDR_NONE", IPAddress_t, rt.val(IPAddress_t, {
                members: { a: val(0), b: val(0), c: val(0), d: val(0) }
            }));

            rt.regFunc(function (rt, _this, a, b, c, d) {
                return {
                    t: IPAddress_t,
                    v: {
                        members: { a: val(a.v), b: val(b.v), c: val(c.v), d: val(d.v) }
                    },
                    left: false
                }
            }, "global", "IPAddress", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral], IPAddress_t);

            const toStringCPP = function (rt, _this) {
                const args = _this.v.members;
                return rt.String_makeValueFromJSString(`${args.a.v}.${args.b.v}.${args.c.v}.${args.d.v}`);
            };
            rt.regFunc(toStringCPP, IPAddress_t, "toStringCPP", [], rt.String_t);

            rt.regFunc(function (rt, _this, index) {
                switch (index.v) {
                    case 0: return _this.v.members.a;
                    case 1: return _this.v.members.b;
                    case 2: return _this.v.members.c;
                    case 3: return _this.v.members.d;
                    default: return rt.val(rt.unsignedcharTypeLiteral, 0);
                }
            }, IPAddress_t, "o([])", [rt.unsignedintTypeLiteral], rt.unsignedcharTypeLiteral);

            rt.regFunc(function (rt, ip1, ip2) {
                const isEqual = (ip1.v.members.a.v == ip2.v.members.a.v)
                    && (ip1.v.members.b.v == ip2.v.members.b.v)
                    && (ip1.v.members.c.v == ip2.v.members.c.v)
                    && (ip1.v.members.d.v == ip2.v.members.d.v);
                return rt.val(rt.boolTypeLiteral, isEqual);
            }, IPAddress_t, "o(==)", [IPAddress_t, IPAddress_t], rt.boolTypeLiteral);

        }
    },
    "WiFiServer.h": {
        load: function (rt) {

            // ip
            const IPAddress_t = { name: 'IPAddress', type: 'class' };
            // client
            const WiFiClient_t = { name: 'WiFiClient', type: 'class' };
            const WiFiClient = function () {
                return rt.getFunc("global", "WiFiClient", [])(rt, {});
            };
            // server
            const WiFiServer_t = rt.newClass("WiFiServer", [{
                type: rt.unsignedintTypeLiteral,
                name: "_port",
                initialize(rt, _this) { return rt.val(rt.unsignedintTypeLiteral, 0) }
            }]);

            rt.regFunc(function (rt, _this, port) {
                return {
                    t: WiFiServer_t,
                    v: {
                        members: { _port: rt.val(rt.unsignedintTypeLiteral, port.v) }
                    },
                    left: false
                }
            }, "global", "WiFiServer", [rt.unsignedintTypeLiteral], WiFiServer_t);

            rt.regFunc(function (rt, _this) {
                const ip = rt.readVar('WiFi').v.members._ip;
                const ipStr = rt.String_getJSString(rt.getFunc(IPAddress_t, "toStringCPP", [])(rt, ip));
                WifiSimulator.static_IP = ipStr;
                WifiSimulator.server.bind({ ip: ipStr, port: _this.v.members._port.v });
            }, WiFiServer_t, "begin", [], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                let clientSocket = WifiSimulator.server.getCurrentClient();
                if (!clientSocket) {
                    clientSocket = WifiSimulator.server.getNextClient();
                }
                const client = WiFiClient();
                if (clientSocket) {
                    WifiSimulator.server.setCurrentClientSocket(clientSocket);
                    if (clientSocket.addr[0] || clientSocket.hostname) {
                        client.v.members._connected.v = clientSocket.is_connected;
                        const ip = (i) => rt.val(rt.unsignedcharTypeLiteral, parseInt(clientSocket.addr[0].split('.')[i]));
                        client.v.members._ip.v.members = { a: ip(0), b: ip(1), c: ip(2), d: ip(3) };
                    }
                }
                return client;
            }, WiFiServer_t, "available", [], WiFiClient_t);
        }
    },
    "WiFiClient.h": {
        load: function (rt) {
            // ip
            const IPAddress_t = { name: 'IPAddress', type: 'class' };
            const IPAddress = function (a, b, c, d) {
                const ips = [rt.val(rt.unsignedcharTypeLiteral, a), rt.val(rt.unsignedcharTypeLiteral, b), rt.val(rt.unsignedcharTypeLiteral, c), rt.val(rt.unsignedcharTypeLiteral, d)];
                return rt.getFunc("global", "IPAddress", [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral])(rt, {}, ...ips);
            };

            const WiFiClient_t = rt.newClass("WiFiClient", [{
                type: IPAddress_t,
                name: "_ip",
                initialize(rt, _this) { return IPAddress(0, 0, 0, 0) }
            }, {
                type: rt.boolTypeLiteral,
                name: "_connected",
                initialize(rt, _this) { return rt.val(rt.boolTypeLiteral, false) }
            }, {
                type: rt.unsignedlongTypeLiteral,
                name: "_timeout",
                initialize(rt, _this) { return rt.val(rt.unsignedlongTypeLiteral, 1000) }
            }, {
                type: rt.unsignedlongTypeLiteral,
                name: "_data",
                initialize(rt, _this) { return rt.String_makeValueFromJSString("") }
            }]);

            rt.regFunc(function (rt, _this) {
                return {
                    t: WiFiClient_t,
                    v: {
                        members: {
                            _ip: IPAddress(0, 0, 0, 0),
                            _connected: rt.val(rt.boolTypeLiteral, false),
                            _timeout: rt.val(rt.unsignedlongTypeLiteral, 1000),
                            _data: rt.String_makeValueFromJSString("")
                        }
                    },
                    left: false
                }
            }, "global", "WiFiClient", [], WiFiClient_t);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._connected;
            }, WiFiClient_t, "connected", [], rt.boolTypeLiteral);


            const available = async function (rt, _this) {
                let data = rt.String_getJSString(_this.v.members._data);
                let timeout = 0;
                while (timeout < _this.v.members._timeout.v) {
                    if (Simulator.stop_flag) {
                        break;
                    }
                    const buffer = WifiSimulator.server.waitingCurrentClientData();
                    if (buffer) {
                        data += buffer;
                    }
                    timeout += 50;
                    await Simulator.sleep_ms(50);
                }
                _this.v.members._data = rt.String_makeValueFromJSString(data);
                return rt.val(rt.intTypeLiteral, data.length);
            };
            const Susp_available = function (rt, _this) {
                return rt.asyncToSuspension(available, [rt, _this]);
            };
            rt.regAsyncFunc(Susp_available, available);
            rt.regFunc(Susp_available, WiFiClient_t, "available", [], rt.intTypeLiteral);

            rt.regFunc(function (rt, _this, ms) {
                _this.v.members._timeout = ms;
            }, WiFiClient_t, "setTimeout", [rt.intTypeLiteral], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this) {
                return _this.v.members._ip;
            }, WiFiClient_t, "remoteIP", [], IPAddress_t);

            rt.regFunc(function (rt, _this) {
                WifiSimulator.server.closeSocket();
                _this.v.members._connected.v = false;
            }, WiFiClient_t, "stop", [], rt.voidTypeLiteral);

            const readString = async function (rt, _this) {
                await available(rt, _this);
                const data = rt.String_getJSString(_this.v.members._data);
                _this.v.members._data = rt.String_makeValueFromJSString("");
                return rt.String_makeValueFromJSString(data);
            };

            const Susp_readString = function (rt, _this) {
                return rt.asyncToSuspension(readString, [rt, _this]);
            };
            rt.regAsyncFunc(Susp_readString, readString);
            rt.regFunc(Susp_readString, WiFiClient_t, "readString", [], rt.String_t);

            const _write = function (rt, buffer, n) {
                const data = rt.String_getJSString(buffer) + (n ? n : '');
                if (data.includes('<!DOCTYPE HTML>')) {
                    WifiSimulator.server.sendDataToCurrentClient(data, 'sentAll');
                } else {
                    WifiSimulator.server.sendDataToCurrentClient(data, 'sent');
                }
                return rt.val(rt.intTypeLiteral, data.length);
            };
            const print = (rt, _this, buffer) => _write(rt, buffer);
            rt.regFunc(print, WiFiClient_t, "print", [rt.String_t], rt.intTypeLiteral);
            rt.regFunc(print, WiFiClient_t, "print", [rt.arrayPointerType(rt.charTypeLiteral)], rt.intTypeLiteral);

            const println = (rt, _this, buffer) => _write(rt, buffer, '\n');
            rt.regFunc(println, WiFiClient_t, "println", [rt.String_t], rt.intTypeLiteral);
            rt.regFunc(print, WiFiClient_t, "println", [rt.arrayPointerType(rt.charTypeLiteral)], rt.intTypeLiteral);
        }
    },
    "WiFiS3.h": {
        load: function (rt) {
            rt.include('WiFi.h');
            rt.include('WiFiServer.h');
            rt.include('WiFiClient.h');
            rt.defVar("WIFI_FIRMWARE_LATEST_VERSION", rt.String_t, rt.String_makeValueFromJSString("0.5.2"));
        }
    },
    "Vittascience_Server.h": {
        load: function (rt) {

            const COMMANDS = {
                "CMD_RECEIVE_SIMPLE_DATA": rt.val(rt.unsignedcharTypeLiteral, 0),
                "CMD_RECEIVE_SIMPLE_IP": rt.val(rt.unsignedcharTypeLiteral, 1),
                "CMD_RECEIVE_OBJ_VALUE": rt.val(rt.unsignedcharTypeLiteral, 2),

                "CMD_SEND_SIMPLE_DATA": rt.val(rt.unsignedcharTypeLiteral, 3),
                "CMD_SEND_WEB_PAGE": rt.val(rt.unsignedcharTypeLiteral, 4),
                "CMD_SEND_VARIABLES": rt.val(rt.unsignedcharTypeLiteral, 5),

                "CMD_CLIENT_RECEIVER": rt.val(rt.unsignedcharTypeLiteral, 0),
                "CMD_CLIENT_TRANSMITTER": rt.val(rt.unsignedcharTypeLiteral, 1),

                "MAX_PARTS": rt.val(rt.unsignedcharTypeLiteral, 10)
            };
            for (const c in COMMANDS) {
                rt.defVar(c, COMMANDS[c].t, COMMANDS[c]);
            }

            const IPAddress_t = { name: 'IPAddress', type: 'class' };
            const Serial_println = function (rt, str) {
                const Serial = rt.readVar('Serial');
                return rt.getFunc(Serial.t, 'println', ['?'])(rt, Serial, rt.String_makeValueFromJSString(str));
            };

            // server
            const WiFiServer_t = { name: 'WiFiServer', type: 'class' };
            const WiFiServer = function (port) {
                return rt.getFunc("global", "WiFiServer", [rt.unsignedintTypeLiteral])(rt, {}, rt.val(rt.unsignedintTypeLiteral, port));
            };
            const server_do = function (rt, _this, action, args) {
                const types = args.map(arg => arg.t);
                return rt.getFunc(WiFiServer_t, action, types)(rt, _this.v.members.server, ...args);
            };

            // client
            const WiFiClient_t = { name: 'WiFiClient', type: 'class' };
            const WiFiClient = function () {
                return rt.getFunc("global", "WiFiClient", [])(rt, {});
            };
            const client_do = function (rt, _this, action, args) {
                const types = args.map(arg => arg.t);
                return rt.getFunc(WiFiClient_t, action, types)(rt, _this.v.members.client, ...args);
            };

            // Vittascience_Server constructor
            const Vittascience_Server_t = rt.newClass("Vittascience_Server", [{
                type: WiFiServer_t,
                name: "server",
                initialize(rt, _this) { return WiFiServer(0) }
            }, {
                type: WiFiClient_t,
                name: "client",
                initialize(rt, _this) { return WiFiClient() }
            }, {
                type: rt.String_t,
                name: "client_ip",
                initialize(rt, _this) { return rt.String_makeValueFromJSString("") }
            }, {
                type: rt.String_t,
                name: "client_data",
                initialize(rt, _this) { return rt.String_makeValueFromJSString("") }
            }, {
                type: rt.boolTypeLiteral,
                name: "locked",
                initialize(rt, _this) { return rt.val(rt.boolTypeLiteral, false) }
            }, {
                type: rt.boolTypeLiteral,
                name: "with_vars",
                initialize(rt, _this) { return rt.val(rt.boolTypeLiteral, false) }
            }, {
                type: rt.String_t,
                name: "html_page",
                initialize(rt, _this) { return rt.String_makeValueFromJSString("", true) }
            }, {
                type: rt.arrayPointerType(rt.charTypeLiteral),
                name: "_js",
                initialize(rt, _this) { return rt.nullPointerValue }
            }, {
                type: rt.arrayPointerType(rt.charTypeLiteral),
                name: "_css",
                initialize(rt, _this) { return rt.nullPointerValue }
            }]);

            rt.regFunc(function (rt, _this, port) {
                return {
                    t: Vittascience_Server_t,
                    v: {
                        members: {
                            server: WiFiServer(port.v),
                            client: WiFiClient(),
                            client_ip: rt.String_makeValueFromJSString(""),
                            client_data: rt.String_makeValueFromJSString(""),
                            locked: rt.val(rt.boolTypeLiteral, false),
                            with_vars: rt.val(rt.boolTypeLiteral, false),
                            html_page: rt.String_makeValueFromJSString(""),
                            _js: rt.nullPointerValue,
                            _css: rt.nullPointerValue
                        }
                    },
                    left: false
                }
            }, "global", "Vittascience_Server", [rt.unsignedintTypeLiteral], Vittascience_Server_t);

            // members
            rt.regFunc(function (rt, _this) {
                server_do(rt, _this, 'begin', []);
                return rt.val(rt.boolTypeLiteral, true);
            }, Vittascience_Server_t, "start", [], rt.boolTypeLiteral);

            const _sendHTTPSocket = function (rt, _this, type, data) {
                const typeStr = Simulator.getStringFromInterpretor(mimeFromExt(rt, {}, type));
                client_do(rt, _this, 'println', [rt.String_makeValueFromJSString("HTTP/1.1 200 OK")]);
                client_do(rt, _this, 'print', [rt.String_makeValueFromJSString("Content-Type: ")]);
                client_do(rt, _this, 'println', [rt.String_makeValueFromJSString(typeStr)]);
                client_do(rt, _this, 'println', [rt.String_makeValueFromJSString("Connection: close")]);
                client_do(rt, _this, 'println', [rt.String_makeValueFromJSString("")]);
                client_do(rt, _this, 'print', [data]);
            };
            rt.regFunc(_sendHTTPSocket, Vittascience_Server_t, "_sendHTTPSocket", [rt.arrayPointerType(rt.charTypeLiteral), rt.String_t], rt.voidTypeLiteral);

            const client_data_split = (_this, str) => rt.String_getJSString(_this.v.members.client_data).split(str);

            const getClientData = async function (rt, _this, parameter) {
                await manageSocket(rt, _this, COMMANDS["CMD_RECEIVE_SIMPLE_DATA"]);
                if (parameter.v && rt.getFunc(rt.String_t, "length", [])(rt, _this.v.members.client_ip).v > 0) {
                    const parts = client_data_split(_this, "GET /");
                    const data = parts[1].split(" HTTP/1.1")[0];
                    return rt.String_makeValueFromJSString(data);
                }
                return _this.v.members.client_data;
            };
            const Susp_getClientData = function (rt, _this, parameter = rt.val(rt.boolTypeLiteral, false)) {
                return rt.asyncToSuspension(getClientData, [rt, _this, parameter]);
            };
            rt.regAsyncFunc(Susp_getClientData, getClientData);
            rt.regFunc(Susp_getClientData, Vittascience_Server_t, "getClientData", [rt.boolTypeLiteral], rt.String_t, [rt.boolTypeLiteral]);

            const getClientIP = async function (rt, _this) {
                if (rt.getFunc(rt.String_t, "length", [])(rt, _this.v.members.client_ip).v == 0) {
                    await manageSocket(rt, _this, COMMANDS["CMD_RECEIVE_SIMPLE_IP"]);
                }
                return _this.v.members.client_ip;
            };
            const Susp_getClientIP = function (rt, _this) {
                return rt.asyncToSuspension(getClientIP, [rt, _this]);
            };
            rt.regAsyncFunc(Susp_getClientIP, getClientIP);
            rt.regFunc(Susp_getClientIP, Vittascience_Server_t, "getClientIP", [], rt.String_t);

            const sendDataToClient = async function (rt, _this, data) {
                await manageSocket(rt, _this, COMMANDS["CMD_SEND_SIMPLE_DATA"], data);
            };
            const Susp_sendDataToClient = function (rt, _this, data) {
                return rt.asyncToSuspension(sendDataToClient, [rt, _this, data]);
            };
            rt.regAsyncFunc(Susp_sendDataToClient, sendDataToClient);
            rt.regFunc(Susp_sendDataToClient, Vittascience_Server_t, "sendDataToClient", [rt.String_t], rt.voidTypeLiteral);

            const closeClient = function (rt, _this, force = rt.val(rt.boolTypeLiteral, false)) {
                if (client_do(rt, _this, 'connected', []).v && (_this.v.members.locked.v || force.v)) {
                    client_do(rt, _this, 'stop', []);
                    _this.v.members.locked.v = false;
                    Serial_println(rt, "Client: " + rt.String_getJSString(_this.v.members.client_ip) + " closed.");
                    _this.v.members.client_ip = rt.String_makeValueFromJSString("");
                }
            }
            rt.regFunc(closeClient, Vittascience_Server_t, "closeClient", [rt.boolTypeLiteral], rt.voidTypeLiteral, [rt.boolTypeLiteral]);

            const manageSocket = async function (rt, _this, cmd, data = rt.String_makeValueFromJSString("")) {

                while (!client_do(rt, _this, 'connected', []).v) {
                    if (Simulator.stop_flag) {
                        break;
                    }
                    _this.v.members.client = server_do(rt, _this, 'available', []);
                    if (_this.v.members.client.v && client_do(rt, _this, 'connected', []).v) {
                        client_do(rt, _this, 'setTimeout', [rt.val(rt.intTypeLiteral, 100)]);
                        const ip = client_do(rt, _this, 'remoteIP', []);
                        _this.v.members.client_ip = rt.getFunc(IPAddress_t, "toStringCPP", [])(rt, ip);
                        Serial_println(rt, "New client connection: " + rt.String_getJSString(_this.v.members.client_ip));
                    }
                    await Simulator.sleep_ms(100);
                }

                if (_this.v.members.client.v && client_do(rt, _this, 'connected', []).v) {

                    if (cmd == COMMANDS["CMD_RECEIVE_SIMPLE_DATA"])
                        Serial_println(rt, "Command requested: CMD_RECEIVE_SIMPLE_DATA");
                    else if (cmd == COMMANDS["CMD_RECEIVE_SIMPLE_IP"])
                        Serial_println(rt, "Command requested: CMD_RECEIVE_SIMPLE_IP");
                    else if (cmd == COMMANDS["CMD_RECEIVE_OBJ_VALUE"])
                        Serial_println(rt, "Command requested: CMD_RECEIVE_OBJ_VALUE");

                    else if (cmd == COMMANDS["CMD_SEND_SIMPLE_DATA"])
                        Serial_println(rt, "Command requested: CMD_SEND_SIMPLE_DATA");
                    else if (cmd == COMMANDS["CMD_SEND_WEB_PAGE"])
                        Serial_println(rt, "Command requested: CMD_SEND_WEB_PAGE");
                    else if (cmd == COMMANDS["CMD_SEND_VARIABLES"])
                        Serial_println(rt, "Command requested: CMD_SEND_VARIABLES");

                    if (cmd == COMMANDS["CMD_RECEIVE_SIMPLE_IP"]) {
                        return;
                    }

                    const available = rt.getFunc(WiFiClient_t, 'available', []);
                    if ((await rt.getAsyncFunc(available)(rt, _this.v.members.client)).v) {
                        const readString = rt.getFunc(WiFiClient_t, 'readString', []);
                        _this.v.members.client_data = await rt.getAsyncFunc(readString)(rt, _this.v.members.client);
                        const len = rt.getFunc(rt.String_t, "length", [])(rt, _this.v.members.client_data).v;
                        Serial_println(rt, "Data received length: " + len);
                    }

                    if (rt.getFunc(rt.String_t, "length", [])(rt, _this.v.members.client_data).v > 0) {

                        const client_data_indexOf = (str) => rt.String_getJSString(_this.v.members.client_data).indexOf(str);
                        if (client_data_indexOf("GET / HTTP/") >= 0 || client_data_indexOf("GET /favicon.ico HTTP/") >= 0) {

                            if (!_this.v.members.locked.v && cmd == COMMANDS["CMD_SEND_WEB_PAGE"]) {
                                _this.v.members.locked.v = true;
                                const css = rt.String_makeValueFromJSString(Simulator.getStringFromInterpretor(_this.v.members._css));
                                const js = rt.String_makeValueFromJSString(Simulator.getStringFromInterpretor(_this.v.members._js));
                                addCodeIntoHtml(rt, _this, css, rt.charArray_makeFromJSString("css"));
                                addCodeIntoHtml(rt, _this, js, rt.charArray_makeFromJSString("js"));

                                if (_this.v.members.with_vars.v) {
                                    const ipStr = rt.String_getJSString(_this.v.members.client_ip);
                                    const jsStr = "requestVariablesFromServer('" + ipStr + "');\n";
                                    const requestVars = rt.String_makeValueFromJSString(jsStr);
                                    addCodeIntoHtml(rt, _this, requestVars, rt.charArray_makeFromJSString("js"));
                                }
                                _sendHTTPSocket(rt, _this, rt.charArray_makeFromJSString("html"), _this.v.members.html_page);
                            }

                            else if (!_this.v.members.locked.v && cmd == COMMANDS["CMD_SEND_SIMPLE_DATA"] && Simulator.getStringFromInterpretor(data).length > 0) {
                                _this.v.members.locked.v = true;
                                client_do(rt, _this, 'print', [data]);
                            }
                        }

                        else if (client_data_indexOf("GET /requestVariables&") < 0 && client_data_indexOf("GET /") >= 0 && client_data_indexOf(" HTTP/") >= 0) {

                            if (!_this.v.members.locked.locked && cmd == COMMANDS["CMD_RECEIVE_OBJ_VALUE"]) {
                                let parts = client_data_split(_this, " HTTP");
                                if (parts[0].length > 0 && parts[0].indexOf("=") >= 0) {
                                    parts = parts[0].split("GET /");
                                    parts = parts[1].split("=");
                                    const id = parts[0];
                                    if (id.length > 0) {
                                        _this.v.members.locked.v = true;
                                        _updateDBclientData(id, parts[1]);
                                        _sendHTTPSocket(rt, _this, rt.charArray_makeFromJSString("text"), rt.String_makeValueFromJSString("OK\n"));
                                    }
                                }
                            }
                        }

                        else if (!_this.v.members.locked.v && client_data_indexOf("GET /requestVariables&") >= 0 && cmd == COMMANDS["CMD_SEND_VARIABLES"]) {
                            let parts = client_data_split(_this, " HTTP");
                            const strRequest = parts[0];
                            parts = strRequest.split("&ip=");
                            const requestIp = parts[1];
                            if (rt.String_getJSString(_this.v.members.client_ip) == requestIp) {
                                _this.v.members.locked.v = true;
                                _sendHTTPSocket(rt, _this, rt.charArray_makeFromJSString("json"), data);
                            }
                        }

                        else if (client_data_indexOf("GET / HTTP/") < 0 && client_data_indexOf("GET /favicon.ico HTTP/") < 0 && client_data_indexOf("GET /requestVariables&") < 0) {
                            if (!_this.v.members.locked.v && (cmd == COMMANDS["CMD_SEND_SIMPLE_DATA"] || cmd == COMMANDS["CMD_RECEIVE_SIMPLE_DATA"])) {

                                const isJson = client_data_indexOf('{') >= 0 && client_data_indexOf('}') >= 0 && client_data_indexOf(':') >= 0;
                                if (isJson && _JSON_parse(rt.String_getJSString(_this.v.members.client_data.v))) {
                                    rt.include("ArduinoJson.h"); // TO DO (temp)
                                    // TO DO
                                    if (_json_data_received["cmd"] == COMMANDS["CMD_CLIENT_RECEIVER"]) {
                                        _this.v.members.client_data = rt.String_makeValueFromJSString("");
                                        if (cmd == COMMANDS["CMD_SEND_SIMPLE_DATA"] && Simulator.getStringFromInterpretor(data).length > 0) {
                                            _this.v.members.locked.v = true;
                                            client_do(rt, _this, 'print', [data]);
                                        }
                                    } else if (_json_data_received["cmd"] == COMMANDS["CMD_CLIENT_TRANSMITTER"]) {
                                        //_this.v.members.client_data.v = _json_data_received["data"].as < String > ();
                                        client_do(rt, _this, 'print', [rt.String_makeValueFromJSString("OK\n")]);
                                    }
                                    //_json_data_received = DynamicJsonDocument(0);
                                };
                            }
                        }
                    }
                }
            };

            const Susp_manageSocket = function (rt, _this, cmd, data) {
                return rt.asyncToSuspension(manageSocket, [rt, _this, cmd, data]);
            };
            rt.regAsyncFunc(Susp_manageSocket, manageSocket);
            rt.regFunc(Susp_manageSocket, Vittascience_Server_t, "manageSocket", [rt.unsignedcharTypeLiteral, rt.String_t], rt.voidTypeLiteral, [rt.String_t]);

            const sendHtmlPage = async function (rt, _this, wvs) {
                _this.v.members.with_vars = wvs;
                await manageSocket(rt, _this, COMMANDS["CMD_SEND_WEB_PAGE"]);
            };
            const Susp_sendHtmlPage = function (rt, _this, wvs) {
                return rt.asyncToSuspension(sendHtmlPage, [rt, _this, wvs]);
            };
            rt.regAsyncFunc(Susp_sendHtmlPage, sendHtmlPage);
            rt.regFunc(Susp_sendHtmlPage, Vittascience_Server_t, "sendHtmlPage", [rt.boolTypeLiteral], rt.intTypeLiteral);

            const addCodeIntoHtml = function (rt, _this, script_code, type) {
                const page = rt.String_getJSString(_this.v.members.html_page);
                const html_page_indexOf = (str) => page.indexOf(str);
                const html_replace = (match, str) => {
                    _this.v.members.html_page = rt.String_makeValueFromJSString(page.replace(match, str));
                }
                script_code = rt.String_getJSString(script_code)
                if (rt.charArray_getJSString(type) == "js") {
                    if (html_page_indexOf("<script>") >= 0) {
                        html_replace("</script>", script_code + "\n</script>");
                    } else {
                        html_replace("</body>", "<script>\n" + script_code + "\n</script>\n</body>");
                    }
                } else if (rt.charArray_getJSString(type) == "css") {
                    if (html_page_indexOf("<style>") >= 0) {
                        html_replace("</style>", script_code + "\n</style>");
                    } else {
                        html_replace("</head>", "<style>\n" + script_code + "\n</style>\n</head>");
                    }
                } else {
                    Serial_println(rt, "Type of data '" + rt.charArray_getJSString(type) + "' is not valid. Only 'js' or 'css'.");
                }
            };
            rt.regFunc(addCodeIntoHtml, Vittascience_Server_t, "addCodeIntoHtml", [rt.String_t, rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, code) {
                _this.v.members._js = code;
            }, Vittascience_Server_t, "setJSFile", [rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

            rt.regFunc(function (rt, _this, code) {
                _this.v.members._css = code;
            }, Vittascience_Server_t, "setCSSFile", [rt.arrayPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);


            const _updateDBclientData = function (rt, _this, id, value) {
                rt.include("ArduinoJson.h"); // TO DO (temp)
                // if (web_data_DB.overflowed()) {
                //     Serial.println(F("⚠️ ArduinoJson overflow: augmente StaticJsonDocument<...>"));
                // }
                // JsonObject DB_client = web_data_DB[client_ip].as < JsonObject > ();
                // if (DB_client.isNull()) {
                //     DB_client = web_data_DB[client_ip].to < JsonObject > ();
                // }
                // DB_client[id] = value;
            };
            rt.regFunc(_updateDBclientData, Vittascience_Server_t, "_updateDBclientData", [rt.String_t, rt.String_t], rt.voidTypeLiteral);

            const getValueById = async function (rt, _this, id, defaultValue) {
                await manageSocket(rt, _this, COMMANDS["CMD_RECEIVE_OBJ_VALUE"]);
                if (rt.getFunc(rt.String_t, "length", [])(rt, _this.v.members.client_ip).v > 0) {
                    rt.include("ArduinoJson.h") // TO DO (temp)
                    // serializeJsonPretty(_this.v.members.web_data_DB.v, Serial);
                    // JsonObject DB_client = web_data_DB[client_ip].as < JsonObject > ();
                    // if (DB_client.isNull()) {
                    //     DB_client = web_data_DB[client_ip].to < JsonObject > ();
                    // }
                    // if (!DB_client.containsKey(id)) {
                    //     _updateDBclientData(id, String(defaultValue));
                    // }
                    // return DB_client[id].as < String > ();
                }
                return rt.String_makeValueFromJSString("");
            };

            const Susp_getValueById = function (rt, _this, id, defaultValue = rt.val(rt.intTypeLiteral, 0)) {
                return rt.asyncToSuspension(getValueById, [rt, _this, id, defaultValue]);
            };
            rt.regAsyncFunc(Susp_getValueById, getValueById);
            rt.regFunc(Susp_getValueById, Vittascience_Server_t, "getValueById", [rt.String_t, rt.intTypeLiteral], rt.String_t, [rt.intTypeLiteral]);

            const mimeFromExt = function (rt, _this, ext) {
                const pchar = rt.arrayPointerType(rt.charTypeLiteral);
                const strcmp = (type) => rt.getFunc("global", "strcmp", [pchar, pchar])(rt, {}, ext, rt.charArray_makeFromJSString(type)).v;
                if (!rt.charArray_getJSString(ext))
                    return rt.charArray_makeFromJSString("text/plain; charset=utf-8");
                if (!strcmp("html"))
                    return rt.charArray_makeFromJSString("text/html; charset=utf-8");
                if (!strcmp("css"))
                    return rt.charArray_makeFromJSString("text/css; charset=utf-8");
                if (!strcmp("js"))
                    return rt.charArray_makeFromJSString("application/javascript; charset=utf-8");
                if (!strcmp("json"))
                    return rt.charArray_makeFromJSString("application/json; charset=utf-8");
                return rt.charArray_makeFromJSString("text/plain; charset=utf-8");
            };
            rt.regFunc(mimeFromExt, "global", "mimeFromExt", [rt.arrayPointerType(rt.charTypeLiteral)], rt.arrayPointerType(rt.charTypeLiteral));
        }
    },
    "WebPageScripts.h": {
        load: function (rt) {
            let js = "", css = "";
            if (Blockly && Blockly.Arduino) {
                js = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.jsCodes_).join('\n');
                css = Blockly.Arduino.convertObjectInLists(Blockly.Arduino.cssStyles_).join('\n');
            }
            rt.defVar("web_page_js", rt.arrayPointerType(rt.charTypeLiteral), rt.charArray_makeFromJSString(js));
            rt.defVar("web_page_css", rt.arrayPointerType(rt.charTypeLiteral), rt.charArray_makeFromJSString(css));
        }
    },
    "ArduinoJson.H": {
        load: function (rt) {
            // TO DO
        }
    },
    "U8g2lib.h": {
        load: function (rt) {

            const u8g2_font_6x10_tf = {
                ' ': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '!': [0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x04, 0x00, 0x00],
                '"': [0x00, 0x0a, 0x0a, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '#': [0x00, 0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a, 0x00, 0x00],
                '$': [0x00, 0x04, 0x0e, 0x05, 0x0e, 0x14, 0x0e, 0x04, 0x00, 0x00],
                '%': [0x00, 0x12, 0x15, 0x0a, 0x04, 0x0a, 0x15, 0x09, 0x00, 0x00],
                '&': [0x00, 0x02, 0x05, 0x05, 0x02, 0x15, 0x09, 0x16, 0x00, 0x00],
                '\'': [0x00, 0x04, 0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '(': [0x00, 0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08, 0x00, 0x00],
                ')': [0x00, 0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02, 0x00, 0x00],
                '*': [0x00, 0x00, 0x11, 0x0a, 0x1f, 0x0a, 0x11, 0x00, 0x00, 0x00],
                '+': [0x00, 0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x00, 0x00, 0x00],
                ',': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0c, 0x04, 0x02, 0x00],
                '-': [0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00],
                '.': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x0e, 0x04, 0x00],
                '/': [0x00, 0x10, 0x10, 0x08, 0x04, 0x02, 0x01, 0x01, 0x00, 0x00],
                '0': [0x00, 0x04, 0x0a, 0x11, 0x11, 0x11, 0x0a, 0x04, 0x00, 0x00],
                '1': [0x00, 0x04, 0x06, 0x05, 0x04, 0x04, 0x04, 0x1f, 0x00, 0x00],
                '2': [0x00, 0x0e, 0x11, 0x10, 0x0c, 0x02, 0x01, 0x1f, 0x00, 0x00],
                '3': [0x00, 0x1f, 0x10, 0x08, 0x0c, 0x10, 0x11, 0x0e, 0x00, 0x00],
                '4': [0x00, 0x08, 0x0c, 0x0a, 0x09, 0x1f, 0x08, 0x08, 0x00, 0x00],
                '5': [0x00, 0x1f, 0x01, 0x0d, 0x13, 0x10, 0x11, 0x0e, 0x00, 0x00],
                '6': [0x00, 0x0c, 0x02, 0x01, 0x0d, 0x13, 0x11, 0x0e, 0x00, 0x00],
                '7': [0x00, 0x1f, 0x10, 0x08, 0x08, 0x04, 0x02, 0x02, 0x00, 0x00],
                '8': [0x00, 0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '9': [0x00, 0x0e, 0x11, 0x19, 0x16, 0x10, 0x08, 0x06, 0x00, 0x00],
                ':': [0x00, 0x00, 0x04, 0x0e, 0x04, 0x00, 0x04, 0x0e, 0x04, 0x00],
                ';': [0x00, 0x00, 0x04, 0x0e, 0x04, 0x00, 0x0c, 0x04, 0x02, 0x00],
                '<': [0x00, 0x10, 0x08, 0x04, 0x02, 0x04, 0x08, 0x10, 0x00, 0x00],
                '=': [0x00, 0x00, 0x00, 0x1f, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00],
                '>': [0x00, 0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00],
                '?': [0x00, 0x0e, 0x11, 0x08, 0x04, 0x04, 0x00, 0x04, 0x00, 0x00],
                '@': [0x00, 0x0e, 0x11, 0x19, 0x15, 0x0d, 0x01, 0x0e, 0x00, 0x00],
                'A': [0x00, 0x04, 0x0a, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                'B': [0x00, 0x0f, 0x12, 0x12, 0x0e, 0x12, 0x12, 0x0f, 0x00, 0x00],
                'C': [0x00, 0x0e, 0x11, 0x01, 0x01, 0x01, 0x11, 0x0e, 0x00, 0x00],
                'D': [0x00, 0x0f, 0x12, 0x12, 0x12, 0x12, 0x12, 0x0f, 0x00, 0x00],
                'E': [0x00, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x1f, 0x00, 0x00],
                'F': [0x00, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00],
                'G': [0x00, 0x0e, 0x11, 0x01, 0x01, 0x19, 0x11, 0x0e, 0x00, 0x00],
                'H': [0x00, 0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11, 0x00, 0x00],
                'I': [0x00, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                'J': [0x00, 0x1c, 0x08, 0x08, 0x08, 0x08, 0x09, 0x06, 0x00, 0x00],
                'K': [0x00, 0x11, 0x09, 0x05, 0x03, 0x05, 0x09, 0x11, 0x00, 0x00],
                'L': [0x00, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x1f, 0x00, 0x00],
                'M': [0x00, 0x11, 0x11, 0x1b, 0x15, 0x11, 0x11, 0x11, 0x00, 0x00],
                'N': [0x00, 0x11, 0x11, 0x13, 0x15, 0x19, 0x11, 0x11, 0x00, 0x00],
                'O': [0x00, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                'P': [0x00, 0x0f, 0x11, 0x11, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00],
                'Q': [0x00, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x15, 0x0e, 0x10, 0x00],
                'R': [0x00, 0x0f, 0x11, 0x11, 0x0f, 0x05, 0x09, 0x11, 0x00, 0x00],
                'S': [0x00, 0x0e, 0x11, 0x01, 0x0e, 0x10, 0x11, 0x0e, 0x00, 0x00],
                'T': [0x00, 0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00],
                'U': [0x00, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                'V': [0x00, 0x11, 0x11, 0x11, 0x0a, 0x0a, 0x0a, 0x04, 0x00, 0x00],
                'W': [0x00, 0x11, 0x11, 0x11, 0x15, 0x15, 0x1b, 0x11, 0x00, 0x00],
                'X': [0x00, 0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11, 0x00, 0x00],
                'Y': [0x00, 0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00],
                'Z': [0x00, 0x1f, 0x10, 0x08, 0x04, 0x02, 0x01, 0x1f, 0x00, 0x00],
                '[': [0x00, 0x0e, 0x02, 0x02, 0x02, 0x02, 0x02, 0x0e, 0x00, 0x00],
                '\\': [0x00, 0x01, 0x01, 0x02, 0x04, 0x08, 0x10, 0x10, 0x00, 0x00],
                ']': [0x00, 0x0e, 0x08, 0x08, 0x08, 0x08, 0x08, 0x0e, 0x00, 0x00],
                '^': [0x00, 0x04, 0x0a, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '_': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00],
                '`': [0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                'a': [0x00, 0x00, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                'b': [0x00, 0x01, 0x01, 0x0d, 0x13, 0x11, 0x13, 0x0d, 0x00, 0x00],
                'c': [0x00, 0x00, 0x00, 0x0e, 0x11, 0x01, 0x11, 0x0e, 0x00, 0x00],
                'd': [0x00, 0x10, 0x10, 0x16, 0x19, 0x11, 0x19, 0x16, 0x00, 0x00],
                'e': [0x00, 0x00, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00],
                'f': [0x00, 0x0c, 0x12, 0x02, 0x0f, 0x02, 0x02, 0x02, 0x00, 0x00],
                'g': [0x00, 0x00, 0x00, 0x1e, 0x11, 0x11, 0x1e, 0x10, 0x11, 0x0e],
                'h': [0x00, 0x01, 0x01, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00],
                'i': [0x00, 0x04, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                'j': [0x00, 0x10, 0x00, 0x18, 0x10, 0x10, 0x10, 0x12, 0x12, 0x0c],
                'k': [0x00, 0x01, 0x01, 0x11, 0x09, 0x07, 0x09, 0x11, 0x00, 0x00],
                'l': [0x00, 0x06, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                'm': [0x00, 0x00, 0x00, 0x0b, 0x15, 0x15, 0x15, 0x11, 0x00, 0x00],
                'n': [0x00, 0x00, 0x00, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00],
                'o': [0x00, 0x00, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                'p': [0x00, 0x00, 0x00, 0x0d, 0x13, 0x11, 0x13, 0x0d, 0x01, 0x01],
                'q': [0x00, 0x00, 0x00, 0x16, 0x19, 0x11, 0x19, 0x16, 0x10, 0x10],
                'r': [0x00, 0x00, 0x00, 0x0d, 0x13, 0x01, 0x01, 0x01, 0x00, 0x00],
                's': [0x00, 0x00, 0x00, 0x0e, 0x01, 0x0e, 0x10, 0x0f, 0x00, 0x00],
                't': [0x00, 0x02, 0x02, 0x0f, 0x02, 0x02, 0x12, 0x0c, 0x00, 0x00],
                'u': [0x00, 0x00, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00],
                'v': [0x00, 0x00, 0x00, 0x11, 0x11, 0x0a, 0x0a, 0x04, 0x00, 0x00],
                'w': [0x00, 0x00, 0x00, 0x11, 0x11, 0x15, 0x15, 0x0a, 0x00, 0x00],
                'x': [0x00, 0x00, 0x00, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x00, 0x00],
                'y': [0x00, 0x00, 0x00, 0x11, 0x11, 0x19, 0x16, 0x10, 0x11, 0x0e],
                'z': [0x00, 0x00, 0x00, 0x1f, 0x08, 0x04, 0x02, 0x1f, 0x00, 0x00],
                '{': [0x00, 0x18, 0x04, 0x08, 0x06, 0x08, 0x04, 0x18, 0x00, 0x00],
                '|': [0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00],
                '}': [0x00, 0x06, 0x08, 0x04, 0x18, 0x04, 0x08, 0x06, 0x00, 0x00],
                '~': [0x00, 0x12, 0x15, 0x09, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00a0': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00a1': [0x00, 0x04, 0x00, 0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x00],
                '\u00a2': [0x00, 0x00, 0x04, 0x1e, 0x05, 0x05, 0x05, 0x1e, 0x04, 0x00],
                '\u00a3': [0x00, 0x0c, 0x12, 0x02, 0x07, 0x02, 0x12, 0x0d, 0x00, 0x00],
                '\u00a4': [0x00, 0x00, 0x00, 0x11, 0x0e, 0x0a, 0x0e, 0x11, 0x00, 0x00],
                '\u00a5': [0x00, 0x11, 0x11, 0x0a, 0x04, 0x1f, 0x04, 0x04, 0x04, 0x00],
                '\u00a6': [0x00, 0x04, 0x04, 0x04, 0x00, 0x04, 0x04, 0x04, 0x00, 0x00],
                '\u00a7': [0x00, 0x0e, 0x01, 0x07, 0x09, 0x12, 0x1c, 0x10, 0x0e, 0x00],
                '\u00a8': [0x0a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00a9': [0x00, 0x0e, 0x11, 0x15, 0x13, 0x15, 0x11, 0x0e, 0x00, 0x00],
                '\u00aa': [0x00, 0x1c, 0x12, 0x1a, 0x14, 0x00, 0x1e, 0x00, 0x00, 0x00],
                '\u00ab': [0x00, 0x00, 0x00, 0x24, 0x12, 0x09, 0x12, 0x24, 0x00, 0x00],
                '\u00ac': [0x00, 0x00, 0x00, 0x00, 0x1e, 0x10, 0x00, 0x00, 0x00, 0x00],
                '\u00ad': [0x00, 0x00, 0x00, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00ae': [0x00, 0x0e, 0x11, 0x17, 0x13, 0x13, 0x11, 0x0e, 0x00, 0x00],
                '\u00af': [0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b0': [0x00, 0x04, 0x0a, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b1': [0x00, 0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x1f, 0x00, 0x00],
                '\u00b2': [0x0c, 0x12, 0x08, 0x04, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b3': [0x0e, 0x10, 0x0c, 0x10, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b4': [0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b5': [0x00, 0x00, 0x00, 0x11, 0x11, 0x11, 0x13, 0x0d, 0x01, 0x00],
                '\u00b6': [0x00, 0x1e, 0x17, 0x17, 0x16, 0x14, 0x14, 0x14, 0x00, 0x00],
                '\u00b7': [0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00b8': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x04],
                '\u00b9': [0x04, 0x06, 0x04, 0x04, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00],
                '\u00ba': [0x00, 0x0c, 0x12, 0x12, 0x0c, 0x00, 0x1e, 0x00, 0x00, 0x00],
                '\u00bb': [0x00, 0x00, 0x00, 0x09, 0x12, 0x24, 0x12, 0x09, 0x00, 0x00],
                '\u00bc': [0x02, 0x03, 0x02, 0x02, 0x27, 0x30, 0x28, 0x3c, 0x20, 0x00],
                '\u00bd': [0x02, 0x03, 0x02, 0x02, 0x17, 0x28, 0x20, 0x10, 0x38, 0x00],
                '\u00be': [0x03, 0x04, 0x02, 0x04, 0x13, 0x18, 0x14, 0x1e, 0x10, 0x00],
                '\u00bf': [0x00, 0x04, 0x00, 0x04, 0x04, 0x02, 0x11, 0x0e, 0x00, 0x00],
                '\u00c0': [0x02, 0x04, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c1': [0x08, 0x04, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c2': [0x04, 0x0a, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c3': [0x12, 0x0d, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c4': [0x0a, 0x00, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c5': [0x04, 0x0a, 0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x00, 0x00],
                '\u00c6': [0x00, 0x3c, 0x0a, 0x09, 0x39, 0x0f, 0x09, 0x39, 0x00, 0x00],
                '\u00c7': [0x00, 0x0e, 0x11, 0x01, 0x01, 0x01, 0x11, 0x0e, 0x04, 0x02],
                '\u00c8': [0x02, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x1f, 0x00, 0x00],
                '\u00c9': [0x08, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x1f, 0x00, 0x00],
                '\u00ca': [0x04, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x1f, 0x00, 0x00],
                '\u00cb': [0x0a, 0x1f, 0x01, 0x01, 0x0f, 0x01, 0x01, 0x1f, 0x00, 0x00],
                '\u00cc': [0x02, 0x04, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00cd': [0x08, 0x04, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00ce': [0x04, 0x0a, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00cf': [0x0a, 0x00, 0x0e, 0x04, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00d0': [0x00, 0x0f, 0x12, 0x12, 0x17, 0x12, 0x12, 0x0f, 0x00, 0x00],
                '\u00d1': [0x14, 0x0a, 0x11, 0x13, 0x15, 0x19, 0x11, 0x11, 0x00, 0x00],
                '\u00d2': [0x02, 0x04, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00d3': [0x08, 0x04, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00d4': [0x04, 0x0a, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00d5': [0x14, 0x0a, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00d6': [0x0a, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00d7': [0x00, 0x00, 0x00, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x00, 0x00],
                '\u00d8': [0x00, 0x0e, 0x19, 0x19, 0x15, 0x13, 0x13, 0x0e, 0x00, 0x00],
                '\u00d9': [0x02, 0x04, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00da': [0x08, 0x04, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00db': [0x04, 0x0a, 0x00, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00dc': [0x0a, 0x00, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00dd': [0x08, 0x04, 0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x00, 0x00],
                '\u00de': [0x00, 0x01, 0x0f, 0x11, 0x0f, 0x01, 0x01, 0x01, 0x00, 0x00],
                '\u00df': [0x00, 0x0e, 0x11, 0x09, 0x05, 0x09, 0x11, 0x0d, 0x00, 0x00],
                '\u00e0': [0x02, 0x04, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e1': [0x08, 0x04, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e2': [0x04, 0x0a, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e3': [0x14, 0x0a, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e4': [0x00, 0x0a, 0x00, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e5': [0x04, 0x0a, 0x04, 0x0e, 0x10, 0x1e, 0x11, 0x1e, 0x00, 0x00],
                '\u00e6': [0x00, 0x00, 0x00, 0x1e, 0x28, 0x3e, 0x09, 0x3e, 0x00, 0x00],
                '\u00e7': [0x00, 0x00, 0x00, 0x0e, 0x11, 0x01, 0x11, 0x0e, 0x04, 0x02],
                '\u00e8': [0x02, 0x04, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00],
                '\u00e9': [0x08, 0x04, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00],
                '\u00ea': [0x04, 0x0a, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00],
                '\u00eb': [0x00, 0x0a, 0x00, 0x0e, 0x11, 0x1f, 0x01, 0x0e, 0x00, 0x00],
                '\u00ec': [0x02, 0x04, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00ed': [0x04, 0x02, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00ee': [0x04, 0x0a, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00ef': [0x00, 0x0a, 0x00, 0x06, 0x04, 0x04, 0x04, 0x0e, 0x00, 0x00],
                '\u00f0': [0x00, 0x03, 0x0c, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f1': [0x14, 0x0a, 0x00, 0x0d, 0x13, 0x11, 0x11, 0x11, 0x00, 0x00],
                '\u00f2': [0x02, 0x04, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f3': [0x08, 0x04, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f4': [0x04, 0x0a, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f5': [0x14, 0x0a, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f6': [0x00, 0x0a, 0x00, 0x0e, 0x11, 0x11, 0x11, 0x0e, 0x00, 0x00],
                '\u00f7': [0x00, 0x00, 0x04, 0x00, 0x1f, 0x00, 0x04, 0x00, 0x00, 0x00],
                '\u00f8': [0x00, 0x00, 0x00, 0x1e, 0x19, 0x15, 0x13, 0x0f, 0x00, 0x00],
                '\u00f9': [0x02, 0x04, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00],
                '\u00fa': [0x08, 0x04, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00],
                '\u00fb': [0x04, 0x0a, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00],
                '\u00fc': [0x00, 0x0a, 0x00, 0x11, 0x11, 0x11, 0x19, 0x16, 0x00, 0x00],
                '\u00fd': [0x00, 0x08, 0x04, 0x11, 0x11, 0x19, 0x16, 0x10, 0x11, 0x0e],
                '\u00fe': [0x00, 0x00, 0x01, 0x0f, 0x11, 0x11, 0x11, 0x0f, 0x01, 0x01],
                '\u00ff': [0x00, 0x0a, 0x00, 0x11, 0x11, 0x19, 0x16, 0x10, 0x11, 0x0e],
            };

            const SCREEN_WIDTH = 128;
            const SCREEN_HEIGHT = 64;

            const default_args = [{
                type: rt.boolTypeLiteral,
                name: "_rotation",
                initialize(rt, _this) { return rt.va(rt.boolTypeLiteral, true) }
            }, {
                type: rt.unsignedcharTypeLiteral,
                name: "_reset",
                initialize(rt, _this) { return rt.val(rt.unsignedcharTypeLiteral, 255) }
            }]
            // , {
            //     type: rt.unsignedcharTypeLiteral,
            //     name: "_clock",
            //     initialize(rt, _this) { return rt.val(rt.unsignedcharTypeLiteral, 255) }
            // }, {
            //     type: rt.unsignedcharTypeLiteral,
            //     name: "_data",
            //     initialize(rt, _this) { return rt.val(rt.unsignedcharTypeLiteral, 255) }
            // }];
            const U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t = rt.newClass("U8G2_SSD1306_128X64_NONAME_2_HW_I2C", default_args);
            const U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t = rt.newClass("U8G2_SSD1315_128X64_NONAME_2_HW_I2C", default_args);
            const U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t = rt.newClass("U8G2_SSD1306_128X64_NONAME_F_HW_I2C", default_args);
            const U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t = rt.newClass("U8G2_SSD1315_128X64_NONAME_F_HW_I2C", default_args);

            const defineConstructor = function (u8g2_Type, module) {
                return function (rt, _this, rotation, reset) {
                    return {
                        t: u8g2_Type,
                        v: {
                            members: {
                                bus_clock: rt.val(rt.unsignedlongTypeLiteral, 100000),
                                font: rt.String_makeValueFromJSString(""),
                                _rotation: rotation,
                                _reset: reset,
                                _clock: rt.val(rt.unsignedcharTypeLiteral, 255),
                                _data: rt.val(rt.unsignedcharTypeLiteral, 255),
                                __display: [],
                                __startedPage: false,
                                __module: module
                            }
                        },
                        left: false
                    }
                };
            }
            const u8g2_args = [rt.boolTypeLiteral, rt.unsignedcharTypeLiteral];
            rt.regFunc(defineConstructor(U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "ssd1306"), "global", "U8G2_SSD1306_128X64_NONAME_2_HW_I2C", u8g2_args, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t);
            rt.regFunc(defineConstructor(U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "ssd1315"), "global", "U8G2_SSD1315_128X64_NONAME_2_HW_I2C", u8g2_args, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t);
            rt.regFunc(defineConstructor(U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "ssd1306"), "global", "U8G2_SSD1306_128X64_NONAME_F_HW_I2C", u8g2_args, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t);
            rt.regFunc(defineConstructor(U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "ssd1315"), "global", "U8G2_SSD1315_128X64_NONAME_F_HW_I2C", u8g2_args, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t);

            rt.defVar("u8g2_font_6x10_tf", rt.String_t, rt.String_makeValueFromJSString("u8g2_font_6x10_tf"));
            rt.defVar("U8G2_R0", rt.boolTypeLiteral, rt.val(rt.boolTypeLiteral, true));
            rt.defVar("U8X8_PIN_NONE", rt.unsignedcharTypeLiteral, rt.val(rt.unsignedcharTypeLiteral, 255));

            const begin = function (rt, _this) {
                _this.v.members.__display = [];
                let html = '';
                for (var y = 0; y < SCREEN_HEIGHT; y++) {
                    html += '<div class=row>';
                    for (var x = 0; x < SCREEN_WIDTH; x++) {
                        _this.v.members.__display.push(0);
                        html += '<div class="oled-block""></div>';
                    }
                    html += "</div>";
                }
                $('#oled_value').html(html);
                _this.v.members.__oled_dom = Array.from(document.querySelectorAll("#oled .oled-block"));
                return rt.val(rt.boolTypeLiteral, 1);
            };
            rt.regFunc(begin, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "begin", [], rt.boolTypeLiteral);
            rt.regFunc(begin, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "begin", [], rt.boolTypeLiteral);
            rt.regFunc(begin, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "begin", [], rt.boolTypeLiteral);
            rt.regFunc(begin, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "begin", [], rt.boolTypeLiteral);

            const setBusClock = function (rt, _this, clock_speed) {
                _this.v.members.bus_clock = rt.val(rt.unsignedlongTypeLiteral, clock_speed.v);
            };
            rt.regFunc(setBusClock, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "setBusClock", [rt.unsignedlongTypeLiteral], rt.voidTypeLiteral);
            rt.regFunc(setBusClock, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "setBusClock", [rt.unsignedlongTypeLiteral], rt.voidTypeLiteral);
            rt.regFunc(setBusClock, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "setBusClock", [rt.unsignedlongTypeLiteral], rt.voidTypeLiteral);
            rt.regFunc(setBusClock, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "setBusClock", [rt.unsignedlongTypeLiteral], rt.voidTypeLiteral);

            const setFont = function (rt, _this, font) {
                _this.v.members.font = font;
            };
            rt.regFunc(setFont, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "setFont", [rt.String_t], rt.voidTypeLiteral);
            rt.regFunc(setFont, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "setFont", [rt.String_t], rt.voidTypeLiteral);
            rt.regFunc(setFont, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "setFont", [rt.String_t], rt.voidTypeLiteral);
            rt.regFunc(setFont, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "setFont", [rt.String_t], rt.voidTypeLiteral);

            const firstPage = function (rt, _this) {
                _this.v.members.__startedPage = true;
                clearDisplay(rt, _this);
                return rt.val(rt.boolTypeLiteral, 1);
            };
            rt.regFunc(firstPage, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "firstPage", [], rt.boolTypeLiteral);
            rt.regFunc(firstPage, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "firstPage", [], rt.boolTypeLiteral);
            rt.regFunc(firstPage, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "firstPage", [], rt.boolTypeLiteral);
            rt.regFunc(firstPage, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "firstPage", [], rt.boolTypeLiteral);

            const nextPage = function (rt, _this) {
                if (_this.v.members.__startedPage) {
                    _this.v.members.__startedPage = false;
                    sendBuffer(rt, _this);
                    return rt.val(rt.boolTypeLiteral, 1);
                } else {
                    return rt.val(rt.boolTypeLiteral, 0);
                }
            };
            rt.regFunc(nextPage, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "nextPage", [], rt.boolTypeLiteral);
            rt.regFunc(nextPage, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "nextPage", [], rt.boolTypeLiteral);
            rt.regFunc(nextPage, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "nextPage", [], rt.boolTypeLiteral);
            rt.regFunc(nextPage, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "nextPage", [], rt.boolTypeLiteral);

            const setArray = function (_this, x, y, w, h, arr) {
                for (let i = 0; i < h; i++) {
                    const py = y + i;
                    if (py < 0 || py >= SCREEN_HEIGHT) continue;
                    const line = arr[i].toString(2).padStart(w, '0').slice(-w).split('').reverse().join('');
                    for (let j = 0; j < w; j++) {
                        const px = x + j;
                        if (px < 0 || px >= SCREEN_WIDTH) continue;
                        const index = py * SCREEN_WIDTH + px;
                        _this.v.members.__display[index] = parseInt(line[j], 10);
                    }
                }
            };
            const drawStr = function (rt, _this, x, y, text) {
                const str = rt.charArray_getJSString(text);
                for (let i = 0; i < str.length; i++) {
                    const x_pos = x.v + i * 6;
                    const y_pos = y.v;
                    const char = u8g2_font_6x10_tf[str[i]];
                    if (!char) continue;
                    if (x_pos >= SCREEN_WIDTH) break;
                    setArray(_this, x_pos, y_pos - 8, 6, 10, char);
                }
            };
            const drawStr_args = [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.arrayPointerType(rt.charTypeLiteral)];
            rt.regFunc(drawStr, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "drawStr", drawStr_args, rt.voidTypeLiteral);
            rt.regFunc(drawStr, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "drawStr", drawStr_args, rt.voidTypeLiteral);
            rt.regFunc(drawStr, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "drawStr", drawStr_args, rt.voidTypeLiteral);
            rt.regFunc(drawStr, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "drawStr", drawStr_args, rt.voidTypeLiteral);

            const sendBuffer = function (rt, _this) {
                const display = _this.v.members.__display;
                for (let i = 0; i < display.length; i++) {
                    if ((_this.v.members.__oled_dom[i].style.backgroundColor === "" ? 0 : 1) !== display[i]) {

                        const color = _this.v.members.__module == 'ssd1306' ? "#eaeaea" : (i > 15 * SCREEN_WIDTH ? "#19c5ec" : "#f7ee47");
                        if (_this.v.members.__module == 'ssd1315' && i >= 15 * SCREEN_WIDTH && i < 16 * SCREEN_WIDTH) continue;
                        _this.v.members.__oled_dom[i].style.backgroundColor = display[i] ? color : "";
                    }
                }
            };
            rt.regFunc(sendBuffer, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "sendBuffer", [], rt.voidTypeLiteral);
            rt.regFunc(sendBuffer, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "sendBuffer", [], rt.voidTypeLiteral);
            rt.regFunc(sendBuffer, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "sendBuffer", [], rt.voidTypeLiteral);
            rt.regFunc(sendBuffer, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "sendBuffer", [], rt.voidTypeLiteral);

            const clearDisplay = function (rt, _this) {
                _this.v.members.__display.fill(0);
                sendBuffer(rt, _this);
            };
            rt.regFunc(clearDisplay, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "clearDisplay", [], rt.voidTypeLiteral);
            rt.regFunc(clearDisplay, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "clearDisplay", [], rt.voidTypeLiteral);
            rt.regFunc(clearDisplay, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "clearDisplay", [], rt.voidTypeLiteral);
            rt.regFunc(clearDisplay, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "clearDisplay", [], rt.voidTypeLiteral);

            const drawBitMap = function (_this, x, y, w, h, arr) {
                const bytesPerRow = Math.ceil(w / 8);
                for (let i = 0; i < h; i++) {
                    const py = y + i;
                    if (py < 0 || py >= SCREEN_HEIGHT) continue;
                    for (let j = 0; j < w; j++) {
                        const px = x + j;
                        if (px < 0 || px >= SCREEN_WIDTH) continue;
                        const byteIndex = i * bytesPerRow + (j >> 3);
                        const bitIndex = j & 7; // LSB-first
                        const bit = (arr[byteIndex] >> bitIndex) & 0x01;
                        const index = py * SCREEN_WIDTH + px;
                        _this.v.members.__display[index] = bit;
                    }
                }
            };
            const drawXBMP = function (rt, _this, x, y, w, h, data) {
                const dataArray = data.v.target.map(obj => obj.v);
                drawBitMap(_this, x.v, y.v, w.v, h.v, dataArray);
            };
            const drawXBMP_args = [rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.unsignedcharTypeLiteral, rt.arrayPointerType(rt.unsignedcharTypeLiteral)];
            rt.regFunc(drawXBMP, U8G2_SSD1306_128X64_NONAME_2_HW_I2C_t, "drawXBMP", drawXBMP_args, rt.voidTypeLiteral);
            rt.regFunc(drawXBMP, U8G2_SSD1315_128X64_NONAME_2_HW_I2C_t, "drawXBMP", drawXBMP_args, rt.voidTypeLiteral);
            rt.regFunc(drawXBMP, U8G2_SSD1306_128X64_NONAME_F_HW_I2C_t, "drawXBMP", drawXBMP_args, rt.voidTypeLiteral);
            rt.regFunc(drawXBMP, U8G2_SSD1315_128X64_NONAME_F_HW_I2C_t, "drawXBMP", drawXBMP_args, rt.voidTypeLiteral);
        }
    },

};