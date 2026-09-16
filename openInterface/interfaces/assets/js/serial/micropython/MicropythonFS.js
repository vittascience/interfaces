'use strict';

/**
 * Workspace MicropythonRepl: MicropythonFS
 * Copyright 2026 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide Micropython File System for managing board files
 * in modal named 'modal-micropython-fs'. Boards are esp32, nano-esp32, wb55, l476, pico, steami, eliobot. 
 */

/** 
 * @fileoverview WorkSpace MicropythonFS 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class MicropythonFS
 */

class MicropythonFS {

    constructor(repl) {
        this.repl = repl;

        this.isOpen = false;
        this.files = {};
        this.openedTabs = new Map();
        this.cachedFiles = new Map();
        this.openDirs = new Set();
        this.activePath = null;
        this.clipboard = null;
        this.currentTargetDir = '';
        this._settingEditorValue = false;
        this._refreshPromise = null;
        this._eventsController = null;
        this._treeRenderController = null;
        this._lastSelectedRowPath = null;
        this.pythonRunning = false;

        this.PROTECTED_FILES = ['main.py', 'boot.py', 'vitta_script.js', 'vitta_style.css'];
        if (typeof VittaInterface !== 'undefined' && VittaInterface.externalLibraries) {
            this.PROTECTED_FILES = this.PROTECTED_FILES.concat(
                Object.keys(VittaInterface.externalLibraries).map(lib => lib + '.py')
            );
        }

        this.IMPORT_MAX_SIZE = 250 * this.repl.BLOCK_BYTE; // 250 ko
        this.ALLOWED_TEXT_EXTENSIONS = [
            'py', 'txt', 'json',
            'js', 'css', 'html',
            'csv', 'md', 'xml',
            'ini', 'cfg', 'conf',
            'toml', 'yaml', 'yml',
            'env', 'log'
        ];

        this.ALLOWED_IMAGE_EXTENSIONS = [
            'png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'svg'
        ];

        this.ALLOWED_IMAGE_MIME_TYPES = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/bmp',
            'image/x-ms-bmp'
        ];

        this.ALLOWED_IMPORT_EXTENSIONS = [
            ...this.ALLOWED_TEXT_EXTENSIONS,
            ...this.ALLOWED_IMAGE_EXTENSIONS
        ];

        this.selectors = {
            // tree
            tree: '#mpy-fs-tree',
            tabs: '#mpy-fs-tabs-list',
            editor: '#mpy-fs-editor',
            emptyEditor: '#mpy-fs-empty-editor',
            // tree btns
            uploadFileBtn: '#mpy-fs-upload',
            newFileBtn: '#mpy-fs-new-file',
            newFolderBtn: '#mpy-fs-new-folder',
            renameElementBtn: '#mpy-fs-rename',
            downloadBtn: '#mpy-fs-download',
            deleteBtn: '#mpy-fs-delete',
            // main btns
            saveBtn: '#mpy-fs-save',
            playBtn: '#mpy-fs-play',
            // storage
            storageFill: '#mpy-fs-storage-fill',
            storagePercent: '#mpy-fs-storage-percent',
            storageText: '#mpy-fs-storage-text',
        };

        this.ICON_MAP = {
            py: 'fa-brands fa-python',
            js: 'fa-brands fa-js',
            css: 'fa-brands fa-css3-alt',
            html: 'fa-brands fa-html5',
            json: 'fas fa-file-code',
            txt: 'fas fa-file-lines',
            csv: 'fas fa-file-csv',
            md: 'fab fa-markdown',
            xml: 'fas fa-file-code',
            ini: 'fas fa-sliders',
            cfg: 'fas fa-sliders',
            conf: 'fas fa-sliders',
            env: 'fas fa-sliders',
            log: 'fas fa-file-lines',
            yaml: 'fas fa-file-code',
            yml: 'fas fa-file-code',
            png: 'fas fa-file-image',
            jpg: 'fas fa-file-image',
            jpeg: 'fas fa-file-image',
            webp: 'fas fa-file-image',
            bmp: 'fas fa-file-image',
            gif: 'fas fa-file-image',
            svg: 'fas fa-file-image'
        };

