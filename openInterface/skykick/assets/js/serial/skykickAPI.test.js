'use strict';
// node openInterface/skykick/assets/js/serial/skykickAPI.test.js
const assert = require('assert');
const { skykickFrame } = require('../../../../interfaces/assets/js/serial/skykick/SkykickLink.js');
const { SKYKICK_DT: DT, skykickPayload: P, skykickRead, skykickScale, SkykickDrone, SKYKICK_CFG } = require('./skykickAPI.js');

const hex = (b) => Array.from(b, x => x.toString(16).padStart(2, '0')).join(' ');
const frame = (dt, to, payload) => hex(skykickFrame(dt, 0, to, payload));

assert.strictEqual(frame(DT.COMMAND, 16, P.command(7, 17)), '0a 55 11 02 00 10 07 11 43 c3'); // takeoff
assert.strictEqual(frame(DT.COMMAND, 16, P.command(7, 18)), '0a 55 11 02 00 10 07 12 20 f3'); // landing
assert.strictEqual(frame(DT.COMMAND, 16, P.command(1, 0)), '0a 55 11 02 00 10 01 00 f5 6b'); // stop
assert.strictEqual(frame(DT.CONTROL, 16, P.quad(0, 0, 0, 0)), '0a 55 10 04 00 10 00 00 00 00 28 f8');
assert.strictEqual(frame(DT.REQUEST, 16, P.request(DT.STATE)), '0a 55 04 01 00 10 40 05 b4');
assert.strictEqual(frame(DT.CONTROL, 16, P.position(1, 0, 0, 1, 0, 0)), '0a 55 10 14 00 10 00 00 80 3f 00 00 00 00 00 00 00 00 00 00 80 3f 00 00 00 00 70 f7');
assert.strictEqual(frame(DT.LIGHT_MODE, 16, P.lightModeColor(34, 220, 255, 0, 0)), '0a 55 21 06 00 10 22 dc 00 ff 00 00 59 f6');
assert.strictEqual(frame(DT.BUZZER, 32, P.buzzer(4, skykickScale(5, 'C'), 1000)), '0a 55 62 05 00 20 04 30 00 e8 03 63 4f');

// scale: C5 = 48, mute = 238
assert.strictEqual(skykickScale(5, 'C'), 48);
assert.strictEqual(skykickScale(1, 'B'), 11);
assert.strictEqual(skykickScale(3, 'mute'), 238);

// decoding
const motion = new DataView(new ArrayBuffer(18));
motion.setInt16(0, -5, true);
motion.setInt16(12, 90, true);
const decoded = skykickRead.motion(new Uint8Array(motion.buffer));
assert.strictEqual(decoded.accX, -5);
assert.strictEqual(decoded.angleRoll, 90);
assert.deepStrictEqual(skykickRead.state(new Uint8Array([0, 19, 0, 3, 2, 0, 1, 87])), { modeSystem: 0, modeFlight: 19, modeControlFlight: 0, modeMovement: 3, headless: 2, controlSpeed: 0, sensorOrientation: 1, battery: 87 });
assert.strictEqual(skykickRead.stateController(new Uint8Array([0, 128])).codingMode, true);

