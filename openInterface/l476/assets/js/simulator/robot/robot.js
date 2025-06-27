const Robots = {
  'Alphabot': {
    CODE_REGEXP: /(stm32_alphabot_v2|AlphaBot_v2)/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/l476/assets/media/simulator/robot/robot_alphabot2.svg",
    WIDTH_CM: 11, // cm
    RATIO: 54 / 60, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm    11/2 = 5.5
    WHEELS_CENTER_RADIUS: 4.5, // cm
    WHEELS_DIAMETER: 4.4, // cm
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 250, // rpm   // m.s-1 => (2π * WHEELS_DIAMETER/2 * MAX_SPEED/60)
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
    color: 'rgb(22,74,155)',
    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderId = "#alphabot-trsensor" + id + "_slider";
        if ($(sliderId).data("ui-slider")) {
          $(sliderId).slider('value', parseInt(value * 4));
        }
      };
      this.TRsensors = new LineFinderSimulator(this, [
        { id: "1", initial: [15, -16] },
        { id: "2", initial: [15, -8] },
        { id: "3", initial: [15, 0] },
        { id: "4", initial: [15, 8] },
        { id: "5", initial: [15, 16] }
      ], 3, exportValue);
    },
    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        lineWidth: 3,
        blinkerDiameter: 30,
        slots: [
          { id: "alphabot-ultrasonic", suffix: '_t', initial: [26, 0], angle: 0 },
          { id: "ultrasonic", suffix: '_t', initial: [-26, 0], angle: 180, pin: null },
          { id: "ultrasonic", suffix: '_t', initial: [0, 26], angle: -90, pin: null },
          { id: "ultrasonic", suffix: '_t', initial: [0, -26], angle: 90, pin: null },
          { id: "vl53l0x", initial: [26, 0], angle: 0, unit: -3, round: 0 }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.DistanceSensors.resize(zoom);
      this.TRsensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
      this.TRsensors.updatePosition(this);
    },
    measurements: function () {
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
      this.TRsensors.measure();
    },
    drawObjects: function () {
      this.DistanceSensors.draw();
      this.TRsensors.draw();
    },
    resetObjects: function () {
      this.DistanceSensors.reset(this);
      this.TRsensors.reset();
    },
    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#alphabot-" + motor + "_value").html()) {
          if ($('.alphabot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.alphabot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedPercent = parseInt(($("#alphabot-" + motor + "_value").html() || "0").replace("%", ""));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedPercent / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  },
};

const Robots3D = {
  "Donutbot": {
    CODE_REGEXP: /""" DonutBot robot """/,
    IMG_LINK: "/openInterface/l476/assets/media/simulator/robot/robot_alphabot2.svg",
    INITIAL_ZOOM: 0,
  }
};