// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_RASPBERRY = {
DEF_SETUP_GPIO:
`def setupGPIO():
  #GPIO.cleanup()
  GPIO.setmode(GPIO.BCM)
  #pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 27]
  #for pin in pins:
  #  GPIO.setup(pin, GPIO.IN)`,

DEF_TIME_PULSE_US:
`def time_pulse_us(pin, level, timeout_us=1000000):
  timeout_s = timeout_us / 1_000_000

  start = time.perf_counter()
  while GPIO.input(pin) != level:
    if time.perf_counter() - start > timeout_s:
      return -2

  pulse_start = time.perf_counter()
  while GPIO.input(pin) == level:
    if time.perf_counter() - pulse_start > timeout_s:
      return -1

  pulse_end = time.perf_counter()
  return int((pulse_end - pulse_start) * 1_000_000)`,

/****** DISPLAY CATEGORY ******/

// NEOPX module _ show all led   
DEF_NEOPIXEL_SHOW_ALL_LED:
`def neopixel_showAllLed(neoPx, ledCount, R, G, B):
  for i in range(ledCount):
    neoPx.setPixelColor(i, Color(R, G, B)) 
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

DEF_4DIGITDISPLAY_NUMBER:
`def DigitDisplay_number(value):
  if isinstance(value, bool):
    value = int(value)
  if isinstance(value, int):
    s = str(value)
    return s.rjust(4) if len(s) <= 4 else "EEEE"
  if isinstance(value, float):
    for fmt in (".2f", ".1f", ".0f"):
      s = format(value, fmt).rstrip("0").rstrip(".")
      if len(s) <= 4:
        return s.rjust(4)
    return "EEEE"
  s = str(value).strip()
  return s.rjust(4) if len(s) <= 4 else "EEEE"`,

DEF_4DIGITDISPLAY_TEMP:
`def DigitDisplay_temperature(t):
  try:
    t = int(round(float(t)))
  except (ValueError, TypeError):
    return "EE°C"
  if -9 <= t <= 99:
    return f"{t}°C".rjust(4)
  return "EE°C"`,

/****** IO CATEGORY ******/

SENSE_HAT_GET_EVENT_JOYSTICK:
`def senseHat_getEventsJoystick():
  for event in sense.stick.get_events():
    print("The joystick was {} {}".format(event.action, event.direction))`,

/****** SENSORS CATEGORY ******/

DEF_CAMERA_RPI_PREVIEW_CONFIGURE:
`def camera_RPI_preview_configure(size, mode = 1):
  os.environ["LIBCAMERA_LOG_LEVELS"] = "3"
  #rpiCam.set_logging(Picamera2.ERROR)
  rpiCam_config = rpiCam.create_preview_configuration(
    {"size": size}, 
    raw=rpiCam.sensor_modes[mode]
  )
  rpiCam.configure(rpiCam_config)`,

DEF_CAMERA_RPI_VIDEO_CONFIGURE:
`def camera_RPI_video_configure(size):
  rpiCam_config = rpiCam.create_video_configuration(
    main={"size": size, "format": "RGB888"}
  )
  rpiCam.configure(rpiCam_config)`,

DEF_CAMERA_RPI_TAKE_PICTURE:
`def camera_RPI_takePicture():
  rpiCam.start()
  time.sleep(2)
  frame = rpiCam.capture_array()
  rpiCam.stop()
  time.sleep(2)
  return frame`,

DEF_CAMERA_RPI_TAKE_VIDEO:
`def camera_RPI_takeVideo(duration = 5, filename = None):
  output_dir = pathlib.Path(__file__).parent / "static/videos"
  output_dir.mkdir(parents=True, exist_ok=True)
  if filename is None:
    filename = f"video_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"
  elif "." not in filename:
    filename += ".mp4"
  output_path = output_dir / filename

  encoder = picamera2.encoders.H264Encoder()
  output = picamera2.outputs.PyavOutput(str(output_path))
  rpiCam.start_recording(encoder, output)
  time.sleep(duration)
  rpiCam.stop_recording()

  return output_path`,

DEF_CAMERA_USB_TAKE_PICTURE:
`def camera_USB_takePicture(slot = 0):
  cap = cv2.VideoCapture(slot)
  width, height = cv2_frame_size
  if width is not None:
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
  if height is not None:
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
  if not cap.isOpened():
    raise RuntimeError("Impossible d'ouvrir la caméra USB")
  for _ in range(5):
    cap.read()
    time.sleep(0.05)
  ret, frame = cap.read()
  cap.release()
  if not ret:
    raise RuntimeError("Impossible de capturer l'image")
  return frame`,

DEF_CAMERA_USB_TAKE_VIDEO:
`def camera_USB_takeVideo(slot=0, duration=5, filename=None, fps=20):
  output_dir = pathlib.Path(__file__).parent / "static/videos"
  output_dir.mkdir(parents=True, exist_ok=True)
  if filename is None:
    filename = f"video_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
  avi_path = output_dir / f"{filename}.avi"
  mp4_path = output_dir / f"{filename}.mp4"

  cap = cv2.VideoCapture(slot)
  cap.set(cv2.CAP_PROP_FRAME_WIDTH, cv2_frame_size[0])
  cap.set(cv2.CAP_PROP_FRAME_HEIGHT, cv2_frame_size[1])
  if not cap.isOpened():
    raise RuntimeError("Impossible d'ouvrir la caméra")

  width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
  height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
  writer = cv2.VideoWriter(str(avi_path), cv2.VideoWriter_fourcc(*"MJPG"), fps, (width, height))
  if not writer.isOpened():
    cap.release()
    raise RuntimeError("Impossible de créer le fichier vidéo")

  for _ in range(10):
    cap.read()
    time.sleep(0.05)

  frame_count = 0
  start = time.time()
  while time.time() - start < duration:
    ret, frame = cap.read()
    if not ret or frame is None:
      continue
    writer.write(frame)
    frame_count += 1

  writer.release()
  cap.release()
  if frame_count == 0:
    raise RuntimeError("Aucune frame enregistrée")

  subprocess.run(["ffmpeg", "-y", "-i", str(avi_path), "-c:v", "libx264", "-pix_fmt", "yuv420p", str(mp4_path)], check=True)
  avi_path.unlink(missing_ok=True)

  print("Frames écrites :", frame_count)
  print("Fichier :", mp4_path)

  return str(mp4_path)`,

DEF_CV2_CAMERA_SAVE_PICTURE:
`def cv2_camera_savePicture(frame, filename = None):
  output_dir = pathlib.Path(__file__).parent / "static/images"
  output_dir.mkdir(parents=True, exist_ok=True)
  if filename == None:
    filename = f"photo_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
  elif '.' not in filename:
    filename += '.jpg'
  output_path = output_dir / filename
  cv2.imwrite(str(output_path), frame)
  return output_path`,

DEF_SHOW_PICTURE_IN_VITTASCIENCE:
`def show_picture_in_Vittascience(data):
  import numpy as np
  output_path = None
  if isinstance(data, str):
    output_dir = pathlib.Path(__file__).parent / "static/images"
    if '.' not in data:
      data += '.jpg'
    output_path = output_dir / data
  elif isinstance(data, np.ndarray):
    output_path = cv2_camera_savePicture(data)
  if output_path:
    print(f"IMAGE_CAPTURED_SUCCESSFULLY: {output_path}\\n")
  else:
    print("Impossible d'afficher l'image: " + str(data))`,

DEF_SHOW_VIDEO_IN_VITTASCIENCE:
`def show_video_in_Vittascience(filename):
  import numpy as np
  output_dir = pathlib.Path(__file__).parent / "static/videos"
  if '.' not in filename:
    filename += '.mp4'
  output_path = output_dir / filename
  if output_path:
    print(f"VIDEO_CAPTURED_SUCCESSFULLY: {output_path}\\n")
  else:
    print("Impossible d'afficher la vidéo: " + str(filename))`,

DEF_FOLDER_GETFILESFROM:
`def folder_getFilesFrom(path):
  return [f.name for f in path.iterdir() if f.is_file()]`,
  
SENSE_HAT_TEMPERATURE :
`def senseHat_getTemperature(unit='celsius'):
  temp = sense.get_temperature()
  if unit == 'fahrenheit':
    return temp * 9/5 + 32
  elif unit == 'kelvin':
    return temp + 273.15
  else:
    return temp`,

SENSE_HAT_TEMPERATURE_FROM :
`def senseHat_getTemperatureFrom(sensor, unit='celsius'):
  if sensor == 'humidity':
    temp = sense.get_temperature_from_humidity()
  elif sensor == 'pressure':
    temp = sense.get_temperature_from_pressure()
  if unit == 'fahrenheit':
    return temp * 9/5 + 32
  elif unit == 'kelvin':
    return temp + 273.15
  else:
    return temp`,

SENSE_HAT_PRESSURE :
`def senseHat_getPressure(unit='mbar'):
  pressure = sense.get_pressure()
  if unit == 'bar':
    return pressure / 1000
  elif unit == 'hPa':
    return pressure
  elif unit == 'mmHg':
    return pressure * 0.750062
  elif unit == 'psi':
    return pressure * 0.014503773773022
  else:
    return pressure`,

DEF_SGP30_MEASURE:
`def sgp30_measure(data_type):
  global _sgp30_last_time, _sgp30_last_values

  if data_type not in ("tvoc", "co2eq"):
    raise ValueError("data_type must be 'tvoc' or 'co2eq'")
  now = time.monotonic()

  if now - _sgp30_last_time >= 1.0 or _sgp30_last_values["co2eq"] is None:
    crc_status = sgp30.measure_air_quality()
    if crc_status:
      _sgp30_last_values["co2eq"] = sgp30.CO2eq
      _sgp30_last_values["tvoc"] = sgp30.TVOC
    _sgp30_last_time = now

  return _sgp30_last_values[data_type]`,

DEF_SCD30_MEASURE:
`def scd30_measure(data_type):
  global _scd30_last_time, _scd30_last_values

  if data_type not in ("co2", "temp", "hum"):
    raise ValueError("data_type must be 'co2', 'temp' or 'hum'")
  now = time.monotonic()

  if now - _scd30_last_time >= 2.0 or _scd30_last_values["co2"] is None:
    if scd.data_available:
      _scd30_last_values["co2"] = scd.CO2
      _scd30_last_values["temp"] = scd.temperature
      _scd30_last_values["hum"] = scd.relative_humidity
      _scd30_last_time = now

  return _scd30_last_values[data_type]`,

DEF_HM330X_MEASURE:
`def hm330x_measure(data_type):
  """
  Lit une mesure du capteur HM330X/HM3301.
  Retourne la valeur en µg/m³.
  """
  if data_type not in ("pm1", "pm2_5", "pm10", "pm1_atm", "pm2_5_atm", "pm10_atm"):
    raise ValueError("data_type must be one of: 'pm1', 'pm2_5', 'pm10', 'pm1_atm', 'pm2_5_atm', 'pm10_atm'")

  data = _hm330x.read_data()

  if not _hm330x.check_crc(data):
    raise RuntimeError("HM330X CRC error")

  values = {
    "pm1":      (data[4]  << 8) | data[5],
    "pm2_5":    (data[6]  << 8) | data[7],
    "pm10":     (data[8]  << 8) | data[9],
    "pm1_atm":  (data[10] << 8) | data[11],
    "pm2_5_atm":(data[12] << 8) | data[13],
    "pm10_atm": (data[14] << 8) | data[15]
  }
  return values[data_type]`,

DEF_BMP280_GET_ALTITUDE:
`def bmp280_get_altitude(sea_level_pressure_hpa = 1013.25):
  pressure_hpa = bmp280.get_pressure() / 100.0
  return 44330.0 * (1.0 - (pressure_hpa / sea_level_pressure_hpa) ** 0.1903)`,

DEF_DHT11_MEASURE:
`def dht11_measure(sensor, data_type, min_delay=2.0):
  global _dht11_last_time, _dht11_last_values

  if data_type not in ("temperature", "humidity"):
    raise ValueError("data_type must be 'temperature' or 'humidity'")

  now = time.monotonic()

  if now - _dht11_last_time >= min_delay or _dht11_last_values["temperature"] is None:
    hum, temp = sensor.read()

    if hum is None or temp is None:
      if _dht11_last_values[data_type] is None:
        raise RuntimeError("DHT11 read failed")
    else:
      _dht11_last_values["temperature"] = temp
      _dht11_last_values["humidity"] = hum
      _dht11_last_time = now

  return _dht11_last_values[data_type]`,

DEF_DHT22_MEASURE:
`def dht22_measure(sensor, data_type, min_delay=2.0):
  global _dht22_last_time, _dht22_last_values

  if data_type not in ("temperature", "humidity"):
    raise ValueError("data_type must be 'temperature' or 'humidity'")

  now = time.monotonic()

  if now - _dht22_last_time >= min_delay or _dht22_last_values["temperature"] is None:
    hum, temp = sensor.read()

    if hum is None or temp is None:
      if _dht22_last_values[data_type] is None:
        raise RuntimeError("DHT22 read failed")
    else:
      _dht22_last_values["temperature"] = temp
      _dht22_last_values["humidity"] = hum
      _dht22_last_time = now

  return _dht22_last_values[data_type]`,

DEF_COLORSENSORV2_MEASURE:
`def colorSensorV2_measure(color):
  global _colorSensorV2_last_time, _colorSensorV2_last_raw

  if color not in ("red", "green", "blue", "clear"):
    raise ValueError("color must be 'red', 'green', 'blue' or 'clear'")

  if time.monotonic() - _colorSensorV2_last_time >= 0.1 or _colorSensorV2_last_raw is None:
    _colorSensorV2_last_raw = colorSensorV2.raw
    _colorSensorV2_last_time = time.monotonic()

  index = {
    "red": 0,
    "green": 1,
    "blue": 2,
    "clear": 3
  }
  return _last_raw[index[color]]`,

// Grove Ultrasonic sensor _ get data
DEF_HCSR04_ULTRASONIC:
`def hcsr04_getUltrasonicData(trig, echo, data='distance', timeout_us=30000):
  GPIO.output(trig, GPIO.LOW)
  time.sleep(0.000002)
  GPIO.output(trig, GPIO.HIGH)
  time.sleep(0.000010)
  GPIO.output(trig, GPIO.LOW)
  duration = time_pulse_us(echo, 1, timeout_us)/1e6 # t_echo in seconds
  if duration > 0:
    if data == 'distance':
      #sound speed, round-trip/2, get in cm
      return 343 * duration/2 * 100
    elif data == 'duration':
      return duration
    else:
      raise ValueError("Data option '" + data + "' != valid")
  else:
    return -1`,

/****** ACTUATORS CATEGORY ******/

// Servomoteur _ set angle
DEF_SERVO_SET_ANGLE:
`def setServoAngle(pwm_pin, angle):
  if (angle >= 0 and angle <= 180):
    pwm_pin.ChangeDutyCycle(int(0.025*${PWM_MAX_DUTY} + (angle*0.1*${PWM_MAX_DUTY})/180))
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// Continuous servomoteur _ set speed
DEF_SERVO_SET_SPEED:
`def setServoSpeed(pwm, direction, speed):
  if speed >= 0 and speed < 5:
    pwm.ChangeDutyCycle(0)
  elif (speed >= 5 and speed <= 100):
    GAP = -10
    if direction == 1 or direction == -1:
      angle = 90*(1 + direction*speed/100) - GAP
      pw_percent = 0.025*${PWM_MAX_DUTY} + (angle + 90) * 0.1*${PWM_MAX_DUTY} / 180
      pwm.ChangeDutyCycle(pw_percent)
    else:
      raise ValueError("continuous servomotor has no direction: '" + str(direction) + "'")
  else:
    raise ValueError("continuous servomotor speed is out of range: '" + str(speed) + "'")`,

