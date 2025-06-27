var SerialAPI = {
    output: new Array(),
    activatePort: false,
    serial: {
        port: undefined,
        reader: undefined,
        writer: undefined,
    },
    isConnected: false,
    isClosing: false,
    avrgirl: false

}

SerialAPI.checkArduinoCreateAgent = function () {
    /*     if (Vittarduino.IS_FIREFOX) {
            if ($('#waiting-dots').html() == '...') {
                $('#waiting-dots').html('')
            } else {
                $('#waiting-dots').html($('#waiting-dots').html() + '.')
            } */
    init_plugin();
    checkPort();
    /*    setTimeout(SerialAPI.checkArduinoCreateAgent, 1000)
    } */
};

$(document).ready(function () {
    writeConsole("Bienvenue sur l'interface Vittascience pour Arduino !\n", "success");
    Vittarduino.IS_FIREFOX = /Firefox/.test(navigator.userAgent)
    if (Vittarduino.IS_FIREFOX) {
        writeConsole("code.webUsb.pluginSearch")
        SerialAPI.checkArduinoCreateAgent();
    }
})
$('body').on("click", "#serial-close", function (e) {
    if (SerialAPI.isConnected) {
        SerialAPI.disconnect();
    } else {
        SerialAPI.connectCard()
    }
    e.stopPropagation();
})

/* function downloadArduinoCode() {
    if (SerialAPI.isConnected) {
        flashMyBoard()
    } else {
        SerialAPI.connectCard();
        flashMyBoard()
    }
}; */

SerialAPI.disconnect = async function () {
    if (this.serial.reader) {
        await this.serial.reader.cancel().catch(reason => {
            console.log(reason)
        });
        this.serial.reader = null;
    }

    if (this.outputStream) {
        await this.outputStream.getWriter().close().catch(reason => {
            console.log(reason)
        });
        this.outputStream = null;
    }

    await this.serial.port.close().catch(reason => {
        console.log(reason)
    });
    this.serial.port = null;
    if (this.isConnected) {
        this.isConnected = false;
        writeConsole("Vous vous êtes déconnecté\n", "success");
        this.toggleConnectUI(false)
    }
};

SerialAPI.toggleConnectUI = function (connected = false) {
    if (connected == false) {
        $('#serial-close').html("Connecter")
        $('#serial-close').css('background-color', 'var(--vitta-green)')
    } else {
        $('#serial-close').html("Déconnecter")
        $('#serial-close').css('background-color', 'var(--vitta-red)')
    }
};


SerialAPI.connectCard = async function () {
    this.isClosing = false;
    this.activatePort = false;
    let tab = new Array();
    let index = 1;
    try {
        this.serial.port = await navigator.serial.requestPort();
    } catch (e) {
        writeConsole("L'accès à la carte a été refusé.\n", "warning");
    }
    await this.serial.port.open({
        baudRate: Number($('#baud').val())
    });
    this.isConnected = true;
    writeConsole("Votre carte est connectée.\n", "success");
    this.toggleConnectUI(true)

    const decoder = new TextDecoder();
    const write = (str) => {
        this.serial.writer = this.serial.port.writable.getWriter()
        this.serial.writer.write(new TextEncoder('utf-8').encode(str + '\n'))
        writeConsole("Message " + str + " envoyé à la carte.\n", "neutral");
        this.serial.writer.releaseLock();
    }
    $('body').on("click", "#serial-send", function (e) {
        write($('#serial-input').val());
        e.stopPropagation();
        $('#serial-input').val("");
    })
    $('body').on("keypress", "body", function (e) {
        if ($('#serial-input').hasFocus() && e.keyCode === 13)
            write(('#serial-input').val());
    })
    while (this.serial.port.readable) {
        this.serial.reader = this.serial.port.readable.getReader();
        while (this.isClosing == false) {
            let value, done;
            try {
                ({
                    value,
                    done
                } = await this.serial.reader.read());
            } catch (error) {
                console.log(error)
                break;
            }
            if (done) {
                this.serial.reader.releaseLock();
                console.log("closing reader")
                break;
            }
            var textDecoder = new TextDecoder("utf-8");
            let t = Object.keys(value).map(k => {
                return value[k]
            });
            tab = tab.concat(t);
            output = textDecoder.decode(new Uint8Array(tab).buffer).split('\n')
            if (output.length > index) {
                for (let j = index - 1; j < output.length - 1; j++) {
                    let text = output[j]
                    if (text.match(/Port série activé. Baudrate/)) {
                        this.activatePort = true
                    }
                    index++;
                    if (this.activatePort) {
                        writeConsole(text, "neutral");
                        if (text.match(/^@music:/) && $('#audio-switch').append("On")) {
                            let note = text.replace("@music:", "");
                            note = note.replace("|", "");
                            playMusic(note)
                        } else if (text.match(/^@Graph:/)) {
                            let parsedArray = parseMessage(text)
                            if (parsedArray) {
                                TIMEOUT = 50;
                                updateChart(parsedArray);
                                prepareToApi(parsedArray);
                                parser_message = "";
                            }
                        }
                    }
                }

            }
        }
        break;
    }
    SerialAPI.disconnect()
}
async function flashMyBoard() {
    // get .hex buffer
    compileCode(true).then(function (response) {
        const data = new Blob([response])
        readFileAsync(data).then(function (fileData) {

            SerialAPI.avrgirl = new AvrgirlArduino({
                board: $('#board-select').val(),
                debug: true
            });
            console.log(SerialAPI.avrgirl.board)
            SerialAPI.avrgirl.flash(fileData, (error) => {
                SerialAPI.serial.port = SerialAPI.avrgirl.connection.serialPort.port
                SerialAPI.serial.reader = SerialAPI.avrgirl.connection.serialPort.reader
                SerialAPI.serial.writer = SerialAPI.avrgirl.connection.serialPort.writer
                SerialAPI.serial.writer.releaseLock();
                SerialAPI.isConnected = true;
                SerialAPI.disconnect();

                if (error) {
                    console.error(error);
                } else {
                    console.info('done correctly.');
                }
            });
        });
    })
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
    })
}