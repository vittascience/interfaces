# Simulator of the UNIHIKER K10: library esp32_bme280 reading the module of the mosaic (slider)
from unihiker_sim import slider

class BME280:
  def __init__(self, *args, **kwargs):
    pass

  @property
  def temperature(self):
    return slider('bme280-temp')

  @property
  def humidity(self):
    return slider('bme280-hum')

  # Pa (the slider in hPa)
  @property
  def pressure(self):
    return slider('bme280-press') * 100

  def altitude(self, *args):
    return slider('bme280-alt')
