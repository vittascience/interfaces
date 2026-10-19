# A4 Technologie microSySTEM-Barrier: RFID reader (UART P14/P15) and signal light (P0).
# The barrier servo is on S0 and the IR sensor on C0 of the board (a4_board).
from microbit import pin0, pin14, pin15
import neopixel
import rfid_reader
from a4_board import servo  # the barrier servo is on S0 of the board

_light = neopixel.NeoPixel(pin0, 1)


def read_tag():
    # The Vittascience reader disables Ctrl-C (0x03 ends the frames) and gives the serial port back to USB.
    return int(rfid_reader.rfid_read(pin14, pin15))


def set_light(rgb):
    _light[0] = tuple(max(0, min(255, int(c))) for c in rgb)
    _light.show()

