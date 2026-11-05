# Simulator of the UNIHIKER M10 and K10: OLED shown by the simulated library of the ESP32 (sim_esp32_ssd1306), with the
# fill_rect of framebuf used by the OLED blocks
from sim_esp32_ssd1306 import SSD1306_I2C as _SSD1306_I2C

class SSD1306_I2C(_SSD1306_I2C):
  def fill_rect(self, x, y, w, h, c):
    for i in range(int(w)):
      for j in range(int(h)):
        self.pixel(int(x) + i, int(y) + j, c)
