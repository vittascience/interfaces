from microbit import i2c, sleep

DF2301Q_I2C_ADDR = 0x64

DF2301Q_I2C_REG_CMDID = 0x02
DF2301Q_I2C_REG_PLAY_CMDID = 0x03
DF2301Q_I2C_REG_SET_VOLUME = 0x05


def setVolume(volume):
    _write(DF2301Q_I2C_REG_SET_VOLUME, min(max(volume, 1), 7))


def getCMDID():
    # 0 si aucune commande reconnue depuis la dernière lecture
    i2c.write(DF2301Q_I2C_ADDR, bytes([DF2301Q_I2C_REG_CMDID]), repeat=True)
    return i2c.read(DF2301Q_I2C_ADDR, 1)[0]


_pending = 0


def isCommand(command_id):
    # garde la dernière commande reconnue jusqu'à ce qu'un test la consomme :
    # plusieurs blocs "si la commande ... est reconnue" à la suite voient la même
    global _pending
    command = getCMDID()
    if command:
        _pending = command
    if _pending == command_id:
        _pending = 0
        return True
    return False


def playByCMDID(command_id):
    _write(DF2301Q_I2C_REG_PLAY_CMDID, command_id)
    sleep(1000)


def _write(reg, value):
    i2c.write(DF2301Q_I2C_ADDR, bytes([reg, value]))
