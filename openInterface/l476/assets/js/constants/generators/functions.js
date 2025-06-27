// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_L476 = {
DEF_GET_ANALOG_MEAN:
`def getAnalogMean(pin, n = 32):
  sum = 0
  for i in range(32):
    sum += pin.read()
  return sum >> 5`,

/****** ACTUATORS CATEGORY ******/

// Servomoteur _ set angle
DEF_SERVO_SET_ANGLE:
`def setServoAngle(timer, angle):
  if (angle >= -90 and angle <= 90):
    pw_percent = 3 + (angle + 90) * (12.5 - 3) / 180
    timer.pulse_width_percent(pw_percent)
  else:
    raise ValueError("Servomotor angle have to be set between -90 and 90")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pwm, direction, speed):
  if speed >= 0 and speed < 5:
    pwm.pulse_width_percent(0)
  elif (speed >= 5 and speed <= 100):
    GAP = -10
    if direction == 1 or direction == -1:
      angle = 90*(1 + direction*speed/100) - GAP
      pw_percent = 3 + (angle + 90) * (12.5 - 3) / 180
      pwm.pulse_width_percent(pw_percent)
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
      pin.high()
      utime.sleep_us(int(microsecondsPerWave))
      pin.low()
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

// Touch Keypad _ get touched number
DEF_KEYPAD_GET_NUMBER:
`def getKeypadNumber(keypadUART):
  while not keypad.any():
    pass
  data = str(keypadUART.read())[5:-1] #select the content of byte
  if data == 'a': return '*'
  elif data == 'b': return '0'
  elif data == 'c': return '#'
  else: return data`,

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

/****** COMMUNICATION CATEGORY ******/

// Grove GPS _ read NMEA
DEF_GPS_READ_NMEA:
`def gps_readNMEA(uart, wait = False):
  global gpsInfos
  def read():
    global gpsInfos
    global gpsBuffer
    if uart.any():
      gpsBuffer += str(uart.read())[2:-1]
      a = gpsBuffer.split("\\\\\\n")
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
      utime.sleep_ms(150)
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

//Read data from Mifare NFC cards
DEF_NFC_READ_MIFARE:
`def NFC_readMifare(pn532):
  print('Waiting for MiFare card...')
  while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()
    # Try again if no card is available.
    if uid is None:
        continue
    print('Found card with UID: 0x{0}'.format(binascii.hexlify(uid)))
    # Authenticate block 4 for reading with default key (0xFFFFFFFFFFFF).
    if not pn532.mifare_classic_authenticate_block(uid, 4, PN532.MIFARE_CMD_AUTH_B,
                                                   [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]):
        print('Failed to authenticate block 4!')
        continue
    # Read block 4 data.
    data = pn532.mifare_classic_read_block(4)
    if data is None:
        print('Failed to read block 4!')
        continue
    # Note that 16 bytes are returned, so only show the first 4 bytes for the block.
    print('Read block 4: 0x{0}'.format(binascii.hexlify(data[:4])))`,

//Read data from ntagxx NFC cards
DEF_NFC_READ_NTAG2XX:
`def NFC_read_ntag2xx(pn532):
  print('Waiting for ntag2xx card...')
  while True:
    # Check if a card is available to read.
    uid = pn532.read_passive_target()
    # Try again if no card is available.
    if uid is None:
        continue
    print('Found card with UID: 0x{0}'.format(binascii.hexlify(uid)))
    # Authenticate block 4 for reading with default key (0xFFFFFFFFFFFF).
    if not pn532.mifare_classic_authenticate_block(uid, 4, PN532.MIFARE_CMD_AUTH_B,
                                                   [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]):
        print('Failed to authenticate block 4!')
        continue
    # Read block 4 data.
    data = pn532.ntag2xx_read_block(4)
    if data is None:
        print('Failed to read block 4!')
        continue
    # Note that 16 bytes are returned, so only show the first 4 bytes for the block.
    print('Read block 4: 0x{0}'.format(binascii.hexlify(data[:4])))`,

DEF_BLE_DEVICE_SEND:
`def ble_device_send(device, ble_handle, ble_data, fmt, title="No name"):
  pyb.LED(1).on()
  # Horodatage
  timestamp = utime.time()
  # Affichage sur le port série de l'USB USER
  print("Service : " + title + ", horodatage : " + str(timestamp) + ", data : " + str(ustruct.unpack(fmt, ble_data)))
  # Envoi en BLE de l'horodatage et de la température en choisissant de notifier l'application
  device.set_data(ustruct.pack('<H', timestamp) + ble_data, ble_handle, notify=1)
  utime.sleep_ms(100)
  pyb.LED(1).off()
  utime.sleep_ms(50)`,

