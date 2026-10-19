import math
import utime
import struct


_ODR_MS = {
    "HMC5883L": 80,
    "QMC5883L": 50,
}

_cache = {
    "HMC5883L": (0, 0, 0),
    "QMC5883L": (0, 0, 0),
}


def _configure_hmc5883l(i2c):
    i2c.writeto_mem(0x1E, 0x00, b"\x70")
    i2c.writeto_mem(0x1E, 0x01, b"\x20")
    i2c.writeto_mem(0x1E, 0x02, b"\x00")


def _configure_qmc5883l(i2c):
    i2c.writeto_mem(0x0D, 0x0B, b"\x01")
    i2c.writeto_mem(0x0D, 0x09, b"\x1D")


def _wait_drdy(i2c, address, status_register, timeout_ms):
    deadline = utime.ticks_add(utime.ticks_ms(), timeout_ms)
    while utime.ticks_diff(deadline, utime.ticks_ms()) > 0:
        if i2c.readfrom_mem(address, status_register, 1)[0] & 0x01:
            return True
        utime.sleep_ms(1)
    return False


def _read_hmc5883l(i2c):
    _wait_drdy(i2c, 0x1E, 0x09, _ODR_MS["HMC5883L"])
    data = i2c.readfrom_mem(0x1E, 0x03, 6)
    x, z, y = struct.unpack(">hhh", data)
    if x != 0 or y != 0 or z != 0:
        _cache["HMC5883L"] = (x, y, z)
    return _cache["HMC5883L"]


def _read_qmc5883l(i2c):
    _wait_drdy(i2c, 0x0D, 0x06, _ODR_MS["QMC5883L"])
    data = i2c.readfrom_mem(0x0D, 0x00, 6)
    x, y, z = struct.unpack("<hhh", data)
    if x != 0 or y != 0 or z != 0:
        _cache["QMC5883L"] = (x, y, z)
    return _cache["QMC5883L"]


def detect_magnetometer(i2c):
    """Detect and configure the BN-880 magnetometer."""
    devices = i2c.scan()
    if 0x1E in devices:
        _configure_hmc5883l(i2c)
        return "HMC5883L"
    if 0x0D in devices:
        _configure_qmc5883l(i2c)
        return "QMC5883L"
    error = "Unable to find BN-880 magnetometer (HMC5883L at 0x1e or QMC5883L at 0x0d). Please check connections with the board.\n"
    error += "[Info] I2C address.es detected: " + str([hex(a) for a in devices])
    raise OSError(error)


def read_heading(i2c, sensor_type):
    """Read the magnetic heading in degrees, from 0 to 360."""
    if sensor_type == "HMC5883L":
        x, y, z = _read_hmc5883l(i2c)
    else:
        x, y, z = _read_qmc5883l(i2c)

    if x == 0 and y == 0:
        return 0.0

    angle = math.degrees(math.atan2(y, x))
    return angle % 360
