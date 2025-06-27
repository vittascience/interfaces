const ARDUINO_H = {

    load: function (rt) {

        // includes
        rt.include("iostream")
        rt.include("cmath")
        rt.include("cctype")
        rt.include("cstdlib")
        rt.include("string.h")
        rt.include("stdio.h")

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
        rt.defVar("INFINITY", rt.doubleTypeLiteral, rt.val(rt.doubleTypeLiteral, 1.79769e+308));
        rt.defVar("RAND_MAX", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 32767));

        // to_char
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

        // to_boolean
        rt.regFunc((function (rt, _this, value) {
            if (value.t.targetType && value.t.targetType.name == "void") {
                return rt.val(rt.boolTypeLiteral, false);
            }
            if (value.v) {
                return rt.val(rt.boolTypeLiteral, true);
            } else {
                return rt.val(rt.boolTypeLiteral, false);
            }
        }), "global", "boolean", ['?'], rt.boolTypeLiteral);

        // to_int
        rt.regFunc((function (rt, _this, value) {
            let number = Math.trunc(Number(value.v));
            if (number) {
                return rt.val(rt.doubleTypeLiteral, number);
            } else {
                number = parseInt(Simulator.getStringFromInterpretor(value));
                if (number) {
                    return rt.val(rt.doubleTypeLiteral, number);
                } else {
                    return rt.nullPointer;
                }
            }
        }), "global", "to_int", ['?'], rt.doubleTypeLiteral);

        // to_float
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
                UIManager.showErrorMessage("error-message", 'invalid cast from type \'const char*\' to type \'float\'');
                Simulator.stop();
                return rt.nullPointer;
            }
        }), "global", "to_float", ['?'], rt.floatTypeLiteral);

        // to_string
        rt.regFunc((function (rt, _this, str) {
            if (rt.isPrimitiveType(str)) {
                if (rt.isCharType(str.t)) {
                    return rt.val(rt.StringTypeLiteral, String.fromCharCode(str.v));
                } else {
                    return rt.val(rt.StringTypeLiteral, String(str.v));
                }
            } else if (rt.isStringType(str)) {
                const string = rt.getStringFromCharArray(str);
                return rt.val(rt.StringTypeLiteral, string);
            }
        }), "global", "String", ["?"], rt.StringTypeLiteral);

        //delay
        rt.regFunc((async function (rt, _this, x) {
            Simulator.currentDelay = x.v;
        }), "global", "delay", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

        //delayMicroseconds
        rt.regFunc((function (rt, _this, x) {
            Simulator.currentDelay = x.v / 1000;
        }), "global", "delayMicroseconds", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

        //millis
        rt.regFunc((function (rt, _this) {
            const t = Math.round(Date.now() - Simulator.startTime);
            return rt.val(rt.doubleTypeLiteral, t);
        }), "global", "millis", [], rt.doubleTypeLiteral);

        //micros
        rt.regFunc((function (rt, _this) {
            const t = Math.floor((Date.now() - Simulator.startTime) * 1000);
            return rt.val(rt.doubleTypeLiteral, t);
        }), "global", "micros", [], rt.doubleTypeLiteral);

        //random
        rt.regFunc((function (rt, _this, min, max) {
            const rand = rt.getFunc("global", "rand", [])(rt, _this).v;
            const n = Math.round(rand * (max.v-1-min.v) / rt.scope[0].variables["RAND_MAX"].v + min.v);
            return rt.val(rt.doubleTypeLiteral, n);
        }), "global", "random", [rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.doubleTypeLiteral);

        //random
        rt.regFunc((function (rt, _this, seed) {
            rt.getFunc("global", "srand", [rt.unsignedintTypeLiteral])(rt, _this, seed);
        }), "global", "randomSeed", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

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

        rt.regFunc((function (rt, _this, pin, mode) {
            const pinStr = Simulator.getPinString(pin.v);
            const pinComponent = Simulator.pinList.find((component) => component.pin == pinStr);
            if (typeof pinComponent === "undefined") return;
            const id = pinComponent.id;
            switch (mode.v) {
                case 1:
                    Simulator.setPullButton(id, 'output');
                    break;
                case 2:
                    Simulator.setPullButton(id, 'up');
                    break;
                case 0:
                default:
                    Simulator.setPullButton(id, 'down');
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
                return rt.val(rt.unsignedintTypeLiteral, Simulator.getPinSliderValue('A' + (pin.v - 14)));
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

        // length
        rt.regFunc((function (rt, _this, x) {
            var myString = '';
            for (let i = 0; i < x.v.target.length; i++) {
                myString += String.fromCharCode(x.v.target[i].v);
            }
            return rt.val(rt.doubleTypeLiteral, myString.length);
        }), "global", "length", [{
            type: "pointer",
            ptrType: "array",
            eleType: rt.charTypeLiteral,
            size: Simulator.step.v.target.length
        }
        ], rt.doubleTypeLiteral);

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
        rt.regFunc(function (rt, _this, pin, freq) {
            const pinStr = Simulator.getPinString(pin.v);
            $('#buzzer_' + pinStr + '_value').html(freq.v);
            $('#buzzer_' + pinStr + '_anim').css('opacity', 1);
            Simulator.music.startAudio();
            Simulator.music.pitch(freq.v);
        }, "global", "tone", [rt.unsignedintTypeLiteral, rt.doubleTypeLiteral, '?'], rt.voidTypeLiteral);

        //noTone
        rt.regFunc(function (rt, _this, pin) {
            const pinStr = Simulator.getPinString(pin.v);
            $('#buzzer_' + pinStr + '_value').html('OFF');
            Simulator.music.stop();
            $('#buzzer_' + pinStr + '_anim').css('opacity', 0);
        }, "global", "noTone", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);
    }
};