/**
 * @fileoverview Wi-Fi settings of the Arduino UNO Q (Linux side, NetworkManager), through the USB connection (ADB).
 * Reading the state and the networks doesn't need the board password, connecting and switching the Wi-Fi do (sudo).
 * The Wi-Fi isn't needed by the USB connection: switching it off never makes the board unreachable.
 */
const QWifiSettings = {
    MODAL_ID: 'modal-arduino-q-wifi',
    _busy: false,

    get uploader() {
        return InterfaceConnection.unoqUp;
    },

    _t(key) {
        return jsonPath('modals.standard.arduino-q-wifi.' + key);
    },

    _elt(id) {
        return document.getElementById('arduino-q-wifi-' + id);
    },

    /**
     * [Menu] Open the Wi-Fi settings of the connected board
     */
    async open() {
        if (!this.uploader || !this.uploader.isConnected()) return;
        pseudoModal.openModal(this.MODAL_ID);
        this._elt('password').value = '';
        await this.refresh(true);
    },

    /**
     * Run a board command without showing it in the console
     * @param {string} cmd
     * @returns {Promise<string>}
     */
    async _run(cmd) {
        // A running app keeps a "logs --follow" shell open: stop it to free the board
        if (this.uploader.shell != null) await this.uploader.stopCurrentShell();
        return String(await this.uploader.execute('shell:' + cmd, true) || '').replace(/\r/g, '');
    },

    async _runAsRoot(cmd) {
        if (this.uploader.shell != null) await this.uploader.stopCurrentShell();
        const output = await this.uploader.sudo(cmd, true);
        // The password modal closed the Wi-Fi settings
        pseudoModal.openModal(this.MODAL_ID);
        return output === null ? null : String(output).replace(/\r/g, '');
    },

    _setStatus(text, type = 'neutral') {
        const statusElt = this._elt('status');
        statusElt.textContent = text;
        statusElt.className = { success: 'text-success fw-bold', warning: 'text-danger' }[type] || '';
    },

    _setBusy(busy) {
        this._busy = busy;
        ['toggle', 'scan', 'networks', 'password', 'connect'].forEach(id => this._elt(id).disabled = busy);
    },

    /**
     * Read the Wi-Fi state (and the networks around)
     * @param {boolean} scan
     */
    async refresh(scan = false) {
        if (this._busy) return;
        this._setBusy(true);
        this._setStatus(this._t('status.loading'));
        try {
            const radio = (await this._run('nmcli -t -f WIFI general')).trim();
            if (!/^(enabled|disabled)$/m.test(radio)) {
                this._setStatus(this._t('status.nmcliMissing'), 'warning');
                return;
            }
            const enabled = /^enabled$/m.test(radio);
            this._elt('toggle').checked = enabled;
            this._elt('networks-area').style.display = enabled ? '' : 'none';
            if (!enabled) {
                this._setStatus(this._t('status.disabled'));
                return;
            }
            // "wlan0:wifi:connected:MyNetwork"
            const device = (await this._run('nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device'))
                .split('\n').map(line => this._splitTerse(line)).find(fields => fields[1] === 'wifi');
            if (device && device[2] === 'connected') {
                // "192.168.1.42/24" (the output of the "ip" command is coloured with ANSI codes on the board)
                const ip = ((await this._run('nmcli -t -g IP4.ADDRESS device show ' + UnoQuploader.shellQuote(device[0]))).match(/\d+\.\d+\.\d+\.\d+/) || [])[0] || '?';
                this._setStatus(this._t('status.connected').replace('%1', device[3]).replace('%2', ip), 'success');
            } else {
                this._setStatus(this._t('status.notConnected'));
            }
            if (scan) await this._scan(device && device[2] === 'connected' ? device[3] : null);
        } catch (error) {
            console.error(error);
            this._setStatus(String(error.message || error), 'warning');
        } finally {
            this._setBusy(false);
        }
    },

    /**
     * Fields of a "nmcli -t" line: separated by ":", "\:" and "\\" are escaped characters of the values
     * @param {string} line
     * @returns {Array<string>}
     */
    _splitTerse(line) {
        const fields = [''];
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '\\' && i + 1 < line.length) {
                fields[fields.length - 1] += line[++i];
            } else if (line[i] === ':') {
                fields.push('');
            } else {
                fields[fields.length - 1] += line[i];
            }
        }
        return fields;
    },

    /**
     * List the networks around in the select, the strongest first
     * @param {string|null} currentNetwork
     */
    async _scan(currentNetwork) {
        const select = this._elt('networks');
        select.innerHTML = '';
        const output = await this._run('nmcli -t -f SIGNAL,SECURITY,SSID device wifi list --rescan yes');
        const networks = new Map();
        output.split('\n').map(line => this._splitTerse(line)).forEach(([signal, security, ssid]) => {
            if (!ssid || (networks.has(ssid) && networks.get(ssid).signal >= Number(signal))) return;
            networks.set(ssid, { signal: Number(signal) || 0, secured: Boolean(security && security !== '--') });
        });
        [...networks.entries()].sort((a, b) => b[1].signal - a[1].signal).forEach(([ssid, network]) => {
            const option = document.createElement('option');
            option.value = ssid;
            option.dataset.secured = network.secured;
            option.textContent = `${ssid} (${network.signal} %)`;
            option.selected = ssid === currentNetwork;
            select.appendChild(option);
        });
        if (!networks.size) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = this._t('status.noNetwork');
            select.appendChild(option);
        }
        this.onNetworkChange();
    },

    /**
     * The password field is only useful for a secured network
     */
    onNetworkChange() {
        const option = this._elt('networks').selectedOptions[0];
        const secured = !option || option.dataset.secured !== 'false';
        this._elt('password-area').style.display = secured ? '' : 'none';
        // username of the form: the browser can remember the password of each network
        this._elt('ssid').value = option ? option.value : '';
    },

    /**
     * [Switch] Enable / disable the Wi-Fi of the board
     */
    async toggle() {
        if (this._busy) return;
        const enable = this._elt('toggle').checked;
        this._setBusy(true);
        const output = await this._runAsRoot('nmcli radio wifi ' + (enable ? 'on' : 'off'));
        this._setBusy(false);
        if (output === null) {
            this._elt('toggle').checked = !enable;
            return;
        }
        // The board needs a few seconds to find its network again
        if (enable) await sleep_ms(3000);
        await this.refresh(enable);
    },

    /**
     * [Button] Connect the board to the selected network
     */
    async connect() {
        const ssid = this._elt('networks').value;
        if (!ssid || this._busy) return;
        const password = this._elt('password').value;
        const secured = this._elt('password-area').style.display !== 'none';
        this._setBusy(true);
        this._setStatus(this._t('status.connecting').replace('%1', ssid));
        let cmd = 'nmcli device wifi connect ' + UnoQuploader.shellQuote(ssid);
        if (secured && password) cmd += ' password ' + UnoQuploader.shellQuote(password);
        const output = await this._runAsRoot(cmd);
        this._setBusy(false);
        if (output === null) {
            this._setStatus(this._t('status.cancelled'), 'warning');
            return;
        }
        if (/successfully activated/i.test(output)) {
            this._elt('password').value = '';
            await this.refresh(false);
            InterfaceMonitor.writeConsole(this._elt('status').textContent, 'success', false, true);
        } else {
            // e.g. "Error: Connection activation failed: Secrets were required, but not provided."
            this._setStatus((output.match(/Error:.*$/m) || [this._t('status.failed')])[0], 'warning');
        }
    },

    /**
     * Close the settings when the board is disconnected
     */
    onBoardDisconnected() {
        const modalElt = document.getElementById(this.MODAL_ID);
        if (modalElt && modalElt.offsetParent !== null) pseudoModal.closeModal(this.MODAL_ID);
    }
};
