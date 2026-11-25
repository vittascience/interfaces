// PICAXE 28X2 virtual machine: runs the instructions of PicaxeCompiler.program(), without DOM.
// step() executes one instruction and returns the time (ms) the program waits (pause, sound), run() chains steps.

const GOSUB_DEPTH = 8; // to check on the real chip (not measured)
const SOUND_UNIT_MS = 6.7; // measured on an AutoProgX2: sound pin, (note, d) lasts ~6.7 ms x d + ~16 ms, whatever the note
const SOUND_OVERHEAD_MS = 16;
const LCD_ADDRESS = 0x7C; // Grove 16x2 LCD

class PicaxeRuntimeError extends Error {
    constructor(message, line) {
        super(line ? `line ${line}: ${message}` : message);
        this.line = line;
    }
}

class PicaxeMachine {
    // io: { inputs: Uint8Array(24), analog: Array(24) (0..1023), sertxd(text), sound(pin, note, ms) }, kept by the UI
    constructor(program, io) {
        this.code = program.code;
        this.io = io;
        this.pc = 0;
        this.ram = new Uint8Array(56); // b0..b55, wN = b(2N) + b(2N + 1) << 8
        this.outputs = new Uint8Array(24); // B 0..7, C 8..15, A 16..23
        this.servos = {};
        this.stack = [];
        this.ended = false;
        this.i2c = null;
        this.lcd = { rows: [' '.repeat(16), ' '.repeat(16)], row: 0, col: 0 };
    }

    get(o) {
        if ('k' in o) return o.k;
        if ('pin' in o) return this.outputs[o.pin] | this.io.inputs[o.pin];
        return o.word ? this.ram[o.byte] | this.ram[o.byte + 1] << 8 : this.ram[o.byte];
    }

    set(o, v) {
        v &= 0xffff;
        if ('pin' in o) this.outputs[o.pin] = v & 1;
        else if (o.word) { this.ram[o.byte] = v & 255; this.ram[o.byte + 1] = v >> 8; }
        else this.ram[o.byte] = v & 255;
    }

    // left to right, no precedence
    calc(i) {
        let r = this.get(i.terms[0]);
        i.ops.forEach((op, n) => {
            const b = this.get(i.terms[n + 1]);
            r = op === '+' ? r + b : op === '-' ? r - b : op === '*' ? r * b
                : op === '/' ? (b ? Math.floor(r / b) : 0) : op === '//' ? (b ? r % b : r)
                : op === '&' ? r & b : r | b;
            r &= 0xffff;
        });
        return r;
    }

    // and/or chained from the right (measured on the chip): A or B and C = A or (B and C)
    test(i) {
        const c = i.conds.map(({ lhs, cmp, rhs }) => {
            const a = this.get(lhs), b = this.get(rhs);
            return cmp === '=' ? a === b : cmp === '<>' ? a !== b : cmp === '<' ? a < b : cmp === '<=' ? a <= b : cmp === '>' ? a > b : a >= b;
        });
        let r = c[c.length - 1];
        for (let n = c.length - 2; n >= 0; n--) r = i.conds[n].link === 'and' ? c[n] && r : c[n] || r;
        return r;
    }

    pin(i, line) {
        const p = this.get(i.pin);
        if (p > 23) throw new PicaxeRuntimeError('invalid pin', line);
        return p;
    }

    // Grove LCD (HD44780 behind I2C): control byte 0x40 = data, else command; bit 0x80 = one byte then a new control byte
    lcdWrite(data) {
        const lcd = this.lcd;
        for (let n = 0; n < data.length;) {
            const control = data[n++];
            const count = control & 0x80 ? 1 : data.length;
            for (const byte of data.slice(n, n + count)) {
                if (control & 0x40) {
                    if (lcd.col < 16) lcd.rows[lcd.row] = lcd.rows[lcd.row].slice(0, lcd.col) + String.fromCharCode(byte) + lcd.rows[lcd.row].slice(lcd.col + 1);
                    lcd.col++;
                } else if (byte === 1) {
                    lcd.rows = [' '.repeat(16), ' '.repeat(16)];
                    lcd.row = lcd.col = 0;
                } else if (byte === 2) lcd.row = lcd.col = 0;
                else if (byte & 0x80) {
                    const a = byte & 0x7f;
                    lcd.row = a >= 0x40 ? 1 : 0;
                    lcd.col = a & 0x3f;
                }
            }
            n += count;
        }
    }

    // executes one instruction, returns the ms to wait
    step() {
        if (this.ended || this.pc >= this.code.length) { this.ended = true; return 0; }
        const i = this.code[this.pc++];
        switch (i.op) {
            case 'let': this.set(i.dst, this.calc(i)); break;
            case 'if': if (this.test(i) === i.jumpIf) this.pc = i.target; break;
            case 'goto': this.pc = i.target; break;
            case 'high': case 'low': case 'toggle': {
                const p = this.pin(i, i.line);
                this.outputs[p] = i.op === 'toggle' ? this.outputs[p] ^ 1 : +(i.op === 'high');
                delete this.servos[p];
                break;
            }
            case 'pause': return this.get(i.ms);
            case 'readadc': {
                const v = this.io.analog[i.pin] ?? 0;
                this.set(i.dst, i.ten ? v : v >> 2);
                break;
            }
            case 'servo': this.servos[this.pin(i, i.line)] = this.get(i.pos); break;
            case 'sound': {
                const ms = Math.round(this.get(i.duration) * SOUND_UNIT_MS + SOUND_OVERHEAD_MS);
                this.io.sound(this.get(i.pin), this.get(i.note), ms);
                return ms;
            }
            case 'sertxd': this.io.sertxd(i.items.map(({ v, dec }) => dec ? String(this.get(v)) : String.fromCharCode(this.get(v) & 255)).join('')); break;
            case 'hi2csetup': this.i2c = i.address; break;
            case 'hi2cout': if ((i.address ?? this.i2c) === LCD_ADDRESS) this.lcdWrite(i.data.map(d => this.get(d) & 255)); break;
            case 'gosub':
                if (this.stack.length >= GOSUB_DEPTH) throw new PicaxeRuntimeError(`gosub: ${GOSUB_DEPTH} levels max`, i.line);
                this.stack.push(this.pc);
                this.pc = i.target;
                break;
            case 'return':
                if (!this.stack.length) throw new PicaxeRuntimeError('return without gosub', i.line);
                this.pc = this.stack.pop();
                break;
            case 'next': {
                const v = (this.get(i.v) + this.get(i.step)) & (i.v.word ? 0xffff : 0xff);
                this.set(i.v, v);
                if (v <= this.get(i.limit)) this.pc = i.target;
                break;
            }
            case 'end': this.ended = true; break;
        }
        return 0;
    }

    run(budget) {
        let ms = 0, steps = 0;
        while (!ms && !this.ended && steps < budget) { ms = this.step(); steps++; }
        return { ms, steps };
    }
}

if (typeof module !== 'undefined') {
    module.exports = { PicaxeMachine, PicaxeRuntimeError };
}
