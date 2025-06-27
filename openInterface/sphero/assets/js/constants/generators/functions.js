// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code

const FUNCTIONS_SPHERO = {
DEF_BLINK_LED: `
def blink_led(rgb, time, counter):
  r, g, b = rgb
  for count in range(counter):
    sm.setLEDColor(r, g, b)
    utime.sleep(time)
    sm.setLEDColor(0, 0, 0)
    utime.sleep(time)`,

DEF_FADE_IN: `
def fade_in(start_color, end_color, duration, fps=30):
  steps = int(duration * fps)
  start_r, start_g, start_b = start_color
  end_r, end_g, end_b = end_color

  for step in range(steps + 1):
    t = step / steps
    r = int(start_r + (end_r - start_r) * t)
    g = int(start_g + (end_g - start_g) * t)
    b = int(start_b + (end_b - start_b) * t)
    sm.setLEDColor(r, g, b)
    utime.sleep(1 / fps)
`,
DEF_SM_MOVE: `
def sm_move(speed, direction):
  if direction == 'forward':
    sm.raw_motor(speed, 0x01, speed, 0x01)
  elif direction == 'backward':
    sm.raw_motor(speed, 0x02, speed, 0x02)
`,
DEF_SM_MOVE_STEP: `
def sm_move_step(speed, direction, steps):
  if direction == 'forward':
    sm.raw_motor(speed, 0x01, speed, 0x01)
    utime.sleep(steps)
    sm.raw_motor(0, None, 0, None)
  elif direction == 'backward':
    sm.raw_motor(speed, 0x02, speed, 0x02)
    utime.sleep(steps)
    sm.raw_motor(0, None, 0, None)
`,
DEF_SM_ROTATE: `
def sm_rotate(speed, direction):
  if direction == 'right':
    sm.raw_motor(speed, 0x01, speed, 0x02)
  elif direction == 'left':
    sm.raw_motor(speed, 0x02, speed, 0x01)
`,
DEF_SM_ROTATE_STEP: `
def sm_rotate_step(speed, direction, steps):
  if direction == 'right':
    sm.raw_motor(speed, 0x01, speed, 0x02)
    utime.sleep(steps)
    sm.raw_motor(0, None, 0, None)
  elif direction == 'left':
    sm.raw_motor(speed, 0x02, speed, 0x01)
    utime.sleep(steps)
    sm.raw_motor(0, None, 0, None)
`,
DEF_SM_TURN: `
def sm_turn(speed, motor, direction):
  if motor == 'left':
    if direction == 'left':
      sm.raw_motor(speed, 0x02, None, None)
    elif direction == 'right':
      sm.raw_motor(speed, 0x01, None, None)
  elif motor == 'right':
    if direction == 'left':
      sm.raw_motor(None, None, speed, 0x02)
    elif direction == 'right':
      sm.raw_motor(None, None, speed, 0x01)
`,

};