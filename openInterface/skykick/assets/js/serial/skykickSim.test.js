// Run: node openInterface/skykick/assets/js/serial/skykickSim.test.js
const assert = require('assert');
const { SKYKICK_DT, SkykickDrone } = require('./skykickAPI.js');
Object.assign(global, { SKYKICK_DT, SKYKICK_DRONE: 16, SKYKICK_CONTROLLER: 32, SKYKICK_MUTE: 238 });
const { SkykickSimLink } = require('./skykickSim.js');

// the driver of the blocks on the simulator (no controller connected)
(async () => {
    const sim = new SkykickSimLink();
    const drone = new SkykickDrone({ isConnected: false }, sim);
    drone.wait = async () => { };
    drone.reset();
    const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, a + ' != ' + b);

    await drone.go('forward', 1, 1); // on the ground: ignored, like the real drone
    near(sim.pos.x, 0);
    await drone.takeoff();
    assert.strictEqual(sim.flying, true);
    near(sim.pos.z, 1);
    assert.strictEqual(await drone.state('modeFlight'), 'Flight');

    await drone.go('forward', 1, 1);
    await drone.turn('counterclockwise', 90, 45);
    await drone.go('forward', 0.5, 1); // forward after a quarter turn to the left: to the left
    near(sim.pos.x, 1);
    near(sim.pos.y, 0.5);
    near(await drone.position3d('y'), 0.5);
    near(await drone.height('rangeHeight'), 1);
    assert.strictEqual(await drone.attitude('angleYaw'), 90);

    await drone.ledPreset('#00ff00', 220); // LED and buzzer: no error without page nor audio
    await drone.playNote(5, 'A', 0.1);

    // Stop button: lands (the simulator answers Flight)
    await drone.abort();
    assert.strictEqual(sim.flying, false);
    near(sim.pos.z, 0);

    // new run: back to the start
    drone.reset();
    near(sim.pos.x, 0);
    assert.strictEqual(sim.heading, 0);
    console.log('skykickSim OK');
})();
