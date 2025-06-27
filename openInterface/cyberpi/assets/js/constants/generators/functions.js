// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/

const FUNCTIONS_CYBERPY = {

DEF_PIN_ADC:
`def pinADC(pinNumber, db=machine.ADC.ATTN_11DB, bit=machine.ADC.WIDTH_10BIT):
  pin = machine.ADC(machine.Pin(pinNumber))
  pin.atten(db)
  pin.width(bit)
  return pin`

}