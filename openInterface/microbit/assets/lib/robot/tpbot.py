# ELECFREAKS TPBot robot, port of github.com/elecfreaks/pxt-tpbot (V1.ts and V2.ts).
# Like the MakeCode extension, every I2C command is sent in the V1 and V2 formats to drive both board versions.
from microbit import i2c, pin13, pin14, pin15, pin16
from machine import time_pulse_us
from utime import sleep_us

_ADDR = 0x10

pin13.set_pull(pin13.NO_PULL)
pin14.set_pull(pin14.NO_PULL)


def _send(v1, command, params):
    i2c.write(_ADDR, bytes(v1))
    i2c.write(_ADDR, bytes([0xFF, 0xF9, command, len(params)] + params))


def set_wheels(left, right):
    """Wheel speeds from -100 to 100 (negative: backward)."""
    direction = (1 if left < 0 else 0) | (2 if right < 0 else 0)
    left = min(abs(int(left)), 100)
    right = min(abs(int(right)), 100)
    _send([0x01, left, right, direction], 0x10, [left, right, direction])


def stop():
    set_wheels(0, 0)


def headlights(color):
    """Headlights colour as an (r, g, b) tuple, (0, 0, 0) turns them off."""
    r, g, b = [max(0, min(int(value), 255)) for value in color]
    _send([0x20, r, g, b], 0x30, [r, g, b])


def servo(number, angle):
    """Angle from 0 to 180 degrees of the servo S1 to S4."""
    number = max(1, min(int(number), 4))
    angle = max(0, min(int(angle), 180))
    _send([0x10 + number - 1, angle, 0, 0], 0x20, [number, angle])


def track(side):
    """Line sensor state, 0: black (line), 1: white. side 0: left (P13), 1: right (P14)."""
    return (pin14 if side else pin13).read_digital()


def distance(unit='cm'):
    """Distance of the ultrasonic sensor in 'cm' or 'inch', 0 when nothing is detected."""
    pin16.write_digital(0)
    sleep_us(2)
    pin16.write_digital(1)
    sleep_us(10)
    pin16.write_digital(0)
    duration = max(time_pulse_us(pin15, 1, 500 * 58), 0)
    return duration // (148 if unit == 'inch' else 58)
