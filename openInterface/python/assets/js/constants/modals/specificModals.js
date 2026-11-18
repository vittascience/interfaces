const specificModals = {
    'modal-python-files': {
        selector: '',
        header: {
            icon: 'fas fa-folder-open',
            title: 'modals.standard.pythonFiles.title'
        },
        content: `<div class="py-files">
                    <div class="py-files-head">
                        <span>${jsonPath('modals.standard.pythonFiles.name')}</span>
                        <span>${jsonPath('modals.standard.pythonFiles.size')}</span>
                    </div>
                    <div id="python-files-list" class="py-files-list"></div>
                </div>
                <label id="python-files-dropzone" class="import-dropzone mt-3" for="python-files-input">
                    <i class="fas fa-file-import import-dropzone-icon" aria-hidden="true"></i>
                    <span class="import-dropzone-title">${jsonPath('modals.standard.open.content.file-input.dropZoneTitle')}</span>
                    <span class="import-dropzone-button">${jsonPath('modals.standard.open.content.file-input.btnBrowse')}</span>
                    <span class="import-dropzone-extensions">${jsonPath('modals.standard.pythonFiles.limits')}</span>
                    <input id="python-files-input" type="file" class="import-dropzone-input" multiple title="${jsonPath('modals.standard.pythonFiles.import')}">
                </label>
                <div id="python-files-error" class="py-files-error" role="alert" hidden></div>
                <p class="py-files-hint">${jsonPath('modals.standard.pythonFiles.hint')}</p>`
    }
};