        this.MODAL_NAME = 'modal-micropython-fs';
        this.TREE_ITEM_FOLDER = 'mpy-fs-tree-row--dir';
        this.TREE_ITEM_FILE = 'mpy-fs-tree-row--file';
        this.TREE_ITEM_SELECTED = 'mpy-fs-tree-row--selected';
    }

    init() {
        MicropythonFS._activeEventsController?.abort();
        this._eventsController = new AbortController();
        MicropythonFS._activeEventsController = this._eventsController;

        this.updateSaveButtonState();
        this.updatePlayButtonState();

        this._bindEvents();

        window.addEventListener('modalClosed', async (event) => {
            if (event.detail.modalId === this.MODAL_NAME) {
                this.isOpen = false;
                this.repl.readingDelay = 50;
            }
        }, { signal: this._eventsController.signal });
    }

    /**
     * Bind events for the MicropythonFS class.
     * @private
     * @memberof MicropythonFS
     */
    _bindEvents() {

        document.querySelector(this.selectors.uploadFileBtn)
            ?.addEventListener('click', async () => await this.uploadFileFromComputer(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.newFileBtn)
            ?.addEventListener('click', async () => await this.createFilePrompt(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.newFolderBtn)
            ?.addEventListener('click', async () => await this.createFolderPrompt(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.renameElementBtn)
            ?.addEventListener('click', async () => await this.renameFileOrFolder(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.downloadBtn)
            ?.addEventListener('click', async () => await this.downloadSelectedFile(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.deleteBtn)
            ?.addEventListener('click', async () => await this.deleteSelectedFile(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.saveBtn)
            ?.addEventListener('click', async () => await this.saveActiveFile(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.playBtn)
            ?.addEventListener('click', async () => await this.toggleActiveFileRunning(), { signal: this._eventsController.signal });

        document.querySelector(this.selectors.tree)
            ?.addEventListener('keydown', async (event) => {
                if (event.key === 'Delete') {
                    event.preventDefault();
                    event.stopPropagation();
                    await this.deleteSelectedFile();
                    return;
                }

                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
                    event.preventDefault();
                    event.stopPropagation();
                    this.copySelectedFiles();
                    return;
                }

                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
                    event.preventDefault();
                    event.stopPropagation();
                    await this.pasteCopiedFiles();
                }

                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'x') {
                    event.preventDefault();
                    event.stopPropagation();
                    this.cutSelectedFiles();
                    return;
                }

                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
                    event.preventDefault();
                    event.stopPropagation();
                    this.selectAllInContext();
                    return;
                }

                if (event.key === 'F2' && this.isOpen) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.renameFileOrFolder();
                }

                const selectedRows = this.getSelectedRows();

                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();

                    const isRenamingOrCreating = document.querySelector('.mpy-fs-inline-input');
                    if (isRenamingOrCreating) {
                        return;
                    }

                    if (selectedRows.length >= 1) {
                        for (const row of selectedRows) {
                            const filePath = row.dataset.path;
                            if (filePath) {
                                await this.openFile(filePath);
                            }
                        }
                    }
                }

                if (selectedRows.length === 1) {
                    if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        event.stopPropagation();
                        const prevRow = selectedRows[0].previousElementSibling;
                        if (prevRow) {
                            this.selectTreeRow(prevRow, event);
                        }
                    }
                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        event.stopPropagation();
                        const nextRow = selectedRows[0].nextElementSibling;
                        if (nextRow) {
                            this.selectTreeRow(nextRow, event);
                        }
                    }
                }

            });

        document.querySelector(this.selectors.tree)
            ?.addEventListener('contextmenu', async (event) => {
                event.preventDefault();
                event.stopPropagation();

                const row = event.target.closest('.mpy-fs-tree-row');

                if (row) {
                    this.selectTreeRow(row, {});
                } else {
                    this.clearTreeSelection();
                }

                this.showContextMenu(event.clientX, event.clientY, row);
            }, { signal: this._eventsController.signal });

        document.addEventListener('mousedown', (event) => {
            if (this._contextMenu && !this._contextMenu.contains(event.target)) {
                this.hideContextMenu();
            }
        }, { signal: this._eventsController.signal });
    }

    /**
     * Refresh the file system, fetching and updating files informations and directories.
     * @public
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async refresh() {
        if (this._refreshPromise) {
            return this._refreshPromise;
        }

        this._refreshProgress = 0;

        this._refreshPromise = (async () => {
            this.repl.progressBar.displayProgressBar(jsonPath('code.repl.progressBar.filesLoading'));
            this.repl.progressBar.updateProgressBar(0);
            this.setLoading(true);

            try {
                this.files = await this.listFilesRecursive(this.repl.defaultFsPath);
                if (INTERFACE_NAME === 'microbit') {
                    this.mb_updateStorageUsage(this.files);
                } else {
                    await this.default_updateStorageUsage();
                }
                await this.syncOpenedTabsWithTree();
                this.renderTree();
                this.renderTabs();
                this.renderEditor();
                this.updateRefreshProgress(100);
            } catch (error) {
                console.error(error);
                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.readingFileError'), 'error');
            } finally {
                this.setLoading(false);
                this._refreshPromise = null;
                this.repl.progressBar.hideProgressBar(50);
            }
        })();

        return this._refreshPromise;
    }

    /**
     * Reset the file system, clearing files and resetting internal state.
     * @public
     * @memberof MicropythonFS
     */
    reset() {
        // Ferme tous les objectURL (images)
        for (const tab of this.openedTabs.values()) {
            if (tab.objectUrl) {
                URL.revokeObjectURL(tab.objectUrl);
            }
        }

        for (const tab of this.cachedFiles.values()) {
            if (tab.objectUrl) {
                URL.revokeObjectURL(tab.objectUrl);
            }
        }

        // Reset état interne
        this.files = {};
        this.openedTabs.clear();
        this.cachedFiles.clear();
        this.openDirs.clear();

        this.activePath = null;
        this.clipboard = null;
        this.currentTargetDir = '';

        this._lastSelectedRowPath = null;

        // Reset UI
        this.renderTree();
        this.renderTabs();
        this.renderEditor();
    }

    /**
     * Execute a Python command on the Micropython device.
     * @private
     * @param {string} code - The Python code to execute.
     * @returns {Promise<string>} The command's response.
     * @memberof MicropythonFS
     */
    async exec(code) {
        this.repl.commandResponse = null;
        if (!this.repl.isOpen) {
            this.repl.open();
        }
        await waitFor(_ => this.repl.isOpen === true, 50);
        return await this.repl.sendCommand(`exec(${JSON.stringify(code)})` + this.repl.END_MPY_CMD, true);
    }

    /**
     * List files in a specific directory.
     * @private
     * @param {string} [path='/'] - The directory path.
     * @returns {Promise<string[]>} A list of filenames in the directory.
     * @memberof MicropythonFS
     */
    async listFiles(path = '/') {
        if (INTERFACE_NAME == 'microbit') {
            path = ''
        } else {
            path = JSON.stringify(path);
        }
        const command = `
import os
try:
    print(os.listdir(${path}))
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;
        const response = await this.exec(command);
        if (response.includes('__MPY_FS_ERROR__')) {
            throw new Error(response);
        }
        return this.parsePythonList(response);
    }

    /**
     * Retrieve file statistics (e.g., size, permissions).
     * @private
     * @param {string} path - The file path.
     * @returns {Promise<Object>} The file statistics.
     * @memberof MicropythonFS
     */
    async statFile(path) {
        const command = `
import os
try:
    s = os.stat(${JSON.stringify(path)})
    print(list(s))
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;
        const response = await this.exec(command);

        if (response.includes('__MPY_FS_ERROR__')) {
            throw new Error(response);
        }

        const values = this.parsePythonList(response);
        return {
            mode: values[0],  // type + permissions
            ino: values[1],
            dev: values[2],
            nlink: values[3],
            uid: values[4],
            gid: values[5],
            size: values[6],  // taille en octets
            atime: values[7],
            mtime: values[8],
            ctime: values[9],
        };
    }

    /**
     * Create a file in the filesystem.
     * @public
     * @param {string} path - The file path.
     * @param {string} [content=''] - The content to write into the file.
     * @param {Object} [options={refresh: true, open: true}] - Options for refreshing and opening the file.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async createFile(path, content = '', { refresh = true, open = true } = {}) {
        await this.repl.uploadScriptToFS(path, content);
        if (refresh) {
            await this.refresh();
        }
        if (open) {
            await this.openFile(path);
        }
    }

    /**
     * Create a folder in the filesystem.
     * @public
     * @param {string} path - The folder path.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async createFolder(path) {
        const command = `
import os
try:
    os.mkdir(${JSON.stringify(path)})
    print("__MPY_FS_FOLDER_CREATED__")
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;

        const response = await this.exec(command);
        if (response.includes('__MPY_FS_ERROR__')) {
            throw new Error(response);
        }
        await this.refresh();
    }

    /**
     * Delete a file from the filesystem.
     * @public
     * @param {string} path - The file path.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async deleteFile(path) {
        const command = `
import os
try:
    os.remove(${JSON.stringify(path)})
    print("__MPY_FS_DELETED__")
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;

        const response = await this.exec(command);
        if (response.includes('__MPY_FS_ERROR__')) {
            throw new Error(response);
        }
    }

    /**
     * Rename a file or folder.
     * @public
     * @param {string} oldPath - The current path of the file/folder.
     * @param {string} newPath - The new path for the file/folder.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async renamePath(oldPath, newPath) {
        if (INTERFACE_NAME === 'microbit') {
            const tab = await this.readFileFromFS(oldPath);
            await this.deleteFile(oldPath);
            if (tab.isBinary) {
                await this.repl.uploadBinaryToFS(newPath, tab.rawContent);
            } else {
                await this.repl.uploadScriptToFS(newPath, tab.rawContent);
            }
        } else {

            let command = `
import os
try:
    os.rename(${JSON.stringify(oldPath)}, ${JSON.stringify(newPath)})
    print("__MPY_FS_RENAMED__")
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;

            const response = await this.exec(command);
            if (response.includes('__MPY_FS_ERROR__')) {
                throw new Error(response);
            }
        }
    }

    /**
     * Update storage usage information for default boards.
     * @public
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async default_updateStorageUsage() {
        const command = `
import os
try:
    s = os.statvfs(${JSON.stringify(this.repl.defaultFsPath)})
    total = s[0] * s[2]
    free = s[0] * s[3]
    used = total - free
    print([used, total])
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;

        const response = await this.exec(command);
        if (response.includes('__MPY_FS_ERROR__')) {
            return;
        }
        const [usedBytes, totalBytes] = this.parsePythonList(response);
        if (!totalBytes) return;
        this._usedBytes = usedBytes;
        this._totalBytes = totalBytes;
        this.updateStorageUsage();
    }

    /**
     * Update storage usage for the BBC micro:bit.
     * @param {Object} files
     * @memberof MicropythonFS
     */
    mb_updateStorageUsage(files) {
        const countBytes = (tree) => {
            for (let key in tree) {
                if (tree[key]._type === 'file' && tree[key].size) {
                    this._usedBytes += tree[key].size;
                } else if (tree[key]._type === 'dir' && tree[key].children) {
                    countBytes(tree[key].children);
                }
            }
        };
        this._usedBytes = 0;
        this._totalBytes = 20000;
        countBytes(files);
        this.updateStorageUsage();
    }

    /**
     * Update storage usage UX.
     * @memberof MicropythonFS
     */
    updateStorageUsage() {
        const usedKb = Math.round(this._usedBytes / 1024);
        const totalKb = Math.round(this._totalBytes / 1024);
        const percent = Math.min(100, Math.round((this._usedBytes / this._totalBytes) * 100));

        const fill = document.querySelector(this.selectors.storageFill);
        const percentEl = document.querySelector(this.selectors.storagePercent);
        const text = document.querySelector(this.selectors.storageText);

        if (fill) {
            fill.classList.toggle('mpy-fs-storage-fill--active', percent > 0);
            fill.style.width = `${percent}%`;
            fill.style.setProperty('--mpy-fs-storage-bar-width', `${fill.parentElement.offsetWidth}px`);
        }
        if (percentEl) percentEl.textContent = `${percent}%`;
        if (text) text.textContent = `${usedKb} / ${totalKb} kB`;
    }

    /**
     * Check if there is enough free space on the filesystem for a given size.
     * @public
     * @param {number} requiredBytes - The number of bytes required.
     * @returns {Promise<boolean>} True if enough space is available, false otherwise.
     * @memberof MicropythonFS
     */
    hasEnoughSpace(requiredBytes) {
        const freeBytes = (this._totalBytes ?? 0) - (this._usedBytes ?? 0);
        if (requiredBytes > freeBytes) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.notEnoughSpace') + ' ' + (Math.round((requiredBytes / 1024) * 100) / 100) + ' kiB', 'warning');
            return false;
        }
        return true;
    }

    getFileNode(path) {
        const parts = path.split('/').filter(Boolean);
        let node = this.files;

        for (let i = 0; i < parts.length; i++) {
            node = node[parts[i]];
            if (!node) return null;
            if (node._type === 'dir' && i < parts.length - 1) {
                node = node.children;
            }
        }

        return node;
    }

    /**
     * Delete an empty folder from the filesystem.
     * @public
     * @param {string} path - The folder path.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async deleteEmptyFolder(path) {
        const command = `
import os
try:
    os.rmdir(${JSON.stringify(path)})
    print("__MPY_FS_FOLDER_DELETED__")
except OSError:
    print("__MPY_FS_FOLDER_NOT_EMPTY__")
except Exception as e:
    print("__MPY_FS_ERROR__" + repr(e))`;

        const response = await this.exec(command);

        if (response.includes('__MPY_FS_FOLDER_NOT_EMPTY__')) {
            throw new Error('FOLDER_NOT_EMPTY');
        }

        if (response.includes('__MPY_FS_ERROR__')) {
            throw new Error(response);
        }
    }

    /**
     * Update the path of an opened tab when renamed.
     * @private
     * @param {string} oldPath - The old path of the file/folder.
     * @param {string} newPath - The new path of the file/folder.
     * @memberof MicropythonFS
     */
    updateOpenedTabPath(oldPath, newPath) {
        if (!this.openedTabs.has(oldPath)) return;

        const tab = this.openedTabs.get(oldPath);
        this.openedTabs.delete(oldPath);

        tab.path = newPath;
        this.openedTabs.set(newPath, tab);

        if (this.activePath === oldPath) {
            this.activePath = newPath;
        }
    }

    /**
     * List files recursively within a directory.
     * @private
     * @param {string} [path=''] - The directory path.
     * @param {number} [startPercent=0] - The starting percentage for the refresh progress.
     * @param {number} [endPercent=99] - The ending percentage for the refresh progress.
     * @returns {Promise<Object>} The tree of files and directories.
     * @memberof MicropythonFS
     */
    async listFilesRecursive(path = null, startPercent = this._refreshProgress || 0, endPercent = 99) {
        const entries = await this.listFiles(path);
        const tree = {};

        if (!entries.length) {
            this.updateRefreshProgress(endPercent);
            return tree;
        }

        const step = (endPercent - startPercent) / entries.length;
        let currentPercent = startPercent;

        for (const name of entries) {
            const fullPath = INTERFACE_NAME === 'microbit' ? name : this.joinBoardPath(path, name);

            try {
                const stat = await this.statFile(fullPath);
                const isDir = (stat.mode & 0o170000) === 0o040000;

                if (isDir) {
                    const dirStartPercent = currentPercent;
                    const dirEndPercent = currentPercent + step;

                    tree[name] = {
                        _type: 'dir',
                        children: await this.listFilesRecursive(fullPath, dirStartPercent, dirEndPercent)
                    };

                    currentPercent = dirEndPercent;
                    this.updateRefreshProgress(currentPercent);
                } else {
                    tree[name] = {
                        _type: 'file',
                        size: stat.size,
                        mtime: stat.mtime
                    };

                    currentPercent += step;
                    this.updateRefreshProgress(currentPercent);
                }
            } catch (error) {
                tree[name] = { _type: 'unknown' };
                currentPercent += step;
                this.updateRefreshProgress(currentPercent);
            }
        }

        return tree;
    }

    /**
     * Update the refresh progress bar.
     * @private
     * @param {number} percent - The percentage to update the progress.
     * @memberof MicropythonFS
     */
    updateRefreshProgress(percent) {
        this._refreshProgress = Math.max(this._refreshProgress || 0, percent);
        this._refreshProgress = Math.min(100, this._refreshProgress);
        this.repl.progressBar.updateProgressBar(Math.round(this._refreshProgress));
    }

    /**
     * Move a file or folder from one directory to another.
     * @public
     * @param {string} sourcePath - The source file/folder path.
     * @param {string} targetDir - The target directory path.
     * @param {boolean} [refresh=true] - Whether to refresh the file tree after moving.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async movePath(sourcePath, targetDir, refresh = true) {
        if (this.isProtectedFile(sourcePath)) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingFileError'), 'warning');
            return;
        }

        const filename = sourcePath.split('/').pop();
        const targetPath = this.joinUiPath(targetDir, filename);

        if (sourcePath === targetPath) return;
        if (targetPath.startsWith(`${sourcePath}/`)) return;

        const canProceed = await this.fileExistsInTarget(sourcePath, targetDir, 'cut');
        if (!canProceed) {
            return;
        }

        await this.renamePath(sourcePath, targetPath);
        this.updateOpenedTabPath(sourcePath, targetPath);

        if (refresh) {
            await this.refresh();
        }

        this.renderTabs();
        return true;
    }

    /**
     * Open a file from the filesystem.
     * @public
     * @param {string} path - The file path.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async openFile(path) {
        if (!this.openedTabs.has(path)) {
            let tab = null;

            if (this.cachedFiles?.has(path)) {
                const cachedTab = this.cachedFiles.get(path);
                const stat = await this.statFile(path);
                const hasReliableMtime = stat.mtime && cachedTab.fsMtime;
                if (stat.size === cachedTab.fsSize && (!hasReliableMtime || stat.mtime === cachedTab.fsMtime)) {
                    tab = cachedTab;
                }
            }

            if (!tab) {
                try {
                    tab = await this.readFileFromFS(path);
                    this.cachedFiles?.set(path, tab);
                } catch (error) {
                    console.error(error);
                    pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.incompleteFileReading'), 'error');
                    return;
                }
            }

            this.openedTabs.set(path, tab);
        }

        this.activePath = path;
        this.renderTabs();
        this.renderEditor();
    }

    /**
     * Read a file's content from the filesystem.
     * @private
     * @param {string} path - The file path.
     * @returns {Promise<Object>} The file content and metadata.
     * @memberof MicropythonFS
     */
    async readFileFromFS(path) {
        const stat = await this.statFile(path);
        const rawContent = await this.repl.downloadLibraryFromFS(path);

        if (rawContent === null) {
            throw new Error(`Incomplete file reading ${path}`);
        }

        const filename = path.split('/').pop();
        const fileLike = { name: filename };

        if (this.isImageFile(fileLike)) {
            let bytes;

            if (rawContent instanceof Uint8Array) {
                bytes = rawContent;
            } else {
                bytes = new Uint8Array(rawContent.length);
                for (let i = 0; i < rawContent.length; i++) {
                    bytes[i] = rawContent.charCodeAt(i) & 0xff;
                }
            }

            const ext = this.getFileExtension(fileLike);
            const mimeMap = {
                png: 'image/png',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                webp: 'image/webp',
                bmp: 'image/bmp',
                gif: 'image/gif',
                svg: 'image/svg+xml'
            };

            const blob = new Blob([bytes], {
                type: mimeMap[ext] || 'application/octet-stream'
            });

            return {
                path,
                rawContent: bytes,
                content: '',
                savedContent: '',
                objectUrl: URL.createObjectURL(blob),
                fsSize: stat.size,
                fsMtime: stat.mtime,
                isBinary: true,
                isImage: true,
                dirty: false
            };
        }

        let textContent;

        if (rawContent instanceof Uint8Array) {
            textContent = new TextDecoder('utf-8').decode(rawContent);
        } else {
            textContent = rawContent;
        }

        const content = this.repl._normalizePythonSource(textContent);

        return {
            path,
            rawContent: textContent,
            content,
            savedContent: content,
            fsSize: stat.size,
            fsMtime: stat.mtime,
            isBinary: false,
            isImage: false,
            dirty: false
        };
    }

    /**
     * Save the currently active file to the filesystem.
     * @public
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async saveActiveFile() {
        if (!this.activePath) return;

        if (this.isProtectedFile(this.activePath)) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.fileModifyError'), 'warning');
            return;
        }

        const tab = this.openedTabs.get(this.activePath);
        const content = this.getEditorValue();

        await this.repl.uploadScriptToFS(this.activePath, content);
        const stat = await this.statFile(this.activePath);

        tab.content = content;
        tab.savedContent = content;
        tab.rawContent = content;
        tab.fsSize = stat.size;
        tab.fsMtime = stat.mtime;
        tab.dirty = false;

        this.renderTabs();
        pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.savedFile'), 'success');
    }

    /**
     * Run the currently active Python file on the board.
     * Saves first if the file has unsaved changes.
     * @public
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async toggleActiveFileRunning() {
        if (!this.activePath || !this.activePath.endsWith('.py')) return;
        if (this.pythonRunning) {
            await this.repl.open();
        } else {
            const tab = this.openedTabs.get(this.activePath);
            if (tab?.dirty) {
                await this.saveActiveFile();
            }
            this.repl.runFile(this.activePath);
            await this.repl.sendCommand(this.repl.Queue.dequeue());
            this.pythonRunning = true;
            this.updatePlayButtonState();
        }
    }

    /**
     * Delete the selected file(s) from the filesystem.
     * @public
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async deleteSelectedFile() {
        const selectedRows = this.getSelectedRows();

        if (!selectedRows.length) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.noSelectedFile'), 'warning');
            return;
        }

        const items = selectedRows.map(row => ({
            path: row.dataset.path,
            isFile: row.classList.contains(this.TREE_ITEM_FILE),
            isDir: row.classList.contains(this.TREE_ITEM_FOLDER)
        })).filter(item => item.path);

        if (items.some(item => this.isProtectedFile(item.path))) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.deleteProtectedFile'), 'warning');
            return;
        }

        pseudoModal.openModal('modal-mpy-fs-warningdelete', true, false);

        const $yesBtn = $('#modal-mpy-fs-warningdelete-yes');
        const $noBtn = $('#modal-mpy-fs-warningdelete-no');

        $yesBtn.focus();

        $yesBtn.off('click').one('click', async () => {
            document.activeElement?.blur();
            try {
                pseudoModal.closeModal('modal-mpy-fs-warningdelete');
            } catch (e) { }

            try {
                for (const item of items) {
                    if (item.isDir) {
                        try {
                            await this.deleteEmptyFolder(item.path);
                        } catch (error) {
                            if (error.message === 'FOLDER_NOT_EMPTY') {
                                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.deleteFolderFiles'), 'warning');
                                return;
                            }
                            throw error;
                        }
                    } else {
                        await this.deleteFile(item.path);
                        this.openedTabs.delete(item.path);
                    }
                }

                if (this.activePath && !this.openedTabs.has(this.activePath)) {
                    this.activePath = this.openedTabs.keys().next().value || null;
                }

                await this.refresh();
                this.renderTabs();
                this.renderEditor();

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.deletedFiles'), 'success');
            } catch (error) {
                console.error(error);
                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.fs.repl.deleteFileError'), 'error');
            }
        });

        $noBtn.off('click').one('click', () => {
            document.activeElement?.blur();
            try {
                pseudoModal.closeModal('modal-mpy-fs-warningdelete');
            } catch (e) { }
        });
    }

    /**
     * Close a tab from the opened tabs.
     * @public
     * @param {string} path - The file path of the tab to close.
     * @memberof MicropythonFS
     */
    closeTab(path) {
        const tab = this.openedTabs.get(path);

        this.openedTabs.delete(path);

        if (this.activePath === path) {
            this.activePath = this.openedTabs.keys().next().value || null;
        }

        this.renderTabs();
        this.renderEditor();
    }

    /**
     * Check if a file or folder is protected and cannot be modified.
     * @private
     * @param {string} path - The path of the file/folder.
     * @returns {boolean} True if the file/folder is protected.
     * @memberof MicropythonFS
     */
    isProtectedFile(path) {
        if (!path) return false;
        const normalizedPath = String(path).replace(/^\/+/, '');
        const isRootFile = !normalizedPath.includes('/');
        return isRootFile && this.PROTECTED_FILES.includes(normalizedPath);
    }

    /**
     * Render the file tree in the UI.
     * @public
     * @memberof MicropythonFS
     */
    renderTree() {
        const container = document.querySelector(this.selectors.tree);
        if (!container) return;

        container.setAttribute('tabindex', '0');

        if (!this.files || Object.keys(this.files).length === 0) {
            container.innerHTML = `<div class="mpy-fs-empty">${jsonPath('code.repl.fs.noFileUploaded')}</div>
            <div class="mpy-fs-drop-hint">
                ${jsonPath('code.repl.fs.dragDropFiles')}
            </div>`;
            return;
        }

        const renderNode = (tree, basePath = '', depth = 0) => {
            if (!tree || typeof tree !== 'object') return '';

            return Object.entries(tree)
                .filter(([name]) => !['_type', 'size', 'mtime', 'ino', 'dev', 'children'].includes(name))
                .sort(([nameA, nodeA], [nameB, nodeB]) => {
                    if (nodeA._type === 'dir' && nodeB._type !== 'dir') return -1;
                    if (nodeA._type !== 'dir' && nodeB._type === 'dir') return 1;
                    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
                })
                .map(([name, node]) => {
                    const fullPath = basePath ? `${basePath}/${name}` : name;
                    const indent = depth * 16;

                    if (node._type === 'dir') {
                        const isDirOpen = this.openDirs.has(fullPath);
                        const children = renderNode(node.children, fullPath, depth + 1);
                        return `
                            <div class="mpy-fs-tree-dir" data-dir-path="${fullPath}">
                                <div class="mpy-fs-tree-row ${this.TREE_ITEM_FOLDER}" style="padding-left: ${indent}px" data-path="${fullPath}" data-open="${isDirOpen ? 'true' : 'false'}" draggable="true">
                                    <span class="mpy-fs-tree-arrow">${isDirOpen ? '▾' : '▸'}</span>
                                    <i class="${isDirOpen ? 'fas fa-folder-open' : 'fas fa-folder'} mpy-fs-tree-icon mpy-fs-tree-icon--dir"></i>
                                    <span class="mpy-fs-tree-label">${name}</span>
                                </div>
                                <div class="mpy-fs-tree-children ${isDirOpen ? '' : 'mpy-fs-tree-children--collapsed'}">
                                    ${children}
                                </div>
                            </div>`;
                    }

                    const ext = name.split('.').pop().toLowerCase();
                    const icon = this.ICON_MAP[ext] || 'fas fa-file';

                    const size = node.size != null ? `<span class="mpy-fs-tree-size">${this._formatSize(node.size)}</span>` : '';

                    return `
                    <div class="mpy-fs-tree-row ${this.TREE_ITEM_FILE}" style="padding-left: ${indent + 20}px" data-path="${fullPath}" draggable="true">
                        <i class="${icon} mpy-fs-tree-icon"></i>
                        <span class="mpy-fs-tree-label">${name}</span>
                        ${size}
                    </div>
                `;
                }).join('');
        };

        container.innerHTML = `${renderNode(this.files)}
            <div class="mpy-fs-drop-hint">${jsonPath('code.repl.fs.dragDropFiles')}</div>`;
        container.dataset.dropLabel = jsonPath('code.repl.fs.importFile');

        this._treeRenderController?.abort();
        this._treeRenderController = new AbortController();
        const treeSignal = this._treeRenderController.signal;

        const isExternalFileDrag = (event) =>
            Array.from(event.dataTransfer?.types || []).includes('Files');

        container.addEventListener('dragover', (event) => {
            event.preventDefault();

            const isOverDir = !!event.target.closest('.' + this.TREE_ITEM_FOLDER);

            if (isExternalFileDrag(event) && !isOverDir) {
                container.classList.add('mpy-fs-tree--external-drop-root');
                event.dataTransfer.dropEffect = 'copy';
            } else {
                container.classList.remove('mpy-fs-tree--external-drop-root');
            }
        }, { signal: treeSignal });

        container.addEventListener('dragleave', (event) => {
            if (!container.contains(event.relatedTarget)) {
                container.classList.remove('mpy-fs-tree--external-drop-root');
            }
        }, { signal: treeSignal });

        container.addEventListener('drop', async (event) => {
            event.preventDefault();
            container.classList.remove('mpy-fs-tree--external-drop-root');

            const targetDirRow = event.target.closest('.' + this.TREE_ITEM_FOLDER);
            const targetDir = targetDirRow?.dataset.path || '';

            // Upload depuis l’ordinateur
            if (event.dataTransfer.files?.length) {
                const files = [...event.dataTransfer.files];
                const canReplace = await this.confirmReplaceExistingFiles(files, targetDir);
                if (!canReplace) return;

                let importedCount = 0;
                for (const file of files) {
                    const imported = await this.uploadLocalFileToFS(file, targetDir);
                    if (imported) importedCount++;
                }
                if (importedCount > 0) {
                    await this.refresh();
                }
                return;
            }

            // Déplacement interne
            if (targetDirRow) return;

            const jsonPaths = event.dataTransfer.getData('application/json');
            const paths = jsonPaths ? JSON.parse(jsonPaths) : [event.dataTransfer.getData('text/plain')];

            for (const sourcePath of paths.filter(Boolean)) {
                await this.movePath(sourcePath, targetDir, false);
            }

            await this.refresh();
        }, { signal: treeSignal });

        container.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return;

            const row = event.target.closest('.mpy-fs-tree-row');

            if (!row) {
                this.clearTreeSelection();
            }
            this.currentTargetDir = row ? row.dataset.path || '/' : '/';
            container.focus();
        }, { signal: treeSignal });

        // Dossiers : toggle collapse
        container.querySelectorAll('.' + this.TREE_ITEM_FOLDER).forEach(row => {
            row.addEventListener('click', (event) => {
                event.stopPropagation();

                this.selectTreeRow(row, event);
                container.focus();

                const children = row.parentElement.querySelector('.mpy-fs-tree-children');
                const arrow = row.querySelector('.mpy-fs-tree-arrow');
                const icon = row.querySelector('.mpy-fs-tree-icon--dir');
                const isOpen = row.dataset.open === 'true';

                children.classList.toggle('mpy-fs-tree-children--collapsed', isOpen);
                arrow.textContent = isOpen ? '▸' : '▾';
                icon.className = isOpen
                    ? 'fas fa-folder mpy-fs-tree-icon mpy-fs-tree-icon--dir'
                    : 'fas fa-folder-open mpy-fs-tree-icon mpy-fs-tree-icon--dir';

                row.dataset.open = isOpen ? 'false' : 'true';

                if (row.dataset.open === 'true') {
                    this.openDirs.add(row.dataset.path);
                } else {
                    this.openDirs.delete(row.dataset.path);
                }
            }, { signal: treeSignal });
        });

        // Fichiers : simple clic = sélection, double clic = ouverture
        container.querySelectorAll('.' + this.TREE_ITEM_FILE).forEach(row => {
            row.addEventListener('click', (event) => {
                event.stopPropagation();
                this.selectTreeRow(row, event);
                container.focus();
            }, { signal: treeSignal });

            row.addEventListener('dblclick', (event) => {
                event.stopPropagation();
                row.classList.add('mpy-fs-tree-row--loaded');
                this.openFile(row.dataset.path);
            }, { signal: treeSignal });
        });

        container.querySelectorAll('.mpy-fs-tree-row').forEach(row => {
            row.addEventListener('dragstart', (event) => {
                const sourcePath = row.dataset.path;

                if (this.isProtectedFile(sourcePath)) {
                    event.preventDefault();
                    return;
                }

                const selectedRows = this.getSelectedRows()
                    .filter(selectedRow => selectedRow.classList.contains(this.TREE_ITEM_FILE));

                const selectedPaths = selectedRows
                    .map(selectedRow => selectedRow.dataset.path)
                    .filter(Boolean);

                const pathsToMove = selectedPaths.includes(sourcePath)
                    ? selectedPaths
                    : [sourcePath];

                event.dataTransfer.setData('application/json', JSON.stringify(pathsToMove));
                event.dataTransfer.setData('text/plain', sourcePath);
                event.dataTransfer.effectAllowed = 'move';
            }, { signal: treeSignal });
        });

        container.querySelectorAll('.' + this.TREE_ITEM_FOLDER).forEach(row => {
            const dragTargetClass = 'mpy-fs-tree-row--drop-target';
            row.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.stopPropagation();

                container.classList.remove('mpy-fs-tree--external-drop-root');

                event.dataTransfer.dropEffect = event.dataTransfer.files?.length ? 'copy' : 'move';
                row.classList.add(dragTargetClass);
            }, { signal: treeSignal });

            row.addEventListener('dragleave', () => {
                row.classList.remove(dragTargetClass);
            }, { signal: treeSignal });

            row.addEventListener('drop', async (event) => {
                event.preventDefault();
                event.stopPropagation();

                row.classList.remove(dragTargetClass);

                const targetDir = row.dataset.path;

                // Upload ordinateur vers ce dossier
                if (event.dataTransfer.files?.length) {
                    const files = [...event.dataTransfer.files];
                    const canReplace = await this.confirmReplaceExistingFiles(files, targetDir);
                    if (!canReplace) return;

                    let importedCount = 0;
                    for (const file of files) {
                        const imported = await this.uploadLocalFileToFS(file, targetDir);
                        if (imported) importedCount++;
                    }
                    if (importedCount > 0) {
                        await this.refresh();
                    }
                    return;
                }

                // Déplacement interne vers ce dossier
                const jsonPaths = event.dataTransfer.getData('application/json');
                const paths = jsonPaths ? JSON.parse(jsonPaths) : [event.dataTransfer.getData('text/plain')];

                for (const sourcePath of paths.filter(Boolean)) {
                    await this.movePath(sourcePath, targetDir, false);
                }

                await this.refresh();

            }, { signal: treeSignal });
        });
    }

    /**
     * Render the tabs in the UI.
     * @public
     * @memberof MicropythonFS
     */
    renderTabs() {
        const container = document.querySelector(this.selectors.tabs);
        if (!container) return;

        container.innerHTML = [...this.openedTabs.values()].map(tab => {
            const isProtected = this.isProtectedFile(tab.path);

            return `
        <li class="nav-item" role="presentation">
            <button class="nav-link ${tab.path === this.activePath ? 'active' : ''}" data-tab-path="${tab.path}">
                ${tab.dirty ? '● ' : ''}
                ${tab.path}
                ${isProtected ? `
                    <span class="codeOnly mpy-fs-readonly-indicator" title="Fichier en lecture seule" aria-label="Fichier en lecture seule">
                        <i class="fa-solid fa-lock"></i>
                    </span>` : ''}

                <span class="mpy-fs-tab-close" data-close-path="${tab.path}">&times;</span>
            </button>
        </li>`;
        }).join('');

        container.querySelectorAll('[data-tab-path]').forEach(tabButton => {
            tabButton.addEventListener('click', async () => {
                this.activePath = tabButton.dataset.tabPath;
                this.renderTabs();
                this.renderEditor();
                this.focusEditor();
            });
        });

        container.querySelectorAll('[data-close-path]').forEach(closeButton => {
            closeButton.addEventListener('click', async (event) => {
                event.stopPropagation();

                const path = closeButton.dataset.closePath;
                const tab = this.openedTabs.get(path);

                if (tab?.dirty) {
                    pseudoModal.openModal('modal-mpy-fs-warningsave', true, false);

                    $('#modal-mpy-fs-warningsave-yes').off('click').one('click', async () => {
                        pseudoModal.closeModal('modal-mpy-fs-warningsave');
                        this.activePath = path;
                        await this.saveActiveFile();
                        this.closeTab(path);
                    });

                    $('#modal-mpy-fs-warningsave-no').off('click').one('click', () => {
                        pseudoModal.closeModal('modal-mpy-fs-warningsave');
                        this.closeTab(path);
                    });

                    return;
                }

                this.closeTab(path);
            });
        });

        this.updateSaveButtonState();
        this.updatePlayButtonState();
    }

    /**
     * Initialize the editor for file content editing.
     * @public
     * @memberof MicropythonFS
     */
    initEditor() {
        this._aceEditor = ace.edit('mpy-fs-ace-editor');

        // Reprend le même thème que l'éditeur principal
        const mainEditor = Main.getCodeEditor()?.container;
        const theme = mainEditor ? mainEditor.getTheme() : 'ace/theme/tomorrow_night';
        this._aceEditor.setTheme(theme);

        this._aceEditor.setOptions({
            fontSize: '14px',
            showPrintMargin: false,
            useSoftTabs: true,
            wrap: false,
        });

        this._aceEditor.commands.addCommand({
            name: 'saveFile',
            bindKey: {
                win: 'Ctrl-S',
                mac: 'Command-S'
            },
            exec: () => {
                this.saveActiveFile();
            }
        });

        this._aceEditor.on('paste', (e) => {
            if (this.isProtectedFile(this.activePath)) {
                e.text = '';
                this.showProtectedFileMessage();
            }
        });

        this._aceEditor.commands.on('exec', (event) => {
            if (!this.activePath) return;

            if (this.isProtectedFile(this.activePath)) {
                const blockedCommands = [
                    'insertstring',
                    'backspace',
                    'del',
                    'cut',
                    'paste',
                    'removeline',
                    'duplicateSelection',
                    'transposeletters'
                ];

                if (blockedCommands.includes(event.command.name)) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.command.exec = () => { }; // bloque vraiment la commande
                    this.showProtectedFileMessage();
                }
            }
        });

        this._aceEditor.on('change', () => {
            if (this._settingEditorValue) return;
            if (!this.activePath) return;

            const t = this.openedTabs.get(this.activePath);
            if (t) {
                t.content = this._aceEditor.getValue();
                t.dirty = t.content !== t.savedContent;
                this.renderTabs();
            }
        });
    }

    /**
     * Render the editor in the UI for the active file.
     * @public
     * @memberof MicropythonFS
     */
    renderEditor() {
        const editorEl = document.querySelector(this.selectors.editor);
        const emptyEl = document.querySelector(this.selectors.emptyEditor);

        if (!editorEl || !emptyEl) return;

        if (!this.activePath) {
            if (this._aceEditor) {
                this._aceEditor.destroy();
                this._aceEditor = null;
            }
            editorEl.innerHTML = '';
            emptyEl.style.display = 'block';
            return;
        }

        const tab = this.openedTabs.get(this.activePath);
        emptyEl.style.display = 'none';

        if (tab?.isImage) {
            if (this._aceEditor) {
                this._aceEditor.destroy();
                this._aceEditor = null;
            }

            editorEl.innerHTML = `
                <div class="mpy-fs-image-preview">
                    <img src="${tab.objectUrl}" alt="${this.escapeHtml(tab.path)}">
                </div>`;

            this.updateSaveButtonState();
            this.updatePlayButtonState();
            return;
        }

        // Initialise Ace une seule fois
        if (!this._aceEditor) {
            editorEl.innerHTML = '<div id="mpy-fs-ace-editor" style="width:100%;height:100%;"></div>';
            this.initEditor();
        }

        // Mode syntaxique selon l'extension
        const ext = this.activePath.split('.').pop();
        const modeMap = {
            py: 'ace/mode/python',
            json: 'ace/mode/json',
            js: 'ace/mode/javascript',
            css: 'ace/mode/css',
            html: 'ace/mode/html'
        };
        this._aceEditor.session.setMode(modeMap[ext] || 'ace/mode/text');
        this._aceEditor.session.setUseWorker(false);
        this._settingEditorValue = true;
        this._aceEditor.setValue(tab.content, -1);
        this._settingEditorValue = false;

        const isProtected = this.isProtectedFile(this.activePath);
        this._aceEditor.setReadOnly(isProtected);
        this._aceEditor.container.classList.toggle('mpy-fs-editor--readonly', isProtected);

        this.updateSaveButtonState();
        this.updatePlayButtonState();
        this.focusEditor();
    }

    /**
     * Focus on the editor.
     * @public
     * @memberof MicropythonFS
     */
    focusEditor() {
        requestAnimationFrame(() => {
            this._aceEditor?.focus();
        });
    }

    /**
     * Show a warning message when trying to write to a protected file.
     * @private
     * @memberof MicropythonFS
     */
    showProtectedFileMessage() {
        const now = Date.now();
        if (this._lastProtectedMessageAt && now - this._lastProtectedMessageAt < 1200) {
            return;
        }
        this._lastProtectedMessageAt = now;
        pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.writingProtectedFile'), 'warning');
    }

    /**
     * Download the selected file(s) from the filesystem.
     * @public
     * @memberof MicropythonFS
     */
    async downloadSelectedFile() {
        const selectedRows = this.getSelectedRows();

        if (!selectedRows.length) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.noSelectedFile'), 'warning');
            return;
        }

        // If the selected row is a single directory → download as zip
        if (selectedRows.length === 1 && selectedRows[0].classList.contains(this.TREE_ITEM_FOLDER)) {
            await this.downloadDirAsZip(selectedRows[0].dataset.path);
            return;
        }

        // Otherwise: filter to files only (original behaviour)
        const fileRows = selectedRows.filter(row => row.classList.contains(this.TREE_ITEM_FILE));

        if (!fileRows.length) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.noSelectedFile'), 'warning');
            return;
        }

        try {
            const files = [];

            for (const row of fileRows) {
                const path = row.dataset.path;
                if (!path) continue;

                const content = this.openedTabs.has(path)
                    ? this.openedTabs.get(path).content
                    : await this.repl.downloadLibraryFromFS(path);

                files.push({ path, content });
            }

            if (files.length === 1) {
                const filename = files[0].path.split('/').pop();
                this.downloadBlob(
                    new Blob([files[0].content], { type: 'text/plain;charset=utf-8' }),
                    filename
                );

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.fileDownloaded'), 'success');
                return;
            }

            const zip = new JSZip();

            for (const file of files) {
                zip.file(file.path, file.content);
            }

            const blob = await zip.generateAsync({ type: 'blob' });

            this.downloadBlob(blob, 'micropython-files.zip');

            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.zipFile'), 'success');
        } catch (error) {
            console.error(error);
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.downloadError'), 'error');
        }
    }

    /**
     * Download an entire directory as a .zip file.
     * Files already open in tabs use their in-memory content;
     * others are fetched from the board one by one.
     * The zip filename is: `<INTERFACE_NAME>-<dirName>.zip`
     * @private
     * @param {string} dirPath - Absolute path of the directory on the board.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async downloadDirAsZip(dirPath) {
        const dirName = dirPath.split('/').filter(Boolean).pop() || dirPath;
        const zipName = `${INTERFACE_NAME}-${dirName}.zip`;

        try {
            // Recursively collect all file paths under dirPath
            const allFilePaths = [];
            const walk = async (currentPath) => {
                const tree = await this.listFilesRecursive(currentPath);
                const flatten = (node, base) => {
                    for (const [name, entry] of Object.entries(node)) {
                        if (name === '_type') continue;
                        const fullPath = base ? `${base}/${name}` : name;
                        if (entry._type === 'file') {
                            allFilePaths.push(fullPath);
                        } else if (entry._type === 'dir' && entry.children) {
                            flatten(entry.children, fullPath);
                        }
                    }
                };
                flatten(tree, currentPath);
            };
            await walk(dirPath);

            const zip = new JSZip();

            for (const filePath of allFilePaths) {
                const content = this.openedTabs.has(filePath)
                    ? this.openedTabs.get(filePath).content
                    : await this.repl.downloadLibraryFromFS(filePath);

                // Store relative path inside the zip (strip leading dirPath prefix)
                const relativePath = filePath.startsWith(dirPath + '/')
                    ? filePath.slice(dirPath.length + 1)
                    : filePath;

                zip.file(relativePath, content);
            }

            const blob = await zip.generateAsync({ type: 'blob' });
            this.downloadBlob(blob, zipName);

            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.zipFile'), 'success');
        } catch (error) {
            console.error(error);
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.downloadError'), 'error');
        }
    }

    /**
     * Check if an image file is allowed based on its extension and MIME type.
     * @private
     * @param {File} file - The file to check.
     * @returns {boolean} True if the image file is allowed.
     * @memberof MicropythonFS
     */
    isAllowedImageFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        return this.ALLOWED_IMAGE_EXTENSIONS.includes(ext)
            && (!file.type || this.ALLOWED_IMAGE_MIME_TYPES.includes(file.type));
    }

    /**
     * Open the import warning modal if the file exceeds size limits.
     * @private
     * @param {File} file - The file to check.
     * @memberof MicropythonFS
     */
    openImportWarningModal(file) {
        pseudoModal.openModal('modal-mpy-fs-warningimport', true, false);

        const importHintEl = document.querySelector('#mpy-fs-warningimport-hint');

        const message = jsonPath('modals.warning.mpy-fs.importSize.hint')
            .replace('{FILENAME}', '<strong>' + file.name + '</strong>')
            .replace('{SIZE}', '<strong>' + this._formatSize(file.size) + '</strong>');

        if (importHintEl) importHintEl.innerHTML = message;
    }

    /**
     * Upload a local file to the filesystem.
     * @public
     * @param {File} file - The file to upload.
     * @param {string} [targetDir=''] - The target directory for the file.
     * @param {boolean} [isReplace=false] - Whether to replace existing files.
     * @returns {Promise<Object|false>} The uploaded file object or false if the upload failed.
     * @memberof MicropythonFS
     */
    async uploadLocalFileToFS(file, targetDir = '', isReplace = false) {
        if (!this.hasEnoughSpace(file.size)) {
            return false;
        }

        if (!this.isAllowedFile(file)) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.unauthorizedFormat'), 'warning');
            return false;
        }

        if (file.size > this.IMPORT_MAX_SIZE) {
            this.openImportWarningModal(file);
            return false;
        }

        const targetPath = this.joinUiPath(targetDir, file.name);

        const finalPath = isReplace || !(await this.pathExists(targetPath))
            ? targetPath
            : await this.getAvailableCopyPath(targetDir, file.name);

        try {
            let tab;

            if (this.isImageFile(file)) {
                if (!this.isAllowedImageFile(file)) {
                    pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.permittedImageFormat'), 'warning');
                    return false;
                }

                const buffer = await file.arrayBuffer();
                const bytes = new Uint8Array(buffer);

                await this.repl.uploadBinaryToFS(finalPath, bytes);

                const stat = await this.statFile(finalPath);

                tab = {
                    path: finalPath,
                    rawContent: bytes,
                    content: '',
                    savedContent: '',
                    fileBlob: file,
                    objectUrl: URL.createObjectURL(file),
                    fsSize: stat.size,
                    fsMtime: stat.mtime,
                    isBinary: true,
                    isImage: true,
                    dirty: false
                };
            } else {
                const content = await file.text();

                await this.createFile(finalPath, content, {
                    refresh: false,
                    open: false
                });

                const stat = await this.statFile(finalPath);

                tab = {
                    path: finalPath,
                    rawContent: content,
                    content,
                    savedContent: content,
                    fsSize: stat.size,
                    fsMtime: stat.mtime,
                    dirty: false
                };
            }

            this.cachedFiles.set(finalPath, tab);

            if (this.openedTabs.has(finalPath)) {
                const oldTab = this.openedTabs.get(finalPath);
                if (oldTab?.objectUrl && oldTab.objectUrl !== tab.objectUrl) {
                    URL.revokeObjectURL(oldTab.objectUrl);
                }

                this.openedTabs.set(finalPath, tab);

                if (this.activePath === finalPath) {
                    this.renderTabs();
                    this.renderEditor();
                }
            }

            const importedFile = {
                path: finalPath,
                name: file.name
            };

            pseudoModal.setMessage(this.MODAL_NAME, '1 ' + jsonPath('code.repl.fs.importedFiles'), 'success');
            return importedFile;

        } catch (error) {
            console.error(error);
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.importError'), 'error');
            return false;
        }
    }

    /**
     * Upload a file from the computer via a file input.
     * @public
     * @memberof MicropythonFS
     */
    async uploadFileFromComputer() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = this.getInputAccept();
        input.multiple = true;

        input.addEventListener('change', async (event) => {
            const files = [...event.target.files];
            if (!files.length) return;

            const selectedRow = document.querySelector(
                `${this.selectors.tree} .${this.TREE_ITEM_SELECTED}`
            );

            const selectedDirRow = this.getSelectedDirRow?.();
            const targetDir = selectedDirRow?.dataset.path || '';

            if (selectedRow?.classList.contains(this.TREE_ITEM_FILE)) {
                this.clearTreeSelection();
            }

            const imported = await this.handleFileImport(files, targetDir);  // Appel à la nouvelle méthode
        });

        input.click();
    }

    /**
     * Handle the import of files from the computer.
     * @private
     * @param {File[]} files - The files to import.
     * @param {string} targetDir - The target directory for the import.
     * @param {boolean} [isReplace=false] - Whether to replace existing files.
     * @returns {Promise<boolean>} True if files were imported successfully.
     * @memberof MicropythonFS
     */
    async handleFileImport(files, targetDir, isReplace = false) {
        const canReplace = await this.confirmReplaceExistingFiles(files, targetDir);

        if (canReplace === false) {
            return false;
        }

        let importedCount = 0;
        const importedFiles = [];

        for (const file of files) {
            const imported = await this.uploadLocalFileToFS(file, targetDir, canReplace);
            if (imported) {
                importedCount++;
                importedFiles.push(imported);
            }
        }

        if (importedCount > 0) {
            await this.refresh();
            pseudoModal.setMessage(this.MODAL_NAME, `${importedCount} fichier(s) importé(s)`, 'success');
            this.selectImportedFiles(importedFiles);
        }

        return importedCount > 0;
    }

    /**
     * Select imported files in the file tree.
     * @private
     * @param {Object[]} importedFiles - The imported file objects.
     * @param {string} targetDir - The target directory where the files were imported.
     * @memberof MicropythonFS
     */
    selectImportedFiles(importedFiles) {
        importedFiles.forEach(file => {
            const fileRow = document.querySelector(`${this.selectors.tree} [data-path="${file.path}"]`);
            if (fileRow) {
                fileRow.classList.add(this.TREE_ITEM_SELECTED);
                fileRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    /**
     * Select files after a paste operation.
     * @private
     * @param {string[]} files - The file paths to select.
     * @memberof MicropythonFS
     */
    selectFilesAfterPaste(files) {
        files.forEach(filePath => {
            const fileRow = document.querySelector(`${this.selectors.tree} [data-path="${filePath}"]`);

            if (fileRow) {
                fileRow.classList.add(this.TREE_ITEM_SELECTED);
                fileRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    /**
     * Confirm if existing files should be replaced during an import operation.
     * @private
     * @param {File[]} files - The files to check for conflicts.
     * @param {string} targetDir - The target directory for the import.
     * @returns {Promise<boolean>} True if files can be replaced, false if not.
     * @memberof MicropythonFS
     */
    async confirmReplaceExistingFiles(files, targetDir = '') {
        const hasConflict = await this.hasImportConflicts(files, targetDir);

        if (!hasConflict) {
            return true;
        }

        return await this.confirmReplaceFile();
    }

    /**
     * Check if there are conflicts with existing files during an import.
     * @private
     * @param {File[]} files - The files to check for conflicts.
     * @param {string} targetDir - The target directory for the import.
     * @returns {Promise<boolean>} True if there are conflicts, false if not.
     * @memberof MicropythonFS
     */
    async hasImportConflicts(files, targetDir = '') {
        for (const file of files) {
            if (await this.pathExists(this.joinUiPath(targetDir, file.name))) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the acceptable file extensions for the import input.
     * @private
     * @returns {string} The accepted file types for the input.
     * @memberof MicropythonFS
     */
    getInputAccept() {
        const extensions = this.ALLOWED_IMPORT_EXTENSIONS.map(ext => `.${ext}`);
        return [
            ...extensions,
            ...this.ALLOWED_IMAGE_MIME_TYPES
        ].join(',');
    }

    /**
     * Create a new file via a prompt in the file system.
     * @public
     * @memberof MicropythonFS
     */
    createFilePrompt() {
        this.createInlinePrompt({
            defaultName: 'new_file.py',
            iconClass: 'fas fa-file',
            onValidate: async (path) => {
                await this.createFile(path);
            }
        });
    }

    /**
     * Create a new folder via a prompt in the file system.
     * @public
     * @memberof MicropythonFS
     */
    createFolderPrompt() {
        this.createInlinePrompt({
            defaultName: 'lib',
            iconClass: 'fas fa-folder mpy-fs-tree-icon--dir',
            onValidate: async (path) => {
                await this.createFolder(path);
            }
        });
    }

    /**
     * Create an inline prompt for file/folder creation.
     * @private
     * @param {Object} options - Options for the inline prompt.
     * @param {string} options.defaultName - The default name for the file/folder.
     * @param {string} options.iconClass - The icon class for the file/folder.
     * @param {Function} options.onValidate - The validation function when the prompt is confirmed.
     * @memberof MicropythonFS
     */
    createInlinePrompt({ defaultName, iconClass, onValidate }) {
        const container = document.querySelector(this.selectors.tree);
        if (!container) return;

        container.querySelector('.mpy-fs-inline-input-row')?.remove();

        const selectedDirRow = this.getSelectedDirRow();
        const parentDir = selectedDirRow?.dataset.path || '';

        if (selectedDirRow) {
            selectedDirRow.dataset.open = 'true';

            const children = selectedDirRow.parentElement.querySelector('.mpy-fs-tree-children');
            const arrow = selectedDirRow.querySelector('.mpy-fs-tree-arrow');
            const icon = selectedDirRow.querySelector('.mpy-fs-tree-icon--dir');

            children?.classList.remove('mpy-fs-tree-children--collapsed');
            if (arrow) arrow.textContent = '▾';
            if (icon) icon.className = 'fas fa-folder-open mpy-fs-tree-icon mpy-fs-tree-icon--dir';
        }

        const row = document.createElement('div');
        row.className = 'mpy-fs-tree-row mpy-fs-inline-input-row';
        row.style.paddingLeft = selectedDirRow
            ? `${parseInt(selectedDirRow.style.paddingLeft || '0', 10) + 36}px`
            : '20px';

        row.innerHTML = `
        <i class="${iconClass} mpy-fs-tree-icon"></i>
        <input class="mpy-fs-inline-input" type="text" value="${defaultName}">`;

        if (selectedDirRow) {
            const children = selectedDirRow.parentElement.querySelector('.mpy-fs-tree-children');
            children.prepend(row);
        } else {
            container.prepend(row);
        }

        const input = row.querySelector('input');
        input.focus();
        input.select();

        const validate = async () => {
            const name = input.value.trim();

            if (!name) {
                row.remove();
                return;
            }

            const path = this.joinUiPath(parentDir, name);

            if (await this.pathExists(path)) {
                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.nameAlreadyExists'), 'warning');
                input.focus();
                this.selectInputFilename(input);
                return;
            }

            await onValidate(path);
            row.remove();
        };

        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                input.blur();
            }

            if (event.key === 'Escape') {
                row.remove();
            }
        });

        input.addEventListener('blur', async () => {
            await validate();
        });
    }

    /**
     * Update the state of the save button.
     * @public
     * @memberof MicropythonFS
     */
    updateSaveButtonState() {
        const saveBtn = document.querySelector(this.selectors.saveBtn);
        if (!saveBtn) return;

        const tab = this.activePath ? this.openedTabs.get(this.activePath) : null;
        const canSave = !!tab && tab.dirty && !this.isProtectedFile(this.activePath);

        saveBtn.disabled = !canSave;
        saveBtn.classList.toggle('disabled', !canSave);
        saveBtn.classList.toggle('disabled-btn', !canSave);
    }

    /**
     * Update the state of the play button.
     * @public
     * @memberof MicropythonFS
     */
    updatePlayButtonState() {
        const playBtn = document.querySelector(this.selectors.playBtn);
        if (!playBtn) return;
        if (!this.pythonRunning) {
            const tab = this.activePath ? this.openedTabs.get(this.activePath) : null;
            const canPlay = !!tab && this.activePath.endsWith('.py');

            playBtn.disabled = !canPlay;
            playBtn.classList.toggle('disabled', !canPlay);
            playBtn.classList.toggle('disabled-btn', !canPlay);
            playBtn.style.display = canPlay ? '' : 'none';
        }

        playBtn.querySelector('i').className = this.pythonRunning ? 'fas fa-stop' : 'fas fa-play';
        playBtn.querySelector('.label-button').textContent = this.pythonRunning
            ? jsonPath('modals.standard.mpy-fs.buttons.stop.text')
            : jsonPath('modals.standard.mpy-fs.buttons.play.text');
    }

    /**
     * Cut the selected file(s) and prepare them for pasting.
     * @public
     * @memberof MicropythonFS
     */
    cutSelectedFiles() {
        const selectedRows = this.getSelectedRows()
            .filter(row => row.classList.contains(this.TREE_ITEM_FILE));

        if (!selectedRows.length) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.noFileToMove'), 'warning');
            return;
        }

        const paths = selectedRows.map(row => row.dataset.path).filter(Boolean);

        if (paths.some(path => this.isProtectedFile(path))) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingProtectedFiles'), 'warning');
            return;
        }

        this.clipboard = {
            type: 'cut',
            paths
        };

        pseudoModal.setMessage(this.MODAL_NAME, paths.length + ' ' + jsonPath('code.repl.fs.readyFiles'), 'success');
    }

    /**
     * Copy the selected file(s) to the clipboard.
     * @public
     * @memberof MicropythonFS
     */
    copySelectedFiles() {
        const selectedRows = this.getSelectedRows()
            .filter(row => row.classList.contains(this.TREE_ITEM_FILE));

        if (!selectedRows.length) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.noCopiedFile'), 'warning');
            return;
        }

        this.clipboard = {
            type: 'copy',  // Type "copy" ou "cut"
            paths: selectedRows.map(row => row.dataset.path).filter(Boolean)
        };

        pseudoModal.setMessage(this.MODAL_NAME, this.clipboard.paths.length + ' ' + jsonPath('code.repl.fs.copiedFiles'), 'success');
    }

    /**
     * Paste the copied files from the clipboard.
     * @public
     * @memberof MicropythonFS
     */
    async pasteCopiedFiles() {
        const selectedDirRow = this.getSelectedDirRow?.();
        const targetDir = selectedDirRow?.dataset.path
            || this.currentTargetDir
            || this.getParentDir(this.clipboard?.paths[0])
            || '';

        const filesToSelect = [];

        for (const sourcePath of this.clipboard?.paths) {
            const filename = sourcePath.split('/').pop();
            const targetPath = this.joinUiPath(targetDir, filename);

            if (this.clipboard?.type === 'cut' && this.getParentDir(sourcePath) === targetDir) {
                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingSameFolder'), 'warning');
                return;
            }

            let newFilePath;
            if (this.clipboard?.type === 'cut') {
                newFilePath = await this.moveFileToDirectory(sourcePath, targetDir);
            } else {
                newFilePath = await this.copyFileToDirectory(sourcePath, targetDir, { refresh: false });
            }
            if (newFilePath) {
                filesToSelect.push(newFilePath);
            }
        }
        await this.refresh();
        this.selectFilesAfterPaste(filesToSelect);

        pseudoModal.setMessage(this.MODAL_NAME, `${this.clipboard?.paths.length} fichier(s) copié(s)`, 'success');
    }

    /**
     * Rename a file or folder.
     * @public
     * @memberof MicropythonFS
     */
    async renameFileOrFolder() {
        const selectedRows = this.getSelectedRows();

        if (selectedRows.length !== 1) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.selectOneFile'), 'warning');
            return;
        }

        const row = selectedRows[0];
        const oldPath = row.dataset.path;

        this.clearTreeSelection();

        if (!oldPath) return;

        if (this.isProtectedFile(oldPath)) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamingError'), 'warning');
            return;
        }

        const label = row.querySelector('.mpy-fs-tree-label');
        if (!label) return;

        const oldName = oldPath.split('/').pop();
        const parentDir = oldPath.includes('/') ? oldPath.split('/').slice(0, -1).join('/') : '';
        const input = this.createInlineRenameInput(oldName);

        label.replaceWith(input);
        input.focus();
        this.selectInputFilename(input);

        let isFinished = false;

        const cancel = () => {
            if (isFinished) return;
            isFinished = true;

            if (input.isConnected) {
                input.replaceWith(label);
            }
        };

        const validate = async () => {
            if (isFinished) return;

            const newName = input.value.trim();

            if (!newName || newName === oldName) {
                cancel();
                return;
            }

            isFinished = true;

            const newPath = this.joinUiPath(parentDir, newName);

            if (await this.handleExistingRenameTarget(newPath, input)) {
                isFinished = false;
                return;
            }

            try {
                await this.renamePath(oldPath, newPath);
                this.updateOpenedTabPath(oldPath, newPath);

                await this.refresh();
                this.renderTabs();
                this.renderEditor();

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamedFile'), 'success');
            } catch (error) {
                console.error(error);

                if (input.isConnected) {
                    input.replaceWith(label);
                }

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamingError'), 'error');
            }
        };

        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                input.blur();
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                cancel();
            }
        });

        input.addEventListener('blur', async () => {
            await validate();
        });
    }

    /**
     * Handle renaming conflicts when the target path already exists.
     * @private
     * @param {string} newPath - The new path to check.
     * @param {HTMLInputElement} input - The input element for the new name.
     * @returns {Promise<boolean>} True if the rename is not possible, false if it is.
     * @memberof MicropythonFS
     */
    async handleExistingRenameTarget(newPath, input) {
        if (!(await this.pathExists(newPath))) return false;
        pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamingNotPossible'), 'warning');
        input.focus();
        this.selectInputFilename(input);
        return true;
    }

    /**
     * Copy a file with an inline rename option.
     * @public
     * @param {string} sourcePath - The source file path.
     * @param {string} [targetDir=''] - The target directory for the file.
     * @returns {Promise<string>} The new path of the copied file.
     * @memberof MicropythonFS
     */
    async copyFileWithInlineRename(sourcePath, targetDir = '') {
        const filename = sourcePath.split('/').pop();
        const targetPath = await this.getAvailableCopyPath(targetDir, filename);
        await this.copyFileToPath(sourcePath, targetPath);
        await this.refresh();
        await this.renamePathInline(targetPath, { openAfterRename: true });
        return targetPath;
    }

    /**
     * Copy a file to a specified directory.
     * @public
     * @param {string} sourcePath - The source file path.
     * @param {string} targetDir - The target directory for the file.
     * @param {Object} options - Options for the copy operation.
     * @param {boolean} [options.refresh=true] - Whether to refresh the file tree after copying.
     * @param {boolean} [options.inlineRename=false] - Whether to rename the file inline after copying.
     * @returns {Promise<string>} The new path of the copied file.
     * @memberof MicropythonFS
     */
    async copyFileToDirectory(sourcePath, targetDir = '', { refresh = true, inlineRename = false } = {}) {
        const filename = sourcePath.split('/').pop();
        const targetPath = await this.getAvailableCopyPath(targetDir, filename);
        await this.copyFileToPath(sourcePath, targetPath);

        if (refresh) {
            await this.refresh();
        }
        if (inlineRename) {
            await this.renamePathInline(targetPath, { openAfterRename: true });
        }
        return targetPath;
    }

    /**
     * Copy a file from one path to another.
     * @private
     * @param {string} sourcePath - The source file path.
     * @param {string} targetPath - The target path for the file.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async copyFileToPath(sourcePath, targetPath) {
        const node = this.getFileNode(sourcePath);
        if (!await this.hasEnoughSpace(node?.size ?? 0)) return;
        const filename = sourcePath.split('/').pop();
        const sourceTab = this.openedTabs.get(sourcePath) || this.cachedFiles?.get(sourcePath);
        let tab;

        try {
            if (this.isImageFile({ name: filename })) {
                const bytes = await this.getBinaryBytes(sourcePath, sourceTab);

                await this.repl.uploadBinaryToFS(targetPath, bytes);

                const targetStat = await this.statFile(targetPath);
                if (targetStat.size !== bytes.length) {
                    throw new Error(`COPY_SIZE_MISMATCH ${targetStat.size}/${bytes.length}`);
                }

                const blob = new Blob([bytes], { type: sourceTab?.fileBlob?.type || 'application/octet-stream' });

                tab = {
                    path: targetPath,
                    rawContent: bytes,
                    content: '',
                    savedContent: '',
                    fileBlob: blob,
                    objectUrl: URL.createObjectURL(blob),
                    fsSize: bytes.length,
                    fsMtime: targetStat.mtime,
                    isBinary: true,
                    isImage: true,
                    dirty: false
                };
            } else {
                let rawContent = sourceTab && !sourceTab.dirty
                    ? sourceTab.rawContent
                    : await this.repl.downloadLibraryFromFS(sourcePath);

                if (rawContent instanceof Uint8Array) {
                    rawContent = new TextDecoder('utf-8').decode(rawContent);
                }

                if (rawContent === null) {
                    throw new Error(`Incomplete file reading ${sourcePath}`);
                }

                await this.repl.uploadScriptToFS(targetPath, rawContent);

                const content = this.repl._normalizePythonSource(rawContent);

                tab = {
                    path: targetPath,
                    rawContent,
                    content,
                    savedContent: content,
                    fsSize: new Blob([rawContent]).size,
                    fsMtime: null,
                    dirty: false
                };
            }

            this.cachedFiles?.set(targetPath, tab);
            return tab;

        } catch (error) {
            console.error(error);
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.pasteError'), 'error');
            throw error;
        }
    }

    /**
     * Get the binary content of a file as bytes.
     * @private
     * @param {string} path - The file path.
     * @param {Object} tab - The file tab object.
     * @returns {Promise<Uint8Array>} The binary content of the file.
     * @memberof MicropythonFS
     */
    async getBinaryBytes(path, tab = null) {
        if (tab?.fileBlob) {
            return new Uint8Array(await tab.fileBlob.arrayBuffer());
        }
        if (tab?.rawContent instanceof Uint8Array) {
            return tab.rawContent;
        }
        const rawContent = await this.repl.downloadLibraryFromFS(path);
        if (rawContent === null) {
            throw new Error(`Incomplete file reading ${path}`);
        }
        if (rawContent instanceof Uint8Array) {
            return rawContent;
        }
        const bytes = new Uint8Array(rawContent.length);
        for (let i = 0; i < rawContent.length; i++) {
            bytes[i] = rawContent.charCodeAt(i) & 0xff;
        }
        return bytes;
    }

    /**
     * Rename a file or folder inline in the UI.
     * @private
     * @param {string} path - The path of the file or folder to rename.
     * @param {Object} options - Options for the inline rename.
     * @param {boolean} [options.openAfterRename=false] - Whether to open the file after renaming.
     * @returns {Promise<void>}
     * @memberof MicropythonFS
     */
    async renamePathInline(path, { openAfterRename = false } = {}) {
        const row = document.querySelector(`${this.selectors.tree} [data-path="${CSS.escape(path)}"]`);

        if (!row) {
            if (openAfterRename) await this.openFile(path);
            return;
        }

        this.clearTreeSelection();

        const label = row.querySelector('.mpy-fs-tree-label');
        if (!label) return;

        const oldName = path.split('/').pop();
        const parentDir = path.includes('/') ? path.split('/').slice(0, -1).join('/') : '';
        const input = this.createInlineRenameInput(oldName);

        label.replaceWith(input);
        input.focus();
        this.selectInputFilename(input);

        let isFinished = false;

        const cancel = async () => {
            if (isFinished) return;
            isFinished = true;

            if (input.isConnected) {
                input.replaceWith(label);
            }

            if (openAfterRename) {
                await this.openFile(path);
            }
        };

        const validate = async () => {
            if (isFinished) return;

            const newName = input.value.trim();

            if (!newName || newName === oldName) {
                await cancel();
                return;
            }

            isFinished = true;

            const newPath = this.joinUiPath(parentDir, newName);

            if (await this.handleExistingRenameTarget(newPath, input)) {
                isFinished = false;
                return;
            }

            try {
                await this.renamePath(path, newPath);
                this.updateOpenedTabPath(path, newPath);

                await this.refresh();
                this.renderTabs();
                this.renderEditor();

                if (openAfterRename) {
                    await this.openFile(newPath);
                    this.clearTreeSelection();
                }

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamedFile'), 'success');
            } catch (error) {
                console.error(error);

                if (input.isConnected) {
                    input.replaceWith(label);
                }

                pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.renamingError'), 'error');
            }
        };

        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                input.blur();
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                await cancel();
            }
        });

        input.addEventListener('blur', async () => {
            await validate();
        });
    }

    clearTreeSelection() {
        document.querySelectorAll(`${this.selectors.tree} .${this.TREE_ITEM_SELECTED}`)
            .forEach(row => row.classList.remove(this.TREE_ITEM_SELECTED));

        this._lastSelectedRowPath = null;
        this.currentTargetDir = null;
    }

    selectInputFilename(input) {
        const dotIndex = input.value.lastIndexOf('.');

        if (dotIndex > 0) {
            input.setSelectionRange(0, dotIndex);
        } else {
            input.select();
        }
    }

    createInlineRenameInput(value) {
        const input = document.createElement('input');
        input.className = 'mpy-fs-inline-input';
        input.type = 'text';
        input.value = value;

        ['click', 'mousedown', 'dblclick'].forEach(eventName => {
            input.addEventListener(eventName, (event) => {
                event.stopPropagation();
            });
        });

        return input;
    }

    /**
     * Move a file or folder from one path to another.
     * @public
     * @param {string} sourcePath - The source path.
     * @param {string} targetDir - The target directory.
     * @returns {Promise<string>} The new path of the moved file.
     * @memberof MicropythonFS
     */
    async moveFileToDirectory(sourcePath, targetDir) {
        if (this.isProtectedFile(sourcePath)) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingProtectedNotPossible'), 'warning');
            return;
        }
        const filename = sourcePath.split('/').pop();
        const targetPath = `${targetDir}/${filename}`;
        if (sourcePath === targetPath) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingSameFolder'), 'warning');
            return;
        }
        if (await this.movePath(sourcePath, targetDir, false)) {
            return targetPath;
        }
    }

    /**
     * Get the available path for copying a file (with unique naming).
     * @private
     * @param {string} targetDir - The target directory.
     * @param {string} filename - The filename to check.
     * @returns {Promise<string>} The available path for the copied file.
     * @memberof MicropythonFS
     */
    async getAvailableCopyPath(targetDir, filename) {
        const dotIndex = filename.lastIndexOf('.');
        const basename = dotIndex > 0 ? filename.slice(0, dotIndex) : filename;
        const extension = dotIndex > 0 ? filename.slice(dotIndex) : '';

        let candidatePath = this.joinUiPath(targetDir, filename);

        if (!await this.pathExists(candidatePath)) return candidatePath;

        let index = 1;
        let candidateName = `${basename}_copie${extension}`;
        candidatePath = this.joinUiPath(targetDir, candidateName);

        while (await this.pathExists(candidatePath)) {
            index++;
            candidateName = `${basename}_copie_${index}${extension}`;
            candidatePath = this.joinUiPath(targetDir, candidateName);
        }

        return candidatePath;
    }

    async fileExistsInTarget(sourcePath, targetDir) {
        const filename = sourcePath.split('/').pop();
        const targetPath = this.joinUiPath(targetDir, filename);

        const fileExists = await this.pathExists(targetPath);

        if (fileExists) {
            const confirmReplace = await this.confirmReplaceFile(filename);
            if (!confirmReplace) {
                return false;
            }
        }

        if (this.clipboard?.type === 'cut' && this.getParentDir(sourcePath) === targetDir) {
            pseudoModal.setMessage(this.MODAL_NAME, jsonPath('code.repl.fs.movingSameFolder'), 'warning');
            return false;
        }

        return true;
    }

    async confirmReplaceFile(filename = null) {
        return new Promise(resolve => {
            pseudoModal.openModal('modal-mpy-fs-warningreplace', true, false);
            if (filename) {
                const message = jsonPath('modals.warning.mpy-fs.replace.questionFilename')
                    .replace('{FILENAME}', filename);
                const replaceQuestion = document.querySelector('#mpy-fs-warningreplace-question-text');
                if (replaceQuestion) replaceQuestion.innerHTML = message;
            }

            const $yesBtn = $('#modal-mpy-fs-warningreplace-yes');
            const $noBtn = $('#modal-mpy-fs-warningreplace-no');

            $yesBtn.focus();

            $yesBtn.off('click').one('click', async () => {
                pseudoModal.closeModal('modal-mpy-fs-warningreplace');
                resolve(true);
            });

            $noBtn.off('click').one('click', () => {
                pseudoModal.closeModal('modal-mpy-fs-warningreplace');
                resolve(false);  // L'utilisateur a refusé de remplacer
            });
        });
    }

    /**
     * Check if a path exists in the filesystem.
     * @private
     * @param {string} path - The path to check.
     * @returns {Promise<boolean>} True if the path exists, false otherwise.
     * @memberof MicropythonFS
     */
    async pathExists(path) {
        try {
            await this.statFile(path);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the selected directory row in the file tree.
     * @private
     * @returns {HTMLElement|null} The selected directory row, or null if none.
     * @memberof MicropythonFS
     */
    getSelectedDirRow() {
        const selectedRow = document.querySelector(
            `${this.selectors.tree} .${this.TREE_ITEM_SELECTED}`
        );
        if (!selectedRow?.classList.contains(this.TREE_ITEM_FOLDER)) {
            return null;
        }
        return selectedRow;
    }

    /**
     * Join a base path with a file/folder name.
     * @private
     * @param {string} base - The base path.
     * @param {string} name - The file or folder name.
     * @returns {string} The full path.
     * @memberof MicropythonFS
     */
    joinUiPath(base, name) {
        if (!base || base === '/') return name;
        return `${base}/${name}`;
    }

    /**
     * Join a base path with a file/folder name for the board path.
     * @private
     * @param {string} base - The base path.
     * @param {string} entry - The file or folder name.
     * @returns {string} The full board path.
     * @memberof MicropythonFS
     */
    joinBoardPath(base, entry) {
        if (base === '/') return `/${entry}`;
        if (base === '') return entry;
        return `${base}/${entry}`;
    }

    /**
     * Get the selected rows in the file tree.
     * @private
     * @returns {Array<HTMLElement>} An array of selected rows.
     * @memberof MicropythonFS
     */
    getSelectedRows() {
        return [...document.querySelectorAll(
            `${this.selectors.tree} .${this.TREE_ITEM_SELECTED}`
        )];
    }

    /**
     * Ctrl+A handler: selects all visible rows in the current context.
     *
     * Context rules:
     *  - A single dir selected: select all its direct visible children.
     *  - 1+ files/dirs selected: select all siblings in the same parent dir.
     *  - Nothing selected / already at max: select every visible row.
     *
     * @private
     * @memberof MicropythonFS
     */
    selectAllInContext() {
        const container = document.querySelector(this.selectors.tree);
        if (!container) return;

        const allRows = [...container.querySelectorAll('.mpy-fs-tree-row')];
        const selectedRows = this.getSelectedRows();

        const clearAndSelect = (rows) => {
            allRows.forEach(r => r.classList.remove(this.TREE_ITEM_SELECTED));
            rows.forEach(r => r.classList.add(this.TREE_ITEM_SELECTED));
            if (rows.length) {
                this._lastSelectedRowPath = rows[rows.length - 1].dataset.path || null;
            }
        };

        // Case 1: single directory selected -> select all direct visible children
        if (selectedRows.length === 1 && selectedRows[0].classList.contains(this.TREE_ITEM_FOLDER)) {
            const dirRow = selectedRows[0];
            const childrenContainer = dirRow.parentElement?.querySelector('.mpy-fs-tree-children');

            if (childrenContainer && !childrenContainer.classList.contains('mpy-fs-tree-children--collapsed')) {
                const directChildren = [
                    ...childrenContainer.querySelectorAll(':scope > div > .mpy-fs-tree-row'),
                    ...childrenContainer.querySelectorAll(':scope > .mpy-fs-tree-row')
                ].filter((r, i, arr) => arr.indexOf(r) === i); // dedupe

                if (directChildren.length) {
                    clearAndSelect(directChildren);
                    return;
                }
            }
            // Collapsed or empty: fall through to root select
        }

        // Case 2: 1+ rows selected -> select all siblings in the same parent dir
        if (selectedRows.length >= 1) {
            const firstPath = selectedRows[0].dataset.path || '';
            const parentDir = this.getParentDir(firstPath);

            const siblings = allRows.filter(row => {
                const p = row.dataset.path || '';
                if (parentDir === '') {
                    return !p.includes('/');
                }
                return p.startsWith(parentDir + '/') && !p.slice(parentDir.length + 1).includes('/');
            });

            if (siblings.length > selectedRows.length) {
                clearAndSelect(siblings);
                return;
            }
        }

        // Case 3: nothing selected or already fully selected -> select all visible rows
        const visibleRows = allRows.filter(row => row.offsetParent !== null);
        clearAndSelect(visibleRows);
    }

    /**
     * Select a row in the file tree.
     * @private
     * @param {HTMLElement} row - The row to select.
     * @param {Event} event - The event triggering the selection.
     * @memberof MicropythonFS
     */
    selectTreeRow(row, event = {}) {
        const container = document.querySelector(this.selectors.tree);
        if (!container) return;

        const allRows = [...container.querySelectorAll('.mpy-fs-tree-row')];

        const updateCurrentTargetDir = () => {
            this.currentTargetDir = row.classList.contains(this.TREE_ITEM_FOLDER)
                ? row.dataset.path || ''
                : null;
        };

        if (event.shiftKey && this._lastSelectedRowPath) {
            const lastRow = allRows.find(r => r.dataset.path === this._lastSelectedRowPath);

            if (lastRow) {
                const start = allRows.indexOf(lastRow);
                const end = allRows.indexOf(row);
                const [from, to] = start < end ? [start, end] : [end, start];

                container.querySelectorAll('.' + this.TREE_ITEM_SELECTED)
                    .forEach(r => r.classList.remove(this.TREE_ITEM_SELECTED));

                allRows.slice(from, to + 1)
                    .forEach(r => r.classList.add(this.TREE_ITEM_SELECTED));

                updateCurrentTargetDir();
                return;
            }
        }

        if (event.ctrlKey || event.metaKey) {
            row.classList.toggle(this.TREE_ITEM_SELECTED);
            this._lastSelectedRowPath = row.dataset.path || null;

            this.currentTargetDir = row.classList.contains(this.TREE_ITEM_FOLDER)
                && row.classList.contains(this.TREE_ITEM_SELECTED)
                ? row.dataset.path || ''
                : null;

            return;
        }

        container.querySelectorAll('.' + this.TREE_ITEM_SELECTED)
            .forEach(r => r.classList.remove(this.TREE_ITEM_SELECTED));

        row.classList.add(this.TREE_ITEM_SELECTED);
        this._lastSelectedRowPath = row.dataset.path || null;

        updateCurrentTargetDir();
    }

    /**
     * Get the parent directory of a file path.
     * @private
     * @param {string} path - The file path.
     * @returns {string} The parent directory.
     * @memberof MicropythonFS
     */
    getParentDir(path) {
        if (!path || !path.includes('/')) return '';
        return path.split('/').slice(0, -1).join('/');
    }

    /**
     * Show a context menu at a specific position.
     * @private
     * @param {number} x - The X coordinate of the context menu.
     * @param {number} y - The Y coordinate of the context menu.
     * @param {HTMLElement|null} row - The row associated
     */
    showContextMenu(x, y, row = null) {
        this.hideContextMenu();

        const isFile = row?.classList.contains(this.TREE_ITEM_FILE);
        const isDir = row?.classList.contains(this.TREE_ITEM_FOLDER);
        const path = row?.dataset.path || '';
        const targetDir = isDir ? path : '';

        const menu = document.createElement('div');
        menu.className = 'mpy-fs-context-menu ide-dropdown-always';

        ['mousedown', 'mouseup', 'click', 'pointerdown', 'pointerup'].forEach(eventName => {
            menu.addEventListener(eventName, (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        });

        const isProtected = path && this.isProtectedFile(path);

        const buttons = isFile ? [
            {
                icon: 'fa-solid fa-copy',
                label: jsonPath('code.repl.fs.buttons.copy'),
                action: () => this.copySelectedFiles()
            },
            {
                icon: 'fa-solid fa-clone',
                label: jsonPath('code.repl.fs.buttons.duplicate'),
                action: async () => {
                    const parentDir = this.getParentDir(path);
                    await this.copyFileWithInlineRename(path, parentDir);
                }
            },
            {
                icon: 'fa-solid fa-download',
                label: jsonPath('code.repl.fs.buttons.download'),
                action: async () => await this.downloadSelectedFile()
            },
            ...(!isProtected ? [
                {
                    icon: 'fa-solid fa-pen',
                    label: jsonPath('code.repl.fs.buttons.rename'),
                    action: async () => await this.renameFileOrFolder()
                },
                {
                    icon: 'fa-solid fa-trash',
                    label: jsonPath('code.repl.fs.buttons.delete'),
                    action: async () => await this.deleteSelectedFile()
                }
            ] : [])
        ] : [
            ...(this.clipboard?.paths?.length ? [{
                icon: 'fa-solid fa-paste',
                label: jsonPath('code.repl.fs.buttons.paste'),
                action: async () => await this.pasteCopiedFiles()
            }] : []),
            {
                icon: 'fa-solid fa-upload',
                label: jsonPath('code.repl.fs.buttons.import'),
                action: async () => await this.uploadFileFromComputer()
            },
            {
                icon: 'fas fa-file',
                label: jsonPath('code.repl.fs.buttons.newFile'),
                action: async () => await this.createFilePromptInDir(targetDir)
            },
            ...(INTERFACE_NAME !== 'microbit' ? [
                {
                    icon: 'fas fa-folder',
                    label: jsonPath('code.repl.fs.buttons.newFolder'),
                    action: async () => await this.createFolderPromptInDir(targetDir)
                }
            ] : [])
            ,
            {
                icon: 'fa-solid fa-download',
                label: jsonPath('code.repl.fs.buttons.download'),
                action: async () => await this.downloadDirAsZip(path)
            },
            ...(isDir && !isProtected ? [
                {
                    icon: 'fa-solid fa-pen',
                    label: jsonPath('code.repl.fs.buttons.rename'),
                    action: async () => await this.renameFileOrFolder()
                }
            ] : [])
        ];

        menu.innerHTML = `
        <div class="ide-btn-group mpy-fs-context-menu-group">
            ${buttons.map((button, index) => `
                <button class="ide-btn ide-btn-check ${index === 0 ? 'ide-btn-left-dropdown' : ''} ${index === buttons.length - 1 ? 'ide-btn-right-dropdown' : ''}"
                        data-action-index="${index}"
                        type="button">
                    <i class="${button.icon}"></i>
                    <span class="label-button">${button.label}</span>
                </button>
            `).join('')}
        </div>`;

        document.body.appendChild(menu);

        menu.querySelectorAll('[data-action-index]').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                const index = Number(button.dataset.actionIndex);
                this.hideContextMenu();

                await buttons[index].action();
            });
        });

        const rect = menu.getBoundingClientRect();
        menu.style.left = `${Math.min(x, window.innerWidth - rect.width - 8)}px`;
        menu.style.top = `${Math.min(y, window.innerHeight - rect.height - 8)}px`;

        this._contextMenu = menu;
    }

    hideContextMenu() {
        this._contextMenu?.remove();
        this._contextMenu = null;
    }

    createFilePromptInDir(parentDir = '') {
        this.selectDirPath(parentDir);
        return this.createFilePrompt();
    }

    createFolderPromptInDir(parentDir = '') {
        this.selectDirPath(parentDir);
        return this.createFolderPrompt();
    }

    selectDirPath(path = '') {
        this.clearTreeSelection();

        if (!path) return;

        const row = document.querySelector(
            `${this.selectors.tree} .${this.TREE_ITEM_FOLDER}[data-path="${CSS.escape(path)}"]`
        );

        if (row) {
            row.classList.add(this.TREE_ITEM_SELECTED);
            this._lastSelectedRowPath = path;
        }
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(url);
    }

    closeTabsMissingFromTree() {
        const existingPaths = new Set();

        const walk = (tree, basePath = '') => {
            if (!tree || typeof tree !== 'object') return;

            for (const [name, node] of Object.entries(tree)) {
                if (['_type', 'size', 'mtime', 'ino', 'dev', 'children'].includes(name)) {
                    continue;
                }

                const path = basePath ? `${basePath}/${name}` : name;

                if (node._type === 'file') {
                    existingPaths.add(path);
                }

                if (node._type === 'dir') {
                    walk(node.children, path);
                }
            }
        };

        walk(this.files);

        for (const path of [...this.openedTabs.keys()]) {
            if (!existingPaths.has(path)) {
                this.openedTabs.delete(path);
            }
        }

        if (this.activePath && !this.openedTabs.has(this.activePath)) {
            this.activePath = this.openedTabs.keys().next().value || null;
        }
    }

    async syncOpenedTabsWithTree() {
        const existingFiles = new Map();

        const walk = (tree, basePath = '') => {
            if (!tree || typeof tree !== 'object') return;

            for (const [name, node] of Object.entries(tree)) {
                if (['_type', 'size', 'mtime', 'ino', 'dev', 'children'].includes(name)) {
                    continue;
                }

                const path = basePath ? `${basePath}/${name}` : name;

                if (node._type === 'file') {
                    existingFiles.set(path, {
                        size: node.size,
                        mtime: node.mtime
                    });
                }

                if (node._type === 'dir') {
                    walk(node.children, path);
                }
            }
        };

        walk(this.files);

        for (const [path, tab] of [...this.openedTabs.entries()]) {
            const fsFile = existingFiles.get(path);

            if (!fsFile) {
                this.openedTabs.delete(path);
                continue;
            }

            const hasReliableMtime =
                fsFile.mtime !== undefined &&
                fsFile.mtime !== null &&
                fsFile.mtime !== 0 &&
                tab.fsMtime !== undefined &&
                tab.fsMtime !== null &&
                tab.fsMtime !== 0;

            const hasChanged = hasReliableMtime
                ? fsFile.size !== tab.fsSize || fsFile.mtime !== tab.fsMtime
                : fsFile.size !== tab.fsSize;

            if (!tab.dirty && hasChanged) {
                const rawContent = await this.repl.downloadLibraryFromFS(path);
                const content = this.repl._normalizePythonSource(rawContent);

                tab.rawContent = rawContent;
                tab.content = content;
                tab.savedContent = content;
                tab.fsSize = fsFile.size;
                tab.fsMtime = fsFile.mtime;
                tab.dirty = false;
            }
        }

        if (this.activePath && !this.openedTabs.has(this.activePath)) {
            this.activePath = this.openedTabs.keys().next().value || null;
        }
    }

    /**
     * Format a byte size into a human-readable format.
     * @private
     * @param {number} bytes - The size in bytes.
     * @returns {string} The formatted size (e.g., '1.23 kB').
     * @memberof MicropythonFS
     */
    _formatSize(bytes) {
        return `${(Math.round(bytes / 1024 * 100) / 100).toFixed(2)} kB`;
    }

    /**
     * Get the current value of the editor.
     * @private
     * @returns {string} The content in the editor.
     * @memberof MicropythonFS
     */
    getEditorValue() {
        return this._aceEditor?.getValue() || '';
    }

    /**
     * Parse a Python list from a response string.
     * @private
     * @param {string} response - The response string to parse.
     * @returns {Array} The parsed list.
     * @memberof MicropythonFS
     */
    parsePythonList(response) {
        const clean = response.replace(/>>>/g, '').trim();
        try {
            return JSON.parse(clean.replace(/'/g, '"').replace(/\(/g, '[').replace(/\)/g, ']'));
        } catch (e) {
            console.warn('Unable to parse MicroPython list:', response);
            return [];
        }
    }

    /**
     * Decode a hex string into a readable string.
     * @private
     * @param {string} hex - The hex string to decode.
     * @returns {string} The decoded string.
     * @memberof MicropythonFS
     */
    decodeHex(hex) {
        let result = '';
        for (let i = 0; i < hex.length; i += 2) {
            result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return result;
    }

    /**
     * Escape special HTML characters in a string.
     * @private
     * @param {string} value - The value to escape.
     * @returns {string} The escaped value.
     * @memberof MicropythonFS
     */
    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /**
     * Set the loading state for the file tree.
     * @private
     * @param {boolean} isLoading - Whether the file tree is loading.
     * @memberof MicropythonFS
     */
    setLoading(isLoading) {
        document.querySelector(this.selectors.tree)?.classList.toggle('mpy-fs-loading', isLoading);
    }

    getFileExtension(file) {
        return file.name.split('.').pop().toLowerCase();
    }

    isImageFile(file) {
        return this.ALLOWED_IMAGE_EXTENSIONS.includes(this.getFileExtension(file));
    }

    isAllowedFile(file) {
        return this.ALLOWED_IMPORT_EXTENSIONS.includes(this.getFileExtension(file));
    }
}