/**
 * @fileoverview Sensors generators for Esp32.
 */

// Cameras

Blockly.Python.sensors_rpi_camera_takePicture = function (block) {
    Blockly.Python.addImport('picamera2', IMPORT_PICAMERA2);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addFunction('camera_RPI_preview_configure', FUNCTIONS_RASPBERRY.DEF_CAMERA_RPI_PREVIEW_CONFIGURE);
    Blockly.Python.addFunction('camera_RPI_takePicture', FUNCTIONS_RASPBERRY.DEF_CAMERA_RPI_TAKE_PICTURE);
    Blockly.Python.addInit('rpiCam', 'rpiCam = picamera2.Picamera2()');
    Blockly.Python.addPowerOn('rpiCam_configure', 'camera_RPI_preview_configure((640, 480))');
    return ['camera_RPI_takePicture()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_rpi_camera_takeVideo = function (block) {
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "'video.mp4'";
    Blockly.Python.addImport('picamera2', IMPORT_PICAMERA2);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addFunction('camera_RPI_video_configure', FUNCTIONS_RASPBERRY.DEF_CAMERA_RPI_VIDEO_CONFIGURE);
    Blockly.Python.addFunction('camera_RPI_takeVideo', FUNCTIONS_RASPBERRY.DEF_CAMERA_RPI_TAKE_VIDEO);
    Blockly.Python.addInit('rpiCam', 'rpiCam = picamera2.Picamera2()');
    Blockly.Python.addPowerOn('rpiCam_configure', 'camera_RPI_video_configure((640, 480))');
    return 'camera_RPI_takeVideo(' + duration + ', ' + filename + ')' + NEWLINE;
};

Blockly.Python.sensors_rpi_camera_changeSize = function (block) {
    const framesize = block.getFieldValue("FRAMESIZE");
    Blockly.Python.addImport('picamera2', IMPORT_PICAMERA2);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addFunction('camera_RPI_preview_configure', FUNCTIONS_RASPBERRY.DEF_CAMERA_RPI_PREVIEW_CONFIGURE);
    Blockly.Python.addInit('rpiCam', 'rpiCam = picamera2.Picamera2()');
    Blockly.Python.addPowerOn('rpiCam_configure', 'camera_RPI_preview_configure((640, 480))');
    return `camera_RPI_preview_configure(${framesize})${NEWLINE}`;
};

Blockly.Python.sensors_usb_camera_takePicture = function (block) {
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('camera_USB_takePicture', FUNCTIONS_RASPBERRY.DEF_CAMERA_USB_TAKE_PICTURE);
    Blockly.Python.addInit('cv2_frame_size', 'cv2_frame_size = (640, 480)');
    return ['camera_USB_takePicture()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_usb_camera_takeVideo = function (block) {
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "'video.mp4'";
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('subprocess', IMPORT_SUBPROCESS);
    Blockly.Python.addFunction('camera_USB_takeVideo', FUNCTIONS_RASPBERRY.DEF_CAMERA_USB_TAKE_VIDEO);
    Blockly.Python.addInit('cv2_frame_size', 'cv2_frame_size = (640, 480)');
    return 'camera_USB_takeVideo(0, ' + duration + ', ' + filename + ')' + NEWLINE;
};

Blockly.Python.sensors_usb_camera_changeSize = function (block) {
    const framesize = block.getFieldValue("FRAMESIZE");
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addInit('cv2_frame_size', 'cv2_frame_size = (640, 480)');
    return `cv2_frame_size = ${framesize}${NEWLINE}`;
};

Blockly.Python.sensors_cv2_camera_savePicture = function (block) {
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('pathlib', IMPORT_PATHLIB);
    Blockly.Python.addFunction('cv2_camera_savePicture', FUNCTIONS_RASPBERRY.DEF_CV2_CAMERA_SAVE_PICTURE);
    const img = Blockly.Python.valueToCode(block, "IMG", Blockly.Python.ORDER_NONE) || 'None';
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "'image.jpg'";
    return `cv2_camera_savePicture(${img}, ${filename})${NEWLINE}`;
};

Blockly.Python.sensors_camera_showPictureInVittascience = function (block) {
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('pathlib', IMPORT_PATHLIB);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addFunction('cv2_camera_savePicture', FUNCTIONS_RASPBERRY.DEF_CV2_CAMERA_SAVE_PICTURE);
    Blockly.Python.addFunction('show_picture_in_Vittascience', FUNCTIONS_RASPBERRY.DEF_SHOW_PICTURE_IN_VITTASCIENCE);
    const data_or_filename = Blockly.Python.valueToCode(block, "IMG", Blockly.Python.ORDER_NONE) || 'None';
    return 'show_picture_in_Vittascience(' + data_or_filename + ')' + NEWLINE;
};

Blockly.Python.sensors_camera_showVideoInVittascience = function (block) {
    Blockly.Python.addImport('pathlib', IMPORT_PATHLIB);
    Blockly.Python.addFunction('show_video_in_Vittascience', FUNCTIONS_RASPBERRY.DEF_SHOW_VIDEO_IN_VITTASCIENCE);
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || 'None';
    return 'show_video_in_Vittascience(' + filename + ')' + NEWLINE;
};

Blockly.Python.sensors_camera_getPictureFiles = function (block) {
    Blockly.Python.addImport('pathlib', IMPORT_PATHLIB);
    Blockly.Python.addFunction('folder_getFilesFrom', FUNCTIONS_RASPBERRY.DEF_FOLDER_GETFILESFROM);
    return ['folder_getFilesFrom(pathlib.Path(__file__).parent / "static/images")', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_camera_getVideoFiles = function (block) {
    Blockly.Python.addImport('pathlib', IMPORT_PATHLIB);
    Blockly.Python.addFunction('folder_getFilesFrom', FUNCTIONS_RASPBERRY.DEF_FOLDER_GETFILESFROM);
    return ['folder_getFilesFrom(pathlib.Path(__file__).parent / "static/videos")', Blockly.Python.ORDER_ATOMIC];
};

// Sense HAT - sensors

Blockly.Python.sensehat_getSenseHatHumidity = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    return ['sense.get_humidity()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_getTemperatureFrom = function (block) {
    const unit = block.getFieldValue('UNIT');
    const sensor = block.getFieldValue('SENSOR');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getTemperatureFrom', FUNCTIONS_RASPBERRY.SENSE_HAT_TEMPERATURE_FROM);
    return [`senseHat_getTemperatureFrom('${sensor}', '${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_getSenseHatTemperature = function (block) {
    const unit = block.getFieldValue('UNIT');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getTemperature', FUNCTIONS_RASPBERRY.SENSE_HAT_TEMPERATURE);
    return [`senseHat_getTemperature('${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_getSenseHatPressure = function (block) {
    const unit = block.getFieldValue('UNIT');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getPressure', FUNCTIONS_RASPBERRY.SENSE_HAT_PRESSURE);
    return [`senseHat_getPressure('${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_set_imu_config = function (block) {
    const gyro = block.getFieldValue('IMU_CONFIG_GYRO');
    const accel = block.getFieldValue('IMU_CONFIG_ACCEL');
    const compass = block.getFieldValue('IMU_CONFIG_COMPASS');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    return `sense.set_imu_config(${gyro}, ${accel}, ${compass})\n`;
};

Blockly.Python.sensehat_imu_get_orientation = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    const orientation = block.getFieldValue('ORIENTATION');
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    return [`sense.get_orientation_${orientation}()`, Blockly.Python.ORDER_ATOMIC];
};

// Blockly.Python.sensehat_imu_get_orientation_degrees = function (block) {
//     Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
//     Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
//     return [`sense.get_orientation_degrees()`, Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.sensehat_imu_get_compass = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    return [`sense.get_compass()`, Blockly.Python.ORDER_ATOMIC];
};

// Gas

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('grove.sgp30', IMPORT_GROVE_MODULES_SGP30);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('sgp30_measure', FUNCTIONS_RASPBERRY.DEF_SGP30_MEASURE);
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30()");
    Blockly.Python.addInit('sgp30_vars', "_sgp30_last_time = 0.0\n_sgp30_last_values = {\n  \"co2eq\": None,\n  \"tvoc\": None\n}");
    Blockly.Python.addPowerOn('sgp30', "sgp30.init_air_quality()");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30_measure('co2eq')", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30_measure('tvoc')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_SCD30_readData = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('adafruit_scd30', IMPORT_ADAFRUIT_SCD30);
    Blockly.Python.addFunction('scd30_measure', FUNCTIONS_RASPBERRY.DEF_SCD30_MEASURE);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(board.I2C())");
    Blockly.Python.addInit('scd30_vars', "_scd30_last_time = 0.0\n_scd30_last_values = {\n  \"co2\": None,\n  \"temp\": None,\n  \"hum\": None\n}");
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            return ["scd30_measure('co2')", Blockly.Python.ORDER_ATOMIC];
        case "TEMP":
            let code = "scd30_measure('temp')";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case "HUM":
            return ["scd30_measure('hum')", Blockly.Python.ORDER_ATOMIC];
    }
};

// Blockly.Python.sensors_getParticulateMatter = function (block) {
//     Blockly.Python.addImport('grove_PM2_5_HM3301', IMPORT_GROVE_HM3301);
//     Blockly.Python.addFunction('hm330x_measure', FUNCTIONS_RASPBERRY.DEF_HM330X_MEASURE);
//     Blockly.Python.addInit('Seeed_HM3301', "hm330x = Seeed_HM3301()");
//     const types = {
//         '3': 'pm1_atm',
//         '4': 'pm2_5_atm',
//         '5': 'pm10_atm'
//     }
//     return ["hm330x_measure(" + types[block.getFieldValue("TYPE")] + ")", Blockly.Python.ORDER_ATOMIC];
// };

// Climate sensors

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('adafruit_bmp280', IMPORT_ADAFRUIT_BMP280);
    Blockly.Python.addInit('bmp280', "bmp280 = Adafruit_BMP280_I2C(board.I2C(), address=" + addr + ")");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "bmp280.temperature";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case "PRESS":
            return ["bmp280.pressure", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            //Blockly.Python.addFunction('bmp280_get_altitude', FUNCTIONS_RASPBERRY.DEF_BMP280_GET_ALTITUDE)
            return ["bmp280.altitude", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_DHT11ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT11 Sensor');
    Blockly.Python.addImport('seeed_dht', IMPORT_SEEED_DHT);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('dht11_' + pinName, "dht11_" + pinName + " = DHT(\"11\", " + pinName + ")");
    Blockly.Python.addInit('dht11_' + pinName + '_vars', "_dht11_last_time = 0.0\n_dht11_last_values = {\n  \"temperature\": None,\n  \"humidity\": None,\n}");
    Blockly.Python.addFunction('dht11_measure', FUNCTIONS_RASPBERRY.DEF_DHT11_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            let code = "dht11_measure(dht11_" + pinName + ", 'temperature')";
            if (block.getInput("UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case 'HUM':
            return ["dht11_measure(dht11_" + pinName + ", 'humidity')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_DHT22ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT22 Sensor');
    Blockly.Python.addImport('seeed_dht', IMPORT_SEEED_DHT);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('dht22_' + pinName, "dht22_" + pinName + " = DHT(\"22\", " + pinName + ")");
    Blockly.Python.addInit('dht22_' + pinName + '_vars', "_dht22_last_time = 0.0\n_dht22_last_values = {\n  \"temperature\": None,\n  \"humidity\": None,\n}");
    Blockly.Python.addFunction('dht22_measure', FUNCTIONS_RASPBERRY.DEF_DHT22_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            let code = "dht22_measure(dht22_" + pinName + ", 'temperature')";
            if (block.getInput("UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case 'HUM':
            return ["dht22_measure(dht22_" + pinName + ", 'humidity')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_SHT31readData = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('adafruit_sht31d', IMPORT_ADAFRUIT_CP_SHT31D);
    Blockly.Python.addInit('sht31', 'sht31 = SHT31D(board.I2C())');
    switch (data) {
        case "TEMP":
            let code = "sht31.temperature";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ADDITIVE];
        case "HUM":
            return ["sht31.relative_humidity", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_DS18B20_getTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DS18X20 Sensor');
    const objName = 'ds18x20_' + pinName;
    Blockly.Python.addImport('w1thermsensor', IMPORT_W1THERMSENSOR);
    Blockly.Python.addInit(objName, objName + " = W1ThermSensor()");
    let code = objName + ".get_temperature()";
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code += "*9/5 + 32";
            break;
        case "KELVIN":
            code += " + 273.15";
            break;
    }
    return [code, Blockly.Python.ORDER_ADDITIVE];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Rain Sensor');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Anemometer');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

// Sound & Light sensors

Blockly.Python.sensors_getSunlightData = function (block) {
    const version = block.getFieldValue("VERSION");
    let obj = 'si114x';
    switch (version) {
        case 'SI1151':
            obj = 'si115x';
            Blockly.Python.addImport('seeed_' + obj, IMPORT_SEEED_SI115X);
            break;
        default:
        case 'SI1145':
            Blockly.Python.addImport('seeed_' + obj, IMPORT_SEEED_SI114X);
    }
    Blockly.Python.addInit(obj, obj + " = grove_" + obj + "()");
    switch (block.getFieldValue("LIGHT")) {
        case "UV":
            return [obj + ".read_uv() / 100.0", Blockly.Python.ORDER_ATOMIC];
        case "VIS":
            return [obj + ".read_visible()", Blockly.Python.ORDER_ATOMIC];
        case "IR":
            return [obj + ".read_ir()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_colorSensorV2_getData = function (block) {
    Blockly.Python.addImport('grove_i2c_color_sensor_v2', IMPORT_GROVE_COLORSENSORV2);
    Blockly.Python.addInit('colorSensorV2', "colorSensorV2 = GroveI2cColorSensorV2()");
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('colorSensorV2_measure', FUNCTIONS_RASPBERRY.DEF_COLORSENSORV2_MEASURE);
    return ["colorSensorV2_measure(" + block.getFieldValue("DATA") + ")", Blockly.Python.ORDER_ATOMIC];
};

// Distance & Movement sensors

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    let data = "";
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            data = "distance";
            break;
        case "TIME":
            data = "duration";
            break;
    }
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            const pin = block.getFieldValue("PIN");
            const objName = "ultrasonic_" + pin;
            Blockly.Python.addImport('GroveUltrasonicRanger', IMPORT_GROVE_ULTRASONIC_RANGER);
            Blockly.Python.addInit('ultrasonic_grove_' + pin, '# Ultrasonic on ' + pin);
            Blockly.Python.addInit('sonar', `${objName} = GroveUltrasonicRanger(${pin})`);
            if (data == 'duration') {
                return ["343 * " + objName + ".get_distance()/2.0 * 100", Blockly.Python.ORDER_ATOMIC];
            } else {
                return [objName + '.get_distance()', Blockly.Python.ORDER_ATOMIC];
            }
        case "HC-SR04":
            Blockly.Python.addImport('time', IMPORT_TIME);
            const pinTRIG = block.getFieldValue("TRIG");
            const pinECHO = block.getFieldValue("ECHO");
            const pinName_TRIG = Blockly.Python.Generators.digital_write(pinTRIG);
            const pinName_ECHO = Blockly.Python.Generators.digital_read(pinECHO);
            Blockly.Python.addInit('hcsr04_' + pinTRIG + '_codeFlag', '# Ultrasonic TRIG/ECHO on ' + pinTRIG + '/' + pinECHO);
            Blockly.Python.addInit('time_pulse_us', FUNCTIONS_RASPBERRY.DEF_TIME_PULSE_US);
            Blockly.Python.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_RASPBERRY.DEF_HCSR04_ULTRASONIC);
            return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getGesture = function () {
    Blockly.Python.addImport('grove_gesture_sensor', IMPORT_GROVE_PAJ7620);
    Blockly.Python.addConstant('paj7620', "GESTURE_TYPES = {\n  'nothing': 0, 'forward': 1, 'backward': 2, 'right': 3, 'left': 4, 'up': 5, 'down': 6, 'clockwise': 7, 'anticlockwise': 8\n}");
    Blockly.Python.addInit('paj7620', "paj7620 = gesture()");
    return ["paj7620.return_gesture()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_onGestureTypeDetected = function (block) {
    Blockly.Python.addImport('grove_gesture_sensor', IMPORT_GROVE_PAJ7620);
    Blockly.Python.addConstant('paj7620', "GESTURE_TYPES = {\n  'nothing': 0, 'forward': 1, 'backward': 2, 'right': 3, 'left': 4, 'up': 5, 'down': 6, 'clockwise': 7, 'anticlockwise': 8\n}");
    Blockly.Python.addInit('paj7620', "paj7620 = gesture()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if paj7620.return_gesture() == GESTURE_TYPES['" + block.getFieldValue("GESTURE") + "']:" + NEWLINE + branchCode;
};

Blockly.Python.sensors_getGroveLineFinder = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Line Finder');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMotion = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Motion Sensor');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTilt = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Tilt Sensor');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getPiezoVibration = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Vibration Sensor');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};