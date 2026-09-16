const Robots = {
  'g1tank': {
    CODE_REGEXP: /""" Yahboom G1 Tank robot """/,
    INITIAL_ZOOM: -1,
    IMG_LINK: "/openInterface/raspberrypi/assets/media/simulator/robot/Yahboom-G1-Tank_top.png",
    WIDTH_CM: 25, // cm
    RATIO: 1050 / 1380, // svg ratio
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 15, // %
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm    25/2 = 12.5
    WHEELS_CENTER_RADIUS: 4.5, // cm
    WHEELS_DIAMETER: 11.5, // cm
    MIN_SPEED: 1, // rpm
    MAX_SPEED: 250, // rpm   // m.s-1 => (2π * WHEELS_DIAMETER/2 * MAX_SPEED/60)
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
    color: 'rgb(91,213,247)',
    camera: null,
    wallColor: '#c51a4a',
    specificObstacles: {
      "Image_circuit_AlphAI": [
        {
          "shape": "rectangle",
          "image": "/openInterface/interfaces/assets/media/simulator/robot/obstacles/rectangle_noir.png",
          "x": 152,
          "y": 132,
          "w": 184,
          "h": 10,
          "color": "#000000"
        }
      ]
    },

    initObjects: function () {
      // distance sensors
      this.initDistanceSensorsSlots();
      this.DistanceSensors = new DistanceSensorSimulator(this,
        this.distanceSensorsSlots.slots,
        this.distanceSensorsSlots.lineWidth,
        this.distanceSensorsSlots.blinkerDiameter);

      // TR sensors
      const exportValue = function (value, id) {
        const sliderId = "#g1tank-lineFinder" + id + "_slider";
        if ($(sliderId).data("ui-slider")) {
          $(sliderId).slider('value', value);
        }
      };

      this.lineFinders = new LineFinderSimulator(this, [
        { id: "1_3", initial: [55, -10] },
        { id: "2_5", initial: [55, -3] },
        { id: "3_4", initial: [55, 3] },
        { id: "4_18", initial: [55, 10] }
      ], 3, exportValue);
    },

    initDistanceSensorsSlots: function () {
      this.distanceSensorsSlots = {
        lineWidth: 3,
        blinkerDiameter: 30,
        slots: [
          { id: "hcsr04_1", suffix: '_t', initial: [26, 0], angle: 0 }
        ]
      };
    },

    resizeObjects: function (zoom) {
      this.ledRGB.resize(zoom);
      this.DistanceSensors.resize(zoom);
      this.lineFinders.resize(zoom);
    },
    updateObjectsPosition: function () {
      this.angle += this.DistanceSensors.ERROR_DX_NUL;
      this.ledRGB.updatePosition(this);
      this.DistanceSensors.updatePosition();
      this.lineFinders.updatePosition();
    },
    measurements: function () {
      this.DistanceSensors.measure();
      this.angle -= this.DistanceSensors.ERROR_DX_NUL;
      this.lineFinders.measure();
    },
    drawObjects: function () {
      this.ledRGB.draw();
      this.DistanceSensors.draw();
      this.lineFinders.draw();
    },
    resetObjects: function () {
      this.ledRGB.reset();
      this.DistanceSensors.reset(this);
      this.lineFinders.reset();
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

    getMotorSpeed: function () {
      const setSpeed = (motor) => {
        if ($("#g1tank-" + motor + "_value").html()) {
          if ($('.g1tank-' + motor).css('animation').includes('rotation-forward')) {
            this[motor].dir = 1;
          } else if ($('.g1tank-' + motor).css('animation').includes('rotation-backward')) {
            this[motor].dir = -1;
          } else {
            this[motor].dir = 0;
          }
          const speedPercent = parseInt(($("#g1tank-" + motor + "_value").html() || "0").replace("%", ""));
          this[motor].speed = RobotSimulator.convertRPMtoSpeedMS(speedPercent / 100 * this.MAX_SPEED); // m.s-1
        }
      }
      setSpeed('motorRight');
      setSpeed('motorLeft');
    }

  }
};