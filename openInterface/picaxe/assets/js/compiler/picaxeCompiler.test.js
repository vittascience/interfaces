// Run: node openInterface/picaxe/assets/js/compiler/picaxeCompiler.test.js
// Expected images: used bytes of the .obj written by the official compiler (picaxe28x2 v3.1 -o) for the same programs.
const assert = require('assert');
const { PicaxeCompiler, picaxeNumber } = require('./picaxeCompiler.js');

const OFFICIAL = [
    ["high B.0", "000050047e"],
    ["end\nhigh B.0", "00005ff808fc"],
    ["pause 65535\npause w3\nlow C.7\ntoggle A.3", "0000c87fffff3c700df1309fe0"],
    ["servo B.7, w0", "00006dbd7191f8"],
    ["symbol valeur = w0\nlet valeur = 300\nlet b3 = valeur * 2 / 3 + 1\nlet valeur = valeur - 1", "00013057012c3254644a1d22699f232b26427e"],
    ["if pinC.3 = 1 then\nhigh B.0\nelseif w0 >= 2 or w1 <> 3 then\nlow B.0\nelse\ntoggle B.0\nendif", "000192c4858c02e010c80c2629194699a1005c030c80c2123f"],
    ["if w0 = 1 and w1 = 2 and pinC.3 > 3 then\npause 0\nendif", "000116c4995291a529858803d320210f8fc0"],
    ["main:\ndo while w0 = 1 and w1 < 2\npause 0\nloop\ndo until w0 = 1 or w1 = 2\nloop", "00018cc4996e91a180381f0c8017624cb948d0802fd900e1f8"],
    ["for w1 = 2 to w2 step 3\nfor w3 = 0 to 1000\nnext w3\nnext w1", "000166552342a0e17938f03e88007cbd3348da9002cfc0"],
    ["gosub a1\ngosub a2\nend\na1:\nreturn\na2:\npause 0\nreturn", "0000ea7008058380802f7e6cf86ff0000006801440"],
    ["readadc A.0, w0\nreadadc10 C.7, w5\nsound B.2, (w1, 255)\nsertxd(\"Bonjour\",13,10)\nsertxd(#w0,13,10)", "00024e3c0c87c273c4a96ff1a13c295f2139bdcdce6a737b9d5ce4dd6d09e14ae32eeb68fc"],
];

for (const [program, hex] of OFFICIAL) {
    const { obj, eee, used } = PicaxeCompiler.compile('#picaxe 28X2\n' + program);
    assert.strictEqual(Buffer.from(obj.slice(0, used)).toString('hex').replace(/(00)+$/, ''), hex, program);
    assert.ok(obj.slice(used).every(b => b === 0), program);
    assert.strictEqual(obj.length, 4096);
    assert.strictEqual(eee.length, 256);
}

assert.deepStrictEqual([0, 1, 2, 15, 16, 255, 256].map(picaxeNumber), ['000', '001', '010010', '011111', '1000010000', '1011111111', '110000000100000000']);

// comments, #rem blocks and the generated program structure
const generated = PicaxeCompiler.compile("#rem\nBlocks: <xml/>\n#endrem\n#picaxe 28X2\nsymbol valeur = w0\n' comment\nlet valeur = 0\nmain:\ndo\n  high B.0 ; inline comment\nloop\nend\n");
assert.strictEqual(Buffer.from(generated.obj.slice(0, generated.used)).toString('hex'),
    Buffer.from(PicaxeCompiler.compile('#picaxe 28X2\nlet w0 = 0\nmain:\ndo\nhigh B.0\nloop\nend').obj.slice(0, generated.used)).toString('hex'));

// simulator program: jumps resolved to instruction indexes, source lines kept
const prog = PicaxeCompiler.program('main:\ndo\nhigh B.0\nloop');
assert.deepStrictEqual(prog.code.map(i => i.op), ['high', 'goto']);
assert.strictEqual(prog.code[1].target, 0);
assert.strictEqual(prog.code[0].line, 3);

// ' and ; inside a string are text, not a comment
const compileObj = (program) => Buffer.from(PicaxeCompiler.compile('#picaxe 28X2\n' + program).obj).toString('hex');
assert.strictEqual(compileObj('sertxd("l\'eau; ok")'), compileObj('sertxd(108,39,101,97,117,59,32,111,107)'));
assert.strictEqual(compileObj('sertxd("a") \' x'), compileObj('sertxd("a")'));

// errors the official compiler also reports
const fails = (program, message) => assert.throws(() => PicaxeCompiler.compile(program), message);
fails('#picaxe 08M2\nhigh C.1', /PICAXE 08M2 not supported/);
fails('#picaxe 28X2\nif 0 = w0 then\nendif', /left side of a comparison must be a variable/);
fails('#picaxe 28X2\nif w0 = 1 then\nhigh B.0', /missing endif/);
fails('#picaxe 28X2\ngoto nowhere', /unknown label nowhere/);
fails('#picaxe 28X2\nlet w28 = 1', /unknown variable w28/);
fails('#picaxe 28X2\nreadadc C.0, w0', /C.0 has no ADC channel/);
fails('#picaxe 28X2\nhigh B.0\nfoo B.1', /line 3: unsupported instruction: foo B.1/);

console.log('picaxeCompiler: all tests passed');
