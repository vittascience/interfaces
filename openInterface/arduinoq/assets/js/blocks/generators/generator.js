Blockly.Python.unoq = Object.create(null);

Blockly.Python.unoq.addImage = function (id, value) {
    if (Blockly.Python.uploadedImages_[id] === undefined) {
        Blockly.Python.uploadedImages_[id] = value;
    }
};