'use strict';

// Upload button: generated BASIC -> picaxeCompiler.js -> picaxeUploader.js (Web Serial, AXE027 cable)
let picaxeUploading = false;

function picaxeNotify(text, type = 'bg-danger') {
    new VittaNotif(5).displayNotification(null, text, type);
}

async function picaxeUpload() {
    if (!navigator.serial) return picaxeNotify(jsonPath('code.serialAPI.noSerialAPI'));
    if (picaxeUploading) return;
    let image;
    try {
        image = PicaxeCompiler.compile(CodeManager.getSharedInstance().getCode());
    } catch (e) {
        if (!(e instanceof PicaxeCompileError)) throw e;
        const key = /not supported yet/.test(e.message) && !e.line ? 'picaxeUnsupportedChip' : 'picaxeCompileError';
        return picaxeNotify(jsonPath('code.serialAPI.' + key).replace('%1', e.message));
    }
    let port;
    try {
        port = await PicaxeUploader.requestPort();
    } catch (e) {
        return picaxeNotify(jsonPath('code.serialAPI.noPortSelected'));
    }
    picaxeUploading = true;
    const progress = new ProgressBar();
    progress.addProgressBarToDom();
    progress.displayProgressBar(jsonPath('code.serialAPI.picaxeUploading'));
    let percent = 0;
    const onProgress = (ratio) => {
        if (Math.round(ratio * 100) === percent) return;
        percent = Math.round(ratio * 100);
        progress.updateProgressBar(percent);
    };
    try {
        await new PicaxeUploader(port, { onProgress }).upload(image.obj, image.eee);
        InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.fileDownloadedPicaxe'), 'success');
        picaxeNotify(jsonPath('code.serialAPI.fileDownloadedPicaxe'), 'bg-success');
    } catch (e) {
        console.error(e);
        // chip not answering (no power, cable), unknown chip, or port held by another application (PICAXE Editor)
        const key = /no answer/.test(e.message) ? 'boardNotResponding' : /not supported yet/.test(e.message) ? 'picaxeUnsupportedChip' : 'badResponse';
        picaxeNotify(jsonPath('code.serialAPI.' + key).replace('%1', e.message));
    } finally {
        progress.hideProgressBar(500);
        picaxeUploading = false;
    }
}
