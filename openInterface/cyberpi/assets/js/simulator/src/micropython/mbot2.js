// CyberPi - mbot2 module

const $builtinmodule = function () {

	const mbot2 = {};

	mbot2.__name__ = new Sk.builtin.str('mbot2');

	mbot2.__MAX_RUN_TIME = new Sk.builtin.int_(3600000); // ms
	mbot2.__MAX_CAR_ANGLE = new Sk.builtin.int_(5400);
	mbot2.__MAX_WHELL_ANGLE = new Sk.builtin.int_(10000);

	mbot2.__SECOND_TO_MS_FATCOR = new Sk.builtin.int_(1000);
	mbot2.__MAX_ACCEL_TIME = new Sk.builtin.int_(10000);
	mbot2.__MAX_DECEL_TIME = new Sk.builtin.int_(10000);
	mbot2.__DEFAULT_ACELERATION = new Sk.builtin.int_(1000);
	mbot2.__MAX_SPEED = new Sk.builtin.int_(200); // rpm
	mbot2.__DEFAULT_SPEED = new Sk.builtin.int_(50); // rpm
	mbot2.__SPEED_RPM_TO_DPS_FACTOR = new Sk.builtin.int_(6);
	mbot2.__DEFAULT_RUN_TIMS = Sk.builtin.none();
	mbot2.__DISTANCE_TO_ANGLE_FOCTOR = new Sk.builtin.float_(17.76613);
	mbot2.__ANGLE_CAR_TO_WHEEL_FACTOR = new Sk.builtin.float_(1.7862946);
	mbot2.__MAX_DISTANCE = new Sk.builtin.float_(17.76613);

	// Angle of the encoder motors (°), integrated from their speed
	const encoders = {
		Left: { angle: 0, rpm: 0, time: Date.now() },
		Right: { angle: 0, rpm: 0, time: Date.now() }
	};
	const updateEncoder = function (motor) {
		const encoder = encoders[motor];
		const now = Date.now();
		encoder.angle += encoder.rpm * 6 * (now - encoder.time) / 1000;
		encoder.time = now;
	};
	const encoderMotors = (motor) => ({ EM1: ['Left'], EM2: ['Right'] })[motor] || ['Left', 'Right'];

	const setMotor = function (rpm, motor) {
		updateEncoder(motor);
		encoders[motor].rpm = rpm;
		let direction = 'forward';
		if (rpm < 0) {
			direction = 'backward';
		}
		if (motor == 'Right') {
			if (direction == 'forward') direction = 'backward';
			else direction = 'forward';
		}
		$('#mBot2-motor' + motor + '_value').html(roundFloat(rpm, 1) + " tr/min")
		if (rpm != 0) {
			$('.mBot2-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / Math.abs(rpm)) + 's infinite linear');
		} else {
			$('.mBot2-motor' + motor).css('animation', 'none');
		}
	};

	const setMotors = function (em1, em2) {
		setMotor(em1, 'Left');
		setMotor(em2, 'Right');
	};
	RobotSimulator.robot.setMotorsInModules = setMotors;

	const forward = function (speed, duration) {
		Sk.builtin.pyCheckArgsLen("forward", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		if (Sk.builtin.checkNone(duration)) {
			setMotors(speed.v, -speed.v);
		} else {
			Sk.builtin.pyCheckType("duration", "integer or float", Sk.builtin.checkNumber(duration));
			setMotors(speed.v, -speed.v);
			return RobotSimulator.delayOnMovement(duration.v * 1000);
		}
		return Sk.builtin.none();
	};
	forward.co_varnames = ['speed', 'duration'];
	forward.$defaults = [new Sk.builtin.float_(50), Sk.builtin.none()];

	mbot2.forward = new Sk.builtin.func(forward);

	const backward = function (speed, duration) {
		Sk.builtin.pyCheckArgsLen("backward", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		if (Sk.builtin.checkNone(duration)) {
			setMotors(-speed.v, speed.v);
		} else {
			Sk.builtin.pyCheckType("duration", "integer or float", Sk.builtin.checkNumber(duration));
			setMotors(-speed.v, speed.v);
			return RobotSimulator.delayOnMovement(duration.v * 1000);
		}
		return Sk.builtin.none();
	};
	backward.co_varnames = ['speed', 'duration'];
	backward.$defaults = [new Sk.builtin.float_(50), Sk.builtin.none()];

	mbot2.backward = new Sk.builtin.func(backward);

	const straight = function (distance, speed) {
		Sk.builtin.pyCheckArgsLen("straight", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("distance", "integer or float", Sk.builtin.checkNumber(distance));
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		const rpm = speed.v;
		const movementDuration = (distance.v * 1e-2) / RobotSimulator.convertRPMtoSpeedMS(rpm);
		if (distance.v > 0) {
			setMotors(rpm, -rpm);
		} else {
			setMotors(-rpm, rpm);
		}
		const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);
		return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
			RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, distance.v);
		});
	};
	straight.co_varnames = ['distance', 'speed'];
	straight.$defaults = [new Sk.builtin.int_(10), new Sk.builtin.int_(50)];

	mbot2.straight = new Sk.builtin.func(straight);

	const turn = function (angle, speed) {
		Sk.builtin.pyCheckArgsLen("turn", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("angle", "integer or float", Sk.builtin.checkNumber(angle));
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		const rpm = speed.v;
		const movementDuration = (RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(angle.v)) / RobotSimulator.convertRPMtoSpeedMS(rpm);
		const startAngle = RobotSimulator.robot.angle;
		if (angle.v < 0) {
			setMotors(-rpm, -rpm);
		} else {
			setMotors(rpm, rpm);
		}
		return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
			RobotSimulator.robot.angle = startAngle + angle.v;
		});
	};
	turn.co_varnames = ['angle', 'speed'];
	turn.$defaults = [new Sk.builtin.int_(90), new Sk.builtin.int_(50)];

	mbot2.turn = new Sk.builtin.func(turn);

	mbot2.turn_right = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.turn_right</b> is not yet implemented");
	});

	mbot2.turn_left = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.turn_left</b> is not yet implemented");
	});

	const EM_turn = function (angle, speed, motor) {
		Sk.builtin.pyCheckArgsLen("EM_turn", arguments.length, 0, 3);
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		Sk.builtin.pyCheckType("angle", "integer or float", Sk.builtin.checkNumber(angle));
		const adaptedSpeed = angle.v / Math.abs(angle.v) * Math.abs(speed.v);
		if (Sk.builtin.checkNone(motor)) {
			Sk.builtin.pyCheckType("motor", "string", Sk.builtin.checkString(motor));
			setMotors(adaptedSpeed, -adaptedSpeed);
		} else {
			if (motor.v == 'EM1') {
				setMotor(adaptedSpeed, 'Left');
			} else if (motor.v == 'EM2') {
				setMotor(adaptedSpeed, 'Right');
			} else if (motor.v == 'ALL') {
				setMotors(adaptedSpeed, adaptedSpeed);
			}
		}
		const movementDuration = Math.abs(adaptedSpeed) / 60 * Math.abs(angle.v) / 360;
		return RobotSimulator.delayOnMovement(movementDuration * 1000);
	};
	EM_turn.co_varnames = ['angle', 'speed', 'motor'];
	EM_turn.$defaults = [new Sk.builtin.float_(360), new Sk.builtin.float_(50), Sk.builtin.none()];

	mbot2.EM_turn = new Sk.builtin.func(EM_turn);

	const EM_set_speed = function (speed, motor) {
		Sk.builtin.pyCheckArgsLen("EM_set_speed", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("speed", "integer or float", Sk.builtin.checkNumber(speed));
		if (Sk.builtin.checkNone(motor)) {
			Sk.builtin.pyCheckType("motor", "string", Sk.builtin.checkString(motor));
			setMotors(speed.v, -speed.v);
		} else {
			if (motor.v == 'EM1') {
				setMotor(speed.v, 'Left');
			} else if (motor.v == 'EM2') {
				setMotor(speed.v, 'Right');
			} else if (motor.v == 'ALL') {
				setMotors(speed.v, speed.v);
			}
		}
		return Sk.builtin.none();
	};
	EM_set_speed.co_varnames = ['speed', 'motor'];
	EM_set_speed.$defaults = [new Sk.builtin.float_(50), Sk.builtin.none()];

	mbot2.EM_set_speed = new Sk.builtin.func(EM_set_speed);

	const EM_get_speed = function (motor) {
		Sk.builtin.pyCheckArgsLen("EM_get_speed", arguments.length, 1, 1);
		if (motor.v == 'EM1') {
			const rpm = parseInt(($("#mBot2-motorLeft_value").html() || "0"));
			return new Sk.builtin.int_(rpm);
		} else if (motor.v == 'EM2') {
			const rpm = parseInt(($("#mBot2-motorRight_value").html() || "0"));
			return new Sk.builtin.int_(rpm);
		}
	};
	EM_get_speed.co_varnames = ['motor'];
	EM_get_speed.$defaults = [new Sk.builtin.str("EM1")];

	mbot2.EM_get_speed = new Sk.builtin.func(EM_get_speed);

	mbot2.drive_speed = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.drive_speed</b> is not yet implemented");
	});

	const EM_set_power = function (power, motor) {
		Sk.builtin.pyCheckArgsLen("EM_set_power", arguments.length, 0, 2);
		Sk.builtin.pyCheckType("power", "integer or float", Sk.builtin.checkNumber(power));
		const rpm = power.v / 100 * mbot2.__MAX_SPEED.v;
		if (Sk.builtin.checkNone(motor)) {
			Sk.builtin.pyCheckType("motor", "string", Sk.builtin.checkString(motor));
			setMotors(rpm, -rpm);
		} else {
			if (motor.v == 'EM1') {
				setMotor(rpm, 'Left');
			} else if (motor.v == 'EM2') {
				setMotor(rpm, 'Right');
			} else if (motor.v == 'ALL') {
				setMotors(rpm, rpm);
			}
		}
		return Sk.builtin.none();
	};
	EM_set_power.co_varnames = ['power', 'motor'];
	EM_set_power.$defaults = [new Sk.builtin.float_(50), Sk.builtin.none()];

	mbot2.EM_set_power = new Sk.builtin.func(EM_set_power);

	const EM_get_power = function (motor) {
		Sk.builtin.pyCheckArgsLen("EM_get_power", arguments.length, 0, 1);
		if (motor.v == 'EM1') {
			rpm = parseInt(($("#mBot2-motorLeft_value").html() || "0")) / mbot2.__MAX_SPEED.v * 100;
			return new Sk.builtin.int_(rpm);
		} else if (motor.v == 'EM2') {
			rpm = parseInt(($("#mBot2-motorRight_value").html() || "0")) / mbot2.__MAX_SPEED.v * 100;
			return new Sk.builtin.int_(rpm);
		}
	};
	EM_get_power.co_varnames = ['motor'];
	EM_get_power.$defaults = [new Sk.builtin.str("EM1")];

	mbot2.drive_power = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.drive_power</b> is not yet implemented");
	});

	const EM_reset_angle = function (motor) {
		for (const m of encoderMotors(Sk.ffi.remapToJs(motor))) {
			updateEncoder(m);
			encoders[m].angle = 0;
		}
		return Sk.builtin.none();
	};
	EM_reset_angle.co_varnames = ['motor'];
	EM_reset_angle.$defaults = [new Sk.builtin.str("ALL")];
	mbot2.EM_reset_angle = new Sk.builtin.func(EM_reset_angle);

	const EM_get_angle = function (motor) {
		const m = encoderMotors(Sk.ffi.remapToJs(motor))[0];
		updateEncoder(m);
		return new Sk.builtin.int_(Math.round(encoders[m].angle));
	};
	EM_get_angle.co_varnames = ['motor'];
	EM_get_angle.$defaults = [new Sk.builtin.str("EM1")];
	mbot2.EM_get_angle = new Sk.builtin.func(EM_get_angle);

	const EM_stop = function (motor) {
		Sk.builtin.pyCheckArgsLen("EM_stop", arguments.length, 0, 1);
		if (motor.v == 'EM1') {
			setMotor(0, 'Left');
		} else if (motor.v == 'EM2') {
			setMotor(0, 'Right');
		} else if (motor.v == 'ALL') {
			setMotors(0, 0);
		}
		return Sk.builtin.none();
	};
	EM_stop.co_varnames = ['motor'];
	EM_stop.$defaults = [new Sk.builtin.str("ALL")];

	mbot2.EM_stop = new Sk.builtin.func(EM_stop);

	// No external force in the simulator: a locked motor behaves like a stopped one
	const EM_lock = function (state, motor) {
		return Sk.builtin.none();
	};
	EM_lock.co_varnames = ['state', 'motor'];
	EM_lock.$defaults = [new Sk.builtin.bool(true), new Sk.builtin.str("ALL")];
	mbot2.EM_lock = new Sk.builtin.func(EM_lock);

	mbot2.num_range_scale = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.num_range_scale</b> is not yet implemented");
	});

	// motor M1 & M2

	// DC motors are not displayed in the simulator: only their power is kept
	const dcMotors = { M1: 0, M2: 0 };
	const dcMotorNames = (motor) => motor == 'M1' || motor == 'M2' ? [motor] : ['M1', 'M2'];
	const setDcPower = (motor, power) => dcMotorNames(Sk.ffi.remapToJs(motor)).forEach((m) => dcMotors[m] = Math.max(-100, Math.min(100, power(m))));

	const motor_set = function (power, motor) {
		setDcPower(motor, () => Sk.ffi.remapToJs(power));
		return Sk.builtin.none();
	};
	motor_set.co_varnames = ['power', 'motor'];
	motor_set.$defaults = [new Sk.builtin.str("all")];
	mbot2.motor_set = new Sk.builtin.func(motor_set);

	const motor_add = function (power, motor) {
		setDcPower(motor, (m) => dcMotors[m] + Sk.ffi.remapToJs(power));
		return Sk.builtin.none();
	};
	motor_add.co_varnames = ['power', 'motor'];
	motor_add.$defaults = [new Sk.builtin.str("all")];
	mbot2.motor_add = new Sk.builtin.func(motor_add);

	const motor_get = function (motor) {
		return new Sk.builtin.int_(dcMotors[dcMotorNames(Sk.ffi.remapToJs(motor))[0]]);
	};
	motor_get.co_varnames = ['motor'];
	motor_get.$defaults = [new Sk.builtin.str("M1")];
	mbot2.motor_get = new Sk.builtin.func(motor_get);

	mbot2.motor_drive = new Sk.builtin.func(function (power_m1, power_m2) {
		dcMotors.M1 = Sk.ffi.remapToJs(power_m1);
		dcMotors.M2 = Sk.ffi.remapToJs(power_m2);
		return Sk.builtin.none();
	});

	const motor_stop = function (motor) {
		setDcPower(motor, () => 0);
		return Sk.builtin.none();
	};
	motor_stop.co_varnames = ['motor'];
	motor_stop.$defaults = [new Sk.builtin.str("all")];
	mbot2.motor_stop = new Sk.builtin.func(motor_stop);

	// servo S1 S2 S3 S4

	const servo_set = function (angle, port) {
		Sk.builtin.pyCheckArgsLen("servo_set", arguments.length, 2, 2);
		Sk.builtin.pyCheckType("angle", "integer or float", Sk.builtin.checkNumber(angle));
		Sk.builtin.pyCheckType("port", "string", Sk.builtin.checkString(port));
		if (port.v == "all") {
			for (var i = 1; i < 5; i++) {
				$('#servo_S' + i + '_value').html(Math.round(angle.v % 360) + " °");
				$('#servo_S' + i + '_anim').css("transform", "rotate(" + (angle.v % 360) + "deg)");
			}
		} else {
			$('#servo_S' + port.v.replace('S', '') + '_value').html(Math.round(angle.v % 360) + " °");
			$('#servo_S' + port.v.replace('S', '') + '_anim').css("transform", "rotate(" + (angle.v % 360) + "deg)");
		}
		return Sk.builtin.none();
	}
	mbot2.servo_set = new Sk.builtin.func(servo_set);

	const servoAngle = (port) => parseInt($('#servo_S' + port.replace('S', '') + '_value').html() || "0");

	mbot2.servo_add = new Sk.builtin.func(function (angle, port) {
		Sk.builtin.pyCheckArgsLen("servo_add", arguments.length, 2, 2);
		Sk.builtin.pyCheckType("angle", "integer or float", Sk.builtin.checkNumber(angle));
		Sk.builtin.pyCheckType("port", "string", Sk.builtin.checkString(port));
		const ports = port.v == "all" ? ['1', '2', '3', '4'] : [port.v];
		for (const p of ports) {
			servo_set(new Sk.builtin.float_(servoAngle(p) + angle.v), new Sk.builtin.str(p));
		}
		return Sk.builtin.none();
	});

	mbot2.servo_get = new Sk.builtin.func(function (port) {
		Sk.builtin.pyCheckType("port", "string", Sk.builtin.checkString(port));
		return new Sk.builtin.int_(servoAngle(port.v));
	});

	mbot2.servo_drive = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.servo_drive</b> is not yet implemented");
	});

	mbot2.servo_release = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.servo_release</b> is not yet implemented");
	});

	// LED

	mbot2.led_on = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_on</b> is not yet implemented");
	});

	mbot2.led_off = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_off</b> is not yet implemented");
	});

	mbot2.led_set_bri = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_set_bri</b> is not yet implemented");
	});

	mbot2.led_add_bri = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_add_bri</b> is not yet implemented");
	});

	mbot2.led_get_bri = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_get_bri</b> is not yet implemented");
	});

	mbot2.led_move = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_move</b> is not yet implemented");
	});

	mbot2.led_show = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.led_show</b> is not yet implemented");
	});

	// pins

	mbot2.write_digital = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.write_digital</b> is not yet implemented");
	});

	mbot2.read_digital = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.read_digital</b> is not yet implemented");
	});

	mbot2.set_pwm = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.set_pwm</b> is not yet implemented");
	});

	mbot2.read_analog = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("<b>mbot2.read_analog</b> is not yet implemented");
	});

	// sub-modules

	// mbot2.starter_shield = new Sk.builtin.$builtinmodule();

	// mbot2.math = new Sk.builtin.$builtinmodule();

	return mbot2;
};
