WiringSimulator.i2c.hubs = {
  'groveHub-4': {
    size: 0.11,
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20,
        y: 61
      },
      VCC: {
        x: 23,
        y: 61
      },
      DATA2: {
        x: 26,
        y: 61
      },
      DATA1: {
        x: 29,
        y: 61
      },
    },
    ports: {
      0: {
        x: -5,
        y: -26,
      },
      1: {
        x: -5,
        y: -10,
      },
      2: {
        x: -5,
        y: 6,
      }
    },
    picture: "i2c-hub-4-grove.svg"
  },
  'groveHub-6': {
    size: 0.11,
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20,
        y: 70
      },
      VCC: {
        x: 23,
        y: 70
      },
      DATA2: {
        x: 26,
        y: 70
      },
      DATA1: {
        x: 29,
        y: 70
      },
    },
    ports: {
      0: {
        x: -5,
        y: -26,
      },
      1: {
        x: -5,
        y: -13,
      },
      2: {
        x: -5,
        y: -3,
      },
      3: {
        x: -5,
        y: 9,
      },
      4: {
        x: -5,
        y: 22,
      }
    },
    picture: "i2c-hub-6-grove.svg"
  }
};

WiringSimulator.groveDefinitions = [
  // Display modules
  {
    id: "colorVariableLed",
    x: 20,
    y: 20,
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 15,
        y: 5
      },
      VCC: {
        x: 18,
        y: 5
      },
      DATA2: {
        x: 21,
        y: 5
      },
      DATA1: {
        x: 24,
        y: 5
      },
    },
    picture: "led.svg"
  },
  {
    id: ["lcdGrove", "lcd"],
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 40,
        y: 69
      },
      VCC: {
        x: 40,
        y: 72
      },
      DATA2: {
        x: 40,
        y: 75
      },
      DATA1: {
        x: 40,
        y: 78
      },
    },
    x: 20,
    y: 180,
    picture: "lcd-grove.svg",
  },
  {
    id: "oled",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 70
      },
      VCC: {
        x: 18,
        y: 70
      },
      DATA2: {
        x: 21,
        y: 70
      },
      DATA1: {
        x: 24,
        y: 70
      },
    },
    x: 10,
    y: 10,
    picture: "oled.svg",
  },
  {
    id: "ledModule",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 10,
        y: 15
      },
      VCC: {
        x: 10,
        y: 18
      },
      DATA2: {
        x: 10,
        y: 21
      },
      DATA1: {
        x: 10,
        y: 24
      },
    },
    x: 350,
    y: 160,
    picture: "led-module.svg",
  },
  {
    id: "neopixel",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 36,
        y: 80
      },
      VCC: {
        x: 39,
        y: 80
      },
      DATA2: {
        x: 42,
        y: 80
      },
      DATA1: {
        x: 45,
        y: 80
      },
    },
    x: 300,
    y: 180,
    w: 80,
    h: 80,
    picture: "neopixel.svg",
  },
  {
    id: "RGBLed",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 10,
        y: 15
      },
      VCC: {
        x: 10,
        y: 18
      },
      DATA2: {
        x: 10,
        y: 21
      },
      DATA1: {
        x: 10,
        y: 24
      },
    },
    x: 240,
    y: 140,
    picture: "rgb-led.svg",
  },
  {
    id: "tm1637",
    wireOrientation: "right",
    wirePosition: {
      GND: {
        x: 70,
        y: 15
      },
      VCC: {
        x: 70,
        y: 18
      },
      DATA2: {
        x: 70,
        y: 21
      },
      DATA1: {
        x: 70,
        y: 24
      },
    },
    x: 200,
    y: 180,
    picture: "4-digit-display.svg",
  },
  {
    id: "ledBar",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 15,
        y: 15
      },
      VCC: {
        x: 18,
        y: 15
      },
      DATA2: {
        x: 21,
        y: 15
      },
      DATA1: {
        x: 24,
        y: 15
      },
    },
    x: 250,
    y: 180,
    picture: "led-bar.svg",
  },
  // IO modules
  {
    id: "slide-potentiometer",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 12,
        y: 20
      },
      VCC: {
        x: 12,
        y: 23
      },
      DATA2: {
        x: 12,
        y: 26
      },
      DATA1: {
        x: 12,
        y: 29
      },
    },
    x: 225,
    y: 180,
    picture: "slide-potentiometer.svg",
  },
  {
    id: ["read-analog", "potentiometer"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 16,
        y: 46
      },
      VCC: {
        x: 19,
        y: 46
      },
      DATA2: {
        x: 22,
        y: 46
      },
      DATA1: {
        x: 25,
        y: 46
      },
    },
    size: 0.11,
    x: 225,
    y: 190,
    picture: "grove-rotary-potentiometer.svg",
  },
  {
    id: ["button", "reversedButton", "coloredButton", "digital-interrupt"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 25
      },
      VCC: {
        x: 18,
        y: 25
      },
      DATA2: {
        x: 21,
        y: 25
      },
      DATA1: {
        x: 24,
        y: 25
      },
    },
    x: 225,
    y: 180,
    picture: "button.svg",
  },
  {
    id: "switchButton",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 16,
        y: 10
      },
      VCC: {
        x: 19,
        y: 10
      },
      DATA2: {
        x: 22,
        y: 10
      },
      DATA1: {
        x: 25,
        y: 10
      },
    },
    x: 225,
    y: 175,
    picture: "switch.svg",
  },

  {
    id: "touchButton",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 10,
        y: 15
      },
      VCC: {
        x: 10,
        y: 18
      },
      DATA2: {
        x: 10,
        y: 21
      },
      DATA1: {
        x: 10,
        y: 24
      },
    },
    x: 240,
    y: 165,
    picture: "touch-sensor.svg",
  },
  // Communication modules
  {
    id: "rtc",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 16,
        y: 65
      },
      VCC: {
        x: 19,
        y: 65
      },
      DATA2: {
        x: 22,
        y: 65
      },
      DATA1: {
        x: 25,
        y: 65
      },
    },
    x: 240,
    y: 195,
    picture: "clock-rtc.svg",
  },
  // Sensor modules
  {
    id: "sgp30",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 21,
        y: 74
      },
      VCC: {
        x: 24,
        y: 74
      },
      DATA2: {
        x: 27,
        y: 74
      },
      DATA1: {
        x: 30,
        y: 74
      },
    },
    size: 0.11,
    x: 330,
    y: 145,
    picture: "grove-SGP30.svg",
  },
  {
    id: "hm330x",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 10,
        y: 35
      },
      VCC: {
        x: 10,
        y: 38
      },
      DATA2: {
        x: 10,
        y: 41
      },
      DATA1: {
        x: 10,
        y: 44
      },
    },
    x: 330,
    y: 62,
    picture: "grove-HM330x.svg",
  },
  {
    id: "dioxygen",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 400,
    y: 180,
    picture: "oxygen-sensor.svg",
  },
  {
    id: ["multichannelV2", "multichannel"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 19,
        y: 80
      },
      VCC: {
        x: 22,
        y: 80
      },
      DATA2: {
        x: 25,
        y: 80
      },
      DATA1: {
        x: 28,
        y: 80
      },
    },
    x: 225,
    y: 160,
    picture: "multichannel-sensorV2.svg",
  },
  {
    id: ["mhz19-co2", "mhz19-temp"],
    wireOrientation: "right",
    wirePosition: {
      GND: {
        x: 200,
        y: 18
      },
      VCC: {
        x: 200,
        y: 21
      },
      DATA2: {
        x: 200,
        y: 24
      },
      DATA1: {
        x: 200,
        y: 27
      },
    },
    x: 225,
    y: 145,
    w: 200,
    h: 40,
    picture: "mh-z19.svg",
  },
  {
    id: ["bmp280-temp", "bmp280-press", "bmp280-alt", "bme280-temp", "bme280-hum", "bme280-press", "bme280-alt"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 21,
        y: 74
      },
      VCC: {
        x: 24,
        y: 74
      },
      DATA2: {
        x: 27,
        y: 74
      },
      DATA1: {
        x: 30,
        y: 74
      },
    },
    size: 0.09,
    x: 386,
    y: 145,
    picture: "grove-BMP280.svg",
  },
  {
    id: "groveTemp",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 15,
        y: 13
      },
      VCC: {
        x: 18,
        y: 13
      },
      DATA2: {
        x: 21,
        y: 13
      },
      DATA1: {
        x: 24,
        y: 13
      },
    },
    x: 225,
    y: 150,
    picture: "temp-sensor.svg",
  },
  {
    id: ["dht-temp", "dht-hum", "dht11-temp", "dht11-hum"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 225,
    y: 190,
    picture: "DHT11.svg",
  },
  {
    id: ["th02-temp", "th02-hum"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 225,
    y: 195,
    picture: "TH02.svg",
  },
  {
    id: ["sht31-temp", "sht31-hum"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 225,
    y: 200,
    picture: "SHT31.svg",
  },
  {
    id: "groveMoisture",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 15,
        y: 22
      },
      VCC: {
        x: 18,
        y: 22
      },
      DATA2: {
        x: 21,
        y: 22
      },
      DATA1: {
        x: 24,
        y: 22
      },
    },
    x: 225,
    y: 180,
    picture: "moisture-sensor.svg",
  },
  {
    id: ["ultrasonic", "hcsr04"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 45,
        y: 45
      },
      VCC: {
        x: 48,
        y: 45
      },
      DATA2: {
        x: 51,
        y: 45
      },
      DATA1: {
        x: 54,
        y: 45
      },
    },
    x: 225,
    y: 160,
    picture: "ultrasonic-sensor.svg",
  },
  {
    id: "groveTilt",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 15,
        y: 15
      },
      VCC: {
        x: 15,
        y: 18
      },
      DATA2: {
        x: 15,
        y: 21
      },
      DATA1: {
        x: 15,
        y: 24
      },
    },
    x: 225,
    y: 170,
    picture: "tilt-sensor.svg",
  },
  {
    id: "groveVibration",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 31,
        y: 112
      },
      VCC: {
        x: 34,
        y: 112
      },
      DATA2: {
        x: 37,
        y: 112
      },
      DATA1: {
        x: 40,
        y: 112
      },
    },
    x: 400,
    y: 20,
    w: 150,
    h: 120,
    picture: "pietzo.svg",
  },
  {
    id: "groveForce",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 20,
        y: 14
      },
      VCC: {
        x: 20,
        y: 17
      },
      DATA2: {
        x: 20,
        y: 20
      },
      DATA1: {
        x: 20,
        y: 23
      },
    },
    x: 225,
    y: 185,
    picture: "force-sensor.svg",
  },
  {
    id: "mpx5700",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 21,
        y: 90
      },
      VCC: {
        x: 24,
        y: 90
      },
      DATA2: {
        x: 27,
        y: 90
      },
      DATA1: {
        x: 30,
        y: 90
      },
    },
    x: 240,
    y: 150,
    picture: "MPX-5700-sensor.svg",
  },
  {
    id: "groveLight",
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 10,
        y: 15
      },
      VCC: {
        x: 10,
        y: 18
      },
      DATA2: {
        x: 10,
        y: 21
      },
      DATA1: {
        x: 10,
        y: 24
      },
    },
    x: 225,
    y: 205,
    picture: "light-sensor.svg",
  },
  {
    id: "colorSensor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 225,
    y: 210,
    picture: "color-sensor.svg",
  },
  {
    id: "groveSound",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 16,
        y: 10
      },
      VCC: {
        x: 19,
        y: 10
      },
      DATA2: {
        x: 22,
        y: 10
      },
      DATA1: {
        x: 25,
        y: 10
      },
    },
    x: 240,
    y: 210,
    picture: "sound-sensor.svg",
  },
  {
    id: ["groveMotion", "groveMotionMini", "grovePIRMotion"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    x: 240,
    y: 205,
    picture: "motion-sensor.svg",
  },
  {
    id: ["highTemp", "highTemp-room", "highTemp-thmc"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 16,
        y: 85
      },
      VCC: {
        x: 19,
        y: 85
      },
      DATA2: {
        x: 22,
        y: 85
      },
      DATA1: {
        x: 25,
        y: 85
      },
    },
    x: 240,
    y: 200,
    picture: "high-temp-sensor.svg",
  },
  // actuators
  {
    id: ["servo", "continuousServo"],
    wireOrientation: "right",
    wirePosition: {
      GND: {
        x: 90,
        y: 13
      },
      VCC: {
        x: 90,
        y: 16
      },
      DATA2: {
        x: 90,
        y: 19
      },
      DATA1: {
        x: 90,
        y: 22
      },
    },
    x: 240,
    y: 190,
    picture: "servo-motor.svg",
  },
  {
    id: "buzzer",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 15,
        y: 10
      },
      VCC: {
        x: 18,
        y: 10
      },
      DATA2: {
        x: 21,
        y: 10
      },
      DATA1: {
        x: 24,
        y: 10
      },
    },
    x: 240,
    y: 185,
    picture: "grove-buzzer.svg",
  },
  {
    id: "atomizer",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 24,
        y: 95
      },
      VCC: {
        x: 27,
        y: 95
      },
      DATA2: {
        x: 30,
        y: 95
      },
      DATA1: {
        x: 33,
        y: 95
      },
    },
    x: 240,
    y: 175,
    picture: "water-atomizer.svg",
  },
  {
    id: "openlog",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 45,
        y: 70
      },
      VCC: {
        x: 35,
        y: 70
      },
      DATA2: {
        x: 15,
        y: 70
      },
      DATA1: {
        x: 25,
        y: 70
      },
    },
    x: 240,
    y: 185,
    picture: "openlog.svg"
  },
  // Generated pictures (Grove style)
  {
    id: "relay",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 54.8
      },
      VCC: {
        x: 18.5,
        y: 54.8
      },
      DATA2: {
        x: 21.5,
        y: 54.8
      },
      DATA1: {
        x: 24.5,
        y: 54.8
      },
    },
    picture: "relay.svg",
  },
  {
    id: "electromagnet",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 54.8
      },
      VCC: {
        x: 18.5,
        y: 54.8
      },
      DATA2: {
        x: 21.5,
        y: 54.8
      },
      DATA1: {
        x: 24.5,
        y: 54.8
      },
    },
    picture: "electromagnet.svg",
  },
  {
    id: "vibrationMotor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "vibration-motor.svg",
  },
  {
    id: "fan",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20.5,
        y: 54.8
      },
      VCC: {
        x: 23.5,
        y: 54.8
      },
      DATA2: {
        x: 26.5,
        y: 54.8
      },
      DATA1: {
        x: 29.5,
        y: 54.8
      },
    },
    picture: "fan.svg",
  },
  {
    id: "motor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20.5,
        y: 34.8
      },
      VCC: {
        x: 23.5,
        y: 34.8
      },
      DATA2: {
        x: 26.5,
        y: 34.8
      },
      DATA1: {
        x: 29.5,
        y: 34.8
      },
    },
    picture: "motor.svg",
  },
  {
    id: ["stepper28BYJ48", "stepper-motor"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 35.5,
        y: 44.8
      },
      VCC: {
        x: 38.5,
        y: 44.8
      },
      DATA2: {
        x: 41.5,
        y: 44.8
      },
      DATA1: {
        x: 44.5,
        y: 44.8
      },
    },
    picture: "stepper.svg",
  },
  {
    id: "LEDMatrix",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 25.5,
        y: 54.8
      },
      VCC: {
        x: 28.5,
        y: 54.8
      },
      DATA2: {
        x: 31.5,
        y: 54.8
      },
      DATA1: {
        x: 34.5,
        y: 54.8
      },
    },
    picture: "led-matrix.svg",
  },
  {
    id: "RGBLEDMatrix",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 25.5,
        y: 54.8
      },
      VCC: {
        x: 28.5,
        y: 54.8
      },
      DATA2: {
        x: 31.5,
        y: 54.8
      },
      DATA1: {
        x: 34.5,
        y: 54.8
      },
    },
    picture: "rgb-led-matrix.svg",
  },
  {
    id: "groveFinder",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "line-finder.svg",
  },
  {
    id: "obstacleDetector",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "ir-obstacle.svg",
  },
  {
    id: "distanceInterrupter",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "distance-interrupter.svg",
  },
  {
    id: "remote",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "ir-receiver.svg",
  },
  {
    id: "airQuality",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "air-quality-sensor.svg",
  },
  {
    id: "mq135",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "mq135.svg",
  },
  {
    id: "groveUV",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "uv-sensor.svg",
  },
  {
    id: ["groveEarClip", "grovePulse"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 30.5,
        y: 34.8
      },
      VCC: {
        x: 33.5,
        y: 34.8
      },
      DATA2: {
        x: 36.5,
        y: 34.8
      },
      DATA1: {
        x: 39.5,
        y: 34.8
      },
    },
    picture: "ear-clip.svg",
  },
  {
    id: "groveVoltageDivider",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "voltage-divider.svg",
  },
  {
    id: "rainGauge",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20.5,
        y: 54.8
      },
      VCC: {
        x: 23.5,
        y: 54.8
      },
      DATA2: {
        x: 26.5,
        y: 54.8
      },
      DATA1: {
        x: 29.5,
        y: 54.8
      },
    },
    picture: "rain-gauge.svg",
  },
  {
    id: "anemometer",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20.5,
        y: 54.8
      },
      VCC: {
        x: 23.5,
        y: 54.8
      },
      DATA2: {
        x: 26.5,
        y: 54.8
      },
      DATA1: {
        x: 29.5,
        y: 54.8
      },
    },
    picture: "anemometer.svg",
  },
  {
    id: "groveRain",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 64.8
      },
      VCC: {
        x: 18.5,
        y: 64.8
      },
      DATA2: {
        x: 21.5,
        y: 64.8
      },
      DATA1: {
        x: 24.5,
        y: 64.8
      },
    },
    picture: "rain-sensor.svg",
  },
  {
    id: "groveCapacitiveMoisture",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 10.5,
        y: 5.2
      },
      VCC: {
        x: 13.5,
        y: 5.2
      },
      DATA2: {
        x: 16.5,
        y: 5.2
      },
      DATA1: {
        x: 19.5,
        y: 5.2
      },
    },
    picture: "capacitive-moisture.svg",
  },
  {
    id: ["dht22-temp", "dht22-hum"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 54.8
      },
      VCC: {
        x: 18.5,
        y: 54.8
      },
      DATA2: {
        x: 21.5,
        y: 54.8
      },
      DATA1: {
        x: 24.5,
        y: 54.8
      },
    },
    picture: "dht22.svg",
  },
  {
    id: "ds18x20",
    wireOrientation: "right",
    wirePosition: {
      GND: {
        x: 82.0,
        y: 10.5
      },
      VCC: {
        x: 82.0,
        y: 13.5
      },
      DATA2: {
        x: 82.0,
        y: 16.5
      },
      DATA1: {
        x: 82.0,
        y: 19.5
      },
    },
    picture: "ds18b20.svg",
  },
  {
    id: "dustSensor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 30.5,
        y: 44.8
      },
      VCC: {
        x: 33.5,
        y: 44.8
      },
      DATA2: {
        x: 36.5,
        y: 44.8
      },
      DATA1: {
        x: 39.5,
        y: 44.8
      },
    },
    picture: "dust-sensor.svg",
  },
  {
    id: "rotaryEncoder",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "rotary-encoder.svg",
  },
  {
    id: ["gps", "bn880"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 54.8
      },
      VCC: {
        x: 18.5,
        y: 54.8
      },
      DATA2: {
        x: 21.5,
        y: 54.8
      },
      DATA1: {
        x: 24.5,
        y: 54.8
      },
    },
    picture: "gps.svg",
  },
  {
    id: "rfidReader",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 25.5,
        y: 54.8
      },
      VCC: {
        x: 28.5,
        y: 54.8
      },
      DATA2: {
        x: 31.5,
        y: 54.8
      },
      DATA1: {
        x: 34.5,
        y: 54.8
      },
    },
    // Grove 125kHz RFID reader: serial module, its mosaic definition has no pin.
    connection: "UART",
    picture: "rfid.svg",
  },
  {
    id: ["scd30-co2", "scd30-temp", "scd30-hum"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 20.5,
        y: 34.8
      },
      VCC: {
        x: 23.5,
        y: 34.8
      },
      DATA2: {
        x: 26.5,
        y: 34.8
      },
      DATA1: {
        x: 29.5,
        y: 34.8
      },
    },
    picture: "scd30.svg",
  },
  {
    id: "si1145",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "si1145.svg",
  },
  {
    id: "gestureSensor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "gesture.svg",
  },
  {
    id: "mlx90621",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "mlx90621.svg",
  },
  {
    id: ["i2cMotor1", "i2cMotor2", "i2cMotorStepper"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 25.5,
        y: 44.8
      },
      VCC: {
        x: 28.5,
        y: 44.8
      },
      DATA2: {
        x: 31.5,
        y: 44.8
      },
      DATA1: {
        x: 34.5,
        y: 44.8
      },
    },
    picture: "i2c-motor-driver.svg",
  },
  {
    id: "groveMP3",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 34.8
      },
      VCC: {
        x: 18.5,
        y: 34.8
      },
      DATA2: {
        x: 21.5,
        y: 34.8
      },
      DATA1: {
        x: 24.5,
        y: 34.8
      },
    },
    picture: "mp3.svg",
  },
  {
    id: ["groveBT", "hc05", "hm10"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15.5,
        y: 54.8
      },
      VCC: {
        x: 18.5,
        y: 54.8
      },
      DATA2: {
        x: 21.5,
        y: 54.8
      },
      DATA1: {
        x: 24.5,
        y: 54.8
      },
    },
    picture: "bluetooth.svg",
  },
  {
    id: "groveWater",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 15,
        y: 65
      },
      VCC: {
        x: 18,
        y: 65
      },
      DATA2: {
        x: 21,
        y: 65
      },
      DATA1: {
        x: 24,
        y: 65
      },
    },
    picture: "water-sensor.svg",
  },
  {
    id: "joystick",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 36,
        y: 4
      },
      VCC: {
        x: 38.5,
        y: 4
      },
      DATA2: {
        x: 41,
        y: 4
      },
      DATA1: {
        x: 43.5,
        y: 4
      },
    },
    picture: "joystick.svg",
  }
];
