"""
Uhandbit :
Library for controlling the Uhandbit robot, including servo motors and color sensor.
This library provides two main classes:
- UhandbitServo: for controlling the servo motors of the robot.
- UhandbitColorSensor: for reading color data from the APDS9960 sensor.
The UhandbitServo class allows you to set the angle of each servo motor with a specified duration for the movement. The UhandbitColorSensor class provides methods to read raw color data, normalized RGB values, hue, and to determine the detected color based on predefined thresholds.

Copyright 2020 Vittascience.
https://vittascience.com 
 
Please note that not the entirety of this code is Vittascience's intellectual property.

@author: AntoineEscriva (Antoine Escriva)

"""

from microbit import *

class UhandbitServo:
    def __init__(self):
        uart.init(baudrate=115200, tx=pin12, rx=pin8)
        sleep(200)
    
    def set_servo(self, index, angle, duration=1000):
        angle = max(0, min(180, angle))
        position = int((angle * 2000 / 180) + 500)
        
        buf = bytearray([
            0x55, 0x55, 0x08, 0x03, 0x01,
            duration & 0xFF, (duration >> 8) & 0xFF,
            index,
            position & 0xFF, (position >> 8) & 0xFF
        ])
        
        uart.write(buf)
        sleep(50)

class UhandbitColorSensor:
    # Adresse I2C
    ADDR = 0x39

    # Registres APDS9960
    APDS9960_ENABLE = 0x80
    APDS9960_ATIME = 0x81
    APDS9960_CONTROL = 0x8F
    APDS9960_STATUS = 0x93
    APDS9960_CDATAL = 0x94
    APDS9960_CDATAH = 0x95
    APDS9960_RDATAL = 0x96
    APDS9960_RDATAH = 0x97
    APDS9960_GDATAL = 0x98
    APDS9960_GDATAH = 0x99
    APDS9960_BDATAL = 0x9A
    APDS9960_BDATAH = 0x9B
    APDS9960_ID = 0x92

    # Constantes de couleurs
    RED = 1
    GREEN = 2
    BLUE = 3
    BLACK = 4
    WHITE = 5
    NONE = 6

    def __init__(self):
        self.initialized = False
        try:
            # Test de présence du capteur
            device_id = self.get_id()
            display.scroll("ID:" + str(device_id))
            
            # Initialiser le capteur
            self._init_sensor()
            
            self.initialized = True
            display.scroll("OK")
        except:
            display.scroll("ERROR")
            self.initialized = False

    def _write(self, reg, value):
        """Écrit une valeur dans un registre"""
        i2c.write(self.ADDR, bytes([reg, value]))

    def _read(self, reg):
        """Lit une valeur d'un registre"""
        i2c.write(self.ADDR, bytes([reg]), repeat=False)
        return i2c.read(self.ADDR, 1)[0]

    def _read_word(self, reg):
        """Lit un mot de 16 bits (2 octets) d'un registre"""
        i2c.write(self.ADDR, bytes([reg]), repeat=False)
        data = i2c.read(self.ADDR, 2)
        return data[0] + (data[1] << 8)

    def _init_sensor(self):
        """Initialise le capteur"""
        # Tout éteindre d'abord
        self._write(self.APDS9960_ENABLE, 0x00)
        sleep(10)
        
        # Configuration
        self._write(self.APDS9960_ATIME, 219)      # Temps d'intégration
        self._write(self.APDS9960_CONTROL, 0x01)   # Gain x1
        
        # Activer ALS et Power
        self._write(self.APDS9960_ENABLE, 0x03)    # PON (bit 0) + AEN (bit 1)
        sleep(100)

    def get_id(self):
        """Récupère l'ID du chip (devrait être 0xAB ou 171)"""
        return self._read(self.APDS9960_ID)

    def read_colors(self):
        """
        Lit et retourne les valeurs CRGB brutes (non normalisées)
        Retourne un tuple (c, r, g, b)
        """
        if not self.initialized:
            return (0, 0, 0, 0)
        
        try:
            # Attendre que les données soient prêtes
            tmp = self._read(self.APDS9960_STATUS) & 0x01
            timeout = 0
            while not tmp and timeout < 20:
                sleep(5)
                tmp = self._read(self.APDS9960_STATUS) & 0x01
                timeout += 1
            
            # Lire les canaux de couleur (16 bits chacun)
            c = self._read_word(self.APDS9960_CDATAL)
            r = self._read_word(self.APDS9960_RDATAL)
            g = self._read_word(self.APDS9960_GDATAL)
            b = self._read_word(self.APDS9960_BDATAL)
            
            return (c, r, g, b)
        except:
            return (0, 0, 0, 0)

    def read_rgb(self):
        """
        Lit et retourne les valeurs RGB normalisées (0-255)
        Retourne un tuple (r, g, b)
        """
        if not self.initialized:
            return (0, 0, 0)
        
        try:
            c, r, g, b = self.read_colors()
            
            # Normaliser
            avg = c // 3
            if avg > 0:
                r = min(r * 255 // avg, 255)
                g = min(g * 255 // avg, 255)
                b = min(b * 255 // avg, 255)
            else:
                r = g = b = 0
            
            return [r, g, b]
        except:
            return [0, 0, 0]

    def read_hue(self):
        """
        Lit la couleur et retourne la teinte (hue) en degrés (0-360)
        """
        r, g, b = self.read_rgb()
        return self._rgb_to_hue(r, g, b)

    def get_color(self):
        """
        Détermine la couleur principale détectée
        Retourne: RED, GREEN, BLUE, BLACK, WHITE ou NONE
        """
        c, r_raw, g_raw, b_raw = self.read_colors()
        
        # Obtenir RGB normalisé et hue
        r, g, b = self.read_rgb()
        hue = self._rgb_to_hue(r, g, b)
        
        # Détection de couleur basée sur les seuils
        if c > 2200 and r > 65 and g > 65 and b > 65:
            return self.WHITE
        elif c > 800:
            if hue < 30 or hue > 330:
                return self.RED
            elif 90 < hue < 150:
                return self.GREEN
            elif 210 < hue < 270:
                return self.BLUE
        elif c < 300:
            return self.BLACK
        
        return self.NONE

    def _rgb_to_hue(self, r, g, b):
        """Convertit RGB en teinte (hue) - version entière"""
        # Normaliser sans utiliser de float
        r = r * 100 // 255
        g = g * 100 // 255
        b = b * 100 // 255

        max_val = max(r, max(g, b))
        min_val = min(r, min(g, b))
        c = max_val - min_val
        hue = 0
        
        if c != 0:
            if max_val == r:
                segment = (g - b) * 100 // c
                shift = 0
                if segment < 0:
                    shift = 360 // 60
                hue = segment + shift
            elif max_val == g:
                segment = (b - r) * 100 // c
                shift = 200
                hue = segment + shift
            else:  # max_val == b
                segment = (r - g) * 100 // c
                shift = 400
                hue = segment + shift

        return hue * 60 // 100