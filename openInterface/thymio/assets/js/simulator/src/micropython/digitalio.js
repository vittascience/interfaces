// Thymio - digitalio module

var $builtinmodule = function () {

	var digitalio = {};
    

	digitalio.DigitalInOut = new Sk.misceval.buildClass(digitalio, function ($gbl, $loc) {
		DigitalInOutClass__init__ = function (self,pin) {
            self.pin = pin;
        };

		DigitalInOutClass__init__.co_varnames = ['self','pin'];
		DigitalInOutClass__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(DigitalInOutClass__init__);

        $loc.direction = "";
        $loc.value = Sk.builtin.bool(false);
        $loc.is_pressed = new Sk.builtin.func(function (self) {
            return Sk.builtin.bool($('#mb-button_slider').slider('option','value'));
        }); 

	}, 'DigitalInOutClass', []);

    digitalio.Direction = new Sk.misceval.buildClass(digitalio, function ($gbl, $loc) {

		DirectionClass__init__ = function (self) {};

		DirectionClass__init__.co_varnames = ['self'];
		DirectionClass__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(DirectionClass__init__);

        $loc.OUTPUT = "OUTPUT";
        $loc.INPUT = "INPUT";
	}, 'DirectionClass', []);

    digitalio.Pull = new Sk.misceval.buildClass(digitalio, function ($gbl, $loc) {

		PullClass__init__ = function (self) {};

		PullClass__init__.co_varnames = ['self'];
		PullClass__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(DirectionClass__init__);
	}, 'PullClass', []);
   
	return digitalio;
};