// MinimaUploader.js
// Uploader DFU pour Arduino UNO R4 Minima (Renesas, "Santiago DFU") via WebUSB.
// - DFU standard (class 0xFE, subclass 0x01)
// - Découpe en blocs (transferSize) + polling GETSTATUS
// - Manifeste puis tente un reset (DETACH) si l’appareil ne redémarre pas tout seul
//
// Utilisation rapide :
//   const up = new MinimaUploader({ onLog, onProgress });
//   await up.requestDfuDevice();           // ↳ fenêtre WebUSB -> "Santiago DFU …"
//   await up.openAndClaim();
//   await up.flashHex(hexText);            // parse Intel HEX, offset 0x4000, transfert
//   await up.tryDetachAndReboot();         // au cas où le bootloader ne reset pas tout seul
//   await up.close();

class MinimaUploader {
  static VID = 0x2341;
  static PIDS = [0x0069, 0x0369]; // variantes UNO R4

  constructor({
    transferSize = 64,           // 64B ok sur Minima DFU (confirmé par traces)
    startAddress = 0x4000,       // offset app Minima
    filters = [
      // on privilégie un filtre "classe DFU" ⇒ moins d’ambiguïtés
      { classCode: 0xFE, subclassCode: 0x01 },
      // on garde au besoin des filtres VID/PID
      ...MinimaUploader.PIDS.map(p => ({ vendorId: MinimaUploader.VID, productId: p })),
    ],
    onLog = (msg) => console.log(`[Minima] ${msg}`),
    onProgress = (_pct) => { },
    onOpen = () => { },
    onClose = () => { },
  } = {}) {
    this.transferSize = transferSize;
    this.startAddress = startAddress;
    this.filters = filters;
    this.onLog = onLog;
    this.onProgress = onProgress;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.device = null;
    this.interfaceNumber = null;
  }

  // ---------- USB helpers

