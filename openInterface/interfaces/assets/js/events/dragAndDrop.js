/**
 * Drag and drop of "*_code" blocks (text snippets) from the Blockly flyout into the Ace editor (TI-83).
 * A dropped block is converted to its code, inserted in Ace at the pointer, then disposed.
 */
const dragAndDrop = {
    _pointer: { x: 0, y: 0 },
    _dragging: false,
    _cursor: null,
    _onDown: null,
    _observer: null,
    _onPointer: null,
    _onEvent: null,
    _isSnippet: function (block) {
        return /_(code|ti)$/.test(block.type);
    },
    _overEditor: function () {
        const r = Main.getCodeEditor().container.container.getBoundingClientRect(),
            p = this._pointer;
        return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
    },
    _highlight: function (on) {
        $("div.ace_cursor").toggleClass("ace_cursor_highlight", on);
    },
    // Ace cursor before a click on the flyout moves it
    _pointerDown: function () {
        this._cursor = Main.getCodeEditor().container.getCursorPosition();
    },
    _pointerMove: function (e) {
        this._pointer = { x: e.clientX, y: e.clientY };
        if (this._dragging && this._overEditor()) {
            const editor = Main.getCodeEditor().container;
            editor.moveCursorToPosition(editor.renderer.screenToTextCoordinates(e.clientX, e.clientY));
        }
    },
    _event: function (e) {
        const isBlockEvent = e.type === Blockly.Events.BLOCK_DRAG || e.type === Blockly.Events.BLOCK_CREATE;
        if (!isBlockEvent) return;
        const ws = Main.getWorkSpace(),
            block = e.blockId ? ws.getBlockById(e.blockId) : null;
        if (e.type === Blockly.Events.BLOCK_DRAG) {
            if (e.isStart) {
                this._dragging = true;
                this._highlight(true);
            } else {
                this._dragging = false;
                this._highlight(false);
                if (!block || !this._isSnippet(block)) return;
                const editor = Main.getCodeEditor().container;
                if (this._overEditor()) {
                    const last = editor.session.getLength() - 1,
                        lastBottom = editor.renderer.textToScreenCoordinates(last, 0).pageY + editor.renderer.lineHeight,
                        below = this._pointer.y > lastBottom && editor.session.getLine(last).trim() !== '';
                    this._insert(block, editor.renderer.screenToTextCoordinates(this._pointer.x, this._pointer.y), below);
                } else {
                    block.dispose();
                }
            }
        } else if (block && this._isSnippet(block) && e.recordUndo && !ws.isDragging() && !this._dragging) {
            // click on a flyout block: insert at the cursor
            this._insert(block, this._cursor || Main.getCodeEditor().container.getCursorPosition());
        }
    },
    // newLine: dropped below the code, insert on a new line instead of gluing to the last one
    _insert: function (block, pos, newLine) {
        const editor = Main.getCodeEditor().container,
            session = editor.session;
        Blockly.Python.init(Main.getWorkSpace());
        // a loose block may have been disabled as an orphan: the generator would skip it
        Array.from(block.getDisabledReasons()).forEach((r) => block.setDisabledReason(false, r));
        let code = Blockly.Python.blockToCode(block);
        if (Array.isArray(code)) code = code[0];
        code = (code || '').replace(/\n+$/, '');
        const current = session.getValue(),
            header = Object.values(Blockly.Python.imports_).concat(Object.values(Blockly.Python.inits_))
                .map((h) => h.trim()).filter((h) => h && !current.includes(h));
        block.dispose();

        const indent = /^\s*/.exec(session.getLine(pos.row))[0];
        code = code.split('\n').join('\n' + indent);
        let at0 = pos;
        if (newLine) {
            at0 = { row: pos.row, column: session.getLine(pos.row).length };
            code = '\n' + indent + code;
            pos = { row: pos.row + 1, column: indent.length };
        }

        editor.startOperation();
        session.insert(at0, code);
        let row = pos.row;
        if (header.length) {
            let at = 0;
            session.getDocument().getAllLines().forEach((l, i) => { if (/^(from|import)\s/.test(l)) at = i + 1; });
            const blank = session.getLine(at).trim() !== '' && (at === 0 || header.some((h) => !/^(from|import)\s/.test(h)));
            // last line is an import without final newline: start a new line
            const eof = at >= session.getLength(), text = (eof ? '\n' : '') + header.join('\n') + '\n' + (blank ? '\n' : '');
            session.insert(eof ? { row: at - 1, column: session.getLine(at - 1).length } : { row: at, column: 0 }, text);
            if (at <= row) row += text.split('\n').length - 1;
        }
        editor.endOperation();

        // cursor in the first "hole" of the inserted snippet
        const snippet = newLine ? code.split('\n')[1].slice(indent.length) : code.split('\n')[0];
        let col = pos.column + snippet.length,
            m = / (?=[(:])/.exec(snippet);
        if (m) col = pos.column + m.index + 1;
        else if ((m = /\((?=[),])/.exec(snippet))) col = pos.column + m.index + 1;
        editor.moveCursorTo(row, col);
        editor.focus();
    },
    fixedFlyout: function (mutations) {
        mutations.forEach(function () {
            $(".blocklyFlyout").css("position", "fixed");
        });
    },
    enable: function () {
        this._onPointer = this._onPointer || this._pointerMove.bind(this);
        this._onDown = this._onDown || this._pointerDown.bind(this);
        this._onEvent = this._onEvent || this._event.bind(this);
        this.disable();
        Main.getWorkSpace().addChangeListener(this._onEvent);
        document.addEventListener('pointermove', this._onPointer, true);
        document.addEventListener('pointerdown', this._onDown, true);
        // let the dragged block leave the workspace towards Ace
        $('.injectionDiv').css('overflow', 'visible');
        const flyout = document.getElementsByClassName('blocklyToolboxFlyout')[0];
        if (flyout) {
            this._observer = this._observer || new MutationObserver(this.fixedFlyout);
            this._observer.observe(flyout, { attributes: true, attributeFilter: ['style'] });
        }
    },
    disable: function () {
        if (!this._onEvent) return;
        Main.getWorkSpace().removeChangeListener(this._onEvent);
        document.removeEventListener('pointermove', this._onPointer, true);
        document.removeEventListener('pointerdown', this._onDown, true);
        if (this._observer) this._observer.disconnect();
        $('.injectionDiv').css('overflow', '');
    },
    size: function () {
        if ($(window).width() < 500) return $(window).width() - $('.blocklyToolbox').width();
        return $(window).width() - $('.blocklyToolbox').width() - $('.ide-simulator').width();
    }
};
