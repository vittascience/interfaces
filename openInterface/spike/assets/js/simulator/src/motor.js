// Motor module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const motor = {};
    motor.__name__ = new Sk.builtin.str("motor");
    motor.angle = 0;

    const setMotor = function (port, speed = 0, direction = null) {
        $('#spike-motor-port' + port + '_value').html(speed);
        const motor = document.querySelector(`#spike-motor-port${port} #spike-motor`);
        if (direction !== null) {
            motor.style.animation = `rotation-${direction} ${(60 / (speed / 100 * 100))}s linear infinite`;
        } else {
            motor.style.animation = 'none';
        }
    };

    const setMotorToPosition = function (port, speed, position = 0, direction = null) {
        $('#spike-motor-port' + port + '_value').html(`${position}°`);
        const motor = document.querySelector(`#spike-motor-port${port} #spike-motor`);
        if (direction !== null) {
            motor.style.animation = `rotation-${direction} ${(60 / (speed / 100 * 100))}s linear`;
            motor.style.transform = `rotate(${position}deg)`;
        } else {
            motor.style.animation = 'none';
        }
    };

    // 'actuators_startMotorContinuous',
    const run = function (port, speed) {
        const _port = Sk.ffi.remapToJs(port);
        const _speed = Sk.ffi.remapToJs(speed);
        if (LegoSpikeWebBLEAPI.isConnected) {
            LegoSpikeWebBLEAPI.startMotorContinuous(_port, _speed);
        } else {
            const direction = (_speed > 0 ? "forward" : "backward");
            setMotor(_port, Math.abs(_speed), direction);
        }
        return Sk.builtin.none();
    };
    run.co_varnames = ['port', 'speed'];
    run.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(50)];
    motor.run = new Sk.builtin.func(run);

    // 'actuators_startMotorForTime',
    const run_for_time = function (port, speed, time) {
        const _port = Sk.ffi.remapToJs(port);
        const _speed = Sk.ffi.remapToJs(speed);
        const _time = Sk.ffi.remapToJs(time);
        if (LegoSpikeWebBLEAPI.isConnected) {
            LegoSpikeWebBLEAPI.startMotorForTime(_port, _speed, _time);
        } else {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                const direction = (_speed > 0 ? "forward" : "backward");
                setMotor(_port, Math.abs(_speed), direction);
                await sleep_ms(_time);
                setMotor(_port);
                return resolve(Sk.builtin.none());
            }));
        }
        return Sk.builtin.none();
    };
    run_for_time.co_varnames = ['port', 'speed', 'time'];
    run_for_time.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(50), new Sk.builtin.int_(1000)];
    motor.run_for_time = new Sk.builtin.func(run_for_time);

    // 'actuators_moveMotorToPosition',
    const run_to_relative_position = function (port, angle, speed) {
        const _port = Sk.ffi.remapToJs(port);
        const _angle = Sk.ffi.remapToJs(angle);
        const _speed = Sk.ffi.remapToJs(speed);
        const direction = (_speed > 0 ? "forward" : "backward");
        motor.angle = (direction === "forward" ? _angle : -_angle);
        setMotorToPosition(_port, _speed, _angle, direction);
        return Sk.builtin.none();
    };
    run_to_relative_position.co_varnames = ['port', 'angle', 'speed'];
    run_to_relative_position.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(90), new Sk.builtin.int_(50)];
    motor.run_to_relative_position = new Sk.builtin.func(run_to_relative_position);

    // 'actuators_moveMotorByDegrees',
    const run_to_absolute_position = function (port, angle, speed) {
        const _port = Sk.ffi.remapToJs(port);
        const _angle = Sk.ffi.remapToJs(angle);
        const _speed = Sk.ffi.remapToJs(speed);
        const direction = (_speed > 0 ? "forward" : "backward");
        motor.angle += (direction === "forward" ? _angle : -_angle);
        motor.angle = motor.angle % 360;
        setMotorToPosition(_port, _speed, motor.angle, direction);
        return Sk.builtin.none();
    };
    run_to_absolute_position.co_varnames = ['port', 'angle', 'speed'];
    run_to_absolute_position.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(90), new Sk.builtin.int_(50)];
    motor.run_to_absolute_position = new Sk.builtin.func(run_to_absolute_position);

    // 'actuators_stopMotor'
    const stop = function (port) {
        const _port = Sk.ffi.remapToJs(port);
        setMotor(_port);
        return Sk.builtin.none();
    };
    stop.co_varnames = ['port'];
    stop.$defaults = [new Sk.builtin.str("A")];
    motor.stop = new Sk.builtin.func(stop);

    return motor;
};