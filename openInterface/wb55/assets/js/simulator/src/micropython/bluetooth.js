// STM32 ubluetooth module

var $builtinmodule = function () {

	var bluetooth = {};

    var local_data = {
        BLE: {
            state: false,
            mac: ("undefined", null)
        },
        UUID: {
            addr: null
        }
    }

	bluetooth.__name__ = new Sk.builtin.str("ubluetooth");

	// flag constants
	bluetooth.FLAG_READ = new Sk.builtin.int_(2);
	bluetooth.FLAG_WRITE = new Sk.builtin.int_(8);
	bluetooth.FLAG_NOTIFY = new Sk.builtin.int_(16);
	bluetooth.FLAG_INDICATE = new Sk.builtin.int_(32);
	bluetooth.FLAG_WRITE_NO_RESPONSE = new Sk.builtin.int_(4);

	bluetooth.BLE = new Sk.misceval.buildClass(bluetooth, function ($gbl, $loc) {

		var BLE__init__ = function (self) {
		};

		BLE__init__.co_varnames = ['self'];
		BLE__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(BLE__init__);

        $loc.active = new Sk.builtin.func(function (self, state) {
			if (state !== undefined) {
                Sk.builtin.pyCheckType("state", "boolean", Sk.builtin.checkBool(state));
                local_data.BLE.state = state.v;
            } else {
                return new Sk.builtin.bool(local_data.BLE.state);
            }
		});

        const ADDR_MODE = {
            PUBLIC: 0x00, // Use the controller’s public address.
            RANDOM: 0x01, // Use a generated static address.
            RPA: 0x02,    // Use resolvable private addresses.
            NRPA: 0x03    // Use non-resolvable private addresses.
        };

        config = function (self, mac, addr_mode) {
            Sk.builtin.pyCheckArgsLen("config", arguments.length, 2, 3);
            Sk.builtin.pyCheckType("mac", "string", Sk.builtin.checkString(mac));
            Sk.builtin.pyCheckType("addr_mode", "integer", Sk.builtin.checkInt(addr_mode));
            self.addr_mode = addr_mode.v;
            if (mac.v == "mac") {
                const byte_mac = [0x02, 0x02, 0x27, 0x4e, 0x3d, 0x0e];
                return new Sk.builtin.tuple([ADDR_MODE.PUBLIC, byte_mac]);
            } else {
                throw new Sk.builtin.ValueError("unkown config param");
            }
		};

        config.co_varnames = ['self', 'mac', 'addr_mode'];
		config.$defaults = [new Sk.builtin.int_(ADDR_MODE.PUBLIC)];

        $loc.config = new Sk.builtin.func(config);

        $loc.irq = new Sk.builtin.func(function (self, callback) {
            Sk.builtin.pyCheckArgsLen("irq", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("callback", "callable", Sk.builtin.checkCallable(callback));
            self.irq = callback.func_code;
		});

        $loc.gap_advertise = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gap_advertise() is not yet implemented");
		});

        $loc.gap_connect = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gap_connect() is not yet implemented");
		});

        $loc.gap_scan = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gap_scan() is not yet implemented");
		});

        $loc.gap_disconnect = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gap_disconnect() is not yet implemented");
		});

        $loc.gatts_register_services = new Sk.builtin.func(function (self, services) {
            Sk.builtin.pyCheckArgsLen("gatts_register_services", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("services", "iterable", Sk.builtin.checkIterable(services));
            return new Sk.builtin.tuple(["tx_handle", "rx_handle"]);
		});

        $loc.gatts_notify = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gatts_notify() is not yet implemented");
		});

        $loc.gatts_indicate = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gatts_indicate() is not yet implemented");
		});

        $loc.gatts_set_buffer = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gatts_set_buffer() is not yet implemented");
		});

        $loc.gattc_discover_services = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_discover_services() is not yet implemented");
		});

        $loc.gattc_discover_characteristics = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_discover_characteristics() is not yet implemented");
		});

        $loc.gattc_discover_descriptors = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_discover_descriptors() is not yet implemented");
		});

        $loc.gattc_read = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_read() is not yet implemented");
		});

        $loc.gattc_write = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_write() is not yet implemented");
		});

        $loc.gattc_exchange_mtu = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("BLE.gattc_exchange_mtu() is not yet implemented");
		});

	});

    bluetooth.UUID = new Sk.misceval.buildClass(bluetooth, function ($gbl, $loc) {

		UUID__init__ = function (self, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("addr", "string", Sk.builtin.checkString(addr));
            self.addr = addr.v;
		};

		UUID__init__.co_varnames = ['self', 'addr'];
		UUID__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(UUID__init__);

	});

	return bluetooth;
};
