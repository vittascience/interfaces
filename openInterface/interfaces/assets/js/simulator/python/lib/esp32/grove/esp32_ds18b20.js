// STM32 - esp32_ds18b20 module

function $builtinmodule(name) {
    const esp32_ds18b20 = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("onewire", false, true),
        (onewire_mod) => {
            import_modules.onewire = onewire_mod.$d;
        },
        () => esp32_ds18b20_mod(esp32_ds18b20, import_modules)
    );
};

function esp32_ds18b20_mod(esp32_ds18b20, import_modules) {

	esp32_ds18b20._CONVERT = new Sk.builtin.int_(0x44);
	esp32_ds18b20._RD_SCRATCH = new Sk.builtin.int_(0xBE);
	esp32_ds18b20._WR_SCRATCH = new Sk.builtin.int_(0x4E);

	esp32_ds18b20.__name__ = new Sk.builtin.str("esp32_ds18b20");

	esp32_ds18b20.DS18X20 = new Sk.misceval.buildClass(esp32_ds18b20, function ($gbl, $loc) {

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

	return esp32_ds18b20;
};
