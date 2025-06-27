"""
MicroPython Cutebot Pro driver
https://github.com/Vittascience/microbit-libraries

Source: https://github.com/elecfreaks/pxt-Cutebot-Pro/blob/master/main.ts

MIT License
Copyright (c) 2024 Léo Meillier
"""

from microbit import i2c, pin8, pin12, pin15
import machine
import neopixel
import utime
import math

class CBP:

    V1 = 'V1'
    V2 = 'V2'

    I2C_ADDRESS = 0x10

    CM_PER_SEC = 'cm_s'
    INCH_PER_SEC = 'inch_s'

    MOTOR_LEFT = 'left'
    MOTOR_RIGHT = 'right'
    MOTOR_BOTH = 'both'

    CMD = {
        'V1': {
            'left': 1,
            'right': 2,
            'both': 3
        },
        'V2': {
            'left': 0,
            'right': 1,
            'both': 2
        }
    }

    LED_RIGHT = 0x01
    LED_LEFT = 0x02
    LED_BOTH = 0x03

    DIRECTION_RETREAT = 0
    DIRECTION_ADVANCE = 1

    TURN_LEFT = 0
    TURN_RIGHT = 1
    TURN_LEFT_AT = 2
    TURN_RIGHT_AT = 3

    SERVO_TYPE_0_180 = 1
    SERVO_TYPE_0_270 = 2
    SERVO_TYPE_0_360 = 3

    WHEELS_CENTRE_RADIUS = 4.6  # in cm

    def __init__(self):
        self.fourWayStateValue = 0
        self.pulseCntL = 0
        self.pulseCntR = 0
        self.squareSize = 10
        self.squareUnit = 'cm'
        self.version = self.V1
        self.neopx = neopixel.NeoPixel(pin15, 2)
        self.v1check = False
        self.v2check = False
        print("Cutebot Pro version: " + self.readVersion())

    def _write(self, reg, command = None):
        if self.version is self.V2:
            buf = [0xFF, 0xF9, reg, len(command)] + (command if command else [])
        else:
            buf = [0x99, reg] + (command + [0] * (4 - len(command)) if command else [0]*4) + [0x88]
        i2c.write(self.I2C_ADDRESS, bytes(buf))

    def _read(self, reg, size, command = None):
        self._write(reg, command)
        return i2c.read(self.I2C_ADDRESS, size)
    
    def _readNumber(self, reg, n, command = None):
        result = self._read(reg, n, command)
        return int.from_bytes(result, 'little', False)

    def readVersion(self, result = None):
        if not (self.v1check and self.v2check):
            if self.version is self.V2:
                result = self._read(0xA0, 3, [0x00])
                if result[0] is not 0x02:
                    self.version = self.V1
                    self.v1check = True
                    return self.readVersion(result)
            else:
                decimal = self._read(0x15, 1, [0x00])[0]
                integer = self._read(0x15, 1, [0x01])[0]
                if decimal > 10:
                    result = [integer, decimal/10, decimal%10]
                else:
                    result = [integer, 0, decimal%10]
                if integer is not 0x01:
                    self.version = self.V2
                    self.v2check = True
                    return self.readVersion(result)            
        return "V" + str(result[0]) + "." + str(result[1]) + "." + str(result[2])
    
    def pwmCruiseControlMotor(self, motor, speed):
        if self.version is self.V1:
            if speed is 0:
                speed = 0xC8
            elif speed > 0:
                speed = self._map(speed, 0, 100, 20, 100)
            else:
                speed = self._map(speed, -100, 0, -100, -20)
            if speed > 0:
                self._write(0x01, [self.CMD[self.version][motor], 0x01, int(speed)])
            else:
                self._write(0x01, [self.CMD[self.version][motor], 0x00, -int(speed)])
        else:
            if motor is self.MOTOR_LEFT:
                self._controlMotorV2(motor, speed, 0)
            elif motor is self.MOTOR_RIGHT:
                self._controlMotorV2(motor, 0, speed)
            elif motor is self.MOTOR_BOTH:
                self._controlMotorV2(motor, speed, speed)

    def _controlMotorV2(self, motor, speedL, speedR):
        direction = 0x00
        if speedL < 0:
            direction |= 0x01
        if speedR < 0:
            direction |= 0x02
        self._write(0x10, [self.CMD['V2'][motor], math.abs(speedL), math.abs(speedR), direction])

    def runFullSpeed(self, direction = DIRECTION_ADVANCE):
        if direction is self.DIRECTION_RETREAT:
            if self.version is self.V1:
                self._write(0x08)
            else:
                self._controlMotorV2(2, -100, -100)
        else:
            if self.version is self.V1:
                self._write(0x07)
            else:
                self._controlMotorV2(2, 100, 100)

    def stopImmediately(self, motor = MOTOR_BOTH):
        if self.version is self.V1:
            self._write(0x09, [self.CMD['V1'][motor]])
        else:
            self._controlMotorV2(motor, 0, 0)

    def readSpeed(self, motor, unit = CM_PER_SEC):
        speed = 0
        cmd = [0x01 if motor is self.MOTOR_LEFT else 0x02]
        if self.version is self.V1:
            speed = self._read(0x05, 1, cmd)[0]
        else:
            speed = self._read(0xA0, 1, cmd)[0]
        if unit is self.INCH_PER_SEC:
            speed /= 2.54
        return speed

    def readPulses(self):
        result = self._read(0x16, 10)
        self.pulseCntL = (result[0] << 24) | (result[1] << 16) | (result[2] << 8) | result[3]
        self.pulseCntR = (result[4] << 24) | (result[5] << 16) | (result[6] << 8) | result[7]
        if result[8] == 1:
            self.pulseCntL = -self.pulseCntL
        if result[9] == 1:
            self.pulseCntR = -self.pulseCntR

    def readWheelPulses(self, motor):
        self.readPulses()
        if motor is self.MOTOR_LEFT:
            return self.pulseCntL
        elif motor is self.MOTOR_RIGHT:
            return self.pulseCntR

    def readAngularDistance(self, motor, unit = 'deg'):
        if self.version is self.V1:
            def distance(x):
                return int(x / 4 + 0.5)
            self.readPulses()
            if motor is self.MOTOR_LEFT:
                return distance(self.pulseCntL)
            elif motor is self.MOTOR_RIGHT:
                return distance(self.pulseCntR)
        else:
            result = self._read(0xA0, 4, [self.CMD['V2'][motor] + 3])
            return int.from_bytes(result, 'little', False)
        
    def clearWheelTurn(self, motor):
        cmd = [self.CMD[self.version][motor]]
        if self.version is self.V1:
            self._write(0x0A, cmd)
        else:
            self._write(0x50, cmd)

    def controlHeadlights(self, led, rgb):
        r, g, b = rgb
        self._write(0x0F, [led, r, g, b])
            
    def controlHeadlightsHex(self, led, color):
        self.controlHeadlights(led, color >> 16, (color >> 8) & 0xFF, color & 0xFF)

    def turnOffHeadlights(self):
        self._write(0x10, [0x03])

    def setNeopixelColor(self, led, color):
        if led is self.LED_LEFT:
            self.neopx[0] = color
        elif led is self.LED_RIGHT:
            self.neopx[1] = color
        elif led is self.LED_BOTH:
            self.neopx[0] = color
            self.neopx[1] = color
        self.neopx.show()

    def getLineTrackerStates(self):
        if self.version is self.V1:
            return self._read(0x12, 1)[0]
        else:
            return self._read(0x60, 1, [0x00])[0]
    
    def isLineTrackerState(self, states):
        return self.getLineTrackerStates() is states
    
    def getLineOffset(self, unit = 'cm'):
        if self.version is self.V1:
            offsetLow = self._read(0x14, 1, [0x00])[0]
            offsetHigh = self._read(0x14, 1, [0x01])[0]
        else:
            result = self._read(0x60, 2, [0x01])
            offsetLow = result[1]
            offsetHigh = result[0]
        measure = (offsetHigh << 8) | offsetLow
        offset = (measure - 3000) / 1000
        if unit is 'inch':
            offset /= 2.54
        return offset
    
    def isSensorTrackingLine(self, sensor):
        return self.getLineTrackerStates() & (1 << (sensor -1)) > 0

    def getGrayscaleTrackingValue(self, sensor):
        if self.version is self.V1:
            return self._read(0x11, 1, [sensor])[0]
        else:
            return self._read(0x60, 1, [0x02, sensor])[0]
    
    def readUltrasonic(self, unit = 'cm'):
        pin8.write_digital(0)
        utime.sleep_us(2)
        pin8.write_digital(1)
        utime.sleep_us(10)
        pin8.write_digital(0)
        duration = machine.time_pulse_us(pin12, 1, 30000)/1e6 # in seconds
        distance = 343 * duration/2 * 100
        if unit is 'inch':
            distance /= 2.54
        return distance
    
    def cruiseControl(self, speedL, speedR, unit = CM_PER_SEC):
        if unit is self.INCH_PER_SEC:
            speedL *= 2.54
            speedR *= 2.54

        if self.version is self.V1:
            MAX_SPEED_CM_S = 60
            def control(speed):
                dir = 0
                if speed < 0:
                    speed = -speed
                    dir = self.DIRECTION_RETREAT
                else:
                    dir = self.DIRECTION_ADVANCE
                if speed > MAX_SPEED_CM_S:
                    speed = MAX_SPEED_CM_S
                return dir, speed
            orientationL, speedL = control(speedL)
            orientationR, speedR = control(speedR)
            self._write(0x02, [orientationL, round(speedL), orientationR, round(speedR)])

        else:
            direction = 0x00
            if speedL < 0:
                direction |= 0x01
            if speedR < 0:
                direction |= 0x02
            def control (speed):
                speed = math.abs(speed * 10)
                speed = math.min(speed, 500) # max: 50 cm/s
                speed = math.max(speed, 200) # min: 20 cm/s
                return speed >> 8, speed & 0xFF
            speedL_h, speedL_l = control(speedL)
            speedR_h, speedR_l = control(speedR)
            self._write(0x80, [speedL_h, speedL_l, speedR_h, speedR_l, direction])

    def turnWithRadius(self, side, radius, speed, unit = 'cm'):
        if unit is 'inch':
            radius *= 2.54
            speed *= 2.54
        speed_offset = self.WHEELS_CENTRE_RADIUS / radius
        speed_low = speed * (1 - speed_offset)
        speed_high = speed * (1 + speed_offset)
        if side is 'to_left':
            self.cruiseControl(speed_low, speed_high)
        elif side is 'to_right':
            self.cruiseControl(speed_high, speed_low)

    def runDistance(self, direction, distance, unit = 'cm', wait = True):
        self.pwmCruiseControlMotor(self.MOTOR_BOTH, 0)
        SPEED = 15
        if unit is 'inch':
            distance *= 2.54
            SPEED /= 2.54
        if distance > 3:
            distance -= int(distance / 50) + 1
        self._write(0x03, [direction, round(distance)])
        if wait:
            utime.sleep_ms(round(distance / SPEED * 1000))
            utime.sleep_ms(800)
            
    def turnWheel(self, wheel, angle, unit = 'deg', wait = True):
        tempAngle = angle
        self.pwmCruiseControlMotor(self.MOTOR_BOTH, 0)
        if unit is 'tr':
            tempAngle *= 360
        if tempAngle < 0:
            tempAngle = -tempAngle
        self._write(0x04, [wheel, (tempAngle >> 8) & 0xff, (tempAngle >> 0) & 0xff, 0x00 if angle < 0 else 0x01])
        if wait:
            self._waitingEndOfMoving()

    def turnWithAngle(self, direction, angle, wait = True):
        tempAngle = 0
        motor = 0
        cmd = 0
        self.pwmCruiseControlMotor(self.MOTOR_BOTH, 0)
        utime.sleep_ms(100) #MakeCode setting: 1000 ?
        if angle is 45: tempAngle = 150
        elif angle is 90: tempAngle = 316
        elif angle is 135: tempAngle = 450
        elif angle is 180: tempAngle = 630
        elif angle < 180: tempAngle = 3.51 * angle
        else: tempAngle = 3.45 * angle
        if direction is self.TURN_LEFT:
            motor = self.CMD[self.version][self.MOTOR_RIGHT]
            cmd = 0x04
        elif direction is self.TURN_RIGHT:
            motor = self.CMD[self.version][self.MOTOR_LEFT]
            cmd = 0x04
        else:
            motor = self.CMD[self.version][self.MOTOR_BOTH]
            cmd = 0x17
            tempAngle += 4
        dir_at = 0x00 if direction is self.TURN_RIGHT_AT else 0x01
        self._write(cmd, [motor, (round(tempAngle) >> 8) & 0xff, (round(tempAngle) >> 0) & 0xff, dir_at])
        if wait:
            self._waitingEndOfMoving()

    def _waitingEndOfMoving(self):
        utime.sleep_ms(100) #MakeCode setting: 1000 ?
        while True:
            if self.readSpeed(self.MOTOR_LEFT) == 0 and self.readSpeed(self.MOTOR_RIGHT) == 0:
                utime.sleep_ms(100) #MakeCode setting: 1000 ?
                if self.readSpeed(self.MOTOR_LEFT) == 0 and self.readSpeed(self.MOTOR_RIGHT) == 0:
                    break

    def setSquare(self, size, unit = 'cm'):
        self.squareSize = size
        self.squareUnit = unit

    def runSquare(self, n, direction, wait = True):
        self.runDistance(direction, self.squareSize * n, self.squareUnit, wait)

    def controlServo(self, servo, angle, type = SERVO_TYPE_0_180):
        if type is self.SERVO_TYPE_0_270:
            angle = self._map(angle, 0, 270, 0, 180)
        if type is self.SERVO_TYPE_0_360:
            angle = self._map(angle, 0, 360, 0, 180)
        self._write(0x0D, [servo, round(angle)])

    def controlContinuousServo(self, servo, speed):
        speed = self._map(speed, -100, 100, 0, 180)
        self.controlServo(self.SERVO_TYPE_0_180, servo, speed)

    def controlExtendedMotor(self, speed):
        self._write(0x0B, [0x01, speed] if speed > 0 else [0x00, -speed])

    def stopExtendedMotor(self):
        self._write(0x0C, [0x02, 0xC8])
    
    def _map(self, number, in_min, in_max, out_min, out_max):
        if number > in_max:
            number = in_max
        elif number < in_min:
            number = in_min
        return out_min + ((out_max - out_min) / (in_max - in_min)) * (number -    in_min)