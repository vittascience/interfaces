'use strict';

/**
 * Pure-JS stateful lexical minifier for MicroPython source files.
 *
 * Levels:
 * - level 1 (Pass 1): strip `#` comments, standalone docstrings (inserting `pass`
 *   if a suite becomes empty), blank lines, and trailing spaces.
 * - level 2 (Pass 1 + Pass 2): also collapse logical indentation to 1 space
 *   per level and collapse multi-spaces between tokens.
 * - level 3 (Pass 1 + Pass 2 + Pass 3, default): also strip redundant spaces
 *   around operators and delimiters while preserving token boundaries.
 * - level 4 (Pass 1..4 escalation): also fold newlines inside `()[]{}` and
 *   join consecutive simple statements / single-statement suites with `;`.
 * - level 5 (Pass 1..5 escalation): also safely rename `self` and strictly
 *   local `def` variables (preserving API names, attributes, and kwargs).
 * - level 6 (Pass 1..6 escalation): also apply base-10 integer shortening,
 *   `import` merging, and repeated string literal pooling.
 */
class PythonMinifier {
    /**
     * Minify Python source code safely for MicroPython.
     * @param {string} source
     * @param {{ level?: number, collapseIndent?: boolean, stripOperatorSpaces?: boolean }} [options]
     * @returns {string}
     */
    static minify(source, options = {}) {
        if (typeof source !== 'string' || source.length === 0) {
            return '';
        }

        const level = typeof options.level === 'number' ? options.level : 3;
        const collapseIndent = options.collapseIndent !== undefined ? options.collapseIndent : level >= 2;
        const stripOpSpaces = options.stripOperatorSpaces !== undefined ? options.stripOperatorSpaces : level >= 3;
        const foldParens = level >= 4;
        const foldStatements = level >= 4;
        const renameLocals = level >= 5;
        const microOptimize = level >= 6;

        const src = source.replace(/\r\n?/g, '\n');
        const len = src.length;

        const outLines = [];
        const passInsertions = new Map();
        const passAppends = new Set();
        const suiteStack = [];
        const indentStack = [0];

        let i = 0;
        let lineBuf = '';
        let lineIndent = '';
        let pendingWs = '';
        let parenDepth = 0;
        let continued = false;
        let startedAtParenZero = true;
        let startedContinued = false;
        let stmtIndentWidth = 0;
        let stmtNormalizedIndent = '';
        let stmtFirstKeyword = null;
        let atStmtStart = true;
        let afterSuiteColon = false;
        let lastTokenWasSuiteColon = false;
        let inlineSuiteDocstringPending = false;
        let continuedSuiteHeaderIndex = -1;
        let continuedSuiteDocIndent = '';
        let continuedSuiteIndentWidth = 0;
        let continuedSuiteNormalizedIndent = '';
        let prevKind = null;
        let prevText = '';
        let lambdaDepth = 0;

        const resetNonSuiteTokenFlags = () => {
            atStmtStart = false;
            afterSuiteColon = false;
            lastTokenWasSuiteColon = false;
            inlineSuiteDocstringPending = false;
            continuedSuiteHeaderIndex = -1;
        };

        const needsSpaceForPass3 = (kind, text) => {
            if (!prevKind) {
                return false;
            }
            if (kind === 'backslash') {
                return true;
            }
            if (prevKind === 'word' && (kind === 'word' || kind === 'number' || kind === 'string')) {
                return true;
            }
            if (prevKind === 'number' && (kind === 'word' || kind === 'number' || kind === 'dot')) {
                return true;
            }
            if (prevKind === 'string' && (kind === 'string' || kind === 'word' || kind === 'number')) {
                return true;
            }
            if (prevKind === 'dot' && (kind === 'number' || kind === 'dot')) {
                return true;
            }
            if (prevKind === 'op' && kind === 'op') {
                const pair = prevText.slice(-1) + text[0];
                if (PythonMinifier.AMBIGUOUS_OP_PAIRS.has(pair)) {
                    return true;
                }
            }
            return false;
        };

        const resolveLeadingWs = (kind, text) => {
            if (lineBuf.length > 0) {
                if (pendingWs.length === 0) {
                    return '';
                }
                if (stripOpSpaces) {
                    return needsSpaceForPass3(kind, text) ? ' ' : '';
                }
                if (collapseIndent) {
                    return ' ';
                }
                return pendingWs;
            }
            if (!collapseIndent) {
                if (startedAtParenZero && !startedContinued) {
                    stmtNormalizedIndent = lineIndent;
                }
                return pendingWs;
            }
            if (startedAtParenZero && !startedContinued) {
                while (indentStack.length > 1 && stmtIndentWidth < indentStack[indentStack.length - 1]) {
                    indentStack.pop();
                }
                if (stmtIndentWidth > indentStack[indentStack.length - 1]) {
                    indentStack.push(stmtIndentWidth);
                }
                stmtNormalizedIndent = ' '.repeat(indentStack.length - 1);
                return stmtNormalizedIndent;
            }
            if (startedContinued) {
                return pendingWs.length > 0 ? ' ' : '';
            }
            return '';
        };

        const appendToken = (kind, token) => {
            const ws = resolveLeadingWs(kind, token);
            lineBuf += ws + token;
            pendingWs = '';
            prevKind = kind;
            prevText = token;
        };

        const beginPhysicalLine = () => {
            if (foldParens && parenDepth > 0 && !continued && lineBuf.length > 0) {
                while (i < len && (src[i] === ' ' || src[i] === '\t')) {
                    i++;
                }
                pendingWs = ' ';
                return;
            }
            lineBuf = '';
            lineIndent = '';
            prevKind = null;
            prevText = '';
            while (i < len && (src[i] === ' ' || src[i] === '\t')) {
                lineIndent += src[i];
                i++;
            }
            pendingWs = lineIndent;
            startedAtParenZero = (parenDepth === 0);
            startedContinued = continued;
            if (parenDepth === 0 && !continued) {
                stmtIndentWidth = PythonMinifier._indentWidth(lineIndent);
                stmtFirstKeyword = null;
                atStmtStart = true;
                afterSuiteColon = false;
                continuedSuiteHeaderIndex = -1;
                lambdaDepth = 0;
            }
            lastTokenWasSuiteColon = false;
            inlineSuiteDocstringPending = false;
            continued = false;
        };

        const closeSuitesUpTo = (indentWidth) => {
            while (suiteStack.length > 0 && indentWidth <= suiteStack[suiteStack.length - 1].indentWidth) {
                const closed = suiteStack.pop();
                if (!closed.hasBody && closed.hadDocstring) {
                    if (closed.docIndent !== null) {
                        passInsertions.set(closed.lineIndex, closed.docIndent + 'pass');
                    } else {
                        passAppends.add(closed.lineIndex);
                    }
                }
            }
        };

        const flushLine = (nextIsContinued) => {
            pendingWs = '';
            if (lineBuf.length > 0) {
                if (startedAtParenZero && !startedContinued) {
                    closeSuitesUpTo(stmtIndentWidth);
                    if (suiteStack.length > 0 && stmtIndentWidth > suiteStack[suiteStack.length - 1].indentWidth) {
                        suiteStack[suiteStack.length - 1].hasBody = true;
                    }
                }
                const lineIndex = outLines.length;
                outLines.push(lineBuf);
                if (inlineSuiteDocstringPending && !nextIsContinued) {
                    passAppends.add(lineIndex);
                } else if (nextIsContinued && parenDepth === 0 && lastTokenWasSuiteColon) {
                    continuedSuiteHeaderIndex = lineIndex;
                    continuedSuiteIndentWidth = stmtIndentWidth;
                    continuedSuiteNormalizedIndent = stmtNormalizedIndent;
                    continuedSuiteDocIndent = collapseIndent
                        ? (stmtNormalizedIndent + ' ')
                        : (lineIndent + '    ');
                } else if (!nextIsContinued && parenDepth === 0 && lastTokenWasSuiteColon) {
                    suiteStack.push({
                        lineIndex,
                        indentWidth: stmtIndentWidth,
                        headerNormalizedIndent: stmtNormalizedIndent,
                        hadDocstring: false,
                        hasBody: false,
                        docIndent: null
                    });
                }
            } else if (!nextIsContinued && continuedSuiteHeaderIndex !== -1) {
                outLines[continuedSuiteHeaderIndex] = outLines[continuedSuiteHeaderIndex].slice(0, -1).replace(/[ \t]+$/, '');
                suiteStack.push({
                    lineIndex: continuedSuiteHeaderIndex,
                    indentWidth: continuedSuiteIndentWidth,
                    headerNormalizedIndent: continuedSuiteNormalizedIndent,
                    hadDocstring: true,
                    hasBody: false,
                    docIndent: continuedSuiteDocIndent
                });
                continuedSuiteHeaderIndex = -1;
            } else if (
                startedContinued &&
                !nextIsContinued &&
                outLines.length > 0 &&
                outLines[outLines.length - 1].endsWith('\\')
            ) {
                outLines[outLines.length - 1] = outLines[outLines.length - 1].slice(0, -1).replace(/[ \t]+$/, '');
            }
            continued = nextIsContinued;
        };

        beginPhysicalLine();

        while (i < len) {
            const ch = src[i];

            if (ch === '\n') {
                if (foldParens && parenDepth > 0 && !continued && lineBuf.length > 0) {
                    i++;
                    beginPhysicalLine();
                    continue;
                }
                flushLine(false);
                i++;
                beginPhysicalLine();
                continue;
            }

            if (ch === ' ' || ch === '\t') {
                pendingWs += ch;
                i++;
                continue;
            }

            if (ch === '#') {
                while (i < len && src[i] !== '\n') {
                    i++;
                }
                pendingWs = '';
                continue;
            }

            if (ch === '\\' && i + 1 < len && src[i + 1] === '\n') {
                if (lineBuf.length > 0 || !startedContinued || continuedSuiteHeaderIndex === -1) {
                    const ws = resolveLeadingWs('backslash', '\\');
                    lineBuf += ws + '\\';
                }
                pendingWs = '';
                i += 2;
                flushLine(true);
                beginPhysicalLine();
                continue;
            }

            const strInfo = PythonMinifier._matchStringStart(src, i);
            if (strInfo) {
                const scanned = PythonMinifier._scanString(src, i, strInfo);

                if (parenDepth === 0 && atStmtStart && !strInfo.isFString && !strInfo.isBytes) {
                    let peek = scanned.end;
                    while (peek < len && (src[peek] === ' ' || src[peek] === '\t')) {
                        peek++;
                    }
                    if (peek < len && src[peek] === '#') {
                        while (peek < len && src[peek] !== '\n') {
                            peek++;
                        }
                    }
                    if (peek >= len || src[peek] === '\n' || src[peek] === ';') {
                        if (continuedSuiteHeaderIndex !== -1 && !collapseIndent && lineIndent.length > 0) {
                            continuedSuiteDocIndent = lineIndent;
                        }
                        if (afterSuiteColon && continuedSuiteHeaderIndex === -1) {
                            inlineSuiteDocstringPending = true;
                        } else if (continuedSuiteHeaderIndex === -1 && suiteStack.length > 0) {
                            const top = suiteStack[suiteStack.length - 1];
                            if (!top.hasBody && lineBuf.length === 0 && stmtIndentWidth > top.indentWidth) {
                                top.hadDocstring = true;
                                top.docIndent = collapseIndent
                                    ? (top.headerNormalizedIndent + ' ')
                                    : lineIndent;
                            }
                        }

                        if (peek < len && src[peek] === ';') {
                            i = peek + 1;
                            while (i < len && (src[i] === ' ' || src[i] === '\t')) {
                                i++;
                            }
                            if (lineBuf.length > 0) {
                                pendingWs = ' ';
                            }
                            atStmtStart = true;
                            afterSuiteColon = false;
                            lastTokenWasSuiteColon = false;
                        } else {
                            i = peek;
                            pendingWs = '';
                            atStmtStart = false;
                            afterSuiteColon = false;
                            lastTokenWasSuiteColon = false;
                        }
                        continue;
                    }
                }

                if (parenDepth === 0 && stmtFirstKeyword === null && !startedContinued) {
                    stmtFirstKeyword = '"';
                }
                appendToken('string', scanned.text);
                resetNonSuiteTokenFlags();
                i = scanned.end;
                continue;
            }

            if (PythonMinifier._isIdentStart(ch)) {
                let end = i + 1;
                while (end < len && PythonMinifier._isIdentCont(src[end])) {
                    end++;
                }
                const word = src.slice(i, end);
                if (parenDepth === 0) {
                    if (stmtFirstKeyword === null && !startedContinued) {
                        stmtFirstKeyword = word;
                    }
                    if (word === 'lambda') {
                        lambdaDepth++;
                    }
                }
                appendToken('word', word);
                resetNonSuiteTokenFlags();
                i = end;
                continue;
            }

            if (ch >= '0' && ch <= '9') {
                const end = PythonMinifier._scanNumberEnd(src, i);
                const num = src.slice(i, end);
                if (parenDepth === 0 && stmtFirstKeyword === null && !startedContinued) {
                    stmtFirstKeyword = num;
                }
                appendToken('number', num);
                resetNonSuiteTokenFlags();
                i = end;
                continue;
            }

            if (ch === '(' || ch === '[' || ch === '{') {
                if (parenDepth === 0 && stmtFirstKeyword === null && !startedContinued) {
                    stmtFirstKeyword = ch;
                }
                parenDepth++;
                appendToken('delim', ch);
                resetNonSuiteTokenFlags();
                i++;
                continue;
            }

            if (ch === ')' || ch === ']' || ch === '}') {
                if (parenDepth > 0) {
                    parenDepth--;
                }
                appendToken('delim', ch);
                resetNonSuiteTokenFlags();
                i++;
                continue;
            }

            if (parenDepth === 0 && ch === ';') {
                appendToken('delim', ch);
                atStmtStart = true;
                afterSuiteColon = false;
                lastTokenWasSuiteColon = false;
                stmtFirstKeyword = null;
                continuedSuiteHeaderIndex = -1;
                lambdaDepth = 0;
                i++;
                continue;
            }

            if (parenDepth === 0 && ch === ':' && src[i + 1] !== '=') {
                if (lambdaDepth > 0) {
                    lambdaDepth--;
                    appendToken('delim', ch);
                    resetNonSuiteTokenFlags();
                    i++;
                    continue;
                }
                if (PythonMinifier.COMPOUND_KEYWORDS.has(stmtFirstKeyword)) {
                    appendToken('delim', ch);
                    atStmtStart = true;
                    afterSuiteColon = true;
                    lastTokenWasSuiteColon = true;
                    inlineSuiteDocstringPending = false;
                    stmtFirstKeyword = null;
                    continuedSuiteHeaderIndex = -1;
                    i++;
                    continue;
                }
            }

            if (ch === '.') {
                if (parenDepth === 0 && stmtFirstKeyword === null && !startedContinued) {
                    stmtFirstKeyword = '.';
                }
                appendToken('dot', '.');
                resetNonSuiteTokenFlags();
                i++;
                continue;
            }

            if (parenDepth === 0 && stmtFirstKeyword === null && !startedContinued) {
                stmtFirstKeyword = ch;
            }
            const opKind = (ch === ',' || ch === ':') ? 'delim' : 'op';
            appendToken(opKind, ch);
            resetNonSuiteTokenFlags();
            i++;
        }

        flushLine(false);
        closeSuitesUpTo(-1);

        const result = [];
        for (let idx = 0; idx < outLines.length; idx++) {
            let line = outLines[idx];
            if (passAppends.has(idx)) {
                line += (level >= 3 && line.endsWith(':')) ? 'pass' : ' pass';
            }
            result.push(line);
            if (passInsertions.has(idx)) {
                result.push(passInsertions.get(idx));
            }
        }
        let lines = result;
        if (renameLocals) {
            lines = PythonMinifier._renameFunctionLocals(lines);
        }
        if (foldStatements) {
            lines = PythonMinifier._foldStatements(lines);
        }
        if (microOptimize) {
            lines = PythonMinifier._applyPass6(lines);
        }
        return lines.length > 0 ? lines.join('\n') + '\n' : '';
    }

