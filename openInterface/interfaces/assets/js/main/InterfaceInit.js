'use strict';

/**
 * Workspace InterfaceInit: InterfaceInit
 * Copyright 2024 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 */

/** 
 * @fileoverview WorkSpace InterfaceInit 
 * @author: Vittascience
 */

/**
 * @class InterfaceInit
 */
class InterfaceInit {
    /**
     * Creates an instance of InterfaceInit.
     * @private
     */
    constructor(interfaceName) {
        this._interface = interfaceName;
        this._board = null;
        this._initialUrlBoard = $_GET('board');
        this.shieldView = null;
        this.id = randHex();
        this.initialized = false;
        this.externalLibraries = {};
        this.shepherdTourContent = {
            message: null,
            id: null
        };
    }

    _needPythonLibraries() {
        return ["microbit", "esp32", "wb55", "l476", "buddy", "galaxia", "m5stack", "GalaxiaCircuitPython", "pico", "eliobot", "thymio", "winky", "niryo", "arduinoq"].includes(this._interface);
    }

    _needCommonEsp32Libraries() {
        return ["esp32", "m5stack", "galaxia", "pico"].includes(this._interface);
    }

    _needCommonStm32Libraries() {
        return ["wb55", "l476", "steami"].includes(this._interface);
    }

    _needMultiEditorLS() {
        return ["arduino", "microbit", "esp32", "galaxia", "m5stack", "TI-83", "GalaxiaCircuitPython", "cyberpi", "pico"].includes(this._interface);
    }

    _needSerialAPI() {
        return ['arduino', 'microbit', 'esp32', 'wb55', 'l476', 'galaxia', 'm5stack', 'letsstartcoding', 'mBot', 'GalaxiaCircuitPython', 'cyberpi', 'pico', 'eliobot', 'codey', 'steami', 'arduinoq'].includes(this._interface);
    }

    async init() {
        if (typeof InterfaceMonitor !== 'undefined' && this._interface !== "python") {
            InterfaceMonitor.init();
        }
        if ($_GET('robot') !== null || $_GET('module') !== null || $_GET('drone') !== null) {
            await this._setShepherdTourContent();
        }
        if (this._needMultiEditorLS()) {
            this.updateMultiEditor();
        }
        if (this._interface === "python") {
            const textCode = CodeManager.getSharedInstance().getTextCode();
            Main.getCodeEditor().container.session.setValue(textCode);
        }
        if (Main.hasBoardSelector()) {
            await this._initializeBoardSelector();
        }
        if (this._needSerialAPI()) {
            await this._initializeSerialInterface();
        }
        if (['raspberrypi'].includes(this._interface)) {
            RaspberryCommunication.init();
        }
        if (Main.hasSimulator()) {
            await Simulator.init();
        }
        if (["python", "TI-83"].includes(this._interface)) {
            PythonRun.init();
        }
        if (!['web'].includes(this._interface)) {
            this._initializeTogglers();
        }
        if (typeof resizeBlocklyToolBox !== "undefined") {
            resizeBlocklyToolBox();
        }
        this.initialized = true;
    }

