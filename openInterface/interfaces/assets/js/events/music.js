AudioParam.prototype.cancelAndHoldAtTime = false

let musicInit = false;
let reverb;
let crush;
let synth;
let delay;

$("body").mousemove(function () {
    if (!musicInit) {
        reverb = new Tone.Reverb();
        crush = new Tone.BitCrusher();
        synth = new Tone.Synth().toMaster();
        delay = new Tone.FeedbackDelay({
            delayTime: 0.25,
            maxDelay: 5
        });

        reverb.wet.value = 0;
        crush.wet.value = 0;
        delay.wet.value = 0;

        synth.connect(delay);
        delay.connect(crush);
        crush.connect(reverb);

        reverb.generate();


        $("#volume-slider").slider({
            orientation: "vertical",
            min: -25,
            max: 3,
            step: 2,
            value: synth.volume.value,
            slide: function (event, ui) {
                if (!$("#audio-enable-button").hasClass("wet")) {
                    synth.volume.value = -200;
                } else {
                    synth.volume.value = parseInt($("#volume-slider").slider("value"));
                    if (parseInt($("#volume-slider").slider("value")) == -25) {
                        synth.volume.value = -200;
                    }
                }
            },
            change: function (event, ui) {
                if (!$("#audio-enable-button").hasClass("wet")) {
                    synth.volume.value = -200;
                } else {
                    synth.volume.value = parseInt($("#volume-slider").slider("value"));
                    if (parseInt($("#volume-slider").slider("value")) == -25) {
                        synth.volume.value = -200;
                    }
                }
            }

        });

        $("#octave-slider").slider({
            orientation: "vertical",
            min: 2,
            max: 5,
            step: 1,
            value: 3,
        });

        musicInit = true;
    }
});

$('#reverb-button').on('click', function () {
    if ($(this).hasClass("wet")) {
        $(this).removeClass("wet");
        reverb.wet.value = 0;
    } else {
        $(this).addClass("wet");
        reverb.wet.value = 0.8;
    }
});

$('delay-button').on('click', function () {
    if ($(this).hasClass("wet")) {
        $(this).removeClass("wet");
        delay.wet.value = 0;
    } else {
        $(this).addClass("wet");
        delay.wet.value = 0.4;
    }
});

$('crush-button').on('click', function () {
    if ($(this).hasClass("wet")) {
        $(this).removeClass("wet");
        crush.wet.value = 0;
    } else {
        $(this).addClass("wet");
        crush.wet.value = 0.5;
    }
});

$('audio-enable-button').on('click', function () {
    if ($(this).hasClass("wet")) {
        $(this).removeClass("wet");
        synth.volume.value = -200;
    } else {
        $(this).addClass("wet");
        synth.volume.value = parseInt($("#volume-slider").slider("value"));
    }
});

$("osc-select").on('change', function () {
    synth.triggerRelease();
    synth.oscillator.type = this.value;
});

$("#volume-slider").slider({
    orientation: "vertical"
});

function playMusic(note) {
    if (note.includes("stop")) {
        synth.triggerRelease();
    } else {
        synth.triggerAttack(note, parseInt($("#octave-slider").slider("value")));
    }
};