// Buzzer module _ play music
DEF_BUZZER_PITCH:
`def pitch(pwm, noteFrequency, noteDuration, silence_ms = 10):
  pwm.ChangeFrequency(noteFrequency)
  pwm.ChangeDutyCycle(50)
  if noteDuration:
    time.sleep(noteDuration / 1000)
    pwm.ChangeDutyCycle(0)
  time.sleep(silence_ms / 1000)`,

// Buzzer module _ play notes
DEF_BUZZER_PLAY_NOTES:
`def buzzer_playNotes(pwm, notes, bpm = 120, ticks = 4):
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
    pwm.ChangeDutyCycle(0)
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
    pitch(pwm, n['f'], timeout*n['ticks'])`,

// Buzzer module _ play pirates of carribean
DEF_BUZZER_CARRIBEAN_PIRATES:
`def BuzzerCarribeanPirates(pwm):
  NOTES_1 = [330, 392, 440, 440, 0, 440, 494, 523, 523, 0, 523, 587, 494, 494, 0, 440, 392, 440, 0]
  DURATIONS_1 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 375, 125]
  NOTES_2 = [330, 392, 440, 440, 0, 440, 523, 587, 587, 0, 587, 659, 698, 698, 0, 659, 587, 659, 440, 0, 440, 494, 523, 523, 0, 587, 659, 440, 0, 440, 523, 494, 494, 0, 523, 440, 494, 0]
  DURATIONS_2 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 125, 250, 125, 125, 125, 250, 125, 125, 250, 125, 250, 125, 125, 125, 250, 125, 125, 125, 125, 375, 375]
  for j in range(2):
    for i in range(len(NOTES_1)):
      pitch(pwm, NOTES_1[i], DURATIONS_1[i])
  for k in range(len(NOTES_2)):
    pitch(pwm, NOTES_2[k], DURATIONS_2[k])`,

