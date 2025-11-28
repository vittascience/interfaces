from utime import sleep_ms

MAX_STEPS = 2048  # Nombre de pas pour 1 tour (à ajuster selon le moteur/driver)

class StepperMotor:

    STEPS = 0
    ROTATIONS = 1
    
    def __init__(self, in1, in2, in3, in4):
        self.input1 = in1
        self.input2 = in2
        self.input3 = in3
        self.input4 = in4
        self.delay_ms = 3  # Délai entre chaque pas (en ms)
        self.state = 0
    
    def setState(self, state):
        self.state = state

    def setDelay(self, delay_ms):
        self.delay_ms = delay_ms

    def steps(self, direction):
        if (self.state == 0):
            self.input1.write_digital(0)
            self.input2.write_digital(0)
            self.input3.write_digital(0)
            self.input4.write_digital(0)
        elif (self.state == 1):
            self.input1.write_digital(1)
            self.input2.write_digital(0)
            self.input3.write_digital(0)
            self.input4.write_digital(1)
        elif (self.state == 2):
            self.input1.write_digital(0)
            self.input2.write_digital(0)
            self.input3.write_digital(1)
            self.input4.write_digital(1)
        elif (self.state == 3):
            self.input1.write_digital(0)
            self.input2.write_digital(1)
            self.input3.write_digital(1)
            self.input4.write_digital(0)
        elif (self.state == 4):
            self.input1.write_digital(1)
            self.input2.write_digital(1)
            self.input3.write_digital(0)
            self.input4.write_digital(0)
        self.state += direction
        if (self.state < 1):
            self.state = 4
        elif (self.state > 4):        
            self.state = 1
    
    def moveAntiClockwise(self, steps, unit):
        if (unit == self.ROTATIONS):
            steps = steps * MAX_STEPS
        elif (unit == self.STEPS):
            steps = steps
        for _ in range(steps):
            self.steps(1)
            sleep_ms(self.delay_ms)
        self.state = 0

    def moveClockwise(self, steps, unit):
        if (unit == self.ROTATIONS):
            steps = steps * MAX_STEPS
        elif (unit == self.STEPS):
            steps = steps
        for _ in range(steps):
            self.steps(-1)
            sleep_ms(self.delay_ms)
        self.state = 0
    
    def stop(self):
        self.state = 0