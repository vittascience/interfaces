// TI-83 & micro:bit - mb_pins module

var $builtinmodule = function (name) {

    var mb_pins = {};

    mb_pins.__name__ = new Sk.builtin.str("mb_pins");

    var MicrobitPin = function ($gbl, $loc) {
        
        MicrobitPin__init__ = function (self, name) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
            self.name = name.v;
            self.state = 0;
            self.value = 0;
			const component = Simulator.pinList.find((component) => {
                if (component.pin == self.name) {
                    return component;
                }
            });
            if (component !== undefined) {
                self.id = component.id;
                self.module = Simulator.getModuleByKey(self.id.replace('_' + self.name, ''));
            }
        };

        MicrobitPin__init__.co_varnames = ['self', 'name'];
        MicrobitPin__init__.$defaults = [Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(MicrobitPin__init__);

        $loc.read_digital = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.state);
        });

        $loc.write_digital = new Sk.builtin.func(function (self, state) {
            self.state = state.v ? 1 : 0;
            Simulator.setAnimator(self.module, self.id, self.state);
            return Sk.builtin.none();
        });

        $loc.read_analog = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.value);
        });

        $loc.write_analog = new Sk.builtin.func(function (self, value) {
            self.value = value.v;
            Simulator.setAnimator(self.module, self.id, self.value);
            return Sk.builtin.none();
        });

        $loc.set_analog_period = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v * 1000;
            return Sk.builtin.none();
		});

    };

    mb_pins.MicrobitPin = new Sk.misceval.buildClass(mb_pins, MicrobitPin, "MicrobitPin", []);    

    mb_pins.pin0 = new mb_pins.MicrobitPin();
    mb_pins.pin0.tp$init([new Sk.builtin.str('P0')]);

    mb_pins.pin1 = new mb_pins.MicrobitPin();
    mb_pins.pin1.tp$init([new Sk.builtin.str('P1')]);

    mb_pins.pin2 = new mb_pins.MicrobitPin();
    mb_pins.pin2.tp$init([new Sk.builtin.str('P2')]);

    mb_pins.pin8 = new mb_pins.MicrobitPin();
    mb_pins.pin8.tp$init([new Sk.builtin.str('P8')]);

    mb_pins.pin13 = new mb_pins.MicrobitPin();
    mb_pins.pin13.tp$init([new Sk.builtin.str('P13')]);

    mb_pins.pin14 = new mb_pins.MicrobitPin();
    mb_pins.pin14.tp$init([new Sk.builtin.str('P14')]);

    mb_pins.pin15 = new mb_pins.MicrobitPin();
    mb_pins.pin15.tp$init([new Sk.builtin.str('P15')]);

    mb_pins.pin16 = new mb_pins.MicrobitPin();
    mb_pins.pin16.tp$init([new Sk.builtin.str('P16')]);

    mb_pins.pin_speaker = new mb_pins.MicrobitPin();
    mb_pins.pin_speaker.tp$init([new Sk.builtin.str('PIN_SPEAKER')]);

    return mb_pins;
};