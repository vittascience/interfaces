//name
const INTERFACE_NAME = "l476";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = 'from machine import *\nfrom pyb import *\n\nwhile True:\n  pass';
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = "simuOnly";
//toolbox
const TOOLBOX_STYLE_VITTA = "vittascience";
const TOOLBOX_STYLE_SCRATCH = "scratch";
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//board
const BOARD_NUCLEO_L476 = "l476";
const BOARD_SHIELD_GROVE = "shield-grove";
const BOARD_DEFAULT = BOARD_NUCLEO_L476;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//adc
const READ_ANALOG_MAX_VALUE = 4095;
const PWM_MAX_DUTY = 255;
const WRITE_ANALOG_MAX_VALUE = PWM_MAX_DUTY;
//libraries
const LIBRARIES_PATH = {
    'stm32_donutbot': "/donutbot",
    'stm32_sts3032': "/donutbot",
    'stm32_veml6040': "/donutbot",
    'stm32_alphabot_v2': "/alphabot",
    'stm32_TRsensors': "/alphabot",
    'stm32_bmp280': "/grove",
    'stm32_chainableLED': "/grove",
    'stm32_colorSensor': "/grove",
    'stm32_dht': "/grove",
    'stm32_gas': "/grove",
    'stm32_hm330x': "/grove",
    'stm32_lcd_i2c': "/grove",
    'stm32_pcf85063tp': "/grove",
    'stm32_scd30': "/grove",
    'stm32_sgp30': "/grove",
    'stm32_sht31': "/grove",
    'stm32_si1145': "/grove",
    'stm32_ssd1306': "/grove",
    'stm32_th02': "/grove",
    'stm32_tm1637': "/grove",
    'stm32_vl53l0x': "/grove",
    'stm32_LoRa': "/grove",
    'stm32_driverAT': "/grove",
    'stm32_ds18x20': "/grove",
    'stm32_rgb_led_matrix': "/grove",
    'stm32_ir_receiver': "/infrared",
    'stm32_nec': "/infrared",
    'HTS221': "/ISK01A3",
    'LIS2DW12': "/ISK01A3",
    'LIS2MDL': "/ISK01A3",
    'LPS22': "/ISK01A3",
    'LSM6DSO': "/ISK01A3",
    'STTS751': "/ISK01A3",
    'neopixel': "",
    'stm32_m24sr64': "",
    'stm32_pcf8574': "",
    'stm32_ht16k33': "/HT16K33",
    'stm32_ht16k33matrix': "/HT16K33",
    'stm32_ht16k33matrixcolour': "/HT16K33",
    'stm32_ht16k33matrixfeatherwing': "/HT16K33",
    'stm32_ht16k33segment': "/HT16K33",
    'stm32_ht16k33segment14': "/HT16K33",
    'stm32_ht16k33segmentbig': "/HT16K33",
    'onewire': ""
};
//simulator
const SIMULATOR_DEFAULT_BOARD = {
    "link": 'nucleo_l476rg_v2.svg',
    "name": 'STM32 NUCLEO-L476RG'
};
const SIMULATOR_DEFAULT_ROBOT = 'Alphabot';
//serial
const SERIAL_PRODUCTS = {
    'stm32_nucleo_l476': {
        'usbProductId': 0x374B,
        'usbVendorId': 0x483
    }
};
const SERIAL_PRODUCT_FILTER = true;
const SERIAL_CHUNK_SIZE = 255;
