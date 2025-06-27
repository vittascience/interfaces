Blockly.defineBlocksWithJsonArray([
  //////////////// STRUCTURE blocks ////////////////
  //cssitem blocks
  {
    "type": "style",
    "message0": '<style> %1 %2 </style>',
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "content",
            "check": "style"
        }
    ],
    "previousStatement": "header",
    "nextStatement": "header",
    "colour": "#fc7417",
    "tooltip": "Style tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_style.asp"

  },
  {
    "type": "cssitem",
    "message0": '%1%2{ %3 }',
    "args0": [
      {
        "type": "field_input",
        "name": "selector",
        "text": "%{BKY_CSS_STRUCTURE_SELECTOR}"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "cssevents"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "stylecontent"
      }
    ],
    "previousStatement": "style",
    "nextStatement": "style",
    "colour": "#fc7417",
    "tooltip": "Style container",
    "helpUrl": "https://www.w3schools.com/cssref/css_selectors.asp"
  },
  //othercss block
  {
    "type": "othercss",
    "message0": '%1 : %2 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "property",
        "text": "%{BKY_CSS_STRUCTURE_PROPERTY}"
      },
      {
        "type": "field_input",
        "name": "value",
        "text": "%{BKY_CSS_STRUCTURE_VALUE}"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#fc7417",
    "tooltip": "Any other CSS tag",
    "helpUrl": "https://www.w3schools.com/css/default.asp"
  },
  //css events block
  {
    "type": "cssevents",
    "message0": ': %1 %2',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          [":after",":after"],
          [":before",":before"],
          ["focus","focus"],
          ["hover","hover"]
        ]
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "cssevents"
      }
    ],
    "output": "cssevents",
    "colour": "#fc7417",
    "tooltip": "CSS Events Selector",
    "helpUrl": "https://www.w3schools.com/cssref/css_selectors.asp"
  },
  //css not block
  {
    "type": "cssnot",
    "message0": ':not( %1 ) %2',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": "%{BKY_CSS_STRUCTURE_SELECTOR}"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "cssevents"
      }
    ],
    "output": "cssevents",
    "colour": "#fc7417",
    "tooltip": "CSS 'Not' Selector",
    "helpUrl": "https://www.w3schools.com/cssref/css_selectors.asp"
  },
  //comment block
  {
    "type": "csscomment",
    "message0": '%{BKY_CSS_STRUCTURE_COMMENT} %1',
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "..."
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#fc7417",
    "tooltip": "Comment CSS tag",
    "helpUrl": "https://www.w3schools.com/css/css_comments.asp"
  },
  //////////////// TEXT blocks ////////////////
  //fontfamily block
  {
    "type": "fontfamily",
    "message0": 'font-family: %1 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "sans-serif"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS font-family",
    "helpUrl": "https://www.w3schools.com/cssref/pr_font_font-family.asp"
  },
  //fontsize block
  {
    "type": "fontsize",
    "message0": 'font-size: %1 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "12px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS font-size",
    "helpUrl": "https://www.w3schools.com/cssref/pr_font_font-size.asp"
  },
  //fontweight block
  {
    "type": "fontweight",
    "message0": "font-weight: %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "weight",
        "options": [
          ["normal","normal"],
          ["bold","bold"],
          ["bolder","bolder"],
          ["lighter","lighter"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "Font-weight CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_font_weight.asp"
  },
  //color block

  {
    "type": "color",
    "message0": 'color: %1 ;',
            "args0": [
                {
                    "type": "field_colour",
                    "name": "value",
                    "colour": "#339999"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Color",
            "helpUrl": "https://www.w3schools.com/cssref/pr_text_color.asp"

  },

  {
    "type": "colornew",
    "message0": 'color: %1 ;',
    "args0": [
      {
        "type": "input_value",
        "name": "value",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Color",
    "helpUrl": "https://www.w3schools.com/cssref/pr_text_color.asp"
  },
  //colordropdown block
  {
    "type": "colordropdown",
    "message0": 'color: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "color",
        "options": [
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Color",
    "helpUrl": "https://www.w3schools.com/cssref/pr_text_color.asp"
  },
  //texashadow block
  {
    "type": "textshadownew",
    "message0": 'text-shadow: %1 %2 %3 %4 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "xoffset",
        "text": "x-offset"
      },
      {
        "type": "field_input",
        "name": "yoffset",
        "text": "y-offset"
      },
      {
        "type": "field_input",
        "name": "blur",
        "text": "blur"
      },
      {
        "type": "input_value",
        "name": "color",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Text-shadow",
    "helpUrl": "https://www.w3schools.com/cssref/css3_pr_text-shadow.asp"
  },
  //texttransform block
  {
    "type": "texttransform",
    "message0": "text-transform: %1 ;",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "value",
        "options": [
          ["none", "none"],
          ["capitalize", "capitalize"],
          ["uppercase", "uppercase"],
          ["lowercase", "lowercase"],
          ["initial", "initial"],
          ["inherit", "inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Text-transform",
    "helpUrl": "https://www.w3schools.com/cssref/pr_text_text-transform.asp"
  },
  //textalign block
  {
    "type": "textalign",
    "message0": "text-align: %1 ;",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "value",
        "options": [
          ["center", "center"],
          ["left", "left"],
          ["right", "right"],
          ["justify", "justify"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Text-align",
    "helpUrl": "https://www.w3schools.com/cssref/pr_text_text-align.asp"
  },
  //letterspacing block
  {
    "type": "letterspacing",
    "message0": "letter-spacing: %1 ;",
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "0px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#22b573",
    "tooltip": "CSS Letter-spacing",
    "helpUrl": "https://www.w3schools.com/cssref/pr_text_letter-spacing.asp"
  },
  ///////////// DISPLAY blocks /////////////
  //display block
  {
    "type": "display",
    "message0": 'display: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ["inline","inline"],
          ["inline-block","inline-block"],
          ["block","block"],
          ["flex","flex"],
          ["none","none"],
          ["inline-table","inline-table"],
          ["table","table"],
          ["inline-flex","inline-flex"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "CSS Display",
    "helpUrl": "https://www.w3schools.com/cssref/pr_class_display.asp"
  },
  //margin block
  {
    "type": "margin",
    "message0": 'margin - %1 : %2 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "direction",
        "options": [
          ["top","top"],
          ["right","right"],
          ["bottom","bottom"],
          ["left","left"]
        ]
      },
      {
        "type": "field_input",
        "name": "value",
        "text": "15px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "CSS Margin",
    "helpUrl": "https://www.w3schools.com/cssref/pr_margin.asp"
  },
  //padding block
  {
    "type": "padding",
    "message0": 'padding - %1 : %2 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "direction",
        "options": [
          ["top","top"],
          ["right","right"],
          ["bottom","bottom"],
          ["left","left"]
        ]
      },
      {
        "type": "field_input",
        "name": "value",
        "text": "15px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "CSS Padding",
    "helpUrl": "https://www.w3schools.com/cssref/pr_padding.asp"
  },
  //overflow block
  {
    "type": "overflow",
    "message0": 'overflow: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ["visible","visible"],
          ["hidden","hidden"],
          ["scroll","scroll"],
          ["auto","auto"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "CSS Overflow",
    "helpUrl": "https://www.w3schools.com/cssref/pr_pos_overflow.asp"
  },
  //float block
  {
    "type": "float",
    "message0": 'float : %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ['left', 'left'],
          ['right', 'right'],
          ['none', 'none'],
          ['initial', 'initial'],
          ['inherit', 'inherit']
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "Float an element left or right",
    "helpUrl": "https://www.w3schools.com/cssref/pr_class_float.asp"
  },
  //verticalalign block
  {
    "type": "verticalalign",
    "message0": "vertical-align: %1;",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "align",
        "options": [
          ["top","top"],
          ["sub","sub"],
          ["super","super"],
          ["baseline","baseline"],
          ["text-top","text-top"],
          ["middle","middle"],
          ["bottom","bottom"],
          ["text-bottom","text-bottom"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#3fa9f5",
    "tooltip": "Vertical-align CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_pos_vertical-align.asp"
  },
  ///////////// DIMENSIONS blocks /////////////
  //width block
  {
    "type": "width",
    "message0": 'width : %1;',
    "args0": [
      {
        "type": "field_input",
        "name": "size",
        "text": "100%"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#ff4d6a",
    "tooltip": "CSS Width",
    "helpUrl": "https://www.w3schools.com/css/css_dimension.asp"
  },
  //height block
  {
    "type": "height",
    "message0": 'height : %1;',
    "args0": [
      {
        "type": "field_input",
        "name": "size",
        "text": "100%"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#ff4d6a",
    "tooltip": "CSS Height",
    "helpUrl": "https://www.w3schools.com/css/css_dimension.asp"
  },
  ///////////// COLOURS blocks /////////////
  //color_picker block
  {
    "type": "color_picker",
    "message0": "%1",
    "args0": [
      {
        "type": "field_colour",
        "name": "color",
        "colour": "#ffffff"
      }
    ],
    "output": "color",
    "colour": "#9966ff",
    "tooltip": "HTML color picker",
    "helpUrl": "https://www.w3schools.com/html/html_colors.asp"
  },
  //hex_picker block
  {
    "type": "hex_picker",
    "message0": "# %1",
    "args0": [
      {
        "type": "field_input",
        "name": "color",
        "text": "ffffff"
      }
    ],
    "output": "color",
    "colour": "#9966ff",
    "tooltip": "HTML HEX color picker",
    "helpUrl": "https://www.w3schools.com/html/html_colors.asp"
  },
  //rgba_picker block
  {
    "type": "rgba_picker",
    "message0": "rgba( %1 %2 %3 %4 )",
    "args0": [
      {
        "type": "field_number",
        "name": "r",
        "value": 255,
        "min": 0,
        "max": 255,
        "precision": 1
      },
      {
        "type": "field_number",
        "name": "g",
        "value": 255,
        "min": 0,
        "max": 255,
        "precision": 1
      },
      {
        "type": "field_number",
        "name": "b",
        "value": 255,
        "min": 0,
        "max": 255,
        "precision": 1
      },
      {
        "type": "field_number",
        "name": "a",
        "value": 1,
        "min": 0,
        "max": 1
      }
    ],
    "output": "color",
    "colour": "#9966ff",
    "tooltip": "HTML RGBA color picker",
    "helpUrl": "https://www.w3schools.com/html/html_colors.asp"
  },
  ///////////// BACKGROUND blocks /////////////
  //bgcolor block
  {
    "type": "bgcolornew",
    "message0": 'background-color: %1 ;',
    "args0": [
      {
        "type": "input_value",
        "name": "value",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#1a6da8",
    "tooltip": "CSS Background-Color",
    "helpUrl": "https://www.w3schools.com/css/css_background.asp"
  },
  //bgimage block
  {
    "type": "bgimage",
    "message0": 'background-image: url( \" %1 \" );',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": "https://"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#1a6da8",
    "tooltip": "Background-image CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_background-image.asp"
  },
  //bgposition block
  {
    "type": "bgposition",
    "message0": 'background-position: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ["left top","left top"],
          ["left center","left"],
          ["left bottom","left bottom"],
          ["center top","center top"],
          ["center center","center"],
          ["center bottom","center bottom"],
          ["right top","right top"],
          ["right center","right"],
          ["right bottom","right bottom"],
          ["inherit","inherit"],
          ["initial","initial"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#1a6da8",
    "tooltip": "Background-position CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_background-position.asp"
  },
  //bgrepeat block
  {
    "type": "bgrepeat",
    "message0": 'background-repeat: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ["repeat","repeat"],
          ["repeat-x","repeat-x"],
          ["repeat-y","repeat-y"],
          ["no-repeat","no-repeat"],
          ["space","space"],
          ["round","round"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#1a6da8",
    "tooltip": "Background-repeat CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_background-repeat.asp"
  },
  //bgsize block
  {
    "type": "bgsize",
    "message0": 'background-size: %1 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": "15px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#1a6da8",
    "tooltip": "Background-size CSS property",
    "helpUrl": "https://www.w3schools.com/cssref/pr_background-size.asp"
  },
  ///////////// BORDERS blocks /////////////
  //border block
  {
    "type": "bordernew",
    "message0": 'border: %1 %2 %3 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "width",
        "text": "10px",
      },
      {
        "type": "field_dropdown",
        "name": "type",
        "options": [
          ["none","none"],
          ["solid","solid"],
          ["dotted","dotted"],
          ["dashed","dashed"],
          ["double","double"],
          ["groove","groove"],
          ["ridge","ridge"],
          ["inset","inset"],
          ["outset","outset"]
        ]
      },
      {
        "type": "input_value",
        "name": "color",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#f9d142",
    "tooltip": "CSS Border",
    "helpUrl": "https://www.w3schools.com/css/css_border.asp"
  },
  //borderedge block
  {
    "type": "borderedge",
    "message0": "border- %1 : %2 %3 %4 ;",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "edge",
        "options": [
          ["top","top"],
          ["bottom","bottom"],
          ["left","left"],
          ["right","right"]
        ]
      },
      {
        "type": "field_input",
        "name": "width",
        "text": "10px"
      },
      {
        "type": "field_dropdown",
        "name": "type",
        "options": [
          ["none","none"],
          ["solid","solid"],
          ["dotted","dotted"],
          ["dashed","dashed"],
          ["double","double"],
          ["groove","groove"],
          ["ridge","ridge"],
          ["inset","inset"],
          ["outset","outset"]
        ]
      },
      {
        "type": "input_value",
        "name": "color",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#f9d142",
    "tooltip": "Edge border",
    "helpUrl": "https://www.w3schools.com/cssref/pr_border-bottom.asp"
  },
  //bordercol block
  {
    "type": "bordercol",
    "message0": 'border-collapse: %1 ;',
    "args0": [
      {
        "type": "field_checkbox",
        "name": "value",
        "checked": true
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#f9d142",
    "tooltip": "CSS Border collapse",
    "helpUrl": "https://www.w3schools.com/cssref/pr_border-collapse.asp"
  },
  //borderrad block
  {
    "type": "borderrad",
    "message0": 'border-radius: %1 ;',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": "10px"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#f9d142",
    "tooltip": "CSS Border Radius",
    "helpUrl": "https://www.w3schools.com/cssref/pr_border-radius.asp"
  },
  ///////////// DIVERS blocks /////////////
  //cursor block
  {
    "type": "cursor",
    "message0": 'cursor: %1 ;',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "content",
        "options": [
          ["alias","alias"],
          ["all-scroll","all-scroll"],
          ["auto","auto"],
          ["wait","wait"],
          ["zoom-in","zoom-in"],
          ["zoom-out","zoom-out"],
          ["cell","cell"],
          ["s-resize","s-resize"],
          ["se-resize","se-resize"],
          ["sw-resize","sw-resize"],
          ["text","text"],
          ["context-menu","context-menu"],
          ["col-resize","col-resize"],
          ["option","option"],
          ["copy","copy"],
          ["crosshair","crosshair"],
          ["initial","initial"],
          ["inherit","inherit"],
          ["default","default"],
          ["e-resize","e-resize"],
          ["ew-resize","ew-resize"],
          ["grab","grab"],
          ["grabbing","grabbing"],
          ["help","help"],
          ["ns-resize","ns-resize"],
          ["nw-resize","nw-resize"],
          ["nwse-resize","nwse-resize"],
          ["no-drop","no-drop"],
          ["none","none"],
          ["not-allowed","not-allowed"],
          ["pointer","pointer"],
          ["progress","progress"],
          ["row-resize","row-resize"],
          ["s-resize","s-resize"],
          ["move","move"],
          ["n-resize","n-resize"],
          ["nw-resize","nw-resize"],
          ["nesw-resize","nesw-resize"],
          ["vertical-text","vertical-text"],
          ["w-resize","nesw-resize"]
        ]
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#a5745b",
    "tooltip": "CSS Cursor",
    "helpUrl": "https://www.w3schools.com/cssref/pr_cursor.asp"
  },
  //boxshadow block
  {
    "type": "boxshadownew",
    "message0": "box-shadow: %1 %2 %3 %4 ;",
    "args0": [
      {
        "type": "field_input",
        "name": "x-offset",
        "text": "x-offset"
      },
      {
        "type": "field_input",
        "name": "y-offset",
        "text": "y-offset"
      },
      {
        "type": "field_input",
        "name": "blur",
        "text": "blur"
      },
      {
        "type": "input_value",
        "name": "color",
        "check": "color"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#a5745b",
    "tooltip": "CSS box shadow",
    "helpUrl": "https://www.w3schools.com/cssref/css3_pr_box-shadow.asp"
  },
  ///////////// TRANSITIONS blocks /////////////
  //transition block
  {
    "type": "transition",
    "message0": "transition-property: %1 %2 transition-duration: %3 s %4 transition-delay: %5 s %6 transition-timing-function: %7",
    "args0": [
      {
        "type": "field_input",
        "name": "transition-property",
        "text": "background-color"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_number",
        "name": "duration",
        "value": 0.3
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_number",
        "name": "delay",
        "value": 0
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "timing-function",
        "check": "timing-function"
      }
    ],
    "previousStatement": "stylecontent",
    "nextStatement": "stylecontent",
    "colour": "#e58544",
    "tooltip": "CSS transition template",
    "helpUrl": "https://www.w3schools.com/css/css3_transitions.asp"
  },
  //transitiontimingdropdown block
  {
    "type": "transitiontimingdropdown",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "function",
        "options": [
          ["ease","ease"],
          ["linear","linear"],
          ["ease-in","ease-in"],
          ["ease-out","ease-out"],
          ["ease-in-out","ease-in-out"],
          ["step-start","step-start"],
          ["step-end","step-end"],
          ["initial","initial"],
          ["inherit","inherit"]
        ]
      }
    ],
    "output": "timing-function",
    "colour": "#e58544",
    "tooltip": "CSS timing function options",
    "helpUrl": "https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp"
  },
  //transitiontimingbezier block
  {
    "type": "transitiontimingbezier",
    "message0": "cubic-bezier( %1 , %2 , %3 , %4 )",
    "args0": [
      {
        "type": "field_number",
        "name": "bez1",
        "value": 0,
        "min": 0,
        "max": 1
      },
      {
        "type": "field_number",
        "name": "bez2",
        "value": 0,
        "min": -5,
        "max": 5
      },
      {
        "type": "field_number",
        "name": "bez3",
        "value": 0,
        "min": 0,
        "max": 1
      },
      {
        "type": "field_number",
        "name": "bez4",
        "value": 0,
        "min": -5,
        "max": 5
      }
    ],
    "output": "timing-function",
    "colour": "#e58544",
    "tooltip": "CSS cubic bezier timing function",
    "helpUrl": "https://www.w3schools.com/cssref/func_cubic-bezier.asp"
  }
]);

Blockly.FieldColour.COLOURS = [
  'FFFFFF', 'DCDCDC', 'C0C0C0', 'A9A9A9', '808080', '696969', '708090', '000000',
  'FFA07A', 'FA8072', 'E9967A', 'F08080', 'CD5C5C', 'DC143C', 'FF0000', '8B0000',
  'FFF8DC', 'FFE4C4', 'D2B48C', 'F4A460', 'DAA520', 'FF7F50', 'A0522D', '8B4513',
  'FFDEAD', 'F5DEB3', 'DEB887', 'B8860B', 'CD853F', 'D2691E', 'A52A2A', '800000',
  'FFFACD', 'FFDAB9', 'EEE8AA', 'F0E68C', 'FFFF00', 'FFD700', 'FFA500', 'FF4500',
  '98FB98', '90EE90', '00FF7F', '00FF00', '9ACD32', '32CD32', '228B22', '006400',
  'AFEEEE', '7FFFD4', '40E0D0', '66CDAA', '20B2AA', '5F9EA0', '008B8B', '008080',
  'ADD8E6', '87CEEB', '00BFFF', '4169E1', '0000FF', '0000FF', '00008B', '000080',
  'E6E6FA', '9370DB', '8A2BE2', '9932CC', '663399', '4B0082', '8B008B', '800080',
  'FFC0CB', 'FFB6C1', 'DB7093', 'FF69B4', 'FF00FF', 'FF1493', 'C71585', 'BC8F8F'
].map(e => "#" + e.toLowerCase());
Blockly.FieldColour.TITLES = [
  'white', 'gainsboro', 'silver', 'darkgray', 'gray', 'dimgray', 'slategray', 'black',
  'lightsalmon', 'salmon', 'darksalmon', 'lightcoral', 'indianred', 'crimson', 'red', 'darkred',
  'cornsilk', 'bisque', 'tan', 'sandybrown', 'goldenrod', 'coral', 'sienna', 'saddlebrown',
  'navajowhite', 'wheat', 'burlywood', 'darkgoldenrod', 'peru', 'chocolate', 'brown', 'maroon',
  'lemonchiffon', 'peachpuff', 'palegoldenrod', 'khaki', 'yellow', 'gold', 'orange', 'orangered',
  'palegreen', 'lightgreen', 'springgreen', 'green', 'yellowgreen', 'limegreen', 'forestgreen', 'darkgreen',
  'paleturquoise', 'aquamarine', 'turquoise', 'mediumaquamarine', 'lightseagreen', 'cadetblue', 'darkcyan', 'teal',
  'lightblue', 'skyblue', 'deepskyblue', 'royalblue', 'blue', 'mediumblue', 'darkblue', 'navy',
  'lavender', 'mediumpurple', 'blueviolet', 'darkorchid', 'rebeccapurple', 'indigo', 'darkmagenta', 'purple',
  'pink', 'lightpink', 'palevioletred', 'hotpink', 'fuchsia', 'deeppink', 'mediumvioletred', 'rosybrown'
];
Blockly.FieldColour.COLUMNS = 8;