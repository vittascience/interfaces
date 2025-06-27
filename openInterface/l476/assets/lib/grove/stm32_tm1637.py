# MicroPython TM1637 quad 7-segment LED display driver
# https://github.com/mcauser/micropython-tm1637

# MIT License
# Copyright (c) 2016-2023 Mike Causer

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

from utime import sleep_us,sleep_ms
_SEG=bytearray(b'\x3F\x06\x5B\x4F\x66\x6D\x7D\x07\x7F\x6F\x77\x7C\x39\x5E\x79\x71\x3D\x76\x06\x1E\x76\x38\x55\x54\x3F\x73\x67\x50\x6D\x78\x3E\x1C\x2A\x76\x6E\x5B\x00\x40\x63')
class TM1637:
  def __init__(self,clk,dio,bright=7):
    self.clk=clk
    self.dio=dio
    if not 0<=bright<=7:raise ValueError("Brightness out of range")
    self._bright=bright
    sleep_us(10)
    self._write_data_cmd()
    self._write_dsp_ctrl()
  def _write_digital(self,pin,state):
    try:pin.value(state)
    except:pin.duty(state*1023)
    sleep_us(10)
  def _start(self):
    self._write_digital(self.dio,0)
    self._write_digital(self.clk,0)
  def _stop(self):
    self._write_digital(self.dio,0)
    self._write_digital(self.clk,1)
    self._write_digital(self.dio,1)
  def _write_data_cmd(self):
    self._start()
    self._write_byte(0x40)
    self._stop()
  def _write_dsp_ctrl(self):
    self._start()
    self._write_byte(0x80|0x08|self._bright)
    self._stop()
  def _write_byte(self,b):
    for i in range(8):
      self._write_digital(self.dio,(b>>i)&1)
      self._write_digital(self.clk,1)
      self._write_digital(self.clk,0)
    self._write_digital(self.clk,0)
    self._write_digital(self.clk,1)
    self._write_digital(self.clk,0)
  def brightness(self,val=None):
    if val is None:return self._bright
    if not 0<=val<=7:raise ValueError("Brightness out of range")
    self._bright=val
    self._write_data_cmd()
    self._write_dsp_ctrl()
  def write(self,segs,pos=0):
    if not 0<=pos<=5:raise ValueError("Position out of range")
    self._write_data_cmd()
    self._start()
    self._write_byte(0xC0|pos)
    for seg in segs:self._write_byte(seg)
    self._stop()
    self._write_dsp_ctrl()
  def encode_str(self,str):
    segs=bytearray(len(str))
    for i in range(len(str)):segs[i]=self.encode_char(str[i])
    return segs
  def encode_char(self,char):
    o=ord(char)
    if o==32:return _SEG[36] #space
    if o==42:return _SEG[38] #star/degrees
    if o==45:return _SEG[37] #dash
    if o>=65 and o<=90:return _SEG[o-55] #uppercase A-Z
    if o>=97 and o<=122:return _SEG[o-87] #lowercase a-z
    if o>=48 and o<=57:return _SEG[o-48] #0-9
    raise ValueError("Character out of range: {:d} '{:s}'".format(o,chr(o)))
  def number(self,num):
    num=max(-999,min(num,9999))
    self.write(self.encode_str('{0: >4d}'.format(num)))
  def numbers(self,num1,num2,colon=True):
    num1=max(-9,min(num1,99))
    num2=max(-9,min(num2,99))
    segs=self.encode_str('{0:0>2d}{1:0>2d}'.format(num1,num2))
    if colon:segs[1]|=0x80
    self.write(segs)
  def temperature(self,num):
    if num<-9:self.show('lo')
    elif num>99:self.show('hi')
    else:self.write(self.encode_str('{0: >2d}'.format(num)))
    self.write([_SEG[38],_SEG[12]],2)
  def show(self,str,colon=False):
    segs=self.encode_str(str)
    if len(segs)>1 and colon:segs[1]|=128
    self.write(segs[:4])
  def scroll(self,str,delay=250):
    segs=str if isinstance(str,list) else self.encode_str(str)
    data=[0]*8
    data[4:0]=list(segs)
    for i in range(len(segs)+5):
      self.write(data[0+i:4+i])
      sleep_ms(delay)
  def clock(self,time,colon=True):
    h,mn=time
    segs=self.encode_str('{0:0>2d}{1:0>2d}'.format(h,mn))
    if colon:segs[1]|=128
    self.write(segs)