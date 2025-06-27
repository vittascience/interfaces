class SGP30:

  def __init__(self):
    simulator_setModuleI2CAddress('sgp30', 0x58)
    self.iaq_init()

  def eCO2(self):
    return simulator_getSliderValue('sgp30_slider_co2', 'int')
  
  def TVOC(self):
    return simulator_getSliderValue('sgp30_slider_cov', 'int')

  def iaq_init(self):
    return True