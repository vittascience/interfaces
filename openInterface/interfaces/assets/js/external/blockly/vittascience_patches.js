/**
 * Vittascience customisations of the Blockly core.
 *
 * These overrides used to be edited directly inside blockly_compressed.js.
 * They are kept here so that the core can stay the pristine upstream build,
 * and must be loaded right after blockly_compressed.js.
 */

// --- Colour field ---
// Blockly 11 moved the colour field out of the core into the @blockly/field-colour
// plugin (field_colour_compressed.js, loaded before this file). Blockly.FieldColour is
// kept as the interfaces' colour field; as with the core field of Blockly <= 10, the
// palette can be set for every colour field with Blockly.FieldColour.COLOURS, TITLES
// and COLUMNS.
if (!Blockly.FieldColour && window.FieldColour) {
  Blockly.FieldColour = class extends window.FieldColour {
    constructor(value, validator, config) {
      // The palette is given through the config, so that it is set before the value
      // (since @blockly/field-colour 6 the field is a dropdown, and changing its options
      // afterwards resets a value that is not one of them).
      var defaults = Blockly.FieldColour;
      if (value !== Blockly.Field.SKIP_SETUP) {
        config = Object.assign({}, config);
        if (!config.colourOptions && defaults.COLOURS) {
          config.colourOptions = defaults.COLOURS;
          config.colourTitles = config.colourTitles || defaults.TITLES;
        }
        if (!config.columns && defaults.COLUMNS) {
          config.columns = defaults.COLUMNS;
        }
      }
      super(value, validator, config);
    }
  };
  Blockly.fieldRegistry.register("field_colour", Blockly.FieldColour);
}

// --- Code generators ---
// Since Blockly 11, valueToCode and statementToCode throw when the input does not
// exist. Many generators read inputs that only exist for some mutations (they relied
// on getting an empty string, as up to Blockly 10): that behaviour is kept.
["valueToCode", "statementToCode"].forEach(function (name) {
  var toCode = Blockly.CodeGenerator.prototype[name];
  Blockly.CodeGenerator.prototype[name] = function (block, inputName) {
    if (!block.getInput(inputName)) {
      return "";
    }
    return toCode.apply(this, arguments);
  };
});

// --- Workspace icons (zoom controls, trashcan): light sprite sheet by default ---
// accessibility.js swaps it for spritesDark.png with the dark theme.
Blockly.VITTA_SPRITE = { width: 96, height: 124, url: "spritesLight.png" };
(function () {
  if (Blockly.SPRITE) {
    // Blockly <= 7 exposes the sprite settings used by the core.
    Blockly.SPRITE.url = Blockly.VITTA_SPRITE.url;
    return;
  }
  var useLightSprite = function (svgGroup) {
    if (!svgGroup) {
      return;
    }
    svgGroup.querySelectorAll("image").forEach(function (image) {
      var href = image.getAttribute("xlink:href") || image.getAttribute("href") || "";
      if (/sprites\.png$/.test(href)) {
        image.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", href.replace(/sprites\.png$/, Blockly.VITTA_SPRITE.url));
      }
    });
  };
  [Blockly.ZoomControls, Blockly.Trashcan].forEach(function (component) {
    var createDom = component.prototype.createDom;
    component.prototype.createDom = function () {
      var svgGroup = createDom.apply(this, arguments);
      useLightSprite(svgGroup);
      return svgGroup;
    };
  });
})();

// --- Zoom options: "screenshot" option (zoom: {screenshot: true}) ---
(function () {
  // Options.parseZoomOptions_ became Options.parseZoomOptions in Blockly 11.
  var name = Blockly.Options.parseZoomOptions_ ? "parseZoomOptions_" : "parseZoomOptions";
  var parseZoomOptions = Blockly.Options[name];
  Blockly.Options[name] = function (options) {
    var zoomOptions = parseZoomOptions.call(this, options);
    var zoom = options.zoom || {};
    zoomOptions.screenshot = zoom.screenshot === undefined ? false : !!zoom.screenshot;
    return zoomOptions;
  };
})();

// --- Tooltip: "<image url>" + Blockly.Tooltip.SEP + "<text>" shows the image above the text ---
Blockly.Tooltip.SEP = "&&SEPARATOR&&";
(function () {
  var renderImage = function (div, text) {
    var parts = text.split(Blockly.Tooltip.SEP);
    if (parts.length > 1) {
      div.innerHTML = "<div style='text-align: center'> <img height='145' src=" + parts[0] + ">";
    }
    return parts.slice(parts.length > 1 ? 1 : 0).join(Blockly.Tooltip.SEP);
  };
  if (Blockly.Tooltip.setCustomTooltip) {
    // Blockly >= 8: the tooltip content is rendered here (image, then the wrapped text).
    Blockly.Tooltip.setCustomTooltip(function (div, element) {
      var tip = Blockly.Tooltip.getTooltipOfObject(element);
      tip = Blockly.utils.string.wrap(renderImage(div, tip), Blockly.Tooltip.LIMIT);
      tip.split("\n").forEach(function (line) {
        var lineDiv = document.createElement("div");
        lineDiv.appendChild(document.createTextNode(line));
        div.appendChild(lineDiv);
      });
    });
    return;
  }
  // Blockly 7: the core empties the tooltip div, then passes the tooltip text to
  // Blockly.utils.string.wrap before appending it line by line: the image is
  // inserted at that point.
  var wrap = Blockly.utils.string.wrap;
  Blockly.utils.string.wrap = function (text, limit) {
    if (typeof text === "string" && text.indexOf(Blockly.Tooltip.SEP) !== -1) {
      var div = Blockly.Tooltip.getDiv ? Blockly.Tooltip.getDiv() : Blockly.Tooltip.DIV;
      text = div ? renderImage(div, text) : text.split(Blockly.Tooltip.SEP).slice(1).join(Blockly.Tooltip.SEP);
    }
    return wrap.call(this, text, limit);
  };
})();
// Block tooltips themselves keep the separator: the interfaces read it through block.getTooltip().

