from machine import I2C,SoftI2C,Pin
from math import sqrt
import time
VEML6040_ADDR=16
VEML6040_CONF=0
CONF=b'\x00'
REG_RED=8
REG_GREEN=9
REG_BLUE=10
REG_WHITE=11
DEFAULT_SETTINGS=b'\x00'
SHUTDOWN=b'\x01'
INTEGRATION_TIME=40
G_SENSITIVITY=.25168
_NaN=float('NaN')
class VEML6040:
	def __init__(A):A.i2c_veml=SoftI2C(scl=Pin('B13'),sda=Pin('B14'));time.sleep(.1);A.write8(VEML6040_ADDR,CONF,SHUTDOWN);time.sleep(.1);A.write8(VEML6040_ADDR,CONF,DEFAULT_SETTINGS);time.sleep(.1)
	def write8(A,addr,reg,data):
		if reg is None:A.i2c_veml.writeto(addr,data)
		else:A.i2c_veml.writeto(addr,reg+data)
	def readfrom_mem(A,addr,memaddr,nbytes,*,addrsize=8):B=memaddr.to_bytes(addrsize//8,'big');A.i2c_veml.write(addr,B,repeat=True);return A.i2c_veml.read(addr,nbytes)
	def readRGB(C):
		P='cct';O='als';N='white';M='blue';L='green';K='red';F='little';A=C.i2c_veml.readfrom_mem(VEML6040_ADDR,REG_RED,2);D=int.from_bytes(A,F);A=C.i2c_veml.readfrom_mem(VEML6040_ADDR,REG_GREEN,2);B=int.from_bytes(A,F);A=C.i2c_veml.readfrom_mem(VEML6040_ADDR,REG_BLUE,2);E=int.from_bytes(A,F);A=C.i2c_veml.readfrom_mem(VEML6040_ADDR,REG_WHITE,2);Q=int.from_bytes(A,F);I=-.023249*D+.291014*B+-.36488*E;J=-.042799*D+.272148*B+-.279591*E;R=-.155901*D+.251534*B+-.07624*E;G=I+J+R
		if G==0:return{K:_NaN,L:_NaN,M:_NaN,N:_NaN,O:_NaN,P:_NaN}
		else:S=I/G;T=J/G
		H=(S-.332)/(.1858-T);U=449.*H**3+3525.*H**2+6823.3*H+5520.33;V=B*G_SENSITIVITY;return{K:D,L:B,M:E,N:Q,O:V,P:U}