/****** SENSORS CATEGORY ******/

// Grove O2 sensor _ read O2 concentration
DEF_O2SENSOR_READ:
`def readO2(pin, volt=False, Vref=3.3):
  somme = getAnalogMean(pin)
  return somme*(Vref/${READ_ANALOG_MAX_VALUE}.0) if volt else somme*(Vref/${READ_ANALOG_MAX_VALUE}.0)*0.21/2.0*100`,

// Grove Temperature _ read
DEF_GROVE_GET_TEMP:
`def getGroveTemperature(pin, unit='celsius'):
  R = ${READ_ANALOG_MAX_VALUE}.0/(pin.read()+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return t`,

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

// Grove DS18X20 _ measure
DEF_DS18B20_MEASURE:
`def ds18x20_measure(ds, roms, index = 0):
  t = []
  ds.convert_temp()
  utime.sleep_ms(200)
  for rom in roms: 
    t.append(round(ds.read_temp(rom), 2))
  if index == 'all':
    return t
  else:
    return t[index]`,

// Grove UV sensor _ get UV sensor
DEF_GROVE_GET_UV_INDEX:
`def getUVindex(pin, n=15):
  somme = 0
  for i in range(n):
    somme += pin.read()
    utime.sleep_ms(2)                                    
  return ((somme/n/4.3*1000 - 83) / 21) / 4`,

