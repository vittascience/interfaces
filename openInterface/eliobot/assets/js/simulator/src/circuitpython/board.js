// Eliobot - board module

const $builtinmodule = function () {

    const board = {};
    board.__name__ = new Sk.builtin.str('board');
    board.board_id = new Sk.builtin.str('elio_eliobot');
    board.IO0 = new Sk.builtin.str('IO0');
    board.IO2 = new Sk.builtin.str('IO2');
    board.IO4 = new Sk.builtin.str('IO4');
    board.IO5 = new Sk.builtin.str('IO5');
    board.IO6 = new Sk.builtin.str('IO6');
    board.IO7 = new Sk.builtin.str('IO7');
    board.IO8 = new Sk.builtin.str('IO8');
    board.IO9 = new Sk.builtin.str('IO9');
    board.IO10 = new Sk.builtin.str('IO10');
    board.IO11 = new Sk.builtin.str('IO11');
    board.IO12 = new Sk.builtin.str('IO12');
    board.IO13 = new Sk.builtin.str('IO13');
    board.IO14 = new Sk.builtin.str('IO14');
    board.IO15 = new Sk.builtin.str('IO15');
    board.IO16 = new Sk.builtin.str('IO16');
    board.IO17 = new Sk.builtin.str('IO17');
    board.IO33 = new Sk.builtin.str('IO33');
    board.IO35 = new Sk.builtin.str('IO35');
    board.IO36 = new Sk.builtin.str('IO36');
    board.IO37 = new Sk.builtin.str('IO37');
    board.IO38 = new Sk.builtin.str('IO38');
    board.NEOPIXEL = new Sk.builtin.str('NEOPIXEL');
    board.BATTERY = new Sk.builtin.str('BATTERY');

    return board;
};