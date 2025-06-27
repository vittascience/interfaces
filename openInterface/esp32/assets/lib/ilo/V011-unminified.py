'''
Copyright 2023 Intuition Robotique & Technologies for ILO ROBOT device
Licensed under the Apache License, Version 2.0 (the "License");
You may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
'''

# import
print('Start lib ilo V0.11')
import utime
import machine
import math

# init
global uart
uart = machine.UART(2, baudrate = 115200, tx = machine.Pin(16), rx = machine.Pin(17))
uart.init(bits=8, parity=None, stop=2)

def send_order(command):
    uart.write(str(command))
    # print("[SEND_ORDER] ", str(command))

def correction_command(list_course):
    """
    Convert a list of 3 elements to a sendable string
    """
    if int(list_course[0]) >= 100:
        list_course[0] = str(list_course[0])
    elif 100 > int(list_course[0]) >= 10:
        list_course[0] = str('0') + str(list_course[0])
    elif 10 > int(list_course[0]) >= 1:
        list_course[0] = str('00') + str(list_course[0])
    else:
        list_course[0] = str('000')

    if int(list_course[1]) >= 100:
        list_course[1] = str(list_course[1])
    elif 100 > int(list_course[1]) >= 10:
        list_course[1] = str('0') + str(list_course[1])
    elif 10  > int(list_course[1]) >= 1:
        list_course[1] = str('00') + str(list_course[1])
    else:
        list_course[1] = str('000')

    if int(list_course[2]) >= 100:
        list_course[2] = str(list_course[2])
    elif 100 > int(list_course[2]) >= 10:
        list_course[2] = str('0') + str(list_course[2])
    elif 10  > int(list_course[2]) >= 1:
        list_course[2] = str('00') + str(list_course[2])
    else:
        list_course[2] = str('000')

    new_command = []
    str_command = str(list_course[0] + list_course[1] + list_course[2])
    new_command = "<a200v" + str_command +"pxyr>"
    return new_command

def get_data():
    """
    Get data from uart
    """
    data_list = [b'a', b'b', b'd', b'f', b'g', b'i', b'k', b'l', b'm', b'n', b'p', b'r', b's', b'x', b'y', b'0', b'1',b'2', b'3', b'4', b'5', b'6', b'7', b'8', b'9', b'-']
    global uart
    #try:
    data = uart.read(1)
    start_timing = utime.time()
    while data == None or data != b'<':
        data = uart.read(1)
        #condition = True   # add tempo mesurement after 5 secondes on sort si pas de data
        utime.sleep(0.05)
        t = utime.time()
        if t-start_timing > 10:
            print('no data received')
            data = -2
            break
    
    if data:
        # utime.sleep(1)
        if (isinstance(data, bytes)):
            if (data.decode('utf-8')) == "<":
                trame = "<"
                while True:
                    data = uart.read(1).decode('utf-8')
                    if data == ">":
                        trame = trame + ">" 
                        break
                    else:
                        trame = trame + data
                    if len(trame) > 80:
                        trame = "<>"
                        break
                # print("[GET_DATA] ",trame)
                # utime.sleep(0.3) # à rendre dynamique (a voir)
                return trame
    '''except:
        print("Error 1: get_data")
        return None'''

def extraction_value(chaine, start, end):
    #print(chaine)
    start_index = chaine.find(start)
    end_index   = chaine.find(end)
    if start_index != -1 and end_index != -1:
        return chaine[start_index + len(start):end_index]
    else:
        return -3

