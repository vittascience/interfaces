// color_matrix module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const color_matrix = {};
    color_matrix.__name__ = new Sk.builtin.str("color_matrix");
    color_matrix.intensity = {
        'A': 10, // brightness 0-10
        'B': 10
    };
    color_matrix.pixels = {
        'A': ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        'B': ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    };

    color_matrix.colors = {
        "0": "Black",
        "1": "Violet",
        "2": "Purple",
        "3": "Blue",
        "4": "rgb(0, 127, 255)", // AZURE
        "5": "Turquoise",
        "6": "Green",
        "7": "Yellow",
        "8": "Orange",
        "9": "Red",
        "10": "White"
    };

    const initMatrix = function (port) {
        const size = 9;
        let html = '<div class="spike-led-grid">',
            row = '<div class="spike-led-row">';
        row += '<div class="spike-led-port' + port + '" style="background-color: black; opacity: 1;"></div>';

        for (let led = 0; led < size; led++) {
            if ((led + 1) % 3 == 0) {
                html += row + "</div>";
                row = '<div class="spike-led-row">';
            }
            row += '<div class="spike-led-port' + port + '" style="background-color: black; opacity: 1;"></div>';
        }
        html += "</div>";
        $(`#spike-LEDMatrix-port${port}_value`).html(html);
    };

    (function () {
        //Init color_matrix port A
        initMatrix('A');
        //Init color_matrix port B
        initMatrix('B');
    })();

    const show = function (port, colors) {
        const _port = Sk.ffi.remapToJs(port);
        const _colors = Sk.ffi.remapToJs(colors);
        color_matrix.pixels[_port] = _colors;
        if (LegoSpikeWebBLEAPI.isConnected) {
            const encodedColors = _colors.map((element) => {
                return (color_matrix.intensity[_port] << 4) + parseInt(element);
            });
            LegoSpikeWebBLEAPI.setLedMatrix3x3(_port, encodedColors);
        } else {
            const leds = document.querySelectorAll(`.spike-led-port${_port}`);
            for (let i = 0; i < _colors.length; i++) {
                leds[i].style.backgroundColor = color_matrix.colors[_colors[i]];
                leds[i].style.opacity = color_matrix.intensity[_port] / 10;
            }
        }
        return Sk.builtin.none();
    };
    show.co_varnames = ['port', 'colors'];
    show.$defaults = [new Sk.builtin.str("A")];
    color_matrix.show = new Sk.builtin.func(show);

    const set_pixel = function (port, x, y, color) {
        const _port = Sk.ffi.remapToJs(port);
        const _x = Sk.ffi.remapToJs(x);
        const _y = Sk.ffi.remapToJs(y);
        const _color = Sk.ffi.remapToJs(color);
        const index = _y * 3 + _x;
        const colors = color_matrix.pixels[_port];
        colors[index] = _color;
        show(port, new Sk.builtin.list(colors));
        return Sk.builtin.none();
    };
    set_pixel.co_varnames = ['port', 'x', 'y', 'color'];
    set_pixel.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)];
    color_matrix.set_pixel = new Sk.builtin.func(set_pixel);

    const set_intensity = function (port, intensity) {
        const _port = Sk.ffi.remapToJs(port);
        const _intensity = Sk.ffi.remapToJs(intensity);
        color_matrix.intensity[_port] = _intensity / 10;
        return Sk.builtin.none();
    };
    set_intensity.co_varnames = ['port', 'intensity'];
    set_intensity.$defaults = [new Sk.builtin.str("A"), new Sk.builtin.int_(100)];
    color_matrix.set_intensity = new Sk.builtin.func(set_intensity);

    return color_matrix;
};