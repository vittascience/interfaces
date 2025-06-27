// Esp32 - network module

var $builtinmodule = function (name) {

    var network = {};

    network.__name__ = new Sk.builtin.str('network');

    // IF
    network.STA_IF = new Sk.builtin.int_(0);
    network.AP_IF = new Sk.builtin.int_(1);
    // modes
    network.MODE_11B = new Sk.builtin.int_(1);
    network.MODE_11G = new Sk.builtin.int_(2);
    network.MODE_11N = new Sk.builtin.int_(4);
    // auth
    network.AUTH_OPEN = new Sk.builtin.int_(0);
    network.AUTH_WEP = new Sk.builtin.int_(1);
    network.AUTH_WPA_PSK = new Sk.builtin.int_(2);
    network.AUTH_WPA2_PSK = new Sk.builtin.int_(2);
    network.AUTH_WPA_WPA2_PSK = new Sk.builtin.int_(4);
    network.AUTH_WPA2_ENTERPRISE = new Sk.builtin.int_(5);
    network.AUTH_WPA3_PSK = new Sk.builtin.int_(6);
    network.AUTH_WPA2_WPA3_PSK = new Sk.builtin.int_(7);
    network.AUTH_MAX = new Sk.builtin.int_(8);
    // phy
    network.PHY_LAN8720 = new Sk.builtin.int_(0);
    network.PHY_IP101 = new Sk.builtin.int_(1);
    network.PHY_RTL8201 = new Sk.builtin.int_(2);
    network.PHY_DP83848 = new Sk.builtin.int_(3);
    // eth
    network.ETH_INITIALIZED = new Sk.builtin.int_(0);
    network.ETH_STARTED = new Sk.builtin.int_(1);
    network.ETH_STOPPED = new Sk.builtin.int_(2);
    network.ETH_CONNECTED = new Sk.builtin.int_(3);
    network.ETH_DISCONNECTED = new Sk.builtin.int_(4);
    network.ETH_GOT_IP = new Sk.builtin.int_(5);
    // stat
    network.STAT_IDLE = new Sk.builtin.int_(1000);
    network.STAT_CONNECTING = new Sk.builtin.int_(1001);
    network.STAT_GOT_IP = new Sk.builtin.int_(1010);
    network.STAT_NO_AP_FOUND = new Sk.builtin.int_(201);
    network.STAT_WRONG_PASSWORD = new Sk.builtin.int_(202);
    network.STAT_BEACON_TIMEOUT = new Sk.builtin.int_(200);
    network.STAT_ASSOC_FAIL = new Sk.builtin.int_(203);
    network.STAT_HANDSHAKE_TIMEOUT = new Sk.builtin.int_(204);

    network.WLAN = new Sk.misceval.buildClass(network, function ($gbl, $loc) {

        WLAN__init__ = function (self, interface_id) {
            self.interface_id = interface_id.v;
            self.config = {};
            if (self.interface_id == network.STA_IF.v) {
                self.config.max_clients = 98;
                self.config.channel = null;
                self.config.hidden = null;
            } else if (self.interface_id == network.AP_IF.v) {
                self.config.max_clients = 4;
                self.config.channel = 1;
                self.config.hidden = false;
            }
            self.config.mac = WifiSimulator.mac;
            self.config.authmode = network.AUTH_OPEN.v;
            self.config.essid = "";
            self.config.dhcp_hostname = "espressif";
            WifiSimulator.DHCP_hostname = self.config.dhcp_hostname;
            self.is_active = false;
            self.isconnected = false;
            self.status = network.STAT_IDLE.v;
            self.ifconfig = ['0.0.0.0', '0.0.0.0', '0.0.0.0', '0.0.0.0'];
            return Sk.builtin.none();
        };

        WLAN__init__.co_varnames = ['self', 'interface_id'];
        WLAN__init__.$defaults = [network.STA_IF];

        $loc.__init__ = new Sk.builtin.func(WLAN__init__);

        $loc.active = new Sk.builtin.func(function (self, is_active) {
            if (is_active === undefined) {
                return new Sk.builtin.bool(self.is_active);
            } else {
                self.is_active = is_active.v;
                return Sk.builtin.none();
            }
        });

        $loc.connect = new Sk.builtin.func(function (self, ssid, password) {
            Sk.builtin.pyCheckArgsLen("connect", arguments.length, 2, 3);
            Sk.builtin.pyCheckType("ssid", "string", Sk.builtin.checkString(ssid));
            Sk.builtin.pyCheckType("password", "string", Sk.builtin.checkString(password));
            if (ssid.v.length > 0) {
                self.config.essid = ssid.v;
                self.config.password = password.v;
                self.isconnected = true;
            } else {
                throw new Sk.builtin.OSError("Wifi SSID Invalid")
            }
            return Sk.builtin.none();
        });

        $loc.disconnect = new Sk.builtin.func(function (self) {
            self.isconnected = false;
            return Sk.builtin.none();
        });

        /**
         * Scan for the available wireless networks. Hidden networks – where the SSID is not broadcast – will also be scanned if the WLAN interface allows it.
            Scanning is only possible on STA interface. Returns list of tuples with the information about WiFi access points:

            (ssid, bssid, channel, RSSI, authmode, hidden)

            bssid is hardware address of an access point, in binary form, returned as bytes object. You can use binascii.hexlify() to convert it to ASCII form.

            There are five values for authmode:
            0 – open
            1 – WEP
            2 – WPA-PSK
            3 – WPA2-PSK
            4 – WPA/WPA2-PSK

            and two for hidden:
            0 – visible
            1 – hidden
         */
        $loc.scan = new Sk.builtin.func(function (self) {
            if (self.is_active) {
                return new Sk.builtin.list([]);
            } else {
                throw new Sk.builtin.SystemError('STA must be active');
            }
        });

        $loc.status = new Sk.builtin.func(function (self, param) {
            if (param === undefined) {
                return new Sk.builtin.int_(self.status);
            } else {
                self.status = param.v;
                return Sk.builtin.none();
            }
        });

        $loc.isconnected = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(self.isconnected);
        });

        $loc.ifconfig = new Sk.builtin.func(function (self, param) {
            if (param === undefined) {
                return Sk.ffi.remapToPy(self.ifconfig);
            } else {
                self.ifconfig = Sk.ffi.remapToJs(param);
                WifiSimulator.static_IP = self.ifconfig[0];
                return Sk.builtin.none();
            }
        });

        var config = function (self, param, essid, password, max_clients, dhcp_hostname) {
            if (Sk.ffi.remapToJs(param) === null) {
                const ssid = Sk.ffi.remapToJs(essid);
                if (ssid !== null) {
                    Sk.builtin.pyCheckType("essid", "string", Sk.builtin.checkString(essid));
                    self.config.essid = essid.v;
                }
                const pwd = Sk.ffi.remapToJs(password);
                if (pwd !== null) {
                    Sk.builtin.pyCheckType("password", "string", Sk.builtin.checkString(password));
                    self.config.password = password.v;
                }
                const hostname = Sk.ffi.remapToJs(dhcp_hostname);
                if (hostname !== null) {
                    Sk.builtin.pyCheckType("dhcp_hostname", "string", Sk.builtin.checkString(dhcp_hostname));
                    self.config.dhcp_hostname = dhcp_hostname.v;
                    WifiSimulator.DHCP_hostname = self.config.dhcp_hostname;
                }
                const max_c = Sk.ffi.remapToJs(max_clients);
                if (max_c !== null) {
                    Sk.builtin.pyCheckType("max_clients", "int", Sk.builtin.checkInt(max_clients));
                    if (self.interface_id === network.AP_IF.v) {
                        if (max_c > 10) {
                            self.config.max_clients = 10;
                        } else {
                            self.config.max_clients = max_c;
                        }

                    } else {
                        throw new Sk.builtin.OSError("AP required");
                    }
                }
            } else {
                Sk.builtin.pyCheckType("param", "string", Sk.builtin.checkString(param));
                if (param.v === 'essid') {
                    return new Sk.builtin.str(self.config.essid);
                } else if (param.v === 'password') {
                    throw new Sk.builtin.ValueError("unknown config param");
                } else if (param.v === 'mac') {
                    return new Sk.builtin.bytes(self.config.mac);
                } else if (param.v === 'max_clients') {
                    return new Sk.builtin.int_(self.config.max_clients);
                } else if (param.v === 'dhcp_hostname') {
                    return new Sk.builtin.str(self.config.dhcp_hostname);
                } else if (param.v === 'channel') {
                    if (self.interface_id === network.AP_IF.v) {
                        return new Sk.builtin.int_(self.config.channel);
                    } else {
                        throw new Sk.builtin.OSError("AP required");
                    }
                } else if (param.v === 'hidden') {
                    if (self.interface_id === network.AP_IF.v) {
                        return new Sk.builtin.bool(self.config.hidden);
                    } else {
                        throw new Sk.builtin.OSError("AP required");
                    }
                } else if (param.v === 'authmode') {
                    return new Sk.builtin.int_(self.config.authmode);
                } else {
                    throw new Sk.builtin.ValueError("unknown config param");
                }
            }
        };

        config.co_varnames = ['self', 'param', 'essid', 'password', 'max_clients', 'dhcp_hostname', 'channel', 'hidden'];
        config.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];
        $loc.config = new Sk.builtin.func(config);

    }, "WLAN", []);

    network.LAN = new Sk.misceval.buildClass(network, function ($gbl, $loc) {

        LAN__init__ = function (self) {
            throw new Sk.builtin.NotImplementedError("<network.LAN> is not yet implemented");
            return Sk.builtin.none();
        };

        LAN__init__.co_varnames = ['self'];
        LAN__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(LAN__init__);

    }, "LAN", []);


    network.ppp = new Sk.misceval.buildClass(network, function ($gbl, $loc) {

        ppp__init__ = function (self) {
            throw new Sk.builtin.NotImplementedError("<network.ppp> is not yet implemented");
            return Sk.builtin.none();
        };

        ppp__init__.co_varnames = ['self'];
        ppp__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(ppp__init__);

    }, "ppp", []);

    network.phy_mode = new Sk.builtin.func(function (mode) {
        throw new Sk.builtin.OSError("network.phy_mode() not available on ESP32.")
    });

    return network;
};