def classification(trame):
    """
    Classification of the data received from the uart
    """
    # print(f"[classification] {trame}")
    if trame != None:
        if trame[1:5] == 'avp0': # stop info
            return True

        elif trame[1:4] == '100': # get_color_rgb_center
            red   = int(extraction_value(trame, 'r', 'g'))
            green = int(extraction_value(trame, 'g', 'b'))
            blue  = int(extraction_value(trame, 'b', '>'))
            rgb_capteur = [red, green, blue]
            return rgb_capteur
        
        elif trame[1:4] == '101': # get_color_rgb_left
            red   = int(extraction_value(trame, 'r', 'g'))
            green = int(extraction_value(trame, 'g', 'b'))
            blue  = int(extraction_value(trame, 'b', '>'))
            rgb_capteur = [red, green, blue]
            return rgb_capteur
        
        elif trame[1:4] == '102': # get_color_rgb_right
            red   = int(extraction_value(trame, 'r', 'g'))
            green = int(extraction_value(trame, 'g', 'b'))
            blue  = int(extraction_value(trame, 'b', '>'))
            rgb_capteur = [red, green, blue]
            return rgb_capteur
        
        elif trame[1:3] == '11': # get_color_clear
            clear_left   = int(extraction_value(trame, 'l', 'm'))
            clear_center = int(extraction_value(trame, 'm', 'r'))
            clear_right  = int(extraction_value(trame, 'r', '>'))
            clear = [clear_left, clear_center, clear_right]
            return clear
        
        elif trame[1:3] == '12': # get_line
            line_left   = int(extraction_value(trame, 'l', 'm'))
            line_center = int(extraction_value(trame, 'm', 'r'))
            line_right  = int(extraction_value(trame, 'r', '>'))
            line = [line_left, line_center, line_right]
            return line
        
        elif trame[1:3] == "14": # get_line_threshold_value
            line_threshold_value = int(extraction_value(trame, 't', '>'))
            return line_threshold_value
        
        elif trame[1:3] == '20': # get_distance
            distance_front = int(extraction_value(trame, 'f', 'r'))
            distance_right = int(extraction_value(trame, 'r', 'b'))
            distance_back  = int(extraction_value(trame, 'b', 'l'))
            distance_left  = int(extraction_value(trame, 'l', '>'))
            distance = [distance_front, distance_right, distance_back, distance_left]
            return distance
        
        elif trame[1:3] == '21': # get_distance_front
            distance_front = int(extraction_value(trame, 'f', '>'))
            return distance_front
        
        elif trame[1:3] == '22': # get_distance_right
            distance_right = int(extraction_value(trame, 'r', '>'))
            return distance_right
        
        elif trame[1:3] == '23': # get_distance_back
            distance_back = int(extraction_value(trame, 'b', '>'))
            return distance_back
        
        elif trame[1:3] == '24': # get_distance_left
            distance_left = int(extraction_value(trame, 'l', '>'))
            return distance_left
        
        elif trame[1:3] == '30': # get_angle
            roll  = float(extraction_value(trame, 'r', 'p'))
            pitch = float(extraction_value(trame, 'p', 'y'))
            yaw   = float(extraction_value(trame, 'y', '>'))
            angle = [roll, pitch, yaw]
            return angle
        
        elif trame[1:3] == '32': # get_raw_imu
            accX   = float(extraction_value(trame,'x', 'y'))
            accY   = float(extraction_value(trame,'y', 'z'))
            accZ   = float(extraction_value(trame,'z', 'r'))
            gyroX  = float(extraction_value(trame,'r', 'p'))
            gyroY  = float(extraction_value(trame,'p', 'g'))
            gyroZ  = float(extraction_value(trame,'g', '>'))
            imu = [accX, accY, accZ, gyroX, gyroY, gyroZ]
            return imu
        
        elif trame[1:3] == '40': # get_battery
            status      = int(extraction_value(trame, 's', 'p'))
            pourcentage = int(extraction_value(trame, 'p', '>'))
            battery     = [status, pourcentage]
            return battery
        
        elif trame[1:3] == '50': # get_led_color
            r  = int(extraction_value(trame, 'r', 'g'))
            g  = int(extraction_value(trame, 'g', 'b'))
            b  = int(extraction_value(trame, 'b', '>'))
            color = [r, g, b]
            return color
        
        elif trame[1:4] == '60i': #ping_single_motor
            id_motor = int(extraction_value(trame, 'i', 's'))
            status   = int(extraction_value(trame, 's', '>'))
            return id_motor, status

        elif trame[1:4] == '611': #get_single_motor_speed
            id_motor = int(extraction_value(trame, 'i', 's'))
            status   = int(extraction_value(trame, 's', '>'))
            return id_motor, status
        
        elif trame[1:4] == '621': #get_single_motor_angle
            id_motor = int(extraction_value(trame, 'i', 's'))
            angle    = int(extraction_value(trame, 's', '>'))
            return id_motor, angle
        
        elif trame[1:3] == '63': #get_temp_single_motor
            id_motor = int(extraction_value(trame, 'i', 's'))
            temp     = int(extraction_value(trame, 's', '>'))
            return id_motor, temp
        
        elif trame[1:3] == '64': #get_volt_single_motor
            id_motor = int(extraction_value(trame, 'i', 's'))
            volt     = int(extraction_value(trame, 's', '>'))
            return id_motor, volt
        
        elif trame[1:3] == '65': #get_torque_single_motor
            id_motor = int(extraction_value(trame, 'i', 's'))
            torque   = int(extraction_value(trame, 's', '>'))
            return id_motor, torque
        
        elif trame[1:3] == '66': #get_current_single_motor
            id_motor = int(extraction_value(trame, 'i', 's'))
            current  = int(extraction_value(trame, 's', '>'))
            return id_motor, current
        
        elif trame[1:3] == '67': #get_motor_is_moving
            id_motor = int(extraction_value(trame, 'i', 's'))
            status   = int(extraction_value(trame, 's', '>'))
            return id_motor, status

        elif trame[1:4] == '681': # get_acc_motor
            acc  = int(extraction_value(trame, 'a', '>'))
            return acc
        
        elif trame[1:4] == '691': #get_tempo_pos
            tempo_pos = int(extraction_value(trame, 't', '>'))
            return tempo_pos

        elif trame[1:3] == "71": # get_pid
            kp = float(extraction_value(trame, 'p', 'i'))
            ki = float(extraction_value(trame, 'i', 'd'))
            kd = float(extraction_value(trame, 'd', '>'))
            return kp, ki, kd
        
        elif trame[1:3] == "92": # get_wifi_credentials
            ssid     = str(extraction_value(trame,'s', 'p'))
            password = str(extraction_value(trame,'p', '>'))
            return ssid, password
        
        elif trame [1:3] == "93": # get_name
            name = str(extraction_value(trame, 'n', '>'))
            return name

        else:
            print('[COMMUNICATION ERROR] data classification')
            return None
        
def vider_uart():
    """
    Empty the uart buffer
    """
    while uart.any():
        uart.read()
#-----------------------------------------------------------------------------
def stop():
    """
    Stop ilo and free its engines
    """
    send_order('<>')

def pause():
    """
    Stop ilo and block its motors
    """
    send_order(direct_control(128,128,128))

