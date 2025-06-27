// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/****** DISPLAY CATEGORY ******/
const FUNCTIONS_MICROBIT = {
//Microbit Screen _ set gauge
DEF_MICROBIT_LED_GAUGE:
`def plotBarGraph(val, max):
  if val > 0 and val < max/5:
    led_image = Image('00000:00000:00000:00000:99999')
    display.show(led_image)
  if val >= max/5 and val < 2*max/5:
    led_image = Image('00000:00000:00000:99999:99999')
    display.show(led_image)
  if val >= 2*max/5 and val < 3*max/5:
    led_image = Image('00000:00000:99999:99999:99999')
    display.show(led_image)
  if val >= 3*max/5 and val < 4*max/5:
    led_image = Image('00000:99999:99999:99999:99999')
    display.show(led_image)
  if val >= 4*max/5 and val <= max:
    led_image = Image('99999:99999:99999:99999:99999')
    display.show(led_image)`,

DEF_MICROBIT_SHOW_CLOCK: 
`def showClock(clock):
  i = Image
  CLOCKS = [i.CLOCK1, i.CLOCK2, i.CLOCK3, i.CLOCK4, i.CLOCK5, i.CLOCK6, i.CLOCK7, i.CLOCK8, i.CLOCK9, i.CLOCK10, i.CLOCK11, i.CLOCK12]
  if (clock > 12): clock -= 12
  for j in range(12):
    if clock < j+1:
      display.show(CLOCKS[j-1])
      break`,

DEF_MICROBIT_SET_BRIGHTNESS:
`def set_brightness(value):
  for x in range(5):
    for y in range (5):
      if (display.get_pixel(x,y) != 0):
        display.set_pixel(x,y,value)`,

DEF_MICROBIT_TOGGLE_PIXEL_STATE:
`def togglePixelState(x, y):
  if display.get_pixel(x, y) == 0:
    display.set_pixel(x, y, 9)
  else:
    display.set_pixel(x, y, 0)`,

/****** INPUT/OUTPUT CATEGORY ******/

//Microbit IO _ read pulse in
DEF_IO_PULSE_IN:
`def pulseIn(pin, pulseState, maxDuration = 2000000):
  t_init = utime.ticks_us()
  while (pin.read_digital() is not pulseState):
    if(utime.ticks_us() - t_init > maxDuration):
      return 0
  start = utime.ticks_us()
  while (pin.read_digital() == pulseState):
    if(utime.ticks_us() - t_init > maxDuration):
      return 0
  end =  utime.ticks_us()
  return end - start`,

/****** COMMUNICATION CATEGORY ******/

// micro:bit radio _ send number
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

// micro:bit radio _ send value
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

// micro:bit radio _ receive data
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

// micro:bit radio _ receive value
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
`def gps_readNMEA(rx, tx, wait = False):
  global gpsInfos
  def read():
    global gpsInfos
    global gpsBuffer
    uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=rx, rx=tx)
    if uart.any():
      gpsBuffer += str(uart.read())[2:-1]
      uart.init(baudrate=115200, bits=8, parity=None, stop=1)
      a = gpsBuffer.split("\\\\r\\\\n")
      Frames = []
      for f in a:
        if (f.count(',') is 12 or f.count(',') is 14) and (f.find("$GNGGA") == 0 or f.find("$GPGGA") == 0):
          Frames.append(f)
        if f.count(',') is 19 and f.find("$GPGSV") == 0:
          f = f[:-2]
          Frames.append(f)
        if f.count(',') is 17 and (f.find("$GPGSA") == 0 or f.find("$BDGSA") == 0):
          f = f[:-2]
          Frames.append(f)
        if f.count(',') is 9 and f.find("$GNVTG") == 0:
          f = f[:-2]
          Frames.append(f)
      gpsBuffer = a[-1]
      if len(Frames) > 0:
        print("[GPS_INFO] Lecture de la trame NMEA valide.\\n")
        gpsInfos['nmea'] = Frames

  if wait:
    gpsInfos['nmea'] = None
    while gpsInfos['nmea'] is None:
      read()
      sleep(100)
  else:
    read()
  return gpsInfos['nmea']`,

// Gove GPS _ read info
DEF_GPS_GET_GGA_INFORMATIONS:
`def gps_GGA_getInformation(rx, tx, info = None):
  global gpsInfos
  frame = ['type', 'clock', 'latitude', 'latDir', 'longitude', 'lonDir', 'positionType', 'satellite', 'precision', 'altitude', 'altUnit']
  gpsNMEA = gps_readNMEA(rx, tx)
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
  return max(0, pin2.read_analog() - ENVIROBIT_SOUND_OFFSET)`,

// Enviro:bit - wait for 2 claps
ENVIROBIT_WAIT_FOR_DOUBLE_CLAP: 
`def envirobit_waitForDoubleClap(timeout=1000, spread=500, sensitivity=75):
  sensitivity = 105 - sensitivity
  clap_one_time = None
  start_time = running_time()
  while running_time() - start_time < timeout:
    if envirobit_readSound() > sensitivity:
      while envirobit_readSound() > sensitivity:
        pass
      sleep(100)
      if clap_one_time is not None and running_time() - clap_one_time < spread:
        return True
      else:
        clap_one_time = running_time()
  return False`,

// Enviro:bit - wait for 1 clap
ENVIROBIT_WAIT_FOR_CLAP: 
`def envirobit_waitForClap(timeout=1000, sensitivity=75):
  sensitivity = 105 - sensitivity
  start_time = running_time()
  while running_time() - start_time < timeout:
    if envirobit_readSound() > sensitivity:
      return True
  return False`,

DEF_ANEMOMETER_GET_WIND_SPEED:
`def anemometer_getWindSpeed(pin, unit = 'm/s', pulse_per_revolution = 1):
  SPEED_OF_ONE_PULSE = 0.66666667/pulse_per_revolution # m/s
  pulse_s = pulseIn(pin, 1, maxDuration = 1000000) # us
  if pulse_s > 0:
    imp_per_sec = pulse_per_revolution/(pulse_s/1e6) # impulsions/s
    speed = SPEED_OF_ONE_PULSE*imp_per_sec #m/s
    if unit is 'km/h':
      return speed*3600/1e3
    elif unit is 'inch/s':
      return speed/2.54
    elif unit is 'knot':
      return speed/0.514444444
    else:
      return speed
  else: return 0`,

DEF_WEATHERCOCK_GET_DIRECTION:
`def weathercock_getDirection(pin):
  windDir = pin.read_analog()
  if windDir < 906 and windDir > 886:
    s = "N"
  elif windDir < 712 and windDir > 692:
    s = "NE"
  elif windDir < 415 and windDir > 395:
    s = "E"
  elif windDir < 498 and windDir > 478:
    s = "SE"
  elif windDir < 584 and windDir > 564:
    s = "S"
  elif windDir < 819 and windDir > 799:
    s = "SW"
  elif windDir < 988 and windDir > 968:
    s = "W"
  elif windDir < 959 and windDir > 939:
    s = "NW"
  else:
    s = "???"
  return s`,

DEF_RAIN_GAUGE_GET_DUMPS:
`def rainGauge_getDumps(pin):
  global rainGauge_dumps
  pulse_us = pulseIn(pin, 1, maxDuration = 1000000) # us
  if pulse_us > 0: 
    rainGauge_dumps += 1
  elif pulse_us == 0:
    rainGauge_dumps = 0
  return rainGauge_dumps * RAIN_HEIGHT_RATIO`,

// Grove Temperature _ read
DEF_GROVE_GET_TEMP:
`def getGroveTemperature(pin, unit='celsius'):
  R = ${READ_ANALOG_MAX_VALUE}.0/(pin.read_analog()+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return round(t, 2)`,

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
    somme += pinA1.read_analog()
  a = ((somme>>5))*50.0/33.0
  res = (${READ_ANALOG_MAX_VALUE}.0-a)*10000.0/a                                      
  return 1/(math.log(res/10000.0)/3975.0+1/298.15)-273.15`,

// Grove High temperature sensor _ get thermocouple temperature
DEF_GROVE_HIGHTEMP_GET_THMC_TEMP:
`def getThmcTemp(pinA0, tempRoom):
  vout = pinA0.read_analog()/${READ_ANALOG_MAX_VALUE}.0 * 5.0 * 1000.0
  vol  = (vout-350) / 54.16 
  return K_VtoT(vol) + tempRoom`,

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
`def getUltrasonicData(trig, echo, data='distance', timeout_us=30000):
  trig.write_digital(0)
  utime.sleep_us(2)
  trig.write_digital(1)
  utime.sleep_us(10)
  trig.write_digital(0)
  echo.read_digital()
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

// get analog mean value
DEF_GET_ANALOG_MEAN:
`def getAnalogMean(pin, n = 32):
  sum = 0
  for i in range(n):
    sum += pin.read_analog()
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
    somme += pin.read_analog()
    sleep(2)                                    
  return (somme/n/4.3*1000 - 83) / 21`,


DEF_MPX5700AP_GET_PRESSURE:
`def mpx5700_readPressure(pin):
  rawValue = 0;
  for i in range(10):
    rawValue += pin.read_analog()
  return (rawValue-410) * 700.0 / 9220`,

DEF_COLOR_SENSOR_SETUP:
`def colorSensor_setup():
  colorSensor.set_integration_time(24)
  colorSensor.set_gain(1)
  sleep(100)`,

DEF_SCD30_CALIBRATE:
`def scd30_calibrateSensor(co2ppm):
  print("[SCD30_INFO] Go outside, and wait for 2 minutes. You can reset the board to restart program and redo calibration.\\n")
  print("[SCD30_INFO] Start sensor calibration...\\n")
  for i in range(60):
    scd30.readMeasurement()
    utime.sleep_ms(2000)
  scd30.setForcedRecalibration(co2ppm)
  print("[SCD30_INFO] End of calibration forced to " + str(co2ppm) + " ppm.\\n")
  display.show(Image.YES)`,

DEF_SCD30_READ:
`def scd30_read(dataSelect):
  global t_scd
  global scd30_data
  t_scd = running_time() - t_scd
  if t_scd > 1000:
    scd30.readMeasurement()
    if not math.isnan(scd30.co2):
      scd30_data = [scd30.co2, scd30.t, scd30.h]
  return scd30_data[dataSelect]`,

DEF_READ_HEART_RATE: 
`def read_heart_rate(pin):
  beat_count = 0
  start_time = running_time()
  end_time = start_time + 15000

  pin.set_pull(pin.PULL_UP)
  print('Measure in progress please wait...')
  while running_time() < end_time:
    if pin.read_digital() == 0:
      beat_count += 1
      while pin.read_digital() == 0:
        sleep(1)

  return beat_count * 4`,

/****** ACTUATORS CATEGORY ******/

// Servomoteur _ set angle
DEF_SERVO_SET_ANGLE:
`def setServoAngle(pin, angle):
  if (angle >= 0 and angle <= 180):
    pin.write_analog(int(0.025*${PWM_MAX_DUTY} + (angle*0.1*${PWM_MAX_DUTY})/180))
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pin, direction, speed):
  pin.set_analog_period(20)
  if (speed >= 0 and speed <= 100):
    if direction is 1 or direction is -1:
      #clockwise: 1.5 ms to 1 ms | anticlockwise: 1.5ms to 2 ms (0 to 100%)
      speed_ms = speed * direction * 0.5 / 100 + 1.5
      pin.write_analog(1023 * speed_ms / 20)
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

DEF_KITRONIK_CONTROL_MOTOR:
`def kitronik_controlMotor(motor, direction, speed = 100):
  value = speed/100.0*${PWM_MAX_DUTY}
  if motor == 1:
    if direction == 1:
      pin8.write_analog(value)
      pin12.write_digital(0)
    elif direction == -1:
      pin12.write_analog(value)
      pin8.write_digital(0)
  elif motor == 2:
    if direction == 1:
      pin0.write_analog(value)
      pin16.write_digital(0)
    elif direction == -1:
      pin16.write_analog(value)
      pin0.write_digital(0)`,

DEF_KITRONIK_STOP_MOTORS:
`def kitronik_stopMotor(motor):
  if motor == 1:
    pin8.write_digital(0)
    pin12.write_digital(0)
  elif motor == 2:
    pin0.write_digital(0)
    pin16.write_digital(0)`,

// Buzzer module _ play music
DEF_BUZZER_PITCH:
`def pitch(pin, noteFrequency, noteDuration, silence_ms = 10):
  if noteFrequency is not 0:
    microsecondsPerWave = 1e6 / noteFrequency
    millisecondsPerCycle = 1000 / (microsecondsPerWave * 2)
    loopTime = noteDuration * millisecondsPerCycle
    for x in range(loopTime):
      pin.write_digital(1)
      utime.sleep_us(int(microsecondsPerWave))
      pin.write_digital(0)
      utime.sleep_us(int(microsecondsPerWave))
  else:
    utime.sleep_ms(noteDuration)
  utime.sleep_ms(silence_ms)`,

// Buzzer module _ play notes
DEF_BUZZER_PLAY_NOTES:
`def buzzer_playNotes(pin, notes, bpm = 120, ticks = 4):
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
    sleep(5)
  for R in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    sleep(5)
  for B in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    sleep(5)
  for G in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    sleep(5)
  for R in range(50, 256, 5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    sleep(5)
  for B in range(255, 49, -5): 
    neopixel_showAllLed(neoPx, ledCount, R, G, B)
    sleep(5)`,

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
  min0 = (running_time()-t0)/1000/60
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
DEF_CONVERT_SPEED_MPS: 
`def convertSpeed_mps(speed, max_speed, max_rpm, wheels_diameter):
  # 2π * wheels_diameter / 2 * speed_rpm / 60
  return 2*math.pi*wheels_diameter/2*1e-2*(speed/max_speed*max_rpm)/60`,

DEF_MAQUEEN_MOVE_WITH_SQUARE: 
`def maqueen_moveWithSquare(x, direction, speed=255):
  speed_mps = convertSpeed_mps(speed, 255, 133, 4.3)
  for i in range(int(x)):
    i2c.write(0x10, bytearray([0x00, direction, speed]))
    i2c.write(0x10, bytearray([0x02, direction, speed]))
    utime.sleep_ms(int(15e-2/speed_mps*1000))
    i2c.write(0x10, bytearray([0x00, 0, 0]))
    i2c.write(0x10, bytearray([0x02, 0, 0]))`,

DEF_MAQUEEN_TURN_ANGLE:
`def maqueen_turnAngle(angle, speed=255):
  speed_mps = convertSpeed_mps(speed, 255, 133, 4.3)
  # wheels_center_radius * degToRad(angle)
  angularDistance = 3.5*1e-2*angle/180*math.pi
  motorLeftDir = 0x0 if angularDistance < 0 else 0x1
  motorRightDir = 0x1 if angularDistance < 0 else 0x0
  i2c.write(0x10, bytearray([0x00, motorLeftDir, speed]))
  i2c.write(0x10, bytearray([0x02, motorRightDir, speed]))
  utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000))
  i2c.write(0x10, bytearray([0x00, 0, 0]))
  i2c.write(0x10, bytearray([0x02, 0, 0]))`,

DEF_MAQUEEN_BLINK_ROBOT: 
`def maqueen_blinkRobot():
  for count in range(2):
    for i in range(4):
      npMaq[i] = (255, 0, 0)
    npMaq.show()
    pin8.write_digital(1)
    pin12.write_digital(1)
    utime.sleep_ms(500)
    for i in range(4):
      npMaq[i] = (0, 0, 0)
    npMaq.show()
    pin8.write_digital(0)
    pin12.write_digital(0)
    utime.sleep_ms(500)`,

DEF_CUTEBOT_MOVE_WITH_SQUARE: 
`def cutebot_moveWithSquare(x, direction, speed=100):
  speed_mps = convertSpeed_mps(speed, 100, 300, 3.4)
  for i in range(int(x)):
    if (direction == 'forward') : 
      cutebot.set_motors_speed(speed,speed)
    else : 
      cutebot.set_motors_speed(-speed,-speed)
    utime.sleep_ms(int(15e-2/speed_mps*1000))
    cutebot.stop()`,
  
DEF_CUTEBOT_TURN_ANGLE:
`def cutebot_turnAngle(angle, speed=100):
  speed_mps = convertSpeed_mps(speed, 100, 300, 3.4)
  # wheels_center_radius * degToRad(angle)
  angularDistance = 2.8*1e-2*angle/180*math.pi
  if (angle < 0) : 
    cutebot.set_motors_speed(speed,-speed)
  else : 
    cutebot.set_motors_speed(-speed,speed)
  utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000))
  cutebot.stop()`,

DEF_CUTEBOT_BLINK_ROBOT: 
`def cutebot_blinkRobot():
  for count in range(2):
    for i in range(2):
      npCutebot[i] = (255, 0, 0)
    npCutebot.show()
    cutebot.set_right_rgb_led(255, 0, 0)
    cutebot.set_left_rgb_led(255, 0, 0)
    utime.sleep_ms(500)
    for i in range(2):
      npCutebot[i] = (0, 0, 0)
    npCutebot.show()
    cutebot.set_right_rgb_led(0, 0, 0)
    cutebot.set_left_rgb_led(0, 0, 0)
    utime.sleep_ms(500)`,

// Kitrobot v2
DEF_KITROBOT_SERVO_SET_SPEED:
`def setKitrobotServoSpeed(pin, direction, speed):
  if (speed >= 0 and speed <= 100):
    GAP = 14
    if direction == 1:
      speedAngle = 90*(1+speed/100) - GAP
      pin.write_analog(speedAngle)
    elif direction == -1:
      speedAngle = 90*(1-speed/100) - GAP
      if speedAngle < 0: speedAngle = 1
      pin.write_analog(speedAngle)
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

