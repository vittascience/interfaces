# Simulation of a4_weight: the mass slider is the load on the scale, the keypad slider the key held down.
from microbit import sleep

factor = 2236  # calibration factor, raw value per gram
_offset = None
_empty = None
_KEYS = '123A456B789C*0#D'


def _raw():
    return 8000000 + simulator_getSliderValue('a4-mass_slider', 'float') * 2236


def raw_average(samples=12):
    return _raw()


def init():
    global _offset
    _offset = _raw()


def tare():
    init()


def mass():
    if _offset is None:
        init()
    grams = (_raw() - _offset) / factor
    return 0 if abs(grams) < 0.5 or abs(grams) > 5000 else grams


def connected():
    return True


def start_calibration():
    global _empty
    tare()
    _empty = _offset


def calibrate(reference):
    global factor, _offset, _empty
    if _empty is None:
        return False
    empty = _empty
    _empty = None
    new_factor = (_raw() - empty) / max(1, min(1000, reference))
    if not 0 < new_factor <= 1000000:
        return False
    factor = new_factor
    _offset = empty
    return True


def pressed_key():
    index = simulator_getSliderValue('a4-keypad4x4_slider', 'int')
    if not index:
        return ''
    simulator_setSliderValue('a4-keypad4x4_slider', 0)  # the key is released once read
    return _KEYS[index - 1]


def wait_key():
    key = pressed_key()
    while not key:
        sleep(20)
        key = pressed_key()
    return key