// --- Menu items: no deprecated goog-menuitem-highlight class ---
(function () {
  var setHighlighted = Blockly.MenuItem.prototype.setHighlighted;
  Blockly.MenuItem.prototype.setHighlighted = function (highlight) {
    setHighlighted.call(this, highlight);
    var el = this.getElement();
    if (el) {
      Blockly.utils.dom.removeClass(el, "goog-menuitem-highlight");
    }
  };
})();

// --- Toolbox flyouts ---
// The workspace registers the core variables and procedures flyouts when it is
// created. Since Blockly 9 it registers internal functions of the core, so later
// overrides of Blockly.Variables.flyoutCategory / Blockly.Procedures.flyoutCategory
// (these patches, procedures.js) would be ignored: the callbacks are replaced by
// functions reading Blockly.Variables / Blockly.Procedures when the flyout opens.
// The interfaces never register these two categories themselves.
(function () {
  var register = Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback;
  Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback = function (key, func) {
    if (key === Blockly.VARIABLE_CATEGORY_NAME) {
      func = function (workspace) {
        return Blockly.Variables.flyoutCategory(workspace);
      };
    } else if (key === Blockly.PROCEDURE_CATEGORY_NAME) {
      func = function (workspace) {
        return Blockly.Procedures.flyoutCategory(workspace);
      };
    }
    return register.call(this, key, func);
  };
})();

// Variables category: "create variable" button followed by Blockly.Variables.flyoutCategoryBlocks.
Blockly.Variables.flyoutCategory = function (workspace) {
  var button = document.createElement("button");
  button.setAttribute("text", "%{BKY_NEW_VARIABLE}");
  button.setAttribute("callbackKey", "CREATE_VARIABLE");
  workspace.registerButtonCallback("CREATE_VARIABLE", function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
  });
  return [button].concat(Blockly.Variables.flyoutCategoryBlocks(workspace));
};

(function () {
  var flyoutCategory = Blockly.Procedures.flyoutCategory;
  Blockly.Procedures.flyoutCategory = function (workspace) {
    // Blockly <= 12 returns XML elements, Blockly 13 returns JSON flyout items.
    var items = flyoutCategory.call(this, workspace, true);
    var isXml = items.length > 0 && typeof items[0].getAttribute === "function";
    var typeOf = function (item) {
      return isXml ? item.getAttribute("type") : item.type;
    };
    var setGap = function (item, gap) {
      if (isXml) {
        item.setAttribute("gap", gap);
      } else {
        item.gap = gap;
      }
    };
    var createBlock = function (type) {
      if (!isXml) {
        return { kind: "block", type: type, gap: 16 };
      }
      var block = Blockly.utils.xml.createElement("block");
      block.setAttribute("type", type);
      block.setAttribute("gap", 16);
      return block;
    };
    // Definition blocks come first, followed by the call blocks.
    var definitions = 0;
    while (definitions < items.length &&
        ["procedures_defnoreturn", "procedures_defreturn", "procedures_ifreturn"].indexOf(typeOf(items[definitions])) !== -1) {
      definitions++;
    }
    var ifReturn = -1;
    for (var i = 0; i < definitions; i++) {
      if (typeOf(items[i]) === "procedures_ifreturn") {
        ifReturn = i;
      }
    }
    var head = items.slice(0, definitions);
    if (Blockly.Blocks.procedures_simple_return) {
      head.splice(ifReturn === -1 ? head.length : ifReturn, 0, createBlock("procedures_simple_return"));
    }
    if (Blockly.Blocks.procedures_lambda) {
      head.push(createBlock("procedures_lambda"));
    }
    head.forEach(function (item) {
      setGap(item, 16);
    });
    if (head.length) {
      setGap(head[head.length - 1], 24);
    }
    return head.concat(items.slice(definitions));
  };
})();

Blockly.Variables.flyoutCategoryBlocks = function (workspace) {
  var variables = workspace.getVariableMap().getVariablesOfType("");
  var blocks = [];

  if (variables.length > 0) {
    var lastVariable = variables[variables.length - 1];

    // Bloc pour définir une variable
    if (Blockly.Blocks.variables_set) {
      var block = Blockly.utils.xml.createElement("block");
      block.setAttribute("type", "variables_set");
      block.setAttribute("gap", 12);
      block.appendChild(Blockly.Variables.generateVariableFieldDom(lastVariable));

      if (Blockly.Blocks.math_number) {
        var value = Blockly.utils.xml.textToDom('<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>');
        block.appendChild(value);
      }

      blocks.push(block);

      block = Blockly.utils.xml.createElement("block");
      block.setAttribute("type", "variables_set");
      block.setAttribute("gap", 12);
      block.appendChild(Blockly.Variables.generateVariableFieldDom(lastVariable));

      if (Blockly.Blocks.text) {
        var textValue = Blockly.utils.xml.textToDom('<value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>');
        block.appendChild(textValue);
      }

      blocks.push(block);
    }

    // Bloc pour incrémenter une variable
    if (Blockly.Blocks.variables_increment) {
      var incrementBlock = Blockly.utils.xml.createElement("block");
      incrementBlock.setAttribute("type", "variables_increment");
      incrementBlock.setAttribute("gap", Blockly.Blocks.variables_force_type ? 12 : 24);
      incrementBlock.appendChild(Blockly.Variables.generateVariableFieldDom(lastVariable));

      if (Blockly.Blocks.math_number) {
        var deltaValue = Blockly.utils.xml.textToDom('<value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value>');
        incrementBlock.appendChild(deltaValue);
      }

      blocks.push(incrementBlock);
    }

    // Blocs pour définir une variable globale
    if (Blockly.Blocks.variables_global && !['arduino', 'mbot'].includes(INTERFACE_NAME)) {
      var globalVarBlock = Blockly.utils.xml.createElement("block");
      globalVarBlock.setAttribute("type", "variables_global");
      globalVarBlock.setAttribute("gap", 12);
      globalVarBlock.appendChild(Blockly.Variables.generateVariableFieldDom(lastVariable));
      blocks.push(globalVarBlock);
    }

    // Bloc pour forcer le type d'une variable
    if (Blockly.Blocks.variables_force_type) {
      var forceTypeBlock = Blockly.utils.xml.createElement("block");
      forceTypeBlock.setAttribute("type", "variables_force_type");
      forceTypeBlock.setAttribute("gap", Blockly.Blocks.variables_type_of ? 12 : 24);

      if (Blockly.Blocks.text) {
        var forceTypeValue = Blockly.utils.xml.textToDom('<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>');
        forceTypeBlock.appendChild(forceTypeValue);
      }

      blocks.push(forceTypeBlock);
    }

    // Bloc pour obtenir le type d'une variable
    if (Blockly.Blocks.variables_type_of) {
      var typeOfBlock = Blockly.utils.xml.createElement("block");
      typeOfBlock.setAttribute("type", "variables_type_of");
      typeOfBlock.setAttribute("gap", 24);
      typeOfBlock.appendChild(Blockly.Variables.generateVariableFieldDom(lastVariable));
      blocks.push(typeOfBlock);
    }

    // Blocs pour obtenir une variable
    if (Blockly.Blocks.variables_get) {
      // VariableModel.compareByName moved to Variables.compareByName in Blockly 12.
      variables.sort(Blockly.Variables.compareByName || Blockly.VariableModel.compareByName);

      for (var i = 0; i < variables.length; i++) {
        var getBlock = Blockly.utils.xml.createElement("block");
        getBlock.setAttribute("type", "variables_get");
        getBlock.setAttribute("gap", 8);
        getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variables[i]));
        blocks.push(getBlock);
      }
    }
  }
  return blocks;
};

