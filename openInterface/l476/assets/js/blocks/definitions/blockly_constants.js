Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

// Constants objet for LoRa module
Blockly.Constants.LoRa = Object.create(null);

Blockly.Constants.LoRa.DATA_TYPE = {
  'DISTANCE' : '0x13',
  'TEMPERATURE' : '0x2D',
  'ACCELEROMETER' : {
    'X' : '0x02',
    'Y' : '0x03',
    'Z' : '0x04'
  },
  'GYROSCOPE' : {
    'GX' : '0x05',
    'GY' : '0x06',
    'GZ' : '0x07'
  },
  'GAS' : {
    'CO' : '0x0F',
    'NO2' : '0x11',
    'NH3' : '0x3A',
    'C3H8' : '0x3B',
    'C4H10' : '0x3C',
    'CH4' : '0x3D',
    'H2' : '0x3E',
    'C2H5OH' : '0x0E',
    'CO2' : '0x10',
    'TVOC' : '0x0B'
  },
  'AIR_QUALITY' : '0x31',
  'PARTICULATE_MATTER' : {
    'PM1.0' : '0x25',
    'PM2.5' : '0x27',
    'PM10' : '0x26',
  },
  'MAGNETOSCOPE' : {
    'X' : '0x33',
    'Y' : '0x34',
    'Z' : '0x35'
  },
  'SOIL_MOISTURE' : '0x1D',
  'AIR_MOISTURE' : '0x1C',
  'WATER_AMOUNT' : '0x23',
  'TIME' : '0x14',
  'LIGHT' : { 
    'UV' : '0x22',
    'VIS' : '0x20',
    'LIGHT' : '0x21'
  },
  'COLOUR' : { 
    'R' : '0x36',
    'G' : '0x37',
    'B' : '0x38',
  },
  'SOUND' : '0x24',
  'POTENTIOMETRE' : '0x29',
  'VOLTMETER' : '0x39',
  'PRESSURE' : '0x2B',
  'INCLINOMETER' : {
    'X' : '0x3F',
    'Y' : '0x40',
    'Z' : '0x41'
  }
};

