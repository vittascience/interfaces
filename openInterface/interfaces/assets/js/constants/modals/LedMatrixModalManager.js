let LedMatrixModalManager = {
    img_selected: "",
    matrix_base64: "",
    example_imgs_path: "/openInterface/interfaces/assets/media/matrix_8x8_icons/",
    isRGB: false,
    led_color: "",
    width: 0,
    init: function (width_led, height_led, isRGB = false, led_color = "", led_size = 34) {
        //set if the leds are RGV or not
        LedMatrixModalManager.isRGB = isRGB;
        LedMatrixModalManager.width = width_led;
        //insert modal in the body
        if (LedMatrixModalManager.isRGB) {
            LedMatrixModalManager.setModalRGB(width_led * led_size, height_led * led_size);
            $('#color-container').append(LedMatrixModalManager.create_color_picker());
        } else {
            LedMatrixModalManager.setModal(width_led * led_size, height_led * led_size);
        }
        // create matrix
        LedMatrixModalManager.create_columns(width_led);
        LedMatrixModalManager.create_lines(height_led);
        LedMatrixModalManager.create_matrix(width_led, height_led, led_size);
        //set examples images
        LedMatrixModalManager.setExamples();
        //click events listener
        $('.suggestion-img').click(LedMatrixModalManager.change_leds_matrix_from_img);
        if (LedMatrixModalManager.isRGB) {
            //change led color on click
            $('#edit_leds_matrix_rgb svg rect').click(LedMatrixModalManager.change_led_color);
            // change color picker on click
            $('.picker').click(LedMatrixModalManager.update_color_picker);
            //init matrix with img
            $('#suggestions_rgb .img-selected').trigger('click');
        }
        else {
            LedMatrixModalManager.led_color = led_color;
            //LedMatrixModalManager.img_selected = $('#suggestions .img-selected');
            $('#edit_leds_matrix svg rect').click(LedMatrixModalManager.change_led_color);
            //init matrix with img
            $('#suggestions .img-selected').trigger('click');
        }
        //get base 64
        if (LedMatrixModalManager.isRGB)
            LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix_rgb"));
        else
            LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
        // set the css of the modal 
        if ($(".ide-block").width() < 550)
            LedMatrixModalManager.resize_mod();
        else
            LedMatrixModalManager.basic_mod();
    },
    isSet: function (rgb = false) { // check if the matrix is init or not
        if (rgb)
            return $("#matrix_rgb").children().length != 0;
        else
            return $("#matrix").children().length != 0;
    },
    img_to_binary: function (img) {
        console.log("img_to_binary()")
        const bg = "#f5f5f5";
        const w = LedMatrixModalManager.width;
        const img_split = img.split(',');
        // lignes
        let binary_img_line_by_line = [];
        let line = "";
        for (let i = 0; i < img_split.length; i++) {
            line += (img_split[i] === bg) ? "0" : "1";
            if ((i + 1) % w === 0) {
                binary_img_line_by_line.push(line);
                line = "";
            }
        }
        // colonnes
        let binary_img_col_by_col = [];
        for (let i = 0; i < binary_img_line_by_line[0].length; i++) {
            let column = "";
            for (let j = 0; j < binary_img_line_by_line.length; j++) {
                column += binary_img_line_by_line[j][i];
            }
            column = column.split('').reverse().join('');
            column = column.slice(1) + column[0];
            binary_img_col_by_col.push(column);
        }
        return binary_img_col_by_col.join(',');
    },
    load_matrix_from_block: function (isRGB = false) { // gets the image of the block and inserts it in the modal
        LedMatrixModalManager.isRGB = isRGB;
        const bg = '#f5f5f5';
        const rotr1 = (s) => s[s.length - 1] + s.slice(0, -1);          // rotate right 1
        const reverseStr = (s) => s.split('').reverse().join('');       // reverse bits
        let binary_matrix_col_by_col = "";
        let colors = [];
        let leds = "";
        if (LedMatrixModalManager.isRGB) {
            binary_matrix_col_by_col = Blockly.Constants.RGB_LEDS_MATRIX_BLOCK.getText().split(',');
            leds = $('#edit_leds_matrix_rgb svg rect');
            for (let i = 0; i < binary_matrix_col_by_col.length; i++) {
                colors.push(binary_matrix_col_by_col[i]);
            }
        } else {
            binary_matrix_col_by_col = Blockly.Constants.LEDS_MATRIX_BLOCK.getText().split(',');
            leds = $('#edit_leds_matrix svg rect');
            const cols_ui = binary_matrix_col_by_col.map(col_ctrl => reverseStr(rotr1(col_ctrl)));
            for (let i = 0; i < cols_ui[0].length; i++) {        // lignes
                for (let j = 0; j < cols_ui.length; j++) {       // colonnes
                    colors.push((cols_ui[j][i] === '0') ? bg : LedMatrixModalManager.led_color);
                }
            }
        }
        for (let i = 0; i < leds.length; i++) {
            leds[i].attributes['fill']['value'] = colors[i];
        }
    },
    get_matrix_base64: function (matrix) { // converts the image to base 64 to be stored in the block
        let s = new XMLSerializer().serializeToString(matrix);
        let encodedData = window.btoa(s);
        return "data:image/svg+xml;base64," + encodedData;
    },
    confirm_matrix: function () { // event triggered when the confirm button is pressed -> saves the matrix in the block + updates the block image
        //get leds data
        let leds = ((LedMatrixModalManager.isRGB) ? $('#edit_leds_matrix_rgb svg rect') : $('#edit_leds_matrix svg rect')),
            new_dataset = [];
        for (let i = 0; i < leds.length; i++)
            new_dataset.push(leds[i].attributes['fill']['value']);
        new_dataset = new_dataset.join(',');
        if (LedMatrixModalManager.isRGB) {
            LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix_rgb"));
            Blockly.Constants.RGB_LEDS_MATRIX_BLOCK.setValue(LedMatrixModalManager.matrix_base64);
            Blockly.Constants.RGB_LEDS_MATRIX_BLOCK.setAlt(LedMatrixModalManager.get_matrix_color());
            Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX.setValue(LedMatrixModalManager.get_matrix_color());
            $('#popup_matrix_LED_RGB,.overlay').css('display', 'none');
        } else {
            LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
            Blockly.Constants.LEDS_MATRIX_BLOCK.setValue(LedMatrixModalManager.matrix_base64);
            Blockly.Constants.LEDS_MATRIX_BLOCK.setAlt(LedMatrixModalManager.img_to_binary(new_dataset));
            Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.setValue(LedMatrixModalManager.img_to_binary(new_dataset));
            $('#popup_matrix_LED,.overlay').css('display', 'none');
        }
    },
    cancel_matrix: function () { // event triggered when the cancelled button is pressed -> retrieves the old block matrix and loads it into the modal
        let leds = "";
        if (LedMatrixModalManager.isRGB) {
            leds = $('#edit_leds_matrix_rgb svg rect');
            $('#popup_matrix_LED_RGB,.overlay').css('display', 'none');
            for (let i = 0; i < leds.length; i++)
                leds[i].attributes['fill']['value'] = Blockly.Constants.RGB_LEDS_MATRIX[i];
        } else {
            leds = $('#edit_leds_matrix svg rect');
            $('#popup_matrix_LED,.overlay').css('display', 'none');
            for (let i = 0; i < leds.length; i++)
                leds[i].attributes['fill']['value'] = Blockly.Constants.LEDS_MATRIX[i];
        }
    },
    create_columns: function (number) {
        let columns_string = '';
        for (var i = 0; i < number; i++)
            columns_string = columns_string + '<span  align="center">' + i + '</span>';
        if (LedMatrixModalManager.isRGB)
            $('#columns_rgb').append(columns_string);
        else
            $('#columns').append(columns_string);
    },
    create_lines: function (number) {
        var lines_string = "";
        for (var i = 0; i < number; i++)
            lines_string = lines_string + "<span>" + String.fromCharCode(65 + i) + "</span>";
        if (LedMatrixModalManager.isRGB)
            $('#lines_rgb').append(lines_string);
        else
            $('#lines').append(lines_string);
    },
    change_led_color: function () { //"#00b9ff" -> blue
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        let color = $(this)[0].attributes['fill']['value'];

        if (LedMatrixModalManager.isRGB) {
            let color_picker = rgb2hex($('#color-show').css("background-color"));
            $(this)[0].attributes['fill']['value'] = (color == color_picker) ? "#000000" : color_picker;
        } else {
            $(this)[0].attributes['fill']['value'] = (color == "#f5f5f5") ? LedMatrixModalManager.led_color : "#f5f5f5";
        }
    },
    create_rect: function (parameters) { // create svg rect
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        for (var p in parameters) // tranform strokeWidth -> stroke-width
            rect.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) { return "-" + m.toLowerCase(); }), parameters[p]);
        return rect
    },
    create_matrix: function (columns, lines, size) { // create the whole matrix
        // parameters for the svg rect
        let parameters = {
            fill: '#f5f5f5',
            strokeWidth: '1',
            stroke: '#808080',
            x: 3,
            y: 3,
            rx: 12,
            ry: 12,
            width: 30,
            height: 30
        }
        let matrix_selector = "";
        if (LedMatrixModalManager.isRGB)
            matrix_selector = 'matrix_rgb';
        else
            matrix_selector = 'matrix';
        for (var i = 0; i < lines; i++) {
            for (var j = 0; j < columns; j++) {
                document.getElementById(matrix_selector).appendChild(LedMatrixModalManager.create_rect(parameters));
                parameters['x'] += size;
            }
            parameters['x'] = 3;
            parameters['y'] += size;
        }
    },
    create_color_picker: function () {
        var out = ['<table id="color-picker-bar">'];
        out.push('<tr>');
        for (var i = 0; i < 256; i++)
            out.push('<td class="picker color-' + i + '" color-number="' + i + '" ></td>');
        out.push('</tr>');
        out.push('</table>');
        return out.join('');
    },
    set_matrix: function (img) {
        let colors = img.dataset.actionValue.split(","),
            leds = ((LedMatrixModalManager.isRGB) ? $('#edit_leds_matrix_rgb svg rect') : $('#edit_leds_matrix svg rect'));
        for (let i = 0; i < leds.length; i++)
            leds[i].attributes['fill']['value'] = colors[i];
    },
    change_leds_matrix_from_img: function () {
        if (LedMatrixModalManager.isRGB)
            $("#color-show").css("background-color", LedMatrixModalManager.DRAW_BITMAP_RGB[$(this).attr('name')].color);

        LedMatrixModalManager.set_matrix(this);

        if (!$(this).hasClass('img-selected')) {
            $('.suggestion-img').removeClass('img-selected');
            $(this).addClass('img-selected');
        }
        $(this).removeClass('suggestion-img');
        $(this).css('border', 'solid #00b9ff 1px');
        $(this).addClass('suggestion-img', 1000);
    },
    update_color_picker: function () {
        let color = $(this).attr('color-number');
        $('body').find('#color-show').css("background-color", $(this).css("background-color"));
        $('body').find('#color-word').html('HEX : 0x' + ('00' + parseInt(color, 10).toString(16)).substr(-2));
    },
    get_matrix_color: function () {
        let leds = ((LedMatrixModalManager.isRGB) ? $('#edit_leds_matrix_rgb svg rect') : $('#edit_leds_matrix svg rect')),
            color = [];
        for (let i = 0; i < leds.length; i++)
            color.push(leds[i].attributes['fill']['value'])
        return color.join(',');
    },
    get_matrix_dataset: function () {
        let leds = ((LedMatrixModalManager.isRGB) ? $('#edit_leds_matrix_rgb svg rect') : $('#edit_leds_matrix svg rect')),
            new_dataset = [];
        for (let i = 0; i < leds.length; i++)
            new_dataset.push(leds[i].attributes['fill']['value']);
        return new_dataset;
    },
    disp_modal: function () {
        if (INTERFACE_NAME == 'mbot')
            LedMatrixModalManager.dark_mode_examples_imgs();
        if (LedMatrixModalManager.isRGB)
            $("#popup_matrix_LED_RGB,.overlay").css("display", "block");
        else
            $("#popup_matrix_LED,.overlay").css("display", "block");
    },
    resize_mod: function () {
        if (LedMatrixModalManager.isRGB)
            $('#leds_matrix_rgb').after($('#suggestions_rgb'));
        else
            $('#leds_matrix').after($('#suggestions'));
    },
    basic_mod: function () {
        if (LedMatrixModalManager.isRGB)
            $('#edit_leds_matrix_rgb').after($('#suggestions_rgb'));
        else
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
                        <div class="btn vitta-modal-exit-btn" type="button"  title="Fermer la modale" onclick="LedMatrixModalManager.cancel_matrix()">
                            <i class="fa fa-times"></i>
                        </div>
                    </section>`
        let content = `<section id="content_popup">
                            <section id="leds_matrix">
                                <section id="edit_leds_matrix">
                                    <section style="display: flex;flex-direction:column">
                                        <section style="display:flex;justify-content:center">
                                            <section id="columns" style="width:` + width + `px;margin-left:10.75px"></section>
                                        </section>
                                        <section style="display: flex;flex-direction:row;margin-left: 5px;justify-content:center">
                                            <section id="lines"></section>
                                            <svg id="matrix" width="` + width + `" height="` + height + `" viewBox="0 0 ` + width + ` ` + height + ` "></svg>
                                        </section>
                                    </section>
                                </section>
                                <div id="suggestions">
                                    <div class="suggestions-column">
                                        <img class="suggestion-img img-selected" src="" data-action-value= ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                    </div>
                                    <div class="suggestions-column">
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value = ''>
                                        <img class="suggestion-img" src="" data-action-value= ''>
                                    </div>
                                </div>
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
    },
    setModalRGB: function (width, height) {
        let html = `<section id="popup_matrix_LED_RGB">`;
        let header = `<section class="vitta-modal-led-header">
                        <span class="vitta-modal-title-led-matrix">
                            <span>${jsonPath('modals.led-matrix.title-rgb')}</span>
                        </span>
                        <div class="btn vitta-modal-exit-btn" type="button"  title="Fermer la modale" onclick="LedMatrixModalManager.cancel_matrix()">
                            <i class="fa fa-times"></i>
                        </div>
                    </section>`
        let content = `<section id="content_popup_rgb">
                            <section id="leds_matrix_rgb">
                                <section id="edit_leds_matrix_rgb">
                                    <section style="display: flex;flex-direction:column">
                                        <section style="display:flex;justify-content:center">
                                            <section id="columns_rgb" style="width:` + width + `px;margin-left:10.75px"></section>
                                        </section>
                                        <section style="display: flex;flex-direction:row;margin-left: 5px;justify-content:center">
                                            <section id="lines_rgb"></section>
                                            <svg id="matrix_rgb" width="` + width + `" height="` + height + `" viewBox="0 0 ` + width + ` ` + height + ` "></svg>
                                        </section>
                                    </section>
                                </section>
                                <div id="suggestions_rgb">
                                    <div class="suggestions-column">
                                        <img class="suggestion-img img-selected" name = "" src="" data-action-value= ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                    </div>
                                    <div class="suggestions-column">
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value = ''>
                                        <img class="suggestion-img" name = "" src="" data-action-value= ''>
                                    </div>
                                </div>
                                <div id="color-picker">
                                    <label>
                                        <span>${jsonPath('modals.led-matrix.color')}</span>
                                        <p id='color-show'></p>
                                    </label>
                                    <!-- <input type="color" id="led-color" name="led-color" value="#00b9ff">   -->
                                    <p id="color-container" ></p>
                                    <p id='color-word'>HEX : 0x00</p>
                                </div>
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
    },
    setExamples: function () {
        if (LedMatrixModalManager.isRGB) {
            let images = $('#suggestions_rgb .suggestion-img'),
                cpt = 0;
            for (var key in LedMatrixModalManager.DRAW_BITMAP_RGB) {
                images[cpt].name = key;
                images[cpt].src = LedMatrixModalManager.example_imgs_path + LedMatrixModalManager.DRAW_BITMAP_RGB[key].name;
                images[cpt].dataset.actionValue = LedMatrixModalManager.DRAW_BITMAP_RGB[key].data;
                cpt += 1;
            }
        } else {
            let images = $('#suggestions .suggestion-img'),
                cpt = 0;
            for (var key in LedMatrixModalManager.DRAW_BITMAP) {
                images[cpt].src = LedMatrixModalManager.example_imgs_path + LedMatrixModalManager.DRAW_BITMAP[key].name;
                images[cpt].dataset.actionValue = LedMatrixModalManager.DRAW_BITMAP[key].data;
                cpt += 1;
            }
        }
    },
    updateImageRGB: function () {
        const allBlocks = Blockly.getMainWorkspace().getBlocksByType('display_rgb_led_matrix_DrawBitmap');
        for (let i = 0; i < allBlocks.length; i++) {
            const block = allBlocks[i];
            if (block != undefined) {
                const HIDDEN_RGB_LEDS_MATRIX = block.getField('HIDDEN_RGB_LEDS_MATRIX').getText();
                if (HIDDEN_RGB_LEDS_MATRIX !== '') {
                    block.getField('RGB_LEDS_MATRIX').setAlt(HIDDEN_RGB_LEDS_MATRIX);
                    let binary_matrix_col_by_col = "",
                        colors = [],
                        leds = "";

                    binary_matrix_col_by_col = block.getField('HIDDEN_RGB_LEDS_MATRIX').getText().split(',');
                    leds = $('#edit_leds_matrix_rgb svg rect');
                    for (let i = 0; i < binary_matrix_col_by_col.length; i++)
                        colors.push(binary_matrix_col_by_col[i]);

                    for (let i = 0; i < leds.length; i++)
                        leds[i].attributes['fill']['value'] = colors[i];

                    const matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix_rgb"));
                    block.getField('RGB_LEDS_MATRIX').setValue(matrix_base64);
                }
            }
        }
    },
    updateImageMono: function () {
        const rotr1 = (s) => s[s.length - 1] + s.slice(0, -1);
        const reverseStr = (s) => s.split('').reverse().join('');
        const allBlocks = Blockly.getMainWorkspace().getBlocksByType('display_led_matrix_DrawBitmap');
        for (let k = 0; k < allBlocks.length; k++) {
            const block = allBlocks[k];
            if (!block) continue;
            const hiddenField = block.getField('HIDDEN_MONO_LEDS_MATRIX');
            if (!hiddenField) continue;
            const HIDDEN_MONO_LEDS_MATRIX = hiddenField.getText();
            if (HIDDEN_MONO_LEDS_MATRIX === '') continue;
            block.getField('LEDS_MATRIX').setAlt(HIDDEN_MONO_LEDS_MATRIX);
            let colors = [];
            let binary_matrix_col_by_col = HIDDEN_MONO_LEDS_MATRIX.split(',');
            const leds = $('#edit_leds_matrix svg rect');
            for (let i = 0; i < binary_matrix_col_by_col[0].length; i++) {
                for (let j = 0; j < binary_matrix_col_by_col.length; j++) {
                    const col_ctrl = binary_matrix_col_by_col[j];
                    const col_ui = reverseStr(rotr1(col_ctrl));
                    colors.push((col_ui[i] === '0') ? '#f5f5f5' : LedMatrixModalManager.led_color);
                }
            }
            for (let i = 0; i < leds.length; i++) {
                leds[i].attributes['fill']['value'] = colors[i];
            }
            const matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
            block.getField('LEDS_MATRIX').setValue(matrix_base64);
        }
    },
    DRAW_BITMAP_RGB: {
        'example_1': {
            'name': 'mblocks_examples-1.png',
            'color': '#ffffff',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#000000,#ffffff,#ffffff,#000000,#000000,#000000'
        },
        'example_2': {
            'name': 'mblocks_examples-2.png',
            'color': '#00b7ff',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#00b7ff,#000000,#000000,#000000,#000000,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#000000,#00b7ff,#000000,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#000000,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#000000,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#000000,#000000,#000000,#000000,#000000,#000000,#00b7ff,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        },
        'example_3': {
            'name': 'mblocks_examples-3.png',
            'color': '#ff0033',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ff0033,#ff0033,#000000,#000000,#ff0033,#ff0033,#000000,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#000000,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#ff0033,#000000,#000000,#000000,#ff0033,#ff0033,#ff0033,#ff0033,#000000,#000000,#000000,#000000,#000000,#ff0033,#ff0033,#000000,#000000,#000000'
        },
        'example_4': {
            'name': 'mblocks_examples-4.png',
            'color': '#ff8a00',
            'data': '#000000,#ff8a00,#000000,#000000,#000000,#000000,#ff8a00,#000000,#000000,#000000,#ff8a00,#000000,#000000,#ff8a00,#000000,#000000,#000000,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#000000,#ff8a00,#ff8a00,#000000,#ff8a00,#ff8a00,#000000,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#000000,#ff8a00,#ff8a00,#ff8a00,#ff8a00,#000000,#ff8a00,#ff8a00,#000000,#ff8a00,#000000,#000000,#ff8a00,#000000,#ff8a00,#000000,#000000,#ff8a00,#000000,#000000,#ff8a00,#000000,#000000'
        },
        'example_5': {
            'name': 'mblocks_examples-5.png',
            'color': '#ae00ff',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ae00ff,#000000,#000000,#000000,#000000,#000000,#000000,#ae00ff,#ae00ff,#ae00ff,#000000,#000000,#000000,#000000,#ae00ff,#ae00ff,#ae00ff,#ae00ff,#ae00ff,#000000,#000000,#ae00ff,#ae00ff,#ae00ff,#000000,#ae00ff,#ae00ff,#000000,#000000,#ae00ff,#ae00ff,#000000,#000000,#000000,#000000,#ae00ff,#ae00ff,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        },
        'example_6': {
            'name': 'mblocks_examples-6.png',
            'color': '#00b7ff',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#00b7ff,#000000,#000000,#000000,#000000,#00b7ff,#000000,#00b7ff,#00b7ff,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#00b7ff,#000000,#000000,#00b7ff,#00b7ff,#00b7ff,#000000,#00b7ff,#000000,#000000,#000000,#000000,#00b7ff,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        },
        'example_7': {
            'name': 'mblocks_examples-7.png',
            'color': '#ff009f',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ff009f,#000000,#000000,#000000,#000000,#ff009f,#000000,#ff009f,#ff009f,#ff009f,#000000,#000000,#ff009f,#ff009f,#ff009f,#ff009f,#000000,#ff009f,#000000,#000000,#ff009f,#000000,#ff009f,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        },
        'example_8': {
            'name': 'mblocks_examples-8.png',
            'color': '#00ff48',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#00ff48,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#00ff48,#00ff48,#000000,#000000,#000000,#000000,#000000,#000000,#00ff48,#000000,#00ff48,#000000,#000000,#000000,#000000,#000000,#00ff48,#000000,#000000,#000000,#000000,#000000,#00ff48,#00ff48,#00ff48,#000000,#000000,#000000,#000000,#00ff48,#00ff48,#00ff48,#00ff48,#000000,#000000,#000000,#000000,#000000,#00ff48,#00ff48,#000000,#000000,#000000,#000000'
        },
        'example_9': {
            'name': 'mblocks_examples-9.png',
            'color': '#ffff00',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#ffff00,#000000,#ffff00,#ffff00,#000000,#000000,#ffff00,#ffff00,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        },
        'plan_de_travail': {
            'name': 'mblocks_examples_Plan de travail 1.png',
            'color': '#000000',
            'data': '#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000'
        }
    },
    DRAW_BITMAP: {
        'example_1': {
            'name': 'mblocks_examples-21.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_2': {
            'name': 'mblocks_examples-22.png',
            'data':
                '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_3': {
            'name': 'mblocks_examples-23.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_4': {
            'name': 'mblocks_examples-24.png',
            'data': '#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5'
        },
        'example_5': {
            'name': 'mblocks_examples-25.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_6': {
            'name': 'mblocks_examples-26.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_7': {
            'name': 'mblocks_examples-27.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_8': {
            'name': 'mblocks_examples-28.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'example_9': {
            'name': 'mblocks_examples-29.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#e63737,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#e63737,#e63737,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        },
        'plan_de_travail': {
            'name': 'mblocks_examples_Plan de travail 2.png',
            'data': '#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5,#f5f5f5'
        }
    }
};