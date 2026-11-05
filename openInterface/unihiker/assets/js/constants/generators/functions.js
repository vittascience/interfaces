/**
 * Functions added to the generated code by the UNIHIKER M10 blocks.
 */
const FUNCTIONS_UNIHIKER = {
    // Texts of the screen by number: a number already displayed is updated (a loop doesn't pile up texts)
    DEF_SCREEN_TEXT: `screen_texts = {}

def screen_text(number, text, x, y, size, color):
  if number in screen_texts:
    screen_texts[number].config(text=str(text), x=x, y=y, font_size=size, color=color)
  else:
    screen_texts[number] = gui.draw_text(text=str(text), x=x, y=y, font_size=size, color=color, origin="top_left")`,
    // The texts kept by number are removed with the screen
    DEF_SCREEN_CLEAR: `def screen_clear():
  gui.clear()
  if 'screen_texts' in globals():
    screen_texts.clear()`,
    // Note of the buzzer for a number of beats (0.5 s at 120 bpm): buzzer.pitch(freq, beat) waits for the end of the
    // note in a loop that doesn't end when it is called from an event (button), the note goes on. Without a duration,
    // buzzer.pitch plays 0.5 s in background: played again until the end of the note.
    // (the lock: one note at a time, from the program and the events)
    DEF_BUZZER_NOTE: `buzzer_lock = threading.Lock()

def buzzer_note(frequency, beats):
  # acquire and release: the simulator (Skulpt) doesn't read "with"
  buzzer_lock.acquire()
  try:
    end = time.time() + beats * 0.5
    while time.time() < end:
      buzzer.pitch(int(frequency))
      time.sleep(max(0, min(0.4, end - time.time())))
    buzzer.stop()
  finally:
    buzzer_lock.release()`,
    // Events (buttons, touch buttons) run in a thread: the screen isn't frozen during their pauses and notes. A new
    // press while the event is running is ignored.
    DEF_RUN_EVENT: `def run_event(function):
  def start():
    if getattr(function, 'running', False):
      return
    function.running = True
    def run():
      try:
        function()
      finally:
        function.running = False
    threading.Thread(target=run, daemon=True).start()
  return start`,
    // Buttons A and B read on the board (PinPong): the function runs at each press, in its thread. The GUI events
    // (gui.on_a_click) are keyboard keys: a key release lost on the board repeats the key, the event never stops.
    DEF_ON_BUTTON: `def on_button(button, function):
  def watch():
    pressed = False
    while True:
      now = button.is_pressed() == 1
      if now and not pressed:
        function()
      pressed = now
      time.sleep(0.02)
  threading.Thread(target=watch, daemon=True).start()`,
    // Video of the camera on the screen in a window (position and size), updated by a thread: called again, the
    // window moves (no other thread)
    DEF_CAMERA_STREAM: `camera_stream_window = None

def camera_stream(x, y, w, h):
  global camera_stream_window
  first = camera_stream_window is None
  camera_stream_window = (x, y, w, h)
  if first:
    threading.Thread(target=camera_stream_run, daemon=True).start()

def camera_stream_run():
  shown, shown_window = None, None
  while True:
    image = Image.fromarray(camera_image())
    if shown is None or shown_window != camera_stream_window:
      if shown is not None:
        gui.remove(shown)
      shown_window = camera_stream_window
      x, y, w, h = shown_window
      shown = gui.draw_image(image=image, x=x, y=y, w=w, h=h)
    else:
      shown.config(image=image)
    time.sleep(0.03)`,
    // Pins of the board by name, created at their first use in a mode
    // Tic-tac-toe on the touch screen: 3 x 3 cells of 70 pixels, rows and columns from 1 to 3. A touched cell runs
    // the function of the "when a cell is touched" block.
    DEF_TICTACTOE: `TICTACTOE_X = 15
TICTACTOE_Y = 70
TICTACTOE_CELL = 70
tictactoe = {'cells': [['', '', ''], ['', '', ''], ['', '', '']], 'objects': [], 'touched': [1, 1], 'on_touch': None}

def tictactoe_cell(row, col):
  def touched():
    tictactoe['touched'] = [row, col]
    if tictactoe['on_touch'] is not None:
      tictactoe['on_touch']()
  return touched

def tictactoe_new():
  for item in tictactoe['objects']:
    gui.remove(item)
  tictactoe['objects'] = []
  tictactoe['cells'] = [['', '', ''], ['', '', ''], ['', '', '']]
  size = 3 * TICTACTOE_CELL
  for row in range(3):
    for col in range(3):
      tictactoe['objects'].append(gui.fill_rect(x=TICTACTOE_X + col * TICTACTOE_CELL, y=TICTACTOE_Y + row * TICTACTOE_CELL,
        w=TICTACTOE_CELL, h=TICTACTOE_CELL, color='#ffffff', onclick=tictactoe_cell(row + 1, col + 1)))
  for i in range(1, 3):
    offset = i * TICTACTOE_CELL
    tictactoe['objects'].append(gui.draw_line(x0=TICTACTOE_X + offset, y0=TICTACTOE_Y, x1=TICTACTOE_X + offset, y1=TICTACTOE_Y + size, width=3, color='#000000'))
    tictactoe['objects'].append(gui.draw_line(x0=TICTACTOE_X, y0=TICTACTOE_Y + offset, x1=TICTACTOE_X + size, y1=TICTACTOE_Y + offset, width=3, color='#000000'))

def tictactoe_on_touch(function):
  tictactoe['on_touch'] = function

def tictactoe_is_empty(row, col):
  row, col = int(row), int(col)
  return 1 <= row <= 3 and 1 <= col <= 3 and tictactoe['cells'][row - 1][col - 1] == ''

def tictactoe_place(symbol, row, col):
  symbol = str(symbol)
  if tictactoe_is_empty(row, col):
    row, col = int(row), int(col)
    tictactoe['cells'][row - 1][col - 1] = symbol
    tictactoe['objects'].append(gui.draw_text(text=symbol, x=TICTACTOE_X + (col - 0.5) * TICTACTOE_CELL, y=TICTACTOE_Y + (row - 0.5) * TICTACTOE_CELL,
      font_size=36, origin='center', color='#e5383b' if symbol == 'X' else '#1f6feb'))

def tictactoe_state(state):
  c = tictactoe['cells']
  lines = c + [[c[0][i], c[1][i], c[2][i]] for i in range(3)] + [[c[0][0], c[1][1], c[2][2]], [c[0][2], c[1][1], c[2][0]]]
  winner = ''
  for line in lines:
    if line[0] != '' and line[0] == line[1] and line[1] == line[2]:
      winner = line[0]
  full = '' not in c[0] + c[1] + c[2]
  if state == 'DRAW':
    return winner == '' and full
  if state == 'OVER':
    return winner != '' or full
  return winner == state`,
    DEF_PIN: `pins = {}

def pin(number, mode):
  if (number, mode) not in pins:
    pins[(number, mode)] = Pin(number, mode)
  return pins[(number, mode)]`,
};

