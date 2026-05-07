// You can modify functions but don't refactoring strings writing format, it is used if python code has to be changed
// Spaces and indents are very important in python code/***** INPUT/OUTPUT CATEGORY ****/
const FUNCTIONS_STEAMI = {

/****** INPUTS/OUTPUTS CATEGORY ******/

DEF_MCP23009E_INIT_BUTTONS: `
def initSteamiButtons():
  buttons = [MCP23009_BTN_UP, MCP23009_BTN_DOWN, MCP23009_BTN_LEFT, MCP23009_BTN_RIGHT]
  print("Configuration des boutons...")
  for btn_pin in buttons:
      mcp.setup(btn_pin, MCP23009_DIR_INPUT, pullup=MCP23009_PULLUP)
  print("Configuration terminée")`,

DEF_MCP23009E_READ_BUTTON: `
def readSteamiButton(button):
  if button == "UP_BUTTON":
    btn_pin = MCP23009_BTN_UP
  elif button == "DOWN_BUTTON":
    btn_pin = MCP23009_BTN_DOWN
  elif button == "LEFT_BUTTON":
    btn_pin = MCP23009_BTN_LEFT
  elif button == "RIGHT_BUTTON":
    btn_pin = MCP23009_BTN_RIGHT
  return mcp.get_level(btn_pin)`,
};