DEF_KITROBOT_MOVE:
`def kitrobotMove(dir, speed):
  if dir == 1:
    setKitrobotServoSpeed(pin0, 1, speed)
    setKitrobotServoSpeed(pin1, -1, speed)
  else:
    setKitrobotServoSpeed(pin0, -1, speed)
    setKitrobotServoSpeed(pin1, 1, speed)`,

DEF_KITROBOT_ROTATE:
`def kitrobotRotate(dir, speed):
  if dir == 'right':
    setKitrobotServoSpeed(pin0, 1, speed)
    setKitrobotServoSpeed(pin1, 1, speed)
  else:
    setKitrobotServoSpeed(pin0, -1, speed)
    setKitrobotServoSpeed(pin1, -1, speed) `,

DEF_KITROBOT_BLINK_ROBOT: 
`def kitrobot_blinkRobot():
  for count in range(2):
    for i in range(4):
      npKitrobot[i] = (255, 0, 0)
    npKitrobot.show()
    utime.sleep_ms(500)
    for i in range(4):
      npKitrobot[i] = (0, 0, 0)
    npKitrobot.show()
    utime.sleep_ms(500)`,

DEF_KITROBOT_MOVE_WITH_SQUARE: 
`def kitrobot_moveWithSquare(x, direction, speed=100):
  speed_mps = convertSpeed_mps(speed, 100, 120, 4.3)
  for i in range(int(x)):
    kitrobotMove(direction, speed)
    utime.sleep_ms(int(15e-2/speed_mps*1000))
    kitrobotMove(direction, 0)`,

