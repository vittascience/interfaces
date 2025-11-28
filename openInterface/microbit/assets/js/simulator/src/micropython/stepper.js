// micro:bit - stepper module

const $builtinmodule = function (name) {

    const stepper = {};
    stepper.__name__ = new Sk.builtin.str("stepper");

    // --- Contrôleur anti-chevauchement : par moteur ---
    const GLOBAL_KEY = "__stepperMotorCtrl__";
    const root = (typeof window !== "undefined") ? window : globalThis;
    if (!root[GLOBAL_KEY]) {
        root[GLOBAL_KEY] = { gens: Object.create(null) }; // { [motorId]: genNumber }
    }
    function nextGenFor(motorId) {
        const g = root[GLOBAL_KEY].gens;
        g[motorId] = (g[motorId] || 0) + 1;
        return g[motorId];
    }
    function stillActive(motorId, myGen) {
        return root[GLOBAL_KEY].gens[motorId] === myGen;
    }

    const StepperMotor = function ($gbl, $loc) {

        $loc.STEPS = new Sk.builtin.int_(0);
        $loc.ROTATIONS = new Sk.builtin.int_(1);
        const MAX_STEPS = 2048;

        StepperMotor__init__ = function (self, in1, in2, in3, in4) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 5, 5);
            self.in1 = in1;
            self.in2 = in2;
            self.in3 = in3;
            self.in4 = in4;
            self.step = 0;
            self.delay_ms = 3;

            self.stepperMotorId = "#stepper-motor_" + self.in1.name;
            // (optionnel) stocker la dernière promesse si tu veux un join plus tard
            self._lastPromise = null;

            let subtitleElement = $(self.stepperMotorId).find(".subtitle-module");
            if (subtitleElement.length === 0) {
                $(self.stepperMotorId).find(".module-header").append("<br>");
                subtitleElement = $("<span>").addClass("subtitle-module");
                $(self.stepperMotorId).find(".module-header").append(subtitleElement);
            }
            subtitleElement.html("P" + self.in1.name + "/P" + self.in2.name + "/P" + self.in3.name + "/P" + self.in4.name);
        };
        StepperMotor__init__.co_varnames = ['self', 'in1', 'in2', 'in3', 'in4'];
        $loc.__init__ = new Sk.builtin.func(StepperMotor__init__);

        const moveClockwise = function (self, steps, unit) {
    let steps_ = Sk.ffi.remapToJs(steps);
    const unit_ = Sk.ffi.remapToJs(unit);
    const MAX_STEPS = 2048;
    if (unit_ === 1) steps_ = steps_ * MAX_STEPS;

    const myGen = nextGenFor(self.stepperMotorId);

    // fire-and-forget
    self._lastPromise = (async () => {
        for (let i = 0; i < steps_; i++) {
            if (!stillActive(self.stepperMotorId, myGen)) return; // annulé par un nouveau move sur ce moteur
            self.step++;
            $(self.stepperMotorId + "_anim").css({ WebkitTransform: 'rotate(' + self.step * (360 / MAX_STEPS) + 'deg)' });
            $(self.stepperMotorId + "_value").html(self.step);
            await sleep_ms(self.delay_ms);
        }
        if (stillActive(self.stepperMotorId, myGen)) {
            $(self.stepperMotorId + "_anim").css('animation', 'unset');
        }
    })();

    // non bloquant -> retourner None immédiatement
    return Sk.builtin.none.none$;
};
$loc.moveClockwise = new Sk.builtin.func(moveClockwise);

const moveAntiClockwise = function (self, steps, unit) {
    let steps_ = Sk.ffi.remapToJs(steps);
    const unit_ = Sk.ffi.remapToJs(unit);
    const MAX_STEPS = 2048;
    if (unit_ === 1) steps_ = steps_ * MAX_STEPS;

    const myGen = nextGenFor(self.stepperMotorId);

    self._lastPromise = (async () => {
        for (let i = 0; i < steps_; i++) {
            if (!stillActive(self.stepperMotorId, myGen)) return;
            self.step--;
            $(self.stepperMotorId + "_anim").css({ WebkitTransform: 'rotate(' + self.step * (360 / MAX_STEPS) + 'deg)' });
            $(self.stepperMotorId + "_value").html(self.step);
            await sleep_ms(self.delay_ms);
        }
        if (stillActive(self.stepperMotorId, myGen)) {
            $(self.stepperMotorId + "_anim").css('animation', 'unset');
        }
    })();

    return Sk.builtin.none.none$;
};
$loc.moveAntiClockwise = new Sk.builtin.func(moveAntiClockwise);

        const setDelay = function (self, delay_ms) {
            self.delay_ms = Sk.ffi.remapToJs(delay_ms);
        };
        $loc.setDelay = new Sk.builtin.func(setDelay);

        // (Optionnel) Méthode stop si tu veux arrêter immédiatement un moteur
        const stop = function (self) {
            // invalide la génération courante de CE moteur
            nextGenFor(self.stepperMotorId);
        };
        $loc.stop = new Sk.builtin.func(stop);

    };

    stepper.StepperMotor = new Sk.misceval.buildClass(stepper, StepperMotor, "StepperMotor", []);
    return stepper;
};