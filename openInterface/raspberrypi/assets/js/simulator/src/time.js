// Python 3 - time module for Skulpt
// Based on CPython's time module behavior where practical in a browser/simulator.

var $builtinmodule = function (name) {

    var time = {};

    time.__name__ = new Sk.builtin.str("time");

    const UNIX_EPOCH = Date.UTC(1970, 0, 1, 0, 0, 0);
    const MODULE_START_MS = Date.now();
    const MODULE_START_PERF_MS = (typeof performance !== "undefined" && performance.now)
        ? performance.now()
        : 0;

    const pyNone = function () {
        return Sk.builtin.none();
    };

    const isNone = function (value) {
        return value === undefined || Sk.builtin.checkNone(value);
    };

    const toNumber = function (value, name) {
        const isNumber = Sk.builtin.checkInt(value) || Sk.builtin.checkFloat(value);
        Sk.builtin.pyCheckType(name, "number", isNumber);
        return Sk.ffi.remapToJs(value);
    };

    const toInt = function (value, name) {
        Sk.builtin.pyCheckType(name, "integer", Sk.builtin.checkInt(value));
        return value.v;
    };

    const toJs = function (value) {
        return Sk.ffi.remapToJs(value);
    };

    const nowMs = function () {
        return Date.now();
    };

    const monotonicMs = function () {
        if (typeof performance !== "undefined" && performance.now) {
            return performance.now();
        }
        return Date.now() - MODULE_START_MS;
    };

    const pad2 = function (n) {
        return String(n).padStart(2, "0");
    };

    const getDstFlag = function (dateObj) {
        const year = dateObj.getFullYear();
        const jan = new Date(year, 0, 1).getTimezoneOffset();
        const jul = new Date(year, 6, 1).getTimezoneOffset();
        const std = Math.max(jan, jul);
        return dateObj.getTimezoneOffset() < std ? 1 : 0;
    };

    const dayOfYearLocal = function (dateObj) {
        const start = new Date(dateObj.getFullYear(), 0, 1);
        return Math.floor((dateObj - start) / 86400000) + 1;
    };

    const dayOfYearUTC = function (dateObj) {
        const start = Date.UTC(dateObj.getUTCFullYear(), 0, 1);
        return Math.floor((dateObj.getTime() - start) / 86400000) + 1;
    };

    const getZoneName = function (dateObj) {
        try {
            const parts = Intl.DateTimeFormat(undefined, { timeZoneName: "short" }).formatToParts(dateObj);
            const part = parts.find(function (p) { return p.type === "timeZoneName"; });
            return part ? part.value : "";
        } catch (e) {
            return "";
        }
    };

    const makeStructTime = function (values) {
        const tuple = new Sk.builtin.tuple([
            new Sk.builtin.int_(values.tm_year),
            new Sk.builtin.int_(values.tm_mon),
            new Sk.builtin.int_(values.tm_mday),
            new Sk.builtin.int_(values.tm_hour),
            new Sk.builtin.int_(values.tm_min),
            new Sk.builtin.int_(values.tm_sec),
            new Sk.builtin.int_(values.tm_wday),
            new Sk.builtin.int_(values.tm_yday),
            new Sk.builtin.int_(values.tm_isdst)
        ]);

        tuple.tm_year = new Sk.builtin.int_(values.tm_year);
        tuple.tm_mon = new Sk.builtin.int_(values.tm_mon);
        tuple.tm_mday = new Sk.builtin.int_(values.tm_mday);
        tuple.tm_hour = new Sk.builtin.int_(values.tm_hour);
        tuple.tm_min = new Sk.builtin.int_(values.tm_min);
        tuple.tm_sec = new Sk.builtin.int_(values.tm_sec);
        tuple.tm_wday = new Sk.builtin.int_(values.tm_wday);
        tuple.tm_yday = new Sk.builtin.int_(values.tm_yday);
        tuple.tm_isdst = new Sk.builtin.int_(values.tm_isdst);

        return tuple;
    };

    const buildStructTime = function (dateObj, useUTC) {
        let year, month, mday, hour, minute, second, weekday, yearday, isdst;

        if (useUTC) {
            year = dateObj.getUTCFullYear();
            month = dateObj.getUTCMonth() + 1;
            mday = dateObj.getUTCDate();
            hour = dateObj.getUTCHours();
            minute = dateObj.getUTCMinutes();
            second = dateObj.getUTCSeconds();
            weekday = (dateObj.getUTCDay() + 6) % 7; // Monday = 0
            yearday = dayOfYearUTC(dateObj);
            isdst = 0;
        } else {
            year = dateObj.getFullYear();
            month = dateObj.getMonth() + 1;
            mday = dateObj.getDate();
            hour = dateObj.getHours();
            minute = dateObj.getMinutes();
            second = dateObj.getSeconds();
            weekday = (dateObj.getDay() + 6) % 7; // Monday = 0
            yearday = dayOfYearLocal(dateObj);
            isdst = getDstFlag(dateObj);
        }

        return makeStructTime({
            tm_year: year,
            tm_mon: month,
            tm_mday: mday,
            tm_hour: hour,
            tm_min: minute,
            tm_sec: second,
            tm_wday: weekday,
            tm_yday: yearday,
            tm_isdst: isdst
        });
    };

    const parseTimeTuple = function (tup) {
        const jsTup = toJs(tup);
        if (!jsTup || jsTup.length < 9) {
            throw new Sk.builtin.TypeError("mktime(): illegal time tuple argument");
        }
        return {
            year: jsTup[0],
            month: jsTup[1],
            mday: jsTup[2],
            hour: jsTup[3],
            minute: jsTup[4],
            second: jsTup[5],
            wday: jsTup[6],
            yday: jsTup[7],
            isdst: jsTup[8]
        };
    };

    const defaultLocalStructTime = function () {
        return buildStructTime(new Date(nowMs()), false);
    };

    time.time = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("time", arguments.length, 0, 0);
        return new Sk.builtin.float_(nowMs() / 1000);
    });

    time.time_ns = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("time_ns", arguments.length, 0, 0);
        return new Sk.builtin.int_(Math.floor(nowMs() * 1e6));
    });

    const sleep = function (secs) {
        Sk.builtin.pyCheckArgsLen("sleep", arguments.length, 1, 1);
        const delay = toNumber(secs, "secs");
        if (delay < 0) {
            throw new Sk.builtin.ValueError("sleep length must be non-negative");
        }
        if (typeof Simulator !== "undefined" && Simulator.sleep_ms) {
            return Simulator.sleep_ms(delay * 1000);
        }
        return pyNone();
    };
    sleep.co_varnames = ["secs"];
    time.sleep = new Sk.builtin.func(sleep);

    time.monotonic = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("monotonic", arguments.length, 0, 0);
        return new Sk.builtin.float_(monotonicMs() / 1000);
    });

    time.monotonic_ns = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("monotonic_ns", arguments.length, 0, 0);
        return new Sk.builtin.int_(Math.floor(monotonicMs() * 1e6));
    });

    time.perf_counter = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("perf_counter", arguments.length, 0, 0);
        return new Sk.builtin.float_(monotonicMs() / 1000);
    });

    time.perf_counter_ns = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("perf_counter_ns", arguments.length, 0, 0);
        return new Sk.builtin.int_(Math.floor(monotonicMs() * 1e6));
    });

    time.process_time = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("process_time", arguments.length, 0, 0);
        return new Sk.builtin.float_((monotonicMs() - MODULE_START_PERF_MS) / 1000);
    });

    time.process_time_ns = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgsLen("process_time_ns", arguments.length, 0, 0);
        return new Sk.builtin.int_(Math.floor((monotonicMs() - MODULE_START_PERF_MS) * 1e6));
    });

    const gmtime = function (secs) {
        Sk.builtin.pyCheckArgsLen("gmtime", arguments.length, 0, 1);
        const timestamp = isNone(secs) ? nowMs() / 1000 : toNumber(secs, "secs");
        return buildStructTime(new Date(UNIX_EPOCH + timestamp * 1000), true);
    };
    gmtime.co_varnames = ["secs"];
    gmtime.$defaults = [Sk.builtin.none()];
    time.gmtime = new Sk.builtin.func(gmtime);

    const localtime = function (secs) {
        Sk.builtin.pyCheckArgsLen("localtime", arguments.length, 0, 1);
        const timestamp = isNone(secs) ? nowMs() / 1000 : toNumber(secs, "secs");
        return buildStructTime(new Date(UNIX_EPOCH + timestamp * 1000), false);
    };
    localtime.co_varnames = ["secs"];
    localtime.$defaults = [Sk.builtin.none()];
    time.localtime = new Sk.builtin.func(localtime);

    const mktime = function (tup) {
        Sk.builtin.pyCheckArgsLen("mktime", arguments.length, 1, 1);
        const t = parseTimeTuple(tup);
        const millis = new Date(t.year, t.month - 1, t.mday, t.hour, t.minute, t.second).getTime();
        return new Sk.builtin.float_(millis / 1000);
    };
    mktime.co_varnames = ["t"];
    time.mktime = new Sk.builtin.func(mktime);

    const asctime = function (tup) {
        Sk.builtin.pyCheckArgsLen("asctime", arguments.length, 0, 1);
        const t = isNone(tup) ? toJs(defaultLocalStructTime()) : toJs(tup);
        const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const str = weekdays[t[6]] + " " + months[t[1] - 1] + " " + String(t[2]).padStart(2, " ") + " " +
            pad2(t[3]) + ":" + pad2(t[4]) + ":" + pad2(t[5]) + " " + t[0];
        return new Sk.builtin.str(str);
    };
    asctime.co_varnames = ["t"];
    asctime.$defaults = [Sk.builtin.none()];
    time.asctime = new Sk.builtin.func(asctime);

    const ctime = function (secs) {
        Sk.builtin.pyCheckArgsLen("ctime", arguments.length, 0, 1);
        const timestamp = isNone(secs) ? nowMs() / 1000 : toNumber(secs, "secs");
        return asctime(localtime(new Sk.builtin.float_(timestamp)));
    };
    ctime.co_varnames = ["secs"];
    ctime.$defaults = [Sk.builtin.none()];
    time.ctime = new Sk.builtin.func(ctime);

    const strftime = function (format, tup) {
        Sk.builtin.pyCheckArgsLen("strftime", arguments.length, 1, 2);
        Sk.builtin.pyCheckType("format", "string", Sk.builtin.checkString(format));

        const t = isNone(tup) ? toJs(defaultLocalStructTime()) : toJs(tup);
        const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const replacements = {
            "%Y": String(t[0]),
            "%y": pad2(t[0] % 100),
            "%m": pad2(t[1]),
            "%B": monthsLong[t[1] - 1],
            "%b": monthsShort[t[1] - 1],
            "%h": monthsShort[t[1] - 1],
            "%d": pad2(t[2]),
            "%e": String(t[2]).padStart(2, " "),
            "%H": pad2(t[3]),
            "%I": pad2(((t[3] + 11) % 12) + 1),
            "%p": t[3] < 12 ? "AM" : "PM",
            "%M": pad2(t[4]),
            "%S": pad2(t[5]),
            "%a": weekdaysShort[t[6]],
            "%A": weekdaysLong[t[6]],
            "%w": String((t[6] + 1) % 7),
            "%u": String(t[6] + 1),
            "%j": String(t[7]).padStart(3, "0"),
            "%Z": getZoneName(new Date()),
            "%%": "%",
            "%c": null,
            "%x": null,
            "%X": null
        };

        replacements["%X"] = replacements["%H"] + ":" + replacements["%M"] + ":" + replacements["%S"];
        replacements["%x"] = replacements["%m"] + "/" + replacements["%d"] + "/" + replacements["%y"];
        replacements["%c"] = weekdaysShort[t[6]] + " " + monthsShort[t[1] - 1] + " " + String(t[2]).padStart(2, " ") + " " + replacements["%X"] + " " + t[0];

        const result = format.v.replace(/%[YymBbhdeHIpMSaAwujZcxX%]/g, function (token) {
            return Object.prototype.hasOwnProperty.call(replacements, token) ? replacements[token] : token;
        });

        return new Sk.builtin.str(result);
    };
    strftime.co_varnames = ["format", "t"];
    strftime.$defaults = [Sk.builtin.none()];
    time.strftime = new Sk.builtin.func(strftime);

    const strptime = function (string, format) {
        throw new Sk.builtin.NotImplementedError("time.strptime() is not implemented in this Skulpt module");
    };
    strptime.co_varnames = ["string", "format"];
    strptime.$defaults = [new Sk.builtin.str("%a %b %d %H:%M:%S %Y")];
    time.strptime = new Sk.builtin.func(strptime);

    const get_clock_info = function (clockName) {
        Sk.builtin.pyCheckArgsLen("get_clock_info", arguments.length, 1, 1);
        Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(clockName));

        const nameValue = clockName.v;
        const info = {
            implementation: "skulpt-javascript",
            monotonic: false,
            adjustable: true,
            resolution: 0.001
        };

        if (["monotonic", "perf_counter"].includes(nameValue)) {
            info.monotonic = true;
            info.adjustable = false;
            info.resolution = 0.000001;
        } else if (["process_time", "thread_time"].includes(nameValue)) {
            info.monotonic = true;
            info.adjustable = false;
            info.resolution = 0.000001;
        } else if (nameValue !== "time") {
            throw new Sk.builtin.ValueError("unknown clock");
        }

        const obj = new Sk.builtin.object();
        obj.implementation = new Sk.builtin.str(info.implementation);
        obj.monotonic = new Sk.builtin.bool(info.monotonic);
        obj.adjustable = new Sk.builtin.bool(info.adjustable);
        obj.resolution = new Sk.builtin.float_(info.resolution);
        return obj;
    };
    get_clock_info.co_varnames = ["name"];
    time.get_clock_info = new Sk.builtin.func(get_clock_info);

    // CPython-like constants. Values are browser/runtime dependent approximations.
    const now = new Date();
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const stdOffsetMinutes = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    const dstOffsetMinutes = Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset());

    time.timezone = new Sk.builtin.int_(stdOffsetMinutes * 60);
    time.altzone = new Sk.builtin.int_(dstOffsetMinutes * 60);
    time.daylight = new Sk.builtin.int_(stdOffsetMinutes !== dstOffsetMinutes ? 1 : 0);
    time.tzname = new Sk.builtin.tuple([
        new Sk.builtin.str(getZoneName(jan)),
        new Sk.builtin.str(getZoneName(jul))
    ]);

    return time;
};
