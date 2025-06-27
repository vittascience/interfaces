// speech_synthesis module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const speech_synthesis = {};
    speech_synthesis.__name__ = new Sk.builtin.str("speech_synthesis");
    speech_synthesis.synth = window.speechSynthesis;


    const say = function (text, lang) {
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            const _text = Sk.ffi.remapToJs(text);
            const _lang = Sk.ffi.remapToJs(lang).toLowerCase();

            // Vérifie que le synthétiseur n'est pas déjà en train de parler
            if (speech_synthesis.synth.speaking) {
                console.error("speechSynthesis.speaking");
                return;
            }

            // Crée l'instance de SpeechSynthesisUtterance avec le texte fourni
            const utterThis = new SpeechSynthesisUtterance(_text);

            // Définition des callbacks pour la fin et pour les erreurs
            utterThis.onend = function (event) {
                console.log("SpeechSynthesisUtterance.onend");
                resolve();
            };

            utterThis.onerror = function (event) {
                console.error("SpeechSynthesisUtterance.onerror");
                resolve()
            };

            // Filtre les voix pour ne garder que celles dont la langue commence par la valeur de _lang ("en" ou "fr")
            const filteredVoices = Simulator.voices.filter(voice =>
                voice.lang.toLowerCase().startsWith(_lang)
            );

            if (filteredVoices.length === 0) {
                console.error("Aucune voix trouvée pour la langue :", _lang);
                return;
            }

            // Utilise la première voix correspondante
            utterThis.voice = filteredVoices[0];

            // Lance la synthèse vocale
            speech_synthesis.synth.speak(utterThis);
        }));
    };
    say.co_varnames = ['text', 'lang'];
    say.$defaults = [new Sk.builtin.str("Bonjour !"), new Sk.builtin.str("fr")];
    speech_synthesis.say = new Sk.builtin.func(say);

    return speech_synthesis;
};