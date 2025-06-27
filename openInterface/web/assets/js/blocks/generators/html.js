function removeIndentAndTrailingNewline() {}

Blockly.JavaScript.html = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const code = '<html>\n' + statements_content + '</html>\n';
  return code;
};

Blockly.JavaScript.meta_unknown = function (block) {
  const value = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return `<meta ${value}>\n`;
};

Blockly.JavaScript.head = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const code = '<head>\n' + statements_content + '</head>\n';
  return code;
};

Blockly.JavaScript.script_tag = function(block) {
  const statements_name = Blockly.JavaScript.statementToCode(block, 'content') || '';
  return '<script>\n' + statements_name + '</script>\n';
};

Blockly.JavaScript.controls_if = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
}

Blockly.JavaScript.metacharset = function (block) {
  const dropdown_value = block.getFieldValue('value');
  const code = '<meta charset = "' + dropdown_value + '">\n';
  return code;
}

Blockly.JavaScript.metaviewport = function (block) {
  const code = '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
  return code;
}

Blockly.JavaScript.title = function (block) {
  const text_title = block.getFieldValue('value');
  const code = '<title>' + looseEscape(text_title).trim() + '</title>\n';
  return code;
}

Blockly.JavaScript.body = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC).trim();
  const code = '<body' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n' + statements_content + '</body>\n';
  return code;
}

Blockly.JavaScript.headertag = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<header' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n' + statements_content + '</header>\n';
  return code;
};

Blockly.JavaScript.footertag = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<footer' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n' + statements_content + '</footer>\n';
  return code;
};

Blockly.JavaScript.divider = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<div' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + statements_content + '</div>\n';
  return code;
};

Blockly.JavaScript.default_unnamed_div = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const customOpenTag = block.getFieldValue('CUSTOMTAG');
  const customCloseTag = block.getFieldValue('CUSTOMTAGCLOSE');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<'+ customOpenTag + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + statements_content + '</'+ customCloseTag +'>\n';
  return code;
};

Blockly.JavaScript.button = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<button' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n' + statements_content + '</button>\n';
  return code;
};

Blockly.JavaScript.linebreak = function (block) {
  return '<br/>\n';
};

Blockly.JavaScript.hline = function (block) {
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<hr' + (block_modifier ? ' ' + block_modifier.trim() : '') + '/>\n';
};

Blockly.JavaScript.args = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, 'content').trim();
  return code;
};

Blockly.JavaScript.class = function (block) {
  const text_content = block.getFieldValue('content');
  return 'class="' + looseEscape(text_content) + '" ';
};

Blockly.JavaScript.id = function (block) {
  const text_content = block.getFieldValue('content');
  return 'id="' + looseEscape(text_content) + '" ';
};

Blockly.JavaScript.emptyarg = function (block) {
  const property = block.getFieldValue('property');
  const value = block.getFieldValue('value');
  return fullEscape(property) + '="' + looseEscape(value) + '" ';
};

Blockly.JavaScript.htmlcomment = function (block) {
  const value = block.getFieldValue('value');
  const code = '<!-- ' + value + ' -->\n';
  return code;
};

Blockly.JavaScript.emptytext = function (block) {
  const text_content = block.getFieldValue('content');
  return '\n' + looseEscape(text_content) + '\n';
};

Blockly.JavaScript.span = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<span' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</span>';
};

Blockly.JavaScript.paragraph = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier');
  return '<p' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + statements_content + '</p>\n';
};

Blockly.JavaScript.header = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  const header_size = block.getFieldValue('size');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return '<h' + (header_size + ' ' + block_modifier).trim() + '>' + statements_content + '</h' + header_size + '>\n';
};

Blockly.JavaScript.link = function (block) {
  const text = Blockly.JavaScript.statementToCode(block, 'content');
  const bareLink = block.getFieldValue('target');
  const link = URLInput(block.getFieldValue('target'));
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  let target = '';

  if (isNewTabUrl(bareLink)) {
    target = ' target="_blank"';
  }

  return '<a href="' + link + '"' + target + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>' + text + '</a>\n';
};

Blockly.JavaScript.table = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<table' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</table>\n';
};

Blockly.JavaScript.emptytable = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<table' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</table>\n';
};

Blockly.JavaScript.tablerow = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<tr' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</tr>\n';
};

