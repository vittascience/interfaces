// Galaxia - thingz module

var $builtinmodule = function () {
    //to print start text on screen
    // $("#galaxia_screen-value").html(GALAXIA_SHELL_START);

    // Galaxia ui display module coordinates
    let OLD_XPOS = 0;
    let OLD_YPOS = 0;
    let XPOS = 0;
    let Y_min = 0;
    let Y_max = 128;
    
    // clear interval for animate function 
    clearInterval(Simulator.intervals['animateFunc']);

    var thingz = {};

    thingz.__name__ = new Sk.builtin.str('thingz');

    thingz.temperature = new Sk.builtin.func(function () {
        const t = $("#galaxia-temp_slider").slider('option', 'value');
        return new Sk.builtin.float_(t);
    });

    //Galaxia LedRGB - luminosity
    var LedRGB = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        const rgbToHex = function (rgb) {
            // Séparer les valeurs de rouge, vert et bleu
            let [r, g, b] = rgb;
            r = r < 0 ? 0 : r > 255 ? 255 : r;
            g = g < 0 ? 0 : g > 255 ? 255 : g;
            b = b < 0 ? 0 : b > 255 ? 255 : b;
            // Convertir en hexadécimal
            const hex = ((r << 16) | (g << 8) | b).toString(16);

            // Remplir avec des zéros à gauche si nécessaire
            const paddedHex = hex.padStart(6, '0');

            // Ajouter le préfixe '#'
            const hexString = `#${paddedHex}`;

            return hexString;
        };

        const setSVGLed = function (self, opacity) {
            const board = document.getElementById("board-viewer").contentDocument;
            const led = board.querySelector("#led");
            const ledOverlay = board.querySelector("#led-overlay");
            const hex = rgbToHex(self.RGB);
            $(led).css('fill', hex);
            $(led).css('filter', 'drop-shadow(0px 0px 5px ' + hex + ')');
            $(ledOverlay).css('opacity', opacity / 255 * 0.9);
        }

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.RGB = [0, 0, 0];
            self.mod = Simulator.getModuleByKey("RGBLed");
            Simulator.setAnimator(self.mod, self.mod.id, self.RGB);
        });

        $loc.set_colors = new Sk.builtin.func(function (self, r, g, b) {
            const opacityValue = [r.v, g.v, b.v].sort((a, b) => a - b);
            self.RGB = [r.v, g.v, b.v];
            Simulator.setAnimator(self.mod, self.mod.id, self.RGB);
            setSVGLed(self, opacityValue[2]);
            return Sk.builtin.none();
        });
        $loc.set_red = new Sk.builtin.func(function (self, r) {
            self.RGB = [r.v, self.RGB[1], self.RGB[2]];
            Simulator.setAnimator(self.mod, self.mod.id, self.RGB);
            setSVGLed(self, r.v);
            return Sk.builtin.none();
        });
        $loc.set_green = new Sk.builtin.func(function (self, g) {
            self.RGB = [self.RGB[0], g.v, self.RGB[2]];
            Simulator.setAnimator(self.mod, self.mod.id, self.RGB);
            setSVGLed(self, g.v);
            return Sk.builtin.none();
        });
        $loc.set_blue = new Sk.builtin.func(function (self, b) {
            self.RGB = [self.RGB[0], self.RGB[1], b.v];
            Simulator.setAnimator(self.mod, self.mod.id, self.RGB);
            setSVGLed(self, b.v);
            return Sk.builtin.none();
        });
        //read light level from luminosity slider
        $loc.read_light_level = new Sk.builtin.func(function (self) {
            const light = $("#galaxia-light_slider").slider('option', 'value');
            return new Sk.builtin.float_(light);
        });
    });
    thingz.led = new LedRGB()
    thingz.led.tp$init();

    var Accelerometer = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        const getValue = function (data) {
            return $("#galaxia-accelerometer_slider_" + data).slider('option', 'value');
        };

        $loc.__init__ = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.gesture.init();
        });

        $loc.get_x = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(getValue("x"));
        });

        $loc.get_y = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(getValue("y"));
        });

        $loc.get_z = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(getValue("z"));
        });

        $loc.get_pitch = new Sk.builtin.func(function (self) {
            const pitch = parseInt($("#galaxia-accelerometer-pitch_slider").slider('option', 'value'));
            return new Sk.builtin.int_(pitch);
        });

        $loc.get_roll = new Sk.builtin.func(function (self) {
            const roll = parseInt($("#galaxia-accelerometer-roll_slider").slider('option', 'value'));
            return new Sk.builtin.int_(roll);
        });

        $loc.current_gesture = new Sk.builtin.func(function (self) {
            const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
            if (currentGesture !== null) {
                return new Sk.builtin.str(currentGesture);
            }
            return Sk.builtin.none();
        });

        $loc.is_gesture = new Sk.builtin.func(function (self, gesture) {
            const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
            if (currentGesture !== null && currentGesture === gesture.v) {
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc.was_gesture = new Sk.builtin.func(function (self, gesture) {
            for (var i = 0; i < Simulator.Mosaic.specific.gesture.history.length; i++) {
                if (Simulator.Mosaic.specific.gesture.history[i] === gesture.v) {
                    Simulator.Mosaic.specific.gesture.history.splice(i, 1);
                    return new Sk.builtin.bool(true);
                }
            }
            return new Sk.builtin.bool(false);
        });

        $loc.get_gestures = new Sk.builtin.func(function (self) {
            const gestures = Simulator.Mosaic.specific.gesture.history;
            Simulator.Mosaic.specific.gesture.init();
            return Sk.ffi.remapToPy(gestures);
        });

    });
    thingz.accelerometer = new Accelerometer()
    thingz.accelerometer.tp$init();

    var Compass = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        $loc.heading = new Sk.builtin.func(function (self) {
            const heading = $("#galaxia-compassDir_slider").slider('option', 'value');
            return new Sk.builtin.int_(heading);
        });
        $loc.get_x = new Sk.builtin.func(function (self) {
            const x = $("#galaxia-compassMag_slider_x").slider('option', 'value');
            return new Sk.builtin.int_(x);
        }
        );
        $loc.get_y = new Sk.builtin.func(function (self) {
            const y = $("#galaxia-compassMag_slider_y").slider('option', 'value');
            return new Sk.builtin.int_(y);
        }
        );
        $loc.get_z = new Sk.builtin.func(function (self) {
            const z = $("#galaxia-compassMag_slider_z").slider('option', 'value');
            return new Sk.builtin.int_(z);
        }
        );


    });
    thingz.compass = new Compass()

    let buttonACallback = null;
    let buttonBCallback = null;

    var Button = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        Button__init__ = function (self, btn) {
            self.state = false;
            self.presses = 0;
            self.last_check = 0;
            self.btn = btn.v;
        
            const id = self.btn === 'a' ? 'button_A_on' : 'button_B_on';
            const board = document.getElementById("board-viewer").contentDocument;
        
            if (board !== null) {
                const button = board.querySelector("#" + id);
                if (button != null) {
                    ['mouseup', 'mousedown', 'click'].forEach(eventType => {
                        button.addEventListener(eventType, function (e) {
                            switch (e.type) {
                                case 'mousedown':
                                    $("#galaxia-button-" + self.btn + '_slider').slider('value', 1);
                                    break;
                                case 'mouseup':
                                    $("#galaxia-button-" + self.btn + '_slider').slider('value', 0);
                                    break;
                                case 'click':
                                    self.presses++;
                                    break;
                            }
                        });
                    });
                }
            }
        };

        Button__init__.co_varnames = ['self', 'btn'];
        Button__init__.$defaults = [Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(Button__init__);

        $loc.is_pressed = new Sk.builtin.func(function (self) {
            const state = $("#galaxia-button-" + self.btn + '_slider').slider('option', 'value');
            return new Sk.builtin.bool(state);
        });

        $loc.was_pressed = new Sk.builtin.func(function (self) {
            const check = self.presses > self.last_check;
            self.last_check = self.presses;
            const value = check ? 1 : 0;
            return new Sk.builtin.int_(value);
        });

        $loc.get_presses = new Sk.builtin.func(function (self) {
            const presses = self.presses;
            self.presses = 0;
            return new Sk.builtin.int_(presses);
        });

        $loc.on_button_pressed = new Sk.builtin.func(function (self, callback) {
            const buttons = {
                "a": "button_A_on",
                "b": "button_B_on"
            }
            const board = document.getElementById("board-viewer").contentDocument;
            if (board !== null) {
                const button = board.querySelector("#" + buttons[self.btn]);
                if (button != null) {
                    if (self.btn === 'a') {
                        buttonACallback = callback;
                    }
                    if (self.btn === 'b') {
                        buttonBCallback = callback;
                    }
                    button.addEventListener('mouseup', function (e) {
                        try {
                            if (self.btn === 'a') simulateButtonAOnEvent(self.btn);
                            else simulateButtonBOnEvent(self.btn);
                        } catch (error) {
                            console.log(error);
                        }
                    });
                }
            }
        });

    }, 'Button', []);

    thingz.button_a = new Button();
    thingz.button_a.tp$init([new Sk.builtin.str('a')]);

    thingz.button_b = new Button();
    thingz.button_b.tp$init([new Sk.builtin.str('b')]);

    let touchUpCallback = null;
    let touchDownCallback = null;
    let touchLeftCallback = null;
    let touchRightCallback = null;

    var Pad = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {
        Pad__init__ = function (self, pad) {
            self.state = false;
            self.presses = 0;
            self.last_check = 0;
            self.btn = pad.v;
        
            const board = document.getElementById("board-viewer").contentDocument;
        
            if (board !== null) {
                const id = 'joystick_' + self.btn;  // ex: 'joystick_up'
                const button = board.querySelector("#" + id);
        
                if (button != null) {
                    ['mouseup', 'mousedown', 'click'].forEach(eventType => {
                        button.addEventListener(eventType, function (e) {
                            switch (e.type) {
                                case 'mousedown':
                                    $("#galaxia-pad-" + self.btn + '_slider').slider('value', 1);
                                    break;
                                case 'mouseup':
                                    $("#galaxia-pad-" + self.btn + '_slider').slider('value', 0);
                                    break;
                                case 'click':
                                    self.presses++;
                                    break;
                            }
                        });
                    });
                }
            }
        };

        Pad__init__.co_varnames = ['self', 'pad'];
        Pad__init__.$defaults = [Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(Pad__init__);

        $loc.is_touched = new Sk.builtin.func(function (self) {
            const state = $("#galaxia-pad-" + self.btn + '_slider').slider('option', 'value');
            return new Sk.builtin.bool(state);
        });

        $loc.was_touched = new Sk.builtin.func(function (self) {
            const check = self.presses > self.last_check;
            self.last_check = self.presses;
            return new Sk.builtin.bool(check);
        });

        $loc.get_presses = new Sk.builtin.func(function (self) {
            const presses = self.presses;
            self.presses = 0;
            return new Sk.builtin.int_(presses);
        });

        $loc.on_touch_touched = new Sk.builtin.func(function (self, callback) {
            const buttons = {
                "up": "joystick_up",
                "down": "joystick_down",
                "left": "joystick_left",
                "right": "joystick_right"
            }
            const board = document.getElementById("board-viewer").contentDocument;
            if (board !== null) {
                const button = board.querySelector("#" + buttons[self.btn]);
                if (button != null) {
                    if (self.btn === 'up') {
                        touchUpCallback = callback;
                    }
                    if (self.btn === 'down') {
                        touchDownCallback = callback;
                    }
                    if (self.btn === 'left') {
                        touchLeftCallback = callback;
                    }
                    if (self.btn === 'right') {
                        touchRightCallback = callback;
                    }
                    button.addEventListener('mouseup', function (e) {
                        try {
                            if (self.btn === 'up') {
                                simulateTouchUpOnEvent(self.btn);
                            } else if (self.btn === 'down') {
                                simulateTouchDownOnEvent(self.btn);
                            } else if (self.btn === 'left') {
                                simulateTouchLeftOnEvent(self.btn);
                            } else {
                                simulateTouchRightOnEvent(self.btn);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    );
                }
            }
        });

    }, 'Pad', []);

    thingz.touch_n = new Pad();
    thingz.touch_n.tp$init([new Sk.builtin.str('up')]);

    thingz.touch_s = new Pad();
    thingz.touch_s.tp$init([new Sk.builtin.str('down')]);

    thingz.touch_e = new Pad();
    thingz.touch_e.tp$init([new Sk.builtin.str('right')]);

    thingz.touch_w = new Pad();
    thingz.touch_w.tp$init([new Sk.builtin.str('left')]);



    var Radio = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.name = 'radio';
            self._rx_buffer = new Array();
        });

        $loc.on = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(true);
        });

        $loc.off = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(false);
        });

        var config = function (self, channel, power, length, group) {
            return new Sk.builtin.NotImplementedError("radio.config() is not yet implemented");
        };

        config.co_varnames = ['self', 'channel', 'power', 'length', 'group'];
        config.$defaults = [Sk.builtin.none(), new Sk.builtin.int_(7), new Sk.builtin.int_(6), new Sk.builtin.int_(32), new Sk.builtin.int_(0)];
        config.co_numargs = 2;
        $loc.config = new Sk.builtin.func(config);

        $loc.send = new Sk.builtin.func(async function (self, data) {
            if (data !== undefined) {
                function sendRadioData(buffer) {
                    const data = {
                        'timestamp': Date.now(),
                        'content': buffer
                    };
                    const multiEditorLS = localStorage.getItem('multiEditor');
                    if (multiEditorLS) {
                        const multiEditor = JSON.parse(multiEditorLS);
                        const currentEditor = multiEditor[INTERFACE_NAME][VittaInterface.id]
                        multiEditor[INTERFACE_NAME][VittaInterface.id].dateUpdated = Math.floor(new Date() / 1000);
                        if (currentEditor.radio) {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].radio['_tx_buffer'].push(data);
                        } else {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].radio = {
                                '_tx_buffer': [data]
                            };
                        }
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                    } else {
                        InterfaceMonitor.writeConsole("Radio Error: no service");
                    }
                };
                sendRadioData(data.v);
                const date = new Date();
                var s;
                if (date.getSeconds() < 10) {
                    s = "0" + date.getSeconds();
                } else {
                    s = date.getSeconds();
                }
                const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;

                //add line to Galaxia screen
                Simulator.Mosaic.specific.galaxiaUi.addLinesToScreen("send: " + data.v)
                InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par radio : '" + data.v + "'\n");
            }

        });

        $loc.receive = new Sk.builtin.func(function (self, size) {
            const getData = function (sz) {
                let size;
                if (size === undefined) {
                    size = self._rx_buffer.length;
                } else {
                    size = sz.v;
                }
                return self._rx_buffer.shift();
            };
            if (self._rx_buffer.length !== 0) {
                return new Sk.builtin.str(getData(size));
            } else {
                // Appelée pour vérifier s'il y a des messages en attente de lecture dans RX
                const multiEditorLS = localStorage.getItem('multiEditor');
                if (multiEditorLS) {
                    const multiEditor = JSON.parse(multiEditorLS);
                    const mutiEditorInterface = multiEditor[INTERFACE_NAME];
                    var validEditors = []
                    for (var id in mutiEditorInterface) {
                        if (mutiEditorInterface[id].dateUpdated && mutiEditorInterface[id].radio) {
                            validEditors.push({
                                "id": id,
                                "dateUpdated": mutiEditorInterface[id].dateUpdated,
                                "radio": mutiEditorInterface[id].radio
                            });
                        }
                    }
                    const editor = validEditors.sort(function (a, b) {
                        return b.dateUpdated - a.dateUpdated;
                    })[0];
                    if (editor !== undefined && editor.radio._tx_buffer && editor.radio._tx_buffer.length != 0) {
                        const dataArray = editor.radio._tx_buffer;
                        self._rx_buffer = dataArray.map(function (data) {
                            return data.content;
                        });
                        multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
                        multiEditor[INTERFACE_NAME][editor.id].radio = {
                            '_tx_buffer': new Array()
                        };
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        return new Sk.builtin.str(getData(size));
                    }
                } else {
                    InterfaceMonitor.writeConsole("Radio Error: no service");
                }
                return Sk.builtin.none();
            }
        });

    }, "Radio", []);

    thingz.radio = new Radio();

    thingz.radio.tp$init([]);

    const addPoint = (value) =>{
        if (XPOS > 160) {
            const ctx = Simulator.Mosaic.specific.galaxiaUi.ctx
            XPOS = 0;
            OLD_XPOS = 0;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 165, 135);
        }
        // calc y position with scale
        let YPOS_V
        if (value < Y_min){
            YPOS_V = 128;
        } else if (value > Y_max){
            YPOS_V = 0;
        } else {
            YPOS_V = 128 - (value - Y_min) * (128 / (Y_max - Y_min));
        }
        // YPOS_V = 128 - (value.v - Y_min) * (128 / (Y_max - Y_min));
        
        Simulator.Mosaic.specific.galaxiaUi.addPointToGraph(OLD_XPOS, OLD_YPOS,XPOS,YPOS_V);
        OLD_XPOS = XPOS;
        OLD_YPOS = YPOS_V;
        XPOS++;
    }

    const addText = (x, y, text, color = "#FFF") => {
        const ctx = Simulator.Mosaic.specific.galaxiaUi.ctx
        ctx.font = "10px Monospace";
        ctx.fillStyle = color || "#FFFFFF";
        ctx.fillText(text, x, y+10);
    }

    const addRect = (x, y, width, height, color) => {
        const ctx = Simulator.Mosaic.specific.galaxiaUi.ctx
        ctx.fillStyle = color || "#FFFFFF";
        ctx.fillRect(x, y, width, height);
    }

    var Display = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {
        
        $loc.plot_show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.galaxiaUi.initPlot();
            Simulator.Mosaic.specific.galaxiaUi.plotMode  = true;
            Simulator.Mosaic.specific.galaxiaUi.terminalMode = false;
            Simulator.Mosaic.specific.galaxiaUi.graphicMode  = false;
            
            }
        );
        $loc.console_show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.galaxiaUi.terminalMode = true;
            Simulator.Mosaic.specific.galaxiaUi.graphicMode  = false;
            Simulator.Mosaic.specific.galaxiaUi.graphicMode  = false;
            }
        );

        $loc.raw_show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.galaxiaUi.initGraphic();
            Simulator.Mosaic.specific.galaxiaUi.terminalMode = false;
            Simulator.Mosaic.specific.galaxiaUi.graphicMode  = true;
            Simulator.Mosaic.specific.galaxiaUi.plotMode  = false;
            
        });
        $loc.plot_set_y_scale= new Sk.builtin.func(function (self, min, max) {
            console.log(min, max)
            Y_min = min.v;
            Y_max = max.v;
        }
        );

        $loc.plot_add_point = new Sk.builtin.func(function (self, value) {
            addPoint(value.v);
        });
        // not properly working on the galaxia Board
        $loc.plot_set_animate_function = new Sk.builtin.func(function (self, func, interval) {
            Simulator.intervals['animateFunc'] = setInterval(function () {
                if (Simulator.stop_flag || Sk.execLimit == 0) {
                    clearInterval(Simulator.intervals['animateFunc']);
                }
                Sk.misceval
                    .asyncToPromise(function () {
                        return Sk.misceval.callsimOrSuspendArray(func, []);
                    })
                    .then(function (value) {
                        if (value !== undefined && value.v !== undefined) {
                            addPoint(value.v.toFixed(0));
                        }
                    }, Simulator.handleError);
            }, interval.v);
        });

        $loc.raw_print = new Sk.builtin.func(function (self, x, y, text) {
            const xPos = x.v;
            const yPos = y.v;
            const textValue = text.v;
            
            addText(xPos, yPos, textValue);
        })

        $loc.raw_print_bmp = new Sk.builtin.func(function (self, x, y, bmp) {
            return new Sk.builtin.NotImplementedError("display.raw.print_bmp() is not yet implemented");
        })

    });

    thingz.display = new Display()

    
    var RawText = Sk.misceval.buildClass(thingz, function ($gbl, $loc) {
        RawText__init__ = function (self, x, y, text, color) {
            const intColor = color.v;
            const hexString = "0x" + intColor.toString(16).padStart(6, "0");
            self.xPos = x.v;
            self.yPos = y.v;
            self.textValue = text.v;
            self.colorValue = hexString.replace(/0x/, "#");
            
        }
        RawText__init__.co_varnames = ['self', 'x', 'y', 'text', 'color'];
        RawText__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(RawText__init__);

        $loc.show = new Sk.builtin.func(function (self, bool) {
            const value = bool.v;
            if (value) {
                addText(self.xPos, self.yPos, self.textValue, self.colorValue);
            }
        })

    }, 'RawText', []);

    thingz.display_rawText = RawText;



    var RawRect = Sk.misceval.buildClass(thingz, function ($gbl, $loc) {
        RawRect__init__ = function (self, x, y, width, height, color) {
            const intColor = color.v;
            const hexString = "0x" + intColor.toString(16).padStart(6, "0");
            self.xPos = x.v;
            self.yPos = y.v;
            self.width = width.v;
            self.height = height.v;
            self.colorValue = hexString.replace(/0x/, "#");
        }
        RawRect__init__.co_varnames = ['self', 'x', 'y', 'width', 'height', 'color'];
        RawRect__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none(), Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(RawRect__init__);
        $loc.show = new Sk.builtin.func(function (self, bool) {
            const value = bool.v;
            if (value) {
                addRect(self.xPos, self.yPos, self.width, self.height, self.colorValue);
            }
        })
    }, 'RawRect', []);

    thingz.display_rawRect = RawRect;
    
    thingz.simulateOnEventButtonPressed = new Sk.builtin.func(function (button){
        const btn = button[0].v;
        const cb = (btn === 'a') ? buttonACallback : buttonBCallback;
        if (!cb) console.warn("no callback found for: ", btn);
        Sk.misceval
            .asyncToPromise(function () {
                return Sk.misceval.callsimOrSuspendArray(cb, [""]);
            })
            .then(function (value) {
            }, Simulator.handleError);
        });
    
    thingz.simulateOnEventTouchPressed = new Sk.builtin.func(function (button){
        const btn = button[0].v;
        const cb = (btn === 'up') ? touchUpCallback : (btn === 'down') ? touchDownCallback : (btn === 'left') ? touchLeftCallback : touchRightCallback;
        if (!cb) console.warn("no callback found for:", btn);
        Sk.misceval
            .asyncToPromise(function () {
                return Sk.misceval.callsimOrSuspendArray(cb, [""]);
            })
            .then(function (value) {
            }, Simulator.handleError);
        }
    );

    // logs
    // async wait board to ensure that log module is loaded before adding button called in log.add method
    const waitBoard = async () => {
        return new Promise(resolve => {
          const image = document.querySelector('.galaxia-log_base');
          if (image.complete) {
            resolve("board loaded");
          } else {
            image.addEventListener('load', () => resolve("board loaded"));
          }
        });
      };
      
      

    const pulesAnim =  () => {
        $('#galaxia-log_anim').css('opacity', '1');
        setTimeout(() => {
            $('#galaxia-log_anim').css('opacity', '0');
        }, 100);
    }

    var Log = new Sk.misceval.buildClass(thingz, function ($gbl, $loc) {

        Log__init__ = function (self) {
            self.logs = [];
            self.LABELS= [];
            self.initialized = false;
            Simulator.Mosaic.specific.logTable.headers = [];
            Simulator.Mosaic.specific.logTable.rows = [];
            
        };

        Log__init__.co_varnames = ['self'];
        Log__init__.$defaults = [Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(Log__init__);

        $loc.delete = new Sk.builtin.func(function (self) {
            self.logs = [];
            self.LABELS = [];
            Simulator.Mosaic.specific.logTable.headers = [];
            Simulator.Mosaic.specific.logTable.rows = [];
            return Sk.builtin.none();
        });

        $loc.set_columns = new Sk.builtin.func(function (self, labels) {
            const collumns = Sk.ffi.remapToJs(labels);
            self.LABELS = [...collumns ];
            Simulator.Mosaic.specific.logTable.headers = self.LABELS;
            return Sk.builtin.none();
        });

        $loc.add = new Sk.builtin.func(function (self, log) {
            if (!self.initialized) {
                waitBoard().then(() => {
                    Simulator.Mosaic.specific.logTable.openLog();
                    self.initialized = true;
                  });
            }
            const logValue = Sk.ffi.remapToJs(log);
            const line = [];
            for (let i = 0; i < logValue.length; i++) {
                if (logValue[i][0] !== self.LABELS[i]) {
                } else {
                    line.push(logValue[i][1]);
                }
            }
            Simulator.Mosaic.specific.logTable.rows.push(line.join(","));
            pulesAnim();
            return Sk.builtin.none();
        });
    });


    thingz.log = new Log();
    thingz.log.tp$init();

    return thingz;
};

// Define the js callback functions outside the module to be accessible for the event listeners
function simulateButtonAOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventButtonPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}

function simulateButtonBOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventButtonPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}

function simulateTouchUpOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventTouchPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}

function simulateTouchDownOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventTouchPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}

function simulateTouchLeftOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventTouchPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}

function simulateTouchRightOnEvent(input) {
    const skFunc = Sk.globals.simulateOnEventTouchPressed;
    Sk.misceval.asyncToPromise(() => Sk.misceval.callsimOrSuspend(skFunc, [new Sk.builtin.str(input)]))
        .catch(Simulator.handleError);
}