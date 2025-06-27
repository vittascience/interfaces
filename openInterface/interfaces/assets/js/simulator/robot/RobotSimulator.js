const cancelAnimation_RobotSimulator =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const requestAnimation_RobotSimulator =
  window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const RobotSimulator = {
  dev_debug: false,
  wereInitialized: false,
  isRunning: false,
  isFlipping: false,
  flipProgress: 0,
  flipType: null,
  droneAltitude: 0,
  width: null,
  img: {
    background: new Image(),
    blinker: new Image()
  },
  PATH_MEDIA: `${CDN_PATH}/openInterface/interfaces/assets/media/simulator/robot`,
  canvas: null,
  ctx: null,
  animation: null,
  FPS: 20,
  recorder: null,
  isRecording: false,
  currentRobotName: null,
  robot: null,
  robotIsDragging: false,
  isForRotation: true,
  angleSliderInitialized: false,
  gyroscopeTime: 0,
  Axis: {
    isActive: false,
    isDraggable: false,
    position: null,
    vectorLength: 20
  },
  Track: {
    RATIO: 9 / 16,
    WIDTH_PX: 487.22,
    WIDTH_CM: 102,
    unit_cm: 10
  },
  Pen: {
    isActive: false,
    positions: new Array(),
    surface: 3,
    lineStroke: 8,
    color: "#ff9603"
  },
  constants: {
    ANGLE_PER_FRAME: 12,
    COLLISION_PUSH_BACK: 1
  },
  Obstacle: {
    REC_DEFAULT_WIDTH: 100,
    REC_DEFAULT_HEIGHT: 50,
    CIRCLE_DEFAULT_RADIUS: 50,
    HANDLE_RADIUS: 5,
    ROBOT_SIMULATOR_OBSTACLES: {
      "circle": [
        "buisson_rond", "eau_rond", "feu_rond", "orage_rond", "pierre_rond",
        "tornade_rond", "rond_blanc", "rond_noir", "rond_gris", "rond_violet",
        "rond_bleu", "rond_vert", "rond_jaune", "rond_orange", "rond_rouge"
      ],
      "rectangle": [
        "mur_horizontal", "mur_vertical",
        "ramp_front_3D", "ramp_back_3D", "ramp_left_3D", "ramp_right_3D", "ramp_flat_3D",
        "buisson", "eau", "feu", "orage", "pierre", "tornade",
        "rectangle_blanc", "rectangle_noir", "rectangle_gris", "rectangle_violet", "rectangle_bleu",
        "rectangle_vert", "rectangle_jaune", "rectangle_orange", "rectangle_rouge", "rectangle_violet"
      ]
    },
    obstaclesDef: Object.create(null),
    obstaclesDB: Object.create(null),
    selectedObstacleId: null,
    handles: {
      TL: { selected: false, pos: [0, 0], isPointing: false }, // [-1, -1]
      TR: { selected: false, pos: [1, 0], isPointing: false }, // [1, -1]
      BR: { selected: false, pos: [1, 1], isPointing: false }, // [1, 1]
      BL: { selected: false, pos: [0, 1], isPointing: false } // [-1, 1]
    },
    trash: {
      img: new Image(),
      OFFSET: 5,
      isPointing: false
    },
    initialize() {
      let x = 0, y = 0;
      for (const cat in this.ROBOT_SIMULATOR_OBSTACLES) {
        for (const obstacle of this.ROBOT_SIMULATOR_OBSTACLES[cat]) {
          this.obstaclesDef[obstacle] = {
            shape: cat,
            image: RobotSimulator.PATH_MEDIA + "/obstacles/" + obstacle + ".png",
            x: x * 50,
            y: y * 50,
            w: cat === "circle" ? this.CIRCLE_DEFAULT_RADIUS : this.REC_DEFAULT_WIDTH,
            h: cat === "circle" ? this.CIRCLE_DEFAULT_RADIUS : this.REC_DEFAULT_HEIGHT,
          };
          if (y == 4) {
            y = 0;
            x += 1;
          } else {
            y += 1
          }
        }
      }
    },
    drawHandles: function () {
      const obstacle = this.obstaclesDB[this.selectedObstacleId];
      if (obstacle) {
        const getOffset = (corner, axis) => {
          return this.HANDLE_RADIUS * (this.handles[corner].pos[axis] == 0 ? - 1 : 1)
        };
        const drawHandle = (corner, shadow = false) => {
          CanvasUtils.drawDisk(
            obstacle.x + this.handles[corner].pos[0] * obstacle.w + getOffset(corner, 0),
            obstacle.y + this.handles[corner].pos[1] * obstacle.h + getOffset(corner, 1),
            this.HANDLE_RADIUS,
            [0, 0, 0], shadow
          );
        }
        for (const i in this.handles) {
          drawHandle(i, this.handles[i].isPointing);
        }
      }
    },
    isPointingOnHandle: function (e, corner) {
      const obstacle = this.obstaclesDB[this.selectedObstacleId];
      const getOffset = (axis) => 2 * this.HANDLE_RADIUS * (this.handles[corner].pos[axis] == 0 ? - 1 : 1);
      const x = obstacle.x + this.handles[corner].pos[0] * obstacle.w;
      const y = obstacle.y + this.handles[corner].pos[1] * obstacle.h;
      const corners = [
        [x, y],
        [x, y + getOffset(1)],
        [x + getOffset(0), y + getOffset(1)],
        [x + getOffset(0), y]
      ];
      if (RobotSimulator.dev_debug) {
        CanvasUtils.drawDebugRectangle(corners);
      }
      const isPointing = RobotSimulator.pointIsInsidePolygon([e.offsetX, e.offsetY], corners);
      this.handles[corner].isPointing = isPointing;
      return isPointing;
    },
    drawTrash: function () {
      const obstacle = this.obstaclesDB[this.selectedObstacleId];
      const x = obstacle.x + obstacle.w / 2;
      const y = obstacle.y - this.trash.OFFSET;
      if (this.trash.isPointing) {
        CanvasUtils.drawCircle(x, y - this.trash.img.height / 2, this.trash.img.width / 2, [255, 0, 0], true);
      }
      RobotSimulator.ctx.drawImage(this.trash.img,
        x - this.trash.img.width / 2, y - this.trash.img.height,
        this.trash.img.width, this.trash.img.height);
    },
    isPointingOnTrash: function (e) {
      const obstacle = this.obstaclesDB[this.selectedObstacleId];
      const x = obstacle.x + obstacle.w / 2;
      const y = obstacle.y;
      const corners = [
        [x - this.trash.img.width / 2, y - this.trash.OFFSET],
        [x + this.trash.img.width / 2, y - this.trash.OFFSET],
        [x + this.trash.img.width / 2, y - this.trash.img.height - this.trash.OFFSET],
        [x - this.trash.img.width / 2, y - this.trash.img.height - this.trash.OFFSET]
      ];
      if (RobotSimulator.dev_debug) {
        CanvasUtils.drawDebugRectangle(corners);
      }
      const isPointing = RobotSimulator.pointIsInsidePolygon([e.offsetX, e.offsetY], corners);
      this.trash.isPointing = isPointing;
      return isPointing;
    },
    saveToLS: function () {
      const obstaclesToSave = {};
      for (const i in this.obstaclesDB) {
        const path = this.obstaclesDB[i].image;
        obstaclesToSave[i] = {
          shape: this.obstaclesDB[i].shape,
          image: path.split('/').pop(),
          x: Math.round(this.obstaclesDB[i].x),
          y: Math.round(this.obstaclesDB[i].y),
          w: Math.round(this.obstaclesDB[i].w),
          h: Math.round(this.obstaclesDB[i].h)
        }
      };
      SimulatorLS.set("obstaclesDB", JSON.stringify(obstaclesToSave))
    },
    setFromLS: function () {
      const obstaclesLS = SimulatorLS.get("obstaclesDB");
      if (obstaclesLS) {
        const obstacles = JSON.parse(obstaclesLS);
        for (const id in obstacles) {
          this.obstaclesDB[id] = Object.assign({}, obstacles[id]);
          this.obstaclesDB[id].image = RobotSimulator.PATH_MEDIA + "/obstacles/" + obstacles[id].image;
        }
      }
    }
  },

  /**
   * Initialize the robot simulator.
   */
  init: async function () {
    if (document.querySelector('#robot-sim-container') === null) {
      this.addRobotSimulatorToDom();
    }
    this.img.blinker.src = this.PATH_MEDIA + "/loupiotte.png";
    this.Obstacle.trash.img.src = this.PATH_MEDIA + "/delete.svg";
    this.img.background.crossOrigin = 'Anonymous';
    this.canvas = document.querySelector("#robot-sim");
    this.width = {
      px: this.Track.WIDTH_PX,
      cm: this.Track.WIDTH_CM
    };
    this.canvas.width = this.Track.WIDTH_PX;
    this.canvas.height = this.Track.WIDTH_PX * this.Track.RATIO;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.recorder = new Recorder(this.canvas, $("#record-button"), fileName = 'robot-simulator');
    this.Obstacle.initialize();
    this.Obstacle.setFromLS();
    this.robot = Robots[this.currentRobotName];
    // Loading the simulator background
    const savedBackground = SimulatorLS.getData(this.currentRobotName, 'backgrounds');
    if (savedBackground) {
      this.img.background.src = savedBackground;
    } else if (typeof this.robot.IMG_INITIAL_BACKGROUND !== 'undefined') {
      this.img.background.src = `${this.PATH_MEDIA}/backgrounds/${this.robot.IMG_INITIAL_BACKGROUND}`;
    } else {
      this.img.background.src = this.PATH_MEDIA + "/backgrounds/Image_circuit_terre.png";
    }
    await this.initRobotSystem();
    this.setInitialRobotPosition(this.robot.rotationCenter);
    this.setInitialRobotAngle(this.robot.angle);
    CanvasUtils.init(this.robot.POSITIVE_X_TO_RIGHT, this.robot.POSITIVE_Y_TO_UP);
    CanvasUtils.update(this.ctx, this.canvas, this.getGraphLimits());
    this.initCanvasPointers();
    $(window).on('resize', () => {
      this.resize();
    });
    this.wereInitialized = true;
    if (this.robot.resetObjects) {
      this.robot.resetObjects();
    }
    SimulatorLS.setData(this.currentRobotName, 'initialZooms', this.robot.zoom);
    this.zoomFor(this.robot.zoom);
    $("#graph-zoom-in").prop('disabled', false);
    $("#graph-zoom-in").removeClass('graph-btn-disabled');
    $("#graph-zoom-out").prop('disabled', false);
    $("#graph-zoom-out").removeClass('graph-btn-disabled');

  },

  addRobotSimulatorToDom() {
    const robotSimulatorHTML = `
    <div id="robot-sim-container" style="display: none;">
        <div id="robot-simulator">
            <canvas id="robot-sim" style="touch-action: none">
                Canvas Not Supported
            </canvas>
        </div>
        <div class="simulator-buttons my-2">
            <div class="btn-group oi-btn-group-simulator oi-option-activated">
                <!-- Not to be deleted: functionality to be implemented on interfaces
                <button id="robot-image-button" class="btn oi-btn-simulator" title="Robot image" onclick="RobotSimulator.toggleRobotImage()">
                    <i class="fa-solid fa-car-side"></i>
                </button> 
                -->
                <button id="robot-background-button" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.background" 
                        data-toggle="tooltip" data-placement="top" title="Background">
                    <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-img.svg" alt="Image icon">
                </button>
                <button id="obstacles-button" class="btn oi-btn-simulator obstacle_button" data-i18n="[title]code.simulator.buttons.robot.obstacle" 
                        data-toggle="tooltip" data-placement="top" title="Obstacles">
                    <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-bloc.svg" alt="Block icon">
                </button>
            </div>
            <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
                <button id="graph-zoom-out" class="btn oi-btn-simulator zoom_out_button" data-i18n="[title]code.simulator.buttons.robot.zoomout" 
                        data-toggle="tooltip" data-placement="top" title="Zoom out" onclick="RobotSimulator.zoomOut()">
                    <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-less.svg" alt="Zoom out icon">
                </button>
                <button id="graph-zoom-in" class="btn oi-btn-simulator zoom_in_button" data-i18n="[title]code.simulator.buttons.robot.zoomin" 
                        data-toggle="tooltip" data-placement="top" title="Zoom in" onclick="RobotSimulator.zoomIn()">
                    <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-add.svg" alt="Zoom in icon">
                </button>
            </div>
            <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
                <button id="graph-control" class="btn oi-btn-simulator graph_control_button" data-i18n="[title]code.simulator.buttons.robot.graph" 
                        data-toggle="tooltip" data-placement="top" title="Graph control" onclick="RobotSimulator.toggleGraphDisplay()">
                    <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-orthonormal.svg" alt="Graph icon">
                </button>
                <button id="pen-control" class="btn oi-btn-simulator pen_control_button" data-i18n="[title]code.simulator.buttons.robot.pen" 
                        data-toggle="tooltip" data-placement="top" title="Pen control" onclick="RobotSimulator.togglePenWriting()">
                    <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-write.svg" alt="Pen icon">
                </button>
                <button id="control-dropdown" class="btn oi-btn-simulator control_dropdown_button oi-btn-simulator-narrow" data-i18n="[title]code.simulator.buttons.robot.controls" 
                        data-toggle="tooltip" data-placement="top" title="Controls" onclick="RobotSimulator.toggleControlsDropdown()">
                    <i class="fa-solid fa-caret-up"></i>
                </button>
            </div>
            <div id="control-dropdown-container">
              <div id="control-dropdown-colors-window" class="simulator-control-window">
                <ul>
                  <li onclick='RobotSimulator.changePenColor("ffffff")'>
                    <div style="background-color:#fff;"></div>
                    <div>Blanc</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#000000")'>
                    <div style="background-color:#000;"></div>
                    <div>Noir</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#ff0000")'>
                    <div style="background-color:#f00;"></div>
                    <div>Rouge</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#00ff00")'>
                    <div style="background-color:#0f0;"></div>
                    <div>Vert</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#0000ff")'>
                    <div style="background-color:#00f;"></div>
                    <div>Bleu</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#FFFF00")'>
                    <div style="background-color:#ff0;"></div>
                    <div>Jaune</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#7f00ff")'>
                    <div style="background-color:#7f00ff;"></div>
                    <div>Violet</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#ffa500")'>
                    <div style="background-color:#ffa500;"></div>
                    <div>Orange</div>
                  </li>
                  <li onclick='RobotSimulator.changePenColor("#808080")'>
                    <div style="background-color:#808080;"></div>
                    <div>Gris</div>
                  </li>
                </ul>
              </div>
              <div id="control-dropdown-robot-angle-window" class="simulator-control-window">
                  <div class="robot-angle-slider-center">
                    <div class="robot-angle-slider">
                      <div class="angle-slider-knob">
                        <div class="angle-slider-rotator"><div class="angle-slider-text">0 °</div></div>
                        <div class="angle-slider-pointer">
                          <i class="fas fa-circle angle-slider-bullet"></i>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div id="control-dropdown-window" class="simulator-control-window">
                <button id="pen-control-erase-content" onclick="RobotSimulator.erasePenContent()">
                  <i class="fa-solid fa-eraser"></i><span data-i18n="code.simulator.buttons.robot.erase-pencil">Effacer le tracé</span>
                </button>
                <button id="pen-control-line-color" onclick="RobotSimulator.toggleColorDropdown()">
                  <i class="fa-solid fa-palette"></i><span data-i18n="code.simulator.buttons.robot.color-pencil">Couleur du tracé</span>
                </button>
                <button id="robot-control-initial-angle" onclick="RobotSimulator.toggleAnglePanel()">
                  <i class="fa-solid fa-caret-right"></i><span data-i18n="code.simulator.buttons.robot.initial-angle">Angle du robot</span>
                </button>
              </div>
            </div>
            <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
                <button id="screenshot-button" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.screenshot" 
                        data-toggle="tooltip" data-placement="top" title="Screenshot" onclick="RobotSimulator.getScreenshot()">
                    <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-photo.svg" alt="Photo icon">
                </button>
                <button id="robot-simulator-record" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.record" 
                        data-toggle="tooltip" data-placement="top" title="Record" onclick="RobotSimulator.recordVideo()">
                    <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-rec.svg" alt="Record icon" style="width: 80%;">
                </button>
            </div>
        </div>
    </div>`;
    document.querySelector("#simulator #variables-panel").insertAdjacentHTML('afterend', robotSimulatorHTML);
  },

  initRobotSystem: function () {
    return new Promise((resolve, reject) => {
      const robot_width_px = this.robot.WIDTH_CM * this.width.px / this.width.cm;
      this.robot.size = {
        width: robot_width_px,
        height: robot_width_px * this.robot.RATIO
      };
      const robotImage = new Image();
      robotImage.src = this.robot.IMG_LINK;
      this.robot.image = robotImage;
      this.robot.image.width = this.robot.size.width;
      this.robot.image.height = this.robot.size.height;
      // Project option : initial position
      let initialPosition = SimulatorLS.getData(this.currentRobotName, 'initialPositions');
      if (initialPosition) {
        initialPosition = JSON.parse(initialPosition);
      }
      if (initialPosition && initialPosition.x && initialPosition.y) {
        this.robot.rotationCenter.x = initialPosition.x;
        this.robot.rotationCenter.y = initialPosition.y;
      } else {
        this.robot.rotationCenter.x = this.robot.INITIAL_POS_PERCENT.x / 100 * this.width.px + this.getMotorCenterOffset();
        this.robot.rotationCenter.y = this.robot.INITIAL_POS_PERCENT.y / 100 * this.width.px * this.Track.RATIO;
      }
      // Project option : initial angle
      const initialAngle = parseInt(SimulatorLS.getData(this.currentRobotName, 'initialAngles'));
      this.robot.angle = initialAngle ? initialAngle : 0;
      // Project option : initial zoom
      const initialZoom = parseInt(SimulatorLS.getData(this.currentRobotName, 'initialZooms'));
      this.robot.zoom = initialZoom ? initialZoom : this.robot.INITIAL_ZOOM;
      if (this.robot.initObjects) {
        this.robot.initObjects();
      }
      resolve();
    });
  },

  resize: function () {
    const resizeScalar = $("#simulator").width() / RobotSimulator.width.px;
    // Fix robot position and dimensions after full screen
    this.robot.rotationCenter.x *= resizeScalar;
    this.robot.rotationCenter.y *= resizeScalar;
    RobotSimulator.Axis.position.x *= resizeScalar;
    RobotSimulator.Axis.position.y *= resizeScalar;
    this.robot.size.width *= resizeScalar;
    this.robot.size.height *= resizeScalar;
    this.robot.image.width = this.robot.size.width;
    this.robot.image.height = this.robot.size.height;
    // Switch robot objects to fullscreen
    if (this.robot.resizeObjects) {
      this.robot.resizeObjects(resizeScalar);
    }
    // Fix obstacles position and dimensions after full screen
    for (var i in RobotSimulator.Obstacle.obstaclesDB) {
      RobotSimulator.Obstacle.obstaclesDB[i].x *= resizeScalar;
      RobotSimulator.Obstacle.obstaclesDB[i].y *= resizeScalar;
      RobotSimulator.Obstacle.obstaclesDB[i].w *= resizeScalar;
      RobotSimulator.Obstacle.obstaclesDB[i].h *= resizeScalar;
    }
    // Update Graph
    CanvasUtils.fontSize *= resizeScalar;
    CanvasUtils.offset_text *= resizeScalar;
    RobotSimulator.Axis.vectorLength *= resizeScalar;
    // Update pen drawing
    this.Pen.surface *= resizeScalar;
    this.Pen.lineStroke *= resizeScalar;
    for (var i = 0; i < this.Pen.positions.length; i++) {
      if (this.Pen.positions[i] !== null) {
        this.Pen.positions[i].x *= resizeScalar;
        this.Pen.positions[i].y *= resizeScalar;
      }
    }
  },

  /**
   * [BUTTON] Zoom out of canvas. Rising of distances.
   */
  zoomOut: function (increment = true) {
    // save positions
    const savedPenPosition = this.getCurrentPenPositions();
    const savedRobotPosition = this.getCurrentRobotPosition();
    // update cm width
    const zoomScalar = this.width.cm / (this.width.cm + 20);
    this.width.cm += 20;
    if (increment) {
      this.robot.zoom -= 1;
      SimulatorLS.setData(this.currentRobotName, 'initialZooms', this.robot.zoom);
    }
    if (this.width.cm > 300) {
      $("#graph-zoom-out").prop('disabled', true);
      $("#graph-zoom-out").toggleClass('graph-btn-disabled');
    }
    $("#graph-zoom-in").prop('disabled', false);
    $("#graph-zoom-in").removeClass('graph-btn-disabled');
    this.zoom(zoomScalar, savedPenPosition, savedRobotPosition);
  },

  /**
   * [BUTTON] Zoom in of canvas. Decreasing of distances.
   */
  zoomIn: function (increment = true) {
    let limit = 50;
    // save objects positions
    const savedPenPosition = this.getCurrentPenPositions();
    const savedRobotPosition = this.getCurrentRobotPosition();
    // update cm width
    const zoomScalar = this.width.cm / (this.width.cm - 20);
    this.width.cm -= 20;
    if (increment) {
      this.robot.zoom += 1;
      SimulatorLS.setData(this.currentRobotName, 'initialZooms', this.robot.zoom);
    }
    if (this.width.cm < limit) {
      $("#graph-zoom-in").prop('disabled', true);
      $("#graph-zoom-in").toggleClass('graph-btn-disabled');
    }
    $("#graph-zoom-out").prop('disabled', false);
    $("#graph-zoom-out").removeClass('graph-btn-disabled');
    this.zoom(zoomScalar, savedPenPosition, savedRobotPosition);
  },

  /**
   * Update canvas with new zoom setting.
   * @param {String} zoom
   * @param {} savedPosition
   * @param {} savedRobotPosition
   */
  zoom: function (zoom, savedPosition, savedRobotPosition) {
    let penActive = false;
    if (this.Pen.isActive) {
      penActive = true;
      this.togglePenWriting();
    }
    // update robot image size
    this.robot.size.width *= zoom;
    this.robot.size.height *= zoom;
    this.Pen.surface *= zoom;
    this.Pen.lineStroke *= zoom;
    this.robot.image.width = this.robot.size.width;
    this.robot.image.height = this.robot.size.height;
    CanvasUtils.update(this.ctx, this.canvas, this.getGraphLimits());
    // translate axis center
    const axisTranslation = {
      x: this.robot.rotationCenter.x - CanvasUtils.pixel_X(savedRobotPosition.x),
      y: this.robot.rotationCenter.y - CanvasUtils.pixel_Y(savedRobotPosition.y)
    };
    this.placeGraph(this.Axis.position.x + axisTranslation.x, this.Axis.position.y + axisTranslation.y);
    // update drawing position
    this.Pen.positions = savedPosition.map((position) => {
      if (position !== null) {
        return {
          x: CanvasUtils.pixel_X(position.x) + axisTranslation.x,
          y: CanvasUtils.pixel_Y(position.y) + axisTranslation.y
        }
      } else {
        return null;
      }
    });
    if (this.robot.resizeObjects) {
      this.robot.resizeObjects(zoom);
    }
    // update running duration
    if (penActive) {
      setTimeout(() => {
        this.togglePenWriting();
      }, 100)
    }
  },

  /**
   * Transform pixel position of robot into graph position.
   * @returns {Object} robot position
   */
  getCurrentRobotPosition: function () {
    const scale = this.width.cm / this.width.px;
    return {
      x: CanvasUtils.get_X_position(this.robot.rotationCenter.x, scale),
      y: CanvasUtils.get_Y_position(this.robot.rotationCenter.y, scale)
    }
  },

  /**
   * [BUTTON] Switch robot image alphabot <> Renault scenic
   */
  toggleRobotImage: function () {
    const button = document.querySelector('#robot-image-button');
    if (!button.classList.contains('activated')) {
      button.classList.add("activated");
      const robot_width_px = this.robot.WIDTH_CM * this.width.px / this.width.cm;
      this.robot.RATIO = 480.254 / 211.64;
      this.robot.size = {
        width: robot_width_px * this.robot.RATIO,
        height: robot_width_px
      };
      for (var i = 0; i < 3; i++) {
        $("#graph-zoom-out").click();
      }
      this.newRobotImage(`${CDN_PATH}/openInterface/wb55/assets/media/simulator/robot/renault_scenic.svg`);
    } else {
      button.classList.remove("activated");
      this.robot.RATIO = 54 / 60;
      const robot_width_px = this.robot.WIDTH_CM * this.width.px / this.width.cm;
      this.robot.size = {
        width: robot_width_px,
        height: robot_width_px * this.robot.RATIO
      };
      for (var i = 0; i < 3; i++) {
        $("#graph-zoom-in").click();
      }
      this.newRobotImage(`${CDN_PATH}/openInterface/wb55/assets/media/simulator/robot/robot_alphabot2.svg`);
    }
    this.drawRobot();
  },

  /**
   * [BUTTON] Toggle graph displaying.
   */
  toggleGraphDisplay: function () {
    if (this.Axis.isActive) {
      this.Axis.isActive = false;
      $(".graph_control_button").removeClass('activated');
    } else {
      this.Axis.isActive = true;
      $(".graph_control_button").addClass('activated');
    }
  },

  /**
   * [BUTTON] Change color pencil.
   * @param {String} color
   */
  changePenColor: function (color) {
    this.Pen.color = color;
    this.toggleColorDropdown();
    this._toggleDropdown();
  },

  /**
   * [BUTTON] Toggle pencil color dropdown.
   * @param {Boolean} close
   */
  toggleColorDropdown: function (close = false) {
    $('#control-dropdown-robot-angle-window').removeClass('activated');
    if (close) {
      $('#control-dropdown-colors-window').removeClass('activated');
    } else {
      $('#control-dropdown-colors-window').toggleClass('activated');
    }
  },

  /**
   * [BUTTON] Toggle pencil color dropdown.
   */
  toggleAnglePanel: function (close = false) {
    $('#control-dropdown-colors-window').removeClass('activated');
    if (close) {
      $('#control-dropdown-robot-angle-window').removeClass('activated');
    } else {
      $('#control-dropdown-robot-angle-window').toggleClass('activated');
      if ($('#control-dropdown-robot-angle-window').hasClass('activated') && !this.angleSliderInitialized) {
        const knob = document.querySelector(".angle-slider-knob");
        let isRotating = false;
        document.addEventListener("mousedown", (e) => {
          if (e.target.closest(".angle-slider-knob")) {
            isRotating = true;
            // if (Simulator._has3DRobotSimulator() && window.Simulator3D.physics) {
            //   window.Simulator3D.physics.setRotating(true);
            // }
          }
        });
        document.addEventListener("mousemove", (e) => {
          if (isRotating) {
            const knobX = knob.getBoundingClientRect().left + knob.clientWidth / 2;
            const knobY = knob.getBoundingClientRect().top + knob.clientHeight / 2;
            const angleRad = Math.atan2(e.clientY - knobY, e.clientX - knobX);
            const angleDeg = (angleRad * 180) / Math.PI;
            const rotationAngle = (angleDeg + 360) % 360;
            if (Simulator._classicRobotSimulatorPrepareForRun){
              RobotSimulator.setInitialRobotAngle(rotationAngle);
            }
          }
        });
        document.addEventListener("mouseup", () => {
          isRotating = false;
        });
        this.angleSliderInitialized = true;
      }
    }
  },

  /**
   * Update robot angle slider and store it in simulator data of the localstorage.
   * @param {Number} angle
   */
  setInitialRobotAngle: function (angle) {
    $('.angle-slider-pointer').css('transform', `rotate(${angle - 180}deg)`);
    $(".angle-slider-text").html(`${Math.round(angle)} °`);
    if (this.robot) {
      this.robot.angle = angle;
    }
    SimulatorLS.setData(this.currentRobotName, 'initialAngles', Math.round(angle));
  },

  /**
   * Update initial robot position and store it in simulator data of the localstorage.
   * @param {Object} position
   */
  setInitialRobotPosition: function (position) {
    this.placeGraph(position.x, position.y);
    SimulatorLS.setData(this.currentRobotName, 'initialPositions', { x: Math.round(position.x), y: Math.round(position.y) }, (data) => JSON.stringify(data));
  },

  /**
   * Zoom in or zoom out depending on zoom argument.
   * @param {Number} zoom
   */
  zoomFor: function (zoom) {
    if (zoom > 0) {
      for (var i = 0; i < zoom; i++) {
        this.zoomIn(false);
      }
    } else if (zoom < 0) {
      for (var i = 0; i < Math.abs(zoom); i++) {
        this.zoomOut(false);
      }
    }
  },

  /**
   * [BUTTON] Toggle controls of robot angle and pencil dropdown. 
   */
  toggleControlsDropdown: function () {
    this.toggleColorDropdown(true);
    this.toggleAnglePanel(true);
    this._toggleDropdown();
    const erasePenButton = document.getElementById('pen-control-erase-content');
    erasePenButton.disabled = !this.Pen.isActive;
    erasePenButton.style.color = this.Pen.isActive ? 'var(--text-3)' : 'var(--text-1)';
  },

  _toggleDropdown: function () {
    $('#control-dropdown-window').toggleClass('activated');
    $('.control_dropdown_button').toggleClass('activated');
    if ($('.control_dropdown_button').hasClass('activated')) {
      $('.control_dropdown_button').html('<i class="fa-solid fa-caret-down"></i>');
    } else {
      $('.control_dropdown_button').html('<i class="fa-solid fa-caret-up"></i>');
    }
  },

  /**
   * [BUTTON] Toggle pen writing mode.
   */
  togglePenWriting: function () {
    if (this.Pen.isActive) {
      this.Pen.isActive = false;
      $(".pen_control_button").removeClass('activated');
    } else {
      this.Pen.isActive = true;
      $(".pen_control_button").addClass('activated');
    }
  },

  /**
   * [BUTTON] Erase pen content.
   */
  erasePenContent: function () {
    this.Pen.positions = new Array();
  },

  /**
   * [BUTTON] Toggle video recording, getting it in mp4 file.
   */
  recordVideo: function () {
    if (this.isRecording) {
      this.isRecording = false;
      this.recorder.stopRecording();
      this.recorder.download();
      $("#robot-simulator-record").removeClass('recording');
      $('#robot-sim').css('border-color', 'var(--bg-3)');
      $('#robot-sim').css('border-style', 'dotted');
    } else {
      this.isRecording = true;
      this.recorder.startRecording();
      $("#robot-simulator-record").addClass('recording');
      $('#robot-sim').css('border-color', 'var(--vitta-red)');
      $('#robot-sim').css('border-style', 'solid');
    }
  },

  /**
   * [BUTTON] Capture canvas area to put it in jpg file.
   */
  getScreenshot: async function () {
    return this.recorder.screenshot();
  },

  /**
   * Run robot simulator.
   */
  run: function () {
    const resetCanvas = async () => {
      setTimeout(() => {
        if (this.isRunning) {
          this.animation = requestAnimation_RobotSimulator(resetCanvas);
        } else {
          cancelAnimation_RobotSimulator(this.animation);
        }
      }, 1000 / this.FPS);
      if (this.isRunning && Simulator.isOpen) {
        this.update();
      }
    };
    requestAnimation_RobotSimulator(resetCanvas);
  },

  update: function () {
    try {
      // Reset previous width for Fullscreen
      this.width.px = $("#simulator").width();
      if (this.width.px > 0) {
        // Update background
        this.canvas.width = this.width.px;
        this.canvas.height = this.width.px * this.Track.RATIO;
        this.drawBackground();
        CanvasUtils.update(this.ctx, this.canvas, this.getGraphLimits());
        if (this.Axis.isActive || this.dev_debug) {
          // Update axis & grid
          CanvasUtils.drawAxis(this.Axis.position, CanvasUtils.getScaleFactor(this.robot.AXIS_UNIT));
          CanvasUtils.drawAxisVectors(this.Axis.position, this.Axis.vectorLength, 3.5, this.robot.color);
          CanvasUtils.drawGrid(1, 1);
        }
        // Set speed of motors
        if (!Simulator.isRunning) {
          this.robot.motorLeft.speed = 0;
          this.robot.motorRight.speed = 0;
        } else {
          this.robot.getMotorSpeed();
        }
        // Set angular speed of robot
        if (this.hasGyroscope()) {
          this.robot.updateGyroscope();
        }
        // Update pen drawning
        this.updatePenDrawing();
        // Update Robot position
        this.updateRobotPosition();
        if (this.Axis.isActive || this.dev_debug) {
          // Draw Robot position
          this.drawRobotPosition();
        }
        // Draw Obstacles
        this.drawObstacles();
        // Update Position & measure the specifics robot objects
        if (this.robot.updateObjectsPosition) {
          this.robot.updateObjectsPosition();
        }
        if (this.robot.measurements) {
          this.robot.measurements();
        }
        this.ctx.save();
        // Draw Robot
        if (this.robot.TYPE == "drone") {
          if ((this.robot.getAltitude() == 0 || isNaN(this.robot.getAltitude())) && !Simulator.Mosaic.specific.tello.isRunning) {
            this.newRobotImage(this.robot.IMG_LINK, this.robot.IMG_LINK_SHADOW);
          } else {
            this.newRobotImage(this.robot.IMG_LINK_FLYING, this.robot.IMG_LINK_SHADOW);
          }
        }
        this.drawRobot();
        this.ctx.restore();
        // Draw Handles for resizing
        if (this.Obstacle.selectedObstacleId !== null) {
          this.Obstacle.drawHandles();
          this.Obstacle.drawTrash();
        }
        // Draw specific robot objects
        if (this.robot.drawObjects) {
          this.robot.drawObjects();
        }
        if (this.dev_debug) {
          this.drawDebugObjects();
        }
        this.robot.previousAngle = this.robot.angle;
        this.gyroscopeTime = new Date();
      }
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * Place graph center in canvas.
   * @param {float} x 
   * @param {float} y 
   */
  placeGraph: function (x, y) {
    this.Axis.position = {
      x: x,
      y: y
    };
  },
  /**
   * Get graph limits in centimeter.
   * @returns {Object} axisData
   */
  getGraphLimits: function () {
    const x_cm = this.Axis.position.x * this.width.cm / this.width.px;
    const y_cm = this.Axis.position.y * this.width.cm / this.width.px;
    return {
      xmin: (this.robot.POSITIVE_X_TO_RIGHT ? -1 : 1) * x_cm / this.Track.unit_cm,
      xmax: (this.robot.POSITIVE_X_TO_RIGHT ? 1 : -1) * (this.width.cm - x_cm) / this.Track.unit_cm,
      ymin: (this.robot.POSITIVE_Y_TO_UP ? 1 : -1) * y_cm / this.Track.unit_cm,
      ymax: (this.robot.POSITIVE_Y_TO_UP ? -1 : 1) * (this.width.cm * this.Track.RATIO - y_cm) / this.Track.unit_cm
    };
  },
  /**
  * Get the polar position from robot by giving any cartesian position of canvas.
  * @param {Object} cartesianPosition 
  * @returns {Object} polarPosition
  */
  getPolarPosition: function (position) {
    const newPos = {
      x: position.x - this.getCurrentRobotPosition().x,
      y: position.y - this.getCurrentRobotPosition().y
    };
    return {
      r: Math.sqrt(Math.pow(newPos.x, 2) + Math.pow(newPos.y, 2)),
      theta: radToDeg(Math.atan2(newPos.y, newPos.x))
    };
  },
  getPositionByDistance: function (origin, distance_cm) {
    return {
      x: origin.x + distance_cm * Math.cos(degToRad(this.robot.angle)) * this.width.px / this.width.cm,
      y: origin.y + distance_cm * Math.sin(degToRad(this.robot.angle)) * this.width.px / this.width.cm
    };
  },
  /**
   * Get the offset between robot center and robot rotation center in pixel.
   * @returns {float}
   */
  getMotorCenterOffset: function () {
    return this.robot.WHEELS_X_POSITION * this.width.px / this.width.cm;
  },
  /**
   * Get the offset between robot rotation center and ultrasonic sensor position in pixel.
   * @returns {float}
   */
  translateToSensor: function () {
    return RobotSimulator.robot.size.width / 2 - RobotSimulator.getMotorCenterOffset();
  },
  /**
   * Restart robot.
   */
  restartRobot: function () {
    if (Main.getInterface() == "TI-83") {
      Simulator.Mosaic.specific.rover.stopMotors();
      Simulator.Mosaic.specific.tello.stopMotors();
    } else if (Main.getInterface() == "buddy") {
      Simulator.Mosaic.specific.buddy.stopMotors();
    }
    this.gyroscopeTime = 0;
    this.isForRotation = true;
    this.robot.rotationCenter.x = this.Axis.position.x;
    this.robot.rotationCenter.y = this.Axis.position.y;
    if (this.robot.TYPE == "drone") {
      this.robot.setAltitude(0);
      this.newRobotImage(this.robot.IMG_LINK, this.robot.IMG_LINK_SHADOW);
      this.drawRobot();
    }
    const initialAngle = parseInt(SimulatorLS.getData(this.currentRobotName, 'initialAngles'));
    this.robot.angle = initialAngle ? initialAngle : 0;
    this.robot.previousAngle = initialAngle;
    this.robot.motorLeft = {
      speed: 0,
      dir: 0
    };
    this.robot.motorRight = {
      speed: 0,
      dir: 0
    };
    if (this.robot.setMotorsInModules) {
      this.robot.setMotorsInModules(0, 0);
    }
  },

  getCanvasCorners: function () {
    return [
      { x: 0, y: 0 },
      { x: this.width.px, y: 0 },
      { x: this.width.px, y: this.width.px * this.Track.RATIO },
      { x: 0, y: this.width.px * this.Track.RATIO }
    ];
  },

  _getFrameDelay() {
    const _delay = (typeof this.lastDate !== 'undefined' ? (Date.now() - this.lastDate) / 1000 : 0);
    if (!this.delay || _delay >= 1) {
      this.delay = 0.05;
    } else {
      this.delay = _delay;
    }
    this.lastDate = Date.now();
    return this.delay;
  },

  convertRPMtoSpeedMS(rpm) {
    return 2 * Math.PI * this.robot.WHEELS_DIAMETER / 2 * 1e-2 * rpm / 60;
  },

  convertSpeedMStoRPM(speed_ms) {
    return speed_ms * 60 * 100 * 2 / this.robot.WHEELS_DIAMETER / (2 * Math.PI)
  },

  updateRobotPosition: function () {
    const frameDelay = this._getFrameDelay();
    // Calculates Average and Rotational Speed
    const moduleSpeed = (this.robot.motorLeft.speed * this.robot.motorLeft.dir + this.robot.motorRight.speed * this.robot.motorRight.dir) / 2;
    const pxToMove = moduleSpeed * 1e2 * this.width.px / this.width.cm * frameDelay;

    // need to find a proper way to handle the case when the robot angle is NaN (don't know why and where it happens yet), but it breaks the simulator at update position (rotationCenter.x and y is NaN)
    if (isNaN(this.robot.angle)) {
      this.restartRobot();
      Simulator.replay();
    }
    // Update robot position
    if (!this.checkingCanvasRobotCollisions() && !this.checkObstacleCollisions()) {
      if (this.robot.TYPE == "robot" || this.robot.angle == this.robot.previousAngle) {
        if (this.robot.TYPE == "drone") {
          this.updateDronePosition(pxToMove);
        } else if (this.robot.TYPE == "translation-robot") {
          this.updateTranslationRobotPosition(pxToMove);
        } else {
          this.robot.rotationCenter.x += pxToMove * Math.cos(degToRad(this.robot.angle));
          this.robot.rotationCenter.y += pxToMove * Math.sin(degToRad(this.robot.angle));
        }
      }
    }
    // Update angle of robot
    if (this.isForRotation && this.robot.TYPE != "drone") {
      let rotationalSpeed = (this.robot.motorLeft.speed * this.robot.motorLeft.dir - this.robot.motorRight.speed * this.robot.motorRight.dir) / 2;
      this.robot.angularSpeed = radToDeg(rotationalSpeed / (this.robot.WHEELS_CENTER_RADIUS * 1e-2));
      this.robot.angle += this.robot.angularSpeed * frameDelay;
      this.robot.angle %= 360;
    }
  },

  delayOnMovement: function (duration_ms, onFinishCB = null, waiting = true, timeoutSupply = 0) {
    const id = randHex();
    const finish = () => {
      delete Simulator.currentTimeouts[id];
      RobotSimulator.robot.setMotorsInModules(0, 0);
      if (onFinishCB) onFinishCB();
    };
    if (waiting) {
      return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
        Simulator.clearCurrentDelay = resolve;
        Simulator.currentTimeouts[id] = setTimeout(() => {
          Simulator.clearCurrentDelay = null;
          finish();
          if (timeoutSupply) {
            Simulator.currentTimeouts[id] = setTimeout(() => {
              delete Simulator.currentTimeouts[id];
              resolve(Sk.builtin.none());
            }, timeoutSupply);
          } else {
            resolve(Sk.builtin.none());
          }
        }, duration_ms);
      }));
    } else {
      // Check in real each robot bahavior if command pass over another command after waiting = false
      Simulator.currentTimeouts[id] = setTimeout(() => {
        finish();
      }, duration_ms);
      return Sk.builtin.none();
    }
  },

  updateDronePosition: function (pxToMove) {
    if (this.robot.DIRECTION.includes("fly")) {
      const angle = (360 + this.robot.angle) % 360;
      if (this.robot.DIRECTION == "fly_right") {
        this.robot.rotationCenter.x -= pxToMove * Math.sin(degToRad(angle));
        this.robot.rotationCenter.y += pxToMove * Math.cos(degToRad(angle));
      } else if (this.robot.DIRECTION == "fly_left") {
        this.robot.rotationCenter.x += pxToMove * Math.sin(degToRad(angle));
        this.robot.rotationCenter.y -= pxToMove * Math.cos(degToRad(angle));
      }
    } else if (this.robot.DIRECTION.includes("flip")) {
      if (this.robot.DIRECTION === 'flip_b' || this.robot.DIRECTION === 'flip_f') {
        this.flipType = 'parallels';
        if (this.isFlipping) {
          if (this.robot.DIRECTION === 'flip_b') {
            this.robot.rotationCenter.x -= 0.4;
          } else {
            this.robot.rotationCenter.x += 0.4;
          }
        }
      } else {
        this.flipType = 'meridians';
        if (this.isFlipping) {
          if (this.robot.DIRECTION === 'flip_r') {
            this.robot.rotationCenter.y += 0.4;
          } else {
            this.robot.rotationCenter.y -= 0.4;
          }
        }
      }
    } else {
      this.robot.rotationCenter.x += pxToMove * Math.cos(degToRad(this.robot.angle));
      this.robot.rotationCenter.y += pxToMove * Math.sin(degToRad(this.robot.angle));
    }
  },

  updateTranslationRobotPosition: function (pxToMove) {
    if (this.robot.DIRECTION.includes("translate")) {
      const angle = (360 + this.robot.angle) % 360;
      if (this.robot.DIRECTION == "translate_right") {
        this.robot.rotationCenter.x -= pxToMove * Math.sin(degToRad(angle));
        this.robot.rotationCenter.y += pxToMove * Math.cos(degToRad(angle));
      } else if (this.robot.DIRECTION == "translate_left") {
        this.robot.rotationCenter.x += pxToMove * Math.sin(degToRad(angle));
        this.robot.rotationCenter.y -= pxToMove * Math.cos(degToRad(angle));
      }
    } else {
      this.robot.rotationCenter.x += pxToMove * Math.cos(degToRad(this.robot.angle));
      this.robot.rotationCenter.y += pxToMove * Math.sin(degToRad(this.robot.angle));
    }
  },

  /*
  * Draw the robot countours on the canvas
  * @param {Object} robot corners
  * @description Draw the robot countours on the canvas => usefull for collision detection and debug (to use with checkingCanvasRobotCollisions())
  */
  checkRobotContourCollisions: function (corners) {
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    this.ctx.moveTo(corners[0][0], corners[0][1]);

    for (let i = 1; i < corners.length; i++) {
      this.ctx.lineTo(corners[i][0], corners[i][1]);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.stroke();
    this.ctx.save();
  },

  checkingCanvasRobotCollisions: function () {
    const robotCorners = this.getRobotCorners();
    const canvasCorners = this.getCanvasCorners();
    const getPoint = function (point) {
      return { x: point[0], y: point[1] };
    };
    let isTouchingSide = false;
    for (var c = 0; c < canvasCorners.length; c++) {
      let cb = c + 1;
      if (cb == 4) cb = 0;
      for (var r = 0; r < robotCorners.length; r++) {
        let rb = r + 1;
        if (rb == 4) rb = 0;
        const intersectionPoint = getLinesIntersectionPoint(
          canvasCorners[c], canvasCorners[cb],
          getPoint(robotCorners[r]), getPoint(robotCorners[rb])
        );
        if (intersectionPoint !== null) {
          isTouchingSide = true;
          // thymio colision onEvent
          if (INTERFACE_NAME === 'thymio') {
            Simulator.Mosaic.specific.onEvent.collisionEvent();
          }
          if (RobotSimulator.robot.TYPE == "robot")
            this.moveRobotWithCollision(c);
          else
            this.moveDroneWithCollision(c);
          break;
        }
      }
      if (isTouchingSide) break;
    }
    return isTouchingSide;
  },

  moveDroneWithCollision: function (c) {
    if (c == 0) {
      this.robot.rotationCenter.y += this.constants.COLLISION_PUSH_BACK;
    } else if (c == 2) {
      this.robot.rotationCenter.y -= this.constants.COLLISION_PUSH_BACK;
    } else if (c == 1) {
      this.robot.rotationCenter.x -= this.constants.COLLISION_PUSH_BACK;
    } else if (c == 3) {
      this.robot.rotationCenter.x += this.constants.COLLISION_PUSH_BACK;
    }
  },

  moveRobotWithCollision: function (c) {
    const headToTR = (this.robot.angle >= 270 && this.robot.angle < 360) || (this.robot.angle >= -90 && this.robot.angle < 0);
    const headToTL = (this.robot.angle >= 180 && this.robot.angle < 270) || (this.robot.angle >= -180 && this.robot.angle < -90);
    const headToBL = (this.robot.angle >= 90 && this.robot.angle < 180) || (this.robot.angle >= -270 && this.robot.angle < -180);
    const headToBR = (this.robot.angle >= 0 && this.robot.angle < 90) || (this.robot.angle > -360 && this.robot.angle < -270);
    if (headToTR || headToBL) {
      const verticalOrientation = this.robot.angle !== 270 && this.robot.angle !== -90 && this.robot.angle !== 90 && this.robot.angle !== -270;
      if (c == 0 || c == 1 || ((c == 'bottom' || c == 'left') && headToTR)) {
        if (verticalOrientation) {
          this.robot.rotationCenter.x -= this.constants.COLLISION_PUSH_BACK;
        }
        this.robot.rotationCenter.y += this.constants.COLLISION_PUSH_BACK;
      } else if (c == 2 || c == 3 || ((c == 'top' || c == 'right') && headToBL)) {
        if (verticalOrientation) {
          this.robot.rotationCenter.x += this.constants.COLLISION_PUSH_BACK;
        }
        this.robot.rotationCenter.y -= this.constants.COLLISION_PUSH_BACK;
      }
    } else if (headToTL || headToBR) {
      const horizontalOrientation = this.robot.angle !== 180 && this.robot.angle !== -180 && this.robot.angle !== 0 && this.robot.angle !== -360;
      if (c == 0 || c == 3 || ((c == 'bottom' || c == 'right')/* && headToTL*/)) {
        this.robot.rotationCenter.x -= this.constants.COLLISION_PUSH_BACK;
        if (horizontalOrientation) {
          this.robot.rotationCenter.y += this.constants.COLLISION_PUSH_BACK;
        }
      } else if (c == 1 || c == 2 || ((c == 'left' || c == 'top')/* && headToBR*/)) {
        this.robot.rotationCenter.x -= this.constants.COLLISION_PUSH_BACK;
        if (horizontalOrientation) {
          this.robot.rotationCenter.y -= this.constants.COLLISION_PUSH_BACK;
        }
      }
    }
  },

  updatePenDrawing: function () {
    if (this.Pen.isActive) {
      if (!this.robotIsDragging && !this.Axis.isDraggable) {
        const newPosition = {
          x: this.robot.rotationCenter.x,
          y: this.robot.rotationCenter.y
        };
        if (!this.Pen.positions.at(-1) || !(newPosition.x == this.Pen.positions.at(-1).x && newPosition.y == this.Pen.positions.at(-1).y)) {
          this.Pen.positions.push(newPosition);
        }
      } else if (this.Pen.positions.length > 0 && this.Pen.positions.at(-1) !== null) {
        this.Pen.positions.push(null);
      }
      this.drawPenPoints();
    } else if (this.Pen.positions.length > 0 && this.Pen.positions.at(-1) !== null) {
      this.Pen.positions.push(null);
    }
  },

  convertHexToRGB: function (hex) {
    return hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
  },

  drawPenPoints: function () {
    this.ctx.save();
    const rgbColor = this.convertHexToRGB(this.Pen.color);
    this.ctx.strokeStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    this.ctx.lineWidth = this.Pen.lineStroke;
    for (var i = 0; i < this.Pen.positions.length; i++) {
      const posA = this.Pen.positions[i];
      const posB = this.Pen.positions[i + 1];
      if (posA !== null && posB !== null) {
        if (posB !== undefined) {
          CanvasUtils.drawLine(posA.x, posB.x, posA.y, posB.y);
        }
        CanvasUtils.drawDisk(posA.x, posA.y, this.Pen.surface, [rgbColor[0], rgbColor[1], rgbColor[2]]);
      } else if (posA !== null && posB === null) {
        CanvasUtils.drawDisk(posA.x, posA.y, this.Pen.surface, [rgbColor[0], rgbColor[1], rgbColor[2]]);
      } else if (posA == null && posB !== null) {
        if (posB !== undefined) {
          CanvasUtils.drawDisk(posB.x, posB.y, this.Pen.surface, [rgbColor[0], rgbColor[1], rgbColor[2]]);
        }
      }
    }
    this.ctx.restore();
  },

  getCurrentPenPositions: function () {
    const scale = this.width.cm / this.width.px;
    return this.Pen.positions.map((position) => {
      if (position !== null) {
        return {
          x: CanvasUtils.get_X_position(position.x, scale),
          y: CanvasUtils.get_Y_position(position.y, scale)
        }
      } else {
        return null;
      }
    });
  },

  hasGyroscope: function () {
    let hasGyro = false;
    if (typeof this.robot.mosaicId != 'undefined') {
      if (this.robot.mosaicId['gyroscope-speed'] && $('#' + this.robot.mosaicId['gyroscope-speed'].id).length > 0) {
        hasGyro = true;
      }
      if (this.robot.mosaicId['gyroscope-angle'] && $('#' + this.robot.mosaicId['gyroscope-angle'].id).length > 0) {
        hasGyro = true;
      }
    }
    return hasGyro;
  },

  checkCollision: function (shape1, shape2) {
    const edges1 = shape1.getEdges();
    const edges2 = shape2.getEdges();
    for (const i in edges1) {
      for (const j in edges2) {
        const intersection = getLinesIntersectionPoint(edges1[i][0], edges1[i][1], edges2[j][0], edges2[j][1]);
        if (intersection) return i;
      }
    }
  },

  checkObstacleCollisions: function () {
    this.robot.angle += 1e-3;
    const robotForm = new Shape(this.robot.rotationCenter.x, this.robot.rotationCenter.y, this.robot.size.width, this.robot.size.height, this.robot.angle, -this.getMotorCenterOffset());
    for (const i in this.Obstacle.obstaclesDB) {
      const obstacle = this.Obstacle.obstaclesDB[i];
      const obstacleCenter = {
        x: obstacle.x + obstacle.w / 2,
        y: obstacle.y + obstacle.h / 2
      };
      let sideCollision;
      if (obstacle.shape == 'circle') {
        const obstacleForm = new Circle(obstacleCenter.x, obstacleCenter.y, obstacle.w / 2);
        sideCollision = obstacleForm.checkCollisionWithRectangle(robotForm);
      } else {
        const obstacleForm = new Shape(obstacleCenter.x, obstacleCenter.y, obstacle.w, obstacle.h, 0);
        sideCollision = this.checkCollision(robotForm, obstacleForm);
      }
      if (sideCollision) {
        if (INTERFACE_NAME === 'thymio') {
          Simulator.Mosaic.specific.onEvent.collisionEvent();
        }
        this.moveRobotWithCollision(sideCollision);
        return true;
      }
    }
    this.robot.angle -= 1e-3;
    return false;
  },

  drawDebugObjects: function () {
    const robotCorners = RobotSimulator.getRobotCorners();
    CanvasUtils.drawDebugRectangle(robotCorners);
    for (const i in this.Obstacle.obstaclesDB) {
      if (this.Obstacle.obstaclesDB[i].shape == 'rectangle') {
        const obstacleCorners = RobotSimulator.getRectangleCorners({
          x: this.Obstacle.obstaclesDB[i].x + this.Obstacle.obstaclesDB[i].w / 2, y: this.Obstacle.obstaclesDB[i].y + this.Obstacle.obstaclesDB[i].h / 2
        }, {
          w: this.Obstacle.obstaclesDB[i].w, h: this.Obstacle.obstaclesDB[i].h
        }, {
          x: 0, y: 0
        });
        CanvasUtils.drawDebugRectangle(obstacleCorners);
      } else {
        CanvasUtils.drawDebugCircle(
          this.Obstacle.obstaclesDB[i].x + this.Obstacle.obstaclesDB[i].w / 2,
          this.Obstacle.obstaclesDB[i].y + this.Obstacle.obstaclesDB[i].h / 2,
          this.Obstacle.obstaclesDB[i].h / 2
        );
      }
    }
  },

  drawBackground: function () {
    this.ctx.drawImage(this.img.background, 0, 0, this.canvas.width, this.canvas.height);
  },

  updateDroneFlip: function (ctx) {
    let progressAngleInRadians = this.flipProgress * (Math.PI / 180);

    const scale = Math.cos(progressAngleInRadians);
    if (this.flipType === "parallels") {
      ctx.scale(scale, 1);
    } else {
      ctx.scale(1, scale);
    }
    this.flipProgress += 30; // 35 is the speed of the flip animation
    if (this.flipProgress >= 360) {
      this.isFlipping = false; // Stop the flip animation
      progressAngleInRadians = 0;
      this.flipType = null;
      ctx.scale(1, 1);
    }
  },

  drawRobot: function () {
    this.ctx.translate(this.robot.rotationCenter.x, this.robot.rotationCenter.y);
    this.ctx.rotate(degToRad(this.robot.angle));

    if (this.isFlipping) {
      this.updateDroneFlip(this.ctx)
    }

    if (this.robot.shadow) {
      this.ctx.globalAlpha = 0 + this.droneAltitude / 100;
      this.ctx.drawImage(
        this.robot.shadow,
        -(this.robot.shadow.width / 2 + this.getMotorCenterOffset()),
        -(this.robot.shadow.height / 2),
        this.robot.shadow.width,
        this.robot.shadow.height
      );

    }

    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(
      this.robot.image,
      -(this.robot.image.width / 2 + this.getMotorCenterOffset()),
      -(this.robot.image.height / 2),
      this.robot.image.width,
      this.robot.image.height
    );
  },

  newRobotImage: function (src, shadow) {
    let robotImage = new Image();
    robotImage.src = src;
    this.robot.image = robotImage;
    this.robot.image.width = this.robot.size.width;
    this.robot.image.height = this.robot.size.height;
    if (shadow) {
      let robotShadowImage = new Image();
      robotShadowImage.src = shadow;
      this.robot.shadow = robotShadowImage;
      this.robot.shadow.width = this.robot.size.width;
      this.robot.shadow.height = this.robot.size.height;
    }
  },

  drawObstacles: function () {
    for (var id in this.Obstacle.obstaclesDB) {
      const obstacle = this.Obstacle.obstaclesDB[id];
      if (obstacle) {
        const obstacleImage = new Image();
        obstacleImage.src = obstacle.image;
        obstacleImage.crossOrigin = 'Anonymous';
        RobotSimulator.ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      }
    };
  },

  drawRobotPosition: function () {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(50, 50, 50, 0.6)";
    const robotPos = this.getCurrentRobotPosition();
    const x_pos = roundFloat(robotPos.x * CanvasUtils.getScaleFactor(this.robot.AXIS_UNIT)).toFixed(2);
    const y_pos = roundFloat(robotPos.y * CanvasUtils.getScaleFactor(this.robot.AXIS_UNIT)).toFixed(2);
    const label = "(x = " + x_pos + "; y = " + y_pos + ") [" + this.robot.AXIS_UNIT + "]";
    CanvasUtils.writeText(label, this.width.px - this.ctx.measureText(label).width - 10, 0.96 * this.width.px * this.Track.RATIO);
    this.ctx.restore();
  },

  initCanvasPointers: function () {

    this.canvas.onpointerup = (e) => {
      this.Obstacle.isDraggable = false;
      this.robotIsDragging = false;
      this.Axis.isDraggable = false;
      for (var i in this.Obstacle.handles) {
        if (this.Obstacle.handles[i].selected) {
          this.Obstacle.saveToLS();
        }
        this.Obstacle.handles[i].selected = false;
      }
      // Delete Obstacle
      if (this.Obstacle.selectedObstacleId && !this.robotIsDragging &&
        this.Obstacle.isPointingOnTrash(e)) {
        delete this.Obstacle.obstaclesDB[this.Obstacle.selectedObstacleId];
        this.Obstacle.selectedObstacleId = null;
      }
    };

    this.canvas.onpointerout = () => {
      this.Obstacle.isDraggable = false;
      this.Obstacle.trash.isPointing = false;
      this.robotIsDragging = false;
      this.Axis.isDraggable = false;
    };

    this.canvas.onpointerdown = (e) => {
      if (this.isPointingOnRobot(e)) {
        this.robotIsDragging = true;
        this.Axis.isDraggable = false;
        this.Obstacle.selectedObstacleId = null;
      } else if (this.isPointingOnAxisCenter(e)) {
        this.robotIsDragging = false;
        this.Axis.isDraggable = true;
        this.Obstacle.selectedObstacleId = null;
      } else {
        let isSelecting = false;
        for (var id in this.Obstacle.obstaclesDB) {
          if (this.isPointingOnObstacle(e, id)) {
            this.Obstacle.isDraggable = true;
            this.Obstacle.selectedObstacleId = id;
            isSelecting = true;
            break;
          }
        }
        // Check if handles are clicked
        if (this.Obstacle.selectedObstacleId) {
          Object.keys(this.Obstacle.handles).forEach(corner => {
            if (this.Obstacle.isPointingOnHandle(e, corner)) {
              this.Obstacle.handles[corner].selected = true;
            }
          });
          if (!isSelecting &&
            !this.Obstacle.isPointingOnHandle(e, 'TL') &&
            !this.Obstacle.isPointingOnHandle(e, 'TR') &&
            !this.Obstacle.isPointingOnHandle(e, 'BL') &&
            !this.Obstacle.isPointingOnHandle(e, 'BR') &&
            !this.isPointingOnObstacle(e, this.Obstacle.selectedObstacleId) &&
            !this.Obstacle.isPointingOnTrash(e)) {
            this.Obstacle.selectedObstacleId = null;
          }
        }
      }
    };

    this.canvas.onpointermove = (e) => {
      // Move Robot or obstacle
      if (this.robotIsDragging) {
        this.robot.rotationCenter.x = e.offsetX - this.robot.size.width / 2;
        this.robot.rotationCenter.y = e.offsetY - this.robot.size.height / 2;
        this.Obstacle.isDraggable = false;
        this.Axis.isDraggable = false;
        if (!Simulator.isRunning) {
          this.setInitialRobotPosition(this.robot.rotationCenter);
        }
      } else if (this.Axis.isDraggable) {
        this.Obstacle.isDraggable = false;
        const axisTranslation = {
          x: e.offsetX - this.Axis.position.x,
          y: e.offsetY - this.Axis.position.y
        };
        this.setInitialRobotPosition({ x: e.offsetX, y: e.offsetY });
        this.Pen.positions = this.Pen.positions.map((position) => {
          if (position !== null) {
            return {
              x: position.x + axisTranslation.x,
              y: position.y + axisTranslation.y
            }
          } else {
            return null;
          }
        });
      }
      this.canvas.style.cursor = "default";
      if (this.isPointingOnRobot(e) || (this.Axis.isActive && this.isPointingOnAxisCenter(e))) {
        this.canvas.style.cursor = "move";
      } else {
        for (const id in this.Obstacle.obstaclesDB) {
          if (this.isPointingOnObstacle(e, id)) {
            this.canvas.style.cursor = "move";
          }
        }
        if (this.Obstacle.isDraggable) {
          const selectedObstacleId = this.Obstacle.obstaclesDB[this.Obstacle.selectedObstacleId];
          selectedObstacleId.x = e.offsetX - selectedObstacleId.w / 2;
          selectedObstacleId.y = e.offsetY - selectedObstacleId.h / 2;
        }

        // Resize Obstacle
        if (this.Obstacle.selectedObstacleId) {
          Object.keys(this.Obstacle.handles).forEach(corner => {
            if (this.Obstacle.isPointingOnHandle(e, corner)) {
              this.canvas.style.cursor = "move";
            }
          });
          if (this.Obstacle.isPointingOnTrash(e)) {
            this.canvas.style.cursor = "move";
          }
          const obstacle = RobotSimulator.Obstacle.obstaclesDB[this.Obstacle.selectedObstacleId];
          if (this.Obstacle.handles['TL'].selected) {
            obstacle.w += obstacle.x - e.offsetX;
            obstacle.h += obstacle.y - e.offsetY;
            obstacle.x = e.offsetX;
            obstacle.y = e.offsetY;
          } else if (this.Obstacle.handles['TR'].selected) {
            obstacle.w = Math.abs(obstacle.x - e.offsetX);
            obstacle.h += obstacle.y - e.offsetY;
            obstacle.y = e.offsetY;
          } else if (this.Obstacle.handles['BL'].selected) {
            obstacle.w += obstacle.x - e.offsetX;
            obstacle.h = Math.abs(obstacle.y - e.offsetY);
            obstacle.x = e.offsetX;
          } else if (this.Obstacle.handles['BR'].selected) {
            obstacle.w = Math.abs(obstacle.x - e.offsetX);
            obstacle.h = Math.abs(obstacle.y - e.offsetY);
          }
        }
      }
    };

  },

  pointIsInsidePolygon: function (point, polygonCorners) {
    let inside = false;
    for (var i = 0, j = polygonCorners.length - 1; i < polygonCorners.length; j = i++) {
      const xi = polygonCorners[i][0], yi = polygonCorners[i][1];
      const xj = polygonCorners[j][0], yj = polygonCorners[j][1];
      if (((yi > point[1]) != (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  },

  getRectangleCorners: function (rectangleCenter, rectangleSize, rotationCenter, angle = 0) {
    const corners = {
      bl: {
        x: rectangleCenter.x - rectangleSize.w / 2,
        y: rectangleCenter.y + rectangleSize.h / 2
      },
      br: {
        x: rectangleCenter.x + rectangleSize.w / 2,
        y: rectangleCenter.y + rectangleSize.h / 2
      },
      tr: {
        x: rectangleCenter.x + rectangleSize.w / 2,
        y: rectangleCenter.y - rectangleSize.h / 2
      },
      tl: {
        x: rectangleCenter.x - rectangleSize.w / 2,
        y: rectangleCenter.y - rectangleSize.h / 2
      }
    };
    return Object.keys(corners).map((value, index) =>
      getPointAfterRotation(corners[value].x, corners[value].y, degToRad(angle), rotationCenter.x, rotationCenter.y)
    );
  },

  getRobotCorners: function () {
    let center;
    let image;
    switch (RobotSimulator.currentRobotName) {
      case 'Rover':
        center = {
          x: RobotSimulator.robot.rotationCenter.x,
          y: RobotSimulator.robot.rotationCenter.y
        };
        image = {
          w: RobotSimulator.robot.image.width * 0.4,
          h: RobotSimulator.robot.image.height
        };
        break;
      case 'lotibot':
        center = {
          x: RobotSimulator.robot.rotationCenter.x,
          y: RobotSimulator.robot.rotationCenter.y
        };
        image = {
          w: RobotSimulator.robot.image.width * 0.5,
          h: RobotSimulator.robot.image.height * 0.5
        };
        break;
      default:
        center = {
          x: RobotSimulator.robot.rotationCenter.x - RobotSimulator.getMotorCenterOffset(),
          y: RobotSimulator.robot.rotationCenter.y
        };
        image = {
          w: RobotSimulator.robot.image.width,
          h: RobotSimulator.robot.image.height
        };
        break;
    };
    return RobotSimulator.getRectangleCorners(center, image, RobotSimulator.robot.rotationCenter, RobotSimulator.robot.angle);
  },

  isPointingOnRobot: function (e) {
    const corners = RobotSimulator.getRobotCorners();
    return RobotSimulator.pointIsInsidePolygon([e.offsetX, e.offsetY], corners);
  },

  isPointingOnObstacle: function (e, id) {
    const obstacle = RobotSimulator.Obstacle.obstaclesDB[id];
    return (
      e.offsetX < obstacle.x + obstacle.w && e.offsetX > obstacle.x &&
      e.offsetY < obstacle.y + obstacle.h && e.offsetY > obstacle.y
    );
  },

  isPointingOnAxisCenter: function (e) {
    return (
      e.offsetX <= RobotSimulator.Axis.position.x + 15 &&
      e.offsetX >= RobotSimulator.Axis.position.x - 15 &&
      e.offsetY <= RobotSimulator.Axis.position.y + 15 &&
      e.offsetY >= RobotSimulator.Axis.position.y - 15
    );
  }

};

var CanvasUtils = {
  XPIXELS: null,
  YPIXELS: null,
  ctx: null,
  data: null,
  positiveX_toRight_factor: null,
  positiveY_toUp_factor: null,
  fontSize: 12,
  offset_text: 12,
  init: function (x_to_right, y_to_up) {
    this.positiveX_toRight_factor = x_to_right ? 1 : -1;
    this.positiveY_toUp_factor = y_to_up ? -1 : 1;
  },
  update: function (ctx, canvas, axisData) {
    this.XPIXELS = canvas.width;
    this.YPIXELS = canvas.height;
    this.ctx = ctx;
    this.data = axisData;
  },
  convertPixelCm: function (value, axis, scale) {
    if (axis == 'x') {
      return value * scale;
    } else if (axis == 'y') {
      return value * scale;
    }
  },
  pixel_X: function (value) {
    return (value - this.data.xmin) * this.XPIXELS / (this.data.xmax - this.data.xmin);
  },
  pixel_Y: function (value) {
    return this.YPIXELS * (1 - (value - this.data.ymax) / (this.data.ymin - this.data.ymax));
  },
  get_X_position: function (value, scale) {
    return this.data.xmin + this.positiveX_toRight_factor * value * scale / 10;
  },
  get_Y_position: function (value, scale) {
    return this.data.ymin + this.positiveY_toUp_factor * value * scale / 10;
  },
  getScaleFactor: function (unit) {
    switch (unit) {
      case 'm':
        return 1 / 10;
      case 'dm':
      case 'unit':
        return 1;
      case 'mm':
        return 100;
      case 'cm':
      default:
        return 10;
    }
  },
  writeText: function (text, x, y) {
    this.ctx.font = 'bolder ' + parseInt(this.fontSize) + 'px Ubuntu Mono';
    this.ctx.fillText(text, x, y);
  },
  drawLine: function (from_x, to_x, from_y, to_y) {
    this.ctx.beginPath();
    this.ctx.moveTo(from_x, from_y);
    this.ctx.lineTo(to_x, to_y);
    this.ctx.stroke();
  },
  drawDisk: function (x, y, surface, color = [0, 0, 0], shadow = false) {
    this.ctx.moveTo(0, 0);
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.ctx.arc(x, y, surface, 0, 2 * Math.PI);
    if (shadow) {
      this.ctx.save();
      this.ctx.lineWidth = surface / 2;
      this.ctx.shadowColor = '#fdfdfd';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowOffsetX = 0;
      this.ctx.stroke();
      this.ctx.restore();
    }
    this.ctx.fill();
  },
  drawCircle: function (x, y, radius, color = [0, 0, 0], shadow = false, lineWidth = 2) {
    this.ctx.save();
    this.ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (shadow) {
      this.ctx.shadowColor = '#fdfdfd';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowOffsetX = 0;
    }
    this.ctx.stroke();
    this.ctx.restore();
  },
  drawVector: function (xA, yA, xB, yB) {
    const arrowLength = 8;
    const arrowWidth = 6;
    const AB = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
    xC = xB + arrowLength * (xA - xB) / AB;
    yC = yB + arrowLength * (yA - yB) / AB;
    xD = xC + arrowWidth * (-(yB - yA)) / AB;
    yD = yC + arrowWidth * ((xB - xA)) / AB;
    xE = xC - arrowWidth * (-(yB - yA)) / AB;
    yE = yC - arrowWidth * ((xB - xA)) / AB;
    this.drawLine(xA, xB, yA, yB);
    this.drawLine(xB, xD, yB, yD);
    this.drawLine(xB, xE, yB, yE);
  },
  drawAxis: function (position, factor = 1) {
    // Draw Axis
    if (this.ctx.lineWidth == 1) this.ctx.lineWidth = 2;
    let x_pos = position.x;
    let y_pos = position.y;
    this.drawLine(x_pos, x_pos, 0, this.YPIXELS);
    this.drawLine(0, this.XPIXELS, y_pos, y_pos);
    // Draw the min/max labels of axis
    y_pos = y_pos + this.offset_text;
    if (y_pos > this.YPIXELS - 2) y_pos = 0;
    if (y_pos < 0) y_pos = this.YPIXELS - 2;
    if (this.data.ymin > 0) y_pos = this.YPIXELS - 30;
    this.writeText(roundFloat(this.data.xmin * factor), 0, y_pos);
    const xmax_x_pos = this.XPIXELS - this.ctx.measureText(roundFloat(this.data.xmax * factor)).width - 6;
    this.writeText(roundFloat(this.data.xmax * factor), xmax_x_pos, y_pos);
    let ymax_y_pos = this.YPIXELS - 6;
    if (x_pos < 0) x_pos = 0;
    if ((y_pos == this.YPIXELS - 2) && (x_pos == 0)) ymax_y_pos = this.YPIXELS - 17;
    this.writeText(roundFloat(this.data.ymax * factor), x_pos + 1, ymax_y_pos);
    this.writeText(roundFloat(this.data.ymin * factor), x_pos + 1, this.offset_text);
  },
  drawGrid: function (xscl, yscl, type = "dot") {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgb(90,90,90)';
    this.ctx.lineWidth = 1;
    if (type == "dot") {
      this.ctx.setLineDash([1, 1]);
    } else if (type == "solid") {
      this.ctx.setLineDash([]);
    } else if (type == "dash") {
      this.ctx.setLineDash([2.5, 1.5]);
    } else if (type == "point") {
      this.ctx.setLineDash([1, 2]);
    }
    const x_grid = this._getGrid(xscl, this.positiveX_toRight_factor * this.data.xmin, this.positiveX_toRight_factor * this.data.xmax, this.XPIXELS);
    const y_grid = this._getGrid(yscl, this.positiveY_toUp_factor * this.data.ymin, this.positiveY_toUp_factor * this.data.ymax, this.YPIXELS);
    for (var i = 0; i < x_grid.length; i++) {
      this.drawLine(x_grid[i], x_grid[i], 0, this.YPIXELS);
    }
    for (var i = y_grid.length - 1; i > -1; i--) {
      this.drawLine(0, this.XPIXELS, y_grid[i], y_grid[i]);
    }
    this.ctx.restore();
  },
  drawDebugLine: function (A, B) {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgb(255,0,0)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([2.5, 1.5]);
    this.drawLine(A.x, B.x, A.y, B.y);
    this.ctx.restore();
  },
  drawDebugCircle: function (x, y, radius) {
    this.ctx.save();
    this.drawCircle(x, y, radius, [255, 0, 0]);
    this.ctx.restore();
  },
  drawDashLine: function (A, B, color, lineWidth = 2) {
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.setLineDash([15, 10]);
    this.drawLine(A.x, B.x, A.y, B.y);
    this.ctx.restore();
  },
  drawAxisVectors: function (position, length, stroke, color) {
    this.ctx.save();
    this.ctx.strokeStyle = color ? color : 'black';
    this.ctx.lineWidth = stroke;
    this.drawVector(position.x - length, position.y, position.x + length, position.y);
    this.drawVector(position.x, position.y - length, position.x, position.y + length);
    this.ctx.restore();
  },
  drawDebugRectangle: function (corners) {
    const drawLine = (from, to) => {
      this.drawDebugLine({
        x: corners[from][0], y: corners[from][1]
      }, {
        x: corners[to][0], y: corners[to][1]
      });
    };
    drawLine(3, 0);
    for (var k = 0; k < corners.length - 1; k++) {
      drawLine(k, k + 1);
    }
  },
  _getGrid: function (scale, min, max, len) {
    const a = this._getMultiples(scale, min, max);
    a.forEach((val, ind) => a[ind] = (val - min) * len / (max - min));
    return a;
  },
  _getMultiples: function (scale, min = 0, max = 1, digits = 2) {
    let a = new Array();
    let f = Math.pow(10, digits);
    for (let t = Math.round(min * f); t <= Math.round(max * f); t++) {
      if (t % Math.round(scale * f) == 0) {
        a.push(t / f);
      }
    }
    return a;
  },
}