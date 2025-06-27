Simulator.Behaviours.output = Object.create(null);

Simulator.Behaviours.output.oled = function () {
	const mod = Object.create(null);
	mod.data = {
		display: [],
		pos_x: 0,
		pos_y: 0
	}

	const setChar = function (x, y, array) {
		let index = y * 64 + x;
		if (array) {
			for (var i = 0; i < 5; i++) {
				let line = array[i].replace(/9/g, '1');
				line = line.replace(/ /g, '0');
				for (var j = 0; j < 5; j++) {
					if (mod.data.display[index + j] != line[j]) {
						mod.data.display[index + j] = line[j];
						$(".oled-block").eq(index + j).css("background-color", (mod.data.display[index + j] == '1' ? "#caf9ff" : "#000000"));
					}
				}
				index += 64;
			}
		}
	};

	mod['init'] = new Sk.builtin.func(function () {
		let html = '';
		for (let y = 0; y < 32; y++) {
			html += '<div class=row>';
			for (let x = 0; x < 64; x++) {
				let index = y * 64 + x;
				mod.data.display.push('0');
				html += '<div class="oled-block" style="background-color:' + (mod.data.display[index] == '1' ? "#00bfff" : "#000000") + ';"></div>';
			}
			html += "</div>";
		}
		$('#oled_value').html(html);
	});
	mod['set_px'] = new Sk.builtin.func(function (x, y, state) {
		let index = y.v * 64 + x.v;
		if (mod.data.display[index] != state.v) {
			mod.data.display[index] = state.v;
			$(".oled-block").eq(index).css("background-color", (mod.data.display[index] == '1' ? "#00bfff" : "#000000"));
		}
	});
	mod['set_pos'] = new Sk.builtin.func(function (x, y) {
		mod.data.pos_x = x.v;
		mod.data.pos_y = y.v;
	});
	mod['addTxt'] = new Sk.builtin.func(function (c, l, str) {
		if (l.v < 4) {
			for (let i = 0; i < str.v.length; i++) {
				if (c.v + i < 10) {
					const letterArray = SIMULATOR_DISPLAY_ALPHABET[str.v[i]];
					const x = 6 * (c.v + i) + 1;
					const y = 6 * l.v + 1;
					setChar(x, y, letterArray)
				}
			}
		}
	});
	mod['draw_stamp'] = new Sk.builtin.func(function (x, y, image) {
		return Simulator.runAsync(function (resolve, reject) {
			setChar(x.v + 1, y.v + 1, image.v.split(':'));
			resolve();
		});
	});
	mod['clear'] = new Sk.builtin.func(function () {
		for (let i = 0; i < mod.data.display.length; i++) {
			if (mod.data.display[i] == "1") {
				mod.data.display[i] = "0";
				$(".oled-block").eq(i).css("background-color", "#000000");
			}
		}
	});

	return mod;
};

Simulator.Behaviours.output.traffic_light = function () {
	const mod = Object.create(null)
	mod['state'] = {
		red: false,
		orange: false,
		green: false
	};
	mod['updateSimulation'] = function() {
		function getState(led) {
			return led ? "ON" : "OFF";
		}
		let output = "";
		for (const led of Object.keys(mod.state)) {
			if (mod.state[led]) 
				$("#mb-trafficLight-" + led).addClass("mb-trafficLight-" + led + "_anim");
			else 
				$("#mb-trafficLight-" + led).removeClass("mb-trafficLight-" + led + "_anim");
			output += `${led.charAt(0).toUpperCase()}: ${getState(mod.state[led])}<br/>`;
		}
		$('#mb-trafficLight_value').html(output);
	};
	mod['writeDigital'] = new Sk.builtin.func(function (led, state) {
		mod.state[led.v] = state.v;
		mod.updateSimulation();
	});
	return mod;
};

/**
 * Actuators
 */

Simulator.Behaviours.output.buzzer = function () {
	const mod = Object.create(null);
	mod['playMusic'] = new Sk.builtin.func(function (pin, music) {
		let pinNumber = pin.v.replace('pin', '')
		$('#buzzer_' + pinNumber + '_value').html(music.v);
		$('#buzzer_' + pinNumber + '_anim').css('opacity', 1);
	});
	mod['stopMusic'] = new Sk.builtin.func(function (pin) {
		let pinNumber = pin.v.replace('pin', '')
		$('#buzzer_' + pinNumber + '_value').html('OFF');
		$('#buzzer_' + pinNumber + '_anim').css('opacity', 0);
	});
	return mod;
};

