_g="[ERROR] 'acc' parameter must be include between 0 and 200"
_f="[ERROR] 'type' parameter must be a string"
_e="[ERROR] 'blue' parameter must be include between 0 and 255"
_d="[ERROR] 'blue' parameter must be a integer"
_c="[ERROR] 'green' parameter must be include between 0 and 255"
_b="[ERROR] 'green' parameter must be a integer"
_a="[ERROR] 'red' parameter must be include between 0 and 255"
_Z="[ERROR] 'red' parameter must be a integer"
_Y="[ERROR] 'angle' should be an integer"
_X='[ERROR] End moving data to well received'
_W='[ERROR] End of movement not received'
_V="[ERROR] 'display_led' should be a boolean"
_U="[ERROR] 'finish_state' should be a boolean"
_T="[ERROR] 'acc' parameter must be a integer"
_S="[ERROR] 'value' parameter must be a string"
_R=False
_Q='rot_clock'
_P='rot_trigo'
_O='right'
_N='left'
_M='back'
_L='front'
_K="[ERROR] 'value' parameter must be a integer"
_J="[ERROR] 'id' parameter must be include between 0 and 255"
_I='p'
_H="[ERROR] 'id' parameter must be a integer"
_G='i'
_F='g'
_E=True
_D=None
_C='b'
_B='r'
_A='>'
print('Start lib ilo V0.12')
import utime,machine,math
global uart
uart=machine.UART(2,baudrate=115200,tx=machine.Pin(16),rx=machine.Pin(17))
uart.init(bits=8,parity=_D,stop=2)
def send_order(command):uart.write(str(command))
def correction_command(list_course):
	C='000';B='00';A=list_course
	if int(A[0])>=100:A[0]=str(A[0])
	elif 100>int(A[0])>=10:A[0]=str('0')+str(A[0])
	elif 10>int(A[0])>=1:A[0]=str(B)+str(A[0])
	else:A[0]=str(C)
	if int(A[1])>=100:A[1]=str(A[1])
	elif 100>int(A[1])>=10:A[1]=str('0')+str(A[1])
	elif 10>int(A[1])>=1:A[1]=str(B)+str(A[1])
	else:A[1]=str(C)
	if int(A[2])>=100:A[2]=str(A[2])
	elif 100>int(A[2])>=10:A[2]=str('0')+str(A[2])
	elif 10>int(A[2])>=1:A[2]=str(B)+str(A[2])
	else:A[2]=str(C)
	D=[];E=str(A[0]+A[1]+A[2]);D='<a200v'+E+'pxyr>';return D
def get_data(timeout=5):
	C='utf-8';E=[b'a',b'b',b'd',b'f',b'g',b'i',b'k',b'l',b'm',b'n',b'p',b'r',b's',b'x',b'y',b'0',b'1',b'2',b'3',b'4',b'5',b'6',b'7',b'8',b'9',b'-'];global uart;A=uart.read(1);D=utime.time()
	while A==_D or A!=b'<':
		A=uart.read(1);utime.sleep(.05)
		if utime.time()-D>timeout:print('[ERROR] no data received');A=-2;break
	if A:
		if isinstance(A,bytes):
			if A.decode(C)=='<':
				B='<'
				while _E:
					A=uart.read(1).decode(C)
					if A==_A:B=B+_A;break
					else:B=B+A
					if len(B)>80:B='<>';break
				return B
def extraction_value(chaine,start,end):
	B=start;A=chaine;C=A.find(B);D=A.find(end)
	if C!=-1 and D!=-1:return A[C+len(B):D]
	else:return-3
