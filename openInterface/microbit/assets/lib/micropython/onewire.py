from utime import sleep_us
import machine
class OneWire:
  def __init__(self,pin):
    self.pin=pin
    self.pin.set_pull(pin.PULL_UP)
    self.disable_irq=machine.disable_irq
    self.enable_irq=machine.enable_irq
    self.crctab1=(b"\x00\x5e\xbc\xe2\x61\x3f\xdd\x83"b"\xc2\x9c\x7e\x20\xa3\xfd\x1f\x41")
    self.crctab2=(b"\x00\x9d\x23\xbe\x46\xdb\x65\xf8"b"\x8c\x11\xaf\x32\xca\x57\xe9\x74")
  def reset(self,required=False):
    self.pin.write_digital(0)
    sleep_us(480)
    i=self.disable_irq()
    self.pin.write_digital(1)
    sleep_us(60)
    status=not self.pin.read_digital()
    self.enable_irq(i)
    sleep_us(420)
    assert status is True or required is False,"Onewire device missing"
    return status
  def readbit(self):
    self.pin.write_digital(1)
    i=self.disable_irq()
    self.pin.write_digital(0)
    self.pin.write_digital(1)
    sleep_us(5)
    value=self.pin.read_digital()
    self.enable_irq(i)
    sleep_us(40)
    return value
  def readbyte(self):
    value=0
    for i in range(8):value|=self.readbit()<<i
    return value
  def readbytes(self,count):
    buf=bytearray(count)
    for i in range(count):buf[i]=self.readbyte()
    return buf
  def readinto(self,buf):
      for i in range(len(buf)):buf[i]=self.readbyte()
  def writebit(self,value,powerpin=None):
    i=self.disable_irq()
    self.pin.write_digital(0)
    self.pin.write_digital(value)
    sleep_us(60)
    if powerpin:
      self.pin.write_digital(1)
      powerpin(1)
    else:self.pin.write_digital(1)
    self.enable_irq(i)
  def writebyte(self,value,powerpin=None):
    for i in range(7):
      self.writebit(value&1)
      value>>=1
    self.writebit(value&1,powerpin)
  def write(self,buf):
    for b in buf:self.writebyte(b)
  def select_rom(self,rom):
    self.reset()
    self.writebyte(0x55)
    self.write(rom)
  def crc8(self,data):
    crc=0
    for i in range(len(data)):
       crc^=data[i]
       crc=(self.crctab1[crc&0x0f]^self.crctab2[(crc>>4)&0x0f])
    return crc
  def scan(self):
    devices=[]
    diff=65
    rom=False
    for i in range(0xff):
      rom,diff=self._search_rom(rom,diff)
      if rom:devices+=[rom]
      if diff==0:break
    return devices
  def _search_rom(self,l_rom,diff):
    if not self.reset():return None,0
    self.writebyte(0xf0)
    if not l_rom:l_rom=bytearray(8)
    rom=bytearray(8)
    next_diff=0
    i=64
    for byte in range(8):
      r_b=0
      for bit in range(8):
        b=self.readbit()
        if self.readbit():
          if b:return None,0
        else:
          if not b:
            if diff>i or ((l_rom[byte]&(1<<bit)) and diff != i):
              b=1
              next_diff=i
        self.writebit(b)
        if b:r_b|=1<<bit
        i-=1
      rom[byte]=r_b
    return rom,next_diff