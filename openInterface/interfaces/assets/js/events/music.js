AudioParam.prototype.cancelAndHoldAtTime = false

/**
 * Music mode of the console: the lines "@music:<frequency>|" and "@music:stop|" received from the board or the
 * simulator (InterfaceMonitor.playMusicMessage) are played on the computer, with the settings of the music panel.
 * The settings are kept in the browser.
 */

let synth = null;
// Frequency received for the note being played (before the octave shift), null when stopped
let musicFrequency = null;
let vibrato;
let distortion;
let reverb;
let crush;
let delay;
let musicWaveform = null;
let musicTestTimeout = null;

const MUSIC_SETTINGS_KEY = 'vittascience-music-settings';
const MUSIC_DEFAULT_SETTINGS = { volume: 80, octave: 4, waveform: 'triangle', effects: [], mode: 'held' };
// Effects: button => [effect getter, wet value when enabled]
const MUSIC_EFFECTS = {
    '#reverb-button': [() => reverb, 0.8],
    '#delay-button': [() => delay, 0.4],
    '#crush-button': [() => crush, 0.5],
    '#vibrato-button': [() => vibrato, 1],
    '#distortion-button': [() => distortion, 0.7]
};
// Held: the note lasts until the next one or "stop". Percussive: the note fades out by itself, like a piano
const MUSIC_ENVELOPES = {
    held: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
    percussive: { attack: 0.005, decay: 0.8, sustain: 0, release: 0.3 }
};
const MUSIC_NOTES = ['C', 'C_SHARP', 'D', 'D_SHARP', 'E', 'F', 'F_SHARP', 'G', 'G_SHARP', 'A', 'A_SHARP', 'B'];

let musicSettings = { ...MUSIC_DEFAULT_SETTINGS };
try {
    musicSettings = { ...MUSIC_DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(MUSIC_SETTINGS_KEY) || '{}') };
} catch (e) { }

function saveMusicSettings(changes) {
    Object.assign(musicSettings, changes);
    try {
        localStorage.setItem(MUSIC_SETTINGS_KEY, JSON.stringify(musicSettings));
    } catch (e) { }
}

// Browsers only start the audio after a user gesture
['pointerdown', 'keydown'].forEach(type => document.addEventListener(type, () => Tone.start(), { once: true, capture: true }));

function initMusic() {
    if (synth) return;
    synth = new Tone.Synth({ oscillator: { type: musicSettings.waveform }, envelope: MUSIC_ENVELOPES[musicSettings.mode] });
    vibrato = new Tone.Vibrato(6, 0.2);
    distortion = new Tone.Distortion(0.6);
    delay = new Tone.FeedbackDelay({ delayTime: 0.25, maxDelay: 5 });
    crush = new Tone.BitCrusher(4);
    reverb = new Tone.Reverb();
    for (const [selector, [effect, wet]] of Object.entries(MUSIC_EFFECTS)) {
        effect().wet.value = musicSettings.effects.includes(selector) ? wet : 0;
    }
    synth.chain(vibrato, distortion, delay, crush, reverb, Tone.Destination);
    // Oscilloscope: what goes to the speakers
    musicWaveform = new Tone.Waveform(2048);
    reverb.connect(musicWaveform);
    updateMusicVolume();
    requestAnimationFrame(drawOscilloscope);
}

// Volume in % (0 = no sound), the gain is the square of the percentage. While sliding, the slider value is not
// updated yet: the new one is given
function updateMusicVolume(percent = musicSettings.volume) {
    $('#volume-value').text(percent + ' %');
    // Muted icon at 0 %
    $('#volume-slider').siblings('.music-control-label').find('i')
        .toggleClass('fa-volume-up', percent > 0).toggleClass('fa-volume-mute', percent === 0);
    if (synth) synth.volume.value = percent > 0 ? 40 * Math.log10(percent / 100) : -Infinity;
}

// The note being played follows the octave
function updateMusicOctave(octave = musicSettings.octave) {
    $('#octave-value').text(octave);
    if (synth && musicFrequency !== null) synth.frequency.value = shiftOctave(musicFrequency, octave);
    updateMusicNote(octave);
}

function shiftOctave(frequency, octave = musicSettings.octave) {
    return frequency * Math.pow(2, octave - 4);
}

/**
 * Display the note played (e.g. "La4 · 440 Hz"), or only its frequency if it is not a note of the scale.
 */