// Buzzer module _ play gamme
DEF_BUZZER_GAMME:
`def BuzzerGamme(pwm): 
  NOTES = [261.63, 293.66, 329.54, 349.23, 392, 440, 493.88, 523.25] 
  for i in range(len(NOTES)): 
    pitch(pwm, NOTES[i], 250, 50)`,

// Buzzer module _ play Star Wars
DEF_BUZZER_STAR_WARS:
`def BuzzerStarWars(pwm): 
  NOTES = [293.66, 293.66, 293.66, 392.0, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 554.37, 454] 
  DURATIONS = [180, 180, 180, 800, 800, 180, 180, 180, 800, 400, 180, 180, 180, 800, 400, 180, 180, 180, 1000] 
  SILENCE_DELAYS = [40, 40, 40, 100, 100, 40, 40, 40, 100, 50, 40, 40, 40, 100, 50, 40, 40, 40, 100] 
  for i in range(len(NOTES)): 
    pitch(pwm, NOTES[i], DURATIONS[i], SILENCE_DELAYS[i])`,

// Buzzer module _ play R2D2
DEF_BUZZER_R2D2:
`def BuzzerR2D2(pwm): 
  R2D2_NOTES = [3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01, 3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01] 
  for i in range(len(R2D2_NOTES)): 
    pitch(pwm, R2D2_NOTES[i], 80, 20)`,

