// Codey - codey module

const $builtinmodule = function () {

	const codey = {};

	codey.__name__ = new Sk.builtin.str('codey');

	const led = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const set_red = function (self, red) {
			throw new Sk.builtin.AttributeError('led.set_red() is not implemented yet');
		};
		$loc.set_red = new Sk.builtin.func(set_red);
		const set_green = function (self, green) {
			throw new Sk.builtin.AttributeError('led.set_green() is not implemented yet');
		};
		$loc.set_green = new Sk.builtin.func(set_green);
		const set_blue = function (self, blue) {
			throw new Sk.builtin.AttributeError('led.set_blue() is not implemented yet');
		};
		$loc.set_blue = new Sk.builtin.func(set_blue);
		const show = function (self, red, green, blue) {
			throw new Sk.builtin.AttributeError('led.show() is not implemented yet');
		};
		$loc.show = new Sk.builtin.func(show);
		const off = function (self) {
			throw new Sk.builtin.AttributeError('led.off() is not implemented yet');
		};
		$loc.off = new Sk.builtin.func(off);
	}, "led", []);
	codey.led = new led();
	codey.led.tp$init([]);

	const display = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const show = function (self, text) {
			throw new Sk.builtin.AttributeError('display.show() is not implemented yet');
		};
		$loc.show = new Sk.builtin.func(show);
		const set_pixel = function (self, x, y, state) {
			throw new Sk.builtin.AttributeError('display.set_pixel() is not implemented yet');
		};
		$loc.set_pixel = new Sk.builtin.func(set_pixel);
		const get_pixel = function (self, x, y) {
			throw new Sk.builtin.AttributeError('display.get_pixel() is not implemented yet');
		};
		$loc.get_pixel = new Sk.builtin.func(get_pixel);
		const toggle_pixel = function (self, x, y) {
			throw new Sk.builtin.AttributeError('display.toggle_pixel() is not implemented yet');
		};
		$loc.toggle_pixel = new Sk.builtin.func(toggle_pixel);
		const clear = function (self) {
			throw new Sk.builtin.AttributeError('display.clear() is not implemented yet');
		};
		$loc.clear = new Sk.builtin.func(clear);
	}, "display", []);
	codey.display = new display();
	codey.display.tp$init([]);

	const button_a = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const is_pressed = function (self) {
			throw new Sk.builtin.AttributeError('button_a.is_pressed() is not implemented yet');
		};
		$loc.is_pressed = new Sk.builtin.func(is_pressed);
	}, "button_a", []);
	codey.button_a = new button_a();
	codey.button_a.tp$init([]);

	const button_b = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const is_pressed = function (self) {
			throw new Sk.builtin.AttributeError('button_b.is_pressed() is not implemented yet');
		};
		$loc.is_pressed = new Sk.builtin.func(is_pressed);
	}, "button_b", []);
	codey.button_b = new button_b();
	codey.button_b.tp$init([]);

	const button_c = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const is_pressed = function (self) {
			throw new Sk.builtin.AttributeError('button_c.is_pressed() is not implemented yet');
		};
		$loc.is_pressed = new Sk.builtin.func(is_pressed);
	}, "button_c", []);
	codey.button_c = new button_c();
	codey.button_c.tp$init([]);

	const potentiometer = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const get_value = function (self) {
			throw new Sk.builtin.AttributeError('potentiometer.get_value() is not implemented yet');
		};
		$loc.get_value = new Sk.builtin.func(get_value);
	}, "potentiometer", []);
	codey.potentiometer = new potentiometer();
	codey.potentiometer.tp$init([]);

	const ir = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const receive = function (self) {
			throw new Sk.builtin.AttributeError('ir.receive() is not implemented yet');
		};
		$loc.receive = new Sk.builtin.func(receive);
		const receive_remote_code = function (self) {
			throw new Sk.builtin.AttributeError('ir.receive_remote_code() is not implemented yet');
		};
		$loc.receive_remote_code = new Sk.builtin.func(receive_remote_code);
		const send = function (self, code) {
			throw new Sk.builtin.AttributeError('ir.send() is not implemented yet');
		};
		$loc.send = new Sk.builtin.func(send);
		const start_learning = function (self) {
			throw new Sk.builtin.AttributeError('ir.start_learning() is not implemented yet');
		};
		$loc.start_learning = new Sk.builtin.func(start_learning);
		const stop_learning = function (self) {
			throw new Sk.builtin.AttributeError('ir.stop_learning() is not implemented yet');
		};
		$loc.stop_learning = new Sk.builtin.func(stop_learning);
		const save_learned_result = function (self, index) {
			throw new Sk.builtin.AttributeError('ir.save_learned_result() is not implemented yet');
		};
		$loc.save_learned_result = new Sk.builtin.func(save_learned_result);
		const send_learned_result = function (self, index) {
			throw new Sk.builtin.AttributeError('ir.send_learned_result() is not implemented yet');
		};
		$loc.send_learned_result = new Sk.builtin.func(send_learned_result);
		const learn = function (self, time) {
			throw new Sk.builtin.AttributeError('ir.learn() is not implemented yet');
		};
		$loc.learn = new Sk.builtin.func(learn);
	}, "ir", []);
	codey.ir = new ir();
	codey.ir.tp$init([]);

	const motion_sensor = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const get_pitch = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_pitch() is not implemented yet');
		};
		$loc.get_pitch = new Sk.builtin.func(get_pitch);
		const get_roll = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_roll() is not implemented yet');
		};
		$loc.get_roll = new Sk.builtin.func(get_roll);
		const get_yaw = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_yaw() is not implemented yet');
		};
		$loc.get_yaw = new Sk.builtin.func(get_yaw);
		const get_rotation = function (self, axis) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_rotation() is not implemented yet');
		};
		$loc.get_rotation = new Sk.builtin.func(get_rotation);
		const get_acceleration = function (self, axis) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_acceleration() is not implemented yet');
		};
		$loc.get_acceleration = new Sk.builtin.func(get_acceleration);
		const get_gyroscope = function (self, axis) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_gyroscope() is not implemented yet');
		};
		$loc.get_gyroscope = new Sk.builtin.func(get_gyroscope);
		const is_tilted_right = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_tilted_right() is not implemented yet');
		};
		$loc.is_tilted_right = new Sk.builtin.func(is_tilted_right);
		const is_tilted_left = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_tilted_left() is not implemented yet');
		};
		$loc.is_tilted_left = new Sk.builtin.func(is_tilted_left);
		const is_ears_up = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_ears_up() is not implemented yet');
		};
		$loc.is_ears_up = new Sk.builtin.func(is_ears_up);
		const is_ears_down = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_ears_down() is not implemented yet');
		};
		$loc.is_ears_down = new Sk.builtin.func(is_ears_down);
		const is_display_up = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_display_up() is not implemented yet');
		};
		$loc.is_display_up = new Sk.builtin.func(is_display_up);
		const is_display_down = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_display_down() is not implemented yet');
		};
		$loc.is_display_down = new Sk.builtin.func(is_display_down);
		const is_upright = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_upright() is not implemented yet');
		};
		$loc.is_upright = new Sk.builtin.func(is_upright);
		const is_shaked = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.is_shaked() is not implemented yet');
		};
		$loc.is_shaked = new Sk.builtin.func(is_shaked);
		const get_shake_strength = function (self) {
			throw new Sk.builtin.AttributeError('motion_sensor.get_shake_strength() is not implemented yet');
		};
		$loc.get_shake_strength = new Sk.builtin.func(get_shake_strength);
	}, "motion_sensor", []);
	codey.motion_sensor = new motion_sensor();
	codey.motion_sensor.tp$init([]);

	const sound_sensor = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const get_loudness = function (self) {
			throw new Sk.builtin.AttributeError('sound_sensor.get_loudness() is not implemented yet');
		};
		$loc.get_loudness = new Sk.builtin.func(get_loudness);
	}, "sound_sensor", []);
	codey.sound_sensor = new sound_sensor();
	codey.sound_sensor.tp$init([]);

	const light_sensor = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		const get_light = function (self) {
			throw new Sk.builtin.AttributeError('light_sensor.get_light() is not implemented yet');
		};
		$loc.get_light = new Sk.builtin.func(get_light);
	}, "light_sensor", []);
	codey.light_sensor = new light_sensor();
	codey.light_sensor.tp$init([]);

	const speaker = new Sk.misceval.buildClass(codey, function ($gbl, $loc) {
		$loc.volume = Sk.ffi.remapToPy(100); // volume par défaut
		$loc.tempo = Sk.ffi.remapToPy(120); // tempo par défaut
		const play_melody = function (self, melody) {
			throw new Sk.builtin.AttributeError('speaker.play_melody() is not implemented yet');
		};
		$loc.play_melody = new Sk.builtin.func(play_melody);
		const play_melody_until_done = function (self, melody) {
			throw new Sk.builtin.AttributeError('speaker.play_melody_until_done() is not implemented yet');
		};
		$loc.play_melody_until_done = new Sk.builtin.func(play_melody_until_done);
		const play_note = function (self, note, duration) {
			throw new Sk.builtin.AttributeError('speaker.play_note() is not implemented yet');
		};
		$loc.play_note = new Sk.builtin.func(play_note);
		const play_tone = function (self, frequency, duration) {
			throw new Sk.builtin.AttributeError('speaker.play_tone() is not implemented yet');
		};
		$loc.play_tone = new Sk.builtin.func(play_tone);
		const rest = function (self, duration) {
			throw new Sk.builtin.AttributeError('speaker.rest() is not implemented yet');
		};
		$loc.rest = new Sk.builtin.func(rest);
		const stop_sounds = function (self) {
			throw new Sk.builtin.AttributeError('speaker.stop_sounds() is not implemented yet');
		};
		$loc.stop_sounds = new Sk.builtin.func(stop_sounds);
	}, "speaker", []);
	codey.speaker = new speaker();
	codey.speaker.tp$init([]);

	return codey;
};
