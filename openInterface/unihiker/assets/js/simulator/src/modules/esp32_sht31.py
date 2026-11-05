# Simulator of the UNIHIKER K10: library esp32_sht31 reading the module of the mosaic (slider)
from unihiker_sim import slider

class SHT31:
  def __init__(self, *args, **kwargs):
    pass

  def get_temp_humi(self, *args, **kwargs):
    return (slider('sht31-temp'), slider('sht31-hum'))