Blockly.JavaScript.tableheading = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<th' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</th>\n';
};

Blockly.JavaScript.tabledata = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<td' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</td>\n';
};

Blockly.JavaScript.unorderedlist = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<ul' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</ul>\n';
  return code;
};

Blockly.JavaScript.orderedlist = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<ol' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</ol>\n';
  return code;
};

Blockly.JavaScript.listitem = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<li' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</li>\n';
  return code;
};

Blockly.JavaScript.form = function (block) {
  const content = Blockly.JavaScript.statementToCode(block, 'content');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<form' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</form>\n';
};

Blockly.JavaScript.input = function (block) {
  const type = block.getFieldValue('type');
  const value = looseEscape(block.getFieldValue('value'));
  const placeholder = looseEscape(block.getFieldValue('placeholder'));
  const name = looseEscape(block.getFieldValue('name'));

  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<input type="' + type + '" value="' + value + '" placeholder="' + placeholder + '" name="' + name + '"' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n';
};

Blockly.JavaScript.label = function (block) {
  const labelFor = block.getFieldValue('for');
  const content = Blockly.JavaScript.statementToCode(block, 'content');

  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  return '<label for="' + looseEscape(labelFor) + '"' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>' + content + '</label>\n';
};

Blockly.JavaScript.image = function (block) {
  const source = block.getFieldValue('source');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '<img src="' + (URLInput(source) || 'https://codedragon.org/img/no_image.png') + '"' + (block_modifier
    ? ' ' + block_modifier.trim()
    : '') + '>\n';
  return code;
};

Blockly.JavaScript.audio = function (block) {
  const source = block.getFieldValue('source');
  const loop = block.getFieldValue('loop');
  const autoplay = block.getFieldValue('autoplay');
  const controls = block.getFieldValue('controls');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);

  let code = '<audio' + (block_modifier ? ' ' + block_modifier.trim() : '');
  if (loop === 'TRUE') {
    code += ' loop';
  }
  if (autoplay === 'TRUE') {
    code += ' autoplay';
  }
  if (controls === 'TRUE') {
    code += ' controls';
  }

  let type;
  let url;
  switch (source) {
    case '8bit.ogg':
      url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/8bit.ogg?alt=media&token=be7cc7aa-08b2-4ca4-95bd-677111139c8f';
      type = 'audio/ogg';
      break;
    case 'classical.mp3':
      url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/classical.mp3?alt=media&token=f9a9f301-5dd2-4c3d-8857-f9883b584070';
      type = 'audio/mpeg';
      break;
    case 'happy.wav':
      url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/happy.wav?alt=media&token=a7fcd6f6-7f5d-40c4-b172-c135471244b1';
      type = 'audio/wav';
      break;
  }

  code += '>\n<source src="' + url + '" type="' + type + '">\n</audio>\n';
  return code;
};

Blockly.JavaScript.video = function (block) {
  let source = block.getFieldValue('source');
  const loop = block.getFieldValue('loop');
  const autoplay = block.getFieldValue('autoplay');
  const controls = block.getFieldValue('controls');
  const block_modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);

  let code = '<video' + (block_modifier ? ' ' + block_modifier.trim() : '');
  if (loop === 'TRUE') {
    code += ' loop';
  }
  if (autoplay === 'TRUE') {
    code += ' autoplay';
  }
  if (controls === 'TRUE') {
    code += ' controls';
  }

  let type = 'video/mp4';
  switch (source) {
    case 'bbb':
      source = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/bigbuckbunny_trail_720p.mp4?alt=media&token=4795c3dd-9271-4801-96da-34da2f0c65d7';
      break;
    case 'ld':
      source = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/llamadrama_720p.mp4?alt=media&token=5ce29fab-e766-44d1-bc99-481ee2fc63cd';
      break;
  }
  code += '>\n<source src="' + source + '" type="' + type + '">\n</video>\n';
  return code;
};


// CSS GENERATOR


Blockly.JavaScript.ORDER_ATOMIC = 0;
Blockly.JavaScript.ORDER_NONE = 0;

function removeIndentAndTrailingNewline() {}

Blockly.JavaScript.style = function (block) {
  const stmt = Blockly.JavaScript.statementToCode(block, 'content');
  const code = `<style>\n${stmt}</style>\n`;
  return code;
};

