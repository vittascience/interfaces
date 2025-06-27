//name
const INTERFACE_NAME = "web";
//code start
const defaultProject = {
  name: 'Default project',
  description: 'Loaded project by default',
  code: {
    blockly: {
      html: '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"html\" id=\"9AuhF6w1CxM)Ii%YO%Yp\" x=\"37\" y=\"12\"><statement name=\"content\"><block type=\"head\" id=\")q1E.C)M)`JM7eq20\"><statement name=\"content\"><block type=\"style\" id=\"kF7XPUcd5umpy$Z/d\"><statement name=\"content\"><block type=\"cssitem\" id=\"speOs4v2i8(Nw0qeP\"><field name=\"selector\">h1</field><statement name=\"content\"><block type=\"fontsize\" id=\"MOgPchMoF.o1]7m(`E\"><field name=\"value\">30px</field><next><block type=\"fontweight\" id=\"DvPM([G*cDqtkZki4J\"><field name=\"weight\">bold</field><next><block type=\"colornew\" id=\"jefUdvNQnRE{J0oFI\"><value name=\"value\"><block type=\"hex_picker\" id=\"!TdVzi[eujj4!7g8hsH3\"><field name=\"color\">228b22</field></block></value></block></next></block></next></block></statement><next><block type=\"cssitem\" id=\"25[DqU7iUTX41)EbAIl\"><field name=\"selector\">p</field><statement name=\"content\"><block type=\"fontfamily\" id=\"ttH(AXt1yzWp/w\"><field name=\"value\">sans-serif</field></block></statement></block></next></block></statement></block></statement><next><block type=\"body\" id=\"aF2f/bpcDHA)yqv3RK\"><statement name=\"content\"><block type=\"header\" id=\"I{}N3QNEeJWlhl75s,\"><field name=\"size\">1</field><statement name=\"content\"><block type=\"emptytext\" id=\"([Pxfk9OW0]spNnhVxh\"><field name=\"content\">Accueil de mon site</field></block></statement><next><block type=\"paragraph\" id=\"8[lTZa]5TW$5jr/EU{q\"><statement name=\"content\"><block type=\"emptytext\" id=\",h)0XX..OgX}90XIY8\"><field name=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum erat quis neque lacinia, vitae auctor nunc scelerisque. Suspendisse malesuada ligula sem. In iaculis, nisl in auctor aliquam, ante massa efficitur arcu, eget dictum eros ligula ut tellus. In vel venenatis augue, sed scelerisque eros. Vestibulum fermentum sem tortor, a varius felis faucibus vitae. Donec augue augue, dapibus quis est ut, laoreet mollis tellus. Vivamus aliquam diam et sapien ornare dictum. Aliquam purus quam, porttitor suscipit urna at, pretium rutrum nisi. Cras commodo enim semper auctor maximus. Curabitur rhoncus tortor vel ex pretium eleifend. Nunc condimentum ullamcorper mauris.</field></block></statement></block></next></block></statement></block></next></block></statement></block></xml>',
      css: '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"style\" id=\"wLhgB7RrkmSuM)fDZm-!\" x=\"63\" y=\"12\"><statement name=\"content\"><block type=\"cssitem\" id=\"lj(S8e$SdnMs{f[bdqqd\"><field name=\"selector\">h1</field><statement name=\"content\"><block type=\"fontsize\" id=\"DIu4OLEKiLVktWmm!}g6\"><field name=\"value\">30px</field><next><block type=\"fontweight\" id=\"(ndEpwF*aZ,+s+H2g%m3\"><field name=\"weight\">bold</field><next><block type=\"color\" id=\",1uUn~Y4~j4%wt6fYwKB\"><field name=\"value\">#339999</field></block></next></block></next></block></statement><next><block type=\"cssitem\" id=\";7MjM;0bf5GicX`D7x;#\"><field name=\"selector\">p</field><statement name=\"content\"><block type=\"fontfamily\" id=\"~I2qzxJ22JxoZS+Cs6|I\"><field name=\"value\">sans-serif</field></block></statement></block></next></block></statement></block></xml>',
      js: '<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>'
    },
    ace: {
      html: '<html>\n  <body>\n    <h1>\n      Accueil de mon site\n    </h1>\n    <p>\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum erat quis neque lacinia, vitae auctor nunc scelerisque. Suspendisse malesuada ligula sem. In iaculis, nisl in auctor aliquam, ante massa efficitur arcu, eget dictum eros ligula ut tellus. In vel venenatis augue, sed scelerisque eros. Vestibulum fermentum sem tortor, a varius felis faucibus vitae. Donec augue augue, dapibus quis est ut, laoreet mollis tellus. Vivamus aliquam diam et sapien ornare dictum. Aliquam purus quam, porttitor suscipit urna at, pretium rutrum nisi. Cras commodo enim semper auctor maximus. Curabitur rhoncus tortor vel ex pretium eleifend. Nunc condimentum ullamcorper mauris.\n    </p>\n  </body>\n</html>\n',
      css: 'h1{\n\tfont-size: 30px;\n\tfont-weight: bold;\n\tcolor: forestgreen;\n}\np{\n\tfont-family: sans-serif;\n}\n',
      js: ''
    }
  },
  codeText: {
    html: '<html>\n  <body>\n    <h1>\n      Accueil de mon site\n    </h1>\n    <p>\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum erat quis neque lacinia, vitae auctor nunc scelerisque. Suspendisse malesuada ligula sem. In iaculis, nisl in auctor aliquam, ante massa efficitur arcu, eget dictum eros ligula ut tellus. In vel venenatis augue, sed scelerisque eros. Vestibulum fermentum sem tortor, a varius felis faucibus vitae. Donec augue augue, dapibus quis est ut, laoreet mollis tellus. Vivamus aliquam diam et sapien ornare dictum. Aliquam purus quam, porttitor suscipit urna at, pretium rutrum nisi. Cras commodo enim semper auctor maximus. Curabitur rhoncus tortor vel ex pretium eleifend. Nunc condimentum ullamcorper mauris.\n    </p>\n  </body>\n</html>\n',
    css: 'h1{\n\tfont-size: 30px;\n\tfont-weight: bold;\n\tcolor: forestgreen;\n}\np{\n\tfont-family: sans-serif;\n}\n',
    js: ''
  },
  codeManuallyModified: false,
  public: false,
  link: null
};
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = "simuOnly";
//autocorrector
const AUTOCORRECTOR_DISABLED = true;
//newline
const NEWLINE = '\n';
//tabulation
const TAB = '  ';


