// Check if we are in the vittascience or open Interface alone and select the correct path for images
const unique = (value, index, self) => {
    return self.indexOf(value) === index
};

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
Simulator._userCode = null;

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
 * @type {float} lastUpdate
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
 * @type {function} currentTimeouts
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
    /* TI-83 simulator focus management */
    if (this._hasTIsimulator()) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const ti83Toggler = document.getElementById('ti83_zone-toggler');
            if (ti83Toggler) {
                ti83Toggler.focus();
                clearInterval(interval);
            } else if (Date.now() - startTime > 2_000) {
                clearInterval(interval);
            }
        }, 50);
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
    if (this.hasRobotSimulator()) {
        RobotSimulator.isRunning = false;
        $("#graph-zoom-in").prop('disabled', false);
        $("#graph-zoom-out").prop('disabled', false);
    }
    if (this._hasWebSimulator()) {
        WifiSimulator.reset();
    }
    if (this._hasWiringSimulator()) {
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
Simulator.init = async function () {
    try {
        if (this._hasMultiSimulator() && document.querySelector('#simulator-multi-info') === null) {
            this.addMultiSimulatorToDom();
        }
        this.initBoard();
        if (['arduino', 'esp32'].includes(INTERFACE_NAME)) {
            this.updateBoard_v2();
        } else {
            this.updateBoard();
        }
        this._getInterfaceModules();

        if (this.Mosaic.externalLibraries && typeof this.Mosaic.externalLibraries.init !== 'undefined') {
            this.Mosaic.externalLibraries.init();
        }
        if (typeof this.Mosaic.addSpecificInitializations !== 'undefined') {
            this.Mosaic.addSpecificInitializations();
        }
        if (typeof this.Mosaic.addSpecificSkulptFunctions !== 'undefined') {
            this.Mosaic.addSpecificSkulptFunctions();
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
        if (this.hasRobotSimulator()) {
            if (typeof SIMULATOR_DEFAULT_ROBOT !== 'undefined' && SIMULATOR_DEFAULT_ROBOT) {
                RobotSimulator.currentRobotName = SIMULATOR_DEFAULT_ROBOT;
            }
            await RobotSimulator.init();
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
            await this.waitForVoices();
        }
        /* Python interfaces */
        if (this.TYPE == 'Skulpt' && !this.skInitialized) {
            await this.initSkulpt();
        }

        this.updateSimulatorInterval = null;
        this.updateVariablesPanelInterval = null;

        if (!['winky', 'sphero', 'lotibot', 'bluebot', 'spike', 'photon'].includes(INTERFACE_NAME)) {
            window.addEventListener("visibilitychange", () => {
                if (this.isOpen) {
                    if (document.visibilityState === 'visible') {
                        if (this.isVittaCompanionConnected()) return;
                        if (this.wasRunning) {
                            this.play();
                            this.wasRunning = false;
                        }
                    } else {
                        if (!this.isStopped) this.wasRunning = true;
                        this.pause();
                    }
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
Simulator.update = async function (forcedUpdate = false) {
    try {
        this._requestWirelessSimulation();
        const userCode = CodeManager.getSharedInstance().getCode();
        if (forcedUpdate ||userCode != this._userCode || this._userCode == null) {
            this.code = typeof this.CodeFriendly.getAdaptedCode !== 'undefined' ? this.CodeFriendly.getAdaptedCode(userCode) : userCode;
            this._userCode = userCode;
            if (this._hasAutoCorrector() && $('#simulator-modules').hasClass("visualizer-mode")) {
                $("#training-mode").click();
            }
            try {
                this.updateModules(this.code);
            } catch (e) {
                console.error(e);
            }
            if (!$('#simulator-modules').hasClass("visualizer-mode")) {
                if (this.hasRobotSimulator()) {
                    if (RobotSimulator.robot && RobotSimulator.robot.resetObjects) {
                        RobotSimulator.robot.resetObjects();
                    }
                }
                await this.replay();
            }
            if (projectManager !== null && projectManager._currentExercise !== "no-exercise" && this._hasAutoCorrector()) {
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

Simulator.setIntervalUpdate = function () {
    this.updateSimulatorInterval = setInterval(async () => {
        if (this.isOpen) {
            if (['lotibot', 'bluebot'].includes(INTERFACE_NAME)) {
                if (typeof this.Mosaic.specific.arrowsCoding !== 'undefined' && this.Mosaic.specific.arrowsCoding) return;
                if (this.isRunning && Math.floor((Date.now() - this.lastUpdate)) > this.TIMEOUT_UPDATE) {
                    await this.update();
                } else {
                    return;
                }
            } else if (Main.getCodingMode() !== 'code' || (this.isRunning && Math.floor((Date.now() - this.lastUpdate)) > this.TIMEOUT_UPDATE)) {
                if (this.isVittaCompanionConnected() || this.bluetoothDeviceConnected() || (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null)) {
                    return;
                }
                await this.update();
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
    if (this.isVittaCompanionConnected()) return;
    $("#simulator_play").prop('disabled', true);
    $("#simulator_pause").prop('disabled', false);
    if (this.has3DRobotSimulator() && typeof Simulator3D !== 'undefined' && typeof Simulator3D.pause === 'function') {
        Simulator3D.play();
    }
    if (this.wasPaused) {
        this.wasPaused = false;
        this.isRunning = true;
        if (this._hasWebSimulator()) {
            WifiSimulator.server.active(true);
        }
        this.resumeModulesAnimations();
    } else {
        if (this.audioContext && this.audioContext.state != 'closed') {
            this.audioContext.suspend();
        }
        const userCode = CodeManager.getSharedInstance().getCode();
        this.code = typeof this.CodeFriendly.getAdaptedCode !== 'undefined' ? this.CodeFriendly.getAdaptedCode(userCode) : userCode;
        this.isRunning = true;
        this.prepareToRun();
        await this.update();
        if (typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) {
            AndroidInterface.buddySayYes(20, 20);
            AndroidInterface.buddySayNo(40, 5);
            AndroidInterface.webviewDisplay(false);
        }
        if (this.pinError === null) {
            const board_toggler = document.getElementById('simulator-board-toggler');
            if (!(typeof AndroidInterface !== 'undefined' && AndroidInterface !== null) && (board_toggler !== null && !board_toggler.classList.contains('closed'))) {
                await this.waitBoardViewer();
            }
            this.runCode();
        } else {
            UIManager.showErrorMessage('error-message', this.pinError);
            this.isRunning = false;
            this.isStopped = true;
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

    if (this.has3DRobotSimulator() && typeof Simulator3D !== 'undefined' && typeof Simulator3D.pause === 'function') {
        Simulator3D.pause();
    }

    $("#simulator_play").prop('disabled', false);
    $("#simulator_pause").prop('disabled', true);
    this.wasPaused = true;
    this.isRunning = false;
    if (this._hasWebSimulator()) {
        WifiSimulator.server.active(false);
    }
    this.pauseModulesAnimations();
};

/**
 * Replay the simulator.
 */
Simulator.replay = async function () {
    this.cancelPromisesSimulator = true;
    if (!this.isStopped) {
        $("#simulator_replay").prop('disabled', true);
        $("#simulator_play").prop('disabled', false);
        $("#simulator_pause").prop('disabled', false);
        await this.stop();
    }
    this.Debugger.emptyVariablesPanel();
    this.Debugger.eraseBreakpoint();
    this.Components.Button.reset();
    if (this.hasRobotSimulator() && RobotSimulator.isRunning) {
        RobotSimulator.restartRobot();
        RobotSimulator.Pen.positions = new Array();
    }
    if ((this.has3DRobotSimulator() || this._has3DInterface()) && typeof Simulator3D !== 'undefined' && typeof Simulator3D.startPosition !== 'undefined') {
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
    if (this.isVittaCompanionConnected()) return;
    this.play();
    $("#simulator_replay").prop('disabled', false);
    $("#simulator_play").prop('disabled', true);
    $("#simulator_pause").prop('disabled', false);
};

/**
 * Stop the simulator.
 */
Simulator.stop = function () {
    if (this.isStopped) return;
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
            delete this.currentTimeouts[id];
        }
        if (this.clearCurrentDelay !== null) {
            this.clearCurrentDelay();
        }
        if (this.currentDelays) {
            Object.values(this.currentDelays).forEach(resolve => resolve());
            this.currentDelays = {};
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
                    return resolve();
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
    this.setIntervalUpdate();
    this.setIntervalUpdateVariablesPanel();
    if (typeof this.Mosaic.specific.createSliders !== 'undefined') {
        this.Mosaic.specific.createSliders();
    }
    if (typeof this.Mosaic.groveRegex !== 'undefined' && typeof this.Mosaic.grove !== 'undefined') {
        this.Mosaic.grove.createSliders();
    }
    if (typeof this.Mosaic.groveRegex !== 'undefined' && typeof this.Mosaic.grove_analog !== 'undefined') {
        this.Mosaic.grove_analog.createSliders();
    }
    this.isStopped = false;
    console.log("prepareToRun()")
    $("#board-viewer").removeClass('greyscale');
    if (Main.getInterface() !== "TI-83") {
        if (typeof this.Mosaic.BOARD_HEADER !== 'undefined') {
            $('#board-container').html(this.Mosaic.BOARD_HEADER);
        } else {
            $('#board-container').html(`<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`);
        }
        if (['arduino', 'esp32'].includes(INTERFACE_NAME)) {
            this.updateBoard_v2();
        } else {
            this.updateBoard();
        }
    } else {
        this.Mosaic.specific.ti.clearTurtleScreen();
        this.Mosaic.manageCompatibleTIboards(true);
    }
    if (Main.getInterface() === "m5stack") {
        this.Mosaic.specific.m5ui.init();
        this.Mosaic.specific.m5ui.reset();
    }
    UIManager.resetMessage("error-message");
    if (!this.isInWiringMode) {
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

/**
 * Waits for speechSynthesis voices to be loaded.
 */
Simulator.waitForVoices = async function () {
    return new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length !== 0) {
            this.voices = voices;
            resolve(voices);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                const newVoices = speechSynthesis.getVoices();
                this.voices = newVoices;
                resolve(newVoices);
            };
        }
    });
};

Simulator.getAnimatedElements = function () {
    return [...document.querySelectorAll("#simulator-modules *")]
        .filter(el => getComputedStyle(el).animationName !== "none");
};

Simulator.pauseModulesAnimations = function () {
    this.getAnimatedElements().forEach(el => {
        el.style.animationPlayState = "paused";
    });
};

Simulator.resumeModulesAnimations = function () {
    this.getAnimatedElements().forEach(el => {
        el.style.animationPlayState = "running";
    });
};

Simulator.initBoard = function () {
    if (Main.hasBoardSelector()) {
        const boardId = Blockly.Constants.getSelectedBoard();
        this.board = INTERFACE_BOARDS[boardId];
        if (['arduino', 'esp32'].includes(INTERFACE_NAME)) {
            document.getElementById("simulator-board-options").innerHTML = "";
            const addButton = (buttonId, boardName, isShield = false) => {
                const btn = `<button id="${buttonId}" class="dropdown-item" onclick="updateBoard(true, '${boardId}', ${isShield});" data-board="${boardName}">${boardName}</button>`;
                document.getElementById("simulator-board-options").innerHTML += btn;
            };
            addButton("main-board", this.board.name);
            if (Object.values(INTERFACE_BOARDS).filter(item => item.shieldId !== undefined).map(item => item.id).includes(boardId)) {
                addButton("shield-grove", INTERFACE_BOARDS[boardId].shieldName, true);
            }
        }
    } else {
        this.board = SIMULATOR_DEFAULT_BOARD;
    }
};

/**
 * Update board viewer on simulator.
 * @param {string} link 
 * @param {string} name 
 */
Simulator.updateBoard = function (link, name) {
    if (link && name) {
        this.board = {
            "link": link,
            "name": name
        };
    }
    if (this.board.link) {
        const path = _PATH + "/" + INTERFACE_NAME + "/assets/media/simulator/board/" + this.board.link;
        if (/(microbit|wb55|l476|mBot|m5stack|galaxia|GalaxiaCircuitPython|buddy|cyberpi|pico|eliobot|thymio|raspberrypi|lotibot|photon|bluebot|codey|steami|alphai)/.test(INTERFACE_NAME) && (this.board.link).includes('.svg')) {
            $("#board-viewer").attr("data", path);
        } else {
            $("#board-viewer").css('background-image', "url('" + path + "')");
        }
    }
    $("#title-board").html(this.board.name);
    if (Main.hasBoardSelector()) {
        const options = document.querySelectorAll("#simulator-board-options .dropdown-item");
        options.forEach((option) => {
            const optionValue = option.getAttribute('data-board');
            if (optionValue === this.board.name && !option.classList.contains('fw-bold')) {
                option.classList.add('fw-bold');
            } else if (optionValue !== this.board.name && option.classList.contains('fw-bold')) {
                option.classList.remove('fw-bold');
            }
        });
        if (typeof this.Mosaic.addSpecificInitializations !== 'undefined') {
            this.Mosaic.addSpecificInitializations();
        }
    }
};

Simulator.updateBoard_v2 = function (boardId, shield = false) {
    if (boardId) {
        if (shield) {
            VittaInterface.shieldView = true;
        } else {
            VittaInterface.shieldView = false;
        }
    }
    if (!boardId) boardId = Blockly.Constants.getSelectedBoard();
    if (!this.board) this.initBoard();
    if (!this.board) return;
    const img = (filename) => _PATH + "/" + INTERFACE_NAME + "/assets/media/simulator/board/" + filename;
    const path = VittaInterface.shieldView ? img(this.board.shieldLink) : img(this.board.link);
    const name = VittaInterface.shieldView ? this.board.shieldName : this.board.name;
    $("#board-viewer").attr("data", path);
    $("#title-board").html(name);
    const options = document.querySelectorAll("#simulator-board-options .dropdown-item");
    options.forEach((option) => {
        option.classList.remove('fw-bold');
        const optionValue = option.getAttribute('data-board');
        if (
            ((optionValue === this.board.name && !VittaInterface.shieldView) || (optionValue == this.board.shieldName && VittaInterface.shieldView))
            && !option.classList.contains('fw-bold')) {
            option.classList.add('fw-bold');
        }
    });
    if (typeof this.Mosaic.addSpecificInitializations !== 'undefined') {
        this.Mosaic.addSpecificInitializations();
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
    if (this.isInWiringMode) {
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
    const component = this.pinList.find((component) => component.pin == pin);
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
        const sliderId = `#${id}_slider${typeof suffix === 'undefined' ? '' : suffix}`;
        const el = document.querySelector(sliderId);
        if (el) {
            return $(sliderId).slider('option', 'value');
        } else {
            console.error("Unable to find slider: " + sliderId);
        }
    }
    return 0;
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
        "arduino": /(SoftwareSerial (HM10|blueToothSerial)|#include (<|")WiFiS3.h("|>))/
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
        const fullScreenBtnICon = document.querySelector("#simulator_fullscreen i");
        if (state) {
            if (fullScreenBtnICon) {
                fullScreenBtnICon.classList.replace('fa-expand', 'fa-compress');
            }
            $("#simulator_fullscreen").addClass('activated');
            $("#simulator_autocorrector_fullscreen").addClass('activated');
            $(".ide-simulator").addClass("isFullscreen");
            if (!this._has3DInterface()) {
                $("#simulator").css('width', "60%");
            }
            if (INTERFACE_NAME == "buddy")
                $("#board-viewer").css('height', "fit-content");
        } else {
            if (fullScreenBtnICon) {
                fullScreenBtnICon.classList.replace('fa-compress', 'fa-expand');
            }
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
    if (this.hasRobotSimulator() && RobotSimulator.isRunning) {
        RobotSimulator.resize();
    }
    if (this._hasWiringSimulator() && WiringSimulator.isRunning) {
        WiringSimulator.resize();
    }
    if (this._hasWebSimulator()) {
        WifiSimulator.resize();
    }
    if (this._has3DInterface() && typeof Simulator3D !== 'undefined') {
        if (typeof Simulator3D.robotFullscreenMode === 'function') {
            Simulator3D.robotFullscreenMode(this.isFullscreen);
        }
        Simulator3D.experience.toggleFullscreen(this.isFullscreen);
    }
};

/**
 * Save dropdown options and redo dropdown options is not yet implemented.
 * It allows the simulator to save options of slider, and get it back when simulator open again.
 */
Simulator.saveDropdownOptions = function () {
    const simulatedModules = this.getMosaicModules();
    for (let i = 0; i < simulatedModules.length; i++) {
        const select = "#" + simulatedModules[i].id + "_select";
        if ($(select).length) {
            this.dropdownOptions["#" + simulatedModules[i].id] = $(select + " option:selected").text();
        }
    }
};

Simulator.redoDropdownOptions = function () {
    const simulatedModules = this.getMosaicModules();
    for (let i = 0; i < simulatedModules.length; i++) {
        let id = "#" + simulatedModules[i].id;
        let select = id + "_select";
        if ($(select).length && this.dropdownOptions[id]) {
            let value = this.dropdownOptions[id];
            $(select + ' option').filter(function () {
                return ($(this).text() == value);
            }).prop('selected', true);
            if ($(select).hasClass('module-color-selector')) {
                //this.Sliders.updatePaletteColor(simulatedModules[i].id, value);
            }
        }
    }
};

/**
 * Check if interface has to add Robot simulator.
 * @return {boolean} state
 */
Simulator.hasRobotSimulator = function (board) {
    if (INTERFACE_NAME == "esp32") {
        if (!board) board = Blockly.Constants.getSelectedBoard();
        return board == BOARD_NANO_ESP32;
    }
    return ["microbit", "wb55", "l476", "TI-83", "mBot", "buddy", "cyberpi", "pico", "eliobot", "thymio", "sphero", "lotibot", "bluebot", "photon", "codey", "alphai"].includes(INTERFACE_NAME);
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
Simulator.has3DRobotSimulator = function (board) {
    if (INTERFACE_NAME == "esp32") {
        if (!board) board = Blockly.Constants.getSelectedBoard();
        return board == BOARD_ILO;
    }
    return ["l476"].includes(INTERFACE_NAME);
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
Simulator._hasWebSimulator = function (board) {
    if (INTERFACE_NAME == "arduino") {
        if (!board) board = Blockly.Constants.getSelectedBoard();
        return board == BOARD_ARDUINO_UNO_R4_WIFI;
    }
    return ["esp32", "m5stack", "galaxia", "pico"].includes(INTERFACE_NAME);
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
        change: this.onSliderChanged.bind(this)
    }).on("slide", this.onSliderChanged.bind(this));

    $("body").on('change', '.module-gauge-selector', () => {
        const id_module = $(this).attr('id').substr(0, $(this).attr('id').length - 7);
        const suffix = $(this).val();
        const id_gauge = "#" + id_module + '_gauge' + suffix;
        $(this).parent().parent().parent().find('.slide-display').addClass('not-shown');
        $(id_gauge).removeClass('not-shown');
        this.pinList.find(module => module.id == id_module).suffix = suffix;
    });

    $("body").on('change', '.module-color-selector', () => {
        const id_module = $(this).attr('id').substr(0, $(this).attr('id').length - 7);
        const mod = this.getModuleByKey(id_module.split('_')[0]);
        for (let i = 0; i < mod.palette.length; i++) {
            if (mod.palette[i].title == $(this).val()) {
                $("#" + id_module).css("filter", 'hue-rotate(' + mod.palette[i].angle + 'deg)');
                break;
            }
        }
    });

    $('.mod_read-digital').slider({
        min: 0,
        max: 1
    });

    if (typeof READ_ANALOG_MAX_VALUE === "undefined") return;

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
    if (this.Animator.isUpdating == true) {
        this.Animator.isUpdating = false;
    } else {
        const tabModule = event.target.id.split('_');
        const coreId = tabModule[0];
        const pinModule = tabModule[1];
        const pinAnim = pinModule && pinModule !== "slider" ? "_" + pinModule : "";
        const mod = this.getModuleByKey(coreId);
        this.setAnimator(mod, coreId + pinAnim, ui.value, event.target.id, this);
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
        if (Simulator.currentDelays) {
            Object.values(Simulator.currentDelays).forEach(resolve => resolve());
            Simulator.currentDelays = {};
        }
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
        if (this.Mosaic.groveRegex && this.Mosaic.grove_analog) {
            this.modules = this.modules.concat(this.Mosaic.grove_analog.definitions);
        }
        if (typeof READ_ANALOG_MAX_VALUE === "undefined") return;
        const getExtract = (id) => (this.Mosaic.specific.extractPin && this.Mosaic.specific.extractPin[id]) ? this.Mosaic.specific.extractPin[id] : null;
        const pinsModules = [{
            extractPin: getExtract("read-digital"),
            id: "read-digital",
            title: "Lecture digitale",
            pin: 'pin n°',
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
            pin: 'pin n°',
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
            pin: 'pin n°',
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
            pin: 'pin n°',
            pins: 'PWM',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, typeof WRITE_ANALOG_MAX_VALUE !== 'undefined' ? WRITE_ANALOG_MAX_VALUE : PWM_MAX_DUTY);
            }
        },
        {
            extractPin: getExtract("pwm"),
            id: "pwm",
            title: "Signal PWM",
            pin: 'pin n°',
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
    if (this.hasRobotSimulator()) {
        let robot = Robots[RobotSimulator.currentRobotName];
        if (typeof this.Mosaic.getCurrentRobot === "function") {
            const robotName = this.Mosaic.getCurrentRobot();
            if (robotName != RobotSimulator.currentRobotName && robotName !== null && robotName !== 'error') {
                robot = Robots[robotName];
                RobotSimulator.currentRobotName = robotName;
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
            await RobotSimulator.init();
            this._classicRobotSimulatorPrepareForRun = true;
            this._3DRobotSimulatorPrepareForRun = false;
            $("#robot-sim-container").show();
            await sleep_ms(50);
            if (!RobotSimulator.isRunning) {
                RobotSimulator.isRunning = true;
                RobotSimulator.run();
            }
        } else {
            if (RobotSimulator.isRunning) {
                RobotSimulator.close();
            }
        }
    }

    if (this.has3DRobotSimulator() && typeof Simulator3D !== 'undefined') {
        if (typeof this.Mosaic !== 'undefined' && typeof this.Mosaic.getCurrentRobot3D === "function") {
            const robotName = this.Mosaic.getCurrentRobot3D();
            if (robotName === "error") {
                this.pause();
                pseudoModal.openModal('modal-warning-microbit-systems');
            } else {
                const robot = Robots3D[robotName];
                if (robot && this.code.match(robot.CODE_REGEXP)) {
                    this._3DRobotSimulatorPrepareForRun = true;
                    this._classicRobotSimulatorPrepareForRun = false;
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
        if (this.Mosaic.specific.SERVER_REGEXP && this.code.match(this.Mosaic.specific.SERVER_REGEXP)) {
            if (!$('#web-page-module').is(":visible")) {
                $('#web-page-module').show();
            }
            WifiSimulator.web_client.updateCssJs();
        } else {
            if (this.isOpen) {
                WifiSimulator.close();
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
        if (moduleDiv && moduleDiv.id !== undefined) {
            const coreId = moduleDiv.id.split('_')[0];
            const mod = this.modules.find(element => element.id == coreId);
            if (mod) {
                if (/pin n°/.test(mod.pin)) {
                    const modulePin = this.pinList.find(obj => obj.id === moduleDiv.id);
                    if (modulePin && modulePin.regex && !this.code.match(modulePin.regex)) {
                        $("#" + moduleDiv.id).remove();
                        this.pinList = this.pinList.filter(obj => obj.id != moduleDiv.id);
                    }
                } else {
                    const regex = this._checkRegex(mod);
                    if (regex && !this.code.match(regex)) {
                        $("#" + moduleDiv.id).remove();
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

    const addModuleByPin = (pin, moduleCodeLine, slot, secondPin) => {
        // Define pin by it number
        let pinDef = this.Mosaic.getPinDef(pin, mod);
        if (/UART/.test(pin)) {
            pinDef = { name: pin, id: pin };
        }
        // Set specific line regex of module
        let specificRegex = regex.toString().replace(/[0-9]{1,2}/, pin);
        if (secondPin) {
            specificRegex = new RegExp(specificRegex.replace(/[0-9]{1,2}/, secondPin));
        }
        if (mod.multipleModules) {
            const nLine = moduleCodeLine.split(' ');
            for (let j = 0; j < parseInt(nLine[nLine.length - 1]); j++) {
                this.addModuleToDOM(mod, mod.id + '_' + pin + '-' + j, pinDef.name + ' - LED ' + j);
            }
        } else {
            this.addPinModule(mod, pin, slot, secondPin, specificRegex);
            const moduleId = mod.id + '_' + pinDef.id;
            if (mod.type == 'output' && typeof mod.value !== 'undefined') {
                this.setAnimator(mod, moduleId, mod.value);
            }
            if (mod.class === 'button') {
                this.Components.Button.setPull(moduleId, mod.pull ? mod.pull : 'down');
            }
        }
    };

    for (let i = 0; i < moduleCode.length; i++) {
        if (moduleCode[i] !== undefined) {
            // case module is defined by pin
            let pin = null;
            let slot = null;
            let secondPin = null;
            if (/pin n°/.test(mod.pin)) {
                if (mod.extractPin) {
                    const match = moduleCode[i].match(this.Mosaic.groveRegex[mod.id]);
                    pin = match.map((str) => mod.extractPin(str));
                } else {
                    if (mod.codeFlag) {
                        let codeFlag = mod.codeFlag;
                        if (typeof mod.codeFlag === 'object') {
                            codeFlag = mod.codeFlag[0];
                        }
                        if (new RegExp(codeFlag).test(moduleCode[i])) {
                            if (mod.slots) {
                                const parser = moduleCode[i].replace(codeFlag + ' on ', "").replace(new RegExp(this.COMMENT_CHARACTER + ' '), '');
                                pin = parser.replace(/SLOT_[0-9]/, "");
                                slot = parseInt(parser.replace(/PORT_[0-9]/, "").replace('SLOT_', ''));
                            } else {
                                let pin_line = moduleCode[i].replace(codeFlag, "").replace('//', '').replace('#', '');
                                if (/\//g.test(pin_line) && mod.twoPins) {
                                    secondPin = pin_line.split('/')[1];
                                    pin_line = pin_line.split('/')[0];
                                    secondPin = secondPin.match(this.Mosaic.pin_regex);
                                }
                                if (/UART/.test(pin_line)) {
                                    pin = pin_line.match(/UART( |)[0-9]{1}/)[0].trim();
                                } else {
                                    pin = pin_line.match(this.Mosaic.pin_regex);
                                    if (!pin) {
                                        pin = moduleCode[i].slice(moduleCode[i].indexOf('"') + 1, moduleCode[i].lastIndexOf('"'));
                                    }
                                }
                            }
                        } else if (/PIN_/.test(moduleCode[i]) && regex.source.includes('PIN_')) {
                            const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_';
                            pin = moduleCode[i].match(regex)[0].replace(constantName, "");
                        } else {
                            pin = moduleCode[i].match(this.Mosaic.pin_regex);
                            if (!pin) pin = moduleCode[i].match(/[0-9]{1,2}/);
                        }
                    } else {
                        pin = moduleCode[i].match(this.Mosaic.pin_regex);
                    }
                    if (pin && typeof pin === 'object') {
                        pin = pin[0];
                    }
                    if (secondPin && typeof secondPin === 'object') {
                        secondPin = secondPin[0];
                    }
                }
                if (pin) {
                    if (typeof pin === "string") {
                        addModuleByPin(pin, moduleCode[i], slot, secondPin);
                    } else {
                        for (let j = 0; j < pin.length; j++) {
                            addModuleByPin(pin[j], moduleCode[i], slot, secondPin);
                        }
                    }
                }
            } else {
                this.addModuleToDOM(mod, mod.id, mod.pin);
                if (mod.type === 'output' && typeof mod.value !== 'undefined') {
                    this.setAnimator(mod, mod.id, mod.value);
                }
                this.Components.Button.setPull(mod.id, mod.pull ? mod.pull : 'down');
            }
            this.mosaicChanged = true;
        }
    }
};

/**
 * Add HTML div of a pin module in mosaic simulation.
 * @param {Object} mod module
 * @param {string} pin pin string
 * @param {string} slot
 * @param {string} secondPin second pin string
 */
Simulator.addPinModule = function (mod, pin, slot, secondPin, specificRegex) {
    let pinDef = this.Mosaic.getPinDef(pin, mod);
    if (/UART/.test(pin)) {
        pinDef = { name: pin.replace(/\s/g, ''), id: pin.replace(/\s/g, '') };
    }
    const addPinToList = (i, p) => {
        this.pinList.push({
            'id': i,
            'pin': p.id + (mod.slots ? '-' + slot : ''),
            'suffix': mod.listeners ? mod.listeners[0].suffix : "",
            'regex': specificRegex
        });
    };
    if (mod.builtin) {
        addPinToList(mod.id, pinDef);
        const pinName = mod.builtin + ' (p' + pinDef.id + ')';
        this.addModuleToDOM(mod, mod.id, pinName);
    } else if (pinDef.name) {
        const id = mod.id + "_" + pinDef.id + (mod.slots ? '-' + slot : '');
        // case pin is not already used
        const usedPinIndex = this.pinList.map(x => x.pin).indexOf(pinDef.id);
        if (usedPinIndex == -1) {
            if (secondPin) {
                const secondPinDef = this.Mosaic.getPinDef(secondPin, mod);
                const usedSecondPinIndex = this.pinList.map(x => x.pin).indexOf(secondPinDef.id);
                if (usedSecondPinIndex == -1) {
                    addPinToList(id, pinDef);
                    let pinName = pinDef.name;
                    if (secondPin) {
                        let secondPinDef = this.Mosaic.getPinDef(secondPin, mod);
                        if (secondPinDef.name) {
                            addPinToList(id, secondPinDef);
                            pinName += ' / ' + secondPinDef.name;
                        }
                    }
                    pinName += (mod.slots ? ' slot ' + slot : '');
                    this.addModuleToDOM(mod, id, pinName);
                } else {
                    this.checkPossibleCombination(mod, id, secondPinDef, usedSecondPinIndex);
                }
            } else {
                addPinToList(id, pinDef);
                const pinName = pinDef.name + (mod.slots ? ' slot ' + slot : '');
                this.addModuleToDOM(mod, id, pinName);
            }
        } else {
            this.checkPossibleCombination(mod, id, pinDef, usedPinIndex);
        }
    }
};

/**
 * Check combination of differents modules by pin. Define error when combine is not possible.
 * @param {Object} mod module
 * @param {string} id module id
 * @param {Object} pinDef 
 * @param {int} pinIndex pin index
 */
Simulator.checkPossibleCombination = function (mod, id, pinDef, pinIndex) {
    const attachedModId = this.pinList[pinIndex].id;
    const attachedMod = this.getModuleByKey(attachedModId.split('_')[0]);
    if (attachedModId !== id) {
        if (attachedMod.multiple && attachedMod.multiple.includes(mod.id)) {
            this.addModuleToDOM(mod, id, pinDef.name);
        } else {
            const digitalWriteAndPwm = mod.type === 'output' && ((attachedMod.pins === 'PWM' && mod.pins === 'digital') || (attachedMod.pins === 'digital' && mod.pins === 'PWM'));
            const possibleCombine = (attachedMod.type === mod.type) && (attachedMod.pins === mod.pins || digitalWriteAndPwm);
            const possibleCombination = !(typeof attachedMod.noCombine === 'undefined' || attachedMod.noCombine != true) || !(typeof mod.noCombine === 'undefined' || mod.noCombine != true);
            if ((!possibleCombine || (typeof mod.extractPin === 'undefined' && typeof attachedMod.extractPin === 'undefined')) && !possibleCombination) {
                this.pinError = "[Pin Error] The module <b>" + (mod.multiple ? mod.id.split('-')[0] : mod.id) + "</b> cannot be connected on pin <b>" + this.pinList[pinIndex].pin + "</b>. The module <b>" + (attachedMod.multiple ? attachedMod.id.split('-')[0] : attachedMod.id) + "</b> is already connected.";
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
        if (this.isInWiringMode) {
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
            const img = document.querySelectorAll("img." + mod.id + "_base");
            SVGInject(img, {
                makeIdsUnique: false
            });
            img[0].addEventListener("load", () => {
                if (mod.class === 'joystick') {
                    this.Components.Joystick.injectAnimation(id);
                }
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
            if (mod.listeners) {
                for (const listener in mod.listeners) {
                    html += this.generateModuleDiv_gauge(mod, id, listener);
                }
            }
        }

        // OUTPUTS / HYBRIDE (en sortie)
        if (mod.type === 'output' || mod.hybride) {
            if (mod.canvas) {
                html += `<div class="${id}_canvas-container">
                            <canvas class="${id}_canvas"></canvas>
                         </div>`;
            } else {
                if (!mod.hybride || (mod.hybride && mod.type === 'output') || (mod.hybride && mod.type === 'input' && !mod.listeners)) {
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
                onclick="Simulator.getModuleByKey('${mod.id}').modalButton.click('${id}')"
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
        } else if (/Rover|mCore|mBot|CyberPi|Codey|STeaMi/.test(mod.pin)) {
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
        <div class="sim_slider mod_${mod.id}${gauge.suffix}" id="${sliderId}">
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
        </div>`;
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
                    return;
                }
            }
        } else if (mod.codeFlag !== undefined) {
            const modFlag = typeof mod.codeFlag == 'object' && mod.codeFlag.length > 0 ? mod.codeFlag[0] : mod.codeFlag;
            const addPinStr = () => {
                let str = "";
                if (["esp32", "pico", "galaxia"].includes(Main.getInterface())) {
                    str += 'p';
                }
                return str + this.Mosaic.pin_regex.source;
            }
            let regExStr = this.COMMENT_CHARACTER + ' ' + modFlag + ' on ';
            regExStr += addPinStr();
            if (mod.twoPins) {
                regExStr += '/';
                regExStr += addPinStr();
            }
            regex = new RegExp(regExStr);
        } else {
            // console.error("Simulator Error: no regex for module '" + mod.id + "'"); /* Debug! */
        }
    }
    return regex;
};

Simulator.getSimulatedModules = function () {
    return $(".simulator-module:not(.exercise-module):not(.empty-module)");
};

Simulator.Components = {
    'Button': {
        modules: {},
        reset: function () {
            Object.values(this.modules).forEach(button => {
                if (button.div) {
                    button.div.removeEventListener('mouseup', button.up);
                    button.div.removeEventListener('mousedown', button.down);
                }
            });
            this.modules = {};
        },

        setPull: function (id, pull) {
            if (id) {
                if (pull === 'no_pull') pull = 'down';
                const component = Simulator.pinList.find(module => module.id == id);
                let coreId = id;
                if (component) {
                    component.pull = pull;
                    coreId = component.id.split('_')[0];
                }
                const module = Simulator.getModuleByKey(coreId);
                if (module) {
                    this.modules[id] = {};
                    this.modules[id].div = $('#' + id + ' .module-img-group')[0];
                    $('.mod_button').slider({
                        value: pull === 'up' ? 1 : 0
                    });
                    this.modules[id].up = function (e) {
                        if (pull === 'up') {
                            if (Simulator.getSliderValue(id) == 0) {
                                Simulator.setSliderValue(id, 1);
                            }
                        } else if (pull === 'down') {
                            if (Simulator.getSliderValue(id) == 1) {
                                Simulator.setSliderValue(id, 0);
                            }
                        }
                    };

                    this.modules[id].down = function (e) {
                        $("#" + id).find($('.has-interaction')).removeClass('pulse-circle');
                        if (pull === 'up') {
                            if (Simulator.getSliderValue(id) == 1) {
                                Simulator.setSliderValue(id, 0);
                            }
                        } else if (pull === 'down') {
                            if (Simulator.getSliderValue(id) == 0) {
                                Simulator.setSliderValue(id, 1);
                            }
                        }
                    };

                    if (module.releaser) {
                        this.modules[id].div.removeEventListener('mouseup', this.modules[id].up);
                        this.modules[id].div.removeEventListener('mousedown', this.modules[id].down);
                        this.modules[id].div.addEventListener('mouseup', this.modules[id].up);
                        this.modules[id].div.addEventListener('mousedown', this.modules[id].down);
                    }
                }
            }
        },
    },
    'Joystick': {
        modules: {},
        injectAnimation: function (id) {
            const svg = document.querySelector("#" + id + " #Calque_2");
            const cercleHit = svg.querySelector("#cercle-hit")
            this.modules[id] = {
                svg: svg,
                cercle: svg.querySelector("#cercle"),
                joyAnim: svg.querySelector("#joystick-3"),
                cercleHit: cercleHit
            };
            const cercle = this.modules[id].cercle;

            if (!svg || !cercle || !this.modules[id].joyAnim) {
                console.warn("Joystick SVG elements not found", id);
                return;
            }

            const svgEl = svg.ownerSVGElement || svg.closest("svg");
            if (!svgEl) {
                console.warn("Root <svg> not found for joystick", { id: id });
                return;
            }

            const cx0 = parseFloat(cercle.getAttribute("cx"));
            const cy0 = parseFloat(cercle.getAttribute("cy"));
            const R = parseFloat(cercle.getAttribute("r"));
            const rJoy = parseFloat(this.modules[id].joyAnim.getAttribute("r"));

            const maxDist = Math.max(0, R - rJoy);

            function clientToSvgPoint(evt) {
                const pt = svgEl.createSVGPoint();
                pt.x = evt.clientX;
                pt.y = evt.clientY;
                return pt.matrixTransform(svgEl.getScreenCTM().inverse());
            }

            setJoyPos = (id, x, y) => {
                this.modules[id].joyAnim.setAttribute("cx", x);
                this.modules[id].joyAnim.setAttribute("cy", y);
            }

            resetJoy = (id) => {
                setJoyPos(id, cx0, cy0);
                this.modules[id].joyAnim.style.fill = "";
                this.resetArrows(id);
                if (id.includes('mb-yahboom-joystick')) {
                    $("#" + id + "_value").html("");
                } else {
                    $("#" + id + "_value").html("<b>x: 0</br>y: 0</b>");
                }
            };

            updateFromPoint = (id, x, y) => {
                const dx = x - cx0;
                const dy = y - cy0;

                const theta = Math.atan2(dy, dx);
                const dist = Math.hypot(dx, dy);
                const clamped = Math.min(dist, maxDist);

                const nx = cx0 + Math.cos(theta) * clamped;
                const ny = cy0 + Math.sin(theta) * clamped;
                setJoyPos(id, nx, ny);

                const strength = maxDist === 0 ? 0 : (clamped / maxDist); // 0..1
                const xNorm = Math.cos(theta) * strength; // -1..1
                const yNorm = Math.sin(theta) * strength; // -1..1 (⚠️ en SVG, +y va vers le bas)
                const out = { x: xNorm, y: yNorm, r: strength, theta };
                this.onChange(id, out);
            };

            cercleHit.addEventListener("pointerdown", (evt) => {
                evt.preventDefault();
                cercleHit.setPointerCapture(evt.pointerId);
                const p = clientToSvgPoint(evt);
                updateFromPoint(id, p.x, p.y);
            });

            cercleHit.addEventListener("pointermove", (evt) => {
                if (!cercleHit.hasPointerCapture(evt.pointerId)) return;
                evt.preventDefault();
                const p = clientToSvgPoint(evt);
                updateFromPoint(id, p.x, p.y);
            });

            cercleHit.addEventListener("pointerup", (evt) => {
                if (cercleHit.hasPointerCapture(evt.pointerId)) {
                    cercleHit.releasePointerCapture(evt.pointerId);
                }
                resetJoy(id);
            });

            cercleHit.addEventListener("pointercancel", () => resetJoy(id));
            resetJoy(id);
        },

        resetArrows: function (id) {
            this.modules[id].svg.querySelector("#arrow_right").style.fill = "";
            this.modules[id].svg.querySelector("#arrow_left").style.fill = "";
            this.modules[id].svg.querySelector("#arrow_up").style.fill = "";
            this.modules[id].svg.querySelector("#arrow_down").style.fill = "";
        },

        onChange: function (id, out) {
            const setColor = (el) => el.style.fill = "var(--vitta-green-dark)";
            this.resetArrows(id);
            let dir = "";
            if (out.theta <= Math.PI / 4 && out.theta >= -Math.PI / 4) {
                setColor(this.modules[id].svg.querySelector("#arrow_right"));
                dir = "right";
            } else if (out.theta <= -Math.PI / 4 && out.theta > -3 * Math.PI / 4) {
                setColor(this.modules[id].svg.querySelector("#arrow_up"));
                dir = "up";
            } else if ((out.theta <= -3 * Math.PI / 4 && out.theta >= -Math.PI) || (out.theta <= Math.PI && out.theta >= 3 * Math.PI / 4)) {
                setColor(this.modules[id].svg.querySelector("#arrow_left"));
                dir = "left";
            } else if (out.theta <= 3 * Math.PI / 4 && out.theta > Math.PI / 4) {
                setColor(this.modules[id].svg.querySelector("#arrow_down"));
                dir = "down";
            }
            setColor(this.modules[id].joyAnim);
            if (id.includes('mb-yahboom-joystick')) {
                $("#" + id + "_value").html("<b>" + dir + "</b>");
            } else {
                function map_value(value, low1, high1, low2, high2) {
                    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
                };
                const x_value = Math.round(map_value(out.x, -1, 1, 0.25 * READ_ANALOG_MAX_VALUE, 0.75 * READ_ANALOG_MAX_VALUE));
                const y_value = Math.round(map_value(out.y, 1, -1, 0.25 * READ_ANALOG_MAX_VALUE, 0.75 * READ_ANALOG_MAX_VALUE));
                $("#" + id + "_value").html("<b>x: " + x_value + "</br>y: " + y_value + "</br>dir: " + dir + "<b>");
            }
        },

        read: function (id, axisPin) {
            let value = $("#" + id + "_value").text();
            if (value.includes('dir:')) {
                value = value.split('dir:')[0];
            }
            value = value.split('y:');
            if (id.split('_')[1] == axisPin) { // Warning: comparing '2' and 2
                return parseInt(value[0].replace('x:', '').trim());
            } else {
                return parseInt(value[1].trim());
            }
        }
    },
    'GPS': {
        currentModuleId: null,
        map: null,
        openMap: function (id) {
            this.currentModuleId = id;

            const lat = $("#" + id + '_slider_lat').slider('option', 'value');
            const lng = $("#" + id + '_slider_lon').slider('option', 'value');

            // add the current position on the modal values
            $("#modal-lat").html(lat);
            $("#modal-lng").html(lng);

            if (!this.map) {

                // initialize Leaflet with a map centered on let/lng
                this.map = L.map('map').setView([lat, lng], 4);

                // add the OpenStreetMap tiles
                L.tileLayer(`/utils/Backend/maptilerProxy.php?url=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png`, { //style URL
                    tileSize: 512,
                    zoomOffset: -1,
                    minZoom: 1,
                    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                    crossOrigin: true
                }).addTo(this.map);

                // show the scale bar on the lower left corner
                L.control.scale({
                    imperial: true,
                    metric: true
                }).addTo(this.map);

                // show a marker on the map with a popup
                const marker = L.marker([lat, lng]).addTo(this.map);
                marker.bindPopup('Cliquez sur la carte pour mettre en place la latitude et la longitude !').openPopup();

                // add custom icon and shadow
                const myIcon = L.icon({
                    iconUrl: '/openInterface/interfaces/assets/media/leaflet/marker.png',
                    shadowUrl: '/openInterface/interfaces/assets/media/leaflet/marker_shadow.png',
                    iconSize: [24.5, 33.5],
                    iconAnchor: [12, 30],
                    popupAnchor: [1, -34],
                });
                marker.setIcon(myIcon);

                // on click, show the coordinates of that location
                this.map.on('click', (e) => {
                    marker.setLatLng(e.latlng);
                    // remove popup 
                    marker.unbindPopup();

                    // add popup with new coordinates and a substring of the coordinates
                    $("#modal-lat").html((e.latlng.lat).toString().substring(0, 6));
                    $("#modal-lng").html((e.latlng.lng).toString().substring(0, 6));

                    $("#" + this.currentModuleId + '_slider_lat').slider("value", e.latlng.lat);
                    $("#" + this.currentModuleId + '_slider_lon').slider("value", e.latlng.lng);
                });

            } else {
                this.map.panTo([lat, lng]);
            }
        },
        /**
         * Load lagitude & longitude in gps module div. Close map modal.
         */
        loadLatLng: function () {
            const id = this.currentModuleId;
            $("#" + id + '_slider_lat').slider('value', Number($("#modal-lat").html()).toFixed(4));
            $("#" + id + '_slider_lon').slider('value', Number($("#modal-lng").html()).toFixed(4));
            $("#" + id + '_slider_alt').slider('value', Number($("#modal-alt").html()).toFixed(4));
            pseudoModal.closeModal('modal-gpsmap');
        },
        generateNMEAGGA: function (id) {

            const lat = $("#" + id + '_slider_lat').slider('option', 'value');
            const lon = $("#" + id + '_slider_lon').slider('option', 'value');
            const alt = $("#" + id + '_slider_alt').slider('option', 'value');

            const toNmeaCoord = (value, isLat) => {
                const abs = Math.abs(value);
                const deg = Math.floor(abs);
                const min = (abs - deg) * 60;
                const dir = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
                return `${String(deg).padStart(isLat ? 2 : 3, '0')}${min.toFixed(4).padStart(7, '0')},${dir}`;
            };

            const checksum = (s) => {
                let cs = 0;
                for (let i = 0; i < s.length; i++) cs ^= s.charCodeAt(i);
                return cs.toString(16).toUpperCase().padStart(2, '0');
            };

            const now = new Date();
            const time = [
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()
            ].map(v => String(v).padStart(2, '0')).join('');

            const body = `GPGGA,${time},${toNmeaCoord(lat, true)},${toNmeaCoord(lon, false)},1,08,0.9,${Number(alt).toFixed(1)},M,0.0,M,,`;

            return `$${body}*${checksum(body)}\r\n`;
        }
    }
}

Simulator.Mosaic = {
    uart_updateTitle: function (port, rx, tx) {
        const modPin = Simulator.pinList.find(mod => new RegExp(`UART\\s?${port}`).test(mod.pin));
        const mod = Simulator.getModuleByKey(modPin.id.split('_')[0]);
        const pinRXName = this.getPinDef(rx, mod);
        const pinTXName = this.getPinDef(tx, mod);
        $("#" + modPin.id).find(".subtitle-module").html('UART ' + port + ' (' + pinTXName.name + ' / ' + pinRXName.name + ')');
        return {
            pin: modPin,
            mod: mod
        };
    }
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
        if (Simulator.Mosaic.groveRegex && Simulator.Mosaic.grove_analog) {
            Simulator.Mosaic.grove_analog.createSliders();
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
                    if (key === 'backgrounds') continue;
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
        if (key === 'backgrounds') {
            if (this.data.backgrounds[robotName] !== `${value}`) {
                this.data.backgrounds[robotName] = `${value}`;
                this._saveBackgroundToProject(`${value}`);
                if (typeof projectManager !== 'undefined' && projectManager) {
                    projectManager._refreshProjectStatus();
                }
            }
            return;
        }
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
        if (key === 'backgrounds') {
            if (this.data.backgrounds[robotName]) {
                return this.data.backgrounds[robotName];
            }
            return this._getBackgroundFromProject();
        }
        const data = this.get(key);
        return data ? data[robotName] : null;
    },
    /**
     * Save the background value into the current project options in localStorage.
     * @param {String} value - The background source (path or data URL)
     */
    _saveBackgroundToProject: function (value) {
        if (typeof projectManager === 'undefined' || !projectManager) return;
        const lsm = projectManager.localStorageManager;
        const projectContent = lsm.getLocalProjectContent();
        if (!projectContent) return;
        if (!projectContent.options) projectContent.options = {};
        projectContent.options.robotBackground = value;
        lsm.setLocalProject(projectContent);
    },
    /**
     * Read the background value from the current project options in localStorage.
     * @returns {String|null} The background source or null
     */
    _getBackgroundFromProject: function () {
        if (typeof projectManager === 'undefined' || !projectManager) return null;
        const lsm = projectManager.localStorageManager;
        const projectContent = lsm.getLocalProjectContent();
        if (!projectContent || !projectContent.options) return null;
        return projectContent.options.robotBackground || null;
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