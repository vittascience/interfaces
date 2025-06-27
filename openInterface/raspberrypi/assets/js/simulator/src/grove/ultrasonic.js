// ultrasonic ranger

var $builtinmodule = function (name) {
	var ultrasonic_ranger = {};

	ultrasonic_ranger.__name__ = new Sk.builtin.str('ultrasonic_ranger');

	var GroveUltrasonicRanger = function ($gbl, $loc) {

        let PIN;

		GroveUltrasonicRanger__init__ = function (self, pin) {
			Sk.builtin.pyCheckArgsLen('__init__', arguments.length, 2, 2);
			Sk.builtin.pyCheckType('pin', 'integer', Sk.builtin.checkInt(pin));
			self.pin = pin.v;
            PIN = pin.v;
		};

		GroveUltrasonicRanger__init__.co_varnames = ['self', 'pin'];

		$loc.__init__ = new Sk.builtin.func(GroveUltrasonicRanger__init__);

		$loc.get_distance = function (self) {
			const value = Simulator.getSliderValue('ultrasonic_' + PIN, "_d");
            return new Sk.builtin.float_(roundFloat(((343 * value * 1e-6) / 2) * 100, 2));
		};
	};
	ultrasonic_ranger.GroveUltrasonicRanger = new Sk.misceval.buildClass(ultrasonic_ranger, GroveUltrasonicRanger, 'GroveUltrasonicRanger', []);

	return ultrasonic_ranger;
};
