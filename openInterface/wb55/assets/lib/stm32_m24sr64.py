# Author: Taha NOUMAR tnoumar@enseirb-matmeca.fr

# DATA SHEETS
# https://www.st.com/resource/en/datasheet/m24sr64-y.pdf

# CONFIGURATION
#   tag type:  M24SR64Y
#   eeprom size: 64KBit
#   I2C address: 0x56

import machine
import binascii
import utime

NFC_TAG_I2C_ADDR = 0x56

def byte0(b):
  return b & 0x00FF

def byte1(b):
  return (b & 0xFF00) >> 8

class NFCTag(object):
  SYSTEM = 0xE101
  CC = 0xE103
  NDEF = 0x0001
  NDEF_HEADER = [0xd1, 0x01, 0x00, 0x54, 0x02, 0x65, 0x6e]
  verbose = True  # not to supercharge the user's console

  def __init__(self, i2c, addr=NFC_TAG_I2C_ADDR):
    if i2c == None:
      raise ValueError("I2C object 'NFCTag' needed as argument!")
    self._i2c = i2c
    i2cModules = self._i2c.scan()
    if addr not in i2cModules:
      error = "Unable to find module 'NFCTag' at address " + str(hex(addr)) + ". Please check connections with the board.\n"
      error += "[Info] I2C address.es detected: " + str([hex(a) for a in i2cModules])
      raise ValueError(error)
    self._addr = addr

  def wait(self, msg):
    ''' Wait a certain amount of time between operations'''
    utime.sleep_ms(500)
    if self.verbose == True:
      print("\\n" + str(msg))

  def write(self, data, crc=False):
    """Write a string of data bytes, with optional CRC"""
    if crc:
      crc0, crc1 = CRC.compute(data)
      data.append(crc0)
      data.append(crc1)

    data_hex = ""
    for i in range(len(data)):
      data_hex += hex(data[i]) + " "

    print("i2c write: [AC] " + data_hex)
    result = self._i2C.writeto(self._addr, bytes(data))
    print("write:" + str(result))
    if result == 0:
      raise RuntimeError("write result:" + str(result))

  def read(self, len, checkCrc=False):
    """read a string of data bytes, with optional CRC checking"""
    data = bytearray(len)
    result = self._i2C.readfrom_into(0x56, data)
    if checkCrc:
      raise RuntimeError("CRC checking not yet written")
    #print("read:" + str(data))
    # print('type of data is'+type(data))
    # if len(data) == 0:
    #   raise RuntimeError("read result:" + len(str(data)))
    return data

  def killRFSelectI2C(self):
    """Kill off any RF session and open an I2C session"""
    # tx:  [0xAC]  0x52
    # rx: TODO
    self.wait("Selecting I2C, deselecting RF ...")
    self.write([0x52])

  def selectNFCT4Application(self, pcb=0x02):
    """Select the NFC app"""
    # tx: [0xAC] 0x02 0x00 0xA4 0x04 0x00 0x07 0xD2 0x76 0x00 0x00 0x85 0x01 0x01 0x00 [0x35 0xC0]
    # rx: [0xAD] 0x02 0x90 0x00 [0xF1 0x09]
    self.write([pcb, 0x00, 0xA4, 0x04, 0x00, 0x07, 0xD2, 0x76, 0x00, 0x00, 0x85, 0x01, 0x01, 0x00], crc=True)
    self.wait('Selecting NFC APP ...')
    result = self.read(5)
    return result

  def selectFile(self, fileId, pcb=0x02):
    """Select a nominated file"""
    # tx:  [0xAC]  0x03  0x00  0xA4  0x00   0x0c   0x02   (0xE101)  0xCCCC
    # rx: TODO
    self.write([pcb, 0x00, 0xA4, 0x00, 0x0C, 0x02, byte1(fileId), byte0(fileId)], crc=True)
    self.wait('Selecting file ...')
    result = self.read(5)
    return result

  def readBinary(self, offset, length, pcb=0x02):
    """Read binary from the currently selected file"""
    # read length
    # tx: [0xAD]  0x03  0x00  0xB0  (0x00   0x00)   (0x02) 0xCCCC
    # rx: TODO
    self.write([pcb, 0x00, 0xB0, byte1(offset), byte0(offset), byte0(length)], crc=True)
    self.wait('Reading binary ...')
    result = self.read(length+5)
    print("readBinary:" + str(result))
    return result

  def updateBinaryLength(self, data, pcb=0x03):
    """ Update binary length in the currently selected file"""
    # tx: ERASE BINARY [AC] 03 00 D6 00 00 02 00 00 6B 37
    # rx:
    self.write([pcb, 0x00, 0xD6,  0x00, 0x00, 0x02, byte1(data), byte0(data)], crc=True)
    utime.sleep(1)
    result = self.read(5)
    print("updateBinaryLength:"+str(result))
    return result

  def updateBinary(self, offset, length, data, pcb=0x02):
    """ Update binary data in the currently selected file"""
    # UPDATE BINARY with HELLO WORLD e.g.
    # tx:  0xAC  0x02  0x00  0xD6  0x00   0x02   0x0B 0x68 0x65 0x6C 0x6C 0x6F 0x20 0x77 0x6F 0x72 0x6C 0x64 0x2F 0xFC
    # rx:
    payload = self.NDEF_HEADER + data
    payload[2] = length - 4
    self.write([pcb, 0x00, 0xD6,  byte1(offset), byte0(offset), byte0(length)]+payload, crc=True)
    self.wait('Updating Binary ...')
    result = self.read(5)
    print("updateBinary: "+str(result))
    return result
  
  def deselect(self):
    """Deselect the I2C (allow RF to come in again)"""
    # deselect
    # tx: [0xAC]  0xC2 0xE0 B4
    # rx: 0xC2 0xE0 0xB4
    self.write([0xC2], crc=True)
    self.wait('Deselecting I2C, selecting RF ')
    result = self.read(3)
    return result

  def readNDEFFile(self):
    '''
      select I2C 
      select NFC application
      select CC
      read CC file and length
      select NDEF file
      read NDEF length
      read NDEF file 
    '''
    self.killRFSelectI2C()
    self.selectNFCT4Application()
    self.selectFile(self.CC, pcb=0x03)
    data = self.readBinary(0x0000, 0x02, pcb=0x02)
    data = self.readBinary(0x0000, 0x0F, pcb=0x03)
    self.selectFile(self.NDEF, pcb=0x02)
    data = self.readBinary(0x0000, 0x02, pcb=0x03)
    ndef_len = (data[1]*256) + data[2]
    print("NDEF len:" + str(ndef_len))
    data = self.readBinary(0x0002, ndef_len, pcb=0x02)
    ndef = data[8:-4]
    s = ""
    for i in range(len(ndef)):
      s += chr(ndef[i])
    print("ndef message:" + s)
    return s

  def eraseNDEFFile(self):
    '''
      select I2C 
      select NFC application
      select CC
      read CC file and length
      select NDEF file
      set NDEF length to 0
    '''
    self.killRFSelectI2C()
    self.selectNFCT4Application()
    self.selectFile(self.CC, pcb=0x03)
    data = self.readBinary(0x0000, 0x02, pcb=0x02)
    data = self.readBinary(0x0000, 0x0F, pcb=0x03)
    self.selectFile(self.NDEF, pcb=0x02)
    try:
      data = self.updateBinaryLength(0)
      print("File erased successfully")
    except:
      print("error while erasing file")

  def writeNDEFFile(self, text):
    '''
      erase NDEF length
      update NDEF message
      set new NDEF length
      deselect I2C
    '''
    self.eraseNDEFFile()
    # Write hello world in the tag
    print("Storing " + text + " in NDEF message")
    hex_text = binascii.hexlify(text.encode('utf8'))
    hex_list = [0x00 for i in range(0, int((len(hex_text)/2)))]
    for i in range(0, int((len(hex_text)/2))):
      hex_list[i] = int("0x"+str(hex_text[2*i:2*(i+1)]).replace("b'", "").replace("'", ""))
    data = self.updateBinary(0x0002, len(text), hex_list)
    utime.sleep(1)
    try:
      data = self.updateBinaryLength(len(text))
      print("File written successfully")
    except:
      print("error while writing file")
    print("deselecting I2C")
    self.deselect()
    utime.sleep(2)


