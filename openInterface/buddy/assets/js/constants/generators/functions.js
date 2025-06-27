// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code

const FUNCTIONS_BUDDY = {
  DEF_AREA_DETECTION:
`def area_detection(detections):
  maxLeft = 0
  maxRight = 0
  for i in range(0,len(detections['left'])):
    if(maxLeft < detections['left'][i]):
      maxLeft = detections['left'][i]
    if(maxRight < detections['right'][i]):
      maxRight = detections['right'][i]
  if ((maxLeft == 0.5) & (maxRight == 0.5)):
    return "CENTER"
  elif (maxLeft > maxRight):
    return "LEFT"
  else:
    return "RIGHT"`,

  DEF_VITTAIA_TEXT_GET_CLASS: `
def get_class(data):
  max_label = None
  max_prob = 0
  
  for label, prob in data:
    if prob > max_prob:
      max_label = label
      max_prob = prob
  return max_label`,

  ON_US_DETECT_OBSTACLE: `
def on_us_detect_obstacle(state, distance, side = "Left"):
  buddy.USSensors()
  if side == "Left":
    buddy.LeftUS()
  elif side == "Right":
    buddy.RightUS()
  if state:
    return buddy.getDistance() <= distance
  else:
    return buddy.getDistance() >= distance`,
    ON_TF_DETECT_OBSTACLE: `
def on_tf_detect_obstacle(state, distance, side = "FrontMiddle"):
  buddy.TofSensors()
  if side == "FrontMiddle":
    buddy.FrontMiddle()
  elif side == "FrontLeft":
    buddy.FrontLeft()
  elif side == "FrontRight":
    buddy.FrontRight()
  elif side == "Back":
    buddy.Back()
  if state:
    return buddy.getDistance() <= distance
  else:
    return buddy.getDistance() >= distance`,
    GET_DISTANCE_US: `
def get_distance_us(side = "Left"):
  buddy.USSensors()
  if side == "Left":
    return buddy.LeftUS().getDistance()
  elif side == "Right":
    return buddy.RightUS().getDistance()`,
    GET_DISTANCE_TF: `
def get_distance_tf(side = "FrontMiddle"):
  buddy.TofSensors()
  if side == "FrontMiddle":
    return buddy.FrontMiddle().getDistance()
  elif side == "FrontLeft":
    return buddy.FrontLeft().getDistance()
  elif side == "FrontRight":
    return buddy.FrontRight().getDistance()
  elif side == "Back":
    return buddy.Back().getDistance()`,
};