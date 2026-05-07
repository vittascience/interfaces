Simulator.Mosaic.grove_analog = {

    createSliders: function () {
        if (typeof READ_ANALOG_MAX_VALUE !== 'undefined') {
            $('.mod_grovePIRMotion').slider({
                min: 0,
                max: READ_ANALOG_MAX_VALUE,
                step: READ_ANALOG_MAX_VALUE
            });
            $('.mod_potentiometer,' +
                '.mod_groveMoisture,' +
                '.mod_groveCapacitiveMoisture,' +
                '.mod_airQuality,' +
                '.mod_dioxygen,' +
                '.mod_groveWater,' +
                '.mod_groveLight,' +
                '.mod_groveUV,' +
                '.mod_groveSound,' +
                '.mod_groveForce,' +
                '.mod_groveVoltageDivider,' +
                '.mod_grovePulse,' +
                '.mod_mq135,' +
                '.mod_mpx5700,' +
                '#multichannelV2_slider_no2,' +
                '#multichannelV2_slider_co,' +
                '#multichannelV2_slider_c2h5oh,' +
                '#multichannelV2_slider_voc').slider({
                    min: 1,
                    max: READ_ANALOG_MAX_VALUE,
                    value: Math.round(READ_ANALOG_MAX_VALUE / 2)
                });
            // !Slider base : analog value + calculations
            $('.mod_groveTemp_cel,' +
                '.mod_groveTemp_fah,' +
                '.mod_groveTemp_kel').slider({
                    min: 1,
                    max: READ_ANALOG_MAX_VALUE - 1,
                    value: Math.round(READ_ANALOG_MAX_VALUE / 2),
                    step: 1
                });
            $('.mod_highTemp-thmc').slider({
                min: 0,
                max: READ_ANALOG_MAX_VALUE - 1,
                value: Math.round(0.1 * READ_ANALOG_MAX_VALUE)
            });
            // TO DO : has to keep value after simulator replay (temperature init)
            $('.mod_highTemp-room').slider({
                min: 0,
                max: READ_ANALOG_MAX_VALUE,
                value: Math.round(0.3 * READ_ANALOG_MAX_VALUE)
            });
        }
    },

    definitions: [
        {
            id: "potentiometer",
            title: "Potentiomètre",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Potentiometer',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            id: "groveForce",
            title: "Capteur de force",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Force Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            id: "groveVoltageDivider",
            title: "Diviseur de tension",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Voltage Divider',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            id: "joystick",
            title: "Joystick",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            hybride: true,
            codeFlag: 'Joystick X/Y',
            twoPins: true,
            class: "joystick",
            picture: "joystick.svg",
            pictureInteraction: "buttonPush"
        },
        {
            id: "multichannelV2",
            title: "Capteur de gas : ",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "_no2",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#ff4d6a",
                title: "NO2"
            }, {
                suffix: "_co",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                title: "CO"
            }, {
                suffix: "_c2h5oh",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#1a6da8",
                title: "C2H5OH"
            }, {
                suffix: "_voc",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#1a6da8",
                title: "VOC"
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "dioxygen",
            title: "Capteur de dioxygène",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Dioxygen Sensor',
            listeners: [{
                suffix: "",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '%',
                color: "#f9d142",
                title: "Dioxygen"
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE, text = roundFloat(
                    Simulator.Mosaic.grove_analog.calculs.readO2(Animator.value), 1));
            }
        },
        {
            id: "airQuality",
            title: "Capteur de qualité de l'air",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Air Quality Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "groveMoisture",
            title: "Capteur d'humidité du sol",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Moisture Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Humidité.png",
            pictureAnimation: "Humidité-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "groveCapacitiveMoisture",
            title: "Capteur d'humidité capacitif",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Capacitive Moisture Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "capacitive_moisture_sensor.png",
            pictureAnimation: "Humidité-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "groveTemp",
            title: "Capteur de temp. : ",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Temperature Sensor',
            listeners: [{
                suffix: "_cel",
                unit: '°C',
                color: "#f8a10f",
                title: "(°C)"
            }, {
                suffix: "_fah",
                unit: '°F',
                color: "#ff4d6a",
                title: "(°F)"
            }, {
                suffix: "_kel",
                unit: 'K',
                color: "#ff4d6a",
                title: "(K)"
            }],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.gauge(value);
                const R = READ_ANALOG_MAX_VALUE / (Animator.value + 1e-3) - 1;
                const t_cel = 1 / (Math.log(R) / 4250 + 1 / 298.15) - 273.15;
                Animator.updateListeners({
                    "_cel": roundFloat(t_cel, 1),
                    "_kel": roundFloat(t_cel + 273.15, 1),
                    "_fah": roundFloat(t_cel * 9 / 5 + 32, 1)
                }, callbackAnim);
            }
        },
        {
            id: "highTemp-thmc",
            title: "H. Temp. - T° mesurée",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'High Temperature thmc',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#ff4d6a"
            }],
            multiple: ['highTemp-room'],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                // TO DO: get room temperature pin connected to high temp
                const defaultTempRoom = 0;
                Animator.gauge(roundFloat(
                    Simulator.Mosaic.grove_analog.calculs.getThmcTemp(Animator.value, defaultTempRoom), 1));
            }
        },
        {
            id: "highTemp-room",
            title: "H. Temp. - T° ambiante",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'High Temperature room',
            listeners: [{
                suffix: "",
                default: 21,
                unit: '°C',
                color: "#1a6da8"
            }],
            multiple: ['highTemp-thmc'],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge(roundFloat(
                    Simulator.Mosaic.grove_analog.calculs.getRoomTemp(Animator.value), 1));
            }
        },
        {
            id: "mq135",
            title: "MQ135 - CO2",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'MQ135',
            listeners: [{
                suffix: "",
                default: 100,
                unit: 'ppm',
                color: "#ff4d6a",
                title: ""
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE, text = roundFloat(Simulator.Mosaic.grove_analog.calculs.readMQ135(Animator.value), 1));
            }
        },
        {
            id: "groveWater",
            title: "Capteur d'eau",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Water Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Humidité.png",
            pictureAnimation: "Humidité-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            id: "mpx5700",
            title: "MPX5700 - Pression",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'MPX5700',
            listeners: [{
                suffix: "",
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: 'kPa',
                color: "#f9d142",
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = roundFloat(Simulator.Mosaic.grove_analog.calculs.readPressure(Animator.value), 1), angle = 270);
            }
        },
        {
            id: "groveLight",
            title: "Capteur de luminosité",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Light Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "groveUV",
            title: "Capteur d'indice ultraviolet",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'UV Sensor',
            listeners: [{
                default: 6, // initial value ????
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "groveSound",
            title: "Capteur de son",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Sound Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "grovePulse",
            title: "Capteur de Pouls",
            pin: 'pin n°',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Pulse Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
    ],

    calculs: {
        Var_VtoT_K: [
            [0, 2.5173462e1, -1.1662878, -1.0833638, -8.9773540 / 1e1, -3.7342377 / 1e1, -8.6632643 / 1e2, -1.0450598 / 1e2, -5.1920577 / 1e4],
            [0, 2.508355e1, 7.860106 / 1e2, -2.503131 / 1e1, 8.315270 / 1e2, -1.228034 / 1e2, 9.804036 / 1e4, -4.413030 / 1e5, 1.057734 / 1e6, -1.052755 / 1e8],
            [-1.318058e2, 4.830222e1, -1.646031, 5.464731 / 1e2, -9.650715 / 1e4, 8.802193 / 1e6, -3.110810 / 1e8]
        ],
        K_VtoT: function (mV) {
            var i = 0
            let value = 0
            if (mV >= -6.478 && mV < 0) {
                value = this.Var_VtoT_K[0][8];
                for (i = 8; i > 0; i--) {
                    value = mV * value + this.Var_VtoT_K[0][i - 1];
                }
            } else if (mV >= 0 && mV < 20.644) {
                value = this.Var_VtoT_K[1][9];
                for (i = 9; i > 0; i--) {
                    value = mV * value + this.Var_VtoT_K[1][i - 1];
                }
            } else if (mV >= 20.644 && mV <= 54.900) {
                value = this.Var_VtoT_K[2][6];
                for (i = 6; i > 0; i--) {
                    value = mV * value + this.Var_VtoT_K[2][i - 1];
                }
            }
            return value;
        },
        getThmcTemp: function (duty, tempRoom) {
            const vout = duty / READ_ANALOG_MAX_VALUE * 5 * 1000
            const vol = (vout - 350) / 54.16;
            return this.K_VtoT(vol) + tempRoom;
        },
        getRoomTemp: function (duty) {
            const a = duty * 50 / 33;
            const res = (READ_ANALOG_MAX_VALUE - a) * 10000 / a;
            return 1 / (Math.log(res / 10000) / 3975 + 1 / 298.15) - 273.15;
        },
        readO2: function (duty, volt = false, Vref = 3.3) {
            return duty * Vref / READ_ANALOG_MAX_VALUE * (volt ? 1 : (0.21 / 2 * 100));
        },
        readMQ135: function (duty) {
            const RESISTANCE_ZERO = 1351.85;
            const R = ((READ_ANALOG_MAX_VALUE / duty) * 5. - 1.) * 10.0;
            return 116.6020682 * Math.pow((R / RESISTANCE_ZERO), -2.769034857);
        },
        readPressure: function (duty) {
            const rawValue = 10 * duty;
            return (rawValue - 410) * 700 / 9220;
        },
    }
};