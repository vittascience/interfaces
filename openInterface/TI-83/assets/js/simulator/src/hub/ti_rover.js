// Innovator Hub - ti_rover module

var $builtinmodule = function (name) {

	const COLORS = {
		"1": [255, 0, 0],		// red
		"2": [0, 255, 0],		// green
		"3": [0, 0, 255],		// blue
		"4": [0, 255, 255],		// cyan
		"5": [255, 0, 255],		// magenta	
		"6": [255, 255, 0],		// yellow
		"7": [0, 0, 0],			// black
		"8": [255, 255, 255],	// white
		// "9": [127, 127, 127]	// gray    not yet implemented
	}

	var ti_rover = {};

	ti_rover.__name__ = new Sk.builtin.str('ti_rover');

	// Conduire

	const move = function (dir, distance) {
		if (distance !== undefined) {
			if (Sk.builtin.checkNumber(distance)) {
				if (distance.v < 0) {
					Simulator.Mosaic.specific.ti.showError("\'" + distance.v + "\' Distance invalide.", "Invalid distance.", 'tihubException');
				} else {
					Simulator.Mosaic.specific.rover.storedMovements.push([dir, distance.v * 10]);
				}
			} else {
				Simulator.Mosaic.specific.ti.showError("\'" + distance.v + "\' Distance invalide.", "can't convert 'int' object to " + Sk.abstr.typeName(distance), 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.rover.storedMovements.push([dir, 80]);
		}
		Simulator.Mosaic.specific.rover.startRunning();
	};

	const turn = function (dir, angle) {
		if (angle !== undefined) {
			if (Sk.builtin.checkInt(angle)) {
				if (angle.v >= 0 && angle.v <= 360) {
					Simulator.Mosaic.specific.rover.storedMovements.push([dir, angle.v]);
				} else {
					// sound error
				}
			} else {
				Simulator.Mosaic.specific.ti.showError("\'" + angle.v + "\' Angle invalide.", "unknown format code \'f\' for object of type " + Sk.abstr.typeName(distance), 'ValueError');
			}
		} else {
			Simulator.Mosaic.specific.rover.storedMovements.push([dir, 90]);
		}
		Simulator.Mosaic.specific.rover.startRunning();
	};

	const getUnitDistance = (ms) => {
		const once_cm_duration = Simulator.Mosaic.specific.rover.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s;
		return new Sk.builtin.float_(ms / once_cm_duration / 10);
	};

	var forward = async function (distance, unit, speed) {
		RobotSimulator.robot.speed_meter_s = speed.v;
		move('forward', distance);
	};
	forward.co_varnames = ['distance', 'unit', 'speed'];
	forward.$defaults = [new Sk.builtin.str("units"), new Sk.builtin.float_(RobotSimulator.robot.DEFAULT_SPEED_M_S)];
	ti_rover.forward = new Sk.builtin.func(forward);

	var backward = async function (distance, unit, speed) {
		RobotSimulator.robot.speed_meter_s = speed.v;
		move('backward', distance);
	};
	backward.co_varnames = ['distance', 'unit', 'speed'];
	backward.$defaults = [new Sk.builtin.str("units"), new Sk.builtin.float_(RobotSimulator.robot.DEFAULT_SPEED_M_S)];
	ti_rover.backward = new Sk.builtin.func(backward);

	ti_rover.left = new Sk.builtin.func(async function (angle) {
		const value = new Sk.builtin.int_(angle.v);
		turn('left', value);
	});

	ti_rover.right = new Sk.builtin.func(async function (angle) {
		const value = new Sk.builtin.int_(angle.v);
		turn('right', value);
	});

	ti_rover.stop = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.rover.stopRunning();
	});

	ti_rover.resume = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.rover.startRunning();
	});

	ti_rover.stay = new Sk.builtin.func(function (duration) {
		if (duration !== undefined) {
			Simulator.Mosaic.specific.rover.storedMovements.push(['stay', duration.v]);
			Simulator.Mosaic.specific.rover.startRunning();
		}
	});

	ti_rover.to_xy = new Sk.builtin.func(async function (x, y) {
		if (x !== undefined && y !== undefined) {
			Simulator.Mosaic.specific.rover.storedMovements.push(['to_xy', [x.v, y.v]]);
			Simulator.Mosaic.specific.rover.startRunning();
		}
	});

	ti_rover.to_polar = new Sk.builtin.func(async function (r, theta) {
		if (r !== undefined && theta !== undefined) {
			let angle = theta.v;
			if (angle >= 360) {
				while (angle >= 360) {
					angle - 360;
				}
			} else if (angle <= -360) {
				while (angle <= -360) {
					angle + 360;
				}
			}
			if ((angle < -180 && angle > -360) || (angle > 0 && angle <= 180)) {
				turn('left', new Sk.builtin.int_(Math.round(angle)));
			} else {
				turn('right', new Sk.builtin.int_(Math.round(angle)));
			}
			move('forward', r);
		}
	});

	var forward_time = async function (temps, speed) {
		RobotSimulator.robot.speed_meter_s = speed.v;
		move('forward', getUnitDistance(temps.v * 1000));
	};
	forward_time.co_varnames = ['temps', 'speed'];
	forward_time.$defaults = [new Sk.builtin.int_(5), new Sk.builtin.float_(RobotSimulator.robot.DEFAULT_SPEED_M_S)];
	ti_rover.forward_time = new Sk.builtin.func(forward_time);

	var backward_time = async function (temps, speed) {
		RobotSimulator.robot.speed_meter_s = speed.v;
		move('backward', getUnitDistance(temps.v * 1000));
	};
	backward_time.co_varnames = ['temps', 'speed'];
	backward_time.$defaults = [new Sk.builtin.int_(5), new Sk.builtin.float_(RobotSimulator.robot.DEFAULT_SPEED_M_S)];
	ti_rover.backward_time = new Sk.builtin.func(backward_time);

	// E/S - Entrée

	ti_rover.ranger_measurement = new Sk.builtin.func(function () {
		const t = parseInt($("#rover-ultrasonic_slider_t").slider('option', 'value'));
		return new Sk.builtin.float_(roundFloat(343 * t / 1e6 / 2, 2));
	});

	ti_rover.ranger_time = new Sk.builtin.func(function () {
		const t = parseInt($("#rover-ultrasonic_slider_t").slider('option', 'value'));
		return new Sk.builtin.float_(t / 1e6);
	});

	ti_rover.color_measurement = new Sk.builtin.func(function () {
		const r = parseInt($('#rover-colorSensor_slider_r').slider('option', 'value'));
		const g = parseInt($('#rover-colorSensor_slider_g').slider('option', 'value'));
		const b = parseInt($('#rover-colorSensor_slider_b').slider('option', 'value'));
		let color_gap = {}
		for (var i in COLORS) {
			color_gap[i] = Math.abs(r - COLORS[i][0]) + Math.abs(g - COLORS[i][1]) + Math.abs(b - COLORS[i][2]);
		}
		const index = Object.keys(color_gap).find((key, index) => color_gap[key] == Math.min(...Object.values(color_gap)));
		return new Sk.builtin.int_(index);
	});

	ti_rover.red_measurement = new Sk.builtin.func(function () {
		const r = parseInt($('#rover-colorSensor_slider_r').slider('option', 'value'));
		return new Sk.builtin.int_(r);
	});

	ti_rover.green_measurement = new Sk.builtin.func(function () {
		const g = parseInt($('#rover-colorSensor_slider_g').slider('option', 'value'));
		return new Sk.builtin.int_(g);
	});

	ti_rover.blue_measurement = new Sk.builtin.func(function () {
		const b = parseInt($('#rover-colorSensor_slider_b').slider('option', 'value'));
		return new Sk.builtin.int_(b);
	});

	ti_rover.gray_measurement = new Sk.builtin.func(function () {
		const r = parseInt($('#rover-colorSensor_slider_r').slider('option', 'value'));
		const g = parseInt($('#rover-colorSensor_slider_g').slider('option', 'value'));
		const b = parseInt($('#rover-colorSensor_slider_b').slider('option', 'value'));
		return new Sk.builtin.int_(Math.round(RGBtoGrayscale(r, g, b)));
	});

	ti_rover.encoders_gyro_measurement = new Sk.builtin.func(function () {
		const degree = parseInt($('#rover-gyroscope-angle_slider').slider('option', 'value'));
		return new Sk.builtin.list([Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(degree), Sk.builtin.none()]);
	});

	ti_rover.gyro_measurement = new Sk.builtin.func(function () {
		const angularSpeed = parseFloat($('#rover-gyroscope-speed_slider').slider('option', 'value'));
		return new Sk.builtin.int_(angularSpeed);
	});

	// E/S - Sortie

	ti_rover.color_rgb = new Sk.builtin.func(function (r, g, b) {
		if (b !== undefined) {
			if (g !== undefined) {
				if (r !== undefined) {
					if (Sk.builtin.checkNumber(r) || Sk.builtin.checkNumber(g) || Sk.builtin.checkNumber(b)) {
						if (!$("#ih_rgbLed").hasClass('ih_rgbLed_anim')) {
							$("#ih_rgbLed").addClass('ih_rgbLed_anim');
						}
						$("#ih_rgbLed").css('background-color', "rgb(" + Math.round(r.v) + "," + Math.round(g.v) + "," + Math.round(b.v) + ")");
						if (RobotSimulator.robot) {
							RobotSimulator.robot.ledRGB.set(Math.round(r.v), Math.round(g.v), Math.round(b.v));
						}
					} else if (Sk.builtin.checkString(r) || Sk.builtin.checkString(g) || Sk.builtin.checkString(b)) {
						Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction rgb()", "can't convert 'int' object to str implicity", 'TypeError');
					}
				} else {
					Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'r' à la fonction rgb()", "function takes 3 positional arguments but 0 were given.", 'TypeError');
				}
			} else {
				Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'g' à la fonction rgb()", "function takes 3 positional arguments but 1 were given.", 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'b' à la fonction rgb()", "function takes 3 positional arguments but 2 were given.", 'TypeError');
		}
	});

	ti_rover.color_blink = new Sk.builtin.func(function (frequency, duration) {
		if (duration !== undefined) {
			if (frequency !== undefined) {
				const sleep_ms = 1000 / frequency.v;
				durationCount = 0;
				RobotSimulator.robot.ledRGB.rgbInterval = setInterval(async function () {
					durationCount += sleep_ms;
					if (durationCount / 1000 > duration.v) {
						clearInterval(RobotSimulator.robot.ledRGB.rgbInterval);
					} else {
						RobotSimulator.robot.ledRGB.on();
						setTimeout(function () {
							RobotSimulator.robot.ledRGB.off();
						}, sleep_ms / 2)
					}
				}, sleep_ms);
			}
		}
	});

	ti_rover.color_off = new Sk.builtin.func(function () {
		RobotSimulator.robot.ledRGB.stop();
	});

	ti_rover.motor_right = new Sk.builtin.func(async function (speed, duration) {
		let direction = 'forward';
		let timeout = 5000;
		if (duration !== undefined) {
			timeout = duration.v * 1000;
		}
		if (speed !== undefined) {
			if (speed.v < 0) {
				direction = 'backward';
			}
			const speedValue = Math.abs(speed.v)
			$('#rover-motorRight_value').html(Math.round(speedValue))
			if (speedValue != 0) {
				$('.rover-motorRight').css('animation', 'rotation-' + direction + ' ' + (speedValue / 255 * 100 * -0.041 + 5) + 's infinite linear');
			} else {
				$('.rover-motorRight').css('animation', 'none');
			}
			Simulator.timeoutInCodeExecution = timeout;
			Simulator.Mosaic.specific.rover.isRunning = true;
			setTimeout(function () {
				$('#rover-motorRight_value').html("0")
				$('.rover-motorRight').css('animation', 'none');
				Simulator.Mosaic.specific.rover.isRunning = false;
			}, timeout);
		}
	});

	ti_rover.motor_left = new Sk.builtin.func(async function (speed, duration) {
		let direction = 'backward';
		let timeout = 5000;
		if (duration !== undefined) {
			timeout = duration.v * 1000;
		}
		if (speed !== undefined) {
			if (speed.v < 0) {
				direction = 'forward';
			}
			const speedValue = Math.abs(speed.v)
			$('#rover-motorLeft_value').html(Math.round(speedValue));
			if (speedValue != 0) {
				$('.rover-motorLeft').css('animation', 'rotation-' + direction + ' ' + (speedValue / 255 * 100 * -0.041 + 5) + 's infinite linear');
			} else {
				$('.rover-motorLeft').css('animation', 'none');
			}
			Simulator.timeoutInCodeExecution = timeout;
			Simulator.Mosaic.specific.rover.isRunning = true;
			setTimeout(function () {
				$('#rover-motorLeft_value').html("0")
				$('.rover-motorLeft').css('animation', 'none');
				Simulator.Mosaic.specific.rover.isRunning = false;
			}, timeout);
		}
	});

	// dir = "ccw" ou "cw" -> clockwise ou counterclockwise
	ti_rover.motors = new Sk.builtin.func(function (dirG, G, dirD, D, T) {
		throw new Sk.builtin.NotImplementedError("ti_rover.motors() is not yet implemented");
	});

	return ti_rover;
};
