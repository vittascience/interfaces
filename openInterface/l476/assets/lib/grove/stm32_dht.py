import dht

class DHTBase:
  def __init__(self, pin):
    self.pin = pin
    self.buf = bytearray(5)

  def measure(self):
    buf = self.buf
    dht.dht_readinto(self.pin, buf)
    if (buf[0] + buf[1] + buf[2] + buf[3]) & 0xFF != buf[4]:
      raise Exception("checksum error")

class DHT11(DHTBase):
  def humidity(self):
    return self.buf[0]
  def temperature(self):
    return self.buf[2]

class DHT22(DHTBase):
  def humidity(self):
    return (self.buf[0] << 8 | self.buf[1]) * 0.1
  def temperature(self):
    t = ((self.buf[2] & 0x7F) << 8 | self.buf[3]) * 0.1
    if self.buf[2] & 0x80:
      t = -t
    return t