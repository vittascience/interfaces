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
        "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15",
        "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15",
        "SW1", "SW2", "SW3"
    ],
    STM32_ADC_PINS: [
        // [pin, channel]
        ["D0", "8"],
        ["D1", "7"],
        ["D6", "15"],
        ["D9", "16"],
        ["D10", "9"],
        ["D11", "12"],
        ["D12", "11"],
        ["D13", "10"],
        ["A0", "1"],
        ["A1", "2"],
        ["A2", "6"],
        ["A3", "5"],
        ["A4", "4"],
        ["A5", "3"],
        ["A6", "11"],
        ["A7", "12"],
        ["A8", "15"],
        ["A9", "16"]
    ]
};
