const VITTASCIENCE_H = {

    load: function (rt) {

        rt.data = Object.create(null);

        rt.regFunc(function (rt, _this, motor, speed) {
            $('#i2cMotor' + motor.v + '_value').html(speed.v);
            if (speed.v > 0) {
                $('#i2cMotor' + motor.v + '_anim').css('animation', 'rotation-forward ' + ((speed.v * -0.04) + 5) + 's infinite linear');
            } else {
                $('#i2cMotor' + motor.v + '_anim').css('animation', 'rotation-forward 0s infinite linear');
            }
        }, "global", "Motor_speed", [rt.unsignedintTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this, step) {
            $('#i2cMotorStepper_value').html(step.v);
            $('#i2cMotorStepper_anim').css("transform", "rotate(" + step.v / 1024 * 180 + "deg)");
        }, "global", "Motor_StepperRun", [rt.doubleTypeLiteral], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "sgp30_begin", [], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#sgp30_slider_cov").slider('option', 'value'));
        }, "global", "sgp30_readTVOC", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#sgp30_slider_co2").slider('option', 'value'));
        }, "global", "sgp30_readCO2", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_co").slider('option', 'value'));
        }, "global", "gas_measure_CO", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_no2").slider('option', 'value'));
        }, "global", "gas_measure_NO2", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_nh3").slider('option', 'value'));
        }, "global", "gas_measure_NH3", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_c3h8").slider('option', 'value'));
        }, "global", "gas_measure_C3H8", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_c4h10").slider('option', 'value'));
        }, "global", "gas_measure_C4H10", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_ch4").slider('option', 'value'));
        }, "global", "gas_measure_CH4", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_h2").slider('option', 'value'));
        }, "global", "gas_measure_H2", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannel_slider_c2h5oh").slider('option', 'value'));
        }, "global", "gas_measure_C2H5OH", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannelV2_slider_GM102B").slider('option', 'value'));
        }, "global", "multichannel_v2_getGM102B", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannelV2_slider_GM702B").slider('option', 'value'));
        }, "global", "multichannel_v2_getGM702B", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannelV2_slider_GM302B").slider('option', 'value'));
        }, "global", "multichannel_v2_getGM302B", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, $("#multichannelV2_slider_GM502B").slider('option', 'value'));
        }, "global", "multichannel_v2_getGM502B", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, value) {
            return rt.val(rt.doubleTypeLiteral, (value.v * 3.3 / 1023).toFixed(2));
        }, "global", "multichannel_v2_calcVol", [rt.doubleTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, pin) {
            const pinStr = Simulator.getPinString(pin.v);
            let result = Number($('#dustSensor_' + pinStr + '_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "dustSensor_readParticulate", [rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function () {
            if (rt.data.lcd.quality < 150) {
                return rt.val(rt.intTypeLiteral, 3);
            } else if (rt.data.lcd.quality < 400) {
                return rt.val(rt.intTypeLiteral, 2);
            } else if (rt.data.lcd.quality < 700) {
                return rt.val(rt.intTypeLiteral, 1);
            } else {
                return rt.val(rt.intTypeLiteral, 0);
            }
        }, "global", "airQuality_slope", [rt.unsignedintTypeLiteral], rt.unsignedintTypeLiteral);

        rt.regFunc(function (rt, _this, addr) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "bmp280_begin", [rt.doubleTypeLiteral], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this) {
            var result = Number($('#bmp280-temp_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "bmp280_readTemperature", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            var result = Number($('#bmp280-press_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "bmp280_readPressure", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, x) {
            if (x.v != -1) {
                var result = x.v;
            } else {
                var result = Number($('#bmp280-alt_value').html());
            }
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "bmp280_readAltitude", [rt.doubleTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "scd30_initialize", [], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this, select) {
            var result = 0;
            if (select.v == 0) {
                result = Number($('#scd30-co2_value').html());
            } else if (select.v == 1) {
                result = Number($('#scd30-temp_value').html());
            } else if (select.v == 2) {
                result = Number($('#scd30-hum_value').html());
            }
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "scd30_read", [rt.unsignedintTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, pin) {
            let pinStr = 'A' + (pin.v - 14);
            result = parseInt($('#mq135_' + pinStr + '_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "mq135_readCO2", [rt.unsignedintTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "sht31_begin", [], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this) {
            var result = Number($('#sht31-temp_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "sht31_getTemperature", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            var result = Number($('#sht31-hum_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "sht31_getHumidity", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, pin) {
            let pinStr = 'A' + (pin.v - 14);
            let result = Number($('#mpx5700_' + pinStr + '_value').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "mpx5700_readPressure", [rt.unsignedintTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "si1145_begin", [], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this) {
            const result = Number($('#si1145_value_uv').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "si1145_readUV", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            const result = Number($('#si1145_value_vis').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "si1145_readVisible", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            const result = Number($('#si1145_value_ir').html());
            return rt.val(rt.doubleTypeLiteral, result);
        }, "global", "si1145_readIR", [], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this, pinTrig, pinEcho, data) {
            const T_pinStr = Simulator.getPinString(pinTrig.v);
            if (data.v == 0) {
                const dist = Number($('#hcsr04_' + T_pinStr + '_value_d').html());
                return rt.val(rt.doubleTypeLiteral, dist);
            } else {
                const time = Number($('#hcsr04_' + T_pinStr + '_value_t').html());
                return rt.val(rt.doubleTypeLiteral, time);
            }
        }, "global", "hcsr04_getUltrasonicData", [rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral], rt.doubleTypeLiteral);

        rt.regFunc(function (rt, _this) {
            let result = -1;
            if (Number($('#gestureSensor_slider_r').slider('value')) == 1) {
                result = 0;
            } else if (Number($('#gestureSensor_slider_l').slider('value')) == 1) {
                result = 1;
            } else if (Number($('#gestureSensor_slider_u').slider('value')) == 1) {
                result = 2;
            } else if (Number($('#gestureSensor_slider_d').slider('value')) == 1) {
                result = 3;
            } else if (Number($('#gestureSensor_slider_f').slider('value')) == 1) {
                result = 4;
            } else if (Number($('#gestureSensor_slider_b').slider('value')) == 1) {
                result = 5;
            } else if (Number($('#gestureSensor_slider_c').slider('value')) == 1) {
                result = 6;
            } else if (Number($('#gestureSensor_slider_ac').slider('value')) == 1) {
                result = 7;
            } else if (Number($('#gestureSensor_slider_w').slider('value')) == 1) {
                result = 8;
            }
            return rt.val(rt.intTypeLiteral, result);
        }, "global", "paj7620ReadReg", [], rt.unsignedintTypeLiteral);

        rt.data.rtc = {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            dayName: "Lundi"
        };

        const getMonth = function (m) {
            months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Atoût", "Septembre", "Octobre", "Novembre", "Décembre"];
            return months[m - 1];
        };

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.boolTypeLiteral, true);
        }, "global", "clock_begin", [], rt.boolTypeLiteral);

        rt.regFunc(function (rt, _this) {
        }, "global", "clock_startClock", [], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this, y, m, d) {
            rt.data.rtc.year = y.v;
            rt.data.rtc.month = m.v;
            rt.data.rtc.day = d.v;
        }, "global", "clock_fillByYMD", [rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral, rt.unsignedintTypeLiteral], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this, str) {
            switch (Simulator.getStringFromInterpretor(str)) {
                case "MON":
                    rt.data.rtc.dayName = "Lundi";
                    break;
                case "TUE":
                    rt.data.rtc.dayName = "Mardi";
                    break;
                case "WED":
                    rt.data.rtc.dayName = "Mercredi";
                    break;
                case "THU":
                    rt.data.rtc.dayName = "Jeudi";
                    break;
                case "FRI":
                    rt.data.rtc.dayName = "Vendredi";
                    break;
                case "SAT":
                    rt.data.rtc.dayName = "Samedi";
                    break;
                case "SUN":
                    rt.data.rtc.dayName = "Dimanche";
                    break;
            }
        }, "global", "clock_fillDayOfWeek", [rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this, h, m, s) {
            rt.data.rtc.hour = h.v;
            rt.data.rtc.minute = m.v;
            rt.data.rtc.second = s.v;
        }, "global", "clock_fillByHMS", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this) {
            const hour = rt.data.rtc.hour < 10 ? '0' + rt.data.rtc.hour : rt.data.rtc.hour;
            const minute = rt.data.rtc.minute < 10 ? '0' + rt.data.rtc.minute : rt.data.rtc.minute;
            const second = rt.data.rtc.second < 10 ? '0' + rt.data.rtc.second : rt.data.rtc.second;
            $('#rtc_value').html(rt.data.rtc.dayName + " " + rt.data.rtc.day + " " + getMonth(rt.data.rtc.month) + " " + rt.data.rtc.year + "<br/>" + hour + ":" + minute + ":" + second);
        }, "global", "clock_setTime", [], rt.voidTypeLiteral);

        rt.regFunc(function (rt, _this, data) {
            const dataType = {
                0: rt.data.rtc.day,
                1: getMonth(rt.data.rtc.month),
                2: rt.data.rtc.year,
                3: rt.data.rtc.hour,
                4: rt.data.rtc.minute,
                5: rt.data.rtc.second,
                6: rt.data.rtc.dayName
            };
            return rt.val(rt.StringTypeLiteral, String(dataType[data.v]));
        }, "global", "clock_ds1307_RTC_getTime", [rt.unsignedintTypeLiteral], rt.StringTypeLiteral);

        rt.regFunc(function (rt, _this) {
            return rt.val(rt.doubleTypeLiteral, Date.now());
        }, "global", "arduino_millis", [], rt.doubleTypeLiteral);
    }
};