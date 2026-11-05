# Simulator of the UNIHIKER M10 and K10: library unihiker_sgp30 reading the module of the mosaic (slider)
from unihiker_sim import slider

class SGP30:
  def __init__(self, *args, **kwargs):
    pass

  def co2_equivalent(self):
    return slider('sgp30', '_co2')

  def total_organic_compound(self):
    return slider('sgp30', '_cov')
