'use strict';

/**
 * Workspace UnoQuploader: UnoQFS
 * Copyright 2026 Vittascience.
 * https://vittascience.com
 *
 * File manager of the Arduino UNO Q: reuses the MicropythonFS UI ('modal-micropython-fs')
 * and replaces the MicroPython REPL accesses by ADB shell/sync commands on the board Linux.
 */

/**
 * @class UnoQFS
 */
class UnoQFS extends MicropythonFS {

    constructor(uploader) {
        const progressBar = InterfaceConnection.progressBar;
        // Minimal "repl" interface used by MicropythonFS, backed by ADB
        super({
            BLOCK_BYTE: 1024,
            defaultFsPath: '',
            progressBar: {
                displayProgressBar: () => progressBar._displayProgressBar(),
                updateProgressBar: (percent) => progressBar._updateProgressBar(percent),
                hideProgressBar: () => progressBar._hideProgressBar()
            },
            uploadScriptToFS: (path, content) => this.push(path, content),
            uploadBinaryToFS: (path, bytes) => this.push(path, bytes),
            downloadLibraryFromFS: (path) => this.pull(path),
            _normalizePythonSource: (source) => (source instanceof Uint8Array ? new TextDecoder().decode(source) : String(source)).replace(/\r\n?/g, '\n')
        });
        this.uploader = uploader;
        this.ROOT = '/home/arduino/ArduinoApps';
        this.PROTECTED_FILES = [];
        // webadb.js can't demultiplex streams: board accesses must run one at a time
        this._queue = Promise.resolve();
    }

    /**
     * Run a board access after the previous one.
     * @private
     */
    _serial(task) {
        const run = this._queue.then(task);
        this._queue = run.catch(() => { });
        return run;
    }

    /**
     * Absolute board path of a file manager path (relative to ROOT).
     * @private
     */
    abs(path = '') {
        const parts = String(path).split('/').filter(Boolean);
        if (parts.includes('..')) {
            throw new Error('Invalid path: ' + path);
        }
        return [this.ROOT, ...parts].join('/');
    }

    /**
     * Run a shell command, throwing if it does not print the success marker.
     * @private
     */
    async sh(cmd) {
        const output = await this._serial(() => this.uploader.execute(`shell:${cmd} && echo __FS_OK__`, true));
        if (!String(output).includes('__FS_OK__')) {
            throw new Error(output);
        }
        return output.replace('__FS_OK__', '');
    }

    async sync(task) {
        return this._serial(async () => {
            const sync = await this.uploader.adb.sync();
            try {
                return await task(sync);
            } finally {
                await sync.quit();
            }
        });
    }

    async push(path, content) {
        await this.sync(sync => sync.push(new Blob([content]), this.abs(path), "0644"));
    }

    async pull(path) {
        const { size } = await this.statFile(path);
        if (size === 0) {
            return new Uint8Array(0);
        }
        const data = await this.sync(sync => sync.pull(this.abs(path)));
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }

    async statFile(path) {
        const stat = await this.sync(sync => sync.stat(this.abs(path)));
        // ADB answers a zeroed stat for missing files
        if (!stat.mode) {
            throw new Error('No such file: ' + path);
        }
        return { mode: stat.mode, size: stat.size, mtime: stat.time };
    }

    /**
     * Whole tree in one command (a stat per file is too slow over ADB). Hidden entries (.cache, ...) are skipped.
     */
    async listFilesRecursive(path = '') {
        const output = await this.sh(`find ${UnoQuploader.shellQuote(this.abs(path))} -mindepth 1 -name '.*' -prune -o -printf '%y\\t%s\\t%T@\\t%P\\n'`);
        const tree = {};
        for (const line of output.split('\n')) {
            const [type, size, mtime, relPath] = line.replace(/\r$/, '').split('\t');
            if (!relPath) continue;
            const parts = relPath.split('/');
            const name = parts.pop();
            let node = tree;
            for (const dir of parts) {
                node[dir] ??= { _type: 'dir', children: {} };
                node = node[dir].children;
            }
            if (type === 'd') {
                node[name] = { _type: 'dir', children: node[name]?.children || {} };
            } else {
                node[name] = { _type: 'file', size: Number(size), mtime: Math.floor(Number(mtime)) };
            }
        }
        this.updateRefreshProgress(99);
        return tree;
    }

    async createFolder(path) {
        await this.sh(`mkdir -p ${UnoQuploader.shellQuote(this.abs(path))}`);
        await this.refresh();
    }

    async deleteFile(path) {
        await this.sh(`rm -f ${UnoQuploader.shellQuote(this.abs(path))}`);
    }

    async deleteEmptyFolder(path) {
        try {
            await this.sh(`rmdir ${UnoQuploader.shellQuote(this.abs(path))}`);
        } catch (error) {
            throw new Error('FOLDER_NOT_EMPTY');
        }
    }

    async renamePath(oldPath, newPath) {
        await this.sh(`mv ${UnoQuploader.shellQuote(this.abs(oldPath))} ${UnoQuploader.shellQuote(this.abs(newPath))}`);
    }

    async default_updateStorageUsage() {
        try {
            const [used, total] = (await this.sh(`df -B1 --output=used,size ${UnoQuploader.shellQuote(this.ROOT)} | tail -n 1`)).trim().split(/\s+/).map(Number);
            if (!total) return;
            this._usedBytes = used;
            this._totalBytes = total;
            this.updateStorageUsage();
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     * Same tabs as the code editor (arduinoq-file-tabs.css): file name with its icon, full path in the tooltip.
     */
    renderTabs() {
        super.renderTabs();
        const list = document.querySelector(this.selectors.tabs);
        if (!list) return;
        list.className = 'file-tabs';
        list.querySelectorAll('[data-tab-path]').forEach(button => {
            const path = button.dataset.tabPath;
            const ext = path.split('.').pop().toLowerCase();
            const logo = { ino: 'arduino', py: 'python', html: 'html' }[ext];
            const icon = document.createElement(logo ? 'img' : 'i');
            if (logo) {
                icon.src = `/openInterface/arduinoq/assets/media/file_logo/${logo}.svg`;
                icon.className = 'file-icon-svg';
            } else {
                icon.className = this.ICON_MAP[ext] || 'fas fa-file';
            }
            [...button.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
            button.prepend(icon, `${this.openedTabs.get(path)?.dirty ? '● ' : ''}${path.split('/').pop()}`);
            button.className = 'file-tab' + (path === this.activePath ? ' active' : '');
            button.title = path;
            // Buttons directly in the bar, as in the code editor (no bootstrap nav items)
            button.parentElement.replaceWith(button);
        });
    }

    // Apps are started with the upload button, not file by file
    updatePlayButtonState() {
        const playBtn = document.querySelector(this.selectors.playBtn);
        if (playBtn) playBtn.style.display = 'none';
    }
}
