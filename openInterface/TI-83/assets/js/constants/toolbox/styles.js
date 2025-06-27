/**
 * Use:
 * 
 * "coulourPrimary" : colour of blocks
 * "colourSecondary" : colour of inputs
 * "colourTertiary" : colour of empty inputs and block outlines
 */

const COMMON_THEME_CATEGORIES = {
    "io_blocks": {
        "colourPrimary": "#448ae5"
    },
    "ti_plotlib_blocks": {
        "colourPrimary": "#C2185B"
    },
    "ti_draw_blocks": {
        "colourPrimary": "#ff8d6a"
    },
    "ti_hub_blocks": {
        "colourPrimary": "#9966ff"
    },
    "ti_rover_blocks": {
        "colourPrimary": "#3349aa"
    },
    "mb_blocks": {
        "colourPrimary": "#5cb1d6"
    },
    "ce_blocks": {
        "colourPrimary": "#ff8c1a"
    },
    "turtle_blocks": {
        'colourPrimary': "#1c9c52"
    },
    "tello_blocks": {
        'colourPrimary': "#5c5c5c"
    },
    "comment_block": {
        "colourPrimary": "#bdbdbd"
    },
    "colour_blocks": {
        "colourPrimary": "#ffffff"
    }
};

const COMMON_TI_CATEGORIES = {
    "list_blocks": {
        "colourPrimary": "#ff661a"
    },
    "math_blocks": {
        "colourPrimary": "#59c059"
    },
    "random_blocks": {
        "colourPrimary": "#6641b2"
    },
    "time_blocks": {
        "colourPrimary": "#f9d142"
    },
    "ti_system_blocks": {
        "colourPrimary": "#ff4d6a"
    }
};

const THEME_VITTASCIENCE = Object.assign({
    "logic_blocks": {
        "colourPrimary": "#fc7417"
    },
    "loops_blocks": {
        "colourPrimary": "#22b573",
        "hat": "cap"
    },
    "math_blocks": {
        "colourPrimary": "#3fa9f5"
    },
    "text_blocks": {
        "colourPrimary": "#1a6da8"
    },
    "variable_blocks": {
        "colourPrimary": "#d9553e"
    },
    "list_blocks": {
        "colourPrimary": "#e58544"
    },
    "procedure_blocks": {
        "colourPrimary": "#0fb9b1",
        "hat": "cap"
    },
    "exception_blocks": {
        "colourPrimary": "#8F2D56",
    }
}, COMMON_THEME_CATEGORIES);

const THEME_SCRATCH = Object.assign({
    "control_blocks": {
        "colourPrimary": "#ffab19",
        "hat": "cap"
    },
    "math_blocks": {
        "colourPrimary": "#59c059"
    },
    "text_blocks": {
        "colourPrimary": "#1a6da8"
    },
    "variable_blocks": {
        "colourPrimary": "#d9553e"
    },
    "list_blocks": {
        "colourPrimary": "#ff661a"
    },
    "procedure_blocks": {
        "colourPrimary": "#ff4d6a",
        "hat": "cap"
    },
    "exception_blocks": {
        "colourPrimary": "#8F2D56",
    },
}, COMMON_THEME_CATEGORIES);

const THEME_TI = Object.assign({
    "procedure_blocks": {
        "colourPrimary": "#ff4d6a",
        "hat": "cap"
    },
    "control_blocks": {
        "colourPrimary": "#ffab19",
        "hat": "cap"
    },
    "ops_blocks": {
        "colourPrimary": "#59c059"
    },
    "variable_blocks": {
        "colourPrimary": "#d9553e"
    },
    "text_blocks": {
        "colourPrimary": "#1a6da8"
    },
    "advanced_blocks": {
        "colourPrimary": "#ff4d6a"
    },
}, Object.assign(COMMON_TI_CATEGORIES, COMMON_THEME_CATEGORIES));

const THEME_TI_CODE = Object.assign({
    "procedure_blocks": {
        "colourPrimary": "#ff4d6a",
    },
    "control_blocks": {
        "colourPrimary": "#ffab19",
    },
    "type_blocks": {
        "colourPrimary": "#b61da8"
    },
    "advanced_blocks": {
        "colourPrimary": "#ff4d6a"
    },
}, Object.assign(COMMON_TI_CATEGORIES, COMMON_THEME_CATEGORIES));

const THEME_VITTASCIENCE_HIGH_CONTRAST = {
    // TO DO
    "logic_blocks": {
        "colourPrimary": "#C55000",
        "colourSecondary": "#EB833C",
        "colourTertiary": "#FFB98A"
    },
    "loops_blocks": {
        "colourPrimary": "#009A55",
        "colourSecondary": "#41DC97",
        "colourTertiary": "#9BFFD3",
        "hat": "cap"
    },
    "math_blocks": {
        "colourPrimary": "#056EBA",
        "colourSecondary": "#54A7E4",
        "colourTertiary": "#ADDCFF"
    },

    "text_blocks": {
        "colourPrimary": "#005795",
        "colourSecondary": "#4F9ED7",
        "colourTertiary": "#AEDDFF"
    },
    "variable_blocks": {
        "colourPrimary": "#CAA211",
        "colourSecondary": "#EACA56",
        "colourTertiary": "#FFECA6"
    },
    "list_blocks": {
        "colourPrimary": "#B34F0B",
        "colourSecondary": "#DE8B53",
        "colourTertiary": "#FFC8A2"
    },
    "procedure_blocks": {
        "colourPrimary": "#008D86",
        "colourSecondary": "#46CDC6",
        "colourTertiary": "#A3FFFA",
        "hat": "cap"
    },
    "colour_blocks": {
        "colourPrimary": "#ffffff"
    },
    "comment_block": {
        "colourPrimary": "#8F8F8F",
        "colourSecondary": "#C5C5C5",
        "colourTertiary": "#EFEFEF"
    }
};