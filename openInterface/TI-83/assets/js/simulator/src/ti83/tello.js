// TI-83 Premium CE - tello module

var $builtinmodule = function (name) {

	var tello = {};
	var took_off = false;

	tello.__name__ = new Sk.builtin.str('tello');

	const move = function (dir, distance) {
		if (distance !== undefined) {
			if (Sk.builtin.checkNumber(distance)) {
				if (distance.v < 20 || distance.v > 500) {
					Simulator.Mosaic.specific.ti.showError("\'" + distance.v + "\' Distance invalide.", "Invalid distance.", 'TelloError');
				} else {
					Simulator.Mosaic.specific.tello.storedMovements.push([dir, distance.v]);
				}
			} else {
				Simulator.Mosaic.specific.ti.showError("\'" + distance.v + "\' Distance invalide.", "can't convert 'int' object to " + Sk.abstr.typeName(distance), 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.tello.storedMovements.push([dir, 80]);
		}
		Simulator.Mosaic.specific.tello.startRunning();
	};

	const turn = function (dir, angle) {
		if (angle !== undefined) {
			if (Sk.builtin.checkInt(angle)) {
				if (angle.v >= 0 && angle.v <= 360) {
					Simulator.Mosaic.specific.tello.storedMovements.push([dir, angle.v]);
				} else {
					Simulator.Mosaic.specific.ti.showError("\'" + angle.v + "\' Angle invalide.", "Invalid angle.", 'TelloError');
				}
			} else {
				Simulator.Mosaic.specific.ti.showError("\'" + angle.v + "\' Angle invalide.", "unknown format code \'f\' for object of type " + Sk.abstr.typeName(distance), 'ValueError');
			}
		} else {
			Simulator.Mosaic.specific.tello.storedMovements.push([dir, 90]);
		}
		Simulator.Mosaic.specific.tello.startRunning();
	};

	var drone = new Sk.misceval.buildClass(tello, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) { });

		$loc.takeoff = new Sk.builtin.func(async function (self) {
			took_off = true;
			const direction = "up";
			RobotSimulator.robot.DIRECTION = direction;
			move(direction, new Sk.builtin.int_(100));
		});

		$loc.land = new Sk.builtin.func(async function (self) {
			if (took_off) {
				const direction = "land";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, new Sk.builtin.int_(100));
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		});

		var forward = async function (self, distance) {
			if (took_off) {
				const direction = "forward";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, distance);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		};
		forward.co_varnames = ['self', 'distance'];
		$loc.forward = new Sk.builtin.func(forward);

		var backward = async function (self, distance) {
			if (took_off) {
				const direction = "backward";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, distance);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		};
		backward.co_varnames = ['self', 'distance'];
		$loc.backward = new Sk.builtin.func(backward);

		$loc.turn_right = new Sk.builtin.func(async function (self, angle) {
			if (took_off)
				turn('right', angle);
			else
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
		});

		$loc.turn_left = new Sk.builtin.func(async function (self, angle) {
			if (took_off)
				turn('left', angle);
			else
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
		});

		$loc.up = new Sk.builtin.func(async function (self, height) {
			if (took_off) {
				const direction = "up";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, height);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		});

		$loc.down = new Sk.builtin.func(function (self, height) {
			if (took_off) {
				const direction = "down";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, height);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		});

		$loc.fly_right = new Sk.builtin.func(function (self, distance) {
			if (took_off) {
				const direction = "fly_right";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, distance);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		});

		$loc.fly_left = new Sk.builtin.func(function (self, distance) {
			if (took_off) {
				const direction = "fly_left";
				RobotSimulator.robot.DIRECTION = direction;
				move(direction, distance);
			} else {
				Simulator.Mosaic.specific.ti.showError(`${jsonPath('modals.simulator.robots.telloError')}` + "<br>" + `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, `${jsonPath('modals.simulator.robots.telloMissingInstruction')}`, 'TelloError');
			}
		});

		$loc.altitude = new Sk.builtin.func(function (self) {
			const altitude = parseInt($('#tello-altitude_value_d').html());
			return new Sk.builtin.int_(altitude);
		});

	}, "DroneObject", []);

	tello.tello = new drone();

	return tello;
};