def step(direction, step=None, finish_state=None):
    """
    Move ilo in the selected direction for 2 seconds

    Parameters:
        direction (str): The direction in which the robot is moving
        step (int, optional): The number of steps the robot will do
        finish_state (bool, optional): If True, return when the displacement is finished

    Raises:
        TypeError: If the direction is not a string
        ValueError: If the direction is not one of the following: front, back, left, right, rot_trigo or rot_clock
        TypeError: If the step is not an integer or a float
        ValueError: If value is not between 0.1 and 100
        TypeError: If finish_state is not a boolean

    Examples:
        ilo_micro.step("front", 10)
        ilo_micro.step("rot_trigo", 1, True)
    """
    if not isinstance(direction, str):
        print ("[ERROR] 'direction' should be a string")
        return None

    if isinstance(step, bool):
            finish_state = step
            step = None 
    
    if (direction == 'front' or direction == 'back' or direction == 'left' or direction == 'right'):

        if step is None:
            step = 1

        if not isinstance(step, (int, float)):
            print ("[ERROR] 'step' should be an integer or a float")
            return None
        
        if step > 100 or step < 0.1:
            print ("[ERROR] 'step' should be between 0.1 and 100 for translation")
            return None

        step = int(step*100)

    elif (direction == 'rot_trigo' or direction == 'rot_clock'):
        if step is None:
            step = 90

        if not isinstance(step, (int, float)):
            print ("[ERROR] 'step' should be an integer or a float")
            return None
        
        if step < 1:
            print ("[ERROR] 'step' should be more than 1 for rotation")
            return None

    else:
        print("[ERROR] 'step' unknow name ")

    if finish_state != None:

        if not isinstance(finish_state, bool):
            print ("[ERROR] 'finish_state' should be a boolean")
            return None

    if direction == 'front':
        command = '<a60vpx1' + str(step) + 'yr>'
        send_order(command)
    elif direction == 'back':
        command = '<a60vpx0' + str(step) + 'yr>'
        send_order(command)
    elif direction == 'left':
        command = '<a60vpxy0' + str(step) + 'r>'
        send_order(command)
    elif direction == 'right':
        command = '<a60vpxy1' + str(step) + 'r>'
        send_order(command)
    elif direction == 'rot_trigo':
        command = '<a60vpxyr0' + str(step) + '>'
        send_order(command)
    elif direction == 'rot_clock':
        command = '<a60vpxyr1' + str(step) + '>'
        send_order(command)
    else:
        print("[ERROR] 'Direction' should be 'front', 'back', 'left', 'rot_trigo', 'rot_clock'")

    if finish_state == True:
        return classification(get_data())
    else:
        print("[ERROR] End moving data to well received")
  
def flat_movement(angle, distance, finish_state=None):
    """
    Move ilo in a with a direction in angle

    Parameters:
        angle (int): The direction in which the robot is moving
        distance (int): The distance the robot will travel

    Raises:
        TypeError: If angle is not an integer
        ValueError: If angle is not between 0 and 360
        TypeError: If distance is not an integer

    Examples:
        ilo_micro.flat_movement(90, 10)
    """

    if not isinstance(angle, int):
        print ("[ERROR] 'angle' should be an integer")
        return None
    
    if angle > 360 or angle < 0:
        print ("[ERROR] 'angle' should be between 0 and 360")
        return None
    
    if not isinstance(distance, int):
        print ("[ERROR] 'distance' should be an integer")
        return None
    
    if finish_state != None:
        if not isinstance(finish_state, bool):
            print ("[ERROR] 'finish_state' should be a boolean")
            return None

    if 0 <= angle < 90:  
        indice_x = 1 
        indice_y = 1 
    elif 90 <= angle < 180:  
        indice_x = 0 
        indice_y = 1 
    elif 180 <= angle < 270:  
        indice_x = 0 
        indice_y = 0 
    elif 270 <= angle <= 360:  
        indice_x = 1 
        indice_y = 0 
    else: 
        print("Angle should be between 0 to 360 degrees") 
        return 
 
    radian = angle * math.pi / 180 
    distance_x = abs(int(math.cos(radian) * distance)) 
    distance_y = abs(int(math.sin(radian) * distance)) 
    command = ("<avpx" + str(indice_x) + str(distance_x) + "y" + str(indice_y) + str(distance_y) + "r>")
    send_order(command)

    if finish_state == True:
        return classification(get_data())
    else:
        print("[ERROR] End moving data to well received")

def move(direction, speed):
    """
    Move ilo with selected direction and speed

    Parameters:
        direction (str): The direction in which the robot is moving
        speed (int): The speed of the robot, as a percentage

    Raises:
        TypeError: If the direction is not a string
        ValueError: If the direction is not one of the following: front, back, left, right, rot_trigo, rot_clock or stop
        TypeError: If the speed is not an integer
        ValueError: If the speed is not between 0 and 100

    Examples:
        ilo_micro.move("front", 50)
    """

    if not isinstance(direction, str):
        print ("[ERROR] 'direction' parameter must be a string")
        return None
    if not isinstance(speed, int):
        print ("[ERROR] 'speed' parameter must be a integer")
        return None     
    if speed> 100 or speed<0:
        print ("[ERROR] 'speed' parameter must be include between 0 and 100")
        return None

    if direction == 'front':
        command = [int((speed*1.28)+128),128,128]
    elif direction == 'back':
        command = [int(-(speed*1.28))+128,128,128]
    elif direction == 'left':
        command = [128,int(-(speed*1.28)+128),128]
    elif direction == 'right':
        command = [128,int((speed*1.28)+128),128]
    elif direction == 'rot_trigo':
        command = [128,128,int(-(speed*1.28)+128)]
    elif direction == 'rot_clock':
        command = [128,128,int((speed*1.28)+128)]
    else:
        print("[ERROR] 'direction' parameter should be 'front', 'back', 'left', 'rot_trigo', 'rot_clock', 'stop'")
        return None

    corrected_command = correction_command(command)
    send_order(corrected_command)
    utime.sleep(0.1)