def classification(trame):
	J='m';I='l';B='s';A=trame
	if A!=_D:
		if A[1:5]=='avp0':return _E
		elif A=='<ilo>':return''
		elif A[1:4]=='10c':E=int(extraction_value(A,_B,_F));F=int(extraction_value(A,_F,_C));G=int(extraction_value(A,_C,_A));H=[E,F,G];return H
		elif A[1:4]=='10l':E=int(extraction_value(A,_B,_F));F=int(extraction_value(A,_F,_C));G=int(extraction_value(A,_C,_A));H=[E,F,G];return H
		elif A[1:4]=='10d':E=int(extraction_value(A,_B,_F));F=int(extraction_value(A,_F,_C));G=int(extraction_value(A,_C,_A));H=[E,F,G];return H
		elif A[1:3]=='11':P=int(extraction_value(A,I,J));Q=int(extraction_value(A,J,_B));R=int(extraction_value(A,_B,_A));S=[P,Q,R];return S
		elif A[1:3]=='12':T=int(extraction_value(A,I,J));U=int(extraction_value(A,J,_B));V=int(extraction_value(A,_B,_A));W=[T,U,V];return W
		elif A[1:3]=='14':X=int(extraction_value(A,'t',_A));return X
		elif A[1:3]=='20':K=int(extraction_value(A,'f',_B));L=int(extraction_value(A,_B,_C));M=int(extraction_value(A,_C,I));N=int(extraction_value(A,I,_A));Y=[K,L,M,N];return Y
		elif A[1:3]=='21':K=int(extraction_value(A,'f',_A));return K
		elif A[1:3]=='22':L=int(extraction_value(A,_B,_A));return L
		elif A[1:3]=='23':M=int(extraction_value(A,_C,_A));return M
		elif A[1:3]=='24':N=int(extraction_value(A,I,_A));return N
		elif A[1:3]=='30':Z=float(extraction_value(A,_B,_I));a=float(extraction_value(A,_I,'y'));b=float(extraction_value(A,'y',_A));O=[Z,a,b];return O
		elif A[1:3]=='32':c=float(extraction_value(A,'x','y'));d=float(extraction_value(A,'y','z'));e=float(extraction_value(A,'z',_B));f=float(extraction_value(A,_B,_I));g=float(extraction_value(A,_I,_F));h=float(extraction_value(A,_F,_A));i=[c,d,e,f,g,h];return i
		elif A[1:3]=='40':D=int(extraction_value(A,B,_I));j=int(extraction_value(A,_I,_A));k=[D,j];return k
		elif A[1:3]=='50':l=int(extraction_value(A,_B,_F));m=int(extraction_value(A,_F,_C));n=int(extraction_value(A,_C,_A));o=[l,m,n];return o
		elif A[1:4]=='60i':C=int(extraction_value(A,_G,B));D=int(extraction_value(A,B,_A));return C,D
		elif A[1:4]=='611':C=int(extraction_value(A,_G,B));D=int(extraction_value(A,B,_A));return C,D
		elif A[1:4]=='621':C=int(extraction_value(A,_G,B));O=int(extraction_value(A,B,_A));return C,O
		elif A[1:3]=='63':C=int(extraction_value(A,_G,B));p=int(extraction_value(A,B,_A));return C,p
		elif A[1:3]=='64':C=int(extraction_value(A,_G,B));q=int(extraction_value(A,B,_A));return C,q
		elif A[1:3]=='65':C=int(extraction_value(A,_G,B));r=int(extraction_value(A,B,_A));return C,r
		elif A[1:3]=='66':C=int(extraction_value(A,_G,B));s=int(extraction_value(A,B,_A));return C,s
		elif A[1:3]=='67':C=int(extraction_value(A,_G,B));D=int(extraction_value(A,B,_A));return C,D
		elif A[1:4]=='681':t=int(extraction_value(A,'a',_A));return t
		elif A[1:4]=='691':u=int(extraction_value(A,'t',_A));return u
		elif A[1:3]=='71':v=float(extraction_value(A,_I,_G));w=float(extraction_value(A,_G,'d'));x=float(extraction_value(A,'d',_A));return v,w,x
		elif A[1:3]=='92':y=str(extraction_value(A,B,_I));z=str(extraction_value(A,_I,_A));return y,z
		elif A[1:3]=='93':A0=str(extraction_value(A,'n',_A));return A0
		else:print('[COMMUNICATION ERROR] data classification');return
def vider_uart():
	while uart.any():uart.read()
