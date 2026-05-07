const ProjectsCleaner = {

  init: function (xmlStr) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("XML invalide");
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
          const valueN = Array.from(block.children).find(el => el.tagName === "value" && el.getAttribute("name") === "N");
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
    }
  }
}

