'use strict';
/**
 * SkyKick Evo (Byrobot) drone driver on top of SkykickLink (Web Serial through the USB controller).
 * One method per block of the official "SkyKick Evo Block Coding" extension (scratch3_skykick):
 * same payloads, same bounds, same waiting times. Frames are built by SkykickLink.send().
 */

const SKYKICK_DT = {
    ACK: 2, REQUEST: 4, CONTROL: 16, COMMAND: 17, LIGHT_MANUAL: 32, LIGHT_MODE: 33, STATE: 64, ALTITUDE: 67,
    MOTION: 68, VISION: 71, TRIM: 82, BUZZER: 98
};
const SKYKICK_DRONE = 16;
const SKYKICK_CONTROLLER = 32;

// ponytail: values of the official app, to be calibrated on the real hardware (latency, USB, battery).
const SKYKICK_CFG = {
    ACK_TIMEOUT: 20, // ms to wait for the Ack/answer of one try
    RETRY_DRONE: 20, // tries for a frame to the drone
    RETRY_CONTROLLER: 5, // tries for a frame to the controller
    MIN_DELAY: 40, // ms after a simple command
    MOVE_MIN_DELAY: 1500, // ms after a movement
    TAKEOFF_MS: 3000,
    LANDING_MS: 5000,
    TOLERANCE: 0.1, // part of the theoretical movement time added as tolerance, bounded below
    TOLERANCE_MIN: 50,
    TOLERANCE_MAX: 200,
    MODE_CHECK_INTERVAL: 1000, // ms between two checks of the controller Link mode (and of the battery)
    BATTERY_LOW: 20 // % shown in red
};

const skykickFit = (min, value, max) => Math.max(min, Math.min(Number(value) || 0, max));

const skykickView = (size) => new DataView(new ArrayBuffer(size));
const skykickBytes = (view) => new Uint8Array(view.buffer);

// Pure payload builders (little-endian), see the layouts of the Byrobot protocol.
const skykickPayload = {
    request: (dataType) => new Uint8Array([dataType]),
    command: (commandType, option) => new Uint8Array([commandType, option]),
    quad: (roll, pitch, yaw, throttle) => new Uint8Array(new Int8Array([roll, pitch, yaw, throttle].map(Math.round)).buffer),
    position(x, y, z, velocity, heading, rotationalVelocity) {
        const v = skykickView(20);
        [x, y, z, velocity].forEach((n, i) => v.setFloat32(i * 4, n, true));
        v.setInt16(16, Math.round(heading), true);
        v.setInt16(18, Math.round(rotationalVelocity), true);
        return skykickBytes(v);
    },
    trim(roll, pitch, yaw, throttle) {
        const v = skykickView(8);
        [roll, pitch, yaw, throttle].forEach((n, i) => v.setInt16(i * 2, Math.round(n), true));
        return skykickBytes(v);
    },
    lightManual(flags, brightness) {
        const v = skykickView(3);
        v.setUint16(0, flags, true);
        v.setUint8(2, brightness);
        return skykickBytes(v);
    },
    lightModeColor(mode, interval, r, g, b) {
        const v = skykickView(6);
        v.setUint8(0, mode);
        v.setUint16(1, interval, true);
        v.setUint8(3, r);
        v.setUint8(4, g);
        v.setUint8(5, b);
        return skykickBytes(v);
    },
    buzzer(mode, value, time) {
        const v = skykickView(5);
        v.setUint8(0, mode);
        v.setUint16(1, value, true);
        v.setUint16(3, time, true);
        return skykickBytes(v);
    },
};

