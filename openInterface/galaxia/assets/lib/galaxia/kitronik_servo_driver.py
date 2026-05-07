from micropython import const

class KitronikServoBoard:
  BOARD_1 = const(0x6A)

  # the prescale register address
  PRESCALE_REG = const(0xFE)

  # The mode 1 register address
  MODE_1_REG = const(0x00)

  # If you wanted to write some code that stepped through
  # the servos then this is the Base and size to do that
  SERVO_1_REG_BASE = const(0x08)
  SERVO_REG_DISTANCE = const(4)

  # To get the PWM pulses to the correct size and zero
  # offset these are the default numbers.
  SERVO_MULTIPLIER = const(226)
  SERVO_ZERO_OFFSET = const(0x66)

  # nice big list of servos to use.
  # These represent register offsets in the PCA9865
  SERVOS = [0x08, 0x0C, 0x10, 0x14, 0x18, 0x1C, 0x20, 0x24, 0x28, 0x2C, 0x30, 0x34, 0x38, 0x3C, 0x40, 0x44]

  def trim_servo_multiplier(self, trim_value):
    if trim_value < 113:
      self.SERVO_MULTIPLIER = 113
    else:
      if trim_value > 226:
        self.SERVO_MULTIPLIER = 226
      else:
        self.SERVO_MULTIPLIER = trim_value

  def trim_servo_zero_offset(self, trim_value):
    if trim_value < 0x66:
      self.SERVO_ZERO_OFFSET = 0x66
    else:
      if (trim_value > 0xCC):
        self.SERVO_ZERO_OFFSET = 0xCC
      else:
        self.SERVO_ZERO_OFFSET = trim_value

  def __init__(self, i2c):
    if i2c == None:
      raise ValueError("I2C object 'KitronikServoBoard' needed as argument!")
    self._i2c = i2c
    self._i2c.try_lock()
    i2cModules = self._i2c.scan()
    addr = self.BOARD_1
    if addr not in i2cModules:
      error = "Unable to find module 'KitronikServoBoard' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      print(error)
      raise OSError(error)
    self._addr = addr
    buf = bytearray(2)
    # Should really do a soft reset of the I2C chip here
    # First set the prescaler to 50 hz
    buf[0] = self.PRESCALE_REG
    buf[1] = 0x7D
    self._i2c.writeto(self._addr, bytearray(buf))
    # Block write via the all leds register to set all of them to 0 deg
    buf[0] = 0xFA
    buf[1] = 0x00
    self._i2c.writeto(self._addr, bytearray(buf))
    buf[0] = 0xFB
    buf[1] = 0x00
    self._i2c.writeto(self._addr, bytearray(buf))
    buf[0] = 0xFC
    buf[1] = 0x66
    self._i2c.writeto(self._addr, bytearray(buf))
    buf[0] = 0xFD
    buf[1] = 0x00
    self._i2c.writeto(self._addr, bytearray(buf))
    # Set the mode 1 register to come out of sleep
    buf[0] = self.MODE_1_REG
    buf[1] = 0x01
    self._i2c.writeto(self._addr, bytearray(buf))

  def servo_write(self, servo, degrees):
    # @param servo Which servo to set
    # @param degrees the angle to set the servo to
    buf = bytearray(2)
    HighByte = False
    deg100 = degrees * 100
    PWMVal100 = deg100 * self.SERVO_MULTIPLIER
    PWMVal = PWMVal100 / 10000
    PWMVal = PWMVal + self.SERVO_ZERO_OFFSET
    if (PWMVal > 0xFF):
      HighByte = True
    buf[0] = self.SERVOS[servo - 1]
    buf[1] = int(PWMVal)
    self._i2c.writeto(self._addr, bytearray(buf))
    if (HighByte):
      buf[0] = self.SERVOS[servo - 1] + 1
      buf[1] = 0x01
    else:
      buf[0] = self.SERVOS[servo - 1] + 1
      buf[1] = 0x00
    self._i2c.writeto(self._addr, bytearray(buf))
