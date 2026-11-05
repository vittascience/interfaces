// micro:bit - ELECFREAKS TPBot module (block extension), simulation of lib/robot/tpbot.py

const $builtinmodule = function (name) {

    const tpbot = {};
    tpbot.__name__ = new Sk.builtin.str("tpbot");

    // The robot simulator reads the speed and the direction of the motors from these modules.
    const setMotor = function (motorSide, speed) {
        const value = Math.min(Math.abs(speed), 100);
        $('#mb-tpbot-motor' + motorSide + '_value').html(value + '%');
        if (value) {
            const direction = speed > 0 ? 'forward' : 'backward';
            $('.mb-tpbot-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (value / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.mb-tpbot-motor' + motorSide).css('animation', 'none');
        }
    };

    tpbot.set_wheels = new Sk.builtin.func(function (left, right) {
        setMotor('Left', left.v);
        setMotor('Right', right.v);
        return new Sk.builtin.none();
    });

    tpbot.stop = new Sk.builtin.func(function () {
        setMotor('Left', 0);
        setMotor('Right', 0);
        return new Sk.builtin.none();
    });

    tpbot.headlights = new Sk.builtin.func(function (color) {
        const mod = Simulator.getModuleByKey('mb-tpbot-headlights');
        Simulator.setAnimator(mod, mod.id, color.v.map(value => Math.max(0, Math.min(Math.round(value.v), 255))));
        return new Sk.builtin.none();
    });

    tpbot.servo = new Sk.builtin.func(function (number, angle) {
        const mod = Simulator.getModuleByKey('mb-tpbot-servo' + number.v);
        Simulator.setAnimator(mod, mod.id, Math.max(0, Math.min(angle.v, 180)));
        return new Sk.builtin.none();
    });

    // 0: black (line), 1: white, the slider of the module is 1 on a line.
    tpbot.track = new Sk.builtin.func(function (side) {
        const sensor = side.v ? 'Right' : 'Left';
        return new Sk.builtin.int_(Simulator.getSliderValue('mb-tpbot-finder' + sensor, '_v') ? 0 : 1);
    });

    tpbot.distance = new Sk.builtin.func(function (unit) {
        const duration = Simulator.getSliderValue('mb-tpbot-ultrasonic', '_t');
        const divider = unit !== undefined && unit.v === 'inch' ? 148 : 58;
        return new Sk.builtin.int_(Math.floor(duration / divider));
    });

    return tpbot;
};
