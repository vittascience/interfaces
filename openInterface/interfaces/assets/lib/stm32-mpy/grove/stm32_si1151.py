from ustruct import unpack

SI115X_ADDR = 0x53

class SI1151:
  def __init__(self, i2c, addr=SI115X_ADDR):
    if i2c == None:
      raise ValueError("I2C object 'SI1151' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'SI1151' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr
    if not self.begin():
      raise Exception("SI1151 not found")

  def _read8(self, reg):
    return unpack('B', self.i2c.readfrom_mem(self._addr, reg, 1))[0] & 0xFF

  def _read24(self):
    result = unpack('BBB', self._i2c.readfrom_mem(self._addr, 0x13, 3))
    return (result[0] << 16) | (result[1] << 8) | result[2]

  def _write8(self, reg, val):
    val = val & 0xFF
    self.i2c.writeto_mem(self._addr, reg, bytes([val]))

  # --- parameters ---
  def _write_param(self, param, val):
    while True:
      resp0 = self._read8(0x11)
      self._write8(0x0A, val)
      self._write8(0x0B, param | 0x80)
      if self._read8(0x11) > resp0:
        break

  def read_param(self, param):
    self._write8(0x0B, param | 0x40)
    return self._read8(0x10)

  # --- commands ---
  def send_command(self, cmd):
    while True:
      r0 = self._read8(0x11)
      self._write8(0x0B, cmd)
      if self._read8(0x11) > r0:
        break

  # --- init ---
  def begin(self):
    if self._read8(0x00) != 0x51:
      return False

    self.send_command(0x13)

    self._write_param(0x01, 0x02)
    self._write_param(0x1A, 0x00)
    self._write_param(0x1B, 0x01)
    self._write_param(0x1C, 0x05)
    self._write_param(0x1D, 0x0A)
    self._write_param(0x1E, 0x0A)
    self._write_param(0x26, 0xC8)
    self._write_param(0x27, 0x00)

    self._write8(0x0F, 0x02)

    self._write_param(0x06, 0x00)
    self._write_param(0x07, 0x02)
    self._write_param(0x08, 0x01)
    self._write_param(0x09,0xC1)

    return True

  # --- Measurements ---
  def read_visible(self):
    self.send_command(0x11)
    return abs(self._read24())

  def read_ir(self):
    self.send_command(0x11)
    return abs(self._read24() // 3)

  def read_uv(self):
    self.send_command(0x11)
    return abs(self._read24() * 0.04)
