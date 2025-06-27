class BMP280:

  def __init__(self, addr = 0x76):
    self.T,self.P=0,0
    simulator_setModuleI2CAddress('bmp280-temp', addr)
    simulator_setModuleI2CAddress('bmp280-press', addr)
    simulator_setModuleI2CAddress('bmp280-alt', addr)

  def get(self):
    self.T = simulator_getSliderValue('bmp280-temp_slider', 'float')
    self.P = simulator_getSliderValue('bmp280-press_slider', 'int')
    return [self.T, self.P]

  def Temperature(self):
    self.get()
    return self.T
  
  def Pressure(self):
    self.get()
    return self.P
  
  def Altitude(self):
    self.get()
    return 44330*(1-(self.P/101325)**(1/5.255))