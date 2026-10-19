# DFRobot DFR0548 micro:bit Driver Expansion Board (micro:Driver): PCA9685 at I2C 0x40.
# Port of github.com/DFRobot/pxt-motor: motors M1-M4 on channels 6-7, 4-5, 2-3, 0-1, servos S1-S8 on channels 15-8.
from microbit import i2c, sleep

SERVO_MIN_US = 600   # calibration: pulse at 0 degree (the PCA9685 clock can drift a few %)
SERVO_MAX_US = 2400  # pulse at 180 degrees
# Stepper phases (on, off) of pxt-motor: 42BYGH1861A-C and 28BYJ-48
_P42 = ((3071, 1023), (1023, 3071), (4095, 2047), (2047, 4095))
_P28 = ((2047, 4095), (1, 2047), (1023, 3071), (3071, 1023))

def _write(reg, value):
    i2c.write(0x40, bytes([reg, value]))

def _pwm(channel, off, on=0):
    i2c.write(0x40, bytes([0x06 + 4 * channel, on & 0xFF, on >> 8, off & 0xFF, off >> 8]))

def _init():
    _write(0x00, 0x10)  # sleep to set the prescaler
    _write(0xFE, 121)   # 50 Hz: 25 MHz / 4096 / 50 - 1
    _write(0x00, 0x00)
    sleep(5)
    _write(0x00, 0xA1)  # restart + auto-increment (needed by _pwm) + all call

def servo(index, degree):
    degree = max(0, min(180, degree))
    _pwm(16 - index, int((SERVO_MIN_US + (SERVO_MAX_US - SERVO_MIN_US) * degree / 180) * 4096 / 20000))

def motor_run(index, direction, speed):
    # speed in %, direction 1 = clockwise, -1 = counter-clockwise
    speed = max(0, min(4095, int(speed * 4095 / 100)))
    channel = (4 - index) * 2
    _pwm(channel + 1, speed if direction > 0 else 0)
    _pwm(channel, 0 if direction > 0 else speed)

def motor_stop(index):
    motor_run(index, 1, 0)

def stop_all():
    for index in range(1, 5):
        motor_stop(index)

def _stepper_start(kind, index, direction):
    # index 1 = motors M1+M2 (channels 4-7), 2 = M3+M4 (channels 0-3)
    base = 4 if index == 1 else 0
    for k in range(4):
        if kind == 42:
            channel = 3 - (k if direction > 0 else (k + 2) % 4)
            on, off = _P42[k]
        else:
            channel = (0, 2, 1, 3)[k]
            channel = channel if direction > 0 else 3 - channel
            on, off = _P28[k]
        _pwm(base + channel, off, on)

def _stepper_stop(index):
    motor_stop(2 * index - 1)
    motor_stop(2 * index)

def stepper(kind, index, direction, degree):
    # kind 42 (42BYGH1861A-C) or 28 (28BYJ-48), blocks until the rotation is done
    degree = abs(degree)
    if degree == 0:
        return
    _stepper_start(kind, index, direction)
    sleep(int(degree * 1000 / 360) if kind == 28 else int(degree * 500 / 360))
    _stepper_stop(index)

def stepper_dual(kind, direction1, degree1, direction2, degree2):
    # both steppers (M1+M2 and M3+M4) turn at the same time; pxt-motor uses the 42 timing for both kinds
    degrees = (abs(degree1), abs(degree2))
    if degrees[0] == 0 and degrees[1] == 0:
        return
    for i, direction in enumerate((direction1, direction2)):
        if degrees[i]:
            _stepper_start(kind, i + 1, direction)
    first = 0 if degrees[0] <= degrees[1] else 1
    if degrees[first]:
        sleep(int(degrees[first] * 500 / 360))
        _stepper_stop(first + 1)
    sleep(int((degrees[1 - first] - degrees[first]) * 500 / 360))
    _stepper_stop(2 - first)

_init()
