# HuskyLens V2, I2C protocol layer.

import struct
import time

# Time helpers: MicroPython provides ticks_ms/ticks_diff/sleep_ms, CPython does not.
if hasattr(time, "ticks_ms"):
    _ms = time.ticks_ms
    _diff = time.ticks_diff
    _sleep = time.sleep_ms
else:
    _ms = lambda: int(time.time() * 1000)
    _diff = lambda a, b: a - b
    _sleep = lambda ms: time.sleep(ms / 1000)

# Frame: 0x55 0xAA | cmd | algo | data length | data... | checksum (sum of previous bytes & 0xFF)
HEADER = b"\x55\xAA"
MAX_FRAME_SIZE = 128
MAX_RESULT_NUM = 6       # results kept per request
FIXED_DATA_SIZE = 14     # result payload with confidence (float)
MIN_DATA_SIZE = 10       # result payload without confidence

I2C_ADDRESS = 0x50

ALGORITHM_IDS = {
    "universal": 0,
    "face_recognition": 1,
    "object_recognition": 2,
    "object_tracking": 3,
    "color_recognition": 4,
    "object_classification": 5,
    "self_learning_classification": 6,
    "instance_segmentation": 7,
    "segment": 7,
    "hand_recognition": 8,
    "gesture_recognition": 8,
    "pose_recognition": 9,
    "license_recognition": 10,
    "ocr_recognition": 11,
    "line_tracking": 12,
    "emotion_recognition": 13,
    "gaze_recognition": 14,
    "face_orientation": 15,
    "tag_recognition": 16,
    "barcode_recognition": 17,
    "qr_code_recognition": 18,
    "fall_recognition": 19,
    "depth_detection": 20,
    "donkeycar": 21,
    "auto_drive_1": 21,
    "auto_drive_2": 22,
    "camera": 22,
    "raw_camera": 22,
}

# Keypoint names per algorithm id (face = 1, hand = 8, pose = 9), in the order sent by the camera.
_KEYPOINT_NAMES = {
    1: ["leye", "reye", "nose", "lmouth", "rmouth"],
    8: [
        "wrist",
        "thumb_cmc", "thumb_mcp", "thumb_ip", "thumb_tip",
        "index_finger_mcp", "index_finger_pip", "index_finger_dip", "index_finger_tip",
        "middle_finger_mcp", "middle_finger_pip", "middle_finger_dip", "middle_finger_tip",
        "ring_finger_mcp", "ring_finger_pip", "ring_finger_dip", "ring_finger_tip",
        "pinky_finger_mcp", "pinky_finger_pip", "pinky_finger_dip", "pinky_finger_tip",
    ],
    9: [
        "nose", "leye", "reye", "lear", "rear",
        "lshoulder", "rshoulder", "lelbow", "relbow", "lwrist", "rwrist",
        "lhip", "rhip", "lknee", "rknee", "lankle", "rankle",
    ],
}


def pad14(value=0):
    """Command payload: one byte value followed by 13 zero bytes."""
    return bytes((value & 0xFF,)) + bytes(13)


pad10 = pad14


def _txt(data):
    return str(data.decode()).rstrip("\x00")


class Item:
    """One detection result (box or arrow) decoded from a result frame."""

    __slots__ = ("id", "algo_id", "confidence", "x", "y", "width", "height",
                 "name", "content", "arrow", "private_data", "keypoints")

    def __init__(self, data, arrow, data_size=FIXED_DATA_SIZE):
        self.id = data[0]
        self.algo_id = data[1]
        self.x, self.y, self.width, self.height = struct.unpack("<hhhh", data[2:10])
        self.arrow = arrow
        if arrow or data_size == MIN_DATA_SIZE:
            self.confidence = 0.0
        else:
            self.confidence = struct.unpack("<f", data[10:14])[0]

        # Optional trailer: name length + name, content length + content, then private data.
        self.name = ""
        self.content = ""
        self.private_data = b""
        idx = data_size
        if len(data) > idx:
            name_len = data[idx]
            idx += 1
            if len(data) >= idx + name_len:
                self.name = _txt(data[idx:idx + name_len])
                idx += name_len
                if len(data) > idx:
                    content_len = data[idx]
                    idx += 1
                    if len(data) >= idx + content_len:
                        self.content = _txt(data[idx:idx + content_len])
                        self.private_data = data[idx + content_len:]

        # Keypoints are int16 (x, y) pairs stored in private data.
        self.keypoints = {}
        names = _KEYPOINT_NAMES.get(self.algo_id, ())
        if names and len(self.private_data) >= len(names) * 4:
            values = struct.unpack("<" + "h" * (len(names) * 2), self.private_data[:len(names) * 4])
            for i, point in enumerate(names):
                self.keypoints[point + "_x"] = values[i * 2]
                self.keypoints[point + "_y"] = values[i * 2 + 1]

    # Aliases: the same fields carry different meanings depending on the algorithm.
    w = property(lambda self: self.width)
    h = property(lambda self: self.height)
    angle = property(lambda self: self.width)       # arrow
    length = property(lambda self: self.height)     # arrow
    x_target = property(lambda self: self.x)
    y_target = property(lambda self: self.y)
    pitch = property(lambda self: self.x)           # face orientation
    yaw = property(lambda self: self.y)
    roll = property(lambda self: self.width)


