const $builtinmodule = function () {

    const Winky_base = {};

    SIZE_MAX_PACKET = 20;
    SIZE_BLE_PROTOCOL = 8;
    SIZE_MAX_DATA_BLE = 12;
    SIZE_FLETCHER_16 = 2;

    BLE_TID = 0;
    BLE_NPACK_1 = 1;
    BLE_NPACK_2 = 2;
    BLE_NPACK_3 = 3;
    BLE_SEQ_1 = 4;
    BLE_SEQ_2 = 5;
    BLE_SEQ_3 = 6;
    BLE_LEN = 7;
    BLE_COMMAND = 8;

    COMMAND_SUCCES = 1

    COMMAND_ERROR = 0
    COMMAND_ERROR_BLE_NOT_CONNECTED = -1
    COMMAND_ERROR_BLE = -2
    COMMAND_ERROR_NAME_NO_FOUND = -3
    COMMAND_ERROR_NOTIFY = -4

    COMMAND_ERROR_WS_SEND = -50
    COMMAND_ERROR_COMMAND_PARAM = -51

    const Fletcher16 = function (data) {
        let sum1 = 0;
        let sum2 = 0;

        for (let i = 0; i < data.length; i++) {
            sum1 = (sum1 + data[i]) % 255;
            sum2 = (sum2 + sum1) % 255;
        }

        return (sum2 << 8) | sum1;
    };

    const GetFletcher16 = function (data) {
        const csum = Fletcher16(data);
        const f0 = csum & 0xff;
        const f1 = (csum >> 8) & 0xff;
        const c0 = 0xff - ((f0 + f1) % 0xff);
        const c1 = 0xff - ((f0 + c0) % 0xff);

        return (c0 << 8) | c1;
    };

    const get_byte = function (data, selection) {
        let out = 0;

        if (selection === 0) {
            out = data & 0xFF;
        } else if (selection === 1) {
            out = (data >> 8) & 0xFF;
        } else if (selection === 2) {
            out = (data >> 16) & 0xFF;
        } else if (selection === 3) {
            out = (data >> 24) & 0xFF;
        }

        return out;
    };

    Winky_base.Winky_base = new Sk.misceval.buildClass(Winky_base, function ($gbl, $loc) {

        Winky_base__init__ = function (self) {
            console.log('Winky_base init');
        };

        $loc.__init__ = new Sk.builtin.func(Winky_base__init__);

        $loc.connect = new Sk.builtin.func((self, id) => {
            self.tid = Math.floor(Math.random() * 254) + 1;
            return Sk.builtin.none();
        });

        $loc.get_status = new Sk.builtin.func((self) => {
            return Sk.builtin.bool(WEB_BLE.currentDevice !== null);
        });

        $loc.send_winkyscript = new Sk.builtin.func((self, command) => {
            if (WEB_BLE.currentDevice === null) {
                return new Sk.builtin.int_(COMMAND_ERROR_BLE_NOT_CONNECTED);
            }

            command = new Uint8Array(Sk.ffi.remapToJs(command));
            const len_c = command.length;
            let n_pack = 0;
            let seq = 0;
            let cursor_command = 0;
            let fletcher = 0;

            const ble_packet = new Uint8Array(20);
            let len_packet = 0;

            if (len_c > 1008) {
                return new Sk.builtin.int_(COMMAND_ERROR_COMMAND_PARAM);
            } else if (len_c > 10) {
                n_pack = Math.floor((len_c + 2) / 12);
                if ((len_c + 2) % 12 !== 0) {
                    n_pack += 1;
                }
            } else {
                n_pack = 1;
            }

            // For debug
            // console.log(`n_pack : ${n_pack}`);
            // console.log(`tid : ${self.tid}`);

            fletcher = GetFletcher16(command);
            seq = n_pack - 1;
            ble_packet[BLE_TID] = self.tid;

            for (let i = 0; i < n_pack; i++) {
                ble_packet[BLE_NPACK_1] = get_byte(n_pack, 2);
                ble_packet[BLE_NPACK_2] = get_byte(n_pack, 1);
                ble_packet[BLE_NPACK_3] = get_byte(n_pack, 0);

                ble_packet[BLE_SEQ_1] = get_byte(seq, 2);
                ble_packet[BLE_SEQ_2] = get_byte(seq, 1);
                ble_packet[BLE_SEQ_3] = get_byte(seq, 0);

                if (seq === 0) {
                    ble_packet[BLE_LEN] = len_c + SIZE_FLETCHER_16;

                    for (let j = 0; j < len_c; j++) {
                        ble_packet[BLE_COMMAND + j] = command[cursor_command];
                        cursor_command += 1;
                    }

                    ble_packet[BLE_COMMAND + len_c] = get_byte(fletcher, 1);
                    ble_packet[BLE_COMMAND + len_c + 1] = get_byte(fletcher, 0);

                    len_packet = SIZE_BLE_PROTOCOL + ble_packet[BLE_LEN];
                } else {
                    ble_packet[BLE_LEN] = SIZE_MAX_DATA_BLE;

                    for (let j = 0; j < SIZE_MAX_DATA_BLE; j++) {
                        ble_packet[BLE_COMMAND + j] = command[cursor_command];
                        cursor_command += 1;
                    }

                    len_c -= SIZE_MAX_DATA_BLE;
                    len_packet = SIZE_MAX_PACKET;
                }

                // Write to GATT characteristic
                WEB_BLE.writeValue(WEB_BLE.actuatorsCharacteristic, new Uint8Array(ble_packet.slice(0, len_packet)));

                seq -= 1;
            }

            if (self.tid > 254) {
                self.tid = 0;
            }
            self.tid += 1;
            return new Sk.builtin.int_(COMMAND_SUCCES);
        });

        $loc.get_sensor = new Sk.builtin.func((self) => {
            new_sensor_data = WEB_BLE.sensor_data.map((data) => new Sk.builtin.int_(data));
            // console.log(new_sensor_data); For debug
            return new Sk.builtin.list(new_sensor_data);
        });

    }, "Winky_base");

    return Winky_base;
};
