def run_every(callback=None, days=0, h=0, min=0, s=0, ms=0):
  if callback is not None:
        simulator_runEvery(callback, days, h, min, s, ms)
  else:
    def wrap(f):
        simulator_runEvery(f, days, h, min, s, ms)
    return wrap