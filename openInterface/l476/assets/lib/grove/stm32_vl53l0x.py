# SPDX-FileCopyrightText: 2017 Tony DiCola for Adafruit Industries
# SPDX-License-Identifier: MIT
#
# Modified by Kevin Zhu to work on the ESP32 running Micropython 1.14
# Modified by Salvatore Sanfilippo for non-blocking API.
#
# This code is released under the MIT license.

_A='Timeout waiting for VL53L0X!'
import utime
from micropython import const
import math
_VL53L0X_IIC_ADDR=const(41)
_SYSRANGE_START=const(0)
_SYSTEM_THRESH_HIGH=const(12)
_SYSTEM_THRESH_LOW=const(14)
_SYSTEM_SEQUENCE_CONFIG=const(1)
_SYSTEM_RANGE_CONFIG=const(9)
_SYSTEM_INTERMEASUREMENT_PERIOD=const(4)
_SYSTEM_INTERRUPT_CONFIG_GPIO=const(10)
_GPIO_HV_MUX_ACTIVE_HIGH=const(132)
_SYSTEM_INTERRUPT_CLEAR=const(11)
_RESULT_INTERRUPT_STATUS=const(19)
_RESULT_RANGE_STATUS=const(20)
_RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN=const(188)
_RESULT_CORE_RANGING_TOTAL_EVENTS_RTN=const(192)
_RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF=const(208)
_RESULT_CORE_RANGING_TOTAL_EVENTS_REF=const(212)
_RESULT_PEAK_SIGNAL_RATE_REF=const(182)
_ALGO_PART_TO_PART_RANGE_OFFSET_MM=const(40)
_I2C_SLAVE_DEVICE_ADDRESS=const(138)
_MSRC_CONFIG_CONTROL=const(96)
_PRE_RANGE_CONFIG_MIN_SNR=const(39)
_PRE_RANGE_CONFIG_VALID_PHASE_LOW=const(86)
_PRE_RANGE_CONFIG_VALID_PHASE_HIGH=const(87)
_PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT=const(100)
_FINAL_RANGE_CONFIG_MIN_SNR=const(103)
_FINAL_RANGE_CONFIG_VALID_PHASE_LOW=const(71)
_FINAL_RANGE_CONFIG_VALID_PHASE_HIGH=const(72)
_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT=const(68)
_PRE_RANGE_CONFIG_SIGMA_THRESH_HI=const(97)
_PRE_RANGE_CONFIG_SIGMA_THRESH_LO=const(98)
_PRE_RANGE_CONFIG_VCSEL_PERIOD=const(80)
_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI=const(81)
_PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO=const(82)
_SYSTEM_HISTOGRAM_BIN=const(129)
_HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT=const(51)
_HISTOGRAM_CONFIG_READOUT_CTRL=const(85)
_FINAL_RANGE_CONFIG_VCSEL_PERIOD=const(112)
_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI=const(113)
_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO=const(114)
_CROSSTALK_COMPENSATION_PEAK_RATE_MCPS=const(32)
_MSRC_CONFIG_TIMEOUT_MACROP=const(70)
_SOFT_RESET_GO2_SOFT_RESET_N=const(191)
_IDENTIFICATION_MODEL_ID=const(192)
_IDENTIFICATION_REVISION_ID=const(194)
_OSC_CALIBRATE_VAL=const(248)
_GLOBAL_CONFIG_VCSEL_WIDTH=const(50)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_0=const(176)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_1=const(177)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_2=const(178)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_3=const(179)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_4=const(180)
_GLOBAL_CONFIG_SPAD_ENABLES_REF_5=const(181)
_GLOBAL_CONFIG_REF_EN_START_SELECT=const(182)
_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD=const(78)
_DYNAMIC_SPAD_REF_EN_START_OFFSET=const(79)
_POWER_MANAGEMENT_GO1_POWER_FORCE=const(128)
_VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV=const(137)
_ALGO_PHASECAL_LIM=const(48)
_ALGO_PHASECAL_CONFIG_TIMEOUT=const(48)
_VCSEL_PERIOD_PRE_RANGE=const(0)
_VCSEL_PERIOD_FINAL_RANGE=const(1)
def _decode_timeout(val):return float(val&255)*math.pow(2.,(val&65280)>>8)+1
def _encode_timeout(timeout_mclks):
	timeout_mclks=int(timeout_mclks)&65535;ls_byte=0;ms_byte=0
	if timeout_mclks>0:
		ls_byte=timeout_mclks-1
		while ls_byte>255:ls_byte>>=1;ms_byte+=1
		return(ms_byte<<8|ls_byte&255)&65535
	return 0
