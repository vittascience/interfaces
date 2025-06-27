from Winky_return_list import *

## @defgroup ACTUATOR_BYTES_COMMAND
##@{
SET_ROTATE_NECK     = 0
SET_NECK_POSITION   = 2
SET_EAR_POSITION    = 4
DISPLAY_EYE_PATTERN = 8
SET_SOUND_VOLUME    = 11
SET_CONTROL_PLAYER  = 12
DISPLAY_EYE_PRESET  = 13
DISPLAY_TEXT        = 15
DISPLAY_NUMBER      = 16
SET_DELAY           = 64
PUSH_LIT            = 84
##@}


def convert_to_ascii_mainbot(char) :
    out = 0
    
    # control ASCII fail reset robot
    if (char == 123) or (char == 125) or (char == 126):
        char = 32

    
    if (char > 47) and (char < 58):     # convert 0 to 9
        out = char - 48
    elif (char > 31) and (char < 48):   # convert ' ' to /
        out = char - 2
    elif (char > 57) and (char < 64):   # convert : to ?
        out = char - 12
    elif (char > 64) and (char < 91):   # convert A to Z
        out = char - 3
    elif (char > 90) and (char < 97):   # convert [ to `
        out = char - 39
    elif (char > 96) and (char < 123):   # convert a to z
        out = char - 35
    elif (char > 122) and (char < 127):   # convert { to ~
        out = char - 65
    elif (char == 64):   # convert @
        out = 88
    else :              # security char space
        out = 32
    
    return (out)


