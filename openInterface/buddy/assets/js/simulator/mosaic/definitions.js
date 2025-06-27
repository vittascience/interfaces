Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    'src/lib/sdk.js': Simulator.PATH_LIB + '/sdk.js',
    'src/lib/machine.js': Simulator.PATH_LIB + '/machine.js',
    // js common libraries
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/vittaia/__init__.js': _PATH + '/python/assets/js/skulpt/src/vittaia/__init__.js'
};

Simulator.Mosaic.addSpecificInitializations = function () { };

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

    buddy: {
        connected: false,
        ONE_ANGLE_DURATION: 11,
        ONE_CM_DURATION: 50,
        storedMovements: [],
        isRunning: false,
        isRunningByUnits: false,
        angleInterval: null,
        unitInterval: null,
        rotateInterval: null,
        startRunning: function () {
            //console.log("[buddy] startRunning()")
            if (!this.isRunning) {
                this.isRunning = true;
                try {
                    this.runMotors();
                } catch (e) {
                    console.error(e)
                }
            }
        },
        stopRunning: function () {
            //console.log("[buddy] stopRunning()");
            if (this.isRunning) {
                this.isRunning = false;
                Simulator.Mosaic.specific.buddy.storedMovements = new Array();
                RobotSimulator.isForRotation = false;
                this.isRunningByUnits = false;
                $('#buddy-motorRight_value').html("0");
                $('#buddy-motorLeft_value').html("0");
                $('.buddy-motorRight').css('animation', 'none');
                $('.buddy-motorLeft').css('animation', 'none');
            }
        },
        runMotors: function () {
            //console.log("[buddy] runMotors()");
            RobotSimulator.isForRotation = true;
            if (this.storedMovements.length > 0) {
                RobotSimulator.isForRotation = false;
                if (this.storedMovements[0][0] == "forward" || this.storedMovements[0][0] == "backward" || this.storedMovements[0][0] == "straightForward" || this.storedMovements[0][0] == "straightBackward") {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "right" || this.storedMovements[0][0] == "left") {
                    this.turnCommand();
                } else if (this.storedMovements[0][0] == "rotateRight" || this.storedMovements[0][0] == "rotateLeft") {
                    this.rotateCommand();
                } else if (this.storedMovements[0][0] == "stay") {
                    this.startRunning();
                    setTimeout(function () {
                        this.runMotors();
                    }, this.storedMovements[0][1] * 1000);
                    this.storedMovements.shift();
                } else {
                    this.stopRunning();
                }
            } else {
                this.stopMotors();
            }
        },
        moveCommand: function () {
            //console.log("[buddy] moveCommand()");
            this.isRunningByUnits = true;
            const dir = this.storedMovements[0][0];
            if (dir == "straightForward" || dir == "straightBackward") {
                $('.buddy-motorRight').css('animation', 'rotation-' + dir.replace("straight", "").toLowerCase() + ' ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-' + dir.replace("straight", "").toLowerCase() + ' ' + (100 * -0.041 + 5) + 's infinite linear');
                var _this = this;
                $('#buddy-motorRight_value').html(this.storedMovements[0][2] * 100 + " cm/s");
                $('#buddy-motorLeft_value').html(this.storedMovements[0][2] * 100 + " cm/s");
            } else {
                $('.buddy-motorRight').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
                var _this = this;
                this.unitInterval = setInterval(() => {
                    $('#buddy-motorRight_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
                    $('#buddy-motorLeft_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
                    if (_this.storedMovements[0][1] >= 1) {
                        _this.storedMovements[0][1] -= 1
                    } else {
                        timeout *= _this.storedMovements[0][1];
                        _this.storedMovements[0][1] = 0;
                    }
                    if (_this.isRunning) {
                        if (_this.storedMovements[0][1] === 0) {
                            clearInterval(_this.unitInterval);
                            _this.storedMovements.shift();
                            _this.runMotors();
                        }
                    } else {
                        clearInterval(_this.unitInterval);
                    }
                }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);
            }
        },
        moveStraightCommand: function () {
            this.isRunningByUnits = true;
            this.ONE_CM_DURATION = 1 / (this.storedMovements[0][2] * 100);
            const dir = this.storedMovements[0][0].replace("straight", "").toLowerCase();
            $('.buddy-motorRight').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
            $('.buddy-motorLeft').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
            var _this = this;
            $('#buddy-motorRight_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
            $('#buddy-motorLeft_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
        },
        turnCommand: function () {
            //console.log("[buddy] turnCommand()");
            this.isRunningByUnits = false;
            this.ONE_ANGLE_DURATION = this.storedMovements[0][2];
            const dir = this.storedMovements[0][0];
            if (dir == "left") {
                $("#buddy-motorRight_value").html("1");
                $("#buddy-motorLeft_value").html("-1");
                $('.buddy-motorRight').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
            } else {
                $("#buddy-motorRight_value").html("-1");
                $("#buddy-motorLeft_value").html("1");
                $('.buddy-motorRight').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
            }
            var _this = this;
            this.angleInterval = setInterval(function () {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                } else {
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1) * _this.storedMovements[0][1];
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.angleInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.angleInterval);
                }
            }, 1000 / _this.ONE_ANGLE_DURATION);
        },
        rotateCommand: function () {
            //console.log("[buddy] rotateCommand()");
            this.isRunningByUnits = false;
            this.ONE_ANGLE_DURATION = this.storedMovements[0][1];
            const dir = this.storedMovements[0][0];
            if (dir == "rotateLeft") {
                $("#buddy-motorRight_value").html("1");
                $("#buddy-motorLeft_value").html("-1");
                $('.buddy-motorRight').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
            } else {
                $("#buddy-motorRight_value").html("-1");
                $("#buddy-motorLeft_value").html("1");
                $('.buddy-motorRight').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.buddy-motorLeft').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
            }
            var _this = this;
            this.rotateInterval = setInterval(function () {
                RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "rotateLeft" ? -1 : 1);
                if (!_this.isRunning)
                    clearInterval(_this.rotateInterval);
            }, 1000 / _this.ONE_ANGLE_DURATION);
        },
        stopMotors: function () {
            //console.log("[Buddy] Stop motors");
            clearInterval(this.angleInterval);
            clearInterval(this.unitInterval);
            clearInterval(this.rotateInterval);
            this.stopRunning();
        }
    },

    createSliders: function () {
        // Specific sliders
        $('#buddy-ultrasonic-left_slider_t,' +
            '#buddy-ultrasonic-left_slider_d,' +
            '#buddy-ultrasonic-right_slider_t,' +
            '#buddy-ultrasonic-right_slider_d').slider({
                min: 0,
                max: 80,
                value: 0
            });

        $('#buddy-battery_slider_v,' +
            '.mod_buddy-sound-trigger-score').slider({
                min: 0,
                max: 100,
                value: 0
            });

        $('#buddy-body-getAccX_slider_v,' +
            '#buddy-body-getAccY_slider_v,' +
            '#buddy-body-getAccZ_slider_v,' +
            '#buddy-head-getAccX_slider_v,' +
            '#buddy-head-getAccY_slider_v,' +
            '#buddy-head-getAccZ_slider_v').slider({
                min: -10,
                max: 10,
                value: 1
            });

        $('#buddy-body-getGyrX_slider_v,' +
            '#buddy-body-getGyrY_slider_v,' +
            '#buddy-body-getGyrZ_slider_v,' +
            '#buddy-head-getGyrX_slider_v,' +
            '#buddy-head-getGyrY_slider_v,' +
            '#buddy-head-getGyrZ_slider_v').slider({
                min: -360,
                max: 360,
                value: 0
            });

        $('.mod_buddy-get-sound').slider({
            min: 0,
            max: 100,
            value: 60
        });

        $('.mod_buddy-sound-localisation').slider({
            min: 1,
            max: 360,
            value: Math.round(360 / 2)
        });

        $('.mod_buddy-tof-front-left,' +
            '.mod_buddy-tof-front-right,' +
            '.mod_buddy-tof-middle,' +
            '.mod_buddy-tof-back').slider({
                min: 0,
                max: 1300,
                value: 0
            });

        $('.mod_buddy-ultrasonic-right,' +
            '.mod_buddy-ultrasonic-left').slider({
                min: 0,
                max: 800,
                value: 0
            });

        $('#buddy-headTouchSensors-top_slider,' +
            '#buddy-headTouchSensors-left_slider,' +
            '#buddy-headTouchSensors-right_slider,' +
            '#buddy-bodyTouchSensors-torso_slider,' +
            '#buddy-bodyTouchSensors-leftShoulder_slider,' +
            '#buddy-bodyTouchSensors-rightShoulder_slider,' +
            '#buddy-battery-isCharging_slider,' +
            '#buddy-isSpeaking_slider').slider({
                min: 0,
                max: 1,
                value: 0
            });
    },

    definitions: [
        {
            regex: /(on_us_detect_obstacle\(\s*.*,\s*.*,\s*("|')(Left)("|')\s*\)|get_distance_us\(\s*("|')(Left)("|')\s*\))/gi,
            id: "buddy-ultrasonic-left",
            title: "Ultrason - Distance (mm)",
            pin: 'Capteur gauche',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 800);
            }
        },

        {
            regex: /(on_us_detect_obstacle\(\s*.*,\s*.*,\s*("|')(Right)("|')\s*\)|get_distance_us\(\s*("|')(Right)("|')\s*\))/gi,
            id: "buddy-ultrasonic-right",
            title: "Ultrason - Distance (mm)",
            pin: 'Capteur droit',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 800);
            }
        },

        {
            regex: /(on_tf_detect_obstacle\(\s*.*,\s*.*,\s*("|')(FrontLeft)("|')\s*\)|get_distance_tf\(\s*("|')(FrontLeft)("|')\s*\))/gi,
            id: "buddy-tof-front-left",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur avant droit',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },

        {
            regex: /(on_tf_detect_obstacle\(\s*.*,\s*.*,\s*("|')(FrontRight)("|')\s*\)|get_distance_tf\(\s*("|')(FrontRight)("|')\s*\))/gi,
            id: "buddy-tof-front-right",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur avant droit',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },

        {
            regex: /(on_tf_detect_obstacle\(\s*.*,\s*.*,\s*("|')(FrontMiddle)("|')\s*\)|get_distance_tf\(\s*("|')(FrontMiddle)("|')\s*\))/gi,
            id: "buddy-tof-middle",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur du milieu',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },

        {
            regex: /(on_tf_detect_obstacle\(\s*.*,\s*.*,\s*("|')(Back)("|')\s*\)|get_distance_tf\(\s*("|')(Back)("|')\s*\))/gi,
            id: "buddy-tof-back",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur sur le dos',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },

        {
            regex: /getBatteryLevel()/gi,
            id: "buddy-battery",
            title: "Buddy",
            pin: 'Niveau de la batterie',
            type: 'input',
            listeners: [{
                default: 10,
                unit: '%',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "battery_buddy.svg",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
                var battery_percent = parseInt($('#buddy-battery_value_v').text());
                if ($('#level_battery-2').children()[0] != undefined) {
                    if (battery_percent < 15)
                        $('#level_battery-2').children()[0].setAttribute('fill', 'red');
                    else if (battery_percent < 30)
                        $('#level_battery-2').children()[0].setAttribute('fill', 'orange');
                    else
                        $('#level_battery-2').children()[0].setAttribute('fill', 'green');
                    $('#level_battery-2').children()[0].setAttribute('y', 50 - (battery_percent / 2));
                }
            }
        },

        {
            regex: /getAmbiantSound()/gi,
            id: "buddy-get-sound",
            title: "Capteur de son",
            pin: 'Niveau sonore',
            type: 'input',
            listeners: [{
                default: 60,
                unit: 'dB',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },

        {
            regex: /getSoundLocalisation\(\)/gi,
            id: "buddy-sound-localisation",
            title: "Capteur de son",
            pin: 'Position en degrès',
            type: 'input',
            listeners: [{
                default: Math.round(360 / 2),
                unit: '°',
                color: "#f9d142 ",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, angle = 270);
            }
        },

        {
            regex: /getTriggerScore\(\)/gi,
            id: "buddy-sound-trigger-score",
            title: "Capteur de son",
            pin: 'Score de prononciation',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            picture: "man_speaking.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },

        {
            regex: /BodyIMU\(\).getAccX\(\)/gi,
            id: "buddy-body-getAccX",
            title: "Corps - Accéléromètre",
            pin: 'Axe X',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /BodyIMU\(\).getAccY\(\)/gi,
            id: "buddy-body-getAccY",
            title: "Corps - Accéléromètre",
            pin: 'Axe Y',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /BodyIMU\(\).getAccZ\(\)/gi,
            id: "buddy-body-getAccZ",
            title: "Corps - Accéléromètre",
            pin: 'Axe Z',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /HeadIMU\(\).getAccX\(\)/gi,
            id: "buddy-head-getAccX",
            title: "Tête - Accéléromètre",
            pin: 'Axe X',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /HeadIMU\(\).getAccY\(\)/gi,
            id: "buddy-head-getAccY",
            title: "Tête - Accéléromètre",
            pin: 'Axe Y',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /HeadIMU\(\).getAccZ\(\)/gi,
            id: "buddy-head-getAccZ",
            title: "Tête - Accéléromètre",
            pin: 'Axe Z',
            type: 'input',
            listeners: [{
                default: 1,
                unit: 'g',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-10, 10);
            }
        },

        {
            regex: /BodyIMU\(\).getGyrX\(\)/gi,
            id: "buddy-body-getGyrX",
            title: "Corps - Vitesse angulaire",
            pin: 'Axe X',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /BodyIMU\(\).getGyrY\(\)/gi,
            id: "buddy-body-getGyrY",
            title: "Corps - Vitesse angulaire",
            pin: 'Axe Y',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /BodyIMU\(\).getGyrZ\(\)/gi,
            id: "buddy-body-getGyrZ",
            title: "Corps - Vitesse angulaire",
            pin: 'Axe Z',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /HeadIMU\(\).getGyrX\(\)/gi,
            id: "buddy-head-getGyrX",
            title: "Tête - Vitesse angulaire",
            pin: 'Axe X',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /HeadIMU\(\).getGyrY\(\)/gi,
            id: "buddy-head-getGyrY",
            title: "Tête - Vitesse angulaire",
            pin: 'Axe Y',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /HeadIMU\(\).getGyrZ\(\)/gi,
            id: "buddy-head-getGyrZ",
            title: "Tête - Vitesse angulaire",
            pin: 'Axe Z',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°/s',
                color: "#f9d142 ",
                suffix: "_v",
                title: ""
            }],
            picture: "Buddy_Face.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },

        {
            regex: /HeadTouchSensors\(\).Top\(\).isTouched\(\)/gi,
            id: "buddy-headTouchSensors-top",
            title: "Capteur tactile tête",
            pin: 'Zone : haut',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-headTouchSensors-top.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /HeadTouchSensors\(\).Left\(\).isTouched\(\)/gi,
            id: "buddy-headTouchSensors-left",
            title: "Capteur tactile tête",
            pin: 'Zone : gauche',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-headTouchSensors-left.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /HeadTouchSensors\(\).Right\(\).isTouched\(\)/gi,
            id: "buddy-headTouchSensors-right",
            title: "Capteur tactile tête",
            pin: 'Zone : droite',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-headTouchSensors-right.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /BodyTouchSensors\(\).Torso\(\).isTouched\(\)/gi,
            id: "buddy-bodyTouchSensors-torso",
            title: "Capteur tactile corps",
            pin: 'Zone : torse',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-bodyTouchSensors-torso.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /BodyTouchSensors\(\).LeftShoulder\(\).isTouched\(\)/gi,
            id: "buddy-bodyTouchSensors-leftShoulder",
            title: "Capteur tactile corps",
            pin: 'Zone : épaule gauche',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-bodyTouchSensors-leftShoulder.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /BodyTouchSensors\(\).RightShoulder\(\).isTouched\(\)/gi,
            id: "buddy-bodyTouchSensors-rightShoulder",
            title: "Capteur tactile corps",
            pin: 'Zone : épaule droite',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "buddy-bodyTouchSensors-rightShoulder.svg",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },

        {
            regex: /isCharging\(\)/gi,
            id: "buddy-battery-isCharging",
            title: "Buddy",
            pin: 'Charge de la batterie',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            picture: "battery_buddy.svg",
            pictureAnimation: "battery_buddy_charger.svg",
            pictureInteraction: "buttonPush",
            animate: function () {
                let value = $('#buddy-battery-isCharging_slider').slider("option", "value");
                $("#" + this.id + '_value').text(value ? "ON" : "OFF");
                if (value)
                    $("#" + this.id + "_anim").css('display', 'block');
                else
                    $('#' + this.id + "_anim").css('display', 'none');
            }
        },

        {
            regex: /(moveBuddy|rotateBuddy)\(/gi,
            id: "buddy-motorLeft",
            title: "Moteur",
            pin: 'Gauche',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },

        {
            regex: /(moveBuddy|rotateBuddy)\(/gi,
            id: "buddy-motorRight",
            title: "Moteur",
            pin: 'Droit',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },

        {
            regex: /ColorDetect\(\)/gi,
            id: "buddy-colorDetect",
            title: "Détection",
            pin: 'Couleur dominante',
            type: 'input',
            value: "",
            getBodyInjection: function () {
                const COLORS = {
                    "RED": "255,0,0",
                    "GREEN": "0,255,0",
                    "BLUE": "0,0,255",
                    "YELLOW": "255,255,0",
                    "PURPLE": "255,0,255",
                    "ORANGE": "255,165,0",
                    "WHITE": "255,255,255"
                };

                // generate a dropdown menu wich will contain the colors
                // and then generate a div that will change color depending on the selected color

                const palette = document.createElement("div");
                palette.id = "palette";

                const paletteDropdown = document.createElement("select");
                paletteDropdown.setAttribute("id", "paletteDropdown");
                paletteDropdown.setAttribute("class", "form-select form-select-sm");

                const paletteDiv = document.createElement("div");
                paletteDiv.setAttribute("id", "paletteDiv");
                paletteDiv.setAttribute("style", "background-color: rgb(255,0,0);");

                for (var i in COLORS) {
                    const option = document.createElement("option");
                    option.setAttribute("value", COLORS[i]);
                    option.innerHTML = i;
                    paletteDropdown.appendChild(option);
                }

                palette.appendChild(paletteDropdown);
                palette.appendChild(paletteDiv);

                // put a listener on the palette dropdown
                paletteDropdown.addEventListener("change", function () {
                    paletteDiv.style.backgroundColor = `rgb(${paletteDropdown.value})`;
                });

                return palette;
            }
        },

        {
            regex: /isSpeaking\(\)/gi,
            id: "buddy-isSpeaking",
            title: "Voix",
            pin: 'Est en train de parler',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            picture: "buddy_speak.svg",
            animate: function (Animator) {
                Animator.button();
                let icon = document.querySelectorAll("g#icon")[0];
                if (icon != undefined) {
                    if ($('#buddy-isSpeaking_slider').slider("option", "value")) {
                        icon.classList.remove('hidden-icon');
                        icon.classList.add('visible-icon');
                    } else {
                        icon.classList.remove('visible-icon');
                        icon.classList.add('hidden-icon');
                    }
                }
            }
        },

        {
            regex: /startSpeaking\(/gi,
            id: "buddy-startSpeaking",
            title: "Voix",
            pin: '',
            type: 'output',
            value: "",
            picture: "buddy_speak.svg"
        },

        {
            regex: /(Camera|Frame|Detection|Markers|detectFaces|detectPerson|Detect|Thres|Tracking)\(/gi,
            id: "buddy-camera",
            title: "Caméra",
            pin: 'OFF',
            type: 'output',
            value: "",
            picture: "camera_off.png",
            pictureAnimation: "camera_on.png"
        },
    ]
};
