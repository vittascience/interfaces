// micro:bit - WOM_Sensor_Kit module

var $builtinmodule = function (name) {

    var WOM_Sensor_Kit = {};
    WOM_Sensor_Kit.__name__ = new Sk.builtin.str("WOM_Sensor_Kit");

    WOM_Sensor_Kit.WOM_temp_C = new Sk.builtin.str("WOM_temp_C");
    WOM_Sensor_Kit.WOM_humidity = new Sk.builtin.str("WOM_humidity");

    WOM_Sensor_Kit.WOM_up = new Sk.builtin.str("up");
    WOM_Sensor_Kit.WOM_down = new Sk.builtin.str("down");
    WOM_Sensor_Kit.WOM_right = new Sk.builtin.str("right");
    WOM_Sensor_Kit.WOM_left = new Sk.builtin.str("left");

    WOM_Sensor_Kit.WOM_ultrasonic = new Sk.builtin.func(function (echo, trig) {
        const id = '#hcsr04_' + trig.name;
        if (trig.name !== echo.name) {
            $(id).find(".subtitle-module").html('P' + trig.name + ' / P' + echo.name);
        } else {
            if (id.includes('hcsr04')) {
                throw new Sk.builtin.AttributeError('[Ultrasonic] trig and echo cannot be on same pin (P' + trig.name + ')');
            }
        }
        const duration = $(id + '_slider_d').slider('option', 'value');
        return new Sk.builtin.float_(Simulator.Mosaic.grove.calculs.getDistance(duration));
    });

    WOM_Sensor_Kit.WOM_Knob = new Sk.builtin.func(function (pin) {
        const value = $('#potentiometer_' + pin.name + '_slider').slider('option', 'value');
        return new Sk.builtin.int_(value);
    });

    WOM_Sensor_Kit.WOM_light_V2 = new Sk.builtin.func(function (pin) {
        const value = $('#groveLight_' + pin.name + '_slider').slider('option', 'value');
        return new Sk.builtin.int_(value);
    });

    WOM_Sensor_Kit.WOM_ir = new Sk.builtin.func(function (pin) {
        const state = $('#obstacleDetector_' + pin.name + '_slider').slider('option', 'value');
        return new Sk.builtin.int_(state);
    });

    WOM_Sensor_Kit.WOM_pir = new Sk.builtin.func(function (pin) {
        const state = $('#grovePIRMotion_' + pin.name + '_slider').slider('option', 'value');
        return new Sk.builtin.int_(state);
    });

    WOM_Sensor_Kit.WOM_dht11 = new Sk.builtin.func(function (pin, data) {
        if (data.v == WOM_Sensor_Kit.WOM_temp_C.v) {
            const temperature = $('#dht11-temp_' + pin.name + '_slider').slider('option', 'value');
            return new Sk.builtin.float_(temperature);
        } else if (data.v == WOM_Sensor_Kit.WOM_humidity.v) {
            const humidity = $('#dht11-hum_' + pin.name + '_slider').slider('option', 'value');
            return new Sk.builtin.float_(humidity);
        } else {
            throw new Sk.builtin.AttributeError('[DHT11] data type \'' + data.v + '\' is not valid option.');
        }
    });

    WOM_Sensor_Kit.WOM_rocker = new Sk.builtin.func(function (pinX, pinY, direction) {
        const id = '#mb-yahboom-joystick_' + pinX.name;
        if (pinX.name !== pinY.name) {
            $(id).find(".subtitle-module").html('P' + pinX.name + ' / P' + pinY.name);
        } else {
            throw new Sk.builtin.AttributeError('[Joystick] pinX and pinY cannot be on same pin (P' + pinX.name + ')');
        }
        const dir = $(id + '_value').text();
        if (dir.length > 0 && direction.v === dir) {
            return new Sk.builtin.bool(true);
        }
        return new Sk.builtin.bool(false);
    });

    return WOM_Sensor_Kit;
}