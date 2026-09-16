//name
const INTERFACE_NAME = "arduinoq";
//code start
const DEFAULT_XML_START = {
    "vittascience": 
`<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="cpp_scratch_on_start" id="G[=T#8yqB20jNFgYq}GP" deletable="false" x="0" y="0"><next>
        <block type="cpp_scratch_forever" id="o[WN]+eeF.OUxGch67@8" deletable="false"></block></next>
    </block>
    <block type="py_scratch_on_start" id="D[=T#7yqB70eNFfYq}GP" deletable="false" x="0" y="200"></block>
</xml>`
};
// <block type="html_page" id="D[=T@fyq470eNFf23}GP" deletable="true" x="0" y="300"></block>
const DEFAULT_CODE_START = "void setup() {\n}\n\nvoid loop() {\n}";
const REPLACE_CODE_REQUESTS = {};
const REMOVE_INPUT_VALUE_CONNECTION = {
};
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
//board
const BOARD_ARDUINO_UNO_Q = "unoq";
const BOARD_DEFAULT = BOARD_ARDUINO_UNO_Q;
// only for constants
const BOARD_ARDUINO_UNO = "uno";
const BOARD_ARDUINO_NANO = "nano";
const BOARD_ARDUINO_MEGA = "mega";
const BOARD_ARDUINO_UNO_R4_WIFI = "unor4wifi";
const BOARD_ARDUINO_UNO_R4_MINIMA = "unor4minima";
const BOARD_ARDUINO_PRO_MINI = 'pro-mini';
//libraries
const LIBRARIES_PATH = {
    'vitta_tf': ""
};
//shield
const BOARD_SHIELD_GROVE = "shield-grove";
//standalone_blocks
const BLOCKS_OUTSIDE_SCOPE = ["cpp_on_start", "cpp_forever", "cpp_scratch_on_start", "cpp_procedures_defnoreturn", "cpp_procedures_defreturn", "py_on_start", "py_forever", "py_scratch_on_start", "py_procedures_defnoreturn", "py_procedures_defreturn", "io_attachInterrupt", "html_page", "bricks_webui_on_message"];
//example projects
const EXAMPLE_PROJECT_LINKS = ['639987a2d76c3', '6399a76286bfd', '6399a8b8ee0d4', '6399a9b491f07', '6399bd8184b3f', '6399c0b51e361'];
//adc
const READ_ANALOG_MAX_VALUE = 1023;
const PWM_MAX_DUTY = 255;
//boards
const INTERFACE_BOARDS = {
    [BOARD_ARDUINO_UNO_Q]: {
        "id": BOARD_ARDUINO_UNO_Q,
        "link": 'arduino-uno-r4-wifi.svg',
        "name": "Arduino UNO Q",
        "resetId": "reset_button",
        "animId": "ellipse-top",
        "ledId": "ar-led13",
        "mcu": "32bits",
        "shieldId": BOARD_SHIELD_GROVE,
        "shieldLink": 'arduino_uno_grove_shield.svg',
        "shieldName": 'Shield Grove UNO'
    }
};
//simulator
const SIMULATOR_CPP_LIMITS = {
    '32bits': {
        "char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "signed char": { "max": 0x7f, "min": -0x80, "bytes": 1 },
        "unsigned char": { "max": 0xff, "min": 0x00, "bytes": 1 },
        "wchar_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "char16_t": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "char32_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "short": { "max": 0x7fff, "min": -0x8000, "bytes": 2 },
        "unsigned short": { "max": 0xffff, "min": 0x0000, "bytes": 2 },
        "int": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "unsigned int": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "long": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "unsigned long": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "long long": { "max": 0x7fffffffffffffff, "min": -0x8000000000000000, "bytes": 8 },
        "unsigned long long": { "max": 0xffffffffffffffff, "min": 0x0000000000000000, "bytes": 8 },
        "float": { "max": 3.40282346638529e+38, "min": -3.40282346638529e+38, "bytes": 4 },
        "double": { "max": 1.7976931348623157e+308, "min": -1.7976931348623157e+308, "bytes": 8 },
        "long double": { "max": 1.7976931348623157e+308, "min": -1.7976931348623157e+308, "bytes": 8 },
        "pointer": { "bytes": 4 },
        "bool": { "max": 1, "min": 0, "bytes": 1 },
        "boolean": { "max": 1, "min": 0, "bytes": 1 },
        "size_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 },
        "ptrdiff_t": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "intptr_t": { "max": 0x7fffffff, "min": -0x80000000, "bytes": 4 },
        "uintptr_t": { "max": 0xffffffff, "min": 0x00000000, "bytes": 4 }
    }
};
const SIMULATOR_TYPE_FORMATS = {
    '32bits': {
        i: ["d", "i"],
        u: ["u", "o", "x", "X"],
        c: ["c"],
        s: ["s"],
        p: ["p"],
    }
};
const SIMULATOR_DEFAULT_BOARD = INTERFACE_BOARDS[BOARD_DEFAULT];
//autocorrector
const AUTOCORRECTOR_DISABLED = true;

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
const UNO_Q_CSS =
    `/*
SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)

SPDX-License-Identifier: MPL-2.0
*/

@font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-display: swap;
    src: url('RobotoMono-VariableFont_wght.ttf') format('truetype');
}

/*
 * This CSS is used to center the various elements on the screen
 */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    line-height: 1.6;
    color: #343a40;
}

iframe {
    width: 100%;
    height: 100vh;
    border: 0;
    display: block;
}

.container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 12px 0;
}

.arduino-text {
    color: #008184;
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    font-style: normal;
    line-height: 170%;
    letter-spacing: 2.4px;
}

.arduino-logo {
    height: 24px;
    width: auto;
}

.main-content {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}


/*
 * Styles for specific components required by Anomaly Detection
 */

.upload-section {
    display: flex;
    gap: 32px;
    width: 100%;
    align-items: flex-start;
}

.image-container {
    flex: 2;
}

.image-preview {
    border: 1px dashed #7F8C8D;
    border-radius: 4px;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: white;
}

.image-preview:hover {
    border-color: #00979d;
    background-color: #f8f9fa;
}

.image-preview.drag-over {
    border-color: #008184;
    background-color: rgba(0, 129, 132, 0.08);
}

.upload-placeholder {
    text-align: center;
    color: #6c757d;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.upload-placeholder p {
    font-size: 1.1em;
    margin: 0;
}

.preview-image {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 8px;
}

.controls-section-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.controls-section-left {
    background: #ECF1F1;
    padding: 16px;
    border-radius: 8px;
    min-width: 750px;
    width: 100%;
}

.controls-section {
    flex: 1;
    background: #ECF1F1;
    padding: 16px;
    border-radius: 8px;
    min-width: 280px;
}

.control-group {
    position: relative;
}

.slider-box {
    display: flex;
    align-items: center;
    gap: 10px;
}

.control-confidence {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    position: relative;
}

.control-group label {
    color: #2C353A;
    font-family: "Roboto Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 170%;
    letter-spacing: 1.2px;
    display: flex;
    align-items: center;
    gap: 8px;
}

#confidenceSlider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #DAE3E3;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    margin: 20px 0 10px 0;
}

#confidenceSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #008184;
    cursor: pointer;
    position: relative;
    bottom: 3px;
    z-index: 2;
}

#confidenceSlider::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #DAE3E3;
}

#confidenceSlider::-moz-range-track {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #DAE3E3;
    border: none;
}

.slider-container {
    position: relative;
    width: 100%;
}

.slider-progress {
    position: absolute;
    top: 20px;
    left: 0;
    height: 6px;
    background: #008184;
    border-radius: 3px;
    pointer-events: none;
    z-index: 1;
    transition: width 0.1s ease;
}

.confidence-value-display {
    position: absolute;
    top: -3px;
    transform: translateX(-50%);
    color: #008184;
    padding: 2px 6px;
    pointer-events: none;
    z-index: 3;
    white-space: nowrap;
    transition: left 0.1s ease;
    font-family: "Open Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: 0.12px;
}

.confidence-limits {
    color: #2C353A;
    font-family: "Open Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: 0.12px;
    margin-top: 10px;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
}

.btn-primary, .btn-secondary {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.btn-primary {
    background-color: #00979d;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: #008a8f;
    transform: translateY(-1px);
}

.btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.btn-secondary {
    background-color: transparent;
    color: #00979d;
    align-items: center;
    gap: 8px;
}

.btn-secondary:hover {
    color: #008a8f;

}

.btn-tertiary {
    border-radius: 6px;
    border: 1px solid #C9D2D2;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 4px 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
    min-width: 50px;
    height: 36px;
}

.confidence-input {
    border: none;
    background: transparent;
    font-size: 12px;
    font-weight: inherit;
    color: inherit;
    text-align: center;
    width: 32px;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: text;
}

.confidence-input:focus {
    background: rgba(0, 129, 132, 0.1);
    border-radius: 2px;
}

.reset-icon {
    width: 18px;
    height: 18px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.reset-icon svg path {
    fill: black;
}

.btn-tertiary:hover .reset-icon {
    opacity: 1;
}

.status-message {
    margin-top: 20px;
    padding: 12px;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
    display: none;
}

.status-message.info {
    background-color: rgba(0, 151, 157, 0.1);
    color: #00979d;
    border: 1px solid #00979d;
}

.status-message.success {
    background-color: rgba(40, 167, 69, 0.1);
    color: #28a745;
    border: 1px solid #28a745;
}

.status-message.error {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border: 1px solid #dc3545;
}

.btn-icon-upload {
    width: 16px;
    height: 16px;
}

.drag-and-drop {
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 0.14px;
    color: #2C353A;
}

.drag-and-drop-text {
    font-family: "Open Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: 0.12px;
}

.border {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid #C9D2D2
}

.drag-and-drop-button {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    letter-spacing: 0.14px;
    color: #008184;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    cursor: pointer;
}

.drag-and-drop-button .btn-icon-upload {
    width: 16px;
    height: 16px;
}

.drag-and-drop-button .btn-icon-upload path {
    fill: #008184;
}

.reset-icon svg * {
    fill: #6c757d !important;
}

.btn-tertiary:hover .reset-icon svg * {
    fill: #2C353A !important;
}

.results-table {
    width: 100%;
    border-collapse: collapse;
    background: transparent;
    overflow: hidden;
    margin-top: 20px;
}

.results-table th {
    background: transparent;
    color: #5D6A6B;
    font-family: "Roboto Mono", monospace;
    padding: 0 16px;
    height: 29px;
    text-align: left;
    font-weight: 700;
    font-size: 14px;
    line-height: 29px;
    border: 1px solid rgba(49, 51, 63, 0.10);
}

.results-table td {
    padding: 0 16px;
    color: #5D6A6B;
    height: 29px;
    font-size: 14px;
    font-weight: 400;
    line-height: 29px;
    border: 1px solid rgba(49, 51, 63, 0.10);
}

.results-table tr:last-child td {
    border-bottom: 1px solid rgba(49, 51, 63, 0.10);
}

.results-table tr:nth-child(even) {
    background: rgba(248, 249, 250, 0.5);
}

.results-table tr:hover {
    background: rgba(227, 242, 253, 0.5);
}

.results-table tr:first-child th:first-child {
    border-top-left-radius: 8px;
}
.results-table tr:first-child th:last-child {
    border-top-right-radius: 8px;
}
.results-table tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}
.results-table tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
}

.class-name {
    font-weight: 400;
    color: #333;
}

.confidence {
    font-weight: 400;
    color: #28a745;
    text-align: left;
}

.info-btn {
    width: 14px;
    height: 14px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #C9D2D2;
    padding: 2px;
    transition: background 0.2s;
    position: relative;
}

.popover {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    margin-bottom: 5px;
    display: none;
    background: #fff;
    padding: 16px 24px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10;
    width: 300px;
    color: #2C353A;
    font-weight: 100;
    font-family: "Open Sans";
    font-size: 12px;
    line-height: 170%;
    letter-spacing: 0.12px;
}

.popover.active {
    display: block;
}

.info-icon-wrapper {
    position: relative;
}

.popover-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
}

.error-message {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

/*
 * Responsive design
 */
@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }

    .upload-section {
        flex-direction: column;
    }

    .arduino-text {
        font-size: 14px;
    }

    .container {
        padding: 15px;
    }

    .controls-section {
        min-width: auto;
    }

    .controls-section-left {
        min-width: 330px;
    }

    .arduino-logo {
        height: 16px;
        width: auto;
    }

}

@media (max-width: 1024px) and (min-width: 769px) {
    .controls-section-left {
        min-width: 490px;
    }
}

@media (max-width: 480px) {
    .controls-section-left {
        min-width: 170px;
    }
}`;
const UNO_Q_JS =
    `let socket;

document.addEventListener('DOMContentLoaded', () => {
    initSocketIO();
});

function initSocketIO() {
    socket = io("https://" + window.location.host);

    socket.on('connect', () => {
      console.log("connected!")
    });

    socket.on('disconnect', () => {
      console.log("disconnected!")
    });
}`;
const UNO_Q_HTML =
    `<!--
SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)

SPDX-License-Identifier: MPL-2.0
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vittascience - Q App</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="arduino-text">Entrainement de modèle d'images</h1>
            <img class="arduino-logo" src="img/RGB-Arduino-Logo_Color Inline Loop.svg" alt="Arduino Logo">
        </div>

        <iframe src="https://fr.vittascience.com/ia/images.php?embed=1" class="generative-iframes" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-downloads" allowfullscreen allow="camera; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; screen-wake-lock;" scrolling="auto"></iframe>
    </div>
    <script src="libs/socket.io.min.js"></script>
    <script src="app.js"></script>
</body>
</html>`;

