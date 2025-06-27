_H='both'
_G=True
_F='white'
_E='Nan'
_D='blue'
_C='green'
_B='red'
_A=None
from machine import Pin,I2C,SoftI2C,time_pulse_us
import utime
from stm32_vl53l0x import VL53L0X
from stm32_veml6040 import VEML6040
from stm32_sts3032 import*
import math
i2c=I2C(1)
i2c=SoftI2C(scl=Pin('B13'),sda=Pin('B14'))
try:vl53l0x=VL53L0X(i2c);print('[SUCCESS] VL53L0X')
except:print('[ERROR] VL53L0X')
trig=Pin('D5',Pin.OUT)
echo=Pin('D4',Pin.IN)
treshold_value=70
TCA9548A_ADDR=112
def TCA9548A(bus):i2c.writeto(TCA9548A_ADDR,bytearray([1<<bus]))
try:TCA9548A(0);colourSensorL=VEML6040();print('[SUCCESS] VEML6040 Left')
except:print('[ERROR] VEML6040 Left')
try:TCA9548A(1);colourSensorM=VEML6040();print('[SUCCESS] VEML6040 Center')
except:print('[ERROR] VEML6040 Center')
try:TCA9548A(2);colourSensorR=VEML6040();print('[SUCCESS] VEML6040 Right')
except:print('[ERROR] VEML6040 Right')
led=Pin('D3',Pin.OUT)
motor=Sts3032('L476')
try:
	if motor.ping_single_motor(1)<0:print('[ERROR] Motor 1')
	else:print('[SUCCESS] Motor 1')
	if motor.ping_single_motor(2)<0:print('[ERROR] Motor 2')
	else:print('[SUCCESS] Motor 2')
except:print('[ERROR] Motors')
def donutbot_get_distance(sensor):
	if sensor.lower()=='tof':range_cm=vl53l0x.getRangeMillimeters()/10;utime.sleep(.1);return range_cm
	elif sensor.lower()=='ultrasonic':
		trig.off();utime.sleep_us(2);trig.on();utime.sleep_us(10);trig.off()
		try:duration=time_pulse_us(echo,1,1000000)
		except OSError:return-1
		distance=duration*.0343/2*10
		if distance==-1:print('Erreur de mesure')
		else:return distance
	else:print("[ERROR] sensor must be 'tof' or 'ultrasonic'")
def donutbot_get_color():TCA9548A(0);data=colourSensorL.readRGB();red_l=data[_B];grn_l=data[_C];blu_l=data[_D];TCA9548A(1);data=colourSensorM.readRGB();red_m=data[_B];grn_m=data[_C];blu_m=data[_D];TCA9548A(2);data=colourSensorR.readRGB();red_r=data[_B];grn_r=data[_C];blu_r=data[_D];red=(red_l+red_m+red_r)/3;grn=(grn_l+grn_m+grn_r)/3;blu=(blu_l+blu_m+blu_r)/3;return red,grn,blu
def donutbot_get_color_left():
	TCA9548A(0);start_time=utime.ticks_ms()
	while _G:
		data=colourSensorL.readRGB();red=data[_B];grn=data[_C];blu=data[_D]
		if red!=_E and grn!=_E and blu!=_E:return red,grn,blu
		if utime.ticks_diff(utime.ticks_ms(),start_time)>2000:return 0,0,0
def donutbot_get_color_center():
	TCA9548A(1);start_time=utime.ticks_ms()
	while _G:
		data=colourSensorM.readRGB();red=data[_B];grn=data[_C];blu=data[_D]
		if red!=_E and grn!=_E and blu!=_E:return red,grn,blu
		if utime.ticks_diff(utime.ticks_ms(),start_time)>2000:return 0,0,0
def donutbot_get_color_right():
	TCA9548A(2);start_time=utime.ticks_ms()
	while _G:
		data=colourSensorR.readRGB();red=data[_B];grn=data[_C];blu=data[_D]
		if red!=_E and grn!=_E and blu!=_E:return red,grn,blu
		if utime.ticks_diff(utime.ticks_ms(),start_time)>2000:return 0,0,0
def donutbot_get_color_clear():
	TCA9548A(0);data=colourSensorL.readRGB();white_l=data[_F];TCA9548A(1);data=colourSensorM.readRGB();white_m=data[_F];TCA9548A(2);data=colourSensorR.readRGB();white_r=data[_F];white=(white_l+white_m+white_r)/3
	if isinstance(white,(int,float)):return int(white)
	else:return white
def donutbot_scale_rgb_to_max(r,g,b):
	max_input=max(r,g,b)
	if max_input==0 or math.isnan(r)or math.isnan(g)or math.isnan(b):return 0,0,0
	scale=255/max_input;return min(int(r*scale),255),min(int(g*scale),255),min(int(b*scale),255)
