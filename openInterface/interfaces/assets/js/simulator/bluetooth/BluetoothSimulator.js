const BluetoothSimulator = {

    sendBluetoothData: function (buffer) {
        const data = {
            'timestamp': Date.now(),
            'content': buffer
        };
        const multiEditorLS = localStorage.getItem('multiEditor');
        if (multiEditorLS) {
            const multiEditor = JSON.parse(multiEditorLS);
            const editor = multiEditor[INTERFACE_NAME][VittaInterface.id]
            editor.dateUpdated = Math.floor(new Date() / 1000);
            if (editor.bluetooth) {
                editor.bluetooth['_tx_buffer'].push(data);
            } else {
                editor.bluetooth = {
                    '_tx_buffer': [data]
                };
            }
            multiEditor[INTERFACE_NAME][VittaInterface.id] = editor;
            localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
        } else {
            InterfaceMonitor.writeConsole("BLE Error: no service");
        }
    },

    checkBluetoothData: function (command, modId, isForString) {
        const multiEditorLS = localStorage.getItem('multiEditor');
        if (multiEditorLS) {
            const multiEditor = JSON.parse(multiEditorLS);
            const mutiEditorInterface = multiEditor[INTERFACE_NAME];
            var validEditors = [];
            for (var id in mutiEditorInterface) {
                if (mutiEditorInterface[id].dateUpdated && mutiEditorInterface[id].bluetooth) {
                    validEditors.push({
                        "id": id,
                        "dateUpdated": mutiEditorInterface[id].dateUpdated,
                        "bluetooth": mutiEditorInterface[id].bluetooth
                    });
                }
            }
            const editor = validEditors.sort(function (a, b) {
                return b.dateUpdated - a.dateUpdated;
            })[0];
            if (editor !== undefined) {
                if (command == 'read') {
                    const data = this.readBluetoothData(multiEditor, editor, isForString);
                    if (data) {
                        if (isForString) {
                            Simulator.setAnimator(Simulator.getModuleByKey(modId.split('_')[0]), modId, command + 'String');
                        } else {
                            Simulator.setAnimator(Simulator.getModuleByKey(modId.split('_')[0]), modId, command);
                        }
                        return data;
                    } else {
                        return -1;
                    }
                } else if (command == 'available') {
                    const buffer = editor.bluetooth._tx_buffer;
                    if (buffer && buffer.length) {
                        const len = buffer.map((data) => data.content).join('').length;
                        Simulator.setAnimator(Simulator.getModuleByKey(modId.split('_')[0]), modId, command + ':' + len);
                        return len;
                    }
                    return 0;
                } else if (command == 'flush') {
                    Simulator.setAnimator(Simulator.getModuleByKey(modId.split('_')[0]), modId, command);
                    this.flushBluetoothData(multiEditor, editor);
                }
            }
        } else {
            InterfaceMonitor.writeConsole("Bluetooth Error: no service");
        }
        if (command == 'read') {
            return -1;
        } else if (command == 'available') {
            return 0;
        }
    },

    readBluetoothData: function (multiEditor, editor, isForString) {
        if (editor.bluetooth._tx_buffer) {
            multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
            let dataArray = editor.bluetooth._tx_buffer;
            if (dataArray) {
                if (isForString) {
                    multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                        '_tx_buffer': new Array()
                    };
                    localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    return dataArray.map((data) => data.content).join('');
                } else {
                    const firstData = dataArray[0].content;
                    if (firstData.length > 0) {
                        const charToRead = firstData[0];
                        if (firstData.length > 1) {
                            dataArray[0] = {
                                timestamp: Date.now(),
                                content: firstData.slice(1)
                            };
                        } else if (firstData.length == 1) {
                            dataArray = dataArray.slice(1);
                        }
                        multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                            '_tx_buffer': dataArray
                        };
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        return charToRead.charCodeAt(0);
                    }
                }
            }
        }
    },

    flushBluetoothData: function (multiEditor, editor) {
        if (editor.bluetooth._tx_buffer) {
            multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
            multiEditor[INTERFACE_NAME][editor.id].bluetooth = {
                '_tx_buffer': new Array()
            };
            localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
        }
    }

}