DEF_KITROBOT_TURN_ANGLE:
`def kitrobot_turnAngle(angle, speed=100):
  speed_mps = convertSpeed_mps(speed, 100, 120, 4.3)
  # wheels_center_radius * degToRad(angle)
  angularDistance = 3.8*1e-2*angle/180*math.pi
  if angularDistance < 0:
    kitrobotRotate('right', speed)
  else:
    kitrobotRotate('left', speed)
  utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000))
  kitrobotMove(1, 0)`,

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

//Oobybot _ control motors
DEF_OOBYBOT_CONTROL_MOTORS:
`def oobybot_controlMotors(pin, direction, speed):
  if (speed >= 0 and speed <= 100):
    GAP = 14
    if direction == 1:
      speedAngle = 90*(1+speed/100) - GAP
      pin.write_analog(speedAngle)
    elif direction == -1:
      speedAngle = 90*(1-speed/100) - GAP
      if speedAngle < 0: speedAngle = 1
      pin.write_analog(speedAngle)
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
     raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

// Bit:Bot Motors _ set bit:bot go                          
DEF_BITBOT_GO:
`def bitbot_controlMotors(dir, speed): 
  pin0.write_analog(speed)
  pin1.write_analog(speed)
  pin8.write_digital(dir)
  pin12.write_digital(dir)`,

// Bit:Bot Light sensor _ read light level
DEF_BITBOT_LIGHT_SENSOR:
`def bitbot_readLightSensor(sensor):
  pin16.write_digital(sensor)
  return pin2.read_analog()`,

DEF_BITCAR_SERVO_SPEED:
`def setBitCarServoSpeed(pinBackward, pinForward, direction, speed):
  if (speed >= 0 and speed <= 100):
    if direction == 1:
      pinBackward.write_analog(0)
      pinForward.write_analog(map(speed, 0, 100, 0, 1023))
    elif direction == -1:
      pinForward.write_analog(0)
      pinBackward.write_analog(map(speed, 0, 100, 0, 1023))
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

