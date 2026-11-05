# Simulator of the UNIHIKER M10: library pinpong.libs.dfrobot_sht31 reading the module of the mosaic (slider)
from unihiker_sim import slider

class SHT31:
  def __init__(self, *args, **kwargs):
    pass

  def begin(self):
    return True

  def temp_c(self):
    return slider('sht31-temp')

  def humidity(self):
    return slider('sht31-hum')
