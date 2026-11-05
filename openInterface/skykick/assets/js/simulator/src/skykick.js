// SkyKick Evo module: runs the blocks through SkykickDroneAPI (the real drone, or the simulator when no controller is connected)

const $builtinmodule = function () {

    const skykick = {};
    skykick.__name__ = new Sk.builtin.str("skykick");

    const api = SkykickDroneAPI;
    // a run stopped (or replaced by a new one, see Simulator.prepareToRun) never gets the end of its pending calls back
    const alive = (promise) => {
        const runId = api.runId;
        return promise.then(v => api.runId === runId ? v : new Promise(() => { }));
    };

    const args = (pyArgs) => Array.from(pyArgs).map(a => Sk.ffi.remapToJs(a));

    // Blocks without result: the drone (or the simulator when no controller is connected) does the action and the
    // program waits for its end.
    const action = (method) => new Sk.builtin.func(function () {
        return new Sk.misceval.promiseToSuspension(alive(api[method](...args(arguments))).then(() => Sk.builtin.none.none$));
    });

    // Blocks with a result: the fallback when the drone does not answer.
    const value = (method, fallback) => new Sk.builtin.func(function () {
        return new Sk.misceval.promiseToSuspension(alive(api[method](...args(arguments))).then(v => Sk.ffi.remapToPy(v ?? fallback)));
    });

    skykick.takeoff = action('takeoff');
    skykick.land = action('land');
    skykick.stop = action('stop');
    skykick.clear_bias = action('clearBias');
    skykick.clear_trim = action('clearTrim');
    skykick.set_headless = action('setHeadless');
    skykick.set_trim = action('setTrim');
    skykick.trim_step = action('trimStep');
    skykick.set_axis = action('setAxis');
    skykick.move_axis = action('moveAxis');
    skykick.set_quad = action('setQuad');
    skykick.move_quad = action('moveQuad');
    skykick.go = action('go');
    skykick.turn = action('turn');
    skykick.go_xyz = action('goXyz');
    skykick.go_xyz_turn = action('goXyz');
    skykick.led_off = action('ledOff');
    skykick.led_rgb = action('ledRgb');
    skykick.led_color = action('ledColor');
    skykick.led_preset = action('ledPreset');
    skykick.buzzer_stop = action('buzzerStop');
    skykick.play_note = action('playNote');
    skykick.play_hz = action('playHz');
    skykick.attitude = value('attitude', 0);
    skykick.sensor = value('sensor', 0);
    skykick.height = value('height', 0);
    skykick.position = value('position3d', 0);
    skykick.state = value('state', '');

    return skykick;
};
