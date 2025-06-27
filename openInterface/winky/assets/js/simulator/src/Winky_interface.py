##
# @mainpage Doxygen Winky python Project
#
# @section description_main Description
# Cette documentation à été généré sous Doxygene.\n
# Elle définit la librairie "WinkyLib", utilisable sous python 3.\n
# La version de la librairie est la meme que celui de la documentation (indiquée en haut).\n
# Les version sont composé comme suit [version publique, version fonctionnalitées, version bug-correction].\n
# Une page Log des version sera prochainement crée.\n 
# Les ressources suivantes sont nécéssaire :
#   - random
#   - bleak                         (https://bleak.readthedocs.io/en/latest/installation.html)
#   - asyncio                                              (https://pypi.org/project/asyncio/)
#   - nest-asyncio (pour une utilisation sous jupyter -> https://pypi.org/project/nest-asyncio/)
#
#   ATTENTION ! La librairie "bleak" à besoin des ressources de visual studio (2019 ou 2021 ou 2022).\n
#               Afin de pouvoir acceder au module Bluetooth sur Windows.
#
#
# @section notes_doxygen_example Exemple :
# Pour utiliser cette librairie dans vos projets
# vous devez :
# - mettre le dossier "Winky_lib" dans votre projet
# - ajouter cette ligne en haut du code ["from Winky_lib.Winky_interface import WinkyObject"]
#
# Voici un example d'utilisation :
#
# \code{.py}
# from Winky_lib.Winky_interface import WinkyObject
#   #on créé un Objet robot
# robot = WinkyObject()
#   #avec cet Objet on se connecte à un Winky
# robot.connect("WINKY-AA84")
#   #on demande à Winky de faire une rotation de 180°
# robot.set_neck_rotate(180)
# \endcode

from Winky_base           import Winky_base
from interface_sensor     import WinkyInterfaceSensor
from interface_actuator   import WinkyInterfaceActuator

import random

## L'objet "WinkyObject" regroupe toutes les ressources de la librairie\n
#  Il hérite des objets : <a href="class_winky__base_1_1_winky__base.html">Winky_base</a> (fonctions de base),  <a href="classinterface__sensor_1_1_winky_interface_sensor.html">WinkySensor</a> (fonctions des capteurs), <a href="classinterface__actuator_1_1_winky_interface_actuator.html">WinkyActuator</a> (fonctions des actionneurs).
class WinkyObject (Winky_base, WinkyInterfaceSensor, WinkyInterfaceActuator):

    ## tableau de la version de librairie
    # [diffusion, majeur, mineur (bug)]
    version_lib = [0, 0, 10]

    #the_last_command        = list
    #the_last_arg            = None

    ## (objet qui contient les fonctionnalité[connexion, status, adress] du device connecté). Voir plus <a href = "https://bleak.readthedocs.io/en/latest/api/client.html">ici --> lien</a>
    winky_client            = None

    sensor_service          = None
    sensor_characteristic   = None

    manuf_filter        = 2859
    tid                 = 5
    robot_hw_version    = 0
    robot_fw_version    = 0.0
    sensor_data         = [0] * 20
    data_status_ws      = [0] * 5
    
    ws_control_return   = 0

    uuid_sensor_char        = "0e4a39b3-fafb-46d4-b69d-f3fa92384069"
    uuid_winkyscript_char   = "ede2ef81-eac3-49f9-8c00-c48128c53b6e"
    uuid_version_char       = "0d28f6d2-af94-4093-b7ac-8e663708b7a6"

    ## The constructor.
    #@param self The object pointer.
    #@param bloquant La variable bolean permet à la librairie d'envoyer les commandes BLE de manière bloquante 
    # ou non, la valeur par defaut est True.
    def __init__(self, bloquant=True) :        
        self.tid = random.randint(1, 254)
        self.ws_control_return = bloquant

        #print("Winky interface init")

    ##@brief Cette fonction indique le numero de version de la librairie Python.
    #Elle renvoie un tableau de 3 cases.
    ##\return   
    # - case 2  est le numero de publication.
    # - case 1  est le numero de la version Majeure. (implementation de groupe de fonctionnalitees).
    # - case 0  est le numero de la version Mineure. (implementation de fonctionnalite et/ou correction de bug).
    def get_version_lib(self) :
        return (self.version_lib)