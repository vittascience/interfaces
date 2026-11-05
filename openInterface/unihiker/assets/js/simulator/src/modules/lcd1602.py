# Simulator of the UNIHIKER M10: LCD of PinPong (pinpong.libs.lcd1602, PCF8574 at 0x27) shown by the simulated LCD of
# the ESP32
from esp32_lcd_i2c import LCD1602 as _LCD1602

class LCD1602_I2C:
  def __init__(self, i2c_addr=0x27, *args, **kwargs):
    self._lcd = _LCD1602(None, i2c_addr)

  def set_cursor(self, col, row):
    self._lcd.setCursor(col, row)

  def print(self, text):
    self._lcd.writeTxt(str(text))

  def clear(self):
    self._lcd.clear()
