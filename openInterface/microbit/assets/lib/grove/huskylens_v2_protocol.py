import struct, time

if hasattr(time, "ticks_ms"):
    _ms, _diff, _sleep = time.ticks_ms, time.ticks_diff, time.sleep_ms
else:
    _ms = lambda: int(time.time() * 1000)
    _diff = lambda a, b: a - b
    _sleep = lambda ms: time.sleep(ms / 1000)

HEADER = b"\x55\xAA"

def pad10(v=0):
    return bytes((v & 0xFF,)) + bytes(9)

def _txt(d):
    return str(d.decode()).rstrip("\x00")

class Item:
    __slots__ = ("id", "confidence", "x", "y", "width", "height", "name", "content", "arrow")

    def __init__(self, d, arrow):
        self.id, self.confidence, self.x, self.y, self.width, self.height = struct.unpack("<BBhhhh", d[:10])
        self.arrow = arrow
        self.name = ""
        self.content = ""
        if len(d) > 10 and len(d) >= 11 + d[10]:
            if d[10]:
                self.name = _txt(d[11:11 + d[10]])
            idx = 11 + d[10]
            if len(d) > idx and d[idx] and len(d) >= idx + 1 + d[idx]:
                self.content = _txt(d[idx + 1:idx + 1 + d[idx]])

    @property
    def w(self):
        return self.width

    @property
    def h(self):
        return self.height

    @property
    def angle(self):
        return self.width

    @property
    def length(self):
        return self.height

    @property
    def x_target(self):
        return self.x

    @property
    def y_target(self):
        return self.y

class I2CTransport:
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

    def write(self, d):
        if not self.i2c:
            return False
        try:
            if self._mb:
                self.i2c.write(0x50, d)
            else:
                self.i2c.writeto(0x50, d)
            return True
        except OSError:
            return False

    def read(self, n):
        if not self.i2c:
            return b""
        try:
            if self._mb:
                return self.i2c.read(0x50, n)
            return self.i2c.readfrom(0x50, n)
        except OSError:
            return b""

class Protocol:
    def __init__(self, transport):
        self.t = transport
        self.buf = b""

    def send(self, cmd, algo=0, data=b""):
        data = bytes(data)[:255]
        f = HEADER + bytes((cmd & 0xFF, algo & 0xFF, len(data))) + data
        return self.t.write(f + bytes((sum(f) & 0xFF,)))

    def _find_hdr(self, b):
        for k in range(len(b) - 1):
            if b[k] == 0x55 and b[k + 1] == 0xAA:
                return k
        return -1

    def _extract(self):
        b = self.buf
        while True:
            i = self._find_hdr(b)
            if i < 0:
                self.buf = b[-1:] if b[-1:] == b"\x55" else b""
                return None
            if i > 0:
                b = b[i:]
            if len(b) < 5:
                self.buf = b
                return None
            tot = 6 + b[4]
            if tot > 128:
                b = b[2:]
                continue
            if len(b) < tot:
                self.buf = b
                return None
            p = b[:tot]
            b = b[tot:]
            if (sum(p[:-1]) & 0xFF) == p[-1]:
                self.buf = b
                return p[2], p[3], p[5:-1]
            b = b[2:]

    def receive(self, expect=None, timeout_ms=300):
        t0 = _ms()
        while True:
            f = self._extract()
            while f is not None:
                if expect is None or f[0] == expect:
                    return f
                f = self._extract()
            if _diff(_ms(), t0) >= timeout_ms:
                return None
            c = self.t.read(32)
            if c:
                self.buf = self.buf + bytes(c)
            else:
                _sleep(10)

    def request(self, cmd, algo=0, data=b"", expect=0x1A, retry=3, timeout_ms=300, pause_ms=0):
        for _ in range(retry):
            if not self.send(cmd, algo, data):
                _sleep(pause_ms or 100)
                continue
            if pause_ms:
                _sleep(pause_ms)
            r = self.receive(expect, timeout_ms)
            if r is not None:
                return r
        return None

    def request_ok(self, cmd, algo=0, data=b"", **kw):
        r = self.request(cmd, algo, data, **kw)
        return r is not None and len(r[2]) >= 2 and r[2][1] == 0

    def fetch_results(self, algo):
        r = self.request(1, algo, b"", expect=0x1B, retry=2, timeout_ms=1000)
        if not r:
            return None
        if len(r[2]) < 10:
            return []
        tot_res = struct.unpack("<h", r[2][2:4])[0]
        tot_blk = struct.unpack("<h", r[2][6:8])[0]
        items = []
        for k in range(tot_res):
            is_arr = k >= tot_blk
            f = self.receive(0x1D if is_arr else 0x1C, 300)
            if not f:
                break
            if len(items) < 6 and len(f[2]) >= 10:
                items.append(Item(f[2], is_arr))
        return items
