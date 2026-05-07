// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/****** DISPLAY CATEGORY ******/

const FUNCTIONS_GALAXIACIRCUITPYTHON = { 

/**** INPUTS - OUTPUTS CATEGORY ****/

DEF_CONFIGURE_PIN: 
`def configure_pin(pin, type):
  global Pins
  isNot = lambda instance: not isinstance(Pins[str(pin)], instance)
  # Configure pin as Digital
  if "digital" in type:
    if isNot(digitalio.DigitalInOut):
      if Pins[str(pin)] != None:
        Pins[str(pin)].deinit()
      Pins[str(pin)] = digitalio.DigitalInOut(pin)
    if "_write" in type:
      Pins[str(pin)].direction = digitalio.Direction.OUTPUT
    elif "_read" in type:
      Pins[str(pin)].direction = digitalio.Direction.INPUT
  # Configure pin as Analog
  elif "analog_read" in type and isNot(analogio.AnalogIn):
    if Pins[str(pin)] != None:
      Pins[str(pin)].deinit()
    Pins[str(pin)] = analogio.AnalogIn(pin)`,

DEF_PREPARE_PIN_PULSE:
`def prepare_pin_pulse(pin):
  global Pins
  # Configure pin as PulseIn
  if not isinstance(Pins[str(pin)], pulseio.PulseIn):
    if Pins[str(pin)] != None:
      Pins[str(pin)].deinit()
    Pins[str(pin)] = pulseio.PulseIn(pin)
    Pins[str(pin)].pause()
  Pins[str(pin)].clear()
  return Pins[str(pin)]`,

DEF_SET_PWM:
`def set_pwm(pin, duty = 32768, freq = 500):
  global Pins
  # Configure pin as PWMOut
  #if not isinstance(Pins[str(pin)], pwmio.PWMOut):
  if Pins[str(pin)] != None:
    Pins[str(pin)].deinit()
  Pins[str(pin)] = pwmio.PWMOut(pin, duty_cycle = duty, frequency = freq)
  #else:
  #  Pins[str(pin)].duty_cycle = duty
  #  Pins[str(pin)].frequency = freq`,

STOP_PWM:
`def stop_pwm(pin):
  global Pins
  if isinstance(Pins[str(pin)], pwmio.PWMOut) and Pins[str(pin)] != None:
    Pins[str(pin)].deinit()`,

DEF_PULSE_IN:
`def pulse_in(pin, state = True, timeout_us = 100000):
  timestamp = time.monotonic()
  pin.resume()
  while (not pin if state else pin):
    # Wait for a pulse
    if (time.monotonic() - timestamp) > timeout_us/1e6:
      pin.pause()
      raise RuntimeError("Timed out")
  pin.pause()
  return pin[0]`,

DEF_DIGITAL_WRITE:
`def digital_write(pin, state):
  global Pins
  configure_pin(pin, "digital_write")
  Pins[str(pin)].value = state`,

DEF_DIGITAL_READ:
`def digital_read(pin):
  global Pins
  configure_pin(pin, "digital_read")
  return Pins[str(pin)].value`,

DEF_ANALOG_READ:
`def analog_read(pin):
  global Pins
  configure_pin(pin, "analog_read")
  return Pins[str(pin)].value`,

DEF_ANALOG_WRITE:
`def analog_write(pin, value):
  global Pins
  configure_pin(pin, "analog_write")
  Pins[str(pin)].value = value`,

DEF_GALAXIA_PINS_DEINIT:
`def deinit_Pins():
  for pin in Pins: 
    Pins[pin].deinit()`,

GALAXIA_PINS_INIT: 
`try: 
  deinit_Pins()
except: 
  pass
Pins = {}`,

/****** COMMUNICATION CATEGORY ******/

// Galaxia radio _ send number
DEF_COM_RADIO_SEND:
`def radio_send(data):
  type = None
  if isinstance(data, int):
    type = "int:"
  elif isinstance(data, float):
    type = "float:"
  elif isinstance(data, bool):
    data = int(data)
    type = "bool:"
  if type is not None:
    radio.send("&&&" + type + str(data) + "&&&")
  else:
    raise ValueError("Unable to send number: '" + str(data) + "'")`,

// Galaxia radio _ send value
DEF_COM_RADIO_SEND_VALUE:
`def radio_sendValue(name, value):
  type = ""
  if isinstance(value, int):
    type = "int:"
  elif isinstance(value, float):
    type = "float:"
  elif isinstance(value, bool):
    value = int(value)
    type = "bool:"
  elif isinstance(value, list):
    type = "list:"
  radio.send("&&&" + type + "[" + name + ";" + str(value) + "]&&&")`,

// Galaxia radio _ receive data
DEF_COM_RADIO_RECEIVE_DATA:
`def radio_receiveData():
  data = radio.receive()
  if data:
    if data.find('&&&int:') != -1:
      return int(data[7:-3])
    elif data.find('&&&float:') != -1:
      return float(data[9:-3])
    elif data.find('&&&bool:') != -1:
      value = data[8:-3]
      if len(value) == 1: return bool(int(value))
      if value is 'False': return bool(0)
      else: return bool(1)
    elif data.find('&&&list:') != -1:
      return data[8:-3].strip('][').split(', ')
    else:
      return data
  else:
    return None`,

// Galaxia radio _ receive value
DEF_COM_RADIO_RECEIVE_VALUE:
`def radio_receiveValue():
  data = radio.receive()
  if data:
    if data.find('&&&int:[') != -1:
      parseData = data[8:-4].split(';')
      return parseData[0], int(parseData[1])
    elif data.find('&&&float:[') != -1:
      parseData = data[10:-4].split(';')
      return parseData[0], float(parseData[1])
    elif data.find('&&&bool:[') != -1:
      parseData = data[9:-4].split(';')
      return parseData[0], bool(parseData[1])
    elif data.find('&&&list:[') != -1:
      parseData = data[9:-4].split(';')
      return parseData[0], parseData[1].strip('][').split(', ')
    else:
      return None, None
  else:
    return None, None`,

// Grove GPS _ read NMEA
DEF_GPS_READ_NMEA:
`def gps_readNMEA(uart, wait = False):
  global gpsInfos
  def read():
    global gpsInfos
    global gpsBuffer
    if uart.any():
      gpsBuffer += str(uart.read())[2:-1]
      a = gpsBuffer.split("\\\\\\r\\\\\\n")
      Frames = []
      for f in a:
        if (f.count(',') is 12 or f.count(',') is 14) and (f.find("$GNGGA") == 0 or f.find("$GPGGA") == 0):
          Frames.append(f)
        if f.count(',') is 19 and f.find("$GPGSV") == 0:
          Frames.append(f)
        if f.count(',') is 17 and (f.find("$GPGSA") == 0 or f.find("$BDGSA") == 0):
          Frames.append(f)
        if f.count(',') is 9 and f.find("$GNVTG") == 0:
          Frames.append(f)
      gpsBuffer = a[-1]
      if len(Frames) > 0:
        print("[GPS_INFO] Lecture de la trame NMEA valide.\\n")
        gpsInfos['nmea'] = Frames
  if wait:
    gpsInfos['nmea'] = None
    while gpsInfos['nmea'] is None:
      read()
      utime.sleep_ms(100)
  else:
    read()
  return gpsInfos['nmea']`,

// Gove GPS _ read info
DEF_GPS_GET_GGA_INFORMATIONS:
`def gps_GGA_getInformation(uart, info = None):
  global gpsInfos
  frame = ['type', 'clock', 'latitude', 'latDir', 'longitude', 'lonDir', 'positionType', 'satellite', 'precision', 'altitude', 'altUnit']
  gpsNMEA = gps_readNMEA(uart)
  if gpsNMEA is None:
    gpsNMEA = gpsInfos['nmea']
  if gpsNMEA is not None:
    for f in gpsInfos['nmea']:
      if f.find("$GNGGA") == 0 or f.find("$GPGGA") == 0:
        gpsNMEA = f
        break
      else:
        gpsNMEA = None
    if gpsNMEA is not None:
      nmeaArray = gpsNMEA.split(',')
      for i in frame:
        data = nmeaArray[frame.index(i)]
        if i is 'clock':
          try:
            date = float(data)
            h = int(date / 10000)
            m = int((date - h*10000) / 100)
            s = int(date - h*10000 - m*100)
            gpsInfos[i] = (h, m, s)
          except: pass
        elif i is 'latitude' or i is 'longitude':
          try:
            pos = float(data)
            base = int(pos/100)
            side = 1
            if (i is 'latitude' and nmeaArray[frame.index(i) + 1] is 'S') or (i is 'longitude' and nmeaArray[frame.index(i) + 1] is 'W'):
              side = -1
            gpsInfos[i] = side*float("%03.5f"%(base + (pos - base*100)/60))
          except: pass
        elif i is 'positionType' or i is 'satellite':
          try: gpsInfos[i] = int(data)
          except: pass
        elif i is 'precision' or i is 'altitude':
          try: gpsInfos[i] = float(data)
          except: pass
        else:
          gpsInfos[i] = data
  if info is None:
    return gpsInfos
  try:
    return gpsInfos[info]
  except:
    return None`,

/****** SENSORS CATEGORY ******/

// Enviro:bit - read sound
DEF_ENVIROBIT_READ_SOUND: 
`def envirobit_readSound():
  return max(0, analog_read(board.P2) - ENVIROBIT_SOUND_OFFSET)`,

// Enviro:bit - wait for 2 claps
ENVIROBIT_WAIT_FOR_DOUBLE_CLAP: 
`def envirobit_waitForDoubleClap(timeout=1000, spread=500, sensitivity=75):
  sensitivity = 105 - sensitivity
  clap_one_time = None
  start_time = time.monotonic()
  while time.monotonic() - start_time < timeout:
    if envirobit_readSound() > sensitivity:
      while envirobit_readSound() > sensitivity:
        pass
      time.sleep(0.1)
      if clap_one_time is not None and time.monotonic() - clap_one_time < spread:
        return True
      else:
        clap_one_time = time.monotonic()
  return False`,

// Enviro:bit - wait for 1 clap
ENVIROBIT_WAIT_FOR_CLAP: 
`def envirobit_waitForClap(timeout=1000, sensitivity=75):
  sensitivity = 105 - sensitivity
  start_time = time.monotonic()
  while time.monotonic() - start_time < timeout:
    if envirobit_readSound() > sensitivity:
      return True
  return False`,

// Grove Temperature _ read
DEF_GROVE_GET_TEMP:
`def getGroveTemperature(pin, unit='celsius'):
  R = ${READ_ANALOG_MAX_VALUE}.0/(getAnalogMean(pin)+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return t`,

// Grove High temperature sensor _ thermocouple table
DEF_GROVE_HIGHTEMP_THMC_TABLE: `
Var_VtoT_K = [[0, 2.5173462e1, -1.1662878, -1.0833638, -8.9773540/1e1, -3.7342377/1e1, -8.6632643/1e2, -1.0450598/1e2, -5.1920577/1e4],
              [0, 2.508355e1, 7.860106/1e2, -2.503131/1e1, 8.315270/1e2, -1.228034/1e2, 9.804036/1e4, -4.413030/1e5, 1.057734/1e6, -1.052755/1e8],
              [-1.318058e2, 4.830222e1, -1.646031, 5.464731/1e2, -9.650715/1e4, 8.802193/1e6, -3.110810/1e8]]`,

// Grove High temperature sensor _ get room temperature
DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP:
`def getRoomTemp(pinA1):
  somme = 0
  for i in range(32):
    somme += analog_read(pinA1)
  a = ((somme>>5))*50.0/33.0
  res = (${READ_ANALOG_MAX_VALUE}.0-a)*10000.0/a                                      
  return 1/(math.log(res/10000.0)/3975.0+1/298.15)-273.15`,

// Grove High temperature sensor _ get thermocouple temperature
DEF_GROVE_HIGHTEMP_GET_THMC_TEMP:
`def getThmcTemp(pinA0, tempRoom):
  vout = analog_read(pinA0)/${READ_ANALOG_MAX_VALUE}.0 * 5.0 * 1000.0
  vol  = (vout-350) / 54.16 
  return K_VtoT(vol) + tempRoom - 130`,

// Grove High temperature sensor _ thermocouple table use
DEF_GROVE_HIGHTEMP_KVTOT:
`def K_VtoT(mV):
  i = 0
  value = 0
  if mV >= -6.478 and mV < 0 :
    value = Var_VtoT_K[0][8]
    for i in range(8, 0, -1):
      value = mV * value + Var_VtoT_K[0][i-1]
  elif mV >= 0 and mV < 20.644 :
    value = Var_VtoT_K[1][9]
    for i in range(9, 0, -1):
      value = mV * value + Var_VtoT_K[1][i-1]
  elif mV >= 20.644 and mV <= 54.900 :
    value = Var_VtoT_K[2][6]
    for i in range(6, 0, -1):
      value = mV * value + Var_VtoT_K[2][i-1]
  return value`,

// Grove Ultrasonic sensor _ get data
DEF_GROVE_ULTRASONIC:
`def getUltrasonicData(sensor, data='distance'):
  try:
    distance_cm = sensor.distance
    if data is 'distance':
      return distance_cm
    elif data is 'duration':
      return distance_cm/100 / 343 * 2 * 1e6
  except: 
    pass
  return None`,

// Grove Ultrasonic sensor _ get data
DEF_HCSR04_ULTRASONIC:
`def getUltrasonicData(trig, echo, data='distance', timeout_us = 100000):
  try:
    echo = prepare_pin_pulse(echo)
    digital_write(trig, 1)  # Set trig high
    time.sleep(0.00001)  # 10 micro seconds 10/1000/1000
    digital_write(trig, 0)  # Set trig low
    pulselen = pulse_in(echo, True, timeout_us)
    if pulselen >= ${READ_ANALOG_MAX_VALUE}:
      raise RuntimeError("Timed out")
    distance_cm = pulselen * 0.017
    if data is 'distance':
      return distance_cm
    elif data is 'duration':
      return distance_cm/100 / 343 * 2 * 1e6
  except:
    pass
  return None`,

// get analog mean value
DEF_GET_ANALOG_MEAN:
`def getAnalogMean(pin, n = 32):
  sum = 0
  for i in range(n):
    sum += analog_read(pin)
  return int(sum/n)`,

// Grove O2 sensor _ read O2 concentration
DEF_O2SENSOR_READ:
`def readO2(pin, volt=False, Vref=3.3):
  measure = getAnalogMean(pin)
  return measure*(Vref/${READ_ANALOG_MAX_VALUE}) if volt else measure*(Vref/${READ_ANALOG_MAX_VALUE})*0.21/2*100`,

// Grove UV sensor _ get UV sensor
DEF_GROVE_GET_UV_INDEX:
`def getUVindex(pin, n=15):
  somme = 0
  for i in range(n):
    somme += analog_read(pin)
    time.sleep(0.002)
  return (somme/n/4.3*1000 - 83) / 21`,


DEF_MPX5700AP_GET_PRESSURE:
`def mpx5700_readPressure(pin):
  rawValue = 0;
  for i in range(10):
    rawValue += analog_read(pin)
  return (rawValue-410) * 700.0 / 9220`,

DEF_COLOR_SENSOR_SETUP:
`def colorSensor_setup():
  colorSensor.set_integration_time(24)
  colorSensor.set_gain(1)`,

DEF_SCD30_READ:
`def scd30_read(dataSelect):
  global t_scd
  global scd30_data
  t_scd = time.monotonic() - t_scd
  if t_scd > 1:
    data = scd30.read_measurement()
    if not math.isnan(data[0]):
      scd30_data = data
  return scd30_data[dataSelect]`,

DEF_SCD30_CALIBRATE:
`def scd30_calibrateSensor(co2ppm):
  print("[SCD30_INFO] Go outside, and wait for 2 minutes. You can reset the board to restart program and redo calibration.")
  print("[SCD30_INFO] Start sensor calibration...")
  for i in range(60):
    scd30.read_measurement()
    time.sleep(0.002)
  scd30.set_forced_recalibration(co2ppm)
  print("[SCD30_INFO] End of calibration forced to " + str(co2ppm) + " ppm.")`,

 DEF_BME280_READ:
  `def bme280_read(dataSelect):
    global t_bme
    global bme280_data
    t_bme = time.monotonic() - t_bme
    if t_bme > 0.2:
      t, p, h = bme280.values
      bme280_data = [t, p, h, bme280.altitude]
    return bme280_data[dataSelect]`,

/****** ACTUATORS CATEGORY ******/

// Servomoteur _ set angle
DEF_SERVO_SET_ANGLE:
`def setServoAngle(pin, angle):
  if (angle >= 0 and angle <= 180):
    set_pwm(pin, duty=int(0.025*1023.0 + (angle*0.1*1023.0)/180))
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pin, direction, speed):
  if (speed >= 0 and speed <= 100):
    if direction == 1 or direction == -1:
      value = (direction*speed/100 + 1) / 2
      min_duty = int(0.0375 * ${READ_ANALOG_MAX_VALUE})
      max_duty = 0.1125 * ${READ_ANALOG_MAX_VALUE}
      duty_range = int(max_duty - min_duty)
      set_pwm(pin, duty = min_duty + int(value * duty_range), freq = 50)
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "', it must be 1 or -1")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "', it must be between 0 and 100 %")`,

// Buzzer module _ play music
DEF_BUZZER_PITCH:
`def pitch (pin, noteFrequency, noteDuration, silence_ms = 10):
  if noteFrequency != 0:
    microsecondsPerWave = 1e6 / noteFrequency
    millisecondsPerCycle = 1000 / (microsecondsPerWave * 2)
    loopTime = noteDuration * millisecondsPerCycle
    for x in range(loopTime):
      digital_write(pin, 1)
      time.sleep(int(microsecondsPerWave)/1000000)
      digital_write(pin, 0)
      time.sleep(int(microsecondsPerWave)/1000000)
  else:
    time.sleep(noteDuration/1000)
  time.sleep(silence_ms/1000)`,

// Buzzer module _ play notes
DEF_BUZZER_PLAY_NOTES:
`def buzzer_playNotes (pin, notes, bpm = 120, ticks = 4):
  NOTE_FREQUENCIES = {
    'c': 16.352,
    'c#': 17.324, 'db': 17.324,
    'd': 18.354,
    'd#': 19.445, 'eb': 19.445,
    'e': 20.602,
    'f': 21.827,
    'f#': 23.125, 'gb': 23.125,
    'g': 24.500,
    'g#': 25.957, 'ab': 25.957,
    'a': 27.500,
    'a#': 29.135, 'bb': 29.135,
    'b': 30.868,
    'r': 0
  }
  for i in range(len(notes)):
    timeout = 60000 / bpm / ticks
    pin.off()
    n = notes[i].lower()
    data = n.split(':')
    note = 'r'
    octave = 4
    if len(data[0]) > 0:
      lastChar = data[0][-1]
      try:
        octave = int(lastChar)
        note = data[0].replace(lastChar, '')
      except:
        note = data[0]
    noteTicks = 1
    if len(data) > 1: noteTicks = int(data[1])
    n = {
      'note': note,
      'octave': octave,
      'ticks': noteTicks
    }
    n['f'] = NOTE_FREQUENCIES[n['note']]
    for o in range(n['octave']):
      n['f'] = n['f'] * 2
    pitch(pin, n['f'], timeout*n['ticks'])`,

// Buzzer module _ play pirates of carribean
DEF_BUZZER_CARRIBEAN_PIRATES:
`def BuzzerCarribeanPirates(pin):
  NOTES_1 = [330, 392, 440, 440, 0, 440, 494, 523, 523, 0, 523, 587, 494, 494, 0, 440, 392, 440, 0]
  DURATIONS_1 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 375, 125]
  NOTES_2 = [330, 392, 440, 440, 0, 440, 523, 587, 587, 0, 587, 659, 698, 698, 0, 659, 587, 659, 440, 0, 440, 494, 523, 523, 0, 587, 659, 440, 0, 440, 523, 494, 494, 0, 523, 440, 494, 0]
  DURATIONS_2 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 125, 250, 125, 125, 125, 250, 125, 125, 250, 125, 250, 125, 125, 125, 250, 125, 125, 125, 125, 375, 375]
  for j in range(2):
    for i in range(len(NOTES_1)):
      pitch(pin, NOTES_1[i], DURATIONS_1[i])
  for k in range(len(NOTES_2)):
    pitch(pin, NOTES_2[k], DURATIONS_2[k])`,

// Buzzer module _ play gamme
DEF_BUZZER_GAMME:
`def BuzzerGamme(pin): 
  NOTES = [261.63, 293.66, 329.54, 349.23, 392, 440, 493.88, 523.25] 
  for i in range(len(NOTES)): 
    pitch(pin, NOTES[i], 250, 50)`,

// Buzzer module _ play Star Wars
DEF_BUZZER_STAR_WARS:
`def BuzzerStarWars(pin): 
  NOTES = [293.66, 293.66, 293.66, 392.0, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 554.37, 454] 
  DURATIONS = [180, 180, 180, 800, 800, 180, 180, 180, 800, 400, 180, 180, 180, 800, 400, 180, 180, 180, 1000] 
  SILENCE_DELAYS = [40, 40, 40, 100, 100, 40, 40, 40, 100, 50, 40, 40, 40, 100, 50, 40, 40, 40, 100] 
  for i in range(len(NOTES)): 
    pitch(pin, NOTES[i], DURATIONS[i], SILENCE_DELAYS[i])`,

// Buzzer module _ play R2D2
DEF_BUZZER_R2D2:
`def BuzzerR2D2(pin): 
  R2D2_NOTES = [3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01, 3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01] 
  for i in range(len(R2D2_NOTES)): 
    pitch(pin, R2D2_NOTES[i], 80, 20)`,

DEF_NEOPIXEL_SHOW_ALL_LED:
`def neopixel_showAllLed(neoPx, ledCount, R, G, B):
  for i in range(ledCount): 
    neoPx[i] = (R, G, B) 
  neoPx.show()`,

// Neopixel _ RAINBOW
DEF_NEOPIXEL_RAINBOW:
`def neopixel_rainbow(neoPx, ledCount): 
  R = 255 
  G = 50 
  B = 50 
  for G in range(50, 256, 5):
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)
  for R in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)
  for B in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)
  for G in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)
  for R in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)
  for B in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    time.sleep(0.005)`,

// Touch Keypad _ get touched number
DEF_KEYPAD_GET_NUMBER:
`def getKeypadNumber():
  while not uart.any():
    pass
  data = str(uart.read())[5:-1] #select the content of byte
  if data == 'a': return '*'
  elif data == 'b': return '0'
  elif data == 'c': return '#'
  else: return data`,

// 4 Digit Display _ get time add
DEF_GET_CURRENT_TIME:
`def getCurrentTime():
  mn=0
  h=0
  min0 = (time.monotonic()-t0)/60
  h0 = min0/60
  last_mins = MIN_START + int(min0) - (int(h0)*60)
  if last_mins > 59:
    mn = last_mins-60
    h = HOUR_START + int(h0) + 1
  else:
    mn = last_mins
    h = HOUR_START + int(h0)
  return h,mn`,

/****** ROBOTS CATEGORY ******/

//Codo _ control left motor
DEF_CODO_CONTROL_LEFT_MOTOR:
`def codo_controlLeftMotor(cmd, speed):
  pin13.write_analog(cmd[0] * speed)
  pin14.write_analog(cmd[1] * speed)`,

//Codo _ control right motor
DEF_CODO_CONTROL_RIGHT_MOTOR:
`def codo_controlRightMotor(cmd, speed):
  pin15.write_analog(cmd[0] * speed)
  pin16.write_analog(cmd[1] * speed)`,

//Codo _ move
DEF_CODO_MOVE:
`def codo_move(direction, speed = 1023):
  if (speed >= 0 and speed <= 1023):
    if direction == 'forward':
      codo_controlLeftMotor([0, 1], speed)
      codo_controlRightMotor([0, 1], speed)
    elif direction == 'backward':
      codo_controlLeftMotor([1, 0], speed)
      codo_controlRightMotor([1, 0], speed)
    elif direction == 'right':
      codo_controlLeftMotor([0, 1], speed)
      codo_controlRightMotor([1, 0], speed)
    elif direction == 'left':
      codo_controlLeftMotor([1, 0], speed)
      codo_controlRightMotor([0, 1], speed)
    elif direction == 'stop':
      codo_controlLeftMotor([0, 0], speed)
      codo_controlRightMotor([0, 0], speed)
    else: 
      display.scroll("'" + str(direction) + "' is not a direction")
  else:
    raise ValueError('The speed of codo motors have to be set between 0 and 255')`,

// Bit:Bot Motors _ set bit:bot go                          
DEF_BITBOT_GO:
`def bitbot_controlMotors(dir, speed): 
  pin0.write_analog(speed)
  pin1.write_analog(speed)
  digital_write(board.P1, dir)
  digital_write(board.P8, dir)`,

// Bit:Bot Light sensor _ read light level
DEF_BITBOT_LIGHT_SENSOR:
`def bitbot_readLightSensor(sensor):
  digital_write(board.P16, sensor)
  return analog_read(board.P2)`,

// Remote

DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON:
`def remoteNEC_basicBlack_getButton(hexCode):
  if hexCode == 0x0c: return "1"
  elif hexCode == 0x18: return "2"
  elif hexCode == 0x5e: return "3"
  elif hexCode == 0x08: return "4"
  elif hexCode == 0x1c: return "5"
  elif hexCode == 0x5a: return "6"
  elif hexCode == 0x42: return "7"
  elif hexCode == 0x52: return "8"
  elif hexCode == 0x4a: return "9"
  elif hexCode == 0x16: return "0"
  elif hexCode == 0x40: return "up"
  elif hexCode == 0x19: return "down"
  elif hexCode == 0x07: return "left"
  elif hexCode == 0x09: return "right"
  elif hexCode == 0x15: return "ENTER/SAVE"
  elif hexCode == 0x0d: return "Back"
  elif hexCode == 0x45: return "VOL-"
  elif hexCode == 0x47: return "VOL+"
  elif hexCode == 0x46: return "PLAY/PAUSE"
  elif hexCode == 0x44: return "SETUP"
  elif hexCode == 0x43: return "STOP/MODE"
  else: return None`,

DEF_REMOTE_NEC_AR_MP3_GRAY_GET_BUTTON:
`def remoteNEC_Carmp3_gray_getButton(hexCode):
  if hexCode == 0x0c: return "1"
  elif hexCode == 0x18: return "2"
  elif hexCode == 0x5e: return "3"
  elif hexCode == 0x08: return "4"
  elif hexCode == 0x1c: return "5"
  elif hexCode == 0x5a: return "6"
  elif hexCode == 0x42: return "7"
  elif hexCode == 0x52: return "8"
  elif hexCode == 0x4a: return "9"
  elif hexCode == 0x16: return "0"
  elif hexCode == 0x40: return "NEXT"
  elif hexCode == 0x19: return "100+"
  elif hexCode == 0x07: return "VOL-"
  elif hexCode == 0x09: return "EQ"
  elif hexCode == 0x15: return "VOL+"
  elif hexCode == 0x0d: return "200+"
  elif hexCode == 0x45: return "CH-"
  elif hexCode == 0x47: return "CH+"
  elif hexCode == 0x46: return "CH"
  elif hexCode == 0x44: return "PREV"
  elif hexCode == 0x43: return "PLAY/PAUSE"
  else: return None`,

DEF_REMOTE_NEC_CALLBACK:
`def remoteNEC_callback(data, addr, cmd):
  global ir_current_remote_button
  printData = ""
  if NEC_REMOTE_TYPE == 'basic_black':
    button = remoteNEC_basicBlack_getButton(data)
    if button is not None:
      ir_current_remote_button = button
    printData = "Basic black remote: data=[{}, {}]".format(hex(data), button)
  elif NEC_REMOTE_TYPE == 'Car_mp3':
    button = remoteNEC_Carmp3_gray_getButton(data)
    if button is not None:
      ir_current_remote_button = button
    printData = "Car mp3 gray remote: data=[{}, {}]".format(hex(data), button)
  else:
    ir_current_remote_button = str(hex(data))
    printData = "Basic black remote: data=[{}, None]".format(hex(data))
  print(printData + '\\n')`,

DEF_IR_RECEIVER_CALLBACK:
`def IRreceiver_callback(data, addr, cmd):
  global ir_current_remote_button
  print('Data: {} Addr: {} Cmd: {}'.format(hex(data), hex(addr), hex(cmd) if (cmd > 0) else cmd))
  ir_current_remote_button = hex(cmd)
  print('IR code: ' + str(ir_current_remote_button) + "\\n\\n")`,

// I2C modules
GALAXIA_I2C_INIT:
`try: 
  i2c.deinit()
except: pass
i2c=busio.I2C(scl=board.P19, sda=board.P20, frequency=100000)`,

/****** NETWORK CATEGORY ******/

// Galaxia WiFi initializer
GALAXIA_WIFI_INIT: "simpleWifi = simple_wifi.SimpleWifi()",
GALAXIA_HTTP_INIT: "http = simple_wifi.SimpleHttp(simpleWifi)",
GALAXIA_CHRONOMETER: "galaxiaChronometer = time.monotonic_ns()",

}