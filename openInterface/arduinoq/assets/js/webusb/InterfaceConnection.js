const InterfaceConnection = {
    progressBar: {

        _displayProgressBar: function () {
            document.querySelector('#progress-bar-arduino').style.width = '0%';
            document.querySelector('#global-overlay').style.display = 'flex';
            document.querySelector('#progress-bar-container').style.display = 'flex';
        },

        _hideProgressBar: function () {
            document.querySelector('#progress-bar-container').style.display = 'none';
            document.querySelector('#global-overlay').style.display = 'none';
            document.querySelector('#progress-bar-arduino').style.width = '0%';
        },

        _updateProgressBar: function (percentage) {
            const progressBarElt = document.querySelector('#progress-bar-arduino');
            progressBarElt.textContent = `${percentage}%`;
            getComputedStyle(progressBarElt).width;
            progressBarElt.style.width = `${percentage}%`;
        }
    },
    /**
     * Initialize InterfaceConnection for Arduino by creating a new serial object and 
     * adding all arduino boards in board setting option.
     */
    init: function (options, boardId = null) {
        if (navigator && 'usb' in navigator) {
            this.unoqUp = new UnoQuploader({
                debug: false,
                onOpen: this.onOpen,
                onClose: this.onClose
            });
            window.addEventListener('pagehide', () => {
                this.doDisconnect();
            });
            window.addEventListener('beforeunload', () => {
                this.doDisconnect();
            });
        } else {
            InterfaceConnection.writeConsole("WebUSB is not available.")
        }
    },
    /**
     * Connect board to interface.
     */
    connectBoard: async function () {
        if ($("#simulator").is(":visible")) {
            await toggleSimulator();
        }
        InterfaceMonitor.setup();
        if (navigator.serial && !this.serialMonitorConnected) {
            await this.doConnect();
        }
    },

    /**
     * [Button] Disconnect board from interface.
     */
    doDisconnect: async function () {
        if (this.unoqUp) {
            await this.unoqUp.disconnect();
            InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
            InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.serialPortClosed'), 'success');
        }
    },
    uploadArduinoQProject: async function (params) {
        if ($("#simulator").is(":visible")) {
            await toggleSimulator();
        }
        InterfaceMonitor.setup();
        await this.unoqUp.sendUnoQ();
    },

    onOpen: function () {
        $("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
        $("#disconnect-opt").show();
        InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.boardConnected'), 'success');
    },

    onClose: function () {
        $("#connected-icon").remove();
        $("#disconnect-opt").hide();
    },

    /**
     * [Button] Send serial command to the board.
     */
    sendSerialCommand: async function () {
        if (!Simulator.isOpen) {
            if (!this.unoqUp.webusb || !this.unoqUp.adb) {
                await this.unoqUp.connect();
            }
            if (["connected"].includes(this.unoqUp.status)) {
                const message = $("#serial-input").val();
                if (message.startsWith('sudo ')) {
                    const output = await this.unoqUp.sudo(message.replace('sudo ', ''));
                } else {
                    const output = await this.unoqUp.execute("shell:" + message);
                }
                $('#serial-input').val("");
            }
        } else {
            console.error("Function on #serial-send button is not for simulator.")
        }
    },
    /**
     * Open pop-up for saving file onto computer.
     * @param {String} fileName
     * @param {ArrayBuffer} hex
     * @param {String} ext
     * @param {String} type
     */
    saveFile: function (fileName, hex, ext, type) {
        if (!fileName) {
            return Promise.resolve(void 0);
        }
        if (ext && fileName.slice(-4) !== `.${ext}`) {
            fileName = `${fileName}.${ext}`;
        }
        const a = window.document.createElement('a');
        const blob = new Blob([hex], { type });
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return Promise.resolve(void 0);
    }
};
