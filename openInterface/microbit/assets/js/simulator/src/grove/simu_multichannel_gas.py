from microbit import sleep
class GAS:

  def __init__(self):
    simulator_setModuleI2CAddress('multichannel', 0x04)
    sleep(1000)

  def get_gas(self, g):
    GAS = ['co', 'no2', 'nh3', 'c3h10', 'c4h10', 'ch4', 'h2', 'c2h5oh']
    return simulator_getSliderValue('multichannel_slider_' + GAS[g], 'int')

  def power_on(self):
    pass