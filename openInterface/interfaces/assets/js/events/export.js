function openExportProjectWindow() {
    if (typeof Simulator !== 'undefined') Simulator.pause();
    const exportProjectWin = $("#modal-exportproject");
    // const api = exportProjectWin.find("#api");
    pseudoModal.openModal('modal-exportproject');
    // VittAPI disabled: API export tab commented out in generalModals.js
    // getAPIKey(api);
}