Simulator.Behaviours.output.maqueen = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0],
		lineFinderLeft: 0,
		lineFinderRight: 0
	};
	mod['readLine'] = new Sk.builtin.func(function (pin) {
		if (pin.name == "13") { //left
			mod.data.lineFinderLeft = $("#mb-maqueen-finderLeft_value_v").html() == "ON" ? 0 : 1;
			return new Sk.builtin.bool(mod.data.lineFinderLeft);
		} else if (pin.name == "14") {
			mod.data.lineFinderRight = $("#mb-maqueen-finderRight_value_v").html() == "ON" ? 0 : 1;
			return new Sk.builtin.bool(mod.data.lineFinderRight);
		} else {
			UIManager.showErrorMessage("error-message", 'Attention, le suiveur de ligne est connecté aux broches P13/P14 de la Micro:bit');
		}
	});
	mod['playMusic'] = new Sk.builtin.func(function (music) {
		$('#mb-maqueen-buzzer_value').html(music.v);
		$('#mb-maqueen-buzzer_anim').css('opacity', 1);
	});
	mod['stopMusic'] = new Sk.builtin.func(function () {
		$('#mb-maqueen-buzzer_value').html('OFF');
		$('#mb-maqueen-buzzer_anim').css('opacity', 0);
	});
	mod['setServomotor'] = new Sk.builtin.func(function (servo, angle) {
		if (angle.v > 180 || angle.v < 0) {
			UIManager.showErrorMessage("error-message", 'L\'angle du servomoteur doit être compris entre 0 et 180');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (servo.v == 0x14) {
			$('#mb-maqueen-servo1_value').html(Math.round(angle.v));
			$('#mb-maqueen-servo1_anim').css("transform", "rotate(" + (angle.v) + "deg)");
		} else if (servo.v == 0x15) {
			$('#mb-maqueen-servo2_value').html(Math.round(angle.v));
			$('#mb-maqueen-servo2_anim').css("transform", "rotate(" + (angle.v) + "deg)");
		} else {
			// undefined
		}
	});
	mod['setMotor'] = new Sk.builtin.func(function (motor, direction, speed) {
		let s = speed.v
		if (s > 255 || mod.data < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 255');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (motor.v == 0) {
			mod.data.motorLeft[1] = s;
			if (mod.data.motorLeft[1] != 0) {
				mod.data.motorLeft[0] = direction.v == 0 ? 'forward' : 'backward';
			} else {
				mod.data.motorLeft[0] = 'stop';
			}
			$('#mb-maqueen-motorLeft_value').html(mod.data.motorLeft[1]);
			if (mod.data.motorLeft[0] != 'stop') {
				$('.mb-maqueen-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 255 * 133)) + 's infinite linear');
			} else {
				$('.mb-maqueen-motorLeft').css('animation', 'none');
			}
		} else {
			mod.data.motorRight[1] = s;
			if (mod.data.motorRight[1] != 0) {
				mod.data.motorRight[0] = direction.v == 0 ? 'forward' : 'backward';
			} else {
				mod.data.motorRight[0] = 'stop';
			}
			$('#mb-maqueen-motorRight_value').html(mod.data.motorRight[1]);
			if (mod.data.motorRight[0] != 'stop') {
				$('.mb-maqueen-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 255 * 133)) + 's infinite linear');
			} else {
				$('.mb-maqueen-motorRight').css('animation', 'none');
			}
		}
	});
	return mod;
};

Simulator.Behaviours.output.kitrobot = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0],
		lineFinderLeft: 0,
		lineFinderRight: 0
	};
	mod['readLine'] = new Sk.builtin.func(function (pin) {
		if (pin.name == "2") { //left
			mod.data.lineFinderLeft = $("#mb-kitrobot-finderLeft_value_v").html() == "ON" ? 1 : 0;
			return new Sk.builtin.bool(mod.data.lineFinderLeft);
		} else if (pin.name == "15") {
			mod.data.lineFinderRight = $("#mb-kitrobot-finderRight_value_v").html() == "ON" ? 1 : 0;
			return new Sk.builtin.bool(mod.data.lineFinderRight);
		} else {
			UIManager.showErrorMessage("error-message", 'Attention, le suiveur de ligne n\'est connecté aux broches P2/P15 de la Micro:bit');
		}
	});
	mod['setServoSpeed'] = new Sk.builtin.func(function (motor, direction, speed) {
		const s = speed.v;
		if (s > 100 || mod.data < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 100%');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (motor.name == 0) {
			mod.data.motorLeft[1] = s;
			if (mod.data.motorLeft[1] != 0) {
				mod.data.motorLeft[0] = direction.v == 1 ? 'forward' : 'backward';
			} else {
				mod.data.motorLeft[0] = 'stop';
			}
			$('#mb-kitrobot-motorLeft_value').html(`${mod.data.motorLeft[1]}%`);
			if (mod.data.motorLeft[0] != 'stop') {
				$('.mb-kitrobot-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 100 * 120)) + 's infinite linear');
			} else {
				$('.mb-kitrobot-motorLeft').css('animation', 'none');
			}
		} else {
			mod.data.motorRight[1] = s;
			if (mod.data.motorRight[1] != 0) {
				mod.data.motorRight[0] = direction.v == -1 ? 'forward' : 'backward';
			} else {
				mod.data.motorRight[0] = 'stop';
			}
			$('#mb-kitrobot-motorRight_value').html(`${mod.data.motorRight[1]}%`);
			if (mod.data.motorRight[0] != 'stop') {
				$('.mb-kitrobot-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 100 * 120)) + 's infinite linear');
			} else {
				$('.mb-kitrobot-motorRight').css('animation', 'none');
			}
		}
	});
	return mod;
};

Simulator.Behaviours.output.codo = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0]
	}
	mod['controlLeftMotor'] = new Sk.builtin.func(function (direction, speed) {
		mod.data.motorLeft[1] = speed.v;
		if (mod.data.motorLeft[1] > 1023 || mod.data.motorLeft[1] < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs CODO doit être comprise entre 0 et 1023');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (direction.v[0].v == 0 && direction.v[1].v == 1) {
			mod.data.motorLeft[0] = 'forward';
		} else if (direction.v[0].v == 1 && direction.v[1].v == 0) {
			mod.data.motorLeft[0] = 'backward';
		} else {
			mod.data.motorLeft[1] = 0;
			mod.data.motorLeft[0] = 'stop'
		}
		$('#mb-codo-motorLeft_value').html(mod.data.motorLeft[1]);
		if (mod.data.motorLeft[1] != 0) {
			$('.mb-codo-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 1023 * 200)) + 's infinite linear');
		} else {
			$('.mb-codo-motorLeft').css('animation', 'none');
		}

	});
	mod['controlRightMotor'] = new Sk.builtin.func(function (direction, speed) {
		mod.data.motorRight[1] = speed.v;
		if (mod.data.motorRight[1] > 1023 || mod.data.motorRight[1] < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs CODO doit être comprise entre 0 et 1023');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (direction.v[0].v == 0 && direction.v[1].v == 1) {
			mod.data.motorRight[0] = 'forward';
		} else if (direction.v[0].v == 1 && direction.v[1].v == 0) {
			mod.data.motorRight[0] = 'backward';
		} else {
			mod.data.motorRight[1] = 0;
			mod.data.motorRight[0] = 'stop'
		}
		$('#mb-codo-motorRight_value').html(mod.data.motorRight[1]);
		if (mod.data.motorRight[1] != 0) {
			$('.mb-codo-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 1023 * 200)) + 's infinite linear');
		} else {
			$('.mb-codo-motorRight').css('animation', 'none');
		}
	});
	return mod;
};

Simulator.Behaviours.output.oobybot = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 1],
		motorRight: ['forward', 1],
	}
	mod['oobybot_controlMotors'] = new Sk.builtin.func(function (motor, direction, speed) {
		let s = speed.v

		if (s > 100 || mod.data < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 100');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if ((motor.v = "pin2")) {
			mod.data.motorLeft[1] = s;
			if (mod.data.motorLeft[1] != 0) {
				mod.data.motorLeft[0] = direction.v == 1 ? 'forward' : 'backward';
			} else {
				mod.data.motorLeft[0] = 'stop';
			}
			$('#mb-oobybot-motorLeft_value').html(mod.data.motorLeft[1])
			if (mod.data.motorLeft[0] != 'stop') {
				$('.mb-oobybot-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 100 * 133)) + 's infinite linear');
			} else {
				$('.mb-oobybot-motorLeft').css('animation', 'none');
			}
		}
		if ((motor.v = "pin1")) {
			mod.data.motorRight[1] = s;
			if (mod.data.motorRight[1] != 0) {
				mod.data.motorRight[0] = direction.v == 1 ? 'forward' : 'backward';
			} else {
				mod.data.motorRight[0] = 'stop';
			}
			$('#mb-oobybot-motorRight_value').html(mod.data.motorRight[1]);
			if (mod.data.motorRight[0] != 'stop') {
				$('.mb-oobybot-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 100 * 133)) + 's infinite linear');
			} else {
				$('.mb-oobybot-motorRight').css('animation', 'none');
			}
		}
	});
	return mod;
};


Simulator.Behaviours.output.buggy = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0]
	}
	mod['setLeftMotorSpeed'] = new Sk.builtin.func(function (speed) {
		if (speed.v < 0) {
			mod.data.motorLeft[0] = 'backward';
			mod.data.motorLeft[1] = Math.abs(speed.v);
		}
		else if (speed.v > 0) {
			mod.data.motorLeft[0] = 'forward';
			mod.data.motorLeft[1] = Math.abs(speed.v);
		}
		else {
			mod.data.motorLeft[1] = 0;
			mod.data.motorLeft[0] = 'stop'
		}
		if (mod.data.motorLeft[1] > 1023) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs BUGGY doit être inférieur à 1023');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		$('#mb-buggy-motorLeft_value').html(mod.data.motorLeft[1]);
		if (mod.data.motorLeft[1] != 0) {
			$('.mb-buggy-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-buggy-motorLeft').css('animation', 'none');
		}

	});
	mod['setRightMotorSpeed'] = new Sk.builtin.func(function (speed) {
		if (speed.v < 0) {
			mod.data.motorRight[0] = 'backward';
			mod.data.motorRight[1] = Math.abs(speed.v);
		}
		else if (speed.v > 0) {
			mod.data.motorRight[0] = 'forward';
			mod.data.motorRight[1] = Math.abs(speed.v);
		}
		else {
			mod.data.motorRight[1] = 0;
			mod.data.motorRight[0] = 'stop'
		}
		if (mod.data.motorRight[1] > 1023) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs BUGGY doit être inférieur à 1023');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		$('#mb-buggy-motorRight_value').html(mod.data.motorRight[1]);
		if (mod.data.motorRight[1] != 0) {
			$('.mb-buggy-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-buggy-motorRight').css('animation', 'none');
		}
	});
	mod['stopMotors'] = new Sk.builtin.func(function () {
		$('#mb-buggy-motorRight_value').html(mod.data.motorRight[1]);
		if (mod.data.motorRight[1] != 0) {
			$('.mb-buggy-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-buggy-motorRight').css('animation', 'none');
		}
		$('#mb-buggy-motorLeft_value').html(mod.data.motorLeft[1]);
		if (mod.data.motorLeft[1] != 0) {
			$('.mb-buggy-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-buggy-motorLeft').css('animation', 'none');
		}
	});
	return mod;
};