function updateMusicNote(octave = musicSettings.octave) {
    if (musicFrequency === null) {
        $('#music-note').text('—');
        return;
    }
    const frequency = shiftOctave(musicFrequency, octave);
    const midi = 69 + 12 * Math.log2(frequency / 440);
    const hz = (Math.round(frequency * 10) / 10) + ' Hz';
    if (Math.abs(midi - Math.round(midi)) > 0.1) {
        $('#music-note').text(hz);
        return;
    }
    const index = ((Math.round(midi) % 12) + 12) % 12;
    const name = Blockly.Msg['NOTE_' + MUSIC_NOTES[index]] || MUSIC_NOTES[index].replace('_SHARP', '#');
    $('#music-note').text(`${name}${Math.floor(Math.round(midi) / 12) - 1} · ${hz}`);
}

/**
 * Play a frequency (Hz, the notes of the blocks are in the 4th octave, shifted by the octave slider) or stop.
 * @param {string} value - frequency or "stop"
 */
function playMusic(value) {
    clearTimeout(musicTestTimeout);
    if (value === 'stop') {
        stopMusic();
        return;
    }
    const frequency = parseFloat(value);
    if (isNaN(frequency) || frequency <= 0) return;
    initMusic();
    musicFrequency = frequency;
    synth.triggerAttack(shiftOctave(frequency));
    updateMusicNote();
}

function stopMusic() {
    clearTimeout(musicTestTimeout);
    musicFrequency = null;
    if (synth) synth.triggerRelease();
    updateMusicNote();
}

// Test of the settings without program: A4 during 1 s
function testMusic() {
    playMusic('440');
    musicTestTimeout = setTimeout(stopMusic, 1000);
}

/**
 * Draw the wave sent to the speakers, starting on a rising zero crossing so that it stays still.
 */
function drawOscilloscope() {
    requestAnimationFrame(drawOscilloscope);
    const canvas = document.getElementById('music-oscilloscope');
    if (!canvas || !musicWaveform || !$(canvas).is(':visible')) return;
    const context = canvas.getContext('2d');
    const values = musicWaveform.getValue();
    const half = values.length / 2;
    let start = 0;
    for (let i = 1; i < half; i++) {
        if (values[i - 1] < 0 && values[i] >= 0) {
            start = i;
            break;
        }
    }
    // The amplitude is scaled to the canvas: the shape of the wave is visible whatever the volume
    let max = 0;
    for (let i = start; i < start + half; i++) max = Math.max(max, Math.abs(values[i]));
    const scale = max > 0.001 ? 1 / max : 0;
    const style = getComputedStyle(canvas);
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = style.getPropertyValue('--bg-4');
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    context.strokeStyle = style.getPropertyValue('--vitta-green');
    context.lineWidth = 2;
    context.beginPath();
    for (let x = 0; x < width; x++) {
        const value = values[start + Math.floor(x * half / width)];
        const y = height / 2 - value * scale * (height / 2 - 4);
        x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
    }
    context.stroke();
    context.lineWidth = 1;
}

const translateMusicPanel = elements => {
    if (typeof i18next !== 'undefined' && i18next.isInitialized) elements.localize();
};

// Note played with the stop and test buttons, and held/percussive sound, before the volume
const $musicHeader = $(`
    <div class="music-control">
        <label class="music-control-label"><b data-i18n="code.console.music.note">Note</b></label>
        <span id="music-note" class="music-slider-value" aria-live="polite">—</span>
        <button id="music-stop-button" class="btn btn-sm music-control-button">
            <i class="fas fa-stop"></i> <span data-i18n="code.console.music.stop">Arrêter</span>
        </button>
        <button id="music-test-button" class="btn btn-sm music-control-button">
            <i class="fas fa-play"></i> <span data-i18n="code.console.music.test">Tester</span>
        </button>
    </div>
    <div class="music-control" role="radiogroup" aria-labelledby="music-mode-label">
        <label id="music-mode-label" class="music-control-label"><b data-i18n="code.console.music.sound">Son</b></label>
        <button class="btn btn-sm music-control-button music-mode-button" data-mode="held" role="radio" data-i18n="code.console.music.held">Tenu</button>
        <button class="btn btn-sm music-control-button music-mode-button" data-mode="percussive" role="radio" data-i18n="code.console.music.percussive">Percussif</button>
    </div>`);
$('#music-panel').prepend($musicHeader);
// More effects and the oscilloscope
const $musicMore = $(`
    <button id="vibrato-button" class="btn btn-sm music-control-button" data-i18n="code.console.music.effects.vibrato">Vibrato</button>
    <button id="distortion-button" class="btn btn-sm music-control-button" data-i18n="code.console.music.effects.distortion">Distorsion</button>`);
$('#crush-button').after($musicMore);
const $musicOscilloscope = $(`
    <div class="music-control music-control-oscilloscope">
        <label class="music-control-label"><b data-i18n="code.console.music.oscilloscope">Oscilloscope</b></label>
        <canvas id="music-oscilloscope" width="240" height="110" role="img" aria-label="Oscilloscope"></canvas>
    </div>`);
