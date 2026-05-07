const ACMsg = {};
const InterfaceAutocomplete = {

    tree: null,
    typeTree: null,
    decorators: null,

    init: function (editorContainer, _interface) {

        this.tree = {};
        this.typeTree = {};
        this.decorators = {};

        const isMpy = ['codey', 'cyberpi', 'eliobot', 'esp32', 'galaxia', 'l476', 'm5stack', 'microbit', 'pico', 'raspberrypi', 'steami', 'wb55'].includes(_interface);
        const isCpp = ['arduino', 'letsstartcoding', 'mBot'].includes(_interface);
        const isPy = ['python', 'spike', 'buddy', 'nao', 'bluebot', 'lotibot', 'niryo', 'photon', 'sphero', 'TI-83', 'winky', 'thymio', 'alphai'].includes(_interface);

        let langMode;
        if (isCpp) {
            if (typeof getCompleterTrees_arduino !== 'undefined') {
                const trees = getCompleterTrees_arduino(_interface);
                this.tree = this.mergeTrees(this.tree, trees.tree);
                this.typeTree = this.mergeTypeTrees(this.typeTree, trees.typeTree);
            }
            this.initArduino();
            langMode = ace.require('ace/mode/arduino').Mode;
        } else if (_interface == 'web') {
            langMode = ace.require('ace/mode/html').Mode;
        } else if (isPy) {
            langMode = ace.require('ace/mode/python').Mode;
        } else if (isMpy) {
            if (typeof getCompleterTrees_micropython !== 'undefined') {
                const trees = getCompleterTrees_micropython(_interface);
                this.tree = this.mergeTrees(this.tree, trees.tree);
                this.typeTree = this.mergeTypeTrees(this.typeTree, trees.typeTree);
                if (trees.decorators) this.decorators = this.mergeTrees(this.decorators, trees.decorators);
            }
            if (['cyberpi', 'esp32', 'esp8266', 'galaxia', 'm5stack', 'pico'].includes(_interface)) {
                if (typeof getCompleterTrees_esp32 !== 'undefined') {
                    const trees = getCompleterTrees_esp32(_interface);
                    this.tree = this.mergeTrees(this.tree, trees.tree);
                    this.typeTree = this.mergeTypeTrees(this.typeTree, trees.typeTree);
                    if (trees.decorators) this.decorators = this.mergeTrees(this.decorators, trees.decorators);
                }
            }
            if (['l476', 'steami', 'wb55'].includes(_interface)) {
                if (typeof getCompleterTrees_stm32 !== 'undefined') {
                    const trees = getCompleterTrees_stm32(_interface);
                    this.tree = this.mergeTrees(this.tree, trees.tree);
                    this.typeTree = this.mergeTypeTrees(this.typeTree, trees.typeTree);
                    if (trees.decorators) this.decorators = this.mergeTrees(this.decorators, trees.decorators);
                }
            }
            if (typeof getSpecificCompleterTrees !== 'undefined') {
                const trees = getSpecificCompleterTrees();
                this.tree = this.mergeTrees(this.tree, trees.tree);
                this.typeTree = this.buildTypeTree(this.tree, trees.typeTree);
                if (trees.decorators) this.decorators = this.mergeTrees(this.decorators, trees.decorators);
            }
            this.initMicropython();
            langMode = ace.require('ace/mode/micropython').Mode;
        }

        if (langMode) {
            // Ace editor handler
            editorContainer.session.setMode(new langMode());
            editorContainer.setOptions({
                // to make popup appear automatically, without explicit _ctrl+space_
                enableLiveAutocompletion: true,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                fontSize: '12pt',
                cursorStyle: 'wide',
                wrapBehavioursEnabled: true,
                tabSize: 2,
                useSoftTabs: true,
                hScrollBarAlwaysVisible: false,
                vScrollBarAlwaysVisible: false,
                wrap: -1,
                indentedSoftWrap: true,
                showPrintMargin: false,
                highlightActiveLine: false,
                highlightGutterLine: true
            });
        }

        const langTools = ace.require("ace/ext/language_tools");

        // if ([/*"arduino",*/ "letsstartcoding", "mBot"].includes(_interface)) {
        //     //this.initArduino();
        //     try {
        //         const tipDict = generateDictionary(assignTips(_interface));
        //         const customCompleter = {
        //             getCompletions: (editor, session, pos, prefix, callback) => {
        //                 callback(null, tipDict);
        //             },
        //         }
        //         langTools.addCompleter(customCompleter);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

        if (['galaxia', 'esp32', 'microbit', 'wb55', 'l476', 'steami', 'arduino', 'mBot', 'letsstartcoding'].includes(_interface)) {

            // TO DO in MPY:
            // Finish specific STeaMi 
            // Boards:  M5Stack, Pico, CyberPi, Eliobot, Codey

            // TO DO in Python:
            // Robots: Bluebot, Photon, Lotibot, Spike, Sphero
            // Others: Nao, Buddy, Niryo, Thymio, winky, raspberrypi
            // TI-83

            // TO DO in arduino:
            // libraries grove / robots
            // mBot: specific lib

            function blockWhenSpecial(completer, kind) {
                return {
                    getCompletions(editor, session, pos, prefix, callback) {

                        // ✅ bloque tous les autres completers en contexte décorateur
                        const linePrefix = session.getLine(pos.row).slice(0, pos.column);
                        if (isMpy) {
                            if (/^[ \t]*@([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)?$/.test(linePrefix)) {
                                return callback(null, []);
                            }
                        } else if (isCpp) {
                            // ✅ bloque tous les autres completers quand on est en préprocesseur "#..."
                            if (/^[ \t]*#\s*([A-Za-z_]*)?$/.test(linePrefix)) {
                                return callback(null, []);
                            }
                        }

                        if (InterfaceAutocomplete.getAttrContext(session, pos, prefix)) return callback(null, []);
                        if (isMpy) {
                            if (!!InterfaceAutocomplete.mpy_getImportContext(session, pos, prefix)) return callback(null, []);
                        } else if (isCpp) {
                            if (!!InterfaceAutocomplete.ino_getImportContext(session, pos, prefix)) return callback(null, []);
                        }
                        if (!!InterfaceAutocomplete.getDotPath(session, pos, prefix)) return callback(null, []);
                        return completer.getCompletions(editor, session, pos, prefix, callback);
                    }
                };
            };


            function wrapTextCompleter(textCompleter) {
                return {
                    getCompletions(editor, session, pos, prefix, callback) {
                        return textCompleter.getCompletions(editor, session, pos, prefix, function (err, results) {
                            if (err || !results) return callback(err, results);

                            const imported = InterfaceAutocomplete.getImportedNamesSet(session.getValue());
                            const sem = InterfaceAutocomplete.semanticNames;

                            const filtered = results.filter(r => {
                                const val = r && (r.value || r.caption);
                                if (!val) return true;

                                // existant : supprime uniquement les entrées "local" qui sont des symboles importés
                                if (r.meta === "local" && imported.has(val)) return false;

                                // nouveau : supprime les "local" qui doublonnent un keyword/constant/type/... du mode ou du tree
                                if (r.meta === "local" && sem && sem.has(val)) return false;

                                return true;
                            });

                            callback(null, filtered);
                        });
                    }
                };
            }

            InterfaceAutocomplete.semanticNames = new Set();

            for (const arr of Object.values(InterfaceAutocomplete.tree || {})) {
                if (!Array.isArray(arr)) continue;
                for (const it of arr) if (it?.value) InterfaceAutocomplete.semanticNames.add(it.value);
            }

            if (isMpy || isPy) {
                editorContainer.completers = [this.pythonCompleter];

            } else if (isCpp) {
                const cppCompletions0 = this.makeCcppModeCompleter();

                const cppCompletions = {
                    getCompletions(editor, session, pos, prefix, callback) {
                        return cppCompletions0.getCompletions(editor, session, pos, prefix, function (err, results) {
                            if (err || !results) return callback(err, results);

                            const semanticNames = InterfaceAutocomplete.semanticNames || new Set();
                            const filtered = results.filter(r => {
                                const val = r && (r.value || r.caption);
                                if (!val) return true;
                                const canon = InterfaceAutocomplete.canonicalValue(val);
                                // ✅ si le tree connaît déjà ce symbole, on retire la version "mode"
                                return !semanticNames.has(canon);
                            });

                            callback(null, filtered);
                        });
                    }
                };

                const keywordCompleter0 = langTools.keyWordCompleter;

                langTools.keyWordCompleter = {
                    getCompletions(editor, session, pos, prefix, callback) {
                        return keywordCompleter0.getCompletions(editor, session, pos, prefix, function (err, results) {
                            if (err || !results) return callback(err, results);

                            const semanticNames = InterfaceAutocomplete.semanticNames || new Set();
                            const filtered = results.filter(r => {
                                const val = r && (r.value || r.caption);
                                if (!val) return true;
                                const canon = InterfaceAutocomplete.canonicalValue(val);
                                // ✅ si le tree connaît déjà ce symbole, on retire la version "keyword"
                                return !semanticNames.has(canon);
                            });

                            callback(null, filtered);
                        });
                    }
                };

                editorContainer.completers = [
                    this.arduinoCompleter,
                    cppCompletions
                ];
            }

            editorContainer.completers = editorContainer.completers.concat([
                blockWhenSpecial(langTools.keyWordCompleter),
                blockWhenSpecial(langTools.snippetCompleter),
                blockWhenSpecial(wrapTextCompleter(langTools.textCompleter))
            ]);

            editorContainer.session.on("change", (delta) => {
                if (delta.action !== "insert") return;
                const insertedText = delta.lines.join("\n");
                if (insertedText === ".") {
                    setTimeout(() => editorContainer.execCommand("startAutocomplete"), 0);
                }
                if (isMpy) {
                    if (insertedText === "@") {
                        setTimeout(() => editorContainer.execCommand("startAutocomplete"), 0);
                    }
                }
                if (isCpp) {
                    if (insertedText === "#") {
                        setTimeout(() => editorContainer.execCommand("startAutocomplete"), 0);
                    }
                }
                if (insertedText === " ") {
                    setTimeout(() => {
                        const pos = editorContainer.getCursorPosition();
                        // prefix vide volontairement : on veut proposer toute la liste
                        if (isMpy) {
                            const ic = InterfaceAutocomplete.mpy_getImportContext(editorContainer.session, pos, "");
                            if (ic && (ic.kind === "import" || ic.kind === "from" || ic.kind === "from_import")) {
                                editorContainer.execCommand("startAutocomplete");
                            }
                        } else if (isCpp) {
                            const ic = InterfaceAutocomplete.ino_getImportContext(editorContainer.session, pos, "");
                            if (ic && ic.kind === "include") {
                                editorContainer.execCommand("startAutocomplete");
                            }
                        }
                    }, 0);
                }

            });
        }
    },

    initArduino: function () {
        ace.define("ace/mode/arduino_highlight_rules", [
            "require", "exports", "module",
            "ace/lib/oop",
            "ace/mode/c_cpp_highlight_rules"
        ], function (require, exports, module) {
            "use strict";
            const oop = require("ace/lib/oop");
            const Base = require("ace/mode/c_cpp_highlight_rules").c_cppHighlightRules;

            var ArduinoHighlightRules = function () {
                Base.call(this); // hérite des règles C/C++

                // 1) listes Arduino (tu peux étendre / modifier)
                var arduinoConstants =
                    "HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|" +
                    "RISING|FALLING|CHANGE|LED_BUILTIN|PROGMEM|DEC|HEX|OCT|" +
                    "A0|A1|A2|A3|A4|A5|A6|A7|A8|A9|A10|A11|A12|A13|A14|A15";

                var arduinoTypes =
                    "boolean|byte|word|String";

                var arduinoFunctions =
                    "setup|loop|" +
                    "pinMode|digitalRead|digitalWrite|analogRead|analogWrite|analogReference|" +
                    "delay|delayMicroseconds|millis|micros|" +
                    "attachInterrupt|detachInterrupt|interrupts|noInterrupts|" +
                    "map|constrain|min|max|sq|" +
                    "Serial|Serial1|Serial2|Serial3|Wire|SPI";

                const baseMapper = this.$keywords;

                // Mapper Arduino (fonction)
                const arduinoMapper = this.createKeywordMapper(
                    {
                        "constant.language": arduinoConstants,
                        "storage.type": arduinoTypes,
                        "arduino.functions": arduinoFunctions
                    },
                    "identifier",
                    false
                );

                // Merge = surcharge Arduino + fallback C/C++
                const keywordMapper = function (value) {
                    const t = arduinoMapper(value);
                    if (t && t !== "identifier") return t;
                    return baseMapper(value);
                };

                // Comme MicroPython : remplacer la règle identifier dans start
                const startRules = this.$rules.start;
                for (let i = 0; i < startRules.length; i++) {
                    const r = startRules[i];
                    if (r && r.regex && String(r.regex).includes("[a-zA-Z_")) {
                        if (typeof r.token === "function") {
                            startRules[i] = { token: keywordMapper, regex: r.regex };
                            break;
                        }
                    }
                }
                this.normalizeRules();
            };

            oop.inherits(ArduinoHighlightRules, Base);
            exports.ArduinoHighlightRules = ArduinoHighlightRules;
        });

        ace.define("ace/mode/arduino", [
            "require", "exports", "module",
            "ace/lib/oop",
            "ace/mode/c_cpp",
            "ace/mode/arduino_highlight_rules"
        ], function (require, exports, module) {
            "use strict";
            const oop = require("ace/lib/oop");
            const CCPPMode = require("ace/mode/c_cpp").Mode;
            const Rules = require("ace/mode/arduino_highlight_rules").ArduinoHighlightRules;

            const Mode = function () {
                CCPPMode.call(this);
                this.HighlightRules = Rules;
            };
            oop.inherits(Mode, CCPPMode);
            exports.Mode = Mode;
        });
    },

    initMicropython: function () {
        ace.define("ace/mode/micropython_highlight_rules", [
            "require", "exports", "module",
            "ace/lib/oop",
            "ace/mode/python_highlight_rules"
        ], function (require, exports, module) {
            "use strict";
            const oop = require("ace/lib/oop");
            const Base = require("ace/mode/python_highlight_rules").PythonHighlightRules;

            const MicroPythonHighlightRules = function () {
                Base.call(this);

                const mpKeywords = (
                    "and|as|assert|break|class|continue|def|del|elif|else|except|" +
                    "finally|for|from|global|if|import|in|is|lambda|not|or|pass|" +
                    "raise|return|try|while|with|yield|async|await"
                );

                const mpConstants = "True|False|None|Ellipsis|NotImplementedError";

                const keywordMapper = this.createKeywordMapper(
                    {
                        "keyword": mpKeywords,
                        "constant.language": mpConstants
                    },
                    "identifier",
                    true // ignoreCase
                );

                const startRules = this.$rules.start;
                for (let i = 0; i < startRules.length; i++) {
                    const r = startRules[i];
                    if (r && r.regex && String(r.regex).includes("[a-zA-Z_]")) {
                        if (typeof r.token === "function" || r.token === keywordMapper) {
                            startRules[i] = { token: keywordMapper, regex: r.regex };
                            break;
                        }
                    }
                }

                this.normalizeRules();
            };

            oop.inherits(MicroPythonHighlightRules, Base);
            exports.MicroPythonHighlightRules = MicroPythonHighlightRules;
        });

        ace.define("ace/mode/micropython", [
            "require", "exports", "module",
            "ace/lib/oop",
            "ace/mode/python",
            "ace/mode/micropython_highlight_rules"
        ], function (require, exports, module) {
            "use strict";
            const oop = require("ace/lib/oop");
            const PythonMode = require("ace/mode/python").Mode;
            const Rules = require("ace/mode/micropython_highlight_rules").MicroPythonHighlightRules;

            const Mode = function () {
                PythonMode.call(this);
                this.HighlightRules = Rules;
            };
            oop.inherits(Mode, PythonMode);
            exports.Mode = Mode;
        });
    },

    pythonCompleter: {

        getCompletions(editor, session, pos, prefix, callback) {
            const scoreItem = (it) => {
                const v = it.value || "";
                if (v.startsWith("__")) return 100;
                if (v.startsWith("_")) return 500;
                return 1000;
            };

            const mkItem = (it, score = it.score, overrides = {}) => ({
                caption: it.caption || it.value,
                value: it.value,
                meta: it.meta,
                score,
                snippet: it.snippet,
                title: it.title,
                description: it.description,
                docUrl: it.docUrl,
                ...overrides,
            });

            // --- Déduplication : garde "le meilleur" sur collisions
            const canonKey = (obj) => {
                const v = InterfaceAutocomplete.canonicalValue(obj.value || "");
                const m = obj.meta || "";
                return `${m}::${v}`;
            };

            const pushUnique = (bucket, it) => {
                const k = canonKey(it);
                const prev = bucket.get(k);
                if (!prev) return bucket.set(k, it);
                if ((it.score || 0) > (prev.score || 0)) return bucket.set(k, it);
                if ((it.score || 0) === (prev.score || 0)) {
                    if (!prev.snippet && it.snippet) return bucket.set(k, it);
                }
            };

            const code = session.getValue();
            const imports = InterfaceAutocomplete.buildImportTable(code);
            const qualifiedTypeIndex = InterfaceAutocomplete.indexQualifiedTypes();
            const varTypes = InterfaceAutocomplete.buildVarTypes(code, imports, qualifiedTypeIndex);

            // ✅ Infer receiver expression type (for "[1,2,3].", "(1,2).", '"a".', "b'a'.", etc.)
            const inferReceiverExprType = (expr) => {
                if (!expr) return null;
                const s0 = String(expr).trim();

                // remove trailing dot if present
                const s = s0.replace(/\.\s*$/, "").trim();

                // variable typée
                if (/^[A-Za-z_]\w*$/.test(s) && varTypes.has(s)) return varTypes.get(s);

                // string literal
                if (/^("([^"\\]|\\.)*"|'([^'\\]|\\.)*')$/.test(s)) return "str";

                // bytes literal
                if (/^b("([^"\\]|\\.)*"|'([^'\\]|\\.)*')$/.test(s)) return "bytes";

                // list literal
                if (/^\[.*\]$/.test(s)) return "list";

                // tuple literal (best-effort)
                if (/^\(\s*.*\s*\)$/.test(s)) return "tuple";

                // dict literal (best-effort)
                if (/^\{.*\}$/.test(s)) return "dict";

                // int/float literals (best-effort)
                if (/^\d+$/.test(s)) return "int";
                if (/^\d+\.\d+$/.test(s)) return "float";

                return null;
            };


            // ----- A0) Decorator context: after "@" as first non-space character
            const completeDecoratorContext = () => {
                const linePrefix = session.getLine(pos.row).slice(0, pos.column);
                // "@" doit être le 1er char non-espace
                const dm = linePrefix.match(/^[ \t]*@([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)?$/);
                if (!dm) return null;

                const token = dm[1] || "";
                const store = InterfaceAutocomplete.decorators || {};
                const bucket = new Map();

                const canonDecName = (v) => String(v || "").replace(/^@/, "").trim();
                const mkDec = (it, valueOverride, score = 1300) => {
                    const baseName = canonDecName(it && (it.value || it.caption || it.title) || valueOverride);
                    // Prefer snippet from the base tree (if provided). We only adapt the *decorator name* when we
                    // need a qualified form (e.g. microbit.run_every) so we keep the original args/placeholders.
                    let sn = (it && it.snippet) ? String(it.snippet) : String(valueOverride);
                    sn = sn.replace(/^@/, "");
                    if (valueOverride.includes(".")) {
                        // Replace leading unqualified name with qualified name, preserving the rest of the snippet.
                        const reName = new RegExp("^" + baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=\\b|\\()", "i");
                        sn = sn.replace(reName, valueOverride);
                        // If base snippet didn't start with the name, fallback to valueOverride.
                        if (!sn.toLowerCase().startsWith(valueOverride.toLowerCase())) {
                            const s0 = (it && it.snippet) ? String(it.snippet).replace(/^@/, "") : "";
                            const p = s0.indexOf("(");
                            sn = String(valueOverride) + (p >= 0 ? s0.slice(p) : "");
                        }
                    } else {
                        // Unqualified form: keep base snippet if present, otherwise the value itself.
                        if (!sn) sn = String(valueOverride);
                    }
                    return mkItem(it, score, {
                        caption: valueOverride,
                        value: valueOverride,
                        snippet: sn,
                        meta: "decorator"
                    });
                };

                const pushUnique = (it) => {
                    const k = (it.meta || "") + "::" + (it.value || "");
                    if (!bucket.has(k)) bucket.set(k, it);
                };

                const getDecList = (mod) => {
                    if (!store) return [];
                    if (Array.isArray(store)) return store;          // legacy: global list
                    return Array.isArray(store[mod]) ? store[mod] : [];
                };

                const hasDecorator = (mod, name) => {
                    const n = canonDecName(name);
                    return getDecList(mod).some(d => canonDecName(d.value) === n);
                };

                // A) Qualified form: @alias.<name>
                if (token.includes(".")) {
                    const [head, ...rest] = token.split(".");
                    const memberPrefix = rest.join(".");
                    const mod = imports.aliasToModule.get(head) || head;

                    const wanted = memberPrefix.toLowerCase();
                    for (const d of getDecList(mod)) {
                        const name = canonDecName(d.value);
                        if (!name.toLowerCase().startsWith(wanted)) continue;
                        pushUnique(mkDec(d, head + "." + name, 1400));
                    }
                    return Array.from(bucket.values());
                }

                const wanted0 = token.toLowerCase();

                // B) Unqualified forms from: "from X import *"  -> @decorator
                for (const mod of imports.starModules) {
                    for (const d of getDecList(mod)) {
                        const name = canonDecName(d.value);
                        if (!name.toLowerCase().startsWith(wanted0)) continue;
                        pushUnique(mkDec(d, name, 1350));
                    }
                }

                // C) Unqualified forms from: "from X import run_every as re" -> @re
                for (const [alias, full] of imports.nameToFullPath.entries()) {
                    const parts = String(full).split(".");
                    if (parts.length !== 2) continue;
                    const [mod, name] = parts;
                    if (!hasDecorator(mod, name)) continue;
                    if (!alias.toLowerCase().startsWith(wanted0)) continue;
                    const d = getDecList(mod).find(x => canonDecName(x.value) === canonDecName(name)) || { value: name, title: alias };
                    pushUnique(mkDec(d, alias, 1450));
                }

                // D) Qualified forms from: "import microbit as mb" -> @mb.<decorator>
                for (const [alias, mod] of imports.aliasToModule.entries()) {
                    for (const d of getDecList(mod)) {
                        const name = canonDecName(d.value);
                        const fullName = alias + "." + name;
                        if (!fullName.toLowerCase().startsWith(wanted0)) continue;
                        pushUnique(mkDec(d, fullName, 1200));
                    }
                }

                return Array.from(bucket.values());
            };

            // ----- A) Import context : after "import"/"from" and "from X import ..."
            const completeImportContext = () => {
                const ic = InterfaceAutocomplete.mpy_getImportContext(session, pos, prefix);
                if (!ic) return null;

                if (ic.kind === "import" || ic.kind === "from") {
                    const wanted = (ic.modulePrefix || "").toLowerCase();
                    const out = Object.keys(InterfaceAutocomplete.tree || {})
                        .filter((name) => name !== "builtins")
                        .filter((name) => name.toLowerCase().startsWith(wanted))
                        .map((name) => ({ caption: name, value: name, meta: "module", score: 1000 }));
                    return out;
                }

                if (ic.kind === "from_path") {
                    // Example: "from mcp23009e." -> only suggest sub-modules (e.g. const)
                    const items0 = InterfaceAutocomplete.tree[ic.module] || [];
                    const wanted = (ic.namePrefix || "").toLowerCase();

                    const isSubModule = (it) => {
                        const k = (it && it.kind) || "";
                        return k === "sub-module" || k === "submodule";
                    };

                    return items0
                        .filter((it) => it && isSubModule(it))
                        .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                        .map((it) => ({
                            caption: it.caption || it.value,
                            value: it.value,
                            meta: "module",
                            score: 1000,
                            title: it.title,
                            description: it.description,
                            docUrl: it.docUrl,
                        }));
                }

                if (ic.kind === "from_import") {
                    let items0 = InterfaceAutocomplete.tree[ic.module];

                    // Support sub-modules stored inline in the parent module entry:
                    // e.g. tree["mcp23009e"] contains { value:"const", kind:"sub-module", content:[...] }
                    if (!items0 && ic.module && ic.module.includes(".")) {
                        const parts = ic.module.split(".");
                        const parent = parts.slice(0, -1).join(".");
                        const child = parts[parts.length - 1];

                        const parentItems = InterfaceAutocomplete.tree[parent] || [];
                        const sub = parentItems.find((it) => {
                            if (!it) return false;
                            const k = it.kind || "";
                            const isSub = k === "sub-module" || k === "submodule";
                            if (!isSub) return false;
                            return (it.value === child) || (it.caption === child);
                        });

                        if (sub && Array.isArray(sub.content)) items0 = sub.content;
                    }

                    const items = (items0 || []).filter(it => it && it.meta !== "decorator");
                    const wanted = (ic.namePrefix || "").toLowerCase();

                    const out = items
                        .filter((it) => {
                            const v = it.value || "";
                            if (it.meta === "constructor") return false;
                            if (/\(\)\s*$/.test(v)) return false;
                            return v.toLowerCase().startsWith(wanted);
                        })
                        .map((it) => ({
                            caption: it.caption || it.value,
                            value: it.value,
                            meta: it.meta,
                            score: scoreItem(it),
                            title: it.title,
                            description: it.description,
                            docUrl: it.docUrl,
                        }));

                    out.unshift({ caption: "*", value: "*", score: 1100 });
                    return out;
                }

                return null;
            };

            // ----- B) Receiver-based : "a." / "music.DADADADUM." / '"hey".' / "[1,2,3]."
            // ----- B) Receiver-based : "a." / '"hey".' / "[1,2,3]."
            const completeReceiverType = () => {
                // ✅ detect ANY "<expr>.<memberPrefix>" from the line, including literals
                const linePrefix = session.getLine(pos.row).slice(0, pos.column);
                const mm = linePrefix.match(/(.+?)\.\s*([A-Za-z0-9_]*)$/);
                if (!mm) return null;

                // expr can include "= ..." so keep only what's after the last "=" (best-effort)
                const rawExpr = (mm[1] || "").trim();
                const expr = rawExpr.split("=").pop().trim();
                const memberPrefix2 = mm[2] || "";

                // 1) infer from expression (covers literals + typed vars)
                let t = inferReceiverExprType(expr);

                // 2) try resolving modules/classes paths if still unknown
                if (!t) {
                    const qualifiedParts = InterfaceAutocomplete.resolveToPath(expr, imports);
                    const qualifiedQ = InterfaceAutocomplete.partsToQualified(qualifiedParts);
                    if (qualifiedQ) {
                        t = qualifiedTypeIndex.get(qualifiedQ) || InterfaceAutocomplete.getReturnsFromPath(qualifiedParts);
                    }
                }

                // 3) star import resolution for bare names
                if (!t && !expr.includes(".")) {
                    for (const mod of imports.starModules) {
                        const found = InterfaceAutocomplete.findTopItem(mod, expr);
                        if (found && (found.returns || found.class)) {
                            t = found.returns || found.class;
                            break;
                        }
                    }
                }

                if (!t || !InterfaceAutocomplete.typeTree[t]) return null;

                const wanted = memberPrefix2.toLowerCase();
                return InterfaceAutocomplete.typeTree[t]
                    .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                    .map((it) => mkItem(it, scoreItem(it)));
            };


            // ----- C) Fallback literal string: '"abc".foo'
            const completeStringLiteralDot = () => {
                const linePrefix = session.getLine(pos.row).slice(0, pos.column);
                const m = linePrefix.match(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')\s*\.\s*([A-Za-z0-9_]*)$/);
                if (!m) return null;

                const memberPrefix = m[4] || "";
                const wanted = memberPrefix.toLowerCase();
                return (InterfaceAutocomplete.typeTree["str"] || [])
                    .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                    .map((it) => mkItem(it, scoreItem(it)));
            };

            // ----- D) No dot: imports explicites + star-import + builtins (+ dédup)
            const completeTopLevelNoDot = () => {
                if (!prefix) return [];

                const wanted = prefix.toLowerCase();
                const bucket = new Map();

                // 0) locals indexables: myList[] -> myList[${1:}]
                for (const [name, t] of varTypes.entries()) {
                    if (!name.toLowerCase().startsWith(wanted)) continue;

                    // liste des types indexables (ajuste si tu veux)
                    if (!["list", "tuple", "str", "bytes", "bytearray", "dict", "NeoPixel"].includes(t)) continue;

                    ACMsg.INDEX_ACCESS = ACMsg.INDEX_ACCESS.replace("%1", name);
                    pushUnique(bucket, {
                        caption: `${name}[]`,
                        value: `${name}[]`,
                        meta: "local",
                        score: 1150,
                        snippet: `${name}[\${1:}]`,
                        title: `${name}[i]`,
                        description: "INDEX_ACCESS",
                    });
                }

                // 1) noms importés explicitement : alias -> full
                for (const [alias, full] of imports.nameToFullPath.entries()) {
                    if (!alias.toLowerCase().startsWith(wanted)) continue;

                    const [mod, name] = full.split(".");
                    const top = InterfaceAutocomplete.tree[mod];
                    if (!top) continue;

                    const canon = InterfaceAutocomplete.canonicalValue(name);
                    const matches = top.filter((x) => InterfaceAutocomplete.canonicalValue(x?.value) === canon);
                    if (!matches.length) continue;

                    for (const it of matches) {
                        const raw = it.value || "";
                        const isCtor = it.meta === "constructor" || /\(\)\s*$/.test(raw);

                        const rewriteSnippetHead = (snip, alias) => {
                            if (!snip) return undefined;
                            // remplace le premier identifiant (souvent le nom de la fonction) par l'alias importé
                            return String(snip).replace(/^[A-Za-z_]\w*/, alias);
                        };

                        const obj = mkItem(it, isCtor ? 950 : scoreItem(it), {
                            value: alias,
                            snippet: isCtor
                                ? (it.snippet ? rewriteSnippetHead(it.snippet, alias) : `${alias}()`)
                                : (it.snippet ? rewriteSnippetHead(it.snippet, alias) : undefined),
                        });

                        pushUnique(bucket, obj);
                    }
                }

                // 2) from X import *
                for (const mod of imports.starModules) {
                    const top = InterfaceAutocomplete.tree[mod];
                    if (!top) continue;
                    for (const it of top) {
                        if (it && it.meta === "decorator") continue;
                        if ((it.value || "").startsWith("__")) continue;
                        if ((it.value || "").toLowerCase().startsWith(wanted)) {
                            pushUnique(bucket, mkItem(it, 900));
                        }
                    }
                }

                // 3) builtins
                const builtins = InterfaceAutocomplete.tree?.builtins || [];
                for (const it of builtins) {
                    if ((it.value || "").startsWith("__")) continue;
                    if ((it.value || "").toLowerCase().startsWith(wanted)) {
                        pushUnique(bucket, mkItem(it, 1200));
                    }
                }

                return Array.from(bucket.values());
            };

            // ----- E) Dot path: navigation dans l’arbre + fallback varTypes + ✅ expression literals
            const completeDotPath = () => {
                const dotCtx = InterfaceAutocomplete.getDotPath(session, pos, prefix);
                if (!dotCtx) return null;

                let path = dotCtx.path.slice();

                // alias module
                if (imports.aliasToModule.has(path[0])) path[0] = imports.aliasToModule.get(path[0]);

                // nom importé : "NeoPixel." -> "neopixel.NeoPixel."
                if (path.length === 1 && imports.nameToFullPath.has(path[0])) {
                    path = imports.nameToFullPath.get(path[0]).split(".");
                }

                // star-import symbol : "display." si display vient de "from microbit import *"
                if (path.length === 1) {
                    for (const mod of imports.starModules) {
                        const top = InterfaceAutocomplete.tree[mod];
                        if (top && top.some((it) => it.value === path[0])) {
                            path = [mod, path[0]];
                            break;
                        }
                    }
                }

                // ✅ literal expression receiver captured as a single "path" token by getDotPath
                // Examples: "[1,2,3]." or '("a").'
                if (path.length === 1) {
                    const expr = path[0];
                    const t = inferReceiverExprType(expr);
                    if (t && InterfaceAutocomplete.typeTree[t]) {
                        const wanted = (dotCtx.memberPrefix || "").toLowerCase();
                        return InterfaceAutocomplete.typeTree[t]
                            .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                            .map((it) => mkItem(it, scoreItem(it)));
                    }
                }

                // variable locale : "a." -> typeTree[varTypes.get("a")]
                if (path.length === 1 && varTypes.has(path[0])) {
                    const t = varTypes.get(path[0]);
                    if (t && InterfaceAutocomplete.typeTree[t]) {
                        const wanted = (dotCtx.memberPrefix || "").toLowerCase();
                        return InterfaceAutocomplete.typeTree[t]
                            .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                            .map((it) => mkItem(it, scoreItem(it)));
                    }
                }

                const items0 = InterfaceAutocomplete.resolveNode(path);
                const items = (items0 || []).filter(it => it && it.meta !== "decorator");
                if (!items) return [];

                const wanted = (dotCtx.memberPrefix || "").toLowerCase();
                return items
                    .filter((it) => (it.value || "").toLowerCase().startsWith(wanted))
                    .map((it) => mkItem(it, scoreItem(it)));
            };

            const decoratorOut = completeDecoratorContext();
            if (decoratorOut !== null) return callback(null, decoratorOut);

            const importOut = completeImportContext();
            if (importOut !== null) return callback(null, importOut);

            const strLitOut = completeStringLiteralDot();
            if (strLitOut !== null) return callback(null, strLitOut);

            const recvOut = completeReceiverType();
            if (recvOut !== null) return callback(null, recvOut);

            const dotOut = completeDotPath();
            if (dotOut !== null) return callback(null, dotOut);

            // no dot
            return callback(null, completeTopLevelNoDot());
        }
    },

    arduinoCompleter: {
        getCompletions(editor, session, pos, prefix, callback) {

            // A) Contexte include : propose les headers
            const ic = InterfaceAutocomplete.ino_getImportContext(session, pos, prefix);
            if (ic && ic.kind === "include") {
                const wanted = (ic.pathPrefix || "").toLowerCase();
                const headers = Object.keys(InterfaceAutocomplete.tree || {})
                    .filter((k) => k.endsWith(".h"));

                const out = headers
                    .filter((h) => h.toLowerCase().startsWith(wanted))
                    .map((h) => (!ic.delimiter
                        ? { caption: h, value: `<${h}>`, meta: "header", score: 2000 }
                        : { caption: h, value: h, meta: "header", score: 2000 }
                    ));

                return callback(null, out);
            }

            // B) Contexte "#..." : include/define/etc.
            const linePrefix = session.getLine(pos.row).slice(0, pos.column);
            const m = linePrefix.match(/^\s*#\s*([A-Za-z_]*)$/);
            if (m) {
                const pfx = (m[1] || "").toLowerCase();
                const words = [
                    { value: "include", meta: "preprocessor", score: 2000 },
                    { value: "define", meta: "preprocessor", score: 1900 },
                    { value: "undef", meta: "preprocessor", score: 1800 },
                    { value: "ifdef", meta: "preprocessor", score: 1750 },
                    { value: "ifndef", meta: "preprocessor", score: 1750 },
                    { value: "if", meta: "preprocessor", score: 1700 },
                    { value: "elif", meta: "preprocessor", score: 1650 },
                    { value: "else", meta: "preprocessor", score: 1600 },
                    { value: "endif", meta: "preprocessor", score: 1600 },
                    { value: "pragma", meta: "preprocessor", score: 1500 },
                ];

                return callback(null, words
                    .filter(w => w.value.startsWith(pfx))
                    .map(w => ({ caption: w.value, value: w.value, meta: w.meta, score: w.score }))
                );
            }

            // C) Contexte "obj." : propose les membres depuis le typeTree (ex: Wire. -> TwoWire)
            //    NB: le tree contient souvent `class` (pas `returns`) pour les objets globaux.
            const dotCtx = InterfaceAutocomplete.getDotPath(session, pos, prefix);
            if (dotCtx) {
                const included = InterfaceAutocomplete.getIncludedHeadersSet(session.getValue());
                const varTypes = InterfaceAutocomplete.buildCppVarTypes(session.getValue(), included);
                const base = dotCtx.path[dotCtx.path.length - 1];
                const wanted = (dotCtx.memberPrefix || "").toLowerCase();

                let t = null;

                // 0) variable locale typée (String b = ..., TwoWire &w = Wire, etc.)
                if (dotCtx.path.length === 1 && varTypes.has(base)) {
                    t = varTypes.get(base);
                }

                // 1) si c'est un nom simple (Wire., Serial., SPI.) → chercher son type via headers inclus
                if (dotCtx.path.length === 1) {
                    for (const hdr of included) {
                        const found = InterfaceAutocomplete.findTopItem(hdr, base);
                        if (found && (found.returns || found.class)) {
                            t = found.returns || found.class;
                            break;
                        }
                    }
                }

                // 2) fallback: navigation directe dans l'arbre (au cas où tu as un noeud avec content)
                if (!t) {
                    const items0 = InterfaceAutocomplete.resolveNode(dotCtx.path);
                    if (Array.isArray(items0)) {
                        const out0 = items0
                            .filter((it) => (it?.value || "").toLowerCase().startsWith(wanted))
                            .map((it) => ({
                                caption: it.caption || it.title || it.value,
                                value: it.value,
                                meta: it.meta || "arduino",
                                score: 1300,
                                snippet: it.snippet,
                                title: it.title,
                                description: it.description,
                                docUrl: it.docUrl,
                            }));
                        return callback(null, out0);
                    }
                }

                // 3) typeTree
                if (t && InterfaceAutocomplete.typeTree && InterfaceAutocomplete.typeTree[t]) {
                    const out = InterfaceAutocomplete.typeTree[t]
                        .filter((it) => (it?.value || "").toLowerCase().startsWith(wanted))
                        .map((it) => ({
                            caption: it.caption || it.title || it.value,
                            value: it.value,
                            meta: it.meta || "member",
                            score: 1400,
                            snippet: it.snippet,
                            title: it.title,
                            description: it.description,
                            docUrl: it.docUrl,
                        }));
                    return callback(null, out);
                }

                return callback(null, []);
            }

            // D) Contexte "code" : propose les symboles disponibles via Arduino.h (implicit)
            if (!prefix) return callback(null, []);
            const wanted = prefix.toLowerCase();

            const included = InterfaceAutocomplete.getIncludedHeadersSet(session.getValue());
            const bucket = [];

            // Pour l’instant, on complète à partir des headers inclus (dont Arduino.h implicite)
            for (const hdr of included) {
                const items = InterfaceAutocomplete.tree?.[hdr];
                if (!Array.isArray(items)) continue;

                for (const it of items) {
                    const v = (it && it.value) || "";
                    if (!v) continue;
                    if (v.toLowerCase().startsWith(wanted)) {
                        bucket.push({
                            caption: it.caption || it.title || it.value,
                            value: it.value,
                            meta: it.meta || "arduino",
                            score: 1200,
                            snippet: it.snippet,
                            title: it.title,
                            description: it.description,
                            docUrl: it.docUrl,
                        });
                    }
                }
            }

            return callback(null, bucket);
        }
    },

    getAttrContext(session, pos, prefix = "") {
        const col = pos.column - (prefix ? prefix.length : 0);
        const line = session.getLine(pos.row).slice(0, Math.max(0, col));
        const m = line.match(/([a-zA-Z_]\w*)\.(\w*)?$/);
        return m ? { base: m[1], memberPrefix: m[2] || "" } : null;
    },

    getDotPath(session, pos, prefix = "") {
        const col = Math.max(0, pos.column - (prefix ? prefix.length : 0));
        const line = session.getLine(pos.row).slice(0, col);
        const m = line.match(/([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\.(\w*)?$/);
        if (!m) return null;
        return { path: m[1].split("."), memberPrefix: m[2] || "" };
    },

    resolveNode(fullPathParts) {
        let items = this.tree[fullPathParts[0]];
        if (!Array.isArray(items)) return null;

        for (let i = 1; i < fullPathParts.length; i++) {
            const name = fullPathParts[i];
            const found = items.find(it => this.canonicalValue(it?.value) === this.canonicalValue(name));
            if (!found || !Array.isArray(found.content)) return null;
            items = found.content;
        }
        return items;
    },

    buildImportTable(code) {
        const table = {
            aliasToModule: new Map(),
            nameToFullPath: new Map(),
            starModules: new Set(),
            modules: new Set()
        };

        const lines = code.split(/\r?\n/);

        for (const line of lines) {
            // import [library] as [lib]
            {
                const m = line.match(/^\s*import\s+([a-zA-Z_]\w*)(?:\s+as\s+([a-zA-Z_]\w*))?\s*$/);
                if (m) {
                    const mod = m[1];
                    const alias = m[2] || mod;
                    table.aliasToModule.set(alias, mod);
                    table.modules.add(mod);
                    table.modules.add(alias);
                    continue;
                }
            }

            // from [library] import *
            {
                const m = line.match(/^\s*from\s+([a-zA-Z_]\w*)\s+import\s+\*\s*$/);
                if (m) {
                    table.starModules.add(m[1]);
                    continue;
                }
            }

            // from [library] import [submodule], [constant] as [cst]
            {
                const m = line.match(/^\s*from\s+([a-zA-Z_]\w*)\s+import\s+(.+)\s*$/);
                if (m) {
                    const mod = m[1];
                    const imports = m[2];
                    if (imports.trim() === "*") {
                        table.starModules.add(mod);
                        continue;
                    }
                    for (const part of imports.split(",")) {
                        const p = part.trim();
                        if (!p) continue;
                        const mm = p.match(/^([a-zA-Z_]\w*)(?:\s+as\s+([a-zA-Z_]\w*))?$/);
                        if (!mm) continue;
                        const name = mm[1];
                        const alias = mm[2] || name;
                        table.nameToFullPath.set(alias, `${mod}.${name}`);
                    }
                }
            }
        }
        return table;
    },

    indexQualifiedTypes: function () {
        const idx = new Map();
        const walk = (prefix, items) => {
            for (const it of (items || [])) {
                if (!it || !it.value) continue;
                const q = `${prefix}.${this.canonicalValue(it.value)}`;
                const t = it.returns || it.class;
                if (t) idx.set(q, t);

                if (Array.isArray(it.content)) walk(q, it.content);
            }
        };
        for (const mod of Object.keys(this.tree || {})) {
            walk(mod, this.tree[mod]);
        }
        return idx;
    },

    resolveToPath(expr, imports) {
        // expr: "microbit.audio.SoundEffect" / "audio.SoundEffect" / "mb.audio.SoundEffect" / "SoundEffect"
        if (!expr) return null;

        // cas nom seul: from X import Name
        if (!expr.includes(".")) {
            // nom seul : OK uniquement s'il vient d'un "from X import Name"
            if (imports.nameToFullPath.has(expr)) return imports.nameToFullPath.get(expr).split(".");
            // sinon on ne peut pas le qualifier ici (star import sera géré ailleurs)
            return null;
        }
        const parts = expr.split(".");

        const head = parts[0];
        if (imports.nameToFullPath.has(head)) {
            const baseParts = imports.nameToFullPath.get(head).split("."); // "microbit.uart" -> ["microbit","uart"]
            return [...baseParts, ...parts.slice(1)];
        }

        // alias module sur le 1er segment: mb -> microbit
        const headResolved = imports.aliasToModule.get(head) || head;
        const resolvedParts = [headResolved, ...parts.slice(1)];

        const headIsImported =
            imports.modules?.has(headResolved) ||
            imports.modules?.has(head) ||
            Array.from(imports.nameToFullPath.values()).some(fp => fp.startsWith(headResolved + ".")) ||
            imports.starModules.has(headResolved);

        if (!headIsImported) return null;

        return resolvedParts;
    },

    findTopItem(mod, name) {
        const top = (this.tree && this.tree[mod]) || [];
        const wanted = this.canonicalValue(name);

        // retourne tous les overloads possibles (Image@str, Image@buf...)
        const matches = top.filter(it => this.canonicalValue(it.value) === wanted);
        if (!matches.length) return null;

        // si plusieurs, on prend le premier qui a "returns" (ou le premier tout court)
        return matches.find(it => it && it.returns) || matches[0];
    },

    canonicalValue(v) {
        if (!v) return "";
        return String(v).replace(/\(\)\s*$/, "").replace(/@.+$/, "").trim();
    },

    getReturnsTypeFromQualifiedAny(qualifiedName) {
        // "microbit.audio.SoundEffect" -> modKey "microbit.audio", symbol "SoundEffect"
        const parts = qualifiedName.split(".");
        if (parts.length < 2) return null;

        const symbol = parts[parts.length - 1];
        const modKey = parts.slice(0, -1).join(".");

        const found = this.findTopItem(modKey, symbol); // ✅ canonicalValue inside
        if (!found) return null;

        return found.returns || found.class || null;
    },

    partsToQualified(parts) {
        return Array.isArray(parts) ? parts.join(".") : null;
    },

    getReturnsFromPath(pathParts) {
        // pathParts ex: ["microbit","audio","SoundEffect"]
        const it = this.findItemByPath(pathParts);
        if (!it) return null;
        return it.returns || it.class || null;
    },


    buildVarTypes(code, imports, qualifiedTypeIndex) {
        // Map: variableName -> typeName (ex: "np" -> "NeoPixel", "mel" -> "tuple", "effect" -> "MicroBitSoundEffect")
        const varTypes = new Map();
        const lines = code.split(/\r?\n/);

        // Helper: infer simple types
        const inferExprType = function (rhs) {
            if (!rhs) return null;
            const s = String(rhs).trim();

            // variable typée
            if (/^[A-Za-z_]\w*$/.test(s) && varTypes.has(s)) return varTypes.get(s);

            // littéraux
            if (/^\[.*\]$/.test(s)) return "list";
            if (/^\(\s*.*\s*\)$/.test(s)) return "tuple";
            if (/^("([^"\\]|\\.)*"|'([^'\\]|\\.)*')$/.test(s)) return "str";
            if (/^b("([^"\\]|\\.)*"|'([^'\\]|\\.)*')$/.test(s)) return "bytes";
            if (/^\d+$/.test(s)) return "int";
            if (/^\d+\.\d+$/.test(s)) return "float";

            // dict/set : très approximatif
            if (/^\{.*\}$/.test(s)) return "dict";

            return null;
        }

        // Helper: turn a resolved path array into a qualified string
        const partsToQualified = (parts) => Array.isArray(parts) ? parts.join(".") : null;

        // ✅ Helper: builtin/typeTree inference for calls like bytearray(...), str(...), list(...), etc.
        const inferBuiltinCallReturnType = (calleeName) => {
            if (!calleeName) return null;

            // A) If you have a "builtins" top module in your tree, prefer its declared returns/class
            //    (works even if callee is not imported)
            const builtinsItem = this.findTopItem ? this.findTopItem("builtins", calleeName) : null;
            if (builtinsItem && (builtinsItem.returns || builtinsItem.class)) {
                return builtinsItem.returns || builtinsItem.class;
            }

            // B) Generic: if typeTree contains a key with that name, then calling it returns that type
            //    ex: typeTree.bytearray exists => bytearray(...) returns "bytearray"
            const tt = this.typeTree || null;
            if (tt && Object.prototype.hasOwnProperty.call(tt, calleeName)) {
                return calleeName;
            }

            return null;
        };

        for (const line of lines) {

            // 1) Constructor call:  var = Callee(...)
            // Examples:
            //   np = NeoPixel(pin0, 10)
            //   b  = audio.SoundEffect()
            //   c  = microbit.audio.SoundEffect()
            //   d  = neopixel.NeoPixel(pin0, 10)
            //   e  = bytearray(source)
            {
                const m = line.match(/^\s*([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\s*\(/);
                if (m) {
                    const varName = m[1];
                    const calleeRaw = m[2];

                    // Resolve name -> path, but ONLY if the base is actually imported / in-scope
                    let calleeParts = this.resolveToPath(calleeRaw, imports); // ex ["microbit","audio","SoundEffect"] OR null for builtins
                    let calleeQ = partsToQualified(calleeParts);              // ex "microbit.audio.SoundEffect"

                    // If resolveToPath only returns a single identifier (not qualified), treat as "not resolved"
                    if (calleeParts && calleeParts.length === 1) {
                        calleeParts = null;
                        calleeQ = null;
                    }

                    let t = null;

                    // A) direct hit in qualifiedTypeIndex (if you indexed it)
                    if (calleeQ) t = qualifiedTypeIndex.get(calleeQ) || null;

                    // B) otherwise, read "returns" (or "class") from the tree node itself (works for nested paths)
                    if (!t && calleeParts) t = this.getReturnsFromPath(calleeParts) || null;

                    // C) fallback: non-qualified call (ex: NeoPixel(...), Image(...)) from explicit "from X import Name"
                    if (!t && !calleeQ && imports.nameToFullPath.has(calleeRaw)) {
                        const fq = imports.nameToFullPath.get(calleeRaw); // ex "neopixel.NeoPixel"
                        t = qualifiedTypeIndex.get(fq) || this.getReturnsTypeFromQualifiedAny(fq) || null;
                    }

                    // D) fallback: non-qualified call from "from X import *"
                    if (!t && !calleeQ) {
                        for (const mod of imports.starModules) {
                            const found = this.findTopItem(mod, calleeRaw); // canonical match
                            if (found && (found.returns || found.class)) {
                                t = found.returns || found.class;
                                break;
                            }
                        }
                    }

                    // ✅ E) FINAL fallback for builtins/types not imported:
                    //    - bytearray(...), str(...), list(...), dict(...), bytes(...), memoryview(...), etc.
                    if (!t) {
                        // calleeRaw might be "bytearray" or "builtins.bytearray" depending on your editor,
                        // but here regex captures without "()"; we keep last part for safety.
                        const calleeName = String(calleeRaw).split(".").pop();
                        t = inferBuiltinCallReturnType(calleeName);
                    }

                    if (t) varTypes.set(varName, t);
                    continue;
                }
            }

            // 2) Direct assignment: var = something
            // Examples:
            //   mel = music.DADADADUM
            //   se  = SoundEffect
            //   a   = (1, 2)
            {
                const m = line.match(/^\s*([a-zA-Z_]\w*)\s*=\s*(.+?)\s*$/);
                if (m) {
                    const varName = m[1];
                    const rhsRaw = (m[2] || "").trim();

                    // ✅ a = b  (copy known type)
                    if (/^[a-zA-Z_]\w*$/.test(rhsRaw) && varTypes.has(rhsRaw)) {
                        varTypes.set(varName, varTypes.get(rhsRaw));
                        continue;
                    }

                    // A) literal inference
                    let t = inferExprType(rhsRaw);
                    if (t) {
                        varTypes.set(varName, t);
                        continue;
                    }

                    // B) best-effort name/path inference (avoid expressions)
                    if (/^[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*$/.test(rhsRaw)) {

                        // Resolve only if base is in-scope (imported module / alias / imported name)
                        const rhsParts = this.resolveToPath(rhsRaw, imports);
                        const rhsQ = partsToQualified(rhsParts);

                        if (rhsQ) {
                            // 1) if indexed, use it
                            t = qualifiedTypeIndex.get(rhsQ) || null;

                            // 2) else try reading returns/class from the tree node (handles nested)
                            if (!t) t = this.getReturnsFromPath(rhsParts) || null;

                            if (t) {
                                varTypes.set(varName, t);
                                continue;
                            }
                        }

                        // Non-qualified symbol assigned from an explicitly imported name
                        if (!rhsQ && imports.nameToFullPath.has(rhsRaw)) {
                            const fq = imports.nameToFullPath.get(rhsRaw);
                            t = qualifiedTypeIndex.get(fq) || this.getReturnsTypeFromQualifiedAny(fq) || null;
                            if (t) {
                                varTypes.set(varName, t);
                                continue;
                            }
                        }

                        // Non-qualified symbol assigned from a star import
                        if (!rhsQ) {
                            for (const mod of imports.starModules) {
                                const found = this.findTopItem(mod, rhsRaw);
                                if (found && (found.returns || found.class)) {
                                    varTypes.set(varName, found.returns || found.class);
                                    break;
                                }
                            }
                        }

                        // ✅ Extra: builtins symbol assigned (rare but possible): x = bytearray  (not a call)
                        if (!varTypes.has(varName)) {
                            const name = String(rhsRaw).split(".").pop();
                            const bt = inferBuiltinCallReturnType(name);
                            if (bt) varTypes.set(varName, bt);
                        }
                    }
                }
            }
        }

        return varTypes;
    },

    // --- Arduino/C++: very small local type inference (enough for "b." completions)
    // Returns Map<varName, typeName>
    // Supported patterns (best-effort):
    //   Type v;
    //   Type v = expr;
    //   Type v(expr);
    //   auto v = Type(...);
    //   v = otherVar; (propagate known type)
    // Also strips pointers/references/const/volatile.
    buildCppVarTypes(code, includedHeadersSet = null) {
        const varTypes = new Map();
        const lines = String(code || "").split(/\r?\n/);

        const cleanType = (t) => String(t || "")
            .replace(/\b(const|volatile|static|inline|constexpr|typename)\b/g, " ")
            .replace(/[\*&]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const inferCtorCallType = (calleeRaw) => {
            if (!calleeRaw) return null;
            const name = String(calleeRaw).split("::").pop().trim();
            if (!name) return null;

            // If you explicitly included headers, try their tree entries first
            const included = includedHeadersSet || InterfaceAutocomplete.getIncludedHeadersSet(code);
            for (const hdr of included) {
                const found = InterfaceAutocomplete.findTopItem(hdr, name);
                if (found && (found.returns || found.class || (found.kind === "class" && found.value))) {
                    return found.returns || found.class || found.value;
                }
            }

            // fallback: if typeTree has that key, assume ctor returns same type
            if (InterfaceAutocomplete.typeTree && Object.prototype.hasOwnProperty.call(InterfaceAutocomplete.typeTree, name)) {
                return name;
            }

            return null;
        };

        for (const rawLine of lines) {
            const line = rawLine.replace(/\/\/.*$/, "").trim();
            if (!line) continue;

            // 1) auto v = Type(...);
            {
                const m = line.match(/^auto\s+([A-Za-z_]\w*)\s*=\s*([A-Za-z_]\w*(?:::[A-Za-z_]\w*)*)\s*\(/);
                if (m) {
                    const varName = m[1];
                    const callee = m[2];
                    const t = inferCtorCallType(callee);
                    if (t) varTypes.set(varName, t);
                    continue;
                }
            }

            // 2) Type v = ...;   or   Type v(...);
            //    Note: keep it simple, avoid templates.
            {
                const m = line.match(/^([A-Za-z_]\w*(?:::[A-Za-z_]\w*)*)\s+([A-Za-z_]\w*)\s*(?:=\s*(.+?)|\(.*\))\s*;?$/);
                if (m) {
                    const typeRaw = m[1];
                    const varName = m[2];
                    const typeName = cleanType(typeRaw);
                    if (typeName) varTypes.set(varName, typeName);

                    // If rhs is another known var, propagate more specific type (rare)
                    const rhs = (m[3] || "").trim();
                    if (rhs && /^[A-Za-z_]\w*$/.test(rhs) && varTypes.has(rhs)) {
                        varTypes.set(varName, varTypes.get(rhs));
                    }
                    continue;
                }
            }

            // 3) v = otherVar;  (propagate)
            {
                const m = line.match(/^([A-Za-z_]\w*)\s*=\s*([A-Za-z_]\w*)\s*;?$/);
                if (m) {
                    const dst = m[1];
                    const src = m[2];
                    if (varTypes.has(src)) varTypes.set(dst, varTypes.get(src));
                    continue;
                }
            }
        }

        return varTypes;
    },

    ino_getImportContext(session, pos, prefix = "") {
        const col = Math.max(0, pos.column - (prefix ? prefix.length : 0));
        const line = session.getLine(pos.row).slice(0, col);

        // 1) #include (just typed, no delimiter yet)
        // "#include" or "# include"
        let m = line.match(/^\s*#\s*include\s*$/);
        if (m) {
            return { kind: "include", delimiter: null, pathPrefix: "" };
        }

        // 2) #include <...   (system/Arduino style)
        // Matches:
        //   #include <WiFi.h
        //   # include   <Arduino.
        // and captures the currently typed prefix inside <>
        m = line.match(/^\s*#\s*include\s*<([^>]*)$/);
        if (m) {
            return { kind: "include", delimiter: "<>", pathPrefix: m[1] || "" };
        }

        // 3) #include "...
        // Matches:
        //   #include "MyLib.h
        //   # include "src/uti
        m = line.match(/^\s*#\s*include\s*"([^"]*)$/);
        if (m) {
            return { kind: "include", delimiter: "\"\"", pathPrefix: m[1] || "" };
        }

        // 4) Optional: user typed the closing delimiter already; not an import-completion context.
        // e.g. #include <WiFi.h> or #include "a.h"
        // -> return null

        return null;
    },


    mpy_getImportContext(session, pos, prefix = "") {
        const col = Math.max(0, pos.column - (prefix ? prefix.length : 0));
        const line = session.getLine(pos.row).slice(0, col);

        // import m
        let m = line.match(/^\s*import\s+([a-zA-Z_]\w*)?$/);
        if (m) return { kind: "import", modulePrefix: m[1] || "" };

        // from m
        m = line.match(/^\s*from\s+([a-zA-Z_]\w*)?$/);
        if (m) return { kind: "from", modulePrefix: m[1] || "" };

        // Supports deeper prefixes too: "from a.b." -> module="a.b"
        m = line.match(/^\s*from\s+([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\.(?:([a-zA-Z_]\w*)?)$/);
        if (m) return { kind: "from_path", module: m[1], namePrefix: m[2] || "" };

        // from pkg import name
        m = line.match(/^\s*from\s+([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\s+import\s+([a-zA-Z_]\w*)?$/);
        if (m) return { kind: "from_import", module: m[1], namePrefix: m[2] || "" };

        return null;
    },

    mergeTypeTrees: function (base, overlay) {
        const out = structuredClone
            ? structuredClone(base || {})
            : JSON.parse(JSON.stringify(base || {}));

        const keyOf = (it) => {
            const v = (it && (it.id || it.value || it.caption)) || "";
            return this.canonicalValue(v);
        };

        for (const typeName of Object.keys(overlay || {})) {

            // si le type n'existe pas dans base → on prend overlay tel quel
            if (!out[typeName]) {
                out[typeName] = overlay[typeName];
                continue;
            }

            const baseArr = out[typeName];        // constantes
            const overlayArr = overlay[typeName]; // typeTree

            // si ce ne sont pas deux tableaux, on garde le comportement simple
            if (!Array.isArray(baseArr) || !Array.isArray(overlayArr)) {
                out[typeName] = overlayArr;
                continue;
            }

            // index par clé canonique
            const byKey = new Map();

            // 1) base (constantes)
            for (const it of baseArr) {
                byKey.set(keyOf(it), it);
            }

            // 2) overlay (typeTree) — priorité sur les champs
            for (const it of overlayArr) {
                const k = keyOf(it);
                const prev = byKey.get(k);
                if (!prev) {
                    byKey.set(k, it);
                } else {
                    byKey.set(k, {
                        ...prev,
                        ...it,
                        content: it.content ?? prev.content
                    });
                }
            }

            // reconstruction ordonnée :
            // d'abord overlay (typeTree), puis base (constantes)
            const ordered = [];
            const seen = new Set();

            for (const it of overlayArr) {
                const k = keyOf(it);
                if (seen.has(k)) continue;
                ordered.push(byKey.get(k));
                seen.add(k);
            }

            for (const it of baseArr) {
                const k = keyOf(it);
                if (seen.has(k)) continue;
                ordered.push(byKey.get(k));
                seen.add(k);
            }

            out[typeName] = ordered;
        }

        return out;
    },


    mergeTrees: function (base, overlay) {
        const out = structuredClone ? structuredClone(base || {}) : JSON.parse(JSON.stringify(base || {}));

        for (const mod of Object.keys(overlay || {})) {
            if (!out[mod]) { out[mod] = overlay[mod]; continue; }

            const keyOf = (it) => it.id || it.value; // ✅ important
            const byKey = new Map(out[mod].map(it => [keyOf(it), it]));

            for (const it of overlay[mod]) {
                const k = keyOf(it);
                const prev = byKey.get(k);
                if (!prev) { byKey.set(k, it); continue; }
                byKey.set(k, { ...prev, ...it, content: it.content ?? prev.content });
            }
            out[mod] = Array.from(byKey.values());
        }
        return out;
    },

    buildTypeTree(tree, overlay = null) {

        // childType -> [parentType, ...]
        const parents = Object.create(null);

        // --- Helpers --------------------------------------------------------------

        const normKey = (item) => {
            // Prefer "value" (your tree uses value), fallback to caption
            const v = (item && (item.value || item.caption)) || "";
            return this.canonicalValue(v);
        };

        const pushUnique = (dst, src) => {
            if (!Array.isArray(src) || src.length === 0) return;
            if (!Array.isArray(dst)) dst = [];
            const seen = new Set(dst.map(normKey));
            for (const it of src) {
                const k = normKey(it);
                if (!k) continue;
                if (!seen.has(k)) {
                    dst.push(it);
                    seen.add(k);
                }
            }
            return dst;
        };

        // --- Walk tree and build typeTree + parents ------------------------------

        const walk = (items) => {
            for (const it of (items || [])) {
                if (!it) continue;

                // 1) Collect inheritance relations
                // You may have:
                // - kind:"class" + value:"SHT35" + extends:"SHT3X"
                // - constructor with returns:"SHT35" + extends:"SHT3X"
                // - legacy it.class
                if (it.extends) {
                    const extList = Array.isArray(it.extends) ? it.extends : [it.extends];
                    const child = it.returns || (it.kind === "class" ? it.value : null);
                    if (child) parents[child] = extList;
                }

                // 2) Register members into this.typeTree for the corresponding type
                const t = it.returns || it.class || (it.kind === "class" ? it.value : null);

                if (t && Array.isArray(it.content)) {
                    if (!this.typeTree[t]) this.typeTree[t] = [];
                    this.typeTree[t] = pushUnique(this.typeTree[t], it.content) || this.typeTree[t];
                }

                // 3) Recurse
                if (Array.isArray(it.content)) walk(it.content);
            }
        };

        // tree can be either:
        // - { moduleName: [ ...items ] }
        // - [ ...items ]
        if (Array.isArray(tree)) {
            walk(tree);
        } else {
            for (const mod of Object.keys(tree || {})) {
                walk(tree[mod]);
            }
        }

        // --- Apply overlay first (so inheritance merges see final members) --------
        const finalTypeTree = overlay ? this.mergeTypeTrees(this.typeTree, overlay) : this.typeTree;

        // --- Resolve inheritance: child gets members from parent(s) ---------------

        const mergeFromParent = (child, stack = new Set()) => {
            if (stack.has(child)) return; // avoid cycles
            stack.add(child);

            const ps = parents[child] || [];
            for (const p of ps) {
                if (!p) continue;
                // Ensure parent resolved first (deep inheritance)
                mergeFromParent(p, stack);
                if (!finalTypeTree[p]) continue;
                if (!finalTypeTree[child]) finalTypeTree[child] = [];
                finalTypeTree[child] = pushUnique(finalTypeTree[child], finalTypeTree[p]) || finalTypeTree[child];
            }
            stack.delete(child);
        };

        for (const child of Object.keys(parents)) {
            mergeFromParent(child);
        }

        return finalTypeTree;
    },

    getImportedNamesSet(code) {
        const imports = this.buildImportTable(code);
        const s = new Set();
        for (const alias of imports.nameToFullPath.keys()) s.add(alias);
        for (const mod of imports.starModules) {
            const top = this.tree && this.tree[mod];
            if (!top) continue;
            for (const it of top) {
                if (it && it.meta === "decorator") continue;
                if (it && it.value && !it.value.startsWith("__")) s.add(it.value);
            }
        }
        return s;
    },

    findItemByPath(pathParts) {
        if (!Array.isArray(pathParts) || pathParts.length < 2) return null;

        let items = this.tree?.[pathParts[0]];
        if (!Array.isArray(items)) return null;

        for (let i = 1; i < pathParts.length - 1; i++) {
            const seg = pathParts[i];
            const node = items.find(it => this.canonicalValue(it?.value) === this.canonicalValue(seg));
            if (!node || !Array.isArray(node.content)) return null;
            items = node.content;
        }

        const leaf = pathParts[pathParts.length - 1];
        const matches = items.filter(it => this.canonicalValue(it?.value) === this.canonicalValue(leaf));
        if (!matches.length) return null;

        // si overload, privilégie celui qui a returns (sinon le premier)
        return matches.find(it => it && (it.returns || it.class)) || matches[0];
    },

    getIncludedHeadersSet(code) {
        const s = new Set();

        // Implicitement disponible (comme dans les .ino)
        s.add("builtins");
        s.add("Arduino.h");
        s.add("HardwareSerial.h");

        // Parse #include <X> / "X"
        for (const line of String(code || "").split(/\r?\n/)) {
            const m = line.match(/^\s*#\s*include\s*[<"]([^>"]+)[>"]/);
            if (m && m[1]) s.add(m[1].trim());
        }
        return s;
    },

    extractPipeListFromCcppRules(varName, toRemoveRe = null) {
        const CppRules = ace.require("ace/mode/c_cpp_highlight_rules").c_cppHighlightRules;
        const src = String(CppRules);

        // capture: var <name> = ( "..." + "..." );
        const reBlock = new RegExp(
            String.raw`var\s+${varName}\s*=\s*\(\s*([\s\S]*?)\s*\)\s*;`
        );

        const m = src.match(reBlock);
        if (!m) return [];

        const block = m[1];

        // récupère toutes les chaînes "..." concaténées
        const parts = Array.from(block.matchAll(/"([^"]*)"/g)).map(x => x[1]);
        let pipe = parts.join(""); // ex: "NULL|true|false|..."
        if (toRemoveRe) pipe = pipe.replace(toRemoveRe, "");

        return pipe.split("|").filter(Boolean);
    },

    makeCcppModeCompleter() {

        const lists = [
            { meta: "keyword", values: this.extractPipeListFromCcppRules("keywordControls", /(try|catch|throw|_Pragma)/g) },
            { meta: "type", values: this.extractPipeListFromCcppRules("storageType", /(_Complex|_Bool|_Imaginary)/g) },
            { meta: "modifier", values: this.extractPipeListFromCcppRules("storageModifiers", /(thread_local|export|noexcept|register|restrict)/g) },
            { meta: "operator", values: this.extractPipeListFromCcppRules("keywordOperators", /(dynamic_cast|typeid)/) },
            { meta: "constant", values: this.extractPipeListFromCcppRules("builtinConstants", /(TRUE|FALSE)/g) },
        ];

        // aplatit + dédoublonne
        const seen = new Set();
        const all = [];
        for (const { meta, values } of lists) {
            for (const v of values) {
                if (seen.has(v)) continue;
                seen.add(v);
                all.push({ value: v, meta });
            }
        }

        return {
            getCompletions(editor, session, pos, prefix, callback) {
                if (!prefix) return callback(null, []);
                const p = prefix.toLowerCase();
                const out = [];

                for (const it of all) {
                    if (it.value.toLowerCase().startsWith(p)) {
                        out.push({
                            caption: it.value,
                            value: it.value,
                            meta: it.meta,
                            score: 1450
                        });
                    }
                }
                callback(null, out);
            }
        };
    }

}