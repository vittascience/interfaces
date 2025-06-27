var cancelAnimation_WiringSimulator =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var requestAnimation_WiringSimulator =
  window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var WiringSimulator = {
  wereInitialized: false,
  isRunning: false,
  width: null,
  loadedImages: {},
  img: {
    background: new Image(),
    logo: new Image()
  },
  PATH_MEDIA: `${CDN_PATH}/openInterface/interfaces/assets/media/simulator/wiring`,
  canvas: null,
  ctx: null,
  animation: null,
  recorder: null,
  isRecording: false,
  Track: {
    RATIO: 9 / 16,
    WIDTH_PX: 487.22
  },
  selectedModuleId: null,
  isDragging: false,
  modules: [],
  wiringOverlay: null,
  groveDefinitions: [],
  i2c: {
    hubRequired: null
  },

  init: function () {
    this.img.background.src = this.PATH_MEDIA + "/backgrounds/white-background.jpg";
    this.img.logo.src = this.PATH_MEDIA + "/logo.png";
    this.canvas = document.querySelector("#wiring-simulator");
    this.width = {
      px: this.Track.WIDTH_PX,
      cm: this.Track.WIDTH_CM
    };
    this.canvas.width = this.Track.WIDTH_PX;
    this.canvas.height = this.Track.WIDTH_PX * this.Track.RATIO;
    this.ctx = this.canvas.getContext("2d");
    this.recorder = new Recorder(this.canvas, $("#record-button"), fileName = 'wiring-simulator');
    this.initBoard();
    this.initWiresColor();
    this.initCanvasPointers();
    $(window).on('resize', () => {
      this.resize();
    });
    this.wereInitialized = true;
  },


  initBoard: function () {
    const boardImage = new Image();
    boardImage.src = groveShield.IMG_LINK;
    groveShield.image = boardImage;
    groveShield.image.width = groveShield.SIZE.w;
    groveShield.image.height = groveShield.SIZE.h;
    groveShield.x = groveShield.INITIAL_POS_PERCENT.x / 100 * this.width.px - groveShield.SIZE.h / 2;
    groveShield.y = groveShield.INITIAL_POS_PERCENT.y / 100 * this.width.px * this.Track.RATIO - groveShield.SIZE.w / 2;
  },

  initWiresColor: function () {
    const setColor = function (wiringDef) {
      wiringDef.wirePosition['VCC'].color = "#ff0000";
      wiringDef.wirePosition['GND'].color = "#000";
      wiringDef.wirePosition['DATA2'].color = "#fff";
      wiringDef.wirePosition['DATA1'].color = "#ffcc25";
    };
    for (var i = 0; i < this.groveDefinitions.length; i++) {
      setColor(this.groveDefinitions[i]);
    };
    for (var i in this.i2c.hubs) {
      setColor(this.i2c.hubs[i]);
    }
  },

  resize: function () {
    const resizeScalar = $("#simulator").width() / this.width.px;
    if (resizeScalar != 1) {
      $("#wiring-overlay").width($("#simulator").width());
      $("#wiring-overlay").height($("#wiring-simulator").height());
      groveShield.x += groveShield.SIZE.h / 2;
      groveShield.y += groveShield.SIZE.w / 2;
      groveShield.x *= resizeScalar;
      groveShield.y *= resizeScalar;
      groveShield.x -= groveShield.SIZE.h / 2;
      groveShield.y -= groveShield.SIZE.w / 2;
      this.groveDefinitions.forEach((mod) => {
        mod.x *= resizeScalar;
        mod.y *= resizeScalar;
      });
    }
  },

  /**
   * [BUTTON] Toggle video recording, getting it in mp4 file.
   */
  recordVideo: function () {
    if (this.isRecording) {
      this.isRecording = false;
      this.recorder.stopRecording();
      this.recorder.download();
    } else {
      this.isRecording = true;
      this.recorder.startRecording();
    }
  },

  /**
   * [BUTTON] Capture canvas area to put it in jpg file.
   */
  getScreenshot: function () {
    return this.recorder.screenshot();
  },

  /**
   * [BUTTON] Close opened module from canvas.
   */
  closeModule: function () {
    $("#wiring-overlay").removeClass("active");
    const mosaic = $("#wiring-modules")[0].childNodes;
    for (var i = 0; i < mosaic.length; i++) {
        $(mosaic[i]).hide();
    }
    $("#wiring-modules").hide();
  },

  /**
   * Run wiring simulator.
   */
  run: function () {
    var that = this;
    async function resetCanvas() {
      
      if (that.isRunning) {
        that.animation = requestAnimation_WiringSimulator(resetCanvas);
      } else {
        cancelAnimation_WiringSimulator(that.animation);
      }
      
      if (!Simulator.isStopped && Simulator.isInWiringMode) {
        that.update();
      }
    };
    resetCanvas();
  },

  update: function () {
    if (Simulator.mosaicChanged) {
      this.updateModules();
      Simulator.mosaicChanged = false;
    }
    // Reset previous width for Fullscreen
    this.width.px = $("#simulator").width();
    $("#wiring-overlay").height($("#wiring-simulator").height() + 4);
    // Update background
    this.canvas.width = this.width.px;
    this.canvas.height = this.width.px * this.Track.RATIO;
    this.drawBackground();
    this.drawLogo();
    this.drawBoard();
    this.drawAllImages();
    this.drawAllWires();
  },

  updateModules: function () {
    UIManager.resetMessage("warning-message");
    this.i2c.portCount = 0;
    this.modules = new Array();
    const mosaicModules = Simulator.getMosaicModules();
    for (var i = 0; i < mosaicModules.length; i++) {
      const moduleId = mosaicModules[i].id;
      const coreId = mosaicModules[i].id.split('_')[0];
      const wiringDef = this.getWiringDefById(coreId);
      const mod = Simulator.getModuleByKey(coreId);
      if (wiringDef) {
        if (mod && mod.pin === 'I2C') {
          if (mod.multiple && coreId.split('-').length > 1) {
            const componentId = coreId.split('-')[0];
            const moduleFound = this.modules.find(module => module.id === componentId);
            if (!moduleFound) {
              this.modules.push({
                id: componentId,
                multiple: true,
                to: 'I2C-' + this.i2c.portCount,
                wiring: wiringDef
              });
              this.i2c.portCount++;
            }
          } else {
            this.modules.push({
              id: coreId,
              to: 'I2C-' + this.i2c.portCount,
              wiring: wiringDef
            });
            this.i2c.portCount++;
          }
        } else {
          this.modules.push({
            id: moduleId,
            to: moduleId.split('_')[1],
            wiring: Object.assign({}, wiringDef)
          });
        }
      } else {
        if (Simulator.isInWiringMode) {
          UIManager.showWarningMessage("warning-message", "Le module '" + mod.title + "' n'a pas encore été implémenté dans le simulateur de câblage.");
        }
      }
    }
    if (this.i2c.portCount > Object.keys(groveShield.pins.I2C).length) {
      if (this.i2c.portCount > Object.keys(groveShield.pins.I2C).length - 1 + 3) {
        this.i2c.hubRequired = 6;
      } else {
        this.i2c.hubRequired = 4;
      }
      const moduleDef = this.i2c.hubs['groveHub-' + this.i2c.hubRequired];
      moduleDef.x = groveShield.x - 50;
      moduleDef.y = groveShield.y;
      moduleDef.id = 'groveHub-' + this.i2c.hubRequired;
      this.modules.push({
        id: null,
        to: 'I2C-0',
        wiring: moduleDef
      });
    } else {
      this.i2c.hubRequired = null;
    }
  },

  getWiringDefById: function (value, key = 'id') {
    const wiringDef = this.groveDefinitions.find(x => (x[key] === value || (typeof x[key] == 'object' && x[key].includes(value))));
    if (!wiringDef) {
      console.error("WiringSimulator Error: no wiring definition with '" + key + "': " + value);
    }
    return wiringDef;
  },

  initCanvasPointers: function () {

    this.canvas.onpointerdown = (e) => {
      if (this.isPointingOnBoard(e)) {
        groveShield.isDraggable = true;
      }
      if (!groveShield.isDraggable) {
        for (var i = 0; i < this.modules.length; i++) {
          if (this.isPointingOnModule(e, this.modules[i].wiring)) {
            if (this.modules[i].id === null) {
              this.selectedModuleId = this.modules[i].wiring.id;
            } else {
              this.selectedModuleId = this.modules[i].id;
            }
            break;
          }
        }
      }
    };

    this.canvas.onpointerup = (e) => {
      groveShield.isDraggable = false;
      this.selectedModuleId = null;
      if (!this.isDragging) {
        for (var i = 0; i < this.modules.length; i++) {
          const wiringDef = this.modules[i].wiring;
          if (this.modules[i].id !== null && this.isPointingOnModule(e, wiringDef)) {
            this.closeModule();
            if (this.modules[i].multiple && typeof wiringDef.id == 'object') {
              for (var i = 0; i<wiringDef.id.length; i++) {
                $("#" + wiringDef.id[i]).show();
              }
            } else {
              $("#" + this.modules[i].id).show();
            }
            $("#wiring-modules").show();
            $("#wiring-overlay").addClass("active");
            break;
          }
        }
      }
    };

    this.canvas.onpointerout = () => {
      this.selectedModuleId = null;
      groveShield.isDraggable = false;
      this.isDragging = false;
    };

    this.canvas.onpointermove = (e) => {
      if (groveShield.isDraggable) {
        groveShield.x = e.offsetX - groveShield.SIZE.w / 2;
        groveShield.y = e.offsetY - groveShield.SIZE.h / 2;
        this.isDragging = true;
      } else {
        if (this.selectedModuleId !== null) {
          const wiringDef = this.modules.find(module => (this.selectedModuleId == module.id || this.selectedModuleId === module.wiring.id)).wiring;
          wiringDef.x = e.offsetX - wiringDef.w / 2;
          wiringDef.y = e.offsetY - wiringDef.h / 2;
          this.isDragging = true;
        } else {
          this.isDragging = false;
        }
      }
    };
  },

  isPointingOnBoard: function (e) {
    return e.offsetX <= groveShield.x + groveShield.SIZE.w && e.offsetX >= groveShield.x &&
      e.offsetY <= groveShield.y + groveShield.SIZE.h && e.offsetY >= groveShield.y;
  },

  isPointingOnModule: function (e, module) {
    return e.offsetX <= module.x + module.w && e.offsetX >= module.x &&
      e.offsetY <= module.y + module.h && e.offsetY >= module.y;
  },

  drawBackground: function () {
    this.ctx.drawImage(this.img.background, 0, 0, this.canvas.width, this.canvas.height);
  },

  drawLogo: function () {
    this.ctx.drawImage(this.img.logo, 0, 10);
  },

  drawBoard: function () {
    this.ctx.drawImage(groveShield.image, groveShield.x, groveShield.y, groveShield.SIZE.w, groveShield.SIZE.h);
  },

  /**
   * Draws the modules and I2C hub if required.
   */
  drawAllImages() {
    for (var i = 0; i < this.modules.length; i++) {
      const wiringDef = this.modules[i].wiring;
      const moduleImage = this.getModuleImage(wiringDef);
      wiringDef.w = wiringDef.size ? wiringDef.size*moduleImage.width : moduleImage.width;
      wiringDef.h = wiringDef.size ? wiringDef.size*moduleImage.height : moduleImage.height;
      if (wiringDef.w !== 0 && wiringDef.h !== 0) {
        this.ctx.drawImage(moduleImage, wiringDef.x, wiringDef.y, wiringDef.w, wiringDef.h);
      } 
    }
  },

  getModuleImage(module) {
    const moduleId = module.id;
    if (typeof this.loadedImages[moduleId] !== 'undefined') {
      return this.loadedImages[moduleId];
    }
    const moduleImage = new Image();
    moduleImage.src = `${this.PATH_MEDIA}/modules/${module.picture}`;
    this.loadedImages[moduleId] = moduleImage;
    return moduleImage;
  },

  drawWire: function (j, mod, wire, cp1x, cp1y, offset) {
    let mod_x;
    let mod_y;
    let base_x = groveShield.x + groveShield.SIZE.w / 2;
    let base_y = groveShield.y + groveShield.SIZE.h / 2;
    let toHub = false;
    if (mod.to.includes('I2C')) {
      const portIndex = parseInt(mod.to.split('-')[1]);
      if (this.i2c.hubRequired !== null) {
        if (mod.wiring.id.includes('groveHub')) {
          mod_x = groveShield.pins.I2C[0].x;
          mod_y = groveShield.pins.I2C[0].y;
        } else {
          const shieldPorts = Object.keys(groveShield.pins.I2C).length;
          const newPortIndex = portIndex + 1;
          if (newPortIndex > shieldPorts - 1) {
            const hub = this.modules.find(module => module.wiring.id === 'groveHub-' + this.i2c.hubRequired);
            mod_x = hub.wiring.ports[newPortIndex - shieldPorts].x;
            mod_y = hub.wiring.ports[newPortIndex - shieldPorts].y;
            base_x = hub.wiring.x + hub.wiring.w / 2;
            base_y = hub.wiring.y + hub.wiring.h / 2;
            toHub = true;
          } else {
            mod_x = groveShield.pins.I2C[newPortIndex].x;
            mod_y = groveShield.pins.I2C[newPortIndex].y;
          }
        }
      } else {
        mod_x = groveShield.pins.I2C[portIndex].x;
        mod_y = groveShield.pins.I2C[portIndex].y;
      }
    } else {
      mod_x = groveShield.pins[mod.to].x;
      mod_y = groveShield.pins[mod.to].y;
    }
    let cp2x = 0;
    let cp2y = 0;
    let offset_x = 0;
    let offset_y = 0;
    const wiresGap = 3 * j;
    if (groveShield.portOrientation === 'horizontal' || toHub) {
      if (groveShield.wireSide === 'top' || toHub) {
        cp2y = offset + wiresGap;
      } else {
        cp2y = - offset + wiresGap;
      }
      offset_x = wiresGap;
    } else {
      if (groveShield.wireSide === 'left') {
        cp2x = offset + wiresGap;
      } else {
        cp2x = - offset + wiresGap;
      }
      offset_y = wiresGap;
    }
    this.ctx.bezierCurveTo(
      mod.wiring.x + mod.wiring.wirePosition[wire].x + cp1x + wiresGap,
      mod.wiring.y + mod.wiring.wirePosition[wire].y + cp1y + wiresGap,
      base_x + mod_x + cp2x,
      base_y + mod_y + cp2y,
      base_x + mod_x + offset_x,
      base_y + mod_y + offset_y
    );
  },

  /**
   * Draws the wires for each module
   */
  drawAllWires: function () {
    const wires = ["GND", "VCC", "DATA2", "DATA1"];
    for (var i = 0; i < this.modules.length; i++) {
      for (var j = 0; j < wires.length; j++) {
        this.ctx.beginPath();
        this.ctx.moveTo(
          this.modules[i].wiring.x + this.modules[i].wiring.wirePosition[wires[j]].x,
          this.modules[i].wiring.y + this.modules[i].wiring.wirePosition[wires[j]].y,
        );
        switch (this.modules[i].wiring.wireOrientation) {
          case "left":
            if (this.modules[i].wiring.x < groveShield.x) {
              this.drawWire(j, this.modules[i], wires[j], -100, 0, -150);
            } else {
              this.drawWire(j, this.modules[i], wires[j], -100, 0, 100);
            }
            break;
          case "right":
            if (this.modules[i].wiring.x < groveShield.x) {
              this.drawWire(j, this.modules[i], wires[j], 100, 0, -150);
            } else {
              this.drawWire(j, this.modules[i], wires[j], 100, 0, 100);
            }
            break;
          case "top":
            if (this.modules[i].wiring.x - this.modules[i].wiring.w < groveShield.x) {
              this.drawWire(j, this.modules[i], wires[j], 0, -100, -100);
            } else {
              this.drawWire(j, this.modules[i], wires[j], 0, -100, 100);
            }
            break;
          case "bottom":
            if (this.modules[i].wiring.x - this.modules[i].wiring.w < groveShield.x) {
              this.drawWire(j, this.modules[i], wires[j], 0, 100, -100);
            } else {
              this.drawWire(j, this.modules[i], wires[j], 0, 100, 100);
            }
            break;
        }
        this.ctx.strokeStyle = this.modules[i].wiring.wirePosition[wires[j]].color;
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
      }
    }
  }

}