# -*- coding: utf-8 -*-
from __future__ import division
import qi
import time
import almath
import math
import random
import signal
import sys

robotWrapper = None

def signal_handler(sig, frame):
    """
    Handle interruptions like SIGINT (Ctrl+C, used for now) or SIGTERM (kill command => sig 15 for pkill command using ssh).
    """
    print("Signal "+ str(sig) + " received. Cleaning up and exiting...")
    if robotWrapper is not None:
        robotWrapper.cleanUp()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)  # Ctrl+C
signal.signal(signal.SIGTERM, signal_handler)  # kill or pkill


poseNames = ["Yeah", "HandsOnhips", "ScanningHorizon", "Relaxed", "TPose"]
poseValues =[[0,0,-1.33,0.26,-0.58,0,0,1,-1.31,-0.9,1.4,0.21,0,0], [0,0,1.30,0.62,-1.43,0,0,0,1.30,-0.62,1.42,0,0,0], [0,0,-0.966,0.386,-1.544,0.224,-1.064,1,1.6,-0.32,0.36,0,0,0], [0,0,1.39,0.27,-0.53,0,0,0,1.52,-0.24,0.37,0,0,0], [0,0,0,1.326,-0.0349,-1.44,0,0,0,-1.326,0.035,1.4,0,0]]



class MotionService:
    def __init__(self, session):
        session.waitForService("ALMotion")
        session.waitForService("ALRobotPosture")
        
        self.motion = session.service("ALMotion")
        self.posture = session.service("ALRobotPosture")

    def robotIsWakeUp(self):
        return self.motion.robotIsWakeUp()
    
    def wakeUp(self):
        self.motion.wakeUp()

    def goToPosture(self, posture_name, speed = 0.8):
        speed = speed / 100.0
        self.posture.goToPosture(posture_name, speed)
        
    def pose(self, pose_name, speed = 0.2):
        index = poseNames.index(pose_name)
        self.motion.angleInterpolationWithSpeed(["HeadYaw", "HeadPitch", "LShoulderPitch", "LShoulderRoll", "LElbowRoll", "LElbowYaw", "LWristYaw", "LHand", "RShoulderPitch", "RShoulderRoll", "RElbowRoll", "RElbowYaw", "RWristYaw", "RHand"], poseValues[index], speed)

    def moveTo(self, x, y, theta):
        self.motion.moveTo(x / 100.0, y / 100.0, theta)
    
    def setAnglesRad(self, group_name, angles, fractionMaxSpeed = 0.2):
        if (group_name == "upperBody"):
            group_name = ["HeadYaw", "HeadPitch", "LShoulderPitch", "LShoulderRoll", "LElbowRoll", "LElbowYaw", "LWristYaw", "LHand", "RShoulderPitch", "RShoulderRoll", "RElbowRoll", "RElbowYaw", "RWristYaw", "RHand"]
        
        self.motion.angleInterpolationWithSpeed(group_name, angles, fractionMaxSpeed)
    
    def setAnglesDeg(self, group_name, angles, fractionMaxSpeed = 0.2):
        angles = [angle * almath.TO_RAD for angle in angles]
        self.setAnglesRad(group_name, angles, fractionMaxSpeed)
    
    def closeHand(self, hand_name):
        if hand_name not in ["LHand", "RHand"]:
            raise ValueError("Hand name must be 'LHand' or 'RHand'.")
        self.motion.closeHand(hand_name)
    
    def openHand(self, hand_name):
        if hand_name not in ["LHand", "RHand"]:
            raise ValueError("Hand name must be 'LHand' or 'RHand'.")
        self.motion.openHand(hand_name)

