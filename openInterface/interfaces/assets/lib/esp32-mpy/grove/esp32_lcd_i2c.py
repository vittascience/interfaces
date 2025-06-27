import utime

LCD_I2C_ADDR = 0x3e
LCD_COMMAND = 0x80

# commands
LCD_CLEARDISPLAY = 0x01
LCD_RETURNHOME = 0x02
LCD_ENTRYMODESET = 0x04
LCD_DISPLAYCONTROL = 0x08
LCD_CURSORSHIFT = 0x10
LCD_FUNCTIONSET = 0x20
LCD_SETCGRAMADDR = 0x40
LCD_SETDDRAMADDR = 0x80

# flags for display entry mode
LCD_ENTRYRIGHT = 0x00
LCD_ENTRYLEFT = 0x02
LCD_ENTRYSHIFTINCREMENT = 0x01
LCD_ENTRYSHIFTDECREMENT = 0x00

# flags for display on/off control
LCD_DISPLAYON = 0x04
LCD_DISPLAYOFF = 0x00
LCD_CURSORON = 0x02
LCD_CURSOROFF = 0x00
LCD_BLINKON = 0x01
LCD_BLINKOFF = 0x00

# flags for display/cursor shift
LCD_DISPLAYMOVE = 0x08
LCD_CURSORMOVE = 0x00
LCD_MOVERIGHT = 0x04
LCD_MOVELEFT = 0x00

# flags for function set
LCD_8BITMODE = 0x10
LCD_4BITMODE = 0x00
LCD_2LINE = 0x08
LCD_1LINE = 0x00
LCD_5x10DOTS = 0x04
LCD_5x8DOTS = 0x00

class LCD1602:

  def __init__(self, i2c, addr=LCD_I2C_ADDR):
    if i2c == None:
      raise ValueError("I2C object 'LCD1602' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'LCD1602' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr   
    self.fct = LCD_5x10DOTS|LCD_2LINE
    utime.sleep_ms(50)
    self._command(LCD_FUNCTIONSET|self.fct)
    utime.sleep_ms(4500)
    self._command(LCD_FUNCTIONSET|self.fct)
    utime.sleep_ms(150)
    self._command(LCD_FUNCTIONSET|self.fct)
    self._command(LCD_FUNCTIONSET|self.fct)
    self.ctrl = LCD_DISPLAYON|LCD_CURSORON|LCD_BLINKOFF
    self._command(self.ctrl)
    self.clear()
    self.mod = LCD_ENTRYLEFT|LCD_ENTRYSHIFTDECREMENT
    self._command(LCD_ENTRYMODESET|self.mod)
    self.display(True)

  def writeTxt(self, text):
    for char in text:
      self.write_char(ord(char))

  def write_char(self, char):
    self._write([0x40, char])

  def setCursor(self, x, y):
    x = (x|0x80) if y == 0 else (x|0xc0)
    self._write([0x80, x])

  def display(self, s):
    if s:
      self.ctrl |= LCD_DISPLAYON
      self._command(LCD_DISPLAYCONTROL|self.ctrl)
    else:
      self.ctrl &= ~LCD_DISPLAYON
      self._command(LCD_DISPLAYCONTROL|self.ctrl)

  def cursor(self, s):
    if s:
      self.ctrl |= LCD_CURSORON
      self._command(LCD_DISPLAYCONTROL|self.ctrl)
    else:
      self.ctrl &= ~LCD_CURSORON
      self._command(LCD_DISPLAYCONTROL|self.ctrl)

  def home(self):
    self._command(LCD_RETURNHOME)
    utime.sleep_ms(2)

  def clear(self):
    self._command(LCD_CLEARDISPLAY)
    utime.sleep_ms(2)

  def _write(self, buffer):
    self._i2c.writeto(self._addr, bytearray(buffer))

  def _command(self, cmd):
    self._write([LCD_COMMAND, cmd])
