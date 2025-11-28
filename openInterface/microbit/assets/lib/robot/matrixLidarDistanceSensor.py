from microbit import i2c, running_time
import time
class DFRobot_matrixLidarDistanceSensor:
  CMD_SETMODE = 1
  CMD_ALLData = 2
  CMD_FIXED_POINT = 3
  CMD_LINE = 4
  CMD_LIST = 5
  CMD_AVOID_OBSTACLE = 6
  CMD_CONFIG_AVOID = 7
  CMD_OBSTACLE_DISTANCE = 8
  CMD_END = CMD_OBSTACLE_DISTANCE
  DEBUG_TIMEOUT_MS = 8000
  IIC_MAX_TRANSFER = 32
  I2C_ACHE_MAX_LEN = 32
  MATRIX_4X4 = 4
  MATRIX_8X8 = 8
  ERR_CODE_NONE = 0x00
  ERR_CODE_CMD_INVAILED = 0x01
  ERR_CODE_RES_PKT = 0x02
  ERR_CODE_M_NO_SPACE = 0x03
  ERR_CODE_RES_TIMEOUT = 0x04
  ERR_CODE_CMD_PKT = 0x05
  ERR_CODE_SLAVE_BREAK = 0x06
  ERR_CODE_ARGS = 0x07
  ERR_CODE_SKU = 0x08
  ERR_CODE_S_NO_SPACE = 0x09
  ERR_CODE_I2C_ADRESS = 0x0A
  STATUS_SUCCESS = 0x53   
  STATUS_FAILED = 0x63
  ELEFT = 0
  EMIDDLE = 1
  ERIGHT = 2
  TO_LEFT = 1
  TO_RIGHT = 2
  FORWARD = 3
  def __init__(self, addr):
    self._addr = addr # Available addresses: 0x30, 0x31, 0x32, 0x33
    self._dir = 0
    self._emergency_flag = 0
    self._left = 0
    self._middle = 0
    self._right = 0
    self._list = list()
    self._matrix = self.MATRIX_8X8
    self._obstacle_interval = None
  def begin(self):
    print("[LiDAR INFOS] Init LiDAR sensor ... (~3s)")
    time.sleep(3)
    self._t0 = { 'CMD_AVOID_OBSTACLE': time.ticks_ms(), 'CMD_OBSTACLE_DISTANCE': time.ticks_ms() }
    return 0
  def get_all_data_config(self, matrix):
    self._send_command(self.CMD_SETMODE, [0, 0, 0, matrix])
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_SETMODE)
    if self._check_valid_response(recv_pkt):
      self._matrix = matrix
      time.sleep(5)
      return 0
    return 1
  def config_avoidance(self, wall):
    self._send_command(self.CMD_CONFIG_AVOID, [(wall*10 >> 8) & 0xff, wall*10 & 0xff])
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_CONFIG_AVOID)
    if self._check_valid_response(recv_pkt):
      time.sleep(5)
      return 0
    return 1
  def get_all_data(self):
    self._send_command(self.CMD_ALLData)
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_ALLData)
    if self._check_valid_response(recv_pkt):
      if self._get_res_length(recv_pkt):
        self._list = recv_pkt[5:]
        return self._list
    return self._list
  def get_all_distances(self):
    self.get_all_data()
    distances = [self._list[i] | (self._list[i+1] << 8) for i in range(0, len(self._list), 2)]
    return [distances[r*self._matrix:(r+1)*self._matrix] for r in range(self._matrix)]
  def get_fixed_point_data(self, x, y):
    self._send_command(self.CMD_FIXED_POINT, [x, y])
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_FIXED_POINT)
    if self._check_valid_response(recv_pkt):
      if self._get_res_length(recv_pkt): return recv_pkt[5 + 1] << 8 | recv_pkt[5]
      return -1
    return -1
  def _switch_to_avoidance_mode(self):
    if self._matrix is not self.MATRIX_4X4:
      print("[LiDAR INFOS] Switching in obstacle avoidance mode as the matrix 4x4... (~5s)")
      while self.get_all_data_config(self.MATRIX_4X4) is not 0:
        print("[LiDAR INFOS] Matix configuration failed!")
        time.sleep(1)
  def request_obstacle_sensor_data(self):
    self._switch_to_avoidance_mode()
    self._send_command(self.CMD_AVOID_OBSTACLE)
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_AVOID_OBSTACLE)
    if self._check_valid_response(recv_pkt):
      if self._get_res_length(recv_pkt):
        self._dir = recv_pkt[5]
        self._emergency_flag = recv_pkt[5 + 1]
      return 0
    return 1
  def requestCmd(self, cmd, request):
    dt = time.ticks_diff(time.ticks_ms(), self._t0[cmd])
    if dt > 200:
      while request():
        print("[LiDAR INFOS] Error when request " + cmd)
        time.sleep(1)
      self._t0[cmd] = time.ticks_ms()
  def get_dir_to_avoid_obstacle(self):
    self.requestCmd('CMD_AVOID_OBSTACLE', self.request_obstacle_sensor_data)
    return self._dir
  def get_emergency_flag(self):
    self.requestCmd('CMD_AVOID_OBSTACLE', self.request_obstacle_sensor_data)
    return self._emergency_flag
  def request_obstacle_distance(self):
    self._switch_to_avoidance_mode()
    self._send_command(self.CMD_OBSTACLE_DISTANCE)
    time.sleep(0.1)
    recv_pkt = self._recv_packet(self.CMD_OBSTACLE_DISTANCE)
    if self._check_valid_response(recv_pkt):
      if self._get_res_length(recv_pkt):
        self._left = (recv_pkt[5] | recv_pkt[5 + 1] << 8) / 10.0
        self._middle = (recv_pkt[5 + 2] | recv_pkt[5 + 3] << 8) / 10.0
        self._right = (recv_pkt[5 + 4] | recv_pkt[5 + 5] << 8) / 10.0
      return 0
    return 1
  def get_obstacle_distance(self, dir = None):
    self.requestCmd('CMD_OBSTACLE_DISTANCE', self.request_obstacle_distance)
    ret = 0
    if dir == self.ELEFT: ret = self._left
    elif dir == self.ERIGHT: ret = self._right
    else: ret = self._middle
    return ret
  def _send_command(self, cmd, data = None):
    length = 0 if data is None else len(data)
    header = [0x55, ((length + 1) >> 8) & 0xFF, (length+1) & 0xFF, cmd]
    pkt = header
    if data is not None: pkt += data
    i2c.write(self._addr, bytes(pkt))
  def _recv_packet(self, cmd):
    rslt = [0]
    t = running_time()
    while running_time() - t < self.DEBUG_TIMEOUT_MS:
      status = i2c.read(self._addr, 1)
      if not status: continue
      status = status[0]
      if status != 0xff:
        if status in [self.STATUS_SUCCESS, self.STATUS_FAILED]:
          command = i2c.read(self._addr, 1)
          if not command: continue
          command = command[0]
          if command != cmd:
            rslt[0] = self.ERR_CODE_RES_PKT
            return rslt
          lenL = i2c.read(self._addr, 2)
          if not lenL or len(lenL) < 2:
            rslt[0] = self.ERR_CODE_RES_PKT
            print("Length read failed or too short.")  
            return rslt
          length = (lenL[1] << 2) | lenL[0]  
          if length > 128: return rslt 
          rslt[0] = self.ERR_CODE_NONE
          rslt += [status, command, lenL[0], lenL[1]]
          if length:
            data = i2c.read(self._addr, length)
            rslt += data
          return rslt
      time.sleep(0.07)
    return [self.ERR_CODE_RES_TIMEOUT]
  def _check_valid_response(self, pkt):
    return (len(pkt) >= 5) and (pkt[0] == self.ERR_CODE_NONE and pkt[1] == self.STATUS_SUCCESS)
  def _get_res_length(self, pkt):
    return pkt[4] << 8 | pkt[3]