  async #controlOut(request, value, index, data) {
    const res = await this.device.controlTransferOut(
      { requestType: 'class', recipient: 'interface', request, value, index },
      data
    );
    if (res.status !== 'ok') throw new Error(`controlTransferOut failed (req=${request})`);
    return res;
  }

  async #controlIn(request, value, index, length) {
    const res = await this.device.controlTransferIn(
      { requestType: 'class', recipient: 'interface', request, value, index },
      length
    );
    if (res.status !== 'ok' || !res.data) throw new Error(`controlTransferIn failed (req=${request})`);
    return new DataView(res.data.buffer);
  }

  #parseStatus(dv) {
    // GETSTATUS: 6 bytes -> bStatus, bwPollTimeout[3], bState, iString
    const bStatus = dv.getUint8(0);
    const poll = dv.getUint8(1) | (dv.getUint8(2) << 8) | (dv.getUint8(3) << 16);
    const bState = dv.getUint8(4);
    const iString = dv.getUint8(5);
    return { bStatus, poll, bState, iString };
  }

  async #sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ---------- Public

  async requestDfuDevice() {
    //this.onLog(`Ouverture WebUSB (filtre DFU)…`);
    this.device = await navigator.usb.requestDevice({ filters: this.filters });
    return this.device;
  }

  async openAndClaim() {
    if (!this.device) throw new Error('Aucun device sélectionné');
    await this.device.open();
    this.onOpen();
    if (this.device.configuration == null) await this.device.selectConfiguration(1);

    // interface DFU (class 0xFE, subclass 0x01)
    const dfuInterface = this.device.configuration.interfaces.find(iface =>
      iface.alternates.some(a => a.interfaceClass === 0xFE && a.interfaceSubclass === 0x01)
    );
    if (!dfuInterface) throw new Error('Interface DFU introuvable sur ce périphérique');

    this.interfaceNumber = dfuInterface.interfaceNumber;
    await this.device.claimInterface(this.interfaceNumber);

    // alt setting 0 si dispo
    const alt0 = dfuInterface.alternates.find(a => a.alternateSetting === 0);
    if (alt0) await this.device.selectAlternateInterface(this.interfaceNumber, 0);

    this.onLog(`Interface DFU #${this.interfaceNumber} claimée`);
  }

  async getStatus() {
    const dv = await this.#controlIn(3 /* DFU_GETSTATUS */, 0, this.interfaceNumber, 6);
    return this.#parseStatus(dv);
  }

  async clrStatus() {
    await this.#controlOut(4 /* DFU_CLRSTATUS */, 0, this.interfaceNumber);
  }

  async getState() {
    const dv = await this.#controlIn(5 /* DFU_GETSTATE */, 0, this.interfaceNumber, 1);
    return dv.getUint8(0);
  }

  async abort() {
    await this.#controlOut(6 /* DFU_ABORT */, 0, this.interfaceNumber);
  }

  async detach(ms = 1000) {
    // DFU_DETACH (valeur=timeout en ms) → certains bootloaders rebootent
    await this.#controlOut(0 /* DFU_DETACH */, ms, this.interfaceNumber);
  }

  async close() {
    if (this.device) {
      try { await this.device.close(); } catch { }
    }
    this.onClose();
    this.device = null;
    this.interfaceNumber = null;
  }

  // ---------- DFU upload

  async flashHex(hexText, {
    startAddress = this.startAddress,
    transferSize = this.transferSize,
  } = {}) {
    // Parse + construction image alignée à 0x4000
    const parsed = this._parseIntelHex(hexText);
    const image = this.buildFirmwareForMinima(parsed, startAddress);
    this.onLog(`Image prête: ${image.length} octets à partir de 0x${startAddress.toString(16)}`);

    // Écriture
    await this.downloadFirmware(image, { transferSize });
  }

  async downloadFirmware(firmwareBytes, {
    transferSize = this.transferSize,
  } = {}) {
    if (!this.device || this.interfaceNumber == null) throw new Error('Device non ouvert/claimé');
    if (!(firmwareBytes instanceof Uint8Array)) throw new Error('firmwareBytes doit être un Uint8Array');

    // statut initial
    try {
      const st0 = await this.getStatus();
      if (st0.bStatus !== 0) {
        this.onLog(`CLRSTATUS (bStatus=${st0.bStatus})`);
        await this.clrStatus();
      }
    } catch {
      this.onLog('GETSTATUS a échoué : pas en mode DFU ?');
      throw new Error('Pas en mode DFU');
    }

    const total = firmwareBytes.length;
    let written = 0;
    let blockNum = 0;

    // boucle d’écriture
    while (written < total) {
      const chunk = firmwareBytes.subarray(written, Math.min(written + transferSize, total));

      try {
        await this.#controlOut(1 /* DFU_DNLOAD */, blockNum, this.interfaceNumber, chunk);
      } catch (e) {
        // On essaie de lire le status DFU après l’erreur
        let st = null;
        try {
          st = await this.getStatus();
          this.onLog(
            `DFU error on block ${blockNum}: ${e.message} ` +
            `(bStatus=${st.bStatus}, bState=${st.bState}, poll=${st.poll})`
          );
        } catch {
          console.error(e)
          this.onLog(`DFU error on block ${blockNum}: ${e.message}, impossible de lire GETSTATUS`);
        }
        throw e;
      }

      await this.#pollDnload();
      written += chunk.length;
      blockNum++;

      const pct = Math.floor((written / total) * 100);
      this.onProgress(pct);
    }

    // DNLOAD(0) => MANIFEST
    await this.#controlOut(1 /* DFU_DNLOAD */, blockNum, this.interfaceNumber, new Uint8Array());
    await this.#pollManifest();

    this.onProgress(100);
    this.onLog('Téléversement terminé (manifest ok)');
  }

  // ---------- Poll helpers

  async #pollDnload() {
    // Attendre dfuDNLOAD-IDLE (5) / dfuIDLE (2) ; gérer dfuDNBUSY (4)
    while (true) {
      const st = await this.getStatus();
      if (st.bStatus !== 0) throw new Error(`DFU error bStatus=${st.bStatus}`);
      if (st.poll) await this.#sleep(st.poll);
      // 2: dfuIDLE, 4: dfuDNBUSY, 5: dfuDNLOAD-IDLE
      if (st.bState === 5 || st.bState === 2) return;
      // sinon (4) on continue
    }
  }

  async #pollManifest() {
    // Certains bootloaders passent par dfuMANIFEST (7) puis dfuMANIFEST-WAIT-RESET (8) et se déconnectent.
    while (true) {
      try {
        const st = await this.getStatus();
        if (st.poll) await this.#sleep(st.poll);
        if (st.bState === 2 /* dfuIDLE */) return;
        if (st.bState === 8 /* dfuMANIFEST-WAIT-RESET */) {
          // Beaucoup reset ici -> la connexion va tomber rapidement
          await this.#sleep(50);
        }
        if (st.bState === 9 /* dfuERROR */) throw new Error('DFU error pendant manifest');
        // sinon (7) on boucle
      } catch (e) {
        // Si le device a reset et s’est déconnecté : OK.
        this.onLog('Device déconnecté pendant le manifest (reset attendu).');
        return;
      }
    }
  }

  async tryDetachAndReboot(timeoutMs = 1000) {
    // Si le device reste en dfuIDLE après le manifest, on tente DFU_DETACH pour forcer le reboot.
    try {
      const st = await this.getStatus().catch(() => null);
      if (st && (st.bState === 2 || st.bState === 5)) {
        this.onLog('Tentative de reboot (DFU_DETACH)…');
        await this.detach(timeoutMs);
      }
    } catch (e) {
      // Ignore (certains firmwares refusent DETACH hors runtime)
    }
  }

  // ---------- Image helpers (HEX -> image app 0x4000 .. max)

  buildFirmwareForMinima(parsed, startAddress = 0x4000) {
    const { bytes, minAddr, maxAddr } = parsed;
    if (!bytes || maxAddr <= minAddr) throw new Error('HEX vide');

    if (maxAddr <= startAddress) {
      throw new Error(`Aucune donnée applicative à partir de 0x${startAddress.toString(16)}`);
    }

    const outStart = startAddress;
    const outEnd = maxAddr;
    const outLen = outEnd - outStart;

    const out = new Uint8Array(outLen);
    out.fill(0xFF);

    const copySrcStart = Math.max(0, outStart - minAddr);
    const copyDstStart = Math.max(0, minAddr - outStart);
    const copyLen = Math.max(0, Math.min(bytes.length - copySrcStart, outLen - copyDstStart));

    if (copyLen > 0) {
      out.set(bytes.subarray(copySrcStart, copySrcStart + copyLen), copyDstStart);
    }

    return out;
  }

  _hexToBytes(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }

  // Intel HEX -> image compacte (min..max] remplie 0xFF
  _parseIntelHex(text) {
    const lines = text.replace(/\r/g, '').split('\n').map(s => s.trim()).filter(Boolean);
    let upper = 0, linear = true, min = Infinity, max = 0, totalData = 0, holes = 0;
    const chunks = [];
    const fail = (m, l) => { throw new Error(`Intel HEX: ${m}${l != null ? ` (ligne ${l + 1})` : ''}`); };
    for (let ln = 0; ln < lines.length; ln++) {
      const raw = lines[ln]; if (!raw.startsWith(':')) continue;
      const hex = raw.slice(1).replace(/\s+/g, ''); if (hex.length < 10 || hex.length % 2) fail('ligne malformée', ln);
      const b = this._hexToBytes(hex), reclen = b[0], off16 = (b[1] << 8) | b[2], rect = b[3], data = b.slice(4, 4 + reclen);
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

  // ---------- Optionnel : bascule automatique en DFU via Web Serial (1200 bps touch)
  // NOTE: Sur UNO R4 Minima, le “double reset” est la voie sûre. Cette méthode tente un 1200 bps touch.
  async enterBootloader() {
    if (!('serial' in navigator)) {
      this.onLog('Web Serial indisponible : fais un double appui sur RESET pour passer en DFU.');
      throw new Error('Web Serial non disponible');
    }

    const filters = MinimaUploader.PIDS.map(p => ({ usbVendorId: MinimaUploader.VID, usbProductId: p }));
    const ports = await navigator.serial.getPorts();
    let filteredPorts = [];
    for (const p of ports) {
      const infos = await p.getInfo();
      if (filters.some(f => f.usbVendorId === infos.usbVendorId && f.usbProductId === infos.usbProductId)) {
        filteredPorts.push(p);
      }
    }
    if (filteredPorts.length === 0) {
      this.onLog('La carte est déjà en mode bootloader DFU ou n\'est pas branchée.');
    } else {
      this.onLog('Tentative de passage en bootloader DFU via Web Serial (1200 bps)…');
      if (filteredPorts.length == 1) {
        try {
          await filteredPorts[0].open({ baudRate: 1200 });
          await filteredPorts[0].close();
        } catch (e) { }
      } else {
        const port = await navigator.serial.requestPort({ filters });
        try {
          await port.open({ baudRate: 1200 });
          await port.close();
        } catch (e) { }
      }
      this.onLog('<b>Sélectionne maintenant "Santiago DFU …" dans la fenêtre WebUSB. </b>');
    }
    return true;
  }
}
