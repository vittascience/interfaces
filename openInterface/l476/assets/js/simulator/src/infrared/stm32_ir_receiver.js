// STM32 - stm32_ir_receiver

var $builtinmodule = function () {

	var stm32_ir_receiver = {};

    var IR_RX = function ($gbl, $loc) {

        IR_RX__init__ = function (self, pin, nedges, tblock, callback) {
            console.log(self)
        };

        IR_RX__init__.co_varnames = ['self', 'pin', 'nedges', 'tblock', 'callback'];
		IR_RX__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(IR_RX__init__);
	};

    stm32_ir_receiver.IR_RX = new Sk.misceval.buildClass(stm32_ir_receiver, IR_RX, "IR_RX", []);

    return stm32_ir_receiver;
};