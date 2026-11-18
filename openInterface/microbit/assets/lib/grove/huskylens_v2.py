import struct
from huskylens_v2_protocol import I2CTransport,Protocol,pad10,_ms,_diff,ALGORITHM_IDS,_KEYPOINT_NAMES
BOX,ARROW,FRAME,LINE,SAVE,LOAD="BOX","ARROW","BOX","ARROW",0,1
RESOLUTION_DEFAULT,RESOLUTION_640X480,RESOLUTION_1280X720,RESOLUTION_1920X1080=0,1,2,3
MEDIA_AUDIO,MEDIA_VIDEO,MEDIA_AUDIO_VIDEO=1,2,3
FONT_SIZES=(20,24,26,27,28,32,36,40,48)
DFROBOT_COLORS={"white":0xFFFFFF,"red":0xFF0000,"orange":0xFFA500,"yellow":0xFFFF00,"green":0xFF00,"cyan":0xFFFF,"blue":0xFF,"purple":0x800080,"pink":0xFFC0CB,"gray":0x808080,"black":0,"brown":0xA52A2A,"olive":0x808000,"teal":0x8080,"indigo":0x4B0082,"magenta":0xFF00FF}
_ALIASES=[x.split(":") for x in "universal:0,none:0,self_learning:6,auto_learning:6,auto-apprentissage:6,auto apprentissage:6,instance:7,segmentation:7,segment:7,license:10,plaque:10,ocr:11,emotion:13,expression:13,gaze:14,regard:14,orientation:15,gesture:8,geste:8,qr:18,hand:8,main:8,pose:9,bar:17,tag:16,tiq:16,line:12,lign:12,class:5,color:4,coul:4,track:3,suiv:3,depth:20,profondeur:20,donkey:21,auto_drive_2:22,auto_drive_1:21,drive:21,raw:22,camera:22,obj:2,face:1,faci:1,visag:1,fall:19,chute:19".split(",")]
def _mode_id(m):
 if isinstance(m,int) or(isinstance(m,str) and m.isdigit()):return int(m)
 v=str(m).lower()
 for k,a in _ALIASES:
  if k in v:return int(a)
 return 1
def _as_text_bytes(v,m):
 d=str(v).encode("utf-8")
 if len(d)<=m:return d
 d=d[:m]
 while d:
  try:d.decode("utf-8");break
  except:d=d[:-1]
 return d