// Pure decoders of the answers (payload: Uint8Array).
const skykickDV = (p) => new DataView(p.buffer, p.byteOffset, p.byteLength);
const skykickRead = {
    state: (p) => ({ modeSystem: p[0], modeFlight: p[1], modeControlFlight: p[2], modeMovement: p[3], headless: p[4], controlSpeed: p[5], sensorOrientation: p[6], battery: p[7] }),
    stateController: (p) => ({ codingMode: p[1] === 128 }), // controller mode "Link"
    trim: (p) => ({ roll: skykickDV(p).getInt16(0, true), pitch: skykickDV(p).getInt16(2, true), yaw: skykickDV(p).getInt16(4, true), throttle: skykickDV(p).getInt16(6, true) }),
    motion(p) {
        const v = skykickDV(p);
        const names = ['accX', 'accY', 'accZ', 'gyroRoll', 'gyroPitch', 'gyroYaw', 'angleRoll', 'anglePitch', 'angleYaw'];
        return Object.fromEntries(names.map((n, i) => [n, v.getInt16(i * 2, true)]));
    },
    altitude(p) {
        const v = skykickDV(p);
        return { temperature: v.getFloat32(0, true), pressure: v.getFloat32(4, true), altitude: v.getFloat32(8, true), rangeHeight: v.getFloat32(12, true) };
    },
    vision(p) {
        const v = skykickDV(p);
        return { x: v.getFloat32(0, true), y: v.getFloat32(4, true), z: v.getFloat32(8, true) };
    }
};

const SKYKICK_ENUMS = {
    modeFlight: { 0: 'None', 16: 'Ready', 17: 'Start', 18: 'Takeoff', 19: 'Flight', 20: 'Landing', 21: 'Flip', 22: 'Reverse', 32: 'Stop', 48: 'Accident', 49: 'Error', 64: 'Test' },
    modeMovement: { 0: 'None', 1: 'Ready', 2: 'Hovering', 3: 'Moving', 4: 'ReturnHome' },
    headless: { 0: 'None', 1: 'Headless', 2: 'Normal' },
    sensorOrientation: { 0: 'None', 1: 'Normal', 2: 'ReverseStart', 3: 'Reversed' }
};
const SKYKICK_NOTES = ['C', 'CS', 'D', 'DS', 'E', 'F', 'FS', 'G', 'GS', 'A', 'AS', 'B'];
const SKYKICK_MUTE = 238;

// Buzzer scale value: C5 = 48
const skykickScale = (octave, note) => note === 'mute' ? SKYKICK_MUTE : (skykickFit(1, octave, 8) - 1) * 12 + Math.max(0, SKYKICK_NOTES.indexOf(note));

const skykickRgb = (hex) => {
    const n = parseInt(String(hex).replace('#', ''), 16) || 0;
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
};

class SkykickDrone {
    constructor(link = new SkykickLink(), sim = null) {
        this.link = link;
        this.sim = sim; // simulated controller + drone, used while no controller is connected
        this.trim = [0, 0, 0, 0];
        this.codingMode = true; // updated by the controller state
        this._warnedLink = false;
        this._aborted = false;
        this.runId = 0; // one per program run, see reset()
        this._waits = new Set();
        this._monitor = null;
    }

    /** Link of the blocks: the controller when connected, else the simulator (if any). */
    get io() {
        return this.link.isConnected || !this.sim ? this.link : this.sim;
    }

    /** Sleep, interrupted by abort(). */
    wait(ms) {
        if (this._aborted) return Promise.resolve();
        return new Promise(resolve => {
            const done = () => {
                clearTimeout(timer);
                this._waits.delete(done);
                resolve();
            };
            const timer = setTimeout(done, ms);
            this._waits.add(done);
        });
    }

    /**
     * Stop button: end the pending waits and land the drone, retried until its Ack (like stopAllScriptThenSetZero).
     * Callable several times: each call sends the order again.
     */
    abort() {
        this._aborted = true;
        [...this._waits].forEach(done => done());
        return this._landing = this.landIfFlying_();
    }

    // A Landing event on a grounded drone resets its LED: only land when it may be flying (no answer: land anyway).
    async landIfFlying_() {
        const mode = (await this.droneState_())?.modeFlight;
        return [0, 16, 32].includes(mode) || this.land_(); // None, Ready, Stop
    }

    // Raw State request, not cancelled by abort(); null when the drone does not answer.
    async droneState_() {
        for (let i = 0; i < SKYKICK_CFG.RETRY_CONTROLLER && this.io.isConnected; i++) {
            const answer = this.io.waitFor(f => f.dataType === SKYKICK_DT.STATE && f.from === SKYKICK_DRONE, SKYKICK_CFG.ACK_TIMEOUT);
            answer.catch(() => { });
            try {
                await this.io.send(SKYKICK_DT.REQUEST, SKYKICK_DRONE, skykickPayload.request(SKYKICK_DT.STATE));
                return skykickRead.state((await answer).payload);
            } catch (e) { /* no answer: next try */ }
        }
        return null;
    }

