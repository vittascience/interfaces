from machine import I2C, SoftI2C, Pin
from math import sqrt
import time

# ___________________________________________

# Registers

VEML6040_ADDR = 0x10  
VEML6040_CONF = 0x00

CONF = b'\x00'

REG_RED = 0x08
REG_GREEN = 0x09
REG_BLUE = 0x0A
REG_WHITE = 0x0B

DEFAULT_SETTINGS = b'\x00' # initialise gain:1x, integration 40ms, Green Sensitivity 0.25168, Max. Detectable Lux 16496
                            # No Trig, Auto mode, enabled.
SHUTDOWN = b'\x01'         # Disable colour sensor
INTEGRATION_TIME = 40      # ms
G_SENSITIVITY = 0.25168    # lux/step

_NaN = float('NaN')

# ____________________________________________

class VEML6040(object):

    def __init__(self):
        self.i2c_veml = SoftI2C(scl=Pin('B13'), sda=Pin('B14'))
        time.sleep(0.1)
        self.write8(VEML6040_ADDR, CONF, SHUTDOWN)
        time.sleep(0.1)
        self.write8(VEML6040_ADDR, CONF, DEFAULT_SETTINGS)
        time.sleep(0.1)
      
    def write8(self, addr, reg, data):
        if reg is None:
            self.i2c_veml.writeto(addr, data)
        else:
            self.i2c_veml.writeto(addr, reg + data)

    def readfrom_mem(self, addr, memaddr, nbytes, *, addrsize=8):
        ad = memaddr.to_bytes(addrsize // 8, 'big')  # pad address for eg. 16 bit
        self.i2c_veml.write(addr, ad, repeat=True)
        return self.i2c_veml.read(addr, nbytes)
    
    def readRGB(self):
        raw_data = self.i2c_veml.readfrom_mem(VEML6040_ADDR, REG_RED, 2)        # returns a bytes object   
        u16red = int.from_bytes(raw_data, 'little')
        
        raw_data = (self.i2c_veml.readfrom_mem(VEML6040_ADDR, REG_GREEN, 2))    # returns a bytes object
        u16grn = int.from_bytes(raw_data, 'little')
        
        raw_data = (self.i2c_veml.readfrom_mem(VEML6040_ADDR, REG_BLUE, 2))     # returns a bytes object
        u16blu = int.from_bytes(raw_data, 'little')
        
        raw_data = (self.i2c_veml.readfrom_mem(VEML6040_ADDR, REG_WHITE, 2))    # returns a bytes object
        data_white_int = int.from_bytes(raw_data, 'little')

        # Generate the XYZ matrix based on https://www.vishay.com/docs/84331/designingveml6040.pdf
        colour_X = (-0.023249*u16red)+(0.291014*u16grn)+(-0.364880*u16blu)
        colour_Y = (-0.042799*u16red)+(0.272148*u16grn)+(-0.279591*u16blu)
        colour_Z = (-0.155901*u16red)+(0.251534*u16grn)+(-0.076240*u16blu)
        colour_total = colour_X+colour_Y+colour_Z
        if colour_total == 0:
            return {"red":_NaN,"green":_NaN,"blue":_NaN,"white":_NaN,"als":_NaN,"cct":_NaN}
        else:
            colour_x = colour_X / colour_total
            colour_y = colour_Y / colour_total
        
        # Use McCamy formula
        colour_n = (colour_x - 0.3320)/(0.1858 - colour_y)
        colour_CCT = 449.0*colour_n ** 3+3525.0*colour_n ** 2+6823.3*colour_n+5520.33
        
        # Calculate ambient light in Lux
        colour_ALS = u16grn*G_SENSITIVITY
        return {"red":u16red,"green":u16grn,"blue":u16blu,"white":data_white_int,"als":colour_ALS,"cct":colour_CCT}