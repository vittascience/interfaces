// color_sensor module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const color_sensor = {};
    color_sensor.__name__ = new Sk.builtin.str("color_sensor");
    color_sensor.colors = {
        "0": "Black",
        "1": "Purple",
        "2": "Purple",
        "3": "Blue",
        "4": "Blue",
        "5": "Green",
        "6": "Green",
        "7": "Yellow",
        "8": "Orange",
        "9": "Red",
        "10": "White"
    };

    const initColorSensor = function (port) {
        try {
            let color_select = `<select id="colorPicker-port${port}">`;
            // Création d'un Set pour stocker les couleurs uniques
            const uniqueColors = new Set();
            // Parcours des couleurs
            for (let i = 0; i < Object.keys(color_sensor.colors).length; i++) {
                const currentColor = color_sensor.colors[i];
                // Vérification si la couleur n'a pas déjà été ajoutée
                if (!uniqueColors.has(currentColor)) {
                    uniqueColors.add(currentColor);
                    color_select += `<option value="${currentColor}" style="background-color:${currentColor}"></option>`;
                }
            }
            color_select += '</select>';
            document.querySelector(`#spike-colorSensor-port${port} .module-value`).innerHTML = color_select;
            document.getElementById(`colorPicker-port${port}`).addEventListener('change', function () {
                const selectedColor = this.value;
                this.style.backgroundColor = selectedColor;
                const port = this.id.split('port')[1];
                document.getElementById(`spike-colorSensor-port${port}_anim`).style.backgroundColor = selectedColor;
            });
        } catch (error) {
            console.warn(`No color sensor on port ${port}`);
        }
    };

    (function () {
        initColorSensor('A');
        initColorSensor('B');
    })();

    const color = function (port) {
        const _port = Sk.ffi.remapToJs(port);
        if (LegoSpikeWebBLEAPI.isConnected) {
            return new Sk.builtin.str(color_sensor.colors[LegoSpikeWebBLEAPI.getColor(_port)]);
        } else {
            const selectedColor = document.getElementById(`spike-colorSensor-port${port}_anim`).style.backgroundColor;
            return new Sk.builtin.str(selectedColor === '' ? 'Black' : selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase());
        }
    };
    color.co_varnames = ['port'];
    color.$defaults = [new Sk.builtin.str("A")];
    color_sensor.color = new Sk.builtin.func(color);

    return color_sensor;
};