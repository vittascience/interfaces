/**
 * SambaUploader.js — UNO R4 WiFi (Renesas RA4M1 via bridge ESP32-S3 TinyUSB)
 *
 * Séquence calquée sur la trace bossac:
 *   N# → V# (bannière) → I# (chip) →
 *   S00000000,00000034# + [52 octets stub] →
 *   W00000030,00000400#  (base = 0x4000) →
 *   W00000020,00000000#  →
 *   X00000000# (ACK "X\r\n") →
 *   Pour chaque page 4096:
 *     S00000034,<len># + [len octets]
 *     Y00000034,0#        (ACK "Y\r\n")
 *     Y<dst>,<len>#       (ACK "Y\r\n")
 *   K#
 *
 * Lit la bannière et tous les ACK attendus, avec timeouts courts.
 * Utilise le MÊME port (PID 0x1002) avant/après le touch 1200.
 */

function _hex2(u8) { return [...u8].map(b => b.toString(16).padStart(2, '0')).join(' '); }
function _ascii(u8) {
    let s = '';
    for (const c of u8) {
        if (c === 0x0d) s += '\\r'; else if (c === 0x0a) s += '\\n';
        else if (c >= 0x20 && c <= 0x7e) s += String.fromCharCode(c); else s += '.';
    }
    return s;
}
function _logToUI(prefix, u8) {
    try {
        InterfaceMonitor?.writeConsole?.(`${prefix} ${u8.length} bytes: ${_hex2(u8)}`);
        const a = _ascii(u8);
        if (a) InterfaceMonitor?.writeConsole?.(`${prefix.replace('RAW', 'ASCII')} "${a}"`);
    } catch { }
}

class SambaUploader {
    constructor(opts = {}) {
        this.pageSize = 0x1000;                       // 4096
        if (Number.isInteger(opts.pageSize) && opts.pageSize > 0) this.pageSize = opts.pageSize;

        this.usbVID = opts.usbVID ?? 0x2341;
        this.usbPID = opts.usbPID ?? 0x1002;          // TinyUSB CDC du bridge (même en boot)
        this.baud = opts.baud ?? 230400;
        this.touchDelayMs = opts.touchDelayMs ?? 800; // bascule bridge→boot
        this.interFrameDelayMs = opts.interFrameDelayMs ?? 0;
        this.debug = (opts.debug !== false);
        this._cb = opts.callbackOptions || {};

        this.STUB = Uint8Array.from([
            0x09, 0x48, 0x0A, 0x49, 0x0A, 0x4A, 0x02, 0xE0, 0x08, 0xC9, 0x08, 0xC0, 0x01, 0x3A, 0x00, 0x2A,
            0xFA, 0xD1, 0x04, 0x48, 0x00, 0x28, 0x01, 0xD1, 0x01, 0x48, 0x85, 0x46, 0x70, 0x47, 0xC0, 0x46,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00
        ]);

        this._port = null;
        this._reader = null;
        this._writer = null;
        this._enc = new TextEncoder();
        this._dec = new TextDecoder();

        this._rxBuf = ''; // tampon lignes pour _readLine/_expectAck

        this._log('Config', {
            pageSize: this.pageSize, baud: this.baud,
            vid: '0x' + this.usbVID.toString(16), pid: '0x' + this.usbPID.toString(16),
            touchDelayMs: this.touchDelayMs
        });
    }

