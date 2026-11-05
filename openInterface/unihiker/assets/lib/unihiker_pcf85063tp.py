# I2C-Adresse des PCF80063A
RTC_HP_ADDRESS = (0x51)

# registar overview - crtl & status reg
RTC_CTRL_1 = (0x00)
RTC_CTRL_2 = (0x01)
RTC_OFFSET = (0x02)
RTC_RAM_by = (0x03)

# registar overview - time & data reg
RTC_SECOND_ADDR = (0x04)
RTC_MINUTE_ADDR = (0x05)
RTC_HOUR_ADDR   = (0x06)
RTC_DAY_ADDR    = (0x07)
RTC_WDAY_ADDR   = (0x08)
RTC_MONTH_ADDR  = (0x09)
RTC_YEAR_ADDR	  = (0x0a)

DAY_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

class RTC_HP:
  def __init__(self, i2c, addr=RTC_HP_ADDRESS):
    if i2c == None:
      raise ValueError("I2C object 'RTC_HP' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'RTC_HP' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise OSError(error)
    self._addr = addr

  def decToBcd(self, val):
    return (val // 10 * 16) + (val % 10)

  def bcdToDec(self, val):
    return (val // 16 * 10) + (val % 16)

  def reset(self):
    self._i2c.writeto_mem(self._addr, RTC_CTRL_1, '\x58')

  def fillByHMS(self, hour, minute, second):
    self._i2c.writeto_mem(self._addr, RTC_SECOND_ADDR, bytearray([self.decToBcd(second)]))
    self._i2c.writeto_mem(self._addr, RTC_MINUTE_ADDR, bytearray([self.decToBcd(minute)]))
    self._i2c.writeto_mem(self._addr, RTC_HOUR_ADDR, bytearray([self.decToBcd(hour)]))

  def fillByYMD(self, year, month, day):
    self._i2c.writeto_mem(self._addr, RTC_DAY_ADDR, bytearray([self.decToBcd(day)]))
    self._i2c.writeto_mem(self._addr, RTC_MONTH_ADDR, bytearray([self.decToBcd(month)]))
    self._i2c.writeto_mem(self._addr, RTC_YEAR_ADDR, bytearray([self.decToBcd(year-2000)]))

  def fillDayOfWeek(self, dayOfWeek):
    self._i2c.writeto_mem(self._addr, RTC_WDAY_ADDR, bytearray([self.decToBcd(DAY_OF_WEEK.index(dayOfWeek))]))

  def startClock(self):
    second = bytes(self._i2c.readfrom(self._addr, 1))[0] & 0x7f
    self._i2c.writeto_mem(self._addr, RTC_CTRL_1, bytearray([second]))

  def readTime(self):
    rdata = bytes(self._i2c.readfrom_mem(self._addr, RTC_SECOND_ADDR, 7))
    return (
      self.bcdToDec(rdata[6]) + 2000, # year
      self.bcdToDec(rdata[5] & 0x1f), # month
      self.bcdToDec(rdata[3] & 0x3f), # day
      DAY_OF_WEEK[self.bcdToDec(rdata[4] & 0x07)], # wday
      self.bcdToDec(rdata[2] & 0x3f), # hour
      self.bcdToDec(rdata[1]) & 0x7f, # minute
      self.bcdToDec(rdata[0]) # second
    )