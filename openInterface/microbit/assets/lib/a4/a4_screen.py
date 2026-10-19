# DFRobot color screen of the A4 microSySTEM models, over I2C (Parking, Weight) or UART TX P1 / RX P0 (AI Vision).
import micropython
from microbit import i2c, uart, pin0, pin1, sleep

_uart = False


def init_i2c():
    global _uart
    _uart = False
    sleep(1000)


def init_uart():
    global _uart
    micropython.kbd_intr(-1)  # a 0x03 byte received must not stop the program
    uart.init(baudrate=9600, tx=pin1, rx=pin0)
    _uart = True
    sleep(1000)


def _send(cmd, data=b''):
    frame = bytes([0x55, 0xAA, len(data) + 1, cmd]) + data
    if _uart:
        uart.write(frame)
        sleep(50)
        return
    for i in range(0, len(frame), 32):
        i2c.write(0x2C, frame[i:i + 32], i + 32 < len(frame))
        sleep(50)


def _rgb(color):
    return bytes([(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF])


def _u16(*values):
    return bytes(b for v in values for b in (int(v) >> 8 & 0xFF, int(v) & 0xFF))


def clear():
    _send(0x1D)
    sleep(1500)


def background_color(color):
    _send(0x19, _rgb(color))
    sleep(300)


def background_image(name):
    _send(0x1A, bytes([1]) + str(name).encode())


def text(value, num, x, y, size, color):
    _send(0x18, bytes([int(num), size]) + _rgb(color) + _u16(x, y) + str(value).encode()[:242])


def image(num, name, x, y, zoom):
    _send(0x09, bytes([int(num)]) + _u16(zoom, x, y) + str(name).encode())


def rotate_image(num, angle):
    _send(0x1E, bytes([0x08, int(num)]) + _u16(int(angle) * 10))


def remove(kind, num):
    _send(0x1B, bytes([kind, int(num)]))
