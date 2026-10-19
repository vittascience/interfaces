import struct
from huskylens_v2_protocol import I2CTransport, Protocol, pad10, _ms, _diff

BOX = "BOX"
ARROW = "ARROW"
FRAME = "BOX"
LINE = "ARROW"
SAVE = 0
LOAD = 1

def _mode_id(m):
    if isinstance(m, int) or (isinstance(m, str) and m.isdigit()):
        return int(m)
    s = str(m).lower()
    for k, v in (
        ("qr", 18), ("hand", 8), ("main", 8), ("pose", 9), ("bar", 17), ("tag", 16), ("tiq", 16),
        ("line", 12), ("lign", 12), ("class", 5), ("color", 4), ("coul", 4),
        ("track", 3), ("suiv", 3), ("obj", 2), ("face", 1), ("faci", 1), ("visag", 1)
    ):
        if k in s:
            return v
    return 1

class HuskyLensV2:
    def __init__(self, i2c=None):
        self._proto = Protocol(I2CTransport(i2c))
        self.current_mode = 1
        self.cached_items = []
        self._t = 0
        self.learned_id = 0
        self._osd = None

    def initI2c(self):
        return self._proto.request(0, 0, pad10(1), retry=20, timeout_ms=300, pause_ms=100) is not None

    def initMode(self, mode):
        algo = _mode_id(mode)
        ok = self._proto.request(0x0A, 0, pad10(algo), retry=3, timeout_ms=2000, pause_ms=1000) is not None
        if ok:
            self.current_mode = algo
            self.cached_items = []
        return ok

    def request(self):
        items = self._proto.fetch_results(self.current_mode)
        if items is not None:
            self.cached_items = items
            self._t = _ms()
        return len(self.cached_items) > 0

    def _find(self, target_id, arrow):
        if not self.cached_items or _diff(_ms(), self._t) > 60:
            self.request()
        tid = int(target_id)
        for it in self.cached_items:
            if it.arrow == arrow and (tid <= 0 or it.id == tid):
                return it
        return None

    def isAppear(self, target_id, item_type):
        is_arr = str(item_type).upper() in ("ARROW", "LINE", "2") or item_type is True
        return self._find(target_id, is_arr) is not None

    def readBox(self, target_id, data):
        it = self._find(target_id, False)
        p = str(data).lower().strip()
        if not it:
            return "" if p in ("name", "content", "5", "6") else 0
        if p in ("x", "1", "xcenter"):
            return it.x
        if p in ("y", "2", "ycenter"):
            return it.y
        if p in ("w", "width", "3"):
            return it.width
        if p in ("h", "height", "4"):
            return it.height
        if p in ("id", "0"):
            return it.id
        if p in ("name", "5"):
            return it.name
        if p in ("content", "6"):
            return it.content
        return it.confidence if p in ("confidence", "level", "7") else 0

    def readArrow(self, target_id, data):
        it = self._find(target_id, True)
        p = str(data).lower().strip()
        if not it:
            return "" if p in ("name", "content", "5", "6") else 0
        if p in ("x", "1", "x_target"):
            return it.x
        if p in ("y", "2", "y_target"):
            return it.y
        if p in ("angle", "3", "w", "width"):
            return it.width
        if p in ("length", "len", "4", "h", "height"):
            return it.height
        if p in ("id", "0"):
            return it.id
        if p in ("name", "5"):
            return it.name
        if p in ("content", "6"):
            return it.content
        return it.confidence if p in ("confidence", "level", "7", "pitch") else 0

    def readId(self):
        return self.readBox(0, "id")

    def count(self, item_type="BOX"):
        if not self.cached_items or _diff(_ms(), self._t) > 60:
            self.request()
        is_arr = str(item_type).upper() in ("ARROW", "LINE", "2") or item_type is True
        n = 0
        for it in self.cached_items:
            if it.arrow == is_arr:
                n += 1
        return n

    def writeLearn1(self):
        # The camera picks the ID itself and returns it in the reply (as DFRobot's sendLearnCommand)
        r = self._proto.request(0x22, self.current_mode, pad10(0))
        self.learned_id = struct.unpack("<h", r[2][2:4])[0] if r and len(r[2]) >= 4 else 0
        return self.learned_id

    def forgetLearn(self):
        return self._proto.request(0x23, self.current_mode, pad10(self.current_mode)) is not None

    def writeName(self, target_id, name):
        t = str(name).encode("utf-8")[:200]
        return self._proto.request(0x0B, self.current_mode, pad10(int(target_id)) + bytes((len(t),)) + t) is not None

    def writeOSD(self, name, x, y):
        # Same text at same place is already on screen: skip, so a forever loop doesn't flood the camera
        if self._osd == (str(name), int(x), int(y)):
            return True
        t = str(name).encode("utf-8")[:200]
        # Same layout as DFRobot's Arduino/pinpong drawText: 0, fontSize, x, y, 0, 0, len, text, 0, color (int32, white)
        data = struct.pack("<BBhh", 0, 24, int(x), int(y)) + bytes(4) + bytes((len(t),)) + t + b"\x00\xFF\xFF\xFF\x00"
        ok = self._proto.request_ok(0x28, 0, data, timeout_ms=2000, pause_ms=100)
        self._osd = (str(name), int(x), int(y)) if ok else None
        return ok

    def clearOSD(self):
        self._osd = None
        return self._proto.request_ok(0x29, 0, b"", timeout_ms=2000, pause_ms=100)

    def saveModelToTFCard(self, command, data):
        cmd = 0x24 if str(command).upper().strip() in ("0", "SAVE", "0X24") or command == 0 else 0x25
        return self._proto.request_ok(cmd, self.current_mode, pad10(int(data) & 0xFF))
