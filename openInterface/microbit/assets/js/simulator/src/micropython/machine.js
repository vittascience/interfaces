// BBC micro:bit - machine module

var $builtinmodule = function () {

    var machine = {};

    machine.__name__ = new Sk.builtin.str('machine');

    machine.unique_id = new Sk.builtin.func(function () {
        return new Sk.builtin.bytes([185, 224, 137, 208, 136, 197, 232]);
    });

    machine.reset = new Sk.builtin.func(function () {
        Simulator.replay();
    });

    machine.freq = new Sk.builtin.func(function () {
        return new Sk.builtin.int_(64000000);
    });

    machine.disable_irq = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("machine.disable_irq() is not yet implemented");
    });

    machine.enable_irq = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("machine.enable_irq() is not yet implemented");
    });

    machine.mem8 = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("machine.mem8() is not yet implemented");
    });

    machine.mem16 = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("machine.mem16() is not yet implemented");
    });

    machine.mem32 = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("machine.mem32() is not yet implemented");
    });

    machine.time_pulse_us = new Sk.builtin.func(function (pin, pull, timeout) {
        throw new Sk.builtin.NotImplementedError("machine.time_pulse_us() is not yet implemented");
    });

    return machine;
};
