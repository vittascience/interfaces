var $builtinmodule = function () {
	const sonar_service = {};

    const naoSimulator = window.Simulator3D;

    sonar_service.__name__ = new Sk.builtin.str('sonar_service');

    sonar_service.SonarRightDetected = new Sk.builtin.func(function () {
        const value = $('#nao-sonar-right_slider').slider('option', 'value');
        naoSimulator.updateSonar({sonarRight:value/100});

        if (value < 50) {
            return new Sk.builtin.int_(1);
        } else {
            return new Sk.builtin.int_(0);
        }
    });

    sonar_service.SonarLeftDetected = new Sk.builtin.func(function () {
        const value = $('#nao-sonar-left_slider').slider('option', 'value');
        naoSimulator.updateSonar({sonarLeft:value/100});
        if (value < 50) {
            return new Sk.builtin.int_(1);
        } else {
            return new Sk.builtin.int_(0);
        }
    });

    sonar_service.SonarRightNothingDetected = new Sk.builtin.func(function () {
        const value = $('#nao-sonar-right_slider').slider('option', 'value');
        naoSimulator.updateSonar({sonarRight:value/100});
        if (value > 50) {
            return new Sk.builtin.int_(1);
        } else {
            return new Sk.builtin.int_(0);
        }
    });

    sonar_service.SonarLeftNothingDetected = new Sk.builtin.func(function () {
        const value = $('#nao-sonar-left_slider').slider('option', 'value');
        naoSimulator.updateSonar({sonarLeft:value/100});
        if (value > 50) {
            return new Sk.builtin.int_(1);
        } else {
            return new Sk.builtin.int_(0);
        }
    });

    return sonar_service;
}