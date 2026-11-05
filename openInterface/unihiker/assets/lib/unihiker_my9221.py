"""
MicroPython MY9221 LED driver
https://github.com/mcauser/micropython-my9221

MIT License
Copyright (c) 2018 Mike Causer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import time
try:
  from pinpong.board import Pin
except ImportError:
  # UNIHIKER K10 (MicroPython): pins of unihiker_k10 (P0 to P20), same write_digital method
  from unihiker_k10 import pin as _k10_pin
  class Pin:
    OUT = 1
    def __new__(cls, number, mode=None):
      return _k10_pin(number)

class MY9221:
  def __init__(self, di, dcki, reverse=False):
    # pins of PinPong (Pin.P0...)
    self._d = Pin(di, Pin.OUT)
    self._c = Pin(dcki, Pin.OUT)
    self._r = reverse
    self._clock = 0
    self._d.write_digital(0)
    self._c.write_digital(0)

  def _latch(self):
    self._d.write_digital(0)
    time.sleep((1) / 1000)
    for i in range(4):
      self._d.write_digital(1)
      self._d.write_digital(0)
    time.sleep((1) / 1000)

  def _write16(self, data):
    for i in range(15,-1,-1):
      self._d.write_digital((data >> i) & 1)
      self._clock = 1 - self._clock
      self._c.write_digital(self._clock)

  def _begin(self):
    self._write16(0) # command: 8bit mode

  def _end(self):
    # unused last 2 channels are required to fill the 208 bit shift register
    self._write16(0)
    self._write16(0)
    self._latch()

  def reverse(self, val=None):
    if val is None:
      return self._r
    self._r = val

  def level(self, val, brightness=255):
    self._begin()
    for i in range(9,-1,-1) if self._r else range(10):
      self._write16(brightness if val > i else 0)
    self._end()

  def bits(self, val, brightness=255):
    val &= 0x3FF
    self._begin()
    for i in range(9,-1,-1) if self._r else range(10):
      self._write16(brightness if (val >> i) & 1 else 0)
    self._end()

  def bytes(self, buf):
    self._begin()
    for i in range(9,-1,-1) if self._r else range(10):
      self._write16(buf[i])
    self._end()