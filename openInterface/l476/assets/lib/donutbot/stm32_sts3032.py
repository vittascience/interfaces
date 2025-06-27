_B='Speed:'
_A=None
from machine import UART,Pin
import time,sys
S_RXD=16
S_TXD=17
NULL=0
INST_PING=1
INST_READ=2
INST_WRITE=3
SMS_STS_MODE=33
SCSCL_TORQUE_ENABLE=40
SMS_STS_ACC=41
SCSCL_GOAL_POSITION_L=42
SMS_STS_GOAL_SPEED_L=46
SMS_STS_LOCK=55
SMS_STS_PRESENT_POSITION_L=56
SMS_STS_PRESENT_VOLTAGE=62
SMS_STS_PRESENT_TEMPERATURE=63
SMS_STS_PRESENT_CURRENT_H=70
MOTOR_MODE_POSITION=0
MOTOR_MODE_SPEED=1
class Sts3032:
	def __init__(self,microcontroller='ESP32'):
		self.uart=_A
		if microcontroller=='ESP32':print('[STS3032] Configuration pour ESP32');self.uart=UART(1,baudrate=1000000,bits=8,parity=_A,stop=1,tx=Pin(S_TXD),rx=Pin(S_RXD))
		elif microcontroller=='WB55':print('[STS3032] Configuration pour WB55');self.uart=UART(2,baudrate=1000000,bits=8,parity=_A,stop=1)
		elif microcontroller=='L476':print('[STS3032] Configuration pour L476');self.uart=UART(3,baudrate=1000000,bits=8,parity=_A,stop=1)
		else:print(f"[STS3032] Erreur: Microcontrôleur '{microcontroller}' non reconnu.");sys.exit(1)
		if self.uart is _A:print('[STS3032] Erreur: UART non initialisé');sys.exit(1)
		self.End=False;self.Level=True;self.Error=0;self.IOTimeOut=1000;self.Mem=list();time.sleep(1)
	def _checkHead(self):head=self.uart.read(2);return head==b'\xff\xff'
	def _rFlushSCS(self):
		while self.uart.any():self.uart.read()
	def _wFlushSCS(self):0
	def _readSCS(self,n):
		data=self.uart.read(n)
		if data and len(data)==n:return data
	def _writeBuf(self,ID,MemAddr,nDat,nLen,Fun):
		msgLen=2;bBuf=bytearray(6);CheckSum=0;bBuf[0]=255;bBuf[1]=255;bBuf[2]=ID;bBuf[4]=Fun
		if nDat:msgLen+=nLen+1;bBuf[3]=msgLen;bBuf[5]=MemAddr;self._writeSCS(bBuf,6)
		else:bBuf[3]=msgLen;self._writeSCS(bBuf,5)
		CheckSum=ID+msgLen+Fun+MemAddr
		if nDat:
			for i in range(nLen):CheckSum+=nDat[i]
			self._writeSCS(nDat,nLen)
		self._writeSCS(bytearray([~CheckSum&255]),1)
	def _writeByte(self,ID,MemAddr,bDat):self._rFlushSCS();self._writeBuf(ID,MemAddr,bytearray([bDat]),1,INST_WRITE);self._wFlushSCS();return self._Ack(ID)
	def _writeSCS(self,nDat,nLen):
		if nDat is _A:return 0
		return self.uart.write(nDat[:nLen])
	def _genWrite(self,ID,MemAddr,nDat,nLen):self._rFlushSCS();self._writeBuf(ID,MemAddr,nDat,nLen,INST_WRITE);self._wFlushSCS();return self._Ack(ID)
	def _Host2SCS(self,Data):
		if self.End:DataL=Data>>8&255;DataH=Data&255
		else:DataH=Data>>8&255;DataL=Data&255
		return DataL,DataH
	def _Ack(self,ID):
		self.Error=0
		if ID!=254 and self.Level:
			if not self._checkHead():return 0
			bBuf=self._readSCS(4)
			if bBuf is _A or len(bBuf)!=4:return 0
			if bBuf[0]!=ID:return 0
			if bBuf[1]!=2:return 0
			calSum=~(bBuf[0]+bBuf[1]+bBuf[2])&255
			if calSum!=bBuf[3]:return 0
			self.Error=bBuf[2]
		return 1
	def _read(self,ID,MemAddr,nLen):
		self._rFlushSCS();self._writeBuf(ID,MemAddr,bytearray([nLen]),1,INST_READ);self._wFlushSCS()
		if not self._checkHead():return 0
		bBuf=self._readSCS(3)
		if bBuf is _A or len(bBuf)!=3:return 0
		nData=self._readSCS(nLen)
		if nData is _A or len(nData)!=nLen:return 0
		checksum_received=self._readSCS(1)
		if checksum_received is _A:return 0
		calSum=bBuf[0]+bBuf[1]+bBuf[2]
		for byte in nData:calSum+=byte
		calSum=~calSum&255
		if calSum!=checksum_received[0]:return 0
		self.Error=bBuf[2];return nData
	def _readByte(self,ID,MemAddr):
		nData=self._read(ID,MemAddr,1)
		if nData==0 or len(nData)!=1:return-1
		return nData[0]
	def _setTorque(self,ID,enable):return self._writeByte(ID,SCSCL_TORQUE_ENABLE,enable)
	def _ping(self,ID):
		self._rFlushSCS();self._writeBuf(ID,0,NULL,0,INST_PING);self._wFlushSCS();self.Error=0
		if not self._checkHead():return-1
		bBuf=self._readSCS(4)
		if bBuf is _A:return-1
		if bBuf[0]!=ID and ID!=254:return-1
		if bBuf[1]!=2:return-1
		calSum=~(bBuf[0]+bBuf[1]+bBuf[2])&255
		if calSum!=bBuf[3]:return-1
		self.Error=bBuf[2];return bBuf[0]
	def lockEprom(self,ID):print('[STS3032] Locking EPROM for ID:',ID);return self._writeByte(ID,SMS_STS_LOCK,1)
	def unlockEprom(self,ID):print('[STS3032] Unlocking EPROM for ID:',ID);return self._writeByte(ID,SMS_STS_LOCK,0)
	def ping_single_motor(self,id):return self._ping(id)
	def testPing(self,id_max=50):
		print('[STS3032] Test de ping en cours...')
		for TEST_ID in range(id_max):
			ID=self._ping(TEST_ID)
			if ID!=-1:print('[STS3032] Servo ID:',ID);time.sleep(.1)
			else:print('[STS3032] Ping servo ID error for ID:',TEST_ID)
		print('[STS3032] Test de ping terminé')
	def setMotorMode(self,ID,Mode):self.unlockEprom(ID);time.sleep(.1);result=self._writeByte(ID,SMS_STS_MODE,Mode);time.sleep(.1);self.lockEprom(ID);return result
	def releaseMotor(self,ID):print('[STS3032] ReleaseMotor ID:',ID);return self._setTorque(ID,0)
	def setSpeed(self,ID,Speed,ACC):
		if Speed<0:Speed=-Speed;Speed|=1<<15
		bBuf=bytearray(2);bBuf[0]=ACC;self._genWrite(ID,SMS_STS_ACC,bBuf,1);DataL,DataH=self._Host2SCS(Speed);bBuf[0]=DataL;bBuf[1]=DataH;result=self._genWrite(ID,SMS_STS_GOAL_SPEED_L,bBuf,2);print('[STS3032] WriteSpeed ID:',ID,_B,Speed,'ACC:',ACC);return result
	def setPosition(self,ID,Position,Speed,ACC):ACC=0;Time=0;bBuf=bytearray(6);DataL,DataH=self._Host2SCS(Position);bBuf[0]=DataL;bBuf[1]=DataH;DataL,DataH=self._Host2SCS(Time);bBuf[2]=DataL;bBuf[3]=DataH;DataL,DataH=self._Host2SCS(Speed);bBuf[4]=DataL;bBuf[5]=DataH;print('[STS3032] WritePosition ID:',ID,'Position:',Position,_B,Speed,'ACC:',ACC);return self._genWrite(ID,SCSCL_GOAL_POSITION_L,bBuf,6)
	def getVoltage(self,ID):
		Voltage=-1
		if ID==-1:Voltage=self.Mem[SMS_STS_PRESENT_VOLTAGE-SMS_STS_PRESENT_POSITION_L]
		else:
			self.Error=0;Voltage=self._readByte(ID,SMS_STS_PRESENT_VOLTAGE)
			if Voltage==-1:self.Error=1
		Voltage/=10;return Voltage
	def getTemperature(self,ID):
		Temper=-1
		if ID==-1:Temper=self.Mem[SMS_STS_PRESENT_TEMPERATURE-SMS_STS_PRESENT_POSITION_L]
		else:
			self.Error=0;Temper=self._readByte(ID,SMS_STS_PRESENT_TEMPERATURE)
			if Temper==-1:self.Error=1
		return Temper