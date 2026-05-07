Simulator.Mosaic.grove = {

    createSliders: function () {
        $('.mod_button,' +
            '.mod_reversedButton,' +
            '.mod_rainGauge,' +
            '.mod_switchButton,' +
            '.mod_coloredButton,' +
            '.mod_touchButton,' +
            '.mod_anemometer,' +
            '.mod_rainGauge,' +
            '.mod_groveFinder,' +
            '.mod_groveTilt,' +
            '.mod_groveMotion,' +
            '.mod_groveMotionMini,' +
            '.mod_groveVibration').slider({
                min: 0,
                max: 1
            });
        $('.mod_obstacleDetector').slider({
            min: 1,
            max: 0
        });
        $('.mod_colorVariableLed_r,' +
            '.mod_colorVariableLed_g,' +
            '.mod_colorVariableLed_b').slider({
                min: 0,
                max: 255,
                value: 0
            });
        $('.mod_colorVariableLed_r').slider('option', 'value', 127);
        $('.mod_rotaryEncoder').slider({
            min: 0,
            max: 5,
            value: 0,
            step: 1
        });
        $('#sgp30_slider_co2').slider({
            min: 400,
            max: 60000,
            value: 1000
        });
        $('#sgp30_slider_cov').slider({
            min: 0,
            max: 60000,
            value: 1000
        });
        $('#scd30-co2_slider').slider({
            min: 400,
            max: 10000,
            value: 5000
        });
        $('#scd30-temp_slider').slider({
            min: -40,
            max: 70,
            value: 20,
            step: 0.1
        });
        $('#scd30-hum_slider').slider({
            min: 0,
            max: 100,
            value: 50,
            step: 0.1
        });
        $('#sht31-temp_slider').slider({
            min: -40,
            max: 125,
            value: 20,
            step: 0.1
        });
        $('#th02-hum_slider,' +
            '#sht31-hum_slider').slider({
                min: 0,
                max: 100,
                value: 50,
                step: 1
            });
        $('#th02-temp_slider').slider({
            min: 0,
            max: 70,
            value: 20,
            step: 0.1
        });
        $('#bmp280-temp_slider,' +
            '#bme280-temp_slider').slider({
                min: -40,
                max: 85,
                value: 20,
                step: 0.01
            });
        // !Slider base : bmp280 pressure (in Pa) -press
        $('#bmp280-press_slider,' +
            '#bme280-press_slider').slider({
                min: 30000,
                max: 110000,
                value: 101300
            });
        $('#bmp280-alt_slider,' +
            '#bme280-alt_slider').slider({
                min: 30000,
                max: 110000,
                value: 38700
            });
        // $('#bme280-temp_slider').slider({
        //     min: -40,
        //     max: 85,
        //     value: 20,
        //     step: 1
        // });
        // $('#bme280-press_slider').slider({
        //     min: 300,
        //     max: 1100,
        //     value: 800
        // });
        // $('#bme280-alt_slider').slider({
        //     min: 30000,
        //     max: 110000,
        //     value: 38700
        // });
        $('#bme280-hum_slider').slider({
            min: 0,
            max: 100,
            value: 50
        });
        $('#multichannel_slider_no2').slider({
            min: 0,
            max: 10,
            value: 5
        });
        $('#multichannel_slider_nh3').slider({
            min: 1,
            max: 500,
            value: 250
        });
        $('#multichannel_slider_c2h5oh').slider({
            min: 10,
            max: 500,
            value: 250
        });
        $('#multichannel_slider_ch4,' +
            '#multichannel_slider_c4h10').slider({
                min: 1000,
                max: 5000000,
                value: 2500000
            });
        $('#multichannel_slider_c3h8').slider({
            min: 1000,
            max: 30000000,
            value: 15000000
        });
        $('#hm330x_slider_pm1,' +
            '#hm330x_slider_pm2_5,' +
            '#hm330x_slider_pm10,' +
            '#multichannel_slider_co,' +
            '#multichannel_slider_h2').slider({
                min: 1,
                max: 1000,
                value: 500
            });
        $('.mod_dht11-temp').slider({
            min: 0,
            max: 50,
            value: 20,
            step: 0.1
        });
        $('.mod_dht11-hum').slider({
            min: 20,
            max: 80,
            value: 50,
            step: 0.1
        });
        $('.mod_dht22-temp').slider({
            min: -40,
            max: 80,
            value: 20,
            step: 0.01
        });
        $('.mod_dht22-hum').slider({
            min: 0,
            max: 100,
            value: 50,
            step: 0.01
        });
        $('.mod_ds18x20').slider({
            min: -55,
            max: 125,
            value: 20,
            step: 0.1
        });
        // !Slider base : ultrasonic round-trip duration (in ms) _t
        $('.mod_ultrasonic_t,' +
            '.mod_ultrasonic_d,' +
            '.mod_hcsr04_t,' +
            '.mod_hcsr04_d').slider({
                min: 88,
                max: 14575,
                value: 1166,
                step: 0.1
            });
        $('#si1145_slider_uv').slider({
            min: 0,
            max: 12,
            value: 6,
            step: 0.1
        });
        $('#si1145_slider_vis,' +
            '#si1145_slider_ir').slider({
                min: 0,
                max: 1500,
                value: 750,
                step: 0.1
            });
        $('.mod_gps_alt').slider({
            min: 0,
            max: 1000,
            value: 35,
            step: 0.1
        });
        $('.mod_gps_lat').slider({
            min: -90,
            max: 90,
            step: 0.0001,
            value: 48.87
        });
        $('.mod_gps_lon').slider({
            min: -180,
            max: 180,
            step: 0.0001,
            value: 2.29
        });
        $('.mod_groveEarClip').slider({
            min: 50,
            max: 220,
            step: 1,
            value: Math.round(55 + Math.random() * (85 - 55))
        });
    },

    definitions: [
        // Outputs
        {
            id: "lcdGrove",
            title: "Ecran LCD Grove",
            pin: 'I2C',
            type: 'output',
            value: "",
        },
        {
            id: "oled",
            title: "Ecran OLED",
            pin: 'I2C',
            type: 'output',
            large: ["arduino", "letsstartcoding"].includes(INTERFACE_NAME) ? true : false,
            canvas: ["microbit", "arduino", "letsstartcoding"].includes(INTERFACE_NAME) ? false : true,
            value: "",
        },
        {
            id: "neopixel",
            title: "Neopixel",
            codeFlag: "Neopixel",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            value: "",
        },
        {
            id: "LEDMatrix",
            title: "Matrice LED",
            pin: 'I2C',
            type: 'output',
            value: "",
        },
        {
            id: "RGBLEDMatrix",
            title: "Matrice LED RGB",
            pin: 'I2C',
            type: 'output',
            value: "",
        },
        {
            id: "ledModule",
            title: "LED  ",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            codeFlag: 'LED Module',
            value: 0,
            palette: [{
                title: "Verte",
                angle: "0"
            }, {
                title: "Rouge",
                angle: "207"
            }, {
                title: "Orange",
                angle: "247"
            }, {
                title: "Bleue",
                angle: "77"
            }, {
                title: "Jaune",
                angle: "275"
            }],
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
            }
        },
        {
            id: "colorVariableLed",
            title: "LED RGB - ",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            hybride: true,
            codeFlag: "Variable Color LED",
            value: null,
            listeners: [{
                suffix: "_r",
                unit: '',
                color: "#dc3545",
                title: "R"
            }, {
                suffix: "_g",
                unit: '',
                color: "#22b573",
                title: "G"
            }, {
                suffix: "_b",
                unit: '',
                color: "#3fa9f5",
                title: "B"
            }],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                if (Animator.sliderId) {
                    const opacity = parseFloat(($(Animator.valueId.replace(/_(r|g|b)/, ''))).html()) / 100;
                    const id_r = Animator.sliderId.replace(/_(g|b)/, '_r');
                    const id_g = Animator.sliderId.replace(/_(b|r)/, '_g');
                    const id_b = Animator.sliderId.replace(/_(r|g)/, '_b');
                    const r = $(id_r).slider('option', 'value');
                    const g = $(id_g).slider('option', 'value');
                    const b = $(id_b).slider('option', 'value');
                    $(Animator.animId).css('background-color', "rgba(" + r + "," + g + "," + b + "," + opacity + ")");
                } else {
                    if (Animator.value == null) {
                        $(Animator.valueId).html("0 %");
                    } else {
                        const opacity = 1 - Animator.value / PWM_MAX_DUTY;
                        const rgb = this.listeners.map(function (color) {
                            return $(Animator.valueId.replace('_value', '_slider') + color.suffix).slider('option', 'value');
                        });
                        $(Animator.animId).css('background-color', "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")");
                        const percent = Math.round(opacity * 100);
                        $(Animator.valueId).html(percent + " %");
                    }

                }
            }
        },
        {
            id: "tm1637",
            title: "Afficheurs 4 digits",
            pin: 'pin n°',
            codeFlag: '4 Digit Display CLK/DIO',
            twoPins: true,
            pins: 'digital',
            type: 'output',
            value: "0000",
            animate: function (Animator) {
                $(Animator.valueId).html(Animator.value);
            }
        },
        {
            id: "ledBar",
            title: "Barre de LED",
            pin: 'pin n°',
            codeFlag: 'LED Bar DI/DCKI',
            twoPins: true,
            pins: 'digital',
            type: 'output',
            value: 0,
            animate: function (Animator) {
                $(Animator.valueId).html(Animator.value);
            }
        },
        {
            id: "RGBLed",
            title: "LED RGB",
            pin: 'pin n°',
            multipleModules: CHAINABLE_LED_COUNT,
            pins: 'digital',
            type: 'output',
            codeFlag: ['Chainable LED DIN', 'Chainable LED CIN'],
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            id: "servo",
            title: "Servomoteur",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            class: 'servo',
            codeFlag: 'Servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                let angle = Animator.value;
                if (angle == null || angle == 25) {
                    angle = 0;
                } else {
                    const calcFunc = Simulator.Mosaic.specific.calculs;
                    if (typeof calcFunc !== 'undefined' && calcFunc.getServoAngle) {
                        angle = calcFunc.getServoAngle(angle);
                    }
                }
                $(Animator.valueId).html(Math.round(angle) + " °");
                $(Animator.animId).css("transform", "rotate(" + angle + "deg)");
            }
        },
        {
            id: "continuousServo",
            title: "Servo continu",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            class: 'servo',
            codeFlag: 'Continuous Servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                const RPM = 60;
                let speed = Animator.value;
                if (speed == null) {
                    speed = 0;
                } else {
                    speed = Simulator.Mosaic.specific.calculs.getServoSpeed(Animator.value);
                }
                $(Animator.valueId).html(roundFloat(speed, 1) + " %");
                if (speed > 0) {
                    $(Animator.animId).css('animation', 'rotation-backward ' + (60 / (Math.abs(speed) / 100 * RPM)) + 's infinite linear');
                } else if (speed == 0) {
                    $(Animator.animId).css('animation', 'rotation-forward 0s');
                } else {
                    $(Animator.animId).css('animation', 'rotation-forward ' + (60 / (Math.abs(speed) / 100 * RPM)) + 's infinite linear');
                }
            }
        },
        {
            id: "motor",
            title: "Moteur",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            codeFlag: 'Motor',
            value: 0,
            class: "motor",
            picture: "Motor.png",
            pictureAnimation: "Motor-animation.png",
            animate: function (Animator) {
                const RPM = 60;
                let power = Math.round(Animator.value / PWM_MAX_DUTY * 100);
                if (power >= 100) power = 100;
                else if (power <= 0) power = 0;
                $(Animator.valueId).html(`${roundFloat(Animator.value, 3)}<br>(${power}%)`);
                if (Math.round(Animator.value / PWM_MAX_DUTY * 100) !== 0) {
                    $(Animator.animId).css('animation', 'rotation-forward ' + (60 / (Animator.value / PWM_MAX_DUTY * RPM)) + 's infinite linear');
                } else {
                    $(Animator.animId).css('animation', 'unset');
                }
            }
        },
        {
            id: "stepper-motor",
            title: "Moteur pas à pas",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            value: 0,
            picture: "Motor.png",
            pictureAnimation: "Motor-animation.png",
            animator: function (Animator) {
                console.log(Animator.value);
            }
        },
        {
            id: "fan",
            title: "Ventilateur",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            codeFlag: 'Fan',
            value: 0,
            picture: "fan.png",
            pictureAnimation: "fan-animation.png",
            animate: function (Animator) {
                const RPM = 60;
                let power = Math.round(Animator.value / PWM_MAX_DUTY * 100);
                if (power >= 100) power = 100;
                else if (power <= 0) power = 0;
                $(Animator.valueId).html(`${roundFloat(Animator.value, 3)}<br>(${power}%)`);
                if (Math.round(Animator.value / PWM_MAX_DUTY * 100) !== 0) {
                    $(Animator.animId).css('animation', 'rotation-forward ' + (60 / (Animator.value / PWM_MAX_DUTY * RPM)) + 's infinite linear');
                } else {
                    $(Animator.animId).css('animation', 'unset');
                }
            }
        },
        {
            id: "vibrationMotor",
            title: "Moteur à vibration",
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            codeFlag: 'Vibration Motor',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? "ON" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        {
            id: "buzzer",
            title: "Buzzer",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            codeFlag: 'Buzzer',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        {
            id: "relay",
            title: "Relais",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            codeFlag: 'Grove Relay',
            value: 0,
            picture: "Relais.png",
            pictureAnimation: "Relais-animation.png",
            animate: function (Animator) {
                Animator.led();
            }
        },
        {
            id: "openlog",
            title: "OpenLog (SD)",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            codeFlag: 'Lecteur SD',
            value: 0,
            picture: "CarteSD.png",
            pictureAnimation: "CarteSD-animation.png",
            animate: function (Animator) {
                const valueId = Animator.valueId;
                $(valueId).html("ON");
                $(Animator.animId).css("opacity", 1);
                setTimeout(function () {
                    $(valueId).html("OFF");
                    $(Animator.animId).css("opacity", 0);
                }, 500);
            }
        },
        {
            id: "LoRa",
            title: "LoRa",
            pin: 'UART',
            type: 'output',
            value: "",
            picture: "module_lora_e5.svg",
            pictureAnimation: "Ultrason-animation.png"
        },
        // inputs
        {
            id: "coloredButton",
            title: "Bouton coloré",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Colored Button / read',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "rotaryEncoder",
            title: "Encodeur rotatif",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Rotary Encoder',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 5, text = "Position " + Animator.value, angle = 270);
            }
        },
        {
            id: "touchButton",
            title: "Bouton Tactile",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Touch Button',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "button",
            title: "Bouton",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Simple Button',
            releaser: true,
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                const pull = Simulator.pinList.find((component) => component.id == Animator.id).pull;
                Animator.button(Animator.value, pull);
            }
        },
        {
            id: "reversedButton",
            title: "Bouton Inversé",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Simple Button Reversed',
            releaser: true,
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                const pull = Simulator.pinList.find((component) => component.id == Animator.id).pull;
                Animator.button(Animator.value, pull);
            }
        },
        {
            id: "switchButton",
            title: "Interrupteur",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Switch Button',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "sgp30",
            title: "SGP30 : ",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "_co2",
                default: 30000,
                unit: 'ppm',
                color: "#ff4d6a",
                title: "CO2"
            }, {
                suffix: "_cov",
                default: 30000,
                unit: 'ppb',
                color: "#f9d142",
                title: "COV"
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 60000);
            }
        },
        {
            id: "multichannel",
            title: "Capteur de gas : ",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "_co",
                default: 500,
                unit: 'ppm',
                color: "#ff4d6a",
                title: "CO"
            }, {
                suffix: "_no2",
                default: 5,
                unit: 'ppm',
                color: "#f9d142",
                title: "NO2"
            }, {
                suffix: "_nh3",
                default: 250,
                unit: 'ppm',
                color: "#1a6da8",
                title: "NH3"
            }, {
                suffix: "_c3h8",
                default: 15000000,
                unit: 'ppm',
                color: "#f9d142",
                title: "C3H8"
            }, {
                suffix: "_c4h10",
                default: 2500000,
                unit: 'ppm',
                color: "#1a6da8",
                title: "C4H10"
            }, {
                suffix: "_ch4",
                default: 2500000,
                unit: 'ppm',
                color: "#f9d142",
                title: "CH4"
            }, {
                suffix: "_h2",
                default: 500,
                unit: 'ppm',
                color: "#1a6da8",
                title: "H2"
            }, {
                suffix: "_c2h5oh",
                default: 250,
                unit: 'ppm',
                color: "#1a6da8",
                title: "C2H5OH"
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                const MULTICHANNEL_GAS_MAX_VALUE = {
                    "co": 1000, "no2": 10, "nh3": 500, "c3h8": 30000000, "c4h10": 5000000, "ch4": 5000000, "h2": 1000, "c2h5oh": 500
                };
                Animator.opacity(0, MULTICHANNEL_GAS_MAX_VALUE[Animator.valueId.split('_')[2]]);
            }
        },
        {
            id: "scd30-co2",
            title: "SCD30 - CO2",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 5000,
                unit: 'ppm',
                color: "#ff4d6a",
            }],
            multiple: ['scd30-temp', 'scd30-hum'],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(400, 10000);
            }
        },
        {
            id: "scd30-temp",
            title: "SCD30 - Température",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f9d142",
            }],
            multiple: ['scd30-co2', 'scd30-hum'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "scd30-hum",
            title: "SCD30 - Humidité",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#1a6da8",
            }],
            multiple: ['scd30-co2', 'scd30-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            id: "sht31-temp",
            title: "SHT31 - Température",
            pin: 'I2C(0x44)',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#1a6da8",
            }],
            multiple: ['sht31-hum'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "sht31-hum",
            title: "SHT31 - Humidité",
            pin: 'I2C(0x44)',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#1a6da8",
            }],
            multiple: ['sht31-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            id: "th02-temp",
            title: "TH02 - Température",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f8a10f",
            }],
            multiple: ['th02-hum'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "th02-hum",
            title: "TH02 - Humidité",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 0,
                unit: '%',
                color: "#3fa9f5",
            }],
            multiple: ['th02-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            id: "hm330x",
            title: "HM330X - ",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "_pm1",
                default: 500,
                unit: 'µg/m3',
                color: "#ff4d6a",
                title: "diam. (1 µm)"
            }, {
                suffix: "_pm2_5",
                default: 500,
                unit: 'µg/m3',
                color: "#f9d142",
                title: "diam. (2,5 µm)"
            }, {
                suffix: "_pm10",
                default: 500,
                unit: 'µg/m3',
                color: "#1a6da8",
                title: "diam. (10 µm)"
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(10, 1000);
            }
        },
        {
            id: "bmp280-temp",
            title: "BMP280 - Température",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f8a10f"
            }],
            multiple: ['bmp280-press', 'bmp280-alt'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "bmp280-press",
            title: "BMP280 - Pression",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 800,
                unit: 'hPa',
                color: "#f9d142"
            }],
            multiple: ['bmp280-temp', 'bmp280-alt'],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                const textPress = (press) => { return roundFloat(press / 100, 1) };
                const textAlt = (press) => { return Simulator.Mosaic.grove.calculs.getAltitude(press) };
                Animator.updateInvertedCouple(["-press", "-alt"], [110000, 30000], [textPress, textAlt], false);
            }
        },
        {
            id: "bmp280-alt",
            title: "BMP280 - Altitude",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 2000,
                unit: 'm',
                color: "#1a6da8",
            }],
            multiple: ['bmp280-temp', 'bmp280-press'],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                const textPress = (press) => { return roundFloat(press / 100, 1) };
                const textAlt = (press) => { return Simulator.Mosaic.grove.calculs.getAltitude(press) };
                Animator.updateInvertedCouple(["-alt", "-press"], [30000, 110000], [textPress, textAlt], true);
            }
        },
        {
            id: "bme280-temp",
            title: "BME280 - Température",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f8a10f"
            }],
            multiple: ['bme280-press', 'bmp280-alt', 'bme280-hum'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "bme280-press",
            title: "BME280 - Pression",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 800,
                unit: 'hPa',
                color: "#f9d142"
            }],
            multiple: ['bme280-temp', 'bmp280-alt', 'bme280-hum'],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                const textPress = (press) => { return roundFloat(press / 100, 1) };
                const textAlt = (press) => { return Simulator.Mosaic.grove.calculs.getAltitude(press) };
                Animator.updateInvertedCouple(["-press", "-alt"], [110000, 30000], [textPress, textAlt], false);
            }
        },
        {
            id: "bme280-alt",
            title: "BME280 - Altitude",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 2000,
                unit: 'm',
                color: "#1a6da8",
            }],
            multiple: ['bme280-temp', 'bmp280-press', 'bme280-hum'],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                const textPress = (press) => { return roundFloat(press / 100, 1) };
                const textAlt = (press) => { return getAltitude(press) };
                Animator.updateInvertedCouple(["-alt", "-press"], [30000, 110000], [textPress, textAlt], true);
            }
        },
        {
            id: "bme280-hum",
            title: "BME280 - Humidité",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#1a6da8",
            }],
            multiple: ['bme280-temp', 'bmp280-press', 'bme280-alt'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            id: "dht11-temp",
            title: "DHT11 - Température",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'DHT11 Sensor',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#ff4d6a"
            }],
            multiple: ['dht11-hum'],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "dht11-hum",
            title: "DHT11 - Humidité",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'DHT11 Sensor',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#ff4d6a"
            }],
            multiple: ['dht11-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(20, 80);
            }
        },
        {
            id: "dht22-temp",
            title: "DHT22 - Température",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'DHT22 Sensor',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#ff4d6a"
            }],
            multiple: ['dht22-hum'],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "dht22-hum",
            title: "DHT22 - Humidité",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'DHT22 Sensor',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#ff4d6a"
            }],
            multiple: ['dht22-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            id: "ds18x20",
            title: "DS18X20 - Température",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'DS18X20 Sensor',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                title: ""
            }],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "dustSensor",
            title: "Capteur de particules",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Dust Sensor',
            listeners: [{
                suffix: "",
                default: 50000,
                unit: 'pcs/L',
                color: "#ff4d6a",
                title: ""
            }
            ],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate(Animator) {
                Animator.opacity(0, 2507800, text = roundFloat(Simulator.Mosaic.grove.calculs.readDustSensor(Animator.value), 0))
            }
        },
        {
            id: "groveRain",
            title: "Capteur de pluie",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Rain Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "rainGauge",
            title: "Capteur de pluie",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Rain Gauge',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "anemometer",
            title: "Anémomètre",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Anemometer',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "particles",
            picture: "Anémomètre v2.png",
            pictureAnimation: "particles-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.opacity(0, 1);
            }
        },
        {
            id: "si1145",
            title: "SI1145 : ",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "_uv",
                default: 6,
                unit: '',
                color: "#ba55d3",
                title: "UV"
            }, {
                suffix: "_vis",
                default: 750,
                unit: 'lumen',
                color: "#f9d142",
                title: "Visible"
            }, {
                suffix: "_ir",
                default: 750,
                unit: 'lumen',
                color: "#ff4d6a",
                title: "IR"
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                const SI1145_LUM_MAX = {
                    "uv": 12, "vis": 1500, "ir": 1500
                };
                Animator.opacity(0, SI1145_LUM_MAX[Animator.valueId.split('_')[2]]);
            }
        },
        {
            id: "ultrasonic",
            title: "Télémètre: ",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'Ultrasonic',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(Simulator.Mosaic.grove.calculs.getDistance(t), 1),
                    "_t": t
                }, callbackAnim);
            }
        },
        {
            id: "hcsr04",
            title: "HC-SR04: ",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            twoPins: true,
            codeFlag: 'Ultrasonic TRIG/ECHO',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(Simulator.Mosaic.grove.calculs.getDistance(t), 1),
                    "_t": t
                }, callbackAnim);
            }
        },
        {
            id: "vl53l0x",
            title: "Time Of Flight - Distance",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                default: 500,
                unit: 'mm',
                color: "#f9d142",
                suffix: "",
                title: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },
        {
            id: "groveFinder",
            title: "Capteur de ligne noire",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Line Finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "groveTilt",
            title: "Capteur d'inclinaison",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Tilt Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "groveMotion",
            title: "Capteur de mouvement",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Motion Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();

            }
        },
        {
            id: "groveMotionMini",
            title: "Capteur de mouvement",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Mini PIR Motion Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "grovePIRMotion",
            title: "Capteur de mouvement",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'PIR Motion Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "groveVibration",
            title: "Capteur de vibrations",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Vibration Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "obstacleDetector",
            title: "Capteur d'obstacles IR",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'IR Obstacle Detector',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button(Animator.value, pull = 'up')

            }
        },
        {
            id: "gps",
            title: "GPS : ",
            pin: 'pin n°',
            pins: 'digital',
            codeFlag: 'GPS',
            type: 'input',
            listeners: [{
                suffix: "_lat",
                default: 48.8738,
                unit: '°',
                color: "#f9d142",
                title: "Latitude"
            }, {
                suffix: "_lon",
                default: 2.3528,
                unit: '°',
                color: "#ff4d6a",
                title: "Longitude"
            }, {
                suffix: "_alt",
                default: 35,
                unit: 'm',
                color: "#1a6da8",
                title: "Altitude"
            }],
            picture: "GPS.png",
            pictureAnimation: "GPS-animation.png",
            modalButton: {
                icon: "fas fa-map",
                click: function (id) {
                    pseudoModal.openModal('modal-gpsmap');
                    Simulator.Components.GPS.openMap(id);
                }
            },
            animate: function (Animator) {
                if (Animator.sliderId.indexOf("_alt") > -1) {
                    $(Animator.animId).css('bottom', (Animator.value * 10 / 225 + 19) + 'px');
                }
                $(Animator.valueId).html(Animator.value);
            }
        },
        {
            id: "groveEarClip",
            title: "Capteur de fréquence cardiaque",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Ear Clip',
            listeners: [{
                default: Math.round(55 + Math.random() * (85 - 55)), // At rest, in an adult, a heart rate of between 55 and 85
                unit: 'bpm',
                color: "#ff3c14",
                suffix: ""
            }],
            picture: "ear_clip_sensor.png",
            animate: function (Animator) {
                /**
                 * bpm min : 50
                 * bpm max : 220
                 * css animation min : 0.1
                 * css animation max : 2
                */
                const heart = document.querySelector('.groveEarClip_base');
                const m = -19 / 1700;
                const b = 0.1 - (-(19 / 1700) * 220);
                heart.style.animationDuration = `${(m * Animator.value + b).toFixed(2)}s`;
                Animator.gauge();
            }
        },
    ],

    calculs: {
        getAltitude: function (pressure_Pa) {
            return Math.round(44330 * (1 - (pressure_Pa / 101325) ** (1 / 5.255)));
        },
        getDistance: function (round_trip_duration_us) {
            return 343 * round_trip_duration_us / 1e6 / 2 * 100;
        },
        readDustSensor: function (value) {
            const SAMPLETIME_MS = 10000;
            let duration;
            let lowpulseoccupancy = 0;
            let ratio = 0;
            let concentration = 0;
            if (!Simulator.t_dust) Simulator.t_dust = 0;
            //while ((Simulator.millis()-Simulator.t_dust) < SAMPLETIME_MS) {
            duration = value;
            lowpulseoccupancy += duration;
            //}
            ratio = lowpulseoccupancy / (SAMPLETIME_MS * 10.0);
            concentration = 1.1 * Math.pow(ratio, 3) - 3.8 * Math.pow(ratio, 2) + 520 * ratio + 0.62;
            lowpulseoccupancy = 0;
            Simulator.t_dust = Simulator.millis();
            return concentration;
        },
        getMHZ19Data: function (co2, temp) {
            const data_2 = Math.trunc(co2 / 256);
            const data_3 = co2 % 256;
            let data_5 = 255 - (data_2 + data_3 + temp + 40);
            let data_6 = 0;
            if (data_5 < 0) {
                data_6 = -data_5;
                data_5 = 0
            }
            const sum = data_2 + data_3 + temp + 40 + data_5 - data_6;
            return [0, 0, data_2, data_3, temp + 40, data_5, data_6, 0, 1 + (0xFF ^ sum), -1];
        }
    }
};