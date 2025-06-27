// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code

const FUNCTIONS_TI_83 = {

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

DEF_TI_MICROBIT_SHOW_CLOCK: 
`def showClock(clock):
  i = Image
  CLOCKS = [i.CLOCK1, i.CLOCK2, i.CLOCK3, i.CLOCK4, i.CLOCK5, i.CLOCK6, i.CLOCK7, i.CLOCK8, i.CLOCK9, i.CLOCK10, i.CLOCK11, i.CLOCK12]
  if (clock > 12): clock -= 12
  for j in range(12):
    if clock < j+1:
      display.show(CLOCKS[j-1])
      break`,
      
// Buzzer module _ play notes
DEF_BUZZER_PLAY_NOTES:
`def buzzer_playNotes (callback, notes, bpm = 120, ticks = 4):
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
    timeout = 60 / bpm / ticks
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
    print(n)
    callback(n['f'], timeout*n['ticks'])`,

// Buzzer module _ play carribean pirates
DEF_BUZZER_CARRIBEAN_PIRATES:
`def BuzzerCarribeanPirates(callback, time_factor=1):
  NOTES_1 = [330, 392, 440, 440, 0, 440, 494, 523, 523, 0, 523, 587, 494, 494, 0, 440, 392, 440, 0]
  DURATIONS_1 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 375, 125]
  NOTES_2 = [330, 392, 440, 440, 0, 440, 523, 587, 587, 0, 587, 659, 698, 698, 0, 659, 587, 659, 440, 0, 440, 494, 523, 523, 0, 587, 659, 440, 0, 440, 523, 494, 494, 0, 523, 440, 494, 0]
  DURATIONS_2 = [125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 250, 125, 125, 125, 125, 125, 250, 125, 125, 125, 250, 125, 125, 250, 125, 250, 125, 125, 125, 250, 125, 125, 125, 125, 375, 375]
  for j in range(2):
    for i in range(len(NOTES_1)):
      callback(NOTES_1[i], DURATIONS_1[i]*time_factor)
  for k in range(len(NOTES_2)):
    callback(NOTES_2[k], DURATIONS_2[k]*time_factor)`,

// Buzzer module _ play gamme
DEF_BUZZER_GAMME:
`def BuzzerGamme(callback, time_factor=1):
  NOTES = [261.63, 293.66, 329.54, 349.23, 392, 440, 493.88, 523.25]
  for i in range(len(NOTES)):
    callback(NOTES[i], 250*time_factor)`,

// Buzzer module _ play Star Wars
DEF_BUZZER_STAR_WARS:
`def BuzzerStarWars(callback, time_factor=1): 
  NOTES = [293.66, 293.66, 293.66, 392.0, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 454, 932.32, 622.25, 554.37, 523.25, 554.37, 454] 
  DURATIONS = [180, 180, 180, 800, 800, 180, 180, 180, 800, 400, 180, 180, 180, 800, 400, 180, 180, 180, 1000] 
  SILENCE_DELAYS = [40, 40, 40, 100, 100, 40, 40, 40, 100, 50, 40, 40, 40, 100, 50, 40, 40, 40, 100] 
  for i in range(len(NOTES)): 
    callback(NOTES[i], DURATIONS[i]*time_factor)
    callback(0, SILENCE_DELAYS[i]*time_factor)`,

// Buzzer module _ play R2D2
DEF_BUZZER_R2D2:
`def BuzzerR2D2(callback, time_factor=1): 
  R2D2_NOTES = [3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01, 3520, 3135.96, 2637.02, 2093, 2349.32, 3951.07, 2793.83, 4186.01] 
  for i in range(len(R2D2_NOTES)): 
    callback(R2D2_NOTES[i], 100*time_factor)`,

// TI Hub Servomoteur _ set angle
DEF_HUB_SERVO_SET_ANGLE:
`def servo_setAngle(pin, angle):
  if (angle >= -90 and angle <= 90):
    pin.set_position(angle)
  else:
    raise ValueError("Servomotor angle have to be set between -90 and 90")`,

DEF_NEOPIXEL_SHOW_ALL_LED:
`def neopixel_showAllLed(neoPx, ledCount, R, G, B):
  for i in range(ledCount): 
    neoPx[i] = (R, G, B) 
  neoPx.show()`,

DEF_TI_SHT_READDATA:
`def grove_read_sht_sensor(data = 't'):
  t, h = grove.read_sht()
  if (data == 't'):
    return t
  elif (data == 'h'):
    return h
  else:
    return None`,

DEF_TI_BME280_READDATA:
`def grove_read_bme280_sensor(data = 't'):
  t, p, h = grove.read_bme280()
  if (data == 't'):
    return t
  elif (data == 'p'):
    return p
  elif (data == 'h'):
    return h
  else:
    return None`,

// TI Servomoteur _ set angle
DEF_TI_SERVO_SET_ANGLE:
`def ti_set_servo(pin, angle):
  if (angle >= 0 and angle <= 180):
    grove.set_servo(pin, angle)
  else:
    raise ValueError("Servomotor angle have to be set between 0 and 180")`,

// TI micro:bit _ neopixel rainbow
DEF_TI_NEOPIXEL_RAINBOW:
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

}
