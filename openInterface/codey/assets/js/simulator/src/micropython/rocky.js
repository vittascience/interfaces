// Rocky - rocky module

const $builtinmodule = function () {

	const rocky = {};

	rocky.__name__ = new Sk.builtin.str('rocky');

	const setMotor = function (motor, speed, direction) {
		Simulator.Mosaic.specific.isRunning = true;
		$('#rocky-motor' + motor + '_value').html(speed);
		if (direction !== 'stop') {
			$('.rocky-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
		} else {
			Simulator.Mosaic.specific.isRunning = false;
			$('.rocky-motor' + motor).css('animation', 'none');
		}
	};

	const setMotors = function (speed_L, speed_R) {
		const direction_L = speed_L > 0 ? 'forward' : (speed_L < 0 ? 'backward' : 'stop');
		const direction_R = speed_R > 0 ? 'forward' : (speed_R < 0 ? 'backward' : 'stop');
		setMotor('Left', Math.abs(speed_L), direction_L);
		setMotor('Right', Math.abs(speed_R), direction_R);
	};

	rocky.stop = new Sk.builtin.func(function () {
		setMotors(0, 0);
		return Sk.builtin.none();
	});
	rocky.forward = new Sk.builtin.func(function (speed) {
		const _speed = Sk.ffi.remapToJs(speed);
		setMotors(_speed, _speed);
		return Sk.builtin.none();
	});
	rocky.backward = new Sk.builtin.func(function (speed) {
		const _speed = Sk.ffi.remapToJs(speed);
		setMotors(-_speed, -_speed);
		return Sk.builtin.none();
	});
	rocky.turn_right = new Sk.builtin.func(function (speed) {
		const _speed = Sk.ffi.remapToJs(speed);
		setMotors(_speed, -_speed);
		return Sk.builtin.none();
	});
	rocky.turn_left = new Sk.builtin.func(function (speed) {
		const _speed = Sk.ffi.remapToJs(speed);
		setMotors(-_speed, _speed);
		return Sk.builtin.none();
	});
	rocky.drive = new Sk.builtin.func(function (left_speed, right_speed) {
		const _left_speed = Sk.ffi.remapToJs(left_speed);
		const _right_speed = Sk.ffi.remapToJs(right_speed);
		setMotors(_left_speed, _right_speed);
		return Sk.builtin.none();
	});
	rocky_turn_right_by_degree = new Sk.builtin.func(function (degree) {
		throw new Sk.builtin.AttributeError('rocky.turn_right_by_degree() is not implemented yet');
	});
	rocky_turn_left_by_degree = new Sk.builtin.func(function (degree) {
		throw new Sk.builtin.AttributeError('rocky.turn_left_by_degree() is not implemented yet');
	});

	const color_ir_sensor = new Sk.misceval.buildClass(rocky, function ($gbl, $loc) {
		const get_red = function () {
			throw new Sk.builtin.AttributeError('color_ir_sensor.get_red() is not implemented yet');
		};
		$loc.get_red = new Sk.builtin.func(get_red);
		const get_green = function () {
			throw new Sk.builtin.AttributeError('color_ir_sensor.get_green() is not implemented yet');
		};
		$loc.get_green = new Sk.builtin.func(get_green);
		const get_blue = function () {
			throw new Sk.builtin.AttributeError('color_ir_sensor.get_blue() is not implemented yet');
		};
		$loc.get_blue = new Sk.builtin.func(get_blue);
		const is_color = function (color) {
			throw new Sk.builtin.AttributeError('color_ir_sensor.is_color() is not implemented yet');
		};
		$loc.is_color = new Sk.builtin.func(is_color);
		const set_led_color = function (color) {
			throw new Sk.builtin.AttributeError('color_ir_sensor.set_led_color() is not implemented yet');
		};
		$loc.set_led_color = new Sk.builtin.func(set_led_color);
	}, "color_ir_sensor", []);
	rocky.color_ir_sensor = new color_ir_sensor();
	rocky.color_ir_sensor.tp$init([]);

	return rocky;
};
