//name
const INTERFACE_NAME = "picaxe";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" x="200" y="0"></block></xml>'
};
const DEFAULT_CODE_START = 'main:\ndo\nloop\n';
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = "simuOnly";
//toolbox
const TOOLBOX_STYLE_VITTA = "vittascience";
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "procedures_defnoreturn"];
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//board
const pinRange = (port, n) => [...Array(n).keys()].map(i => `${port}.${i}`);
const BOARD_DEFAULT = "autoprogx2";
// only the AutoProgX2 for now. chip: #picaxe directive, words: word registers (w0..), outputs/inputs/analogs/servos: pins of
// each PIN dropdown (servo: port B only), shown with the board silkscreen names (picaxePins)
const INTERFACE_BOARDS = {
    // AutoProgX2 (A4 Technologie): Out 0..7 = B.0..B.7, In 0..7 = C.0..C.7, An 0..3 = A.0..A.3 (jack 2.5 mm)
    "autoprogx2": {
        link: "picaxe.svg", name: "AutoProgX2 (PICAXE-28X2)", chip: "28X2", words: 28,
        outputs: pinRange('B', 8), inputs: pinRange('C', 8), analogs: pinRange('A', 4), servos: pinRange('B', 8)
    }
};
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
