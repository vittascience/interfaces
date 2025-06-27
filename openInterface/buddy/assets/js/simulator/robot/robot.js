var Robots = {
  'Buddy': {
    CODE_REGEXP: /(BuddySDK)/,
    TYPE: 'robot',
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/buddy/assets/media/simulator/robot/buddy_top.svg",
    IMG_INITIAL_BACKGROUND: "Image_tapis_Buddy.jpg",
    WIDTH_CM: 11, // cm
    RATIO: 54 / 60, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 30, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 1.5, // cm    11/2 + 1.5 = 7
    WHEELS_CENTER_RADIUS: 6, // cm
    WHEELS_DIAMETER: 5.5,
    MIN_SPEED: 0.1, // m.s-1
    MAX_SPEED: 0.7, // m.s-1
    DEFAULT_SPEED_M_S: 0.2,
    EXPRESSION: "neutral",
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
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
    },
    initDistanceSensorsSlots: function() {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "buddy-ultrasonic-left", initial: [15, -9], angle: 0, unit: -3, round: 0 },
          { id: "buddy-ultrasonic-right", initial: [15, 9], angle: 0, unit: -3, round: 0 },
          { id: "buddy-tof-front-left", initial: [15, 4], angle: 55, unit: -3, round: 0 },
          { id: "buddy-tof-front-right", initial: [15, -4], angle: -55, unit: -3, round: 0 },
          { id: "buddy-tof-middle", initial: [15, 0], angle: 0, unit: -3, round: 0 },
          { id: "buddy-tof-back", initial: [-35, 0], angle: 180, unit: -3, round: 0 }
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
        if ($("#buddy-" + motor + "_value").html()) {
          if ($('.buddy-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.buddy-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          if (!Simulator.Mosaic.specific.buddy.isRunningByUnits) {
            this[motor].speed = parseInt(($("#buddy-" + motor + "_value").html() || "0").replace("%", "")) * 1e-2;
          } else {
            this[motor].speed = RobotSimulator.robot.speed_meter_s;
          }
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};