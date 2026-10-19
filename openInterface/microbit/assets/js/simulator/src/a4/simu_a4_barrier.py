# Simulation of a4_barrier: barrier drawing (servo + signal light), the RFID badges are read once.
BADGES = [0, 1234567891, 1234567892, 1234567893]
_angle = 5
_light = [0, 0, 0]


def _show():
    simulator_setOutput('a4-barrier', [_angle, _light])


def read_tag():
    index = simulator_getSliderValue('a4-rfid_slider', 'int')
    if index:
        simulator_setSliderValue('a4-rfid_slider', 0)
    return BADGES[index]


def servo(angle):
    global _angle
    _angle = max(0, min(180, int(angle)))
    _show()


def set_light(rgb):
    global _light
    _light = [max(0, min(255, int(c))) for c in rgb]
    _show()
