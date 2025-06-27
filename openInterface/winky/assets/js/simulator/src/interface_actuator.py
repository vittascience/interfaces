from Winky_preset_list import *
from Winky_actuator    import WinkyActuator
from SimulatorActuator import SimulatorActuator

COMMAND_SUCCESS                 = 1

COMMAND_ERROR                   = 0
COMMAND_ERROR_BLE_NOT_CONNECTED = -1
COMMAND_ERROR_BLE               = -2
COMMAND_ERROR_NAME_NO_FOUND     = -3
COMMAND_ERROR_NOTIFY            = -4

COMMAND_ERROR_WS_SEND           = -50
COMMAND_ERROR_COMMAND_PARAM     = -51

## Cette classe regroupe toutes les fonctions d'actions que peut réaliser Winky.
#   en fonction de son mode, connecté ou non.
class WinkyInterfaceActuator (WinkyActuator, SimulatorActuator):

    ## The constructor.
    def __init__(self):
        print("Actuator interface Class init")
    

    def get_status(self) :
        raise NotImplementedError


    ##@brief Cette fonction permet d'orienter la tête de Winky dans un interval de 0° à 360°.
    # @param angle prend une valeure entre 0° et 360°. 
    # @param init permet de réinitialiser ou non le référenctiel du robot (0 ou 1)

    ##\return   La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_neck_position(self, angle:int, init:bytes=0) :
             # security control
        if (angle > 360) or (angle < 0) or (init > 1) or (init < 0):
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_neck_position(angle, init))               # BLE connexion enable
        else : 
            return (self._SIM_set_neck_position(angle, init))               # BLE connexion disable    
    

    ##@brief Cette fonction permet d'effectuer une rotation de tête de -360 à 360°.
    # @param angle peut prendre une valeure entre -360° et 360°.
    # @param speed peut prendre les valeurs suivantes selon la vitesse de rotation voulue :\n
    #   - \b 0 : vitesse aleatoire
    #   - \b 1 : vitesse lente
    #   - \b 2 : vitesse normale
    #   - \b 3 : vitesse rapide

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_neck_rotate(self, angle:int, speed:bytes=0x02) :
            # security control
        if (speed < 0) or (speed > 3) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        
        if (angle < -360) or (angle > 360) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_neck_rotate(angle, speed))               # BLE connexion enable
        else : 
            return (self._SIM_set_neck_rotate(angle, speed))               # BLE connexion disable    
        

    ##@brief Cette fonction permet d'effectuer une rotation de l'oreille droite (par apport au robot)
    # @param angle peut prendre une valeure entre -135° et +135°.

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_ear_right_position(self, angle:int) :
            # security control
        if (angle < -135) or (angle > 135) :
            return (COMMAND_ERROR_COMMAND_PARAM)


        if (self.get_status()):
            return (self._BLE_set_ear_right_position(angle))               # BLE connexion enable
        else : 
            return (self._SIM_set_ear_right_position(angle))               # BLE connexion disable


    ##@brief Cette fonction permet d'effectuer une rotation de l'oreille gauche (par apport au robot)
    # @param angle peut prendre une valeure entre -135° et +135°.

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_ear_left_position(self, angle:int) :
            # security control
        if (angle < -135) or (angle > 135) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_ear_left_position(angle))               # BLE connexion enable
        else : 
            return (self._SIM_set_ear_left_position(angle))               # BLE connexion disable


    ##@brief Cette fonction permet d'effectuer une rotation des deux oreilles simultanément.
    # @param angle peut prendre une valeure entre -135° et +135°.

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_ear_duplicate_position(self, angle:int) :
            # security control
        if (angle < -135) or (angle > 135) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_ear_duplicate_position(angle))               # BLE connexion enable
        else : 
            return (self._SIM_set_ear_duplicate_position(angle))               # BLE connexion disable


    ##@brief Cette fonction permet d'effectuer une rotation d'une ou des deux oreilles de manière aleatoire.
    # @param angle peut prendre une valeure entre -135° et +135°.

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_ear_random_position(self, angle:int) :
            # security control
        if (angle < -135) or (angle > 135) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_ear_random_position(angle))               # BLE connexion enable
        else : 
            return (self._SIM_set_ear_random_position(angle))               # BLE connexion disable


    ##@brief Cette fonction demande au robot de faire une pause définie en millisecondes.
    # @param delay peut prendre une valeure entre 0 et 32767 milisecondes.
    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_wait_ms(self, delay:int) :

        if (self.get_status()):
            return (self._BLE_set_wait_ms(delay))               # BLE connexion enable
        else : 
            return (self._SIM_set_wait_ms(delay))               # BLE connexion disable
 

    ##@brief Cette fonction demande au robot de faire une pause définie en secondes.
    # @param delay peut prendre une valeure entre 0 et 32767 secondes.
    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_wait_s(self, delay:int) :

        if (self.get_status()):
            return (self._BLE_set_wait_s(delay))               # BLE connexion enable
        else : 
            return (self._SIM_set_wait_ms(delay))               # BLE connexion disable


    ##@brief Cette fonction demande au robot d'afficher un ou deux \a pattern contenu(s) dans un tableau.
    # @param first_pattern doit etre un tableau de 8x8, contenant des 0 ou des 1, equivalent aux LED allumer ou non.
    # @param second_pattern doit etre un tableau de 8x8, contenant des 0 ou des 1, equivalent aux LED allumer ou non.
    # @param option peut prendre les valeurs suivantes :
    #   - \b 0 : Les deux yeux son utilisés          
    #   - \b 1 : Uniquement l'oeil gauche est utilisé          
    #   - \b 2 : Uniquement l'oeil Droit est utilisé           
    #   - \b 3 : La selection de l'oeil utilisé est aleatoire     
    #   - \b 4 : Les deux yeux font une transformation Horizontale 
    #   - \b 5 : Les deux yeux font une transformation Verticale
    #   - \b 6 : Les deux yeux font une rotation de 90°
    #   - \b 7 : Les deux yeux font une rotation de 180°
    #   - \b 8 : Les deux yeux font une rotation de 270°
    #   - \b 9 : Les deux yeux sont actifs et utilisent deux tableaux (\c pattern 1 et 2)

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>  
    def set_display_pattern(self, first_pattern=[], option=0, second_pattern=[]):
            # secutiry control
        if (option > 9) or (option < 0):
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_display_pattern(first_pattern, option, second_pattern))               # BLE connexion enable
        else : 
            return (self._SIM_set_display_pattern(first_pattern, option, second_pattern))               # BLE connexion disable
        

    ##@brief Cette fonction demande au robot d'afficher une ou deux animations, enregistreé(s) dans sa memoire interne.
    # @param first_preset doit être une valeur comprise dans cette <a href="class_winky__preset__list_1_1_eyes_preset.html">liste</a>.
    # @param second_preset doit étre une valeur comprise dans cette <a href="class_winky__preset__list_1_1_eyes_preset.html">liste</a>.
    # @param delay définit le temps (en milisecondes) entre deux images dans l'animation.
    # @param option peut prendre les valeurs suivantes :
    #   - \b 0 : Les deux yeux son utilisés          
    #   - \b 1 : Uniquement l'oeil gauche est utilisé          
    #   - \b 2 : Uniquement l'oeil Droit est utilisé           
    #   - \b 3 : La selection de l'oeil utilisé est aleatoire     
    #   - \b 4 : Les deux yeux font une transformation Horizontale 
    #   - \b 5 : Les deux yeux font une transformation Verticale
    #   - \b 6 : Les deux yeux font une rotation de 90°
    #   - \b 7 : Les deux yeux font une rotation de 180°
    #   - \b 8 : Les deux yeux font une rotation de 270°
    #   - \b 9 : Les deux yeux sont actif et utilisent 2 tableau (pattern 1 et 2)

    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_display_preset(self, delay=32, option=0, first_preset=EyesPreset.Amused, second_preset=EyesPreset.Amused) :
            # security control
        if (first_preset > 169 ) or (first_preset < 0) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        
        if  (option < 0) or (option > 9):
            return (COMMAND_ERROR_COMMAND_PARAM)
        
        if (option == 9) :
            if (second_preset > 169 ) or (second_preset < 0) :
                return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_display_preset(delay, option, first_preset, second_preset))               # BLE connexion enable
        else : 
            return (self._SIM_set_display_preset(delay, option, first_preset, second_preset))               # BLE connexion disable
   
   
    ##@brief Cette fonction affiche un numéro (dans un intervalle de -999 à 9999) dans les yeux de Winky.
    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>        
    def set_display_number(self, number) :
            # security control
        if (number > 9999) or (number < -999) :
            return (COMMAND_ERROR_COMMAND_PARAM)


        if (self.get_status()):
            return (self._BLE_set_display_number(number))               # BLE connexion enable
        else : 
            return (self._SIM_set_display_number(number))               # BLE connexion disable
    

    ##@brief Cette fonction affiche un text.
    # @param direction indique le sens d'affichage du texte
    #   - \b 0 : de gauche à droite
    #   - \b 1 : de droite à gauche 
    # @param transition_effect :
    #   - \b 0 : affichage par remplacement avec une pause de 1 seconde.
    #   - \b 1 : affichage par remplacement avec une pause 800 millisecondes.
    #   - \b 2 : affichage par remplacement avec une pause 500 millisecondes.
    #   - \b 3 : affichage par remplacement avec une pause 200 millisecondes.
    #   - \b 4 : affichage par défilement avec une pause de 500 millisecondes.
    #   - \b 5 : affichage par défilement avec une pause de 400 millisecondes.
    #   - \b 6 : affichage par défilement avec une pause de 300 millisecondes.
    #   - \b 7 : affichage par défilement avec une pause de 200 millisecondes.
    ##\return :  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_display_text(self, text, direction=1, transition_effet=6) :
            # security control
        if (len(text) > 16) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_display_text(text, direction, transition_effet))               # BLE connexion enable
        else : 
            return (self._SIM_set_display_text(text, direction, transition_effet))               # BLE connexion disable


    ##@brief Cette fonction lance un son enregistré dans le robot.
    # @param sound peut prendre une valeur dans cette <a href="class_winky__preset__list_1_1_sound_preset.html">liste</a>.
    # @param block 
    #   - \b 1 : le robot se met en pause jusqu'à la fin de la piste audio
    #   - \b 0 : l'execution est non bloquante, le robot passe à la commande suivante sans attendre la fin de la piste audio
    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_play_sound(self, sound=SoundPreset.Amused01, block=0):
            # security control
        if (sound  > 53) or (sound < 0) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        

        if (self.get_status()):
            return (self._BLE_set_play_sound(sound, block))               # BLE connexion enable
        else : 
            return (self._SIM_set_play_sound(sound, block))               # BLE connexion disable
        

    ##@brief Cette fonction permet de changer le volume du robot.
    # @param lvl prend une valeur comprise entre 0 et 255.
    ##\return  La fonction peut renvoyer les valeurs suivantes :<a href="group___f_u_n_c_t_i_o_n_s___r_e_t_u_r_n___v_a_l_u_e.html">COMMAND_SUCCESS/COMMAND_ERROR_BLE_NOT_CONNECTED/COMMAND_ERROR_COMMAND_PARAM</a>
    def set_volume(self, lvl=50):
            # security control
        if (lvl  > 255) or (lvl < 0) :
            return (COMMAND_ERROR_COMMAND_PARAM)
        
        if (self.get_status()):
            return (self._BLE_set_volume(lvl))               # BLE connexion enable
        else : 
            return (self._SIM_set_volume(lvl))               # BLE connexion disable