// node picaxeMachine.test.js
const assert = require('assert');
const { PicaxeCompiler } = require('../compiler/picaxeCompiler.js');
const { PicaxeMachine } = require('./picaxeMachine.js');

// runs a program to its end (or to `budget` steps, or to the first wait when stopAtWait)
function run(source, { inputs = [], analog = {}, budget = 100000, stopAtWait = false } = {}) {
    const out = { text: '', sounds: [] };
    const io = {
        inputs: Uint8Array.from({ length: 24 }, (_, i) => inputs[i] || 0),
        analog: Array.from({ length: 24 }, (_, i) => analog[i] || 0),
        sertxd: t => out.text += t,
        sound: (pin, note, ms) => out.sounds.push([pin, note, ms])
    };
    const vm = new PicaxeMachine(PicaxeCompiler.program('#picaxe 28X2\n' + source), io);
    let last = { ms: 0, steps: 0 }, total = 0;
    while (!vm.ended && total < budget) {
        last = vm.run(budget - total);
        total += last.steps;
        if (last.ms && stopAtWait) break;
    }
    return { vm, out, last, total, io };
}
const word = (vm, n) => vm.ram[2 * n] | vm.ram[2 * n + 1] << 8;
const w0 = (source, opts) => word(run(source, opts).vm, 0);

// let
{
    const { vm } = run('let w0 = 258');
    assert.deepStrictEqual([vm.ram[0], vm.ram[1]], [2, 1]);
    assert.strictEqual(w0('let w0 = 258\nlet b1 = 0'), 2);
    assert.strictEqual(w0('let w0 = 0 - 1'), 65535);
    assert.strictEqual(w0('let w0 = 65535 + 2'), 1);
    assert.strictEqual(w0('let w0 = 300 * 300'), 24464);
    assert.strictEqual(run('let b2 = 300').vm.ram[2], 44);
    assert.strictEqual(w0('let w0 = 2 + 3 * 4'), 20);
    assert.strictEqual(w0('let w0 = 17 / 5'), 3);
    assert.strictEqual(w0('let w0 = 17 // 5'), 2);
    assert.strictEqual(w0('let w1 = 0\nlet w0 = 7 / w1'), 0);
    assert.strictEqual(w0('let w1 = 0\nlet w0 = 7 // w1'), 7);
    assert.strictEqual(w0('let w0 = 12 & 10'), 8);
    assert.strictEqual(w0('let w0 = 12 | 3'), 15);
    // TEMP_C formula of the blocks: x * 100 - 2172 / 329
    assert.strictEqual(w0('let w0 = 100\nlet w0 = w0 * 100 - 2172 / 329'), Math.floor((100 * 100 - 2172) / 329));
}

// if / elseif / else
const branch = (v) => w0(`let w1 = ${v}\nif w1 = 1 then\nlet w0 = 10\nelseif w1 = 2 then\nlet w0 = 20\nelse\nlet w0 = 30\nendif`);
assert.deepStrictEqual([1, 2, 3].map(branch), [10, 20, 30]);

// and / or: grouped from the right, measured on the chip
const logic = (a, b, c, expr) => w0(`let b10 = ${a}\nlet b11 = ${b}\nlet b12 = ${c}\nif ${expr} then\nlet w0 = 1\nendif`);
assert.strictEqual(logic(1, 0, 0, 'b10 = 1 or b11 = 1 and b12 = 1'), 1);
assert.strictEqual(logic(0, 1, 1, 'b10 = 1 and b11 = 1 or b12 = 1'), 0);
assert.strictEqual(logic(1, 0, 1, 'b10 = 1 and b11 = 1 or b12 = 1'), 1);

// do while / until, for
assert.strictEqual(w0('let w0 = 0\ndo while w0 < 5\nlet w0 = w0 + 1\nloop'), 5);
assert.strictEqual(w0('let w0 = 0\ndo until w0 = 7\nlet w0 = w0 + 1\nloop'), 7);
assert.strictEqual(w0('for b4 = 1 to 10 step 3\nlet w0 = w0 + 1\nnext'), 4);
assert.strictEqual(w0('for b4 = 5 to 1\nlet w0 = w0 + 1\nnext'), 1);
assert.ok(!run('for b0 = 0 to 255\nnext', { budget: 5000 }).vm.ended);

