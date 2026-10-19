# A4 Technologie microSySTEM-Access: door sensor (P0) and capacitive keypad (UART P14/P15).
# The magnetic lock is on the C0 port of the board (a4_board).
import micropython
from microbit import uart, pin0, pin14, pin15, sleep

_KEYS = '123456789*0#'  # keypad bytes 0xE1 to 0xEC
_keys = []
_code = ''
_ready = False


def _poll():
    global _code, _ready
    if not _ready:
        micropython.kbd_intr(-1)  # a 0x03 byte received must not stop the program
        uart.init(baudrate=9600, tx=pin14, rx=pin15)
        _ready = True
        sleep(100)
    data = uart.read()
    for byte in data or b'':
        if 0xE1 <= byte <= 0xEC:
            key = _KEYS[byte - 0xE1]
            if len(_keys) >= 16:
                _keys.pop(0)
            _keys.append(key)
            if key == '*':
                _code = ''
            elif key != '#' and len(_code) < 16:
                _code += key


def door_is(closed):
    return (pin0.read_digital() == 1) == closed


def wait_key():
    while True:
        key = read_key()
        if key:
            return key
        sleep(20)


def read_key():
    _poll()
    return _keys.pop(0) if _keys else ''


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
