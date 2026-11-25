// Run: node openInterface/picaxe/assets/js/serial/picaxeUploader.test.js
// Fake 28X2 replaying the download protocol observed on the official compiler (strace of picaxe28x2, firmware B.3).
const assert = require('assert');
const { PicaxeUploader } = require('./picaxeUploader.js');

function fakeChip({ chipId = 0xa5, wrongEchoAt = -1 } = {}) {
    let controller, waking, expected = 3, header = [];
    const chip = { received: [], header, closed: false, broke: false };
    const send = byte => controller.enqueue(Uint8Array.of(byte));
    const stream = () => new ReadableStream({ start: c => controller = c });
    let readable = stream();
    chip.port = {
        get readable() { return readable; },
        writable: new WritableStream({
            write(chunk) {
                for (const byte of chunk) {
                    if (header.length < 3) {
                        header.push(byte);
                        if (header.length === 3) expected = header[2] * 256 + 512;
                    } else if (chip.received.length < expected) {
                        send(chip.received.length === wrongEchoAt ? byte ^ 1 : byte);
                        chip.received.push(byte);
                    } else if (byte === 0x69) send(0x71);
                }
            }
        }),
        async open({ baudRate }) { assert.strictEqual(baudRate, 4800); },
        async close() { chip.closed = true; },
        async setSignals({ break: on }) {
            if (on) {
                chip.broke = true;
                let n = 0;
                // Chrome: the break start is a framing error, the stream errors and port.readable is replaced
                // (Linux shows it as a 00 byte)
                controller.error(new DOMException('Framing error', 'FramingError'));
                readable = stream();
                send(0x00);
                waking = setInterval(() => send(++n < 5 ? 0xf0 : chipId), 2);
            } else if (waking) {
                clearInterval(waking);
                waking = null;
                send(0xb3);
            }
        }
    };
    return chip;
}

(async () => {
    // 2 program blocks + table + eeprom: blocks sent last to first
    const obj = new Uint8Array(4096), eee = new Uint8Array(256);
    obj[0] = 0x11; obj[300] = 0x22; obj[3840] = 0x09; eee[0] = 0x01;
    const { blocks, data } = PicaxeUploader.payload(obj, eee);
    assert.strictEqual(blocks, 2);
    assert.strictEqual(data.length, 2 * 256 + 512);
    assert.strictEqual(data[300 - 256], 0x22); // block 1 first
    assert.strictEqual(data[256], 0x11);       // then block 0
    assert.strictEqual(data[512], 0x09);       // table
    assert.strictEqual(data[768], 0x01);       // eeprom
    assert.strictEqual(PicaxeUploader.payload(new Uint8Array(4096), eee).blocks, 1); // empty program: 1 block

    let chip = fakeChip(), progress = 0;
    const result = await new PicaxeUploader(chip.port, { onProgress: p => progress = p }).upload(obj, eee);
    assert.deepStrictEqual(result, { chip: '28X2', firmware: 0xb3, blocks: 2, status: 0x71 });
    assert.deepStrictEqual(chip.header, [0xaa, 0x00, 2]);
    assert.deepStrictEqual(chip.received, [...data]);
    assert.strictEqual(progress, 1);
    assert.ok(chip.closed);

    chip = fakeChip({ wrongEchoAt: 5 });
    await assert.rejects(new PicaxeUploader(chip.port).upload(obj, eee), /wrong echo from the PICAXE at byte 5/);
    assert.ok(chip.closed);

    chip = fakeChip({ chipId: 0x42 });
    await assert.rejects(new PicaxeUploader(chip.port, { wakeTimeout: 50 }).upload(obj, eee), /chip id 0x42 not supported/);

    // no answer at all (no power): the wake-up wait times out
    chip = fakeChip();
    chip.port.setSignals = async () => { };
    await assert.rejects(new PicaxeUploader(chip.port, { wakeTimeout: 50 }).upload(obj, eee), /no answer from the PICAXE/);
    assert.ok(chip.closed);

    console.log('picaxeUploader: all tests passed');
})().catch(e => { console.error(e); process.exit(1); });
