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