Blockly.JavaScript.cssitem = function (block) {
  const statement = Blockly.JavaScript.statementToCode(block, 'content');
  const mod = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC) || '';
  const selector = cssEscape(block.getFieldValue('selector'));
  return selector + mod.trim() + '{\n' + statement + '}\n';
};

Blockly.JavaScript.othercss = function (block) {
  const property = fullEscape(block.getFieldValue('property'));

  const value = fullEscape(block.getFieldValue('value'))
    .replace(/%20/g, ' ')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')');
  const code = property + ': ' + value + ';\n';
  return code;
};

Blockly.JavaScript.cssevents = function (block) {
  const stmt = block.getFieldValue('content');
  const mod = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = ':' + stmt + mod;
  return code;
};

Blockly.JavaScript.cssnot = function (block) {
  const value = block.getFieldValue('content');
  const mod = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
  const code = ':not(' + cssEscape(value) + ')' + mod;
  return code;
};

Blockly.JavaScript.csscomment = function (block) {
  const value = block.getFieldValue('value');
  const code = '/* ' + value + ' */\n';
  return code;
};

Blockly.JavaScript.fontfamily = function (block) {
  const value = block.getFieldValue('value');
  return 'font-family: ' + cssEscape(value) + ';\n';
};

Blockly.JavaScript.fontsize = function (block) {
  const value = block.getFieldValue('value');
  return 'font-size: ' + fullEscape(value) + ';\n';
};

Blockly.JavaScript.fontweight = function (block) {
  const weight = block.getFieldValue('weight');
  return `font-weight: ${weight};\n`;
};

Blockly.JavaScript['colornew'] = function (block) {
  const color = Blockly.JavaScript.statementToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return 'color: ' + color + ';\n';
};

Blockly.JavaScript.color = function (block) {
  const color = Blockly.JavaScript.statementToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return 'color: ' + color + ';\n';
};

Blockly.JavaScript.color_picker = function (block) {
  return looseEscape(Blockly.FieldColour.TITLES[Blockly.FieldColour.COLOURS.indexOf(block.getFieldValue('color'))]);
};

Blockly.JavaScript.colordropdown = function (block) {
  const color = block.getFieldValue('color') || '';
  return `color: ${color};\n`;
};

Blockly.JavaScript["textshadownew"] = function (block) {
  const x = fullEscape(block.getFieldValue('xoffset'));
  const y = fullEscape(block.getFieldValue('yoffset'));
  const b = fullEscape(block.getFieldValue('blur'));
  const c = Blockly.JavaScript.statementToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC).trim();

  return `text-shadow: ${x} ${y} ${b} ${c};\n`;
};

Blockly.JavaScript.texttransform = function (block) {
  const value = block.getFieldValue('value');
  return `text-transform: ${value};\n`;
};

Blockly.JavaScript.textalign = function (block) {
  const value = block.getFieldValue('value');
  return `text-align: ${value};\n`;
};

Blockly.JavaScript.letterspacing = function (block) {
  const value = block.getFieldValue('value');
  return `letter-spacing: ${fullEscape(value)};\n`;
};

Blockly.JavaScript.display = function (block) {
  const value = block.getFieldValue('content');
  return 'display: ' + value + ';\n';
};

Blockly.JavaScript.margin = function (block) {
  const direction = block.getFieldValue('direction');
  const value = block.getFieldValue('value');
  return 'margin-' + direction + ': ' + fullEscape(value) + ';\n';
};

Blockly.JavaScript.padding = function (block) {
  const direction = block.getFieldValue('direction');
  const value = block.getFieldValue('value');
  return 'padding-' + direction + ': ' + fullEscape(value) + ';\n';
};

Blockly.JavaScript.overflow = function (block) {
  const value = block.getFieldValue('content');
  const direction = block.getFieldValue('direction');
  return `overflow-${direction}: ${value};\n`;
};

Blockly.JavaScript.float = function (block) {
  return 'float: ' + block.getFieldValue('content') + ';\n';
};

Blockly.JavaScript.verticalalign = function (block) {
  const align = block.getFieldValue('align');
  return `vertical-align: ${align};\n`;
};

Blockly.JavaScript.width = function (block) {
  const size = block.getFieldValue('size');
  return 'width: ' + fullEscape(size) + ';\n';
};