Blockly.Constants.LoRa.ENCODE = {
  /* DISTANCE */
  'sensors_getGroveUltrasonicRanger' : Blockly.Constants.LoRa.DATA_TYPE['DISTANCE'],
  'sensors_VL53L0X_getRangeMillimeters' : Blockly.Constants.LoRa.DATA_TYPE['DISTANCE'],
  'robots_alphabot_getUltrasonicRange' : Blockly.Constants.LoRa.DATA_TYPE['DISTANCE'],
  /* AIR TEMPERATURE */
  'sensors_thermometerIntegrated_STTS751' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_getBmp280Data' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_getGroveHighTemperature' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_getGroveTemperature' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_DHT11ReadData' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_DHT22ReadData' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_TH02readData' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_SHT31readData' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  'sensors_DS18B20_getTemperature': Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE'],
  /* ACCELEROMETER  */
  'sensors_accelerometerIntegrated_LIS2DW12' : {
    'x' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['X'],
    'y' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['Y'],
    'z' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['Z']
  },
  'sensors_accelerometerIntegrated_LSM6DSO' : {
    'ax' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['X'],
    'ay' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['Y'],
    'az' : Blockly.Constants.LoRa.DATA_TYPE['ACCELEROMETER']['Z']
  },
  /* GYROSCOPE */
  'sensors_gyroscopeIntegrated_LSM6DSO' : {
    'gx' : Blockly.Constants.LoRa.DATA_TYPE['GYROSCOPE']['GX'],
    'gy' : Blockly.Constants.LoRa.DATA_TYPE['GYROSCOPE']['GY'],
    'gz' : Blockly.Constants.LoRa.DATA_TYPE['GYROSCOPE']['GZ']
  },
  /* GAS */
  'sensors_getMultichannelGas' : {
    'CO' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['CO'],
    'NO2' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['NO2'],
    'NH3' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['NH3'],
    'C3H8' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['C3H8'],
    'C4H10' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['C4H10'],
    'CH4' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['CH4'],
    'H2' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['H2'],
    'C2H5OH' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['C2H5OH']
  },
  'sensors_getSgp30Gas' : {
    'CO2' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['CO2'],
    'TVOC' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['TVOC']
  },
  'sensors_getO2gas' : '0x12',
  'sensors_SCD30_readData' : {
    'CO2' : Blockly.Constants.LoRa.DATA_TYPE['GAS']['CO2'],
    'HUM' : Blockly.Constants.LoRa.DATA_TYPE['AIR_MOISTURE'],
    'TEMP' : Blockly.Constants.LoRa.DATA_TYPE['TEMPERATURE']
  },
  /* AIR QUALITY */
  'sensors_getAirQualityValue' : Blockly.Constants.LoRa.DATA_TYPE['AIR_QUALITY'],
  /* PARTICULATE MATTER */
  'sensors_getParticulateMatter' : {
    '3' : Blockly.Constants.LoRa.DATA_TYPE['PARTICULATE_MATTER']['PM1.0'],
    '4' : Blockly.Constants.LoRa.DATA_TYPE['PARTICULATE_MATTER']['PM2.5'],
    '5' : Blockly.Constants.LoRa.DATA_TYPE['PARTICULATE_MATTER']['PM10'],
  },
  /* MAGNETOSCOPE */
  'sensors_magnetoscopeIntegrated_LIS2MDL' : {
    'x' : Blockly.Constants.LoRa.DATA_TYPE['MAGNETOSCOPE']['X'],
    'y' : Blockly.Constants.LoRa.DATA_TYPE['MAGNETOSCOPE']['Y'],
    'z' : Blockly.Constants.LoRa.DATA_TYPE['MAGNETOSCOPE']['Z']
  },
  /* SOIL MOISTURE */ 
  'sensors_getGroveMoisture' : Blockly.Constants.LoRa.DATA_TYPE['SOIL_MOISTURE'],
  /* AIR MOISTURE */
  'sensors_hygrometerIntegrated_HTS221' : Blockly.Constants.LoRa.DATA_TYPE['AIR_MOISTURE'],
  /* WATER AMOUNT */
  'sensors_getGroveWaterAmount' : Blockly.Constants.LoRa.DATA_TYPE['WATER_AMOUNT'],
  /* TIME */
  'io_getChronometer' : Blockly.Constants.LoRa.DATA_TYPE['TIME'],
  /* LIGTH */
  'sensors_getGroveLight' : Blockly.Constants.LoRa.DATA_TYPE['LIGHT']['VIS'],
  'sensors_getSi1145Light' : { 
    'UV' : Blockly.Constants.LoRa.DATA_TYPE['LIGHT']['UV'],
    'VIS' : Blockly.Constants.LoRa.DATA_TYPE['LIGHT']['VIS'],
    'LIGHT' : Blockly.Constants.LoRa.DATA_TYPE['LIGHT']['LIGHT']
  },
  'sensors_getUVindex' : Blockly.Constants.LoRa.DATA_TYPE['LIGHT']['UV'],
  /* COLOUR */
  'sensors_colorSensor_getData' : { 
    '0' : Blockly.Constants.LoRa.DATA_TYPE['COLOUR']['R'],
    '1' : Blockly.Constants.LoRa.DATA_TYPE['COLOUR']['G'],
    '2' : Blockly.Constants.LoRa.DATA_TYPE['COLOUR']['B']
  },
  /* SOUND */
  'sensors_getGroveSound' : Blockly.Constants.LoRa.DATA_TYPE['SOUND'],
  /* POTENTIOMETRE */
  'io_getGroveRotaryAngle' : Blockly.Constants.LoRa.DATA_TYPE['POTENTIOMETRE'],
  'io_getGroveSlidePotentiometer' : Blockly.Constants.LoRa.DATA_TYPE['POTENTIOMETRE'],
  /* VOLTMETER */
  'io_readAnalogPin' : Blockly.Constants.LoRa.DATA_TYPE['VOLTMETER'],
  /* PRESSURE */
  'sensors_barometerIntegrated_LPS22' : Blockly.Constants.LoRa.DATA_TYPE['PRESSURE'],
  /* INCLINOMETER */
  'sensors_inclinometerIntegrated_LIS2DW12' : {
    'x' : Blockly.Constants.LoRa.DATA_TYPE['INCLINOMETER']['X'],
    'y' : Blockly.Constants.LoRa.DATA_TYPE['INCLINOMETER']['Y'],
    'z' : Blockly.Constants.LoRa.DATA_TYPE['INCLINOMETER']['Z']
  }
};

// Constants object for board pins
Blockly.Constants.Pins = Object.create(null);

