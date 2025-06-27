const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "html",
        "name": "HTML",
        "name": "%{BKY_CATEGORY_HTML}",
        // "custom": "VARIABLE",
        "style": "html_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-code"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "style",
        "name": "Style",
        "name": "%{BKY_CATEGORY_STYLE}",
        // "custom": "VARIABLE",
        "style": "style_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-sheet-plastic"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "javascript",
        "name": "Javascript",
        "name": "%{BKY_CATEGORY_JAVASCRIPT}",
        // "custom": "VARIABLE",
        "style": "javascript_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-js"
        },
        "contents": []
    }
];

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "html": [
        {
            "kind": "category",
            "toolboxitemid": "html_structure",
            "name": "%{BKY_HTML_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_attributes",
            "name": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
            "style": "html_attributes_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_text",
            "name": "%{BKY_HTML_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_tables",
            "name": "%{BKY_HTML_CATEGORY_TABLES}",
            "style": "html_tables_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_lists",
            "name": "%{BKY_HTML_CATEGORY_LISTS}",
            "style": "html_lists_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_forms",
            "name": "%{BKY_HTML_CATEGORY_FORMS}",
            "style": "html_forms_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_medias",
            "name": "%{BKY_HTML_CATEGORY_MEDIAS}",
            "style": "html_medias_category",
            "contents": []
        }
    ],
    "style": [
        {
            "kind": "category",
            "toolboxitemid": "css_structure",
            "name": "%{BKY_CSS_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_text",
            "name": "%{BKY_CSS_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_display",
            "name": "%{BKY_CSS_CATEGORY_DISPLAY}",
            "style": "css_display_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_dimensions",
            "name": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
            "style": "css_dimensions_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_colors",
            "name": "%{BKY_CSS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_backgrounds",
            "name": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
            "style": "css_backgrounds_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_borders",
            "name": "%{BKY_CSS_CATEGORY_BORDERS}",
            "style": "css_borders_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_miscellaneous",
            "name": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
            "style": "css_miscellaneous_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_transitions",
            "name": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
            "style": "css_transitions_category",
            "contents": []
        }
    ],
    "javascript": [
        {
            "kind": "category",
            "toolboxitemid": "js_logic",
            "name": "%{BKY_JS_CATEGORY_LOGIC}",
            "style": "js_logic_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_loops",
            "name": "%{BKY_JS_CATEGORY_LOOPS}",
            "style": "js_loops_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_math",
            "name": "%{BKY_JS_CATEGORY_MATH}",
            "style": "js_math_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_texts",
            "name": "%{BKY_JS_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_lists",
            "name": "%{BKY_JS_CATEGORY_LISTS}",
            "style": "html_lists_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_colors",
            "name": "%{BKY_JS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_dom",
            "name": "%{BKY_JS_CATEGORY_DOM}",
            "style": "js_dom_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_variables",
            "name": "%{BKY_JS_CATEGORY_VARIABLES}",
            "style": "js_variables_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_functions",
            "name": "%{BKY_JS_CATEGORY_FUNCTIONS}",
            "style": "js_functions_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_advancedjs",
            "name": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
            "style": "js_advancedjs_category",
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "html": [
        {
            "subCategoryId": 'html_structure',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_STRUCTURE}",
                "blocks": [
                    "html",
                    "head",
                    "meta_unknown",
                    "script_tag",
                    "metaviewport",
                    "title",
                    "body",
                    "headertag",
                    "footertag",
                    "divider",
                    "button",
                    "linebreak",
                    "hline"
                ]
            }]
        },
        {
            "subCategoryId": 'html_attributes',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
                "blocks": [
                    "args",
                    "class",
                    "id",
                    "emptyarg"
                ]
            }]
        },
        {
            "subCategoryId": 'html_text',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TEXTS}",
                "blocks": [
                    "htmlcomment",
                    "emptytext",
                    "span",
                    "paragraph",
                    "header",
                    "link"
                ]
            }]
        },
        {
            "subCategoryId": 'html_tables',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TABLES}",
                "blocks": [
                    "table",
                    "emptytable",
                    "tablerow",
                    "tableheading",
                    "tabledata"
                ]
            }]
        },
        {
            "subCategoryId": 'html_lists',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_LISTS}",
                "blocks": [
                    "unorderedlist",
                    "orderedlist",
                    "listitem"
                ]
            }]
        },
        {
            "subCategoryId": 'html_forms',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_FORMS}",
                "blocks": [
                    "form",
                    "input",
                    "label"
                ]
            }]
        },
        {
            "subCategoryId": 'html_medias',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_MEDIAS}",
                "blocks": [
                    "image",
                    "audio",
                    "video"
                ]
            }]
        }
    ],
    "style": [
        {
            "subCategoryId": 'css_structure',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_STRUCTURE}",
                "blocks": [
                    "style",
                    "cssitem",
                    "othercss",
                    "cssevents",
                    "cssnot",
                    "csscomment"
                ]
            }]
        },
        {
            "subCategoryId": 'css_text',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TEXTS}",
                "blocks": [
                    "fontfamily",
                    "fontsize",
                    "fontweight",
                    "colornew",
                    "colordropdown",
                    "textshadownew",
                    "texttransform",
                    "textalign",
                    "letterspacing"
                ]
            }]
        },
        {
            "subCategoryId": 'css_display',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DISPLAY}",
                "blocks": [
                    "display",
                    "margin",
                    "padding",
                    "overflow",
                    "float",
                    "verticalalign"
                ]
            }]
        },
        {
            "subCategoryId": 'css_dimensions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
                "blocks": [
                    "width",
                    "height"
                ]
            }]
        },
        {
            "subCategoryId": 'css_colors',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_COLORS}",
                "blocks": [
                    "color_picker",
                    "hex_picker",
                    "rgba_picker"
                ]
            }]
        },
        {
            "subCategoryId": 'css_backgrounds',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
                "blocks": [
                    "bgcolornew",
                    "bgimage",
                    "bgposition",
                    "bgrepeat",
                    "bgsize"
                ]
            }]
        },
        {
            "subCategoryId": 'css_borders',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BORDERS}",
                "blocks": [
                    "bordernew",
                    "borderedge",
                    "bordercol",
                    "borderrad"
                ]
            }]
        },
        {
            "subCategoryId": 'css_miscellaneous',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
                "blocks": [
                    "cursor",
                    "boxshadownew"
                ]
            }]
        },
        {
            "subCategoryId": 'css_transitions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
                "blocks": [
                    "transition",
                    "transitiontimingdropdown",
                    "transitiontimingbezier"
                ]
            }]
        }
    ],
    "javascript": [
        {
            "subCategoryId": 'js_logic',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_LOGIC}",
                "blocks": [
                    "controls_if",
                    "logic_compare",
                    "logic_operation",
                    "logic_negate",
                    "logic_boolean",
                    "logic_null",
                    "logic_ternary"
                ]
            }]
        },
        {
            "subCategoryId": 'js_loops',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_LOOPS}",
                "blocks": [
                    "controls_repeat_ext",
                    "controls_whileUntil",
                    "controls_for",
                    "controls_forEach",
                    "controls_flow_statements",
                    "bi_throw",
                    "bi_yield",
                    "bi_yield_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_math',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_MATH}",
                "blocks": [
                    "math_number",
                    "bi_parenthesis",
                    "bi_unary",
                    "bi_unary_return",
                    "bi_unary_postfix",
                    "bi_unary_postfix_return",
                    "bi_math_arithmetic",
                    "math_single",
                    "math_trig",
                    "math_constant",
                    "math_number_property",
                    "math_change",
                    "math_round",
                    "math_on_list",
                    "math_modulo",
                    "math_constrain",
                    "math_random_int",
                    "math_random_float"
                ]
            }]
        },
        {
            "subCategoryId": 'js_texts',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_TEXTS}",
                "blocks": [
                    "bi_string_return",
                    "text_join",
                    "text_append",
                    "text_length",
                    "text_isEmpty",
                    "text_indexOf",
                    "text_charAt",
                    "text_getSubstring",
                    "text_changeCase",
                    "text_trim",
                    "text_print",
                    "text_prompt_ext"
                ]
            }]
        },
        {
            "subCategoryId": 'js_lists',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_LISTS}",
                "blocks": [
                    "lists_create_with",
                    "bi_index",
                    "lists_repeat",
                    "lists_length",
                    "lists_isEmpty",
                    "lists_indexOf",
                    "lists_getIndex",
                    "lists_setIndex",
                    "lists_getSublist",
                    "lists_split"
                ]
            }]
        },
        {
            "subCategoryId": 'js_colors',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_COLORS}",
                "blocks": [
                    "colour_picker",
                    "colour_random",
                    "colour_rgb",
                    "colour_blend"
                ]
            }]
        },
        {
            "subCategoryId": 'js_dom',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_DOM}",
                "blocks": [
                    "getelementbyid",
                    "getelementsbyclassname",
                    "getelementsbytagname",
                    "addeventlistener",
                    "editattribut"
                ]
            }]
        },
        {
            "subCategoryId": 'js_variables',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_VARIABLES}",
                "blocks": [
                    "bi_var",
                    "bi_var_name",
                    "bi_assignment",
                    "bi_assignment_return",
                    "bi_field",
                    "bi_field_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_functions',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_FUNCTIONS}",
                "blocks": [
                    "bi_function",
                    "bi_call_editable",
                    "bi_call_editable_return",
                    "bi_direct_call_editable",
                    "bi_direct_call_editable_return",
                    "bi_return",
                    "bi_spread"
                ]
            }]
        },
        {
            "subCategoryId": 'js_advancedjs',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
                "blocks": [
                    "bi_try_catch",
                    "bi_catch",
                    "bi_export",
                    "bi_import",
                    "bi_import_as",
                    "bi_comment"
                ]
            }]
        }
    ]
}

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;