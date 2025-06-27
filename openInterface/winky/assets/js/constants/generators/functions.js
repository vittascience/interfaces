const FUNCTIONS_WINKY = {
DEF_WINKY_SET_EARS_PRESET: `
def setEarsPreset(preset="REAR"):
  if (preset == 'REAR'):
    winky.set_ear_left_position(0)
    winky.set_ear_right_position(0)
  elif (preset == 'DOWN'):
    winky.set_ear_left_position(-90)
    winky.set_ear_right_position(90)
  elif (preset == 'STANDING'):
    winky.set_ear_left_position(90)
    winky.set_ear_right_position(-90)`
};