class LedsService:
    def __init__(self, session):
        session.waitForService("ALLeds")
        self.leds = session.service("ALLeds")

    def fadeRGB(self, group_name, *args):
        """
        Due to the use of multiple call to the fadeRGB method in Vittascience API, we need to check the number of arguments to call the right method.
        :param group_name: Name of the group of LEDs to control.
        :param args: Either a color name (string) and a duration (float) or RGB values (int) and a duration (float) or RGB values (int) and a duration (float) and an index (int) (for the eyes).
        """
        if len(args) == 2 and isinstance(args[0], str):
            color_name, duration = args
            self.leds.fadeRGB(group_name, color_name, duration)
        elif len(args) == 4 and all(isinstance(arg, (int, float)) for arg in args):
            red, green, blue, duration = args
            self.leds.fadeRGB(group_name, red / 100.0, green / 100.0, blue / 100.0, duration)
        elif len(args) == 5:
            red, green, blue, duration, index = args
            self.leds.fadeRGB(str(group_name) + str(index), red / 100.0, green / 100.0, blue / 100.0, duration)
            
        else:
            raise ValueError("Invalid arguments for fadeRGB method.")
    
    def rasta(self, duration):
        self.leds.rasta(duration)
        
    def rotateEyes(self, hex_color, timeForRotation, duration):
        r = int(hex_color[1:3], 16)
        g = int(hex_color[3:5], 16)
        b = int(hex_color[5:7], 16)
        rgb = (r << 16) | (g << 8) | b
        print("RGB: " + hex(rgb))
        self.leds.rotateEyes(rgb, timeForRotation, duration)
        
    def randomEyes(self, duration):
        self.leds.randomEyes(duration)
        
    def fade(self, group_name, intensity, duration):
        self.leds.fade(group_name, intensity/100.0, duration)
    
    def setIntensity(self, group_name, intensity):
        actualIntensity = self.leds.getIntensity("RightFaceLed1")
        print("Actual intensity: ", actualIntensity)
        self.leds.setIntensity(group_name, intensity)
    
    def on(self, group_name):
        self.leds.on(group_name)
    
    def off(self, group_name):
        self.leds.off(group_name)
        
class TTS:
    """
    Text to speech service (only animated version).
    """
    def __init__(self, session):
        session.waitForService("ALAnimatedSpeech")
        self.tts = session.service("ALAnimatedSpeech")

    def say(self, text):
        self.tts.say(str(text))


class ASRService:
    def __init__(self, session):
        session.waitForService("ALMemory")
        session.waitForService("ALSpeechRecognition")
        self.memory = session.service("ALMemory")
        self.asr = session.service("ALSpeechRecognition")
        self.subscriber = None
        self.callback = None 
        self.signal_id = None

    def setLanguage(self, language):
        """
        Set the language of the ASR. ASR must be paused before calling this method.
        """
        self.asr.pause(True)
        self.asr.setLanguage(language)
        self.asr.pause(False)
    
    
    def setVocabulary(self, vocabulary, word_spotting=False):

        self.asr.pause(True)
        try:
            self.asr.removeAllContext()
        except Exception as e:
            print("Error while removing context: ", e)
            
        self.asr.setVocabulary(vocabulary, word_spotting)
        self.asr.pause(False)

    def startRecognition(self, callback):

        self.callback = callback

        self.subscriber = self.memory.subscriber("WordRecognized")
        self.signal_id = self.subscriber.signal.connect(self.onWordRecognized)
        print("Signal connected." + str(self.signal_id))

        self.asr.subscribe("ASRService")
        print("Speech recognition started.")

    def stopRecognition(self):
        if self.subscriber and self.signal_id is not None:
            self.subscriber.signal.disconnect(self.signal_id)
            self.signal_id = None
            self.subscriber = None
            self.asr.unsubscribe("ASRService")

        print("Speech recognition stopped.")

    def onWordRecognized(self, value):
        """
        Methode to be called when a word is recognized.
        value: array of 2 elements: [word, confidence]
        """
        if len(value) > 0 and value[1] > 0.30:
            print("Word recognized: {}, Confidence: {}".format(value[0], value[1]))
            self.asr.pause(True)
            if self.callback:
                try:
                    self.callback(value[0])
                except Exception as e:
                    print("Error while calling callback: ", e)
            self.asr.pause(False)



