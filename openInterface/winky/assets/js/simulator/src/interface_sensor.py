from Winky_sensor      import WinkySensor
from SimulatorSensor   import SimulatorSensor


## Cette classe regroupe toutes les fonctions qui permettent d'utiliser les capteurs du robot.\n
#   en fonction de son mode, connecté ou non.
class WinkyInterfaceSensor (WinkySensor, SimulatorSensor):

    ## The constructor.
    def __init__(self):
        print("Sensor Interface Class init")

    def get_status(self) :
        raise NotImplementedError


        # ---- IMU sensor  ----
    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe Z.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot tourne vers sa droite.\n
    # - \b 2 : si le robot tourne vers sa gauche.
    def get_gyro_z_direction(self):
        
        if (self.get_status()):
            return (self._BLE_get_gyro_z_direction())               # BLE connexion enable
        else : 
            return (self._SIM_get_gyro_z_direction())               # BLE connexion disable


    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe Y.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot tourne vers l'arriere.\n
    # - \b 2 : si le robot tourne vers l'avant.
    def get_gyro_y_direction(self):
        
        if (self.get_status()):
            return (self._BLE_get_gyro_y_direction() )               # BLE connexion enable
        else : 
            return (self._SIM_get_gyro_y_direction())               # BLE connexion disable

    ##@brief Cette fontion indique la direction dans laquelle il est incliné sur l'axe X.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si le robot ne bouge pas.\n
    # - \b 1 : si le robot s'incline vers sa droite.\n
    # - \b 2 : si le robot s'incline vers sa gauche.
    def get_gyro_x_direction(self):

        if (self.get_status()):
            return (self._BLE_get_gyro_x_direction() )               # BLE connexion enable
        else : 
            return (self._SIM_get_gyro_x_direction())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie un angle sur l'axe Y.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b angle : une valeure comprise entre 0° et 360°.
    def get_gyro_y_angle(self):

        if (self.get_status()):
            return (self._BLE_get_gyro_y_angle() )               # BLE connexion enable
        else : 
            return (self._SIM_get_gyro_y_angle())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie un angle sur l'axe X.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b angle : une valeure comprise entre 0° et 360°.
    def get_gyro_x_angle(self):

        if (self.get_status()):
            return (self._BLE_get_gyro_x_angle() )               # BLE connexion enable
        else : 
            return (self._SIM_get_gyro_x_angle())               # BLE connexion disable


# ---- TOUCH sensor  ----
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur bleu.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True  : si le bouton est touché.
    # - \b False : sinon.
    def get_touch_blue(self):

        if (self.get_status()):
            return (self._BLE_get_touch_blue() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_blue())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def get_touch_blue_onrelease(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_blue_onrelease() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_blue_onrelease())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def get_touch_blue_onpress(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_blue_onpress() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_blue_onpress())               # BLE connexion disable
    
    
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur violet.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def get_touch_purple(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_purple() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_purple())               # BLE connexion disable
        
    
    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def get_touch_purple_onrelease(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_purple_onrelease() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_purple_onrelease())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def get_touch_purple_onpress(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_purple_onpress() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_purple_onpress())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur rouge.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def get_touch_red(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_red() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_red())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon. 
    def get_touch_red_onrelease(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_red_onrelease() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_red_onrelease())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def get_touch_red_onpress(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_red_onpress() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_red_onpress())               # BLE connexion disable
    
    
    ##@brief Cette fonction renvoie l'etat du capteur tactile de couleur jaune.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton est touche.
    # - \b False : sinon.
    def get_touch_yellow(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_yellow() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_yellow())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on relache le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat True à l'état False.
    # - \b False : sinon.
    def get_touch_yellow_onrelease(self):
        
        if (self.get_status()):
            return (self._BLE_get_touch_yellow_onrelease() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_yellow_onrelease())               # BLE connexion disable
    

    ##@brief Cette fonction renvoie le changement de l'état du bouton (quand on appuis sur le bouton).
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b True : si le bouton passe de l'etat False à l'état True.
    # - \b False : sinon.
    def get_touch_yellow_onpress(self):
       
        if (self.get_status()):
            return (self._BLE_get_touch_yellow_onpress() )               # BLE connexion enable
        else : 
            return (self._SIM_get_touch_yellow_onpress())               # BLE connexion disable


# ---- IR sensor  ----

    ##@brief Cette fonction indique si le robot détecte quelque chose devant lui ou non.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> : s'il y a une erreur.\n
    # - \b 0 : si rien est détecté.\n
    # - \b 3 : si quelque chose de proche est détecté.\n
    # - \b 2 : si quelque chose de loin est détecté.
    def get_proximity_detection(self):
        
        if (self.get_status()):
            return (self._BLE_get_proximity_detection() )               # BLE connexion enable
        else : 
            return (self._SIM_get_proximity_detection())               # BLE connexion disable
    

    ##@brief Cette fonction indique un mouvement que le robot peut détecter.
    ##\return   
    # - <a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_ERROR_NOTIFY</a> s'il y a une erreur.\n
    # - \b 0 : si rien est détecté.\n
    # - \b 1 : un mouvement vers la droite du robot.\n
    # - \b 2 : un mouvement vers la gauche du robot.
    def get_gesture_detection(self):
        
        if (self.get_status()):
            return (self._BLE_get_gesture_detection() )               # BLE connexion enable
        else : 
            return (self._SIM_get_gesture_detection())               # BLE connexion disable