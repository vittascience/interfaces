// Board of the PICAXE simulator (AutoProgX2), top view, drawn like media/simulator/board/picaxe.svg. Out = B.0..7, In = C.0..7, An = A.0..3.
// Loaded after Simulator.js (it creates Simulator.Mosaic).
{
    // top view of the AutoProgX2 (A4 Technologie): In 7..0 on the left, Out 7..0 on the right, An 0..3 at the bottom
    const y = i => 323 - 36 * i;
    const range = n => Array.from({ length: n }, (_, i) => i);
    const text = (t, px, py, size = 8, fill = '#fff', extra = '') => `<text x="${px}" y="${py}" font-size="${size}" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="${fill}"${extra}>${t}</text>`;
    const led = (id, cx, cy, cls = '') => `<circle cx="${cx}" cy="${cy}" r="6.5" fill="#2b2b2b"/><circle id="${id}"${cls} cx="${cx}" cy="${cy}" r="5"/>`;

    // getter: PICAXE_BOARD is defined by the blocks, loaded after this file
    Object.defineProperty(Simulator.Mosaic, 'BOARD_HEADER', { get: () => `<svg id="board-viewer" class="mt-3" viewBox="0 0 300 396" role="group" aria-label="AutoProgX2">
<title>${PICAXE_BOARD.name}</title>
<rect x="3" y="3" width="294" height="390" rx="14" fill="#545454"/>
${text('12 VDC', 70, 20, 10)}${text('OFF/ON', 150, 22, 9)}${text('PROG', 232, 20, 10)}
<rect x="136" y="28" width="28" height="11" fill="#3f3f3f"/><rect x="137" y="29" width="11" height="9" fill="#000"/>
<path d="M44 344V50a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v8c0 4 1.6 7.8 4.4 10.6l15 15c2.8 2.8 6.6 4.4 10.6 4.4h96c4 0 7.8-1.6 10.6-4.4l15-15c2.8-2.8 4.4-6.6 4.4-10.6v-8a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v294a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6Z" fill="#125035"/>
<!-- electronics of the simplified AutoProg drawing (autoprog.svg, its board mapped on x 44..256, y 44..350) -->
<rect x="211.7" y="107.9" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="134.9" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="160.5" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="185.9" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="211.3" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="236.9" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="262.6" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="288.2" width="18" height="21.1" fill="#3f3f3f"/><rect x="211.7" y="313.8" width="18" height="21.1" fill="#3f3f3f"/>
<rect x="116.7" y="107.9" width="68.1" height="42.1" fill="#3f3f3f"/>
${text('www.a4.fr', 150, 154, 6, '#dfe')}
<circle cx="132.7" cy="167.6" r="5.5" fill="#3fa9f5"/><circle cx="167.9" cy="167.6" r="5.5" fill="#3fa9f5"/>
<rect x="104.7" y="184.6" width="92.0" height="26.3" fill="#3f3f3f"/>${text('PICAXE 28X2', 151, 201, 7, '#ccc')}
<rect x="120.0" y="215.4" width="61.4" height="26.3" fill="#3f3f3f"/>${text('74HC541', 150, 235, 6, '#aaa')}
<rect x="120.0" y="245.4" width="61.4" height="8.1" fill="#bf911f"/>
${text('AUTOPROG', 150, 268, 9, '#e8f0e8')}${text('PICAXE', 150, 281, 8, '#e8f0e8')}
<circle cx="150" cy="60" r="7" fill="#3f3f3f"/><circle cx="206" cy="60" r="7" fill="#3f3f3f"/>${text('Reset', 206, 46, 7)}
${text('AutoProg', 150, 82, 16)}
${range(8).map(i => `<g class="picaxe-in" data-in="${i}" role="button" tabindex="0" aria-pressed="false" aria-label="In ${i}"><rect x="8" y="${y(i) - 17}" width="88" height="34" fill="transparent"/>${led('picaxe-in-' + i, 64, y(i))}${text('In' + i, 82, y(i) + 13, 8, '#d8e8d8')}${text(i, 20, y(i) + 4, 12)}</g>`).join('\n')}
${text('SDA', 52, y(4) - 9, 6, '#d8e8d8')}${text('SCL', 52, y(3) - 9, 6, '#d8e8d8')}
${range(8).map(i => led('picaxe-out-' + i, 236, y(i), ' class="picaxe-led"') + text('Out' + i, 214, y(i) + 13, 8, '#d8e8d8') + text(i, 280, y(i) + 4, 12)).join('\n')}
${text('ENTREES NUMERIQUES', 34, 188, 9, '#fff', ' transform="rotate(-90 34 188)"')}${text('SORTIES NUMERIQUES', 269, 188, 9, '#fff', ' transform="rotate(-90 269 188)"')}
${text('An0', 92, 344, 7, '#d8e8d8')}${text('An3', 208, 344, 7, '#d8e8d8')}
${text('ENTREES ANALOGIQUES', 150, 368, 10)}
${range(4).map(i => text(i, 86 + 42.5 * i, 386, 12)).join('')}
</svg>
<div id="picaxe-analogs">${range(4).map(i => `<label>An ${i} <input type="range" min="0" max="1023" value="512" data-an="${i}" id="picaxe-an-${i}" aria-label="An ${i}"><output id="picaxe-an-value-${i}"></output></label>`).join('')}</div>` });
}