    /**
     * Join consecutive simple statements at the same indentation with `;` and
     * fold single-simple-statement suite bodies onto their header line (Pass 4).
     * @private
     * @param {string[]} lines
     * @returns {string[]}
     */
    static _foldStatements(lines) {
        if (lines.length <= 1) {
            return lines;
        }

        const describe = (line) => {
            let indent = 0;
            while (indent < line.length && line[indent] === ' ') {
                indent++;
            }
            const body = line.slice(indent);
            let wEnd = 0;
            while (wEnd < body.length && PythonMinifier._isIdentCont(body[wEnd])) {
                wEnd++;
            }
            const firstWord = body.slice(0, wEnd);
            const isCompound = PythonMinifier.COMPOUND_KEYWORDS.has(firstWord) || body.startsWith('@');
            return {
                indent,
                body,
                isCompound,
                endsWithCont: body.endsWith('\\'),
                endsWithColon: isCompound && body.endsWith(':'),
                endsWithAnyColon: body.endsWith(':')
            };
        };

        const merged = [];
        for (const line of lines) {
            const info = describe(line);
            if (merged.length > 0) {
                const prev = merged[merged.length - 1];
                if (
                    !prev.hasCompound &&
                    !prev.endsWithCont &&
                    !prev.endsWithAnyColon &&
                    !info.isCompound &&
                    !info.endsWithCont &&
                    info.indent === prev.indent
                ) {
                    const sep = prev.body.endsWith(';') ? '' : ';';
                    prev.body += sep + info.body;
                    continue;
                }
            }
            merged.push({ ...info, hasCompound: info.isCompound });
        }

        const folded = [];
        let idx = 0;
        while (idx < merged.length) {
            const cur = merged[idx];
            if (cur.endsWithColon && idx + 1 < merged.length) {
                const next = merged[idx + 1];
                const afterIndent = idx + 2 < merged.length ? merged[idx + 2].indent : -1;
                if (!next.isCompound && !next.endsWithCont && next.indent > cur.indent && afterIndent <= cur.indent) {
                    folded.push(' '.repeat(cur.indent) + cur.body + next.body.replace(/^;+/, ''));
                    idx += 2;
                    continue;
                }
            }
            folded.push(' '.repeat(cur.indent) + cur.body);
            idx++;
        }
        return folded;
    }

