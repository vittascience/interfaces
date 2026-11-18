# Readable source of huskylens_v2.py (HuskyLens V2 high-level API used by the micro:bit blocks).
# The deployed file is a hand-minified copy of this one (micro:bit RAM is tight):
# any change here must be reported in huskylens_v2.py, and vice versa.

import struct
from huskylens_v2_protocol import I2CTransport, Protocol, pad10, _ms, _diff, ALGORITHM_IDS, _KEYPOINT_NAMES

# Result types
BOX = "BOX"
ARROW = "ARROW"
FRAME = "BOX"
LINE = "ARROW"
# saveModelToTFCard commands
SAVE = 0
LOAD = 1

RESOLUTION_DEFAULT = 0
RESOLUTION_640X480 = 1
RESOLUTION_1280X720 = 2
RESOLUTION_1920X1080 = 3

MEDIA_AUDIO = 1
MEDIA_VIDEO = 2
MEDIA_AUDIO_VIDEO = 3

FONT_SIZES = (20, 24, 26, 27, 28, 32, 36, 40, 48)

DFROBOT_COLORS = {
    "white": 0xFFFFFF,
    "red": 0xFF0000,
    "orange": 0xFFA500,
    "yellow": 0xFFFF00,
    "green": 0x00FF00,
    "cyan": 0x00FFFF,
    "blue": 0x0000FF,
    "purple": 0x800080,
    "pink": 0xFFC0CB,
    "gray": 0x808080,
    "black": 0x000000,
    "brown": 0xA52A2A,
    "olive": 0x808000,
    "teal": 0x008080,
    "indigo": 0x4B0082,
    "magenta": 0xFF00FF,
}

# Mode name fragments -> algorithm id, tested in this order with a substring match
# (order matters: "self_learning" before "class", "line" before "track", "auto_drive_2" before "drive"...).
_ALIASES = [
    ("universal", "0"), ("none", "0"),
    ("self_learning", "6"), ("auto_learning", "6"), ("auto-apprentissage", "6"), ("auto apprentissage", "6"),
    ("instance", "7"), ("segmentation", "7"), ("segment", "7"),
    ("license", "10"), ("plaque", "10"),
    ("ocr", "11"),
    ("emotion", "13"), ("expression", "13"),
    ("gaze", "14"), ("regard", "14"),
    ("orientation", "15"),
    ("gesture", "8"), ("geste", "8"),
    ("qr", "18"),
    ("hand", "8"), ("main", "8"),
    ("pose", "9"),
    ("bar", "17"),
    ("tag", "16"), ("tiq", "16"),
    ("line", "12"), ("lign", "12"),
    ("class", "5"),
    ("color", "4"), ("coul", "4"),
    ("track", "3"), ("suiv", "3"),
    ("depth", "20"), ("profondeur", "20"),
    ("donkey", "21"), ("auto_drive_2", "22"), ("auto_drive_1", "21"), ("drive", "21"),
    ("raw", "22"), ("camera", "22"),
    ("obj", "2"),
    ("face", "1"), ("faci", "1"), ("visag", "1"),
    ("fall", "19"), ("chute", "19"),
]


def _mode_id(mode):
    """Algorithm id from an int, a digit string or a (French or English) mode name. Defaults to 1 (face)."""
    if isinstance(mode, int) or (isinstance(mode, str) and mode.isdigit()):
        return int(mode)
    name = str(mode).lower()
    for fragment, algo_id in _ALIASES:
        if fragment in name:
            return int(algo_id)
    return 1


def _as_text_bytes(value, max_len):
    """UTF-8 bytes of value, truncated to max_len without cutting a multi-byte character."""
    data = str(value).encode("utf-8")
    if len(data) <= max_len:
        return data
    data = data[:max_len]
    while data:
        try:
            data.decode("utf-8")
            break
        except:
            data = data[:-1]
    return data


def _is_arrow(item_type):
    return str(item_type).upper() in ("ARROW", "LINE", "2") or item_type is True


def _clamp_u8(value):
    return max(0, min(255, int(value)))


def _clamp_i16(value):
    return max(-32768, min(32767, int(value)))


def _empty_prop(data):
    """Value returned when no result matches: "" for text properties, 0 otherwise."""
    return "" if str(data).lower() in ("name", "content", "5", "6") else 0


