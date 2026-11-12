// motor_pair module for LEGO® Education SPIKE™ Prime
// ponytail: the wheels are animated but motor.relative_position does not follow a pair.

const $builtinmodule = function () {

    const motor_pair = {};
    motor_pair.__name__ = new Sk.builtin.str("motor_pair");
    ["PAIR_1", "PAIR_2", "PAIR_3"].forEach((name, i) => { motor_pair[name] = new Sk.builtin.int_(i); });
    const js = Sk.ffi.remapToJs;
    const none = () => Sk.builtin.none();
    const setMotor = Simulator.Mosaic.specific.setMotor;
    const pairs = {};

    const paired = function (pair) {
        const ports = pairs[js(pair)];
        if (!ports) throw new Sk.builtin.ValueError(`no pair have been setup for PAIR_${js(pair) + 1}`);
        return ports;
    };

    // steering -100 to 100: at 50 the inner wheel stops, at 100 it turns backward.
    // The motors face each other: to go forward the left one turns backward, as on the hub.
    const spin = function (pair, steering, velocity) {
        const [left, right] = paired(pair);
        const speeds = [steering < 0 ? velocity * (1 + steering / 50) : velocity, steering > 0 ? velocity * (1 - steering / 50) : velocity];
        const forward = [speeds[0] < 0, speeds[1] >= 0];
        [left, right].forEach((port, i) => setMotor(port, Math.abs(speeds[i]), forward[i] ? "forward" : "backward"));
    };

    const pair = function (pair, left, right) {
        pairs[js(pair)] = [js(left), js(right)];
        return none();
    };
    motor_pair.pair = new Sk.builtin.func(pair);

    motor_pair.stop = new Sk.builtin.func(function (pair) {
        paired(pair).forEach(port => setMotor(port));
        return none();
    });

    const move = function (pair, steering, velocity) {
        spin(pair, js(steering), js(velocity));
        return none();
    };
    move.co_varnames = ['pair', 'steering', 'velocity'];
    move.$defaults = [new Sk.builtin.int_(360)];
    motor_pair.move = new Sk.builtin.func(move);

    const move_for_degrees = function (pair, degrees, steering, velocity) {
        const ports = paired(pair), duration = Math.abs(js(degrees)) / (Math.abs(js(velocity)) || 1) * 1000;
        return Simulator.runAsync(async function (resolve) {
            spin(pair, js(steering), js(velocity));
            await sleep_ms(duration);
            ports.forEach(port => setMotor(port));
            resolve(none());
        });
    };
    move_for_degrees.co_varnames = ['pair', 'degrees', 'steering', 'velocity'];
    move_for_degrees.$defaults = [new Sk.builtin.int_(360)];
    motor_pair.move_for_degrees = new Sk.builtin.func(move_for_degrees);

    return motor_pair;
};
