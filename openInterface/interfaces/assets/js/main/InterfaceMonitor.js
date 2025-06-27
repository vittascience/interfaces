const InterfaceMonitor = {

    MAX_CONSOLE_LINES: 500,
    AUTO_SCROLL: true,
    TEXT_COLOR: {
        "default": "var(--text-0)",
        "warning": "red",
        "neutral": "grey",
        "success": "green",
        "interrupt": "orange"
    },
    history: [],
    historyCursor: null,
    tooltips: {
        graphButton: false,
        monitorToggler: false
    },
    heightMemory: 280,

    /**
     * Initialize interface monitor.
     */
    init: function () {
        $("#serial-input").on('keydown', (e) => {
            if ($('input#serial-input').is(':focus')) {
                const keyCode = e.keyCode || e.which;
                if (keyCode == '38') {
                    e.preventDefault();
                    this.navigateHistory(-1);
                } else if (keyCode == '40') {
                    e.preventDefault();
                    this.navigateHistory(1);
                } else if (keyCode == '13') {
                    $('#serial-send').click();
                }
            }
        });

        setTimeout(() => {
            var _this = this;
            $("#auto-scroll-toggle").click(function () {
                if (_this.AUTO_SCROLL) {
                    _this.AUTO_SCROLL = false;
                } else {
                    _this.AUTO_SCROLL = true;
                }
            });
        }, 1000);

        this.addMonitorToolsToDom();
    },

    addMonitorToolsToDom() {
        const monitorTools = document.createElement('div');
        monitorTools.id = "monitor-tools";
        monitorTools.innerHTML =
        `
        <button 
            id="monitor-resizer"
            class="btn"
            data-i18n="[title]code.console.buttons.monitorTool.monitorResizer"
            data-toggle="tooltip"
            data-placement="top"
            title="Redimensionner la console"
        >
            <i class="fas fa-arrows-alt-v" style="position: relative;bottom: 0.35em;right: 0.25em;"></i>
        </button>
        <button id="monitor-toggler" class="btn" onclick="InterfaceMonitor.toggle();"
            data-i18n="[title]code.console.buttons.monitorTool.monitorToggler" data-toggle="tooltip"
            data-placement="top" title="Ouvrir/fermer la console"
        >
            <i class="fas fa-chevron-down"  style="position: relative;right: 0.5em;bottom: 0.3em;"></i>
        </button>
        <div id="monitor-toggler-tooltip" class="interface-tooltip" style="display: none;width: 9em;">
            <div class="interface-tooltip__header">
                <div>
                    <i class="fas fa-info-circle"></i>
                    <b data-i18n="code.simulator.buttons.multi-mode.tooltip.title">Info</b>
                </div>
                <button class="btn v-btn-basic interface-tooltip__header-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <span data-i18n="[html]code.monitor.controls.tooltips.monitorToggler">
                Pour visualiser les données reçues, cliquer sur le bouton
                <b><i class="fas fa-chevron-up"></i></b>
            </span>
        </div>
        `;
        const monitor = document.querySelector("#monitor");
        monitor.insertBefore(monitorTools, monitor.firstChild);
        $('[data-toggle="tooltip"]').tooltip();
    },

    /**
     * This function manage the console input history navigation.
     * @param {int} direction (-1/1)
     */
    navigateHistory(direction) {
        if (this.historyCursor == null) {
            this.historyCursor = this.history.length;
        }
        if ((this.historyCursor > 0 && direction == -1) || (this.historyCursor < this.history.length && direction == 1)) {
            this.historyCursor += direction;
            $("#serial-input").val(this.history[this.historyCursor]);
        }
    },

    /**
     * used in order to write in console. won't write if one of the initFlags are on true;
     * @param {string} message  the message to show
     * @param {string} color the color of the message
     */
    writeConsole(message, color, isPre = false, isBold = false) {
        const monitor = document.querySelector("#console");
        const tag = isPre === true ? 'pre' : 'p';
        if (typeof color == 'undefined' || typeof this.TEXT_COLOR[color] == 'undefined') {
            color = 'default';
        }
        let html = "<" + tag + " style='color:" + this.TEXT_COLOR[color] + ";";
        html += (isBold ? "font-weight: bold;" : '') + "'>";
        const capytaleWelcome = typeof IS_CAPYTALE_CONTEXT !== 'undefined' && /code.welcome/.test(message);
        if (/code.(serialAPI|WebBluetoothAPI|errorMsg|welcome|successMsg)./.test(message) && !capytaleWelcome) {
            html += i18next.t(message);
        } else {
            html += message;
        }
        html += "</" + tag + ">";
        if ((monitor.innerHTML.match(/\r?\n/g) || '').length + 1 > this.MAX_CONSOLE_LINES) {
            let lines = monitor.innerHTML.split(/\r?\n/g);
            lines.splice(0, lines.length - this.MAX_CONSOLE_LINES);
            monitor.innerHTML = lines.join('\r\n');
        }
        monitor.insertAdjacentHTML('beforeend', html);
        if ($('#console').localize && html.match(/data-i18n/)) {
            $('#console').localize();
        }
        this.scrollToBottom();
        if (document.readyState === 'complete') { }
        return true;
    },
    /**
     * Scroll to bottom of monitor.
     */
    scrollToBottom() {
        const monitor = document.querySelector("#console");
        if (this.AUTO_SCROLL) {
            monitor.scrollTo(0, monitor.scrollHeight);
        }
    },
    /**
     * Print readings from serial port on Arduino & mBot1
     * @param {string} text 
     */
    printReadings(text) {
        const monitor = document.querySelector("#console");
        if ((monitor.innerHTML.match(/\r?\n/g) || '').length + 1 > this.MAX_CONSOLE_LINES) {
            const lines = monitor.innerHTML.split(/\r?\n/g);
            lines.splice(0, lines.length - this.MAX_CONSOLE_LINES);
            monitor.innerHTML = lines.join('\r\n');
        }
        monitor.innerHTML += text.replace(/ /g, '&nbsp;');
        this.scrollToBottom();
    },

    /**
     * Parse data from monitor to retrive graphical data.
     * @param {string} data 
     * @returns {Array<Array>} chartData
     */
    getChartData: function (data) {
        data = data.trim();
        if (data.match(/:(@Graph:.+)/g)) {
            data = '@Graph:' + data.split('@Graph:')[1];
        }
        if (!data.match(/(@Graph:.+)/g))
            return;
        data = data.substr(7, data.length);
        let fullValues = data.split("|");
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
        let chartData = [];
        for (var i = 0; i < validDataLength + 1; i++) {
            chartData.push([columnNames[i], columnValues[i]]);
        }
        return chartData;
    },

    /**
     * Update curves of chart.
     * @param {string} message 
     */
    sendDataToChart(message) {
        if (!message.match(/^@Graph:/)) {
            return;
        }
        const parsedArray = this.getChartData(message);
        if (parsedArray) {
            updateChart(parsedArray);
            prepareToApi(parsedArray);
        }
    },

    /**
     * Open specified panel by clicking on one monitor button.
     * @param {string} panel 
     */
    managePanel: function (panel) {
        $('.monitor-view-btn').prop('disabled', true);

        switch (panel) {
            case "graph":
                this.heightMemory = $('#monitor').height();
                $('#music-tab').hide();
                $('#console, #monitor-controls-console').hide();
                this.openGraph();
                break;
            case "music":
                $('#console, #monitor-controls-console').hide();
                $('#graph-tab, #monitor-controls-graph').hide();
                this.openMusic();
                break;
            case "console":
            default:
                $('#music-tab').hide();
                $('#graph-tab, #monitor-controls-graph').hide();
                this.openConsole();
                break;
        }

        setTimeout(function () {
            $('.monitor-view-btn').prop('disabled', false);
        }, 400);
    },

    openConsole: function () {
        if (!$('#monitor-btn-console').hasClass('activated')) {
            $('.monitor-view-btn').removeClass('activated');
            $('#monitor-btn-console').addClass('activated');
            $("#console, #monitor-controls-console").fadeIn("slow");
            $('#monitor-controls-console').css({
                display: 'flex'
            });
            if (getParamValue('console') == 'bottom') {
                this.toggle(this.heightMemory);
            }
        }
    },

    openGraph: function () {
        $('.monitor-view-btn').removeClass('activated');
        $('#monitor-btn-graph').addClass('activated');
        $("#graph-tab, #monitor-controls-graph").fadeIn("slow");
        $('#monitor-graph-tooltip').remove();
        $('#monitor-controls-graph').css({
            display: 'flex'
        });
        if (getParamValue('console') == 'bottom' && $('#monitor').height() < 400) {
            this.toggle(500);
        }
    },

    openMusic: function () {
        $('.monitor-view-btn').removeClass('activated');
        $('#monitor-btn-music').addClass('activated');
        $("#music-tab").fadeIn("slow");
        if (getParamValue('console') == 'bottom') {
            this.toggle(this.heightMemory);
        }
    },

    clear: function () {
        $('#console').html("");
        VittaInterface.displayWelcome();
        if (Repl && $('#repl-control').hasClass("activated")) {
            this.writeConsole('>>> ');
        }
    },

    getPosition() {
        let consolePos = null;
        if (!consolePos && $_GET("console")) {
            consolePos = $_GET("console");
        }
        if (!consolePos && localStorage.console) {
            consolePos = JSON.parse(localStorage.console)[INTERFACE_NAME];
        }
        if (consolePos !== 'right') {
            consolePos = 'bottom';
        }
        return consolePos;
    },

    getHeightToExpand(height) {
        if (height === undefined) {
            height = this.heightMemory;
        }
        if (height > $('.ide-base').height() * 0.90) {
            height = 210;
        }
        return height;
    },

    getWidthToExpand() {
        const hideSerialButtons = function () {
            const hideElts = document.querySelectorAll('#monitor-div-btn .hide');
            for (const hideElt of hideElts) {
                hideElt.style.display = 'none';
            }
        };
        let width;
        if ($_GET("mode") && $_GET("mode") == "consoleOnly") {
            width = '100%';
        } else if ($('.ide-base').width() * 0.3 < '200') {
            width = '50%';
            hideSerialButtons();
        } else {
            width = '30%';
            hideSerialButtons();
        }
        return width;
    },

    /**
     * Open or close the console
     * @param {int} height height of the console we want in PIXEL
     */
    toggle(height) {

        const open = function () {
            $("#monitor").removeClass('monitor-closed');
            $("#monitor").addClass('monitor-open');
            $('#monitor-view, #monitor-controls').show();
            $("#monitor-debugger-wrapper").show();
            $('#monitor-tools #monitor-toggler i').removeClass("fa-chevron-up");
            $('#monitor-tools #monitor-toggler i').addClass("fa-chevron-down");
        };
        const close = function () {
            $("#monitor").removeClass('monitor-open');
            $("#monitor").addClass('monitor-closed');
            $('#monitor-view, #monitor-controls').hide();
            $("#monitor-debugger-wrapper").hide();
            $('#monitor-tools #monitor-toggler i').removeClass("fa-chevron-down");
            $('#monitor-tools #monitor-toggler i').addClass("fa-chevron-up");
        };

        const storageConsole = getOptionStorage('console', 'bottom', ["bottom", "right"]);
        if (storageConsole[INTERFACE_NAME] == 'right') {

            if ($('#monitor').hasClass('monitor-closed')) {
                //Case collapsed
                open();
                const width = this.getWidthToExpand();
                $('.ide-editor').animate({
                    width: `${100 - parseInt(width)}%`
                }, 'fast', 'linear', {
                    queue: false
                });
                $('#monitor').animate({
                    width: `${width}`
                }, 'fast', 'linear', function () {
                    Main.resizeWorkSpace();
                    Main.resizeAceEditor();
                });

            } else {
                //Case expanded
                const resize = function () {
                    $('.ide-editor').width('100%');
                    Main.resizeWorkSpace();
                    Main.resizeAceEditor();
                };
                this.heightMemory = $('#monitor').height();
                close();
                $('.ide-editor').animate({
                    width: '100%'
                }, 'fast', 'linear', resize);
                $('#monitor').animate({
                    width: '0'
                }, 'fast', 'linear', function () {
                    Main.resizeWorkSpace();
                    Main.resizeAceEditor();
                }, {
                    /* needed from the slideDown from top to bottom don't ask why */
                    step: resize,
                    complete: resize
                }, 'fast');
            }

        } else {
            const resize = function () {
                Main.resizeAceEditor();
                if (!Main.hasDragAndDrop() && Main.getCodingMode != 'code') {
                    Main.resizeWorkSpace();
                }
            };
            if ($('#monitor').hasClass('monitor-closed') || height !== undefined) {
                // Case collapsed
                $('#monitor-tools').toggleClass('monitor-tools-collapsed-bottom');
                open();
                height = this.getHeightToExpand(height);
                $('#monitor').animate({
                    height: `${height}px`
                }, 'fast', 'linear', resize);
                $('.ide-editor').animate({
                    height: ($('.ide-base').height() - height) + 'px'
                }, 'fast', 'linear', resize);

            } else {
                // Case expanded
                this.heightMemory = $('#monitor').height();
                close();
                $('#monitor').animate({
                    height: '0'
                }, {
                    step: function () {
                        /* needed from the slideDown from top to bottom */
                        $('.ide-editor').height('100%');
                        Main.resizeAceEditor();
                    },
                    complete: function () {
                        $('.ide-editor').height('100%');
                        $('#monitor-view').css('margin-top', '0px');
                        resize();
                    }
                }, 'fast');
            }
        }
    }

};