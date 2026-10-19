# A4 Technologie microSySTEM-Weight: I2C weighing module (0x64) and 4x4 keypad (columns P3 P2 P1 P0, rows P15 P14 P13 P8).
from microbit import i2c, display, pin0, pin1, pin2, pin3, pin8, pin13, pin14, pin15, sleep

factor = 2236  # calibration factor, raw value per gram
_offset = None
_empty = None
_COLUMNS = (pin3, pin2, pin1, pin0)
_ROWS = (pin15, pin14, pin13, pin8)
_KEYS = '123A456B789C*0#D'
_keypad = False


def _raw():
    i2c.write(0x64, bytes([0x66]))
    sleep(22)
    data = i2c.read(0x64, 4)
    if data[0] != 0x12:
        return -1
    return ((data[1] << 16) | (data[2] << 8) | data[3]) ^ 0x800000


def raw_average(samples=12):
    samples = max(1, min(50, int(samples)))
    total = count = attempts = 0
    while count < samples and attempts < samples * 4:
        value = _raw()
        attempts += 1
        if value >= 0:
            total += value
            count += 1
        sleep(20)
    return total / count if count else -1


def _settle(command, value, wait, samples):
    global _offset
    i2c.write(0x64, bytes([command, value]))
    sleep(wait)
    for _ in range(5):
        _raw()
        sleep(30)
    value = raw_average(samples)
    if value >= 0:
        _offset = value


def init():
    _settle(0x70, 0x65, 250, 15)


def tare():
    if _offset is None:
        init()
    _settle(0x73, 0, 500, 20)


def mass():
    if _offset is None:
        init()
    value = raw_average()
    if value < 0 or _offset is None:
        return 0
    grams = (value - _offset) / factor
    return 0 if abs(grams) < 0.5 or abs(grams) > 5000 else grams


def connected():
    return _raw() >= 0


def start_calibration():
    global _empty
    tare()
    _empty = _offset


def calibrate(reference):
    global factor, _offset, _empty
    if _empty is None:
        return False
    value = raw_average(30)
    empty, _empty = _empty, None
    new_factor = (value - empty) / max(1, min(1000, reference))
    if value < 0 or not 0 < new_factor <= 1000000:
        return False
    factor = new_factor
    _offset = empty
    return True


def _scan():
    global _keypad
    if not _keypad:
        display.off()  # P3 is a column of the keypad
        for pin in _ROWS:
            pin.read_digital()
            pin.set_pull(pin.PULL_UP)
        _keypad = True
    key = ''
    for column, column_pin in enumerate(_COLUMNS):
        for pin in _COLUMNS:
            pin.write_digital(pin is not column_pin)
        for row, row_pin in enumerate(_ROWS):
            if not key and row_pin.read_digital() == 0:
                key = _KEYS[row * 4 + column]
    for pin in _COLUMNS:
        pin.write_digital(1)
    return key


def pressed_key():
    key = _scan()
    if key:
        sleep(50)
        if _scan() != key:
            return ''
    return key


def wait_key():
    key = ''
    while not key:
        key = pressed_key()
        sleep(10)
    while _scan():
        sleep(10)
    return key
