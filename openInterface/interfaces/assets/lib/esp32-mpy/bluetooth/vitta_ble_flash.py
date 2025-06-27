import asyncio
import bluetooth
from ble_simple_peripheral import BLESimplePeripheral
import os
import utime

isRunning = False
tasks = [None, None]
client = None

def set_global_exception():
  def handle_exception(loop, context):
    import sys
    sys.print_exception(context["exception"])
    sys.exit()
  loop = asyncio.get_event_loop()
  loop.set_exception_handler(handle_exception)

def on_rx(v):
  global isFlashing
  global file
  global canExecute
  global isRunning
  global tasks

  buf = v.decode('utf-8')

  if buf == "START_FLASH_MAIN":
    print("main is running ?: " + str(isRunning))
    print(tasks)
    if isRunning and tasks[0] is not None:
      for i in range(5):
        print("Try again to cancel...")
        try:
          was_canceled = tasks[0].cancel()
        except RuntimeError as error:
          print(error)
        utime.sleep_ms(100)
      isRunning = False
      print("Code canceled: " + str(was_canceled))

    print("Start flashing webble_main.py ...")
    file = open('webble_main.py', 'w')
    file.write("# User code from Web BLE\r")
    file.close()
    file = open('webble_main.py', 'a')
    isFlashing = True

  elif buf == "END_FLASH_MAIN":
    file.close()
    print("webble_main.py flashed!")
    isFlashing = False
    canExecute = True

  elif isFlashing:
    print("Flashing packet: " + str(len(buf)))
    # Manage accents
    buf = buf.replace('"', '\"').replace("'", "\'")
    #Manage python end of lines
    buf = buf.replace('\r\n', "\r").replace('\n', "\r")
    #Set \ to two spaces
    buf = buf.replace('\t', '  ')
    file.write(buf)
    
  else:
    print("Data received: " + buf)
      
async def getUserMain(tasks):
  global canExecute
  global was_canceled
  global isRunning
  global client

  ble = bluetooth.BLE()
  client = BLESimplePeripheral(ble, quit_on_rx = True)
  
  isFlashing = False
  file = None
  canExecute = False

  client.on_write(on_rx)
  
  while True:
    print("Can execute ? " + str(canExecute))
    if canExecute:
      canExecute = False
      isRunning = True
      exec(open('webble_main.py').read(),globals())
      tasks[0] = asyncio.create_task(execute(userMain))
    await asyncio.sleep(1)

def userPrint(data):
  global client
  if client is not None and client.is_connected():
    client.send(str(data).encode('utf-8'))
  else:
    print(data)

async def execute(userMain):
  global isRunning
  set_global_exception()
  try:
    await userMain(userPrint)
  except Exception as e:
    isRunning = False
    sendClientError(e)

def sendClientError(e):
  global client
  error = type(e).__name__ + ' - ' + str(e)
  print("[userMain Error]: ", error)
  if client is not None and client.is_connected():
    client.send("Failed to execute.".encode('utf-8'))
    client.send(error.encode('utf-8'))

async def main():
  userMain = None
  global isRunning
  #set_global_exception()  # Debug aid
  try:
    import webble_main
    userMain = webble_main.userMain
  except ImportError as e:
    print("No main program in FS. ", e)
  if userMain is not None:
    #task 0 - Executing user program
    isRunning = True
    tasks[0] = asyncio.create_task(execute(userMain))
  #task 1 - Getting main program
  tasks[1] = asyncio.create_task(getUserMain(tasks))
  while True: await asyncio.sleep(1)

try:
  asyncio.run(main())
finally:
  asyncio.new_event_loop()  # Clear retained state