def direct_control(axial, radial, rotation):
    """
    Control ilo with full control \n
    Value from 0 to 128 are negative and value from 128 to 255 are positive

    Parameters:
        axial (int): [...]
        radial (int): [...]
        rotation (int): [...]

    Raises:
        TypeError: If axial is not an integer
        ValueError: If axial is not between 0 and 255
        TypeError: If radial is not an integer
        ValueError: If radial is not between 0 and 255
        TypeError: If rotation is not an integer
        ValueError: If rotation is not between 0 and 255

    Examples:
        ilo_micro.direct_control(150, 150, 150)
    """


    if not isinstance(axial, int):
        print ("[ERROR] 'axial' parameter must be a integer")
        return None
    if axial> 255 or axial<0:
        print ("[ERROR] 'axial' parameter must be include between 0 and 255")
        return None
    if not isinstance(radial, int):
        print ("[ERROR] 'radial' parameter must be a integer")
        return None
    if radial> 255 or radial<0:
        print ("[ERROR] 'radial' parameter must be include between 0 and 255")
        return None
    if not isinstance(rotation, int):
        print ("[ERROR] 'rotation' parameter must be a integer")
        return None
    if rotation> 255 or rotation<0:
        print ("[ERROR] 'rotation' parameter must be include between 0 and 255")
        return None

    command = [axial, radial, rotation]
    corrected_command = correction_command(command)
    send_order(corrected_command)
    utime.sleep(0.1)

def set_tempo_pos(value: int):
    """
        Set the tempo of the position control

        Parameters:
            value (int): new tempo value

        Raises:
            TypeError: If value is not an integer

        Examples:
            my_ilo.set_tempo_pos(50)
        """
    
    if not isinstance(value, int):
        print("[ERROR] 'value' parameter must be a integer")
        return None
    
    msg = "<690t"+str(value)+">"
    send_order(msg)

def get_tempo_pos():
    """
    Get the tempo of the position control
    """
    vider_uart()
    send_order("<691>")
    return classification(get_data())

def rotation(angle, finish_state=None):
    """
    Rotate ilo in a direction

    Parameters:
        angle (int): The rotation angle

    Raises:
        TypeError: If 'angle' is not an integer or a float

    Examples:
        ilo_micro.rotation(90)
        ilo_micro.rotation(-50.3)
    """

    if not isinstance(angle, (int, float)):
        print ("[ERROR] 'angle' should be an integer")
        return None
    
    if angle > 0:
        indice = 1
    else : 
        indice = 0
 
    if finish_state != None:
        if not isinstance(finish_state, bool):
            print ("[ERROR] 'finish_state' should be a boolean")
            return None

    command = ("<avpxyr" + str(indice) + str(abs(angle)) + ">")
    send_order(command)

    if finish_state == True:
        return classification(get_data())
    else:
        print("[ERROR] End moving data to well received")

def set_pid(kp, ki, kd):
    """
    Set the new value of the proportional gain, the integral gain and the derivative gain

    Parameters:
        p (int): new value of the proportional gain
        i (int): new value of the integral gain
        d (int): new value of the derivative gain

    Raises:
        TypeError: If 'p' is not an integer or a float
        ValueError: If 'p' is not between 0.1 and 10
        TypeError: If 'i' is not an integer or a float
        ValueError: If 'i' is not between 0.1 and 10
        TypeError: If 'd' is not an integer or a float
        ValueError: If 'd' is not between 0.1 and 10

    Examples:
        my_ilo.set_pid(5, 5, 5)
    """

    if not isinstance(kp, (int, float)):
        print ("[ERROR] 'kp' parameter must be a integer or a float")
        return None
    if kp>10 or kp<0:
        print ("[ERROR] 'kp' parameter must be include between 0 and 10")
        return None

    if not isinstance(ki, (int, float)):
        print ("[ERROR] 'ki' parameter must be a integer or a float")
        return None
    if ki>10 or ki<0:
        print ("[ERROR] 'ki' parameter must be include between 0 and 10")
        return None

    if not isinstance(kd, (int, float)):
        print ("[ERROR] 'kd' parameter must be a integer or a float")
        return None
    if kd>10 or kd<0:
        print ("[ERROR] 'kd' parameter must be include between 0 and 10")
        return None
    
    kp = int(kp *10)
    ki = int(ki *10)
    kd = int(kd *10)

    msg = "<70p"+str(kp)+"i"+ str(ki) + "d" + str(kd) + ">"
    send_order(msg)

def get_pid():
    """
    Get the value of the proportional gain
    """
    vider_uart()
    send_order("<71>")
    return classification(get_data())
#-----------------------------------------------------------------------------
def get_color_rgb_center():
    """
    Displays the color below ilo enter color sensor
    """
    vider_uart()
    send_order("<100>")
    return classification(get_data())

def get_color_rgb_left():
    """
    Displays the color below ilo left color sensor
    """
    vider_uart()
    send_order("<101>")
    return classification(get_data())

def get_color_rgb_right():
    """
    Displays the color below ilo right color sensor
    """
    vider_uart()
    send_order("<102>")
    return classification(get_data())

def set_led_captor(state):
    """
    lights up the leds under ilo

    Parameters:
        state (bool): allows you to turn on or off the leds

    Raises:
        TypeError: If state is not a bool

    Examples:
        ilo_micro.set_led_captor(True)
    """

    if not isinstance(state, bool):
        print ("[ERROR] 'state' parameter must be a bool")
        return None

    if   (state == True) :
        msg = "<54l1>"
    elif (state == False):
        msg = "<54l0>"
    send_order(msg)
#-----------------------------------------------------------------------------
def get_color_clear():
    """
    Displays the brightness below ilo
    """
    vider_uart()
    send_order("<11>")
    return classification(get_data())

def get_color_clear_left():
    """
    Displays the brightness below ilo only with left sensor
    """
    return get_color_clear()[0]

