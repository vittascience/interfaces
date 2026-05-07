// MicroPython - os module

var $builtinmodule = function () {

    var os = {};

    os.__name__ = new Sk.builtin.str('uos');

    os.uname = new Sk.builtin.func(function () {
        if (INTERFACE_NAME == 'wb55') {
            return new Sk.builtin.str("(sysname='pyboard', nodename='pyboard', release='1.17.0', version='v1.17-2-g96fbb4d73-dirty on 2021-10-11', machine='NUCLEO-WB55 with STM32WB55RGV6')")
        }
        return Sk.builtin.none();
    });

    os.urandom = new Sk.builtin.func(function (n) {
        Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 1);
        Sk.builtin.pyCheckType("n", "integer", Sk.builtin.checkInt(n));
        if (crypto) {
            return new Sk.builtin.bytes(crypto.getRandomValues(new Uint8Array(n.v)));
        }
        return Sk.builtin.none();
    });

    return os;
};
