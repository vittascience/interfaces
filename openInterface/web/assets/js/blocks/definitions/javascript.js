Blockly.defineBlocksWithJsonArray([
  //getElementById block
  {
    "type": "getelementbyid",
    "message0": '%{BKY_JS_DOM_GETBYID_MESSAGE} %1',
    "args0": [
      {
        "type": "input_value",
        "name": "ID"
      }
    ],
    "output": null,
    "colour": "#fc7417",
    "tooltip": "Get element by id",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById"
  },
  //getElementByClass block
  {
    "type": "getelementsbyclassname",
    "message0": '%{BKY_JS_DOM_GETBYCLASS_MESSAGE} %1',
    "args0": [
      {
        "type": "input_value",
        "name": "CLASS"
      }
    ],
    "output": null,
    "colour": "#fc7417",
    "tooltip": "Get elements by class",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Document/getElementsByClassName"
  },
  //getElementByTag block
  {
    "type": "getelementsbytagname",
    "message0": '%{BKY_JS_DOM_GETBYTAG_MESSAGE} %1',
    "args0": [
      {
        "type": "input_value",
        "name": "TAG"
      }
    ],
    "output": null,
    "colour": "#fc7417",
    "tooltip": "Get elements by tag",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Document/getElementsByTagName"
  },
  //addEventListener block
  {
    "type": "addeventlistener",
    "message0": '%{BKY_JS_DOM_ADDEVENTLISTENER_MESSAGE_1} %1 %{BKY_JS_DOM_ADDEVENTLISTENER_MESSAGE_2} %2',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EVENT",
        "options": [
          ["click","click"],
          ["mouseover","mouseover"],
          ["keypress","keypress"],
          ["change","change"],
          ["submit","submit"]
        ]
      },
      {
        "type": "input_value",
        "name": "ID"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#fc7417",
    "tooltip": "Add event listener",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener"
  },
  //removeEventListener block
/*   {
    "type": "removeeventlistener",
    "message0": 'supprimer l\'evenement %1 de l\'element %2',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EVENT",
        "options": [
          ["click","click"],
          ["mouseover","mouseover"],
          ["keypress","keypress"],
          ["change","change"],
          ["submit","submit"]
        ]
      },
      {
        "type": "input_value",
        "name": "ID"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#fc7417",
    "tooltip": "Remove event listener",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener"
  }, */
  //edit attribut block
  {
    "type": "editattribut",
    "message0": '%{BKY_JS_DOM_EDITATTRIBUT_MESSAGE_1} %1 %{BKY_JS_DOM_EDITATTRIBUT_MESSAGE_2} %2 %{BKY_JS_DOM_EDITATTRIBUT_MESSAGE_3} %3',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ATTRIBUT",
        "options": [
          [
            "value",
            "value"
          ],
          [
            "src",
            "src"
          ],
          [
            "href",
            "href"
          ],
          [
            "id",
            "id"
          ],
          [
            "class",
            "class"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "ID"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#fc7417",
    "tooltip": "Edit attribut",
    "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute"
  },
  {
    "type": "bi_comment",
    "message0": "comment",
    "args0": [],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_assignment",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": null
      },
      {
        "type": "field_input",
        "name": "OP",
        "text": "="
      },
      {
        "type": "input_value",
        "name": "B",
        "check": null
      }
    ],

    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_assignment_return",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": null
      },
      {
        "type": "field_input",
        "name": "OP",
        "text": "="
      },
      {
        "type": "input_value",
        "name": "B",
        "check": null
      }
    ],
    "inputsInline": true,
    "output": true,
    "colour": 330,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": null
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["=", "EQ"],
          ["===", "STRICT_EQ"],
          ["≠", "NEQ"],
          ["!==", "STRICT_NEQ"],
          ["<", "LT"],
          ["≤", "LTE"],
          [">", "GT"],
          ["≥", "GTE"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": null
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Tooltip à personnaliser",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_logic_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["AND", "AND"],
          ["OR", "OR"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    
    "inputsInline": true,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Tooltip à personnaliser",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_try_catch",
    "message0": "try %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "try",
        "check": null
      }
    ],
    "message1": "catch %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "catch",
        "check": null
      }
    ],
    "message2": "%1",
    "args2": [
      {
        "type": "field_input",
        "name": "parameter",
        "text": ""
      }
    ],
    "message3": "finally %1",
    "args3": [
      {
        "type": "input_statement",
        "name": "finally",
        "check": null
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_catch",
    "message0": "catch %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "catch",
        "check": null
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "field_input",
        "name": "parameter",
        "text": ""
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_throw",
    "message0": "throw %1",
    "args0": [
      {
        "type": "input_value",
        "name": "throw",
        "check": null
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_yield",
    "message0": "yield %1 delegate %2",
    "args0": [
      {
        "type": "input_value",
        "name": "yield",
        "check": "null"
      },
      {
        "type": "field_checkbox",
        "name": "delegate",
        "checked": false
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_yield_return",
    "message0": "yield %1 delegate %2",
    "args0": [
      {
        "type": "input_value",
        "name": "yield",
        "check": "null"
      },
      {
        "type": "field_checkbox",
        "name": "delegate",
        "checked": false
      }
    ],
    "output": "null",
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_export",
    "message0": "export %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "export",
        "check": "null"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_import",
    "message0": "import %1 from %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "from",
        "check": "null"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_import_as",
    "message0": "%1 as %2",
    "args0": [
      {
        "type": "field_input",
        "name": "input",
        "text": ""
      },
      {
        "type": "field_input",
        "name": "as",
        "text": ""
      }
    ],
    "output": null,
    "colour": 90,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_for",
    "message0": "for init %1 test %2 update %3 loop %4",
    "args0": [
      {
        "type": "input_statement",
        "name": "init"
      },
      {
        "type": "input_value",
        "name": "test"
      },
      {
        "type": "input_statement",
        "name": "update"
      },
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_for_in",
    "message0": "for %1 in %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "var",
        "text": "i"
      },
      {
        "type": "input_value",
        "name": "array"
      },
      {
        "type": "input_statement",
        "name": "chain",
        "check": "null"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_switch",
    "message0": "switch %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "switch",
        "check": null
      },
      {
        "type": "input_dummy"
      },
      
    ],
    "message1": " default %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "default",
        "check": null
      }
    ],

    // 'output': true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    "mutator": "bi_call_editable_return_mutator",
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_case",
    "message0": "case %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "case",
        // "check": "null"
      },
      {
        "type": "input_statement",
        "name": "statement",
        // "check": "null"
      }
    ],
    "output": "null",
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_continue",
    "message0": "continue",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_break",
    "message0": "break",
    "args0": [],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_s1",
    "message0": "for init %1 test %2",
    "args0": [
      {
        "type": "input_statement",
        "name": "items",
        "check": "null"
      },
      {
        "type": "input_value",
        "name": "test",
        "check": "null"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_field",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "field1"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_field_return",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "field1",
        "check": null
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "output": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_call",
    "message0": "%1 ( %2 ) %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "call1"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "previousStatement": "null",
    "nextStatement": "null",
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
    // "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    // "mutator": "bi_call_editable_return_mutator",
  },
  {
    "type": "bi_call_return",
    "message0": "%1 ( %2 ) %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "fcall1"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "output": "null",
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
    // "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    // "mutator": "bi_call_editable_return_mutator",
  },
  {
    "type": "bi_direct_call_editable",
    "message0": "( %1 ) ( %2 ) %3",
    "args0": [
      {
        "type": "input_value",
        "name": "function",
        "check": null
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "previousStatement": "null",
    "nextStatement": "null",
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
    "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    "mutator": "bi_call_editable_return_mutator",
  },
  {
    "type": "bi_direct_call_editable_return",
    "message0": "( %1 ) ( %2 ) %3",
    "args0": [
      {
        "type": "input_value",
        "name": "function",
        "check": "null"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": "null"
      }
    ],
    "output": "Array",
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_call_editable",
    "message0": "%1  %2 ",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "fcall1"
      },

      {
        "type": "input_value",
        "name": "chain",
        // "check": null
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
    "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    "mutator": "bi_call_editable_return_mutator",
  },
  {
    "type": "bi_call_editable_return",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "output": "Array",
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
    "extensions": ["block_buttons_plus_minus", "bi_call_editable_return_extension"],
    "mutator": "bi_call_editable_return_mutator",
  },
  
  {
    "type": "bi_function",
    "message0": "%1 %2 ( %3 )",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "function_type",
        "options": [
          ["function", "function "],
          ["generator", "function* "],
          ["method", ""]
        ]
      },
      {
        "type": "field_input",
        "name": "name",
        "text": "nom"
      },
      {
        "type": "field_input",
        "name": "args",
        "text": "arg1, arg2..."
      }
    ],
    "colour": 290,
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/",
  },
  {
    "type": "bi_function_return",
    "message0": "%1 %2 ( %3 )",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "function_type",
        "options": [
          ["function", "function"],
          ["generator", "function*"]
        ]
      },
      {
        "type": "field_input",
        "name": "name",
        "text": "nom"
      },
      {
        "type": "field_input",
        "name": "args",
        "text": "arg1, arg2..."
      }
    ],
    'message1': '%1',
    'args1': [{
      'type': 'input_statement',
      'name': 'chain',
      'check': null
    }],
    // "output": true,
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_return",
    "message0": "return %1",
    "args0": [
      {
        "type": "input_value",
        "name": "ret",
        "check": null
      }
    ],
    "colour": 290,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_maps_set",
    "message0": "set %1 ( %2 )",
    "args0": [
      {
        "type": "field_input",
        "name": "name",
        "text": "property"
      },
      {
        "type": "field_input",
        "name": "val",
        "text": "val"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 345,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_maps_get",
    "message0": "get %1",
    "args0": [
      {
        "type": "field_input",
        "name": "name",
        "text": "property"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 345,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_var",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "var_type",
        "options": [
          ["var", "var"],
          ["let", "let"],
          ["const", "const"]
        ]
      },
      {
        "type": "field_input",
        "name": "var",
        "text": "var1"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_value",
        "name": "val",
        // "check": null
      }
    ],
    "colour": 330,
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_var_name",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "var1"
      }
    ],
    "colour": 330,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_new",
    "message0": "new %1",
    "args0": [
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 55,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_anonymous_class",
    "message0": "class %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": ""
      }
    ],
    "message1": "extends %1",
    "args1": [
      {
        "type": "field_input",
        "name": "extends",
        "text": ""
      }
    ],
    "message2": "%1",
    "args2": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 55,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },

  {
    "type": "bi_class",
    "message0": "class %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      }
    ],
    "message1": "extends %1",
    "args1": [
      {
        "type": "field_input",
        "name": "extends",
        "text": ""
      }
    ],
    "message2": "%1",
    "args2": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 55,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_static",
    "message0": "static %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "static",
        "check": null
      }
    ],
    "colour": 55,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_get",
    "message0": "get %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "get",
        "check": null
      }
    ],
    "colour": 55,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_set",
    "message0": "set %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "set",
        "check": null
      }
    ],
    "colour": 55,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  // {
  //   "type": "bi_field",
  //   "message0": "%1",
  //   "args0": [
  //     {
  //       "type": "input_value",
  //       "name": "chain",
  //       "check": null,
  //       "field": {
  //         "type": "field_input",
  //         "name": "NAME",
  //         "text": "field1"
  //       }
  //     }
  //   ],
  //   "colour": 330,
  //   "previousStatement": null,
  //   "nextStatement": null,
  //   "tooltip": "",
  //   "helpUrl": "http://www.example.com/"
  // },
  
  {
    "type": "bi_string_return",
    "message0": "\"%1\" %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "string"
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "colour": "#7ac943",
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_index",
    "message0": "[%1] %2",
    "args0": [
      {
        "type": "input_value",
        "name": "index",
        "check": null
      },
      {
        "type": "input_value",
        "name": "chain",
        "check": null
      }
    ],
    "colour": "#e58544",
    "output": null,
    "inputsInline": true,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_adaptor",
    "message0": "",
    "args0": [],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 55,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_statement",
    "message0": "",
    "args0": [],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "chain",
        "check": null
      }
    ],
    "colour": 290,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  
  {
    "type": "bi_spread",
    "message0": "... %1",
    "args0": [
      {
        "type": "input_value",
        "name": "arg_array",
        "check": null
      }
    ],
    "colour": 290,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  // Math blocks
  {
    "type": "bi_parenthesis",
    "message0": "(_) %1",
    "args0": [
      {
        "type": "input_value",
        "name": "expression",
        "check": null
      }
    ],
    "colour": 230,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_unary",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "operator",
        "text": "++"
      },
      {
        "type": "input_value",
        "name": "expression",
        "check": null
      }
    ],
    "colour": 230,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_unary_return",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "operator",
        "text": "++"
      },
      {
        "type": "input_value",
        "name": "expression",
        "check": null
      }
    ],
    "colour": 230,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_unary_postfix",
    "message0": "postfix %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "expression",
        "check": null
      },
      {
        "type": "field_input",
        "name": "operator",
        "text": "++"
      }
    ],
    "colour": 230,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_unary_postfix_return",
    "message0": "postfix %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "expression",
        "check": null
      },
      {
        "type": "field_input",
        "name": "operator",
        "text": "++"
      }
    ],
    "colour": 230,
    "output": null,
    "tooltip": "",
    "helpUrl": "http://www.example.com/"
  },
  {
    "type": "bi_math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": null
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["+", "ADD"],
          ["-", "MINUS"],
          ["*", "MULTIPLY"],
          ["/", "DIVIDE"],
          ["^", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": null
      }
    ],
    
    "inputsInline": true,
    "output": "Number",
    "colour": 230,
    "tooltip": "Tooltip à personnaliser",
    "helpUrl": "http://www.example.com/"
  },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.add_items = Object.create(null);

