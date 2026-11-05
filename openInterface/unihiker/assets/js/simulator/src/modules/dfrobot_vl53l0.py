# Simulator of the UNIHIKER M10: library pinpong.libs.dfrobot_vl53l0 reading the module of the mosaic (slider)
from unihiker_sim import slider

class VL53L0:
  def __init__(self, *args, **kwargs):
    pass

  def begin(self):
    return True

  def get_distance_mm(self):
    return slider('vl53l0x')
