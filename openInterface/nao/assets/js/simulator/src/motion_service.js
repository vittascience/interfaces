var $builtinmodule = function () {
	const motion_service = {};
	const naoSimulator = window.Simulator3D;

	Simulator.pause();

	const mapPose = {
		"Yeah": [0,0,-1.33,0.26,-0.58,0,0,1,-1.31,-0.9,1.4,0.21,0,0],
		"HandsOnhips": [0,0,1.30,0.62,-1.43,0,0,0,1.30,-0.62,1.42,0,0,0],
		"ScanningHorizon": [0,0,-0.966,0.386,-1.544,0.224,-1.064,1,1.6,-0.32,0.36,0,0,0],
		"Relaxed": [0,0,1.39,0.27,-0.53,0,0,0,1.52,-0.24,0.37,0,0,0],
		"TPose": [0,0,0,1.326,-0.0349,-1.44,0,0,0,-1.326,0.035,1.4,0,0],
	};

	

	const checkReady = async () => {
		return new Promise((resolve) => {
			let READY = naoSimulator.checkIsReady();
			if (READY) {
				naoSimulator.isRunning = false;
				// naoSimulator.reset();
				Simulator.play();
				resolve();
			} else {
				setTimeout(() => {
					checkReady();
				}, 2000);
			}
		});
	};

	checkReady();
	let position = "stand";

	motion_service.__name__ = new Sk.builtin.str('motion_service');

	const openHand = (hand) => {
		const handValue = hand.v === 'LHand' ? 'left' : 'right';
		const poll = async (resolve, reject) => {
			naoSimulator.isRunning = true;
			await naoSimulator.openHand(handValue, 'open');
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	};

	motion_service.openHand = new Sk.builtin.func(openHand);

	const closeHand = (hand) => {
		const handValue = hand.v === 'LHand' ? 'left' : 'right';
		const poll = async (resolve, reject) => {
			naoSimulator.isRunning = true;
			await naoSimulator.openHand(handValue, 'close');
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	};

	motion_service.closeHand = new Sk.builtin.func(closeHand);

	const moveTo = (x, y, theta) => {
		const direction = x.v < 0 ? 'backward' : 'forward';
		const rotation = theta.v > 0 ? 'ccw' : 'cw';
		const xValue = x.v;
		const yValue = y.v;
		const thetaValue = (theta.v * 180) / Math.PI;
		const straight = xValue !== 0 && yValue === 0 && thetaValue === 0;
		const turnOnly = xValue === 0 && yValue === 0 && thetaValue !== 0;
		const poll = async (resolve, reject) => {
			naoSimulator.isRunning = true;
			if (straight) {
				const value = Math.abs(Math.floor(xValue / 10));
				await naoSimulator.walkStraightAnimation(direction, value);
			} else if (turnOnly) {
				const angle = Math.abs(Math.ceil(thetaValue / 22.5));
				await naoSimulator.turnAnimation(rotation, angle, thetaValue);
			}
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};

		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	};

	motion_service.moveTo = new Sk.builtin.func(moveTo);

	const goToPosture = (p, s) => {
		const speedValue = s.v/100;
		let postureValue = p.v.toLowerCase();
		if (postureValue === 'crouch') {
			postureValue = 'sit';
		}
		position = postureValue;
		const poll = async (resolve, reject) => {
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
			await naoSimulator.posture(postureValue, speedValue);
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	};

	motion_service.goToPosture = new Sk.builtin.func(goToPosture);


	const pose = (p) => {
		const poseValue = mapPose[p.v];
		const poll = async (resolve, reject) => {
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
			if (naoSimulator.naoPose === 'sit'){
				await naoSimulator.posture('stand', 1);
				position = 'stand';
			}
			await naoSimulator.setAngles("upperBoddy", poseValue);
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	};

	motion_service.pose = new Sk.builtin.func(pose);


	const setAngles = (part, angles) => {
		const partValue = part.v;
		const anglesValue = Sk.ffi.remapToJs(angles)

		const poll = async (resolve, reject) => {
			if (naoSimulator.resetFlag) {
				resolve();
			}
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
			if (naoSimulator.naoPose === 'sit'){
				await naoSimulator.posture('stand', 1);
				position = 'stand';
			}
			await naoSimulator.setAngles(partValue, anglesValue);
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	}

	motion_service.setAnglesRad = new Sk.builtin.func(setAngles);

	const setAnglesDeg = (part, angles) => {
		const partValue = part.v;
		const anglesDeg = Sk.ffi.remapToJs(angles)
		const anglesValue = anglesDeg.map((angle, index) => index === anglesDeg.length -1 ? angle: angle * (Math.PI / 180));

		const poll = async (resolve, reject) => {
			if (naoSimulator.resetFlag) {
				resolve();
			}
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
			if (naoSimulator.naoPose === 'sit'){
				await naoSimulator.posture('stand', 1);
				position = 'stand';
			}
			await naoSimulator.setAngles(partValue, anglesValue);
			setTimeout(() => {
				naoSimulator.isRunning = false;
				resolve();
			}, 100);
		};
		return new Sk.misceval.promiseToSuspension(
			new Promise(poll).then(() => {
				return new Sk.builtin.none();
			})
		);
	}

	motion_service.setAnglesDeg = new Sk.builtin.func(setAnglesDeg);

	return motion_service;
};
