import utime
from micropython import const

_LCD_I2C_ADDR = const(0x3e)
_LCD_BACKLIGHT_I2C_ADDR = const(0x62)
_LCD_COMMAND = const(0x80)

# commands
_LCD_CLEARDISPLAY = const(0x01)
_LCD_RETURNHOME = const(0x02)
_LCD_ENTRYMODESET = const(0x04)
_LCD_DISPLAYCONTROL = const(0x08)
_LCD_CURSORSHIFT = const(0x10)
_LCD_FUNCTIONSET = const(0x20)
_LCD_SETCGRAMADDR = const(0x40)
_LCD_SETDDRAMADDR = const(0x80)

# flags for display entry mode
_LCD_ENTRYRIGHT = const(0x00)
_LCD_ENTRYLEFT = const(0x02)
_LCD_ENTRYSHIFTINCREMENT = const(0x01)
_LCD_ENTRYSHIFTDECREMENT = const(0x00)

# flags for display on/off control
_LCD_DISPLAYON = const(0x04)
_LCD_DISPLAYOFF = const(0x00)
_LCD_CURSORON = const(0x02)
_LCD_CURSOROFF = const(0x00)
_LCD_BLINKON = const(0x01)
_LCD_BLINKOFF = const(0x00)

# flags for display/cursor shift
_LCD_DISPLAYMOVE = const(0x08)
_LCD_CURSORMOVE = const(0x00)
_LCD_MOVERIGHT = const(0x04)
_LCD_MOVELEFT = const(0x00)

# flags for function set
_LCD_8BITMODE = const(0x10)
_LCD_4BITMODE = const(0x00)
_LCD_2LINE = const(0x08)
_LCD_1LINE = const(0x00)
_LCD_5x10DOTS = const(0x04)
_LCD_5x8DOTS = const(0x00)

class LCD1602(object):

  """ Initialize instance of LCD1602 """
  def __init__(self, i2c, addr=_LCD_I2C_ADDR, backlight=None, oneline=None, charsize=0):
    if i2c == None:
      raise ValueError("I2C object 'LCD1602' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'LCD1602' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr

    self.fct = _LCD_DISPLAYON
    if not oneline:
      self.fct |= _LCD_2LINE
    elif charsize != 0:
      # for 1-line displays you can choose another dotsize
      self.fct |= _LCD_5x10DOTS

    # wait for display init after power-on
    utime.sleep_ms(50)

    # send function set
    self._command(_LCD_FUNCTIONSET | self.fct)
    utime.sleep_ms(4500)
    self._command(_LCD_FUNCTIONSET | self.fct)
    utime.sleep_ms(150)
    self._command(_LCD_FUNCTIONSET | self.fct)
    self._command(_LCD_FUNCTIONSET | self.fct)

    # turn on the display
    self.ctrl = _LCD_DISPLAYON | _LCD_CURSORON | _LCD_BLINKOFF
    self.display(True)

    self.clear()

    # set default text direction (left-to-right)
    self.disp_mode = _LCD_ENTRYLEFT | _LCD_ENTRYSHIFTDECREMENT
    self._command(_LCD_ENTRYMODESET | self.disp_mode)

    if backlight is None:
      try:
        self._backlight = Backlight(self._i2c)
        utime.sleep_ms(50)
        print("LCD backlight compatible")
        self.color((0, 255, 0))
      except:
        pass
    else:
      self._backlight = backlight

  """ Write any text on screen """
  def writeTxt(self, text):
    for char in text:
      self.write_char(ord(char))

  """ Write any character on screen """
  def write_char(self, char):
    assert char >= 0 and char < 256
    self._write([0x40, char])

  """ Place cursor on screen at (x, y) """
  def setCursor(self, x, y):
    x = (x|0x80) if y == 0 else (x|0xc0)
    self._write([0x80, x])

  """ Active display """
  def display(self, s):
    if s:
      self.ctrl |= _LCD_DISPLAYON
      self._command(_LCD_DISPLAYCONTROL|self.ctrl)
    else:
      self.ctrl &= ~_LCD_DISPLAYON
      self._command(_LCD_DISPLAYCONTROL|self.ctrl)

  """ Write any text on screen"""
  def cursor(self, s):
    if s:
      self.ctrl |= _LCD_CURSORON
      self._command(_LCD_DISPLAYCONTROL|self.ctrl)
    else:
      self.ctrl &= ~_LCD_CURSORON
      self._command(_LCD_DISPLAYCONTROL|self.ctrl)

  """ Return to home """
  def home(self):
    self._command(_LCD_RETURNHOME)
    utime.sleep_ms(2)

  """ Clear screen """
  def clear(self):
    self._command(_LCD_CLEARDISPLAY)
    utime.sleep_ms(2)

  """ Write i2c buffer """
  def _write(self, buffer):
    self._i2c.writeto(self._addr, bytearray(buffer))

  """ Send i2c command """
  def _command(self, cmd):
    self._write([_LCD_COMMAND, cmd])

  """ Set backlight color """
  def color(self, color):
    try:
      self._backlight.set_color(color)
    except:
      print("Warning: LCD Backlight Module unavailable. Please check your LCD's compatibility")
      print("Warning: LCD Color Method failed.")
      pass
    
  """ Blink backlight LED """
  def blinkLed(self):
    try:
      self._backlight.blinkLed()
    except:
      print("Warning: LCD Backlight Module unavailable. Please check your LCD's compatibility")
      print("Warning: LCD blinkLed Method failed.")
      pass
    
class Backlight(object):

  REG_RED = const(0x04) # pwm2
  REG_GREEN = const(0x03) # pwm1
  REG_BLUE = const(0x02) # pwm0

  REG_MODE1 = const(0x00)
  REG_MODE2 = const(0x01)
  REG_OUTPUT = const(0x08)
  
  """ Initialize instance of Backlight """
  def __init__(self, i2c, addr=_LCD_BACKLIGHT_I2C_ADDR):
    if i2c == None:
      raise ValueError("I2C object 'RGB BACKLIGHT' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'RGB BACKLIGHT' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr
    # initialize
    self._set_register(self.REG_MODE1, 0)
    self._set_register(self.REG_MODE2, 0)
    # all LED control by PWM
    self._set_register(self.REG_OUTPUT, 0xAA)

  """ Set backlight color """
  def set_color(self, color):
    red, green, blue = color
    self._set_register(self.REG_RED, int(red))
    self._set_register(self.REG_GREEN, int(green))
    self._set_register(self.REG_BLUE, int(blue))
    
  """ Blink backlight LED """
  def blinkLed(self):
    self._set_register(0x07, 0x17) # blink every seconds
    self._set_register(0x06, 0x7f) # 50% duty cycle
    
  """ Write buffer into register """
  def _set_register(self, reg_addr, value):
    value = bytearray([value])
    self._i2c.writeto_mem(self._addr, reg_addr, bytearray([]))
    self._i2c.writeto_mem(self._addr, reg_addr, value)
