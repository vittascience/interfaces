# DFRobot DFR0997 colour screen over I2C, port of github.com/DFRobot/pxt-DFRobot_lcdDisplay (lcdDisplay.ts).
# Objects (text, shapes, widgets...) are identified by a number per kind: drawing again with the same number updates the object.
from microbit import i2c, sleep

_chart = 0
_x_axis = []
_y_min = 0
_factor = 1

sleep(1000)  # screen boot


def _send(cmd, data=b''):
    frame = bytes([0x55, 0xAA, len(data) + 1, cmd]) + data
    for i in range(0, len(frame), 32):
        i2c.write(0x2C, frame[i:i + 32], i + 32 < len(frame))


def _rgb(color):
    # 0xRRGGBB number, (r, g, b) tuple (colour picker) or '#rrggbb' string
    if isinstance(color, str):
        color = int(color.lstrip('#'), 16)
    elif isinstance(color, tuple):
        color = (int(color[0]) << 16) | (int(color[1]) << 8) | int(color[2])
    color = int(color)
    return bytes([(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF])


def _u16(*values):
    return bytes(b for v in values for b in (int(v) >> 8 & 0xFF, int(v) & 0xFF))


def _str(value, limit=242):
    return str(value).encode()[:limit]


def rgb(r, g, b):
    return (int(r) & 0xFF) << 16 | (int(g) & 0xFF) << 8 | int(b) & 0xFF


def clear():
    _send(0x1D)
    sleep(1500)


def background_color(color):
    _send(0x19, _rgb(color))
    sleep(300)


def background_image(name):
    _send(0x1A, bytes([1]) + _str(name))  # 1: USB drive


def text(value, num, x, y, size, color):
    _send(0x18, bytes([int(num), int(size)]) + _rgb(color) + _u16(x, y) + _str(value))


def image(num, name, x, y, zoom):
    _send(0x09, bytes([int(num)]) + _u16(zoom, x, y) + _str(name))


def rotate_image(num, angle):
    _send(0x1E, bytes([0x08, int(num)]) + _u16(int(angle) * 10))


def gif(num, name, x, y, zoom):
    _send(0x20, bytes([int(num)]) + _u16(zoom, x, y) + _str(name))


def line(num, x1, y1, x2, y2, width, color):
    _send(0x03, bytes([int(num), int(width)]) + _rgb(color) + _u16(x1, y1, x2, y2))


def rect(num, x, y, w, h, width, color, fill, fill_color, rounded):
    _send(0x04, bytes([int(num), int(width)]) + _rgb(color) + bytes([fill]) + _rgb(fill_color) + bytes([rounded]) + _u16(x, y, w, h))


def circle(num, x, y, r, width, color, fill, fill_color):
    _send(0x06, bytes([int(num), int(width)]) + _rgb(color) + bytes([fill]) + _rgb(fill_color) + _u16(r, x, y))


def triangle(num, x1, y1, x2, y2, x3, y3, width, color, fill, fill_color):
    _send(0x07, bytes([int(num), int(width)]) + _rgb(color) + bytes([fill]) + _rgb(fill_color) + _u16(x1, y1, x2, y2, x3, y3))


def slider(num, x, y, w, h, color):
    _send(0x0C, bytes([int(num)]) + _rgb(color) + _u16(x, y, w, h))


def bar(num, x, y, w, h, color):
    _send(0x0A, bytes([int(num)]) + _rgb(color) + _u16(x, y, w, h))


def compass(num, x, y, diameter):
    _send(0x0E, bytes([int(num)]) + _u16(diameter, x, y))


def gauge(num, x, y, diameter, start, end, color, bg_color):
    _send(0x12, bytes([int(num)]) + _u16(diameter, start, end) + _rgb(color) + _rgb(bg_color) + _u16(x, y))


def line_meter(num, x, y, size, start, end, color, bg_color):
    _send(0x10, bytes([int(num)]) + _u16(size, start, end) + _rgb(color) + _rgb(bg_color) + _u16(x, y))


def set_value(kind, num, value):
    # kind: command of the widget value (0x0D slider, 0x0B bar, 0x0F compass, 0x13 gauge, 0x11 line meter)
    if kind == 0x0F:
        value = int(value) * 10  # compass: tenths of degree
    _send(kind, bytes([int(num)]) + _u16(value))


def remove(kind, num):
    # kind: command that draws the object (0x18 text, 0x08 image, 0x1F GIF, 0x03 line...)
    _send(0x1B, bytes([kind, int(num)]))


def chart(num, x_labels, y_labels, color, style):
    # Labels are separated by spaces, the Y labels from top to bottom ("100 50 0").
    global _chart, _x_axis, _y_min, _factor
    _chart = int(num)
    _x_axis = str(x_labels).split()
    y_axis = str(y_labels).split()
    _y_min = int(y_axis[-1])
    _factor = abs(int(y_axis[0]) - _y_min) / 100 or 1
    _send(0x14, bytes([_chart, style]) + _rgb(color))
    sleep(100)
    _send(0x15, bytes([_chart, 0]) + '\n'.join(_x_axis).encode())
    sleep(100)
    _send(0x15, bytes([_chart, 1]) + '\n'.join(y_axis).encode())


def chart_series(num, color):
    _send(0x16, bytes([int(num), _chart]) + _rgb(color))
    _send(0x17, bytes([_chart, int(num), 0, 0]) + _u16(*[0] * len(_x_axis)))


def chart_point(num, x_label, value):
    label = str(x_label)
    if label in _x_axis and _y_min <= value <= _y_min + _factor * 100:
        _send(0x17, bytes([_chart, int(num), 1, _x_axis.index(label)]) + _u16(round((value - _y_min) / _factor)))
