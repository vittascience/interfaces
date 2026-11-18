/**
 * Minimal "os" module for the Python interface: works on the interface files (PythonFiles),
 * which are a flat list (no folders).
 */
var $builtinmodule = function (name) {
    const mod = { __name__: new Sk.builtin.str('os') };
    const str = (o) => Sk.ffi.remapToJs(o);
    const notFound = (n) => new (Sk.builtin.OSError || Sk.builtin.IOError)("[Errno 2] No such file or directory: '" + n + "'");
    const isCwd = (p) => ['', '.', './', '/'].includes(str(p));

    mod.sep = new Sk.builtin.str('/');
    mod.getcwd = new Sk.builtin.func(function () {
        return new Sk.builtin.str('/');
    });
    mod.listdir = new Sk.builtin.func(function (path) {
        if (path !== undefined && !isCwd(path)) throw notFound(str(path));
        return new Sk.builtin.list(PythonFiles.names().map(n => new Sk.builtin.str(n)));
    });
    mod.remove = new Sk.builtin.func(function (path) {
        if (!PythonFiles.exists(str(path))) throw notFound(str(path));
        PythonFiles.remove(str(path));
        return Sk.builtin.none.none$;
    });
    mod.unlink = mod.remove;
    mod.rename = new Sk.builtin.func(function (src, dst) {
        if (!PythonFiles.exists(str(src))) throw notFound(str(src));
        PythonFiles.rename(str(src), str(dst));
        return Sk.builtin.none.none$;
    });

    const path = new Sk.builtin.module();
    const p = {
        __name__: new Sk.builtin.str('os.path'),
        sep: new Sk.builtin.str('/'),
        exists: new Sk.builtin.func(function (x) {
            return new Sk.builtin.bool(isCwd(x) || PythonFiles.exists(str(x)));
        }),
        isfile: new Sk.builtin.func(function (x) {
            return new Sk.builtin.bool(PythonFiles.exists(str(x)));
        }),
        isdir: new Sk.builtin.func(function (x) {
            return new Sk.builtin.bool(isCwd(x));
        }),
        getsize: new Sk.builtin.func(function (x) {
            if (!PythonFiles.exists(str(x))) throw notFound(str(x));
            return new Sk.builtin.int_(PythonFiles.size(str(x)));
        }),
        join: new Sk.builtin.func(function (...parts) {
            const js = parts.map(str).filter(s => s !== '');
            return new Sk.builtin.str(js.join('/').replace(/\/+/g, '/').replace(/^\.\//, ''));
        }),
        basename: new Sk.builtin.func(function (x) {
            return new Sk.builtin.str(str(x).split('/').pop());
        }),
        dirname: new Sk.builtin.func(function (x) {
            const s = str(x);
            return new Sk.builtin.str(s.includes('/') ? s.slice(0, s.lastIndexOf('/')) : '');
        }),
        splitext: new Sk.builtin.func(function (x) {
            const s = str(x);
            const i = s.lastIndexOf('.');
            const parts = i > 0 && i > s.lastIndexOf('/') ? [s.slice(0, i), s.slice(i)] : [s, ''];
            return new Sk.builtin.tuple(parts.map(v => new Sk.builtin.str(v)));
        }),
    };
    path.$d = p; // module attributes are a plain JS object
    mod.path = path;
    return mod;
};
