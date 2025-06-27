// this file is used in order to list boards and know about some of their features for building and uploading.
const ARDUINO_BOARDS = [
    {
        "id": 'nano',
        "name": "Rocket/Car/Piano",
        "productId": ['0x6001', '0x7523', '0x24597','0x6015'],
        "protocol": 'stk500v1',
        "maximum_size": 30720,
        "baud": 115200,
        "signature": [0x1e, 0x95, 0x0f],
        "disable_flushing": false,
        "pageSize": 128,
        "numPages": 256,
        "timeout": 400,
        "low_fuses": 0xFF,
        "high_fuses": 0xDA,
        "extended_fuses": 0xFD,
        "path": "optiboot",
        "file": "optiboot_atmega328.hex",
        "unlock_bits": 0x3F,
        "lock_bits": 0x0F,
        "mcu": "atmega328p",
        "f_cpu": "16000000L",
        "pid": 0X7523,
        "vid": 0X1A86,
        "core": "arduino",
        "variant": "eightanaloginputs",
        "productPage": 'https://web.archive.org/web/20150813095112/https://www.arduino.cc/en/Main/ArduinoBoardNano',
        "vittaTest": true
    }
];