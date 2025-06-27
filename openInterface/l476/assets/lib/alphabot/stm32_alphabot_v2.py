from stm32_TRsensors import TRSensors
from stm32_pcf8574 import PCF8574
import machine
import pyb
import utime

ALPHABOT_V2_PIN_AIN2 = 'A0'
ALPHABOT_V2_PIN_AIN1 = 'A1'
ALPHABOT_V2_PIN_BIN1 = 'A2'
ALPHABOT_V2_PIN_BIN2 = 'A3'

ALPHABOT_V2_PIN_ECHO = 'D2'
ALPHABOT_V2_PIN_TRIG = 'D3'
ALPHABOT_V2_PIN_IR = 'D4'
ALPHABOT_V2_PIN_PWMB = 'D5'
ALPHABOT_V2_PIN_PWMA = 'D6'
ALPHABOT_V2_PIN_RGB = 'D7'

ALPHABOT_V2_PIN_OLED_D_C = 'D8'
ALPHABOT_V2_PIN_OLED_RESET = 'D9'

ALPHABOT_V2_PIN_TRS_CS = 'D10'
ALPHABOT_V2_PIN_TRS_DOUT = 'D11'
ALPHABOT_V2_PIN_TRS_ADDR = 'D12'
ALPHABOT_V2_PIN_TRS_CLK = 'D13'

ALPHABOT_V2_PCF8574_I2C_ADDR = 0x20
ALPHABOT_V2_OLED_I2C_ADDR_DC_OFF = 0x3c
ALPHABOT_V2_OLED_I2C_ADDR_DC_ON = 0x3d