Blockly.Constants.Pins.digital = {
  [BOARD_NUCLEO_L476]: [
    // ["D0", "'D0'"],
    // ["D1", "'D1'"],
    ["D2", "'D2'"],
    ["D3", "'D3'"],
    ["D4", "'D4'"],
    ["D5", "'D5'"],
    ["D6", "'D6'"],
    ["D7", "'D7'"],
    ["D8", "'D8'"],
    ["D9", "'D9'"],
    ["D10", "'D10'"],
    ["D11", "'D11'"],
    ["D12", "'D12'"],
    ["D13", "'D13'"],
    ["D14", "'D14'"],
    ["D15", "'D15'"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D2", "'D2'"],
    ["D3", "'D3'"],
    ["D4", "'D4'"],
    ["D5", "'D5'"],
    ["D6", "'D6'"],
    ["D7", "'D7'"],
    ["D8", "'D8'"],
    ["D9", "'D9'"]
  ]
};

Blockly.Constants.Pins.analog_read = {
  [BOARD_NUCLEO_L476]: [
    ["A0", "'A0'"],
    ["A1", "'A1'"],
    ["A2", "'A2'"],
    ["A3", "'A3'"],
    ["A4", "'A4'"],
    ["A5", "'A5'"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["A0", "'A0'"],
    ["A1", "'A1'"],
    ["A2", "'A2'"],
    ["A3", "'A3'"],
    ["A4", "'A4'"]
  ]
};

Blockly.Constants.Pins.PWM = {
  [BOARD_NUCLEO_L476]: [
    ["D3", "'TIM2_CH2'"],
    ["D5", "'TIM3_CH1'"],
    ["D6", "'TIM2_CH3'"],
    ["D9", "'TIM3_CH2'"],
    ["D10", "'TIM4_CH1'"],
    ["D11", "'TIM17_CH1'"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["D3", "'TIM2_CH2'"],
    ["D5", "'TIM3_CH1'"],
    ["D6", "'TIM2_CH3'"],
    ["D9", "'TIM3_CH2'"]
  ]
};

Blockly.Constants.Pins.UART = {
  [BOARD_NUCLEO_L476]: [
    ["2", "2"],
    ["1", "1"]
  ],
  [BOARD_SHIELD_GROVE]: [
    ["2", "2"],
    ["1", "1"]
  ]
};

Blockly.Constants.ST_BLE_SENSOR_SERVICES = {
  "CO_SENSOR": {
    "title": "CO Sensor (ppm)",
    "uuid": "00008000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "15",
    "fmt": "<Hi",
    adapt: (value) => {
        return "int(" + value + "*100)";
    }
  },
  "SECOND_TEMPERATURE": {
    "title": "Température 2 (°C)",
    "uuid": "00010000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "16",
    "fmt": "<h",
    adapt: (value) => {
        return "int(" + value + "*10)";
    }
  },
  "FIRST_TEMPERATURE": {
    "title": "Température 1 (°C)",
    "uuid": "00040000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "18",
    "fmt": "<Hh",
    adapt: (value) => {
        return "int(" + value + "*10)";
    }
  },
  "HUMIDITY": {
    "title": "Humidité (%)",
    "uuid": "00080000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "19",
    "fmt": "<h",
    adapt: (value) => {
        return "int(" + value + "*10)";
    }
  },
  "PRESSURE": {
    "title": "Pression (hPa ou mBar)",
    "uuid" : "00100000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "20",
    "fmt": "<i",
    adapt: (value) => {
        return "int(" + value + "*100)";
    }
  },
  "ACCELEROMETER": {
    "title": "Acceléromètre (mg.s-²)",
    "uuid" : "00800000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "23",
    "fmt": "<hhh",
    adapt: (value) => {
        return "int(" + value + ")";
    }
  },
  "LUMINOSITY": {
    "title": "Luminosité (lux)",
    "uuid" : "01000000-0001-11e1-ac36-0002a5d5c51b",
    "feature_mask_bit": "24",
    "fmt": "<h",
    adapt: (value) => {
        return "int(" + value + ")";
    }
  }
};

Blockly.Constants.COLOURS = {
  '#ff0000' : '0x00',
  '#ff0600' : '0x01',
  '#ff0c00' : '0x02',
  '#ff1200' : '0x03',
  '#ff1800' : '0x04',
  '#ff1e00' : '0x05',
  '#ff2400' : '0x06',
  '#ff2a00' : '0x07',
  '#ff3000' : '0x08',
  '#ff3600' : '0x09',
  '#ff3c00' : '0x0a',
  '#ff4200' : '0x0b',
  '#ff4800' : '0x0c',
  '#ff4e00' : '0x0d',
  '#ff5400' : '0x0e',
  '#ff5a00' : '0x0f',
  '#ff6000' : '0x10',
  '#ff6600' : '0x11',
  '#ff6c00' : '0x12',
  '#ff7200' : '0x13',
  '#ff7800' : '0x14',
  '#ff7e00' : '0x15',
  '#ff8400' : '0x16',
  '#ff8a00' : '0x17',
  '#ff9000' : '0x18',
  '#ff9600' : '0x19',
  '#ff9c00' : '0x1a',
  '#ffa200' : '0x1b',
  '#ffa800' : '0x1c',
  '#ffae00' : '0x1d',
  '#ffb400' : '0x1e',
  '#ffba00' : '0x1f',
  '#ffc000' : '0x20',
  '#ffc600' : '0x21',
  '#ffcc00' : '0x22',
  '#ffd200' : '0x23',
  '#ffd800' : '0x24',
  '#ffde00' : '0x25',
  '#ffe400' : '0x26',
  '#ffea00' : '0x27',
  '#fff000' : '0x28',
  '#fff600' : '0x29',
  '#ffff00' : '0x2a',
  '#f9ff00' : '0x2b',
  '#f3ff00' : '0x2c',
  '#edff00' : '0x2d',
  '#e7ff00' : '0x2e',
  '#e1ff00' : '0x2f',
  '#dbff00' : '0x30',
  '#d5ff00' : '0x31',
  '#cfff00' : '0x32',
  '#c9ff00' : '0x33',
  '#c3ff00' : '0x34',
  '#bdff00' : '0x35',
  '#b7ff00' : '0x36',
  '#b1ff00' : '0x37',
  '#abff00' : '0x38',
  '#a5ff00' : '0x39',
  '#9fff00' : '0x3a',
  '#99ff00' : '0x3b',
  '#93ff00' : '0x3c',
  '#8dff00' : '0x3d',
  '#87ff00' : '0x3e',
  '#81ff00' : '0x3f',
  '#7bff00' : '0x40',
  '#75ff00' : '0x41',
  '#6fff00' : '0x42',
  '#69ff00' : '0x43',
  '#63ff00' : '0x44',
  '#5dff00' : '0x45',
  '#57ff00' : '0x46',
  '#51ff00' : '0x47',
  '#4bff00' : '0x48',
  '#45ff00' : '0x49',
  '#3fff00' : '0x4a',
  '#39ff00' : '0x4b',
  '#33ff00' : '0x4c',
  '#2dff00' : '0x4d',
  '#27ff00' : '0x4e',
  '#21ff00' : '0x4f',
  '#1bff00' : '0x50',
  '#15ff00' : '0x51',
  '#0fff00' : '0x52',
  '#09ff00' : '0x53',
  '#03ff00' : '0x54',
  '#00ff00' : '0x55',
  '#00ff06' : '0x56',
  '#00ff0c' : '0x57',
  '#00ff12' : '0x58',
  '#00ff18' : '0x59',
  '#00ff1e' : '0x5a',
  '#00ff24' : '0x5b',
  '#00ff2a' : '0x5c',
  '#00ff30' : '0x5d',
  '#00ff36' : '0x5e',
  '#00ff3c' : '0x5f',
  '#00ff42' : '0x60',
  '#00ff48' : '0x61',
  '#00ff4e' : '0x62',
  '#00ff54' : '0x63',
  '#00ff5a' : '0x64',
  '#00ff60' : '0x65',
  '#00ff66' : '0x66',
  '#00ff6c' : '0x67',
  '#00ff72' : '0x68',
  '#00ff78' : '0x69',
  '#00ff7e' : '0x6a',
  '#00ff84' : '0x6b',
  '#00ff8a' : '0x6c',
  '#00ff90' : '0x6d',
  '#00ff96' : '0x6e',
  '#00ff9c' : '0x6f',
  '#00ffa2' : '0x70',
  '#00ffa8' : '0x71',
  '#00ffae' : '0x72',
  '#00ffb4' : '0x73',
  '#00ffba' : '0x74',
  '#00ffc0' : '0x75',
  '#00ffc6' : '0x76',
  '#00ffcc' : '0x77',
  '#00ffd2' : '0x78',
  '#00ffd8' : '0x79',
  '#00ffde' : '0x7a',
  '#00ffe4' : '0x7b',
  '#00ffea' : '0x7c',
  '#00fff0' : '0x7d',
  '#00fff6' : '0x7e',
  '#00fffc' : '0x7f',
  '#00ffff' : '0x80',
  '#00f9ff' : '0x81',
  '#00f3ff' : '0x82',
  '#00edff' : '0x83',
  '#00e7ff' : '0x84',
  '#00e1ff' : '0x85',
  '#00dbff' : '0x86',
  '#00d5ff' : '0x87',
  '#00cfff' : '0x88',
  '#00c9ff' : '0x89',
  '#00c3ff' : '0x8a',
  '#00bdff' : '0x8b',
  '#00b7ff' : '0x8c',
  '#00b1ff' : '0x8d',
  '#00abff' : '0x8e',
  '#00a5ff' : '0x8f',
  '#009fff' : '0x90',
  '#0099ff' : '0x91',
  '#0093ff' : '0x92',
  '#008dff' : '0x93',
  '#0087ff' : '0x94',
  '#0081ff' : '0x95',
  '#007bff' : '0x96',
  '#0075ff' : '0x97',
  '#006fff' : '0x98',
  '#0069ff' : '0x99',
  '#0063ff' : '0x9a',
  '#005dff' : '0x9b',
  '#0057ff' : '0x9c',
  '#0051ff' : '0x9d',
  '#004bff' : '0x9e',
  '#0045ff' : '0x9f',
  '#003fff' : '0xa0',
  '#0039ff' : '0xa1',
  '#0033ff' : '0xa2',
  '#002dff' : '0xa3',
  '#0027ff' : '0xa4',
  '#0021ff' : '0xa5',
  '#001bff' : '0xa6',
  '#0015ff' : '0xa7',
  '#000fff' : '0xa8',
  '#0009ff' : '0xa9',
  '#0000ff' : '0xaa',
  '#0600ff' : '0xab',
  '#0c00ff' : '0xac',
  '#1200ff' : '0xad',
  '#1800ff' : '0xae',
  '#1e00ff' : '0xaf',
  '#2400ff' : '0xb0',
  '#2a00ff' : '0xb1',
  '#3000ff' : '0xb2',
  '#3600ff' : '0xb3',
  '#3c00ff' : '0xb4',
  '#4200ff' : '0xb5',
  '#4800ff' : '0xb6',
  '#4e00ff' : '0xb7',
  '#5400ff' : '0xb8',
  '#5a00ff' : '0xb9',
  '#6000ff' : '0xba',
  '#6600ff' : '0xbb',
  '#6c00ff' : '0xbc',
  '#7200ff' : '0xbd',
  '#7800ff' : '0xbe',
  '#7e00ff' : '0xbf',
  '#8400ff' : '0xc0',
  '#8a00ff' : '0xc1',
  '#9000ff' : '0xc2',
  '#9600ff' : '0xc3',
  '#9c00ff' : '0xc4',
  '#a200ff' : '0xc5',
  '#a800ff' : '0xc6',
  '#ae00ff' : '0xc7',
  '#b400ff' : '0xc8',
  '#ba00ff' : '0xc9',
  '#c000ff' : '0xca',
  '#c600ff' : '0xcb',
  '#cc00ff' : '0xcc',
  '#d200ff' : '0xcd',
  '#d800ff' : '0xce',
  '#de00ff' : '0xcf',
  '#e400ff' : '0xd0',
  '#ea00ff' : '0xd1',
  '#f000ff' : '0xd2',
  '#f600ff' : '0xd3',
  '#ff00ff' : '0xd4',
  '#ff00f9' : '0xd5',
  '#ff00f3' : '0xd6',
  '#ff00ed' : '0xd7',
  '#ff00e7' : '0xd8',
  '#ff00e1' : '0xd9',
  '#ff00db' : '0xda',
  '#ff00d5' : '0xdb',
  '#ff00cf' : '0xdc',
  '#ff00c9' : '0xdd',
  '#ff00c3' : '0xde',
  '#ff00bd' : '0xdf',
  '#ff00b7' : '0xe0',
  '#ff00b1' : '0xe1',
  '#ff00ab' : '0xe2',
  '#ff00a5' : '0xe3',
  '#ff009f' : '0xe4',
  '#ff0099' : '0xe5',
  '#ff0093' : '0xe6',
  '#ff008d' : '0xe7',
  '#ff0087' : '0xe8',
  '#ff0081' : '0xe9',
  '#ff007b' : '0xea',
  '#ff0075' : '0xeb',
  '#ff006f' : '0xec',
  '#ff0069' : '0xed',
  '#ff0063' : '0xee',
  '#ff005d' : '0xef',
  '#ff0057' : '0xf0',
  '#ff0051' : '0xf1',
  '#ff004b' : '0xf2',
  '#ff0045' : '0xf3',
  '#ff003f' : '0xf4',
  '#ff0039' : '0xf5',
  '#ff0033' : '0xf6',
  '#ff002d' : '0xf7',
  '#ff0027' : '0xf8',
  '#ff0021' : '0xf9',
  '#ff001b' : '0xfa',
  '#ff0015' : '0xfb',
  '#ff000f' : '0xfc',
  '#ff0009' : '0xfd',
  '#ffffff' : '0xfe',
  '#000000' : '0xff'
};