Blockly.Constants.add_items.BI_CALL_RETURN_EXTENSION = function() {
  this.itemCount_ = 0;

  this.updateShape_();
}

Blockly.Extensions.register('bi_call_editable_return_extension',
    Blockly.Constants.add_items.BI_CALL_RETURN_EXTENSION);


/**
 * Mixin for mutator functions in the 'bi_call' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */

Blockly.Constants.add_items.BI_CALL_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.itemCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
     * Parse XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
          var input = this.getInput('items' + i);
          itemBlock.valueConnection_ = input && input.connection.targetConnection;
          i++;
          itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
  },
  storeValueConnections_: function () {
      this.valueConnections_ = [];
      for (var i = 0; i < this.itemCount_; i++) {
          this.valueConnections_.push(this.getInput('items' + i).connection.targetConnection);
      }
  },
  restoreValueConnections_: function () {
      for (var i = 0; i < this.itemCount_; i++) {
          Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'items' + i);
      }
  },
  addItem_: function () {
      this.storeValueConnections_();
      var update = function () {
          this.itemCount_++;
      };
      this.update_(update);
      // Add text block
      if (this.itemCount_ > 1) {
          const dataBlockName = "text";
          if (Blockly.Blocks[dataBlockName]) {
              const newBlock = Blockly.utils.xml.createElement('block');
              newBlock.setAttribute('type', dataBlockName);
              if (newBlock) {
                  const id = Blockly.utils.genUid();
                  newBlock.setAttribute('id', id);
                  Blockly.Xml.domToBlock(newBlock, this.workspace);
                  const block = this.workspace.getBlockById(id);
                  // block.setFieldValue("Label" + this.itemCount_, "TEXT");
                  this.valueConnections_.push(block.outputConnection);
              }
          }
      }
      this.restoreValueConnections_();
  },
  removeItem_: function () {
      this.storeValueConnections_();
      var update = function () {
          this.itemCount_--;
      };
      this.update_(update);
      this.restoreValueConnections_();
  },
  update_: function (update) {
      return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  
  updateShape_: function () {
      var that = this;
      var remove = function () {
          that.removeItem_();
      };
      var add = function () {
          that.addItem_();
      };
      // Remove all inputs
      var inputNames = ['LEFT_PAREN', 'TOP', 'RIGHT_PAREN', 'CHAIN'];
      for (var i = 0; i < this.itemCount_; i++) {
          inputNames.push('items' + i);
      }

      for (var i = 0; i < inputNames.length; i++) {
        if (this.getInput(inputNames[i])) {
            this.removeInput(inputNames[i]);
        }
      }
      // Update inputs
      this.appendDummyInput('LEFT_PAREN')
      .appendField('(');

      var top = this.appendDummyInput('TOP');
      if (this.itemCount_ > 0) {
          top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
          if (this.itemCount_ > 1) {
              top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
          }
          for (var i = 0; i < this.itemCount_; i++) {
              this.appendValueInput('items' + i);
          }
          
      }

      this.appendDummyInput('RIGHT_PAREN')
          .appendField(')');
      
      // this.appendValueInput('chain')
      //   // .appendField(')')
        // .setCheck(null);
          
      /* Switch to vertical list when the list is too long */
      var showHorizontalList = this.itemCount_ <= 2;
      this.setInputsInline(showHorizontalList);
      this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
};

Blockly.Extensions.registerMutator('bi_call_editable_return_mutator',
    Blockly.Constants.add_items.BI_CALL_MUTATOR_MIXIN);