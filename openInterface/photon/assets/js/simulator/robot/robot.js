const Robots = {
  'photon': {
    CODE_REGEXP: /photon\.(((go_(forward|backward))|(rotate_(left|right)))(_infinity|)|get_line_sensors\(\)|get_distance_from_obstacle\(\))/,
    INITIAL_ZOOM: -3,
    IMG_LINK: "/openInterface/photon/assets/media/simulator/robot/photon_top.svg",
    WIDTH_CM: 16.7, // cm
    RATIO: 191.51 / 167.2, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -0.7, // cm // 17.5/2 - 2.5 = 6.25 
    WHEELS_CENTER_RADIUS: 6.3, // cm
    WHEELS_DIAMETER: 4,
    MIN_SPEED: 1, // %
    MAX_SPEED: 100, // %
    DEFAULT_SPEEED_RPM: 50, // %
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
    heading: 0,
    color: 'rgb(0,190,255)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id) {
        const sliderId = "#photon-line-sensor" + id + "_slider_v";
        if ($(sliderId).data("ui-slider")) {
          $(sliderId).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineSensors = new LineFinderSimulator(this, [
        { id: "1", initial: [15, -8] },
        { id: "2", initial: [15, 8] }
      ], 3, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        lineWidth: 3,
        blinkerDiameter: 30,
        slots: [
          { id: "photon-distance", suffix: '_t', initial: [26, 0], angle: 0 }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.DistanceSensors.resize(zoom);
      this.lineSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineSensors.updatePosition();
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.DistanceSensors.measure();
      this.lineSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineSensors.draw();
      this.DistanceSensors.draw();
    },
    resetObjects: function () {
      this.lineSensors.reset();
      this.DistanceSensors.reset(this);
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#photon-" + motor + "_value").html()) {
          if ($('.photon-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.photon-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const rpm = parseInt(($("#photon-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};