Simulator.Behaviours.output.bitbot = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0]
	}
	mod['setMotorLeftDir'] = new Sk.builtin.func(function (direction) {
		mod.data.motorLeft[0] = direction.v ? 'backward' : 'forward';
	});
	mod['setMotorLeftSpeed'] = new Sk.builtin.func(function (speed) {
		mod.data.motorLeft[1] = speed.v;
		$('#mb-bitbot-motorLeft_value').html(mod.data.motorLeft[1]);
		if (mod.data.motorLeft[1] != 0) {
			$('.mb-bitbot-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-bitbot-motorLeft').css('animation', 'none');
		}
	});
	mod['setMotorRightDir'] = new Sk.builtin.func(function (direction) {
		mod.data.motorRight[0] = direction.v ? 'backward' : 'forward';
	});
	mod['setMotorRightSpeed'] = new Sk.builtin.func(function (speed) {
		mod.data.motorRight[1] = speed.v;
		$('#mb-bitbot-motorRight_value').html(mod.data.motorRight[1]);
		if (mod.data.motorRight[1] != 0) {
			$('.mb-bitbot-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 1023 * 133)) + 's infinite linear');
		} else {
			$('.mb-bitbot-motorRight').css('animation', 'none');
		}
	});
	return mod;
};

Simulator.Behaviours.output.bitcar = function () {
	const mod = Object.create(null);
	mod.data = {
		motorLeft: ['forward', 0],
		motorRight: ['forward', 0],
		lineFinderLeft: 0,
		lineFinderRight: 0
	};
	mod['readLine'] = new Sk.builtin.func(function (pin) {
		if (pin.name == "1") { //left
			mod.data.lineFinderLeft = $("#mb-bitcar-finderLeft_value_v").html() == "ON" ? 1 : 0;
			return new Sk.builtin.bool(mod.data.lineFinderLeft);
		} else if (pin.name == "2") {
			mod.data.lineFinderRight = $("#mb-bitcar-finderRight_value_v").html() == "ON" ? 1 : 0;
			return new Sk.builtin.bool(mod.data.lineFinderRight);
		} else {
			UIManager.showErrorMessage("error-message", 'Attention, le suiveur de ligne n\'est connecté aux broches P1/P2 de la Micro:bit');
		}
	});
	mod['setBitCarServoSpeed'] = new Sk.builtin.func(function (motorBackward, motorForward, direction, speed) {
		const s = speed.v;
		if (s > 100 || mod.data < 0) {
			UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 100%');
		} else {
			if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
				UIManager.resetMessage("error-message");
			}
		}
		if (motorBackward.name == 13 || motorBackward.name == 14) {
			mod.data.motorLeft[1] = s;
			if (mod.data.motorLeft[1] != 0) {
				mod.data.motorLeft[0] = direction.v == 1 ? 'forward' : 'backward';
			} else {
				mod.data.motorLeft[0] = 'stop';
			}
			$('#mb-bitcar-motorLeft_value').html(`${mod.data.motorLeft[1]}%`);
			if (mod.data.motorLeft[0] != 'stop') {
				$('.mb-bitcar-motorLeft').css('animation', 'rotation-' + mod.data.motorLeft[0] + ' ' + (60 / (Math.abs(mod.data.motorLeft[1]) / 100 * 120)) + 's infinite linear');
			} else {
				$('.mb-bitcar-motorLeft').css('animation', 'none');
			}
		} else if (motorBackward.name == 15 || motorBackward.name == 16) {
			mod.data.motorRight[1] = s;
			if (mod.data.motorRight[1] != 0) {
				mod.data.motorRight[0] = direction.v == -1 ? 'forward' : 'backward';
			} else {
				mod.data.motorRight[0] = 'stop';
			}
			$('#mb-bitcar-motorRight_value').html(`${mod.data.motorRight[1]}%`);
			if (mod.data.motorRight[0] != 'stop') {
				$('.mb-bitcar-motorRight').css('animation', 'rotation-' + mod.data.motorRight[0] + ' ' + (60 / (Math.abs(mod.data.motorRight[1]) / 100 * 120)) + 's infinite linear');
			} else {
				$('.mb-bitcar-motorRight').css('animation', 'none');
			}
		}
	});
	return mod;
};

