// ESP32 - esp32_my9221 module

var $builtinmodule = function (name) {
	
	var esp32_my9221 = {};

    esp32_my9221.__name__ = new Sk.builtin.str('esp32_my9221');
	
	esp32_my9221.MY9221 = new Sk.misceval.buildClass(esp32_my9221, function($gbl, $loc) {

		MY9221__init__ = function (self, di, dcki, reverse) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 4);
			Sk.builtin.pyCheckType("reverse", "boolean", Sk.builtin.checkBool(reverse));
            self.level = 0;
            self._r = reverse.v;
            self.di = di.pin;
            self.dcki = dcki.pin;
            $("#write-digital_" + self.dcki).hide();
            const pins = Blockly.Constants.Pins.GALAXIA_PINS;
            $("#ledBar_" + self.di).find(".subtitle-module").html(pins.find(p => p[1] == 'p' + self.di)[0] + ' / ' + pins.find(p => p[1] == 'p' + self.dcki)[0]);
		};

		MY9221__init__.co_varnames = ['self', 'di', 'dcki', 'reverse'];
		MY9221__init__.$defaults = [new Sk.builtin.bool(false)];

		$loc.__init__ = new Sk.builtin.func(MY9221__init__);

		var reverse = function (self, val) {
            if (Sk.builtin.checkNone(val)) {
                return new Sk.builtin.bool(self._r);
            } else {
                self._r = val.v;
            }
		};

        reverse.co_varnames = ['self', 'val'];
		reverse.$defaults = [Sk.builtin.none()];

        $loc.reverse = new Sk.builtin.func(reverse);

		var level = function (self, val, brightness) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
			Sk.builtin.pyCheckType("val", "integer or float", Sk.builtin.checkNumber(val));
            Sk.builtin.pyCheckType("brightness", "integer or float", Sk.builtin.checkNumber(brightness));
            const mod = Simulator.getModuleByKey('ledBar');
            Simulator.setAnimator(mod, mod.id + '_' + self.di, val.v)
		};

        level.co_varnames = ['self', 'val', 'brightness'];
		level.$defaults = [new Sk.builtin.int_(255)];

        $loc.level = new Sk.builtin.func(level);

	}, 'MY9221', []);

	return esp32_my9221;
};