// MicroPython - Bluetooth module

const $builtinmodule = function () {

    const bluetooth = {};

    bluetooth.__name__ = new Sk.builtin.str('bluetooth');

    bluetooth.BLE = new Sk.builtin.func(function () {
        // BT logo
        if (document.querySelector('.bt-logo') === null) {
            const i = document.createElement("i");
            i.classList.add('fa-brands');
            i.classList.add('fa-bluetooth');
            i.classList.add('bt-logo');
            document.querySelector('#pico-bluetooth > div.module-body.body-output').prepend(i);
        }
        return Sk.builtin.none();
    });

    return bluetooth;
};
