Board = Object.create(null)

Board.STM32_MACHINE_INFO =
  `ID=43003d00:12504e54:57323220
S=64000000
H=64000000
P1=64000000
P2=64000000
_etext=806bca8
_sidata=806bce0
_sdata=20000000
_edata=20000580
_sbss=20000580
_ebss=2000e424
_sstack=2002aff8
_estack=2002eff8
_ram_start=20000000
_heap_start=2000e424
_heap_end=2002aff8
_ram_end=20030000
qstr:
  n_pool=1
  n_qstr=10
  n_str_data_bytes=79
  n_total_bytes=175
GC:
  115008 total
  8496 : 106512
  1=194 2=69 m=40
LFS free: 233984 bytes
None`;

Board.Pins = {
  STM32_PINS: [
    "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16",
    "A_BUTTON", "B_BUTTON", "MENU_BUTTON", "UP_BUTTON", "DOWN_BUTTON", "LEFT_BUTTON", "RIGHT_BUTTON", 
    "DATA_COMMAND_DISPLAY", "RST_DISPLAY", "CS_DISPLAY", "RST_EXPANDER"
  ],
  STM32_ADC_PINS: [
    ["P0", "0"],
    ["P1", "1"],
    ["P2", "2"],
    ["P3", "3"],
    ["P4", "4"],
    ["P10", "10"]
  ]
};
