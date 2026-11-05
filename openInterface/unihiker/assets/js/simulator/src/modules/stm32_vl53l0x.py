# Simulator of the UNIHIKER K10: library stm32_vl53l0x reading the module of the mosaic (slider)
from unihiker_sim import slider

class VL53L0X:
  def __init__(self, *args, **kwargs):
    pass

  def getRangeMillimeters(self):
    return slider('vl53l0x')