    // -----------------------------------------------------------------------------
    // 1) flashHex : parse le .hex, aligne le buffer pour que off=0 ↔ 0x4000
    // -----------------------------------------------------------------------------
    async flashHex(hex, { verify } = {}) {
        if (typeof hex !== 'string' || !hex.trim()) {
            throw new Error('uploadHex: chaîne vide');
        }
        const text = hex.replace(/^\uFEFF/, ''); // enlève un éventuel BOM

        let imageU8, virtMin, virtMax;

        if (/^\s*:/.test(text)) {
            // --- Intel HEX ---
            const intel = this._parseIntelHex(text);
            if (!intel.bytes.length) throw new Error('HEX vide');

            // bytes : plage [minAddr..maxAddr) compactée, trous remplis par 0xFF
            imageU8 = intel.bytes;
            virtMin = (intel.minAddr >>> 0);
            virtMax = (intel.maxAddr >>> 0);

            // On veut que l’offset 0 corresponde à l’adresse 0x4000 côté flash
            const desiredBase = 0x4000 >>> 0;

            if (virtMin <= desiredBase) {
                // Cas fréquent : le .hex contient aussi des octets < 0x4000 → on les coupe
                const drop = desiredBase - virtMin;
                if (drop >= imageU8.length) throw new Error("Image ne contient rien ≥ 0x4000");
                imageU8 = imageU8.subarray(drop);
                virtMin = desiredBase;
            } else {
                // Rare : le 1er octet utile est > 0x4000 → on préfixe de 0xFF pour recoller à 0x4000
                const padLen = virtMin - desiredBase;
                const padded = new Uint8Array(padLen + imageU8.length);
                padded.fill(0xFF, 0, padLen);
                padded.set(imageU8, padLen);
                imageU8 = padded;
                virtMin = desiredBase;
            }

            this._log('HEX:', {
                min: '0x' + virtMin.toString(16),
                max: '0x' + virtMax.toString(16),
                size: imageU8.length,
                holes: intel.holes
            });

        } else {
            // --- Chaîne hex brute (non Intel HEX) ---
            const cleaned = text.replace(/[^0-9a-fA-F]/g, '');
            if (!cleaned || (cleaned.length % 2)) throw new Error('hex brut invalide');
            imageU8 = this._hexToBytes(cleaned);
            virtMin = 0x4000; // on considère déjà aligné à 0x4000
        }

        // On flashe toujours à partir de 0x4000 côté carte
        await this._flash(imageU8, { physMin: 0x4000 });
    }


    // -----------------------------------------------------------------------------
    // 2) _flash : base=0x4000, pagination 4K, dst = off (offset relatif) — comme l’IDE
    //    + PAD de la DERNIÈRE PAGE → on envoie toujours 0x1000 octets (remplis de 0xFF)
    // -----------------------------------------------------------------------------
    async _flash(imageU8, { physMin = 0x4000 } = {}) {
        // 0) Sélection du port (bridge)
        await this._selectPort();

        // 1) "Touch 1200" pour basculer le RA4 en boot via le bridge
        this._log('Touch 1200…');
        await this._openAt(1200, { dtr: false, rts: false });
        await this._sleep(80);
        await this._closePort();
        await this._sleep(this.touchDelayMs);

        // 2) Ouvre @baud (230400 par défaut) + DTR/RTS ON (comme bossac)
        this._log('Ouvre @', this.baud);
        await this._openAt(this.baud, { dtr: true, rts: true });

        // 3) Sync légère
        await this._sendAscii('N#'); await this._readLine(200).catch(() => { });
        await this._sendAscii('V#'); await this._readLine(600).catch(() => { });
        await this._sendAscii('I#'); await this._readLine(400).catch(() => { });

        // 4) Charge le stub (52 octets) à 0x00000000, configure, exécute
        await this._sendAscii('S00000000,00000034#');   // 0x34 = 52 octets
        await this._sendRaw(this.STUB);
        await this._sendAscii('W00000030,00000400#');   // ✅ base = 0x4000 (0x0400 << 4)
        await this._sendAscii('W00000020,00000000#');
        await this._sendAscii('X00000000#');
        await this._expectAck('X', 800);                // attend "X\r\n"

        // 5) Écriture paginée 4K → S + data + Y(src,0) + Y(dst,len) (+ ACK 'Y')
        const total = imageU8.length;
        const pages = Math.ceil(total / this.pageSize);
        this._log(`Écriture ${total}o en ${pages} pages de ${this.pageSize}o (physMin=0x${physMin.toString(16)})`);

        for (let page = 0; page < pages; page++) {
            const off = page * this.pageSize;
            const len = Math.min(this.pageSize, total - off);
            const isLastPartial = (len !== this.pageSize);

            // Prépare le bloc à envoyer : si dernière page partielle → pad 0xFF jusqu’à 0x1000
            let sendLen = this.pageSize;
            let toSend;
            if (isLastPartial) {
                const pageBuf = new Uint8Array(this.pageSize);
                pageBuf.fill(0xFF);
                pageBuf.set(imageU8.subarray(off, off + len), 0);
                toSend = pageBuf;
            } else {
                toSend = imageU8.subarray(off, off + len);
            }

            // 5.1 S<src=0x34,sendLen> + data
            await this._sendAscii(`S00000034,${this._hexLen(sendLen)}#`);
            await this._sendRaw(toSend);

            // 5.2 Y<src=0x34,0> (ACK 'Y')
            await this._sendAscii('Y00000034,0#');
            await this._expectAck('Y', 1200);

            // 5.3 Y<dst,sendLen> (offset relatif à la base posée) (ACK 'Y')
            const dst = off >>> 0; // 0, 0x1000, 0x2000, ...
            await this._sendAscii(`Y${this._hexAddr(dst)},${this._hexLen(sendLen)}#`);
            await this._expectAck('Y', 1800); // marge un peu large

            if (this.interFrameDelayMs > 0) await this._sleep(this.interFrameDelayMs);

            // progrès
            const sentUpTo = Math.min(off + this.pageSize, total);
            const pct = Math.floor((sentUpTo * 100) / total);
            if (typeof this._cb.onProgress === 'function') {
                this._cb.onProgress(pct);
            }
            if (pct % 10 === 0 || pct === 100) this._log(`progrès: ${pct}%`);
        }

        // 6) Reset/Run — coupe DTR/RTS puis reset (comme tu le fais déjà)
        await this._closePort();
        await this._openAt(this.baud, { dtr: false, rts: false });
        await this._sendAscii('K#');
        await this._sleep(400);

        // 7) Nettoyage
        await this._closePort();
        this._port = null;
        this._log('Terminé ✅');
    }



