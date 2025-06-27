// STM32 - stm32_donutbot module

const $builtinmodule = function () {
	const stm32_donutbot = {};

	const simulator3D = window.Simulator3D;

	simulator3D.physics.leftLocked = false;
	simulator3D.p;
	const checkReady = async () => {
		return new Promise((resolve) => {
			let READY = simulator3D.checkIsReady();
			if (READY) {
				simulator3D.resetPosition();
				// clearInterval(simulator3D.intervalMoveCommande);
				resolve();
			} else {
				setTimeout(() => {
					checkReady();
				}, 100);
			}
		});
	};

	checkReady();

	let LEFT_MOTOR_SPEED = 0;
	let RIGHT_MOTOR_SPEED = 0;
	let COLOR_TRESHOLD = 50;

	stm32_donutbot.__name__ = new Sk.builtin.str('stm32_donutbot');

	const MAX_SPEED = 7000;

	const setMotor = (motor, dir, speed) => {
		try {
			$('#donutbot-motor' + motor + '_value').html(roundFloat((speed / MAX_SPEED) * 100, 1) + ' %');
			if (speed != 0) {
				$('.donutbot-motor' + motor).css('animation', `rotation-${dir} ${60 / ((speed / MAX_SPEED) * 100)}s infinite linear`);
			} else {
				$('.donutbot-motor' + motor).css('animation', 'none');
			}
		} catch (error) {
			console.error(error);
		}
	};

	stm32_donutbot.donutbot_move_forward = new Sk.builtin.func(function (speed) {
		const _speed = speed.v;
		setMotor('Right', 'forward', _speed);
		setMotor('Left', 'forward', _speed);
		simulator3D.physics.move('forward', _speed);
	});

	stm32_donutbot.donutbot_move_backward = new Sk.builtin.func(function (speed) {
		const _speed = speed.v;
		setMotor('Right', 'backward', _speed);
		setMotor('Left', 'backward', _speed);
		simulator3D.physics.move('backward', _speed);
	});

	stm32_donutbot.donutbot_rot_clock = new Sk.builtin.func(function (speed) {
		const _speed = speed.v;
		setMotor('Left', 'forward', _speed);
		setMotor('Right', 'backward', _speed);
		simulator3D.physics.move('rot_clock', _speed);
	});

	stm32_donutbot.donutbot_rot_trigo = new Sk.builtin.func(function (speed) {
		const _speed = speed.v;
		setMotor('Left', 'backward', _speed);
		setMotor('Right', 'forward', _speed);
		simulator3D.physics.move('rot_trigo', _speed);
	});

	stm32_donutbot.donutbot_get_distance = new Sk.builtin.func(function (s) {
		const sensor = s.v;
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('donutbot-distanceFront')));
		
	});

	stm32_donutbot.donutbot_moveWithSquare = new Sk.builtin.func(function (step, direction, speed) {
		const _step = step.v;
		const _direction = direction.v;
		const _speed = speed.v;

		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (_direction !== null) {
					if (simulator3D.physics){
						if (_direction === 'forward') {
							await simulator3D.physics.moveRobotDistance(_step, 'forward',  _speed,);
						} else if (_direction === 'backward') {
							await simulator3D.physics.moveRobotDistance(_step,'backward', _speed);
						}
					}
				}
				simulatorIsRunning = false;
				resolve(Sk.builtin.none());
			})
		);
	});

	stm32_donutbot.donutbot_turnAngle = new Sk.builtin.func(function (angle, speed) {
		const _angle = angle.v;
		const _speed = speed.v;
		
		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (simulator3D.physics){
					await simulator3D.physics.rotateRobotAngle(_angle, _speed);
				}
				simulatorIsRunning = false;
				resolve(Sk.builtin.none());
			})
		);
		

	})

	stm32_donutbot.donutbot_controlMotor = new Sk.builtin.func(function (motor, speed) {
		const motorName = motor.v === 1 ? 'Left' : 'Right';
		const _speed = speed.v;
		const minFactor = 22;
		const maxFactor = 29;

		const logBase = 2;

		const correctionFactor = maxFactor + (minFactor - maxFactor) * Math.log10(1 + (1 - Math.abs(_speed) / MAX_SPEED) * (logBase - 1));
		if (motorName === 'Left') {
			setMotor('Left', _speed > 0 ? 'backward' : 'forward', Math.abs(_speed));
			simulator3D.physics.leftLocked = true;
			simulator3D.physics.leftSpeed = -_speed / (MAX_SPEED / correctionFactor);
			MOTOR_LEFT_SPEED = _speed;
		} else {
			setMotor('Right', _speed > 0 ? 'forward' : 'backward', Math.abs(_speed));
			simulator3D.physics.rightLocked = true;
			simulator3D.physics.rightSpeed = _speed / (MAX_SPEED / correctionFactor);
			MOTOR_RIGHT_SPEED = _speed;
		}
	});

	stm32_donutbot.donutbot_stop = new Sk.builtin.func(function (motor) {
		if (typeof motor === 'undefined') {
			setMotor('Right', 'stop', 0);
			setMotor('Left', 'stop', 0);
			simulator3D.physics.move('stop', 0);
			return Sk.builtin.none();
		}

		if (motor.v === 1) {
			setMotor('Left', 'stop', 0);
			simulator3D.physics.leftLocked = false;
		} else {
			setMotor('Right', 'stop', 0);
			simulator3D.physics.rightSpeed = false;
		}
	});

	stm32_donutbot.donutbot_pause = new Sk.builtin.func(function (motor) {
		if (typeof motor === 'undefined') {
			setMotor('Right', 'stop', 0);
			setMotor('Left', 'stop', 0);
			simulator3D.physics.move('stop', 0);
			return Sk.builtin.none();
		}

		if (motor.v === 1) {
			setMotor('Left', 'stop', 0);
			simulator3D.physics.leftSpeed = 0;
		} else if (motor.v === 2) {
			setMotor('Right', 'stop', 0);
			simulator3D.physics.rightSpeed = 0;
		} else {
			setMotor('Right', 'stop', 0);
			setMotor('Left', 'stop', 0);
			simulator3D.physics.leftSpeed = 0;
			simulator3D.physics.rightSpeed = 0;
		}
	});

	stm32_donutbot.donutbot_get_color = new Sk.builtin.func(() => {
		
		const rgbColor = simulator3D.rgbTextureValue;
		const rgbValues = rgbColor.reduce((acc, color) => {
			acc.r += Number(color.r);
			acc.g += Number(color.g);
			acc.b += Number(color.b);
			return acc;
		}, { r: 0, g: 0, b: 0 });
		

		rgbValues.r /= 3;
		rgbValues.g /= 3;
		rgbValues.b /= 3;

		Simulator.setSliderValue('donutbot-ColorSensor', rgbValues.r, '_r');
		Simulator.setSliderValue('donutbot-ColorSensor', rgbValues.g, '_g');
		Simulator.setSliderValue('donutbot-ColorSensor', rgbValues.b, '_b');

		return new Sk.builtin.tuple([new Sk.builtin.int_(Number(rgbValues.r).toFixed(0)), new Sk.builtin.int_(Number(rgbValues.g).toFixed(0)), new Sk.builtin.int_(Number(rgbValues.b).toFixed(0))]);
	});

	stm32_donutbot.donutbot_set_led_captor = new Sk.builtin.func(() => {
		return Sk.builtin.none();
	});

	stm32_donutbot.donutbot_set_treshold_value = new Sk.builtin.func((treshold) => {
		const tresholdValue = treshold.v;
		COLOR_TRESHOLD = tresholdValue;
		return Sk.builtin.none();
	});

	stm32_donutbot.donutbot_get_line = new Sk.builtin.func((s) => {
		const side = s.v;
		
		if (side === "left") {
			const rgbColor = simulator3D.rgbTextureValue[0];
			const white_l = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
			
			if (white_l < COLOR_TRESHOLD) {
				$("#ilo-finderLeft_slider_v").slider('value', 1);
				return new Sk.builtin.int_(1);
			} else {
				$("#ilo-finderLeft_slider_v").slider('value', 0);
				return new Sk.builtin.int_(0);
			}
		}
		
		if (side === "center") {
			const rgbColor = simulator3D.rgbTextureValue[1];
			const white_m = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
			
			if (white_m < COLOR_TRESHOLD) {
				$("#ilo-finderCenter_slider_v").slider('value', 1);
				return new Sk.builtin.int_(1);
			} else {
				$("#ilo-finderCenter_slider_v").slider('value', 0);
				return new Sk.builtin.int_(0);
			}
		}
		
		if (side === "right") {
			const rgbColor = simulator3D.rgbTextureValue[2];
			const white_r = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
			
			if (white_r < COLOR_TRESHOLD) {
				$("#ilo-finderRight_slider_v").slider('value', 1);
				return new Sk.builtin.int_(1);
			} else {
				$("#ilo-finderRight_slider_v").slider('value', 0);
				return new Sk.builtin.int_(0);
			}
		}
		
		const rgbColorLeft = simulator3D.rgbTextureValue[0];
		const rgbColorCenter = simulator3D.rgbTextureValue[1];
		const rgbColorRight = simulator3D.rgbTextureValue[2];
		
		const white_l = (rgbColorLeft.r + rgbColorLeft.g + rgbColorLeft.b) / 3;
		const white_m = (rgbColorCenter.r + rgbColorCenter.g + rgbColorCenter.b) / 3;
		const white_r = (rgbColorRight.r + rgbColorRight.g + rgbColorRight.b) / 3;
		
		const line_left = white_l < COLOR_TRESHOLD ? 1 : 0;
		const line_center = white_m < COLOR_TRESHOLD ? 1 : 0;
		const line_right = white_r < COLOR_TRESHOLD ? 1 : 0;
		
		$("#ilo-finderLeft_slider_v").slider('value', line_left);
		$("#ilo-finderCenter_slider_v").slider('value', line_center);
		$("#ilo-finderRight_slider_v").slider('value', line_right);
		
		return new Sk.builtin.tuple([
			new Sk.builtin.int_(line_left),
			new Sk.builtin.int_(line_center),
			new Sk.builtin.int_(line_right)
		]);
	});

	function getClosestColorName(rgbColor) {

		const max_val = Math.max(rgbColor.r, rgbColor.g, rgbColor.b);
		let r, g, b;
		
		if (max_val === 0) {
			r = 0; g = 0; b = 0;
		} else {
			const scale = 255 / max_val;
			r = Math.min(Math.floor(rgbColor.r * scale), 255);
			g = Math.min(Math.floor(rgbColor.g * scale), 255);
			b = Math.min(Math.floor(rgbColor.b * scale), 255);
		}
		
		const colors = {
			'white': [209, 255, 161],
			'orange': [255, 225, 66],
			'purple': [128, 0, 128],
			'pink': [255, 167, 140],
			'brown': [174, 156, 67],
			'yellow': [230, 255, 67],
			'green': [167, 255, 57],
			'blue': [166, 255, 121],
			'red': [255, 121, 37]
		};
		
		let min_val = null;
		let best_match = 'None';
		
		for (const name in colors) {
			const [r_ref, g_ref, b_ref] = colors[name];
			const diff = Math.abs(r - r_ref) + Math.abs(g - g_ref) + Math.abs(b - b_ref);
			
			if (min_val === null || diff < min_val) {
				min_val = diff;
				best_match = name;
			}
		}
		
		if (min_val > 50) {
			return 'None';
		}
		
		return best_match;
	}

	stm32_donutbot.donutbot_get_color_name_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		const colorName = getClosestColorName(rgbColor);
		return new Sk.builtin.str(colorName);
	});

	stm32_donutbot.donutbot_get_color_name_center = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		const colorName = getClosestColorName(rgbColor);
		return new Sk.builtin.str(colorName);
	});

	stm32_donutbot.donutbot_get_color_name_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		const colorName = getClosestColorName(rgbColor);
		return new Sk.builtin.str(colorName);
	});

	stm32_donutbot.donutbot_get_color_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		const rgbValues = { r: Number(rgbColor.r), g: Number(rgbColor.g), b: Number(rgbColor.b) };
		Simulator.setSliderValue('donutbot-ColorSensorRight', rgbValues['r'], '_r');
		Simulator.setSliderValue('donutbot-ColorSensorRight', rgbValues['g'], '_g');
		Simulator.setSliderValue('donutbot-ColorSensorRight', rgbValues['b'], '_b');

		return new Sk.builtin.tuple([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});


	stm32_donutbot.donutbot_get_color_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		const rgbValues = { r: Number(rgbColor.r), g: Number(rgbColor.g), b: Number(rgbColor.b) };
		Simulator.setSliderValue('donutbot-ColorSensorLeft', rgbValues['r'], '_r');
		Simulator.setSliderValue('donutbot-ColorSensorLeft', rgbValues['g'], '_g');
		Simulator.setSliderValue('donutbot-ColorSensorLeft', rgbValues['b'], '_b');

		return new Sk.builtin.tuple([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	stm32_donutbot.donutbot_get_color_center = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		const rgbValues = { r: Number(rgbColor.r), g: Number(rgbColor.g), b: Number(rgbColor.b) };
		Simulator.setSliderValue('donutbot-ColorSensorCenter', rgbValues['r'], '_r');
		Simulator.setSliderValue('donutbot-ColorSensorCenter', rgbValues['g'], '_g');
		Simulator.setSliderValue('donutbot-ColorSensorCenter', rgbValues['b'], '_b');

		return new Sk.builtin.tuple([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	stm32_donutbot.donutbot_get_color_clear_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$('#donutbot-finderRight' + '_slider_v').slider('value', 1);

			return new Sk.builtin.int_(1);
		} else {
			$('#donutbot-finderRight' + '_slider_v').slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	stm32_donutbot.donutbot_get_color_clear_middle = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$('#donutbot-finderMiddle' + '_slider_v').slider('value', 1);
			return new Sk.builtin.int_(1);
		} else {
			$('#donutbot-finderMiddle' + '_slider_v').slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	stm32_donutbot.donutbot_get_color_clear_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		if (meanColor < 50) {
			$('#donutbot-finderLeft' + '_slider_v').slider('value', 1);
			return new Sk.builtin.int_(1);
		} else {
			$('#donutbot-finderLeft' + '_slider_v').slider('value', 0);
			return new Sk.builtin.int_(0);
		}
	});

	stm32_donutbot.set_led_captor = new Sk.builtin.func(() => {
		return Sk.builtin.none();
	});

	return stm32_donutbot;
};
