# esp32_si1151.py
# MicroPython (ESP32) driver for Si1151 / Si115x (Grove Sunlight Sensor v2)
#

from utime import sleep_ms

class SI1151:
  # --- Registers ---
  _PART_ID = 0x00

  _HOSTIN0 = 0x0a
  _COMMAND = 0x0b

  _IRQ_ENABLE = 0x04
  _IRQ_STATUS = 0x12

  _RESPONSE0 = 0x11
  _RESPONSE1 = 0x10

  _HOSTOUT0 = 0x13  # HOSTOUT0..HOSTOUT5 start here

  # --- Commands ---
  _RESET_CMD_CTR = 0x00
  _RESET_SW = 0x01
  _FORCE = 0x11
  _START = 0x13  # autonomous mode; kept for completeness

  # --- Param opcodes ---
  _PARAM_QUERY = 0x40
  _PARAM_SET = 0x80

  # --- Params (common Si115x map) ---
  _CHAN_LIST = 0x01

  # Channel 0 (IR)
  _ADCCONFIG_0 = 0x02
  _ADCSENS_0 = 0x03
  _ADCPOST_0 = 0x04
  _MEASCONFIG_0 = 0x05

  # Channel 1 (Visible)
  _ADCCONFIG_1 = 0x06
  _ADCSENS_1 = 0x07
  _ADCPOST_1 = 0x08
  _MEASCONFIG_1 = 0x09

  def __init__(self, i2c, address=0x53, autonomous=False):
    self.i2c = i2c
    self.addr = address
    self.autonomous = autonomous
    if not self.begin():
      raise OSError("si1151 init failed (addr=%#x)" % self.addr)

  # ---------------- I2C helpers ----------------
  def _write8(self, reg, val):
    self.i2c.writeto(self.addr, bytes([reg, val]))

  def _read8(self, reg):
    # writeto_then_readfrom uses repeated start when available
    try:
      b = self.i2c.readfrom_mem(self.addr, reg, 1)
      return b[0]
    except AttributeError:
      # fallback if readfrom_mem not present
      self.i2c.writeto(self.addr, bytes([reg]), stop=False)
      return self.i2c.readfrom(self.addr, 1)[0]

  def _readn(self, start_reg, n):
    try:
      return self.i2c.readfrom_mem(self.addr, start_reg, n)
    except AttributeError:
      self.i2c.writeto(self.addr, bytes([start_reg]), stop=False)
      return self.i2c.readfrom(self.addr, n)

  # ---------------- Si115x protocol ----------------
  def _wait_response_inc(self, prev_ctr, timeout_ms=200):
    steps = max(1, timeout_ms // 2)
    for _ in range(steps):
      r = self._read8(self._RESPONSE0)
      if r & 0x10:
        # CMD_ERR bit set: reset cmd counter, then fail
        self._write8(self._COMMAND, self._RESET_CMD_CTR)
        raise OSError("si1151 cmd_err response0=%#x" % r)
      if (r & 0x0f) == ((prev_ctr + 1) & 0x0f):
        return
      sleep_ms(2)
    raise OSError("si1151 cmd timeout response0=%#x" % self._read8(self._RESPONSE0))

  def send_command(self, cmd):
    prev = self._read8(self._RESPONSE0) & 0x0f
    self._write8(self._COMMAND, cmd)
    self._wait_response_inc(prev)

  def write_param(self, loc, val):
    prev = self._read8(self._RESPONSE0) & 0x0f
    self._write8(self._HOSTIN0, val)
    self._write8(self._COMMAND, (loc | self._PARAM_SET))
    self._wait_response_inc(prev)

  def read_param(self, loc):
    prev = self._read8(self._RESPONSE0) & 0x0f
    self._write8(self._COMMAND, (loc | self._PARAM_QUERY))
    self._wait_response_inc(prev)
    return self._read8(self._RESPONSE1)

  # ---------------- Init ----------------
  def begin(self):
    # detect
    if self._read8(self._PART_ID) != 0x51:
      return False

    # RESET_SW then wait RESPONSE0 == 0x2f (common working sequence)
    self._write8(self._COMMAND, self._RESET_SW)
    for _ in range(250):
      if self._read8(self._RESPONSE0) == 0x2f:
        break
      sleep_ms(2)
    else:
      return False

    # Enable channels: IR + Visible (bits 0 and 1)
    self.write_param(self._CHAN_LIST, 0b000011)

    # Enable interrupts for channels 0 and 1 (not strictly required for FORCE, but OK)
    self._write8(self._IRQ_ENABLE, 0b000011)

    # Manual FORCE mode setup (stable on Grove V2)
    # IR channel (0)
    self.write_param(self._ADCCONFIG_0, 0b00000000)
    self.write_param(self._ADCSENS_0, 0b10000000)  # high range
    self.write_param(self._ADCPOST_0, 0b00000000)
    self.write_param(self._MEASCONFIG_0, 0b00000000)

    # Visible channel (1)
    self.write_param(self._ADCCONFIG_1, 0b00001011)  # visible mux
    self.write_param(self._ADCSENS_1, 0b10000000)  # high range
    self.write_param(self._ADCPOST_1, 0b00000000)
    self.write_param(self._MEASCONFIG_1, 0b00000000)

    # If you later want true autonomous mode: you’d configure MEASRATE/MEASCOUNT and then START.
    self.autonomous = False
    return True

  # ---------------- Measurements ----------------
  def _force_if_needed(self):
    if not self.autonomous:
      self.send_command(self._FORCE)
      sleep_ms(10)

  def read_ir(self):
    # IR: HOSTOUT0 (MSB), HOSTOUT1 (LSB)
    self._force_if_needed()
    d = self._readn(self._HOSTOUT0, 2)
    return (d[0] << 8) | d[1]

  def read_visible(self):
    # Visible: HOSTOUT2 (MSB), HOSTOUT3 (LSB)
    self._force_if_needed()
    d = self._readn(self._HOSTOUT0 + 2, 2)
    return (d[0] << 8) | d[1]

  def read_uv(self):
    # Grove Sunlight Sensor V2 (Si1151) is typically IR+Visible; UV is often not wired/meaningful.
    raise NotImplementedError("uv not implemented for this si1151 setup (ir+visible only)")
