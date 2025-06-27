// TI-83 & micro:bit - mb_music module

var $builtinmodule = function () {
	var mb_music = {};

	const NOTE_FREQUENCIES = {
		'c': 16.352,
		'c#': 17.324,
		'db': 17.324,
		'd': 18.354,
		'd#': 19.445,
		'eb': 19.445,
		'e': 20.602,
		'f': 21.827,
		'f#': 23.125,
		'gb': 23.125,
		'g': 24.500,
		'g#': 25.957,
		'ab': 25.957,
		'a': 27.500,
		'a#': 29.135,
		'bb': 29.135,
		'b': 30.868,
		'r': 0
	};
	const module = Simulator.getModuleByKey('mb-buzzer');

	const stopMusic = function (self) {
		self._data.osc.stop();
		delete self._data.osc;
		Simulator.setAnimator(module, module.id, 0);
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

	var music = new Sk.misceval.buildClass(mb_music, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self._data = {};
			self._data.ticks = 4;
			self._data.bpm = 120;
			self._data.duration = 4;
			self._data.octave = 4;
			self._data.volume = 1;
			self._data.audioCtx = null;
		});

		var play = function (self, music) {
	
			if (music !== undefined) {
				let notes;
				if (Sk.builtin.checkString(music)) {
					if (music.v.includes('music.')) {
						const melody = $loc[music.v.replace('music.', '')];
						if (melody) {
							notes = Sk.ffi.remapToJs(melody);
						} else return;
					} else return;
				} else if (Sk.builtin.checkSequence(music)) {
					notes = Sk.ffi.remapToJs(music);
					if (notes.length === 0) return; 
				} else return;
										
				return Simulator.runAsync(function (resolve, reject) {
					var i = 0;
					const timeout = 60000 / self._data.bpm / self._data.ticks;
					function playNextNote() {
						if (Simulator.stop_flag) {
							stopMusic(self);
							resolve();
						}
						if (!self._data.audioCtx) {
							self._data.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
							Simulator.audioContext = self._data.audioCtx;
						}
						if (self._data.osc) {
							stopMusic(self);
						}
		
						var n = notes[i].toLowerCase();
						const data = n.match(/([rcdefgab][b#]?)([0-9]?)(:([0-9]*))?/);
						n = {
							short: n,
							note: data[1],
							octave: Number.parseInt(data[2]),
							ticks: data[4] ? Number.parseInt(data[4]) : 1
						}
						n.f = NOTE_FREQUENCIES[n.note];
						
						if (n.f == undefined) {
							n.f = NOTE_FREQUENCIES['a'];
						}
						if (!n.octave) {
							n.octave = 4;
						} else {
							self._data.octave = n.octave;
						}
						for (var o = 0; o < n.octave; o++) {
							n.f = n.f * 2;
						}

						Simulator.setAnimator(module, module.id, n.f);
		
						if (n.f > 0) {
							startOscillator(self, n.f);
						}
						i++;
						if (i < notes.length) {
							setTimeout(playNextNote, timeout*n.ticks);
						} else {
							setTimeout(function () {
								if (self._data.osc) {
									stopMusic(self);
								}
								resolve();
							}, timeout * n.ticks);
						}
					}
					playNextNote();
				});
			} else {
				Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction music.play() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
	
		}
		play.co_varnames = ['self', 'music'];
		play.$defaults = [Sk.builtin.none()];
		$loc.play = new Sk.builtin.func(play);
	
		var pitch = function (self, frequency, duration) {
			if (duration === undefined) {
				duration = 1000;
			} else {
				duration = duration.v;
			}
	
			return Simulator.runAsync(function (resolve, reject) {
				if (!self._data.audioCtx) {
					self._data.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
					Simulator.audioContext = self._data.audioCtx;
				}
				if (self._data.osc) {
					stopMusic(self);
				}
				Simulator.setAnimator(module, module.id, frequency.v);

				startOscillator(self, frequency.v);

				if (duration > 0) {
					setTimeout(function () {
						stopMusic(self);
						resolve();
					}, duration);
				}
				if (Simulator.stop_flag) {
					stopMusic(self);
					resolve();
				}
			});
	
		}
		pitch.co_varnames = ['self', 'frequency', 'duration'];
		pitch.$defaults = [Sk.builtin.none(), new Sk.builtin.int_(1000)];
		$loc.pitch = new Sk.builtin.func(pitch);

		var set_tempo = function (self, ticks, bpm) {
			if (ticks === undefined)
				ticks = new Sk.builtin.int_(4);
			if (bpm === undefined)
				bpm = new Sk.builtin.int_(120);
	
			self._data.ticks = ticks.v;
			self._data.bpm = bpm.v;
		}
	
		set_tempo.co_varnames = ['self', 'ticks', 'bpm'];
		set_tempo.$defaults = [new Sk.builtin.int_(4), new Sk.builtin.int_(120)];
		$loc.set_tempo = new Sk.builtin.func(set_tempo);


		var set_volume = function (self, volume) {
			if (volume === undefined) {
				self._data.volume = 1;
			}
			self._data.volume = volume.v/255;
		}
	
		set_volume.co_varnames = ['self', 'volume'];
		set_volume.$defaults = [new Sk.builtin.int_(255)];
		$loc.set_volume = new Sk.builtin.func(set_volume);
	
		$loc.DADADADUM = Sk.ffi.remapToPy([
			"r4:2", "g", "g", "g", "eb:8", "r:2", "f", "f", "f", "d:8"
		]);
	
		$loc.ENTERTAINER = Sk.ffi.remapToPy([
			"d4:1", "d#", "e", "c5:2", "e4:1", "c5:2", "e4:1", "c5:3", 
			"c:1", "d", "d#", "e", "c", "d", "e:2", "b4:1", "d5:2", "c:4"
		]);
	
		$loc.PRELUDE = Sk.ffi.remapToPy([
			"c4:1", "e", "g", "c5", "e", "g4", "c5", "e", "c4", "e",
			"g", "c5", "e", "g4", "c5", "e", "c4", "d", "g", "d5", "f",
			"g4", "d5", "f", "c4", "d", "g", "d5", "f", "g4", "d5", "f",
			"b3", "d4", "g", "d5", "f", "g4", "d5", "f", "b3", "d4", "g",
			"d5", "f", "g4", "d5", "f", "c4", "e", "g", "c5", "e", "g4",
			"c5", "e", "c4", "e", "g", "c5", "e", "g4", "c5", "e"
		]);
	
		$loc.ODE = Sk.ffi.remapToPy([
			"e4", "e", "f", "g", "g", "f", "e", "d", "c", "c", "d", "e", 
			"e:6", "d:2", "d:8", "e:4", "e", "f", "g", "g", "f", "e", 
			"d", "c", "c", "d", "e", "d:6", "c:2", "c:8"
		]);
	
		$loc.NYAN = Sk.ffi.remapToPy([
			"f#5:2", "g#", "c#:1", "d#:2", "b4:1", "d5:1", "c#", "b4:2", 
			"b", "c#5", "d", "d:1", "c#", "b4:1", "c#5:1", "d#", "f#", 
			"g#", "d#", "f#", "c#", "d", "b4", "c#5", "b4", "d#5:2", "f#", 
			"g#:1", "d#", "f#", "c#", "d#", "b4", "d5", "d#", "d", "c#", 
			"b4", "c#5", "d:2", "b4:1", "c#5", "d#", "f#", "c#", "d", "c#", 
			"b4", "c#5:2", "b4", "c#5", "b4", "f#:1", "g#", "b:2", "f#:1", 
			"g#", "b", "c#5", "d#", "b4", "e5", "d#", "e", "f#", "b4:2", 
			"b", "f#:1", "g#", "b", "f#", "e5", "d#", "c#", "b4", "f#", 
			"d#", "e", "f#", "b:2", "f#:1", "g#", "b:2", "f#:1", "g#", "b", 
			"b", "c#5", "d#", "b4", "f#", "g#", "f#", "b:2", "b:1", "a#", 
			"b", "f#", "g#", "b", "e5", "d#", "e", "f#", "b4:2", "c#5"
		]);
	
		$loc.RINGTONE = Sk.ffi.remapToPy([
			"c4:1", "d", "e:2", "g", "d:1", "e", "f:2", "a", "e:1", "f", 
			"g:2", "b", "c5:4"
		]);
	
		$loc.FUNK = Sk.ffi.remapToPy([
			"c2:2", "c", "d#", "c:1", "f:2", "c:1", "f:2", "f#", "g", "c", 
			"c", "g", "c:1", "f#:2", "c:1", "f#:2", "f", "d#"
		]);
	
		$loc.BLUES = Sk.ffi.remapToPy([
			"c2:2", "e", "g", "a", "a#", "a", "g", "e", "c2:2", "e", "g", 
			"a", "a#", "a", "g", "e", "f", "a", "c3", "d", "d#", "d", "c", 
			"a2", "c2:2", "e", "g", "a", "a#", "a", "g", "e", "g", "b", 
			"d3", "f", "f2", "a", "c3", "d#", "c2:2", "e", "g", "e", "g", 
			"f", "e", "d"
		]);
	
		$loc.BIRTHDAY = Sk.ffi.remapToPy([
			"c4:3", "c:1", "d:4", "c:4", "f:4", "e:8", "c:3", "c:1", "d:4", 
			"c:4", "g:4", "f:8", "c:3", "c:1", "c5:4", "a4:4", "f:4", "e:4", 
			"d:8", "a#:3", "a#:1", "a:4", "f:4", "g:4", "f:8"
		]);
	
		$loc.WEDDING = Sk.ffi.remapToPy([
			"c4:4", "f:3", "f:1", "f:8", "c:4", "g:3", "e:1", "f:8", "c:4", 
			"f:3", "a:1", "c5:4", "a4:3", "f:1", "f:4", "e:3", "f:1", "g:8"
		]);
	
		$loc.FUNERAL = Sk.ffi.remapToPy([
			"c3:4", "c:3", "c:1", "c:4", "d#:3", "d:1", "d:3", "c:1", "c:3", 
			"b2:1", "c3:4"
		]);
	
		$loc.PUNCHLINE = Sk.ffi.remapToPy([
			"c4:3", "g3:1", "f#", "g", "g#:3", "g", "r", "b", "c4"
		]);
	
		$loc.PYTHON = Sk.ffi.remapToPy([
			"d5:1", "b4", "r", "b", "b", "a#", "b", "g5", "r", "d", "d", "r", 
			"b4", "c5", "r", "c", "c", "r", "d", "e:5", "c:1", "a4", "r", "a", 
			"a", "g#", "a", "f#5", "r", "e", "e", "r", "c", "b4", "r", "b", 
			"b", "r", "c5", "d:5", "d:1", "b4", "r", "b", "b", "a#", "b", "b5", 
			"r", "g", "g", "r", "d", "c#", "r", "a", "a", "r", "a", "a:5", "g:1", 
			"f#:2", "a:1", "a", "g#", "a", "e:2", "a:1", "a", "g#", "a", "d", 
			"r", "c#", "d", "r", "c#", "d:2", "r:3"
		]);
	
		$loc.BADDY = Sk.ffi.remapToPy(["c3:3", "r", "d:2", "d#", "r", "c", "r", "f#:8"]);
	
		$loc.CHASE = Sk.ffi.remapToPy([
			"a4:1", "b", "c5", "b4", "a:2", "r", "a:1", "b", "c5", "b4", "a:2", "r", 
			"a:2", "e5", "d#", "e", "f", "e", "d#", "e", "b4:1", "c5", "d", "c", 
			"b4:2", "r", "b:1", "c5", "d", "c", "b4:2", "r", "b:2", "e5", "d#", "e",
			"f", "e", "d#", "e"]);
	
		$loc.BA_DING = Sk.ffi.remapToPy(["b5:1", "e6:3"]);
	
		$loc.WAWAWAWAA = Sk.ffi.remapToPy([
			"e3:3", "r:1", "d#:3", "r:1", "d:4", "r:1", "c#:8"
		]);
	
		$loc.JUMP_UP = Sk.ffi.remapToPy(["c5:1", "d", "e", "f", "g"]);
	
		$loc.JUMP_DOWN = Sk.ffi.remapToPy(["g5:1", "f", "e", "d", "c"]);
	
		$loc.POWER_UP = Sk.ffi.remapToPy(["g4:1", "c5", "e", "g:2", "e:1", "g:3"]);
	
		$loc.POWER_DOWN = Sk.ffi.remapToPy(["g5:1", "d#", "c", "g4:2", "b:1", "c5:3"]);

	}, "MusicObject", []);

	mb_music.music = new music();
	mb_music.music.tp$init([]);

	return mb_music;
};