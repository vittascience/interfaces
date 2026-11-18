/**
 * @fileoverview Files of the Python interface (browser, Skulpt): files imported by the user or
 * written by the program with open(). Shared with Skulpt: open() (text files), the "os" module
 * (skulpt/src/os/__init__.js) and image.Image() (imported images, through Sk.imageProxy).
 * ponytail: kept in memory for the page session; persist them (IndexedDB / project) if users ask.
 */
const PythonFiles = {
    /** Imported binary files (e.g. images): name -> {blob, url} */
    binaries: {},
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    MAX_TOTAL_SIZE: 100 * 1024 * 1024,
    TEXT_EXTENSIONS: ['txt', 'csv', 'tsv', 'json', 'py', 'md', 'xml', 'html', 'htm', 'css', 'js', 'log', 'dat'],

    /** Text files, same object as the one used by Skulpt's open() */
    texts() {
        if (typeof Sk === 'undefined') return {};
        return Sk.vittaFileStorage ? Sk.vittaFileStorage() : (Sk._vittaFiles || (Sk._vittaFiles = {}));
    },

    normalize(name) {
        return String(name).replace(/^(\.\/)+/, '').replace(/^\/+/, '');
    },

    exists(name) {
        name = this.normalize(name);
        return name in this.texts() || name in this.binaries;
    },

    names() {
        return [...new Set([...Object.keys(this.texts()), ...Object.keys(this.binaries)])].sort();
    },

    size(name) {
        name = this.normalize(name);
        if (name in this.binaries) return this.binaries[name].blob.size;
        if (name in this.texts()) return new Blob([this.texts()[name]]).size;
        return -1;
    },

    remove(name) {
        name = this.normalize(name);
        if (name in this.binaries) URL.revokeObjectURL(this.binaries[name].url);
        delete this.binaries[name];
        delete this.texts()[name];
    },

    rename(oldName, newName) {
        oldName = this.normalize(oldName);
        newName = this.normalize(newName);
        if (oldName in this.binaries) {
            this.binaries[newName] = this.binaries[oldName];
            delete this.binaries[oldName];
        } else if (oldName in this.texts()) {
            this.texts()[newName] = this.texts()[oldName];
            delete this.texts()[oldName];
        }
    },

    isText(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        return file.type.startsWith('text/') || this.TEXT_EXTENSIONS.includes(ext);
    },

    totalSize() {
        return this.names().reduce((sum, name) => sum + this.size(name), 0);
    },

    async importFiles(fileList) {
        const refused = [];
        for (const file of fileList) {
            const replaced = this.exists(file.name) ? this.size(file.name) : 0;
            if (file.size > this.MAX_FILE_SIZE) {
                refused.push(jsonPath('modals.standard.pythonFiles.tooLarge').replace('{name}', file.name));
                continue;
            }
            if (this.totalSize() - replaced + file.size > this.MAX_TOTAL_SIZE) {
                refused.push(jsonPath('modals.standard.pythonFiles.quotaExceeded').replace('{name}', file.name));
                continue;
            }
            this.remove(file.name);
            if (this.isText(file)) {
                this.texts()[file.name] = await file.text();
            } else {
                this.binaries[file.name] = { blob: file, url: URL.createObjectURL(file) };
            }
        }
        const error = document.getElementById('python-files-error');
        if (error) {
            error.innerHTML = refused.map(m => this.escape(m)).join('<br>');
            error.hidden = !refused.length;
        }
        this.render();
    },

    download(name) {
        const blob = this.binaries[name] ? this.binaries[name].blob : new Blob([this.texts()[name]], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },

    /**
     * Sk.imageProxy: image.Image('photo.jpg') loads an imported image; other names keep Skulpt's default behaviour.
     */
    imageProxy(name) {
        const file = PythonFiles.binaries[PythonFiles.normalize(name)];
        if (file) return file.url;
        const a = document.createElement('a');
        a.href = name;
        return window.location.host !== a.host ? 'http://localhost:8080/320x/' + name : name;
    },

    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' o';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1).replace('.', ',') + ' Ko';
        return (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' Mo';
    },

    escape(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },

    render() {
        const list = document.getElementById('python-files-list');
        if (!list) return;
        const names = this.names();
        if (!names.length) {
            list.innerHTML = `<div class="py-files-empty">${jsonPath('modals.standard.pythonFiles.empty')}</div>`;
            return;
        }
        const icon = (name) => name in this.binaries ? 'fa-file-image' : (name.endsWith('.py') ? 'fa-file-code' : 'fa-file-alt');
        const download = jsonPath('modals.standard.pythonFiles.download');
        const remove = jsonPath('modals.standard.pythonFiles.delete');
        list.innerHTML = names.map((name, i) => `<div class="py-files-row">
                <i class="far ${icon(name)} py-files-icon"></i>
                <span class="py-files-name" title="${this.escape(name)}">${this.escape(name)}</span>
                <span class="py-files-size">${this.formatSize(this.size(name))}</span>
                <button class="py-files-action" data-pyfile-download="${i}" title="${download}" aria-label="${download} ${this.escape(name)}"><i class="fas fa-download"></i></button>
                <button class="py-files-action py-files-action--delete" data-pyfile-delete="${i}" title="${remove}" aria-label="${remove} ${this.escape(name)}"><i class="fas fa-trash"></i></button>
            </div>`).join('');
        list.querySelectorAll('[data-pyfile-download]').forEach(el => el.addEventListener('click', () => this.download(names[el.dataset.pyfileDownload])));
        list.querySelectorAll('[data-pyfile-delete]').forEach(el => el.addEventListener('click', () => {
            this.remove(names[el.dataset.pyfileDelete]);
            this.render();
        }));
    },

    open() {
        pseudoModal.openModal('modal-python-files');
        const error = document.getElementById('python-files-error');
        if (error) error.hidden = true;
        this.render();
    },
};

$('body').on('change', '#python-files-input', async function () {
    await PythonFiles.importFiles(this.files);
    this.value = '';
});

// Drag and drop, same behaviour as the project import drop zone
$('body').on('dragenter dragover', '#python-files-dropzone', function (event) {
    event.preventDefault();
    $(this).addClass('is-dragover');
});
$('body').on('dragleave dragend drop', '#python-files-dropzone', function () {
    $(this).removeClass('is-dragover');
});
$('body').on('drop', '#python-files-dropzone', function (event) {
    event.preventDefault();
    const files = event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files;
    if (files && files.length) PythonFiles.importFiles(files);
});
