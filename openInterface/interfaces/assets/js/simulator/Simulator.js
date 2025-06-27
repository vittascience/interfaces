// Check if we are in the vittascience or open Interface alone and select the correct path for images
const unique = (value, index, self) => {
    return self.indexOf(value) === index
};

Simulator.Mosaic = {};

/**
 * State of simulator window.
 * @type {boolean} isOpen
 */
Simulator.isOpen = false;

/**
 * Code to execute in the simulator.
 * @type {string} code
 */
Simulator.code = null;

/**
 * Define 2 seconds bewtween each update of simulator.
 * @type {int} TIMEOUT_UPDATE
 */
Simulator.TIMEOUT_UPDATE = 2000;

/**
 * Define 250 ms between each update of var panel.
 * @type {int} TIMEOUT_QUICK_UPDATE
 */
Simulator.TIMEOUT_QUICK_UPDATE = 350;

/**
 * Date since last change in the code editor.
 * @type {float} isOpen
 */
Simulator.lastUpdate = 0;


/**
 * Flag to detect if the simulator is fullscreen.
 * @type {boolean} isFullscreen
 */
Simulator.isFullscreen = false;

/**
 * Flag to detect if simulator is closing.
 * @type {boolean} stop_flag
 */
Simulator.stop_flag = false;

/**
 * Flag to detect if simulator is closed.
 * @type {boolean} isStopped
 */
Simulator.isStopped = true;

/**
 * Flag to detect is simulator is running.
 * @type {boolean} isRunning
 */
Simulator.isRunning = false;

/**
 * Flag to detect if simulator was paused.
 * @type {boolean} wasPaused
 */
Simulator.wasPaused = false;

/**
 * Flag to detect if simulator is debugging.
 * @type {boolean} isDebugging
 */
Simulator.isDebugging = false;

/**
 * Flag to detect if simulator is in wiring mode.
 * @type {boolean} isInWiringMode
 */
Simulator.isInWiringMode = false;

/**
 * Flag to detect if mosaic simulation has changed.
 * @param {boolean} mosaicChanged 
 */
Simulator.mosaicChanged = false;

/**
 * Pin error detected.
 * @param {string} pinError 
 */
Simulator.pinError = null;

/**
 * Date (in milliseconds) since the launch of the simulator.
 * @type {int} startTime
 */
Simulator.startTime = 0;

/**
 * Current resolve of setTimeout if we have to clear it.
 * @type {function} clearCurrentDelay
 */
Simulator.clearCurrentDelay = null;

/**
 * Register of current setTimeout's running.
 * @type {function} clearCurrentDelay
 */
Simulator.currentTimeouts = {};

/**
 * setInterval function updating simulator if we have to clear it.
 * @type {function} updateSimulatorInterval
 */
Simulator.updateSimulatorInterval = null;

/**
 * setInterval updating panel of variables if we have to clear it.
 * @type {function} updateVariablesPanelInterval
 */
Simulator.updateVariablesPanelInterval = null;

/**
 * AudioContext object.
 * @type {Object} audioContext 
 */
Simulator.audioContext = null;

/**
 * Array containing list of board pin using.
 * @type {Array<Object>} pinList 
 */
Simulator.pinList = [];

/**
 * Object stacking last slider value of mosaic's modules.
 * @type {Object} memorySliders
 */
Simulator.memorySliders = Object.create(null);

/**
 * Simulator board informations.
 * @type {object} board
 */
Simulator.board = null;

/**
 * flag to resolve all promiseToSuspension in simulator.
 * @type {boolean} cancelPromisesSimulator
 */
Simulator.cancelPromisesSimulator = false;

Simulator._classicRobotSimulatorPrepareForRun = false;
Simulator._3DRobotSimulatorPrepareForRun = false;

/**
 * Voice synthesis object.
 * @type {Object} synthesis
 */
Simulator.voices = [];

/**
 * Open simulator.
 */
Simulator.openingSimulator = async function () {
    if (this.isInWiringMode) {
        $("#simulator").hide();
        $("#simulator-wires").show();
    } else {
        $("#simulator").show();
        $("#simulator-wires").hide();
    }
    /* Web simulator */
    if (this._hasWebSimulator()) {
        await sleep_ms(500);
        WifiSimulator.resize();
    }
};

/**
 * Close simulator.
 */
Simulator.closingSimulator = async function () {
    await this.stop();
    if (this.audioContext !== null) {
        this.audioContext.close();
    }
    if (this._hasTIsimulator()) {
        this.Mosaic.specific.ti.clearScreen(true);
    }
    if (this._hasGalaxiaSimulator()) {
        this.Mosaic.specific.galaxiaUi.clearScreen(true);
    }
    if (this._hasRobotSimulator()) {
        RobotSimulator.isRunning = false;
        $("#graph-zoom-in").prop('disabled', false);
        $("#graph-zoom-out").prop('disabled', false);
    }
    if (this._hasWebSimulator()) {
        WifiSimulator.reset();
    }
    if (Simulator._hasWiringSimulator()) {
        WiringSimulator.isRunning = false;
        $('#simulator-wiring').hide();
    }
    if ($("#debugger-container").css('display', 'block')) {
        this.Debugger.toggleDebugMode();
    }
    this.code = null;
    $('#simulator').hide();
};

/**
 * Check if Vitta Companion is connected. (Niryo or Nao )
 * @returns {boolean} state
 */
Simulator.isVittaCompanionConnected = () => {
    const isRobotConnected = document.getElementById('connected-icon');
    return (['niryo', 'nao'].includes(INTERFACE_NAME) && isRobotConnected !== null);
};

/**
 * Initialize the simulator.
 */