def stop():send_order('<>')
def pause(duration=1):send_order('<avp'+str(duration*1000)+'xyr>')
def step(direction,step=_D,finish_state=_E,display_led=_E):
	P='<a60vpxyr1';O='<a60vpxyr0';N='<a60vpxy1';M='rf>';L='rt>';K='<a60vpxy0';J='<a60vpx0';I='yrf>';H='yrt>';G='<a60vpx1';F="[ERROR] 'step' should be an integer or a float";D=finish_state;C=display_led;B=direction;A=step
	if not isinstance(B,str):print("[ERROR] 'direction' should be a string");return
	if isinstance(A,bool):D=A;A=_D
	if B==_L or B==_M or B==_N or B==_O:
		if A is _D:A=1
		if not isinstance(A,(int,float)):print(F);return
		if A>100 or A<.1:print("[ERROR] 'step' should be between 0.1 and 100 for translation");return
		A=int(A*100)
	elif B==_P or B==_Q:
		if A is _D:A=1
		if not isinstance(A,(int,float)):print(F);return
		if A<.01:print("[ERROR] 'step' should be more than 0.01 for rotation");return
		A=int(A*90)
	else:print("[ERROR] 'step' unknow name ")
	if not isinstance(D,bool):print(_U);return
	if not isinstance(C,bool):print(_V);return
	if B==_L:
		if C:send_order(G+str(A)+H)
		else:send_order(G+str(A)+I)
	elif B==_M:
		if C:send_order(J+str(A)+H)
		else:send_order(J+str(A)+I)
	elif B==_N:
		if C:send_order(K+str(A)+L)
		else:send_order(K+str(A)+M)
	elif B==_O:
		if C:send_order(N+str(A)+L)
		else:send_order(N+str(A)+M)
	elif B==_P:
		if C:send_order(O+str(A)+'t>')
		else:send_order(O+str(A)+'f>')
	elif B==_Q:
		if C:send_order(P+str(A)+'t>')
		else:send_order(P+str(A)+'f>')
	else:print("[ERROR] 'Direction' should be 'front', 'back', 'left', 'rot_trigo', 'rot_clock'")
	if D==_E:
		if B==_L or B==_M or B==_N or B==_O:E=A/100
		elif B==_P or B==_Q:E=A/45
		else:E=1
		Q=2.5*E+3
		if classification(get_data(Q))==_E:0
		else:print(_W);return _R
		return _E
	else:print(_X)
def flat_movement(angle,distance):
	D=distance;A=angle
	if not isinstance(A,int):print(_Y);return
	if A>360 or A<0:print("[ERROR] 'angle' should be between 0 and 360");return
	if not isinstance(D,int):print("[ERROR] 'distance' should be an integer");return
	if 0<=A<90:B=1;C=1
	elif 90<=A<180:B=0;C=1
	elif 180<=A<270:B=0;C=0
	elif 270<=A<=360:B=1;C=0
	else:print('Angle should be between 0 to 360 degrees');return
	E=A*math.pi/180;F=abs(int(math.cos(E)*D));G=abs(int(math.sin(E)*D));H='<avpx'+str(B)+str(F)+'y'+str(C)+str(G)+'r>';send_order(H)
def move(direction,speed):
	B=direction;A=speed
	if not isinstance(B,str):print("[ERROR] 'direction' parameter must be a string");return
	if not isinstance(A,int):print("[ERROR] 'speed' parameter must be an integer");return
	if A<0 or A>100:print("[ERROR] 'speed' parameter must be between 0 and 100");return
	def D(pct):return 128+pct*127//100
	def E(pct):return 128-pct*127//100
	if B==_L:C=[D(A),128,128]
	elif B==_M:C=[E(A),128,128]
	elif B==_N:C=[128,E(A),128]
	elif B==_O:C=[128,D(A),128]
	elif B==_P:C=[128,128,E(A)]
	elif B==_Q:C=[128,128,D(A)]
	elif B=='stop':C=[128,128,128]
	else:print("[ERROR] 'direction' must be one of: 'front', 'back', 'left', 'right', 'rot_trigo', 'rot_clock', 'stop'");return
	F=correction_command(C);send_order(F);utime.sleep(.1)
def direct_control(axial,radial,rotation):
	C=rotation;B=radial;A=axial
	if not isinstance(A,int):print("[ERROR] 'axial' parameter must be a integer");return
	if A>255 or A<0:print("[ERROR] 'axial' parameter must be include between 0 and 255");return
	if not isinstance(B,int):print("[ERROR] 'radial' parameter must be a integer");return
	if B>255 or B<0:print("[ERROR] 'radial' parameter must be include between 0 and 255");return
	if not isinstance(C,int):print("[ERROR] 'rotation' parameter must be a integer");return
	if C>255 or C<0:print("[ERROR] 'rotation' parameter must be include between 0 and 255");return
	D=[A,B,C];E=correction_command(D);send_order(E);utime.sleep(.1)
