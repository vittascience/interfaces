/**
 * Grove shields (or boards with Grove ports) of the wiring simulator, chosen by each interface in its groveShield.js.
 * Positions are in px, relative to the centre of the shield drawn at SIZE.
 * - pins: Grove ports by pin name (several pins of a same port share the same object), 'UART', and 'I2C' ports list.
 *   A pin with 'header: true' has no Grove connector: only the signal wire goes there, power wires going to 'power'.
 *   'side' forces the side the wires come from (default: shield 'wireSide', otherwise the side of the module).
 * - portOrientation: 'vertical' when the pins of a Grove port are stacked vertically, otherwise 'horizontal' ('vertical'
 *   on a port overrides it).
 */
(function () {
  const media = (path) => `${CDN_PATH}/openInterface/${path}`;

  // Arduino Uno Grove Base Shield (Arduino Uno, Arduino UNO Q, Nucleo, Vittascience ESP32, Wemos D1 R32).
  const uno = {
    IMG_LINK: media("interfaces/assets/media/simulator/wiring/shields/arduino_uno_grove_shield.svg"),
    SIZE: { w: 138, h: 106 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      A0: { x: -55, y: 20 },
      A1: { x: -55, y: 0 },
      A2: { x: -55, y: -20 },
      A3: { x: -55, y: -40 },
      0: { x: 45, y: -35 },
      2: { x: 20, y: -35 },
      3: { x: -5, y: -35 },
      4: { x: -30, y: -35 },
      5: { x: 45, y: -5 },
      6: { x: 20, y: -5 },
      7: { x: -5, y: -5 },
      8: { x: -30, y: -5 },
      // Pins without Grove connector: wired on the board headers (signal), with the power wires on 5V and GND.
      9: { x: 8.2, y: -47.9, header: true, side: 'top' },
      10: { x: 3.4, y: -47.9, header: true, side: 'top' },
      11: { x: -1.5, y: -47.9, header: true, side: 'top' },
      12: { x: -6.5, y: -47.9, header: true, side: 'top' },
      13: { x: -11.6, y: -47.9, header: true, side: 'top' },
      A4: { x: 53.1, y: 46.5, header: true, side: 'bottom' },
      A5: { x: 58.2, y: 46.5, header: true, side: 'bottom' },
      I2C: {
        0: { x: 45, y: 21 },
        1: { x: 20, y: 21 },
        2: { x: -5, y: 21 },
        3: { x: -30, y: 21 }
      }
    },
    power: {
      VCC: { x: 10, y: 46.5, side: 'bottom' },
      GND: { x: 15, y: 46.5, side: 'bottom' }
    }
  };
  uno.pins[1] = uno.pins.UART = uno.pins[0];

  // Grove shield for micro:bit, also for the boards with a micro:bit edge connector.
  const microbitPins = () => {
    const pins = {
      0: { x: -15, y: 58 },
      1: { x: 9, y: 58 },
      2: { x: 35, y: 58 },
      // Edge pads of the shield, without Grove connector: wired with the signal wire only, power on GND and 3V3 pads.
      8: { x: -59.7, y: -40.7, header: true, side: 'left' },
      12: { x: -59.7, y: 40.7, header: true, side: 'left' },
      13: { x: -59.7, y: 59, header: true, side: 'left' },
      I2C: {
        0: { x: -42, y: 58 }
      }
    };
    // Second signal of the P0/P14, P1/P15 and P2/P16 Grove ports.
    pins[14] = pins[0];
    pins[15] = pins[1];
    pins[16] = pins[2];
    return pins;
  };
  const microbit = (picture) => ({
    IMG_LINK: media("interfaces/assets/media/simulator/wiring/shields/" + picture),
    SIZE: { w: 140, h: 137 },
    INITIAL_POS_PERCENT: { x: 50, y: 35 },
    portOrientation: 'horizontal',
    wireSide: 'bottom',
    pins: microbitPins(),
    power: {
      VCC: { x: 59.4, y: -57.8, side: 'right' },
      GND: { x: -59.7, y: -57.8, side: 'left' }
    }
  });

  // Grove shield for Arduino Nano (Arduino Nano, Arduino Nano ESP32), pins named 'D2', 'A0'...
  const nanoShield = (picture) => {
    const nano = {
      IMG_LINK: media(picture),
      SIZE: { w: 140, h: 124.6 },
      INITIAL_POS_PERCENT: { x: 50, y: 50 },
      portOrientation: 'horizontal',
      pins: {
        D2: { x: -53.9, y: -49.7, side: 'top' },
        D4: { x: -20.3, y: -49.7, side: 'top' },
        D6: { x: 13.4, y: -49.7, side: 'top' },
        UART: { x: 47.2, y: -49.7, side: 'top' },
        A0: { x: -53.9, y: 49.6, side: 'bottom' },
        A2: { x: -20.3, y: 49.6, side: 'bottom' },
        A6: { x: 13.4, y: 49.6, side: 'bottom' },
        D8: { x: -21.4, y: -36, header: true, side: 'top' },
        D9: { x: -29.2, y: -36, header: true, side: 'top' },
        D10: { x: -36.9, y: -36, header: true, side: 'top' },
        D11: { x: -44.8, y: -36, header: true, side: 'top' },
        D12: { x: -52.6, y: -36, header: true, side: 'top' },
        D13: { x: -52.6, y: 34.6, header: true, side: 'bottom' },
        I2C: {
          0: { x: 47.2, y: 49.6, side: 'bottom' }
        }
      },
      power: {
        VCC: { x: 33, y: 34.6, side: 'bottom' },
        GND: { x: 48.6, y: 34.6, side: 'bottom' }
      }
    };
    Object.assign(nano.pins, {
      D3: nano.pins.D2, D5: nano.pins.D4, D7: nano.pins.D6, D0: nano.pins.UART, D1: nano.pins.UART,
      A1: nano.pins.A0, A3: nano.pins.A2, A7: nano.pins.A6, A4: nano.pins.I2C[0], A5: nano.pins.I2C[0]
    });
    return nano;
  };

  // Grove Mega Shield (Arduino Mega).
  const megaPort = (x, y, side) => ({ x: x, y: y, side: side });
  const mega = {
    IMG_LINK: media("arduino/assets/media/simulator/board/arduino_mega_grove_shield.svg"),
    SIZE: { w: 170, h: 99.6 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      12: megaPort(-10.2, -27.96, 'top'),
      10: megaPort(6.29, -27.96, 'top'),
      8: megaPort(22.95, -27.96, 'top'),
      6: megaPort(39.44, -27.96, 'top'),
      4: megaPort(56.1, -27.96, 'top'),
      2: megaPort(72.76, -27.96, 'top'),
      A0: megaPort(-43.35, 17.09, 'bottom'),
      A2: megaPort(-26.86, 17.09, 'bottom'),
      A4: megaPort(-10.2, 17.09, 'bottom'),
      A6: megaPort(6.29, 17.09, 'bottom'),
      A8: megaPort(22.95, 17.09, 'bottom'),
      A10: megaPort(39.44, 17.09, 'bottom'),
      A12: megaPort(56.1, 17.09, 'bottom'),
      A14: megaPort(72.76, 17.09, 'bottom'),
      UART3: megaPort(-59.84, -22.4, 'left'),
      UART2: megaPort(-59.84, -2.8, 'left'),
      UART1: megaPort(-59.84, 16.75, 'left'),
      UART: megaPort(-59.84, 36.3, 'left'),
      I2C: {
        0: megaPort(-43.35, -27.96, 'top'),
        1: megaPort(-26.86, -27.96, 'top'),
        2: megaPort(-59.84, -42.4, 'left')
      }
    },
    power: {
      VCC: { x: -15.98, y: 44.2, side: 'bottom' },
      GND: { x: -11.05, y: 44.2, side: 'bottom' }
    }
  };
  // Second signal of each port, and the serial pins of the UART ports.
  [13, 11, 9, 7, 5, 3].forEach(pin => mega.pins[pin] = mega.pins[pin - 1]);
  for (let pin = 1; pin < 16; pin += 2) {
    mega.pins['A' + pin] = mega.pins['A' + (pin - 1)];
  }
  Object.assign(mega.pins, {
    0: mega.pins.UART, 1: mega.pins.UART, 18: mega.pins.UART1, 19: mega.pins.UART1,
    16: mega.pins.UART2, 17: mega.pins.UART2, 14: mega.pins.UART3, 15: mega.pins.UART3,
    20: mega.pins.I2C[0], 21: mega.pins.I2C[0]
  });

  // Bare board wired with Dupont jumper wires: every pin is a header pin, pins as { name: [x, y, side] }.
  // bus: pin names of the I2C (SDA, SCL) and serial (TX, RX) modules.
  const dupont = (picture, width, height, vcc, bus, pins) => {
    const board = {
      IMG_LINK: media(picture),
      SIZE: { w: width, h: height },
      INITIAL_POS_PERCENT: { x: 50, y: 50 },
      portOrientation: 'horizontal',
      bus: bus,
      pins: {}
    };
    for (const name in pins) {
      board.pins[name] = { x: pins[name][0], y: pins[name][1], side: pins[name][2], header: true };
    }
    board.power = { VCC: board.pins[vcc], GND: board.pins.GND };
    return board;
  };

  // Grove shield for Raspberry Pi Pico (pins by GPIO number).
  const pico = {
    IMG_LINK: media("pico/assets/media/simulator/board/pico_grove_shield.svg"),
    SIZE: { w: 140, h: 131 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      20: { x: -53.6, y: -54.6, side: 'top' },
      18: { x: -32.5, y: -54.6, side: 'top' },
      16: { x: -11.3, y: -54.6, side: 'top' },
      UART1: { x: 9.8, y: -54.6, side: 'top' },
      UART: { x: 30.9, y: -54.6, side: 'top' },
      28: { x: -53.6, y: 44.8, side: 'bottom' },
      27: { x: -32.5, y: 44.8, side: 'bottom' },
      26: { x: -11.3, y: 44.8, side: 'bottom' },
      I2C: {
        0: { x: 30.9, y: 44.8, side: 'bottom' },
        1: { x: 9.8, y: 44.8, side: 'bottom' }
      },
      2: { x: 40.6, y: -25.4, header: true, side: 'top' },
      3: { x: 33.7, y: -25.4, header: true, side: 'top' },
      10: { x: -26.6, y: -25.4, header: true, side: 'top' },
      11: { x: -32.9, y: -25.4, header: true, side: 'top' },
      12: { x: -39.9, y: -25.4, header: true, side: 'top' },
      13: { x: -46.9, y: -25.4, header: true, side: 'top' },
      14: { x: -60, y: -25.4, header: true, side: 'top' },
      15: { x: -66.6, y: -25.4, header: true, side: 'top' },
      22: { x: -13.3, y: 24.5, header: true, side: 'bottom' }
    },
    power: {
      VCC: { x: 33.7, y: 24.5, side: 'bottom' },
      GND: { x: 47, y: 24.5, side: 'bottom' }
    }
  };
  Object.assign(pico.pins, {
    21: pico.pins[20], 19: pico.pins[18], 17: pico.pins[16],
    0: pico.pins.UART, 1: pico.pins.UART, UART0: pico.pins.UART, 4: pico.pins.UART1, 5: pico.pins.UART1,
    8: pico.pins.I2C[0], 9: pico.pins.I2C[0], 6: pico.pins.I2C[1], 7: pico.pins.I2C[1]
  });

  // Grove Base Hat for Raspberry Pi (pins by GPIO number).
  const piHeader = (k, odd) => ({ x: -56.2 + 5.932 * k, y: odd ? -53.8 : -59.8, header: true, side: 'top' });
  const grovePiHat = {
    IMG_LINK: media("raspberrypi/assets/media/simulator/board/grovepihat.svg"),
    SIZE: { w: 150, h: 128.5 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      12: { x: -51.9, y: -32.9 },
      5: { x: -28.9, y: -32.9 },
      16: { x: -6, y: -32.9 },
      18: { x: 17, y: -32.9 },
      A0: { x: 45.9, y: -32.9 },
      A2: { x: 68.9, y: -32.9 },
      UART: { x: -51.9, y: 4.9 },
      22: { x: -28.9, y: 4.9 },
      24: { x: -6, y: 4.9 },
      26: { x: 17, y: 4.9 },
      A4: { x: 45.9, y: 4.9 },
      A6: { x: 68.9, y: 4.9 },
      I2C: {
        0: { x: -28.9, y: 42.8 },
        1: { x: -6, y: 42.8 },
        2: { x: 17, y: 42.8 }
      },
      4: piHeader(3, true),
      7: piHeader(12, false),
      8: piHeader(11, false),
      9: piHeader(10, true),
      10: piHeader(9, true),
      11: piHeader(11, true),
      20: piHeader(18, false),
      21: piHeader(19, false),
      0: piHeader(13, true),
      1: piHeader(13, false)
    },
    power: {
      VCC: { x: -56.2, y: -53.8, side: 'top' },
      GND: { x: -44.3, y: -59.8, side: 'top' }
    }
  };
  Object.assign(grovePiHat.pins, {
    13: grovePiHat.pins[12], 6: grovePiHat.pins[5], 17: grovePiHat.pins[16], 19: grovePiHat.pins[18],
    14: grovePiHat.pins.UART, 15: grovePiHat.pins.UART, 23: grovePiHat.pins[22], 25: grovePiHat.pins[24], 27: grovePiHat.pins[26],
    A1: grovePiHat.pins.A0, A3: grovePiHat.pins.A2, A5: grovePiHat.pins.A4, A7: grovePiHat.pins.A6,
    2: grovePiHat.pins.I2C[0], 3: grovePiHat.pins.I2C[0]
  });

  // M5Stack Core: Grove ports A (I2C), B (GPIO 26/36), C (UART 16/17) and its pin header (pins by GPIO number).
  const m5Header = (k) => ({ x: -43.2 + 7.92 * k, y: 50.4, header: true, side: 'bottom' });
  const m5stack = {
    IMG_LINK: media("interfaces/assets/media/simulator/wiring/shields/m5stack_core_grove.svg"),
    SIZE: { w: 120, h: 134.4 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      26: { x: 52.8, y: -23.7, side: 'right' },
      UART: { x: 52.8, y: 12.3, side: 'right' },
      I2C: {
        0: { x: -52.8, y: -11.7, side: 'left' }
      },
      2: m5Header(0),
      5: m5Header(1),
      35: m5Header(2),
      3: m5Header(4),
      1: m5Header(5),
      23: m5Header(6),
      19: m5Header(7),
      18: m5Header(8)
    },
    power: {
      VCC: m5Header(9),
      GND: m5Header(10)
    }
  };
  Object.assign(m5stack.pins, {
    36: m5stack.pins[26], 16: m5stack.pins.UART, 17: m5stack.pins.UART, 21: m5stack.pins.I2C[0], 22: m5stack.pins.I2C[0]
  });

  // TI-Innovator Hub: Grove ports IN 1-3, OUT 1-3, I2C and breadboard connector (pins named 'in1', 'out1', 'bb1'...).
  const bbHeader = (k) => ({ x: -45 + 9 * k, y: 50, header: true, side: 'bottom' });
  const innovatorHub = {
    IMG_LINK: media("interfaces/assets/media/simulator/wiring/shields/ti_innovator_hub.svg"),
    SIZE: { w: 140, h: 110 },
    INITIAL_POS_PERCENT: { x: 50, y: 50 },
    portOrientation: 'vertical',
    pins: {
      in1: { x: -65, y: -35.75, side: 'left' },
      in2: { x: -65, y: -3.25, side: 'left' },
      in3: { x: -65, y: 29.25, side: 'left' },
      out1: { x: 65, y: -35.75, side: 'right' },
      out2: { x: 65, y: -3.25, side: 'right' },
      out3: { x: 65, y: 29.25, side: 'right' },
      I2C: {
        0: { x: -4.5, y: -50, side: 'top', vertical: false }
      }
    },
    power: {
      VCC: bbHeader(10),
      GND: bbHeader(11)
    }
  };
  for (let k = 0; k < 10; k++) {
    innovatorHub.pins['bb' + (k + 1)] = bbHeader(k);
  }

  WiringSimulator.shields = {
    unoGrove: uno,
    microbitGrove: microbit("microbit_grove_shield.svg"),
    galaxiaGrove: microbit("galaxia_grove_shield.svg"),
    steamiGrove: microbit("steami_grove_shield.svg"),
    nanoGrove: nanoShield("esp32/assets/media/simulator/board/arduino_nano_esp32_grove_shield.svg"),
    nanoGroveArduino: nanoShield("arduino/assets/media/simulator/board/arduino_nano_grove_shield.svg"),
    megaGrove: mega,
    picoGrove: pico,
    grovePiHat: grovePiHat,
    m5stackCore: m5stack,
    innovatorHub: innovatorHub,
    // Generated from the pins of the board pictures (pins positions, names by the board pinouts).
    unoDupont: dupont('arduino/assets/media/simulator/board/arduino_uno.svg', 150, 117.3, '5V', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-24.0, -53.8, 'top'], 'SDA': [-19.0, -53.8, 'top'], 'AREF': [-14.0, -53.8, 'top'], 'GND': [-9.0, -53.8, 'top'], '13': [-4.0, -53.8, 'top'], '12': [1.0, -53.8, 'top'], '11': [6.0, -53.8, 'top'], '10': [11.0, -53.8, 'top'], '9': [16.0, -53.8, 'top'], '8': [21.0, -53.8, 'top'], '7': [29.5, -53.8, 'top'], '6': [34.5, -53.8, 'top'], '5': [39.5, -53.8, 'top'], '4': [44.5, -53.8, 'top'], '3': [49.5, -53.8, 'top'], '2': [54.5, -53.8, 'top'], '1': [59.5, -53.8, 'top'], '0': [64.5, -53.8, 'top'], 'NC': [-6.2, 42.4, 'bottom'], 'IOREF': [-1.2, 42.4, 'bottom'], 'RESET': [3.8, 42.4, 'bottom'], '3V3': [8.8, 42.4, 'bottom'], '5V': [13.8, 42.4, 'bottom'], 'GND2': [18.8, 42.4, 'bottom'], 'GND3': [23.8, 42.4, 'bottom'], 'VIN': [28.8, 42.4, 'bottom'], 'A0': [39.4, 42.4, 'bottom'], 'A1': [44.4, 42.4, 'bottom'], 'A2': [49.4, 42.4, 'bottom'], 'A3': [54.4, 42.4, 'bottom'], 'A4': [59.4, 42.4, 'bottom'], 'A5': [64.4, 42.4, 'bottom'] }),
    unoR4WifiDupont: dupont('arduino/assets/media/simulator/board/arduino-uno-r4-wifi.svg', 150, 112.3, '5V', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-28.9, -51.5, 'top'], 'SDA': [-23.8, -51.5, 'top'], 'AREF': [-18.6, -51.5, 'top'], 'GND': [-13.5, -51.5, 'top'], '13': [-8.4, -51.5, 'top'], '12': [-3.2, -51.5, 'top'], '11': [1.9, -51.5, 'top'], '10': [7.0, -51.5, 'top'], '9': [12.2, -51.5, 'top'], '8': [17.3, -51.5, 'top'], '7': [27.4, -51.5, 'top'], '6': [32.5, -51.5, 'top'], '5': [37.6, -51.5, 'top'], '4': [42.7, -51.5, 'top'], '3': [47.8, -51.5, 'top'], '2': [52.8, -51.5, 'top'], '1': [57.9, -51.5, 'top'], '0': [63.0, -51.5, 'top'], 'NC': [-9.2, 51.7, 'bottom'], 'IOREF': [-4.1, 51.7, 'bottom'], 'RESET': [0.9, 51.7, 'bottom'], '3V3': [6.0, 51.7, 'bottom'], '5V': [11.1, 51.7, 'bottom'], 'GND2': [16.1, 51.7, 'bottom'], 'GND3': [21.2, 51.7, 'bottom'], 'VIN': [26.3, 51.7, 'bottom'], 'A0': [38.2, 51.7, 'bottom'], 'A1': [43.2, 51.7, 'bottom'], 'A2': [48.2, 51.7, 'bottom'], 'A3': [53.2, 51.7, 'bottom'], 'A4': [58.2, 51.7, 'bottom'], 'A5': [63.2, 51.7, 'bottom'] }),
    unoR4MinimaDupont: dupont('arduino/assets/media/simulator/board/arduino-uno-r4-minima.svg', 150, 112.3, '5V', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-28.9, -50.7, 'top'], 'SDA': [-23.8, -50.7, 'top'], 'AREF': [-18.6, -50.7, 'top'], 'GND': [-13.5, -50.7, 'top'], '13': [-8.4, -50.7, 'top'], '12': [-3.2, -50.7, 'top'], '11': [1.9, -50.7, 'top'], '10': [7.0, -50.7, 'top'], '9': [12.2, -50.7, 'top'], '8': [17.3, -50.7, 'top'], '7': [27.4, -50.7, 'top'], '6': [32.5, -50.7, 'top'], '5': [37.6, -50.7, 'top'], '4': [42.7, -50.7, 'top'], '3': [47.8, -50.7, 'top'], '2': [52.8, -50.7, 'top'], '1': [57.9, -50.7, 'top'], '0': [63.0, -50.7, 'top'], 'NC': [-9.2, 50.3, 'bottom'], 'IOREF': [-4.1, 50.3, 'bottom'], 'RESET': [0.9, 50.3, 'bottom'], '3V3': [6.0, 50.3, 'bottom'], '5V': [11.1, 50.3, 'bottom'], 'GND2': [16.1, 50.3, 'bottom'], 'GND3': [21.2, 50.3, 'bottom'], 'VIN': [26.3, 50.3, 'bottom'], 'A0': [38.2, 50.3, 'bottom'], 'A1': [43.2, 50.3, 'bottom'], 'A2': [48.2, 50.3, 'bottom'], 'A3': [53.2, 50.3, 'bottom'], 'A4': [58.2, 50.3, 'bottom'], 'A5': [63.2, 50.3, 'bottom'] }),
    nanoDupont: dupont('arduino/assets/media/simulator/board/arduino_nano.svg', 150, 61.2, '5V', {"SDA": "A4", "SCL": "A5", "TX": "D1", "RX": "D0"}, { 'D12': [-55.8, -25.1, 'top'], 'D11': [-47.7, -25.1, 'top'], 'D10': [-39.6, -25.1, 'top'], 'D9': [-31.5, -25.1, 'top'], 'D8': [-23.4, -25.1, 'top'], 'D7': [-15.3, -25.1, 'top'], 'D6': [-7.2, -25.1, 'top'], 'D5': [0.9, -25.1, 'top'], 'D4': [9.0, -25.1, 'top'], 'D3': [17.1, -25.1, 'top'], 'D2': [25.2, -25.1, 'top'], 'GND': [33.3, -25.1, 'top'], 'RST': [41.4, -25.1, 'top'], 'D0': [49.4, -25.1, 'top'], 'D1': [57.9, -25.1, 'top'], 'D13': [-55.8, 24.1, 'bottom'], '3V3': [-47.7, 24.1, 'bottom'], 'AREF': [-39.6, 24.1, 'bottom'], 'A0': [-31.5, 24.1, 'bottom'], 'A1': [-23.4, 24.1, 'bottom'], 'A2': [-15.3, 24.1, 'bottom'], 'A3': [-7.2, 24.1, 'bottom'], 'A4': [0.9, 24.1, 'bottom'], 'A5': [9.0, 24.1, 'bottom'], 'A6': [17.1, 24.1, 'bottom'], 'A7': [25.2, 24.1, 'bottom'], '5V': [33.3, 24.1, 'bottom'], 'RST2': [41.4, 24.1, 'bottom'], 'GND2': [49.4, 24.1, 'bottom'], 'VIN': [57.9, 24.1, 'bottom'] }),
    megaDupont: dupont('arduino/assets/media/simulator/board/arduino-mega-2560.svg', 200, 97.4, '5V', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-52.0, -45.1, 'top'], 'SDA': [-47.2, -45.1, 'top'], 'AREF': [-42.4, -45.1, 'top'], 'GND': [-37.7, -45.1, 'top'], '13': [-32.9, -45.1, 'top'], '12': [-28.2, -45.1, 'top'], '11': [-23.4, -45.1, 'top'], '10': [-18.6, -45.1, 'top'], '9': [-13.9, -45.1, 'top'], '8': [-9.1, -45.1, 'top'], '7': [-2.1, -45.1, 'top'], '6': [2.7, -45.1, 'top'], '5': [7.5, -45.1, 'top'], '4': [12.2, -45.1, 'top'], '3': [17.0, -45.1, 'top'], '2': [21.8, -45.1, 'top'], '1': [26.5, -45.1, 'top'], '0': [31.3, -45.1, 'top'], '14': [39.7, -45.1, 'top'], '15': [44.5, -45.1, 'top'], '16': [49.3, -45.1, 'top'], '17': [54.0, -45.1, 'top'], '18': [58.8, -45.1, 'top'], '19': [63.5, -45.1, 'top'], '20': [68.3, -45.1, 'top'], '21': [73.1, -45.1, 'top'], '5V2': [87.1, -45.1, 'top'], '5V3': [91.4, -45.1, 'top'], 'NC': [-34.6, 45.1, 'bottom'], 'IOREF': [-29.9, 45.1, 'bottom'], 'RESET': [-25.1, 45.1, 'bottom'], '3V3': [-20.3, 45.1, 'bottom'], '5V': [-15.6, 45.1, 'bottom'], 'GND2': [-10.8, 45.1, 'bottom'], 'GND3': [-6.0, 45.1, 'bottom'], 'VIN': [-1.3, 45.1, 'bottom'], 'A0': [7.9, 45.1, 'bottom'], 'A1': [12.7, 45.1, 'bottom'], 'A2': [17.4, 45.1, 'bottom'], 'A3': [22.2, 45.1, 'bottom'], 'A4': [26.9, 45.1, 'bottom'], 'A5': [31.7, 45.1, 'bottom'], 'A6': [36.5, 45.1, 'bottom'], 'A7': [41.2, 45.1, 'bottom'], 'A8': [49.0, 45.1, 'bottom'], 'A9': [53.8, 45.1, 'bottom'], 'A10': [58.6, 45.1, 'bottom'], 'A11': [63.3, 45.1, 'bottom'], 'A12': [68.1, 45.1, 'bottom'], 'A13': [72.9, 45.1, 'bottom'], 'A14': [77.6, 45.1, 'bottom'], 'A15': [82.4, 45.1, 'bottom'], '5V4': [87.1, -45.1, 'right'], '22': [87.1, -40.4, 'right'], '24': [87.1, -35.6, 'right'], '26': [87.1, -30.9, 'right'], '28': [87.1, -26.1, 'right'], '30': [87.1, -21.3, 'right'], '32': [87.1, -16.6, 'right'], '34': [87.1, -11.8, 'right'], '36': [87.1, -7.0, 'right'], '38': [87.1, -2.2, 'right'], '40': [87.1, 2.5, 'right'], '42': [87.1, 7.3, 'right'], '44': [87.1, 12.1, 'right'], '46': [87.1, 16.8, 'right'], '48': [87.1, 21.6, 'right'], '50': [87.1, 26.4, 'right'], '52': [87.1, 30.9, 'right'], 'GND4': [87.1, 35.7, 'right'], '5V5': [91.4, -45.1, 'right'], '23': [91.4, -40.4, 'right'], '25': [91.4, -35.6, 'right'], '27': [91.4, -30.9, 'right'], '29': [91.4, -26.1, 'right'], '31': [91.4, -21.3, 'right'], '33': [91.4, -16.6, 'right'], '35': [91.4, -11.8, 'right'], '37': [91.4, -7.0, 'right'], '39': [91.4, -2.2, 'right'], '41': [91.4, 2.5, 'right'], '43': [91.4, 7.3, 'right'], '45': [91.4, 12.1, 'right'], '47': [91.4, 16.8, 'right'], '49': [91.4, 21.6, 'right'], '51': [91.4, 26.4, 'right'], '53': [91.4, 30.9, 'right'], 'GND5': [91.4, 35.7, 'right'] }),
    esp32VittaDupont: dupont('esp32/assets/media/simulator/board/esp32_vittascience.svg', 150, 112.2, '3V3', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-28.9, -50.7, 'top'], 'SDA': [-23.7, -50.7, 'top'], 'AREF': [-18.6, -50.7, 'top'], 'GND': [-13.5, -50.7, 'top'], '13': [-8.3, -50.7, 'top'], '12': [-3.2, -50.7, 'top'], '11': [1.9, -50.7, 'top'], '10': [7.1, -50.7, 'top'], '9': [12.2, -50.7, 'top'], '8': [17.3, -50.7, 'top'], '7': [27.5, -50.7, 'top'], '6': [32.6, -50.7, 'top'], '5': [37.6, -50.7, 'top'], '4': [42.7, -50.7, 'top'], '3': [47.8, -50.7, 'top'], '2': [52.9, -50.7, 'top'], '1': [58.0, -50.7, 'top'], '0': [63.0, -50.7, 'top'], 'NC': [-9.1, 50.3, 'bottom'], 'IOREF': [-4.1, 50.3, 'bottom'], 'RESET': [1.0, 50.3, 'bottom'], '3V3': [6.1, 50.3, 'bottom'], '5V': [11.1, 50.3, 'bottom'], 'GND2': [16.2, 50.3, 'bottom'], 'GND3': [21.2, 50.3, 'bottom'], 'VIN': [26.3, 50.3, 'bottom'], 'A0': [38.3, 50.3, 'bottom'], 'A1': [43.3, 50.3, 'bottom'], 'A2': [48.3, 50.3, 'bottom'], 'A3': [53.3, 50.3, 'bottom'], 'A4': [58.3, 50.3, 'bottom'], 'A5': [63.2, 50.3, 'bottom'] }),
    wemosDupont: dupont('esp32/assets/media/simulator/board/Wemos_D1_R32.svg', 150, 111.9, '3V3', {"SDA": "SDA", "SCL": "SCL", "TX": "1", "RX": "0"}, { 'SCL': [-30.4, -49.4, 'top'], 'SDA': [-25.2, -49.4, 'top'], 'AREF': [-20.0, -49.4, 'top'], 'GND': [-14.7, -49.4, 'top'], '13': [-9.5, -49.4, 'top'], '12': [-4.3, -49.4, 'top'], '11': [1.0, -49.4, 'top'], '10': [6.2, -49.4, 'top'], '9': [11.4, -49.4, 'top'], '8': [16.7, -49.4, 'top'], '7': [25.4, -49.4, 'top'], '6': [30.6, -49.4, 'top'], '5': [35.8, -49.4, 'top'], '4': [41.1, -49.4, 'top'], '3': [46.3, -49.4, 'top'], '2': [51.5, -49.4, 'top'], '1': [56.8, -49.4, 'top'], '0': [62.0, -49.4, 'top'], 'NC': [-8.0, 51.3, 'bottom'], 'IOREF': [-2.8, 51.3, 'bottom'], 'RESET': [2.5, 51.3, 'bottom'], '3V3': [7.7, 51.3, 'bottom'], '5V': [12.9, 51.3, 'bottom'], 'GND2': [18.2, 51.3, 'bottom'], 'GND3': [23.4, 51.3, 'bottom'], 'VIN': [28.6, 51.3, 'bottom'], 'A0': [37.7, 51.3, 'bottom'], 'A1': [42.9, 51.3, 'bottom'], 'A2': [48.2, 51.3, 'bottom'], 'A3': [53.4, 51.3, 'bottom'], 'A4': [58.6, 51.3, 'bottom'], 'A5': [63.9, 51.3, 'bottom'] }),
    nanoEsp32Dupont: dupont('esp32/assets/media/simulator/board/arduino_nano_esp32.svg', 160, 64.2, '3V3', {"SDA": "A4", "SCL": "A5", "TX": "D1", "RX": "D0"}, { 'D12': [-61.5, -28.6, 'top'], 'D11': [-52.4, -28.6, 'top'], 'D10': [-43.2, -28.6, 'top'], 'D9': [-34.1, -28.6, 'top'], 'D8': [-24.9, -28.6, 'top'], 'D7': [-15.7, -28.6, 'top'], 'D6': [-6.6, -28.6, 'top'], 'D5': [2.6, -28.6, 'top'], 'D4': [11.7, -28.6, 'top'], 'D3': [20.9, -28.6, 'top'], 'D2': [30.1, -28.6, 'top'], 'GND': [39.2, -28.6, 'top'], 'RST': [48.4, -28.6, 'top'], 'D0': [57.5, -28.6, 'top'], 'D1': [66.7, -28.6, 'top'], 'D13': [-61.5, 28.6, 'bottom'], '3V3': [-52.3, 28.6, 'bottom'], 'AREF': [-43.2, 28.6, 'bottom'], 'A0': [-34.0, 28.6, 'bottom'], 'A1': [-24.8, 28.6, 'bottom'], 'A2': [-15.7, 28.6, 'bottom'], 'A3': [-6.5, 28.6, 'bottom'], 'A4': [2.6, 28.6, 'bottom'], 'A5': [11.8, 28.6, 'bottom'], 'A6': [20.9, 28.6, 'bottom'], 'A7': [30.1, 28.6, 'bottom'], '5V': [39.3, 28.6, 'bottom'], 'RST2': [48.4, 28.6, 'bottom'], 'GND2': [57.6, 28.6, 'bottom'], 'VIN': [66.7, 28.6, 'bottom'] }),
    wroom38Dupont: dupont('esp32/assets/media/simulator/board/ESP32-WROOM-32D_38pins.svg', 150, 75.5, '3V3', {"SDA": "21", "SCL": "22", "TX": "1", "RX": "3"}, { '5V': [-66.6, -34.4, 'top'], 'CMD': [-59.4, -34.4, 'top'], 'SD3': [-52.5, -34.4, 'top'], 'SD2': [-45.9, -34.4, 'top'], '13': [-38.9, -34.4, 'top'], 'GND': [-32.0, -34.4, 'top'], '12': [-24.9, -34.4, 'top'], '14': [-18.0, -34.4, 'top'], '27': [-11.4, -34.4, 'top'], '26': [-4.7, -34.4, 'top'], '25': [2.2, -34.4, 'top'], '33': [9.3, -34.4, 'top'], '32': [16.2, -34.4, 'top'], '35': [22.8, -34.4, 'top'], '34': [29.7, -34.4, 'top'], '39': [36.6, -34.4, 'top'], '36': [43.7, -34.4, 'top'], 'EN': [50.6, -34.4, 'top'], '3V3': [57.3, -34.4, 'top'], 'CLK': [-66.6, 33.9, 'bottom'], 'SD0': [-59.4, 33.9, 'bottom'], 'SD1': [-52.5, 33.9, 'bottom'], '15': [-45.9, 33.9, 'bottom'], '2': [-38.9, 33.9, 'bottom'], '0': [-32.0, 33.9, 'bottom'], '4': [-24.9, 33.9, 'bottom'], '16': [-18.0, 33.9, 'bottom'], '17': [-11.4, 33.9, 'bottom'], '5': [-4.7, 33.9, 'bottom'], '18': [2.2, 33.9, 'bottom'], '19': [9.3, 33.9, 'bottom'], 'GND2': [16.2, 33.9, 'bottom'], '21': [22.8, 33.9, 'bottom'], '3': [29.7, 33.9, 'bottom'], '1': [36.6, 33.9, 'bottom'], '22': [43.7, 33.9, 'bottom'], '23': [50.6, 33.9, 'bottom'], 'GND3': [57.3, 33.9, 'bottom'] }),
    esp32CamDupont: dupont('esp32/assets/media/simulator/board/esp32-cam.svg', 80, 119.9, '3V3', {"TX": "1", "RX": "3"}, { '5V': [-33.9, -45.2, 'left'], 'GND': [-33.9, -37.6, 'left'], '12': [-33.9, -30.0, 'left'], '13': [-33.9, -22.5, 'left'], '15': [-33.9, -14.9, 'left'], '14': [-33.9, -7.3, 'left'], '2': [-33.9, 0.2, 'left'], '4': [-33.9, 7.8, 'left'], '3V3': [34.1, -45.2, 'right'], '16': [34.1, -37.6, 'right'], '0': [34.1, -30.0, 'right'], 'GND2': [34.1, -22.5, 'right'], 'VCC': [34.1, -14.9, 'right'], '3': [34.1, -7.3, 'right'], '1': [34.1, 0.2, 'right'], 'GND3': [34.1, 7.8, 'right'] }),
    picoDupont: dupont('pico/assets/media/simulator/board/raspberry_pi_pico.svg', 160, 63.4, '3V3', {"SDA": "8", "SCL": "9", "TX": "0", "RX": "1"}, { '15': [-75.9, -28.2, 'top'], '14': [-68.2, -28.2, 'top'], 'GND': [-60.5, -28.2, 'top'], '13': [-52.9, -28.2, 'top'], '12': [-45.2, -28.2, 'top'], '11': [-37.5, -28.2, 'top'], '10': [-29.9, -28.2, 'top'], 'GND2': [-22.2, -28.2, 'top'], '9': [-14.5, -28.2, 'top'], '8': [-6.8, -28.2, 'top'], '7': [0.8, -28.2, 'top'], '6': [8.5, -28.2, 'top'], 'GND3': [16.2, -28.2, 'top'], '5': [23.8, -28.2, 'top'], '4': [31.5, -28.2, 'top'], '3': [39.2, -28.2, 'top'], '2': [46.8, -28.2, 'top'], 'GND4': [54.5, -28.2, 'top'], '1': [62.2, -28.2, 'top'], '0': [69.8, -28.2, 'top'], '16': [-75.9, 28.2, 'bottom'], '17': [-68.2, 28.2, 'bottom'], 'GND5': [-60.5, 28.2, 'bottom'], '18': [-52.9, 28.2, 'bottom'], '19': [-45.2, 28.2, 'bottom'], '20': [-37.5, 28.2, 'bottom'], '21': [-29.9, 28.2, 'bottom'], 'GND6': [-22.2, 28.2, 'bottom'], '22': [-14.5, 28.2, 'bottom'], 'RUN': [-6.8, 28.2, 'bottom'], '26': [0.8, 28.2, 'bottom'], '27': [8.5, 28.2, 'bottom'], 'GND7': [16.2, 28.2, 'bottom'], '28': [23.8, 28.2, 'bottom'], 'ADC_VREF': [31.5, 28.2, 'bottom'], '3V3': [39.2, 28.2, 'bottom'], '3V3_EN': [46.8, 28.2, 'bottom'], 'GND8': [54.5, 28.2, 'bottom'], 'VSYS': [62.2, 28.2, 'bottom'], 'VBUS': [69.8, 28.2, 'bottom'] }),
    raspberryDupont: dupont('raspberrypi/assets/media/simulator/board/raspberry-pi-board.svg', 170, 110.8, '3V3', {"SDA": "2", "SCL": "3", "TX": "14", "RX": "15"}, { '5V': [-67.0, -52.2, 'top'], '5V2': [-62.2, -52.2, 'top'], 'GND': [-57.4, -52.2, 'top'], '14': [-52.6, -52.2, 'top'], '15': [-47.8, -52.2, 'top'], '18': [-43.1, -52.2, 'top'], 'GND2': [-38.3, -52.2, 'top'], '23': [-33.5, -52.2, 'top'], '24': [-28.7, -52.2, 'top'], 'GND3': [-24.0, -52.2, 'top'], '25': [-19.2, -52.2, 'top'], '8': [-14.4, -52.2, 'top'], '7': [-9.6, -52.2, 'top'], '1': [-4.8, -52.2, 'top'], 'GND4': [-0.1, -52.2, 'top'], '12': [4.7, -52.2, 'top'], 'GND5': [9.5, -52.2, 'top'], '16': [14.3, -52.2, 'top'], '20': [19.0, -52.2, 'top'], '21': [23.8, -52.2, 'top'], '3V3': [-67.0, -46.0, 'top'], '2': [-62.2, -46.0, 'top'], '3': [-57.4, -46.0, 'top'], '4': [-52.6, -46.0, 'top'], 'GND6': [-47.8, -46.0, 'top'], '17': [-43.1, -46.0, 'top'], '27': [-38.3, -46.0, 'top'], '22': [-33.5, -46.0, 'top'], '3V3_2': [-28.7, -46.0, 'top'], '10': [-24.0, -46.0, 'top'], '9': [-19.2, -46.0, 'top'], '11': [-14.4, -46.0, 'top'], 'GND7': [-9.6, -46.0, 'top'], '0': [-4.8, -46.0, 'top'], '5': [-0.1, -46.0, 'top'], '6': [4.7, -46.0, 'top'], '13': [9.5, -46.0, 'top'], '19': [14.3, -46.0, 'top'], '26': [19.0, -46.0, 'top'], 'GND8': [23.8, -46.0, 'top'] })
  };
})();
