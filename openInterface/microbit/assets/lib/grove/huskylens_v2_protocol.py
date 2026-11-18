import struct,time
if hasattr(time,"ticks_ms"):_ms,_diff,_sleep=time.ticks_ms,time.ticks_diff,time.sleep_ms
else:_ms=lambda:int(time.time()*1000);_diff=lambda a,b:a-b;_sleep=lambda ms:time.sleep(ms/1000)
HEADER,MAX_FRAME_SIZE,MAX_RESULT_NUM,FIXED_DATA_SIZE,MIN_DATA_SIZE=b"\x55\xAA",128,6,14,10
ALGORITHM_IDS={"universal":0,"face_recognition":1,"object_recognition":2,"object_tracking":3,"color_recognition":4,"object_classification":5,"self_learning_classification":6,"instance_segmentation":7,"segment":7,"hand_recognition":8,"gesture_recognition":8,"pose_recognition":9,"license_recognition":10,"ocr_recognition":11,"line_tracking":12,"emotion_recognition":13,"gaze_recognition":14,"face_orientation":15,"tag_recognition":16,"barcode_recognition":17,"qr_code_recognition":18,"fall_recognition":19,"depth_detection":20,"donkeycar":21,"auto_drive_1":21,"auto_drive_2":22,"camera":22,"raw_camera":22}
_KEYPOINT_NAMES={1:"leye reye nose lmouth rmouth".split(),8:"wrist thumb_cmc thumb_mcp thumb_ip thumb_tip index_finger_mcp index_finger_pip index_finger_dip index_finger_tip middle_finger_mcp middle_finger_pip middle_finger_dip middle_finger_tip ring_finger_mcp ring_finger_pip ring_finger_dip ring_finger_tip pinky_finger_mcp pinky_finger_pip pinky_finger_dip pinky_finger_tip".split(),9:"nose leye reye lear rear lshoulder rshoulder lelbow relbow lwrist rwrist lhip rhip lknee rknee lankle rankle".split()}
def pad14(v=0):return bytes((v&0xFF,))+bytes(13)
pad10=pad14
def _txt(d):return str(d.decode()).rstrip("\x00")
class Item:
 __slots__=("id","algo_id","confidence","x","y","width","height","name","content","arrow","private_data","keypoints")
 def __init__(self,d,arrow,data_size=FIXED_DATA_SIZE):
  self.id,self.algo_id=d[0],d[1];self.x,self.y,self.width,self.height=struct.unpack("<hhhh",d[2:10]);self.arrow=arrow
  self.confidence=0.0 if arrow or data_size==MIN_DATA_SIZE else struct.unpack("<f",d[10:14])[0]
  self.name,self.content,self.private_data="","",b""
  idx=data_size
  if len(d)>idx:
   nl=d[idx];idx+=1
   if len(d)>=idx+nl:
    self.name=_txt(d[idx:idx+nl]);idx+=nl
    if len(d)>idx:
     cl=d[idx];idx+=1
     if len(d)>=idx+cl:self.content=_txt(d[idx:idx+cl]);self.private_data=d[idx+cl:]
  self.keypoints={};names=_KEYPOINT_NAMES.get(self.algo_id,())
  if names and len(self.private_data)>=len(names)*4:
   vals=struct.unpack("<"+"h"*(len(names)*2),self.private_data[:len(names)*4])
   for i,p in enumerate(names):self.keypoints[p+"_x"],self.keypoints[p+"_y"]=vals[i*2],vals[i*2+1]
 w=property(lambda s:s.width);h=property(lambda s:s.height);angle=property(lambda s:s.width)
 length=property(lambda s:s.height);x_target=property(lambda s:s.x);y_target=property(lambda s:s.y)
 pitch=property(lambda s:s.x);yaw=property(lambda s:s.y);roll=property(lambda s:s.width)
class I2CTransport:
 def __init__(self,i2c=None):
  if not i2c:
   import sys
   if sys.platform=="microbit":import microbit;i2c=microbit.i2c;i2c.init()
   elif sys.platform in("esp32","rp2"):import machine;i2c=machine.I2C(0)
  self.i2c=i2c;self._mb=hasattr(i2c,"read")and not hasattr(i2c,"readfrom")
 def write(self,d):
  if not self.i2c:return False
  try:
   if self._mb:self.i2c.write(0x50,d)
   else:self.i2c.writeto(0x50,d)
   return True
  except OSError:return False
 def read(self,n):
  if not self.i2c:return b""
  try:return self.i2c.read(0x50,n) if self._mb else self.i2c.readfrom(0x50,n)
  except OSError:return b""
class Protocol:
 def __init__(self,transport):self.t,self.buf=transport,b""
 def send(self,cmd,algo=0,data=b""):
  data=bytes(data)
  if len(data)>min(255,MAX_FRAME_SIZE-6):return False
  f=HEADER+bytes((cmd&0xFF,algo&0xFF,len(data)))+data
  return self.t.write(f+bytes((sum(f)&0xFF,)))
 def _find_hdr(self,b):
  for k in range(len(b)-1):
   if b[k]==0x55 and b[k+1]==0xAA:return k
  return -1
 def _extract(self):
  b=self.buf
  while True:
   i=self._find_hdr(b)
   if i<0:self.buf=b[-1:] if b[-1:]==b"\x55" else b"";return None
   if i>0:b=b[i:]
   if len(b)<5:self.buf=b;return None
   tot=6+b[4]
   if tot>MAX_FRAME_SIZE:b=b[2:];continue
   if len(b)<tot:self.buf=b;return None
   p,b=b[:tot],b[tot:]
   if(sum(p[:-1])&0xFF)==p[-1]:self.buf=b;return p[2],p[3],p[5:-1]
   b=b[2:]
 def receive(self,expect=None,timeout_ms=300):
  t0=_ms()
  while True:
   f=self._extract()
   while f is not None:
    if expect is None or f[0]==expect:return f
    f=self._extract()
   if _diff(_ms(),t0)>=timeout_ms:return None
   c=self.t.read(32)
   if c:self.buf+=bytes(c)
   else:_sleep(10)
 def request(self,cmd,algo=0,data=b"",expect=0x1A,retry=3,timeout_ms=300,pause_ms=0):
  for _ in range(retry):
   if not self.send(cmd,algo,data):_sleep(pause_ms or 100);continue
   if pause_ms:_sleep(pause_ms)
   r=self.receive(expect,timeout_ms)
   if r is not None:return r
  return None
 def request_ok(self,cmd,algo=0,data=b"",min_data=MIN_DATA_SIZE,**kw):
  r=self.request(cmd,algo,data,**kw);return r is not None and len(r[2])>=min_data and r[2][1]==0
 def fetch_results(self,algo):
  r=self.request(1,algo,b"",expect=0x1B,retry=2,timeout_ms=1000)
  if not r:return None
  data_size=len(r[2])
  if data_size not in(MIN_DATA_SIZE,FIXED_DATA_SIZE):return []
  tot_res,tot_blk=struct.unpack("<H",r[2][2:4])[0],struct.unpack("<H",r[2][6:8])[0]
  tot_res=min(tot_res,10);tot_blk=min(tot_blk,tot_res);items=[]
  for k in range(tot_res):
   is_arr=k>=tot_blk;f=self.receive(0x1D if is_arr else 0x1C,300)
   if not f:break
   if len(items)<MAX_RESULT_NUM and len(f[2])>=data_size:items.append(Item(f[2],is_arr,data_size))
  return items