    async land_() {
        const payload = skykickPayload.command(7, 18);
        for (let i = 0; i < SKYKICK_CFG.RETRY_DRONE && this.io.isConnected; i++) {
            const ack = this.io.waitFor(f => f.dataType === SKYKICK_DT.ACK && f.from === SKYKICK_DRONE, SKYKICK_CFG.ACK_TIMEOUT);
            ack.catch(() => { });
            try {
                await this.io.send(SKYKICK_DT.COMMAND, SKYKICK_DRONE, payload);
                await ack;
                return true;
            } catch (e) { /* no Ack: next try */ }
        }
        return false;
    }

    /** To be called when a program starts; the returned id lets the module ignore the calls of an older run. */
    reset() {
        this._aborted = false;
        this.sim?.reset();
        return ++this.runId;
    }

    warnNotLinked() {
        if (this._warnedLink) return;
        this._warnedLink = true;
        console.warn('SkyKick: controller is not in coding (Link) mode, commands are ignored.');
        if (typeof InterfaceMonitor !== 'undefined') InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.skykickNotInCodingMode'), 'warning');
    }

    /** Send one frame; false if it was not sent (not connected, aborted, controller not in Link mode). */
    async send(dt, to, payload) {
        // the Landing of a Stop is not interleaved with the frames of the next run
        if (this._landing) {
            const run = this.runId;
            await this._landing;
            if (run !== this.runId) return false;
        }
        const io = this.io;
        if (this._aborted || !io.isConnected) return false;
        if (io === this.link && dt !== SKYKICK_DT.REQUEST && !this.codingMode) {
            this.warnNotLinked();
            return false;
        }
        await io.send(dt, to, payload);
        return true;
    }

    /** Send then wait for the Ack (or the requested data), retried; null if nothing came back (never throws). */
    async transfer(dt, to, payload, retries = to === SKYKICK_DRONE ? SKYKICK_CFG.RETRY_DRONE : SKYKICK_CFG.RETRY_CONTROLLER) {
        const requested = dt === SKYKICK_DT.REQUEST ? payload[0] : SKYKICK_DT.ACK;
        for (let i = 0; i < retries && !this._aborted; i++) {
            const answer = this.io.waitFor(f => f.dataType === requested && f.from === to, SKYKICK_CFG.ACK_TIMEOUT);
            answer.catch(() => { });
            try {
                if (!await this.send(dt, to, payload)) return null;
                return (await answer).payload;
            } catch (e) { /* no answer: next try */ }
        }
        return null;
    }

    request(to, dataType) {
        return this.transfer(SKYKICK_DT.REQUEST, to, skykickPayload.request(dataType));
    }

    command(commandType, option, retries) {
        return this.transfer(SKYKICK_DT.COMMAND, SKYKICK_DRONE, skykickPayload.command(commandType, option), retries);
    }

    /** Control Quad8 sent while the drone has not reached the wanted movement mode (Ready is accepted too). */
    async control(quad) {
        const next = quad.every(v => !v) ? 2 : 3; // Hovering : Moving
        const payload = skykickPayload.quad(...quad);
        for (let i = 0; i < SKYKICK_CFG.RETRY_DRONE; i++) {
            const p = await this.request(SKYKICK_DRONE, SKYKICK_DT.STATE);
            await this.send(SKYKICK_DT.CONTROL, SKYKICK_DRONE, payload);
            const mode = p && skykickRead.state(p).modeMovement;
            if (!p || mode === 1 || mode === next) return;
        }
    }

    async position(x, y, z, velocity, heading, rotationalVelocity, ms) {
        // no Ack comes back for a position: like the app, always send 5 times (ACK_TIMEOUT apart)
        await this.transfer(SKYKICK_DT.CONTROL, SKYKICK_DRONE, skykickPayload.position(x, y, z, velocity, heading, rotationalVelocity), 5);
        await this.wait(ms);
    }

