// adc  module for Raspberry Pi


var $builtinmodule = function (name) {

    var adc = {};

    adc.__name__ = new Sk.builtin.str("adc");

    var ADC = function ($gbl, $loc) {

        ADC__init__ = function (self, pin) {
                
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
                Sk.builtin.pyCheckType("pin", "integer", Sk.builtin.checkInt(pin));
                self.pin = pin.v;
        };

        ADC__init__.co_varnames = ['self', 'pin'];
        ADC__init__.$defaults = [new Sk.builtin.int_(0)];
        $loc.__init__ = new Sk.builtin.func(ADC__init__);

        $loc.read_analog = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(Simulator.getPinSliderValue(self.pin));
        });

        $loc.read = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(Simulator.getPinSliderValue(self.pin));
        });
        
    };

    adc.ADC = new Sk.misceval.buildClass(adc, ADC, 'ADC', []);

    return adc;



}