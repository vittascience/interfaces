# Simulation of a4_screen: 320x240 colour screen with its texts and image placeholders (the images are on the real screen).
_background = 0
_background_image = ''
_texts = {}
_images = {}


def _show():
    simulator_setOutput('a4-screen', [_background, _background_image, list(_texts.values()), list(_images.values())])


def init_i2c():
    clear()


def init_uart():
    clear()


def clear():
    global _background, _background_image, _texts, _images
    _background = 0
    _background_image = ''
    _texts = {}
    _images = {}
    _show()


def background_color(color):
    global _background, _background_image
    _background = int(color)
    _background_image = ''
    _show()


def background_image(name):
    global _background_image
    _background_image = str(name)
    _show()


def text(value, num, x, y, size, color):
    _texts[int(num)] = [str(value), int(x), int(y), int(size), int(color)]
    _show()


def image(num, name, x, y, zoom):
    _images[int(num)] = [str(name), int(x), int(y)]
    _show()


def rotate_image(num, angle):
    pass


def remove(kind, num):
    items = _texts if kind == 0x18 else _images
    if int(num) in items:
        del items[int(num)]
        _show()