# PCB means "protocol control byte",
# Takes 0x02 or 0x03

# CLA is class byte (always 0x00 for these apps)
# INS is the instruction to send
# P1 P2 are parameter 1 and 2,
# Lc is length of command
# Data is the payload of the command
# Le is the length of expected response
# CRC2 is the cyclic redundancy check bytes

#Structure of NDEF message (NFC Data Exchange Format) ########################################################
#          Byte 0   Byte 1   Byte 2   Byte 3
#  0x0000        NDEF message length   User data  User data
#  0x0004        User data  User data  User data  User data
#  ...         ...    ...  ...  ...
##############################################################################################################
# COMMANDS
#           SEL   PCB   CLA   INS   P1   P2   Lc   Data   Le   CRC2
#   kill RF session, open I2C   0xAC  0x52
#   select system file    0xAC  0x02  0x00  0xA4  0x00   0x0c   0x02   0xE101  0xCCCC
#   read length       0xAD  0x03  0x00  0xB0  0x00   0x00       0x02 0xCCCC
#   read memsize      0xAD  0x03  0x00  0xB0  0x00   0x0F       0x02 0xCCCC
#   deselect  (Kill I2C, open RF)   0xAC      0xC2           0xE0 0xB4
#   erase NDEF len      0xAC  0x03  0x00  0xD6  0x00   0x00   0x02  0x00 0x00  0x6B 0x37
# write HELLO WORLD in tag    0xAC  0x02  0x00  0xD6  0x00   0x02   0x0B 0x68 0x65 0x6C 0x6C 0x6F 0x20 0x77 0x6F 0x72 0x6C 0x64 0x2F 0xFC
#####################################################################################################################################################


class CRC():
  def __init__(self, initial=0x6363):
    # initialize CRC OBJ
    self.initial = initial

  def start(self):
    self.crc = self.initial

  # def update(self, data):
  #   # update hex entries for CRC computation
  #   datain = data
  #   data = data ^ ((self.crc) & 0x00FF)
  #   data = data ^ ((data << 4) & 0x00FF)
  #   self.crc = (self.crc >> 8) \\
  #     ^ (data << 8)   \\
  #     ^ (data << 3)   \\
  #     ^ (data >> 4)

  #   self.crc = self.crc & 0xFFFF
  #   return self.crc

  def getCRC(self):
    return (self.crc & 0xFF), ((self.crc & 0xFF00) >> 8)

  def compute(block):
    c = CRC()
    c.start()
    for i in range(len(block)):
      c.update(block[i])
    crc0, crc1 = c.getCRC()
    return crc0, crc1