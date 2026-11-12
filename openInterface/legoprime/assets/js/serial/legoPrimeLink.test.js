// Run: node openInterface/legoprime/assets/js/serial/legoPrimeLink.test.js
// Expected values come from LEGO's reference cobs.py / crc.py (spike-prime-docs/examples/python).
const assert = require('assert');
const { LEGO_PRIME, legoPack, legoUnpack, legoCrc32, legoParse, legoMessage, legoStartUpload, LegoConsoleBuffer, LegoRunState, LegoPrimeLink } = require('./legoPrimeLink.js');

const hex = a => Buffer.from(a).toString('hex');
const allBytes = Uint8Array.from({ length: 256 }, (_, i) => i);

// InfoRequest
assert.strictEqual(hex(legoMessage(0x00)), '000002');
assert.strictEqual(hex(legoPack([0])), '000002');
// delimiters 0..2, then data
assert.strictEqual(hex(legoPack([0, 1, 2, 3, 4, 5])), '0054a80500070602');
// long data: 84-byte blocks, no-delimiter code word (0xff ^ 3 = 0xfc)
assert.ok(hex(legoPack(allBytes)).startsWith('0054a8fc00070605040b0a09'));
assert.ok(hex(legoPack(allBytes)).endsWith('fffefd07fc02'));
for (const data of [[0], [0, 1, 2, 3, 4, 5], allBytes, Uint8Array.from([...allBytes, ...allBytes])]) {
    assert.deepStrictEqual([...legoUnpack(legoPack(data))], [...data]);
}

// CRC32 aligned to 4 (zeros), seeded by the running crc
const abcde = Buffer.from('abcde');
assert.strictEqual(legoCrc32(abcde), 2338359752);
assert.strictEqual(legoCrc32(Buffer.from('xyz12345'), 2338359752), 3188088424);

// Stream: partial frame kept, priority byte 0x01 ignored, priority message inside a normal one
const a = legoPack([0x21, 0x68, 0x69]), b = legoPack([0x20, 1]);
let r = legoParse(Uint8Array.from([...a, ...b.slice(0, 2)]));
assert.deepStrictEqual(r.frames.map(f => [...f]), [[0x21, 0x68, 0x69]]);
assert.deepStrictEqual([...r.rest], [...b.slice(0, 2)]);
r = legoParse(Uint8Array.from([0x01, ...b]));
assert.deepStrictEqual(r.frames.map(f => [...f]), [[0x20, 1]]);
const cut = 3; // normal message interrupted by a priority one, then resumed
r = legoParse(Uint8Array.from([...a.slice(0, cut), 0x01, ...b, ...a.slice(cut)]));
assert.deepStrictEqual(r.frames.map(f => [...f]), [[0x20, 1], [0x21, 0x68, 0x69]]);
assert.strictEqual(r.rest.length, 0);

// priority message right after a first one, while a normal message is interrupted
r = legoParse(Uint8Array.from([...a.slice(0, cut), 0x01, ...b, 0x01, ...b, ...a.slice(cut)]));
assert.deepStrictEqual(r.frames.map(f => [...f]), [[0x20, 1], [0x20, 1], [0x21, 0x68, 0x69]]);

// StartFileUpload of the LEGO app: name + NUL (not padded to 32), slot, CRC (17 bytes, packed frame below)
const example = Buffer.from('import runloop\nfrom hub import light_matrix\nprint("Console message from hub.")\nasync def main():\n    await light_matrix.write("Hello, world!")\nrunloop.run(main())');
const start = legoStartUpload('program.py', 19, legoCrc32(example));
assert.strictEqual(start.length, 17);
assert.strictEqual(hex(legoPack(start)), '0d0f73716c6471626e2d737a0b10d6f90fa202');

