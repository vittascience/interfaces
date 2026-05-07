const DOC_URL_V2 = "https://microbit-micropython.readthedocs.io/en/v2-docs/";

function getSpecificCompleterTrees() {
    const tree = {};
    const typeTree = {};
    const decorators = {};

    // microbit
    const MicroBitImageContent = [
        { value: "ALL_ARROWS", description: "MICROBIT_IMAGE_BUILTIN_SEQ" },
        { value: "ALL_CLOCKS", description: "MICROBIT_IMAGE_BUILTIN_SEQ" },
        { value: "ANGRY", description: "MICROBIT_IMAGE_ANGRY", returns: "MicroBitImage" },
        { value: "ARROW_E", description: "MICROBIT_IMAGE_ARROW_E", returns: "MicroBitImage" },
        { value: "ARROW_N", description: "MICROBIT_IMAGE_ARROW_N", returns: "MicroBitImage" },
        { value: "ARROW_NE", description: "MICROBIT_IMAGE_ARROW_NE", returns: "MicroBitImage" },
        { value: "ARROW_NW", description: "MICROBIT_IMAGE_ARROW_NW", returns: "MicroBitImage" },
        { value: "ARROW_S", description: "MICROBIT_IMAGE_ARROW_S", returns: "MicroBitImage" },
        { value: "ARROW_SE", description: "MICROBIT_IMAGE_ARROW_SE", returns: "MicroBitImage" },
        { value: "ARROW_SW", description: "MICROBIT_IMAGE_ARROW_SW", returns: "MicroBitImage" },
        { value: "ARROW_W", description: "MICROBIT_IMAGE_ARROW_W", returns: "MicroBitImage" },
        { value: "ASLEEP", description: "MICROBIT_IMAGE_ASLEEP", returns: "MicroBitImage" },
        { value: "BUTTERFLY", description: "MICROBIT_IMAGE_BUTTERFLY", returns: "MicroBitImage" },
        { value: "CHESSBOARD", description: "MICROBIT_IMAGE_CHESSBOARD", returns: "MicroBitImage" },
        { value: "CLOCK1", description: "MICROBIT_IMAGE_CLOCK1", returns: "MicroBitImage" },
        { value: "CLOCK2", description: "MICROBIT_IMAGE_CLOCK2", returns: "MicroBitImage" },
        { value: "CLOCK3", description: "MICROBIT_IMAGE_CLOCK3", returns: "MicroBitImage" },
        { value: "CLOCK4", description: "MICROBIT_IMAGE_CLOCK4", returns: "MicroBitImage" },
        { value: "CLOCK5", description: "MICROBIT_IMAGE_CLOCK5", returns: "MicroBitImage" },
        { value: "CLOCK6", description: "MICROBIT_IMAGE_CLOCK6", returns: "MicroBitImage" },
        { value: "CLOCK7", description: "MICROBIT_IMAGE_CLOCK7", returns: "MicroBitImage" },
        { value: "CLOCK8", description: "MICROBIT_IMAGE_CLOCK8", returns: "MicroBitImage" },
        { value: "CLOCK9", description: "MICROBIT_IMAGE_CLOCK9", returns: "MicroBitImage" },
        { value: "CLOCK10", description: "MICROBIT_IMAGE_CLOCK10", returns: "MicroBitImage" },
        { value: "CLOCK11", description: "MICROBIT_IMAGE_CLOCK11", returns: "MicroBitImage" },
        { value: "CLOCK12", description: "MICROBIT_IMAGE_CLOCK12", returns: "MicroBitImage" },
        { value: "CONFUSED", description: "MICROBIT_IMAGE_CONFUSED", returns: "MicroBitImage" },
        { value: "COW", description: "MICROBIT_IMAGE_COW", returns: "MicroBitImage" },
        { value: "DIAMOND", description: "MICROBIT_IMAGE_DIAMOND", returns: "MicroBitImage" },
        { value: "DIAMOND_SMALL", description: "MICROBIT_IMAGE_DIAMOND_SMALL", returns: "MicroBitImage" },
        { value: "DUCK", description: "MICROBIT_IMAGE_DUCK", returns: "MicroBitImage" },
        { value: "FABULOUS", description: "MICROBIT_IMAGE_FABULOUS", returns: "MicroBitImage" },
        { value: "GHOST", description: "MICROBIT_IMAGE_GHOST", returns: "MicroBitImage" },
        { value: "GIRAFFE", description: "MICROBIT_IMAGE_GIRAFFE", returns: "MicroBitImage" },
        { value: "HAPPY", description: "MICROBIT_IMAGE_HAPPY", returns: "MicroBitImage" },
        { value: "HEART", description: "MICROBIT_IMAGE_HEART", returns: "MicroBitImage" },
        { value: "HEART_SMALL", description: "MICROBIT_IMAGE_HEART_SMALL", returns: "MicroBitImage" },
        { value: "HOUSE", description: "MICROBIT_IMAGE_HOUSE", returns: "MicroBitImage" },
        { value: "MEH", description: "MICROBIT_IMAGE_MEH", returns: "MicroBitImage" },
        { value: "MUSIC_CROTCHET", description: "MICROBIT_IMAGE_MUSIC_CROTCHET", returns: "MicroBitImage" },
        { value: "MUSIC_QUAVER", description: "MICROBIT_IMAGE_MUSIC_QUAVER", returns: "MicroBitImage" },
        { value: "MUSIC_QUAVERS", description: "MICROBIT_IMAGE_MUSIC_QUAVERS", returns: "MicroBitImage" },
        { value: "NO", description: "MICROBIT_IMAGE_NO", returns: "MicroBitImage" },
        { value: "PACMAN", description: "MICROBIT_IMAGE_PACMAN", returns: "MicroBitImage" },
        { value: "PITCHFORK", description: "MICROBIT_IMAGE_PITCHFORK", returns: "MicroBitImage" },
        { value: "RABBIT", description: "MICROBIT_IMAGE_RABBIT", returns: "MicroBitImage" },
        { value: "ROLLERSKATE", description: "MICROBIT_IMAGE_ROLLERSKATE", returns: "MicroBitImage" },
        { value: "SAD", description: "MICROBIT_IMAGE_SAD", returns: "MicroBitImage" },
        { value: "SCISSORS", description: "MICROBIT_IMAGE_SCISSORS", returns: "MicroBitImage" },
        { value: "SILLY", description: "MICROBIT_IMAGE_SILLY", returns: "MicroBitImage" },
        { value: "SKULL", description: "MICROBIT_IMAGE_SKULL", returns: "MicroBitImage" },
        { value: "SMILE", description: "MICROBIT_IMAGE_SMILE", returns: "MicroBitImage" },
        { value: "SNAKE", description: "MICROBIT_IMAGE_SNAKE", returns: "MicroBitImage" },
        { value: "SQUARE", description: "MICROBIT_IMAGE_SQUARE", returns: "MicroBitImage" },
        { value: "SQUARE_SMALL", description: "MICROBIT_IMAGE_SQUARE_SMALL", returns: "MicroBitImage" },
        { value: "STICKFIGURE", description: "MICROBIT_IMAGE_STICKFIGURE", returns: "MicroBitImage" },
        { value: "SURPRISED", description: "MICROBIT_IMAGE_SURPRISED", returns: "MicroBitImage" },
        { value: "SWORD", description: "MICROBIT_IMAGE_SWORD", returns: "MicroBitImage" },
        { value: "TARGET", description: "MICROBIT_IMAGE_TARGET", returns: "MicroBitImage" },
        { value: "TORTOISE", description: "MICROBIT_IMAGE_TORTOISE", returns: "MicroBitImage" },
        { value: "TRIANGLE", description: "MICROBIT_IMAGE_TRIANGLE", returns: "MicroBitImage" },
        { value: "TRIANGLE_LEFT", description: "MICROBIT_IMAGE_TRIANGLE_LEFT", returns: "MicroBitImage" },
        { value: "TSHIRT", description: "MICROBIT_IMAGE_TSHIRT", returns: "MicroBitImage" },
        { value: "UMBRELLA", description: "MICROBIT_IMAGE_UMBRELLA", returns: "MicroBitImage" },
        { value: "XMAS", description: "MICROBIT_IMAGE_XMAS", returns: "MicroBitImage" },
        { value: "YES", description: "MICROBIT_IMAGE_YES", returns: "MicroBitImage" },
        { value: "__class__", meta: "Image" },
        { value: "__name__", meta: "Image" },
        { value: "__bases__", meta: "Image" },
        { value: "__dict__", meta: "Image" }
    ];
    const audioContent = [
        { value: "stop", meta: "-- <function>", snippet: "stop()", description: "MICROBIT_AUDIO_STOP", docUrl: DOC_URL_V2 + "audio.html#audio.stop" },
        { value: "is_playing", meta: "-- <function>", snippet: "is_playing()", description: "MICROBIT_AUDIO_IS_PLAYING", docUrl: DOC_URL_V2 + "audio.html#audio.is_playing", returns: "bool" },
        { value: "play", meta: "-- <function>", snippet: "play(${1:})", description: "MICROBIT_AUDIO_PLAY", docUrl: DOC_URL_V2 + "audio.html#audio.play" },
        {
            value: "AudioFrame", meta: "audio", description: "MICROBIT_AUDIO_AUDIOFRAME", docUrl: DOC_URL_V2 + "audio.html#audioframe", content: [
                { value: "_class__", meta: "AudioFrame" },
                { value: "__name__", meta: "AudioFrame" },
                { value: "__bases__", meta: "AudioFrame" },
                { value: "__dict__", meta: "AudioFrame" }
            ]
        },
        { value: "AudioFrame()", meta: "constructor", description: "MICROBIT_AUDIO_AUDIOFRAME_CONSTRUCTOR", snippet: "AudioFrame()", returns: "AudioFrame", docUrl: DOC_URL_V2 + "audio.html#audio.AudioFrame" },
        { value: "__class__", meta: "audio" },
        { value: "__name__", meta: "audio" },
    ];
    const SoundEffectType = {
        value: "SoundEffect",
        meta: "audio",
        description: "MICROBIT_AUDIO_SOUNDEFFECT",
        docUrl: DOC_URL_V2 + "audio.html#sound-effects-v2",
    };
    const SoundEffectConstructor = {
        value: "SoundEffect()",
        title: "SoundEffect(freq_start=500, freq_end=2500, duration=500, vol_start=255, vol_end=0, waveform=WAVEFORM_SQUARE, fx=FX_NONE, shape=SHAPE_LOG)",
        meta: "constructor",
        description: "MICROBIT_AUDIO_SOUNDEFFECT_CONSTRUCTOR",
        returns: "MicroBitSoundEffect",
    };
    const SoundEffectContent = [
        { value: "FX_NONE", description: "MICROBIT_SOUNDEFFECT_FX_NONE" },
        { value: "FX_TREMOLO", description: "MICROBIT_SOUNDEFFECT_FX_TREMOLO" },
        { value: "FX_VIBRATO", description: "MICROBIT_SOUNDEFFECT_FX_VIBRATO" },
        { value: "FX_WARBLE", description: "MICROBIT_SOUNDEFFECT_FX_WARBLE" },
        { value: "SHAPE_CURVE", description: "MICROBIT_SOUNDEFFECT_SHAPE_CURVE" },
        { value: "SHAPE_LINEAR", description: "MICROBIT_SOUNDEFFECT_SHAPE_LINEAR" },
        { value: "SHAPE_LOG", description: "MICROBIT_SOUNDEFFECT_SHAPE_LOG" },
        { value: "WAVEFORM_NOISE", description: "MICROBIT_SOUNDEFFECT_WAVEFORM_NOISE" },
        { value: "WAVEFORM_SAWTOOTH", description: "MICROBIT_SOUNDEFFECT_WAVEFORM_SAWTOOTH" },
        { value: "WAVEFORM_SINE", description: "MICROBIT_SOUNDEFFECT_WAVEFORM_SINE" },
        { value: "WAVEFORM_SQUARE", description: "MICROBIT_SOUNDEFFECT_WAVEFORM_SQUARE" },
        { value: "WAVEFORM_TRIANGLE", description: "MICROBIT_SOUNDEFFECT_WAVEFORM_TRIANGLE" },
        { value: "__class__" },
    ];
    SoundEffectType.content = [...SoundEffectContent];
    SoundEffectType.content.push(...[
        { value: "__name__" },
        { value: "__bases__" },
        { value: "__dict__" }
    ]);
    SoundEffectConstructor.content = [...SoundEffectContent];
    audioContent.push(SoundEffectType);
    audioContent.push(SoundEffectConstructor);
    decorators.microbit = [
        { title: "@run_every(days=None, h=None, min=None, s=None, ms=None)", value: "run_every", meta: "decorator", kind: "decorator", score: 2000, snippet: "@run_every(${1:})", description: "MICROBIT_RUN_EVERY_DECORATOR" }
    ];
    tree.microbit = [
        { title: "reset()", value: "reset", meta: "-- <function>", snippet: "reset()", description: "MICROBIT_RESET", docUrl: DOC_URL_V2 + "microbit.html#microbit.reset" },
        { title: "sleep(ms)", value: "sleep", meta: "-- <function>", snippet: "sleep(${1:})", description: "MICROBIT_SLEEP", docUrl: DOC_URL_V2 + "microbit.html#microbit.sleep" },
        { title: "running_time()", value: "running_time", meta: "-- <function>", snippet: "running_time()", description: "MICROBIT_RUNNING_TIME", docUrl: DOC_URL_V2 + "microbit.html#microbit.running_time", returns: "int" },
        { title: "panic(error_code)", value: "panic", meta: "-- <function>", snippet: "panic(${1:})", description: "MICROBIT_PANIC", docUrl: DOC_URL_V2 + "microbit.html#microbit.panic" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "MICROBIT_TEMPERATURE", docUrl: DOC_URL_V2 + "microbit.html#microbit.temperature", returns: "int" },
        { title: "set_volume(volume)", value: "set_volume", meta: "-- <function>", snippet: "set_volume(${1:})", description: "MICROBIT_SET_VOLUME", docUrl: DOC_URL_V2 + "microbit.html#microbit.set_volume" },
        { title: "ws2812_write(pin, buf)", value: "ws2812_write", meta: "-- <function>", snippet: "ws2812_write(${1:})", description: "MICROBIT_WS2812_WRITE", docUrl: DOC_URL_V2 + "microbit.html#microbit.ws2812_write" },
        { title: "scale(value, from_low, from_high, to_low, to_high)", value: "scale", meta: "-- <function>", snippet: "scale(${1:})", description: "MICROBIT_SCALE", docUrl: DOC_URL_V2 + "microbit.html#microbit.scale" },
        { title: "run_every(callback, days=None, h=None, min=None, s=None, ms=None)", value: "run_every", meta: "-- <function>", snippet: "run_every(${1:})", description: "MICROBIT_RUN_EVERY", docUrl: DOC_URL_V2 + "microbit.html#microbit.run_every" },
        {
            value: "display", meta: "microbit", description: 'MICROBIT_DISPLAY', docUrl: DOC_URL_V2 + "display.html",
            content: [
                { value: "__class__", meta: "display" },
                { value: "get_pixel", title: "get_pixel(x, y)", snippet: "get_pixel(${1:})", description: 'MICROBIT_DISPLAY_GET_PIXEL', docUrl: DOC_URL_V2 + "display.html#microbit.display.get_pixel" },
                { value: "set_pixel", title: "set_pixel(x, y, value)", snippet: "set_pixel(${1:})", description: 'MICROBIT_DISPLAY_SET_PIXEL', docUrl: DOC_URL_V2 + "display.html#microbit.display.set_pixel" },
                { value: "show", title: "show(image)", snippet: "show(${1:})", description: 'MICROBIT_DISPLAY_SHOW', docUrl: DOC_URL_V2 + "display.html#microbit.display.show" },
                { value: "show", title: "show(value, delay=400, *, wait=True, loop=False, clear=False)", snippet: "show(${1:})", description: 'MICROBIT_DISPLAY_SHOW_ADVANCED', docUrl: DOC_URL_V2 + "display.html#microbit.display.show", meta: 'ADVANCED' },
                { value: "scroll", title: "scroll(value, delay=150, *, wait=True, loop=False, monospace=False)", snippet: "scroll(${1:})", description: 'MICROBIT_DISPLAY_SCROLL', docUrl: DOC_URL_V2 + "display.html#microbit.display.scroll" },
                { value: "clear", snippet: "clear()", description: 'MICROBIT_DISPLAY_CLEAR', docUrl: DOC_URL_V2 + "display.html#microbit.display.clear" },
                { value: "on", snippet: "on()", description: 'MICROBIT_DISPLAY_ON', docUrl: DOC_URL_V2 + "display.html#microbit.display.on" },
                { value: "off", snippet: "off()", description: 'MICROBIT_DISPLAY_OFF', docUrl: DOC_URL_V2 + "display.html#microbit.display.off" },
                { value: "is_on", snippet: "is_on()", description: 'MICROBIT_DISPLAY_IS_ON', docUrl: DOC_URL_V2 + "display.html#microbit.display.is_on", returns: "bool" },
                { value: "read_light_level", snippet: "read_light_level()", description: 'MICROBIT_DISPLAY_READ_LIGHT_LEVEL', docUrl: DOC_URL_V2 + "display.html#microbit.display.read_light_level", returns: "int" }
            ]
        },
        {
            value: "button_a",
            meta: "microbit",
            description: "MICROBIT_BUTTON_A",
            docUrl: DOC_URL_V2 + "button.html#button_a",
            content: [
                { value: "is_pressed", snippet: "is_pressed()", description: "MICROBIT_BUTTON_IS_PRESSED", docUrl: DOC_URL_V2 + "button.html#Button.is_pressed" },
                { value: "was_pressed", snippet: "was_pressed()", description: "MICROBIT_BUTTON_WAS_PRESSED", docUrl: DOC_URL_V2 + "button.html#Button.was_pressed" },
                { value: "get_presses", snippet: "get_presses()", description: "MICROBIT_BUTTON_GET_PRESSES", docUrl: DOC_URL_V2 + "button.html#Button.get_presses" },
                { value: "__class__", meta: "button_a" }
            ]
        },
        {
            value: "button_b",
            meta: "microbit",
            description: "MICROBIT_BUTTON_B",
            docUrl: DOC_URL_V2 + "button.html#button_b",
            content: [
                { value: "is_pressed", snippet: "is_pressed()", description: "MICROBIT_BUTTON_IS_PRESSED", docUrl: DOC_URL_V2 + "button.html#Button.is_pressed" },
                { value: "was_pressed", snippet: "was_pressed()", description: "MICROBIT_BUTTON_WAS_PRESSED", docUrl: DOC_URL_V2 + "button.html#Button.was_pressed" },
                { value: "get_presses", snippet: "get_presses()", description: "MICROBIT_BUTTON_GET_PRESSES", docUrl: DOC_URL_V2 + "button.html#Button.get_presses" },
                { value: "__class__", meta: "button_b" }
            ]
        },
        {
            value: "Image",
            caption: "Image",
            meta: "microbit",
            description: "MICROBIT_IMAGE",
            content: MicroBitImageContent,
            docUrl: DOC_URL_V2 + "image.html#module-microbit",
            kind: "class"
        },
        {
            value: "Image@str",
            caption: "Image()",
            title: "Image(string)",
            snippet: "Image(${1:})",
            meta: "constructor",
            returns: "MicroBitImage",
            description: "MICROBIT_IMAGE_CONSTRUCTOR_STR"
        },
        {
            value: "Image@buf",
            caption: "Image()",
            title: "Image(width=None, height=None, buffer=None)",
            snippet: "Image(${1:})",
            meta: "constructor",
            returns: "MicroBitImage",
            description: "MICROBIT_IMAGE_CONSTRUCTOR_BUF"
        },
        {
            value: "Sound",
            meta: "microbit",
            description: "MICROBIT_SOUND",
            docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2",
            content: [
                { value: "GIGGLE", description: "MICROBIT_SOUND_GIGGLE", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "HAPPY", description: "MICROBIT_SOUND_HAPPY", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "HELLO", description: "MICROBIT_SOUND_HELLO", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "MYSTERIOUS", description: "MICROBIT_SOUND_MYSTERIOUS", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "SAD", description: "MICROBIT_SOUND_SAD", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "SLIDE", description: "MICROBIT_SOUND_SLIDE", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "SOARING", description: "MICROBIT_SOUND_SOARING", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "SPRING", description: "MICROBIT_SOUND_SPRING", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "TWINKLE", description: "MICROBIT_SOUND_TWINKLE", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "YAWN", description: "MICROBIT_SOUND_YAWN", docUrl: DOC_URL_V2 + "microbit_micropython_api.html#sound-v2" },
                { value: "__class__", meta: "Sound" },
                { value: "__name__", meta: "Sound" },
                { value: "__bases__", meta: "Sound" },
                { value: "__dict__", meta: "Sound" }
            ]
        },
        {
            value: "SoundEvent",
            meta: "microbit",
            description: "MICROBIT_SOUNDEVENT",
            docUrl: DOC_URL_V2 + "microbit_micropython_api.html#soundevent-v2",
            content: [
                { value: "LOUD", description: "MICROBIT_SOUNDEVENT_LOUD", },
                { value: "QUIET", description: "MICROBIT_SOUNDEVENT_QUIET", },
                { value: "__class__", meta: "SoundEvent" },
                { value: "__name__", meta: "SoundEvent" },
                { value: "__bases__", meta: "SoundEvent" },
                { value: "__dict__", meta: "SoundEvent" }
            ]
        },
        {
            value: "accelerometer",
            meta: "microbit",
            description: "MICROBIT_ACCELEROMETER",
            docUrl: DOC_URL_V2 + "accelerometer.html",
            content: [
                { value: "__class__", meta: "MicroBitAccelerometer" },
                { value: "get_x", title: "get_x()", snippet: "get_x()", description: "MICROBIT_ACCELEROMETER_GET_X", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_x", returns: "int" },
                { value: "get_y", title: "get_y()", snippet: "get_y()", description: "MICROBIT_ACCELEROMETER_GET_Y", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_y", returns: "int" },
                { value: "get_z", title: "get_z()", snippet: "get_z()", description: "MICROBIT_ACCELEROMETER_GET_Z", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_z", returns: "int" },
                { value: "get_values", title: "get_values()", snippet: "get_values()", description: "MICROBIT_ACCELEROMETER_GET_VALUES", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_values", returns: "tuple" },
                { value: "get_strength", title: "get_strength()", snippet: "get_strength()", description: "MICROBIT_ACCELEROMETER_GET_STRENGTH", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_strength", returns: "int" },
                { value: "current_gesture", title: "current_gesture()", snippet: "current_gesture()", description: "MICROBIT_ACCELEROMETER_CURRENT_GESTURE", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.current_gesture", returns: "str" },
                { value: "is_gesture", title: "is_gesture(name)", snippet: "is_gesture(${1:})", description: "MICROBIT_ACCELEROMETER_IS_GESTURE", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.is_gesture", returns: "bool" },
                { value: "was_gesture", title: "was_gesture(name)", snippet: "was_gesture(${1:})", description: "MICROBIT_ACCELEROMETER_WAS_GESTURE", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.was_gesture", returns: "bool" },
                { value: "get_gestures", title: "get_gestures()", snippet: "get_gestures()", description: "MICROBIT_ACCELEROMETER_GET_GESTURES", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.get_gestures", returns: "tuple" },
                { value: "set_range", title: "set_range(value)", snippet: "set_range(${1:})", description: "MICROBIT_ACCELEROMETER_SET_RANGE", meta: "-- <function>", docUrl: DOC_URL_V2 + "accelerometer.html#microbit.accelerometer.set_range" }
            ]
        },
        {
            value: "compass",
            meta: "microbit",
            description: "MICROBIT_COMPASS",
            docUrl: DOC_URL_V2 + "compass.html#module-microbit.compass",
            content: [
                { value: "calibrate", snippet: "calibrate()", description: "MICROBIT_COMPASS_CALIBRATE", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.calibrate" },
                { value: "clear_calibration", snippet: "clear_calibration()", description: "MICROBIT_COMPASS_CLEAR_CALIBRATION", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.clear_calibration" },
                { value: "get_field_strength", snippet: "get_field_strength()", description: "MICROBIT_COMPASS_GET_FIELD_STRENGTH", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.get_field_strength", returns: "int" },
                { value: "get_x", snippet: "get_x()", description: "MICROBIT_COMPASS_GET_X", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.get_x", returns: "int" },
                { value: "get_y", snippet: "get_y()", description: "MICROBIT_COMPASS_GET_Y", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.get_y", returns: "int" },
                { value: "get_z", snippet: "get_z()", description: "MICROBIT_COMPASS_GET_Z", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.get_z", returns: "int" },
                { value: "heading", snippet: "heading()", description: "MICROBIT_COMPASS_HEADING", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.heading", returns: "int" },
                { value: "is_calibrated", snippet: "is_calibrated()", description: "MICROBIT_COMPASS_IS_CALIBRATED", meta: "-- <function>", docUrl: DOC_URL_V2 + "compass.html#microbit.compass.is_calibrated", returns: "bool" },
                { value: "__class__", meta: "compass" }
            ]
        },
        {
            value: "speaker",
            meta: "microbit",
            description: "MICROBIT_SPEAKER",
            docUrl: DOC_URL_V2 + "speaker.html#module-microbit.speaker",
            content: [
                { value: "off", snippet: "off()", meta: "-- <function>", description: "MICROBIT_SPEAKER_OFF", docUrl: DOC_URL_V2 + "speaker.html#microbit.speaker.off" },
                { value: "on", snippet: "on()", meta: "-- <function>", description: "MICROBIT_SPEAKER_ON", docUrl: DOC_URL_V2 + "speaker.html#microbit.speaker.on" },
                { value: "__class__", meta: "speaker" }
            ]
        },
        {
            value: "microphone",
            meta: "microbit",
            description: "MICROBIT_MICROPHONE",
            docUrl: DOC_URL_V2 + "microphone.html#module-microbit.microphone",
            content: [
                { value: "current_event", title: "current_event()", snippet: "current_event()", description: "MICROBIT_MICROPHONE_CURRENT_EVENT", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.current_event", returns: "SoundEvent" },
                { value: "get_events", title: "get_events()", snippet: "get_events()", description: "MICROBIT_MICROPHONE_GET_EVENTS", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.get_events", returns: "tuple" },
                { value: "is_event", title: "is_event(event)", snippet: "is_event(${1:})", description: "MICROBIT_MICROPHONE_IS_EVENT", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.is_event", returns: "bool" },
                { value: "set_threshold", title: "set_threshold(event, value)", snippet: "set_threshold(${1:})", description: "MICROBIT_MICROPHONE_SET_THRESHOLD", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.set_threshold" },
                { value: "sound_level", title: "sound_level()", snippet: "sound_level()", description: "MICROBIT_MICROPHONE_SOUND_LEVEL", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.sound_level", returns: "int" },
                { value: "was_event", title: "was_event(event)", snippet: "was_event(${1:})", description: "MICROBIT_MICROPHONE_WAS_EVENT", meta: "-- <function>", docUrl: DOC_URL_V2 + "microphone.html#microbit.microphone.was_event", returns: "bool" },
                { value: "__class__", meta: "microphone" }
            ]
        },
        {
            value: "audio",
            meta: "microbit",
            content: audioContent
        },
        {
            value: "i2c",
            meta: "microbit",
            description: "MICROBIT_I2C",
            docUrl: DOC_URL_V2 + "i2c.html#microbit.i2c",
            content: [
                { value: "init", title: "init(freq=100000, sda=pin20, scl=pin19)", snippet: "init(${1:})", description: "MICROBIT_I2C_INIT", docUrl: DOC_URL_V2 + "i2c.html#microbit.i2c.init", meta: "-- <function>" },
                { value: "scan", title: "scan()", snippet: "scan()", description: "MICROBIT_I2C_SCAN", docUrl: DOC_URL_V2 + "i2c.html#microbit.i2c.scan", meta: "-- <function>", returns: "list" },
                { value: "read", title: "read(addr, n)", snippet: "read(${1:})", description: "MICROBIT_I2C_READ", docUrl: DOC_URL_V2 + "i2c.html#microbit.i2c.read", meta: "-- <function>", returns: "bytes" },
                { value: "write", title: "write(addr, buf)", snippet: "write(${1:})", description: "MICROBIT_I2C_WRITE", docUrl: DOC_URL_V2 + "i2c.html#microbit.i2c.write", meta: "-- <function>" },
                { value: "__class__", meta: "i2c" }
            ]
        },
        {
            value: "uart",
            meta: "microbit",
            content: [
                { value: "init", meta: "-- <function>", title: "init(baudrate=9600, bits=8, parity=None, stop=1, *, tx=None, rx=None)", snippet: "init(${1:baudrate=9600})", description: "MICROBIT_UART_INIT", docUrl: DOC_URL_V2 + "uart.html#microbit.uart.init" },
                { value: "any", meta: "-- <function>", title: "any()", snippet: "any()", description: "MICROBIT_UART_ANY", docUrl: DOC_URL_V2 + "uart.html#uart.any", returns: "int" },
                { value: "read", meta: "-- <function>", title: "read([nbytes])", snippet: "read(${1:})", description: "MICROBIT_UART_READ", docUrl: DOC_URL_V2 + "uart.html#uart.read", returns: "bytes" },
                { value: "readinto", meta: "-- <function>", title: "readinto(buf[, nbytes])", snippet: "readinto(${1:})", description: "MICROBIT_UART_READINTO", docUrl: DOC_URL_V2 + "uart.html#uart.readinto", returns: "int" },
                { value: "readline", meta: "-- <function>", title: "readline()", snippet: "readline()", description: "MICROBIT_UART_READLINE", docUrl: DOC_URL_V2 + "uart.html#uart.readline", returns: "bytes" },
                { value: "write", meta: "-- <function>", title: "write(buf)", snippet: "write(${1:})", description: "MICROBIT_UART_WRITE", docUrl: DOC_URL_V2 + "uart.html#uart.write", returns: "int" },
                { value: "ODD", description: "MICROBIT_UART_ODD" },
                { value: "EVEN", description: "MICROBIT_UART_EVEN" },
                { value: "__class__", meta: "uart" }
            ]
        },
        {
            value: "spi", meta: "microbit", description: "MICROBIT_SPI", content: [
                { title: "init(baudrate=1000000, bits=8, mode=0, sclk=pin13, mosi=pin15, miso=pin14)", value: "init", meta: "-- <function>", snippet: "init(${1:baudrate=1000000})", description: "MICROBIT_SPI_INIT" },
                { title: "read(nbytes, out=0)", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "MICROBIT_SPI_READ" },
                { title: "write(buffer)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "MICROBIT_SPI_WRITE" },
                { title: "write_readinto(out, in)", value: "write_readinto", meta: "-- <function>", snippet: "write_readinto(${1:})", description: "MICROBIT_SPI_WRITE_READINTO" },
                { value: "__class__", meta: "spi" }
            ]
        },
        {
            value: "pin_logo",
            meta: "microbit",
            content: [
                { value: "CAPACITIVE", returns: "int" },
                { value: "RESISTIVE", returns: "int" },
                { title: "is_touched()", value: "is_touched", meta: "-- <function>", returns: "bool" },
                { title: "set_touch_mode()", value: "set_touch_mode", meta: "-- <function>", snippet: "set_touch_mode(${1:})" },
                { value: "__class__", meta: "pin_logo" }
            ]
        }
    ];
    const PinType = {
        "MicroBitDigitalPin": [5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 19, 20, "_speaker"],
        "MicroBitAnalogDigitalPin": [3, 4, 10],
        "MicroBitTouchPin": [0, 1, 2]
    };
    for (const type in PinType) {
        for (const i of PinType[type]) {
            tree.microbit.push({
                value: "pin" + i,
                meta: "microbit",
                returns: type,
                description: "MICROBIT_PIN",
                docUrl: DOC_URL_V2 + "pin.html#pin-functions"
            });
        }
    }
    for (const type of ["MicroBitDigitalPin", "MicroBitAnalogDigitalPin", "MicroBitTouchPin"]) {
        const pinBaseMethods = [
            { value: "write_digital", meta: "-- <function>", title: "write_digital(value)", snippet: "write_digital(${1:})", description: "MICROBIT_PIN_WRITE_DIGITAL", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.write_digital" },
            { value: "read_digital", meta: "-- <function>", title: "read_digital()", snippet: "read_digital()", description: "MICROBIT_PIN_READ_DIGITAL", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.read_digital", returns: "int" },
            { value: "write_analog", meta: "-- <function>", title: "write_analog(value)", snippet: "write_analog(${1:})", description: "MICROBIT_PIN_WRITE_ANALOG", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.write_analog" },
            { value: "set_analog_period", meta: "-- <function>", title: "set_analog_period(period)", snippet: "set_analog_period(${1:})", description: "MICROBIT_PIN_SET_ANALOG_PERIOD", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.set_analog_period" },
            { value: "set_analog_period_microseconds", meta: "-- <function>", title: "set_analog_period_microseconds(period)", snippet: "set_analog_period_microseconds(${1:})", description: "MICROBIT_PIN_SET_ANALOG_PERIOD_US", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.set_analog_period_microseconds" },
            { value: "get_analog_period_microseconds", meta: "-- <function>", title: "get_analog_period_microseconds()", snippet: "get_analog_period_microseconds()", description: "MICROBIT_PIN_GET_ANALOG_PERIOD_US", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.get_analog_period_microseconds", returns: "int" },
            { value: "PULL_UP", returns: "int" },
            { value: "PULL_DOWN", returns: "int" },
            { value: "NO_PULL", returns: "int" },
            { value: "get_pull", meta: "-- <function>", title: "get_pull()", snippet: "get_pull()", description: "MICROBIT_PIN_GET_PULL", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.get_pull", returns: "int" },
            { value: "set_pull", meta: "-- <function>", title: "set_pull(value)", snippet: "set_pull(${1:})", description: "MICROBIT_PIN_SET_PULL", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.set_pull" },
            { value: "get_mode", meta: "-- <function>", title: "get_mode()", snippet: "get_mode()", description: "MICROBIT_PIN_GET_MODE", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitDigitalPin.get_mode", returns: "str" },
            { value: "__class__", meta: type }
        ];
        if (type === "MicroBitTouchPin") {
            pinBaseMethods.push(
                { title: "is_touched()", value: "is_touched", meta: "-- <function>", snippet: "is_touched()", description: "MICROBIT_PIN_IS_TOUCHED", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitTouchPin.is_touched", returns: "bool" }
            );
        }
        if (["MicroBitTouchPin", "MicroBitAnalogDigitalPin"].includes(type)) {
            pinBaseMethods.push(
                { title: "read_analog()", value: "read_analog", meta: "-- <function>", snippet: "read_analog()", description: "MICROBIT_PIN_READ_ANALOG", docUrl: DOC_URL_V2 + "pin.html#microbit.MicroBitAnalogDigitalPin.read_analog", returns: "int" }
            );
        }
        typeTree[type] = pinBaseMethods;
    }
    typeTree.MicroBitImage = [
        { value: "height", snippet: "height()", description: "MICROBIT_IMAGE_HEIGHT", docUrl: DOC_URL_V2 + "image.html#microbit.Image.height", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "width", snippet: "width()", description: "MICROBIT_IMAGE_WIDTH", docUrl: DOC_URL_V2 + "image.html#microbit.Image.width", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "copy", snippet: "copy()", description: "MICROBIT_IMAGE_COPY", docUrl: DOC_URL_V2 + "image.html#microbit.Image.copy", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "invert", snippet: "invert()", description: "MICROBIT_IMAGE_INVERT", docUrl: DOC_URL_V2 + "image.html#microbit.Image.invert", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "get_pixel", title: "get_pixel(x, y)", snippet: "get_pixel(${1:})", description: "MICROBIT_IMAGE_GET_PIXEL", docUrl: DOC_URL_V2 + "image.html#microbit.Image.get_pixel", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "blit", title: "blit(src, x, y, w, h, xdest=0, ydest=0)", snippet: "blit(${1:})", description: "MICROBIT_IMAGE_BLIT", docUrl: DOC_URL_V2 + "image.html#microbit.Image.blit", meta: "-- <function>" },
        { value: "crop", title: "crop(x, y, w, h)", snippet: "crop(${1:})", description: "MICROBIT_IMAGE_CROP", docUrl: DOC_URL_V2 + "image.html#microbit.Image.crop", meta: "-- <function>" },
        { value: "fill", title: "fill(value)", snippet: "fill(${1:})", description: "MICROBIT_IMAGE_FILL", docUrl: DOC_URL_V2 + "image.html#microbit.Image.fill", meta: "-- <function>" },
        { value: "set_pixel", title: "set_pixel(x, y, value)", snippet: "set_pixel(${1:})", description: "MICROBIT_IMAGE_SET_PIXEL", docUrl: DOC_URL_V2 + "image.html#microbit.Image.set_pixel", meta: "-- <function>" },
        { value: "shift_down", title: "shift_down(n)", snippet: "shift_down(${1:})", description: "MICROBIT_IMAGE_SHIFT_DOWN", docUrl: DOC_URL_V2 + "image.html#microbit.Image.shift_down", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "shift_left", title: "shift_left(n)", snippet: "shift_left(${1:})", description: "MICROBIT_IMAGE_SHIFT_LEFT", docUrl: DOC_URL_V2 + "image.html#microbit.Image.shift_left", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "shift_right", title: "shift_right(n)", snippet: "shift_right(${1:})", description: "MICROBIT_IMAGE_SHIFT_RIGHT", docUrl: DOC_URL_V2 + "image.html#microbit.Image.shift_right", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "shift_up", title: "shift_up(n)", snippet: "shift_up(${1:})", description: "MICROBIT_IMAGE_SHIFT_UP", docUrl: DOC_URL_V2 + "image.html#microbit.Image.shift_up", meta: "-- <function>", returns: "MicroBitImage" },
        { value: "__class__", meta: "Image" },
    ];
    typeTree.MicroBitSoundEffect = [
        { value: "copy", snippet: "copy()", meta: "-- <function>", description: "MICROBIT_AUDIO_SOUNDEFFECT_COPY", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.copy", returns: "MicroBitSoundEffect" },
        { value: "_from_string", snippet: "_from_string(${1:})", meta: "-- <function>", description: "MICROBIT_AUDIO_SOUNDEFFECT_FROM_STRING", returns: "MicroBitSoundEffect" },
        { value: "freq_start", description: "MICROBIT_AUDIO_SOUNDEFFECT_FREQ_START", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.freq_start" },
        { value: "freq_end", description: "MICROBIT_AUDIO_SOUNDEFFECT_FREQ_END", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.freq_end" },
        { value: "duration", description: "MICROBIT_AUDIO_SOUNDEFFECT_DURATION", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.duration" },
        { value: "vol_start", description: "MICROBIT_AUDIO_SOUNDEFFECT_VOL_START", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.vol_start" },
        { value: "vol_end", description: "MICROBIT_AUDIO_SOUNDEFFECT_VOL_END", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.vol_end" },
        { value: "waveform", description: "MICROBIT_AUDIO_SOUNDEFFECT_WAVEFORM", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.waveform" },
        { value: "fx", description: "MICROBIT_AUDIO_SOUNDEFFECT_FX", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.fx" },
        { value: "shape", description: "MICROBIT_AUDIO_SOUNDEFFECT_SHAPE", docUrl: DOC_URL_V2 + "audio.html#audio.SoundEffect.shape" },
        { value: "__class__", meta: "SoundEffect" }
    ];
    typeTree.AudioFrame = [
        { value: "copyfrom", title: "copyfrom(other)", snippet: "copyfrom(${1:})", meta: "-- <function>", description: "MICROBIT_AUDIO_AUDIOFRAME_COPY_FROM" },
        { value: "_class__", meta: "AudioFrame" },
    ];

    // music
    tree.music = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})" },
        { title: "reset()", value: "reset", meta: "-- <function>" },
        { title: "set_tempo()", value: "set_tempo", meta: "-- <function>", snippet: "set_tempo(${1:})" },
        { title: "get_tempo()", value: "get_tempo", meta: "-- <function>", returns: "tuple" },
        { title: "play()", value: "play", meta: "-- <function>", snippet: "play(${1:})" },
        { title: "pitch()", value: "pitch", meta: "-- <function>", snippet: "pitch(${1:})" },
        { title: "stop()", value: "stop", meta: "-- <function>" },
        { title: "DADADADUM", value: "DADADADUM", returns: "tuple" },
        { title: "ENTERTAINER", value: "ENTERTAINER", returns: "tuple" },
        { value: "PRELUDE", returns: "tuple" },
        { value: "ODE", returns: "tuple" },
        { value: "NYAN", returns: "tuple" },
        { value: "RINGTONE", returns: "tuple" },
        { value: "FUNK", returns: "tuple" },
        { value: "BLUES", returns: "tuple" },
        { value: "BIRTHDAY", returns: "tuple" },
        { value: "WEDDING", returns: "tuple" },
        { value: "FUNERAL", returns: "tuple" },
        { value: "PUNCHLINE", returns: "tuple" },
        { value: "PYTHON", returns: "tuple" },
        { value: "BADDY", returns: "tuple" },
        { value: "CHASE", returns: "tuple" },
        { value: "BA_DING", returns: "tuple" },
        { value: "WAWAWAWAA", returns: "tuple" },
        { value: "JUMP_UP", returns: "tuple" },
        { value: "JUMP_DOWN", returns: "tuple" },
        { value: "POWER_UP", returns: "tuple" },
        { value: "POWER_DOWN", returns: "tuple" },
        { value: "__name__", meta: "music" }
    ];

    // speech
    tree.speech = [
        { value: "translate", meta: "-- <function>", title: "translate(words)", snippet: "translate(${1:})", description: "MICROBIT_SPEECH_TRANSLATE", docUrl: DOC_URL_V2 + "speech.html#speech.translate", returns: "str" },
        { value: "pronounce", meta: "-- <function>", title: "pronounce(phonemes, *, pitch=64, speed=72, mouth=128, throat=128, pin=pin0)", snippet: "pronounce(${1:})", description: "MICROBIT_SPEECH_PRONOUNCE", docUrl: DOC_URL_V2 + "speech.html#speech.pronounce" },
        { value: "say", meta: "-- <function>", title: "say(words, *, pitch=64, speed=72, mouth=128, throat=128, pin=pin0)", snippet: "say(${1:})", description: "MICROBIT_SPEECH_SAY", docUrl: DOC_URL_V2 + "speech.html#speech.say" },
        { value: "sing", meta: "-- <function>", title: "sing(phonemes, *, pitch=64, speed=72, mouth=128, throat=128, pin=pin0)", snippet: "sing(${1:})", description: "MICROBIT_SPEECH_SING", docUrl: DOC_URL_V2 + "speech.html#speech.sing" },
        { value: "__name__", meta: "speech" }
    ];

    // audio
    tree.audio = audioContent;

    // radio
    tree.radio = [
        { value: "RATE_1MBIT", description: "MICROBIT_RADIO_RATE_1MBIT", docUrl: DOC_URL_V2 + "radio.html#radio.RATE_1MBIT" },
        { value: "RATE_2MBIT", description: "MICROBIT_RADIO_RATE_2MBIT", docUrl: DOC_URL_V2 + "radio.html#radio.RATE_2MBIT" },
        { value: "on", meta: "-- <function>", title: "on()", snippet: "on()", description: "MICROBIT_RADIO_ON", docUrl: DOC_URL_V2 + "radio.html#radio.on" },
        { value: "off", meta: "-- <function>", title: "off()", snippet: "off()", description: "MICROBIT_RADIO_OFF", docUrl: DOC_URL_V2 + "radio.html#radio.off" },
        { value: "config", meta: "-- <function>", title: "config(**kwargs)", snippet: "config(${1:**kwargs})", description: "MICROBIT_RADIO_CONFIG", docUrl: DOC_URL_V2 + "radio.html#radio.config" },
        { value: "reset", meta: "-- <function>", title: "reset()", snippet: "reset()", description: "MICROBIT_RADIO_RESET", docUrl: DOC_URL_V2 + "radio.html#radio.reset" },
        { value: "send_bytes", meta: "-- <function>", title: "send_bytes(message)", snippet: "send_bytes(${1:})", description: "MICROBIT_RADIO_SEND_BYTES", docUrl: DOC_URL_V2 + "radio.html#radio.send_bytes" },
        { value: "receive_bytes", meta: "-- <function>", title: "receive_bytes()", snippet: "receive_bytes()", description: "MICROBIT_RADIO_RECEIVE_BYTES", docUrl: DOC_URL_V2 + "radio.html#radio.receive_bytes" },
        { value: "receive_bytes_into", meta: "-- <function>", title: "receive_bytes_into(buffer)", snippet: "receive_bytes_into(${1:})", description: "MICROBIT_RADIO_RECEIVE_BYTES_INTO", docUrl: DOC_URL_V2 + "radio.html#radio.receive_bytes_into" },
        { value: "send", meta: "-- <function>", title: "send(message)", snippet: "send(${1:})", description: "MICROBIT_RADIO_SEND", docUrl: DOC_URL_V2 + "radio.html#radio.send" },
        { value: "receive", meta: "-- <function>", title: "receive()", snippet: "receive()", description: "MICROBIT_RADIO_RECEIVE", docUrl: DOC_URL_V2 + "radio.html#radio.receive" },
        { value: "receive_full", meta: "-- <function>", title: "receive_full()", snippet: "receive_full()", description: "MICROBIT_RADIO_RECEIVE_FULL", docUrl: DOC_URL_V2 + "radio.html#radio.receive_full" },
        { value: "__class__", meta: "radio" },
        { value: "__name__", meta: "radio" }
    ];

    // log
    tree.log = [
        { value: "MILLISECONDS", description: "MICROBIT_LOG_MILLISECONDS" },
        { value: "SECONDS", description: "MICROBIT_LOG_SECONDS" },
        { value: "MINUTES", description: "MICROBIT_LOG_MINUTES" },
        { value: "HOURS", description: "MICROBIT_LOG_HOURS" },
        { value: "DAYS", description: "MICROBIT_LOG_DAYS" },
        { value: "set_labels", meta: "-- <function>", title: "set_labels(*labels, timestamp=log.SECONDS)", snippet: "set_labels(${1:})", description: "MICROBIT_LOG_SET_LABELS", docUrl: DOC_URL_V2 + "log.html#log.set_labels" },
        { value: "set_mirroring", meta: "-- <function>", title: "set_mirroring(serial)", snippet: "set_mirroring(${1:})", description: "MICROBIT_LOG_SET_MIRRORING", docUrl: DOC_URL_V2 + "log.html#log.set_mirroring" },
        { value: "delete", meta: "-- <function>", title: "delete(full=False)", snippet: "delete(${1:full=False})", description: "MICROBIT_LOG_DELETE", docUrl: DOC_URL_V2 + "log.html#log.delete" },
        { value: "add", meta: "-- <function>", title: "add(data_dictionary, /, *, **kwargs)", snippet: "add(${1:})", description: "MICROBIT_LOG_ADD", docUrl: DOC_URL_V2 + "log.html#log.add" },
        { value: "__class__", meta: "log" },
        { value: "__name__", meta: "log" }
    ];

    // os
    tree.os = [
        { value: "listdir", meta: "-- <function>", title: "listdir()", snippet: "listdir()", description: "MICROBIT_OS_LISTDIR", docUrl: DOC_URL_V2 + "os.html#os.listdir", returns: "list" },
        { value: "remove", meta: "-- <function>", title: "remove(filename)", snippet: "remove(${1:})", description: "MICROBIT_OS_REMOVE", docUrl: DOC_URL_V2 + "os.html#os.remove", },
        { value: "size", meta: "-- <function>", title: "size(filename)", snippet: "size(${1:})", description: "MICROBIT_OS_SIZE", docUrl: DOC_URL_V2 + "os.html#os.size" },
        { value: "uname", meta: "-- <function>", title: "uname()", snippet: "uname()", description: "MICROBIT_OS_UNAME", docUrl: DOC_URL_V2 + "os.html#os.uname", returns: "MicroBitOSUname" },
        { value: "__class__", meta: "os" },
        { value: "__name__", meta: "os" },
    ];

    // power
    tree.power = [
        { title: "off()", value: "off", meta: "-- <function>", snippet: "off()", description: "MICROBIT_POWER_OFF", docUrl: DOC_URL_V2 + "power.html#power.off" },
        { title: "deep_sleep(ms=None, wake_on=None, run_every=True)", value: "deep_sleep", meta: "-- <function>", snippet: "deep_sleep(${1:})", description: "MICROBIT_POWER_DEEP_SLEEP", docUrl: DOC_URL_V2 + "power.html#power.deep_sleep" },
        { value: "__name__", meta: "power", description: "MICROBIT_POWER_POWER", docUrl: DOC_URL_V2 + "power.html" },
    ];

    // utime
    const utime = [
        { title: "sleep(seconds)", value: "sleep", meta: "-- <function>", snippet: "sleep(${1:})", description: "UTIME_SLEEP", docUrl: DOC_URL_V2 + "utime.html#utime.sleep" },
        { title: "sleep_ms(ms)", value: "sleep_ms", meta: "-- <function>", snippet: "sleep_ms(${1:})", description: "UTIME_SLEEP_MS", docUrl: DOC_URL_V2 + "utime.html#utime.sleep_ms" },
        { title: "sleep_us(us)", value: "sleep_us", meta: "-- <function>", snippet: "sleep_us(${1:})", description: "UTIME_SLEEP_US", docUrl: DOC_URL_V2 + "utime.html#utime.sleep_us" },
        { title: "ticks_ms()", value: "ticks_ms", meta: "-- <function>", snippet: "ticks_ms()", description: "UTIME_TICKS_MS", docUrl: DOC_URL_V2 + "utime.html#utime.ticks_ms", returns: "int" },
        { title: "ticks_us()", value: "ticks_us", meta: "-- <function>", snippet: "ticks_us()", description: "UTIME_TICKS_US", docUrl: DOC_URL_V2 + "utime.html#utime.ticks_us", returns: "int" },
        { title: "ticks_add(ticks, delta)", value: "ticks_add", meta: "-- <function>", snippet: "ticks_add(${1:})", description: "UTIME_TICKS_ADD", docUrl: DOC_URL_V2 + "utime.html#utime.ticks_add" },
        { title: "ticks_diff(ticks1, ticks2)", value: "ticks_diff", meta: "-- <function>", snippet: "ticks_diff(${1:})", description: "UTIME_TICKS_DIFF", docUrl: DOC_URL_V2 + "utime.html#utime.ticks_diff" },
        { value: "__name__", meta: "utime" }
    ];
    tree.utime = utime;
    tree.time = utime;

    // machine
    tree.machine = [
        { title: "unique_id()", value: "unique_id", meta: "-- <function>", snippet: "unique_id()", description: "MICROBIT_MACHINE_UNIQUE_ID", returns: "bytes", docUrl: DOC_URL_V2 + "machine.html#machine.unique_id" },
        { title: "reset()", value: "reset", meta: "-- <function>", snippet: "reset()", description: "MICROBIT_MACHINE_RESET", docUrl: DOC_URL_V2 + "machine.html#machine.reset" },
        { title: "freq()", value: "freq", meta: "-- <function>", snippet: "freq()", description: "MICROBIT_MACHINE_FREQ", returns: "int", docUrl: DOC_URL_V2 + "machine.html#machine.freq" },
        { title: "disable_irq()", value: "disable_irq", meta: "-- <function>", snippet: "disable_irq()", description: "MICROBIT_MACHINE_DISABLE_IRQ", returns: "int", docUrl: DOC_URL_V2 + "machine.html#machine.disable_irq" },
        { title: "enable_irq(state)", value: "enable_irq", meta: "-- <function>", snippet: "enable_irq(${1:})", description: "MICROBIT_MACHINE_ENABLE_IRQ", docUrl: DOC_URL_V2 + "machine.html#machine.enable_irq" },
        { title: "time_pulse_us(pin, pulse_level, timeout_us=1000000)", value: "time_pulse_us", meta: "-- <function>", snippet: "time_pulse_us(${1:})", description: "MICROBIT_MACHINE_TIME_PULSE_US", returns: "int", docUrl: DOC_URL_V2 + "machine.html#machine.time_pulse_us" },
        { value: "mem8", meta: "machine", description: "MICROBIT_MACHINE_MEM8", returns: "mem", docUrl: DOC_URL_V2 + "machine.html#reading-memory" },
        { value: "mem16", meta: "machine", description: "MICROBIT_MACHINE_MEM16", returns: "mem", docUrl: DOC_URL_V2 + "machine.html#reading-memory" },
        { value: "mem32", meta: "machine", description: "MICROBIT_MACHINE_MEM32", returns: "mem", docUrl: DOC_URL_V2 + "machine.html#reading-memory" },
        { value: "__name__", meta: "machine", description: "MICROBIT_MACHINE_MACHINE", docUrl: DOC_URL_V2 + "machine.html" },
    ];

    // robots - cutebot
    tree.cutebot = [
        { value: "I2C_ADDRESS", description: "CUTEBOT_I2C_ADDRESS", returns: "int" },
        { value: "MOTOR_LEFT", description: "CUTEBOT_MOTOR_LEFT", returns: "int" },
        { value: "MOTOR_RIGHT", description: "CUTEBOT_MOTOR_RIGHT", returns: "int" },
        { value: "MOTOR_BACKWARD", description: "CUTEBOT_MOTOR_BACKWARD", returns: "int" },
        { value: "MOTOR_FORWARD", description: "CUTEBOT_MOTOR_FORWARD", returns: "int" },
        { value: "MAX_SPEED", description: "CUTEBOT_MAX_SPEED", returns: "int" },
        { value: "MIN_SPEED", description: "CUTEBOT_MIN_SPEED", returns: "int" },
        { value: "SONAR_CM", description: "CUTEBOT_SONAR_CM", returns: "int" },
        { value: "SONAR_IN", description: "CUTEBOT_SONAR_IN", returns: "int" },
        { value: "RGB_LEFT", description: "CUTEBOT_RGB_LEFT", returns: "int" },
        { value: "RGB_RIGHT", description: "CUTEBOT_RGB_RIGHT", returns: "int" },
        { value: "RGB_MIN", description: "CUTEBOT_RGB_MIN", returns: "int" },
        { value: "RGB_MAX", description: "CUTEBOT_RGB_MAX", returns: "int" },
        { value: "SERVO_1", description: "CUTEBOT_SERVO_1", returns: "int" },
        { value: "SERVO_2", description: "CUTEBOT_SERVO_2", returns: "int" },
        { value: "SERVO_ANGLE_MIN", description: "CUTEBOT_SERVO_ANGLE_MIN", returns: "int" },
        { value: "SERVO_ANGLE_MAX", description: "CUTEBOT_SERVO_ANGLE_MAX", returns: "int" },
        { title: "set_motors_speed(left_speed, right_speed)", value: "set_motors_speed", meta: "-- <function>", snippet: "set_motors_speed(${1:})", description: "CUTEBOT_SET_MOTORS_SPEED" },
        { title: "go_forward()", value: "go_forward", meta: "-- <function>", snippet: "go_forward()", description: "CUTEBOT_GO_FORWARD" },
        { title: "go_backward()", value: "go_backward", meta: "-- <function>", snippet: "go_backward()", description: "CUTEBOT_GO_BACKWARD" },
        { title: "turn_left()", value: "turn_left", meta: "-- <function>", snippet: "turn_left()", description: "CUTEBOT_TURN_LEFT" },
        { title: "turn_right()", value: "turn_right", meta: "-- <function>", snippet: "turn_right()", description: "CUTEBOT_TURN_RIGHT" },
        { title: "stop()", value: "stop", meta: "-- <function>", snippet: "stop()", description: "CUTEBOT_STOP" },
        { title: "get_sonar_distance(unit=SONAR_CM, timeout_us=30000)", value: "get_sonar_distance", meta: "-- <function>", snippet: "get_sonar_distance(${1:})", description: "CUTEBOT_GET_SONAR_DISTANCE", returns: "float" },
        { title: "set_left_rgb_led(r=0, g=0, b=0)", value: "set_left_rgb_led", meta: "-- <function>", snippet: "set_left_rgb_led(${1:})", description: "CUTEBOT_SET_LEFT_RGB_LED" },
        { title: "set_right_rgb_led(r=0, g=0, b=0)", value: "set_right_rgb_led", meta: "-- <function>", snippet: "set_right_rgb_led(${1:})", description: "CUTEBOT_SET_RIGHT_RGB_LED" },
        { title: "has_left_track()", value: "has_left_track", meta: "-- <function>", snippet: "has_left_track()", description: "CUTEBOT_HAS_LEFT_TRACK", returns: "bool" },
        { title: "has_right_track()", value: "has_right_track", meta: "-- <function>", snippet: "has_right_track()", description: "CUTEBOT_HAS_RIGHT_TRACK", returns: "bool" },
        { title: "set_servo_1_angle(angle)", value: "set_servo_1_angle", meta: "-- <function>", snippet: "set_servo_1_angle(${1:})", description: "CUTEBOT_SET_SERVO_1_ANGLE" },
        { title: "set_servo_2_angle(angle)", value: "set_servo_2_angle", meta: "-- <function>", snippet: "set_servo_2_angle(${1:})", description: "CUTEBOT_SET_SERVO_2_ANGLE" },
        { title: "__name__", value: "__name__", meta: "cutebot", description: "CUTEBOT_MODULE" }
    ];

    // robots - cutebotpro
    const CBPconstants = [
        { value: "V1", description: "CUTEBOTPRO_CBP_V1", returns: "str" },
        { value: "V2", description: "CUTEBOTPRO_CBP_V2", returns: "str" },
        { value: "I2C_ADDRESS", description: "CUTEBOTPRO_CBP_I2C_ADDRESS", returns: "int" },
        { value: "CM_PER_SEC", description: "CUTEBOTPRO_CBP_CM_PER_SEC", returns: "str" },
        { value: "INCH_PER_SEC", description: "CUTEBOTPRO_CBP_INCH_PER_SEC", returns: "str" },
        { value: "MOTOR_LEFT", description: "CUTEBOTPRO_CBP_MOTOR_LEFT", returns: "str" },
        { value: "MOTOR_RIGHT", description: "CUTEBOTPRO_CBP_MOTOR_RIGHT", returns: "str" },
        { value: "MOTOR_BOTH", description: "CUTEBOTPRO_CBP_MOTOR_BOTH", returns: "str" },
        { value: "CMD", description: "CUTEBOTPRO_CBP_CMD", returns: "dict" },
        { value: "LED_RIGHT", description: "CUTEBOTPRO_CBP_LED_RIGHT", returns: "int" },
        { value: "LED_LEFT", description: "CUTEBOTPRO_CBP_LED_LEFT", returns: "int" },
        { value: "LED_BOTH", description: "CUTEBOTPRO_CBP_LED_BOTH", returns: "int" },
        { value: "DIRECTION_RETREAT", description: "CUTEBOTPRO_CBP_DIRECTION_RETREAT", returns: "int" },
        { value: "DIRECTION_ADVANCE", description: "CUTEBOTPRO_CBP_DIRECTION_ADVANCE", returns: "int" },
        { value: "TURN_LEFT", description: "CUTEBOTPRO_CBP_TURN_LEFT", returns: "int" },
        { value: "TURN_RIGHT", description: "CUTEBOTPRO_CBP_TURN_RIGHT", returns: "int" },
        { value: "TURN_LEFT_AT", description: "CUTEBOTPRO_CBP_TURN_LEFT_AT", returns: "int" },
        { value: "TURN_RIGHT_AT", description: "CUTEBOTPRO_CBP_TURN_RIGHT_AT", returns: "int" },
        { value: "SERVO_TYPE_0_180", description: "CUTEBOTPRO_CBP_SERVO_TYPE_0_180", returns: "int" },
        { value: "SERVO_TYPE_0_270", description: "CUTEBOTPRO_CBP_SERVO_TYPE_0_270", returns: "int" },
        { value: "SERVO_TYPE_0_360", description: "CUTEBOTPRO_CBP_SERVO_TYPE_0_360", returns: "int" },
        { value: "WHEELS_CENTRE_RADIUS", description: "CUTEBOTPRO_CBP_WHEELS_CENTRE_RADIUS", returns: "float" },
        { value: "__class__", meta: "CBP" }
    ];
    tree.cutebotpro = [
        { value: "CBP", meta: "cutebotpro", description: "CUTEBOTPRO_CBP_CLASS", content: CBPconstants, kind: "class" },
        { value: "CBP()", title: "CBP()", snippet: "CBP()", meta: "constructor", returns: "CBP", description: "CUTEBOTPRO_CBP_CONSTRUCTOR", content: CBPconstants },
        { title: "__name__", value: "__name__", meta: "cutebotpro", description: "CUTEBOTPRO_MODULE" }
    ];
    typeTree.CBP = [
        { title: "readVersion(result=None)", value: "readVersion", meta: "-- <function>", snippet: "readVersion(${1:})", description: "CUTEBOTPRO_CBP_READVERSION", returns: "str" },
        { title: "pwmCruiseControlMotor(motor, speed)", value: "pwmCruiseControlMotor", meta: "-- <function>", snippet: "pwmCruiseControlMotor(${1:})", description: "CUTEBOTPRO_CBP_PWMCRUISECONTROLMOTOR" },
        { title: "runFullSpeed(direction=DIRECTION_ADVANCE)", value: "runFullSpeed", meta: "-- <function>", snippet: "runFullSpeed(${1:})", description: "CUTEBOTPRO_CBP_RUNFULLSPEED" },
        { title: "stopImmediately(motor=MOTOR_BOTH)", value: "stopImmediately", meta: "-- <function>", snippet: "stopImmediately(${1:})", description: "CUTEBOTPRO_CBP_STOPIMMEDIATELY" },
        { title: "readSpeed(motor, unit=CM_PER_SEC)", value: "readSpeed", meta: "-- <function>", snippet: "readSpeed(${1:})", description: "CUTEBOTPRO_CBP_READSPEED", returns: "float" },
        { title: "readPulses()", value: "readPulses", meta: "-- <function>", snippet: "readPulses()", description: "CUTEBOTPRO_CBP_READPULSES" },
        { title: "readWheelPulses(motor)", value: "readWheelPulses", meta: "-- <function>", snippet: "readWheelPulses(${1:})", description: "CUTEBOTPRO_CBP_READWHEELPULSES", returns: "int" },
        { title: "readAngularDistance(motor, unit='deg')", value: "readAngularDistance", meta: "-- <function>", snippet: "readAngularDistance(${1:})", description: "CUTEBOTPRO_CBP_READANGULARDISTANCE", returns: "int" },
        { title: "clearWheelTurn(motor)", value: "clearWheelTurn", meta: "-- <function>", snippet: "clearWheelTurn(${1:})", description: "CUTEBOTPRO_CBP_CLEARWHEELTURN" },
        { title: "controlHeadlights(led, rgb)", value: "controlHeadlights", meta: "-- <function>", snippet: "controlHeadlights(${1:})", description: "CUTEBOTPRO_CBP_CONTROLHEADLIGHTS" },
        { title: "controlHeadlightsHex(led, color)", value: "controlHeadlightsHex", meta: "-- <function>", snippet: "controlHeadlightsHex(${1:})", description: "CUTEBOTPRO_CBP_CONTROLHEADLIGHTSHEX" },
        { title: "turnOffHeadlights()", value: "turnOffHeadlights", meta: "-- <function>", snippet: "turnOffHeadlights()", description: "CUTEBOTPRO_CBP_TURNOFFHEADLIGHTS" },
        { title: "setNeopixelColor(led, color)", value: "setNeopixelColor", meta: "-- <function>", snippet: "setNeopixelColor(${1:})", description: "CUTEBOTPRO_CBP_SETNEOPIXELCOLOR" },
        { title: "getLineTrackerStates()", value: "getLineTrackerStates", meta: "-- <function>", snippet: "getLineTrackerStates()", description: "CUTEBOTPRO_CBP_GETLINETRACKERSTATES", returns: "int" },
        { title: "isLineTrackerState(states)", value: "isLineTrackerState", meta: "-- <function>", snippet: "isLineTrackerState(${1:})", description: "CUTEBOTPRO_CBP_ISLINETRACKERSTATE", returns: "bool" },
        { title: "getLineOffset(unit='cm')", value: "getLineOffset", meta: "-- <function>", snippet: "getLineOffset(${1:})", description: "CUTEBOTPRO_CBP_GETLINEOFFSET", returns: "float" },
        { title: "isSensorTrackingLine(sensor)", value: "isSensorTrackingLine", meta: "-- <function>", snippet: "isSensorTrackingLine(${1:})", description: "CUTEBOTPRO_CBP_ISSENSORTRACKINGLINE", returns: "bool" },
        { title: "getGrayscaleTrackingValue(sensor)", value: "getGrayscaleTrackingValue", meta: "-- <function>", snippet: "getGrayscaleTrackingValue(${1:})", description: "CUTEBOTPRO_CBP_GETGRAYSCALETRACKINGVALUE", returns: "int" },
        { title: "readUltrasonic(unit='cm')", value: "readUltrasonic", meta: "-- <function>", snippet: "readUltrasonic(${1:})", description: "CUTEBOTPRO_CBP_READULTRASONIC", returns: "float" },
        { title: "cruiseControl(speedL, speedR, unit=CM_PER_SEC)", value: "cruiseControl", meta: "-- <function>", snippet: "cruiseControl(${1:})", description: "CUTEBOTPRO_CBP_CRUISECONTROL" },
        { title: "turnWithRadius(side, radius, speed, unit='cm')", value: "turnWithRadius", meta: "-- <function>", snippet: "turnWithRadius(${1:})", description: "CUTEBOTPRO_CBP_TURNWITHRADIUS" },
        { title: "runDistance(direction, distance, unit='cm', wait=True)", value: "runDistance", meta: "-- <function>", snippet: "runDistance(${1:})", description: "CUTEBOTPRO_CBP_RUNDISTANCE" },
        { title: "turnWheel(wheel, angle, unit='deg', wait=True)", value: "turnWheel", meta: "-- <function>", snippet: "turnWheel(${1:})", description: "CUTEBOTPRO_CBP_TURNWHEEL" },
        { title: "turnWithAngle(direction, angle, wait=True)", value: "turnWithAngle", meta: "-- <function>", snippet: "turnWithAngle(${1:})", description: "CUTEBOTPRO_CBP_TURNWITHANGLE" },
        { title: "setSquare(size, unit='cm')", value: "setSquare", meta: "-- <function>", snippet: "setSquare(${1:})", description: "CUTEBOTPRO_CBP_SETSQUARE" },
        { title: "runSquare(n, direction, wait=True)", value: "runSquare", meta: "-- <function>", snippet: "runSquare(${1:})", description: "CUTEBOTPRO_CBP_RUNSQUARE" },
        { title: "controlServo(servo, angle, type=SERVO_TYPE_0_180)", value: "controlServo", meta: "-- <function>", snippet: "controlServo(${1:})", description: "CUTEBOTPRO_CBP_CONTROLSERVO" },
        { title: "controlContinuousServo(servo, speed)", value: "controlContinuousServo", meta: "-- <function>", snippet: "controlContinuousServo(${1:})", description: "CUTEBOTPRO_CBP_CONTROLCONTINUOUSSERVO" },
        { title: "controlExtendedMotor(speed)", value: "controlExtendedMotor", meta: "-- <function>", snippet: "controlExtendedMotor(${1:})", description: "CUTEBOTPRO_CBP_CONTROLEXTENDEDMOTOR" },
        { title: "stopExtendedMotor()", value: "stopExtendedMotor", meta: "-- <function>", snippet: "stopExtendedMotor()", description: "CUTEBOTPRO_CBP_STOPEXENDEDMOTOR" },
        { value: "_class__", meta: "CBP" }
    ];

    // robots - maqueenplusv1
    tree.maqueenplusv1 = [
        { value: "I2C_ADDR", description: "MAQUEENPLUSV1_I2C_ADDR", returns: "int" },
        { value: "LEFT_LED_I2C_ADDR", description: "MAQUEENPLUSV1_LEFT_LED_I2C_ADDR", returns: "int" },
        { value: "RIGHT_LED_I2C_ADDR", description: "MAQUEENPLUSV1_RIGHT_LED_I2C_ADDR", returns: "int" },
        { value: "LEFT", description: "MAQUEENPLUSV1_LEFT", returns: "int" },
        { value: "RIGHT", description: "MAQUEENPLUSV1_RIGHT", returns: "int" },
        { value: "MT_L", description: "MAQUEENPLUSV1_MT_L", returns: "int" },
        { value: "MT_R", description: "MAQUEENPLUSV1_MT_R", returns: "int" },
        { value: "S1", description: "MAQUEENPLUSV1_S1", returns: "int" },
        { value: "S2", description: "MAQUEENPLUSV1_S2", returns: "int" },
        { value: "S3", description: "MAQUEENPLUSV1_S3", returns: "int" },
        { value: "ALL", description: "MAQUEENPLUSV1_ALL", returns: "int" },
        { value: "RGB_L", description: "MAQUEENPLUSV1_RGB_L", returns: "int" },
        { value: "RGB_R", description: "MAQUEENPLUSV1_RGB_R", returns: "int" },
        { value: "RGB_ALL", description: "MAQUEENPLUSV1_RGB_ALL", returns: "int" },
        { value: "RED", description: "MAQUEENPLUSV1_RED", returns: "int" },
        { value: "GREEN", description: "MAQUEENPLUSV1_GREEN", returns: "int" },
        { value: "BLUE", description: "MAQUEENPLUSV1_BLUE", returns: "int" },
        { value: "YELLOW", description: "MAQUEENPLUSV1_YELLOW", returns: "int" },
        { value: "PINK", description: "MAQUEENPLUSV1_PINK", returns: "int" },
        { value: "CYAN", description: "MAQUEENPLUSV1_CYAN", returns: "int" },
        { value: "WHITE", description: "MAQUEENPLUSV1_WHITE", returns: "int" },
        { value: "OFF", description: "MAQUEENPLUSV1_OFF", returns: "int" },
        { value: "FORWARD", description: "MAQUEENPLUSV1_FORWARD", returns: "int" },
        { value: "BACKWARD", description: "MAQUEENPLUSV1_BACKWARD", returns: "int" },
        { value: "patrol", description: "MAQUEENPLUSV1_PATROL", returns: "dict" },
        { title: "motorControl(mot, dir, spd)", value: "motorControl", meta: "-- <function>", snippet: "motorControl(${1:})", description: "MAQUEENPLUSV1_MOTORCONTROL" },
        { title: "go(dL, sL, dR, sR)", value: "go", meta: "-- <function>", snippet: "go(${1:})", description: "MAQUEENPLUSV1_GO" },
        { title: "set_servo_angle(num, angle)", value: "set_servo_angle", meta: "-- <function>", snippet: "set_servo_angle(${1:})", description: "MAQUEENPLUSV1_SET_SERVO_ANGLE" },
        { title: "RGBLight(rgbshow, color)", value: "RGBLight", meta: "-- <function>", snippet: "RGBLight(${1:})", description: "MAQUEENPLUSV1_RGBLIGHT" },
        { title: "stop()", value: "stop", meta: "-- <function>", snippet: "stop()", description: "MAQUEENPLUSV1_STOP" },
        { title: "move(dir, spd)", value: "move", meta: "-- <function>", snippet: "move(${1:})", description: "MAQUEENPLUSV1_MOVE" },
        { title: "goto(dir, spd, dst)", value: "goto", meta: "-- <function>", snippet: "goto(${1:})", description: "MAQUEENPLUSV1_GOTO" },
        { title: "sensor_on_line(sensor)", value: "sensor_on_line", meta: "-- <function>", snippet: "sensor_on_line(${1:})", description: "MAQUEENPLUSV1_SENSOR_ON_LINE", returns: "int" },
        { title: "getEncoders()", value: "getEncoders", meta: "-- <function>", snippet: "getEncoders()", description: "MAQUEENPLUSV1_GETENCODERS", returns: "tuple" },
        { title: "clearEncoders()", value: "clearEncoders", meta: "-- <function>", snippet: "clearEncoders()", description: "MAQUEENPLUSV1_CLEARENCODERS" },
        { title: "headlights(select, state)", value: "headlights", meta: "-- <function>", snippet: "headlights(${1:})", description: "MAQUEENPLUSV1_HEADLIGHTS" },
        { title: "__name__", value: "__name__", meta: "maqueenplusv1", description: "MAQUEENPLUSV1_MODULE" }
    ];

    // robots - maqueenplusv2
    tree.maqueenplusv2 = [
        { value: "I2C_ADDR", description: "MAQUEENPLUSV2_I2C_ADDR", returns: "int" },
        { value: "VERSION_COUNT_I2C_ADDR", description: "MAQUEENPLUSV2_VERSION_COUNT_I2C_ADDR", returns: "int" },
        { value: "VERSION_DATA_I2C_ADDR", description: "MAQUEENPLUSV2_VERSION_DATA_I2C_ADDR", returns: "int" },
        { value: "LEFT_MOTOR_I2C_ADDR", description: "MAQUEENPLUSV2_LEFT_MOTOR_I2C_ADDR", returns: "int" },
        { value: "RIGHT_MOTOR_I2C_ADDR", description: "MAQUEENPLUSV2_RIGHT_MOTOR_I2C_ADDR", returns: "int" },
        { value: "AXLE_WIDTH", description: "MAQUEENPLUSV2_AXLE_WIDTH", returns: "float" },
        { value: "FORWARD", description: "MAQUEENPLUSV2_FORWARD", returns: "int" },
        { value: "BACKWARD", description: "MAQUEENPLUSV2_BACKWARD", returns: "int" },
        { value: "LINE_SENSOR_I2C_ADDR", description: "MAQUEENPLUSV2_LINE_SENSOR_I2C_ADDR", returns: "int" },
        { value: "ANALOG_L2_I2C_ADDR", description: "MAQUEENPLUSV2_ANALOG_L2_I2C_ADDR", returns: "int" },
        { value: "ANALOG_L1_I2C_ADDR", description: "MAQUEENPLUSV2_ANALOG_L1_I2C_ADDR", returns: "int" },
        { value: "ANALOG_M_I2C_ADDR", description: "MAQUEENPLUSV2_ANALOG_M_I2C_ADDR", returns: "int" },
        { value: "ANALOG_R1_I2C_ADDR", description: "MAQUEENPLUSV2_ANALOG_R1_I2C_ADDR", returns: "int" },
        { value: "ANALOG_R2_I2C_ADDR", description: "MAQUEENPLUSV2_ANALOG_R2_I2C_ADDR", returns: "int" },
        { value: "ALL_ANALOG_SENSOR_I2C_ADDRS", description: "MAQUEENPLUSV2_ALL_ANALOG_SENSOR_I2C_ADDRS", returns: "list" },
        { value: "L2", description: "MAQUEENPLUSV2_L2", returns: "int" },
        { value: "L1", description: "MAQUEENPLUSV2_L1", returns: "int" },
        { value: "M", description: "MAQUEENPLUSV2_M", returns: "int" },
        { value: "R1", description: "MAQUEENPLUSV2_R1", returns: "int" },
        { value: "R2", description: "MAQUEENPLUSV2_R2", returns: "int" },
        { value: "DIGITAL_SENSOR_STATUS_I2C_ADDR", description: "MAQUEENPLUSV2_DIGITAL_SENSOR_STATUS_I2C_ADDR", returns: "int" },
        { value: "DIGITAL_SENSOR_MASK", description: "MAQUEENPLUSV2_DIGITAL_SENSOR_MASK", returns: "list" },
        { value: "DIGITAL_SENSOR_SHIFT", description: "MAQUEENPLUSV2_DIGITAL_SENSOR_SHIFT", returns: "list" },
        { value: "LEFT_LED_I2C_ADDR", description: "MAQUEENPLUSV2_LEFT_LED_I2C_ADDR", returns: "int" },
        { value: "RIGHT_LED_I2C_ADDR", description: "MAQUEENPLUSV2_RIGHT_LED_I2C_ADDR", returns: "int" },
        { value: "LEFT", description: "MAQUEENPLUSV2_LEFT", returns: "int" },
        { value: "RIGHT", description: "MAQUEENPLUSV2_RIGHT", returns: "int" },
        { value: "BOTH", description: "MAQUEENPLUSV2_BOTH", returns: "int" },
        { value: "ON", description: "MAQUEENPLUSV2_ON", returns: "int" },
        { value: "OFF", description: "MAQUEENPLUSV2_OFF", returns: "int" },
        { value: "RED", description: "MAQUEENPLUSV2_RED", returns: "int" },
        { value: "ORANGE", description: "MAQUEENPLUSV2_ORANGE", returns: "int" },
        { value: "YELLOW", description: "MAQUEENPLUSV2_YELLOW", returns: "int" },
        { value: "GREEN", description: "MAQUEENPLUSV2_GREEN", returns: "int" },
        { value: "BLUE", description: "MAQUEENPLUSV2_BLUE", returns: "int" },
        { value: "INDIGO", description: "MAQUEENPLUSV2_INDIGO", returns: "int" },
        { value: "VIOLET", description: "MAQUEENPLUSV2_VIOLET", returns: "int" },
        { value: "PURPLE", description: "MAQUEENPLUSV2_PURPLE", returns: "int" },
        { value: "WHITE", description: "MAQUEENPLUSV2_WHITE", returns: "int" },
        { title: "initRobot()", value: "initRobot", meta: "-- <function>", snippet: "initRobot()", description: "MAQUEENPLUSV2_INITROBOT" },
        { title: "eight_bits(n)", value: "eight_bits", meta: "-- <function>", snippet: "eight_bits(${1:})", description: "MAQUEENPLUSV2_EIGHT_BITS" },
        { title: "one_bit(n)", value: "one_bit", meta: "-- <function>", snippet: "one_bit(${1:})", description: "MAQUEENPLUSV2_ONE_BIT" },
        { title: "readVersion()", value: "readVersion", meta: "-- <function>", snippet: "readVersion()", description: "MAQUEENPLUSV2_READVERSION", returns: "str" },
        { title: "stop()", value: "stop", meta: "-- <function>", snippet: "stop()", description: "MAQUEENPLUSV2_STOP" },
        { title: "motorControlLeft(dir, spd)", value: "motorControlLeft", meta: "-- <function>", snippet: "motorControlLeft(${1:})", description: "MAQUEENPLUSV2_MOTORCONTROLLEFT" },
        { title: "motorControlRight(dir, spd)", value: "motorControlRight", meta: "-- <function>", snippet: "motorControlRight(${1:})", description: "MAQUEENPLUSV2_MOTORCONTROLRIGHT" },
        { title: "drive(speed_left, speed_right=None)", value: "drive", meta: "-- <function>", snippet: "drive(${1:})", description: "MAQUEENPLUSV2_DRIVE" },
        { title: "backup(speed_left, speed_right=None)", value: "backup", meta: "-- <function>", snippet: "backup(${1:})", description: "MAQUEENPLUSV2_BACKUP" },
        { title: "spin_left(speed_left, speed_right=None)", value: "spin_left", meta: "-- <function>", snippet: "spin_left(${1:})", description: "MAQUEENPLUSV2_SPIN_LEFT" },
        { title: "spin_right(speed_left, speed_right=None)", value: "spin_right", meta: "-- <function>", snippet: "spin_right(${1:})", description: "MAQUEENPLUSV2_SPIN_RIGHT" },
        { title: "motors(l_speed, l_direction, r_speed, r_direction)", value: "motors", meta: "-- <function>", snippet: "motors(${1:})", description: "MAQUEENPLUSV2_MOTORS" },
        { title: "read_all_line_sensors()", value: "read_all_line_sensors", meta: "-- <function>", snippet: "read_all_line_sensors()", description: "MAQUEENPLUSV2_READ_ALL_LINE_SENSORS", returns: "list" },
        { title: "read_line_sensor(sensor)", value: "read_line_sensor", meta: "-- <function>", snippet: "read_line_sensor(${1:})", description: "MAQUEENPLUSV2_READ_LINE_SENSOR", returns: "int" },
        { title: "sensor_on_line(sensor)", value: "sensor_on_line", meta: "-- <function>", snippet: "sensor_on_line(${1:})", description: "MAQUEENPLUSV2_SENSOR_ON_LINE", returns: "bool" },
        { title: "set_servo_angle(pin, angle)", value: "set_servo_angle", meta: "-- <function>", snippet: "set_servo_angle(${1:})", description: "MAQUEENPLUSV2_SET_SERVO_ANGLE" },
        { title: "headlights(select, state)", value: "headlights", meta: "-- <function>", snippet: "headlights(${1:})", description: "MAQUEENPLUSV2_HEADLIGHTS" },
        { title: "__name__", value: "__name__", meta: "maqueenplusv2", description: "MAQUEENPLUSV2_MODULE" }
    ];

    // robots - maqueenplusv3
    tree.maqueenplusv3 = [
        { value: "I2C_ADDR", description: "MAQUEENPLUSV3_I2C_ADDR" },
        { value: "FORWARD", description: "MAQUEENPLUSV3_FORWARD" },
        { value: "BACKWARD", description: "MAQUEENPLUSV3_BACKWARD" },
        { value: "LEFT", description: "MAQUEENPLUSV3_LEFT", returns: "int" },
        { value: "RIGHT", description: "MAQUEENPLUSV3_RIGHT", returns: "int" },
        { value: "BOTH", description: "MAQUEENPLUSV3_BOTH", returns: "int" },
        { value: "COLOR", description: "MAQUEENPLUSV3_COLOR", returns: "dict" },
        { value: "RUN", description: "MAQUEENPLUSV3_RUN", returns: "dict" },
        { value: "INTERSECTION", description: "MAQUEENPLUSV3_INTERSECTION", returns: "dict" },
        { value: "PID_DIR", description: "MAQUEENPLUSV3_PID_DIR", returns: "dict" },
        { value: "CM_PER_SEC", description: "MAQUEENPLUSV3_CM_PER_SEC", returns: "str" },
        { value: "INCH_PER_SEC", description: "MAQUEENPLUSV3_INCH_PER_SEC", returns: "str" },
        { title: "initRobot()", value: "initRobot", meta: "-- <function>", snippet: "initRobot()", description: "MAQUEENPLUSV3_INITROBOT" },
        { title: "readVersion()", value: "readVersion", meta: "-- <function>", snippet: "readVersion()", description: "MAQUEENPLUSV3_READVERSION" },
        { title: "motorControlLeft(dir, spd)", value: "motorControlLeft", meta: "-- <function>", snippet: "motorControlLeft(${1:})", description: "MAQUEENPLUSV3_MOTORCONTROLLEFT" },
        { title: "motorControlRight(dir, spd)", value: "motorControlRight", meta: "-- <function>", snippet: "motorControlRight(${1:})", description: "MAQUEENPLUSV3_MOTORCONTROLRIGHT" },
        { title: "stop()", value: "stop", meta: "-- <function>", snippet: "stop()", description: "MAQUEENPLUSV3_STOP" },
        { title: "drive(speed_left, speed_right=None)", value: "drive", meta: "-- <function>", snippet: "drive(${1:})", description: "MAQUEENPLUSV3_DRIVE" },
        { title: "backup(speed_left, speed_right=None)", value: "backup", meta: "-- <function>", snippet: "backup(${1:})", description: "MAQUEENPLUSV3_BACKUP" },
        { title: "spin_left(speed_left, speed_right=None)", value: "spin_left", meta: "-- <function>", snippet: "spin_left(${1:})", description: "MAQUEENPLUSV3_SPIN_LEFT" },
        { title: "spin_right(speed_left, speed_right=None)", value: "spin_right", meta: "-- <function>", snippet: "spin_right(${1:})", description: "MAQUEENPLUSV3_SPIN_RIGHT" },
        { title: "read_all_line_sensors()", value: "read_all_line_sensors", meta: "-- <function>", snippet: "read_all_line_sensors()", description: "MAQUEENPLUSV3_READ_ALL_LINE_SENSORS" },
        { title: "read_line_sensor(sensor)", value: "read_line_sensor", meta: "-- <function>", snippet: "read_line_sensor(${1:})", description: "MAQUEENPLUSV3_READ_LINE_SENSOR" },
        { title: "sensor_on_line(sensor)", value: "sensor_on_line", meta: "-- <function>", snippet: "sensor_on_line(${1:})", description: "MAQUEENPLUSV3_SENSOR_ON_LINE" },
        { title: "set_servo_angle(pin, angle)", value: "set_servo_angle", meta: "-- <function>", snippet: "set_servo_angle(${1:})", description: "MAQUEENPLUSV3_SET_SERVO_ANGLE" },
        { title: "setPatrolSpeed(speed)", value: "setPatrolSpeed", meta: "-- <function>", snippet: "setPatrolSpeed(${1:})", description: "MAQUEENPLUSV3_SETPATROLSPEED" },
        { title: "setIntersectionRunMode(mode)", value: "setIntersectionRunMode", meta: "-- <function>", snippet: "setIntersectionRunMode(${1:})", description: "MAQUEENPLUSV3_SETINTERSECTIONRUNMODE" },
        { title: "setTjunctionRunMode(mode)", value: "setTjunctionRunMode", meta: "-- <function>", snippet: "setTjunctionRunMode(${1:})", description: "MAQUEENPLUSV3_SETTJUNCTIONRUNMODE" },
        { title: "setLeftOrStraightRunMode(mode)", value: "setLeftOrStraightRunMode", meta: "-- <function>", snippet: "setLeftOrStraightRunMode(${1:})", description: "MAQUEENPLUSV3_SETLEFTORSTRAIGHTRUNMODE" },
        { title: "setRightOrStraightRunMode(mode)", value: "setRightOrStraightRunMode", meta: "-- <function>", snippet: "setRightOrStraightRunMode(${1:})", description: "MAQUEENPLUSV3_SETRIGHTORSTRAIGHTRUNMODE" },
        { title: "setPatrollingState(state)", value: "setPatrollingState", meta: "-- <function>", snippet: "setPatrollingState(${1:})", description: "MAQUEENPLUSV3_SETPATROLLINGSTATE" },
        { title: "intersectionDetecting()", value: "intersectionDetecting", meta: "-- <function>", snippet: "intersectionDetecting()", description: "MAQUEENPLUSV3_INTERSECTIONDETECTING" },
        { title: "readLightIntensity(sensor)", value: "readLightIntensity", meta: "-- <function>", snippet: "readLightIntensity(${1:})", description: "MAQUEENPLUSV3_READLIGHTINTENSITY" },
        { title: "runDistance(direction, distance, unit='cm', wait=True)", value: "runDistance", meta: "-- <function>", snippet: "runDistance(${1:})", description: "MAQUEENPLUSV3_RUNDISTANCE" },
        { title: "turnWithAngle(direction, angle, wait=True)", value: "turnWithAngle", meta: "-- <function>", snippet: "turnWithAngle(${1:})", description: "MAQUEENPLUSV3_TURNWITHANGLE" },
        { title: "waitCommand()", value: "waitCommand", meta: "-- <function>", snippet: "waitCommand()", description: "MAQUEENPLUSV3_WAITCOMMAND" },
        { title: "pidControlStop()", value: "pidControlStop", meta: "-- <function>", snippet: "pidControlStop()", description: "MAQUEENPLUSV3_PIDCONTROLSTOP" },
        { title: "readRealTimeSpeed(motor, unit=CM_PER_SEC)", value: "readRealTimeSpeed", meta: "-- <function>", snippet: "readRealTimeSpeed(${1:})", description: "MAQUEENPLUSV3_READREALTIMESPEED" },
        { title: "setRGBLed(led, rgb)", value: "setRGBLed", meta: "-- <function>", snippet: "setRGBLed(${1:})", description: "MAQUEENPLUSV3_SETRGBLED" },
        { title: "__name__", value: "__name__", meta: "maqueenplusv3", description: "MAQUEENPLUSV3_MODULE" }
    ];

    // robots - matrixLidarDistanceSensor
    const DFRobot_matrixLidarDistanceSensorconstants = [
        { value: "CMD_SETMODE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_SETMODE", returns: "int" },
        { value: "CMD_FIXED_POINT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_FIXED_POINT", returns: "int" },
        { value: "CMD_LINE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_LINE", returns: "int" },
        { value: "CMD_LIST", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_LIST", returns: "int" },
        { value: "CMD_AVOID_OBSTACLE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_AVOID_OBSTACLE", returns: "int" },
        { value: "CMD_CONFIG_AVOID", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_CONFIG_AVOID", returns: "int" },
        { value: "CMD_OBSTACLE_DISTANCE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_OBSTACLE_DISTANCE", returns: "int" },
        { value: "CMD_END", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CMD_END" },
        { value: "DEBUG_TIMEOUT_MS", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_DEBUG_TIMEOUT_MS", returns: "int" },
        { value: "IIC_MAX_TRANSFER", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_IIC_MAX_TRANSFER", returns: "int" },
        { value: "I2C_ACHE_MAX_LEN", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_I2C_ACHE_MAX_LEN", returns: "int" },
        { value: "MATRIX_4X4", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_MATRIX_4X4", returns: "int" },
        { value: "MATRIX_8X8", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_MATRIX_8X8", returns: "int" },
        { value: "ERR_CODE_NONE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_NONE", returns: "int" },
        { value: "ERR_CODE_CMD_INVAILED", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_CMD_INVAILED", returns: "int" },
        { value: "ERR_CODE_RES_PKT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_RES_PKT", returns: "int" },
        { value: "ERR_CODE_M_NO_SPACE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_M_NO_SPACE", returns: "int" },
        { value: "ERR_CODE_RES_TIMEOUT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_RES_TIMEOUT", returns: "int" },
        { value: "ERR_CODE_CMD_PKT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_CMD_PKT", returns: "int" },
        { value: "ERR_CODE_SLAVE_BREAK", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_SLAVE_BREAK", returns: "int" },
        { value: "ERR_CODE_ARGS", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_ARGS", returns: "int" },
        { value: "ERR_CODE_SKU", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_SKU", returns: "int" },
        { value: "ERR_CODE_S_NO_SPACE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_S_NO_SPACE", returns: "int" },
        { value: "ERR_CODE_I2C_ADRESS", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERR_CODE_I2C_ADRESS", returns: "int" },
        { value: "STATUS_SUCCESS", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_STATUS_SUCCESS", returns: "int" },
        { value: "STATUS_FAILED", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_STATUS_FAILED", returns: "int" },
        { value: "ELEFT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ELEFT", returns: "int" },
        { value: "EMIDDLE", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_EMIDDLE", returns: "int" },
        { value: "ERIGHT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_ERIGHT", returns: "int" },
        { value: "TO_LEFT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_TO_LEFT", returns: "int" },
        { value: "TO_RIGHT", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_TO_RIGHT", returns: "int" },
        { value: "FORWARD", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_FORWARD", returns: "int" },
        { value: "__class__", meta: "DFRobot_matrixLidarDistanceSensor" }
    ];
    tree.matrixLidarDistanceSensor = [
        { value: "DFRobot_matrixLidarDistanceSensor", meta: "matrixLidarDistanceSensor", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CLASS", content: DFRobot_matrixLidarDistanceSensorconstants, kind: "class" },
        { value: "DFRobot_matrixLidarDistanceSensor()", title: "DFRobot_matrixLidarDistanceSensor(addr)", snippet: "DFRobot_matrixLidarDistanceSensor(${1:})", meta: "constructor", returns: "DFRobot_matrixLidarDistanceSensor", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CONSTRUCTOR", content: DFRobot_matrixLidarDistanceSensorconstants },
        { title: "__name__", value: "__name__", meta: "matrixLidarDistanceSensor", description: "MATRIXLIDARDISTANCESENSOR_MODULE" }
    ];
    typeTree.DFRobot_matrixLidarDistanceSensor = [
        { title: "begin()", value: "begin", meta: "-- <function>", snippet: "begin()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_BEGIN" },
        { title: "get_all_data_config(matrix)", value: "get_all_data_config", meta: "-- <function>", snippet: "get_all_data_config(${1:})", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_ALL_DATA_CONFIG" },
        { title: "config_avoidance(wall)", value: "config_avoidance", meta: "-- <function>", snippet: "config_avoidance(${1:})", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_CONFIG_AVOIDANCE" },
        { title: "get_all_data()", value: "get_all_data", meta: "-- <function>", snippet: "get_all_data()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_ALL_DATA" },
        { title: "get_all_distances()", value: "get_all_distances", meta: "-- <function>", snippet: "get_all_distances()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_ALL_DISTANCES" },
        { title: "get_fixed_point_data(x, y)", value: "get_fixed_point_data", meta: "-- <function>", snippet: "get_fixed_point_data(${1:})", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_FIXED_POINT_DATA" },
        { title: "request_obstacle_sensor_data()", value: "request_obstacle_sensor_data", meta: "-- <function>", snippet: "request_obstacle_sensor_data()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_REQUEST_OBSTACLE_SENSOR_DATA" },
        { title: "requestCmd(cmd, request)", value: "requestCmd", meta: "-- <function>", snippet: "requestCmd(${1:})", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_REQUESTCMD" },
        { title: "get_dir_to_avoid_obstacle()", value: "get_dir_to_avoid_obstacle", meta: "-- <function>", snippet: "get_dir_to_avoid_obstacle()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_DIR_TO_AVOID_OBSTACLE" },
        { title: "get_emergency_flag()", value: "get_emergency_flag", meta: "-- <function>", snippet: "get_emergency_flag()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_EMERGENCY_FLAG" },
        { title: "request_obstacle_distance()", value: "request_obstacle_distance", meta: "-- <function>", snippet: "request_obstacle_distance()", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_REQUEST_OBSTACLE_DISTANCE" },
        { title: "get_obstacle_distance(dir=None)", value: "get_obstacle_distance", meta: "-- <function>", snippet: "get_obstacle_distance(${1:})", description: "MATRIXLIDARDISTANCESENSOR_DFROBOT_MATRIXLIDARDISTANCESENSOR_GET_OBSTACLE_DISTANCE" },
        { value: "_class__", meta: "DFRobot_matrixLidarDistanceSensor" }
    ];

    // envirobit - bme280
    const BME280constants = [
        { value: "__class__", meta: "BME280" }
    ];
    tree.bme280 = [
        { value: "BME280", meta: "bme280", description: "BME280_CLASS", content: BME280constants, kind: "class" },
        { value: "BME280()", title: "BME280()", snippet: "BME280()", meta: "constructor", returns: "BME280", description: "BME280_CONSTRUCTOR", content: BME280constants },
        { title: "__name__", value: "__name__", meta: "bme280", description: "BME280_MODULE" }
    ];
    typeTree.BME280 = [
        { title: "set_qnh(qnh)", value: "set_qnh", meta: "-- <function>", snippet: "set_qnh(${1:})", description: "BME280_SET_QNH" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "BME280_TEMPERATURE", returns: "float" },
        { title: "pressure()", value: "pressure", meta: "-- <function>", snippet: "pressure()", description: "BME280_PRESSURE", returns: "float" },
        { title: "humidity()", value: "humidity", meta: "-- <function>", snippet: "humidity()", description: "BME280_HUMIDITY", returns: "float" },
        { title: "altitude()", value: "altitude", meta: "-- <function>", snippet: "altitude()", description: "BME280_ALTITUDE", returns: "float" },
        { title: "all()", value: "all", meta: "-- <function>", snippet: "all()", description: "BME280_ALL", returns: "tuple" },
        { title: "measure()", value: "measure", meta: "-- <function>", snippet: "measure()", description: "BME280_MEASURE" },
        { title: "update()", value: "update", meta: "-- <function>", snippet: "update()", description: "BME280_UPDATE" },
        { title: "read(address, reg, length=1)", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "BME280_READ", returns: "bytes" },
        { title: "write(address, reg, value)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "BME280_WRITE" }
    ];

    // envirobit - tcs3472
    const TCS3472constants = [
        { value: "__class__", meta: "TCS3472" }
    ];
    tree.tcs3472 = [
        { value: "TCS3472", meta: "tcs3472", description: "TCS3472_CLASS", content: TCS3472constants, kind: "class" },
        { value: "TCS3472()", title: "TCS3472(led_pin)", snippet: "TCS3472(${1:})", meta: "constructor", returns: "TCS3472", description: "TCS3472_CONSTRUCTOR", content: TCS3472constants },
        { title: "__name__", value: "__name__", meta: "tcs3472", description: "TCS3472_MODULE" }
    ];
    typeTree.TCS3472 = [
        { title: "scaled()", value: "scaled", meta: "-- <function>", snippet: "scaled()", description: "TCS3472_SCALED", returns: "tuple" },
        { title: "rgb()", value: "rgb", meta: "-- <function>", snippet: "rgb()", description: "TCS3472_RGB", returns: "tuple" },
        { title: "light()", value: "light", meta: "-- <function>", snippet: "light()", description: "TCS3472_LIGHT", returns: "int" },
        { title: "brightness(level=65.535)", value: "brightness", meta: "-- <function>", snippet: "brightness(${1:level=65.535})", description: "TCS3472_BRIGHTNESS", returns: "int" },
        { title: "valid()", value: "valid", meta: "-- <function>", snippet: "valid()", description: "TCS3472_VALID", returns: "int" },
        { title: "raw()", value: "raw", meta: "-- <function>", snippet: "raw()", description: "TCS3472_RAW", returns: "tuple" },
        { title: "set_leds(state)", value: "set_leds", meta: "-- <function>", snippet: "set_leds(${1:})", description: "TCS3472_SET_LEDS" }
    ];

    // microbit - bar_graph
    tree.bar_graph = [
        { value: "plot_bar_graph", title: "plot_bar_graph(value, high=0)", meta: "-- <function>", snippet: "plot_bar_graph(${1:})", description: "BAR_GRAPH_PLOT_BAR_GRAPH" },
        { value: "__name__", title: "__name__", meta: "bar_graph", description: "BAR_GRAPH_MODULE" }
    ];

    // microbit - buggyMove
    tree.buggyMove = [
        { value: "CHIP_ADDR", description: "BUGGYMOVE_CHIP_ADDR", returns: "int" },
        { value: "MODE_1_REG_ADDR", description: "BUGGYMOVE_MODE_1_REG_ADDR", returns: "int" },
        { value: "MODE_2_REG_ADDR", description: "BUGGYMOVE_MODE_2_REG_ADDR", returns: "int" },
        { value: "MOTOR_OUT_ADDR", description: "BUGGYMOVE_MOTOR_OUT_ADDR", returns: "int" },
        { value: "MODE_1_REG_VALUE", description: "BUGGYMOVE_MODE_1_REG_VALUE", returns: "int" },
        { value: "MODE_2_REG_VALUE", description: "BUGGYMOVE_MODE_2_REG_VALUE", returns: "int" },
        { value: "MOTOR_OUT_VALUE", description: "BUGGYMOVE_MOTOR_OUT_VALUE", returns: "int" },
        { value: "LEFT_MOTOR", description: "BUGGYMOVE_LEFT_MOTOR", returns: "int" },
        { value: "RIGHT_MOTOR", description: "BUGGYMOVE_RIGHT_MOTOR", returns: "int" },
        { value: "MOVEMotor", meta: "buggyMove", description: "BUGGYMOVE_MOVEMOTOR_CLASS", content: [{ value: "__class__", meta: "MOVEMotor" }], kind: "class" },
        { value: "MOVEMotor()", title: "MOVEMotor()", meta: "constructor", snippet: "MOVEMotor()", description: "BUGGYMOVE_MOVEMOTOR_CONSTRUCTOR", returns: "MOVEMotor", content: [{ value: "__class__", meta: "MOVEMotor" }] },
        { value: "__name__", title: "__name__", meta: "buggyMove", description: "BUGGYMOVE_MODULE" }
    ];
    typeTree.MOVEMotor = [
        { value: "setLeftMotorSpeed", title: "setLeftMotorSpeed(speed)", meta: "-- <function>", snippet: "setLeftMotorSpeed(${1:})", description: "BUGGYMOVE_MOVEMOTOR_SETLEFTMOTORSPEED" },
        { value: "setRightMotorSpeed", title: "setRightMotorSpeed(speed)", meta: "-- <function>", snippet: "setRightMotorSpeed(${1:})", description: "BUGGYMOVE_MOVEMOTOR_SETRIGHTMOTORSPEED" },
        { value: "stopMotors", title: "stopMotors()", meta: "-- <function>", snippet: "stopMotors()", description: "BUGGYMOVE_MOVEMOTOR_STOPMOTORS" }
    ];

    // microbit - game
    tree.game = [
        { value: "GAME", meta: "game", description: "GAME_GAME_CLASS", content: [{ value: "__class__", meta: "GAME" }], kind: "class" },
        { value: "GAME()", title: "GAME()", meta: "constructor", snippet: "GAME()", description: "GAME_GAME_CONSTRUCTOR", returns: "GAME", content: [{ value: "__class__", meta: "GAME" }] },
        { value: "SPRITE", meta: "game", description: "GAME_SPRITE_CLASS", content: [{ value: "__class__", meta: "SPRITE" }], kind: "class" },
        { value: "SPRITE()", title: "SPRITE()", meta: "constructor", snippet: "SPRITE(${1:})", description: "GAME_SPRITE_CONSTRUCTOR", returns: "SPRITE", content: [{ value: "__class__", meta: "SPRITE" }] },
        { value: "__name__", title: "__name__", meta: "game", description: "GAME_MODULE" }
    ];
    typeTree.GAME = [
        { value: "startGame", title: "startGame()", meta: "-- <function>", snippet: "startGame()", description: "GAME_GAME_STARTGAME" },
        { value: "createSprite", title: "createSprite(x, y)", meta: "-- <function>", snippet: "createSprite(${1:})", description: "GAME_GAME_CREATESPRITE" },
        { value: "stopGame", title: "stopGame()", meta: "-- <function>", snippet: "stopGame()", description: "GAME_GAME_STOPGAME" },
        { value: "changeScore", title: "changeScore(n)", meta: "-- <function>", snippet: "changeScore(${1:})", description: "GAME_GAME_CHANGESCORE" }
    ];

    // microbit - sprite
    typeTree.SPRITE = [
        { value: "display", title: "display(state)", meta: "-- <function>", snippet: "display(${1:})", description: "GAME_SPRITE_DISPLAY" },
        { value: "delete", title: "delete()", meta: "-- <function>", snippet: "delete()", description: "GAME_SPRITE_DELETE" },
        { value: "move", title: "move(direction, step)", meta: "-- <function>", snippet: "move(${1:})", description: "GAME_SPRITE_MOVE" }
    ];

    // microbit - lcd1in8
    tree.lcd1in8 = [
        { value: "GUI_BACKGROUND_COLOR", description: "LCD1IN8_GUI_BACKGROUND_COLOR", returns: "int" },
        { value: "FONT_BACKGROUND_COLOR", description: "LCD1IN8_FONT_BACKGROUND_COLOR", returns: "int" },
        { value: "FONT_FOREGROUND_COLOR", description: "LCD1IN8_FONT_FOREGROUND_COLOR", returns: "int" },
        { value: "LCD_WIDTH", description: "LCD1IN8_LCD_WIDTH", returns: "int" },
        { value: "LCD_HEIGHT", description: "LCD1IN8_LCD_HEIGHT", returns: "int" },
        { value: "SRAM_CMD_WREN", description: "LCD1IN8_SRAM_CMD_WREN", returns: "int" },
        { value: "SRAM_CMD_WRDI", description: "LCD1IN8_SRAM_CMD_WRDI", returns: "int" },
        { value: "SRAM_CMD_RDSR", description: "LCD1IN8_SRAM_CMD_RDSR", returns: "int" },
        { value: "SRAM_CMD_WRSR", description: "LCD1IN8_SRAM_CMD_WRSR", returns: "int" },
        { value: "SRAM_CMD_READ", description: "LCD1IN8_SRAM_CMD_READ", returns: "int" },
        { value: "SRAM_CMD_WRITE", description: "LCD1IN8_SRAM_CMD_WRITE", returns: "int" },
        { value: "SRAM_BYTE_MODE", description: "LCD1IN8_SRAM_BYTE_MODE", returns: "int" },
        { value: "SRAM_PAGE_MODE", description: "LCD1IN8_SRAM_PAGE_MODE", returns: "int" },
        { value: "SRAM_STREAM_MODE", description: "LCD1IN8_SRAM_STREAM_MODE", returns: "int" },
        { value: "COLOR", description: "LCD1IN8_COLOR", returns: "dict" },
        { value: "DOT_PIXEL", description: "LCD1IN8_DOT_PIXEL", returns: "dict" },
        { value: "LINE_STYLE", description: "LCD1IN8_LINE_STYLE", returns: "dict" },
        { value: "DRAW_FILL", description: "LCD1IN8_DRAW_FILL", returns: "dict" },
        {
            value: "LCD1IN8", meta: "lcd1in8", description: "LCD1IN8_LCD1IN8_CLASS", content: [
                { value: "__class__", meta: "LCD1IN8" }], kind: "class"
        },
        {
            value: "LCD1IN8()", title: "LCD1IN8()", meta: "constructor", snippet: "LCD1IN8()", description: "LCD1IN8_LCD1IN8_CONSTRUCTOR", returns: "LCD1IN8", content: [
                { value: "__class__", meta: "LCD1IN8" }]
        },
        { value: "__name__", title: "__name__", meta: "lcd1in8", description: "LCD1IN8_MODULE" }
    ];
    typeTree.LCD1IN8 = [
        { value: "LCD_Init", title: "LCD_Init()", meta: "-- <function>", snippet: "LCD_Init()", description: "LCD1IN8_LCD1IN8_LCD_INIT" },
        { value: "LCD_Clear", title: "LCD_Clear()", meta: "-- <function>", snippet: "LCD_Clear()", description: "LCD1IN8_LCD1IN8_LCD_CLEAR" },
        { value: "LCD_Filling", title: "LCD_Filling(Color)", meta: "-- <function>", snippet: "LCD_Filling(${1:})", description: "LCD1IN8_LCD1IN8_LCD_FILLING" },
        { value: "LCD_SetBL", title: "LCD_SetBL(Lev)", meta: "-- <function>", snippet: "LCD_SetBL(${1:})", description: "LCD1IN8_LCD1IN8_LCD_SETBL" },
        { value: "LCD_WriteReg", title: "LCD_WriteReg(reg)", meta: "-- <function>", snippet: "LCD_WriteReg(${1:})", description: "LCD1IN8_LCD1IN8_LCD_WRITEREG" },
        { value: "LCD_WriteData_8Bit", title: "LCD_WriteData_8Bit(Data)", meta: "-- <function>", snippet: "LCD_WriteData_8Bit(${1:})", description: "LCD1IN8_LCD1IN8_LCD_WRITEDATA_8BIT" },
        { value: "LCD_WriteData_Buf", title: "LCD_WriteData_Buf(Buf, length)", meta: "-- <function>", snippet: "LCD_WriteData_Buf(${1:})", description: "LCD1IN8_LCD1IN8_LCD_WRITEDATA_BUF" },
        { value: "LCD_SetWindows", title: "LCD_SetWindows(Xstart, Ystart, Xend, Yend)", meta: "-- <function>", snippet: "LCD_SetWindows(${1:})", description: "LCD1IN8_LCD1IN8_LCD_SETWINDOWS" },
        { value: "LCD_SetColor", title: "LCD_SetColor(Color, Xpoint, Ypoint)", meta: "-- <function>", snippet: "LCD_SetColor(${1:})", description: "LCD1IN8_LCD1IN8_LCD_SETCOLOR" },
        { value: "LCD_SetPoint", title: "LCD_SetPoint(Xpoint, Ypoint, Color)", meta: "-- <function>", snippet: "LCD_SetPoint(${1:})", description: "LCD1IN8_LCD1IN8_LCD_SETPOINT" },
        { value: "LCD_ClearBuf", title: "LCD_ClearBuf()", meta: "-- <function>", snippet: "LCD_ClearBuf()", description: "LCD1IN8_LCD1IN8_LCD_CLEARBUF" },
        { value: "LCD_Display", title: "LCD_Display()", meta: "-- <function>", snippet: "LCD_Display()", description: "LCD1IN8_LCD1IN8_LCD_DISPLAY" },
        { value: "DrawPoint", title: "DrawPoint(Xpoint, Ypoint, Color, Dot_Pixel)", meta: "-- <function>", snippet: "DrawPoint(${1:})", description: "LCD1IN8_LCD1IN8_DRAWPOINT" },
        { value: "DrawLine", title: "DrawLine(Xstart, Ystart, Xend, Yend, Color, Line_width, Line_Style)", meta: "-- <function>", snippet: "DrawLine(${1:})", description: "LCD1IN8_LCD1IN8_DRAWLINE" },
        { value: "DrawRectangle", title: "DrawRectangle(Xstart2, Ystart2, Xend2, Yend2, Color, Filled, Dot_Pixel)", meta: "-- <function>", snippet: "DrawRectangle(${1:})", description: "LCD1IN8_LCD1IN8_DRAWRECTANGLE" },
        { value: "DrawCircle", title: "DrawCircle(X_Center, Y_Center, Radius, Color, Draw_Fill, Dot_Pixel)", meta: "-- <function>", snippet: "DrawCircle(${1:})", description: "LCD1IN8_LCD1IN8_DRAWCIRCLE" },
        { value: "DisString", title: "DisString(Xchar, Ychar, ch, Color)", meta: "-- <function>", snippet: "DisString(${1:})", description: "LCD1IN8_LCD1IN8_DISSTRING" },
        { value: "DisNumber", title: "DisNumber(Xnum, Ynum, num, Color)", meta: "-- <function>", snippet: "DisNumber(${1:})", description: "LCD1IN8_LCD1IN8_DISNUMBER" },
        { value: "DisChar_1207", title: "DisChar_1207(Xchar, Ychar, Char_Offset, Color)", meta: "-- <function>", snippet: "DisChar_1207(${1:})", description: "LCD1IN8_LCD1IN8_DISCHAR_1207" },
        { value: "spiWrite", title: "spiWrite(value)", meta: "-- <function>", snippet: "spiWrite(${1:})", description: "LCD1IN8_LCD1IN8_SPIWRITE" },
        { value: "SPIRAM_Set_Mode", title: "SPIRAM_Set_Mode(mode)", meta: "-- <function>", snippet: "SPIRAM_Set_Mode(${1:})", description: "LCD1IN8_LCD1IN8_SPIRAM_SET_MODE" },
        { value: "SPIRAM_RD_Byte", title: "SPIRAM_RD_Byte(Addr)", meta: "-- <function>", snippet: "SPIRAM_RD_Byte(${1:})", description: "LCD1IN8_LCD1IN8_SPIRAM_RD_BYTE" },
        { value: "SPIRAM_WR_Byte", title: "SPIRAM_WR_Byte(Addr, Data)", meta: "-- <function>", snippet: "SPIRAM_WR_Byte(${1:})", description: "LCD1IN8_LCD1IN8_SPIRAM_WR_BYTE" },
        { value: "Swop_AB", title: "Swop_AB(Point1, Point2)", meta: "-- <function>", snippet: "Swop_AB(${1:})", description: "LCD1IN8_LCD1IN8_SWOP_AB" }
    ];

    // robots - tello
    const TelloConstants = [
        { value: "__class__", meta: "Tello" }
    ];
    tree.tello = [
        { value: "SEP", description: "TELLO_SEP" },
        { value: "RC", description: "TELLO_RC" },
        { value: "RL", description: "TELLO_RL" },
        { value: "END_OF_LINE", description: "TELLO_END_OF_LINE" },
        { value: "IP", description: "TELLO_IP", returns: "str" },
        { value: "IP_CLIENT", description: "TELLO_IP_CLIENT", returns: "str" },
        { value: "Tello", meta: "tello", description: "TELLO_TELLO_CLASS", content: TelloConstants, kind: "class" },
        { value: "Tello()", title: "Tello(TX_pin, RX_pin, SSID)", snippet: "Tello(${1:})", meta: "constructor", returns: "Tello", description: "TELLO_TELLO_CONSTRUCTOR", content: TelloConstants },
        { title: "__name__", value: "__name__", meta: "tello", description: "TELLO_MODULE" }
    ];
    typeTree.Tello = [
        { title: "drone_init()", value: "drone_init", meta: "-- <function>", snippet: "drone_init()", description: "TELLO_TELLO_DRONE_INIT" },
        { title: "tello_disconnect(TX_pin, RX_pin)", value: "tello_disconnect", meta: "-- <function>", snippet: "tello_disconnect(${1:})", description: "TELLO_TELLO_TELLO_DISCONNECT" },
        { title: "send_cmd(cmd, sync=True)", value: "send_cmd", meta: "-- <function>", snippet: "send_cmd(${1:})", description: "TELLO_TELLO_SEND_CMD" },
        { value: "_class__", meta: "Tello" }
    ];

    // microbit - stepper
    tree.stepper = [
        { value: "MAX_STEPS", description: "STEPPER_MAX_STEPS", returns: "int" },
        {
            value: "StepperMotor", meta: "stepper", description: "STEPPER_STEPPERMOTOR_CLASS", content: [
                { value: "STEPS", description: "STEPPER_STEPPERMOTOR_STEPS", returns: "int" },
                { value: "ROTATIONS", description: "STEPPER_STEPPERMOTOR_ROTATIONS", returns: "int" },
                { value: "__class__", meta: "StepperMotor" }], kind: "class"
        },
        { value: "StepperMotor()", title: "StepperMotor()", meta: "constructor", snippet: "StepperMotor(${1:})", description: "STEPPER_STEPPERMOTOR_CONSTRUCTOR", returns: "StepperMotor", content: [{ value: "STEPS", description: "STEPPER_STEPPERMOTOR_STEPS", returns: "int" }, { value: "ROTATIONS", description: "STEPPER_STEPPERMOTOR_ROTATIONS", returns: "int" }, { value: "__class__", meta: "StepperMotor" }] },
        { value: "__name__", title: "__name__", meta: "stepper", description: "STEPPER_MODULE" }
    ];
    typeTree.StepperMotor = [
        { value: "setState", title: "setState(state)", meta: "-- <function>", snippet: "setState(${1:})", description: "STEPPER_STEPPERMOTOR_SETSTATE" },
        { value: "setDelay", title: "setDelay(delay_ms)", meta: "-- <function>", snippet: "setDelay(${1:})", description: "STEPPER_STEPPERMOTOR_SETDELAY" },
        { value: "steps", title: "steps(direction)", meta: "-- <function>", snippet: "steps(${1:})", description: "STEPPER_STEPPERMOTOR_STEPS" },
        { value: "moveAntiClockwise", title: "moveAntiClockwise(steps, unit)", meta: "-- <function>", snippet: "moveAntiClockwise(${1:})", description: "STEPPER_STEPPERMOTOR_MOVEANTICLOCKWISE" },
        { value: "moveClockwise", title: "moveClockwise(steps, unit)", meta: "-- <function>", snippet: "moveClockwise(${1:})", description: "STEPPER_STEPPERMOTOR_MOVECLOCKWISE" },
        { value: "stop", title: "stop()", meta: "-- <function>", snippet: "stop()", description: "STEPPER_STEPPERMOTOR_STOP" }
    ];

    // infrared - ir_receiver
    const IR_RXconstants = [
        { value: "REPEAT", description: "IR_RECEIVER_IR_RX_REPEAT", returns: "int" },
        { value: "BADSTART", description: "IR_RECEIVER_IR_RX_BADSTART", returns: "int" },
        { value: "BADBLOCK", description: "IR_RECEIVER_IR_RX_BADBLOCK", returns: "int" },
        { value: "BADREP", description: "IR_RECEIVER_IR_RX_BADREP", returns: "int" },
        { value: "OVERRUN", description: "IR_RECEIVER_IR_RX_OVERRUN", returns: "int" },
        { value: "BADDATA", description: "IR_RECEIVER_IR_RX_BADDATA", returns: "int" },
        { value: "BADADDR", description: "IR_RECEIVER_IR_RX_BADADDR", returns: "int" },
        { value: "__class__", meta: "IR_RX" }
    ];
    tree.ir_receiver = [
        { value: "IR_RX", meta: "ir_receiver", description: "IR_RECEIVER_IR_RX_CLASS", content: IR_RXconstants, kind: "class" },
        { value: "IR_RX()", title: "IR_RX(pin, callback, *args)", snippet: "IR_RX(${1:})", meta: "constructor", returns: "IR_RX", description: "IR_RECEIVER_IR_RX_CONSTRUCTOR", content: IR_RXconstants },
        { title: "__name__", value: "__name__", meta: "ir_receiver", description: "IR_RECEIVER_MODULE" }
    ];
    typeTree.IR_RX = [
        { title: "do_callback(cmd, addr, ext, thresh=0)", value: "do_callback", meta: "-- <function>", snippet: "do_callback(${1:})", description: "IR_RECEIVER_IR_RX_DO_CALLBACK" },
        { title: "error_function(func)", value: "error_function", meta: "-- <function>", snippet: "error_function(${1:})", description: "IR_RECEIVER_IR_RX_ERROR_FUNCTION" },
        { title: "_cb_pin(pin)", value: "_cb_pin", meta: "-- <function>", snippet: "_cb_pin(${1:})", description: "IR_RECEIVER_IR_RX__CB_PIN" }
    ];

    // infrared - nec_remote
    const NEC_ABCconstants = [
        { value: "__class__", meta: "NEC_ABC" }
    ];
    const NEC_8constants = [
        { value: "__class__", meta: "NEC_8" }
    ];
    const NEC_16constants = [
        { value: "__class__", meta: "NEC_16" }
    ];
    tree.nec_remote = [
        { value: "NEC_ABC", meta: "nec_remote", description: "NEC_REMOTE_NEC_ABC_CLASS", content: NEC_ABCconstants, kind: "class", extends: "IR_RX" },
        { value: "NEC_ABC()", title: "NEC_ABC(pin, extended, callback, *args)", snippet: "NEC_ABC(${1:})", meta: "constructor", returns: "NEC_ABC", description: "NEC_REMOTE_NEC_ABC_CONSTRUCTOR", content: NEC_ABCconstants },
        { value: "NEC_8", meta: "nec_remote", description: "NEC_REMOTE_NEC_8_CLASS", content: NEC_8constants, kind: "class", extends: "NEC_ABC" },
        { value: "NEC_8()", title: "NEC_8(pin, callback, *args)", snippet: "NEC_8(${1:})", meta: "constructor", returns: "NEC_8", description: "NEC_REMOTE_NEC_8_CONSTRUCTOR", content: NEC_8constants },
        { value: "NEC_16", meta: "nec_remote", description: "NEC_REMOTE_NEC_16_CLASS", content: NEC_16constants, kind: "class", extends: "NEC_ABC" },
        { value: "NEC_16()", title: "NEC_16(pin, callback, *args)", snippet: "NEC_16(${1:})", meta: "constructor", returns: "NEC_16", description: "NEC_REMOTE_NEC_16_CONSTRUCTOR", content: NEC_16constants },
        { title: "__name__", value: "__name__", meta: "nec_remote", description: "NEC_REMOTE_MODULE" }
    ];
    typeTree.NEC_ABC = [
        { title: "decode()", value: "decode", meta: "-- <function>", snippet: "decode()", description: "NEC_REMOTE_DECODE" },
        { title: "binToHex(binary)", value: "binToHex", meta: "-- <function>", snippet: "binToHex(${1:})", description: "NEC_REMOTE_BINTOHEX", returns: "int" },
        { title: "is_around(value, ref, offset=200)", value: "is_around", meta: "-- <function>", snippet: "is_around(${1:})", description: "NEC_REMOTE_IS_AROUND", returns: "bool" }
    ];
    typeTree.NEC_8 = [
        { title: "__init__(pin, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "NEC_REMOTE_NEC_8___INIT__" }
    ];
    typeTree.NEC_16 = [
        { title: "__init__(pin, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "NEC_REMOTE_NEC_16___INIT__" }
    ];

    // grove - bmp280
    const BMP280Constants = [
        { value: "__class__", meta: "BMP280" }
    ];
    tree.bmp280 = [
        { value: "BMP280", meta: "bmp280", description: "GROVE_BMP280_BMP280_CLASS", content: BMP280Constants, kind: "class" },
        { value: "BMP280()", title: "BMP280(addr=118)", snippet: "BMP280(${1:})", meta: "constructor", returns: "BMP280", description: "GROVE_BMP280_BMP280_CONSTRUCTOR", content: BMP280Constants },
        { title: "__name__", value: "__name__", meta: "bmp280", description: "GROVE_BMP280_MODULE" }
    ];
    typeTree.BMP280 = [
        { title: "Altitude()", value: "Altitude", meta: "-- <function>", snippet: "Altitude()", description: "GROVE_BMP280_BMP280_ALTITUDE" },
        { title: "Pressure()", value: "Pressure", meta: "-- <function>", snippet: "Pressure()", description: "GROVE_BMP280_BMP280_PRESSURE" },
        { title: "Temperature()", value: "Temperature", meta: "-- <function>", snippet: "Temperature()", description: "GROVE_BMP280_BMP280_TEMPERATURE" },
        { title: "__init__(addr=118)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_BMP280_BMP280___INIT__" },
        { title: "g(r)", value: "g", meta: "-- <function>", snippet: "g(${1:})", description: "GROVE_BMP280_BMP280_G" },
        { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "GROVE_BMP280_BMP280_GET" },
        { title: "h(r)", value: "h", meta: "-- <function>", snippet: "h(${1:})", description: "GROVE_BMP280_BMP280_H" },
        { title: "s(r, d)", value: "s", meta: "-- <function>", snippet: "s(${1:})", description: "GROVE_BMP280_BMP280_S" },
        { title: "sh(d)", value: "sh", meta: "-- <function>", snippet: "sh(${1:})", description: "GROVE_BMP280_BMP280_SH" },
    ];

    // grove - color_sensor
    const GroveI2cColorSensorV2Constants = [
        { value: "__class__", meta: "GroveI2cColorSensorV2" },
        { value: "__name__", meta: "GroveI2cColorSensorV2" },
        { value: "__bases__", meta: "GroveI2cColorSensorV2" },
        { value: "__dict__", meta: "GroveI2cColorSensorV2" }
    ];
    tree.color_sensor = [
        { value: "_GAINS", meta: "-- <constant>", description: "GROVE_COLOR_SENSOR__GAINS" },
        { value: "GroveI2cColorSensorV2", meta: "color_sensor", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_CLASS", content: GroveI2cColorSensorV2Constants, kind: "class" },
        { value: "GroveI2cColorSensorV2()", title: "GroveI2cColorSensorV2()", snippet: "GroveI2cColorSensorV2()", meta: "constructor", returns: "GroveI2cColorSensorV2", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_CONSTRUCTOR", content: GroveI2cColorSensorV2Constants },
        { title: "__name__", value: "__name__", meta: "color_sensor", description: "GROVE_COLOR_SENSOR_MODULE" }
    ];
    typeTree.GroveI2cColorSensorV2 = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2___INIT__" },
        { title: "wakeup()", value: "wakeup", meta: "-- <function>", snippet: "wakeup()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_WAKEUP" },
        { title: "sleep()", value: "sleep", meta: "-- <function>", snippet: "sleep()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_SLEEP" },
        { title: "is_awake()", value: "is_awake", meta: "-- <function>", snippet: "is_awake()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_IS_AWAKE" },
        { title: "integration_time()", value: "integration_time", meta: "-- <function>", snippet: "integration_time()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_INTEGRATION_TIME" },
        { title: "set_integration_time(t)", value: "set_integration_time", meta: "-- <function>", snippet: "set_integration_time(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_SET_INTEGRATION_TIME" },
        { title: "gain()", value: "gain", meta: "-- <function>", snippet: "gain()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_GAIN" },
        { title: "set_gain(gain)", value: "set_gain", meta: "-- <function>", snippet: "set_gain(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_SET_GAIN" },
        { title: "raw()", value: "raw", meta: "-- <function>", snippet: "raw()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_RAW" },
        { title: "rgb()", value: "rgb", meta: "-- <function>", snippet: "rgb()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2_RGB" },
        { title: "_valid()", value: "_valid", meta: "-- <function>", snippet: "_valid()", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2__VALID" },
        { title: "_read_byte(address)", value: "_read_byte", meta: "-- <function>", snippet: "_read_byte(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2__READ_BYTE" },
        { title: "_read_word(address)", value: "_read_word", meta: "-- <function>", snippet: "_read_word(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2__READ_WORD" },
        { title: "_write_byte(address, data)", value: "_write_byte", meta: "-- <function>", snippet: "_write_byte(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2__WRITE_BYTE" },
        { title: "_write_word(address, data)", value: "_write_word", meta: "-- <function>", snippet: "_write_word(${1:})", description: "GROVE_COLOR_SENSOR_GROVEI2CCOLORSENSORV2__WRITE_WORD" }
    ];

    const DHT11Constants = [
        { value: "__class__", meta: "DHT11" },
        { value: "__name__", meta: "DHT11" },
        { value: "__bases__", meta: "DHT11" },
        { value: "__dict__", meta: "DHT11" }
    ];
    // grove - dht11
    tree.dht11 = [
        { value: "DHT11", meta: "dht11", description: "GROVE_DHT11_DHT11_CLASS", content: DHT11Constants, kind: "class" },
        { value: "DHT11()", title: "DHT11(pin)", snippet: "DHT11(${1:})", meta: "constructor", returns: "DHT11", description: "GROVE_DHT11_DHT11_CONSTRUCTOR", content: DHT11Constants },
        { title: "__name__", value: "__name__", meta: "dht11", description: "GROVE_DHT11_MODULE" }
    ];

    // grove - dht11_v2
    tree.dht11_v2 = [
        { value: "DHT11", meta: "dht11_v2", description: "GROVE_DHT11_V2_DHT11_CLASS", content: DHT11Constants, kind: "class" },
        { value: "DHT11()", title: "DHT11(pin)", snippet: "DHT11(${1:})", meta: "constructor", returns: "DHT11", description: "GROVE_DHT11_V2_DHT11_CONSTRUCTOR", content: DHT11Constants },
        { title: "__name__", value: "__name__", meta: "dht11_v2", description: "GROVE_DHT11_V2_MODULE" }
    ];
    typeTree.DHT11 = [
        { title: "__init__(pin)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_DHT11_DHT11___INIT__" },
        { title: "read()", value: "read", meta: "-- <function>", snippet: "read()", description: "GROVE_DHT11_DHT11_READ" },
        { title: "_p2bit()", value: "_p2bit", meta: "-- <function>", snippet: "_p2bit()", description: "GROVE_DHT11_DHT11__P2BIT" },
        { title: "_birq()", value: "_birq", meta: "-- <function>", snippet: "_birq()", description: "GROVE_DHT11_DHT11__BIRQ" },
        { title: "_ubirq()", value: "_ubirq", meta: "-- <function>", snippet: "_ubirq()", description: "GROVE_DHT11_DHT11__UBIRQ" },
        { title: "_gb(r0, r1, r2)", value: "_gb", meta: "-- <function>", snippet: "_gb(${1:})", description: "GROVE_DHT11_DHT11__GB" },
        { title: "_parse_dta(buf)", value: "_parse_dta", meta: "-- <function>", snippet: "_parse_dta(${1:})", description: "GROVE_DHT11_DHT11__PARSE_DTA" },
        { title: "_cb(pul)", value: "_cb", meta: "-- <function>", snippet: "_cb(${1:})", description: "GROVE_DHT11_DHT11__CB" },
        { title: "_ccs(dt)", value: "_ccs", meta: "-- <function>", snippet: "_ccs(${1:})", description: "GROVE_DHT11_DHT11__CCS" },
        { title: "getData(d=1)", value: "getData", meta: "-- <function>", snippet: "getData(${1:d=1})", description: "GROVE_DHT11_DHT11_GETDATA" },
        { title: "_set_wc(r0)", value: "_set_wc", meta: "-- <function>", snippet: "_set_wc(${1:})", description: "GROVE_DHT11_V2_DHT11__SET_WC" },
        { title: "_set_rc(r0)", value: "_set_rc", meta: "-- <function>", snippet: "_set_rc(${1:})", description: "GROVE_DHT11_V2_DHT11__SET_RC" },
        { title: "_wd_high(r0)", value: "_wd_high", meta: "-- <function>", snippet: "_wd_high(${1:})", description: "GROVE_DHT11_V2_DHT11__WD_HIGH" },
        { title: "_wd_low(r0)", value: "_wd_low", meta: "-- <function>", snippet: "_wd_low(${1:})", description: "GROVE_DHT11_V2_DHT11__WD_LOW" }
    ];

    // grove - ds1307
    const DS1307Constants = [
        { value: "__class__", meta: "DS1307" },
        { value: "__name__", meta: "DS1307" },
        { value: "__bases__", meta: "DS1307" },
        { value: "__dict__", meta: "DS1307" }
    ];
    tree.ds1307 = [
        { value: "DAYS_OF_WEEK", meta: "-- <constant>", description: "GROVE_DS1307_DAYS_OF_WEEK" },
        { value: "RTC_V1_I2C_ADDR", meta: "-- <constant>", description: "GROVE_DS1307_RTC_V1_I2C_ADDR" },
        { value: "DS1307", meta: "ds1307", description: "GROVE_DS1307_DS1307_CLASS", content: DS1307Constants, kind: "class" },
        { value: "DS1307()", title: "DS1307(addr=RTC_V1_I2C_ADDR)", snippet: "DS1307(${1:addr=RTC_V1_I2C_ADDR})", meta: "constructor", returns: "DS1307", description: "GROVE_DS1307_DS1307_CONSTRUCTOR", content: DS1307Constants },
        { title: "__name__", value: "__name__", meta: "ds1307", description: "GROVE_DS1307_MODULE" }
    ];
    typeTree.DS1307 = [
        { title: "__init__(addr=RTC_V1_I2C_ADDR)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:addr=RTC_V1_I2C_ADDR})", description: "GROVE_DS1307_DS1307___INIT__" },
        { title: "reset()", value: "reset", meta: "-- <function>", snippet: "reset()", description: "GROVE_DS1307_DS1307_RESET" },
        { title: "fillByHMS(hour, min, sec)", value: "fillByHMS", meta: "-- <function>", snippet: "fillByHMS(${1:})", description: "GROVE_DS1307_DS1307_FILLBYHMS" },
        { title: "fillByYMD(year, month, day)", value: "fillByYMD", meta: "-- <function>", snippet: "fillByYMD(${1:})", description: "GROVE_DS1307_DS1307_FILLBYYMD" },
        { title: "fillDayOfWeek(dow)", value: "fillDayOfWeek", meta: "-- <function>", snippet: "fillDayOfWeek(${1:})", description: "GROVE_DS1307_DS1307_FILLDAYOFWEEK" },
        { title: "startClock()", value: "startClock", meta: "-- <function>", snippet: "startClock()", description: "GROVE_DS1307_DS1307_STARTCLOCK" },
        { title: "readTime()", value: "readTime", meta: "-- <function>", snippet: "readTime()", description: "GROVE_DS1307_DS1307_READTIME" },
        { title: "_writeReg(reg, data)", value: "_writeReg", meta: "-- <function>", snippet: "_writeReg(${1:})", description: "GROVE_DS1307_DS1307__WRITEREG" },
        { title: "_decToBcd(val)", value: "_decToBcd", meta: "-- <function>", snippet: "_decToBcd(${1:})", description: "GROVE_DS1307_DS1307__DECTOBCD" },
        { title: "_bcdToDec(val)", value: "_bcdToDec", meta: "-- <function>", snippet: "_bcdToDec(${1:})", description: "GROVE_DS1307_DS1307__BCDTODEC" }
    ];

    // grove - ds18x20
    const DS18X20Constants = [
        { value: "__class__", meta: "DS18X20" },
        { value: "__name__", meta: "DS18X20" },
        { value: "__bases__", meta: "DS18X20" },
        { value: "__dict__", meta: "DS18X20" }
    ];
    tree.ds18x20 = [
        { value: "DS18X20", meta: "ds18x20", description: "GROVE_DS18X20_DS18X20_CLASS", content: DS18X20Constants, kind: "class" },
        { value: "DS18X20()", title: "DS18X20(onewire)", snippet: "DS18X20(${1:})", meta: "constructor", returns: "DS18X20", description: "GROVE_DS18X20_DS18X20_CONSTRUCTOR", content: DS18X20Constants },
        { title: "__name__", value: "__name__", meta: "ds18x20", description: "GROVE_DS18X20_MODULE" }
    ];
    typeTree.DS18X20 = [
        { title: "__init__(onewire)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_DS18X20_DS18X20___INIT__" },
        { title: "powermode(powerpin=None)", value: "powermode", meta: "-- <function>", snippet: "powermode(${1:powerpin=None})", description: "GROVE_DS18X20_DS18X20_POWERMODE" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "GROVE_DS18X20_DS18X20_SCAN", returns: "list" },
        { title: "convert_temp(rom=None)", value: "convert_temp", meta: "-- <function>", snippet: "convert_temp(${1:rom=None})", description: "GROVE_DS18X20_DS18X20_CONVERT_TEMP" },
        { title: "read_scratch(rom)", value: "read_scratch", meta: "-- <function>", snippet: "read_scratch(${1:})", description: "GROVE_DS18X20_DS18X20_READ_SCRATCH" },
        { title: "write_scratch(rom, buf)", value: "write_scratch", meta: "-- <function>", snippet: "write_scratch(${1:})", description: "GROVE_DS18X20_DS18X20_WRITE_SCRATCH" },
        { title: "read_temp(rom)", value: "read_temp", meta: "-- <function>", snippet: "read_temp(${1:})", description: "GROVE_DS18X20_DS18X20_READ_TEMP" },
        { title: "resolution(rom, bits=None)", value: "resolution", meta: "-- <function>", snippet: "resolution(${1:})", description: "GROVE_DS18X20_DS18X20_RESOLUTION" },
        { title: "fahrenheit(celsius)", value: "fahrenheit", meta: "-- <function>", snippet: "fahrenheit(${1:})", description: "GROVE_DS18X20_DS18X20_FAHRENHEIT" },
        { title: "kelvin(celsius)", value: "kelvin", meta: "-- <function>", snippet: "kelvin(${1:})", description: "GROVE_DS18X20_DS18X20_KELVIN" }
    ];

    // grove - gas_gmxxx
    const GAS_GMXXXConstants = [
        { value: "__class__", meta: "GAS_GMXXX" },
        { value: "__name__", meta: "GAS_GMXXX" },
        { value: "__bases__", meta: "GAS_GMXXX" },
        { value: "__dict__", meta: "GAS_GMXXX" }
    ];
    tree.gas_gmxxx = [
        { value: "GAS_GMXXX", meta: "gas_gmxxx", description: "GROVE_GAS_GMXXX_GAS_GMXXX_CLASS", content: GAS_GMXXXConstants, kind: "class" },
        { value: "GAS_GMXXX()", title: "GAS_GMXXX(addr)", snippet: "GAS_GMXXX(${1:})", meta: "constructor", returns: "GAS_GMXXX", description: "GROVE_GAS_GMXXX_GAS_GMXXX_CONSTRUCTOR", content: GAS_GMXXXConstants },
        { title: "__name__", value: "__name__", meta: "gas_gmxxx", description: "GROVE_GAS_GMXXX_MODULE" }
    ];
    typeTree.GAS_GMXXX = [
        { title: "__init__(addr)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_GAS_GMXXX_GAS_GMXXX___INIT__" },
        { title: "preheated()", value: "preheated", meta: "-- <function>", snippet: "preheated()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_PREHEATED" },
        { title: "unPreheated()", value: "unPreheated", meta: "-- <function>", snippet: "unPreheated()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_UNPREHEATED" },
        { title: "measure(cmd)", value: "measure", meta: "-- <function>", snippet: "measure(${1:})", description: "GROVE_GAS_GMXXX_GAS_GMXXX_MEASURE" },
        { title: "measure_NO2()", value: "measure_NO2", meta: "-- <function>", snippet: "measure_NO2()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_MEASURE_NO2" },
        { title: "measure_C2H5OH()", value: "measure_C2H5OH", meta: "-- <function>", snippet: "measure_C2H5OH()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_MEASURE_C2H5OH" },
        { title: "measure_VOC()", value: "measure_VOC", meta: "-- <function>", snippet: "measure_VOC()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_MEASURE_VOC" },
        { title: "measure_CO()", value: "measure_CO", meta: "-- <function>", snippet: "measure_CO()", description: "GROVE_GAS_GMXXX_GAS_GMXXX_MEASURE_CO" },
        { title: "changeAddr(addr=8)", value: "changeAddr", meta: "-- <function>", snippet: "changeAddr(${1:addr=8})", description: "GROVE_GAS_GMXXX_GAS_GMXXX_CHANGEADDR" },
        { title: "calcVol(adc)", value: "calcVol", meta: "-- <function>", snippet: "calcVol(${1:})", description: "GROVE_GAS_GMXXX_GAS_GMXXX_CALCVOL" }
    ];

    // grove - gesture
    const GESTUREConstants = [
        { value: "__class__", meta: "GESTURE" },
        { value: "__name__", meta: "GESTURE" },
        { value: "__bases__", meta: "GESTURE" },
        { value: "__dict__", meta: "GESTURE" }
    ];
    tree.gesture = [
        { value: "R", meta: "-- <constant>", description: "GROVE_GESTURE_R" },
        { value: "G", meta: "-- <constant>", description: "GROVE_GESTURE_G" },
        { value: "GESTURE", meta: "gesture", description: "GROVE_GESTURE_GESTURE_CLASS", content: GESTUREConstants, kind: "class" },
        { value: "GESTURE()", title: "GESTURE()", snippet: "GESTURE()", meta: "constructor", returns: "GESTURE", description: "GROVE_GESTURE_GESTURE_CONSTRUCTOR", content: GESTUREConstants },
        { title: "__name__", value: "__name__", meta: "gesture", description: "GROVE_GESTURE_MODULE" }
    ];
    typeTree.GESTURE = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_GESTURE_GESTURE___INIT__" },
        { title: "_init_reg()", value: "_init_reg", meta: "-- <function>", snippet: "_init_reg()", description: "GROVE_GESTURE_GESTURE__INIT_REG" },
        { title: "_wreg(a, c)", value: "_wreg", meta: "-- <function>", snippet: "_wreg(${1:})", description: "GROVE_GESTURE_GESTURE__WREG" },
        { title: "_rreg(a)", value: "_rreg", meta: "-- <function>", snippet: "_rreg(${1:})", description: "GROVE_GESTURE_GESTURE__RREG" },
        { title: "_sbank(b)", value: "_sbank", meta: "-- <function>", snippet: "_sbank(${1:})", description: "GROVE_GESTURE_GESTURE__SBANK" },
        { title: "readGesture()", value: "readGesture", meta: "-- <function>", snippet: "readGesture()", description: "GROVE_GESTURE_GESTURE_READGESTURE" }
    ];

    // grove - hm330x
    const HM330XConstants = [
        { value: "__class__", meta: "HM330X" },
        { value: "__name__", meta: "HM330X" },
        { value: "__bases__", meta: "HM330X" },
        { value: "__dict__", meta: "HM330X" }
    ];
    tree.hm330x = [
        { value: "HM330X", meta: "hm330x", description: "GROVE_HM330X_HM330X_CLASS", content: HM330XConstants, kind: "class" },
        { value: "HM330X()", title: "HM330X()", snippet: "HM330X()", meta: "constructor", returns: "HM330X", description: "GROVE_HM330X_HM330X_CONSTRUCTOR", content: HM330XConstants },
        { title: "__name__", value: "__name__", meta: "hm330x", description: "GROVE_HM330X_MODULE" }
    ];
    typeTree.HM330X = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_HM330X_HM330X___INIT__" },
        { title: "read_data()", value: "read_data", meta: "-- <function>", snippet: "read_data()", description: "GROVE_HM330X_HM330X_READ_DATA" },
        { title: "check_crc(data)", value: "check_crc", meta: "-- <function>", snippet: "check_crc(${1:})", description: "GROVE_HM330X_HM330X_CHECK_CRC" },
        { title: "parse_data(data)", value: "parse_data", meta: "-- <function>", snippet: "parse_data(${1:})", description: "GROVE_HM330X_HM330X_PARSE_DATA" },
        { title: "getData(select=3)", value: "getData", meta: "-- <function>", snippet: "getData(${1:select=3})", description: "GROVE_HM330X_HM330X_GETDATA" }
    ];

    // grove - hp206c
    const HP206CConstants = [
        { value: "__class__", meta: "HP206C" },
        { value: "__name__", meta: "HP206C" },
        { value: "__bases__", meta: "HP206C" },
        { value: "__dict__", meta: "HP206C" }
    ];
    tree.hp206c = [
        { value: "HP206C", meta: "hp206c", description: "GROVE_HP206C_HP206C_CLASS", content: HP206CConstants, kind: "class" },
        { value: "HP206C()", title: "HP206C(address=118)", snippet: "HP206C(${1:address=118})", meta: "constructor", returns: "HP206C", description: "GROVE_HP206C_HP206C_CONSTRUCTOR", content: HP206CConstants },
        { title: "__name__", value: "__name__", meta: "hp206c", description: "GROVE_HP206C_MODULE" }
    ];
    typeTree.HP206C = [
        { title: "__init__(address=118)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:address=118})", description: "GROVE_HP206C_HP206C___INIT__" },
        { title: "read_temperature_and_pressure()", value: "read_temperature_and_pressure", meta: "-- <function>", snippet: "read_temperature_and_pressure()", description: "GROVE_HP206C_HP206C_READ_TEMPERATURE_AND_PRESSURE" },
        { title: "read_altitude()", value: "read_altitude", meta: "-- <function>", snippet: "read_altitude()", description: "GROVE_HP206C_HP206C_READ_ALTITUDE" },
        { title: "get_measurement(data_type)", value: "get_measurement", meta: "-- <function>", snippet: "get_measurement(${1:})", description: "GROVE_HP206C_HP206C_GET_MEASUREMENT" }
    ];

    // grove - ht16k33
    const HT16K33Constants = [
        { value: "__class__", meta: "HT16K33" },
        { value: "address", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_ADDRESS" },
        { value: "brightness", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_BRIGHTNESS" },
        { value: "flash_rate", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_FLASH_RATE" },
        { value: "HT16K33_GENERIC_DISPLAY_ON", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_ON" },
        { value: "HT16K33_GENERIC_DISPLAY_OFF", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_OFF" },
        { value: "HT16K33_GENERIC_SYSTEM_ON", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_SYSTEM_ON" },
        { value: "HT16K33_GENERIC_SYSTEM_OFF", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_SYSTEM_OFF" },
        { value: "HT16K33_GENERIC_DISPLAY_ADDRESS", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_ADDRESS" },
        { value: "HT16K33_GENERIC_CMD_BRIGHTNESS", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_CMD_BRIGHTNESS" },
        { value: "HT16K33_GENERIC_CMD_BLINK", meta: "-- <constant>", description: "GROVE_HT16K33_HT16K33_HT16K33_GENERIC_CMD_BLINK" },
        { value: "__name__", meta: "HT16K33" },
        { value: "__bases__", meta: "HT16K33" },
        { value: "__dict__", meta: "HT16K33" }
    ];
    tree.ht16k33 = [
        { value: "HT16K33", meta: "ht16k33", description: "GROVE_HT16K33_HT16K33_CLASS", content: HT16K33Constants, kind: "class" },
        { value: "HT16K33()", title: "HT16K33(i2c_address)", snippet: "HT16K33(${1:})", meta: "constructor", returns: "HT16K33", description: "GROVE_HT16K33_HT16K33_CONSTRUCTOR", content: HT16K33Constants },
        { title: "__name__", value: "__name__", meta: "ht16k33", description: "GROVE_HT16K33_MODULE" }
    ];
    typeTree.HT16K33 = [
        { title: "__init__(i2c_address)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_HT16K33_HT16K33___INIT__" },
        { title: "power_on()", value: "power_on", meta: "-- <function>", snippet: "power_on()", description: "GROVE_HT16K33_HT16K33_POWER_ON" },
        { title: "_write_cmd(cmd)", value: "_write_cmd", meta: "-- <function>", snippet: "_write_cmd(${1:})", description: "GROVE_HT16K33_HT16K33__WRITE_CMD" }
    ];

    // grove - ht16k33matrix
    const HT16K33MatrixConstants = [
        { value: "__class__", meta: "HT16K33Matrix" },
        { value: "width", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_WIDTH" },
        { value: "height", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_HEIGHT" },
        { value: "def_chars", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_DEF_CHARS" },
        { value: "rotation_angle", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_ROTATION_ANGLE" },
        { value: "is_rotated", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_IS_ROTATED" },
        { value: "is_inverse", meta: "-- <constant>", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_IS_INVERSE" },
        { value: "__name__", meta: "HT16K33Matrix" },
        { value: "__bases__", meta: "HT16K33Matrix" },
        { value: "__dict__", meta: "HT16K33Matrix" }
    ];
    tree.ht16k33matrix = [
        { value: "HT16K33Matrix", meta: "ht16k33matrix", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_CLASS", content: HT16K33MatrixConstants, kind: "class", extends: "HT16K33" },
        { value: "HT16K33Matrix()", title: "HT16K33Matrix(i2c_address=112)", snippet: "HT16K33Matrix(${1:i2c_address=112})", meta: "constructor", returns: "HT16K33Matrix", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_CONSTRUCTOR", content: HT16K33MatrixConstants },
        { title: "__name__", value: "__name__", meta: "ht16k33matrix", description: "GROVE_HT16K33MATRIX_MODULE" }
    ];
    typeTree.HT16K33Matrix = [
        { title: "__init__(i2c_address=112)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:i2c_address=112})", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX___INIT__" },
        { title: "set_icon(glyph, centre=False)", value: "set_icon", meta: "-- <function>", snippet: "set_icon(${1:})", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_SET_ICON" },
        { title: "draw()", value: "draw", meta: "-- <function>", snippet: "draw()", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX_DRAW" },
        { title: "_rotate_matrix(input_matrix, angle=0)", value: "_rotate_matrix", meta: "-- <function>", snippet: "_rotate_matrix(${1:})", description: "GROVE_HT16K33MATRIX_HT16K33MATRIX__ROTATE_MATRIX" }
    ];

    // grove - huskyLens
    const HuskyLensLibraryConstants = [
        { value: "__class__", meta: "HuskyLensLibrary" },
        { value: "__name__", meta: "HuskyLensLibrary" },
        { value: "__bases__", meta: "HuskyLensLibrary" },
        { value: "__dict__", meta: "HuskyLensLibrary" }
    ];
    tree.huskyLens = [
        { value: "_B", meta: "-- <constant>", description: "GROVE_HUSKYLENS__B" },
        { value: "_A", meta: "-- <constant>", description: "GROVE_HUSKYLENS__A" },
        { value: "commandHeaderAndAddress", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMANDHEADERANDADDRESS" },
        { value: "algorthimsByteID", meta: "-- <constant>", description: "GROVE_HUSKYLENS_ALGORTHIMSBYTEID" },
        { value: "COMMAND_REQUEST_CUSTOM_NAMES", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_CUSTOM_NAMES" },
        { value: "COMMAND_REQUEST_TAKE_PHOTO_TO_SD_CARD", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_TAKE_PHOTO_TO_SD_CARD" },
        { value: "COMMAND_REQUEST_SAVE_MODEL_TO_SD_CARD", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_SAVE_MODEL_TO_SD_CARD" },
        { value: "COMMAND_REQUEST_LOAD_MODEL_FROM_SD_CARD", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_LOAD_MODEL_FROM_SD_CARD" },
        { value: "COMMAND_REQUEST_CUSTOM_TEXT", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_CUSTOM_TEXT" },
        { value: "COMMAND_REQUEST_CLEAR_TEXT", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_CLEAR_TEXT" },
        { value: "COMMAND_REQUEST_LEARN_ONECE", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_LEARN_ONECE" },
        { value: "COMMAND_REQUEST_FORGET", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_FORGET" },
        { value: "COMMAND_REQUEST_SCREENSHOT_TO_SD_CARD", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_SCREENSHOT_TO_SD_CARD" },
        { value: "COMMAND_REQUEST_FIRMWARE_VERSION", meta: "-- <constant>", description: "GROVE_HUSKYLENS_COMMAND_REQUEST_FIRMWARE_VERSION" },
        { value: "HuskyLensLibrary", meta: "huskyLens", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_CLASS", content: HuskyLensLibraryConstants, kind: "class" },
        { value: "HuskyLensLibrary()", title: "HuskyLensLibrary(A)", snippet: "HuskyLensLibrary(${1:})", meta: "constructor", returns: "HuskyLensLibrary", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_CONSTRUCTOR", content: HuskyLensLibraryConstants },
        { title: "__name__", value: "__name__", meta: "huskyLens", description: "GROVE_HUSKYLENS_MODULE" }
    ];
    typeTree.HuskyLensLibrary = [
        { title: "__init__(A)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY___INIT__" },
        { title: "writeToHuskyLens(A, cmd)", value: "writeToHuskyLens", meta: "-- <function>", snippet: "writeToHuskyLens(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_WRITETOHUSKYLENS" },
        { title: "calculateChecksum(D, hexStr)", value: "calculateChecksum", meta: "-- <function>", snippet: "calculateChecksum(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_CALCULATECHECKSUM" },
        { title: "unhexlify(A)", value: "unhexlify", meta: "-- <function>", snippet: "unhexlify(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_UNHEXLIFY" },
        { title: "cmdToBytes(A, cmd)", value: "cmdToBytes", meta: "-- <function>", snippet: "cmdToBytes(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_CMDTOBYTES" },
        { title: "splitCommandToParts(G, str)", value: "splitCommandToParts", meta: "-- <function>", snippet: "splitCommandToParts(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_SPLITCOMMANDTOPARTS" },
        { title: "getBlockOrArrowCommand(A)", value: "getBlockOrArrowCommand", meta: "-- <function>", snippet: "getBlockOrArrowCommand(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_GETBLOCKORARROWCOMMAND" },
        { title: "processReturnData(B)", value: "processReturnData", meta: "-- <function>", snippet: "processReturnData(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_PROCESSRETURNDATA" },
        { title: "command_request_knock(A)", value: "command_request_knock", meta: "-- <function>", snippet: "command_request_knock(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_KNOCK" },
        { title: "command_request(A)", value: "command_request", meta: "-- <function>", snippet: "command_request(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST" },
        { title: "command_request_blocks(A)", value: "command_request_blocks", meta: "-- <function>", snippet: "command_request_blocks(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_BLOCKS" },
        { title: "command_request_arrows(A)", value: "command_request_arrows", meta: "-- <function>", snippet: "command_request_arrows(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_ARROWS" },
        { title: "command_request_learned(A)", value: "command_request_learned", meta: "-- <function>", snippet: "command_request_learned(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_LEARNED" },
        { title: "command_request_blocks_learned(A)", value: "command_request_blocks_learned", meta: "-- <function>", snippet: "command_request_blocks_learned(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_BLOCKS_LEARNED" },
        { title: "command_request_arrows_learned(A)", value: "command_request_arrows_learned", meta: "-- <function>", snippet: "command_request_arrows_learned(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_ARROWS_LEARNED" },
        { title: "line_tracking_mode(A)", value: "line_tracking_mode", meta: "-- <function>", snippet: "line_tracking_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_LINE_TRACKING_MODE" },
        { title: "face_recognition_mode(A)", value: "face_recognition_mode", meta: "-- <function>", snippet: "face_recognition_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_FACE_RECOGNITION_MODE" },
        { title: "object_tracking_mode(A)", value: "object_tracking_mode", meta: "-- <function>", snippet: "object_tracking_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_OBJECT_TRACKING_MODE" },
        { title: "object_recognition_mode(A)", value: "object_recognition_mode", meta: "-- <function>", snippet: "object_recognition_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_OBJECT_RECOGNITION_MODE" },
        { title: "color_recognition_mode(A)", value: "color_recognition_mode", meta: "-- <function>", snippet: "color_recognition_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COLOR_RECOGNITION_MODE" },
        { title: "tag_recognition_mode(A)", value: "tag_recognition_mode", meta: "-- <function>", snippet: "tag_recognition_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_TAG_RECOGNITION_MODE" },
        { title: "object_classification_mode(A)", value: "object_classification_mode", meta: "-- <function>", snippet: "object_classification_mode(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_OBJECT_CLASSIFICATION_MODE" },
        { title: "command_request_by_id(C, idVal)", value: "command_request_by_id", meta: "-- <function>", snippet: "command_request_by_id(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_BY_ID" },
        { title: "command_request_blocks_by_id(C, idVal)", value: "command_request_blocks_by_id", meta: "-- <function>", snippet: "command_request_blocks_by_id(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_BLOCKS_BY_ID" },
        { title: "command_request_arrows_by_id(C, idVal)", value: "command_request_arrows_by_id", meta: "-- <function>", snippet: "command_request_arrows_by_id(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_ARROWS_BY_ID" },
        { title: "command_request_algorthim(B, alg)", value: "command_request_algorthim", meta: "-- <function>", snippet: "command_request_algorthim(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_ALGORTHIM" },
        { title: "command_request_custom_text(B, text, x, y)", value: "command_request_custom_text", meta: "-- <function>", snippet: "command_request_custom_text(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_CUSTOM_TEXT" },
        { title: "command_request_clear_text(B)", value: "command_request_clear_text", meta: "-- <function>", snippet: "command_request_clear_text(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_CLEAR_TEXT" },
        { title: "command_request_photo(B)", value: "command_request_photo", meta: "-- <function>", snippet: "command_request_photo(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_PHOTO" },
        { title: "command_request_forget(B)", value: "command_request_forget", meta: "-- <function>", snippet: "command_request_forget(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_FORGET" },
        { title: "command_request_screenshot(B)", value: "command_request_screenshot", meta: "-- <function>", snippet: "command_request_screenshot(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_SCREENSHOT" },
        { title: "command_request_learn_once(B, id)", value: "command_request_learn_once", meta: "-- <function>", snippet: "command_request_learn_once(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_LEARN_ONCE" },
        { title: "command_request_custom_name(B, id, name)", value: "command_request_custom_name", meta: "-- <function>", snippet: "command_request_custom_name(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_CUSTOM_NAME" },
        { title: "command_request_save_model_to_SD_card(C, index)", value: "command_request_save_model_to_SD_card", meta: "-- <function>", snippet: "command_request_save_model_to_SD_card(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_SAVE_MODEL_TO_SD_CARD" },
        { title: "command_request_load_model_from_SD_card(C, index)", value: "command_request_load_model_from_SD_card", meta: "-- <function>", snippet: "command_request_load_model_from_SD_card(${1:})", description: "GROVE_HUSKYLENS_HUSKYLENSLIBRARY_COMMAND_REQUEST_LOAD_MODEL_FROM_SD_CARD" }
    ];

    // grove - lcd_i2c
    const LCD1602Constants = [
        { value: "__class__", meta: "LCD1602" },
        { value: "__name__", meta: "LCD1602" },
        { value: "__bases__", meta: "LCD1602" },
        { value: "__dict__", meta: "LCD1602" }
    ];
    tree.lcd_i2c = [
        { value: "LCD1602", meta: "lcd_i2c", description: "GROVE_LCD_I2C_LCD1602_CLASS", content: LCD1602Constants, kind: "class" },
        { value: "LCD1602()", title: "LCD1602()", snippet: "LCD1602()", meta: "constructor", returns: "LCD1602", description: "GROVE_LCD_I2C_LCD1602_CONSTRUCTOR", content: LCD1602Constants },
        { title: "__name__", value: "__name__", meta: "lcd_i2c", description: "GROVE_LCD_I2C_MODULE" }
    ];
    typeTree.LCD1602 = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_LCD_I2C_LCD1602___INIT__" },
        { title: "write_char(c)", value: "write_char", meta: "-- <function>", snippet: "write_char(${1:})", description: "GROVE_LCD_I2C_LCD1602_WRITE_CHAR" },
        { title: "writeTxt(t)", value: "writeTxt", meta: "-- <function>", snippet: "writeTxt(${1:})", description: "GROVE_LCD_I2C_LCD1602_WRITETXT" },
        { title: "cursor(s)", value: "cursor", meta: "-- <function>", snippet: "cursor(${1:})", description: "GROVE_LCD_I2C_LCD1602_CURSOR" },
        { title: "setCursor(x, y)", value: "setCursor", meta: "-- <function>", snippet: "setCursor(${1:})", description: "GROVE_LCD_I2C_LCD1602_SETCURSOR" },
        { title: "display(s)", value: "display", meta: "-- <function>", snippet: "display(${1:})", description: "GROVE_LCD_I2C_LCD1602_DISPLAY" },
        { title: "clear()", value: "clear", meta: "-- <function>", snippet: "clear()", description: "GROVE_LCD_I2C_LCD1602_CLEAR" },
        { title: "home()", value: "home", meta: "-- <function>", snippet: "home()", description: "GROVE_LCD_I2C_LCD1602_HOME" }
    ];

    // grove - morpion
    const MORPIONConstants = [
        { value: "__class__", meta: "MORPION" },
        { value: "__name__", meta: "MORPION" },
        { value: "__bases__", meta: "MORPION" },
        { value: "__dict__", meta: "MORPION" }
    ];
    tree.morpion = [
        { value: "MORPION", meta: "morpion", description: "GROVE_MORPION_MORPION_CLASS", content: MORPIONConstants, kind: "class" },
        { value: "MORPION()", title: "MORPION(s)", snippet: "MORPION(${1:})", meta: "constructor", returns: "MORPION", description: "GROVE_MORPION_MORPION_CONSTRUCTOR", content: MORPIONConstants },
        { title: "__name__", value: "__name__", meta: "morpion", description: "GROVE_MORPION_MODULE" }
    ];
    typeTree.MORPION = [
        { title: "__init__(s)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_MORPION_MORPION___INIT__" },
        { title: "setGrid()", value: "setGrid", meta: "-- <function>", snippet: "setGrid()", description: "GROVE_MORPION_MORPION_SETGRID" },
        { title: "setCursor(d=1)", value: "setCursor", meta: "-- <function>", snippet: "setCursor(${1:d=1})", description: "GROVE_MORPION_MORPION_SETCURSOR" },
        { title: "mvCursor()", value: "mvCursor", meta: "-- <function>", snippet: "mvCursor()", description: "GROVE_MORPION_MORPION_MVCURSOR" },
        { title: "addCross()", value: "addCross", meta: "-- <function>", snippet: "addCross()", description: "GROVE_MORPION_MORPION_ADDCROSS" },
        { title: "addCircle()", value: "addCircle", meta: "-- <function>", snippet: "addCircle()", description: "GROVE_MORPION_MORPION_ADDCIRCLE" },
        { title: "newGame()", value: "newGame", meta: "-- <function>", snippet: "newGame()", description: "GROVE_MORPION_MORPION_NEWGAME" },
        { title: "endGame()", value: "endGame", meta: "-- <function>", snippet: "endGame()", description: "GROVE_MORPION_MORPION_ENDGAME" },
        { title: "setTitle()", value: "setTitle", meta: "-- <function>", snippet: "setTitle()", description: "GROVE_MORPION_MORPION_SETTITLE" },
        { title: "setEnd()", value: "setEnd", meta: "-- <function>", snippet: "setEnd()", description: "GROVE_MORPION_MORPION_SETEND" }
    ];

    // grove - multichannel_gas
    const GASConstants = [
        { value: "__class__", meta: "GAS" },
        { value: "b1", meta: "-- <constant>", description: "GROVE_MULTICHANNEL_GAS_GAS_B1" },
        { value: "b2", meta: "-- <constant>", description: "GROVE_MULTICHANNEL_GAS_GAS_B2" },
        { value: "b3", meta: "-- <constant>", description: "GROVE_MULTICHANNEL_GAS_GAS_B3" },
        { value: "__name__", meta: "GAS" },
        { value: "__bases__", meta: "GAS" },
        { value: "__dict__", meta: "GAS" }
    ];
    tree.multichannel_gas = [
        { value: "GAS", meta: "multichannel_gas", description: "GROVE_MULTICHANNEL_GAS_GAS_CLASS", content: GASConstants, kind: "class" },
        { value: "GAS()", title: "GAS()", snippet: "GAS()", meta: "constructor", returns: "GAS", description: "GROVE_MULTICHANNEL_GAS_GAS_CONSTRUCTOR", content: GASConstants },
        { title: "__name__", value: "__name__", meta: "multichannel_gas", description: "GROVE_MULTICHANNEL_GAS_MODULE" }
    ];
    typeTree.GAS = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_MULTICHANNEL_GAS_GAS___INIT__" },
        { title: "cmd(cmd, n=2)", value: "cmd", meta: "-- <function>", snippet: "cmd(${1:})", description: "GROVE_MULTICHANNEL_GAS_GAS_CMD" },
        { title: "power_on()", value: "power_on", meta: "-- <function>", snippet: "power_on()", description: "GROVE_MULTICHANNEL_GAS_GAS_POWER_ON" },
        { title: "power_off()", value: "power_off", meta: "-- <function>", snippet: "power_off()", description: "GROVE_MULTICHANNEL_GAS_GAS_POWER_OFF" },
        { title: "get_gas(g)", value: "get_gas", meta: "-- <function>", snippet: "get_gas(${1:})", description: "GROVE_MULTICHANNEL_GAS_GAS_GET_GAS" },
        { title: "calibrate()", value: "calibrate", meta: "-- <function>", snippet: "calibrate()", description: "GROVE_MULTICHANNEL_GAS_GAS_CALIBRATE" }
    ];

    // grove - my9221
    const MY9221Constants = [
        { value: "__class__", meta: "MY9221" },
        { value: "__name__", meta: "MY9221" },
        { value: "__bases__", meta: "MY9221" },
        { value: "__dict__", meta: "MY9221" }
    ];
    tree.my9221 = [
        { value: "MY9221", meta: "my9221", description: "GROVE_MY9221_MY9221_CLASS", content: MY9221Constants, kind: "class" },
        { value: "MY9221()", title: "MY9221(di, dcki, reverse=False)", snippet: "MY9221(${1:})", meta: "constructor", returns: "MY9221", description: "GROVE_MY9221_MY9221_CONSTRUCTOR", content: MY9221Constants },
        { title: "__name__", value: "__name__", meta: "my9221", description: "GROVE_MY9221_MODULE" }
    ];
    typeTree.MY9221 = [
        { title: "__init__(di, dcki, reverse=False)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_MY9221_MY9221___INIT__" },
        { title: "_latch()", value: "_latch", meta: "-- <function>", snippet: "_latch()", description: "GROVE_MY9221_MY9221__LATCH" },
        { title: "_write16(data)", value: "_write16", meta: "-- <function>", snippet: "_write16(${1:})", description: "GROVE_MY9221_MY9221__WRITE16" },
        { title: "_end()", value: "_end", meta: "-- <function>", snippet: "_end()", description: "GROVE_MY9221_MY9221__END" },
        { title: "reverse(val=None)", value: "reverse", meta: "-- <function>", snippet: "reverse(${1:val=None})", description: "GROVE_MY9221_MY9221_REVERSE" },
        { title: "level(val, brightness=255)", value: "level", meta: "-- <function>", snippet: "level(${1:})", description: "GROVE_MY9221_MY9221_LEVEL" },
        { title: "bits(val, brightness=255)", value: "bits", meta: "-- <function>", snippet: "bits(${1:})", description: "GROVE_MY9221_MY9221_BITS" },
        { title: "bytes(buf)", value: "bytes", meta: "-- <function>", snippet: "bytes(${1:})", description: "GROVE_MY9221_MY9221_BYTES" }
    ];

    // grove - oled
    const OLEDConstants = [
        { value: "__class__", meta: "OLED" },
        { value: "__name__", meta: "OLED" },
        { value: "__bases__", meta: "OLED" },
        { value: "__dict__", meta: "OLED" }
    ];
    tree.oled = [
        { value: "OLED", meta: "oled", description: "GROVE_OLED_OLED_CLASS", content: OLEDConstants, kind: "class" },
        { value: "OLED()", title: "OLED()", snippet: "OLED()", meta: "constructor", returns: "OLED", description: "GROVE_OLED_OLED_CONSTRUCTOR", content: OLEDConstants },
        { title: "__name__", value: "__name__", meta: "oled", description: "GROVE_OLED_MODULE" }
    ];
    typeTree.OLED = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_OLED_OLED___INIT__" },
        { title: "set_pos(c=0, p=0)", value: "set_pos", meta: "-- <function>", snippet: "set_pos(${1:c=0})", description: "GROVE_OLED_OLED_SET_POS" },
        { title: "clear()", value: "clear", meta: "-- <function>", snippet: "clear()", description: "GROVE_OLED_OLED_CLEAR" },
        { title: "set_px(x, y, s=1, d=1)", value: "set_px", meta: "-- <function>", snippet: "set_px(${1:})", description: "GROVE_OLED_OLED_SET_PX" },
        { title: "addTxt(x, y, t, d=1)", value: "addTxt", meta: "-- <function>", snippet: "addTxt(${1:})", description: "GROVE_OLED_OLED_ADDTXT" },
        { title: "create_stamp(img)", value: "create_stamp", meta: "-- <function>", snippet: "create_stamp(${1:})", description: "GROVE_OLED_OLED_CREATE_STAMP" },
        { title: "draw_stamp(x, y, stp, s=1, d=1)", value: "draw_stamp", meta: "-- <function>", snippet: "draw_stamp(${1:})", description: "GROVE_OLED_OLED_DRAW_STAMP" }
    ];

    // grove - oled_mp
    const OLEDMConstants = [
        { value: "__class__", meta: "OLEDM" },
        { value: "__name__", meta: "OLEDM" },
        { value: "__bases__", meta: "OLEDM" },
        { value: "__dict__", meta: "OLEDM" }
    ];
    tree.oled_mp = [
        { value: "OLEDM", meta: "oled_mp", description: "GROVE_OLED_MP_OLEDM_CLASS", content: OLEDMConstants, kind: "class" },
        { value: "OLEDM()", title: "OLEDM()", snippet: "OLEDM()", meta: "constructor", returns: "OLEDM", description: "GROVE_OLED_MP_OLEDM_CONSTRUCTOR", content: OLEDMConstants },
        { title: "__name__", value: "__name__", meta: "oled_mp", description: "GROVE_OLED_MP_MODULE" }
    ];
    typeTree.OLEDM = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_OLED_MP_OLEDM___INIT__" },
        { title: "set_pos(c=0, p=0)", value: "set_pos", meta: "-- <function>", snippet: "set_pos(${1:c=0})", description: "GROVE_OLED_MP_OLEDM_SET_POS" },
        { title: "clear()", value: "clear", meta: "-- <function>", snippet: "clear()", description: "GROVE_OLED_MP_OLEDM_CLEAR" },
        { title: "set_px(x, y, s, d=1)", value: "set_px", meta: "-- <function>", snippet: "set_px(${1:})", description: "GROVE_OLED_MP_OLEDM_SET_PX" }
    ];

    // grove - pcf85063tp
    const RTC_HPConstants = [
        { value: "__class__", meta: "RTC_HP" },
        { value: "__name__", meta: "RTC_HP" },
        { value: "__bases__", meta: "RTC_HP" },
        { value: "__dict__", meta: "RTC_HP" }
    ];
    tree.pcf85063tp = [
        { value: "DAYS_OF_WEEK", meta: "-- <constant>", description: "GROVE_PCF85063TP_DAYS_OF_WEEK" },
        { value: "RTC_HP_I2C_ADDR", meta: "-- <constant>", description: "GROVE_PCF85063TP_RTC_HP_I2C_ADDR" },
        { value: "RTC_HP", meta: "pcf85063tp", description: "GROVE_PCF85063TP_RTC_HP_CLASS", content: RTC_HPConstants, kind: "class" },
        { value: "RTC_HP()", title: "RTC_HP(addr=RTC_HP_I2C_ADDR)", snippet: "RTC_HP(${1:addr=RTC_HP_I2C_ADDR})", meta: "constructor", returns: "RTC_HP", description: "GROVE_PCF85063TP_RTC_HP_CONSTRUCTOR", content: RTC_HPConstants },
        { title: "__name__", value: "__name__", meta: "pcf85063tp", description: "GROVE_PCF85063TP_MODULE" }
    ];
    typeTree.RTC_HP = [
        { title: "__init__(addr=RTC_HP_I2C_ADDR)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:addr=RTC_HP_I2C_ADDR})", description: "GROVE_PCF85063TP_RTC_HP___INIT__" },
        { title: "reset()", value: "reset", meta: "-- <function>", snippet: "reset()", description: "GROVE_PCF85063TP_RTC_HP_RESET" },
        { title: "fillByHMS(hour, min, sec)", value: "fillByHMS", meta: "-- <function>", snippet: "fillByHMS(${1:})", description: "GROVE_PCF85063TP_RTC_HP_FILLBYHMS" },
        { title: "fillByYMD(year, month, day)", value: "fillByYMD", meta: "-- <function>", snippet: "fillByYMD(${1:})", description: "GROVE_PCF85063TP_RTC_HP_FILLBYYMD" },
        { title: "fillDayOfWeek(dow)", value: "fillDayOfWeek", meta: "-- <function>", snippet: "fillDayOfWeek(${1:})", description: "GROVE_PCF85063TP_RTC_HP_FILLDAYOFWEEK" },
        { title: "startClock()", value: "startClock", meta: "-- <function>", snippet: "startClock()", description: "GROVE_PCF85063TP_RTC_HP_STARTCLOCK" },
        { title: "readTime()", value: "readTime", meta: "-- <function>", snippet: "readTime()", description: "GROVE_PCF85063TP_RTC_HP_READTIME" },
        { title: "_writeReg(reg, data)", value: "_writeReg", meta: "-- <function>", snippet: "_writeReg(${1:})", description: "GROVE_PCF85063TP_RTC_HP__WRITEREG" },
        { title: "_decToBcd(val)", value: "_decToBcd", meta: "-- <function>", snippet: "_decToBcd(${1:})", description: "GROVE_PCF85063TP_RTC_HP__DECTOBCD" },
        { title: "_bcdToDec(val)", value: "_bcdToDec", meta: "-- <function>", snippet: "_bcdToDec(${1:})", description: "GROVE_PCF85063TP_RTC_HP__BCDTODEC" }
    ];

    // grove - PiicoDev_Unified
    const I2CBaseConstants = [
        { value: "__class__", meta: "I2CBase" },
        { value: "__name__", meta: "I2CBase" },
        { value: "__bases__", meta: "I2CBase" },
        { value: "__dict__", meta: "I2CBase" }
    ];
    const I2CUnifiedMachineConstants = [
        { value: "__class__", meta: "I2CUnifiedMachine" },
        { value: "__name__", meta: "I2CUnifiedMachine" },
        { value: "__bases__", meta: "I2CUnifiedMachine" },
        { value: "__dict__", meta: "I2CUnifiedMachine" }
    ];
    const I2CUnifiedMicroBitConstants = [
        { value: "__class__", meta: "I2CUnifiedMicroBit" },
        { value: "__name__", meta: "I2CUnifiedMicroBit" },
        { value: "__bases__", meta: "I2CUnifiedMicroBit" },
        { value: "__dict__", meta: "I2CUnifiedMicroBit" }
    ];
    const I2CUnifiedLinuxConstants = [
        { value: "__class__", meta: "I2CUnifiedLinux" },
        { value: "__name__", meta: "I2CUnifiedLinux" },
        { value: "__bases__", meta: "I2CUnifiedLinux" },
        { value: "__dict__", meta: "I2CUnifiedLinux" }
    ];
    tree.PiicoDev_Unified = [
        { value: "_SYSNAME", meta: "-- <constant>", description: "GROVE_PIICODEV_UNIFIED__SYSNAME" },
        { value: "compat_ind", meta: "-- <constant>", description: "GROVE_PIICODEV_UNIFIED_COMPAT_IND" },
        { value: "i2c_err_str", meta: "-- <constant>", description: "GROVE_PIICODEV_UNIFIED_I2C_ERR_STR" },
        { value: "setupi2c_str", meta: "-- <constant>", description: "GROVE_PIICODEV_UNIFIED_SETUPI2C_STR" },
        { title: "create_unified_i2c(bus=None, freq=None, sda=None, scl=None, suppress_warnings=True)", value: "create_unified_i2c", meta: "-- <function>", snippet: "create_unified_i2c(${1:bus=None})", description: "GROVE_PIICODEV_UNIFIED_CREATE_UNIFIED_I2C" },
        { value: "I2CBase", meta: "PiicoDev_Unified", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_CLASS", content: I2CBaseConstants, kind: "class" },
        { value: "I2CBase()", title: "I2CBase(bus=None, freq=None, sda=None, scl=None)", snippet: "I2CBase(${1:bus=None})", meta: "constructor", returns: "I2CBase", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_CONSTRUCTOR", content: I2CBaseConstants },
        { value: "I2CUnifiedMachine", meta: "PiicoDev_Unified", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE_CLASS", content: I2CUnifiedMachineConstants, kind: "class" },
        { value: "I2CUnifiedMachine()", title: "I2CUnifiedMachine(bus=None, freq=None, sda=None, scl=None)", snippet: "I2CUnifiedMachine(${1:bus=None})", meta: "constructor", returns: "I2CUnifiedMachine", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE_CONSTRUCTOR", content: I2CUnifiedMachineConstants },
        { value: "I2CUnifiedMicroBit", meta: "PiicoDev_Unified", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_CLASS", content: I2CUnifiedMicroBitConstants, kind: "class" },
        { value: "I2CUnifiedMicroBit()", title: "I2CUnifiedMicroBit(freq=None)", snippet: "I2CUnifiedMicroBit(${1:freq=None})", meta: "constructor", returns: "I2CUnifiedMicroBit", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_CONSTRUCTOR", content: I2CUnifiedMicroBitConstants },
        { value: "I2CUnifiedLinux", meta: "PiicoDev_Unified", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_CLASS", content: I2CUnifiedLinuxConstants, kind: "class" },
        { value: "I2CUnifiedLinux()", title: "I2CUnifiedLinux(bus=None, suppress_warnings=True)", snippet: "I2CUnifiedLinux(${1:bus=None})", meta: "constructor", returns: "I2CUnifiedLinux", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_CONSTRUCTOR", content: I2CUnifiedLinuxConstants },
        { title: "__name__", value: "__name__", meta: "PiicoDev_Unified", description: "GROVE_PIICODEV_UNIFIED_MODULE" }
    ];
    typeTree.I2CBase = [
        { title: "writeto_mem(addr, memaddr, buf, addrsize=8)", value: "writeto_mem", meta: "-- <function>", snippet: "writeto_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_WRITETO_MEM" },
        { title: "readfrom_mem(addr, memaddr, nbytes, addrsize=8)", value: "readfrom_mem", meta: "-- <function>", snippet: "readfrom_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_READFROM_MEM" },
        { title: "write8(addr, buf, stop=True)", value: "write8", meta: "-- <function>", snippet: "write8(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_WRITE8" },
        { title: "read16(addr, nbytes, stop=True)", value: "read16", meta: "-- <function>", snippet: "read16(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CBASE_READ16" },
        { title: "__init__(bus=None, freq=None, sda=None, scl=None)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:bus=None})", description: "GROVE_PIICODEV_UNIFIED_I2CBASE___INIT__" }
    ];
    typeTree.I2CUnifiedMachine = [
        { title: "__init__(bus=None, freq=None, sda=None, scl=None)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:bus=None})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE___INIT__" },
        { title: "write8(addr, reg, data)", value: "write8", meta: "-- <function>", snippet: "write8(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE_WRITE8" },
        { title: "read16(addr, reg)", value: "read16", meta: "-- <function>", snippet: "read16(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE_READ16" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMACHINE_SCAN" }
    ];
    typeTree.I2CUnifiedMicroBit = [
        { title: "__init__(freq=None)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:freq=None})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT___INIT__" },
        { title: "writeto_mem(addr, memaddr, buf, addrsize=8)", value: "writeto_mem", meta: "-- <function>", snippet: "writeto_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_WRITETO_MEM" },
        { title: "readfrom_mem(addr, memaddr, nbytes, addrsize=8)", value: "readfrom_mem", meta: "-- <function>", snippet: "readfrom_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_READFROM_MEM" },
        { title: "write8(addr, reg, data)", value: "write8", meta: "-- <function>", snippet: "write8(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_WRITE8" },
        { title: "read16(addr, reg)", value: "read16", meta: "-- <function>", snippet: "read16(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_READ16" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDMICROBIT_SCAN" }
    ];
    typeTree.I2CUnifiedLinux = [
        { title: "__init__(bus=None, suppress_warnings=True)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:bus=None})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX___INIT__" },
        { title: "readfrom_mem(addr, memaddr, nbytes, addrsize=8)", value: "readfrom_mem", meta: "-- <function>", snippet: "readfrom_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_READFROM_MEM" },
        { title: "writeto_mem(addr, memaddr, buf, addrsize=8)", value: "writeto_mem", meta: "-- <function>", snippet: "writeto_mem(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_WRITETO_MEM" },
        { title: "smbus_i2c_write(address, reg, data_p, length, addrsize=8)", value: "smbus_i2c_write", meta: "-- <function>", snippet: "smbus_i2c_write(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_SMBUS_I2C_WRITE" },
        { title: "smbus_i2c_read(address, reg, data_p, length, addrsize=8)", value: "smbus_i2c_read", meta: "-- <function>", snippet: "smbus_i2c_read(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_SMBUS_I2C_READ" },
        { title: "write8(addr, reg, data)", value: "write8", meta: "-- <function>", snippet: "write8(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_WRITE8" },
        { title: "read16(addr, reg)", value: "read16", meta: "-- <function>", snippet: "read16(${1:})", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_READ16" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "GROVE_PIICODEV_UNIFIED_I2CUNIFIEDLINUX_SCAN" }
    ];

    // grove - rgb_led_matrix
    const GroveTwoRGBLedMatrixConstants = [
        { value: "__class__", meta: "GroveTwoRGBLedMatrix" },
        { value: "__name__", meta: "GroveTwoRGBLedMatrix" },
        { value: "__bases__", meta: "GroveTwoRGBLedMatrix" },
        { value: "__dict__", meta: "GroveTwoRGBLedMatrix" }
    ];
    tree.rgb_led_matrix = [
        { value: "I2C_CMD_CONTINUE_DATA", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_CONTINUE_DATA" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_VID", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_VID" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_PID", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_PID" },
        { value: "I2C_CMD_GET_DEV_ID", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_GET_DEV_ID" },
        { value: "I2C_CMD_DISP_BAR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_BAR" },
        { value: "I2C_CMD_DISP_EMOJI", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_EMOJI" },
        { value: "I2C_CMD_DISP_NUM", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_NUM" },
        { value: "I2C_CMD_DISP_STR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_STR" },
        { value: "I2C_CMD_DISP_CUSTOM", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_CUSTOM" },
        { value: "I2C_CMD_DISP_OFF", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_OFF" },
        { value: "I2C_CMD_DISP_ASCII", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_ASCII" },
        { value: "I2C_CMD_DISP_FLASH", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_FLASH" },
        { value: "I2C_CMD_DISP_COLOR_BAR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_BAR" },
        { value: "I2C_CMD_DISP_COLOR_WAVE", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_WAVE" },
        { value: "I2C_CMD_DISP_COLOR_CLOCKWISE", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_CLOCKWISE" },
        { value: "I2C_CMD_DISP_COLOR_ANIMATION", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_ANIMATION" },
        { value: "I2C_CMD_DISP_COLOR_BLOCK", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_BLOCK" },
        { value: "I2C_CMD_STORE_FLASH", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_STORE_FLASH" },
        { value: "I2C_CMD_DELETE_FLASH", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DELETE_FLASH" },
        { value: "I2C_CMD_LED_ON", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_LED_ON" },
        { value: "I2C_CMD_LED_OFF", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_LED_OFF" },
        { value: "I2C_CMD_AUTO_SLEEP_ON", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_AUTO_SLEEP_ON" },
        { value: "I2C_CMD_AUTO_SLEEP_OFF", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_AUTO_SLEEP_OFF" },
        { value: "I2C_CMD_DISP_ROTATE", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_ROTATE" },
        { value: "I2C_CMD_DISP_OFFSET", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_DISP_OFFSET" },
        { value: "I2C_CMD_SET_ADDR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_SET_ADDR" },
        { value: "I2C_CMD_RST_ADDR", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_RST_ADDR" },
        { value: "I2C_CMD_TEST_TX_RX_ON", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_TEST_TX_RX_ON" },
        { value: "I2C_CMD_TEST_TX_RX_OFF", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_TEST_TX_RX_OFF" },
        { value: "I2C_CMD_TEST_GET_VER", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_TEST_GET_VER" },
        { value: "I2C_CMD_GET_DEVICE_UID", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_I2C_CMD_GET_DEVICE_UID" },
        { value: "orientation_type_t", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_ORIENTATION_TYPE_T" },
        { value: "COULEURS", meta: "-- <constant>", description: "GROVE_RGB_LED_MATRIX_COULEURS" },
        { value: "GroveTwoRGBLedMatrix", meta: "rgb_led_matrix", description: "GROVE_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_CLASS", content: GroveTwoRGBLedMatrixConstants, kind: "class" },
        { value: "GroveTwoRGBLedMatrix()", title: "GroveTwoRGBLedMatrix(base=GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, screenNumber=1)", snippet: "GroveTwoRGBLedMatrix(${1:base=GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR})", meta: "constructor", returns: "GroveTwoRGBLedMatrix", description: "GROVE_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_CONSTRUCTOR", content: GroveTwoRGBLedMatrixConstants },
        { title: "__name__", value: "__name__", meta: "rgb_led_matrix", description: "GROVE_RGB_LED_MATRIX_MODULE" }
    ];
    typeTree.GroveTwoRGBLedMatrix = [
        { title: "__init__(base=GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, screenNumber=1)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:base=GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR})", description: "GROVE_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX___INIT__" },
        { title: "displayFrames(buffer, duration_time, forever_flag, frames_number)", value: "displayFrames", meta: "-- <function>", snippet: "displayFrames(${1:})", description: "GROVE_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYFRAMES" },
        { title: "stopDisplay()", value: "stopDisplay", meta: "-- <function>", snippet: "stopDisplay()", description: "GROVE_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_STOPDISPLAY" }
    ];

    // grove - scd30
    const SCD30Constants = [
        { value: "__class__", meta: "SCD30" },
        { value: "__name__", meta: "SCD30" },
        { value: "__bases__", meta: "SCD30" },
        { value: "__dict__", meta: "SCD30" }
    ];
    tree.scd30 = [
        { value: "SCD30", meta: "scd30", description: "GROVE_SCD30_SCD30_CLASS", content: SCD30Constants, kind: "class" },
        { value: "SCD30()", title: "SCD30(addr=97)", snippet: "SCD30(${1:addr=97})", meta: "constructor", returns: "SCD30", description: "GROVE_SCD30_SCD30_CONSTRUCTOR", content: SCD30Constants },
        { title: "__name__", value: "__name__", meta: "scd30", description: "GROVE_SCD30_MODULE" }
    ];
    typeTree.SCD30 = [
        { title: "__init__(addr=97)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:addr=97})", description: "GROVE_SCD30_SCD30___INIT__" },
        { title: "sendCommand(command, argument=None)", value: "sendCommand", meta: "-- <function>", snippet: "sendCommand(${1:})", description: "GROVE_SCD30_SCD30_SENDCOMMAND" },
        { title: "read_n_bytes(n_bytes)", value: "read_n_bytes", meta: "-- <function>", snippet: "read_n_bytes(${1:})", description: "GROVE_SCD30_SCD30_READ_N_BYTES" },
        { title: "parseData(data)", value: "parseData", meta: "-- <function>", snippet: "parseData(${1:})", description: "GROVE_SCD30_SCD30_PARSEDATA" },
        { title: "readMeasurement()", value: "readMeasurement", meta: "-- <function>", snippet: "readMeasurement()", description: "GROVE_SCD30_SCD30_READMEASUREMENT" },
        { title: "setForcedRecalibration(co2ppm)", value: "setForcedRecalibration", meta: "-- <function>", snippet: "setForcedRecalibration(${1:})", description: "GROVE_SCD30_SCD30_SETFORCEDRECALIBRATION" },
        { title: "calculateCrc(data, len)", value: "calculateCrc", meta: "-- <function>", snippet: "calculateCrc(${1:})", description: "GROVE_SCD30_SCD30_CALCULATECRC" }
    ];

    // grove - sgp30
    const SGP30Constants = [
        { value: "__class__", meta: "SGP30" },
        { value: "__name__", meta: "SGP30" },
        { value: "__bases__", meta: "SGP30" },
        { value: "__dict__", meta: "SGP30" }
    ];
    tree.sgp30 = [
        { value: "SGP30", meta: "sgp30", description: "GROVE_SGP30_SGP30_CLASS", content: SGP30Constants, kind: "class" },
        { value: "SGP30()", title: "SGP30()", snippet: "SGP30()", meta: "constructor", returns: "SGP30", description: "GROVE_SGP30_SGP30_CONSTRUCTOR", content: SGP30Constants },
        { title: "__name__", value: "__name__", meta: "sgp30", description: "GROVE_SGP30_MODULE" }
    ];
    typeTree.SGP30 = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_SGP30_SGP30___INIT__" },
        { title: "TVOC()", value: "TVOC", meta: "-- <function>", snippet: "TVOC()", description: "GROVE_SGP30_SGP30_TVOC" },
        { title: "baseline_TVOC()", value: "baseline_TVOC", meta: "-- <function>", snippet: "baseline_TVOC()", description: "GROVE_SGP30_SGP30_BASELINE_TVOC" },
        { title: "eCO2()", value: "eCO2", meta: "-- <function>", snippet: "eCO2()", description: "GROVE_SGP30_SGP30_ECO2" },
        { title: "baseline_eCO2()", value: "baseline_eCO2", meta: "-- <function>", snippet: "baseline_eCO2()", description: "GROVE_SGP30_SGP30_BASELINE_ECO2" },
        { title: "iaq_init()", value: "iaq_init", meta: "-- <function>", snippet: "iaq_init()", description: "GROVE_SGP30_SGP30_IAQ_INIT" },
        { title: "iaq_measure()", value: "iaq_measure", meta: "-- <function>", snippet: "iaq_measure()", description: "GROVE_SGP30_SGP30_IAQ_MEASURE" },
        { title: "get_iaq_baseline()", value: "get_iaq_baseline", meta: "-- <function>", snippet: "get_iaq_baseline()", description: "GROVE_SGP30_SGP30_GET_IAQ_BASELINE" },
        { title: "set_iaq_baseline(eCO2, TVOC)", value: "set_iaq_baseline", meta: "-- <function>", snippet: "set_iaq_baseline(${1:})", description: "GROVE_SGP30_SGP30_SET_IAQ_BASELINE" },
        { title: "set_iaq_humidity(PM3)", value: "set_iaq_humidity", meta: "-- <function>", snippet: "set_iaq_humidity(${1:})", description: "GROVE_SGP30_SGP30_SET_IAQ_HUMIDITY" },
        { title: "run(profile)", value: "run", meta: "-- <function>", snippet: "run(${1:})", description: "GROVE_SGP30_SGP30_RUN" },
        { title: "read(cmd, d, rs)", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "GROVE_SGP30_SGP30_READ" },
        { title: "g_crc(data)", value: "g_crc", meta: "-- <function>", snippet: "g_crc(${1:})", description: "GROVE_SGP30_SGP30_G_CRC" }
    ];

    // grove - sht31
    const SHT31Constants_sht31 = [
        { value: "__class__", meta: "SHT31" },
        { value: "_map_cs_r", meta: "-- <constant>", description: "GROVE_SHT31_SHT31__MAP_CS_R" },
        { value: "__name__", meta: "SHT31" },
        { value: "__bases__", meta: "SHT31" },
        { value: "__dict__", meta: "SHT31" }
    ];
    tree.sht31 = [
        { value: "R_HIGH", meta: "-- <constant>", description: "GROVE_SHT31_R_HIGH" },
        { value: "R_MEDIUM", meta: "-- <constant>", description: "GROVE_SHT31_R_MEDIUM" },
        { value: "R_LOW", meta: "-- <constant>", description: "GROVE_SHT31_R_LOW" },
        { value: "SHT31", meta: "sht31", description: "GROVE_SHT31_SHT31_CLASS", content: SHT31Constants_sht31, kind: "class" },
        { value: "SHT31()", title: "SHT31(addr=68)", snippet: "SHT31(${1:addr=68})", meta: "constructor", returns: "SHT31@sht31", description: "GROVE_SHT31_SHT31_CONSTRUCTOR", content: SHT31Constants_sht31 },
        { title: "__name__", value: "__name__", meta: "sht31", description: "GROVE_SHT31_MODULE" }
    ];
    typeTree["SHT31@sht31"] = [
        { title: "__init__(addr=68)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:addr=68})", description: "GROVE_SHT31_SHT31___INIT__" },
        { title: "_send(buf)", value: "_send", meta: "-- <function>", snippet: "_send(${1:})", description: "GROVE_SHT31_SHT31__SEND" },
        { title: "_recv(count)", value: "_recv", meta: "-- <function>", snippet: "_recv(${1:})", description: "GROVE_SHT31_SHT31__RECV" },
        { title: "_raw_temp_humi(r=R_HIGH, cs=True)", value: "_raw_temp_humi", meta: "-- <function>", snippet: "_raw_temp_humi(${1:r=R_HIGH})", description: "GROVE_SHT31_SHT31__RAW_TEMP_HUMI" },
        { title: "get_temp_humi(data='t', resolution=R_HIGH, clk_stretch=True, celsius=True)", value: "get_temp_humi", meta: "-- <function>", snippet: "get_temp_humi(${1:data='t'})", description: "GROVE_SHT31_SHT31_GET_TEMP_HUMI" }
    ];

    // grove - sht3x
    const SHT3XConstants = [
        { value: "__class__", meta: "SHT3X" },
        { value: "__name__", meta: "SHT3X" },
        { value: "__bases__", meta: "SHT3X" },
        { value: "__dict__", meta: "SHT3X" }
    ];
    const SHT35Constants = [
        { value: "__class__", meta: "SHT35" },
        { value: "__name__", meta: "SHT35" },
        { value: "__bases__", meta: "SHT35" },
        { value: "__dict__", meta: "SHT35" }
    ];
    const SHT31Constants_sht3x = [
        { value: "__class__", meta: "SHT31" },
        { value: "__name__", meta: "SHT31" },
        { value: "__bases__", meta: "SHT31" },
        { value: "__dict__", meta: "SHT31" }
    ];
    tree.sht3x = [
        { value: "SHT3X", meta: "sht3x", description: "GROVE_SHT3X_SHT3X_CLASS", content: SHT3XConstants, kind: "class" },
        { value: "SHT3X()", title: "SHT3X(address)", snippet: "SHT3X(${1:})", meta: "constructor", returns: "SHT3X", description: "GROVE_SHT3X_SHT3X_CONSTRUCTOR", content: SHT3XConstants },
        { value: "SHT31", meta: "sht3x", description: "GROVE_SHT3X_SHT31_CLASS", content: SHT31Constants_sht3x, kind: "class", extends: "SHT3X" },
        { value: "SHT31()", title: "SHT31(bus_obj)", snippet: "SHT31(${1:})", meta: "constructor", returns: "SHT31@sht3x", extends: "SHT3X", description: "GROVE_SHT3X_SHT31_CONSTRUCTOR", content: SHT31Constants_sht3x },
        { value: "SHT35", meta: "sht3x", description: "GROVE_SHT3X_SHT35_CLASS", content: SHT35Constants, kind: "class", extends: "SHT3X" },
        { value: "SHT35()", title: "SHT35()", snippet: "SHT35()", meta: "constructor", returns: "SHT35", extends: "SHT3X", description: "GROVE_SHT3X_SHT35_CONSTRUCTOR", content: SHT35Constants },
        { title: "__name__", value: "__name__", meta: "sht3x", description: "GROVE_SHT3X_MODULE" }
    ];
    typeTree.SHT3X = [
        { title: "__init__(address)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_SHT3X_SHT3X___INIT__" },
        { title: "get_temperature_in_celsius(data)", value: "get_temperature_in_celsius", meta: "-- <function>", snippet: "get_temperature_in_celsius(${1:})", description: "GROVE_SHT3X_SHT3X_GET_TEMPERATURE_IN_CELSIUS" },
        { title: "get_temperature_in_fahrenheit(data)", value: "get_temperature_in_fahrenheit", meta: "-- <function>", snippet: "get_temperature_in_fahrenheit(${1:})", description: "GROVE_SHT3X_SHT3X_GET_TEMPERATURE_IN_FAHRENHEIT" },
        { title: "get_relative_humidity(data)", value: "get_relative_humidity", meta: "-- <function>", snippet: "get_relative_humidity(${1:})", description: "GROVE_SHT3X_SHT3X_GET_RELATIVE_HUMIDITY" },
        { title: "get_measurement(data_type)", value: "get_measurement", meta: "-- <function>", snippet: "get_measurement(${1:})", description: "GROVE_SHT3X_SHT3X_GET_MEASUREMENT" }
    ];
    typeTree['SHT31@sht3x'] = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_SHT3X_SHT35___INIT__" }
    ];
    typeTree.SHT35 = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_SHT3X_SHT35___INIT__" }
    ];

    // grove - si1145
    const SI1145Constants = [
        { value: "__class__", meta: "SI1145" },
        { value: "__name__", meta: "SI1145" },
        { value: "__bases__", meta: "SI1145" },
        { value: "__dict__", meta: "SI1145" }
    ];
    tree.si1145 = [
        { value: "SI1145", meta: "si1145", description: "GROVE_SI1145_SI1145_CLASS", content: SI1145Constants, kind: "class" },
        { value: "SI1145()", title: "SI1145()", snippet: "SI1145()", meta: "constructor", returns: "SI1145", description: "GROVE_SI1145_SI1145_CONSTRUCTOR", content: SI1145Constants },
        { title: "__name__", value: "__name__", meta: "si1145", description: "GROVE_SI1145_MODULE" }
    ];
    typeTree.SI1145 = [
        { title: "__init__()", value: "__init__", meta: "-- <function>", snippet: "__init__()", description: "GROVE_SI1145_SI1145___INIT__" },
        { title: "_reset()", value: "_reset", meta: "-- <function>", snippet: "_reset()", description: "GROVE_SI1145_SI1145__RESET" },
        { title: "writeParam(p, v)", value: "writeParam", meta: "-- <function>", snippet: "writeParam(${1:})", description: "GROVE_SI1145_SI1145_WRITEPARAM" },
        { title: "_load_calibration()", value: "_load_calibration", meta: "-- <function>", snippet: "_load_calibration()", description: "GROVE_SI1145_SI1145__LOAD_CALIBRATION" },
        { title: "read16(reg, l=True)", value: "read16", meta: "-- <function>", snippet: "read16(${1:})", description: "GROVE_SI1145_SI1145_READ16" },
        { title: "readUV()", value: "readUV", meta: "-- <function>", snippet: "readUV()", description: "GROVE_SI1145_SI1145_READUV" },
        { title: "readVisible()", value: "readVisible", meta: "-- <function>", snippet: "readVisible()", description: "GROVE_SI1145_SI1145_READVISIBLE" },
        { title: "readIR()", value: "readIR", meta: "-- <function>", snippet: "readIR()", description: "GROVE_SI1145_SI1145_READIR" },
        { title: "readProx()", value: "readProx", meta: "-- <function>", snippet: "readProx()", description: "GROVE_SI1145_SI1145_READPROX" }
    ];

    // grove - th02
    const TH02Constants = [
        { value: "__class__", meta: "TH02" },
        { value: "__name__", meta: "TH02" },
        { value: "__bases__", meta: "TH02" },
        { value: "__dict__", meta: "TH02" }
    ];
    tree.th02 = [
        { value: "TH02", meta: "th02", description: "GROVE_TH02_TH02_CLASS", content: TH02Constants, kind: "class" },
        { value: "TH02()", title: "TH02()", snippet: "TH02()", meta: "constructor", returns: "TH02", description: "GROVE_TH02_TH02_CONSTRUCTOR", content: TH02Constants },
        { title: "__name__", value: "__name__", meta: "th02", description: "GROVE_TH02_MODULE" }
    ];
    typeTree.TH02 = [
        { title: "ReadTemperature()", value: "ReadTemperature", meta: "-- <function>", snippet: "ReadTemperature()", description: "GROVE_TH02_TH02_READTEMPERATURE" },
        { title: "ReadHumidity()", value: "ReadHumidity", meta: "-- <function>", snippet: "ReadHumidity()", description: "GROVE_TH02_TH02_READHUMIDITY" },
        { title: "isAvailable()", value: "isAvailable", meta: "-- <function>", snippet: "isAvailable()", description: "GROVE_TH02_TH02_ISAVAILABLE" },
        { title: "writeCmd(u8Cmd)", value: "writeCmd", meta: "-- <function>", snippet: "writeCmd(${1:})", description: "GROVE_TH02_TH02_WRITECMD" },
        { title: "readReg8(u8Reg)", value: "readReg8", meta: "-- <function>", snippet: "readReg8(${1:})", description: "GROVE_TH02_TH02_READREG8" },
        { title: "writeReg(u8Reg, u8Data)", value: "writeReg", meta: "-- <function>", snippet: "writeReg(${1:})", description: "GROVE_TH02_TH02_WRITEREG" },
        { title: "readReg16()", value: "readReg16", meta: "-- <function>", snippet: "readReg16()", description: "GROVE_TH02_TH02_READREG16" }
    ];

    // grove - tm1637
    const TM1637Constants = [
        { value: "__class__", meta: "TM1637" },
        { value: "__name__", meta: "TM1637" },
        { value: "__bases__", meta: "TM1637" },
        { value: "__dict__", meta: "TM1637" }
    ];
    tree.tm1637 = [
        { value: "_SEG", meta: "-- <constant>", description: "GROVE_TM1637__SEG" },
        { value: "TM1637", meta: "tm1637", description: "GROVE_TM1637_TM1637_CLASS", content: TM1637Constants, kind: "class" },
        { value: "TM1637()", title: "TM1637(clk, dio, bright=7)", snippet: "TM1637(${1:})", meta: "constructor", returns: "TM1637", description: "GROVE_TM1637_TM1637_CONSTRUCTOR", content: TM1637Constants },
        { title: "__name__", value: "__name__", meta: "tm1637", description: "GROVE_TM1637_MODULE" }
    ];
    typeTree.TM1637 = [
        { title: "__init__(clk, dio, bright=7)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:})", description: "GROVE_TM1637_TM1637___INIT__" },
        { title: "_write_digital(pin, state)", value: "_write_digital", meta: "-- <function>", snippet: "_write_digital(${1:})", description: "GROVE_TM1637_TM1637__WRITE_DIGITAL" },
        { title: "_start()", value: "_start", meta: "-- <function>", snippet: "_start()", description: "GROVE_TM1637_TM1637__START" },
        { title: "_stop()", value: "_stop", meta: "-- <function>", snippet: "_stop()", description: "GROVE_TM1637_TM1637__STOP" },
        { title: "_write_data_cmd()", value: "_write_data_cmd", meta: "-- <function>", snippet: "_write_data_cmd()", description: "GROVE_TM1637_TM1637__WRITE_DATA_CMD" },
        { title: "_write_dsp_ctrl()", value: "_write_dsp_ctrl", meta: "-- <function>", snippet: "_write_dsp_ctrl()", description: "GROVE_TM1637_TM1637__WRITE_DSP_CTRL" },
        { title: "_write_byte(b)", value: "_write_byte", meta: "-- <function>", snippet: "_write_byte(${1:})", description: "GROVE_TM1637_TM1637__WRITE_BYTE" },
        { title: "brightness(val=None)", value: "brightness", meta: "-- <function>", snippet: "brightness(${1:val=None})", description: "GROVE_TM1637_TM1637_BRIGHTNESS" },
        { title: "write(segs, pos=0)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "GROVE_TM1637_TM1637_WRITE" },
        { title: "encode_str(str)", value: "encode_str", meta: "-- <function>", snippet: "encode_str(${1:})", description: "GROVE_TM1637_TM1637_ENCODE_STR" },
        { title: "encode_char(char)", value: "encode_char", meta: "-- <function>", snippet: "encode_char(${1:})", description: "GROVE_TM1637_TM1637_ENCODE_CHAR" },
        { title: "number(num)", value: "number", meta: "-- <function>", snippet: "number(${1:})", description: "GROVE_TM1637_TM1637_NUMBER" },
        { title: "numbers(num1, num2, colon=True)", value: "numbers", meta: "-- <function>", snippet: "numbers(${1:})", description: "GROVE_TM1637_TM1637_NUMBERS" },
        { title: "temperature(num)", value: "temperature", meta: "-- <function>", snippet: "temperature(${1:})", description: "GROVE_TM1637_TM1637_TEMPERATURE" },
        { title: "show(str, colon=False)", value: "show", meta: "-- <function>", snippet: "show(${1:})", description: "GROVE_TM1637_TM1637_SHOW" },
        { title: "clock(time, colon=True)", value: "clock", meta: "-- <function>", snippet: "clock(${1:})", description: "GROVE_TM1637_TM1637_CLOCK" }
    ];

    // grove - veml6040
    const PiicoDev_VEML6040Constants = [
        { value: "__class__", meta: "PiicoDev_VEML6040" },
        { value: "__name__", meta: "PiicoDev_VEML6040" },
        { value: "__bases__", meta: "PiicoDev_VEML6040" },
        { value: "__dict__", meta: "PiicoDev_VEML6040" }
    ];
    tree.veml6040 = [
        { value: "_veml6040Address", meta: "-- <constant>", description: "GROVE_VEML6040__VEML6040ADDRESS" },
        { value: "_CONF", meta: "-- <constant>", description: "GROVE_VEML6040__CONF" },
        { value: "_REG_RED", meta: "-- <constant>", description: "GROVE_VEML6040__REG_RED" },
        { value: "_REG_GREEN", meta: "-- <constant>", description: "GROVE_VEML6040__REG_GREEN" },
        { value: "_REG_BLUE", meta: "-- <constant>", description: "GROVE_VEML6040__REG_BLUE" },
        { value: "_REG_WHITE", meta: "-- <constant>", description: "GROVE_VEML6040__REG_WHITE" },
        { value: "_DEFAULT_SETTINGS", meta: "-- <constant>", description: "GROVE_VEML6040__DEFAULT_SETTINGS" },
        { value: "_SHUTDOWN", meta: "-- <constant>", description: "GROVE_VEML6040__SHUTDOWN" },
        { value: "_INTEGRATION_TIME", meta: "-- <constant>", description: "GROVE_VEML6040__INTEGRATION_TIME" },
        { value: "_G_SENSITIVITY", meta: "-- <constant>", description: "GROVE_VEML6040__G_SENSITIVITY" },
        { value: "_NaN", meta: "-- <constant>", description: "GROVE_VEML6040__NAN" },
        { title: "rgb2hsv(r, g, b)", value: "rgb2hsv", meta: "-- <function>", snippet: "rgb2hsv(${1:})", description: "GROVE_VEML6040_RGB2HSV" },
        { value: "PiicoDev_VEML6040", meta: "veml6040", description: "GROVE_VEML6040_PIICODEV_VEML6040_CLASS", content: PiicoDev_VEML6040Constants, kind: "class" },
        { value: "PiicoDev_VEML6040()", title: "PiicoDev_VEML6040(bus=None, freq=None, sda=None, scl=None, addr=_veml6040Address)", snippet: "PiicoDev_VEML6040(${1:bus=None})", meta: "constructor", returns: "PiicoDev_VEML6040", description: "GROVE_VEML6040_PIICODEV_VEML6040_CONSTRUCTOR", content: PiicoDev_VEML6040Constants },
        { title: "__name__", value: "__name__", meta: "veml6040", description: "GROVE_VEML6040_MODULE" }
    ];
    typeTree.PiicoDev_VEML6040 = [
        { title: "__init__(bus=None, freq=None, sda=None, scl=None, addr=_veml6040Address)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:bus=None})", description: "GROVE_VEML6040_PIICODEV_VEML6040___INIT__" },
        { title: "classifyHue(hues={'red': 0, 'yellow': 60, 'green': 120, 'cyan': 180, 'blue': 240, 'magenta': 300}, min_brightness=0)", value: "classifyHue", meta: "-- <function>", snippet: "classifyHue(${1:hues={'red': 0, 'yellow': 60, 'green': 120, 'cyan': 180, 'blue': 240, 'magenta': 300}})", description: "GROVE_VEML6040_PIICODEV_VEML6040_CLASSIFYHUE" },
        { title: "readRGB()", value: "readRGB", meta: "-- <function>", snippet: "readRGB()", description: "GROVE_VEML6040_PIICODEV_VEML6040_READRGB" },
        { title: "readHSV()", value: "readHSV", meta: "-- <function>", snippet: "readHSV()", description: "GROVE_VEML6040_PIICODEV_VEML6040_READHSV" }
    ];

    // grove - vl53l0x
    const VL53L0XConstants = [
        { value: "__class__", meta: "VL53L0X" },
        { value: "__name__", meta: "VL53L0X" },
        { value: "__bases__", meta: "VL53L0X" },
        { value: "__dict__", meta: "VL53L0X" }
    ];
    tree.vl53l0x = [
        { value: "_VL53L0X_IIC_ADDR", meta: "-- <constant>", description: "GROVE_VL53L0X__VL53L0X_IIC_ADDR" },
        { value: "_SYSRANGE_START", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSRANGE_START" },
        { value: "_SYSTEM_THRESH_HIGH", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_THRESH_HIGH" },
        { value: "_SYSTEM_THRESH_LOW", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_THRESH_LOW" },
        { value: "_SYSTEM_SEQUENCE_CONFIG", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_SEQUENCE_CONFIG" },
        { value: "_SYSTEM_RANGE_CONFIG", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_RANGE_CONFIG" },
        { value: "_SYSTEM_INTERMEASUREMENT_PERIOD", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_INTERMEASUREMENT_PERIOD" },
        { value: "_SYSTEM_INTERRUPT_CONFIG_GPIO", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_INTERRUPT_CONFIG_GPIO" },
        { value: "_GPIO_HV_MUX_ACTIVE_HIGH", meta: "-- <constant>", description: "GROVE_VL53L0X__GPIO_HV_MUX_ACTIVE_HIGH" },
        { value: "_SYSTEM_INTERRUPT_CLEAR", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_INTERRUPT_CLEAR" },
        { value: "_RESULT_INTERRUPT_STATUS", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_INTERRUPT_STATUS" },
        { value: "_RESULT_RANGE_STATUS", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_RANGE_STATUS" },
        { value: "_RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN" },
        { value: "_RESULT_CORE_RANGING_TOTAL_EVENTS_RTN", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_CORE_RANGING_TOTAL_EVENTS_RTN" },
        { value: "_RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF" },
        { value: "_RESULT_CORE_RANGING_TOTAL_EVENTS_REF", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_CORE_RANGING_TOTAL_EVENTS_REF" },
        { value: "_RESULT_PEAK_SIGNAL_RATE_REF", meta: "-- <constant>", description: "GROVE_VL53L0X__RESULT_PEAK_SIGNAL_RATE_REF" },
        { value: "_ALGO_PART_TO_PART_RANGE_OFFSET_MM", meta: "-- <constant>", description: "GROVE_VL53L0X__ALGO_PART_TO_PART_RANGE_OFFSET_MM" },
        { value: "_I2C_SLAVE_DEVICE_ADDRESS", meta: "-- <constant>", description: "GROVE_VL53L0X__I2C_SLAVE_DEVICE_ADDRESS" },
        { value: "_MSRC_CONFIG_CONTROL", meta: "-- <constant>", description: "GROVE_VL53L0X__MSRC_CONFIG_CONTROL" },
        { value: "_PRE_RANGE_CONFIG_MIN_SNR", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_MIN_SNR" },
        { value: "_PRE_RANGE_CONFIG_VALID_PHASE_LOW", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_VALID_PHASE_LOW" },
        { value: "_PRE_RANGE_CONFIG_VALID_PHASE_HIGH", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_VALID_PHASE_HIGH" },
        { value: "_PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT" },
        { value: "_FINAL_RANGE_CONFIG_MIN_SNR", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_MIN_SNR" },
        { value: "_FINAL_RANGE_CONFIG_VALID_PHASE_LOW", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_VALID_PHASE_LOW" },
        { value: "_FINAL_RANGE_CONFIG_VALID_PHASE_HIGH", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_VALID_PHASE_HIGH" },
        { value: "_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT" },
        { value: "_PRE_RANGE_CONFIG_SIGMA_THRESH_HI", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_SIGMA_THRESH_HI" },
        { value: "_PRE_RANGE_CONFIG_SIGMA_THRESH_LO", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_SIGMA_THRESH_LO" },
        { value: "_PRE_RANGE_CONFIG_VCSEL_PERIOD", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_VCSEL_PERIOD" },
        { value: "_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI" },
        { value: "_PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO", meta: "-- <constant>", description: "GROVE_VL53L0X__PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO" },
        { value: "_SYSTEM_HISTOGRAM_BIN", meta: "-- <constant>", description: "GROVE_VL53L0X__SYSTEM_HISTOGRAM_BIN" },
        { value: "_HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT", meta: "-- <constant>", description: "GROVE_VL53L0X__HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT" },
        { value: "_HISTOGRAM_CONFIG_READOUT_CTRL", meta: "-- <constant>", description: "GROVE_VL53L0X__HISTOGRAM_CONFIG_READOUT_CTRL" },
        { value: "_FINAL_RANGE_CONFIG_VCSEL_PERIOD", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_VCSEL_PERIOD" },
        { value: "_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI" },
        { value: "_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO", meta: "-- <constant>", description: "GROVE_VL53L0X__FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO" },
        { value: "_CROSSTALK_COMPENSATION_PEAK_RATE_MCPS", meta: "-- <constant>", description: "GROVE_VL53L0X__CROSSTALK_COMPENSATION_PEAK_RATE_MCPS" },
        { value: "_MSRC_CONFIG_TIMEOUT_MACROP", meta: "-- <constant>", description: "GROVE_VL53L0X__MSRC_CONFIG_TIMEOUT_MACROP" },
        { value: "_SOFT_RESET_GO2_SOFT_RESET_N", meta: "-- <constant>", description: "GROVE_VL53L0X__SOFT_RESET_GO2_SOFT_RESET_N" },
        { value: "_IDENTIFICATION_MODEL_ID", meta: "-- <constant>", description: "GROVE_VL53L0X__IDENTIFICATION_MODEL_ID" },
        { value: "_IDENTIFICATION_REVISION_ID", meta: "-- <constant>", description: "GROVE_VL53L0X__IDENTIFICATION_REVISION_ID" },
        { value: "_OSC_CALIBRATE_VAL", meta: "-- <constant>", description: "GROVE_VL53L0X__OSC_CALIBRATE_VAL" },
        { value: "_GLOBAL_CONFIG_VCSEL_WIDTH", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_VCSEL_WIDTH" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_0", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_0" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_1", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_1" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_2", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_2" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_3", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_3" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_4", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_4" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_5", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_5" },
        { value: "_GLOBAL_CONFIG_REF_EN_START_SELECT", meta: "-- <constant>", description: "GROVE_VL53L0X__GLOBAL_CONFIG_REF_EN_START_SELECT" },
        { value: "_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD", meta: "-- <constant>", description: "GROVE_VL53L0X__DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD" },
        { value: "_DYNAMIC_SPAD_REF_EN_START_OFFSET", meta: "-- <constant>", description: "GROVE_VL53L0X__DYNAMIC_SPAD_REF_EN_START_OFFSET" },
        { value: "_POWER_MANAGEMENT_GO1_POWER_FORCE", meta: "-- <constant>", description: "GROVE_VL53L0X__POWER_MANAGEMENT_GO1_POWER_FORCE" },
        { value: "_VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV", meta: "-- <constant>", description: "GROVE_VL53L0X__VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV" },
        { value: "_ALGO_PHASECAL_LIM", meta: "-- <constant>", description: "GROVE_VL53L0X__ALGO_PHASECAL_LIM" },
        { value: "_ALGO_PHASECAL_CONFIG_TIMEOUT", meta: "-- <constant>", description: "GROVE_VL53L0X__ALGO_PHASECAL_CONFIG_TIMEOUT" },
        { value: "_VCSEL_PERIOD_PRE_RANGE", meta: "-- <constant>", description: "GROVE_VL53L0X__VCSEL_PERIOD_PRE_RANGE" },
        { value: "_VCSEL_PERIOD_FINAL_RANGE", meta: "-- <constant>", description: "GROVE_VL53L0X__VCSEL_PERIOD_FINAL_RANGE" },
        { title: "_decode_timeout(val)", value: "_decode_timeout", meta: "-- <function>", snippet: "_decode_timeout(${1:})", description: "GROVE_VL53L0X__DECODE_TIMEOUT" },
        { title: "_encode_timeout(timeout_mclks)", value: "_encode_timeout", meta: "-- <function>", snippet: "_encode_timeout(${1:})", description: "GROVE_VL53L0X__ENCODE_TIMEOUT" },
        { title: "_timeout_mclks_to_microseconds(timeout_period_mclks, vcsel_period_pclks)", value: "_timeout_mclks_to_microseconds", meta: "-- <function>", snippet: "_timeout_mclks_to_microseconds(${1:})", description: "GROVE_VL53L0X__TIMEOUT_MCLKS_TO_MICROSECONDS" },
        { title: "_timeout_microseconds_to_mclks(timeout_period_us, vcsel_period_pclks)", value: "_timeout_microseconds_to_mclks", meta: "-- <function>", snippet: "_timeout_microseconds_to_mclks(${1:})", description: "GROVE_VL53L0X__TIMEOUT_MICROSECONDS_TO_MCLKS" },
        { value: "VL53L0X", meta: "vl53l0x", description: "GROVE_VL53L0X_VL53L0X_CLASS", content: VL53L0XConstants, kind: "class" },
        { value: "VL53L0X()", title: "VL53L0X(addr=_VL53L0X_IIC_ADDR, io_timeout_s=1)", snippet: "VL53L0X(${1:addr=_VL53L0X_IIC_ADDR})", meta: "constructor", returns: "VL53L0X", description: "GROVE_VL53L0X_VL53L0X_CONSTRUCTOR", content: VL53L0XConstants },
        { title: "__name__", value: "__name__", meta: "vl53l0x", description: "GROVE_VL53L0X_MODULE" }
    ];
    typeTree.VL53L0X = [
        { title: "__init__(addr=_VL53L0X_IIC_ADDR, io_timeout_s=1)", value: "__init__", meta: "-- <function>", snippet: "__init__(${1:addr=_VL53L0X_IIC_ADDR})", description: "GROVE_VL53L0X_VL53L0X___INIT__" },
        { title: "_read_u8(address)", value: "_read_u8", meta: "-- <function>", snippet: "_read_u8(${1:})", description: "GROVE_VL53L0X_VL53L0X__READ_U8" },
        { title: "_read_u16(address)", value: "_read_u16", meta: "-- <function>", snippet: "_read_u16(${1:})", description: "GROVE_VL53L0X_VL53L0X__READ_U16" },
        { title: "_write_u8(address, val)", value: "_write_u8", meta: "-- <function>", snippet: "_write_u8(${1:})", description: "GROVE_VL53L0X_VL53L0X__WRITE_U8" },
        { title: "_write_u16(address, val)", value: "_write_u16", meta: "-- <function>", snippet: "_write_u16(${1:})", description: "GROVE_VL53L0X_VL53L0X__WRITE_U16" },
        { title: "_get_spad_info()", value: "_get_spad_info", meta: "-- <function>", snippet: "_get_spad_info()", description: "GROVE_VL53L0X_VL53L0X__GET_SPAD_INFO" },
        { title: "_perform_single_ref_calibration(vhv_init_byte)", value: "_perform_single_ref_calibration", meta: "-- <function>", snippet: "_perform_single_ref_calibration(${1:})", description: "GROVE_VL53L0X_VL53L0X__PERFORM_SINGLE_REF_CALIBRATION" },
        { title: "_get_vcsel_pulse_period(vcsel_period_type)", value: "_get_vcsel_pulse_period", meta: "-- <function>", snippet: "_get_vcsel_pulse_period(${1:})", description: "GROVE_VL53L0X_VL53L0X__GET_VCSEL_PULSE_PERIOD" },
        { title: "_get_sequence_step_enables()", value: "_get_sequence_step_enables", meta: "-- <function>", snippet: "_get_sequence_step_enables()", description: "GROVE_VL53L0X_VL53L0X__GET_SEQUENCE_STEP_ENABLES" },
        { title: "_get_sequence_step_timeouts(pre_range)", value: "_get_sequence_step_timeouts", meta: "-- <function>", snippet: "_get_sequence_step_timeouts(${1:})", description: "GROVE_VL53L0X_VL53L0X__GET_SEQUENCE_STEP_TIMEOUTS" },
        { title: "signal_rate_limit(val)", value: "signal_rate_limit", meta: "-- <function>", snippet: "signal_rate_limit(${1:})", description: "GROVE_VL53L0X_VL53L0X_SIGNAL_RATE_LIMIT" },
        { title: "measurement_timing_budget(budget_us)", value: "measurement_timing_budget", meta: "-- <function>", snippet: "measurement_timing_budget(${1:})", description: "GROVE_VL53L0X_VL53L0X_MEASUREMENT_TIMING_BUDGET" },
        { title: "getRangeMillimeters()", value: "getRangeMillimeters", meta: "-- <function>", snippet: "getRangeMillimeters()", description: "GROVE_VL53L0X_VL53L0X_GETRANGEMILLIMETERS" },
        { title: "set_address(new_address)", value: "set_address", meta: "-- <function>", snippet: "set_address(${1:})", description: "GROVE_VL53L0X_VL53L0X_SET_ADDRESS" }
    ];

    // grove - water_level
    tree.water_level = [
        { value: "THRESHOLD", meta: "-- <constant>", description: "GROVE_WATER_LEVEL_THRESHOLD" },
        { value: "ATTINY1_HIGH_ADDR", meta: "-- <constant>", description: "GROVE_WATER_LEVEL_ATTINY1_HIGH_ADDR" },
        { value: "ATTINY2_LOW_ADDR", meta: "-- <constant>", description: "GROVE_WATER_LEVEL_ATTINY2_LOW_ADDR" },
        { value: "reg_config", meta: "-- <constant>", description: "GROVE_WATER_LEVEL_REG_CONFIG" },
        { title: "getHigh12SectionValue()", value: "getHigh12SectionValue", meta: "-- <function>", snippet: "getHigh12SectionValue()", description: "GROVE_WATER_LEVEL_GETHIGH12SECTIONVALUE" },
        { title: "getLow8SectionValue()", value: "getLow8SectionValue", meta: "-- <function>", snippet: "getLow8SectionValue()", description: "GROVE_WATER_LEVEL_GETLOW8SECTIONVALUE" },
        { title: "measurePercentLevel()", value: "measurePercentLevel", meta: "-- <function>", snippet: "measurePercentLevel()", description: "GROVE_WATER_LEVEL_CHECK_WATER_LEVEL" },
        { title: "__name__", value: "__name__", meta: "water_level", description: "GROVE_WATER_LEVEL_MODULE" }
    ];

    return { tree, typeTree, decorators };
};