    /** Waiting time of a position move: theoretical time + tolerance, at least MOVE_MIN_DELAY. */
    moveTime(amount, speed) {
        if (!speed) return SKYKICK_CFG.MOVE_MIN_DELAY;
        const time = Math.abs(amount / speed) * 1000;
        return Math.max(SKYKICK_CFG.MOVE_MIN_DELAY, time + skykickFit(SKYKICK_CFG.TOLERANCE_MIN, time * SKYKICK_CFG.TOLERANCE, SKYKICK_CFG.TOLERANCE_MAX));
    }

    // ---- Drone blocks ----

    async takeoff() {
        await this.control([0, 0, 0, 0]);
        await this.command(7, 17);
        await this.wait(SKYKICK_CFG.TAKEOFF_MS);
    }

    async land() {
        await this.control([0, 0, 0, 0]);
        await this.command(7, 18);
        await this.wait(SKYKICK_CFG.LANDING_MS);
    }

    async simpleCommand(commandType, option) {
        await this.command(commandType, option);
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    stop() { return this.simpleCommand(1, 0); }
    clearBias() { return this.simpleCommand(5, 0); }

    async clearTrim() {
        await this.command(6, 0);
        this.trim = [0, 0, 0, 0];
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    setHeadless(toggle) { return this.simpleCommand(3, toggle === 'on' ? 1 : 2); }

    async sendTrim(roll, pitch) {
        const trim = [skykickFit(-200, roll, 200), skykickFit(-200, pitch, 200), this.trim[2], this.trim[3]];
        await this.transfer(SKYKICK_DT.TRIM, SKYKICK_DRONE, skykickPayload.trim(...trim));
        this.trim = trim;
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    setTrim(roll, pitch) { return this.sendTrim(roll, pitch); }

    trimStep(variation) {
        const step = { roll_right: [5, 0], roll_left: [-5, 0], pitch_forward: [0, 5], pitch_backward: [0, -5] }[variation];
        return step ? this.sendTrim(this.trim[0] + step[0], this.trim[1] + step[1]) : this.sendTrim(0, 0);
    }

    async setAxis(axis, value) {
        const quad = [0, 0, 0, 0];
        quad[skykickFit(0, axis, 3)] = skykickFit(-100, value, 100);
        await this.control(quad);
        await this.wait(SKYKICK_CFG.MOVE_MIN_DELAY);
    }

    async moveAxis(axis, value, seconds) {
        const quad = [0, 0, 0, 0];
        quad[skykickFit(0, axis, 3)] = skykickFit(-100, value, 100);
        await this.control(quad);
        await this.wait(Math.max(SKYKICK_CFG.MIN_DELAY, seconds * 1000));
        await this.control([0, 0, 0, 0]);
    }

    async setQuad(roll, pitch, yaw, throttle) {
        await this.control([roll, pitch, yaw, throttle].map(v => skykickFit(-100, v, 100)));
        await this.wait(SKYKICK_CFG.MOVE_MIN_DELAY);
    }

    async moveQuad(roll, pitch, yaw, throttle, seconds) {
        await this.control([roll, pitch, yaw, throttle].map(v => skykickFit(-100, v, 100)));
        await this.wait(Math.max(SKYKICK_CFG.MOVE_MIN_DELAY, seconds * 1000));
        await this.control([0, 0, 0, 0]);
    }

    async go(direction, distance, speed) {
        const axis = { forward: [1, 0, 0], backward: [-1, 0, 0], left: [0, 1, 0], right: [0, -1, 0], up: [0, 0, 1], down: [0, 0, -1] }[direction] || [0, 0, 0];
        await this.control([0, 0, 0, 0]);
        await this.position(axis[0] * distance, axis[1] * distance, axis[2] * distance, speed, 0, 0, this.moveTime(distance, speed));
    }

    async turn(direction, degree, speed) {
        const heading = skykickFit(-360, degree, 360) * (direction === 'clockwise' ? -1 : 1);
        const speedYaw = skykickFit(10, speed, 180);
        await this.position(0, 0, 0, 0, heading, speedYaw, this.moveTime(heading, speedYaw));
    }

    /** go_xyz and go_xyz_turn: pitch/roll/throttle distances, optional yaw rotation. */
    async goXyz(dirPitch, dPitch, dirRoll, dRoll, dirThrottle, dThrottle, speed, dirYaw, degree, speedYawIn) {
        const x = (dirPitch === 'pitch_backward' ? -1 : 1) * skykickFit(-10, dPitch, 10);
        const y = (dirRoll === 'roll_right' ? -1 : 1) * skykickFit(-10, dRoll, 10);
        const z = (dirThrottle === 'throttle_down' ? -1 : 1) * skykickFit(-10, dThrottle, 10);
        const v = skykickFit(0, speed, 5);
        const heading = dirYaw === undefined ? 0 : skykickFit(-360, degree, 360) * (dirYaw === 'clockwise' ? -1 : 1);
        const speedYaw = dirYaw === undefined ? 0 : skykickFit(10, speedYawIn, 180);
        let ms = this.moveTime(Math.sqrt(x * x + y * y + z * z), v);
        if (dirYaw !== undefined) ms = Math.max(ms, this.moveTime(heading, speedYaw));
        await this.position(x, y, z, v, heading, speedYaw, ms);
    }

    // ---- LED blocks ----

    async lightMode(mode, interval, r, g, b) {
        await this.transfer(SKYKICK_DT.LIGHT_MODE, SKYKICK_DRONE, skykickPayload.lightModeColor(mode, interval, ...[r, g, b].map(v => skykickFit(0, v, 255))));
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    async ledOff() {
        await this.transfer(SKYKICK_DT.LIGHT_MODE, SKYKICK_DRONE, skykickPayload.lightModeColor(32, 0, 0, 0, 0));
        await this.transfer(SKYKICK_DT.LIGHT_MANUAL, SKYKICK_DRONE, skykickPayload.lightManual(0x00ff, 0));
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    ledRgb(r, g, b, mode, interval) { return this.lightMode(mode, interval, r, g, b); }

    ledColor(color, mode, interval) {
        return this.lightMode(mode, mode === 34 ? skykickFit(0, interval, 255) : interval, ...skykickRgb(color));
    }

    ledPreset(color, brightness) { return this.lightMode(34, brightness, ...skykickRgb(color)); }

    // ---- Sound blocks (controller buzzer) ----

    async buzzer(mode, value, time) {
        await this.transfer(SKYKICK_DT.BUZZER, SKYKICK_CONTROLLER, skykickPayload.buzzer(mode, value, time), 1);
    }

    async buzzerStop() {
        await this.buzzer(0, 0, 0);
        await this.wait(SKYKICK_CFG.MIN_DELAY);
    }

    async playNote(octave, note, seconds) {
        const ms = skykickFit(0, seconds * 1000, 65535);
        await this.buzzer(4, skykickScale(octave, note), ms);
        await this.wait(ms);
    }

    async playHz(hz, seconds) {
        const ms = skykickFit(0, seconds * 1000, 65535);
        await this.buzzer(6, skykickFit(0, hz, 8000), ms);
        await this.wait(ms);
    }

    // ---- Sensor blocks: null when the drone does not answer ----

    async read(to, dataType, decoder) {
        const p = await this.request(to, dataType);
        return p ? skykickRead[decoder](p) : null;
    }

    async attitude(name) { return (await this.read(SKYKICK_DRONE, SKYKICK_DT.MOTION, 'motion'))?.[name] ?? null; }

    async sensor(name) {
        const isAltitude = ['temperature', 'pressure', 'altitude'].includes(name);
        return (await this.read(SKYKICK_DRONE, isAltitude ? SKYKICK_DT.ALTITUDE : SKYKICK_DT.MOTION, isAltitude ? 'altitude' : 'motion'))?.[name] ?? null;
    }

    async height(name) {
        if (name === 'altitude') return (await this.read(SKYKICK_DRONE, SKYKICK_DT.ALTITUDE, 'altitude'))?.altitude ?? null;
        return (await this.read(SKYKICK_DRONE, SKYKICK_DT.VISION, 'vision'))?.z ?? null; // as the official app
    }

    async position3d(axis) { return (await this.read(SKYKICK_DRONE, SKYKICK_DT.VISION, 'vision'))?.[axis] ?? null; }

    async state(name) {
        if (name === 'pitch' || name === 'roll') return (await this.read(SKYKICK_DRONE, SKYKICK_DT.TRIM, 'trim'))?.[name] ?? null;
        const value = (await this.read(SKYKICK_DRONE, SKYKICK_DT.STATE, 'state'))?.[name];
        return value === undefined ? null : (SKYKICK_ENUMS[name]?.[value] ?? value);
    }

    // ---- Controller Link mode ----

    async checkCodingMode() {
        const p = await this.request(SKYKICK_CONTROLLER, SKYKICK_DT.STATE);
        if (!p) return;
        this.codingMode = skykickRead.stateController(p).codingMode;
        if (this.codingMode) this._warnedLink = false;
        else this.warnNotLinked();
    }

    startMonitor() {
        this.stopMonitor();
        this.checkCodingMode();
        this._monitor = setInterval(() => {
            if (!this.link.isConnected) {
                this.stopMonitor();
                if (typeof $ !== 'undefined') $('#disconnect-opt-skykick').hide();
                // connection lost (USB unplugged): said, the next programs run without the drone
                if (typeof InterfaceMonitor !== 'undefined') InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
                return;
            }
            this.checkCodingMode();
            this.droneState_().then(state => this.showBattery(state?.battery));
        }, SKYKICK_CFG.MODE_CHECK_INTERVAL);
    }

    stopMonitor() {
        clearInterval(this._monitor);
        this._monitor = null;
        this.showBattery(undefined);
    }

    /** Battery of the drone (%) above the simulator board; hidden when unknown. */
    showBattery(level) {
        if (typeof $ === 'undefined') return;
        const badge = $('#skykick-battery');
        if (level === undefined) return badge.hide();
        const icon = ['empty', 'quarter', 'half', 'three-quarters', 'full'][Math.round(level / 25)];
        badge.toggleClass('text-danger', level <= SKYKICK_CFG.BATTERY_LOW).attr('title', jsonPath('code.serialAPI.skykickBattery')).show()
            .find('i').attr('class', 'fa-solid fa-battery-' + icon);
        badge.find('span').text(level + ' %');
    }
}

// no Web Serial under node (unit test): the driver is then built by the test with a fake link
const SkykickDroneAPI = typeof SkykickLink === 'undefined' ? null : new SkykickDrone(new SkykickLink(), new SkykickSimLink());

async function skykickRun() {
    if (!navigator.serial) {
        new VittaNotif(5).displayNotification(null, jsonPath('code.serialAPI.noSerialAPI'), 'bg-danger');
        return;
    }
    if (!SkykickDroneAPI.link.isConnected) {
        try {
            await SkykickDroneAPI.link.search();
        } catch (e) {
            console.error(e);
            const notif = new VittaNotif(5);
            // NetworkError "Failed to open serial port": port held by another process (official app, other tab)
            const key = /No port selected|NotFoundError/i.test(String(e)) ? 'noPortSelected' : /SkyKick not found/.test(String(e)) ? 'boardNotResponding' : e?.name === 'NetworkError' ? 'skykickPortBusy' : 'badResponse';
            notif.displayNotification(null, jsonPath('code.serialAPI.' + key), 'bg-danger');
            return;
        }
        $('#disconnect-opt-skykick').show();
        InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardConnected'), 'success');
        await SkykickDroneAPI.link.pingDrone().catch(() => {
            InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.skykickDroneNotPaired'), 'warning');
        });
        SkykickDroneAPI.startMonitor();
    }
    if ($("#simulator").is(":visible") === false) {
        toggleSimulator();
    } else {
        Simulator.replay();
    }
    if ($('#monitor').hasClass('monitor-closed')) {
        InterfaceMonitor.toggle();
    }
    if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
        InterfaceMonitor.managePanel('console');
    }
}

async function skykickDisconnect() {
    SkykickDroneAPI.stopMonitor();
    if (SkykickDroneAPI.link.isConnected) await SkykickDroneAPI.abort(); // land before leaving
    await SkykickDroneAPI.link.disconnect();
    $('#disconnect-opt-skykick').hide();
    InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
}

if (typeof module !== 'undefined') {
    module.exports = { SKYKICK_DT, SKYKICK_CFG, skykickPayload, skykickRead, skykickScale, SkykickDrone };
}
