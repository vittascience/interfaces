// Raspberry Pi - board module for Skulpt
// Python 3 / Adafruit Blinka-style board module simulation for Raspberry Pi 40-pin.
//
// Typical usage:
//   import board
//   i2c = board.I2C()
//   spi = board.SPI()
//   uart = board.UART()
//   print(board.SCL)
//
// This version intentionally uses a real Pin class instead of generic objects,
// because Skulpt exposes Python attributes more reliably on class instances.

var $builtinmodule = function (name) {

    var board = {};

    board.__name__ = new Sk.builtin.str("board");
    board.board_id = new Sk.builtin.str("RASPBERRY_PI_40PIN_SKULPT");

    const pyNone = function () {
        return Sk.builtin.none();
    };

    const isNone = function (value) {
        return value === undefined || Sk.builtin.checkNone(value);
    };

    const toJs = function (value) {
        return Sk.ffi.remapToJs(value);
    };

    const toInt = function (value, name) {
        Sk.builtin.pyCheckType(name, "integer", Sk.builtin.checkInt(value));
        return value.v;
    };

    const toBool = function (value, fallback) {
        if (isNone(value)) return fallback;
        if (Sk.builtin.checkBool(value)) return value.v;
        return !!toJs(value);
    };

    const Pin = Sk.misceval.buildClass(board, function ($gbl, $loc) {

        const __init__ = function (self, id, bcm, board_pin) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 4, 4);
            Sk.builtin.pyCheckType("id", "string", Sk.builtin.checkString(id));
            Sk.builtin.pyCheckType("bcm", "integer", Sk.builtin.checkInt(bcm));

            self.id = id.v;
            self.name = id.v;
            self.bcm = bcm.v;
            self.board = Sk.builtin.checkNone(board_pin) ? null : board_pin.v;

            return pyNone();
        };

        __init__.co_varnames = ["self", "id", "bcm", "board_pin"];
        $loc.__init__ = new Sk.builtin.func(__init__);

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str("board." + self.id);
        });

        $loc.__repr__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str("board." + self.id);
        });

        $loc.__eq__ = new Sk.builtin.func(function (self, other) {
            return new Sk.builtin.bool(other && other.bcm === self.bcm);
        });

    }, "Pin");

    board.Pin = Pin;

    const makePin = function (id, bcm, boardPin) {
        return Sk.misceval.callsim(
            Pin,
            new Sk.builtin.str(id),
            new Sk.builtin.int_(bcm),
            boardPin === null ? Sk.builtin.none() : new Sk.builtin.int_(boardPin)
        );
    };

    const getPinName = function (pin) {
        if (pin && typeof pin.id === "string") return pin.id;
        if (pin && typeof pin.name === "string") return pin.name;
        if (Sk.builtin.checkInt(pin)) return "D" + pin.v;
        return String(pin);
    };

    const getPinBcm = function (pin) {
        if (pin && typeof pin.bcm === "number") return pin.bcm;
        if (Sk.builtin.checkInt(pin)) return pin.v;
        return null;
    };

    const fillBuffer = function (buffer, start, end, value) {
        if (!buffer) return;

        const jsBuffer = buffer.v || buffer;
        const len = jsBuffer.length || 0;
        const s = start || 0;
        const e = end === null || end === undefined ? len : Math.min(end, len);

        for (let i = s; i < e; i++) {
            if (jsBuffer[i] && typeof jsBuffer[i] === "object" && "v" in jsBuffer[i]) {
                jsBuffer[i] = new Sk.builtin.int_(value);
            } else {
                jsBuffer[i] = value;
            }
        }
    };

    // BCM pin aliases exposed by Blinka-style board modules.
    board.D0 = makePin("D0", 0, 27);
    board.D1 = makePin("D1", 1, 28);
    board.D2 = makePin("D2", 2, 3);
    board.D3 = makePin("D3", 3, 5);
    board.D4 = makePin("D4", 4, 7);
    board.D5 = makePin("D5", 5, 29);
    board.D6 = makePin("D6", 6, 31);
    board.D7 = makePin("D7", 7, 26);
    board.D8 = makePin("D8", 8, 24);
    board.D9 = makePin("D9", 9, 21);
    board.D10 = makePin("D10", 10, 19);
    board.D11 = makePin("D11", 11, 23);
    board.D12 = makePin("D12", 12, 32);
    board.D13 = makePin("D13", 13, 33);
    board.D14 = makePin("D14", 14, 8);
    board.D15 = makePin("D15", 15, 10);
    board.D16 = makePin("D16", 16, 36);
    board.D17 = makePin("D17", 17, 11);
    board.D18 = makePin("D18", 18, 12);
    board.D19 = makePin("D19", 19, 35);
    board.D20 = makePin("D20", 20, 38);
    board.D21 = makePin("D21", 21, 40);
    board.D22 = makePin("D22", 22, 15);
    board.D23 = makePin("D23", 23, 16);
    board.D24 = makePin("D24", 24, 18);
    board.D25 = makePin("D25", 25, 22);
    board.D26 = makePin("D26", 26, 37);
    board.D27 = makePin("D27", 27, 13);

    // Extra aliases sometimes exposed on Compute Module-oriented definitions.
    board.D28 = makePin("D28", 28, null);
    board.D29 = makePin("D29", 29, null);
    board.D30 = makePin("D30", 30, null);
    board.D31 = makePin("D31", 31, null);
    board.D32 = makePin("D32", 32, null);
    board.D33 = makePin("D33", 33, null);
    board.D34 = makePin("D34", 34, null);
    board.D35 = makePin("D35", 35, null);
    board.D36 = makePin("D36", 36, null);
    board.D37 = makePin("D37", 37, null);
    board.D38 = makePin("D38", 38, null);
    board.D39 = makePin("D39", 39, null);
    board.D40 = makePin("D40", 40, null);
    board.D41 = makePin("D41", 41, null);
    board.D42 = makePin("D42", 42, null);
    board.D43 = makePin("D43", 43, null);
    board.D44 = makePin("D44", 44, null);
    board.D45 = makePin("D45", 45, null);

    // I2C aliases.
    board.SDA = board.D2;
    board.SCL = board.D3;

    // SPI0 aliases.
    board.CE1 = board.D7;
    board.CE0 = board.D8;
    board.MISO = board.D9;
    board.MOSI = board.D10;
    board.SCLK = board.D11;
    board.SCK = board.D11;

    // UART aliases.
    board.TXD = board.D14;
    board.RXD = board.D15;
    board.TX = board.D14;
    board.RX = board.D15;

    // SPI1 aliases.
    board.MISO_1 = board.D19;
    board.MOSI_1 = board.D20;
    board.SCLK_1 = board.D21;
    board.SCK_1 = board.D21;

    // SPI2 aliases, mostly for broader compatibility.
    board.MISO_2 = board.D40;
    board.MOSI_2 = board.D41;
    board.SCLK_2 = board.D42;
    board.SCK_2 = board.D43;

    board.GND = makePin("GND", -1, null);
    board.VOLTAGE_MONITOR = makePin("VOLTAGE_MONITOR", -1, null);

    board.i2cPorts = new Sk.builtin.tuple([
        new Sk.builtin.tuple([new Sk.builtin.int_(1), board.SCL, board.SDA]),
        new Sk.builtin.tuple([new Sk.builtin.int_(0), board.D1, board.D0])
    ]);

    board.spiPorts = new Sk.builtin.tuple([
        new Sk.builtin.tuple([new Sk.builtin.int_(0), board.SCLK, board.MOSI, board.MISO]),
        new Sk.builtin.tuple([new Sk.builtin.int_(1), board.SCLK_1, board.MOSI_1, board.MISO_1]),
        new Sk.builtin.tuple([new Sk.builtin.int_(2), board.SCLK_2, board.MOSI_2, board.MISO_2])
    ]);

    board.uartPorts = new Sk.builtin.tuple([
        new Sk.builtin.tuple([new Sk.builtin.int_(1), board.TXD, board.RXD])
    ]);

    const findI2CPort = function (scl, sda) {
        const sclBcm = getPinBcm(scl);
        const sdaBcm = getPinBcm(sda);
        if (sclBcm === 3 && sdaBcm === 2) return 1;
        if (sclBcm === 1 && sdaBcm === 0) return 0;
        return null;
    };

    const findSPIPort = function (clock, mosi, miso) {
        const sckBcm = getPinBcm(clock);
        const mosiBcm = getPinBcm(mosi);
        const misoBcm = getPinBcm(miso);
        if (sckBcm === 11 && mosiBcm === 10 && misoBcm === 9) return 0;
        if (sckBcm === 21 && mosiBcm === 20 && misoBcm === 19) return 1;
        if (sckBcm === 42 && mosiBcm === 41 && misoBcm === 40) return 2;
        return null;
    };

    const findUARTPort = function (tx, rx) {
        const txBcm = getPinBcm(tx);
        const rxBcm = getPinBcm(rx);
        if (txBcm === 14 && rxBcm === 15) return 1;
        return null;
    };

    board.I2C = new Sk.misceval.buildClass(board, function ($gbl, $loc) {

        const I2C__init__ = function (self, scl, sda, frequency) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);

            self.scl = isNone(scl) ? board.SCL : scl;
            self.sda = isNone(sda) ? board.SDA : sda;
            self.frequency = isNone(frequency) ? 100000 : toInt(frequency, "frequency");
            self.bus_id = findI2CPort(self.scl, self.sda);
            self.locked = false;
            self.initialized = true;

            if (self.bus_id === null) {
                throw new Sk.builtin.NotImplementedError(
                    "No Hardware I2C on (scl, sda)=(" + getPinName(self.scl) + ", " + getPinName(self.sda) + ")"
                );
            }

            return pyNone();
        };

        I2C__init__.co_varnames = ["self", "scl", "sda", "frequency"];
        I2C__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(100000)];
        $loc.__init__ = new Sk.builtin.func(I2C__init__);

        const scan = function (self) {
            Sk.builtin.pyCheckArgsLen("scan", arguments.length, 1, 1);
            return new Sk.builtin.list([
                new Sk.builtin.int_(0x29),
                new Sk.builtin.int_(0x3e),
                new Sk.builtin.int_(0x58),
                new Sk.builtin.int_(0x62),
                new Sk.builtin.int_(0x76),
                new Sk.builtin.int_(0x77)
            ]);
        };
        scan.co_varnames = ["self"];
        $loc.scan = new Sk.builtin.func(scan);

        const try_lock = function (self) {
            Sk.builtin.pyCheckArgsLen("try_lock", arguments.length, 1, 1);
            if (self.locked) return new Sk.builtin.bool(false);
            self.locked = true;
            return new Sk.builtin.bool(true);
        };
        try_lock.co_varnames = ["self"];
        $loc.try_lock = new Sk.builtin.func(try_lock);

        const unlock = function (self) {
            Sk.builtin.pyCheckArgsLen("unlock", arguments.length, 1, 1);
            self.locked = false;
            return pyNone();
        };
        unlock.co_varnames = ["self"];
        $loc.unlock = new Sk.builtin.func(unlock);

        const writeto = function (self, address, buffer, stop) {
            Sk.builtin.pyCheckArgsLen("writeto", arguments.length, 3, 4);
            self.last_address = toInt(address, "address");
            self.last_write = buffer;
            self.last_stop = toBool(stop, true);
            return pyNone();
        };
        writeto.co_varnames = ["self", "address", "buffer", "stop"];
        writeto.$defaults = [new Sk.builtin.bool(true)];
        $loc.writeto = new Sk.builtin.func(writeto);

        const readfrom_into = function (self, address, buffer, start, end) {
            Sk.builtin.pyCheckArgsLen("readfrom_into", arguments.length, 3, 5);
            self.last_address = toInt(address, "address");
            fillBuffer(buffer, isNone(start) ? 0 : toInt(start, "start"), isNone(end) ? null : toInt(end, "end"), 0);
            return pyNone();
        };
        readfrom_into.co_varnames = ["self", "address", "buffer", "start", "end"];
        readfrom_into.$defaults = [new Sk.builtin.int_(0), Sk.builtin.none()];
        $loc.readfrom_into = new Sk.builtin.func(readfrom_into);

        const writeto_then_readfrom = function (self, address, out_buffer, in_buffer, out_start, out_end, in_start, in_end) {
            Sk.builtin.pyCheckArgsLen("writeto_then_readfrom", arguments.length, 4, 8);
            self.last_address = toInt(address, "address");
            self.last_write = out_buffer;
            fillBuffer(in_buffer, isNone(in_start) ? 0 : toInt(in_start, "in_start"), isNone(in_end) ? null : toInt(in_end, "in_end"), 0);
            return pyNone();
        };
        writeto_then_readfrom.co_varnames = ["self", "address", "out_buffer", "in_buffer", "out_start", "out_end", "in_start", "in_end"];
        writeto_then_readfrom.$defaults = [new Sk.builtin.int_(0), Sk.builtin.none(), new Sk.builtin.int_(0), Sk.builtin.none()];
        $loc.writeto_then_readfrom = new Sk.builtin.func(writeto_then_readfrom);

        const deinit = function (self) {
            Sk.builtin.pyCheckArgsLen("deinit", arguments.length, 1, 1);
            self.initialized = false;
            self.locked = false;
            return pyNone();
        };
        deinit.co_varnames = ["self"];
        $loc.deinit = new Sk.builtin.func(deinit);

        $loc.__enter__ = new Sk.builtin.func(function (self) {
            return self;
        });

        $loc.__exit__ = new Sk.builtin.func(function (self, exc_type, exc, tb) {
            self.locked = false;
            return new Sk.builtin.bool(false);
        });

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str(
                "I2C(bus=" + self.bus_id + ", scl=" + getPinName(self.scl) + ", sda=" + getPinName(self.sda) + ", frequency=" + self.frequency + ")"
            );
        });

        $loc.__repr__ = $loc.__str__;

    }, "I2C");

    board.SPI = new Sk.misceval.buildClass(board, function ($gbl, $loc) {

        const SPI__init__ = function (self, clock, MOSI, MISO) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);

            self.clock = isNone(clock) ? board.SCLK : clock;
            self.MOSI = isNone(MOSI) ? board.MOSI : MOSI;
            self.MISO = isNone(MISO) ? board.MISO : MISO;
            self.bus_id = findSPIPort(self.clock, self.MOSI, self.MISO);
            self.locked = false;
            self.initialized = true;
            self.baudrate = 100000;
            self.polarity = 0;
            self.phase = 0;
            self.bits = 8;

            if (self.bus_id === null) {
                throw new Sk.builtin.NotImplementedError(
                    "No Hardware SPI on (clock, MOSI, MISO)=(" + getPinName(self.clock) + ", " + getPinName(self.MOSI) + ", " + getPinName(self.MISO) + ")"
                );
            }

            return pyNone();
        };

        SPI__init__.co_varnames = ["self", "clock", "MOSI", "MISO"];
        SPI__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(SPI__init__);

        const try_lock = function (self) {
            if (self.locked) return new Sk.builtin.bool(false);
            self.locked = true;
            return new Sk.builtin.bool(true);
        };
        try_lock.co_varnames = ["self"];
        $loc.try_lock = new Sk.builtin.func(try_lock);

        const unlock = function (self) {
            self.locked = false;
            return pyNone();
        };
        unlock.co_varnames = ["self"];
        $loc.unlock = new Sk.builtin.func(unlock);

        const configure = function (self, baudrate, polarity, phase, bits) {
            Sk.builtin.pyCheckArgsLen("configure", arguments.length, 1, 5);
            if (!isNone(baudrate)) self.baudrate = toInt(baudrate, "baudrate");
            if (!isNone(polarity)) self.polarity = toInt(polarity, "polarity");
            if (!isNone(phase)) self.phase = toInt(phase, "phase");
            if (!isNone(bits)) self.bits = toInt(bits, "bits");
            return pyNone();
        };
        configure.co_varnames = ["self", "baudrate", "polarity", "phase", "bits"];
        configure.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];
        $loc.configure = new Sk.builtin.func(configure);

        const write = function (self, buffer, start, end) {
            self.last_write = buffer;
            return pyNone();
        };
        write.co_varnames = ["self", "buffer", "start", "end"];
        write.$defaults = [new Sk.builtin.int_(0), Sk.builtin.none()];
        $loc.write = new Sk.builtin.func(write);

        const readinto = function (self, buffer, start, end, write_value) {
            const value = isNone(write_value) ? 0 : toInt(write_value, "write_value");
            fillBuffer(buffer, isNone(start) ? 0 : toInt(start, "start"), isNone(end) ? null : toInt(end, "end"), value);
            return pyNone();
        };
        readinto.co_varnames = ["self", "buffer", "start", "end", "write_value"];
        readinto.$defaults = [new Sk.builtin.int_(0), Sk.builtin.none(), new Sk.builtin.int_(0)];
        $loc.readinto = new Sk.builtin.func(readinto);

        const write_readinto = function (self, out_buffer, in_buffer, out_start, out_end, in_start, in_end) {
            self.last_write = out_buffer;
            fillBuffer(in_buffer, isNone(in_start) ? 0 : toInt(in_start, "in_start"), isNone(in_end) ? null : toInt(in_end, "in_end"), 0);
            return pyNone();
        };
        write_readinto.co_varnames = ["self", "out_buffer", "in_buffer", "out_start", "out_end", "in_start", "in_end"];
        write_readinto.$defaults = [new Sk.builtin.int_(0), Sk.builtin.none(), new Sk.builtin.int_(0), Sk.builtin.none()];
        $loc.write_readinto = new Sk.builtin.func(write_readinto);

        const deinit = function (self) {
            self.initialized = false;
            self.locked = false;
            return pyNone();
        };
        deinit.co_varnames = ["self"];
        $loc.deinit = new Sk.builtin.func(deinit);

        $loc.__enter__ = new Sk.builtin.func(function (self) {
            return self;
        });

        $loc.__exit__ = new Sk.builtin.func(function (self, exc_type, exc, tb) {
            self.locked = false;
            return new Sk.builtin.bool(false);
        });

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str(
                "SPI(bus=" + self.bus_id + ", clock=" + getPinName(self.clock) + ", MOSI=" + getPinName(self.MOSI) + ", MISO=" + getPinName(self.MISO) + ")"
            );
        });

        $loc.__repr__ = $loc.__str__;

    }, "SPI");

    board.UART = new Sk.misceval.buildClass(board, function ($gbl, $loc) {

        const UART__init__ = function (self, tx, rx, baudrate, bits, parity, stop, timeout, receiver_buffer_size) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 9);

            self.tx = isNone(tx) ? board.TXD : tx;
            self.rx = isNone(rx) ? board.RXD : rx;
            self.baudrate = isNone(baudrate) ? 9600 : toInt(baudrate, "baudrate");
            self.bits = isNone(bits) ? 8 : toInt(bits, "bits");
            self.parity = isNone(parity) ? null : parity;
            self.stop = isNone(stop) ? 1 : toInt(stop, "stop");
            self.timeout = isNone(timeout) ? 1 : toJs(timeout);
            self.receiver_buffer_size = isNone(receiver_buffer_size) ? 64 : toInt(receiver_buffer_size, "receiver_buffer_size");
            self.bus_id = findUARTPort(self.tx, self.rx);
            self.initialized = true;

            if (self.bus_id === null) {
                throw new Sk.builtin.NotImplementedError(
                    "No Hardware UART on (tx, rx)=(" + getPinName(self.tx) + ", " + getPinName(self.rx) + ")"
                );
            }

            return pyNone();
        };

        UART__init__.co_varnames = ["self", "tx", "rx", "baudrate", "bits", "parity", "stop", "timeout", "receiver_buffer_size"];
        UART__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(9600), new Sk.builtin.int_(8), Sk.builtin.none(), new Sk.builtin.int_(1), new Sk.builtin.float_(1), new Sk.builtin.int_(64)];
        $loc.__init__ = new Sk.builtin.func(UART__init__);

        const write = function (self, buffer) {
            self.last_write = buffer;
            const jsValue = toJs(buffer);
            const length = jsValue && jsValue.length !== undefined ? jsValue.length : 1;
            return new Sk.builtin.int_(length);
        };
        write.co_varnames = ["self", "buffer"];
        $loc.write = new Sk.builtin.func(write);

        const read = function (self, nbytes) {
            return Sk.builtin.none();
        };
        read.co_varnames = ["self", "nbytes"];
        read.$defaults = [Sk.builtin.none()];
        $loc.read = new Sk.builtin.func(read);

        const readline = function (self) {
            return Sk.builtin.none();
        };
        readline.co_varnames = ["self"];
        $loc.readline = new Sk.builtin.func(readline);

        const readinto = function (self, buffer, nbytes) {
            return Sk.builtin.none();
        };
        readinto.co_varnames = ["self", "buffer", "nbytes"];
        readinto.$defaults = [Sk.builtin.none()];
        $loc.readinto = new Sk.builtin.func(readinto);

        const deinit = function (self) {
            self.initialized = false;
            return pyNone();
        };
        deinit.co_varnames = ["self"];
        $loc.deinit = new Sk.builtin.func(deinit);

        $loc.__enter__ = new Sk.builtin.func(function (self) {
            return self;
        });

        $loc.__exit__ = new Sk.builtin.func(function (self, exc_type, exc, tb) {
            return new Sk.builtin.bool(false);
        });

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str(
                "UART(bus=" + self.bus_id + ", tx=" + getPinName(self.tx) + ", rx=" + getPinName(self.rx) + ", baudrate=" + self.baudrate + ")"
            );
        });

        $loc.__repr__ = $loc.__str__;

    }, "UART");

    board.STEMMA_I2C = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("STEMMA_I2C", arguments.length, 0, 0);
        return Sk.misceval.callsim(board.I2C);
    });

    return board;
};