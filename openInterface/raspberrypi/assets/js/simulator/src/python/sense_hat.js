// Sense hat simulator

var $builtinmodule = function () {
	var sense_hat = {};

	let isRunning = false;
	Simulator.Mosaic.specific.senseHatEvent.joystickInitiated = false;
	Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered = false;

	// prevent the simulator from running when the shield is not connected
	const initSenseHat = () => {
		if (Simulator.Mosaic.specific.senseHatEvent.senseHat === null) {
			UIManager.showErrorMessage('error-message', 'SheildError' + ': ' + 'Invalid shield');
			Simulator.pause();
		}
	};

	initSenseHat();

	self.char_list = CHAR_LIST[0].split('');
	self.char_list_pixel = CHAR_LIST_PIXEL;
	self.board = document.getElementById('board-viewer').contentDocument;
	const row = 8;
	const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	let ROTATION_VALUE = 0;
	let LAST_MATRIX = new Array(64).fill(null).map(() => new Array(3).fill(0));

	const replaceMatrix = (matrix) => {
		for (var i = 0; i < matrix.length; i++) {
			if (matrix[i][0] !== LAST_MATRIX[i][0] || matrix[i][1] !== LAST_MATRIX[i][1] || matrix[i][2] !== LAST_MATRIX[i][2]) {
				LAST_MATRIX[i][0] = matrix[i][0];
				LAST_MATRIX[i][1] = matrix[i][1];
				LAST_MATRIX[i][2] = matrix[i][2];
			}
		}
		return LAST_MATRIX;
	};

	const resetLedMatrix = (color) => {
		const board = document.getElementById('board-viewer').contentDocument;
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col.length; j++) {
				const led = board.querySelector(`#led_on_${i + 1}${col[j]} circle`);
				led.style.fill = color;
			}
		}
	};

	const defineColorLetters = (matrix, text, back) => {
		const board = document.getElementById('board-viewer').contentDocument;
		resetLedMatrix(back);
		let index = 0;
		// reverse the matrix
		for (var i = 0; i < col.length; i++) {
			for (var j = row; j > 0; j--) {
				const led = board.querySelector(`#led_on_${j}${col[i - 1]} circle`);
				if (led) {
					if (matrix[index][0] === 255) {
						led.style.fill = text;
					}
				}
				index++;
			}
		}
	};

	const defineColorMatrix = (matrix) => {
		const board = document.getElementById('board-viewer').contentDocument;
		// resetLedMatrix('rgb(0,0,0)');
		let index = 0;
		// reverse the matrix
		for (var i = 0; i < col.length; i++) {
			for (var j = row; j > 0; j--) {
				const led = board.querySelector(`#led_on_${j}${col[i]} circle`);
				if (led) {
					led.style.fill = 'rgb(' + matrix[index][0] + ',' + matrix[index][1] + ',' + matrix[index][2] + ')';
				}
				index++;
			}
		}
	};

	const defineArray = (array) => {
		const matrix = new Array(16).fill(null).map(() => new Array(3).fill(0));
		matrix.push(...array);
		matrix.push(...new Array(8).fill(null).map(() => new Array(3).fill(0)));
		return matrix;
	};

	const drawSingleLetter = (letter, text_color, back_color) => {
		const index = self.char_list.indexOf(letter);
		let letterArray = self.char_list_pixel.slice(index * 40, (index + 1) * 40);
		const matrix = defineArray(letterArray);
		defineColorLetters(matrix, text_color, back_color);
	};


	// need to implement screen rotation with this function
	function transposeMatrix(linearList, angle) {
		// Convertir la liste linéaire en matrice 2D
		const size = Math.sqrt(linearList.length);
		const matrix = [];
		for (let i = 0; i < size; i++) {
			const row = [];
			for (let j = 0; j < size; j++) {
				row.push(linearList[i * size + j]);
			}
			matrix.push(row);
		}

		let rotatedMatrix;

		switch (angle) {
			case 0:
				rotatedMatrix = [...matrix];
				break;
			case 90:
				rotatedMatrix = [];
				for (let i = 0; i < size; i++) {
					const row = [];
					for (let j = size - 1; j >= 0; j--) {
						row.push(matrix[j][i]);
					}
					rotatedMatrix.push(row);
				}
				break;
			case 180:
				rotatedMatrix = [];
				for (let i = size - 1; i >= 0; i--) {
					const row = [];
					for (let j = size - 1; j >= 0; j--) {
						row.push(matrix[i][j]);
					}
					rotatedMatrix.push(row);
				}
				break;
			case 270:
				rotatedMatrix = [];
				for (let i = size - 1; i >= 0; i--) {
					const row = [];
					for (let j = 0; j < size; j++) {
						row.push(matrix[j][i]);
					}
					rotatedMatrix.push(row);
				}
				break;
			default:
				throw new Error('Invalid angle. Must be 0, 90, 180, or 270.');
		}

		// Convertir la matrice 2D en liste linéaire
		const rotatedLinearList = [];
		for (const row of rotatedMatrix) {
			for (const element of row) {
				rotatedLinearList.push(element);
			}
		}

		return rotatedLinearList;
	}

	sense_hat.SenseHat = new Sk.misceval.buildClass(senseHat, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
			
		});




		$loc.set_pixel = new Sk.builtin.func(function (self, x, y, r, g, b) {
			const posX = x.v;
			const posY = y.v;
			const red = r.v;
			const green = g.v;
			const blue = b.v;
			const matrixArray = LAST_MATRIX;

			matrixArray[posY * 8 + posX][0] = red;
			matrixArray[posY * 8 + posX][1] = green;
			matrixArray[posY * 8 + posX][2] = blue;
			const rotatedMatrix = transposeMatrix(matrixArray, ROTATION_VALUE + 90);

			defineColorMatrix(rotatedMatrix);
		});

		$loc.show_letter = new Sk.builtin.func(function (self, letter, text_color, back_color) {
			resetLedMatrix('rgb(0,0,0)');
			let textColor = Sk.ffi.remapToJs(text_color);
			let backColor = Sk.ffi.remapToJs(back_color);
			textColor = `rgb(${textColor[0]}, ${textColor[1]}, ${textColor[2]})`;
			backColor = `rgb(${backColor[0]}, ${backColor[1]}, ${backColor[2]})`;

			drawSingleLetter(letter.v, textColor, backColor);
		});

		$loc.show_message = new Sk.builtin.func(function (self, text, speed, text_color, back_color) {
			resetLedMatrix('rgb(0,0,0)');

			let textColor = Sk.ffi.remapToJs(text_color);
			let backColor = Sk.ffi.remapToJs(back_color);
			const speedValue = speed.v;
			textColor = `rgb(${textColor[0]}, ${textColor[1]}, ${textColor[2]})`;
			backColor = `rgb(${backColor[0]}, ${backColor[1]}, ${backColor[2]})`;

			let textArray = text.v.split('');
			textArray.push(' ');
			const textArrayPixel = [];
			const char_list = CHAR_LIST[0].split('');
			const char_list_pixel = CHAR_LIST_PIXEL;

			textArray.forEach((letter) => {
				const index = char_list.indexOf(letter);
				const letterArray = char_list_pixel.slice(index * 40, (index + 1) * 40);
				const matrix = defineArray(letterArray);
				textArrayPixel.push(...matrix);
			});

			const totalColumns = textArrayPixel.length / 8;

			let isRunning = true;
			let timeoutId = null;

			const displayMatrixAsync = (startColumn) => {
				return new Promise((resolve, reject) => {
					if (!isRunning || startColumn >= totalColumns) {
						clearTimeout(timeoutId);
						resolve();
						return;
					}

					const matrix = textArrayPixel.slice(startColumn * 8, startColumn * 8 + 64);
					if (matrix.length < 64) {
						resolve();
					}
					defineColorLetters(matrix, textColor, backColor);

					timeoutId = setTimeout(() => {
						displayMatrixAsync(startColumn + 1)
							.then(resolve)
							.catch(reject);
					}, 1000 * speedValue);
				});
			};

			displayMatrixAsync(0)
				.then(() => {
					resetLedMatrix(backColor);
				})
				.catch((error) => {
					return;
				});
		});

		$loc.set_pixels = new Sk.builtin.func(function (self, pixels) {
			const pixelArray = Sk.ffi.remapToJs(pixels);
			const rotatedMatrix = transposeMatrix(pixelArray, ROTATION_VALUE + 90);

			defineColorMatrix(rotatedMatrix);
		});

		$loc.get_pixel = new Sk.builtin.func(function (self, x, y) {
			const posX = x.v;
			const posY = y.v;
			const matrixArray = LAST_MATRIX;
			const pixel = matrixArray[posY * 8 + posX];
			return Sk.ffi.remapToPy(pixel);
		});

		$loc.get_pixels = new Sk.builtin.func(function (self) {
			const matrix = replaceMatrix(LAST_MATRIX);
			// const rotatedMatrix = transposeMatrix(matrix, ROTATION_VALUE + 90);
			return Sk.ffi.remapToPy(matrix);
		});

		$loc.clear = new Sk.builtin.func(function (self, r, g, b) {
			if (r || g || b) {
				resetLedMatrix('rgb(' + r.v + ',' + g.v + ',' + b.v + ')');
			} else {
				resetLedMatrix('rgb(0,0,0)');
			}
		});

		$loc.get_temperature = new Sk.builtin.func(function (self) {
			const temp = Simulator.getSliderValue('sense-hat-temp');
			return new Sk.builtin.float_(temp);
		});

		$loc.get_temperature_from_humidity = new Sk.builtin.func(function (self) {
			const temp = Simulator.getSliderValue('sense-hat-temp-hum');
			return new Sk.builtin.float_(temp);
		});

		$loc.get_humidity = new Sk.builtin.func(function (self) {
			const hum = Simulator.getSliderValue('sense-hat-hum');
			return new Sk.builtin.float_(hum);
		});

		$loc.get_pressure = new Sk.builtin.func(function (self) {
			const press = Simulator.getSliderValue('sense-hat-pressure');
			return new Sk.builtin.float_(press / 100);
		});

		$loc.set_imu_config = new Sk.builtin.func(function (self, compass_enabled, gyro_enabled, accel_enabled) {
			throw new Sk.builtin.NotImplementedError('<b>set_imu_config</b> is not yet implemented');
		});

		$loc.get_orientation_radians = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError('<b>get_orientation_radians</b> is not yet implemented');
		});

		$loc.get_orientation_degrees = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError('<b>get_orientation_degrees</b> is not yet implemented');
		});

		$loc.get_compass = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError('<b>get_compass</b> is not yet implemented');
		});

		// joystick

		// need to refactor this function - not working properly
		$loc.stick_wait_for_event = new Sk.builtin.func(function (self) {
			if (Simulator.Mosaic.specific.senseHatEvent.joystickInitiated === false){
				Simulator.Mosaic.specific.senseHatEvent.joystickInitiated = true;
				Simulator.Mosaic.specific.senseHatEvent.joystickModuleInit();
			}
			const poll = (resolve) => {
				if (Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered) {
					Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered = false;
						resolve(Simulator.Mosaic.specific.senseHatEvent.joystickEvent);
				} else {
					setTimeout((_) => poll(resolve), 5);
				}
			};

			return new Sk.misceval.promiseToSuspension(
				new Promise(poll).then((value) => {
					return new Sk.builtin.str('pressed');
				})
			);
		});
		$loc.stick_event = new Sk.builtin.func(function (self, type) {
			const event = Simulator.Mosaic.specific.senseHatEvent.joystickEvent;
			if (type.v === 'direction') {
				return new Sk.builtin.str(event.direction);
			} else if(type.v === 'action'){
				return new Sk.builtin.str(event.action);
			}
			
		});

	});

	return sense_hat;
};
