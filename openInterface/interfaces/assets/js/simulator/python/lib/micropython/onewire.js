// STM32 - onewire module

var $builtinmodule = function () {

	var onewire = {};

	onewire.OneWire = new Sk.misceval.buildClass(onewire, function ($gbl, $loc) {

        $loc.SEARCH_ROM = new Sk.builtin.int_(0xF0);
        $loc.MATCH_ROM = new Sk.builtin.int_(0x55);
        $loc.SKIP_ROM = new Sk.builtin.int_(0xCC);

		var OneWire__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			self.Pin = Pin;
            self.Pin.proto_ = Object.getPrototypeOf(self.Pin);
            return new Sk.builtin.none();
		};

		OneWire__init__.co_varnames = ['self', 'pin'];
		OneWire__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(OneWire__init__);

		$loc.reset = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool_(true);
		});

        $loc.readbit = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(0);
		});

        $loc.readbyte = new Sk.builtin.func(function (self) {
            return new Sk.builtin.list([]);
		});

        $loc.readinto = new Sk.builtin.func(function (self, buf) {
            return new Sk.builtin.list([]);
		});

        $loc.writebit = new Sk.builtin.func(function (self, value) {
            return new Sk.builtin.none();
		});

        $loc.writebyte = new Sk.builtin.func(function (self, value) {
            return new Sk.builtin.none();
		});

        $loc.write = new Sk.builtin.func(function (self, buf) {
            return new Sk.builtin.none();
		});

        $loc.select_rom = new Sk.builtin.func(function (self, rom) {
            return new Sk.builtin.none();
		});

        $loc.scan = new Sk.builtin.func(function (self) {
            return new Sk.builtin.list([]);
		});

        $loc._search_rom = new Sk.builtin.func(function (self, l_rom, diff) {
            return new Sk.builtin.tuple([new Sk.builtin.bytes([0, 0, 0, 0, 0, 0, 0, 0]), new Sk.builtin.int_(0)]);
		});

	});

	return onewire;
};
