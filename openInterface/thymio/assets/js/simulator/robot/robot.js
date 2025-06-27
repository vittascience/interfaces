var Robots = {
  'Thymio': {
    CODE_REGEXP: /from thymio import \*/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/thymio/assets/media/simulator/board/thymio.svg",
    WIDTH_CM: 7.5, // cm
    RATIO: 8.17 / 7.49, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -1.7, // cm   7,5/2 - 1,1 
    WHEELS_CENTER_RADIUS: 3.67, // cm
    WHEELS_DIAMETER: 1.38,
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
        const sliderID = "#thymio-finder" + id  + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [18, -2] },
        { id: 'Right', initial: [18, 2] }
      ], 2, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        lineWidth: 2,
        blinkerDiameter: 30,
        slots: [
          { id: "thymio-ir-fl", initial: [24, -15], angle: 29, pin: null },
          { id: "thymio-ir-flc", initial: [28, -8], angle: 18, pin: null },
          { id: "thymio-ir-fc", initial: [29, 0], angle: 0, pin: null },
          { id: "thymio-ir-frc", initial: [28, 8], angle: -18, pin: null },
          { id: "thymio-ir-fr", initial: [24, 15], angle: -29, pin: null },
          { id: "thymio-ir-br", initial: [-9, -11], angle: 180, pin: null },
          { id: "thymio-ir-bl", initial: [-9, 11], angle: 180, pin: null },
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
        if ($("#mb-thymio-" + motor + "_value").html()) {
          if ($('.mb-thymio-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-thymio-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-thymio-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};