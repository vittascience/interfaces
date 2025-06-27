from Winky_return_list import *

## @defgroup SENSOR_BYTES_ADRESS
##@{
ACC_SENSOR      = 0 # gyro-acc
GYRO_SENSOR     = 1 # gyro-position
IR_SENSOR       = 2 # tof
TOUCH_SENSOR    = 3 # 3 to 4
ROLL_PITCH_FREE = 5 # 5-8
ROLL_PITCH      = 9 # 9-12
##@}



## Cette classe regroupe toutes les fonctions qui permettent d'utiliser les capteurs du robot.\n
class WinkySensor ():
    RED_BUTTON      = 0
    BLUE_BUTTON     = 1
    PURPLE_BUTTON  = 2
    YELLOW_BUTTON   = 3

        # table of flag for release or unpressed button
    button_press_status     = [0] * 4
    button_release_status   = [0] * 4

    ## The constructor.
    def __init__(self):
        print("Sensor Class init")

    ##@brief Cette fonction est abstraite a la class "WinkySensor".
    # La definition de cette fonction se trouve dans la classe <a href="class_winky__base_1_1_winky__base.html">"Winky_base"</a>.
    def get_sensor(self):
        raise NotImplementedError


    def update_get_sensor(self, adress, mask) :
        raise NotImplementedError


    # add you functions here |
    #                        V

        # ---- IMU sensor  ----
    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe Z.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot tourne vers sa droite.\n
    # - \b 2 : si le robot tourne vers sa gauche.
    def _BLE_get_gyro_z_direction(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        b = (b[GYRO_SENSOR] & 0x03)

        if (b == 1) : 
            return (1)  # rotate right robot
        elif (b == 2) :
            return (2)  # rotate left robot
        else :
            return (0) # rien

    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe Y.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot tourne vers l'arriere.\n
    # - \b 2 : si le robot tourne vers l'avant.
    def _BLE_get_gyro_y_direction(self):
        b = self.get_sensor()
        
        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        b = (((b[GYRO_SENSOR]) & 0x0C) >> 2)

        if (b == 1) :
            return (1)  # backward
        elif (b == 2) :
            return (2)  # frontward
        else :
            return (0) # rien

    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe X.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot s'incline vers sa droite.\n
    # - \b 2 : si le robot s'incline vers sa gauche.
    def _BLE_get_gyro_x_direction(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        b = ((b[GYRO_SENSOR] & 0x30) >> 4 )

        if (b == 1) :
            return (2)  # left robot
        elif (b == 2) :
            return (1)  # right robot
        else :
            return (0) # rien
    

    ##@brief Cette fonction renvoie un angle sur l'axe Y.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b angle : une valeure comprise entre 0° et 360°.
    def _BLE_get_gyro_y_angle(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        angle = (b[ROLL_PITCH+2] << 8)
        angle |= (b[ROLL_PITCH+3])

        return (angle)
    

    ##@brief Cette fonction renvoie un angle sur l'axe X.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b angle : une valeure comprise entre 0° et 360°.
    def _BLE_get_gyro_x_angle(self):
        b = self.get_sensor()
        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        angle = (b[ROLL_PITCH] << 8)
        angle |= (b[ROLL_PITCH+1])
        
        return (angle)


# ---- TOUCH sensor  ----
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur bleu.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True  : si le bouton est touché.
    # - \b False : sinon.
    def _BLE_get_touch_blue(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)

        if (((b[TOUCH_SENSOR] & 0x04) != 0) or ((b[TOUCH_SENSOR] & 0x10) != 0)) :
            #self.update_get_sensor(TOUCH_SENSOR, 0x04)
            return (True)
        return (False)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def _BLE_get_touch_blue_onrelease(self):
        actual_status   = self.get_touch_blue()
        out             = False

            # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)

            # control we have release action
        if (actual_status == False) and (self.button_release_status[self.BLUE_BUTTON] == True) :
            out = True

            # update table of status for the next control
        self.button_release_status[self.BLUE_BUTTON] = actual_status   
        return (out)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def _BLE_get_touch_blue_onpress(self):
        actual_status   = self.get_touch_blue()
        out             = False

        # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)
        
            # control we have on press action
        if (actual_status == True) and (self.button_press_status[self.BLUE_BUTTON] == False) :
            # update table of status
            out = True

            # update table of status for the next control
        self.button_press_status[self.BLUE_BUTTON] = actual_status    
        return (out)
    
    
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur violet.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def _BLE_get_touch_purple(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        if (((b[TOUCH_SENSOR] & 0x08) != 0) or ((b[TOUCH_SENSOR] & 0x10) != 0)):
            return (True)
        return (False)
    
    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def _BLE_get_touch_purple_onrelease(self):
        actual_status   = self.get_touch_purple()
        out             = False

        # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)

            # control we have release action
        if (actual_status == False) and (self.button_release_status[self.PURPLE_BUTTON] == True) :
            out = True

            # update table of status for the next control
        self.button_release_status[self.PURPLE_BUTTON] = actual_status   
        return (out)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def _BLE_get_touch_purple_onpress(self):
        actual_status   = self.get_touch_purple()
        out             = False

            # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)
        
            # control we have release action
        if (actual_status == True) and (self.button_press_status[self.PURPLE_BUTTON] == False) :
            out = True

            # update table of status for the next control
        self.button_press_status[self.PURPLE_BUTTON] = actual_status    
        return (out)
    

    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur rouge.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def _BLE_get_touch_red(self):
        b = self.get_sensor()

            # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)

        if (((b[TOUCH_SENSOR+1] & 0x04) != 0) or ((b[TOUCH_SENSOR+1] & 0x10) != 0)):
            return (True)
        return (False)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon. 
    def _BLE_get_touch_red_onrelease(self):
        actual_status   = self.get_touch_red()
        out             = False

        # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)

            # control we have release action
        if (actual_status == False) and (self.button_release_status[self.RED_BUTTON] == True) :
            out = True

            # update table of status for the next control
        self.button_release_status[self.RED_BUTTON] = actual_status   
        return (out)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def _BLE_get_touch_red_onpress(self):
        actual_status   = self.get_touch_red()
        out             = False

        # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)
        
            # control we have on press action
        if (actual_status == True) and (self.button_press_status[self.RED_BUTTON] == False) :
            # update table of status
            out = True

            # update table of status for the next control
        self.button_press_status[self.RED_BUTTON] = actual_status    
        return (out)
    
    
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur jaune.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def _BLE_get_touch_yellow(self):
        b = self.get_sensor()

        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
            # update table of status
        if (((b[TOUCH_SENSOR+1] & 0x08) != 0) or ((b[TOUCH_SENSOR+1] & 0x10) != 0)):
            return (True)
        return (False)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def _BLE_get_touch_yellow_onrelease(self):
        actual_status   = self.get_touch_yellow()
        out             = False

            # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)

            # control we have release action
        if (actual_status == False) and (self.button_release_status[self.YELLOW_BUTTON] == True) :
            out = True

            # update table of status for the next control
        self.button_release_status[self.YELLOW_BUTTON] = actual_status   
        return (out)
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def _BLE_get_touch_yellow_onpress(self):
        actual_status   = self.get_touch_yellow()
        out             = False

        # check BLE SENSOR can Update
        if (actual_status == COMMAND_ERROR_NOTIFY) :
            return (actual_status)
        
            # control we have on press action
        if (actual_status == True) and (self.button_press_status[self.YELLOW_BUTTON] == False) :
            out = True

            # update table of status for the next control
        self.button_press_status[self.YELLOW_BUTTON] = actual_status    
        return (out)


# ---- IR sensor  ----

    ##@brief Cette fonction indique si le robot détecte quelque chose devant lui ou non.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si rien est détecté.\n
    # - \b 3 : si quelque chose de proche est détecté.\n
    # - \b 2 : si quelque chose de loin est détecté.
    def _BLE_get_proximity_detection(self):
        b = self.get_sensor()
        
        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        b = (b[IR_SENSOR] >> 6)
        return (b)
    

    ##@brief Cette fonction indique un mouvement que le robot peut détecter.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> s'il y a une erreur.\n
    # - \b 0 : si rien est détecté.\n
    # - \b 1 : un mouvement vers la droite du robot.\n
    # - \b 2 : un mouvement vers la gauche du robot.
    def _BLE_get_gesture_detection(self):
        b = self.get_sensor()
        
        # check BLE SENSOR can Update
        if (b == COMMAND_ERROR_NOTIFY) :
            return (b)
        
        b = (b[IR_SENSOR] & 0x03)
        return (b)