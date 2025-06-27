// STM32 - stm32_nec

function $builtinmodule(name) {
    const stm32_nec = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("stm32_ir_receiver", false, true),
        (stm32_ir_receiver_mod) => {
            import_modules.stm32_ir_receiver = stm32_ir_receiver_mod.$d;
        },
        () => stm32_nec_mod(stm32_nec, import_modules)
    );
};

function stm32_nec_mod(stm32_nec, import_modules) {

    var NEC_ABC = function ($gbl, $loc) {

        NEC_ABC__init__ = function (self, pin, extended, callback) {
            // Block lasts <= 80ms (extended mode) and has 68 edges
            console.log(self, pin, extended)
            // Sk.builtins.super(stm32_ir_receiver.IR_RX)
            // self._extended = extended
            // self._addr = new Sk.builtin.int_(0);
        };

        NEC_ABC__init__.co_varnames = ['self', 'pin', 'extended', 'callback'];
		NEC_ABC__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(NEC_ABC__init__);
	};

    stm32_nec.NEC_ABC = new Sk.misceval.buildClass(stm32_nec, NEC_ABC, "NEC_ABC", [import_modules.stm32_ir_receiver.IR_RX]);

    var NEC_8 = function ($gbl, $loc) {

        NEC_8__init__ = function (self, pin, callback) {
            // Block lasts <= 80ms (extended mode) and has 68 edges
            console.log(self)
            console.log(pin)
            console.log(callback)
            new Sk.builtin.super_(stm32_nec.NEC_ABC)
            console.log($loc)
        };

        NEC_8__init__.co_varnames = ['self', 'pin', 'callback'];
		NEC_8__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(NEC_8__init__);
	};

    stm32_nec.NEC_8 = new Sk.misceval.buildClass(stm32_nec, NEC_8, "NEC_8", [stm32_nec.NEC_ABC]);

    var NEC_16 = function ($gbl, $loc) {

        NEC_16__init__ = function (self, pin, callback) {
            // Block lasts <= 80ms (extended mode) and has 68 edges
            console.log(stm32_nec.NEC_ABC)
            console.log(pin)
            console.log(callback)
            //Sk.builtin.super_(stm32_nec.NEC_ABC)
        };

        NEC_16__init__.co_varnames = ['self', 'pin', 'callback'];
		NEC_16__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(NEC_16__init__);
	};

    stm32_nec.NEC_16 = new Sk.misceval.buildClass(stm32_nec, NEC_16, "NEC_16", [stm32_nec.NEC_ABC]);

    return stm32_nec;
};