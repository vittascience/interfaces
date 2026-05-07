// STM32 - stm32_dht module

var $builtinmodule = function () {

	var stm32_dht = {};

	stm32_dht.__name__ = new Sk.builtin.str("stm32_dht");

	stm32_dht.DHTBase = new Sk.misceval.buildClass(stm32_dht, function ($gbl, $loc) {

		DHTBase__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (Pin !== undefined && Pin.pin) {
				self.Pin = Pin;
				self.buf = new Array(5).fill(0x00);
			}
		};

		DHTBase__init__.co_varnames = ['self', 'Pin'];
		DHTBase__init__.$defaults = [];

		$loc.measure = new Sk.builtin.func(function (self) {
		});

	}, "DHTBase", []);

	stm32_dht.DHT11 = new Sk.misceval.buildClass(stm32_dht, function ($gbl, $loc) {

		DHT11__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (Pin !== undefined && Pin.pin) {
				self.Pin = Pin;
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

	}, "DHT11", [stm32_dht.DHTBase]);

	stm32_dht.DHT22 = new Sk.misceval.buildClass(stm32_dht, function ($gbl, $loc) {

		DHT22__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			if (Pin !== undefined && Pin.pin) {
				self.Pin = Pin;
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
			const h = parseFloat($("#dht22-hum_" + self.Pin.pin + "_slider").slider('option', 'value'));
			return new Sk.builtin.float_(h);
		});

	}, "DHT22", [stm32_dht.DHTBase]);

	return stm32_dht;
};
