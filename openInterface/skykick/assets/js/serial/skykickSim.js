'use strict';
/**
 * Simulated SkyKick controller and drone, with the interface of SkykickLink (isConnected, send, waitFor).
 * SkykickDroneAPI uses it while no controller is connected: the blocks run the same driver code, the frames sent to
 * the drone move the drone of the simulator board and the requests are answered with the simulated state.
 * Front view, seen from behind the drone: left/right = horizontal, up/down = vertical, forward/backward = depth.
 * Top view: the robot simulator (robot.js) places the drone of its track at the displayed state, see shown().
 */

// ponytail: display scale and flight values of the simulation, to be tuned with the real drone
const SKYKICK_SIM = {
    PX_PER_M: 50, // board pixels for one meter
    MAX_HEIGHT_PX: 110, // top of the board: higher flights stay at the top of the view
    MAX_SIDE_PX: 130,
    TAKEOFF_HEIGHT: 1, // m
    TAKEOFF_MS: 2000,
    LANDING_MS: 2500,
    FALL_MS: 400, // motors stopped in flight
    QUAD_SPEED: 1, // m/s at 100 % of a control axis
    QUAD_YAW_SPEED: 90, // deg/s at 100 %
    QUAD_TICK: 50, // ms
    BATTERY: 100
};

// element of the simulator board (none under node or before the board is drawn)
const skykickSimElement = (id) => typeof document === 'undefined' ? null : document.getElementById(id);

class SkykickSimLink {
    constructor() {
        this.isConnected = true;
        this.reset();
    }

    /** New run: the drone is back on the ground, LED off. */
    reset() {
        clearInterval(this._quadTimer);
        this._quadTimer = null;
        this.quad = [0, 0, 0, 0];
        this.pos = { x: 0, y: 0, z: 0 }; // m: x forward, y left, z up
        this.heading = 0; // deg, counterclockwise
        this.flying = false;
        this.trim = [0, 0, 0, 0];
        this.last = null;
        this._shown = null;
        this.render(0);
        this.light(null);
    }

    /** Frame to the drone or the controller: done at once, answered by waitFor. */
    async send(dt, to, payload) {
        this.last = { dt, to, payload };
        const v = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
        switch (dt) {
            case SKYKICK_DT.COMMAND: return this.command(payload[0], payload[1]);
            case SKYKICK_DT.CONTROL:
                if (payload.length === 4) return this.setQuad([0, 1, 2, 3].map(i => v.getInt8(i)));
                return this.move(v.getFloat32(0, true), v.getFloat32(4, true), v.getFloat32(8, true), v.getFloat32(12, true), v.getInt16(16, true), v.getInt16(18, true));
            case SKYKICK_DT.LIGHT_MODE: return this.lightMode(payload[0], v.getUint16(1, true), payload[3], payload[4], payload[5]);
            case SKYKICK_DT.LIGHT_MANUAL: return this.light(null); // second frame of "LED off"
            case SKYKICK_DT.BUZZER: return this.buzzer(payload[0], v.getUint16(1, true), v.getUint16(3, true));
            case SKYKICK_DT.TRIM: this.trim = [0, 2, 4, 6].map(o => v.getInt16(o, true));
        }
    }

    /** Answer of the last frame (Ack, or the requested data), after the send like the real controller. */
    waitFor(match, timeout) {
        return new Promise((resolve, reject) => setTimeout(() => {
            const answer = this.answer();
            if (answer && match(answer)) resolve(answer);
            else setTimeout(() => reject(new Error('SkyKick simulator: no answer')), timeout);
        }, 1));
    }

    answer() {
        if (!this.last) return null;
        const { dt, to, payload } = this.last;
        if (dt !== SKYKICK_DT.REQUEST) return { dataType: SKYKICK_DT.ACK, from: to, payload: new Uint8Array(11) };
        const data = this.data(to, payload[0]);
        return data && { dataType: payload[0], from: to, payload: data };
    }

