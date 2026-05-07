
const $builtinmodule = function () {
	const ilo_micro = {};
	ilo_micro.__name__ = new Sk.builtin.str('ilo_micro');
	Simulator.cancelPromisesSimulator = false;
	Simulator.Robot3DEnabled = true;

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

	simulator3D.display_led = true;

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
		// simulator3D.setLedShape(direction);
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
		simulator3D.updateLEDColor(r_ / 255, g_ / 255, b_ / 255);
		return Sk.builtin.none();
	};
	ilo_micro.set_led_color = new Sk.builtin.func(set_led_color);

	const set_led_shape = function (shape) {
		console.log(shape);
		simulator3D.setLedShape(shape.v);
		return Sk.builtin.none();
	};
	ilo_micro.set_led_shape = new Sk.builtin.func(set_led_shape);

	const set_led_anim = function (anim, duration) {
		UIManager.showErrorMessage('error-message', "set_led_anim(anim) is not yet implemented");
		return Sk.builtin.none();
	};
	ilo_micro.set_led_anim = new Sk.builtin.func(set_led_anim);

	const set_led_single = function (type, id, red, green, blue) {
        const type_ = Sk.ffi.remapToJs(type);
        const id_ = Sk.ffi.remapToJs(id);
        const red_ = Sk.ffi.remapToJs(red);
        const green_ = Sk.ffi.remapToJs(green);
        const blue_ = Sk.ffi.remapToJs(blue);

        return simulator3D.setSingleLed(type_, id_, red_/255, green_/255, blue_/255);
    };

	ilo_micro.set_led_single = new Sk.builtin.func(set_led_single);


	ilo_micro.set_tempo_pos = new Sk.builtin.func((tempo) => {
		const tempo_ = Sk.ffi.remapToJs(tempo);
		simulator3D.setTempo(tempo_);
		return Sk.builtin.none();
	});

	ilo_micro.set_acc_motor = new Sk.builtin.func((acc) => {
		const acc_ = Sk.ffi.remapToJs(acc);
		return Sk.builtin.none();
	});

	ilo_micro.set_line_threshold_value = new Sk.builtin.func((threshold) => {
		let threshold_ = Sk.ffi.remapToJs(threshold);
		if (threshold_ < 0) threshold_ = 10;
		if (threshold_ > 100) threshold_ = 100;
		return simulator3D.lineThresholdValue = threshold_;
	});

	const step = function (direction, distance, finish_state, display_led) {
		const displayLed = Sk.ffi.remapToJs(display_led);
		const isBlocked = Sk.ffi.remapToJs(finish_state);
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
					resolve(Sk.builtin.none());
					return;
				}

				let movement;
				if (angle !== null) {
					if (simulator3D.physics) {
						await simulator3D.physics.moveStep(angle, direction_, steps);
						stopMotors();
						resolve(Sk.builtin.none());
						return;
					} else {
						movement = simulator3D.queueMovement('rotate', [angle, direction_, steps, displayLed]);
					}
				} else {
					if (simulator3D.physics) {
						await simulator3D.physics.moveStep(angle, direction_, steps);
						stopMotors();
						resolve(Sk.builtin.none());
						return;
					} else {
						movement = simulator3D.queueMovement('move', [direction_, steps, null, displayLed]);
					}
				}

				if (isBlocked) {
					await movement.completed;
					stopMotors();
				}
				resolve(Sk.builtin.none());
			})
		)
	};
	step.co_varnames = ['direction', 'distance', 'finish_state', 'display_led'];
	step.$defaults = [new Sk.builtin.str("front"), new Sk.builtin.int_(1), new Sk.builtin.bool(true), new Sk.builtin.bool(true)];
	ilo_micro.step = new Sk.builtin.func(step);

	const move = function (direction, speed) {
		const direction_ = Sk.ffi.remapToJs(direction);
		let speed_ = Sk.ffi.remapToJs(speed);
		if (speed_ > 100) speed_ = 100;
		if (speed_ < 1) speed_ = 0;
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
				speed_ = Math.round((speed_ / 100) * simulator3D.speedRotation * MAX_SPEED / 100 );
				// simulator3D.physics.move("rot_trigo", speed);
				drive_single_motor_speed_front_left(100, -speed_);
				drive_single_motor_speed_back_left(100, -speed_);
				// speed.v = -speed.v;
				drive_single_motor_speed_front_right(100, speed_);
				drive_single_motor_speed_back_right(100, speed_);
				break;
			case 'rot_clock':
				speed_ = Math.round((speed_ / 100) * simulator3D.speedRotation * MAX_SPEED / 100 );
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
	ilo_micro.move = new Sk.builtin.func(move);

	const rotation = function (angle, finish_state, display_led) {
		const displayLed = Sk.ffi.remapToJs(display_led);
		const isBlocked = Sk.ffi.remapToJs(finish_state);
		let direction_ = null;
		const angle_ = Sk.ffi.remapToJs(angle);
		if (angle_ > 0) {
			direction_ = 'cw';
		} else {
			direction_ = 'ccw';
		}
		const absAngle = Math.abs(angle_);

		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (Simulator.cancelPromisesSimulator) {
					resolve(Sk.builtin.none());
					return;
				}

				if (simulator3D.physics) {
					await simulator3D.physics.moveStep(absAngle, direction_);
					stopMotors();
					resolve(Sk.builtin.none());
					return;
				}

				const movement = simulator3D.queueMovement('rotate', [absAngle, direction_, null, displayLed]);

				if (isBlocked) {
					await movement.completed;
					stopMotors();
				}
				resolve(Sk.builtin.none());
			})
		);
	};
	rotation.co_varnames = ['angle', 'finish_state', 'display_led'];
	rotation.$defaults = [new Sk.builtin.int_(90), new Sk.builtin.bool(true)];
	ilo_micro.rotation = new Sk.builtin.func(rotation);

	const drive_single_motor_speed_front_left = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('FL_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics) {
			simulator3D.physics.frontLeftSpeed = speed_ / 10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorFrontLeft(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	ilo_micro.drive_single_motor_speed_front_left = new Sk.builtin.func(drive_single_motor_speed_front_left);

	const drive_single_motor_speed_front_right = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('FR_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics) {
			simulator3D.physics.frontRightSpeed = speed_ / 10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorFrontRight(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	ilo_micro.drive_single_motor_speed_front_right = new Sk.builtin.func(drive_single_motor_speed_front_right);

	const drive_single_motor_speed_back_left = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('BL_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics) {
			simulator3D.physics.backLeftSpeed = speed_ / 10;
		} else {
			simulator3D.moveKinematic();
		}
		setMotorBackLeft(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	ilo_micro.drive_single_motor_speed_back_left = new Sk.builtin.func(drive_single_motor_speed_back_left);

	const drive_single_motor_speed_back_right = function (acc, speed) {
		const speed_ = speed
		const direction = speed_ > 0 ? 1 : -1;
		simulator3D.updateMecanumComponent('BR_wheel', Math.abs(speed_), direction);
		if (simulator3D.physics) {
			simulator3D.physics.backRightSpeed = speed_ / 10;
		} else {
			clearInterval(simulator3D.intervalMoveCommande);
			simulator3D.moveKinematic();
		}
		setMotorBackRight(MAX_SPEED * speed_ / 100);
		return Sk.builtin.none();
	};
	ilo_micro.drive_single_motor_speed_back_right = new Sk.builtin.func(drive_single_motor_speed_back_right);

	const set_led_captor = function (state) {
		return Sk.builtin.none();
	};
	ilo_micro.set_led_captor = new Sk.builtin.func(set_led_captor);


	const getColorRGB = (sensor) => {
		const rgbColor = simulator3D.rgbTextureValue[sensor];
		const rgbValues = { "r": Number(rgbColor.r), "g": Number(rgbColor.g), "b": Number(rgbColor.b) };
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["r"], '_r');
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["g"], '_g');
		Simulator.setSliderValue('ilo-ColorSensor', rgbValues["b"], '_b');
		return rgbColor;
	};

	ilo_micro.get_color_rgb_center = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(1);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	ilo_micro.get_color_rgb_right = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(2);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	ilo_micro.get_color_rgb_left = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(0);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	ilo_micro.get_raw_color_rgb = new Sk.builtin.func(() => {
		const rgbColor = getColorRGB(1);
		return new Sk.builtin.list([new Sk.builtin.int_(Number(rgbColor.r).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.g).toFixed(0)), new Sk.builtin.int_(Number(rgbColor.b).toFixed(0))]);
	});

	ilo_micro.get_color_card = new Sk.builtin.func((return_type) => {
		const return_type_ = Sk.ffi.remapToJs(return_type);

		// Obtenir les valeurs RGB du capteur central
		const rgbColor = getColorRGB(1);
		const r = Math.round(Number(rgbColor.r));
		const g = Math.round(Number(rgbColor.g));
		const b = Math.round(Number(rgbColor.b));

		// Calcul des distances avec les couleurs de référence (ajustées)
		const colors = {
			"white": [190, 255, 252],
			"orange": [255, 165, 0],      // Orange standard
			"purple": [128, 0, 128],      // Violet standard
			"light_blue": [173, 216, 230], // Bleu clair
			"yellow": [255, 255, 0],      // Jaune pur
			"green": [0, 128, 0],         // Vert standard
			"blue": [0, 0, 255],          // Bleu pur
			"red": [255, 0, 0],           // Rouge pur
			"black": [0, 0, 0]            // Noir
		};

		let minDistance = Infinity;
		let detectedColor = "black";

		// Calcul de la distance pour chaque couleur
		for (const [colorName, [refR, refG, refB]] of Object.entries(colors)) {
			const distance = Math.abs(r - refR) + Math.abs(g - refG) + Math.abs(b - refB);

			if (distance < minDistance) {
				minDistance = distance;
				detectedColor = colorName;
			}
		}

		// Appliquer un seuil de détection
		// if (minDistance > 200) { 
		// 	detectedColor = "None";
		// }

		// Définition des valeurs RGB selon la couleur détectée
		let final_rgb;

		switch (detectedColor) {
			case "white":
				final_rgb = [255, 255, 255];
				break;
			case "orange":
				final_rgb = [255, 165, 0];
				break;
			case "purple":
				final_rgb = [128, 0, 128];
				break;
			case "light_blue":
				final_rgb = [173, 216, 230];
				break;
			case "yellow":
				final_rgb = [255, 255, 0];
				break;
			case "green":
				final_rgb = [0, 255, 0];
				break;
			case "blue":
				final_rgb = [0, 0, 255];
				break;
			case "red":
				final_rgb = [255, 0, 0];
				break;
			case "black":
				final_rgb = [0, 0, 0];
				break;
			case "None":
				final_rgb = [0, 0, 0];
				break;
			default:
				final_rgb = [0, 0, 0];
		}

		// Retour selon le type demandé
		if (return_type_ === "rgb") {
			return new Sk.builtin.list([
				new Sk.builtin.int_(final_rgb[0]),
				new Sk.builtin.int_(final_rgb[1]),
				new Sk.builtin.int_(final_rgb[2])
			]);
		} else if (return_type_ === "r") {
			return new Sk.builtin.int_(final_rgb[0]);
		} else if (return_type_ === "g") {
			return new Sk.builtin.int_(final_rgb[1]);
		} else if (return_type_ === "b") {
			return new Sk.builtin.int_(final_rgb[2]);
		} else if (return_type_ === "color") {
			return new Sk.builtin.str(detectedColor);
		} else {
			console.error("[ERROR] 'return_type' must be 'rgb' or 'color'");
			return Sk.builtin.none;
		}
	});


	ilo_micro.get_color_clear_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2];
		if (LED_CAPTOR) {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 + 120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	ilo_micro.get_color_clear_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0];
		if (LED_CAPTOR) {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 + 120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	ilo_micro.get_color_clear_center = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1];
		if (LED_CAPTOR) {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 2.2 + 120;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = (rgbColor.r + rgbColor.g + rgbColor.b) * 0.39;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	ilo_micro.get_color_clear = new Sk.builtin.func(() => {
		const rgbColorCenter = simulator3D.rgbTextureValue[1];
		const rgbColorLeft = simulator3D.rgbTextureValue[0];
		const rgbColorRight = simulator3D.rgbTextureValue[2];
		if (LED_CAPTOR) {
			const intensity = ((rgbColorCenter.r + rgbColorCenter.g + rgbColorCenter.b) * 2.2 + 120 +
				(rgbColorLeft.r + rgbColorLeft.g + rgbColorLeft.b) * 2.2 + 120 +
				(rgbColorRight.r + rgbColorRight.g + rgbColorRight.b) * 2.2 + 120) / 3;
			return new Sk.builtin.int_(intensity.toFixed(0));
		} else {
			const intensity = ((rgbColorCenter.r + rgbColorCenter.g + rgbColorCenter.b) * 0.39 +
				(rgbColorLeft.r + rgbColorLeft.g + rgbColorLeft.b) * 0.39 +
				(rgbColorRight.r + rgbColorRight.g + rgbColorRight.b) * 0.39) / 3;
			return new Sk.builtin.int_(intensity.toFixed(0));
		}
	});

	ilo_micro.get_line_right = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[2] || {};
		if (rgbColor.r === undefined) return new Sk.builtin.int_(0);
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		return new Sk.builtin.int_(meanColor < 50 ? 1 : 0);
	});

	ilo_micro.get_line_center = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[1] || {};
		if (rgbColor.r === undefined) return new Sk.builtin.int_(0);
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		return new Sk.builtin.int_(meanColor < 50 ? 1 : 0);
	});

	ilo_micro.get_line_left = new Sk.builtin.func(() => {
		const rgbColor = simulator3D.rgbTextureValue[0] || {};
		if (rgbColor.r === undefined) return new Sk.builtin.int_(0);
		const meanColor = (rgbColor.r + rgbColor.g + rgbColor.b) / 3;
		return new Sk.builtin.int_(meanColor < 50 ? 1 : 0);
	});

	ilo_micro.get_distance_front = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceFront')));
	});

	ilo_micro.get_distance_back = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceBack')));
	});

	ilo_micro.get_distance_left = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceLeft')));
	});

	ilo_micro.get_distance_right = new Sk.builtin.func(() => {
		return new Sk.builtin.int_(parseInt(Simulator.getSliderValue('ilo-distanceRight')));
	});

	ilo_micro.stop = new Sk.builtin.func(() => {
		let count = 0;
		const stopInterval = setInterval(() => {
			if (count == 3) {
				simulator3D.setLedShape('ring_1');
			}
			else if (count % 2 == 0) {
				simulator3D.setLedShape('stop');
				count++;
			} else {
				simulator3D.setLedShape('ring_1');
				count++;
			}
		}, 300);
		if (simulator3D.physics) {
			simulator3D.physics.stop();
		} else {
			simulator3D.stopMotors();
		}
		stopMotors();
	});

	ilo_micro.get_pitch = new Sk.builtin.func(() => {
		return new Sk.builtin.float_(0.00);
	});

	ilo_micro.get_roll = new Sk.builtin.func(() => {
		return new Sk.builtin.float_(0.00);
	});

	ilo_micro.get_yaw = new Sk.builtin.func(() => {
		return simulator3D.getYaw();
	});

	return ilo_micro;
};
