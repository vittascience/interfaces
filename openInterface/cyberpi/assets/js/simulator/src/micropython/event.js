// CyberPi - event module

const $builtinmodule = function (name) {

	const event = {};

	event.__name__ = new Sk.builtin.str('event');

	// Handlers are shared with the cyberpi module (buttons, broadcast)
	const sim = Simulator.Mosaic.specific.cyberpi = Simulator.Mosaic.specific.cyberpi || {};
	sim.events = { start: [], press: {}, receive: {} };

	// Run a decorated Python function in parallel of the main program, like a thread of the CyberPi
	sim.runHandler = function (handler) {
		if (Simulator.stop_flag || handler.running) return;
		handler.running = true;
		Sk.misceval.asyncToPromise(function () {
			return Sk.misceval.callsimOrSuspendArray(handler.func, []);
		}, { "Sk.debug": (susp) => Simulator.doStep(susp) }).then(function () {
			handler.running = false;
		}, function (error) {
			handler.running = false;
			Simulator.handleError(error);
		});
	};

	const register = function (list, func) {
		Sk.builtin.pyCheckType('func', 'callable', Sk.builtin.checkCallable(func));
		const handler = { func, running: false };
		list.push(handler);
		return handler;
	};

	event.start = new Sk.builtin.func(function (func) {
		const handler = register(sim.events.start, func);
		setTimeout(() => sim.runHandler(handler), 0);
		return func;
	});

	event.is_press = new Sk.builtin.func(function (button) {
		const name = Sk.ffi.remapToJs(button);
		return new Sk.builtin.func(function (func) {
			register(sim.events.press[name] = sim.events.press[name] || [], func);
			return func;
		});
	});

	event.receive = new Sk.builtin.func(function (message) {
		const name = Sk.ffi.remapToJs(message);
		return new Sk.builtin.func(function (func) {
			register(sim.events.receive[name] = sim.events.receive[name] || [], func);
			return func;
		});
	});

	return event;
};