// --- Static typing (Blockly.Type / Blockly.Types / Blockly.StaticTyping) ---
Blockly.Type=function(a){if(void 0===a.typeId||void 0===a.typeMsgName||void 0===a.compatibleTypes)throw Error("Creating a Type requires the following format:\n{\n  typeId: string,\n  typeMsgName: Blockly.Msg string member var name to\n               identify the translatable Type name.\n  compatibleTypes: [Blockly.Type,]\n}");if(!Array.isArray(a.compatibleTypes))throw Error("The compatible types for a Blockly Types needs to be an array of Blockly.Type items.");this.typeId=a.typeId;this.typeMsgName_=
a.typeMsgName;this.compatibleTypes_=a.compatibleTypes;this.compatibleTypes_.push(this);this.generatedCheckList_=[];this.generateCheckList_()};
Object.defineProperty(Blockly.Type.prototype,"typeName",{get:function(){return Blockly.Msg[this.typeMsgName_]||this.typeId},set:function(a){console.warn('"Blockly.Type" property "typeName" is not allowed to be set.')}});
Object.defineProperty(Blockly.Type.prototype,"output",{get:function(){return this.typeId},set:function(a){console.warn('"Blockly.Type" property "output" is not allowed to be set.')}});
Object.defineProperty(Blockly.Type.prototype,"checkList",{get:function(){return this.generatedCheckList_},set:function(a){console.warn('"Blockly.Type" property "check" is not allowed to be set.')}});
Blockly.Type.prototype.generateCheckList_=function(a){this.generatedCheckList_=[];for(a=0;a<this.compatibleTypes_.length;a++){for(var b=!0,c=0;c<this.generatedCheckList_.length;c++)this.generatedCheckList_[c]===this.compatibleTypes_[a].typeId&&(b=!1);b&&this.generatedCheckList_.push(this.compatibleTypes_[a].typeId)}};
Blockly.Type.prototype.addCompatibleType=function(a){if(!(a&&a.constructor&&a instanceof Blockly.Type))throw Error("To add a compatible type to "+this.typeId+" provide a Blockly.Type object.");this.compatibleTypes_.push(a);this.generateCheckList_()};
Blockly.Type.prototype.addCompatibleTypes=function(a){if(!Array.isArray(a))throw Error("To add compatible types to the Blockly Type "+this.typeId+" provide an array of Blockly.Type items.");for(var b=0;b<a.length;b++){if(!(a[b]&&a[b].constructor&&a[b]instanceof Blockly.Type))throw Error("To add a compatible type to "+this.typeId+" you must point to a Blockly.Type object.");this.compatibleTypes_.push(a[b])}this.generateCheckList_()};
Blockly.Types={};
Blockly.Types.CHARACTER=new Blockly.Type({typeId:"Character",typeMsgName:"ARD_TYPE_CHAR",compatibleTypes:[]});
Blockly.Types.TEXT=new Blockly.Type({typeId:"String",typeMsgName:"ARD_TYPE_TEXT",compatibleTypes:[Blockly.Types.CHARACTER]});
Blockly.Types.BOOLEAN=new Blockly.Type({typeId:"Boolean",typeMsgName:"ARD_TYPE_BOOL",compatibleTypes:[]});
Blockly.Types.SHORT_NUMBER=new Blockly.Type({typeId:"Short Number",typeMsgName:"ARD_TYPE_SHORT",compatibleTypes:[]});
Blockly.Types.NUMBER=new Blockly.Type({typeId:"Number",typeMsgName:"ARD_TYPE_NUMBER",compatibleTypes:[]});
Blockly.Types.LARGE_NUMBER=new Blockly.Type({typeId:"Large Number",typeMsgName:"ARD_TYPE_LONG",compatibleTypes:[]});
Blockly.Types.DECIMAL=new Blockly.Type({typeId:"Decimal",typeMsgName:"ARD_TYPE_DECIMAL",compatibleTypes:[]});
Blockly.Types.ARRAY=new Blockly.Type({typeId:"Array",typeMsgName:"ARD_TYPE_ARRAY",compatibleTypes:[]});
Blockly.Types.NULL=new Blockly.Type({typeId:"Null",typeMsgName:"ARD_TYPE_NULL",compatibleTypes:[]});
Blockly.Types.UNDEF=new Blockly.Type({typeId:"Undefined",typeMsgName:"ARD_TYPE_UNDEF",compatibleTypes:[]});
Blockly.Types.CHILD_BLOCK_MISSING=new Blockly.Type({typeId:"ChildBlockMissing",typeMsgName:"ARD_TYPE_CHILDBLOCKMISSING",compatibleTypes:[]});
Blockly.Types.NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN,Blockly.Types.SHORT_NUMBER,Blockly.Types.LARGE_NUMBER]);
Blockly.Types.SHORT_NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN,Blockly.Types.NUMBER,Blockly.Types.LARGE_NUMBER,Blockly.Types.DECIMAL]);
Blockly.Types.LARGE_NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN,Blockly.Types.SHORT_NUMBER,Blockly.Types.NUMBER,Blockly.Types.DECIMAL]);
Blockly.Types.DECIMAL.addCompatibleTypes([Blockly.Types.BOOLEAN,Blockly.Types.SHORT_NUMBER,Blockly.Types.NUMBER,Blockly.Types.LARGE_NUMBER]);
Blockly.Types.addType=function(a,b,c){var d=a.toUpperCase().replace(/ /g,"_");if(void 0!==Blockly.Types[d])throw"The Blockly type "+d+" already exists.";Blockly.Types[d]=new Blockly.Type({typeId:a,typeName:b,compatibleTypes:c})};
Blockly.Types.getValidTypeArray=function(){var a=[],b;for(b in Blockly.Types)"UNDEF"===b||"CHILD_BLOCK_MISSING"===b||"NULL"===b||"ARRAY"===b||"function"===typeof Blockly.Types[b]||Blockly.Types[b]instanceof RegExp||a.push([Blockly.Types[b].typeName,b]);return a};
Blockly.Types.getTypeWithId=function(a){for(var b in Blockly.Types)if(a==Blockly.Types[b].typeId)return Blockly.Types[b];throw"type with id '"+a+"' is not defined in Blockly.Types \n\t at Blockly.Types.getTypeWithId()";};
Blockly.Types.getChildBlockType=function(a){return a.getBlockType?a.getBlockType():a.getVarType?a.getVarType():a.outputConnection&&a.outputConnection.getCheck()?Blockly.Types.getTypeWithId(a.outputConnection.getCheck()[0]):Blockly.Types.CHILD_BLOCK_MISSING};
Blockly.Types.regExpInt_=new RegExp(/^-?\d+$/);
Blockly.Types.regExpFloat_=new RegExp(/^-?[0-9]*[.][0-9]+$/);
Blockly.Types.identifyNumber=function(a){return Blockly.Types.regExpInt_.test(a)?(a=parseInt(a),isNaN(a)?Blockly.Types.NULL:32767<a||-32768>a?Blockly.Types.LARGE_NUMBER:Blockly.Types.NUMBER):Blockly.Types.regExpFloat_.test(a)?Blockly.Types.DECIMAL:Blockly.Types.NULL};
Blockly.StaticTyping=function(){this.varTypeDict=Object.create(null);this.pendingVarTypeDict=Object.create(null);this.functionVars=Object.create(null);this.listVars=Object.create(null)};
Blockly.StaticTyping.prototype.collectVarsWithTypes=function(a){this.varTypeDict=Object.create(null);this.pendingVarTypeDict=Object.create(null);a=Blockly.StaticTyping.getAllStatementsOrdered(a);for(var b=0;b<a.length;b++)for(var c=Blockly.StaticTyping.getBlockVars(a[b]),d=0;d<c.length;d++){var e=c[d][0],f=c[d][1];Array.isArray(f)&&(this.varTypeDict[f[1]]?f=this.varTypeDict[f[1]]:(Array.isArray(this.pendingVarTypeDict[f[1]])?this.pendingVarTypeDict[f[1]].push(e):this.pendingVarTypeDict[f[1]]=[e],
f=Blockly.Types.UNDEF));this.assignTypeToVars(a[b],e,f)}return this.varTypeDict};
Blockly.StaticTyping.prototype.collectProcedures=function(a){this.functionVars=Object.create(null);a=Blockly.StaticTyping.getAllStatementsOrdered(a);for(var b=0;b<a.length;b++)if(a[b].getProcedureDef){var c=a[b].getProcedureDef();this.functionVars[c[0]]=c}return this.functionVars};
Blockly.StaticTyping.getProcedureVarType=function(a,b){a=Blockly.StaticTyping.prototype.collectProcedures(a);for(var c in a){var d=a[c][3],e;for(e in d)if(e==b)return d[e]}return null};
Blockly.StaticTyping.prototype.collectListsId=function(a){this.listVars=Object.create(null);for(var b=Blockly.StaticTyping.getAllStatementsOrdered(a),c=0;c<b.length;c++)for(var d=Blockly.StaticTyping.getBlockVars(b[c]),e=0;e<d.length;e++){var f=d[e][0];if("variables_set"==b[c].type){var g=a.getVariableMap().getVariableById(f).name,h=b[c].childBlocks_[0],k=b[c].getVarName();k==g&&(this.listVars[f]=!h||"lists_create_with"!=h.type&&"lists_repeat"!=h.type?null:k)}else this.listVars[f]=null}return this.listVars};
Blockly.StaticTyping.getAllStatementsOrdered=function(a){if(!a.getTopBlocks)throw"Not a valid workspace: "+a;var b=function(e){var f,g=[];do{g.push(e);var h=e.nextConnection;var k=e.getConnections_();e=null;for(var l=0;l<k.length;l++)k[l].type==Blockly.NEXT_STATEMENT&&(f=k[l].targetBlock())&&(k[l]===h?e=f:g=g.concat(b(f)))}while(e);return g},c=[];a=a.getTopBlocks(!0);for(var d=0;d<a.length;d++)c=c.concat(b(a[d]));return c};
Blockly.StaticTyping.getBlockVars=function(a){var b=[],c=a.getVars?a.getVars():[].concat.apply([],a.inputList.map(function(i){return i.fieldRow})).filter(function(x){return x.referencesVariables()}).map(function(x){return x.getValue()});if(c){for(var d=0;d<c.length;d++){var e=c[d],f=a.getVarType;f&&(f=f.call(a,e),b.push([e,f]))}}return b};
Blockly.StaticTyping.prototype.assignTypeToVars=function(a,b,c){switch(this.varTypeDict[b]){case void 0:case Blockly.Types.UNDEF:this.varTypeDict[b]=c;if(c!=Blockly.Types.UNDEF&&void 0!==this.pendingVarTypeDict[b])for(var d=0;d<this.pendingVarTypeDict[b].length;d++)this.assignTypeToVars(a,this.pendingVarTypeDict[b][d],c);break;default:this.setBlockTypeWarning(a,c,b,this.varTypeDict[b])}};
Blockly.StaticTyping.prototype.setBlockTypeWarning=function(a,b,c){var d=a.workspace.getVariableMap().getVariableById(c);if(d)var e=d.name;b==Blockly.Types.CHILD_BLOCK_MISSING||this.varTypeDict[c]==Blockly.Types.CHILD_BLOCK_MISSING?a.setWarningText(null,"varType"):b!==Blockly.Types.UNDEF&&"variables_get"!=a.type?this.varTypeDict[c]!==b&&(d=Blockly.Msg.VARIABLES_SET_WARNING,c=this.varTypeDict[c],c==Blockly.Types.NUMBER&&b==Blockly.Types.DECIMAL&&(d+="\n"+Blockly.Msg.VARIABLES_SET_WARNING_NUMBERS),Blockly.Arduino.getArduinoType_?
(c=Blockly.Arduino.getArduinoType_(c),b=Blockly.Arduino.getArduinoType_(b)):(c=c.typeName,b=b.typeName),d=d.replace("%1",e),d=d.replace("%2",c),d=d.replace("%3",b),a.setWarningText(d,"varType")):a.setWarningText(null,"varType")};
Blockly.StaticTyping.prototype.setProcedureArgs=function(a){a=a.getTopBlocks();for(var b=0,c=a.length;b<c;b++){var d=a[b].setArgsType;d&&d.call(a[b],this.varTypeDict)}};

