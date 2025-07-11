import utime
from micropython import const

_SGP30_DEFAULT_I2C_ADDR = const(0x58)
_SGP30_FEATURESETS = (0x0020, 0x0022)

_SGP30_CRC8_POLYNOMIAL = const(0x31)
_SGP30_CRC8_INIT = const(0xFF)
_SGP30_WORD_LEN = const(2)

class SGP30:
  """
  A driver for the SGP30 gas sensor.
  :param i2c: The I2C object to use. This is the only required parameter.
  :param int address: (optional) The I2C address of the device.
  """
  def __init__(self, i2c, addr=_SGP30_DEFAULT_I2C_ADDR):
    """Initialize the sensor, get the serial # and verify that we found a proper SGP30"""
    if i2c == None:
      raise ValueError("I2C object 'SGP30' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'SGP30' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr
    self.serial = self._i2c_read_words_from_cmd(command=[0x36, 0x82], reply_size=3)
    featureset = self._i2c_read_words_from_cmd([0x20, 0x2f], 1, 10)
    if featureset[0] not in _SGP30_FEATURESETS:
      raise RuntimeError('SGP30 Not detected')
    self.initialise_indoor_air_quality()

  def total_organic_compound(self):
    """Total Volatile Organic Compound in parts per billion."""
    return self.indoor_air_quality()[1]

  def baseline_total_organic_compound(self):
    """Total Volatile Organic Compound baseline value"""
    return self.indoor_air_quality_baseline()[1]

  def co2_equivalent(self):
    """Carbon Dioxide Equivalent in parts per million"""
    return self.indoor_air_quality()[0]

  def baseline_co2_equivilant(self):
    """Carbon Dioxide Equivalent baseline value"""
    return self.indoor_air_quality_baseline()[0]

  def initialise_indoor_air_quality(self):
    """Initialize the IAQ algorithm"""
    # name, command, signals, delay
    self._i2c_read_words_from_cmd(command=[0x20, 0x03], reply_size=0)

  def indoor_air_quality(self):
    """Measure the CO2eq and TVOC"""
    # name, command, signals, delay
    return self._i2c_read_words_from_cmd(command=[0x20, 0x08], reply_size=2, delay=50)

  def indoor_air_quality_baseline(self):
    """Get the IAQ algorithm baseline for CO2eq and TVOC"""
    # name, command, signals, delay
    return self._i2c_read_words_from_cmd(command=[0x20, 0x15], reply_size=2)

  def set_indoor_air_quality_baseline(self, co2_equivalent, total_volatile_organic_compounds):
    """Set the previously recorded IAQ algorithm baseline for CO2eq and TVOC"""
    if co2_equivalent == 0 and total_volatile_organic_compounds == 0:
      raise RuntimeError('Invalid baseline')
    buffer = []
    for value in [total_volatile_organic_compounds, co2_equivalent]:
      arr = [value >> 8, value & 0xFF]
      arr.append(generate_crc(arr))
      buffer += arr
    self._i2c_read_words_from_cmd(command=[0x20, 0x1e] + buffer, reply_size=0)

  # Low level command functions
  def _i2c_read_words_from_cmd(self, command, reply_size, delay=10):
    """Run an SGP command query, get a reply and CRC results if necessary"""
    self._i2c.writeto(self._addr, bytes(command))
    utime.sleep_ms(delay)
    if not reply_size:
      return None
    crc_result = bytearray(reply_size * (_SGP30_WORD_LEN + 1))
    self._i2c.readfrom_into(self._addr, crc_result)
    result = []
    for i in range(reply_size):
      word = [crc_result[3*i], crc_result[3*i+1]]
      crc = crc_result[3*i+2]
      if generate_crc(word) != crc:
        raise RuntimeError('CRC Error')
      result.append(word[0] << 8 | word[1])
    return result

def generate_crc(data):
  """8-bit CRC algorithm for checking data"""
  crc = _SGP30_CRC8_INIT
  # calculates 8-Bit checksum with given polynomial
  for byte in data:
    crc ^= byte
    for _ in range(8):
      if crc & 0x80:
        crc = (crc << 1) ^ _SGP30_CRC8_POLYNOMIAL
      else:
        crc <<= 1
  return crc & 0xFF