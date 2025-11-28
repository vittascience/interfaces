from microbit import i2c
from micropython import const
import maqueenplusv2
import utime

I2C_ADDR = maqueenplusv2.I2C_ADDR
FORWARD = maqueenplusv2.FORWARD
BACKWARD = maqueenplusv2.BACKWARD

#Direction
LEFT = const(1)
RIGHT = const(2)
BOTH = const(3)

#RGB LED constants
COLOR = {
  'RED': 1,
  'GREEN': 2,
  'YELLOW': 3,
  'BLUE': 4,
  'PURPLE': 5,
  'CYAN': 6,
  'WHITE': 7,
  'BLACK': 0
}

RUN = {
  'LEFT': 1,
  'RIGHT': 2,
  'STRAIGHT': 3,
  'STOP': 4
}

INTERSECTION = {
  'CROSSROADS': 1,
  'T_JUNCTION': 2,
  'LEFT': 3,
  'RIGHT': 4
}

PID_DIR = {
  'RIGHT': 1,
  'LEFT': 2,
  'FORWARD': 1,
  'BACKWARD': 2
}

CM_PER_SEC = 'cm_s'
INCH_PER_SEC = 'inch_s'

def initRobot(): maqueenplusv2.initRobot()
def readVersion(): return maqueenplusv2.readVersion()
def motorControlLeft(dir, spd): maqueenplusv2.motorControlLeft(dir, spd)
def motorControlRight(dir, spd): maqueenplusv2.motorControlRight(dir, spd)
def stop(): maqueenplusv2.stop()
def drive(speed_left, speed_right=None): maqueenplusv2.drive(speed_left, speed_right)
def backup(speed_left, speed_right=None): maqueenplusv2.backup(speed_left, speed_right)
def spin_left(speed_left, speed_right=None): maqueenplusv2.spin_left(speed_left, speed_right)
def spin_right(speed_left, speed_right=None): maqueenplusv2.spin_right(speed_left, speed_right)
def read_all_line_sensors(): return maqueenplusv2.read_all_line_sensors()
def read_line_sensor(sensor): return maqueenplusv2.read_line_sensor(sensor)
def sensor_on_line(sensor): return maqueenplusv2.sensor_on_line(sensor)
def set_servo_angle(pin, angle): maqueenplusv2.set_servo_angle(pin, angle)

# Specific Maqueen Plus V3

def setPatrolSpeed(speed): i2c.write(I2C_ADDR, bytes([0x3F, int(speed)]))
def setIntersectionRunMode(mode): i2c.write(I2C_ADDR, bytes([0x45, mode]))
def setTjunctionRunMode(mode): i2c.write(I2C_ADDR, bytes([0x46, mode]))
def setLeftOrStraightRunMode(mode): i2c.write(I2C_ADDR, bytes([0x47, mode]))
def setRightOrStraightRunMode(mode): i2c.write(I2C_ADDR, bytes([0x48, mode]))

def setPatrollingState(state):
  if (isinstance(state, bool) and state) or state == 'ON': cmd = 0x04|0x01
  elif not state or state == 'OFF': cmd = 0x08
  i2c.write(I2C_ADDR, bytes([0x3C, cmd]))

def intersectionDetecting():
  i2c.write(I2C_ADDR, bytes([0x3D]))
  return int.from_bytes(i2c.read(I2C_ADDR, 1), "big")

def readLightIntensity(sensor):
  i2c.write(I2C_ADDR, bytes([0x4E]))
  buffer = i2c.read(I2C_ADDR, 4)
  if sensor is LEFT or sensor is 'LEFT': 
    return buffer[0] << 8 | buffer[1]
  elif sensor is RIGHT or sensor is 'RIGHT':
    return buffer[2] << 8 | buffer[3]
  
def runDistance(direction, distance, unit = 'cm', wait = True):
  speed = 2 # approximately 13-14 cm/s
  if distance >= 6000: distance = 6000
  if unit is 'inch':
    distance *= 2.54
  i2c.write(I2C_ADDR, bytes([0x40, direction]))
  i2c.write(I2C_ADDR, bytes([0x55, speed]))
  i2c.write(I2C_ADDR, bytes([0x41, round(distance) >> 8]))
  i2c.write(I2C_ADDR, bytes([0x42, round(distance)]))
  i2c.write(I2C_ADDR, bytes([0x3C, 0x04 | 0x02]))
  if wait: waitCommand()

def turnWithAngle(direction, angle, wait = True):
  speed = 2 # approximately 13-14 cm/s
  if direction is PID_DIR['RIGHT']:
    if angle < 0:
      direction = PID_DIR['LEFT']
      angle = -angle
  elif direction is PID_DIR['LEFT']:
    if angle < 0:
      direction = PID_DIR['RIGHT']
      angle = -angle
  i2c.write(I2C_ADDR, bytes([0x43, direction]))
  i2c.write(I2C_ADDR, bytes([0x56, speed]))
  i2c.write(I2C_ADDR, bytes([0x44, int(angle)]))
  i2c.write(I2C_ADDR, bytes([0x3C, 0x04 | 0x02]))
  if wait: waitCommand()

def waitCommand():
  i2c.write(I2C_ADDR, bytes([0x57]))
  while i2c.read(I2C_ADDR, 1)[0]:
    utime.sleep_ms(10)

def pidControlStop():
  i2c.write(I2C_ADDR, bytes([0x3C, 0x10]))

def readRealTimeSpeed(motor, unit = CM_PER_SEC):
  speed = 0
  i2c.write(I2C_ADDR, bytes([0x4C]))
  buffer = i2c.read(I2C_ADDR, 2)
  if motor is LEFT or motor is 'LEFT': 
    speed = buffer[0]
  elif motor is RIGHT or motor is 'RIGHT':
    speed = buffer[1]
  if unit is INCH_PER_SEC:
    speed /= 2.54
  return speed / 5.0

def setRGBLed(led, rgb):
  if led is LEFT or led is 'LEFT':
    i2c.write(I2C_ADDR, bytes([0x0B, rgb]))
  elif led is RIGHT or led is 'RIGHT':
    i2c.write(I2C_ADDR, bytes([0x0C, rgb]))
  elif led is BOTH or led is 'BOTH':
    i2c.write(I2C_ADDR, bytes([0x0B, rgb]))
    i2c.write(I2C_ADDR, bytes([0x0C, rgb]))