function openExportProjectWindow() {
    if (typeof Simulator !== 'undefined') Simulator.pause();
    const exportProjectWin = $("#modal-exportproject");
    const api = exportProjectWin.find("#api");
    pseudoModal.openModal('modal-exportproject');
    // Setup API export tab of modal
    getAPIKey(api);
}