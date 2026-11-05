# Simulator of the UNIHIKER M10 and K10: library unihiker_tm1637 (4 digits display) shown by the simulated library of
# the ESP32 (Pin objects of the simulator)
from unihiker_sim import pin
from esp32_tm1637 import TM1637 as _TM1637

def TM1637(clk, dio, bright=7):
  return _TM1637(pin(clk), pin(dio), bright)
