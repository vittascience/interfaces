const Robots = {
  'mBot2': {
    CODE_REGEXP: /(import mbot2|from mbot2 import|(mbot2|ultrasonic2|quad_rgb_sensor)\.)/,
    INITIAL_ZOOM: -1,
    IMG_LINK: `${_PATH}/cyberpi/assets/media/simulator/robot/mbot2.svg`,
    WIDTH_CM: 17.5, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 58.8, // % : probes centered on the line of the default track (Image_circuit_terre.png)
    },
    WHEELS_X_POSITION: -2.5, // cm // 17.5/2 - 2.5 = 6.25 
    WHEELS_CENTER_RADIUS: 5.8, // cm
    WHEELS_DIAMETER: 6.4,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 207, // rpm
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
      // line finders
      const exportValue = function (value, id, rgb) {
        const module = Simulator.pinList.find((item) => /mbuildFinder-(left|right)[1-8]/.test(item.id));
        if (module) {
          const sliderId = "#mbuildFinder-" + id + '_' + module.pin + "_slider_v";
          if ($(sliderId).data("ui-slider")) {
            $(sliderId).slider('value', value < 50 ? 1 : 0);
          }
          document.querySelector(".mbuildFinder-" + id + "_base polygon").style.fill = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        }
      };
      this.lineFinder = new LineFinderSimulator(this, [
        // canvas y axis points down: the left of the robot is on the negative side
        { id: 'left2', initial: [44, -10] },
        { id: 'left1', initial: [44, -2] },
        { id: 'right1', initial: [44, 2] },
        { id: 'right2', initial: [44, 10] }
      ], 1.5, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "mbuild-ultrasonic", suffix: '_t', initial: [32, 0], angle: 0, pin: null },
          { id: "mbuild-ultrasonic", suffix: '_t', initial: [0, 26], angle: -90, pin: null },
          { id: "mbuild-ultrasonic", suffix: '_t', initial: [0, -26], angle: 90, pin: null },
          { id: "mbuild-ultrasonic", suffix: '_t', initial: [-20, 0], angle: 180, pin: null }
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
      this.measureLineOffset();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.lineFinder.draw();
      this.DistanceSensors.draw();
    },
    /**
     * Continuous deviation of the quad RGB sensor from the line (-100: sensor on the left of the line,
     * +100: on the right), from the mean position of the dark pixels between the L2 and R2 probes.
     */
    measureLineOffset: function () {
      const left2 = this.lineFinder.slots.find((slot) => slot.id == 'left2').position;
      const right2 = this.lineFinder.slots.find((slot) => slot.id == 'right2').position;
      if (!left2.length || !right2.length) return;
      const SAMPLES = 41;
      let sum = 0;
      let count = 0;
      for (let i = 0; i < SAMPLES; i++) {
        const t = i / (SAMPLES - 1); // 0: L2, 1: R2
        const x = left2[0] + (right2[0] - left2[0]) * t;
        const y = left2[1] + (right2[1] - left2[1]) * t;
        const rgb = RobotSimulator.ctx.getImageData(x, y, 1, 1).data;
        if (RGBtoGrayscale(rgb[0], rgb[1], rgb[2]) < 50) {
          sum += t * 2 - 1;
          count++;
        }
      }
      this.lineOffset = count ? Math.round(-sum / count * 100) : 0;
    },

    resetObjects: function () {
      this.lineOffset = 0;
      this.DistanceSensors.reset(this);
      this.lineFinder.reset();
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#mBot2-" + motor + "_value").html()) {
          if ($('.mBot2-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.mBot2-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const rpm = parseInt(($("#mBot2-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }

};