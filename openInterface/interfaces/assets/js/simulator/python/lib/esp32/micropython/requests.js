// Esp32 - requests module

var $builtinmodule = function (name) {

    var requests = {};


    //~ Classes .................................................................

    // Response class
    //
    // Response objects are returned by the request, get, post, etc.
    // methods, allowing the user to access the response text, status
    // code, and other information.

    // ------------------------------------------------------------
    var response = function ($gbl, $loc) {

        // ------------------------------------------------------------
        $loc.__init__ = new Sk.builtin.func(function (self, xhr) {
            self.data$ = xhr.responseText;
            self.lineList = self.data$.split("\n");
            self.lineList = self.lineList.slice(0, -1);
            for (var i = 0; i < self.lineList.length; i++) {
                self.lineList[i] = self.lineList[i] + '\n';
            }
            self.currentLine = 0;
            self.pos$ = 0;
        });


        // ------------------------------------------------------------
        $loc.__str__ = new Sk.builtin.func(function (self) {
            return Sk.ffi.remapToPy('<Response>');
        });


        // ------------------------------------------------------------
        $loc.__iter__ = new Sk.builtin.func(function (self) {
            var allLines = self.lineList;

            return Sk.builtin.makeGenerator(function () {
                if (this.$index >= this.$lines.length) {
                    return undefined;
                }
                return new Sk.builtin.str(this.$lines[this.$index++]);
            }, {
                $obj: self,
                $index: 0,
                $lines: allLines
            });
        });

        // ------------------------------------------------------------
        $loc.text = new Sk.builtin.func(function (self, size) {
            if (self.closed) {
                throw new Sk.builtin.ValueError("I/O operation on closed file");
            }
            var len = self.data$.length;
            if (size === undefined) {
                size = len;
            }
            var ret = new Sk.builtin.str(self.data$.substr(self.pos$, size));
            self.pos$ += size;
            if (self.pos$ >= len) {
                self.pos$ = len;
            }
            return ret;
        });

        // ------------------------------------------------------------
        $loc.json = new Sk.builtin.func(function (self) {
            if (self.closed) {
                throw new Sk.builtin.ValueError("I/O operation on closed file");
            }
            var len = self.data$.length;
            var ret = new Sk.builtin.str(self.data$.substr(self.pos$, len));
            self.pos$ += len;
            if (self.pos$ >= len) {
                self.pos$ = len;
            }
            const obj = JSON.parse(ret.v);
            kvs = [];
            for (var i in obj) {
                kvs.push(Sk.ffi.remapToPy(i));
                kvs.push(Sk.ffi.remapToPy(obj[i]));
            }
            return new Sk.builtin.dict(kvs);
        });
    };

    requests.Response =
        Sk.misceval.buildClass(requests, response, 'Response', []);


    //~ Module functions ........................................................

    // ------------------------------------------------------------
    /**
     * Constructs and sends a Request. Returns Response object.
     *  
     * For now, this implementation doesn't actually construct a Request
     * object; it just makes the request through jQuery.ajax and then
     * constructs a Response.
     */
    var request = function (method, url, data, json, headers) {
        Sk.builtin.pyCheckArgsLen("request", arguments.length, 2, 5);
        Sk.builtin.pyCheckType("method", "string", Sk.builtin.checkString(method));
        Sk.builtin.pyCheckType("url", "string", Sk.builtin.checkString(url));
        var resolution;
        var prom = new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener("loadend", function (e) {
                resolve(Sk.misceval.callsimArray(requests.Response, [xmlhttp]));
            });
            xmlhttp.open(method, "/utils/Backend/adacraftProxy.php?url=" + url.v);
            if (!data.v) {
                xmlhttp.send(null);
            } else {
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send(data.v);
            }
        });
        var susp = new Sk.misceval.Suspension();

        susp.resume = function () {
            return resolution;
        };

        susp.data = {
            type: "Sk.promise",
            promise: prom.then(function (value) {
                if (value.data$.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/g)) { //if it's an html page
                    value.data$ = value.data$.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/g)[0]; // only keep the body
                    value.data$ = value.data$.replaceAll(/<\s*script[^>]*>([\s\S]*)<\s*\/\s*script\s*>/g, ''); // remove scripts
                    value.data$ = value.data$.replaceAll(/<\s*img([\w\W]+?)(\/){0,1}\s*>/g, ''); // remove images
                    value.data$ = value.data$.replaceAll(/\n+/g, '\n');
                }
                resolution = value;
                return value;
            }, function (err) {
                resolution = err;
                return err;
            })
        };
        return susp;
    };

    request.co_varnames = ['method', 'url', 'data', 'json', 'headers'];
    request.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];

    requests.request = new Sk.builtin.func(request);

    var get = function (url, data, json, headers) {
        return requests.request.tp$init([new Sk.builtin.str('GET'), url, data, json, headers])
    };
    get.co_varnames = ['url', 'data', 'json', 'headers'];
    get.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];

    requests.get = new Sk.builtin.func(get);

    var post = function (url, data, json, headers) {
        return requests.request.tp$init([new Sk.builtin.str('POST'), url, data, json, headers])
    };
    post.co_varnames = ['url', 'data', 'json', 'headers'];
    post.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];

    requests.post = new Sk.builtin.func(post);

    return requests;
};
