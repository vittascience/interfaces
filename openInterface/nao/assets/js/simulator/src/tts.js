var $builtinmodule = function () {
	const tts = {};
    const naoSimulator = window.Simulator3D;
    Simulator.pause();

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


	tts.__name__ = new Sk.builtin.str('tts');


    const say = (text) => {
		const poll = async (resolve, reject) => {
			naoSimulator.isRunning = true;
			
			await naoSimulator.animatedSpeech(text.v);
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

    tts.say = new Sk.builtin.func(say);

	return tts;
};