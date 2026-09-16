const ProjectsCleaner = {

  init: function (xmlStr) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      if (parseError) {
        console.error("XML invalide");
        return parser.parseFromString(CodeManager.getSharedInstance().getDefaultXmlStart(), "text/xml");
      }
    }
    return xmlDoc;
  },

  returnXml: function (xmlDoc) {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
  },

  DB: {

    'display_defineNeopixel': {
      targets: ['esp32', 'm5stack', 'galaxia', 'pico', 'l476'],
      handler: function (xmlStr) {
        const xmlDoc = ProjectsCleaner.init(xmlStr);
        const blocks = xmlDoc.querySelectorAll('block[type="display_defineNeopixel"]');

        blocks.forEach(block => {
          const valueN = Array.from(block.children).find(el =>
            el.tagName === "value" && el.getAttribute("name") === "N"
          );
          if (!valueN) return;
          const numField = valueN.querySelector('field[name="NUM"]');
          const numValue = numField ? numField.textContent.trim() : "20";
          const newField = xmlDoc.createElement("field");
          newField.setAttribute("name", "N");
          newField.textContent = numValue;
          block.replaceChild(newField, valueN);
        });
        return ProjectsCleaner.returnXml(xmlDoc);
      }
    },

    'text_changeCase': {
      targets: ['arduino', 'mBot', 'letsstartcoding'],
      handler: function (xmlStr) {
        const xmlDoc = ProjectsCleaner.init(xmlStr);
        const blocks = Array.from(xmlDoc.querySelectorAll('block[type="text_changeCase"]'));
        blocks.forEach(block => {
          if (block.parentElement && block.parentElement.tagName === "value") {
            return;
          }
          let variableName = "upperedText";
          const textValue = Array.from(block.children).find(el => el.tagName === "value" && el.getAttribute("name") === "TEXT");
          if (textValue) {
            const variableGet = Array.from(textValue.children).find(el => el.tagName === "block" && el.getAttribute("type") === "variables_get");
            if (variableGet) {
              const variableField = Array.from(variableGet.children).find(el => el.tagName === "field" && el.getAttribute("name") === "VAR");
              if (variableField && variableField.textContent.trim()) {
                variableName = variableField.textContent.trim();
              }
            }
          }
          const originalNext = Array.from(block.children).find(el => el.tagName === "next");
          if (originalNext) {
            block.removeChild(originalNext);
          }
          const variablesSet = xmlDoc.createElement("block");
          variablesSet.setAttribute("type", "variables_set");
          variablesSet.setAttribute("id", block.getAttribute("id") || Blockly.utils.idGenerator.genUid());
          const fieldVar = xmlDoc.createElement("field");
          fieldVar.setAttribute("name", "VAR");
          fieldVar.textContent = variableName;
          const value = xmlDoc.createElement("value");
          value.setAttribute("name", "VALUE");
          value.appendChild(block.cloneNode(true));
          variablesSet.appendChild(fieldVar);
          variablesSet.appendChild(value);
          if (originalNext) {
            variablesSet.appendChild(originalNext);
          }
          block.parentNode.replaceChild(variablesSet, block);
        });
        return ProjectsCleaner.returnXml(xmlDoc);
      }
    },

    'lists_length': {
      targets: ['arduino', 'mBot', 'letsstartcoding'],
      handler: function (xmlStr) {
        const xmlDoc = ProjectsCleaner.init(xmlStr);
        const blocks = Array.from(xmlDoc.querySelectorAll('block[type="lists_length"]'));
        blocks.forEach(block => {
          const valueInput = Array.from(block.children).find(el =>
            el.tagName === "value" && el.getAttribute("name") === "LIST"
          );
          if (valueInput) {
            const newValue = xmlDoc.createElement("value");
            newValue.setAttribute("name", "VALUE");
            Array.from(valueInput.childNodes).forEach(child => newValue.appendChild(child));
            block.replaceChild(newValue, valueInput);
          }
        });

        return ProjectsCleaner.returnXml(xmlDoc);
      }
    },

    'lists_getIndex': {
      targets: ['arduino', 'mBot', 'letsstartcoding'],
      handler: function (xmlStr) {
        const xmlDoc = ProjectsCleaner.init(xmlStr);
        const blocks = Array.from(xmlDoc.querySelectorAll('block[type="lists_getIndex"]'));
        blocks.forEach(block => {
          const valueInput = Array.from(block.children).find(el =>
            el.tagName === "value" && el.getAttribute("name") === "LIST"
          );
          if (valueInput) {
            const newValue = xmlDoc.createElement("value");
            newValue.setAttribute("name", "VALUE");
            Array.from(valueInput.childNodes).forEach(child => newValue.appendChild(child));
            block.replaceChild(newValue, valueInput);
          }
        });

        return ProjectsCleaner.returnXml(xmlDoc);
      }
    }
  }
}