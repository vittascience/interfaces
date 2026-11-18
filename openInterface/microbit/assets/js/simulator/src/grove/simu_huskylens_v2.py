BOX = "BOX"
ARROW = "ARROW"
FRAME = "BOX"
LINE = "ARROW"
SAVE = 0
LOAD = 1


class HuskyLensV2:
    def __init__(self, i2c=None):
        self.learned_id = 0
        return

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
        return "" if data in ("name", "content") else 0

    def readArrow(self, target_id, data):
        return "" if data in ("name", "content") else 0

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

    def writeOSD(self, name, x, y, font_size=24, color=0xFFFFFF):
        return True

    def clearOSD(self):
        return True

    def saveModelToTFCard(self, command, data):
        return True

    def drawRect(self, x, y, width, height, color=0xFFFFFF, line_width=1):
        return True

    def clearRect(self):
        return True

    def drawUniqueRect(self, x, y, width, height, color=0xFFFFFF, line_width=1):
        return True

    def takePhoto(self, resolution=0):
        return True

    def takeScreenshot(self):
        return True

    def playMusic(self, name, volume):
        return True

    def startRecording(self, resolution, media, duration, filename=""):
        return True

    def stopRecording(self, media):
        return True

    def learnBlock(self, x, y, width, height):
        return 0

    def saveKnowledge(self, bank):
        return True

    def loadKnowledge(self, bank):
        return True

    def setMultiAlgorithm(self, algo0, algo1, algo2=0):
        return True

    def setMultiAlgorithmRatio(self, ratio0, ratio1, ratio2=0):
        return True

    def getAlgoParam(self, key, value_type="string", algo=0):
        return 0

    def setAlgoParam(self, key, value, value_type="string", algo=0):
        return True

    def updateAlgoParams(self, algo=0):
        return True

    def exit(self):
        return True

    def getResultByIndex(self, index, item_type="BOX", data="id"):
        return "" if data in ("name", "content") else 0

    def getResultById(self, target_id, item_type="BOX", data="id"):
        return "" if data in ("name", "content") else 0

    def getCenterResult(self, item_type="BOX", data="id"):
        return "" if data in ("name", "content") else 0

    def getLargestResult(self, item_type="BOX", data="id"):
        return "" if data in ("name", "content") else 0

    def getNearestResult(self, item_type="BOX", data="id"):
        return "" if data in ("name", "content") else 0

    def getBranchCount(self):
        return 0

    def getBranchByIndex(self, index, data="angle"):
        return 0

    def getKeypoint(self, index, axis="x", item_type="BOX", target_id=0):
        return 0

    def getFaceOrientation(self, axis, target_id=0):
        return 0

    def getVisibleId(self, index, item_type="BOX"):
        return 0

    def getVisibleIdCount(self, item_type="BOX"):
        return 0

    def countById(self, target_id, item_type="BOX"):
        return 0
