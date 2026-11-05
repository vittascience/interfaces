# Grove LCD 16x2 (0x3E) on the I2C bus of PinPong
import time
# buffers of the bus: lists for PinPong (UNIHIKER M10), bytes for MicroPython (UNIHIKER K10)
try:
  import pinpong
  _buffer = list
except ImportError:
  _buffer = bytes
class LCD1602:
  def __init__(self,i2c):
    self.i2c=i2c
    self.fct=0x04|0x08
    time.sleep((50) / 1000)
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x20|self.fct])))
    time.sleep((4500) / 1000)
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x20|self.fct])))
    time.sleep((150) / 1000)
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x20|self.fct])))
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x20|self.fct])))
    self.ctrl=0x04|0x02
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,self.ctrl])))
    self.clear()
    self.mod=0x02|0x00
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x04|self.mod])))
    self.display(True)
  def write_char(self,c):self.i2c.writeto(0x3e, _buffer(bytearray([0x40,c])))
  def writeTxt(self,t):
    for c in t:self.write_char(ord(c))
  def cursor(self,s):
    if s:
      self.ctrl|=0x02
      self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x08|self.ctrl])))
    else:
      self.ctrl&=~0x02
      self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x08|self.ctrl])))
  def setCursor(self,x,y):
    x=(x|0x80) if y==0 else (x|0xc0)
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,x])))
  def display(self,s):
    if s:
      self.ctrl|=0x04
      self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x08|self.ctrl])))
    else:
      self.ctrl&=~0x04
      self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x08|self.ctrl])))
  def clear(self):
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x01])))
    time.sleep((2) / 1000)
  def home(self):
    self.i2c.writeto(0x3e, _buffer(bytearray([0x80,0x02])))
    time.sleep((2) / 1000)