// javascript block type to exclude from the standalone_blocks if a JS new block is added, add it here as well 
const JS_BLOCKS = [
  "addeventlistener",
  "bi_access_field",
  "bi_adaptor",
  "bi_anonymous_class",
  "bi_assignment",
  "bi_assignment_return",
  "bi_break",
  "bi_call",
  "bi_call_editable",
  "bi_call_editable_return",
  "bi_call_statement",
  "bi_case",
  "bi_catch",
  "bi_class",
  "bi_code_line",
  "bi_code_part",
  "bi_comment",
  "bi_continue",
  "bi_direct_call_editable",
  "bi_direct_call_editable_return",
  "bi_export",
  "bi_field",
  "bi_field_return",
  "bi_for",
  "bi_for_in",
  "bi_function",
  "bi_function_return",
  "bi_get",
  "bi_import",
  "bi_import_as",
  "bi_index",
  "bi_logic_compare",
  "bi_logic_operation",
  "bi_maps_get",
  "bi_maps_set",
  "bi_math_arithmetic",
  "bi_new",
  "bi_return",
  "bi_s1",
  "bi_set",
  "bi_set_to",
  "bi_spread",
  "bi_statement",
  "bi_static",
  "bi_string_return",
  "bi_switch",
  "bi_throw",
  "bi_try_catch",
  "bi_unary",
  "bi_unary_postfix",
  "bi_unary_postfix_return",
  "bi_unary_return",
  "bi_var",
  "bi_var_name",
  "bi_yield",
  "bi_yield_return",
  "colour",
  "colour_blend",
  "colour_picker",
  "colour_random",
  "colour_rgb",
  "controls_flow_statements",
  "controls_for",
  "controls_forEach",
  "controls_if",
  "controls_ifelse",
  "controls_repeat",
  "controls_repeat_ext",
  "controls_whileUntil",
  "definitions_",
  "editattribut",
  "finish",
  "functionNames_",
  "getAdjusted",
  "getelementbyid",
  "getelementsbyclassname",
  "getelementsbytagname",
  "init",
  "isInitialized",
  "lists",
  "lists_create_empty",
  "lists_create_with",
  "lists_getIndex",
  "lists_getSublist",
  "lists_indexOf",
  "lists_isEmpty",
  "lists_length",
  "lists_repeat",
  "lists_reverse",
  "lists_setIndex",
  "lists_sort",
  "lists_split",
  "logic",
  "logic_boolean",
  "logic_compare",
  "logic_negate",
  "logic_null",
  "logic_operation",
  "logic_ternary",
  "loops",
  "math",
  "math_arithmetic",
  "math_atan2",
  "math_change",
  "math_constant",
  "math_constrain",
  "math_modulo",
  "math_number",
  "math_number_property",
  "math_on_list",
  "math_random_float",
  "math_random_int",
  "math_round",
  "math_single",
  "math_trig",
  "multiline_quote_",
  "nameDB_",
  "name_",
  "procedures",
  "procedures_callnoreturn",
  "procedures_callreturn",
  "procedures_defnoreturn",
  "procedures_defreturn",
  "procedures_ifreturn",
  "quote_",
  "scrubNakedValue",
  "scrub_",
  "text",
  "text_append",
  "text_changeCase",
  "text_charAt",
  "text_count",
  "text_getSubstring",
  "text_indexOf",
  "text_isEmpty",
  "text_join",
  "text_length",
  "text_multiline",
  "text_print",
  "text_prompt",
  "text_prompt_ext",
  "text_replace",
  "text_reverse",
  "text_trim",
  "texts",
  "variables",
  "variablesDynamic",
  "variables_get",
  "variables_get_dynamic",
  "variables_set",
  "variables_set_dynamic"
];


