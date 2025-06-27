from microbit import i2c, sleep
import struct

THRESHOLD = 100
ATTINY1_HIGH_ADDR = 0x78
ATTINY2_LOW_ADDR = 0x77

reg_config = 0x01

def getHigh12SectionValue():
    high_data = i2c.read(ATTINY1_HIGH_ADDR, 12, reg_config)
    return list(high_data)

def getLow8SectionValue():
    low_data = i2c.read(ATTINY2_LOW_ADDR, 8, reg_config)
    return list(low_data)

def check_water_level():
    touch_val = 0
    low_data = getLow8SectionValue()
    high_data = getHigh12SectionValue()
    
    for i in range(8):
        if low_data[i] > THRESHOLD:
            touch_val += 1
        
    for i in range(12):
        if high_data[i] > THRESHOLD:
            touch_val += 1
        
    return (touch_val * 5)