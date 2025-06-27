from time import sleep

class HP206C:
    def __init__(self, i2c, address=0x76):
        self.i2c = i2c
        self.address = address

    def read_temperature_and_pressure(self):
        self.i2c.writeto(self.address, bytes([0x44 | 0x00]))
        sleep(0.5)

        data = self.i2c.readfrom_mem(self.address, 0x10, 6)

        cTemp = (((data[0] & 0x0F) * 1023) + (data[1] * 256) + data[2]) / 100.00
        fTemp = (cTemp * 1.8) + 32
        pressure = (((data[3] & 0x0F) * 1023) + (data[4] * 256) + data[5]) / 100.00

        return cTemp, fTemp, pressure

    def read_altitude(self):
        self.i2c.writeto(self.address, bytes([0x44 | 0x01]))
        sleep(0.5)

        data = self.i2c.readfrom_mem(self.address, 0x31, 3)

        altitude = (((data[0] & 0x0F) * 1023) + (data[1] * 256) + data[2]) / 100.00

        return altitude

    def get_measurement(self, data_type):
        cTemp, fTemp, pressure = self.read_temperature_and_pressure()
        altitude = self.read_altitude()
    
        if (data_type == 'temp_celsius'):
            return cTemp
        if (data_type == 'temp_fahrenheit'):
            return fTemp
        if (data_type == 'pressure'):
            return pressure
        if (data_type == 'altitude'):
            return altitude