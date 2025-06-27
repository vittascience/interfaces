function parseMessage(message) {
    message = message.trim();
    if (message.match(/:(@Graph:.+)/g)) {
        message = '@Graph:' + message.split('@Graph:')[1];
    }
    if (!message.match(/(@Graph:.+)/g))
        return;
    message = message.substr(7, message.length);
    let fullValues = message.split("|");
    let columnNames = [];
    let columnValues = [];
    columnNames.push("Temps (Graphique)");
    columnValues.push(new Date());
    let validDataLength = 0;
    for (let i = 0; i < fullValues.length; i++) {
        if (fullValues[i].indexOf(':') != -1) {
            //classic key:value;
        } else if (!isNaN(fullValues[i]) && fullValues[i] !== '') {
            fullValues[i] = 'data' + (fullValues.indexOf(fullValues[i]) + 1) + ':' + fullValues[i];
        }
        let split = fullValues[i].split(":");
        if (split && split[0] !== undefined && split[1] !== undefined) {
            if (split.length === 2) {
                let value = split[1].trim()
                value = (value == "True" || value == "true") ? "1" : value
                value = (value == "False" || value == "false") ? "0" : value
                value = parseFloat(value);
                if (!isNaN(value)) {
                    if (!columnNames.includes(split[0].trim())) {
                        validDataLength++;
                        columnNames.push(split[0].trim());
                        columnValues.push(value);
                    }
                }
            }
        }
    }
    if (validDataLength === 0) {
        return false;
    }
    let dataArray = [];
    for (let i = 0; i < validDataLength + 1; i++) {
        dataArray.push([columnNames[i], columnValues[i]]);
    }
    return dataArray;
}