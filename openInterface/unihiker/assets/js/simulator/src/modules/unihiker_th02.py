# Simulator of the UNIHIKER M10 and K10: library unihiker_th02 reading the module of the mosaic (slider)
from unihiker_sim import slider

class TH02:
  def __init__(self, *args, **kwargs):
    pass

  def get_temperature(self):
    return slider('th02-temp')

  def get_humidity(self):
    return slider('th02-hum')
