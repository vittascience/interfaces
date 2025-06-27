from ubinascii import hexlify
from time import sleep

class SHT3X:

    def __init__(self, i2c, addr):
        if i2c == None:
            raise ValueError("I2C object 'SHT35' needed as argument!")
        self._i2c = i2c
        i2cModules = self._i2c.scan()
        if addr not in i2cModules:
            error = "Unable to find module 'SHT35' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
            error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
            raise ValueError(error)
        self._addr = addr

    def get_temperature_in_celsius(self, data):
        #   Temperature conversion formula (Celsius)
        #   T[C] = -45 + (175 * (raw_temp_data / (2^16 - 1)))
        return round(-45 + (175 * (data / ((2**16) - 1))), 2)    

    def get_temperature_in_fahrenheit(self, data):
        #   Temperature conversion formula (Fahrenheit)
        #   T[F] = -49 + (315 * (raw_temp_data / (2^16 - 1)))
        return round(-49 + (315 * (data / ((2**16) - 1))), 2)

    def get_relative_humidity(self, data):
        #   Relative humidity conversion formula
        #   RH = 100 * (raw_humidity_data / (2^16 - 1))
        return round(100 * (data/ ((2**16) - 1)), 2)

    def get_measurement(self, data_type):
        try:
            sleep(0.05)
            self._i2c.writeto(self._addr, b'\x2c\x06')
            sleep(0.05)
            data = hexlify(self._i2c.readfrom(self._addr, 6))
            temp_data = int(data[0:4], 16)
            humi_data = int(data[6:10], 16)
            sleep(0.05)

            if (data_type == 'temp_celsius'):
                return self.get_temperature_in_celsius(temp_data)
            if (data_type == 'temp_fahrenheit'):
                return self.get_temperature_in_fahrenheit(temp_data)
            if (data_type == 'humidity'):
                return self.get_relative_humidity(humi_data)
        
        except Exception as e:
            print("Failed to read temperature and humidity value")
            print(e)

class SHT31(SHT3X):
    def __init__(self, i2c):
        self.sensor_name = 'SHT31'
        super().__init__(i2c, addr=68) # 0x44

class SHT35(SHT3X):
    def __init__(self, i2c):
        self.sensor_name = 'SHT35'
        super().__init__(i2c, addr=69) # 0x45