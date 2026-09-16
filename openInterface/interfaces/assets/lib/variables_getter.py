import os
import machine
import micropython
import ubinascii

variablesGetter = False
variablesGetterTimer = None
variablesGetterBusy = False
variablesGetterScope = None

def _emit_global_var(name, value_str, value_type):
  line = str(name) + '|' + value_str + '|' + value_type
  payload = ubinascii.hexlify(line.encode()).decode()
  print('@GlobalVarsHex:' + payload)

def _scan_global_vars(_):
  global variablesGetter
  global variablesGetterBusy
  global variablesGetterTimer
  global variablesGetterScope

  if not variablesGetter:
    variablesGetterBusy = False
    if variablesGetterTimer is not None:
      try:
        variablesGetterTimer.deinit()
      except:
        pass
      variablesGetterTimer = None
    return

  try:
    print('@GlobalVarsRefresh')

    variables = variablesGetterScope if variablesGetterScope is not None else globals()

    for name in variables:
      if name in [
        'variablesGetterTimer',
        'variablesGetterBusy',
        'variablesGetterScope',
        'runVariablesGetter',
        'stopVariablesGetter',
        '_emit_global_var',
        '_scan_global_vars',
        '_schedule_global_vars'
      ]:
        continue

      try:
        value = variables[name]
      except:
        continue

      try:
        value_type = type(value).__name__
      except:
        value_type = '<type error>'

      if value_type in ['function', 'module', 'type']:
        continue

      try:
        value_str = str(value)
      except:
        value_str = '<print error>'

      if len(value_str) > 17:
        value_str = value_str[:17] + '...'

      _emit_global_var(name, value_str, value_type)

  except Exception as e:
    print("@GlobalVarsError: " + str(e))

  variablesGetterBusy = False

def _schedule_global_vars(_):
  global variablesGetter
  global variablesGetterBusy

  if not variablesGetter:
    return

  if variablesGetterBusy:
    return

  variablesGetterBusy = True

  try:
    micropython.schedule(_scan_global_vars, 0)
  except:
    variablesGetterBusy = False

def runVariablesGetter(scope=None, period_ms=1000):
  global variablesGetter
  global variablesGetterTimer
  global variablesGetterBusy
  global variablesGetterScope

  if variablesGetter:
    return

  variablesGetter = True
  variablesGetterBusy = False
  variablesGetterScope = scope
  machineInfos = str(os.uname())
  if ('Pico' in machineInfos and 'rp2' in machineInfos) or 'pyboard' in machineInfos:
    variablesGetterTimer = machine.Timer()
  else:
    variablesGetterTimer = machine.Timer(0)
  
  variablesGetterTimer.init(
    period=period_ms,
    mode=machine.Timer.PERIODIC,
    callback=_schedule_global_vars
  )

def stopVariablesGetter():
  global variablesGetter
  global variablesGetterTimer
  global variablesGetterBusy

  variablesGetter = False
  variablesGetterBusy = False

  if variablesGetterTimer is not None:
    try:
      variablesGetterTimer.deinit()
    except:
      pass
    variablesGetterTimer = None

  print("@GlobalVarsStop.")