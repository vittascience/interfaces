try:
  from umqtt.simple import MQTTClient
except:
  from umqttsimple import MQTTClient

import machine
import binascii

MACHINE_ID = binascii.hexlify(machine.unique_id()).decode()

class SimpleMQTTClient:
  
  def __init__(self, broker, username, password, port = 0, on_message = None, on_connect = None, on_disconnect = None):
    self.broker = broker
    self.port = port
    self.user_onMessageReceive_cb = on_message
    self.user_on_connect_cb  = on_connect
    self.user_on_disconnect_cb = on_disconnect
    self.messagePublished = None
    self.client = MQTTClient(MACHINE_ID, self.broker, self.port, username, password, keepalive = 300)
    
  def connectToBroker(self):
    print("Trying to connect to broker ('%s', %i) ..." % (self.broker, self.port if self.port else 1883))
    try:
      self.client.connect()
      print("Station (ID : %s) connected to broker (IP : %s)" % (MACHINE_ID, self.broker))
      if self.user_on_connect_cb:
        self.user_on_connect_cb()
    except OSError as e:
      print(e)
      self.connectToBroker()
      
  def disconnectFromBroker(self):
    self.client.disconnect()
    if self.user_on_disconnect_cb:
        self.user_on_disconnect_cb()

  def onMessageReceived_cb(self, topic, message):
    topic = topic.decode('utf-8')
    message = message.decode('utf-8')
    if self.user_onMessageReceive_cb:
      self.user_onMessageReceive_cb(topic, message)
      
  def subscribeTopic(self, topic):
    self.client.set_callback(self.onMessageReceived_cb)
    self.client.subscribe(topic.encode())
    print("Station subscribed to '%s' topic" % (topic))

  def publishValue(self, topic, value):
    self.messagePublished = topic + ':' + str(value)
    try:
      self.client.publish(topic.encode(), str(value).encode(), qos = 1)
    except OSError as e:
      #print(e)
      if self.user_on_disconnect_cb:
        self.user_on_disconnect_cb()
      self.connectToBroker()