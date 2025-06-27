const Robots = {
  'Kitronik': {
    CODE_REGEXP: /""" Kitronik """/,
    INITIAL_ZOOM: -1,
    IMG_LINK: "/openInterface/pico/assets/media/simulator/robots/kitronik.svg",
    WIDTH_CM: 12.5, // cm
    RATIO: 200.21 / 238.63, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -1.5, // cm    WIDTH_CM/2 = 6.25 , x wheels = 8 , 8-6,25 = 1,75
    WHEELS_CENTER_RADIUS: 3, // cm Internal diameter 6.2
    WHEELS_DIAMETER: 1.5, // cm External diameter 6.6
    MIN_SPEED: 16, // rpm
    MAX_SPEED: 162.5, // rpm   // m.s-1 => (2π * WHEELS_DIAMETER/2 * MAX_SPEED/60)
    DIRECTION: '',
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
        const sliderID = "#kitro-finder" + id + "_slider_v";
        if ($(sliderID).data("ui-slider")) {
          $(sliderID).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [25, -3] },
        { id: 'Central', initial: [30, 0] },
        { id: 'Right', initial: [25, 3] }
      ], 3, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "kitro-hcsr04-front", suffix: '_t', initial: [25, 0], angle: 0, unit: -3, round: 0 },
          { id: "kitro-hcsr04-back", suffix: '_t', initial: [-30, 0], angle: 180, unit: -3, round: 0 }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: async function () {
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
        if ($("#kitro-" + motor + "_value").html()) {
          if ($('.kitro-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.kitro-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedPercent = parseInt(($("#kitro-" + motor + "_value").html() || "0").replace("%", ""));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedPercent / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};