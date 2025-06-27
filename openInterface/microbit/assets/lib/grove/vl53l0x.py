import utime
from micropython import const
import math
from microbit import i2c

_VL53L0X_IIC_ADDR = const(0x29)

# Configuration constants:
_SYSRANGE_START = const(0x00)
_SYSTEM_THRESH_HIGH = const(0x0C)
_SYSTEM_THRESH_LOW = const(0x0E)
_SYSTEM_SEQUENCE_CONFIG = const(0x01)
_SYSTEM_RANGE_CONFIG = const(0x09)
_SYSTEM_INTERMEASUREMENT_PERIOD = const(0x04)
_SYSTEM_INTERRUPT_CONFIG_GPIO = const(0x0A)
_GPIO_HV_MUX_ACTIVE_HIGH = const(0x84)
_SYSTEM_INTERRUPT_CLEAR = const(0x0B)
_RESULT_INTERRUPT_STATUS = const(0x13)
_RESULT_RANGE_STATUS = const(0x14)
_RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN = const(0xBC)
_RESULT_CORE_RANGING_TOTAL_EVENTS_RTN = const(0xC0)
_RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF = const(0xD0)
_RESULT_CORE_RANGING_TOTAL_EVENTS_REF = const(0xD4)
_RESULT_PEAK_SIGNAL_RATE_REF = const(0xB6)
_ALGO_PART_TO_PART_RANGE_OFFSET_MM = const(0x28)
_I2C_SLAVE_DEVICE_ADDRESS = const(0x8A)
_MSRC_CONFIG_CONTROL = const(0x60)
_PRE_RANGE_CONFIG_MIN_SNR = const(0x27)
_PRE_RANGE_CONFIG_VALID_PHASE_LOW = const(0x56)
_PRE_RANGE_CONFIG_VALID_PHASE_HIGH = const(0x57)
_PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT = const(0x64)
_FINAL_RANGE_CONFIG_MIN_SNR = const(0x67)
_FINAL_RANGE_CONFIG_VALID_PHASE_LOW = const(0x47)
_FINAL_RANGE_CONFIG_VALID_PHASE_HIGH = const(0x48)
_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT = const(0x44)
_PRE_RANGE_CONFIG_SIGMA_THRESH_HI = const(0x61)
_PRE_RANGE_CONFIG_SIGMA_THRESH_LO = const(0x62)
_PRE_RANGE_CONFIG_VCSEL_PERIOD = const(0x50)
_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI = const(0x51)
_PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO = const(0x52)
_SYSTEM_HISTOGRAM_BIN = const(0x81)
_HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT = const(0x33)
_HISTOGRAM_CONFIG_READOUT_CTRL = const(0x55)
_FINAL_RANGE_CONFIG_VCSEL_PERIOD = const(0x70)
_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI = const(0x71)
_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO = const(0x72)
_CROSSTALK_COMPENSATION_PEAK_RATE_MCPS = const(0x20)
_MSRC_CONFIG_TIMEOUT_MACROP = const(0x46)
_SOFT_RESET_GO2_SOFT_RESET_N = const(0xBF)
_IDENTIFICATION_MODEL_ID = const(0xC0)
_IDENTIFICATION_REVISION_ID = const(0xC2)
_OSC_CALIBRATE_VAL = const(0xF8)
_GLOBAL_CONFIG_VCSEL_WIDTH = const(0x32)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_0 = const(0xB0)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_1 = const(0xB1)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_2 = const(0xB2)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_3 = const(0xB3)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_4 = const(0xB4)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_5 = const(0xB5)
_GLOBAL_CONFIG_REF_EN_START_SELECT = const(0xB6)
_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD = const(0x4E)
_DYNAMIC_SPAD_REF_EN_START_OFFSET = const(0x4F)
_POWER_MANAGEMENT_GO1_POWER_FORCE = const(0x80)
_VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV = const(0x89)
_ALGO_PHASECAL_LIM = const(0x30)
_ALGO_PHASECAL_CONFIG_TIMEOUT = const(0x30)
_VCSEL_PERIOD_PRE_RANGE = const(0)
_VCSEL_PERIOD_FINAL_RANGE = const(1)

def _decode_timeout(val):
    # format: (LSByte * 2^MSByte) + 1
    return float(val & 0xFF) * math.pow(2.0, ((val & 0xFF00) >> 8)) + 1

