# Yahboom Tiny:bit robot, port of github.com/lzty634158/Tiny-bit (main.ts).
from micropython import const
from microbit import i2c, pin0, pin1, pin8, pin12, pin13, pin14, pin15, pin16
from machine import time_pulse_us
from utime import sleep_us, sleep_ms
import neopixel

I2C_ADDR = const(0x01)
REG_RGB = const(0x01)
REG_PWM = const(0x02)
_KICK_PWM = const(200)
_KICK_THRESH = const(120)
_KICK_MS = const(20)
_FOLLOW_LINE_KP = const(20)
_FOLLOW_LINE_MAX_SPEED = const(100)
_LEFT_MOTOR_COMPENSATION = 0.05  # 5% of the initial speed.

BUZZER = pin0

_left_speed = 0
_right_speed = 0
_np = None
_ir = None
_ir_code = -1

pin13.set_pull(pin13.NO_PULL)
pin14.set_pull(pin14.NO_PULL)


def _send_pwm(l, r):
    buf = bytearray(5)
    buf[0] = REG_PWM
    buf[1] = l if l > 0 else 0
    buf[2] = -l if l < 0 else 0
    buf[3] = r if r > 0 else 0
    buf[4] = -r if r < 0 else 0
    i2c.write(I2C_ADDR, buf)


def set_motors_speed(left_speed, right_speed, limit=255):
    """Wheel speeds from -255 to 255 (negative: backward)."""
    global _left_speed, _right_speed
    limit = max(0, min(255, int(limit)))
    l = max(-limit, min(limit, int(left_speed)))
    r = max(-limit, min(limit, int(right_speed)))
    # The motors do not start at a low PWM: a short kick gets them moving.
    kick = min(_KICK_PWM, limit)
    kl = (kick if l > 0 else -kick) if (_left_speed == 0 and 0 < abs(l) < _KICK_THRESH) else l
    kr = (kick if r > 0 else -kick) if (_right_speed == 0 and 0 < abs(r) < _KICK_THRESH) else r
    if kl != l or kr != r:
        _send_pwm(kl, kr)
        sleep_ms(_KICK_MS)
    _send_pwm(l, r)
    _left_speed, _right_speed = l, r


def _speed(speed):
    return max(0, min(255, int(speed)))


def set_motor(motor, direction, speed):
    """motor 1: left, 2: right, 3: both. direction 1: forward, 2: backward."""
    value = _speed(speed) if direction == 1 else -_speed(speed)
    set_motors_speed(_left_speed if motor == 2 else value, _right_speed if motor == 1 else value)


def go_forward(speed):
    sp = _speed(speed)
    set_motors_speed(sp + sp * _LEFT_MOTOR_COMPENSATION, sp)


def go_backward(speed):
    set_motors_speed(-_speed(speed), -_speed(speed))


def turn_left(speed):
    set_motors_speed(0, _speed(speed))


def turn_right(speed):
    set_motors_speed(_speed(speed), 0)


def spin_left(speed):
    set_motors_speed(-_speed(speed), _speed(speed))


def spin_right(speed):
    set_motors_speed(_speed(speed), -_speed(speed))


def stop():
    set_motors_speed(0, 0)


def follow_line(speed):
    base = min(_FOLLOW_LINE_MAX_SPEED, int(speed))
    if base <= 0:
        set_motors_speed(0, 0, limit=_FOLLOW_LINE_MAX_SPEED)
        return
    state = get_tracking_state()
    error = 1 if state == 1 else -1 if state == 2 else 0
    correction = _FOLLOW_LINE_KP * error
    left = base - correction + base * _LEFT_MOTOR_COMPENSATION
    right = base + correction
    if correction > 0:
        left = -70
    elif correction < 0:
        right = -70
    set_motors_speed(left, right, limit=_FOLLOW_LINE_MAX_SPEED)


def set_headlights(color):
    """Headlights colour as an (r, g, b) tuple, (0, 0, 0) turns them off."""
    i2c.write(I2C_ADDR, bytes([REG_RGB] + [max(0, min(255, int(value))) for value in color]))


def set_neopixel(led, color):
    """Colour of the chassis LEDs as an (r, g, b) tuple. led 0: left, 1: right, 2: both."""
    global _np
    if _np is None:
        _np = neopixel.NeoPixel(pin12, 2)
    color = tuple(max(0, min(255, int(value))) for value in color)
    if led != 1:
        _np[0] = color
    if led != 0:
        _np[1] = color
    _np.show()


def track(side):
    """Line sensor state, 0: white, 1: black (line). side 0: left (P13), 1: right (P14)."""
    return (pin14 if side else pin13).read_digital()


def get_tracking_state():
    """0: no sensor on the line, 1: left, 2: right, 3: both."""
    return track(0) + 2 * track(1)


def get_distance():
    """Distance of the ultrasonic sensor in cm, -1 when nothing is detected."""
    pin16.write_digital(0)
    sleep_us(2)
    pin16.write_digital(1)
    sleep_us(10)
    pin16.write_digital(0)
    duration = time_pulse_us(pin15, 1, 30000)
    if duration <= 0:
        return -1
    return int(round(duration / 58))


def get_sound():
    return pin1.read_analog()


def _ir_callback(cmd, addr, ext):
    global _ir_code
    _ir_code = cmd


def ir_read():
    """Wait for a key of the Yahboom remote (P8), for a few seconds at most."""
    global _ir, _ir_code
    if _ir is None:
        from nec_remote import NEC_8
        _ir = NEC_8(pin8, _ir_callback)
    _ir_code = -1
    _ir.decode()


def ir_code():
    """Code of the key got by the last ir_read(), -1 if there is none."""
    return _ir_code