    /**
     * Neutralize comments and string literals while keeping newlines intact.
     * Used by MicropythonLibResolver so imports inside strings or comments are ignored.
     * @param {string} source
     * @returns {string}
     */
    static stripCommentsAndStrings(source) {
        if (typeof source !== 'string' || source.length === 0) {
            return '';
        }

        const src = source.replace(/\r\n?/g, '\n');
        const len = src.length;
        const out = [];
        let i = 0;

        while (i < len) {
            const ch = src[i];
            if (ch === '#') {
                while (i < len && src[i] !== '\n') {
                    i++;
                }
                continue;
            }

            const strInfo = PythonMinifier._matchStringStart(src, i);
            if (strInfo) {
                const scanned = PythonMinifier._scanString(src, i, strInfo);
                let nlCount = 0;
                for (let k = 0; k < scanned.text.length; k++) {
                    if (scanned.text[k] === '\n') {
                        nlCount++;
                    }
                }
                out.push(nlCount > 0 ? '\n'.repeat(nlCount) : ' ');
                i = scanned.end;
                continue;
            }

            if (PythonMinifier._isIdentStart(ch)) {
                let end = i + 1;
                while (end < len && PythonMinifier._isIdentCont(src[end])) {
                    end++;
                }
                out.push(src.slice(i, end));
                i = end;
                continue;
            }

            out.push(ch);
            i++;
        }

        return out.join('');
    }