def set_tempo_pos(value):
	A=value
	if not isinstance(A,int):print(_K);return
	B='<690t'+str(A)+_A;send_order(B)
def get_tempo_pos():vider_uart();send_order('<691>');return classification(get_data())
def rotation(angle,finish_state=_E,display_led=_E):
	E='<avpxyr';D=display_led;C=finish_state;A=angle
	if not isinstance(A,(int,float)):print(_Y);return
	if A>0:B=1
	else:B=0
	if not isinstance(C,bool):print(_U);return
	if not isinstance(D,bool):print(_V);return
	if D:send_order(E+str(B)+str(abs(A))+'t>')
	else:send_order(E+str(B)+str(abs(A))+'f>')
	if C==_E:
		F=abs(A)/45;G=2.5*F+3
		if classification(get_data(G))==_E:0
		else:print(_W);return _R
		return _E
	else:print(_X)
def set_pid(kp,ki,kd):
	C=kd;B=ki;A=kp
	if not isinstance(A,(int,float)):print("[ERROR] 'kp' parameter must be a integer or a float");return
	if A>10 or A<0:print("[ERROR] 'kp' parameter must be include between 0 and 10");return
	if not isinstance(B,(int,float)):print("[ERROR] 'ki' parameter must be a integer or a float");return
	if B>10 or B<0:print("[ERROR] 'ki' parameter must be include between 0 and 10");return
	if not isinstance(C,(int,float)):print("[ERROR] 'kd' parameter must be a integer or a float");return
	if C>10 or C<0:print("[ERROR] 'kd' parameter must be include between 0 and 10");return
	A=int(A*10);B=int(B*10);C=int(C*10);D='<70p'+str(A)+_G+str(B)+'d'+str(C)+_A;send_order(D)
def get_pid():vider_uart();send_order('<71>');return classification(get_data())
def get_raw_color_rgb():vider_uart();send_order('<10c>');return classification(get_data())
def get_color_card(return_type='rgb'):
	Y='None';X='black';W='red';V='blue';U='green';T='yellow';S='light_blue';R='purple';Q='orange';P='white';G=return_type;B=get_raw_color_rgb();D=B[0];E=B[1];F=B[2];Z=abs(D-190)+abs(E-255)+abs(F-252);H=abs(D-255)+abs(E-234)+abs(F-168);I=abs(D-250)+abs(E-182)+abs(F-255);J=abs(D-86)+abs(E-148)+abs(F-255);K=abs(D-220)+abs(E-255)+abs(F-165);L=abs(D-148)+abs(E-255)+abs(F-214);M=abs(D-115)+abs(E-140)+abs(F-240);N=abs(D-255)+abs(E-167)+abs(F-163);O=abs(D-56)+abs(E-73)+abs(F-73);A=P;C=Z
	if H<=C:C=H;A=Q
	if I<=C:C=I;A=R
	if J<=C:C=J;A=S
	if K<=C:C=K;A=T
	if L<=C:C=L;A=U
	if M<=C:C=M;A=V
	if N<=C:C=N;A=W
	if O<=C:C=O;A=X
	if C>150:A=Y
	if A==P:B=255,255,255
	if A==Q:B=255,76,0
	elif A==R:B=182,0,255
	elif A==S:B=0,255,250
	elif A==T:B=255,255,0
	elif A==U:B=12,255,0
	elif A==V:B=0,18,255
	elif A==W:B=255,0,3
	elif A==X:B=0,0,0
	elif A==Y:B=0,0,0
	if G=='rgb':return B
	elif G=='color':return A
	elif G==_B:return B[0]
	elif G==_F:return B[1]
	elif G==_C:return B[2]
	else:print("[ERROR] 'return_type' must be 'rgb' or 'color'");return
def set_led_captor(intensity=200):
	A=intensity
	if A is not _D:
		if not isinstance(A,int):print("[ERROR] 'intensity' parameter must be a integer");return
		if A<0 or A>255:print("[ERROR] 'intensity' parameter must be include between 0 and 255");return
		B='<54l'+str(A)+_A
	else:B='<54l200>'
	send_order(B)
