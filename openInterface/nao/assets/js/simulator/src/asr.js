var $builtinmodule = function () {
	const asr = {};
	asr.__name__ = new Sk.builtin.str('asr');

	let recognitionCallback = null;

	asr.say = new Sk.builtin.func(function (text) {
		const _text = Sk.ffi.remapToJs(text);
		return Sk.builtin.none();
	});

	asr.setLanguage = new Sk.builtin.func(function (language) {
		const _language = Sk.ffi.remapToJs(language);
		return Sk.builtin.none();
	});

	asr.setVocabulary = new Sk.builtin.func(function (vocabulary) {
		const _vocabulary = Sk.ffi.remapToJs(vocabulary);
		return Sk.builtin.none();
	});

	asr.startRecognition = new Sk.builtin.func(function (callback) {
		recognitionCallback = callback;

        // custom simulator module for speech recognition
        const module = document.getElementById('on_speech_recognized');
        const bodyModule = module.querySelector('.module-body');
        bodyModule.classList.add('module-body-speech-recognition');
        bodyModule.innerHTML = '';
        const inputText = document.createElement('input');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('id', 'speech-input');
        inputText.setAttribute('placeholder', 'Dire ...');
        bodyModule.appendChild(inputText);
        const button = document.createElement('button');
        button.classList.add('btn', 'vitta-button');
        button.setAttribute('onclick', 'simulateSpeechRecognition(document.getElementById("speech-input").value)');
        button.innerHTML = 'valider';
        bodyModule.appendChild(button);

		return Sk.builtin.none();
	});

	asr.stopRecognition = new Sk.builtin.func(function () {
        const module = document.getElementById('on_speech_recognized');
        const bodyModule = module.querySelector('.module-body');
        bodyModule.classList.remove('module-body-speech-recognition');
        bodyModule.innerHTML = '';

        recognitionCallback = null;
		return Sk.builtin.none();
	});

	asr.simulateRecognition = function (word) {
        if (recognitionCallback) {
            const pyWord = new Sk.builtin.str(word);
            Sk.misceval
                    .asyncToPromise(function () {
                        return Sk.misceval.callsimOrSuspendArray(recognitionCallback, [pyWord]);
                    })
                    .then(function (value) {
                        // console.log("Recognition callback returned", value);
                    }, Simulator.handleError);
        } else {
            return Sk.builtin.none();
        }
    };   

	return asr;
};


// extra function to simulate speech recognition (to keep here to be available in the global scope)
function simulateSpeechRecognition(input) {
    Sk.globals["asr"]["$d"].simulateRecognition(input);
}

