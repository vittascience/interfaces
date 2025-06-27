from machine import Pin, I2C, SoftI2C, time_pulse_us
import utime
from stm32_vl53l0x import VL53L0X          # import distance sensor lib
from stm32_veml6040 import VEML6040        # import lib for color sensors
from stm32_sts3032 import *                # import motor lib
import math
#---------- VL53L0X ----------
i2c = I2C(1)                                        # I2C bus initialization
i2c = SoftI2C(scl=Pin('B13'), sda=Pin('B14'))        # I2C Pin initialization
try:
    vl53l0x = VL53L0X(i2c)                          # VL53L0X sensor initialization
    print("[SUCCESS] VL53L0X")
except:
    print("[ERROR] VL53L0X")
    
#---------- HC_SR04 ----------
trig = Pin('D5', Pin.OUT)                           # Trigger pin initialization
echo = Pin('D4', Pin.IN)                            # Echo pin initialization

#---------- VEML6040 ----------
treshold_value = 70                                 # Threshold for black line detection
TCA9548A_ADDR = 0x70                                # TCA9548A address
def TCA9548A(bus):                                  # Function to select the bus on the multiplexer
    i2c.writeto(TCA9548A_ADDR, bytearray([1 << bus]))

try:
    TCA9548A(0)                                     # Initialize color sensors by selecting the appropriate multiplexer channel
    colourSensorL = VEML6040()
    print("[SUCCESS] VEML6040 Left")
except:
    print("[ERROR] VEML6040 Left")

try:
    TCA9548A(1)
    colourSensorM = VEML6040()
    print("[SUCCESS] VEML6040 Center")
except:
    print("[ERROR] VEML6040 Center")

try:
    TCA9548A(2)
    colourSensorR = VEML6040()
    print("[SUCCESS] VEML6040 Right")
except:
    print("[ERROR] VEML6040 Right")

#---------- BOTTOM_LED ----------

led = Pin('D3', Pin.OUT)                            # Configuration du pin D3 en sortie

#---------- MOTOR ----------

motor = Sts3032("L476")

try:
    if motor.ping_single_motor(1) < 0:
        print("[ERROR] Motor 1")
    else:
        print("[SUCCESS] Motor 1")

    if motor.ping_single_motor(2) < 0:
        print("[ERROR] Motor 2")
    else:
        print("[SUCCESS] Motor 2")
except:
    print("[ERROR] Motors")

#---------- [ METHODES ] ------------------------------------------------------------------------------------------

#---------- VL53L0X ----------

def donutbot_get_distance(sensor):
    """
    Calculate and return the distance measured by the specified sensor.

    Parameters:
        sensor (str): The type of sensor to use for distance measurement. 
    """

    if sensor.lower() == "tof":
        range_cm = vl53l0x.getRangeMillimeters()/10
        utime.sleep(0.1)
        return(range_cm)
    elif sensor.lower() == "ultrasonic":
        trig.off()
        utime.sleep_us(2)
        
        # Envoi du signal de déclenchement (10 µs HIGH)
        trig.on()
        utime.sleep_us(10)
        trig.off()
        
        # Mesure la durée du signal HIGH sur Echo
        try:
            duration = time_pulse_us(echo, 1, 1000000)  # Timeout d'une seconde
        except OSError:  # Si le capteur ne répond pas
            return -1
        
        # Calcul de la distance en mm
        distance = ((duration * 0.0343) / 2) * 10

        if distance == -1:
            print("Erreur de mesure")
        else:
            return distance
    else:    
        print("[ERROR] sensor must be 'tof' or 'ultrasonic'")
        
#---------- VEML6040 ----------

def donutbot_get_color():
    """
    Returns the average color detected by the three color sensors(below the robot).
    """
    TCA9548A(0)
    data = colourSensorL.readRGB()
    red_l = data['red']
    grn_l = data['green']
    blu_l = data['blue']   
                    
    TCA9548A(1)
    data = colourSensorM.readRGB()
    red_m = data['red']
    grn_m = data['green']
    blu_m = data['blue']

    TCA9548A(2)
    data = colourSensorR.readRGB()
    red_r = data['red']
    grn_r = data['green']
    blu_r = data['blue']

    red = (red_l + red_m + red_r) / 3
    grn = (grn_l + grn_m + grn_r) / 3
    blu = (blu_l + blu_m + blu_r) / 3
    return (red, grn, blu)

def donutbot_get_color_left():
    """
    Returns the color detected by the left color sensor.
    If any color component is still 'Nan' after 2 seconds, returns (0, 0, 0).
    """
    TCA9548A(0)
    start_time = utime.ticks_ms()

    while True:
        data = colourSensorL.readRGB()
        red = data['red']
        grn = data['green']
        blu = data['blue']

        if red != 'Nan' and grn != 'Nan' and blu != 'Nan':
            return (red, grn, blu)

        if utime.ticks_diff(utime.ticks_ms(), start_time) > 2000:
            return (0, 0, 0)

