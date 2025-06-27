// BuddySDK module
var $builtinmodule = function () {

	var sdk = {};

	const LED_POSITION = {
		'0': 'shoulder', //droite 
		'1': 'shoulder-2', //gauche
		'2': ['circle_b', 'b-2'] //coeur
	};

	var blinkAllLedInterval = true;

	// Conduire

	const move = function (dir, speed, distance = undefined) {
		if (distance !== undefined && speed != undefined) {
			if (Sk.builtin.checkNumber(distance) && Sk.builtin.checkNumber(speed)) {
				if (distance.v < 0) {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + distance.v + "\' Distance invalide.");
				} else if (Math.abs(speed.v) > 0.7) {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -0.7 et 0.7.");
				} else {
					Simulator.Mosaic.specific.buddy.storedMovements.push([dir, distance.v * 100, speed.v]);
				}
			} else {
				UIManager.showErrorMessage("error-message", "\'" + distance.v + "-" + speed.v + "\' Distance ou vitesse invalide. Mauvais type");
			}
		} else if (distance === undefined && speed != undefined) {
			if (Math.abs(speed.v) > 0.7)
				UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -0.7 et 0.7.");
			else
				Simulator.Mosaic.specific.buddy.storedMovements.push([dir, 0, speed.v]);
		} else {
			Simulator.Mosaic.specific.buddy.storedMovements.push([dir, 80, 0.5]);
		}
		Simulator.Mosaic.specific.buddy.startRunning();
	};

	const turn = function (dir, angle, speed) {
		if (angle !== undefined && speed != undefined) {
			if (Sk.builtin.checkNumber(angle) && Sk.builtin.checkNumber(speed)) {
				if (Math.abs(angle.v) <= 360 && Math.abs(speed.v) <= 360) {
					Simulator.Mosaic.specific.buddy.storedMovements.push([dir, angle.v, speed.v]);
				} else {
					if (Math.abs(angle.v) > 360)
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + angle.v + "\' L'angle doit être compris entre -360 et +360.");
					else
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -360°/s et +360°/s.");
				}
			} else {
				UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + angle.v + "-" + speed.v + "\' Angle invalide. Mauvais type.");
			}
		} else {
			Simulator.Mosaic.specific.buddy.storedMovements.push([dir, 90]);
		}
		Simulator.Mosaic.specific.buddy.startRunning();
	};

	const rotate = function (dir, speed) {
		if (speed !== undefined) {
			if (Sk.builtin.checkNumber(speed)) {
				if (Math.abs(speed.v) <= 100 && Math.abs(speed.v) >= 30) {
					Simulator.Mosaic.specific.buddy.storedMovements.push([dir, Math.abs(speed.v)]);
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' Vitesse invalide.");
				}
			} else {
				UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' Vitesse invalide. Mauvais type.");
			}
		} else {
			Simulator.Mosaic.specific.buddy.storedMovements.push([dir, 90]);
		}
		Simulator.Mosaic.specific.buddy.startRunning();
	};

	const stopAllLed = function (self) {
		const id = ['shoulder', 'shoulder-2', 'circle_b', 'b-2'];
		for (const [key, value] of Object.entries(self.buddyIsBlinking))
			self.buddyIsBlinking[key] = [false, ""];
		blinkLedInterval = false;
		blinkAllLedInterval = false;
		self.buddyIsBlinkingAll = [false, ""];
		const BUDDY = document.getElementById("board-viewer").contentDocument;
		for (let i = 0; i < id.length; i++)
			BUDDY.getElementById(id[i]).style.fill = "#CCCCCC";

	}

	sdk.BuddySDK = new Sk.misceval.buildClass(sdk, function ($gbl, $loc) {

		BuddySDK__init__ = function (self) {
			self.id = "";
			self.tofId = "";
			self.usId = "";
			self.IMUid = "";
			self.headAngleNo = 0;
			self.headAngleYes = 0;
			self.volume = 0;
			self.pitch = 0;
			self.speed = 0;
			self.speakerVoice = "Roxane";
			self.buddyIsBlinking = {
				'0': [false, ""],
				'1': [false, ""],
				'2': [false, ""]
			};
			self.fadeAllLedIsRunning = true;
			self.buddyIsBlinkingAll = [false, ""];
			self.touchSensorsInit = {
				'headTouchSensors-top': false,
				'headTouchSensors-left': false,
				'headTouchSensors-right': false,
				'bodyTouchSensors-torso': false
			};
			self.stopNoMove = false;
			self.stopYesMove = false;
			// The code that runs when Buddy is connected is inside the prodBody.html file
			self.buddyConnected = Simulator.Mosaic.specific.buddy.connected;
			Simulator.Mosaic.specific.buddy.storedMovements = new Array();
			self.colors = {
				"255,0,0": "RED",
				"0,255,0": "GREEN",
				"0,0,255": "BLUE",
				"255,255,0": "YELLOW",
				"255,0,255": "PURPLE",
				"255,165,0": "ORANGE",
				"255,255,255": "WHITE",
			};
			self.positivity = null;
			self.energy = null;
			self.lookAtXYPos = {
				'X': null,
				'Y': null
			};
			self.lookAtPos = null;
		};

		BuddySDK__init__.co_varnames = ['self'];
		BuddySDK__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(BuddySDK__init__);

		$loc.enableSensorsModule = new Sk.builtin.func(function (self, enable, callback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.enableSensorsModule(enable.v ? true : false);
			}
		});

		$loc.Vision = new Sk.builtin.func(function (self) { });

		$loc.USSensors = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.LeftUS = new Sk.builtin.func(function (self) {
			self.usId = "LeftUS";
			return self;
		});

		$loc.RightUS = new Sk.builtin.func(function (self) {
			self.usId = "RightUS";
			return self;
		});

		$loc.TofSensors = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.FrontMiddle = new Sk.builtin.func(function (self) {
			self.tofId = 'FrontMiddle';
			return self;
		});

		$loc.FrontLeft = new Sk.builtin.func(function (self) {
			self.tofId = 'FrontLeft';
			return self;
		});

		$loc.FrontRight = new Sk.builtin.func(function (self) {
			self.tofId = 'FrontRight';
			return self;
		});

		$loc.Back = new Sk.builtin.func(function (self) {
			self.tofId = 'Back';
			return self;
		});

		$loc.Top = new Sk.builtin.func(function (self) {
			self.id = "headTouchSensors-top";
			if (!self.touchSensorsInit["headTouchSensors-top"]) {
				const target = "headTouchSensors-top";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.Left = new Sk.builtin.func(function (self) {
			self.id = "headTouchSensors-left";
			if (!self.touchSensorsInit["headTouchSensors-left"]) {
				const target = "headTouchSensors-left";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.Right = new Sk.builtin.func(function (self) {
			self.id = "headTouchSensors-right";
			if (!self.touchSensorsInit["headTouchSensors-right"]) {
				const target = "headTouchSensors-right";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.Torso = new Sk.builtin.func(function (self) {
			self.id = "bodyTouchSensors-torso";
			if (!self.touchSensorsInit["bodyTouchSensors-torso"]) {
				const target = "bodyTouchSensors-torso";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.LeftShoulder = new Sk.builtin.func(function (self) {
			self.id = "bodyTouchSensors-leftShoulder";
			if (!self.touchSensorsInit["bodyTouchSensors-leftShoulder"]) {
				const target = "bodyTouchSensors-leftShoulder";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.RightShoulder = new Sk.builtin.func(function (self) {
			self.id = "bodyTouchSensors-rightShoulder";
			if (!self.touchSensorsInit["bodyTouchSensors-rightShoulder"]) {
				const target = "bodyTouchSensors-rightShoulder";
				self.touchSensorsInit[target] = true;
				document.getElementById(target).addEventListener('mousedown', () => {
					$('#buddy-' + target + '_slider').slider('value', 1);
				});
				document.getElementById(target).addEventListener('mouseup', () => {
					$('#buddy-' + target + '_slider').slider('value', 0);
				});
			}
			return self;
		});

		$loc.isTouched = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.id) {
					case "headTouchSensors-top":
						return Sk.builtin.bool(AndroidInterface.isTouched('head', 'top'));
					case "headTouchSensors-left":
						return Sk.builtin.bool(AndroidInterface.isTouched('head', 'left'));
					case "headTouchSensors-right":
						return Sk.builtin.bool(AndroidInterface.isTouched('head', 'right'));
					case "bodyTouchSensors-torso":
						return Sk.builtin.bool(AndroidInterface.isTouched('body', 'torso'));
					case "bodyTouchSensors-leftShoulder":
						return Sk.builtin.bool(AndroidInterface.isTouched('body', 'left'));
					case "bodyTouchSensors-rightShoulder":
						return Sk.builtin.bool(AndroidInterface.isTouched('body', 'right'));
				}
			} else {
				return new Sk.builtin.bool($('#buddy-' + self.id + '_slider').slider("option", "value") ? true : false);
			}

		});

		$loc.HeadTouchSensors = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.BodyTouchSensors = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.addFaceTouchListener = new Sk.builtin.func(function (self, IUIFaceTouchCallback) {
			if (self.buddyConnected) {
				AndroidInterface.addFaceTouchListener();
			}
		});

		$loc.getFaceTouch = new Sk.builtin.func(function (self, area) {
			if (self.buddyConnected) {
				return Sk.builtin.bool(AndroidInterface.getFaceTouch(area.v));
			}

		});

		$loc.Battery = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.getBatteryLevel = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getBatteryLevel());
			} else {
				return new Sk.builtin.int_(parseInt($('#buddy-battery_value_v').text()));
			}

		});

		$loc.isCharging = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.bool(AndroidInterface.isCharging());
			} else {
				return new Sk.builtin.bool(($('#buddy-battery-isCharging_slider').slider("option", "value") ? true : false));
			}
		});

		$loc.getDistance = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				if (self.usId != '') {
					return new Sk.builtin.int_(AndroidInterface.usGetDistance(self.usId));
				}
				if (self.tofId != '') {
					return new Sk.builtin.int_(AndroidInterface.tofGetDistance(self.tofId));
				}
			} else {
				switch (self.usId) {
					case 'LeftUS':
						return new Sk.builtin.int_(parseInt($('#buddy-ultrasonic-left_value').text()));
					case 'RightUS':
						return new Sk.builtin.int_(parseInt($('#buddy-ultrasonic-right_value').text()));
				}
				switch (self.tofId) {
					case 'FrontMiddle':
						return new Sk.builtin.int_(parseInt($('#buddy-tof-middle_value').text()));
					case 'FrontLeft':
						return new Sk.builtin.int_(parseInt($('#buddy-tof-front-left_value').text()));
					case 'FrontRight':
						return new Sk.builtin.int_(parseInt($('#buddy-tof-front-right_value').text()));
					case 'Back':
						return new Sk.builtin.int_(parseInt($('#buddy-tof-back_value').text()));
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		$loc.getAmplitude = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getAmplitude(self.usId));
			} else {
				switch (self.usId) {
					case 'LeftUS':
						return
					case 'RightUS':
						return
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		/*
		iSpeed[optional] (double): Can take value from 0.0 to 1.0 (0% to 100%). The faster the
		speed is, the faster the facial expression is.
		*/
		$loc.setMood = new Sk.builtin.func(function (self, iExpression, iCallback, useCallback, iSpeed) {
			if (self.buddyConnected) {
				if (iSpeed === undefined) {
					iCallback = AndroidInterface.setMood(iExpression.v, useCallback.v == 1 ? true : false);
				} else {
					iCallback = AndroidInterface.setMood(iExpression.v, iSpeed.v, useCallback.v == 1 ? true : false);
				}
			} else {
				// TO DO : Ajouter l'animation des leds
				if (iSpeed != undefined) {
					if (iSpeed.v >= 0 && iSpeed.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre 0 et 1.");
					}
				}
				const id = ['shoulder', 'shoulder-2', 'circle_b', 'b-2'];
				const correspondance = {
					'angry': '#cc0000',
					'grumpy': '#96257c',
					'happy': '#ffc700',
					'listening': '#53b200',
					'neutral': '#00d3d0',
					'sad': '#ff0ab1',
					'scared': '#ccc930',
					'sick': '#628c00',
					'surprised': '#cccc00',
					'thinking': '#35dd40',
					'tired': '#474c20',
					'love': '#aa5a63',
					'none': 'green'
				}

				//set face expression
				RobotSimulator.robot.EXPRESSION = iExpression.v;
				let svg_content = document.getElementById("board-viewer").contentDocument;
				let currentFace = svg_content.getElementsByClassName('visible-face')[0].classList;
				currentFace.remove('visible-face');
				currentFace.add('hidden-face');
				let newFace = svg_content.getElementById("face-" + iExpression.v.toLowerCase());
				newFace.classList.remove('hidden-face');
				newFace.classList.add('visible-face');
				//set LEDs color
				let color = correspondance[iExpression.v.toLowerCase()];
				stopAllLed(self);
				for (let i = 0; i < id.length; i++)
					svg_content.getElementById(id[i]).style.fill = color;
			}
		});

		/*
		iSpeed[optional] (double): Can take value from 0.0 to 1.0 (0% to 100%). The faster the
		speed is, the faster the facial expression is.
		*/
		$loc.setFacialExpression = new Sk.builtin.func(function (self, expression, useCallback, speed) {
			if (self.buddyConnected) {
				if (speed === undefined) {
					AndroidInterface.setFacialExpression(expression.v, useCallback.v == 1 ? true : false);
				} else {
					AndroidInterface.setFacialExpression(expression.v, speed.v, useCallback.v == 1 ? true : false);
				}
			} else {
				if (speed != undefined) {
					if (speed.v >= 0 && speed.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre 0 et 1.");
					}
				}
				RobotSimulator.robot.EXPRESSION = expression.v;
				const svg_content = document.getElementById("board-viewer").contentDocument;
				const currentFace = svg_content.getElementsByClassName('visible-face')[0].classList;
				currentFace.remove('visible-face');
				currentFace.add('hidden-face');
				const newFace = svg_content.getElementById("face-" + expression.v.toLowerCase());
				newFace.classList.remove('hidden-face');
				newFace.classList.add('visible-face');
			}
		});

		$loc.playFacialEvent = new Sk.builtin.func(function (self, expression, useCallback, speed) {
			if (self.buddyConnected) {
				if (speed === undefined) {
					AndroidInterface.playFacialEvent(expression.v, useCallback.v == 1 ? true : false);
				} else {
					AndroidInterface.playFacialEvent(expression.v, speed.v, useCallback.v == 1 ? true : false);
				}
			} else {
				if (speed != undefined) {
					if (speed.v >= 0 && speed.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre 0 et 1.");
					}
				}
			}
		});

		/*
		Speed[optional] (double): Can take value from 0.0 to 1.0 (0% to 100%). The faster the
		speed is, the faster the facial expression is. 
		*/
		$loc.playFacialRelativeEvent = new Sk.builtin.func(function (self, iEvent, iSpeed) {
			if (self.buddyConnected) {
				AndroidInterface.playFacialRelativeEvent(iEvent.v, iSpeed.v);
			}
		});

		$loc.lookAtXY = new Sk.builtin.func(function (self, iX, iY, iSmooth) {
			if (self.buddyConnected) {
				AndroidInterface.lookAtXY(iX.v, iY.v, iSmooth.v == 1 ? true : false);
			} else {
				self.lookAtXYPos['X'] = iX.v;
				self.lookAtXYPos['Y'] = iY.v;
			}
		});

		$loc.lookAt = new Sk.builtin.func(function (self, iPosition, iSmooth) {
			if (self.buddyConnected) {
				AndroidInterface.lookAt(iPosition.v, iSmooth.v);
			} else {
				self.lookAtPos = iPosition.v;
			}
		});

		$loc.setFacePositivity = new Sk.builtin.func(function (self, iPositivity) {
			if (self.buddyConnected) {
				AndroidInterface.setFacePositivity(iPositivity.v);
			} else {
				if (iPositivity.v >= 0 && iPositivity.v <= 1) {
					self.positivity = iPositivity.v;
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iPositivity.v + "\' La positivité doit être comprise entre 0 et 1.");
				}
			}
		});

		$loc.setFaceEnergy = new Sk.builtin.func(function (self, iEnergy) {
			if (self.buddyConnected) {
				AndroidInterface.setFaceEnergy(iEnergy.v);
			} else {
				if (iEnergy.v >= 0 && iEnergy.v <= 1) {
					self.energy = iEnergy.v;
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iEnergy.v + "\' L'énergie doit être comprise entre 0 et 1.");
				}
			}
		});

		$loc.setLabialExpression = new Sk.builtin.func(function (self, iEvent) {
			if (self.buddyConnected) {
				AndroidInterface.setLabialExpression(iEvent.v);
			}
		});

		$loc.playFacialRelativeEvent = new Sk.builtin.func(function (self, iSpeed) {
			if (self.buddyConnected) {
				AndroidInterface.playFacialRelativeEvent(iSpeed.v);
			} else {
				if (iSpeed.v >= 0 && iSpeed.v <= 1) {

				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iSpeed.v + "\' La vitesse doit être comprise entre 0 et 1.");
				}
			}
		});

		$loc.detectArucoMarkers = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				let result = {};
				let resultArray = [];

				result = AndroidInterface.detectArucoMarkers();

				result = JSON.parse(result);
				for (let [key, value] of Object.entries(result)) {
					if (typeof value == "string") {
						value = JSON.parse(value);
						resultArray[key] = value;
					} else {
						resultArray[key] = value;
					}
				};

				var resultArray_ = [];
				for (key in resultArray) {
					if (!resultArray.hasOwnProperty(key)) {
						//The current property key not a direct property of p
						continue;
					}
					resultArray_.push(new Sk.builtin.str(key)); // push key
					if (typeof resultArray[key] === 'object') {
						let temp_list = [];
						for (let i = 0; i < resultArray[key].length; i++)
							temp_list.push(new Sk.builtin.float_(resultArray[key][i]));
						resultArray_.push(new Sk.builtin.list(temp_list));
					} else {
						resultArray_.push(new Sk.builtin.int_(resultArray[key])); // push associated value
					}
				}

				return new Sk.builtin.dict(resultArray_);

			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				return new Sk.builtin.list([]);
			}
		});

		$loc.detectFaces = new Sk.builtin.func(function (self, thres) {
			if (self.buddyConnected) {
				let result = {};
				let resultArray = [];

				if (thres != undefined) {
					result = AndroidInterface.detectFaces(thres.v);
				} else {
					result = AndroidInterface.detectFaces();
				}


				result = JSON.parse(result);
				for (let [key, value] of Object.entries(result)) {
					if (typeof value == "string") {
						value = JSON.parse(value);
						resultArray[key] = value;
					} else {
						resultArray[key] = value;
					}
				};

				var resultArray_ = [];
				for (key in resultArray) {
					if (!resultArray.hasOwnProperty(key)) {
						//The current property key not a direct property of p
						continue;
					}
					resultArray_.push(new Sk.builtin.str(key)); // push key
					if (typeof resultArray[key] === 'object') {
						let temp_list = [];
						for (let i = 0; i < resultArray[key].length; i++)
							temp_list.push(new Sk.builtin.float_(resultArray[key][i]));
						resultArray_.push(new Sk.builtin.list(temp_list));
					} else {
						resultArray_.push(new Sk.builtin.int_(resultArray[key])); // push associated value
					}
				}
				return new Sk.builtin.dict(resultArray_);

			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				if (thres != undefined) {
					if (thres.v >= 0 && thres.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + thres.v + "\' Le seuil doit être compris entre 0 et 1.");
					}
				}
				return new Sk.builtin.list([]);
			}
		});

		$loc.detectPerson = new Sk.builtin.func(function (self, thres) {
			if (self.buddyConnected) {
				let result = {};
				let resultArray = [];

				if (thres != undefined) {
					result = AndroidInterface.detectPerson(thres.v);
				} else {
					result = AndroidInterface.detectPerson();
				}


				result = JSON.parse(result);
				for (let [key, value] of Object.entries(result)) {
					if (typeof value == "string") {
						value = JSON.parse(value);
						resultArray[key] = value;
					} else {
						resultArray[key] = value;
					}
				};

				var resultArray_ = [];
				for (key in resultArray) {
					if (!resultArray.hasOwnProperty(key)) {
						//The current property key not a direct property of p
						continue;
					}
					resultArray_.push(new Sk.builtin.str(key)); // push key
					if (typeof resultArray[key] === 'object') {
						let temp_list = [];
						for (let i = 0; i < resultArray[key].length; i++)
							temp_list.push(new Sk.builtin.float_(resultArray[key][i]));
						resultArray_.push(new Sk.builtin.list(temp_list));
					} else {
						resultArray_.push(new Sk.builtin.int_(resultArray[key])); // push associated value
					}
				}
				return new Sk.builtin.dict(resultArray_);

			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				if (thres != undefined) {
					if (thres.v >= 0 && thres.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + thres.v + "\' Le seuil doit être compris entre 0 et 1.");
					}
				}
				// build array for python dict

				var resultArray = {
					"left": [0.2],
					"top": [0.3],
					"right": [0.8],
					"bottom": [0.7],
					"score": [0.85],
					"quantity": 1
				};

				var resultArray_ = [];
				for (key in resultArray) {
					if (!resultArray.hasOwnProperty(key)) {
						//The current property key not a direct property of p
						continue;
					}
					resultArray_.push(new Sk.builtin.str(key)); // push key
					if (typeof resultArray[key] === 'object') {
						let temp_list = [];
						for (let i = 0; i < resultArray[key].length; i++)
							temp_list.push(new Sk.builtin.float_(resultArray[key][i]));
						resultArray_.push(new Sk.builtin.list(temp_list));
					} else {
						resultArray_.push(new Sk.builtin.int_(resultArray[key])); // push associated value
					}
				}
				return new Sk.builtin.dict(resultArray_);
			}
		});

		$loc.startCamera = new Sk.builtin.func(function (self, id, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.startCamera(id.v, useCallback.v);
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			}
		});

		$loc.stopCamera = new Sk.builtin.func(function (self, id, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.stopCamera(id.v, useCallback.v);
			} else {
				$('.buddy-camera_base').css('opacity', '1');
				$("#buddy-camera>.module-header>.subtitle-module").text("OFF");
			}
		});

		$loc.startMotionDetection = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				AndroidInterface.startMotionDetection();
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			}
		});

		$loc.stopMotionDetection = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				AndroidInterface.stopMotionDetection();
			} else {
				$('.buddy-camera_base').css('opacity', '1');
				$("#buddy-camera>.module-header>.subtitle-module").text("OFF");
			}
		});

		$loc.motionDetect = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.bool(AndroidInterface.motionDetect());
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			}
		});

		$loc.setMotionThres = new Sk.builtin.func(function (self, Thres) {
			if (self.buddyConnected) {
				AndroidInterface.setMotionThres(Thres.v);
			} else {
				$('.buddy-camera_base').css('opacity', '1');
				$("#buddy-camera>.module-header>.subtitle-module").text("OFF");
			}
		});

		$loc.motionDetectWithThres = new Sk.builtin.func(function (self, Thres) {
			if (self.buddyConnected) {
				// cast to float
				return new Sk.builtin.bool(AndroidInterface.motionDetectWithThres(parseFloat(Thres.v)));
			} else {
				return new Sk.builtin.list([]);
			}
		});

		$loc.getMotionDetection = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				var result = JSON.parse(AndroidInterface.getMotionDetection());

				var resultArray = [];

				for (key in result) {
					resultArray[key] = result[key];
				}

				return new Sk.builtin.list(resultArray);

			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				return new Sk.builtin.list([]);
			}
		});

		$loc.ColorDetect = new Sk.builtin.func(function (self) {
			$('.buddy-camera_base').css('opacity', '0');
			$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			if (self.buddyConnected) {
				return AndroidInterface.colorDetect();
			} else {
				return new Sk.builtin.str(self.colors[$('#paletteDropdown').val()]);
			}
		});

		$loc.startVisualTracking = new Sk.builtin.func(function (self, thres, TrackingMode) {
			if (self.buddyConnected) {
				if (TrackingMode != undefined) {
					// trackingmode is either "NORMAL" or "FAST"
					AndroidInterface.startTracking(thres.v, TrackingMode.v);
				} else if (thres != undefined) {
					AndroidInterface.startTracking(thres.v);
				} else {
					AndroidInterface.startTracking();
				}
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				if (thres != undefined) {
					if (thres.v >= 0 && thres.v <= 1) {

					} else {
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + thres.v + "\' Le seuil doit être compris entre 0 et 1.");
					}
				}
			}
		});

		$loc.stopVisualTracking = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				AndroidInterface.stopTracking();
			} else {
				$('.buddy-camera_base').css('opacity', '1');
				$("#buddy-camera>.module-header>.subtitle-module").text("OFF");
			}
		});

		$loc.getTracking = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				// parse json
				var tracking = JSON.parse(AndroidInterface.getTracking());
				// convert to array
				var trackingArray = [];

				for (key in tracking) {
					trackingArray[key] = tracking[key];
				}

				return new Sk.builtin.list(trackingArray);
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
				return new Sk.builtin.list([]);
			}
		});

		$loc.getGrandAngleFrame = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				// returns a base64 encoded image
				//AndroidInterface.getGrandAngleFrame();
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			}
		});

		$loc.getCVResultFrame = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				// returns a base64 encoded image
				//AndroidInterface.getCVResultFrame();
			} else {
				$('.buddy-camera_base').css('opacity', '0');
				$("#buddy-camera>.module-header>.subtitle-module").text("ON");
			}
		});

		/*
		Make the head move around the “No” axis :

		- Speed (float): desired speed in °/s between -140 and 140.
		>0: robot is looking right, <0: robot is looking left
		- Angle (float) : target angle in ° between -90 and 90°
		*/
		$loc.buddySayNo = new Sk.builtin.func(function (self, speed, angle, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddySayNo(speed.v, angle.v, useCallback.v == 1 ? true : false);
			} else {
				if (Math.abs(speed.v) <= 140 && Math.abs(angle.v) <= 90) {
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					var actualAngle = self.headAngleNo,
						cpt = 0;
					if (angle.v > actualAngle)
						cpt = 1;
					else
						cpt = -1;
					self.stopNoMove = false;

					BUDDY.getElementById("buddy_head").style.transformOrigin = "bottom center";
					var buddySayNoInterval = setInterval(function () {
						BUDDY.getElementById("buddy_head").style.transform = "rotate3d(0,1,0," + actualAngle + "deg)";
						BUDDY.getElementById("buddy_head").style.filter = "drop-shadow(" + (actualAngle * 40) / 90 + "px 1px 0px rgb(0 0 0 / 0.3))";
						if (actualAngle == angle.v || self.stopNoMove) {
							self.headAngleNo = actualAngle;
							clearInterval(buddySayNoInterval);
						}
						actualAngle += cpt;
					}, 1000 / speed.v);
				} else {
					if (Math.abs(speed.v) > 140)
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -140 et 140.");
					else
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + angle.v + "\' L'angle doit être compris entre -90 et 90.");
				}
			}
		});
		/*
		Make the head move around the “No” axis continuously until stop
		instruction or the physical limit

		- Speed (float): desired speed in °/s between -140 and 140.
		>0: robot is looking right, <0: robot is looking left
		*/
		$loc.buddySayNoStraight = new Sk.builtin.func(function (self, speed, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddySayNoStraight(speed.v, useCallback.v == 1 ? true : false);
			} else {
				if (Math.abs(speed.v) <= 140) {
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					var actualAngle = self.headAngleNo,
						cpt = -1;
					if (actualAngle - 1 < -60)
						cpt = 1;
					self.stopNoMove = false;
					BUDDY.getElementById("buddy_head").style.transformOrigin = "bottom center";
					var buddySayNoInterval = setInterval(function () {
						BUDDY.getElementById("buddy_head").style.transform = "rotate3d(0,1,0," + actualAngle + "deg)";
						BUDDY.getElementById("buddy_head").style.filter = "drop-shadow(" + (actualAngle * 40) / 90 + "px 1px 0px rgb(0 0 0 / 0.3))";
						self.headAngleNo = actualAngle;
						actualAngle += cpt;
						if (self.stopNoMove)
							clearInterval(buddySayNoInterval);
						if (actualAngle == 60)
							cpt = -1;
						else if (actualAngle == -60)
							cpt = 1;
					}, 1000 / speed.v);
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -140 et 140.");
				}
			}
		});

		/*
		Make the head move around the “Yes” axis
		- Speed (float): desired speed in °/s between -49.2 and 49.2.
		>0: robot is looking up, <0: robot is looking down
		- Angle (float): target angle in ° between -35 and 45
		*/
		$loc.buddySayYes = new Sk.builtin.func(function (self, speed, angle, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddySayYes(speed.v, angle.v, useCallback.v == 1 ? true : false);
			} else {
				if (Math.abs(speed.v) <= 49.2 && angle.v <= 45 && angle.v >= -35) {
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					var actualAngle = self.headAngleYes,
						cpt = 0;
					if (angle.v > actualAngle)
						cpt = 1;
					else
						cpt = -1;
					self.stopYesMove = false;
					var buddySayYesInterval = setInterval(function () {
						if (actualAngle > 0 && angle.v > 0)
							BUDDY.getElementById("buddy_head").style.transformOrigin = "center";
						else
							BUDDY.getElementById("buddy_head").style.transformOrigin = "bottom center";
						BUDDY.getElementById("buddy_head").style.transform = "rotate3d(1,0,0," + actualAngle + "deg)";
						BUDDY.getElementById("buddy_head").style.filter = "drop-shadow(0px " + (actualAngle * 20) / 35 + "px 0px rgb(0 0 0 / 0.3))";
						BUDDY.getElementById("neck").style.transformOrigin = "center";
						BUDDY.getElementById("neck").style.transform = "rotate3d(1,0,0," + actualAngle + "deg)";
						if (actualAngle == angle.v || self.stopYesMove) {
							self.headAngleYes = actualAngle;
							clearInterval(buddySayYesInterval);
						}
						actualAngle += cpt;
					}, 1000 / speed.v);
				} else {
					if (Math.abs(speed.v) > 49.2)
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -49.2 et 49.2.");
					else
						UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + angle.v + "\' L'angle doit être compris entre -35 et 45.");
				}
			}
		});

		/*
		Make the head move around the “Yes” axis continuously until stop
		instruction or the physical limit
		- Speed (float): desired speed in °/s between -49.2 and 49.2
		>0: robot is looking up, <0: robot is looking down
		*/
		$loc.buddySayYesStraight = new Sk.builtin.func(function (self, speed, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddySayYesStraight(speed.v, useCallback.v == 1 ? true : false);
			} else {
				if (Math.abs(speed.v) <= 49.2) {
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					var actualAngle = self.headAngleYes,
						cpt = -1;
					if (actualAngle - 1 < -35)
						cpt = 1;
					self.stopYesMove = false;
					var sayYesInterval = setInterval(function () {
						if (actualAngle > 0)
							BUDDY.getElementById("buddy_head").style.transformOrigin = "center";
						else
							BUDDY.getElementById("buddy_head").style.transformOrigin = "bottom center";
						BUDDY.getElementById("buddy_head").style.transform = "rotate3d(1,0,0," + actualAngle + "deg)";
						BUDDY.getElementById("buddy_head").style.filter = "drop-shadow(0px " + (actualAngle * 20) / 35 + "px 0px rgb(0 0 0 / 0.3))";
						BUDDY.getElementById("neck").style.transformOrigin = "center";
						BUDDY.getElementById("neck").style.transform = "rotate3d(1,0,0," + actualAngle + "deg)";
						self.headAngleYes = actualAngle;
						actualAngle += cpt;
						if (actualAngle == 45)
							cpt = -1;
						else if (actualAngle == -35)
							cpt = 1;
						if (self.stopYesMove)
							clearInterval(sayYesInterval);
					}, 1000 / speed.v);
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -49.2 et 49.2.");
				}
			}
		});

		$loc.buddyStopNoMove = new Sk.builtin.func(function (self, callback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddyStopNoMove();
			} else {
				self.stopNoMove = true;
			}
		});

		$loc.buddyStopYesMove = new Sk.builtin.func(function (self, callback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.buddyStopYesMove();
			} else {
				self.stopYesMove = true;
			}
		});

		$loc.getNoPosition = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getNoPosition());
			} else {
				return new Sk.builtin.int_(self.headAngleNo);
			}

		});

		$loc.getYesPosition = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getYesPosition());
			} else {
				return new Sk.builtin.int_(self.headAngleYes);
			}
		});

		/*
		$loc.WheelRotate = new Sk.builtin.func(function (self, speed, callback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.wheelRotate(speed.v);
			} else {
				if (speed.v > 0)
					rotate('rotateLeft', speed);
				else if (speed.v < 0)
					rotate('rotateRight', speed);
			}
		});
		*/

		$loc.emergencyStopMotors = new Sk.builtin.func(function (self, callback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.emergencyStopMotors();
			} else {
				Simulator.Mosaic.specific.buddy.stopMotors();
			}
		});

		/*
		rotate the robot at a given angle and speed
		- Speed (float): give the speed of the rotation of the robot in deg/s around its vertical axis,
		between -100°/s and 100°/s (min. absolute speed : 30°/s)
		>0: counter-cuseCallbackwise, <0: cuseCallbackwise
		- Angle[optional] (float): give the angle of the rotation of the wheel in degree,
		o between –360° and 360°

		/!\ If absent, Buddy will rotate indefinitely at the given speed
		*/
		$loc.rotateBuddy = new Sk.builtin.func(function (self, speed, callback, useCallback, angle) {
			if (self.buddyConnected) {
				if (angle == undefined) {
					callback = AndroidInterface.rotateBuddy(speed.v, useCallback.v == 1 ? true : false);
				} else {
					callback = AndroidInterface.rotateBuddy(speed.v, angle.v, useCallback.v == 1 ? true : false);
				}
			} else {
				if (Math.abs(speed.v) <= 100) {
					if (angle != undefined && angle.v !== "") {
						if (Math.abs(angle.v) <= 360) {
							if (speed.v > 0)
								turn('left', angle, speed);
							else
								turn('right', angle, speed);
						} else {
							UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + angle.v + "\' L'angle doit être compris entre -360 et 360.");
						}
					} else {
						if (speed.v > 0)
							rotate('rotateLeft', speed);
						else if (speed.v < 0)
							rotate('rotateRight', speed);
					}
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise entre -100°/s et 100°/s.");
				}
			}
		});
		/*
		Move the robot straight at a defined speed and distance
		- Speed (float): give the speed of the robot in m/s, (+): Forward, (-): Backward, between
		0.05m/s to 0.7m/s
		- Distance[optional] (float): give the distance to reach in meter 

		/!\ If absent, Buddy will move indefinitely at the given speed
		*/
		$loc.moveBuddy = new Sk.builtin.func(function (self, speed, callback, useCallback, distance) {
			if (self.buddyConnected) {
				if (distance == undefined) {
					callback = AndroidInterface.moveBuddy(speed.v, useCallback.v == 1 ? true : false);
				} else {
					callback = AndroidInterface.moveBuddy(speed.v, distance.v, useCallback.v == 1 ? true : false);
				}
			} else {
				if (Math.abs(speed.v) <= 0.7 && Math.abs(speed.v) >= 0.05) {
					RobotSimulator.robot.speed_meter_s = speed.v;
					if (distance != undefined && distance.v != "") {
						if (speed.v > 0)
							move('forward', speed, distance);
						else
							move('backward', speed, distance);
					} else {
						if (speed.v > 0)
							move('straightForward', speed);
						else
							move('staightBackward', speed);
					}
				} else {
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + speed.v + "\' La vitesse doit être comprise dans l'intervalle [-0.7;-0.05]U[0.05;0.7].");
				}
			}
		});

		$loc.blinkLed = new Sk.builtin.func(async function (self, iLedId, iColor, iPeriod, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.blinkLed(iLedId.v, iColor.v, iPeriod.v, useCallback.v == 1 ? true : false);
			} else {
				var ledId = iLedId.v.toString(),
					id = LED_POSITION[ledId],
					color = iColor.v,
					duration = iPeriod.v;
				if (self.buddyIsBlinking[ledId][1] != color)
					self.buddyIsBlinking[ledId][0] = false;
				self.buddyIsBlinking[ledId][1] = color;
				if (!self.buddyIsBlinking[ledId][0]) {
					blinkLedInterval = true;
					self.buddyIsBlinking[ledId][0] = true;
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					while (self.buddyIsBlinking[ledId][0]) {
						if (typeof id == 'object') {
							for (let i = 0; i < id.length; i++)
								BUDDY.getElementById(id[i]).style.fill = color;
						} else {
							BUDDY.getElementById(id).style.fill = color;
						}
						await new Promise(r => setTimeout(r, duration));
						if (typeof id == 'object') {
							for (let i = 0; i < id.length; i++)
								BUDDY.getElementById(id[i]).style.fill = "#CCCCCC";
						} else {
							BUDDY.getElementById(id).style.fill = "#CCCCCC";
						}
						await new Promise(r => setTimeout(r, duration));
					}
				}
			}
		});

		$loc.updateAllLed = new Sk.builtin.func(function (self, iColor, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.updateAllLed(iColor.v, useCallback.v == 1 ? true : false);
			} else {
				var color = iColor.v;
				const id = ['shoulder', 'shoulder-2', 'circle_b', 'b-2'];
				stopAllLed(self);
				const BUDDY = document.getElementById("board-viewer").contentDocument;
				for (let i = 0; i < id.length; i++)
					BUDDY.getElementById(id[i]).style.fill = color;
			}
		});

		$loc.fadeAllLed = new Sk.builtin.func(function (self, iColor, iPeriod, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.fadeAllLed(iColor.v, iPeriod.v, useCallback.v == 1 ? true : false);
			} else {
				if (self.fadeAllLedIsRunning) {
					self.fadeAllLedIsRunning = false;
					const id = ['shoulder-2', 'shoulder', 'circle_b', 'b-2'];
					const color = iColor.v,
						duration = iPeriod.v,
						opacity = 0;
					const BUDDY = document.getElementById("board-viewer").contentDocument;
					for (let i = 0; i < id.length; i++) {
						BUDDY.getElementById(id[i]).style.opacity = opacity;
						BUDDY.getElementById(id[i]).style.fill = color;
					}
					const fadeIntervalOn = setInterval(() => {
						opacity += 1 / duration;
						for (let i = 0; i < id.length; i++)
							BUDDY.getElementById(id[i]).style.opacity = opacity;
						if (opacity >= 1) {
							self.fadeAllLedIsRunning = true;
							clearInterval(fadeIntervalOn);
						}
					}, 1 / duration);
				}
			}
		});

		$loc.updateLedColor = new Sk.builtin.func(function (self, iLedId, iColor, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.updateLedColor(iLedId.v, iColor.v, useCallback.v == 1 ? true : false);
			} else {
				const ledId = iLedId.v.toString(),
					id = LED_POSITION[ledId],
					color = iColor.v;
				const BUDDY = document.getElementById("board-viewer").contentDocument;
				if (typeof id == 'object') {
					for (let i = 0; i < id.length; i++) {
						BUDDY.getElementById(id[i]).style.fill = color;
					}
				} else {
					BUDDY.getElementById(id).style.fill = color;
				}
			}
		});

		$loc.updateAllLedWithPattern = new Sk.builtin.func(function (self, iColor, iPattern, iPeriod, iStep, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.updateAllLedWithPattern(iColor.v, iPattern.v, iPeriod.v, iStep.v, useCallback.v == 1 ? true : false);
			} else {
				const args = {
					color: Sk.ffi.remapToJs(iColor),
					pattern: Sk.ffi.remapToJs(iPattern),
					period: Sk.ffi.remapToJs(iPeriod),
					step: Sk.ffi.remapToJs(iStep)
				};
				//console.log(args);
				//throw new Sk.builtin.NotImplementedError('updateAllLedWithPattern simulation is not yet implemented');
			}
		});

		$loc.blinkAllLed = new Sk.builtin.func(function (self, iColor, iPeriod, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.blinkAllLed(iColor.v, iPeriod.v, useCallback.v == 1 ? true : false);
			} else {
				const blinkAllLedFunction = async function () {
					var BUDDY = document.getElementById("board-viewer").contentDocument;
					while (blinkAllLedInterval) {
						if (self.buddyIsBlinking['0'][0])
							BUDDY.getElementById(id[0]).style.fill = color;
						if (self.buddyIsBlinking['1'][0])
							BUDDY.getElementById(id[1]).style.fill = color;
						if (self.buddyIsBlinking['2'][0]) {
							BUDDY.getElementById(id[2]).style.fill = color;
							BUDDY.getElementById(id[3]).style.fill = color;
						}
						await new Promise(r => setTimeout(r, duration));
						for (let i = 0; i < id.length; i++)
							BUDDY.getElementById(id[i]).style.fill = "#CCCCCC";
						await new Promise(r => setTimeout(r, duration));
					}
				};

				stopAllLed(self);
				const id = ['shoulder', 'shoulder-2', 'circle_b', 'b-2'];
				var color = iColor.v,
					duration = iPeriod.v;
				if (self.buddyIsBlinkingAll[1] != color)
					self.buddyIsBlinkingAll[0] = false;
				self.buddyIsBlinkingAll[1] = color;
				if (!self.buddyIsBlinkingAll[0]) {
					blinkAllLedInterval = true;
					self.buddyIsBlinkingAll[0] = true;
					self.buddyIsBlinking['0'] = [true, color];
					self.buddyIsBlinking['1'] = [true, color];
					self.buddyIsBlinking['2'] = [true, color];
					blinkAllLedFunction();
				}
			}
		});

		$loc.stopRightShoulderLed = new Sk.builtin.func(function (self, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.stopRightShoulderLed(useCallback.v == 1 ? true : false);
			} else {
				self.buddyIsBlinking['0'] = [false, ""];
				const BUDDY = document.getElementById("board-viewer").contentDocument;
				BUDDY.getElementById(LED_POSITION['0']).style.fill = "#CCCCCC";
			}
		});

		$loc.stopLeftShoulderLed = new Sk.builtin.func(function (self, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.stopLeftShoulderLed(useCallback.v == 1 ? true : false);
			} else {
				self.buddyIsBlinking['1'] = [false, ""];
				const BUDDY = document.getElementById("board-viewer").contentDocument;
				BUDDY.getElementById(LED_POSITION['1']).style.fill = "#CCCCCC";
			}
		});

		$loc.stopHeartLed = new Sk.builtin.func(function (self, iRspCallback, useCallback) {
			if (self.buddyConnected) {
				iRspCallback = AndroidInterface.stopHeartLed(useCallback.v == 1 ? true : false);
			} else {
				self.buddyIsBlinking['2'] = [false, ""];
				const BUDDY = document.getElementById("board-viewer").contentDocument;
				BUDDY.getElementById(LED_POSITION['2'][0]).style.fill = "#CCCCCC";
				BUDDY.getElementById(LED_POSITION['2'][1]).style.fill = "#CCCCCC";
			}
		});

		$loc.stopAllLed = new Sk.builtin.func(function (self, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.stopAllLed(useCallback.v == 1 ? true : false);
			} else {
				stopAllLed(self);
			}
		});

		$loc.Microphone = new Sk.builtin.func(function (self) {
			return self;
		});

		$loc.getAmbiantSound = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getAmbiantSound());
			} else {
				return new Sk.builtin.int_(parseInt($('#buddy-get-sound_value').text()));
			}
		});

		$loc.getSoundLocalisation = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getSoundLocalisation());
			} else {
				return new Sk.builtin.int_($('#buddy-sound-localisation_slider').slider("option", "value"));
			}
		});
		/*
		Score from 0 to 100% (higher the value is, better is the recognition)
		The sdk return a value max ~2000
		*/
		$loc.getTriggerScore = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getTriggerScore());
			} else {
				return new Sk.builtin.int_($('#buddy-sound-trigger-score_slider').slider("option", "value"));
			}
		});

		$loc.BodyIMU = new Sk.builtin.func(function (self) {
			self.IMUid = "Body";
			return self;
		});

		$loc.HeadIMU = new Sk.builtin.func(function (self) {
			self.IMUid = "Head";
			return self;
		});

		$loc.getAccX = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("body", "x"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("head", "x"));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getAccX_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getAccX_value_v').text()));
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		$loc.getAccY = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("body", "y"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("head", "y"));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getAccY_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getAccY_value_v').text()));
					default:
						return new Sk.builtin.float_(0);
				}
			}
		});

		$loc.getAccZ = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("body", "z"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetAcc("head",));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getAccZ_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getAccZ_value_v').text()));
					default:
						return new Sk.builtin.float_(0);
				}
			}
		});

		$loc.getGyrX = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("body", "x"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("head", "x"));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getGyrX_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getGyrX_value_v').text()));
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		$loc.getGyrY = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("body", "y"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("head", "y"));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getGyrY_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getGyrY_value_v').text()));
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		$loc.getGyrZ = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				switch (self.IMUid) {
					case "Body":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("body", "z"));
					case "Head":
						return new Sk.builtin.int_(AndroidInterface.imuGetGyr("head", "z"));
					default:
						return new Sk.builtin.int_(0);
				}
			} else {
				switch (self.IMUid) {
					case 'Body':
						return new Sk.builtin.int_(parseInt($('#buddy-body-getGyrZ_value_v').text()));
					case 'Head':
						return new Sk.builtin.int_(parseInt($('#buddy-head-getGyrZ_value_v').text()));
					default:
						return new Sk.builtin.int_(0);
				}
			}
		});

		$loc.loadReadSpeaker = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				AndroidInterface.loadReadSpeaker();
			}
		});

		$loc.startSpeaking = new Sk.builtin.func(function (self, iText, iExpression, callback, useCallback) {
			if (self.buddyConnected) {
				callback = AndroidInterface.startSpeaking(iText.v, iExpression.v, useCallback.v == 1 ? true : false);
			} else {
				$("#buddy-startSpeaking_value").text('"' + iText.v + '"');
			}
		});

		$loc.setSpeakerVoice = new Sk.builtin.func(function (self, SpeakerName) {
			if (self.buddyConnected) {
				AndroidInterface.setSpeakerVoice(SpeakerName.v);
			} else {
				self.speakerVoice = SpeakerName.v;
			}
		});

		$loc.stopSpeaking = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				AndroidInterface.stopSpeaking();
			}
		});

		$loc.setSpeakerPitch = new Sk.builtin.func(function (self, iPitch) {
			if (self.buddyConnected) {
				AndroidInterface.setSpeakerPitch(iPitch.v);
			} else {
				if (iPitch.v >= 50 && iPitch.v <= 200)
					self.pitch = iPitch.v;
				else
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iPitch.v + "\' La hauteur doit être comprise entre 50 et 200");
			}
		});

		$loc.getSpeakerPitch = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getSpeakerPitch());
			} else {
				return new Sk.builtin.int_(self.pitch);
			}
		});

		$loc.setSpeakerSpeed = new Sk.builtin.func(function (self, iSpeed) {
			if (self.buddyConnected) {
				AndroidInterface.setSpeakerSpeed(iSpeed.v);
			} else {
				if (iSpeed.v >= 50 && iSpeed.v <= 400)
					self.speed = iSpeed.v;
				else
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iSpeed.v + "\' La vitesse doit être comprise entre 50 et 150.");
			}
		});

		$loc.getSpeakerSpeed = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getSpeakerSpeed());
			} else {
				return new Sk.builtin.int_(self.speed);
			}
		});

		$loc.setSpeakerVolume = new Sk.builtin.func(function (self, iVolume) {
			if (self.buddyConnected) {
				AndroidInterface.setSpeakerVolume(iVolume.v);
			} else {
				if (iVolume.v >= 0 && iVolume.v <= 150)
					self.volume = iVolume.v;
				else
					UIManager.showErrorMessage("error-message", "BuddyException" + ": " + "\'" + iVolume.v + "\' Le volume doit être compris entre 0 et 150.");
			}
		});

		$loc.getSpeakerVolume = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.int_(AndroidInterface.getSpeakerVolume());
			} else {
				return new Sk.builtin.int_(self.volume);
			}
		});

		$loc.isSpeaking = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.bool(AndroidInterface.isSpeaking());
			} else {
				let icon = document.querySelectorAll("g#icon")[0];
				if (icon != undefined) {
					if ($('#buddy-isSpeaking_slider').slider("option", "value")) {
						icon.classList.remove('hidden-icon');
						icon.classList.add('visible-icon');
					} else {
						icon.classList.remove('visible-icon');
						icon.classList.add('hidden-icon');
					}
				}
				return new Sk.builtin.bool(($('#buddy-isSpeaking_slider').slider("option", "value") ? true : false));
			}
		});

		$loc.isReadyToSpeak = new Sk.builtin.func(function (self) {
			if (self.buddyConnected) {
				return new Sk.builtin.bool(AndroidInterface.isReadyToSpeak());
			}
		});

	}, "BuddySDK");

	return sdk;
};