class SensorServices:
    def __init__(self, session):
        """
       Initialize the sensors services.
        """
        session.waitForService("ALBattery")
        self.battery = session.service("ALBattery")
        
        session.waitForService("ALMemory")
        self.memory = session.service("ALMemory")
        
        self.left_bumper_subscriber = None
        self.right_bumper_subscriber = None
        self.front_head_touch_subscriber = None
        self.middle_head_touch_subscriber = None
        self.rear_head_touch_subscriber = None
        self.left_hand_left_touched_subscriber = None
        self.left_hand_right_touched_subscriber = None
        self.left_hand_back_touched_subscriber = None
        self.right_hand_left_touched_subscriber = None
        self.right_hand_right_touched_subscriber = None
        self.right_hand_back_touched_subscriber = None
        
        self.left_signal_id = None
        self.right_signal_id = None
        self.front_head_signal_id = None
        self.middle_head_signal_id = None
        self.rear_head_signal_id = None
        self.left_hand_left_signal_id = None
        self.left_hand_right_signal_id = None
        self.left_hand_back_signal_id = None
        self.right_hand_left_signal_id = None
        self.right_hand_right_signal_id = None
        self.right_hand_back_signal_id = None
        
        self.isLeftBumperPressed = False
        self.isRightBumperPressed = False
        self.isFrontHeadTouched = False
        self.isMiddleHeadTouched = False
        self.isRearHeadTouched = False
        self.isHandLeftLeftTouched = False
        self.isHandLeftRightTouched = False
        self.isHandLeftBackTouched = False
        self.isHandRightLeftTouched = False
        self.isHandRightRightTouched = False
        self.isHandRightBackTouched = False
        
        self.startBumperDetection()
        self.startHeadTouchDetection()
        self.startHandLeftTouchDetection()
        self.startHandRightTouchDetection()

    def getBatteryCharge(self):
        return self.battery.getBatteryCharge()
    
    def startBumperDetection(self):
        """
        Start the bumper detection.
        """
        self.left_bumper_subscriber = self.memory.subscriber("LeftBumperPressed")
        self.left_signal_id = self.left_bumper_subscriber.signal.connect(self.onLeftBumperPressed)
        
        self.right_bumper_subscriber = self.memory.subscriber("RightBumperPressed")
        self.right_signal_id = self.right_bumper_subscriber.signal.connect(self.onRightBumperPressed)
        
        print("Bumper detection started.")

    def stopBumperDetection(self):
        """
        Stop the bumper detection and disconnect the signals. Unused for now.
        """
        if self.left_bumper_subscriber and self.left_signal_id is not None:
            self.left_bumper_subscriber.signal.disconnect(self.left_signal_id)
            self.left_signal_id = None
        
        if self.right_bumper_subscriber and self.right_signal_id is not None:
            self.right_bumper_subscriber.signal.disconnect(self.right_signal_id)
            self.right_signal_id = None

        print("Bumper detection stopped.")

    
    
    def onLeftBumperPressed(self, value):
        if value == 1.0:
            self.isLeftBumperPressed = True
            print("Left bumper pressed.")

    def onRightBumperPressed(self, value):
        if value == 1.0:
            self.isRightBumperPressed = True
            print("Right bumper pressed.")

    def LeftBumperPressed(self):
        if self.isLeftBumperPressed:
            self.isLeftBumperPressed = False
            return True
        return False

    def RightBumperPressed(self):
        if self.isRightBumperPressed:
            self.isRightBumperPressed = False
            return True
        return False
    
    def BumperPressed(self):
        time.sleep(0.5)
        if self.isLeftBumperPressed or self.isRightBumperPressed:
            self.isLeftBumperPressed = False
            self.isRightBumperPressed = False
            return True
        return False
    
    def startHeadTouchDetection(self):
        """
        Start the head touch detection.
        """
        self.front_head_touch_subscriber = self.memory.subscriber("FrontTactilTouched")
        self.front_head_signal_id = self.front_head_touch_subscriber.signal.connect(self.onFrontHeadTouched)
        
        self.middle_head_touch_subscriber = self.memory.subscriber("MiddleTactilTouched")
        self.middle_head_signal_id = self.middle_head_touch_subscriber.signal.connect(self.onMiddleHeadTouched)
        
        self.rear_head_touch_subscriber = self.memory.subscriber("RearTactilTouched")
        self.rear_head_signal_id = self.rear_head_touch_subscriber.signal.connect(self.onRearHeadTouched)
        
        print("Head touch detection started.")
        
    def stopHeadTouchDetection(self):
        """
        Stop the head touch detection and disconnect the signals. Unused for now.
        """
        if self.front_head_touch_subscriber and self.front_head_signal_id is not None:
            self.front_head_touch_subscriber.signal.disconnect(self.front_head_signal_id)
            self.front_head_signal_id = None
        
        if self.middle_head_touch_subscriber and self.middle_head_signal_id is not None:
            self.middle_head_touch_subscriber.signal.disconnect(self.middle_head_signal_id)
            self.middle_head_signal_id = None
        
        if self.rear_head_touch_subscriber and self.rear_head_signal_id is not None:
            self.rear_head_touch_subscriber.signal.disconnect(self.rear_head_signal_id)
            self.rear_head_signal_id = None
        
        print("Head touch detection stopped.")
    
    def onFrontHeadTouched(self, value):
        if value == 1.0:
            self.isFrontHeadTouched = True
            print("Front head touched.")
    
    def onMiddleHeadTouched(self, value):
        if value == 1.0:
            self.isMiddleHeadTouched = True
            print("Middle head touched.")
    
    def onRearHeadTouched(self, value):
        if value == 1.0:
            self.isRearHeadTouched = True
            print("Rear head touched.")

    def FrontTactilTouched(self):
        if self.isFrontHeadTouched:
            self.isFrontHeadTouched = False
            return True
        return False

    def MiddleTactilTouched(self):
        if self.isMiddleHeadTouched:
            self.isMiddleHeadTouched = False
            return True
        return False
    
    def RearTactilTouched(self):
        if self.isRearHeadTouched:
            self.isRearHeadTouched = False
            return True
        return False
    
    def TactilTouched(self):
        time.sleep(0.5)
        if self.isFrontHeadTouched or self.isMiddleHeadTouched or self.isRearHeadTouched:
            self.isFrontHeadTouched = False
            self.isMiddleHeadTouched = False
            self.isRearHeadTouched = False
            return True
        return False
    
    def startHandLeftTouchDetection(self):
        """
        Start the left hand touch detection.
        """
        self.left_hand_left_touched_subscriber = self.memory.subscriber("HandLeftLeftTouched")
        self.left_hand_left_signal_id = self.left_hand_left_touched_subscriber.signal.connect(self.onHandLeftLeftTouched)
        
        self.left_hand_right_touched_subscriber = self.memory.subscriber("HandLeftRightTouched")
        self.left_hand_right_signal_id = self.left_hand_right_touched_subscriber.signal.connect(self.onHandLeftRightTouched)
        
        self.left_hand_back_touched_subscriber = self.memory.subscriber("HandLeftBackTouched")
        self.left_hand_back_signal_id = self.left_hand_back_touched_subscriber.signal.connect(self.onHandLeftBackTouched)
        
        print("Left hand touch detection started.")
    
    def stopHandLeftTouchDetection(self):
        """
        Stop the left hand touch detection and disconnect the signals. Unused for now.
        """
        if self.left_hand_left_touched_subscriber and self.left_hand_left_signal_id is not None:
            self.left_hand_left_touched_subscriber.signal.disconnect(self.left_hand_left_signal_id)
            self.left_hand_left_signal_id = None
        
        if self.left_hand_right_touched_subscriber and self.left_hand_right_signal_id is not None:
            self.left_hand_right_touched_subscriber.signal.disconnect(self.left_hand_right_signal_id)
            self.left_hand_right_signal_id = None
        
        if self.left_hand_back_touched_subscriber and self.left_hand_back_signal_id is not None:
            self.left_hand_back_touched_subscriber.signal.disconnect(self.left_hand_back_signal_id)
            self.left_hand_back_signal_id = None
        
        print("Left hand touch detection stopped.")
    
    def onHandLeftLeftTouched(self, value):
        if value == 1.0:
            self.isHandLeftLeftTouched = True
            print("Left hand left touched.")
    
    def onHandLeftRightTouched(self, value):
        if value == 1.0:
            self.isHandLeftRightTouched = True
            print("Left hand right touched.")
    
    def onHandLeftBackTouched(self, value):
        if value == 1.0:
            self.isHandLeftBackTouched = True
            print("Left hand back touched.")
    
    def HandLeftLeftTouched(self):
        if self.isHandLeftLeftTouched:
            self.isHandLeftLeftTouched = False
            return True
        return False
    
    def HandLeftRightTouched(self):
        if self.isHandLeftRightTouched:
            self.isHandLeftRightTouched = False
            return True
        return False
    
    def HandLeftBackTouched(self):
        if self.isHandLeftBackTouched:
            self.isHandLeftBackTouched = False
            return True
        return False
    
    def HandLeftTouched(self):
        time.sleep(0.5)
        if self.isHandLeftLeftTouched or self.isHandLeftRightTouched or self.isHandLeftBackTouched:
            self.isHandLeftLeftTouched = False
            self.isHandLeftRightTouched = False
            self.isHandLeftBackTouched = False
            return True
        return False
    
    def startHandRightTouchDetection(self):
        """
        Start the right hand touch detection.
        """
        self.right_hand_left_touched_subscriber = self.memory.subscriber("HandRightLeftTouched")
        self.right_hand_left_signal_id = self.right_hand_left_touched_subscriber.signal.connect(self.onHandRightLeftTouched)
        
        self.right_hand_right_touched_subscriber = self.memory.subscriber("HandRightRightTouched")
        self.right_hand_right_signal_id = self.right_hand_right_touched_subscriber.signal.connect(self.onHandRightRightTouched)
        
        self.right_hand_back_touched_subscriber = self.memory.subscriber("HandRightBackTouched")
        self.right_hand_back_signal_id = self.right_hand_back_touched_subscriber.signal.connect(self.onHandRightBackTouched)
        
        print("Right hand touch detection started.")
    
    def stopHandRightTouchDetection(self):
        """
        Stop the right hand touch detection and disconnect the signals. Unused for now.
        """
        if self.right_hand_left_touched_subscriber and self.right_hand_left_signal_id is not None:
            self.right_hand_left_touched_subscriber.signal.disconnect(self.right_hand_left_signal_id)
            self.right_hand_left_signal_id = None
        
        if self.right_hand_right_touched_subscriber and self.right_hand_right_signal_id is not None:
            self.right_hand_right_touched_subscriber.signal.disconnect(self.right_hand_right_signal_id)
            self.right_hand_right_signal_id = None
        
        if self.right_hand_back_touched_subscriber and self.right_hand_back_signal_id is not None:
            self.right_hand_back_touched_subscriber.signal.disconnect(self.right_hand_back_signal_id)
            self.right_hand_back_signal_id = None
        
        print("Right hand touch detection stopped.")
    
    def onHandRightLeftTouched(self, value):
        if value == 1.0:
            self.isHandRightLeftTouched = True
            print("Right hand left touched.")
    
    def onHandRightRightTouched(self, value):
        if value == 1.0:
            self.isHandRightRightTouched = True
            print("Right hand right touched.")
            
    def onHandRightBackTouched(self, value):
        if value == 1.0:
            self.isHandRightBackTouched = True
            print("Right hand back touched.")
    
    def HandRightLeftTouched(self):
        if self.isHandRightLeftTouched:
            self.isHandRightLeftTouched = False
            return True
        return False
    
    def HandRightRightTouched(self):
        if self.isHandRightRightTouched:
            self.isHandRightRightTouched = False
            return True
        return False
    
    def HandRightBackTouched(self):
        if self.isHandRightBackTouched:
            self.isHandRightBackTouched = False
            return True
        return False

    def HandRightTouched(self):
        time.sleep(0.5)
        if self.isHandRightLeftTouched or self.isHandRightRightTouched or self.isHandRightBackTouched:
            self.isHandRightLeftTouched = False
            self.isHandRightRightTouched = False
            self.isHandRightBackTouched = False
            return True
        return False
    