// gosub / return
const nested = (n) => run('gosub s1\nend\n' + Array.from({ length: n }, (_, i) => `s${i + 1}:\n${i + 1 < n ? `gosub s${i + 2}\n` : ''}return\n`).join(''));
assert.ok(nested(8).vm.ended);
assert.throws(() => nested(9), /8 levels/);
assert.throws(() => run('return'), /return without gosub/);

// time
assert.strictEqual(run('pause 500', { stopAtWait: true }).last.ms, 500);
{
    const { vm, last } = run('main:\ngoto main', { budget: 1000 });
    assert.ok(!vm.ended && last.steps === 1000);
    assert.strictEqual(vm.run(1000).steps, 1000);
}
assert.ok(Math.abs(run('sound B.1, (50, 100)', { stopAtWait: true }).last.ms - 686) <= 1);

// pins
{
    const { vm } = run('high B.0\nhigh B.1\ntoggle B.1\nhigh C.5\nlow C.5');
    assert.deepStrictEqual([vm.outputs[0], vm.outputs[1], vm.outputs[13]], [1, 0, 0]);
    assert.strictEqual(w0('let b0 = pinC.3', { inputs: { 11: 1 } }) & 255, 1);
    assert.strictEqual(w0('if pinC.3 = 1 then\nlet w0 = 9\nendif', { inputs: { 11: 1 } }), 9);
    assert.strictEqual(run('servo B.2, 150').vm.servos[2], 150);
    assert.strictEqual(w0('readadc A.0, b0', { analog: { 16: 1023 } }), 255);
    assert.strictEqual(w0('readadc10 A.0, w0', { analog: { 16: 1023 } }), 1023);
    assert.strictEqual(w0('symbol n = w5\nlet n = 7\nlet w0 = n'), 7);
}

// sertxd
assert.strictEqual(run('let w0 = 42\nsertxd("A",#w0,13,10)').out.text, 'A42\r\n');

// Grove LCD
const LCD_INIT = 'hi2csetup i2cmaster, %01111100, i2cslow, i2cbyte\nhi2cout ($80, $28)\nhi2cout ($80, $0C)\n';
{
    const { vm } = run(LCD_INIT + 'hi2cout ($80, $C3)\nhi2cout ($40, "Hi")');
    assert.strictEqual(vm.lcd.rows[1], '   Hi' + ' '.repeat(11));
    assert.strictEqual(vm.lcd.rows[0], ' '.repeat(16));
    const cleared = run(LCD_INIT + 'hi2cout ($40, "Hi")\nhi2cout ($80, $01)\nhi2cout ($40, "x")').vm.lcd;
    assert.strictEqual(cleared.rows[0], 'x' + ' '.repeat(15));
}
{
    // subroutine of the grove_lcd_number block
    const sub = ['grove_lcd_number:', 'let lcddiv = 10000', 'do while lcddiv > 0', 'if lcdnum >= lcddiv or lcddiv = 1 then',
        'let lcdchr = lcdnum / lcddiv // 10 + 48', 'hi2cout ($40, lcdchr)', 'endif', 'let lcddiv = lcddiv / 10', 'loop', 'return'].join('\n');
    const { vm } = run('symbol lcdnum = w1\nsymbol lcddiv = w2\nsymbol lcdchr = w3\n' + LCD_INIT + 'hi2cout ($80, 128)\nlet lcdnum = 1234\ngosub grove_lcd_number\nend\n' + sub);
    assert.strictEqual(vm.lcd.rows[0], '1234' + ' '.repeat(12));
}

// end keeps the outputs
{
    const { vm } = run('high B.3\nend\nlow B.3');
    assert.ok(vm.ended && vm.outputs[3] === 1);
}

console.log('picaxeMachine: all tests passed');
