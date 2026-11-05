# Simulator of the UNIHIKER M10 and K10: library unihiker_gas reading the module of the mosaic (slider)
from unihiker_sim import slider

_GASES = ['_co', '_no2', '_nh3', '_c3h8', '_c4h10', '_ch4', '_h2', '_c2h5oh']

class GAS:
  CO, NO2, NH3, C3H8, C4H10, CH4, H2, C2H5OH = 0, 1, 2, 3, 4, 5, 6, 7

  def __init__(self, *args, **kwargs):
    pass

  def power_on(self):
    pass

  def calc_gas(self, gas):
    return slider('multichannel', _GASES[gas])
