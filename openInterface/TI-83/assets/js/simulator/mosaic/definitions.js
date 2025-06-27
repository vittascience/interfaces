Simulator.Mosaic.HEADER_INNOVATOR_HUB =
    `<div id="board-viewer" class="mt-3 ti-board-viewer">
    <div id="ih_greenLed" class="ih_greenLed_anim"></div>
    <div id="ih_redLed"></div>
    <div id="ih_rgbLed"></div>
</div>`;

Simulator.Mosaic.HEADER_MICROBIT =
    `<div id="board-viewer" class="mt-3 ti-board-viewer">
    <div id="mb_btn_A" class="mb_btn"></div>
    <div id="mb_btn_B" class="mb_btn"></div>
    <div id="mb_broche_0" class="broche" ></div>
    <div id="mb_broche_1" class="broche"></div>
    <div id="mb_broche_2" class="broche"></div>
    <div id="mb_logo" class="logo mb_logo_base"></div>
</div>`;

Simulator.Mosaic.PIN_REGEXP_INNOVATOR_HUB = /(((IN|OUT)|BB) [0-9]{1,2})/;
Simulator.Mosaic.PIN_REGEXP_MICROBIT = /pin[0-9]{1,2}/;
Simulator.Mosaic.pin_regex = Simulator.Mosaic.PIN_REGEXP_MICROBIT;

Simulator.Mosaic.GETPINDEF_INNOVATOR_HUB = (pin, mod) => {
    return {
        name: pin,
        id: pin.replace(' ', '').toLowerCase()
    };
};
Simulator.Mosaic.GETPINDEF_MICROBIT = (pin, mod) => {
    return {
        name: pin.replace("pin", 'P'),
        id: pin.replace("pin", 'P')
    };
};
Simulator.Mosaic.getPinDef = Simulator.Mosaic.GETPINDEF_MICROBIT;

Simulator.Mosaic.getCurrentBoard = function () {
    const mb_regExp = /(from microbit import *|import microbit( as (mb|uBit)|))/;
    const ih_regExp = /(from ti_(rover|hub) import *|import ti_(rover|hub)( as rv|))/;

    if (Simulator.code.match(mb_regExp) && !Simulator.code.match(ih_regExp)) {
        return 'microbit';
    } else if (!Simulator.code.match(mb_regExp) && Simulator.code.match(ih_regExp)) {
        return 'hub';
    } else if (Simulator.code.match(mb_regExp) && Simulator.code.match(ih_regExp)) {
        return 'error';
    } else {
        return null;
    }
};

Simulator.Mosaic.manageCompatibleTIboards = function (replaying = false) {
    const innovatorhub = "TI-Innovator™ Hub";
    const microbit = "BBC micro:bit";
    const setHub = () => {
        $('#title-board').text(innovatorhub);
        $('#board-container').html(this.HEADER_INNOVATOR_HUB);
        $('#board-viewer').css('background-image', "url('/openInterface/TI-83/assets/media/simulator/innovatorhub/Innovator_Hub.svg')");
        this.pin_regex = this.PIN_REGEXP_INNOVATOR_HUB;
        this.getPinDef = this.GETPINDEF_INNOVATOR_HUB;
        Simulator.board = {
            "link": null,
            "name": innovatorhub
        };
    };
    const setMicrobit = () => {
        $('#title-board').text(microbit);
        $('#board-container').html(this.HEADER_MICROBIT);
        $('#board-viewer').css('background-image', "url('/openInterface/TI-83/assets/media/simulator/microbit/Carte micro-bit V2.png')");
        this.pin_regex = this.PIN_REGEXP_MICROBIT;
        this.getPinDef = this.GETPINDEF_MICROBIT;
        Simulator.board = {
            "link": null,
            "name": microbit
        };
    };
    if ($("#boardHeader").is(":visible") && !replaying) {
        if (Simulator.Mosaic.getCurrentBoard() == 'microbit' && $("#title-board").text() == innovatorhub) {
            setMicrobit();
        } else if (Simulator.Mosaic.getCurrentBoard() == 'hub' && $("#title-board").text() == microbit) {
            setHub();
        } else if (Simulator.Mosaic.getCurrentBoard() === 'error') {
            // console.log("Stop and show modal")
            Simulator.stop();
            pseudoModal.openModal('modal-warning-ti-boards');
        } else if (Simulator.Mosaic.getCurrentBoard() === null) {
            $('#board-container').html("");
            $("#title-board").text("");
            $("#boardHeader").hide();
        }
    } else {
        if (Simulator.Mosaic.getCurrentBoard() == 'hub') {
            $("#boardHeader").show();
            setHub();
        }
        if (Simulator.Mosaic.getCurrentBoard() == 'microbit') {
            if ($("#boardHeader").is(":visible") && !replaying) {
                // console.log("Stop and show modal")
                Simulator.stop();
                pseudoModal.openModal('modal-warning-ti-boards');
            } else {
                $("#boardHeader").show();
                setMicrobit();
            }
        }
    }
};

Simulator.Mosaic.getCurrentRobot = function () {
    const rover_regExp = Robots['Rover'].CODE_REGEXP;
    const tello_regExp = Robots['Tello'].CODE_REGEXP;
    if (Simulator.code.match(rover_regExp) && !Simulator.code.match(tello_regExp)) {
        return 'Rover';
    } else if (!Simulator.code.match(rover_regExp) && Simulator.code.match(tello_regExp)) {
        return 'Tello';
    } else if (Simulator.code.match(rover_regExp) && Simulator.code.match(tello_regExp)) {
        return 'error';
    } else {
        return null;
    }
};

