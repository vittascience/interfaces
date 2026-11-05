# Grove 125 kHz RFID reader on the serial port of the board (UART of PinPong)
import time
# monotonic clock of Python (UNIHIKER M10), microseconds of MicroPython (UNIHIKER K10)
_seconds = getattr(time, 'monotonic', None) or (lambda: time.ticks_us() / 1e6)

RFID_BAUD = 9600

FRAME_LEN = 14

STX = 0x02
ETX = 0x03

# Buffers préalloués :
# aucune création de bytes pendant la réception critique
frame_buffer = bytearray(FRAME_LEN)
one_byte = bytearray(1)


def running_time():
    return int(_seconds() * 1000)


def read_byte(uart):
    data = uart.read(1)
    return data[0] if data else None


def read_rfid_frame(uart):
    """
    Recherche STX puis capture exactement les 13 octets suivants.
    Retourne un bytes de 14 octets, ou None en cas de timeout.
    """
    # 1. Synchronisation sur STX = 0x02
    start = running_time()
    while running_time() - start < 100:
        if uart.any():
            if read_byte(uart) == STX:
                frame_buffer[0] = STX
                break
        else:
            time.sleep(0.001)
    else:
        return None
    # 2. Capture des 13 octets restants
    i = 1
    last_byte_time = running_time()
    while i < FRAME_LEN:
        if uart.any():
            value = read_byte(uart)
            if value is not None:
                frame_buffer[i] = value
                i += 1
                last_byte_time = running_time()
        else:
            # À 9600 bauds un octet arrive toutes les ~1,04 ms : 10 ms laisse une marge
            if running_time() - last_byte_time > 10:
                return None
            time.sleep(0.001)
    return bytes(frame_buffer)


def rfid_read(uart):
    """
    Lit une trame du lecteur sur le port série et retourne le numéro de la carte sur 10 chiffres (0 sinon).
    """
    try:
      uart.init(baud_rate=RFID_BAUD)
    except TypeError:
      # UART of MicroPython (UNIHIKER K10)
      uart.init(baudrate=RFID_BAUD)
    raw = read_rfid_frame(uart)
    if raw is None:
        return 0
    num = int(raw[3:11], 16)
    # Formatage automatique sur 10 chiffres (ajoute les zéros manquants à gauche)
    return "{:010d}".format(num)
