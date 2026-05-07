import time

THRESHOLD = 100
ATTINY1_HIGH_ADDR = 0x78
ATTINY2_LOW_ADDR = 0x77

def getHigh12SectionValue(i2c):
    high_data = i2c.readfrom_mem(ATTINY1_HIGH_ADDR, 0x01, 12)
    return list(high_data)

def getLow8SectionValue(i2c):
    low_data = i2c.readfrom_mem(ATTINY2_LOW_ADDR, 0x01, 8)
    return list(low_data)

def measurePercentLevel(i2c):
    touch_val = 0
    
    low_data = getLow8SectionValue(i2c)
    high_data = getHigh12SectionValue(i2c)
    
    for value in low_data:
        if value > THRESHOLD:
            touch_val += 1
        
    for value in high_data:
        if value > THRESHOLD:
            touch_val += 1
        
    return touch_val * 5
    

