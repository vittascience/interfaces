// micro:bit - wukong module

var $builtinmodule = function (name) {

    var wukong = {};
    wukong.__name__ = new Sk.builtin.str("wukong");

    wukong.WUKONG_ADDR = new Sk.builtin.int_(0x10);

    function map_value(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };

    const setMotor = function (motor, speed, direction) {
        const RPM = 100;
        $('#mb-wukong-motor' + motor + '_value').html(speed + '%');
        if (speed != 0) {
            $('.mb-wukong-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RPM)) + 's infinite linear');
        } else {
            $('.mb-wukong-motor' + motor).css('animation', 'none');
        }
    };

    var WUKONG = function ($gbl, $loc) {

        // SERVO TYPE
        $loc._180 = new Sk.builtin.str("180");
        $loc._270 = new Sk.builtin.str("270");
        $loc._360 = new Sk.builtin.str("360");

        WUKONG__init__ = function (self) {
        };

        WUKONG__init__.co_varnames = ['self'];
        WUKONG__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(WUKONG__init__);

        $loc.set_motors = new Sk.builtin.func(function (self, motor, speed) {
            const direction = (speed.v > 0 ? "forward" : "backward");
            setMotor(motor.v, Math.abs(speed.v), direction);
            return new Sk.builtin.none();
        });

        set_servo = function (self, servo, angle, servoType) {
            const mod = Simulator.getModuleByKey('mb-wukong-servo' + servo.v);

            if (servoType.v == $loc._180.v) {
                angle = map_value(angle.v, 0, 180, 0, 180);
            } else if (servoType.v == $loc._270.v) {
                angle = map_value(angle.v, 0, 270, 0, 180);
            } else if (servoType.v == $loc._360.v) {
                angle = map_value(angle.v, 0, 360, 0, 180);
            }
            $('#mb-wukong-servo' + servo.v + '_anim').css('animation', 'rotation-forward 0s');
            Simulator.setAnimator(mod, mod.id, angle);
            return new Sk.builtin.none();
        };

        set_servo.co_varnames = ['self', 'servo', 'angle', 'servoType'];
        set_servo.$defaults = [$loc._180];

        $loc.set_servo = new Sk.builtin.func(set_servo);

        $loc.set_servo_speed = new Sk.builtin.func(function (self, servo, speed) {

            if (speed.v > 100 || speed.v < -100) {
                UIManager.showErrorMessage("error-message", 'La vitesse des servomoteurs doit être comprise entre -100 et 100 %');
            } else {
                if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
                    UIManager.resetMessage("error-message");
                }
            }

            const RPM = 60;
            console.log(speed)
            $('#mb-wukong-servo' + servo.v + '_value').html(roundFloat(speed.v, 1) + " %");
            if (speed.v > 0) {
                $('#mb-wukong-servo' + servo.v + '_anim').css('animation', 'rotation-backward ' + (60 / (Math.abs(speed.v) / 100 * RPM)) + 's infinite linear');
            } else if (speed.v == 0) {
                $('#mb-wukong-servo' + servo.v + '_anim').css('animation', 'rotation-forward 0s');
            } else {
                $('#mb-wukong-servo' + servo.v + '_anim').css('animation', 'rotation-forward ' + (60 / (Math.abs(speed.v) / 100 * RPM)) + 's infinite linear');
            }
        });

    };

    wukong.WUKONG = new Sk.misceval.buildClass(wukong, WUKONG, "WUKONG", []);

    return wukong;
}