def _encode_timeout(timeout_mclks):
    # format: (LSByte * 2^MSByte) + 1
    timeout_mclks = int(timeout_mclks) & 0xFFFF
    ls_byte = 0
    ms_byte = 0
    if timeout_mclks > 0:
        ls_byte = timeout_mclks - 1
        while ls_byte > 255:
            ls_byte >>= 1
            ms_byte += 1
        return ((ms_byte << 8) | (ls_byte & 0xFF)) & 0xFFFF
    return 0

def _timeout_mclks_to_microseconds(timeout_period_mclks, vcsel_period_pclks):
    macro_period_ns = ((2304 * vcsel_period_pclks * 1655) + 500) // 1000
    return ((timeout_period_mclks * macro_period_ns) + (macro_period_ns // 2)) // 1000

def _timeout_microseconds_to_mclks(timeout_period_us, vcsel_period_pclks):
    macro_period_ns = ((2304 * vcsel_period_pclks * 1655) + 500) // 1000
    return ((timeout_period_us * 1000) + (macro_period_ns // 2)) // macro_period_ns

class VL53L0X(object):
    """Driver for the VL53L0X distance sensor"""
    def __init__(self, addr=_VL53L0X_IIC_ADDR, io_timeout_s=1):
        i2c_modules = i2c.scan()
        if addr not in i2c_modules:
            error = "Module VL53L0X non trouvé à l'adresse " + str(hex(addr)) + ". Vérifiez le câblage.\n"
            error += "[Info] Adresses I2C détectées: " + str([hex(a) for a in i2c_modules])
            raise ValueError(error)
        self._addr = addr
        self.io_timeout_s = io_timeout_s

        # Vérification des registres d'identification attendus (section 3.2 de la datasheet)
        if (
            self._read_u8(0xC0) != 0xEE or
            self._read_u8(0xC1) != 0xAA or
            self._read_u8(0xC2) != 0x10
        ):
            raise RuntimeError("Échec lors de la vérification des registres d'identification. Vérifiez le câblage !")

        # Initialisation d'accès au capteur (inspiré du code Arduino de Pololu)
        for pair in ((0x88, 0x00), (0x80, 0x01), (0xFF, 0x01), (0x00, 0x00)):
            self._write_u8(pair[0], pair[1])
        self._stop_variable = self._read_u8(0x91)
        for pair in ((0x00, 0x01), (0xFF, 0x00), (0x80, 0x00)):
            self._write_u8(pair[0], pair[1])
        # Désactivation de certains bits dans _MSRC_CONFIG_CONTROL
        config_control = self._read_u8(_MSRC_CONFIG_CONTROL) | 0x12
        self._write_u8(_MSRC_CONFIG_CONTROL, config_control)
        # Réglage de la limite du signal final à 0.25 MCPS
        self.signal_rate_limit = 0.25
        self._write_u8(_SYSTEM_SEQUENCE_CONFIG, 0xFF)

        spad_count, spad_is_aperture = self._get_spad_info()
        # Lecture de la carte des SPADs
        i2c.write(self._addr, bytearray([_GLOBAL_CONFIG_SPAD_ENABLES_REF_0]))
        buf = i2c.read(self._addr, 6)
        ref_spad_map = bytearray([_GLOBAL_CONFIG_SPAD_ENABLES_REF_0]) + buf

        for pair in (
            (0xFF, 0x01),
            (_DYNAMIC_SPAD_REF_EN_START_OFFSET, 0x00),
            (_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD, 0x2C),
            (0xFF, 0x00),
            (_GLOBAL_CONFIG_REF_EN_START_SELECT, 0xB4),
        ):
            self._write_u8(pair[0], pair[1])

        first_spad_to_enable = 12 if spad_is_aperture else 0
        spads_enabled = 0
        # Parcours de 48 bits pour configurer la carte des SPADs
        for i in range(48):
            if i < first_spad_to_enable or spads_enabled == spad_count:
                ref_spad_map[1 + (i // 8)] &= ~(1 << (i % 8))
            elif (ref_spad_map[1 + (i // 8)] >> (i % 8)) & 0x1:
                spads_enabled += 1
        i2c.write(self._addr, ref_spad_map)

        for pair in (
            (0xFF, 0x01),
            (0x00, 0x00),
            (0xFF, 0x00),
            (0x09, 0x00),
            (0x10, 0x00),
            (0x11, 0x00),
            (0x24, 0x01),
            (0x25, 0xFF),
            (0x75, 0x00),
            (0xFF, 0x01),
            (0x4E, 0x2C),
            (0x48, 0x00),
            (0x30, 0x20),
            (0xFF, 0x00),
            (0x30, 0x09),
            (0x54, 0x00),
            (0x31, 0x04),
            (0x32, 0x03),
            (0x40, 0x83),
            (0x46, 0x25),
            (0x60, 0x00),
            (0x27, 0x00),
            (0x50, 0x06),
            (0x51, 0x00),
            (0x52, 0x96),
            (0x56, 0x08),
            (0x57, 0x30),
            (0x61, 0x00),
            (0x62, 0x00),
            (0x64, 0x00),
            (0x65, 0x00),
            (0x66, 0xA0),
            (0xFF, 0x01),
            (0x22, 0x32),
            (0x47, 0x14),
            (0x49, 0xFF),
            (0x4A, 0x00),
            (0xFF, 0x00),
            (0x7A, 0x0A),
            (0x7B, 0x00),
            (0x78, 0x21),
            (0xFF, 0x01),
            (0x23, 0x34),
            (0x42, 0x00),
            (0x44, 0xFF),
            (0x45, 0x26),
            (0x46, 0x05),
            (0x40, 0x40),
            (0x0E, 0x06),
            (0x20, 0x1A),
            (0x43, 0x40),
            (0xFF, 0x00),
            (0x34, 0x03),
            (0x35, 0x44),
            (0xFF, 0x01),
            (0x31, 0x04),
            (0x4B, 0x09),
            (0x4C, 0x05),
            (0x4D, 0x04),
            (0xFF, 0x00),
            (0x44, 0x00),
            (0x45, 0x20),
            (0x47, 0x08),
            (0x48, 0x28),
            (0x67, 0x00),
            (0x70, 0x04),
            (0x71, 0x01),
            (0x72, 0xFE),
            (0x76, 0x00),
            (0x77, 0x00),
            (0xFF, 0x01),
            (0x0D, 0x01),
            (0xFF, 0x00),
            (0x80, 0x01),
            (0x01, 0xF8),
            (0xFF, 0x01),
            (0x8E, 0x01),
            (0x00, 0x01),
            (0xFF, 0x00),
            (0x80, 0x00),
        ):
            self._write_u8(pair[0], pair[1])

        self._write_u8(_SYSTEM_INTERRUPT_CONFIG_GPIO, 0x04)
        gpio_hv_mux_active_high = self._read_u8(_GPIO_HV_MUX_ACTIVE_HIGH)
        self._write_u8(_GPIO_HV_MUX_ACTIVE_HIGH, gpio_hv_mux_active_high & ~0x10)  # actif en low
        self._write_u8(_SYSTEM_INTERRUPT_CLEAR, 0x01)
        self._measurement_timing_budget_us = self.measurement_timing_budget
        self._write_u8(_SYSTEM_SEQUENCE_CONFIG, 0xE8)
        self.measurement_timing_budget = self._measurement_timing_budget_us
        self._write_u8(_SYSTEM_SEQUENCE_CONFIG, 0x01)
        self._perform_single_ref_calibration(0x40)
        self._write_u8(_SYSTEM_SEQUENCE_CONFIG, 0x02)
        self._perform_single_ref_calibration(0x00)
        # restauration de la séquence initiale
        self._write_u8(_SYSTEM_SEQUENCE_CONFIG, 0xE8)

    # Méthodes d'accès I2C adaptées pour Micro:bit
    def _read_u8(self, address):
        i2c.write(self._addr, bytearray([address & 0xFF]))
        buf = i2c.read(self._addr, 1)
        return buf[0]

    def _read_u16(self, address):
        i2c.write(self._addr, bytearray([address & 0xFF]))
        buf = i2c.read(self._addr, 2)
        return (buf[0] << 8) | buf[1]

    def _write_u8(self, address, val):
        i2c.write(self._addr, bytearray([address & 0xFF, val & 0xFF]))

    def _write_u16(self, address, val):
        i2c.write(self._addr, bytearray([address & 0xFF, (val >> 8) & 0xFF, val & 0xFF]))

    def _get_spad_info(self):
        # Configuration pour lire les SPADs (inspiré du code Arduino)
        for pair in ((0x80, 0x01), (0xFF, 0x01), (0x00, 0x00), (0xFF, 0x06)):
            self._write_u8(pair[0], pair[1])
        self._write_u8(0x83, self._read_u8(0x83) | 0x04)
        for pair in ((0xFF, 0x07), (0x81, 0x01), (0x80, 0x01), (0x94, 0x6B), (0x83, 0x00)):
            self._write_u8(pair[0], pair[1])
        start = utime.ticks_ms()
        while self._read_u8(0x83) == 0x00:
            if self.io_timeout_s > 0 and utime.ticks_diff(utime.ticks_ms(), start) >= self.io_timeout_s * 1000:
                raise RuntimeError("Timeout waiting for VL53L0X!")
        self._write_u8(0x83, 0x01)
        tmp = self._read_u8(0x92)
        count = tmp & 0x7F
        is_aperture = ((tmp >> 7) & 0x01) == 1
        for pair in ((0x81, 0x00), (0xFF, 0x06)):
            self._write_u8(pair[0], pair[1])
        self._write_u8(0x83, self._read_u8(0x83) & ~0x04)
        for pair in ((0xFF, 0x01), (0x00, 0x01), (0xFF, 0x00), (0x80, 0x00)):
            self._write_u8(pair[0], pair[1])
        return (count, is_aperture)

    def _perform_single_ref_calibration(self, vhv_init_byte):
        # Basé sur VL53L0X_perform_single_ref_calibration() de l'API ST.
        self._write_u8(_SYSRANGE_START, 0x01 | (vhv_init_byte & 0xFF))
        start = utime.ticks_ms()
        while (self._read_u8(_RESULT_INTERRUPT_STATUS) & 0x07) == 0:
            if self.io_timeout_s > 0 and utime.ticks_diff(utime.ticks_ms(), start) >= self.io_timeout_s * 1000:
                raise RuntimeError("Timeout waiting for VL53L0X!")
        self._write_u8(_SYSTEM_INTERRUPT_CLEAR, 0x01)
        self._write_u8(_SYSRANGE_START, 0x00)

    def _get_vcsel_pulse_period(self, vcsel_period_type):
        if vcsel_period_type == _VCSEL_PERIOD_PRE_RANGE:
            val = self._read_u8(_PRE_RANGE_CONFIG_VCSEL_PERIOD)
            return ((val + 1) & 0xFF) << 1
        elif vcsel_period_type == _VCSEL_PERIOD_FINAL_RANGE:
            val = self._read_u8(_FINAL_RANGE_CONFIG_VCSEL_PERIOD)
            return ((val + 1) & 0xFF) << 1
        return 255

    def _get_sequence_step_enables(self):
        sequence_config = self._read_u8(_SYSTEM_SEQUENCE_CONFIG)
        tcc = ((sequence_config >> 4) & 0x1) > 0
        dss = ((sequence_config >> 3) & 0x1) > 0
        msrc = ((sequence_config >> 2) & 0x1) > 0
        pre_range = ((sequence_config >> 6) & 0x1) > 0
        final_range = ((sequence_config >> 7) & 0x1) > 0
        return (tcc, dss, msrc, pre_range, final_range)

    def _get_sequence_step_timeouts(self, pre_range):
        pre_range_vcsel_period_pclks = self._get_vcsel_pulse_period(_VCSEL_PERIOD_PRE_RANGE)
        msrc_dss_tcc_mclks = (self._read_u8(_MSRC_CONFIG_TIMEOUT_MACROP) + 1) & 0xFF
        msrc_dss_tcc_us = _timeout_mclks_to_microseconds(msrc_dss_tcc_mclks, pre_range_vcsel_period_pclks)
        pre_range_mclks = _decode_timeout(self._read_u16(_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI))
        pre_range_us = _timeout_mclks_to_microseconds(pre_range_mclks, pre_range_vcsel_period_pclks)
        final_range_vcsel_period_pclks = self._get_vcsel_pulse_period(_VCSEL_PERIOD_FINAL_RANGE)
        final_range_mclks = _decode_timeout(self._read_u16(_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI))
        if pre_range:
            final_range_mclks -= pre_range_mclks
        final_range_us = _timeout_mclks_to_microseconds(final_range_mclks, final_range_vcsel_period_pclks)
        return (msrc_dss_tcc_us, pre_range_us, final_range_us, final_range_vcsel_period_pclks, pre_range_mclks)

    @property
    def signal_rate_limit(self):
        val = self._read_u16(_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT)
        return val / (1 << 7)

    @signal_rate_limit.setter
    def signal_rate_limit(self, val):
        if not (0.0 <= val <= 511.99):
            raise ValueError("La valeur du signal_rate_limit doit être comprise entre 0.0 et 511.99")
        val = int(val * (1 << 7))
        self._write_u16(_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT, val)

    @property
    def measurement_timing_budget(self):
        budget_us = 1910 + 960  # Overheads de début et de fin.
        tcc, dss, msrc, pre_range, final_range = self._get_sequence_step_enables()
        step_timeouts = self._get_sequence_step_timeouts(pre_range)
        msrc_dss_tcc_us, pre_range_us, final_range_us, _, _ = step_timeouts
        if tcc:
            budget_us += msrc_dss_tcc_us + 590
        if dss:
            budget_us += 2 * (msrc_dss_tcc_us + 690)
        elif msrc:
            budget_us += msrc_dss_tcc_us + 660
        if pre_range:
            budget_us += pre_range_us + 660
        if final_range:
            budget_us += final_range_us + 550
        self._measurement_timing_budget_us = budget_us
        return budget_us

    @measurement_timing_budget.setter
    def measurement_timing_budget(self, budget_us):
        if budget_us < 20000:
            raise ValueError("Budget de timing trop petit.")
        used_budget_us = 1320 + 960  # Overheads de début et de fin.
        tcc, dss, msrc, pre_range, final_range = self._get_sequence_step_enables()
        step_timeouts = self._get_sequence_step_timeouts(pre_range)
        msrc_dss_tcc_us, pre_range_us, _ = step_timeouts[:3]
        final_range_vcsel_period_pclks, pre_range_mclks = step_timeouts[3:]
        if tcc:
            used_budget_us += msrc_dss_tcc_us + 590
        if dss:
            used_budget_us += 2 * (msrc_dss_tcc_us + 690)
        elif msrc:
            used_budget_us += msrc_dss_tcc_us + 660
        if pre_range:
            used_budget_us += pre_range_us + 660
        if final_range:
            used_budget_us += 550
            if used_budget_us > budget_us:
                raise ValueError("Budget de timing trop grand.")
            final_range_timeout_us = budget_us - used_budget_us
            final_range_timeout_mclks = _timeout_microseconds_to_mclks(final_range_timeout_us, final_range_vcsel_period_pclks)
            if pre_range:
                final_range_timeout_mclks += pre_range_mclks
            self._write_u16(_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI, _encode_timeout(final_range_timeout_mclks))
            self._measurement_timing_budget_us = budget_us

    def getRangeMillimeters(self):
        """
        Effectue une mesure unique de distance et retourne la distance en millimètres.
        """
        for pair in (
            (0x80, 0x01),
            (0xFF, 0x01),
            (0x00, 0x00),
            (0x91, self._stop_variable),
            (0x00, 0x01),
            (0xFF, 0x00),
            (0x80, 0x00),
            (_SYSRANGE_START, 0x01),
        ):
            self._write_u8(pair[0], pair[1])
        start = utime.ticks_ms()
        while (self._read_u8(_SYSRANGE_START) & 0x01) > 0:
            if self.io_timeout_s > 0 and utime.ticks_diff(utime.ticks_ms(), start) >= self.io_timeout_s * 1000:
                raise RuntimeError("Timeout waiting for VL53L0X!")
        start = utime.ticks_ms()
        while (self._read_u8(_RESULT_INTERRUPT_STATUS) & 0x07) == 0:
            if self.io_timeout_s > 0 and utime.ticks_diff(utime.ticks_ms(), start) >= self.io_timeout_s * 1000:
                raise RuntimeError("Timeout waiting for VL53L0X!")
        range_mm = self._read_u16(_RESULT_RANGE_STATUS + 10)
        self._write_u8(_SYSTEM_INTERRUPT_CLEAR, 0x01)
        return range_mm

    def set_address(self, new_address):
        i2c.write(_I2C_SLAVE_DEVICE_ADDRESS, bytearray([new_address & 0x7F]))