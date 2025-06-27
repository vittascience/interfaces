// Innovator Hub - color module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('color');

    mod.rgb = new Sk.builtin.func(function (r, g, b) {
        if (b !== undefined) {
            if (g !== undefined) {
                if (r !== undefined) {
                    if (Sk.builtin.checkNumber(r) || Sk.builtin.checkNumber(g)|| Sk.builtin.checkNumber(b)) {
                        self.r = Math.round(r.v);
                        self.g = Math.round(g.v);
                        self.b = Math.round(b.v);
                        $("#ih_rgbLed").addClass('ih_rgbLed_anim');
                        $("#ih_rgbLed").css('background-color', "rgb(" + self.r + "," + self.g + "," + self.b + ")");
                        $('#ih-LED-RGB_anim').css('background', "rgb(" + self.r + "," + self.g + "," + self.b + ")");
                        if (RobotSimulator.robot) {
                            RobotSimulator.robot.ledRGB.set(self.r, self.g, self.b);
                        }
                    } else if (Sk.builtin.checkString(r) || Sk.builtin.checkString(g)|| Sk.builtin.checkString(b)) {
                        Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction rgb()", "can't convert 'int' object to str implicity", 'TypeError');
                    }
                } else {
                    Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'r' à la fonction rgb()", "function takes 3 positional arguments but 0 were given.", 'TypeError');
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'g' à la fonction rgb()", "function takes 3 positional arguments but 1 were given.", 'TypeError');
            }
        } else {
            Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'b' à la fonction rgb()", "function takes 3 positional arguments but 2 were given.", 'TypeError');
        }
	});

    mod.off = new Sk.builtin.func(function () {
        $("#ih_rgbLed").removeClass('ih_rgbLed_anim');
        $('#ih-LED-RGB_anim').css('background', "rgb(0,0,0)");
		return Sk.builtin.none();
	});

    mod.blink = new Sk.builtin.func(function (self) {
        throw Error('color.blink() is not implemented yet');
    });

	return mod;
};