Blockly.JavaScript.height = function (block) {
  const size = block.getFieldValue('size');
  return 'height: ' + fullEscape(size) + ';\n';
};

Blockly.JavaScript.hex_picker = function (block) {
  return '#' + hexEscape(block.getFieldValue('color'));
};

Blockly.JavaScript.rgba_picker = function (block) {
  const r = looseEscape(block.getFieldValue('r'));
  const g = looseEscape(block.getFieldValue('g'));
  const b = looseEscape(block.getFieldValue('b'));
  const a = looseEscape(block.getFieldValue('a'));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

Blockly.JavaScript["bgcolornew"] = function (block) {
  const color = Blockly.JavaScript.statementToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return 'background-color: ' + color + ';\n';
};

Blockly.JavaScript.bgimage = function (block) {
  const content = block.getFieldValue('content');
  return 'background-image: url("' + URLInput(content) + '");\n';
};

Blockly.JavaScript.bgposition = function (block) {
  const content = block.getFieldValue('content');
  return 'background-position: ' + content + ';\n';
};

Blockly.JavaScript.bgrepeat = function (block) {
  const content = block.getFieldValue('content');
  const code = 'background-repeat: ' + content + ';\n';
  return code;
};

Blockly.JavaScript.bgsize = function (block) {
  const content = block.getFieldValue('content');
  const code = 'background-size: ' + fullEscape(content) + ';\n';
  return code;
};

Blockly.JavaScript.cursor = function (block) {
  const content = block.getFieldValue('content');
  return 'cursor: ' + content + ';\n';
};

Blockly.JavaScript["boxshadownew"] = function (block) {
  const x = fullEscape(block.getFieldValue('x-offset'));
  const y = fullEscape(block.getFieldValue('y-offset'));
  const blur = fullEscape(block.getFieldValue('blur'));
  const color = Blockly.JavaScript.statementToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return `box-shadow: ${x} ${y} ${blur} ${color};\n`;
};

Blockly.JavaScript["bordernew"] = function (block) {
  const width = fullEscape(block.getFieldValue('width'));
  const type = block.getFieldValue('type');
  const color = Blockly.JavaScript.statementToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return 'border: ' + width + ' ' + type + ' ' + color + ';\n';
};

Blockly.JavaScript.borderedge = function (block) {
  const edge = block.getFieldValue('edge');
  const width = fullEscape(block.getFieldValue('width'));
  const type = block.getFieldValue('type');
  const color = Blockly.JavaScript.statementToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC).trim();
  return `border-${edge}: ${width} ${type} ${color};\n`;
};

Blockly.JavaScript.bordercol = function (block) {
  const collapse = block.getFieldValue('value');
  let code;
  if (collapse === 'TRUE') {
    code = 'border-collapse: collapse;\n';
  } else {
    code = 'border-collapse: separate;\n';
  }
  return code;
};

Blockly.JavaScript.borderrad = function (block) {
  const content = block.getFieldValue('content');
  return 'border-radius: ' + fullEscape(content) + ';\n';
};

Blockly.JavaScript.transition = function (block) {
  const property = fullEscape(block.getFieldValue('transition-property')).trim();
  const duration = fullEscape(block.getFieldValue('duration')).trim();
  const delay = fullEscape(block.getFieldValue('delay')).trim();
  const timing = (Blockly.JavaScript.statementToCode(block, 'timing-function', Blockly.JavaScript.ORDER_ATOMIC) || 'linear').trim();
  return `transition-property: ${property};\ntransition-duration: ${duration}s;\ntransition-delay: ${delay};\ntransition-timing-function: ${timing.trim()};\n`;
};

Blockly.JavaScript.transitiontimingdropdown = function (block) {
  return block.getFieldValue('function');
};

Blockly.JavaScript.transitiontimingbezier = function (block) {
  const bez1 = fullEscape(block.getFieldValue('bez1'));
  const bez2 = fullEscape(block.getFieldValue('bez2'));
  const bez3 = fullEscape(block.getFieldValue('bez3'));
  const bez4 = fullEscape(block.getFieldValue('bez4'));
  return `cubic-bezier(${bez1}, ${bez2}, ${bez3}, ${bez4})`;
};


