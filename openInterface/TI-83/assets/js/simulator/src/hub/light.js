// Innovator Hub - light module

var $builtinmodule = function (name) {

    const module = Simulator.getModuleByKey('ih-LED-Red');

    var mod = {};

    mod.__name__ = new Sk.builtin.str('light');

    mod.on = new Sk.builtin.func(function () {
        $("#ih_redLed").addClass("ih_redLed_anim");
        Simulator.setAnimator(module, module.id, 1);
        return Sk.builtin.none();
    });

    mod.off = new Sk.builtin.func(function () {
        $("#ih_redLed").removeClass("ih_redLed_anim");
        Simulator.setAnimator(module, module.id, 0);
        return Sk.builtin.none();
    });

    mod.blink = new Sk.builtin.func(function (freq, time) {
        throw Error('light.blink() is not implemented yet');
    });

    return mod;
};