def donutbot_get_color_center():
    """
    Returns the color detected by the center color sensor.
    If any color component is still 'Nan' after 2 seconds, returns (0, 0, 0).
    """
    TCA9548A(1)
    start_time = utime.ticks_ms()

    while True:
        data = colourSensorM.readRGB()
        red = data['red']
        grn = data['green']
        blu = data['blue']

        if red != 'Nan' and grn != 'Nan' and blu != 'Nan':
            return (red, grn, blu)

        if utime.ticks_diff(utime.ticks_ms(), start_time) > 2000:
            return (0, 0, 0)

def donutbot_get_color_right():
    """
    Returns the color detected by the right color sensor.
    If any color component is still 'Nan' after 2 seconds, returns (0, 0, 0).
    """
    TCA9548A(2)
    start_time = utime.ticks_ms()

    while True:
        data = colourSensorR.readRGB()
        red = data['red']
        grn = data['green']
        blu = data['blue']

        if red != 'Nan' and grn != 'Nan' and blu != 'Nan':
            return (red, grn, blu)

        if utime.ticks_diff(utime.ticks_ms(), start_time) > 2000:
            return (0, 0, 0)

def donutbot_get_color_clear():
    """
    Returns the luminosty detected by the three color sensors(below the robot).
    """

    TCA9548A(0)
    data = colourSensorL.readRGB()
    white_l = data['white']  
                    
    TCA9548A(1)
    data = colourSensorM.readRGB()
    white_m = data['white']

    TCA9548A(2)
    data = colourSensorR.readRGB()
    white_r = data['white']

    white = (white_l + white_m + white_r) / 3
    if isinstance(white, (int, float)):
        return int(white)
    else:
        return white

def donutbot_scale_rgb_to_max(r, g, b):
    max_input = max(r, g, b)
    if max_input == 0 or math.isnan(r) or math.isnan(g) or math.isnan(b): 
        return (0, 0, 0)  # Avoid division by zero
    scale = 255 / max_input
    return (
        min(int(r * scale), 255),
        min(int(g * scale), 255),
        min(int(b * scale), 255)
    )
 
def donutbot_get_color_name(r_raw, g_raw, b_raw):
    r, g, b = donutbot_scale_rgb_to_max(r_raw, g_raw, b_raw)
    # Reference colors have to set function of color use, new one can be add
    colors = {
        "white":  (209, 255, 161),
        "orange": (255, 225, 66),
        "purple": (128, 0, 128),
        "pink":   (255, 167, 140),
        "brown":  (174, 156, 67),
        "yellow": (230, 255, 67),
        "green":  (167, 255, 57),
        "blue":   (166, 255, 121),
        "red":    (255, 121, 37),
    }

    # Compare distances
    min_val = None
    best_match = "None"
    for name, (r_ref, g_ref, b_ref) in colors.items():
        diff = abs(r - r_ref) + abs(g - g_ref) + abs(b - b_ref)
        if min_val is None or diff < min_val:
            min_val = diff
            best_match = name

    if min_val > 50:
        return "None"
    return best_match

def donutbot_get_color_name_left():
    """
    Returns the color name detected by the left color sensor.
    """
    TCA9548A(0)
    data = colourSensorL.readRGB()
    red = data['red']
    grn = data['green']
    blu = data['blue']
    return donutbot_get_color_name(red, grn, blu)

def donutbot_get_color_name_center():
    """
    Returns the color name detected by the center color sensor.
    """
    TCA9548A(1)
    data = colourSensorM.readRGB()
    red = data['red']
    grn = data['green']
    blu = data['blue']
    return donutbot_get_color_name(red, grn, blu)

def donutbot_get_color_name_right():
    """
    Returns the color name detected by the right color sensor.
    """
    TCA9548A(2)
    data = colourSensorR.readRGB()
    red = data['red']
    grn = data['green']
    blu = data['blue']
    return donutbot_get_color_name(red, grn, blu)

def donutbot_get_line(side = None):
    global treshold_value
    (white_l, white_m, white_r) = (None, None, None)
    
    if side == "left" or side == "all":
        TCA9548A(0)
        data = colourSensorL.readRGB()
        white_l = data['white']
    if side == "center" or side == "all":
        TCA9548A(1)
        data = colourSensorM.readRGB()
        white_m = data['white']
    if side == "right" or side == "all":
        TCA9548A(2)
        data = colourSensorR.readRGB()
        white_r = data['white']
    
    if white_l != None and white_l < treshold_value:
        line_left = 1
    else:
        line_left = 0
    
    if white_m != None and white_m < treshold_value:
        line_center = 1
    else:
        line_center = 0
    
    if white_r != None and white_r < treshold_value:
        line_right = 1
    else:
        line_right = 0
            
    if side == "left":
        return line_left
    if side == "center":
        return line_center
    if side == "right":
        return line_right
    return (line_left, line_center, line_right)