    /**
     * Scan a Python numeric literal (int, hex/bin/oct, float, scientific, imaginary).
     * @private
     * @param {string} src
     * @param {number} startIdx
     * @returns {number}
     */
    static _scanNumberEnd(src, startIdx) {
        const len = src.length;
        let i = startIdx;

        if (src[i] === '0' && i + 1 < len && 'xXbBoO'.includes(src[i + 1])) {
            i += 2;
            while (i < len && PythonMinifier._isHexOrUnderscore(src[i])) {
                i++;
            }
            return i;
        }

        while (i < len && PythonMinifier._isDigitOrUnderscore(src[i])) {
            i++;
        }
        if (i < len && src[i] === '.' && !(i + 1 < len && src[i + 1] === '.')) {
            i++;
            while (i < len && PythonMinifier._isDigitOrUnderscore(src[i])) {
                i++;
            }
        }
        if (i < len && (src[i] === 'e' || src[i] === 'E')) {
            let expIdx = i + 1;
            if (expIdx < len && (src[expIdx] === '+' || src[expIdx] === '-')) {
                expIdx++;
            }
            if (expIdx < len && src[expIdx] >= '0' && src[expIdx] <= '9') {
                i = expIdx + 1;
                while (i < len && PythonMinifier._isDigitOrUnderscore(src[i])) {
                    i++;
                }
            }
        }
        if (i < len && (src[i] === 'j' || src[i] === 'J')) {
            i++;
        }
        return i;
    }

    /**
     * @private
     * @param {string} ch
     * @returns {boolean}
     */
    static _isDigitOrUnderscore(ch) {
        const code = ch.charCodeAt(0);
        return ch === '_' || (code >= 48 && code <= 57);
    }

    /**
     * @private
     * @param {string} ch
     * @returns {boolean}
     */
    static _isHexOrUnderscore(ch) {
        const code = ch.charCodeAt(0);
        return ch === '_' ||
            (code >= 48 && code <= 57) ||
            (code >= 65 && code <= 70) ||
            (code >= 97 && code <= 102);
    }

    /**
     * Compute Python's visual indentation column width (tab stops every 8 columns).
     * @private
     * @param {string} indent
     * @returns {number}
     */
    static _indentWidth(indent) {
        let width = 0;
        for (let idx = 0; idx < indent.length; idx++) {
            if (indent[idx] === '\t') {
                width = (width + 8) & ~7;
            } else {
                width += 1;
            }
        }
        return width;
    }

    /**
     * @private
     * @param {string} ch
     * @returns {boolean}
     */
    static _isAsciiAlpha(ch) {
        const code = ch.charCodeAt(0);
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    }

    /**
     * @private
     * @param {string} ch
     * @returns {boolean}
     */
    static _isIdentStart(ch) {
        const code = ch.charCodeAt(0);
        return ch === '_' || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code >= 128;
    }

    /**
     * @private
     * @param {string} ch
     * @returns {boolean}
     */
    static _isIdentCont(ch) {
        const code = ch.charCodeAt(0);
        return PythonMinifier._isIdentStart(ch) || (code >= 48 && code <= 57);
    }

    /**
     * Detect if a Python string literal starts at `idx`.
     * @private
     * @param {string} src
     * @param {number} idx
     * @returns {{ prefixLen: number, quoteChar: string, isTriple: boolean, isFString: boolean, isRaw: boolean, isBytes: boolean }|null}
     */
    static _matchStringStart(src, idx) {
        const len = src.length;
        let prefixLen = 0;

        while (prefixLen < 2 && idx + prefixLen < len && PythonMinifier._isAsciiAlpha(src[idx + prefixLen])) {
            prefixLen++;
        }

        for (let pLen = 0; pLen <= prefixLen; pLen++) {
            const qIdx = idx + pLen;
            if (qIdx >= len) {
                break;
            }
            const q = src[qIdx];
            if (q !== '\'' && q !== '"') {
                continue;
            }
            if (pLen > 0) {
                const lower = src.slice(idx, idx + pLen).toLowerCase();
                if (!PythonMinifier.STRING_PREFIXES.has(lower)) {
                    continue;
                }
                const isTriple = qIdx + 2 < len && src[qIdx + 1] === q && src[qIdx + 2] === q;
                return {
                    prefixLen: pLen,
                    quoteChar: q,
                    isTriple,
                    isFString: lower.includes('f'),
                    isRaw: lower.includes('r'),
                    isBytes: lower.includes('b')
                };
            }
            const isTriple = qIdx + 2 < len && src[qIdx + 1] === q && src[qIdx + 2] === q;
            return {
                prefixLen: 0,
                quoteChar: q,
                isTriple,
                isFString: false,
                isRaw: false,
                isBytes: false
            };
        }

        return null;
    }

    /**
     * Scan a full Python string literal (including nested f-string expressions).
     * @private
     * @param {string} src
     * @param {number} startIdx
     * @param {{ prefixLen: number, quoteChar: string, isTriple: boolean, isFString: boolean }} info
     * @returns {{ end: number, text: string }}
     */
    static _scanString(src, startIdx, info) {
        const len = src.length;
        const delimLen = info.isTriple ? 3 : 1;
        const q = info.quoteChar;
        let i = startIdx + info.prefixLen + delimLen;
        let text = src.slice(startIdx, i);

        while (i < len) {
            const ch = src[i];

            if (info.isTriple) {
                if (ch === q && i + 2 < len && src[i + 1] === q && src[i + 2] === q) {
                    text += q + q + q;
                    return { end: i + 3, text };
                }
            } else {
                if (ch === q) {
                    text += q;
                    return { end: i + 1, text };
                }
                if (ch === '\n') {
                    return { end: i, text };
                }
            }

            if (ch === '\\') {
                if (info.isFString && i + 1 < len && (src[i + 1] === '{' || src[i + 1] === '}')) {
                    text += ch;
                    i++;
                    continue;
                }
                if (i + 1 < len) {
                    text += ch + src[i + 1];
                    i += 2;
                } else {
                    text += ch;
                    i++;
                }
                continue;
            }

            if (info.isFString) {
                if (ch === '{') {
                    if (i + 1 < len && src[i + 1] === '{') {
                        text += '{{';
                        i += 2;
                        continue;
                    }
                    const expr = PythonMinifier._scanFStringExpr(src, i, info.isTriple);
                    text += expr.text;
                    i = expr.end;
                    continue;
                }
                if (ch === '}' && i + 1 < len && src[i + 1] === '}') {
                    text += '}}';
                    i += 2;
                    continue;
                }
            }

            text += ch;
            i++;
        }

        return { end: i, text };
    }

