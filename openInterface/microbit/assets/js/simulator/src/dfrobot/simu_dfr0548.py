# Simulation of dfr0548 (DFRobot micro:Driver): servos S1-S8 and DC motors M1-M4 (steppers are not drawn).
def servo(index, degree):
    simulator_setOutput('dfr0548-servo' + str(index), max(0, min(180, int(degree))))

def motor_run(index, direction, speed):
    simulator_setOutput('dfr0548-motor' + str(index), (1 if direction > 0 else -1) * max(0, min(100, int(speed))))

def motor_stop(index):
    motor_run(index, 1, 0)

def stop_all():
    for index in range(1, 5):
        motor_stop(index)

def stepper(kind, index, direction, degree):
    pass

def stepper_dual(kind, direction1, degree1, direction2, degree2):
    pass
