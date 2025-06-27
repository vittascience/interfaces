// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_GALAXIA = {
DEF_PIN_ADC:
`def pinADC(pinNumber, db=ADC.ATTN_11DB, bit=ADC.WIDTH_13BIT):
  pin = ADC(Pin(pinNumber))
  pin.atten(db)
  pin.width(bit)
  return pin`,

DEF_PIN_WRITE:
`def pinWrite(pinNumber, db=ADC.ATTN_11DB, bit=ADC.WIDTH_10BIT):
  pin = ADC(Pin(pinNumber))
  pin.atten(db)
  pin.width(bit)
  return pin`,

DEF_GET_ANALOG_MEAN:
`def getAnalogMean(pin, n = 32):
  sum = 0
  for i in range(32):
    sum += pin.read()
  return sum >> 5`,

/******** COMMUNICATION CATEGORY */
// galaxia radio _ send number
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

// galaxia radio _ send value
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

// galaxia radio _ receive data
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

// galaxia radio _ receive value
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

/****** ACTUATORS CATEGORY ******/

// Servomoteur _ set angle
DEF_SERVO_SET_ANGLE:
`def setServoAngle(pin, angle):
  if (angle >= 0 and angle <= 180):
    pin.duty(int(0.025*${PWM_MAX_DUTY} + (angle*0.1*${PWM_MAX_DUTY})/180))
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pin, direction, speed):
  if (speed >= 0 and speed <= 100):
    GAP = 14
    if direction == 1:
      speedAngle = 90*(1+speed/100) - GAP
      pin.duty(int(speedAngle))
    elif direction == -1:
      speedAngle = 90*(1-speed/100) - GAP
      if speedAngle < 0: speedAngle = 1
      pin.duty(int(speedAngle))
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

// Buzzer module _ play music
DEF_BUZZER_PITCH:
`def pitch (pin, noteFrequency, noteDuration, silence_ms = 10):
  if noteFrequency is not 0:
    microsecondsPerWave = 1e6 / noteFrequency
    millisecondsPerCycle = 1000 / (microsecondsPerWave * 2)
    loopTime = noteDuration * millisecondsPerCycle
    for x in range(loopTime):
      pin.on()
      utime.sleep_us(int(microsecondsPerWave))
      pin.off()
      utime.sleep_us(int(microsecondsPerWave))
  else:
    utime.sleep_ms(noteDuration)
  utime.sleep_ms(silence_ms)`,

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

// NEOPX module _ show all led   
DEF_NEOPIXEL_SHOW_ALL_LED:
`def neopixel_showAllLed(neoPx, ledCount, R, G, B):
  for i in range(ledCount): 
    neoPx[i] = (R, G, B) 
  neoPx.write()`,

// Neopixel _ RAINBOW
DEF_NEOPIXEL_RAINBOW:
`def neopixel_rainbow(neoPx, ledCount): 
  R = 255 
  G = 50 
  B = 50 
  for G in range(50, 256, 5):
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)
  for R in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)
  for B in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)
  for G in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)
  for R in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)
  for B in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    utime.sleep_ms(5)`,

DEF_GET_CURRENT_TIME:
`def getCurrentTime():
  mn=0
  h=0
  min0 = (utime.ticks_diff(utime.ticks_ms(), t0))/1000/60
  h0 = min0/60
  last_mins = MIN_START + int(min0) - (int(h0)*60)
  if last_mins > 59:
    mn = last_mins-60
    h = HOUR_START + int(h0) + 1
  else:
    mn = last_mins
    h = HOUR_START + int(h0)
  return h,mn`,

/****** SENSORS CATEGORY ******/

// Grove O2 sensor _ read O2 concentration
DEF_O2SENSOR_READ:
`def readO2(pin, volt=False, Vref=3.3):
  somme = getAnalogMean(pin)
  return somme*(Vref/${READ_ANALOG_MAX_VALUE}.0) if volt else somme*(Vref/${READ_ANALOG_MAX_VALUE}.0)*0.21/2.0*100`,

// Grove Temperature _ read
DEF_GROVE_GET_TEMP:
`def getGroveTemperature(pin, unit='celsius'):
  R = (${READ_ANALOG_MAX_VALUE}.0/pin.read()-1.0)*100000
  t = 1/(math.log(R/100000)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return round(t, 2)`,

// Grove High temperature sensor _ thermocouple table
DEF_GROVE_HIGHTEMP_THMC_TABLE: 
`Var_VtoT_K = [[0, 2.5173462e1, -1.1662878, -1.0833638, -8.9773540/1e1, -3.7342377/1e1, -8.6632643/1e2, -1.0450598/1e2, -5.1920577/1e4],
              [0, 2.508355e1, 7.860106/1e2, -2.503131/1e1, 8.315270/1e2, -1.228034/1e2, 9.804036/1e4, -4.413030/1e5, 1.057734/1e6, -1.052755/1e8],
              [-1.318058e2, 4.830222e1, -1.646031, 5.464731/1e2, -9.650715/1e4, 8.802193/1e6, -3.110810/1e8]]`,

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
              
// Grove High temperature sensor _ get room temperature
DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP:
`def getRoomTemp(pinA1):
  a = getAnalogMean(pinA1)*50/33
  res = (${READ_ANALOG_MAX_VALUE}-a) * 10000/a
  return 1/(math.log(res/10000)/3975.0+1/298.15) - 273.15`,

// Grove High temperature sensor _ get thermocouple temperature
DEF_GROVE_HIGHTEMP_GET_THMC_TEMP:
`def getThmcTemp(pinA0, tempRoom):
  vout = getAnalogMean(pinA0)/${READ_ANALOG_MAX_VALUE} * 5 * 1000
  vol  = (vout-350) / 54.16
  return K_VtoT(vol) + tempRoom`,

// Grove UV sensor _ get UV sensor
DEF_GROVE_GET_UV_INDEX:
`def getUVindex(pin, n=15):
  somme = 0
  for i in range(n):
    somme += pin.read()
    utime.sleep_ms(2)                                    
  return (somme/n/4.3*1000 - 83) / 21`,

// Grove Ultrasonic sensor _ get data
DEF_GROVE_ULTRASONIC:
`def grove_getUltrasonicData(pinNumber, data='distance', timeout_us=30000):
  trig = Pin(pinNumber, Pin.OUT)
  trig.off()
  utime.sleep_us(2)               
  trig.on()
  utime.sleep_us(10)
  trig.off()
  echo = Pin(pinNumber, Pin.IN)
  duration = time_pulse_us(echo, 1, timeout_us)/1e6 # t_echo in seconds
  if duration > 0:
    if data == 'distance':
      #sound speed, round-trip/2, get in cm
      return 343 * duration/2 * 100
    elif data == 'duration':
      return duration
    else:
      raise ValueError("Data option '" + data + "' is not valid")
  else:
    return -1`,

// Grove Ultrasonic sensor _ get data
DEF_HCSR04_ULTRASONIC:
`def hcsr04_getUltrasonicData(trig, echo, data='distance', timeout_us=30000):
  trig.off()
  utime.sleep_us(2)               
  trig.on()
  utime.sleep_us(10)
  trig.off()
  echo.value()
  duration = time_pulse_us(echo, 1, timeout_us)/1e6 # t_echo in seconds
  if duration > 0:
    if data == 'distance':
      #sound speed, round-trip/2, get in cm
      return 343 * duration/2 * 100
    elif data == 'duration':
      return duration
    else:
      raise ValueError("Data option '" + data + "' is not valid")
  else:
    return -1`,

// DHT - Get data
DEF_DHT_GET_MEASURE: 
`def dht_getMeasure(sensor, data, unit='celsius'):
  sensor.measure()
  utime.sleep(1)
  if data is 't':
    t = sensor.temperature()
    if unit == 'fahrenheit':
      t = t*9/5 + 32
    elif unit == 'kelvin':
      t += 273.15
    return t
  elif data is 'h':
    return sensor.humidity()
  else:
    raise ValueError("dht_getMeasure() has not option \'" + data + "\'")`,

DEF_SCD30_READ:
`def scd30_read(dataSelect):
  global t_scd
  global scd30_data
  t_scd = utime.ticks_ms() - t_scd
  if t_scd > 1000:
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
    utime.sleep_ms(2000)
  scd30.set_forced_recalibration(co2ppm)
  print("[SCD30_INFO] End of calibration forced to " + str(co2ppm) + " ppm.")`,

DEF_DS18B20_MEASURE:
`def ds18b20_measure(ds, roms, index = 0):
  t = []
  ds.convert_temp()
  utime.sleep_ms(200)
  for rom in roms: 
    t.append(round(ds.read_temp(rom), 2))
  if index == 'all':
    return t
  else:
    return t[index]`,

}