def get_color_clear():vider_uart();send_order('<11>');return classification(get_data())
def get_color_clear_left():return get_color_clear()[0]
def get_color_clear_center():return get_color_clear()[1]
def get_color_clear_right():return get_color_clear()[2]
def get_line():vider_uart();send_order('<12>');return classification(get_data())
def get_line_left():return get_line()[0]
def get_line_center():return get_line()[1]
def get_line_right():return get_line()[2]
def set_line_threshold_value(value=_D):
	A=value
	if A is not _D:
		if not isinstance(A,int):print(_K);return
	else:
		set_led_captor(_E);utime.sleep(1);B=0;get_color_clear()
		while B==0:utime.sleep(.1)
		A=round(B*1.2);print(f"La nouvelle valeur de seuil est: {A}");set_led_captor(_R)
	C='<13t'+str(A)+_A;send_order(C)
def get_line_threshold_value():vider_uart();send_order('<14>');return classification(get_data())
def get_distance():vider_uart();send_order('<20>');return classification(get_data())
def get_distance_front():vider_uart();send_order('<21>');return classification(get_data())
def get_distance_right():vider_uart();send_order('<22>');return classification(get_data())
def get_distance_back():vider_uart();send_order('<23>');return classification(get_data())
def get_distance_left():vider_uart();send_order('<24>');return classification(get_data())
def get_angle():vider_uart();send_order('<30>');return classification(get_data())
def get_roll():return get_angle()[0]
def get_pitch():return get_angle()[1]
def get_yaw():return get_angle()[2]
def reset_angle():send_order('<31>')
def get_raw_imu():vider_uart();send_order('<32>');return classification(get_data())
def get_battery():vider_uart();send_order('<40>');return classification(get_data())
def get_led_color():vider_uart();send_order('<50>');return classification(get_data())
def set_led_color(red,green,blue):
	C=blue;B=green;A=red
	if not isinstance(A,int):print(_Z);return
	if A>255 or A<0:print(_a);return
	if not isinstance(B,int):print(_b);return
	if B>255 or B<0:print(_c);return
	if not isinstance(C,int):print(_d);return
	if C>255 or C<0:print(_e);return
	D='<51r'+str(A)+_F+str(B)+_C+str(C)+_A;send_order(D)
def set_led_shape(value):
	A=value
	if not isinstance(A,str):print(_S);return
	B='<52v'+str(A)+_A;send_order(B)
def set_led_anim(value,nb_loop=1):
	B=nb_loop;A=value
	if not isinstance(A,str):print(_S);return
	if not isinstance(B,int):print("[ERROR] 'nb_loop' parameter must be a integer");return
	C='<53'+str(A)+'/'+str(B)+_A;send_order(C)
def set_led_single(type,id,red,green,blue):
	E='circle';D='center';C=blue;B=green;A=red
	if not isinstance(type,str):print(_f);return
	if type!=D and type!=E:print("[ERROR] 'type' parameter must be 'center' or 'circle'");return
	if not isinstance(id,int):print(_H);return
	if not isinstance(A,int):print(_Z);return
	if A>255 or A<0:print(_a);return
	if not isinstance(B,int):print(_b);return
	if B>255 or B<0:print(_c);return
	if not isinstance(C,int):print(_d);return
	if C>255 or C<0:print(_e);return
	if type==D:type='1'
	if type==E:type='0'
	F='<55t'+str(type)+'d'+str(id)+_B+str(A)+_F+str(B)+_C+str(C)+_A;send_order(F)
def set_led_word(type,word,delay=_D):
	F='/1>';E='slide';C='reveal';B=word;A=delay
	if not isinstance(type,str):print(_f);return
	if type!=C and type!=E:print("[ERROR] 'type' parameter must be reveal or slide");return
	if not isinstance(B,str):print("[ERROR] 'word' parameter must be a string");return
	if len(B)>10:print("[ERROR] 'word' parameter must not exceed 10 characters");return
	if type==C and A==_D:A=1000
	if type==E and A==_D:A=300
	if not isinstance(A,int):print("[ERROR] 'delay' parameter must be a integer");return
	if A>2000 or A<10:print("[ERROR] 'delay' parameter must be include between 10 and 2000");return
	if type==C:D='<56w'+str(B.upper())+'d'+str(A)+F
	else:D='<57w'+str(B.upper())+'d'+str(A)+F
	send_order(D)
def stop_led_word(self):send_order('<58>')
def get_acc_motor():vider_uart();send_order('<681>');return classification(get_data())
def set_acc_motor(acc):
	A=acc
	if not isinstance(A,int):print(_T);return
	if A>200 or A<1:print("[ERROR] 'value' parameter must be include between 10 and 100");return
	if A<1:A=1
	elif A>200:A=200
	B='<680a'+str(A)+_A;send_order(B)