DEF_BITCAR_MOVE: 
`def bitCarMove(dir, speed):
  setBitCarServoSpeed(pin13, pin14, dir, speed)
  setBitCarServoSpeed(pin15, pin16, -dir, speed)`,

DEF_BITCAR_ROTATE: 
`def bitCarRotate(dir, speed):
  setBitCarServoSpeed(pin13, pin14, dir, speed)
  setBitCarServoSpeed(pin15, pin16, dir, speed)`,

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

DEF_TELLO_CONNECTION:
`def tello_connection(tx, rx):
  connection = drone.drone_init()
  if connection == True:
    print('Micro:bit connected to TELLO DRONE')
  else:
    print('Cannot connect to Tello drone')`,

DEF_TELLO_GO:
`def get_pos(step, speed):
  x, y, z = accelerometer.get_values()
  roll = round(x/${READ_ANALOG_MAX_VALUE}*2.5)+2
  pitch = round(y/${READ_ANALOG_MAX_VALUE}*2.5)+2
  led_x = min(max(pitch, 0), 4)
  led_y = min(max(roll, 0), 4)
  display.clear()
  display.set_pixel(led_y, led_x, 9)
  pos= [(led_x-2)*step,(2-led_y)*step,0]
  if pos is not None:
      x, y, z = pos
      cmd = "go {} {} {} {}".format(x, y, z, speed)
      drone.send_cmd(cmd)`,

