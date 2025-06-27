const Robots = {
  'Maqueen': {
    CODE_REGEXP: /""" Maqueen robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_maqueen.svg",
    WIDTH_CM: 8.5, // cm
    RATIO: 753.6 / 889.6, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -1.3, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 3.5, // cm
    WHEELS_DIAMETER: 4.3,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 133, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-maqueen-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [14, -3] },
        { id: 'Right', initial: [14, 3] },
      ], 2, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "hcsr04", suffix: '_t', initial: [22, 0], angle: 0, pin: null }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-maqueen-" + motor + "_value").html()) {
          if ($('.mb-maqueen-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-maqueen-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-maqueen-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'MaqueenPlusV1': {
    CODE_REGEXP: /""" MaqueenPlusV1 robot """/,
    INITIAL_ZOOM: -2,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_maqueenplus.svg",
    WIDTH_CM: 10.2, // cm
    RATIO: 267.81 / 192.13, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -2.5, // cm 
    WHEELS_CENTER_RADIUS: 4.5, // cm
    WHEELS_DIAMETER: 4.3, // cm
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 340, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-maqueenplus-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'LeftRear', initial: [10, -15] },
        { id: 'Left', initial: [20, -6] },
        { id: 'MiddleLeft', initial: [20, -2] },
        { id: 'MiddleRight', initial: [20, 2] },
        { id: 'Right', initial: [20, 6] },
        { id: 'RightRear', initial: [10, 15] }
      ], 2, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "hcsr04", suffix: '_t', initial: [22, 0], angle: 0, pin: null }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-maqueenplus-" + motor + "_value").html()) {
          if ($('.mb-maqueenplus-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-maqueenplus-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-maqueenplus-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'MaqueenPlusV2': {
    CODE_REGEXP: /""" MaqueenPlusV2 robot """/,
    INITIAL_ZOOM: -2,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_maqueenplus.svg",
    WIDTH_CM: 10.2, // cm
    RATIO: 267.81 / 192.13, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -2.5, // cm 
    WHEELS_CENTER_RADIUS: 4.5, // cm
    WHEELS_DIAMETER: 4.3, // cm
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 133, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-maqueenplus-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [25, -5] },
        { id: 'Right', initial: [25, 5] },
        { id: 'Middle', initial: [25, 0] },
        { id: 'LeftRear', initial: [15, -15] },
        { id: 'RightRear', initial: [15, 15] }
      ], 2, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "hcsr04", suffix: '_t', initial: [22, 0], angle: 0, pin: null }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-maqueenplus-" + motor + "_value").html()) {
          if ($('.mb-maqueenplus-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-maqueenplus-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-maqueenplus-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'Cutebot': {
    CODE_REGEXP: /""" Cutebot robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_cutebot.svg",
    IMG_INITIAL_BACKGROUND: "Image_circuit_cutebot.jpg",
    WIDTH_CM: 8.5, // cm
    RATIO: 321.09 / 233.68, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -1.3, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 2.7, // cm
    WHEELS_DIAMETER: 3.4,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 300, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-cutebot-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [14, -3] },
        { id: 'Right', initial: [14, 3] }
      ], 2, exportValue);
    },
    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "hcsr04", suffix: '_t', initial: [22, 0], angle: 0, pin: null }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-cutebot-" + motor + "_value").html()) {
          if ($('.mb-cutebot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-cutebot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-cutebot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'CutebotPro': {
    CODE_REGEXP: /""" Cutebot Pro robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_cutebot_pro.svg",
    WIDTH_CM: 13.2, // cm
    RATIO: 265.04 / 233.92, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -2.6, // cm   13.2/2 - 2.6 = 4
    WHEELS_CENTER_RADIUS: 4.6, // cm
    WHEELS_DIAMETER: 6, // cm
    MIN_SPEED: 10, // rpm
    MAX_SPEED: 200, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(26,104,158)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-cutebotpro-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', 0xFF - value);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [31, -15] },
        { id: 'CenterLeft', initial: [31, -3] },
        { id: 'CenterRight', initial: [31, 3] },
        { id: 'Right', initial: [31, 15] }
      ], 3, exportValue);
    },
    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "mb-cutebotpro-ultrasonic", suffix: '_t', initial: [42, 0], angle: 0, pin: null }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-cutebotpro-" + motor + "_value").html()) {
          if ($('.mb-cutebotpro-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-cutebotpro-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-cutebotpro-" + motor + "_value").html() || "0"));
          this[motor].speed = speedValue * 1e-2; // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'Kitrobot': {
    CODE_REGEXP: /""" Kitrobot robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_kitrobot.svg",
    WIDTH_CM: 12, // cm
    RATIO: 200.6 / 244.94, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -2.7, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 3.8, // cm
    WHEELS_DIAMETER: 4.3,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 120, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',
    initObjects: function () {
      // distance sensors
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-kitrobot-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [20, -3] },
        { id: 'Right', initial: [20, 3] }
      ], 2, exportValue);
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    distanceSensorsSlots: {
      blinkerDiameter: 30,
      lineWidth: 3,
      slots: [
        { id: "ultrasonic", suffix: '_t', initial: [33, 0], angle: 0, pin: null }
      ]
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-kitrobot-" + motor + "_value").html()) {
          if ($('.mb-kitrobot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-kitrobot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-kitrobot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'Oobybot': {
    CODE_REGEXP: /""" Oobybot robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_oobybot.svg",
    WIDTH_CM: 8.5, // cm
    RATIO: 2 / 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -1.3, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 7, // cm
    WHEELS_DIAMETER: 5.8,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 133, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(190,160,140)',

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-oobybot-" + motor + "_value").html()) {
          if ($('.mb-oobybot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-oobybot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-oobybot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'BitCar': {
    CODE_REGEXP: /""" BitCar robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/robot_bitcar.svg",
    WIDTH_CM: 9.5, // cm
    RATIO: 200.6 / 244.94, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -2.7, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 4.8, // cm
    WHEELS_DIAMETER: 5.2,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 120, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(255,113,5)',
    initObjects: function () {
      // distance sensors
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderID = "#mb-kitrobot-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [30, -2] },
        { id: 'Right', initial: [30, 2] }
      ], 2, exportValue);
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.lineFinder.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineFinder.reset();
      this.DistanceSensors.reset(this);
    },

    distanceSensorsSlots: {
      blinkerDiameter: 30,
      lineWidth: 3,
      slots: [
        { id: "ultrasonic", suffix: '_t', initial: [33, 0], angle: 0, pin: 12 }
      ]
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mb-bitcar-" + motor + "_value").html()) {
          if ($('.mb-bitcar-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-bitcar-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-bitcar-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
  'Tello': {
    CODE_REGEXP: /""" Tello drone """/,
    TYPE: 'drone',
    INITIAL_ZOOM: -3,
    IMG_LINK: "/openInterface/microbit/assets/media/simulator/robot/tello.svg",
    IMG_LINK_FLYING: "/openInterface/microbit/assets/media/simulator/robot/tello_vole_v2.svg",
    IMG_LINK_SHADOW: "/openInterface/microbit/assets/media/simulator/robot/tello_shadow.svg",
    IMG_INITIAL_BACKGROUND: "Image_piste_tello.png",
    WIDTH_CM: 25, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 50, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm
    ONE_ANGLE_DURATION: 10, // ms
    MIN_SPEED: 0.14, // m.s-1
    MAX_SPEED: 0.23, // m.s-1
    DEFAULT_SPEED_M_S: 0.165, // m.s-1
    DIRECTION: "stay",
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    altitudeIsChanging: true,
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    speed_meter_s: 0.185, // m.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if (!this.altitudeIsChanging) {
          this[motor].dir = 0;
          if (this.DIRECTION == "backward") {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 1;
          }
          if (Simulator.Mosaic.specific.tello.isRunning) {
            this[motor].speed = this.speed_meter_s;
          } else {
            this[motor].speed = 0;
          }
        } else {
          if (Simulator.Mosaic.specific.tello.isRunning) {
            this[motor].dir = 0;
            this[motor].speed = 0;
          }
        }
      };
      setSpeed('motorRight');
      setSpeed('motorLeft');
    },
    // to improve
    // updateZoom: function (alt, direction) {
    //   let factor
    //   if (Simulator.Mosaic.specific.tello.isRunning) {
    //     if (direction == "up") {
    //       factor = 1 + (alt / 7000);
    //     } else if (direction == "down" || direction == "land") {
    //       factor = 1 - (alt / 7000);
    //     }
    //     RobotSimulator.zoom(factor, false, RobotSimulator.getCurrentRobotPosition())
    //   }
    // },
    updateAltitudeBar: function () {
      if (typeof $('#tello-altitude_slider_d > .ui-state-default').offset() != 'undefined') {
        var offsetSliderTop = $('#tello-altitude_slider_d > .ui-state-default').offset()['top'],
          offsetBarLeft = $('#tello-altitude_anim').offset()['left'];
        $('#tello-altitude_anim').offset({
          'top': offsetSliderTop + $('#tello-altitude_slider_d > .ui-state-default').width() / 2,
          'left': offsetBarLeft
        });
      }
    },
    setAltitude: function (alt) {
      this.setAltitudeSlider();
      if (alt <= 200)
        $('#tello-altitude_slider_d > .ui-state-default').css("bottom", (alt * 100) / 200 + "%");
      else
        $('#tello-altitude_slider_d > .ui-state-default').css("bottom", (alt / 100) + "%");
      $('#tello-altitude_value_d').html(alt.toString());
      this.updateAltitudeBar();
      RobotSimulator.droneAltitude = alt;
    },
    setAltitudeSlider: function () {
      $('#tello-altitude_slider_d').prependTo('#tello-altitude_gauge_d');
      $('#tello-altitude_slider_d').on("slide", function (event, ui) { return false; });
    },
    changeAltitude: function (dir, alt) {
      this.setAltitudeSlider();
      let newAltitude = 0;
      if (dir == 'up')
        newAltitude = parseInt($('#tello-altitude_value_d').html()) + alt;
      else
        newAltitude = parseInt($('#tello-altitude_value_d').html()) - alt;
      if (newAltitude > 10000)
        newAltitude = 10000;
      else if (newAltitude < 0)
        newAltitude = 0;
      this.setAltitude(newAltitude);
    },
    getAltitude: function () {
      return parseInt($('#tello-altitude_value_d').html());
    }
  }
}