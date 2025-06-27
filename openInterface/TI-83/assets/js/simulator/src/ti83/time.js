// TI-83 Premium CE - time module

var $builtinmodule = function (name) {

	var mod = {};

	mod.__name__ = new Sk.builtin.str('time');

	mod.monotonic = new Sk.builtin.func(function () {
		const elapsedSeconds = (Date.now() - Simulator.startTime) / 1000;
		return new Sk.builtin.int_(elapsedSeconds);
	});

	mod.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			if (Sk.builtin.checkNumber(delay)) {
				return Simulator.sleep_ms(Sk.ffi.remapToJs(delay) * 1000);
			} else {
				Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction sleep()", "can't convert 'int' object to str implicity", 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'duration' à la fonction sleep() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
		}
	});

	mod.struct_time = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("time.struct_time() is not yet implemented");
	});

	return mod;
};