class HuskyLensV2:
    def __init__(self, i2c=None):
        self._proto = Protocol(I2CTransport(i2c))
        self.current_mode = 1
        self.cached_items = []
        self._t = 0                 # time of the last successful request (ms)
        self.learned_id = 0
        self._osd = None            # last OSD text sent, to avoid resending it
        self._multi_algo_count = 0

    # --- Setup ---

    def initI2c(self):
        return self._proto.request_ok(0, 0, pad10(1), retry=20, timeout_ms=300, pause_ms=100)

    def initMode(self, mode):
        algo = _mode_id(mode)
        # Valid ids: 0-22 (built-in) and 128-255 (custom models).
        if algo < 0 or 23 <= algo < 128 or algo > 255:
            return False
        ok = self._proto.request_ok(0x0A, 0, pad10(algo), retry=3, timeout_ms=2000, pause_ms=1000)
        if ok:
            self.current_mode = algo
            self.cached_items = []
        return ok

    # --- Results ---

    def request(self):
        items = self._proto.fetch_results(self.current_mode)
        if items is None:
            self.cached_items = []
            return False
        self.cached_items = items
        self._t = _ms()
        return len(items) > 0

    def _ensure_results(self):
        # Results are cached 60 ms so that several blocks in a row read the same frame.
        if not self.cached_items or _diff(_ms(), self._t) > 60:
            self.request()

    def _items(self, arrow=None):
        self._ensure_results()
        if arrow is None:
            return self.cached_items
        return [it for it in self.cached_items if it.arrow == arrow]

    def _find(self, target_id, arrow):
        """First result of the given type with this id (any id if target_id <= 0)."""
        self._ensure_results()
        tid = int(target_id)
        for it in self.cached_items:
            if it.arrow == arrow and (tid <= 0 or it.id == tid):
                return it
        return None

    def _read_item(self, it, data):
        prop = str(data).lower().strip()
        if not it:
            return _empty_prop(prop)
        if prop in ("x", "1", "xcenter", "x_target", "pitch"):
            return it.x
        if prop in ("y", "2", "ycenter", "y_target", "yaw"):
            return it.y
        if prop in ("w", "width", "3", "angle", "steering", "roll"):
            return it.width
        if prop in ("h", "height", "4", "length", "len", "throttle"):
            return it.height
        if prop in ("id", "0"):
            return it.id
        if prop in ("name", "5"):
            return it.name
        if prop in ("content", "6"):
            return it.content
        if prop in ("confidence", "level", "7"):
            return it.confidence
        return it.algo_id if prop == "algorithm" else 0

    def isAppear(self, target_id, item_type):
        return self._find(target_id, _is_arrow(item_type)) is not None

    def getResultById(self, tid, item_type=BOX, data="id"):
        return self._read_item(self._find(tid, _is_arrow(item_type)), data)

    def readBox(self, tid, data):
        return self.getResultById(tid, False, data)

    def readArrow(self, tid, data):
        return self.getResultById(tid, True, data)

    def readId(self):
        return self.readBox(0, "id")

    def count(self, item_type=BOX):
        return len(self._items(_is_arrow(item_type)))

    def getResultByIndex(self, idx, item_type=BOX, data="id"):
        items = self._items(_is_arrow(item_type))
        idx = int(idx)
        if 0 <= idx < len(items):
            return self._read_item(items[idx], data)
        return _empty_prop(data)

    def getCenterResult(self, item_type=BOX, data="id"):
        """Result closest to the image center (640x480)."""
        items = self._items(_is_arrow(item_type))
        if not items:
            return _empty_prop(data)
        return self._read_item(min(items, key=lambda it: (it.x - 320) ** 2 + (it.y - 240) ** 2), data)

    def getLargestResult(self, item_type=BOX, data="id"):
        items = self._items(_is_arrow(item_type))
        if not items:
            return _empty_prop(data)
        return self._read_item(max(items, key=lambda it: max(0, it.width) * max(0, it.height)), data)

    # The largest result is considered the nearest one.
    getNearestResult = getLargestResult

    def getVisibleIds(self, item_type=BOX):
        ids = []
        for it in self._items(_is_arrow(item_type)):
            if it.id not in ids:
                ids.append(it.id)
        return ids

    def getVisibleId(self, idx, item_type=BOX):
        ids = self.getVisibleIds(item_type)
        idx = int(idx)
        return ids[idx] if 0 <= idx < len(ids) else 0

    def getVisibleIdCount(self, item_type=BOX):
        return len(self.getVisibleIds(item_type))

    def countById(self, tid, item_type=BOX):
        return sum(1 for it in self._items(_is_arrow(item_type)) if it.id == int(tid))

    # --- Line tracking: the first arrow is the current line, the next ones are the branches ---

    def getUpcomingBranchCount(self):
        return max(0, len(self._items(True)) - 1)

    getBranchCount = getUpcomingBranchCount

    def getBranchByIndex(self, idx, data="angle"):
        items = self._items(True)
        idx = int(idx) + 1
        return self._read_item(items[idx], data) if 1 <= idx < len(items) else 0

    def getKeypoint(self, idx, axis="x", item_type=BOX, tid=0):
        it = self._find(tid, _is_arrow(item_type))
        if not it:
            return 0
        names = _KEYPOINT_NAMES.get(it.algo_id, ())
        idx = int(idx)
        if idx < 0 or idx >= len(names):
            return 0
        suffix = "y" if str(axis).lower() in ("y", "1", "vertical") else "x"
        return it.keypoints.get(names[idx] + "_" + suffix, 0)

    def getFaceOrientation(self, axis, tid=0):
        return self.readBox(tid, axis)

    # --- Learning ---

    def writeLearn1(self):
        response = self._proto.request(0x22, self.current_mode, pad10(0))
        if response and len(response[2]) >= 4 and response[2][1] == 0:
            self.learned_id = struct.unpack("<h", response[2][2:4])[0]
        else:
            self.learned_id = 0
        return self.learned_id

    def learnBlock(self, x, y, w, h):
        data = bytes(2) + struct.pack("<hhhh", _clamp_i16(x), _clamp_i16(y), _clamp_i16(w), _clamp_i16(h))
        response = self._proto.request(0x2C, self.current_mode, data)
        if response and len(response[2]) >= 4 and response[2][1] == 0:
            self.learned_id = struct.unpack("<h", response[2][2:4])[0]
        else:
            self.learned_id = 0
        return self.learned_id

    def forgetLearn(self):
        return self._proto.request_ok(0x23, self.current_mode, pad10(self.current_mode))

    def writeName(self, tid, name):
        text = _as_text_bytes(name, 32)
        return self._proto.request_ok(0x0B, self.current_mode, pad10(int(tid)) + bytes((len(text),)) + text)

    # --- Screen drawing ---

    def writeOSD(self, name, x, y, font_size=24, color=0xFFFFFF):
        font_size = int(font_size) if int(font_size) in FONT_SIZES else 24
        text = _as_text_bytes(name, 100)
        state = (str(name), int(x), int(y), font_size, int(color) & 0xFFFFFFFF)
        if self._osd == state:
            return True  # same text already displayed
        data = (bytes((0, font_size))
                + struct.pack("<hh", _clamp_i16(x), _clamp_i16(y))
                + bytes(4)
                + bytes((len(text),)) + text + b"\x00"
                + struct.pack("<I", int(color) & 0xFFFFFFFF)
                + bytes(4))
        ok = self._proto.request_ok(0x28, 0, data, timeout_ms=2000, pause_ms=100)
        self._osd = state if ok else None
        return ok

    def clearOSD(self):
        self._osd = None
        return self._proto.request_ok(0x29, 0, b"", timeout_ms=2000, pause_ms=100)

    def _rect(self, cmd, x, y, w, h, color, line_width):
        data = struct.pack("<BBhhhhHI", 0, _clamp_u8(line_width),
                           _clamp_i16(x), _clamp_i16(y), _clamp_i16(w), _clamp_i16(h),
                           0, int(color) & 0xFFFFFFFF)
        return self._proto.request_ok(cmd, 0, data)

    def drawRect(self, x, y, w, h, color=0xFFFFFF, line_width=1):
        return self._rect(0x26, x, y, w, h, color, line_width)

    def clearRect(self):
        return self._proto.request_ok(0x27, 0, b"")

    def drawUniqueRect(self, x, y, w, h, color=0xFFFFFF, line_width=1):
        return self._rect(0x2D, x, y, w, h, color, line_width)

    # --- Commands returning data ---

    def _return_args(self, cmd, algo=0, data=b""):
        response = self._proto.request(cmd, algo, data, expect=0x1A, timeout_ms=1000)
        if response and len(response[2]) >= 10 and response[2][1] == 0:
            return response[2]
        return None

    def _return_string(self, data):
        """String stored at offset 10 (length byte) / 11 (content) of a response."""
        if not data or len(data) < 11:
            return ""
        value_len = data[10]
        if 11 + value_len <= len(data):
            return data[11:11 + value_len].decode("utf-8", "ignore")
        return ""

    # --- Media ---

    def takePhoto(self, res=2):
        res = int(res) if int(res) in (0, 1, 2, 3) else 0
        return self._return_string(self._return_args(0x20, 0, pad10(res)))

    def takeScreenshot(self):
        return self._return_string(self._return_args(0x21, 0, b""))

    def playMusic(self, name, vol=100):
        text = _as_text_bytes(name, 100)
        data = bytes(2) + struct.pack("<h", _clamp_i16(vol)) + bytes(6) + bytes((len(text),)) + text
        return self._proto.request_ok(0x2A, 0, data)

    def startRecording(self, res=0, media=3, dur=0, fn=""):
        res, media = int(res), int(media)
        if res not in (0, 1, 2, 3) or media not in (1, 2, 3):
            return False
        text = _as_text_bytes(fn, 100)
        data = struct.pack("<BBh", res, media, _clamp_i16(dur)) + bytes(10)  # no "x" pad code: unsupported by the micro:bit MicroPython
        if text:
            data = data + bytes((len(text),)) + text
        return self._proto.request_ok(0x2E, 0, data)

    def stopRecording(self, media=3):
        media = int(media)
        if media not in (1, 2, 3):
            return False
        return self._proto.request_ok(0x2F, 0, bytes((0, media)) + bytes(12))

    # --- Knowledge (learned data) on the SD card, banks 0 to 4 ---

    def saveKnowledge(self, bank):
        bank = int(bank)
        if not 0 <= bank <= 4:
            return False
        return self._proto.request_ok(0x24, self.current_mode, pad10(bank))

    def loadKnowledge(self, bank):
        bank = int(bank)
        if not 0 <= bank <= 4:
            return False
        return self._proto.request_ok(0x25, self.current_mode, pad10(bank))

    saveKnowledges = saveKnowledge
    loadKnowledges = loadKnowledge

    def saveModelToTFCard(self, cmd, data):
        command = str(cmd).upper().strip()
        if command in ("0", "SAVE", "0X24") or cmd == 0:
            return self.saveKnowledge(data)
        return self.loadKnowledge(data)

    # --- Multi-algorithm mode ---

    def setMultiAlgorithm(self, a0, a1, a2=0):
        requested = [int(a0), int(a1), int(a2)]
        if any(a < 0 or a > 255 or 23 <= a < 128 for a in requested):
            return False
        algos = [a for a in requested if a]
        if len(algos) < 2:
            return False
        count = len(algos)
        algos += [0] * (3 - count)
        data = bytes((count, 0)) + struct.pack("<HHH", algos[0], algos[1], algos[2]) + bytes(6)
        ok = self._proto.request_ok(0x0C, 0, data)
        if ok:
            self._multi_algo_count = count
        return ok

    def setMultiAlgorithmRatio(self, r0, r1, r2=0):
        ratios = [max(0, min(100, int(r))) for r in (r0, r1, r2)]
        count = self._multi_algo_count or (3 if ratios[2] else 2)
        data = bytes((count, 0)) + struct.pack("<HHH", ratios[0], ratios[1], ratios[2]) + bytes(6)
        return self._proto.request_ok(0x0D, 0, data)

    # --- Algorithm parameters (aid = 0: current algorithm) ---

    def getAlgoParam(self, key, vt="string", aid=0):
        key_bytes = _as_text_bytes(key, 100)
        data = bytes(14) + bytes((len(key_bytes),)) + key_bytes + b"\x00"
        algo = self.current_mode if int(aid) == 0 else int(aid)
        response = self._return_args(0x02, algo, data)
        if response is None:
            return "" if str(vt).lower() == "string" else 0
        kind = str(vt).lower()
        if kind in ("bool", "boolean"):
            return len(response) >= 4 and struct.unpack("<h", response[2:4])[0] != 0
        if kind in ("int", "integer", "number"):
            return struct.unpack("<h", response[2:4])[0] if len(response) >= 4 else 0
        if kind in ("float", "decimal"):
            return struct.unpack("<f", response[2:6])[0] if len(response) >= 6 else 0.0
        return self._return_string(response)

    def setAlgoParam(self, key, val, vt="string", aid=0):
        key_bytes = _as_text_bytes(key, 70)
        kind = str(vt).lower()
        if kind in ("bool", "boolean", "int", "integer"):
            number = int(bool(val)) if kind in ("bool", "boolean") else _clamp_i16(val)
            data = bytes((1, 0)) + struct.pack("<h", number) + bytes(10) + bytes((len(key_bytes),)) + key_bytes + b"\x00"
        elif kind in ("float", "decimal", "number"):
            data = bytes((2, 0)) + struct.pack("<f", float(val)) + bytes(8) + bytes((len(key_bytes),)) + key_bytes + b"\x00"
        else:
            value_bytes = _as_text_bytes(val, 100)
            if len(key_bytes) + len(value_bytes) + 16 > 122:  # keep the frame under MAX_FRAME_SIZE
                value_bytes = value_bytes[:max(0, 106 - len(key_bytes))]
            data = bytes(14) + bytes((len(key_bytes),)) + key_bytes + bytes((len(value_bytes),)) + value_bytes
        algo = self.current_mode if int(aid) == 0 else int(aid)
        return self._proto.request_ok(0x0E, algo, data)

    def updateAlgoParams(self, aid=0):
        algo = self.current_mode if int(aid) == 0 else int(aid)
        return self._proto.request_ok(0x0F, algo, b"")

    def exit(self):
        return self._proto.request_ok(0x2B, 0, b"")


HuskyLens = HuskyLensV2
huskylens = HuskyLensV2()
