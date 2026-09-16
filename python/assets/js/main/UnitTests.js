window.PythonUnitTestValues = window.PythonUnitTestValues || (function () {

    const EXPRESSION_TYPE = 'expression';
    const TYPE_OPTIONS = [
        { value: EXPRESSION_TYPE, label: 'Python' },
        { value: 'integer', label: 'Integer' },
        { value: 'float', label: 'Float' },
        { value: 'string', label: 'String' },
        { value: 'boolean', label: 'Boolean' },
        { value: 'list', label: 'List' },
        { value: 'none', label: 'None' }
    ];

    function isPlainObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    function isBlankText(value) {
        return String(value ?? '').trim() === '';
    }

    function escapePythonString(value) {
        return String(value)
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/'/g, "\\'");
    }

    function toPythonLiteral(value) {
        if (value === null) {
            return 'None';
        }
        if (Array.isArray(value)) {
            return `[${value.map((item) => toPythonLiteral(item)).join(', ')}]`;
        }
        if (isPlainObject(value)) {
            return `{${Object.entries(value)
                .map(([key, item]) => `${toPythonLiteral(String(key))}: ${toPythonLiteral(item)}`)
                .join(', ')}}`;
        }
        if (typeof value === 'string') {
            return `'${escapePythonString(value)}'`;
        }
        if (typeof value === 'boolean') {
            return value ? 'True' : 'False';
        }
        return String(value);
    }

    function deepEqual(left, right) {
        if (Array.isArray(left) && Array.isArray(right)) {
            if (left.length !== right.length) {
                return false;
            }
            for (let i = 0; i < left.length; i++) {
                if (!deepEqual(left[i], right[i])) {
                    return false;
                }
            }
            return true;
        }

        if (isPlainObject(left) && isPlainObject(right)) {
            const leftKeys = Object.keys(left);
            const rightKeys = Object.keys(right);
            if (!deepEqual(leftKeys.sort(), rightKeys.sort())) {
                return false;
            }
            for (const key of leftKeys) {
                if (!deepEqual(left[key], right[key])) {
                    return false;
                }
            }
            return true;
        }

        return left === right;
    }

    function splitTopLevel(text) {
        const parts = [];
        let current = '';
        let depth = 0;
        let stringDelimiter = null;
        let isEscaped = false;

        for (const character of text) {
            if (stringDelimiter !== null) {
                current += character;
                if (isEscaped) {
                    isEscaped = false;
                    continue;
                }
                if (character === '\\') {
                    isEscaped = true;
                    continue;
                }
                if (character === stringDelimiter) {
                    stringDelimiter = null;
                }
                continue;
            }

            if (character === '"' || character === "'") {
                stringDelimiter = character;
                current += character;
                continue;
            }

            if (character === '[' || character === '(' || character === '{') {
                depth += 1;
                current += character;
                continue;
            }

            if (character === ']' || character === ')' || character === '}') {
                depth = Math.max(0, depth - 1);
                current += character;
                continue;
            }

            if (character === ',' && depth === 0) {
                parts.push(current.trim());
                current = '';
                continue;
            }

            current += character;
        }

        if (current.trim() !== '') {
            parts.push(current.trim());
        }

        return parts;
    }

    function parseQuotedString(text, state) {
        const delimiter = text[state.index++];
        let output = '';

        while (state.index < text.length) {
            const character = text[state.index++];
            if (character === '\\') {
                const escaped = text[state.index++];
                switch (escaped) {
                    case 'n':
                        output += '\n';
                        break;
                    case 'r':
                        output += '\r';
                        break;
                    case 't':
                        output += '\t';
                        break;
                    case '\\':
                    case '"':
                    case "'":
                        output += escaped;
                        break;
                    default:
                        output += escaped;
                        break;
                }
                continue;
            }
            if (character === delimiter) {
                return output;
            }
            output += character;
        }

        throw new Error('Unterminated string literal');
    }

    function skipSpaces(text, state) {
        while (state.index < text.length && /\s/.test(text[state.index])) {
            state.index += 1;
        }
    }

    function parseNumber(text, state) {
        const match = text.slice(state.index).match(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
        if (!match) {
            throw new Error('Invalid number literal');
        }
        state.index += match[0].length;
        return Number(match[0]);
    }

    function parseCollection(text, state, opening, closing) {
        const isDict = opening === '{';
        const values = isDict ? {} : [];
        state.index += 1;
        skipSpaces(text, state);

        if (text[state.index] === closing) {
            state.index += 1;
            return values;
        }

        while (state.index < text.length) {
            if (isDict) {
                const key = parseValue(text, state);
                skipSpaces(text, state);
                if (text[state.index] !== ':') {
                    throw new Error('Invalid dict literal');
                }
                state.index += 1;
                const item = parseValue(text, state);
                values[String(key)] = item;
            } else {
                values.push(parseValue(text, state));
            }

            skipSpaces(text, state);
            if (text[state.index] === ',') {
                state.index += 1;
                skipSpaces(text, state);
                if (text[state.index] === closing) {
                    state.index += 1;
                    return values;
                }
                continue;
            }
            if (text[state.index] === closing) {
                state.index += 1;
                return values;
            }
            throw new Error('Invalid collection literal');
        }

        throw new Error('Unterminated collection literal');
    }

    function parseValue(text, state) {
        skipSpaces(text, state);
        const character = text[state.index];

        if (character === '"' || character === "'") {
            return parseQuotedString(text, state);
        }
        if (character === '[') {
            return parseCollection(text, state, '[', ']');
        }
        if (character === '(') {
            return parseCollection(text, state, '(', ')');
        }
        if (character === '{') {
            return parseCollection(text, state, '{', '}');
        }
        if (text.startsWith('True', state.index)) {
            state.index += 4;
            return true;
        }
        if (text.startsWith('False', state.index)) {
            state.index += 5;
            return false;
        }
        if (text.startsWith('None', state.index)) {
            state.index += 4;
            return null;
        }
        return parseNumber(text, state);
    }

    function parsePythonLiteral(text) {
        const normalized = String(text ?? '').trim();
        if (normalized === '') {
            return { ok: false, value: '' };
        }

        try {
            const state = { index: 0 };
            const value = parseValue(normalized, state);
            skipSpaces(normalized, state);
            if (state.index !== normalized.length) {
                throw new Error('Trailing characters');
            }
            return { ok: true, value };
        } catch (error) {
            return { ok: false, value: normalized };
        }
    }

    function parseExpressionValue(rawValue, allowSequence = false) {
        const normalized = String(rawValue ?? '').trim();
        if (normalized === '') {
            return '';
        }

        if (allowSequence) {
            const items = splitTopLevel(normalized);
            if (items.length > 1) {
                return items.map((item) => parseExpressionValue(item, false));
            }
        }

        const parsed = parsePythonLiteral(normalized);
        if (parsed.ok) {
            return parsed.value;
        }
        return normalized;
    }

    function parseBooleanValue(rawValue) {
        const normalized = String(rawValue ?? '').trim().toLowerCase();
        if (['true', 'vrai', '1'].includes(normalized)) {
            return { ok: true, value: true };
        }
        if (['false', 'faux', '0'].includes(normalized)) {
            return { ok: true, value: false };
        }
        return { ok: false, error: 'La valeur booléenne attendue est True/False.' };
    }

    function parseNumericValue(rawValue, allowFloat) {
        const normalized = String(rawValue ?? '').trim();
        const pattern = allowFloat
            ? /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/
            : /^[+-]?\d+$/;

        if (!pattern.test(normalized)) {
            return {
                ok: false,
                error: allowFloat
                    ? 'La valeur attendue est un nombre.'
                    : 'La valeur attendue est un entier.'
            };
        }

        return { ok: true, value: Number(normalized) };
    }

    function parseListValue(rawValue) {
        const normalized = String(rawValue ?? '').trim();
        const candidate = normalized === '' ? '[]' : (normalized.startsWith('[') ? normalized : `[${normalized}]`);
        const parsed = parsePythonLiteral(candidate);
        if (!parsed.ok || !Array.isArray(parsed.value)) {
            return { ok: false, error: 'La valeur attendue est une liste Python valide.' };
        }
        return { ok: true, value: parsed.value };
    }

    function parseFormValue(type, rawValue, options = {}) {
        const allowEmptyExpression = options.allowEmptyExpression === true;

        if (type === EXPRESSION_TYPE) {
            const normalized = String(rawValue ?? '').trim();
            if (normalized === '' && !allowEmptyExpression) {
                return { ok: false, skip: true };
            }
            return { ok: true, value: normalized };
        }
        if (type === 'string') {
            return { ok: true, value: String(rawValue ?? '') };
        }
        if (type === 'none') {
            return { ok: true, value: null };
        }
        if (type === 'boolean') {
            return parseBooleanValue(rawValue);
        }
        if (type === 'integer') {
            return parseNumericValue(rawValue, false);
        }
        if (type === 'float') {
            return parseNumericValue(rawValue, true);
        }
        if (type === 'list') {
            return parseListValue(rawValue);
        }
        return { ok: false, error: 'Type de test non supporté.' };
    }

    function serializeStoredValue(type, rawValue, options = {}) {
        const parsed = parseFormValue(type, rawValue, options);
        if (!parsed.ok) {
            return parsed;
        }
        return {
            ok: true,
            value: JSON.stringify({
                type: type,
                value: parsed.value
            })
        };
    }

    function deserializeStoredValue(storedValue) {
        if (isPlainObject(storedValue) && storedValue.type) {
            return storedValue;
        }

        if (typeof storedValue === 'string') {
            try {
                const parsed = JSON.parse(storedValue);
                if (isPlainObject(parsed) && parsed.type) {
                    return parsed;
                }
            } catch (error) {
                // Legacy value, keep the fallback below.
            }
        }

        const literal = String(storedValue ?? '').trim();
        if (literal === '') {
            return { type: EXPRESSION_TYPE, value: '' };
        }
        if (/^['"]/.test(literal)) {
            const parsed = parsePythonLiteral(literal);
            return { type: 'string', value: parsed.ok ? parsed.value : literal.slice(1, -1) };
        }
        if (/^\[/.test(literal)) {
            const parsed = parsePythonLiteral(literal);
            if (parsed.ok && Array.isArray(parsed.value)) {
                return { type: 'list', value: parsed.value };
            }
        }
        if (/^(True|False)$/i.test(literal)) {
            return { type: 'boolean', value: literal.toLowerCase() === 'true' };
        }
        if (/^None$/i.test(literal)) {
            return { type: 'none', value: null };
        }
        if (/^[+-]?\d+$/.test(literal)) {
            return { type: 'integer', value: Number(literal) };
        }
        if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(literal)) {
            return { type: 'float', value: Number(literal) };
        }
        return { type: EXPRESSION_TYPE, value: literal };
    }

    function formatValueForForm(entry) {
        if (!entry) {
            return '';
        }
        switch (entry.type) {
            case 'string':
                return entry.value ?? '';
            case 'boolean':
                return entry.value ? 'True' : 'False';
            case 'none':
                return '';
            case 'list':
                return Array.isArray(entry.value) ? toPythonLiteral(entry.value) : '[]';
            case 'integer':
            case 'float':
                return entry.value ?? '';
            case EXPRESSION_TYPE:
            default:
                return entry.value ?? '';
        }
    }

    function isMeaningfulEntry(entry) {
        if (!entry) {
            return false;
        }
        if (entry.type === EXPRESSION_TYPE) {
            return !isBlankText(entry.value);
        }
        if (entry.type === 'integer' || entry.type === 'float' || entry.type === 'boolean') {
            return entry.value !== '' && entry.value !== undefined;
        }
        return true;
    }

    function toPythonExpression(entry) {
        if (!entry) {
            return '';
        }
        if (entry.type === EXPRESSION_TYPE) {
            return String(entry.value ?? '').trim();
        }
        return toPythonLiteral(entry.value);
    }

    function toComparableValue(entry, allowSequence = false) {
        if (!entry) {
            return undefined;
        }
        if (entry.type === EXPRESSION_TYPE) {
            return parseExpressionValue(entry.value, allowSequence);
        }
        return entry.value;
    }

    function buildExpectedOutput(entries) {
        const meaningfulEntries = (entries || []).filter((entry) => isMeaningfulEntry(entry));
        if (meaningfulEntries.length === 0) {
            return undefined;
        }
        if (meaningfulEntries.length === 1) {
            return toComparableValue(meaningfulEntries[0], true);
        }
        return meaningfulEntries.map((entry) => toComparableValue(entry, false));
    }

    return {
        EXPRESSION_TYPE: EXPRESSION_TYPE,
        TYPE_OPTIONS: TYPE_OPTIONS,
        buildExpectedOutput: buildExpectedOutput,
        deepEqual: deepEqual,
        deserializeStoredValue: deserializeStoredValue,
        formatValueForForm: formatValueForForm,
        isMeaningfulEntry: isMeaningfulEntry,
        parseExpressionValue: parseExpressionValue,
        parseFormValue: parseFormValue,
        parsePythonLiteral: parsePythonLiteral,
        serializeStoredValue: serializeStoredValue,
        toComparableValue: toComparableValue,
        toPythonExpression: toPythonExpression
    };
}());

var UnitTests = (function () {

    let unitTestModels = false;

    /**
     * Load the tests linked to the project.
     * @param {ProjectPython} project
     */
    function init(project) {
        var p = new Promise(function (resolve, reject) {
            if (turtleAutocorrector.isEnabled()) {
                document.querySelector('.ide-btn-pythtest').style.display = 'block';
                Object.assign(document.querySelector('#runButtonPython').style, {
                    'borderTopRightRadius': '0',
                    'borderBottomRightRadius': '0'
                });
                return resolve();
            }
            if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') return resolve();
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=exercise&action=get_by_project",
                data: {
                    "project": project
                },
                success: function (response) {
                    if (response !== "null") {
                        getUnitTests(JSON.parse(response));
                    } else {
                        if (typeof xapiAutocorrection != 'undefined') {
                            xapiAutocorrection.alertNoUnitTest();
                        }
                    }
                    window.localStorage.PythonUnitTests = ""
                    $("#runButtonPython").css('border-radius', '15px');
                    $(".ide-btn-pythtest").hide()
                    resolve();
                }
            })
        });
    }

    /**
     * Load the unit tests linked to the exercise.
     * @param {ExercisePython} dataExercise
     */
    function getUnitTests(dataExercise) {
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=unitTests&action=get_by_exercise",
                data: {
                    "exercise": dataExercise
                },
                success: function (response) {
                    var response = JSON.parse(response);
                    if (response !== "false" && response != '[]' && response.length > 0) {
                        getUnitTestsIO(dataExercise, response, response.length);
                    } else
                        console.log("No unitTests loaded. 2");
                    window.localStorage.PythonUnitTests = ""
                    projectManager._currentExercise = ""
                    $("#runButtonPython").css('border-radius', '15px');
                    $(".ide-btn-valid").hide()
                }
            })
        });
    }

    /**
     * Load the inputs and outputs linked to the unit test.
     * @param {ExercisePython} dataExercise
     * @param {UnitTests} dataUnitTests
     */
    function getUnitTestsIO(dataExercise, dataUnitTests, index) {
        let allIO = [];

        function getNextUnitTestIO(index) {
            var index = index - 1;
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=unitTestsIO&action=get_by_unittest",
                data: {
                    "unitTest": dataUnitTests[index]
                },
                success: function (response) {

                    allIO.push(response);
                    if (index > 0) {

                        getNextUnitTestIO(index);
                    } else {
                        allIO.reverse();
                        window.localStorage.PythonUnitTests = JSON.stringify(renderUnitTestsModel(dataExercise, dataUnitTests, allIO));
                        projectManager._currentExercise = renderUnitTestsModel(dataExercise, dataUnitTests, allIO)
                        if (typeof ltiVariables13 !== 'undefined' && !ltiVariables13.isTeacher && ltiVariables13.customerSettings && ltiVariables13.customerSettings.validateButtonHidden) {
                            return;
                        }
                        
                        if(getParamValue('evidenceB') == null){
                            $("#runButtonPython").css({
                                'border-top-right-radius': '0',
                                'border-bottom-right-radius': '0'
                            });
                            $("#UTrunButtonPython").css({
                                'border-top-left-radius': '0',
                                'border-bottom-left-radius': '0'
                            });
                            $(".ide-btn-pythtest").show()
                        }
                    }
                }
            });
        }
        getNextUnitTestIO(index);
    }

    /**
     * Parse the inputs and outputs into arrays.
     * @param {ExercisePython} dataExercise
     * @param {UnitTests} dataUnitTests
     * @param {array} allIO
     */
    function renderUnitTestsModel(dataExercise, dataUnitTests, allIO) {

        function renderUnitTestIO(data) {
            if (data === false || !Array.isArray(data)) {
                return [];
            }
            return data.map((element) => {
                const deserializedValue = window.PythonUnitTestValues.deserializeStoredValue(element.value);
                return {
                    id: element.id,
                    type: deserializedValue.type,
                    value: deserializedValue.value
                };
            });
        }
        let exercise = {
            id: dataExercise.id,
            linkSolution: dataExercise.linkSolution,
            project: dataExercise.project,
            secretWord: dataExercise.secretWord,
            functionName: dataExercise.functionName
        };
        let unitTests = [];
        for (let i = 0; i < dataUnitTests.length; i++) {
            let IOParse = JSON.parse(allIO[i]);
            let unitTestRender = {
                id: dataUnitTests[i].id,
                name: dataUnitTests[i].name,
                hint: dataUnitTests[i].hint,
                inputs: renderUnitTestIO(IOParse.inputs),
                outputs: renderUnitTestIO(IOParse.outputs)
            };
            unitTests.push(unitTestRender);
        }
        unitTestModels = {
            exercise: exercise,
            unitTests: unitTests
        };
        return unitTestModels;
    }



    return {
        init: function (id) {
            return init(id);
        }
    }
}());
