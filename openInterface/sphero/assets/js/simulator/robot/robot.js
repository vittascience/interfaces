const Robots = {
  'sphero_mini': {
    CODE_REGEXP: /sphero_mini/,
    INITIAL_ZOOM: 1,
    IMG_LINK: "/openInterface/sphero/assets/media/simulator/robot/sphero.png",
    WIDTH_CM: 4.2, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm // 17.5/2 - 2.5 = 6.25 
    WHEELS_CENTER_RADIUS: 1.7, // cm
    WHEELS_DIAMETER: 4.2,
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
        if ($("#sphero-mini-" + motor + "_value").html()) {
          if ($('.sphero-mini-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.sphero-mini-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speed = parseInt(($("#sphero-mini-" + motor + "_value").html() || "0"));
          const rpm = speed / 255 * RobotSimulator.robot.MAX_SPEED;
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};