// console: print("tick", 3) arrives as 4 messages ended by NUL, one line must come out
const text = s => Uint8Array.from([...Buffer.from(s), 0]);
const con = new LegoConsoleBuffer();
assert.deepStrictEqual(['tick', ' ', '3'].flatMap(s => con.push(text(s))), []);
assert.deepStrictEqual(con.push(text('\r\n')), ['tick 3']);
// UTF-8 character cut between two messages, two lines in one message, print(end="") flushed at the end
const euro = Buffer.from('é');
assert.deepStrictEqual([con.push(Uint8Array.from([euro[0]])), con.push(Uint8Array.from([euro[1], 0x0a]))], [[], ['é']]);
assert.deepStrictEqual(con.push(text('a\nb\nc')), ['a', 'b']);
assert.strictEqual(con.flush(), 'c');
assert.strictEqual(con.flush(), '');

// program flow: [0x20, 0] then [0x20, 1] = normal end, even a short one without any output
const run = new LegoRunState();
run.begin();
assert.strictEqual(run.onFlow(0), null);
assert.strictEqual(run.onFlow(1), 'ended');
// stop without start after our start request = the program did not run
run.begin();
assert.strictEqual(run.onFlow(1), 'notStarted');
// late stop of the previous program (nothing requested), or user stop: no message
assert.strictEqual(run.onFlow(1), null);
run.begin();
run.cancel();
assert.strictEqual(run.onFlow(1), null);

// connect: the hub drops the frame sent right after the port opens, InfoRequest must be sent again
global.Serial = class {
    async open() {
        this.port = { readable: { getReader: () => ({ read: () => new Promise(resolve => this.push = resolve), releaseLock() { } }) } };
    }
    async write() {
        this.writes = (this.writes || 0) + 1;
        if (this.writes === 2) this.push({ value: legoPack(Uint8Array.from([0x01, 1, 0, 14, 0, 1, 6, 62, 0, 0, 2, 136, 19, 0, 16, 0, 0])), done: false });
    }
};
const info = Uint8Array.from([0x01, 1, 0, 14, 0, 1, 6, 62, 0, 20, 0, 136, 19, 0, 16, 0, 0]); // max packet size 20
const usb = new LegoPrimeLink().connect().then(({ maxPacketSize }) => assert.strictEqual(maxPacketSize, 512));

// Bluetooth: write without response on RX by packets of max packet size, answers split over TX notifications
const written = [];
let notify, disconnected;
const tx = {
    addEventListener: (_, callback) => notify = bytes => callback({ target: { value: new DataView(bytes.buffer, bytes.byteOffset, bytes.length) } }),
    startNotifications: async () => { }
};
const rx = {
    writeValueWithoutResponse: async packet => {
        written.push(Array.from(packet));
        if (written.length === 1) {
            const frame = legoPack(info);
            notify(frame.slice(0, 5));
            notify(frame.slice(5));
        }
    }
};
const device = {
    addEventListener: (_, callback) => disconnected = callback,
    gatt: { connect: async () => ({ getPrimaryService: async () => ({ getCharacteristic: async uuid => uuid === LEGO_PRIME.BLE.RX ? rx : tx }) }), disconnect: () => disconnected() }
};
Object.defineProperty(global, 'navigator', { value: { bluetooth: { requestDevice: async options => { assert.deepStrictEqual(options.filters, [{ services: [LEGO_PRIME.BLE.SERVICE] }]); return device; } } } });
const link = new LegoPrimeLink();
const ble = link.connect(true).then(async ({ maxPacketSize }) => {
    assert.strictEqual(maxPacketSize, 20);
    assert.deepStrictEqual(written[0], [0, 0, 2]);
    written.length = 0;
    await link._write(new Uint8Array(45));
    assert.deepStrictEqual(written.map(packet => packet.length), [20, 20, 5]);
    let closed = false;
    link.onClose = () => closed = true;
    await link.disconnect();
    assert.ok(closed && !link.isConnected && link.ble === null);
});
Promise.all([usb, ble]).then(() => console.log('legoPrimeLink OK'));