def get_color_clear_center():
    """
    Displays the brightness below ilo only with central sensor
    """
    return get_color_clear()[1]

def get_color_clear_right():
    """
    Displays the brightness below ilo only with right sensor
    """
    return get_color_clear()[2]
#-----------------------------------------------------------------------------
def get_line():
    """
    Detects whether ilo is on a line or not
    """
    vider_uart()
    send_order("<12>")
    return classification(get_data())

def get_line_left():
    """
    Detects whether ilo is on a line or not according to the left sensor
    """
    return (get_line()[0])

def get_line_center():
    """
    Detects whether ilo is on a line or not according to the central sensor
    """
    return (get_line()[1])

def get_line_right():
    """
    Detects whether ilo is on a line or not according to the right sensor
    """
    return (get_line()[2])

def set_line_threshold_value(value):
    """
    Set the new threshold value for the line detection

    Parameters:
        value (int): new threshold value

    Raises:
        TypeError: If value is not an integer

    Examples:
        ilo_micro.set_line_treshold_value(40)
    """

    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None

    msg = "<13t" + str(value) + ">"
    send_order(msg)

def get_line_threshold_value():
    """
    Displays the threshold value for the line detection
    """
    vider_uart()
    send_order("<14>")
    return classification(get_data())
#-----------------------------------------------------------------------------
def get_distance():
    """
    Get the distance around ilo
    """
    vider_uart()
    send_order("<20>")
    return classification(get_data())

def get_distance_front():
    """
    Get the distance in front of ilo
    """
    vider_uart()
    send_order("<21>")
    return classification(get_data())

def get_distance_right():
    """
    Get the distance on the right of ilo
    """
    vider_uart()
    send_order("<22>")
    return classification(get_data())

def get_distance_back():
    """
    Get the distance behind ilo
    """
    vider_uart()
    send_order("<23>")
    return classification(get_data())

def get_distance_left():
    """
    Get the distance on the left of ilo
    """
    vider_uart()
    send_order("<24>")
    return classification(get_data())
#-----------------------------------------------------------------------------
def get_angle():
    """
    Get the angle of ilo
    """
    vider_uart()
    send_order("<30>")
    return classification(get_data())

def get_roll():
    """
    Get the roll angle of ilo
    """
    return get_angle()[0]

def get_pitch():
    """
    Get the pitch angle of ilo
    """
    return get_angle()[1]

def get_yaw():
    """
    Get the yaw angle of ilo
    """
    return get_angle()[2]

def reset_angle():
    """
    Reset the angle of ilo
    """
    send_order("<31>")

def get_raw_imu():
    """
    Get IMU raw data
    """
    vider_uart()
    send_order("<32>")
    return classification(get_data())
#-----------------------------------------------------------------------------
def get_battery():
    """
    Get battery status (charged or not) and percentage
    """
    vider_uart()
    send_order("<40>")
    return classification(get_data())
#-----------------------------------------------------------------------------  
def get_led_color():
    """
    Get ilo LEDS color
    """
    vider_uart()
    send_order("<50>")
    return classification(get_data())

def set_led_color(red, green, blue):
    """
    Set the ilo LEDS color

    Parameters:
        red (int): the red value of the color
        green (int): the green value of the color
        blue (int): the blue value of the color

    Raises:
        TypeError: If red is not an integer
        ValueError: If red is not between 0 and 255
        TypeError: If green is not an integer
        ValueError: If green is not between 0 and 255
        TypeError: If blue is not an integer
        ValueError: If blue is not between 0 and 255

    Examples:
        ilo_micro.set_led_color(128, 0, 128)
    """

    if not isinstance(red, int):
        print ("[ERROR] 'red' parameter must be a integer")
        return None
    if red>255 or red<0:
        print ("[ERROR] 'red' parameter must be include between 0 and 255")
        return None
    if not isinstance(green, int):
        print ("[ERROR] 'green' parameter must be a integer")
        return None
    if green> 255 or green<0:
        print ("[ERROR] 'green' parameter must be include between 0 and 255")
        return None
    if not isinstance(blue, int):
        print ("[ERROR] 'blue' parameter must be a integer")
        return None
    if blue> 255 or blue<0:
        print ("[ERROR] 'blue' parameter must be include between 0 and 255")
        return None

    msg = "<51r" + str(red) + "g" + str(green) + "b" + str(blue) + ">"
    send_order(msg)

# led_shape(static)

# if (value == "front")            { fleche front}
# if (value == "back")             { fleche back}
# if (value == "right")            { fleche right}
# if (value == "left")             { fleche left}
# if (value == "rot_clock")        { fleche rot_clock}
# if (value == "rot_trigo")        { fleche rot_trigo}
# if (value == "stop")             { fleche stop}
# if (value == "play")             { boutton play}
# if (value == "pause")            { boutton pause}
# if (value == "smiley")           { smiley}
# if (value == "10")               { number 0}
# if (value == "11")               { number 1}
# if (value == "12")               { number 2}
# if (value == "13")               { number 3}
# if (value == "14")               { number 4}
# if (value == "15")               { number 5}
# if (value == "16")               { number 6}
# if (value == "17")               { number 7}
# if (value == "18")               { number 8}
# if (value == "19")               { number 9}
# if (value == "ring_1")           { ring_1 (ring exterieur)}
# if (value == "ring_2")           { ring_2}
# if (value == "ring_3")           { ring_3}
# if (value == "ring_4")           { ring_4}
# if (value == "ring_5")           { ring_5 (ring le plus interieur)}
# if (value == "validation_check") { validation_check}
# if (value == "battery")          { battery}
# if (value == "wifi")             { Wifi logo}
# if (value == "a")                { Letter a }
# if (value == "b")                { Letter b }
# if (value == "c")                { Letter c }
# if (value == "d")                { Letter d }
# if (value == "e")                { Letter e }
# if (value == "f")                { Letter f }
# if (value == "g")                { Letter g }
# if (value == "h")                { Letter h }
# if (value == "i")                { Letter i }
# if (value == "j")                { Letter j }
# if (value == "k")                { Letter k }
# if (value == "l")                { Letter l }
# if (value == "m")                { Letter m }
# if (value == "n")                { Letter n }
# if (value == "o")                { Letter o }
# if (value == "p")                { Letter p }
# if (value == "q")                { Letter q }
# if (value == "r")                { Letter r }
# if (value == "s")                { Letter s }
# if (value == "t")                { Letter t }
# if (value == "u")                { Letter u }
# if (value == "v")                { Letter v }
# if (value == "w")                { Letter w }
# if (value == "x")                { Letter x }
# if (value == "y")                { Letter y }
# if (value == "z")                { Letter z }
# if (value == "clear_center")     { led_center_off}
# if (value == "clear_circle")     { led_circle_off}