def _timeout_mclks_to_microseconds(timeout_period_mclks,vcsel_period_pclks):macro_period_ns=(2304*vcsel_period_pclks*1655+500)//1000;return(timeout_period_mclks*macro_period_ns+macro_period_ns//2)//1000
def _timeout_microseconds_to_mclks(timeout_period_us,vcsel_period_pclks):macro_period_ns=(2304*vcsel_period_pclks*1655+500)//1000;return(timeout_period_us*1000+macro_period_ns//2)//macro_period_ns
class VL53L0X:
	def __init__(self,i2c,addr=_VL53L0X_IIC_ADDR,io_timeout_s=0):
		if i2c==None:raise ValueError("I2C object 'VL53L0X' needed as argument!")
		self._i2c=i2c;i2cModules=self._i2c.scan()
		if addr not in i2cModules:error="Unable to find module 'VL53L0X' at address "+str(hex(addr))+'. Please check connections with the board.\n';error+='[Info] I2C address.es detected: '+str([hex(a)for a in i2cModules]);raise ValueError(error)
		self._addr=addr;self.io_timeout_s=io_timeout_s
		if self._read_u8(192)is not 238 or self._read_u8(193)is not 170 or self._read_u8(194)is not 16:raise RuntimeError('Failed to find expected ID register values. Check wiring!')
		for pair in((136,0),(128,1),(255,1),(0,0)):self._write_u8(pair[0],pair[1])
		self._stop_variable=self._read_u8(145)
		for pair in((0,1),(255,0),(128,0)):self._write_u8(pair[0],pair[1])
		config_control=self._read_u8(_MSRC_CONFIG_CONTROL)|18;self._write_u8(_MSRC_CONFIG_CONTROL,config_control);self.signal_rate_limit=.25;self._write_u8(_SYSTEM_SEQUENCE_CONFIG,255);spad_count,spad_is_aperture=self._get_spad_info();ref_spad_map=bytearray(1);ref_spad_map[0]=_GLOBAL_CONFIG_SPAD_ENABLES_REF_0;self._i2c.writeto(self._addr,ref_spad_map);buf=bytearray(6);self._i2c.readfrom_mem_into(self._addr,ref_spad_map[0],buf);ref_spad_map.extend(buf)
		for pair in((255,1),(_DYNAMIC_SPAD_REF_EN_START_OFFSET,0),(_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD,44),(255,0),(_GLOBAL_CONFIG_REF_EN_START_SELECT,180)):self._write_u8(pair[0],pair[1])
		first_spad_to_enable=12 if spad_is_aperture else 0;spads_enabled=0
		for i in range(48):
			if i<first_spad_to_enable or spads_enabled==spad_count:ref_spad_map[1+i//8]&=~(1<<i%8)
			elif ref_spad_map[1+i//8]>>i%8&1>0:spads_enabled+=1
		self._i2c.writeto(self._addr,ref_spad_map)
		for pair in((255,1),(0,0),(255,0),(9,0),(16,0),(17,0),(36,1),(37,255),(117,0),(255,1),(78,44),(72,0),(48,32),(255,0),(48,9),(84,0),(49,4),(50,3),(64,131),(70,37),(96,0),(39,0),(80,6),(81,0),(82,150),(86,8),(87,48),(97,0),(98,0),(100,0),(101,0),(102,160),(255,1),(34,50),(71,20),(73,255),(74,0),(255,0),(122,10),(123,0),(120,33),(255,1),(35,52),(66,0),(68,255),(69,38),(70,5),(64,64),(14,6),(32,26),(67,64),(255,0),(52,3),(53,68),(255,1),(49,4),(75,9),(76,5),(77,4),(255,0),(68,0),(69,32),(71,8),(72,40),(103,0),(112,4),(113,1),(114,254),(118,0),(119,0),(255,1),(13,1),(255,0),(128,1),(1,248),(255,1),(142,1),(0,1),(255,0),(128,0)):self._write_u8(pair[0],pair[1])
		self._write_u8(_SYSTEM_INTERRUPT_CONFIG_GPIO,4);gpio_hv_mux_active_high=self._read_u8(_GPIO_HV_MUX_ACTIVE_HIGH);self._write_u8(_GPIO_HV_MUX_ACTIVE_HIGH,gpio_hv_mux_active_high&~16);self._write_u8(_SYSTEM_INTERRUPT_CLEAR,1);self._measurement_timing_budget_us=self.measurement_timing_budget;self._write_u8(_SYSTEM_SEQUENCE_CONFIG,232);self.measurement_timing_budget=self._measurement_timing_budget_us;self._write_u8(_SYSTEM_SEQUENCE_CONFIG,1);self._perform_single_ref_calibration(64);self._write_u8(_SYSTEM_SEQUENCE_CONFIG,2);self._perform_single_ref_calibration(0);self._write_u8(_SYSTEM_SEQUENCE_CONFIG,232)
	def _read_u8(self,address):buf=self._i2c.readfrom_mem(self._addr,address,1);return buf[0]
	def _read_u16(self,address):buf=self._i2c.readfrom_mem(self._addr,address,2);return buf[0]<<8|buf[1]
	def _write_u8(self,address,val):self._i2c.writeto(self._addr,bytearray([address&255,val&255]))
	def _write_u16(self,address,val):self._i2c.writeto(self._addr,bytearray([address&255,val>>8&255,val&255]))
	def _get_spad_info(self):
		for pair in((128,1),(255,1),(0,0),(255,6)):self._write_u8(pair[0],pair[1])
		self._write_u8(131,self._read_u8(131)|4)
		for pair in((255,7),(129,1),(128,1),(148,107),(131,0)):self._write_u8(pair[0],pair[1])
		start=utime.gmtime()
		while self._read_u8(131)==0:
			if self.io_timeout_s>0 and utime.gmtime()-start>=self.io_timeout_s:raise RuntimeError(_A)
		self._write_u8(131,1);tmp=self._read_u8(146);count=tmp&127;is_aperture=tmp>>7&1==1
		for pair in((129,0),(255,6)):self._write_u8(pair[0],pair[1])
		self._write_u8(131,self._read_u8(131)&~4)
		for pair in((255,1),(0,1),(255,0),(128,0)):self._write_u8(pair[0],pair[1])
		return count,is_aperture
	def _perform_single_ref_calibration(self,vhv_init_byte):
		self._write_u8(_SYSRANGE_START,1|vhv_init_byte&255);start=utime.gmtime()
		while self._read_u8(_RESULT_INTERRUPT_STATUS)&7==0:
			if self.io_timeout_s>0 and utime.gmtime()-start>=self.io_timeout_s:raise RuntimeError(_A)
		self._write_u8(_SYSTEM_INTERRUPT_CLEAR,1);self._write_u8(_SYSRANGE_START,0)
	def _get_vcsel_pulse_period(self,vcsel_period_type):
		if vcsel_period_type==_VCSEL_PERIOD_PRE_RANGE:val=self._read_u8(_PRE_RANGE_CONFIG_VCSEL_PERIOD);return(val+1&255)<<1
		elif vcsel_period_type==_VCSEL_PERIOD_FINAL_RANGE:val=self._read_u8(_FINAL_RANGE_CONFIG_VCSEL_PERIOD);return(val+1&255)<<1
		return 255
	def _get_sequence_step_enables(self):sequence_config=self._read_u8(_SYSTEM_SEQUENCE_CONFIG);tcc=sequence_config>>4&1>0;dss=sequence_config>>3&1>0;msrc=sequence_config>>2&1>0;pre_range=sequence_config>>6&1>0;final_range=sequence_config>>7&1>0;return tcc,dss,msrc,pre_range,final_range
	def _get_sequence_step_timeouts(self,pre_range):
		pre_range_vcsel_period_pclks=self._get_vcsel_pulse_period(_VCSEL_PERIOD_PRE_RANGE);msrc_dss_tcc_mclks=self._read_u8(_MSRC_CONFIG_TIMEOUT_MACROP)+1&255;msrc_dss_tcc_us=_timeout_mclks_to_microseconds(msrc_dss_tcc_mclks,pre_range_vcsel_period_pclks);pre_range_mclks=_decode_timeout(self._read_u16(_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI));pre_range_us=_timeout_mclks_to_microseconds(pre_range_mclks,pre_range_vcsel_period_pclks);final_range_vcsel_period_pclks=self._get_vcsel_pulse_period(_VCSEL_PERIOD_FINAL_RANGE);final_range_mclks=_decode_timeout(self._read_u16(_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI))
		if pre_range:final_range_mclks-=pre_range_mclks
		final_range_us=_timeout_mclks_to_microseconds(final_range_mclks,final_range_vcsel_period_pclks);return msrc_dss_tcc_us,pre_range_us,final_range_us,final_range_vcsel_period_pclks,pre_range_mclks
	@property
	def signal_rate_limit(self):val=self._read_u16(_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT);return val/128
	@signal_rate_limit.setter
	def signal_rate_limit(self,val):val=int(val*128);self._write_u16(_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT,val)
	@property
	def measurement_timing_budget(self):
		budget_us=2870;tcc,dss,msrc,pre_range,final_range=self._get_sequence_step_enables();step_timeouts=self._get_sequence_step_timeouts(pre_range);msrc_dss_tcc_us,pre_range_us,final_range_us,_,_=step_timeouts
		if tcc:budget_us+=msrc_dss_tcc_us+590
		if dss:budget_us+=2*(msrc_dss_tcc_us+690)
		elif msrc:budget_us+=msrc_dss_tcc_us+660
		if pre_range:budget_us+=pre_range_us+660
		if final_range:budget_us+=final_range_us+550
		self._measurement_timing_budget_us=budget_us;return budget_us
	@measurement_timing_budget.setter
	def measurement_timing_budget(self,budget_us):
		used_budget_us=2280;tcc,dss,msrc,pre_range,final_range=self._get_sequence_step_enables();step_timeouts=self._get_sequence_step_timeouts(pre_range);msrc_dss_tcc_us,pre_range_us,_=step_timeouts[:3];final_range_vcsel_period_pclks,pre_range_mclks=step_timeouts[3:]
		if tcc:used_budget_us+=msrc_dss_tcc_us+590
		if dss:used_budget_us+=2*(msrc_dss_tcc_us+690)
		elif msrc:used_budget_us+=msrc_dss_tcc_us+660
		if pre_range:used_budget_us+=pre_range_us+660
		if final_range:
			used_budget_us+=550
			if used_budget_us>budget_us:raise ValueError('Requested timeout too big.')
			final_range_timeout_us=budget_us-used_budget_us;final_range_timeout_mclks=_timeout_microseconds_to_mclks(final_range_timeout_us,final_range_vcsel_period_pclks)
			if pre_range:final_range_timeout_mclks+=pre_range_mclks
			self._write_u16(_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI,_encode_timeout(final_range_timeout_mclks));self._measurement_timing_budget_us=budget_us
	def getRangeMillimeters(self):
		for pair in((128,1),(255,1),(0,0),(145,self._stop_variable),(0,1),(255,0),(128,0),(_SYSRANGE_START,1)):self._write_u8(pair[0],pair[1])
		start=utime.gmtime()
		while self._read_u8(_SYSRANGE_START)&1>0:
			if self.io_timeout_s>0 and utime.gmtime()-start>=self.io_timeout_s:raise RuntimeError(_A)
		start=utime.gmtime()
		while self._read_u8(_RESULT_INTERRUPT_STATUS)&7==0:
			if self.io_timeout_s>0 and utime.gmtime()-start>=self.io_timeout_s:raise RuntimeError(_A)
		range_mm=self._read_u16(_RESULT_RANGE_STATUS+10);self._write_u8(_SYSTEM_INTERRUPT_CLEAR,1);return range_mm
	def set_address(self,new_address):self._i2c.write(_I2C_SLAVE_DEVICE_ADDRESS,new_address&127)