class I2CTransport:
    """Raw I2C access, compatible with the micro:bit API (read/write) and machine.I2C (readfrom/writeto)."""

    def __init__(self, i2c=None):
        if not i2c:
            import sys
            if sys.platform == "microbit":
                import microbit
                i2c = microbit.i2c
                i2c.init()
            elif sys.platform in ("esp32", "rp2"):
                import machine
                i2c = machine.I2C(0)
        self.i2c = i2c
        self._mb = hasattr(i2c, "read") and not hasattr(i2c, "readfrom")

    def write(self, data):
        if not self.i2c:
            return False
        try:
            if self._mb:
                self.i2c.write(I2C_ADDRESS, data)
            else:
                self.i2c.writeto(I2C_ADDRESS, data)
            return True
        except OSError:
            return False

    def read(self, n):
        if not self.i2c:
            return b""
        try:
            if self._mb:
                return self.i2c.read(I2C_ADDRESS, n)
            return self.i2c.readfrom(I2C_ADDRESS, n)
        except OSError:
            return b""


class Protocol:
    """Frame encoding/decoding and request/response handling."""

    def __init__(self, transport):
        self.t = transport
        self.buf = b""

    def send(self, cmd, algo=0, data=b""):
        data = bytes(data)
        if len(data) > min(255, MAX_FRAME_SIZE - 6):
            return False
        frame = HEADER + bytes((cmd & 0xFF, algo & 0xFF, len(data))) + data
        return self.t.write(frame + bytes((sum(frame) & 0xFF,)))

    def _find_hdr(self, buf):
        for k in range(len(buf) - 1):
            if buf[k] == 0x55 and buf[k + 1] == 0xAA:
                return k
        return -1

    def _extract(self):
        """Pop the next valid frame from the buffer: (cmd, algo, data), or None if incomplete."""
        buf = self.buf
        while True:
            i = self._find_hdr(buf)
            if i < 0:
                # Keep a trailing 0x55: it may be the first byte of the next header.
                self.buf = buf[-1:] if buf[-1:] == b"\x55" else b""
                return None
            if i > 0:
                buf = buf[i:]
            if len(buf) < 5:
                self.buf = buf
                return None
            total = 6 + buf[4]
            if total > MAX_FRAME_SIZE:
                buf = buf[2:]  # invalid length: skip this header
                continue
            if len(buf) < total:
                self.buf = buf
                return None
            packet, buf = buf[:total], buf[total:]
            if (sum(packet[:-1]) & 0xFF) == packet[-1]:
                self.buf = buf
                return packet[2], packet[3], packet[5:-1]
            buf = buf[2:]  # bad checksum: skip this header

    def receive(self, expect=None, timeout_ms=300):
        """Wait for a frame whose command is `expect` (any frame if None); other frames are dropped."""
        t0 = _ms()
        while True:
            frame = self._extract()
            while frame is not None:
                if expect is None or frame[0] == expect:
                    return frame
                frame = self._extract()
            if _diff(_ms(), t0) >= timeout_ms:
                return None
            chunk = self.t.read(32)
            if chunk:
                self.buf += bytes(chunk)
            else:
                _sleep(10)

    def request(self, cmd, algo=0, data=b"", expect=0x1A, retry=3, timeout_ms=300, pause_ms=0):
        for _ in range(retry):
            if not self.send(cmd, algo, data):
                _sleep(pause_ms or 100)
                continue
            if pause_ms:
                _sleep(pause_ms)
            response = self.receive(expect, timeout_ms)
            if response is not None:
                return response
        return None

    def request_ok(self, cmd, algo=0, data=b"", min_data=MIN_DATA_SIZE, **kw):
        """True if the camera answered with a status byte (data[1]) equal to 0."""
        response = self.request(cmd, algo, data, **kw)
        return response is not None and len(response[2]) >= min_data and response[2][1] == 0

    def fetch_results(self, algo):
        """Request the current results: None on communication error, else a list of Item."""
        response = self.request(1, algo, b"", expect=0x1B, retry=2, timeout_ms=1000)
        if not response:
            return None
        data_size = len(response[2])
        if data_size not in (MIN_DATA_SIZE, FIXED_DATA_SIZE):
            return []
        total_results = struct.unpack("<H", response[2][2:4])[0]
        total_blocks = struct.unpack("<H", response[2][6:8])[0]
        total_results = min(total_results, 10)
        total_blocks = min(total_blocks, total_results)
        items = []
        # Blocks come first (0x1C), then arrows (0x1D). All frames are read to drain the camera.
        for k in range(total_results):
            is_arrow = k >= total_blocks
            frame = self.receive(0x1D if is_arrow else 0x1C, 300)
            if not frame:
                break
            if len(items) < MAX_RESULT_NUM and len(frame[2]) >= data_size:
                items.append(Item(frame[2], is_arrow, data_size))
        return items
