'use strict';

const LEGO_PRIME_SLOT = 19; // program slot written on the hub (0-19): its previous content is erased on each run

// no Web Serial under node: the link is only built in the browser
const legoPrimeLink = typeof LegoPrimeLink === 'undefined' ? null : new LegoPrimeLink();
const legoPrimeConsole = typeof LegoConsoleBuffer === 'undefined' ? null : new LegoConsoleBuffer();
let legoPrimeUploading = false;

function legoPrimeNotify(key) {
    new VittaNotif(5).displayNotification(null, jsonPath('code.serialAPI.' + key), 'bg-danger');
}

// the console writes HTML: the text of the hub (print) must not be interpreted
const legoPrimeEscape = text => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const legoPrimeWrite = text => InterfaceMonitor.writeConsole(legoPrimeEscape(text), undefined, true);

// Hub messages: 0x21 console text, 0x20 program flow ([0x20, 0] started, [0x20, 1] ended)
function legoPrimeOnMessage(message) {
    if (message[0] === LEGO_PRIME.ID.CONSOLE) {
        legoPrimeConsole.push(message.subarray(1)).forEach(legoPrimeWrite);
    } else if (message[0] === LEGO_PRIME.ID.FLOW_NOTIF) {
        const result = legoPrimeLink.run.onFlow(message[1]);
        if (message[1] === 1) {
            const rest = legoPrimeConsole.flush();
            if (rest) legoPrimeWrite(rest);
        }
        if (result === 'ended') {
            InterfaceMonitor.writeConsole(jsonPath('code.unihiker.stopped'), 'warning');
        } else if (result === 'notStarted') {
            legoPrimeNotify('legoPrimeNotStarted');
        }
    }
}

async function legoPrimeConnect(bluetooth) {
    try {
        await legoPrimeLink.connect(bluetooth);
    } catch (e) {
        console.error(e);
        if (bluetooth) {
            const cancelled = /NotFoundError/.test(String(e));
            new VittaNotif(5).displayNotification(null, jsonPath(cancelled ? 'code.WebBluetoothAPI.noDeviceSelected' : 'code.serialAPI.legoPrimeBluetoothFailed'), 'bg-danger');
            return false;
        }
        // NetworkError "Failed to open serial port": port held by another process (LEGO app, other tab)
        const key = /No port selected|NotFoundError/i.test(String(e)) ? 'noPortSelected' : /not responding/.test(String(e)) ? 'legoPrimeOldFirmware' : e?.name === 'NetworkError' ? 'legoPrimePortBusy' : 'badResponse';
        legoPrimeNotify(key);
        return false;
    }
    legoPrimeLink.onMessage(legoPrimeOnMessage);
    legoPrimeLink.onClose = () => $('#disconnect-opt-legoprime').hide(); // hub unplugged
    $('#disconnect-opt-legoprime').show();
    InterfaceMonitor.writeConsole(jsonPath(bluetooth ? 'code.arduinoq.boardConnected' : 'code.serialAPI.boardConnected'), 'success');
    return true;
}

async function legoPrimeRun(bluetooth = false) {
    if (bluetooth ? !navigator.bluetooth : !navigator.serial) {
        new VittaNotif(5).displayNotification(null, jsonPath(bluetooth ? 'code.WebBluetoothAPI.noWebBluetoothAPI' : 'code.serialAPI.noSerialAPI'), 'bg-danger');
        return;
    }
    if (legoPrimeUploading) return;
    legoPrimeUploading = true;
    try {
        if (!legoPrimeLink.isConnected && !await legoPrimeConnect(bluetooth)) return;
        legoPrimeConsole.reset();
        await legoPrimeLink.upload(CodeManager.getSharedInstance().getCode(), LEGO_PRIME_SLOT);
    } catch (e) {
        console.error(e);
        legoPrimeNotify('badResponse');
        return;
    } finally {
        legoPrimeUploading = false;
    }
    if ($('#monitor').hasClass('monitor-closed')) {
        InterfaceMonitor.toggle();
    }
    if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
        InterfaceMonitor.managePanel('console');
    }
}

async function legoPrimeStop() {
    if (legoPrimeLink.isConnected) await legoPrimeLink.stop(LEGO_PRIME_SLOT).catch(console.error);
}

async function legoPrimeDisconnect() {
    await legoPrimeStop();
    await legoPrimeLink.disconnect();
    legoPrimeConsole.reset();
    $('#disconnect-opt-legoprime').hide();
    InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
}