// --- Zoom controls: screenshot button (enabled by the zoom "screenshot" option) ---
// Blockly <= 8 names the zoom controls internals "workspace_", "svgGroup_"...,
// Blockly >= 9 names them "workspace", "svgGroup"..., and since Blockly 13 each
// button is a control object ("zoomOutControl"...) whose SVG group is getGroup().
Blockly.ZoomControls.prototype.vittaGet_ = function (name) {
  if (this[name + "_"] !== undefined) {
    return this[name + "_"];
  }
  if (this[name] !== undefined) {
    return this[name];
  }
  var control = this[name.replace(/Group$/, "Control")];
  return control ? control.getGroup() : null;
};
Blockly.ZoomControls.prototype.SCREENSHOT_WIDTH_ = 38;
Blockly.ZoomControls.prototype.SCREENSHOT_HEIGHT_ = 32;
(function () {
  var proto = Blockly.ZoomControls.prototype;
  var createDom = proto.createDom;
  proto.createDom = function () {
    var svgGroup = createDom.call(this);
    if (this.vittaGet_("workspace").options.zoomOptions.screenshot) {
      this.createScreenshotSvg_(String(Math.random()).substring(2));
    }
    return svgGroup;
  };
  var position = proto.position;
  proto.position = function (metrics, savedPositions) {
    position.call(this, metrics, savedPositions);
    if (!this.screenshotGroup_ || !this.vittaGet_("zoomOutGroup")) {
      return;
    }
    // When the controls are at the bottom, the core moves the zoom-out button down.
    var outTransform = this.vittaGet_("zoomOutGroup").getAttribute("transform");
    var atBottom = !!outTransform && !/^translate\(0,\s*0\)$/.test(outTransform);
    var y;
    if (atBottom) {
      y = -this.vittaGet_("LARGE_SPACING") - this.SCREENSHOT_HEIGHT_;
      this.screenshotGroup_.setAttribute("transform", "translate(-2, " + y + ")");
    } else {
      y = this.vittaGet_("SMALL_SPACING") + this.vittaGet_("HEIGHT") + (this.vittaGet_("zoomResetGroup") ? this.vittaGet_("LARGE_SPACING") + this.vittaGet_("HEIGHT") : 0) + this.vittaGet_("LARGE_SPACING") + this.SCREENSHOT_HEIGHT_;
      this.screenshotGroup_.setAttribute("transform", "translate(0, " + y + ")");
    }
  };
  var dispose = proto.dispose;
  proto.dispose = function () {
    if (this.onScreenshotWrapper_) {
      Blockly.browserEvents.unbind(this.onScreenshotWrapper_);
      this.onScreenshotWrapper_ = null;
    }
    dispose.call(this);
  };
})();

