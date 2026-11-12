// Motor module for LEGO® Education SPIKE™ Prime
// Speeds are in degrees per second. Timed functions are blocking: the "await" of the program is removed (code_friendly.js).

const $builtinmodule = function () {

    const motor = {};
    motor.__name__ = new Sk.builtin.str("motor");
    const positions = {};
    const offsets = {}; // port: position that reset_relative_position has set as origin
    const running = {}; // port: {velocity, since} of a motor started by run()
    const js = Sk.ffi.remapToJs;

    // add to the position what a running motor has turned so far
    const settle = function (port) {
        const move = running[port];
        if (!move) return;
        positions[port] = (positions[port] || 0) + Math.round(move.velocity * (Date.now() - move.since) / 1000);
        move.since = Date.now();
    };

    const element = port => document.querySelector(`#spike-motor-port${port} #spike-motor`);

    const setMotor = Simulator.Mosaic.specific.setMotor;

    // turn by `degrees` (signed) at |velocity| deg/s, then wait for the end of the move
    const turn = function (port, degrees, velocity) {
        settle(port);
        delete running[port];
        positions[port] = (positions[port] || 0) + degrees;
        return Simulator.runAsync(async function (resolve) {
            const speed = Math.abs(velocity) || 1;
            const motorElement = element(port);
            $('#spike-motor-port' + port + '_value').html(`${positions[port]}°`);
            if (motorElement) {
                motorElement.style.animation = 'none';
                motorElement.style.transition = `transform ${Math.abs(degrees) / speed}s linear`;
                motorElement.style.transform = `rotate(${positions[port]}deg)`;
            }
            await sleep_ms(Math.abs(degrees) / speed * 1000);
            resolve(Sk.builtin.none());
        });
    };

    const none = () => Sk.builtin.none();

    const run = function (port, velocity) {
        const _port = js(port), _velocity = js(velocity);
        settle(_port);
        running[_port] = { velocity: _velocity, since: Date.now() };
        setMotor(_port, Math.abs(_velocity), _velocity >= 0 ? "forward" : "backward");
        return none();
    };
    run.co_varnames = ['port', 'velocity'];
    motor.run = new Sk.builtin.func(run);

    const run_for_time = function (port, duration, velocity) {
        const _port = js(port), _velocity = js(velocity);
        settle(_port);
        delete running[_port];
        return Simulator.runAsync(async function (resolve) {
            setMotor(_port, Math.abs(_velocity), _velocity >= 0 ? "forward" : "backward");
            await sleep_ms(js(duration));
            positions[_port] = (positions[_port] || 0) + Math.round(_velocity * js(duration) / 1000);
            setMotor(_port);
            resolve(none());
        });
    };
    run_for_time.co_varnames = ['port', 'duration', 'velocity'];
    motor.run_for_time = new Sk.builtin.func(run_for_time);

    const run_for_degrees = function (port, degrees, velocity) {
        const _velocity = js(velocity);
        return turn(js(port), _velocity >= 0 ? js(degrees) : -js(degrees), _velocity);
    };
    run_for_degrees.co_varnames = ['port', 'degrees', 'velocity'];
    motor.run_for_degrees = new Sk.builtin.func(run_for_degrees);

    // shortest path, as on the hub
    const run_to_absolute_position = function (port, position, velocity) {
        const _port = js(port);
        settle(_port);
        const delta = (((js(position) - (positions[_port] || 0) + 180) % 360) + 360) % 360 - 180;
        return turn(_port, delta, js(velocity));
    };
    run_to_absolute_position.co_varnames = ['port', 'position', 'velocity'];
    motor.run_to_absolute_position = new Sk.builtin.func(run_to_absolute_position);

    motor.relative_position = new Sk.builtin.func(function (port) {
        settle(js(port));
        return new Sk.builtin.int_((positions[js(port)] || 0) - (offsets[js(port)] || 0));
    });

    motor.reset_relative_position = new Sk.builtin.func(function (port, position) {
        settle(js(port));
        offsets[js(port)] = (positions[js(port)] || 0) - js(position);
        return none();
    });

    motor.stop = new Sk.builtin.func(function (port) {
        settle(js(port));
        delete running[js(port)];
        setMotor(js(port));
        return none();
    });

    return motor;
};
