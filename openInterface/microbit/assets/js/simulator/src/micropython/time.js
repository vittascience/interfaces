// BBC micro:bit - utime module

var $builtinmodule = function () {

  var time = {};

  time.__name__ = new Sk.builtin.str('utime');

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
    return new Sk.builtin.float_((Date.now() - Simulator.startTime) * 1000)
  });

  time.ticks_add = new Sk.builtin.func(function () {
    throw new Sk.builtin.NotImplementedError("utime.ticks_add() is not yet implemented");
  });

  time.ticks_diff = new Sk.builtin.func(function (ticks1, ticks2) {
    Sk.builtin.pyCheckArgsLen("ticks_diff", arguments.length, 2, 2);
    Sk.builtin.pyCheckType("ticks1", "float", Sk.builtin.checkNumber(ticks1));
    Sk.builtin.pyCheckType("ticks2", "float", Sk.builtin.checkNumber(ticks2));
    return new Sk.builtin.float_(ticks1.v - ticks2.v);
  });

  return time;
};
