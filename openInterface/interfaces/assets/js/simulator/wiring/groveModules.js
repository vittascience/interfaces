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
},


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
    id: "lcdGrove",
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
    wireOrientation: "top",
    wirePosition: {
      GND: {
        x: 35,
        y: 8
      },
      VCC: {
        x: 38,
        y: 8
      },
      DATA2: {
        x: 41,
        y: 8
      },
      DATA1: {
        x: 44,
        y: 8
      },
    },
    x: 225,
    y: 190,
    picture: "grove-rotary-potentiometer.svg",
  },
  {
    id: "button",
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
    id: "multichannelV2",
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
    id: "mhz19-co2",
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
    id: ["bmp280-temp", "bmp280-press", "bmp280-alt"],
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
    id: ["dht-temp", "dht-hum"],
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
    picture: "TH02.svg",
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
    id: "ultrasonic",
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
    id: "groveMotion",
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
    id: "highTemp",
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
    id: "servo",
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
  }
];
