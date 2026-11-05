const cancelAnimation_WiringSimulator =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const requestAnimation_WiringSimulator =
  window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var WiringSimulator = {
  wereInitialized: false,
  isRunning: false,
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
  // Board, modules and wires are drawn in a fixed logical space (WIDTH_PX x WIDTH_PX * RATIO), scaled to the canvas size.
  Track: {
    RATIO: 9 / 16,
    WIDTH_PX: 487.22
  },
  WIRES: ["GND", "VCC", "DATA2", "DATA1"],
  WIRE_COLORS: { GND: "#000", VCC: "#ff0000", DATA2: "#dddddd", DATA1: "#ffcc25" },
  SIDES: { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, top: { x: 0, y: -1 }, bottom: { x: 0, y: 1 } },
  // Distance between a wire end and its bezier control point.
  WIRE_CURVE: 50,
  selected: null,
  isShieldDragged: false,
  dragStart: null,
  grab: null,
  isDragging: false,
  // View of the board, modules and wires: zoom (buttons) and offset (dragging the background).
  view: { zoom: 1, x: 0, y: 0 },
  ZOOM: { MIN: 0.5, MAX: 3, STEP: 1.25 },
  panStart: null,
  modules: [],
  // Position of each module, kept when the mosaic changes. Key: module key (see updateModules).
  positions: {},
  hub: null,
  // Current shield, from the shields of shields.js.
  shield: null,
  shields: {},
  // Set by the interface (groveShield.js): shield name of the selected board (null without Grove shield), and shield
  // pin name of a mosaic pin.
  board: {
    shield: () => null,
    port: (pin) => pin
  },
  groveDefinitions: [],
  // Used for every external module that has no picture of its own.
  genericDefinition: {
    id: "generic",
    generic: true,
    wireOrientation: "bottom",
    wirePosition: { GND: { x: 15.5, y: 34.8 }, VCC: { x: 18.5, y: 34.8 }, DATA2: { x: 21.5, y: 34.8 }, DATA1: { x: 24.5, y: 34.8 } },
    picture: "generic-module.svg"
  },
  i2c: {
    hubRequired: null
  },

  init: function () {
    this.addWiringSimulatorToDom();
    this.img.background.src = this.PATH_MEDIA + "/backgrounds/white-background.jpg";
    this.img.logo.src = this.PATH_MEDIA + "/logo.png";
    this.canvas = document.querySelector("#wiring-simulator");
    this.canvas.width = this.Track.WIDTH_PX;
    this.canvas.height = this.Track.WIDTH_PX * this.Track.RATIO;
    this.ctx = this.canvas.getContext("2d");
    this.recorder = new Recorder(this.canvas, $("#record-button"), fileName = 'wiring-simulator');
    this.initCanvasPointers();
    this.wereInitialized = true;
  },

  addWiringSimulatorToDom: function () {
    if (document.querySelector("#simulator-wires")) return;

    const wiringModeBtnHtml = `
    <button id="wiring-mode" class="btn simulator-button-circle" type="button" onclick="switchWiringMode()" aria-label="wiring mode" data-i18n="[aria-label]simulator.switchWiringMode">
        <img class="simulator-mosaic-icon simulator-buttons-icon" src="${CDN_PATH}/openInterface/interfaces/assets/media/icon-wiring.svg" alt="wiring mode">
    </button>`;
    document.querySelector('.simulator-board-buttons').insertAdjacentHTML('beforeend', wiringModeBtnHtml);

    const wiringSimultorHtml = `
    <div id="simulator-wires" style="display: none;">
        <button id="mosaic-mode" class="btn simulator-button-circle" onclick="switchMosaicMode()" aria-label="mosaic mode" data-i18n="[aria-label]simulator.switchMosaicMode">
            <img class="simulator-wiring-icon simulator-buttons-icon" src="${CDN_PATH}/openInterface/interfaces/assets/media/icon-mosaic.svg" alt="mosaic mode"/>
        </button>
        <div id="wiring-overlay">
            <button id="modules-close" onclick="WiringSimulator.closeModule()" tabindex="-1">&times;</button>
            <div id="wiring-modules" style="display:none;"></div>
        </div>
        <div class="wiring-canvas-container">
            <canvas id="wiring-simulator">Canvas Not Supported</canvas>
            <div class="wiring-zoom">
                <button id="wiring-zoom-in" type="button" onclick="WiringSimulator.zoom(1)"
                        data-i18n="[title]code.simulator.buttons.base.wiringZoomIn;[aria-label]code.simulator.buttons.base.wiringZoomIn" title="Zoom in" aria-label="Zoom in">
                    <i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                </button>
                <button id="wiring-zoom-out" type="button" onclick="WiringSimulator.zoom(-1)"
                        data-i18n="[title]code.simulator.buttons.base.wiringZoomOut;[aria-label]code.simulator.buttons.base.wiringZoomOut" title="Zoom out" aria-label="Zoom out">
                    <i class="fa-solid fa-magnifying-glass-minus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div id="wiring-message-container"></div>
        <div class="d-flex justify-content-center my-2">
            <div id="wiring-buttons-control" class="control-run-btn btn-group oi-btn-group-simulator oi-simulation-activated"></div>
            <div id="wiring-buttons-fullscreen" class="control-mode-btn oi-btn-group-simulator oi-option-activated"></div>
            <div class="wiring-buttons btn-group oi-btn-group-simulator oi-option-activated">
                <button id="wiring-background-button" class="btn oi-btn-simulator" 
                        data-toggle="tooltip" data-placement="top" title="Background">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-img.svg" alt="Image icon">
                </button>
                <button id="simulator-export" class="btn oi-btn-simulator" 
                        data-toggle="tooltip" data-placement="top" title="Screenshot" onclick="WiringSimulator.getScreenshot()">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-photo.svg" alt="Photo icon">
                </button>
                <button id="wiring-record-button" class="btn oi-btn-simulator" 
                        data-toggle="tooltip" data-placement="top" title="Video record" onclick="WiringSimulator.recordVideo()">
                    <img src="${CDN_PATH}/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-rec.svg" alt="Record icon">
                </button>
            </div>
        </div>
    </div>`;

    document.querySelector('.ide-simulator').insertAdjacentHTML('beforeend', wiringSimultorHtml);

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
   * [BUTTON] Zoom in (direction 1) or out (direction -1), around the centre of the canvas.
   * @param {number} direction
   */
  zoom: function (direction) {
    const zoom = Math.min(this.ZOOM.MAX, Math.max(this.ZOOM.MIN, this.view.zoom * this.ZOOM.STEP ** direction));
    const ratio = zoom / this.view.zoom;
    const centreX = this.canvas.width / 2;
    const centreY = this.canvas.height / 2;
    this.view.x = centreX - (centreX - this.view.x) * ratio;
    this.view.y = centreY - (centreY - this.view.y) * ratio;
    this.view.zoom = zoom;
    $('#wiring-zoom-in').prop('disabled', zoom >= this.ZOOM.MAX);
    $('#wiring-zoom-out').prop('disabled', zoom <= this.ZOOM.MIN);
  },

  /**
   * Position of a pointer event in the zoomed and moved view.
   * @param {PointerEvent} e
   * @returns {{x: number, y: number}}
   */
  toView: function (e) {
    const scale = this.getScale();
    return { x: (e.offsetX - this.view.x) / scale, y: (e.offsetY - this.view.y) / scale };
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

      // Also when the simulation is stopped: the board (or its shield) and the modules can change, and be moved.
      if (Simulator.isInWiringMode) {
        that.update();
      }
    };
    resetCanvas();
  },

  update: function () {
    if (this.selectShield() || Simulator.mosaicChanged) {
      this.updateModules();
      Simulator.mosaicChanged = false;
    }
    // Follow the simulator width (fullscreen, window resize), resizing the canvas only when needed as it clears it.
    const width = Math.floor($("#simulator").width()) || this.canvas.width;
    if (this.canvas.width !== width) {
      this.canvas.width = width;
      this.canvas.height = width * this.Track.RATIO;
      $("#wiring-overlay").height(this.canvas.height + 4);
    }
    this.drawBackground();
    this.drawLogo();
    if (!this.shield) {
      this.drawNoShield();
      return;
    }
    const scale = this.getScale();
    this.ctx.setTransform(scale, 0, 0, scale, this.view.x, this.view.y);
    this.drawBoard();
    this.drawAllImages();
    this.drawAllWires();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  },

  /**
   * Canvas pixels per logical pixel.
   * @returns {number}
   */
  getScale: function () {
    return this.view.zoom * this.canvas.width / this.Track.WIDTH_PX;
  },

  /**
   * Use the shield of the selected board, placing it the first time.
   * @returns {boolean} true when the shield changed
   */
  selectShield: function () {
    const shield = this.shields[this.board.shield()] || null;
    if (shield === this.shield) return false;
    this.shield = shield;
    if (shield && !shield.image) {
      shield.image = new Image();
      shield.image.src = shield.IMG_LINK;
      shield.x = shield.INITIAL_POS_PERCENT.x / 100 * this.Track.WIDTH_PX - shield.SIZE.w / 2;
      shield.y = shield.INITIAL_POS_PERCENT.y / 100 * this.Track.WIDTH_PX * this.Track.RATIO - shield.SIZE.h / 2;
    }
    return true;
  },

  /**
   * Name of a pin in the Blockly pins lists of a board (e.g. 'D2' for the GPIO 5 of the Arduino Nano ESP32).
   * @param {string} pin pin id of the mosaic
   * @param {string} board board id
   * @returns {string|null}
   */
  getPinName: function (pin, board) {
    for (const type in Blockly.Constants.Pins) {
      const pins = Blockly.Constants.Pins[type][board];
      const found = Array.isArray(pins) && pins.find(p => p[1] == 'p' + pin || p[1] == pin || p[1] == "'" + pin + "'");
      if (found) return found[0];
    }
    return null;
  },

  drawNoShield: function () {
    this.ctx.font = "bold 16px Montserrat, Arial, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#004684";
    this.ctx.fillText(this.translate('code.simulator.wiring.noShield', "Pas de shield Grove pour cette carte dans le simulateur de câblage.", {}),
      this.canvas.width / 2, this.canvas.height / 2);
  },

  /**
   * Build the modules to draw from the mosaic: one module per physical board (e.g. 'dht11-temp_4' and 'dht11-hum_4'
   * are the same DHT11), each with the shield port (or hub port) its wires go to.
   */
  updateModules: function () {
    UIManager.resetMessage("warning-message");
    this.modules = [];
    this.hub = null;
    if (!this.shield) return;
    const modules = [];
    const byKey = {};
    const i2cModules = [];
    const warnings = [];
    const mosaicModules = Simulator.getMosaicModules();
    for (let i = 0; i < mosaicModules.length; i++) {
      const domId = mosaicModules[i].id;
      if (!domId) continue;
      const separator = domId.indexOf('_');
      const coreId = separator === -1 ? domId : domId.slice(0, separator);
      const pinPart = separator === -1 ? null : domId.slice(separator + 1);
      const mod = Simulator.getModuleByKey(coreId);
      if (!mod) continue;
      const wiringDef = this.getWiringDefById(coreId) || this.genericDefinition;
      const connection = wiringDef.connection || this.getConnection(mod, pinPart);
      // Modules of the board itself or of a robot: not plugged on the shield.
      if (connection === null) continue;
      const family = wiringDef.generic ? (mod.multiple ? coreId.split('-')[0] : coreId) : this.groveDefinitions.indexOf(wiringDef);
      const key = family + '@' + connection;
      if (byKey[key]) {
        byKey[key].domIds.push(domId);
        continue;
      }
      const module = {
        key: key,
        domIds: [domId],
        wiring: wiringDef,
        title: mod.multiple ? String(mod.title || coreId).split(' - ')[0] : String(mod.title || coreId),
        pos: this.positions[key] || null,
        ends: null
      };
      byKey[key] = module;
      modules.push(module);
      if (connection === 'I2C') {
        i2cModules.push(module);
      } else {
        // Dupont wiring: the serial module goes on the board TX (its RX, yellow wire) and RX (its TX, white wire).
        const port = connection === 'UART' ? this.shield.pins.UART : this.shield.pins[this.board.port(connection)];
        if (connection === 'UART' && this.shield.bus) {
          module.ends = this.getBusEnds(this.shield.bus.TX, this.shield.bus.RX);
        } else if (port) {
          module.ends = this.getPortEnds(port, false);
        }
        if (!module.ends) {
          warnings.push(this.translate('code.simulator.wiring.unwiredPin',
            "[Câblage] Le module <b>{{module}}</b> est sur la broche <b>{{pin}}</b>, qui n'a pas de connecteur sur ce shield : il n'est pas câblé.",
            { module: module.title, pin: connection || '?' }));
        }
      }
    }
    this.connectI2CModules(modules, i2cModules, warnings);
    this.modules = modules;
    if (Simulator.isInWiringMode && warnings.length) {
      UIManager.showWarningMessage("warning-message", warnings.join('<br>'));
    }
  },

  /**
   * Connection of a mosaic module.
   * @param {Object} mod module definition of the mosaic
   * @param {string|null} pinPart end of the mosaic module id (pin, pin-slot or pin-led)
   * @returns {string|null} 'I2C', 'UART', a pin, '' when the pin is unknown, null when the module is not plugged on the shield
   */
  getConnection: function (mod, pinPart) {
    const pin = typeof mod.pin === 'string' ? mod.pin : '';
    // Built-in modules (e.g. the Arduino LED on pin 13) are on the board.
    if (mod.builtin || mod.id === 'arduino-led13') return null;
    if (/^I2C/i.test(pin)) return 'I2C';
    if (/RX|TX|UART/i.test(pin) || /UART/i.test(pinPart || '')) return 'UART';
    if (pinPart) return pinPart.split('-')[0];
    if (!pin || /pin n°|IN1/.test(pin)) return '';
    return null;
  },

  /**
   * Plug the I2C modules on the shield I2C ports, adding a Grove I2C hub on the first port when there are not enough.
   */
  connectI2CModules: function (modules, i2cModules, warnings) {
    this.hub = null;
    this.i2c.hubRequired = null;
    // Dupont wiring: every I2C module goes on the same SCL (yellow wire) and SDA (white wire) pins.
    if (this.shield.bus) {
      const ends = this.getBusEnds(this.shield.bus.SCL, this.shield.bus.SDA);
      i2cModules.forEach(module => module.ends = ends);
      if (!ends && i2cModules.length) {
        warnings.push(this.translate('code.simulator.wiring.unwiredPin',
          "[Câblage] Le module <b>{{module}}</b> est sur la broche <b>{{pin}}</b>, qui n'a pas de connecteur sur ce shield : il n'est pas câblé.",
          { module: i2cModules.map(module => module.title).join(', '), pin: 'I2C' }));
      }
      return;
    }
    const shieldPorts = Object.values(this.shield.pins.I2C || {});
    let targets = shieldPorts.map(port => this.getPortEnds(port, false));
    if (i2cModules.length > shieldPorts.length && shieldPorts.length) {
      this.i2c.hubRequired = i2cModules.length - (shieldPorts.length - 1) <= Object.keys(this.i2c.hubs['groveHub-4'].ports).length ? 4 : 6;
      const hubDef = this.i2c.hubs['groveHub-' + this.i2c.hubRequired];
      this.hub = {
        key: 'groveHub-' + this.i2c.hubRequired,
        domIds: [],
        wiring: hubDef,
        title: 'Grove I2C Hub',
        pos: this.positions['groveHub-' + this.i2c.hubRequired] || null,
        ends: targets[0]
      };
      modules.push(this.hub);
      targets = targets.slice(1).concat(Object.values(hubDef.ports).map(port => this.getPortEnds(port, true)));
    }
    i2cModules.forEach((module, i) => {
      module.ends = targets[i] || null;
    });
    if (i2cModules.length > targets.length) {
      warnings.push(this.translate('code.simulator.wiring.i2cFull',
        "[Câblage] Trop de modules I2C : <b>{{modules}}</b> ne sont pas câblés.",
        { modules: i2cModules.slice(targets.length).map(module => module.title).join(', ') }));
    }
  },

  /**
   * Wire ends of a port: a Grove port takes the 4 wires, a header pin (no Grove connector) takes the signal wire,
   * power wires going to the shield power pins.
   * @param {Object} port {x, y} relative to the centre of the shield (or hub), header and side for a header pin
   * @param {boolean} onHub
   * @returns {Object} end of each wire
   */
  getPortEnds: function (port, onHub) {
    const owner = onHub ? 'hub' : 'shield';
    if (port.header) {
      return {
        GND: this.getPinEnd(this.shield.power.GND),
        VCC: this.getPinEnd(this.shield.power.VCC),
        DATA2: null,
        DATA1: this.getPinEnd(port, owner)
      };
    }
    const vertical = onHub ? false : ('vertical' in port ? port.vertical : this.shield.portOrientation === 'vertical');
    const side = onHub ? null : (port.side || this.shield.wireSide);
    const end = { ref: port, owner: owner, vertical: vertical, side: side, gap: true };
    return { GND: end, VCC: end, DATA2: end, DATA1: end };
  },

  /**
   * Wire end on a header pin (Dupont wire).
   * @param {Object|undefined} pin {x, y, side}
   * @param {string} owner 'shield' or 'hub'
   * @returns {Object|null}
   */
  getPinEnd: function (pin, owner = 'shield') {
    return pin ? { ref: pin, owner: owner, vertical: false, side: pin.side, gap: false } : null;
  },

  /**
   * Wire ends of a module on the pins of a bus of the board (I2C or serial) with Dupont wires.
   * @param {string} data1 pin name of the yellow wire
   * @param {string} data2 pin name of the white wire
   * @returns {Object|null} null when the board does not have these pins
   */
  getBusEnds: function (data1, data2) {
    const pins = this.shield.pins;
    if (!pins[data1] || !pins[data2]) return null;
    return {
      GND: this.getPinEnd(this.shield.power.GND),
      VCC: this.getPinEnd(this.shield.power.VCC),
      DATA2: this.getPinEnd(pins[data2]),
      DATA1: this.getPinEnd(pins[data1])
    };
  },

  /**
   * Translate with a fallback when the key is missing.
   */
  translate: function (key, fallback, options) {
    const text = typeof i18next !== 'undefined' ? i18next.t(key, options) : key;
    if (text !== key) return text;
    return fallback.replace(/{{(\w+)}}/g, (match, name) => options[name]);
  },

  getWiringDefById: function (value, key = 'id') {
    return this.groveDefinitions.find(x => (x[key] === value || (typeof x[key] == 'object' && x[key].includes(value))));
  },

  initCanvasPointers: function () {

    this.canvas.onpointerdown = (e) => {
      const point = this.toView(e);
      this.selected = null;
      // Modules drawn last are on top.
      for (let i = this.modules.length - 1; i >= 0; i--) {
        if (this.modules[i].pos && this.isPointingOnModule(point, this.modules[i])) {
          this.selected = this.modules[i];
          break;
        }
      }
      if (this.selected === null && this.isPointingOnBoard(point)) {
        this.isShieldDragged = true;
      }
      // Nothing under the pointer: dragging moves the view.
      if (!this.isShieldDragged && this.selected === null) {
        this.panStart = { x: e.offsetX - this.view.x, y: e.offsetY - this.view.y };
      }
      this.dragStart = point;
      // Offset between the pointer and the dragged item, so that it does not jump under the pointer.
      const dragged = (this.selected ? this.selected.pos : this.shield) || point;
      this.grab = { x: point.x - dragged.x, y: point.y - dragged.y };
    };

    this.canvas.onpointerup = (e) => {
      const clicked = !this.isDragging ? this.selected : null;
      this.isShieldDragged = false;
      this.selected = null;
      this.panStart = null;
      this.isDragging = false;
      if (clicked && clicked.domIds.length) {
        this.closeModule();
        clicked.domIds.forEach(id => $("#" + id).show());
        $("#wiring-modules").show();
        $("#wiring-overlay").addClass("active");
      }
    };

    this.canvas.onpointerout = () => {
      this.selected = null;
      this.isShieldDragged = false;
      this.isDragging = false;
      this.panStart = null;
    };

    this.canvas.onpointermove = (e) => {
      const point = this.toView(e);
      // Small moves are still clicks.
      if (this.dragStart && Math.hypot(point.x - this.dragStart.x, point.y - this.dragStart.y) > 2) {
        this.isDragging = true;
      }
      if (!this.isDragging) return;
      if (this.isShieldDragged) {
        this.shield.x = point.x - this.grab.x;
        this.shield.y = point.y - this.grab.y;
      } else if (this.selected !== null) {
        this.selected.pos.x = point.x - this.grab.x;
        this.selected.pos.y = point.y - this.grab.y;
      } else if (this.panStart !== null) {
        this.view.x = e.offsetX - this.panStart.x;
        this.view.y = e.offsetY - this.panStart.y;
      }
    };
  },

  isPointingOnBoard: function (point) {
    return this.shield && point.x <= this.shield.x + this.shield.SIZE.w && point.x >= this.shield.x &&
      point.y <= this.shield.y + this.shield.SIZE.h && point.y >= this.shield.y;
  },

  isPointingOnModule: function (point, module) {
    return point.x <= module.pos.x + module.w && point.x >= module.pos.x &&
      point.y <= module.pos.y + module.h && point.y >= module.pos.y;
  },

  drawBackground: function () {
    this.ctx.drawImage(this.img.background, 0, 0, this.canvas.width, this.canvas.height);
  },

  drawLogo: function () {
    this.ctx.drawImage(this.img.logo, 0, 10);
  },

  drawBoard: function () {
    this.ctx.drawImage(this.shield.image, this.shield.x, this.shield.y, this.shield.SIZE.w, this.shield.SIZE.h);
  },

  /**
   * Draws the modules and I2C hub if required, placing the new ones once their picture is loaded.
   */
  drawAllImages() {
    this.ctx.font = "bold 7px Montserrat, Arial, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#004684";
    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      const moduleImage = this.getModuleImage(module.wiring);
      if (!moduleImage.complete || !moduleImage.width) continue;
      const size = module.wiring.size || 1;
      module.w = size * moduleImage.width;
      module.h = size * moduleImage.height;
      if (!module.pos) {
        module.pos = this.positions[module.key] = this.findFreePosition(module);
      }
      this.ctx.drawImage(moduleImage, module.pos.x, module.pos.y, module.w, module.h);
      if (module.wiring.generic) {
        this.ctx.fillText(module.title, module.pos.x + module.w / 2, module.pos.y + module.h + 8);
      }
    }
  },

  /**
   * Free place for a module, as close as possible to the shield: its default position if free, otherwise the
   * nearest free cell of a grid over the canvas.
   * ponytail: grid scan, O(cells x modules), only run once per new module.
   * @param {Object} module with w and h
   * @returns {{x: number, y: number}}
   */
  findFreePosition: function (module) {
    const MARGIN = 6;
    const width = this.Track.WIDTH_PX;
    const height = this.Track.WIDTH_PX * this.Track.RATIO;
    const rects = this.modules
      .filter(other => other !== module && other.pos && other.w)
      .map(other => ({ x: other.pos.x, y: other.pos.y, w: other.w, h: other.h + (other.wiring.generic ? 10 : 0) }));
    rects.push({ x: this.shield.x, y: this.shield.y, w: this.shield.SIZE.w, h: this.shield.SIZE.h });
    // The logo is drawn at its own size in canvas pixels, at the top left.
    const logoScale = this.Track.WIDTH_PX / this.canvas.width;
    rects.push({ x: 0, y: 0, w: this.img.logo.width * logoScale, h: (this.img.logo.height + 10) * logoScale });
    const h = module.h + (module.wiring.generic ? 10 : 0);
    // Area covered by the module at (x, y) on the other modules and the shield, with a margin around them.
    const overlap = (x, y) => rects.reduce((sum, r) =>
      sum + Math.max(0, Math.min(x + module.w, r.x + r.w + MARGIN) - Math.max(x, r.x - MARGIN)) *
      Math.max(0, Math.min(y + h, r.y + r.h + MARGIN) - Math.max(y, r.y - MARGIN)), 0);
    if (typeof module.wiring.x === 'number' && overlap(module.wiring.x, module.wiring.y) === 0) {
      return { x: module.wiring.x, y: module.wiring.y };
    }
    // When the canvas is full, the least covering place is taken.
    const centre = { x: this.shield.x + this.shield.SIZE.w / 2, y: this.shield.y + this.shield.SIZE.h / 2 };
    let best = { x: MARGIN, y: MARGIN, score: Infinity };
    for (let y = MARGIN; y + h <= height - MARGIN; y += 5) {
      for (let x = MARGIN; x + module.w <= width - MARGIN; x += 5) {
        const score = overlap(x, y) * 1000 + Math.hypot(x + module.w / 2 - centre.x, y + h / 2 - centre.y);
        if (score < best.score) {
          best = { x: x, y: y, score: score };
        }
      }
    }
    return { x: best.x, y: best.y };
  },

  getModuleImage(module) {
    const picture = module.picture;
    if (typeof this.loadedImages[picture] !== 'undefined') {
      return this.loadedImages[picture];
    }
    const moduleImage = new Image();
    moduleImage.src = `${this.PATH_MEDIA}/modules/${picture}`;
    this.loadedImages[picture] = moduleImage;
    return moduleImage;
  },

  /**
   * Draws one wire, from the module connector to its port.
   * @param {Object} module
   * @param {string} wire 'GND', 'VCC', 'DATA2' or 'DATA1'
   * @param {number} index wire index, to spread the wires of a same port
   */
  drawWire: function (module, wire, index) {
    const end = module.ends[wire];
    const owner = end.owner === 'hub' ? { x: this.hub.pos.x, y: this.hub.pos.y, w: this.hub.w, h: this.hub.h } :
      { x: this.shield.x, y: this.shield.y, w: this.shield.SIZE.w, h: this.shield.SIZE.h };
    const gap = end.gap ? 3 * index : 0;
    const start = {
      x: module.pos.x + module.wiring.wirePosition[wire].x,
      y: module.pos.y + module.wiring.wirePosition[wire].y
    };
    const stop = {
      x: owner.x + owner.w / 2 + end.ref.x + (end.vertical ? 0 : gap),
      y: owner.y + owner.h / 2 + end.ref.y + (end.vertical ? gap : 0)
    };
    const startSide = this.SIDES[module.wiring.wireOrientation] || this.SIDES.bottom;
    // The cable goes in the port across its pins, on the fixed side of the port if any, otherwise on the module side.
    const stopSide = this.SIDES[end.side] || (end.vertical
      ? { x: start.x < stop.x ? -1 : 1, y: 0 }
      : { x: 0, y: start.y < stop.y ? -1 : 1 });
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.bezierCurveTo(
      start.x + startSide.x * this.WIRE_CURVE + gap,
      start.y + startSide.y * this.WIRE_CURVE + gap,
      stop.x + stopSide.x * this.WIRE_CURVE,
      stop.y + stopSide.y * this.WIRE_CURVE,
      stop.x,
      stop.y
    );
    this.ctx.strokeStyle = this.WIRE_COLORS[wire];
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    // Dupont connector on a header pin.
    if (!end.gap) {
      this.ctx.fillStyle = "#222";
      this.ctx.fillRect(stop.x - 1.5 + stopSide.x * 1.5, stop.y - 1.5 + stopSide.y * 1.5, 3, 3);
    }
  },

  /**
   * Draws the wires of each placed and connected module.
   */
  drawAllWires: function () {
    this.ctx.lineCap = "round";
    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      if (!module.ends || !module.pos || (this.hub && !this.hub.pos)) continue;
      for (let j = 0; j < this.WIRES.length; j++) {
        if (module.ends[this.WIRES[j]]) {
          this.drawWire(module, this.WIRES[j], j);
        }
      }
    }
  }

}
