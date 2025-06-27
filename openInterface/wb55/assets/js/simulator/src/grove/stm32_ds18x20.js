// STM32 - stm32_ds18x20 module

function $builtinmodule(name) {
    const stm32_ds18x20 = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("onewire", false, true),
        (onewire_mod) => {
            import_modules.onewire = onewire_mod.$d;
        },
        () => stm32_ds18x20_mod(stm32_ds18x20, import_modules)
    );
};

function stm32_ds18x20_mod(stm32_ds18x20, import_modules) {

	stm32_ds18x20._CONVERT = new Sk.builtin.int_(0x44);
	stm32_ds18x20._RD_SCRATCH = new Sk.builtin.int_(0xBE);
	stm32_ds18x20._WR_SCRATCH = new Sk.builtin.int_(0x4E);

	stm32_ds18x20.__name__ = new Sk.builtin.str("stm32_ds18x20");

	stm32_ds18x20.DS18X20 = new Sk.misceval.buildClass(stm32_ds18x20, function ($gbl, $loc) {

		DS18X20__init__ = function (self, ow) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (ow !== undefined) {
				self.ow = ow;
				self.ow.proto_ = Object.getPrototypeOf(self.ow);
				self.buf = new Array(9).fill(0x00);
			}
		};

		DS18X20__init__.co_varnames = ['self', 'ow'];
		DS18X20__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(DS18X20__init__);

		$loc.scan = new Sk.builtin.func(function (self) {
			//return self.ow.proto_.scan.tp$call([]);
			return new Sk.builtin.list([0x10])
		});

		$loc.convert_temp = new Sk.builtin.func(function (self) {
		});

		$loc.read_scratch = new Sk.builtin.func(function (self, rom) {
			return self.buf;
		});

		$loc.write_scratch = new Sk.builtin.func(function (self, rom, buf) {
		});

		$loc.read_temp = new Sk.builtin.func(function (self, rom) {
			const t = $("#ds18x20_" + self.ow.Pin.pin + "_slider").slider('option', 'value');
			return new Sk.builtin.float_(t);
		});

	}, "DS18X20", [import_modules.onewire.OneWire]);

	return stm32_ds18x20;
};
