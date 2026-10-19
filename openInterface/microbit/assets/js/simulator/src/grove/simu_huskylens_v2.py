BOX = "BOX"
ARROW = "ARROW"
FRAME = "BOX"
LINE = "ARROW"
SAVE = 0
LOAD = 1

def _mode_id(m):
    return 1

class HuskyLensV2:
    def __init__(self, i2c=None):
        self.current_mode = 1
        self.cached_items = []
        self.learned_id = 0

    def initI2c(self):
        return True

    def initMode(self, mode):
        return True

    def request(self):
        return True

    def _find(self, target_id, arrow):
        return None

    def isAppear(self, target_id, item_type):
        return False

    def readBox(self, target_id, data):
        p = str(data).lower().strip()
        return "" if p in ("name", "content", "5", "6") else 0

    def readArrow(self, target_id, data):
        p = str(data).lower().strip()
        return "" if p in ("name", "content", "5", "6") else 0

    def readId(self):
        return 0

    def count(self, item_type="BOX"):
        return 0

    def writeLearn1(self):
        return 0

    def forgetLearn(self):
        return True

    def writeName(self, target_id, name):
        return True

    def writeOSD(self, name, x, y):
        return True

    def clearOSD(self):
        return True

    def saveModelToTFCard(self, command, data):
        return True
