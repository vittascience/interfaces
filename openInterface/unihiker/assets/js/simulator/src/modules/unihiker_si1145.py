# Simulator of the UNIHIKER M10 and K10: library unihiker_si1145 and unihiker_si1151 reading the module of the mosaic (slider)
from unihiker_sim import slider

class SI1145:
  def __init__(self, *args, **kwargs):
    pass

  def read_uv(self):
    return slider('si1145', '_uv')

  def read_visible(self):
    return slider('si1145', '_vis')

  def read_ir(self):
    return slider('si1145', '_ir')

SI1151 = SI1145
