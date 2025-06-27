//name
const INTERFACE_NAME = "nao";
//code
const DEFAULT_XML_START = {
    "vittascience": '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"on_start\" id=\"G[=T#8yqB70`NFgYq}GP\" deletable=\"false\" x=\"0\" y=\"0\"><statement name=\"DO\"></statement></block></xml>',
    "scratch": '<xml xmlns="https://developers.google.com/blockly/xml"><block type="scratch_on_start" id="G[=T#8yqB70`NFgYq}GP" deletable="false" x="0" y="0"><next><block type="scratch_forever" id="o[WN]+eeF.OUxGch67@8"></block></next></block></xml>'
};
const DEFAULT_CODE_START = '';
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
const BOARD_NAO = "nao";
const BOARD_DEFAULT = BOARD_NAO;
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["on_start", "forever", "scratch_on_start", "procedures_defnoreturn", "procedures_defreturn", "communication_asr_getLastWord_callback_decorated"];
//example projects
// example order: Decouverte de NAO, NAO fait coucou, Animation des LEDs des yeux de NAO, Chorégraphie des bras avec NAO, Pierre feuille ciseaux, Capteurs et couleurs, Calcul mental, Aventure avec NAO, Conte interactif, Jeu des capitales
const EXAMPLE_PROJECT_LINKS = ["6797afe35c76c", "6797a9482dc33", "67979502c134a", "67979b66db71f", "6797883ea97da", "6797845e4ae2f", "679785c44fe9f", "67978298eb2e7", "679783c4d73c6", "67978bfc7f051"];
//libraries
const LIBRARIES_PATH = {};
//simulator default board
const SIMULATOR_DEFAULT_BOARD = BOARD_DEFAULT;

