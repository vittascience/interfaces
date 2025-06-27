var Robots = {
  'mBot': {
    CODE_REGEXP: /MeMCore.h/,
    INITIAL_ZOOM: -1,
    IMG_LINK: "/openInterface/mBot/assets/media/simulator/robot/robot_mBot.svg",
    WIDTH_CM: 16.7, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -3.18, // cm    16.7/2 - 3.18 =  5.17
    WHEELS_CENTER_RADIUS: 5.75, // cm
    WHEELS_DIAMETER: 6.4,
    MIN_SPEED: 47, // rpm
    MAX_SPEED: 118, // rpm
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
    color: 'rgb(100,195,221)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const module = Simulator.pinList.find((item) => /makeblockFinder-(left|right)/.test(item.id));
        if (module) {
          const sliderId = "#makeblockFinder-" + id + '_' + module.pin + "_slider_v";
          if ($(sliderId).data("ui-slider")) {
            $(sliderId).slider('value', value < 50 ? 1 : 0);
          }
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'left', initial: [43, -3.5] },
        { id: 'right', initial: [43, 3.5] }
      ], 3, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "ultrasonic", suffix: '_t', initial: [50, 0], angle: 0, pin: null },
          { id: "ultrasonic", suffix: '_t', initial: [-20, 0], angle: 180, pin: null },
          { id: "ultrasonic", suffix: '_t', initial: [30, 22], angle: -90, pin: null },
          { id: "ultrasonic", suffix: '_t', initial: [30, -22], angle: 90, pin: null }
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
        if ($("#mBot-" + motor + "_value").html()) {
          if ($('.mBot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mBot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = Math.abs(parseInt(($("#mBot-" + motor + "_value").html() || "0")));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }

};