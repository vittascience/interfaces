# Simulator of the UNIHIKER M10 and K10: library unihiker_scd30 reading the module of the mosaic (slider)
from unihiker_sim import slider

class SCD30:
  def __init__(self, *args, **kwargs):
    pass

  def read_measurement(self):
    return (slider('scd30-co2'), slider('scd30-temp'), slider('scd30-hum'))

  def set_forced_recalibration(self, co2ppm):
    pass