    /**
     * Scan an f-string replacement field `{expr[:format_spec]}` starting at `{`.
     * Handles nested `{...}` inside `format_spec` recursively and allows `:=`
     * alignment fill specifiers (e.g. `f"{x:=^10}"`).
     * @private
     * @param {string} src
     * @param {number} startIdx
     * @param {boolean} isTriple
     * @returns {{ end: number, text: string }}
     */
    static _scanFStringExpr(src, startIdx, isTriple) {
        const len = src.length;
        const singleLineOuter = !isTriple;
        let i = startIdx + 1;
        let text = '{';
        let braceDepth = 1;
        let parenDepth = 0;
        let inFormatSpec = false;

        while (i < len) {
            const ch = src[i];

            if (inFormatSpec) {
                if (ch === '{') {
                    const nested = PythonMinifier._scanFStringExpr(src, i, isTriple);
                    text += nested.text;
                    i = nested.end;
                    continue;
                }
                if (ch === '}') {
                    text += '}';
                    return { end: i + 1, text };
                }
                if (singleLineOuter && ch === '\n') {
                    return { end: i, text };
                }
                text += ch;
                i++;
                continue;
            }

            const strInfo = PythonMinifier._matchStringStart(src, i);
            if (strInfo) {
                const scanned = PythonMinifier._scanString(src, i, strInfo);
                text += scanned.text;
                i = scanned.end;
                continue;
            }

            if (ch === ':' && braceDepth === 1 && parenDepth === 0) {
                inFormatSpec = true;
                text += ch;
                i++;
                continue;
            }

            if (ch === '{') {
                braceDepth++;
                text += ch;
                i++;
                continue;
            }

            if (ch === '}') {
                braceDepth--;
                text += ch;
                i++;
                if (braceDepth === 0) {
                    return { end: i, text };
                }
                continue;
            }

            if (ch === '(' || ch === '[') {
                parenDepth++;
                text += ch;
                i++;
                continue;
            }

            if (ch === ')' || ch === ']') {
                if (parenDepth > 0) {
                    parenDepth--;
                }
                text += ch;
                i++;
                continue;
            }

            if (ch === '#' && !singleLineOuter) {
                while (i < len && src[i] !== '\n') {
                    i++;
                }
                continue;
            }

            if (singleLineOuter && ch === '\n') {
                return { end: i, text };
            }

            text += ch;
            i++;
        }

        return { end: i, text };
    }

    /**
     * Tokenize minified Python text (comments already stripped) for Pass 5 & Pass 6.
     * @private
     * @param {string} src
     * @returns {Array<{ type: string, text: string, start: number, end: number, isFString?: boolean }>}
     */
    static _tokenizePython(src) {
        const len = src.length;
        const tokens = [];
        let i = 0;

        while (i < len) {
            const ch = src[i];
            if (ch === '\n') {
                tokens.push({ type: 'nl', text: '\n', start: i, end: i + 1 });
                i++;
                continue;
            }
            if (ch === ' ' || ch === '\t') {
                let end = i + 1;
                while (end < len && (src[end] === ' ' || src[end] === '\t')) {
                    end++;
                }
                tokens.push({ type: 'ws', text: src.slice(i, end), start: i, end });
                i = end;
                continue;
            }
            const strInfo = PythonMinifier._matchStringStart(src, i);
            if (strInfo) {
                const scanned = PythonMinifier._scanString(src, i, strInfo);
                tokens.push({
                    type: 'string',
                    text: scanned.text,
                    start: i,
                    end: scanned.end,
                    isFString: strInfo.isFString
                });
                i = scanned.end;
                continue;
            }
            if (PythonMinifier._isIdentStart(ch)) {
                let end = i + 1;
                while (end < len && PythonMinifier._isIdentCont(src[end])) {
                    end++;
                }
                tokens.push({ type: 'word', text: src.slice(i, end), start: i, end });
                i = end;
                continue;
            }
            if (ch >= '0' && ch <= '9') {
                const end = PythonMinifier._scanNumberEnd(src, i);
                tokens.push({ type: 'number', text: src.slice(i, end), start: i, end });
                i = end;
                continue;
            }
            if (ch === '.') {
                tokens.push({ type: 'dot', text: '.', start: i, end: i + 1 });
                i++;
                continue;
            }
            const type = '()[]{},;:'.includes(ch) ? 'delim' : 'op';
            tokens.push({ type, text: ch, start: i, end: i + 1 });
            i++;
        }

        return tokens;
    }

    /**
     * Generate short valid Python identifiers not present in `forbidden`.
     * @private
     * @param {Set<string>} forbidden
     * @param {number} count
     * @returns {string[]}
     */
    static _allocShortNames(forbidden, count) {
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alnum = letters + '0123456789_';
        const out = [];

        for (let i = 0; i < letters.length && out.length < count; i++) {
            const cand = letters[i];
            if (!forbidden.has(cand) && !PythonMinifier.PYTHON_KEYWORDS.has(cand)) {
                out.push(cand);
            }
        }
        for (let i = 0; i < letters.length && out.length < count; i++) {
            for (let j = 0; j < alnum.length && out.length < count; j++) {
                const cand = letters[i] + alnum[j];
                if (!forbidden.has(cand) && !PythonMinifier.PYTHON_KEYWORDS.has(cand)) {
                    out.push(cand);
                }
            }
        }
        return out;
    }

    /**
     * Safely rename `self` and strictly local `def` variables (Pass 5).
     * Never renames parameters other than `self`, attributes (`.x`), keyword
     * arguments (`fn(x=...)`), module globals, or functions with inner `def`/eval.
     * @private
     * @param {string[]} lines
     * @returns {string[]}
     */
    static _renameFunctionLocals(lines) {
        const result = lines.slice();
        const getIndent = (line) => {
            let k = 0;
            while (k < line.length && line[k] === ' ') {
                k++;
            }
            return k;
        };
        const isDefLine = (line) => /^(?:async\s+)?def\s+[A-Za-z_]/.test(line.slice(getIndent(line)));
        const endsWithLineCont = (line) => /(?:^|[^\\])(?:\\\\)*\\$/.test(line);

        for (let li = 0; li < result.length; li++) {
            if (!isDefLine(result[li])) {
                continue;
            }
            const defIndent = getIndent(result[li]);
            let endLi = li + 1;
            while (endLi < result.length) {
                const trimmed = result[endLi].trim();
                if (
                    trimmed.length > 0 &&
                    getIndent(result[endLi]) <= defIndent &&
                    !endsWithLineCont(result[endLi - 1])
                ) {
                    break;
                }
                endLi++;
            }
            if (endLi - li < 2) {
                continue;
            }

            const chunk = result.slice(li, endLi).join('\n');
            const rewritten = PythonMinifier._rewriteSingleDef(chunk);
            if (rewritten !== null) {
                const rewrittenLines = rewritten.split('\n');
                // Guard against element count mismatch if a `def` contains an embedded multiline string.
                if (rewrittenLines.length === endLi - li) {
                    for (let k = 0; k < rewrittenLines.length; k++) {
                        result[li + k] = rewrittenLines[k];
                    }
                }
            }
        }
        return result;
    }