Simulator.Mosaic.externalLibraries = {
    /** TI-83 CE python simulator modules */
    'src/lib/ti_system.js': Simulator.PATH_LIB + 'ti83/ti_system.js',
    'src/lib/ti_plotlib.js': Simulator.PATH_LIB + 'ti83/ti_plotlib.js',
    'src/lib/time.js': Simulator.PATH_LIB + 'ti83/time.js',
    'src/lib/turtle.js': Simulator.PATH_LIB + 'ti83/turtle.js',
    'src/lib/tello.js': Simulator.PATH_LIB + 'ti83/tello.js',
    // ti_draw
    'src/lib/ti_draw.js': Simulator.PATH_LIB + 'ti83/ti_draw.js',
    /** TI-83 CE python modules of chart-turtle-quivr */
    'src/lib/ce_box.js': Simulator.PATH_LIB + 'ti83/ce/ce_box.js',
    'src/lib/ce_chart.js': Simulator.PATH_LIB + 'ti83/ce/ce_chart.js',
    'src/lib/ce_quivr.js': Simulator.PATH_LIB + 'ti83/ce/ce_quivr.js',
    /** TI-83 CE python modules for driving Innovator Hub*/
    'src/lib/ti_hub.js': Simulator.PATH_LIB + 'hub/ti_hub.js',
    'src/lib/ti_rover.js': Simulator.PATH_LIB + 'hub/ti_rover.js',
    'src/lib/brightns.js': Simulator.PATH_LIB + 'hub/brightns.js',
    'src/lib/color.js': Simulator.PATH_LIB + 'hub/color.js',
    'src/lib/light.js': Simulator.PATH_LIB + 'hub/light.js',
    'src/lib/sound.js': Simulator.PATH_LIB + 'hub/sound.js',
    /** TI-83 CE python modules of Innovator Hub pins */
    'src/lib/analogin.js': Simulator.PATH_LIB + 'hub/pins/analogin.js',
    'src/lib/analogout.js': Simulator.PATH_LIB + 'hub/pins/analogout.js',
    'src/lib/digital.js': Simulator.PATH_LIB + 'hub/pins/digital.js',
    'src/lib/squarewv.js': Simulator.PATH_LIB + 'hub/pins/squarewv.js',
    /** TI-83 CE python modules of Hub grove components */
    'src/lib/dht.js': Simulator.PATH_LIB + 'hub/grove/dht.js',
    'src/lib/led.js': Simulator.PATH_LIB + 'hub/grove/led.js',
    'src/lib/loudness.js': Simulator.PATH_LIB + 'hub/grove/loudness.js',
    'src/lib/moisture.js': Simulator.PATH_LIB + 'hub/grove/moisture.js',
    'src/lib/potentio.js': Simulator.PATH_LIB + 'hub/grove/potentio.js',
    'src/lib/ranger.js': Simulator.PATH_LIB + 'hub/grove/ranger.js',
    'src/lib/servo.js': Simulator.PATH_LIB + 'hub/grove/servo.js',
    'src/lib/temperat.js': Simulator.PATH_LIB + 'hub/grove/temperat.js',
    'src/lib/vibmotor.js': Simulator.PATH_LIB + 'hub/grove/vibmotor.js',
    'src/lib/relay.js': Simulator.PATH_LIB + 'hub/grove/relay.js',
    'src/lib/power.js': Simulator.PATH_LIB + 'hub/grove/power.js',
    /** TI-83 CE python modules of micro:bit board */
    'src/lib/microbit.js': Simulator.PATH_LIB + 'microbit/microbit.js',
    'src/lib/mb_sensr.js': Simulator.PATH_LIB + 'microbit/mb_sensr.js',
    'src/lib/mb_grove.js': Simulator.PATH_LIB + 'microbit/mb_grove.js',
    'src/lib/mb_music.js': Simulator.PATH_LIB + 'microbit/mb_music.js',
    'src/lib/mb_pins.js': Simulator.PATH_LIB + 'microbit/mb_pins.js',
    'src/lib/mb_neopx.js': Simulator.PATH_LIB + 'microbit/mb_neopx.js',
    'src/lib/mb_radio.js': Simulator.PATH_LIB + 'microbit/mb_radio.js',
};

