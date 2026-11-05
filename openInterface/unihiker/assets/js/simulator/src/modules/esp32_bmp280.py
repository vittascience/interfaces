# Simulator of the UNIHIKER K10: library esp32_bmp280 reading the module of the mosaic (slider)
from unihiker_sim import slider

class BMP280:
  def __init__(self, *args, **kwargs):
    pass

  def temperature(self):
    return slider('bmp280-temp')

  # Pa (the slider in hPa)
  def pressure(self):
    return slider('bmp280-press') * 100

  def altitude(self):
    return slider('bmp280-alt')
