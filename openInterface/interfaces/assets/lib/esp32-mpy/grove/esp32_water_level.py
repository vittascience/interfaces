from machine import I2C, Pin
import time

THRESHOLD = 100
ATTINY1_HIGH_ADDR = 0x78
ATTINY2_LOW_ADDR = 0x77

i2c = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)

def getHigh12SectionValue():
    high_data = i2c.readfrom_mem(ATTINY1_HIGH_ADDR, 0x01, 12)
    return list(high_data)

def getLow8SectionValue():
    low_data = i2c.readfrom_mem(ATTINY2_LOW_ADDR, 0x01, 8)
    return list(low_data)

def check_water_level():
    touch_val = 0
    
    low_data = getLow8SectionValue()
    high_data = getHigh12SectionValue()
    
    for value in low_data:
        if value > THRESHOLD:
            touch_val += 1
        
    for value in high_data:
        if value > THRESHOLD:
            touch_val += 1
        
    return touch_val * 5
    

