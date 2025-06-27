var Robots = {
  'Rover': {
    CODE_REGEXP: /(from ti_rover import \*|import ti_rover( as (rv|rover)|))/,
    TYPE: 'robot',
    INITIAL_ZOOM: -3,
    IMG_LINK: "/openInterface/TI-83/assets/media/simulator/robot/robot_rover.svg",
    WIDTH_CM: 27, // cm
    RATIO: 466 / 937, // svg ratio
    POSITIVE_Y_TO_UP: false,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'unit',
    INITIAL_POS_PERCENT: {
      x: 20, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 5.83, // cm  27/2 + 5.83 = 19.33
    WHEELS_CENTER_RADIUS: 6, // cm
    WHEELS_DIAMETER: 5.1, // cm
    ONE_ANGLE_DURATION: 10, // ms
    MIN_SPEED: 0.14, // m.s-1
    MAX_SPEED: 0.23, // m.s-1
    DEFAULT_SPEED_M_S: 0.185, // m.s-1
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    speed_meter_s: 0.185, // m.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    color: 'rgb(113,167,245)',

    initObjects: function () {
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);
    },
    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        blinkerDiameter: 30,
        lineWidth: 3,
        slots: [
          { id: "rover-ultrasonic", suffix: '_t', initial: [35, 0], angle: 0 },
          { id: "ih-ultrasonic", suffix: '_d', initial: [-95, 0], angle: 180, pin: null },
          { id: "ih-ultrasonic", suffix: '_d', initial: [-20, 25], angle: -90, pin: null },
          { id: "ih-ultrasonic", suffix: '_d', initial: [-20, -25], angle: 90, pin: null }
        ]
      };
    },
    resizeObjects: function (zoom) {
      this.ledRGB.resize(zoom);
      this.colorSensor.resize(zoom);
      this.DistanceSensors.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.ledRGB.updatePosition(this);
      this.colorSensor.updatePosition(this);
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.DistanceSensors.updatePosition();
    },
    measurements: function () {
      this.colorSensor.measure();
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
    },
    drawObjects: function () {
      this.DistanceSensors.draw();
      this.ledRGB.draw();
      this.colorSensor.draw();
    },
    resetObjects: function () {
      if (this.DistanceSensors) {
        this.DistanceSensors.reset(this);
      }
      this.ledRGB.reset();
      this.colorSensor.reset();
    },

    updateGyroscope: function () {
      if ($("#rover-gyroscope-speed").length > 0) {
        $("#rover-gyroscope-speed_slider").slider('value', roundFloat(-this.angularSpeed, 3));
      }
      if ($("#rover-gyroscope-angle").length > 0) {
        $("#rover-gyroscope-angle_slider").slider('value', this.angle);
      }
    },

    mosaicId: {
      "gyroscope-speed": { id: "rover-gyroscope-speed", suffix: '' },
      "gyroscope-angle": { id: "rover-gyroscope-angle", suffix: '' }
    },

    ledRGB: {
      initial: [34, -28],
      stars: [135, 90, 45, 0, 315, 270, 225],
      LEN: 10,
      lineStroke: 2,
      surface: 4,
      position: [],
      rgb: [0, 0, 0],
      isActive: false,
      rgbInterval: null,
      updatePosition: function (robot) {
        if (typeof this.slotPos == 'undefined') {
          this.slotPos = [...this.initial];
        }
        this.position = getPointAfterRotation(
          robot.rotationCenter.x + this.slotPos[0],
          robot.rotationCenter.y + this.slotPos[1],
          degToRad(robot.angle), robot.rotationCenter.x, robot.rotationCenter.y
        );
      },
      set: function (r, g, b) {
        clearInterval(this.rgbInterval);
        this.on();
        this.rgb = [r, g, b];
      },
      on: function () {
        this.isActive = true;
      },
      off: function () {
        this.isActive = false;
      },
      stop: function () {
        this.off();
        clearInterval(this.rgbInterval);
      },
      draw: function () {
        if (this.isActive) {
          CanvasUtils.drawDisk(this.position[0], this.position[1], this.surface, this.rgb);
          CanvasUtils.ctx.save();
          CanvasUtils.ctx.strokeStyle = 'rgb(' + (this.rgb[0] + 100) + ',' + (this.rgb[1] + 100) + ',' + (this.rgb[2] + 100) + ')';
          CanvasUtils.ctx.lineWidth = this.lineStroke;
          for (var i in this.stars) {
            const angle = this.stars[i];
            CanvasUtils.drawLine(
              this.position[0] + (this.surface + 3) * Math.cos(degToRad(angle)),
              this.position[0] + (this.surface + 3 + this.LEN) * Math.cos(degToRad(angle)),
              this.position[1] + (this.surface + 3) * Math.sin(degToRad(angle)),
              this.position[1] + (this.surface + 3 + this.LEN) * Math.sin(degToRad(angle)),
            );
          }
          CanvasUtils.ctx.restore();
        } else {
          CanvasUtils.drawDisk(this.position[0], this.position[1], this.surface);
        }
      },
      resize: function (zoom) {
        this.surface *= zoom;
        this.lineStroke *= zoom;
        this.LEN *= zoom;
        if (!this.slotPos) {
          this.slotPos = [...this.initial];
        }
        this.slotPos[0] *= zoom;
        this.slotPos[1] *= zoom;
      },
      reset: function () {
        this.surface = 4;
        this.lineStroke = 3;
        this.LEN = 10;
        delete this.slotPos;
        this.stop();
      }
    },

    colorSensor: {
      initial: [0, 0],
      surface: 4,
      position: [],
      rgb: [0, 0, 0],
      updatePosition: function (robot) {
        if (typeof this.slotPos == 'undefined') {
          this.slotPos = [...this.initial];
        }
        this.position = getPointAfterRotation(
          robot.rotationCenter.x + this.slotPos[0],
          robot.rotationCenter.y + this.slotPos[1],
          degToRad(robot.angle), robot.rotationCenter.x, robot.rotationCenter.y
        );
      },
      measure: function () {
        try {
          this.rgb = RobotSimulator.ctx.getImageData(
            this.position[0],
            this.position[1],
            this.surface,
            this.surface
          ).data;
          if ($("#rover-colorSensor").length > 0) {
            $("#rover-colorSensor_slider_r").slider('value', this.rgb[0]);
            $("#rover-colorSensor_slider_g").slider('value', this.rgb[1]);
            $("#rover-colorSensor_slider_b").slider('value', this.rgb[2]);
          }
        } catch (e) {
          console.error(e);
          // getImageData error
        }
      },
      draw: function () {
        CanvasUtils.drawDisk(this.position[0], this.position[1], this.surface, this.rgb);
      },
      resize: function (zoom) {
        this.surface *= zoom;
        if (!this.slotPos) {
          this.slotPos = [...this.initial];
        }
        this.slotPos[0] *= zoom;
        this.slotPos[1] *= zoom;
      },
      reset: function () {
        this.surface = 4;
        delete this.slotPos;
      }
    },

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#rover-" + motor + "_value").html()) {
          this[motor].dir = 0;
          if ($('.rover-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 1;
          }
          if (Simulator.Mosaic.specific.rover.isRunning) {
            this[motor].speed = this.speed_meter_s;
          } else {
            this[motor].speed = 0;
          }
        }
      };
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }

  },

  'Tello': {
    CODE_REGEXP: /(from tello import \*|import tello( as drone|))/,
    TYPE: 'drone',
    INITIAL_ZOOM: -3,
    IMG_LINK: "/openInterface/TI-83/assets/media/simulator/robot/tello.svg",
    IMG_LINK_FLYING: "/openInterface/TI-83/assets/media/simulator/robot/tello_vole_v2.svg",
    IMG_LINK_SHADOW: "/openInterface/TI-83/assets/media/simulator/robot/tello_shadow.svg",
    IMG_INITIAL_BACKGROUND: "Image_piste_tello.png",
    WIDTH_CM: 25, // cm
    RATIO: 1, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 50, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm
    ONE_ANGLE_DURATION: 10, // ms
    MIN_SPEED: 0.14, // m.s-1
    MAX_SPEED: 0.23, // m.s-1
    DEFAULT_SPEED_M_S: 0.185, // m.s-1
    DIRECTION: "stay",
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    altitudeIsChanging: true,
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    speed_meter_s: 0.185, // m.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if (!this.altitudeIsChanging) {
          this[motor].dir = 0;
          if (this.DIRECTION == "backward") {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 1;
          }
          if (Simulator.Mosaic.specific.tello.isRunning) {
            this[motor].speed = this.speed_meter_s;
          } else {
            this[motor].speed = 0;
          }
        } else {
          if (Simulator.Mosaic.specific.tello.isRunning) {
            this[motor].dir = 0;
            this[motor].speed = 0;
          }
        }
      };
      setSpeed('motorRight');
      setSpeed('motorLeft');
    },
    updateAltitudeBar: function () {
      if (typeof $('#tello-altitude_slider_d > .ui-state-default').offset() != 'undefined') {
        var offsetSliderTop = $('#tello-altitude_slider_d > .ui-state-default').offset()['top'],
          offsetBarLeft = $('#tello-altitude_anim').offset()['left'];
        $('#tello-altitude_anim').offset({
          'top': offsetSliderTop + $('#tello-altitude_slider_d > .ui-state-default').width() / 2,
          'left': offsetBarLeft
        });
      }
    },
    setAltitude: function (alt) {
      this.setAltitudeSlider();
      if (alt <= 200)
        $('#tello-altitude_slider_d > .ui-state-default').css("bottom", (alt * 100) / 200 + "%");
      else
        $('#tello-altitude_slider_d > .ui-state-default').css("bottom", (alt / 100) + "%");
      $('#tello-altitude_value_d').html(alt.toString());
      this.updateAltitudeBar();
      RobotSimulator.droneAltitude = alt;
    },
    setAltitudeSlider: function () {
      $('#tello-altitude_slider_d').prependTo('#tello-altitude_gauge_d');
      $('#tello-altitude_slider_d').on("slide", function (event, ui) { return false; });
    },
    changeAltitude: function (dir, alt) {
      this.setAltitudeSlider();
      let newAltitude = 0;
      if (dir == 'up')
        newAltitude = parseInt($('#tello-altitude_value_d').html()) + alt;
      else
        newAltitude = parseInt($('#tello-altitude_value_d').html()) - alt;
      if (newAltitude > 10000)
        newAltitude = 10000;
      else if (newAltitude < 0)
        newAltitude = 0;
      this.setAltitude(newAltitude);
    },
    getAltitude: function () {
      return parseInt($('#tello-altitude_value_d').html());
    }
  }
};