Blockly.ZoomControls.prototype.createScreenshotSvg_ = function (rnd) {
  this.screenshotGroup_ = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.G, { "class": "blocklyZoom" }, this.vittaGet_("svgGroup"));
  var clip = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.CLIPPATH, { id: "blocklyScreenshotClipPath" + rnd }, this.screenshotGroup_);
  Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.RECT, { width: this.SCREENSHOT_WIDTH_, height: this.SCREENSHOT_HEIGHT_ }, clip);
  var image = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.IMAGE, {
    width: Blockly.VITTA_SPRITE.width,
    height: Blockly.VITTA_SPRITE.height,
    x: -60,
    y: -60,
    "clip-path": "url(#blocklyScreenshotClipPath" + rnd + ")"
  }, this.screenshotGroup_);
  image.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", this.vittaGet_("workspace").options.pathToMedia + Blockly.VITTA_SPRITE.url);
  this.onScreenshotWrapper_ = Blockly.browserEvents.conditionalBind(this.screenshotGroup_, "mousedown", null, this.screenshot_.bind(this));
};

Blockly.ZoomControls.prototype.screenshot_ = function (e) {
  this.vittaGet_("workspace").markFocused();
  this.workspaceToSvg_(function (dataUri) {
    var link = document.createElement("a");
    var now = new Date();
    var name = "blocks_screenshot_" + ["_", now.getFullYear(), now.getMonth(), now.getDate(), "_", now.getHours(), now.getMinutes(), now.getSeconds()].join("");
    link.download = name + ".png";
    link.target = "_self";
    link.href = dataUri;
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
  var fireZoomEvent = this.fireZoomEvent_ || this.fireZoomEvent;
  if (fireZoomEvent) {
    fireZoomEvent.call(this);
  } else {
    // Blockly 13 moved fireZoomEvent to the zoom buttons: same click event.
    Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.CLICK))(null, this.vittaGet_("workspace").id, "zoom_controls"));
  }
  Blockly.Touch.clearTouchIdentifier();
  e.stopPropagation();
  e.preventDefault();
};

