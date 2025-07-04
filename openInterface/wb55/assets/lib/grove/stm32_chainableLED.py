from pyb import Pin

class P9813:
  def __init__(self, pin_clk, pin_data, num_leds):
    self.pin_clk = pin_clk
    self.pin_data = pin_data
    self.num_leds = num_leds
    self.pin_clk.init(Pin.OUT)
    self.pin_data.init(Pin.OUT)
    self.reset()

  def __setitem__(self, index, val):
    offset = index * 3
    for i in range(3):
      self.buf[offset + i] = val[i]

  def __getitem__(self, index):
    offset = index * 3
    return tuple(self.buf[offset + i] for i in range(3))

  def fill(self, color):
    for i in range(self.num_leds):
      self[i] = color

  def reset(self):
    self.buf = bytearray(self.num_leds * 3)
    # Begin data frame 4 bytes
    self._frame()
    # 4 bytes for each led (checksum, blue, green, red)
    for i in range(self.num_leds):
      self._write_byte(0xC0)
      for i in range(3):
        self._write_byte(0)
    # End data frame 4 bytes
    self._frame()

  def write(self):
    # Begin data frame 4 bytes
    self._frame()

    # 4 bytes for each led (checksum, blue, green, red)
    for i in range(self.num_leds):
      self._write_color(self.buf[i * 3], self.buf[i * 3 + 1], self.buf[i * 3 + 2])

    # End data frame 4 bytes
    self._frame()

  def _frame(self):
    # Send 32x zeros
    self.pin_data(0)
    for i in range(32):
      self._clk()

  def _clk(self):
    self.pin_clk(0)
    self.pin_clk(1)

  def _write_byte(self, b):
    if b == 0:
      # Fast send 8x zeros
      self.pin_data(0)
      for i in range(8):
        self._clk()
    else:
      # Send each bit, MSB first
      for i in range(8):
        if ((b & 0x80) != 0):
          self.pin_data(1)
        else:
          self.pin_data(0)
        self._clk()

        # On to the next bit
        b <<= 1

  def _write_color(self, r, g, b):
    # Send a checksum byte with the format "1 1 ~B7 ~B6 ~G7 ~G6 ~R7 ~R6"
    # The checksum colour bits should bitwise NOT the data colour bits
    checksum = 0xC0 # 0b11000000
    checksum |= (b >> 6 & 3) << 4
    checksum |= (g >> 6 & 3) << 2
    checksum |= (r >> 6 & 3)

    self._write_byte(checksum)

    # Send the 3 colours
    self._write_byte(b)
    self._write_byte(g)
    self._write_byte(r)
