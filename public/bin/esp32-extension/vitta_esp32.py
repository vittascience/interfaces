from machine import *
import math
import utime
from esp32_lcd_i2c import LCD1602

def pinADC(pinNumber, db=ADC.ATTN_11DB, bit=ADC.WIDTH_10BIT):
  pin = ADC(Pin(pinNumber))
  pin.atten(db)
  pin.width(bit)
  return pin

def getGroveTemperature(pin, unit='celsius'):
  R = 1023.0/(pin.read()+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return t
  
def connect_station(ssid='', password='', ip='', mask='', gateway=''):
  global station
  station = network.WLAN(network.STA_IF)
  if station.isconnected():
    if station.config('essid') is ssid:
      print("Already connected on ssid: '%s'" % station.config('essid'))
      return
    else:
      disconnect_station()
  print("\nTrying to connect to '%s' ..." % ssid)
  if len(ip) is not 0:
    if len(gateway) == 0:
      gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
    if len(mask) == 0:
      mask = '255.255.255.0'
    station.ifconfig([ip, mask, gateway, gateway])
  if not station.active():
    station.active(True)
  station.connect(ssid, password)
  while not station.isconnected():
    pass
  print("Station connected !")

def disconnect_station():
  if station is not None and station.isconnected():
    ssid = station.config('essid')
    station.disconnect()
    for retry in range(100):
      connected = station.isconnected()
      if not connected:
        break
      utime.sleep(0.1)
    if not connected:
      station.active(False)
      utime.sleep(0.2)
      print("Disconnected from '%s'\n" %ssid)
    else:
      print("Disconnection from '%s' failed.\n" %ssid)
  else:
    print("Station already disconnected.\n")
    
def configure_access_point(ssid='', ip='', activate=True, max_clients=50):
  ap = network.WLAN(network.AP_IF)
  if len(ip) is not 0:
    gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
    ap.ifconfig([ip, '255.255.255.0', gateway, gateway])
  ap.active(activate)
  ap.config(essid=ssid, password='')
  ap.config(max_clients=max_clients)
  print("Access point started.\n")
  return ap

try:
  lcd = LCD1602(i2c=I2C(scl=Pin(22), sda=Pin(21)))
except OSError:
  print("LCD 1602 not detected.")