    /* === WebSerial === */

    async _selectPort() {
        if (this._port) return;
        const granted = await navigator.serial.getPorts();
        let p = granted.find(pt => {
            const i = pt.getInfo?.() || {};
            return i.usbVendorId === this.usbVID && i.usbProductId === this.usbPID;
        });
        if (!p) p = await navigator.serial.requestPort({});
        this._port = p;
        this._log('[bridge] choisi →', this._port.getInfo?.());
    }

    async _openAt(baud, { dtr, rts } = {}) {
        await this._port.open({ baudRate: baud });
        if (typeof dtr === 'boolean' || typeof rts === 'boolean') {
            try {
                await this._port.setSignals({ dataTerminalReady: !!dtr, requestToSend: !!rts });
            } catch { }
        }
        if (typeof this._cb.onOpen === 'function') {
            this._cb.onOpen();
        }
        // prepare reader/writer
        this._reader = this._port.readable?.getReader?.();
        this._writer = this._port.writable?.getWriter?.();
        this._rxBuf = '';
        // Wrap reader to log RX
        if (this._reader) {
            const orig = this._reader.read.bind(this._reader);
            this._reader.read = async () => {
                const r = await orig();
                if (r?.value?.length) { _logToUI(r.value); this._rxBuf += this._dec.decode(r.value, { stream: false }); }
                return r;
            };
        }
    }

    async _closePort() {
        try { await this._reader?.cancel?.(); } catch { }
        try { this._writer?.releaseLock?.(); } catch { }
        try { await this._port?.close?.(); } catch { }
        this._reader = null; this._writer = null;
        if (typeof this._cb.onClose === 'function') {
            this._cb.onClose();
        }
    }

    /* === I/O helpers === */

    async _sendAscii(s) {
        const u8 = this._enc.encode(s);
        if (this.debug) this._log('[TX ASCII]', JSON.stringify(s));
        //_logToUI('[TX RAW]', u8);
        await this._writer.write(u8);
    }
    async _sendRaw(u8) {
        if (this.debug) this._log('[TX RAW]', `${u8.length} bytes`);
        //_logToUI('[TX RAW]', u8);
        await this._writer.write(u8);
    }

    async _readLine(timeoutMs = 400) {
        const deadline = performance.now() + timeoutMs;
        while (performance.now() < deadline) {
            // flush any pending
            await this._readOnce(40);
            const idx = this._rxBuf.indexOf('\r');
            if (idx >= 0) {
                const line = this._rxBuf.slice(0, idx);
                this._rxBuf = this._rxBuf.slice(idx + 1).replace(/^\n/, ''); // tolerate \n\r or \r\n
                InterfaceMonitor.writeConsole(line);
                return line;
            }
        }
        throw new Error('Timeout lecture ligne');
    }