    /**
     * Analyze and rewrite one `def` block if safe; returns null to skip.
     * @private
     * @param {string} chunk
     * @returns {string|null}
     */
    static _rewriteSingleDef(chunk) {
        const tokens = PythonMinifier._tokenizePython(chunk);
        const nonWs = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type !== 'ws' && tokens[i].type !== 'nl') {
                nonWs.push({ ...tokens[i], rawIdx: i });
            }
        }
        if (nonWs.length < 5) {
            return null;
        }

        // Locate signature `( ... ):`
        let openParenIdx = -1;
        for (let i = 0; i < nonWs.length; i++) {
            if (nonWs[i].text === '(') {
                openParenIdx = i;
                break;
            }
        }
        if (openParenIdx < 2) {
            return null;
        }

        let sigDepth = 0;
        let closeParenIdx = -1;
        for (let i = openParenIdx; i < nonWs.length; i++) {
            if (nonWs[i].text === '(') sigDepth++;
            else if (nonWs[i].text === ')') {
                sigDepth--;
                if (sigDepth === 0) {
                    closeParenIdx = i;
                    break;
                }
            }
        }
        if (closeParenIdx === -1) {
            return null;
        }

        let colonIdx = -1;
        for (let i = closeParenIdx + 1; i < nonWs.length; i++) {
            if (nonWs[i].text === ':') {
                colonIdx = i;
                break;
            }
        }
        if (colonIdx === -1 || colonIdx + 1 >= nonWs.length) {
            return null;
        }

        // Parse parameter names cleanly at signature depth === 1
        const paramNames = [];
        let pDepth = 1;
        let expectingParam = true;
        for (let i = openParenIdx + 1; i < closeParenIdx; i++) {
            const t = nonWs[i].text;
            if (t === '(' || t === '[' || t === '{') {
                pDepth++;
                continue;
            }
            if (t === ')' || t === ']' || t === '}') {
                if (pDepth > 1) pDepth--;
                continue;
            }
            if (pDepth === 1) {
                if (expectingParam && nonWs[i].type === 'word') {
                    paramNames.push({ name: t, rawIdx: nonWs[i].rawIdx });
                    expectingParam = false;
                } else if (t === ',') {
                    expectingParam = true;
                }
            }
        }

        const bodyStart = colonIdx + 1;
        const forbidden = new Set(PythonMinifier.PYTHON_KEYWORDS);
        const allBareNames = new Set();
        for (const p of paramNames) {
            allBareNames.add(p.name);
        }

        // Reject outer defs with nested classes/defs, closures, or dynamic scope inspection
        for (let i = bodyStart; i < nonWs.length; i++) {
            const w = nonWs[i].text;
            if (nonWs[i].type === 'word') {
                if (w === 'def' || w === 'class' || w === 'nonlocal' || PythonMinifier.UNSAFE_SCOPE_BUILTINS.has(w)) {
                    return null;
                }
            }
        }

        const firstParamAfter = nonWs[openParenIdx + 2];
        const hasSelf = paramNames.length > 0 &&
            paramNames[0].name === 'self' &&
            firstParamAfter &&
            (firstParamAfter.text === ',' || firstParamAfter.text === ')');
        for (let i = hasSelf ? 1 : 0; i < paramNames.length; i++) {
            forbidden.add(paramNames[i].name);
        }

        // Protect any identifier referenced inside f-string expressions
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'string' && tokens[i].isFString) {
                const words = tokens[i].text.match(/[A-Za-z_][A-Za-z0-9_]*/g);
                if (words) {
                    for (const w of words) {
                        forbidden.add(w);
                        allBareNames.add(w);
                    }
                }
            }
        }

        // Mark attributes, kwarg labels, lambda params, globals/imports, and collect local bindings
        const isAttr = new Set();
        const isKwargLabel = new Set();
        const candidates = new Set();
        const counts = new Map();

        let pd = 0;
        let inGlobalOrImport = false;
        const lambdaPdStack = [];

        // First mark attributes and kwarg labels (excluding lambda default params) & collect all bare names
        for (let i = bodyStart; i < nonWs.length; i++) {
            const cur = nonWs[i];
            const prev = nonWs[i - 1];
            const next = nonWs[i + 1];
            const next2 = nonWs[i + 2];

            if (cur.text === '(' || cur.text === '[' || cur.text === '{') {
                pd++;
                continue;
            }
            if (cur.text === ')' || cur.text === ']' || cur.text === '}') {
                if (pd > 0) pd--;
                while (lambdaPdStack.length > 0 && lambdaPdStack[lambdaPdStack.length - 1] > pd) {
                    lambdaPdStack.pop();
                }
                continue;
            }
            if (cur.text === ':' && lambdaPdStack.length > 0 && pd === lambdaPdStack[lambdaPdStack.length - 1]) {
                lambdaPdStack.pop();
                continue;
            }

            if (cur.type !== 'word') {
                continue;
            }
            if (cur.text === 'lambda') {
                lambdaPdStack.push(pd);
            }
            if (prev && prev.text === '.') {
                isAttr.add(cur.rawIdx);
                continue;
            }
            const atLambdaParamDepth = lambdaPdStack.length > 0 && pd === lambdaPdStack[lambdaPdStack.length - 1];
            if (!atLambdaParamDepth && pd > 0 && prev && (prev.text === '(' || prev.text === ',') && next && next.text === '=' && (!next2 || next2.text !== '=')) {
                isKwargLabel.add(cur.rawIdx);
                continue;
            }
            allBareNames.add(cur.text);
        }

        // Walk body statements for `global`/`import`/`lambda`, `for`/`as` targets, and assignments
        pd = 0;
        lambdaPdStack.length = 0;
        let atStmtStart = true;
        let stmtIsCompound = false;
        let inForTargets = false;
        let inCompFor = false;
        for (let i = bodyStart; i < nonWs.length; i++) {
            const cur = nonWs[i];
            const prev = nonWs[i - 1];
            const next = nonWs[i + 1];

            if (pd === 0 && i > bodyStart && !(prev.type === 'op' && prev.text === '\\')) {
                for (let r = prev.rawIdx + 1; r < cur.rawIdx; r++) {
                    if (tokens[r].type === 'nl') {
                        atStmtStart = true;
                        stmtIsCompound = false;
                        inGlobalOrImport = false;
                        inForTargets = false;
                        lambdaPdStack.length = 0;
                        break;
                    }
                }
            }

            if (cur.text === '(' || cur.text === '[' || cur.text === '{') {
                pd++;
                atStmtStart = false;
                continue;
            }
            if (cur.text === ')' || cur.text === ']' || cur.text === '}') {
                if (pd > 0) pd--;
                if (pd === 0) inCompFor = false;
                while (lambdaPdStack.length > 0 && lambdaPdStack[lambdaPdStack.length - 1] > pd) {
                    lambdaPdStack.pop();
                }
                atStmtStart = false;
                continue;
            }

            if (cur.type === 'word') {
                if (atStmtStart && pd === 0) {
                    stmtIsCompound = PythonMinifier.COMPOUND_KEYWORDS.has(cur.text);
                }
                if (cur.text === 'global' || cur.text === 'import' || cur.text === 'from') {
                    inGlobalOrImport = true;
                    atStmtStart = false;
                    continue;
                }
                if (cur.text === 'lambda') {
                    lambdaPdStack.push(pd);
                    atStmtStart = false;
                    continue;
                }
                if (inGlobalOrImport && cur.text !== 'as') {
                    forbidden.add(cur.text);
                }
                if (lambdaPdStack.length > 0 && pd === lambdaPdStack[lambdaPdStack.length - 1] && !isAttr.has(cur.rawIdx)) {
                    forbidden.add(cur.text);
                }
                if (pd === 0 && cur.text === 'for') {
                    inForTargets = true;
                    atStmtStart = false;
                    continue;
                }
                if (pd > 0 && cur.text === 'for') {
                    inCompFor = true;
                    atStmtStart = false;
                    continue;
                }
                if (cur.text === 'in') {
                    inForTargets = false;
                    inCompFor = false;
                    atStmtStart = false;
                    continue;
                }
                const isBareTarget = !isAttr.has(cur.rawIdx) && (!next || (next.text !== '.' && next.text !== '[' && next.text !== '('));
                if (inForTargets) {
                    if (pd === 0 && isBareTarget) {
                        candidates.add(cur.text);
                    }
                } else if (inCompFor && !isAttr.has(cur.rawIdx)) {
                    forbidden.add(cur.text);
                } else if (prev && prev.text === 'as' && !inGlobalOrImport) {
                    if (isBareTarget) {
                        candidates.add(cur.text);
                    }
                } else if (pd === 0 && atStmtStart && !isAttr.has(cur.rawIdx) && !PythonMinifier.PYTHON_KEYWORDS.has(cur.text)) {
                    // Check `a = ...` or `a, b = ...` at statement start
                    let look = i + 1;
                    const targets = [cur.text];
                    let validAssign = false;
                    while (look < nonWs.length) {
                        const lt = nonWs[look];
                        if (lt.text === ',' && look + 1 < nonWs.length && nonWs[look + 1].type === 'word' && !isAttr.has(nonWs[look + 1].rawIdx)) {
                            targets.push(nonWs[look + 1].text);
                            look += 2;
                            continue;
                        }
                        if (lt.text === '=' && (look + 1 >= nonWs.length || nonWs[look + 1].text !== '=')) {
                            validAssign = true;
                        }
                        break;
                    }
                    if (validAssign) {
                        for (const t of targets) {
                            candidates.add(t);
                        }
                    }
                }
                if (!isAttr.has(cur.rawIdx) && !isKwargLabel.has(cur.rawIdx)) {
                    counts.set(cur.text, (counts.get(cur.text) || 0) + 1);
                }
                atStmtStart = false;
                continue;
            }

            if (cur.text === ':' && lambdaPdStack.length > 0 && pd === lambdaPdStack[lambdaPdStack.length - 1]) {
                lambdaPdStack.pop();
                atStmtStart = false;
                continue;
            }
            if (cur.text === ';' || (pd === 0 && cur.text === ':' && stmtIsCompound)) {
                atStmtStart = true;
                stmtIsCompound = false;
                inGlobalOrImport = false;
                inForTargets = false;
            } else {
                atStmtStart = false;
            }
        }
        // Check newline right after signature ':' too (reset cleanly was already covered since bodyStart follows ':')

        if (hasSelf && !forbidden.has('self')) {
            candidates.add('self');
            counts.set('self', (counts.get('self') || 0) + 1);
        }

        const eligible = [];
        for (const name of candidates) {
            if (forbidden.has(name) || PythonMinifier.PYTHON_KEYWORDS.has(name)) {
                continue;
            }
            const occ = counts.get(name) || 0;
            if (name.length > 1 && occ > 0) {
                eligible.push({ name, savings: (name.length - 1) * occ });
            }
        }
        if (eligible.length === 0) {
            return null;
        }

        eligible.sort((a, b) => b.savings - a.savings);
        const avoid = new Set(allBareNames);
        for (const w of forbidden) {
            avoid.add(w);
        }
        const shortNames = PythonMinifier._allocShortNames(avoid, eligible.length);
        const renameMap = new Map();
        for (let k = 0; k < eligible.length && k < shortNames.length; k++) {
            if (shortNames[k].length < eligible[k].name.length) {
                renameMap.set(eligible[k].name, shortNames[k]);
            }
        }
        if (renameMap.size === 0) {
            return null;
        }

        // Rewrite `self` in signature + eligible locals in body (excluding attrs and kwarg labels)
        const sigEndRaw = nonWs[closeParenIdx].rawIdx;
        const bodyStartRaw = nonWs[bodyStart].rawIdx;
        const out = [];
        for (let r = 0; r < tokens.length; r++) {
            const tok = tokens[r];
            if (tok.type === 'word' && !isAttr.has(r) && !isKwargLabel.has(r)) {
                if (hasSelf && r === paramNames[0].rawIdx && renameMap.has('self')) {
                    out.push(renameMap.get('self'));
                    continue;
                }
                if (r >= bodyStartRaw && r > sigEndRaw && renameMap.has(tok.text)) {
                    out.push(renameMap.get(tok.text));
                    continue;
                }
            }
            out.push(tok.text);
        }
        return out.join('');
    }

    /**
     * Pass 6 micro-optimizations: shorter base-10 literals, merging adjacent
     * top-level `import` lines, and hoisting repeated plain string literals.
     * @private
     * @param {string[]} lines
     * @returns {string[]}
     */
    static _applyPass6(lines) {
        if (lines.length === 0) {
            return lines;
        }

        // 6a: Merge consecutive simple `import mod` statements (`import a\nimport b` or `import a;import b` -> `import a,b`)
        const importSegRe = /^import [A-Za-z_][A-Za-z0-9_.]*(?:,[A-Za-z_][A-Za-z0-9_.]*)*$/;
        const mergedImports = [];
        for (const rawLine of lines) {
            const line = rawLine.startsWith('import ')
                ? rawLine.replace(/;import ([A-Za-z_][A-Za-z0-9_.]*(?:,[A-Za-z_][A-Za-z0-9_.]*)*)(?=$|;)/g, (full, mod, offset, str) => {
                    const prefix = str.slice(0, offset);
                    return importSegRe.test(prefix.split(';').pop()) ? `,${mod}` : full;
                })
                : rawLine;
            if (importSegRe.test(line) && mergedImports.length > 0 && importSegRe.test(mergedImports[mergedImports.length - 1])) {
                mergedImports[mergedImports.length - 1] = `${mergedImports[mergedImports.length - 1]},${line.slice(7)}`;
                continue;
            }
            mergedImports.push(line);
        }

        const joined = mergedImports.join('\n');
        const tokens = PythonMinifier._tokenizePython(joined);

        // 6b: Convert hex/bin/oct literals to decimal when strictly shorter
        const nonWsIndices = [];
        const allWords = new Set(PythonMinifier.PYTHON_KEYWORDS);
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            if (tok.type !== 'ws' && tok.type !== 'nl') {
                nonWsIndices.push(i);
            }
            if (tok.type === 'word') {
                allWords.add(tok.text);
            } else if (tok.type === 'string' && tok.isFString) {
                const fWords = tok.text.match(/[A-Za-z_][A-Za-z0-9_]*/g);
                if (fWords) {
                    for (const fw of fWords) {
                        allWords.add(fw);
                    }
                }
            } else if (tok.type === 'number' && tok.text.length > 2 && tok.text[0] === '0') {
                const prefix = tok.text[1];
                if (prefix === 'x' || prefix === 'X' || prefix === 'b' || prefix === 'B' || prefix === 'o' || prefix === 'O') {
                    try {
                        const dec = BigInt(tok.text.replace(/_/g, '')).toString(10);
                        if (dec.length < tok.text.length) {
                            tok.text = dec;
                        }
                    } catch (_) {
                        // keep original literal if malformed
                    }
                }
            }
        }

        // 6c: Pool repeated plain string literals (`count >= 3`, net gain > 0, never when dynamic scope builtins used)
        let hasDynamicScope = false;
        for (const unsafeWord of PythonMinifier.UNSAFE_SCOPE_BUILTINS) {
            if (allWords.has(unsafeWord)) {
                hasDynamicScope = true;
                break;
            }
        }
        const strCounts = new Map();
        const eligiblePositions = new Map();
        for (let ni = 0; !hasDynamicScope && ni < nonWsIndices.length; ni++) {
            const ti = nonWsIndices[ni];
            const tok = tokens[ti];
            if (tok.type !== 'string' || tok.isFString || tok.text.length < 5) {
                continue;
            }
            const prevTok = ni > 0 ? tokens[nonWsIndices[ni - 1]] : null;
            const nextTok = ni + 1 < nonWsIndices.length ? tokens[nonWsIndices[ni + 1]] : null;
            if ((prevTok && prevTok.type === 'string') || (nextTok && nextTok.type === 'string')) {
                continue;
            }
            strCounts.set(tok.text, (strCounts.get(tok.text) || 0) + 1);
            if (!eligiblePositions.has(tok.text)) {
                eligiblePositions.set(tok.text, []);
            }
            eligiblePositions.get(tok.text).push(ti);
        }

        const poolCandidates = [];
        for (const [lit, count] of strCounts.entries()) {
            if (count >= 3) {
                poolCandidates.push({ lit, count });
            }
        }

        if (poolCandidates.length > 0) {
            poolCandidates.sort((a, b) => (b.count * b.lit.length) - (a.count * a.lit.length));
            const varPool = PythonMinifier._allocPoolNames(allWords, poolCandidates.length);
            const decls = [];
            for (let k = 0; k < poolCandidates.length && k < varPool.length; k++) {
                const { lit, count } = poolCandidates[k];
                const vName = varPool[k];
                const netGain = count * (lit.length - vName.length) - (vName.length + 1 + lit.length + 1);
                if (netGain > 0) {
                    decls.push(`${vName}=${lit}`);
                    for (const ti of eligiblePositions.get(lit)) {
                        const prevRaw = ti > 0 ? tokens[ti - 1] : null;
                        const nextRaw = ti + 1 < tokens.length ? tokens[ti + 1] : null;
                        const needPre = prevRaw && (prevRaw.type === 'word' || prevRaw.type === 'number');
                        const needPost = nextRaw && (nextRaw.type === 'word' || nextRaw.type === 'number' || nextRaw.type === 'string');
                        tokens[ti].text = (needPre ? ' ' : '') + vName + (needPost ? ' ' : '');
                    }
                }
            }

            if (decls.length > 0) {
                const rebuilt = tokens.map((t) => t.text).join('').split('\n');
                let insertIdx = 0;
                while (insertIdx < rebuilt.length && /^from __future__ import\b/.test(rebuilt[insertIdx])) {
                    insertIdx++;
                }
                rebuilt.splice(insertIdx, 0, decls.join(';'));
                return rebuilt;
            }
        }

        return tokens.map((t) => t.text).join('').split('\n');
    }

    /**
     * Allocate short `_X` module-global identifiers for Pass 6 string pooling.
     * @private
     * @param {Set<string>} forbidden
     * @param {number} count
     * @returns {string[]}
     */
    static _allocPoolNames(forbidden, count) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const out = [];
        for (let i = 0; i < chars.length && out.length < count; i++) {
            const cand = '_' + chars[i];
            if (!forbidden.has(cand)) {
                out.push(cand);
            }
        }
        for (let i = 0; i < chars.length && out.length < count; i++) {
            for (let j = 0; j < chars.length && out.length < count; j++) {
                const cand = '_' + chars[i] + chars[j];
                if (!forbidden.has(cand)) {
                    out.push(cand);
                }
            }
        }
        return out;
    }
}

PythonMinifier.STRING_PREFIXES = new Set(['r', 'u', 'b', 'f', 'fr', 'rf', 'br', 'rb']);
PythonMinifier.COMPOUND_KEYWORDS = new Set([
    'def', 'async', 'class', 'if', 'elif', 'else',
    'for', 'while', 'try', 'except', 'finally', 'with'
]);
PythonMinifier.AMBIGUOUS_OP_PAIRS = new Set([
    '==', '!=', '<=', '>=', '//', '**', '<<', '>>',
    ':=', '->', '+=', '-=', '*=', '/=', '%=', '&=',
    '|=', '^=', '@='
]);
PythonMinifier.PYTHON_KEYWORDS = new Set([
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield'
]);
PythonMinifier.UNSAFE_SCOPE_BUILTINS = new Set(['locals', 'globals', 'vars', 'eval', 'exec', 'dir']);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PythonMinifier;
}
