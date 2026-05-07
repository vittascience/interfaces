import machine
import gc

class IR_RX:
  REPEAT=-1
  BADSTART=-2
  BADBLOCK=-3
  BADREP=-4
  OVERRUN=-5
  BADDATA=-6
  BADADDR=-7

  def __init__(self,pin,callback,*args):
    self._pin=pin
    self.callback=callback
    self.args=args
    self._errf=lambda _ : None
    self._times=[]
    self._times_buf=[None] * 102
    self.cb=self.decode

    gc.collect()

  def _cb_pin(self):
    pin = self._pin
    tpu = machine.time_pulse_us
    buf = self._times_buf

    pin.set_pull(pin.NO_PULL)

    gc.disable()
    try:
      for _ in range(300):
        d0 = tpu(pin, 0, 15000)
        if d0 > 2000:
          break
      else:
        self._times = []
        return False

      d1 = tpu(pin, 1, 8000)
      if d1 < 0:
        self._times = []
        return False

      buf[0] = d0
      buf[1] = d1
      n = 2

      for _ in range(50):
        dl = tpu(pin, 0, 3000)
        if dl < 0:
          buf[n] = None
          n += 1
          if n < 102:
            buf[n] = None
            n += 1
          break

        buf[n] = dl
        n += 1

        dh = tpu(pin, 1, 4000)
        if dh < 0:
          buf[n] = None
          n += 1
          break

        buf[n] = dh
        n += 1

    finally:
      gc.enable()

    n = self.clean_times(buf, n)
    self._times = buf
    self._times_len = n
    return True

  def clean_times(self, buf, length):
    write = 2

    i = 2
    while i + 1 < length:
      dl = buf[i]
      dh = buf[i + 1]

      if dl is None or dh is None or dl < 80 or dh < 80:
        buf[write] = None
        buf[write + 1] = None
      else:
        buf[write] = dl
        buf[write + 1] = dh

      write += 2
      i += 2

    return write
  def do_callback(self,cmd,addr,ext,thresh=0):
    if cmd >= thresh:self.callback(cmd,addr,ext,*self.args)
    else:self._errf(cmd)
  def error_function(self,func):self._errf=func