    /** Payload of a requested data, null if the simulator has none (no answer). */
    data(to, dataType) {
        const bytes = (size, write) => {
            const v = new DataView(new ArrayBuffer(size));
            write(v);
            return new Uint8Array(v.buffer);
        };
        const { x, y, z } = this.pos;
        switch (dataType) {
            case SKYKICK_DT.STATE:
                if (to === SKYKICK_CONTROLLER) return new Uint8Array([0, 128, 0, 0, 0, 0, 0, 0]); // Link mode
                // Ready / Flight, movement Ready / Hovering / Moving, Normal (not headless), battery
                return new Uint8Array([0, this.flying ? 19 : 16, 0, this.flying ? (this.quad.some(q => q) ? 3 : 2) : 1, 2, 0, 1, SKYKICK_SIM.BATTERY]);
            case SKYKICK_DT.MOTION: // acc, gyro, then angles roll, pitch, yaw
                return bytes(18, v => v.setInt16(16, Math.round(((this.heading % 360) + 540) % 360 - 180), true));
            case SKYKICK_DT.ALTITUDE:
                return bytes(16, v => [25, 101325, z, z].forEach((n, i) => v.setFloat32(i * 4, n, true)));
            case SKYKICK_DT.VISION:
                return bytes(12, v => [x, y, z].forEach((n, i) => v.setFloat32(i * 4, n, true)));
            case SKYKICK_DT.TRIM:
                return bytes(8, v => this.trim.forEach((n, i) => v.setInt16(i * 2, n, true)));
        }
        return null;
    }

    // ---- Flight ----

    command(type, option) {
        if (type === 1) return this.land(SKYKICK_SIM.FALL_MS); // Stop: the motors stop
        if (type === 7 && option === 17 && !this.flying) {
            this.flying = true;
            this.pos.z = SKYKICK_SIM.TAKEOFF_HEIGHT;
            this.render(SKYKICK_SIM.TAKEOFF_MS);
        }
        if (type === 7 && option === 18) this.land(SKYKICK_SIM.LANDING_MS);
    }

    land(ms) {
        this.setQuad([0, 0, 0, 0]);
        this.flying = false;
        this.pos.z = 0;
        this.render(ms);
    }

    /** Position move, relative to the drone heading: x forward, y left, z up (m), heading (deg). */
    move(x, y, z, velocity, heading, rotationalVelocity) {
        if (!this.flying) return;
        const a = this.heading * Math.PI / 180;
        this.pos.x += x * Math.cos(a) - y * Math.sin(a);
        this.pos.y += x * Math.sin(a) + y * Math.cos(a);
        this.pos.z = Math.max(0.1, this.pos.z + z);
        this.heading += heading;
        const distance = Math.sqrt(x * x + y * y + z * z);
        const ms = Math.max(velocity ? distance / velocity : 0, rotationalVelocity ? Math.abs(heading / rotationalVelocity) : 0) * 1000;
        this.render(ms || 300);
    }

    /** Control axes in % (roll right, pitch forward, yaw counterclockwise, throttle up): moves while not zero. */
    setQuad(quad) {
        this.quad = quad;
        const moving = this.flying && quad.some(q => q);
        if (!moving) {
            clearInterval(this._quadTimer);
            this._quadTimer = null;
            return;
        }
        if (this._quadTimer) return;
        this._quadTimer = setInterval(() => {
            if (!this.flying) return this.setQuad([0, 0, 0, 0]);
            const s = SKYKICK_SIM.QUAD_TICK / 1000 * SKYKICK_SIM.QUAD_SPEED / 100;
            const [roll, pitch, yaw, throttle] = this.quad;
            this.heading += yaw * SKYKICK_SIM.QUAD_TICK / 1000 * SKYKICK_SIM.QUAD_YAW_SPEED / 100;
            const a = this.heading * Math.PI / 180;
            this.pos.x += (pitch * Math.cos(a) + roll * Math.sin(a)) * s;
            this.pos.y += (pitch * Math.sin(a) - roll * Math.cos(a)) * s;
            this.pos.z = Math.max(0.1, this.pos.z + throttle * s);
            this.render(SKYKICK_SIM.QUAD_TICK);
        }, SKYKICK_SIM.QUAD_TICK);
    }

