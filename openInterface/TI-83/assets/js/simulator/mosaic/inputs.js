Simulator.Behaviours.input = Object.create(null);

/**
 * External IO
 */

Simulator.Behaviours.input.serialInput = function () {
	var mod = Object.create(null);
	mod.data = {
		dataReceived: false,
		incomingData: ''
	}
	mod['dataAvailable'] = new Sk.builtin.func(function () {
		if (Simulator.serialData != '') {
			mod.data.dataReceived = true;
			return new Sk.builtin.bool(mod.data.dataReceived);
		} else {
			mod.data.dataReceived = false;
			return new Sk.builtin.bool(mod.data.dataReceived);
		}
	});
	mod['readData'] = new Sk.builtin.func(function () {
		mod.data.incomingData = Simulator.serialData;
		return new Sk.builtin.str(mod.data.incomingData);
	});
	return mod;
};

Simulator.Behaviours.input.microphone = function () {
	var mod = Object.create(null);
	mod.data = {
		sound_level: 0,
		wasLoud: false,
		wasQuiet: false,
		loudThresh: 128,
		quietThresh: 0
	}
	mod['LOUD'] = new Sk.builtin.str("loud");
	mod['QUIET'] = new Sk.builtin.str("quiet");
	mod['current_sound'] = new Sk.builtin.func(function () {
		mod.data.sound_level = parseInt($('#mb-micro_slider').slider('option', 'value'));
		if (mod.data.sound_level >= mod.data.loudThresh) {			
			return new Sk.builtin.str("loud");
		} else if (mod.data.sound_level >= mod.data.quietThresh) {
			return new Sk.builtin.str("quiet");
		} else {
			// TODO: test micro:bit microphone to define this condition.
			return new Sk.builtin.str("none");
		}
	});
	mod['was_sound'] = new Sk.builtin.func(function (state) {
		mod.data.sound_level = parseInt($('#mb-micro_slider').slider('option', 'value'));
		let was = state.v == "loud" ? mod.data.wasLoud : mod.data.wasQuiet;
		mod.data.wasLoud = false;
		mod.data.wasQuiet = false;
		return new Sk.builtin.bool(was);
	});
	mod['set_threshold'] = new Sk.builtin.func(function (state, threshold) {
		mod.data.loudThresh = state == mod['LOUD'] ? threshold.v : mod.data.loudThresh;
		mod.data.quietThresh = state == mod['QUIET'] ? threshold.v : mod.data.quietThresh;
	});
	mod['sound_level'] = new Sk.builtin.func(function () {
		mod.data.sound_level = parseInt($('#mb-micro_slider').slider('option', 'value'));
		return new Sk.builtin.int_(mod.data.sound_level);
	});
	return mod;
};

/**
 * Inputs - Micro:bit sensors
 */

Simulator.Behaviours.input.light = function () {
	var mod = Object.create(null);
	mod['read_light_level'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($("#mb-light_value").html()));
	});
	return mod;
};

Simulator.Behaviours.input.thermometer = function () {
	var mod = Object.create(null);
	mod['readTemp'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($('#mb-thermometer_value').html()));
	});
	return mod;
};

Simulator.Behaviours.input.compass = function () {
	var mod = Object.create(null);
	mod.data = {
		calibrated: false,
	};
	mod['calibrate'] = new Sk.builtin.func(function () {
		mod.data.calibrated = true;
	});
	mod['is_calibrated'] = new Sk.builtin.func(function () {
		return new Sk.builtin.bool(mod.data.calibrated);
	});
	mod['clear_calibration'] = new Sk.builtin.func(function () {
		mod.data.calibrated = false;
	});
	mod['get_x'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($("#mb-compassMag_slider_x").slider('option', 'value')));
	});
	mod['get_y'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($("#mb-compassMag_slider_y").slider('option', 'value')));
	});
	mod['get_z'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($("#mb-compassMag_slider_z").slider('option', 'value')));
	});
	mod['get_field_strength'] = new Sk.builtin.func(function () {
		// TO DO
		return new Sk.builtin.int_(0);
	});
	mod['heading'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt($("#mb-compassDir_slider").slider('option', 'value')));
	});
	return mod;
};