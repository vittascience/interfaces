from microbit import sleep

def setVolume(volume):
    pass

def getCMDID():
    # slider = identifiant de la commande "entendue", 0 = aucune
    return simulator_getSliderValue('voiceRecognition_slider', 'int')

def isCommand(command_id):
    return getCMDID() == command_id

def playByCMDID(command_id):
    sleep(1000)
