// Esp32 - socket module

var $builtinmodule = function () {

    var socket = {};

    socket.__name__ = new Sk.builtin.str('usocket');
    socket.__init__ = new Sk.builtin.func(function () { });

    // af
    socket.AF_INET = new Sk.builtin.int_(2);
    socket.AF_INET6 = new Sk.builtin.int_(10);
    // sock
    socket.SOCK_STREAM = new Sk.builtin.int_(1);
    socket.SOCK_DGRAM = new Sk.builtin.int_(2);
    socket.SOCK_RAW = new Sk.builtin.int_(3);
    // ip proto
    socket.IPPROTO_TCP = new Sk.builtin.int_(6);
    socket.IPPROTO_UDP = new Sk.builtin.int_(17);
    socket.IPPROTO_IP = new Sk.builtin.int_(0);

    socket.SOL_SOCKET = new Sk.builtin.int_(4095);
    socket.SO_REUSEADDR = new Sk.builtin.int_(4);
    socket.IP_ADD_MEMBERSHIP = new Sk.builtin.int_(3);

    getaddrinfo = function (host, port, af, type, proto, flags) {
        throw new Sk.builtin.NotImplementedError('socket.getaddrinfo is not yet implemented');
    };

    getaddrinfo.co_varnames = ['host', 'port', 'af', 'type', 'proto', 'flags'];
    getaddrinfo.$defaults = [new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)];

    socket.getaddrinfo = new Sk.builtin.func(getaddrinfo);

    socket.clientSocket = new Sk.misceval.buildClass(socket, function ($gbl, $loc) {

        clientSocket__init__ = function (self, addr) {
        };

        clientSocket__init__.co_varnames = ['self', 'addr'];
        clientSocket__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(clientSocket__init__);

    }, "clientSocket", []);

    socket.socket = new Sk.misceval.buildClass(socket, function ($gbl, $loc) {

        socket__init__ = function (self, af, type, proto) {
            self.closed = true;
            self.bound = false;
            self.type = null;
            return Sk.builtin.none();
        };

        socket__init__.co_varnames = ['self', 'af', 'type', 'proto'];
        socket__init__.$defaults = [socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP];

        $loc.__init__ = new Sk.builtin.func(socket__init__);

        $loc.__del__ = new Sk.builtin.func(function (self) {
        });

        $loc.close = new Sk.builtin.func(function (self) {
            self.closed = true;
            if (self.type == 'client') {
                WifiSimulator.esp32_client.closeSocket()
            } else {
                WifiSimulator.server.closeSocket()
            }
            return Sk.builtin.none();
        });

        $loc.bind = new Sk.builtin.func(function (self, address) {
            Sk.builtin.pyCheckArgsLen("bind", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("address", "tuple or list", Sk.builtin.checkIterable(address));
            if (!self.bound) {
                const addr = Sk.ffi.remapToJs(address);
                if (addr.length !== 2) {
                    //throw 
                }
                self.bound = true;
                WifiSimulator.server.bind({ip: addr[0], port: addr[1], hostname: WifiSimulator.DHCP_hostname});
            }
            return Sk.builtin.none();
        });

        var listen = function (self, backlog) {
            Sk.builtin.pyCheckArgsLen("listen", arguments.length, 1, 2);
            Sk.builtin.pyCheckType("backlog", "int", Sk.builtin.checkInt(backlog));
            if (backlog.v <= 0) {
                self.backlog = 0;
            } else {
                self.backlog = backlog.v;
            }
            return Sk.builtin.none();
        };

        listen.co_varnames = ['self', 'backlog'];
        listen.$defaults = [new Sk.builtin.int_(5)];
        $loc.listen = new Sk.builtin.func(listen);

        $loc.accept = new Sk.builtin.func(function (self) {
            return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
                WifiSimulator.server.acceptInterval = setInterval(function () {
                    if (Simulator.isRunning) {
                        const clientSocket = WifiSimulator.server.getNextClient();
                        if (clientSocket) {
                            var client = new socket.socket();
                            client.tp$init(socket__init__.$defaults);
                            WifiSimulator.server.setCurrentClientSocket(clientSocket);
                            clearInterval(WifiSimulator.server.acceptInterval);
                            if (clientSocket.addr[0]) {
                                resolve(new Sk.builtin.tuple([client, Sk.ffi.remapToPy(clientSocket.addr)]));
                            } else if (clientSocket.hostname) {
                                resolve(new Sk.builtin.tuple([client, Sk.ffi.remapToPy([clientSocket.hostname, clientSocket.addr[1]])]));
                            }
                        }
                    }
                }, 100);
            }));
        });

        $loc.connect = new Sk.builtin.func(function (self, addr) {
            return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
                const addr_val = Sk.ffi.remapToJs(addr);
                WifiSimulator.esp32_client.requestConnection({ip: addr_val[0], port: addr_val[1], hostname: WifiSimulator.DHCP_hostname});
                WifiSimulator.esp32_client.connectInterval = setInterval(function () {
                    const connected = WifiSimulator.esp32_client.isServerReady();
                    if (connected) {
                        self.type = 'client';
                        clearInterval(WifiSimulator.esp32_client.connectInterval);
                        resolve(Sk.builtin.none());
                    }
                }, 100);
            }))
        });

        $loc.recv = new Sk.builtin.func(function (self, bufsize) {
            if (self.type == 'client') {
                return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
                    WifiSimulator.esp32_client.serverDataInterval = setInterval(function () {
                        const data = WifiSimulator.esp32_client.getCurrentServerData();
                        if (data) {
                            clearInterval(WifiSimulator.esp32_client.serverDataInterval);
                            resolve(new Sk.builtin.bytes(data));
                        }
                    }, 100);
                }));
            } else {
                let receivePromise = new Promise(function (resolve) {
                    WifiSimulator.server.clientDataInterval = setInterval(function () {
                        const data = WifiSimulator.server.waitingCurrentClientData();
                        if (data) {
                            clearInterval(WifiSimulator.server.clientDataInterval);
                            WifiSimulator.server.clientDataInterval = null;
                            resolve(new Sk.builtin.bytes(data));
                        } else if (WifiSimulator.server.timeout == 1) {
                            clearInterval(WifiSimulator.server.clientDataInterval);
                            WifiSimulator.server.clientDataInterval = null;
                            resolve(new Sk.builtin.bytes("None"));
                        } else if (WifiSimulator.server.timeout == -1) {
                            clearInterval(WifiSimulator.server.clientDataInterval);
                            WifiSimulator.server.clientDataInterval = null;
                            resolve(new Sk.builtin.bytes([]));
                        }
                    }, 100);
                })
                receivePromise.then(function () {
                    if (WifiSimulator.server.timeout == -1) {
                        throw new Sk.builtin.OSError("OSError: TIMEOUT")
                    }
                    WifiSimulator.server.timeout = 0;
                });
                return new Sk.misceval.promiseToSuspension(receivePromise);
            }
        });

        $loc.send = new Sk.builtin.func(function (self, data) {
            if (self.type == 'client') {
                WifiSimulator.esp32_client.sendDataToCurrentServer(data.v);
            } else {
                WifiSimulator.server.sendDataToCurrentClient(data.v, 'sent');
            }
            return Sk.builtin.none();
        });

        $loc.sendall = new Sk.builtin.func(function (self, data) {
            WifiSimulator.server.sendDataToCurrentClient(data.v, 'sentAll');
            return Sk.builtin.none();
        });

        $loc.settimeout = new Sk.builtin.func(function (self, timeout) {
            WifiSimulator.server.timeout = 0;
            Sk.builtin.pyCheckArgsLen("settimeout", arguments.length, 2, 2);
            if (Sk.builtin.checkNone(timeout)) {
                if (WifiSimulator.server.receiveRequestInterval !== null) {
                    WifiSimulator.server.timeout = 1;
                }
            } else if (Sk.builtin.checkNumber(timeout)) {
                return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
                    WifiSimulator.server.receiveTimeout = setTimeout(function () {
                        if (WifiSimulator.server.receiveRequestInterval !== null) {
                            WifiSimulator.server.timeout = -1;
                        }
                    }, timeout.v * 1000);
                    WifiSimulator.server.receiveRequestInterval = setInterval(function () {
                        if (WifiSimulator.server.timeout == 1) {
                            clearTimeout(WifiSimulator.server.receiveTimeout);
                            clearInterval(WifiSimulator.server.receiveRequestInterval);
                            WifiSimulator.server.receiveRequestInterval = null;
                            WifiSimulator.server.receiveTimeout = null;
                        } else if (WifiSimulator.server.timeout == -1) {
                            clearInterval(WifiSimulator.server.receiveRequestInterval);
                            WifiSimulator.server.receiveRequestInterval = null;
                        }
                    }, 100);
                    return resolve(Sk.builtin.none());
                }));
            }
        });

    }, "socket", []);

    return socket;
};