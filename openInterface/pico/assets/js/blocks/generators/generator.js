Blockly.Python.esp32 = Object.create(null);

Blockly.Python.esp32.writeJavascriptFile = function (data) {
  data.pop();
  // console.log(data);
  const jsScriptWriter = "f = open('vitta_script.js', 'w')" + NEWLINE
    + 'javascript_code = """' + NEWLINE
    + data.join("\n")
    + '"""' + NEWLINE
    + 'f.write(javascript_code)' + NEWLINE
    + 'f.close()' + NEWLINE
    + 'javascript_code = None' + NEWLINE
  return jsScriptWriter;
};

Blockly.Python.esp32.writeCssFile = function (data) {
  data.pop();
  const cssStyleWriter = "f = open('vitta_style.css', 'w')" + NEWLINE
    + 'css_style_code = """' + NEWLINE
    + data.join("\n")
    + '"""' + NEWLINE
    + 'f.write(css_style_code)' + NEWLINE
    + 'f.close()' + NEWLINE
    + 'css_style_code = None' + NEWLINE
  return cssStyleWriter;
};

Blockly.Python.esp32.getStringFormat = function (value) {
  return '""" + ' + value + ' + """';
};

Blockly.Python.esp32.getVariablesIncludedInHtml = function (block) {
  const var_gets = block.workspace.getBlocksByType('variables_get');
  let html_var_names = new Array()
  for (let id in var_gets) {
    let blockGet = var_gets[id];
    while (true) {
      if (blockGet.parentBlock_ !== null) {
        if (Blockly.Constants.HTML_BLOCKS.includes(blockGet.getParent().type)) {
          const name = Blockly.Python.nameDB_.getName(var_gets[id].getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
          if (!html_var_names.includes(name)) {
            html_var_names.push(name);
          }
          break;
        } else {
          blockGet = blockGet.getParent();
        }
      } else {
        break;
      }
    }
  }
  return html_var_names;
};

Blockly.Python.esp32.addHtmlSpanValue = function (id, value) {
  if (Blockly.Python.htmlSpans_[id] === undefined) {
    Blockly.Python.htmlSpans_[id] = value;
  }
};

Blockly.Python.esp32.addHtmlGaugeValue = function (id, value) {
  if (Blockly.Python.htmlGauges_[id] === undefined) {
    Blockly.Python.htmlGauges_[id] = value;
  }
};

/**
 * Adds a string of "jsCode" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} jsCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.esp32.addJavascriptCode = function (jsCodeTag, code) {
  if (Blockly.Python.jsCodes_[jsCodeTag] === undefined) {
    Blockly.Python.jsCodes_[jsCodeTag] = code;
  }
};

/**
 * Adds a string of "cssStyle" code to be added after initializations.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} cssCodeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Python.esp32.addCssStyle = function (cssCodeTag, code) {
  if (Blockly.Python.cssStyles_[cssCodeTag] === undefined) {
    Blockly.Python.cssStyles_[cssCodeTag] = code;
  }
};

Blockly.Python.esp32.MODE_SERVER = 'server';
Blockly.Python.esp32.MODE_CLIENT = 'client';
Blockly.Python.esp32.MODE_NORMAL = 'normal';

Blockly.Python.esp32.getProgrammingMode = function () {
  const server_types = [
    'network_server_sendData',
    'network_server_getClientData',
    'network_server_getClientIp',
    'network_server_sendWebPage'
  ];
  const client_types = [
    'network_client_sendData',
    'network_client_getServerData'
  ];
  const checkBlocks = function (blockTypes, mode) {
    for (i in blockTypes) {
      const blocks = Blockly.getMainWorkspace().getBlocksByType(blockTypes[i]);
      if (Object.keys(blocks).length > 0) {
        for (j in blocks) {
          let block = blocks[j]
          while (true) {
            if (block.parentBlock_ !== null) {
              if (block.getParent().type == 'scratch_forever' || block.getParent().type == 'forever') {
                return { 'mode': mode, 'loop': true };
              } else if (block.getParent().type == 'scratch_on_start' || block.getParent().type == 'on_start') {
                return { 'mode': mode, 'loop': false };
              } else {
                block = block.getParent();
              }
            } else break;
          }
        }
      }
    }
  };
  let mode = checkBlocks(server_types, Blockly.Python.esp32.MODE_SERVER);
  if (mode === undefined) {
    mode = checkBlocks(client_types, Blockly.Python.esp32.MODE_CLIENT);
  }
  if (mode === undefined) {
    mode = { 'mode': Blockly.Python.esp32.MODE_NORMAL, 'loop': false };
  }
  return mode;
};

Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN', pin + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pin;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  if (codeFlag) {
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pin + " = ADC(Pin(" + pin.replace('p', '') + "))");
  return pin;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pin + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pin;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pin + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty_u16=" + duty + ")");
  return pin;
};