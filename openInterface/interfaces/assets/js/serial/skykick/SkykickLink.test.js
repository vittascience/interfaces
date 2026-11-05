// Run: node openInterface/interfaces/assets/js/serial/skykick/SkykickLink.test.js
const assert = require('assert');
const { SKYKICK, skykickCrc16, skykickFrame, skykickParse } = require('./SkykickLink.js');

// The original app's table (r[1] = 4129 = 0x1021, init 0) is CRC-16/XMODEM.
assert.strictEqual(skykickCrc16(Buffer.from('123456789')), 0x31c3);

// Information request sent by skykick-link during the port handshake.
const request = skykickFrame(SKYKICK.DATA_TYPE.REQUEST, SKYKICK.DEVICE.NONE, SKYKICK.DEVICE.CONTROLLER, [SKYKICK.DATA_TYPE.INFORMATION]);
assert.deepStrictEqual([...request.slice(0, 7)], [0x0a, 0x55, 4, 1, 0, 32, 7]);

// Controller answer: model number at frame bytes 7..11, as checked by the original handshake.
const info = new Uint8Array(13);
new DataView(info.buffer).setUint32(1, SKYKICK.MODEL_CONTROLLER_P5, true);
const answer = skykickFrame(SKYKICK.DATA_TYPE.INFORMATION, SKYKICK.DEVICE.CONTROLLER, SKYKICK.DEVICE.NONE, [...info]);
assert.strictEqual(new DataView(answer.buffer).getUint32(7, true), SKYKICK.MODEL_CONTROLLER_P5);

// Garbage + valid frame + corrupted frame + partial frame.
const corrupted = answer.slice();
corrupted[8] ^= 0xff;
const stream = new Uint8Array([0x00, 0x0a, ...answer, ...corrupted, ...request.slice(0, 5)]);
const { frames, rest } = skykickParse(stream);
assert.strictEqual(frames.length, 1);
assert.strictEqual(frames[0].from, SKYKICK.DEVICE.CONTROLLER);
assert.deepStrictEqual([...frames[0].payload], [...info]);
assert.deepStrictEqual([...rest], [...request.slice(0, 5)]);

console.log('SkykickLink OK');
