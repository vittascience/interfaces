// STM32 - stm32_LoRa module

var $builtinmodule = function () {

	var stm32_LoRa = {};

	stm32_LoRa.LoRa = new Sk.misceval.buildClass(stm32_LoRa, function ($gbl, $loc) {

		LoRa__init__ = function (self, rate, slot) {
			//Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
        	Sk.builtin.pyCheckType("rate", "integer", Sk.builtin.checkInt(rate));
            Sk.builtin.pyCheckType("slot", "integer", Sk.builtin.checkInt(slot));
			if (Sk.builtin.checkNone(rate) || Sk.builtin.checkNone(slot)) {
				throw new Sk.builtin.ValueError("LoRa init missing arguments !");
			} else {
				self.rate = rate.v;
				self.slot = slot.v;
			}
		};

		LoRa__init__.co_varnames = ['self', 'rate','slot'];
		LoRa__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(LoRa__init__);

        $loc.setIdentify = new Sk.builtin.func(function (self, devAddr, appEui, appKey) {			
            if(devAddr.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){8}/g) === null || devAddr.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){8}/g).length > 1) 
				throw new Sk.builtin.ValueError("devAddr must be exactly 8 characters long and contain only capital letters and numbers");
			if(appEui.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){16}/g) === null || appEui.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){16}/g).length > 1)
				throw new Sk.builtin.ValueError("appEui must be exactly 16 characters long and contain only capital letters and numbers");
			if(appKey.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){32}/g) === null|| appKey.v.replace(/\s/g,'').match(/([A-Z]|[0-9]){32}/g).length > 1)
				throw new Sk.builtin.ValueError("appKey must be exactly 32 characters long and contain only capital letters and numbers");
		});

		$loc.sendData = new Sk.builtin.func(function (self, loRaFrame) {
            var data = "";

            for (let i = 0; i < loRaFrame.v.length ; i++)
                data += loRaFrame.v[i].v;

            const date = new Date();
            var s;
            if (date.getSeconds() < 10) {
                s = "0" + date.getSeconds();
            } else {
                s = date.getSeconds();
            }
            const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
            InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par LoRa : " + data + "'\n");
            $("#LoRa_anim" ).animate({
				opacity: 1,
			  },1000,function() {
				  $("#LoRa_anim" ).animate({
				opacity: 0,
			  },1000);
			});
            return new Sk.builtin.int_(0);
		});

        $loc.getIdentify = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(0);
		});

        $loc.getDriverVersion = new Sk.builtin.func(function (self) {
            
		});

        $loc.getMode = new Sk.builtin.func(function (self) {
            
		});

        $loc.join = new Sk.builtin.func(function (self) {
            
		});

        $loc.wakeUp = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(0);
		});

        $loc.enterLowPowerMode = new Sk.builtin.func(function (self) {
            
		});

	}, "LoRa");


	return stm32_LoRa;
};