    /** Drone of the board at the simulated position (transition of ms). */
    render(ms) {
        const to = { x: this.pos.x, y: this.pos.y, z: this.pos.z, heading: this.heading };
        this._shown = { from: this._shown ? this.shown() : to, to, start: Date.now(), ms, ease: ms > SKYKICK_SIM.QUAD_TICK };
        const sim = skykickSimElement('skykick-sim');
        if (sim) {
            const px = SKYKICK_SIM.PX_PER_M;
            const side = Math.max(-SKYKICK_SIM.MAX_SIDE_PX, Math.min(-this.pos.y * px, SKYKICK_SIM.MAX_SIDE_PX));
            const up = Math.min(this.pos.z * px, SKYKICK_SIM.MAX_HEIGHT_PX);
            const depth = Math.max(0.4, Math.min(1 / (1 + this.pos.x * 0.3), 1.6)); // forward: farther, smaller
            sim.style.transition = `transform ${ms}ms ${ms > SKYKICK_SIM.QUAD_TICK ? 'ease-in-out' : 'linear'}`;
            sim.style.transform = `translate(${side}px, ${-up}px) scale(${depth})`;
        }
        const info = skykickSimElement('skykick-position');
        if (info) {
            const f = (n) => (Math.round(n * 10) / 10).toFixed(1);
            info.querySelector('span').textContent = `x ${f(this.pos.x)} m · y ${f(this.pos.y)} m · z ${f(this.pos.z)} m · ${Math.round(this.heading)}°`;
            info.querySelector('i').style.transform = `rotate(${-45 - this.heading}deg)`; // fa-location-arrow points up-right
        }
    }

    /** Displayed state at this time: from the previous one to the simulated one, same easing as the front view. */
    shown() {
        const { from, to, start, ms, ease } = this._shown;
        let t = ms ? Math.min(1, (Date.now() - start) / ms) : 1;
        if (ease) t = t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2;
        const mix = (k) => from[k] + (to[k] - from[k]) * t;
        return { x: mix('x'), y: mix('y'), z: mix('z'), heading: mix('heading') };
    }

    // ---- LED and buzzer ----

    lightMode(mode, interval, r, g, b) {
        if (mode === 32) return this.light(null);
        // hold: interval is the brightness; flicker, dimming: interval is the period (ms); rainbow: any color
        const animation = { 35: 'skykick-flicker', 36: 'skykick-flicker', 37: 'skykick-dimming', 40: 'skykick-rainbow', 41: 'skykick-rainbow' }[mode];
        if (mode >= 40) [r, g, b] = [255, 0, 0]; // rainbow: hue rotation of a saturated color
        this.light({ r, g, b, alpha: mode === 34 ? interval / 255 : 1, animation, period: Math.max(100, interval) });
    }

    light(led) {
        const el = skykickSimElement('skykick-led');
        if (!el) return;
        el.style.display = led ? 'block' : 'none';
        if (!led) return;
        el.style.background = `radial-gradient(closest-side, rgba(${led.r}, ${led.g}, ${led.b}, ${led.alpha}), rgba(${led.r}, ${led.g}, ${led.b}, 0))`;
        el.style.animation = led.animation ? `${led.animation} ${led.period}ms infinite` : 'none';
    }

    buzzer(mode, value, time) {
        try {
            this.audio ??= new AudioContext();
        } catch (e) {
            return;
        }
        this.oscillator?.stop();
        this.oscillator = null;
        // 0: stop, 4: scale (C5 = 48, mute = 238), 6: frequency (Hz)
        const hz = mode === 4 && value !== SKYKICK_MUTE ? 440 * 2 ** ((value - 45) / 12) : mode === 6 ? value : 0;
        if (!hz || !time) return;
        const oscillator = this.audio.createOscillator();
        const gain = this.audio.createGain();
        gain.gain.value = 0.1;
        oscillator.type = 'square';
        oscillator.frequency.value = hz;
        oscillator.connect(gain).connect(this.audio.destination);
        oscillator.start();
        oscillator.stop(this.audio.currentTime + time / 1000);
        this.oscillator = oscillator;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { SkykickSimLink, SKYKICK_SIM };
}
