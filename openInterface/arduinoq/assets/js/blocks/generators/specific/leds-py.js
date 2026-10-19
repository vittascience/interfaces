/**
 * @fileoverview RGB LED python generators of the Arduino UNO Q: LEDs 1 and 2 are Linux LEDs (/sys/class/leds).
 */

Blockly.Python.display_unoq_linuxRgbLed = function (block) {
    const led = block.getFieldValue("LED");
    const color = block.getFieldValue("COLOR").split('').join(', ');
    Blockly.Python.addFunction('unoq_set_rgb_led', `# RGB LEDs 1 and 2 of the board, driven by Linux (/sys/class/leds)
def unoq_set_rgb_led(led, color):
  # LED 1: user LED, LED 2: system status LED (panic, wifi and bluetooth activity)
  names = {1: ("red:user", "green:user", "blue:user"), 2: ("red:panic", "green:wlan", "blue:bt")}[led]
  for name, state in zip(names, color):
    path = "/sys/class/leds/" + name
    try:
      # The program drives the LED: no system trigger (wifi activity...)
      with open(path + "/trigger", "w") as led_file:
        led_file.write("none")
      with open(path + "/brightness", "w") as led_file:
        led_file.write(str(state))
    except OSError as error:
      print("LED", led, name, ":", error)`);
    return "unoq_set_rgb_led(" + led + ", (" + color + "))" + NEWLINE;
};
