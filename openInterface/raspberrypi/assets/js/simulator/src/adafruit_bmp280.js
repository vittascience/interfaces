// Raspberry Pi - adafruit_bmp280 module for Skulpt
// Compatible with common Adafruit CircuitPython/Blinka usage:
//   import board
//   from adafruit_bmp280 import Adafruit_BMP280_I2C
//   bmp280 = Adafruit_BMP280_I2C(board.I2C(), address=0x76)
//   print(bmp280.temperature)
//   print(bmp280.pressure)
//   print(bmp280.altitude)

var $builtinmodule = function (name) {

    var adafruit_bmp280 = {};

    adafruit_bmp280.__name__ = new Sk.builtin.str("adafruit_bmp280");

    // Common BMP280 constants from Adafruit-style APIs.
    adafruit_bmp280._BMP280_ADDRESS = new Sk.builtin.int_(0x77);
    adafruit_bmp280._BMP280_ADDRESS_ALT = new Sk.builtin.int_(0x76);
    adafruit_bmp280._BMP280_CHIPID = new Sk.builtin.int_(0x58);

    adafruit_bmp280.MODE_SLEEP = new Sk.builtin.int_(0x00);
    adafruit_bmp280.MODE_FORCED = new Sk.builtin.int_(0x01);
    adafruit_bmp280.MODE_NORMAL = new Sk.builtin.int_(0x03);

    adafruit_bmp280.OVERSCAN_DISABLE = new Sk.builtin.int_(0x00);
    adafruit_bmp280.OVERSCAN_X1 = new Sk.builtin.int_(0x01);
    adafruit_bmp280.OVERSCAN_X2 = new Sk.builtin.int_(0x02);
    adafruit_bmp280.OVERSCAN_X4 = new Sk.builtin.int_(0x03);
    adafruit_bmp280.OVERSCAN_X8 = new Sk.builtin.int_(0x04);
    adafruit_bmp280.OVERSCAN_X16 = new Sk.builtin.int_(0x05);

    adafruit_bmp280.STANDBY_TC_0_5 = new Sk.builtin.int_(0x00);
    adafruit_bmp280.STANDBY_TC_62_5 = new Sk.builtin.int_(0x01);
    adafruit_bmp280.STANDBY_TC_125 = new Sk.builtin.int_(0x02);
    adafruit_bmp280.STANDBY_TC_250 = new Sk.builtin.int_(0x03);
    adafruit_bmp280.STANDBY_TC_500 = new Sk.builtin.int_(0x04);
    adafruit_bmp280.STANDBY_TC_1000 = new Sk.builtin.int_(0x05);
    adafruit_bmp280.STANDBY_TC_2000 = new Sk.builtin.int_(0x06);
    adafruit_bmp280.STANDBY_TC_4000 = new Sk.builtin.int_(0x07);

    adafruit_bmp280.IIR_FILTER_DISABLE = new Sk.builtin.int_(0x00);
    adafruit_bmp280.IIR_FILTER_X2 = new Sk.builtin.int_(0x01);
    adafruit_bmp280.IIR_FILTER_X4 = new Sk.builtin.int_(0x02);
    adafruit_bmp280.IIR_FILTER_X8 = new Sk.builtin.int_(0x03);
    adafruit_bmp280.IIR_FILTER_X16 = new Sk.builtin.int_(0x04);

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

    const toNumber = function (value, name) {
        const isNumber = Sk.builtin.checkInt(value) || Sk.builtin.checkFloat(value);
        Sk.builtin.pyCheckType(name, "number", isNumber);
        return toJs(value);
    };

    const setAttr = function (self, name, value) {
        self.tp$setattr(new Sk.builtin.str(name), value);
    };

    const updateSubtitle = function (self) {
        const subtitle = "I2C (0x" + self.address.toString(16) + ")";
        const selectors = ["#bmp280-temp", "#bmp280-press", "#bmp280-alt"];
        for (const selector of selectors) {
            const el = $(selector);
            if (el.length) {
                el.find(".subtitle-module").html(subtitle);
            }
        }
    };

    const createBaseBMP280Class = function ($gbl, $loc) {

        const BMP280__init__ = function (self) {
            // Base class kept for compatibility. The concrete I2C/SPI classes initialize state.
            self.sea_level_pressure = 1013.25;
            self.mode = adafruit_bmp280.MODE_NORMAL.v;
            self.overscan_temperature = adafruit_bmp280.OVERSCAN_X1.v;
            self.overscan_pressure = adafruit_bmp280.OVERSCAN_X1.v;
            self.standby_period = adafruit_bmp280.STANDBY_TC_125.v;
            self.iir_filter = adafruit_bmp280.IIR_FILTER_DISABLE.v;
            return pyNone();
        };

        BMP280__init__.co_varnames = ["self"];
        $loc.__init__ = new Sk.builtin.func(BMP280__init__);

        const __getattr__ = function (self, name) {
            const attr = name.v;

            if (attr === "temperature") {
                const temp = Simulator.getSliderValue("bmp280-temp");
                return new Sk.builtin.float_(temp);
            }

            if (attr === "pressure") {
                const pressure = Simulator.getSliderValue("bmp280-press");
                return new Sk.builtin.float_(pressure);
            }

            if (attr === "altitude") {
                const pressure = Number(Simulator.getSliderValue("bmp280-press")); // hPa
                const seaLevelPressure = Number(self.sea_level_pressure || 1013.25) * 100; // hPa
                
                const altitude = 44330 * (1 - Math.pow(pressure / seaLevelPressure, 0.1903));
                return new Sk.builtin.float_(altitude);
            }

            if (attr === "sea_level_pressure") {
                return new Sk.builtin.float_(self.sea_level_pressure || 1013.25);
            }

            if (attr === "mode") {
                return new Sk.builtin.int_(self.mode);
            }

            if (attr === "overscan_temperature") {
                return new Sk.builtin.int_(self.overscan_temperature);
            }

            if (attr === "overscan_pressure") {
                return new Sk.builtin.int_(self.overscan_pressure);
            }

            if (attr === "standby_period") {
                return new Sk.builtin.int_(self.standby_period);
            }

            if (attr === "iir_filter") {
                return new Sk.builtin.int_(self.iir_filter);
            }

            throw new Sk.builtin.AttributeError("'Adafruit_BMP280' object has no attribute '" + attr + "'");
        };

        __getattr__.co_varnames = ["self", "name"];
        $loc.__getattr__ = new Sk.builtin.func(__getattr__);

        const __setattr__ = function (self, name, value) {
            const attr = name.v;

            if (attr === "sea_level_pressure") {
                self.sea_level_pressure = toNumber(value, "sea_level_pressure");
                return pyNone();
            }

            if (attr === "mode") {
                self.mode = toInt(value, "mode");
                return pyNone();
            }

            if (attr === "overscan_temperature") {
                self.overscan_temperature = toInt(value, "overscan_temperature");
                return pyNone();
            }

            if (attr === "overscan_pressure") {
                self.overscan_pressure = toInt(value, "overscan_pressure");
                return pyNone();
            }

            if (attr === "standby_period") {
                self.standby_period = toInt(value, "standby_period");
                return pyNone();
            }

            if (attr === "iir_filter") {
                self.iir_filter = toInt(value, "iir_filter");
                return pyNone();
            }

            self[attr] = value;
            return pyNone();
        };

        __setattr__.co_varnames = ["self", "name", "value"];
        $loc.__setattr__ = new Sk.builtin.func(__setattr__);

        const read_temperature = function (self) {
            Sk.builtin.pyCheckArgsLen("read_temperature", arguments.length, 1, 1);
            const temp = Simulator.getSliderValue("bmp280-temp");
            return new Sk.builtin.float_(temp);
        };

        read_temperature.co_varnames = ["self"];
        $loc.read_temperature = new Sk.builtin.func(read_temperature);

        const read_pressure = function (self) {
            Sk.builtin.pyCheckArgsLen("read_pressure", arguments.length, 1, 1);
            const pressure = Simulator.getSliderValue("bmp280-press");
            return new Sk.builtin.float_(pressure);
        };

        read_pressure.co_varnames = ["self"];
        $loc.read_pressure = new Sk.builtin.func(read_pressure);

        $loc.__str__ = new Sk.builtin.func(function (self) {
            const addr = self.address !== undefined ? "0x" + self.address.toString(16) : "unknown";
            return new Sk.builtin.str("Adafruit_BMP280(address=" + addr + ")");
        });

        $loc.__repr__ = $loc.__str__;
    };

    adafruit_bmp280.Adafruit_BMP280 = new Sk.misceval.buildClass(
        adafruit_bmp280,
        createBaseBMP280Class,
        "Adafruit_BMP280"
    );

    adafruit_bmp280.Adafruit_BMP280_I2C = new Sk.misceval.buildClass(
        adafruit_bmp280,
        function ($gbl, $loc) {
            createBaseBMP280Class($gbl, $loc);

            const __init__ = function (self, i2c, address) {
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);

                if (isNone(i2c)) {
                    throw new Sk.builtin.ValueError("I2C object required");
                }

                self.i2c_device = i2c;
                self.i2c = i2c;
                self.address = isNone(address) ? adafruit_bmp280._BMP280_ADDRESS.v : toInt(address, "address");

                self.sea_level_pressure = 1013.25;
                self.mode = adafruit_bmp280.MODE_NORMAL.v;
                self.overscan_temperature = adafruit_bmp280.OVERSCAN_X1.v;
                self.overscan_pressure = adafruit_bmp280.OVERSCAN_X1.v;
                self.standby_period = adafruit_bmp280.STANDBY_TC_125.v;
                self.iir_filter = adafruit_bmp280.IIR_FILTER_DISABLE.v;

                updateSubtitle(self);

                return pyNone();
            };

            __init__.co_varnames = ["self", "i2c", "address"];
            __init__.$defaults = [adafruit_bmp280._BMP280_ADDRESS];
            $loc.__init__ = new Sk.builtin.func(__init__);

        },
        "Adafruit_BMP280_I2C"
    );

    adafruit_bmp280.Adafruit_BMP280_SPI = new Sk.misceval.buildClass(
        adafruit_bmp280,
        function ($gbl, $loc) {
            createBaseBMP280Class($gbl, $loc);

            const __init__ = function (self, spi, cs, baudrate) {
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 4);

                if (isNone(spi)) {
                    throw new Sk.builtin.ValueError("SPI object required");
                }

                self.spi_device = spi;
                self.spi = spi;
                self.cs = cs;
                self.baudrate = isNone(baudrate) ? 100000 : toInt(baudrate, "baudrate");
                self.address = null;

                self.sea_level_pressure = 1013.25;
                self.mode = adafruit_bmp280.MODE_NORMAL.v;
                self.overscan_temperature = adafruit_bmp280.OVERSCAN_X1.v;
                self.overscan_pressure = adafruit_bmp280.OVERSCAN_X1.v;
                self.standby_period = adafruit_bmp280.STANDBY_TC_125.v;
                self.iir_filter = adafruit_bmp280.IIR_FILTER_DISABLE.v;

                return pyNone();
            };

            __init__.co_varnames = ["self", "spi", "cs", "baudrate"];
            __init__.$defaults = [new Sk.builtin.int_(100000)];
            $loc.__init__ = new Sk.builtin.func(__init__);

        },
        "Adafruit_BMP280_SPI"
    );

    // Newer Adafruit library names sometimes use BMP280_I2C/BMP280_SPI.
    adafruit_bmp280.BMP280_I2C = adafruit_bmp280.Adafruit_BMP280_I2C;
    adafruit_bmp280.BMP280_SPI = adafruit_bmp280.Adafruit_BMP280_SPI;

    return adafruit_bmp280;
};
