// MicroPython - utime module

var $builtinmodule = function () {

  var time = {};

  time.__name__ = new Sk.builtin.str('utime');

  const ORIGIN_DATE = Date.UTC(2000, 0, 1, 0, 0, 0);

  function build_struct_time(dateObj, useUTC) {
    let year, month, mday, hour, minute, second, weekday, yearday;

    if (useUTC) {
      year = dateObj.getUTCFullYear();
      month = dateObj.getUTCMonth() + 1;
      mday = dateObj.getUTCDate();
      hour = dateObj.getUTCHours();
      minute = dateObj.getUTCMinutes();
      second = dateObj.getUTCSeconds();
      weekday = (dateObj.getUTCDay() + 6) % 7;
      const startOfYearUTC = Date.UTC(year, 0, 1);
      yearday = Math.floor((dateObj.getTime() - startOfYearUTC) / 86400000) + 1;
    } else {
      year = dateObj.getFullYear();
      month = dateObj.getMonth() + 1;
      mday = dateObj.getDate();
      hour = dateObj.getHours();
      minute = dateObj.getMinutes();
      second = dateObj.getSeconds();
      weekday = (dateObj.getDay() + 6) % 7;
      const startOfYearLocal = new Date(year, 0, 1);
      yearday = Math.floor((dateObj - startOfYearLocal) / 86400000) + 1;
    }
    return new Sk.builtin.tuple([year, month, mday, hour, minute, second, weekday, yearday].map(i => new Sk.builtin.int_(i)));
  }

  const gmtime = function (secs) {
    Sk.builtin.pyCheckArgsLen("gmtime", arguments.length, 0, 1);
    Sk.builtin.pyCheckType("secs", "integer", Sk.builtin.checkInt(secs));
    return build_struct_time(new Date(ORIGIN_DATE + secs.v * 1000), true);
  };
  gmtime.co_varnames = ['secs'];
  gmtime.$defaults = [new Sk.builtin.int_(Math.floor((Date.now() - ORIGIN_DATE) / 1000))];
  time.gmtime = new Sk.builtin.func(gmtime);

  const localtime = function (secs) {
    Sk.builtin.pyCheckArgsLen("localtime", arguments.length, 0, 1);
    Sk.builtin.pyCheckType("secs", "integer", Sk.builtin.checkInt(secs));
    return build_struct_time(new Date(ORIGIN_DATE + secs.v * 1000), false);
  };
  localtime.co_varnames = ['secs'];
  localtime.$defaults = [new Sk.builtin.int_(Math.floor((Date.now() - ORIGIN_DATE) / 1000))];
  time.localtime = new Sk.builtin.func(localtime);

  time.mktime = new Sk.builtin.func(function (tup) {
    Sk.builtin.pyCheckArgsLen("mktime", arguments.length, 1, 1);
    const jsTup = Sk.ffi.remapToJs(tup);
    const year = jsTup[0];
    const month = jsTup[1];
    const mday = jsTup[2];
    const hour = jsTup[3] || 0;
    const minute = jsTup[4] || 0;
    const second = jsTup[5] || 0;
    const millis = Date.UTC(year, month - 1, mday, hour, minute, second) - ORIGIN_DATE;
    return new Sk.builtin.int_(Math.floor(millis / 1000));
  });

  time.time = new Sk.builtin.func(function () {
    Sk.builtin.pyCheckArgsLen("time", arguments.length, 0, 0);
    return new Sk.builtin.int_(Math.floor((Date.now() - ORIGIN_DATE) / 1000));
  });

  time.sleep = new Sk.builtin.func(function (delay) {
    Sk.builtin.pyCheckArgsLen("sleep", arguments.length, 1, 1);
    Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
    return Simulator.sleep_ms(Sk.ffi.remapToJs(delay) * 1000);
  });

  time.sleep_ms = new Sk.builtin.func(function (delay) {
    Sk.builtin.pyCheckArgsLen("sleep_ms", arguments.length, 1, 1);
    Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
    return Simulator.sleep_ms(Sk.ffi.remapToJs(delay));
  });

  time.sleep_us = new Sk.builtin.func(function (delay) {
    Sk.builtin.pyCheckArgsLen("sleep_us", arguments.length, 1, 1);
    Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
    return Simulator.sleep_ms(Sk.ffi.remapToJs(delay) / 1000);
  });

  time.ticks_ms = new Sk.builtin.func(function () {
    return new Sk.builtin.float_(Date.now() - Simulator.startTime);
  });

  time.ticks_us = new Sk.builtin.func(function () {
    return new Sk.builtin.float_((Date.now() - Simulator.startTime) * 1000);
  });

  time.ticks_cpu = new Sk.builtin.func(function () {
    Sk.builtin.pyCheckArgsLen("ticks_cpu", arguments.length, 0, 0);
    let v;
    if (typeof performance !== "undefined" && performance.now) {
      v = performance.now() * 1000;
    } else {
      v = (Date.now() - Simulator.startTime) * 1000;
    }
    return new Sk.builtin.int_(Math.round(v));
  });

  time.ticks_add = new Sk.builtin.func(function (ticks, delta) {
    Sk.builtin.pyCheckArgsLen("ticks_add", arguments.length, 2, 2);
    Sk.builtin.pyCheckType("ticks", "float", Sk.builtin.checkNumber(ticks));
    Sk.builtin.pyCheckType("delta", "float", Sk.builtin.checkNumber(delta));
    return new Sk.builtin.float_(ticks.v + delta.v);
  });

  time.ticks_diff = new Sk.builtin.func(function (ticks1, ticks2) {
    Sk.builtin.pyCheckArgsLen("ticks_diff", arguments.length, 2, 2);
    Sk.builtin.pyCheckType("ticks1", "float", Sk.builtin.checkNumber(ticks1));
    Sk.builtin.pyCheckType("ticks2", "float", Sk.builtin.checkNumber(ticks2));
    return new Sk.builtin.float_(ticks1.v - ticks2.v);
  });

  time.time_ns = new Sk.builtin.func(function () {
    Sk.builtin.pyCheckArgsLen("time_ns", arguments.length, 0, 0);
    return new Sk.builtin.int_(Math.floor((Date.now() - ORIGIN_DATE) * 1e6));
  });

  return time;
};
