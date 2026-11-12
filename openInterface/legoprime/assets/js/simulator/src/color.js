// color module for LEGO® Education SPIKE™ Prime

const $builtinmodule = function () {

    const color = {};
    color.__name__ = new Sk.builtin.str("color");

    ["BLACK", "MAGENTA", "PURPLE", "BLUE", "AZURE", "TURQUOISE", "GREEN", "YELLOW", "ORANGE", "RED", "WHITE"].forEach((name, i) => {
        color[name] = new Sk.builtin.int_(i);
    });
    color.UNKNOWN = new Sk.builtin.int_(-1);

    return color;
};
