// micro:bit - HuskyLens module

var $builtinmodule = function () {

    const huskyLens = {};

    huskyLens.HuskyLensLibrary = new Sk.misceval.buildClass(huskyLens, function ($gbl, $loc) {

        // const createInput = function(text) {
        //     let div = document.createElement("div");
        //     div.classList.add('input-group');
        //     let span = document.createElement("span");
        //     span.id = 'basic-addon1';
        //     span.classList.add('input-group-text');
        //     span.style.width = '10px';
        //     span.innerHTML = text;
        //     span.style.justifyContent = 'center';
        //     let input = document.createElement("input");
        //     input.type = 'text';
        //     input.classList.add('form-control');
        //     div.appendChild(span);
        //     div.appendChild(input);
        //     return div;
        // };

        HuskyLensLibrary__init__ = function (self) {
            // const huskyLensInputs = document.querySelector("#huskylens > div.module-body.body-input > div");
            // huskyLensInputs.appendChild(createInput('X'));
            // huskyLensInputs.appendChild(createInput('Y'));
            // huskyLensInputs.appendChild(createInput('X2'));
            // huskyLensInputs.appendChild(createInput('Y2'));
            // huskyLensInputs.appendChild(createInput('ID'));
            self.algorithm = '';
        };

        HuskyLensLibrary__init__.co_varnames = ['self'];
        HuskyLensLibrary__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(HuskyLensLibrary__init__);

        $loc.face_recognition_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_FACE_RECOGNITION';
            document.querySelector('#huskylens_value').innerHTML = 'Détection de visage';
        });

        $loc.object_tracking_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_OBJECT_TRACKING';
            document.querySelector('#huskylens_value').innerHTML = 'Suivi d\'objet';
        });

        $loc.object_recognition_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_OBJECT_RECOGNITION';
            document.querySelector('#huskylens_value').innerHTML = 'Détection d\'objet';
        });

        $loc.line_tracking_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_LINE_TRACKING';
            document.querySelector('#huskylens_value').innerHTML = 'Suivi de ligne';
        });

        $loc.color_recognition_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_COLOR_RECOGNITION';
            document.querySelector('#huskylens_value').innerHTML = 'Détection de couleur';
        });

        $loc.tag_recognition_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_TAG_RECOGNITION';
            document.querySelector('#huskylens_value').innerHTML = 'Détection de tag';
        });

        $loc.object_classification_mode = new Sk.builtin.func(function (self) {
            self.algorithm = 'ALGORITHM_OBJECT_CLASSIFICATION';
            document.querySelector('#huskylens_value').innerHTML = 'Classification d\'objet';
        });

        $loc.command_request_blocks = new Sk.builtin.func(function (self) {
            const blocks = new Sk.builtin.list([new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)]);
            return new Sk.builtin.list([blocks]);
        });

        $loc.command_request_arrows = new Sk.builtin.func(function (self) {
            const arrows = new Sk.builtin.list([new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)]);
            return new Sk.builtin.list([arrows]);
        });

        $loc.command_request_custom_text = new Sk.builtin.func(function (self) { });

        $loc.command_request_clear_text = new Sk.builtin.func(function (self) { });

        $loc.command_request_save_model_to_SD_card = new Sk.builtin.func(function (self) { });

        $loc.command_request_load_model_from_SD_card = new Sk.builtin.func(function (self) { });

        $loc.command_request_learn_once = new Sk.builtin.func(function (self) { });

        $loc.command_request_forget = new Sk.builtin.func(function (self) { });

        $loc.command_request_custom_name = new Sk.builtin.func(function (self, name, id) { });

    }, "HuskyLensLibrary");

    return huskyLens;
};
