def onevent(callback=None):
  if callback is not None:
        simulator_onEvent(callback)
  else:
    def wrap(f):
        simulator_onEvent(f)
    return wrap