import machine, gc, ujson, utime

CMD_RECEIVE_SIMPLE_DATA = 0
CMD_SEND_SIMPLE_DATA = 1
CMD_SEND_WEB_PAGE = 2
CMD_SEND_VARIABLES = 3

class SERVER:
  def __init__(self):
    self.AP = None
    self.station = None
    self.socketServer = None
    self.client = None
    self.client_ip = None
    self.client_data = None
    self.with_vars = False
    self.locked = False
    self.html_page = ""
    self.web_data_DB = {}
    
  def start(self, sta=None, ap=None, ip='', port=80):
    self.AP = ap
    self.station = sta
    if self.socketServer is None or (self.station is None and self.AP is not None):
      import socket
      self.socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
      try:
        self.socketServer.bind((ip, port))
        self.socketServer.listen(50)
        wlan = self.station
        if self.AP is not None:
          wlan = self.AP
        if wlan is None:
          raise ValueError("Station not connected or Access Point not started.")
        ip, mask, dns, gateway = wlan.ifconfig()
        print('Server started.')
        http = 'https' if port == 443 else 'http'
        access = 'Access to server: ' + http + '://' + ip
        try:
          access += (' or ' + http + '://' + wlan.config('dhcp_hostname')) if self.station is not None else ''
        except: pass
        print(access)
      except OSError as e:
        print("Failed to start server. Error:", str(e))
        import os
        if 'Galaxia' in os.uname()[4]:
          machine.soft_reset()
        elif 'Pico' in os.uname():
          self.closeClient(True)
          gc.collect()
          utime.sleep(2)
          self.start(sta=sta, ap=ap, ip=ip, port=80)
        else:
          machine.reset()
    
  def waitingClient(self):
    if self.client is None:
      if gc.mem_free() < 102000:
        gc.collect()
      print("\nWaiting new client...")
      self.client, adresse = self.socketServer.accept()
      self.client.settimeout(4.0)
      print("Connection established with the client: ", adresse)
      self.client_ip, port = adresse
      print("Receipt of the request...")
      self.client_data = self.client.recv(1024).decode()     #requête du client
      #print("Client request: ", self.client_data)
      self.client.settimeout(None)
      return self.client_ip, self.client_data
    else:
      return self.client_ip, self.client_data

  def sendHTTPSocket(self, type, content, data = None):
    self.client.send('HTTP/1.1 200 OK\n')
    self.client.send('Content-Type: ' + content + '/' + type + '\n')
    self.client.send('Connection: close\n\n')
    if type is 'html':
      self.client.sendall(data)
    else:
      self.client.send(data)
    
  def manageSocket(self, cmd, data = None):
    try:
      self.waitingClient()
      if self.client_data is not None:
        if 'GET / HTTP/' in self.client_data or 'GET /favicon.ico HTTP/' in self.client_data:
          if cmd is CMD_SEND_WEB_PAGE and not self.locked:
            self.locked = True
            self.addCodeIntoHtml('vitta_script.js')
            self.addCodeIntoHtml('vitta_style.css')
            if self.with_vars:
              f = open('client.js', 'w')
              f.write("requestVariablesFromServer('" + self.client_ip + "')")
              f.close()
              self.addCodeIntoHtml('client.js')
            self.sendHTTPSocket('html', 'text', self.html_page)
          elif cmd is CMD_RECEIVE_SIMPLE_DATA:
            pass
          elif cmd is CMD_SEND_SIMPLE_DATA and not self.locked and data:
            self.locked = True
            self.client.send(data)
        elif ('GET /requestVariables&' in self.client_data and cmd is CMD_SEND_VARIABLES) and not self.locked:
          strRequest = self.client_data.split(' HTTP')[0]
          requestIp = strRequest.split('&ip=')[1]
          if self.client_ip == requestIp:
            self.locked = True
            self.sendHTTPSocket('json', 'application', ujson.dumps(data))
        elif not 'GET / HTTP/' in self.client_data and not 'GET /favicon.ico HTTP/' in self.client_data and not 'GET /requestVariables&' in self.client_data:
          if not cmd is CMD_SEND_WEB_PAGE and not cmd is CMD_SEND_VARIABLES and not self.locked:
            if cmd is CMD_SEND_SIMPLE_DATA:
              if '{' in self.client_data and '}' in self.client_data and ':' in self.client_data:
                request = ujson.loads(self.client_data)
                if request['cmd'] == 'receive':
                  self.client_data = None
                  if data:
                    self.locked = True
                    self.client.send(data)
                elif request['cmd'] == 'send':
                  self.client_data = request['data']
            else:
              if '{' in self.client_data and '}' in self.client_data and ':' in self.client_data:
                request = ujson.loads(self.client_data)
                if request['cmd'] == 'receive':
                  self.client_data = None
                elif request['cmd'] == 'send':
                  self.client_data = request['data']
        else:
          pass
      else:
        if cmd is CMD_SEND_SIMPLE_DATA and not self.locked and data:
          self.locked = True
          self.client.send(data)
    except OSError as e:
      print(e)
      print('Try to connect the server using fixed IP.\n')
      self.closeClient(True)

  def getClientData(self, parameter = False):
    self.manageSocket(CMD_RECEIVE_SIMPLE_DATA)
    try:
      if parameter and self.client_data is not None:
        return self.client_data.split('GET /')[1].split(' HTTP/1.1')[0]
    except:
      pass
    return self.client_data

  def getClientIp(self):
    if self.client_ip is None:
      self.manageSocket(CMD_RECEIVE_SIMPLE_DATA)
    return self.client_ip

  def sendDataToClient(self, data):
    self.manageSocket(CMD_SEND_SIMPLE_DATA, data)
      
  def closeClient(self, force = False):
    if self.client is not None and (self.locked or force):
      self.client.close()
      self.client = None
      self.locked = False
      self.client_ip = None
      print("Closing client connection.")

  def sendHtmlPage(self, with_vars):
    self.with_vars = with_vars
    self.manageSocket(CMD_SEND_WEB_PAGE)

  def addCodeIntoHtml(self, fileName):
    try:
      f = open(fileName, 'r')
      script_code = f.read()
      if '.js' in fileName:
        if '<script>' in self.html_page:
          self.html_page = self.html_page.replace('</script>', script_code + '\n</script>')
        else:
          self.html_page = self.html_page.replace('</body>', '<script>\n' + script_code + '\n</script>\n</body>')
      elif '.css' in fileName:
        if '<style>' in self.html_page:
          self.html_page = self.html_page.replace('</style>', script_code + '\n</style>')
        else:
          self.html_page = self.html_page.replace('</head>', '<style>\n' + script_code + '\n</style>\n</head>')
      else:
        raise ValueError("File named '" + fileName + "' can't be added into HTML web page.")
      f.close()
    except OSError:
      raise OSError('No such file or directory ' + fileName)

  def updateDataWithRequest(self):
    if self.client_data is not None:
      requestVars = self.client_data.split(' HTTP')
      if requestVars[0] and '=' in requestVars[0] and not '/requestVariables&ip' in requestVars[0]:
        requestVars = requestVars[0].split('GET /')[1].split('=')
        try:
          self.web_data_DB[self.client_ip][requestVars[0]] = requestVars[1]
        except KeyError:pass

  def getValueById(self, id, default=0, isBoolean=False):
    try:
      cl = self.web_data_DB[self.client_ip]
      try:
        value = self.web_data_DB[self.client_ip][id]
      except KeyError:
        self.web_data_DB[self.client_ip][id] = str(default)
    except KeyError:
      self.web_data_DB[self.client_ip] = {id: str(default)}
    if isBoolean:
      self.web_data_DB[self.client_ip][id] = "0"
    self.updateDataWithRequest()
    return self.web_data_DB[self.client_ip][id]

  def updateSwitchState(self, id):
    return "checked" if int(self.getValueById(id)) else ""

  def sendVariables(self, vars):
    self.manageSocket(CMD_SEND_VARIABLES, vars)
