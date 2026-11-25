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
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 26.7,
        y: 38.5
      },
      VCC: {
        x: 22.2,
        y: 38.5
      },
      DATA2: {
        x: 17.7,
        y: 38.5
      },
      DATA1: {
        x: 13.1,
        y: 38.5
      },
    },
    picture: "variable-color-led.svg"
  },
  {
    id: ["lcdGrove", "lcd"],
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 37,
        y: 64.9
      },
      VCC: {
        x: 37,
        y: 69.4
      },
      DATA2: {
        x: 37,
        y: 73.9
      },
      DATA1: {
        x: 37,
        y: 78.7
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
        x: 19.3,
        y: 73
      },
      VCC: {
        x: 22.3,
        y: 73
      },
      DATA2: {
        x: 25.3,
        y: 73
      },
      DATA1: {
        x: 28.3,
        y: 73
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
        x: 10.0,
        y: 12.5
      },
      VCC: {
        x: 10.0,
        y: 17.0
      },
      DATA2: {
        x: 10.0,
        y: 21.6
      },
      DATA1: {
        x: 10.0,
        y: 26.1
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
        x: 47.3,
        y: 103
      },
      VCC: {
        x: 50.3,
        y: 103
      },
      DATA2: {
        x: 53.3,
        y: 103
      },
      DATA1: {
        x: 56.3,
        y: 103
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
        x: 0.7,
        y: 16.7
      },
      VCC: {
        x: 0.7,
        y: 21
      },
      DATA2: {
        x: 0.7,
        y: 25.5
      },
      DATA1: {
        x: 0.7,
        y: 29.6
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
        x: 73.5,
        y: 17
      },
      VCC: {
        x: 73.5,
        y: 20
      },
      DATA2: {
        x: 73.5,
        y: 23
      },
      DATA1: {
        x: 73.5,
        y: 26
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
        x: 29.2,
        y: 13.3
      },
      VCC: {
        x: 25.3,
        y: 13.3
      },
      DATA2: {
        x: 17.9,
        y: 13.3
      },
      DATA1: {
        x: 21.6,
        y: 13.3
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
        x: 10.8,
        y: 29.8
      },
      VCC: {
        x: 10.8,
        y: 25.4
      },
      DATA2: {
        x: 10.8,
        y: 21.1
      },
      DATA1: {
        x: 10.8,
        y: 16.8
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
        x: 24.3,
        y: 43
      },
      VCC: {
        x: 21.3,
        y: 43
      },
      DATA2: {
        x: 18.3,
        y: 43
      },
      DATA1: {
        x: 15.3,
        y: 43
      },
    },
    x: 225,
    y: 190,
    picture: "grove-rotary-potentiometer.svg",
  },
  {
    id: ["button", "reversedButton", "coloredButton", "digital-interrupt"],
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 26.5,
        y: 26.8
      },
      VCC: {
        x: 22.1,
        y: 26.8
      },
      DATA2: {
        x: 17.5,
        y: 26.8
      },
      DATA1: {
        x: 13.1,
        y: 26.8
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
        x: 13.1,
        y: 11.7
      },
      VCC: {
        x: 17.5,
        y: 11.7
      },
      DATA2: {
        x: 22.1,
        y: 11.7
      },
      DATA1: {
        x: 26.6,
        y: 11.7
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
        x: 8.3,
        y: 15.8
      },
      VCC: {
        x: 8.3,
        y: 20.2
      },
      DATA2: {
        x: 8.3,
        y: 24.8
      },
      DATA1: {
        x: 8.3,
        y: 29.2
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
        x: 17.2,
        y: 67.0
      },
      VCC: {
        x: 21.6,
        y: 67.0
      },
      DATA2: {
        x: 25.9,
        y: 67.0
      },
      DATA1: {
        x: 30.3,
        y: 67.0
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
        x: 17.3,
        y: 74
      },
      VCC: {
        x: 21.7,
        y: 74
      },
      DATA2: {
        x: 26.4,
        y: 74
      },
      DATA1: {
        x: 30.9,
        y: 74
      },
    },
    x: 330,
    y: 145,
    picture: "grove-SGP30.svg",
  },
  {
    id: "hm330x",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 13.7,
        y: 74.3
      },
      VCC: {
        x: 16.8,
        y: 74.3
      },
      DATA2: {
        x: 20.1,
        y: 74.3
      },
      DATA1: {
        x: 23.1,
        y: 74.3
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
        x: 17.2,
        y: 67.0
      },
      VCC: {
        x: 21.6,
        y: 67.0
      },
      DATA2: {
        x: 25.9,
        y: 67.0
      },
      DATA1: {
        x: 30.3,
        y: 67.0
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
        x: 16.9,
        y: 74.3
      },
      VCC: {
        x: 21.6,
        y: 74.3
      },
      DATA2: {
        x: 26.3,
        y: 74.3
      },
      DATA1: {
        x: 30.9,
        y: 74.3
      },
    },
    x: 225,
    y: 160,
    picture: "multichannel-sensorV2.svg",
  },
  {
    id: ["mhz19-co2", "mhz19-temp"],
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 168.5,
        y: 3.6
      },
      VCC: {
        x: 171,
        y: 3.6
      },
      DATA2: {
        x: 173.5,
        y: 3.6
      },
      DATA1: {
        x: 176,
        y: 3.6
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
        x: 20.8,
        y: 90.5
      },
      VCC: {
        x: 26,
        y: 90.5
      },
      DATA2: {
        x: 31.5,
        y: 90.5
      },
      DATA1: {
        x: 36.8,
        y: 90.5
      },
    },
    x: 386,
    y: 145,
    picture: "grove-BMP280.svg",
  },
  {
    id: "groveTemp",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 29.8,
        y: 6.8
      },
      VCC: {
        x: 25.4,
        y: 6.8
      },
      DATA2: {
        x: 21.1,
        y: 6.8
      },
      DATA1: {
        x: 16.7,
        y: 6.8
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
        x: 17.5,
        y: 67.1
      },
      VCC: {
        x: 21.9,
        y: 67.1
      },
      DATA2: {
        x: 26.2,
        y: 67.1
      },
      DATA1: {
        x: 30.5,
        y: 67.1
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
        x: 28.2,
        y: 0.5
      },
      VCC: {
        x: 24,
        y: 0.5
      },
      DATA2: {
        x: 19.5,
        y: 0.5
      },
      DATA1: {
        x: 15.2,
        y: 0.5
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
        x: 35,
        y: 39.4
      },
      VCC: {
        x: 38.1,
        y: 39.4
      },
      DATA2: {
        x: 41.3,
        y: 39.4
      },
      DATA1: {
        x: 44.4,
        y: 39.4
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
        x: 18.9,
        y: 26.5
      },
      VCC: {
        x: 18.9,
        y: 22.1
      },
      DATA2: {
        x: 18.9,
        y: 17.7
      },
      DATA1: {
        x: 18.9,
        y: 13.4
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
        x: 17.1,
        y: 84.8
      },
      VCC: {
        x: 21.6,
        y: 84.8
      },
      DATA2: {
        x: 26.1,
        y: 84.8
      },
      DATA1: {
        x: 30.6,
        y: 84.8
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
        x: 6.5,
        y: 15.5
      },
      VCC: {
        x: 6.5,
        y: 19.9
      },
      DATA2: {
        x: 6.5,
        y: 24.2
      },
      DATA1: {
        x: 6.5,
        y: 28.4
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
        x: 16.7,
        y: 105.5
      },
      VCC: {
        x: 21.1,
        y: 105.5
      },
      DATA2: {
        x: 25.7,
        y: 105.5
      },
      DATA1: {
        x: 30.2,
        y: 105.5
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
        x: 7.4,
        y: 16.5
      },
      VCC: {
        x: 7.4,
        y: 20.8
      },
      DATA2: {
        x: 7.4,
        y: 25.2
      },
      DATA1: {
        x: 7.4,
        y: 29.5
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
        x: 17.2,
        y: 67.9
      },
      VCC: {
        x: 21.5,
        y: 67.9
      },
      DATA2: {
        x: 25.9,
        y: 67.9
      },
      DATA1: {
        x: 30.2,
        y: 67.9
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
        x: 29.7,
        y: 7.1
      },
      VCC: {
        x: 25.4,
        y: 7.1
      },
      DATA2: {
        x: 21.1,
        y: 7.1
      },
      DATA1: {
        x: 16.7,
        y: 7.1
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
        x: 17.0,
        y: 67.3
      },
      VCC: {
        x: 21.6,
        y: 67.3
      },
      DATA2: {
        x: 26.0,
        y: 67.3
      },
      DATA1: {
        x: 30.5,
        y: 67.3
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
        x: 17.2,
        y: 81.3
      },
      VCC: {
        x: 21.6,
        y: 81.3
      },
      DATA2: {
        x: 26.0,
        y: 81.2
      },
      DATA1: {
        x: 30.3,
        y: 81.2
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
        y: 14.5
      },
      VCC: {
        x: 90,
        y: 17.5
      },
      DATA2: {
        x: 90,
        y: 20.5
      },
      DATA1: {
        x: 90,
        y: 23.5
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
        x: 30.6,
        y: 6.8
      },
      VCC: {
        x: 26.0,
        y: 6.8
      },
      DATA2: {
        x: 21.6,
        y: 6.8
      },
      DATA1: {
        x: 17.1,
        y: 6.8
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
        x: 17.3,
        y: 81.2
      },
      VCC: {
        x: 21.8,
        y: 81.2
      },
      DATA2: {
        x: 26.4,
        y: 81.2
      },
      DATA1: {
        x: 30.9,
        y: 81.2
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
        x: 35.7,
        y: 58.5
      },
      VCC: {
        x: 28.1,
        y: 58.5
      },
      DATA2: {
        x: 20.4,
        y: 58.5
      },
      DATA1: {
        x: 12.6,
        y: 58.5
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
        x: 17.0,
        y: 67.0
      },
      VCC: {
        x: 21.4,
        y: 67.0
      },
      DATA2: {
        x: 25.8,
        y: 67.0
      },
      DATA1: {
        x: 30.1,
        y: 67.0
      },
    },
    picture: "relay.svg",
  },
  {
    id: "electromagnet",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 17.2,
        y: 67.4
      },
      VCC: {
        x: 21.6,
        y: 67.4
      },
      DATA2: {
        x: 26.0,
        y: 67.4
      },
      DATA1: {
        x: 30.3,
        y: 67.4
      },
    },
    picture: "electromagnet.svg",
  },
  {
    id: "vibrationMotor",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 12.6,
        y: 18.7
      },
      VCC: {
        x: 17.1,
        y: 18.7
      },
      DATA2: {
        x: 21.6,
        y: 18.7
      },
      DATA1: {
        x: 26.1,
        y: 18.7
      },
    },
    picture: "vibration-motor.svg",
  },
  {
    id: "fan",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 17.5,
        y: 84.8
      },
      VCC: {
        x: 21.9,
        y: 84.8
      },
      DATA2: {
        x: 26.5,
        y: 84.8
      },
      DATA1: {
        x: 31.1,
        y: 84.8
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
        x: 26.5,
        y: 60.2
      },
      VCC: {
        x: 29.5,
        y: 60.2
      },
      DATA2: {
        x: 32.5,
        y: 60.2
      },
      DATA1: {
        x: 35.5,
        y: 60.2
      },
    },
    picture: "led-matrix.svg",
  },
  {
    id: "RGBLEDMatrix",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 26.5,
        y: 60.3
      },
      VCC: {
        x: 29.5,
        y: 60.3
      },
      DATA2: {
        x: 32.5,
        y: 60.3
      },
      DATA1: {
        x: 35.5,
        y: 60.3
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
    wireOrientation: "left",
    wirePosition: {
      GND: {
        x: 6.5,
        y: 15.8
      },
      VCC: {
        x: 6.5,
        y: 20.3
      },
      DATA2: {
        x: 6.5,
        y: 24.8
      },
      DATA1: {
        x: 6.5,
        y: 29.2
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
        x: 6.4,
        y: 48.5
      },
      VCC: {
        x: 11.5,
        y: 48.5
      },
      DATA2: {
        x: 8.9,
        y: 48.5
      },
      DATA1: {
        x: 14.1,
        y: 48.5
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
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 30.4,
        y: 12.2
      },
      VCC: {
        x: 25.9,
        y: 12.2
      },
      DATA2: {
        x: 16.8,
        y: 12.2
      },
      DATA1: {
        x: 21.4,
        y: 12.2
      },
    },
    picture: "gps.svg",
  },
  {
    id: "rfidReader",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 17.5,
        y: 19.7
      },
      VCC: {
        x: 21.9,
        y: 19.7
      },
      DATA2: {
        x: 30.6,
        y: 19.7
      },
      DATA1: {
        x: 26.3,
        y: 19.7
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
        x: 14.8,
        y: 46
      },
      VCC: {
        x: 6,
        y: 46
      },
      DATA2: {
        x: 32.3,
        y: 46
      },
      DATA1: {
        x: 23.5,
        y: 46
      },
    },
    picture: "si1145.svg",
  },
  {
    id: "gestureSensor",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 17.9,
        y: 39.5
      },
      VCC: {
        x: 22.1,
        y: 39.5
      },
      DATA2: {
        x: 26.5,
        y: 39.5
      },
      DATA1: {
        x: 30.6,
        y: 39.5
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
        x: 17.3,
        y: 67.0
      },
      VCC: {
        x: 21.6,
        y: 67.0
      },
      DATA2: {
        x: 30.4,
        y: 67.0
      },
      DATA1: {
        x: 26.0,
        y: 67.0
      },
    },
    picture: "mp3.svg",
  },
  {
    id: "groveBT",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 17.3,
        y: 67.0
      },
      VCC: {
        x: 21.6,
        y: 67.0
      },
      DATA2: {
        x: 30.4,
        y: 67.0
      },
      DATA1: {
        x: 26.0,
        y: 67.0
      },
    },
    picture: "grove-serial-bluetooth.svg",
  },
  {
    id: "hc05",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 16.5,
        y: 71.5
      },
      VCC: {
        x: 20.3,
        y: 71.5
      },
      DATA2: {
        x: 12.4,
        y: 71.5
      },
      DATA1: {
        x: 8.5,
        y: 71.5
      },
    },
    picture: "hc-05.svg",
  },
  {
    id: "hm10",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 16.5,
        y: 71.5
      },
      VCC: {
        x: 20.4,
        y: 71.5
      },
      DATA2: {
        x: 12.3,
        y: 71.5
      },
      DATA1: {
        x: 8.6,
        y: 71.5
      },
    },
    picture: "hm-10.svg",
  },
  {
    id: "groveWater",
    wireOrientation: "bottom",
    wirePosition: {
      GND: {
        x: 17.3,
        y: 66.0
      },
      VCC: {
        x: 21.6,
        y: 66.0
      },
      DATA2: {
        x: 26.0,
        y: 66.0
      },
      DATA1: {
        x: 30.4,
        y: 66.0
      },
    },
    picture: "water-sensor.svg",
  },
  {
    id: "joystick",
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 30.5,
        y: 11.3
      },
      VCC: {
        x: 26.0,
        y: 11.3
      },
      DATA2: {
        x: 21.5,
        y: 11.3
      },
      DATA1: {
        x: 16.9,
        y: 11.3
      },
    },
    picture: "joystick.svg",
  }
];
