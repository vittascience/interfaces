// Eliobot - adafruit_dht module

const $builtinmodule = function () {

    const adafruit_dht = {};

    adafruit_dht.__name__ = new Sk.builtin.str('adafruit_dht');

    adafruit_dht.DHT11 = new Sk.misceval.buildClass(adafruit_dht, function ($gbl, $loc) {
        DHT11__init__ = function (self, pin, variable_frequency) {
            self.pin = Sk.ffi.remapToJs(pin);
        };
        DHT11__init__.co_varnames = ['self', 'pin'];
        DHT11__init__.$defaults = [new Sk.builtin.str('IO15')];

        $loc.__init__ = new Sk.builtin.func(DHT11__init__);
        
        $loc.humidity = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_($(`#elio-dht11-hum_slider`).slider('option', 'value'));
		});

        $loc.temperature = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_($(`#elio-dht11-temp_slider`).slider('option', 'value'));
		});


    }, 'DHT11', []);

    return adafruit_dht;
};