class SCD30:

  def __init__(self, addr = 0x61):
    self.addr, self.co2, self.t, self.h = addr, 0, 0, 0
    simulator_setModuleI2CAddress('scd30-co2', addr)
    simulator_setModuleI2CAddress('scd30-temp', addr)
    simulator_setModuleI2CAddress('scd30-hum', addr)

  def readMeasurement(self):
    self.co2 = simulator_getSliderValue('scd30-co2_slider', 'float')
    self.t = simulator_getSliderValue('scd30-temp_slider', 'float')
    self.h = simulator_getSliderValue('scd30-hum_slider', 'float')

  def setForcedRecalibration(self, co2ppm):
    pass