DEF_TELLO_DRAW_RECTANGLE: 
`def tello_draw_rectangle(length, width):
  for i in range(2):
    drone.send_cmd("forward " + str(length))
    drone.send_cmd("cw 90")
    drone.send_cmd("forward " + str(width))
    drone.send_cmd("cw 90")
`,

DEF_TELLO_DRAW_SQUARE:
`def tello_draw_square(length):
  for i in range(4):
    drone.send_cmd("forward " + str(length))
    drone.send_cmd("cw 90")
`,

/****** CAMERAS CATEGORY ******/
DEF_HUSKYLENS_EXTRACT_BLOCKS_DATA:
`def extract_blocks_data(data, param):
  mapping = {
    'X': 0,
    'Y': 1,
    'WIDTH': 2,
    'HEIGHT': 3,
    'ID': 4
  }

  index = mapping.get(param.upper())
  if index is None:
    return []
  return [item[index] for item in data]
`,

DEF_HUSKYLENS_EXTRACT_ARROWS_DATA:
`def extract_arrows_data(data, param):
  mapping = {
    'X1': 0,
    'Y1': 1,
    'X2': 2,
    'Y2': 3,
    'ID': 4
  }

  index = mapping.get(param.upper())
  if index is None:
    return []
  return [item[index] for item in data]
`,

