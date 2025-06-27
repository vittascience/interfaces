Simulator.Behaviours.input = Object.create(null);

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

Simulator.Behaviours.input.multichannelV2 = function () {
	var mod = Object.create(null);
	mod.data = {
		no2: 0,
		co: 0,
		c2h5oh: 0,
		voc: 0
	}
	mod['measure_NO2'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt('#multichannelV2_value_no2').html());
	});
	mod['measure_CO'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt('#multichannelV2_value_co').html());
	});
	mod['measure_C2H5OH'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt('#multichannelV2_value_c2h5oh').html());
	});
	mod['measure_VOC'] = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(parseInt('#multichannelV2_value_voc').html());
	});
	mod['calcVol'] = new Sk.builtin.func(function (value) {
		return new Sk.builtin.int_((value.v * 3.3 / READ_ANALOG_MAX_VALUE).toFixed(2));
	});
	return mod;
};

Simulator.Behaviours.input.gamepad_in = function () {
	const mod = Object.create(null);
	mod.data = {
		x: 0,
		y: 0,
		up: 0,
		down: 0,
		left: 0,
		right: 0
	};
	mod['getButton_X'] = new Sk.builtin.func(function () {
		mod.data.x = $('#mb-gamepad-X_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.x);
	});
	mod['getButton_Y'] = new Sk.builtin.func(function () {
		mod.data.y = $('#mb-gamepad-Y_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.y);
	});
	mod['getButton_UP'] = new Sk.builtin.func(function () {
		mod.data.up = $('#mb-gamepad-up_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.up);
	});
	mod['getButton_DOWN'] = new Sk.builtin.func(function () {
		mod.data.down = $('#mb-gamepad-down_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.down);
	});
	mod['getButton_LEFT'] = new Sk.builtin.func(function () {
		mod.data.left = $('#mb-gamepad-left_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.left);
	});
	mod['getButton_RIGHT'] = new Sk.builtin.func(function () {
		mod.data.right = $('#mb-gamepad-right_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.right);
	});
	return mod;
};

Simulator.Behaviours.input.gamepad_v4_in = function () {
	const mod = Object.create(null);
	mod.data = {
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		z: 0
	};
	mod['getButton_C'] = new Sk.builtin.func(function () {
		mod.data.c = $('#mb-gamepad-v4-c_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.c);
	});
	mod['getButton_D'] = new Sk.builtin.func(function () {
		mod.data.d = $('#mb-gamepad-v4-d_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.d);
	});
	mod['getButton_E'] = new Sk.builtin.func(function () {
		mod.data.e = $('#mb-gamepad-v4-e_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.e);
	});
	mod['getButton_F'] = new Sk.builtin.func(function () {
		mod.data.f = $('#mb-gamepad-v4-f_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.f);
	});
	mod['getButton_Z'] = new Sk.builtin.func(function () {
		mod.data.z = $('#mb-gamepad-v4-z_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.z);
	});
	return mod;
};

Simulator.Behaviours.input.bitplayer_in = function () {
	const mod = Object.create(null);
	mod.data = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		l: 0,
		r: 0
	};
	mod['getButton_A'] = new Sk.builtin.func(function () {
		mod.data.c = $('#mb-bitplayer-a_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.c);
	});
	mod['getButton_B'] = new Sk.builtin.func(function () {
		mod.data.c = $('#mb-bitplayer-b_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.c);
	});
	mod['getButton_C'] = new Sk.builtin.func(function () {
		mod.data.c = $('#mb-bitplayer-c_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.c);
	});
	mod['getButton_D'] = new Sk.builtin.func(function () {
		mod.data.d = $('#mb-bitplayer-d_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.d);
	});
	mod['getButton_L'] = new Sk.builtin.func(function () {
		mod.data.e = $('#mb-bitplayer-l_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.e);
	});
	mod['getButton_R'] = new Sk.builtin.func(function () {
		mod.data.f = $('#mb-bitplayer-r_value').html() == "ON" ? 0 : 1;
		return new Sk.builtin.int_(mod.data.f);
	});
	return mod;
};