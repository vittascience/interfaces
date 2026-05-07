from microbit import i2c, sleep
class SI1151:
  def __init__(self, address=0x53, autonomous=False):
    self.addr = address
    self.autonomous = autonomous
    if not self.begin():
      raise OSError("SI1151 not detected / init failed on I2C addr %#x" % self.addr)
  def _write8(self, reg, val):
    i2c.write(self.addr, bytes([reg, val]))
  def _read8(self, reg):
    # repeated-start is more robust on micro:bit
    i2c.write(self.addr, bytes([reg]), repeat=True)
    return i2c.read(self.addr, 1)[0]
  def _readn(self, start_reg, n):
    i2c.write(self.addr, bytes([start_reg]), repeat=True)
    return i2c.read(self.addr, n)
  def _wait_response_inc(self, prev_ctr, timeout_ms=200):
    # wait until CMD_CTR increments (low nibble)
    # and raise if CMD_ERR set (bit4)
    steps = max(1, timeout_ms // 2)
    for _ in range(steps):
      r = self._read8(0x11)
      if r & 0x10:
        # CMD_ERR
        # reset command counter as datasheet suggests
        self._write8(0x0b, 0x00)
        raise OSError("SI1151 CMD_ERR, RESPONSE0=%#x" % r)
      if (r & 0x0f) == ((prev_ctr + 1) & 0x0f):
        return
      sleep(2)
    raise OSError("SI1151 command timeout (RESPONSE0=%#x)" % self._read8(0x11))
  def send_command(self, cmd):
    prev = self._read8(0x11) & 0x0f
    self._write8(0x0b, cmd)
    self._wait_response_inc(prev)
  def write_param(self, loc, val):
    prev = self._read8(0x11) & 0x0f
    self._write8(0x0a, val)
    self._write8(0x0b, (loc | 0x80))
    self._wait_response_inc(prev)
  def read_param(self, loc):
    prev = self._read8(0x11) & 0x0f
    self._write8(0x0b, (loc | 0x40))
    self._wait_response_inc(prev)
    return self._read8(0x10)
  def begin(self):
    # detect
    if self._read8(0x00) != 0x51:
      return False
    self._write8(0x0b, 0x01)
    for _ in range(200):
      if self._read8(0x11) == 0x2f:
        break
      sleep(2)
    else:
      return False
    self.write_param(0x01, 0b000011)
    self._write8(0x04, 0b000011)
    if self.autonomous:
      self.autonomous = False
    self.write_param(0x02, 0b00000000)
    self.write_param(0x03, 0b10000000)  # high signal range
    self.write_param(0x04, 0b00000000)
    self.write_param(0x05, 0b00000000)
    self.write_param(0x06, 0b00001011)
    self.write_param(0x07, 0b10000000)  # high signal range
    self.write_param(0x08, 0b00000000)
    self.write_param(0x09, 0b00000000)
    return True
  def _force_if_needed(self):
    if not self.autonomous:
      self.send_command(0x11)
      sleep(10)
  def readIR(self):
    self._force_if_needed()
    d = self._readn(0x13, 2)
    return (d[0] << 8) | d[1]
  def readVisible(self):
    self._force_if_needed()
    d = self._readn(0x13 + 2, 2)
    return (d[0] << 8) | d[1]
  def readUV(self):
    raise NotImplementedError("UV not implemented for this SI1151 setup (IR+Visible only)")
