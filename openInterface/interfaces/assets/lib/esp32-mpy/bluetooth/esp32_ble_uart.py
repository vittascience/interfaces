import bluetooth # Classes "primitives du BLE"
from binascii import hexlify # Convertit une donnée binaire en sa représentation hexadécimale
from micropython import const
import struct

# Les trames d'advertising sont sont des paquets répétés ayant la structure suivante :
#   1 octet indiquant la taille des données (N + 1)
#   1 octet indiquant le type de données (voir les constantes ci-dessous)
#   N octets de données du type indiqué

_ADV_TYPE_FLAGS = const(0x01)
_ADV_TYPE_NAME = const(0x09)
_ADV_TYPE_UUID16_COMPLETE = const(0x3)
_ADV_TYPE_UUID32_COMPLETE = const(0x5)
_ADV_TYPE_UUID128_COMPLETE = const(0x7)
_ADV_TYPE_UUID16_MORE = const(0x2)
_ADV_TYPE_UUID32_MORE = const(0x4)
_ADV_TYPE_UUID128_MORE = const(0x6)
_ADV_TYPE_APPEARANCE = const(0x19)
_ADV_TYPE_MANUFACTURER = const(0xFF)

# Constantes requises pour construire le service BLE UART
_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)
_FLAG_WRITE = const(0x0008)
_FLAG_NOTIFY = const(0x0010)

# Définition du service UART avec ses deux caractéristiques RX et TX

_UART_UUID = bluetooth.UUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E")
_UART_TX = (
  bluetooth.UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E"),
  _FLAG_NOTIFY, # Cette caractéristique notifiera le central des modifications que lui apportera le périphérique
)
_UART_RX = (
  bluetooth.UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E"),
  _FLAG_WRITE, # Le central pourra écrire dans cette caractéristique
)
_UART_SERVICE = (
  _UART_UUID,
  (_UART_TX, _UART_RX),
)

# org.bluetooth.characteristic.gap.appearance.xml
_ADV_APPEARANCE_GENERIC_COMPUTER = const(128)

# Nombre maximum d'octets qui peuvent être échangés par la caractéristique RX
_MAX_NB_BYTES = const(100)

ascii_mac = None

# Génère une trame qui sera passée à la méthode gap_advertise(adv_data=...).
def adv_payload(limited_disc=False, br_edr=False, name=None, services=None, appearance=0, manufacturer=0):
  payload = bytearray()

  def _append(adv_type, value):
    nonlocal payload
    payload += struct.pack("BB", len(value) + 1, adv_type) + value

  _append(_ADV_TYPE_FLAGS, struct.pack("B", (0x01 if limited_disc else 0x02) + (0x00 if br_edr else 0x04)),)

  if name:
    _append(_ADV_TYPE_NAME, name)

  if services:
    for uuid in services:
      b = bytes(uuid)
      if len(b) == 2:
        _append(_ADV_TYPE_UUID16_COMPLETE, b)
      elif len(b) == 4:
        _append(_ADV_TYPE_UUID32_COMPLETE, b)
      elif len(b) == 16:
        _append(_ADV_TYPE_UUID128_COMPLETE, b)

  if appearance:
    # Voir org.bluetooth.characteristic.gap.appearance.xml
    _append(_ADV_TYPE_APPEARANCE, struct.pack("<h", appearance))

  if manufacturer:
    _append(_ADV_TYPE_MANUFACTURER, manufacturer)

  return payload

def decode_field(payload, adv_type):
  i = 0
  result = []
  while i + 1 < len(payload):
    if payload[i + 1] == adv_type:
      result.append(payload[i + 2 : i + payload[i] + 1])
      i += 1 + payload[i]
      return result

def decode_name(payload):
  n = decode_field(payload, _ADV_TYPE_NAME)
  return str(n[0], "utf-8") if n else ""

def decode_services(payload):
  services = []
  for u in decode_field(payload, _ADV_TYPE_UUID16_COMPLETE):
    services.append(bluetooth.UUID(struct.unpack("<h", u)[0]))
  for u in decode_field(payload, _ADV_TYPE_UUID32_COMPLETE):
    services.append(bluetooth.UUID(struct.unpack("<d", u)[0]))
  for u in decode_field(payload, _ADV_TYPE_UUID128_COMPLETE):
    services.append(bluetooth.UUID(u))
  return services

class UART_BLE:

  # Initialisations
  def __init__(self, ble, name="ESP32-UART", rxbuf=_MAX_NB_BYTES):
    self._ble = ble
    self._ble.active(True)
    self._ble.irq(self._irq)
    # Enregistrement du service
    ((self._tx_handle, self._rx_handle),) = self._ble.gatts_register_services((_UART_SERVICE,))
    # Augmente la taille du tampon rx et active le mode "append"
    self._ble.gatts_set_buffer(self._rx_handle, rxbuf, True)
    self._connections = set()
    self._rx_buffer = bytearray()
    self._handler = None
    # Advertising du service :
    # On peut ajouter en option services=[_UART_UUID], mais cela risque de rendre la payload de la caractéristique trop longue
    self._payload = adv_payload(name=name, appearance=_ADV_APPEARANCE_GENERIC_COMPUTER)
    self._advertise()

    # Affiche l'adresse MAC de l'objet
    dummy, byte_mac = self._ble.config('mac')
    hex_mac = hexlify(byte_mac) 
    global ascii_mac
    ascii_mac = hex_mac.decode("ascii")
    print("Adresse MAC : %s" %ascii_mac)

  # Interruption pour gérer les réceptions
  def irq(self, handler):
    self._handler = handler

  # Surveille les connexions afin d'envoyer des notifications
  def _irq(self, event, data):
    # Si un central se connecte
    if event == _IRQ_CENTRAL_CONNECT:
      conn_handle, _, _ = data
      self._connections.add(conn_handle)
    # Si un central se déconnecte
    elif event == _IRQ_CENTRAL_DISCONNECT:
      conn_handle, _, _ = data
      if conn_handle in self._connections:
        self._connections.remove(conn_handle)
      # Redémarre l'advertising pour permettre de nouvelles connexions
      self._advertise()
    # Lorsqu'un client écrit dans une caractéristique exposée par le serveur
    # (gestion des évènements de recéption depuis le central)
    elif event == _IRQ_GATTS_WRITE:
      conn_handle, value_handle = data
      if conn_handle in self._connections and value_handle == self._rx_handle:
        self._rx_buffer += self._ble.gatts_read(self._rx_handle)
        if self._handler:
          self._handler()

  # Appelée pour vérifier s'il y a des messages en attente de lecture dans RX
  def any(self):
    return len(self._rx_buffer)

  # Retourne les catactères reçus dans RX
  def read(self, sz=None):
    if not sz:
      sz = len(self._rx_buffer)
    result = self._rx_buffer[0:sz]
    self._rx_buffer = self._rx_buffer[sz:]
    return result

  # Ecrit dans TX un message à l'attention du central
  def write(self, data):
    for conn_handle in self._connections:
      self._ble.gatts_notify(conn_handle, self._tx_handle, data)

  # Mets fin à la connexion au port série simulé
  def close(self):
    for conn_handle in self._connections:
      self._ble.gap_disconnect(conn_handle)
    self._connections.clear()

  # Pour démarrer l'advertising, précise qu'un central pourra se connecter au périphérique
  def _advertise(self, interval_us=500000):
    self._ble.gap_advertise(interval_us, adv_data=self._payload, connectable = True)