/****** ROBOTS CATEGORY ******/

DEF_G1TANK_SET_LED_RED:
`def g1tank_led_setRed(value):
  pwm_gpio22.ChangeDutyCycle(value)`,

DEF_G1TANK_SET_LED_GREEN:
`def g1tank_led_setGreen(value):
  pwm_gpio27.ChangeDutyCycle(value)`,

DEF_G1TANK_SET_LED_BLUE:
`def g1tank_led_setBlue(value):
  pwm_gpio24.ChangeDutyCycle(value)`,

DEF_G1TANK_SET_LED_RGB:
`def g1tank_setLEDRGB(R, G, B):
  g1tank_led_setRed(int(R/255*100))
  g1tank_led_setGreen(int(G/255*100))
  g1tank_led_setBlue(int(B/255*100))`,

DEF_G1TANK_WAIT_KEY_PRESSING:
`def g1tank_wait_KEY_press():
  while GPIO.input(gpio8):
    pass
  while not GPIO.input(gpio8):
    time.sleep(0.01)
  if not GPIO.input(gpio8):
    time.sleep(0.01)
    while not GPIO.input(gpio8):
      pass`,

  DEF_G1TANK_MOVE:
`def g1tank_move(speed, duration_ms = 0, wait = True):
  g1tank_control_motorLeft(speed)
  g1tank_control_motorRight(speed)
  time.sleep(duration_ms/1000)`,

  DEF_G1TANK_STOP:
