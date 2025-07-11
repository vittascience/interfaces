"""
MicroPython driver for SI1145 light I2C sensor, low memory version :
https://github.com/neliogodoi/MicroPython-SI1145
Version: 0.3.0 @ 2018/04/02
"""
 
import utime
from ustruct import unpack

SI1145_I2C_ADDR = 0x60

class SI1145(object):
 
  def __init__(self, i2c, addr=SI1145_I2C_ADDR):
    if i2c == None:
      raise ValueError("I2C object 'SI1145' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'SI1145' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr
    self._reset()
    self._load_calibration()
 
  def _read8(self, register):
    return unpack('B', self._i2c.readfrom_mem(self._addr, register, 1))[0] & 0xFF
 
  def _read16(self, register, little_endian=True):
    result = unpack('BB', self._i2c.readfrom_mem(self._addr, register, 2))
    result = ((result[1] << 8) | (result[0] & 0xFF))
    if not little_endian:
      result = ((result << 8) & 0xFF00) + (result >> 8)
    return result
 
  def _write8(self, register, value):
    value = value & 0xFF
    self._i2c.writeto_mem(self._addr, register, bytes([value]))
 
  def _reset(self):
    self._write8(0x08, 0x00)
    self._write8(0x09, 0x00)
    self._write8(0x04, 0x00)
    self._write8(0x05, 0x00)
    self._write8(0x06, 0x00)
    self._write8(0x03, 0x00)
    self._write8(0x21, 0xFF)
    self._write8(0x18, 0x01)
    utime.sleep(.01)
    self._write8(0x07, 0x17)
    utime.sleep(.01)
 
  def _write_param(self, parameter, value):
    self._write8(0x17, value)
    self._write8(0x18, parameter | 0xA0)
    return self._read8(0x2E)
 
  def _load_calibration(self):
    self._write8(0x13, 0x7B)
    self._write8(0x14, 0x6B)
    self._write8(0x15, 0x01)
    self._write8(0x16, 0x00)
    self._write_param( 0x01, 0x80 | 0x40 | 0x20 | 0x10 | 0x01)
    self._write8(0x03, 0x01)
    self._write8(0x04, 0x01)
    self._i2c.writeto_mem(0x60, 0x0F, b'0x03')
    self._write_param(0x07, 0x03)
    self._write_param(0x02, 0x01)
    self._write_param(0x0B, 0)
    self._write_param(0x0A, 0x70)
    self._write_param(0x0C, 0x20 | 0x04)
    self._write_param(0x0E, 0x00)
    self._write_param(0x1E, 0)
    self._write_param(0x1D, 0x70)
    self._write_param(0x1F, 0x20)
    self._write_param(0x11, 0)
    self._write_param(0x10, 0x70)
    self._write_param(0x12, 0x20)
    self._write8(0x08, 0xFF)
    self._write8(0x18, 0x0F)
 
  def read_uv(self):
    return self._read16(0x2C, little_endian=True) / 100
 
  def read_visible(self):
    return self._read16(0x22, little_endian=True)
 
  def read_ir(self):
    return self._read16(0x24, little_endian=True)
 
  @property
  def read_prox(self):
    return self._read16(0x26, little_endian=True)