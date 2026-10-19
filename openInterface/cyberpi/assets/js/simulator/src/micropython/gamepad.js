// gamepad - Makeblock Bluetooth controller module

const $builtinmodule = function (name) {

	const gamepad = {};

	gamepad.__name__ = new Sk.builtin.str('gamepad');

	// ponytail: no virtual gamepad in the simulator, keys are never pressed and joysticks stay centered
	const is_key_pressed = function (key) {
		return new Sk.builtin.bool(false);
	};
	is_key_pressed.co_varnames = ['key'];
	gamepad.is_key_pressed = new Sk.builtin.func(is_key_pressed);

	const get_joystick = function (axis) {
		return new Sk.builtin.int_(0);
	};
	get_joystick.co_varnames = ['axis'];
	gamepad.get_joystick = new Sk.builtin.func(get_joystick);

	return gamepad;
};