def ping_single_motor(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<60i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def drive_single_motor_speed(id,acc,value):
	B=acc;A=value
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	if not isinstance(B,int):print(_T);return
	if B>200 or B<0:print(_g);return
	if not isinstance(A,int):print(_K);return
	if A>100 or A<-100:print("[ERROR] 'value' parameter must be include between -100 and 100");return
	if id==1 or id==4:A=-A
	A=A*70;C='<610i'+str(id)+'a'+str(B)+'v'+str(A)+_A;send_order(C)
def drive_single_motor_speed_front_left(acc,value):
	A=value
	if not isinstance(A,int):print(_K);return
	drive_single_motor_speed(1,acc,A)
def drive_single_motor_speed_front_right(acc,value):
	A=value
	if not isinstance(A,int):print(_K);return
	drive_single_motor_speed(2,acc,A)
def drive_single_motor_speed_back_left(acc,value):
	A=value
	if not isinstance(A,int):print(_K);return
	drive_single_motor_speed(4,acc,A)
def drive_single_motor_speed_back_right(acc,value):
	A=value
	if not isinstance(A,int):print(_K);return
	drive_single_motor_speed(3,acc,A)
def get_single_motor_speed(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<611i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def drive_single_motor_angle(id,angle,vel,acc):
	C=acc;B=vel;A=angle
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	if not isinstance(A,int):print("[ERROR] 'angle' parameter must be a integer");return
	if A>4096 or A<0:print("[ERROR] 'angle' parameter must be include between 0 and 4096");return
	if not isinstance(B,int):print("[ERROR] 'vel' parameter must be a integer");return
	if B>7000 or B<-7000:print("[ERROR] 'vel' parameter must be include between -7000 and 7000");return
	if not isinstance(C,int):print(_T);return
	if C>200 or C<0:print(_g);return
	if id<0:id=0
	elif id>255:id=255
	if A<0:A=0
	elif A>4096:A=4096
	D='<620i'+str(id)+'a'+str(A)+'v'+str(B)+_I+str(C)+_A;send_order(D)
def get_single_motor_angle(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<621i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def get_temp_single_motor(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<63i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def get_volt_single_motor(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<64i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def get_torque_single_motor(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<65i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def get_current_single_motor(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<66i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def get_motor_is_moving(id):
	if not isinstance(id,int):print(_H);return
	if id>255 or id<0:print(_J);return
	A='<67i'+str(id)+_A;vider_uart();send_order(A);return classification(get_data())
def set_motor_mode(motor_id,mode):
	F='<72';E='speed';D='position';B=mode;A=motor_id
	if not isinstance(A,int):print("[ERROR] 'motor_id' parameter must be a integer");return
	if A>255 or A<5:print("[ERROR] 'motor_id' parameter must be include between 5 and 255");return
	if not isinstance(B,str):print("[ERROR] 'mode' parameter must be a string");return
	if B!=D and B!=E:print("[ERROR] 'mode' parameter must be 'position' or 'speed'");return
	if B==D:C=F+str(A)+'m0>'
	if B==E:C=F+str(A)+'m1>'
	send_order(C)
def set_autonomous_mode(value):
	A=value
	if not isinstance(A,str):print(_S);return
	B='<80'+str(A)+_A;send_order(B)
def set_wifi_credentials(ssid,password):
	B=password
	if not isinstance(ssid,str):print("[ERROR] 'ssid' parameter must be a string");return
	if not isinstance(B,str):print("[ERROR] 'password' parameter must be a string");return
	A='<90s'+str(ssid)+_A;send_order(A);A='<91p'+str(B)+_A;send_order(A)
def get_wifi_credentials():vider_uart();send_order('<92>');return classification(get_data())
def set_name(name):
	if not isinstance(name,str):print("[ERROR] 'name' parameter must be a string");return
	A='<94n'+str(name)+_A;send_order(A)
def get_name():vider_uart();send_order('<93>');return classification(get_data())
uart.write('<103s2>')
utime.sleep(.5)
print('lib ilo_micro imported correctly')
print('version 0.12')
uart.write('<ilo>')
classification(get_data())
utime.sleep(1)