class AlphaBot_v2(object):
  
  def __init__(self):
    self.ain1 = pyb.Pin(ALPHABOT_V2_PIN_AIN1, pyb.Pin.OUT)
    self.ain2 = pyb.Pin(ALPHABOT_V2_PIN_AIN2, pyb.Pin.OUT)
    self.bin1 = pyb.Pin(ALPHABOT_V2_PIN_BIN1, pyb.Pin.OUT)
    self.bin2 = pyb.Pin(ALPHABOT_V2_PIN_BIN2, pyb.Pin.OUT)

    self.pin_PWMA = pyb.Pin(ALPHABOT_V2_PIN_PWMA, pyb.Pin.OUT_PP)
    tim_A = pyb.Timer(2, freq=500)
    self.PWMA = tim_A.channel(3, pyb.Timer.PWM, pin=self.pin_PWMA)

    self.pin_PWMB = pyb.Pin(ALPHABOT_V2_PIN_PWMB, pyb.Pin.OUT_PP)
    tim_B = pyb.Timer(3, freq=500)
    self.PWMB = tim_B.channel(1, pyb.Timer.PWM, pin=self.pin_PWMB)

    self.stop()

    print('[Alphabot_INFO]: Motors initialised')

    self.trig = pyb.Pin(ALPHABOT_V2_PIN_TRIG, pyb.Pin.OUT)
    self.echo = pyb.Pin(ALPHABOT_V2_PIN_ECHO, pyb.Pin.IN)

    self.pin_RGB = pyb.Pin(ALPHABOT_V2_PIN_RGB, pyb.Pin.OUT)

    self.tr_sensors = TRSensors(
      cs = ALPHABOT_V2_PIN_TRS_CS,
      dout = ALPHABOT_V2_PIN_TRS_DOUT,
      addr = ALPHABOT_V2_PIN_TRS_ADDR,
      clk = ALPHABOT_V2_PIN_TRS_CLK
    )

    print('[Alphabot_INFO]: TR sensors initialised')

    self.i2c = machine.I2C(1)

    self.LEFT_OBSTACLE = 'L'
    self.RIGHT_OBSTACLE = 'R'
    self.BOTH_OBSTACLE = 'B'
    self.NO_OBSTACLE = 'N'

    self.JOYSTICK_UP = 'up'
    self.JOYSTICK_RIGHT = 'right'
    self.JOYSTICK_LEFT = 'left'
    self.JOYSTICK_DOWN = 'down'
    self.JOYSTICK_CENTER = 'center'

    print('[Alphabot_INFO]: IR detectors initialised (for obstacles)')

    self.pin_IR = pyb.Pin(ALPHABOT_V2_PIN_IR, pyb.Pin.IN)

    print('[Alphabot_INFO]: IR receiver initialised (for remotes)')

    self.pin_oled_reset = pyb.Pin(ALPHABOT_V2_PIN_OLED_RESET, pyb.Pin.OUT)
    self.pin_oled_reset.off()
    utime.sleep_ms(10)
    self.pin_oled_reset.on()
    self.pin_DC = pyb.Pin(ALPHABOT_V2_PIN_OLED_D_C, pyb.Pin.OUT)

    print('[Alphabot_INFO]: OLED screen initialised')

    self._pcf8574 = PCF8574(self.i2c, addr=ALPHABOT_V2_PCF8574_I2C_ADDR)
          
  def setPWMA(self, value):
    self.PWMA.pulse_width_percent(value)

  def setPWMB(self, value):
    self.PWMB.pulse_width_percent(value)
          
  def setMotorLeft(self, speed):
    if speed is not None:
      if speed >= 0 and speed <= 100:
        self.ain1.off()
        self.ain2.on()
        self.setPWMA(speed)
      elif speed >= -100 and speed < 0:
        self.ain1.on()
        self.ain2.off()
        self.setPWMA(-speed)
        
  def setMotorRight(self, speed):
    if speed is not None:
      if speed >= 0 and speed <= 100:
        self.bin1.off()
        self.bin2.on()
        self.setPWMB(speed)
      elif speed >= -100 and speed < 0:
        self.bin1.on()
        self.bin2.off()
        self.setPWMB(-speed)

  def stop(self):
    self.setMotorLeft(0)
    self.setMotorRight(0)

  def moveForward(self, speed, duration_ms=None):
    self.setMotorLeft(speed)
    self.setMotorRight(speed)
    if duration_ms:
      utime.sleep_ms(duration_ms)
      self.stop()

  def moveBackward(self, speed, duration_ms=None):
    self.setMotorLeft(-speed)
    self.setMotorRight(-speed)
    if duration_ms:
      utime.sleep_ms(duration_ms)
      self.stop()

  def turnLeft(self, speed, duration_ms=None):
    self.setMotorLeft(-speed)
    self.setMotorRight(speed)
    if duration_ms:
      utime.sleep_ms(duration_ms)
      self.stop()

  def turnRight(self, speed, duration_ms=None):
    self.setMotorLeft(speed)
    self.setMotorRight(-speed)
    if duration_ms:
      utime.sleep_ms(duration_ms)
      self.stop()

  def calibrateLineFinder(self):
    print("[Alphabot_INFO]: TR sensors calibration ...\\n")
    for i in range(0, 100):
      if i<25 or i>= 75:
        self.turnRight(20, 50)
        self.moveForward(20, 50)
      else:
        self.turnLeft(20, 50)
        self.moveForward(20, 50)
      self.TRSensors_calibrate()
    self.stop()
    print("Calibration done.\\n")
    print(str(self.tr_sensors.calibratedMin) + '\\n')
    print(str(self.tr_sensors.calibratedMax) + '\\n')
    utime.sleep_ms(500)

  def TRSensors_calibrate(self):
    self.tr_sensors.calibrate()

  def TRSensors_readLine(self, sensor = 0):
    position, sensor_values = self.tr_sensors.readLine()
    if sensor is 0:
      return sensor_values
    else:
      return sensor_values[sensor-1]

  def readUltrasonicDistance(self, length=15, timeout_us = 30000):
    measurements = 0
    for i in range(length):
      self.trig.off()
      utime.sleep_us(2)               
      self.trig.on()
      utime.sleep_us(10)
      self.trig.off()
      self.echo.value()
      measurements += machine.time_pulse_us(self.echo, 1, timeout_us)/1e6 # t_echo in seconds
    duration = measurements/length
    return 343 * duration/2 * 100

  def getOLEDaddr(self):
    if self.pin_DC.value(): 
      return ALPHABOT_V2_OLED_I2C_ADDR_DC_ON
    else: 
      return ALPHABOT_V2_OLED_I2C_ADDR_DC_OFF

  # Drivers for PCF8574T

  def controlBuzzer(self, state):
    self._pcf8574.pin(5, state)

  def getJoystickValue(self):
    i = 0
    for i in range(5):
      if not self._pcf8574.pin(i): break
      elif i == 4: i = None
    if i == 0:
      return self.JOYSTICK_UP
    elif i == 1:
      return self.JOYSTICK_RIGHT
    elif i == 2:
      return self.JOYSTICK_LEFT
    elif i == 3:
      return self.JOYSTICK_DOWN
    elif i == 4:
      return self.JOYSTICK_CENTER
    else: 
      return None

  def readInfrared(self):
    left = not self._pcf8574.pin(7)
    right = not self._pcf8574.pin(6)
    if left and not right:
      return self.LEFT_OBSTACLE
    elif not left and right:
      return self.RIGHT_OBSTACLE
    elif left and right:
      return self.BOTH_OBSTACLE
    else:
      return self.NO_OBSTACLE