def set_led_shape(value):
    """
    Show designs on LEDS

    Parameters:
        value (str): the shape of the leds

    Raises:
        TypeError: If value is not a string

    Examples:
        ilo_micro.set_led_shape("smiley")
    """

    if not isinstance(value, str):
        print ("[ERROR] 'value' parameter must be a string")
        return None

    msg = "<52v"+str(value)+">"
    send_order(msg)

# led_anim()

# if (value == "wave")          {wave} 
# if (value == "circle_stars")  {circle_stars}
# if (value == "auto_distance") {auto_distance}
# if (value == "circle_rot")    {circle_rot}
# if (value == "check_auto")    {check_auto}

def set_led_anim(value):
    """
    Starting an animation with LEDs

    Parameters:
        value (str): led animation name

    Raises:
        TypeError: If value is not a string

    Examples:
        ilo_micro.set_led_anim("wave")
    """

    if not isinstance(value, str):
        print ("[ERROR] 'value' parameter must be a string")
        return None

    msg = "<53"+str(value)+">"
    send_order(msg)

def set_led_single(type,id,red,green,blue):
    """
    Lights up an individual led in the led matrix

    Parameters:
        type (str): allows you to choose whether to light a led on the circle or on the center
        id (int): led number
        red (int): red value of the color
        green (int): green value of the color
        blue (int): blue value of the color

    Raises:
        TypeError: If type is not a string
        ValueError: If type is not "center" or "circle"
        TypeError: If id is not an integer
        TypeError: If red is not an integer
        ValueError: If red is not between 0 and 255
        TypeError: If green is not an integer
        ValueError: If green is not between 0 and 255
        TypeError: If blue is not an integer
        ValueError: If blue is not between 0 and 255

    Examples:
        ilo_micro.set_led_single("center", 15, 255, 255, 255)
    """

    if not isinstance(type, str):
        print ("[ERROR] 'type' parameter must be a string")
        return None
    if type != "center" and type != "circle":
        print ("[ERROR] 'type' parameter must be 'center' or 'circle'")
        return None
    
    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    
    if not isinstance(red, int):
        print ("[ERROR] 'red' parameter must be a integer")
        return None
    if red> 255 or red<0:
        print ("[ERROR] 'red' parameter must be include between 0 and 255")
        return None
    
    if not isinstance(green, int):
        print ("[ERROR] 'green' parameter must be a integer")
        return None
    if green> 255 or green<0:
        print ("[ERROR] 'green' parameter must be include between 0 and 255")
        return None
    
    if not isinstance(blue, int):
        print ("[ERROR] 'blue' parameter must be a integer")
        return None
    if blue> 255 or blue<0:
        print ("[ERROR] 'blue' parameter must be include between 0 and 255")
        return None
    
    if type == "center":
        type = "1"
    if type == "circle":
        type = "0"

    msg = "<55t"+str(type) + "d" + str(id) + "r" + str(red) + "g" + str(green) + "b" + str(blue) + ">"
    send_order(msg)

def set_led_word(type: str, word: str, delay=None):
    """
    Show your word with the robot leds.

    Parameters:
        type (str): allows you to choose whether to display your word letter by letter or with the letters sliding in a continuous flow.
        word (str): the word you want to display.
        delay (int): not required, allows you to choose the delay for the appearance or slide of your word (in milliseconds)

    Raises:
        TypeError: If type is not a string
        ValueError: If type is not "reveal" or "slide"
        TypeError: If word is not a string

    Examples:
        my_ilo.set_led_word("reveal", "Hello")
        my_ilo.set_led_word("slide", "robot", 300)
    """

    if not isinstance(type, str):
        print("[ERROR] 'type' parameter must be a string")
        return None
    if type != "reveal" and type != "slide":
        print("[ERROR] 'type' parameter must be reveal or slide")
        return None
    if not isinstance(word, str):
        print("[ERROR] 'word' parameter must be a string")
        return None
    
    if len(word) > 10:
        print("[ERROR] 'word' parameter must not exceed 10 characters")
        return None

    if type == "reveal" and delay == None:
        delay = 1000
    if type == "slide" and delay == None:
        delay = 300

    if not isinstance(delay, int):
        print("[ERROR] 'delay' parameter must be a integer")
        return None

    if delay > 2000 or delay < 10:
        print("[ERROR] 'delay' parameter must be include between 10 and 2000")
        return None

    if type == "reveal":
        msg = "<56w"+str(word.upper())+"d"+ str(delay)+">"
    else:
        msg = "<57w"+str(word.upper())+"d"+ str(delay)+">"
    send_order(msg)