Blockly.ZoomControls.prototype.workspaceToSvg_ = async function (e, t) {
  async function fetchImageAsBase64Url(imageUrl) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imageUrl, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        const bytes = new Uint8Array(xhr.response);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve('data:image/png;base64,' + btoa(binary));
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.send();
    });
  }

  const textareas = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].textContent = textareas[i].value;
  }

  const boundingBox = this.vittaGet_("workspace").getBlocksBoundingBox();
  const x = boundingBox.x || boundingBox.left;
  const y = boundingBox.y || boundingBox.top;
  const width = boundingBox.width || boundingBox.right - x;
  const height = boundingBox.height || boundingBox.bottom - y;

  const canvas = this.vittaGet_("workspace").getCanvas().cloneNode(true);
  canvas.removeAttribute('transform');

  const images = canvas.getElementsByTagName('image');
  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i].getAttribute('xlink:href');
    if (imageUrl && !imageUrl.startsWith('data:image')) {
      console.log(`href ${imageUrl}`);
      let base64Url = '';
      try {
        base64Url = await fetchImageAsBase64Url(imageUrl);
        console.log(base64Url);
      } catch (error) {
        console.error(error);
      }
      canvas.getElementsByTagName('image')[i].setAttribute('xlink:href', base64Url);
    }
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.appendChild(canvas);
  svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  svg.setAttribute(
    'class',
    `blocklySvg ${this.vittaGet_("workspace").options.renderer || 'geras'}-renderer ${
      this.vittaGet_("workspace").getTheme ? this.vittaGet_("workspace").getTheme().name + '-theme' : ''
    }`
  );
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('style', 'background-color: transparent');

  const css = [].slice
    .call(document.head.querySelectorAll('style'))
    .filter(function (style) {
      // Since Blockly 13 the renderer styles are injected without an id.
      return /\.blockly[A-Z]/.test(style.textContent) || style.id.startsWith('blockly-');
    })
    .map(function (style) {
      return style.innerText;
    })
    .join('\n');

  const style = document.createElement('style');
  style.innerHTML = css + '\n' + t;
  svg.insertBefore(style, svg.firstChild);

  // replace all xlinks:href by simple hrefs
  svg.querySelectorAll('*').forEach((element) => {
    // Check if the element has an xlink:href attribute
    if (element.hasAttribute('xlink:href')) {
      // Get the value of the xlink:href attribute
      const xlinkHref = element.getAttribute('xlink:href');
  
      // Set the href attribute to the value of the xlink:href attribute
      element.setAttribute('href', xlinkHref);
  
      // Remove the xlink:href attribute
      element.removeAttribute('xlink:href');
    }
  });

  // import both components and high-contrast and add its raw contents to the SVG as a <style> element
  // check if #hc-css-stylesheet is enabled before applying this, or if it doesn't exist check the localStorage contrast value for "high"
  if ((document.getElementById('hc-css-stylesheet') && !document.getElementById('hc-css-stylesheet').disabled) || localStorage.getItem('contrast') === 'high') {

    const cssFiles = [
      `${CDN_PATH}/public/css/components.css`,
      `${CDN_PATH}/public/css/high-contrast.css`
    ];
    let cssText = "";

    for (let i = 0; i < cssFiles.length; i++) {
      // fetch contents of css file and add it to cssText
      const response = await fetch(cssFiles[i]);

      if (response.ok) {
        const css = await response.text();
        cssText += css;
      }

    };

    const fetchedStyle = document.createElement('style');
    fetchedStyle.innerHTML = cssText;
    canvas.appendChild(fetchedStyle);

    // check the current theme- and contrast classes on the html and add them to the svg
    const htmlClasses = document.documentElement.classList;
    let classesToAdd = '';
      
    // Check for classes starting with 'theme-' and add them to the string
    for (const className of htmlClasses) {
      if (className.startsWith('theme-')) {
        classesToAdd += ` ${className}`;
      }
    }

    // trim the classes
    classesToAdd = classesToAdd.trim();

    // add the accumulated classes to the classlist of the svg
    svg.classList.add(classesToAdd);
  }

  const svgString = new XMLSerializer().serializeToString(svg);
  const svgDataUri = 'data:image/svg+xml,' + encodeURIComponent(svgString.replace(/&nbsp/g, '&#160'));
  console.log(svg)
  this.svgToPng_(svgDataUri, width, height, e);
};

Blockly.ZoomControls.prototype.svgToPng_ = function (data, width, height, callback) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var img = new Image();
  canvas.width = 10 * width;
  canvas.height = 10 * height;
  img.onload = function () {
    context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    try {
      callback(canvas.toDataURL("image/png"));
    } catch (err) {
      console.warn("Error converting the workspace svg to a png");
      callback("");
    }
  };
  img.src = data;
};

