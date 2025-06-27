// Esp32 - esp32 module

var $builtinmodule = function (name) {
	
	var esp32 = {};

	esp32.__name__ = new Sk.builtin.str('esp32');

	// wake up constants
	esp32.WAKEUP_ALL_LOW = new Sk.builtin.bool(false);
	esp32.WAKEUP_ANY_HIGH = new Sk.builtin.bool(true);
	// heap constants
	esp32.HEAP_DATA = new Sk.builtin.int_(4);
	esp32.HEAP_EXEC = new Sk.builtin.int_(1);
	
	esp32.wake_on_touch = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("esp32.wake_on_touch() is not yet implemented");
	});

    esp32.wake_on_ext0 = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("esp32.wake_on_ext0() is not yet implemented");
	});

    esp32.wake_on_ext1 = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("esp32.wake_on_ext1() is not yet implemented");
	});

    esp32.raw_temperature = new Sk.builtin.func(function () {
		const t_fah = $('#esp32-rawTemp_slider_fah').slider('option', 'value');
		return new Sk.builtin.int_(t_fah);
	});
	
	esp32.hall_sensor = new Sk.builtin.func(function () {
		const mag = $('#esp32-hallMag_slider').slider('option', 'value');
		return new Sk.builtin.int_(mag);
	});

	esp32.id_heap_info = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("esp32.id_heap_info() is not yet implemented");
	});

	esp32.NVS = new Sk.misceval.buildClass(esp32, function($gbl, $loc) {

		NVS__init__ = function (self) {
		};

		NVS__init__.co_varnames = ['self'];
		NVS__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(NVS__init__);

		$loc.get_i32 = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].get_i32() is not yet implemented");
		});

		$loc.set_i32 = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].set_i32() is not yet implemented");
		});

		$loc.get_blob = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].get_blob() is not yet implemented");
		});

		$loc.set_blob = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].set_blob() is not yet implemented");
		});

		$loc.erase_key = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].erase_key() is not yet implemented");
		});

		$loc.commit = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[nvs].commit() is not yet implemented");
		});
	});

	esp32.Partition = new Sk.misceval.buildClass(esp32, function($gbl, $loc) {

		Partition__init__ = function (self) {
		};

		Partition__init__.co_varnames = ['self'];
		Partition__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(Partition__init__);

		// TODO: ...
	});

	esp32.RMT = new Sk.misceval.buildClass(esp32, function($gbl, $loc) {

		// memory
		$loc.RESERVE_MEM = new Sk.builtin.int_(512);

		RMT__init__ = function (self) {
		};

		RMT__init__.co_varnames = ['self'];
		RMT__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(RMT__init__);

		Sk.builtin.del = function (self) {
		};

		$loc.__del__ = new Sk.builtin.func(Sk.builtin.del);

		$loc.deinit = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].deinit() is not yet implemented");
		});

		$loc.source_freq = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].source_freq() is not yet implemented");
		});

		$loc.clock_div = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].clock_div() is not yet implemented");
		});

		$loc.wait_done = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].wait_done() is not yet implemented");
		});

		$loc.loop = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].loop() is not yet implemented");
		});

		$loc.write_pulses = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[rmt].write_pulses() is not yet implemented");
		});
	});

	esp32.ULP = new Sk.misceval.buildClass(esp32, function($gbl, $loc) {

		// memory
		$loc.RESERVE_MEM = new Sk.builtin.int_(512);

		ULP__init__ = function (self) {
		};

		ULP__init__.co_varnames = ['self'];
		ULP__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(ULP__init__);

		$loc.set_wakeup_period = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[ulp].set_wakeup_period() is not yet implemented");
		});

		$loc.load_binary = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[ulp].load_binary() is not yet implemented");
		});

		$loc.run = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("[ulp].run() is not yet implemented");
		});
	});

	return esp32;
};
