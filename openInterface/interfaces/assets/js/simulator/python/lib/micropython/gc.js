// MicroPython - gc module

var $builtinmodule = function () {

    var gc = {};

    gc.__name__ = new Sk.builtin.str('gc');

    gc.collect = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.collect() is not implemented in the simulator", 'interrupt');
    });

    gc.disable = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.disable() is not implemented in the simulator", 'interrupt');
    });

    gc.enable = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.enable() is not implemented in the simulator", 'interrupt');
    });

    gc.isenabled = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.isenabled() is not implemented in the simulator", 'interrupt');
    });

    gc.mem_free = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.mem_free() is not implemented in the simulator", 'interrupt');
        return new Sk.builtin.int_(1);
    });

    gc.mem_alloc = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.mem_alloc() is not implemented in the simulator", 'interrupt');
    });

    gc.threshold = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("gc.threshold() is not implemented in the simulator", 'interrupt');
    });

    return gc;
};
