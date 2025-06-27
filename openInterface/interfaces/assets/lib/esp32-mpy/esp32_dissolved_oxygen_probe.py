import time

VREF = 5000  # VREF en mV
ADC_RES = 1024  # Résolution de l'ADC

READ_TEMP = 25  # Température actuelle de l'eau en °C

#CAL1_V = 1600  # mV => remplacé par self.voltage
CAL1_T = 25    # °C

# Table des valeurs pour la saturation d'oxygène dissous
DO_Table = [
    14460, 14220, 13820, 13440, 13090, 12740, 12420, 12110, 11810, 11530,
    11260, 11010, 10770, 10530, 10300, 10080, 9860, 9660, 9460, 9270,
    9080, 8900, 8730, 8570, 8410, 8250, 8110, 7960, 7820, 7690,
    7560, 7430, 7300, 7180, 7070, 6950, 6840, 6730, 6630, 6530, 6410
]

class DISSOLVED_OXYGEN_PROBE:

    def __init__(self, adc):
        self.adc = adc
        self.calibration()

    def calibration(self):
        print("Calibration in progress, please wait ...")
        for i in range(10):
            print("Step " + str(i) + "/10")
            raw = self.adc.read()  # Lecture de l'ADC
            self.voltage = raw * VREF / ADC_RES  # Calcul de la tension en mV
            time.sleep(1)  # Délai de 1 seconde
        print("Calibration complete")

    def readDO(self, voltage_mv, temperature_c):
        V_saturation = self.voltage + 35 * temperature_c - CAL1_T * 35
        return (voltage_mv * DO_Table[temperature_c] // V_saturation)

    def getValue(self):
        ADC_Raw = self.adc.read()  # Lecture de la valeur brute de l'ADC
        ADC_Voltage = VREF * ADC_Raw // ADC_RES  # Calcul de la tension en mV
        return self.readDO(ADC_Voltage, READ_TEMP)  # Calcul de la concentration d'oxygène dissous