// to do if standalone simulation possible

var $builtinmodule = function () {
	var niryo = {};
	let COUNTER = 0;
	niryo.__name__ = new Sk.builtin.str('niryo');

	let niryoSimulator = window.Simulator3D;
	clearInterval(niryoSimulator.intervalLed);

	// check if roslib is connected => maybe to update
	const isConnectedToRos = niryoSimulator.checkIsRoslibConnected();
	if (!isConnectedToRos) {
		try {
			niryoSimulator.rosConnection.init();
		} catch (error) {
			console.error(error);
		}
	}
	Simulator.pause();

	const checkReady = async () => {
		return new Promise((resolve) => {
			let READY = niryoSimulator.checkIsReady();
			if (READY) {
				Simulator.play();
				niryoSimulator.led_ring_pulse('#00ff00', false);
				resolve();
			} else {
				setTimeout(() => {
					checkReady();
				}, 2000);
			}
		});
	};

	checkReady();

	niryo.ShiftPose = new Sk.misceval.buildClass(niryo, function ($gbl, $loc) {
		$loc.AXIS_X = new Sk.builtin.int_(0);
		$loc.AXIS_Y = new Sk.builtin.int_(1);
		$loc.AXIS_Z = new Sk.builtin.int_(2);
		$loc.ROT_ROLL = new Sk.builtin.int_(3);
		$loc.ROT_PITCH = new Sk.builtin.int_(4);
		$loc.ROT_YAW = new Sk.builtin.int_(5);
	});

	niryo.NiryoRosWrapper = new Sk.misceval.buildClass(niryo, function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function (self) {
			Sk.builtin.pyCheckArgsLen('__init__', arguments.length, 1, 1);
		});

		$loc.calibrate_auto = new Sk.builtin.func(function (self) {
			return new Sk.builtin.none();
		});

		$loc.move_joints = new Sk.builtin.func(function (self, j1, j2, j3, j4, j5, j6) {
			if (niryoSimulator.isRunning) return;
			const poll = async (resolve, reject) => {
				niryoSimulator.isRunning = true;
				await niryoSimulator.sendTrajectory([j1.v, j2.v, j3.v, j4.v, j5.v, j6.v]);
				setTimeout(() => {
					niryoSimulator.isRunning = false;
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.move_to_sleep_pose = new Sk.builtin.func(function (self) {
			if (niryoSimulator.isRunning) return;
			const poll = async (resolve, reject) => {
				niryoSimulator.isRunning = true;
				await niryoSimulator.sendTrajectory([0, 0.5, -1.249, 0, 0, 0]);
				setTimeout(() => {
					niryoSimulator.isRunning = false;
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.move_pose = new Sk.builtin.func(function (self, x, y, z, roll, pitch, yaw) {
			const poll = async (resolve, reject) => {
				const pose = await niryoSimulator.computeInverseKinematics([x.v, y.v, z.v, roll.v, pitch.v, yaw.v]);
				await niryoSimulator.sendTrajectory(pose);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.move_linear_pose = new Sk.builtin.func(function (self, x, y, z, roll, pitch, yaw) {
			const poll = async (resolve, reject) => {
				await niryoSimulator.computeInverseKinematics([x.v, y.v, z.v, roll.v, pitch.v, yaw.v]);
				const pose = [x.v, y.v, z.v, roll.v, pitch.v, yaw.v];
				await niryoSimulator.sendTrajectory(pose, true);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.shift_pose = new Sk.builtin.func(function (self, axis, value) {
			const poll = async (resolve, reject) => {
				const joints = await niryoSimulator.getRotation();
				const pose = await niryoSimulator.computeForwardKinematics(joints);
				pose[axis.v] += value.v;
				const newJoints = await niryoSimulator.computeInverseKinematics(pose);
				await niryoSimulator.sendTrajectory(newJoints);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.shift_linear_pose = new Sk.builtin.func(function (self, axis, value) {
			const poll = async (resolve, reject) => {
				const joints = await niryoSimulator.getRotation();
				const pose = await niryoSimulator.computeForwardKinematics(joints);
				pose[axis.v] += value.v;
				await niryoSimulator.sendTrajectory(pose, true);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.open_gripper = new Sk.builtin.func(function (self, s) {
			const speed = (600 - s.v) / 1000;
			const poll = async (resolve, reject) => {
				await niryoSimulator.openGripper(speed);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		$loc.close_gripper = new Sk.builtin.func(function (self, s) {
			const speed = (600 - s.v) / 1000;
			const poll = async (resolve, reject) => {
				await niryoSimulator.closeGripper(speed);
				setTimeout(() => {
					resolve();
				}, 100);
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		const led_ring_solid = function (self, rgb, wait) {
			Sk.builtin.pyCheckArgsLen('led_ring_solid', arguments.length, 3, 3);
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);

			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_anim(colorReceived);

				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_solid.co_varnames = ['self', 'rgb', 'wait'];
		led_ring_solid.$defaults = [new Sk.builtin.str('all')];

		$loc.led_ring_solid = new Sk.builtin.func(led_ring_solid);

		const led_ring_flashing = function (self, rgb, period, iteration, wait) {
			Sk.builtin.pyCheckArgsLen('led_ring_flashing', arguments.length, 3, 5);
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const doWait = wait.v;
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_flashing(colorReceived, period.v, iteration.v, wait.v);
				if (doWait) {
					setTimeout(() => {
						resolve();
					}, (period.v * iteration.v * 1000) / 2);
				} else {
					resolve();
				}
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_flashing.co_varnames = ['self', 'rgb', 'period', 'iterations', 'wait'];
		led_ring_flashing.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_flashing = new Sk.builtin.func(led_ring_flashing);

		const led_ring_chase = function (self, rgb, period, iteration, wait) {
			Sk.builtin.pyCheckArgsLen('led_ring_chase', arguments.length, 3, 5);
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const doWait = wait.v;
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_chase(colorReceived, period.v, iteration.v, doWait);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_chase.co_varnames = ['self', 'rgb', 'period', 'iterations', 'wait'];
		led_ring_chase.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_chase = new Sk.builtin.func(led_ring_chase);

		$loc.led_ring_set_led_color = new Sk.builtin.func(function (self, led, rgb) {
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_set_led(led.v, colorReceived);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		});

		// specific to niryo simulation in vittascience (not in niryo_ros_wrapper)
		$loc.end_of_program = new Sk.builtin.func(function () {
			niryoSimulator.simulationEnded = true;
			niryoSimulator.led_ring_pulse(false, true);
			return new Sk.builtin.none();
		});

		const led_ring_wipe = function (self, rgb, period, wait) {
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const doWait = wait.v;
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_wipe(colorReceived, period.v, doWait);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_wipe.co_varnames = ['self', 'rgb', 'period', 'wait'];
		led_ring_wipe.$defaults = [new Sk.builtin.str('all')];

		$loc.led_ring_wipe = new Sk.builtin.func(led_ring_wipe);

		const led_ring_rainbow = function (self, period, iteration, wait) {
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_rainbow_pattern(period.v, iteration.v, wait.v);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_rainbow.co_varnames = ['self', 'period', 'iterations', 'wait'];
		led_ring_rainbow.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_rainbow = new Sk.builtin.func(led_ring_rainbow);

		const led_ring_rainbow_cycle = function (self, period, iteration, wait) {
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_rainbow_cycle(period.v, iteration.v, wait.v);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_rainbow_cycle.co_varnames = ['self', 'period', 'iterations', 'wait'];
		led_ring_rainbow_cycle.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_rainbow_cycle = new Sk.builtin.func(led_ring_rainbow_cycle);

		const led_ring_go_up = function (self, rgb, period, iteration, wait) {
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_go_up(colorReceived, period.v, iteration.v, wait.v);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_go_up.co_varnames = ['self', 'rgb', 'period', 'iterations', 'wait'];
		led_ring_go_up.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_go_up = new Sk.builtin.func(led_ring_go_up);

		const led_ring_go_up_down = function (self, rgb, period, iteration, wait) {
			const color = Sk.ffi.remapToJs(rgb);
			const colorReceived = '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
			const poll = async (resolve, reject) => {
				await niryoSimulator.led_ring_up_down(colorReceived, period.v, iteration.v, wait.v);
				resolve();
			};
			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then(() => {
					return new Sk.builtin.none();
				})
			);
		};

		led_ring_go_up_down.co_varnames = ['self', 'rgb', 'period', 'iterations', 'wait'];
		led_ring_go_up_down.$defaults = [new Sk.builtin.str('all')];
		$loc.led_ring_go_up_down = new Sk.builtin.func(led_ring_go_up_down);


		// Conveyor
		$loc.set_conveyor = new Sk.builtin.func(function (self) {
			return new Sk.builtin.none();
		});

		$loc.get_conveyor_id = new Sk.builtin.func(function (self, conveyorId) {
			let conveyorIdValue;
			switch (conveyorId.v) {
				case 'ID_1':
					conveyorIdValue = 1;
					break;
				case 'ID_2':
					conveyorIdValue = 2;
					break;
				default:
					throw new Sk.builtin.ValueError("Invalid conveyor ID");
			}
			return new Sk.builtin.int_(conveyorIdValue);
		});

		$loc.get_sensor_pin_id = new Sk.builtin.func(function (self, pinId) {
			return new Sk.builtin.none();
		});

		$loc.control_conveyor = new Sk.builtin.func(function (self, conveyorId, isRunning, speed, direction) {
			const speedValue = Sk.ffi.remapToJs(speed);
			const directionValue = Sk.ffi.remapToJs(direction);
			let speedConveyor
			switch (directionValue) {
				case 'FORWARD':
					speedConveyor = speedValue;
					break;
				case 'BACKWARD':
					speedConveyor = -speedValue;
					break;
				default:
					speedConveyor = 0;
					break;
			}
			Simulator.setSliderValue('conveyor', speedConveyor);
			
			return new Sk.builtin.none();
		});

		$loc.digital_read = new Sk.builtin.func(function (self, pinId) {
			return new Sk.builtin.bool(true); // Simulate always true for IR sensor
		});

		$loc.get_pin_state = new Sk.builtin.func(function (self, pinState) {
			let state;
			const buttonState = Simulator.getSliderValue('irSensor');
			switch (pinState.v) {
				case 'HIGH':
					state = buttonState === 1 ? true : false;
					break;
				case 'LOW':
					state = buttonState === 0 ? true : false;
					break;
				default:
					throw new Sk.builtin.ValueError("Invalid pin state");
			}
			return new Sk.builtin.bool(state);
		});

		$loc.unset_conveyor = new Sk.builtin.func(function (self, conveyorId) {
			Simulator.setSliderValue('conveyor', 0);
			return new Sk.builtin.none();
		});
	});

	

	return niryo;
};
