_B='{:04x}'
_A='{:02x}'
from microbit import i2c
commandHeaderAndAddress='55AA11'
algorthimsByteID={'ALGORITHM_FACE_RECOGNITION':'0000','ALGORITHM_OBJECT_TRACKING':'0100','ALGORITHM_OBJECT_RECOGNITION':'0200','ALGORITHM_LINE_TRACKING':'0300','ALGORITHM_COLOR_RECOGNITION':'0400','ALGORITHM_TAG_RECOGNITION':'0500','ALGORITHM_OBJECT_CLASSIFICATION':'0600'}
COMMAND_REQUEST_CUSTOM_NAMES=47
COMMAND_REQUEST_TAKE_PHOTO_TO_SD_CARD=48
COMMAND_REQUEST_SAVE_MODEL_TO_SD_CARD=50
COMMAND_REQUEST_LOAD_MODEL_FROM_SD_CARD=51
COMMAND_REQUEST_CUSTOM_TEXT=52
COMMAND_REQUEST_CLEAR_TEXT=53
COMMAND_REQUEST_LEARN_ONECE=54
COMMAND_REQUEST_FORGET=55
COMMAND_REQUEST_SCREENSHOT_TO_SD_CARD=57
COMMAND_REQUEST_FIRMWARE_VERSION=60
class HuskyLensLibrary:
	def __init__(A):A.address=50;A.huskylensSer=i2c;A.lastCmdSent=''
	def writeToHuskyLens(A,cmd):A.lastCmdSent=cmd;A.huskylensSer.write(A.address,cmd)
	def calculateChecksum(D,hexStr):
		A=hexStr;B=0
		for C in range(0,len(A),2):B+=int(A[C:C+2],16)
		A=hex(B)[-2:];return A
	def unhexlify(A):return bytes(int(A[B:B+2],16)for B in range(0,len(A),2))
	def cmdToBytes(A,cmd):return bytes(int(cmd[A:A+2],16)for A in range(0,len(cmd),2))
	def splitCommandToParts(G,str):
		C=str[0:4];D=str[4:6];A=int(str[6:8],16);E=str[8:10]
		if A>0:B=str[10:10+A*2]
		else:B=[]
		F=str[2*(6+A-1):2*(6+A-1)+2];return[C,D,A,E,B,F]
	def getBlockOrArrowCommand(A):B=A.huskylensSer.read(A.address,5);B+=A.huskylensSer.read(A.address,B[3]+1);C=A.splitCommandToParts(''.join(['%02x'%A for A in B]));return C[4]
	def processReturnData(B):
		try:
			D=B.huskylensSer.read(B.address,5);D+=B.huskylensSer.read(B.address,D[3]+1);A=B.splitCommandToParts(''.join(['%02x'%A for A in D]))
			if A[3]=='2e':return'Knock Recieved'
			else:
				F=[];I=int(A[4][2:4]+A[4][0:2],16);L=int(A[4][6:8]+A[4][4:6],16);M=int(A[4][10:12]+A[4][8:10],16)
				for N in range(I):F.append(B.getBlockOrArrowCommand())
				G=[]
				for E in F:
					H=[]
					for C in range(0,len(E),4):J=int(E[C:C+2],16);K=int(E[C+2:C+4],16);H.append(J+(K<<8))
					G.append(H)
				return G
		except:print('Read error');return[]
	def command_request_knock(A):B=A.cmdToBytes(commandHeaderAndAddress+'002c3c');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request(A):B=A.cmdToBytes(commandHeaderAndAddress+'002030');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_blocks(A):B=A.cmdToBytes(commandHeaderAndAddress+'002131');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_arrows(A):B=A.cmdToBytes(commandHeaderAndAddress+'002232');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_learned(A):B=A.cmdToBytes(commandHeaderAndAddress+'002333');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_blocks_learned(A):B=A.cmdToBytes(commandHeaderAndAddress+'002434');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_arrows_learned(A):B=A.cmdToBytes(commandHeaderAndAddress+'002535');A.writeToHuskyLens(B);return A.processReturnData()
	def line_tracking_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d030042');A.writeToHuskyLens(B);return A.processReturnData()
	def face_recognition_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d00003f');A.writeToHuskyLens(B);return A.processReturnData()
	def object_tracking_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d010040');A.writeToHuskyLens(B);return A.processReturnData()
	def object_recognition_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d020041');A.writeToHuskyLens(B);return A.processReturnData()
	def color_recognition_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d040043');A.writeToHuskyLens(B);return A.processReturnData()
	def tag_recognition_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d050044');A.writeToHuskyLens(B);return A.processReturnData()
	def object_classification_mode(A):B=A.cmdToBytes(commandHeaderAndAddress+'022d060045');A.writeToHuskyLens(B);return A.processReturnData()
	def command_request_by_id(C,idVal):A=idVal;A=_B.format(A);A=A[2:]+A[0:2];B=commandHeaderAndAddress+'0226'+A;B+=C.calculateChecksum(B);B=C.cmdToBytes(B);C.writeToHuskyLens(B);return C.processReturnData()
	def command_request_blocks_by_id(C,idVal):A=idVal;A=_B.format(A);A=A[2:]+A[0:2];B=commandHeaderAndAddress+'0227'+A;B+=C.calculateChecksum(B);B=C.cmdToBytes(B);C.writeToHuskyLens(B);return C.processReturnData()
	def command_request_arrows_by_id(C,idVal):A=idVal;A=_B.format(A);A=A[2:]+A[0:2];B=commandHeaderAndAddress+'0228'+A;B+=C.calculateChecksum(B);B=C.cmdToBytes(B);C.writeToHuskyLens(B);return C.processReturnData()
	def command_request_algorthim(B,alg):
		if alg in algorthimsByteID:A=commandHeaderAndAddress+'022d'+algorthimsByteID[alg];A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
		else:print('INCORRECT ALGORITHIM NAME')
	def command_request_custom_text(B,text,x,y):
		D=len(text);C=D+4;A=commandHeaderAndAddress;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_CUSTOM_TEXT);A+=_A.format(C)
		if x>255:E=255;A+=_A.format(E);F=x%256;A+=_A.format(F)
		else:A+=_A.format(0);A+=_A.format(x)
		A+=_A.format(y)
		for G in text:A+=_A.format(ord(G))
		A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_clear_text(B):A=commandHeaderAndAddress;C=0;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_CLEAR_TEXT);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_photo(B):A=commandHeaderAndAddress;C=0;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_TAKE_PHOTO_TO_SD_CARD);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_forget(B):A=commandHeaderAndAddress;C=0;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_FORGET);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_screenshot(B):A=commandHeaderAndAddress;C=0;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_SCREENSHOT_TO_SD_CARD);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_learn_once(B,id):A=commandHeaderAndAddress;C=2;A+=_A.format(C);A+=_A.format(COMMAND_REQUEST_LEARN_ONECE);id=[id&255,id>>8&255];A+=_A.format(id[0]);A+=_A.format(id[1]);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_custom_name(B,id,name):
		C=len(name);D=C+3;A=commandHeaderAndAddress;A+=_A.format(D);A+=_A.format(COMMAND_REQUEST_CUSTOM_NAMES);A+=_A.format(id);A+=_A.format(C+1)
		for E in name:A+=_A.format(ord(E))
		A+=_A.format(0);A+=B.calculateChecksum(A);A=B.cmdToBytes(A);B.writeToHuskyLens(A);return B.processReturnData()
	def command_request_save_model_to_SD_card(C,index):B=index;A=commandHeaderAndAddress;D=2;A+=_A.format(D);A+=_A.format(COMMAND_REQUEST_SAVE_MODEL_TO_SD_CARD);B=[B&255,B>>8&255];A+=_A.format(B[0]);A+=_A.format(B[1]);A+=C.calculateChecksum(A);A=C.cmdToBytes(A);C.writeToHuskyLens(A);return C.processReturnData()
	def command_request_load_model_from_SD_card(C,index):B=index;A=commandHeaderAndAddress;D=2;A+=_A.format(D);A+=_A.format(COMMAND_REQUEST_LOAD_MODEL_FROM_SD_CARD);B=[B&255,B>>8&255];A+=_A.format(B[0]);A+=_A.format(B[1]);A+=C.calculateChecksum(A);A=C.cmdToBytes(A);C.writeToHuskyLens(A);return C.processReturnData()