// Shared Grove modules (interfaces/.../mosaic/groveModules.js) found in the BASIC code: one card per line and pin
Simulator.Mosaic.pin_regex = /[A-D]\.[0-7]/;
Simulator.Mosaic.groveRegex = {
    lcdGrove: /hi2csetup/i,
    servo: /\bservo\s+[A-D]\.[0-7]/i,
    buzzer: /\bsound\s+[A-D]\.[0-7]/i
};
// id: B.0 -> B0 (DOM id), name: "Sortie 0 (B.0)"
Simulator.Mosaic.getPinDef = (pin) => {
    const group = Object.keys(PICAXE_PIN_LABELS).find(g => PICAXE_BOARD[g].includes(pin));
    const name = group ? `${Blockly.Msg[PICAXE_PIN_LABELS[group]]} ${pin.slice(2)} (${pin})` : pin;
    return { name, id: pin.replace('.', '') };
};

// Listeners on #board-container (prepareToRun replaces its content at each play); the state lives in Simulator.inputs / analog
Simulator.Mosaic.addSpecificInitializations = function () {
    const container = document.getElementById('board-container');
    if (!container || container.dataset.picaxeBound) return;
    container.dataset.picaxeBound = '1';
    const toggle = (target) => {
        const pin = target.closest('[data-in]');
        if (!pin) return;
        Simulator.inputs[8 + +pin.dataset.in] ^= 1;
        this.specific.render(Simulator.vm);
    };
    container.addEventListener('click', e => toggle(e.target));
    container.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(e.target);
        }
    });
    container.addEventListener('input', e => {
        if (!e.target.matches('[data-an]')) return;
        Simulator.analog[16 + +e.target.dataset.an] = +e.target.value;
        this.specific.render(Simulator.vm);
    });
};

Simulator.Mosaic.specific = {
    definitions: [],
    calculs: {
        // ponytail: 75..225 -> 0..180 deg, servos vary
        getServoAngle: pos => Math.min(180, Math.max(0, (pos - 75) * 1.2))
    },
    // only on change: render runs at each turn of the run loop
    module(modId, pin, value) {
        const id = modId + '_' + pin.replace('.', '');
        this.shown ??= {};
        if (this.shown[id] === value || !document.getElementById(id)) return;
        this.shown[id] = value;
        Simulator.setAnimator(Simulator.getModuleByKey(modId), id, value);
    },
    // sound: Hz shown on the buzzer card while the note plays
    // pin: compiler code, pinB.n = n, pinC.n = 8 + n, pinA.n = 16 + n
    sound(code, note, ms) {
        if (!note) return;
        const pin = 'BCA'[code >> 3] + '.' + (code & 7);
        this.module('buzzer', pin, 200 + note * 30);
        clearTimeout(this.soundTimer);
        this.soundTimer = setTimeout(() => this.module('buzzer', pin, 0), ms);
    },
    onStop() {
        try { Simulator.picaxeOsc?.stop(); } catch (e) { /* already stopped */ }
    },
    // vm may be null (before the run): inputs and sliders only
    render(vm) {
        const el = id => document.getElementById(id);
        for (let i = 0; i < 8; i++) {
            const out = el('picaxe-out-' + i);
            if (!out) return; // board not drawn yet
            out.classList.toggle('on', !!vm?.outputs[i]);
            this.module('servo', 'B.' + i, vm?.servos[i] ?? null);
            const on = Simulator.inputs[8 + i];
            el('picaxe-in-' + i).classList.toggle('on', !!on);
            el('picaxe-in-' + i).parentNode.setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        for (let i = 0; i < 4; i++) {
            const v = Simulator.analog[16 + i];
            el('picaxe-an-' + i).value = v;
            el('picaxe-an-value-' + i).textContent = v >> 2;
        }
        const lcd = el('lcdGrove_value');
        if (lcd) {
            const text = vm ? vm.lcd.rows.map(row => row.replace(/&/g, '&amp;').replace(/</g, '&lt;')).join('<br/>') : '';
            if (lcd.innerHTML !== text) lcd.innerHTML = text;
            // hi2csetup gives the 8-bit address (%01111100), the card shows the 7-bit one like the other interfaces
            if (vm?.i2c) $('#lcdGrove .subtitle-module').html('I2C (0x' + (vm.i2c >> 1).toString(16) + ')');
        }
    }
};