def stop_led_word(self):
    """
    Stop the led word
    """
    send_order("<58>")
#-----------------------------------------------------------------------------
def get_acc_motor():
    """
    Get the acceleration of all motors
    """
    vider_uart()
    send_order("<681>")
    return classification(get_data())
    
def set_acc_motor(value):
    """
    Set the acceleration of all motors

    Parameters:
        value (int): the acceleration value

    Raises:
        TypeError: If value is not an integer
        ValueError: If value is not between 10 and 100

    Examples:
        ilo_micro.set_acc_motor(67)
    """

    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None
    if value> 100 or value<10:
        print ("[ERROR] 'value' parameter must be include between 10 and 100")
        return None

    if value < 10 : value = 10
    elif value > 100 : value = 100
    msg = "<680a" + str(value) + ">"
    send_order(msg)
#-----------------------------------------------------------------------------
# <60i1s1>
def ping_single_motor(id: int):
    """
    Ping a single motor with is id

    Parameters:
        id (int): motor id

    Raises:
        TypeError: If id is not an integer
        ValueError: If id is not between 0 and 255

    Examples:
        ilo_micro.ping_single_motor(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<60i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <610i1v3000>
def drive_single_motor_speed(id: int, acc:int, value: int):
    """
    Drive a single motor in speed with is id

    Parameters:
        id (int): the motor id
        acc (int): the motor acceleration
        value (int): the motor speed in percentage

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200
        TypeError: If 'value' is not an integer
        ValueError: If 'value' is not between -100 and 100

    Examples:
        ilo_micro.drive_single_motor_speed(1, 100, 50)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None
    
    if not isinstance(acc, int):
        print ("[ERROR] 'acc' parameter must be a integer")
        return None
    if acc > 200 or acc < 0:
        print ("[ERROR] 'acc' parameter must be include between 0 and 200")
        return None
    
    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None
    if value> 100 or value<-100:
        print ("[ERROR] 'value' parameter must be include between -100 and 100")
        return None
    
    if id == 2 or id == 3:
        value = -value

    value = value * 70
    msg = "<610i"+str(id)+"a"+str(acc)+"v"+str(-value)+">"
    send_order(msg)

def drive_single_motor_speed_front_left(acc:int, value: int):  # de -100 à 100
    """
    Control the front left motor

    Parameters:
        acc (int): the motor acceleration
        value (int): the motor speed in percentage

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200
        TypeError: If 'value' is not an integer
        ValueError: If 'value' is not between -100 and 100

    Examples:
        ilo_micro.drive_single_motor_speed_front_left(100, 50)
    """
    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None
    
    drive_single_motor_speed(1,acc, value)

def drive_single_motor_speed_front_right(acc:int, value: int):
    """
    Control the front right motor

    Parameters:
        acc (int): the motor acceleration
        value (int): the motor speed in percentage

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200
        TypeError: If 'value' is not an integer
        ValueError: If 'value' is not between -100 and 100

    Examples:
        ilo_micro.drive_single_motor_speed_front_right(100, 50)
    """
    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None

    drive_single_motor_speed(2,acc, value)

def drive_single_motor_speed_back_left(acc:int, value: int):
    """
    Control the back left motor

    Parameters:
        acc (int): the motor acceleration
        value (int): the motor speed in percentage

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200
        TypeError: If 'value' is not an integer
        ValueError: If 'value' is not between -100 and 100

    Examples:
        ilo_micro.drive_single_motor_speed_back_left(100, 50)
    """

    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None
    
    drive_single_motor_speed(4, acc, value)

def drive_single_motor_speed_back_right(acc:int, value: int):
    """
    Control the back right motor

    Parameters:
        acc (int): the motor acceleration
        value (int): the motor speed in percentage


    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200
        TypeError: If 'value' is not an integer
        ValueError: If 'value' is not between -100 and 100

    Examples:
        ilo_micro.drive_single_motor_speed_back_right(100, 50)
    """

    if not isinstance(value, int):
        print ("[ERROR] 'value' parameter must be a integer")
        return None

    drive_single_motor_speed(3, acc, value)
#<611i1s3000>
def get_single_motor_speed(id: int):
    """
    Get the speed of single motor with is id

    Parameters:
        id (int): the motor whose speed you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_single_motor_speed(3)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None
    
    msg = "<611i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <620i6a90>
def drive_single_motor_angle(id: int, angle: int, vel:int, acc:int):
    """
    Drive a single motor in position with is id (work only with accessory motor)

    Parameters:
        id (int): the motor id
        angle (int): the motor angle

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255
        TypeError: If 'angle' is not an integer
        ValueError: If 'angle' is not between 0 and 4096
        TypeError: If 'vel' is not an integer
        ValueError: If 'vel' is not between -7000 and 7000
        TypeError: If 'acc' is not an integer
        ValueError: If 'acc' is not between 0 and 200

    Examples:
        ilo_micro.drive_single_motor_angle(1, 90)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None
    
    if not isinstance(angle, int):
        print ("[ERROR] 'angle' parameter must be a integer")
        return None
    if angle>4096 or angle<0:
        print ("[ERROR] 'angle' parameter must be include between 0 and 4096")
        return None
    
    if not isinstance(vel, int):
        print ("[ERROR] 'vel' parameter must be a integer")
        return None
    if vel>7000 or vel<-7000:
        print ("[ERROR] 'vel' parameter must be include between -7000 and 7000")
        return None
    
    if not isinstance(acc, int):
        print ("[ERROR] 'acc' parameter must be a integer")
        return None
    if acc>200 or acc<0:
        print ("[ERROR] 'acc' parameter must be include between 0 and 200")
        return None

    if id < 0 : id = 0
    elif id > 255 : id = 255
    if angle < 0 : angle = 0
    elif angle > 4096 : angle = 4096
    msg = "<620i"+str(id)+"a"+str(angle)+"v"+str(vel)+"p"+str(acc)+">"
    send_order(msg)