// Grove Ultrasonic sensor _ get data
DEF_GROVE_ULTRASONIC:
`def grove_getUltrasonicData(pin, data='distance', timeout_us=30000):
  pin.init(Pin.OUT)
  pin.off()
  utime.sleep_us(2)               
  pin.on()
  utime.sleep_us(10)
  pin.off()
  pin.init(Pin.IN)
  duration = machine.time_pulse_us(pin, 1, timeout_us)/1e6 # t_echo in seconds
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
  duration = machine.time_pulse_us(echo, 1, timeout_us)/1e6 # t_echo in seconds
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

//expanstion board internal barometer
DEF_SEA_LEVEL_PRESSURE:
`def SeaLevelPressure(pressure, altitude):
  return pressure * pow(1.0 - (altitude * 2.255808707E-5), -5.255)`,

//expansion board integrated tilt mesure
DEF_INCLINOMETER_INTEGRATED_LIS2DW12:
`def inclinometer_integrated_LIS2DW12(sensor, axis):
  ax = sensor.x()
  ay = sensor.y()
  az = sensor.z()
  if axis == 'x':
    denom = math.sqrt(ay*ay + az*az)
    return math.atan(ax/denom) * (180/math.pi)
  elif axis == 'y':
    denom = math.sqrt(ax*ax + az*az)
    return math.atan(ay/denom) * (180/math.pi)
  elif axis == 'z':
    denom = math.sqrt(ay*ay + ax*ax)
    return math.atan(denom/az) * (180/math.pi)`,

/****** ROBOTS CATEGORY ******/

DEF_CONVERT_SPEED_MPS: 
`def convertSpeed_mps(speed, max_speed, max_rpm, wheels_diameter):
  # 2π * wheels_diameter / 2 * speed_rpm / 60
  return 2*math.pi*wheels_diameter/2*1e-2*(speed/max_speed*max_rpm)/60`,

// Alphabot
DEF_ALPHABOT_GET_SENSOR_ABOVE_LINE:
`def getSensorAboveLine(robot, blackLimit = 300):
  sensorsValue = robot.TRSensors_readLine(sensor=0)
  # Minimum value is most dark
  min_value = min(sensorsValue)
  if min_value < blackLimit:
    return ("IR" + str(sensorsValue.index(min_value) + 1), int(min_value))
  else:
    return (None, 0)`,

DEF_ALPHABOT_IS_SENSOR_ABOVE_LINE:
`def isSensorAboveLine(robot, sensorName, blackLimit = 300):
  sensorsValue = robot.TRSensors_readLine(sensor=0) # all sensors values
  if 'IR' in sensorName:
    if sensorName=='IR1' and sensorsValue[0] < blackLimit: return True
    elif sensorName=='IR2' and sensorsValue[1] < blackLimit: return True
    elif sensorName=='IR3' and sensorsValue[2] < blackLimit: return True
    elif sensorName=='IR4' and sensorsValue[3] < blackLimit: return True
    elif sensorName=='IR5' and sensorsValue[4] < blackLimit: return True
    else: return False
  else:
    raise ValueError("name '" + sensorName + "' is not a sensor option")`,

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

// DonutBot
DEF_DONUTBOT_BLINK_ROBOT: 
`def donutbot_blinkRobot(r, g, b):
  for count in range(2):
    for i in range(8):
      npDonutbot[i] = (r, g, b)
    npDonutbot.write()
    utime.sleep_ms(500)
    for i in range(8):
      npDonutbot[i] = (0, 0, 0)
    npDonutbot.write()
    utime.sleep_ms(500)`,

DEF_DONUTBOT_LINE_FOLLOWING:
`def donutbot_line_following():
  D = donutbot_get_line('right')
  C = donutbot_get_line('center')
  G = donutbot_get_line('left')
  if C and not D and not G:
    donutbot_move_forward(1050)
  if G:
    donutbot_rot_trigo(700)
  if D:
    donutbot_rot_clock(700)`,

// LoRa module

DEF_INT_TO_INT16:
`def int_to_int16( number):
  if number >= 0:
    return abs(number)
  else:
    int16 = abs(number)
    int16 = int16 ^ 0xFFFF
    return (int16 + 1)`,

DEF_DATA_RECEIVED:
`def DataReceived(Port = 0, DataReceived = b''):
  print("#### = Data received")
  print("Data received on PORT: " + str(Port) + 
        ", Size = "+ str(len(DataReceived)) + 
        ", Data = "+str([hex(x) for x in list(DataReceived)]))`,

DEF_PRINT_LORA_PARAMETERS:
`def PrintLoRaParameters():
  identify = loRa.getIdentify()
  if(identify != -1):
    print("#####################################################################")
    print("##########                   INITIALIZE                      ########")
    print("#####################################################################")
    print("LORA_DRIVER_VERSION:    " + loRa.getDriverVersion())
    print("#### " + loRa.getMode() + " ####")
    print("#### AppKey:    " + identify['AppKey'])
    print("#### DevEUI:    " + identify['DevEui'])
    print("#### AppEUI:    " + identify['AppEui'])
    print("#### DevAddr:   " + identify['DevAddr'])
  else:
    print("#### = Read identify fail.\\nReboot!")
    utime.sleep_ms(2000)
    machine.reset()
  if status == -1:
    print("#### = Initialize fail.\\nReboot!")
    utime.sleep_ms(2000)
    machine.reset()
  else:
    print("#### = Initialize success.")`,

DEF_JOIN_NETWORK:
`def JoinNetwork():
  # Try to join network
  joinStatus = False
  tryJoin = 0
  while joinStatus == False:
    # Join LoRaWAN
    print("#### = Try join n°" + str(tryJoin + 1))
    status = loRa.join() 
    if status == -1:
      print("#### = Join Fail, retry in " + str(DelayTryJoin) + " seconds.")
      tryJoin += 1
      if tryJoin > MaxTryJoin:
        # Reboot board
        print("Reboot!")
        machine.reset()
      utime.sleep_ms(DelayTryJoin * 1000)
    else:
        joinStatus = True
        print("#### = Join sucess.")`,

DEF_SEND_DATA:
`def sendData(data,data_type):
  # A frame is composed of 8-bit cells
  # The data type is coded on 8 bits 
  # A data is coded on 16 bits
  # So you need 3 "cells" (one for the type, 2 for the data) to store a data, 
  # i.e. in total : 
  # (amount of data to be sent * 2) + amount of data to be sent
  # <=> amount of data to be sent * 3
  
  loRaFrameSize = len(data) * 3
  loRaFrame = [0x00] * loRaFrameSize

  # Wake up LoRa module for new transsmission.
  if loRa.wakeUp() != -1:
    print("#### Wake up for send message:")

    # Create loRa frame.
    data_count = 0
    for i in range(0,loRaFrameSize - 1,3):
      singleData = int(int_to_int16(data[data_count]))
      loRaFrame[i] = data_type[data_count]
      loRaFrame[i+1] = (singleData >> 8) & 0xFF
      loRaFrame[i+2] = singleData & 0xFF
      data_count += 1

    print("#### = Send data.")
    # Send loRa frame over the air.
    sendStatus = loRa.sendData(loRaFrame, Port=1, NeedAck= False)
    # If send fail, check reboot condition.
    if sendStatus == -1:
        print("#### = Join fail.")
        if trySend > MaxTrySend:
            # Reboot board
            print("Reboot!")
            machine.reset()
    else:
        print("#### = Send success.")

    print("#### = LoRa module enter low power mode.")
    # Set module LoRa in low power mode.
    loRa.enterLowPowerMode()`,
};