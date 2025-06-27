Simulator.Behaviours.input = Object.create(null);

Simulator.Behaviours.input.multichannel = function () {
	const GAS = ['co', 'no2', 'nh3', 'c3h10', 'c4h10', 'ch4', 'h2', 'c2h5oh'];
	var mod = Object.create(null);
	mod.CO = new Sk.builtin.int_(0);
	mod.NO2 = new Sk.builtin.int_(1);
	mod.NH3 = new Sk.builtin.int_(2);
	mod.C3H8 = new Sk.builtin.int_(3);
	mod.C4H10 = new Sk.builtin.int_(4);
	mod.CH4 = new Sk.builtin.int_(5);
	mod.H2 = new Sk.builtin.int_(6);
	mod.C2H5OH = new Sk.builtin.int_(7);	
	mod['calc_gas'] = new Sk.builtin.func(function (gas) {
		return new Sk.builtin.int_(parseInt($('#multichannel_value_' + GAS[gas.v]).html()));
	});
	return mod;
};