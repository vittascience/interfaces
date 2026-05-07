
const Robots3D = {
  "Ilo": {
    CODE_REGEXP: /""" Ilo robot """/,
    INITIAL_ZOOM: 0,
  }
};

const Robots = {
  'Alvik': {
    CODE_REGEXP: /""" Alvik robot """/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/esp32/assets/media/simulator/robots/arduino-alvik.svg",
    WIDTH_CM: 9.3, // cm
    RATIO: 230 / 232.92, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm   8.5/2 - 1.3 = 2.95
    WHEELS_CENTER_RADIUS: 4.4, // cm
    WHEELS_DIAMETER: 3.2,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 96, // rpm   // m.s-1 => (2π * d/2 * MAX_SPEED/60)
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
    color: 'rgba(5, 172, 255, 1)',

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
      // line finders
      const exportValue = function (value, id, rgb) {
        const finderSliderID = "#alvik-finder" + id + "_slider_v";
        const colorSensorSliderID = "#alvik-ColorSensor";
        if ($(finderSliderID).data("ui-slider")) {
          $(finderSliderID).slider('value', value < 50 ? 1 : 0);
        }
        if (id === 'Middle' && $(colorSensorSliderID).length > 0) {
          Simulator.setSliderValue('alvik-ColorSensor', rgb[0], '_r');
          Simulator.setSliderValue('alvik-ColorSensor', rgb[1], '_g');
          Simulator.setSliderValue('alvik-ColorSensor', rgb[2], '_b');
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        { id: 'Left', initial: [14, -6] },
        { id: 'Middle', initial: [14, 0] },
        { id: 'Right', initial: [14, 6] },
      ], 2, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "alvik-distanceLeft", initial: [15, 0], angle: 45, unit: -3, round: 0 },
          { id: "alvik-distanceCenterLeft", initial: [15, 0], angle: 22, unit: -3, round: 0 },
          { id: "alvik-distanceCenter", initial: [15, 0], angle: 0, unit: -3, round: 0 },
          { id: "alvik-distanceCenterRight", initial: [15, 0], angle: -22, unit: -3, round: 0 },
          { id: "alvik-distanceRight", initial: [15, 0], angle: -45, unit: -3, round: 0 }
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
        if ($("#alvik-" + motor + "_value").html()) {
          if ($('.alvik-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.alvik-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const alvikMotor = $("#alvik-" + motor + "_value").html().split(' ');
          const speedValue = alvikMotor[0] || "0";
          const speedUnit = alvikMotor[1] || "rpm";
          const speedValueRPM = Simulator.Mosaic.specific.calculs.convertToRPM(speedValue, speedUnit);
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedValueRPM); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};