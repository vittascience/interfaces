var $builtinmodule = function () {


    const naoSimulator = window.Simulator3D;
    Simulator.pause();

    const ledsElements = {
        'AllLeds': ['AllLeds'],
        'BrainLeds': ['led_brain'],
        'EarLeds': ['led_left_ear', 'led_right_ear'],
        'FaceLeds': ['led_left_eye_L0', 'led_left_eye_L1', 'led_left_eye_L2', 'led_left_eye_L3', 'led_left_eye_L4', 'led_left_eye_L5', 'led_left_eye_L6', 'led_left_eye_L7', 'led_right_eye_R0', 'led_right_eye_R1', 'led_right_eye_R2', 'led_right_eye_R3', 'led_right_eye_R4', 'led_right_eye_R5', 'led_right_eye_R6', 'led_right_eye_R7'],
        'ChestLeds': ['nao_logo_chest'],
        'FeetLeds': ['nao_logo_foot_left', 'nao_logo_foot_right'],
    }

    const mapColorNameToRGB = {
        "white": { r: 1, g: 1, b: 1 },
        "red": { r: 1, g: 0, b: 0 },
        "green": { r: 0, g: 1, b: 0 },
        "blue": { r: 0, g: 0, b: 1 },
        "yellow": { r: 1, g: 1, b: 0 },
        "magenta": { r: 1, g: 0, b: 1 },
        "cyan": { r: 0, g: 1, b: 1 },
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

    const leds_service = {};
    leds_service.__name__ = new Sk.builtin.str('leds_service');

    leds_service.fade = new Sk.builtin.func(function (name, intensity, duration) {
        const _name = Sk.ffi.remapToJs(name);
        const _intensity = Sk.ffi.remapToJs(intensity)/100;
        const _duration = Sk.ffi.remapToJs(duration);

        naoSimulator.fadeLedsIntensity(ledsElements[_name], _intensity, _duration);

        return Sk.builtin.none();
    });

    const fadeRGB =  (name, r, g, b, duration, index) => {
        let _name = Sk.ffi.remapToJs(name);
        let _r = Sk.ffi.remapToJs(r);
        let _g = Sk.ffi.remapToJs(g);
        let _b = Sk.ffi.remapToJs(b);
        let _duration = Sk.ffi.remapToJs(duration);
        let _index = Sk.ffi.remapToJs(index);
       let rgbValues = {}

        let ledGroup;
       if (_name.match(/FaceLed(Right|Left)/gi) && _index !== null) {
            if (_name.match(/FaceLedRight/g)) {
                _name = `led_right_eye_R${_index}`;
            } else if (_name.match(/FaceLedLeft/g)) {
                _name = `led_left_eye_L${_index}`;
            }
            ledGroup = [_name];
       } else {
            ledGroup = ledsElements[_name];
       }

        // display_fadeRGB_colorName block
        if(_b === null && _duration === null) {
            _duration = _g;
            const value = mapColorNameToRGB[_r];
            if(value) {
                rgbValues = value;
            } else {
                rgbValues = mapColorNameToRGB['blue'];
            }   
        } else {
            rgbValues = {r:_r,g:_g,b:_b};
        }
        // return Sk.builtin.none();
        //fadeRGB AllLeds 255 0 0 1
        const poll = async (resolve, reject) => {
			if (naoSimulator.resetFlag) {
				resolve();
			}
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
            await naoSimulator.fadeLedsColor(ledGroup, rgbValues,_duration);
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
    // fadeRGB.co_varnames = ['self', 'r', 'g', 'b', 'duration', 'index'];
    // fadeRGB.$defaults = [new Sk.builtin.none(), new Sk.builtin.none()];
    leds_service.fadeRGB = new Sk.builtin.func(fadeRGB);

    leds_service.rotateEyes = new Sk.builtin.func(function (color, timeForRotation, duration) {
        const _color = Sk.ffi.remapToJs(color);
        const _timeForRotation = Sk.ffi.remapToJs(timeForRotation);
        const _duration = Sk.ffi.remapToJs(duration);

        
        const poll = async (resolve, reject) => {
            if (naoSimulator.resetFlag) {
                resolve();
			}
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
            await naoSimulator.eyeRotation(_color, _timeForRotation, _duration);
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
    });

    leds_service.setIntensity = new Sk.builtin.func(function (name, intensity) {
        const _name = Sk.ffi.remapToJs(name);
        const _intensity = Sk.ffi.remapToJs(intensity);
        if (_name === 'AllLeds') {
            const groupedLed = [...ledsElements['BrainLeds'], ...ledsElements['EarLeds'], ...ledsElements['FaceLeds'], ...ledsElements['ChestLeds'], ...ledsElements['FeetLeds']];  
            for (let i = 0; i < groupedLed.length; i++) {
                naoSimulator.setLedIntensity(_intensity, groupedLed[i]);
            }  
        } else {
            for (let i = 0; i < ledsElements[_name].length; i++) {
                naoSimulator.setLedIntensity(_intensity, ledsElements[_name][i]);
            }
        }

        return Sk.builtin.none();
    });

    leds_service.off = new Sk.builtin.func(function (name) {
        const _name = Sk.ffi.remapToJs(name);
        if (_name === 'AllLeds') {
            const groupedLed = [...ledsElements['BrainLeds'], ...ledsElements['EarLeds'], ...ledsElements['FaceLeds'], ...ledsElements['ChestLeds'], ...ledsElements['FeetLeds']];  
            for (let i = 0; i < groupedLed.length; i++) {
                naoSimulator.setLedsColor(0, 0, 0, groupedLed[i]);
            }  
        } else {
            for (let i = 0; i < ledsElements[_name].length; i++) {
                naoSimulator.setLedsColor(0, 0, 0, ledsElements[_name][i]);
            }
        }
        return Sk.builtin.none();
    });

    leds_service.on = new Sk.builtin.func(function (name) {
        const _name = Sk.ffi.remapToJs(name);
        if (_name === 'AllLeds') {
            const groupedLed = [...ledsElements['BrainLeds'], ...ledsElements['EarLeds'], ...ledsElements['FaceLeds'], ...ledsElements['ChestLeds'], ...ledsElements['FeetLeds']];  
            for (let i = 0; i < groupedLed.length; i++) {
                if (naoSimulator.isLedRGB(groupedLed[i])) {
					naoSimulator.setLedsColor(1, 1, 1, groupedLed[i]);
				} else {
					naoSimulator.setLedsColor(0, 0, 1, groupedLed[i]);
				}
            }  
        } else {
            for (let i = 0; i < ledsElements[_name].length; i++) {
                if (naoSimulator.isLedRGB(ledsElements[_name][i])) {
					naoSimulator.setLedsColor(1, 1, 1, ledsElements[_name][i]);
				} else {
					naoSimulator.setLedsColor(0, 0, 1, ledsElements[_name][i]);
				}
            }
        }
        return Sk.builtin.none();
    });

    leds_service.randomEyes = new Sk.builtin.func(function (randomEyes) {
        const _randomEyes = Sk.ffi.remapToJs(randomEyes);

        return Sk.builtin.none();
    });

    leds_service.rasta = new Sk.builtin.func(function (duration) {
        const _duration = Sk.ffi.remapToJs(duration);
        const poll = async (resolve, reject) => {
            if (naoSimulator.resetFlag) {
				resolve();
			}
			naoSimulator.promiseToResolve.push(resolve);
			naoSimulator.isRunning = true;
            await naoSimulator.rastaAnimation(_duration);
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
    });

    leds_service.reset = new Sk.builtin.func(function (name) {
        const _name = Sk.ffi.remapToJs(name);
        return Sk.builtin.none();
    });

    return leds_service;
};