const Robots = {
  'Eliobot': {
    CODE_REGEXP: /from board import \*/,
    INITIAL_ZOOM: 1,
    IMG_LINK: "/openInterface/eliobot/assets/media/simulator/board/eliobot.svg",
    WIDTH_CM: 9.7, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -0.75, // cm   9,7/2 - 5,6 = 
    WHEELS_CENTER_RADIUS: 4, // cm
    WHEELS_DIAMETER: 3.2,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 203, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
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
        const sliderId = "#elio-finder" + id + "_slider_v";
        if ($(sliderId).data("ui-slider")) {
          $(sliderId).slider('value', value < 50 ? 1 : 0);
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: "Left", initial: [15, -6] },
        { id: "MiddleLeft", initial: [15, -3] },
        { id: "Middle", initial: [15, 0] },
        { id: "MiddleRight", initial: [15, 3] },
        { id: "Right", initial: [15, 6] }
      ], 2, exportValue);
    },
    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        lineWidth: 3,
        blinkerDiameter: 30,
        slots: [
          { id: "eliobot-irFront", initial: [33, 0], angle: 0, unit: -3, round: 0 },
          { id: "eliobot-irBack", initial: [-26, 0], angle: 180, unit: -3, round: 0 },
          { id: "eliobot-irLeft", initial: [23, -18], angle: 50, unit: -3, round: 0 },
          { id: "eliobot-irRight", initial: [23, 18], angle: -50, unit: -3, round: 0 }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.lineFinder.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.lineFinder.updatePosition(this);
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
        if ($("#mb-eliobot-" + motor + "_value").html()) {
          if ($('.mb-eliobot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mb-eliobot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedValue = parseInt(($("#mb-eliobot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValue / 255 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};