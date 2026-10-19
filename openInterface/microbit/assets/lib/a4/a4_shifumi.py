# A4 Technologie microSySTEM-ShiFuMi: ultrasonic sensor (P2), disc backlight (P0), 16x2 LCD (I2C 0x3E).
# The disc servo is on S0 of the board (a4_board).
from microbit import i2c, pin0, pin2, sleep
from machine import time_pulse_us
import neopixel
import utime
from a4_board import servo  # the disc servo is on S0 of the board

_backlight = neopixel.NeoPixel(pin0, 1)
_brightness = 80
_rgb = (0, 0, 0)
_lcd = False


def distance():
    pin2.write_digital(0)
    utime.sleep_us(2)
    pin2.write_digital(1)
    utime.sleep_us(10)
    pin2.write_digital(0)
    pin2.read_digital()
    pin2.set_pull(pin2.NO_PULL)
    duration = time_pulse_us(pin2, 1, 30000)
    return -1 if duration <= 0 else round(duration / 58)


def hand_detected(threshold):
    measure = distance()
    return 0 < measure <= threshold


def set_backlight(rgb):
    global _rgb
    _rgb = tuple(max(0, min(255, int(c))) for c in rgb)
    _backlight[0] = tuple(c * _brightness // 255 for c in _rgb)
    _backlight.show()


def set_brightness(percent):
    global _brightness
    _brightness = max(0, min(100, int(percent))) * 255 // 100
    set_backlight(_rgb)


def _command(command):
    i2c.write(0x3E, bytes([0x80, command]))
    sleep(2)


def lcd_init():
    global _lcd
    sleep(50)
    for command in (0x38, 0x39, 0x14, 0x70, 0x56, 0x6C):
        _command(command)
        sleep(5)
    sleep(200)
    for command in (0x38, 0x0C, 0x01):
        _command(command)
    sleep(10)
    _lcd = True


def lcd_clear():
    if not _lcd:
        lcd_init()
    _command(0x01)
    sleep(10)


def lcd_show(text, line):
    if not _lcd:
        lcd_init()
    _command(0xC0 if line == 2 else 0x80)
    for char in (str(text) + ' ' * 16)[:16]:
        i2c.write(0x3E, bytes([0x40, ord(char) & 0xFF]))
