// Innovator Hub - brightns module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('brightns');
	
	mod.ti_hub = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("brightns.ti_hub() is not yet implemented");
	});

    mod._present = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("brightns._present() is not yet implemented");
	});

    mod.range = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("brightns.range() is not yet implemented");
	});

    mod.measurement = new Sk.builtin.func(function () {
		const measure = $("#ih-brightns_value").html();
		return new Sk.builtin.int_(measure);
	});

	return mod;
};
