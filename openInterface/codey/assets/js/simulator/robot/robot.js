const Robots = {
  'Rocky': {
    CODE_REGEXP: /from rocky import \*/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/codey/assets/media/simulator/robot/codey_rocky.svg",
    WIDTH_CM: 10, // cm
    RATIO: 223.45 / 240.79, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm
    WHEELS_CENTER_RADIUS: 3.8, // cm
    WHEELS_DIAMETER: 3,
    MIN_SPEED: 1,
    MAX_SPEED: 100,
    DEFAULT_SPEEED_RPM: 50, // rpm
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
    color: 'rgb(0,190,255)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "mbuild-ultrasonic", suffix: '_t', initial: [26, 0], angle: 0, pin: null }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#rocky-" + motor + "_value").html()) {
          if ($('.rocky-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.rocky-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const rpm = parseInt(($("#rocky-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};