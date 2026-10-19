# Simulation of a4_board (DFR1216 board of the A4 microSySTEM models).
_brightness = 255
_leds = [[0, 0, 0], [0, 0, 0]]


def _clamp(value):
    return max(0, min(255, int(value)))


def _show_leds():
    for index in range(2):
        simulator_setOutput('a4-rgb' + str(index), [c * _brightness // 255 for c in _leds[index]])


def servo(angle):
    simulator_setOutput('a4-servo', max(0, min(180, int(angle))))


def read_port(port):
    return simulator_getSliderValue('a4-port_slider', 'int')


def write_port(port, value):
    simulator_setOutput('a4-lock', int(value))


def battery():
    return simulator_getSliderValue('a4-battery_slider', 'int')


def set_leds(rgb0, rgb1):
    global _leds
    _leds = [[_clamp(c) for c in rgb0], [_clamp(c) for c in rgb1]]
    _show_leds()


def set_brightness(brightness):
    global _brightness
    _brightness = _clamp(brightness)
    _show_leds()