`def g1tank_stop():
  g1tank_control_motorLeft(0)
  g1tank_control_motorRight(0)`,

  DEF_G1TANK_CONTROL_MOTOR_LEFT:
`def g1tank_control_motorLeft(speed):
  GPIO.output(gpio20, GPIO.HIGH if speed > 0 else GPIO.LOW) #IN1
  GPIO.output(gpio21, GPIO.LOW if speed >= 0 else GPIO.HIGH) #IN2
  pwm_gpio16.ChangeDutyCycle(max(0, min(abs(speed), 100))) #ENA`,

  DEF_G1TANK_CONTROL_MOTOR_RIGHT:
`def g1tank_control_motorRight(speed):
  GPIO.output(gpio19, GPIO.HIGH if speed > 0 else GPIO.LOW) #IN3
  GPIO.output(gpio26, GPIO.LOW if speed >= 0 else GPIO.HIGH) #IN4
  pwm_gpio13.ChangeDutyCycle(max(0, min(abs(speed), 100))) #ENB`,

  DEF_G1TANK_TURN_LEFT:
`def g1tank_turn_left(speed, spin, duration_ms = 0, wait = True):
  g1tank_control_motorLeft(-speed if spin else 0)
  g1tank_control_motorRight(speed)
  time.sleep(duration_ms/1000)`,

  DEF_G1TANK_TURN_RIGHT:
`def g1tank_turn_right(speed, spin, duration_ms = 0, wait = True):
  g1tank_control_motorLeft(speed)
  g1tank_control_motorRight(-speed if spin else 0)
  time.sleep(duration_ms/1000)`,

};
