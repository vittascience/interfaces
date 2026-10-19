# Simulation of a4_shifumi: disc drawing (servo + backlight), distance slider and 16x2 LCD.
_angle = 90
_brightness = 80
_rgb = [0, 0, 0]
_lines = ['', '']


def distance():
    return simulator_getSliderValue('a4-distance_slider', 'int')


def hand_detected(threshold):
    measure = distance()
    return 0 < measure <= threshold


def _show():
    simulator_setOutput('a4-shifumi', [_angle, [c * _brightness // 255 for c in _rgb]])


def servo(angle):
    global _angle
    _angle = max(0, min(180, int(angle)))
    _show()


def set_backlight(rgb):
    global _rgb
    _rgb = [max(0, min(255, int(c))) for c in rgb]
    _show()


def set_brightness(percent):
    global _brightness
    _brightness = max(0, min(100, int(percent))) * 255 // 100
    set_backlight(_rgb)


def lcd_init():
    lcd_clear()


def lcd_clear():
    global _lines
    _lines = ['', '']
    simulator_setOutput('a4-lcd', _lines)


def lcd_show(text, line):
    _lines[1 if int(line) == 2 else 0] = str(text)[:16]
    simulator_setOutput('a4-lcd', _lines)
