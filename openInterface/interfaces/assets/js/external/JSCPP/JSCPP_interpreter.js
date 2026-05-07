export const JSCPP_INTERPRETER = {
    'launcher': function (require, module, exports) {
        (function (process) {
            (function () {
                "use strict";
                Object.defineProperty(exports, "__esModule", { value: true });
                const rt_module = require("./rt");
                const interpreter_module = require("./interpreter");
                const ast_module = require("./ast");
                const preprocessor = require("./preprocessor");
                const debugger_module = require("./debugger");
                const PEGUtil = require("pegjs-util");
                const cstandard_modules = {
                    cctype: require("./includes/cctype"),
                    climits: require("./includes/climits"),
                    cstring: require("./includes/cstring"),
                    cmath: require("./includes/cmath"),
                    cstdio: require("./includes/cstdio"),
                    cstdlib: require("./includes/cstdlib"),
                    ctime: require("./includes/ctime"),
                    iostream: require("./includes/iostream"),
                    iomanip: require("./includes/iomanip"),
                    foo: require("./includes/dummy_class_foo")
                };
                async function run(code, input, config) {
                    if (!code) return;
                    const _config = prepareRun(input, config);
                    const rt = new rt_module.CRuntime(_config);
                    Simulator.rt = rt;
                    try {
                        for (const lib in rt.config.cstandard) {
                            rt.include(lib);
                        }
                        for (const lib of rt.config.default_includes) {
                            rt.include(lib);
                        }
                        code = code.toString();
                        const parsedCode = preprocessor.parse(rt, code);
                        const ast = await parseToAst(rt, parsedCode);
                        await runDef(rt, ast, parsedCode);
                        const main = rt.getFunc("global", "main", [])(rt, {});
                        if (_config.debug) {
                            const mydebugger = new debugger_module.default(parsedCode, code);
                            mydebugger.start(rt, main);
                            return mydebugger;
                        } else {
                            await runMain(rt, main);
                        }
                    } catch (e) {
                        if (!/Simulator stopped./.test(String(e))) {
                            Simulator.handleError(e);
                        }
                    }
                }
                function prepareRun(input, config) {
                    let inputbuffer = input.toString();
                    const _config = {
                        stdio: {
                            drain() {
                                const x = inputbuffer;
                                inputbuffer = null;
                                return x;
                            },
                            write(s) {
                                process.stdout.write(s);
                            }
                        },
                        includes: cstandard_modules,
                        default_includes: [],
                        overflow: 'error',
                        warn_callback: (warning) => console.warn(warning),
                        cstandard: {
                            "cctype": "ctype.h",
                            "climits": "limits.h",
                            "cstring": "string.h",
                            "cmath": "math.h",
                            "cstdio": "stdio.h",
                            "cstdlib": "stdlib.h",
                            "ctime": "time.h"
                        }
                    };
                    rt_module.mergeConfig(_config, config);
                    return _config;
                };
                async function parseToAst(rt, code) {
                    const result = PEGUtil.parse(ast_module, code);
                    if (result.error != null) {
                        result.type = rt.config.error_types['PARSING'];
                        throw new Error(`Line ${result.error.line}: Parsing error`, {
                            cause: result
                        });
                    }
                    return result.ast;
                };
                async function runDef(rt, ast, code) {
                    const interpreter = new interpreter_module.Interpreter(rt);
                    const defGen = interpreter.run(ast, code);
                    while (true) {
                        const step = defGen.next();
                        await Simulator.doStep(step, rt, true);
                        if (step.done) {
                            break;
                        }
                    }
                };
                async function runMain(rt, main) {
                    const startTime = Date.now();
                    while (true) {
                        const step = main.next();
                        if (step.value && step.value.type === rt.SUSPEND_TOKEN) {
                            await step.value.promise;
                            continue;
                        }
                        await Simulator.doStep(step, rt);
                        if (step.done) {
                            break;
                        }
                        if (rt.config.maxTimeout && ((Date.now() - startTime) > rt.config.maxTimeout)) {
                            throw new Error("Time limit exceeded.");
                        }
                    }
                };
                exports.default = {
                    run,
                };

            }).call(this)
        }).call(this, require('_process'))
    },
    'rt': function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.CRuntime = exports.mergeConfig = void 0;
        const defaults = require("./defaults");
        function mergeConfig(a, b) {
            for (const o in b) {
                if (b.hasOwnProperty(o)) {
                    if (o in a && (typeof b[o] === "object")) {
                        mergeConfig(a[o], b[o]);
                    } else {
                        a[o] = b[o];
                    }
                }
            }
        };
        exports.mergeConfig = mergeConfig;
        class CRuntime {
            constructor(config) {
                this.makeOperatorFuncName = (name) => `o(${name})`;
                this.config = defaults.getDefaultConfig();
                mergeConfig(this.config, config);
                this.numericTypeOrder = defaults.numericTypeOrder;
                this.types = defaults.getDefaultTypes();
                this.intTypeLiteral = this.primitiveType("int");
                this.unsignedintTypeLiteral = this.primitiveType("unsigned int");
                this.longTypeLiteral = this.primitiveType("long");
                this.unsignedlongTypeLiteral = this.primitiveType("unsigned long");
                this.unsignedlonglongTypeLiteral = this.primitiveType("unsigned long long");
                this.floatTypeLiteral = this.primitiveType("float");
                this.doubleTypeLiteral = this.primitiveType("double");
                this.charTypeLiteral = this.primitiveType("char");
                this.unsignedcharTypeLiteral = this.primitiveType("unsigned char");
                this.unsignedshortTypeLiteral = this.primitiveType("unsigned short");
                this.boolTypeLiteral = this.primitiveType("bool");
                this.voidTypeLiteral = this.primitiveType("void");
                this.nullPointerValue = this.makeNormalPointerValue(null);
                this.voidPointerType = this.normalPointerType(this.voidTypeLiteral);
                this.nullPointer = this.val(this.voidPointerType, this.nullPointerValue);
                this.sizeTypeLiteral = this.unsignedintTypeLiteral;
                this.scope = [{ "$name": "global", variables: {} }];
                this.typedefs = {};
                this.SUSPEND_TOKEN = Symbol('JSCPP_SUSPEND');
                this.suspension = {
                    meta: new WeakMap()
                };
            }
            include(name) {
                const { includes, cstandard, error_types } = this.config;
                if (this.config.loadedLibraries.includes(name) || this.config.loadedLibraries.includes(cstandard[name])) {
                    return;
                }
                if (name in includes) {
                    try {
                        includes[name].load(this);
                    } catch (e) {
                        console.error(e)
                        const cause = {
                            name: name,
                            e: e,
                            type: error_types['LOADING_LIB']
                        }
                        if (this.interp) {
                            cause.node = this.interp.currentNode
                        }
                        this.raiseException('Loading error: ' + name, cause);
                    }
                    if (name in cstandard) name = cstandard[name];
                    this.config.loadedLibraries.push(name);
                } else {
                    const cause = {
                        type: error_types['UNKNOWN_LIB'],
                        name: name
                    }
                    if (this.interp) {
                        cause.node = this.interp.currentNode
                    }
                    this.raiseException("cannot find library: " + name, cause);
                }
            };
            getSize(element) {
                let ret = 0;
                if (this.isArrayType(element) && (element.v.position === 0)) {
                    let i = 0;
                    while (i < element.v.target.length) {
                        ret += this.getSize(element.v.target[i]);
                        i++;
                    }
                } else {
                    ret += this.getSizeByType(element.t);
                }
                return ret;
            };
            getSizeByType(t) {
                if (this.isPointerType(t)) {
                    return this.config.limits["pointer"].bytes;
                } else if (this.isPrimitiveType(t)) {
                    return this.config.limits[t.name].bytes;
                } else {
                    this.raiseException("not implemented");
                }
            };
            getMember(l, r) {
                const lt = l.t;
                if (this.isClassType(l)) {
                    const ltsig = this.getTypeSignature(lt);
                    if (this.types.hasOwnProperty(ltsig)) {
                        const t = this.types[ltsig].handlers;
                        if (t.hasOwnProperty(r)) {
                            return {
                                t: {
                                    type: "function",
                                },
                                v: {
                                    defineType: lt,
                                    name: r,
                                    bindThis: l
                                }
                            };
                        } else {
                            const lv = l.v;
                            if (lv.members.hasOwnProperty(r)) {
                                return lv.members[r];
                            }
                        }
                    } else {
                        this.raiseException("type " + this.makeTypeString(lt) + " is unknown");
                    }
                } else {
                    this.raiseException("only a class can have members");
                }
            };
            defFunc(lt, name, retType, argTypes, argNames, stmts, interp, optionalArgs) {
                if (stmts != null) {
                    const f = function* (rt, _this, ...args) {
                        rt.enterScope("function " + name);
                        argNames.forEach(function (argName, i) {
                            rt.defVar(argName, argTypes[i], args[i]);
                        });
                        for (let i = 0, end = optionalArgs.length; i < end; i++) {
                            const optionalArg = optionalArgs[i];
                            if (args[argNames.length + i] != null) {
                                rt.defVar(optionalArg.name, optionalArg.type, args[argNames.length + i]);
                            } else {
                                const argValue = yield* interp.visit(interp, optionalArg.expression);
                                rt.defVar(optionalArg.name, optionalArg.type, rt.cast(optionalArg.type, argValue));
                            }
                        }
                        let ret = yield* interp.run(stmts, interp.source, { scope: "function" });
                        if (!rt.isTypeEqualTo(retType, rt.voidTypeLiteral)) {
                            if (ret instanceof Array && (ret[0] === "return")) {
                                ret = rt.cast(retType, ret[1]);
                            } else {
                                rt.raiseException("you must return a value");
                            }
                        } else {
                            if (Array.isArray(ret)) {
                                if ((ret[0] === "return") && ret[1]) {
                                    rt.raiseException("you cannot return a value from a void function");
                                }
                            }
                            ret = undefined;
                        }
                        rt.exitScope("function " + name);
                        return ret;
                    };
                    this.regFunc(f, lt, name, argTypes, retType, optionalArgs);
                } else {
                    this.regFuncPrototype(lt, name, argTypes, retType, optionalArgs);
                }
            };
            makeParametersSignature(args) {
                const ret = new Array(args.length);
                let i = 0;
                while (i < args.length) {
                    const arg = args[i];
                    ret[i] = this.getTypeSignature(arg);
                    i++;
                }
                return ret.join(",");
            };
            getCompatibleFunc(lt, name, args) {
                //console.log("Current function: " + name) // Please don't remove this comment.
                let ret;
                const ltsig = this.getTypeSignature(lt);
                if (ltsig in this.types) {
                    const t = this.types[ltsig].handlers;
                    if (name in t) {
                        const inputs = args.map(v => v.t);
                        const sig = this.makeParametersSignature(inputs);
                        if (sig in t[name].functions) {
                            ret = t[name].functions[sig];
                        }
                        // // VITTA WARNING: set String and char* compatible
                        // else if (sig.replace(/{!\(char\)}/g, '(String)') in t[name].functions) {
                        //     console.log('Set {(char)} and (String) compatible.')
                        //     ret = t[name].functions[sig.replace(/{!\(char\)}/g, '(String)')];
                        //     // END of VITTA WARNING
                        // } 
                        else {
                            const compatibles = [];
                            const reg = t[name].reg;
                            Object.keys(reg).forEach(signature => {
                                const defs = reg[signature].args;
                                const hasKeyType = (defs[defs.length - 1] === "?") && (defs.length - 1 <= inputs.length)
                                const providedTypes = hasKeyType ? inputs.slice(0, defs.length - 1) : inputs;
                                const expectedTypes = hasKeyType ? defs.slice(0, -1) : defs;
                                const optionalLength = reg[signature].optionalArgs.length;
                                let ok = true;
                                if ((providedTypes.length - optionalLength) > expectedTypes.length) {
                                    ok = false;
                                    console.warn("Too many arguments in function " + name)
                                    return;
                                }
                                for (let i = 0; i < expectedTypes.length; i++) {
                                    const isOptional = i >= (expectedTypes.length - optionalLength);
                                    if (!providedTypes[i]) {
                                        if (!isOptional) {
                                            ok = false;
                                            console.warn(`Argument obligatoire manquant à l'indice ${i} (attendu: ${this.makeTypeString(expectedTypes[i])})`);
                                            break;
                                        }
                                        continue;
                                    }
                                    if (!this.castable(providedTypes[i], expectedTypes[i])) {
                                        ok = false;
                                        console.warn(`Argument invalide à l'indice ${i} : reçu ${this.makeTypeString(providedTypes[i])}, attendu ${this.makeTypeString(expectedTypes[i])}`);
                                        break;
                                    }
                                }
                                if (ok) {
                                    compatibles.push(t[name].functions[this.makeParametersSignature(reg[signature].args)]);
                                }
                            });
                            if (compatibles.length === 0) {
                                if ("#default" in t[name]) {
                                    ret = t[name].functions["#default"];
                                } else {
                                    const getFuncTypeSignature = (types) => {
                                        return "(" + (types.length ? types.map(v => this.makeTypeString(v)).join(", ") : "void") + ")";
                                    };
                                    const providedArgsStr = getFuncTypeSignature(inputs);
                                    let expectedArgsStr = "expected:</br>";
                                    Object.keys(reg).forEach(signature => {
                                        if (expectedArgsStr !== "expected:</br>") expectedArgsStr += " or ";
                                        expectedArgsStr += "<b>" + getFuncTypeSignature(reg[signature].args) + "</b>";
                                    });
                                    this.raiseException("no method <b>" + name + "</b> in " + this.makeTypeString(lt) + " accepts <b>" + providedArgsStr + "</b> " + expectedArgsStr);
                                }
                            } else if (compatibles.length > 1) {
                                this.raiseException("ambiguous method invoking, " + compatibles.length + " compatible methods");
                            } else {
                                ret = compatibles[0];
                            }
                        }
                    } else {
                        this.raiseException("method " + name + " is not defined in " + this.makeTypeString(lt));
                    }
                } else {
                    this.raiseException("type " + this.makeTypeString(lt) + " is unknown");
                }
                if ((ret == null)) {
                    this.raiseException("method " + name + " does not seem to be implemented");
                }
                return ret;
            };
            matchVarArg(methods, sig) {
                for (let _sig in methods) {
                    if (_sig[_sig.length - 1] === "?") {
                        _sig = _sig.slice(0, -1);
                        if (sig.startsWith(_sig)) {
                            return methods.functions[_sig];
                        }
                    }
                }
                return null;
            };
            getFunc(lt, name, args) {
                if (lt !== "global" && (this.isPointerType(lt) || this.isFunctionType(lt) || this.isClassType(lt))) {
                    let f;
                    if (this.isArrayType(lt)) {
                        f = "pointer_array";
                    } else if (this.isFunctionType(lt)) {
                        f = "function";
                    } else if (this.isClassType(lt)) {
                        f = "class";
                    } else {
                        f = "pointer_normal";
                    }
                    let t = null;
                    if (name in this.types[f].handlers) {
                        t = this.types[f].handlers;
                    } else if (name in this.types["pointer"].handlers) {
                        t = this.types["pointer"].handlers;
                    }
                    if (t) {
                        const sig = this.makeParametersSignature(args);
                        let method;
                        if (t[name].functions != null && sig in t[name].functions) {
                            return t[name].functions[sig];
                        } else if ((method = this.matchVarArg(t[name], sig)) !== null) {
                            return method;
                        } else if (t[name].default) {
                            return t[name].default;
                        } else {
                            this.raiseException("no method " + name + " in " + this.makeTypeString(lt) + " accepts (" + sig + ")");
                        }
                    }
                }
                const ltsig = this.getTypeSignature(lt);
                if (ltsig in this.types) {
                    const t = this.types[ltsig].handlers;
                    if (name in t) {
                        const sig = this.makeParametersSignature(args);
                        let method;
                        if (t[name].functions != null && sig in t[name].functions) {
                            return t[name].functions[sig];
                        } else if ((method = this.matchVarArg(t[name], sig)) !== null) {
                            return method;
                        } else if (t[name].default) {
                            return t[name].default;
                        } else {
                            this.raiseException("no method " + name + " in " + this.makeTypeString(lt) + " accepts (" + sig + ")");
                        }
                    } else {
                        this.raiseException("method " + name + " is not defined in " + this.makeTypeString(lt));
                    }
                } else {
                    if (lt !== "global" && this.isPointerType(lt)) {
                        this.raiseException("this pointer has no proper method overload");
                    } else {
                        this.raiseException("type " + this.makeTypeString(lt) + " is not defined");
                    }
                }
            };
            regOperator(f, lt, name, args, retType) {
                return this.regFunc(f, lt, this.makeOperatorFuncName(name), args, retType);
            };
            regFuncPrototype(lt, name, args, retType, optionalArgs) {
                const ltsig = this.getTypeSignature(lt);
                if (ltsig in this.types) {
                    const t = this.types[ltsig].handlers;
                    if (!(name in t)) {
                        t[name] = {
                            functions: {},
                            reg: {},
                        };
                    }
                    if (!("reg" in t[name])) {
                        t[name]["reg"] = {};
                    }
                    const sig = this.makeParametersSignature(args);
                    if (sig in t[name]) {
                        this.raiseException("method " + name + " with parameters (" + sig + ") is already defined");
                    }
                    const type = this.functionType(retType, args);
                    if (lt === "global") {
                        this.defVar(name, type, this.val(type, {
                            bindThis: null,
                            defineType: lt,
                            name,
                            target: null
                        }));
                    }
                    t[name].functions[sig] = null;
                    if (t[name].reg[sig] == null) {
                        t[name].reg[sig] = {
                            args,
                            optionalArgs
                        };
                    }
                } else {
                    this.raiseException("type " + this.makeTypeString(lt) + " is unknown");
                }
            };
            regFunc(f, lt, name, args, retType, optionalArgs) {
                const ltsig = this.getTypeSignature(lt);
                if (ltsig in this.types) {
                    if (!optionalArgs) {
                        optionalArgs = [];
                    }
                    const t = this.types[ltsig].handlers;
                    if (!(name in t)) {
                        t[name] = {
                            functions: {},
                            reg: {},
                        };
                    }
                    if (t[name].functions == null) {
                        t[name].functions = {};
                    }
                    if (t[name].reg == null) {
                        t[name].reg = {};
                    }
                    const sig = this.makeParametersSignature(args);
                    if (t[name].functions[sig] != null && t[name].reg[sig] != null) {
                        this.raiseException("method " + name + " with parameters (" + sig + ") is already defined");
                    }
                    const type = this.functionType(retType, args);
                    if (lt === "global") {
                        if (this.varAlreadyDefined(name)) {
                            const func = this.scope[0].variables[name];
                            if (this.isFunctionType(func)) {
                                const v = func.v;
                                if (v.target !== null) {
                                    this.raiseException("global method " + name + " with parameters (" + sig + ") is already defined");
                                } else {
                                    v.target = f;
                                }
                            } else {
                                this.raiseException(name + " is already defined as " + this.makeTypeString(func.t));
                            }
                        } else {
                            this.defVar(name, type, this.val(type, {
                                bindThis: null,
                                defineType: lt,
                                name,
                                target: f
                            }));
                        }
                    }
                    t[name].functions[sig] = f;
                    t[name].reg[sig] = {
                        args,
                        optionalArgs
                    };
                } else {
                    this.raiseException("type " + this.makeTypeString(lt) + " is unknown");
                }
            };
            registerTypedef(basttype, name) {
                return this.typedefs[name] = basttype;
            };
            promoteNumeric(l, r) {
                if (this.isNumericType(l) && this.isNumericType(r)) {
                    if (this.isTypeEqualTo(l, r)) {
                        if (this.isTypeEqualTo(l, this.boolTypeLiteral)) {
                            return this.intTypeLiteral;
                        }
                        if (this.isTypeEqualTo(l, this.charTypeLiteral)) {
                            return this.intTypeLiteral;
                        }
                        if (this.isTypeEqualTo(l, this.unsignedcharTypeLiteral)) {
                            return this.unsignedintTypeLiteral;
                        }
                        return l;
                    } else if (this.isIntegerType(l) && this.isIntegerType(r)) {
                        let rett;
                        const slt = this.getSignedType(l);
                        const srt = this.getSignedType(r);
                        if (this.isTypeEqualTo(slt, srt)) {
                            rett = slt;
                        } else {
                            const slti = this.numericTypeOrder.indexOf(slt.name);
                            const srti = this.numericTypeOrder.indexOf(srt.name);
                            if (slti <= srti) {
                                if (this.isUnsignedType(l) && this.isUnsignedType(r)) {
                                    rett = r;
                                } else {
                                    rett = srt;
                                }
                            } else {
                                if (this.isUnsignedType(l) && this.isUnsignedType(r)) {
                                    rett = l;
                                } else {
                                    rett = slt;
                                }
                            }
                        }
                        return rett;
                    } else if (!this.isIntegerType(l) && this.isIntegerType(r)) {
                        return l;
                    } else if (this.isIntegerType(l) && !this.isIntegerType(r)) {
                        return r;
                    } else if (!this.isIntegerType(l) && !this.isIntegerType(r)) {
                        return this.primitiveType("double");
                    }
                } else {
                    this.raiseException("you cannot promote (to) a non numeric type");
                }
            };
            readVar(varname) {
                let i = this.scope.length - 1;
                while (i >= 0) {
                    const vc = this.scope[i];
                    if (vc.variables[varname] != null) {
                        const ret = vc.variables[varname];
                        return ret;
                    }
                    i--;
                }
                this.raiseException("'" + varname + "' was not declared in this scope");
            };
            varAlreadyDefined(varname) {
                const vc = this.scope[this.scope.length - 1];
                return varname in vc;
            };
            defVar(varname, type, initval) {
                if (varname == null) {
                    this.raiseException("cannot define a variable without name");
                }
                if (this.varAlreadyDefined(varname)) {
                    this.raiseException("variable " + varname + " already defined");
                }
                const vc = this.scope[this.scope.length - 1];
                initval = this.clone(this.cast(type, initval), true);
                if (initval === undefined) {
                    vc.variables[varname] = this.defaultValue(type);
                    vc.variables[varname].left = true;
                } else {
                    vc.variables[varname] = initval;
                    vc.variables[varname].left = true;
                }
            };
            booleanToNumber(b) {
                if (typeof (b) === "boolean") {
                    return b ? 1 : 0;
                }
                return b;
            };
            inrange(type, value, errorMsg) {
                if (this.isPrimitiveType(type)) {
                    value = this.booleanToNumber(value);
                    const limit = this.config.limits[type.name];
                    const overflow = !((value <= limit.max) && (value >= limit.min));
                    if (errorMsg && overflow) {
                        if (this.config.overflow === "error") {
                            this.raiseException(errorMsg);
                            return false;
                        } else if (this.config.overflow === "warn") {
                            this.config.warn_callback(errorMsg);
                        }
                        return true;
                    }
                    return !overflow;
                } else {
                    return true;
                }
            };
            ensureUnsigned = function (type, value) {
                value = this.booleanToNumber(value);
                if (!this.isUnsignedType(type)) return value;

                const lim = this.config.limits[type.name];
                const min = lim.min, max = lim.max;
                const period = (max - min + 1);
                if (period <= 0) throw new Error("Bad unsigned limits for " + type.name);

                if (min === 0) {
                    if (max === 0xFF) return (value & 0xFF) >>> 0;        // 8 bits
                    if (max === 0xFFFF) return (value & 0xFFFF) >>> 0;      // 16 bits
                    if (max === 0xFFFFFFFF) return (value >>> 0);               // 32 bits
                }
                const mod = ((value - min) % period + period) % period;
                return mod + min;
            };
            isNumericType(type) {
                if (typeof type === "string") {
                    return this.isFloatType(type) || this.isIntegerType(type);
                }
                if (type && 't' in type) {
                    return type.t !== "dummy" && this.isNumericType(type.t);
                }
                return this.isFloatType(type) || this.isIntegerType(type);
            };
            isUnsignedType(type) {
                if (typeof type === "string") {
                    switch (type) {
                        case "unsigned char":
                        case "unsigned short":
                        case "unsigned short int":
                        case "unsigned":
                        case "unsigned int":
                        case "unsigned long":
                        case "unsigned long int":
                        case "unsigned long long":
                        case "unsigned long long int":
                            return true;
                        default:
                            return false;
                    }
                } else {
                    return (type.type === "primitive") && this.isUnsignedType(type.name);
                }
            };
            getSignedType(type) {
                if (type.type === "primitive") {
                    return this.primitiveType(type.name.replace("unsigned", "").trim());
                } else {
                    this.raiseException("Cannot get signed type from non-primitive type " + this.makeTypeString(type));
                }
            };
            castable(inputType, definedType) {
                if (inputType === "dummy" || definedType === "dummy") {
                    this.raiseException("Unexpected dummy");
                    return;
                }
                if (this.isTypeEqualTo(inputType, definedType)) {
                    return true;
                }
                if (this.isPrimitiveType(inputType) && this.isPrimitiveType(definedType)) {
                    return this.isNumericType(definedType) && this.isNumericType(inputType);
                } else if (this.isPointerType(inputType) && this.isPointerType(definedType)) {
                    if (this.isFunctionType(inputType)) {
                        return this.isPointerType(definedType);
                    }
                    return !this.isFunctionType(definedType);
                } else if (this.isClassType(inputType) || this.isClassType(definedType)) {
                    // VITTA WARNING: set castable class and pointer class
                    if (this.config.loadedLibraries.includes("String.h")) {
                        if (this.isStringType(inputType) && this.isStringClass(definedType)) {
                            return true;
                        }
                    }
                    console.log(inputType)
                    console.log(definedType)
                    let name;
                    if (this.isClassType(inputType)) name = 'input:' + inputType.name;
                    if (this.isClassType(definedType)) name = 'definition:' + definedType.name;
                    this.raiseException(`[castable] not implemented for class types: '${name}'`);
                    // END of VITTA WARNING
                }
                return false;
            };
            cast(type, value) {
                let v;
                if (value.t !== "dummy") {
                } else {
                    this.raiseException(this.makeValString(value) + " is dummy");
                    return;
                }
                if (this.isTypeEqualTo(value.t, type)) {
                    return value;
                }
                if (this.isPrimitiveType(type) && this.isPrimitiveType(value.t)) {
                    if (type.name === "bool") {
                        return this.val(type, value.v ? 1 : 0);
                    } else if (["float", "double"].includes(type.name)) {
                        if (!this.isNumericType(value)) {
                            this.raiseException("cannot convert '" + this.makeTypeString(value.t) + "' to '" + this.makeTypeString(type) + "' in initialization");
                        } else if (this.inrange(type, value.v, "overflow when casting " + this.makeTypeString(value.t) + " to " + this.makeTypeString(type))) {
                            value.v = this.ensureUnsigned(type, value.v);
                            return this.val(type, value.v);
                        }
                    } else {
                        if (type.name.slice(0, 8) === "unsigned") {
                            if (!this.isNumericType(value)) {
                                this.raiseException("cannot convert '" + this.makeTypeString(value.t) + "' to '" + this.makeTypeString(type) + "' in initialization");
                            } else if (value.v < 0) {
                                const { bytes } = this.config.limits[type.name];
                                let newValue = this.booleanToNumber(value.v) & ((1 << (8 * bytes)) - 1);
                                if (this.inrange(type, newValue, `cannot cast negative value ${newValue} to ` + this.makeTypeString(type))) {
                                    newValue = this.ensureUnsigned(type, newValue);
                                    return this.val(type, newValue);
                                }
                            }
                        }
                        if (!this.isNumericType(value)) {
                            this.raiseException("cannot convert '" + this.makeTypeString(value.t) + "' to '" + this.makeTypeString(type) + "' in initialization");
                        } else if (this.isFloatType(value)) {
                            v = value.v > 0 ? Math.floor(this.booleanToNumber(value.v)) : Math.ceil(this.booleanToNumber(value.v));
                            if (this.inrange(type, v, "overflow when casting " + this.makeValString(value) + " to " + this.makeTypeString(type))) {
                                v = this.ensureUnsigned(type, v);
                                return this.val(type, v);
                            }
                        } else {
                            if (this.inrange(type, value.v, "overflow when casting " + this.makeValString(value) + " to " + this.makeTypeString(type))) {
                                value.v = this.ensureUnsigned(type, value.v);
                                return this.val(type, value.v);
                            }
                        }
                    }
                } else if (this.isPointerType(type)) {
                    if (this.isArrayType(value)) {
                        if (this.isNormalPointerType(type)) {
                            if (this.isTypeEqualTo(type.targetType, value.t.eleType)) {
                                return value;
                            } else {
                                this.raiseException(this.makeTypeString(type.targetType) + " is not equal to array element type " + this.makeTypeString(value.t.eleType));
                            }
                        } else if (this.isArrayType(type)) {
                            if (this.isTypeEqualTo(type.eleType, value.t.eleType)) {
                                return value;
                            } else {
                                this.raiseException("array element type " + this.makeTypeString(type.eleType) + " is not equal to array element type " + this.makeTypeString(value.t.eleType));
                            }
                        } else {
                            this.raiseException("cannot convert a function to a regular pointer");
                        }
                    } else {
                        if (this.isNormalPointerType(type)) {
                            if (this.isNormalPointerType(value)) {
                                if (this.isTypeEqualTo(type.targetType, value.t.targetType)) {
                                    return value;
                                } else {
                                    this.raiseException(this.makeTypeString(type.targetType) + " is not equal to " + this.makeTypeString(value.t.targetType));
                                }
                            } else {
                                this.raiseException("cannot convert '" + this.makeTypeString(value.t) + "' to '" + this.makeTypeString(type) + "' in initialization");
                            }
                        } else if (this.isArrayType(type)) {
                            if (this.isNormalPointerType(value)) {
                                if (this.isTypeEqualTo(type.eleType, value.t.targetType)) {
                                    return value;
                                } else {
                                    this.raiseException("array element type " + this.makeTypeString(type.eleType) + " is not equal to " + this.makeTypeString(value.t.targetType));
                                }
                            } else {
                                this.raiseException("cannot convert '" + this.makeTypeString(value.t) + "' to '" + this.makeTypeString(type) + "' in initialization");
                            }
                        } else if (this.isFunctionPointerType(type)) {
                            if (this.isFunctionPointerType(value.t)) {
                                if (!this.isTypeEqualTo(type, value.t)) {
                                    this.raiseException("Function pointers do not share the same signature");
                                }
                                return value;
                            } else {
                                this.raiseException("cannot convert a regular/array pointer to a function pointer");
                            }
                        } else {
                            this.raiseException("cannot convert a function to a regular pointer");
                        }
                    }
                } else if (this.isFunctionType(type)) {
                    if (this.isFunctionType(value.t)) {
                        return this.val(value.t, value.v);
                    } else {
                        this.raiseException("cannot convert a regular pointer to a function");
                    }
                } else if (this.isClassType(type)) {
                    // VITTA WARNING: cast of type String
                    if (type.name == 'String' && this.String_t) {
                        if (value && value.t && this.isStringType(value.t)) {
                            return this.String_makeValueFromArray(value);
                        }
                    }
                    if (type.name == value.t.name) {
                        return value;
                    }
                    console.log(type)
                    console.log(value)
                    this.raiseException("[cast] not implemented for class types");
                    // END of VITTA WARNING
                } else if (this.isClassType(value.t)) {
                    value = this.getCompatibleFunc(value.t, this.makeOperatorFuncName(type.name), [])(this, value);
                    return value;
                } else {
                    this.raiseException("cast failed from type " + this.makeTypeString(type) + " to " + this.makeTypeString(value.t));
                }
            };
            clone(v, isInitializing) {
                return this.val(v.t, v.v, false, isInitializing);
            };
            enterScope(scopename) {
                this.scope.push({ "$name": scopename, variables: {} });
            };
            exitScope(scopename) {
                while (true) {
                    const s = this.scope.pop();
                    if (!scopename || !(this.scope.length > 1) || (s["$name"] === scopename)) {
                        break;
                    }
                }
            };
            val(t, v, left = false, isInitializing = false) {
                if (this.isNumericType(t)) {
                    let checkRange = true;
                    if (isInitializing && (typeof (v) !== "number" || isNaN(v))) {
                        checkRange = false;
                    }
                    if (checkRange) {
                        this.inrange(t, v, `[Warning] overflow of value ${this.makeValString({ t, v })}`);
                        v = this.ensureUnsigned(t, v);
                    }
                }
                if (left === undefined) {
                    left = false;
                }
                return { t, v, left };
            };
            isTypeEqualTo(type1, type2) {
                if (type1 === "?" || type2 === "?") {
                    return type1 === type2;
                }
                if (type1 && type2 && type1.type === type2.type) {
                    switch (type1.type) {
                        case "primitive":
                            return type1.name === type2.name;
                        case "class":
                            return type1.name === type2.name;
                        case "pointer":
                            type2 = type2;
                            if ((type1.ptrType === type2.ptrType) || ((type1.ptrType !== "function") && (type2.ptrType !== "function"))) {
                                switch (type1.ptrType) {
                                    case "array":
                                        return this.isTypeEqualTo(type1.eleType, type2.eleType || type2.targetType);
                                    case "function":
                                        return this.isTypeEqualTo(type1.targetType, type2.targetType);
                                    case "normal":
                                        return this.isTypeEqualTo(type1.targetType, type2.eleType || type2.targetType);
                                }
                            }
                            break;
                        case "function":
                            if (this.isTypeEqualTo(type1.retType, type2.retType) && (type1.signature.length === type2.signature.length)) {
                                return type1.signature.every((type, index, arr) => {
                                    const x = this.isTypeEqualTo(type, type2.signature[index]);
                                    return x;
                                });
                            }
                            break;
                    }
                }
                return type1 === type2;
            };
            isPrimitiveType(type) {
                if (typeof type !== "string" && type && 't' in type) {
                    return type.t !== "dummy" && this.isPrimitiveType(type.t);
                }
                return this.isNumericType(type) || this.isBoolType(type) || this.isVoidType(type);
            };
            isBoolType(type) {
                if (type) {
                    if (typeof type === "string") {
                        return type === "bool";
                    } else {
                        return (type.type === "primitive") && this.isBoolType(type.name);
                    }
                }
            };
            isVoidType(type) {
                if (type) {
                    if (typeof type === "string") {
                        return type === "void";
                    } else {
                        return (type.type === "primitive") && this.isVoidType(type.name);
                    }
                }
            };
            isCharType(type) {
                return "name" in type && this.config.charTypes.indexOf(type.name) !== -1;
            };
            isIntegerType(type) {
                if (type) {
                    if (typeof type === "string") {
                        return this.config.charTypes.includes(type) || this.config.intTypes.includes(type);
                    } else if ('t' in type) {
                        return this.isIntegerType(type.t);
                    } else {
                        return (type.type === "primitive") && this.isIntegerType(type.name);
                    }
                }
            };
            isFloatType(type) {
                if (type) {
                    if (typeof type === "string") {
                        switch (type) {
                            case "float":
                            case "double":
                                return true;
                            default:
                                return false;
                        }
                    } else if ('t' in type) {
                        return this.isFloatType(type.t);
                    } else {
                        return (type.type === "primitive") && this.isFloatType(type.name);
                    }
                }
            };
            isArrayType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isArrayType(type.t);
                    }
                    return this.isPointerType(type) && (type.ptrType === "array");
                }
            };
            isArrayElementType(type) {
                if (type) {
                    return type.t !== "dummy" && "array" in type.t;
                }
            };
            isFunctionPointerType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isFunctionPointerType(type.t);
                    }
                    return this.isPointerType(type) && type.ptrType === "function";
                }
            };
            isFunctionType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isFunctionType(type.t);
                    }
                    return type.type === "function";
                }
            };
            isNormalPointerType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isNormalPointerType(type.t);
                    }
                    return this.isPointerType(type) && (type.ptrType === "normal");
                }
            };
            isPointerType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isPointerType(type.t);
                    }
                    return type.type === "pointer";
                }
            };
            isClassType(type) {
                if (type) {
                    if ('t' in type) {
                        return type.t !== "dummy" && this.isClassType(type.t);
                    }
                    return type.type === "class";
                }
            };
            arrayPointerType(eleType, size) {
                return {
                    type: "pointer",
                    ptrType: "array",
                    eleType,
                    size
                };
            };
            makeArrayPointerValue(arr, position) {
                return {
                    target: arr,
                    position
                };
            };
            functionPointerType(retType, signature) {
                return {
                    type: "pointer",
                    ptrType: "function",
                    targetType: this.functionType(retType, signature)
                };
            };
            functionType(retType, signature) {
                return {
                    type: "function",
                    retType,
                    signature
                };
            };
            makeFunctionPointerValue(f, name, lt, args, retType) {
                return {
                    target: f,
                    name,
                    defineType: lt,
                    args,
                    retType
                };
            };
            normalPointerType(targetType) {
                if (targetType.type === "function") {
                    return {
                        type: "pointer",
                        ptrType: "function",
                        targetType,
                    };
                }
                return {
                    type: "pointer",
                    ptrType: "normal",
                    targetType
                };
            };
            makeNormalPointerValue(target) {
                return {
                    target
                };
            };
            simpleType(type) {
                if (Array.isArray(type)) {
                    if (type.length > 1) {
                        const typeStr = type.filter(t => {
                            return !this.config.specifiers.includes(t);
                        }).join(" ");
                        return this.simpleType(typeStr);
                    } else {
                        return this.typedefs[type[0]] || this.simpleType(type[0]);
                    }
                } else {
                    if (this.isPrimitiveType(type)) {
                        return this.primitiveType(type);
                    } else {
                        const clsType = {
                            type: "class",
                            name: type
                        };
                        if (this.getTypeSignature(clsType) in this.types) {
                            return clsType;
                        } else {
                            this.raiseException("type " + type + " is not defined");
                        }
                    }
                }
            };
            newClass(classname, members, inheritances) {
                const clsType = {
                    type: "class",
                    name: classname
                };
                const sig = this.getTypeSignature(clsType);
                if (sig in this.types) {
                    this.raiseException(this.makeTypeString(clsType) + " is already defined");
                }
                const handlers = {};
                if (inheritances && inheritances.length > 0) {
                    for (const i of inheritances) {
                        const type = this.types[`[${i}]`];
                        if (type && type.handlers) {
                            Object.assign(handlers, type.handlers);
                        } else {
                            this.raiseException("class '" + i + "' is not defined for " + this.makeTypeString(clsType));
                        }
                    }
                }
                this.types[sig] = {
                    cConstructor(rt, _this) {
                        const v = _this.v;
                        v.members = {};
                        let i = 0;
                        while (i < members.length) {
                            const member = members[i];
                            v.members[member.name] = (member.initialize != null) ? member.initialize(rt, _this) : rt.defaultValue(member.type, true);
                            i++;
                        }
                    },
                    members,
                    handlers: handlers,
                    inheritances: inheritances
                };
                return clsType;
            };
            primitiveType(type) {
                return {
                    type: "primitive",
                    name: type,
                };
            };
            isStringType(type) {
                if ("t" in type) {
                    return this.isStringType(type.t);
                }
                return this.isArrayType(type) && this.isCharType(type.eleType);
            };
            charArray_getJSString(element) {
                if (this.isStringType(element.t)) {
                    const { target } = element.v;
                    let result = "";
                    let i = 0;
                    while (i < target.length) {
                        const charVal = target[i];
                        if (charVal.v === 0) {
                            break;
                        }
                        result += String.fromCharCode(charVal.v);
                        i++;
                    }
                    return result;
                } else {
                    this.raiseException("target is not a string");
                }
            };
            charArray_makeFromJSString(str, typename) {
                if (!typename) {
                    typename = "char";
                }
                const charType = this.primitiveType(typename);
                const type = this.arrayPointerType(charType, str.length + 1);
                const trailingZero = this.val(charType, 0);
                return {
                    t: type,
                    v: {
                        target: str.split("").map(c => this.val(charType, c.charCodeAt(0))).concat([trailingZero]),
                        position: 0,
                    }
                };
            };
            getTypeSignature(type) {
                if (!type) return "[" + type + "]";
                if (typeof (type) === "string") {
                    return type;
                }
                let ret;
                if (type.type === "primitive") {
                    ret = "(" + type.name + ")";
                } else if (type.type === "class") {
                    ret = "[" + type.name + "]";
                } else if (type.type === "pointer") {
                    ret = "{";
                    if (type.ptrType === "normal") {
                        ret += "!" + this.getTypeSignature(type.targetType);
                    } else if (type.ptrType === "array") {
                        ret += "!" + this.getTypeSignature(type.eleType);
                    } else if (type.ptrType === "function") {
                        ret += "@" + this.getTypeSignature(type.targetType);
                    }
                    ret += "}";
                } else if (type.type === "function") {
                    ret = "#" + this.getTypeSignature(type.retType) + "!" + type.signature.map(e => {
                        return this.getTypeSignature(e);
                    }).join(",");
                }
                return ret;
            };
            makeTypeString(type) {
                if (!type) return type;
                let ret;
                if (typeof (type) === "string") {
                    ret = "$" + type;
                } else if (type.type === "primitive") {
                    ret = type.name;
                } else if (type.type === "class") {
                    ret = type.name;
                } else if (type.type === "pointer") {
                    ret = "";
                    if (type.ptrType === "normal") {
                        ret += this.makeTypeString(type.targetType) + "*";
                    } else if (type.ptrType === "array") {
                        ret += this.makeTypeString(type.eleType) + `[${type.size}]`;
                    } else if (type.ptrType === "function") {
                        ret += this.makeTypeString(type.targetType.retType) + "(*f)" + "(" + type.targetType.signature.map(e => {
                            return this.makeTypeString(e);
                        }).join(",") + ")";
                    }
                }
                return ret;
            };
            makeValueString(l, options) {
                let display;
                if (!options) {
                    options = {};
                }
                if (this.isPrimitiveType(l)) {
                    if (this.isTypeEqualTo(l.t, this.charTypeLiteral)) {
                        display = "'" + String.fromCharCode(l.v) + "'";
                    } else if (this.isBoolType(l.t)) {
                        display = l.v !== 0 ? "true" : "false";
                    } else {
                        display = l.v.toString();
                    }
                } else if (this.isPointerType(l)) {
                    if (this.isFunctionType(l.t)) {
                        display = "<function>";
                    } else if (this.isArrayType(l)) {
                        if (this.isTypeEqualTo(l.t.eleType, this.charTypeLiteral)) {
                            display = "\"" + this.charArray_getJSString(l) + "\"";
                        } else if (options.noArray) {
                            display = "[...]";
                        } else {
                            options.noArray = true;
                            const displayList = [];
                            for (let i = l.v.position, end = l.v.target.length, asc = l.v.position <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                                displayList.push(this.makeValueString(l.v.target[i], options));
                            }
                            display = "[" + displayList.join(",") + "]";
                        }
                    } else if (this.isNormalPointerType(l)) {
                        if (options.noPointer) {
                            display = "->?";
                        } else {
                            options.noPointer = true;
                            display = "->" + this.makeValueString(l.v.target);
                        }
                    } else {
                        this.raiseException("unknown pointer type");
                    }
                } else if (this.isClassType(l)) {
                    display = "<object>";
                }
                return display;
            };
            makeValString(l) {
                return this.makeValueString(l) + "(" + this.makeTypeString(l.t) + ")";
            };
            // VITTA WARNING: pick from suffix for Arduino_LED_Matrix
            pickFromSuffix(v, sfx) {
                const L = this.config.limits;
                const s = (sfx || "").toLowerCase();
                if (s === "u") return v <= L["unsigned int"].max ? this.unsignedintTypeLiteral
                    : v <= L["unsigned long"].max ? this.unsignedlongTypeLiteral
                        : this.unsignedlonglongTypeLiteral;

                if (s === "l") return v <= L["long"].max ? this.longTypeLiteral
                    : v <= L["unsigned long"].max ? this.unsignedlongTypeLiteral
                        : v <= L["long long"].max ? this.longlongTypeLiteral
                            : this.unsignedlonglongTypeLiteral;

                if (s === "ul" || s === "lu") return v <= L["unsigned long"].max ? this.unsignedlongTypeLiteral
                    : this.unsignedlonglongTypeLiteral;

                if (s === "ll") return v <= L["long long"].max ? this.longlongTypeLiteral
                    : this.unsignedlonglongTypeLiteral;

                if (s === "ull" || s === "llu")
                    return this.unsignedlonglongTypeLiteral;

                return null;
            };
            // END of VITTA WARNING
            defaultValue(type, left = false) {
                if (type.type === "primitive") {
                    return this.val(type, NaN, left, true);
                } else if (type.type === "class") {
                    const ret = this.val(type, {
                        members: {}
                    }, left);
                    this.types[this.getTypeSignature(type)].cConstructor(this, ret);
                    return ret;
                } else if (type.type === "pointer") {
                    if (type.ptrType === "normal") {
                        return this.val(type, this.makeNormalPointerValue(null), left);
                    } else if (type.ptrType === "array") {
                        const init = [];
                        for (let i = 0, end = type.size, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                            init[i] = this.defaultValue(type.eleType, true);
                        }
                        return this.val(type, this.makeArrayPointerValue(init, 0), left);
                    } else if (type.ptrType === "function") {
                        return this.val(this.functionPointerType(type.targetType.retType, type.targetType.signature), this.makeFunctionPointerValue(null, null, null, type.targetType.signature, type.targetType.retType));
                    }
                }
            };
            raiseException(message, cause) {
                if (!cause) cause = {};
                if (this.interp) {
                    cause.node = this.interp.currentNode;
                }
                throw new Error(message, {
                    cause: cause
                });
            };
            asyncToSuspension(asyncFunc, args) {
                const PENDING_K = "__sendHtmlPage_pending";
                const RESULT_K = "__sendHtmlPage_result";
                if (this.suspension[PENDING_K] == false) {
                    const out = this.suspension[RESULT_K] ?? 0;
                    delete this.suspension[PENDING_K];
                    delete this.suspension[RESULT_K];
                    return out;
                }
                let resume;
                const p = new Promise(r => (resume = r));
                const susp = { type: this.SUSPEND_TOKEN, promise: p, resume };
                this.suspension[PENDING_K] = true;
                asyncFunc(...args).then((value) => {
                    this.suspension[RESULT_K] = value;
                    this.suspension[PENDING_K] = false;
                    susp.resume();
                })
                    .catch(e => {
                        delete this.suspension[RESULT_K];
                        delete this.suspension[PENDING_K];
                        Simulator.handleError(e);
                    });
                throw susp;
            };
            regAsyncFunc(suspFunc, asyncFunc) {
                this.suspension.meta.set(suspFunc, { async: asyncFunc });
            }
            getAsyncFunc(suspFunc) {
                return this.suspension.meta.get(suspFunc)?.async;
            };
        }
        exports.CRuntime = CRuntime;
    },
    'debugger': function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class Debugger {
            constructor(src, oldSrc) {
                this.src = src || "";
                this.srcByLines = (oldSrc || src || "").split("\n");
                this.prevNode = null;
                this.done = false;
                this.conditions = {
                    isStatement(prevNode, newStmt) {
                        return (newStmt != null ? newStmt.type.indexOf("Statement") >= 0 : undefined);
                    },
                    positionChanged(prevNode, newStmt) {
                        return ((prevNode != null ? prevNode.eOffset : undefined) !== newStmt.eOffset) || ((prevNode != null ? prevNode.sOffset : undefined) !== newStmt.sOffset);
                    },
                    lineChanged(prevNode, newStmt) {
                        return (prevNode != null ? prevNode.sLine : undefined) !== newStmt.sLine;
                    }
                };
                this.stopConditions = {
                    isStatement: false,
                    positionChanged: false,
                    lineChanged: true
                };
            }
            setStopConditions(stopConditions) {
                this.stopConditions = stopConditions;
            }
            setCondition(name, callback) {
                this.conditions[name] = callback;
            }
            disableCondition(name) {
                this.stopConditions[name] = false;
            }
            enableCondition(name) {
                this.stopConditions[name] = true;
            }
            getSource() {
                return this.src;
            }
            start(rt, gen) {
                this.rt = rt;
                return this.gen = gen;
            }
            continue() {
                while (true) {
                    const done = this.next();
                    if (done !== false) {
                        return done;
                    }
                    const curStmt = this.nextNode();
                    for (const name of Object.keys(this.stopConditions)) {
                        const active = this.stopConditions[name];
                        if (active) {
                            if (this.conditions[name](this.prevNode, curStmt)) {
                                return false;
                            }
                        }
                    }
                }
            }
            next() {
                this.prevNode = this.nextNode();
                const ngen = this.gen.next();
                if (ngen.done) {
                    this.done = true;
                    return ngen.value;
                } else {
                    return false;
                }
            }
            nextLine() {
                const s = this.nextNode();
                return s ? this.srcByLines[s.sLine - 1] : this.srcByLines[0];
            }
            nextNodeText() {
                const s = this.nextNode();
                return s ? this.src.slice(s.sOffset, s.eOffset).trim() : "";
            }
            nextNode() {
                if (this.done) {
                    return {
                        type: null,
                        sOffset: -1,
                        sLine: -1,
                        sColumn: -1,
                        eOffset: -1,
                        eLine: -1,
                        eColumn: -1
                    };
                } else {
                    return this.rt.interp.currentNode;
                }
            }
            variable(name) {
                if (name) {
                    const v = this.rt.readVar(name);
                    return {
                        type: this.rt.makeTypeString(v.t),
                        value: v.v
                    };
                } else {
                    const usedName = new Set();
                    const ret = [];
                    for (let scopeIndex = this.rt.scope.length - 1; scopeIndex >= 0; scopeIndex--) {
                        for (name of Object.keys(this.rt.scope[scopeIndex].variables)) {
                            const val = this.rt.scope[scopeIndex].variables[name];
                            if ((typeof val === "object") && "t" in val && "v" in val) {
                                if (!usedName.has(name)) {
                                    usedName.add(name);
                                    ret.push({
                                        name,
                                        type: this.rt.makeTypeString(val.t),
                                        value: this.rt.makeValueString(val)
                                    });
                                }
                            }
                        }
                    }
                    return ret;
                }
            }
        }
        exports.default = Debugger;
    },
    'defaults': function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getDefaultTypes = exports.numericTypeOrder = exports.getDefaultConfig = void 0;
        const _ = require("lodash");
        const config = {
            specifiers: ["const", "inline", "_stdcall", "extern", "static", "auto", "register"],
            charTypes: ["char", "signed char", "wchar_t", "char16_t", "char32_t"],
            intTypes: ["short", "short int", "signed short", "signed short int",
                "unsigned short", "unsigned short int", "int", "signed int",
                "unsigned", "unsigned int", "long", "long int", "long int",
                "signed long", "signed long int", "unsigned long",
                "unsigned long int", "long long", "long long int",
                "long long int", "signed long long", "signed long long int",
                "unsigned long long", "unsigned long long int", "bool", "boolean",
                "unsigned char", "unsigned wchar_t"],
            limits: {
                "char": {
                    max: 0x7f,
                    min: 0x00,
                    bytes: 1
                },
                "signed char": {
                    max: 0x7f,
                    min: -0x80,
                    bytes: 1
                },
                "unsigned char": {
                    max: 0xff,
                    min: 0x00,
                    bytes: 1
                },
                "wchar_t": {
                    max: 0x7fffffff,
                    min: -0x80000000,
                    bytes: 4
                },
                "unsigned wchar_t": {
                    max: 0xffffffff,
                    min: 0x00000000,
                    bytes: 4
                },
                "char16_t": {
                    max: 0x7fff,
                    min: -0x8000,
                    bytes: 4
                },
                "unsigned char16_t": {
                    max: 0xffff,
                    min: 0x0000,
                    bytes: 4
                },
                "char32_t": {
                    max: 0x7fffffff,
                    min: -0x80000000,
                    bytes: 4
                },
                "unsigned char32_t": {
                    max: 0xffffffff,
                    min: 0x00000000,
                    bytes: 4
                },
                "short": {
                    max: 0x7fff,
                    min: -0x8000,
                    bytes: 2
                },
                "unsigned short": {
                    max: 0xffff,
                    min: 0x0000,
                    bytes: 2
                },
                "int": {
                    max: 0x7fffffff,
                    min: -0x80000000,
                    bytes: 4
                },
                "unsigned": {
                    max: 0xffffffff,
                    min: 0x00000000,
                    bytes: 4
                },
                "long": {
                    max: 0x7fffffff,
                    min: -0x80000000,
                    bytes: 4
                },
                "unsigned long": {
                    max: 0xffffffff,
                    min: 0x00000000,
                    bytes: 4
                },
                "long long": {
                    max: 0x7fffffffffffffff,
                    min: -0x8000000000000000,
                    bytes: 8
                },
                "unsigned long long": {
                    max: 0xffffffffffffffff,
                    min: 0x0000000000000000,
                    bytes: 8
                },
                "float": {
                    max: 3.40282346638529e+038,
                    min: -3.40282346638529e+038,
                    bytes: 4
                },
                "double": {
                    max: 1.79769313486232e+308,
                    min: -1.79769313486232e+308,
                    bytes: 8
                },
                "pointer": {
                    max: undefined,
                    min: undefined,
                    bytes: 4
                },
                "bool": {
                    max: 1,
                    min: 0,
                    bytes: 1
                }
            },
            loadedLibraries: []
        };
        function getDefaultConfig() {
            return _.cloneDeep(config);
        }
        exports.getDefaultConfig = getDefaultConfig;
        config.limits["short int"] = config.limits["short"];
        config.limits["signed short"] = config.limits["short"];
        config.limits["signed short int"] = config.limits["short"];
        config.limits["unsigned short int"] = config.limits["unsigned short"];
        config.limits["signed int"] = config.limits["int"];
        config.limits["unsigned int"] = config.limits["unsigned"];
        config.limits["long int"] = config.limits["long"];
        config.limits["long int"] = config.limits["long"];
        config.limits["signed long"] = config.limits["long"];
        config.limits["signed long int"] = config.limits["long"];
        config.limits["unsigned long int"] = config.limits["unsigned long"];
        config.limits["long long int"] = config.limits["long long"];
        config.limits["long long int"] = config.limits["long long"];
        config.limits["signed long long"] = config.limits["long long"];
        config.limits["signed long long int"] = config.limits["long long"];
        config.limits["unsigned long long int"] = config.limits["unsigned long long"];
        exports.numericTypeOrder = [
            "bool",
            "char",
            "signed char",
            "short",
            "short int",
            "signed short",
            "signed short int",
            "int",
            "signed int",
            "long",
            "long int",
            "long int",
            "signed long",
            "signed long int",
            "long long",
            "long long int",
            "long long int",
            "signed long long",
            "signed long long int",
            "float",
            "double"
        ];
        const defaultOpHandler = {
            handlers: {
                "o(*)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support * on " + rt.makeTypeString(r.t));
                        } else if (!rt.isNumericType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support * on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) * rt.booleanToNumber(r.v);
                            const rett = rt.promoteNumeric(l.t, r.t);
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(/)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support / on " + rt.makeTypeString(r.t));
                        } else if (!rt.isNumericType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support / on " + rt.makeTypeString(r.t));
                        } else {
                            let ret = rt.booleanToNumber(l.v) / rt.booleanToNumber(r.v);
                            if (rt.isIntegerType(l.t) && rt.isIntegerType(r.t)) {
                                ret = Math.floor(ret);
                            }
                            const rett = rt.promoteNumeric(l.t, r.t);
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(%)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r) || !rt.isIntegerType(l) || !rt.isIntegerType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support % on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) % rt.booleanToNumber(r.v);
                            const rett = rt.promoteNumeric(l.t, r.t);
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(+)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            return l;
                        } else {
                            if (rt.isArrayType(r)) {
                                const i = rt.cast(rt.intTypeLiteral, l).v;
                                return rt.val(r.t, rt.makeArrayPointerValue(r.v.target, r.v.position + i));
                            } else if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support + on " + rt.makeTypeString(r.t));
                            } else {
                                const ret = rt.booleanToNumber(l.v) + rt.booleanToNumber(r.v);
                                const rett = rt.promoteNumeric(l.t, r.t);
                                return rt.val(rett, ret);
                            }
                        }
                    }
                },
                "o(-)": {
                    default(rt, l, r) {
                        let rett;
                        if (r === undefined) {
                            rett = l.v > 0 ? rt.getSignedType(l.t) : l.t;
                            return rt.val(rett, -l.v);
                        } else {
                            if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support - on " + rt.makeTypeString(r.t));
                            } else {
                                const ret = rt.booleanToNumber(l.v) - rt.booleanToNumber(r.v);
                                rett = rt.promoteNumeric(l.t, r.t);
                                return rt.val(rett, ret);
                            }
                        }
                    }
                },
                "o(<<)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r) || !rt.isIntegerType(l) || !rt.isIntegerType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support << on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) << rt.booleanToNumber(r.v);
                            const rett = l.t;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(>>)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r) || !rt.isIntegerType(l) || !rt.isIntegerType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support >> on " + rt.makeTypeString(r.t));
                        } else {
                            const rv = rt.booleanToNumber(r.v);
                            let lv = rt.booleanToNumber(l.v);
                            const lim = rt.config.limits[l.t.name] || {};
                            const width = (lim.bytes ? lim.bytes * 8 : 32);
                            let ret;
                            if (rt.isUnsignedType(l.t)) {
                                if (width === 32) ret = (lv >>> 0) >>> rv;
                                else if (width === 16) ret = ((lv & 0xFFFF) >>> rv);
                                else if (width === 8) ret = ((lv & 0xFF) >>> rv);
                                else ret = (lv >>> 0) >>> rv;
                            } else {
                                if (width === 32) ret = (lv | 0) >> rv;
                                else if (width === 16) ret = (((lv << 16) >> 16) >> rv);
                                else if (width === 8) ret = (((lv << 24) >> 24) >> rv);
                                else ret = (lv | 0) >> rv;
                            }
                            const rett = l.t;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(<)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            // VITTA WARNING: allow String comparison
                            if (l.t.name == 'String' && r.t.name == 'String') {
                                return rt.compareTwoString(l.v, r.v, "(<)");
                            } else {
                                // END VITTA WARNING
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support < on " + rt.makeTypeString(r.t));
                            }
                        } else {
                            const ret = rt.booleanToNumber(l.v) < rt.booleanToNumber(r.v);
                            const rett = rt.boolTypeLiteral;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(<=)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            // VITTA WARNING: allow String comparison
                            if (l.t.name == 'String' && r.t.name == 'String') {
                                return rt.compareTwoString(l.v, r.v, "(<=)");
                            } else {
                                // END VITTA WARNING
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support <= on " + rt.makeTypeString(r.t));
                            }
                        } else {
                            const ret = rt.booleanToNumber(l.v) <= rt.booleanToNumber(r.v);
                            const rett = rt.boolTypeLiteral;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(>)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            // VITTA WARNING: allow String comparison
                            if (l.t.name == 'String' && r.t.name == 'String') {
                                return rt.compareTwoString(l.v, r.v, "(>)");
                            } else {
                                // END VITTA WARNING
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support > on " + rt.makeTypeString(r.t));
                            }
                        } else {
                            const ret = rt.booleanToNumber(l.v) > rt.booleanToNumber(r.v);
                            const rett = rt.boolTypeLiteral;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(>=)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            // VITTA WARNING: allow String comparison
                            if (l.t.name == 'String' && r.t.name == 'String') {
                                return rt.compareTwoString(l.v, r.v, "(>=)");
                            } else {
                                // END VITTA WARNING
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support >= on " + rt.makeTypeString(r.t));
                            }
                        } else {
                            const ret = rt.booleanToNumber(l.v) >= rt.booleanToNumber(r.v);
                            const rett = rt.boolTypeLiteral;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(==)": {
                    default(rt, l, r) {
                        if (rt.isClassType(r)) {
                            return rt.types["class"].handlers["o(==)"].default(rt, r, l);
                        }
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support == on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) === rt.booleanToNumber(r.v);
                            return rt.val(rt.boolTypeLiteral, ret);
                        }
                    }
                },
                "o(!=)": {
                    default(rt, l, r) {
                        if (rt.isClassType(r)) {
                            return rt.types["class"].handlers["o(!=)"].default(rt, r, l);
                        }
                        if (!rt.isNumericType(l) || !rt.isNumericType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support != on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) !== rt.booleanToNumber(r.v);
                            const rett = rt.boolTypeLiteral;
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(&)": {
                    default(rt, l, r) {
                        let t;
                        if (r === undefined) {
                            if ("array" in l) {
                                return rt.val(rt.arrayPointerType(l.t, l.array.length), rt.makeArrayPointerValue(l.array, l.arrayIndex));
                            } else {
                                t = rt.normalPointerType(l.t);
                                return rt.val(t, rt.makeNormalPointerValue(l));
                            }
                        } else {
                            if (!rt.isIntegerType(l) || !rt.isNumericType(r) || !rt.isIntegerType(r)) {
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support & on " + rt.makeTypeString(r.t));
                            } else {
                                const ret = rt.booleanToNumber(l.v) & rt.booleanToNumber(r.v);
                                const rett = rt.promoteNumeric(l.t, r.t);
                                return rt.val(rett, ret);
                            }
                        }
                    }
                },
                "o(^)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r) || !rt.isIntegerType(l) || !rt.isIntegerType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support ^ on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) ^ rt.booleanToNumber(r.v);
                            const rett = rt.promoteNumeric(l.t, r.t);
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(|)": {
                    default(rt, l, r) {
                        if (!rt.isNumericType(r) || !rt.isIntegerType(l) || !rt.isIntegerType(r)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support | on " + rt.makeTypeString(r.t));
                        } else {
                            const ret = rt.booleanToNumber(l.v) | rt.booleanToNumber(r.v);
                            const rett = rt.promoteNumeric(l.t, r.t);
                            return rt.val(rett, ret);
                        }
                    }
                },
                "o(,)": {
                    default(rt, l, r) {
                        return r;
                    }
                },
                "o(=)": {
                    default(rt, l, r) {
                        if (l.left) {
                            l.v = rt.cast(l.t, r).v;
                            return l;
                        } else {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        }
                    }
                },
                "o(+=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(+)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(-=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(-)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(*=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(*)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(/=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(/)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(%=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(%)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(<<=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(<<)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(>>=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(>>)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(&=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(&)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(^=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(^)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(|=)": {
                    default(rt, l, r) {
                        r = defaultOpHandler.handlers["o(|)"].default(rt, l, r);
                        return defaultOpHandler.handlers["o(=)"].default(rt, l, r);
                    }
                },
                "o(++)": {
                    default(rt, l, dummy) {
                        if (!rt.isNumericType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support increment");
                        } else if (!l.left) {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        } else if (dummy) {
                            const b = l.v;
                            l.v = rt.booleanToNumber(l.v) + 1;
                            if (rt.inrange(l.t, l.v, `overflow during post-increment ${rt.makeValString(l)}`)) {
                                l.v = rt.ensureUnsigned(l.t, l.v);
                                return rt.val(l.t, b);
                            }
                        } else {
                            l.v = rt.booleanToNumber(l.v) + 1;
                            if (rt.inrange(l.t, l.v, `overflow during pre-increment ${rt.makeValString(l)}`)) {
                                l.v = rt.ensureUnsigned(l.t, l.v);
                                return l;
                            }
                        }
                    }
                },
                "o(--)": {
                    default(rt, l, dummy) {
                        let b;
                        if (!rt.isNumericType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support decrement");
                        } else if (!l.left) {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        } else if (dummy) {
                            b = l.v;
                            l.v = rt.booleanToNumber(l.v) - 1;
                            if (rt.inrange(l.t, l.v, "overflow during post-decrement")) {
                                l.v = rt.ensureUnsigned(l.t, l.v);
                                return rt.val(l.t, b);
                            }
                        } else {
                            l.v = rt.booleanToNumber(l.v) - 1;
                            b = l.v;
                            if (rt.inrange(l.t, l.v, "overflow during pre-decrement")) {
                                l.v = rt.ensureUnsigned(l.t, l.v);
                                return l;
                            }
                        }
                    }
                },
                "o(~)": {
                    default(rt, l) {
                        if (!rt.isIntegerType(l.t)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support ~ on itself");
                        }
                        const ret = ~l.v;
                        const rett = rt.promoteNumeric(l.t, rt.intTypeLiteral);
                        return rt.val(rett, ret);
                    }
                },
                "o(!)": {
                    default(rt, l) {
                        if (!rt.isIntegerType(l.t)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support ! on itself");
                        }
                        const ret = l.v ? 0 : 1;
                        const rett = l.t;
                        return rt.val(rett, ret);
                    }
                }
            }
        };
        const types = {
            "global": {
                handlers: {},
            }
        };
        function getDefaultTypes() {
            return _.cloneDeep(types);
        }
        exports.getDefaultTypes = getDefaultTypes;
        types["(char)"] = defaultOpHandler;
        types["(signed char)"] = defaultOpHandler;
        types["(unsigned char)"] = defaultOpHandler;
        types["(short)"] = defaultOpHandler;
        types["(short int)"] = defaultOpHandler;
        types["(signed short)"] = defaultOpHandler;
        types["(signed short int)"] = defaultOpHandler;
        types["(unsigned short)"] = defaultOpHandler;
        types["(unsigned short int)"] = defaultOpHandler;
        types["(int)"] = defaultOpHandler;
        types["(signed int)"] = defaultOpHandler;
        types["(unsigned)"] = defaultOpHandler;
        types["(unsigned int)"] = defaultOpHandler;
        types["(long)"] = defaultOpHandler;
        types["(long int)"] = defaultOpHandler;
        types["(long int)"] = defaultOpHandler;
        types["(signed long)"] = defaultOpHandler;
        types["(signed long int)"] = defaultOpHandler;
        types["(unsigned long)"] = defaultOpHandler;
        types["(unsigned long int)"] = defaultOpHandler;
        types["(long long)"] = defaultOpHandler;
        types["(long long int)"] = defaultOpHandler;
        types["(long long int)"] = defaultOpHandler;
        types["(signed long long)"] = defaultOpHandler;
        types["(signed long long int)"] = defaultOpHandler;
        types["(unsigned long long)"] = defaultOpHandler;
        types["(unsigned long long int)"] = defaultOpHandler;
        types["(float)"] = defaultOpHandler;
        types["(double)"] = defaultOpHandler;
        types["(bool)"] = defaultOpHandler;
        types["(boolean)"] = defaultOpHandler;
        types["pointer"] = {
            handlers: {
                "o(==)": {
                    default(rt, l, r) {
                        // VITTA WARNING: for comparing strings
                        if (rt.isClassType(r)) {
                            return rt.types["class"].handlers["o(==)"].default(rt, r, l);
                        }
                        console.log(l)
                        console.log(r)
                        if (rt.isPointerType(r.t) && rt.isPointerType(l.t) && r.v.target.length == l.v.target.length) {
                            for (let i = 0; i < r.v.target.length; i++) {
                                if (l.v.target[i].v != r.v.target[i].v) {
                                    return rt.val(rt.boolTypeLiteral, 0);
                                }
                            }
                            return rt.val(rt.boolTypeLiteral, 1);
                        } else if (rt.isPointerType(r.t) && rt.isPointerType(l.t)) {
                            return rt.val(rt.boolTypeLiteral, 0);
                        } else if (rt.isIntegerType(r.t) && r.v == 0 && rt.isPointerType(l.t) && (!l.v.target || (l.v.target.length == 1 && l.v.target[0].v == 0))) {
                            return rt.val(rt.boolTypeLiteral, 1);
                        }
                        return !!rt.isTypeEqualTo(l.t, r.t) && ("array" === l.t.ptrType ? l.v.target === r.v.target && (null === l.v.target || l.v.position === r.v.position) : l.v.target === r.v.target);
                    }
                    // END of VITTA WARNING
                },
                "o(!=)": {
                    default(rt, l, r) {
                        const isEqualValue = rt.types["pointer"].handlers["o(==)"].default(rt, l, r);
                        if (isEqualValue) {
                            return rt.val(rt.boolTypeLiteral, !isEqualValue.v);
                        } else {
                            rt.raiseException("invalid comparison between [" + l.t.name + "] and " + r.t.name + " on operator o(!=)");
                        }
                    }
                },
                "o(,)": {
                    default(rt, l, r) {
                        return r;
                    }
                },
                "o(=)": {
                    default(rt, l, r) {
                        if (!l.left) {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        }
                        const t = rt.cast(l.t, r);
                        l.t = t.t;
                        l.v = t.v;
                        return l;
                    }
                },
                "o(&)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            if (rt.isArrayElementType(l)) {
                                if (l.array) {
                                    return rt.val(rt.arrayPointerType(l.t, l.array.length), rt.makeArrayPointerValue(l.array, l.arrayIndex));
                                } else {
                                    const t = rt.normalPointerType(l.t);
                                    return rt.val(t, rt.makeNormalPointerValue(l));
                                }
                            } else {
                                rt.raiseException(rt.makeTypeString(l.t) + " does not support & on " + rt.makeTypeString(r.t));
                            }
                        } else {
                            rt.raiseException("you cannot cast bitwise and on pointer");
                        }
                    }
                },
                "o(())": {
                    default(rt, l, bindThis, ...args) {
                        if (!rt.isPointerType(l) || !rt.isFunctionPointerType(l)) {
                            rt.raiseException(`pointer target(${rt.makeValueString(l)}) is not a function`);
                        } else {
                            return rt.types["function"].handlers["o(())"].default(rt, l.v.target, bindThis, ...args);
                        }
                    }
                }
            }
        };
        types["function"] = {
            handlers: {
                "o(())": {
                    default(rt, l, bindThis, ...args) {
                        if (!rt.isFunctionType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " does not support ()");
                        } else {
                            if (rt.isFunctionPointerType(l)) {
                                l = l.v.target;
                            }
                            if (l.v.target === null) {
                                rt.raiseException(`function ${l.v.name} does not seem to be implemented`);
                            } else {
                                return rt.getCompatibleFunc(l.v.defineType, l.v.name, args)(rt, bindThis, ...args);
                            }
                        }
                    }
                },
                "o(&)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            if (rt.isFunctionType(l)) {
                                const lt = l.t;
                                if ("retType" in lt) {
                                    const t = rt.functionPointerType(lt.retType, lt.signature);
                                    return rt.val(t, rt.makeFunctionPointerValue(l, l.v.name, l.v.defineType, lt.signature, lt.retType));
                                } else {
                                    rt.raiseException(rt.makeTypeString(lt) + " is an operator function");
                                }
                            } else {
                                rt.raiseException(rt.makeValueString(l) + " is not a function");
                            }
                        } else {
                            rt.raiseException("you cannot cast bitwise and on function");
                        }
                    }
                }
            }
        };
        types["pointer_normal"] = {
            handlers: {
                "o(*)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            if (!rt.isNormalPointerType(l)) {
                                rt.raiseException(`pointer (${rt.makeValueString(l)}) is not a normal pointer`);
                            } else {
                                if (l.v.target === null) {
                                    rt.raiseException("you cannot dereference an unitialized pointer");
                                }
                                return l.v.target;
                            }
                        } else {
                            rt.raiseException("you cannot multiply a pointer");
                        }
                    }
                },
                "o(->)": {
                    *default(rt, l) {
                        if (!rt.isNormalPointerType(l)) {
                            rt.raiseException(`pointer (${rt.makeValueString(l)}) is not a normal pointer`);
                        } else {
                            return l.v.target;
                        }
                    }
                }
            }
        };
        types["pointer_array"] = {
            handlers: {
                "o(*)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            if (!rt.isArrayType(l)) {
                                rt.raiseException(`pointer (${rt.makeValueString(l)}) is not a normal pointer`);
                            } else {
                                const arr = l.v.target;
                                if (l.v.position >= arr.length) {
                                    rt.raiseException("index out of bound " + l.v.position + " >= " + arr.length);
                                } else if (l.v.position < 0) {
                                    rt.raiseException("negative index " + l.v.position);
                                }
                                const ret = arr[l.v.position];
                                ret.array = arr;
                                ret.arrayIndex = l.v.position;
                                return ret;
                            }
                        } else {
                            rt.raiseException("you cannot multiply a pointer");
                        }
                    }
                },
                "o([])": {
                    default(rt, l, r) {
                        r = rt.types["pointer_array"].handlers["o(+)"].default(rt, l, r);
                        return rt.types["pointer_array"].handlers["o(*)"].default(rt, r);
                    }
                },
                "o(->)": {
                    default(rt, l) {
                        l = rt.types["pointer_array"].handlers["o(*)"].default(rt, l);
                        return l;
                    }
                },
                "o(-)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l)) {
                            if (rt.isNumericType(r)) {
                                const i = rt.cast(rt.intTypeLiteral, r).v;
                                return rt.val(l.t, rt.makeArrayPointerValue(l.v.target, l.v.position - i));
                            } else if (rt.isArrayType(r)) {
                                if (l.v.target === r.v.target) {
                                    return l.v.position - r.v.position;
                                } else {
                                    rt.raiseException("you cannot perform minus on pointers pointing to different arrays");
                                }
                            } else {
                                rt.raiseException(rt.makeTypeString(r.t) + " is not an array pointer type");
                            }
                        } else {
                            rt.raiseException(rt.makeTypeString(l.t) + " is not an array pointer type");
                        }
                    }
                },
                "o(<)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l) && rt.isArrayType(r)) {
                            if (l.v.target === r.v.target) {
                                return l.v.position < r.v.position;
                            } else {
                                rt.raiseException("you cannot perform compare on pointers pointing to different arrays");
                            }
                        } else {
                            rt.raiseException(rt.makeTypeString(r.t) + " is not an array pointer type");
                        }
                    }
                },
                "o(>)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l) && rt.isArrayType(r)) {
                            if (l.v.target === r.v.target) {
                                return l.v.position > r.v.position;
                            } else {
                                rt.raiseException("you cannot perform compare on pointers pointing to different arrays");
                            }
                        } else {
                            rt.raiseException(rt.makeTypeString(r.t) + " is not an array pointer type");
                        }
                    }
                },
                "o(<=)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l) && rt.isArrayType(r)) {
                            if (l.v.target === r.v.target) {
                                return l.v.position <= r.v.position;
                            } else {
                                rt.raiseException("you cannot perform compare on pointers pointing to different arrays");
                            }
                        } else {
                            rt.raiseException(rt.makeTypeString(r.t) + " is not an array pointer type");
                        }
                    }
                },
                "o(>=)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l) && rt.isArrayType(r)) {
                            if (l.v.target === r.v.target) {
                                return l.v.position >= r.v.position;
                            } else {
                                rt.raiseException("you cannot perform compare on pointers pointing to different arrays");
                            }
                        } else {
                            rt.raiseException(rt.makeTypeString(r.t) + " is not an array pointer type");
                        }
                    }
                },
                "o(+)": {
                    default(rt, l, r) {
                        if (rt.isArrayType(l) && rt.isNumericType(r)) {
                            const i = rt.cast(rt.intTypeLiteral, r).v;
                            return rt.val(l.t, rt.makeArrayPointerValue(l.v.target, l.v.position + i));
                        }
                        // VITTA WARNING: char concatenation
                        else if (rt.isStringType(l) && rt.isStringClass(r)) {
                            const string = rt.charArray_getJSString(l) + rt.String_getJSString(r);
                            return rt.String_makeValueFromArray(rt.charArray_makeFromJSString(string));
                        }
                        else if (rt.isStringType(l) && rt.isStringType(r)) {
                            const string = rt.charArray_getJSString(l) + rt.charArray_getJSString(r);
                            return rt.charArray_makeFromJSString(string);
                        }
                        // END of VITTA WARNING
                        else {
                            if (rt.isPointerType(l) && rt.isPointerType(r)) {
                                rt.raiseException(`invalid operands of types 'const char [${l.v.target.length}]' and 'const char [${r.v.target.length}]' to binary 'operator+'`);
                            } else {
                                rt.raiseException("cannot add non-numeric to an array pointer");
                            }
                        }
                    }
                },
                "o(+=)": {
                    default(rt, l, r) {
                        r = rt.types["pointer_array"].handlers["o(+)"].default(rt, l, r);
                        // VITTA WARNING: change "=" to "o(=)"
                        return rt.types["pointer"].handlers["o(=)"].default(rt, l, r);
                        // END of VITTA WARNING
                    }
                },
                "o(-=)": {
                    default(rt, l, r) {
                        r = rt.types["pointer_array"].handlers["o(-)"].default(rt, l, r);
                        // VITTA WARNING: change "=" to "o(=)"
                        return rt.types["pointer"].handlers["o(=)"].default(rt, l, r);
                        // END of VITTA WARNING
                    }
                },
                "o(++)": {
                    default(rt, l, dummy) {
                        if (!l.left) {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        }
                        if (!rt.isArrayType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " is not an array pointer type");
                        } else {
                            if (dummy) {
                                return rt.val(l.t, rt.makeArrayPointerValue(l.v.target, l.v.position++));
                            } else {
                                l.v.position++;
                                return l;
                            }
                        }
                    }
                },
                "o(--)": {
                    default(rt, l, dummy) {
                        if (!l.left) {
                            rt.raiseException(rt.makeValString(l) + " is not a left value");
                        }
                        if (!rt.isArrayType(l)) {
                            rt.raiseException(rt.makeTypeString(l.t) + " is not an array pointer type");
                        } else {
                            if (dummy) {
                                return rt.val(l.t, rt.makeArrayPointerValue(l.v.target, l.v.position--));
                            } else {
                                l.v.position--;
                                return l;
                            }
                        }
                    }
                }
            }
        };
        // VITTA WARNING: types class
        types["class"] = {
            handlers: {
                "o(&)": {
                    default(rt, l, r) {
                        if (r === undefined) {
                            const t = rt.normalPointerType(l.t);
                            return rt.val(t, rt.makeNormalPointerValue(l));
                        } else {
                            rt.raiseException("you cannot cast bitwise and on class");
                        }
                    }
                },
                "o(==)": {
                    default(rt, l, r) {
                        const operator = rt.types["[" + l.t.name + "]"].handlers["o(==)"];
                        if (operator) {
                            const r_sig = rt.getTypeSignature(r.t)
                            const comparator = operator.functions[r_sig];
                            if (comparator) {
                                return comparator(rt, l, r);
                            } else if (rt.isClassType(r.t)) {
                                function deepEqual(a, b) {
                                    if (a === b) return true;
                                    if (typeof a !== "object" || a === null ||
                                        typeof b !== "object" || b === null) {
                                        return false;
                                    }
                                    const keysA = Object.keys(a);
                                    const keysB = Object.keys(b);
                                    if (keysA.length !== keysB.length) return false;
                                    for (const key of keysA) {
                                        if (!keysB.includes(key)) return false;
                                        if (!deepEqual(a[key], b[key])) return false;
                                    }
                                    return true;
                                };
                                return rt.val(rt.boolTypeLiteral, deepEqual(l.v.members, r.v.members));
                            }
                            rt.raiseException("forbids comparison between class [" + l.t.name + "] and " + r_sig + " on operator o(==)");
                        }
                    }
                },
                "o(!=)": {
                    default(rt, l, r) {
                        const isEqualValue = rt.types["class"].handlers["o(==)"].default(rt, l, r);
                        if (isEqualValue) {
                            return rt.val(rt.boolTypeLiteral, !isEqualValue.v);
                        } else {
                            rt.raiseException("invalid comparison between [" + l.t.name + "] and " + r.t.name + " on operator o(!=)");
                        }
                    }
                }
            }
        };
        // END of VITTA WARNING
    },
    'cctypes': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                rt.regFunc((function (rt, _this, x) {
                    const c = rt.getFunc("global", "isdigit", [rt.intTypeLiteral])(rt, _this, x);
                    if (!c.v) {
                        return rt.getFunc("global", "isalpha", [rt.intTypeLiteral])(rt, _this, x);
                    }
                    return c;
                }), "global", "isalnum", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = (x.v >= "0".charCodeAt(0)) && (x.v <= "9".charCodeAt(0)) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "isdigit", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const c = rt.getFunc("global", "isupper", [rt.intTypeLiteral])(rt, _this, x);
                    if (!c.v) {
                        return rt.getFunc("global", "islower", [rt.intTypeLiteral])(rt, _this, x);
                    }
                    return c;
                }), "global", "isalpha", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = [
                        0x20,
                        0x09,
                        0x0a,
                        0x0b,
                        0x0c,
                        0x0d
                    ].includes(x.v) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "isspace", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = ((x.v >= 0x00) && (x.v <= 0x1f)) || (x.v === 0x7f) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "iscntrl", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = (x.v > 0x1f) && (x.v !== 0x7f) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "isprint", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    let c = rt.getFunc("global", "isspace", [rt.intTypeLiteral])(rt, _this, x);
                    if (!c.v) {
                        c = rt.getFunc("global", "isgraph", [rt.intTypeLiteral])(rt, _this, x);
                        if (!c.v) {
                            return rt.val(rt.intTypeLiteral, 1);
                        }
                    }
                    return rt.val(rt.intTypeLiteral, 0);
                }), "global", "isgraph", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = (x.v >= "a".charCodeAt(0)) && (x.v <= "z".charCodeAt(0)) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "islower", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = (x.v >= "A".charCodeAt(0)) && (x.v <= "Z".charCodeAt(0)) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "isupper", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    let c = rt.getFunc("global", "isgraph", [rt.intTypeLiteral])(rt, _this, x);
                    if (c.v) {
                        c = rt.getFunc("global", "isalnum", [rt.intTypeLiteral])(rt, _this, x);
                        if (!c.v) {
                            return rt.val(rt.intTypeLiteral, 1);
                        }
                    }
                    return rt.val(rt.intTypeLiteral, 0);
                }), "global", "ispunct", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const v = ((x.v >= "A".charCodeAt(0)) && (x.v <= "F".charCodeAt(0))) || ((x.v >= "a".charCodeAt(0)) && (x.v <= "f".charCodeAt(0))) || ((x.v >= "0".charCodeAt(0)) && (x.v <= "9".charCodeAt(0))) ? 1 : 0;
                    return rt.val(rt.intTypeLiteral, v);
                }), "global", "isxdigit", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const c = rt.getFunc("global", "isupper", [rt.intTypeLiteral])(rt, _this, x);
                    if (c.v) {
                        return rt.val(rt.intTypeLiteral, x.v + 32);
                    }
                    return x;
                }), "global", "tolower", [rt.intTypeLiteral], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, x) {
                    const c = rt.getFunc("global", "islower", [rt.intTypeLiteral])(rt, _this, x);
                    if (c.v) {
                        return rt.val(rt.intTypeLiteral, x.v - 32);
                    }
                    return x;
                }), "global", "toupper", [rt.intTypeLiteral], rt.intTypeLiteral);
            }
        };
    },
    'climits': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                let t = rt.primitiveType("int");
                rt.defVar("CHAR_BIT", t, rt.val(t, 8 * rt.config.limits["char"].bytes));
                rt.defVar("MB_LEN_MAX", t, rt.val(t, 16));
                rt.defVar("SCHAR_MIN", t, rt.val(t, rt.config.limits["signed char"].min));
                rt.defVar("SCHAR_MAX", t, rt.val(t, rt.config.limits["signed char"].max));
                rt.defVar("CHAR_MIN", t, rt.val(t, rt.config.limits["char"].min));
                rt.defVar("CHAR_MAX", t, rt.val(t, rt.config.limits["char"].max));
                rt.defVar("UCHAR_MAX", t, rt.val(t, rt.config.limits["unsigned char"].max));
                rt.defVar("INT_MIN", t, rt.val(t, rt.config.limits["int"].min));
                rt.defVar("INT_MAX", t, rt.val(t, rt.config.limits["int"].max));
                t = rt.primitiveType("signed short");
                rt.defVar("SHRT_MIN", t, rt.val(t, rt.config.limits["signed short"].min));
                rt.defVar("SHRT_MAX", t, rt.val(t, rt.config.limits["signed short"].max));
                t = rt.primitiveType("unsigned short");
                rt.defVar("USHRT_MAX", t, rt.val(t, rt.config.limits["unsigned short"].max));
                t = rt.primitiveType("unsigned int");
                rt.defVar("UINT_MAX", t, rt.val(t, rt.config.limits["unsigned int"].max));
                t = rt.primitiveType("long");
                rt.defVar("LONG_MIN", t, rt.val(t, rt.config.limits["long"].min));
                rt.defVar("LONG_MAX", t, rt.val(t, rt.config.limits["long"].max));
                t = rt.primitiveType("unsigned long");
                rt.defVar("ULONG_MAX", t, rt.val(t, rt.config.limits["unsigned long"].max));
                t = rt.primitiveType("long long");
                rt.defVar("LLONG_MIN", t, rt.val(t, rt.config.limits["long long"].min));
                rt.defVar("LLONG_MAX", t, rt.val(t, rt.config.limits["long long"].max));
                t = rt.primitiveType("unsigned long long");
                rt.defVar("ULLONG_MAX", t, rt.val(t, rt.config.limits["unsigned long long"].max));
            }
        };
    },
    'cmath': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                const tDouble = rt.doubleTypeLiteral;
                const g = "global";
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.cos(x.v))), g, "cos", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.sin(x.v))), g, "sin", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.tan(x.v))), g, "tan", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.acos(x.v))), g, "acos", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.asin(x.v))), g, "asin", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.atan(x.v))), g, "atan", [tDouble], tDouble);
                rt.regFunc(((rt, _this, y, x) => rt.val(tDouble, Math.atan(y.v / x.v))), g, "atan2", [tDouble, tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.cosh(x.v))), g, "cosh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.sinh(x.v))), g, "sinh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.tanh(x.v))), g, "tanh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.acosh(x.v))), g, "acosh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.asinh(x.v))), g, "asinh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.atanh(x.v))), g, "atanh", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.exp(x.v))), g, "exp", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.log(x.v))), g, "log", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.log10(x.v))), g, "log10", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x, y) => rt.val(tDouble, Math.pow(x.v, y.v))), g, "pow", [tDouble, tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.sqrt(x.v))), g, "sqrt", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.ceil(x.v))), g, "ceil", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.floor(x.v))), g, "floor", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.abs(x.v))), g, "fabs", [tDouble], tDouble);
                rt.regFunc(((rt, _this, x) => rt.val(tDouble, Math.abs(x.v))), g, "abs", [tDouble], tDouble);
            }
        };
    },
    'cstdio': function (require, module, exports) {
        "use strict";
        const EOF = 0;
        const NULL = -1;
        const FORMATS = {
            i: ["d", "i"],
            u: ["u", "o", "x", "X"],
            f: ["f", "F", "e", "E", "g", "G", "a", "A"],
            c: ["c"],
            s: ["s"],
            p: ["p"]
        };
        const specific_printf = function (formatStr, ...args) {
            let result = "";
            let argIndex = 0;
            const len = formatStr.length;
            for (let i = 0; i < len; i++) {
                const ch = formatStr[i];
                if (ch !== "%") {
                    result += ch;
                    continue;
                }
                if (i + 1 < len && formatStr[i + 1] === "%") {
                    result += "%";
                    i++;
                    continue;
                }
                let j = i + 1;
                while (j < len && "+- 0#".indexOf(formatStr[j]) !== -1) j++;
                while (j < len && formatStr[j] >= "0" && formatStr[j] <= "9") j++;
                let precision = undefined;
                if (j < len && formatStr[j] === ".") {
                    j++;
                    const startPrec = j;
                    while (j < len && formatStr[j] >= "0" && formatStr[j] <= "9") j++;
                    precision = j > startPrec ? parseInt(formatStr.slice(startPrec, j), 10) : 0;
                }
                while (j < len && "hlLzjt".indexOf(formatStr[j]) !== -1) j++;
                if (j >= len) {
                    result += formatStr.slice(i);
                    break;
                }
                const spec = formatStr[j];
                const value = args[argIndex++];
                switch (spec) {
                    case "d": case "i": {
                        const n = Number(value) | 0;
                        let s = n.toString(10);
                        if (precision !== undefined) {
                            const isNeg = s[0] === "-";
                            const digits = isNeg ? s.slice(1) : s;
                            s = (isNeg ? "-" : "") + digits.padStart(precision, "0");
                        }
                        result += s;
                        break;
                    }
                    case "u": case "o": case "x": case "X": {
                        let n = Number(value) >>> 0;
                        let base = 10;
                        if (spec === "o") base = 8;
                        if (spec === "x" || spec === "X") base = 16;
                        let s = n.toString(base);
                        if (precision !== undefined) s = s.padStart(precision, "0");
                        if (spec === "X") s = s.toUpperCase();
                        result += s;
                        break;
                    }
                    case "f": case "F": {
                        let n = Number(value);
                        if (!Number.isFinite(n)) {
                            result += "nan";
                            break;
                        }
                        const prec = precision !== undefined ? precision : 6;
                        let s = n.toFixed(prec);
                        if (spec === "F") s = s.toUpperCase();
                        result += s;
                        break;
                    }
                    case "e": case "E": {
                        let n = Number(value);
                        if (!Number.isFinite(n)) {
                            result += "nan";
                            break;
                        }
                        const prec = precision !== undefined ? precision : 6;
                        let s = n.toExponential(prec);
                        if (spec === "E") s = s.replace("e", "E");
                        result += s;
                        break;
                    }
                    case "g": case "G": {
                        let n = Number(value);
                        if (!Number.isFinite(n)) {
                            result += "nan";
                            break;
                        }
                        const prec = precision !== undefined && precision > 0 ? precision : 6;
                        let s = n.toPrecision(prec);
                        if (spec === "G") s = s.toUpperCase();
                        result += s;
                        break;
                    }
                    case "a": case "A": {
                        let n = Number(value);
                        if (!Number.isFinite(n)) {
                            result += "nan";
                            break;
                        }
                        const sign = n < 0 ? "-" : "";
                        n = Math.abs(n);
                        const exp = Math.floor(Math.log2(n));
                        const mant = n / Math.pow(2, exp);
                        const prec = precision !== undefined ? precision : 6;
                        let mantHex = ((mant * Math.pow(2, 24)) >>> 0).toString(16).slice(0, prec);
                        let s = `${sign}0x1.${mantHex}p${exp >= 0 ? "+" : ""}${exp}`;
                        if (spec === "A") s = s.toUpperCase();
                        result += s;
                        break;
                    }
                    case "c": {
                        if (typeof value === "number") {
                            result += String.fromCharCode(value & 0xff);
                        } else {
                            const s = String(value);
                            result += s.length > 0 ? s[0] : "\0";
                        }
                        break;
                    }
                    case "s": {
                        let s = value === null || value === undefined ? "(null)" : String(value);
                        if (precision !== undefined) s = s.slice(0, precision);
                        result += s;
                        break;
                    }
                    case "p":
                        let n = Number(value);
                        if (!Number.isFinite(n)) n = 0;
                        let s = (n >>> 0).toString(16);
                        s = "0x" + s.padStart(8, "0");
                        result += s;
                        break;
                    default:
                        result += "%" + spec;
                        break;
                }
                i = j;
            }
            return result;
        };
        const format_type_map = function (rt, ctrl) {
            const formats = rt.config.type_formats ? rt.config.type_formats : FORMATS;
            for (const [typeName, specifiers] of Object.entries(formats)) {
                if (specifiers.includes(ctrl)) {
                    switch (typeName) {
                        case "i":
                            return rt.intTypeLiteral;
                        case "u":
                            return rt.unsignedintTypeLiteral;
                        case "f":
                            return rt.doubleTypeLiteral;
                        case "c":
                            return rt.charTypeLiteral;
                        case "s":
                            return rt.normalPointerType(rt.charTypeLiteral);
                        case "p":
                            return rt.normalPointerType(rt.voidTypeLiteral);
                    }
                }
            }
            const arch = rt.config.board ? rt.config.board.mcu : '32 bits';
            rt.raiseException("printf format '%" + ctrl + "' is not supported on arch " + arch);
        };
        const validate_format = function (rt, format, ...params) {
            let i = 0;
            const re = /%(?:[-+ #0])?(?:[0-9]+|\*)?(?:\.(?:[0-9]+|\*))?([diuoxXfFeEgGaAcspn])/g;
            return (() => {
                let ctrl;
                const result = [];
                while ((ctrl = re.exec(format)) != null) {
                    const type = format_type_map(rt, ctrl[1]);
                    if (params.length <= i) {
                        rt.raiseException(`insufficient arguments (at least ${i + 1} is required)`);
                    }
                    const target = params[i++];
                    const casted = rt.cast(type, target);
                    if (rt.isStringType(casted)) {
                        result.push(rt.charArray_getJSString(casted));
                    } else {
                        if (casted.v == null || (typeof (casted.v) === "number" && isNaN(casted.v))) {
                            rt.raiseException("uninitialized value when using printf");
                        }
                        result.push(casted.v);
                    }
                }
                return result;
            })();
        };
        function __range__(left, right, inclusive) {
            const range = [];
            const ascending = left < right;
            const end = !inclusive ? right : ascending ? right + 1 : right - 1;
            for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
                range.push(i);
            }
            return range;
        }
        module.exports = {
            load(rt) {
                const char_pointer = rt.normalPointerType(rt.charTypeLiteral);
                const { stdio } = rt.config;
                let input_stream = stdio.drain();
                const _consume_next_char = function () {
                    let char_return = "";
                    if (input_stream.length > 0) {
                        char_return = input_stream[0];
                        input_stream = input_stream.substr(1);
                        return char_return;
                    } else {
                        throw new Error("EOF");
                    }
                };
                const _consume_next_line = function () {
                    let retval;
                    const next_line_break = input_stream.indexOf('\n');
                    if (next_line_break > -1) {
                        retval = input_stream.substr(0, next_line_break);
                        input_stream = input_stream.replace(`${retval}\n`, '');
                    } else {
                        retval = input_stream;
                        input_stream = "";
                    }
                    return retval;
                };
                const _strcpy = require("./shared/cstring_strcpy");
                const __printf = function (format, ...params) {
                    if (rt.isStringType(format.t)) {
                        const formatStr = rt.charArray_getJSString(format);
                        const parsed_params = validate_format(rt, formatStr, ...params);
                        const retval = specific_printf(formatStr, ...parsed_params);
                        return rt.charArray_makeFromJSString(retval);
                    } else {
                        rt.raiseException("format must be a string");
                    }
                };
                const _sprintf = function (rt, _this, target, format, ...params) {
                    const destArray = target.v.target;
                    const formatArray = format.v.target;
                    if (isNaN(destArray[destArray.length - 1].v)) destArray[destArray.length - 1].v = 0;
                    if (isNaN(formatArray[formatArray.length - 1].v)) formatArray[formatArray.length - 1].v = 0;
                    const retval = __printf(format, ...params);
                    _strcpy(rt, null, target, retval);
                    return rt.val(rt.intTypeLiteral, retval.v.target.length);
                };
                rt.regFunc(_sprintf, "global", "sprintf", [char_pointer, char_pointer, "?"], rt.intTypeLiteral);
                const _snprintf = function (rt, _this, target, size, format, ...params) {
                    const destArray = target.v.target;
                    const formatArray = format.v.target;
                    if (isNaN(destArray[destArray.length - 1].v)) destArray[destArray.length - 1].v = 0;
                    if (isNaN(formatArray[formatArray.length - 1].v)) formatArray[formatArray.length - 1].v = 0;
                    const retval = __printf(format, ...params);
                    _strcpy(rt, null, target, retval);
                    return rt.val(rt.intTypeLiteral, size.v);
                };
                rt.regFunc(_snprintf, "global", "snprintf", [char_pointer, rt.sizeTypeLiteral, char_pointer, "?"], rt.intTypeLiteral);
                const _printf = function (rt, _this, format, ...params) {
                    const retval = __printf(format, ...params);
                    const retvalStr = rt.charArray_getJSString(retval);
                    stdio.write(retvalStr);
                    return rt.val(rt.intTypeLiteral, retval.v.target.length);
                };
                rt.regFunc(_printf, "global", "printf", [char_pointer, "?"], rt.intTypeLiteral);
                const _getchar = function (rt, _this) {
                    try {
                        const char = _consume_next_char();
                        return rt.val(rt.intTypeLiteral, char.charCodeAt(0));
                    } catch (error) {
                        return rt.val(rt.intTypeLiteral, EOF);
                    }
                };
                rt.regFunc(_getchar, "global", "getchar", [], rt.intTypeLiteral);
                const _gets = function (rt, _this, charPtr) {
                    const return_value = _consume_next_line();
                    const destArray = charPtr.v.target;
                    for (let i = 0, end = return_value.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
                        try {
                            destArray[i] = rt.val(rt.charTypeLiteral, return_value.charCodeAt(i));
                        } catch (error) {
                            destArray[i] = rt.val(rt.charTypeLiteral, 0);
                        }
                    }
                    destArray[return_value.length] = rt.val(rt.charTypeLiteral, 0);
                    return rt.val(char_pointer, charPtr.v);
                };
                rt.regFunc(_gets, "global", "gets", [char_pointer], char_pointer);
                const _putchar = function (rt, _this, char) {
                    const print_mask = rt.charArray_makeFromJSString("%c");
                    _printf(rt, null, print_mask, char);
                    return char;
                };
                rt.regFunc(_putchar, "global", "putchar", [rt.charTypeLiteral], rt.intTypeLiteral);
                const _puts = function (rt, _this, charPtr) {
                    const print_mask = rt.charArray_makeFromJSString("%s");
                    _printf(rt, null, print_mask, charPtr);
                    return rt.val(rt.intTypeLiteral, 1);
                };
                rt.regFunc(_puts, "global", "puts", [char_pointer], rt.intTypeLiteral);
                const _ASCII = {
                    a: 'a'.charCodeAt(0),
                    f: 'f'.charCodeAt(0),
                    A: 'A'.charCodeAt(0),
                    F: 'F'.charCodeAt(0),
                    0: '0'.charCodeAt(0),
                    8: '8'.charCodeAt(0),
                    9: '9'.charCodeAt(0)
                };
                const _hex2int = function (str) {
                    let ret = 0;
                    let digit = 0;
                    str = str.replace(/^[0O][Xx]/, '');
                    for (let i = str.length - 1; i >= 0; i--) {
                        const num = _int_at_hex(str[i], digit++);
                        if (num !== null) {
                            ret += num;
                        } else {
                            throw new Error('invalid hex ' + str);
                        }
                    }
                    function _int_at_hex(c, digit) {
                        let ret;
                        const ascii = c.charCodeAt(0);
                        if ((_ASCII.a <= ascii) && (ascii <= _ASCII.f)) {
                            ret = ascii - _ASCII.a + 10;
                        } else if ((_ASCII.A <= ascii) && (ascii <= _ASCII.F)) {
                            ret = ascii - _ASCII.a + 10;
                        } else if ((_ASCII[0] < ascii) && (ascii <= _ASCII[9])) {
                            ret = ascii - _ASCII[0];
                        } else {
                            throw new Error(`Invalid ascii [${c}]`);
                        }
                        ret *= Math.pow(16, digit);
                        return ret;
                    }
                    ;
                    return ret;
                };
                const _octal2int = function (str) {
                    str = str.replace(/^0/, '');
                    let ret = 0;
                    let digit = 0;
                    for (let i = str.length - 1; i >= 0; i--) {
                        const num = _int_at_octal(str[i], digit++);
                        if (num !== null) {
                            ret += num;
                        } else {
                            throw new Error(`invalid octal ${str}`);
                        }
                    }
                    function _int_at_octal(c, digit) {
                        let num = null;
                        const ascii = c.charCodeAt(0);
                        if ((ascii >= _ASCII[0]) && (ascii <= _ASCII[8])) {
                            num = ascii - _ASCII[0];
                        } else {
                            throw new Error(`invalid char at [${c}]`);
                        }
                        num *= Math.pow(8, digit);
                        return num;
                    }
                    ;
                    return ret;
                };
                const _regslashs = (pre) => pre.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\|/g, '\\|');
                const _strip_slashes = (str) => str.replace(/\\([\sA-Za-z\\]|[0-7]{1,3})/g, function (str, c) {
                    switch (c) {
                        case "\\":
                            return "\\";
                        case "0":
                            return "\u0000";
                        default:
                            if (/^\w$/.test(c)) {
                                return _get_special_char(c);
                            } else if (/^\s$/.test(c)) {
                                return c;
                            } else if (/([0-7]{1,3})/.test(c)) {
                                return _get_ASCII_char(c);
                            }
                            return str;
                    }
                });
                function _get_ASCII_char(str) {
                    const num = _octal2int(str);
                    return String.fromCharCode(num);
                };
                function _get_special_char(letter) {
                    switch (letter.toLowerCase()) {
                        case "b":
                            return "\b";
                        case "f":
                            return "\f";
                        case "n":
                            return "\n";
                        case "r":
                            return "\r";
                        case "t":
                            return "\t";
                        case "v":
                            return "\v";
                        default:
                            return letter;
                    }
                };
                const _get_input = function (pre, next, match, type) {
                    let tmp = input_stream;
                    let replace = `(${match})`;
                    if ((type === 'STR') && (next.trim().length > 0)) {
                        const before_match = _regslashs(pre);
                        const after_match = _regslashs(next) + '[\\w\\W]*';
                        if (before_match.length) {
                            tmp = tmp.replace(new RegExp(before_match), '');
                        }
                        tmp = tmp.replace(new RegExp(after_match), '');
                    } else {
                        replace = _regslashs(pre) + replace;
                    }
                    const m = tmp.match(new RegExp(replace));
                    if (!m) {
                        return null;
                    }
                    const result = m[1];
                    input_stream = input_stream.substr(input_stream.indexOf(result)).replace(result, '').replace(next, '');
                    return result;
                };
                const _get_integer = function (pre, next) {
                    const text = _get_input(pre, next, '[-]?[A-Za-z0-9]+');
                    if (!text) {
                        return null;
                    } else if (text[0] === '0') {
                        if ((text[1] === 'x') || (text[1] === 'X')) {
                            return _hex2int(text);
                        } else {
                            return _octal2int(text);
                        }
                    } else {
                        return parseInt(text, 10);
                    }
                };
                const _get_float = function (pre, next) {
                    const text = _get_input(pre, next, '[-]?[0-9]+[\.]?[0-9]*');
                    return parseFloat(text);
                };
                const _get_hex = function (pre, next) {
                    const text = _get_input(pre, next, '[A-Za-z0-9]+');
                    return _hex2int(text);
                };
                const _get_octal = function (pre, next) {
                    const text = _get_input(pre, next, '[A-Za-z0-9]+');
                    return _octal2int(text);
                };
                const _get_string = function (pre, next) {
                    let text = _get_input(pre, next, '([\\w\\]=-]|\\S[^\\][^\\ ])+(\\\\[\\w\\ ][\\w\\:]*)*', 'STR');
                    if (/\\/.test(text)) {
                        text = _strip_slashes(text);
                    }
                    return text;
                };
                const _get_char = function (pre, next) {
                    let text = _get_input(pre, next, '.', 'STR');
                    if (/\\/.test(text)) {
                        text = _strip_slashes(text);
                    }
                    return text;
                };
                const _get_line = function (pre, next) {
                    let text = _get_input(pre, next, '[^\n\r]*');
                    if (/\\/.test(text)) {
                        text = _strip_slashes(text);
                    }
                    return text;
                };
                const _deal_type = function (format) {
                    const res = format.match(/%[A-Za-z]+/);
                    const res2 = format.match(/[^%]*/);
                    if (!res) {
                        return null;
                    }
                    const type = res[0];
                    let pre;
                    if (!!res2) {
                        pre = res2[0];
                    } else {
                        pre = null;
                    }
                    const next = format.substr(format.indexOf(type) + type.length);
                    let ret;
                    switch (type) {
                        case "%d":
                        case "%ld":
                        case "%llu":
                        case "%lu":
                        case "%u":
                            ret = _get_integer(pre, next);
                            break;
                        case "%c":
                            ret = _get_char(pre, next);
                            break;
                        case "%s":
                            ret = _get_string(pre, next);
                            break;
                        case "%S":
                            ret = _get_line(pre, next);
                            break;
                        case '%x':
                        case '%X':
                            ret = _get_hex(pre, next);
                            break;
                        case '%o':
                        case '%O':
                            ret = _get_octal(pre, next);
                            break;
                        case '%f':
                            ret = _get_float(pre, next);
                            break;
                        default:
                            throw new Error('Unknown type "' + type + '"');
                    }
                    return ret;
                };
                const _set_pointer_value = function (pointer, value) {
                    try {
                        let new_value;
                        if (rt.isNormalPointerType(pointer)) {
                            if (rt.isNumericType(pointer.t.targetType)) {
                                new_value = rt.val(pointer.t.targetType, value, true);
                                return pointer.v.target.v = new_value.v;
                            } else {
                                new_value = rt.val(pointer.t.targetType, value.charCodeAt(0), true);
                                return pointer.v.target.v = new_value.v;
                            }
                        } else if (rt.isArrayType(pointer)) {
                            const src_array = rt.charArray_makeFromJSString(value);
                            if (src_array.v.target.length > pointer.v.target.length) {
                                return rt.raiseException("Not enough memory on pointer");
                            } else {
                                return __range__(0, src_array.v.target.length, true).map((i) => (() => {
                                    try {
                                        return pointer.v.target[i] = src_array.v.target[i];
                                    } catch (error) {
                                        return rt.raiseException("Not enough memory on pointer");
                                    }
                                })());
                            }
                        } else {
                            return rt.raiseException("Invalid Pointer Type");
                        }
                    } catch (error1) {
                        return rt.raiseException("Memory overflow");
                    }
                };
                const __scanf = function (format) {
                    const re = new RegExp('[^%]*%[A-Za-z][^%]*', 'g');
                    const selectors = format.match(re);
                    return Array.from(selectors).map((val) => _deal_type(val));
                };
                const _scanf = function (rt, _this, pchar, ...args) {
                    let val;
                    const format = rt.charArray_getJSString(pchar);
                    const matched_values = __scanf(format);
                    for (let i = 0; i < matched_values.length; i++) {
                        val = matched_values[i];
                        _set_pointer_value(args[i], val);
                    }
                    return rt.val(rt.intTypeLiteral, matched_values.length);
                };
                rt.regFunc(_scanf, "global", "scanf", [char_pointer, "?"], rt.intTypeLiteral);
                const _sscanf = function (rt, _this, original_string_pointer, format_pointer, ...args) {
                    let val;
                    const format = rt.charArray_getJSString(format_pointer);
                    const original_string = rt.charArray_getJSString(original_string_pointer);
                    const original_input_stream = input_stream;
                    input_stream = original_string;
                    const matched_values = __scanf(format);
                    for (let i = 0; i < matched_values.length; i++) {
                        val = matched_values[i];
                        _set_pointer_value(args[i], val);
                    }
                    input_stream = original_input_stream;
                    return rt.val(rt.intTypeLiteral, matched_values.length);
                };
                rt.regFunc(_sscanf, "global", "sscanf", [char_pointer, char_pointer, "?"], rt.intTypeLiteral);
            }
        };
    },
    'cstdlib': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                let m_w = 123456789;
                let m_z = 987654321;
                const mask = 0xffffffff;
                const seed = (i) => m_w = i;
                const random = function () {
                    m_z = ((36969 * (m_z & 65535)) + (m_z >> 16)) & mask;
                    m_w = ((18000 * (m_w & 65535)) + (m_w >> 16)) & mask;
                    const result = ((m_z << 16) + m_w) & mask;
                    return (result / 4294967296) + 0.5;
                };
                const pchar = rt.normalPointerType(rt.charTypeLiteral);
                const _atof = function (rt, _this, str) {
                    if (rt.isStringType(str.t)) {
                        const s = rt.charArray_getJSString(str);
                        const val = Number.parseFloat(s);
                        return rt.val(rt.floatTypeLiteral, val);
                    } else {
                        return rt.raiseException("argument is not a string");
                    }
                };
                rt.regFunc(_atof, "global", "atof", [pchar], rt.floatTypeLiteral);
                const _atoi = function (rt, _this, str) {
                    if (rt.isStringType(str.t)) {
                        const s = rt.charArray_getJSString(str);
                        const val = Number.parseInt(s, 10);
                        return rt.val(rt.intTypeLiteral, val);
                    } else {
                        return rt.raiseException("argument is not a string");
                    }
                };
                rt.regFunc(_atoi, "global", "atoi", [pchar], rt.intTypeLiteral);
                const _atol = function (rt, _this, str) {
                    if (rt.isStringType(str.t)) {
                        const s = rt.charArray_getJSString(str);
                        const val = Number.parseInt(s, 10);
                        return rt.val(rt.longTypeLiteral, val);
                    } else {
                        return rt.raiseException("argument is not a string");
                    }
                };
                rt.regFunc(_atol, "global", "atol", [pchar], rt.longTypeLiteral);
                if ((rt.scope[0].variables["RAND_MAX"] == null)) {
                    rt.defVar("RAND_MAX", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, rt.config.limits["int"].max))
                }
                const _rand = function (rt, _this) {
                    const val = Math.floor(random() * (rt.scope[0].variables["RAND_MAX"].v + 1));
                    return rt.val(rt.intTypeLiteral, val);
                };
                rt.regFunc(_rand, "global", "rand", [], rt.intTypeLiteral);
                const _srand = (rt, _this, i) => seed(i.v);
                rt.regFunc(_srand, "global", "srand", [rt.unsignedintTypeLiteral], rt.voidTypeLiteral);
                const _system = function (rt, _this, command) {
                    if (command === rt.nullPointer) {
                        return rt.val(rt.intTypeLiteral, 1);
                    } else if (rt.isStringType(command)) {
                        const s = rt.charArray_getJSString(command);
                        try {
                            const ret = eval(s);
                            if (ret != null) {
                                console.log(ret);
                            }
                            return rt.val(rt.intTypeLiteral, 1);
                        } catch (e) {
                            return rt.val(rt.intTypeLiteral, 0);
                        }
                    } else {
                        return rt.raiseException("command is not a string");
                    }
                };
                rt.regFunc(_system, "global", "system", [pchar], rt.intTypeLiteral);
                rt.defVar("NULL", rt.intTypeLiteral, rt.val(rt.intTypeLiteral, 0));
                function binary_search(val, L, cmp) {
                    if (L.length === 0) {
                        return false;
                    }
                    const mid = Math.floor(L.length / 2);
                    const cmpResult = cmp(val, L[mid], mid);
                    if (cmpResult === 0) {
                        return mid;
                    } else if (cmpResult > 0) {
                        return binary_search(val, L.slice((mid + 1), +(L.length) + 1 || undefined), cmp);
                    } else {
                        return binary_search(val, L.slice(0, +(mid - 1) + 1 || undefined), cmp);
                    }
                };
                const _bsearch = function (rt, _this, key, base, num, size, cmp) {
                    if (rt.isArrayType(base)) {
                        const L = base.v.target;
                        const val = key;
                        const wrapper = function (a, b, indexB) {
                            const pbType = base.t;
                            const pbVal = rt.makeArrayPointerValue(L, indexB);
                            const pointerB = rt.val(pbType, pbVal);
                            return cmp.v.target.v.target(rt, null, a, pointerB).v;
                        };
                        const bsRet = binary_search(val, L, wrapper);
                        if (bsRet === false) {
                            return rt.nullPointer;
                        } else {
                            return rt.val(base.t, rt.makeArrayPointerValue(L, bsRet));
                        }
                    } else {
                        return rt.raiseException("base must be an array");
                    }
                };
                const cmpType = rt.functionPointerType(rt.intTypeLiteral, [rt.voidPointerType, rt.voidPointerType]);
                rt.regFunc(_bsearch, "global", "bsearch", [rt.voidPointerType, rt.voidPointerType, rt.intTypeLiteral, rt.intTypeLiteral, cmpType], rt.voidPointerType);
                const _qsort = function (rt, _this, base, num, size, cmp) {
                    if (rt.isArrayType(base)) {
                        const L = base.v.target;
                        for (let i = 0; i < L.length; i++) {
                            const ele = L[i];
                            ele.arrayIndex = i;
                        }
                        const wrapper = function (a, b) {
                            const pType = base.t;
                            const pbVal = rt.makeArrayPointerValue(L, b.arrayIndex);
                            const paVal = rt.makeArrayPointerValue(L, a.arrayIndex);
                            const pointerB = rt.val(pType, pbVal);
                            const pointerA = rt.val(pType, pbVal);
                            return cmp.v.target.v.target(rt, null, pointerA, pointerB).v;
                        };
                        L.sort(wrapper);
                        return;
                    } else {
                        return rt.raiseException("base must be an array");
                    }
                };
                rt.regFunc(_qsort, "global", "qsort", [rt.voidPointerType, rt.intTypeLiteral, rt.intTypeLiteral, cmpType], rt.voidTypeLiteral);
                const _abs = (rt, _this, n) => rt.val(rt.intTypeLiteral, Math.abs(n.v));
                rt.regFunc(_abs, "global", "abs", [rt.intTypeLiteral], rt.intTypeLiteral);
                const _div = function (rt, _this, numer, denom) {
                    if (denom.v === 0) {
                        rt.raiseException("divided by zero");
                    }
                    const quot = rt.val(rt.intTypeLiteral, Math.floor(numer.v / denom.v));
                    const rem = rt.val(rt.intTypeLiteral, numer.v % denom.v);
                    return {
                        t: div_t_t,
                        v: {
                            members: {
                                quot,
                                rem
                            }
                        }
                    };
                };
                const div_t_t = rt.newClass("div_t", [
                    {
                        type: rt.intTypeLiteral,
                        name: "quot"
                    }, {
                        type: rt.intTypeLiteral,
                        name: "rem"
                    }
                ]);
                rt.regFunc(_div, "global", "div", [rt.intTypeLiteral, rt.intTypeLiteral], div_t_t);
                const _labs = (rt, _this, n) => rt.val(rt.longTypeLiteral, Math.abs(n.v));
                rt.regFunc(_labs, "global", "labs", [rt.longTypeLiteral], rt.longTypeLiteral);
                const _ldiv = function (rt, _this, numer, denom) {
                    if (denom.v === 0) {
                        rt.raiseException("divided by zero");
                    }
                    const quot = rt.val(rt.longTypeLiteral, Math.floor(numer.v / denom.v));
                    const rem = rt.val(rt.longTypeLiteral, numer.v % denom.v);
                    return {
                        t: ldiv_t_t,
                        v: {
                            members: {
                                quot,
                                rem
                            }
                        }
                    };
                };
                const ldiv_t_t = rt.newClass("ldiv_t", [
                    {
                        type: rt.longTypeLiteral,
                        name: "quot"
                    }, {
                        type: rt.longTypeLiteral,
                        name: "rem"
                    }
                ]);
                return rt.regFunc(_ldiv, "global", "ldiv", [rt.longTypeLiteral, rt.longTypeLiteral], ldiv_t_t);
            }
        };
    },
    'cstring': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                const pchar = rt.normalPointerType(rt.charTypeLiteral);
                const sizet = rt.primitiveType("unsigned int");
                const _strcpy = require("./shared/cstring_strcpy");
                rt.regFunc(_strcpy, "global", "strcpy", [pchar, pchar], pchar);
                rt.regFunc((function (rt, _this, dest, src, num) {
                    if (rt.isArrayType(dest.t) && rt.isArrayType(src.t)) {
                        const srcarr = src.v.target;
                        let i = src.v.position;
                        const destarr = dest.v.target;
                        let j = dest.v.position;
                        let n = num.v;
                        while ((n > 0) && (i < srcarr.length) && (j < (destarr.length - 1)) && (srcarr[i].v !== 0)) {
                            destarr[j] = rt.clone(srcarr[i]);
                            n--;
                            i++;
                            j++;
                        }
                        if (srcarr[i].v === 0) {
                            while ((n > 0) && (j < destarr.length)) {
                                destarr[j++] = rt.val(rt.charTypeLiteral, 0);
                            }
                        }
                        if (i === srcarr.length) {
                            rt.raiseException("source string does not have a pending \"\\0\"");
                        } else if (j === (destarr.length - 1)) {
                            rt.raiseException("destination array is not big enough");
                        }
                    } else {
                        rt.raiseException("destination or source is not an array");
                    }
                    return dest;
                }), "global", "strncpy", [
                    pchar,
                    pchar,
                    sizet
                ], pchar);
                rt.regFunc((function (rt, _this, dest, src) {
                    if (rt.isArrayType(dest.t) && rt.isArrayType(src.t)) {
                        let lendest;
                        const srcarr = src.v.target;
                        const destarr = dest.v.target;
                        if (srcarr === destarr) {
                            let lensrc;
                            const i = src.v.position;
                            const j = dest.v.position;
                            if (i < j) {
                                lensrc = rt.getFunc("global", "strlen", [pchar])(rt, null, src).v;
                                if ((i + lensrc + 1) >= j) {
                                    rt.raiseException("overlap is not allowed");
                                }
                            } else {
                                lensrc = rt.getFunc("global", "strlen", [pchar])(rt, null, src).v;
                                lendest = rt.getFunc("global", "strlen", [pchar])(rt, null, dest).v;
                                if ((j + lensrc + lendest + 1) >= i) {
                                    rt.raiseException("overlap is not allowed");
                                }
                            }
                        }
                        lendest = rt.getFunc("global", "strlen", [pchar])(rt, null, dest).v;
                        const pCharArr = rt.arrayPointerType(rt.charTypeLiteral, dest.t.size);
                        const newDest = rt.val(pCharArr, rt.makeArrayPointerValue(dest.v.target, dest.v.position + lendest));
                        return rt.getFunc("global", "strcpy", [
                            pchar,
                            pchar
                        ])(rt, null, newDest, src);
                    } else {
                        rt.raiseException("destination or source is not an array");
                    }
                    return dest;
                }), "global", "strcat", [
                    pchar,
                    pchar
                ], pchar);
                rt.regFunc((function (rt, _this, dest, src, num) {
                    if (rt.isArrayType(dest.t) && rt.isArrayType(src.t)) {
                        let lendest;
                        const srcarr = src.v.target;
                        const destarr = dest.v.target;
                        if (srcarr === destarr) {
                            let lensrc;
                            const i = src.v.position;
                            const j = dest.v.position;
                            const n = num.v;
                            if (i < j) {
                                lensrc = rt.getFunc("global", "strlen", [pchar])(rt, null, src).v;
                                if (lensrc > n) {
                                    lensrc = n;
                                }
                                if ((i + lensrc + 1) >= j) {
                                    rt.raiseException("overlap is not allowed");
                                }
                            } else {
                                lensrc = rt.getFunc("global", "strlen", [pchar])(rt, null, src).v;
                                if (lensrc > n) {
                                    lensrc = n;
                                }
                                lendest = rt.getFunc("global", "strlen", [pchar])(rt, null, dest).v;
                                if ((j + lensrc + lendest + 1) >= i) {
                                    rt.raiseException("overlap is not allowed");
                                }
                            }
                        }
                        lendest = rt.getFunc("global", "strlen", [pchar])(rt, null, dest).v;
                        const newDest = rt.val(pchar, rt.makeArrayPointerValue(dest.v.target, dest.v.position + lendest));
                        return rt.getFunc("global", "strncpy", [
                            pchar,
                            pchar,
                            sizet
                        ])(rt, null, newDest, src, num);
                    } else {
                        rt.raiseException("destination or source is not an array");
                    }
                    return dest;
                }), "global", "strncat", [
                    pchar,
                    pchar,
                    sizet
                ], pchar);
                rt.regFunc((function (rt, _this, str) {
                    if (rt.isArrayType(str)) {
                        const arr = str.v.target;
                        let i = str.v.position;
                        if (isNaN(arr[arr.length - 1].v)) arr[arr.length - 1].v = 0;
                        while ((i < arr.length) && (arr[i].v !== 0)) {
                            i++;
                        }
                        if (i === arr.length) {
                            return rt.raiseException("target string does not have a pending \"\\0\"");
                        } else {
                            return rt.val(rt.intTypeLiteral, i - str.v.position);
                        }
                    } else {
                        return rt.raiseException("target is not an array");
                    }
                }), "global", "strlen", [pchar], sizet);
                rt.regFunc((function (rt, _this, dest, src) {
                    if (rt.isArrayType(dest) && rt.isArrayType(src)) {
                        const srcarr = src.v.target;
                        let i = src.v.position;
                        const destarr = dest.v.target;
                        let j = dest.v.position;
                        if (isNaN(srcarr[srcarr.length - 1].v)) srcarr[srcarr.length - 1].v = 0;
                        if (isNaN(destarr[destarr.length - 1].v)) destarr[destarr.length - 1].v = 0;
                        while ((i < srcarr.length) && (j < destarr.length) && (srcarr[i].v === destarr[i].v)) {
                            i++;
                            j++;
                        }
                        if (i >= srcarr.length && j >= srcarr.length) {
                            return rt.val(rt.intTypeLiteral, 0);
                        }
                        return rt.val(rt.intTypeLiteral, destarr[i].v - srcarr[i].v);
                    } else {
                        return rt.raiseException("str1 or str2 is not an array");
                    }
                }), "global", "strcmp", [
                    pchar,
                    pchar
                ], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, dest, src, num) {
                    if (rt.isArrayType(dest) && rt.isArrayType(src)) {
                        const srcarr = src.v.target;
                        let i = src.v.position;
                        const destarr = dest.v.target;
                        let j = dest.v.position;
                        let n = num.v;
                        while ((n > 0) && (i < srcarr.length) && (j < destarr.length) && (srcarr[i].v === destarr[i].v)) {
                            i++;
                            j++;
                            n--;
                        }
                        return rt.val(rt.intTypeLiteral, destarr[i].v - srcarr[i].v);
                    } else {
                        return rt.raiseException("str1 or str2 is not an array");
                    }
                }), "global", "strncmp", [
                    pchar,
                    pchar,
                    sizet
                ], rt.intTypeLiteral);
                rt.regFunc((function (rt, _this, str, ch) {
                    if (rt.isArrayType(str)) {
                        const arr = str.v.target;
                        let i = str.v.position;
                        if (isNaN(arr[arr.length - 1].v)) arr[arr.length - 1].v = 0;
                        while ((i < arr.length) && (arr[i].v !== 0) && (arr[i].v !== ch.v)) {
                            i++;
                        }
                        if (arr[i].v === 0) {
                            return rt.val(pchar, rt.nullPointerValue);
                        } else if (arr[i].v === ch.v) {
                            return rt.val(pchar, rt.makeArrayPointerValue(arr, i));
                        } else {
                            return rt.raiseException("target string does not have a pending \"\\0\"");
                        }
                    } else {
                        return rt.raiseException("str1 or str2 is not an array");
                    }
                }), "global", "strchr", [
                    pchar,
                    rt.charTypeLiteral
                ], pchar);
                rt.regFunc((function (rt, _this, str, ch) {
                    if (rt.isArrayType(str)) {
                        const arr = str.v.target;
                        let i = str.v.position;
                        let lastpos = -1;
                        if (isNaN(arr[arr.length - 1].v)) arr[arr.length - 1].v = 0;
                        while ((i < arr.length) && (arr[i].v !== 0)) {
                            if (arr[i].v === ch.v) {
                                lastpos = i;
                            }
                            i++;
                        }
                        if (arr[i].v === 0) {
                            if (lastpos >= 0) {
                                return rt.val(pchar, rt.makeArrayPointerValue(arr, lastpos));
                            } else {
                                return rt.val(pchar, rt.nullPointerValue);
                            }
                        } else {
                            return rt.raiseException("target string does not have a pending \"\\0\"");
                        }
                    } else {
                        return rt.raiseException("str1 or str2 is not an array");
                    }
                }), "global", "strrchr", [
                    pchar,
                    rt.charTypeLiteral
                ], pchar);
                return rt.regFunc((function (rt, _this, str1, str2) {
                    if (rt.isArrayType(str1) && rt.isArrayType(str2)) {
                        const arr = str1.v.target;
                        let i = str1.v.position;
                        const tar = str2.v.target;
                        if (isNaN(arr[arr.length - 1].v)) arr[arr.length - 1].v = 0;
                        while ((i < arr.length) && (arr[i].v !== 0)) {
                            let j = str2.v.position;
                            let _i = i;
                            while ((j < tar.length) && (str1.v.target[_i].v === str2.v.target[j].v)) {
                                _i++;
                                j++;
                            }
                            if (j === tar.length) {
                                break;
                            }
                            i++;
                        }
                        if (arr[i].v === 0) {
                            return rt.val(pchar, rt.nullPointerValue);
                        } else if (i === arr.length) {
                            return rt.raiseException("target string does not have a pending \"\\0\"");
                        } else {
                            return rt.val(pchar, rt.makeArrayPointerValue(arr, i));
                        }
                    } else {
                        return rt.raiseException("str1 or str2 is not an array");
                    }
                }), "global", "strstr", [
                    pchar,
                    rt.charTypeLiteral
                ], pchar);
            }
        };
    },
    'ctime': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                const _time = function (rt, _this, i) {
                    const val = Math.floor(Date.now() / 1000);
                    return rt.val(rt.intTypeLiteral, val);
                };
                return rt.regFunc(_time, "global", "time", [rt.longTypeLiteral], rt.longTypeLiteral);
            }
        };
    },
    'dummy_class_foo': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                const type = rt.newClass("Foo", [{
                    name: "x",
                    type: rt.intTypeLiteral,
                    initialize(rt, _this) { return rt.val(rt.intTypeLiteral, 2, true); }
                }, {
                    name: "y",
                    type: rt.intTypeLiteral,
                    initialize(rt, _this) { return rt.val(rt.intTypeLiteral, -2, true); }
                }
                ]);
                const typeSig = rt.getTypeSignature(type);
                rt.types[typeSig].father = "object";
                const _plusX = function (rt, _this, a) {
                    const newValue = _this.v.members["x"].v + a.v;
                    return rt.val(rt.intTypeLiteral, newValue, false);
                };
                rt.regFunc(_plusX, type, "plusX", [rt.intTypeLiteral], rt.intTypeLiteral);
                let _userCallback;
                const _callback = function* (rt, _this, f, v) {
                    _userCallback = f;
                    const r = yield* f.v.target.v.target(rt, null, v);
                    return r;
                };
                rt.regFunc(_callback, type, "callback", [
                    rt.functionPointerType(rt.intTypeLiteral, [
                        rt.normalPointerType(rt.intTypeLiteral)
                    ]),
                    rt.normalPointerType(rt.intTypeLiteral)
                ], rt.intTypeLiteral);
            }
        };
    },
    'iomanip': function (require, module, exports) {
        "use strict";
        module.exports = {
            load(rt) {
                const type = rt.newClass("iomanipulator", []);
                const oType = rt.simpleType("ostream");
                const _setprecesion = (rt, _this, x) => ({
                    t: type,
                    v: {
                        name: "setprecision",
                        f(config) {
                            config.setprecision = x.v;
                        }
                    },
                    left: false
                });
                rt.regFunc(_setprecesion, "global", "setprecision", [rt.intTypeLiteral], type);
                const _fixed = {
                    t: type,
                    v: {
                        name: "fixed",
                        f(config) {
                            config.fixed = true;
                        }
                    }
                };
                rt.scope[0].variables["fixed"] = _fixed;
                const _setw = (rt, _this, x) => ({
                    t: type,
                    v: {
                        name: "setw",
                        f(config) {
                            config.setw = x.v;
                        }
                    }
                });
                rt.regFunc(_setw, "global", "setw", [rt.intTypeLiteral], type);
                const _setfill = (rt, _this, x) => ({
                    t: type,
                    v: {
                        name: "setfill",
                        f(config) {
                            config.setfill = String.fromCharCode(x.v);
                        }
                    }
                });
                rt.regFunc(_setfill, "global", "setfill", [rt.charTypeLiteral], type);
                const _addManipulator = function (rt, _cout, m) {
                    if (!_cout.manipulators) {
                        _cout.manipulators = {
                            config: {},
                            active: {},
                            use(o) {
                                let tarStr;
                                if (rt.isNumericType(o) && rt.isFloatType(o)) {
                                    if (this.active.fixed) {
                                        const prec = (this.active.setprecision != null) ?
                                            this.config.setprecision
                                            :
                                            6;
                                        tarStr = o.v.toFixed(prec);
                                    } else if (this.active.setprecision != null) {
                                        tarStr = o.v.toPrecision(this.config.setprecision).replace(/0+$/, "");
                                    }
                                }
                                if (this.active.setw != null) {
                                    let fill;
                                    if (this.active.setfill != null) {
                                        fill = this.config.setfill;
                                    } else {
                                        fill = " ";
                                    }
                                    if (!(rt.isTypeEqualTo(o.t, rt.charTypeLiteral) && ((o.v === 10) || (o.v === 13)))) {
                                        if (!tarStr) {
                                            tarStr = rt.isPrimitiveType(o) ?
                                                o.t.name.indexOf("char") >= 0 ?
                                                    String.fromCharCode(o.v)
                                                    : o.t.name === "bool" ?
                                                        o.v ? "1" : "0"
                                                        :
                                                        o.v.toString()
                                                : rt.isStringType(o) ?
                                                    rt.charArray_getJSString(o)
                                                    :
                                                    rt.raiseException("<< operator in ostream cannot accept " + rt.makeTypeString(o.t));
                                        }
                                        for (let i = 0, end = this.config.setw - tarStr.length; i < end; i++) {
                                            tarStr = fill + tarStr;
                                        }
                                        delete this.active.setw;
                                    }
                                }
                                if (tarStr != null) {
                                    return rt.charArray_makeFromJSString(tarStr);
                                } else {
                                    return o;
                                }
                            }
                        };
                    }
                    m.v.f(_cout.manipulators.config);
                    _cout.manipulators.active[m.v.name] = m.v.f;
                    return _cout;
                };
                rt.regOperator(_addManipulator, oType, "<<", [type], oType);
            }
        };
    },
    'iostream': function (require, module, exports) {
        "use strict";
        const _skipSpace = function (s) {
            const r = /^\s*/.exec(s);
            if (r && (r.length > 0)) {
                return s.substring(r[0].length);
            } else {
                return s;
            }
        };
        const _read = function (rt, reg, buf, type) {
            const r = reg.exec(buf);
            if ((r == null) || (r.length === 0)) {
                rt.raiseException("input format mismatch " + rt.makeTypeString(type) + " with buffer=" + buf);
            } else {
                return r;
            }
        };
        module.exports = {
            load(rt) {
                const { stdio } = rt.config;
                const cinType = rt.newClass("istream", []);
                const cin = {
                    t: cinType,
                    v: {
                        buf: stdio.drain(),
                        istream: stdio,
                        members: {}
                    },
                    left: false
                };
                rt.scope[0].variables["cin"] = cin;
                const pchar = rt.normalPointerType(rt.charTypeLiteral);
                rt.types[rt.getTypeSignature(cinType)] = {
                    father: "object",
                    handlers: {
                        "o(>>)": {
                            default(rt, _cin, t) {
                                if (!t.left) {
                                    rt.raiseException("only left value can be used as storage");
                                }
                                if (!rt.isPrimitiveType(t.t)) {
                                    rt.raiseException(">> operator in istream cannot accept " + rt.makeTypeString(t.t));
                                }
                                let b = _cin.v.buf;
                                _cin.v.eofbit = b.length === 0;
                                let r;
                                let v;
                                switch (t.t.name) {
                                    case "char":
                                        // VITTA WARNING: remove "signed char" and "unsigned char" from this behavior
                                        b = _skipSpace(b);
                                        r = _read(rt, /^./, b, t.t);
                                        v = r[0].charCodeAt(0);
                                        break;
                                    // END VITTA WARNING:
                                    case "signed char":
                                    case "unsigned char":
                                    case "short":
                                    case "short int":
                                    case "signed short":
                                    case "signed short int":
                                    case "unsigned short":
                                    case "unsigned short int":
                                    case "int":
                                    case "signed int":
                                    case "unsigned":
                                    case "unsigned int":
                                    case "long":
                                    case "long int":
                                    case "signed long":
                                    case "signed long int":
                                    case "unsigned long":
                                    case "unsigned long int":
                                    case "long long":
                                    case "long long int":
                                    case "signed long long":
                                    case "signed long long int":
                                    case "unsigned long long":
                                    case "unsigned long long int":
                                        b = _skipSpace(b);
                                        r = _read(rt, /^[-+]?(?:([0-9]*)([eE]\+?[0-9]+)?)|0/, b, t.t);
                                        v = parseInt(r[0], 10);
                                        break;
                                    case "float":
                                    case "double":
                                        b = _skipSpace(b);
                                        r = _read(rt, /^[-+]?(?:[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?)|(?:([1-9][0-9]*)([eE]\+?[0-9]+)?)/, b, t.t);
                                        v = parseFloat(r[0]);
                                        break;
                                    case "bool":
                                        b = _skipSpace(b);
                                        r = _read(rt, /^(true|false)/, b, t.t);
                                        v = r[0] === "true";
                                        break;
                                    default:
                                        rt.raiseException(">> operator in istream cannot accept " + rt.makeTypeString(t.t));
                                }
                                const len = r[0].length;
                                _cin.v.failbit = len === 0;
                                if (!_cin.v.failbit) {
                                    t.v = rt.val(t.t, v).v;
                                    _cin.v.buf = b.substring(len);
                                }
                                return _cin;
                            }
                        }
                    }
                };
                const _cinString = function (rt, _cin, t) {
                    if (!rt.isStringType(t.t)) {
                        rt.raiseException("only a pointer to string can be used as storage");
                    }
                    let b = _cin.v.buf;
                    _cin.v.eofbit = b.length === 0;
                    b = _skipSpace(b);
                    const r = _read(rt, /^\S*/, b, t.t)[0];
                    _cin.v.failbit = r.length === 0;
                    _cin.v.buf = b.substring(r.length);
                    const initialPos = t.v.position;
                    const tar = t.v.target;
                    if ((tar.length - initialPos) <= r.length) {
                        rt.raiseException(`target string buffer is ${r.length - (tar.length - initialPos)} too short`);
                    }
                    for (let i = 0, end = r.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        tar[i + initialPos] = rt.val(rt.charTypeLiteral, r.charCodeAt(i));
                    }
                    tar[r.length + initialPos] = rt.val(rt.charTypeLiteral, 0);
                    return _cin;
                };
                rt.regOperator(_cinString, cin.t, ">>", [pchar], cin.t);
                const _getline = function (rt, _cin, t, limitV, delimV) {
                    let removeDelim;
                    if (!rt.isStringType(t.t)) {
                        rt.raiseException("only a pointer to string can be used as storage");
                    }
                    const limit = limitV.v;
                    const delim = (delimV != null) ?
                        String.fromCharCode(delimV.v)
                        :
                        '\n';
                    const b = _cin.v.buf;
                    _cin.v.eofbit = b.length === 0;
                    let r = _read(rt, new RegExp(`^[^${delim}]*`), b, t.t)[0];
                    if ((r.length + 1) > limit) {
                        r = r.substring(0, limit - 1);
                    }
                    if (b.charAt(r.length) === delim.charAt(0)) {
                        removeDelim = true;
                        _cin.v.failbit = false;
                    } else {
                        _cin.v.failbit = r.length === 0;
                    }
                    _cin.v.buf = b.substring(r.length + (removeDelim ? 1 : 0));
                    const initialPos = t.v.position;
                    const tar = t.v.target;
                    if ((tar.length - initialPos) <= r.length) {
                        rt.raiseException(`target string buffer is ${r.length - (tar.length - initialPos)} too short`);
                    }
                    for (let i = 0, end = r.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        tar[i + initialPos] = rt.val(rt.charTypeLiteral, r.charCodeAt(i));
                    }
                    tar[r.length + initialPos] = rt.val(rt.charTypeLiteral, 0);
                    return _cin;
                };
                rt.regFunc(_getline, cin.t, "getline", [pchar, rt.intTypeLiteral, rt.charTypeLiteral], cin.t);
                rt.regFunc(_getline, cin.t, "getline", [pchar, rt.intTypeLiteral], cin.t);
                const _get = function (rt, _cin) {
                    const b = _cin.v.buf;
                    _cin.v.eofbit = b.length === 0;
                    if (_cin.v.eofbit) {
                        return rt.val(rt.intTypeLiteral, -1);
                    } else {
                        const r = _read(rt, /^.|[\r\n]/, b, rt.charTypeLiteral);
                        _cin.v.buf = b.substring(r.length);
                        const v = r[0].charCodeAt(0);
                        return rt.val(rt.intTypeLiteral, v);
                    }
                };
                rt.regFunc(_get, cin.t, "get", [], rt.intTypeLiteral);
                const _bool = (rt, _cin) => rt.val(rt.boolTypeLiteral, !_cin.v.failbit);
                rt.regOperator(_bool, cin.t, "bool", [], rt.boolTypeLiteral);
                const coutType = rt.newClass("ostream", []);
                const cout = {
                    t: coutType,
                    v: {
                        ostream: stdio,
                        members: {}
                    },
                    left: false
                };
                rt.scope[0].variables["cout"] = cout;
                rt.types[rt.getTypeSignature(cout.t)] = {
                    father: "object",
                    handlers: {
                        "o(<<)": {
                            default(rt, _cout, t) {
                                let r;
                                if (_cout.manipulators != null) {
                                    t = _cout.manipulators.use(t);
                                }
                                if (rt.isPrimitiveType(t.t)) {
                                    if (t.t.name.indexOf("char") >= 0) {
                                        r = String.fromCharCode(t.v);
                                    } else if (t.t.name === "bool") {
                                        r = t.v ? "1" : "0";
                                    } else {
                                        r = t.v.toString();
                                    }
                                } else if (rt.isStringType(t)) {
                                    r = rt.charArray_getJSString(t);
                                } else {
                                    rt.raiseException("<< operator in ostream cannot accept " + rt.makeTypeString(t.t));
                                }
                                _cout.v.ostream.write(r);
                                return _cout;
                            }
                        }
                    }
                };
                const endl = rt.val(rt.charTypeLiteral, "\n".charCodeAt(0));
                rt.scope[0].variables["endl"] = endl;
            }
        };
    },
    'cstring_strcpy': function (require, module, exports) {
        "use strict";
        module.exports = function (rt, _this, dest, src) {
            if (rt.isArrayType(dest) && rt.isArrayType(src)) {
                const srcarr = src.v.target;
                let i = src.v.position;
                const destarr = dest.v.target;
                let j = dest.v.position;
                if (isNaN(srcarr[srcarr.length - 1].v)) srcarr[srcarr.length - 1].v = 0;
                if (isNaN(destarr[destarr.length - 1].v)) destarr[destarr.length - 1].v = 0;
                while ((i < srcarr.length) && (srcarr[i].v !== 0) && (j < destarr.length)) {
                    destarr[j] = rt.clone(srcarr[i]);
                    i++;
                    j++;
                }
                if (i === srcarr.length) {
                    rt.raiseException("source string does not have a pending \"\\0\"");
                } else {
                    destarr[j] = rt.val(rt.charTypeLiteral, 0);
                }
            } else {
                rt.raiseException("destination or source is not an array");
            }
            return dest;
        };
    },
    'interpreter': function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Interpreter = exports.BaseInterpreter = void 0;
        const sampleGeneratorFunction = function* () {
            return yield null;
        };
        const sampleGenerator = sampleGeneratorFunction();
        const isGenerator = (g) => {
            return (g != null ? g.constructor : undefined) === sampleGenerator.constructor;
        };
        const isGeneratorFunction = (f) => {
            return (f != null ? f.constructor : undefined) === sampleGeneratorFunction.constructor;
        };
        class BaseInterpreter {
            constructor(rt) {
                this.rt = rt;
            }
        }
        exports.BaseInterpreter = BaseInterpreter;
        function isIterable(obj) {
            if (obj == null) {
                return false;
            }
            return typeof obj[Symbol.iterator] === 'function';
        }
        class Interpreter extends BaseInterpreter {
            constructor(rt) {
                super(rt);
                this.visitors = {
                    *TranslationUnit(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        let i = 0;
                        while (i < s.ExternalDeclarations.length) {
                            const dec = s.ExternalDeclarations[i];
                            yield* interp.visit(interp, dec);
                            i++;
                        }
                    },
                    *DirectDeclarator(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        let { basetype } = param;
                        basetype = interp.buildRecursivePointerType(s.Pointer, basetype, 0);
                        if (s.right.length === 1) {
                            let varargs;
                            const right = s.right[0];
                            let ptl = null;
                            if (right.type === "DirectDeclarator_modifier_ParameterTypeList") {
                                ptl = right.ParameterTypeList;
                                ({
                                    varargs
                                } = ptl);
                            } else if ((right.type === "DirectDeclarator_modifier_IdentifierList") && (right.IdentifierList === null)) {
                                ptl = right.ParameterTypeList;
                                varargs = false;
                            }
                            if (ptl != null) {
                                const argTypes = [];
                                for (const _param of ptl.ParameterList) {
                                    const _basetype = rt.simpleType(_param.DeclarationSpecifiers);
                                    let _type;
                                    if (_param.Declarator != null) {
                                        const _pointer = _param.Declarator.Pointer;
                                        _type = interp.buildRecursivePointerType(_pointer, _basetype, 0);
                                        if ((_param.Declarator.right != null) && (_param.Declarator.right.length > 0)) {
                                            const dimensions = [];
                                            for (let j = 0; j < _param.Declarator.right.length; j++) {
                                                let dim = _param.Declarator.right[j];
                                                if (dim.type !== "DirectDeclarator_modifier_array") {
                                                    rt.raiseException("unacceptable array initialization", dim);
                                                }
                                                if (dim.Expression !== null) {
                                                    dim = rt.cast(rt.intTypeLiteral, (yield* interp.visit(interp, dim.Expression, param))).v;
                                                } else if (j > 0) {
                                                    rt.raiseException("multidimensional array must have bounds for all dimensions except the first", dim);
                                                } else {
                                                    dim = -1;
                                                }
                                                dimensions.push(dim);
                                            }
                                            _type = interp.arrayType(dimensions, _type);
                                        }
                                    } else {
                                        _type = _basetype;
                                    }
                                    argTypes.push(_type);
                                }
                                basetype = rt.functionType(basetype, argTypes);
                            }
                        }
                        if ((s.right.length > 0) && (s.right[0].type === "DirectDeclarator_modifier_array")) {
                            const dimensions = [];
                            for (let j = 0; j < s.right.length; j++) {
                                let dim = s.right[j];
                                if (dim.type !== "DirectDeclarator_modifier_array") {
                                    rt.raiseException("unacceptable array initialization", dim);
                                }
                                if (dim.Expression !== null) {
                                    dim = rt.cast(rt.intTypeLiteral, (yield* interp.visit(interp, dim.Expression, param))).v;
                                } else if (j > 0) {
                                    rt.raiseException("multidimensional array must have bounds for all dimensions except the first", dim);
                                } else {
                                    dim = -1;
                                }
                                dimensions.push(dim);
                            }
                            basetype = interp.arrayType(dimensions, basetype);
                        }
                        if (s.left.type === "Identifier") {
                            return { type: basetype, name: s.left.Identifier };
                        } else {
                            const _basetype = param.basetype;
                            param.basetype = basetype;
                            const ret = yield* interp.visit(interp, s.left, param);
                            param.basetype = _basetype;
                            return ret;
                        }
                    },
                    *TypedefDeclaration(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const basetype = rt.simpleType(s.DeclarationSpecifiers);
                        const _basetype = param.basetype;
                        param.basetype = basetype;
                        for (const declarator of s.Declarators) {
                            const { type, name } = yield* interp.visit(interp, declarator, param);
                            rt.registerTypedef(type, name);
                        }
                        param.basetype = _basetype;
                    },
                    *ParameterTypeList(interp, s, param) {
                        const argTypes = [];
                        const argNames = [];
                        const optionalArgs = [];
                        let i = 0;
                        while (i < s.ParameterList.length) {
                            const _param = s.ParameterList[i];
                            let _type;
                            let _init = null;
                            let _name = null;
                            if (param.insideDirectDeclarator_modifier_ParameterTypeList) {
                                const _basetype = rt.simpleType(_param.DeclarationSpecifiers);
                                _type = _basetype;
                            } else {
                                if (_param.Declarator == null) {
                                    rt.raiseException("missing declarator for argument", _param);
                                }
                                _init = _param.Declarator.Initializers;
                                const _pointer = _param.Declarator.Declarator.Pointer;
                                const _basetype = rt.simpleType(_param.DeclarationSpecifiers);
                                _type = interp.buildRecursivePointerType(_pointer, _basetype, 0);
                                if (_param.Declarator.Declarator.left.type === "DirectDeclarator") {
                                    const __basetype = param.basetype;
                                    param.basetype = _basetype;
                                    const { name, type } = yield* interp.visit(interp, _param.Declarator.Declarator.left, param);
                                    param.basetype = __basetype;
                                    _name = name;
                                } else {
                                    _name = _param.Declarator.Declarator.left.Identifier;
                                }
                                if (_param.Declarator.Declarator.right.length > 0) {
                                    if (_param.Declarator.Declarator.right[0].type === "DirectDeclarator_modifier_ParameterTypeList") {
                                        const dim = _param.Declarator.Declarator.right[0];
                                        param.insideDirectDeclarator_modifier_ParameterTypeList = true;
                                        const { argTypes: _argTypes, argNames: _argNames, optionalArgs: _optionalArgs } = yield* interp.visit(interp, dim.ParameterTypeList, param);
                                        param.insideDirectDeclarator_modifier_ParameterTypeList = false;
                                        _type = rt.functionPointerType(_type, _argTypes);
                                    } else {
                                        const dimensions = [];
                                        let j = 0;
                                        while (j < _param.Declarator.Declarator.right.length) {
                                            let dim = _param.Declarator.Declarator.right[j];
                                            if (dim.type !== "DirectDeclarator_modifier_array") {
                                                rt.raiseException("unacceptable array initialization", dim);
                                            }
                                            if (dim.Expression !== null) {
                                                dim = rt.cast(rt.intTypeLiteral, (yield* interp.visit(interp, dim.Expression, param))).v;
                                            } else if (j > 0) {
                                                rt.raiseException("multidimensional array must have bounds for all dimensions except the first", dim);
                                            } else {
                                                dim = -1;
                                            }
                                            dimensions.push(dim);
                                            j++;
                                        }
                                        _type = interp.arrayType(dimensions, _type);
                                    }
                                }
                            }
                            if (_init != null) {
                                optionalArgs.push({
                                    type: _type,
                                    name: _name,
                                    expression: _init.Expression
                                });
                            } else {
                                if (optionalArgs.length > 0) {
                                    rt.raiseException("all default arguments must be at the end of arguments list", _param);
                                }
                                argTypes.push(_type);
                                argNames.push(_name);
                            }
                            i++;
                        }
                        return { argTypes, argNames, optionalArgs };
                    },
                    *FunctionDefinition(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const { scope } = param;
                        const name = s.Declarator.left.Identifier;
                        let basetype = rt.simpleType(s.DeclarationSpecifiers);
                        const pointer = s.Declarator.Pointer;
                        basetype = interp.buildRecursivePointerType(pointer, basetype, 0);
                        let ptl;
                        let varargs;
                        if (s.Declarator.right.type === "DirectDeclarator_modifier_ParameterTypeList") {
                            ptl = s.Declarator.right.ParameterTypeList;
                            ({
                                varargs
                            } = ptl);
                        } else if ((s.Declarator.right.type === "DirectDeclarator_modifier_IdentifierList") && (s.Declarator.right.IdentifierList === null)) {
                            ptl = { ParameterList: [] };
                            varargs = false;
                        } else {
                            rt.raiseException("unacceptable argument list", s.Declarator.right);
                        }
                        const { argTypes, argNames, optionalArgs } = yield* interp.visit(interp, ptl, param);
                        const stat = s.CompoundStatement;
                        rt.defFunc(scope, name, basetype, argTypes, argNames, stat, interp, optionalArgs);
                    },
                    *Declaration(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const basetype = rt.simpleType(s.DeclarationSpecifiers);
                        for (const dec of s.InitDeclaratorList) {
                            let init = dec.Initializers;
                            if ((dec.Declarator.right.length > 0) && (dec.Declarator.right[0].type === "DirectDeclarator_modifier_array")) {
                                const dimensions = [];
                                for (let j = 0; j < dec.Declarator.right.length; j++) {
                                    let dim = dec.Declarator.right[j];
                                    if (dim.Expression !== null) {
                                        dim = rt.cast(rt.intTypeLiteral, (yield* interp.visit(interp, dim.Expression, param))).v;
                                    } else if (j > 0) {
                                        rt.raiseException("multidimensional array must have bounds for all dimensions except the first", dim);
                                    } else {
                                        if (init.type === "Initializer_expr") {
                                            const initializer = yield* interp.visit(interp, init, param);
                                            if (rt.isCharType(basetype) && rt.isArrayType(initializer) && rt.isCharType(initializer.t.eleType)) {
                                                dim = initializer.v.target.length;
                                                init = {
                                                    type: "Initializer_array",
                                                    Initializers: initializer.v.target.map(e => ({
                                                        type: "Initializer_expr",
                                                        shorthand: e
                                                    }))
                                                };
                                            } else {
                                                rt.raiseException("cannot initialize an array to " + rt.makeValString(initializer), init);
                                            }
                                        } else {
                                            dim = init.Initializers.length;
                                        }
                                    }
                                    dimensions.push(dim);
                                }
                                param.node = init;
                                init = yield* interp.arrayInit(dimensions, init, basetype, param);
                                delete param.node;
                                const _basetype = param.basetype;
                                param.basetype = basetype;
                                const { name, type } = yield* interp.visit(interp, dec.Declarator, param);
                                param.basetype = _basetype;
                                rt.defVar(name, init.t, init);
                            } else {
                                const _basetype = param.basetype;
                                param.basetype = basetype;
                                const { name, type } = yield* interp.visit(interp, dec.Declarator, param);
                                param.basetype = _basetype;
                                if ((init == null)) {
                                    init = rt.defaultValue(type, true);
                                } else {
                                    init = yield* interp.visit(interp, init.Expression);
                                }
                                rt.defVar(name, type, init);
                            }
                        }
                    },
                    *Initializer_expr(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return yield* interp.visit(interp, s.Expression, param);
                    },
                    *Label_case(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ce = yield* interp.visit(interp, s.ConstantExpression);
                        if (param["switch"] === undefined) {
                            rt.raiseException("you cannot use case outside switch block");
                        }
                        if (param.scope === "SelectionStatement_switch_cs") {
                            return [
                                "switch",
                                rt.cast(ce.t, param["switch"]).v === ce.v
                            ];
                        } else {
                            rt.raiseException("you can only use case directly in a switch block");
                        }
                    },
                    Label_default(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        if (param["switch"] === undefined) {
                            rt.raiseException("you cannot use default outside switch block");
                        }
                        if (param.scope === "SelectionStatement_switch_cs") {
                            return [
                                "switch",
                                true
                            ];
                        } else {
                            rt.raiseException("you can only use default directly in a switch block");
                        }
                    },
                    *CompoundStatement(interp, s, param) {
                        let stmt;
                        ({
                            rt
                        } = interp);
                        const stmts = s.Statements;
                        let r;
                        let i;
                        const _scope = param.scope;
                        if (param.scope === "SelectionStatement_switch") {
                            param.scope = "SelectionStatement_switch_cs";
                            rt.enterScope(param.scope);
                            let switchon = false;
                            i = 0;
                            while (i < stmts.length) {
                                stmt = stmts[i];
                                if ((stmt.type === "Label_case") || (stmt.type === "Label_default")) {
                                    r = yield* interp.visit(interp, stmt, param);
                                    if (r[1]) {
                                        switchon = true;
                                    }
                                } else if (switchon) {
                                    r = yield* interp.visit(interp, stmt, param);
                                    if (r instanceof Array) {
                                        return r;
                                    }
                                }
                                i++;
                            }
                            rt.exitScope(param.scope);
                            param.scope = _scope;
                        } else {
                            param.scope = "CompoundStatement";
                            rt.enterScope(param.scope);
                            for (stmt of stmts) {
                                r = yield* interp.visit(interp, stmt, param);
                                if (r instanceof Array) {
                                    break;
                                }
                            }
                            rt.exitScope(param.scope);
                            param.scope = _scope;
                            return r;
                        }
                    },
                    *ExpressionStatement(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        if (s.Expression != null) {
                            yield* interp.visit(interp, s.Expression, param);
                        }
                    },
                    *SelectionStatement_if(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const scope_bak = param.scope;
                        param.scope = "SelectionStatement_if";
                        rt.enterScope(param.scope);
                        const e = yield* interp.visit(interp, s.Expression, param);
                        let ret;
                        if (rt.cast(rt.boolTypeLiteral, e).v) {
                            ret = yield* interp.visit(interp, s.Statement, param);
                        } else if (s.ElseStatement) {
                            ret = yield* interp.visit(interp, s.ElseStatement, param);
                        }
                        rt.exitScope(param.scope);
                        param.scope = scope_bak;
                        return ret;
                    },
                    *SelectionStatement_switch(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const scope_bak = param.scope;
                        param.scope = "SelectionStatement_switch";
                        rt.enterScope(param.scope);
                        const e = yield* interp.visit(interp, s.Expression, param);
                        const switch_bak = param["switch"];
                        param["switch"] = e;
                        const r = yield* interp.visit(interp, s.Statement, param);
                        param["switch"] = switch_bak;
                        let ret;
                        if (r instanceof Array) {
                            if (r[0] !== "break") {
                                ret = r;
                            }
                        }
                        rt.exitScope(param.scope);
                        param.scope = scope_bak;
                        return ret;
                    },
                    *IterationStatement_while(interp, s, param) {
                        let return_val;
                        ({
                            rt
                        } = interp);
                        const scope_bak = param.scope;
                        param.scope = "IterationStatement_while";
                        rt.enterScope(param.scope);
                        while (true) {
                            // VITTA WARNING: Add flag entering in loops
                            Simulator.loopStep = true;
                            // END of VITTA WARNING
                            if (s.Expression != null) {
                                let cond = yield* interp.visit(interp, s.Expression, param);
                                cond = rt.cast(rt.boolTypeLiteral, cond).v;
                                if (!cond) {
                                    break;
                                }
                            }
                            const r = yield* interp.visit(interp, s.Statement, param);
                            if (r instanceof Array) {
                                let end_loop;
                                switch (r[0]) {
                                    case "continue":
                                        break;
                                    case "break":
                                        end_loop = true;
                                        break;
                                    case "return":
                                        return_val = r;
                                        end_loop = true;
                                        break;
                                }
                                if (end_loop) {
                                    break;
                                }
                            }
                        }
                        rt.exitScope(param.scope);
                        param.scope = scope_bak;
                        return return_val;
                    },
                    *IterationStatement_do(interp, s, param) {
                        let return_val;
                        ({
                            rt
                        } = interp);
                        const scope_bak = param.scope;
                        param.scope = "IterationStatement_do";
                        rt.enterScope(param.scope);
                        while (true) {
                            const r = yield* interp.visit(interp, s.Statement, param);
                            if (r instanceof Array) {
                                let end_loop;
                                switch (r[0]) {
                                    case "continue":
                                        break;
                                    case "break":
                                        end_loop = true;
                                        break;
                                    case "return":
                                        return_val = r;
                                        end_loop = true;
                                        break;
                                }
                                if (end_loop) {
                                    break;
                                }
                            }
                            if (s.Expression != null) {
                                let cond = yield* interp.visit(interp, s.Expression, param);
                                cond = rt.cast(rt.boolTypeLiteral, cond).v;
                                if (!cond) {
                                    break;
                                }
                            }
                        }
                        rt.exitScope(param.scope);
                        param.scope = scope_bak;
                        return return_val;
                    },
                    *IterationStatement_for(interp, s, param) {
                        let return_val;
                        ({
                            rt
                        } = interp);
                        const scope_bak = param.scope;
                        param.scope = "IterationStatement_for";
                        rt.enterScope(param.scope);
                        if (s.Initializer) {
                            if (s.Initializer.type === "Declaration") {
                                yield* interp.visit(interp, s.Initializer, param);
                            } else {
                                yield* interp.visit(interp, s.Initializer, param);
                            }
                        }
                        while (true) {
                            if (s.Expression != null) {
                                let cond = yield* interp.visit(interp, s.Expression, param);
                                cond = rt.cast(rt.boolTypeLiteral, cond).v;
                                if (!cond) {
                                    break;
                                }
                            }
                            const r = yield* interp.visit(interp, s.Statement, param);
                            if (r instanceof Array) {
                                let end_loop;
                                switch (r[0]) {
                                    case "continue":
                                        break;
                                    case "break":
                                        end_loop = true;
                                        break;
                                    case "return":
                                        return_val = r;
                                        end_loop = true;
                                        break;
                                }
                                if (end_loop) {
                                    break;
                                }
                            }
                            if (s.Loop) {
                                yield* interp.visit(interp, s.Loop, param);
                            }
                        }
                        rt.exitScope(param.scope);
                        param.scope = scope_bak;
                        return return_val;
                    },
                    JumpStatement_goto(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        rt.raiseException("not implemented");
                    },
                    JumpStatement_continue(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return ["continue"];
                    },
                    JumpStatement_break(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return ["break"];
                    },
                    *JumpStatement_return(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        if (s.Expression) {
                            const ret = yield* interp.visit(interp, s.Expression, param);
                            return [
                                "return",
                                ret
                            ];
                        }
                        return ["return"];
                    },
                    IdentifierExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.readVar(s.Identifier);
                    },
                    *ParenthesesExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return yield* interp.visit(interp, s.Expression, param);
                    },
                    *PostfixExpression_ArrayAccess(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const index = yield* interp.visit(interp, s.index, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName("[]"), [index.t])(rt, ret, index);
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *PostfixExpression_MethodInvocation(interp, s, param) {
                        let bindThis;
                        ({ rt } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const args = yield* (function* () {
                            const result = [];
                            for (const e of s.args) {
                                const thisArg = yield* interp.visit(interp, e, param);
                                result.push(thisArg);
                            }
                            return result;
                        }).call(this);
                        if (!ret) {
                            rt.raiseException("class <b>" + s.Expression.Expression.Identifier + "</b> has no method named <b>" + s.Expression.member + "()</b>");
                        }
                        if (ret.v.bindThis != null) {
                            ({ bindThis } = ret.v);
                        } else {
                            bindThis = ret;
                        }
                        // VITTA WARNING: async calling of cpp functions
                        const caller = () => rt.getFunc(ret.t, rt.makeOperatorFuncName("()"), args.map(e => e.t))(rt, ret, bindThis, ...args);
                        try {
                            const r = caller();
                            if (isGenerator(r)) {
                                return yield* r;
                            } else {
                                return r;
                            }
                        } catch (e) {
                            if (e && e.type === rt.SUSPEND_TOKEN) {
                                const yielded = yield e;
                                const r2 = caller();
                                if (isGenerator(r2)) {
                                    return yield* r2;
                                } else {
                                    return r2;
                                }
                            }
                            console.warn("[Suspension] Redirect error from 'PostfixExpression_MethodInvocation'.");
                            throw e;
                        }
                        // END VITTA WARNING
                    },
                    *PostfixExpression_MemberAccess(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        return rt.getMember(ret, s.member);
                    },
                    *PostfixExpression_MemberPointerAccess(interp, s, param) {
                        let r;
                        ({
                            rt
                        } = interp);
                        let ret = yield* interp.visit(interp, s.Expression, param);
                        if (rt.isPointerType(ret.t) && !rt.isFunctionType(ret.t)) {
                            const { member } = s;
                            ret = yield* rt.getFunc(ret.t, rt.makeOperatorFuncName("->"), [])(rt, ret);
                            return rt.getMember(ret, member);
                        } else {
                            const expression = { type: "IdentifierExpression", Identifier: s.member };
                            const member = yield* interp.visit(interp, expression, param);
                            ret = yield* rt.getFunc(ret.t, rt.makeOperatorFuncName("->"), [member.t])(rt, ret);
                            return rt.getMember(ret, member);
                        }
                    },
                    *PostfixExpression_PostIncrement(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName("++"), ["dummy"])(rt, ret, {
                            t: "dummy",
                            v: null
                        });
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *PostfixExpression_PostDecrement(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName("--"), ["dummy"])(rt, ret, {
                            t: "dummy",
                            v: null
                        });
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *UnaryExpression_PreIncrement(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName("++"), [])(rt, ret);
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *UnaryExpression_PreDecrement(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName("--"), [])(rt, ret);
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *UnaryExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const r = rt.getFunc(ret.t, rt.makeOperatorFuncName(s.op), [])(rt, ret);
                        if (isGenerator(r)) {
                            return yield* r;
                        } else {
                            return r;
                        }
                    },
                    *UnaryExpression_Sizeof_Expr(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        return rt.val(rt.intTypeLiteral, rt.getSize(ret));
                    },
                    *UnaryExpression_Sizeof_Type(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const type = yield* interp.visit(interp, s.TypeName, param);
                        return rt.val(rt.intTypeLiteral, rt.getSizeByType(type));
                    },
                    *CastExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const ret = yield* interp.visit(interp, s.Expression, param);
                        const type = yield* interp.visit(interp, s.TypeName, param);
                        return rt.cast(type, ret);
                    },
                    TypeName(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const typename = [];
                        for (const baseType of s.base) {
                            if (baseType !== "const") {
                                typename.push(baseType);
                            }
                        }
                        return rt.simpleType(typename);
                    },
                    *BinOpExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const { op } = s;
                        if (op === "&&") {
                            s.type = "LogicalANDExpression";
                            return yield* interp.visit(interp, s, param);
                        } else if (op === "||") {
                            s.type = "LogicalORExpression";
                            return yield* interp.visit(interp, s, param);
                        } else {
                            const left = yield* interp.visit(interp, s.left, param);
                            const right = yield* interp.visit(interp, s.right, param);
                            const r = rt.getFunc(left.t, rt.makeOperatorFuncName(op), [right.t])(rt, left, right);
                            if (isGenerator(r)) {
                                return yield* r;
                            } else {
                                return r;
                            }
                        }
                    },
                    *LogicalANDExpression(interp, s, param) {
                        let right;
                        ({
                            rt
                        } = interp);
                        const left = yield* interp.visit(interp, s.left, param);
                        const lt = rt.types[rt.getTypeSignature(left.t)];
                        if ("&&" in lt) {
                            right = yield* interp.visit(interp, s.right, param);
                            const r = rt.getFunc(left.t, rt.makeOperatorFuncName("&&"), [right.t])(rt, left, right);
                            if (isGenerator(r)) {
                                return yield* r;
                            } else {
                                return r;
                            }
                        } else {
                            if (rt.cast(rt.boolTypeLiteral, left).v) {
                                return yield* interp.visit(interp, s.right, param);
                            } else {
                                return left;
                            }
                        }
                    },
                    *LogicalORExpression(interp, s, param) {
                        let right;
                        ({
                            rt
                        } = interp);
                        const left = yield* interp.visit(interp, s.left, param);
                        const lt = rt.types[rt.getTypeSignature(left.t)];
                        if ("||" in lt) {
                            right = yield* interp.visit(interp, s.right, param);
                            const r = rt.getFunc(left.t, rt.makeOperatorFuncName("||"), [right.t])(rt, left, right);
                            if (isGenerator(r)) {
                                return yield* r;
                            } else {
                                return r;
                            }
                        } else {
                            if (rt.cast(rt.boolTypeLiteral, left).v) {
                                return left;
                            } else {
                                return yield* interp.visit(interp, s.right, param);
                            }
                        }
                    },
                    *ConditionalExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const cond = rt.cast(rt.boolTypeLiteral, (yield* interp.visit(interp, s.cond, param))).v;
                        if (cond) {
                            return yield* interp.visit(interp, s.t, param);
                        } else {
                            return yield* interp.visit(interp, s.f, param);
                        }
                    },
                    *ConstantExpression(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return yield* interp.visit(interp, s.Expression, param);
                    },
                    *StringLiteralExpression(interp, s, param) {
                        return yield* interp.visit(interp, s.value, param);
                    },
                    StringLiteral(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        switch (s.prefix) {
                            case null:
                                let maxCode = -1;
                                let minCode = 1;
                                for (const i of s.value) {
                                    const code = i.charCodeAt(0);
                                    if (maxCode < code) {
                                        maxCode = code;
                                    }
                                    if (minCode > code) {
                                        minCode = code;
                                    }
                                }
                                const { limits } = rt.config;
                                const typeName = (maxCode <= limits["char"].max) && (minCode >= limits["char"].min) ?
                                    "char" : "wchar_t";
                                return rt.charArray_makeFromJSString(s.value, typeName);
                            case "L":
                                return rt.charArray_makeFromJSString(s.value, "wchar_t");
                            case "u8":
                                return rt.charArray_makeFromJSString(s.value, "char");
                            case "u":
                                return rt.charArray_makeFromJSString(s.value, "char16_t");
                            case "U":
                                return rt.charArray_makeFromJSString(s.value, "char32_t");
                        }
                    },
                    BooleanConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.boolTypeLiteral, s.value === "true" ? 1 : 0);
                    },
                    CharacterConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const a = s.Char;
                        if (a.length !== 1) {
                            rt.raiseException("a character constant must have and only have one character.");
                        }
                        return rt.val(rt.charTypeLiteral, a[0].charCodeAt(0));
                    },
                    *FloatConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const val = yield* interp.visit(interp, s.Expression, param);
                        return rt.val(rt.floatTypeLiteral, val.v);
                    },
                    DecimalConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.unsignedintTypeLiteral, parseInt(s.value, 10));
                    },
                    HexConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.unsignedintTypeLiteral, parseInt(s.value, 16));
                    },
                    BinaryConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.unsignedintTypeLiteral, parseInt(s.value, 2));
                    },
                    DecimalFloatConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.doubleTypeLiteral, parseFloat(s.value));
                    },
                    HexFloatConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.doubleTypeLiteral, parseInt(s.value, 16));
                    },
                    OctalConstant(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        return rt.val(rt.unsignedintTypeLiteral, parseInt(s.value, 8));
                    },
                    NamespaceDefinition(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        rt.raiseException("not implemented");
                    },
                    UsingDirective(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        const id = s.Identifier;
                    },
                    UsingDeclaration(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        rt.raiseException("not implemented");
                    },
                    NamespaceAliasDefinition(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        rt.raiseException("not implemented");
                    },
                    unknown(interp, s, param) {
                        ({
                            rt
                        } = interp);
                        rt.raiseException("unhandled syntax " + s.type);
                    }
                };
            }
            *visit(interp, s, param) {
                let ret;
                const { rt } = interp;
                if ("type" in s) {
                    if (param === undefined) {
                        param = { scope: "global" };
                    }
                    const _node = this.currentNode;
                    this.currentNode = s;
                    if (s.type in this.visitors) {
                        const f = this.visitors[s.type];
                        if (isGeneratorFunction(f)) {
                            const x = f(interp, s, param);
                            if (x != null) {
                                if (isIterable(x)) {
                                    ret = yield* x;
                                } else {
                                    ret = yield x;
                                }
                            } else {
                                ret = yield null;
                            }
                        } else {
                            yield (ret = f(interp, s, param));
                        }
                    } else {
                        ret = this.visitors["unknown"](interp, s, param);
                    }
                    this.currentNode = _node;
                } else {
                    this.currentNode = s;
                    this.rt.raiseException("untyped syntax structure");
                }
                return ret;
            };
            *run(tree, source, param) {
                this.rt.interp = this;
                this.source = source;
                return yield* this.visit(this, tree, param);
            };
            *arrayInit(dimensions, init, type, param) {
                if (dimensions.length > 0) {
                    let val;
                    const curDim = dimensions[0];
                    if (init) {
                        if ((init.type === "Initializer_array") && (init.Initializers != null && curDim >= init.Initializers.length)) {
                            if (init.Initializers.length === 0) {
                                const arr = new Array(curDim);
                                let i = 0;
                                while (i < curDim) {
                                    arr[i] = {
                                        type: "Initializer_expr",
                                        shorthand: this.rt.defaultValue(type)
                                    };
                                    i++;
                                }
                                init.Initializers = arr;
                            } else if ((init.Initializers.length === 1) && this.rt.isIntegerType(type)) {
                                val = this.rt.cast(type, (yield* this.visit(this, init.Initializers[0].Expression, param)));
                                if ((val.v === -1) || (val.v === 0)) {
                                    const arr = new Array(curDim);
                                    let i = 0;
                                    while (i < curDim) {
                                        arr[i] = {
                                            type: "Initializer_expr",
                                            shorthand: this.rt.val(type, val.v)
                                        };
                                        i++;
                                    }
                                    init.Initializers = arr;
                                } else {
                                    const arr = new Array(curDim);
                                    arr[0] = this.rt.val(type, -1);
                                    let i = 1;
                                    while (i < curDim) {
                                        arr[i] = {
                                            type: "Initializer_expr",
                                            shorthand: this.rt.defaultValue(type)
                                        };
                                        i++;
                                    }
                                    init.Initializers = arr;
                                }
                            } else {
                                const arr = new Array(curDim);
                                let i = 0;
                                while (i < init.Initializers.length) {
                                    const _init = init.Initializers[i];
                                    let initval;
                                    if ("shorthand" in _init) {
                                        initval = _init;
                                    } else {
                                        if (_init.type === "Initializer_expr") {
                                            initval = {
                                                type: "Initializer_expr",
                                                shorthand: (yield* this.visit(this, _init.Expression, param))
                                            };
                                        } else if (_init.type === "Initializer_array") {
                                            initval = {
                                                type: "Initializer_expr",
                                                shorthand: (yield* this.arrayInit(dimensions.slice(1), _init, type, param))
                                            };
                                        } else {
                                            this.rt.raiseException("Not implemented initializer type: " + _init.type);
                                        }
                                    }
                                    arr[i] = initval;
                                    i++;
                                }
                                i = init.Initializers.length;
                                while (i < curDim) {
                                    arr[i] = {
                                        type: "Initializer_expr",
                                        shorthand: this.rt.defaultValue(this.arrayType(dimensions.slice(1), type))
                                    };
                                    i++;
                                }
                                init.Initializers = arr;
                            }
                        } else if (init.type === "Initializer_expr") {
                            let initializer;
                            if ("shorthand" in init) {
                                initializer = init.shorthand;
                            } else {
                                initializer = yield* this.visit(this, init, param);
                            }
                            if (this.rt.isArrayType(initializer) && this.rt.isTypeEqualTo(type, initializer.t.eleType)) {
                                init = {
                                    type: "Initializer_array",
                                    Initializers: initializer.v.target.map(e => ({
                                        type: "Initializer_expr",
                                        shorthand: e
                                    }))
                                };
                            } else {
                                this.rt.raiseException("cannot initialize an array to " + this.rt.makeValString(initializer), param.node);
                            }
                        } else {
                            this.rt.raiseException("dimensions do not agree, " + curDim + " != " + init.Initializers.length, param.node);
                        }
                    }
                    {
                        const arr = [];
                        const ret = this.rt.val(this.arrayType(dimensions, type), this.rt.makeArrayPointerValue(arr, 0), true);
                        let i = 0;
                        while (i < curDim) {
                            if (init && (i < init.Initializers.length)) {
                                arr[i] = yield* this.arrayInit(dimensions.slice(1), init.Initializers[i], type, param);
                            } else {
                                arr[i] = yield* this.arrayInit(dimensions.slice(1), null, type, param);
                            }
                            i++;
                        }
                        return ret;
                    }
                } else {
                    if (init && (init.type !== "Initializer_expr")) {
                        this.rt.raiseException("dimensions do not agree, too few initializers", param.node);
                    }
                    let initval;
                    if (init) {
                        if ("shorthand" in init) {
                            initval = init.shorthand;
                        } else {
                            initval = yield* this.visit(this, init.Expression, param);
                        }
                    } else {
                        initval = this.rt.defaultValue(type);
                    }
                    const ret = this.rt.cast(this.arrayType(dimensions, type), initval);
                    ret.left = true;
                    return ret;
                }
            };
            arrayType(dimensions, type) {
                if (dimensions.length > 0) {
                    return this.rt.arrayPointerType(this.arrayType(dimensions.slice(1), type), dimensions[0]);
                } else {
                    return type;
                }
            };
            buildRecursivePointerType(pointer, basetype, level) {
                if (pointer && (pointer.length > level)) {
                    const type = this.rt.normalPointerType(basetype);
                    return this.buildRecursivePointerType(pointer, type, level + 1);
                } else {
                    return basetype;
                }
            }
            ;
        }
        exports.Interpreter = Interpreter;
    },
    'preprocessor': function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.parse = void 0;
        const prepast = require("./prepast");
        const PEGUtil = require("pegjs-util");
        const interpreter_1 = require("./interpreter");
        ;
        class Preprocessor extends interpreter_1.BaseInterpreter {
            constructor(rt) {
                super(rt);
                const pushInc = function (b) {
                    this.doinclude.push(this.doinclude[this.doinclude.length - 1] && b);
                };
                this.rt = rt;
                this.ret = "";
                this.macros = {};
                this.macroStack = [];
                this.doinclude = [true];
                this.visitors = {
                    TranslationUnit(interp, s, code) {
                        let i = 0;
                        while (i < s.lines.length) {
                            const dec = s.lines[i];
                            interp.visit(dec, code);
                            interp.ret += dec.space;
                            i++;
                        }
                        return interp.ret;
                    },
                    Code(interp, s, code) {
                        if (interp.doinclude[interp.doinclude.length - 1]) {
                            let i = 0;
                            while (i < s.val.length) {
                                const x = interp.work(s.val[i]);
                                interp.ret += x;
                                i++;
                            }
                        }
                    },
                    PrepSimpleMacro(interp, s, code) {
                        interp.newMacro(s.Identifier, s.Replacement);
                    },
                    PrepFunctionMacro(interp, s, code) {
                        interp.newMacroFunction(s.Identifier, s.Args, s.Replacement);
                    },
                    PrepIncludeLib(interp, s, code) {
                        interp.rt.include(s.name);
                    },
                    PrepIncludeLocal(interp, s, code) {
                        const { includes } = interp.rt.config;
                        if (s.name in includes) {
                            includes[s.name].load(interp.rt);
                        } else {
                            interp.rt.raiseException("cannot find file: " + s.name);
                        }
                    },
                    PrepUndef(interp, s, code) {
                        if (interp.isMacroDefined(s.Identifier)) {
                            delete interp.macros[s.Identifier.val];
                        }
                    },
                    PrepIfdef(interp, s, code) {
                        pushInc(interp.isMacroDefined(s.Identifier));
                    },
                    PrepIfndef(interp, s, code) {
                        pushInc(!interp.isMacroDefined(s.Identifier));
                    },
                    PrepElse(interp, s, code) {
                        if (interp.doinclude.length > 1) {
                            const x = interp.doinclude.pop();
                            pushInc(!x);
                        } else {
                            interp.rt.raiseException("#else must be used after a #if");
                        }
                    },
                    PrepEndif(interp, s, code) {
                        if (interp.doinclude.length > 1) {
                            interp.doinclude.pop();
                        } else {
                            interp.rt.raiseException("#endif must be used after a #if");
                        }
                    },
                    unknown(interp, s, code) {
                        interp.rt.raiseException("unhandled syntax " + s.type);
                    }
                };
            }
            visit(s, code) {
                if ("type" in s) {
                    const _node = this.currentNode;
                    this.currentNode = s;
                    if (s.type in this.visitors) {
                        return this.visitors[s.type](this, s, code);
                    } else {
                        return this.visitors["unknown"](this, s, code);
                    }
                    this.currentNode = _node;
                } else {
                    this.currentNode = s;
                    this.rt.raiseException("untyped syntax structure: " + JSON.stringify(s));
                }
            };
            isMacroDefined(node) {
                if (node.type === "Identifier") {
                    return node.val in this.macros;
                } else {
                    return node.Identifier.val in this.macros;
                }
            };
            isMacro(node) {
                return this.isMacroDefined(node) && "val" in node && (this.macros[node.val].type === "simple");
            };
            isMacroFunction(node) {
                return this.isMacroDefined(node) && "Identifier" in node && (this.macros[node.Identifier.val].type === "function");
            };
            newMacro(id, replacement) {
                if (this.isMacroDefined(id)) {
                    this.rt.raiseException("macro " + id.val + " is already defined");
                }
                this.macros[id.val] = {
                    type: "simple",
                    replacement
                };
            };
            newMacroFunction(id, args, replacement) {
                if (this.isMacroDefined(id)) {
                    this.rt.raiseException("macro " + id.val + " is already defined");
                }
                this.macros[id.val] = {
                    type: "function",
                    args,
                    replacement
                };
            };
            work(node) {
                if (node.type === "Seperator") {
                    return node.val + node.space;
                } else {
                    if (node in this.macroStack) {
                        this.rt.raiseException("recursive macro detected");
                    }
                    this.macroStack.push(node);
                    if (node.type === "Identifier") {
                        return this.replaceMacro(node) + node.space;
                    } else if (node.type === "PrepFunctionMacroCall") {
                        return this.replaceMacroFunction(node);
                    }
                    this.macroStack.pop();
                }
            };
            replaceMacro(id) {
                if (this.isMacro(id)) {
                    let ret = "";
                    const rep = this.macros[id.val].replacement;
                    let i = 0;
                    while (i < rep.length) {
                        const v = this.work(rep[i]);
                        ret += v;
                        i++;
                    }
                    return ret;
                } else {
                    return id.val;
                }
            };
            replaceMacroFunction(node) {
                if (this.isMacroFunction(node)) {
                    const name = node.Identifier.val;
                    const argsText = node.Args;
                    const rep = this.macros[name].replacement;
                    const { args } = this.macros[name];
                    if (args.length === argsText.length) {
                        let ret = "";
                        let i = 0;
                        while (i < rep.length) {
                            if (rep[i].type === "Seperator") {
                                const v = this.work(rep[i]);
                                ret += v;
                            } else {
                                let argi = -1;
                                let j = 0;
                                while (j < args.length) {
                                    if ((rep[i].type === "Identifier") && (args[j].val === rep[i].val)) {
                                        argi = j;
                                        break;
                                    }
                                    j++;
                                }
                                if (argi >= 0) {
                                    let v = "";
                                    j = 0;
                                    while (j < argsText[argi].length) {
                                        v += this.work(argsText[argi][j]);
                                        j++;
                                    }
                                    ret += v + rep[i].space;
                                } else {
                                    const v = this.work(rep[i]);
                                    ret += v;
                                }
                            }
                            i++;
                        }
                        return ret;
                    } else {
                        this.rt.raiseException("macro " + name + " requires " + args.length + " arguments (" + argsText.length + " given)");
                    }
                } else {
                    const argsText = node.Args;
                    const v = [];
                    let i = 0;
                    while (i < argsText.length) {
                        let x = "";
                        let j = 0;
                        while (j < argsText[i].length) {
                            x += this.work(argsText[i][j]);
                            j++;
                        }
                        v.push(x);
                        i++;
                    }
                    return node.Identifier.val + "(" + v.join(",") + ")" + node.space;
                }
            };
            parse(code) {
                const result = PEGUtil.parse(prepast, code);
                if (result.error != null) {
                    throw new Error("ERROR: Preprocessing Failure:\n" + PEGUtil.errorMessage(result.error, true));
                }
                this.rt.interp = this;
                return this.visit(result.ast, code);
            }
            ;
        }
        function parse(rt, code) {
            return new Preprocessor(rt).parse(code);
        }
        exports.parse = parse;
    },
    'index.js': function (require, module, exports) {
        (function (global) {
            (function () {
                /* eslint-disable @typescript-eslint/prefer-for-of */
                /* eslint-disable object-shorthand */
                /* eslint-disable @typescript-eslint/no-this-alias */
                /* eslint-disable no-var */
                require("babel-polyfill");
                var self = global.window;
                // Copied from https://stackoverflow.com/a/11979803
                function testEnv() {
                    if (!self || self.document === undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
                var JSCPP = require('./launcher').default;
                var Debugger = require("./debugger").default;
                if (testEnv()) {
                    var myDebugger;
                    onmessage = function (e) {
                        var id = e.data[0];
                        var functionName = e.data[1];
                        var args = e.data.slice(2);
                        if (functionName === "run") {
                            try {
                                if (args.length < 2) {
                                    args.push(""); // input
                                }
                                if (args.length < 3) {
                                    args.push({}); // config
                                }
                                args[2].stdio = {
                                    write: function (s) {
                                        postMessage({ err: 0, type: "stdio.write", data: s });
                                    }
                                };
                                myDebugger = JSCPP.run.apply(JSCPP, args);
                                if (args[2] && args[2].debug) {
                                    postMessage({ id: id, err: 0, msg: "Debugger started." });
                                } else {
                                    postMessage({ id: id, err: 0, data: myDebugger });
                                }
                            } catch (error) {
                                postMessage({ id: id, err: -1, msg: error.message });
                            }
                        } else {
                            if (myDebugger) {
                                try {
                                    var r = myDebugger[functionName].apply(myDebugger, args);
                                    postMessage({ id: id, err: 0, data: r });
                                } catch (error) {
                                    postMessage({ id: id, err: -1, msg: error.message });
                                }
                            } else {
                                postMessage({ id: id, err: 1, msg: "Cannot run method " + functionName + " without debugger." });
                            }
                        }
                    };
                } else {
                    var WebWorkerHelper = function (srcPath) {
                        if (!global.Worker) {
                            throw new Error("WebWorker is not supported!");
                        }
                        this.cbMap = {};
                        this.hooks = {};
                        this.worker = new Worker(srcPath || "./JSCPP.es5.min.js");
                        var _this = this;
                        this.worker.onmessage = function (e) {
                            var data = e.data;
                            if (data.id) {
                                // passive message
                                if (_this.cbMap[data.id]) {
                                    _this.cbMap[data.id](data.err ? new Error(data.msg) : null, data.data);
                                }
                                delete _this.cbMap[data.id];
                            } else {
                                // proactive message
                                _this.hooks[data.type](data.err, data.data);
                            }
                        };
                        return this;
                    };
                    WebWorkerHelper.prototype.varCall = function (func, args, cb) {
                        var id = Math.random().toString(16);
                        this.cbMap[id] = cb;
                        this.worker.postMessage([id, func].concat(args));
                    };
                    WebWorkerHelper.prototype.run = function (code, input, options, cb) {
                        options = options || {};
                        var oldStdio = options.stdio;
                        if (oldStdio.drain) {
                            throw new Error("drain is not supported in WebWorker");
                        }
                        options.stdio = null;
                        this.hooks["stdio.write"] = function (err, s) {
                            if (oldStdio.write) {
                                oldStdio.write(s);
                            }
                        }
                        this.varCall("run", [code, input, options], cb);
                    };

                    (function () {
                        for (var func of Object.getOwnPropertyNames(Debugger.prototype)) {
                            if (typeof (Debugger.prototype[func]) === "function" && func !== "constructor") {
                                WebWorkerHelper.prototype[func] = (function () {
                                    var _func = func;
                                    return function () {
                                        this.varCall(_func, Array.slice.apply(null, arguments, [0, arguments.length - 1]), arguments[arguments.length - 1])
                                    }
                                })();
                            }
                        }
                    })();

                    var AsyncWebWorkerHelper = function (srcPath) {
                        this.helper = new WebWorkerHelper(srcPath);
                        this.worker = this.helper.worker;
                        return this;
                    };
                    (function () {
                        for (var func in WebWorkerHelper.prototype) {
                            if (typeof (WebWorkerHelper.prototype[func]) === "function" && func !== "constructor") {
                                AsyncWebWorkerHelper.prototype[func] = (function () {
                                    var _func = func;
                                    return function () {
                                        var _arguments = Array.slice(arguments);
                                        var _this = this;
                                        return new Promise(function (resolve, reject) {
                                            WebWorkerHelper.prototype[_func].apply(_this.helper, _arguments.concat([function (err, data) {
                                                if (err) {
                                                    reject(err);
                                                } else {
                                                    resolve(data);
                                                }
                                            }]));
                                        });
                                    };
                                })();
                            }
                        }
                    })();
                    JSCPP.WebWorkerHelper = WebWorkerHelper;
                    JSCPP.AsyncWebWorkerHelper = AsyncWebWorkerHelper;
                    window.JSCPP = JSCPP;
                }

            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }
};