// ESP32 - esp32_bn880 module

var $builtinmodule = function () {

	var esp32_bn880 = {};

	esp32_bn880.detect_magnetometer = new Sk.builtin.func(function (i2c) {
		return new Sk.builtin.str("QMC5883L");
	});

	esp32_bn880.read_heading = new Sk.builtin.func(function (i2c, sensor_type) {
		return new Sk.builtin.float_($('#bn880_slider').slider('value') % 360);
	});

	return esp32_bn880;
};
