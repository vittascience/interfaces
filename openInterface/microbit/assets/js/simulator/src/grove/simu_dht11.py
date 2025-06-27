from microbit import sleep
class DHT11:
    
    def __init__(self, pin):
        self._p = simulator_getPinValue(pin)
        self.t,self.h=0,0
        
    def read(self):
        self.t = simulator_getSliderValue('dht11-temp_' + str(self._p) + '_slider', 'float')
        self.h = simulator_getSliderValue('dht11-hum_' + str(self._p) + '_slider', 'float')
        
    def getData(self,d=1):
        self.read()
        sleep(1000)
        print(self.t)
        print(self.h)
        if d==1:return self.t
        elif d==2:return self.h
        else: raise ValueError("DHT error: '" + d + "' is not a data option")