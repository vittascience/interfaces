// color module for LEGO® Education SPIKE™ Essential

const $builtinmodule = function () {

    const color = {};
    color.__name__ = new Sk.builtin.str("color");

    color.BLACK = new Sk.builtin.str("0");
    color.VIOLET = new Sk.builtin.str("1");
    color.PURPLE = new Sk.builtin.str("2");
    color.BLUE = new Sk.builtin.str("3");
    color.AZURE = new Sk.builtin.str("4");
    color.TURQUOISE = new Sk.builtin.str("5");
    color.GREEN = new Sk.builtin.str("6");
    color.YELLOW = new Sk.builtin.str("7");
    color.ORANGE = new Sk.builtin.str("8");
    color.RED = new Sk.builtin.str("9");
    color.WHITE = new Sk.builtin.str("10");

    return color;
};