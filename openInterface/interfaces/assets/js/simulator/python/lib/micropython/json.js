// MicroPython - json module

var $builtinmodule = function (name) {

    var json = {};

    var dumps = function (obj, stream) {
        Sk.builtin.pyCheckArgsLen("dumps", arguments.length, 1, 2);
        Sk.builtin.pyCheckType("stream", "string", Sk.builtin.checkString(stream));
        return new Sk.builtin.str(stream + JSON.stringify(Sk.ffi.remapToJs(obj)));
    };

    dumps.co_varnames = ['obj', 'stream'];
    dumps.$defaults = [new Sk.builtin.str("")];

    json.dumps = new Sk.builtin.func(dumps);

    var loads = function (frame) {
        Sk.builtin.pyCheckArgsLen("loads", arguments.length, 1, 1);
        Sk.builtin.pyCheckType("frame", "string", Sk.builtin.checkString(frame));
        const obj = JSON.parse(frame.v)
        kvs = [];
        for (var i in obj) {
            kvs.push(Sk.ffi.remapToPy(i));
            kvs.push(Sk.ffi.remapToPy(obj[i]));
        }
        return new Sk.builtin.dict(kvs);
    };

    loads.co_varnames = ['frame'];
    loads.$defaults = [];

    json.loads = new Sk.builtin.func(loads);

    return json;
};