    /**
     * Display welcome message checking MaClasseTI iframe or not.
     * @public
     */
    async displayWelcome() {
        if (typeof window.maClasseTiIntegration !== 'undefined' && window.maClasseTiIntegration) {
            this._displayWelcomeMessage(`code.welcome.${this._interface}-Maclasseti`);
            return true;
        }
        let msgLink = `code.welcome.${this._interface}`;
        if (this._interface == "esp32" && Blockly.Constants.getSelectedBoard() == BOARD_NANO_ESP32) {
            msgLink = 'code.welcome.nano-esp32';
        }
        if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
            await new Promise(resolve => {
                (function checkCapytaleManager() {
                    if (typeof capytaleManager === 'undefined') {
                        setTimeout(checkCapytaleManager, 50);
                        return;
                    }
                    resolve();
                })()
            });
            this._displayWelcomeMessage(capytaleManager.getWelcomeMessage(msgLink));
            return true;
        }
        this._displayWelcomeMessage(msgLink);
        return true;
    }

    /**
     * Display welcome message in monitor of interface.
     * @param {string} stringPath 
     */
    _displayWelcomeMessage(stringPath) {
        if (i18next.isInitialized && i18next.t(stringPath) !== stringPath && typeof i18next.t(stringPath) !== 'undefined') {
            // welcome pre-rendered by PHP (consoleWelcome in public/lang.php): kept if same message and language, else rewritten
            const preRendered = document.querySelector('#console > p[data-welcome]');
            if (!preRendered || preRendered.dataset.welcome !== stringPath || preRendered.dataset.lng !== i18next.language) {
                preRendered?.remove();
                InterfaceMonitor.writeConsole(stringPath, 'neutral', false);
            }
            if (typeof window !== 'undefined' && window.__vittaInterfaceSlug) return;
            if (this._needSerialAPI()) {
                if (this._interface == 'arduinoq') {
                    if (!navigator.usb) {
                        InterfaceMonitor.writeConsole('code.webusb.noWebUsb', 'interrupt', false, true);
                    }
                } else if (!navigator.serial) {
                    InterfaceMonitor.writeConsole('code.serialAPI.noSerialAPI', 'interrupt', false, true);
                }
            }
        } else {
            setTimeout(() => {
                this._displayWelcomeMessage(stringPath);
            }, 100);
        }
    }

    /**
     * Load interface with id in local storage for simulation.
     */
    updateMultiEditor() {
        const multiEditor = localStorage.getItem('multiEditor');
        var obj = {};
        if (multiEditor) {
            obj = JSON.parse(multiEditor);
            if (!obj[this._interface]) {
                obj[this._interface] = {};
            }
        } else {
            obj[this._interface] = {};
        }
        obj[this._interface][this.id] = {};
        localStorage.setItem('multiEditor', JSON.stringify(obj));
    }

    async _initializeSerialInterface() {
        if (typeof InterfaceConnection !== 'undefined') {
            if (typeof InterfaceConnection.sendSerialCommand !== 'undefined') {
                $("#serial-send").off('click').click(InterfaceConnection.sendSerialCommand.bind(InterfaceConnection));
            }
            if (INTERFACE_NAME === 'microbit') {
                await new Promise(function awaitMicrobitFsWrapper(resolve, reject) {
                    if (typeof microbitFsWrapper !== 'undefined') {
                        resolve();
                    }
                    setTimeout(() => {
                        awaitMicrobitFsWrapper(resolve, reject);
                    }, 100);
                });
            }
            if (typeof SERIAL_OPTIONS !== 'undefined' && SERIAL_OPTIONS) {
                InterfaceConnection.init(SERIAL_OPTIONS, Blockly.Constants.getSelectedBoard());
            } else {
                InterfaceConnection.init();
            }
        } else {
            if (typeof sendSerialCommand !== 'undefined') {
                $("#serial-send").off('click').click(sendSerialCommand);
            }
            let baudrate = 115200;
            const baudOption = document.querySelector('#baud option[value="' + baudrate + '"]');
            baudOption.selected = true;
            const getBaudrate = () => parseInt($('#baud').find(":selected").text());
            let filters = null;
            if (typeof SERIAL_PRODUCT_FILTER !== 'undefined' && SERIAL_PRODUCT_FILTER === true && typeof SERIAL_PRODUCTS !== 'undefined') {
                if (Array.isArray(SERIAL_PRODUCTS)) {
                    filters = SERIAL_PRODUCTS;
                } else {
                    filters = Object.values(SERIAL_PRODUCTS);
                }
            }
            SerialAPI = new Serial(getBaudrate, filters);
            let chunkSize = 1024;
            if (typeof SERIAL_CHUNK_SIZE !== 'undefined') {
                chunkSize = SERIAL_CHUNK_SIZE;
            }
            SerialAPI.CHUNK_SIZE = chunkSize;
        }
    }

    /**
     * MicroPython libraries sent to the board (connection, upload, flash, export): loaded once, at the first use.
     * Fills this.externalLibraries in place: same object as the "libraries" option of MicropythonRepl (_CUSTOM_LIB).
     */
    loadExternalLibraries() {
        this.librariesLoading ??= this._fetchExternalLibraries().catch((error) => {
            this.librariesLoading = null;
            throw error;
        });
        return this.librariesLoading;
    }

    async _fetchExternalLibraries() {
        const loads = [];
        if (this._needCommonEsp32Libraries()) loads.push(this.loadCommonLibraries('esp32'));
        if (this._needCommonStm32Libraries()) loads.push(this.loadCommonLibraries('stm32'));
        if (this._needPythonLibraries()) loads.push(this.loadLibraries());
        if (this._interface === 'microbit') {
            loads.push(this.fetchDir(`${CDN_PATH}/openInterface/microbit/assets/lib/variables_getter.py`).then(content => content ? { variables_getter: content } : {}));
        }
        // same order as before: the specific libraries override the common ones
        Object.assign(this.externalLibraries, ...await Promise.all(loads));
    }

    /**
     * Load python libraries of interface.
     */
    async loadLibraries() {
        const names = Object.keys(LIBRARIES_PATH);
        const contents = await Promise.all(names.map(lib =>
            this.fetchDir(`${CDN_PATH}/openInterface/${this._interface}/assets/lib${LIBRARIES_PATH[lib]}/${lib}.py`)));
        const libraries = {};
        names.forEach((lib, i) => {
            if (contents[i]) {
                libraries[lib] = contents[i];
            }
        });
        return libraries;
    }

    async loadCommonLibraries(board) {
        const files = [];
        const collect = (item, path, extension = "py") => {
            if (typeof item === 'object' && !Array.isArray(item)) {
                path += item.path + "/";
                for (const lib of item.content) {
                    collect(lib, path, item.extension || "py");
                }
            } else {
                files.push([item, path + item + (extension === "mpy" ? '/__init__.mpy' : '.py')]);
            }
        }
        let LIBRARIES_PATH = [];
        switch (board) {
            case "esp32":
                LIBRARIES_PATH = LIBRARIES_PATH_ESP32;
                break;
            case "stm32":
                LIBRARIES_PATH = LIBRARIES_PATH_STM32;
                break;
        }
        for (const item of LIBRARIES_PATH) {
            collect(item, `${CDN_PATH}/openInterface/interfaces/assets/lib/${board}-mpy/`);
        }
        collect('variables_getter', `${CDN_PATH}/openInterface/interfaces/assets/lib/`);
        const contents = await Promise.all(files.map(([, url]) => this.fetchDir(url)));
        const libraries = {};
        files.forEach(([name], i) => {
            if (contents[i]) {
                libraries[name] = contents[i];
            }
        });
        return libraries;
    }

    /**
     * Fetch file and return response.
     * @param {string} fileName
     * @param {boolean} blob
     * @returns {string} response
     */
    async fetchDir(fileName, type = "text") {
        const response = await fetch(fileName);
        if (!response.ok) {
            console.error(response.statusText + "\nlib: " + fileName);
            return;
        }
        if (type == "blob") {
            return await response.blob();
        } else if (type == "buffer") {
            return await response.arrayBuffer();
        }
        return await response.text();
    }

    async downloadFile(filePath, type = "text", replace = null) {
        await this.fetchDir(filePath, type)
            .then(function (file) {
                if (replace) {
                    file = file.replace(replace[0], replace[1]);
                }
                let url;
                if (type == 'blob') {
                    url = window.URL.createObjectURL(file);
                } else {
                    url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(file);
                }
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filePath.split('/').pop();
                document.body.appendChild(a);
                a.click();
                if (type == 'blob') {
                    window.URL.revokeObjectURL(url);
                }
            });
    }

    async downloadFirmware(fileName) {
        const path = _PATH + "/" + this._interface + "/assets/firmware/" + fileName;
        await this.downloadFile(path, "blob");
    }

    _initializeTogglers() {
        $('input[type=radio][name=toolboxMode]').change(function () {
            pseudoModal.closeModal('modal-settings');
            updateToolbox(this.value, true);
        });
        $('input[type=radio][name=consolePosToggler]').change(function () {
            rotateConsole(this.value);
        });
        rotateConsole(InterfaceMonitor.getPosition());
        // Volume of the Blockly sounds (click, delete...), saved for all interfaces
        let soundVolume = Number(localStorage.getItem('blocklySoundVolume') ?? 100) / 100;
        const play = Blockly.WorkspaceAudio.prototype.play;
        Blockly.WorkspaceAudio.prototype.play = function (name, volume = 1) {
            // A workspace without the sound forwards it to its parent, which applies the volume
            return play.call(this, name, this.sounds.has(name) ? volume * soundVolume : volume);
        };
        $('#blocklySoundVolumeValue').text(Math.round(soundVolume * 100) + ' %');
        $('#blocklySoundVolume').val(soundVolume * 100).on('input', function () {
            soundVolume = this.value / 100;
            localStorage.setItem('blocklySoundVolume', this.value);
            $('#blocklySoundVolumeValue').text(this.value + ' %');
        }).on('change', function () {
            // Preview of the chosen volume when the slider is released
            Blockly.getMainWorkspace()?.getAudioManager().play('click');
        });
    }

    hasValidBoardInUrl() {
        const urlBoard = this._initialUrlBoard;
        if (!urlBoard || typeof INTERFACE_BOARDS === 'undefined') return false;
        return Object.keys(INTERFACE_BOARDS).includes(urlBoard)
            || Object.values(INTERFACE_BOARDS).some(board => board.shieldId === urlBoard);
    }

    openBoardSelector(opening = false) {
        if (opening) {
            $('#board-selector-welcome-text').show();
        } else {
            $('#board-selector-welcome-text').hide();
        }
        const boardId = opening && !this.hasValidBoardInUrl() ? BOARD_DEFAULT : Blockly.Constants.getSelectedBoard();
        $(`input[name="boardChoice"][value="${boardId}"]`).prop('checked', true);
        if ($("#board-selector-shield-grove-section").hasClass('present')) {
            $("#shieldGroveCheckBox").prop("checked", VittaInterface.shieldView ? true : false);
        }
        pseudoModal.openModal(this._interface + '-board-selector');
        if (this._interface == 'arduino') {
            pseudoModal.clickOnExit('arduino-board-selector', () => {
                InterfaceConnection.addFirmwareOptions(boardId);
            });
        }
    }

    async validateSelectedBoard() {
        Main.resetInvalidBlocksWarning();
        const boardId = $('input[name="boardChoice"]:checked').val();
        if ($("#board-selector-shield-grove-section").hasClass('present')) {
            await updateBoard(true, boardId, $("#shieldGroveCheckBox").is(":checked"));
        } else {
            await updateBoard(true, boardId, false);
        }
        pseudoModal.closeModal(this._interface + '-board-selector');
    }

    async _initializeBoardSelector() {
        const savedShieldView = SimulatorLS.get('shieldView');
        if (typeof savedShieldView !== 'undefined') {
            this.shieldView = savedShieldView;
        } else {
            this.shieldView = false;
        }
        if (typeof IS_CAPYTALE_CONTEXT === 'undefined' && ['arduino', 'esp32'].includes(this._interface) && !$_GET('link') && !this.hasValidBoardInUrl()) {
            this.openBoardSelector(true);
        }
        await updateBoard();
        const boardId = Blockly.Constants.getSelectedBoard();
        $("input[value='" + boardId + "']#board_" + boardId + "_Set").attr("checked", "checked");
        if (['arduino', 'esp32'].includes(this._interface)) {
            const manageCheckbox = (id) => {
                if (typeof INTERFACE_BOARDS[id].shieldId == 'undefined') {
                    $("#board-selector-shield-grove-section").hide();
                    $("#board-selector-shield-grove-section").removeClass('present');
                } else {
                    $("#board-selector-shield-grove-section").show();
                    $("#board-selector-shield-grove-section").addClass('present');
                }
            };
            manageCheckbox(boardId);
            $('input[type=radio][name=boardChoice]').change(function () {
                manageCheckbox(this.value);
                if (VittaInterface._interface === 'arduino') {
                    InterfaceConnection.addFirmwareOptions(this.value);
                }
            });
        }
        if (['pico', 'raspberrypi'].includes(this._interface)) {
            $('input[type=radio][name=boardSelector]').change(async function () {
                await updateBoard(true, this.value);
            });
        }
        $('input[type=radio][name=boardSelectorHelp]').change(function () {
            let storageBoard = {
                [INTERFACE_NAME]: this.value
            };
            updateUrlAndStorage('board', storageBoard);
        });
    }

    hasShepherdTour() {
        return this.shepherdTourContent.id !== null && this.shepherdTourContent.message !== null;
    }

    async _setShepherdTourContent() {
        await Promise.all([
            this.loadResources([`${CDN_PATH}/openInterface/interfaces/assets/js/external/shepherd.js@10.0.1/sheperd.js`], this.loadScript),
            this.loadResources([`${CDN_PATH}/openInterface/interfaces/assets/js/external/shepherd.js@10.0.1/sheperd.css`], this.loadCSS)
        ]);

        if ($_GET('robot') !== null) {
            const robotName = $_GET('robot');
            let robotCategory = 'robots';
            let robotMessage = jsonPath('code.robotGuide.tuto');
            if (INTERFACE_NAME === 'TI-83') {
                robotCategory = 'advanced';
                robotMessage = jsonPath('code.robotGuide.tuto-rover');
            }
            this.shepherdTourContent = {
                message: robotMessage.replace('[ROBOT_NAME]', robotName),
                id: robotCategory
            };
        } else if ($_GET('drone') !== null) {
            this.shepherdTourContent = {
                message: jsonPath('code.droneGuide.tuto').replace('[DRONE_NAME]', $_GET('drone')),
                id: 'tello'
            };
        } else if ($_GET('module') !== null) {
            this.shepherdTourContent = {
                message: jsonPath('code.moduleGuide.tuto').replace('[MODULE_NAME]', $_GET('module')),
                id: 'modules'
            };
        }
        return;
    }

    _startShepherdTour() {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                scrollTo: true
            }
        });

        tour.addStep({
            text: `<img style="width: 65px;" src="../openInterface/interfaces/assets/media/icon-vittabot.jpg"/> ${this.shepherdTourContent.message}`,
            attachTo: {
                element: '#' + this.shepherdTourContent.id,
                on: 'right'
            },
            buttons: [
                {
                    action() {
                        return this.complete();
                    },
                    classes: 'btn btn-primary',
                    text: 'OK'
                }
            ],
            id: 'creating'
        });

        tour.on('complete', () => {
            history.pushState({}, '', removeParam("robot", window.location.href));
            history.pushState({}, '', removeParam("module", window.location.href));
            history.pushState({}, '', removeParam("drone", window.location.href));
        });

        tour.start();
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(src);
            script.onerror = () => reject(new Error(`Impossible de charger le script : ${src}`));
            document.head.appendChild(script);
        });
    }

    loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve(href);
            link.onerror = () => reject(new Error(`Impossible de charger le CSS : ${href}`));
            document.head.appendChild(link);
        });
    }

    async loadResources(resources, loader, parallel = true) {
        if (parallel) {
            return Promise.all(resources.map(loader));
        }

        const loaded = [];

        for (const resource of resources) {
            loaded.push(await loader(resource));
        }

        return loaded;
    }
};
