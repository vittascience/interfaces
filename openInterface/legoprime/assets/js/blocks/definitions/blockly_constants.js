Blockly.Constants.PRINT_START_N = 0;

Blockly.Constants.LOOP_TYPES = [
  'forever',
  'scratch_forever',
  'controls_repeat',
  'controls_forEach',
  'controls_for',
  'controls_whileUntil'
];

Blockly.Constants.LEGO_PORTS = ["A", "B", "C", "D", "E", "F"].map(port => [port, port]);
Blockly.Constants.LEGO_DIRECTIONS = [["↻", "forward"], ["↺", "backward"]];
// spike colors: [rgb swatch, name of the `color` module constant]
Blockly.Constants.LEGO_COLORS = [
    ["0, 0, 0", "BLACK"], ["238, 130, 238", "MAGENTA"], ["128, 0, 128", "PURPLE"], ["0, 0, 255", "BLUE"],
    ["0, 127, 255", "AZURE"], ["64, 224, 208", "TURQUOISE"], ["0, 128, 0", "GREEN"], ["255, 255, 0", "YELLOW"],
    ["255, 165, 0", "ORANGE"], ["255, 0, 0", "RED"], ["255, 255, 255", "WHITE"]
].map(([rgb, name]) => [{ src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='20' style='fill:rgb(" + rgb + ");stroke:white'/></svg>", width: 20, height: 20, alt: "" }, name]);
