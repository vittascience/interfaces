# Simulator of the UNIHIKER M10: OLED of PinPong (pinpong.libs.dfrobot_ssd1306) shown by the simulated OLED of the ESP32
from pinpong.board import I2C
from esp32_ssd1306 import SSD1306_I2C as _SSD1306_I2C

def SSD1306_I2C(width=128, height=64, *args, **kwargs):
  return _SSD1306_I2C(width, height, I2C())
