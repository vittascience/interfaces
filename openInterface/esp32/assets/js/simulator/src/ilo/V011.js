
const $builtinmodule = function () {
	const V011 = {};
	V011.__name__ = new Sk.builtin.str('V011');
	Simulator.cancelPromisesSimulator = false;
	let simulatorIsRunning = false;
	Simulator.Robot3DEnabled = true;

	// changed board iamge and open board if closed
	const boardToggled = document.getElementById('simulator-board-toggler');
	const boardLink = 'ilo-board-front.svg';
	$("#board-viewer").attr("data", _PATH + "/" + INTERFACE_NAME + "/assets/media/simulator/board/" + boardLink);
	if (boardToggled.classList.contains('closed')) {
		Simulator.toggleBoardDisplay();
	}

	const MAX_SPEED = 250;
	const SPEED_RPM = 70;
	let LED_CAPTOR = true;

	const simulator3D = window.Simulator3D;
	const checkReady = async () => {
		return new Promise((resolve) => {
			let READY = simulator3D.checkIsReady();
			if (READY) {
				simulator3D.resetPosition();
				clearInterval(simulator3D.intervalMoveCommande);
				resolve();
			} else {
				setTimeout(() => {
					checkReady();
				}, 300);
			}
		});
	};

	simulator3D.mecanumWheelCompute = {
		FR_wheel: { speed: 0, direction: 0 },
		FL_wheel: { speed: 0, direction: 0 },
		BR_wheel: { speed: 0, direction: 0 },
		BL_wheel: { speed: 0, direction: 0 },
	};

	// simulator3D.updateLEDColor();
	simulator3D.initLEDSystem();

	checkReady();

	// simulator3D.resetPosition();

	const setMotor = (motor, dir, speed) => {
		try {
			$('#ilo-motor' + motor + '_value').html(roundFloat(speed / MAX_SPEED * 100, 1) + " %");
			if (speed != 0) {
				$('.ilo-motor' + motor).css('animation', `rotation-${dir} ${(60 / (speed / MAX_SPEED * 100))}s infinite linear`);
			} else {
				$('.ilo-motor' + motor).css('animation', 'none');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const setMotorFrontLeft = (speed) => {
		if (speed >= 0 && speed <= MAX_SPEED) {
			setMotor('FrontLeft', 'forward', speed);
		} else {
			setMotor('FrontLeft', 'backward', -speed);
		}
	};

	const setMotorFrontRight = (speed) => {
		if (speed >= 0 && speed <= MAX_SPEED) {
			setMotor('FrontRight', 'forward', speed);
		} else {
			setMotor('FrontRight', 'backward', -speed);
		}
	};

	const setMotorBackLeft = (speed) => {
		if (speed >= 0 && speed <= MAX_SPEED) {
			setMotor('BackLeft', 'forward', speed);
		} else {
			setMotor('BackLeft', 'backward', -speed);
		}
	};

	const setMotorBackRight = (speed) => {
		if (speed >= 0 && speed <= MAX_SPEED) {
			setMotor('BackRight', 'forward', speed);
		} else {
			setMotor('BackRight', 'backward', -speed);
		}
	};

	const setMotorDirection = (direction, speed) => {
		simulator3D.setLedShape(direction);
		switch (direction) {
			case 'front':
				setMotorFrontLeft(speed);
				setMotorFrontRight(speed);
				setMotorBackLeft(speed);
				setMotorBackRight(speed);
				break;
			case 'back':
				setMotorFrontLeft(-speed);
				setMotorFrontRight(-speed);
				setMotorBackLeft(-speed);
				setMotorBackRight(-speed);
				break;
			case 'left':
				setMotorFrontLeft(-speed);
				setMotorBackRight(-speed);
				setMotorFrontRight(speed);
				setMotorBackLeft(speed);
				break;
			case 'right':
				setMotorFrontLeft(speed);
				setMotorBackRight(speed);
				setMotorFrontRight(-speed);
				setMotorBackLeft(-speed);
				break;
			case 'rot_trigo':
				setMotorFrontLeft(-speed);
				setMotorFrontRight(speed);
				setMotorBackLeft(-speed);
				setMotorBackRight(speed);
				break;
			case 'rot_clock':
				setMotorFrontLeft(speed);
				setMotorFrontRight(-speed);
				setMotorBackLeft(speed);
				setMotorBackRight(-speed);
				break;
		}
	};

	const stopMotors = () => {
		setMotorFrontLeft(0);
		setMotorFrontRight(0);
		setMotorBackLeft(0);
		setMotorBackRight(0);
		simulator3D.stopMotors();
	};

	const set_led_color = function (r, g, b) {
		const r_ = Sk.ffi.remapToJs(r),
			g_ = Sk.ffi.remapToJs(g),
			b_ = Sk.ffi.remapToJs(b);
		simulator3D.updateLEDColor(r_/255, g_/255, b_/255);
		return Sk.builtin.none();
	};
	V011.set_led_color = new Sk.builtin.func(set_led_color);

	const set_led_shape = function (shape) {		
		simulator3D.setLedShape(shape.v);
		return Sk.builtin.none();
	};
	V011.set_led_shape = new Sk.builtin.func(set_led_shape);

	const set_led_anim = function (anim) {
		UIManager.showErrorMessage('error-message', "set_led_anim(anim) is not yet implemented");
		return Sk.builtin.none();
	};
	V011.set_led_anim = new Sk.builtin.func(set_led_anim);

	const set_led_single = function (type, id, red, green, blue) {
		UIManager.showErrorMessage('error-message', "set_led_single(type, id, red, green, blue) is not yet implemented");
		return Sk.builtin.none();
	};
	V011.set_led_single = new Sk.builtin.func(set_led_single);

	const step = function (direction, distance) {
		let direction_ = Sk.ffi.remapToJs(direction);
		const steps = Sk.ffi.remapToJs(distance);
		let angle = null;
		setMotorDirection(direction_, SPEED_RPM);
		switch (direction_) {
			case 'front':
				direction_ = 'forward';
				break;
			case 'back':
				direction_ = 'backward';
				break;
			case 'rot_trigo':
				direction_ = 'ccw';
				angle = 90;
				break;
			case 'rot_clock':
				direction_ = 'cw';
				angle = 90;
				break;
		}
		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (Simulator.cancelPromisesSimulator) {
					return Sk.builtin.none();
				}
				if (angle !== null) {
					if (simulator3D.physics){
						await simulator3D.physics.moveStep(angle, direction_, steps);
					} else {
						await simulator3D.rotateCommand(angle, direction_, steps);
					}
				} else {
					if (simulator3D.physics){
						await simulator3D.physics.moveStep(angle, direction_, steps);
					} else {
						await simulator3D.moveCommand(direction_, steps);
					}
				}
				stopMotors();
				simulatorIsRunning = false;
				resolve(Sk.builtin.none());
			})
		);
	};
	step.co_varnames = ['direction', 'distance'];
	step.$defaults = [new Sk.builtin.str("front"), new Sk.builtin.int_(1)];
	V011.step = new Sk.builtin.func(step);

	const move = function (direction, speed) {
		const direction_ = Sk.ffi.remapToJs(direction);
		const speed_ = Sk.ffi.remapToJs(speed);
		const acc = 100;
		setMotorDirection(direction_, MAX_SPEED * (speed_ / 100));
		switch (direction_) {
			case 'front':
				// simulator3D.physics.move("front", speed);
				drive_single_motor_speed_front_left(100, speed_);
				drive_single_motor_speed_front_right(100, speed_);
				drive_single_motor_speed_back_left(100, speed_);
				drive_single_motor_speed_back_right(100, speed_);
				break;
			case 'back':
				// speed.v = -speed.v;
				// simulator3D.physics.move("back", -speed);
				drive_single_motor_speed_front_left(100, -speed_);
				drive_single_motor_speed_front_right(100, -speed_);
				drive_single_motor_speed_back_left(100, -speed_);
				drive_single_motor_speed_back_right(100, -speed_);
				break;
			case 'right':
				// simulator3D.physics.move("right", speed);
				drive_single_motor_speed_front_right(100, -speed_);
				drive_single_motor_speed_back_left(100, -speed_);
				// speed.v = -speed.v;
				drive_single_motor_speed_back_right(100, speed_);
				drive_single_motor_speed_front_left(100, speed_);
				break;
			case 'left':
				// simulator3D.physics.move("left", speed);
				drive_single_motor_speed_back_right(100, -speed_);
				drive_single_motor_speed_front_left(100, -speed_);
				// speed.v = -speed.v;
				drive_single_motor_speed_front_right(100, speed_);
				drive_single_motor_speed_back_left(100, speed_);
				break;
			case 'rot_trigo':
				// simulator3D.physics.move("rot_trigo", speed);
				drive_single_motor_speed_front_left(100, -speed_);
				drive_single_motor_speed_back_left(100, -speed_);
				// speed.v = -speed.v;
				drive_single_motor_speed_front_right(100, speed_);
				drive_single_motor_speed_back_right(100, speed_);
				break;
			case 'rot_clock':
				// simulator3D.physics.move("rot_clock", speed);
				drive_single_motor_speed_front_right(100, -speed_);
				drive_single_motor_speed_back_right(100, -speed_);
				// speed.v = -speed.v;
				drive_single_motor_speed_front_left(100, speed_);
				drive_single_motor_speed_back_left(100, speed_);
				break;
		}
		return Sk.builtin.none();
	};
	V011.move = new Sk.builtin.func(move);

	const rotation = function (angle) {
		UIManager.showErrorMessage('error-message', "rotation(angle) is not yet implemented");
		return Sk.builtin.none();
	};
	V011.rotation = new Sk.builtin.func(rotation);

	const drive_single_motor_speed_front_left = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('FL_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics){
			simulator3D.physics.frontLeftSpeed = speed_/10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorFrontLeft(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	V011.drive_single_motor_speed_front_left = new Sk.builtin.func(drive_single_motor_speed_front_left);

	const drive_single_motor_speed_front_right = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('FR_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics){
			simulator3D.physics.frontRightSpeed = speed_/10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorFrontRight(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	V011.drive_single_motor_speed_front_right = new Sk.builtin.func(drive_single_motor_speed_front_right);

	const drive_single_motor_speed_back_left = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('BL_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics){
			simulator3D.physics.backLeftSpeed = speed_/10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorBackLeft(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	V011.drive_single_motor_speed_back_left = new Sk.builtin.func(drive_single_motor_speed_back_left);

	const drive_single_motor_speed_back_right = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('BR_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics){
			simulator3D.physics.backRightSpeed = speed_/10;
		} else {
			clearInterval(simulator3D.intervalMoveCommande);
			simulator3D.moveKinematic();
		}
		setMotorBackRight(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	V011.drive_single_motor_speed_back_right = new Sk.builtin.func(drive_single_motor_speed_back_right);

	const set_led_captor = function (state) {
		return Sk.builtin.none();
	};
	V011.set_led_captor = new Sk.builtin.func(set_led_captor);


	const getColorRGB =  (sensor) => {
		const rgbColor = simulator3D.rgbTextureValue[sensor];
		const rgbValues = { "r": Number(rgbColor.r), "g": Number(rgbColor.g), "b": Number(rgbColor.b) };
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["r"], '_r');
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["g"], '_g');
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["b"], '_b');
		return rgbColor;
	};


	V011.get_color_rgb_center = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(1);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	V011.get_color_rgb_right = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(2);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	V011.get_color_rgb_left = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(0);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	V011.get_color_clear_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		if (LED_CAPTOR){
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 +120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	V011.get_color_clear_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		if (LED_CAPTOR){
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 +120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	V011.get_color_clear_center = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		if (LED_CAPTOR){
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 +120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	V011.get_color_clear = new Sk.builtin.func(() => {
		const rgbColorCenter = simulator3D.rgbTextureValue[1];
		const rgbColorLeft = simulator3D.rgbTextureValue[0];
		const rgbColorRight = simulator3D.rgbTextureValue[2];
		if (LED_CAPTOR){
			const intensity = ((rgbColorCenter.r + rgbColorCenter.g + rgbColorCenter.b) *2.2 +120 +
				(rgbColorLeft.r + rgbColorLeft.g + rgbColorLeft.b) * 2.2 +120 +
				(rgbColorRight.r + rgbColorRight.g + rgbColorRight.b) * 2.2 +120) / 3;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = ((rgbColorCenter.r + rgbColorCenter.g + rgbColorCenter.b) * 0.39 +
				(rgbColorLeft.r + rgbColorLeft.g + rgbColorLeft.b) * 0.39 +
				(rgbColorRight.r + rgbColorRight.g + rgbColorRight.b) * 0.39) / 3;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});
	


	V011.get_line_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$("#ilo-finderRight" + "_slider_v").slider('value', 1);

			return new Sk.builtin.int_(1);
		} else {
			$("#ilo-finderRight" + "_slider_v").slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	V011.get_line_middle = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$("#ilo-finderMiddle" + "_slider_v").slider('value', 1);
			return new Sk.builtin.int_(1);
		} else {
			$("#ilo-finderMiddle" + "_slider_v").slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	V011.get_line_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$("#ilo-finderLeft" + "_slider_v").slider('value', 1);
			return new Sk.builtin.int_(1);
		} else {
			$("#ilo-finderLeft" + "_slider_v").slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	const set_line_threshold_value = function (threshold) {
		UIManager.showErrorMessage('error-message', "set_line_threshold_value(threshold) is not yet implemented");
		return Sk.builtin.none();
	};
	V011.set_line_threshold_value = new Sk.builtin.func(set_line_threshold_value);

	V011.get_distance_front = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceFront')));
	});

	V011.get_distance_back = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceBack')));
	});

	V011.get_distance_left = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceLeft')));
	});

	V011.get_distance_right = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceRight')));
	});

	V011.stop = new Sk.builtin.func(() => {
		let count = 0;
		const stopInterval = setInterval(() => {
			if (count == 3){
				simulator3D.setLedShape('ring_1');
			}
			else if (count % 2 == 0){
				simulator3D.setLedShape('stop');
				count++;
			} else {
				simulator3D.setLedShape('ring_1');
				count++;
			}
		}, 300);
		if (simulator3D.physics){
			simulator3D.physics.stop();
		} else {
			simulator3D.stopMotors();
		}
		stopMotors();
	});

	return V011;
};
