# Simulator of the UNIHIKER M10: library pinpong.libs.dfrobot_bme280 reading the module of the mosaic (slider)
from unihiker_sim import slider

class BME280:
  def __init__(self, *args, **kwargs):
    pass

  def begin(self):
    return True

  def temp_c(self):
    return slider('bme280-temp')

  def humidity(self):
    return slider('bme280-hum')

  # Pa (the slider in hPa)
  def press_pa(self):
    return slider('bme280-press') * 100

  def cal_altitudu(self):
    return slider('bme280-alt')
