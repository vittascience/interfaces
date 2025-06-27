# MIT License

# Copyright (c) 2021 Kitronik Ltd 

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import array
from machine import Pin, PWM, ADC, time_pulse_us
from rp2 import PIO, StateMachine, asm_pio
from time import sleep, sleep_ms, sleep_us, ticks_us

usedSM = [False, False, False, False, False, False, False, False]

class KitronikPicoRobotBuggy:
    button = Pin(0,Pin.IN,Pin.PULL_DOWN)
    
    def _initMotors(self):
        self.motor1Forward=PWM(Pin(20))
        self.motor1Reverse=PWM(Pin(19))
        self.motor2Forward=PWM(Pin(6))
        self.motor2Reverse=PWM(Pin(7))
        self.motor1Forward.freq(100)
        self.motor1Reverse.freq(100)
        self.motor2Forward.freq(100)
        self.motor2Reverse.freq(100)
        self.motorOff("l")
        self.motorOff("r")
        
    def motorOn(self, motor, direction, speed, jumpStart=False):
        if (speed < 0):
            speed = 0
        elif (speed>100):
            speed = 100
        
        frequency = 100
        if (speed < 15):
            frequency = 20
        elif (speed < 20):
            frequency = 50
            
        self.motor1Forward.freq(frequency)
        self.motor1Reverse.freq(frequency)
        self.motor2Forward.freq(frequency)
        self.motor2Reverse.freq(frequency)
        
        if (not jumpStart and speed > 0.1 and speed < 35):
            self.motorOn(motor, direction, 100, True)
            sleep_ms(20)

        PWMVal = int(speed*655.35)
        if motor == "l":
            if direction == "f":
                self.motor1Forward.duty_u16(PWMVal)
                self.motor1Reverse.duty_u16(0)
            elif direction == "r":
                self.motor1Forward.duty_u16(0)
                self.motor1Reverse.duty_u16(PWMVal)
            else:
                raise Exception("INVALID DIRECTION") #harsh, but at least you'll know
        elif motor == "r":
            if direction == "f":
                self.motor2Forward.duty_u16(PWMVal)
                self.motor2Reverse.duty_u16(0)
            elif direction == "r":
                self.motor2Forward.duty_u16(0)
                self.motor2Reverse.duty_u16(PWMVal)
            else:
                raise Exception("INVALID DIRECTION") #harsh, but at least you'll know
        else:
            raise Exception("INVALID MOTOR") #harsh, but at least you'll know

    def motorOff(self,motor):
        self.motorOn(motor,"f",0)

    maxServoPulse = 2500
    minServoPulse = 500
    pulseTrain = 20000
    degreesToUS = 2000/180
    piEstimate = 3.1416

    @asm_pio(sideset_init=PIO.OUT_LOW)
    def _servo_pwm():
        pull(noblock) .side(0)
        mov(x, osr) 
        mov(y, isr) 

        label("loop")
        jmp(x_not_y, "skip") 
        label("skip")
        jmp(y_dec, "loop")
             
    def registerServo(self,servo):
        if(not self.servos[servo].active()):
            self.servos[servo].active(1)

    def deregisterServo(self, servo):
        if(self.servos[servo].active()):
            self.servos[servo].active(0)

    def goToPosition(self, servo, degrees):
        pulseLength = int(degrees*self.degreesToUS + 500)
        self.goToPeriod(servo,pulseLength)
    
    def goToRadians(self, servo, radians):
        period = int((radians / self.piEstimate) * 2000) + 500
        self.goToPeriod(servo, period)
    
    def goToPeriod(self,servo, period):
        if(period < 500):
            period = 500
        if(period >2500):
            period =2500
        if self.servos[servo].active():
            self.servos[servo].put(period)
        else:
            raise Exception("TRYING TO CONTROL UNREGISTERED SERVO") #harsh, but at least you'll know
        
    def _initServos(self):
        servoPins = [21,10,17,11]
        for i in range(4):
            for j in range(8):
                if usedSM[j]:
                    continue 
                try:
                    self.servos.append(StateMachine(j, self._servo_pwm, freq=2000000, sideset_base=Pin(servoPins[i])))
                    usedSM[j] = True # Set this index to used
                    break # Have claimed the SM, can leave now
                except ValueError:
                    pass # External resouce has SM, move on
                if j == 7:
                    # Cannot find an unused SM
                    raise ValueError("Could not claim a StateMachine, all in use")
            
            self.servos[i].put(self.pulseTrain)
            self.servos[i].exec("pull()")
            self.servos[i].exec("mov(isr, osr)")
            
    @asm_pio(sideset_init=PIO.OUT_LOW, out_shiftdir=PIO.SHIFT_LEFT, autopull=True, pull_thresh=24)
    def _ZIPLEDOutput():
        T1 = 2
        T2 = 5
        T3 = 3
        wrap_target()
        label("bitloop")
        out(x, 1)               .side(0)    [T3 - 1]
        jmp(not_x, "do_zero")   .side(1)    [T1 - 1]
        jmp("bitloop")          .side(1)    [T2 - 1]
        label("do_zero")
        nop()                   .side(0)    [T2 - 1]
        wrap()
        
    #define some colour tuples for people to use.    
    BLACK = (0, 0, 0)
    RED = (255, 0, 0)
    YELLOW = (255, 150, 0)
    GREEN = (0, 255, 0)
    CYAN = (0, 255, 255)
    BLUE = (0, 0, 255)
    PURPLE = (180, 0, 255)
    WHITE = (255, 255, 255)
    COLOURS = (BLACK, RED, YELLOW, GREEN, CYAN, BLUE, PURPLE, WHITE)
    
    #sow pushes the current setup of theLEDS to the physical LEDS - it makes them visible.
    def show(self):
        brightAdjustedLEDs = array.array("I", [0 for _ in range(4)])
        for i,c in enumerate(self.theLEDs):
            r = int(((c >> 8) & 0xFF) * self.brightness)
            g = int(((c >> 16) & 0xFF) * self.brightness)
            b = int((c & 0xFF) * self.brightness)
            brightAdjustedLEDs[i] = (g<<16) + (r<<8) + b
        self.ZIPLEDs.put(brightAdjustedLEDs, 8)

    def clear(self,whichLED):
        self.setLED(whichLED,self.BLACK)
        
    #sets the colour of an individual LED. Use show to make change visible
    def setLED(self,whichLED, whichColour):
        if(whichLED<0):
            raise Exception("INVALID LED:",whichLED," specified")
        elif(whichLED>3):
            raise Exception("INVALID LED:",whichLED," specified")
        else:
            self.theLEDs[whichLED] = (whichColour[1]<<16) + (whichColour[0]<<8) + whichColour[2]
    
    #gets the stored colour of an individual LED, which isnt nessecerily the colour on show if it has been changed, but not 'show'n
    def getLED(self,whichLED):
        if(whichLED<0):
            raise Exception("INVALID LED:",whichLED," specified")
        elif(whichLED>3):
            raise Exception("INVALID LED:",whichLED," specified")
        else:
            return(((self.theLEDs[whichLED]>>8) & 0xff), ((self.theLEDs[whichLED]>>16)& 0xff) ,((self.theLEDs[whichLED])& 0xff))
    
    #takes 0-100 as a brightness value, brighness is applies in the'show' function
    def setBrightness(self, value):
            #cap to 0-100%
        if (value<0):
            value = 0
        elif (value>100):
            value=100
        self.brightness = value / 100

           
    def getDistance(self, whichSensor = "f"):
        trigger = Pin(14, Pin.OUT)
        echo = Pin(15, Pin.IN)
        if(whichSensor == "r"):
            trigger = Pin(3, Pin.OUT) #rear
            echo = Pin(2, Pin.IN)
        trigger.low()
        sleep_us(2)
        trigger.high()
        sleep_us(5)
        trigger.low()
        timePassed = time_pulse_us(echo, 1, self.maxDistanceTimeout)
        if(timePassed ==-1): #timeout - range equivalent of 5 meters - past the sensors limit or not fitted
            distance = -1
        else:
            distance = (timePassed * self.conversionFactor) / 2
        return distance
    
    # getDuration added by Vittascience

    def getDuration(self, whichSensor = "f"):
        trigger = Pin(14, Pin.OUT)
        echo = Pin(15, Pin.IN)
        if(whichSensor == "r"):
            trigger = Pin(3, Pin.OUT) #rear
            echo = Pin(2, Pin.IN)
        trigger.low()
        sleep_us(2)
        trigger.high()
        sleep_us(5)
        trigger.low()
        timePassed = time_pulse_us(echo, 1, self.maxDistanceTimeout)
        return timePassed
       
    def setMeasurementsTo(self,units):
        #0.0343 cm per microsecond or 0.0135 inches
        if(units == "inch"):
            self.conversionFactor = 0.0135 #if you ask nicely we can do imperial
        else:
            self.conversionFactor = 0.0343 #cm is default - we are in  metric world.


    def getRawLFValue(self,whichSensor):
        if(whichSensor == "c"):
            return self.CentreLF.read_u16()
        elif (whichSensor == "l"):
            return self.LeftLF.read_u16()
        elif (whichSensor == "r"):
            return self.RightLF.read_u16()
        else:
            raise Exception("INVALID SENSOR") #harsh, but at least you'll know
            return 0 #just in case
        
    def setLFDarkValue(self,darkThreshold, OptionalLeftThreshold = -1, OptionalRightThreshold = -1):
        self.centreDarkVal = darkThreshold
        if(OptionalLeftThreshold == -1):
            self.leftDarkVal = darkThreshold
        else:
            self.leftDarkVal = OptionalLeftThreshold
        if(OptionalRightThreshold == -1):
            self.rightDarkVal = darkThreshold
        else:
            self.rightDarkVal = OptionalRightThreshold
        
    def setLFLightValue(self,lightThreshold, OptionalLeftThreshold = -1, OptionalRightThreshold = -1):
        self.centreLightVal = lightThreshold
        if(OptionalLeftThreshold == -1):
            self.leftLightVal = lightThreshold
        else:
            self.leftLightVal = OptionalLeftThreshold
        if(OptionalRightThreshold == -1):
            self.rightLightVal = lightThreshold
        else:
            self.rightLightVal = OptionalRightThreshold

    def isLFSensorLight(self,whichSensor):
        if(whichSensor == "c"):
            sensorVal = self.CentreLF.read_u16()
            if(sensorVal >= self.centreDarkVal):
                return False
            elif(sensorVal < self.centreLightVal):
                return True
            else:
                raise Exception("Sensor value 'Grey'")
        elif (whichSensor == "l"):
            sensorVal = self.LeftLF.read_u16()
            if(sensorVal >= self.leftDarkVal):
                return False
            elif(sensorVal < self.leftLightVal):
                return True
            else:
                raise Exception("Sensor value 'Grey'")            
        elif (whichSensor == "r"):
            sensorVal = self.RightLF.read_u16()
            if(sensorVal >= self.rightDarkVal):
                return False
            elif(sensorVal < self.rightLightVal):
                return True
            else:
                raise Exception("Sensor value 'Grey'")
        else:
            raise Exception("INVALID SENSOR") #harsh, but at least you'll know

    def silence(self):
        self.buzzer.duty_u16(0) #silence by setting duty to 0
        
    def soundFrequency(self,frequency):
        if (frequency<0):
            frequency = 0
        elif (frequency>3000):
            frequency=3000
        self.buzzer.freq(frequency) #1khz. Find out the limits of PWM on the Pico - doesn seem to make a noise past 3080hz
        self.buzzer.duty_u16(32767) #50% duty
        
    def beepHorn(self):
        self.soundFrequency(350)
        sleep(0.3)
        self.silence()

    def __init__(self):
        self._initMotors()
        self.servos = []
        self._initServos()
        #connect the servos by default on construction - advanced uses can disconnect them if required.
        for i in range(4):
            self.registerServo(i)
            self.goToPosition(i,90) #set the servo outputs to middle of the range.
        # Create  and start the StateMachine for the ZIPLeds
        for i in range(8): # StateMachine range from 0 to 7
            if usedSM[i]:
                continue # Ignore this index if already used
            try:
                self.ZIPLEDs = StateMachine(i, self._ZIPLEDOutput, freq=8_000_000, sideset_base=Pin(18))
                usedSM[i] = True # Set this index to used
                break # Have claimed the SM, can leave now
            except ValueError:
                pass # External resouce has SM, move on
            if i == 7:
                # Cannot find an unused SM
                raise ValueError("Could not claim a StateMachine, all in use")
        
        self.theLEDs = array.array("I", [0 for _ in range(4)]) #an array for the LED colours.
        self.brightness = 0.2 #20% initially 
        self.ZIPLEDs.active(1)
        #set the measurements to metric by default.
        self.conversionFactor = 0.0343
        self.maxDistanceTimeout = int( 2 * 500 /self.conversionFactor) # 500cm is past the 400cm max range by a reasonable amount for a timeout
        self.buzzer = PWM(Pin(16))
        self.buzzer.duty_u16(0) #ensure silence by setting duty to 0
        #setup LineFollow Pins
        self.CentreLF = ADC(27)
        self.LeftLF = ADC(28)
        self.RightLF = ADC(26)

        self.centreLightVal = 30000 
        self.centreDarkVal = 35000
        self.leftLightVal = 30000 
        self.leftDarkVal = 35000
        self.rightLightVal = 30000 
        self.rightDarkVal = 35000