// driver on a fake link: takeoff = control until Hovering, then the Takeoff command
(async () => {
    const sent = [];
    const fake = {
        isConnected: true,
        send: async (dt, to, payload) => { sent.push([dt, hex(payload)]); },
        waitFor: () => new Promise((resolve, reject) => setImmediate(() => { // answers after the send
            const last = sent[sent.length - 1];
            if (last && last[0] === DT.REQUEST) resolve({ dataType: DT.STATE, from: 16, payload: new Uint8Array([0, 17, 0, 1, 0, 0, 1, 90]) }); // Ready
            else if (last && last[0] !== DT.CONTROL) resolve({ dataType: DT.ACK, from: 16, payload: new Uint8Array(11) });
            else reject(new Error('timeout'));
        }))
    };
    const drone = new SkykickDrone(fake);
    drone.wait = async () => { };
    await drone.takeoff();
    assert.deepStrictEqual(sent, [[DT.REQUEST, '40'], [DT.CONTROL, '00 00 00 00'], [DT.COMMAND, '07 11']]);
    drone.codingMode = false;
    sent.length = 0;
    await drone.land();
    assert.deepStrictEqual(sent, [[DT.REQUEST, '40']]); // not in Link mode: only the Request goes out

    // abort during takeoff (race.js): the old takeoff ends at once, sends nothing after the abort but the Landing
    const log = [];
    const slow = { isConnected: true, send: async (dt, to, p) => { log.push(dt + ':' + Array.from(p).join(',')); }, waitFor: () => new Promise((_, rej) => setTimeout(() => rej(new Error('t')), 20)) };
    const d2 = new SkykickDrone(slow);
    const t0 = Date.now();
    let oldEnd = 0;
    const old = d2.takeoff().then(() => { oldEnd = Date.now() - t0; });
    await new Promise(r => setTimeout(r, 50));
    d2.abort();
    const sentAtAbort = log.length;
    await old;
    d2.reset();
    await new Promise(r => setTimeout(r, 300));
    assert.ok(oldEnd < 1000, 'old takeoff ended at ' + oldEnd);
    assert.ok(log.slice(sentAtAbort).every(x => x === '17:7,18' || x === '4:64'), 'only State request and Landing after abort: ' + log.slice(sentAtAbort));

    // abort: State request, then lands until the Ack (not more than RETRY_DRONE times) unless the drone is grounded
    const flight = (modeFlight, ackAt) => {
        const f = { landings: 0, requests: 0, isConnected: true };
        f.send = async (dt) => { dt === DT.REQUEST ? f.requests++ : f.landings++; f.last = dt; };
        f.waitFor = () => new Promise((res, rej) => setImmediate(() => {
            if (f.last === DT.REQUEST) return modeFlight === null ? rej(new Error('t')) : res({ payload: new Uint8Array([0, modeFlight, 0, 0, 0, 0, 0, 0]) });
            f.landings >= ackAt ? res({ payload: new Uint8Array(11) }) : rej(new Error('t'));
        }));
        return f;
    };
    let f = flight(16, 1); // Ready: no Landing (it would reset the LED)
    await new SkykickDrone(f).abort();
    assert.deepStrictEqual([f.requests, f.landings], [1, 0]);
    f = flight(19, 3); // Flight: lands until the Ack
    await new SkykickDrone(f).abort();
    assert.deepStrictEqual([f.requests, f.landings], [1, 3]);
    f = flight(null, Infinity); // no answer at all: lands anyway
    await new SkykickDrone(f).abort();
    assert.deepStrictEqual([f.requests, f.landings], [SKYKICK_CFG.RETRY_CONTROLLER, SKYKICK_CFG.RETRY_DRONE]);

    // the next run waits for the pending Landing; a send of the stopped run is dropped
    const order = [];
    const d3 = new SkykickDrone({ isConnected: true, send: async (dt) => { order.push(dt); }, waitFor: () => new Promise((res, rej) => setTimeout(() => order[order.length - 1] === DT.REQUEST ? res({ payload: new Uint8Array([0, 19, 0, 0, 0, 0, 0, 0]) }) : rej(new Error('t')), 5)) });
    d3.abort();
    const stale = d3.send(DT.LIGHT_MODE, 16, new Uint8Array(6));
    d3.reset();
    await d3.send(DT.LIGHT_MODE, 16, new Uint8Array(6));
    assert.strictEqual(await stale, false);
    assert.deepStrictEqual(order, [DT.REQUEST, ...Array(SKYKICK_CFG.RETRY_DRONE).fill(DT.COMMAND), DT.LIGHT_MODE]);

    // module: the pending calls of a stopped run never resolve
    global.SkykickDroneAPI = new SkykickDrone(slow);
    global.Sk = { builtin: { str: function (s) { this.s = s; }, func: function (f) { this.f = f; }, none: { none$: null } }, ffi: { remapToJs: x => x, remapToPy: x => x }, misceval: { promiseToSuspension: function (p) { return p; } } };
    global.Simulator = { sleep_ms: () => null };
    const code = require('fs').readFileSync(__dirname + '/../simulator/src/skykick.js', 'utf8') + ';globalThis.builtinmodule = $builtinmodule;';
    require('vm').runInThisContext(code);
    // Skulpt imports the module once: the runs are separated by Simulator.prepareToRun -> reset()
    const mod = builtinmodule();
    global.SkykickDroneAPI.wait = async () => { };
    global.SkykickDroneAPI.reset();
    let resolved = false;
    mod.takeoff.f().then(() => { resolved = true; });
    global.SkykickDroneAPI.reset(); // new run: the pending takeoff is obsolete
    await new Promise(r => setTimeout(r, 500));
    assert.strictEqual(resolved, false);

    // Stop then a new run with the same (cached) module: its commands go out again
    const leds = [];
    global.SkykickDroneAPI = new SkykickDrone({ isConnected: true, send: async (dt) => { leds.push(dt); }, waitFor: (match) => Promise.resolve().then(() => {
        const f = [{ dataType: DT.ACK, from: 16, payload: new Uint8Array(11) }, { dataType: DT.STATE, from: 16, payload: new Uint8Array([0, 16, 0, 0, 0, 0, 0, 81]) }].find(match);
        if (!f) throw new Error('t');
        return f;
    }) });
    const cached = builtinmodule();
    global.SkykickDroneAPI.reset();
    await global.SkykickDroneAPI.abort(); // Stop (grounded: no Landing)
    global.SkykickDroneAPI.reset(); // Play
    leds.length = 0;
    await cached.led_preset.f('#00ff00', 220);
    assert.deepStrictEqual(leds, [DT.LIGHT_MODE]);
    console.log('skykickAPI OK');
})();
