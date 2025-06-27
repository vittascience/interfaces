// Buzze / pitch module

var $builtinmodule = function (name) {
	var buzzer = {};

	buzzer.__name__ = new Sk.builtin.str('buzzer');

    

	buzzer.pith = new Sk.builtin.func(function (self, pin, frequency, duration) {
		const module = Simulator.getModuleByKey('buzzer');
		const stopMusic = function (self) {
			if (self._data.osc) {
				self._data.osc.stop();
				delete self._data.osc;
				Simulator.setAnimator(module, module.id + '_' + Pin.pin, 0);
			}
		};
		const startOscillator = function (self, freq) {
			const volume = self._data.audioCtx.createGain();
			volume.connect(self._data.audioCtx.destination);
			volume.gain.value = self._data.volume;
			self._data.osc = self._data.audioCtx.createOscillator();
			self._data.osc.type = 'sine';
			self._data.osc.frequency.value = freq;
			self._data.osc.connect(volume);
			self._data.osc.start();
		};
		let self = {
			_data: {
				volume: 1,
				audioCtx: null,
			},
		};

		if (duration === undefined) {
			duration = 1000;
		} else {
			duration = duration.v;
		}
		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (!self._data.audioCtx) {
					self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
					Simulator.audioContext = self._data.audioCtx;
				}
				if (self._data.osc) {
					stopMusic(self);
				}
				Simulator.setAnimator(module, module.id + '_' + Pin.pin, frequency.v);

				startOscillator(self, frequency.v);
				if (duration > 0) {
					await sleep_ms(duration + 50);
					stopMusic(self);
					resolve();
				}
				if (Simulator.stop_flag) {
					stopMusic(self);
					resolve();
				}
			})
		);
	});
};