// --- FieldCheckboxColor: checkbox drawn as a coloured square ---
// options: {color, height, width, reverseColors, margin}
Blockly.FieldCheckboxColor = class extends Blockly.Field {
  constructor(value, options, validator, config) {
    super(value, validator, config);
    options = options || {};
    this.color_ = options.color !== undefined ? options.color : null;
    this.height_ = options.height !== undefined ? options.height : null;
    this.width_ = options.width !== undefined ? options.width : null;
    this.reverseColors_ = options.reverseColors !== undefined ? options.reverseColors : false;
    this.margin_ = options.margin !== undefined ? options.margin : 0;
    // Blockly >= 8 sets these on the instance in the Field constructor.
    this.SERIALIZABLE = true;
    this.CURSOR = "default";
  }

  static fromJson(options) {
    return new this(options.checked, undefined, options);
  }

  fill_() {
    if (this.reverseColors_) {
      return this.value_ ? this.color_ : "black";
    }
    return this.value_ ? (this.color_ || this.DEFAULT_COLOR) : "white";
  }

  initView() {
    super.initView();
    this.borderRect_.style.fill = this.fill_();
    // Click toggles the LED; holding the left button down paints the hovered LEDs of the same block with the
    // value of the first one (drawing or erasing), in a single undo step
    this.fieldGroup_.addEventListener("pointerdown", (e) => {
      const block = this.getSourceBlock();
      if (e.button !== 0 || !block || block.isInFlyout || !block.isEditable()) return;
      // No Blockly gesture (block drag, field click toggle): this listener is added before Field.bindEvents_
      // on the same element (the field click target), so it runs first and can stop Blockly's one
      e.stopImmediatePropagation();
      e.preventDefault();
      if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId); // touch: let pointerenter reach the other LEDs
      }
      Blockly.Events.setGroup(true);
      Blockly.FieldCheckboxColor.painting_ = { block: block, value: !this.value_ };
      this.setValue(!this.value_);
    });
    this.fieldGroup_.addEventListener("pointerenter", () => {
      const painting = Blockly.FieldCheckboxColor.painting_;
      if (painting && painting.block === this.getSourceBlock()) {
        this.setValue(painting.value);
      }
    });
  }

  render_() {
    this.size_.height = this.height_ || this.DEFAULT_SIZE;
    this.size_.width = this.width_ || this.DEFAULT_SIZE;
    this.borderRect_.setAttribute("width", this.size_.width);
    this.borderRect_.setAttribute("height", this.size_.height);
    this.borderRect_.setAttribute("rx", 8);
    this.borderRect_.setAttribute("ry", 4);
    this.size_.width -= this.margin_;
    if (this.fieldGroup_) {
      this.fieldGroup_.setAttribute("transform", "translate(0, -" + this.margin_ + ")");
    }
    // Réduire la hauteur déclarée pour que Blockly resserre les lignes
    this.size_.height -= this.margin_ * 2;
  }

  showEditor_() {
    this.setValue(!this.value_);
  }

  doClassValidation_(value) {
    if (value === true || value === "TRUE") {
      return "TRUE";
    }
    if (value === false || value === "FALSE") {
      return "FALSE";
    }
    return null;
  }

  doValueUpdate_(value) {
    this.value_ = this.convertValueToBool_(value);
    if (this.textElement_) {
      this.textElement_.style.display = this.value_ ? "block" : "none";
    }
    if (this.borderRect_) {
      this.borderRect_.style.fill = this.fill_();
    }
  }

  getValue() {
    return this.value_ ? "TRUE" : "FALSE";
  }

  convertValueToBool_(value) {
    return typeof value === "string" ? value === "TRUE" : !!value;
  }
};
Blockly.FieldCheckboxColor.prototype.DEFAULT_VALUE = false;
Blockly.FieldCheckboxColor.prototype.DEFAULT_COLOR = "rgb(250,15,15)";
// End of a LED painting stroke (see FieldCheckboxColor.initView)
Blockly.FieldCheckboxColor.painting_ = null;
document.addEventListener("pointerup", () => {
  if (Blockly.FieldCheckboxColor.painting_) {
    Blockly.FieldCheckboxColor.painting_ = null;
    Blockly.Events.setGroup(false);
  }
});
Blockly.FieldCheckboxColor.prototype.DEFAULT_SIZE = 30;
Blockly.fieldRegistry.register("field_checkbox_color", Blockly.FieldCheckboxColor);

// --- FieldColourCustom: colour field drawn as a square of the chosen size ---
// options: {height, width, stopPropagation}
Blockly.FieldColourCustom = class extends Blockly.FieldColour {
  constructor(value, options, validator) {
    super(value, validator);
    options = options || {};
    this.height_ = options.height;
    this.width_ = options.width;
    this.stopPropagation_ = options.stopPropagation || false;
    this.SERIALIZABLE = true;
    this.CURSOR = "default";
  }

  static fromJson(options) {
    return new this(options.colour, undefined, options);
  }

  initView() {
    this.size_ = new Blockly.utils.Size(this.width_ || this.DEFAULT_SIZE, this.height_ || this.DEFAULT_SIZE);
    this.createBorderRect_();
    this.borderRect_.style.fillOpacity = "1";
  }

  render_() {
    this.size_.height = this.height_ || this.DEFAULT_SIZE;
    this.size_.width = this.width_ || this.DEFAULT_SIZE;
    this.borderRect_.setAttribute("width", this.size_.width);
    this.borderRect_.setAttribute("height", this.size_.height);
    this.borderRect_.setAttribute("rx", 4);
    this.borderRect_.setAttribute("ry", 4);
  }

  applyColour() {
    if (this.borderRect_) {
      this.borderRect_.style.fill = this.getValue();
    }
  }

  doValueUpdate_(value) {
    this.value_ = value;
    if (this.borderRect_) {
      this.borderRect_.style.fill = value;
    }
  }

  showEditor_() {
    if (this.stopPropagation_) {
      return;
    }
    super.showEditor_();
  }
};
Blockly.FieldColourCustom.prototype.DEFAULT_SIZE = 24;
Blockly.fieldRegistry.register("field_colour_custom", Blockly.FieldColourCustom);