Simulator.Mosaic.addSpecificInitializations = function () {
    $("body").on('mousedown', '.mb_btn', function () {
        $(this).addClass('mb_btn_effect');
    });
    $("body").on('mouseup', '.mb_btn', function () {
        $(this).removeClass('mb_btn_effect')
    });
};

Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": {
        'hub': /digital\(\"((IN|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /pin([0-9]{1,2}).read_digital\(\)/gi
    },
    // digital writers
    "write-digital": {
        'hub': /digital\(\"((OUT|BB) ([0-9]{1,2}))\"\)/g,
        'microbit': /pin([0-9]{1,2}).write_digital\(/g
    },
    // analog readers
    "read-analog": {
        'hub': /analog_in\(\"((IN|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /pin([0-9]{1,2}).read_analog\(\)/gi
    },
    // analog writers
    "write-analog": {
        'hub': /analog_out\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /pin([0-9]{1,2}).read_digital\(\)/gi
    },
    // pwm
    "pwm": {
        'hub': /squarewave\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
    },
    "ti-groveTemp": {
        'hub': /temperature\(\"((IN|BB) ([0-9]{1,2}))\"\)/g,
        'microbit': /grove\.read_temperature\(pin([0-9]{1,2})\)/gi,
    },
    "groveMoisture": {
        'hub': /moisture\(\"((IN|BB) ([0-9]{1,2}))\"\)/g,
        'microbit': /grove\.read_moisture\(pin([0-9]{1,2})\)/gi
    },
    "groveLight": {
        'hub': /lightlvl\(\"((IN|BB) ([0-9]{1,2}))\"\)/g,
        'microbit': /grove\.read_lightlevel\(pin([0-9]{1,2})\)/g
    },
    "servo": {
        'hub': /servo\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /ti_set_servo\(pin([0-9]{1,2})/gi
    },
    "relay": {
        'hub': /relay\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /grove\.relay\(pin([0-9]{1,2})/gi
    },
    "motor": {
        'hub': /power\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /grove\.power\(pin([0-9]{1,2})/gi
    },
    // Innovator Hub modules
    "ledModule": {
        'hub': /led\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
        'microbit': /LED Module on pin([0-9]{1,2})/gi
    },
    "potentiometer": /potentiometer\(\"((IN|BB) ([0-9]{1,2}))\"\)/g,
    "dht11-temp": /dht\(\"((IN|BB) ([0-9]{1,2}))\"\)/gi,
    "dht11-hum": /dht\(\"((IN|BB) ([0-9]{1,2}))\"\)/gi,
    // micro:bit modules
    "mpx5700": /grove\.read_pressure\(pin([0-9]{1,2})\)/gi,
    "ultrasonic": /grove\.read_ranger_(cm|time)\(pin([0-9]{1,2})\)/gi,
    "sht31-temp": /grove\.read_sht\(/g,
    "sht31-hum": /grove\.read_sht\(/g,
    "bme280-temp": /grove\.read_bme280\(/g,
    "bme280-press": /grove\.read_bme280\(/g,
    "bme280-hum": /grove\.read_bme280\(/g,
    "neopixel": /NeoPixel\(pin([0-9]{1,2}),/gi,
    "neopixel-color": /Color\(pin([0-9]{1,2})/gi,
};

Simulator.Mosaic.specific = {

    ti: {
        shell: TI_SHELL_START,
        graph: {
            xmin: -10,
            xmax: 10,
            ymin: -6.56,
            ymax: 6.56,
        },
        annulClicked: false,
        enterClicked: false,
        recall_RegEQ: null,
        funcLine: null,
        turtleMoving: false,
        isScreenUsed: false,
        isWaiting: false,
        waitKey: false,
        varButtonClicked: false,
        replActive: false,
        ctx: null,
        functionRequest: null,
        ctxTurtle: null,
        init: function () {
            $('#ti83_zone').show();
            $("#ti_screen-value").html(this.shell);
            this.ctx = document.querySelector('.canvas-ti-graph').getContext('2d');
            this.ctx.fillStyle = 'black';
            this.ctx.strokeStyle = 'black';
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.ctx.fillRect(0, 0, 320, 175);
            this.clearScreen(true);

            this.ctxTurtle = document.querySelector('.canvas-ti-turtle').getContext('2d');
            this.ctxTurtle.fillStyle = 'black';
            this.ctxTurtle.strokeStyle = 'black';
            this.ctxTurtle.save();
            this.ctxTurtle.fillStyle = 'rgba(255, 255, 255, 0)';
            this.ctxTurtle.fillRect(0, 0, 320, 175);
        },
        zoneToggler: function () {
            if ($('#ti83_zone-toggler').hasClass('closed')) {
                $('#ti83_zone-toggler').html('<i class="fa-solid fa-minus simulator-buttons-icon"></i>');
                $('#ti83_zone-toggler').removeClass('closed');
                $("#ti_screen-container").show();
            } else {
                $('#ti83_zone-toggler').html('<i class="fa-solid fa-plus simulator-buttons-icon"></i>');
                $("#ti_screen-container").hide();
                $('#ti83_zone-toggler').addClass('closed');
            }
        },
        clearScreen: function (menus) {
            this.ctx.clearRect(0, 0, 320, 175);
            this.ctx.restore();
            $('#ti_screen-menus').css('opacity', menus ? 1 : 0);
        },
        clearTurtleScreen: function (menus) {
            this.ctxTurtle.clearRect(0, 0, 320, 175);
            this.ctxTurtle.restore();
            $('#ti_screen-menus').css('opacity', menus ? 1 : 0);
        },
        reset: function () {
            this.isScreenUsed = false;
            if (!/import\s+ti_rover\s+as\s+rv/g.test(Simulator.code) && $('#ti83_zone-toggler').hasClass('closed')) {
                this.zoneToggler();
                Simulator.toggleBoardDisplay();
            }
            this.shell = TI_SHELL_START;
            $("#ti_screen-value").html(this.shell);
            this.clearScreen(true);
            $('#ti_screen-turtle-grid').css('opacity', 0);
            Simulator.Mosaic.specific.rover.storedMovements = new Array();
            Simulator.Mosaic.specific.tello.storedMovements = new Array();
        },
        showError: function (error, exception, type) {
            UIManager.showErrorMessage("error-message", type + ": " + error);
            this.addLinesToScreen(type + ": " + exception);
            this.addEndOfExecution();
            this.clearScreen(false);
            Simulator.pause();
        },

        removeDuplicatedRepl: function () {
            const replWraper = document.querySelectorAll('.repl-wrapper')
            if (replWraper.length > 0) {
                for (let i = 0; i < replWraper.length; i++) {
                    replWraper[i].remove();
                }
            }
        },

        addLinesToScreen: function (text) {
            // adapt text to keep spaces
            this.removeDuplicatedRepl();
            const textAdapted = text.replace(/ /g, "\xA0");
            const tab_new = this._getLinesToAdd(textAdapted);
            
            const ti_screen = document.getElementById('ti_screen-value');
            const tab_shell = ti_screen.innerHTML.split('<br>');
            if (tab_shell[tab_shell.length - 1] === "") tab_shell.pop();
            
            let tabLength = (this.replActive ? 10 : 11);
            let tab_shell_new = tab_shell.concat(tab_new);
            if (tab_shell_new.length > tabLength) {
                ti_screen.innerHTML = tab_shell_new.slice(tab_shell_new.length - tabLength).join('<br>');
            } else {
                ti_screen.innerHTML = tab_shell_new.join('<br>');
            }
            const lastVisibleLine = tab_new[tab_new.length - 1];
            if (lastVisibleLine?.trim()) {
                updateAriaLiveRegion(lastVisibleLine);
            }

            tab_new.forEach(line => PythonREPL.updateScreenReaderHistory(line));
        },
        addEndOfExecution: function () {
            this.removeDuplicatedRepl();
            const ti_screen = document.getElementById('ti_screen-value');
            const tab_shell = ti_screen.innerHTML.split('<br>');
            if (tab_shell.length > 9) {
                ti_screen.innerHTML = tab_shell.slice(tab_shell.length - 9).join('<br>') + "<br>>>> <br>";
            } else {
                ti_screen.innerHTML += "<br>>>> <br>";
            }
        },
        _getLinesToAdd: function (text) {
            const LINE_LEN = 32;
            const text_lines = text.split('\n');
            let statck_new = [];
            for (var k = 0; k < text_lines.length; k++) {
                const item = text_lines[k];
                if (item.length > LINE_LEN) {
                    let n = Math.ceil(item.length / LINE_LEN);
                    for (var j = 0; j < Math.floor(n); j++) {
                        statck_new[j + k] = item.slice(j * LINE_LEN, (j + 1) * LINE_LEN);
                    }
                } else {
                    if (item.length != 0) {
                        statck_new.push(item);
                    }
                }
            }
            return statck_new;
        },
        blinkRedLed: async function () {
            Simulator.music.startAudio();
            async function pitch1() {
                $("#ih_redLed").addClass('ih_redLed_anim');
                Simulator.music.pitch(1900);
                await sleep_ms(200);
            };
            async function pitch2() {
                $("#ih_redLed").removeClass('ih_redLed_anim');
                Simulator.music.pitch(1400);
                await sleep_ms(150);
            };
            for (var i = 0; i < 3; i++) {
                await pitch1();
                await pitch2();
            }
            Simulator.music.stop();
        },
        getScreen: async function () {
            const div = document.getElementById("ti_screen");
            const canvas = await html2canvas(div);
            const imageDataUrl = canvas.toDataURL();
            const data = await fetch(imageDataUrl);
            const blob = await data.blob();
            return blob;
        },
        downloadButton: async function () {
            try {
                const blob = await this.getScreen();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'TI-83_screenshot.png';
                a.click();
                delete a;
            } catch (e) {
                console.log(e);
            }
        },
        annulButton: async function () {
            if (!this.annulClicked && this.isWaiting) {
                this.annulClicked = true;
                this.isWaiting = false;
            }
        },
        enterButton: function () {
            //bind enter key to enter button
            const tiEnterButton = new KeyboardEvent('keydown', {
                key: 'Enter',
                keyCode: 13,
                which: 13,
            });
            document.dispatchEvent(tiEnterButton);

            //avoid pressing enter if dis_wait() is called for example
            if (!this.enterClicked && this.isWaiting && this.waitKey) {
                this.enterClicked = true;
                this.isWaiting = false;
                this.waitKey = false;
            }

            this.functionRequest = null;
        },
        varButton: function () {
            // avoid opening modal if dis_wait() is called
            if (this.waitKey) {
                this.varButtonClicked = true;
                return;
            }
            if (this.isWaiting && !this.turtleMoving) {
                return;
            }
            pseudoModal.openModal('modal-varButton');

            this.replActive = true;

            PythonREPL.toggleCaret();
            PythonREPL.clear();
            const modal = document.getElementById('varButton-modal-function-list')
            // clear old modal buttons
            modal.innerHTML = "";

            let funcName = null;
            let varName = null;

            const code = Simulator.code.split('\n');
            for (let i = 0; i < code.length; i++) {
                // retrieve function names and code

                // check for def declaration
                if (code[i].split('')[0] !== ' ' && /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/i.test(code[i])) {
                    funcName = code[i].match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/i)[1];
                }

                // check for variables declaration
                if (code[i].split('')[0] !== ' ' && /[a-zA-Z0-9_]*=[a-zA-Z0-9_]*/i.test(code[i]) && !/def/i.test(code[i]) && !/#/i.test(code[i])) {
                    varName = code[i].split('=')[0];
                }
                // add button to modal
                const addModalFunction = (element) => {
                    const button = document.createElement("button");
                    button.id = 'var-button-element-' + element.replace('()', '');
                    button.textContent = element;
                    button.classList.add('btn', 'btn-secondary');
                    modal.appendChild(button);
                    return button;
                }
                // delete button from modal if already exists (should not access to redefined function or variable)
                const deleteModalFunction = (element) => {
                    const button = document.getElementById('var-button-element-' + element);
                    button.parentNode.removeChild(button);
                }

                // add "variable" to modal and code to skulpt repl
                if (varName !== null) {
                    const varNameCopy = varName;
                    // const varBlockCopy = varBlock;
                    if (document.getElementById('var-button-element-' + varNameCopy) !== null) {
                        deleteModalFunction(varNameCopy);
                    }
                    const addButtonModal = addModalFunction(varNameCopy);
                    addButtonModal.style.color = "#FF9403";
                    addButtonModal.addEventListener('click', async () => {
                        let varNameCopyArgs = null;
                        if (this.functionRequest !== null) {
                            this.functionRequest.args.push(varNameCopy.trim());
                            varNameCopyArgs = this.functionRequest.name + '(' + this.functionRequest.args.join(', ');
                        }
                        pseudoModal.closeModal('modal-varButton');
                        await PythonRun.start(CodeManager.getSharedInstance().getCode(), 'ti_screen-value');
                        setTimeout(() => {
                            PythonREPL.init();
                            if (varNameCopyArgs !== null) {
                                PythonREPL.promptLine.preSpanElt.textContent = varNameCopyArgs;
                                PythonREPL.promptLine.postSpanElt.textContent = ")";
                            } else {
                                PythonREPL.promptLine.preSpanElt.textContent = varNameCopy;
                                PythonREPL.promptLine.postSpanElt.textContent = "";
                            }
                        }, 300);
                    });
                    // variable and blockVariable reset
                    varName = null;
                }
                // add "function" to modal and code to skulpt repl
                if (funcName !== null) {
                    const funcNameCopy = funcName;
                    if (document.getElementById('var-button-element-' + funcNameCopy) !== null) {
                        deleteModalFunction(funcNameCopy);
                    }
                    const addButtonModal = addModalFunction(funcNameCopy + '()');
                    addButtonModal.style.color = "#2b2be9";

                    addButtonModal.addEventListener('click', async () => {
                        pseudoModal.closeModal('modal-varButton');
                        await PythonRun.start(CodeManager.getSharedInstance().getCode(), 'ti_screen-value');
                        setTimeout(() => {
                            this.functionRequest = { name: funcNameCopy, args: [] };
                            PythonREPL.init();
                            PythonREPL.promptLine.preSpanElt.textContent = funcNameCopy + "(";
                            PythonREPL.promptLine.postSpanElt.textContent = ")";
                        }, 300);
                    });
                    // reset start and end and funcName
                    funcName = null;
                }
            }
        }
    },

    rover: {
        ONE_ANGLE_DURATION: 11,
        ONE_CM_DURATION: 54,
        storedMovements: [],
        isRunning: false,
        isRunningByUnits: false,
        angleInterval: null,
        unitInterval: null,
        // hide board viewer and ti_screen while rover is active
        init: function () {
            if (RobotSimulator.isRunning) {
                //ti_screen
                if (!Simulator.Mosaic.specific.ti.isScreenUsed && !/print/g.test(Simulator.code)) {
                    if (!$('#ti83_zone-toggler').hasClass('closed')) {
                        Simulator.Mosaic.specific.ti.zoneToggler();
                    }
                } else {
                    $('#ti83_zone-toggler').addClass('closed')
                    Simulator.Mosaic.specific.ti.zoneToggler();
                }
                // hub board
                if (!/from ti_hub import */g.test(Simulator.code)) {
                    if (!$('#simulator-board-toggler').hasClass('closed')) {
                        Simulator.toggleBoardDisplay();
                    }
                } else {
                    $('#simulator-board-toggler').addClass('closed')
                    Simulator.toggleBoardDisplay();
                }
            }
        },

        startRunning: function () {
            // console.log("[ROVER] startRunning()")
            if (!this.isRunning) {
                this.init();
                this.isRunning = true;
                try {
                    this.runMotors();
                } catch (e) {
                    console.error(e)
                }

            }
        },
        stopRunning: function () {
            // console.log("[ROVER] stopRunning()")
            if (this.isRunning) {
                this.isRunning = false;
                RobotSimulator.isForRotation = false;
                this.isRunningByUnits = false;
                $('#rover-motorRight_value').html("0");
                $('#rover-motorLeft_value').html("0");
                $('.rover-motorRight').css('animation', 'none');
                $('.rover-motorLeft').css('animation', 'none');
            }
        },
        runMotors: function () {
            // console.log("[ROVER] runMotors()")
            RobotSimulator.isForRotation = true;
            if (this.storedMovements.length > 0) {
                RobotSimulator.isForRotation = false;
                if ((this.storedMovements[0][0] == "forward" ||
                    this.storedMovements[0][0] == "backward") &&
                    this.storedMovements[0][1] != 0) {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "right" ||
                    this.storedMovements[0][0] == "left") {
                    this.turnCommand();
                } else if (this.storedMovements[0][0] == "to_xy") {
                    this.defineToXYCommands();
                } else if (this.storedMovements[0][0] == "stay") {
                    this.startRunning();
                    setTimeout(function () {
                        this.runMotors();
                    }, this.storedMovements[0][1] * 1000);
                    this.storedMovements.shift();
                } else {
                    this.stopRunning();
                }
            } else {
                this.stopMotors();
            }
        },
        moveCommand: function () {
            // console.log("[ROVER] moveCommand()")
            this.isRunningByUnits = true;
            const dir = this.storedMovements[0][0];
            $('.rover-motorRight').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
            $('.rover-motorLeft').css('animation', 'rotation-' + dir + ' ' + (100 * -0.041 + 5) + 's infinite linear');
            var _this = this;
            this.unitInterval = setInterval(() => {
                $('#rover-motorRight_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
                $('#rover-motorLeft_value').html(roundFloat(_this.storedMovements[0][1], 2) + " cm");
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                } else {
                    timeout *= _this.storedMovements[0][1];
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.unitInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.unitInterval);
                }
            }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);
        },
        turnCommand: function () {
            // console.log("[ROVER] turnCommand()")
            this.isRunningByUnits = false;
            const dir = this.storedMovements[0][0];
            if (dir == "left") {
                $("#rover-motorRight_value").html("1");
                $("#rover-motorLeft_value").html("-1");
                $('.rover-motorRight').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.rover-motorLeft').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
            } else {
                $("#rover-motorRight_value").html("-1");
                $("#rover-motorLeft_value").html("1");
                $('.rover-motorRight').css('animation', 'rotation-backward ' + (100 * -0.041 + 5) + 's infinite linear');
                $('.rover-motorLeft').css('animation', 'rotation-forward ' + (100 * -0.041 + 5) + 's infinite linear');
            }
            var _this = this;
            this.angleInterval = setInterval(function () {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                } else {
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1) * _this.storedMovements[0][1];
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.angleInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.angleInterval);
                }
            }, _this.ONE_ANGLE_DURATION);
        },
        defineToXYCommands: function () {
            // console.log("[ROVER] defineToXYCommands()")
            const to_xy = this.storedMovements[0][1];
            if (RobotSimulator.robot.angle > 180) {
                RobotSimulator.robot.angle = -(360 - RobotSimulator.robot.angle);
            } else if (RobotSimulator.robot.angle < -180) {
                RobotSimulator.robot.angle = 360 + RobotSimulator.robot.angle;
            }
            const newPolarPosition = RobotSimulator.getPolarPosition({
                x: to_xy[0],
                y: to_xy[1]
            });
            let angleToGo = newPolarPosition.theta - RobotSimulator.robot.angle
            if (angleToGo > 180) {
                angleToGo = -(360 - angleToGo);
            } else if (angleToGo < -180) {
                angleToGo = 360 + angleToGo;
            }
            this.storedMovements.shift();
            this.storedMovements.unshift(['forward', newPolarPosition.r * 10]);
            if (angleToGo < 0) {
                this.storedMovements.unshift(['left', Math.abs(angleToGo)]);
            } else {
                this.storedMovements.unshift(['right', Math.abs(angleToGo)]);
            }
            this.runMotors();
        },
        stopMotors: function () {
            clearInterval(this.angleInterval);
            clearInterval(this.unitInterval);
            this.stopRunning();
        }
    },

    tello: {
        ONE_ANGLE_DURATION: 11,
        ONE_CM_DURATION: 55,
        storedMovements: [],
        isRunning: false,
        angleInterval: null,
        unitInterval: null,
        altInterval: null,
        startRunning: function () {
            // console.log("[TELLO] startRunning()")
            if (!this.isRunning) {
                this.isRunning = true;
                try {
                    this.runMotors();
                } catch (e) {
                    console.error(e)
                }
            }
        },
        stopRunning: function () {
            // console.log("[TELLO] stopRunning()");
            if (this.isRunning) {
                this.isRunning = false;
                RobotSimulator.isForRotation = false;
            }
        },
        runMotors: function () {
            // console.log("[TELLO] runMotors()");
            RobotSimulator.isForRotation = true;
            if (this.storedMovements.length > 0) {
                RobotSimulator.isForRotation = false;
                if ((this.storedMovements[0][0] == "forward" || this.storedMovements[0][0] == "backward") && this.storedMovements[0][1] != 0) {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "fly_right" || this.storedMovements[0][0] == "fly_left") {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "right" || this.storedMovements[0][0] == "left") {
                    this.turnCommand();
                } else if ((this.storedMovements[0][0] == "up" || this.storedMovements[0][0] == "down") && this.storedMovements[0][1] != 0) {
                    this.altitudeCommand();
                } else if (this.storedMovements[0][0] == "land") {
                    this.altitudeCommand();
                } else {
                    this.stopRunning();
                }
            } else {
                this.stopMotors();
            }
        },
        moveCommand: function () {
            // console.log("[TELLO] moveCommand()");
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = false;
            this.unitInterval = setInterval(() => {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                } else {
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.unitInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.unitInterval);
                }
            }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);
        },
        turnCommand: function () {
            // console.log("[TELLO] turnCommand()");
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = false;
            this.angleInterval = setInterval(function () {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1;
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                } else {
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.angleInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.angleInterval);
                }
            }, _this.ONE_ANGLE_DURATION);
        },
        altitudeCommand: function () {
            // console.log("[TELLO] altitudeCommand()");
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = true;
            if (dir == "land")
                _this.storedMovements[0][1] = parseInt($('#tello-altitude_value_d').html());

            this.altInterval = setInterval(() => {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1;
                    RobotSimulator.robot.changeAltitude(dir, 1);
                } else {
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.altInterval);
                        _this.storedMovements.shift();
                        RobotSimulator.robot.altitudeIsChanging = false;
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.altInterval);
                }
            }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);
        },
        stopMotors: function () {
            clearInterval(this.angleInterval);
            clearInterval(this.unitInterval);
            clearInterval(this.altInterval);
            this.stopRunning();
        }
    },

    gesture: {
        ACCELEROMETER_GESTURES: ['shake', 'up', 'down', 'left', 'right', 'face up', 'face down'],
        history: null,
        init: function () {
            this.history = new Array();
        },
        resetOtherGestures: function (gesture) {
            this.history.push(gesture);
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                if (gesture !== g) {
                    $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('value', 0);
                }
            }
        },
        getCurrentGesture: function () {
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                const state = $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('option', 'value');
                if (state == 1) {
                    return g;
                }
            }
            return null;
        }
    },

    createSliders: function () {
        /* Microbit modules*/
        $('#mb-thermometer_slider').slider({
            min: 0,
            max: 100,
            value: 20
        });
        $('#mb-light_slider,' +
            '#mb-micro_slider').slider({
                min: 0,
                max: 255,
                value: 55
            });
        $('#mb-compassMag_slider_x').slider({
            min: -6000,
            max: 60000,
            value: 15000
        });
        $('#mb-compassMag_slider_y').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#mb-compassMag_slider_z').slider({
            min: -93000,
            max: 5200,
            value: -8000
        });
        $('#mb-compassMag_slider_strength').slider({
            min: 0,
            max: 12,
        });
        $('#mb-compassDir_slider').slider({
            min: 0,
            max: 360,
            value: 90
        });
        $('#mb-accelerometer_slider_x,' +
            '#mb-accelerometer_slider_y,' +
            '#mb-accelerometer_slider_z').slider({
                min: -2000,
                max: 2000,
                value: 0
            });
        $('#mb-accelerometer-pitch_slider,' +
            '#mb-accelerometer-roll_slider').slider({
                min: -90,
                max: 90,
                value: 0
            });
        $('#mb-button-a_slider,' +
            '#mb-button-b_slider,' +
            '#mb-gesture-up_slider,' +
            '#mb-gesture-down_slider,' +
            '#mb-gesture-left_slider,' +
            '#mb-gesture-right_slider,' +
            '#mb-gesture-faceup_slider,' +
            '#mb-gesture-facedown_slider,' +
            '#mb-gesture-shake_slider').slider({
                min: 0,
                max: 1,
                value: 0
            });
        /* Innovator hub modules */
        $('.mod_ih-brightns').slider({
            min: 0,
            max: 100,
            value: 15
        });
        $('.mod_loudness').slider({
            min: 0,
            max: 100,
            value: 15
        });
        /* Rover modules */
        // !Slider base : ultrasonic round-trip duration (in ms) _t
        $('.mod_rover-ultrasonic_t,' +
            '.mod_rover-ultrasonic_d').slider({
                min: 88,
                max: 14575,
                value: 1166
            });
        $('.mod_rover-colorSensor_r,' +
            '.mod_rover-colorSensor_g,' +
            '.mod_rover-colorSensor_b').slider({
                min: 0,
                max: 255,
                value: 55
            });
        $('.mod_rover-gyroscope-speed').slider({
            min: -5,
            max: 5,
            value: 0,
            step: 0.01
        });
        $('.mod_rover-gyroscope-angle').slider({
            min: -360,
            max: 360,
            value: 0,
            step: 1
        });
        /* Grove modules */
        $('.mod_read-digital').slider({
            min: 0,
            max: 1,
            value: 0
        });
        $('.mod_groveMoisture,' +
            '.mod_read-analog,' +
            '.mod_potentiometer').slider({
                min: 1,
                max: READ_ANALOG_MAX_VALUE,
                value: Math.round(READ_ANALOG_MAX_VALUE / 2)
            });
        $('.mod_ih-ultrasonic_d').slider({
            min: 3,
            max: 250,
            value: 20,
            step: 0.1
        });
        $('.mod_ti-groveTemp_cel,' +
            '.mod_ti-groveTemp_fah,' +
            '.mod_ti-groveTemp_kel').slider({
                min: 0,
                max: 100,
                value: 20,
                step: 0.1
            });
    },

    definitions: [

        /* Microbit modules */
        {
            id: "neopixel-color",
            title: "Neopixel",
            codeFlag: "Neopixel",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            value: "",
        },
        {
            regex: /light\.read_light_level\(\)/g,
            id: "mb-light",
            title: "Capteur de luminosité",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: 55,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 255);
            }
        },
        {
            regex: /music\.(pitch|play|set_volume|set_tempo)/gi,
            id: "mb-buzzer",
            title: "Buzzer intégré",
            pin: 'micro:bit v2',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        {
            regex: /thermometer\.readTemp\(\)/,
            id: "mb-thermometer",
            title: "Capteur de température",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                suffix: "",
            }],
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer",
            title: "Accéléromètre : ",
            pin: 'micro:bit',
            type: 'input',
            color: "#22b573",
            listeners: [{
                suffix: "_x",
                default: 0,
                unit: 'm/s2',
                color: "#ff4d6a",
                title: "Axe x"
            }, {
                suffix: "_y",
                default: 0,
                unit: 'm/s2',
                color: "#f9d142",
                title: "Axe y"
            }, {
                suffix: "_z",
                default: 0,
                unit: 'm/s2',
                color: "#1a6da8",
                title: "Axe z"
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-2000, 2000);
                const values = {
                    "x": parseInt($("#mb-accelerometer_slider_x").slider('option', 'value')),
                    "y": parseInt($("#mb-accelerometer_slider_y").slider('option', 'value')),
                    "z": parseInt($("#mb-accelerometer_slider_z").slider('option', 'value'))
                };
                const pitch = Math.atan2(values["y"], -values["z"]) * 180 / Math.PI;
                $("#mb-accelerometer-pitch_value").html(roundFloat(pitch, 1) + " °");
                $("#mb-accelerometer-pitch_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(1, 0, 0, " + -pitch + "deg)");
                const roll = Math.atan2(values["x"], Math.sqrt(values["y"] ** 2 + values["z"] ** 2)) * 180 / Math.PI;
                $("#mb-accelerometer-roll_value").html(roundFloat(roll, 1) + " °");
                $("#mb-accelerometer-roll_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(0, 1, 0, " + -roll + "deg)");
            }
        },
        {
            regex: /accelerometer\.get_[yz]\(\)/,
            id: "mb-accelerometer-pitch",
            title: "Accéleromètre - Tangage",
            pin: 'micro:bit',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png"
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer-roll",
            title: "Accéleromètre - Roulis",
            pin: 'micro:bit',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
        },
        {
            regex: /compass\.heading\(\)/,
            id: "mb-compassDir",
            title: "Boussole",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 90,
                unit: '°',
                color: "#448ae5",
                title: "Direction"
            }],
            picture: "Boussole.png",
            pictureAnimation: "Boussole-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, degree = 360);
            }
        },
        {
            regex: /compass\.get_[xyz]\(\)/,
            id: "mb-compassMag",
            title: "Boussole : ",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: 15000,
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ Mag. x"
            }, {
                suffix: "_y",
                default: 3000,
                unit: 'µT',
                color: "#f9d142",
                title: "Champ Mag. y"
            }, {
                suffix: "_z",
                default: -8000,
                unit: 'µT',
                color: "#1a6da8",
                title: "Champ Mag. z"
            }
            ],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            regex: /button_a.(is|was)_pressed/,
            id: "mb-button-a",
            title: "Bouton A",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /button_b.(is|was)_pressed/,
            id: "mb-button-b",
            title: "Bouton B",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]shake['"]|(is|was)_gesture\(['"]shake['"]\))/,
            id: "mb-gesture-shake",
            title: "Secouer",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "shake",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-shake_value").html("ON");
                    $("#mb-gesture-shake_anim").addClass('mb-gesture-shake_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('shake');
                } else {
                    $("#mb-gesture-shake_value").html("OFF");
                    $("#mb-gesture-shake_anim").removeClass('mb-gesture-shake_active');
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]up['"]|(is|was)_gesture\(['"]up['"]\))/,
            id: "mb-gesture-up",
            title: "Logo vers le haut",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en haut",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-up_value").html("ON");
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('up');
                } else {
                    $("#mb-gesture-up_value").html("OFF");
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]down['"]|(is|was)_gesture\(['"]down['"]\))/,
            id: "mb-gesture-down",
            title: "Logo vers le bas",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en bas",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-down_value").html("ON");
                    $("#mb-gesture-down_anim").addClass('mb-gesture-down_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('shake');
                } else {
                    $("#mb-gesture-down_value").html("OFF");
                    $("#mb-gesture-down_anim").removeClass('mb-gesture-down_active');
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]face up['"]|(is|was)_gesture\(['"]face up['"]\))/,
            id: "mb-gesture-faceup",
            title: "Écran vers le haut",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en haut",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-faceup_value").html("ON");
                    $("#mb-gesture-faceup_anim").addClass('mb-gesture-faceup_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face up');
                } else {
                    $("#mb-gesture-faceup_value").html("OFF");
                    $("#mb-gesture-faceup_anim").removeClass('mb-gesture-faceup_active');
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]face down['"]|(is|was)_gesture\(['"]face down['"]\))/,
            id: "mb-gesture-facedown",
            title: "Écran vers le bas",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en bas",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-facedown_value").html("ON");
                    $("#mb-gesture-facedown_anim").addClass('mb-gesture-facedown_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face down');
                } else {
                    $("#mb-gesture-facedown_value").html("OFF");
                    $("#mb-gesture-facedown_anim").removeClass('mb-gesture-facedown_active');
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]left['"]|(is|was)_gesture\(['"]left['"]\))/,
            id: "mb-gesture-left",
            title: "Tourner à gauche",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à gauche",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-left_value").html("ON");
                    $("#mb-gesture-left_anim").addClass('mb-gesture-left_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('left');
                } else {
                    $("#mb-gesture-left_value").html("OFF");
                    $("#mb-gesture-left_anim").removeClass('mb-gesture-left_active');
                }
            }
        },
        {
            regex: /accelerometer\.(current_gesture\(\)( ){0,2}==( ){0,2}['"]right['"]|(is|was)_gesture\(['"]right['"]\))/,
            id: "mb-gesture-right",
            title: "Tourner à droite",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à droite",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-right_value").html("ON");
                    $("#mb-gesture-right_anim").addClass('mb-gesture-right_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('right');
                } else {
                    $("#mb-gesture-right_value").html("OFF");
                    $("#mb-gesture-right_anim").removeClass('mb-gesture-right_active');
                }
            }
        },
        {
            regex: /microphone.((is|was)_event|sound_level|set_threshold)\(/gi,
            id: "mb-micro",
            title: "Microphone",
            pin: 'micro:bit v2',
            type: 'input',
            listeners: [{
                default: "0 (NONE)",
                unit: '',
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                if (Animator.value >= 128) {
                    $(Animator.valueId).text(Animator.value + ' (LOUD)');
                    $(Animator.animId).css("filter", 'hue-rotate(310deg)');
                } else if (Animator.value <= 128) {
                    $(Animator.valueId).text(Animator.value + ' (QUIET)');
                    $(Animator.animId).css("filter", 'hue-rotate(15deg)');
                } else if (Animatior.value == 0) {
                    $(Animator.valueId).text(Animator.value + ' (NONE)');
                }
                $(Animator.animId).css('opacity', Animator.value / 255);
            }
        },
        {
            id: "ti-groveTemp",
            title: "Capteur de temp. : ",
            pin: 'pin n° ',
            pins: 'analog_read',
            type: 'input',
            // codeFlag: 'Temperature Sensor',
            listeners: [{
                suffix: "_cel",
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                title: "(°C)"
            }, {
                suffix: "_fah",
                default: 36,
                unit: '°F',
                color: "#ff4d6a",
                title: "(°F)"
            }, {
                suffix: "_kel",
                default: 293,
                unit: 'K',
                color: "#ff4d6a",
                title: "(K)"
            }],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.gauge(value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_cel": roundFloat(t, 1),
                    "_kel": roundFloat(t + 273.15, 1),
                    "_fah": roundFloat(t * 9 / 5 + 32, 1)
                }, callbackAnim);
            }
        },

        /* Innovator Hub modules */
        {
            regex: /(brightns.measurement\(\)|from brightns import \*)/g,
            id: "ih-brightns",
            title: "Capteur de luminosité",
            pin: 'Innovator Hub',
            type: 'input',
            listeners: [{
                default: 15,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            regex: /(sound\.(tone|note)|from sound import \*)/gi,
            id: "ih-buzzer",
            title: "Buzzer intégré",
            pin: 'Innovator Hub',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value);
            }
        },
        {
            regex: /(import color|from color import *)/gi,
            id: "ih-LED-RGB",
            title: "LED RGB",
            pin: 'Innovator Hub',
            type: 'output',
            value: "",
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png"
        },
        {
            regex: /(import light|from ligh import *)/gi,
            id: "ih-LED-Red",
            title: "LED Rouge",
            pin: 'Innovator Hub',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
            }
        },

        /* Rover modules */
        {
            regex: /\.ranger_(measurement|time)\(\)/gi,
            id: "rover-ultrasonic",
            title: "Télémètre: ",
            pin: "Rover",
            pins: 'digital',
            type: 'input',
            codeFlag: 'Ultrasonic',
            listeners: [{
                default: 20,
                unit: 'm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: "ultrasonic",
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(343 * t / 1e6 / 2, 2),
                    "_t": t
                }, callbackAnim);
            }
        },
        {
            regex: /(red|green|blue|gray|color)_measurement\(\)/g,
            id: "rover-colorSensor",
            title: "Capteur de couleurs : ",
            pin: "Rover",
            type: 'input',
            listeners: [{
                suffix: "_r",
                default: 255,
                unit: '',
                color: "#dc3545",
                title: "R"
            }, {
                suffix: "_g",
                default: 0,
                unit: '',
                color: "#22b573",
                title: "G"
            }, {
                suffix: "_b",
                default: 0,
                unit: '',
                color: "#3fa9f5",
                title: "B"
            }
            ],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.valueId).text(Animator.value);
                $("#rover-colorSensor_anim").css('background-color', "rgb(" +
                    parseInt($("#rover-colorSensor_slider_r").slider('option', 'value')) + "," +
                    parseInt($("#rover-colorSensor_slider_g").slider('option', 'value')) + "," +
                    parseInt($("#rover-colorSensor_slider_b").slider('option', 'value')) + ")"
                );
            }
        },
        {
            regex: /rv.(motor_left|forward(|_time)|backward(|_time)|to_xy|to_polar|right|left)\(/gi,
            id: "rover-motorLeft",
            title: "Moteur Gauche",
            pin: "Rover",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /rv.(motor_right|forward(|_time)|backward(|_time)|to_xy|to_polar|right|left)\(/gi,
            id: "rover-motorRight",
            title: "Moteur Droit",
            pin: "Rover",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(.)\.gyro_measurement\(\)/g,
            id: "rover-gyroscope-speed",
            title: "Gyroscope - speed",
            pin: "Rover",
            type: 'input',
            listeners: [{
                default: 0,
                unit: 'rad/s',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-5, 5);
            }
        },
        {
            regex: /(.).encoders_gyro_measurement\(\)/g,
            id: "rover-gyroscope-angle",
            title: "Gyroscope - angle",
            pin: "Rover",
            type: 'input',
            listeners: [{
                default: 0,
                unit: '°',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(130, 130 + 360, text = Animator.value, degree = 360);
            }
        },

        /* Tello modules */
        {
            regex: /(tello)/gi,
            id: "tello-altitude",
            title: "Altitude",
            pin: "Tello",
            type: 'input',
            listeners: [{
                default: 0,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Altitude"
            }],
            picture: "Tello_altitude.png",
            pictureAnimation: "Tello_altitude_line.png",
            animate: function (Animator) { }
        },

        /* Grove modules */
        {
            regex: /ranger\(\"((IN|BB) ([0-9]{1,2}))\"\)/gi,
            id: "ih-ultrasonic",
            title: "Télémètre - Distance",
            pin: 'pin n°',
            type: 'input',
            listeners: [{
                suffix: "_d",
                default: 3,
                unit: ' cm',
                color: "#f9d142 ",
                title: "Distance"
            }],
            class: "ultrasonic",
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(3, 400);
            }
        },
        {
            regex: /loudness\(\"((IN|BB) ([0-9]{1,2}))\"\)/g,
            id: "loudness",
            title: "Capteur de son",
            pin: 'pin n° ',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: "",
                slider: {
                    min: 0,
                    max: 100,
                    value: 15
                }
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            regex: /conservo\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
            id: "continuousServo",
            title: "Servo continu",
            pin: 'pin n° ',
            type: 'output',
            class: 'servo',
            value: 0,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /vibration_motor\(\"((OUT|BB) ([0-9]{1,2}))\"\)/gi,
            id: "vibrationMotor",
            title: "Moteur à vibrations",
            pin: 'pin n° ',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 255);
            }
        }
    ]
}; 
