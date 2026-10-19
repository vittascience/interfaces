# Simulation of a4_access: the keypad slider gives one key, read once like a real key press.
from microbit import sleep

_KEYS = '123456789*0#'
_keys = []
_code = ''


def _poll():
    global _code
    index = simulator_getSliderValue('a4-keypad_slider', 'int')
    if not index:
        return
    simulator_setSliderValue('a4-keypad_slider', 0)
    key = _KEYS[index - 1]
    _keys.append(key)
    if key == '*':
        _code = ''
    elif key != '#' and len(_code) < 16:
        _code += key


def door_is(closed):
    return (simulator_getSliderValue('a4-door_slider', 'int') == 1) == closed


def read_key():
    _poll()
    return _keys.pop(0) if _keys else ''


def wait_key():
    while True:
        key = read_key()
        if key:
            return key
        sleep(20)


def entered_code():
    _poll()
    return _code


def clear_code():
    global _code
    _poll()
    _code = ''


def delete_last():
    global _code
    _poll()
    _code = _code[:-1]
