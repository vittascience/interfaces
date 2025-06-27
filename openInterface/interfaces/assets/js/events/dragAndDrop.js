String.prototype.visualLength = function () {
    const ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
};

const dragAndDrop = {
    imports_: [],
    constants_: [],
    inits_: [],
    codeFunctions_: [],
    powers_: [],
    cursorX: 0,
    cursorY: 0,
    indent: 0,
    started: false,
    saveCursorPosition: null,
    dragEvent: false,
    checkImports: function (code) {
        var imports = Blockly.Python.imports_,
            import_ = "";
        if (Object.keys(imports).length != 0) {
            //add new import to the list 
            for (var key in imports) {
                if (Main.getCodeEditor().container.getValue().indexOf(imports[key]) == -1) {
                    if (this.imports_.findIndex((elem) => elem == imports[key]) == -1)
                        this.imports_[this.imports_.length] = imports[key];
                    import_ = import_ + imports[key] + "\n";
                }
                code = code.replaceAll(imports[key], '');
            }
        }
        code = code.trim();
        return [import_, code];
    },
    checkConstants: function (code) {
        var constants = Blockly.Python.constants_;
        if (Object.keys(constants).length != 0) {
            //add constant to the list 
            for (var key in constants) {
                if (Main.getCodeEditor().container.getValue().indexOf(constants[key]) == -1) {
                    if (this.constants_.findIndex((elem) => elem == constants[key]) == -1) {
                        this.constants_[this.constants_.length] = constants[key];
                    }
                } else {
                    code = code.replaceAll(constants[key], '');
                }
            }
        }
        return code;
    },
    checkInits: function (code) {
        var inits = Blockly.Python.inits_;
        if (Object.keys(inits).length != 0) {
            //add init to the list 
            for (var key in inits) {
                if (Main.getCodeEditor().container.getValue().indexOf(inits[key]) == -1) {
                    if (this.inits_.findIndex((elem) => elem == inits[key]) == -1)
                        this.inits_[this.inits_.length] = inits[key];
                } else {
                    code = code.replaceAll(inits[key], '');
                }
            }
        }
        return code;
    },
    checkFunctions: function (code) {
        var functions = Blockly.Python.codeFunctions_,
            function_ = "";
        if (Object.keys(functions).length != 0) {
            //add new function to the list 
            for (var key in functions) {
                if (Main.getCodeEditor().container.getValue().indexOf(functions[key]) == -1) {
                    if (this.codeFunctions_.findIndex((elem) => elem == functions[key]) == -1)
                        this.codeFunctions_[this.codeFunctions_.length] = functions[key];
                    function_ = function_ + functions[key] + "\n";
                }
                code = code.replaceAll(functions[key], '');
            }
        }
        code = code.trim();
        return [function_, code];
    },
    checkPowers: function (code) {
        var powers = Blockly.Python.powers_,
            splitCode = code.split("\n");
        if (Object.keys(powers).length != 0) {
            //add constant to the list 
            for (var key in powers) {
                if (this.powers_.findIndex((elem) => elem == powers[key]) == -1) {
                    this.powers_[this.powers_.length] = powers[key];
                } else {
                    for (var i = 0; i < splitCode.length; i++) {
                        if (splitCode[i] == powers[key]) {
                            splitCode.splice(i, 1);
                        }
                    }
                }
            }
        }
        code = splitCode.join("\n");
        return code;
    },
    initDictionnaries: function (event) {
        if (event.type == Blockly.Events.FINISHED_LOADING) {
            //init imports
            var imports = Blockly.Python.imports_;
            if (Object.keys(imports).length != 0) {
                for (var key in imports) {
                    this.imports_.push(imports[key]);
                }
            }
            //init constants
            var constants = Blockly.Python.constants_;
            if (Object.keys(constants).length != 0) {
                for (var key in constants) {
                    this.constants_.push(constants[key]);
                }
            }
            //init inits
            var inits = Blockly.Python.inits_;
            if (Object.keys(inits).length != 0) {
                for (var key in inits) {
                    this.inits_.push(inits[key]);
                }
            }
            //init codeFunctions
            var codeFunctions = Blockly.Python.codeFunctions_;
            if (Object.keys(codeFunctions).length != 0) {
                for (var key in codeFunctions) {
                    this.codeFunctions_.push(codeFunctions[key]);
                }
            }
            //init codeFunctions
            var powers = Blockly.Python.powers_;
            if (Object.keys(powers).length != 0) {
                for (var key in powers) {
                    if (this.powers_.findIndex((elem) => elem == powers[key]) == -1) {
                        this.powers_[this.powers_.length] = powers[key];
                    }
                }
            }
        }
    },
    updateDictionnaries: function () {
        //update imports
        var imports = Blockly.Python.imports_;
        if (Object.keys(imports).length != 0) {
            for (var key in imports) {
                if (this.imports_.findIndex((elem) => elem == imports[key]) == -1) {
                    this.imports_[this.imports_.length] = imports[key];
                }
            }
        }
        //update constants
        var constants = Blockly.Python.constants_;
        if (Object.keys(constants).length != 0) {
            for (var key in constants) {
                if (this.constants_.findIndex((elem) => elem == constants[key]) == -1) {
                    this.constants_[this.constants_.length] = constants[key];
                }
            }
        }
        //update inits
        var inits = Blockly.Python.inits_;
        if (Object.keys(inits).length != 0) {
            for (var key in inits) {
                if (this.inits_.findIndex((elem) => elem == inits[key]) == -1) {
                    this.inits_[this.inits_.length] = inits[key];
                }
            }
        }
        //update codeFunctions
        var codeFunctions = Blockly.Python.codeFunctions_;
        if (Object.keys(codeFunctions).length != 0) {
            for (var key in codeFunctions) {
                if (this.codeFunctions_.findIndex((elem) => elem == codeFunctions[key]) == -1) {
                    this.codeFunctions_[this.codeFunctions_.length] = codeFunctions[key];
                }
            }
        }
        //update powers
        var powers = Blockly.Python.powers_;
        if (Object.keys(powers).length != 0) {
            for (var key in powers) {
                this.powers_.push(powers[key]);
            }
        }
    },
    setIndent: function (code) {
        const splitCode = code.split("\n");
        for (let i = 1; i < splitCode.length; i++) {
            splitCode[i] = ' '.repeat(this.indent) + splitCode[i];
        }
        return splitCode.join("\n");
    },
    dragBlock: function (event) {
        const editor = Main.getCodeEditor().container;
        //Remove all blocks from the hidden workspace
        if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
            dragAndDrop.started = true;
            dragAndDrop.saveCursorPosition = editor.getCursorPosition();
            const removeBlocks = Main.getHiddenWorkSpace().getAllBlocks();
            for (let i = 0; i < removeBlocks.length; i++) {
                Main.getHiddenWorkSpace().removeTopBlock(removeBlocks[i]);
            }
        }
        // when a block is selected
        if (event.type === Blockly.Events.BLOCK_CREATE) {
            const currentLine = editor.session.getLine(dragAndDrop.saveCursorPosition.row);
            if (currentLine.trim() === "") dragAndDrop.indent = currentLine.length;
        }
        // tip to get out of workspace blocks
        if (event.type == Blockly.Events.SELECTED) {
            $('.injectionDiv').css('overflow', 'visible');
        }

        // add whitespace at the end of each lines and a new line at the end
        let lock = 1;
        if (event.type === Blockly.Events.BLOCK_DRAG && lock === 1) {
            dragAndDrop.dragEvent = true;
            $("div.ace_cursor").addClass("ace_cursor_highlight");
            const code = editor.getValue().split('\n');
            if (code.length > 1) {
                for (let i = 0; i < code.length; i++) {
                    if (code[i].trim() != "") {
                        code[i] = code[i] + ' ';
                    }
                    if (code[code.length - 1].trim() != "") {
                        code.push('');
                    }
                    editor.session.setValue(code.join('\n'));
                    lock = 0;
                }
            }
        }

        // when a block is dropped on the editor
        if (event.type === Blockly.Events.BLOCK_MOVE && dragAndDrop.started) {
            const block = Main.getWorkSpace().getBlockById(event.blockId),
                variables_ = Main.getWorkSpace().getAllVariables();
            //insertion of the textual code from the block blockly 
            if (block !== null) {
                Main.getHiddenWorkSpace().addTopBlock(block);

                // add variables to the hidden workspace
                for (let i = 0; i < variables_.length; i++) {
                    Main.getHiddenWorkSpace().createVariable(variables_[i].name, variables_[i].type, variables_[i].id_);
                }

                const blocks = Main.getHiddenWorkSpace().getAllBlocks();

                //enable all blocks in workspace
                for (let i = 0; i < blocks.length; i++) {
                    blocks[i].setEnabled(true);
                }

                let codeBlock = Blockly.Python.workspaceToCode(Main.getHiddenWorkSpace()),
                    import_ = "",
                    func = "";

                [import_, codeBlock] = dragAndDrop.checkImports(codeBlock);
                codeBlock = dragAndDrop.checkConstants(codeBlock);
                codeBlock = dragAndDrop.checkInits(codeBlock);
                [func, codeBlock] = dragAndDrop.checkFunctions(codeBlock);
                codeBlock = dragAndDrop.checkPowers(codeBlock);

                if (import_ != "") {
                    editor.navigateFileStart();
                    if (dragAndDrop.imports_.length == 1 || dragAndDrop.powers_ == 1) {
                        import_ = import_ + "\n";
                        dragAndDrop.cursorY = dragAndDrop.cursorY + 2;
                    } else {
                        dragAndDrop.cursorY = dragAndDrop.cursorY + 1;
                    }
                    editor.insert(import_);
                }
                if (func != "") {
                    editor.gotoLine(dragAndDrop.imports_.length + 1);
                    if (dragAndDrop.imports_.length > 0) {
                        func = "\n" + func;
                    }
                    func = func + "\n";
                    editor.insert(func);
                    const nbLines = (func.match(/\n/g) || []).length;
                    dragAndDrop.cursorY = dragAndDrop.cursorY + nbLines;
                }
                if (dragAndDrop.indent > 0) codeBlock = dragAndDrop.setIndent(codeBlock);

                if (isNaN(dragAndDrop.cursorY)) dragAndDrop.cursorY = 0;
                if (isNaN(dragAndDrop.cursorX)) dragAndDrop.cursorX = 0;

                if (dragAndDrop.dragEvent) {
                    editor.gotoLine(dragAndDrop.cursorY + 1, dragAndDrop.cursorX);
                    dragAndDrop.dragEvent = false;
                } else {
                    dragAndDrop.cursorY = import_.split('\n').length + func.split('\n').length + dragAndDrop.saveCursorPosition.row - 1;
                    editor.gotoLine(dragAndDrop.cursorY, dragAndDrop.saveCursorPosition.column);
                }
                dragAndDrop.saveFirstLine = codeBlock.split('\n')[0];
                editor.insert(codeBlock);
                // remove whitespace at the end of each lines and a new line at the end
                const code = editor.getValue().split('\n');
                for (let i = 0; i < code.length; i++) {
                    code[i] = code[i].trimEnd();
                }

                if (code[code.length - 1].trim() == "") {
                    code.pop();
                }

                editor.session.setValue(code.join('\n'));
                lock = 1;
            }
            // at the end, the block must be removed from the main workspace
            block.dispose();
            $("div.ace_cursor").removeClass("ace_cursor_highlight");

            // i don't know why but the cursor position is reset without a timeout
            setTimeout(() => {
                const cursorPosition = function (lineContent) {
                    if (dragAndDrop.saveFirstLine.includes('def')) {
                        return lineContent.length - 3;
                    } else if (dragAndDrop.saveFirstLine.includes('range')) {
                        const position = lineContent.indexOf(dragAndDrop.saveFirstLine) + dragAndDrop.saveFirstLine.indexOf('range(') + 'range('.length;
                        return position;
                    } else if (dragAndDrop.saveFirstLine.includes('()') || dragAndDrop.saveFirstLine.includes('if') || dragAndDrop.saveFirstLine.includes('while')) {
                        const position = lineContent.indexOf(dragAndDrop.saveFirstLine) + dragAndDrop.saveFirstLine.length;
                        return position - 1;
                    } else {
                        return lineContent.length;
                    }
                };

                const lineNumber = editor.getSession().getLength();
                if (dragAndDrop.cursorY > lineNumber && dragAndDrop.dragEvent) {
                    const lineContent = editor.session.getLine(lineNumber - 1);
                    editor.gotoLine(lineNumber, cursorPosition(lineContent));
                } else {
                    const lineContent = editor.session.getLine(dragAndDrop.cursorY - 1);
                    editor.gotoLine(dragAndDrop.cursorY, cursorPosition(lineContent));
                }
                document.getElementsByClassName('ace_text-input')[0].focus();
            }, 100);
        }
    },
    trackBlock: function (mutations) {
        mutations.forEach(function (mutationRecord) {
            const editor = Main.getCodeEditor().container;
            this.cursorX = parseInt(mutationRecord["target"]["style"]["transform"].split(' ')[0].match(/\d+/g)[1]);
            this.cursorY = parseInt(mutationRecord["target"]["style"]["transform"].split(' ')[1].match(/\d+/g)[0]);

            const editorSideBarWidth = $(".ace_gutter").width();
            const editorLineHeight = $(".ace_gutter-cell").height();

            this.cursorX = this.cursorX - editorSideBarWidth;
            this.cursorY = Math.floor(this.cursorY / editorLineHeight);

            const visuelLength = editor.session.getLine(this.cursorY).visualLength();
            const length = editor.session.getLine(this.cursorY).length;

            this.cursorX = Math.floor(this.cursorX / (visuelLength / length));

            const currentLine = editor.session.getLine(dragAndDrop.cursorY);
            if (currentLine.trim() === "") this.indent = currentLine.length;

            editor.gotoLine(this.cursorY + 1, this.cursorX);
        }.bind(dragAndDrop));
    },
    fixedFlyout: function (mutations) {
        mutations.forEach(function () {
            $(".blocklyFlyout").css("position", "fixed");
        });
    },
    enable: function () {
        this.observerBlocklyBlockDragSurface.observe(this.blocklyBlockDragSurface, { attributes: true, attributeFilter: ['style'] });
        this.observerBlocklyFlyout.observe(this.blocklyFlyout, { attributes: true, attributeFilter: ['style'] });
        Main.getWorkSpace().addChangeListener(this.dragBlock);
    },
    disable: function () {
        this.observerBlocklyBlockDragSurface.disconnect();
        this.observerBlocklyFlyout.disconnect();
        Main.getWorkSpace().removeChangeListener(this.dragBlock);
    },
    size: function () {
        if ($(window).width() < 500) return $(window).width() - $('.blocklyToolboxDiv').width();
        return $(window).width() - $('.blocklyToolboxDiv').width() - $('.ide-simulator').width();
    }
};