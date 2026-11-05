// select module of the simulator (M10 and K10): the console of the simulator sends nothing to the program
// (block "when a message is received from the console")

var $builtinmodule = function () {
    const select = {};
    select.__name__ = new Sk.builtin.str('select');
    const none = Sk.builtin.none.none$;
    select.POLLIN = new Sk.builtin.int_(1);
    select.select = new Sk.builtin.func(() => new Sk.builtin.tuple([new Sk.builtin.list([]), new Sk.builtin.list([]), new Sk.builtin.list([])]));
    const Poll = Sk.misceval.buildClass(select, function ($gbl, $loc) {
        const register = function () { return none; };
        register.co_varargs = true;
        $loc.register = new Sk.builtin.func(register);
        const poll = function () { return new Sk.builtin.list([]); };
        poll.co_varargs = true;
        $loc.poll = new Sk.builtin.func(poll);
    }, 'poll', []);
    select.poll = new Sk.builtin.func(() => Sk.misceval.callsimArray(Poll, []));
    return select;
};
