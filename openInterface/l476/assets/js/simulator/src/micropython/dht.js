// STM32 - dht module

var $builtinmodule = function () {

	var dht = {};

	dht.dht_readinto = new Sk.builtin.func(function (pin, buf) {
		Sk.builtin.pyCheckArgsLen("dht_readinto", arguments.length, 2, 2);
		Sk.builtin.pyCheckType("pin", "string", Sk.builtin.checkString(pin));
		Sk.builtin.pyCheckType("buf", "buffer protocol", Sk.builtin.checkBytes(buf));
		return Sk.builtin.none();
	});

	dht.DHTBase = new Sk.misceval.buildClass(dht, function ($gbl, $loc) {

		var DHTBase__init__ = function (self, pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("pin", "string", Sk.builtin.checkString(pin));
			self.pin = pin.v;
			self.buf = new Array(5);
		};

		DHTBase__init__.co_varnames = ['self', 'pin'];
		DHTBase__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(DHTBase__init__);

		$loc.measure = new Sk.builtin.func(function (self, col, row) {
			dht.dht_readinto(self.pin, buf);
		});

	});

	return dht;
};