# <621i6a90>
def get_single_motor_angle(id: int):
    """
    Get the angle of a single motor with is id

    Parameters:
        id (int): the motor whose angle you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_single_motor_angle(2)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None 
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<621i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <63i1t45>
def get_temp_single_motor(id: int):
    """
    Get the temperature of a single motor with is id

    Parameters:
        id (int): the motor whose temperature you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_temp_single_motor(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<63i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <64i1v6.7>
def get_volt_single_motor(id: int):
    """
    Get the voltage of a single motor with is id

    Parameters:
        id (int): the motor whose voltage you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_volt_single_motor(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<64i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <65i1t20>
def get_torque_single_motor(id: int):
    """
    Get the torque of a single motor with is id

    Parameters:
        id (int): the motor whose torque you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_torque_single_motor(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<65i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <66i1c20>
def get_current_single_motor(id: int):
    """
    Get the current of a single motor with is id

    Parameters:
        id (int): the motor whose current you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_current_single_motor(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<66i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())
# <67i1s20>
def get_motor_is_moving(id: int):
    """
    Get the state of a single motor with is id

    Parameters:
        id (int): the motor whose state you want to know

    Raises:
        TypeError: If 'id' is not an integer
        ValueError: If 'id' is not between 0 and 255

    Examples:
        ilo_micro.get_motor_is_moving(1)
    """

    if not isinstance(id, int):
        print ("[ERROR] 'id' parameter must be a integer")
        return None
    if id>255 or id<0:
        print ("[ERROR] 'id' parameter must be include between 0 and 255")
        return None

    msg = "<67i"+str(id)+">"
    vider_uart()
    send_order(msg)
    return classification(get_data())

def set_motor_mode(motor_id:int, mode:str):
    """
    Set the mode of a single motor with is id

    Parameters:
        motor_id (int): the motor id
        mode (str): the mode you want to set

    Raises:
        TypeError: If 'motor_id' is not an integer
        ValueError: If 'motor_id' is not between 5 and 255
        TypeError: If 'mode' is not a string
        ValueError: If 'mode' is not "position" or "speed"

    Examples:
        my_ilo.set_motor_mode(5, "position")
        my_ilo.set_motor_mode(6, "speed")
    """

    if not isinstance(motor_id, int):
        print("[ERROR] 'motor_id' parameter must be a integer")
        return None
    if motor_id > 255 or motor_id < 5:
        print("[ERROR] 'motor_id' parameter must be include between 5 and 255")
        return None
    
    if not isinstance(mode, str):
        print("[ERROR] 'mode' parameter must be a string")
        return None
    if mode != "position" and mode != "speed":
        print("[ERROR] 'mode' parameter must be 'position' or 'speed'")
        return None
    
    if mode == "position":
        msg = "<72"+str(motor_id)+"m0>"
    if mode == "speed":
        msg = "<72"+str(motor_id)+"m1>"
    send_order(msg)
#-----------------------------------------------------------------------------
# if (value == "labyrinth")             {labyrinth}
# if (value == "color_displacement")    {color_displacement}
# if (value == "line_tracking")         {}line_tracking
# if (value == "imu_water")             {}imu_water
# if (value == "distance_displacement") {distance_displacement}

def set_autonomous_mode(value):
    """
    Launch ilo in an autonomous mode

    Parameters:
        value (str): the autonomous mode you want to launch

    Raises:
        TypeError: If value is not a string

    Examples:
        ilo_micro.set_autonomous_mode("distance_displacement")
    """

    if not isinstance(value, str):
        print ("[ERROR] 'value' parameter must be a string")
        return None

    msg = "<80"+str(value)+">"
    send_order(msg)
#-----------------------------------------------------------------------------
def set_wifi_credentials(ssid, password):
    """
    Enter your wifi details to enable ilo to connect to your network

    Parameters:
        ssid (str): the name of your wifi network
        password (str): the password of your wifi network

    Raises:
        TypeError: If ssid is not a string
        TypeError: If password is not a string

    Examples:
        ilo_micro.set_wifi_credentials("my_wifi", "my_password")
    """

    if not isinstance(ssid, str): 
        print ("[ERROR] 'ssid' parameter must be a string")
        return None
        
    if not isinstance(password, str):
        print("[ERROR] 'password' parameter must be a string")
        return None

    msg = "<90s"+str(ssid)+">"
    send_order(msg)

    msg = "<91p"+str(password)+">"
    send_order(msg)

def get_wifi_credentials():
    """
    Get wifi credentials registered on ilo
    """
    vider_uart()
    send_order("<92>")
    return classification(get_data())
#-----------------------------------------------------------------------------
def set_name(name):
    """
    Set a new name for your ilo

    Parameters:
        name (str): the name you want for your ilo

    Raises:
        TypeError: If name is not a string

    Examples:
        ilo_micro.set_name("Marin's ilo")
    """

    if not isinstance(name, str):
        print ("[ERROR] 'name' parameter must be a string")
        return None

    msg = "<94n" + str(name) + ">"
    send_order(msg)

def get_name():
    """
    Reads the name you have given to your ilo
    """
    vider_uart()
    send_order("<93>")
    return classification(get_data())
#-----------------------------------------------------------------------------
uart.write("<103s2>")
utime.sleep(0.5)

print('lib ilo_micro imported correctly')
print('version 0.11')
uart.write("<ilo>")
utime.sleep(0.5)