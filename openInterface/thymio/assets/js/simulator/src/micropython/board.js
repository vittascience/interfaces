// Thymio - board module

var $builtinmodule = function () {

    var board = {};

    board.__name__ = new Sk.builtin.str('board');
    board.board_id = new Sk.builtin.str('elio_eliobot');
    board.IO14 = new Sk.builtin.str('IO14');
    board.IO35 = new Sk.builtin.str('IO35');
    board.IO36 = new Sk.builtin.str('IO36');
    board.IO37 = new Sk.builtin.str('IO37');
    board.IO38 = new Sk.builtin.str('IO38');
    board.NEOPIXEL = new Sk.builtin.str('NEOPIXEL');

    return board;
};