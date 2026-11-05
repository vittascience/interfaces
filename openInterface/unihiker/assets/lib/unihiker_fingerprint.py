# Grove fingerprint sensor on the serial port of the board (UART of PinPong)
import time
# monotonic clock of Python (UNIHIKER M10), microseconds of MicroPython (UNIHIKER K10)
_seconds = getattr(time, 'monotonic', None) or (lambda: time.ticks_us() / 1e6)
# buffers of the bus: lists for PinPong (UNIHIKER M10), bytes for MicroPython (UNIHIKER K10)
try:
  import pinpong
  _buffer = list
except ImportError:
  _buffer = bytes

uart = None


FINGERPRINT_BAUDRATE = 57600
FINGERPRINT_ADDRESS = bytes([0xFF, 0xFF, 0xFF, 0xFF])

CMD_AUTO_REGISTER = 0x31
CMD_AUTO_VERIFY = 0x32


def init(port):
    global uart
    uart = port
    try:
      uart.init(baud_rate=FINGERPRINT_BAUDRATE)
    except TypeError:
      # UART of MicroPython (UNIHIKER K10)
      uart.init(baudrate=FINGERPRINT_BAUDRATE)


def running_time():
    return int(_seconds() * 1000)


def _read():
    count = uart.any()
    return bytes(uart.read(count)) if count else None


def _checksum(data):
    checksum = sum(data)

    return bytes([
        (checksum >> 8) & 0xFF,
        checksum & 0xFF
    ])


def _build_packet(data):
    packet = bytearray()

    packet.extend(bytes([0xEF, 0x01]))
    packet.extend(FINGERPRINT_ADDRESS)

    # Command packet
    packet.append(0x01)

    # Length = data + checksum
    length = len(data) + 2

    packet.extend(bytes([
        (length >> 8) & 0xFF,
        length & 0xFF
    ]))

    packet.extend(data)

    packet.extend(_checksum(packet[6:]))

    return packet


def _read_response(timeout=10000):
    start = running_time()

    while not uart.any():
        if running_time() - start > timeout:
            return None

    time.sleep(0.05)

    data = _read()

    if data is None or len(data) < 12:
        return None

    if data[0] != 0xEF or data[1] != 0x01:
        return None

    return data


def verify():
    data = bytes([
        CMD_AUTO_VERIFY,
        0x00,
        0xFF,
        0xFF,
        0x00,
        0x07
    ])

    uart.write(_buffer(_build_packet(data)))

    response = _read_response()

    if response is None:
        return -1

    # Confirmation code
    if response[9] != 0x00:
        return -1

    if len(response) < 13:
        return -1

    # Fingerprint ID
    return (response[11] << 8) | response[12]

def register(finger_id, count=4):
    # options 0x0F : LED éteinte après capture, prétraitement, pas de réponse
    # intermédiaire, écrase l'empreinte existante sous cet ID
    data = bytes([
        CMD_AUTO_REGISTER,
        (finger_id >> 8) & 0xFF,
        finger_id & 0xFF,
        count,
        0x00,
        0x0F
    ])

    uart.write(_buffer(_build_packet(data)))

    # laisse le temps de poser le doigt count fois
    response = _read_response(count * 10000)

    return response is not None and response[9] == 0x00
