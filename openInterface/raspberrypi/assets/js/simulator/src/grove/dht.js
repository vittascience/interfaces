// python/raspberry - dht module

var $builtinmodule = function (name) {

    var dht = {};

    dht.__name__ = new Sk.builtin.str("dht");

    var DHT = function ($gbl, $loc) {

        DHT__init__ = function (self, type, pin) {
                
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
                Sk.builtin.pyCheckType("pin", "integer", Sk.builtin.checkInt(pin));
                self.type = type.v;
                self.pin = pin.v;
        };

        DHT__init__.co_varnames = ['self', 'type', 'pin'];
        DHT__init__.$defaults = [new Sk.builtin.str("11"), new Sk.builtin.int_(12)];
        $loc.__init__ = new Sk.builtin.func(DHT__init__);


        $loc.read_temperature = new Sk.builtin.func(function (self) {
            const temp = Simulator.getSliderValue('dht'+ self.type + '-temp_' + self.pin);
            return new Sk.builtin.float_(temp);
        });

        $loc.read_humidity = new Sk.builtin.func(function (self) {
            const hum = Simulator.getSliderValue('dht'+ self.type + '-hum_' + self.pin);
            return new Sk.builtin.float_(hum);
        });

    };


    dht.DHT = new Sk.misceval.buildClass(dht, DHT, 'DHT11', []);
    

    return dht;
};