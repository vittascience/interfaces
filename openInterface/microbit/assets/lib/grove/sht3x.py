from microbit import i2c, sleep

class SHT3X:
    def __init__(self, address):
        self.address = address

    def get_temperature_in_celsius(self, data):
        #   Conversion de température en Celsius
        return round(-45 + (175 * (data / ((2**16) - 1))), 2)    

    def get_temperature_in_fahrenheit(self, data):
        #   Conversion de température en Fahrenheit
        return round(-49 + (315 * (data / ((2**16) - 1))), 2)

    def get_relative_humidity(self, data):
        #   Conversion de l'humidité relative
        return round(100 * (data / ((2**16) - 1)), 2)

    def get_measurement(self, data_type):
        try:
            sleep(50)  # pause de 50 ms
            i2c.write(self.address, b'\x2c\x06')
            sleep(50)  # pause de 50 ms

            # Lecture des données de l'adresse I2C (6 octets)
            data = i2c.read(self.address, 6)

            # Conversion des données lues en valeurs hexadécimales
            temp_data = (data[0] << 8) | data[1]
            humi_data = (data[3] << 8) | data[4]

            if (data_type == 'temp_celsius'):
                return self.get_temperature_in_celsius(temp_data)
            if (data_type == 'temp_fahrenheit'):
                return self.get_temperature_in_fahrenheit(temp_data)
            if (data_type == 'humidity'):
                return self.get_relative_humidity(humi_data)

        except Exception as e:
            print("Échec de la lecture des valeurs de température et d'humidité")
            print(e)

class SHT31(SHT3X):
    def __init__(self, bus_obj):
        super().__init__(address=0x44)

class SHT35(SHT3X):
    def __init__(self):
        super().__init__(address=0x45)