//code
const DEFAULT_XML_START =  '<xml xmlns="https://developers.google.com/blockly/xml"><block type="html" id="9AuhF6w1CxM)Ii%YO%Yp" x="37" y="12"><statement name="content"><block type="head" id=")q1E.C)M)`JM7eq20"><statement name="content"><block type="style" id="kF7XPUcd5umpy$Z/d"><statement name="content"><block type="cssitem" id="speOs4v2i8(Nw0qeP"><field name="selector">h1</field><statement name="content"><block type="fontsize" id="MOgPchMoF.o1]7m(`E"><field name="value">30px</field><next><block type="fontweight" id="DvPM([G*cDqtkZki4J"><field name="weight">bold</field><next><block type="colornew" id="jefUdvNQnRE{J0oFI"><value name="value"><block type="hex_picker" id="!TdVzi[eujj4!7g8hsH3"><field name="color">228b22</field></block></value></block></next></block></next></block></statement><next><block type="cssitem" id="25[DqU7iUTX41)EbAIl"><field name="selector">p</field><statement name="content"><block type="fontfamily" id="ttH(AXt1yzWp/w"><field name="value">sans-serif</field></block></statement></block></next></block></statement></block></statement><next><block type="body" id="aF2f/bpcDHA)yqv3RK"><statement name="content"><block type="header" id="I{}N3QNEeJWlhl75s,"><field name="size">1</field><statement name="content"><block type="emptytext" id="([Pxfk9OW0]spNnhVxh"><field name="content">Accueil de mon site</field></block></statement><next><block type="paragraph" id="8[lTZa]5TW$5jr/EU{q"><statement name="content"><block type="emptytext" id=",h)0XX..OgX}90XIY8"><field name="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum erat quis neque lacinia, vitae auctor nunc scelerisque. Suspendisse malesuada ligula sem. In iaculis, nisl in auctor aliquam, ante massa efficitur arcu, eget dictum eros ligula ut tellus. In vel venenatis augue, sed scelerisque eros. Vestibulum fermentum sem tortor, a varius felis faucibus vitae. Donec augue augue, dapibus quis est ut, laoreet mollis tellus. Vivamus aliquam diam et sapien ornare dictum. Aliquam purus quam, porttitor suscipit urna at, pretium rutrum nisi. Cras commodo enim semper auctor maximus. Curabitur rhoncus tortor vel ex pretium eleifend. Nunc condimentum ullamcorper mauris.</field></block></statement></block></next></block></statement></block></next></block></statement></block></xml>';
const DEFAULT_CODE_START = '<body>\n  <h1>\n    Accueil de mon site\n  </h1>\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum erat quis neque lacinia, vitae auctor nunc scelerisque. Suspendisse malesuada ligula sem. In iaculis, nisl in auctor aliquam, ante massa efficitur arcu, eget dictum eros ligula ut tellus. In vel venenatis augue, sed scelerisque eros. Vestibulum fermentum sem tortor, a varius felis faucibus vitae. Donec augue augue, dapibus quis est ut, laoreet mollis tellus. Vivamus aliquam diam et sapien ornare dictum. Aliquam purus quam, porttitor suscipit urna at, pretium rutrum nisi. Cras commodo enim semper auctor maximus. Curabitur rhoncus tortor vel ex pretium eleifend. Nunc condimentum ullamcorper mauris.\n  </p>\n</body>\n';
//toolbox
const TOOLBOX_STYLE_VITTA = "vittascience";
const TOOLBOX_STYLE_SCRATCH = TOOLBOX_STYLE_VITTA;
const TOOLBOX_STYLE_DEFAULT = TOOLBOX_STYLE_VITTA;
//example projects
const EXAMPLE_PROJECT_LINKS = [];

const TOOLBOXES = [
  {
      "id": TOOLBOX_STYLE_VITTA,
      "categories": TOOLBOX_VITTASCIENCE_CATEGORIES,
      "subcategories": TOOLBOX_VITTASCIENCE_SUBCATEGORIES,
      "content": TOOLBOX_VITTASCIENCE_CONTENT,
      "content-simple": TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE,
      "theme": THEME_VITTASCIENCE
  }
];