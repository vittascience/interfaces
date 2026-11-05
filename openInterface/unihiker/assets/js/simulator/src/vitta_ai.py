# Simulator of the UNIHIKER M10: library vitta_ai (image model of the Vittascience AI tool, USB camera of the board)
# without camera nor model in the simulator: nothing is predicted

UNCERTAIN = 'uncertain'

class ImageModel:
  def __init__(self, *args, **kwargs):
    self.class_predicted = ''
    self.score = 0

  def predict(self, image):
    return ''

  def predictions(self):
    return []

  def detect_class(self, threshold=0.6):
    return ''

  def confidence(self, label=None):
    return 0

class Camera:
  def __init__(self, *args, **kwargs):
    pass

def _nothing(*args, **kwargs):
  return None

rotate_camera = use_camera = camera_image = last_camera_image = image_from_url = _nothing

def list_cameras():
  return []
