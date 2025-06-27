let LedMatrixModalManager = {
    img_selected : $('.img-selected'),
    matrix_base64 : "",
    init : function () {
        if($("#matrix").children().length == 0) {
            // create matrix
            LedMatrixModalManager.create_columns(16);
            LedMatrixModalManager.create_lines(8);
            LedMatrixModalManager.create_matrix(16,8,34);
            //click events listener
            $('#edit_leds_matrix svg rect').click(LedMatrixModalManager.change_led_color);
            $('.suggestion-img').click(LedMatrixModalManager.change_leds_matrix_from_img);
        }
        //init matrix
        $('.img-selected').trigger('click'); 
        //get base 64
        LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
        // set the css of the modal 
        if ($(".ide-block").width() < 550)
            LedMatrixModalManager.resize_mod();
        else
            LedMatrixModalManager.basic_mod();
        //lock for the first init (prevents the generation of more than one matrix)
        Blockly.Constants.LOCK_INIT = 1 ;
    },
    img_to_binary : function(img) {
        let binary_img_line_by_line = [],
            line = "",
            img_split = img.split(',');
        line += ((img_split[0] == "#f5f5f5") ? "0" : "1");
        // convert img tab to binary
        for (var i = 1; i < img_split.length + 1 ; i ++) {
            if (i%16 == 0) {
                binary_img_line_by_line.push(line);
                line = "";
            } 
            line += ((img_split[i] == "#f5f5f5") ? "0" : "1");
        }
        // convert img tab from line by line to col by col 
        let binary_img_col_by_col = [],
            column = "";
        for ( var i = 0 ; i < binary_img_line_by_line[0].length ; i ++) {
            for ( var j = 0 ; j < binary_img_line_by_line.length ; j ++) {
                column += binary_img_line_by_line[j][i];
            }
            binary_img_col_by_col.push(column);
            column = "";
        }
        return binary_img_col_by_col.join(',');
    },
    load_matrix_from_block : function() {
        let binary_matrix_col_by_col = Blockly.Constants.LEDS_MATRIX_BLOCK.getText().split(','),
            colors = [],
            leds = $('#edit_leds_matrix svg rect');
            
        for ( var i = 0 ; i < binary_matrix_col_by_col[0].length ; i++)
            for ( var j = 0 ; j < binary_matrix_col_by_col.length ; j++)
                colors.push( (binary_matrix_col_by_col[j][i] == '0') ? '#f5f5f5' : '#00b9ff');
        for ( let i = 0; i < leds.length ; i++)
            leds[i].attributes['fill']['value'] = colors[i];
        
    },
    get_matrix_base64 : function (matrix) {
        let s = new XMLSerializer().serializeToString(matrix);
        let encodedData = window.btoa(s);
        return "data:image/svg+xml;base64," + encodedData;
    },
    confirm_matrix : function () {
            //get leds data
            let leds = $('#edit_leds_matrix svg rect'),
                new_dataset = [];
            for ( let i = 0; i < leds.length ; i++)
                new_dataset.push(leds[i].attributes['fill']['value']);
            new_dataset = new_dataset.join(',');
            LedMatrixModalManager.matrix_base64 = LedMatrixModalManager.get_matrix_base64(document.querySelector("#matrix"));
            Blockly.Constants.LEDS_MATRIX_BLOCK.setValue(LedMatrixModalManager.matrix_base64);
            Blockly.Constants.LEDS_MATRIX_BLOCK.setAlt(LedMatrixModalManager.img_to_binary(new_dataset));
            $('#popup_matrix_LED,.overlay').css('display','none');
    },
    cancel_matrix : function () {
        let leds = $('#edit_leds_matrix svg rect');
        for ( let i = 0; i < leds.length ; i++)
            leds[i].attributes['fill']['value'] = Blockly.Constants.LEDS_MATRIX[i];
        $('#popup_matrix_LED,.overlay').css('display','none');
    },
    create_columns : function (number) {
        let columns_string = "<span> </span>";
        for ( var i = 0 ; i < number ; i++)
            columns_string = columns_string + "<span>" + i + "</span>";
        $('#columns').append(columns_string); 
    },
    create_lines : function (number) {
        var lines_string = "" ;
        for ( var i = 0 ; i < number ; i++)
            lines_string = lines_string + "<span>" + String.fromCharCode(65 + i) + "</span>";
        $('#lines').append(lines_string); 
    },
    change_led_color : function () {
        let color = $(this)[0].attributes['fill']['value'];
        $(this)[0].attributes['fill']['value'] = (color == "#f5f5f5") ? "#00b9ff" : "#f5f5f5";
    },
    create_rect : function (parameters) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        for (var p in parameters) // tranform strokeWidth -> stroke-width
            rect.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), parameters[p]);
        return rect
    },
    create_matrix :  function (columns,lines,size) {
        // parameters for the svg rect
        let parameters = {
            fill : '#f5f5f5',
            strokeWidth : '1',
            stroke : '#E0E5EB', 
            x : 3,
            y : 3,
            rx : 12,
            ry : 12,
            width : 30,
            height : 30
        }
        for (var i = 0; i < lines ; i ++) {
            for ( var j = 0 ; j < columns ; j ++) {
                document.getElementById('matrix').appendChild(LedMatrixModalManager.create_rect(parameters));
                parameters['x'] += size;
            }
            parameters['x'] = 3;
            parameters['y'] += size;
        }
    },
    set_matrix : function (img) {
        let colors = img.dataset.actionValue.split(","),
            leds = $('#edit_leds_matrix svg rect');
        for ( let i = 0; i < leds.length ; i++)
            leds[i].attributes['fill']['value'] = colors[i];
    },
    change_leds_matrix_from_img : function () {
        LedMatrixModalManager.img_selected = $(this);
        if(LedMatrixModalManager.img_selected.hasClass('img-selected')) {
            LedMatrixModalManager.set_matrix(this);
        } else {
            LedMatrixModalManager.set_matrix(this);
            $('.suggestion-img').removeClass('img-selected');
            $(this).addClass('img-selected');
        }
        $(this).removeClass('suggestion-img');
        $(this).css('border','solid #00b9ff 1px');
        $(this).addClass('suggestion-img',1000);
    },
    get_matrix_color : function () {
        let leds = $('#edit_leds_matrix svg rect'),
            color = [];
        for ( let i = 0; i < leds.length ; i++)
            color.push(leds[i].attributes['fill']['value'])
        return color.join(',');
    },
    get_matrix_dataset : function() {
        let leds = $('#edit_leds_matrix svg rect'),
            new_dataset = [];
        for ( let i = 0; i < leds.length ; i++)
            new_dataset.push(leds[i].attributes['fill']['value']);
        return new_dataset;
    },
    disp_modal : function() {
        LedMatrixModalManager.dark_mode_examples_imgs();
        $(".overlay").css("display","block");
        $("#popup_matrix_LED").css("display","block");
    },
    resize_mod : function() {
        $('#leds_matrix').after($('#suggestions'));
    },
    basic_mod : function() {
        $('#edit_leds_matrix').after($('#suggestions'));
    },
    componentToHex : function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    dark_mode_examples_imgs : function() {
        let rgb = $('#popup_matrix_LED').css("background-color").match(/\d+/g);
        let r = parseInt(rgb[0]),
            g = parseInt(rgb[1]),
            b = parseInt(rgb[2]);
        let color = "#" + LedMatrixModalManager.componentToHex(r) + LedMatrixModalManager.componentToHex(g) + LedMatrixModalManager.componentToHex(b);

        if ( color == "#f5f5f5" && $(".img-selected").attr("src").includes("dark_mode_")) {
            $(".suggestion-img").each(function() {
                let new_src = $(this).attr('src').replace('dark_mode_','');
                $(this).attr('src',new_src);
            });
        } else if (color != "#f5f5f5" && !$(".img-selected").attr("src").includes("dark_mode_")){
            $(".suggestion-img").each(function() {
                if(!$(this).attr('src').includes("dark_mode_")) {
                    let new_src = $(this).attr('src' ).split('/');
                    new_src[new_src.length - 1] = 'dark_mode_' + new_src[new_src.length - 1];
                    $(this).attr('src',new_src.join('/'));
                }
            });
        }
    }
}