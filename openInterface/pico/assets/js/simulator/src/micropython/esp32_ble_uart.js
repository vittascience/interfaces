const $builtinmodule = function () {

    const esp32_ble_uart = {};

    esp32_ble_uart.UART_BLE = new Sk.misceval.buildClass(esp32_ble_uart, function ($gbl, $loc) {

        const animation = function (type, data) {
            const pico_anim = document.querySelector('#pico-bluetooth_anim').classList;
            if (type === 'send') {
                pico_anim.remove('pico-bluetooth-receive_anim');
                pico_anim.add('pico-bluetooth-send_anim');
            } else {
                pico_anim.remove('pico-bluetooth-send_anim');
                pico_anim.add('pico-bluetooth-receive_anim');
            }
            $("#pico-bluetooth_anim").animate({
                opacity: 1,
            }, 500, function () {
                $("#pico-bluetooth_anim").animate({
                    opacity: 0,
                }, 500);
            });
            const date = new Date();
            let s;
            if (date.getSeconds() < 10) {
                s = "0" + date.getSeconds();
            } else {
                s = date.getSeconds();
            }
            const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
            InterfaceMonitor.writeConsole(strClock + " : " + data + "\n");
        };

        esp32_ble_uart__init__ = function (self, bluetooth, name) {
            self.bluetooth = bluetooth;
            self.name = name;
            self.module = Simulator.getModuleByKey('pico-bluetooth');
            document.querySelector('#pico-bluetooth > div.module-header > span.subtitle-module').innerHTML = name.v;
        };
        esp32_ble_uart__init__.co_varnames = ['self', 'bluetooth', 'name'];
        esp32_ble_uart__init__.$defaults = [new Sk.builtin.none(), new Sk.builtin.str('Pico_Vittascience')];
        $loc.__init__ = new Sk.builtin.func(esp32_ble_uart__init__);

        $loc.any = new Sk.builtin.func(function () {
            if (Simulator.serialData.length > 0 && Simulator.serialData !== '') {
                return new Sk.builtin.bool(true);
            } else {
                return new Sk.builtin.bool(false);
            }
        });

        $loc.read = new Sk.builtin.func(function (self) {
            const data = Simulator.serialData;
            Simulator.serialData = '';
            animation('receive', data);
            Simulator.setAnimator(self.module, self.module.id, data);
            return new Sk.builtin.str(data);
        });

        $loc.write = new Sk.builtin.func(function (self, data) {
            animation('send', data.v);
            Simulator.setAnimator(self.module, self.module.id, data.v);
        });

    }, "esp32_ble_uart", []);

    return esp32_ble_uart;
};
