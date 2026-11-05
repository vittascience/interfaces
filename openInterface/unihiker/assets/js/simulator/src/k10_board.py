# Simulator of the UNIHIKER K10: AI (module ai) and Wi-Fi / MQTT (module k10_base) of the board without camera nor
# network: nothing is detected, nothing is received

def _nothing(*args, **kwargs):
  return None

init_ai = camera_start = code_scanner = face_recognize_start = cat_detect = move_detect = _nothing
register_face = recognize_face = deinit_ai = camera_capture = _nothing

def is_ai_data_updated():
  return False

def get_ai_data():
  return {}

class WiFi:
  def connect(self, *args, **kwargs):
    print('[Wi-Fi] simulator: no network')

  def status(self):
    return False

  def info(self):
    return ''

class MqttClient:
  def __getattr__(self, name):
    return _nothing
