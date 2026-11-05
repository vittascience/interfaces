# Simulator of the UNIHIKER M10: library pinpong.libs.dfrobot_bmp280 reading the module of the mosaic (slider)
from unihiker_sim import slider

class BMP280:
  def __init__(self, *args, **kwargs):
    pass

  def begin(self):
    return True

  def temp_c(self):
    return slider('bmp280-temp')

  # Pa (the slider in hPa)
  def pressure_p(self):
    return slider('bmp280-press') * 100
