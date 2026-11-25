// node openInterface/matatalab/assets/js/ble/bleAPI.test.js
const assert = require('assert');
const { MatatalabProtocol: P, MatatalabWebBLE } = require('./bleAPI.js');

(async () => {
	// Frames written as constants in the MatataCode app
	assert.deepStrictEqual(P.encode([0x7E, 0x02, 0x02, 0x00, 0x00]), [0xFE, 0x07, 0x7E, 0x02, 0x02, 0x00, 0x00, 0x97, 0x77]);
	assert.deepStrictEqual(P.encode([0x84]), [0xFE, 0x03, 0x84, 0x99, 0x50]);
	assert.deepStrictEqual(P.encode([0x88, 0x07]), [0xFE, 0x04, 0x88, 0x07, 0xF2, 0x8A]);

	// Decoding: escaped bytes, split and grouped notifications, wrong crc ignored
	const frames = [];
	const decode = P.createDecoder((frame) => frames.push(frame));
	const escaped = P.encode([0x28, 0xFE, 0xFD, 0x01]);
	assert.ok(escaped.slice(1).every((b) => b !== 0xFE));
	decode(escaped.slice(0, 3));
	decode([...escaped.slice(3), ...P.encode([0x88, 0x07])]);
	decode([0xFE, 0x04, 0x88, 0x07, 0x00, 0x00]);
	assert.deepStrictEqual(frames, [[0x28, 0xFE, 0xFD, 0x01], [0x88, 0x07]]);

	// Commands
	assert.deepStrictEqual(P.current.move(10), [[0x10, 0x01, 0, 100]]);
	assert.deepStrictEqual(P.current.move(-50), [[0x10, 0x02, 0x01, 0xF4]]);
	assert.deepStrictEqual(P.current.move(150), [[0x10, 0x01, 0x03, 0xE8], [0x10, 0x01, 0x01, 0xF4]]);
	assert.deepStrictEqual(P.current.move(0), []);
	assert.deepStrictEqual(P.current.turn(-90), [[0x10, 0x03, 0, 90]]);
	assert.deepStrictEqual(P.current.wheels(P.gearToSpeed(1), P.gearToSpeed(-6)), [[0x11, 0x03, 0x01, 0, 70, 0x02, 0, 245]]);
	assert.deepStrictEqual(P.current.note('C4', 500), [[0x15, 0x01, 0x06, 0x01, 0xF4]]);
	assert.deepStrictEqual(P.former.move(20), [[0x20, 2]]);
	assert.deepStrictEqual(P.former.turn(270), [[0x22, 180], [0x22, 90]]);
	assert.deepStrictEqual(P.former.wheels(0, 245), [[0x64, 0x6C, 0x01]]);
	assert.deepStrictEqual(P.former.eyes('both', P.toRGB('#ff0000')), [[0x64, 0x16, 0x0B]]);
	assert.deepStrictEqual(P.former.eyes('left', P.toLevel('blue', 3)), [[0x64, 0x43, 0x05]]);
	assert.deepStrictEqual(P.toRGB('#0a141e'), [10, 20, 30]);

	// Requests on a fake robot
	const robot = new MatatalabWebBLE();
	const sent = [];
	let answers = {};
	robot.isConnected = true;
	robot.writeCharacteristic = {
		properties: { write: true },
		writeValueWithResponse: async (chunk) => {
			assert.ok(chunk.length <= 20);
			sent.push([...chunk]);
			const answer = answers[chunk[2]];
			if (answer) setTimeout(() => robot.onFrame(answer), 5);
		}
	};
	robot.TIMEOUT.short = 50;
	answers = { 0x10: [0x88, 0x07], 0x18: [0x88, 0x07], 0x28: [0x28, 0x01, 0x05, 0x41, 0x20, 0x00, 0x00], 0x20: [0x20, 0x04, 0x00, 0x01] };
	await robot.moveSteps(2);
	assert.strictEqual(sent.length, 2);
	assert.strictEqual(await robot.getAngle('pitch'), 10);
	assert.strictEqual(await robot.isObstacle(), true);
	await robot.setRing(Array(12).fill([1, 2, 3]));
	answers = {};
	assert.strictEqual(await robot.isObstacle(), false); // no answer

	// Stopped program: the pending move never resolves, the robot is cancelled
	let resumed = false;
	robot.moveSteps(3).then(() => { resumed = true; });
	await new Promise((resolve) => setTimeout(resolve, 10));
	sent.length = 0;
	robot.abort();
	await new Promise((resolve) => setTimeout(resolve, 700));
	assert.strictEqual(resumed, false);
	assert.deepStrictEqual(sent.map((frame) => frame[2]), [0x84, 0x11]);
	console.log('ok');
})().catch((error) => { console.error(error); process.exit(1); });
