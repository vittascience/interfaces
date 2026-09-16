from microbit import run_every, running_time

variablesGetter = False
variablesGetterBusy = False
variablesGetterScope = None
variablesGetterPeriodMs = 1000
variablesGetterNextRun = 0
variablesGetterSchedulerStarted = False

def _to_hex(s):
    hex_chars = '0123456789abcdef'
    data = s.encode()
    out = ''
    for b in data:
        out += hex_chars[(b >> 4) & 15]
        out += hex_chars[b & 15]
    return out

def _emit_global_var(name, value_str, value_type):
    line = str(name) + '|' + value_str + '|' + value_type
    payload = _to_hex(line)
    print('@GlobalVarsHex:' + payload)

def _scan_global_vars():
    global variablesGetterBusy
    global variablesGetterScope

    try:
        print('@GlobalVarsRefresh')

        variables = variablesGetterScope if variablesGetterScope is not None else globals()

        for name in variables:
            if name in [
                'variablesGetter',
                'variablesGetterBusy',
                'variablesGetterScope',
                'variablesGetterPeriodMs',
                'variablesGetterNextRun',
                'variablesGetterSchedulerStarted',
                'runVariablesGetter',
                'stopVariablesGetter',
                '_to_hex',
                '_emit_global_var',
                '_scan_global_vars',
                '_variables_getter_tick'
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

            if value_type in ['function', 'module', 'type'] or 'MicroBit' in value_type:
                continue

            try:
                value_str = str(value)
            except:
                value_str = '<print error>'

            if len(value_str) > 17:
                value_str = value_str[:17] + '...'

            _emit_global_var(name, value_str, value_type)

    except:
        pass

    variablesGetterBusy = False

def _variables_getter_tick():
    global variablesGetter
    global variablesGetterBusy
    global variablesGetterNextRun
    global variablesGetterPeriodMs

    if not variablesGetter:
        return

    if variablesGetterBusy:
        return

    now = running_time()

    if now < variablesGetterNextRun:
        return

    variablesGetterBusy = True
    variablesGetterNextRun = now + variablesGetterPeriodMs
    _scan_global_vars()

def runVariablesGetter(scope=None, period_ms=1000):
    global variablesGetter
    global variablesGetterBusy
    global variablesGetterScope
    global variablesGetterPeriodMs
    global variablesGetterNextRun
    global variablesGetterSchedulerStarted

    if not variablesGetterSchedulerStarted:
        run_every(_variables_getter_tick, ms=100)
        variablesGetterSchedulerStarted = True

    variablesGetter = True
    variablesGetterBusy = False
    variablesGetterScope = scope
    variablesGetterPeriodMs = period_ms
    variablesGetterNextRun = running_time()

def stopVariablesGetter():
    global variablesGetter
    global variablesGetterBusy

    variablesGetter = False
    variablesGetterBusy = False
    print('@GlobalVarsStop.')