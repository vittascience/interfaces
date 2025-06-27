const WEB_BLE = {
    currentDevice: null,
    actuatorsServiceID: "87171360-9518-4a05-a867-2006708d32b1",
    sensorsServiceID: "659a1dd7-d78f-494f-8420-3dbc15191a82",
    actuatorsCharacteristicID: "ede2ef81-eac3-49f9-8c00-c48128c53b6e",
    sensorsCharacteristicID: "0e4a39b3-fafb-46d4-b69d-f3fa92384069",
    name: null,
    actuatorsService: null,
    sensorsService: null,
    actuatorsCharacteristic: null,
    sensorsCharacteristic: null,
    notifications: {},
    sensor_data: null,
    notif: new VittaNotif(5),
    setUpListener: false,
    sendCommandAttempt: 0,
    MAX_COMMAND_ATTEMPT: 5,
    hexStringToArrayBuffer: function (hexString) {
        // Removing the '0x' prefix if present
        if (hexString.startsWith('0x')) {
            hexString = hexString.slice(2);
        }
        // Creating a byte array
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
        }
        return bytes.buffer;
    },
    // on start, check if bluetooth is available
    checkWebBLE: async function () {
        if (!navigator.bluetooth) {
            await awaitJsonPath();
            InterfaceMonitor.writeConsole('code.WebBluetoothAPI.noWebBluetoothAPI', 'interrupt');
        }
    },
    unpair: async function () {
        return new Promise((resolve, reject) => {
            console.log("Unpairing... 🚫");

            if (!this.currentDevice || !this.currentDevice.gatt || !this.currentDevice.gatt.connected) {
                document.getElementById('disconnect-opt').style.display = 'none';
                $("#connected-icon").remove();
                return reject("No device connected");
            }

            // Gestionnaire d'événement pour la déconnexion
            const onDisconnected = () => {
                this.currentDevice.removeEventListener('gattserverdisconnected', onDisconnected);
                this.currentDevice = null;
                document.getElementById('disconnect-opt').style.display = 'none';
                $("#connected-icon").remove();
                return resolve("Device disconnected");
            };

            // Attachez l'écouteur d'événement
            this.currentDevice.addEventListener('gattserverdisconnected', onDisconnected);

            // Déclenchez la déconnexion
            this.currentDevice.gatt.disconnect();
        });
    },
    pair: async function () {
        if (this.currentDevice === null) {
            console.log("Requesting Bluetooth Device... 📲");

            if (Simulator.isOpen) {
                toggleSimulator();
            }

            if (this.name === null) {
                this.requestContents = {
                    acceptAllDevices: true
                };
            } else {
                this.requestContents = {
                    filters: [
                        { name: this.name }
                    ]
                };
            }

            this.requestContents.optionalServices = [this.actuatorsServiceID, this.sensorsServiceID];

            try {
                this.currentDevice = await navigator.bluetooth.requestDevice(this.requestContents);
                // Log device name and ID
                console.log("Device name: " + this.currentDevice.name);
                console.log("Device ID: " + this.currentDevice.id);
                if (this.currentDevice.name === null) throw "Unknown device";
            } catch (error) {
                if (String(error).match(/NotFoundError: User cancelled the requestDevice\(\) chooser\./g)) {
                    InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.noDeviceSelected'), 'interrupt', false, true);
                } else {
                    console.error(error);
                }
                await this.unpair();
                return;
            }

            // Get GATT services
            try {
                console.log("Connecting to GATT server... 📡");
                this.currentServer = await this.currentDevice.gatt.connect();
                console.log(this.currentServer);
            } catch (error) {
                console.error(error);
                await this.unpair();
                return;
            }
            try {
                console.log("⚙️ Getting actuators service with UUID " + this.actuatorsServiceID);
                this.actuatorsService = await this.currentServer.getPrimaryService(this.actuatorsServiceID);
            } catch (error) {
                if (String(error).match(/Add the service UUID to 'optionalServices' in requestDevice\(\) options\./g)) {
                    this.notif.displayNotification(null, jsonPath('code.WebBluetoothAPI.notFoundUUID'), 'bg-danger');
                } else {
                    console.error(error);
                }
                await this.unpair();
                return;
            }

            console.log("⚙️ Getting actuators characteristic with UUID " + this.actuatorsCharacteristicID);
            this.actuatorsCharacteristic = await this.actuatorsService.getCharacteristic(this.actuatorsCharacteristicID);

            console.log("🔎 Getting sensors service with UUID " + this.sensorsServiceID);
            this.sensorsService = await this.currentServer.getPrimaryService(this.sensorsServiceID);

            console.log("🔎 Getting sensors characteristic with UUID " + this.actuatorsCharacteristicID);
            this.sensorsCharacteristic = await this.sensorsService.getCharacteristic(this.sensorsCharacteristicID);

            this.startActuatorsNotification();
            this.startSensorsNotifications();

            document.getElementById('disconnect-opt').style.display = 'block';
            if (document.getElementById('connected-icon') === null) {
                $("#execution-buttons-panel").append('<i id="connected-icon" class="fa-brands fa-bluetooth"></i>');
            }
        }

        this.firstCommandSent = false;

        if (!this.setUpListener) this.setUpBlocklyListener();

        if (Simulator.isRunning) {
            Simulator.replay();
        } else {
            Simulator.play();
        }
    },
    writeValue: function (characteristic, value) {
        console.log("📝 Sending value: " + value);
        if (typeof value === 'string') {
            const arrayBuffer = this.hexStringToArrayBuffer(value);
            characteristic.writeValue(arrayBuffer);
            return;
        }
        Simulator.pause();
        characteristic.writeValue(value);
        if (!this.firstCommandSent) {
            this.firstCommandSent = true
            return InterfaceMonitor.writeConsole('📨 Lancement du script', 'neutral');
        }
    },
    startActuatorsNotification: async function () {
        console.log("Actuators notifications started. 📩");
        const name = "actuators";
        this.notifications[name] = await this.actuatorsCharacteristic.startNotifications();
        this.notifications[name].addEventListener('characteristicvaluechanged', (event) => {
            // console.log("Length: " + event.target.value.byteLength);
            const code = event.target.value.getInt8(0);
            console.log("Code: " + code);
            switch (code) {
                case 3:
                    this.sendCommandAttempt = 0;
                    Simulator.play();
                    break;
                case 1:
                    setTimeout(() => {
                        if (this.sendCommandAttempt <= this.MAX_COMMAND_ATTEMPT) {
                            Simulator.replay();
                            this.sendCommandAttempt++;
                        } else {
                            this.notif.displayNotification(null, 'An error has occurred, please reload the page.', 'bg-danger');
                        }
                    }, 100);
                    break;
            }
        });
    },
    startSensorsNotifications: async function () {
        console.log("Sensors notifications started. 📩");
        const name = "sensors";
        this.notifications[name] = await this.sensorsCharacteristic.startNotifications();
        this.notifications[name].addEventListener('characteristicvaluechanged', (event) => {
            WEB_BLE.sensor_data = Array.from(new Uint8Array(event.target.value.buffer));
        });
        this.writeValue(this.sensorsCharacteristic, '0x01');
    },
    blocklyWorkspaceListener: async function () {
        if (WEB_BLE.currentDevice !== null && Simulator.isRunning && !Simulator.isStopped) {
            await Simulator.stop();
            return InterfaceMonitor.writeConsole('🚫 Arrêt du script', 'neutral');
        }
    },
    setUpBlocklyListener: function () {
        this.setUpListener = true;
        Blockly.getMainWorkspace().addChangeListener(this.blocklyWorkspaceListener);
    }
};