// --- FieldDate: ISO date (YYYY-MM-DD) edited with the browser date picker ---
// Replaces the @blockly/field-date plugin, whose Blockly 7 build cannot extend Blockly 8 classes.
Blockly.FieldDate = class extends Blockly.FieldTextInput {
  constructor(value, validator, config) {
    super(value, validator, config);
    this.SERIALIZABLE = true;
  }

  static fromJson(options) {
    return new this(options.date, undefined, options);
  }

  doClassValidation_(value) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    if (!match) {
      return null;
    }
    var date = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3]));
    return date.getUTCMonth() === +match[2] - 1 && date.getUTCDate() === +match[3] ? value : null;
  }

  widgetCreate_() {
    var input = super.widgetCreate_();
    input.type = "date";
    return input;
  }
};
Blockly.FieldDate.prototype.DEFAULT_VALUE = new Date().toISOString().slice(0, 10);
Blockly.fieldRegistry.register("field_date", Blockly.FieldDate);

// --- Built-in themes ---
// The interfaces define their own "dark" theme, which clashes with the one shipped
// by the Blockly 6 core ("Name "dark" with type "theme" already registered").
['Dark', 'Deuteranopia', 'HighContrast', 'Tritanopia'].forEach(function (name) {
  if (Blockly.Themes[name]) {
    Blockly.registry.unregister(Blockly.registry.Type.THEME, Blockly.Themes[name].name);
    delete Blockly.Themes[name];
  }
});

// --- Dropdowns usable in the toolbox ---
// By default, fields of the blocks shown in an auto-closing flyout (category toolbox)
// are not clickable. Dropdowns can be opened directly in the toolbox, the chosen option
// is kept when the block is dragged to the workspace.
Blockly.FieldDropdown.prototype.isClickableInFlyout = function () {
  return true;
};

// --- Disabled blocks keep the colour of their category ---
// Blockly fills disabled blocks with a grey hatched pattern (blocklyDisabledPattern), so the category of the
// block can't be recognised anymore: only the blocklyDisabled class is kept, styled in main.css.
Blockly.blockRendering.PathObject.prototype.updateDisabled_ = function (disabled) {
  this.setClass_('blocklyDisabled', disabled);
};

// --- Blockly dialogs (prompt, confirm, alert) displayed as Vittascience modals ---
// Used for example to create or rename a variable, or to confirm the deletion of blocks.
(function () {
  const translate = (key, fallback) => {
    if (typeof i18next !== 'undefined' && i18next.exists && i18next.exists(key)) return i18next.t(key);
    return fallback;
  };
  let closeOpenedDialog = null;

  /**
   * Open a modal and give the result to done: the input value (or true) if confirmed, null if cancelled.
   */
  const openDialog = function (options, done) {
    if (closeOpenedDialog) closeOpenedDialog(null);

    const modal = document.createElement('div');
    modal.className = 'vitta-modal vitta-modal-warning blockly-vitta-dialog';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    const header = document.createElement('div');
    header.className = 'vitta-modal-header';
    const title = document.createElement('span');
    title.className = 'vitta-modal-title';
    const icon = document.createElement('i');
    icon.className = options.icon;
    const titleText = document.createElement('span');
    titleText.textContent = options.title;
    title.append(icon, titleText);
    const exitButton = document.createElement('button');
    exitButton.type = 'button';
    exitButton.className = 'vitta-modal-exit-btn vitta-button btn';
    exitButton.innerHTML = '<i class="fa fa-times"></i>';
    header.append(title, exitButton);

    const content = document.createElement('div');
    content.className = 'vitta-modal-content';
    if (options.message) {
      const message = document.createElement('p');
      message.className = 'blockly-vitta-dialog-message';
      message.textContent = options.message;
      content.appendChild(message);
    }
    let input = null;
    if (options.input) {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.value = options.defaultValue || '';
      input.setAttribute('aria-label', options.title);
      content.appendChild(input);
    }

    const footer = document.createElement('div');
    footer.className = 'vitta-modal-footer';
    const buttons = document.createElement('div');
    buttons.className = 'modal-footer-div';
    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.className = 'btn v-btn';
    confirmButton.style.flex = '1';
    confirmButton.textContent = translate('modals.standard.codeOnly.confirm', 'OK');
    buttons.appendChild(confirmButton);
    if (options.cancel) {
      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.className = 'btn v-btn-basic ms-1';
      cancelButton.style.flex = '1';
      cancelButton.textContent = translate('modals.standard.codeOnly.cancel', 'Cancel');
      cancelButton.addEventListener('click', () => close(null));
      buttons.appendChild(cancelButton);
    }
    footer.appendChild(buttons);
    modal.append(header, content, footer);

    const close = function (result) {
      modal.remove();
      document.removeEventListener('keydown', onKeyDown, true);
      closeOpenedDialog = null;
      done(result);
    };
    const confirm = () => close(input ? input.value : true);
    const onKeyDown = function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        confirm();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        close(null);
      }
    };
    confirmButton.addEventListener('click', confirm);
    exitButton.addEventListener('click', () => close(options.cancel ? null : true));
    document.addEventListener('keydown', onKeyDown, true);
    closeOpenedDialog = close;

    document.body.appendChild(modal);
    modal.style.display = 'block';
    modal.style.zIndex = 3000;
    (input || confirmButton).focus();
    if (input) input.select();
  };

  Blockly.dialog.setPrompt(function (message, defaultValue, callback) {
    openDialog({ title: message, icon: 'fas fa-pen', input: true, defaultValue, cancel: true }, (result) => callback(result));
  });

  Blockly.dialog.setConfirm(function (message, callback) {
    openDialog({ title: translate('modals.warning.default.title', 'Warning!'), icon: 'fa fa-exclamation-circle', message, cancel: true }, (result) => callback(result !== null));
  });

  Blockly.dialog.setAlert(function (message, callback) {
    openDialog({ title: translate('modals.warning.default.title', 'Warning!'), icon: 'fa fa-exclamation-circle', message, cancel: false }, () => callback && callback());
  });
})();
