from micropython import const

# I2C-Address - DS1307
RTC_V1_ADDRESS = const(0x68)

# registar overview - crtl & status reg
RTC_CTRL_1 = const(0x00)
RTC_CTRL_2 = const(0x01)

# registar overview - time & data reg
RTC_SECOND_ADDR = const(0x00)
RTC_MINUTE_ADDR = const(0x01)
RTC_HOUR_ADDR   = const(0x02)
RTC_WDAY_ADDR   = const(0x03)
RTC_DAY_ADDR    = const(0x04)
RTC_MONTH_ADDR  = const(0x05)
RTC_YEAR_ADDR	  = const(0x06)

DAY_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

class DS1307:
  def __init__(self, i2c, addr=RTC_V1_ADDRESS):
    if i2c == None:
      raise ValueError("I2C object 'DS1307' needed as argument!")
    self._i2c = i2c
    self._i2c.try_lock()
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'DS1307' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      print(error)
      raise ValueError(error)
    self._addr = addr

  def decToBcd(self, val):
    return (val // 10) << 4 | (val % 10)

  def bcdToDec(self, val):
    return ((val >> 4) * 10) + (val & 0x0F)

  def reset(self):
    self._i2c.writeto(self._addr, bytes([RTC_CTRL_1, 0x58]))

  def fillByHMS(self, hour, minute, second):
    self._i2c.writeto(self._addr, bytes([RTC_SECOND_ADDR, self.decToBcd(second)]))
    self._i2c.writeto(self._addr, bytes([RTC_MINUTE_ADDR, self.decToBcd(minute)]))
    self._i2c.writeto(self._addr, bytes([RTC_HOUR_ADDR, self.decToBcd(hour)]))

  def fillByYMD(self, year, month, day):
    self._i2c.writeto(self._addr, bytes([RTC_DAY_ADDR, self.decToBcd(day)]))
    self._i2c.writeto(self._addr, bytes([RTC_MONTH_ADDR, self.decToBcd(month)]))
    self._i2c.writeto(self._addr, bytes([RTC_YEAR_ADDR, self.decToBcd(year-2000)]))

  def fillDayOfWeek(self, dayOfWeek):
    self._i2c.writeto(self._addr, bytes([RTC_WDAY_ADDR, self.decToBcd(DAY_OF_WEEK.index(dayOfWeek))]))

  def startClock(self):
    crc_result = bytearray(1)
    self._i2c.readfrom_into(self._addr, crc_result)
    second = crc_result[0] & 0x7f
    self._i2c.writeto(self._addr, bytes([RTC_CTRL_1, second]))

  def readTime(self):
    self._i2c.writeto(self._addr, bytes([RTC_SECOND_ADDR]))
    rdata = bytearray(7)
    self._i2c.readfrom_into(self._addr, rdata)
    return (
      self.bcdToDec(rdata[6]) + 2000, # year
      self.bcdToDec(rdata[5]), # month
      self.bcdToDec(rdata[4]), # day
      DAY_OF_WEEK[self.bcdToDec(rdata[3])], # weekday
      self.bcdToDec(rdata[2]), # hour
      self.bcdToDec(rdata[1]), # minute
      self.bcdToDec(rdata[0] & 0x7F), # second
    )