class Sonar_Services:
    def __init__(self, session):
        """
        Initialize the sonar services.
        """
        session.waitForService("ALSonar")
        self.memory_service = session.service("ALMemory")
        self.sonar = session.service("ALSonar")
        self.sonar_id = None
        self.sonar_signal_id = None
        self.sonar_subscriber = None
        
        self.isLeftSonarDetected = False
        self.isRightSonarDetected = False
        
        self.startSonarDetection()
        
    
    def startSonarDetection(self):
        """
        Start the sonar detection.
        """
        self.sonar_subscriber = self.memory_service.subscriber("SonarSensor")
        
        self.sonar.subscribe("SonarService")
        print("Sonar detection started.")
        
    def getLeftValue(self):
        return self.memory_service.getData("Device/SubDeviceList/US/Left/Sensor/Value")
    
    def getRightValue(self):
        return self.memory_service.getData("Device/SubDeviceList/US/Right/Sensor/Value")
    
    def SonarLeftDetected(self):
        value = self.getLeftValue()
        print("Left sonar value: {}".format(value))
        if value < 0.5:
            return True
        return False
    
    def SonarRightDetected(self):
        value = self.getRightValue()
        print("Right sonar value: {}".format(value))
        if value < 0.5:
            return True
        return False        
    def SonarLeftNothingDetected(self):
        value = self.getLeftValue()
        print("Left sonar value: {}".format(value))
        if value > 0.5:
            return True
        return False
    
    def SonarRightNothingDetected(self):
        value = self.getRightValue()
        print("Right sonar value: {}".format(value))
        if value > 0.5:
            return True
        return False
    

class RobotWrapper:
    def __init__(self, ip="127.0.0.1"):
        self.session = qi.Session()
        try:
            self.session.connect(ip)
        except RuntimeError:
            raise RuntimeError("Could not connect to robot at "+ ip +" ip adress.")
        self.motion = MotionService(self.session)
        self.leds = LedsService(self.session)
        self.tts = TTS(self.session)
        self.asr = ASRService(self.session)
        self.sensors = SensorServices(self.session)
        self.sonar = Sonar_Services(self.session)
        
    def cleanUp(self):
        """
        Clean up all active services.
        """
        print("Cleaning up the robot...")
        try:
            self.asr.stopRecognition()
            self.sensors.stopBumperDetection()
            self.sensors.stopHeadTouchDetection()
            self.sensors.stopHandLeftTouchDetection()
            self.sensors.stopHandRightTouchDetection()
            self.leds.fadeRGB('AllLeds', 100, 100, 100, 1)
        except Exception as e:
            print("Error during cleanup:", e)
        finally:
            print('Cleaning up done.')

