from machine import UART
from time import sleep_ms
import time

class AtCmd:

    def __init__(self, Cmd, Response = "None", Timeout=2500):
        self.cmd = Cmd
        self.response = Response
        self.timeout = Timeout

class DriverAtCmd:

    def __init__(self, Baudrate, UartId, ListAtCmd, VerboseMode = False):
        self.listAtCmd = ListAtCmd
        self.uart = UART(UartId, Baudrate)
        self.uart.init(Baudrate, bits=8, parity=None, stop=1)
        self.verboseMode = VerboseMode

    def sendCmd(self, AtCmdKey, *SubParameter ):
        cmdData = self.listAtCmd[AtCmdKey].cmd
        first = True

        # Flush UART RX buffer
        while(self.uart.any() != 0):
            self.uart.read()

        # Format parameters
        for i in SubParameter:
            if first == True:
                first = False
                cmdData += "="
            else:
                cmdData +=", "

            if type(i) is int:
                cmdData += str(i)
            elif type(i) is float:
                cmdData += str(i)
            elif type(i) is str:
                cmdData += i
        cmdData += "\n\r"

        # Send command over UART com
        self.uart.write(cmdData)
        if self.verboseMode == True:
            print("CMD => " + str(cmdData))

        start = time.ticks_ms()
        cmdReceive = b''

        # Check response if is necessary
        if self.listAtCmd[AtCmdKey].response != "None":
            while True:
                line = self.__readResponseLine()
                if line != None and line != -1:
                    cmdReceive += line

                    #Check unique end of received condition
                    if type(self.listAtCmd[AtCmdKey].response) == str:
                        if line.decode().find(self.listAtCmd[AtCmdKey].response) != -1:
                            if self.verboseMode == True:
                                print("RSP ==> " + str(cmdReceive))
                            return cmdReceive
                        else:
                            sleep_ms(400)
                    # Check multi end of received condition
                    elif type(self.listAtCmd[AtCmdKey].response) == list:
                        for endCmd in self.listAtCmd[AtCmdKey].response:
                            if line.decode().find(endCmd) != -1:
                                if self.verboseMode == True:
                                    print("RSP ==> " + str(cmdReceive))
                                return cmdReceive
                            else:
                                sleep_ms(400)

                # Check timeout condition
                if time.ticks_diff(time.ticks_ms(), start) > self.listAtCmd[AtCmdKey].timeout:
                    return -1
        else:
            return 0

    def getCmd(self, AtCmdKey, *SubParameter):
        cmdData = self.listAtCmd[AtCmdKey].cmd
        first = True

        # Flush UART RX buffer
        while(self.uart.any() != 0):
            self.uart.read()

        # Format parameters
        for i in SubParameter:
            if first == True:
                cmdData += '='
                first = False
            else:
               cmdData += ", "

            if type(i) is int:
                cmdData += str(i)
            elif type(i) is float:
                cmdData += str(i)
            elif type(i) is str:
                cmdData += i
            else:
                cmdData ='Error data type'

        cmdData +='?\n\r'

        # Send command over UART com
        self.uart.write(cmdData)
        if self.verboseMode == True:
            print("CMD ==> " + str(cmdData))

        start = time.ticks_ms()
        cmdReceive = b''

        # Check response if is necessary
        if self.listAtCmd[AtCmdKey].response != "None":
            while True:
                line = self.__readResponseLine()
                if line != None and line != -1:
                    cmdReceive += line

                    #Check unique end of received condition
                    if type(self.listAtCmd[AtCmdKey].response) == str:
                        if line.decode().find(self.listAtCmd[AtCmdKey].response) != -1:
                            if self.verboseMode == True:
                                print("RSP ==> " + str(cmdReceive))
                            return cmdReceive
                        else:
                            sleep_ms(400)
                    # Check multi end of received condition
                    elif type(self.listAtCmd[AtCmdKey].response) == list:
                        for endCmd in self.listAtCmd[AtCmdKey].response:
                            if line.decode().find(endCmd) != -1:
                                if self.verboseMode == True:
                                    print("RSP ==> " + str(cmdReceive))
                                return cmdReceive
                            else:
                                sleep_ms(400)

                # Check timeout condition
                if time.ticks_diff(time.ticks_ms(), start) > self.listAtCmd[AtCmdKey].timeout:
                    return -1
        else:
            return 0

    def __readResponseLine(self):
        response = b''
        waitStartResponse = True
        responseFinish = False
        sizeRepsonse = 0

        start = time.ticks_ms()
        while responseFinish != True:
            data = self.uart.read(1)
            if data != None:
                if waitStartResponse == True and data.decode() == "+":
                    waitStartResponse = False
                    response += data
                    sizeRepsonse += 1 
                else:
                    if data.decode().find("\n") != -1 or data.decode().find("\r") != -1:
                        responseFinish = True
                    else:
                        response += data
                        sizeRepsonse += 1
            elif waitStartResponse == True:
                return None
            # Check timeout condition (2s max for read line)
            if time.ticks_diff(time.ticks_ms(), start) > 2000:
                return -1

        if sizeRepsonse == 0:
            return None
        else:
            return response