from microbit import i2c

class KitronikServoBoard:
  BOARD_1 = 0x6A

  # the prescale register address
  PRESCALE_REG = 0xFE

  # The mode 1 register address
  MODE_1_REG = 0x00

  # If you wanted to write some code that stepped through
  # the servos then this is the Base and size to do that
  SERVO_1_REG_BASE = 0x08
  SERVO_REG_DISTANCE = 4

  # To get the PWM pulses to the correct size and zero
  # offset these are the default numbers.
  SERVO_MULTIPLIER = 226
  SERVO_ZERO_OFFSET = 0x66

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

  def __init__(self):
    buf = bytearray(2)
    # Should really do a soft reset of the I2C chip here
    # First set the prescaler to 50 hz
    buf[0] = self.PRESCALE_REG
    buf[1] = 0x7D
    i2c.write(self.BOARD_1, buf, False)
    # Block write via the all leds register to set all of them to 0 deg
    buf[0] = 0xFA
    buf[1] = 0x00
    i2c.write(self.BOARD_1, buf, False)
    buf[0] = 0xFB
    buf[1] = 0x00
    i2c.write(self.BOARD_1, buf, False)
    buf[0] = 0xFC
    buf[1] = 0x66
    i2c.write(self.BOARD_1, buf, False)
    buf[0] = 0xFD
    buf[1] = 0x00
    i2c.write(self.BOARD_1, buf, False)
    # Set the mode 1 register to come out of sleep
    buf[0] = self.MODE_1_REG
    buf[1] = 0x01
    i2c.write(self.BOARD_1, buf, False)

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
    i2c.write(self.BOARD_1, buf, False)
    if (HighByte):
      buf[0] = self.SERVOS[servo - 1] + 1
      buf[1] = 0x01
    else:
      buf[0] = self.SERVOS[servo - 1] + 1
      buf[1] = 0x00
    i2c.write(self.BOARD_1, buf, False)
