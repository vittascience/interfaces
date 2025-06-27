Blockly.defineBlocksWithJsonArray([
  //////////////// STRUCTURE blocks ////////////////
  //head tag
  {
    "type": "html",
    "message0": '<html> %1 %2 </html>',
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "html"
      }
    ],
    "colour": "#ff9403",
    "tooltip": "HTML tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_html.asp"
  },
  {
    "type": "head",
    "message0": '<head> %1 %2</head>',
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "header"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "Head tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_head.asp"
  },
  //metacharset tag
  {
    "type": "metacharset",
    "message0": '<meta charset =  %1 >',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "value",
        "options": [
          ["utf-8","utf-8"],
          ["utf-16","utf-16"]
        ]
      },
    ],
    "previousStatement": "header",
    "nextStatement": "header",
    "colour": "#ff9403",
    "tooltip": "Meta charset tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_meta.asp"
  },
  //metaviewport tag
  {
    "type": "metaviewport",
    "message0": "<meta name=\"viewport\">",
    "previousStatement": "header",
    "nextStatement": "header",
    "colour": "#ff9403",
    "tooltip": "Meta viewport (adds responsiveness)",
    "helpUrl": "https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag"
  },
  //title tag
  {
    "type": "title",
    "message0": '<title> %1 </title>',
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "%{BKY_HTML_STRUCTURE_TITLE}"
      }
    ],
    "previousStatement": "header",
    "nextStatement": "header",
    "colour": "#ff9403",
    "tooltip": "Title tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_title.asp"
  },
  //body tag
  {
    "type": "body",
    "message0": '<body %1> %2 </body>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "html"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "Body tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_body.asp"
  },
  //header tag
  {
    "type": "headertag",
    "message0": '<header %1> %2 </header>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "html"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "header tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_header.asp"
  },
  //footer tag
  {
    "type": "footertag",
    "message0": '<footer %1> %2 </footer>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "html"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "footer tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_footer.asp"
  },
  //div tag
  {
    "type": "script_tag",
    "message0": '<script> %1 %2 </script>',
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": JS_BLOCKS,
      }
    ],
    "previousStatement": "header",
    "nextStatement": 'header',
    "colour": "#ff9403",
    "tooltip": "Script tag shoud be placed in the head tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_style.asp"

  },
  {
    "type": "meta_unknown",
    "message0": '<meta %1>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes",
        "text": "..."
      }
    ],
    "previousStatement": ["header", "html"],
    "nextStatement": ["header", "html"],
    "colour": "#ff9403",
    "tooltip": "Custom meta tag",
    "helpUrl": ""

  },

  {
    "type": "default_unnamed_div",
    "message0": '<%1%2> %3 </%4>',
    "args0": [
      {
        "type": "field_input",
        "name": "CUSTOMTAG",
        "text": "custom"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": [
          "html",
          "form"
        ]
      },
      {
        "type": "field_input",
        "name": "CUSTOMTAGCLOSE",
        "text": "custom"
      }
    ],
    "previousStatement": [
      "html",
      "form",
      "header"
    ],
    "nextStatement": [
      "html",
      "form",
      "header"
    ],
    "colour": "#BDBDBD",
    "tooltip": "Unknown HTML tag",
    "helpUrl": ""
  },

  {
    "type": "divider",
    "message0": '<div %1> %2 </div>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": [
          "html",
          "form"
        ]
      }
    ],
    "previousStatement": [
      "html",
      "form"
    ],
    "nextStatement": [
      "html",
      "form"
    ],
    "colour": "#ff9403",
    "tooltip": "Divider tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_div.asp"
  },
  //button tag
  {
    "type": "button",
    "message0": '<button %1> %2 </button>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": [
          "html",
          "form"
        ]
      }
    ],
    "previousStatement": [
      "html",
      "form"
    ],
    "nextStatement": [
      "html",
      "form"
    ],
    "colour": "#ff9403",
    "tooltip": "Button tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_button.asp"
  },
  //br tag
  {
    "type": "linebreak",
    "message0": '<br/>',
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "Line break tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_br.asp"
  },
  //hr tag
  {
    "type": "hline",
    "message0": '<hr %1 />',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff9403",
    "tooltip": "Horizontal line tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_hr.asp"
  },
  //////////////// ATTRIBUTES blocks ////////////////
  //attributes block
  {
    "type": "args",
    "message0": '%{BKY_HTML_ATTRIBUTES}: %1',
    "args0": [
      {
        "type": "input_statement",
        "name": "content",
        "check": "args"
      }
    ],
    "colour": "#448ae5",
    "output": "attributes",
    "tooltip": "Additional attributes",
    "helpUrl": "https://www.w3schools.com/html/html_attributes.asp"
  },
  //class block
  {
    "type": "class",
    "message0": 'class = \" %1 \"',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": ""
      }
    ],
    "previousStatement": "args",
    "nextStatement": "args",
    "colour": "#448ae5",
    "tooltip": "Class attribute",
    "helpUrl": "https://www.w3schools.com/html/html_classes.asp"
  },
  //id block
  {
    "type": "id",
    "message0": 'id = \" %1 \"',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": ""
      }
    ],
    "previousStatement": "args",
    "nextStatement": "args",
    "colour": "#448ae5",
    "tooltip": "ID attribute",
    "helpUrl": "https://www.w3schools.com/tags/att_global_id.asp"
  },
  //arguments:value block
  {
    "type": "emptyarg",
    "message0": '%1 = \" %2 \"',
    "args0": [
      {
        "type": "field_input",
        "name": "property",
        "text": "%{BKY_HTML_ATTRIBUTES_PROPERTY}"
      },
      {
        "type": "field_input",
        "name": "value",
        "text": "%{BKY_HTML_ATTRIBUTES_VALUE}"
      }
    ],
    "previousStatement": "args",
    "nextStatement": "args",
    "colour": "#448ae5",
    "tooltip": "Empty modifier",
    "helpUrl": "https://www.w3schools.com/html/html_classes.asp"
  },
  //////////////// TEXT blocks ////////////////
  //comment block
  {
    "type": "htmlcomment",
    "message0": '%{BKY_HTML_TEXTS_COMMENT} %1',
    "args0": [
      {
        "type": "field_input",
        "name": "value",
        "text": "..."
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7ac943",
    "tooltip": "Comment tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_comment.asp"
  },
  //empty text block
  {
    "type": "emptytext",
    "message0": '%{BKY_HTML_TEXTS_TEXT} %1',
    "args0": [
      {
        "type": "field_input",
        "name": "content",
        "text": "..."
      }
    ],
    "previousStatement": ["html", "textcontainer"],
    "nextStatement": ["html", "textcontainer"],
    "colour": "#7ac943",
    "tooltip": "Text",
    "helpUrl": "https://www.w3schools.com/html/html_text.asp"
  },
  //span block
  {
    "type": "span",
    "message0": '<span %1> %2 </span>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#7ac943",
    "tooltip": "Span tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_span.asp"
  },
  //paragraph block
  {
    "type": "paragraph",
    "message0": '<p %1> %2 </p>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#7ac943",
    "tooltip": "Paragraph tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_p.asp"
  },
  // heading block
  {
    "type": "header",
    "message0": '<h %1 %2> %3 </h>',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "size",
        "options": [
          ["1","1"],
          ["2","2"],
          ["3","3"],
          ["4","4"],
          ["5","5"],
          ["6","6"]
        ]
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#7ac943",
    "tooltip": "Heading tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_hn.asp"
  },
  //link block
  {
    "type": "link",
    "message0": '<a href=\" %1 \" %2> %3 </a>',
    "args0": [
      {
        "type": "field_input",
        "name": "target",
        "text": "http://"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#7ac943",
    "tooltip": "Paragraph tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_p.asp"
  },
  /////////// TABLES blocks ///////////
  //table block
  {
    "type": "table",
    "message0": '<table %1> %2 </table>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "table"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#9966ff",
    "tooltip": "Table tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_table.asp"
  },
  // Empty table (for toolbox)
  {
    "type": "emptytable",
    "message0": '<table %1> %2 </table>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "table"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#9966ff",
    "tooltip": "Table tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_table.asp"
  },
  //table row block
  {
    "type": "tablerow",
    "message0": '<tr %1> %2 </tr>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "tablerow"
      }
    ],
    "previousStatement": "table",
    "nextStatement": "table",
    "colour": "#9966ff",
    "tooltip": "Table row tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_tr.asp"
  },
  //table heading block
  {
    "type": "tableheading",
    "message0": '<th %1> %2 </th>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": ["html", "textcontainer"]
      }
    ],
    "previousStatement": "tablerow",
    "nextStatement": "tablerow",
    "colour": "#9966ff",
    "tooltip": "Table heading tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_th.asp"
  },
  //table data block
  {
    "type": "tabledata",
    "message0": '<td %1> %2 </td>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": ["html", "textcontainer"]
      }
    ],
    "previousStatement": "tablerow",
    "nextStatement": "tablerow",
    "colour": "#9966ff",
    "tooltip": "Table data tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_td.asp"
  },
  /////////// LISTS blocks ///////////
  //unordered list block
  {
    "type": "unorderedlist",
    "message0": '<ul %1> %2 </ul>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "list"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#e58544",
    "tooltip": "Unordered list tag",
    "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
  },
  //ordered list block
  {
    "type": "orderedlist",
    "message0": '<ol %1> %2 </ol>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "list"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#e58544",
    "tooltip": "Ordered list tag",
    "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
  },
  //list item block
  {
    "type": "listitem",
    "message0": '<li %1> %2 </li>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": "list",
    "nextStatement": "list",
    "colour": "#e58544",
    "tooltip": "List item tag",
    "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
  },
  //////////////// FORM blocks ////////////////
  //form block
  {
    "type": "form",
    "message0": '<form %1> %2 </form>',
    "args0": [
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "form"

      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff4d6a",
    "tooltip": "Form tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_form.asp"
  },
  //input block
  {
    "type": "input",
    "message0": '<input type = \" %1 \" value = \" %2 \" placeholder = \" %3 \" name = \" %4 \" %5> ',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "type",
        "options": [
          ["submit","submit"],
          ["checkbox","checkbox"],
          ["color","color"],
          ["date","date"],
          ["datetime-local","datetime-local"],
          ["email","email"],
          ["hidden","hidden"],
          ["month","month"],
          ["number","number"],
          ["password","password"],
          ["radio","radio"],
          ["range","range"],
          ["text","text"],
          ["time","time"],
          ["week","week"]
        ]
      },
      {
        "type": "field_input",
        "name": "value",
        "text": ""
      },
      {
        "type": "field_input",
        "name": "placeholder",
        "text": "..."
      },
      {
        "type": "field_input",
        "name": "name",
        "text": "input"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes",
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#ff4d6a",
    "tooltip": "Input tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_input.asp"
  },
  //label block
  {
    "type": "label",
    "message0": '<label for = \" %1 \" %2> %3 </label>',
    "args0": [
      {
        "type": "field_input",
        "name": "for",
        "text": "id"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      },
      {
        "type": "input_statement",
        "name": "content",
        "check": "textcontainer"
      }
    ],
    "previousStatement": [
      "html",
      "form"
    ],
    "nextStatement": [
      "html",
      "form"
    ],
    "colour": "#ff4d6a",
    "tooltip": "Label tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_label.asp"
  },
  /////////// MEDIA blocks ///////////
  //image block
  {
    "type": "image",
    "message0": '<img src = \"  %1 \" %2>',
    "args0": [
      {
        "type": "field_input",
        "name": "source",
        "text": "https://"
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#87599d",
    "tooltip": "Image tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_img.asp"
  },
  //audio block
  {
    "type": "audio",
    "message0": '<audio src =  %1 loop = %2 autoplay = %3 controls = %4 %5>',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "source",
        "options": [
          ["8bit.ogg","8bit.ogg"],
          ["classical.mp3","classical.mp3"],
          ["happy.wav","happy.wav"]
        ]
      },
      {
        "type": "field_checkbox",
        "name": "loop",
        "checked": false
      },
      {
        "type": "field_checkbox",
        "name": "autoplay",
        "checked": false
      },
      {
        "type": "field_checkbox",
        "name": "controls",
        "checked": true
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#87599d",
    "tooltip": "Audio tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_audio.asp"
  },
  //video block
  {
    "type": "video",
    "message0": '<video src =  %1 loop = %2 autoplay = %3 controls = %4 %5>',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "source",
        "options": [
          ["bigbuckbunny.mp4","bbb"],
          ["llamadrama.mp4","ld"]
        ]
      },
      {
        "type": "field_checkbox",
        "name": "loop",
        "checked": false
      },
      {
        "type": "field_checkbox",
        "name": "autoplay",
        "checked": false
      },
      {
        "type": "field_checkbox",
        "name": "controls",
        "checked": true
      },
      {
        "type": "input_value",
        "name": "modifier",
        "check": "attributes"
      }
    ],
    "previousStatement": "html",
    "nextStatement": "html",
    "colour": "#87599d",
    "tooltip": "Video tag",
    "helpUrl": "https://www.w3schools.com/tags/tag_video.asp"
  }
]);