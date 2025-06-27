from microbit import *
import utime

# translation \n and \r for SerialApi upload in Vittascience old methode to avoid suppressed characters during transmission but necessary for wifi esp8266 uart communication
sep = '0-x-22'
hex_str = sep.replace('-', '')  
hex_int = int(hex_str, 16)
SEP = str(chr(hex_int))
rc = '0-x-0D'
rc_hex = rc.replace('-', '')
rc_int = int(rc_hex, 16)
RC = str(chr(rc_int)) 
rl= '0-x-0A'
rl_hex = rl.replace('-', '')
rl_int = int(rl_hex, 16)
RL = str(chr(rl_int))
END_OF_LINE= RC+RL

IP = '192.168.10.1'
IP_CLIENT='192.168.10.2'

class Tello:
  def __init__(self, TX_pin, RX_pin, SSID):
    self.TX_pin = TX_pin
    self.RX_pin = RX_pin
    self.connected= False
    self.SSID = SSID

  def __tello_connect(self, ssid, pw, TX_pin, RX_pin):
    try:
      uart.init(baudrate=115200, bits=8, parity=None,stop=1, tx=TX_pin, rx=RX_pin)
      uart.write('AT+CWJAP=' + SEP + ssid + SEP + "," + SEP + pw + SEP + END_OF_LINE)
      response = ''
      start_time = utime.ticks_ms()
      try:
        while utime.ticks_ms() - start_time < 10000:
          if uart.any():
            data = uart.read()
            response += data.decode()
            if "OK" in response:
              uart.write(b'AT+CIPSTA_CUR='+IP_CLIENT+END_OF_LINE)
              utime.sleep(0.3)
              display.show(Image.YES)
              uart.write('AT+CIPMUX=1'+END_OF_LINE)
              utime.sleep(0.1)
              uart.read()
              uart.write('AT+CIPSTART=0,'+ SEP+'UDP'+SEP+','+SEP+IP+SEP+',8889,8889,2'+END_OF_LINE)
              utime.sleep(0.1)
              msg = uart.read()
              utime.sleep(0.1)
              cmd = 'command'
              udp_len = len(cmd)
              uart.write('AT+CIPSEND=0,' + str(udp_len) +',' +SEP+IP+SEP+',8889'+END_OF_LINE)
              utime.sleep(0.2)
              uart.read()
              udp = bytes(cmd, 'utf-8')
              uart.write(udp)
              utime.sleep(0.2)
              msg = str(uart.read())
              if 'SEND OK' in msg:
                  self.connected = True
                  return True
              else:
                  uart.init(baudrate=115200)
                  self.connected = False
                  return False
            elif 'ERROR' in response:
              uart.init(baudrate=115200)
              display.show(Image.NO)
              return 'echec'
        return False
      except:
        uart.init(baudrate=115200)
        display.show(Image.NO)
    except:
      uart.init(baudrate=115200)
      display.show(Image.NO)
      return 'echec'

  def drone_init(self):
    display.clear()
    ssid = self.SSID
    if ssid == False:
      return
    self.__tello_connect(ssid, '', self.TX_pin, self.RX_pin)
    utime.sleep(2)
    uart.init(baudrate=115200)
    if self.connected == False:
        display.show(Image.NO)
    return self.connected
  
  #need to implement bloc to disconnet the drone
  def tello_disconnect(self, TX_pin, RX_pin):
    uart.init(baudrate=115200, bits=8, parity=None, stop=1, tx=self.TX_pin, rx=self.RX_pin)
    uart.write('AT+CWQAP')
    utime.sleep(2)
    msg= uart.read()
    display.show(Image.NO)
    uart.init(baudrate=115200)
    return 'drone disconnected'
  # sync = True to wait for response (not needed for commands like "battery?"", "speed?", "time?" etc ...)
  def send_cmd(self, cmd, sync=True):
    try:
      timeout = 10
      uart.init(baudrate=115200, bits=8, parity=None, stop=1, tx=self.TX_pin, rx=self.RX_pin)
      uart.read()
      udp_len=len(cmd)
      uart.write('AT+CIPSEND=0,' + str(udp_len)+',' + SEP+IP+SEP+',8889'+END_OF_LINE)
      utime.sleep(0.1)
      uart.read()
      udp = bytes(cmd, 'utf-8')
      uart.write(udp)
      timer = 0
      utime.sleep(0.1)
      while not(uart.any()):
        sleep(1)
        timer += .001
        if timer > timeout:
            break
      msg = str(uart.read())
      if 'SEND OK' in msg:
        if sync:
          # error will be raised if move command is sent when motors are off for example
          if "error" in msg:
            raise Exception("error")
          if "unknown command" in msg:
            raise Exception("unknown command")
          response = 0
          response_timeout = 10 
          while not(uart.any()):
            sleep(1)
            timer += .010
            # timout for response (command execution can not exceed 10 seconds) => to improve
            if response > response_timeout:
              break
          utime.sleep(0.15)
          msg_response = str(uart.read())
          uart.init(baudrate=115200)
          return msg_response
        else:
          value= msg.split(':')[1].strip()
          uart.init(baudrate=115200)
          if value[0].isdigit():
              return value
          else:
              return value
      else:
        msg='failed to send message'
        uart.init(baudrate=115200)
        return msg
    except Exception as error:
      uart.init(baudrate=115200)
      return (error)