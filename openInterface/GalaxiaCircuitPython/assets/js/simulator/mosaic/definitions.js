Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /P[0-9]{1,2}/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    return {
        name: pin.replace("pin", 'P'),
        id: pin.replace("pin", '')
    };
};

Simulator.Mosaic.externalLibraries = {
    // js libraries
    'src/lib/thingz.js': Simulator.PATH_LIB + 'micropython/thingz.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB + 'micropython/neopixel.js',
    'src/lib/galaxia_sgp30.js': Simulator.PATH_LIB + 'grove/galaxia_sgp30.js',
    'src/lib/galaxia_hm330x.js': Simulator.PATH_LIB + 'grove/galaxia_hm330x.js',
    'src/lib/galaxia_tm1637.js': Simulator.PATH_LIB + 'grove/galaxia_tm1637.js',
    'src/lib/galaxia_my9221.js': Simulator.PATH_LIB + 'grove/galaxia_my9221.js'
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board != null) {

        const playButtonAnimation = function (id, animation) {
            const button = board.querySelector("#" + id + '_on');
            if (button !== null) {
                button.style.transform = animation;
            }
        };

        const buttons = ['button_A', 'button_B', 'button_systeme'],
            up = 'translate(0px, 0px)',
            down = 'translate(0px, 7px)';
        for (let i = 0; i < buttons.length; i++) {
            const button = board.querySelector("#" + buttons[i]);
            if (button !== null) {
                button.addEventListener("mousedown", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("mouseup", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'button_systeme')
                        Simulator.replay();
                });
                button.addEventListener("touchstart", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("touchend", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'button_systeme')
                        Simulator.replay();
                });
            }
        }

        const touchButtons = ['P0', 'P1', 'P2', 'joystick_up', 'joystick_down', 'joystick_left', 'joystick_right'];
        for (let i = 0; i < touchButtons.length; i++) {
            const touchButton = board.querySelector("#" + touchButtons[i]);
            if (touchButton !== null) {
                touchButton.addEventListener("mousedown", function () {
                    this.classList.add('cls-1');
                });
                touchButton.addEventListener("mouseup", function () {
                    this.classList.remove('cls-1');
                });
                touchButton.addEventListener("touchstart", function () {
                    this.classList.add('cls-1');
                });
                touchButton.addEventListener("touchend", function () {
                    this.classList.remove('cls-1');
                });
            }
        }
    }
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    Sk.builtins.pitch = function (pin, frequency, duration) {
        const module = Simulator.getModuleByKey('buzzer');
        const stopMusic = function (self) {
            self._data.osc.stop();
            delete self._data.osc;
            Simulator.setAnimator(module, module.id + "_" + pin.name, 0);
        };
        const startOscillator = function (self, freq) {
            const volume = self._data.audioCtx.createGain();
            volume.connect(self._data.audioCtx.destination);
            volume.gain.value = self._data.volume;
            self._data.osc = self._data.audioCtx.createOscillator();
            self._data.osc.type = 'sine';
            self._data.osc.frequency.value = freq;
            self._data.osc.connect(volume);
            self._data.osc.start();
        };
        let self = {
            _data: {
                volume: 1,
                audioCtx: null
            }
        };

        if (duration === undefined) {
            duration = 1000;
        } else {
            duration = duration.v;
        }
        return Simulator.runAsync(function (resolve, reject) {
            if (!self._data.audioCtx) {
                self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = self._data.audioCtx;
            }
            if (self._data.osc) {
                stopMusic(self);
            }
            Simulator.setAnimator(module, module.id + "_" + pin.name, frequency.v);

            startOscillator(self, frequency.v);

            if (duration > 0) {
                setTimeout(function () {
                    stopMusic(self);
                    resolve();
                }, duration);
            }
            if (Simulator.stop_flag) {
                stopMusic(self);
                resolve();
            }
        });
    };

};