def donutbot_get_color_name(r_raw,g_raw,b_raw):
	A='None';r,g,b=donutbot_scale_rgb_to_max(r_raw,g_raw,b_raw);colors={_F:(209,255,161),'orange':(255,225,66),'purple':(128,0,128),'pink':(255,167,140),'brown':(174,156,67),'yellow':(230,255,67),_C:(167,255,57),_D:(166,255,121),_B:(255,121,37)};min_val=_A;best_match=A
	for(name,(r_ref,g_ref,b_ref))in colors.items():
		diff=abs(r-r_ref)+abs(g-g_ref)+abs(b-b_ref)
		if min_val is _A or diff<min_val:min_val=diff;best_match=name
	if min_val>50:return A
	return best_match
def donutbot_get_color_name_left():TCA9548A(0);data=colourSensorL.readRGB();red=data[_B];grn=data[_C];blu=data[_D];return donutbot_get_color_name(red,grn,blu)
def donutbot_get_color_name_center():TCA9548A(1);data=colourSensorM.readRGB();red=data[_B];grn=data[_C];blu=data[_D];return donutbot_get_color_name(red,grn,blu)
def donutbot_get_color_name_right():TCA9548A(2);data=colourSensorR.readRGB();red=data[_B];grn=data[_C];blu=data[_D];return donutbot_get_color_name(red,grn,blu)
def donutbot_get_line(side=_A):
	D='right';C='center';B='left';A='all';global treshold_value;white_l,white_m,white_r=_A,_A,_A
	if side==B or side==A:TCA9548A(0);data=colourSensorL.readRGB();white_l=data[_F]
	if side==C or side==A:TCA9548A(1);data=colourSensorM.readRGB();white_m=data[_F]
	if side==D or side==A:TCA9548A(2);data=colourSensorR.readRGB();white_r=data[_F]
	if white_l!=_A and white_l<treshold_value:line_left=1
	else:line_left=0
	if white_m!=_A and white_m<treshold_value:line_center=1
	else:line_center=0
	if white_r!=_A and white_r<treshold_value:line_right=1
	else:line_right=0
	if side==B:return line_left
	if side==C:return line_center
	if side==D:return line_right
	return line_left,line_center,line_right
def donutbot_set_treshold_value(value):
	global treshold_value
	if value==_A:value=50
	treshold_value=value
def donutbot_get_treshold_value():global treshold_value;return treshold_value
def donutbot_set_led_captor(state):
	if state==_G:led.on()
	else:led.off()
def donutbot_get_motor_infos(id=_A):
	B='Temperature motor ID ';A='Voltage motor ID '
	if id is _A:
		Motor_number=10;motor.testPing(Motor_number);utime.sleep(.5)
		for i in range(Motor_number):print(A,i,':',motor.getVoltage(i));print(B,i,':',motor.getTemperature(i))
	else:motor.testPing(id);utime.sleep(.5);print(A,id,': ',motor.getVoltage(id));print(B,id,': ',motor.getTemperature(id))
def donutbot_ping_motor(id):print(f"motor ping: {motor.ping_single_motor(id)}")
def donutbot_move_forward(speed,acceleration=200):motor.setSpeed(1,-speed,acceleration);motor.setSpeed(2,speed,acceleration)
def donutbot_move_backward(speed,acceleration=200):motor.setSpeed(1,speed,acceleration);motor.setSpeed(2,-speed,acceleration)
def donutbot_rot_clock(speed,acceleration=200):motor.setSpeed(1,-speed,acceleration);motor.setSpeed(2,-speed,acceleration)
def donutbot_rot_trigo(speed,acceleration=200):motor.setSpeed(1,speed,acceleration);motor.setSpeed(2,speed,acceleration)
def donutbot_controlMotor(motorSide,speed,acceleration=200):motor.setSpeed(motorSide,speed,acceleration)
def donutbot_stop(motorSide=_H):
	if motorSide==_H:motor.releaseMotor(1);motor.releaseMotor(2)
	else:motor.releaseMotor(motorSide)
def donutbot_pause(motorSide=_H):
	if motorSide==_H:motor.setSpeed(1,0,0);motor.setSpeed(2,0,0)
	else:motor.setSpeed(motorSide,0,0)
def convertSpeed_mps(speed,max_speed,max_rpm,wheels_diameter):return 2*math.pi*wheels_diameter/2*.01*(speed/max_speed*max_rpm)/60
def donutbot_turnAngle(angle,speed=7000):
	speed_mps=convertSpeed_mps(speed,7000,113,6.2);angularDistance=.0535*angle/180*math.pi
	if angularDistance>0:donutbot_controlMotor(1,speed);donutbot_controlMotor(2,speed)
	else:donutbot_controlMotor(1,-speed);donutbot_controlMotor(2,-speed)
	utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000));donutbot_pause()
def donutbot_moveWithSquare(x,direction,speed=7000):
	speed_mps=convertSpeed_mps(speed,7000,113,6.2)
	for i in range(int(x)):
		if direction=='forward':donutbot_move_forward(speed)
		else:donutbot_move_backward(speed)
		utime.sleep_ms(int(.15/speed_mps*1000));donutbot_pause()