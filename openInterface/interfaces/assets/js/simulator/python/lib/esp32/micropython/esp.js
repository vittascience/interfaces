// Esp32 - esp module

var $builtinmodule = function () {

    var esp = {};

    esp.__name__ = new Sk.builtin.str('esp');

    // log constants
	esp.LOG_NONE = new Sk.builtin.int_(0);
	esp.LOG_ERROR = new Sk.builtin.int_(1);
	esp.LOG_WARNING = new Sk.builtin.int_(2);
	esp.LOG_INFO = new Sk.builtin.int_(3);
    esp.LOG_DEBUG = new Sk.builtin.int_(4);
	esp.LOG_VERBOSE = new Sk.builtin.int_(5);

    esp.osdebug = new Sk.builtin.func(function (state) {
        InterfaceMonitor.writeConsole("esp.osdebug() is not implemented in the simulator", 'interrupt');
    });

    esp.flash_read = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.flash_read() is not implemented in the simulator", 'interrupt');
    });

    esp.flash_write = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.flash_write() is not implemented in the simulator", 'interrupt');
    });

    esp.flash_erase = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.flash_erase() is not implemented in the simulator", 'interrupt');
    });

    esp.flash_size = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.flash_size() is not implemented in the simulator", 'interrupt');
    });

    esp.flash_user_start = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.flash_user_start() is not implemented in the simulator", 'interrupt');
    });

    esp.gpio_matrix_in = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.gpio_matrix_in() is not implemented in the simulator", 'interrupt');
    });

    esp.gpio_matrix_out = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.gpio_matrix_out() is not implemented in the simulator", 'interrupt');
    });

    esp.neopixel_write = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.neopixel_write() is not implemented in the simulator", 'interrupt');
    });

    esp.dht_readinto = new Sk.builtin.func(function () {
        InterfaceMonitor.writeConsole("esp.neopixel_write() is not implemented in the simulator", 'interrupt');
    });

    return esp;
};
