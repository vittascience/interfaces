# Simulator of the UNIHIKER M10: library pinpong.libs.dfrobot_tcs34725 reading the module of the mosaic (slider)
from unihiker_sim import slider

class TCS34725:
  def __init__(self, *args, **kwargs):
    pass

  def begin(self):
    return True

  # red, green, blue and clear light (255: the red, green and blue of the sliders)
  def get_rgbc(self):
    return (slider('colorSensor', '_r'), slider('colorSensor', '_g'), slider('colorSensor', '_b'), 255)
