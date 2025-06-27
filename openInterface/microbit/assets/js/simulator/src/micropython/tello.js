// micro:bit - tello module

var $builtinmodule = function (name) {
	var tello = {};
	var took_off = false;
	let BATTERY = null;
	let BATTERY_LIFE_TIME = 60*6;
	Simulator.Mosaic.specific.tello.isConnected = false;

	tello.__name__ = new Sk.builtin.str('tello');

	const batteryLevel = function (time) {
		const elapsed = time - BATTERY;
		const battery = 100 - (elapsed / BATTERY_LIFE_TIME) * 100;
		return battery.toFixed(0) >= 0? battery.toFixed(0): 0;
	};

	const move = function (dir, distance) {
		const busy = Simulator.Mosaic.specific.tello.isBusy;
		if (busy) return;
		if (distance !== undefined) {
			if (Sk.builtin.checkNumber(distance)) {
				if (distance < 20 || distance > 500) {
					Simulator.Mosaic.specific.tello.showTelloError("'" + distance + "' Distance invalide.", 'Invalid distance.', 'TelloError');
				} else {
					Simulator.Mosaic.specific.tello.storedMovements.push([dir, distance]);
				}
			} else {
				Simulator.Mosaic.specific.tello.showTelloError("'" + distance + "' Distance invalide.", "can't convert 'int' object to " + Sk.abstr.typeName(distance), 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.tello.storedMovements.push([dir, 80]);
		}
		Simulator.Mosaic.specific.tello.startRunning();
	};

	const turn = function (dir, angle) {
		const busy = Simulator.Mosaic.specific.tello.isBusy;
		if (busy) return;
		if (angle !== undefined) {
			if (Sk.builtin.checkInt(angle)) {
				if (angle >= 0 && angle <= 360) {
					Simulator.Mosaic.specific.tello.storedMovements.push([dir, angle]);
				} else {
					Simulator.Mosaic.specific.tello.showTelloError("'" + angle + "' Angle invalide.", 'Invalid angle.', 'TelloError');
				}
			} else {
				Simulator.Mosaic.specific.tello.showTelloError("'" + angle + "' Angle invalide.", "unknown format code 'f' for object of type " + Sk.abstr.typeName(distance), 'ValueError');
			}
		} else {
			Simulator.Mosaic.specific.tello.storedMovements.push([dir, 90]);
		}
		Simulator.Mosaic.specific.tello.startRunning();
	};


	// need to implement flip commands
	tello.Tello = new Sk.misceval.buildClass(tello, function ($gbl, $loc) {
		Tello__init__ = function (self, pinTX, pinRX, SSID) {
			Sk.builtin.pyCheckArgsLen('__init__', arguments.length, 2, 4);
			Sk.builtin.pyCheckType('SSID', 'string', Sk.builtin.checkString(SSID));
			self.pinTX = pinTX.name;
			self.pinRX = pinRX.name;
			self.SSID = SSID.v;
		};

		Tello__init__.co_varnames = ['self', 'pinTX', 'pinRX', 'SSID'];
		Tello__init__.$defaults = [new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.str('')];

		$loc.__init__ = new Sk.builtin.func(Tello__init__);

		$loc.drone_init = new Sk.builtin.func(function (self) {
			tello.connection = new Sk.builtin.bool(true);
			Simulator.Mosaic.specific.tello.isConnected = true;
		});

		$loc.send_cmd = new Sk.builtin.func(function (self, cmd) {
			if (!Simulator.Mosaic.specific.tello.isConnected) {
				Simulator.Mosaic.specific.tello.showTelloError(`${jsonPath('modals.simulator.robots.telloError')}`, `${jsonPath('modals.simulator.robots.telloMissingConnection')}`, 'TelloError');
				return;
			}
			return Sk.misceval.promiseToSuspension(new Promise(function (resolve){
				(function waitForNotBusy() {
					
					const busy = Simulator.Mosaic.specific.tello.isBusy;
					// check if the Tello is busy
					if (!busy) {
						// resolve if not busy
						resolve();
					} else {
						// recursively call waitForNotBusy until not busy => maybe need to adjust the timeout, (not working properly for button_a.is_pressed())
						setTimeout(waitForNotBusy, 5);
					}
				})();
			}).then(function () {
				const cmdSplit = cmd.v.split(' ');
				const direction = cmdSplit[0];
				const value = cmdSplit[1] ? isNaN(cmdSplit[1])? cmdSplit[1] : Number(cmdSplit[1]) : undefined;
				if (value !== undefined) {
					if (!took_off) {
						Simulator.Mosaic.specific.tello.showTelloError("le drone n'a pas encore décollé" + '<br>' + "Veuillez ajouter l'instruction '[Tello] Faire décoller le drone'", `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
					};
					switch (direction) {
						case 'forward':
							RobotSimulator.robot.DIRECTION = direction;
							move(direction, value);
							break;
						case 'backward':
							RobotSimulator.robot.DIRECTION = direction;
							move(direction, value);
							break;
						case 'right':
							RobotSimulator.robot.DIRECTION = direction;
							move('fly_right', value);
							break;
						case 'left':
							RobotSimulator.robot.DIRECTION = direction;
							move('fly_left', value);
							break;
						case 'up':
							RobotSimulator.robot.DIRECTION = direction;
							move(direction, value);
							break;
						case 'down':
							RobotSimulator.robot.DIRECTION = direction;
							move(direction, value);
							break;
						case 'cw':
							turn('right', value);
							break;
						case 'ccw':
							turn('left', value);
							break;
						case 'flip':
							move(`${direction}_${value}`, 20);
							break;
					};
				} else {
					switch (direction) {
						case 'takeoff':
							took_off = true;
							const direction = 'up';
							RobotSimulator.robot.DIRECTION = direction;
							BATTERY = new Date().getTime() / 1000;
							move(direction, new Sk.builtin.int_(100));
							break;
						case 'land':
							if (took_off) {
								const direction = 'land';
								RobotSimulator.robot.DIRECTION = direction;
								move(direction, new Sk.builtin.int_(100));
							} else {
								Simulator.Mosaic.specific.tello.showTelloError(`${jsonPath('modals.simulator.robots.telloError')}` + '<br>' + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
							}
							break;
						case "emergency":
							if (took_off) {
								const direction = 'land';
								RobotSimulator.robot.DIRECTION = direction;
								move(direction, new Sk.builtin.int_(100));
							} else {
								Simulator.Mosaic.specific.tello.showTelloError(`${jsonPath('modals.simulator.robots.telloError')}` + '<br>' + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
							}
							break;
						case 'stop':
							return Sk.builtin.none();
						case 'streamon':
							return Sk.builtin.none();
						case 'streamoff':
							return Sk.builtin.none();
						case 'battery?':
							return new Sk.builtin.str(batteryLevel(new Date().getTime() / 1000)+"%");
						case 'speed?':
							return new Sk.builtin.str("20 cm/s");
					}
				}
			})
		)});
		
	}, 'Tello', []);

	return tello;
};
