// Hub module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const hub = {};

    hub.port = new Sk.misceval.buildClass(hub, function ($gbl, $loc) {

        $loc.A = new Sk.builtin.str('A');
        $loc.B = new Sk.builtin.str('B');

        $loc.__init__ = new Sk.builtin.func(function (self) { });
    });

    return hub;
};