def donutbot_set_treshold_value(value):
    """
    Set the treshold value for the color sensor.
    """
    global treshold_value
    if value == None:
        value = 50
    treshold_value = value

def donutbot_get_treshold_value():
    """
    Return the treshold value for the color sensor.
    """
    global treshold_value
    return treshold_value

#---------- BOTTOM_LED ----------

def donutbot_set_led_captor(state):
    """
    Turns the LED of the color sensors (under the robot) on or off.
    """
    if state == True:
        led.on()
    else:
        led.off()

#---------- MOTOR ----------

def donutbot_get_motor_infos(id = None):
    """
    Prints the voltage and temperature of the motors.
    """
    if id is None:
        Motor_number = 10
        motor.testPing(Motor_number) # PING TOUS LES SERVOS de l'ID 0 à 10 -> par défaut 50
        utime.sleep(0.5)

        for i in range(Motor_number):
            print("Voltage motor ID ", i, ":", motor.getVoltage(i))
            print("Temperature motor ID ", i, ":", motor.getTemperature(i))
    else:
        motor.testPing(id)
        utime.sleep(0.5)
        print("Voltage motor ID ", id, ": ", motor.getVoltage(id))
        print("Temperature motor ID ", id, ": ", motor.getTemperature(id))

def donutbot_ping_motor(id):
    print(f'motor ping: {motor.ping_single_motor(id)}')

def donutbot_move_forward(speed, acceleration = 200):
    """
    Moves the robot forward.
    """
    motor.setSpeed(1, -speed, acceleration)
    motor.setSpeed(2, speed, acceleration)

def donutbot_move_backward(speed, acceleration = 200):
    """
    Moves the robot backward.
    """
    motor.setSpeed(1, speed, acceleration)
    motor.setSpeed(2, -speed, acceleration)

def donutbot_rot_clock(speed, acceleration = 200):
    """
    Rotates the robot clockwise.
    """
    motor.setSpeed(1, -speed, acceleration)
    motor.setSpeed(2, -speed, acceleration)

def donutbot_rot_trigo(speed, acceleration = 200):
    """
    Rotates the robot counterclockwise.
    """
    motor.setSpeed(1, speed, acceleration)
    motor.setSpeed(2, speed, acceleration)

def donutbot_controlMotor(motorSide, speed, acceleration = 200):
    """
    Control one motor.
    """
    motor.setSpeed(motorSide, speed, acceleration)

def donutbot_stop(motorSide = "both"):
    """
    Stops the robot.
    """
    if (motorSide == "both"):
        motor.releaseMotor(1)
        motor.releaseMotor(2)
    else:
        motor.releaseMotor(motorSide)

def donutbot_pause(motorSide = "both"):
    """
    Pauses the robot.
    """
    if (motorSide == "both"):
        motor.setSpeed(1, 0, 0) # mettre 1000 au lieu de 0 si ça ne met pas le robot en pause
        motor.setSpeed(2, 0, 0)
    else:
        motor.setSpeed(motorSide, 0, 0)

def convertSpeed_mps(speed, max_speed, max_rpm, wheels_diameter):
  # 2π * wheels_diameter / 2 * speed_rpm / 60
  return 2*math.pi*wheels_diameter/2*1e-2*(speed/max_speed*max_rpm)/60

def donutbot_turnAngle(angle, speed = 7000):
  # speed, max_speed, max_rpm, wheels_diameter (cm)
  speed_mps = convertSpeed_mps(speed, 7000, 113, 6.2)
  # wheels_center_radius * degToRad(angle)
  angularDistance = 5.35*1e-2*angle/180*math.pi
  if (angularDistance > 0):
    donutbot_controlMotor(1, speed)
    donutbot_controlMotor(2, speed)
  else:
    donutbot_controlMotor(1, -speed)
    donutbot_controlMotor(2, -speed)
  utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000))
  donutbot_pause()

def donutbot_moveWithSquare(x, direction, speed=7000):
  # speed, max_speed, max_rpm, wheels_diameter (cm)
  speed_mps = convertSpeed_mps(speed, 7000, 113, 6.2)
  for i in range(int(x)):
    if (direction == "forward"):
      donutbot_move_forward(speed)
    else:
      donutbot_move_backward(speed)
    utime.sleep_ms(int(15e-2/speed_mps*1000))
    donutbot_pause()