# Simulator of the UNIHIKER K10: library esp32_colorSensor reading the module of the mosaic (slider)
from unihiker_sim import slider

class TCS34725:
  def __init__(self, *args, **kwargs):
    pass

  # red, green, blue and clear light (255: the red, green and blue of the sliders)
  def read(self, raw=False):
    return (slider('colorSensor', '_r'), slider('colorSensor', '_g'), slider('colorSensor', '_b'), 255)
