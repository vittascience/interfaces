'use strict';

/**
 * Recursive MicroPython dependency resolver and in-memory minification cache.
 * Resolves only libraries transitively imported by user code, never mutates
 * `VittaInterface.externalLibraries`, and auto-invalidates entries when raw
 * sources change (e.g. dynamically injected `edgeModel` weights).
 */
class MicropythonLibResolver {
    /**
     * @param {string[]|Set<string>|{ builtinLibraries?: string[]|Set<string>, maxCacheEntries?: number, minifier?: typeof PythonMinifier }} [optionsOrBuiltins=[]]
     * @param {number} [maxCacheEntries=80]
     */
    constructor(optionsOrBuiltins = [], maxCacheEntries = 80) {
        const isIterableList = Array.isArray(optionsOrBuiltins) || optionsOrBuiltins instanceof Set;
        const opts = isIterableList
            ? { builtinLibraries: optionsOrBuiltins, maxCacheEntries }
            : (optionsOrBuiltins || {});
        const rawLimit = typeof opts.maxCacheEntries === 'number' ? opts.maxCacheEntries : maxCacheEntries;
        const limit = Number.isFinite(rawLimit) ? rawLimit : 80;

        this._cache = new Map();
        this._maxCacheEntries = Math.max(0, limit);
        this._minifier = opts.minifier || null;
        this._builtinSet = new Set(
            Array.from(opts.builtinLibraries || []).map((name) => String(name).toLowerCase())
        );
    }

    /**
     * Clear cached minifications.
     * @returns {void}
     */
    clearCache() {
        this._cache.clear();
    }

    /**
     * Return minified Python source for `libName` at compression `level`, cached by raw source identity.
     * Bounded LRU eviction keeps client browser/WebView RAM footprint negligible.
     * @param {string} libName
     * @param {string} rawCode
     * @param {number} [level=3]
     * @returns {string}
     */
    getMinified(libName, rawCode, level = 3) {
        const minifier = this._getMinifier();
        if (this._maxCacheEntries === 0) {
            return minifier.minify(rawCode, { level });
        }

        const cacheKey = `${level}:${libName}`;
        const cached = this._cache.get(cacheKey);
        if (cached && cached.raw === rawCode) {
            this._cache.delete(cacheKey);
            this._cache.set(cacheKey, cached);
            return cached.minified;
        }
        const minified = minifier.minify(rawCode, { level });
        if (!this._cache.has(cacheKey) && this._cache.size >= this._maxCacheEntries) {
            const oldestKey = this._cache.keys().next().value;
            if (oldestKey !== undefined) {
                this._cache.delete(oldestKey);
            }
        }
        this._cache.delete(cacheKey);
        this._cache.set(cacheKey, { raw: rawCode, minified });
        return minified;
    }

    /**
     * Resolve and minify all libraries transitively imported by `entryCode`.
     * @param {string} entryCode
     * @param {Record<string, string>} externalLibraries
     * @param {{ level?: number }} [options]
     * @returns {Array<{ filename: string, code: string }>}
     */
    resolve(entryCode, externalLibraries, options = {}) {
        if (!externalLibraries || typeof externalLibraries !== 'object') {
            return [];
        }

        const level = typeof options.level === 'number' ? options.level : 3;
        const available = this._buildAvailableMap(externalLibraries);
        if (available.size === 0) {
            return [];
        }

        const visited = new Set();
        const resolved = [];

        const visit = (source, currentLib) => {
            if (typeof source !== 'string' || source.length === 0) {
                return;
            }
            const deps = this._extractImportedModules(source, available);
            for (const depName of deps) {
                if (depName === currentLib || visited.has(depName)) {
                    continue;
                }
                visited.add(depName);
                const rawLib = available.get(depName);
                resolved.push({
                    filename: `${depName}.py`,
                    code: this.getMinified(depName, rawLib, level)
                });
                visit(rawLib, depName);
            }
        };

        visit(entryCode || '', null);
        return resolved;
    }

    /**
     * Resolve the PythonMinifier dependency lazily without polluting the global scope.
     * @private
     * @returns {typeof PythonMinifier}
     */
    _getMinifier() {
        if (this._minifier) {
            return this._minifier;
        }
        if (typeof PythonMinifier !== 'undefined') {
            this._minifier = PythonMinifier;
            return this._minifier;
        }
        if (typeof require === 'function') {
            this._minifier = require('./PythonMinifier');
            return this._minifier;
        }
        throw new Error('PythonMinifier is required by MicropythonLibResolver.');
    }

    /**
     * Filter `externalLibraries` excluding `*-unminified` variants, binaries/paths, and builtins.
     * @private
     * @param {Record<string, string>} externalLibraries
     * @returns {Map<string, string>}
     */
    _buildAvailableMap(externalLibraries) {
        const available = new Map();
        for (const [key, raw] of Object.entries(externalLibraries)) {
            if (typeof raw !== 'string' || key.endsWith('.mpy')) {
                continue;
            }
            const libName = key.endsWith('.py') ? key.slice(0, -3) : key;
            if (!libName || libName.includes('/') || libName.endsWith('-unminified') || this._isBuiltin(libName)) {
                continue;
            }
            available.set(libName, raw);
        }
        return available;
    }

    /**
     * @private
     * @param {string} libName
     * @returns {boolean}
     */
    _isBuiltin(libName) {
        if (!libName) {
            return false;
        }
        const lower = libName.toLowerCase();
        return this._builtinSet.has(lower) || this._builtinSet.has(`${lower}.py`);
    }

    /**
     * Extract imported top-level module names from `pythonSource` that exist in `available`.
     * Neutralizes comments and strings first to prevent false positives.
     * @private
     * @param {string} pythonSource
     * @param {Map<string, string>} available
     * @returns {string[]}
     */
    _extractImportedModules(pythonSource, available) {
        const stripped = this._getMinifier()
            .stripCommentsAndStrings(pythonSource)
            .replace(/\\\n/g, ' ');
        const found = [];
        const seenInFile = new Set();

        const record = (modName) => {
            if (modName && available.has(modName) && !seenInFile.has(modName)) {
                seenInFile.add(modName);
                found.push(modName);
            }
        };

        const fromRegex = /(?:^|[;:\n])[ \t]*from[ \t]+([A-Za-z_][A-Za-z0-9_]*)(?:\.[A-Za-z_][A-Za-z0-9_]*)*[ \t]+import\b/g;
        let match;
        while ((match = fromRegex.exec(stripped)) !== null) {
            record(match[1]);
        }

        const importRegex = /(?:^|[;:\n])[ \t]*import[ \t]+([^;\n]+)/g;
        while ((match = importRegex.exec(stripped)) !== null) {
            const parts = match[1].split(',');
            for (const part of parts) {
                const modMatch = part.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)/);
                if (modMatch) {
                    record(modMatch[1]);
                }
            }
        }

        return found;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MicropythonLibResolver;
}
