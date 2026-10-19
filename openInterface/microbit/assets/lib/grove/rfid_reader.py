from microbit import *
import micropython
import gc

PIN_RX = pin0
PIN_TX = pin14

RFID_BAUD = 9600
USB_BAUD = 115200

FRAME_LEN = 14

STX = 0x02
ETX = 0x03

# Buffers préalloués :
# aucune création de bytes pendant la réception critique
frame_buffer = bytearray(FRAME_LEN)
one_byte = bytearray(1)


def uart_rfid(rx=PIN_RX, tx=PIN_TX):
    # 0x03 doit être traité comme une donnée RFID,
    # pas comme Ctrl-C.
    micropython.kbd_intr(-1)

    uart.init(
        baudrate=RFID_BAUD,
        bits=8,
        parity=None,
        stop=1,
        rx=rx,
        tx=tx
    )


def uart_usb():
    # Sans rx/tx : retour vers l'interface USB
    uart.init(baudrate=USB_BAUD)

    # Ctrl-C redevient disponible depuis le PC
    micropython.kbd_intr(3)


def read_rfid_frame():
    """
    Recherche STX puis capture exactement les 13 octets suivants.
    Retourne un bytes de 14 octets, ou None en cas de timeout.
    """

    # ---------------------------------------------
    # 1. Synchronisation sur STX = 0x02
    # ---------------------------------------------
    start = running_time()

    while running_time() - start < 100:

        if uart.any():

            n = uart.readinto(one_byte, 1)

            if n == 1 and one_byte[0] == STX:
                frame_buffer[0] = STX
                break

        else:
            sleep(1)

    else:
        return None

    # ---------------------------------------------
    # 2. Capture des 13 octets restants
    # ---------------------------------------------
    i = 1
    last_byte_time = running_time()

    while i < FRAME_LEN:

        if uart.any():

            n = uart.readinto(one_byte, 1)

            if n == 1:
                frame_buffer[i] = one_byte[0]
                i += 1
                last_byte_time = running_time()

        else:
            # À 9600 bauds un octet arrive toutes les ~1,04 ms.
            # 10 ms laisse donc une énorme marge.
            if running_time() - last_byte_time > 10:
                return None

            sleep(1)

    # Allocation uniquement APRES réception complète
    return bytes(frame_buffer)


def init(rx=PIN_RX, tx=PIN_TX):
    """
    Initialise la mémoire et démarre l'UART en mode RFID.
    À appeler une fois au démarrage.
    """
    gc.collect()
    uart_rfid(rx, tx)


def rfid_read(rx=PIN_RX, tx=PIN_TX):
    """
    Fonction globale : initialise l'UART RFID, lit une trame,
    rebascule en USB et retourne les bytes lus (ou None).
    """
    init(rx, tx)
    raw = read_rfid_frame()
    uart_usb()
    if raw is None:
        return 0
    num = int(raw[3:11], 16)
    # Formatage automatique sur 10 chiffres (ajoute les zéros manquants à gauche)
    return "{:010d}".format(num)