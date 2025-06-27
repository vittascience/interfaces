import machine
import pyb
import utime
from micropython import const
from stm32_lcd_i2c import LCD1602
import math

def respond(cmd, status=1, value=None):
  return "{\"cmd\":\"" + str(cmd).replace('"', '\\"')+ "\", \"status\":" + str(status) + ", \"value\":" + ("null" if value is None else str(value)) + "}\n"

def getGroveTemperature(pin, unit='celsius'):
  R = 4095.0/pin.read() - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return t

pyb.Pin('SW1').init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)
pyb.Pin('SW2').init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)
pyb.Pin('SW3').init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)

try:
  lcd = LCD1602(i2c=machine.I2C(1))
except OSError:
  print("LCD 1602 not detected.")
