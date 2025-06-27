// Galaxia - thingz module

var $builtinmodule = function () {

    var thingz = {};

    thingz.__name__ = new Sk.builtin.str('thingz');

    thingz.temperature = new Sk.builtin.func(function () {
        const t = $("#galaxia-temp_slider").slider('option', 'value');
        return new Sk.builtin.float_(t);
    });

    thingz.set_temperature_offset = new Sk.builtin.func(function (offset) {
        const t = offset.v;
        return Sk.builtin.none();
    });

    var Button = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        Button__init__ = function (self, btn) {
            self.state = false;
            self.presses = 0;
            self.last_check = 0;
            self.btn = btn.v;

            // Move the slider if a button is pressed
            const buttons = ['button_A_on', 'button_B_on'],
                events = ['mouseup', 'mousedown', 'click'];
            const board = document.getElementById("board-viewer").contentDocument;
            if (board !== null) {
                for (let i = 0; i < buttons.length; i++) {
                    const button = board.querySelector("#" + buttons[i]);
                    if (button != null) {
                        for (let j = 0; j < events.length; j++) {
                            button.addEventListener(events[j], function (e) {
                                const btn = this.id.match(/[A-Z]/)[0].toLowerCase();
                                switch (e.type) {
                                    case 'mousedown':
                                        $("#galaxia-button-" + btn + '_slider').slider('value', 1);
                                        break;
                                    case 'mouseup':
                                        $("#galaxia-button-" + btn + '_slider').slider('value', 0);
                                        break;
                                    case 'click':
                                        self.presses++;
                                        break;
                                }
                            });
                        }
                    }
                }
            }
        };

        Button__init__.co_varnames = ['self', 'btn'];
        Button__init__.$defaults = [Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(Button__init__);

        $loc.is_pressed = new Sk.builtin.func(function (self) {
            const state = $("#galaxia-button-" + self.btn + '_slider').slider('option', 'value');
            return new Sk.builtin.bool(state);
        });

        $loc.was_pressed = new Sk.builtin.func(function (self) {
            const check = self.presses > self.last_check;
            self.last_check = self.presses;
            return new Sk.builtin.bool(check);
        });

        $loc.get_presses = new Sk.builtin.func(function (self) {
            const presses = self.presses;
            self.presses = 0;
            return new Sk.builtin.int_(presses);
        });

    }, 'Button', []);

    thingz.button_a = new Button();
    thingz.button_a.tp$init([new Sk.builtin.str('a')]);

    thingz.button_b = new Button();
    thingz.button_b.tp$init([new Sk.builtin.str('b')]);

    var Radio = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.name = 'radio';
            self._rx_buffer = new Array();
        });

        $loc.on = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(true);
        });

        $loc.off = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(false);
        });

        var config = function (self, channel, power, length, group) {
            return new Sk.builtin.NotImplementedError("radio.config() is not yet implemented");
        };

        config.co_varnames = ['self', 'channel', 'power', 'length', 'group'];
        config.$defaults = [Sk.builtin.none(), new Sk.builtin.int_(7), new Sk.builtin.int_(6), new Sk.builtin.int_(32), new Sk.builtin.int_(0)];
        config.co_numargs = 2;
        $loc.config = new Sk.builtin.func(config);

        $loc.send = new Sk.builtin.func(async function (self, data) {
            if (data !== undefined) {
                function sendRadioData(buffer) {
                    const data = {
                        'timestamp': Date.now(),
                        'content': buffer
                    };
                    const multiEditorLS = localStorage.getItem('multiEditor');
                    if (multiEditorLS) {
                        const multiEditor = JSON.parse(multiEditorLS);
                        const currentEditor = multiEditor[INTERFACE_NAME][VittaInterface.id]
                        multiEditor[INTERFACE_NAME][VittaInterface.id].dateUpdated = Math.floor(new Date() / 1000);
                        if (currentEditor.radio) {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].radio['_tx_buffer'].push(data);
                        } else {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].radio = {
                                '_tx_buffer': [data]
                            };
                        }
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    } else {
                        InterfaceMonitor.writeConsole("Radio Error: no service");
                    }
                };
                sendRadioData(data.v);
                const date = new Date();
                var s;
                if (date.getSeconds() < 10) {
                    s = "0" + date.getSeconds();
                } else {
                    s = date.getSeconds();
                }
                const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
                InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par radio : '" + data.v + "'\n");
            }

        });

        $loc.receive = new Sk.builtin.func(function (self, size) {
            const getData = function (sz) {
                let size;
                if (size === undefined) {
                    size = self._rx_buffer.length;
                } else {
                    size = sz.v;
                }
                return self._rx_buffer.shift();
            };
            if (self._rx_buffer.length !== 0) {
                return new Sk.builtin.str(getData(size));
            } else {
                // Appelée pour vérifier s'il y a des messages en attente de lecture dans RX
                const multiEditorLS = localStorage.getItem('multiEditor');
                if (multiEditorLS) {
                    const multiEditor = JSON.parse(multiEditorLS);
                    const mutiEditorInterface = multiEditor[INTERFACE_NAME];
                    var validEditors = []
                    for (var id in mutiEditorInterface) {
                        if (mutiEditorInterface[id].dateUpdated && mutiEditorInterface[id].radio) {
                            validEditors.push({
                                "id": id,
                                "dateUpdated": mutiEditorInterface[id].dateUpdated,
                                "radio": mutiEditorInterface[id].radio
                            });
                        }
                    }
                    const editor = validEditors.sort(function (a, b) {
                        return b.dateUpdated - a.dateUpdated;
                    })[0];
                    if (editor !== undefined && editor.radio._tx_buffer && editor.radio._tx_buffer.length != 0) {
                        const dataArray = editor.radio._tx_buffer;
                        self._rx_buffer = dataArray.map(function (data) {
                            return data.content;
                        });
                        multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
                        multiEditor[INTERFACE_NAME][editor.id].radio = {
                            '_tx_buffer': new Array()
                        };
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        return new Sk.builtin.str(getData(size));
                    }
                } else {
                    InterfaceMonitor.writeConsole("Radio Error: no service");
                }
                return Sk.builtin.none();
            }
        });

    }, "Radio", []);

    thingz.radio = new Radio();
    thingz.radio.tp$init([]);

    return thingz;
};