class WinkyActuator ():

    ## The constructor.
    def __init__(self):
        print("Actuator Class init")
    

    ##@brief Cette fonction est abstraite à la class "WinkyActuator".
    # La definition de cette fonction se trouve dans la classe <a href="class_winky__base_1_1_winky__base.html">"Winky_base"</a>.
    def send_winkyscript(self):
        raise NotImplementedError


    def __push_lit(self, var):
        
        if (var > 65536) or (var < -32767) :
            return (COMMAND_ERROR_COMMAND_PARAM)

        command = [0] * 3

        command[0] = PUSH_LIT
        command[1] = (var & 0xFF00) >> 8
        command[2] = var & 0xFF

        return (self.send_winkyscript(command))
    

    def __push_lit_v2(self, var):

        if (var > 65536) or (var < -32767) :
            return (COMMAND_ERROR_COMMAND_PARAM)

        command = [0] * 3

        command[0] = PUSH_LIT
        command[1] = (var & 0xFF00) >> 8
        command[2] = var & 0xFF

        return (command)


    # __ add you functions here :
    def _BLE_set_neck_position(self, angle:int, init:bytes=0) :
        command = [0] * 3
        command[0] = SET_NECK_POSITION

        if (init == 1) :
            command[1] = 0x02
        else :
            command[1] = 0x00
        command[1] |= (angle & 0x100) >> 8
        command[2] = angle & 0xff

        return (self.send_winkyscript(command))

        # default speed is medium

    
    def _BLE_set_neck_rotate(self, angle:int, speed:bytes=0x02) :
        command = [0] * 3

        command[0] = SET_ROTATE_NECK
        command[1] = 0x10   # block mode

            # set speed
        command[1] |= (speed << 2)

            # set angle
        command[1] |= ((angle >> 8) & 0x03)
        command[2] = angle & 0xff
        
        return (self.send_winkyscript(command))


    def _BLE_set_ear_right_position(self, angle:int) :
        command = [0] * 3

        command[0] = SET_EAR_POSITION
        command[1] = 0x02 << 2
        command[1] |= (angle >> 8) & 0x01
        command[2] = angle & 0xff

        return (self.send_winkyscript(command))


    def _BLE_set_ear_left_position(self, angle:int) :
        command = [0] * 3

        command[0] = SET_EAR_POSITION
        command[1] = 0x01 << 2
        command[1] |= (angle >> 8) & 0x01
        command[2] = angle & 0xff

        return (self.send_winkyscript(command))


    def _BLE_set_ear_duplicate_position(self, angle:int) :
        command = [0] * 3

        command[0] = SET_EAR_POSITION
        command[1] = 0x03 << 2
        command[1] |= (angle >> 8) & 0x01
        command[2] = angle & 0xff

        return (self.send_winkyscript(command))
    

    def _BLE_set_ear_random_position(self, angle:int) :
        command = [0] * 3

        command[0] = SET_EAR_POSITION
        command[1] = 0
        command[1] = (angle >> 8) & 0x01
        command[2] = angle & 0xff

        return (self.send_winkyscript(command))


    def _BLE_set_wait_ms(self, delay:int) :
        command = [0] * 3

        command[0] = SET_DELAY
        #command[1] = 0x80      # this setting for ms
        command[1] |= (delay >> 8) & 0x7F
        command[2] = delay & 0xFF
        
        return (self.send_winkyscript(command))
    

    def _BLE_set_wait_s(self, delay:int) :
        command = [0] * 3

        command[0] = SET_DELAY
        command[1] = 0x80      # this setting for Second
        command[1] |= (delay >> 8) & 0x7F
        command[2] = delay & 0xFF
        
        return (self.send_winkyscript(command))


    def _BLE_set_display_pattern(self, first_pattern=[], option=0, second_pattern=[]):
        if (option == 9) :
            command = [0] * 18
        else :
            command = [0] * 10

        command[0] = DISPLAY_EYE_PATTERN
        command[1] = option & 0x0F

        if (len(first_pattern) != 8):
            return (COMMAND_ERROR_COMMAND_PARAM)
        else :
            for i in range(8):
                command[2 + i] = first_pattern[i]    

        if ((option & 0x0F) == 9) :
            if (len(second_pattern) != 8) :
                return (COMMAND_ERROR_COMMAND_PARAM)
            else :
                for i in range(8):
                    command[10 + i] = second_pattern[i]

        return (self.send_winkyscript(command))


    def _BLE_set_display_preset(self, delay=32, option=0, first_preset=int, second_preset=int) :
        if (option == 9) :
            command = [0] * 5
        else :
            command = [0] * 4

        command[0] = DISPLAY_EYE_PRESET

        command[1] = 0x00 # command in bloc mode 80
        command[1] = command[1] | delay
        command[2] = option << 4
        command[2] = command[2] | ((first_preset >> 6) & 0x0F)

        command[3] = (first_preset & 0x3F) << 2

        if (option == 9) :
            command[3] = command[3] | (second_preset & 0x300) >> 8
            command[4] = second_preset & 0xFF

        return (self.send_winkyscript(command))


    def _BLE_set_display_number(self, number) :
        first_command = [0] * 3
        first_command = self.__push_lit_v2(number)
        
        command = [0] * 2

        command[0] = DISPLAY_NUMBER
        command[1] = 0xAD

        final_command = first_command + command

        return (self.send_winkyscript(final_command))
    
    
    def _BLE_set_display_text(self, text, direction=1, transition_effet=6) :

        if (len(text)%2 != 0) :
            text += ' '

        i = 0
        size = len(text)

        while i < (len(text)):
            send = 0

            send = convert_to_ascii_mainbot(ord(text[(size-1)-i])) & 0xFF 

            i = i+1
            if (i+1 <= len(text)) :
                send |= convert_to_ascii_mainbot(ord(text[(size-1)-i])) << 8
  
            check = self.__push_lit(send)

            i = i+1
            if (check != 1) :
                return (check)
        
        command = [0] * 2

        command[0] = DISPLAY_TEXT
        
        if (len(text)%2 != 0) :
            command[1] = (((len(text) // 2)) & 0x07) << 5          # (len(text) // 2)
            #print("size "+str((len(text) // 2)))
        else :
            command[1] = (((len(text) // 2)-1) & 0x07) << 5          # (len(text) // 2)
            #print("size "+str((len(text) // 2)-1))
 
        command[1] |= (direction & 0x01) << 4
        command[1] |= (0x01) << 3      # set blocking mode
        command[1] |= (transition_effet & 0x07)

        return (self.send_winkyscript(command))


    # Load	0	Load Winky's sound player with a given sound file and start it. (default value)
    # Stop	1	Stop Winky's sound player.
    # Pause	2	Pause Winky's sound player.
    # Play	3	Unpause Winky's sound player.

    # sound wait or not 1 or 0
    def _BLE_set_play_sound(self, sound:int, block=0):
        command     = [0] * 3

        command[0]  = SET_CONTROL_PLAYER

        if (block == 0) :
            command[1]  = 0x00
        else :
            command[1] =  0x20                  # load sound and wait end execution
        command[1]  = (sound & 0xC0) >> 8
        command[2]  = sound & 0xff

        return (self.send_winkyscript(command))
    
    
    def _BLE_set_volume(self, lvl=50):

        command     = [0] * 2
        command[0]  = SET_SOUND_VOLUME
        command[1]  = lvl

        return (self.send_winkyscript(command))