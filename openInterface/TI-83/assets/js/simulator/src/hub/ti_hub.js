// Innovator Hub - ti_hub module

var $builtinmodule = function (name) {
	
	var ti_hub = {};

    ti_hub.__name__ = new Sk.builtin.str('ti_hub');
	
	ti_hub.connect = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.connect() is not yet implemented");
	});

    ti_hub.disconnect = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.disconnect() is not yet implemented");
	});

    ti_hub.set = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.set() is not yet implemented");
	});

    ti_hub.read = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.read() is not yet implemented");
	});

    ti_hub.calibrate = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.calibrate() is not yet implemented");
	});

    ti_hub.version = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.version() is not yet implemented");
	});

    ti_hub.about = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.about() is not yet implemented");
	});
	
    ti_hub.isti = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.isti() is not yet implemented");
	});

    ti_hub.what = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.what() is not yet implemented");
	});

    ti_hub.who = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.who() is not yet implemented");
	});

    ti_hub.begin = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.begin() is not yet implemented");
	});

    ti_hub.wait = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.wait() is not yet implemented");
	});

	ti_hub.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			if (Sk.builtin.checkNumber(delay)) {
				return Simulator.sleep_ms(delay.v*1000);
			} else if (Sk.builtin.checkString(delay)) {
				Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction sleep()", "can't convert 'int' object to str implicity", 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'duration' à la fonction sleep() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');

		}
	});

    ti_hub.start = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.start() is not yet implemented");
	});

    ti_hub.last_error = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.last_error() is not yet implemented");
	});

    ti_hub.get = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.get() is not yet implemented");
	});

    ti_hub.send = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.send() is not yet implemented");
	});

    ti_hub.tihubException = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_hub.tihubException() is not yet implemented");
	});

	return ti_hub;
};
