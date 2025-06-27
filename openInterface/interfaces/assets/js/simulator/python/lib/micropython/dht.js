// MicroPython - dht module

var $builtinmodule = function (name) {

	var dht = {};

	dht.__name__ = new Sk.builtin.str("dht");

	dht.DHTBase = new Sk.misceval.buildClass(dht, function ($gbl, $loc) {

		DHTBase__init__ = function (self) {
		};

		DHTBase__init__.co_varnames = ['self'];
		DHTBase__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(DHTBase__init__);

		$loc.measure = new Sk.builtin.func(function (self) {
			return new Sk.builtin.bool(true);
		});

	}, 'DHTBase', []);

	dht.dht_readinto = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("dht.dht_readinto() is not yet implemented");
	});

	dht.DHT11 = new Sk.misceval.buildClass(dht, function ($gbl, $loc) {

		DHT11__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (Pin !== undefined && Pin.hasOwnProperty('pin') && typeof Pin.pin != 'undefined') {
				self.Pin = Pin;
			} else {
				// TODO: print argument error
			}
		};

		DHT11__init__.co_varnames = ['self', 'Pin'];
		DHT11__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(DHT11__init__);

		$loc.temperature = new Sk.builtin.func(function (self) {
			const t = parseFloat($("#dht11-temp_" + self.Pin.pin + "_slider").slider('option', 'value'));
			return new Sk.builtin.float_(t);
		});

		$loc.humidity = new Sk.builtin.func(function (self) {
			const h = parseFloat($("#dht11-hum_" + self.Pin.pin + "_slider").slider('option', 'value'));
			return new Sk.builtin.float_(h);
		});

	}, 'DHT11', [dht.DHTBase]);

	dht.DHT22 = new Sk.misceval.buildClass(dht, function ($gbl, $loc) {

		DHT22__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (Pin !== undefined && Pin.hasOwnProperty('pin') && typeof Pin.pin != 'undefined' ) {
				self.Pin = Pin;
			} else {
				// TODO: print argument error
			}
		};

		DHT22__init__.co_varnames = ['self', 'Pin'];
		DHT22__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(DHT22__init__);

		$loc.temperature = new Sk.builtin.func(function (self) {
			const t = parseFloat($("#dht22-temp_" + self.Pin.pin + "_slider").slider('option', 'value'));
			return new Sk.builtin.float_(t);
		});

		$loc.humidity = new Sk.builtin.func(function (self) {
			const h = parseFloat($("#dht2-hum_" + self.Pin.pin + "_slider").slider('option', 'value'));
			return new Sk.builtin.float_(h);
		});

	}, 'DHT22', [dht.DHTBase]);

	return dht;
};
