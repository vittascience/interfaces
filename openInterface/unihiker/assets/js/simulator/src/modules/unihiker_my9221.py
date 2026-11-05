# Simulator of the UNIHIKER M10 and K10: library unihiker_my9221 (LED bar) shown by the simulated library of the ESP32
# (Pin objects of the simulator)
from unihiker_sim import pin
from esp32_my9221 import MY9221 as _MY9221

def MY9221(di, dcki, reverse=False):
  return _MY9221(pin(di), pin(dcki), reverse)