Simulator.Mosaic.groveRegex = {
    // I2C modules
    "lcdGrove": /LCD1602\(/gi,
    "oled": /oled./gi,
    "sgp30": /SGP30\(/gi,
    "multichannel": /multichannel.get_gas/gi,
    "scd30-co2": /SCD30\(/gi,
    "scd30-temp": /SCD30\(/gi,
    "scd30-hum": /SCD30\(/gi,
    "multichannelV2": /multichannel_v2\.measure_/gi,
    "hm330x": /HM330X\(/g,
    "bmp280-temp": /BMP280\(/gi,
    "bmp280-press": /BMP280\(/gi,
    "bmp280-alt": /BMP280\(/gi,
    "si1145": /SI1145\(/gi,
    // Pins on module - inputs
    "dht11-temp": /dht11.getdata\((pin[0-9]{1,2}),/gi,
    "dht11-hum": /dht11.getdata\((pin[0-9]{1,2}),/gi,
    "ultrasonic": /pin([0-9]{1,2})\.ultrasonic/gi,
    "hcsr04": /pin([0-9]{1,2})\.hcsr04/gi,
    "gps": /# GPS on UART/gi,
    // Pins on module - outputs
    "neopixel": /(neopixel\.|)NeoPixel\(pin[0-9]{1,2}/gi,
    "tm1637": /TM1637\((clk=|)pin([0-9]{1,2}),( |)(dio=|)pin([0-9]{1,2})/gi,
    "openlog": /# Lecteur SD on pin([0-9]{1,2})/gi,
    //"buzzer": /# Buzzer on pin([0-9]{1,2})/gi,
    "servo": /pin([0-9]{1,2})\.servo/gi
};


Simulator.Mosaic.specific = {

    gesture: {
        ACCELEROMETER_GESTURES: ['shake', 'up', 'down', 'left', 'right', 'face up', 'face down', 'freefall', '3g', '6g', '8g'],
        history: null,
        init: function () {
            this.history = new Array();
        },
        resetOtherGestures: function (gesture) {
            this.history.push(gesture);
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                if (gesture !== g) {
                    $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('value', 0);
                }
            }
        },
        getCurrentGesture: function () {
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                const state = $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('option', 'value');
                if (state == 1) {
                    return g;
                }
            }
            return null;
        }
    },

    createSliders: function () {
        $('#mb-thermometer_slider').slider({
            min: 0,
            max: 100,
            value: 20
        });
        $('#mb-light_slider,' +
            '#mb-micro_slider').slider({
                min: 0,
                max: WRITE_ANALOG_MAX_VALUE,
                value: 55
            });
        $('#mb-compassMag_slider_x').slider({
            min: -6000,
            max: 60000,
            value: 15000
        });
        $('#mb-compassMag_slider_y').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#mb-compassMag_slider_z').slider({
            min: -93000,
            max: 5200,
            value: -8000
        });
        $('#mb-compassMag_slider_strength').slider({
            min: 0,
            max: 12,
        });
        $('#mb-compassDir_slider').slider({
            min: 0,
            max: 360,
            value: 90
        });
        $('#mb-accelerometer_slider_x,' +
            '#mb-accelerometer_slider_y,' +
            '#mb-accelerometer_slider_z').slider({
                min: -2000,
                max: 2000,
                value: 0
            });
        $('#mb-accelerometer-pitch_slider,' +
            '#mb-accelerometer-roll_slider').slider({
                min: -90,
                max: 90,
                value: 0
            });
        $('#galaxia-button-a_slider,' +
            '#galaxia-button-b_slider,' +
            '#galaxia-pad-up_slider,' +
            '#galaxia-pad-down_slider,' +
            '#galaxia-pad-left_slider,' +
            '#galaxia-pad-right_slider,' +
            '#mb-gesture-shake_slider,' +
            '#mb-gesture-up_slider,' +
            '#mb-gesture-down_slider,' +
            '#mb-gesture-left_slider,' +
            '#mb-gesture-right_slider,' +
            '#mb-gesture-faceup_slider,' +
            '#mb-gesture-facedown_slider,' +
            '#mb-gesture-freefall_slider,' +
            '#mb-gesture-3g_slider,' +
            '#mb-gesture-6g_slider,' +
            '#mb-gesture-8g_slider,' +
            '#mb-gamepad-X_slider,' +
            '#mb-gamepad-Y_slider,' +
            '#mb-gamepad-up_slider,' +
            '#mb-gamepad-down_slider,' +
            '#mb-gamepad-left_slider,' +
            '#mb-gamepad-right_slider,' +
            '#mb-maqueen-finderLeft_slider_v,' +
            '#mb-maqueen-finderRight_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });
    },

    calculs: {
        getServoAngle(duty) {
            return (duty - 25) * 180 / 102;
        }
    },

    definitions: [

        /* Microbit modules */
        {
            regex: /light\.read_light_level\(\)/g,
            id: "mb-light",
            title: "Capteur de luminosité",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: 55,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, WRITE_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /thermometer\.readTemp\(\)/,
            id: "mb-thermometer",
            title: "Capteur de température",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                suffix: "",
            }],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer",
            title: "Accéléromètre : ",
            pin: 'Galaxia',
            type: 'input',
            color: "#22b573",
            listeners: [{
                suffix: "_x",
                default: 0,
                unit: 'm/s2',
                color: "#ff4d6a",
                title: "Axe x"
            }, {
                suffix: "_y",
                default: 0,
                unit: 'm/s2',
                color: "#f9d142",
                title: "Axe y"
            }, {
                suffix: "_z",
                default: 0,
                unit: 'm/s2',
                color: "#1a6da8",
                title: "Axe z"
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-2000, 2000);
                const values = {
                    "x": parseInt($("#mb-accelerometer_slider_x").slider('option', 'value')),
                    "y": parseInt($("#mb-accelerometer_slider_y").slider('option', 'value')),
                    "z": parseInt($("#mb-accelerometer_slider_z").slider('option', 'value'))
                };
                const pitch = Math.atan2(values["y"], -values["z"]) * 180 / Math.PI;
                $("#mb-accelerometer-pitch_value").html(roundFloat(pitch, 1) + " °");
                $("#mb-accelerometer-pitch_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(1, 0, 0, " + -pitch + "deg)");
                const roll = Math.atan2(values["x"], Math.sqrt(values["y"] ** 2 + values["z"] ** 2)) * 180 / Math.PI;
                $("#mb-accelerometer-roll_value").html(roundFloat(roll, 1) + " °");
                $("#mb-accelerometer-roll_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(0, 1, 0, " + -roll + "deg)");
            }
        },
        {
            regex: /accelerometer\.get_[yz]\(\)/,
            id: "mb-accelerometer-pitch",
            title: "Accéleromètre - Tangage",
            pin: 'Galaxia',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png"
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer-roll",
            title: "Accéleromètre - Roulis",
            pin: 'Galaxia',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
        },
        {
            regex: /compass\.heading\(\)/,
            id: "mb-compassDir",
            title: "Boussole",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 90,
                unit: '°',
                color: "#448ae5",
                title: "Direction"
            }],
            picture: "Boussole.png",
            pictureAnimation: "Boussole-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, degree = 360);
            }
        },
        {
            regex: /compass\.get_[xyz]\(\)/,
            id: "mb-compassMag",
            title: "Boussole : ",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: 15000,
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ Mag. x"
            }, {
                suffix: "_y",
                default: 3000,
                unit: 'µT',
                color: "#f9d142",
                title: "Champ Mag. y"
            }, {
                suffix: "_z",
                default: -8000,
                unit: 'µT',
                color: "#1a6da8",
                title: "Champ Mag. z"
            }
            ],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            regex: /# Traffic Light/gi,
            id: "mb-trafficLight",
            title: "Panneau de signalisation",
            pin: 'P0 P1 P2',
            ledDiv: [
                "mb-trafficLight-red",
                "mb-trafficLight-orange",
                "mb-trafficLight-green"
            ],
            type: 'output',
            value: "",
            picture: "feu-tricolore.png"
        },
        {
            regex: /button_a.(is|was)_pressed/,
            id: "galaxia-button-a",
            title: "Bouton A",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /button_b.(is|was)_pressed/,
            id: "galaxia-button-b",
            title: "Bouton B",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /touch_n.(is|was)_pressed/,
            id: "galaxia-pad-up",
            title: "Touche HAUT",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /touch_s.(is|was)_pressed/,
            id: "galaxia-pad-down",
            title: "Touche BAS",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /touch_e.(is|was)_pressed/,
            id: "galaxia-pad-right",
            title: "Touche DROITE",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /touch_w.(is|was)_pressed/,
            id: "galaxia-pad-down",
            title: "Touche GAUCHE",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]shake['"]/,
            id: "mb-gesture-shake",
            title: "Secouer",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "shake",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-shake_value").html("ON");
                    $("#mb-gesture-shake_anim").addClass('mb-gesture-shake_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('shake');
                } else {
                    $("#mb-gesture-shake_value").html("OFF");
                    $("#mb-gesture-shake_anim").removeClass('mb-gesture-shake_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]up['"]/,
            id: "mb-gesture-up",
            title: "Logo vers le haut",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en haut",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-up_value").html("ON");
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('up');
                } else {
                    $("#mb-gesture-up_value").html("OFF");
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]down['"]/,
            id: "mb-gesture-down",
            title: "Logo vers le bas",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en bas",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-down_value").html("ON");
                    $("#mb-gesture-down_anim").addClass('mb-gesture-down_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('down');
                } else {
                    $("#mb-gesture-down_value").html("OFF");
                    $("#mb-gesture-down_anim").removeClass('mb-gesture-down_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face up['"]/,
            id: "mb-gesture-faceup",
            title: "Écran vers le haut",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en haut",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-faceup_value").html("ON");
                    $("#mb-gesture-faceup_anim").addClass('mb-gesture-faceup_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face up');
                } else {
                    $("#mb-gesture-faceup_value").html("OFF");
                    $("#mb-gesture-faceup_anim").removeClass('mb-gesture-faceup_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face down['"]/,
            id: "mb-gesture-facedown",
            title: "Écran vers le bas",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en bas",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-facedown_value").html("ON");
                    $("#mb-gesture-facedown_anim").addClass('mb-gesture-facedown_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face down');
                } else {
                    $("#mb-gesture-facedown_value").html("OFF");
                    $("#mb-gesture-facedown_anim").removeClass('mb-gesture-facedown_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]left['"]/,
            id: "mb-gesture-left",
            title: "Tourner à gauche",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à gauche",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-left_value").html("ON");
                    $("#mb-gesture-left_anim").addClass('mb-gesture-left_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('left');
                } else {
                    $("#mb-gesture-left_value").html("OFF");
                    $("#mb-gesture-left_anim").removeClass('mb-gesture-left_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]right['"]/,
            id: "mb-gesture-right",
            title: "Tourner à droite",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à droite",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-right_value").html("ON");
                    $("#mb-gesture-right_anim").addClass('mb-gesture-right_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('right');
                } else {
                    $("#mb-gesture-right_value").html("OFF");
                    $("#mb-gesture-right_anim").removeClass('mb-gesture-right_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]freefall['"]/,
            id: "mb-gesture-freefall",
            title: "Chute libre",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "chute libre",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-freefall_value").html("ON");
                    $("#mb-gesture-freefall_anim").addClass('mb-gesture-freefall_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('freefall');
                } else {
                    $("#mb-gesture-freefall_value").html("OFF");
                    $("#mb-gesture-freefall_anim").removeClass('mb-gesture-freefall_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]3g['"]/,
            id: "mb-gesture-3g",
            title: "3g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "3g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-3g_value").html("ON");
                    $("#mb-gesture-3g_anim").addClass('mb-gesture-3g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('3g');
                } else {
                    $("#mb-gesture-3g_value").html("OFF");
                    $("#mb-gesture-3g_anim").removeClass('mb-gesture-3g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]6g['"]/,
            id: "mb-gesture-6g",
            title: "6g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "6g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-6g_value").html("ON");
                    $("#mb-gesture-6g_anim").addClass('mb-gesture-6g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('6g');
                } else {
                    $("#mb-gesture-6g_value").html("OFF");
                    $("#mb-gesture-6g_anim").removeClass('mb-gesture-6g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]8g['"]/,
            id: "mb-gesture-8g",
            title: "8g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "8g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-8g_value").html("ON");
                    $("#mb-gesture-8g_anim").addClass('mb-gesture-8g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('8g');
                } else {
                    $("#mb-gesture-8g_value").html("OFF");
                    $("#mb-gesture-8g_anim").removeClass('mb-gesture-8g_active');
                }
            }
        },
        {
            regex: /microphone.(current_sound|was_sound|sound_level)\(/gi,
            id: "mb-micro",
            title: "Microphone",
            pin: 'micro:bit v2',
            type: 'input',
            listeners: [{
                default: "0 (NONE)",
                unit: '',
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                if (Animator.value >= 128) {
                    $(Animator.valueId).text(Animator.value + ' (LOUD)');
                    $(Animator.animId).css("filter", 'hue-rotate(310deg)')
                } else if (Animator.value <= 128) {
                    $(Animator.valueId).text(Animator.value + ' (QUIET)');
                    $(Animator.animId).css("filter", 'hue-rotate(15deg)')
                } else if (Animatior.value == 0) {
                    $(Animator.valueId).text(Animator.value + ' (NONE)');
                }
                $(Animator.animId).css('opacity', Animator.value / WRITE_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /maqueen.setServomotor\(0x14/gi,
            id: "mb-maqueen-servo1",
            title: "Servo 1",
            pin: 'Maqueen (I2C: 0x14)',
            type: 'output',
            value: 90,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /maqueen.setServomotor\(0x15/gi,
            id: "mb-maqueen-servo2",
            title: "Servo 2",
            pin: 'Maqueen (I2C: 0x15)',
            type: 'output',
            value: 90,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /maqueen.setMotor\((0|0x00)(| ),/gi,
            id: "mb-maqueen-motorLeft",
            title: "Moteur Gauche",
            pin: 'Maqueen (I2C: 0x00)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueen.setMotor\((2|0x02)(| ),/gi,
            id: "mb-maqueen-motorRight",
            title: "Moteur Droit",
            pin: 'Maqueen (I2C: 0x02)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueen.readLine\(pin13\)/gi,
            id: "mb-maqueen-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Maqueen (P13)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueen.readLine\(pin14\)/gi,
            id: "mb-maqueen-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Maqueen (P14)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /Maqueen Buzzer on pin0/gi,
            id: "mb-maqueen-buzzer",
            title: "Buzzer",
            pin: 'Maqueen (P0)',
            type: 'output',
            value: 'OFF',
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png"
        },
        {
            regex: /codo.controlLeftMotor\(/gi,
            id: "mb-codo-motorLeft",
            title: "Moteur Gauche",
            pin: 'Codo',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /codo.controlRightMotor\(/gi,
            id: "mb-codo-motorRight",
            title: "Moteur Droit",
            pin: 'Codo',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /buggy.setLeftMotorSpeed\(/gi,
            id: "mb-buggy-motorLeft",
            title: "Moteur Gauche",
            pin: 'Buggy',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /buggy.setRightMotorSpeed\(/gi,
            id: "mb-buggy-motorRight",
            title: "Moteur Droit",
            pin: 'Buggy',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /bitbot.setMotorLeft/gi,
            id: "mb-bitbot-motorLeft",
            title: "Moteur Gauche",
            pin: 'bit:bot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /bitbot.setMotorRight/gi,
            id: "mb-bitbot-motorRight",
            title: "Moteur Droit",
            pin: 'bit:bot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /gamepad_in.getButton_X/gi,
            id: "mb-gamepad-X",
            title: "Touche X",
            pin: 'Gamepad (P1)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Yellow.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_Y/,
            id: "mb-gamepad-Y",
            title: "Touche Y",
            pin: 'Gamepad (P2)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#2d80e1",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_UP/,
            id: "mb-gamepad-up",
            title: "Touche Haut",
            pin: 'Gamepad (P8)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_DOWN/,
            id: "mb-gamepad-down",
            title: "Touche Bas",
            pin: 'Gamepad (P3)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_LEFT/,
            id: "mb-gamepad-left",
            title: "Touche Gauche",
            pin: 'Gamepad (P14)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_RIGHT/,
            id: "mb-gamepad-right",
            title: "Touche Droite",
            pin: 'Gamepad (P15)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_out.setLED/gi,
            id: "mb-gamepad-led",
            title: "LED",
            pin: 'Gamepad (P16)',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },
        {
            regex: /gamepad_out.setVibration/gi,
            id: "mb-gamepad-vibration",
            title: "Vibrations",
            pin: 'Gamepad (P12)',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },

        /* Grove modules */
        {
            regex: /pin([0-9]{1,2})\.continuousServo/gi,
            id: "continuousServo",
            title: "Servo continu",
            pin: 'pin n° ',
            type: 'output',
            class: 'servo',
            value: 0,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /(pin[0-9]{1,2})\.motor/gi,
            id: "motor",
            title: "Moteur",
            pin: 'pin n° ',
            type: 'output',
            value: 0,
            picture: "Motor.png",
            pictureAnimation: "Motor-animation.png"
        },
        //the read/write digital/analog blocs need to be at the end of the json
        {
            regex: /pin([0-9]{1,2}).write_analog\(/gi,
            id: "write-analog",
            title: "Ecriture analogique",
            pin: 'pin n° ',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        }
    ]
};