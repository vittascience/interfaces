# Simulation of dfr0997 (DFRobot colour screen 320x240): the objects are drawn by the "dfr0997-screen" module.
# An object is [kind, num, ...parameters], drawing again the same kind and number replaces it like on the real screen.
_KINDS = {0x18: 'text', 0x08: 'image', 0x1F: 'gif', 0x03: 'line', 0x04: 'rect', 0x06: 'circle', 0x07: 'triangle',
          0x0C: 'slider', 0x0A: 'bar', 0x0E: 'compass', 0x12: 'gauge', 0x10: 'line_meter', 0x14: 'chart'}
_VALUES = {0x0D: 'slider', 0x0B: 'bar', 0x0F: 'compass', 0x13: 'gauge', 0x11: 'line_meter'}
_background = 0
_background_image = ''
_objects = []
_chart = 0
_x_axis = []
_y_min = 0
_factor = 1


def _show():
    simulator_setOutput('dfr0997-screen', [_background, _background_image, _objects])


def _rgb(color):
    if isinstance(color, str):
        return int(color.lstrip('#'), 16)
    if isinstance(color, tuple) or isinstance(color, list):
        return (int(color[0]) << 16) | (int(color[1]) << 8) | int(color[2])
    return int(color) & 0xFFFFFF


def _find(kind, num):
    for item in _objects:
        if item[0] == kind and item[1] == int(num):
            return item
    return None


def _put(kind, num, *params):
    item = _find(kind, num)
    if item:
        _objects.remove(item)
    _objects.append([kind, int(num)] + list(params))
    _show()


def rgb(r, g, b):
    return (int(r) & 0xFF) << 16 | (int(g) & 0xFF) << 8 | int(b) & 0xFF


def clear():
    global _background, _background_image, _objects
    _background = 0
    _background_image = ''
    _objects = []
    _show()


def background_color(color):
    global _background, _background_image
    _background = _rgb(color)
    _background_image = ''
    _show()


def background_image(name):
    global _background_image
    _background_image = str(name)
    _show()


def text(value, num, x, y, size, color):
    _put('text', num, int(x), int(y), int(size), _rgb(color), str(value)[:242])


def image(num, name, x, y, zoom):
    _put('image', num, int(x), int(y), int(zoom), str(name), 0)


def rotate_image(num, angle):
    item = _find('image', num)
    if item:
        item[6] = int(angle)
        _show()


def gif(num, name, x, y, zoom):
    _put('gif', num, int(x), int(y), int(zoom), str(name), 0)


def line(num, x1, y1, x2, y2, width, color):
    _put('line', num, int(x1), int(y1), int(x2), int(y2), int(width), _rgb(color))


def rect(num, x, y, w, h, width, color, fill, fill_color, rounded):
    _put('rect', num, int(x), int(y), int(w), int(h), int(width), _rgb(color), int(fill), _rgb(fill_color), int(rounded))


def circle(num, x, y, r, width, color, fill, fill_color):
    _put('circle', num, int(x), int(y), int(r), int(width), _rgb(color), int(fill), _rgb(fill_color))


def triangle(num, x1, y1, x2, y2, x3, y3, width, color, fill, fill_color):
    _put('triangle', num, int(x1), int(y1), int(x2), int(y2), int(x3), int(y3), int(width), _rgb(color), int(fill), _rgb(fill_color))


def slider(num, x, y, w, h, color):
    _put('slider', num, int(x), int(y), int(w), int(h), _rgb(color), 0)


def bar(num, x, y, w, h, color):
    _put('bar', num, int(x), int(y), int(w), int(h), _rgb(color), 0)


def compass(num, x, y, diameter):
    _put('compass', num, int(x), int(y), int(diameter), 0)


def gauge(num, x, y, diameter, start, end, color, bg_color):
    _put('gauge', num, int(x), int(y), int(diameter), int(start), int(end), _rgb(color), _rgb(bg_color), int(start))


def line_meter(num, x, y, size, start, end, color, bg_color):
    _put('line_meter', num, int(x), int(y), int(size), int(start), int(end), _rgb(color), _rgb(bg_color), int(start))


def set_value(kind, num, value):
    item = _find(_VALUES.get(kind), num)
    if item:
        item[-1] = int(value)
        _show()


def remove(kind, num):
    item = _find(_KINDS.get(kind), num)
    if item:
        _objects.remove(item)
        _show()


def chart(num, x_labels, y_labels, color, style):
    global _chart, _x_axis, _y_min, _factor
    _chart = int(num)
    _x_axis = str(x_labels).split()
    y_axis = str(y_labels).split()
    _y_min = int(y_axis[-1])
    _factor = abs(int(y_axis[0]) - _y_min) / 100 or 1
    # series: [[num, colour, [points 0-100]], ...]
    _put('chart', num, _rgb(color), int(style), _x_axis, y_axis, [])


def chart_series(num, color):
    item = _find('chart', _chart)
    if item:
        series = [s for s in item[6] if s[0] != int(num)]
        series.append([int(num), _rgb(color), [0] * len(_x_axis)])
        item[6] = series
        _show()


def chart_point(num, x_label, value):
    item = _find('chart', _chart)
    label = str(x_label)
    if item and label in _x_axis and _y_min <= value <= _y_min + _factor * 100:
        for s in item[6]:
            if s[0] == int(num):
                s[2][_x_axis.index(label)] = round((value - _y_min) / _factor)
                _show()
