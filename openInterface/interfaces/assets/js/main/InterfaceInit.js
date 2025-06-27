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
        this.id = randHex();
        this.initialized = false;
        this.externalLibraries = {};
    }

    _needPythonLibraries() {
        return ["microbit", "esp32", "wb55", "l476", "buddy", "galaxia", "m5stack", "GalaxiaCircuitPython", "pico", "eliobot", "thymio", "winky", "niryo"].includes(this._interface);
    }

    _needCommonEsp32Libraries() {
        return ["esp32", "m5stack", "galaxia", "pico"].includes(this._interface);
    }

    _needMultiEditorLS() {
        return ["arduino", "microbit", "esp32", "galaxia", "m5stack", "TI-83", "GalaxiaCircuitPython", "cyberpi", "pico"].includes(this._interface);
    }

    _needSerialAPI() {
        return ['arduino', 'microbit', 'esp32', 'wb55', 'l476', 'galaxia', 'm5stack', 'letsstartcoding', 'mBot', 'GalaxiaCircuitPython', 'cyberpi', 'pico', 'eliobot'].includes(this._interface);
    }

    async init() {
        if (typeof InterfaceMonitor !== 'undefined' && this._interface !== "python") {
            InterfaceMonitor.init();
            this.displayWelcome();
        }
        if (this._needCommonEsp32Libraries()) {
            Object.assign(this.externalLibraries, await this.loadEsp32Libraries());
        }
        if (this._needPythonLibraries()) {
            Object.assign(this.externalLibraries, await this.loadLibraries());
        }
        if (this._needMultiEditorLS()) {
            this.updateMultiEditor();
        }
        if (this._interface === "python") {
            PyBlock.getDefaultXml();
            const textCode = CodeManager.getSharedInstance().getTextCode();
            Main.getCodeEditor().container.session.setValue(textCode);
        }
        if (this._needSerialAPI()) {
            await this._initializeSerialInterface();
        }
        if (Main.hasSimulator()) {
            this._initializeSimulator();
        }
        if (["python", "TI-83"].includes(this._interface)) {
            PythonRun.init();
        }
        if (!['web'].includes(this._interface)) {
            this._initializeTogglers();
        }
        if (Main.hasBoardSelector()) {
            this._initializeBoardSelector();
        }
        if (typeof resizeBlocklyToolBox !== "undefined") {
            resizeBlocklyToolBox();
        }
        this._initializeTour();
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
            this._displayWelcomeMessage(capytaleManager.getWelcomeMessage());
            return true;
        }
        this._displayWelcomeMessage(`code.welcome.${this._interface}`);
        return true;
    }

    /**
     * Display welcome message in monitor of interface.
     * @param {string} stringPath 
     */
    _displayWelcomeMessage(stringPath) {
        if (i18next.isInitialized && i18next.t(stringPath) !== stringPath && typeof i18next.t(stringPath) !== 'undefined') {
            InterfaceMonitor.writeConsole(stringPath, 'neutral', false);
            if (this._needSerialAPI() && !navigator.serial) {
                InterfaceMonitor.writeConsole('code.serialAPI.noSerialAPI', 'interrupt', false, true);
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
                InterfaceConnection.init(SERIAL_OPTIONS);
            } else {
                InterfaceConnection.init();
            }
        } else {
            let baudrate = 115200;
            const getBaudrate = () => parseInt($('#baud').find(":selected").text());
            if (typeof SERIAL_BAUDRATE !== 'undefined') {
                baudrate = SERIAL_BAUDRATE;
            } else {
                baudrate = getBaudrate;
            }
            let filters = null;
            if (typeof SERIAL_PRODUCT_FILTER !== 'undefined' && SERIAL_PRODUCT_FILTER === true && typeof SERIAL_PRODUCTS !== 'undefined') {
                filters = Object.values(SERIAL_PRODUCTS);
            }
            SerialAPI = new Serial(baudrate, filters);
            let chunkSize = 1024;
            if (typeof SERIAL_CHUNK_SIZE !== 'undefined') {
                chunkSize = SERIAL_CHUNK_SIZE;
            }
            SerialAPI.CHUNK_SIZE = chunkSize;
        }
    }

    _initializeSimulator() {
        if (Main.hasRobotSimulator() && typeof SIMULATOR_DEFAULT_ROBOT !== 'undefined' && SIMULATOR_DEFAULT_ROBOT) {
            RobotSimulator.currentRobotName = SIMULATOR_DEFAULT_ROBOT;
        }
        Simulator.init();
    }

    /**
     * Load python libraries of interface.
     */
    async loadLibraries() {
        const libraries = {};
        for (const lib in LIBRARIES_PATH) {
            const fileName = `${CDN_PATH}/openInterface/${this._interface}/assets/lib${LIBRARIES_PATH[lib]}/${lib}.py`;
            const content = await this.fetchDir(fileName);
            libraries[lib] = content;
        }
        return libraries;
    }

    async loadEsp32Libraries() {
        const libraries = {};
        const loadFile = async (item, path, extension = "py") => {
            if (typeof item === 'object' && !Array.isArray(item)) {
                path += item.path + "/";
                for (const lib of item.content) {
                    if (item.extension) {
                        await loadFile(lib, path, item.extension);
                    } else {
                        await loadFile(lib, path);
                    }
                }
            } else {
                let fileName = path + item;
                if (extension === "mpy") {
                    fileName += '/__init__.mpy';
                } else {
                    fileName += '.py';
                }
                const content = await this.fetchDir(fileName);
                libraries[item] = content;
            }
        }
        for (const item of LIBRARIES_PATH_ESP32) {
            await loadFile(item, `${CDN_PATH}/openInterface/interfaces/assets/lib/esp32-mpy/`);
        }
        return libraries;
    }

    /**
     * Fetch file and return response.
     * @param {string} fileName
     * @param {boolean} blob
     * @returns {string} response
     */
    async fetchDir(fileName, blob = false) {
        const response = await fetch(fileName);
        if (!response.ok) {
            console.error(response.statusText + "\nlib: " + fileName);
        }
        if (blob) {
            return await response.blob();
        }
        return await response.text();
    };

    _initializeTogglers() {
        $('input[type=radio][name=toolboxMode]').change(function () {
            pseudoModal.closeModal('modal-settings');
            updateToolbox(this.value);
        });
        $('input[type=radio][name=consolePosToggler]').change(function () {
            rotateConsole(this.value);
        });
        rotateConsole(InterfaceMonitor.getPosition());
    };

    _initializeBoardSelector() {
        updateBoard();
        const board = Blockly.Constants.getSelectedBoard();
        $("input[value='" + board + "']#board_" + board + "_Set").attr("checked", "checked");
        $('input[type=radio][name=boardSelector]').change(function () {
            updateBoard(true, this.value);
        });
        $('input[type=radio][name=boardSelectorHelp]').change(function () {
            let storageBoard = {
                [INTERFACE_NAME]: this.value
            };
            updateUrlAndStorage('board', storageBoard);
        });
    };

    _initializeTour() {
        if (typeof $_GET('robot') !== 'undefined' && $_GET('robot') !== null) {
            const currentRobot = $_GET('robot');
            const message = jsonPath('code.robotGuide.tuto').replace('[ROBOT_NAME]', currentRobot);
            this._setupShepherdTour('robot', message, 'robots');
        } else if (typeof $_GET('module') !== 'undefined' && $_GET('module') !== null) {
            const currentModule = $_GET('module');
            const message = jsonPath('code.moduleGuide.tuto').replace('[MODULE_NAME]', currentModule);
            this._setupShepherdTour('module', message, 'sensors');
        }
    };

    _setupShepherdTour(urlParam, message, id) {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                scrollTo: true
            }
        });

        tour.addStep({
            text: `<img style="width: 65px;" src="../openInterface/interfaces/assets/media/icon-vittabot.jpg"/> ${message}`,
            attachTo: {
                element: '#' + id,
                on: 'right'
            },
            buttons: [
                {
                    action() {
                        return this.next();
                    },
                    classes: 'btn btn-primary',
                    text: 'OK'
                }
            ],
            id: 'creating'
        });

        tour.on('complete', () => {
            history.pushState({}, '', removeParam(urlParam, window.location.href))
        });

        tour.start();
    };
};