Simulator.Behaviours.output.gamepad_out = function () {
	const mod = Object.create(null);
	mod.data = {
		led: 0,
		vibration: 0
	};
	mod['setLED'] = new Sk.builtin.func(function (state) {
		mod.data.led = state.v;
		$('#mb-gamepad-led_value').html(state.v == 0 ? "OFF" : "ON");
		$('#mb-gamepad-led_anim').css('opacity', mod.data.led);
	});
	mod['setVibration'] = new Sk.builtin.func(function (state) {
		mod.data.vibration = state.v;
		$('#mb-gamepad-vibration_value').html(state.v == 0 ? "OFF" : "ON");
		$('#mb-gamepad-vibration_anim').css('opacity', mod.data.vibration);
	});
	return mod;
};

Simulator.Behaviours.output.gamepad_v4_out = function () {
	const mod = Object.create(null);
	mod.data = {
		led: 0,
		vibration: 0
	};
	mod['setLEDandVibration'] = new Sk.builtin.func(function (state) {
		mod.data.led = state.v;
		$('#mb-gamepad-v4-led_value').html(state.v == 0 ? "OFF" : "ON");
		$('#mb-gamepad-v4-led_anim').css('opacity', mod.data.led);
		mod.data.vibration = state.v;
		$('#mb-gamepad-v4-vibration_value').html(state.v == 0 ? "OFF" : "ON");
		$('#mb-gamepad-v4-vibration_anim').css('opacity', mod.data.vibration);
	});
	return mod;
};