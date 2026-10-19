from microbit import sleep, running_time

def init(tx, rx):
    pass

def _wait_finger(timeout):
    start = running_time()
    while running_time() - start < timeout:
        if simulator_getSliderValue('fingerprint_slider', 'int'):
            return True
        sleep(50)
    return False

def verify():
    # bouton appuyé = empreinte reconnue (ID 1), timeout de 10 s comme le vrai capteur
    return 1 if _wait_finger(10000) else -1

def register(finger_id, count=4):
    # un appui suffit à simuler les count poses du doigt
    return _wait_finger(count * 10000)
