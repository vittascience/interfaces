// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_PICO = {
DEF_GET_ANALOG_MEAN:
`def getAnalogMean(pin, n = 32):
  sum = 0
  for i in range(32):
    sum += pin.read_u16()
  return sum >> 5`,

/******** COMMUNICATION CATEGORY */

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
    pin.duty_u16(int(0.025*${PWM_MAX_DUTY} + (angle*0.1*${PWM_MAX_DUTY})/180))
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pin, direction, speed):
  if (speed >= 0 and speed <= 100):
    GAP = 14
    if direction == 1:
      speedAngle = 90*(1+speed/100) - GAP
      pin.duty_u16(int(speedAngle))
    elif direction == -1:
      speedAngle = 90*(1-speed/100) - GAP
      if speedAngle < 0: speedAngle = 1
      pin.duty_u16(int(speedAngle))
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
  R = ${READ_ANALOG_MAX_VALUE}.0/(pin.read_u16()+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
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
    somme += pin.read_u16()
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

/****** ROBOT CATEGORY ******/

DEF_CONVERT_SPEED_MPS: 
`def convertSpeed_mps(speed, max_speed, max_rpm, wheels_diameter):
  # 2π * wheels_diameter / 2 * speed_rpm / 60
  return 2*math.pi*wheels_diameter/2*1e-2*(speed/max_speed*max_rpm)/60`,

DEF_KITRO_STOP_MOTORS: 
`def kitro_stopMotors():
  robot.motorOff("l")
  robot.motorOff("r")`,

DEF_KITRO_MOVE: 
`def kitro_move(direction, speed):
  robot.motorOn("l", direction, speed)
  robot.motorOn("r", direction, speed)`,

DEF_KITRO_TURN_ANGLE: 
`def kitro_turnAngle(angle, speed=70):
  speed_mps = convertSpeed_mps(speed, 100, 162.5, 6.6)
  # wheels_center_radius * degToRad(angle)
  angularDistance = 6.2*1e-2*angle/180*math.pi
  if (angle < 0) :
    robot.motorOn("l", "r", speed)
    robot.motorOn("r", "f", speed)
  else :
    robot.motorOn("r", "r", speed)
    robot.motorOn("l", "f", speed)
  utime.sleep_ms(int(math.fabs(angularDistance)/speed_mps*1000))
  kitro_stopMotors()`,

DEF_KITRO_MOVE_ONE_SQUARE: 
`def kitro_moveWithSquare(x, direction, speed=70):
  speed_mps = convertSpeed_mps(speed, 100, 162.5, 6.6)
  for i in range(int(x)):
    kitro_move(direction, speed)
    utime.sleep_ms(int(15e-2/speed_mps*1000))
    kitro_stopMotors()`,

DEF_KITRO_LINE_FINDER:
`def kitro_lineFinder(sensor):
  value = robot.getRawLFValue(sensor)
  if value > 20000:
    return True
  else:
    return False`,

/****** NETWORK CATEGORY ******/

// Wifi _ configure station
DEF_WIFI_CONNECT_STATION:
`def connect_station(ssid='', password='', ip='', mask='', gateway=''):
  global station
  station = network.WLAN(network.STA_IF)
  station.active(False)
  ap = network.WLAN(network.AP_IF)
  ap.active(False)
  print("\\nTrying to connect to '%s' ..." % ssid)
  if len(ip) is not 0:
    if len(gateway) == 0:
      gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
    if len(mask) == 0:
      mask = '255.255.255.0'
    station.ifconfig((ip, mask, gateway, gateway))
  station.active(True)
  station.connect(ssid, password)
  while not station.isconnected():
    pass
  print("Station connected !, IP Adress:", station.ifconfig()[0])`,

// Wifi _ configure access point
DEF_WIFI_CONFIGURE_ACCESS_POINT:
`def configure_access_point(ssid='', ip='', activate=True):
  ap = network.WLAN(network.AP_IF)
  sta = network.WLAN(network.STA_IF)
  sta.active(False)
  ap.config(essid=ssid, security=0)
  ap.active(activate)
  print("Access point started.")
  print("Note: Connecting to the access point on iOS may take ~1 min\\n")
  return ap`,

DEF_WIFI_DISCONNECT_STATION:
`def disconnect_station():
  if station is not None and station.isconnected():
    ssid = station.config('essid')
    station.disconnect()
    for retry in range(100):
      connected = station.isconnected()
      if not connected:
        break
      utime.sleep(0.1)
    if not connected:
      station.active(False)
      utime.sleep(0.2)
      print("Disconnected from '%s'\\n" %ssid)
    else:
      print("Disconnection from '%s' failed.\\n" %ssid)
  else:
    print("Station already disconnected.\\n")`,

// DEF_WIFI_CONFIGURE_ACCESS_POINT:
// `def configure_access_point(ssid='', ip='', activate=True):
//   ap = network.WLAN(network.AP_IF)
//   if len(ip) is not 0:
//     gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
//     ap.ifconfig((ip, '255.255.255.0', gateway, gateway))
//   ap.config(ssid=ssid, security=0)
//   ap.active(activate)
//   print("Access point started.")
//   print("Note: Connecting to the access point on iOS may take ~1 min\\n")
//   return ap`,

// Javacript function for server //

JAVSCRIPT_ON_BUTTON_CLICK:
`const http_onButtonClick = function(id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=1", true);
  xhttp.send(null);
};`,

JAVSCRIPT_SEND_SLIDER_VALUE:
`const http_sendSliderValue = function(slider, id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=" + slider.value, true);
  xhttp.send(null);
};`,

JAVSCRIPT_ON_SWITCH_TOGGLE:
`const http_onSwitchToggle = function(id) {
  const state = document.getElementById(id).checked;
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=" + (state ? 1 : 0), true);
  xhttp.send(null);
};`,

JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER:
`const requestVariablesFromServer = function(ip) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.responseText != null) {
      try {
        const serverResponse = JSON.parse(request.responseText);
        if (serverResponse.spans) {
          for (var i in serverResponse.spans) {
            document.getElementById(i).innerText = serverResponse.spans[i];
          }
        }
        if (serverResponse.gauges) {
          for (var i in serverResponse.gauges) {
            if (myGauges[i]) {
              setGaugeValue(serverResponse.gauges[i], myGauges[i].min, myGauges[i].max, i)
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  request.open('GET', "/requestVariables&ip=" + ip, true);
  request.send(null);
  setTimeout(function () {
    requestVariablesFromServer(ip);
  }, 1000);
};`,

JAVASCRIPT_SET_GAUGE_VALUE:
`function setGaugeValue(value, min, max, gaugeId, unit="") {
  console.log(value, min, max, gaugeId)
  if (!isNaN(parseFloat(value))) {
    const newVal = gaugeScaleValue(parseFloat(value), [min, max], [0, 180]);
    const gaugeDiv = document.getElementById(gaugeId)
    const gaugeClass = gaugeDiv.querySelectorAll('.semi-circle--mask')[0]
    gaugeClass.style.transform = 'rotate(' + newVal + 'deg)  translate3d(0,0,0)';
    textValue = gaugeDiv.querySelector("#gauge_value").innerHTML = value + unit;
  }
};
function gaugeScaleValue(value, from, to) {
  const scale = (to[1] - to[0]) / (from[1] - from[0]);
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};`,

// Css style for server //
CSS_DEFAULT_SWITCHER:
`.switch {position:relative;display:inline-block;}
.switch input {opacity:0;width:0;height:0;}
.sw_slider {position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;}
.sw_slider:before {position:absolute;content:"";background-color:white;transition:.4s;}
.sw_slider.round {border-radius:34px;}
.sw_slider.round:before {border-radius:50%;}`,

CSS_DEFAULT_SLIDER:
`.slider {-webkit-appearance:none;background:#e3e3e3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;border:solid;border-color:#c3c3c3;margin-top:15px}
.slider::-webkit-slider-thumb {-webkit-appearance:none;appearance:none;background:#22b573;cursor:pointer;}`,

CSS_DEFAULT_INIT:
`div {margin-left:auto;margin-right:auto;}
.police {font-family: Montserrat, serif;}`,

CSS_GAUGE_STYLE:
`.mask {position:relative;overflow:hidden;display:block;width:12.5rem;height:6.25rem;margin:1.25rem;}
.semi-circle {position:relative;display:block;width:12.5rem;height:6.25rem;background:linear-gradient(to right,#3498db 0%,#05b027 33%,#f1c40f 70%,#c0392b 100%);border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}
.semi-circle::before {content:"";position:absolute;bottom:0;left:50%;z-index:2;display:block;width:8.75rem;height:4.375rem;margin-left:-4.375rem;background:#fff;border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}
.semi-circle--mask {position:absolute;top:0;left:0;width:12.5rem;height:12.5rem;background:transparent;transform:rotate(120deg) translate3d(0,0,0);transform-origin:center center;backface-visibility:hidden;transition:all 0.3s ease-in-out;}
.semi-circle--mask::before {content:"";position:absolute;top:0;left:0%;z-index:2;display:block;width:12.625rem;height:6.375rem;margin:-1px 0 0 -1px;background:#f2f2f2;border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}`,

}