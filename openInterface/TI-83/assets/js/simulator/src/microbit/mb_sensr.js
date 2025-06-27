// TI-83 & micro:bit - mb_sensr module

var $builtinmodule = function(name)
{
    var mb_sensr = {};

	var Accelerometer = new Sk.misceval.buildClass(mb_sensr, function ($gbl, $loc) {

		const getValue = function (data) {
			return $("#mb-accelerometer_slider_" + data).slider('option', 'value');
		};

		$loc.__init__ = new Sk.builtin.func(function (self) {
			Simulator.Mosaic.specific.gesture.init();
		});

		$loc.get_x = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("x"));
		});

		$loc.get_y = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("y"));
		});

		$loc.get_z = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("z"));
		});

		$loc.get_pitch = new Sk.builtin.func(function (self) {
			const pitch = parseInt($("#mb-accelerometer-pitch_slider").slider('option', 'value'));
			return new Sk.builtin.int_(pitch);
		});

		$loc.get_roll = new Sk.builtin.func(function (self) {
			const roll = parseInt($("#mb-accelerometer-roll_slider").slider('option', 'value'));
			return new Sk.builtin.int_(roll);
		});

		$loc.get_values = new Sk.builtin.func(function (self) {
			return new Sk.builtin.tuple([getValue("x"), getValue("y"), getValue("z")]);
		});

		$loc.current_gesture = new Sk.builtin.func(function (self) {
			const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
			if (currentGesture !== null) {
				return new Sk.builtin.str(currentGesture);
			}
			return Sk.builtin.none();
		});

		$loc.is_gesture = new Sk.builtin.func(function (self, gesture) {
			const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
			if (currentGesture !== null && currentGesture === gesture.v) {
				return new Sk.builtin.bool(true);
			}
			return new Sk.builtin.bool(false);
		});

		$loc.was_gesture = new Sk.builtin.func(function (self, gesture) {
			for (var i = 0; i < Simulator.Mosaic.specific.gesture.history.length; i++) {
				if (Simulator.Mosaic.specific.gesture.history[i] === gesture.v) {
					Simulator.Mosaic.specific.gesture.history.splice(i, 1);
					return new Sk.builtin.bool(true);
				}
			}
			return new Sk.builtin.bool(false);
		});

		$loc.get_magnitude = new Sk.builtin.func(function () {
			throw new Sk.builtin.NotImplementedError("accelerometer.get_magnitude() is not yet implemented");
		});

	}, "Accelerometer", []);

	mb_sensr.accelerometer = new Accelerometer();
	mb_sensr.accelerometer.tp$init();

    return mb_sensr;
};