// Functions of the module blocks (from the micro:bit and ESP32 ones): pins of PinPong (pin()), analog values from 0 to
// 4095 (12 bits ADC of the board), serial port of the edge connector (uart)
const FUNCTIONS_UNIHIKER_MODULES = {
    DEF_UART_WRITE: `def uart_write(data):
  uart.write(list(str(data).encode()))`,
    DEF_UART_READ: `def uart_read():
  count = uart.any()
  return bytes(uart.read(count)) if count else None`,
    DEF_SERVO: `servos = {}
def servo(number):
  if number not in servos:
    servos[number] = Servo(Pin(number))
  return servos[number]`,
    DEF_SERVO_SET_SPEED: `def setServoSpeed(number, direction, speed):
  if speed < 0 or speed > 100:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")
  # 90 degrees: stop, 0 or 180 degrees: full speed in one direction
  servo(number).write_angle(int(90 + direction * speed * 0.9))`,
    DEF_NEOPIXEL: `neopixels = {}
def neopixel(number, count=30):
  if number not in neopixels:
    neopixels[number] = NeoPixel(Pin(number), count)
    neopixels[number].count = count
  return neopixels[number]`,
    DEF_NEOPIXEL_FILL: `def neopixel_fill(strip, color):
  strip.range_color(0, strip.count - 1, tuple(color))`,
    DEF_TONE: `tones = {}
def tone(number, frequency, duration):
  if number not in tones:
    pwm_pins = [Pin.P0, Pin.P2, Pin.P3, Pin.P8, Pin.P9, Pin.P10, Pin.P16, Pin.P21, Pin.P22, Pin.P23]
    if number not in pwm_pins:
      raise ValueError("Buzzer sur P" + str(number) + " : la UNIHIKER M10 n'a pas de PWM sur cette broche (P0, P2, P3, P8, P9, P10, P16, P21, P22, P23)")
    tones[number] = Tone(Pin(number))
  tones[number].freq(int(frequency))
  tones[number].on()
  time.sleep(duration / 1000)
  tones[number].off()`,
    DEF_DHT11: `dht11_sensors = {}
def dht11(number):
  if number not in dht11_sensors:
    dht11_sensors[number] = DHT11(Pin(number))
  return dht11_sensors[number]`,
    DEF_ULTRASONIC: `# measured by the coprocessor of the board (the same pin for the Grove sensor)
ultrasonic_sensors = {}
def getUltrasonicData(trig, echo, data='distance'):
  if (trig, echo) not in ultrasonic_sensors:
    ultrasonic_sensors[(trig, echo)] = SR04_URM10(Pin(trig), Pin(echo))
  distance = ultrasonic_sensors[(trig, echo)].distance_cm()
  if not distance or distance <= 0:
    return -1
  return distance if data == 'distance' else distance * 2 / 34300`,
    DEF_GROVE_GET_TEMP: `def getGroveTemperature(pin, unit='celsius'):
  R = 4095.0/(pin.read_analog()+1e-3) - 1
  t = 1/(math.log(R)/4250+1/298.15) - 273.15 # celsius
  if unit == 'fahrenheit':
    t = t * 9/5 + 32
  elif unit == 'kelvin':
    t += 273.15
  return round(t, 2)`,
    DEF_GROVE_HIGHTEMP_THMC_TABLE: `Var_VtoT_K = [[0, 2.5173462e1, -1.1662878, -1.0833638, -8.9773540/1e1, -3.7342377/1e1, -8.6632643/1e2, -1.0450598/1e2, -5.1920577/1e4],
              [0, 2.508355e1, 7.860106/1e2, -2.503131/1e1, 8.315270/1e2, -1.228034/1e2, 9.804036/1e4, -4.413030/1e5, 1.057734/1e6, -1.052755/1e8],
              [-1.318058e2, 4.830222e1, -1.646031, 5.464731/1e2, -9.650715/1e4, 8.802193/1e6, -3.110810/1e8]]`,
    DEF_GROVE_HIGHTEMP_GET_THMC_TEMP: `def getThmcTemp(pinA0, tempRoom):
  vout = pinA0.read_analog()/4095.0 * 5.0 * 1000.0
  vol  = (vout-350) / 54.16
  return K_VtoT(vol) + tempRoom`,
    DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP: `def getRoomTemp(pinA1):
  somme = 0
  for i in range(32):
    somme += pinA1.read_analog()
  a = ((somme>>5))*50.0/33.0
  res = (4095.0-a)*10000.0/a
  return 1/(math.log(res/10000.0)/3975.0+1/298.15)-273.15`,
    DEF_GROVE_HIGHTEMP_KVTOT: `def K_VtoT(mV):
  value = 0
  if mV >= -6.478 and mV < 0:
    value = Var_VtoT_K[0][8]
    for i in range(8, 0, -1):
      value = mV * value + Var_VtoT_K[0][i-1]
  elif mV >= 0 and mV < 20.644:
    value = Var_VtoT_K[1][9]
    for i in range(9, 0, -1):
      value = mV * value + Var_VtoT_K[1][i-1]
  elif mV >= 20.644 and mV <= 54.900:
    value = Var_VtoT_K[2][6]
    for i in range(6, 0, -1):
      value = mV * value + Var_VtoT_K[2][i-1]
  return value`,
    DEF_GET_ANALOG_MEAN: `def getAnalogMean(pin, n=32):
  total = 0
  for i in range(n):
    total += pin.read_analog()
  return int(total/n)`,
    DEF_O2SENSOR_READ: `def readO2(pin, volt=False, Vref=3.3):
  measure = getAnalogMean(pin)
  return measure*(Vref/4095) if volt else measure*(Vref/4095)*0.21/2*100`,
    DEF_MPX5700AP_GET_PRESSURE: `def mpx5700_readPressure(pin, n=10):
  rawValue = 0
  for i in range(n):
    rawValue += pin.read_analog() * 1023 / 4095
  return (rawValue - 410) * 700 / float(n*1023)`,
    DEF_GROVE_GET_UV_INDEX: `def getUVindex(pin, n=15):
  somme = 0
  for i in range(n):
    somme += pin.read_analog() * 1023 / 4095
    time.sleep(0.002)
  return (somme/n/4.3*1000 - 83) / 21`,
    DEF_READ_HEART_RATE: `def read_heart_rate(pin):
  beat_count = 0
  end_time = time.time() + 15
  print('Measure in progress please wait...')
  while time.time() < end_time:
    if pin.read_digital() == 0:
      beat_count += 1
      while pin.read_digital() == 0:
        time.sleep(0.001)
  return beat_count * 4`,
    DEF_NEOPIXEL_RAINBOW: `def neopixel_rainbow(strip):
  strip.rainbow(0, strip.count - 1, 0, 360)`,
    DEF_KEYPAD_GET_NUMBER: `def getKeypadNumber():
  while not uart.any():
    time.sleep(0.01)
  data = uart_read().decode()[-1:]
  if data == 'a': return '*'
  elif data == 'b': return '0'
  elif data == 'c': return '#'
  else: return data`,
    DEF_HM10_BLUETOOTH_SEND_COMMAND_AT: `def hm10_bluetooth_sendCommandAT(command, value=""):
  data = command + (value if len(value) > 0 else "") + "\\r\\n"
  print("[HM10 INFOS] Command sent: " + data)
  uart_write(data)
  time.sleep(0.2)
  if not uart.any():
    print("Check connection wires. Invert RXD and TXD if necessary. Additionally, it is not possible to interact with AT mode when the module is connected to another device.\\n")
    print("Waiting HM10 module in AT Mode...\\n")
    while not uart.any():
      time.sleep(0.1)
  raw = uart_read()
  if raw is None:
    return ""
  response = raw.decode().replace("\\r", "").strip()
  if len(value) > 0:
    print(response)
  return response`,
    DEF_GPS_READ_NMEA: `def gps_readNMEA(wait=False):
  global gpsBuffer
  def read():
    global gpsBuffer
    data = uart_read()
    if data:
      gpsBuffer += data.decode('ascii', 'ignore')
      lines = gpsBuffer.split("\\r\\n")
      frames = []
      for f in lines:
        if (f.count(',') == 12 or f.count(',') == 14) and (f.find("$GNGGA") == 0 or f.find("$GPGGA") == 0):
          frames.append(f)
        if f.count(',') == 19 and f.find("$GPGSV") == 0:
          frames.append(f[:-2])
        if f.count(',') == 17 and (f.find("$GPGSA") == 0 or f.find("$BDGSA") == 0):
          frames.append(f[:-2])
        if f.count(',') == 9 and f.find("$GNVTG") == 0:
          frames.append(f[:-2])
      gpsBuffer = lines[-1]
      if len(frames) > 0:
        print("[GPS_INFO] Lecture de la trame NMEA valide.\\n")
        gpsInfos['nmea'] = frames
  if wait:
    gpsInfos['nmea'] = None
    while gpsInfos['nmea'] is None:
      read()
      time.sleep(0.1)
  else:
    read()
  return gpsInfos['nmea']`,
    DEF_GPS_GET_GGA_INFORMATIONS: `def gps_GGA_getInformation(info=None):
  frame = ['type', 'clock', 'latitude', 'latDir', 'longitude', 'lonDir', 'positionType', 'satellite', 'precision', 'altitude', 'altUnit']
  gps_readNMEA()
  gga = None
  for f in gpsInfos['nmea'] or []:
    if f.find("$GNGGA") == 0 or f.find("$GPGGA") == 0:
      gga = f
      break
  if gga is not None:
    nmeaArray = gga.split(',')
    for i in frame:
      data = nmeaArray[frame.index(i)]
      try:
        if i == 'clock':
          date = float(data)
          h = int(date / 10000)
          m = int((date - h*10000) / 100)
          gpsInfos[i] = (h, m, int(date - h*10000 - m*100))
        elif i == 'latitude' or i == 'longitude':
          pos = float(data)
          base = int(pos/100)
          side = -1 if nmeaArray[frame.index(i) + 1] in ('S', 'W') else 1
          gpsInfos[i] = side*float("%03.5f"%(base + (pos - base*100)/60))
        elif i == 'positionType' or i == 'satellite':
          gpsInfos[i] = int(data)
        elif i == 'precision' or i == 'altitude':
          gpsInfos[i] = float(data)
        else:
          gpsInfos[i] = data
      except ValueError:
        pass
  if info is None:
    return gpsInfos
  return gpsInfos.get(info)`,
    DEF_RC522_READ_TAG_UID: `def rc522_readTagUid():
  (stat, tag_type) = rfid_rc522.request(rfid_rc522.REQIDL)
  if stat == rfid_rc522.OK:
    (stat, uid) = rfid_rc522.anticoll()
    if stat == rfid_rc522.OK:
      return ''.join('%02X' % i for i in uid)`,
    DEF_DS1307: `DS1307_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
def ds1307_readTime():
  t = clock_v1.get_time()
  return (t.year, t.month, t.day, DS1307_DAYS[t.weeks.index(t.week)], t.hours, t.minute, t.second)
def ds1307_setDate(year, month, day, dayOfWeek):
  t = clock_v1.get_time()
  clock_v1.set_time([t.second, t.minute, t.hours, DS1307_DAYS.index(dayOfWeek) + 1, day, month, year % 100])
def ds1307_setHour(hour, minute, second):
  t = clock_v1.get_time()
  clock_v1.set_time([second, minute, hour, t.weeks.index(t.week) + 1, t.day, t.month, t.year % 100])`,
    DEF_ENVIROBIT_READ_SOUND: `def envirobit_readSound():
  return max(0, pin(Pin.P2, Pin.ANALOG).read_analog() * 1023 / 4095 - ENVIROBIT_SOUND_OFFSET)`,
    ENVIROBIT_WAIT_FOR_CLAP: `def envirobit_waitForClap(timeout=1000, sensitivity=75):
  sensitivity = 105 - sensitivity
  start_time = time.time()
  while (time.time() - start_time) * 1000 < timeout:
    if envirobit_readSound() > sensitivity:
      return True
  return False`,
    ENVIROBIT_WAIT_FOR_DOUBLE_CLAP: `def envirobit_waitForDoubleClap(timeout=1000, spread=500, sensitivity=75):
  sensitivity = 105 - sensitivity
  clap_one_time = None
  start_time = time.time()
  while (time.time() - start_time) * 1000 < timeout:
    if envirobit_readSound() > sensitivity:
      while envirobit_readSound() > sensitivity:
        pass
      time.sleep(0.1)
      if clap_one_time is not None and (time.time() - clap_one_time) * 1000 < spread:
        return True
      clap_one_time = time.time()
  return False`,
    DEF_IO_PULSE_IN: `# monotonic clock of Python (M10), microseconds of MicroPython (K10)
_seconds = getattr(time, 'monotonic', None) or (lambda: time.ticks_us() / 1e6)
def pulseIn(pin, pulseState, maxDuration=2000000):
  t_init = _seconds()
  while pin.read_digital() != pulseState:
    if (_seconds() - t_init) * 1e6 > maxDuration:
      return 0
  start = _seconds()
  while pin.read_digital() == pulseState:
    if (_seconds() - t_init) * 1e6 > maxDuration:
      return 0
  return int((_seconds() - start) * 1e6)`,
    DEF_ANEMOMETER_GET_WIND_SPEED: `def anemometer_getWindSpeed(pin, unit='m/s', pulse_per_revolution=1):
  SPEED_OF_ONE_PULSE = 0.66666667/pulse_per_revolution # m/s
  pulse_s = pulseIn(pin, 1, maxDuration=1000000) # us
  if pulse_s <= 0:
    return 0
  speed = SPEED_OF_ONE_PULSE*pulse_per_revolution/(pulse_s/1e6) # m/s
  if unit == 'km/h':
    return speed*3600/1e3
  elif unit == 'inch/s':
    return speed/2.54
  elif unit == 'knot':
    return speed/0.514444444
  return speed`,
    DEF_WEATHERCOCK_GET_DIRECTION: `def weathercock_getDirection(pin):
  windDir = pin.read_analog() * 1023 / 4095
  for low, high, direction in ((886, 906, "N"), (692, 712, "NE"), (395, 415, "E"), (478, 498, "SE"), (564, 584, "S"), (799, 819, "SW"), (968, 988, "W"), (939, 959, "NW")):
    if low < windDir < high:
      return direction
  return "???"`,
    DEF_RAIN_GAUGE_GET_DUMPS: `def rainGauge_getDumps(pin):
  global rainGauge_dumps
  pulse_us = pulseIn(pin, 1, maxDuration=1000000) # us
  if pulse_us > 0:
    rainGauge_dumps += 1
  else:
    rainGauge_dumps = 0
  return rainGauge_dumps * RAIN_HEIGHT_RATIO`,
    DEF_KITRONIK_CONTROL_MOTOR: `# Kitronik motor driver board: motor 1 on P8/P12, motor 2 on P0/P16 (PWM on P8, P0 and P16 only on the M10)
def kitronik_controlMotor(motor, direction, speed=100):
  value = int(speed/100.0*1023)
  forward, backward = (Pin.P8, Pin.P12) if motor == 1 else (Pin.P0, Pin.P16)
  if direction == -1:
    forward, backward = backward, forward
  pin(backward, Pin.OUT).write_digital(0)
  if forward == Pin.P12:
    pin(forward, Pin.OUT).write_digital(1 if value > 0 else 0)
  else:
    pin(forward, Pin.PWM).write_analog(value)
def kitronik_stopMotor(motor):
  for number in ((Pin.P8, Pin.P12) if motor == 1 else (Pin.P0, Pin.P16)):
    pin(number, Pin.OUT).write_digital(0)`,
    DEF_SCD30_READ: `def scd30_read(dataSelect):
  global t_scd, scd30_data
  if time.time() - t_scd > 1:
    t_scd = time.time()
    data = scd30.read_measurement()
    if not math.isnan(data[0]):
      scd30_data = list(data)
  return scd30_data[dataSelect]`,
    DEF_SCD30_CALIBRATE: `def scd30_calibrateSensor(co2ppm):
  print("[SCD30_INFO] Go outside, and wait for 2 minutes. You can reset the board to restart program and redo calibration.\\n")
  print("[SCD30_INFO] Start sensor calibration...\\n")
  for i in range(60):
    scd30.read_measurement()
    time.sleep(2)
  scd30.set_forced_recalibration(co2ppm)
  print("[SCD30_INFO] End of calibration forced to " + str(co2ppm) + " ppm.\\n")`,
    DEF_GET_CURRENT_TIME: `def getCurrentTime():
  # indexes: Python of the M10 and MicroPython of the K10
  now = time.localtime()
  return now[3], now[4]`,
    DEF_OLED_ADD_TEXT: `# 12 x 4 characters, as on the micro:bit
def oled_addText(x, y, text):
  x, y = max(0, min(11, x)), max(0, min(3, y))
  oled.fill_rect(x * 10, y * 16, 128 - x * 10, 16, 0)
  oled.text(text[:12 - x], x * 10, y * 16 + 4, 1)
  oled.show()`,
    DEF_TCS3472: `# red, green and blue from 0 to 255 (relative to the clear light), as on the micro:bit
def tcs3472_rgb():
  r, g, b, c = tcs3472.get_rgbc()
  return tuple(int(x * 255 / c) for x in (r, g, b)) if c else (0, 0, 0)`,
    DEF_KITRONIK_SERVO: `def kitronik_servoWrite(servo, degrees):
  servoBoard.set_pwm(servo - 1, 0, int(degrees * 226 / 100 + 0x66))`,
    DEF_GESTURE: `GESTURES = {1: 'right', 2: 'left', 4: 'up', 8: 'down', 16: 'forward', 32: 'backward', 64: 'clockwise', 128: 'anticlockwise', 256: 'wave'}
def readGesture():
  return GESTURES.get(gesture.get_gesture(), '')`,
    DEF_OLED_STAMPS: `# 5 x 5 images of the micro:bit, on the 64 x 32 grid of the micro:bit OLED blocks (2 x 2 pixels each)
OLED_ICONS = {
  'HEART': '01010:11111:11111:01110:00100', 'HAPPY': '00000:01010:00000:10001:01110', 'SAD': '00000:01010:00000:01110:10001',
  'YES': '00000:00001:00010:10100:01000', 'NO': '10001:01010:00100:01010:10001', 'STICKFIGURE': '00100:11111:00100:01010:10001',
  'PITCHFORK': '10101:10101:11111:00100:00100', 'UMBRELLA': '01110:11111:00100:10100:01100', 'SKULL': '01110:10101:11111:01110:01110',
  'CHESSBOARD': '01010:10101:01010:10101:01010', 'BUTTERFLY': '11011:11111:00100:11111:11011'}
def oled_drawIcon(x, y, icon, state=1):
  for row, line in enumerate(OLED_ICONS[icon].split(':')):
    for col, value in enumerate(line):
      if value == '1':
        oled.fill_rect((x + col) * 2, (y + row) * 2, 2, 2, state)
  oled.show()`,
};
