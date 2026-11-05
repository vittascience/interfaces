// threading module of the simulator: Skulpt runs the Python code with promises, a thread is another call running
// at each pause (time.sleep) of the others. It stops with the program (Simulator.doStep).

var $builtinmodule = function () {
    const threading = {};
    threading.__name__ = new Sk.builtin.str('threading');
    const none = Sk.builtin.none.none$;

    // keyword arguments of Python (target=..., daemon=...) in the order of the names, the others first (co_kwargs)
    const withNames = function (names, implementation) {
        const method = (kwargs, ...args) => implementation(...args);
        method.co_varnames = names;
        method.$defaults = names.slice(1).map(() => none);
        method.co_kwargs = true;
        return new Sk.builtin.func(method);
    };

    threading.Thread = Sk.misceval.buildClass(threading, function ($gbl, $loc) {
        $loc.__init__ = withNames(['self', 'group', 'target', 'name', 'args', 'kwargs', 'daemon'], function (self, group, target, name, args) {
            self.target = target;
            self.args = args && args !== none ? Sk.misceval.arrayFromIterable(args) : [];
            return none;
        });
        $loc.start = new Sk.builtin.func(function (self) {
            if (self.target && self.target !== none) {
                Sk.misceval.callsimAsync({ "Sk.debug": Simulator.doStep }, self.target, ...self.args).catch(Simulator.handleError);
            }
            return none;
        });
        $loc.join = new Sk.builtin.func(function () {
            return none;
        });
        $loc.is_alive = new Sk.builtin.func(function () {
            return Sk.builtin.bool.true$;
        });
    }, 'Thread', []);

    threading.Lock = Sk.misceval.buildClass(threading, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.locked = false;
            return none;
        });
        // waits by short pauses while another thread has the lock
        const acquire = function (self) {
            if (!self.locked) {
                self.locked = true;
                return Sk.builtin.bool.true$;
            }
            return Sk.misceval.chain(Simulator.sleep_ms(10), () => acquire(self));
        };
        $loc.acquire = new Sk.builtin.func(acquire);
        $loc.__enter__ = new Sk.builtin.func(acquire);
        $loc.release = new Sk.builtin.func(function (self) {
            self.locked = false;
            return none;
        });
        $loc.__exit__ = new Sk.builtin.func(function (self) {
            self.locked = false;
            return Sk.builtin.bool.false$;
        });
        $loc.locked = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(self.locked);
        });
    }, 'Lock', []);

    return threading;
};