DEF_HUSKLENS_ID_PRESENT:
`def id_present(data_list, id_to_check):
  return any(item[4] == id_to_check for item in data_list)
`,

DEF_HUSKYLENS_LINE_DIRECTION:
`def line_direction(data, id):
  for item in data:
    if item[-1] == id:
      if 150 < item[-3] < 170:
        return 'STRAIGHT'
      elif item[-3] < 150:
        return 'LEFT'
      else:
        return 'RIGHT'
  return False`,

  // Wio Lite
  DEF_WIO_GET_INFO:
`def wio_get_info(data):
  i2c.write(wio_addr, bytearray([1]))
  info = i2c.read(wio_addr, 2)
  if data == "status":
    return info[0]
  elif data == "version":
    return info[1]
  else:
    return info`,
  
  DEF_WIO_GET_CLASS_DATA: 
`def wio_get_class_data(data = None):
  utime.sleep(1)
  i2c.write(wio_addr, bytearray([3]))
  byte_result = i2c.read(wio_addr, 10)
  integer_result = [int(b) for b in byte_result]
  if data == "max":
    return integer_result.index(max(integer_result)) + 1
  elif isinstance(data, int) and len(integer_result) > data and (data - 1) >= 0:
    return integer_result[data - 1]
  else:
    return integer_result`  
};