_is_arrow=lambda it:str(it).upper() in("ARROW","LINE","2") or it is True
_clamp_u8=lambda v:max(0,min(255,int(v)))
_clamp_i16=lambda v:max(-32768,min(32767,int(v)))
_empty_prop=lambda d:"" if str(d).lower() in("name","content","5","6") else 0
class HuskyLensV2:
 def __init__(self,i2c=None):
  self._proto=Protocol(I2CTransport(i2c));self.current_mode=1;self.cached_items=[];self._t=0;self.learned_id=0;self._osd=None;self._multi_algo_count=0
 def initI2c(self):return self._proto.request_ok(0,0,pad10(1),retry=20,timeout_ms=300,pause_ms=100)
 def initMode(self,m):
  a=_mode_id(m)
  if a<0 or 23<=a<128 or a>255:return False
  ok=self._proto.request_ok(0x0A,0,pad10(a),retry=3,timeout_ms=2000,pause_ms=1000)
  if ok:self.current_mode=a;self.cached_items=[]
  return ok
 def request(self):
  items=self._proto.fetch_results(self.current_mode)
  if items is None:self.cached_items=[];return False
  self.cached_items,self._t=items,_ms();return len(items)>0
 def _ensure_results(self):
  if not self.cached_items or _diff(_ms(),self._t)>60:self.request()
 def _items(self,arrow=None):
  self._ensure_results()
  return self.cached_items if arrow is None else [it for it in self.cached_items if it.arrow==arrow]
 def _find(self,target_id,arrow):
  self._ensure_results();tid=int(target_id)
  for it in self.cached_items:
   if it.arrow==arrow and(tid<=0 or it.id==tid):return it
  return None
 def _read_item(self,it,data):
  p=str(data).lower().strip()
  if not it:return _empty_prop(p)
  if p in("x","1","xcenter","x_target","pitch"):return it.x
  if p in("y","2","ycenter","y_target","yaw"):return it.y
  if p in("w","width","3","angle","steering","roll"):return it.width
  if p in("h","height","4","length","len","throttle"):return it.height
  if p in("id","0"):return it.id
  if p in("name","5"):return it.name
  if p in("content","6"):return it.content
  if p in("confidence","level","7"):return it.confidence
  return it.algo_id if p=="algorithm" else 0
 def isAppear(self,target_id,item_type):return self._find(target_id,_is_arrow(item_type)) is not None
 def getResultById(self,tid,item_type=BOX,data="id"):return self._read_item(self._find(tid,_is_arrow(item_type)),data)
 def readBox(self,tid,data):return self.getResultById(tid,False,data)
 def readArrow(self,tid,data):return self.getResultById(tid,True,data)
 def readId(self):return self.readBox(0,"id")
 def count(self,item_type=BOX):return len(self._items(_is_arrow(item_type)))
 def getResultByIndex(self,idx,item_type=BOX,data="id"):
  items=self._items(_is_arrow(item_type));idx=int(idx)
  return self._read_item(items[idx],data) if 0<=idx<len(items) else _empty_prop(data)
 def getCenterResult(self,item_type=BOX,data="id"):
  items=self._items(_is_arrow(item_type))
  if not items:return _empty_prop(data)
  return self._read_item(min(items,key=lambda it:(it.x-320)**2+(it.y-240)**2),data)
 def getLargestResult(self,item_type=BOX,data="id"):
  items=self._items(_is_arrow(item_type))
  if not items:return _empty_prop(data)
  return self._read_item(max(items,key=lambda it:max(0,it.width)*max(0,it.height)),data)
 getNearestResult=getLargestResult
 def getVisibleIds(self,item_type=BOX):
  ids=[]
  for it in self._items(_is_arrow(item_type)):
   if it.id not in ids:ids.append(it.id)
  return ids
 def getVisibleId(self,idx,item_type=BOX):
  ids=self.getVisibleIds(item_type);idx=int(idx)
  return ids[idx] if 0<=idx<len(ids) else 0
 def getVisibleIdCount(self,item_type=BOX):return len(self.getVisibleIds(item_type))
 def countById(self,tid,item_type=BOX):return sum(1 for it in self._items(_is_arrow(item_type)) if it.id==int(tid))
 def getUpcomingBranchCount(self):return max(0,len(self._items(True))-1)
 getBranchCount=getUpcomingBranchCount
 def getBranchByIndex(self,idx,data="angle"):
  items=self._items(True);idx=int(idx)+1
  return self._read_item(items[idx],data) if 1<=idx<len(items) else 0
 def getKeypoint(self,idx,axis="x",item_type=BOX,tid=0):
  it=self._find(tid,_is_arrow(item_type))
  if not it:return 0
  names=_KEYPOINT_NAMES.get(it.algo_id,())
  idx=int(idx)
  if idx<0 or idx>=len(names):return 0
  suf="y" if str(axis).lower() in("y","1","vertical") else "x"
  return it.keypoints.get(names[idx]+"_"+suf,0)
 def getFaceOrientation(self,axis,tid=0):return self.readBox(tid,axis)
 def writeLearn1(self):
  r=self._proto.request(0x22,self.current_mode,pad10(0))
  self.learned_id=struct.unpack("<h",r[2][2:4])[0] if r and len(r[2])>=4 and r[2][1]==0 else 0
  return self.learned_id
 def learnBlock(self,x,y,w,h):
  d=bytes(2)+struct.pack("<hhhh",_clamp_i16(x),_clamp_i16(y),_clamp_i16(w),_clamp_i16(h))
  r=self._proto.request(0x2C,self.current_mode,d)
  self.learned_id=struct.unpack("<h",r[2][2:4])[0] if r and len(r[2])>=4 and r[2][1]==0 else 0
  return self.learned_id
 def forgetLearn(self):return self._proto.request_ok(0x23,self.current_mode,pad10(self.current_mode))
 def writeName(self,tid,name):
  t=_as_text_bytes(name,32);return self._proto.request_ok(0x0B,self.current_mode,pad10(int(tid))+bytes((len(t),))+t)
 def writeOSD(self,name,x,y,font_size=24,color=0xFFFFFF):
  fs=int(font_size) if int(font_size) in FONT_SIZES else 24
  t=_as_text_bytes(name,100);st=(str(name),int(x),int(y),fs,int(color)&0xFFFFFFFF)
  if self._osd==st:return True
  d=bytes((0,fs))+struct.pack("<hh",_clamp_i16(x),_clamp_i16(y))+bytes(4)+bytes((len(t),))+t+b"\x00"+struct.pack("<I",int(color)&0xFFFFFFFF)+bytes(4)
  ok=self._proto.request_ok(0x28,0,d,timeout_ms=2000,pause_ms=100)
  self._osd=st if ok else None
  return ok
 def clearOSD(self):self._osd=None;return self._proto.request_ok(0x29,0,b"",timeout_ms=2000,pause_ms=100)
 def _rect(self,cmd,x,y,w,h,col,lw):
  d=struct.pack("<BBhhhhHI",0,_clamp_u8(lw),_clamp_i16(x),_clamp_i16(y),_clamp_i16(w),_clamp_i16(h),0,int(col)&0xFFFFFFFF)
  return self._proto.request_ok(cmd,0,d)
 def drawRect(self,x,y,w,h,color=0xFFFFFF,line_width=1):return self._rect(0x26,x,y,w,h,color,line_width)
 def clearRect(self):return self._proto.request_ok(0x27,0,b"")
 def drawUniqueRect(self,x,y,w,h,color=0xFFFFFF,line_width=1):return self._rect(0x2D,x,y,w,h,color,line_width)
 def _return_args(self,cmd,algo=0,data=b""):
  r=self._proto.request(cmd,algo,data,expect=0x1A,timeout_ms=1000)
  return r[2] if r and len(r[2])>=10 and r[2][1]==0 else None
 def _return_string(self,d):
  if not d or len(d)<11:return ""
  vl=d[10];return d[11:11+vl].decode("utf-8","ignore") if 11+vl<=len(d) else ""
 def takePhoto(self,res=2):
  return self._return_string(self._return_args(0x20,0,pad10(int(res) if int(res) in(0,1,2,3) else 0)))
 def takeScreenshot(self):return self._return_string(self._return_args(0x21,0,b""))
 def playMusic(self,name,vol=100):
  t=_as_text_bytes(name,100);d=bytes(2)+struct.pack("<h",_clamp_i16(vol))+bytes(6)+bytes((len(t),))+t
  return self._proto.request_ok(0x2A,0,d)
 def startRecording(self,res=0,media=3,dur=0,fn=""):
  res,media=int(res),int(media)
  if res not in(0,1,2,3) or media not in(1,2,3):return False
  t=_as_text_bytes(fn,100);d=struct.pack("<BBh",res,media,_clamp_i16(dur))+bytes(10)
  return self._proto.request_ok(0x2E,0,d+bytes((len(t),))+t if t else d)
 def stopRecording(self,media=3):
  m=int(media);return self._proto.request_ok(0x2F,0,bytes((0,m))+bytes(12)) if m in(1,2,3) else False
 def saveKnowledge(self,b):
  b=int(b);return self._proto.request_ok(0x24,self.current_mode,pad10(b)) if 0<=b<=4 else False
 def loadKnowledge(self,b):
  b=int(b);return self._proto.request_ok(0x25,self.current_mode,pad10(b)) if 0<=b<=4 else False
 saveKnowledges=saveKnowledge
 loadKnowledges=loadKnowledge
 def saveModelToTFCard(self,cmd,data):
  s=str(cmd).upper().strip()
  return self.saveKnowledge(data) if s in("0","SAVE","0X24") or cmd==0 else self.loadKnowledge(data)
 def setMultiAlgorithm(self,a0,a1,a2=0):
  req=[int(a0),int(a1),int(a2)]
  if any(a<0 or a>255 or 23<=a<128 for a in req):return False
  algos=[a for a in req if a]
  if len(algos)<2:return False
  cnt=len(algos);algos+=[0]*(3-cnt)
  d=bytes((cnt,0))+struct.pack("<HHH",algos[0],algos[1],algos[2])+bytes(6)
  ok=self._proto.request_ok(0x0C,0,d)
  if ok:self._multi_algo_count=cnt
  return ok
 def setMultiAlgorithmRatio(self,r0,r1,r2=0):
  rat=[max(0,min(100,int(x))) for x in(r0,r1,r2)]
  cnt=self._multi_algo_count or(3 if rat[2] else 2)
  return self._proto.request_ok(0x0D,0,bytes((cnt,0))+struct.pack("<HHH",rat[0],rat[1],rat[2])+bytes(6))
 def getAlgoParam(self,key,vt="string",aid=0):
  kb=_as_text_bytes(key,100);d=bytes(14)+bytes((len(kb),))+kb+b"\x00"
  a=self.current_mode if int(aid)==0 else int(aid)
  r=self._return_args(0x02,a,d)
  if r is None:return "" if str(vt).lower()=="string" else 0
  k=str(vt).lower()
  if k in("bool","boolean"):return len(r)>=4 and struct.unpack("<h",r[2:4])[0]!=0
  if k in("int","integer","number"):return struct.unpack("<h",r[2:4])[0] if len(r)>=4 else 0
  if k in("float","decimal"):return struct.unpack("<f",r[2:6])[0] if len(r)>=6 else 0.0
  return self._return_string(r)
 def setAlgoParam(self,key,val,vt="string",aid=0):
  kb=_as_text_bytes(key,70);k=str(vt).lower()
  if k in("bool","boolean","int","integer"):
   n=int(bool(val)) if k in("bool","boolean") else _clamp_i16(val)
   d=bytes((1,0))+struct.pack("<h",n)+bytes(10)+bytes((len(kb),))+kb+b"\x00"
  elif k in("float","decimal","number"):
   d=bytes((2,0))+struct.pack("<f",float(val))+bytes(8)+bytes((len(kb),))+kb+b"\x00"
  else:
   vb=_as_text_bytes(val,100)
   if len(kb)+len(vb)+16>122:vb=vb[:max(0,106-len(kb))]
   d=bytes(14)+bytes((len(kb),))+kb+bytes((len(vb),))+vb
  return self._proto.request_ok(0x0E,self.current_mode if int(aid)==0 else int(aid),d)
 def updateAlgoParams(self,aid=0):return self._proto.request_ok(0x0F,self.current_mode if int(aid)==0 else int(aid),b"")
 def exit(self):return self._proto.request_ok(0x2B,0,b"")
HuskyLens=HuskyLensV2
huskylens=HuskyLensV2()
