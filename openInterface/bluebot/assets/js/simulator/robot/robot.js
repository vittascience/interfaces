const Robots = {
  'bluebot': {
    CODE_REGEXP: /bluebot/,
    INITIAL_ZOOM: -1,
    IMG_LINK: "/openInterface/bluebot/assets/media/simulator/robot/bluebot.svg",
    IMG_INITIAL_BACKGROUND: "Image_circuit_white.png",
    WIDTH_CM: 12, // cm
    RATIO: 206.22 / 240.52, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 6, // %
      y: 31, // %
    },
    WHEELS_X_POSITION: 0, // cm
    WHEELS_CENTER_RADIUS: 3.8, // cm
    WHEELS_DIAMETER: 4,
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 100, // rpm
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
    heading: 0,
    color: 'rgb(0,190,255)',

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#bluebot-" + motor + "_value").html()) {
          if ($('.bluebot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.bluebot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const rpm = parseInt(($("#bluebot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};