const Robots = {
  'lotibot': {
    CODE_REGEXP: /lotibot/,
    INITIAL_ZOOM: 0,
    IMG_LINK: "/openInterface/lotibot/assets/media/simulator/robot/loti-bot-top_simple.png",
    WIDTH_CM: 17, // cm
    RATIO: 0.9, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: -4, // cm // 17.5/2 - 2.5 = 6.25 
    WHEELS_CENTER_RADIUS: 6.3, // cm
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
        if ($("#lotibot-" + motor + "_value").html()) {
          if ($('.lotibot-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.lotibot-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const rpm = parseInt(($("#lotibot-" + motor + "_value").html() || "0"));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(Math.abs(rpm)); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }
  }
};