    async _expectAck(letter, timeoutMs = 800) {
        const deadline = performance.now() + timeoutMs;
        while (performance.now() < deadline) {
            await this._readOnce(60);
            // Cherche motif "<letter>\r\n" ou "<letter>\n\r"
            const i1 = this._rxBuf.indexOf(letter);
            if (i1 >= 0) {
                const rest = this._rxBuf.slice(i1);
                if (/^[A-Za-z]/.test(rest[0]) && (rest.startsWith(letter + '\r\n') || rest.startsWith(letter + '\n\r') || rest.startsWith(letter + '\r') || rest.startsWith(letter + '\n'))) {
                    // consomme jusqu'à fin de ligne
                    const cut = rest.indexOf('\n'); // \n le plus proche
                    if (cut >= 0) this._rxBuf = rest.slice(cut + 1); else this._rxBuf = '';
                    if (this.debug) this._log(`[ACK] ${letter}`);
                    return true;
                }
            }
        }
        throw new Error(`ACK "${letter}" non reçu`);
    }

    async _readOnce(timeoutMs = 60) {
        if (!this._reader) return { timeout: true };
        return await Promise.race([
            this._reader.read(),
            this._sleep(timeoutMs).then(() => ({ timeout: true }))
        ]);
    }

    /* === Utils === */

    _hexAddr(v) { return (v >>> 0).toString(16).toUpperCase().padStart(8, '0'); }
    _hexLen(v) { return (v >>> 0).toString(16).toUpperCase().padStart(8, '0'); }
    _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    _log(...a) { if (this.debug) { try { console.log('[SambaUploader]', ...a); } catch { } } }

    _hexToBytes(hex) {
        const n = hex.length >>> 1, out = new Uint8Array(n);
        for (let i = 0; i < n; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
        return out;
    }

    // Intel HEX → image compacte [min..max) remplie 0xFF
    _parseIntelHex(text) {
        const lines = text.replace(/\r/g, '').split('\n').map(s => s.trim()).filter(Boolean);
        let upper = 0, linear = true, min = Infinity, max = 0, totalData = 0, holes = 0;
        const chunks = [];
        const fail = (m, l) => { throw new Error(`Intel HEX: ${m}${l != null ? ` (ligne ${l + 1})` : ''}`); };
        for (let ln = 0; ln < lines.length; ln++) {
            const raw = lines[ln]; if (!raw.startsWith(':')) continue;
            const hex = raw.slice(1).replace(/\s+/g, ''); if (hex.length < 10 || hex.length % 2) fail('ligne malformée', ln);
            const b = this._hexToBytes(hex), reclen = b[0], off16 = (b[1] << 8) | b[2], rect = b[3], data = b.slice(4, 4 + reclen), cks = b[4 + reclen];
            let sum = 0; for (let i = 0; i < 4 + reclen + 1; i++) sum = (sum + b[i]) & 0xFF; if (sum !== 0) fail('checksum invalide', ln);
            if (rect === 0x00) {
                const base = linear ? ((upper & 0xFFFF) << 16) : ((upper & 0xFFFF) << 4); const abs = (base + off16) >>> 0;
                chunks.push({ addr: abs, data }); totalData += data.length;
                if (abs < min) min = abs; const end = abs + data.length; if (end > max) max = end;
            } else if (rect === 0x01) { break; }
            else if (rect === 0x02) { if (reclen !== 2) fail('type 02 invalide', ln); upper = (data[0] << 8) | data[1]; linear = false; }
            else if (rect === 0x04) { if (reclen !== 2) fail('type 04 invalide', ln); upper = (data[0] << 8) | data[1]; linear = true; }
        }
        if (min === Infinity) return { bytes: new Uint8Array(0), minAddr: 0, maxAddr: 0, totalData: 0, holes: 0 };
        const out = new Uint8Array(max - min); out.fill(0xFF);
        chunks.sort((a, b) => a.addr - b.addr);
        let cursor = min;
        for (const { addr, data } of chunks) { if (addr > cursor) holes++; out.set(data, addr - min); cursor = addr + data.length; }
        return { bytes: out, minAddr: min, maxAddr: max, totalData, holes };
    }
}

// Export global
if (typeof window !== 'undefined') window.SambaUploader = SambaUploader;