$('#music-panel').append($musicOscilloscope);
translateMusicPanel($musicHeader.add($musicMore).add($musicOscilloscope));

$('#music-stop-button').on('click', stopMusic);
$('#music-test-button').on('click', testMusic);

function updateMusicMode(mode) {
    $('.music-mode-button').each(function () {
        const checked = this.dataset.mode === mode;
        $(this).toggleClass('active', checked).attr('aria-checked', String(checked));
    });
    if (synth) synth.envelope.set(MUSIC_ENVELOPES[mode]);
}
$('.music-mode-button').on('click', function () {
    saveMusicSettings({ mode: this.dataset.mode });
    updateMusicMode(this.dataset.mode);
});
updateMusicMode(musicSettings.mode);

// Values displayed under the sliders
$('#volume-slider').after('<span id="volume-value" class="music-slider-value" aria-live="polite"></span>');
$('#octave-slider').after('<span id="octave-value" class="music-slider-value" aria-live="polite"></span>');

$("#volume-slider").slider({
    orientation: "vertical",
    range: 'min',
    min: 0,
    max: 100,
    step: 5,
    value: musicSettings.volume,
    slide: (event, ui) => updateMusicVolume(ui.value),
    change: (event, ui) => {
        saveMusicSettings({ volume: ui.value });
        updateMusicVolume(ui.value);
    }
});

$("#octave-slider").slider({
    orientation: "vertical",
    range: 'min',
    min: 2,
    max: 6,
    step: 1,
    value: musicSettings.octave,
    slide: (event, ui) => updateMusicOctave(ui.value),
    change: (event, ui) => {
        saveMusicSettings({ octave: ui.value });
        updateMusicOctave(ui.value);
    }
});

if ($('#music-panel').length) {
    updateMusicVolume();
    updateMusicOctave();
}

for (const [selector, [effect, wet]] of Object.entries(MUSIC_EFFECTS)) {
    const enabled = musicSettings.effects.includes(selector);
    $(selector).toggleClass('active', enabled).attr('aria-pressed', String(enabled)).on('click', function () {
        const enabled = !$(this).hasClass('active');
        $(this).toggleClass('active', enabled).attr('aria-pressed', String(enabled));
        if (effect()) effect().wet.value = enabled ? wet : 0;
        saveMusicSettings({ effects: Object.keys(MUSIC_EFFECTS).filter(s => $(s).hasClass('active')) });
    });
}

// Waveforms: one button with the drawing of the wave for each option of the select of the page, which is replaced
const MUSIC_WAVEFORM_ICONS = {
    sine: 'M0 6 C2 0 4 0 6 6 S10 12 12 6 S16 0 18 6 S22 12 24 6',
    triangle: 'M0 9 L4 3 L10 9 L16 3 L22 9 L24 7',
    square: 'M0 9 V3 H6 V9 H12 V3 H18 V9 H24',
    sawtooth: 'M0 9 L8 3 V9 L16 3 V9 L24 3 V9'
};
const $waveformSelect = $('#osc-select');
const $waveformButtons = $waveformSelect.find('option').map(function () {
    return $(`<button class="btn btn-sm music-control-button music-waveform-button" role="radio" data-waveform="${this.value}">
        <svg viewBox="0 0 24 12" aria-hidden="true"><path d="${MUSIC_WAVEFORM_ICONS[this.value] || ''}"/></svg>
        <span></span>
    </button>`).find('span').attr('data-i18n', $(this).attr('data-i18n')).text($(this).text().trim()).end()[0];
});
$waveformSelect.closest('.music-control').attr({ role: 'radiogroup' });
$waveformSelect.replaceWith($waveformButtons);
translateMusicPanel($waveformButtons);

// Changed without stopping the note being played
function updateMusicWaveform(waveform) {
    $('.music-waveform-button').each(function () {
        const checked = this.dataset.waveform === waveform;
        $(this).toggleClass('active', checked).attr('aria-checked', String(checked));
    });
    if (synth) synth.oscillator.type = waveform;
}
$('.music-waveform-button').on('click', function () {
    saveMusicSettings({ waveform: this.dataset.waveform });
    updateMusicWaveform(this.dataset.waveform);
});
updateMusicWaveform(musicSettings.waveform);

// The sound stops when the board is unplugged or disconnected (the simulator stops it in Simulator.stop)
navigator.serial?.addEventListener('disconnect', stopMusic);
navigator.usb?.addEventListener('disconnect', stopMusic);
$(document).on('click', '#disconnect-opt', stopMusic);
