// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code
const FUNCTIONS_ELIOBOT = {
DEF_MOVE_ROBOT:
`def move_robot(direction):
  if (direction == 'forward'):
    motorAIN1.value = False
    motorAIN2.value = True
    motorBIN1.value = False
    motorBIN2.value = True
  elif (direction == 'backward'):
    motorAIN1.value = True
    motorAIN2.value = False
    motorBIN1.value = True
    motorBIN2.value = False
  elif (direction == 'right'):
    motorAIN1.value = True
    motorAIN2.value = False
    motorBIN1.value = False
    motorBIN2.value = True
  elif (direction == 'left'):
    motorAIN1.value = False
    motorAIN2.value = True
    motorBIN1.value = True
    motorBIN2.value = False`,

DEF_STOP_ROBOT: 
`def stop_robot():
  motorAIN1.value = True
  motorAIN2.value = True
  motorBIN1.value = True
  motorBIN2.value = True`,
};