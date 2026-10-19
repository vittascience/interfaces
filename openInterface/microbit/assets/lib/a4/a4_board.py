# DFRobot DFR1216 expansion board of the A4 microSySTEM models (I2C 0x33): servo S0, ports C0-C5, battery, RGB LEDs.
from microbit import i2c, sleep

_brightness = 255
_leds = (0, 0, 0, 0, 0, 0)


def _clamp(value):
    return max(0, min(255, int(value)))


def servo(angle):
    pulse = 500 + max(0, min(180, int(angle))) * 11
    i2c.write(0x33, bytes([0x18, pulse >> 8, pulse & 0xFF]))


def read_port(port):
    i2c.write(0x33, bytes([0x2C + port, 5]))
    sleep(10)
    i2c.write(0x33, bytes([0x3F + port]))
    return i2c.read(0x33, 1)[0]


def write_port(port, value):
    i2c.write(0x33, bytes([0x2C + port, 4]))
    i2c.write(0x33, bytes([0x39 + port, value]))


def battery():
    i2c.write(0x33, bytes([0x87]))
    return i2c.read(0x33, 1)[0]


def set_leds(rgb0, rgb1):
    global _leds
    _leds = tuple(_clamp(c) for c in tuple(rgb0) + tuple(rgb1))
    i2c.write(0x33, bytes((0x90, 1, _brightness) + _leds))


def set_brightness(brightness):
    global _brightness
    _brightness = _clamp(brightness)
    set_leds(_leds[:3], _leds[3:])
