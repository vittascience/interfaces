// runloop module for LEGO® Education SPIKE™ Prime (the program is run directly, see code_friendly.js)

const $builtinmodule = function () {

    const runloop = {};
    runloop.__name__ = new Sk.builtin.str("runloop");

    runloop.sleep_ms = new Sk.builtin.func(function (delay) {
        Sk.builtin.pyCheckArgsLen("sleep_ms", arguments.length, 1, 1);
        return Simulator.sleep_ms(Sk.ffi.remapToJs(delay));
    });

    return runloop;
};
