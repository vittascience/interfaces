let LedMatrixModalManager = {
    img_selected: $('.img-selected'),
    matrix_base64: "",
    init: function (led_size = 34) {
        LedMatrixModalManager.setModal(this.options.column_size * led_size, this.options.line_size * led_size);
        LedMatrixModalManager.setSuggestions();
        if ($("#matrix").children().length == 0) {
            // create matrix
            LedMatrixModalManager.create_columns(this.options.column_size, led_size);
            LedMatrixModalManager.create_lines(this.options.line_size, led_size);
            LedMatrixModalManager.create_matrix(this.options.column_size, this.options.line_size, led_size);
            //click events listener
            LedMatrixModalManager.enable_painting('#edit_leds_matrix svg rect');
            $('.suggestion-img').click(LedMatrixModalManager.change_leds_matrix_from_img);
            $('.suggestion-img').on('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    $(this).trigger('click');
                }
            });
        }
        //init matrix
        $('.img-selected').trigger('click');
        //get base 64
        LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
        // set the css of the modal 
        if ($(".ide-block").width() < (this.options.column_size * led_size))
            LedMatrixModalManager.resize_mod();
        else
            LedMatrixModalManager.basic_mod();
        //lock for the first init (prevents the generation of more than one matrix)
        Blockly.Constants.LOCK_INIT = 1;
    },
    isSet: function () {
        return $("#matrix").children().length != 0;
    },
    img_to_binary: function (img) {
        let binary_img_line_by_line = [],
            line = "",
            img_split = img.split(',');
        line += ((img_split[0] == "#f5f5f5") ? "0" : "1");
        // convert img tab to binary
        for (var i = 1; i < img_split.length + 1; i++) {
            if (i % this.options.column_size == 0) {
                binary_img_line_by_line.push(line);
                line = "";
            }
            line += ((img_split[i] == "#f5f5f5") ? "0" : "1");
        }
        // convert img tab from line by line to col by col 
        let binary_img_col_by_col = [],
            column = "";
        for (var i = 0; i < binary_img_line_by_line[0].length; i++) {
            for (var j = 0; j < binary_img_line_by_line.length; j++) {
                column += binary_img_line_by_line[j][i];
            }
            binary_img_col_by_col.push(column);
            column = "";
        }
        return binary_img_col_by_col.join(',');
    },
    load_matrix_from_block: function () {
        let binary_matrix_col_by_col = Blockly.Constants.LEDS_MATRIX_BLOCK.getText().split(','),
            colors = [],
            leds = $('#edit_leds_matrix svg rect');
        while (binary_matrix_col_by_col.length < LedMatrixModalManager.options.column_size) {
            binary_matrix_col_by_col.push('0'.repeat(LedMatrixModalManager.options.line_size));
        }

        for (var i = 0; i < binary_matrix_col_by_col[0].length; i++)
            for (var j = 0; j < binary_matrix_col_by_col.length; j++)
                colors.push((binary_matrix_col_by_col[j][i] == '0') ? '#f5f5f5' : LedMatrixModalManager.options.color);
        for (let i = 0; i < leds.length; i++)
            leds[i].attributes['fill']['value'] = colors[i];

    },
    get_matrix_base64: function (matrix) {
        let s = new XMLSerializer().serializeToString(matrix);
        let encodedData = window.btoa(s);
        return "data:image/svg+xml;base64," + encodedData;
    },
    confirm_matrix: function () {
        //get leds data
        let leds = $('#edit_leds_matrix svg rect'),
            new_dataset = [];
        for (let i = 0; i < leds.length; i++)
            new_dataset.push(leds[i].attributes['fill']['value']);
        new_dataset = new_dataset.join(',');
        LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
        Blockly.Constants.LEDS_MATRIX_BLOCK.setValue(LedMatrixModalManager.matrix_base64);
        const data = LedMatrixModalManager.img_to_binary(new_dataset);
        Blockly.Constants.LEDS_MATRIX_BLOCK.setAlt(data);
        pseudoModal.closeModal('popup_matrix_LED');
    },
    cancel_matrix: function () {
        let leds = $('#edit_leds_matrix svg rect');
        for (let i = 0; i < leds.length; i++)
            leds[i].attributes['fill']['value'] = Blockly.Constants.LEDS_MATRIX[i];
        pseudoModal.closeModal('popup_matrix_LED');
    },
    // Labels are exactly one LED wide/high so they stay aligned with the matrix whatever its size
    create_columns: function (number, size) {
        let columns_string = "";
        for (var i = 0; i < number; i++)
            columns_string = columns_string + `<span style="width:${size}px;text-align:center;flex:none">${i}</span>`;
        $('#columns').append(columns_string);
    },
    create_lines: function (number, size) {
        var lines_string = "";
        for (var i = 0; i < number; i++)
            lines_string = lines_string + `<span style="height:${size}px;line-height:${size}px;width:20px;text-align:center">${String.fromCharCode(65 + i)}</span>`;
        $('#lines').append(lines_string);
    },
    /**
     * Click toggles a LED; holding the left button down paints the hovered LEDs with the color of the first one
     * (drawing or erasing). elementFromPoint also follows a finger on touch screens.
     * @param {string} selector LEDs of the modal matrix
     */
    enable_painting: function (selector) {
        const leds = document.querySelectorAll(selector);
        const svg = leds.length ? leds[0].ownerSVGElement : null;
        if (!svg) return;
        let paintColor = null;
        svg.style.touchAction = 'none';
        leds.forEach(led => led.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            LedMatrixModalManager.change_led_color.call(led);
            paintColor = led.attributes['fill']['value'];
        }));
        svg.addEventListener('pointermove', (e) => {
            if (paintColor === null) return;
            const led = document.elementFromPoint(e.clientX, e.clientY);
            if (led && led.tagName === 'rect' && led.parentNode === svg) {
                led.attributes['fill']['value'] = paintColor;
            }
        });
        document.addEventListener('pointerup', () => { paintColor = null; });
    },
    change_led_color: function () {
        let color = $(this)[0].attributes['fill']['value'];
        $(this)[0].attributes['fill']['value'] = (color == "#f5f5f5") ? LedMatrixModalManager.options.color : "#f5f5f5";
    },
    create_rect: function (parameters) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        for (var p in parameters) // tranform strokeWidth -> stroke-width
            rect.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) { return "-" + m.toLowerCase(); }), parameters[p]);
        return rect
    },
    create_matrix: function (columns, lines, size) {
        const matrix = document.getElementById('matrix');
        for (var i = 0; i < lines; i++) {
            for (var j = 0; j < columns; j++) {
                matrix.appendChild(LedMatrixModalManager.create_rect(LedMatrixModalManager.led_parameters(j, i, size, '#f5f5f5')));
            }
        }
    },
    // SVG attributes of one LED (rounded square), shared by the modal matrix, the thumbnails and the block image
    led_parameters: function (col, row, size, fill) {
        return { fill: fill, strokeWidth: '1', stroke: '#E0E5EB', x: 3 + col * size, y: 3 + row * size, rx: 12, ry: 12, width: size - 4, height: size - 4 };
    },
    set_matrix: function (img) {
        let colors = img.dataset.actionValue.split(","),
            leds = $('#edit_leds_matrix svg rect');
        for (let i = 0; i < leds.length; i++)
            leds[i].attributes['fill']['value'] = colors[i];
    },
    change_leds_matrix_from_img: function () {
        LedMatrixModalManager.img_selected = $(this);
        LedMatrixModalManager.set_matrix(this);
        if (!LedMatrixModalManager.img_selected.hasClass('img-selected')) {
            $('.suggestion-img').removeClass('img-selected');
            $(this).addClass('img-selected');
        }
        $(this).removeClass('suggestion-img');
        $(this).css('border', 'solid ' + LedMatrixModalManager.options.color + ' 1px');
        $(this).addClass('suggestion-img', 1000);
    },
    get_matrix_color: function () {
        let leds = $('#edit_leds_matrix svg rect'),
            color = [];
        for (let i = 0; i < leds.length; i++)
            color.push(leds[i].attributes['fill']['value'])
        return color.join(',');
    },
    get_matrix_dataset: function () {
        let leds = $('#edit_leds_matrix svg rect'),
            new_dataset = [];
        for (let i = 0; i < leds.length; i++)
            new_dataset.push(leds[i].attributes['fill']['value']);
        return new_dataset;
    },
    disp_modal: function () {
        pseudoModal.openModal('popup_matrix_LED');
    },
    resize_mod: function () {
        $('#leds_matrix').after($('#suggestions'));
    },
    basic_mod: function () {
        $('#edit_leds_matrix').after($('#suggestions'));
    },
    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    dark_mode_examples_imgs: function () {
        let rgb = $('#popup_matrix_LED').css("background-color").match(/\d+/g);
        let r = parseInt(rgb[0]),
            g = parseInt(rgb[1]),
            b = parseInt(rgb[2]);
        let color = "#" + LedMatrixModalManager.componentToHex(r) + LedMatrixModalManager.componentToHex(g) + LedMatrixModalManager.componentToHex(b);

        if (color == "#f5f5f5" && $(".img-selected").attr("src").includes("dark_mode_")) {
            $(".suggestion-img").each(function () {
                let new_src = $(this).attr('src').replace('dark_mode_', '');
                $(this).attr('src', new_src);
            });
        } else if (color != "#f5f5f5" && !$(".img-selected").attr("src").includes("dark_mode_")) {
            $(".suggestion-img").each(function () {
                if (!$(this).attr('src').includes("dark_mode_")) {
                    let new_src = $(this).attr('src').split('/');
                    new_src[new_src.length - 1] = 'dark_mode_' + new_src[new_src.length - 1];
                    $(this).attr('src', new_src.join('/'));
                }
            });
        }
    },
    setModal: function (width, height) {
        let html = `<section id="popup_matrix_LED">`;
        let header = `<section class="vitta-modal-led-header">
                        <span class="vitta-modal-title-led-matrix">
                            <span>${jsonPath('modals.led-matrix.title')}</span>
                        </span>
                        <button class="btn vitta-modal-exit-btn" type="button" title="Fermer la modale" onclick="LedMatrixModalManager.cancel_matrix()">
                            <i class="fa fa-times"></i>
                        </button>
                    </section>`
        // #matrix: no padding, with border-box sizing it would shrink the SVG and shift the LEDs away from their labels
        let content = `<section id="content_popup">
                            <section id="leds_matrix">
                                <section id="edit_leds_matrix">
                                    <section style="display: flex;flex-direction:column">
                                        <section style="display:flex;flex-direction:row;margin-left: 5px;justify-content:center">
                                            <span style="width:20px;flex:none"></span>
                                            <section id="columns" style="width:` + width + `px;justify-content:flex-start"></section>
                                        </section>
                                        <section style="display: flex;flex-direction:row;margin-left: 5px;justify-content:center">
                                            <section id="lines"></section>
                                            <svg id="matrix" style="padding:0" width="` + width + `" height="` + height + `" viewBox="0 0 ` + width + ` ` + height + ` "></svg>
                                        </section>
                                    </section>
                                </section>
                                    <div id="suggestions"></div>
                                </section>
                            </section>`;
        let footer = `<section class="vitta-modal-led-footer">
                            <div class="modal-footer-div" style="width: 30%;">
                                <button type="button" class="btn v-btn-basic mr-1" style="flex:1;" onclick="LedMatrixModalManager.cancel_matrix()">Annuler</button>
                                <button type="button" class="btn v-btn ml-1" style="flex:1;" onclick ="LedMatrixModalManager.confirm_matrix()">Valider</button>
                            </div>
                        </section>`;

        html += header + content + footer + `</section>`;
        $('body').append(html);
        pseudoModal.add('popup_matrix_LED');
    },
    setSuggestions: function () {
        // One column per entry of suggestions_order
        const container = document.querySelector("#leds_matrix #suggestions");
        const suggestions = LedMatrixModalManager.options.suggestions_order.map(() => {
            const column = document.createElement("div");
            column.className = "suggestions-column";
            // Same spacing in every column, even when they don't hold the same number of examples
            column.style.justifyContent = "flex-start";
            column.style.gap = "6px";
            return container.appendChild(column);
        });
        for (var column = 0; column < suggestions.length; column++) {
            const column_ids = LedMatrixModalManager.options.suggestions_order[column];
            for (var i = 0; i < column_ids.length; i++) {
                const img = document.createElement("img");
                const id = column_ids[i];
                img.setAttribute("id", `suggestion-img-${id}.png`);
                const action_data = LedMatrixModalManager.decodeFrameToColors(LedMatrixModalManager.options.suggestions_data[id]);
                // Arduino boards: draw the thumbnail from the frame (the PNG are red, 12 columns, of various sizes)
                img.setAttribute("src", ['arduino', 'arduinoq'].includes(INTERFACE_NAME)
                    ? LedMatrixModalManager.thumbnail(action_data)
                    : `${LedMatrixModalManager.options.suggestion_path}${id}.png`);
                img.setAttribute("data-action-value", action_data);
                img.setAttribute('class', 'suggestion-img');
                img.setAttribute('tabindex', '0');
                img.setAttribute('role', 'button');
                suggestions[column].appendChild(img);
            }
        }
    },
    /**
     * SVG thumbnail of a matrix, as drawn in the modal.
     * @param {string} colors comma separated LED colors, row by row
     */
    thumbnail: function (colors, options = this.options) {
        const leds = colors.split(','), columns = options.column_size, width = columns * 34, height = options.line_size * 34;
        const toAttributes = parameters => Object.entries(parameters).map(([key, value]) => `${key.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}="${value}"`).join(' ');
        let rects = '';
        leds.forEach((fill, i) => {
            rects += `<rect ${toAttributes(LedMatrixModalManager.led_parameters(i % columns, Math.floor(i / columns), 34, fill))}/>`;
        });
        return "data:image/svg+xml;base64," + window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" id="matrix" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects}</svg>`);
    },
    decodeFrameToColors(frame_data) {
        let bits = [];
        if (['arduino', 'arduinoq'].includes(INTERFACE_NAME)) {
            for (let w = 0; w < frame_data.length; w++) {
                const bin = frame_data[w].toString(2).padStart(32, "0");
                for (let b of bin) {
                    bits.push(Number(b));
                }
            }
            // 12-column frames (3 words, UNO R4) or 13-column ones (4 words, UNO Q): fit each row to the matrix width
            const frameColumns = frame_data.length > 3 ? 13 : 12;
            bits = Array.from({ length: 8 }, (_, row) => {
                const line = bits.slice(row * frameColumns, (row + 1) * frameColumns).slice(0, this.options.column_size);
                return line.concat(Array(this.options.column_size - line.length).fill(0));
            }).flat();
        } else {
            for (let y = 0; y < this.options.line_size; y++) {
                for (let x = 0; x < this.options.column_size; x++) {
                    const bit = (frame_data[x] >> (7 - y)) & 1;
                    bits.push(bit);
                }
            }
        }
        const colored = bits.map(b => (b ? LedMatrixModalManager.options.color : "#f5f5f5"));
        return colored.join(",");
    }
}