Simulator.init = function () {
    try {
        if (this._hasMultiSimulator() && document.querySelector('#simulator-multi-info') === null) {
            this.addMultiSimulatorToDom();
        }
        if (this._hasBoardSelector()) {
            this.board = SIMULATOR_BOARDS[Blockly.Constants.getSelectedBoard()];
        } else {
            this.board = SIMULATOR_DEFAULT_BOARD;
        }

        this.updateBoard();
        this._getInterfaceModules();

        if (this.Mosaic.externalLibraries && typeof this.Mosaic.externalLibraries.init !== 'undefined') {
            this.Mosaic.externalLibraries.init();
        }
        if (typeof this.Mosaic.addSpecificInitializations !== 'undefined') {
            this.Mosaic.addSpecificInitializations();
        }
        if (typeof this.Mosaic.addSpecificSkulptFunctions !== 'undefined') {
            Simulator.Mosaic.addSpecificSkulptFunctions();
        }

        this.Animator = new Animator();
        /* TI-83 calculator */
        if (this._hasTIsimulator()) {
            this.Mosaic.specific.ti.init();
        }
        /* Galaxia Screen */
        if (this._hasGalaxiaSimulator()) {
            this.Mosaic.specific.galaxiaUi.init();
        }
        /* Robot simulator */
        if (this._hasRobotSimulator()) {
            RobotSimulator.init();
        }
        /* Web simulator */
        if (this._hasWebSimulator()) {
            this.fileStorage = {};
            WifiSimulator.init();
        }
        /* Wiring simulator */
        if (this._hasWiringSimulator()) {
            WiringSimulator.init();
        }
        /* Auto corrector */
        if (this._hasAutoCorrector()) {
            AutoCorrector.init();
        }
        /* Speech synthesis */
        if (this._hasSpeechSynthesis()) {
            this.waitForVoicesToBeLoaded();
        }
        if (this.TYPE == 'Skulpt') {
            this.initSkulpt();
        } else if (this.TYPE == 'JSCPP') {
            this.initSerialInput();
        }

        this.updateSimulatorInterval = null;
        this.updateVariablesPanelInterval = null;

        if (!['winky', 'sphero', 'lotibot', 'bluebot', 'spike', 'photon'].includes(INTERFACE_NAME)) {
            window.addEventListener("visibilitychange", function () {
                if (document.visibilityState === 'visible') {
                    if (Simulator.isVittaCompanionConnected()) return;
                    Simulator.play();
                } else {
                    Simulator.pause();
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 * Add multi simulator to dom
 */
Simulator.addMultiSimulatorToDom = function () {
    const multiSimulatorHtml =
        `<div id="simulator-multi-info" style="display: none;">
        <div id="simulator-multi-tooltip" class="interface-tooltip">
            <div class="interface-tooltip__header">
                <div>
                    <i class="fas fa-info-circle"></i>
                    <b data-i18n="code.simulator.buttons.multi-mode.tooltip.title">Info</b>
                </div>
                <button class="btn v-btn-basic interface-tooltip__header-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p data-i18n="code.simulator.buttons.multi-mode.tooltip.paragraph">Pour simuler la communication sans-fil entre plusieurs cartes, nous vous conseillons le mode Multi ci-dessous.</p>
        </div>
        <a href="#" class="btn multi-btn" onclick="projectManager.initializeMultiInterfaces()">
            <img src="/openInterface/interfaces/assets/media/simulator/menu/multi_mode/multi-mode-icon.svg" alt="Multi mode icon">
            <span data-i18n="code.simulator.buttons.multi-mode.button">Duo</span>
        </a>
    </div>`;
    document.querySelector("#simulator-modules").insertAdjacentHTML('afterend', multiSimulatorHtml);
};

/**
 * Update mosaic simulator.
 */
Simulator.updateSimulator = async function () {
    try {
        this._requestWirelessSimulation();
        const userCode = CodeManager.getSharedInstance().getCode();
        const code = typeof this.CodeFriendly.getAdaptedCode !== 'undefined' ? this.CodeFriendly.getAdaptedCode(userCode) : userCode;
        if (code != this.code || this.code == null) {
            this.code = code;
            if (this._hasAutoCorrector() && $('#simulator-modules').hasClass("visualizer-mode")) {
                $("#training-mode").click();
            }
            try {
                this.updateModules(this.code);
            } catch (e) {
                console.error(e);
            }
            if (!$('#simulator-modules').hasClass("visualizer-mode")) {
                if (this._hasRobotSimulator()) {
                    if (RobotSimulator.robot && RobotSimulator.robot.resetObjects) {
                        RobotSimulator.robot.resetObjects();
                    }
                }
                await this.replay();
            }
            if (projectManager !== null && projectManager._currentExercise !== "no-exercise" && Simulator._hasAutoCorrector()) {
                this.updateExercisePanel();
            }
        }
    } catch (e) {
        console.error(e);
    }
};

Simulator.bluetoothDeviceConnected = function () {
    switch (INTERFACE_NAME) {
        case 'sphero':
            return SpheroWebBLEAPI.isConnected;
        case 'lotibot':
            return LotibotWebBLEAPI.isConnected;
        case 'bluebot':
            return BluebotWebBLEAPI.isConnected;
        case 'spike':
            return LegoSpikeWebBLEAPI.isConnected;
        case 'photon':
            return PhotonWebBLEAPI.isConnected;
        default:
            return false;
    }
};

Simulator.setIntervalUpdateSimulator = function () {
    this.updateSimulatorInterval = setInterval(async () => {
        if (this.isOpen) {
            if (['lotibot', 'bluebot'].includes(INTERFACE_NAME)) {
                if (typeof this.Mosaic.specific.arrowsCoding !== 'undefined' && this.Mosaic.specific.arrowsCoding) return;
                if (this.isRunning && Math.floor((Date.now() - this.lastUpdate)) > this.TIMEOUT_UPDATE) {
                    await this.updateSimulator();
                } else {
                    return;
                }
            } else if (Main.getCodingMode() !== 'code' || (this.isRunning && Math.floor((Date.now() - this.lastUpdate)) > this.TIMEOUT_UPDATE)) {
                if (this.isVittaCompanionConnected() || this.bluetoothDeviceConnected() || (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null)) {
                    return;
                }
                await this.updateSimulator();
            }
        }
    }, this.TIMEOUT_UPDATE);
};

Simulator.setIntervalUpdateVariablesPanel = function () {
    this.updateVariablesPanelInterval = setInterval(() => {
        if ($('#simulator').is(":visible") && !this.isStopped && !(!this.isRunning && !this.isDebugging) && $('#simulator_show_vars').hasClass('activated')) {
            this.updateVariablesPanel();
        }
    }, this.TIMEOUT_QUICK_UPDATE);
};

/**
 * Play the simulator.
 */
Simulator.play = async function () {
    if (Simulator.isVittaCompanionConnected()) return
    $("#simulator_play").prop('disabled', true);
    $("#simulator_pause").prop('disabled', false);
    if (Simulator._has3DRobotSimulator() && typeof Simulator3D !== 'undefined' && typeof Simulator3D.pause === 'function') {
        Simulator3D.play();
    }
    if (this.wasPaused) {
        this.wasPaused = false;
        this.isRunning = true;
    } else {
        if (this.audioContext && this.audioContext.state != 'closed') {
            this.audioContext.suspend();
        }
        const userCode = CodeManager.getSharedInstance().getCode();
        this.code = typeof this.CodeFriendly.getAdaptedCode !== 'undefined' ? this.CodeFriendly.getAdaptedCode(userCode) : userCode;
        this.isRunning = true;
        this.prepareToRun();

        if (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) {
            AndroidInterface.buddySayYes(20, 20);
            AndroidInterface.buddySayNo(40, 5);
            AndroidInterface.webviewDisplay(false);
        }

        if (this.pinError === null) {
            const board_toggler = document.getElementById('simulator-board-toggler');
            if (!(typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) && (board_toggler !== null && !board_toggler.classList.contains('closed'))) {
                await Simulator.waitBoardViewer();
            }
            this.runCode();
        } else {
            UIManager.showErrorMessage('error-message', this.pinError);
            await Simulator.stop();
        }
    }
};

/**
 * Pause the simulator.
 */
Simulator.pause = function () {
    if (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) {
        AndroidInterface.webviewDisplay(true)
        AndroidInterface.buddySayYes(20, 20);
        AndroidInterface.buddySayNo(40, 5);
    }

    if (Simulator._has3DRobotSimulator() && typeof Simulator3D !== 'undefined' && typeof Simulator3D.pause === 'function') {
        Simulator3D.pause();
    }

    $("#simulator_play").prop('disabled', false);
    $("#simulator_pause").prop('disabled', true);
    this.wasPaused = true;
    this.isRunning = false;
    if (this._hasWebSimulator()) {
        WifiSimulator.server.active(false);
    }
};

/**
 * Replay the simulator.
 */
Simulator.replay = async function () {
    Simulator.cancelPromisesSimulator = true;
    if (!this.isStopped) {
        $("#simulator_replay").prop('disabled', true);
        $("#simulator_play").prop('disabled', false);
        $("#simulator_pause").prop('disabled', false);
        await this.stop();
    }
    this.Debugger.emptyVariablesPanel();
    this.Debugger.eraseBreakpoint();
    if (this._hasRobotSimulator() && RobotSimulator.isRunning) {
        RobotSimulator.restartRobot();
        RobotSimulator.Pen.positions = new Array();
    }
    if ((this._has3DRobotSimulator() || this._has3DInterface()) && typeof Simulator3D !== 'undefined' && typeof Simulator3D.startPosition !== 'undefined') {
        await Simulator3D.reset();
        await waitFor(() => Simulator3D.isBusy === false);
    }
    if (this._hasAutoCorrector()) {
        if (AutoCorrector.isValidating) {
            setTimeout(function () {
                AutoCorrector.startValidation();
            }, 1);
        }
        if (AutoCorrector.isRecording) {
            AutoCorrector.recordExercise(this.getSimulatedModules());
            pseudoModal.setMessage('modal-auto-corrector-creation',
                jsonPath('modals.simulator.auto-corrector.record-exercise.title') + '10' + jsonPath('modals.simulator.auto-corrector.record-exercise.unit') + '...',
                'success');
        }
    }
    if (!this.isInWiringMode) {
        this.resetErrorMessage();
    }
    this.wasPaused = false;
    this.serialData = '';

    if (Simulator.isVittaCompanionConnected()) return

    this.play();
    if (typeof this.Mosaic.addSpecificInitializations !== 'undefined') {
        this.Mosaic.addSpecificInitializations();
    }
    $("#simulator_replay").prop('disabled', false);
    $("#simulator_play").prop('disabled', true);
    $("#simulator_pause").prop('disabled', false);
};

/**
 * Stop the simulator.
 */
Simulator.stop = function () {
    return new Promise((resolve, reject) => {
        this.mainExecutionStarted = false;
        $("#board-viewer").addClass('greyscale');
        this.stop_flag = true;
        if (this.TYPE == "Skulpt") {
            Sk.execLimit = 0;
            this._stopIntervals();
        }
        for (const id in this.currentTimeouts) {
            clearTimeout(this.currentTimeouts[id]);
            delete Simulator.currentTimeouts[id];
        }
        if (this.clearCurrentDelay !== null) {
            this.clearCurrentDelay();
        }
        if (this.updateSimulatorInterval !== null) {
            clearInterval(this.updateSimulatorInterval);
        }
        if (this.updateVariablesPanelInterval !== null) {
            clearInterval(this.updateVariablesPanelInterval);
        }
        if (this._hasTIsimulator()) {
            this.Mosaic.specific.ti.reset();
        }
        if (this._hasGalaxiaSimulator()) {
            this.Mosaic.specific.galaxiaUi.reset();
        }
        if (this._hasWebSimulator()) {
            WifiSimulator.stop();
        }
        if (this.audioContext && this.audioContext.state != 'closed') {
            this.audioContext.suspend();
        }
        const stop = () => {
            setTimeout(() => {
                if (!this.isStopped && this.stop_flag) {
                    this.stop_flag = false;
                    this.isStopped = true;
                    this.Debugger.lastLine = 0;
                    $("#simulator_play").prop('disabled', false);
                    $("#simulator_pause").prop('disabled', true);
                    resolve();
                } else {
                    stop();
                }
            }, 100);
        };
        stop();
    });
};

Simulator.prepareToRun = function () {
    this.initMosaicSliders();
    this.setIntervalUpdateSimulator();
    this.setIntervalUpdateVariablesPanel();
    if (typeof this.Mosaic.specific.createSliders !== 'undefined') {
        this.Mosaic.specific.createSliders();
    }
    if (typeof this.Mosaic.groveRegex !== 'undefined' && typeof this.Mosaic.grove !== 'undefined') {
        this.Mosaic.grove.createSliders();
    }
    this.isStopped = false;
    $("#board-viewer").removeClass('greyscale');
    if (Main.getInterface() !== "TI-83") {
        $('#board-container').html(this.Mosaic.BOARD_HEADER);
        this.updateBoard();
    } else {
        this.Mosaic.specific.ti.clearTurtleScreen();
        this.Mosaic.manageCompatibleTIboards(true);
    }
    if (Main.getInterface() === "m5stack") {
        this.Mosaic.specific.m5ui.init();
        this.Mosaic.specific.m5ui.reset();
    }
    UIManager.resetMessage("error-message");
    if (!Simulator.isInWiringMode) {
        UIManager.resetMessage("warning-message");
    }
};

/**
 * Waits for the SVG to load in the board viewer.
 */
Simulator.waitBoardViewer = async function () {
    if (!/(TI-83|niryo|winky|spike|sphero|nao)/.test(INTERFACE_NAME)) {
        return new Promise(resolve => {
            document.querySelector('#board-viewer').addEventListener('load', () => resolve());
        });
    }
};

Simulator.waitForVoices = async function () {
    return new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length !== 0) {
            resolve(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                const newVoices = speechSynthesis.getVoices();
                resolve(newVoices);
            };
        }
    });
};

Simulator.waitForVoicesToBeLoaded = async () => {
    const voices = await Simulator.waitForVoices();
    Simulator.voices = voices;
};

/**
 * Update board viewer on simulator.
 * @param {string} link 
 * @param {string} name 
 */
Simulator.updateBoard = function (link, name) {
    if (link && name) {
        Simulator.board = {
            "link": link,
            "name": name
        };
    }

    if (Simulator.board.link) {
        if (/(arduino|microbit|wb55|l476|mBot|m5stack|esp32|galaxia|GalaxiaCircuitPython|buddy|cyberpi|pico|eliobot|thymio|raspberrypi|lotibot|photon|bluebot)/.test(INTERFACE_NAME) && (this.board.link).includes('.svg')) {
            $("#board-viewer").attr("data", _PATH + "/" + INTERFACE_NAME + "/assets/media/simulator/board/" + this.board.link);
        } else {
            $("#board-viewer").css('background-image', "url('" + _PATH + "/" + INTERFACE_NAME + "/assets/media/simulator/board/" + this.board.link + "')");
        }
    }

    $("#title-board").html(Simulator.board.name);
    if (Simulator._hasBoardSelector()) {
        const options = document.querySelectorAll("#simulator-board-options .dropdown-item");
        options.forEach((option) => {
            const optionValue = option.getAttribute('data-board');
            if (optionValue === Simulator.board.name && !option.classList.contains('fw-bold')) {
                option.classList.add('fw-bold');
            } else if (optionValue !== Simulator.board.name && option.classList.contains('fw-bold')) {
                option.classList.remove('fw-bold');
            }
        });

        if (typeof Simulator.Mosaic.addSpecificInitializations !== 'undefined') {
            Simulator.Mosaic.addSpecificInitializations();
        }

        if (INTERFACE_NAME === 'arduino') {
            const updateSerialBoard = (board_value) => {
                const board_select = document.querySelector('#board-select');
                if (board_select === null || board_select.length === 1) {
                    setTimeout(updateSerialBoard, 100, board_value);
                } else {
                    board_select.value = board_value;
                    board_select.dispatchEvent(new Event('change'));
                }
            };
            switch (Simulator.board.name) {
                case 'Arduino NANO':
                    updateSerialBoard("5");
                    break;
                case 'Arduino UNO':
                default:
                    updateSerialBoard("0");
            }
        }
    }
};

Simulator.toggleBoardDisplay = function () {
    if ($('#simulator-board-toggler').hasClass('closed')) {
        $('#simulator-board-toggler').html('<i class="fa-solid fa-minus simulator-buttons-icon"></i>');
        $('#simulator-board-toggler').removeClass('closed');
        $("#title-board").css('display', "none");
        $("#board-container").show();
    } else {
        $('#simulator-board-toggler').html('<i class="fa-solid fa-plus simulator-buttons-icon"></i>');
        $("#title-board").css('display', "block");
        $("#board-container").hide();
        $('#simulator-board-toggler').addClass('closed');
    }
};

/**
 * Get the mosaic.
 * @returns {Array<Node>} childNodes
 */
Simulator.getMosaicModules = function () {
    if (Simulator.isInWiringMode) {
        return $('#wiring-modules')[0].childNodes;
    } else {
        return $('#simulator-modules')[0].childNodes;
    }
};

/**
 * Get slider value by pin.
 * @param {string} pin
 * @return {string} value
 */
Simulator.getPinSliderValue = function (pin) {
    const component = Simulator.pinList.find((component) => component.pin == pin);
    if (component) {
        const sliderId = component.id + '_slider' + component.suffix;
        return $('#' + sliderId).slider('option', 'value');
    }
};

/**
 * Get slider value by id.
 * @param {string} id 
 * @param {string} suffix
 * @returns {string} value
 */
Simulator.getSliderValue = function (id, suffix) {
    if ($("#" + id).length > 0) {
        const sliderId = "#" + id + "_slider" + (suffix ? suffix : "");
        return $(sliderId).slider('option', 'value');
    }
};

/**
 * Set value on module slider by id.
 * @param {string} id 
 * @param {float} value 
 */
Simulator.setSliderValue = function (id, value, suffix) {
    const sliderId = "#" + id + "_slider" + (suffix ? suffix : "");
    if (typeof $(sliderId).slider('option', 'value') === 'object') {
        return;
    }
    $(sliderId).slider('value', value);
};

/**
 * Reset error message from simulator.
 */
Simulator.resetErrorMessage = function () {
    UIManager.resetMessage("error-message");
    UIManager.resetMessage("warning-message");
};

/**
 * Check if interface need radio button for multi page.
 */
Simulator._requestWirelessSimulation = function () {
    if (typeof ltiVariables13 !== 'undefined') return;
    const regExps = {
        "microbit": /(import radio|from radio import \*)/,
        "esp32": /(import vitta_(server|client)|from vitta_(server|client) import ((SERVER|CLIENT)|\*))/,
        "pico": /(import vitta_(server|client)|from vitta_(server|client) import ((SERVER|CLIENT)|\*))/,
        "galaxia": /(radio.(send|receive)|import vitta_(server|client)|from vitta_(server|client) import ((SERVER|CLIENT)|\*))/,
        "GalaxiaCircuitPython": /(radio.(send|receive)|import vitta_(server|client)|from vitta_(server|client) import ((SERVER|CLIENT)|\*))/,
        "TI-83": /(import mb_radio|from mb_radio import \*)/,
        "m5stack": /(import vitta_(server|client)|from vitta_(server|client) import ((SERVER|CLIENT)|\*))/,
        "arduino": /SoftwareSerial (HM10|blueToothSerial)/
    };
    const requested = regExps[Main.getInterface()];
    const url = (window.location != window.parent.location) ? document.referrer : document.location.href;
    if (typeof isMultiChild === 'undefined' && requested && requested.test(this.code) && !url.includes('/multi') && !$_GET('duo') && !url.includes('/classroom')) {
        $("#simulator-multi-info").localize().show();
        $("#simulator-multi-info .interface-tooltip__header-close-btn").click(function () {
            $('#simulator-multi-tooltip').hide();
        });
    } else {
        $("#simulator-multi-info").hide();
    }
};

/**
 * Switch robot simulator canvas to fullscreen.
 * Update sizes of all objects.
 */
Simulator.toggleFullscreen = function () {
    const setFullscreen = (state) => {
        if (state) {
            $("#simulator_fullscreen").addClass('activated');
            $("#simulator_autocorrector_fullscreen").addClass('activated');
            $(".ide-simulator").addClass("isFullscreen");
            if (!this._has3DRobotSimulator()) {
                $("#simulator").css('width', "60%");
            }
            if (INTERFACE_NAME == "buddy")
                $("#board-viewer").css('height', "fit-content");
        } else {
            $("#simulator_fullscreen").removeClass('activated');
            $("#simulator_autocorrector_fullscreen").removeClass('activated');
            $(".ide-simulator").removeClass("isFullscreen");
            $("#simulator").css('width', "100%");
            if (INTERFACE_NAME == "buddy")
                $("#board-viewer").css('height', "236px");
        }
        this.isFullscreen = state;
    };
    if (!this.isFullscreen) {
        setFullscreen(true);
    } else {
        setFullscreen(false);
    }
    if (this._hasRobotSimulator() && RobotSimulator.isRunning) {
        RobotSimulator.resize();
    }
    if (this._hasWiringSimulator() && WiringSimulator.isRunning) {
        WiringSimulator.resize();
    }
    if (this._hasWebSimulator()) {
        WifiSimulator.resize();
    }
    if ((this._has3DRobotSimulator() || this._has3DInterface()) && typeof Simulator3D !== 'undefined') {
        Simulator3D.experience.toggleFullscreen(this.isFullscreen);
    }
};

/**
 * Save dropdown options and redo dropdown options is not yet implemented.
 * It allows the simulator to save options of slider, and get it back when simulator open again.
 */
Simulator.saveDropdownOptions = function () {
    const simulatedModules = Simulator.getMosaicModules();
    for (var i = 0; i < simulatedModules.length; i++) {
        const select = "#" + simulatedModules[i].id + "_select";
        if ($(select).length) {
            this.dropdownOptions["#" + simulatedModules[i].id] = $(select + " option:selected").text();
        }
    }
};

Simulator.redoDropdownOptions = function () {
    const simulatedModules = Simulator.getMosaicModules();
    for (let i = 0; i < simulatedModules.length; i++) {
        let id = "#" + simulatedModules[i].id;
        let select = id + "_select";
        if ($(select).length && Simulator.dropdownOptions[id]) {
            let value = Simulator.dropdownOptions[id];
            $(select + ' option').filter(function () {
                return ($(this).text() == value);
            }).prop('selected', true);
            if ($(select).hasClass('module-color-selector')) {
                //Simulator.Sliders.updatePaletteColor(simulatedModules[i].id, value);
            }
        }
    }
};

/**
 * Check if interface has to add Robot simulator.
 * @return {boolean} state
 */
Simulator._hasRobotSimulator = function () {
    return ["microbit", "wb55", "l476", "TI-83", "mBot", "buddy", "cyberpi", "pico", "eliobot", "thymio", "sphero", "lotibot", "bluebot", "photon"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has is a custom 3D interface.
 * @return {boolean} state
 */
Simulator._has3DInterface = function () {
    return ["niryo", "winky", "nao"].includes(INTERFACE_NAME);
};

/**
 * check if interface has to add 3D Robot simulator.
 * @returns {boolean} state
 */
Simulator._has3DRobotSimulator = function () { // _has3DRobotSimulator
    return ["l476", "esp32"].includes(INTERFACE_NAME);
}

/**
 * Check if interface has to add Wiring simulator.
 * @return {boolean} state
 */
Simulator._hasWiringSimulator = function () {
    return ["arduino", "microbit"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has to add multi simulator.
 * @return {boolean} state
 */
Simulator._hasMultiSimulator = function () {
    return ["microbit", "esp32", "TI-83", "galaxia", "m5stack", "GalaxiaCircuitPython", "pico", "arduino"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has the AutoCorrector.
 * @return {boolean} state
 */
Simulator._hasAutoCorrector = function () {
    return ["microbit", "esp32", "wb55", "l476", "TI-83", "galaxia", "raspberrypi", "m5stack", "buddy", "GalaxiaCircuitPython", "pico", "eliobot", "thymio", "niryo", "nao", "winky"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has to add TI calculator simulation.
 * @return {boolean} state
 */
Simulator._hasTIsimulator = function () {
    return ["TI-83"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has to add Galaxia simulation.
 * @return {boolean} state
 */
Simulator._hasGalaxiaSimulator = function () {
    return ["galaxia"].includes(INTERFACE_NAME);
};

/**
 * Check if interface has to add Web page simulator.
 * @return {boolean} state
 */
Simulator._hasWebSimulator = function () {
    return ["esp32", "m5stack", "galaxia", "pico"].includes(INTERFACE_NAME);
};

/**
 * Check if interface need board management.
 * @returns {boolean} state
 */
Simulator._hasBoardSelector = function () {
    return ["esp32", "pico", "arduino", "raspberrypi"].includes(INTERFACE_NAME);
};

/**
 * Check if interface need speech synthesis.
 * @returns {boolean} state
 */
Simulator._hasSpeechSynthesis = function () {
    return ["spike"].includes(INTERFACE_NAME);
};

/**
 * Init mosaic sliders.
 */
Simulator.initMosaicSliders = function () {
    $('.sim_slider').slider({
        min: -20,
        max: 20,
        orientation: "vertical",
        step: 1,
        change: Simulator.onSliderChanged
    }).on("slide", Simulator.onSliderChanged);

    $("body").on('change', '.module-gauge-selector', function () {
        const id_module = $(this).attr('id').substr(0, $(this).attr('id').length - 7);
        const suffix = $(this).val();
        const id_gauge = "#" + id_module + '_gauge' + suffix;
        $(this).parent().parent().parent().find('.slide-display').addClass('not-shown');
        $(id_gauge).removeClass('not-shown');
        Simulator.pinList.find(module => module.id == id_module).suffix = suffix;
    });

    $("body").on('change', '.module-color-selector', function () {
        const id_module = $(this).attr('id').substr(0, $(this).attr('id').length - 7);
        const mod = Simulator.getModuleByKey(id_module.split('_')[0]);
        for (var i = 0; i < mod.palette.length; i++) {
            if (mod.palette[i].title == $(this).val()) {
                $("#" + id_module).css("filter", 'hue-rotate(' + mod.palette[i].angle + 'deg)');
                break;
            }
        }
    });

    if (typeof READ_ANALOG_MAX_VALUE === "undefined") return;

    $('.mod_read-digital').slider({
        min: 0,
        max: 1
    });

    $('.mod_read-analog').slider({
        min: 1,
        max: READ_ANALOG_MAX_VALUE,
        value: Math.round(READ_ANALOG_MAX_VALUE / 2)
    });
};

/**
 * Callback function on slider changing.
 * @param {*} event 
 * @param {*} ui 
 */
Simulator.onSliderChanged = function (event, ui) {
    if (Simulator.Animator.isUpdating == true) {
        Simulator.Animator.isUpdating = false;
    } else {
        const tabModule = event.target.id.split('_');
        const coreId = tabModule[0];
        const pinModule = tabModule[1];
        const pinAnim = pinModule && pinModule !== "slider" ? "_" + pinModule : "";
        const mod = Simulator.getModuleByKey(coreId);
        Simulator.setAnimator(mod, coreId + pinAnim, ui.value, event.target.id, Simulator);
    }
};

/**
 * Update Animator for next mosaic animation. 
 * @param {Object} mod 
 * @param {string} id 
 * @param {*} value 
 * @param {string} sliderId 
 * @param {Object} _this 
 */
Simulator.setAnimator = function (mod, id, value, sliderId = null, _this = this) {
    _this.Animator.mod = mod;
    _this.Animator.id = id;
    _this.Animator.value = value;
    if (sliderId !== null) {
        _this.Animator.valueId = "#" + sliderId.replace('_slider', '_value');
        _this.Animator.sliderId = "#" + sliderId;
    } else {
        _this.Animator.valueId = "#" + id + '_value';
        _this.Animator.sliderId = null;
    }
    _this.Animator.animId = "#" + id + '_anim';
    if (mod.animate) {
        if (_this._hasAutoCorrector() && (AutoCorrector.isValidating || AutoCorrector.isRecording) && mod.type == 'output') {
            AutoCorrector.outputValues[id] = isNaN(value) ? value : (typeof value == 'object' ? value : roundFloat(value, 3));
        }
        mod.animate(_this.Animator);
    } else {
        console.warn("[Info] Simulator - no animator for module '" + id + "'")
    }
};

/**
 * Debugger tool.
 */
Simulator.Debugger = {

    variable_panel: [],
    debugMarker: null,
    timeoutDebug: 1000,
    lastLine: 0,
    nextStep: false,

    /**
     * Speed up or slow down execution based on button events.
     * @param {string} event
     */
    changeExecSpeed: function (event) {
        if (event == 'slow' && this.timeoutDebug < 500) {
            this.timeoutDebug += 250;
        } else if (event == 'slow' && this.timeoutDebug < 4000) {
            this.timeoutDebug += 500;
        } else if (event == 'fast' && this.timeoutDebug >= 1000) {
            this.timeoutDebug -= 500;
        } else if (event == 'fast' && this.timeoutDebug >= 500) {
            this.timeoutDebug -= 250;
        }
        $("#debugger-timeout").text(this.timeoutDebug / 1000 + ' s');
    },

    /**
     * Append tuple to table of variables panel.
     * @param {Object} variable 
     */
    addVarToPanel: function (variable) {
        let flagUnique = true;
        for (var index in this.variable_panel) {
            if (this.variable_panel[index].name == variable.name) {
                flagUnique = false;
                if (this.variable_panel[index].value != variable.value) {
                    this.variable_panel[index].value = variable.value;
                } else continue;
            }
        }
        if (flagUnique) {
            this.variable_panel.push(variable);
        }
    },

    /**
     * Empty variables panel.
     */
    emptyVariablesPanel: function () {
        this.variable_panel = [];
        this.refreshDisplayVars();
    },

    /**
     * Refresh entries in variables panel.
     */
    refreshDisplayVars: function () {
        // todo: refactor this to be usable by a11y features.
        // Currently, the table is emptied every second, so if we have focus with the keyboard,
        // the focus is automatically lost.
        $("#variables-table-body").html('');
        if (this.variable_panel.length === 0) {
            $("#variables-table-body").append('<tr><td colspan="3">' + jsonPath('code.simulator.messages.variables-panel-msg') + '</td></tr>');
        } else {
            for (var v in this.variable_panel) {
                const variable = this.variable_panel[v];
                const varHtml = '<tr tabindex="0"><td>' + variable.name + '</td><td>' + String(variable.value).slice(0, 17) + '</td><td>' + variable.type + '</td></tr>';
                $("#variables-table-body").append(varHtml);
            }
        }
    },

    /**
     * Toggle variables panel of simulator.
     * @param event: hide or show 
     */
    toggleVariablesPanel: function () {
        if ($("#variables-panel").css('display') == 'none') {
            $("#simulator_show_vars").addClass('activated');
            $("#variables-panel").css('display', 'block');
        } else {
            $("#simulator_show_vars").removeClass('activated');
            $("#variables-panel").css('display', 'none');
        }
    },

    /**
     * Toggle debug mode.
     */
    toggleDebugMode: function () {
        if ($("#debugger-container").css('display') == 'none') {
            $("#simulator_slow_play").addClass('activated');
            $("#debugger-container").css('display', 'block');
            Simulator.isDebugging = true;
            if (!Simulator.isRunning) {
                this.colorLineEditor(this.lastLine);
            }
        } else {
            $("#simulator_slow_play").removeClass('activated');
            $("#debugger-container").css('display', 'none');
            this.eraseBreakpoint();
            Main.updateCodeEditor();
            Simulator.isDebugging = false;
        }
    },

    /**
     * Color line by a yellow mark.
     * @param {int} line 
     */
    colorLineEditor: function (line) {
        // to keep => highlight block in python simulation
        // if (typeof Python2Blocks !== 'undefined') {
        //     Python2Blocks.highlightBlock(line);
        // }
        const Range = ace.require('ace/range').Range;
        this.debugMarker = Main.getCodeEditor().container.session.addMarker(new Range(line, 0, line, 1), "ace-debug-marker", "fullLine");
    },

    /**
     * Clean code editor from breakpoint lines.
     */
    eraseBreakpoint: function () {
        Main.getCodeEditor().container.session.removeMarker(this.debugMarker);
    },

    stepForward: function () {
        Simulator.clearCurrentDelay();
        this.nextStep = true;
    }
};

/**
 * Return list of modules simulated on interface.
 * @return {Array<Object>} module
 */
Simulator._getInterfaceModules = function () {
    if (!this.modules) {
        this.modules = new Array();
        this.modules = this.modules.concat(this.Mosaic.specific.definitions);
        if (this.Mosaic.groveRegex && this.Mosaic.grove) {
            this.modules = this.modules.concat(this.Mosaic.grove.definitions);
        }
        if (typeof READ_ANALOG_MAX_VALUE === "undefined") return;
        const getExtract = (id) => (this.Mosaic.specific.extractPin && this.Mosaic.specific.extractPin[id]) ? this.Mosaic.specific.extractPin[id] : null;
        const pinsModules = [{
            extractPin: getExtract("read-digital"),
            id: "read-digital",
            title: "Lecture digitale",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'input',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            extractPin: getExtract("write-digital"),
            id: "write-digital",
            title: "Ecriture digitale",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
            }
        },
        {
            extractPin: getExtract("read-analog"),
            id: "read-analog",
            title: "Lecture analogique",
            pin: 'pin n° ',
            pins: 'analog_read',
            type: 'input',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Bouton.png",
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            extractPin: getExtract("write-analog"),
            id: "write-analog",
            title: "Ecriture analogique",
            pin: 'pin n° ',
            pins: 'PWM',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, WRITE_ANALOG_MAX_VALUE);
            }
        },
        {
            extractPin: getExtract("pwm"),
            id: "pwm",
            title: "Signal PWM",
            pin: 'pin n° ',
            pins: 'PWM',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Animator.value);
                $(Animator.animId).css('opacity', Animator.value / PWM_MAX_DUTY);
            }
        }];
        var _this = this;
        pinsModules.forEach(item => _this.modules.push(item));
    }
};

/**
 * Update modules of mosaic simulator.
 */
Simulator.updateModules = async function () {
    if (this._hasTIsimulator()) {
        this.Mosaic.manageCompatibleTIboards();
    }
    if (this._hasWiringSimulator()) {
        WiringSimulator.closeModule();
    }
    this.pinError = null;
    //to check if some modules are changed or deleted
    if (this.getSimulatedModules().length > 0) {
        this.update_pinList();
    }
    //check all modules, add them if they weren't already present
    for (var i in this.modules) {
        const regex = this._checkRegex(this.modules[i]);
        if (regex !== undefined && this.code.match(regex) && this.code.match(regex)[0]) {
            this.addModule(this.modules[i], regex);
        }
    }

    // Manage Robot Simulator running.
    if (this._hasRobotSimulator() && RobotSimulator.wereInitialized) {
        let robot = Robots[RobotSimulator.currentRobotName];
        if (typeof this.Mosaic.getCurrentRobot === "function") {
            const robotName = this.Mosaic.getCurrentRobot();
            if (robotName != RobotSimulator.currentRobotName && robotName !== null && robotName !== 'error') {
                robot = Robots[robotName];
                RobotSimulator.currentRobotName = robotName;
                RobotSimulator.wereInitialized = false;
                console.log("Robot changed to " + robotName);
            } else if (robotName == 'error') {
                robot = null;
                this.pause();
                if (this._hasTIsimulator()) {
                    pseudoModal.openModal('modal-warning-ti-systems');
                } else {
                    pseudoModal.openModal('modal-warning-microbit-systems');
                }
            }
        }

        if (robot && this.code.match(robot.CODE_REGEXP)) {
            RobotSimulator.robot = robot;
            RobotSimulator.init();
            Simulator._classicRobotSimulatorPrepareForRun = true;
            Simulator._3DRobotSimulatorPrepareForRun = false;
            $("#robot-sim-container").show();
            await sleep_ms(50);
            if (!RobotSimulator.isRunning) {
                RobotSimulator.isRunning = true;
                RobotSimulator.run();
            }
        } else {
            if (RobotSimulator.isRunning) {
                RobotSimulator.isRunning = false;
                $("#robot-sim-container").hide();
            }
        }
    }

    if (this._has3DRobotSimulator() && typeof Simulator3D !== 'undefined') {
        if (typeof this.Mosaic !== 'undefined' && typeof this.Mosaic.getCurrentRobot3D === "function") {
            const robotName = this.Mosaic.getCurrentRobot3D()
            if (robotName === "error") {
                this.pause();
                pseudoModal.openModal('modal-warning-microbit-systems');
            } else {
                const robot = Robots3D[robotName];
                if (robot && this.code.match(robot.CODE_REGEXP)) {
                    Simulator._3DRobotSimulatorPrepareForRun = true;
                    Simulator._classicRobotSimulatorPrepareForRun = false;
                    $("#robot-sim-container").hide();
                    if (RobotSimulator.isRunning) {
                        RobotSimulator.isRunning = false
                    };
                    document.getElementById('experience-3d-container').style.display = 'flex';
                } else {
                    document.getElementById('experience-3d-container').style.display = 'none';
                }
            }
        }
    }

    // Manage Web Server Simulator running.
    if (this._hasWebSimulator()) {
        if (this.code.match(this.Mosaic.specific.SERVER_REGEXP)) {
            if (!$('#web-page-module').is(":visible")) {
                $('#web-page-module').show();
            }
            WifiSimulator.web_client.updateCssJs();
        } else {
            if (this.isOpen) {
                $('#web-page-module').hide();
                WifiSimulator.reset();
            }
        }
    }

    // Manage Wiring Simulator running.
    if (this._hasWiringSimulator()) {
        if (WiringSimulator.wereInitialized && !WiringSimulator.isRunning) {
            WiringSimulator.isRunning = true;
            WiringSimulator.run();
        }
    }
};

/**
 * Update the pin list used by all pin modules.
 */
Simulator.update_pinList = function () {
    const modules = this.getSimulatedModules();
    for (let i = modules.length - 1; i > -1; i--) {
        const moduleDiv = modules[i];
        if (moduleDiv !== undefined && moduleDiv.id !== undefined) {
            const id = moduleDiv.id.split('_')[0];
            const mod = this.modules.find(element => element.id == id);
            if (mod !== undefined) {
                const regex = this._checkRegex(mod);
                if (regex !== undefined && (typeof regex === 'object' || !this.code.match(regex))) {
                    $("#" + moduleDiv.id).remove();
                    const pinArray = this.pinList.map((x) => x.pin);
                    const pin = moduleDiv.id.split('_')[1];
                    if (pin && pinArray.indexOf(pin) != -1) {
                        this.pinList.splice(pinArray.indexOf(pin), 1);
                    }
                }
            }
        }
    }
};

/**
 * Add HTML div of module in mosaic simulation.
 * @param {Object} mod module
 * @param {RegExp} regex module regexp
 */
Simulator.addModule = function (mod, regex) {
    const moduleCode = this.code.split('\n')
        .filter(line => (regex.test && regex.test(line)) || line.match(regex))
        .filter(unique);

    const addModuleByPin = (pin, moduleCodeLine, slot) => {
        const pinDef = this.Mosaic.getPinDef(pin, mod);
        if (mod.multipleModules) {
            const nLine = moduleCodeLine.split(' ');
            for (let j = 0; j < parseInt(nLine[nLine.length - 1]); j++) {
                this.addModuleToDOM(mod, mod.id + '_' + pin + '-' + j, pinDef.name + ' - LED ' + j);
            }
        } else {
            this.addPinModule(mod, pin, slot);
            const moduleId = mod.id + '_' + pinDef.id;
            if (mod.type == 'output' && typeof mod.value !== 'undefined') {
                this.setAnimator(mod, moduleId, mod.value);
            }
            Simulator.setPullButton(moduleId, mod.pull ? mod.pull : 'down');
        }
    };

    for (let i = 0; i < moduleCode.length; i++) {
        if (moduleCode[i] !== undefined) {
            // case module is defined by pin
            let pinNumber = null;
            let slot = null;
            if (/pin n°/.test(mod.pin)) {
                if (mod.extractPin) {
                    const match = moduleCode[i].match(this.Mosaic.groveRegex[mod.id]);
                    pinNumber = match.map((str) => mod.extractPin(str));
                } else {
                    if (mod.codeFlag) {
                        let codeFlag = mod.codeFlag;
                        if (typeof mod.codeFlag === 'object') {
                            codeFlag = mod.codeFlag[0];
                        }
                        if (new RegExp(codeFlag).test(moduleCode[i])) {
                            if (mod.slots) {
                                const parser = moduleCode[i].replace(codeFlag + ' on ', "").replace(new RegExp(this.COMMENT_CHARACTER + ' '), '');
                                pinNumber = parser.replace(/SLOT_[0-9]/, "");
                                slot = parseInt(parser.replace(/PORT_[0-9]/, "").replace('SLOT_', ''));
                            } else {
                                pinNumber = moduleCode[i].replace(codeFlag, "").match(this.Mosaic.pin_regex);
                                if (!pinNumber) {
                                    pinNumber = moduleCode[i].slice(moduleCode[i].indexOf('"') + 1, moduleCode[i].lastIndexOf('"'));
                                }
                            }
                        } else if (/PIN_/.test(moduleCode[i]) && regex.source.includes('PIN_')) {
                            const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_';
                            pinNumber = moduleCode[i].match(regex)[0].replace(constantName, "");
                        } else {
                            pinNumber = moduleCode[i].match(this.Mosaic.pin_regex);
                            if (!pinNumber) pinNumber = moduleCode[i].match(/[0-9]{1,2}/);
                        }
                    } else {
                        pinNumber = moduleCode[i].match(this.Mosaic.pin_regex);
                    }
                    if (pinNumber && typeof pinNumber === 'object') {
                        pinNumber = pinNumber[0];
                    }
                }
                if (pinNumber) {
                    if (typeof pinNumber === "string") {
                        addModuleByPin(pinNumber, moduleCode[i], slot);
                    } else {
                        for (let j = 0; j < pinNumber.length; j++) {
                            addModuleByPin(pinNumber[j], moduleCode[i], slot);
                        }
                    }
                }
            } else {
                this.addModuleToDOM(mod, mod.id, mod.pin);
                if (mod.type === 'output' && typeof mod.value !== 'undefined') {
                    this.setAnimator(mod, mod.id, mod.value);
                }
                Simulator.setPullButton(mod.id, mod.pull ? mod.pull : 'down');
            }
            this.mosaicChanged = true;
        }
    }
};

/**
 * Add HTML div of a pin module in mosaic simulation.
 * @param {Object} mod module
 * @param {string} pinNumber module regexp
 * @param {string} slot
 */
Simulator.addPinModule = function (mod, pinNumber, slot) {
    const pin = this.Mosaic.getPinDef(pinNumber, mod);
    if (mod.builtin) {
        const pinName = mod.builtin + ' (p' + pin.id + ')';
        this.pinList.push({
            'id': mod.id,
            'pin': pin.id,
            'suffix': ""
        });
        this.addModuleToDOM(mod, mod.id, pinName);
    } else if (pin.name) {
        const id = mod.id + "_" + pin.id + (mod.slots ? '-' + slot : '');
        // case pin is not already used
        const usedPinIndex = this.pinList.map(x => x.pin).indexOf(pin.id);
        if (usedPinIndex == -1) {
            this.pinList.push({
                'id': id,
                'pin': pin.id + (mod.slots ? '-' + slot : ''),
                'suffix': mod.listeners ? mod.listeners[0].suffix : ""
            });
            this.addModuleToDOM(mod, id, pin.name + (mod.slots ? ' slot ' + slot : ''));
        } else {
            const attachedModId = this.pinList[usedPinIndex].id;
            const attachedMod = this.getModuleByKey(attachedModId.split('_')[0]);
            if (attachedModId !== id) {
                if (attachedMod.multiple && attachedMod.multiple.includes(mod.id)) {
                    this.addModuleToDOM(mod, id, pin.name);
                } else {
                    const digitalWriteAndPwm = mod.type === 'output' && ((attachedMod.pins === 'PWM' && mod.pins === 'digital') || (attachedMod.pins === 'digital' && mod.pins === 'PWM'));
                    const possibleCombine = (attachedMod.type === mod.type) && (attachedMod.pins === mod.pins || digitalWriteAndPwm);
                    const possibleCombination = !(typeof attachedMod.noCombine === 'undefined' || attachedMod.noCombine != true) || !(typeof mod.noCombine === 'undefined' || mod.noCombine != true);
                    if ((!possibleCombine || (typeof mod.extractPin === 'undefined' && typeof attachedMod.extractPin === 'undefined')) && !possibleCombination) {
                        this.pinError = "[Pin Error] The module <b>" + (mod.multiple ? mod.id.split('-')[0] : mod.id) + "</b> cannot be connected on pin <b>" + this.pinList[usedPinIndex].pin + "</b>. The module <b>" + (attachedMod.multiple ? attachedMod.id.split('-')[0] : attachedMod.id) + "</b> is already connected.";
                    }
                }
            }
        }
    }
};

/**
 * Add module HTML to 'simulator-modules' DOM or 'wiring-modules' DOM.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {string} pinName module pin name
 */
Simulator.addModuleToDOM = function (mod, id, pinName) {
    if (!$("#" + id).length) {
        const html = this.generateModuleDiv(mod, id, pinName);
        let divId = 'simulator-modules';
        if (Simulator.isInWiringMode) {
            divId = 'wiring-modules';
        }
        if (mod.large) {
            const mosaic = this.getMosaicModules();
            if (mosaic.length > 0) {
                $(html).insertBefore(mosaic[0]);
            } else {
                $('#' + divId).append(html);
            }
        } else {
            $('#' + divId).append(html);
        }
        if (mod.picture != undefined && mod.picture.includes(".svg")) {
            SVGInject(document.querySelectorAll("img." + mod.id + "_base"), {
                makeIdsUnique: false
            });
        }
        if (typeof mod.getBodyInjection !== 'undefined') {
            $('#' + mod.id + ' .module-body').append(mod.getBodyInjection());
        }
    }
};

/**
 * Generate HTML code for simulator-module div.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {string} pinName module pin name
 * @param {boolean} exerciseModule
 * @returns {string} html
 */
Simulator.generateModuleDiv = function (mod, id, pinName, exerciseModule = false) {
    // OPEN module-simulator div
    let html = `<div class="simulator-module ${mod.id}_module`;

    if (mod.large) {
        html += ' simulator-module-large';
    }

    html += exerciseModule
        ? ' exercise-module">'
        : `" id="${id}">`;

    // Add module-header div
    html += this.generateModuleDiv_header(mod, id, pinName);

    // OPEN module-body div
    html += `<div class="module-body body-${mod.type}">`;

    // Add module-image div
    if (mod.picture || mod.pictureAnimation) {
        html += this.generateModuleDiv_image(mod, id, exerciseModule);
    }

    if (!exerciseModule) {
        // OPEN module-value div
        html += '<div class="module-value">';

        // INPUTS / HYBRIDE (en entrée)
        if (mod.type === 'input' || mod.hybride) {
            for (const listener in mod.listeners) {
                html += this.generateModuleDiv_gauge(mod, id, listener);
            }
        }

        // OUTPUTS / HYBRIDE (en sortie)
        if (mod.type === 'output' || mod.hybride) {
            if (mod.canvas) {
                html += `<div class="${id}_canvas-container">
                            <canvas class="${id}_canvas"></canvas>
                         </div>`;
            } else {
                if (!mod.hybride || (mod.hybride && mod.type === 'output')) {
                    html += `<span id="${id}_value" class="${mod.id}_value_text`;

                    if (mod.class) {
                        html += ` ${mod.class}`;
                    }

                    html += `" aria-live="polite" aria-atomic="true"`;

                    if (mod.animate) {
                        html += `></span>`;
                    } else {
                        html += `>${mod.value}</span>`;
                    }
                }
            }
        }

        // CLOSE module-value div
        html += '</div>';
    }

    // CLOSE module-body & simulator-module divs
    html += '</div></div>';
    return html;
};






/**
 * Generate HTML code for module-header div.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {string} pinName module pin name
 * @returns {string} html
 */
Simulator.generateModuleDiv_header = function (mod, id, pinName) {
    let html = `<div class="module-header" role="region" aria-labelledby="${id}_title">`;
    html += `<span id="${id}_title" class="title-module">`;

    // if the module has several sliders, add the selector to the title
    if (mod.title !== undefined) {
        if (mod.listeners && mod.listeners.length > 1) {
            html += mod.title;
            html += `<select id="${id}_select" class="module-gauge-selector small" aria-label="Sélection du capteur pour ${mod.title}">`;
            for (let l in mod.listeners) {
                html += `<option style="color:${mod.listeners[l].color}" value="${mod.listeners[l].suffix}">${mod.listeners[l].title}</option>`;
            }
            html += '</select>';
        } else if (mod.palette) {
            html += mod.title;
            html += `<select id="${id}_select" class="module-color-selector small" aria-label="Sélection de couleur pour ${mod.title}">`;
            for (let c in mod.palette) {
                html += `<option>${mod.palette[c].title}</option>`;
            }
            html += '</select>';
        } else {
            html += mod.title;
        }
        html += '</span>';
    }

    if (mod.modalButton) {
        html += `
            <button
                id="${id}_modal-button"
                class="btn btn-outline-secondary btn-icon module-modal-button"
                onclick="Simulator.getModuleByKey('${mod.id}').modalButton.click()"
                aria-label="Ouvrir les options de ${mod.title || 'module'}"
            >
                <i class="${mod.modalButton.icon} module-modal-button-icon" aria-hidden="true"></i>
            </button>
        `;
    }

    if (mod.pin !== undefined) {
        html += '<br>';
        html += `<span class="subtitle-module`;

        if (/(I2C|AlphaBot|Arduino|Cutebot|Cutebot Pro)/.test(mod.pin)) {
            html += ' i2c-module';
        } else if (/(ESP32|STM32|Maqueen|micro:bit|Gamepad|Buggy|Codo|Oobybot|Innovator Hub|raspberrypi|Galaxia|GalaxiaCircuitPython|thymio)/.test(mod.pin)) {
            html += ' internal-module';
        } else if (/Rover|mCore|mBot|CyberPi/.test(mod.pin)) {
            html += ' blue-module';
        }

        const pinTitle = pinName + (mod.pins === 'PWM' ? ' ~' : '');
        html += `" aria-label="Connecté à ${pinTitle}">${pinTitle}</span>`;
    }

    return html + '</div>';
};


/**
 * Generate HTML code for module-img-group div.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {boolean} exerciseModule
 * @returns {string} html
 */
Simulator.generateModuleDiv_image = function (mod, id, exerciseModule) {
    let html = `<div class="module-img-group`;

    const isInteractive = !exerciseModule && (mod.pictureInteraction || mod.releaser);

    if (isInteractive) {
        html += ` has-interaction pulse-circle" role="button" tabindex="0"`;
        if (mod.pictureInteraction) {
            html += ` onclick="${mod.pictureInteraction}('${id}')"`;
            html += ` onkeypress="if(event.key === 'Enter' || event.key === ' ') { ${mod.pictureInteraction}('${id}'); event.preventDefault(); }"`;
        }
        html += ` aria-label="${mod.title || 'Module interactif'}"`;
    }

    html += `">`;

    // Picture animation (animated overlay)
    if (mod.pictureAnimation) {
        html += `<img class="module-img-anim${mod.class ? ' ' + mod.class : ''} ${mod.id}`;
        if (mod.id.includes("button")) {
            html += ' button-anim-up';
        }

        const animAlt = `${mod.title || 'Animation'} animée`;

        if (!exerciseModule) {
            html += `" id="${id}_anim" src="${_PATH}/interfaces/assets/media/simulator/modules/${mod.pictureAnimation}" alt="${animAlt}"`;
        } else {
            html += `" src="${_PATH}/interfaces/assets/media/simulator/modules/${mod.pictureAnimation}" alt="${animAlt}"`;
        }

        html += ' />';
    }

    // Static image
    if (mod.picture) {
        const picClass = mod.picture.includes('.svg') ? 'svg' : 'img';
        const imgAlt = mod.title || 'Illustration du module';

        html += `<img class="module-${picClass}-base ${mod.id}_base" src="${_PATH}/interfaces/assets/media/simulator/modules/${mod.picture}" alt="${imgAlt}">`;
    }

    // LED overlays
    if (mod.ledDiv && mod.ledDiv.length > 0) {
        for (let i = 0; i < mod.ledDiv.length; i++) {
            html += `<div id="${mod.ledDiv[i]}" aria-hidden="true"></div>`;
        }
    }

    html += '</div>';
    return html;
};




/**
 * Generate HTML code for gauges of listeners.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {Object} listener
 * @returns {string} html
 */
Simulator.generateModuleDiv_gauge = function (mod, id, listener) {
    const gauge = mod.listeners[listener];
    const value = typeof gauge.default !== 'undefined' ? gauge.default : '';
    const sliderId = `${id}_slider${gauge.suffix}`;
    const valueId = `${id}_value${gauge.suffix}`;
    const gaugeId = `${id}_gauge${gauge.suffix}`;
    const unit = gauge.unit || '';
    const color = gauge.color || '#000';

    const titleId = `${id}_title`;
    const connectionId = `${id}_connection`;

    let html = `<div id="${gaugeId}" class="slide-display${listener > 0 ? ' not-shown' : ''}">`;

    if (!mod.hybride || (mod.hybride && mod.type === 'input')) {
        html += `<span id="${valueId}" class="${mod.id}_value_text${mod.class ? ' ' + mod.class : ''}">`;
        html += `${value}</span>&nbsp;${unit}`;
    }

    html += `
        <div
            class="sim_slider mod_${mod.id}${gauge.suffix}"
            id="${sliderId}"
        >
            <div
                class="ui-slider-handle"
                role="slider"
                tabindex="0"
                aria-valuemin="${gauge.min ?? 0}"
                aria-valuemax="${gauge.max ?? 100}"
                aria-valuenow="${value}"
                aria-orientation="vertical"
                aria-labelledby="${titleId} ${connectionId} ${valueId}"
                style="cursor: pointer; background: ${color} !important;"
            ></div>
        </div>
    `;

    html += '</div>';
    return html;
};


/**
 * Return JSON of module definition by a key.
 * @param {string} value
 * @param {string} [key='id']
 * @return {Object} module
 */
Simulator.getModuleByKey = function (value, key = 'id') {
    const mod = this.modules
        .find(x => (
            x[key] === value ||
            (key === 'codeFlag' && x[key] !== undefined && x[key].includes(value))
        ));
    if (mod !== undefined) {
        return mod;
    }
    console.error("Simulator Error: no module with module " + key + ": " + value);
};

/**
 * Get regex of specified module. Print error if not found.
 * @param {Object} mod module
 * @return {RegExp} regex
 */
Simulator._checkRegex = function (mod) {
    let regex = mod.regex;
    if (regex === undefined) {
        regex = this.Mosaic.groveRegex[mod.id];
        if (this.Mosaic.groveRegex && regex) {
            // Specific case for TI-83 : board = hub or microbit
            if (!(regex instanceof RegExp) && typeof this.Mosaic.getCurrentBoard !== 'undefined') {
                if (this.Mosaic.getCurrentBoard()) {
                    regex = regex[this.Mosaic.getCurrentBoard()];
                } else {
                    return undefined;
                }
            }
        } else if (mod.codeFlag !== undefined) {
            const modFlag = typeof mod.codeFlag == 'object' && mod.codeFlag.length > 0 ? mod.codeFlag[0] : mod.codeFlag;
            if (["esp32", "pico", "galaxia"].includes(Main.getInterface())) {
                regex = new RegExp(this.COMMENT_CHARACTER + ' ' + modFlag + ' on p' + this.Mosaic.pin_regex.source);
            } else {
                regex = new RegExp(this.COMMENT_CHARACTER + ' ' + modFlag + ' on ' + this.Mosaic.pin_regex.source);
            }
        } else {
            // console.error("Simulator Error: no regex for module '" + mod.id + "'"); /* Debug! */
        }
    }
    return regex;
};

Simulator.getSimulatedModules = function () {
    return $(".simulator-module:not(.exercise-module):not(.empty-module)");
};

Simulator.setPullButton = function (id, pull) {
    if (id) {
        if (pull === 'no_pull') pull = 'down';
        const component = this.pinList.find(module => module.id == id);
        let coreId = id;
        if (component) {
            component.pull = pull;
            coreId = component.id.split('_')[0];
        }
        const module = this.getModuleByKey(coreId);
        if (module) {
            const moduleDiv = $('#' + id + ' .module-img-group')[0];
            $('.mod_button').slider({
                value: pull === 'up' ? 1 : 0
            });
            const update = function (e) {
                $("#" + id).find($('.has-interaction')).removeClass('pulse-circle');
                switch (e.type) {
                    case 'mousedown':
                        if (pull == 'up') {
                            if (Simulator.getSliderValue(id) == 1) {
                                Simulator.setSliderValue(id, 0);
                            }
                        } else if (pull = 'down') {
                            if (Simulator.getSliderValue(id) == 0) {
                                Simulator.setSliderValue(id, 1);
                            }
                        }
                        break;
                    case 'mouseup':
                        if (pull == 'up') {
                            if (Simulator.getSliderValue(id) == 0) {
                                Simulator.setSliderValue(id, 1);
                            }
                        } else if (pull = 'down') {
                            if (Simulator.getSliderValue(id) == 1) {
                                Simulator.setSliderValue(id, 0);
                            }
                        }
                        break;
                }
            };
            if (module.releaser) {
                moduleDiv.addEventListener('mouseup', update);
                moduleDiv.addEventListener('mousedown', update);
            }
        }
    }
};

/** UTILS **/

/**
 * Promise for waiting (in milliseconds).
 * @param {int} ms
 * @return {Promise}
 */
function sleep_ms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Round value with specified decimals.
 * @param {number} value
 * @param {int} digits
 * @return {number}
 */
function roundFloat(value, digits = 2) {
    const f = Math.pow(10, digits);
    return Math.round(value * f) / f;
};

/** INTERACTION FUNCTIONS IN MODULES */

/**
 * Switch the slider of the given module id.
 * @param {string} id module id
 */
function buttonPush(id) {
    $("#" + id).find($('.has-interaction')).removeClass('pulse-circle');
    $("#" + id + '_slider').slider("value", $("#" + id + '_slider').slider('option', 'value') > 0 ? 0 : 1);
};

/**
 * Initialize map for GPS module.
 */
function initializeMap() {
    var latitude = $("#gps_slider_lat").slider('option', 'value'),
        longitude = $("#gps_slider_lon").slider('option', 'value');

    if (typeof latitude != 'number' && typeof longitude != 'number') {
        latitude = $("#m5-gps_slider_lat").slider('option', 'value');
        longitude = $("#m5-gps_slider_lon").slider('option', 'value');
    }
    const defaultLatlng = {
        lat: latitude,
        lng: longitude
    };

    // add the current position on the modal values
    $("#modal-lat").html(defaultLatlng.lat);
    $("#modal-lng").html(defaultLatlng.lng);

    // initialize Leaflet with a map centered on Europe
    let map = L.map('map').setView(
        [49.033, 22.148],
        4
    );

    // add the OpenStreetMap tiles
    L.tileLayer(`/utils/Backend/maptilerProxy.php?url=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png`, { //style URL
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
    }).addTo(map);

    // show the scale bar on the lower left corner
    L.control.scale({
        imperial: true,
        metric: true
    }).addTo(map);

    // show a marker on the map with a popup
    let marker = L.marker([defaultLatlng.lat, defaultLatlng.lng]).addTo(map);
    marker.bindPopup('Cliquez sur la carte pour mettre en place la latitude et la longitude !').openPopup();

    // add custom icon and shadow
    let myIcon = L.icon({
        iconUrl: '/openInterface/interfaces/assets/media/leaflet/marker.png',
        shadowUrl: '/openInterface/interfaces/assets/media/leaflet/marker_shadow.png',
        iconSize: [24.5, 33.5],
        iconAnchor: [12, 30],
        popupAnchor: [1, -34],
    });
    marker.setIcon(myIcon);


    // on click, show the coordinates of that location
    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        // remove popup 
        marker.unbindPopup();

        // add popup with new coordinates and a substring of the coordinates
        $("#modal-lat").html((e.latlng.lat).toString().substring(0, 6));
        $("#modal-lng").html((e.latlng.lng).toString().substring(0, 6));

        $("#gps_slider_lat").slider("value", e.latlng.lat);
        $("#gps_slider_lon").slider("value", e.latlng.lng);
        $("#m5-gps_slider_lat").slider("value", e.latlng.lat);
        $("#m5-gps_slider_lon").slider("value", e.latlng.lng);

    });
};

/**
 * Load lagitude & longitude in gps module div. Close map modal.
 */
function loadLatLng() {
    $("#gps_slider_lat").slider('value', Number($("#modal-lat").html()).toFixed(4));
    $("#gps_slider_lon").slider('value', Number($("#modal-lng").html()).toFixed(4));
    $("#m5-gps_slider_lat").slider('value', Number($("#modal-lat").html()).toFixed(4));
    $("#m5-gps_slider_lon").slider('value', Number($("#modal-lng").html()).toFixed(4));
    pseudoModal.closeModal('modal-gpsmap');
};

// dev
Simulator.DevSide = {
    viewAllModules: function () {
        $("#simulator-modules").html("");
        $("#robot-sim-container").hide();
        $("#simulator_fullscreen").click();
        $(".chevron_toggler").click();
        $("#simulator").css('width', '100%');
        Simulator._getInterfaceModules();
        for (var i = 0; i < Simulator.modules.length; i++) {
            const id = Simulator.modules[i].id + '_' + i;
            Simulator.addModuleToDOM(Simulator.modules[i], id, /pin n°/.test(Simulator.modules[i].pin) ? "PORT 1-2-3-4" : Simulator.modules[i].pin);
            // neopixel
            if (/(neopixel|RGBLed)/.test(id)) {
                let html = '<div class=row>';
                for (var led = 0; led < (/RGBLed/.test(id) ? 4 : 30); led++) {
                    html += '<div class="neopixel-block ' + id + '" style="background-color:#000000;"></div>';
                }
                html += "</div>";
                $('#' + id + '_value').html(html);
            }
        }
        Simulator.initMosaicSliders();
        if (typeof Simulator.Mosaic.specific.createSliders !== 'undefined') {
            Simulator.Mosaic.specific.createSliders();
        }
        if (Simulator.Mosaic.groveRegex && Simulator.Mosaic.grove) {
            Simulator.Mosaic.grove.createSliders();
        }
    }
};

const SimulatorLS = {
    initialized: false,
    storage: {},
    projectOptions: {},
    data: {
        backgrounds: {},
        initialAngles: {},
        initialPositions: {},
        initialZooms: {}
    },
    /**
     * Check localStorage of simulator. Initialize objects.
     */
    check: function () {
        if (!this.initialized) {
            if (!localStorage.simulatorData) {
                this.storage[INTERFACE_NAME] = {};
                localStorage.simulatorData = JSON.stringify(this.storage);
            } else {
                this.storage = JSON.parse(localStorage.simulatorData);
            }
            if (this.storage[INTERFACE_NAME]) {
                for (var key of Object.keys(this.data)) {
                    if (this.storage[INTERFACE_NAME][key]) {
                        this.data[key] = this.storage[INTERFACE_NAME][key];
                    }
                }
            } else {
                this.storage[INTERFACE_NAME] = {};
            }
            this.initialized = true;
        }
    },
    /**
     * Update localStorage with SimulatorLS.storage.
     * Send a ping to projectManager to state need saving. 
     */
    update: function () {
        this.check();
        localStorage.simulatorData = JSON.stringify(this.storage);
        if (typeof projectManager !== 'undefined' && projectManager) {
            projectManager._refreshProjectStatus();
        }
    },
    /**
     * Set storage with a key and its value.
     * @param {String} key 
     * @param {*} value 
     */
    set: function (key, value) {
        this.check();
        this.storage[INTERFACE_NAME][key] = value;
        this.update();
    },
    /**
     * Get value of storage element by key.
     * @param {String} key 
     * @returns value
     */
    get: function (key) {
        this.check();
        return this.storage[INTERFACE_NAME][key];
    },
    /**
     * Set data by a key and its value and by robot name.
     * @param {String} robotName 
     * @param {String} key 
     * @param {*} value 
     * @param {function} formatCallback
     */
    setData: function (robotName, key, value, formatCallback = null) {
        value = formatCallback ? formatCallback(value) : value;
        if (this.data[key][robotName] !== `${value}`) {
            this.data[key][robotName] = `${value}`;
            this.set(key, this.data[key]);
        }
    },
    /**
     * Get data by key and robot name.
     * @param {String} robotName 
     * @param {String} key 
     * @returns value
     */
    getData: function (robotName, key) {
        if (typeof this.projectOptions[key] !== 'undefined' && this.projectOptions[key] !== null && robotName) {
            this.setData(robotName, key, this.projectOptions[key]);
            delete this.projectOptions[key];
        }
        const data = this.get(key);
        return data ? data[robotName] : null;
    },
    /**
    * Format robot background filename.
    * @param {String} fileName
    * @returns value
    */
    backgroundFormat(fileName) {
        const wrongFileName = fileName.match(/robot(N|n)ame/gi);
        return (wrongFileName !== null && wrongFileName.length > 0 ? fileName.split(wrongFileName[0])[1] : fileName);
    }
};