const UNO_Q_SOCKET =
    `/*!
 * Socket.IO v4.8.1
 * (c) 2014-2024 Guillermo Rauch
 * Released under the MIT License.
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t="undefined"!=typeof globalThis?globalThis:t||self).io=n()}(this,(function(){"use strict";function t(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,r=Array(n);i<n;i++)r[i]=t[i];return r}function n(t,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,f(r.key),r)}}function i(t,i,r){return i&&n(t.prototype,i),r&&n(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(n,i){var r="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!r){if(Array.isArray(n)||(r=function(n,i){if(n){if("string"==typeof n)return t(n,i);var r={}.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(n,i):void 0}}(n))||i&&n&&"number"==typeof n.length){r&&(n=r);var e=0,o=function(){};return{s:o,n:function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,h=!1;return{s:function(){r=r.call(n)},n:function(){var t=r.next();return u=t.done,t},e:function(t){h=!0,s=t},f:function(){try{u||null==r.return||r.return()}finally{if(h)throw s}}}}function e(){return e=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var r in i)({}).hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t},e.apply(null,arguments)}function o(t){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},o(t)}function s(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,h(t,n)}function u(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(u=function(){return!!t})()}function h(t,n){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},h(t,n)}function f(t){var n=function(t,n){if("object"!=typeof t||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,n||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"==typeof n?n:n+""}function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function a(t){var n="function"==typeof Map?new Map:void 0;return a=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(n){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,i)}function i(){return function(t,n,i){if(u())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,n);var e=new(t.bind.apply(t,r));return i&&h(e,i.prototype),e}(t,arguments,o(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),h(i,t)},a(t)}var v=Object.create(null);v.open="0",v.close="1",v.ping="2",v.pong="3",v.message="4",v.upgrade="5",v.noop="6";var l=Object.create(null);Object.keys(v).forEach((function(t){l[v[t]]=t}));var p,d={type:"error",data:"parser error"},y="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),b="function"==typeof ArrayBuffer,w=function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer},g=function(t,n,i){var r=t.type,e=t.data;return y&&e instanceof Blob?n?i(e):m(e,i):b&&(e instanceof ArrayBuffer||w(e))?n?i(e):m(new Blob([e]),i):i(v[r]+(e||""))},m=function(t,n){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];n("b"+(t||""))},i.readAsDataURL(t)};function k(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}for(var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",j="undefined"==typeof Uint8Array?[]:new Uint8Array(256),E=0;E<64;E++)j[A.charCodeAt(E)]=E;var O,B="function"==typeof ArrayBuffer,S=function(t,n){if("string"!=typeof t)return{type:"message",data:C(t,n)};var i=t.charAt(0);return"b"===i?{type:"message",data:N(t.substring(1),n)}:l[i]?t.length>1?{type:l[i],data:t.substring(1)}:{type:l[i]}:d},N=function(t,n){if(B){var i=function(t){var n,i,r,e,o,s=.75*t.length,u=t.length,h=0;"="===t[t.length-1]&&(s--,"="===t[t.length-2]&&s--);var f=new ArrayBuffer(s),c=new Uint8Array(f);for(n=0;n<u;n+=4)i=j[t.charCodeAt(n)],r=j[t.charCodeAt(n+1)],e=j[t.charCodeAt(n+2)],o=j[t.charCodeAt(n+3)],c[h++]=i<<2|r>>4,c[h++]=(15&r)<<4|e>>2,c[h++]=(3&e)<<6|63&o;return f}(t);return C(i,n)}return{base64:!0,data:t}},C=function(t,n){return"blob"===n?t instanceof Blob?t:new Blob([t]):t instanceof ArrayBuffer?t:t.buffer},T=String.fromCharCode(30);function U(){return new TransformStream({transform:function(t,n){!function(t,n){y&&t.data instanceof Blob?t.data.arrayBuffer().then(k).then(n):b&&(t.data instanceof ArrayBuffer||w(t.data))?n(k(t.data)):g(t,!1,(function(t){p||(p=new TextEncoder),n(p.encode(t))}))}(t,(function(i){var r,e=i.length;if(e<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,e);else if(e<65536){r=new Uint8Array(3);var o=new DataView(r.buffer);o.setUint8(0,126),o.setUint16(1,e)}else{r=new Uint8Array(9);var s=new DataView(r.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(e))}t.data&&"string"!=typeof t.data&&(r[0]|=128),n.enqueue(r),n.enqueue(i)}))}})}function M(t){return t.reduce((function(t,n){return t+n.length}),0)}function x(t,n){if(t[0].length===n)return t.shift();for(var i=new Uint8Array(n),r=0,e=0;e<n;e++)i[e]=t[0][r++],r===t[0].length&&(t.shift(),r=0);return t.length&&r<t[0].length&&(t[0]=t[0].slice(r)),i}function I(t){if(t)return function(t){for(var n in I.prototype)t[n]=I.prototype[n];return t}(t)}I.prototype.on=I.prototype.addEventListener=function(t,n){return this.t=this.t||{},(this.t["$"+t]=this.t["$"+t]||[]).push(n),this},I.prototype.once=function(t,n){function i(){this.off(t,i),n.apply(this,arguments)}return i.fn=n,this.on(t,i),this},I.prototype.off=I.prototype.removeListener=I.prototype.removeAllListeners=I.prototype.removeEventListener=function(t,n){if(this.t=this.t||{},0==arguments.length)return this.t={},this;var i,r=this.t["$"+t];if(!r)return this;if(1==arguments.length)return delete this.t["$"+t],this;for(var e=0;e<r.length;e++)if((i=r[e])===n||i.fn===n){r.splice(e,1);break}return 0===r.length&&delete this.t["$"+t],this},I.prototype.emit=function(t){this.t=this.t||{};for(var n=new Array(arguments.length-1),i=this.t["$"+t],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if(i){r=0;for(var e=(i=i.slice(0)).length;r<e;++r)i[r].apply(this,n)}return this},I.prototype.emitReserved=I.prototype.emit,I.prototype.listeners=function(t){return this.t=this.t||{},this.t["$"+t]||[]},I.prototype.hasListeners=function(t){return!!this.listeners(t).length};var R="function"==typeof Promise&&"function"==typeof Promise.resolve?function(t){return Promise.resolve().then(t)}:function(t,n){return n(t,0)},L="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")();function _(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return i.reduce((function(n,i){return t.hasOwnProperty(i)&&(n[i]=t[i]),n}),{})}var D=L.setTimeout,P=L.clearTimeout;function $(t,n){n.useNativeTimers?(t.setTimeoutFn=D.bind(L),t.clearTimeoutFn=P.bind(L)):(t.setTimeoutFn=L.setTimeout.bind(L),t.clearTimeoutFn=L.clearTimeout.bind(L))}function F(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}var V=function(t){function n(n,i,r){var e;return(e=t.call(this,n)||this).description=i,e.context=r,e.type="TransportError",e}return s(n,t),n}(a(Error)),q=function(t){function n(n){var i;return(i=t.call(this)||this).writable=!1,$(i,n),i.opts=n,i.query=n.query,i.socket=n.socket,i.supportsBinary=!n.forceBase64,i}s(n,t);var i=n.prototype;return i.onError=function(n,i,r){return t.prototype.emitReserved.call(this,"error",new V(n,i,r)),this},i.open=function(){return this.readyState="opening",this.doOpen(),this},i.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},i.send=function(t){"open"===this.readyState&&this.write(t)},i.onOpen=function(){this.readyState="open",this.writable=!0,t.prototype.emitReserved.call(this,"open")},i.onData=function(t){var n=S(t,this.socket.binaryType);this.onPacket(n)},i.onPacket=function(n){t.prototype.emitReserved.call(this,"packet",n)},i.onClose=function(n){this.readyState="closed",t.prototype.emitReserved.call(this,"close",n)},i.pause=function(t){},i.createUri=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t+"://"+this.i()+this.o()+this.opts.path+this.u(n)},i.i=function(){var t=this.opts.hostname;return-1===t.indexOf(":")?t:"["+t+"]"},i.o=function(){return this.opts.port&&(this.opts.secure&&Number(443!==this.opts.port)||!this.opts.secure&&80!==Number(this.opts.port))?":"+this.opts.port:""},i.u=function(t){var n=function(t){var n="";for(var i in t)t.hasOwnProperty(i)&&(n.length&&(n+="&"),n+=encodeURIComponent(i)+"="+encodeURIComponent(t[i]));return n}(t);return n.length?"?"+n:""},n}(I),X=function(t){function n(){var n;return(n=t.apply(this,arguments)||this).h=!1,n}s(n,t);var r=n.prototype;return r.doOpen=function(){this.v()},r.pause=function(t){var n=this;this.readyState="pausing";var i=function(){n.readyState="paused",t()};if(this.h||!this.writable){var r=0;this.h&&(r++,this.once("pollComplete",(function(){--r||i()}))),this.writable||(r++,this.once("drain",(function(){--r||i()})))}else i()},r.v=function(){this.h=!0,this.doPoll(),this.emitReserved("poll")},r.onData=function(t){var n=this;(function(t,n){for(var i=t.split(T),r=[],e=0;e<i.length;e++){var o=S(i[e],n);if(r.push(o),"error"===o.type)break}return r})(t,this.socket.binaryType).forEach((function(t){if("opening"===n.readyState&&"open"===t.type&&n.onOpen(),"close"===t.type)return n.onClose({description:"transport closed by the server"}),!1;n.onPacket(t)})),"closed"!==this.readyState&&(this.h=!1,this.emitReserved("pollComplete"),"open"===this.readyState&&this.v())},r.doClose=function(){var t=this,n=function(){t.write([{type:"close"}])};"open"===this.readyState?n():this.once("open",n)},r.write=function(t){var n=this;this.writable=!1,function(t,n){var i=t.length,r=new Array(i),e=0;t.forEach((function(t,o){g(t,!1,(function(t){r[o]=t,++e===i&&n(r.join(T))}))}))}(t,(function(t){n.doWrite(t,(function(){n.writable=!0,n.emitReserved("drain")}))}))},r.uri=function(){var t=this.opts.secure?"https":"http",n=this.query||{};return!1!==this.opts.timestampRequests&&(n[this.opts.timestampParam]=F()),this.supportsBinary||n.sid||(n.b64=1),this.createUri(t,n)},i(n,[{key:"name",get:function(){return"polling"}}])}(q),H=!1;try{H="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(t){}var z=H;function J(){}var K=function(t){function n(n){var i;if(i=t.call(this,n)||this,"undefined"!=typeof location){var r="https:"===location.protocol,e=location.port;e||(e=r?"443":"80"),i.xd="undefined"!=typeof location&&n.hostname!==location.hostname||e!==n.port}return i}s(n,t);var i=n.prototype;return i.doWrite=function(t,n){var i=this,r=this.request({method:"POST",data:t});r.on("success",n),r.on("error",(function(t,n){i.onError("xhr post error",t,n)}))},i.doPoll=function(){var t=this,n=this.request();n.on("data",this.onData.bind(this)),n.on("error",(function(n,i){t.onError("xhr poll error",n,i)})),this.pollXhr=n},n}(X),Y=function(t){function n(n,i,r){var e;return(e=t.call(this)||this).createRequest=n,$(e,r),e.l=r,e.p=r.method||"GET",e.m=i,e.k=void 0!==r.data?r.data:null,e.A(),e}s(n,t);var i=n.prototype;return i.A=function(){var t,i=this,r=_(this.l,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");r.xdomain=!!this.l.xd;var e=this.j=this.createRequest(r);try{e.open(this.p,this.m,!0);try{if(this.l.extraHeaders)for(var o in e.setDisableHeaderCheck&&e.setDisableHeaderCheck(!0),this.l.extraHeaders)this.l.extraHeaders.hasOwnProperty(o)&&e.setRequestHeader(o,this.l.extraHeaders[o])}catch(t){}if("POST"===this.p)try{e.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{e.setRequestHeader("Accept","*/*")}catch(t){}null===(t=this.l.cookieJar)||void 0===t||t.addCookies(e),"withCredentials"in e&&(e.withCredentials=this.l.withCredentials),this.l.requestTimeout&&(e.timeout=this.l.requestTimeout),e.onreadystatechange=function(){var t;3===e.readyState&&(null===(t=i.l.cookieJar)||void 0===t||t.parseCookies(e.getResponseHeader("set-cookie"))),4===e.readyState&&(200===e.status||1223===e.status?i.O():i.setTimeoutFn((function(){i.B("number"==typeof e.status?e.status:0)}),0))},e.send(this.k)}catch(t){return void this.setTimeoutFn((function(){i.B(t)}),0)}"undefined"!=typeof document&&(this.S=n.requestsCount++,n.requests[this.S]=this)},i.B=function(t){this.emitReserved("error",t,this.j),this.N(!0)},i.N=function(t){if(void 0!==this.j&&null!==this.j){if(this.j.onreadystatechange=J,t)try{this.j.abort()}catch(t){}"undefined"!=typeof document&&delete n.requests[this.S],this.j=null}},i.O=function(){var t=this.j.responseText;null!==t&&(this.emitReserved("data",t),this.emitReserved("success"),this.N())},i.abort=function(){this.N()},n}(I);if(Y.requestsCount=0,Y.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",G);else if("function"==typeof addEventListener){addEventListener("onpagehide"in L?"pagehide":"unload",G,!1)}function G(){for(var t in Y.requests)Y.requests.hasOwnProperty(t)&&Y.requests[t].abort()}var Q,W=(Q=tt({xdomain:!1}))&&null!==Q.responseType,Z=function(t){function n(n){var i;i=t.call(this,n)||this;var r=n&&n.forceBase64;return i.supportsBinary=W&&!r,i}return s(n,t),n.prototype.request=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e(t,{xd:this.xd},this.opts),new Y(tt,this.uri(),t)},n}(K);function tt(t){var n=t.xdomain;try{if("undefined"!=typeof XMLHttpRequest&&(!n||z))return new XMLHttpRequest}catch(t){}if(!n)try{return new(L[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}var nt="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),it=function(t){function n(){return t.apply(this,arguments)||this}s(n,t);var r=n.prototype;return r.doOpen=function(){var t=this.uri(),n=this.opts.protocols,i=nt?{}:_(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,n,i)}catch(t){return this.emitReserved("error",t)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()},r.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws.C.unref(),t.onOpen()},this.ws.onclose=function(n){return t.onClose({description:"websocket connection closed",context:n})},this.ws.onmessage=function(n){return t.onData(n.data)},this.ws.onerror=function(n){return t.onError("websocket error",n)}},r.write=function(t){var n=this;this.writable=!1;for(var i=function(){var i=t[r],e=r===t.length-1;g(i,n.supportsBinary,(function(t){try{n.doWrite(i,t)}catch(t){}e&&R((function(){n.writable=!0,n.emitReserved("drain")}),n.setTimeoutFn)}))},r=0;r<t.length;r++)i()},r.doClose=function(){void 0!==this.ws&&(this.ws.onerror=function(){},this.ws.close(),this.ws=null)},r.uri=function(){var t=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=F()),this.supportsBinary||(n.b64=1),this.createUri(t,n)},i(n,[{key:"name",get:function(){return"websocket"}}])}(q),rt=L.WebSocket||L.MozWebSocket,et=function(t){function n(){return t.apply(this,arguments)||this}s(n,t);var i=n.prototype;return i.createSocket=function(t,n,i){return nt?new rt(t,n,i):n?new rt(t,n):new rt(t)},i.doWrite=function(t,n){this.ws.send(n)},n}(it),ot=function(t){function n(){return t.apply(this,arguments)||this}s(n,t);var r=n.prototype;return r.doOpen=function(){var t=this;try{this.T=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this.T.closed.then((function(){t.onClose()})).catch((function(n){t.onError("webtransport error",n)})),this.T.ready.then((function(){t.T.createBidirectionalStream().then((function(n){var i=function(t,n){O||(O=new TextDecoder);var i=[],r=0,e=-1,o=!1;return new TransformStream({transform:function(s,u){for(i.push(s);;){if(0===r){if(M(i)<1)break;var h=x(i,1);o=!(128&~h[0]),e=127&h[0],r=e<126?3:126===e?1:2}else if(1===r){if(M(i)<2)break;var f=x(i,2);e=new DataView(f.buffer,f.byteOffset,f.length).getUint16(0),r=3}else if(2===r){if(M(i)<8)break;var c=x(i,8),a=new DataView(c.buffer,c.byteOffset,c.length),v=a.getUint32(0);if(v>Math.pow(2,21)-1){u.enqueue(d);break}e=v*Math.pow(2,32)+a.getUint32(4),r=3}else{if(M(i)<e)break;var l=x(i,e);u.enqueue(S(o?l:O.decode(l),n)),r=0}if(0===e||e>t){u.enqueue(d);break}}}})}(Number.MAX_SAFE_INTEGER,t.socket.binaryType),r=n.readable.pipeThrough(i).getReader(),e=U();e.readable.pipeTo(n.writable),t.U=e.writable.getWriter();!function n(){r.read().then((function(i){var r=i.done,e=i.value;r||(t.onPacket(e),n())})).catch((function(t){}))}();var o={type:"open"};t.query.sid&&(o.data='{"sid":"'.concat(t.query.sid,'"}')),t.U.write(o).then((function(){return t.onOpen()}))}))}))},r.write=function(t){var n=this;this.writable=!1;for(var i=function(){var i=t[r],e=r===t.length-1;n.U.write(i).then((function(){e&&R((function(){n.writable=!0,n.emitReserved("drain")}),n.setTimeoutFn)}))},r=0;r<t.length;r++)i()},r.doClose=function(){var t;null===(t=this.T)||void 0===t||t.close()},i(n,[{key:"name",get:function(){return"webtransport"}}])}(q),st={websocket:et,webtransport:ot,polling:Z},ut=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ht=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ft(t){if(t.length>8e3)throw"URI too long";var n=t,i=t.indexOf("["),r=t.indexOf("]");-1!=i&&-1!=r&&(t=t.substring(0,i)+t.substring(i,r).replace(/:/g,";")+t.substring(r,t.length));for(var e,o,s=ut.exec(t||""),u={},h=14;h--;)u[ht[h]]=s[h]||"";return-1!=i&&-1!=r&&(u.source=n,u.host=u.host.substring(1,u.host.length-1).replace(/;/g,":"),u.authority=u.authority.replace("[","").replace("]","").replace(/;/g,":"),u.ipv6uri=!0),u.pathNames=function(t,n){var i=/\/{2,9}/g,r=n.replace(i,"/").split("/");"/"!=n.slice(0,1)&&0!==n.length||r.splice(0,1);"/"==n.slice(-1)&&r.splice(r.length-1,1);return r}(0,u.path),u.queryKey=(e=u.query,o={},e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,n,i){n&&(o[n]=i)})),o),u}var ct="function"==typeof addEventListener&&"function"==typeof removeEventListener,at=[];ct&&addEventListener("offline",(function(){at.forEach((function(t){return t()}))}),!1);var vt=function(t){function n(n,i){var r;if((r=t.call(this)||this).binaryType="arraybuffer",r.writeBuffer=[],r.M=0,r.I=-1,r.R=-1,r.L=-1,r._=1/0,n&&"object"===c(n)&&(i=n,n=null),n){var o=ft(n);i.hostname=o.host,i.secure="https"===o.protocol||"wss"===o.protocol,i.port=o.port,o.query&&(i.query=o.query)}else i.host&&(i.hostname=ft(i.host).host);return $(r,i),r.secure=null!=i.secure?i.secure:"undefined"!=typeof location&&"https:"===location.protocol,i.hostname&&!i.port&&(i.port=r.secure?"443":"80"),r.hostname=i.hostname||("undefined"!=typeof location?location.hostname:"localhost"),r.port=i.port||("undefined"!=typeof location&&location.port?location.port:r.secure?"443":"80"),r.transports=[],r.D={},i.transports.forEach((function(t){var n=t.prototype.name;r.transports.push(n),r.D[n]=t})),r.opts=e({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),r.opts.path=r.opts.path.replace(/\/$/,"")+(r.opts.addTrailingSlash?"/":""),"string"==typeof r.opts.query&&(r.opts.query=function(t){for(var n={},i=t.split("&"),r=0,e=i.length;r<e;r++){var o=i[r].split("=");n[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return n}(r.opts.query)),ct&&(r.opts.closeOnBeforeunload&&(r.P=function(){r.transport&&(r.transport.removeAllListeners(),r.transport.close())},addEventListener("beforeunload",r.P,!1)),"localhost"!==r.hostname&&(r.$=function(){r.F("transport close",{description:"network connection lost"})},at.push(r.$))),r.opts.withCredentials&&(r.V=void 0),r.q(),r}s(n,t);var i=n.prototype;return i.createTransport=function(t){var n=e({},this.opts.query);n.EIO=4,n.transport=t,this.id&&(n.sid=this.id);var i=e({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this.D[t](i)},i.q=function(){var t=this;if(0!==this.transports.length){var i=this.opts.rememberUpgrade&&n.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket")?"websocket":this.transports[0];this.readyState="opening";var r=this.createTransport(i);r.open(),this.setTransport(r)}else this.setTimeoutFn((function(){t.emitReserved("error","No transports available")}),0)},i.setTransport=function(t){var n=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.X.bind(this)).on("packet",this.H.bind(this)).on("error",this.B.bind(this)).on("close",(function(t){return n.F("transport close",t)}))},i.onOpen=function(){this.readyState="open",n.priorWebsocketSuccess="websocket"===this.transport.name,this.emitReserved("open"),this.flush()},i.H=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.J("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this.K();break;case"error":var n=new Error("server error");n.code=t.data,this.B(n);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data)}},i.onHandshake=function(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.I=t.pingInterval,this.R=t.pingTimeout,this.L=t.maxPayload,this.onOpen(),"closed"!==this.readyState&&this.K()},i.K=function(){var t=this;this.clearTimeoutFn(this.Y);var n=this.I+this.R;this._=Date.now()+n,this.Y=this.setTimeoutFn((function(){t.F("ping timeout")}),n),this.opts.autoUnref&&this.Y.unref()},i.X=function(){this.writeBuffer.splice(0,this.M),this.M=0,0===this.writeBuffer.length?this.emitReserved("drain"):this.flush()},i.flush=function(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){var t=this.G();this.transport.send(t),this.M=t.length,this.emitReserved("flush")}},i.G=function(){if(!(this.L&&"polling"===this.transport.name&&this.writeBuffer.length>1))return this.writeBuffer;for(var t,n=1,i=0;i<this.writeBuffer.length;i++){var r=this.writeBuffer[i].data;if(r&&(n+="string"==typeof(t=r)?function(t){for(var n=0,i=0,r=0,e=t.length;r<e;r++)(n=t.charCodeAt(r))<128?i+=1:n<2048?i+=2:n<55296||n>=57344?i+=3:(r++,i+=4);return i}(t):Math.ceil(1.33*(t.byteLength||t.size))),i>0&&n>this.L)return this.writeBuffer.slice(0,i);n+=2}return this.writeBuffer},i.W=function(){var t=this;if(!this._)return!0;var n=Date.now()>this._;return n&&(this._=0,R((function(){t.F("ping timeout")}),this.setTimeoutFn)),n},i.write=function(t,n,i){return this.J("message",t,n,i),this},i.send=function(t,n,i){return this.J("message",t,n,i),this},i.J=function(t,n,i,r){if("function"==typeof n&&(r=n,n=void 0),"function"==typeof i&&(r=i,i=null),"closing"!==this.readyState&&"closed"!==this.readyState){(i=i||{}).compress=!1!==i.compress;var e={type:t,data:n,options:i};this.emitReserved("packetCreate",e),this.writeBuffer.push(e),r&&this.once("flush",r),this.flush()}},i.close=function(){var t=this,n=function(){t.F("forced close"),t.transport.close()},i=function i(){t.off("upgrade",i),t.off("upgradeError",i),n()},r=function(){t.once("upgrade",i),t.once("upgradeError",i)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){t.upgrading?r():n()})):this.upgrading?r():n()),this},i.B=function(t){if(n.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&"opening"===this.readyState)return this.transports.shift(),this.q();this.emitReserved("error",t),this.F("transport error",t)},i.F=function(t,n){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){if(this.clearTimeoutFn(this.Y),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),ct&&(this.P&&removeEventListener("beforeunload",this.P,!1),this.$)){var i=at.indexOf(this.$);-1!==i&&at.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,n),this.writeBuffer=[],this.M=0}},n}(I);vt.protocol=4;var lt=function(t){function n(){var n;return(n=t.apply(this,arguments)||this).Z=[],n}s(n,t);var i=n.prototype;return i.onOpen=function(){if(t.prototype.onOpen.call(this),"open"===this.readyState&&this.opts.upgrade)for(var n=0;n<this.Z.length;n++)this.tt(this.Z[n])},i.tt=function(t){var n=this,i=this.createTransport(t),r=!1;vt.priorWebsocketSuccess=!1;var e=function(){r||(i.send([{type:"ping",data:"probe"}]),i.once("packet",(function(t){if(!r)if("pong"===t.type&&"probe"===t.data){if(n.upgrading=!0,n.emitReserved("upgrading",i),!i)return;vt.priorWebsocketSuccess="websocket"===i.name,n.transport.pause((function(){r||"closed"!==n.readyState&&(c(),n.setTransport(i),i.send([{type:"upgrade"}]),n.emitReserved("upgrade",i),i=null,n.upgrading=!1,n.flush())}))}else{var e=new Error("probe error");e.transport=i.name,n.emitReserved("upgradeError",e)}})))};function o(){r||(r=!0,c(),i.close(),i=null)}var s=function(t){var r=new Error("probe error: "+t);r.transport=i.name,o(),n.emitReserved("upgradeError",r)};function u(){s("transport closed")}function h(){s("socket closed")}function f(t){i&&t.name!==i.name&&o()}var c=function(){i.removeListener("open",e),i.removeListener("error",s),i.removeListener("close",u),n.off("close",h),n.off("upgrading",f)};i.once("open",e),i.once("error",s),i.once("close",u),this.once("close",h),this.once("upgrading",f),-1!==this.Z.indexOf("webtransport")&&"webtransport"!==t?this.setTimeoutFn((function(){r||i.open()}),200):i.open()},i.onHandshake=function(n){this.Z=this.nt(n.upgrades),t.prototype.onHandshake.call(this,n)},i.nt=function(t){for(var n=[],i=0;i<t.length;i++)~this.transports.indexOf(t[i])&&n.push(t[i]);return n},n}(vt),pt=function(t){function n(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r="object"===c(n)?n:i;return(!r.transports||r.transports&&"string"==typeof r.transports[0])&&(r.transports=(r.transports||["polling","websocket","webtransport"]).map((function(t){return st[t]})).filter((function(t){return!!t}))),t.call(this,n,r)||this}return s(n,t),n}(lt);pt.protocol;var dt="function"==typeof ArrayBuffer,yt=function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer},bt=Object.prototype.toString,wt="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===bt.call(Blob),gt="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===bt.call(File);function mt(t){return dt&&(t instanceof ArrayBuffer||yt(t))||wt&&t instanceof Blob||gt&&t instanceof File}function kt(t,n){if(!t||"object"!==c(t))return!1;if(Array.isArray(t)){for(var i=0,r=t.length;i<r;i++)if(kt(t[i]))return!0;return!1}if(mt(t))return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return kt(t.toJSON(),!0);for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&kt(t[e]))return!0;return!1}function At(t){var n=[],i=t.data,r=t;return r.data=jt(i,n),r.attachments=n.length,{packet:r,buffers:n}}function jt(t,n){if(!t)return t;if(mt(t)){var i={_placeholder:!0,num:n.length};return n.push(t),i}if(Array.isArray(t)){for(var r=new Array(t.length),e=0;e<t.length;e++)r[e]=jt(t[e],n);return r}if("object"===c(t)&&!(t instanceof Date)){var o={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(o[s]=jt(t[s],n));return o}return t}function Et(t,n){return t.data=Ot(t.data,n),delete t.attachments,t}function Ot(t,n){if(!t)return t;if(t&&!0===t._placeholder){if("number"==typeof t.num&&t.num>=0&&t.num<n.length)return n[t.num];throw new Error("illegal attachments")}if(Array.isArray(t))for(var i=0;i<t.length;i++)t[i]=Ot(t[i],n);else if("object"===c(t))for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(t[r]=Ot(t[r],n));return t}var Bt,St=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];!function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(Bt||(Bt={}));var Nt=function(){function t(t){this.replacer=t}var n=t.prototype;return n.encode=function(t){return t.type!==Bt.EVENT&&t.type!==Bt.ACK||!kt(t)?[this.encodeAsString(t)]:this.encodeAsBinary({type:t.type===Bt.EVENT?Bt.BINARY_EVENT:Bt.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id})},n.encodeAsString=function(t){var n=""+t.type;return t.type!==Bt.BINARY_EVENT&&t.type!==Bt.BINARY_ACK||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data&&(n+=JSON.stringify(t.data,this.replacer)),n},n.encodeAsBinary=function(t){var n=At(t),i=this.encodeAsString(n.packet),r=n.buffers;return r.unshift(i),r},t}(),Ct=function(t){function n(n){var i;return(i=t.call(this)||this).reviver=n,i}s(n,t);var i=n.prototype;return i.add=function(n){var i;if("string"==typeof n){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");var r=(i=this.decodeString(n)).type===Bt.BINARY_EVENT;r||i.type===Bt.BINARY_ACK?(i.type=r?Bt.EVENT:Bt.ACK,this.reconstructor=new Tt(i),0===i.attachments&&t.prototype.emitReserved.call(this,"decoded",i)):t.prototype.emitReserved.call(this,"decoded",i)}else{if(!mt(n)&&!n.base64)throw new Error("Unknown type: "+n);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(i=this.reconstructor.takeBinaryData(n))&&(this.reconstructor=null,t.prototype.emitReserved.call(this,"decoded",i))}},i.decodeString=function(t){var i=0,r={type:Number(t.charAt(0))};if(void 0===Bt[r.type])throw new Error("unknown packet type "+r.type);if(r.type===Bt.BINARY_EVENT||r.type===Bt.BINARY_ACK){for(var e=i+1;"-"!==t.charAt(++i)&&i!=t.length;);var o=t.substring(e,i);if(o!=Number(o)||"-"!==t.charAt(i))throw new Error("Illegal attachments");r.attachments=Number(o)}if("/"===t.charAt(i+1)){for(var s=i+1;++i;){if(","===t.charAt(i))break;if(i===t.length)break}r.nsp=t.substring(s,i)}else r.nsp="/";var u=t.charAt(i+1);if(""!==u&&Number(u)==u){for(var h=i+1;++i;){var f=t.charAt(i);if(null==f||Number(f)!=f){--i;break}if(i===t.length)break}r.id=Number(t.substring(h,i+1))}if(t.charAt(++i)){var c=this.tryParse(t.substr(i));if(!n.isPayloadValid(r.type,c))throw new Error("invalid payload");r.data=c}return r},i.tryParse=function(t){try{return JSON.parse(t,this.reviver)}catch(t){return!1}},n.isPayloadValid=function(t,n){switch(t){case Bt.CONNECT:return Mt(n);case Bt.DISCONNECT:return void 0===n;case Bt.CONNECT_ERROR:return"string"==typeof n||Mt(n);case Bt.EVENT:case Bt.BINARY_EVENT:return Array.isArray(n)&&("number"==typeof n[0]||"string"==typeof n[0]&&-1===St.indexOf(n[0]));case Bt.ACK:case Bt.BINARY_ACK:return Array.isArray(n)}},i.destroy=function(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)},n}(I),Tt=function(){function t(t){this.packet=t,this.buffers=[],this.reconPack=t}var n=t.prototype;return n.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var n=Et(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null},n.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]},t}();var Ut=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t};function Mt(t){return"[object Object]"===Object.prototype.toString.call(t)}var xt=Object.freeze({__proto__:null,protocol:5,get PacketType(){return Bt},Encoder:Nt,Decoder:Ct,isPacketValid:function(t){return"string"==typeof t.nsp&&(void 0===(n=t.id)||Ut(n))&&function(t,n){switch(t){case Bt.CONNECT:return void 0===n||Mt(n);case Bt.DISCONNECT:return void 0===n;case Bt.EVENT:return Array.isArray(n)&&("number"==typeof n[0]||"string"==typeof n[0]&&-1===St.indexOf(n[0]));case Bt.ACK:return Array.isArray(n);case Bt.CONNECT_ERROR:return"string"==typeof n||Mt(n);default:return!1}}(t.type,t.data);var n}});function It(t,n,i){return t.on(n,i),function(){t.off(n,i)}}var Rt=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Lt=function(t){function n(n,i,r){var o;return(o=t.call(this)||this).connected=!1,o.recovered=!1,o.receiveBuffer=[],o.sendBuffer=[],o.it=[],o.rt=0,o.ids=0,o.acks={},o.flags={},o.io=n,o.nsp=i,r&&r.auth&&(o.auth=r.auth),o.l=e({},r),o.io.et&&o.open(),o}s(n,t);var o=n.prototype;return o.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[It(t,"open",this.onopen.bind(this)),It(t,"packet",this.onpacket.bind(this)),It(t,"error",this.onerror.bind(this)),It(t,"close",this.onclose.bind(this))]}},o.connect=function(){return this.connected||(this.subEvents(),this.io.ot||this.io.open(),"open"===this.io.st&&this.onopen()),this},o.open=function(){return this.connect()},o.send=function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return n.unshift("message"),this.emit.apply(this,n),this},o.emit=function(t){var n,i,r;if(Rt.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');for(var e=arguments.length,o=new Array(e>1?e-1:0),s=1;s<e;s++)o[s-1]=arguments[s];if(o.unshift(t),this.l.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this.ut(o),this;var u={type:Bt.EVENT,data:o,options:{}};if(u.options.compress=!1!==this.flags.compress,"function"==typeof o[o.length-1]){var h=this.ids++,f=o.pop();this.ht(h,f),u.id=h}var c=null===(i=null===(n=this.io.engine)||void 0===n?void 0:n.transport)||void 0===i?void 0:i.writable,a=this.connected&&!(null===(r=this.io.engine)||void 0===r?void 0:r.W());return this.flags.volatile&&!c||(a?(this.notifyOutgoingListeners(u),this.packet(u)):this.sendBuffer.push(u)),this.flags={},this},o.ht=function(t,n){var i,r=this,e=null!==(i=this.flags.timeout)&&void 0!==i?i:this.l.ackTimeout;if(void 0!==e){var o=this.io.setTimeoutFn((function(){delete r.acks[t];for(var i=0;i<r.sendBuffer.length;i++)r.sendBuffer[i].id===t&&r.sendBuffer.splice(i,1);n.call(r,new Error("operation has timed out"))}),e),s=function(){r.io.clearTimeoutFn(o);for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];n.apply(r,i)};s.withError=!0,this.acks[t]=s}else this.acks[t]=n},o.emitWithAck=function(t){for(var n=this,i=arguments.length,r=new Array(i>1?i-1:0),e=1;e<i;e++)r[e-1]=arguments[e];return new Promise((function(i,e){var o=function(t,n){return t?e(t):i(n)};o.withError=!0,r.push(o),n.emit.apply(n,[t].concat(r))}))},o.ut=function(t){var n,i=this;"function"==typeof t[t.length-1]&&(n=t.pop());var r={id:this.rt++,tryCount:0,pending:!1,args:t,flags:e({fromQueue:!0},this.flags)};t.push((function(t){if(r===i.it[0]){if(null!==t)r.tryCount>i.l.retries&&(i.it.shift(),n&&n(t));else if(i.it.shift(),n){for(var e=arguments.length,o=new Array(e>1?e-1:0),s=1;s<e;s++)o[s-1]=arguments[s];n.apply(void 0,[null].concat(o))}return r.pending=!1,i.ft()}})),this.it.push(r),this.ft()},o.ft=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.connected&&0!==this.it.length){var n=this.it[0];n.pending&&!t||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}},o.packet=function(t){t.nsp=this.nsp,this.io.ct(t)},o.onopen=function(){var t=this;"function"==typeof this.auth?this.auth((function(n){t.vt(n)})):this.vt(this.auth)},o.vt=function(t){this.packet({type:Bt.CONNECT,data:this.lt?e({pid:this.lt,offset:this.dt},t):t})},o.onerror=function(t){this.connected||this.emitReserved("connect_error",t)},o.onclose=function(t,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,n),this.yt()},o.yt=function(){var t=this;Object.keys(this.acks).forEach((function(n){if(!t.sendBuffer.some((function(t){return String(t.id)===n}))){var i=t.acks[n];delete t.acks[n],i.withError&&i.call(t,new Error("socket has been disconnected"))}}))},o.onpacket=function(t){if(t.nsp===this.nsp)switch(t.type){case Bt.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Bt.EVENT:case Bt.BINARY_EVENT:this.onevent(t);break;case Bt.ACK:case Bt.BINARY_ACK:this.onack(t);break;case Bt.DISCONNECT:this.ondisconnect();break;case Bt.CONNECT_ERROR:this.destroy();var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}},o.onevent=function(t){var n=t.data||[];null!=t.id&&n.push(this.ack(t.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))},o.emitEvent=function(n){if(this.bt&&this.bt.length){var i,e=r(this.bt.slice());try{for(e.s();!(i=e.n()).done;){i.value.apply(this,n)}}catch(t){e.e(t)}finally{e.f()}}t.prototype.emit.apply(this,n),this.lt&&n.length&&"string"==typeof n[n.length-1]&&(this.dt=n[n.length-1])},o.ack=function(t){var n=this,i=!1;return function(){if(!i){i=!0;for(var r=arguments.length,e=new Array(r),o=0;o<r;o++)e[o]=arguments[o];n.packet({type:Bt.ACK,id:t,data:e})}}},o.onack=function(t){var n=this.acks[t.id];"function"==typeof n&&(delete this.acks[t.id],n.withError&&t.data.unshift(null),n.apply(this,t.data))},o.onconnect=function(t,n){this.id=t,this.recovered=n&&this.lt===n,this.lt=n,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this.ft(!0)},o.emitBuffered=function(){var t=this;this.receiveBuffer.forEach((function(n){return t.emitEvent(n)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(n){t.notifyOutgoingListeners(n),t.packet(n)})),this.sendBuffer=[]},o.ondisconnect=function(){this.destroy(),this.onclose("io server disconnect")},o.destroy=function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io.wt(this)},o.disconnect=function(){return this.connected&&this.packet({type:Bt.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},o.close=function(){return this.disconnect()},o.compress=function(t){return this.flags.compress=t,this},o.timeout=function(t){return this.flags.timeout=t,this},o.onAny=function(t){return this.bt=this.bt||[],this.bt.push(t),this},o.prependAny=function(t){return this.bt=this.bt||[],this.bt.unshift(t),this},o.offAny=function(t){if(!this.bt)return this;if(t){for(var n=this.bt,i=0;i<n.length;i++)if(t===n[i])return n.splice(i,1),this}else this.bt=[];return this},o.listenersAny=function(){return this.bt||[]},o.onAnyOutgoing=function(t){return this.gt=this.gt||[],this.gt.push(t),this},o.prependAnyOutgoing=function(t){return this.gt=this.gt||[],this.gt.unshift(t),this},o.offAnyOutgoing=function(t){if(!this.gt)return this;if(t){for(var n=this.gt,i=0;i<n.length;i++)if(t===n[i])return n.splice(i,1),this}else this.gt=[];return this},o.listenersAnyOutgoing=function(){return this.gt||[]},o.notifyOutgoingListeners=function(t){if(this.gt&&this.gt.length){var n,i=r(this.gt.slice());try{for(i.s();!(n=i.n()).done;){n.value.apply(this,t.data)}}catch(t){i.e(t)}finally{i.f()}}},i(n,[{key:"disconnected",get:function(){return!this.connected}},{key:"active",get:function(){return!!this.subs}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}}])}(I);function _t(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}_t.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var n=Math.random(),i=Math.floor(n*this.jitter*t);t=1&Math.floor(10*n)?t+i:t-i}return 0|Math.min(t,this.max)},_t.prototype.reset=function(){this.attempts=0},_t.prototype.setMin=function(t){this.ms=t},_t.prototype.setMax=function(t){this.max=t},_t.prototype.setJitter=function(t){this.jitter=t};var Dt=function(t){function n(n,i){var r,e;(r=t.call(this)||this).nsps={},r.subs=[],n&&"object"===c(n)&&(i=n,n=void 0),(i=i||{}).path=i.path||"/socket.io",r.opts=i,$(r,i),r.reconnection(!1!==i.reconnection),r.reconnectionAttempts(i.reconnectionAttempts||1/0),r.reconnectionDelay(i.reconnectionDelay||1e3),r.reconnectionDelayMax(i.reconnectionDelayMax||5e3),r.randomizationFactor(null!==(e=i.randomizationFactor)&&void 0!==e?e:.5),r.backoff=new _t({min:r.reconnectionDelay(),max:r.reconnectionDelayMax(),jitter:r.randomizationFactor()}),r.timeout(null==i.timeout?2e4:i.timeout),r.st="closed",r.uri=n;var o=i.parser||xt;return r.encoder=new o.Encoder,r.decoder=new o.Decoder,r.et=!1!==i.autoConnect,r.et&&r.open(),r}s(n,t);var i=n.prototype;return i.reconnection=function(t){return arguments.length?(this.kt=!!t,t||(this.skipReconnect=!0),this):this.kt},i.reconnectionAttempts=function(t){return void 0===t?this.At:(this.At=t,this)},i.reconnectionDelay=function(t){var n;return void 0===t?this.jt:(this.jt=t,null===(n=this.backoff)||void 0===n||n.setMin(t),this)},i.randomizationFactor=function(t){var n;return void 0===t?this.Et:(this.Et=t,null===(n=this.backoff)||void 0===n||n.setJitter(t),this)},i.reconnectionDelayMax=function(t){var n;return void 0===t?this.Ot:(this.Ot=t,null===(n=this.backoff)||void 0===n||n.setMax(t),this)},i.timeout=function(t){return arguments.length?(this.Bt=t,this):this.Bt},i.maybeReconnectOnOpen=function(){!this.ot&&this.kt&&0===this.backoff.attempts&&this.reconnect()},i.open=function(t){var n=this;if(~this.st.indexOf("open"))return this;this.engine=new pt(this.uri,this.opts);var i=this.engine,r=this;this.st="opening",this.skipReconnect=!1;var e=It(i,"open",(function(){r.onopen(),t&&t()})),o=function(i){n.cleanup(),n.st="closed",n.emitReserved("error",i),t?t(i):n.maybeReconnectOnOpen()},s=It(i,"error",o);if(!1!==this.Bt){var u=this.Bt,h=this.setTimeoutFn((function(){e(),o(new Error("timeout")),i.close()}),u);this.opts.autoUnref&&h.unref(),this.subs.push((function(){n.clearTimeoutFn(h)}))}return this.subs.push(e),this.subs.push(s),this},i.connect=function(t){return this.open(t)},i.onopen=function(){this.cleanup(),this.st="open",this.emitReserved("open");var t=this.engine;this.subs.push(It(t,"ping",this.onping.bind(this)),It(t,"data",this.ondata.bind(this)),It(t,"error",this.onerror.bind(this)),It(t,"close",this.onclose.bind(this)),It(this.decoder,"decoded",this.ondecoded.bind(this)))},i.onping=function(){this.emitReserved("ping")},i.ondata=function(t){try{this.decoder.add(t)}catch(t){this.onclose("parse error",t)}},i.ondecoded=function(t){var n=this;R((function(){n.emitReserved("packet",t)}),this.setTimeoutFn)},i.onerror=function(t){this.emitReserved("error",t)},i.socket=function(t,n){var i=this.nsps[t];return i?this.et&&!i.active&&i.connect():(i=new Lt(this,t,n),this.nsps[t]=i),i},i.wt=function(t){for(var n=0,i=Object.keys(this.nsps);n<i.length;n++){var r=i[n];if(this.nsps[r].active)return}this.St()},i.ct=function(t){for(var n=this.encoder.encode(t),i=0;i<n.length;i++)this.engine.write(n[i],t.options)},i.cleanup=function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()},i.St=function(){this.skipReconnect=!0,this.ot=!1,this.onclose("forced close")},i.disconnect=function(){return this.St()},i.onclose=function(t,n){var i;this.cleanup(),null===(i=this.engine)||void 0===i||i.close(),this.backoff.reset(),this.st="closed",this.emitReserved("close",t,n),this.kt&&!this.skipReconnect&&this.reconnect()},i.reconnect=function(){var t=this;if(this.ot||this.skipReconnect)return this;var n=this;if(this.backoff.attempts>=this.At)this.backoff.reset(),this.emitReserved("reconnect_failed"),this.ot=!1;else{var i=this.backoff.duration();this.ot=!0;var r=this.setTimeoutFn((function(){n.skipReconnect||(t.emitReserved("reconnect_attempt",n.backoff.attempts),n.skipReconnect||n.open((function(i){i?(n.ot=!1,n.reconnect(),t.emitReserved("reconnect_error",i)):n.onreconnect()})))}),i);this.opts.autoUnref&&r.unref(),this.subs.push((function(){t.clearTimeoutFn(r)}))}},i.onreconnect=function(){var t=this.backoff.attempts;this.ot=!1,this.backoff.reset(),this.emitReserved("reconnect",t)},n}(I),Pt={};function $t(t,n){"object"===c(t)&&(n=t,t=void 0);var i,r=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2?arguments[2]:void 0,r=t;i=i||"undefined"!=typeof location&&location,null==t&&(t=i.protocol+"//"+i.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?i.protocol+t:i.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==i?i.protocol+"//"+t:"https://"+t),r=ft(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var e=-1!==r.host.indexOf(":")?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+e+":"+r.port+n,r.href=r.protocol+"://"+e+(i&&i.port===r.port?"":":"+r.port),r}(t,(n=n||{}).path||"/socket.io"),e=r.source,o=r.id,s=r.path,u=Pt[o]&&s in Pt[o].nsps;return n.forceNew||n["force new connection"]||!1===n.multiplex||u?i=new Dt(e,n):(Pt[o]||(Pt[o]=new Dt(e,n)),i=Pt[o]),r.query&&!n.query&&(n.query=r.queryKey),i.socket(r.path,n)}return e($t,{Manager:Dt,Socket:Lt,io:$t,connect:$t}),$t}));`