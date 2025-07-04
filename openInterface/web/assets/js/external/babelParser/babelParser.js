/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/@babel/parser@7.22.16/lib/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
'use strict';
function _objectWithoutPropertiesLoose(e, t) {
	if (null == e) return {};
	var s,
		r,
		i = {},
		a = Object.keys(e);
	for (r = 0; r < a.length; r++) (s = a[r]), t.indexOf(s) >= 0 || (i[s] = e[s]);
	return i;
}
// Object.defineProperty(exports, '__esModule', { value: !0 });
class Position {
	constructor(e, t, s) {
		(this.line = void 0), (this.column = void 0), (this.index = void 0), (this.line = e), (this.column = t), (this.index = s);
	}
}
class SourceLocation {
	constructor(e, t) {
		(this.start = void 0), (this.end = void 0), (this.filename = void 0), (this.identifierName = void 0), (this.start = e), (this.end = t);
	}
}
function createPositionWithColumnOffset(e, t) {
	const { line: s, column: r, index: i } = e;
	return new Position(s, r + t, i + t);
}
const code = 'BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED';
var ModuleErrors = { ImportMetaOutsideModule: { message: 'import.meta may appear only with \'sourceType: "module"\'', code: code }, ImportOutsideModule: { message: "'import' and 'export' may appear only with 'sourceType: \"module\"'", code: code } };
const NodeDescriptions = {
		ArrayPattern: 'array destructuring pattern',
		AssignmentExpression: 'assignment expression',
		AssignmentPattern: 'assignment expression',
		ArrowFunctionExpression: 'arrow function expression',
		ConditionalExpression: 'conditional expression',
		CatchClause: 'catch clause',
		ForOfStatement: 'for-of statement',
		ForInStatement: 'for-in statement',
		ForStatement: 'for-loop',
		FormalParameters: 'function parameter list',
		Identifier: 'identifier',
		ImportSpecifier: 'import specifier',
		ImportDefaultSpecifier: 'import default specifier',
		ImportNamespaceSpecifier: 'import namespace specifier',
		ObjectPattern: 'object destructuring pattern',
		ParenthesizedExpression: 'parenthesized expression',
		RestElement: 'rest element',
		UpdateExpression: { true: 'prefix operation', false: 'postfix operation' },
		VariableDeclarator: 'variable declaration',
		YieldExpression: 'yield expression',
	},
	toNodeDescription = ({ type: e, prefix: t }) => ('UpdateExpression' === e ? NodeDescriptions.UpdateExpression[String(t)] : NodeDescriptions[e]);
var StandardErrors = {
		AccessorIsGenerator: ({ kind: e }) => `A ${e}ter cannot be a generator.`,
		ArgumentsInClass: "'arguments' is only allowed in functions and class methods.",
		AsyncFunctionInSingleStatementContext: 'Async functions can only be declared at the top level or inside a block.',
		AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.",
		AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.",
		AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.",
		AwaitUsingNotInAsyncContext: "'await using' is only allowed within async functions and at the top levels of modules.",
		AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.",
		AwaitNotInAsyncFunction: "'await' is only allowed within async functions.",
		BadGetterArity: "A 'get' accessor must not have any formal parameters.",
		BadSetterArity: "A 'set' accessor must have exactly one formal parameter.",
		BadSetterRestParameter: "A 'set' accessor function argument must not be a rest parameter.",
		ConstructorClassField: "Classes may not have a field named 'constructor'.",
		ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.",
		ConstructorIsAccessor: 'Class constructor may not be an accessor.',
		ConstructorIsAsync: "Constructor can't be an async function.",
		ConstructorIsGenerator: "Constructor can't be a generator.",
		DeclarationMissingInitializer: ({ kind: e }) => `Missing initializer in ${e} declaration.`,
		DecoratorArgumentsOutsideParentheses: "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
		DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.",
		DecoratorsBeforeAfterExport: "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
		DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
		DecoratorExportClass: "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.",
		DecoratorSemicolon: 'Decorators must not be followed by a semicolon.',
		DecoratorStaticBlock: "Decorators can't be used with a static block.",
		DeletePrivateField: 'Deleting a private field is not allowed.',
		DestructureNamedImport: 'ES2015 named imports do not destructure. Use another statement for destructuring after the import.',
		DuplicateConstructor: 'Duplicate constructor in the same class.',
		DuplicateDefaultExport: 'Only one default export allowed per module.',
		DuplicateExport: ({ exportName: e }) => `\`${e}\` has already been exported. Exported identifiers must be unique.`,
		DuplicateProto: 'Redefinition of __proto__ property.',
		DuplicateRegExpFlags: 'Duplicate regular expression flag.',
		ElementAfterRest: 'Rest element must be last element.',
		EscapedCharNotAnIdentifier: 'Invalid Unicode escape.',
		ExportBindingIsString: ({ localName: e, exportName: t }) => `A string literal cannot be used as an exported binding without \`from\`.\n- Did you mean \`export { '${e}' as '${t}' } from 'some-module'\`?`,
		ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.",
		ForInOfLoopInitializer: ({ type: e }) => `'${'ForInStatement' === e ? 'for-in' : 'for-of'}' loop variable declaration may not have an initializer.`,
		ForInUsing: "For-in loop may not start with 'using' declaration.",
		ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
		ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
		GeneratorInSingleStatementContext: 'Generators can only be declared at the top level or inside a block.',
		IllegalBreakContinue: ({ type: e }) => `Unsyntactic ${'BreakStatement' === e ? 'break' : 'continue'}.`,
		IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.",
		IllegalReturn: "'return' outside of function.",
		ImportAttributesUseAssert: 'The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedAssertSyntax: true` option in the import attributes plugin to suppress this error.',
		ImportBindingIsString: ({ importName: e }) => `A string literal cannot be used as an imported binding.\n- Did you mean \`import { "${e}" as foo }\`?`,
		ImportCallArgumentTrailingComma: 'Trailing comma is disallowed inside import(...) arguments.',
		ImportCallArity: ({ maxArgumentCount: e }) => `\`import()\` requires exactly ${1 === e ? 'one argument' : 'one or two arguments'}.`,
		ImportCallNotNewExpression: 'Cannot use new with import(...).',
		ImportCallSpreadArgument: '`...` is not allowed in `import()`.',
		ImportJSONBindingNotDefault: 'A JSON module can only be imported with `default`.',
		ImportReflectionHasAssertion: '`import module x` cannot have assertions.',
		ImportReflectionNotBinding: 'Only `import module x from "./module"` is valid.',
		IncompatibleRegExpUVFlags: "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
		InvalidBigIntLiteral: 'Invalid BigIntLiteral.',
		InvalidCodePoint: 'Code point out of bounds.',
		InvalidCoverInitializedName: 'Invalid shorthand property initializer.',
		InvalidDecimal: 'Invalid decimal.',
		InvalidDigit: ({ radix: e }) => `Expected number in radix ${e}.`,
		InvalidEscapeSequence: 'Bad character escape sequence.',
		InvalidEscapeSequenceTemplate: 'Invalid escape sequence in template.',
		InvalidEscapedReservedWord: ({ reservedWord: e }) => `Escape sequence in keyword ${e}.`,
		InvalidIdentifier: ({ identifierName: e }) => `Invalid identifier ${e}.`,
		InvalidLhs: ({ ancestor: e }) => `Invalid left-hand side in ${toNodeDescription(e)}.`,
		InvalidLhsBinding: ({ ancestor: e }) => `Binding invalid left-hand side in ${toNodeDescription(e)}.`,
		InvalidNumber: 'Invalid number.',
		InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.",
		InvalidOrUnexpectedToken: ({ unexpected: e }) => `Unexpected character '${e}'.`,
		InvalidParenthesizedAssignment: 'Invalid parenthesized assignment pattern.',
		InvalidPrivateFieldResolution: ({ identifierName: e }) => `Private name #${e} is not defined.`,
		InvalidPropertyBindingPattern: 'Binding member expression.',
		InvalidRecordProperty: 'Only properties and spread elements are allowed in record definitions.',
		InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
		LabelRedeclaration: ({ labelName: e }) => `Label '${e}' is already declared.`,
		LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
		LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
		MalformedRegExpFlags: 'Invalid regular expression flag.',
		MissingClassName: 'A class name is required.',
		MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
		MissingSemicolon: 'Missing semicolon.',
		MissingPlugin: ({ missingPlugin: e }) => `This experimental syntax requires enabling the parser plugin: ${e.map((e) => JSON.stringify(e)).join(', ')}.`,
		MissingOneOfPlugins: ({ missingPlugin: e }) => `This experimental syntax requires enabling one of the following parser plugin(s): ${e.map((e) => JSON.stringify(e)).join(', ')}.`,
		MissingUnicodeEscape: 'Expecting Unicode escape sequence \\uXXXX.',
		MixingCoalesceWithLogical: 'Nullish coalescing operator(??) requires parens when mixing with logical operators.',
		ModuleAttributeDifferentFromType: 'The only accepted module attribute is `type`.',
		ModuleAttributeInvalidValue: 'Only string literals are allowed as module attribute values.',
		ModuleAttributesWithDuplicateKeys: ({ key: e }) => `Duplicate key "${e}" is not allowed in module attributes.`,
		ModuleExportNameHasLoneSurrogate: ({ surrogateCharCode: e }) => `An export name cannot include a lone surrogate, found '\\u${e.toString(16)}'.`,
		ModuleExportUndefined: ({ localName: e }) => `Export '${e}' is not defined.`,
		MultipleDefaultsInSwitch: 'Multiple default clauses.',
		NewlineAfterThrow: 'Illegal newline after throw.',
		NoCatchOrFinally: 'Missing catch or finally clause.',
		NumberIdentifier: 'Identifier directly after number.',
		NumericSeparatorInEscapeSequence: 'Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.',
		ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
		OptionalChainingNoNew: 'Constructors in/after an Optional Chain are not allowed.',
		OptionalChainingNoTemplate: 'Tagged Template Literals are not allowed in optionalChain.',
		OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.",
		ParamDupe: 'Argument name clash.',
		PatternHasAccessor: "Object pattern can't contain getter or setter.",
		PatternHasMethod: "Object pattern can't contain methods.",
		PrivateInExpectedIn: ({ identifierName: e }) => `Private names are only allowed in property accesses (\`obj.#${e}\`) or in \`in\` expressions (\`#${e} in obj\`).`,
		PrivateNameRedeclaration: ({ identifierName: e }) => `Duplicate private name #${e}.`,
		RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
		RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
		RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
		RecordNoProto: "'__proto__' is not allowed in Record expressions.",
		RestTrailingComma: 'Unexpected trailing comma after rest element.',
		SloppyFunction: 'In non-strict mode code, functions can only be declared at top level or inside a block.',
		SloppyFunctionAnnexB: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.',
		StaticPrototype: 'Classes may not have static property named prototype.',
		SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
		SuperPrivateField: "Private fields can't be accessed on super.",
		TrailingDecorator: 'Decorators must be attached to a class element.',
		TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
		TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
		TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
		UnexpectedArgumentPlaceholder: 'Unexpected argument placeholder.',
		UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
		UnexpectedDigitAfterHash: 'Unexpected digit after hash token.',
		UnexpectedImportExport: "'import' and 'export' may only appear at the top level.",
		UnexpectedKeyword: ({ keyword: e }) => `Unexpected keyword '${e}'.`,
		UnexpectedLeadingDecorator: 'Leading decorators must be attached to a class declaration.',
		UnexpectedLexicalDeclaration: 'Lexical declaration cannot appear in a single-statement context.',
		UnexpectedNewTarget: '`new.target` can only be used in functions or class properties.',
		UnexpectedNumericSeparator: 'A numeric separator is only allowed between two digits.',
		UnexpectedPrivateField: 'Unexpected private name.',
		UnexpectedReservedWord: ({ reservedWord: e }) => `Unexpected reserved word '${e}'.`,
		UnexpectedSuper: "'super' is only allowed in object methods and classes.",
		UnexpectedToken: ({ expected: e, unexpected: t }) => `Unexpected token${t ? ` '${t}'.` : ''}${e ? `, expected "${e}"` : ''}`,
		UnexpectedTokenUnaryExponentiation: 'Illegal expression. Wrap left hand side or entire exponentiation in parentheses.',
		UnexpectedUsingDeclaration: 'Using declaration cannot appear in the top level when source type is `script`.',
		UnsupportedBind: 'Binding should be performed on object property.',
		UnsupportedDecoratorExport: 'A decorated export must export a class declaration.',
		UnsupportedDefaultExport: 'Only expressions, functions or classes are allowed as the `default` export.',
		UnsupportedImport: '`import` can only be used in `import()` or `import.meta`.',
		UnsupportedMetaProperty: ({ target: e, onlyValidPropertyName: t }) => `The only valid meta property for ${e} is ${e}.${t}.`,
		UnsupportedParameterDecorator: 'Decorators cannot be used to decorate parameters.',
		UnsupportedPropertyDecorator: 'Decorators cannot be used to decorate object literal properties.',
		UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
		UnterminatedComment: 'Unterminated comment.',
		UnterminatedRegExp: 'Unterminated regular expression.',
		UnterminatedString: 'Unterminated string constant.',
		UnterminatedTemplate: 'Unterminated template.',
		UsingDeclarationHasBindingPattern: 'Using declaration cannot have destructuring patterns.',
		VarRedeclaration: ({ identifierName: e }) => `Identifier '${e}' has already been declared.`,
		YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.",
		YieldInParameter: 'Yield expression is not allowed in formal parameters.',
		ZeroDigitNumericSeparator: 'Numeric separator can not be used after leading 0.',
	},
	StrictModeErrors = {
		StrictDelete: 'Deleting local variable in strict mode.',
		StrictEvalArguments: ({ referenceName: e }) => `Assigning to '${e}' in strict mode.`,
		StrictEvalArgumentsBinding: ({ bindingName: e }) => `Binding '${e}' in strict mode.`,
		StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block.',
		StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",
		StrictOctalLiteral: 'Legacy octal literals are not allowed in strict mode.',
		StrictWith: "'with' in strict mode.",
	};
const UnparenthesizedPipeBodyDescriptions = new Set(['ArrowFunctionExpression', 'AssignmentExpression', 'ConditionalExpression', 'YieldExpression']);
var PipelineOperatorErrors = {
	PipeBodyIsTighter: 'Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.',
	PipeTopicRequiresHackPipes: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.',
	PipeTopicUnbound: 'Topic reference is unbound; it must be inside a pipe body.',
	PipeTopicUnconfiguredToken: ({ token: e }) => `Invalid topic token ${e}. In order to use ${e} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${e}" }.`,
	PipeTopicUnused: 'Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.',
	PipeUnparenthesizedBody: ({ type: e }) => `Hack-style pipe body cannot be an unparenthesized ${toNodeDescription({ type: e })}; please wrap it in parentheses.`,
	PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.',
	PipelineBodySequenceExpression: 'Pipeline body may not be a comma-separated sequence expression.',
	PipelineHeadSequenceExpression: 'Pipeline head should not be a comma-separated sequence expression.',
	PipelineTopicUnused: 'Pipeline is in topic style but does not use topic reference.',
	PrimaryTopicNotAllowed: 'Topic reference was used in a lexical context without topic binding.',
	PrimaryTopicRequiresSmartPipeline: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.',
};
const _excluded$1 = ['toMessage'],
	_excluded2$1 = ['message'];
function defineHidden(e, t, s) {
	Object.defineProperty(e, t, { enumerable: !1, configurable: !0, value: s });
}
function toParseErrorConstructor(e) {
	let { toMessage: t } = e,
		s = _objectWithoutPropertiesLoose(e, _excluded$1);
	return function e({ loc: r, details: i }) {
		const a = new SyntaxError();
		return (
			Object.assign(a, s, { loc: r, pos: r.index }),
			'missingPlugin' in i && Object.assign(a, { missingPlugin: i.missingPlugin }),
			defineHidden(a, 'clone', function (t = {}) {
				var s;
				const { line: a, column: n, index: o } = null != (s = t.loc) ? s : r;
				return e({ loc: new Position(a, n, o), details: Object.assign({}, i, t.details) });
			}),
			defineHidden(a, 'details', i),
			Object.defineProperty(a, 'message', {
				configurable: !0,
				get() {
					const e = `${t(i)} (${r.line}:${r.column})`;
					return (this.message = e), e;
				},
				set(e) {
					Object.defineProperty(this, 'message', { value: e, writable: !0 });
				},
			}),
			a
		);
	};
}
function ParseErrorEnum(e, t) {
	if (Array.isArray(e)) return (t) => ParseErrorEnum(t, e[0]);
	const s = {};
	for (const r of Object.keys(e)) {
		const i = e[r],
			a = 'string' == typeof i ? { message: () => i } : 'function' == typeof i ? { message: i } : i,
			{ message: n } = a,
			o = _objectWithoutPropertiesLoose(a, _excluded2$1),
			h = 'string' == typeof n ? () => n : n;
		s[r] = toParseErrorConstructor(Object.assign({ code: 'BABEL_PARSER_SYNTAX_ERROR', reasonCode: r, toMessage: h }, t ? { syntaxPlugin: t } : {}, o));
	}
	return s;
}
const Errors = Object.assign({}, ParseErrorEnum(ModuleErrors), ParseErrorEnum(StandardErrors), ParseErrorEnum(StrictModeErrors), ParseErrorEnum`pipelineOperator`(PipelineOperatorErrors)),
	{ defineProperty: defineProperty } = Object,
	toUnenumerable = (e, t) => defineProperty(e, t, { enumerable: !1, value: e[t] });
function toESTreeLocation(e) {
	return e.loc.start && toUnenumerable(e.loc.start, 'index'), e.loc.end && toUnenumerable(e.loc.end, 'index'), e;
}
var estree = (e) =>
	class extends e {
		parse() {
			const e = toESTreeLocation(super.parse());
			return this.options.tokens && (e.tokens = e.tokens.map(toESTreeLocation)), e;
		}
		parseRegExpLiteral({ pattern: e, flags: t }) {
			let s = null;
			try {
				s = new RegExp(e, t);
			} catch (e) {}
			const r = this.estreeParseLiteral(s);
			return (r.regex = { pattern: e, flags: t }), r;
		}
		parseBigIntLiteral(e) {
			let t;
			try {
				t = BigInt(e);
			} catch (e) {
				t = null;
			}
			const s = this.estreeParseLiteral(t);
			return (s.bigint = String(s.value || e)), s;
		}
		parseDecimalLiteral(e) {
			const t = this.estreeParseLiteral(null);
			return (t.decimal = String(t.value || e)), t;
		}
		estreeParseLiteral(e) {
			return this.parseLiteral(e, 'Literal');
		}
		parseStringLiteral(e) {
			return this.estreeParseLiteral(e);
		}
		parseNumericLiteral(e) {
			return this.estreeParseLiteral(e);
		}
		parseNullLiteral() {
			return this.estreeParseLiteral(null);
		}
		parseBooleanLiteral(e) {
			return this.estreeParseLiteral(e);
		}
		directiveToStmt(e) {
			const t = e.value;
			delete e.value, (t.type = 'Literal'), (t.raw = t.extra.raw), (t.value = t.extra.expressionValue);
			const s = e;
			return (s.type = 'ExpressionStatement'), (s.expression = t), (s.directive = t.extra.rawValue), delete t.extra, s;
		}
		initFunction(e, t) {
			super.initFunction(e, t), (e.expression = !1);
		}
		checkDeclaration(e) {
			null != e && this.isObjectProperty(e) ? this.checkDeclaration(e.value) : super.checkDeclaration(e);
		}
		getObjectOrClassMethodParams(e) {
			return e.value.params;
		}
		isValidDirective(e) {
			var t;
			return 'ExpressionStatement' === e.type && 'Literal' === e.expression.type && 'string' == typeof e.expression.value && !(null != (t = e.expression.extra) && t.parenthesized);
		}
		parseBlockBody(e, t, s, r, i) {
			super.parseBlockBody(e, t, s, r, i);
			const a = e.directives.map((e) => this.directiveToStmt(e));
			(e.body = a.concat(e.body)), delete e.directives;
		}
		pushClassMethod(e, t, s, r, i, a) {
			this.parseMethod(t, s, r, i, a, 'ClassMethod', !0), t.typeParameters && ((t.value.typeParameters = t.typeParameters), delete t.typeParameters), e.body.push(t);
		}
		parsePrivateName() {
			const e = super.parsePrivateName();
			return this.getPluginOption('estree', 'classFeatures') ? this.convertPrivateNameToPrivateIdentifier(e) : e;
		}
		convertPrivateNameToPrivateIdentifier(e) {
			const t = super.getPrivateNameSV(e);
			return delete e.id, (e.name = t), (e.type = 'PrivateIdentifier'), e;
		}
		isPrivateName(e) {
			return this.getPluginOption('estree', 'classFeatures') ? 'PrivateIdentifier' === e.type : super.isPrivateName(e);
		}
		getPrivateNameSV(e) {
			return this.getPluginOption('estree', 'classFeatures') ? e.name : super.getPrivateNameSV(e);
		}
		parseLiteral(e, t) {
			const s = super.parseLiteral(e, t);
			return (s.raw = s.extra.raw), delete s.extra, s;
		}
		parseFunctionBody(e, t, s = !1) {
			super.parseFunctionBody(e, t, s), (e.expression = 'BlockStatement' !== e.body.type);
		}
		parseMethod(e, t, s, r, i, a, n = !1) {
			let o = this.startNode();
			return (o.kind = e.kind), (o = super.parseMethod(o, t, s, r, i, a, n)), (o.type = 'FunctionExpression'), delete o.kind, (e.value = o), 'ClassPrivateMethod' === a && (e.computed = !1), this.finishNode(e, 'MethodDefinition');
		}
		parseClassProperty(...e) {
			const t = super.parseClassProperty(...e);
			return this.getPluginOption('estree', 'classFeatures') ? ((t.type = 'PropertyDefinition'), t) : t;
		}
		parseClassPrivateProperty(...e) {
			const t = super.parseClassPrivateProperty(...e);
			return this.getPluginOption('estree', 'classFeatures') ? ((t.type = 'PropertyDefinition'), (t.computed = !1), t) : t;
		}
		parseObjectMethod(e, t, s, r, i) {
			const a = super.parseObjectMethod(e, t, s, r, i);
			return a && ((a.type = 'Property'), 'method' === a.kind && (a.kind = 'init'), (a.shorthand = !1)), a;
		}
		parseObjectProperty(e, t, s, r) {
			const i = super.parseObjectProperty(e, t, s, r);
			return i && ((i.kind = 'init'), (i.type = 'Property')), i;
		}
		isValidLVal(e, t, s) {
			return 'Property' === e ? 'value' : super.isValidLVal(e, t, s);
		}
		isAssignable(e, t) {
			return null != e && this.isObjectProperty(e) ? this.isAssignable(e.value, t) : super.isAssignable(e, t);
		}
		toAssignable(e, t = !1) {
			if (null != e && this.isObjectProperty(e)) {
				const { key: s, value: r } = e;
				this.isPrivateName(s) && this.classScope.usePrivateName(this.getPrivateNameSV(s), s.loc.start), this.toAssignable(r, t);
			} else super.toAssignable(e, t);
		}
		toAssignableObjectExpressionProp(e, t, s) {
			'get' === e.kind || 'set' === e.kind ? this.raise(Errors.PatternHasAccessor, { at: e.key }) : e.method ? this.raise(Errors.PatternHasMethod, { at: e.key }) : super.toAssignableObjectExpressionProp(e, t, s);
		}
		finishCallExpression(e, t) {
			const s = super.finishCallExpression(e, t);
			if ('Import' === s.callee.type) {
				var r;
				if (((s.type = 'ImportExpression'), (s.source = s.arguments[0]), this.hasPlugin('importAttributes') || this.hasPlugin('importAssertions'))) s.attributes = null != (r = s.arguments[1]) ? r : null;
				delete s.arguments, delete s.callee;
			}
			return s;
		}
		toReferencedArguments(e) {
			'ImportExpression' !== e.type && super.toReferencedArguments(e);
		}
		parseExport(e, t) {
			const s = this.state.lastTokStartLoc,
				r = super.parseExport(e, t);
			switch (r.type) {
				case 'ExportAllDeclaration':
					r.exported = null;
					break;
				case 'ExportNamedDeclaration':
					1 === r.specifiers.length && 'ExportNamespaceSpecifier' === r.specifiers[0].type && ((r.type = 'ExportAllDeclaration'), (r.exported = r.specifiers[0].exported), delete r.specifiers);
				case 'ExportDefaultDeclaration': {
					var i;
					const { declaration: e } = r;
					'ClassDeclaration' === (null == e ? void 0 : e.type) && (null == (i = e.decorators) ? void 0 : i.length) > 0 && e.start === r.start && this.resetStartLocation(r, s);
				}
			}
			return r;
		}
		parseSubscript(e, t, s, r) {
			const i = super.parseSubscript(e, t, s, r);
			if (r.optionalChainMember) {
				if ((('OptionalMemberExpression' !== i.type && 'OptionalCallExpression' !== i.type) || (i.type = i.type.substring(8)), r.stop)) {
					const e = this.startNodeAtNode(i);
					return (e.expression = i), this.finishNode(e, 'ChainExpression');
				}
			} else ('MemberExpression' !== i.type && 'CallExpression' !== i.type) || (i.optional = !1);
			return i;
		}
		hasPropertyAsPrivateName(e) {
			return 'ChainExpression' === e.type && (e = e.expression), super.hasPropertyAsPrivateName(e);
		}
		isObjectProperty(e) {
			return 'Property' === e.type && 'init' === e.kind && !e.method;
		}
		isObjectMethod(e) {
			return e.method || 'get' === e.kind || 'set' === e.kind;
		}
		finishNodeAt(e, t, s) {
			return toESTreeLocation(super.finishNodeAt(e, t, s));
		}
		resetStartLocation(e, t) {
			super.resetStartLocation(e, t), toESTreeLocation(e);
		}
		resetEndLocation(e, t = this.state.lastTokEndLoc) {
			super.resetEndLocation(e, t), toESTreeLocation(e);
		}
	};
class TokContext {
	constructor(e, t) {
		(this.token = void 0), (this.preserveSpace = void 0), (this.token = e), (this.preserveSpace = !!t);
	}
}
const types = { brace: new TokContext('{'), j_oTag: new TokContext('<tag'), j_cTag: new TokContext('</tag'), j_expr: new TokContext('<tag>...</tag>', !0) };
types.template = new TokContext('`', !0);
const beforeExpr = !0,
	startsExpr = !0,
	isLoop = !0,
	isAssign = !0,
	prefix = !0,
	postfix = !0;
class ExportedTokenType {
	constructor(e, t = {}) {
		(this.label = void 0),
			(this.keyword = void 0),
			(this.beforeExpr = void 0),
			(this.startsExpr = void 0),
			(this.rightAssociative = void 0),
			(this.isLoop = void 0),
			(this.isAssign = void 0),
			(this.prefix = void 0),
			(this.postfix = void 0),
			(this.binop = void 0),
			(this.label = e),
			(this.keyword = t.keyword),
			(this.beforeExpr = !!t.beforeExpr),
			(this.startsExpr = !!t.startsExpr),
			(this.rightAssociative = !!t.rightAssociative),
			(this.isLoop = !!t.isLoop),
			(this.isAssign = !!t.isAssign),
			(this.prefix = !!t.prefix),
			(this.postfix = !!t.postfix),
			(this.binop = null != t.binop ? t.binop : null),
			(this.updateContext = null);
	}
}
const keywords$1 = new Map();
function createKeyword(e, t = {}) {
	t.keyword = e;
	const s = createToken(e, t);
	return keywords$1.set(e, s), s;
}
function createBinop(e, t) {
	return createToken(e, { beforeExpr: true, binop: t });
}
let tokenTypeCounter = -1;
const tokenTypes = [],
	tokenLabels = [],
	tokenBinops = [],
	tokenBeforeExprs = [],
	tokenStartsExprs = [],
	tokenPrefixes = [];
function createToken(e, t = {}) {
	var s, r, i, a;
	return ++tokenTypeCounter, tokenLabels.push(e), tokenBinops.push(null != (s = t.binop) ? s : -1), tokenBeforeExprs.push(null != (r = t.beforeExpr) && r), tokenStartsExprs.push(null != (i = t.startsExpr) && i), tokenPrefixes.push(null != (a = t.prefix) && a), tokenTypes.push(new ExportedTokenType(e, t)), tokenTypeCounter;
}
function createKeywordLike(e, t = {}) {
	var s, r, i, a;
	return ++tokenTypeCounter, keywords$1.set(e, tokenTypeCounter), tokenLabels.push(e), tokenBinops.push(null != (s = t.binop) ? s : -1), tokenBeforeExprs.push(null != (r = t.beforeExpr) && r), tokenStartsExprs.push(null != (i = t.startsExpr) && i), tokenPrefixes.push(null != (a = t.prefix) && a), tokenTypes.push(new ExportedTokenType('name', t)), tokenTypeCounter;
}
const tt = {
	bracketL: createToken('[', { beforeExpr: true, startsExpr: true }),
	bracketHashL: createToken('#[', { beforeExpr: true, startsExpr: true }),
	bracketBarL: createToken('[|', { beforeExpr: true, startsExpr: true }),
	bracketR: createToken(']'),
	bracketBarR: createToken('|]'),
	braceL: createToken('{', { beforeExpr: true, startsExpr: true }),
	braceBarL: createToken('{|', { beforeExpr: true, startsExpr: true }),
	braceHashL: createToken('#{', { beforeExpr: true, startsExpr: true }),
	braceR: createToken('}'),
	braceBarR: createToken('|}'),
	parenL: createToken('(', { beforeExpr: true, startsExpr: true }),
	parenR: createToken(')'),
	comma: createToken(',', { beforeExpr: true }),
	semi: createToken(';', { beforeExpr: true }),
	colon: createToken(':', { beforeExpr: true }),
	doubleColon: createToken('::', { beforeExpr: true }),
	dot: createToken('.'),
	question: createToken('?', { beforeExpr: true }),
	questionDot: createToken('?.'),
	arrow: createToken('=>', { beforeExpr: true }),
	template: createToken('template'),
	ellipsis: createToken('...', { beforeExpr: true }),
	backQuote: createToken('`', { startsExpr: true }),
	dollarBraceL: createToken('${', { beforeExpr: true, startsExpr: true }),
	templateTail: createToken('...`', { startsExpr: true }),
	templateNonTail: createToken('...${', { beforeExpr: true, startsExpr: true }),
	at: createToken('@'),
	hash: createToken('#', { startsExpr: true }),
	interpreterDirective: createToken('#!...'),
	eq: createToken('=', { beforeExpr: true, isAssign: true }),
	assign: createToken('_=', { beforeExpr: true, isAssign: true }),
	slashAssign: createToken('_=', { beforeExpr: true, isAssign: true }),
	xorAssign: createToken('_=', { beforeExpr: true, isAssign: true }),
	moduloAssign: createToken('_=', { beforeExpr: true, isAssign: true }),
	incDec: createToken('++/--', { prefix: true, postfix: true, startsExpr: true }),
	bang: createToken('!', { beforeExpr: true, prefix: true, startsExpr: true }),
	tilde: createToken('~', { beforeExpr: true, prefix: true, startsExpr: true }),
	doubleCaret: createToken('^^', { startsExpr: true }),
	doubleAt: createToken('@@', { startsExpr: true }),
	pipeline: createBinop('|>', 0),
	nullishCoalescing: createBinop('??', 1),
	logicalOR: createBinop('||', 1),
	logicalAND: createBinop('&&', 2),
	bitwiseOR: createBinop('|', 3),
	bitwiseXOR: createBinop('^', 4),
	bitwiseAND: createBinop('&', 5),
	equality: createBinop('==/!=/===/!==', 6),
	lt: createBinop('</>/<=/>=', 7),
	gt: createBinop('</>/<=/>=', 7),
	relational: createBinop('</>/<=/>=', 7),
	bitShift: createBinop('<</>>/>>>', 8),
	bitShiftL: createBinop('<</>>/>>>', 8),
	bitShiftR: createBinop('<</>>/>>>', 8),
	plusMin: createToken('+/-', { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
	modulo: createToken('%', { binop: 10, startsExpr: true }),
	star: createToken('*', { binop: 10 }),
	slash: createBinop('/', 10),
	exponent: createToken('**', { beforeExpr: true, binop: 11, rightAssociative: !0 }),
	_in: createKeyword('in', { beforeExpr: true, binop: 7 }),
	_instanceof: createKeyword('instanceof', { beforeExpr: true, binop: 7 }),
	_break: createKeyword('break'),
	_case: createKeyword('case', { beforeExpr: true }),
	_catch: createKeyword('catch'),
	_continue: createKeyword('continue'),
	_debugger: createKeyword('debugger'),
	_default: createKeyword('default', { beforeExpr: true }),
	_else: createKeyword('else', { beforeExpr: true }),
	_finally: createKeyword('finally'),
	_function: createKeyword('function', { startsExpr: true }),
	_if: createKeyword('if'),
	_return: createKeyword('return', { beforeExpr: true }),
	_switch: createKeyword('switch'),
	_throw: createKeyword('throw', { beforeExpr: true, prefix: true, startsExpr: true }),
	_try: createKeyword('try'),
	_var: createKeyword('var'),
	_const: createKeyword('const'),
	_with: createKeyword('with'),
	_new: createKeyword('new', { beforeExpr: true, startsExpr: true }),
	_this: createKeyword('this', { startsExpr: true }),
	_super: createKeyword('super', { startsExpr: true }),
	_class: createKeyword('class', { startsExpr: true }),
	_extends: createKeyword('extends', { beforeExpr: true }),
	_export: createKeyword('export'),
	_import: createKeyword('import', { startsExpr: true }),
	_null: createKeyword('null', { startsExpr: true }),
	_true: createKeyword('true', { startsExpr: true }),
	_false: createKeyword('false', { startsExpr: true }),
	_typeof: createKeyword('typeof', { beforeExpr: true, prefix: true, startsExpr: true }),
	_void: createKeyword('void', { beforeExpr: true, prefix: true, startsExpr: true }),
	_delete: createKeyword('delete', { beforeExpr: true, prefix: true, startsExpr: true }),
	_do: createKeyword('do', { isLoop: true, beforeExpr: true }),
	_for: createKeyword('for', { isLoop: true }),
	_while: createKeyword('while', { isLoop: true }),
	_as: createKeywordLike('as', { startsExpr: true }),
	_assert: createKeywordLike('assert', { startsExpr: true }),
	_async: createKeywordLike('async', { startsExpr: true }),
	_await: createKeywordLike('await', { startsExpr: true }),
	_from: createKeywordLike('from', { startsExpr: true }),
	_get: createKeywordLike('get', { startsExpr: true }),
	_let: createKeywordLike('let', { startsExpr: true }),
	_meta: createKeywordLike('meta', { startsExpr: true }),
	_of: createKeywordLike('of', { startsExpr: true }),
	_sent: createKeywordLike('sent', { startsExpr: true }),
	_set: createKeywordLike('set', { startsExpr: true }),
	_static: createKeywordLike('static', { startsExpr: true }),
	_using: createKeywordLike('using', { startsExpr: true }),
	_yield: createKeywordLike('yield', { startsExpr: true }),
	_asserts: createKeywordLike('asserts', { startsExpr: true }),
	_checks: createKeywordLike('checks', { startsExpr: true }),
	_exports: createKeywordLike('exports', { startsExpr: true }),
	_global: createKeywordLike('global', { startsExpr: true }),
	_implements: createKeywordLike('implements', { startsExpr: true }),
	_intrinsic: createKeywordLike('intrinsic', { startsExpr: true }),
	_infer: createKeywordLike('infer', { startsExpr: true }),
	_is: createKeywordLike('is', { startsExpr: true }),
	_mixins: createKeywordLike('mixins', { startsExpr: true }),
	_proto: createKeywordLike('proto', { startsExpr: true }),
	_require: createKeywordLike('require', { startsExpr: true }),
	_satisfies: createKeywordLike('satisfies', { startsExpr: true }),
	_keyof: createKeywordLike('keyof', { startsExpr: true }),
	_readonly: createKeywordLike('readonly', { startsExpr: true }),
	_unique: createKeywordLike('unique', { startsExpr: true }),
	_abstract: createKeywordLike('abstract', { startsExpr: true }),
	_declare: createKeywordLike('declare', { startsExpr: true }),
	_enum: createKeywordLike('enum', { startsExpr: true }),
	_module: createKeywordLike('module', { startsExpr: true }),
	_namespace: createKeywordLike('namespace', { startsExpr: true }),
	_interface: createKeywordLike('interface', { startsExpr: true }),
	_type: createKeywordLike('type', { startsExpr: true }),
	_opaque: createKeywordLike('opaque', { startsExpr: true }),
	name: createToken('name', { startsExpr: true }),
	string: createToken('string', { startsExpr: true }),
	num: createToken('num', { startsExpr: true }),
	bigint: createToken('bigint', { startsExpr: true }),
	decimal: createToken('decimal', { startsExpr: true }),
	regexp: createToken('regexp', { startsExpr: true }),
	privateName: createToken('#name', { startsExpr: true }),
	eof: createToken('eof'),
	jsxName: createToken('jsxName'),
	jsxText: createToken('jsxText', { beforeExpr: !0 }),
	jsxTagStart: createToken('jsxTagStart', { startsExpr: !0 }),
	jsxTagEnd: createToken('jsxTagEnd'),
	placeholder: createToken('%%', { startsExpr: !0 }),
};
function tokenIsIdentifier(e) {
	return e >= 93 && e <= 130;
}
function tokenKeywordOrIdentifierIsKeyword(e) {
	return e <= 92;
}
function tokenIsKeywordOrIdentifier(e) {
	return e >= 58 && e <= 130;
}
function tokenIsLiteralPropertyName(e) {
	return e >= 58 && e <= 134;
}
function tokenComesBeforeExpression(e) {
	return tokenBeforeExprs[e];
}
function tokenCanStartExpression(e) {
	return tokenStartsExprs[e];
}
function tokenIsAssignment(e) {
	return e >= 29 && e <= 33;
}
function tokenIsFlowInterfaceOrTypeOrOpaque(e) {
	return e >= 127 && e <= 129;
}
function tokenIsLoop(e) {
	return e >= 90 && e <= 92;
}
function tokenIsKeyword(e) {
	return e >= 58 && e <= 92;
}
function tokenIsOperator(e) {
	return e >= 39 && e <= 59;
}
function tokenIsPostfix(e) {
	return 34 === e;
}
function tokenIsPrefix(e) {
	return tokenPrefixes[e];
}
function tokenIsTSTypeOperator(e) {
	return e >= 119 && e <= 121;
}
function tokenIsTSDeclarationStart(e) {
	return e >= 122 && e <= 128;
}
function tokenLabelName(e) {
	return tokenLabels[e];
}
function tokenOperatorPrecedence(e) {
	return tokenBinops[e];
}
function tokenIsRightAssociative(e) {
	return 57 === e;
}
function tokenIsTemplate(e) {
	return e >= 24 && e <= 25;
}
function getExportedToken(e) {
	return tokenTypes[e];
}
(tokenTypes[8].updateContext = (e) => {
	e.pop();
}),
	(tokenTypes[5].updateContext =
		tokenTypes[7].updateContext =
		tokenTypes[23].updateContext =
			(e) => {
				e.push(types.brace);
			}),
	(tokenTypes[22].updateContext = (e) => {
		e[e.length - 1] === types.template ? e.pop() : e.push(types.template);
	}),
	(tokenTypes[140].updateContext = (e) => {
		e.push(types.j_expr, types.j_oTag);
	});
let nonASCIIidentifierStartChars =
		'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
	nonASCIIidentifierChars =
		'‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿';
const nonASCIIidentifierStart = new RegExp('[' + nonASCIIidentifierStartChars + ']'),
	nonASCIIidentifier = new RegExp('[' + nonASCIIidentifierStartChars + nonASCIIidentifierChars + ']');
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
const astralIdentifierStartCodes = [
		0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1,
		79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45,
		20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2,
		64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221,
		3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191,
	],
	astralIdentifierCodes = [
		509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3,
		6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110,
		6, 6, 9, 4759, 9, 787719, 239,
	];
function isInAstralSet(e, t) {
	let s = 65536;
	for (let r = 0, i = t.length; r < i; r += 2) {
		if (((s += t[r]), s > e)) return !1;
		if (((s += t[r + 1]), s >= e)) return !0;
	}
	return !1;
}
function isIdentifierStart(e) {
	return e < 65 ? 36 === e : e <= 90 || (e < 97 ? 95 === e : e <= 122 || (e <= 65535 ? e >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(e)) : isInAstralSet(e, astralIdentifierStartCodes)));
}
function isIdentifierChar(e) {
	return e < 48 ? 36 === e : e < 58 || (!(e < 65) && (e <= 90 || (e < 97 ? 95 === e : e <= 122 || (e <= 65535 ? e >= 170 && nonASCIIidentifier.test(String.fromCharCode(e)) : isInAstralSet(e, astralIdentifierStartCodes) || isInAstralSet(e, astralIdentifierCodes)))));
}
const reservedWords = { keyword: ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'do', 'else', 'finally', 'for', 'function', 'if', 'return', 'switch', 'throw', 'try', 'var', 'const', 'while', 'with', 'new', 'this', 'super', 'class', 'extends', 'export', 'import', 'null', 'true', 'false', 'in', 'instanceof', 'typeof', 'void', 'delete'], strict: ['implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield'], strictBind: ['eval', 'arguments'] },
	keywords = new Set(reservedWords.keyword),
	reservedWordsStrictSet = new Set(reservedWords.strict),
	reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
function isReservedWord(e, t) {
	return (t && 'await' === e) || 'enum' === e;
}
function isStrictReservedWord(e, t) {
	return isReservedWord(e, t) || reservedWordsStrictSet.has(e);
}
function isStrictBindOnlyReservedWord(e) {
	return reservedWordsStrictBindSet.has(e);
}
function isStrictBindReservedWord(e, t) {
	return isStrictReservedWord(e, t) || isStrictBindOnlyReservedWord(e);
}
function isKeyword(e) {
	return keywords.has(e);
}
function isIteratorStart(e, t, s) {
	return 64 === e && 64 === t && isIdentifierStart(s);
}
const reservedWordLikeSet = new Set(['break', 'case', 'catch', 'continue', 'debugger', 'default', 'do', 'else', 'finally', 'for', 'function', 'if', 'return', 'switch', 'throw', 'try', 'var', 'const', 'while', 'with', 'new', 'this', 'super', 'class', 'extends', 'export', 'import', 'null', 'true', 'false', 'in', 'instanceof', 'typeof', 'void', 'delete', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'eval', 'arguments', 'enum', 'await']);
function canBeReservedWord(e) {
	return reservedWordLikeSet.has(e);
}
class Scope {
	constructor(e) {
		(this.var = new Set()), (this.lexical = new Set()), (this.functions = new Set()), (this.flags = e);
	}
}
class ScopeHandler {
	constructor(e, t) {
		(this.parser = void 0), (this.scopeStack = []), (this.inModule = void 0), (this.undefinedExports = new Map()), (this.parser = e), (this.inModule = t);
	}
	get inTopLevel() {
		return (1 & this.currentScope().flags) > 0;
	}
	get inFunction() {
		return (2 & this.currentVarScopeFlags()) > 0;
	}
	get allowSuper() {
		return (16 & this.currentThisScopeFlags()) > 0;
	}
	get allowDirectSuper() {
		return (32 & this.currentThisScopeFlags()) > 0;
	}
	get inClass() {
		return (64 & this.currentThisScopeFlags()) > 0;
	}
	get inClassAndNotInNonArrowFunction() {
		const e = this.currentThisScopeFlags();
		return (64 & e) > 0 && 0 == (2 & e);
	}
	get inStaticBlock() {
		for (let e = this.scopeStack.length - 1; ; e--) {
			const { flags: t } = this.scopeStack[e];
			if (128 & t) return !0;
			if (451 & t) return !1;
		}
	}
	get inNonArrowFunction() {
		return (2 & this.currentThisScopeFlags()) > 0;
	}
	get treatFunctionsAsVar() {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	}
	createScope(e) {
		return new Scope(e);
	}
	enter(e) {
		this.scopeStack.push(this.createScope(e));
	}
	exit() {
		return this.scopeStack.pop().flags;
	}
	treatFunctionsAsVarInScope(e) {
		return !!(130 & e.flags || (!this.parser.inModule && 1 & e.flags));
	}
	declareName(e, t, s) {
		let r = this.currentScope();
		if (8 & t || 16 & t) this.checkRedeclarationInScope(r, e, t, s), 16 & t ? r.functions.add(e) : r.lexical.add(e), 8 & t && this.maybeExportDefined(r, e);
		else if (4 & t) for (let i = this.scopeStack.length - 1; i >= 0 && ((r = this.scopeStack[i]), this.checkRedeclarationInScope(r, e, t, s), r.var.add(e), this.maybeExportDefined(r, e), !(387 & r.flags)); --i);
		this.parser.inModule && 1 & r.flags && this.undefinedExports.delete(e);
	}
	maybeExportDefined(e, t) {
		this.parser.inModule && 1 & e.flags && this.undefinedExports.delete(t);
	}
	checkRedeclarationInScope(e, t, s, r) {
		this.isRedeclaredInScope(e, t, s) && this.parser.raise(Errors.VarRedeclaration, { at: r, identifierName: t });
	}
	isRedeclaredInScope(e, t, s) {
		return !!(1 & s) && (8 & s ? e.lexical.has(t) || e.functions.has(t) || e.var.has(t) : 16 & s ? e.lexical.has(t) || (!this.treatFunctionsAsVarInScope(e) && e.var.has(t)) : (e.lexical.has(t) && !(8 & e.flags && e.lexical.values().next().value === t)) || (!this.treatFunctionsAsVarInScope(e) && e.functions.has(t)));
	}
	checkLocalExport(e) {
		const { name: t } = e,
			s = this.scopeStack[0];
		s.lexical.has(t) || s.var.has(t) || s.functions.has(t) || this.undefinedExports.set(t, e.loc.start);
	}
	currentScope() {
		return this.scopeStack[this.scopeStack.length - 1];
	}
	currentVarScopeFlags() {
		for (let e = this.scopeStack.length - 1; ; e--) {
			const { flags: t } = this.scopeStack[e];
			if (387 & t) return t;
		}
	}
	currentThisScopeFlags() {
		for (let e = this.scopeStack.length - 1; ; e--) {
			const { flags: t } = this.scopeStack[e];
			if (451 & t && !(4 & t)) return t;
		}
	}
}
class FlowScope extends Scope {
	constructor(...e) {
		super(...e), (this.declareFunctions = new Set());
	}
}
class FlowScopeHandler extends ScopeHandler {
	createScope(e) {
		return new FlowScope(e);
	}
	declareName(e, t, s) {
		const r = this.currentScope();
		if (2048 & t) return this.checkRedeclarationInScope(r, e, t, s), this.maybeExportDefined(r, e), void r.declareFunctions.add(e);
		super.declareName(e, t, s);
	}
	isRedeclaredInScope(e, t, s) {
		return !!super.isRedeclaredInScope(e, t, s) || (!!(2048 & s) && !e.declareFunctions.has(t) && (e.lexical.has(t) || e.functions.has(t)));
	}
	checkLocalExport(e) {
		this.scopeStack[0].declareFunctions.has(e.name) || super.checkLocalExport(e);
	}
}
class BaseParser {
	constructor() {
		(this.sawUnambiguousESM = !1), (this.ambiguousScriptDifferentAst = !1);
	}
	hasPlugin(e) {
		if ('string' == typeof e) return this.plugins.has(e);
		{
			const [t, s] = e;
			if (!this.hasPlugin(t)) return !1;
			const r = this.plugins.get(t);
			for (const e of Object.keys(s)) if ((null == r ? void 0 : r[e]) !== s[e]) return !1;
			return !0;
		}
	}
	getPluginOption(e, t) {
		var s;
		return null == (s = this.plugins.get(e)) ? void 0 : s[t];
	}
}
function setTrailingComments(e, t) {
	void 0 === e.trailingComments ? (e.trailingComments = t) : e.trailingComments.unshift(...t);
}
function setLeadingComments(e, t) {
	void 0 === e.leadingComments ? (e.leadingComments = t) : e.leadingComments.unshift(...t);
}
function setInnerComments(e, t) {
	void 0 === e.innerComments ? (e.innerComments = t) : e.innerComments.unshift(...t);
}
function adjustInnerComments(e, t, s) {
	let r = null,
		i = t.length;
	for (; null === r && i > 0; ) r = t[--i];
	null === r || r.start > s.start ? setInnerComments(e, s.comments) : setTrailingComments(r, s.comments);
}
class CommentsParser extends BaseParser {
	addComment(e) {
		this.filename && (e.loc.filename = this.filename), this.state.comments.push(e);
	}
	processComment(e) {
		const { commentStack: t } = this.state,
			s = t.length;
		if (0 === s) return;
		let r = s - 1;
		const i = t[r];
		i.start === e.end && ((i.leadingNode = e), r--);
		const { start: a } = e;
		for (; r >= 0; r--) {
			const s = t[r],
				i = s.end;
			if (!(i > a)) {
				i === a && (s.trailingNode = e);
				break;
			}
			(s.containingNode = e), this.finalizeComment(s), t.splice(r, 1);
		}
	}
	finalizeComment(e) {
		const { comments: t } = e;
		if (null !== e.leadingNode || null !== e.trailingNode) null !== e.leadingNode && setTrailingComments(e.leadingNode, t), null !== e.trailingNode && setLeadingComments(e.trailingNode, t);
		else {
			const { containingNode: s, start: r } = e;
			if (44 === this.input.charCodeAt(r - 1))
				switch (s.type) {
					case 'ObjectExpression':
					case 'ObjectPattern':
					case 'RecordExpression':
						adjustInnerComments(s, s.properties, e);
						break;
					case 'CallExpression':
					case 'OptionalCallExpression':
						adjustInnerComments(s, s.arguments, e);
						break;
					case 'FunctionDeclaration':
					case 'FunctionExpression':
					case 'ArrowFunctionExpression':
					case 'ObjectMethod':
					case 'ClassMethod':
					case 'ClassPrivateMethod':
						adjustInnerComments(s, s.params, e);
						break;
					case 'ArrayExpression':
					case 'ArrayPattern':
					case 'TupleExpression':
						adjustInnerComments(s, s.elements, e);
						break;
					case 'ExportNamedDeclaration':
					case 'ImportDeclaration':
						adjustInnerComments(s, s.specifiers, e);
						break;
					default:
						setInnerComments(s, t);
				}
			else setInnerComments(s, t);
		}
	}
	finalizeRemainingComments() {
		const { commentStack: e } = this.state;
		for (let t = e.length - 1; t >= 0; t--) this.finalizeComment(e[t]);
		this.state.commentStack = [];
	}
	resetPreviousNodeTrailingComments(e) {
		const { commentStack: t } = this.state,
			{ length: s } = t;
		if (0 === s) return;
		const r = t[s - 1];
		r.leadingNode === e && (r.leadingNode = null);
	}
	resetPreviousIdentifierLeadingComments(e) {
		const { commentStack: t } = this.state,
			{ length: s } = t;
		0 !== s && (t[s - 1].trailingNode === e ? (t[s - 1].trailingNode = null) : s >= 2 && t[s - 2].trailingNode === e && (t[s - 2].trailingNode = null));
	}
	takeSurroundingComments(e, t, s) {
		const { commentStack: r } = this.state,
			i = r.length;
		if (0 === i) return;
		let a = i - 1;
		for (; a >= 0; a--) {
			const i = r[a],
				n = i.end;
			if (i.start === s) i.leadingNode = e;
			else if (n === t) i.trailingNode = e;
			else if (n < t) break;
		}
	}
}
const lineBreak = /\r\n?|[\n\u2028\u2029]/,
	lineBreakG = new RegExp(lineBreak.source, 'g');
function isNewLine(e) {
	switch (e) {
		case 10:
		case 13:
		case 8232:
		case 8233:
			return !0;
		default:
			return !1;
	}
}
const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
	skipWhiteSpaceInLine = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g,
	skipWhiteSpaceToLineBreak = new RegExp('(?=(' + skipWhiteSpaceInLine.source + '))\\1' + /(?=[\n\r\u2028\u2029]|\/\*(?!.*?\*\/)|$)/.source, 'y');
function isWhitespace(e) {
	switch (e) {
		case 9:
		case 11:
		case 12:
		case 32:
		case 160:
		case 5760:
		case 8192:
		case 8193:
		case 8194:
		case 8195:
		case 8196:
		case 8197:
		case 8198:
		case 8199:
		case 8200:
		case 8201:
		case 8202:
		case 8239:
		case 8287:
		case 12288:
		case 65279:
			return !0;
		default:
			return !1;
	}
}
class State {
	constructor() {
		(this.strict = void 0),
			(this.curLine = void 0),
			(this.lineStart = void 0),
			(this.startLoc = void 0),
			(this.endLoc = void 0),
			(this.errors = []),
			(this.potentialArrowAt = -1),
			(this.noArrowAt = []),
			(this.noArrowParamsConversionAt = []),
			(this.maybeInArrowParameters = !1),
			(this.inType = !1),
			(this.noAnonFunctionType = !1),
			(this.hasFlowComment = !1),
			(this.isAmbientContext = !1),
			(this.inAbstractClass = !1),
			(this.inDisallowConditionalTypesContext = !1),
			(this.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null }),
			(this.soloAwait = !1),
			(this.inFSharpPipelineDirectBody = !1),
			(this.labels = []),
			(this.comments = []),
			(this.commentStack = []),
			(this.pos = 0),
			(this.type = 137),
			(this.value = null),
			(this.start = 0),
			(this.end = 0),
			(this.lastTokEndLoc = null),
			(this.lastTokStartLoc = null),
			(this.lastTokStart = 0),
			(this.context = [types.brace]),
			(this.canStartJSXElement = !0),
			(this.containsEsc = !1),
			(this.firstInvalidTemplateEscapePos = null),
			(this.strictErrors = new Map()),
			(this.tokensLength = 0);
	}
	init({ strictMode: e, sourceType: t, startLine: s, startColumn: r }) {
		(this.strict = !1 !== e && (!0 === e || 'module' === t)), (this.curLine = s), (this.lineStart = -r), (this.startLoc = this.endLoc = new Position(s, r, 0));
	}
	curPosition() {
		return new Position(this.curLine, this.pos - this.lineStart, this.pos);
	}
	clone(e) {
		const t = new State(),
			s = Object.keys(this);
		for (let r = 0, i = s.length; r < i; r++) {
			const i = s[r];
			let a = this[i];
			!e && Array.isArray(a) && (a = a.slice()), (t[i] = a);
		}
		return t;
	}
}
var _isDigit = function (e) {
	return e >= 48 && e <= 57;
};
const forbiddenNumericSeparatorSiblings = { decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]), hex: new Set([46, 88, 95, 120]) },
	isAllowedNumericSeparatorSibling = { bin: (e) => 48 === e || 49 === e, oct: (e) => e >= 48 && e <= 55, dec: (e) => e >= 48 && e <= 57, hex: (e) => (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102) };
function readStringContents(e, t, s, r, i, a) {
	const n = s,
		o = r,
		h = i;
	let p = '',
		c = null,
		l = s;
	const { length: d } = t;
	for (;;) {
		if (s >= d) {
			a.unterminated(n, o, h), (p += t.slice(l, s));
			break;
		}
		const u = t.charCodeAt(s);
		if (isStringEnd(e, u, t, s)) {
			p += t.slice(l, s);
			break;
		}
		if (92 === u) {
			p += t.slice(l, s);
			const n = readEscapedChar(t, s, r, i, 'template' === e, a);
			null !== n.ch || c ? (p += n.ch) : (c = { pos: s, lineStart: r, curLine: i }), ({ pos: s, lineStart: r, curLine: i } = n), (l = s);
		} else 8232 === u || 8233 === u ? (++i, (r = ++s)) : 10 === u || 13 === u ? ('template' === e ? ((p += t.slice(l, s) + '\n'), ++s, 13 === u && 10 === t.charCodeAt(s) && ++s, ++i, (l = r = s)) : a.unterminated(n, o, h)) : ++s;
	}
	return { pos: s, str: p, firstInvalidLoc: c, lineStart: r, curLine: i, containsInvalid: !!c };
}
function isStringEnd(e, t, s, r) {
	return 'template' === e ? 96 === t || (36 === t && 123 === s.charCodeAt(r + 1)) : t === ('double' === e ? 34 : 39);
}
function readEscapedChar(e, t, s, r, i, a) {
	const n = !i;
	t++;
	const o = (e) => ({ pos: t, ch: e, lineStart: s, curLine: r }),
		h = e.charCodeAt(t++);
	switch (h) {
		case 110:
			return o('\n');
		case 114:
			return o('\r');
		case 120: {
			let i;
			return ({ code: i, pos: t } = readHexChar(e, t, s, r, 2, !1, n, a)), o(null === i ? null : String.fromCharCode(i));
		}
		case 117: {
			let i;
			return ({ code: i, pos: t } = readCodePoint(e, t, s, r, n, a)), o(null === i ? null : String.fromCodePoint(i));
		}
		case 116:
			return o('\t');
		case 98:
			return o('\b');
		case 118:
			return o('\v');
		case 102:
			return o('\f');
		case 13:
			10 === e.charCodeAt(t) && ++t;
		case 10:
			(s = t), ++r;
		case 8232:
		case 8233:
			return o('');
		case 56:
		case 57:
			if (i) return o(null);
			a.strictNumericEscape(t - 1, s, r);
		default:
			if (h >= 48 && h <= 55) {
				const n = t - 1;
				let h = e.slice(n, t + 2).match(/^[0-7]+/)[0],
					p = parseInt(h, 8);
				p > 255 && ((h = h.slice(0, -1)), (p = parseInt(h, 8))), (t += h.length - 1);
				const c = e.charCodeAt(t);
				if ('0' !== h || 56 === c || 57 === c) {
					if (i) return o(null);
					a.strictNumericEscape(n, s, r);
				}
				return o(String.fromCharCode(p));
			}
			return o(String.fromCharCode(h));
	}
}
function readHexChar(e, t, s, r, i, a, n, o) {
	const h = t;
	let p;
	return ({ n: p, pos: t } = readInt(e, t, s, r, 16, i, a, !1, o, !n)), null === p && (n ? o.invalidEscapeSequence(h, s, r) : (t = h - 1)), { code: p, pos: t };
}
function readInt(e, t, s, r, i, a, n, o, h, p) {
	const c = t,
		l = 16 === i ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct,
		d = 16 === i ? isAllowedNumericSeparatorSibling.hex : 10 === i ? isAllowedNumericSeparatorSibling.dec : 8 === i ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
	let u = !1,
		m = 0;
	for (let c = 0, f = null == a ? 1 / 0 : a; c < f; ++c) {
		const a = e.charCodeAt(t);
		let c;
		if (95 !== a || 'bail' === o) {
			if (((c = a >= 97 ? a - 97 + 10 : a >= 65 ? a - 65 + 10 : _isDigit(a) ? a - 48 : 1 / 0), c >= i)) {
				if (c <= 9 && p) return { n: null, pos: t };
				if (c <= 9 && h.invalidDigit(t, s, r, i)) c = 0;
				else {
					if (!n) break;
					(c = 0), (u = !0);
				}
			}
			++t, (m = m * i + c);
		} else {
			const i = e.charCodeAt(t - 1),
				a = e.charCodeAt(t + 1);
			if (o) {
				if (Number.isNaN(a) || !d(a) || l.has(i) || l.has(a)) {
					if (p) return { n: null, pos: t };
					h.unexpectedNumericSeparator(t, s, r);
				}
			} else {
				if (p) return { n: null, pos: t };
				h.numericSeparatorInEscapeSequence(t, s, r);
			}
			++t;
		}
	}
	return t === c || (null != a && t - c !== a) || u ? { n: null, pos: t } : { n: m, pos: t };
}
function readCodePoint(e, t, s, r, i, a) {
	let n;
	if (123 === e.charCodeAt(t)) {
		if ((++t, ({ code: n, pos: t } = readHexChar(e, t, s, r, e.indexOf('}', t) - t, !0, i, a)), ++t, null !== n && n > 1114111)) {
			if (!i) return { code: null, pos: t };
			a.invalidCodePoint(t, s, r);
		}
	} else ({ code: n, pos: t } = readHexChar(e, t, s, r, 4, !1, i, a));
	return { code: n, pos: t };
}
const _excluded = ['at'],
	_excluded2 = ['at'];
function buildPosition(e, t, s) {
	return new Position(s, e - t, e);
}
const VALID_REGEX_FLAGS = new Set([103, 109, 115, 105, 121, 117, 100, 118]);
class Token {
	constructor(e) {
		(this.type = e.type), (this.value = e.value), (this.start = e.start), (this.end = e.end), (this.loc = new SourceLocation(e.startLoc, e.endLoc));
	}
}
class Tokenizer extends CommentsParser {
	constructor(e, t) {
		super(),
			(this.isLookahead = void 0),
			(this.tokens = []),
			(this.errorHandlers_readInt = { invalidDigit: (e, t, s, r) => !!this.options.errorRecovery && (this.raise(Errors.InvalidDigit, { at: buildPosition(e, t, s), radix: r }), !0), numericSeparatorInEscapeSequence: this.errorBuilder(Errors.NumericSeparatorInEscapeSequence), unexpectedNumericSeparator: this.errorBuilder(Errors.UnexpectedNumericSeparator) }),
			(this.errorHandlers_readCodePoint = Object.assign({}, this.errorHandlers_readInt, { invalidEscapeSequence: this.errorBuilder(Errors.InvalidEscapeSequence), invalidCodePoint: this.errorBuilder(Errors.InvalidCodePoint) })),
			(this.errorHandlers_readStringContents_string = Object.assign({}, this.errorHandlers_readCodePoint, {
				strictNumericEscape: (e, t, s) => {
					this.recordStrictModeErrors(Errors.StrictNumericEscape, { at: buildPosition(e, t, s) });
				},
				unterminated: (e, t, s) => {
					throw this.raise(Errors.UnterminatedString, { at: buildPosition(e - 1, t, s) });
				},
			})),
			(this.errorHandlers_readStringContents_template = Object.assign({}, this.errorHandlers_readCodePoint, {
				strictNumericEscape: this.errorBuilder(Errors.StrictNumericEscape),
				unterminated: (e, t, s) => {
					throw this.raise(Errors.UnterminatedTemplate, { at: buildPosition(e, t, s) });
				},
			})),
			(this.state = new State()),
			this.state.init(e),
			(this.input = t),
			(this.length = t.length),
			(this.isLookahead = !1);
	}
	pushToken(e) {
		(this.tokens.length = this.state.tokensLength), this.tokens.push(e), ++this.state.tokensLength;
	}
	next() {
		this.checkKeywordEscapes(), this.options.tokens && this.pushToken(new Token(this.state)), (this.state.lastTokStart = this.state.start), (this.state.lastTokEndLoc = this.state.endLoc), (this.state.lastTokStartLoc = this.state.startLoc), this.nextToken();
	}
	eat(e) {
		return !!this.match(e) && (this.next(), !0);
	}
	match(e) {
		return this.state.type === e;
	}
	createLookaheadState(e) {
		return { pos: e.pos, value: null, type: e.type, start: e.start, end: e.end, context: [this.curContext()], inType: e.inType, startLoc: e.startLoc, lastTokEndLoc: e.lastTokEndLoc, curLine: e.curLine, lineStart: e.lineStart, curPosition: e.curPosition };
	}
	lookahead() {
		const e = this.state;
		(this.state = this.createLookaheadState(e)), (this.isLookahead = !0), this.nextToken(), (this.isLookahead = !1);
		const t = this.state;
		return (this.state = e), t;
	}
	nextTokenStart() {
		return this.nextTokenStartSince(this.state.pos);
	}
	nextTokenStartSince(e) {
		return (skipWhiteSpace.lastIndex = e), skipWhiteSpace.test(this.input) ? skipWhiteSpace.lastIndex : e;
	}
	lookaheadCharCode() {
		return this.input.charCodeAt(this.nextTokenStart());
	}
	nextTokenInLineStart() {
		return this.nextTokenInLineStartSince(this.state.pos);
	}
	nextTokenInLineStartSince(e) {
		return (skipWhiteSpaceInLine.lastIndex = e), skipWhiteSpaceInLine.test(this.input) ? skipWhiteSpaceInLine.lastIndex : e;
	}
	lookaheadInLineCharCode() {
		return this.input.charCodeAt(this.nextTokenInLineStart());
	}
	codePointAtPos(e) {
		let t = this.input.charCodeAt(e);
		if (55296 == (64512 & t) && ++e < this.input.length) {
			const s = this.input.charCodeAt(e);
			56320 == (64512 & s) && (t = 65536 + ((1023 & t) << 10) + (1023 & s));
		}
		return t;
	}
	setStrict(e) {
		(this.state.strict = e), e && (this.state.strictErrors.forEach(([e, t]) => this.raise(e, { at: t })), this.state.strictErrors.clear());
	}
	curContext() {
		return this.state.context[this.state.context.length - 1];
	}
	nextToken() {
		this.skipSpace(), (this.state.start = this.state.pos), this.isLookahead || (this.state.startLoc = this.state.curPosition()), this.state.pos >= this.length ? this.finishToken(137) : this.getTokenFromCode(this.codePointAtPos(this.state.pos));
	}
	skipBlockComment(e) {
		let t;
		this.isLookahead || (t = this.state.curPosition());
		const s = this.state.pos,
			r = this.input.indexOf(e, s + 2);
		if (-1 === r) throw this.raise(Errors.UnterminatedComment, { at: this.state.curPosition() });
		for (this.state.pos = r + e.length, lineBreakG.lastIndex = s + 2; lineBreakG.test(this.input) && lineBreakG.lastIndex <= r; ) ++this.state.curLine, (this.state.lineStart = lineBreakG.lastIndex);
		if (this.isLookahead) return;
		const i = { type: 'CommentBlock', value: this.input.slice(s + 2, r), start: s, end: r + e.length, loc: new SourceLocation(t, this.state.curPosition()) };
		return this.options.tokens && this.pushToken(i), i;
	}
	skipLineComment(e) {
		const t = this.state.pos;
		let s;
		this.isLookahead || (s = this.state.curPosition());
		let r = this.input.charCodeAt((this.state.pos += e));
		if (this.state.pos < this.length) for (; !isNewLine(r) && ++this.state.pos < this.length; ) r = this.input.charCodeAt(this.state.pos);
		if (this.isLookahead) return;
		const i = this.state.pos,
			a = { type: 'CommentLine', value: this.input.slice(t + e, i), start: t, end: i, loc: new SourceLocation(s, this.state.curPosition()) };
		return this.options.tokens && this.pushToken(a), a;
	}
	skipSpace() {
		const e = this.state.pos,
			t = [];
		e: for (; this.state.pos < this.length; ) {
			const s = this.input.charCodeAt(this.state.pos);
			switch (s) {
				case 32:
				case 160:
				case 9:
					++this.state.pos;
					break;
				case 13:
					10 === this.input.charCodeAt(this.state.pos + 1) && ++this.state.pos;
				case 10:
				case 8232:
				case 8233:
					++this.state.pos, ++this.state.curLine, (this.state.lineStart = this.state.pos);
					break;
				case 47:
					switch (this.input.charCodeAt(this.state.pos + 1)) {
						case 42: {
							const e = this.skipBlockComment('*/');
							void 0 !== e && (this.addComment(e), this.options.attachComment && t.push(e));
							break;
						}
						case 47: {
							const e = this.skipLineComment(2);
							void 0 !== e && (this.addComment(e), this.options.attachComment && t.push(e));
							break;
						}
						default:
							break e;
					}
					break;
				default:
					if (isWhitespace(s)) ++this.state.pos;
					else if (45 === s && !this.inModule && this.options.annexB) {
						const s = this.state.pos;
						if (45 !== this.input.charCodeAt(s + 1) || 62 !== this.input.charCodeAt(s + 2) || !(0 === e || this.state.lineStart > e)) break e;
						{
							const e = this.skipLineComment(3);
							void 0 !== e && (this.addComment(e), this.options.attachComment && t.push(e));
						}
					} else {
						if (60 !== s || this.inModule || !this.options.annexB) break e;
						{
							const e = this.state.pos;
							if (33 !== this.input.charCodeAt(e + 1) || 45 !== this.input.charCodeAt(e + 2) || 45 !== this.input.charCodeAt(e + 3)) break e;
							{
								const e = this.skipLineComment(4);
								void 0 !== e && (this.addComment(e), this.options.attachComment && t.push(e));
							}
						}
					}
			}
		}
		if (t.length > 0) {
			const s = { start: e, end: this.state.pos, comments: t, leadingNode: null, trailingNode: null, containingNode: null };
			this.state.commentStack.push(s);
		}
	}
	finishToken(e, t) {
		(this.state.end = this.state.pos), (this.state.endLoc = this.state.curPosition());
		const s = this.state.type;
		(this.state.type = e), (this.state.value = t), this.isLookahead || this.updateContext(s);
	}
	replaceToken(e) {
		(this.state.type = e), this.updateContext();
	}
	readToken_numberSign() {
		if (0 === this.state.pos && this.readToken_interpreter()) return;
		const e = this.state.pos + 1,
			t = this.codePointAtPos(e);
		if (t >= 48 && t <= 57) throw this.raise(Errors.UnexpectedDigitAfterHash, { at: this.state.curPosition() });
		if (123 === t || (91 === t && this.hasPlugin('recordAndTuple'))) {
			if ((this.expectPlugin('recordAndTuple'), 'bar' === this.getPluginOption('recordAndTuple', 'syntaxType'))) throw this.raise(123 === t ? Errors.RecordExpressionHashIncorrectStartSyntaxType : Errors.TupleExpressionHashIncorrectStartSyntaxType, { at: this.state.curPosition() });
			(this.state.pos += 2), 123 === t ? this.finishToken(7) : this.finishToken(1);
		} else isIdentifierStart(t) ? (++this.state.pos, this.finishToken(136, this.readWord1(t))) : 92 === t ? (++this.state.pos, this.finishToken(136, this.readWord1())) : this.finishOp(27, 1);
	}
	readToken_dot() {
		const e = this.input.charCodeAt(this.state.pos + 1);
		e >= 48 && e <= 57 ? this.readNumber(!0) : 46 === e && 46 === this.input.charCodeAt(this.state.pos + 2) ? ((this.state.pos += 3), this.finishToken(21)) : (++this.state.pos, this.finishToken(16));
	}
	readToken_slash() {
		61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(31, 2) : this.finishOp(56, 1);
	}
	readToken_interpreter() {
		if (0 !== this.state.pos || this.length < 2) return !1;
		let e = this.input.charCodeAt(this.state.pos + 1);
		if (33 !== e) return !1;
		const t = this.state.pos;
		for (this.state.pos += 1; !isNewLine(e) && ++this.state.pos < this.length; ) e = this.input.charCodeAt(this.state.pos);
		const s = this.input.slice(t + 2, this.state.pos);
		return this.finishToken(28, s), !0;
	}
	readToken_mult_modulo(e) {
		let t = 42 === e ? 55 : 54,
			s = 1,
			r = this.input.charCodeAt(this.state.pos + 1);
		42 === e && 42 === r && (s++, (r = this.input.charCodeAt(this.state.pos + 2)), (t = 57)), 61 !== r || this.state.inType || (s++, (t = 37 === e ? 33 : 30)), this.finishOp(t, s);
	}
	readToken_pipe_amp(e) {
		const t = this.input.charCodeAt(this.state.pos + 1);
		if (t !== e) {
			if (124 === e) {
				if (62 === t) return void this.finishOp(39, 2);
				if (this.hasPlugin('recordAndTuple') && 125 === t) {
					if ('bar' !== this.getPluginOption('recordAndTuple', 'syntaxType')) throw this.raise(Errors.RecordExpressionBarIncorrectEndSyntaxType, { at: this.state.curPosition() });
					return (this.state.pos += 2), void this.finishToken(9);
				}
				if (this.hasPlugin('recordAndTuple') && 93 === t) {
					if ('bar' !== this.getPluginOption('recordAndTuple', 'syntaxType')) throw this.raise(Errors.TupleExpressionBarIncorrectEndSyntaxType, { at: this.state.curPosition() });
					return (this.state.pos += 2), void this.finishToken(4);
				}
			}
			61 !== t ? this.finishOp(124 === e ? 43 : 45, 1) : this.finishOp(30, 2);
		} else 61 === this.input.charCodeAt(this.state.pos + 2) ? this.finishOp(30, 3) : this.finishOp(124 === e ? 41 : 42, 2);
	}
	readToken_caret() {
		const e = this.input.charCodeAt(this.state.pos + 1);
		if (61 !== e || this.state.inType)
			if (94 === e && this.hasPlugin(['pipelineOperator', { proposal: 'hack', topicToken: '^^' }])) {
				this.finishOp(37, 2);
				94 === this.input.codePointAt(this.state.pos) && this.unexpected();
			} else this.finishOp(44, 1);
		else this.finishOp(32, 2);
	}
	readToken_atSign() {
		64 === this.input.charCodeAt(this.state.pos + 1) && this.hasPlugin(['pipelineOperator', { proposal: 'hack', topicToken: '@@' }]) ? this.finishOp(38, 2) : this.finishOp(26, 1);
	}
	readToken_plus_min(e) {
		const t = this.input.charCodeAt(this.state.pos + 1);
		t !== e ? (61 === t ? this.finishOp(30, 2) : this.finishOp(53, 1)) : this.finishOp(34, 2);
	}
	readToken_lt() {
		const { pos: e } = this.state,
			t = this.input.charCodeAt(e + 1);
		if (60 === t) return 61 === this.input.charCodeAt(e + 2) ? void this.finishOp(30, 3) : void this.finishOp(51, 2);
		61 !== t ? this.finishOp(47, 1) : this.finishOp(49, 2);
	}
	readToken_gt() {
		const { pos: e } = this.state,
			t = this.input.charCodeAt(e + 1);
		if (62 === t) {
			const t = 62 === this.input.charCodeAt(e + 2) ? 3 : 2;
			return 61 === this.input.charCodeAt(e + t) ? void this.finishOp(30, t + 1) : void this.finishOp(52, t);
		}
		61 !== t ? this.finishOp(48, 1) : this.finishOp(49, 2);
	}
	readToken_eq_excl(e) {
		const t = this.input.charCodeAt(this.state.pos + 1);
		if (61 !== t) return 61 === e && 62 === t ? ((this.state.pos += 2), void this.finishToken(19)) : void this.finishOp(61 === e ? 29 : 35, 1);
		this.finishOp(46, 61 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2);
	}
	readToken_question() {
		const e = this.input.charCodeAt(this.state.pos + 1),
			t = this.input.charCodeAt(this.state.pos + 2);
		63 === e ? (61 === t ? this.finishOp(30, 3) : this.finishOp(40, 2)) : 46 !== e || (t >= 48 && t <= 57) ? (++this.state.pos, this.finishToken(17)) : ((this.state.pos += 2), this.finishToken(18));
	}
	getTokenFromCode(e) {
		switch (e) {
			case 46:
				return void this.readToken_dot();
			case 40:
				return ++this.state.pos, void this.finishToken(10);
			case 41:
				return ++this.state.pos, void this.finishToken(11);
			case 59:
				return ++this.state.pos, void this.finishToken(13);
			case 44:
				return ++this.state.pos, void this.finishToken(12);
			case 91:
				if (this.hasPlugin('recordAndTuple') && 124 === this.input.charCodeAt(this.state.pos + 1)) {
					if ('bar' !== this.getPluginOption('recordAndTuple', 'syntaxType')) throw this.raise(Errors.TupleExpressionBarIncorrectStartSyntaxType, { at: this.state.curPosition() });
					(this.state.pos += 2), this.finishToken(2);
				} else ++this.state.pos, this.finishToken(0);
				return;
			case 93:
				return ++this.state.pos, void this.finishToken(3);
			case 123:
				if (this.hasPlugin('recordAndTuple') && 124 === this.input.charCodeAt(this.state.pos + 1)) {
					if ('bar' !== this.getPluginOption('recordAndTuple', 'syntaxType')) throw this.raise(Errors.RecordExpressionBarIncorrectStartSyntaxType, { at: this.state.curPosition() });
					(this.state.pos += 2), this.finishToken(6);
				} else ++this.state.pos, this.finishToken(5);
				return;
			case 125:
				return ++this.state.pos, void this.finishToken(8);
			case 58:
				return void (this.hasPlugin('functionBind') && 58 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(15, 2) : (++this.state.pos, this.finishToken(14)));
			case 63:
				return void this.readToken_question();
			case 96:
				return void this.readTemplateToken();
			case 48: {
				const e = this.input.charCodeAt(this.state.pos + 1);
				if (120 === e || 88 === e) return void this.readRadixNumber(16);
				if (111 === e || 79 === e) return void this.readRadixNumber(8);
				if (98 === e || 66 === e) return void this.readRadixNumber(2);
			}
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				return void this.readNumber(!1);
			case 34:
			case 39:
				return void this.readString(e);
			case 47:
				return void this.readToken_slash();
			case 37:
			case 42:
				return void this.readToken_mult_modulo(e);
			case 124:
			case 38:
				return void this.readToken_pipe_amp(e);
			case 94:
				return void this.readToken_caret();
			case 43:
			case 45:
				return void this.readToken_plus_min(e);
			case 60:
				return void this.readToken_lt();
			case 62:
				return void this.readToken_gt();
			case 61:
			case 33:
				return void this.readToken_eq_excl(e);
			case 126:
				return void this.finishOp(36, 1);
			case 64:
				return void this.readToken_atSign();
			case 35:
				return void this.readToken_numberSign();
			case 92:
				return void this.readWord();
			default:
				if (isIdentifierStart(e)) return void this.readWord(e);
		}
		throw this.raise(Errors.InvalidOrUnexpectedToken, { at: this.state.curPosition(), unexpected: String.fromCodePoint(e) });
	}
	finishOp(e, t) {
		const s = this.input.slice(this.state.pos, this.state.pos + t);
		(this.state.pos += t), this.finishToken(e, s);
	}
	readRegexp() {
		const e = this.state.startLoc,
			t = this.state.start + 1;
		let s,
			r,
			{ pos: i } = this.state;
		for (; ; ++i) {
			if (i >= this.length) throw this.raise(Errors.UnterminatedRegExp, { at: createPositionWithColumnOffset(e, 1) });
			const t = this.input.charCodeAt(i);
			if (isNewLine(t)) throw this.raise(Errors.UnterminatedRegExp, { at: createPositionWithColumnOffset(e, 1) });
			if (s) s = !1;
			else {
				if (91 === t) r = !0;
				else if (93 === t && r) r = !1;
				else if (47 === t && !r) break;
				s = 92 === t;
			}
		}
		const a = this.input.slice(t, i);
		++i;
		let n = '';
		const o = () => createPositionWithColumnOffset(e, i + 2 - t);
		for (; i < this.length; ) {
			const e = this.codePointAtPos(i),
				t = String.fromCharCode(e);
			if (VALID_REGEX_FLAGS.has(e)) 118 === e ? n.includes('u') && this.raise(Errors.IncompatibleRegExpUVFlags, { at: o() }) : 117 === e && n.includes('v') && this.raise(Errors.IncompatibleRegExpUVFlags, { at: o() }), n.includes(t) && this.raise(Errors.DuplicateRegExpFlags, { at: o() });
			else {
				if (!isIdentifierChar(e) && 92 !== e) break;
				this.raise(Errors.MalformedRegExpFlags, { at: o() });
			}
			++i, (n += t);
		}
		(this.state.pos = i), this.finishToken(135, { pattern: a, flags: n });
	}
	readInt(e, t, s = !1, r = !0) {
		const { n: i, pos: a } = readInt(this.input, this.state.pos, this.state.lineStart, this.state.curLine, e, t, s, r, this.errorHandlers_readInt, !1);
		return (this.state.pos = a), i;
	}
	readRadixNumber(e) {
		const t = this.state.curPosition();
		let s = !1;
		this.state.pos += 2;
		const r = this.readInt(e);
		null == r && this.raise(Errors.InvalidDigit, { at: createPositionWithColumnOffset(t, 2), radix: e });
		const i = this.input.charCodeAt(this.state.pos);
		if (110 === i) ++this.state.pos, (s = !0);
		else if (109 === i) throw this.raise(Errors.InvalidDecimal, { at: t });
		if (isIdentifierStart(this.codePointAtPos(this.state.pos))) throw this.raise(Errors.NumberIdentifier, { at: this.state.curPosition() });
		if (s) {
			const e = this.input.slice(t.index, this.state.pos).replace(/[_n]/g, '');
			this.finishToken(133, e);
		} else this.finishToken(132, r);
	}
	readNumber(e) {
		const t = this.state.pos,
			s = this.state.curPosition();
		let r = !1,
			i = !1,
			a = !1,
			n = !1,
			o = !1;
		e || null !== this.readInt(10) || this.raise(Errors.InvalidNumber, { at: this.state.curPosition() });
		const h = this.state.pos - t >= 2 && 48 === this.input.charCodeAt(t);
		if (h) {
			const e = this.input.slice(t, this.state.pos);
			if ((this.recordStrictModeErrors(Errors.StrictOctalLiteral, { at: s }), !this.state.strict)) {
				const t = e.indexOf('_');
				t > 0 && this.raise(Errors.ZeroDigitNumericSeparator, { at: createPositionWithColumnOffset(s, t) });
			}
			o = h && !/[89]/.test(e);
		}
		let p = this.input.charCodeAt(this.state.pos);
		if (
			(46 !== p || o || (++this.state.pos, this.readInt(10), (r = !0), (p = this.input.charCodeAt(this.state.pos))),
			(69 !== p && 101 !== p) || o || ((p = this.input.charCodeAt(++this.state.pos)), (43 !== p && 45 !== p) || ++this.state.pos, null === this.readInt(10) && this.raise(Errors.InvalidOrMissingExponent, { at: s }), (r = !0), (n = !0), (p = this.input.charCodeAt(this.state.pos))),
			110 === p && ((r || h) && this.raise(Errors.InvalidBigIntLiteral, { at: s }), ++this.state.pos, (i = !0)),
			109 === p && (this.expectPlugin('decimal', this.state.curPosition()), (n || h) && this.raise(Errors.InvalidDecimal, { at: s }), ++this.state.pos, (a = !0)),
			isIdentifierStart(this.codePointAtPos(this.state.pos)))
		)
			throw this.raise(Errors.NumberIdentifier, { at: this.state.curPosition() });
		const c = this.input.slice(t, this.state.pos).replace(/[_mn]/g, '');
		if (i) return void this.finishToken(133, c);
		if (a) return void this.finishToken(134, c);
		const l = o ? parseInt(c, 8) : parseFloat(c);
		this.finishToken(132, l);
	}
	readCodePoint(e) {
		const { code: t, pos: s } = readCodePoint(this.input, this.state.pos, this.state.lineStart, this.state.curLine, e, this.errorHandlers_readCodePoint);
		return (this.state.pos = s), t;
	}
	readString(e) {
		const { str: t, pos: s, curLine: r, lineStart: i } = readStringContents(34 === e ? 'double' : 'single', this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_string);
		(this.state.pos = s + 1), (this.state.lineStart = i), (this.state.curLine = r), this.finishToken(131, t);
	}
	readTemplateContinuation() {
		this.match(8) || this.unexpected(null, 8), this.state.pos--, this.readTemplateToken();
	}
	readTemplateToken() {
		const e = this.input[this.state.pos],
			{ str: t, firstInvalidLoc: s, pos: r, curLine: i, lineStart: a } = readStringContents('template', this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_template);
		(this.state.pos = r + 1), (this.state.lineStart = a), (this.state.curLine = i), s && (this.state.firstInvalidTemplateEscapePos = new Position(s.curLine, s.pos - s.lineStart, s.pos)), 96 === this.input.codePointAt(r) ? this.finishToken(24, s ? null : e + t + '`') : (this.state.pos++, this.finishToken(25, s ? null : e + t + '${'));
	}
	recordStrictModeErrors(e, { at: t }) {
		const s = t.index;
		this.state.strict && !this.state.strictErrors.has(s) ? this.raise(e, { at: t }) : this.state.strictErrors.set(s, [e, t]);
	}
	readWord1(e) {
		this.state.containsEsc = !1;
		let t = '';
		const s = this.state.pos;
		let r = this.state.pos;
		for (void 0 !== e && (this.state.pos += e <= 65535 ? 1 : 2); this.state.pos < this.length; ) {
			const e = this.codePointAtPos(this.state.pos);
			if (isIdentifierChar(e)) this.state.pos += e <= 65535 ? 1 : 2;
			else {
				if (92 !== e) break;
				{
					(this.state.containsEsc = !0), (t += this.input.slice(r, this.state.pos));
					const e = this.state.curPosition(),
						i = this.state.pos === s ? isIdentifierStart : isIdentifierChar;
					if (117 !== this.input.charCodeAt(++this.state.pos)) {
						this.raise(Errors.MissingUnicodeEscape, { at: this.state.curPosition() }), (r = this.state.pos - 1);
						continue;
					}
					++this.state.pos;
					const a = this.readCodePoint(!0);
					null !== a && (i(a) || this.raise(Errors.EscapedCharNotAnIdentifier, { at: e }), (t += String.fromCodePoint(a))), (r = this.state.pos);
				}
			}
		}
		return t + this.input.slice(r, this.state.pos);
	}
	readWord(e) {
		const t = this.readWord1(e),
			s = keywords$1.get(t);
		void 0 !== s ? this.finishToken(s, tokenLabelName(s)) : this.finishToken(130, t);
	}
	checkKeywordEscapes() {
		const { type: e } = this.state;
		tokenIsKeyword(e) && this.state.containsEsc && this.raise(Errors.InvalidEscapedReservedWord, { at: this.state.startLoc, reservedWord: tokenLabelName(e) });
	}
	raise(e, t) {
		const { at: s } = t,
			r = _objectWithoutPropertiesLoose(t, _excluded),
			i = e({ loc: s instanceof Position ? s : s.loc.start, details: r });
		if (!this.options.errorRecovery) throw i;
		return this.isLookahead || this.state.errors.push(i), i;
	}
	raiseOverwrite(e, t) {
		const { at: s } = t,
			r = _objectWithoutPropertiesLoose(t, _excluded2),
			i = s instanceof Position ? s : s.loc.start,
			a = i.index,
			n = this.state.errors;
		for (let t = n.length - 1; t >= 0; t--) {
			const s = n[t];
			if (s.loc.index === a) return (n[t] = e({ loc: i, details: r }));
			if (s.loc.index < a) break;
		}
		return this.raise(e, t);
	}
	updateContext(e) {}
	unexpected(e, t) {
		throw this.raise(Errors.UnexpectedToken, { expected: t ? tokenLabelName(t) : null, at: null != e ? e : this.state.startLoc });
	}
	expectPlugin(e, t) {
		if (this.hasPlugin(e)) return !0;
		throw this.raise(Errors.MissingPlugin, { at: null != t ? t : this.state.startLoc, missingPlugin: [e] });
	}
	expectOnePlugin(e) {
		if (!e.some((e) => this.hasPlugin(e))) throw this.raise(Errors.MissingOneOfPlugins, { at: this.state.startLoc, missingPlugin: e });
	}
	errorBuilder(e) {
		return (t, s, r) => {
			this.raise(e, { at: buildPosition(t, s, r) });
		};
	}
}
class ClassScope {
	constructor() {
		(this.privateNames = new Set()), (this.loneAccessors = new Map()), (this.undefinedPrivateNames = new Map());
	}
}
class ClassScopeHandler {
	constructor(e) {
		(this.parser = void 0), (this.stack = []), (this.undefinedPrivateNames = new Map()), (this.parser = e);
	}
	current() {
		return this.stack[this.stack.length - 1];
	}
	enter() {
		this.stack.push(new ClassScope());
	}
	exit() {
		const e = this.stack.pop(),
			t = this.current();
		for (const [s, r] of Array.from(e.undefinedPrivateNames)) t ? t.undefinedPrivateNames.has(s) || t.undefinedPrivateNames.set(s, r) : this.parser.raise(Errors.InvalidPrivateFieldResolution, { at: r, identifierName: s });
	}
	declarePrivateName(e, t, s) {
		const { privateNames: r, loneAccessors: i, undefinedPrivateNames: a } = this.current();
		let n = r.has(e);
		if (3 & t) {
			const s = n && i.get(e);
			if (s) {
				(n = (3 & s) === (3 & t) || (4 & s) !== (4 & t)), n || i.delete(e);
			} else n || i.set(e, t);
		}
		n && this.parser.raise(Errors.PrivateNameRedeclaration, { at: s, identifierName: e }), r.add(e), a.delete(e);
	}
	usePrivateName(e, t) {
		let s;
		for (s of this.stack) if (s.privateNames.has(e)) return;
		s ? s.undefinedPrivateNames.set(e, t) : this.parser.raise(Errors.InvalidPrivateFieldResolution, { at: t, identifierName: e });
	}
}
class ExpressionScope {
	constructor(e = 0) {
		this.type = e;
	}
	canBeArrowParameterDeclaration() {
		return 2 === this.type || 1 === this.type;
	}
	isCertainlyParameterDeclaration() {
		return 3 === this.type;
	}
}
class ArrowHeadParsingScope extends ExpressionScope {
	constructor(e) {
		super(e), (this.declarationErrors = new Map());
	}
	recordDeclarationError(e, { at: t }) {
		const s = t.index;
		this.declarationErrors.set(s, [e, t]);
	}
	clearDeclarationError(e) {
		this.declarationErrors.delete(e);
	}
	iterateErrors(e) {
		this.declarationErrors.forEach(e);
	}
}
class ExpressionScopeHandler {
	constructor(e) {
		(this.parser = void 0), (this.stack = [new ExpressionScope()]), (this.parser = e);
	}
	enter(e) {
		this.stack.push(e);
	}
	exit() {
		this.stack.pop();
	}
	recordParameterInitializerError(e, { at: t }) {
		const s = { at: t.loc.start },
			{ stack: r } = this;
		let i = r.length - 1,
			a = r[i];
		for (; !a.isCertainlyParameterDeclaration(); ) {
			if (!a.canBeArrowParameterDeclaration()) return;
			a.recordDeclarationError(e, s), (a = r[--i]);
		}
		this.parser.raise(e, s);
	}
	recordArrowParameterBindingError(e, { at: t }) {
		const { stack: s } = this,
			r = s[s.length - 1],
			i = { at: t.loc.start };
		if (r.isCertainlyParameterDeclaration()) this.parser.raise(e, i);
		else {
			if (!r.canBeArrowParameterDeclaration()) return;
			r.recordDeclarationError(e, i);
		}
	}
	recordAsyncArrowParametersError({ at: e }) {
		const { stack: t } = this;
		let s = t.length - 1,
			r = t[s];
		for (; r.canBeArrowParameterDeclaration(); ) 2 === r.type && r.recordDeclarationError(Errors.AwaitBindingIdentifier, { at: e }), (r = t[--s]);
	}
	validateAsPattern() {
		const { stack: e } = this,
			t = e[e.length - 1];
		t.canBeArrowParameterDeclaration() &&
			t.iterateErrors(([t, s]) => {
				this.parser.raise(t, { at: s });
				let r = e.length - 2,
					i = e[r];
				for (; i.canBeArrowParameterDeclaration(); ) i.clearDeclarationError(s.index), (i = e[--r]);
			});
	}
}
function newParameterDeclarationScope() {
	return new ExpressionScope(3);
}
function newArrowHeadScope() {
	return new ArrowHeadParsingScope(1);
}
function newAsyncArrowScope() {
	return new ArrowHeadParsingScope(2);
}
function newExpressionScope() {
	return new ExpressionScope();
}
const PARAM = 0,
	PARAM_YIELD = 1,
	PARAM_AWAIT = 2,
	PARAM_RETURN = 4,
	PARAM_IN = 8;
class ProductionParameterHandler {
	constructor() {
		this.stacks = [];
	}
	enter(e) {
		this.stacks.push(e);
	}
	exit() {
		this.stacks.pop();
	}
	currentFlags() {
		return this.stacks[this.stacks.length - 1];
	}
	get hasAwait() {
		return (2 & this.currentFlags()) > 0;
	}
	get hasYield() {
		return (1 & this.currentFlags()) > 0;
	}
	get hasReturn() {
		return (4 & this.currentFlags()) > 0;
	}
	get hasIn() {
		return (8 & this.currentFlags()) > 0;
	}
}
function functionFlags(e, t) {
	return (e ? 2 : 0) | (t ? 1 : 0);
}
class UtilParser extends Tokenizer {
	addExtra(e, t, s, r = !0) {
		if (!e) return;
		const i = (e.extra = e.extra || {});
		r ? (i[t] = s) : Object.defineProperty(i, t, { enumerable: r, value: s });
	}
	isContextual(e) {
		return this.state.type === e && !this.state.containsEsc;
	}
	isUnparsedContextual(e, t) {
		const s = e + t.length;
		if (this.input.slice(e, s) === t) {
			const e = this.input.charCodeAt(s);
			return !(isIdentifierChar(e) || 55296 == (64512 & e));
		}
		return !1;
	}
	isLookaheadContextual(e) {
		const t = this.nextTokenStart();
		return this.isUnparsedContextual(t, e);
	}
	eatContextual(e) {
		return !!this.isContextual(e) && (this.next(), !0);
	}
	expectContextual(e, t) {
		if (!this.eatContextual(e)) {
			if (null != t) throw this.raise(t, { at: this.state.startLoc });
			this.unexpected(null, e);
		}
	}
	canInsertSemicolon() {
		return this.match(137) || this.match(8) || this.hasPrecedingLineBreak();
	}
	hasPrecedingLineBreak() {
		return lineBreak.test(this.input.slice(this.state.lastTokEndLoc.index, this.state.start));
	}
	hasFollowingLineBreak() {
		return (skipWhiteSpaceToLineBreak.lastIndex = this.state.end), skipWhiteSpaceToLineBreak.test(this.input);
	}
	isLineTerminator() {
		return this.eat(13) || this.canInsertSemicolon();
	}
	semicolon(e = !0) {
		(e ? this.isLineTerminator() : this.eat(13)) || this.raise(Errors.MissingSemicolon, { at: this.state.lastTokEndLoc });
	}
	expect(e, t) {
		this.eat(e) || this.unexpected(t, e);
	}
	tryParse(e, t = this.state.clone()) {
		const s = { node: null };
		try {
			const r = e((e = null) => {
				throw ((s.node = e), s);
			});
			if (this.state.errors.length > t.errors.length) {
				const e = this.state;
				return (this.state = t), (this.state.tokensLength = e.tokensLength), { node: r, error: e.errors[t.errors.length], thrown: !1, aborted: !1, failState: e };
			}
			return { node: r, error: null, thrown: !1, aborted: !1, failState: null };
		} catch (e) {
			const r = this.state;
			if (((this.state = t), e instanceof SyntaxError)) return { node: null, error: e, thrown: !0, aborted: !1, failState: r };
			if (e === s) return { node: s.node, error: null, thrown: !1, aborted: !0, failState: r };
			throw e;
		}
	}
	checkExpressionErrors(e, t) {
		if (!e) return !1;
		const { shorthandAssignLoc: s, doubleProtoLoc: r, privateKeyLoc: i, optionalParametersLoc: a } = e;
		if (!t) return !!(s || r || a || i);
		null != s && this.raise(Errors.InvalidCoverInitializedName, { at: s }), null != r && this.raise(Errors.DuplicateProto, { at: r }), null != i && this.raise(Errors.UnexpectedPrivateField, { at: i }), null != a && this.unexpected(a);
	}
	isLiteralPropertyName() {
		return tokenIsLiteralPropertyName(this.state.type);
	}
	isPrivateName(e) {
		return 'PrivateName' === e.type;
	}
	getPrivateNameSV(e) {
		return e.id.name;
	}
	hasPropertyAsPrivateName(e) {
		return ('MemberExpression' === e.type || 'OptionalMemberExpression' === e.type) && this.isPrivateName(e.property);
	}
	isObjectProperty(e) {
		return 'ObjectProperty' === e.type;
	}
	isObjectMethod(e) {
		return 'ObjectMethod' === e.type;
	}
	initializeScopes(e = 'module' === this.options.sourceType) {
		const t = this.state.labels;
		this.state.labels = [];
		const s = this.exportedIdentifiers;
		this.exportedIdentifiers = new Set();
		const r = this.inModule;
		this.inModule = e;
		const i = this.scope,
			a = this.getScopeHandler();
		this.scope = new a(this, e);
		const n = this.prodParam;
		this.prodParam = new ProductionParameterHandler();
		const o = this.classScope;
		this.classScope = new ClassScopeHandler(this);
		const h = this.expressionScope;
		return (
			(this.expressionScope = new ExpressionScopeHandler(this)),
			() => {
				(this.state.labels = t), (this.exportedIdentifiers = s), (this.inModule = r), (this.scope = i), (this.prodParam = n), (this.classScope = o), (this.expressionScope = h);
			}
		);
	}
	enterInitialScopes() {
		let e = 0;
		this.inModule && (e |= 2), this.scope.enter(1), this.prodParam.enter(e);
	}
	checkDestructuringPrivate(e) {
		const { privateKeyLoc: t } = e;
		null !== t && this.expectPlugin('destructuringPrivate', t);
	}
}
class ExpressionErrors {
	constructor() {
		(this.shorthandAssignLoc = null), (this.doubleProtoLoc = null), (this.privateKeyLoc = null), (this.optionalParametersLoc = null);
	}
}
class Node {
	constructor(e, t, s) {
		(this.type = ''), (this.start = t), (this.end = 0), (this.loc = new SourceLocation(s)), null != e && e.options.ranges && (this.range = [t, 0]), null != e && e.filename && (this.loc.filename = e.filename);
	}
}
const NodePrototype = Node.prototype;
function clonePlaceholder(e) {
	return cloneIdentifier(e);
}
function cloneIdentifier(e) {
	const { type: t, start: s, end: r, loc: i, range: a, extra: n, name: o } = e,
		h = Object.create(NodePrototype);
	return (h.type = t), (h.start = s), (h.end = r), (h.loc = i), (h.range = a), (h.extra = n), (h.name = o), 'Placeholder' === t && (h.expectedNode = e.expectedNode), h;
}
function cloneStringLiteral(e) {
	const { type: t, start: s, end: r, loc: i, range: a, extra: n } = e;
	if ('Placeholder' === t) return clonePlaceholder(e);
	const o = Object.create(NodePrototype);
	return (o.type = t), (o.start = s), (o.end = r), (o.loc = i), (o.range = a), void 0 !== e.raw ? (o.raw = e.raw) : (o.extra = n), (o.value = e.value), o;
}
NodePrototype.__clone = function () {
	const e = new Node(void 0, this.start, this.loc.start),
		t = Object.keys(this);
	for (let s = 0, r = t.length; s < r; s++) {
		const r = t[s];
		'leadingComments' !== r && 'trailingComments' !== r && 'innerComments' !== r && (e[r] = this[r]);
	}
	return e;
};
class NodeUtils extends UtilParser {
	startNode() {
		return new Node(this, this.state.start, this.state.startLoc);
	}
	startNodeAt(e) {
		return new Node(this, e.index, e);
	}
	startNodeAtNode(e) {
		return this.startNodeAt(e.loc.start);
	}
	finishNode(e, t) {
		return this.finishNodeAt(e, t, this.state.lastTokEndLoc);
	}
	finishNodeAt(e, t, s) {
		return (e.type = t), (e.end = s.index), (e.loc.end = s), this.options.ranges && (e.range[1] = s.index), this.options.attachComment && this.processComment(e), e;
	}
	resetStartLocation(e, t) {
		(e.start = t.index), (e.loc.start = t), this.options.ranges && (e.range[0] = t.index);
	}
	resetEndLocation(e, t = this.state.lastTokEndLoc) {
		(e.end = t.index), (e.loc.end = t), this.options.ranges && (e.range[1] = t.index);
	}
	resetStartLocationFromNode(e, t) {
		this.resetStartLocation(e, t.loc.start);
	}
}
const reservedTypes = new Set(['_', 'any', 'bool', 'boolean', 'empty', 'extends', 'false', 'interface', 'mixed', 'null', 'number', 'static', 'string', 'true', 'typeof', 'void']),
	FlowErrors = ParseErrorEnum`flow`({
		AmbiguousConditionalArrow: 'Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.',
		AmbiguousDeclareModuleKind: 'Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.',
		AssignReservedType: ({ reservedType: e }) => `Cannot overwrite reserved type ${e}.`,
		DeclareClassElement: 'The `declare` modifier can only appear on class fields.',
		DeclareClassFieldInitializer: 'Initializers are not allowed in fields with the `declare` modifier.',
		DuplicateDeclareModuleExports: 'Duplicate `declare module.exports` statement.',
		EnumBooleanMemberNotInitialized: ({ memberName: e, enumName: t }) => `Boolean enum members need to be initialized. Use either \`${e} = true,\` or \`${e} = false,\` in enum \`${t}\`.`,
		EnumDuplicateMemberName: ({ memberName: e, enumName: t }) => `Enum member names need to be unique, but the name \`${e}\` has already been used before in enum \`${t}\`.`,
		EnumInconsistentMemberValues: ({ enumName: e }) => `Enum \`${e}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
		EnumInvalidExplicitType: ({ invalidEnumType: e, enumName: t }) => `Enum type \`${e}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${t}\`.`,
		EnumInvalidExplicitTypeUnknownSupplied: ({ enumName: e }) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${e}\`.`,
		EnumInvalidMemberInitializerPrimaryType: ({ enumName: e, memberName: t, explicitType: s }) => `Enum \`${e}\` has type \`${s}\`, so the initializer of \`${t}\` needs to be a ${s} literal.`,
		EnumInvalidMemberInitializerSymbolType: ({ enumName: e, memberName: t }) => `Symbol enum members cannot be initialized. Use \`${t},\` in enum \`${e}\`.`,
		EnumInvalidMemberInitializerUnknownType: ({ enumName: e, memberName: t }) => `The enum member initializer for \`${t}\` needs to be a literal (either a boolean, number, or string) in enum \`${e}\`.`,
		EnumInvalidMemberName: ({ enumName: e, memberName: t, suggestion: s }) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${t}\`, consider using \`${s}\`, in enum \`${e}\`.`,
		EnumNumberMemberNotInitialized: ({ enumName: e, memberName: t }) => `Number enum members need to be initialized, e.g. \`${t} = 1\` in enum \`${e}\`.`,
		EnumStringMemberInconsistentlyInitialized: ({ enumName: e }) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${e}\`.`,
		GetterMayNotHaveThisParam: 'A getter cannot have a `this` parameter.',
		ImportReflectionHasImportType: 'An `import module` declaration can not use `type` or `typeof` keyword.',
		ImportTypeShorthandOnlyInPureImport: 'The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.',
		InexactInsideExact: 'Explicit inexact syntax cannot appear inside an explicit exact object type.',
		InexactInsideNonObject: 'Explicit inexact syntax cannot appear in class or interface definitions.',
		InexactVariance: 'Explicit inexact syntax cannot have variance.',
		InvalidNonTypeImportInDeclareModule: 'Imports within a `declare module` body must always be `import type` or `import typeof`.',
		MissingTypeParamDefault: 'Type parameter declaration needs a default, since a preceding type parameter declaration has a default.',
		NestedDeclareModule: '`declare module` cannot be used inside another `declare module`.',
		NestedFlowComment: 'Cannot have a flow comment inside another flow comment.',
		PatternIsOptional: Object.assign({ message: 'A binding pattern parameter cannot be optional in an implementation signature.' }, { reasonCode: 'OptionalBindingPattern' }),
		SetterMayNotHaveThisParam: 'A setter cannot have a `this` parameter.',
		SpreadVariance: 'Spread properties cannot have variance.',
		ThisParamAnnotationRequired: 'A type annotation is required for the `this` parameter.',
		ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
		ThisParamMayNotBeOptional: 'The `this` parameter cannot be optional.',
		ThisParamMustBeFirst: 'The `this` parameter must be the first function parameter.',
		ThisParamNoDefault: 'The `this` parameter may not have a default value.',
		TypeBeforeInitializer: 'Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.',
		TypeCastInPattern: 'The type cast expression is expected to be wrapped with parenthesis.',
		UnexpectedExplicitInexactInObject: 'Explicit inexact syntax must appear at the end of an inexact object.',
		UnexpectedReservedType: ({ reservedType: e }) => `Unexpected reserved type ${e}.`,
		UnexpectedReservedUnderscore: '`_` is only allowed as a type argument to call or new.',
		UnexpectedSpaceBetweenModuloChecks: 'Spaces between `%` and `checks` are not allowed here.',
		UnexpectedSpreadType: 'Spread operator cannot appear in class or interface definitions.',
		UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".',
		UnexpectedTokenAfterTypeParameter: 'Expected an arrow function after this type parameter declaration.',
		UnexpectedTypeParameterBeforeAsyncArrowFunction: 'Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.',
		UnsupportedDeclareExportKind: ({ unsupportedExportKind: e, suggestion: t }) => `\`declare export ${e}\` is not supported. Use \`${t}\` instead.`,
		UnsupportedStatementInDeclareModule: 'Only declares and type imports are allowed inside declare module.',
		UnterminatedFlowComment: 'Unterminated flow-comment.',
	});
function isEsModuleType(e) {
	return 'DeclareExportAllDeclaration' === e.type || ('DeclareExportDeclaration' === e.type && (!e.declaration || ('TypeAlias' !== e.declaration.type && 'InterfaceDeclaration' !== e.declaration.type)));
}
function hasTypeImportKind(e) {
	return 'type' === e.importKind || 'typeof' === e.importKind;
}
const exportSuggestions = { const: 'declare export var', let: 'declare export var', type: 'export type', interface: 'export interface' };
function partition(e, t) {
	const s = [],
		r = [];
	for (let i = 0; i < e.length; i++) (t(e[i], i, e) ? s : r).push(e[i]);
	return [s, r];
}
const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;
var flow = (e) =>
	class extends e {
		constructor(...e) {
			super(...e), (this.flowPragma = void 0);
		}
		getScopeHandler() {
			return FlowScopeHandler;
		}
		shouldParseTypes() {
			return this.getPluginOption('flow', 'all') || 'flow' === this.flowPragma;
		}
		shouldParseEnums() {
			return !!this.getPluginOption('flow', 'enums');
		}
		finishToken(e, t) {
			131 !== e && 13 !== e && 28 !== e && void 0 === this.flowPragma && (this.flowPragma = null), super.finishToken(e, t);
		}
		addComment(e) {
			if (void 0 === this.flowPragma) {
				const t = FLOW_PRAGMA_REGEX.exec(e.value);
				if (t)
					if ('flow' === t[1]) this.flowPragma = 'flow';
					else {
						if ('noflow' !== t[1]) throw new Error('Unexpected flow pragma');
						this.flowPragma = 'noflow';
					}
				else;
			}
			super.addComment(e);
		}
		flowParseTypeInitialiser(e) {
			const t = this.state.inType;
			(this.state.inType = !0), this.expect(e || 14);
			const s = this.flowParseType();
			return (this.state.inType = t), s;
		}
		flowParsePredicate() {
			const e = this.startNode(),
				t = this.state.startLoc;
			return this.next(), this.expectContextual(108), this.state.lastTokStart > t.index + 1 && this.raise(FlowErrors.UnexpectedSpaceBetweenModuloChecks, { at: t }), this.eat(10) ? ((e.value = super.parseExpression()), this.expect(11), this.finishNode(e, 'DeclaredPredicate')) : this.finishNode(e, 'InferredPredicate');
		}
		flowParseTypeAndPredicateInitialiser() {
			const e = this.state.inType;
			(this.state.inType = !0), this.expect(14);
			let t = null,
				s = null;
			return this.match(54) ? ((this.state.inType = e), (s = this.flowParsePredicate())) : ((t = this.flowParseType()), (this.state.inType = e), this.match(54) && (s = this.flowParsePredicate())), [t, s];
		}
		flowParseDeclareClass(e) {
			return this.next(), this.flowParseInterfaceish(e, !0), this.finishNode(e, 'DeclareClass');
		}
		flowParseDeclareFunction(e) {
			this.next();
			const t = (e.id = this.parseIdentifier()),
				s = this.startNode(),
				r = this.startNode();
			this.match(47) ? (s.typeParameters = this.flowParseTypeParameterDeclaration()) : (s.typeParameters = null), this.expect(10);
			const i = this.flowParseFunctionTypeParams();
			return (s.params = i.params), (s.rest = i.rest), (s.this = i._this), this.expect(11), ([s.returnType, e.predicate] = this.flowParseTypeAndPredicateInitialiser()), (r.typeAnnotation = this.finishNode(s, 'FunctionTypeAnnotation')), (t.typeAnnotation = this.finishNode(r, 'TypeAnnotation')), this.resetEndLocation(t), this.semicolon(), this.scope.declareName(e.id.name, 2048, e.id.loc.start), this.finishNode(e, 'DeclareFunction');
		}
		flowParseDeclare(e, t) {
			return this.match(80)
				? this.flowParseDeclareClass(e)
				: this.match(68)
				? this.flowParseDeclareFunction(e)
				: this.match(74)
				? this.flowParseDeclareVariable(e)
				: this.eatContextual(125)
				? this.match(16)
					? this.flowParseDeclareModuleExports(e)
					: (t && this.raise(FlowErrors.NestedDeclareModule, { at: this.state.lastTokStartLoc }), this.flowParseDeclareModule(e))
				: this.isContextual(128)
				? this.flowParseDeclareTypeAlias(e)
				: this.isContextual(129)
				? this.flowParseDeclareOpaqueType(e)
				: this.isContextual(127)
				? this.flowParseDeclareInterface(e)
				: this.match(82)
				? this.flowParseDeclareExportDeclaration(e, t)
				: void this.unexpected();
		}
		flowParseDeclareVariable(e) {
			return this.next(), (e.id = this.flowParseTypeAnnotatableIdentifier(!0)), this.scope.declareName(e.id.name, 5, e.id.loc.start), this.semicolon(), this.finishNode(e, 'DeclareVariable');
		}
		flowParseDeclareModule(e) {
			this.scope.enter(0), this.match(131) ? (e.id = super.parseExprAtom()) : (e.id = this.parseIdentifier());
			const t = (e.body = this.startNode()),
				s = (t.body = []);
			for (this.expect(5); !this.match(8); ) {
				let e = this.startNode();
				this.match(83) ? (this.next(), this.isContextual(128) || this.match(87) || this.raise(FlowErrors.InvalidNonTypeImportInDeclareModule, { at: this.state.lastTokStartLoc }), super.parseImport(e)) : (this.expectContextual(123, FlowErrors.UnsupportedStatementInDeclareModule), (e = this.flowParseDeclare(e, !0))), s.push(e);
			}
			this.scope.exit(), this.expect(8), this.finishNode(t, 'BlockStatement');
			let r = null,
				i = !1;
			return (
				s.forEach((e) => {
					isEsModuleType(e) ? ('CommonJS' === r && this.raise(FlowErrors.AmbiguousDeclareModuleKind, { at: e }), (r = 'ES')) : 'DeclareModuleExports' === e.type && (i && this.raise(FlowErrors.DuplicateDeclareModuleExports, { at: e }), 'ES' === r && this.raise(FlowErrors.AmbiguousDeclareModuleKind, { at: e }), (r = 'CommonJS'), (i = !0));
				}),
				(e.kind = r || 'CommonJS'),
				this.finishNode(e, 'DeclareModule')
			);
		}
		flowParseDeclareExportDeclaration(e, t) {
			if ((this.expect(82), this.eat(65))) return this.match(68) || this.match(80) ? (e.declaration = this.flowParseDeclare(this.startNode())) : ((e.declaration = this.flowParseType()), this.semicolon()), (e.default = !0), this.finishNode(e, 'DeclareExportDeclaration');
			if (this.match(75) || this.isLet() || ((this.isContextual(128) || this.isContextual(127)) && !t)) {
				const e = this.state.value;
				throw this.raise(FlowErrors.UnsupportedDeclareExportKind, { at: this.state.startLoc, unsupportedExportKind: e, suggestion: exportSuggestions[e] });
			}
			return this.match(74) || this.match(68) || this.match(80) || this.isContextual(129)
				? ((e.declaration = this.flowParseDeclare(this.startNode())), (e.default = !1), this.finishNode(e, 'DeclareExportDeclaration'))
				: this.match(55) || this.match(5) || this.isContextual(127) || this.isContextual(128) || this.isContextual(129)
				? ('ExportNamedDeclaration' === (e = this.parseExport(e, null)).type && ((e.type = 'ExportDeclaration'), (e.default = !1), delete e.exportKind), (e.type = 'Declare' + e.type), e)
				: void this.unexpected();
		}
		flowParseDeclareModuleExports(e) {
			return this.next(), this.expectContextual(109), (e.typeAnnotation = this.flowParseTypeAnnotation()), this.semicolon(), this.finishNode(e, 'DeclareModuleExports');
		}
		flowParseDeclareTypeAlias(e) {
			this.next();
			const t = this.flowParseTypeAlias(e);
			return (t.type = 'DeclareTypeAlias'), t;
		}
		flowParseDeclareOpaqueType(e) {
			this.next();
			const t = this.flowParseOpaqueType(e, !0);
			return (t.type = 'DeclareOpaqueType'), t;
		}
		flowParseDeclareInterface(e) {
			return this.next(), this.flowParseInterfaceish(e, !1), this.finishNode(e, 'DeclareInterface');
		}
		flowParseInterfaceish(e, t) {
			if (((e.id = this.flowParseRestrictedIdentifier(!t, !0)), this.scope.declareName(e.id.name, t ? 17 : 8201, e.id.loc.start), this.match(47) ? (e.typeParameters = this.flowParseTypeParameterDeclaration()) : (e.typeParameters = null), (e.extends = []), this.eat(81)))
				do {
					e.extends.push(this.flowParseInterfaceExtends());
				} while (!t && this.eat(12));
			if (t) {
				if (((e.implements = []), (e.mixins = []), this.eatContextual(115)))
					do {
						e.mixins.push(this.flowParseInterfaceExtends());
					} while (this.eat(12));
				if (this.eatContextual(111))
					do {
						e.implements.push(this.flowParseInterfaceExtends());
					} while (this.eat(12));
			}
			e.body = this.flowParseObjectType({ allowStatic: t, allowExact: !1, allowSpread: !1, allowProto: t, allowInexact: !1 });
		}
		flowParseInterfaceExtends() {
			const e = this.startNode();
			return (e.id = this.flowParseQualifiedTypeIdentifier()), this.match(47) ? (e.typeParameters = this.flowParseTypeParameterInstantiation()) : (e.typeParameters = null), this.finishNode(e, 'InterfaceExtends');
		}
		flowParseInterface(e) {
			return this.flowParseInterfaceish(e, !1), this.finishNode(e, 'InterfaceDeclaration');
		}
		checkNotUnderscore(e) {
			'_' === e && this.raise(FlowErrors.UnexpectedReservedUnderscore, { at: this.state.startLoc });
		}
		checkReservedType(e, t, s) {
			reservedTypes.has(e) && this.raise(s ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, { at: t, reservedType: e });
		}
		flowParseRestrictedIdentifier(e, t) {
			return this.checkReservedType(this.state.value, this.state.startLoc, t), this.parseIdentifier(e);
		}
		flowParseTypeAlias(e) {
			return (e.id = this.flowParseRestrictedIdentifier(!1, !0)), this.scope.declareName(e.id.name, 8201, e.id.loc.start), this.match(47) ? (e.typeParameters = this.flowParseTypeParameterDeclaration()) : (e.typeParameters = null), (e.right = this.flowParseTypeInitialiser(29)), this.semicolon(), this.finishNode(e, 'TypeAlias');
		}
		flowParseOpaqueType(e, t) {
			return this.expectContextual(128), (e.id = this.flowParseRestrictedIdentifier(!0, !0)), this.scope.declareName(e.id.name, 8201, e.id.loc.start), this.match(47) ? (e.typeParameters = this.flowParseTypeParameterDeclaration()) : (e.typeParameters = null), (e.supertype = null), this.match(14) && (e.supertype = this.flowParseTypeInitialiser(14)), (e.impltype = null), t || (e.impltype = this.flowParseTypeInitialiser(29)), this.semicolon(), this.finishNode(e, 'OpaqueType');
		}
		flowParseTypeParameter(e = !1) {
			const t = this.state.startLoc,
				s = this.startNode(),
				r = this.flowParseVariance(),
				i = this.flowParseTypeAnnotatableIdentifier();
			return (s.name = i.name), (s.variance = r), (s.bound = i.typeAnnotation), this.match(29) ? (this.eat(29), (s.default = this.flowParseType())) : e && this.raise(FlowErrors.MissingTypeParamDefault, { at: t }), this.finishNode(s, 'TypeParameter');
		}
		flowParseTypeParameterDeclaration() {
			const e = this.state.inType,
				t = this.startNode();
			(t.params = []), (this.state.inType = !0), this.match(47) || this.match(140) ? this.next() : this.unexpected();
			let s = !1;
			do {
				const e = this.flowParseTypeParameter(s);
				t.params.push(e), e.default && (s = !0), this.match(48) || this.expect(12);
			} while (!this.match(48));
			return this.expect(48), (this.state.inType = e), this.finishNode(t, 'TypeParameterDeclaration');
		}
		flowParseTypeParameterInstantiation() {
			const e = this.startNode(),
				t = this.state.inType;
			(e.params = []), (this.state.inType = !0), this.expect(47);
			const s = this.state.noAnonFunctionType;
			for (this.state.noAnonFunctionType = !1; !this.match(48); ) e.params.push(this.flowParseType()), this.match(48) || this.expect(12);
			return (this.state.noAnonFunctionType = s), this.expect(48), (this.state.inType = t), this.finishNode(e, 'TypeParameterInstantiation');
		}
		flowParseTypeParameterInstantiationCallOrNew() {
			const e = this.startNode(),
				t = this.state.inType;
			for (e.params = [], this.state.inType = !0, this.expect(47); !this.match(48); ) e.params.push(this.flowParseTypeOrImplicitInstantiation()), this.match(48) || this.expect(12);
			return this.expect(48), (this.state.inType = t), this.finishNode(e, 'TypeParameterInstantiation');
		}
		flowParseInterfaceType() {
			const e = this.startNode();
			if ((this.expectContextual(127), (e.extends = []), this.eat(81)))
				do {
					e.extends.push(this.flowParseInterfaceExtends());
				} while (this.eat(12));
			return (e.body = this.flowParseObjectType({ allowStatic: !1, allowExact: !1, allowSpread: !1, allowProto: !1, allowInexact: !1 })), this.finishNode(e, 'InterfaceTypeAnnotation');
		}
		flowParseObjectPropertyKey() {
			return this.match(132) || this.match(131) ? super.parseExprAtom() : this.parseIdentifier(!0);
		}
		flowParseObjectTypeIndexer(e, t, s) {
			return (e.static = t), 14 === this.lookahead().type ? ((e.id = this.flowParseObjectPropertyKey()), (e.key = this.flowParseTypeInitialiser())) : ((e.id = null), (e.key = this.flowParseType())), this.expect(3), (e.value = this.flowParseTypeInitialiser()), (e.variance = s), this.finishNode(e, 'ObjectTypeIndexer');
		}
		flowParseObjectTypeInternalSlot(e, t) {
			return (e.static = t), (e.id = this.flowParseObjectPropertyKey()), this.expect(3), this.expect(3), this.match(47) || this.match(10) ? ((e.method = !0), (e.optional = !1), (e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.loc.start)))) : ((e.method = !1), this.eat(17) && (e.optional = !0), (e.value = this.flowParseTypeInitialiser())), this.finishNode(e, 'ObjectTypeInternalSlot');
		}
		flowParseObjectTypeMethodish(e) {
			for (e.params = [], e.rest = null, e.typeParameters = null, e.this = null, this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), this.expect(10), this.match(78) && ((e.this = this.flowParseFunctionTypeParam(!0)), (e.this.name = null), this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) e.params.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
			return this.eat(21) && (e.rest = this.flowParseFunctionTypeParam(!1)), this.expect(11), (e.returnType = this.flowParseTypeInitialiser()), this.finishNode(e, 'FunctionTypeAnnotation');
		}
		flowParseObjectTypeCallProperty(e, t) {
			const s = this.startNode();
			return (e.static = t), (e.value = this.flowParseObjectTypeMethodish(s)), this.finishNode(e, 'ObjectTypeCallProperty');
		}
		flowParseObjectType({ allowStatic: e, allowExact: t, allowSpread: s, allowProto: r, allowInexact: i }) {
			const a = this.state.inType;
			this.state.inType = !0;
			const n = this.startNode();
			let o, h;
			(n.callProperties = []), (n.properties = []), (n.indexers = []), (n.internalSlots = []);
			let p = !1;
			for (t && this.match(6) ? (this.expect(6), (o = 9), (h = !0)) : (this.expect(5), (o = 8), (h = !1)), n.exact = h; !this.match(o); ) {
				let t = !1,
					a = null,
					o = null;
				const c = this.startNode();
				if (r && this.isContextual(116)) {
					const t = this.lookahead();
					14 !== t.type && 17 !== t.type && (this.next(), (a = this.state.startLoc), (e = !1));
				}
				if (e && this.isContextual(104)) {
					const e = this.lookahead();
					14 !== e.type && 17 !== e.type && (this.next(), (t = !0));
				}
				const l = this.flowParseVariance();
				if (this.eat(0)) null != a && this.unexpected(a), this.eat(0) ? (l && this.unexpected(l.loc.start), n.internalSlots.push(this.flowParseObjectTypeInternalSlot(c, t))) : n.indexers.push(this.flowParseObjectTypeIndexer(c, t, l));
				else if (this.match(10) || this.match(47)) null != a && this.unexpected(a), l && this.unexpected(l.loc.start), n.callProperties.push(this.flowParseObjectTypeCallProperty(c, t));
				else {
					let e = 'init';
					if (this.isContextual(98) || this.isContextual(103)) {
						tokenIsLiteralPropertyName(this.lookahead().type) && ((e = this.state.value), this.next());
					}
					const r = this.flowParseObjectTypeProperty(c, t, a, l, e, s, null != i ? i : !h);
					null === r ? ((p = !0), (o = this.state.lastTokStartLoc)) : n.properties.push(r);
				}
				this.flowObjectTypeSemicolon(), !o || this.match(8) || this.match(9) || this.raise(FlowErrors.UnexpectedExplicitInexactInObject, { at: o });
			}
			this.expect(o), s && (n.inexact = p);
			const c = this.finishNode(n, 'ObjectTypeAnnotation');
			return (this.state.inType = a), c;
		}
		flowParseObjectTypeProperty(e, t, s, r, i, a, n) {
			if (this.eat(21)) {
				return this.match(12) || this.match(13) || this.match(8) || this.match(9)
					? (a ? n || this.raise(FlowErrors.InexactInsideExact, { at: this.state.lastTokStartLoc }) : this.raise(FlowErrors.InexactInsideNonObject, { at: this.state.lastTokStartLoc }), r && this.raise(FlowErrors.InexactVariance, { at: r }), null)
					: (a || this.raise(FlowErrors.UnexpectedSpreadType, { at: this.state.lastTokStartLoc }), null != s && this.unexpected(s), r && this.raise(FlowErrors.SpreadVariance, { at: r }), (e.argument = this.flowParseType()), this.finishNode(e, 'ObjectTypeSpreadProperty'));
			}
			{
				(e.key = this.flowParseObjectPropertyKey()), (e.static = t), (e.proto = null != s), (e.kind = i);
				let n = !1;
				return (
					this.match(47) || this.match(10)
						? ((e.method = !0), null != s && this.unexpected(s), r && this.unexpected(r.loc.start), (e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.loc.start))), ('get' !== i && 'set' !== i) || this.flowCheckGetterSetterParams(e), !a && 'constructor' === e.key.name && e.value.this && this.raise(FlowErrors.ThisParamBannedInConstructor, { at: e.value.this }))
						: ('init' !== i && this.unexpected(), (e.method = !1), this.eat(17) && (n = !0), (e.value = this.flowParseTypeInitialiser()), (e.variance = r)),
					(e.optional = n),
					this.finishNode(e, 'ObjectTypeProperty')
				);
			}
		}
		flowCheckGetterSetterParams(e) {
			const t = 'get' === e.kind ? 0 : 1,
				s = e.value.params.length + (e.value.rest ? 1 : 0);
			e.value.this && this.raise('get' === e.kind ? FlowErrors.GetterMayNotHaveThisParam : FlowErrors.SetterMayNotHaveThisParam, { at: e.value.this }), s !== t && this.raise('get' === e.kind ? Errors.BadGetterArity : Errors.BadSetterArity, { at: e }), 'set' === e.kind && e.value.rest && this.raise(Errors.BadSetterRestParameter, { at: e });
		}
		flowObjectTypeSemicolon() {
			this.eat(13) || this.eat(12) || this.match(8) || this.match(9) || this.unexpected();
		}
		flowParseQualifiedTypeIdentifier(e, t) {
			null != e || (e = this.state.startLoc);
			let s = t || this.flowParseRestrictedIdentifier(!0);
			for (; this.eat(16); ) {
				const t = this.startNodeAt(e);
				(t.qualification = s), (t.id = this.flowParseRestrictedIdentifier(!0)), (s = this.finishNode(t, 'QualifiedTypeIdentifier'));
			}
			return s;
		}
		flowParseGenericType(e, t) {
			const s = this.startNodeAt(e);
			return (s.typeParameters = null), (s.id = this.flowParseQualifiedTypeIdentifier(e, t)), this.match(47) && (s.typeParameters = this.flowParseTypeParameterInstantiation()), this.finishNode(s, 'GenericTypeAnnotation');
		}
		flowParseTypeofType() {
			const e = this.startNode();
			return this.expect(87), (e.argument = this.flowParsePrimaryType()), this.finishNode(e, 'TypeofTypeAnnotation');
		}
		flowParseTupleType() {
			const e = this.startNode();
			for (e.types = [], this.expect(0); this.state.pos < this.length && !this.match(3) && (e.types.push(this.flowParseType()), !this.match(3)); ) this.expect(12);
			return this.expect(3), this.finishNode(e, 'TupleTypeAnnotation');
		}
		flowParseFunctionTypeParam(e) {
			let t = null,
				s = !1,
				r = null;
			const i = this.startNode(),
				a = this.lookahead(),
				n = 78 === this.state.type;
			return 14 === a.type || 17 === a.type ? (n && !e && this.raise(FlowErrors.ThisParamMustBeFirst, { at: i }), (t = this.parseIdentifier(n)), this.eat(17) && ((s = !0), n && this.raise(FlowErrors.ThisParamMayNotBeOptional, { at: i })), (r = this.flowParseTypeInitialiser())) : (r = this.flowParseType()), (i.name = t), (i.optional = s), (i.typeAnnotation = r), this.finishNode(i, 'FunctionTypeParam');
		}
		reinterpretTypeAsFunctionTypeParam(e) {
			const t = this.startNodeAt(e.loc.start);
			return (t.name = null), (t.optional = !1), (t.typeAnnotation = e), this.finishNode(t, 'FunctionTypeParam');
		}
		flowParseFunctionTypeParams(e = []) {
			let t = null,
				s = null;
			for (this.match(78) && ((s = this.flowParseFunctionTypeParam(!0)), (s.name = null), this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) e.push(this.flowParseFunctionTypeParam(!1)), this.match(11) || this.expect(12);
			return this.eat(21) && (t = this.flowParseFunctionTypeParam(!1)), { params: e, rest: t, _this: s };
		}
		flowIdentToTypeAnnotation(e, t, s) {
			switch (s.name) {
				case 'any':
					return this.finishNode(t, 'AnyTypeAnnotation');
				case 'bool':
				case 'boolean':
					return this.finishNode(t, 'BooleanTypeAnnotation');
				case 'mixed':
					return this.finishNode(t, 'MixedTypeAnnotation');
				case 'empty':
					return this.finishNode(t, 'EmptyTypeAnnotation');
				case 'number':
					return this.finishNode(t, 'NumberTypeAnnotation');
				case 'string':
					return this.finishNode(t, 'StringTypeAnnotation');
				case 'symbol':
					return this.finishNode(t, 'SymbolTypeAnnotation');
				default:
					return this.checkNotUnderscore(s.name), this.flowParseGenericType(e, s);
			}
		}
		flowParsePrimaryType() {
			const e = this.state.startLoc,
				t = this.startNode();
			let s,
				r,
				i = !1;
			const a = this.state.noAnonFunctionType;
			switch (this.state.type) {
				case 5:
					return this.flowParseObjectType({ allowStatic: !1, allowExact: !1, allowSpread: !0, allowProto: !1, allowInexact: !0 });
				case 6:
					return this.flowParseObjectType({ allowStatic: !1, allowExact: !0, allowSpread: !0, allowProto: !1, allowInexact: !1 });
				case 0:
					return (this.state.noAnonFunctionType = !1), (r = this.flowParseTupleType()), (this.state.noAnonFunctionType = a), r;
				case 47:
					return (t.typeParameters = this.flowParseTypeParameterDeclaration()), this.expect(10), (s = this.flowParseFunctionTypeParams()), (t.params = s.params), (t.rest = s.rest), (t.this = s._this), this.expect(11), this.expect(19), (t.returnType = this.flowParseType()), this.finishNode(t, 'FunctionTypeAnnotation');
				case 10:
					if ((this.next(), !this.match(11) && !this.match(21)))
						if (tokenIsIdentifier(this.state.type) || this.match(78)) {
							const e = this.lookahead().type;
							i = 17 !== e && 14 !== e;
						} else i = !0;
					if (i) {
						if (((this.state.noAnonFunctionType = !1), (r = this.flowParseType()), (this.state.noAnonFunctionType = a), this.state.noAnonFunctionType || !(this.match(12) || (this.match(11) && 19 === this.lookahead().type)))) return this.expect(11), r;
						this.eat(12);
					}
					return (s = r ? this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(r)]) : this.flowParseFunctionTypeParams()), (t.params = s.params), (t.rest = s.rest), (t.this = s._this), this.expect(11), this.expect(19), (t.returnType = this.flowParseType()), (t.typeParameters = null), this.finishNode(t, 'FunctionTypeAnnotation');
				case 131:
					return this.parseLiteral(this.state.value, 'StringLiteralTypeAnnotation');
				case 85:
				case 86:
					return (t.value = this.match(85)), this.next(), this.finishNode(t, 'BooleanLiteralTypeAnnotation');
				case 53:
					if ('-' === this.state.value) {
						if ((this.next(), this.match(132))) return this.parseLiteralAtNode(-this.state.value, 'NumberLiteralTypeAnnotation', t);
						if (this.match(133)) return this.parseLiteralAtNode(-this.state.value, 'BigIntLiteralTypeAnnotation', t);
						throw this.raise(FlowErrors.UnexpectedSubtractionOperand, { at: this.state.startLoc });
					}
					return void this.unexpected();
				case 132:
					return this.parseLiteral(this.state.value, 'NumberLiteralTypeAnnotation');
				case 133:
					return this.parseLiteral(this.state.value, 'BigIntLiteralTypeAnnotation');
				case 88:
					return this.next(), this.finishNode(t, 'VoidTypeAnnotation');
				case 84:
					return this.next(), this.finishNode(t, 'NullLiteralTypeAnnotation');
				case 78:
					return this.next(), this.finishNode(t, 'ThisTypeAnnotation');
				case 55:
					return this.next(), this.finishNode(t, 'ExistsTypeAnnotation');
				case 87:
					return this.flowParseTypeofType();
				default:
					if (tokenIsKeyword(this.state.type)) {
						const e = tokenLabelName(this.state.type);
						return this.next(), super.createIdentifier(t, e);
					}
					if (tokenIsIdentifier(this.state.type)) return this.isContextual(127) ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(e, t, this.parseIdentifier());
			}
			this.unexpected();
		}
		flowParsePostfixType() {
			const e = this.state.startLoc;
			let t = this.flowParsePrimaryType(),
				s = !1;
			for (; (this.match(0) || this.match(18)) && !this.canInsertSemicolon(); ) {
				const r = this.startNodeAt(e),
					i = this.eat(18);
				(s = s || i), this.expect(0), !i && this.match(3) ? ((r.elementType = t), this.next(), (t = this.finishNode(r, 'ArrayTypeAnnotation'))) : ((r.objectType = t), (r.indexType = this.flowParseType()), this.expect(3), s ? ((r.optional = i), (t = this.finishNode(r, 'OptionalIndexedAccessType'))) : (t = this.finishNode(r, 'IndexedAccessType')));
			}
			return t;
		}
		flowParsePrefixType() {
			const e = this.startNode();
			return this.eat(17) ? ((e.typeAnnotation = this.flowParsePrefixType()), this.finishNode(e, 'NullableTypeAnnotation')) : this.flowParsePostfixType();
		}
		flowParseAnonFunctionWithoutParens() {
			const e = this.flowParsePrefixType();
			if (!this.state.noAnonFunctionType && this.eat(19)) {
				const t = this.startNodeAt(e.loc.start);
				return (t.params = [this.reinterpretTypeAsFunctionTypeParam(e)]), (t.rest = null), (t.this = null), (t.returnType = this.flowParseType()), (t.typeParameters = null), this.finishNode(t, 'FunctionTypeAnnotation');
			}
			return e;
		}
		flowParseIntersectionType() {
			const e = this.startNode();
			this.eat(45);
			const t = this.flowParseAnonFunctionWithoutParens();
			for (e.types = [t]; this.eat(45); ) e.types.push(this.flowParseAnonFunctionWithoutParens());
			return 1 === e.types.length ? t : this.finishNode(e, 'IntersectionTypeAnnotation');
		}
		flowParseUnionType() {
			const e = this.startNode();
			this.eat(43);
			const t = this.flowParseIntersectionType();
			for (e.types = [t]; this.eat(43); ) e.types.push(this.flowParseIntersectionType());
			return 1 === e.types.length ? t : this.finishNode(e, 'UnionTypeAnnotation');
		}
		flowParseType() {
			const e = this.state.inType;
			this.state.inType = !0;
			const t = this.flowParseUnionType();
			return (this.state.inType = e), t;
		}
		flowParseTypeOrImplicitInstantiation() {
			if (130 === this.state.type && '_' === this.state.value) {
				const e = this.state.startLoc,
					t = this.parseIdentifier();
				return this.flowParseGenericType(e, t);
			}
			return this.flowParseType();
		}
		flowParseTypeAnnotation() {
			const e = this.startNode();
			return (e.typeAnnotation = this.flowParseTypeInitialiser()), this.finishNode(e, 'TypeAnnotation');
		}
		flowParseTypeAnnotatableIdentifier(e) {
			const t = e ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
			return this.match(14) && ((t.typeAnnotation = this.flowParseTypeAnnotation()), this.resetEndLocation(t)), t;
		}
		typeCastToParameter(e) {
			return (e.expression.typeAnnotation = e.typeAnnotation), this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
		}
		flowParseVariance() {
			let e = null;
			return this.match(53) ? ((e = this.startNode()), '+' === this.state.value ? (e.kind = 'plus') : (e.kind = 'minus'), this.next(), this.finishNode(e, 'Variance')) : e;
		}
		parseFunctionBody(e, t, s = !1) {
			t ? this.forwardNoArrowParamsConversionAt(e, () => super.parseFunctionBody(e, !0, s)) : super.parseFunctionBody(e, !1, s);
		}
		parseFunctionBodyAndFinish(e, t, s = !1) {
			if (this.match(14)) {
				const t = this.startNode();
				([t.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser()), (e.returnType = t.typeAnnotation ? this.finishNode(t, 'TypeAnnotation') : null);
			}
			return super.parseFunctionBodyAndFinish(e, t, s);
		}
		parseStatementLike(e) {
			if (this.state.strict && this.isContextual(127)) {
				if (tokenIsKeywordOrIdentifier(this.lookahead().type)) {
					const e = this.startNode();
					return this.next(), this.flowParseInterface(e);
				}
			} else if (this.shouldParseEnums() && this.isContextual(124)) {
				const e = this.startNode();
				return this.next(), this.flowParseEnumDeclaration(e);
			}
			const t = super.parseStatementLike(e);
			return void 0 !== this.flowPragma || this.isValidDirective(t) || (this.flowPragma = null), t;
		}
		parseExpressionStatement(e, t, s) {
			if ('Identifier' === t.type)
				if ('declare' === t.name) {
					if (this.match(80) || tokenIsIdentifier(this.state.type) || this.match(68) || this.match(74) || this.match(82)) return this.flowParseDeclare(e);
				} else if (tokenIsIdentifier(this.state.type)) {
					if ('interface' === t.name) return this.flowParseInterface(e);
					if ('type' === t.name) return this.flowParseTypeAlias(e);
					if ('opaque' === t.name) return this.flowParseOpaqueType(e, !1);
				}
			return super.parseExpressionStatement(e, t, s);
		}
		shouldParseExportDeclaration() {
			const { type: e } = this.state;
			return tokenIsFlowInterfaceOrTypeOrOpaque(e) || (this.shouldParseEnums() && 124 === e) ? !this.state.containsEsc : super.shouldParseExportDeclaration();
		}
		isExportDefaultSpecifier() {
			const { type: e } = this.state;
			return tokenIsFlowInterfaceOrTypeOrOpaque(e) || (this.shouldParseEnums() && 124 === e) ? this.state.containsEsc : super.isExportDefaultSpecifier();
		}
		parseExportDefaultExpression() {
			if (this.shouldParseEnums() && this.isContextual(124)) {
				const e = this.startNode();
				return this.next(), this.flowParseEnumDeclaration(e);
			}
			return super.parseExportDefaultExpression();
		}
		parseConditional(e, t, s) {
			if (!this.match(17)) return e;
			if (this.state.maybeInArrowParameters) {
				const t = this.lookaheadCharCode();
				if (44 === t || 61 === t || 58 === t || 41 === t) return this.setOptionalParametersError(s), e;
			}
			this.expect(17);
			const r = this.state.clone(),
				i = this.state.noArrowAt,
				a = this.startNodeAt(t);
			let { consequent: n, failed: o } = this.tryParseConditionalConsequent(),
				[h, p] = this.getArrowLikeExpressions(n);
			if (o || p.length > 0) {
				const e = [...i];
				if (p.length > 0) {
					(this.state = r), (this.state.noArrowAt = e);
					for (let t = 0; t < p.length; t++) e.push(p[t].start);
					({ consequent: n, failed: o } = this.tryParseConditionalConsequent()), ([h, p] = this.getArrowLikeExpressions(n));
				}
				o && h.length > 1 && this.raise(FlowErrors.AmbiguousConditionalArrow, { at: r.startLoc }), o && 1 === h.length && ((this.state = r), e.push(h[0].start), (this.state.noArrowAt = e), ({ consequent: n, failed: o } = this.tryParseConditionalConsequent()));
			}
			return this.getArrowLikeExpressions(n, !0), (this.state.noArrowAt = i), this.expect(14), (a.test = e), (a.consequent = n), (a.alternate = this.forwardNoArrowParamsConversionAt(a, () => this.parseMaybeAssign(void 0, void 0))), this.finishNode(a, 'ConditionalExpression');
		}
		tryParseConditionalConsequent() {
			this.state.noArrowParamsConversionAt.push(this.state.start);
			const e = this.parseMaybeAssignAllowIn(),
				t = !this.match(14);
			return this.state.noArrowParamsConversionAt.pop(), { consequent: e, failed: t };
		}
		getArrowLikeExpressions(e, t) {
			const s = [e],
				r = [];
			for (; 0 !== s.length; ) {
				const e = s.pop();
				'ArrowFunctionExpression' === e.type ? (e.typeParameters || !e.returnType ? this.finishArrowValidation(e) : r.push(e), s.push(e.body)) : 'ConditionalExpression' === e.type && (s.push(e.consequent), s.push(e.alternate));
			}
			return t ? (r.forEach((e) => this.finishArrowValidation(e)), [r, []]) : partition(r, (e) => e.params.every((e) => this.isAssignable(e, !0)));
		}
		finishArrowValidation(e) {
			var t;
			this.toAssignableList(e.params, null == (t = e.extra) ? void 0 : t.trailingCommaLoc, !1), this.scope.enter(6), super.checkParams(e, !1, !0), this.scope.exit();
		}
		forwardNoArrowParamsConversionAt(e, t) {
			let s;
			return -1 !== this.state.noArrowParamsConversionAt.indexOf(e.start) ? (this.state.noArrowParamsConversionAt.push(this.state.start), (s = t()), this.state.noArrowParamsConversionAt.pop()) : (s = t()), s;
		}
		parseParenItem(e, t) {
			if (((e = super.parseParenItem(e, t)), this.eat(17) && ((e.optional = !0), this.resetEndLocation(e)), this.match(14))) {
				const s = this.startNodeAt(t);
				return (s.expression = e), (s.typeAnnotation = this.flowParseTypeAnnotation()), this.finishNode(s, 'TypeCastExpression');
			}
			return e;
		}
		assertModuleNodeAllowed(e) {
			('ImportDeclaration' === e.type && ('type' === e.importKind || 'typeof' === e.importKind)) || ('ExportNamedDeclaration' === e.type && 'type' === e.exportKind) || ('ExportAllDeclaration' === e.type && 'type' === e.exportKind) || super.assertModuleNodeAllowed(e);
		}
		parseExportDeclaration(e) {
			if (this.isContextual(128)) {
				e.exportKind = 'type';
				const t = this.startNode();
				return this.next(), this.match(5) ? ((e.specifiers = this.parseExportSpecifiers(!0)), super.parseExportFrom(e), null) : this.flowParseTypeAlias(t);
			}
			if (this.isContextual(129)) {
				e.exportKind = 'type';
				const t = this.startNode();
				return this.next(), this.flowParseOpaqueType(t, !1);
			}
			if (this.isContextual(127)) {
				e.exportKind = 'type';
				const t = this.startNode();
				return this.next(), this.flowParseInterface(t);
			}
			if (this.shouldParseEnums() && this.isContextual(124)) {
				e.exportKind = 'value';
				const t = this.startNode();
				return this.next(), this.flowParseEnumDeclaration(t);
			}
			return super.parseExportDeclaration(e);
		}
		eatExportStar(e) {
			return !!super.eatExportStar(e) || (!(!this.isContextual(128) || 55 !== this.lookahead().type) && ((e.exportKind = 'type'), this.next(), this.next(), !0));
		}
		maybeParseExportNamespaceSpecifier(e) {
			const { startLoc: t } = this.state,
				s = super.maybeParseExportNamespaceSpecifier(e);
			return s && 'type' === e.exportKind && this.unexpected(t), s;
		}
		parseClassId(e, t, s) {
			super.parseClassId(e, t, s), this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration());
		}
		parseClassMember(e, t, s) {
			const { startLoc: r } = this.state;
			if (this.isContextual(123)) {
				if (super.parseClassMemberFromModifier(e, t)) return;
				t.declare = !0;
			}
			super.parseClassMember(e, t, s), t.declare && ('ClassProperty' !== t.type && 'ClassPrivateProperty' !== t.type && 'PropertyDefinition' !== t.type ? this.raise(FlowErrors.DeclareClassElement, { at: r }) : t.value && this.raise(FlowErrors.DeclareClassFieldInitializer, { at: t.value }));
		}
		isIterator(e) {
			return 'iterator' === e || 'asyncIterator' === e;
		}
		readIterator() {
			const e = super.readWord1(),
				t = '@@' + e;
			(this.isIterator(e) && this.state.inType) || this.raise(Errors.InvalidIdentifier, { at: this.state.curPosition(), identifierName: t }), this.finishToken(130, t);
		}
		getTokenFromCode(e) {
			const t = this.input.charCodeAt(this.state.pos + 1);
			123 === e && 124 === t ? this.finishOp(6, 2) : !this.state.inType || (62 !== e && 60 !== e) ? (this.state.inType && 63 === e ? (46 === t ? this.finishOp(18, 2) : this.finishOp(17, 1)) : isIteratorStart(e, t, this.input.charCodeAt(this.state.pos + 2)) ? ((this.state.pos += 2), this.readIterator()) : super.getTokenFromCode(e)) : this.finishOp(62 === e ? 48 : 47, 1);
		}
		isAssignable(e, t) {
			return 'TypeCastExpression' === e.type ? this.isAssignable(e.expression, t) : super.isAssignable(e, t);
		}
		toAssignable(e, t = !1) {
			t || 'AssignmentExpression' !== e.type || 'TypeCastExpression' !== e.left.type || (e.left = this.typeCastToParameter(e.left)), super.toAssignable(e, t);
		}
		toAssignableList(e, t, s) {
			for (let t = 0; t < e.length; t++) {
				const s = e[t];
				'TypeCastExpression' === (null == s ? void 0 : s.type) && (e[t] = this.typeCastToParameter(s));
			}
			super.toAssignableList(e, t, s);
		}
		toReferencedList(e, t) {
			for (let r = 0; r < e.length; r++) {
				var s;
				const i = e[r];
				!i || 'TypeCastExpression' !== i.type || (null != (s = i.extra) && s.parenthesized) || (!(e.length > 1) && t) || this.raise(FlowErrors.TypeCastInPattern, { at: i.typeAnnotation });
			}
			return e;
		}
		parseArrayLike(e, t, s, r) {
			const i = super.parseArrayLike(e, t, s, r);
			return t && !this.state.maybeInArrowParameters && this.toReferencedList(i.elements), i;
		}
		isValidLVal(e, t, s) {
			return 'TypeCastExpression' === e || super.isValidLVal(e, t, s);
		}
		parseClassProperty(e) {
			return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassProperty(e);
		}
		parseClassPrivateProperty(e) {
			return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassPrivateProperty(e);
		}
		isClassMethod() {
			return this.match(47) || super.isClassMethod();
		}
		isClassProperty() {
			return this.match(14) || super.isClassProperty();
		}
		isNonstaticConstructor(e) {
			return !this.match(14) && super.isNonstaticConstructor(e);
		}
		pushClassMethod(e, t, s, r, i, a) {
			if ((t.variance && this.unexpected(t.variance.loc.start), delete t.variance, this.match(47) && (t.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassMethod(e, t, s, r, i, a), t.params && i)) {
				const e = t.params;
				e.length > 0 && this.isThisParam(e[0]) && this.raise(FlowErrors.ThisParamBannedInConstructor, { at: t });
			} else if ('MethodDefinition' === t.type && i && t.value.params) {
				const e = t.value.params;
				e.length > 0 && this.isThisParam(e[0]) && this.raise(FlowErrors.ThisParamBannedInConstructor, { at: t });
			}
		}
		pushClassPrivateMethod(e, t, s, r) {
			t.variance && this.unexpected(t.variance.loc.start), delete t.variance, this.match(47) && (t.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassPrivateMethod(e, t, s, r);
		}
		parseClassSuper(e) {
			if ((super.parseClassSuper(e), e.superClass && this.match(47) && (e.superTypeParameters = this.flowParseTypeParameterInstantiation()), this.isContextual(111))) {
				this.next();
				const t = (e.implements = []);
				do {
					const e = this.startNode();
					(e.id = this.flowParseRestrictedIdentifier(!0)), this.match(47) ? (e.typeParameters = this.flowParseTypeParameterInstantiation()) : (e.typeParameters = null), t.push(this.finishNode(e, 'ClassImplements'));
				} while (this.eat(12));
			}
		}
		checkGetterSetterParams(e) {
			super.checkGetterSetterParams(e);
			const t = this.getObjectOrClassMethodParams(e);
			if (t.length > 0) {
				const s = t[0];
				this.isThisParam(s) && 'get' === e.kind ? this.raise(FlowErrors.GetterMayNotHaveThisParam, { at: s }) : this.isThisParam(s) && this.raise(FlowErrors.SetterMayNotHaveThisParam, { at: s });
			}
		}
		parsePropertyNamePrefixOperator(e) {
			e.variance = this.flowParseVariance();
		}
		parseObjPropValue(e, t, s, r, i, a, n) {
			let o;
			e.variance && this.unexpected(e.variance.loc.start), delete e.variance, this.match(47) && !a && ((o = this.flowParseTypeParameterDeclaration()), this.match(10) || this.unexpected());
			const h = super.parseObjPropValue(e, t, s, r, i, a, n);
			return o && ((h.value || h).typeParameters = o), h;
		}
		parseAssignableListItemTypes(e) {
			return this.eat(17) && ('Identifier' !== e.type && this.raise(FlowErrors.PatternIsOptional, { at: e }), this.isThisParam(e) && this.raise(FlowErrors.ThisParamMayNotBeOptional, { at: e }), (e.optional = !0)), this.match(14) ? (e.typeAnnotation = this.flowParseTypeAnnotation()) : this.isThisParam(e) && this.raise(FlowErrors.ThisParamAnnotationRequired, { at: e }), this.match(29) && this.isThisParam(e) && this.raise(FlowErrors.ThisParamNoDefault, { at: e }), this.resetEndLocation(e), e;
		}
		parseMaybeDefault(e, t) {
			const s = super.parseMaybeDefault(e, t);
			return 'AssignmentPattern' === s.type && s.typeAnnotation && s.right.start < s.typeAnnotation.start && this.raise(FlowErrors.TypeBeforeInitializer, { at: s.typeAnnotation }), s;
		}
		checkImportReflection(e) {
			super.checkImportReflection(e), e.module && 'value' !== e.importKind && this.raise(FlowErrors.ImportReflectionHasImportType, { at: e.specifiers[0].loc.start });
		}
		parseImportSpecifierLocal(e, t, s) {
			(t.local = hasTypeImportKind(e) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier()), e.specifiers.push(this.finishImportSpecifier(t, s));
		}
		isPotentialImportPhase(e) {
			if (super.isPotentialImportPhase(e)) return !0;
			if (this.isContextual(128)) {
				if (!e) return !0;
				const t = this.lookaheadCharCode();
				return 123 === t || 42 === t;
			}
			return !e && this.isContextual(87);
		}
		applyImportPhase(e, t, s, r) {
			if ((super.applyImportPhase(e, t, s, r), t)) {
				if (!s && this.match(65)) return;
				e.exportKind = 'type' === s ? s : 'value';
			} else 'type' === s && this.match(55) && this.unexpected(), (e.importKind = 'type' === s || 'typeof' === s ? s : 'value');
		}
		parseImportSpecifier(e, t, s, r, i) {
			const a = e.imported;
			let n = null;
			'Identifier' === a.type && ('type' === a.name ? (n = 'type') : 'typeof' === a.name && (n = 'typeof'));
			let o = !1;
			if (this.isContextual(93) && !this.isLookaheadContextual('as')) {
				const t = this.parseIdentifier(!0);
				null === n || tokenIsKeywordOrIdentifier(this.state.type) ? ((e.imported = a), (e.importKind = null), (e.local = this.parseIdentifier())) : ((e.imported = t), (e.importKind = n), (e.local = cloneIdentifier(t)));
			} else {
				if (null !== n && tokenIsKeywordOrIdentifier(this.state.type)) (e.imported = this.parseIdentifier(!0)), (e.importKind = n);
				else {
					if (t) throw this.raise(Errors.ImportBindingIsString, { at: e, importName: a.value });
					(e.imported = a), (e.importKind = null);
				}
				this.eatContextual(93) ? (e.local = this.parseIdentifier()) : ((o = !0), (e.local = cloneIdentifier(e.imported)));
			}
			const h = hasTypeImportKind(e);
			return s && h && this.raise(FlowErrors.ImportTypeShorthandOnlyInPureImport, { at: e }), (s || h) && this.checkReservedType(e.local.name, e.local.loc.start, !0), !o || s || h || this.checkReservedWord(e.local.name, e.loc.start, !0, !0), this.finishImportSpecifier(e, 'ImportSpecifier');
		}
		parseBindingAtom() {
			return 78 === this.state.type ? this.parseIdentifier(!0) : super.parseBindingAtom();
		}
		parseFunctionParams(e, t) {
			const s = e.kind;
			'get' !== s && 'set' !== s && this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), super.parseFunctionParams(e, t);
		}
		parseVarId(e, t) {
			super.parseVarId(e, t), this.match(14) && ((e.id.typeAnnotation = this.flowParseTypeAnnotation()), this.resetEndLocation(e.id));
		}
		parseAsyncArrowFromCallExpression(e, t) {
			if (this.match(14)) {
				const t = this.state.noAnonFunctionType;
				(this.state.noAnonFunctionType = !0), (e.returnType = this.flowParseTypeAnnotation()), (this.state.noAnonFunctionType = t);
			}
			return super.parseAsyncArrowFromCallExpression(e, t);
		}
		shouldParseAsyncArrow() {
			return this.match(14) || super.shouldParseAsyncArrow();
		}
		parseMaybeAssign(e, t) {
			var s;
			let r,
				i = null;
			if (this.hasPlugin('jsx') && (this.match(140) || this.match(47))) {
				if (((i = this.state.clone()), (r = this.tryParse(() => super.parseMaybeAssign(e, t), i)), !r.error)) return r.node;
				const { context: s } = this.state,
					a = s[s.length - 1];
				(a !== types.j_oTag && a !== types.j_expr) || s.pop();
			}
			if ((null != (s = r) && s.error) || this.match(47)) {
				var a, n;
				let s;
				i = i || this.state.clone();
				const o = this.tryParse((r) => {
					var i;
					s = this.flowParseTypeParameterDeclaration();
					const a = this.forwardNoArrowParamsConversionAt(s, () => {
						const r = super.parseMaybeAssign(e, t);
						return this.resetStartLocationFromNode(r, s), r;
					});
					null != (i = a.extra) && i.parenthesized && r();
					const n = this.maybeUnwrapTypeCastExpression(a);
					return 'ArrowFunctionExpression' !== n.type && r(), (n.typeParameters = s), this.resetStartLocationFromNode(n, s), a;
				}, i);
				let h = null;
				if (o.node && 'ArrowFunctionExpression' === this.maybeUnwrapTypeCastExpression(o.node).type) {
					if (!o.error && !o.aborted) return o.node.async && this.raise(FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction, { at: s }), o.node;
					h = o.node;
				}
				if (null != (a = r) && a.node) return (this.state = r.failState), r.node;
				if (h) return (this.state = o.failState), h;
				if (null != (n = r) && n.thrown) throw r.error;
				if (o.thrown) throw o.error;
				throw this.raise(FlowErrors.UnexpectedTokenAfterTypeParameter, { at: s });
			}
			return super.parseMaybeAssign(e, t);
		}
		parseArrow(e) {
			if (this.match(14)) {
				const t = this.tryParse(() => {
					const t = this.state.noAnonFunctionType;
					this.state.noAnonFunctionType = !0;
					const s = this.startNode();
					return ([s.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser()), (this.state.noAnonFunctionType = t), this.canInsertSemicolon() && this.unexpected(), this.match(19) || this.unexpected(), s;
				});
				if (t.thrown) return null;
				t.error && (this.state = t.failState), (e.returnType = t.node.typeAnnotation ? this.finishNode(t.node, 'TypeAnnotation') : null);
			}
			return super.parseArrow(e);
		}
		shouldParseArrow(e) {
			return this.match(14) || super.shouldParseArrow(e);
		}
		setArrowFunctionParameters(e, t) {
			-1 !== this.state.noArrowParamsConversionAt.indexOf(e.start) ? (e.params = t) : super.setArrowFunctionParameters(e, t);
		}
		checkParams(e, t, s, r = !0) {
			if (!s || -1 === this.state.noArrowParamsConversionAt.indexOf(e.start)) {
				for (let t = 0; t < e.params.length; t++) this.isThisParam(e.params[t]) && t > 0 && this.raise(FlowErrors.ThisParamMustBeFirst, { at: e.params[t] });
				super.checkParams(e, t, s, r);
			}
		}
		parseParenAndDistinguishExpression(e) {
			return super.parseParenAndDistinguishExpression(e && -1 === this.state.noArrowAt.indexOf(this.state.start));
		}
		parseSubscripts(e, t, s) {
			if ('Identifier' === e.type && 'async' === e.name && -1 !== this.state.noArrowAt.indexOf(t.index)) {
				this.next();
				const s = this.startNodeAt(t);
				(s.callee = e), (s.arguments = super.parseCallExpressionArguments(11, !1)), (e = this.finishNode(s, 'CallExpression'));
			} else if ('Identifier' === e.type && 'async' === e.name && this.match(47)) {
				const r = this.state.clone(),
					i = this.tryParse((e) => this.parseAsyncArrowWithTypeParameters(t) || e(), r);
				if (!i.error && !i.aborted) return i.node;
				const a = this.tryParse(() => super.parseSubscripts(e, t, s), r);
				if (a.node && !a.error) return a.node;
				if (i.node) return (this.state = i.failState), i.node;
				if (a.node) return (this.state = a.failState), a.node;
				throw i.error || a.error;
			}
			return super.parseSubscripts(e, t, s);
		}
		parseSubscript(e, t, s, r) {
			if (this.match(18) && this.isLookaheadToken_lt()) {
				if (((r.optionalChainMember = !0), s)) return (r.stop = !0), e;
				this.next();
				const i = this.startNodeAt(t);
				return (i.callee = e), (i.typeArguments = this.flowParseTypeParameterInstantiation()), this.expect(10), (i.arguments = this.parseCallExpressionArguments(11, !1)), (i.optional = !0), this.finishCallExpression(i, !0);
			}
			if (!s && this.shouldParseTypes() && this.match(47)) {
				const s = this.startNodeAt(t);
				s.callee = e;
				const i = this.tryParse(() => ((s.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew()), this.expect(10), (s.arguments = super.parseCallExpressionArguments(11, !1)), r.optionalChainMember && (s.optional = !1), this.finishCallExpression(s, r.optionalChainMember)));
				if (i.node) return i.error && (this.state = i.failState), i.node;
			}
			return super.parseSubscript(e, t, s, r);
		}
		parseNewCallee(e) {
			super.parseNewCallee(e);
			let t = null;
			this.shouldParseTypes() && this.match(47) && (t = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node), (e.typeArguments = t);
		}
		parseAsyncArrowWithTypeParameters(e) {
			const t = this.startNodeAt(e);
			if ((this.parseFunctionParams(t, !1), this.parseArrow(t))) return super.parseArrowExpression(t, void 0, !0);
		}
		readToken_mult_modulo(e) {
			const t = this.input.charCodeAt(this.state.pos + 1);
			if (42 === e && 47 === t && this.state.hasFlowComment) return (this.state.hasFlowComment = !1), (this.state.pos += 2), void this.nextToken();
			super.readToken_mult_modulo(e);
		}
		readToken_pipe_amp(e) {
			const t = this.input.charCodeAt(this.state.pos + 1);
			124 !== e || 125 !== t ? super.readToken_pipe_amp(e) : this.finishOp(9, 2);
		}
		parseTopLevel(e, t) {
			const s = super.parseTopLevel(e, t);
			return this.state.hasFlowComment && this.raise(FlowErrors.UnterminatedFlowComment, { at: this.state.curPosition() }), s;
		}
		skipBlockComment() {
			if (!this.hasPlugin('flowComments') || !this.skipFlowComment()) return super.skipBlockComment(this.state.hasFlowComment ? '*-/' : '*/');
			{
				if (this.state.hasFlowComment) throw this.raise(FlowErrors.NestedFlowComment, { at: this.state.startLoc });
				this.hasFlowCommentCompletion();
				const e = this.skipFlowComment();
				e && ((this.state.pos += e), (this.state.hasFlowComment = !0));
			}
		}
		skipFlowComment() {
			const { pos: e } = this.state;
			let t = 2;
			for (; [32, 9].includes(this.input.charCodeAt(e + t)); ) t++;
			const s = this.input.charCodeAt(t + e),
				r = this.input.charCodeAt(t + e + 1);
			return 58 === s && 58 === r ? t + 2 : 'flow-include' === this.input.slice(t + e, t + e + 12) ? t + 12 : 58 === s && 58 !== r && t;
		}
		hasFlowCommentCompletion() {
			if (-1 === this.input.indexOf('*/', this.state.pos)) throw this.raise(Errors.UnterminatedComment, { at: this.state.curPosition() });
		}
		flowEnumErrorBooleanMemberNotInitialized(e, { enumName: t, memberName: s }) {
			this.raise(FlowErrors.EnumBooleanMemberNotInitialized, { at: e, memberName: s, enumName: t });
		}
		flowEnumErrorInvalidMemberInitializer(e, t) {
			return this.raise(t.explicitType ? ('symbol' === t.explicitType ? FlowErrors.EnumInvalidMemberInitializerSymbolType : FlowErrors.EnumInvalidMemberInitializerPrimaryType) : FlowErrors.EnumInvalidMemberInitializerUnknownType, Object.assign({ at: e }, t));
		}
		flowEnumErrorNumberMemberNotInitialized(e, { enumName: t, memberName: s }) {
			this.raise(FlowErrors.EnumNumberMemberNotInitialized, { at: e, enumName: t, memberName: s });
		}
		flowEnumErrorStringMemberInconsistentlyInitialized(e, { enumName: t }) {
			this.raise(FlowErrors.EnumStringMemberInconsistentlyInitialized, { at: e, enumName: t });
		}
		flowEnumMemberInit() {
			const e = this.state.startLoc,
				t = () => this.match(12) || this.match(8);
			switch (this.state.type) {
				case 132: {
					const s = this.parseNumericLiteral(this.state.value);
					return t() ? { type: 'number', loc: s.loc.start, value: s } : { type: 'invalid', loc: e };
				}
				case 131: {
					const s = this.parseStringLiteral(this.state.value);
					return t() ? { type: 'string', loc: s.loc.start, value: s } : { type: 'invalid', loc: e };
				}
				case 85:
				case 86: {
					const s = this.parseBooleanLiteral(this.match(85));
					return t() ? { type: 'boolean', loc: s.loc.start, value: s } : { type: 'invalid', loc: e };
				}
				default:
					return { type: 'invalid', loc: e };
			}
		}
		flowEnumMemberRaw() {
			const e = this.state.startLoc;
			return { id: this.parseIdentifier(!0), init: this.eat(29) ? this.flowEnumMemberInit() : { type: 'none', loc: e } };
		}
		flowEnumCheckExplicitTypeMismatch(e, t, s) {
			const { explicitType: r } = t;
			null !== r && r !== s && this.flowEnumErrorInvalidMemberInitializer(e, t);
		}
		flowEnumMembers({ enumName: e, explicitType: t }) {
			const s = new Set(),
				r = { booleanMembers: [], numberMembers: [], stringMembers: [], defaultedMembers: [] };
			let i = !1;
			for (; !this.match(8); ) {
				if (this.eat(21)) {
					i = !0;
					break;
				}
				const a = this.startNode(),
					{ id: n, init: o } = this.flowEnumMemberRaw(),
					h = n.name;
				if ('' === h) continue;
				/^[a-z]/.test(h) && this.raise(FlowErrors.EnumInvalidMemberName, { at: n, memberName: h, suggestion: h[0].toUpperCase() + h.slice(1), enumName: e }), s.has(h) && this.raise(FlowErrors.EnumDuplicateMemberName, { at: n, memberName: h, enumName: e }), s.add(h);
				const p = { enumName: e, explicitType: t, memberName: h };
				switch (((a.id = n), o.type)) {
					case 'boolean':
						this.flowEnumCheckExplicitTypeMismatch(o.loc, p, 'boolean'), (a.init = o.value), r.booleanMembers.push(this.finishNode(a, 'EnumBooleanMember'));
						break;
					case 'number':
						this.flowEnumCheckExplicitTypeMismatch(o.loc, p, 'number'), (a.init = o.value), r.numberMembers.push(this.finishNode(a, 'EnumNumberMember'));
						break;
					case 'string':
						this.flowEnumCheckExplicitTypeMismatch(o.loc, p, 'string'), (a.init = o.value), r.stringMembers.push(this.finishNode(a, 'EnumStringMember'));
						break;
					case 'invalid':
						throw this.flowEnumErrorInvalidMemberInitializer(o.loc, p);
					case 'none':
						switch (t) {
							case 'boolean':
								this.flowEnumErrorBooleanMemberNotInitialized(o.loc, p);
								break;
							case 'number':
								this.flowEnumErrorNumberMemberNotInitialized(o.loc, p);
								break;
							default:
								r.defaultedMembers.push(this.finishNode(a, 'EnumDefaultedMember'));
						}
				}
				this.match(8) || this.expect(12);
			}
			return { members: r, hasUnknownMembers: i };
		}
		flowEnumStringMembers(e, t, { enumName: s }) {
			if (0 === e.length) return t;
			if (0 === t.length) return e;
			if (t.length > e.length) {
				for (const t of e) this.flowEnumErrorStringMemberInconsistentlyInitialized(t, { enumName: s });
				return t;
			}
			for (const e of t) this.flowEnumErrorStringMemberInconsistentlyInitialized(e, { enumName: s });
			return e;
		}
		flowEnumParseExplicitType({ enumName: e }) {
			if (!this.eatContextual(101)) return null;
			if (!tokenIsIdentifier(this.state.type)) throw this.raise(FlowErrors.EnumInvalidExplicitTypeUnknownSupplied, { at: this.state.startLoc, enumName: e });
			const { value: t } = this.state;
			return this.next(), 'boolean' !== t && 'number' !== t && 'string' !== t && 'symbol' !== t && this.raise(FlowErrors.EnumInvalidExplicitType, { at: this.state.startLoc, enumName: e, invalidEnumType: t }), t;
		}
		flowEnumBody(e, t) {
			const s = t.name,
				r = t.loc.start,
				i = this.flowEnumParseExplicitType({ enumName: s });
			this.expect(5);
			const { members: a, hasUnknownMembers: n } = this.flowEnumMembers({ enumName: s, explicitType: i });
			switch (((e.hasUnknownMembers = n), i)) {
				case 'boolean':
					return (e.explicitType = !0), (e.members = a.booleanMembers), this.expect(8), this.finishNode(e, 'EnumBooleanBody');
				case 'number':
					return (e.explicitType = !0), (e.members = a.numberMembers), this.expect(8), this.finishNode(e, 'EnumNumberBody');
				case 'string':
					return (e.explicitType = !0), (e.members = this.flowEnumStringMembers(a.stringMembers, a.defaultedMembers, { enumName: s })), this.expect(8), this.finishNode(e, 'EnumStringBody');
				case 'symbol':
					return (e.members = a.defaultedMembers), this.expect(8), this.finishNode(e, 'EnumSymbolBody');
				default: {
					const t = () => ((e.members = []), this.expect(8), this.finishNode(e, 'EnumStringBody'));
					e.explicitType = !1;
					const i = a.booleanMembers.length,
						n = a.numberMembers.length,
						o = a.stringMembers.length,
						h = a.defaultedMembers.length;
					if (i || n || o || h) {
						if (i || n) {
							if (!n && !o && i >= h) {
								for (const e of a.defaultedMembers) this.flowEnumErrorBooleanMemberNotInitialized(e.loc.start, { enumName: s, memberName: e.id.name });
								return (e.members = a.booleanMembers), this.expect(8), this.finishNode(e, 'EnumBooleanBody');
							}
							if (!i && !o && n >= h) {
								for (const e of a.defaultedMembers) this.flowEnumErrorNumberMemberNotInitialized(e.loc.start, { enumName: s, memberName: e.id.name });
								return (e.members = a.numberMembers), this.expect(8), this.finishNode(e, 'EnumNumberBody');
							}
							return this.raise(FlowErrors.EnumInconsistentMemberValues, { at: r, enumName: s }), t();
						}
						return (e.members = this.flowEnumStringMembers(a.stringMembers, a.defaultedMembers, { enumName: s })), this.expect(8), this.finishNode(e, 'EnumStringBody');
					}
					return t();
				}
			}
		}
		flowParseEnumDeclaration(e) {
			const t = this.parseIdentifier();
			return (e.id = t), (e.body = this.flowEnumBody(this.startNode(), t)), this.finishNode(e, 'EnumDeclaration');
		}
		isLookaheadToken_lt() {
			const e = this.nextTokenStart();
			if (60 === this.input.charCodeAt(e)) {
				const t = this.input.charCodeAt(e + 1);
				return 60 !== t && 61 !== t;
			}
			return !1;
		}
		maybeUnwrapTypeCastExpression(e) {
			return 'TypeCastExpression' === e.type ? e.expression : e;
		}
	};
const entities = {
		__proto__: null,
		quot: '"',
		amp: '&',
		apos: "'",
		lt: '<',
		gt: '>',
		nbsp: ' ',
		iexcl: '¡',
		cent: '¢',
		pound: '£',
		curren: '¤',
		yen: '¥',
		brvbar: '¦',
		sect: '§',
		uml: '¨',
		copy: '©',
		ordf: 'ª',
		laquo: '«',
		not: '¬',
		shy: '­',
		reg: '®',
		macr: '¯',
		deg: '°',
		plusmn: '±',
		sup2: '²',
		sup3: '³',
		acute: '´',
		micro: 'µ',
		para: '¶',
		middot: '·',
		cedil: '¸',
		sup1: '¹',
		ordm: 'º',
		raquo: '»',
		frac14: '¼',
		frac12: '½',
		frac34: '¾',
		iquest: '¿',
		Agrave: 'À',
		Aacute: 'Á',
		Acirc: 'Â',
		Atilde: 'Ã',
		Auml: 'Ä',
		Aring: 'Å',
		AElig: 'Æ',
		Ccedil: 'Ç',
		Egrave: 'È',
		Eacute: 'É',
		Ecirc: 'Ê',
		Euml: 'Ë',
		Igrave: 'Ì',
		Iacute: 'Í',
		Icirc: 'Î',
		Iuml: 'Ï',
		ETH: 'Ð',
		Ntilde: 'Ñ',
		Ograve: 'Ò',
		Oacute: 'Ó',
		Ocirc: 'Ô',
		Otilde: 'Õ',
		Ouml: 'Ö',
		times: '×',
		Oslash: 'Ø',
		Ugrave: 'Ù',
		Uacute: 'Ú',
		Ucirc: 'Û',
		Uuml: 'Ü',
		Yacute: 'Ý',
		THORN: 'Þ',
		szlig: 'ß',
		agrave: 'à',
		aacute: 'á',
		acirc: 'â',
		atilde: 'ã',
		auml: 'ä',
		aring: 'å',
		aelig: 'æ',
		ccedil: 'ç',
		egrave: 'è',
		eacute: 'é',
		ecirc: 'ê',
		euml: 'ë',
		igrave: 'ì',
		iacute: 'í',
		icirc: 'î',
		iuml: 'ï',
		eth: 'ð',
		ntilde: 'ñ',
		ograve: 'ò',
		oacute: 'ó',
		ocirc: 'ô',
		otilde: 'õ',
		ouml: 'ö',
		divide: '÷',
		oslash: 'ø',
		ugrave: 'ù',
		uacute: 'ú',
		ucirc: 'û',
		uuml: 'ü',
		yacute: 'ý',
		thorn: 'þ',
		yuml: 'ÿ',
		OElig: 'Œ',
		oelig: 'œ',
		Scaron: 'Š',
		scaron: 'š',
		Yuml: 'Ÿ',
		fnof: 'ƒ',
		circ: 'ˆ',
		tilde: '˜',
		Alpha: 'Α',
		Beta: 'Β',
		Gamma: 'Γ',
		Delta: 'Δ',
		Epsilon: 'Ε',
		Zeta: 'Ζ',
		Eta: 'Η',
		Theta: 'Θ',
		Iota: 'Ι',
		Kappa: 'Κ',
		Lambda: 'Λ',
		Mu: 'Μ',
		Nu: 'Ν',
		Xi: 'Ξ',
		Omicron: 'Ο',
		Pi: 'Π',
		Rho: 'Ρ',
		Sigma: 'Σ',
		Tau: 'Τ',
		Upsilon: 'Υ',
		Phi: 'Φ',
		Chi: 'Χ',
		Psi: 'Ψ',
		Omega: 'Ω',
		alpha: 'α',
		beta: 'β',
		gamma: 'γ',
		delta: 'δ',
		epsilon: 'ε',
		zeta: 'ζ',
		eta: 'η',
		theta: 'θ',
		iota: 'ι',
		kappa: 'κ',
		lambda: 'λ',
		mu: 'μ',
		nu: 'ν',
		xi: 'ξ',
		omicron: 'ο',
		pi: 'π',
		rho: 'ρ',
		sigmaf: 'ς',
		sigma: 'σ',
		tau: 'τ',
		upsilon: 'υ',
		phi: 'φ',
		chi: 'χ',
		psi: 'ψ',
		omega: 'ω',
		thetasym: 'ϑ',
		upsih: 'ϒ',
		piv: 'ϖ',
		ensp: ' ',
		emsp: ' ',
		thinsp: ' ',
		zwnj: '‌',
		zwj: '‍',
		lrm: '‎',
		rlm: '‏',
		ndash: '–',
		mdash: '—',
		lsquo: '‘',
		rsquo: '’',
		sbquo: '‚',
		ldquo: '“',
		rdquo: '”',
		bdquo: '„',
		dagger: '†',
		Dagger: '‡',
		bull: '•',
		hellip: '…',
		permil: '‰',
		prime: '′',
		Prime: '″',
		lsaquo: '‹',
		rsaquo: '›',
		oline: '‾',
		frasl: '⁄',
		euro: '€',
		image: 'ℑ',
		weierp: '℘',
		real: 'ℜ',
		trade: '™',
		alefsym: 'ℵ',
		larr: '←',
		uarr: '↑',
		rarr: '→',
		darr: '↓',
		harr: '↔',
		crarr: '↵',
		lArr: '⇐',
		uArr: '⇑',
		rArr: '⇒',
		dArr: '⇓',
		hArr: '⇔',
		forall: '∀',
		part: '∂',
		exist: '∃',
		empty: '∅',
		nabla: '∇',
		isin: '∈',
		notin: '∉',
		ni: '∋',
		prod: '∏',
		sum: '∑',
		minus: '−',
		lowast: '∗',
		radic: '√',
		prop: '∝',
		infin: '∞',
		ang: '∠',
		and: '∧',
		or: '∨',
		cap: '∩',
		cup: '∪',
		int: '∫',
		there4: '∴',
		sim: '∼',
		cong: '≅',
		asymp: '≈',
		ne: '≠',
		equiv: '≡',
		le: '≤',
		ge: '≥',
		sub: '⊂',
		sup: '⊃',
		nsub: '⊄',
		sube: '⊆',
		supe: '⊇',
		oplus: '⊕',
		otimes: '⊗',
		perp: '⊥',
		sdot: '⋅',
		lceil: '⌈',
		rceil: '⌉',
		lfloor: '⌊',
		rfloor: '⌋',
		lang: '〈',
		rang: '〉',
		loz: '◊',
		spades: '♠',
		clubs: '♣',
		hearts: '♥',
		diams: '♦',
	},
	JsxErrors = ParseErrorEnum`jsx`({
		AttributeIsEmpty: 'JSX attributes must only be assigned a non-empty expression.',
		MissingClosingTagElement: ({ openingTagName: e }) => `Expected corresponding JSX closing tag for <${e}>.`,
		MissingClosingTagFragment: 'Expected corresponding JSX closing tag for <>.',
		UnexpectedSequenceExpression: 'Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?',
		UnexpectedToken: ({ unexpected: e, HTMLEntity: t }) => `Unexpected token \`${e}\`. Did you mean \`${t}\` or \`{'${e}'}\`?`,
		UnsupportedJsxValue: 'JSX value should be either an expression or a quoted JSX text.',
		UnterminatedJsxContent: 'Unterminated JSX contents.',
		UnwrappedAdjacentJSXElements: 'Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?',
	});
function isFragment(e) {
	return !!e && ('JSXOpeningFragment' === e.type || 'JSXClosingFragment' === e.type);
}
function getQualifiedJSXName(e) {
	if ('JSXIdentifier' === e.type) return e.name;
	if ('JSXNamespacedName' === e.type) return e.namespace.name + ':' + e.name.name;
	if ('JSXMemberExpression' === e.type) return getQualifiedJSXName(e.object) + '.' + getQualifiedJSXName(e.property);
	throw new Error('Node had unexpected type: ' + e.type);
}
var jsx = (e) =>
	class extends e {
		jsxReadToken() {
			let e = '',
				t = this.state.pos;
			for (;;) {
				if (this.state.pos >= this.length) throw this.raise(JsxErrors.UnterminatedJsxContent, { at: this.state.startLoc });
				const s = this.input.charCodeAt(this.state.pos);
				switch (s) {
					case 60:
					case 123:
						return this.state.pos === this.state.start ? void (60 === s && this.state.canStartJSXElement ? (++this.state.pos, this.finishToken(140)) : super.getTokenFromCode(s)) : ((e += this.input.slice(t, this.state.pos)), void this.finishToken(139, e));
					case 38:
						(e += this.input.slice(t, this.state.pos)), (e += this.jsxReadEntity()), (t = this.state.pos);
						break;
					default:
						isNewLine(s) ? ((e += this.input.slice(t, this.state.pos)), (e += this.jsxReadNewLine(!0)), (t = this.state.pos)) : ++this.state.pos;
				}
			}
		}
		jsxReadNewLine(e) {
			const t = this.input.charCodeAt(this.state.pos);
			let s;
			return ++this.state.pos, 13 === t && 10 === this.input.charCodeAt(this.state.pos) ? (++this.state.pos, (s = e ? '\n' : '\r\n')) : (s = String.fromCharCode(t)), ++this.state.curLine, (this.state.lineStart = this.state.pos), s;
		}
		jsxReadString(e) {
			let t = '',
				s = ++this.state.pos;
			for (;;) {
				if (this.state.pos >= this.length) throw this.raise(Errors.UnterminatedString, { at: this.state.startLoc });
				const r = this.input.charCodeAt(this.state.pos);
				if (r === e) break;
				38 === r ? ((t += this.input.slice(s, this.state.pos)), (t += this.jsxReadEntity()), (s = this.state.pos)) : isNewLine(r) ? ((t += this.input.slice(s, this.state.pos)), (t += this.jsxReadNewLine(!1)), (s = this.state.pos)) : ++this.state.pos;
			}
			(t += this.input.slice(s, this.state.pos++)), this.finishToken(131, t);
		}
		jsxReadEntity() {
			const e = ++this.state.pos;
			if (35 === this.codePointAtPos(this.state.pos)) {
				++this.state.pos;
				let e = 10;
				120 === this.codePointAtPos(this.state.pos) && ((e = 16), ++this.state.pos);
				const t = this.readInt(e, void 0, !1, 'bail');
				if (null !== t && 59 === this.codePointAtPos(this.state.pos)) return ++this.state.pos, String.fromCodePoint(t);
			} else {
				let t = 0,
					s = !1;
				for (; t++ < 10 && this.state.pos < this.length && !(s = 59 == this.codePointAtPos(this.state.pos)); ) ++this.state.pos;
				if (s) {
					const t = this.input.slice(e, this.state.pos),
						s = entities[t];
					if ((++this.state.pos, s)) return s;
				}
			}
			return (this.state.pos = e), '&';
		}
		jsxReadWord() {
			let e;
			const t = this.state.pos;
			do {
				e = this.input.charCodeAt(++this.state.pos);
			} while (isIdentifierChar(e) || 45 === e);
			this.finishToken(138, this.input.slice(t, this.state.pos));
		}
		jsxParseIdentifier() {
			const e = this.startNode();
			return this.match(138) ? (e.name = this.state.value) : tokenIsKeyword(this.state.type) ? (e.name = tokenLabelName(this.state.type)) : this.unexpected(), this.next(), this.finishNode(e, 'JSXIdentifier');
		}
		jsxParseNamespacedName() {
			const e = this.state.startLoc,
				t = this.jsxParseIdentifier();
			if (!this.eat(14)) return t;
			const s = this.startNodeAt(e);
			return (s.namespace = t), (s.name = this.jsxParseIdentifier()), this.finishNode(s, 'JSXNamespacedName');
		}
		jsxParseElementName() {
			const e = this.state.startLoc;
			let t = this.jsxParseNamespacedName();
			if ('JSXNamespacedName' === t.type) return t;
			for (; this.eat(16); ) {
				const s = this.startNodeAt(e);
				(s.object = t), (s.property = this.jsxParseIdentifier()), (t = this.finishNode(s, 'JSXMemberExpression'));
			}
			return t;
		}
		jsxParseAttributeValue() {
			let e;
			switch (this.state.type) {
				case 5:
					return (e = this.startNode()), this.setContext(types.brace), this.next(), (e = this.jsxParseExpressionContainer(e, types.j_oTag)), 'JSXEmptyExpression' === e.expression.type && this.raise(JsxErrors.AttributeIsEmpty, { at: e }), e;
				case 140:
				case 131:
					return this.parseExprAtom();
				default:
					throw this.raise(JsxErrors.UnsupportedJsxValue, { at: this.state.startLoc });
			}
		}
		jsxParseEmptyExpression() {
			const e = this.startNodeAt(this.state.lastTokEndLoc);
			return this.finishNodeAt(e, 'JSXEmptyExpression', this.state.startLoc);
		}
		jsxParseSpreadChild(e) {
			return this.next(), (e.expression = this.parseExpression()), this.setContext(types.j_expr), (this.state.canStartJSXElement = !0), this.expect(8), this.finishNode(e, 'JSXSpreadChild');
		}
		jsxParseExpressionContainer(e, t) {
			if (this.match(8)) e.expression = this.jsxParseEmptyExpression();
			else {
				const t = this.parseExpression();
				e.expression = t;
			}
			return this.setContext(t), (this.state.canStartJSXElement = !0), this.expect(8), this.finishNode(e, 'JSXExpressionContainer');
		}
		jsxParseAttribute() {
			const e = this.startNode();
			return this.match(5) ? (this.setContext(types.brace), this.next(), this.expect(21), (e.argument = this.parseMaybeAssignAllowIn()), this.setContext(types.j_oTag), (this.state.canStartJSXElement = !0), this.expect(8), this.finishNode(e, 'JSXSpreadAttribute')) : ((e.name = this.jsxParseNamespacedName()), (e.value = this.eat(29) ? this.jsxParseAttributeValue() : null), this.finishNode(e, 'JSXAttribute'));
		}
		jsxParseOpeningElementAt(e) {
			const t = this.startNodeAt(e);
			return this.eat(141) ? this.finishNode(t, 'JSXOpeningFragment') : ((t.name = this.jsxParseElementName()), this.jsxParseOpeningElementAfterName(t));
		}
		jsxParseOpeningElementAfterName(e) {
			const t = [];
			for (; !this.match(56) && !this.match(141); ) t.push(this.jsxParseAttribute());
			return (e.attributes = t), (e.selfClosing = this.eat(56)), this.expect(141), this.finishNode(e, 'JSXOpeningElement');
		}
		jsxParseClosingElementAt(e) {
			const t = this.startNodeAt(e);
			return this.eat(141) ? this.finishNode(t, 'JSXClosingFragment') : ((t.name = this.jsxParseElementName()), this.expect(141), this.finishNode(t, 'JSXClosingElement'));
		}
		jsxParseElementAt(e) {
			const t = this.startNodeAt(e),
				s = [],
				r = this.jsxParseOpeningElementAt(e);
			let i = null;
			if (!r.selfClosing) {
				e: for (;;)
					switch (this.state.type) {
						case 140:
							if (((e = this.state.startLoc), this.next(), this.eat(56))) {
								i = this.jsxParseClosingElementAt(e);
								break e;
							}
							s.push(this.jsxParseElementAt(e));
							break;
						case 139:
							s.push(this.parseExprAtom());
							break;
						case 5: {
							const e = this.startNode();
							this.setContext(types.brace), this.next(), this.match(21) ? s.push(this.jsxParseSpreadChild(e)) : s.push(this.jsxParseExpressionContainer(e, types.j_expr));
							break;
						}
						default:
							this.unexpected();
					}
				isFragment(r) && !isFragment(i) && null !== i ? this.raise(JsxErrors.MissingClosingTagFragment, { at: i }) : !isFragment(r) && isFragment(i) ? this.raise(JsxErrors.MissingClosingTagElement, { at: i, openingTagName: getQualifiedJSXName(r.name) }) : isFragment(r) || isFragment(i) || (getQualifiedJSXName(i.name) !== getQualifiedJSXName(r.name) && this.raise(JsxErrors.MissingClosingTagElement, { at: i, openingTagName: getQualifiedJSXName(r.name) }));
			}
			if ((isFragment(r) ? ((t.openingFragment = r), (t.closingFragment = i)) : ((t.openingElement = r), (t.closingElement = i)), (t.children = s), this.match(47))) throw this.raise(JsxErrors.UnwrappedAdjacentJSXElements, { at: this.state.startLoc });
			return isFragment(r) ? this.finishNode(t, 'JSXFragment') : this.finishNode(t, 'JSXElement');
		}
		jsxParseElement() {
			const e = this.state.startLoc;
			return this.next(), this.jsxParseElementAt(e);
		}
		setContext(e) {
			const { context: t } = this.state;
			t[t.length - 1] = e;
		}
		parseExprAtom(e) {
			return this.match(139) ? this.parseLiteral(this.state.value, 'JSXText') : this.match(140) ? this.jsxParseElement() : this.match(47) && 33 !== this.input.charCodeAt(this.state.pos) ? (this.replaceToken(140), this.jsxParseElement()) : super.parseExprAtom(e);
		}
		skipSpace() {
			this.curContext().preserveSpace || super.skipSpace();
		}
		getTokenFromCode(e) {
			const t = this.curContext();
			if (t !== types.j_expr) {
				if (t === types.j_oTag || t === types.j_cTag) {
					if (isIdentifierStart(e)) return void this.jsxReadWord();
					if (62 === e) return ++this.state.pos, void this.finishToken(141);
					if ((34 === e || 39 === e) && t === types.j_oTag) return void this.jsxReadString(e);
				}
				if (60 === e && this.state.canStartJSXElement && 33 !== this.input.charCodeAt(this.state.pos + 1)) return ++this.state.pos, void this.finishToken(140);
				super.getTokenFromCode(e);
			} else this.jsxReadToken();
		}
		updateContext(e) {
			const { context: t, type: s } = this.state;
			if (56 === s && 140 === e) t.splice(-2, 2, types.j_cTag), (this.state.canStartJSXElement = !1);
			else if (140 === s) t.push(types.j_oTag);
			else if (141 === s) {
				const s = t[t.length - 1];
				(s === types.j_oTag && 56 === e) || s === types.j_cTag ? (t.pop(), (this.state.canStartJSXElement = t[t.length - 1] === types.j_expr)) : (this.setContext(types.j_expr), (this.state.canStartJSXElement = !0));
			} else this.state.canStartJSXElement = tokenComesBeforeExpression(s);
		}
	};
class TypeScriptScope extends Scope {
	constructor(...e) {
		super(...e), (this.types = new Set()), (this.enums = new Set()), (this.constEnums = new Set()), (this.classes = new Set()), (this.exportOnlyBindings = new Set());
	}
}
class TypeScriptScopeHandler extends ScopeHandler {
	constructor(...e) {
		super(...e), (this.importsStack = []);
	}
	createScope(e) {
		return this.importsStack.push(new Set()), new TypeScriptScope(e);
	}
	enter(e) {
		256 == e && this.importsStack.push(new Set()), super.enter(e);
	}
	exit() {
		const e = super.exit();
		return 256 == e && this.importsStack.pop(), e;
	}
	hasImport(e, t) {
		const s = this.importsStack.length;
		if (this.importsStack[s - 1].has(e)) return !0;
		if (!t && s > 1) for (let t = 0; t < s - 1; t++) if (this.importsStack[t].has(e)) return !0;
		return !1;
	}
	declareName(e, t, s) {
		if (4096 & t) return this.hasImport(e, !0) && this.parser.raise(Errors.VarRedeclaration, { at: s, identifierName: e }), void this.importsStack[this.importsStack.length - 1].add(e);
		const r = this.currentScope();
		if (1024 & t) return this.maybeExportDefined(r, e), void r.exportOnlyBindings.add(e);
		super.declareName(e, t, s), 2 & t && (1 & t || (this.checkRedeclarationInScope(r, e, t, s), this.maybeExportDefined(r, e)), r.types.add(e)), 256 & t && r.enums.add(e), 512 & t && r.constEnums.add(e), 128 & t && r.classes.add(e);
	}
	isRedeclaredInScope(e, t, s) {
		if (e.enums.has(t)) {
			if (256 & s) {
				return !!(512 & s) !== e.constEnums.has(t);
			}
			return !0;
		}
		return 128 & s && e.classes.has(t) ? !!e.lexical.has(t) && !!(1 & s) : !!(2 & s && e.types.has(t)) || super.isRedeclaredInScope(e, t, s);
	}
	checkLocalExport(e) {
		const { name: t } = e;
		if (this.hasImport(t)) return;
		for (let e = this.scopeStack.length - 1; e >= 0; e--) {
			const s = this.scopeStack[e];
			if (s.types.has(t) || s.exportOnlyBindings.has(t)) return;
		}
		super.checkLocalExport(e);
	}
}
const getOwn$1 = (e, t) => Object.hasOwnProperty.call(e, t) && e[t],
	unwrapParenthesizedExpression = (e) => ('ParenthesizedExpression' === e.type ? unwrapParenthesizedExpression(e.expression) : e);
class LValParser extends NodeUtils {
	toAssignable(e, t = !1) {
		var s, r;
		let i;
		switch ((('ParenthesizedExpression' === e.type || (null != (s = e.extra) && s.parenthesized)) && ((i = unwrapParenthesizedExpression(e)), t ? ('Identifier' === i.type ? this.expressionScope.recordArrowParameterBindingError(Errors.InvalidParenthesizedAssignment, { at: e }) : 'MemberExpression' !== i.type && this.raise(Errors.InvalidParenthesizedAssignment, { at: e })) : this.raise(Errors.InvalidParenthesizedAssignment, { at: e })), e.type)) {
			case 'Identifier':
			case 'ObjectPattern':
			case 'ArrayPattern':
			case 'AssignmentPattern':
			case 'RestElement':
				break;
			case 'ObjectExpression':
				e.type = 'ObjectPattern';
				for (let s = 0, r = e.properties.length, i = r - 1; s < r; s++) {
					var a;
					const r = e.properties[s],
						n = s === i;
					this.toAssignableObjectExpressionProp(r, n, t), n && 'RestElement' === r.type && null != (a = e.extra) && a.trailingCommaLoc && this.raise(Errors.RestTrailingComma, { at: e.extra.trailingCommaLoc });
				}
				break;
			case 'ObjectProperty': {
				const { key: s, value: r } = e;
				this.isPrivateName(s) && this.classScope.usePrivateName(this.getPrivateNameSV(s), s.loc.start), this.toAssignable(r, t);
				break;
			}
			case 'SpreadElement':
				throw new Error("Internal @babel/parser error (this is a bug, please report it). SpreadElement should be converted by .toAssignable's caller.");
			case 'ArrayExpression':
				(e.type = 'ArrayPattern'), this.toAssignableList(e.elements, null == (r = e.extra) ? void 0 : r.trailingCommaLoc, t);
				break;
			case 'AssignmentExpression':
				'=' !== e.operator && this.raise(Errors.MissingEqInAssignment, { at: e.left.loc.end }), (e.type = 'AssignmentPattern'), delete e.operator, this.toAssignable(e.left, t);
				break;
			case 'ParenthesizedExpression':
				this.toAssignable(i, t);
		}
	}
	toAssignableObjectExpressionProp(e, t, s) {
		if ('ObjectMethod' === e.type) this.raise('get' === e.kind || 'set' === e.kind ? Errors.PatternHasAccessor : Errors.PatternHasMethod, { at: e.key });
		else if ('SpreadElement' === e.type) {
			e.type = 'RestElement';
			const r = e.argument;
			this.checkToRestConversion(r, !1), this.toAssignable(r, s), t || this.raise(Errors.RestTrailingComma, { at: e });
		} else this.toAssignable(e, s);
	}
	toAssignableList(e, t, s) {
		const r = e.length - 1;
		for (let i = 0; i <= r; i++) {
			const a = e[i];
			if (a) {
				if ('SpreadElement' === a.type) {
					a.type = 'RestElement';
					const e = a.argument;
					this.checkToRestConversion(e, !0), this.toAssignable(e, s);
				} else this.toAssignable(a, s);
				'RestElement' === a.type && (i < r ? this.raise(Errors.RestTrailingComma, { at: a }) : t && this.raise(Errors.RestTrailingComma, { at: t }));
			}
		}
	}
	isAssignable(e, t) {
		switch (e.type) {
			case 'Identifier':
			case 'ObjectPattern':
			case 'ArrayPattern':
			case 'AssignmentPattern':
			case 'RestElement':
				return !0;
			case 'ObjectExpression': {
				const t = e.properties.length - 1;
				return e.properties.every((e, s) => 'ObjectMethod' !== e.type && (s === t || 'SpreadElement' !== e.type) && this.isAssignable(e));
			}
			case 'ObjectProperty':
				return this.isAssignable(e.value);
			case 'SpreadElement':
				return this.isAssignable(e.argument);
			case 'ArrayExpression':
				return e.elements.every((e) => null === e || this.isAssignable(e));
			case 'AssignmentExpression':
				return '=' === e.operator;
			case 'ParenthesizedExpression':
				return this.isAssignable(e.expression);
			case 'MemberExpression':
			case 'OptionalMemberExpression':
				return !t;
			default:
				return !1;
		}
	}
	toReferencedList(e, t) {
		return e;
	}
	toReferencedListDeep(e, t) {
		this.toReferencedList(e, t);
		for (const t of e) 'ArrayExpression' === (null == t ? void 0 : t.type) && this.toReferencedListDeep(t.elements);
	}
	parseSpread(e) {
		const t = this.startNode();
		return this.next(), (t.argument = this.parseMaybeAssignAllowIn(e, void 0)), this.finishNode(t, 'SpreadElement');
	}
	parseRestBinding() {
		const e = this.startNode();
		return this.next(), (e.argument = this.parseBindingAtom()), this.finishNode(e, 'RestElement');
	}
	parseBindingAtom() {
		switch (this.state.type) {
			case 0: {
				const e = this.startNode();
				return this.next(), (e.elements = this.parseBindingList(3, 93, 1)), this.finishNode(e, 'ArrayPattern');
			}
			case 5:
				return this.parseObjectLike(8, !0);
		}
		return this.parseIdentifier();
	}
	parseBindingList(e, t, s) {
		const r = 1 & s,
			i = [];
		let a = !0;
		for (; !this.eat(e); )
			if ((a ? (a = !1) : this.expect(12), r && this.match(12))) i.push(null);
			else {
				if (this.eat(e)) break;
				if (this.match(21)) {
					if ((i.push(this.parseAssignableListItemTypes(this.parseRestBinding(), s)), !this.checkCommaAfterRest(t))) {
						this.expect(e);
						break;
					}
				} else {
					const e = [];
					for (this.match(26) && this.hasPlugin('decorators') && this.raise(Errors.UnsupportedParameterDecorator, { at: this.state.startLoc }); this.match(26); ) e.push(this.parseDecorator());
					i.push(this.parseAssignableListItem(s, e));
				}
			}
		return i;
	}
	parseBindingRestProperty(e) {
		return this.next(), (e.argument = this.parseIdentifier()), this.checkCommaAfterRest(125), this.finishNode(e, 'RestElement');
	}
	parseBindingProperty() {
		const e = this.startNode(),
			{ type: t, startLoc: s } = this.state;
		return 21 === t ? this.parseBindingRestProperty(e) : (136 === t ? (this.expectPlugin('destructuringPrivate', s), this.classScope.usePrivateName(this.state.value, s), (e.key = this.parsePrivateName())) : this.parsePropertyName(e), (e.method = !1), this.parseObjPropValue(e, s, !1, !1, !0, !1));
	}
	parseAssignableListItem(e, t) {
		const s = this.parseMaybeDefault();
		this.parseAssignableListItemTypes(s, e);
		const r = this.parseMaybeDefault(s.loc.start, s);
		return t.length && (s.decorators = t), r;
	}
	parseAssignableListItemTypes(e, t) {
		return e;
	}
	parseMaybeDefault(e, t) {
		var s;
		if ((null != e || (e = this.state.startLoc), (t = null != (s = t) ? s : this.parseBindingAtom()), !this.eat(29))) return t;
		const r = this.startNodeAt(e);
		return (r.left = t), (r.right = this.parseMaybeAssignAllowIn()), this.finishNode(r, 'AssignmentPattern');
	}
	isValidLVal(e, t, s) {
		return (r = { AssignmentPattern: 'left', RestElement: 'argument', ObjectProperty: 'value', ParenthesizedExpression: 'expression', ArrayPattern: 'elements', ObjectPattern: 'properties' }), (i = e), Object.hasOwnProperty.call(r, i) && r[i];
		var r, i;
	}
	checkLVal(e, { in: t, binding: s = 64, checkClashes: r = !1, strictModeChanged: i = !1, hasParenthesizedAncestor: a = !1 }) {
		var n;
		const o = e.type;
		if (this.isObjectMethod(e)) return;
		if ('MemberExpression' === o) return void (64 !== s && this.raise(Errors.InvalidPropertyBindingPattern, { at: e }));
		if ('Identifier' === o) {
			this.checkIdentifier(e, s, i);
			const { name: t } = e;
			return void (r && (r.has(t) ? this.raise(Errors.ParamDupe, { at: e }) : r.add(t)));
		}
		const h = this.isValidLVal(o, !(a || (null != (n = e.extra) && n.parenthesized)) && 'AssignmentExpression' === t.type, s);
		if (!0 === h) return;
		if (!1 === h) {
			const r = 64 === s ? Errors.InvalidLhs : Errors.InvalidLhsBinding;
			return void this.raise(r, { at: e, ancestor: t });
		}
		const [p, c] = Array.isArray(h) ? h : [h, 'ParenthesizedExpression' === o],
			l = 'ArrayPattern' === o || 'ObjectPattern' === o || 'ParenthesizedExpression' === o ? { type: o } : t;
		for (const t of [].concat(e[p])) t && this.checkLVal(t, { in: l, binding: s, checkClashes: r, strictModeChanged: i, hasParenthesizedAncestor: c });
	}
	checkIdentifier(e, t, s = !1) {
		this.state.strict && (s ? isStrictBindReservedWord(e.name, this.inModule) : isStrictBindOnlyReservedWord(e.name)) && (64 === t ? this.raise(Errors.StrictEvalArguments, { at: e, referenceName: e.name }) : this.raise(Errors.StrictEvalArgumentsBinding, { at: e, bindingName: e.name })), 8192 & t && 'let' === e.name && this.raise(Errors.LetInLexicalBinding, { at: e }), 64 & t || this.declareNameFromIdentifier(e, t);
	}
	declareNameFromIdentifier(e, t) {
		this.scope.declareName(e.name, t, e.loc.start);
	}
	checkToRestConversion(e, t) {
		switch (e.type) {
			case 'ParenthesizedExpression':
				this.checkToRestConversion(e.expression, t);
				break;
			case 'Identifier':
			case 'MemberExpression':
				break;
			case 'ArrayExpression':
			case 'ObjectExpression':
				if (t) break;
			default:
				this.raise(Errors.InvalidRestAssignmentPattern, { at: e });
		}
	}
	checkCommaAfterRest(e) {
		return !!this.match(12) && (this.raise(this.lookaheadCharCode() === e ? Errors.RestTrailingComma : Errors.ElementAfterRest, { at: this.state.startLoc }), !0);
	}
}
const getOwn = (e, t) => Object.hasOwnProperty.call(e, t) && e[t];
function nonNull(e) {
	if (null == e) throw new Error(`Unexpected ${e} value.`);
	return e;
}
function assert(e) {
	if (!e) throw new Error('Assert fail');
}
const TSErrors = ParseErrorEnum`typescript`({
	AbstractMethodHasImplementation: ({ methodName: e }) => `Method '${e}' cannot have an implementation because it is marked abstract.`,
	AbstractPropertyHasInitializer: ({ propertyName: e }) => `Property '${e}' cannot have an initializer because it is marked abstract.`,
	AccesorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
	AccesorCannotHaveTypeParameters: 'An accessor cannot have type parameters.',
	AccessorCannotBeOptional: "An 'accessor' property cannot be declared optional.",
	ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
	ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
	ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
	ConstructorHasTypeParameters: 'Type parameters cannot appear on a constructor declaration.',
	DeclareAccessor: ({ kind: e }) => `'declare' is not allowed in ${e}ters.`,
	DeclareClassFieldHasInitializer: 'Initializers are not allowed in ambient contexts.',
	DeclareFunctionHasImplementation: 'An implementation cannot be declared in ambient contexts.',
	DuplicateAccessibilityModifier: ({ modifier: e }) => 'Accessibility modifier already seen.',
	DuplicateModifier: ({ modifier: e }) => `Duplicate modifier: '${e}'.`,
	EmptyHeritageClauseType: ({ token: e }) => `'${e}' list cannot be empty.`,
	EmptyTypeArguments: 'Type argument list cannot be empty.',
	EmptyTypeParameters: 'Type parameter list cannot be empty.',
	ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
	ImportAliasHasImportType: "An import alias can not use 'import type'.",
	ImportReflectionHasImportType: 'An `import module` declaration can not use `type` modifier',
	IncompatibleModifiers: ({ modifiers: e }) => `'${e[0]}' modifier cannot be used with '${e[1]}' modifier.`,
	IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
	IndexSignatureHasAccessibility: ({ modifier: e }) => `Index signatures cannot have an accessibility modifier ('${e}').`,
	IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
	IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
	IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
	InitializerNotAllowedInAmbientContext: 'Initializers are not allowed in ambient contexts.',
	InvalidModifierOnTypeMember: ({ modifier: e }) => `'${e}' modifier cannot appear on a type member.`,
	InvalidModifierOnTypeParameter: ({ modifier: e }) => `'${e}' modifier cannot appear on a type parameter.`,
	InvalidModifierOnTypeParameterPositions: ({ modifier: e }) => `'${e}' modifier can only appear on a type parameter of a class, interface or type alias.`,
	InvalidModifiersOrder: ({ orderedModifiers: e }) => `'${e[0]}' modifier must precede '${e[1]}' modifier.`,
	InvalidPropertyAccessAfterInstantiationExpression: 'Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.',
	InvalidTupleMemberLabel: 'Tuple members must be labeled with a simple identifier.',
	MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
	MixedLabeledAndUnlabeledElements: 'Tuple members must all have names or all not have names.',
	NonAbstractClassHasAbstractMethod: 'Abstract methods can only appear within an abstract class.',
	NonClassMethodPropertyHasAbstractModifer: "'abstract' modifier can only appear on a class, method, or property declaration.",
	OptionalTypeBeforeRequired: 'A required element cannot follow an optional element.',
	OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
	PatternIsOptional: 'A binding pattern parameter cannot be optional in an implementation signature.',
	PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
	PrivateElementHasAccessibility: ({ modifier: e }) => `Private elements cannot have an accessibility modifier ('${e}').`,
	ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
	ReservedArrowTypeParam: 'This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.',
	ReservedTypeAssertion: 'This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.',
	SetAccesorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
	SetAccesorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
	SetAccesorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
	SingleTypeParameterWithoutTrailingComma: ({ typeParameterName: e }) => `Single type parameter ${e} should have a trailing comma. Example usage: <${e},>.`,
	StaticBlockCannotHaveModifier: 'Static class blocks cannot have any modifier.',
	TupleOptionalAfterType: 'A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).',
	TypeAnnotationAfterAssign: 'Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.',
	TypeImportCannotSpecifyDefaultAndNamed: 'A type-only import can specify a default import or named bindings, but not both.',
	TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
	TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
	UnexpectedParameterModifier: 'A parameter property is only allowed in a constructor implementation.',
	UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
	UnexpectedTypeAnnotation: 'Did not expect a type annotation here.',
	UnexpectedTypeCastInParameter: 'Unexpected type cast in parameter position.',
	UnsupportedImportTypeArgument: 'Argument in a type import must be a string literal.',
	UnsupportedParameterPropertyKind: 'A parameter property may not be declared using a binding pattern.',
	UnsupportedSignatureParameterKind: ({ type: e }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${e}.`,
});
function keywordTypeFromName(e) {
	switch (e) {
		case 'any':
			return 'TSAnyKeyword';
		case 'boolean':
			return 'TSBooleanKeyword';
		case 'bigint':
			return 'TSBigIntKeyword';
		case 'never':
			return 'TSNeverKeyword';
		case 'number':
			return 'TSNumberKeyword';
		case 'object':
			return 'TSObjectKeyword';
		case 'string':
			return 'TSStringKeyword';
		case 'symbol':
			return 'TSSymbolKeyword';
		case 'undefined':
			return 'TSUndefinedKeyword';
		case 'unknown':
			return 'TSUnknownKeyword';
		default:
			return;
	}
}
function tsIsAccessModifier(e) {
	return 'private' === e || 'public' === e || 'protected' === e;
}
function tsIsVarianceAnnotations(e) {
	return 'in' === e || 'out' === e;
}
var typescript = (e) =>
	class extends e {
		constructor(...e) {
			super(...e),
				(this.tsParseInOutModifiers = this.tsParseModifiers.bind(this, { allowedModifiers: ['in', 'out'], disallowedModifiers: ['const', 'public', 'private', 'protected', 'readonly', 'declare', 'abstract', 'override'], errorTemplate: TSErrors.InvalidModifierOnTypeParameter })),
				(this.tsParseConstModifier = this.tsParseModifiers.bind(this, { allowedModifiers: ['const'], disallowedModifiers: ['in', 'out'], errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions })),
				(this.tsParseInOutConstModifiers = this.tsParseModifiers.bind(this, { allowedModifiers: ['in', 'out', 'const'], disallowedModifiers: ['public', 'private', 'protected', 'readonly', 'declare', 'abstract', 'override'], errorTemplate: TSErrors.InvalidModifierOnTypeParameter }));
		}
		getScopeHandler() {
			return TypeScriptScopeHandler;
		}
		tsIsIdentifier() {
			return tokenIsIdentifier(this.state.type);
		}
		tsTokenCanFollowModifier() {
			return (this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(136) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
		}
		tsNextTokenCanFollowModifier() {
			return this.next(), this.tsTokenCanFollowModifier();
		}
		tsParseModifier(e, t) {
			if (!tokenIsIdentifier(this.state.type) && 58 !== this.state.type && 75 !== this.state.type) return;
			const s = this.state.value;
			if (-1 !== e.indexOf(s)) {
				if (t && this.tsIsStartOfStaticBlocks()) return;
				if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) return s;
			}
		}
		tsParseModifiers({ allowedModifiers: e, disallowedModifiers: t, stopOnStartOfClassStaticBlock: s, errorTemplate: r = TSErrors.InvalidModifierOnTypeMember }, i) {
			const a = (e, t, s, r) => {
					t === s && i[r] && this.raise(TSErrors.InvalidModifiersOrder, { at: e, orderedModifiers: [s, r] });
				},
				n = (e, t, s, r) => {
					((i[s] && t === r) || (i[r] && t === s)) && this.raise(TSErrors.IncompatibleModifiers, { at: e, modifiers: [s, r] });
				};
			for (;;) {
				const { startLoc: o } = this.state,
					h = this.tsParseModifier(e.concat(null != t ? t : []), s);
				if (!h) break;
				tsIsAccessModifier(h)
					? i.accessibility
						? this.raise(TSErrors.DuplicateAccessibilityModifier, { at: o, modifier: h })
						: (a(o, h, h, 'override'), a(o, h, h, 'static'), a(o, h, h, 'readonly'), (i.accessibility = h))
					: tsIsVarianceAnnotations(h)
					? (i[h] && this.raise(TSErrors.DuplicateModifier, { at: o, modifier: h }), (i[h] = !0), a(o, h, 'in', 'out'))
					: (Object.hasOwnProperty.call(i, h) ? this.raise(TSErrors.DuplicateModifier, { at: o, modifier: h }) : (a(o, h, 'static', 'readonly'), a(o, h, 'static', 'override'), a(o, h, 'override', 'readonly'), a(o, h, 'abstract', 'override'), n(o, h, 'declare', 'override'), n(o, h, 'static', 'abstract')), (i[h] = !0)),
					null != t && t.includes(h) && this.raise(r, { at: o, modifier: h });
			}
		}
		tsIsListTerminator(e) {
			switch (e) {
				case 'EnumMembers':
				case 'TypeMembers':
					return this.match(8);
				case 'HeritageClauseElement':
					return this.match(5);
				case 'TupleElementTypes':
					return this.match(3);
				case 'TypeParametersOrArguments':
					return this.match(48);
			}
		}
		tsParseList(e, t) {
			const s = [];
			for (; !this.tsIsListTerminator(e); ) s.push(t());
			return s;
		}
		tsParseDelimitedList(e, t, s) {
			return nonNull(this.tsParseDelimitedListWorker(e, t, !0, s));
		}
		tsParseDelimitedListWorker(e, t, s, r) {
			const i = [];
			let a = -1;
			for (; !this.tsIsListTerminator(e); ) {
				a = -1;
				const r = t();
				if (null == r) return;
				if ((i.push(r), !this.eat(12))) {
					if (this.tsIsListTerminator(e)) break;
					return void (s && this.expect(12));
				}
				a = this.state.lastTokStart;
			}
			return r && (r.value = a), i;
		}
		tsParseBracketedList(e, t, s, r, i) {
			r || (s ? this.expect(0) : this.expect(47));
			const a = this.tsParseDelimitedList(e, t, i);
			return s ? this.expect(3) : this.expect(48), a;
		}
		tsParseImportType() {
			const e = this.startNode();
			return this.expect(83), this.expect(10), this.match(131) || this.raise(TSErrors.UnsupportedImportTypeArgument, { at: this.state.startLoc }), (e.argument = super.parseExprAtom()), this.expect(11), this.eat(16) && (e.qualifier = this.tsParseEntityName()), this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, 'TSImportType');
		}
		tsParseEntityName(e = !0) {
			let t = this.parseIdentifier(e);
			for (; this.eat(16); ) {
				const s = this.startNodeAtNode(t);
				(s.left = t), (s.right = this.parseIdentifier(e)), (t = this.finishNode(s, 'TSQualifiedName'));
			}
			return t;
		}
		tsParseTypeReference() {
			const e = this.startNode();
			return (e.typeName = this.tsParseEntityName()), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, 'TSTypeReference');
		}
		tsParseThisTypePredicate(e) {
			this.next();
			const t = this.startNodeAtNode(e);
			return (t.parameterName = e), (t.typeAnnotation = this.tsParseTypeAnnotation(!1)), (t.asserts = !1), this.finishNode(t, 'TSTypePredicate');
		}
		tsParseThisTypeNode() {
			const e = this.startNode();
			return this.next(), this.finishNode(e, 'TSThisType');
		}
		tsParseTypeQuery() {
			const e = this.startNode();
			return this.expect(87), this.match(83) ? (e.exprName = this.tsParseImportType()) : (e.exprName = this.tsParseEntityName()), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, 'TSTypeQuery');
		}
		tsParseTypeParameter(e) {
			const t = this.startNode();
			return e(t), (t.name = this.tsParseTypeParameterName()), (t.constraint = this.tsEatThenParseType(81)), (t.default = this.tsEatThenParseType(29)), this.finishNode(t, 'TSTypeParameter');
		}
		tsTryParseTypeParameters(e) {
			if (this.match(47)) return this.tsParseTypeParameters(e);
		}
		tsParseTypeParameters(e) {
			const t = this.startNode();
			this.match(47) || this.match(140) ? this.next() : this.unexpected();
			const s = { value: -1 };
			return (t.params = this.tsParseBracketedList('TypeParametersOrArguments', this.tsParseTypeParameter.bind(this, e), !1, !0, s)), 0 === t.params.length && this.raise(TSErrors.EmptyTypeParameters, { at: t }), -1 !== s.value && this.addExtra(t, 'trailingComma', s.value), this.finishNode(t, 'TSTypeParameterDeclaration');
		}
		tsFillSignature(e, t) {
			const s = 19 === e,
				r = 'typeAnnotation';
			(t.typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier)), this.expect(10), (t.parameters = this.tsParseBindingListForSignature()), (s || this.match(e)) && (t[r] = this.tsParseTypeOrTypePredicateAnnotation(e));
		}
		tsParseBindingListForSignature() {
			const e = super.parseBindingList(11, 41, 2);
			for (const t of e) {
				const { type: e } = t;
				('AssignmentPattern' !== e && 'TSParameterProperty' !== e) || this.raise(TSErrors.UnsupportedSignatureParameterKind, { at: t, type: e });
			}
			return e;
		}
		tsParseTypeMemberSemicolon() {
			this.eat(12) || this.isLineTerminator() || this.expect(13);
		}
		tsParseSignatureMember(e, t) {
			return this.tsFillSignature(14, t), this.tsParseTypeMemberSemicolon(), this.finishNode(t, e);
		}
		tsIsUnambiguouslyIndexSignature() {
			return this.next(), !!tokenIsIdentifier(this.state.type) && (this.next(), this.match(14));
		}
		tsTryParseIndexSignature(e) {
			if (!this.match(0) || !this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))) return;
			this.expect(0);
			const t = this.parseIdentifier();
			(t.typeAnnotation = this.tsParseTypeAnnotation()), this.resetEndLocation(t), this.expect(3), (e.parameters = [t]);
			const s = this.tsTryParseTypeAnnotation();
			return s && (e.typeAnnotation = s), this.tsParseTypeMemberSemicolon(), this.finishNode(e, 'TSIndexSignature');
		}
		tsParsePropertyOrMethodSignature(e, t) {
			this.eat(17) && (e.optional = !0);
			const s = e;
			if (this.match(10) || this.match(47)) {
				t && this.raise(TSErrors.ReadonlyForMethodSignature, { at: e });
				const r = s;
				r.kind && this.match(47) && this.raise(TSErrors.AccesorCannotHaveTypeParameters, { at: this.state.curPosition() }), this.tsFillSignature(14, r), this.tsParseTypeMemberSemicolon();
				const i = 'parameters',
					a = 'typeAnnotation';
				if ('get' === r.kind) r[i].length > 0 && (this.raise(Errors.BadGetterArity, { at: this.state.curPosition() }), this.isThisParam(r[i][0]) && this.raise(TSErrors.AccesorCannotDeclareThisParameter, { at: this.state.curPosition() }));
				else if ('set' === r.kind) {
					if (1 !== r[i].length) this.raise(Errors.BadSetterArity, { at: this.state.curPosition() });
					else {
						const e = r[i][0];
						this.isThisParam(e) && this.raise(TSErrors.AccesorCannotDeclareThisParameter, { at: this.state.curPosition() }), 'Identifier' === e.type && e.optional && this.raise(TSErrors.SetAccesorCannotHaveOptionalParameter, { at: this.state.curPosition() }), 'RestElement' === e.type && this.raise(TSErrors.SetAccesorCannotHaveRestParameter, { at: this.state.curPosition() });
					}
					r[a] && this.raise(TSErrors.SetAccesorCannotHaveReturnType, { at: r[a] });
				} else r.kind = 'method';
				return this.finishNode(r, 'TSMethodSignature');
			}
			{
				const e = s;
				t && (e.readonly = !0);
				const r = this.tsTryParseTypeAnnotation();
				return r && (e.typeAnnotation = r), this.tsParseTypeMemberSemicolon(), this.finishNode(e, 'TSPropertySignature');
			}
		}
		tsParseTypeMember() {
			const e = this.startNode();
			if (this.match(10) || this.match(47)) return this.tsParseSignatureMember('TSCallSignatureDeclaration', e);
			if (this.match(77)) {
				const t = this.startNode();
				return this.next(), this.match(10) || this.match(47) ? this.tsParseSignatureMember('TSConstructSignatureDeclaration', e) : ((e.key = this.createIdentifier(t, 'new')), this.tsParsePropertyOrMethodSignature(e, !1));
			}
			this.tsParseModifiers({ allowedModifiers: ['readonly'], disallowedModifiers: ['declare', 'abstract', 'private', 'protected', 'public', 'static', 'override'] }, e);
			const t = this.tsTryParseIndexSignature(e);
			return t || (super.parsePropertyName(e), e.computed || 'Identifier' !== e.key.type || ('get' !== e.key.name && 'set' !== e.key.name) || !this.tsTokenCanFollowModifier() || ((e.kind = e.key.name), super.parsePropertyName(e)), this.tsParsePropertyOrMethodSignature(e, !!e.readonly));
		}
		tsParseTypeLiteral() {
			const e = this.startNode();
			return (e.members = this.tsParseObjectTypeMembers()), this.finishNode(e, 'TSTypeLiteral');
		}
		tsParseObjectTypeMembers() {
			this.expect(5);
			const e = this.tsParseList('TypeMembers', this.tsParseTypeMember.bind(this));
			return this.expect(8), e;
		}
		tsIsStartOfMappedType() {
			return this.next(), this.eat(53) ? this.isContextual(120) : (this.isContextual(120) && this.next(), !!this.match(0) && (this.next(), !!this.tsIsIdentifier() && (this.next(), this.match(58))));
		}
		tsParseMappedTypeParameter() {
			const e = this.startNode();
			return (e.name = this.tsParseTypeParameterName()), (e.constraint = this.tsExpectThenParseType(58)), this.finishNode(e, 'TSTypeParameter');
		}
		tsParseMappedType() {
			const e = this.startNode();
			return (
				this.expect(5),
				this.match(53) ? ((e.readonly = this.state.value), this.next(), this.expectContextual(120)) : this.eatContextual(120) && (e.readonly = !0),
				this.expect(0),
				(e.typeParameter = this.tsParseMappedTypeParameter()),
				(e.nameType = this.eatContextual(93) ? this.tsParseType() : null),
				this.expect(3),
				this.match(53) ? ((e.optional = this.state.value), this.next(), this.expect(17)) : this.eat(17) && (e.optional = !0),
				(e.typeAnnotation = this.tsTryParseType()),
				this.semicolon(),
				this.expect(8),
				this.finishNode(e, 'TSMappedType')
			);
		}
		tsParseTupleType() {
			const e = this.startNode();
			e.elementTypes = this.tsParseBracketedList('TupleElementTypes', this.tsParseTupleElementType.bind(this), !0, !1);
			let t = !1,
				s = null;
			return (
				e.elementTypes.forEach((e) => {
					const { type: r } = e;
					!t || 'TSRestType' === r || 'TSOptionalType' === r || ('TSNamedTupleMember' === r && e.optional) || this.raise(TSErrors.OptionalTypeBeforeRequired, { at: e }), t || (t = ('TSNamedTupleMember' === r && e.optional) || 'TSOptionalType' === r);
					let i = r;
					'TSRestType' === r && (i = (e = e.typeAnnotation).type);
					const a = 'TSNamedTupleMember' === i;
					null != s || (s = a), s !== a && this.raise(TSErrors.MixedLabeledAndUnlabeledElements, { at: e });
				}),
				this.finishNode(e, 'TSTupleType')
			);
		}
		tsParseTupleElementType() {
			const { startLoc: e } = this.state,
				t = this.eat(21);
			let s, r, i, a;
			const n = tokenIsKeywordOrIdentifier(this.state.type) ? this.lookaheadCharCode() : null;
			if (58 === n) (s = !0), (i = !1), (r = this.parseIdentifier(!0)), this.expect(14), (a = this.tsParseType());
			else if (63 === n) {
				i = !0;
				const e = this.state.startLoc,
					t = this.state.value,
					n = this.tsParseNonArrayType();
				58 === this.lookaheadCharCode() ? ((s = !0), (r = this.createIdentifier(this.startNodeAt(e), t)), this.expect(17), this.expect(14), (a = this.tsParseType())) : ((s = !1), (a = n), this.expect(17));
			} else (a = this.tsParseType()), (i = this.eat(17)), (s = this.eat(14));
			if (s) {
				let e;
				r ? ((e = this.startNodeAtNode(r)), (e.optional = i), (e.label = r), (e.elementType = a), this.eat(17) && ((e.optional = !0), this.raise(TSErrors.TupleOptionalAfterType, { at: this.state.lastTokStartLoc }))) : ((e = this.startNodeAtNode(a)), (e.optional = i), this.raise(TSErrors.InvalidTupleMemberLabel, { at: a }), (e.label = a), (e.elementType = this.tsParseType())), (a = this.finishNode(e, 'TSNamedTupleMember'));
			} else if (i) {
				const e = this.startNodeAtNode(a);
				(e.typeAnnotation = a), (a = this.finishNode(e, 'TSOptionalType'));
			}
			if (t) {
				const t = this.startNodeAt(e);
				(t.typeAnnotation = a), (a = this.finishNode(t, 'TSRestType'));
			}
			return a;
		}
		tsParseParenthesizedType() {
			const e = this.startNode();
			return this.expect(10), (e.typeAnnotation = this.tsParseType()), this.expect(11), this.finishNode(e, 'TSParenthesizedType');
		}
		tsParseFunctionOrConstructorType(e, t) {
			const s = this.startNode();
			return 'TSConstructorType' === e && ((s.abstract = !!t), t && this.next(), this.next()), this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(19, s)), this.finishNode(s, e);
		}
		tsParseLiteralTypeNode() {
			const e = this.startNode();
			switch (this.state.type) {
				case 132:
				case 133:
				case 131:
				case 85:
				case 86:
					e.literal = super.parseExprAtom();
					break;
				default:
					this.unexpected();
			}
			return this.finishNode(e, 'TSLiteralType');
		}
		tsParseTemplateLiteralType() {
			const e = this.startNode();
			return (e.literal = super.parseTemplate(!1)), this.finishNode(e, 'TSLiteralType');
		}
		parseTemplateSubstitution() {
			return this.state.inType ? this.tsParseType() : super.parseTemplateSubstitution();
		}
		tsParseThisTypeOrThisTypePredicate() {
			const e = this.tsParseThisTypeNode();
			return this.isContextual(114) && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(e) : e;
		}
		tsParseNonArrayType() {
			switch (this.state.type) {
				case 131:
				case 132:
				case 133:
				case 85:
				case 86:
					return this.tsParseLiteralTypeNode();
				case 53:
					if ('-' === this.state.value) {
						const e = this.startNode(),
							t = this.lookahead();
						return 132 !== t.type && 133 !== t.type && this.unexpected(), (e.literal = this.parseMaybeUnary()), this.finishNode(e, 'TSLiteralType');
					}
					break;
				case 78:
					return this.tsParseThisTypeOrThisTypePredicate();
				case 87:
					return this.tsParseTypeQuery();
				case 83:
					return this.tsParseImportType();
				case 5:
					return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
				case 0:
					return this.tsParseTupleType();
				case 10:
					return this.tsParseParenthesizedType();
				case 25:
				case 24:
					return this.tsParseTemplateLiteralType();
				default: {
					const { type: e } = this.state;
					if (tokenIsIdentifier(e) || 88 === e || 84 === e) {
						const t = 88 === e ? 'TSVoidKeyword' : 84 === e ? 'TSNullKeyword' : keywordTypeFromName(this.state.value);
						if (void 0 !== t && 46 !== this.lookaheadCharCode()) {
							const e = this.startNode();
							return this.next(), this.finishNode(e, t);
						}
						return this.tsParseTypeReference();
					}
				}
			}
			this.unexpected();
		}
		tsParseArrayTypeOrHigher() {
			let e = this.tsParseNonArrayType();
			for (; !this.hasPrecedingLineBreak() && this.eat(0); )
				if (this.match(3)) {
					const t = this.startNodeAtNode(e);
					(t.elementType = e), this.expect(3), (e = this.finishNode(t, 'TSArrayType'));
				} else {
					const t = this.startNodeAtNode(e);
					(t.objectType = e), (t.indexType = this.tsParseType()), this.expect(3), (e = this.finishNode(t, 'TSIndexedAccessType'));
				}
			return e;
		}
		tsParseTypeOperator() {
			const e = this.startNode(),
				t = this.state.value;
			return this.next(), (e.operator = t), (e.typeAnnotation = this.tsParseTypeOperatorOrHigher()), 'readonly' === t && this.tsCheckTypeAnnotationForReadOnly(e), this.finishNode(e, 'TSTypeOperator');
		}
		tsCheckTypeAnnotationForReadOnly(e) {
			switch (e.typeAnnotation.type) {
				case 'TSTupleType':
				case 'TSArrayType':
					return;
				default:
					this.raise(TSErrors.UnexpectedReadonly, { at: e });
			}
		}
		tsParseInferType() {
			const e = this.startNode();
			this.expectContextual(113);
			const t = this.startNode();
			return (t.name = this.tsParseTypeParameterName()), (t.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType())), (e.typeParameter = this.finishNode(t, 'TSTypeParameter')), this.finishNode(e, 'TSInferType');
		}
		tsParseConstraintForInferType() {
			if (this.eat(81)) {
				const e = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
				if (this.state.inDisallowConditionalTypesContext || !this.match(17)) return e;
			}
		}
		tsParseTypeOperatorOrHigher() {
			return tokenIsTSTypeOperator(this.state.type) && !this.state.containsEsc ? this.tsParseTypeOperator() : this.isContextual(113) ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
		}
		tsParseUnionOrIntersectionType(e, t, s) {
			const r = this.startNode(),
				i = this.eat(s),
				a = [];
			do {
				a.push(t());
			} while (this.eat(s));
			return 1 !== a.length || i ? ((r.types = a), this.finishNode(r, e)) : a[0];
		}
		tsParseIntersectionTypeOrHigher() {
			return this.tsParseUnionOrIntersectionType('TSIntersectionType', this.tsParseTypeOperatorOrHigher.bind(this), 45);
		}
		tsParseUnionTypeOrHigher() {
			return this.tsParseUnionOrIntersectionType('TSUnionType', this.tsParseIntersectionTypeOrHigher.bind(this), 43);
		}
		tsIsStartOfFunctionType() {
			return !!this.match(47) || (this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this)));
		}
		tsSkipParameterStart() {
			if (tokenIsIdentifier(this.state.type) || this.match(78)) return this.next(), !0;
			if (this.match(5)) {
				const { errors: e } = this.state,
					t = e.length;
				try {
					return this.parseObjectLike(8, !0), e.length === t;
				} catch (e) {
					return !1;
				}
			}
			if (this.match(0)) {
				this.next();
				const { errors: e } = this.state,
					t = e.length;
				try {
					return super.parseBindingList(3, 93, 1), e.length === t;
				} catch (e) {
					return !1;
				}
			}
			return !1;
		}
		tsIsUnambiguouslyStartOfFunctionType() {
			if ((this.next(), this.match(11) || this.match(21))) return !0;
			if (this.tsSkipParameterStart()) {
				if (this.match(14) || this.match(12) || this.match(17) || this.match(29)) return !0;
				if (this.match(11) && (this.next(), this.match(19))) return !0;
			}
			return !1;
		}
		tsParseTypeOrTypePredicateAnnotation(e) {
			return this.tsInType(() => {
				const t = this.startNode();
				this.expect(e);
				const s = this.startNode(),
					r = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
				if (r && this.match(78)) {
					let e = this.tsParseThisTypeOrThisTypePredicate();
					return 'TSThisType' === e.type ? ((s.parameterName = e), (s.asserts = !0), (s.typeAnnotation = null), (e = this.finishNode(s, 'TSTypePredicate'))) : (this.resetStartLocationFromNode(e, s), (e.asserts = !0)), (t.typeAnnotation = e), this.finishNode(t, 'TSTypeAnnotation');
				}
				const i = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
				if (!i) return r ? ((s.parameterName = this.parseIdentifier()), (s.asserts = r), (s.typeAnnotation = null), (t.typeAnnotation = this.finishNode(s, 'TSTypePredicate')), this.finishNode(t, 'TSTypeAnnotation')) : this.tsParseTypeAnnotation(!1, t);
				const a = this.tsParseTypeAnnotation(!1);
				return (s.parameterName = i), (s.typeAnnotation = a), (s.asserts = r), (t.typeAnnotation = this.finishNode(s, 'TSTypePredicate')), this.finishNode(t, 'TSTypeAnnotation');
			});
		}
		tsTryParseTypeOrTypePredicateAnnotation() {
			if (this.match(14)) return this.tsParseTypeOrTypePredicateAnnotation(14);
		}
		tsTryParseTypeAnnotation() {
			if (this.match(14)) return this.tsParseTypeAnnotation();
		}
		tsTryParseType() {
			return this.tsEatThenParseType(14);
		}
		tsParseTypePredicatePrefix() {
			const e = this.parseIdentifier();
			if (this.isContextual(114) && !this.hasPrecedingLineBreak()) return this.next(), e;
		}
		tsParseTypePredicateAsserts() {
			if (107 !== this.state.type) return !1;
			const e = this.state.containsEsc;
			return this.next(), !(!tokenIsIdentifier(this.state.type) && !this.match(78)) && (e && this.raise(Errors.InvalidEscapedReservedWord, { at: this.state.lastTokStartLoc, reservedWord: 'asserts' }), !0);
		}
		tsParseTypeAnnotation(e = !0, t = this.startNode()) {
			return (
				this.tsInType(() => {
					e && this.expect(14), (t.typeAnnotation = this.tsParseType());
				}),
				this.finishNode(t, 'TSTypeAnnotation')
			);
		}
		tsParseType() {
			assert(this.state.inType);
			const e = this.tsParseNonConditionalType();
			if (this.state.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(81)) return e;
			const t = this.startNodeAtNode(e);
			return (t.checkType = e), (t.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType())), this.expect(17), (t.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType())), this.expect(14), (t.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType())), this.finishNode(t, 'TSConditionalType');
		}
		isAbstractConstructorSignature() {
			return this.isContextual(122) && 77 === this.lookahead().type;
		}
		tsParseNonConditionalType() {
			return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType('TSFunctionType') : this.match(77) ? this.tsParseFunctionOrConstructorType('TSConstructorType') : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType('TSConstructorType', !0) : this.tsParseUnionTypeOrHigher();
		}
		tsParseTypeAssertion() {
			this.getPluginOption('typescript', 'disallowAmbiguousJSXLike') && this.raise(TSErrors.ReservedTypeAssertion, { at: this.state.startLoc });
			const e = this.startNode();
			return (e.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? this.tsParseTypeReference() : this.tsParseType()))), this.expect(48), (e.expression = this.parseMaybeUnary()), this.finishNode(e, 'TSTypeAssertion');
		}
		tsParseHeritageClause(e) {
			const t = this.state.startLoc,
				s = this.tsParseDelimitedList('HeritageClauseElement', () => {
					const e = this.startNode();
					return (e.expression = this.tsParseEntityName()), this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, 'TSExpressionWithTypeArguments');
				});
			return s.length || this.raise(TSErrors.EmptyHeritageClauseType, { at: t, token: e }), s;
		}
		tsParseInterfaceDeclaration(e, t = {}) {
			if (this.hasFollowingLineBreak()) return null;
			this.expectContextual(127), t.declare && (e.declare = !0), tokenIsIdentifier(this.state.type) ? ((e.id = this.parseIdentifier()), this.checkIdentifier(e.id, 130)) : ((e.id = null), this.raise(TSErrors.MissingInterfaceName, { at: this.state.startLoc })), (e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers)), this.eat(81) && (e.extends = this.tsParseHeritageClause('extends'));
			const s = this.startNode();
			return (s.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this))), (e.body = this.finishNode(s, 'TSInterfaceBody')), this.finishNode(e, 'TSInterfaceDeclaration');
		}
		tsParseTypeAliasDeclaration(e) {
			return (
				(e.id = this.parseIdentifier()),
				this.checkIdentifier(e.id, 2),
				(e.typeAnnotation = this.tsInType(() => {
					if (((e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers)), this.expect(29), this.isContextual(112) && 16 !== this.lookahead().type)) {
						const e = this.startNode();
						return this.next(), this.finishNode(e, 'TSIntrinsicKeyword');
					}
					return this.tsParseType();
				})),
				this.semicolon(),
				this.finishNode(e, 'TSTypeAliasDeclaration')
			);
		}
		tsInNoContext(e) {
			const t = this.state.context;
			this.state.context = [t[0]];
			try {
				return e();
			} finally {
				this.state.context = t;
			}
		}
		tsInType(e) {
			const t = this.state.inType;
			this.state.inType = !0;
			try {
				return e();
			} finally {
				this.state.inType = t;
			}
		}
		tsInDisallowConditionalTypesContext(e) {
			const t = this.state.inDisallowConditionalTypesContext;
			this.state.inDisallowConditionalTypesContext = !0;
			try {
				return e();
			} finally {
				this.state.inDisallowConditionalTypesContext = t;
			}
		}
		tsInAllowConditionalTypesContext(e) {
			const t = this.state.inDisallowConditionalTypesContext;
			this.state.inDisallowConditionalTypesContext = !1;
			try {
				return e();
			} finally {
				this.state.inDisallowConditionalTypesContext = t;
			}
		}
		tsEatThenParseType(e) {
			if (this.match(e)) return this.tsNextThenParseType();
		}
		tsExpectThenParseType(e) {
			return this.tsInType(() => (this.expect(e), this.tsParseType()));
		}
		tsNextThenParseType() {
			return this.tsInType(() => (this.next(), this.tsParseType()));
		}
		tsParseEnumMember() {
			const e = this.startNode();
			return (e.id = this.match(131) ? super.parseStringLiteral(this.state.value) : this.parseIdentifier(!0)), this.eat(29) && (e.initializer = super.parseMaybeAssignAllowIn()), this.finishNode(e, 'TSEnumMember');
		}
		tsParseEnumDeclaration(e, t = {}) {
			return t.const && (e.const = !0), t.declare && (e.declare = !0), this.expectContextual(124), (e.id = this.parseIdentifier()), this.checkIdentifier(e.id, e.const ? 8971 : 8459), this.expect(5), (e.members = this.tsParseDelimitedList('EnumMembers', this.tsParseEnumMember.bind(this))), this.expect(8), this.finishNode(e, 'TSEnumDeclaration');
		}
		tsParseModuleBlock() {
			const e = this.startNode();
			return this.scope.enter(0), this.expect(5), super.parseBlockOrModuleBlockBody((e.body = []), void 0, !0, 8), this.scope.exit(), this.finishNode(e, 'TSModuleBlock');
		}
		tsParseModuleOrNamespaceDeclaration(e, t = !1) {
			if (((e.id = this.parseIdentifier()), t || this.checkIdentifier(e.id, 1024), this.eat(16))) {
				const t = this.startNode();
				this.tsParseModuleOrNamespaceDeclaration(t, !0), (e.body = t);
			} else this.scope.enter(256), this.prodParam.enter(0), (e.body = this.tsParseModuleBlock()), this.prodParam.exit(), this.scope.exit();
			return this.finishNode(e, 'TSModuleDeclaration');
		}
		tsParseAmbientExternalModuleDeclaration(e) {
			return this.isContextual(110) ? ((e.global = !0), (e.id = this.parseIdentifier())) : this.match(131) ? (e.id = super.parseStringLiteral(this.state.value)) : this.unexpected(), this.match(5) ? (this.scope.enter(256), this.prodParam.enter(0), (e.body = this.tsParseModuleBlock()), this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(e, 'TSModuleDeclaration');
		}
		tsParseImportEqualsDeclaration(e, t, s) {
			(e.isExport = s || !1), (e.id = t || this.parseIdentifier()), this.checkIdentifier(e.id, 4096), this.expect(29);
			const r = this.tsParseModuleReference();
			return 'type' === e.importKind && 'TSExternalModuleReference' !== r.type && this.raise(TSErrors.ImportAliasHasImportType, { at: r }), (e.moduleReference = r), this.semicolon(), this.finishNode(e, 'TSImportEqualsDeclaration');
		}
		tsIsExternalModuleReference() {
			return this.isContextual(117) && 40 === this.lookaheadCharCode();
		}
		tsParseModuleReference() {
			return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1);
		}
		tsParseExternalModuleReference() {
			const e = this.startNode();
			return this.expectContextual(117), this.expect(10), this.match(131) || this.unexpected(), (e.expression = super.parseExprAtom()), this.expect(11), (this.sawUnambiguousESM = !0), this.finishNode(e, 'TSExternalModuleReference');
		}
		tsLookAhead(e) {
			const t = this.state.clone(),
				s = e();
			return (this.state = t), s;
		}
		tsTryParseAndCatch(e) {
			const t = this.tryParse((t) => e() || t());
			if (!t.aborted && t.node) return t.error && (this.state = t.failState), t.node;
		}
		tsTryParse(e) {
			const t = this.state.clone(),
				s = e();
			if (void 0 !== s && !1 !== s) return s;
			this.state = t;
		}
		tsTryParseDeclare(e) {
			if (this.isLineTerminator()) return;
			let t,
				s = this.state.type;
			return (
				this.isContextual(99) && ((s = 74), (t = 'let')),
				this.tsInAmbientContext(() => {
					switch (s) {
						case 68:
							return (e.declare = !0), super.parseFunctionStatement(e, !1, !1);
						case 80:
							return (e.declare = !0), this.parseClass(e, !0, !1);
						case 124:
							return this.tsParseEnumDeclaration(e, { declare: !0 });
						case 110:
							return this.tsParseAmbientExternalModuleDeclaration(e);
						case 75:
						case 74:
							return this.match(75) && this.isLookaheadContextual('enum') ? (this.expect(75), this.tsParseEnumDeclaration(e, { const: !0, declare: !0 })) : ((e.declare = !0), this.parseVarStatement(e, t || this.state.value, !0));
						case 127: {
							const t = this.tsParseInterfaceDeclaration(e, { declare: !0 });
							if (t) return t;
						}
						default:
							if (tokenIsIdentifier(s)) return this.tsParseDeclaration(e, this.state.value, !0, null);
					}
				})
			);
		}
		tsTryParseExportDeclaration() {
			return this.tsParseDeclaration(this.startNode(), this.state.value, !0, null);
		}
		tsParseExpressionStatement(e, t, s) {
			switch (t.name) {
				case 'declare': {
					const t = this.tsTryParseDeclare(e);
					return t && (t.declare = !0), t;
				}
				case 'global':
					if (this.match(5)) {
						this.scope.enter(256), this.prodParam.enter(0);
						const s = e;
						return (s.global = !0), (s.id = t), (s.body = this.tsParseModuleBlock()), this.scope.exit(), this.prodParam.exit(), this.finishNode(s, 'TSModuleDeclaration');
					}
					break;
				default:
					return this.tsParseDeclaration(e, t.name, !1, s);
			}
		}
		tsParseDeclaration(e, t, s, r) {
			switch (t) {
				case 'abstract':
					if (this.tsCheckLineTerminator(s) && (this.match(80) || tokenIsIdentifier(this.state.type))) return this.tsParseAbstractDeclaration(e, r);
					break;
				case 'module':
					if (this.tsCheckLineTerminator(s)) {
						if (this.match(131)) return this.tsParseAmbientExternalModuleDeclaration(e);
						if (tokenIsIdentifier(this.state.type)) return this.tsParseModuleOrNamespaceDeclaration(e);
					}
					break;
				case 'namespace':
					if (this.tsCheckLineTerminator(s) && tokenIsIdentifier(this.state.type)) return this.tsParseModuleOrNamespaceDeclaration(e);
					break;
				case 'type':
					if (this.tsCheckLineTerminator(s) && tokenIsIdentifier(this.state.type)) return this.tsParseTypeAliasDeclaration(e);
			}
		}
		tsCheckLineTerminator(e) {
			return e ? !this.hasFollowingLineBreak() && (this.next(), !0) : !this.isLineTerminator();
		}
		tsTryParseGenericAsyncArrowFunction(e) {
			if (!this.match(47)) return;
			const t = this.state.maybeInArrowParameters;
			this.state.maybeInArrowParameters = !0;
			const s = this.tsTryParseAndCatch(() => {
				const t = this.startNodeAt(e);
				return (t.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier)), super.parseFunctionParams(t), (t.returnType = this.tsTryParseTypeOrTypePredicateAnnotation()), this.expect(19), t;
			});
			return (this.state.maybeInArrowParameters = t), s ? super.parseArrowExpression(s, null, !0) : void 0;
		}
		tsParseTypeArgumentsInExpression() {
			if (47 === this.reScan_lt()) return this.tsParseTypeArguments();
		}
		tsParseTypeArguments() {
			const e = this.startNode();
			return (e.params = this.tsInType(() => this.tsInNoContext(() => (this.expect(47), this.tsParseDelimitedList('TypeParametersOrArguments', this.tsParseType.bind(this)))))), 0 === e.params.length ? this.raise(TSErrors.EmptyTypeArguments, { at: e }) : this.state.inType || this.curContext() !== types.brace || this.reScan_lt_gt(), this.expect(48), this.finishNode(e, 'TSTypeParameterInstantiation');
		}
		tsIsDeclarationStart() {
			return tokenIsTSDeclarationStart(this.state.type);
		}
		isExportDefaultSpecifier() {
			return !this.tsIsDeclarationStart() && super.isExportDefaultSpecifier();
		}
		parseAssignableListItem(e, t) {
			const s = this.state.startLoc,
				r = {};
			this.tsParseModifiers({ allowedModifiers: ['public', 'private', 'protected', 'override', 'readonly'] }, r);
			const i = r.accessibility,
				a = r.override,
				n = r.readonly;
			4 & e || !(i || n || a) || this.raise(TSErrors.UnexpectedParameterModifier, { at: s });
			const o = this.parseMaybeDefault();
			this.parseAssignableListItemTypes(o, e);
			const h = this.parseMaybeDefault(o.loc.start, o);
			if (i || n || a) {
				const e = this.startNodeAt(s);
				return t.length && (e.decorators = t), i && (e.accessibility = i), n && (e.readonly = n), a && (e.override = a), 'Identifier' !== h.type && 'AssignmentPattern' !== h.type && this.raise(TSErrors.UnsupportedParameterPropertyKind, { at: e }), (e.parameter = h), this.finishNode(e, 'TSParameterProperty');
			}
			return t.length && (o.decorators = t), h;
		}
		isSimpleParameter(e) {
			return ('TSParameterProperty' === e.type && super.isSimpleParameter(e.parameter)) || super.isSimpleParameter(e);
		}
		tsDisallowOptionalPattern(e) {
			for (const t of e.params) 'Identifier' !== t.type && t.optional && !this.state.isAmbientContext && this.raise(TSErrors.PatternIsOptional, { at: t });
		}
		setArrowFunctionParameters(e, t, s) {
			super.setArrowFunctionParameters(e, t, s), this.tsDisallowOptionalPattern(e);
		}
		parseFunctionBodyAndFinish(e, t, s = !1) {
			this.match(14) && (e.returnType = this.tsParseTypeOrTypePredicateAnnotation(14));
			const r = 'FunctionDeclaration' === t ? 'TSDeclareFunction' : 'ClassMethod' === t || 'ClassPrivateMethod' === t ? 'TSDeclareMethod' : void 0;
			return r && !this.match(5) && this.isLineTerminator() ? this.finishNode(e, r) : 'TSDeclareFunction' === r && this.state.isAmbientContext && (this.raise(TSErrors.DeclareFunctionHasImplementation, { at: e }), e.declare) ? super.parseFunctionBodyAndFinish(e, r, s) : (this.tsDisallowOptionalPattern(e), super.parseFunctionBodyAndFinish(e, t, s));
		}
		registerFunctionStatementId(e) {
			!e.body && e.id ? this.checkIdentifier(e.id, 1024) : super.registerFunctionStatementId(e);
		}
		tsCheckForInvalidTypeCasts(e) {
			e.forEach((e) => {
				'TSTypeCastExpression' === (null == e ? void 0 : e.type) && this.raise(TSErrors.UnexpectedTypeAnnotation, { at: e.typeAnnotation });
			});
		}
		toReferencedList(e, t) {
			return this.tsCheckForInvalidTypeCasts(e), e;
		}
		parseArrayLike(e, t, s, r) {
			const i = super.parseArrayLike(e, t, s, r);
			return 'ArrayExpression' === i.type && this.tsCheckForInvalidTypeCasts(i.elements), i;
		}
		parseSubscript(e, t, s, r) {
			if (!this.hasPrecedingLineBreak() && this.match(35)) {
				(this.state.canStartJSXElement = !1), this.next();
				const s = this.startNodeAt(t);
				return (s.expression = e), this.finishNode(s, 'TSNonNullExpression');
			}
			let i = !1;
			if (this.match(18) && 60 === this.lookaheadCharCode()) {
				if (s) return (r.stop = !0), e;
				(r.optionalChainMember = i = !0), this.next();
			}
			if (this.match(47) || this.match(51)) {
				let a;
				const n = this.tsTryParseAndCatch(() => {
					if (!s && this.atPossibleAsyncArrow(e)) {
						const e = this.tsTryParseGenericAsyncArrowFunction(t);
						if (e) return e;
					}
					const n = this.tsParseTypeArgumentsInExpression();
					if (!n) return;
					if (i && !this.match(10)) return void (a = this.state.curPosition());
					if (tokenIsTemplate(this.state.type)) {
						const s = super.parseTaggedTemplateExpression(e, t, r);
						return (s.typeParameters = n), s;
					}
					if (!s && this.eat(10)) {
						const s = this.startNodeAt(t);
						return (s.callee = e), (s.arguments = this.parseCallExpressionArguments(11, !1)), this.tsCheckForInvalidTypeCasts(s.arguments), (s.typeParameters = n), r.optionalChainMember && (s.optional = i), this.finishCallExpression(s, r.optionalChainMember);
					}
					const o = this.state.type;
					if (48 === o || 52 === o || (10 !== o && tokenCanStartExpression(o) && !this.hasPrecedingLineBreak())) return;
					const h = this.startNodeAt(t);
					return (h.expression = e), (h.typeParameters = n), this.finishNode(h, 'TSInstantiationExpression');
				});
				if ((a && this.unexpected(a, 10), n)) return 'TSInstantiationExpression' === n.type && (this.match(16) || (this.match(18) && 40 !== this.lookaheadCharCode())) && this.raise(TSErrors.InvalidPropertyAccessAfterInstantiationExpression, { at: this.state.startLoc }), n;
			}
			return super.parseSubscript(e, t, s, r);
		}
		parseNewCallee(e) {
			var t;
			super.parseNewCallee(e);
			const { callee: s } = e;
			'TSInstantiationExpression' !== s.type || (null != (t = s.extra) && t.parenthesized) || ((e.typeParameters = s.typeParameters), (e.callee = s.expression));
		}
		parseExprOp(e, t, s) {
			let r;
			if (tokenOperatorPrecedence(58) > s && !this.hasPrecedingLineBreak() && (this.isContextual(93) || (r = this.isContextual(118)))) {
				const i = this.startNodeAt(t);
				return (i.expression = e), (i.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? (r && this.raise(Errors.UnexpectedKeyword, { at: this.state.startLoc, keyword: 'const' }), this.tsParseTypeReference()) : this.tsParseType()))), this.finishNode(i, r ? 'TSSatisfiesExpression' : 'TSAsExpression'), this.reScan_lt_gt(), this.parseExprOp(i, t, s);
			}
			return super.parseExprOp(e, t, s);
		}
		checkReservedWord(e, t, s, r) {
			this.state.isAmbientContext || super.checkReservedWord(e, t, s, r);
		}
		checkImportReflection(e) {
			super.checkImportReflection(e), e.module && 'value' !== e.importKind && this.raise(TSErrors.ImportReflectionHasImportType, { at: e.specifiers[0].loc.start });
		}
		checkDuplicateExports() {}
		isPotentialImportPhase(e) {
			if (super.isPotentialImportPhase(e)) return !0;
			if (this.isContextual(128)) {
				const t = this.lookaheadCharCode();
				return e ? 123 === t || 42 === t : 61 !== t;
			}
			return !e && this.isContextual(87);
		}
		applyImportPhase(e, t, s, r) {
			super.applyImportPhase(e, t, s, r), t ? (e.exportKind = 'type' === s ? 'type' : 'value') : (e.importKind = 'type' === s || 'typeof' === s ? s : 'value');
		}
		parseImport(e) {
			if (this.match(131)) return (e.importKind = 'value'), super.parseImport(e);
			let t;
			if (tokenIsIdentifier(this.state.type) && 61 === this.lookaheadCharCode()) return (e.importKind = 'value'), this.tsParseImportEqualsDeclaration(e);
			if (this.isContextual(128)) {
				const s = this.parseMaybeImportPhase(e, !1);
				if (61 === this.lookaheadCharCode()) return this.tsParseImportEqualsDeclaration(e, s);
				t = super.parseImportSpecifiersAndAfter(e, s);
			} else t = super.parseImport(e);
			return 'type' === t.importKind && t.specifiers.length > 1 && 'ImportDefaultSpecifier' === t.specifiers[0].type && this.raise(TSErrors.TypeImportCannotSpecifyDefaultAndNamed, { at: t }), t;
		}
		parseExport(e, t) {
			if (this.match(83)) {
				this.next();
				let t = null;
				return this.isContextual(128) && this.isPotentialImportPhase(!1) ? (t = this.parseMaybeImportPhase(e, !1)) : (e.importKind = 'value'), this.tsParseImportEqualsDeclaration(e, t, !0);
			}
			if (this.eat(29)) {
				const t = e;
				return (t.expression = super.parseExpression()), this.semicolon(), (this.sawUnambiguousESM = !0), this.finishNode(t, 'TSExportAssignment');
			}
			if (this.eatContextual(93)) {
				const t = e;
				return this.expectContextual(126), (t.id = this.parseIdentifier()), this.semicolon(), this.finishNode(t, 'TSNamespaceExportDeclaration');
			}
			return super.parseExport(e, t);
		}
		isAbstractClass() {
			return this.isContextual(122) && 80 === this.lookahead().type;
		}
		parseExportDefaultExpression() {
			if (this.isAbstractClass()) {
				const e = this.startNode();
				return this.next(), (e.abstract = !0), this.parseClass(e, !0, !0);
			}
			if (this.match(127)) {
				const e = this.tsParseInterfaceDeclaration(this.startNode());
				if (e) return e;
			}
			return super.parseExportDefaultExpression();
		}
		parseVarStatement(e, t, s = !1) {
			const { isAmbientContext: r } = this.state,
				i = super.parseVarStatement(e, t, s || r);
			if (!r) return i;
			for (const { id: e, init: s } of i.declarations) s && ('const' !== t || e.typeAnnotation ? this.raise(TSErrors.InitializerNotAllowedInAmbientContext, { at: s }) : isValidAmbientConstInitializer(s, this.hasPlugin('estree')) || this.raise(TSErrors.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference, { at: s }));
			return i;
		}
		parseStatementContent(e, t) {
			if (this.match(75) && this.isLookaheadContextual('enum')) {
				const e = this.startNode();
				return this.expect(75), this.tsParseEnumDeclaration(e, { const: !0 });
			}
			if (this.isContextual(124)) return this.tsParseEnumDeclaration(this.startNode());
			if (this.isContextual(127)) {
				const e = this.tsParseInterfaceDeclaration(this.startNode());
				if (e) return e;
			}
			return super.parseStatementContent(e, t);
		}
		parseAccessModifier() {
			return this.tsParseModifier(['public', 'protected', 'private']);
		}
		tsHasSomeModifiers(e, t) {
			return t.some((t) => (tsIsAccessModifier(t) ? e.accessibility === t : !!e[t]));
		}
		tsIsStartOfStaticBlocks() {
			return this.isContextual(104) && 123 === this.lookaheadCharCode();
		}
		parseClassMember(e, t, s) {
			const r = ['declare', 'private', 'public', 'protected', 'override', 'abstract', 'readonly', 'static'];
			this.tsParseModifiers({ allowedModifiers: r, disallowedModifiers: ['in', 'out'], stopOnStartOfClassStaticBlock: !0, errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions }, t);
			const i = () => {
				this.tsIsStartOfStaticBlocks() ? (this.next(), this.next(), this.tsHasSomeModifiers(t, r) && this.raise(TSErrors.StaticBlockCannotHaveModifier, { at: this.state.curPosition() }), super.parseClassStaticBlock(e, t)) : this.parseClassMemberWithIsStatic(e, t, s, !!t.static);
			};
			t.declare ? this.tsInAmbientContext(i) : i();
		}
		parseClassMemberWithIsStatic(e, t, s, r) {
			const i = this.tsTryParseIndexSignature(t);
			if (i) return e.body.push(i), t.abstract && this.raise(TSErrors.IndexSignatureHasAbstract, { at: t }), t.accessibility && this.raise(TSErrors.IndexSignatureHasAccessibility, { at: t, modifier: t.accessibility }), t.declare && this.raise(TSErrors.IndexSignatureHasDeclare, { at: t }), void (t.override && this.raise(TSErrors.IndexSignatureHasOverride, { at: t }));
			!this.state.inAbstractClass && t.abstract && this.raise(TSErrors.NonAbstractClassHasAbstractMethod, { at: t }), t.override && (s.hadSuperClass || this.raise(TSErrors.OverrideNotInSubClass, { at: t })), super.parseClassMemberWithIsStatic(e, t, s, r);
		}
		parsePostMemberNameModifiers(e) {
			this.eat(17) && (e.optional = !0), e.readonly && this.match(10) && this.raise(TSErrors.ClassMethodHasReadonly, { at: e }), e.declare && this.match(10) && this.raise(TSErrors.ClassMethodHasDeclare, { at: e });
		}
		parseExpressionStatement(e, t, s) {
			return ('Identifier' === t.type ? this.tsParseExpressionStatement(e, t, s) : void 0) || super.parseExpressionStatement(e, t, s);
		}
		shouldParseExportDeclaration() {
			return !!this.tsIsDeclarationStart() || super.shouldParseExportDeclaration();
		}
		parseConditional(e, t, s) {
			if (!this.state.maybeInArrowParameters || !this.match(17)) return super.parseConditional(e, t, s);
			const r = this.tryParse(() => super.parseConditional(e, t));
			return r.node ? (r.error && (this.state = r.failState), r.node) : (r.error && super.setOptionalParametersError(s, r.error), e);
		}
		parseParenItem(e, t) {
			if (((e = super.parseParenItem(e, t)), this.eat(17) && ((e.optional = !0), this.resetEndLocation(e)), this.match(14))) {
				const s = this.startNodeAt(t);
				return (s.expression = e), (s.typeAnnotation = this.tsParseTypeAnnotation()), this.finishNode(s, 'TSTypeCastExpression');
			}
			return e;
		}
		parseExportDeclaration(e) {
			if (!this.state.isAmbientContext && this.isContextual(123)) return this.tsInAmbientContext(() => this.parseExportDeclaration(e));
			const t = this.state.startLoc,
				s = this.eatContextual(123);
			if (s && (this.isContextual(123) || !this.shouldParseExportDeclaration())) throw this.raise(TSErrors.ExpectedAmbientAfterExportDeclare, { at: this.state.startLoc });
			const r = (tokenIsIdentifier(this.state.type) && this.tsTryParseExportDeclaration()) || super.parseExportDeclaration(e);
			return r ? (('TSInterfaceDeclaration' === r.type || 'TSTypeAliasDeclaration' === r.type || s) && (e.exportKind = 'type'), s && (this.resetStartLocation(r, t), (r.declare = !0)), r) : null;
		}
		parseClassId(e, t, s, r) {
			if ((!t || s) && this.isContextual(111)) return;
			super.parseClassId(e, t, s, e.declare ? 1024 : 8331);
			const i = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers);
			i && (e.typeParameters = i);
		}
		parseClassPropertyAnnotation(e) {
			e.optional || (this.eat(35) ? (e.definite = !0) : this.eat(17) && (e.optional = !0));
			const t = this.tsTryParseTypeAnnotation();
			t && (e.typeAnnotation = t);
		}
		parseClassProperty(e) {
			if ((this.parseClassPropertyAnnotation(e), this.state.isAmbientContext && (!e.readonly || e.typeAnnotation) && this.match(29) && this.raise(TSErrors.DeclareClassFieldHasInitializer, { at: this.state.startLoc }), e.abstract && this.match(29))) {
				const { key: t } = e;
				this.raise(TSErrors.AbstractPropertyHasInitializer, { at: this.state.startLoc, propertyName: 'Identifier' !== t.type || e.computed ? `[${this.input.slice(t.start, t.end)}]` : t.name });
			}
			return super.parseClassProperty(e);
		}
		parseClassPrivateProperty(e) {
			return e.abstract && this.raise(TSErrors.PrivateElementHasAbstract, { at: e }), e.accessibility && this.raise(TSErrors.PrivateElementHasAccessibility, { at: e, modifier: e.accessibility }), this.parseClassPropertyAnnotation(e), super.parseClassPrivateProperty(e);
		}
		parseClassAccessorProperty(e) {
			return this.parseClassPropertyAnnotation(e), e.optional && this.raise(TSErrors.AccessorCannotBeOptional, { at: e }), super.parseClassAccessorProperty(e);
		}
		pushClassMethod(e, t, s, r, i, a) {
			const n = this.tsTryParseTypeParameters(this.tsParseConstModifier);
			n && i && this.raise(TSErrors.ConstructorHasTypeParameters, { at: n });
			const { declare: o = !1, kind: h } = t;
			!o || ('get' !== h && 'set' !== h) || this.raise(TSErrors.DeclareAccessor, { at: t, kind: h }), n && (t.typeParameters = n), super.pushClassMethod(e, t, s, r, i, a);
		}
		pushClassPrivateMethod(e, t, s, r) {
			const i = this.tsTryParseTypeParameters(this.tsParseConstModifier);
			i && (t.typeParameters = i), super.pushClassPrivateMethod(e, t, s, r);
		}
		declareClassPrivateMethodInScope(e, t) {
			'TSDeclareMethod' !== e.type && ('MethodDefinition' !== e.type || e.value.body) && super.declareClassPrivateMethodInScope(e, t);
		}
		parseClassSuper(e) {
			super.parseClassSuper(e), e.superClass && (this.match(47) || this.match(51)) && (e.superTypeParameters = this.tsParseTypeArgumentsInExpression()), this.eatContextual(111) && (e.implements = this.tsParseHeritageClause('implements'));
		}
		parseObjPropValue(e, t, s, r, i, a, n) {
			const o = this.tsTryParseTypeParameters(this.tsParseConstModifier);
			return o && (e.typeParameters = o), super.parseObjPropValue(e, t, s, r, i, a, n);
		}
		parseFunctionParams(e, t) {
			const s = this.tsTryParseTypeParameters(this.tsParseConstModifier);
			s && (e.typeParameters = s), super.parseFunctionParams(e, t);
		}
		parseVarId(e, t) {
			super.parseVarId(e, t), 'Identifier' === e.id.type && !this.hasPrecedingLineBreak() && this.eat(35) && (e.definite = !0);
			const s = this.tsTryParseTypeAnnotation();
			s && ((e.id.typeAnnotation = s), this.resetEndLocation(e.id));
		}
		parseAsyncArrowFromCallExpression(e, t) {
			return this.match(14) && (e.returnType = this.tsParseTypeAnnotation()), super.parseAsyncArrowFromCallExpression(e, t);
		}
		parseMaybeAssign(e, t) {
			var s, r, i, a, n;
			let o, h, p, c;
			if (this.hasPlugin('jsx') && (this.match(140) || this.match(47))) {
				if (((o = this.state.clone()), (h = this.tryParse(() => super.parseMaybeAssign(e, t), o)), !h.error)) return h.node;
				const { context: s } = this.state,
					r = s[s.length - 1];
				(r !== types.j_oTag && r !== types.j_expr) || s.pop();
			}
			if (!((null != (s = h) && s.error) || this.match(47))) return super.parseMaybeAssign(e, t);
			(o && o !== this.state) || (o = this.state.clone());
			const l = this.tryParse((s) => {
				var r, i;
				c = this.tsParseTypeParameters(this.tsParseConstModifier);
				const a = super.parseMaybeAssign(e, t);
				return ('ArrowFunctionExpression' !== a.type || (null != (r = a.extra) && r.parenthesized)) && s(), 0 !== (null == (i = c) ? void 0 : i.params.length) && this.resetStartLocationFromNode(a, c), (a.typeParameters = c), a;
			}, o);
			if (!l.error && !l.aborted) return c && this.reportReservedArrowTypeParam(c), l.node;
			if (!h && (assert(!this.hasPlugin('jsx')), (p = this.tryParse(() => super.parseMaybeAssign(e, t), o)), !p.error)) return p.node;
			if (null != (r = h) && r.node) return (this.state = h.failState), h.node;
			if (l.node) return (this.state = l.failState), c && this.reportReservedArrowTypeParam(c), l.node;
			if (null != (i = p) && i.node) return (this.state = p.failState), p.node;
			throw (null == (a = h) ? void 0 : a.error) || l.error || (null == (n = p) ? void 0 : n.error);
		}
		reportReservedArrowTypeParam(e) {
			var t;
			1 !== e.params.length || e.params[0].constraint || (null != (t = e.extra) && t.trailingComma) || !this.getPluginOption('typescript', 'disallowAmbiguousJSXLike') || this.raise(TSErrors.ReservedArrowTypeParam, { at: e });
		}
		parseMaybeUnary(e, t) {
			return !this.hasPlugin('jsx') && this.match(47) ? this.tsParseTypeAssertion() : super.parseMaybeUnary(e, t);
		}
		parseArrow(e) {
			if (this.match(14)) {
				const t = this.tryParse((e) => {
					const t = this.tsParseTypeOrTypePredicateAnnotation(14);
					return (!this.canInsertSemicolon() && this.match(19)) || e(), t;
				});
				if (t.aborted) return;
				t.thrown || (t.error && (this.state = t.failState), (e.returnType = t.node));
			}
			return super.parseArrow(e);
		}
		parseAssignableListItemTypes(e, t) {
			if (!(2 & t)) return e;
			this.eat(17) && (e.optional = !0);
			const s = this.tsTryParseTypeAnnotation();
			return s && (e.typeAnnotation = s), this.resetEndLocation(e), e;
		}
		isAssignable(e, t) {
			switch (e.type) {
				case 'TSTypeCastExpression':
					return this.isAssignable(e.expression, t);
				case 'TSParameterProperty':
					return !0;
				default:
					return super.isAssignable(e, t);
			}
		}
		toAssignable(e, t = !1) {
			switch (e.type) {
				case 'ParenthesizedExpression':
					this.toAssignableParenthesizedExpression(e, t);
					break;
				case 'TSAsExpression':
				case 'TSSatisfiesExpression':
				case 'TSNonNullExpression':
				case 'TSTypeAssertion':
					t ? this.expressionScope.recordArrowParameterBindingError(TSErrors.UnexpectedTypeCastInParameter, { at: e }) : this.raise(TSErrors.UnexpectedTypeCastInParameter, { at: e }), this.toAssignable(e.expression, t);
					break;
				case 'AssignmentExpression':
					t || 'TSTypeCastExpression' !== e.left.type || (e.left = this.typeCastToParameter(e.left));
				default:
					super.toAssignable(e, t);
			}
		}
		toAssignableParenthesizedExpression(e, t) {
			switch (e.expression.type) {
				case 'TSAsExpression':
				case 'TSSatisfiesExpression':
				case 'TSNonNullExpression':
				case 'TSTypeAssertion':
				case 'ParenthesizedExpression':
					this.toAssignable(e.expression, t);
					break;
				default:
					super.toAssignable(e, t);
			}
		}
		checkToRestConversion(e, t) {
			switch (e.type) {
				case 'TSAsExpression':
				case 'TSSatisfiesExpression':
				case 'TSTypeAssertion':
				case 'TSNonNullExpression':
					this.checkToRestConversion(e.expression, !1);
					break;
				default:
					super.checkToRestConversion(e, t);
			}
		}
		isValidLVal(e, t, s) {
			return (r = { TSTypeCastExpression: !0, TSParameterProperty: 'parameter', TSNonNullExpression: 'expression', TSAsExpression: (64 !== s || !t) && ['expression', !0], TSSatisfiesExpression: (64 !== s || !t) && ['expression', !0], TSTypeAssertion: (64 !== s || !t) && ['expression', !0] }), (i = e), (Object.hasOwnProperty.call(r, i) && r[i]) || super.isValidLVal(e, t, s);
			var r, i;
		}
		parseBindingAtom() {
			return 78 === this.state.type ? this.parseIdentifier(!0) : super.parseBindingAtom();
		}
		parseMaybeDecoratorArguments(e) {
			if (this.match(47) || this.match(51)) {
				const t = this.tsParseTypeArgumentsInExpression();
				if (this.match(10)) {
					const s = super.parseMaybeDecoratorArguments(e);
					return (s.typeParameters = t), s;
				}
				this.unexpected(null, 10);
			}
			return super.parseMaybeDecoratorArguments(e);
		}
		checkCommaAfterRest(e) {
			return this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === e ? (this.next(), !1) : super.checkCommaAfterRest(e);
		}
		isClassMethod() {
			return this.match(47) || super.isClassMethod();
		}
		isClassProperty() {
			return this.match(35) || this.match(14) || super.isClassProperty();
		}
		parseMaybeDefault(e, t) {
			const s = super.parseMaybeDefault(e, t);
			return 'AssignmentPattern' === s.type && s.typeAnnotation && s.right.start < s.typeAnnotation.start && this.raise(TSErrors.TypeAnnotationAfterAssign, { at: s.typeAnnotation }), s;
		}
		getTokenFromCode(e) {
			if (this.state.inType) {
				if (62 === e) return void this.finishOp(48, 1);
				if (60 === e) return void this.finishOp(47, 1);
			}
			super.getTokenFromCode(e);
		}
		reScan_lt_gt() {
			const { type: e } = this.state;
			47 === e ? ((this.state.pos -= 1), this.readToken_lt()) : 48 === e && ((this.state.pos -= 1), this.readToken_gt());
		}
		reScan_lt() {
			const { type: e } = this.state;
			return 51 === e ? ((this.state.pos -= 2), this.finishOp(47, 1), 47) : e;
		}
		toAssignableList(e, t, s) {
			for (let t = 0; t < e.length; t++) {
				const s = e[t];
				'TSTypeCastExpression' === (null == s ? void 0 : s.type) && (e[t] = this.typeCastToParameter(s));
			}
			super.toAssignableList(e, t, s);
		}
		typeCastToParameter(e) {
			return (e.expression.typeAnnotation = e.typeAnnotation), this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
		}
		shouldParseArrow(e) {
			return this.match(14) ? e.every((e) => this.isAssignable(e, !0)) : super.shouldParseArrow(e);
		}
		shouldParseAsyncArrow() {
			return this.match(14) || super.shouldParseAsyncArrow();
		}
		canHaveLeadingDecorator() {
			return super.canHaveLeadingDecorator() || this.isAbstractClass();
		}
		jsxParseOpeningElementAfterName(e) {
			if (this.match(47) || this.match(51)) {
				const t = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
				t && (e.typeParameters = t);
			}
			return super.jsxParseOpeningElementAfterName(e);
		}
		getGetterSetterExpectedParamCount(e) {
			const t = super.getGetterSetterExpectedParamCount(e),
				s = this.getObjectOrClassMethodParams(e)[0];
			return s && this.isThisParam(s) ? t + 1 : t;
		}
		parseCatchClauseParam() {
			const e = super.parseCatchClauseParam(),
				t = this.tsTryParseTypeAnnotation();
			return t && ((e.typeAnnotation = t), this.resetEndLocation(e)), e;
		}
		tsInAmbientContext(e) {
			const t = this.state.isAmbientContext;
			this.state.isAmbientContext = !0;
			try {
				return e();
			} finally {
				this.state.isAmbientContext = t;
			}
		}
		parseClass(e, t, s) {
			const r = this.state.inAbstractClass;
			this.state.inAbstractClass = !!e.abstract;
			try {
				return super.parseClass(e, t, s);
			} finally {
				this.state.inAbstractClass = r;
			}
		}
		tsParseAbstractDeclaration(e, t) {
			if (this.match(80)) return (e.abstract = !0), this.maybeTakeDecorators(t, this.parseClass(e, !0, !1));
			if (this.isContextual(127)) {
				if (!this.hasFollowingLineBreak()) return (e.abstract = !0), this.raise(TSErrors.NonClassMethodPropertyHasAbstractModifer, { at: e }), this.tsParseInterfaceDeclaration(e);
			} else this.unexpected(null, 80);
		}
		parseMethod(e, t, s, r, i, a, n) {
			const o = super.parseMethod(e, t, s, r, i, a, n);
			if (o.abstract) {
				if (this.hasPlugin('estree') ? !!o.value.body : !!o.body) {
					const { key: e } = o;
					this.raise(TSErrors.AbstractMethodHasImplementation, { at: o, methodName: 'Identifier' !== e.type || o.computed ? `[${this.input.slice(e.start, e.end)}]` : e.name });
				}
			}
			return o;
		}
		tsParseTypeParameterName() {
			return this.parseIdentifier().name;
		}
		shouldParseAsAmbientContext() {
			return !!this.getPluginOption('typescript', 'dts');
		}
		parse() {
			return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.parse();
		}
		getExpression() {
			return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), super.getExpression();
		}
		parseExportSpecifier(e, t, s, r) {
			return !t && r ? (this.parseTypeOnlyImportExportSpecifier(e, !1, s), this.finishNode(e, 'ExportSpecifier')) : ((e.exportKind = 'value'), super.parseExportSpecifier(e, t, s, r));
		}
		parseImportSpecifier(e, t, s, r, i) {
			return !t && r ? (this.parseTypeOnlyImportExportSpecifier(e, !0, s), this.finishNode(e, 'ImportSpecifier')) : ((e.importKind = 'value'), super.parseImportSpecifier(e, t, s, r, s ? 4098 : 4096));
		}
		parseTypeOnlyImportExportSpecifier(e, t, s) {
			const r = t ? 'imported' : 'local',
				i = t ? 'local' : 'exported';
			let a,
				n = e[r],
				o = !1,
				h = !0;
			const p = n.loc.start;
			if (this.isContextual(93)) {
				const e = this.parseIdentifier();
				if (this.isContextual(93)) {
					const s = this.parseIdentifier();
					tokenIsKeywordOrIdentifier(this.state.type) ? ((o = !0), (n = e), (a = t ? this.parseIdentifier() : this.parseModuleExportName()), (h = !1)) : ((a = s), (h = !1));
				} else tokenIsKeywordOrIdentifier(this.state.type) ? ((h = !1), (a = t ? this.parseIdentifier() : this.parseModuleExportName())) : ((o = !0), (n = e));
			} else tokenIsKeywordOrIdentifier(this.state.type) && ((o = !0), t ? ((n = this.parseIdentifier(!0)), this.isContextual(93) || this.checkReservedWord(n.name, n.loc.start, !0, !0)) : (n = this.parseModuleExportName()));
			o && s && this.raise(t ? TSErrors.TypeModifierIsUsedInTypeImports : TSErrors.TypeModifierIsUsedInTypeExports, { at: p }), (e[r] = n), (e[i] = a);
			(e[t ? 'importKind' : 'exportKind'] = o ? 'type' : 'value'), h && this.eatContextual(93) && (e[i] = t ? this.parseIdentifier() : this.parseModuleExportName()), e[i] || (e[i] = cloneIdentifier(e[r])), t && this.checkIdentifier(e[i], o ? 4098 : 4096);
		}
	};
function isPossiblyLiteralEnum(e) {
	if ('MemberExpression' !== e.type) return !1;
	const { computed: t, property: s } = e;
	return (!t || 'StringLiteral' === s.type || !('TemplateLiteral' !== s.type || s.expressions.length > 0)) && isUncomputedMemberExpressionChain(e.object);
}
function isValidAmbientConstInitializer(e, t) {
	var s;
	const { type: r } = e;
	if (null != (s = e.extra) && s.parenthesized) return !1;
	if (t) {
		if ('Literal' === r) {
			const { value: t } = e;
			if ('string' == typeof t || 'boolean' == typeof t) return !0;
		}
	} else if ('StringLiteral' === r || 'BooleanLiteral' === r) return !0;
	return !(!isNumber(e, t) && !isNegativeNumber(e, t)) || ('TemplateLiteral' === r && 0 === e.expressions.length) || !!isPossiblyLiteralEnum(e);
}
function isNumber(e, t) {
	return t ? 'Literal' === e.type && ('number' == typeof e.value || 'bigint' in e) : 'NumericLiteral' === e.type || 'BigIntLiteral' === e.type;
}
function isNegativeNumber(e, t) {
	if ('UnaryExpression' === e.type) {
		const { operator: s, argument: r } = e;
		if ('-' === s && isNumber(r, t)) return !0;
	}
	return !1;
}
function isUncomputedMemberExpressionChain(e) {
	return 'Identifier' === e.type || ('MemberExpression' === e.type && !e.computed && isUncomputedMemberExpressionChain(e.object));
}
const PlaceholderErrors = ParseErrorEnum`placeholders`({ ClassNameIsRequired: 'A class name is required.', UnexpectedSpace: 'Unexpected space in placeholder.' });
var placeholders = (e) =>
		class extends e {
			parsePlaceholder(e) {
				if (this.match(142)) {
					const t = this.startNode();
					return this.next(), this.assertNoSpace(), (t.name = super.parseIdentifier(!0)), this.assertNoSpace(), this.expect(142), this.finishPlaceholder(t, e);
				}
			}
			finishPlaceholder(e, t) {
				const s = !(!e.expectedNode || 'Placeholder' !== e.type);
				return (e.expectedNode = t), s ? e : this.finishNode(e, 'Placeholder');
			}
			getTokenFromCode(e) {
				37 === e && 37 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(142, 2) : super.getTokenFromCode(e);
			}
			parseExprAtom(e) {
				return this.parsePlaceholder('Expression') || super.parseExprAtom(e);
			}
			parseIdentifier(e) {
				return this.parsePlaceholder('Identifier') || super.parseIdentifier(e);
			}
			checkReservedWord(e, t, s, r) {
				void 0 !== e && super.checkReservedWord(e, t, s, r);
			}
			parseBindingAtom() {
				return this.parsePlaceholder('Pattern') || super.parseBindingAtom();
			}
			isValidLVal(e, t, s) {
				return 'Placeholder' === e || super.isValidLVal(e, t, s);
			}
			toAssignable(e, t) {
				e && 'Placeholder' === e.type && 'Expression' === e.expectedNode ? (e.expectedNode = 'Pattern') : super.toAssignable(e, t);
			}
			chStartsBindingIdentifier(e, t) {
				if (super.chStartsBindingIdentifier(e, t)) return !0;
				return 142 === this.lookahead().type;
			}
			verifyBreakContinue(e, t) {
				(e.label && 'Placeholder' === e.label.type) || super.verifyBreakContinue(e, t);
			}
			parseExpressionStatement(e, t) {
				var s;
				if ('Placeholder' !== t.type || (null != (s = t.extra) && s.parenthesized)) return super.parseExpressionStatement(e, t);
				if (this.match(14)) {
					const s = e;
					return (s.label = this.finishPlaceholder(t, 'Identifier')), this.next(), (s.body = super.parseStatementOrSloppyAnnexBFunctionDeclaration()), this.finishNode(s, 'LabeledStatement');
				}
				return this.semicolon(), (e.name = t.name), this.finishPlaceholder(e, 'Statement');
			}
			parseBlock(e, t, s) {
				return this.parsePlaceholder('BlockStatement') || super.parseBlock(e, t, s);
			}
			parseFunctionId(e) {
				return this.parsePlaceholder('Identifier') || super.parseFunctionId(e);
			}
			parseClass(e, t, s) {
				const r = t ? 'ClassDeclaration' : 'ClassExpression';
				this.next();
				const i = this.state.strict,
					a = this.parsePlaceholder('Identifier');
				if (a) {
					if (!(this.match(81) || this.match(142) || this.match(5))) {
						if (s || !t) return (e.id = null), (e.body = this.finishPlaceholder(a, 'ClassBody')), this.finishNode(e, r);
						throw this.raise(PlaceholderErrors.ClassNameIsRequired, { at: this.state.startLoc });
					}
					e.id = a;
				} else this.parseClassId(e, t, s);
				return super.parseClassSuper(e), (e.body = this.parsePlaceholder('ClassBody') || super.parseClassBody(!!e.superClass, i)), this.finishNode(e, r);
			}
			parseExport(e, t) {
				const s = this.parsePlaceholder('Identifier');
				if (!s) return super.parseExport(e, t);
				if (!this.isContextual(97) && !this.match(12)) return (e.specifiers = []), (e.source = null), (e.declaration = this.finishPlaceholder(s, 'Declaration')), this.finishNode(e, 'ExportNamedDeclaration');
				this.expectPlugin('exportDefaultFrom');
				const r = this.startNode();
				return (r.exported = s), (e.specifiers = [this.finishNode(r, 'ExportDefaultSpecifier')]), super.parseExport(e, t);
			}
			isExportDefaultSpecifier() {
				if (this.match(65)) {
					const e = this.nextTokenStart();
					if (this.isUnparsedContextual(e, 'from') && this.input.startsWith(tokenLabelName(142), this.nextTokenStartSince(e + 4))) return !0;
				}
				return super.isExportDefaultSpecifier();
			}
			maybeParseExportDefaultSpecifier(e, t) {
				var s;
				return !(null == (s = e.specifiers) || !s.length) || super.maybeParseExportDefaultSpecifier(e, t);
			}
			checkExport(e) {
				const { specifiers: t } = e;
				null != t && t.length && (e.specifiers = t.filter((e) => 'Placeholder' === e.exported.type)), super.checkExport(e), (e.specifiers = t);
			}
			parseImport(e) {
				const t = this.parsePlaceholder('Identifier');
				if (!t) return super.parseImport(e);
				if (((e.specifiers = []), !this.isContextual(97) && !this.match(12))) return (e.source = this.finishPlaceholder(t, 'StringLiteral')), this.semicolon(), this.finishNode(e, 'ImportDeclaration');
				const s = this.startNodeAtNode(t);
				if (((s.local = t), e.specifiers.push(this.finishNode(s, 'ImportDefaultSpecifier')), this.eat(12))) {
					this.maybeParseStarImportSpecifier(e) || this.parseNamedImportSpecifiers(e);
				}
				return this.expectContextual(97), (e.source = this.parseImportSource()), this.semicolon(), this.finishNode(e, 'ImportDeclaration');
			}
			parseImportSource() {
				return this.parsePlaceholder('StringLiteral') || super.parseImportSource();
			}
			assertNoSpace() {
				this.state.start > this.state.lastTokEndLoc.index && this.raise(PlaceholderErrors.UnexpectedSpace, { at: this.state.lastTokEndLoc });
			}
		},
	v8intrinsic = (e) =>
		class extends e {
			parseV8Intrinsic() {
				if (this.match(54)) {
					const e = this.state.startLoc,
						t = this.startNode();
					if ((this.next(), tokenIsIdentifier(this.state.type))) {
						const e = this.parseIdentifierName(),
							s = this.createIdentifier(t, e);
						if (((s.type = 'V8IntrinsicIdentifier'), this.match(10))) return s;
					}
					this.unexpected(e);
				}
			}
			parseExprAtom(e) {
				return this.parseV8Intrinsic() || super.parseExprAtom(e);
			}
		};
function hasPlugin(e, t) {
	const [s, r] = 'string' == typeof t ? [t, {}] : t,
		i = Object.keys(r),
		a = 0 === i.length;
	return e.some((e) => {
		if ('string' == typeof e) return a && e === s;
		{
			const [t, a] = e;
			if (t !== s) return !1;
			for (const e of i) if (a[e] !== r[e]) return !1;
			return !0;
		}
	});
}
function getPluginOption(e, t, s) {
	const r = e.find((e) => (Array.isArray(e) ? e[0] === t : e === t));
	return r && Array.isArray(r) && r.length > 1 ? r[1][s] : null;
}
const PIPELINE_PROPOSALS = ['minimal', 'fsharp', 'hack', 'smart'],
	TOPIC_TOKENS = ['^^', '@@', '^', '%', '#'],
	RECORD_AND_TUPLE_SYNTAX_TYPES = ['hash', 'bar'];
function validatePlugins(e) {
	if (hasPlugin(e, 'decorators')) {
		if (hasPlugin(e, 'decorators-legacy')) throw new Error('Cannot use the decorators and decorators-legacy plugin together');
		const t = getPluginOption(e, 'decorators', 'decoratorsBeforeExport');
		if (null != t && 'boolean' != typeof t) throw new Error("'decoratorsBeforeExport' must be a boolean, if specified.");
		const s = getPluginOption(e, 'decorators', 'allowCallParenthesized');
		if (null != s && 'boolean' != typeof s) throw new Error("'allowCallParenthesized' must be a boolean.");
	}
	if (hasPlugin(e, 'flow') && hasPlugin(e, 'typescript')) throw new Error('Cannot combine flow and typescript plugins.');
	if (hasPlugin(e, 'placeholders') && hasPlugin(e, 'v8intrinsic')) throw new Error('Cannot combine placeholders and v8intrinsic plugins.');
	if (hasPlugin(e, 'pipelineOperator')) {
		const t = getPluginOption(e, 'pipelineOperator', 'proposal');
		if (!PIPELINE_PROPOSALS.includes(t)) {
			const e = PIPELINE_PROPOSALS.map((e) => `"${e}"`).join(', ');
			throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${e}.`);
		}
		const s = hasPlugin(e, ['recordAndTuple', { syntaxType: 'hash' }]);
		if ('hack' === t) {
			if (hasPlugin(e, 'placeholders')) throw new Error('Cannot combine placeholders plugin and Hack-style pipes.');
			if (hasPlugin(e, 'v8intrinsic')) throw new Error('Cannot combine v8intrinsic plugin and Hack-style pipes.');
			const t = getPluginOption(e, 'pipelineOperator', 'topicToken');
			if (!TOPIC_TOKENS.includes(t)) {
				const e = TOPIC_TOKENS.map((e) => `"${e}"`).join(', ');
				throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${e}.`);
			}
			if ('#' === t && s) throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "hack", topicToken: "#" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
		} else if ('smart' === t && s) throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "smart" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
	}
	if (hasPlugin(e, 'moduleAttributes')) {
		if (hasPlugin(e, 'importAssertions') || hasPlugin(e, 'importAttributes')) throw new Error('Cannot combine importAssertions, importAttributes and moduleAttributes plugins.');
		if ('may-2020' !== getPluginOption(e, 'moduleAttributes', 'version')) throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
	}
	if (hasPlugin(e, 'importAssertions') && hasPlugin(e, 'importAttributes')) throw new Error('Cannot combine importAssertions and importAttributes plugins.');
	if (hasPlugin(e, 'recordAndTuple') && null != getPluginOption(e, 'recordAndTuple', 'syntaxType') && !RECORD_AND_TUPLE_SYNTAX_TYPES.includes(getPluginOption(e, 'recordAndTuple', 'syntaxType'))) throw new Error("The 'syntaxType' option of the 'recordAndTuple' plugin must be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map((e) => `'${e}'`).join(', '));
	if (hasPlugin(e, 'asyncDoExpressions') && !hasPlugin(e, 'doExpressions')) {
		const e = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
		throw ((e.missingPlugins = 'doExpressions'), e);
	}
}
const mixinPlugins = { estree: estree, jsx: jsx, flow: flow, typescript: typescript, v8intrinsic: v8intrinsic, placeholders: placeholders },
	mixinPluginNames = Object.keys(mixinPlugins),
	defaultOptions = { sourceType: 'script', sourceFilename: void 0, startColumn: 0, startLine: 1, allowAwaitOutsideFunction: !1, allowReturnOutsideFunction: !1, allowNewTargetOutsideFunction: !1, allowImportExportEverywhere: !1, allowSuperOutsideMethod: !1, allowUndeclaredExports: !1, plugins: [], strictMode: null, ranges: !1, tokens: !1, createParenthesizedExpressions: !1, errorRecovery: !1, attachComment: !0, annexB: !0 };
function getOptions(e) {
	if (null == e) return Object.assign({}, defaultOptions);
	if (null != e.annexB && !1 !== e.annexB) throw new Error('The `annexB` option can only be set to `false`.');
	const t = {};
	for (const r of Object.keys(defaultOptions)) {
		var s;
		t[r] = null != (s = e[r]) ? s : defaultOptions[r];
	}
	return t;
}
class ExpressionParser extends LValParser {
	checkProto(e, t, s, r) {
		if ('SpreadElement' === e.type || this.isObjectMethod(e) || e.computed || e.shorthand) return;
		const i = e.key;
		if ('__proto__' === ('Identifier' === i.type ? i.name : i.value)) {
			if (t) return void this.raise(Errors.RecordNoProto, { at: i });
			s.used && (r ? null === r.doubleProtoLoc && (r.doubleProtoLoc = i.loc.start) : this.raise(Errors.DuplicateProto, { at: i })), (s.used = !0);
		}
	}
	shouldExitDescending(e, t) {
		return 'ArrowFunctionExpression' === e.type && e.start === t;
	}
	getExpression() {
		this.enterInitialScopes(), this.nextToken();
		const e = this.parseExpression();
		return this.match(137) || this.unexpected(), this.finalizeRemainingComments(), (e.comments = this.state.comments), (e.errors = this.state.errors), this.options.tokens && (e.tokens = this.tokens), e;
	}
	parseExpression(e, t) {
		return e ? this.disallowInAnd(() => this.parseExpressionBase(t)) : this.allowInAnd(() => this.parseExpressionBase(t));
	}
	parseExpressionBase(e) {
		const t = this.state.startLoc,
			s = this.parseMaybeAssign(e);
		if (this.match(12)) {
			const r = this.startNodeAt(t);
			for (r.expressions = [s]; this.eat(12); ) r.expressions.push(this.parseMaybeAssign(e));
			return this.toReferencedList(r.expressions), this.finishNode(r, 'SequenceExpression');
		}
		return s;
	}
	parseMaybeAssignDisallowIn(e, t) {
		return this.disallowInAnd(() => this.parseMaybeAssign(e, t));
	}
	parseMaybeAssignAllowIn(e, t) {
		return this.allowInAnd(() => this.parseMaybeAssign(e, t));
	}
	setOptionalParametersError(e, t) {
		var s;
		e.optionalParametersLoc = null != (s = null == t ? void 0 : t.loc) ? s : this.state.startLoc;
	}
	parseMaybeAssign(e, t) {
		const s = this.state.startLoc;
		if (this.isContextual(106) && this.prodParam.hasYield) {
			let e = this.parseYield();
			return t && (e = t.call(this, e, s)), e;
		}
		let r;
		e ? (r = !1) : ((e = new ExpressionErrors()), (r = !0));
		const { type: i } = this.state;
		(10 === i || tokenIsIdentifier(i)) && (this.state.potentialArrowAt = this.state.start);
		let a = this.parseMaybeConditional(e);
		if ((t && (a = t.call(this, a, s)), tokenIsAssignment(this.state.type))) {
			const t = this.startNodeAt(s),
				r = this.state.value;
			if (((t.operator = r), this.match(29))) {
				this.toAssignable(a, !0), (t.left = a);
				const r = s.index;
				null != e.doubleProtoLoc && e.doubleProtoLoc.index >= r && (e.doubleProtoLoc = null), null != e.shorthandAssignLoc && e.shorthandAssignLoc.index >= r && (e.shorthandAssignLoc = null), null != e.privateKeyLoc && e.privateKeyLoc.index >= r && (this.checkDestructuringPrivate(e), (e.privateKeyLoc = null));
			} else t.left = a;
			return this.next(), (t.right = this.parseMaybeAssign()), this.checkLVal(a, { in: this.finishNode(t, 'AssignmentExpression') }), t;
		}
		return r && this.checkExpressionErrors(e, !0), a;
	}
	parseMaybeConditional(e) {
		const t = this.state.startLoc,
			s = this.state.potentialArrowAt,
			r = this.parseExprOps(e);
		return this.shouldExitDescending(r, s) ? r : this.parseConditional(r, t, e);
	}
	parseConditional(e, t, s) {
		if (this.eat(17)) {
			const s = this.startNodeAt(t);
			return (s.test = e), (s.consequent = this.parseMaybeAssignAllowIn()), this.expect(14), (s.alternate = this.parseMaybeAssign()), this.finishNode(s, 'ConditionalExpression');
		}
		return e;
	}
	parseMaybeUnaryOrPrivate(e) {
		return this.match(136) ? this.parsePrivateName() : this.parseMaybeUnary(e);
	}
	parseExprOps(e) {
		const t = this.state.startLoc,
			s = this.state.potentialArrowAt,
			r = this.parseMaybeUnaryOrPrivate(e);
		return this.shouldExitDescending(r, s) ? r : this.parseExprOp(r, t, -1);
	}
	parseExprOp(e, t, s) {
		if (this.isPrivateName(e)) {
			const t = this.getPrivateNameSV(e);
			(s >= tokenOperatorPrecedence(58) || !this.prodParam.hasIn || !this.match(58)) && this.raise(Errors.PrivateInExpectedIn, { at: e, identifierName: t }), this.classScope.usePrivateName(t, e.loc.start);
		}
		const r = this.state.type;
		if (tokenIsOperator(r) && (this.prodParam.hasIn || !this.match(58))) {
			let i = tokenOperatorPrecedence(r);
			if (i > s) {
				if (39 === r) {
					if ((this.expectPlugin('pipelineOperator'), this.state.inFSharpPipelineDirectBody)) return e;
					this.checkPipelineAtInfixOperator(e, t);
				}
				const a = this.startNodeAt(t);
				(a.left = e), (a.operator = this.state.value);
				const n = 41 === r || 42 === r,
					o = 40 === r;
				if ((o && (i = tokenOperatorPrecedence(42)), this.next(), 39 === r && this.hasPlugin(['pipelineOperator', { proposal: 'minimal' }]) && 96 === this.state.type && this.prodParam.hasAwait)) throw this.raise(Errors.UnexpectedAwaitAfterPipelineBody, { at: this.state.startLoc });
				a.right = this.parseExprOpRightExpr(r, i);
				const h = this.finishNode(a, n || o ? 'LogicalExpression' : 'BinaryExpression'),
					p = this.state.type;
				if ((o && (41 === p || 42 === p)) || (n && 40 === p)) throw this.raise(Errors.MixingCoalesceWithLogical, { at: this.state.startLoc });
				return this.parseExprOp(h, t, s);
			}
		}
		return e;
	}
	parseExprOpRightExpr(e, t) {
		const s = this.state.startLoc;
		if (39 === e)
			switch (this.getPluginOption('pipelineOperator', 'proposal')) {
				case 'hack':
					return this.withTopicBindingContext(() => this.parseHackPipeBody());
				case 'smart':
					return this.withTopicBindingContext(() => {
						if (this.prodParam.hasYield && this.isContextual(106)) throw this.raise(Errors.PipeBodyIsTighter, { at: this.state.startLoc });
						return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(e, t), s);
					});
				case 'fsharp':
					return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(t));
			}
		return this.parseExprOpBaseRightExpr(e, t);
	}
	parseExprOpBaseRightExpr(e, t) {
		const s = this.state.startLoc;
		return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), s, tokenIsRightAssociative(e) ? t - 1 : t);
	}
	parseHackPipeBody() {
		var e;
		const { startLoc: t } = this.state,
			s = this.parseMaybeAssign();
		return !UnparenthesizedPipeBodyDescriptions.has(s.type) || (null != (e = s.extra) && e.parenthesized) || this.raise(Errors.PipeUnparenthesizedBody, { at: t, type: s.type }), this.topicReferenceWasUsedInCurrentContext() || this.raise(Errors.PipeTopicUnused, { at: t }), s;
	}
	checkExponentialAfterUnary(e) {
		this.match(57) && this.raise(Errors.UnexpectedTokenUnaryExponentiation, { at: e.argument });
	}
	parseMaybeUnary(e, t) {
		const s = this.state.startLoc,
			r = this.isContextual(96);
		if (r && this.isAwaitAllowed()) {
			this.next();
			const e = this.parseAwait(s);
			return t || this.checkExponentialAfterUnary(e), e;
		}
		const i = this.match(34),
			a = this.startNode();
		if (tokenIsPrefix(this.state.type)) {
			(a.operator = this.state.value), (a.prefix = !0), this.match(72) && this.expectPlugin('throwExpressions');
			const s = this.match(89);
			if ((this.next(), (a.argument = this.parseMaybeUnary(null, !0)), this.checkExpressionErrors(e, !0), this.state.strict && s)) {
				const e = a.argument;
				'Identifier' === e.type ? this.raise(Errors.StrictDelete, { at: a }) : this.hasPropertyAsPrivateName(e) && this.raise(Errors.DeletePrivateField, { at: a });
			}
			if (!i) return t || this.checkExponentialAfterUnary(a), this.finishNode(a, 'UnaryExpression');
		}
		const n = this.parseUpdate(a, i, e);
		if (r) {
			const { type: e } = this.state;
			if ((this.hasPlugin('v8intrinsic') ? tokenCanStartExpression(e) : tokenCanStartExpression(e) && !this.match(54)) && !this.isAmbiguousAwait()) return this.raiseOverwrite(Errors.AwaitNotInAsyncContext, { at: s }), this.parseAwait(s);
		}
		return n;
	}
	parseUpdate(e, t, s) {
		if (t) {
			const t = e;
			return this.checkLVal(t.argument, { in: this.finishNode(t, 'UpdateExpression') }), e;
		}
		const r = this.state.startLoc;
		let i = this.parseExprSubscripts(s);
		if (this.checkExpressionErrors(s, !1)) return i;
		for (; tokenIsPostfix(this.state.type) && !this.canInsertSemicolon(); ) {
			const e = this.startNodeAt(r);
			(e.operator = this.state.value), (e.prefix = !1), (e.argument = i), this.next(), this.checkLVal(i, { in: (i = this.finishNode(e, 'UpdateExpression')) });
		}
		return i;
	}
	parseExprSubscripts(e) {
		const t = this.state.startLoc,
			s = this.state.potentialArrowAt,
			r = this.parseExprAtom(e);
		return this.shouldExitDescending(r, s) ? r : this.parseSubscripts(r, t);
	}
	parseSubscripts(e, t, s) {
		const r = { optionalChainMember: !1, maybeAsyncArrow: this.atPossibleAsyncArrow(e), stop: !1 };
		do {
			(e = this.parseSubscript(e, t, s, r)), (r.maybeAsyncArrow = !1);
		} while (!r.stop);
		return e;
	}
	parseSubscript(e, t, s, r) {
		const { type: i } = this.state;
		if (!s && 15 === i) return this.parseBind(e, t, s, r);
		if (tokenIsTemplate(i)) return this.parseTaggedTemplateExpression(e, t, r);
		let a = !1;
		if (18 === i) {
			if (s && (this.raise(Errors.OptionalChainingNoNew, { at: this.state.startLoc }), 40 === this.lookaheadCharCode())) return (r.stop = !0), e;
			(r.optionalChainMember = a = !0), this.next();
		}
		if (!s && this.match(10)) return this.parseCoverCallAndAsyncArrowHead(e, t, r, a);
		{
			const s = this.eat(0);
			return s || a || this.eat(16) ? this.parseMember(e, t, r, s, a) : ((r.stop = !0), e);
		}
	}
	parseMember(e, t, s, r, i) {
		const a = this.startNodeAt(t);
		return (a.object = e), (a.computed = r), r ? ((a.property = this.parseExpression()), this.expect(3)) : this.match(136) ? ('Super' === e.type && this.raise(Errors.SuperPrivateField, { at: t }), this.classScope.usePrivateName(this.state.value, this.state.startLoc), (a.property = this.parsePrivateName())) : (a.property = this.parseIdentifier(!0)), s.optionalChainMember ? ((a.optional = i), this.finishNode(a, 'OptionalMemberExpression')) : this.finishNode(a, 'MemberExpression');
	}
	parseBind(e, t, s, r) {
		const i = this.startNodeAt(t);
		return (i.object = e), this.next(), (i.callee = this.parseNoCallExpr()), (r.stop = !0), this.parseSubscripts(this.finishNode(i, 'BindExpression'), t, s);
	}
	parseCoverCallAndAsyncArrowHead(e, t, s, r) {
		const i = this.state.maybeInArrowParameters;
		let a = null;
		(this.state.maybeInArrowParameters = !0), this.next();
		const n = this.startNodeAt(t);
		n.callee = e;
		const { maybeAsyncArrow: o, optionalChainMember: h } = s;
		o && (this.expressionScope.enter(newAsyncArrowScope()), (a = new ExpressionErrors())), h && (n.optional = r), (n.arguments = r ? this.parseCallExpressionArguments(11) : this.parseCallExpressionArguments(11, 'Import' === e.type, 'Super' !== e.type, n, a));
		let p = this.finishCallExpression(n, h);
		return o && this.shouldParseAsyncArrow() && !r ? ((s.stop = !0), this.checkDestructuringPrivate(a), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), (p = this.parseAsyncArrowFromCallExpression(this.startNodeAt(t), p))) : (o && (this.checkExpressionErrors(a, !0), this.expressionScope.exit()), this.toReferencedArguments(p)), (this.state.maybeInArrowParameters = i), p;
	}
	toReferencedArguments(e, t) {
		this.toReferencedListDeep(e.arguments, t);
	}
	parseTaggedTemplateExpression(e, t, s) {
		const r = this.startNodeAt(t);
		return (r.tag = e), (r.quasi = this.parseTemplate(!0)), s.optionalChainMember && this.raise(Errors.OptionalChainingNoTemplate, { at: t }), this.finishNode(r, 'TaggedTemplateExpression');
	}
	atPossibleAsyncArrow(e) {
		return 'Identifier' === e.type && 'async' === e.name && this.state.lastTokEndLoc.index === e.end && !this.canInsertSemicolon() && e.end - e.start == 5 && e.start === this.state.potentialArrowAt;
	}
	expectImportAttributesPlugin() {
		this.hasPlugin('importAssertions') || this.expectPlugin('importAttributes');
	}
	finishCallExpression(e, t) {
		if ('Import' === e.callee.type)
			if ((2 === e.arguments.length && (this.hasPlugin('moduleAttributes') || this.expectImportAttributesPlugin()), 0 === e.arguments.length || e.arguments.length > 2)) this.raise(Errors.ImportCallArity, { at: e, maxArgumentCount: this.hasPlugin('importAttributes') || this.hasPlugin('importAssertions') || this.hasPlugin('moduleAttributes') ? 2 : 1 });
			else for (const t of e.arguments) 'SpreadElement' === t.type && this.raise(Errors.ImportCallSpreadArgument, { at: t });
		return this.finishNode(e, t ? 'OptionalCallExpression' : 'CallExpression');
	}
	parseCallExpressionArguments(e, t, s, r, i) {
		const a = [];
		let n = !0;
		const o = this.state.inFSharpPipelineDirectBody;
		for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(e); ) {
			if (n) n = !1;
			else if ((this.expect(12), this.match(e))) {
				!t || this.hasPlugin('importAttributes') || this.hasPlugin('importAssertions') || this.hasPlugin('moduleAttributes') || this.raise(Errors.ImportCallArgumentTrailingComma, { at: this.state.lastTokStartLoc }), r && this.addTrailingCommaExtraToNode(r), this.next();
				break;
			}
			a.push(this.parseExprListItem(!1, i, s));
		}
		return (this.state.inFSharpPipelineDirectBody = o), a;
	}
	shouldParseAsyncArrow() {
		return this.match(19) && !this.canInsertSemicolon();
	}
	parseAsyncArrowFromCallExpression(e, t) {
		var s;
		return this.resetPreviousNodeTrailingComments(t), this.expect(19), this.parseArrowExpression(e, t.arguments, !0, null == (s = t.extra) ? void 0 : s.trailingCommaLoc), t.innerComments && setInnerComments(e, t.innerComments), t.callee.trailingComments && setInnerComments(e, t.callee.trailingComments), e;
	}
	parseNoCallExpr() {
		const e = this.state.startLoc;
		return this.parseSubscripts(this.parseExprAtom(), e, !0);
	}
	parseExprAtom(e) {
		let t,
			s = null;
		const { type: r } = this.state;
		switch (r) {
			case 79:
				return this.parseSuper();
			case 83:
				return (t = this.startNode()), this.next(), this.match(16) ? this.parseImportMetaProperty(t) : (this.match(10) || this.raise(Errors.UnsupportedImport, { at: this.state.lastTokStartLoc }), this.finishNode(t, 'Import'));
			case 78:
				return (t = this.startNode()), this.next(), this.finishNode(t, 'ThisExpression');
			case 90:
				return this.parseDo(this.startNode(), !1);
			case 56:
			case 31:
				return this.readRegexp(), this.parseRegExpLiteral(this.state.value);
			case 132:
				return this.parseNumericLiteral(this.state.value);
			case 133:
				return this.parseBigIntLiteral(this.state.value);
			case 134:
				return this.parseDecimalLiteral(this.state.value);
			case 131:
				return this.parseStringLiteral(this.state.value);
			case 84:
				return this.parseNullLiteral();
			case 85:
				return this.parseBooleanLiteral(!0);
			case 86:
				return this.parseBooleanLiteral(!1);
			case 10: {
				const e = this.state.potentialArrowAt === this.state.start;
				return this.parseParenAndDistinguishExpression(e);
			}
			case 2:
			case 1:
				return this.parseArrayLike(2 === this.state.type ? 4 : 3, !1, !0);
			case 0:
				return this.parseArrayLike(3, !0, !1, e);
			case 6:
			case 7:
				return this.parseObjectLike(6 === this.state.type ? 9 : 8, !1, !0);
			case 5:
				return this.parseObjectLike(8, !1, !1, e);
			case 68:
				return this.parseFunctionOrFunctionSent();
			case 26:
				s = this.parseDecorators();
			case 80:
				return this.parseClass(this.maybeTakeDecorators(s, this.startNode()), !1);
			case 77:
				return this.parseNewOrNewTarget();
			case 25:
			case 24:
				return this.parseTemplate(!1);
			case 15: {
				(t = this.startNode()), this.next(), (t.object = null);
				const e = (t.callee = this.parseNoCallExpr());
				if ('MemberExpression' === e.type) return this.finishNode(t, 'BindExpression');
				throw this.raise(Errors.UnsupportedBind, { at: e });
			}
			case 136:
				return this.raise(Errors.PrivateInExpectedIn, { at: this.state.startLoc, identifierName: this.state.value }), this.parsePrivateName();
			case 33:
				return this.parseTopicReferenceThenEqualsSign(54, '%');
			case 32:
				return this.parseTopicReferenceThenEqualsSign(44, '^');
			case 37:
			case 38:
				return this.parseTopicReference('hack');
			case 44:
			case 54:
			case 27: {
				const e = this.getPluginOption('pipelineOperator', 'proposal');
				if (e) return this.parseTopicReference(e);
				this.unexpected();
				break;
			}
			case 47: {
				const e = this.input.codePointAt(this.nextTokenStart());
				isIdentifierStart(e) || 62 === e ? this.expectOnePlugin(['jsx', 'flow', 'typescript']) : this.unexpected();
				break;
			}
			default:
				if (tokenIsIdentifier(r)) {
					if (this.isContextual(125) && 123 === this.lookaheadInLineCharCode()) return this.parseModuleExpression();
					const e = this.state.potentialArrowAt === this.state.start,
						t = this.state.containsEsc,
						s = this.parseIdentifier();
					if (!t && 'async' === s.name && !this.canInsertSemicolon()) {
						const { type: e } = this.state;
						if (68 === e) return this.resetPreviousNodeTrailingComments(s), this.next(), this.parseAsyncFunctionExpression(this.startNodeAtNode(s));
						if (tokenIsIdentifier(e)) return 61 === this.lookaheadCharCode() ? this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(s)) : s;
						if (90 === e) return this.resetPreviousNodeTrailingComments(s), this.parseDo(this.startNodeAtNode(s), !0);
					}
					return e && this.match(19) && !this.canInsertSemicolon() ? (this.next(), this.parseArrowExpression(this.startNodeAtNode(s), [s], !1)) : s;
				}
				this.unexpected();
		}
	}
	parseTopicReferenceThenEqualsSign(e, t) {
		const s = this.getPluginOption('pipelineOperator', 'proposal');
		if (s) return (this.state.type = e), (this.state.value = t), this.state.pos--, this.state.end--, (this.state.endLoc = createPositionWithColumnOffset(this.state.endLoc, -1)), this.parseTopicReference(s);
		this.unexpected();
	}
	parseTopicReference(e) {
		const t = this.startNode(),
			s = this.state.startLoc,
			r = this.state.type;
		return this.next(), this.finishTopicReference(t, s, e, r);
	}
	finishTopicReference(e, t, s, r) {
		if (this.testTopicReferenceConfiguration(s, t, r)) {
			const r = 'smart' === s ? 'PipelinePrimaryTopicReference' : 'TopicReference';
			return this.topicReferenceIsAllowedInCurrentContext() || this.raise('smart' === s ? Errors.PrimaryTopicNotAllowed : Errors.PipeTopicUnbound, { at: t }), this.registerTopicReference(), this.finishNode(e, r);
		}
		throw this.raise(Errors.PipeTopicUnconfiguredToken, { at: t, token: tokenLabelName(r) });
	}
	testTopicReferenceConfiguration(e, t, s) {
		switch (e) {
			case 'hack':
				return this.hasPlugin(['pipelineOperator', { topicToken: tokenLabelName(s) }]);
			case 'smart':
				return 27 === s;
			default:
				throw this.raise(Errors.PipeTopicRequiresHackPipes, { at: t });
		}
	}
	parseAsyncArrowUnaryFunction(e) {
		this.prodParam.enter(functionFlags(!0, this.prodParam.hasYield));
		const t = [this.parseIdentifier()];
		return this.prodParam.exit(), this.hasPrecedingLineBreak() && this.raise(Errors.LineTerminatorBeforeArrow, { at: this.state.curPosition() }), this.expect(19), this.parseArrowExpression(e, t, !0);
	}
	parseDo(e, t) {
		this.expectPlugin('doExpressions'), t && this.expectPlugin('asyncDoExpressions'), (e.async = t), this.next();
		const s = this.state.labels;
		return (this.state.labels = []), t ? (this.prodParam.enter(2), (e.body = this.parseBlock()), this.prodParam.exit()) : (e.body = this.parseBlock()), (this.state.labels = s), this.finishNode(e, 'DoExpression');
	}
	parseSuper() {
		const e = this.startNode();
		return this.next(), !this.match(10) || this.scope.allowDirectSuper || this.options.allowSuperOutsideMethod ? this.scope.allowSuper || this.options.allowSuperOutsideMethod || this.raise(Errors.UnexpectedSuper, { at: e }) : this.raise(Errors.SuperNotAllowed, { at: e }), this.match(10) || this.match(0) || this.match(16) || this.raise(Errors.UnsupportedSuper, { at: e }), this.finishNode(e, 'Super');
	}
	parsePrivateName() {
		const e = this.startNode(),
			t = this.startNodeAt(createPositionWithColumnOffset(this.state.startLoc, 1)),
			s = this.state.value;
		return this.next(), (e.id = this.createIdentifier(t, s)), this.finishNode(e, 'PrivateName');
	}
	parseFunctionOrFunctionSent() {
		const e = this.startNode();
		if ((this.next(), this.prodParam.hasYield && this.match(16))) {
			const t = this.createIdentifier(this.startNodeAtNode(e), 'function');
			return this.next(), this.match(102) ? this.expectPlugin('functionSent') : this.hasPlugin('functionSent') || this.unexpected(), this.parseMetaProperty(e, t, 'sent');
		}
		return this.parseFunction(e);
	}
	parseMetaProperty(e, t, s) {
		e.meta = t;
		const r = this.state.containsEsc;
		return (e.property = this.parseIdentifier(!0)), (e.property.name !== s || r) && this.raise(Errors.UnsupportedMetaProperty, { at: e.property, target: t.name, onlyValidPropertyName: s }), this.finishNode(e, 'MetaProperty');
	}
	parseImportMetaProperty(e) {
		const t = this.createIdentifier(this.startNodeAtNode(e), 'import');
		return this.next(), this.isContextual(100) && (this.inModule || this.raise(Errors.ImportMetaOutsideModule, { at: t }), (this.sawUnambiguousESM = !0)), this.parseMetaProperty(e, t, 'meta');
	}
	parseLiteralAtNode(e, t, s) {
		return this.addExtra(s, 'rawValue', e), this.addExtra(s, 'raw', this.input.slice(s.start, this.state.end)), (s.value = e), this.next(), this.finishNode(s, t);
	}
	parseLiteral(e, t) {
		const s = this.startNode();
		return this.parseLiteralAtNode(e, t, s);
	}
	parseStringLiteral(e) {
		return this.parseLiteral(e, 'StringLiteral');
	}
	parseNumericLiteral(e) {
		return this.parseLiteral(e, 'NumericLiteral');
	}
	parseBigIntLiteral(e) {
		return this.parseLiteral(e, 'BigIntLiteral');
	}
	parseDecimalLiteral(e) {
		return this.parseLiteral(e, 'DecimalLiteral');
	}
	parseRegExpLiteral(e) {
		const t = this.parseLiteral(e.value, 'RegExpLiteral');
		return (t.pattern = e.pattern), (t.flags = e.flags), t;
	}
	parseBooleanLiteral(e) {
		const t = this.startNode();
		return (t.value = e), this.next(), this.finishNode(t, 'BooleanLiteral');
	}
	parseNullLiteral() {
		const e = this.startNode();
		return this.next(), this.finishNode(e, 'NullLiteral');
	}
	parseParenAndDistinguishExpression(e) {
		const t = this.state.startLoc;
		let s;
		this.next(), this.expressionScope.enter(newArrowHeadScope());
		const r = this.state.maybeInArrowParameters,
			i = this.state.inFSharpPipelineDirectBody;
		(this.state.maybeInArrowParameters = !0), (this.state.inFSharpPipelineDirectBody = !1);
		const a = this.state.startLoc,
			n = [],
			o = new ExpressionErrors();
		let h,
			p,
			c = !0;
		for (; !this.match(11); ) {
			if (c) c = !1;
			else if ((this.expect(12, null === o.optionalParametersLoc ? null : o.optionalParametersLoc), this.match(11))) {
				p = this.state.startLoc;
				break;
			}
			if (this.match(21)) {
				const e = this.state.startLoc;
				if (((h = this.state.startLoc), n.push(this.parseParenItem(this.parseRestBinding(), e)), !this.checkCommaAfterRest(41))) break;
			} else n.push(this.parseMaybeAssignAllowIn(o, this.parseParenItem));
		}
		const l = this.state.lastTokEndLoc;
		this.expect(11), (this.state.maybeInArrowParameters = r), (this.state.inFSharpPipelineDirectBody = i);
		let d = this.startNodeAt(t);
		return e && this.shouldParseArrow(n) && (d = this.parseArrow(d))
			? (this.checkDestructuringPrivate(o), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), this.parseArrowExpression(d, n, !1), d)
			: (this.expressionScope.exit(), n.length || this.unexpected(this.state.lastTokStartLoc), p && this.unexpected(p), h && this.unexpected(h), this.checkExpressionErrors(o, !0), this.toReferencedListDeep(n, !0), n.length > 1 ? ((s = this.startNodeAt(a)), (s.expressions = n), this.finishNode(s, 'SequenceExpression'), this.resetEndLocation(s, l)) : (s = n[0]), this.wrapParenthesis(t, s));
	}
	wrapParenthesis(e, t) {
		if (!this.options.createParenthesizedExpressions) return this.addExtra(t, 'parenthesized', !0), this.addExtra(t, 'parenStart', e.index), this.takeSurroundingComments(t, e.index, this.state.lastTokEndLoc.index), t;
		const s = this.startNodeAt(e);
		return (s.expression = t), this.finishNode(s, 'ParenthesizedExpression');
	}
	shouldParseArrow(e) {
		return !this.canInsertSemicolon();
	}
	parseArrow(e) {
		if (this.eat(19)) return e;
	}
	parseParenItem(e, t) {
		return e;
	}
	parseNewOrNewTarget() {
		const e = this.startNode();
		if ((this.next(), this.match(16))) {
			const t = this.createIdentifier(this.startNodeAtNode(e), 'new');
			this.next();
			const s = this.parseMetaProperty(e, t, 'target');
			return this.scope.inNonArrowFunction || this.scope.inClass || this.options.allowNewTargetOutsideFunction || this.raise(Errors.UnexpectedNewTarget, { at: s }), s;
		}
		return this.parseNew(e);
	}
	parseNew(e) {
		if ((this.parseNewCallee(e), this.eat(10))) {
			const t = this.parseExprList(11);
			this.toReferencedList(t), (e.arguments = t);
		} else e.arguments = [];
		return this.finishNode(e, 'NewExpression');
	}
	parseNewCallee(e) {
		(e.callee = this.parseNoCallExpr()), 'Import' === e.callee.type && this.raise(Errors.ImportCallNotNewExpression, { at: e.callee });
	}
	parseTemplateElement(e) {
		const { start: t, startLoc: s, end: r, value: i } = this.state,
			a = t + 1,
			n = this.startNodeAt(createPositionWithColumnOffset(s, 1));
		null === i && (e || this.raise(Errors.InvalidEscapeSequenceTemplate, { at: createPositionWithColumnOffset(this.state.firstInvalidTemplateEscapePos, 1) }));
		const o = this.match(24),
			h = o ? -1 : -2,
			p = r + h;
		(n.value = { raw: this.input.slice(a, p).replace(/\r\n?/g, '\n'), cooked: null === i ? null : i.slice(1, h) }), (n.tail = o), this.next();
		const c = this.finishNode(n, 'TemplateElement');
		return this.resetEndLocation(c, createPositionWithColumnOffset(this.state.lastTokEndLoc, h)), c;
	}
	parseTemplate(e) {
		const t = this.startNode();
		t.expressions = [];
		let s = this.parseTemplateElement(e);
		for (t.quasis = [s]; !s.tail; ) t.expressions.push(this.parseTemplateSubstitution()), this.readTemplateContinuation(), t.quasis.push((s = this.parseTemplateElement(e)));
		return this.finishNode(t, 'TemplateLiteral');
	}
	parseTemplateSubstitution() {
		return this.parseExpression();
	}
	parseObjectLike(e, t, s, r) {
		s && this.expectPlugin('recordAndTuple');
		const i = this.state.inFSharpPipelineDirectBody;
		this.state.inFSharpPipelineDirectBody = !1;
		const a = Object.create(null);
		let n = !0;
		const o = this.startNode();
		for (o.properties = [], this.next(); !this.match(e); ) {
			if (n) n = !1;
			else if ((this.expect(12), this.match(e))) {
				this.addTrailingCommaExtraToNode(o);
				break;
			}
			let i;
			t ? (i = this.parseBindingProperty()) : ((i = this.parsePropertyDefinition(r)), this.checkProto(i, s, a, r)), s && !this.isObjectProperty(i) && 'SpreadElement' !== i.type && this.raise(Errors.InvalidRecordProperty, { at: i }), i.shorthand && this.addExtra(i, 'shorthand', !0), o.properties.push(i);
		}
		this.next(), (this.state.inFSharpPipelineDirectBody = i);
		let h = 'ObjectExpression';
		return t ? (h = 'ObjectPattern') : s && (h = 'RecordExpression'), this.finishNode(o, h);
	}
	addTrailingCommaExtraToNode(e) {
		this.addExtra(e, 'trailingComma', this.state.lastTokStart), this.addExtra(e, 'trailingCommaLoc', this.state.lastTokStartLoc, !1);
	}
	maybeAsyncOrAccessorProp(e) {
		return !e.computed && 'Identifier' === e.key.type && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
	}
	parsePropertyDefinition(e) {
		let t = [];
		if (this.match(26)) for (this.hasPlugin('decorators') && this.raise(Errors.UnsupportedPropertyDecorator, { at: this.state.startLoc }); this.match(26); ) t.push(this.parseDecorator());
		const s = this.startNode();
		let r,
			i = !1,
			a = !1;
		if (this.match(21)) return t.length && this.unexpected(), this.parseSpread();
		t.length && ((s.decorators = t), (t = [])), (s.method = !1), e && (r = this.state.startLoc);
		let n = this.eat(55);
		this.parsePropertyNamePrefixOperator(s);
		const o = this.state.containsEsc,
			h = this.parsePropertyName(s, e);
		if (!n && !o && this.maybeAsyncOrAccessorProp(s)) {
			const e = h.name;
			'async' !== e || this.hasPrecedingLineBreak() || ((i = !0), this.resetPreviousNodeTrailingComments(h), (n = this.eat(55)), this.parsePropertyName(s)), ('get' !== e && 'set' !== e) || ((a = !0), this.resetPreviousNodeTrailingComments(h), (s.kind = e), this.match(55) && ((n = !0), this.raise(Errors.AccessorIsGenerator, { at: this.state.curPosition(), kind: e }), this.next()), this.parsePropertyName(s));
		}
		return this.parseObjPropValue(s, r, n, i, !1, a, e);
	}
	getGetterSetterExpectedParamCount(e) {
		return 'get' === e.kind ? 0 : 1;
	}
	getObjectOrClassMethodParams(e) {
		return e.params;
	}
	checkGetterSetterParams(e) {
		var t;
		const s = this.getGetterSetterExpectedParamCount(e),
			r = this.getObjectOrClassMethodParams(e);
		r.length !== s && this.raise('get' === e.kind ? Errors.BadGetterArity : Errors.BadSetterArity, { at: e }), 'set' === e.kind && 'RestElement' === (null == (t = r[r.length - 1]) ? void 0 : t.type) && this.raise(Errors.BadSetterRestParameter, { at: e });
	}
	parseObjectMethod(e, t, s, r, i) {
		if (i) {
			const s = this.parseMethod(e, t, !1, !1, !1, 'ObjectMethod');
			return this.checkGetterSetterParams(s), s;
		}
		if (s || t || this.match(10)) return r && this.unexpected(), (e.kind = 'method'), (e.method = !0), this.parseMethod(e, t, s, !1, !1, 'ObjectMethod');
	}
	parseObjectProperty(e, t, s, r) {
		if (((e.shorthand = !1), this.eat(14))) return (e.value = s ? this.parseMaybeDefault(this.state.startLoc) : this.parseMaybeAssignAllowIn(r)), this.finishNode(e, 'ObjectProperty');
		if (!e.computed && 'Identifier' === e.key.type) {
			if ((this.checkReservedWord(e.key.name, e.key.loc.start, !0, !1), s)) e.value = this.parseMaybeDefault(t, cloneIdentifier(e.key));
			else if (this.match(29)) {
				const s = this.state.startLoc;
				null != r ? null === r.shorthandAssignLoc && (r.shorthandAssignLoc = s) : this.raise(Errors.InvalidCoverInitializedName, { at: s }), (e.value = this.parseMaybeDefault(t, cloneIdentifier(e.key)));
			} else e.value = cloneIdentifier(e.key);
			return (e.shorthand = !0), this.finishNode(e, 'ObjectProperty');
		}
	}
	parseObjPropValue(e, t, s, r, i, a, n) {
		const o = this.parseObjectMethod(e, s, r, i, a) || this.parseObjectProperty(e, t, i, n);
		return o || this.unexpected(), o;
	}
	parsePropertyName(e, t) {
		if (this.eat(0)) (e.computed = !0), (e.key = this.parseMaybeAssignAllowIn()), this.expect(3);
		else {
			const { type: s, value: r } = this.state;
			let i;
			if (tokenIsKeywordOrIdentifier(s)) i = this.parseIdentifier(!0);
			else
				switch (s) {
					case 132:
						i = this.parseNumericLiteral(r);
						break;
					case 131:
						i = this.parseStringLiteral(r);
						break;
					case 133:
						i = this.parseBigIntLiteral(r);
						break;
					case 134:
						i = this.parseDecimalLiteral(r);
						break;
					case 136: {
						const e = this.state.startLoc;
						null != t ? null === t.privateKeyLoc && (t.privateKeyLoc = e) : this.raise(Errors.UnexpectedPrivateField, { at: e }), (i = this.parsePrivateName());
						break;
					}
					default:
						this.unexpected();
				}
			(e.key = i), 136 !== s && (e.computed = !1);
		}
		return e.key;
	}
	initFunction(e, t) {
		(e.id = null), (e.generator = !1), (e.async = t);
	}
	parseMethod(e, t, s, r, i, a, n = !1) {
		this.initFunction(e, s), (e.generator = t), this.scope.enter(18 | (n ? 64 : 0) | (i ? 32 : 0)), this.prodParam.enter(functionFlags(s, e.generator)), this.parseFunctionParams(e, r);
		const o = this.parseFunctionBodyAndFinish(e, a, !0);
		return this.prodParam.exit(), this.scope.exit(), o;
	}
	parseArrayLike(e, t, s, r) {
		s && this.expectPlugin('recordAndTuple');
		const i = this.state.inFSharpPipelineDirectBody;
		this.state.inFSharpPipelineDirectBody = !1;
		const a = this.startNode();
		return this.next(), (a.elements = this.parseExprList(e, !s, r, a)), (this.state.inFSharpPipelineDirectBody = i), this.finishNode(a, s ? 'TupleExpression' : 'ArrayExpression');
	}
	parseArrowExpression(e, t, s, r) {
		this.scope.enter(6);
		let i = functionFlags(s, !1);
		!this.match(5) && this.prodParam.hasIn && (i |= 8), this.prodParam.enter(i), this.initFunction(e, s);
		const a = this.state.maybeInArrowParameters;
		return t && ((this.state.maybeInArrowParameters = !0), this.setArrowFunctionParameters(e, t, r)), (this.state.maybeInArrowParameters = !1), this.parseFunctionBody(e, !0), this.prodParam.exit(), this.scope.exit(), (this.state.maybeInArrowParameters = a), this.finishNode(e, 'ArrowFunctionExpression');
	}
	setArrowFunctionParameters(e, t, s) {
		this.toAssignableList(t, s, !1), (e.params = t);
	}
	parseFunctionBodyAndFinish(e, t, s = !1) {
		return this.parseFunctionBody(e, !1, s), this.finishNode(e, t);
	}
	parseFunctionBody(e, t, s = !1) {
		const r = t && !this.match(5);
		if ((this.expressionScope.enter(newExpressionScope()), r)) (e.body = this.parseMaybeAssign()), this.checkParams(e, !1, t, !1);
		else {
			const r = this.state.strict,
				i = this.state.labels;
			(this.state.labels = []),
				this.prodParam.enter(4 | this.prodParam.currentFlags()),
				(e.body = this.parseBlock(!0, !1, (i) => {
					const a = !this.isSimpleParamList(e.params);
					i && a && this.raise(Errors.IllegalLanguageModeDirective, { at: ('method' !== e.kind && 'constructor' !== e.kind) || !e.key ? e : e.key.loc.end });
					const n = !r && this.state.strict;
					this.checkParams(e, !(this.state.strict || t || s || a), t, n), this.state.strict && e.id && this.checkIdentifier(e.id, 65, n);
				})),
				this.prodParam.exit(),
				(this.state.labels = i);
		}
		this.expressionScope.exit();
	}
	isSimpleParameter(e) {
		return 'Identifier' === e.type;
	}
	isSimpleParamList(e) {
		for (let t = 0, s = e.length; t < s; t++) if (!this.isSimpleParameter(e[t])) return !1;
		return !0;
	}
	checkParams(e, t, s, r = !0) {
		const i = !t && new Set(),
			a = { type: 'FormalParameters' };
		for (const t of e.params) this.checkLVal(t, { in: a, binding: 5, checkClashes: i, strictModeChanged: r });
	}
	parseExprList(e, t, s, r) {
		const i = [];
		let a = !0;
		for (; !this.eat(e); ) {
			if (a) a = !1;
			else if ((this.expect(12), this.match(e))) {
				r && this.addTrailingCommaExtraToNode(r), this.next();
				break;
			}
			i.push(this.parseExprListItem(t, s));
		}
		return i;
	}
	parseExprListItem(e, t, s) {
		let r;
		if (this.match(12)) e || this.raise(Errors.UnexpectedToken, { at: this.state.curPosition(), unexpected: ',' }), (r = null);
		else if (this.match(21)) {
			const e = this.state.startLoc;
			r = this.parseParenItem(this.parseSpread(t), e);
		} else if (this.match(17)) {
			this.expectPlugin('partialApplication'), s || this.raise(Errors.UnexpectedArgumentPlaceholder, { at: this.state.startLoc });
			const e = this.startNode();
			this.next(), (r = this.finishNode(e, 'ArgumentPlaceholder'));
		} else r = this.parseMaybeAssignAllowIn(t, this.parseParenItem);
		return r;
	}
	parseIdentifier(e) {
		const t = this.startNode(),
			s = this.parseIdentifierName(e);
		return this.createIdentifier(t, s);
	}
	createIdentifier(e, t) {
		return (e.name = t), (e.loc.identifierName = t), this.finishNode(e, 'Identifier');
	}
	parseIdentifierName(e) {
		let t;
		const { startLoc: s, type: r } = this.state;
		tokenIsKeywordOrIdentifier(r) ? (t = this.state.value) : this.unexpected();
		const i = tokenKeywordOrIdentifierIsKeyword(r);
		return e ? i && this.replaceToken(130) : this.checkReservedWord(t, s, i, !1), this.next(), t;
	}
	checkReservedWord(e, t, s, r) {
		if (e.length > 10) return;
		if (!canBeReservedWord(e)) return;
		if (s && isKeyword(e)) return void this.raise(Errors.UnexpectedKeyword, { at: t, keyword: e });
		if ((this.state.strict ? (r ? isStrictBindReservedWord : isStrictReservedWord) : isReservedWord)(e, this.inModule)) this.raise(Errors.UnexpectedReservedWord, { at: t, reservedWord: e });
		else if ('yield' === e) {
			if (this.prodParam.hasYield) return void this.raise(Errors.YieldBindingIdentifier, { at: t });
		} else if ('await' === e) {
			if (this.prodParam.hasAwait) return void this.raise(Errors.AwaitBindingIdentifier, { at: t });
			if (this.scope.inStaticBlock) return void this.raise(Errors.AwaitBindingIdentifierInStaticBlock, { at: t });
			this.expressionScope.recordAsyncArrowParametersError({ at: t });
		} else if ('arguments' === e && this.scope.inClassAndNotInNonArrowFunction) return void this.raise(Errors.ArgumentsInClass, { at: t });
	}
	isAwaitAllowed() {
		return !!this.prodParam.hasAwait || !(!this.options.allowAwaitOutsideFunction || this.scope.inFunction);
	}
	parseAwait(e) {
		const t = this.startNodeAt(e);
		return this.expressionScope.recordParameterInitializerError(Errors.AwaitExpressionFormalParameter, { at: t }), this.eat(55) && this.raise(Errors.ObsoleteAwaitStar, { at: t }), this.scope.inFunction || this.options.allowAwaitOutsideFunction || (this.isAmbiguousAwait() ? (this.ambiguousScriptDifferentAst = !0) : (this.sawUnambiguousESM = !0)), this.state.soloAwait || (t.argument = this.parseMaybeUnary(null, !0)), this.finishNode(t, 'AwaitExpression');
	}
	isAmbiguousAwait() {
		if (this.hasPrecedingLineBreak()) return !0;
		const { type: e } = this.state;
		return 53 === e || 10 === e || 0 === e || tokenIsTemplate(e) || (101 === e && !this.state.containsEsc) || 135 === e || 56 === e || (this.hasPlugin('v8intrinsic') && 54 === e);
	}
	parseYield() {
		const e = this.startNode();
		this.expressionScope.recordParameterInitializerError(Errors.YieldInParameter, { at: e }), this.next();
		let t = !1,
			s = null;
		if (!this.hasPrecedingLineBreak())
			switch (((t = this.eat(55)), this.state.type)) {
				case 13:
				case 137:
				case 8:
				case 11:
				case 3:
				case 9:
				case 14:
				case 12:
					if (!t) break;
				default:
					s = this.parseMaybeAssign();
			}
		return (e.delegate = t), (e.argument = s), this.finishNode(e, 'YieldExpression');
	}
	checkPipelineAtInfixOperator(e, t) {
		this.hasPlugin(['pipelineOperator', { proposal: 'smart' }]) && 'SequenceExpression' === e.type && this.raise(Errors.PipelineHeadSequenceExpression, { at: t });
	}
	parseSmartPipelineBodyInStyle(e, t) {
		if (this.isSimpleReference(e)) {
			const s = this.startNodeAt(t);
			return (s.callee = e), this.finishNode(s, 'PipelineBareFunction');
		}
		{
			const s = this.startNodeAt(t);
			return this.checkSmartPipeTopicBodyEarlyErrors(t), (s.expression = e), this.finishNode(s, 'PipelineTopicExpression');
		}
	}
	isSimpleReference(e) {
		switch (e.type) {
			case 'MemberExpression':
				return !e.computed && this.isSimpleReference(e.object);
			case 'Identifier':
				return !0;
			default:
				return !1;
		}
	}
	checkSmartPipeTopicBodyEarlyErrors(e) {
		if (this.match(19)) throw this.raise(Errors.PipelineBodyNoArrow, { at: this.state.startLoc });
		this.topicReferenceWasUsedInCurrentContext() || this.raise(Errors.PipelineTopicUnused, { at: e });
	}
	withTopicBindingContext(e) {
		const t = this.state.topicContext;
		this.state.topicContext = { maxNumOfResolvableTopics: 1, maxTopicIndex: null };
		try {
			return e();
		} finally {
			this.state.topicContext = t;
		}
	}
	withSmartMixTopicForbiddingContext(e) {
		if (!this.hasPlugin(['pipelineOperator', { proposal: 'smart' }])) return e();
		{
			const t = this.state.topicContext;
			this.state.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null };
			try {
				return e();
			} finally {
				this.state.topicContext = t;
			}
		}
	}
	withSoloAwaitPermittingContext(e) {
		const t = this.state.soloAwait;
		this.state.soloAwait = !0;
		try {
			return e();
		} finally {
			this.state.soloAwait = t;
		}
	}
	allowInAnd(e) {
		const t = this.prodParam.currentFlags();
		if (8 & ~t) {
			this.prodParam.enter(8 | t);
			try {
				return e();
			} finally {
				this.prodParam.exit();
			}
		}
		return e();
	}
	disallowInAnd(e) {
		const t = this.prodParam.currentFlags();
		if (8 & t) {
			this.prodParam.enter(-9 & t);
			try {
				return e();
			} finally {
				this.prodParam.exit();
			}
		}
		return e();
	}
	registerTopicReference() {
		this.state.topicContext.maxTopicIndex = 0;
	}
	topicReferenceIsAllowedInCurrentContext() {
		return this.state.topicContext.maxNumOfResolvableTopics >= 1;
	}
	topicReferenceWasUsedInCurrentContext() {
		return null != this.state.topicContext.maxTopicIndex && this.state.topicContext.maxTopicIndex >= 0;
	}
	parseFSharpPipelineBody(e) {
		const t = this.state.startLoc;
		this.state.potentialArrowAt = this.state.start;
		const s = this.state.inFSharpPipelineDirectBody;
		this.state.inFSharpPipelineDirectBody = !0;
		const r = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), t, e);
		return (this.state.inFSharpPipelineDirectBody = s), r;
	}
	parseModuleExpression() {
		this.expectPlugin('moduleBlocks');
		const e = this.startNode();
		this.next(), this.match(5) || this.unexpected(null, 5);
		const t = this.startNodeAt(this.state.endLoc);
		this.next();
		const s = this.initializeScopes(!0);
		this.enterInitialScopes();
		try {
			e.body = this.parseProgram(t, 8, 'module');
		} finally {
			s();
		}
		return this.finishNode(e, 'ModuleExpression');
	}
	parsePropertyNamePrefixOperator(e) {}
}
const loopLabel = { kind: 'loop' },
	switchLabel = { kind: 'switch' },
	loneSurrogate = /[\uD800-\uDFFF]/u,
	keywordRelationalOperator = /in(?:stanceof)?/y;
function babel7CompatTokens(e, t) {
	for (let s = 0; s < e.length; s++) {
		const r = e[s],
			{ type: i } = r;
		if ('number' == typeof i) {
			if (136 === i) {
				const { loc: t, start: i, value: a, end: n } = r,
					o = i + 1,
					h = createPositionWithColumnOffset(t.start, 1);
				e.splice(s, 1, new Token({ type: getExportedToken(27), value: '#', start: i, end: o, startLoc: t.start, endLoc: h }), new Token({ type: getExportedToken(130), value: a, start: o, end: n, startLoc: h, endLoc: t.end })), s++;
				continue;
			}
			if (tokenIsTemplate(i)) {
				const { loc: a, start: n, value: o, end: h } = r,
					p = n + 1,
					c = createPositionWithColumnOffset(a.start, 1);
				let l, d, u, m, f;
				(l = 96 === t.charCodeAt(n) ? new Token({ type: getExportedToken(22), value: '`', start: n, end: p, startLoc: a.start, endLoc: c }) : new Token({ type: getExportedToken(8), value: '}', start: n, end: p, startLoc: a.start, endLoc: c })),
					24 === i ? ((u = h - 1), (m = createPositionWithColumnOffset(a.end, -1)), (d = null === o ? null : o.slice(1, -1)), (f = new Token({ type: getExportedToken(22), value: '`', start: u, end: h, startLoc: m, endLoc: a.end }))) : ((u = h - 2), (m = createPositionWithColumnOffset(a.end, -2)), (d = null === o ? null : o.slice(1, -2)), (f = new Token({ type: getExportedToken(23), value: '${', start: u, end: h, startLoc: m, endLoc: a.end }))),
					e.splice(s, 1, l, new Token({ type: getExportedToken(20), value: d, start: p, end: u, startLoc: c, endLoc: m }), f),
					(s += 2);
				continue;
			}
			r.type = getExportedToken(i);
		}
	}
	return e;
}
class StatementParser extends ExpressionParser {
	parseTopLevel(e, t) {
		return (e.program = this.parseProgram(t)), (e.comments = this.state.comments), this.options.tokens && (e.tokens = babel7CompatTokens(this.tokens, this.input)), this.finishNode(e, 'File');
	}
	parseProgram(e, t = 137, s = this.options.sourceType) {
		if (((e.sourceType = s), (e.interpreter = this.parseInterpreterDirective()), this.parseBlockBody(e, !0, !0, t), this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0)) for (const [e, t] of Array.from(this.scope.undefinedExports)) this.raise(Errors.ModuleExportUndefined, { at: t, localName: e });
		let r;
		return (r = 137 === t ? this.finishNode(e, 'Program') : this.finishNodeAt(e, 'Program', createPositionWithColumnOffset(this.state.startLoc, -1))), r;
	}
	stmtToDirective(e) {
		const t = e;
		(t.type = 'Directive'), (t.value = t.expression), delete t.expression;
		const s = t.value,
			r = s.value,
			i = this.input.slice(s.start, s.end),
			a = (s.value = i.slice(1, -1));
		return this.addExtra(s, 'raw', i), this.addExtra(s, 'rawValue', a), this.addExtra(s, 'expressionValue', r), (s.type = 'DirectiveLiteral'), t;
	}
	parseInterpreterDirective() {
		if (!this.match(28)) return null;
		const e = this.startNode();
		return (e.value = this.state.value), this.next(), this.finishNode(e, 'InterpreterDirective');
	}
	isLet() {
		return !!this.isContextual(99) && this.hasFollowingBindingAtom();
	}
	chStartsBindingIdentifier(e, t) {
		if (isIdentifierStart(e)) {
			if (((keywordRelationalOperator.lastIndex = t), keywordRelationalOperator.test(this.input))) {
				const e = this.codePointAtPos(keywordRelationalOperator.lastIndex);
				if (!isIdentifierChar(e) && 92 !== e) return !1;
			}
			return !0;
		}
		return 92 === e;
	}
	chStartsBindingPattern(e) {
		return 91 === e || 123 === e;
	}
	hasFollowingBindingAtom() {
		const e = this.nextTokenStart(),
			t = this.codePointAtPos(e);
		return this.chStartsBindingPattern(t) || this.chStartsBindingIdentifier(t, e);
	}
	hasInLineFollowingBindingIdentifier() {
		const e = this.nextTokenInLineStart(),
			t = this.codePointAtPos(e);
		return this.chStartsBindingIdentifier(t, e);
	}
	startsUsingForOf() {
		const { type: e, containsEsc: t } = this.lookahead();
		return !(101 === e && !t) && (tokenIsIdentifier(e) && !this.hasFollowingLineBreak() ? (this.expectPlugin('explicitResourceManagement'), !0) : void 0);
	}
	startsAwaitUsing() {
		let e = this.nextTokenInLineStart();
		if (this.isUnparsedContextual(e, 'using')) {
			e = this.nextTokenInLineStartSince(e + 5);
			const t = this.codePointAtPos(e);
			if (this.chStartsBindingIdentifier(t, e)) return this.expectPlugin('explicitResourceManagement'), !0;
		}
		return !1;
	}
	parseModuleItem() {
		return this.parseStatementLike(15);
	}
	parseStatementListItem() {
		return this.parseStatementLike(6 | (!this.options.annexB || this.state.strict ? 0 : 8));
	}
	parseStatementOrSloppyAnnexBFunctionDeclaration(e = !1) {
		let t = 0;
		return this.options.annexB && !this.state.strict && ((t |= 4), e && (t |= 8)), this.parseStatementLike(t);
	}
	parseStatement() {
		return this.parseStatementLike(0);
	}
	parseStatementLike(e) {
		let t = null;
		return this.match(26) && (t = this.parseDecorators(!0)), this.parseStatementContent(e, t);
	}
	parseStatementContent(e, t) {
		const s = this.state.type,
			r = this.startNode(),
			i = !!(2 & e),
			a = !!(4 & e),
			n = 1 & e;
		switch (s) {
			case 60:
				return this.parseBreakContinueStatement(r, !0);
			case 63:
				return this.parseBreakContinueStatement(r, !1);
			case 64:
				return this.parseDebuggerStatement(r);
			case 90:
				return this.parseDoWhileStatement(r);
			case 91:
				return this.parseForStatement(r);
			case 68:
				if (46 === this.lookaheadCharCode()) break;
				return a || this.raise(this.state.strict ? Errors.StrictFunction : this.options.annexB ? Errors.SloppyFunctionAnnexB : Errors.SloppyFunction, { at: this.state.startLoc }), this.parseFunctionStatement(r, !1, !i && a);
			case 80:
				return i || this.unexpected(), this.parseClass(this.maybeTakeDecorators(t, r), !0);
			case 69:
				return this.parseIfStatement(r);
			case 70:
				return this.parseReturnStatement(r);
			case 71:
				return this.parseSwitchStatement(r);
			case 72:
				return this.parseThrowStatement(r);
			case 73:
				return this.parseTryStatement(r);
			case 96:
				if (!this.state.containsEsc && this.startsAwaitUsing()) return this.isAwaitAllowed() ? i || this.raise(Errors.UnexpectedLexicalDeclaration, { at: r }) : this.raise(Errors.AwaitUsingNotInAsyncContext, { at: r }), this.next(), this.parseVarStatement(r, 'await using');
				break;
			case 105:
				if (this.state.containsEsc || !this.hasInLineFollowingBindingIdentifier()) break;
				return this.expectPlugin('explicitResourceManagement'), !this.scope.inModule && this.scope.inTopLevel ? this.raise(Errors.UnexpectedUsingDeclaration, { at: this.state.startLoc }) : i || this.raise(Errors.UnexpectedLexicalDeclaration, { at: this.state.startLoc }), this.parseVarStatement(r, 'using');
			case 99: {
				if (this.state.containsEsc) break;
				const e = this.nextTokenStart(),
					t = this.codePointAtPos(e);
				if (91 !== t) {
					if (!i && this.hasFollowingLineBreak()) break;
					if (!this.chStartsBindingIdentifier(t, e) && 123 !== t) break;
				}
			}
			case 75:
				i || this.raise(Errors.UnexpectedLexicalDeclaration, { at: this.state.startLoc });
			case 74: {
				const e = this.state.value;
				return this.parseVarStatement(r, e);
			}
			case 92:
				return this.parseWhileStatement(r);
			case 76:
				return this.parseWithStatement(r);
			case 5:
				return this.parseBlock();
			case 13:
				return this.parseEmptyStatement(r);
			case 83: {
				const e = this.lookaheadCharCode();
				if (40 === e || 46 === e) break;
			}
			case 82: {
				let e;
				return (
					this.options.allowImportExportEverywhere || n || this.raise(Errors.UnexpectedImportExport, { at: this.state.startLoc }),
					this.next(),
					83 === s ? ((e = this.parseImport(r)), 'ImportDeclaration' !== e.type || (e.importKind && 'value' !== e.importKind) || (this.sawUnambiguousESM = !0)) : ((e = this.parseExport(r, t)), (('ExportNamedDeclaration' !== e.type || (e.exportKind && 'value' !== e.exportKind)) && ('ExportAllDeclaration' !== e.type || (e.exportKind && 'value' !== e.exportKind)) && 'ExportDefaultDeclaration' !== e.type) || (this.sawUnambiguousESM = !0)),
					this.assertModuleNodeAllowed(e),
					e
				);
			}
			default:
				if (this.isAsyncFunction()) return i || this.raise(Errors.AsyncFunctionInSingleStatementContext, { at: this.state.startLoc }), this.next(), this.parseFunctionStatement(r, !0, !i && a);
		}
		const o = this.state.value,
			h = this.parseExpression();
		return tokenIsIdentifier(s) && 'Identifier' === h.type && this.eat(14) ? this.parseLabeledStatement(r, o, h, e) : this.parseExpressionStatement(r, h, t);
	}
	assertModuleNodeAllowed(e) {
		this.options.allowImportExportEverywhere || this.inModule || this.raise(Errors.ImportOutsideModule, { at: e });
	}
	decoratorsEnabledBeforeExport() {
		return !!this.hasPlugin('decorators-legacy') || (this.hasPlugin('decorators') && !1 !== this.getPluginOption('decorators', 'decoratorsBeforeExport'));
	}
	maybeTakeDecorators(e, t, s) {
		return e && (t.decorators && t.decorators.length > 0 ? ('boolean' != typeof this.getPluginOption('decorators', 'decoratorsBeforeExport') && this.raise(Errors.DecoratorsBeforeAfterExport, { at: t.decorators[0] }), t.decorators.unshift(...e)) : (t.decorators = e), this.resetStartLocationFromNode(t, e[0]), s && this.resetStartLocationFromNode(s, t)), t;
	}
	canHaveLeadingDecorator() {
		return this.match(80);
	}
	parseDecorators(e) {
		const t = [];
		do {
			t.push(this.parseDecorator());
		} while (this.match(26));
		if (this.match(82)) e || this.unexpected(), this.decoratorsEnabledBeforeExport() || this.raise(Errors.DecoratorExportClass, { at: this.state.startLoc });
		else if (!this.canHaveLeadingDecorator()) throw this.raise(Errors.UnexpectedLeadingDecorator, { at: this.state.startLoc });
		return t;
	}
	parseDecorator() {
		this.expectOnePlugin(['decorators', 'decorators-legacy']);
		const e = this.startNode();
		if ((this.next(), this.hasPlugin('decorators'))) {
			const t = this.state.startLoc;
			let s;
			if (this.match(10)) {
				const t = this.state.startLoc;
				this.next(), (s = this.parseExpression()), this.expect(11), (s = this.wrapParenthesis(t, s));
				const r = this.state.startLoc;
				(e.expression = this.parseMaybeDecoratorArguments(s)), !1 === this.getPluginOption('decorators', 'allowCallParenthesized') && e.expression !== s && this.raise(Errors.DecoratorArgumentsOutsideParentheses, { at: r });
			} else {
				for (s = this.parseIdentifier(!1); this.eat(16); ) {
					const e = this.startNodeAt(t);
					(e.object = s), this.match(136) ? (this.classScope.usePrivateName(this.state.value, this.state.startLoc), (e.property = this.parsePrivateName())) : (e.property = this.parseIdentifier(!0)), (e.computed = !1), (s = this.finishNode(e, 'MemberExpression'));
				}
				e.expression = this.parseMaybeDecoratorArguments(s);
			}
		} else e.expression = this.parseExprSubscripts();
		return this.finishNode(e, 'Decorator');
	}
	parseMaybeDecoratorArguments(e) {
		if (this.eat(10)) {
			const t = this.startNodeAtNode(e);
			return (t.callee = e), (t.arguments = this.parseCallExpressionArguments(11, !1)), this.toReferencedList(t.arguments), this.finishNode(t, 'CallExpression');
		}
		return e;
	}
	parseBreakContinueStatement(e, t) {
		return this.next(), this.isLineTerminator() ? (e.label = null) : ((e.label = this.parseIdentifier()), this.semicolon()), this.verifyBreakContinue(e, t), this.finishNode(e, t ? 'BreakStatement' : 'ContinueStatement');
	}
	verifyBreakContinue(e, t) {
		let s;
		for (s = 0; s < this.state.labels.length; ++s) {
			const r = this.state.labels[s];
			if (null == e.label || r.name === e.label.name) {
				if (null != r.kind && (t || 'loop' === r.kind)) break;
				if (e.label && t) break;
			}
		}
		if (s === this.state.labels.length) {
			const s = t ? 'BreakStatement' : 'ContinueStatement';
			this.raise(Errors.IllegalBreakContinue, { at: e, type: s });
		}
	}
	parseDebuggerStatement(e) {
		return this.next(), this.semicolon(), this.finishNode(e, 'DebuggerStatement');
	}
	parseHeaderExpression() {
		this.expect(10);
		const e = this.parseExpression();
		return this.expect(11), e;
	}
	parseDoWhileStatement(e) {
		return this.next(), this.state.labels.push(loopLabel), (e.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement())), this.state.labels.pop(), this.expect(92), (e.test = this.parseHeaderExpression()), this.eat(13), this.finishNode(e, 'DoWhileStatement');
	}
	parseForStatement(e) {
		this.next(), this.state.labels.push(loopLabel);
		let t = null;
		if ((this.isAwaitAllowed() && this.eatContextual(96) && (t = this.state.lastTokStartLoc), this.scope.enter(0), this.expect(10), this.match(13))) return null !== t && this.unexpected(t), this.parseFor(e, null);
		const s = this.isContextual(99);
		{
			const r = this.isContextual(96) && this.startsAwaitUsing(),
				i = r || (this.isContextual(105) && this.startsUsingForOf()),
				a = (s && this.hasFollowingBindingAtom()) || i;
			if (this.match(74) || this.match(75) || a) {
				const s = this.startNode();
				let a;
				r ? ((a = 'await using'), this.isAwaitAllowed() || this.raise(Errors.AwaitUsingNotInAsyncContext, { at: this.state.startLoc }), this.next()) : (a = this.state.value), this.next(), this.parseVar(s, !0, a);
				const n = this.finishNode(s, 'VariableDeclaration'),
					o = this.match(58);
				return o && i && this.raise(Errors.ForInUsing, { at: n }), (o || this.isContextual(101)) && 1 === n.declarations.length ? this.parseForIn(e, n, t) : (null !== t && this.unexpected(t), this.parseFor(e, n));
			}
		}
		const r = this.isContextual(95),
			i = new ExpressionErrors(),
			a = this.parseExpression(!0, i),
			n = this.isContextual(101);
		if ((n && (s && this.raise(Errors.ForOfLet, { at: a }), null === t && r && 'Identifier' === a.type && this.raise(Errors.ForOfAsync, { at: a })), n || this.match(58))) {
			this.checkDestructuringPrivate(i), this.toAssignable(a, !0);
			const s = n ? 'ForOfStatement' : 'ForInStatement';
			return this.checkLVal(a, { in: { type: s } }), this.parseForIn(e, a, t);
		}
		return this.checkExpressionErrors(i, !0), null !== t && this.unexpected(t), this.parseFor(e, a);
	}
	parseFunctionStatement(e, t, s) {
		return this.next(), this.parseFunction(e, 1 | (s ? 2 : 0) | (t ? 8 : 0));
	}
	parseIfStatement(e) {
		return this.next(), (e.test = this.parseHeaderExpression()), (e.consequent = this.parseStatementOrSloppyAnnexBFunctionDeclaration()), (e.alternate = this.eat(66) ? this.parseStatementOrSloppyAnnexBFunctionDeclaration() : null), this.finishNode(e, 'IfStatement');
	}
	parseReturnStatement(e) {
		return this.prodParam.hasReturn || this.options.allowReturnOutsideFunction || this.raise(Errors.IllegalReturn, { at: this.state.startLoc }), this.next(), this.isLineTerminator() ? (e.argument = null) : ((e.argument = this.parseExpression()), this.semicolon()), this.finishNode(e, 'ReturnStatement');
	}
	parseSwitchStatement(e) {
		this.next(), (e.discriminant = this.parseHeaderExpression());
		const t = (e.cases = []);
		let s;
		this.expect(5), this.state.labels.push(switchLabel), this.scope.enter(0);
		for (let e; !this.match(8); )
			if (this.match(61) || this.match(65)) {
				const r = this.match(61);
				s && this.finishNode(s, 'SwitchCase'), t.push((s = this.startNode())), (s.consequent = []), this.next(), r ? (s.test = this.parseExpression()) : (e && this.raise(Errors.MultipleDefaultsInSwitch, { at: this.state.lastTokStartLoc }), (e = !0), (s.test = null)), this.expect(14);
			} else s ? s.consequent.push(this.parseStatementListItem()) : this.unexpected();
		return this.scope.exit(), s && this.finishNode(s, 'SwitchCase'), this.next(), this.state.labels.pop(), this.finishNode(e, 'SwitchStatement');
	}
	parseThrowStatement(e) {
		return this.next(), this.hasPrecedingLineBreak() && this.raise(Errors.NewlineAfterThrow, { at: this.state.lastTokEndLoc }), (e.argument = this.parseExpression()), this.semicolon(), this.finishNode(e, 'ThrowStatement');
	}
	parseCatchClauseParam() {
		const e = this.parseBindingAtom();
		return this.scope.enter(this.options.annexB && 'Identifier' === e.type ? 8 : 0), this.checkLVal(e, { in: { type: 'CatchClause' }, binding: 9 }), e;
	}
	parseTryStatement(e) {
		if ((this.next(), (e.block = this.parseBlock()), (e.handler = null), this.match(62))) {
			const t = this.startNode();
			this.next(), this.match(10) ? (this.expect(10), (t.param = this.parseCatchClauseParam()), this.expect(11)) : ((t.param = null), this.scope.enter(0)), (t.body = this.withSmartMixTopicForbiddingContext(() => this.parseBlock(!1, !1))), this.scope.exit(), (e.handler = this.finishNode(t, 'CatchClause'));
		}
		return (e.finalizer = this.eat(67) ? this.parseBlock() : null), e.handler || e.finalizer || this.raise(Errors.NoCatchOrFinally, { at: e }), this.finishNode(e, 'TryStatement');
	}
	parseVarStatement(e, t, s = !1) {
		return this.next(), this.parseVar(e, !1, t, s), this.semicolon(), this.finishNode(e, 'VariableDeclaration');
	}
	parseWhileStatement(e) {
		return this.next(), (e.test = this.parseHeaderExpression()), this.state.labels.push(loopLabel), (e.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement())), this.state.labels.pop(), this.finishNode(e, 'WhileStatement');
	}
	parseWithStatement(e) {
		return this.state.strict && this.raise(Errors.StrictWith, { at: this.state.startLoc }), this.next(), (e.object = this.parseHeaderExpression()), (e.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement())), this.finishNode(e, 'WithStatement');
	}
	parseEmptyStatement(e) {
		return this.next(), this.finishNode(e, 'EmptyStatement');
	}
	parseLabeledStatement(e, t, s, r) {
		for (const e of this.state.labels) e.name === t && this.raise(Errors.LabelRedeclaration, { at: s, labelName: t });
		const i = tokenIsLoop(this.state.type) ? 'loop' : this.match(71) ? 'switch' : null;
		for (let t = this.state.labels.length - 1; t >= 0; t--) {
			const s = this.state.labels[t];
			if (s.statementStart !== e.start) break;
			(s.statementStart = this.state.start), (s.kind = i);
		}
		return this.state.labels.push({ name: t, kind: i, statementStart: this.state.start }), (e.body = 8 & r ? this.parseStatementOrSloppyAnnexBFunctionDeclaration(!0) : this.parseStatement()), this.state.labels.pop(), (e.label = s), this.finishNode(e, 'LabeledStatement');
	}
	parseExpressionStatement(e, t, s) {
		return (e.expression = t), this.semicolon(), this.finishNode(e, 'ExpressionStatement');
	}
	parseBlock(e = !1, t = !0, s) {
		const r = this.startNode();
		return e && this.state.strictErrors.clear(), this.expect(5), t && this.scope.enter(0), this.parseBlockBody(r, e, !1, 8, s), t && this.scope.exit(), this.finishNode(r, 'BlockStatement');
	}
	isValidDirective(e) {
		return 'ExpressionStatement' === e.type && 'StringLiteral' === e.expression.type && !e.expression.extra.parenthesized;
	}
	parseBlockBody(e, t, s, r, i) {
		const a = (e.body = []),
			n = (e.directives = []);
		this.parseBlockOrModuleBlockBody(a, t ? n : void 0, s, r, i);
	}
	parseBlockOrModuleBlockBody(e, t, s, r, i) {
		const a = this.state.strict;
		let n = !1,
			o = !1;
		for (; !this.match(r); ) {
			const r = s ? this.parseModuleItem() : this.parseStatementListItem();
			if (t && !o) {
				if (this.isValidDirective(r)) {
					const e = this.stmtToDirective(r);
					t.push(e), n || 'use strict' !== e.value.value || ((n = !0), this.setStrict(!0));
					continue;
				}
				(o = !0), this.state.strictErrors.clear();
			}
			e.push(r);
		}
		null == i || i.call(this, n), a || this.setStrict(!1), this.next();
	}
	parseFor(e, t) {
		return (e.init = t), this.semicolon(!1), (e.test = this.match(13) ? null : this.parseExpression()), this.semicolon(!1), (e.update = this.match(11) ? null : this.parseExpression()), this.expect(11), (e.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement())), this.scope.exit(), this.state.labels.pop(), this.finishNode(e, 'ForStatement');
	}
	parseForIn(e, t, s) {
		const r = this.match(58);
		return (
			this.next(),
			r ? null !== s && this.unexpected(s) : (e.await = null !== s),
			'VariableDeclaration' !== t.type || null == t.declarations[0].init || (r && this.options.annexB && !this.state.strict && 'var' === t.kind && 'Identifier' === t.declarations[0].id.type) || this.raise(Errors.ForInOfLoopInitializer, { at: t, type: r ? 'ForInStatement' : 'ForOfStatement' }),
			'AssignmentPattern' === t.type && this.raise(Errors.InvalidLhs, { at: t, ancestor: { type: 'ForStatement' } }),
			(e.left = t),
			(e.right = r ? this.parseExpression() : this.parseMaybeAssignAllowIn()),
			this.expect(11),
			(e.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement())),
			this.scope.exit(),
			this.state.labels.pop(),
			this.finishNode(e, r ? 'ForInStatement' : 'ForOfStatement')
		);
	}
	parseVar(e, t, s, r = !1) {
		const i = (e.declarations = []);
		for (e.kind = s; ; ) {
			const e = this.startNode();
			if (
				(this.parseVarId(e, s),
				(e.init = this.eat(29) ? (t ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn()) : null),
				null !== e.init || r || ('Identifier' === e.id.type || (t && (this.match(58) || this.isContextual(101))) ? 'const' !== s || this.match(58) || this.isContextual(101) || this.raise(Errors.DeclarationMissingInitializer, { at: this.state.lastTokEndLoc, kind: 'const' }) : this.raise(Errors.DeclarationMissingInitializer, { at: this.state.lastTokEndLoc, kind: 'destructuring' })),
				i.push(this.finishNode(e, 'VariableDeclarator')),
				!this.eat(12))
			)
				break;
		}
		return e;
	}
	parseVarId(e, t) {
		const s = this.parseBindingAtom();
		this.checkLVal(s, { in: { type: 'VariableDeclarator' }, binding: 'var' === t ? 5 : 8201 }), (e.id = s);
	}
	parseAsyncFunctionExpression(e) {
		return this.parseFunction(e, 8);
	}
	parseFunction(e, t = 0) {
		const s = 2 & t,
			r = !!(1 & t),
			i = r && !(4 & t),
			a = !!(8 & t);
		this.initFunction(e, a), this.match(55) && (s && this.raise(Errors.GeneratorInSingleStatementContext, { at: this.state.startLoc }), this.next(), (e.generator = !0)), r && (e.id = this.parseFunctionId(i));
		const n = this.state.maybeInArrowParameters;
		return (
			(this.state.maybeInArrowParameters = !1),
			this.scope.enter(2),
			this.prodParam.enter(functionFlags(a, e.generator)),
			r || (e.id = this.parseFunctionId()),
			this.parseFunctionParams(e, !1),
			this.withSmartMixTopicForbiddingContext(() => {
				this.parseFunctionBodyAndFinish(e, r ? 'FunctionDeclaration' : 'FunctionExpression');
			}),
			this.prodParam.exit(),
			this.scope.exit(),
			r && !s && this.registerFunctionStatementId(e),
			(this.state.maybeInArrowParameters = n),
			e
		);
	}
	parseFunctionId(e) {
		return e || tokenIsIdentifier(this.state.type) ? this.parseIdentifier() : null;
	}
	parseFunctionParams(e, t) {
		this.expect(10), this.expressionScope.enter(newParameterDeclarationScope()), (e.params = this.parseBindingList(11, 41, 2 | (t ? 4 : 0))), this.expressionScope.exit();
	}
	registerFunctionStatementId(e) {
		e.id && this.scope.declareName(e.id.name, !this.options.annexB || this.state.strict || e.generator || e.async ? (this.scope.treatFunctionsAsVar ? 5 : 8201) : 17, e.id.loc.start);
	}
	parseClass(e, t, s) {
		this.next();
		const r = this.state.strict;
		return (this.state.strict = !0), this.parseClassId(e, t, s), this.parseClassSuper(e), (e.body = this.parseClassBody(!!e.superClass, r)), this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression');
	}
	isClassProperty() {
		return this.match(29) || this.match(13) || this.match(8);
	}
	isClassMethod() {
		return this.match(10);
	}
	isNonstaticConstructor(e) {
		return !(e.computed || e.static || ('constructor' !== e.key.name && 'constructor' !== e.key.value));
	}
	parseClassBody(e, t) {
		this.classScope.enter();
		const s = { hadConstructor: !1, hadSuperClass: e };
		let r = [];
		const i = this.startNode();
		if (
			((i.body = []),
			this.expect(5),
			this.withSmartMixTopicForbiddingContext(() => {
				for (; !this.match(8); ) {
					if (this.eat(13)) {
						if (r.length > 0) throw this.raise(Errors.DecoratorSemicolon, { at: this.state.lastTokEndLoc });
						continue;
					}
					if (this.match(26)) {
						r.push(this.parseDecorator());
						continue;
					}
					const e = this.startNode();
					r.length && ((e.decorators = r), this.resetStartLocationFromNode(e, r[0]), (r = [])), this.parseClassMember(i, e, s), 'constructor' === e.kind && e.decorators && e.decorators.length > 0 && this.raise(Errors.DecoratorConstructor, { at: e });
				}
			}),
			(this.state.strict = t),
			this.next(),
			r.length)
		)
			throw this.raise(Errors.TrailingDecorator, { at: this.state.startLoc });
		return this.classScope.exit(), this.finishNode(i, 'ClassBody');
	}
	parseClassMemberFromModifier(e, t) {
		const s = this.parseIdentifier(!0);
		if (this.isClassMethod()) {
			const r = t;
			return (r.kind = 'method'), (r.computed = !1), (r.key = s), (r.static = !1), this.pushClassMethod(e, r, !1, !1, !1, !1), !0;
		}
		if (this.isClassProperty()) {
			const r = t;
			return (r.computed = !1), (r.key = s), (r.static = !1), e.body.push(this.parseClassProperty(r)), !0;
		}
		return this.resetPreviousNodeTrailingComments(s), !1;
	}
	parseClassMember(e, t, s) {
		const r = this.isContextual(104);
		if (r) {
			if (this.parseClassMemberFromModifier(e, t)) return;
			if (this.eat(5)) return void this.parseClassStaticBlock(e, t);
		}
		this.parseClassMemberWithIsStatic(e, t, s, r);
	}
	parseClassMemberWithIsStatic(e, t, s, r) {
		const i = t,
			a = t,
			n = t,
			o = t,
			h = t,
			p = i,
			c = i;
		if (((t.static = r), this.parsePropertyNamePrefixOperator(t), this.eat(55))) {
			p.kind = 'method';
			const t = this.match(136);
			return this.parseClassElementName(p), t ? void this.pushClassPrivateMethod(e, a, !0, !1) : (this.isNonstaticConstructor(i) && this.raise(Errors.ConstructorIsGenerator, { at: i.key }), void this.pushClassMethod(e, i, !0, !1, !1, !1));
		}
		const l = tokenIsIdentifier(this.state.type) && !this.state.containsEsc,
			d = this.match(136),
			u = this.parseClassElementName(t),
			m = this.state.startLoc;
		if ((this.parsePostMemberNameModifiers(c), this.isClassMethod())) {
			if (((p.kind = 'method'), d)) return void this.pushClassPrivateMethod(e, a, !1, !1);
			const r = this.isNonstaticConstructor(i);
			let n = !1;
			r && ((i.kind = 'constructor'), s.hadConstructor && !this.hasPlugin('typescript') && this.raise(Errors.DuplicateConstructor, { at: u }), r && this.hasPlugin('typescript') && t.override && this.raise(Errors.OverrideOnConstructor, { at: u }), (s.hadConstructor = !0), (n = s.hadSuperClass)), this.pushClassMethod(e, i, !1, !1, r, n);
		} else if (this.isClassProperty()) d ? this.pushClassPrivateProperty(e, o) : this.pushClassProperty(e, n);
		else if (l && 'async' === u.name && !this.isLineTerminator()) {
			this.resetPreviousNodeTrailingComments(u);
			const t = this.eat(55);
			c.optional && this.unexpected(m), (p.kind = 'method');
			const s = this.match(136);
			this.parseClassElementName(p), this.parsePostMemberNameModifiers(c), s ? this.pushClassPrivateMethod(e, a, t, !0) : (this.isNonstaticConstructor(i) && this.raise(Errors.ConstructorIsAsync, { at: i.key }), this.pushClassMethod(e, i, t, !0, !1, !1));
		} else if (!l || ('get' !== u.name && 'set' !== u.name) || (this.match(55) && this.isLineTerminator()))
			if (l && 'accessor' === u.name && !this.isLineTerminator()) {
				this.expectPlugin('decoratorAutoAccessors'), this.resetPreviousNodeTrailingComments(u);
				const t = this.match(136);
				this.parseClassElementName(n), this.pushClassAccessorProperty(e, h, t);
			} else this.isLineTerminator() ? (d ? this.pushClassPrivateProperty(e, o) : this.pushClassProperty(e, n)) : this.unexpected();
		else {
			this.resetPreviousNodeTrailingComments(u), (p.kind = u.name);
			const t = this.match(136);
			this.parseClassElementName(i), t ? this.pushClassPrivateMethod(e, a, !1, !1) : (this.isNonstaticConstructor(i) && this.raise(Errors.ConstructorIsAccessor, { at: i.key }), this.pushClassMethod(e, i, !1, !1, !1, !1)), this.checkGetterSetterParams(i);
		}
	}
	parseClassElementName(e) {
		const { type: t, value: s } = this.state;
		if (((130 !== t && 131 !== t) || !e.static || 'prototype' !== s || this.raise(Errors.StaticPrototype, { at: this.state.startLoc }), 136 === t)) {
			'constructor' === s && this.raise(Errors.ConstructorClassPrivateField, { at: this.state.startLoc });
			const t = this.parsePrivateName();
			return (e.key = t), t;
		}
		return this.parsePropertyName(e);
	}
	parseClassStaticBlock(e, t) {
		var s;
		this.scope.enter(208);
		const r = this.state.labels;
		(this.state.labels = []), this.prodParam.enter(0);
		const i = (t.body = []);
		this.parseBlockOrModuleBlockBody(i, void 0, !1, 8), this.prodParam.exit(), this.scope.exit(), (this.state.labels = r), e.body.push(this.finishNode(t, 'StaticBlock')), null != (s = t.decorators) && s.length && this.raise(Errors.DecoratorStaticBlock, { at: t });
	}
	pushClassProperty(e, t) {
		t.computed || ('constructor' !== t.key.name && 'constructor' !== t.key.value) || this.raise(Errors.ConstructorClassField, { at: t.key }), e.body.push(this.parseClassProperty(t));
	}
	pushClassPrivateProperty(e, t) {
		const s = this.parseClassPrivateProperty(t);
		e.body.push(s), this.classScope.declarePrivateName(this.getPrivateNameSV(s.key), 0, s.key.loc.start);
	}
	pushClassAccessorProperty(e, t, s) {
		if (!s && !t.computed) {
			const e = t.key;
			('constructor' !== e.name && 'constructor' !== e.value) || this.raise(Errors.ConstructorClassField, { at: e });
		}
		const r = this.parseClassAccessorProperty(t);
		e.body.push(r), s && this.classScope.declarePrivateName(this.getPrivateNameSV(r.key), 0, r.key.loc.start);
	}
	pushClassMethod(e, t, s, r, i, a) {
		e.body.push(this.parseMethod(t, s, r, i, a, 'ClassMethod', !0));
	}
	pushClassPrivateMethod(e, t, s, r) {
		const i = this.parseMethod(t, s, r, !1, !1, 'ClassPrivateMethod', !0);
		e.body.push(i);
		const a = 'get' === i.kind ? (i.static ? 6 : 2) : 'set' === i.kind ? (i.static ? 5 : 1) : 0;
		this.declareClassPrivateMethodInScope(i, a);
	}
	declareClassPrivateMethodInScope(e, t) {
		this.classScope.declarePrivateName(this.getPrivateNameSV(e.key), t, e.key.loc.start);
	}
	parsePostMemberNameModifiers(e) {}
	parseClassPrivateProperty(e) {
		return this.parseInitializer(e), this.semicolon(), this.finishNode(e, 'ClassPrivateProperty');
	}
	parseClassProperty(e) {
		return this.parseInitializer(e), this.semicolon(), this.finishNode(e, 'ClassProperty');
	}
	parseClassAccessorProperty(e) {
		return this.parseInitializer(e), this.semicolon(), this.finishNode(e, 'ClassAccessorProperty');
	}
	parseInitializer(e) {
		this.scope.enter(80), this.expressionScope.enter(newExpressionScope()), this.prodParam.enter(0), (e.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null), this.expressionScope.exit(), this.prodParam.exit(), this.scope.exit();
	}
	parseClassId(e, t, s, r = 8331) {
		if (tokenIsIdentifier(this.state.type)) (e.id = this.parseIdentifier()), t && this.declareNameFromIdentifier(e.id, r);
		else {
			if (!s && t) throw this.raise(Errors.MissingClassName, { at: this.state.startLoc });
			e.id = null;
		}
	}
	parseClassSuper(e) {
		e.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
	}
	parseExport(e, t) {
		const s = this.parseMaybeImportPhase(e, !0),
			r = this.maybeParseExportDefaultSpecifier(e, s),
			i = !r || this.eat(12),
			a = i && this.eatExportStar(e),
			n = a && this.maybeParseExportNamespaceSpecifier(e),
			o = i && (!n || this.eat(12)),
			h = r || a;
		if (a && !n) {
			if ((r && this.unexpected(), t)) throw this.raise(Errors.UnsupportedDecoratorExport, { at: e });
			return this.parseExportFrom(e, !0), this.finishNode(e, 'ExportAllDeclaration');
		}
		const p = this.maybeParseExportNamedSpecifiers(e);
		let c;
		if ((r && i && !a && !p && this.unexpected(null, 5), n && o && this.unexpected(null, 97), h || p)) {
			if (((c = !1), t)) throw this.raise(Errors.UnsupportedDecoratorExport, { at: e });
			this.parseExportFrom(e, h);
		} else c = this.maybeParseExportDeclaration(e);
		if (h || p || c) {
			var l;
			const s = e;
			if ((this.checkExport(s, !0, !1, !!s.source), 'ClassDeclaration' === (null == (l = s.declaration) ? void 0 : l.type))) this.maybeTakeDecorators(t, s.declaration, s);
			else if (t) throw this.raise(Errors.UnsupportedDecoratorExport, { at: e });
			return this.finishNode(s, 'ExportNamedDeclaration');
		}
		if (this.eat(65)) {
			const s = e,
				r = this.parseExportDefaultExpression();
			if (((s.declaration = r), 'ClassDeclaration' === r.type)) this.maybeTakeDecorators(t, r, s);
			else if (t) throw this.raise(Errors.UnsupportedDecoratorExport, { at: e });
			return this.checkExport(s, !0, !0), this.finishNode(s, 'ExportDefaultDeclaration');
		}
		this.unexpected(null, 5);
	}
	eatExportStar(e) {
		return this.eat(55);
	}
	maybeParseExportDefaultSpecifier(e, t) {
		if (t || this.isExportDefaultSpecifier()) {
			this.expectPlugin('exportDefaultFrom', null == t ? void 0 : t.loc.start);
			const s = t || this.parseIdentifier(!0),
				r = this.startNodeAtNode(s);
			return (r.exported = s), (e.specifiers = [this.finishNode(r, 'ExportDefaultSpecifier')]), !0;
		}
		return !1;
	}
	maybeParseExportNamespaceSpecifier(e) {
		if (this.isContextual(93)) {
			e.specifiers || (e.specifiers = []);
			const t = this.startNodeAt(this.state.lastTokStartLoc);
			return this.next(), (t.exported = this.parseModuleExportName()), e.specifiers.push(this.finishNode(t, 'ExportNamespaceSpecifier')), !0;
		}
		return !1;
	}
	maybeParseExportNamedSpecifiers(e) {
		if (this.match(5)) {
			e.specifiers || (e.specifiers = []);
			const t = 'type' === e.exportKind;
			return e.specifiers.push(...this.parseExportSpecifiers(t)), (e.source = null), (e.declaration = null), this.hasPlugin('importAssertions') && (e.assertions = []), !0;
		}
		return !1;
	}
	maybeParseExportDeclaration(e) {
		return !!this.shouldParseExportDeclaration() && ((e.specifiers = []), (e.source = null), this.hasPlugin('importAssertions') && (e.assertions = []), (e.declaration = this.parseExportDeclaration(e)), !0);
	}
	isAsyncFunction() {
		if (!this.isContextual(95)) return !1;
		const e = this.nextTokenInLineStart();
		return this.isUnparsedContextual(e, 'function');
	}
	parseExportDefaultExpression() {
		const e = this.startNode();
		if (this.match(68)) return this.next(), this.parseFunction(e, 5);
		if (this.isAsyncFunction()) return this.next(), this.next(), this.parseFunction(e, 13);
		if (this.match(80)) return this.parseClass(e, !0, !0);
		if (this.match(26)) return this.hasPlugin('decorators') && !0 === this.getPluginOption('decorators', 'decoratorsBeforeExport') && this.raise(Errors.DecoratorBeforeExport, { at: this.state.startLoc }), this.parseClass(this.maybeTakeDecorators(this.parseDecorators(!1), this.startNode()), !0, !0);
		if (this.match(75) || this.match(74) || this.isLet()) throw this.raise(Errors.UnsupportedDefaultExport, { at: this.state.startLoc });
		const t = this.parseMaybeAssignAllowIn();
		return this.semicolon(), t;
	}
	parseExportDeclaration(e) {
		if (this.match(80)) {
			return this.parseClass(this.startNode(), !0, !1);
		}
		return this.parseStatementListItem();
	}
	isExportDefaultSpecifier() {
		const { type: e } = this.state;
		if (tokenIsIdentifier(e)) {
			if ((95 === e && !this.state.containsEsc) || 99 === e) return !1;
			if ((128 === e || 127 === e) && !this.state.containsEsc) {
				const { type: e } = this.lookahead();
				if ((tokenIsIdentifier(e) && 97 !== e) || 5 === e) return this.expectOnePlugin(['flow', 'typescript']), !1;
			}
		} else if (!this.match(65)) return !1;
		const t = this.nextTokenStart(),
			s = this.isUnparsedContextual(t, 'from');
		if (44 === this.input.charCodeAt(t) || (tokenIsIdentifier(this.state.type) && s)) return !0;
		if (this.match(65) && s) {
			const e = this.input.charCodeAt(this.nextTokenStartSince(t + 4));
			return 34 === e || 39 === e;
		}
		return !1;
	}
	parseExportFrom(e, t) {
		this.eatContextual(97) ? ((e.source = this.parseImportSource()), this.checkExport(e), this.maybeParseImportAttributes(e), this.checkJSONModuleImport(e)) : t && this.unexpected(), this.semicolon();
	}
	shouldParseExportDeclaration() {
		const { type: e } = this.state;
		return 26 === e && (this.expectOnePlugin(['decorators', 'decorators-legacy']), this.hasPlugin('decorators')) ? (!0 === this.getPluginOption('decorators', 'decoratorsBeforeExport') && this.raise(Errors.DecoratorBeforeExport, { at: this.state.startLoc }), !0) : 74 === e || 75 === e || 68 === e || 80 === e || this.isLet() || this.isAsyncFunction();
	}
	checkExport(e, t, s, r) {
		var i;
		if (t)
			if (s) {
				if ((this.checkDuplicateExports(e, 'default'), this.hasPlugin('exportDefaultFrom'))) {
					var a;
					const t = e.declaration;
					'Identifier' !== t.type || 'from' !== t.name || t.end - t.start != 4 || (null != (a = t.extra) && a.parenthesized) || this.raise(Errors.ExportDefaultFromAsIdentifier, { at: t });
				}
			} else if (null != (i = e.specifiers) && i.length)
				for (const t of e.specifiers) {
					const { exported: e } = t,
						s = 'Identifier' === e.type ? e.name : e.value;
					if ((this.checkDuplicateExports(t, s), !r && t.local)) {
						const { local: e } = t;
						'Identifier' !== e.type ? this.raise(Errors.ExportBindingIsString, { at: t, localName: e.value, exportName: s }) : (this.checkReservedWord(e.name, e.loc.start, !0, !1), this.scope.checkLocalExport(e));
					}
				}
			else if (e.declaration)
				if ('FunctionDeclaration' === e.declaration.type || 'ClassDeclaration' === e.declaration.type) {
					const t = e.declaration.id;
					if (!t) throw new Error('Assertion failure');
					this.checkDuplicateExports(e, t.name);
				} else if ('VariableDeclaration' === e.declaration.type) for (const t of e.declaration.declarations) this.checkDeclaration(t.id);
	}
	checkDeclaration(e) {
		if ('Identifier' === e.type) this.checkDuplicateExports(e, e.name);
		else if ('ObjectPattern' === e.type) for (const t of e.properties) this.checkDeclaration(t);
		else if ('ArrayPattern' === e.type) for (const t of e.elements) t && this.checkDeclaration(t);
		else 'ObjectProperty' === e.type ? this.checkDeclaration(e.value) : 'RestElement' === e.type ? this.checkDeclaration(e.argument) : 'AssignmentPattern' === e.type && this.checkDeclaration(e.left);
	}
	checkDuplicateExports(e, t) {
		this.exportedIdentifiers.has(t) && ('default' === t ? this.raise(Errors.DuplicateDefaultExport, { at: e }) : this.raise(Errors.DuplicateExport, { at: e, exportName: t })), this.exportedIdentifiers.add(t);
	}
	parseExportSpecifiers(e) {
		const t = [];
		let s = !0;
		for (this.expect(5); !this.eat(8); ) {
			if (s) s = !1;
			else if ((this.expect(12), this.eat(8))) break;
			const r = this.isContextual(128),
				i = this.match(131),
				a = this.startNode();
			(a.local = this.parseModuleExportName()), t.push(this.parseExportSpecifier(a, i, e, r));
		}
		return t;
	}
	parseExportSpecifier(e, t, s, r) {
		return this.eatContextual(93) ? (e.exported = this.parseModuleExportName()) : t ? (e.exported = cloneStringLiteral(e.local)) : e.exported || (e.exported = cloneIdentifier(e.local)), this.finishNode(e, 'ExportSpecifier');
	}
	parseModuleExportName() {
		if (this.match(131)) {
			const e = this.parseStringLiteral(this.state.value),
				t = e.value.match(loneSurrogate);
			return t && this.raise(Errors.ModuleExportNameHasLoneSurrogate, { at: e, surrogateCharCode: t[0].charCodeAt(0) }), e;
		}
		return this.parseIdentifier(!0);
	}
	isJSONModuleImport(e) {
		return null != e.assertions && e.assertions.some(({ key: e, value: t }) => 'json' === t.value && ('Identifier' === e.type ? 'type' === e.name : 'type' === e.value));
	}
	checkImportReflection(e) {
		var t;
		e.module && ((1 === e.specifiers.length && 'ImportDefaultSpecifier' === e.specifiers[0].type) || this.raise(Errors.ImportReflectionNotBinding, { at: e.specifiers[0].loc.start }), (null == (t = e.assertions) ? void 0 : t.length) > 0 && this.raise(Errors.ImportReflectionHasAssertion, { at: e.specifiers[0].loc.start }));
	}
	checkJSONModuleImport(e) {
		if (this.isJSONModuleImport(e) && 'ExportAllDeclaration' !== e.type) {
			const { specifiers: t } = e;
			if (null != t) {
				const e = t.find((e) => {
					let t;
					if (('ExportSpecifier' === e.type ? (t = e.local) : 'ImportSpecifier' === e.type && (t = e.imported), void 0 !== t)) return 'Identifier' === t.type ? 'default' !== t.name : 'default' !== t.value;
				});
				void 0 !== e && this.raise(Errors.ImportJSONBindingNotDefault, { at: e.loc.start });
			}
		}
	}
	isPotentialImportPhase(e) {
		return !e && this.isContextual(125);
	}
	applyImportPhase(e, t, s, r) {
		t || ('module' === s ? (this.expectPlugin('importReflection', r), (e.module = !0)) : this.hasPlugin('importReflection') && (e.module = !1));
	}
	parseMaybeImportPhase(e, t) {
		if (!this.isPotentialImportPhase(t)) return this.applyImportPhase(e, t, null), null;
		const s = this.parseIdentifier(!0),
			{ type: r } = this.state;
		return (tokenIsKeywordOrIdentifier(r) ? 97 !== r || 102 === this.lookaheadCharCode() : 12 !== r) ? (this.resetPreviousIdentifierLeadingComments(s), this.applyImportPhase(e, t, s.name, s.loc.start), null) : (this.applyImportPhase(e, t, null), s);
	}
	isPrecedingIdImportPhase(e) {
		const { type: t } = this.state;
		return tokenIsIdentifier(t) ? 97 !== t || 102 === this.lookaheadCharCode() : 12 !== t;
	}
	parseImport(e) {
		return this.match(131) ? this.parseImportSourceAndAttributes(e) : this.parseImportSpecifiersAndAfter(e, this.parseMaybeImportPhase(e, !1));
	}
	parseImportSpecifiersAndAfter(e, t) {
		e.specifiers = [];
		const s = !this.maybeParseDefaultImportSpecifier(e, t) || this.eat(12),
			r = s && this.maybeParseStarImportSpecifier(e);
		return s && !r && this.parseNamedImportSpecifiers(e), this.expectContextual(97), this.parseImportSourceAndAttributes(e);
	}
	parseImportSourceAndAttributes(e) {
		return null != e.specifiers || (e.specifiers = []), (e.source = this.parseImportSource()), this.maybeParseImportAttributes(e), this.checkImportReflection(e), this.checkJSONModuleImport(e), this.semicolon(), this.finishNode(e, 'ImportDeclaration');
	}
	parseImportSource() {
		return this.match(131) || this.unexpected(), this.parseExprAtom();
	}
	parseImportSpecifierLocal(e, t, s) {
		(t.local = this.parseIdentifier()), e.specifiers.push(this.finishImportSpecifier(t, s));
	}
	finishImportSpecifier(e, t, s = 8201) {
		return this.checkLVal(e.local, { in: { type: t }, binding: s }), this.finishNode(e, t);
	}
	parseImportAttributes() {
		this.expect(5);
		const e = [],
			t = new Set();
		do {
			if (this.match(8)) break;
			const s = this.startNode(),
				r = this.state.value;
			if ((t.has(r) && this.raise(Errors.ModuleAttributesWithDuplicateKeys, { at: this.state.startLoc, key: r }), t.add(r), this.match(131) ? (s.key = this.parseStringLiteral(r)) : (s.key = this.parseIdentifier(!0)), this.expect(14), !this.match(131))) throw this.raise(Errors.ModuleAttributeInvalidValue, { at: this.state.startLoc });
			(s.value = this.parseStringLiteral(this.state.value)), e.push(this.finishNode(s, 'ImportAttribute'));
		} while (this.eat(12));
		return this.expect(8), e;
	}
	parseModuleAttributes() {
		const e = [],
			t = new Set();
		do {
			const s = this.startNode();
			if (((s.key = this.parseIdentifier(!0)), 'type' !== s.key.name && this.raise(Errors.ModuleAttributeDifferentFromType, { at: s.key }), t.has(s.key.name) && this.raise(Errors.ModuleAttributesWithDuplicateKeys, { at: s.key, key: s.key.name }), t.add(s.key.name), this.expect(14), !this.match(131))) throw this.raise(Errors.ModuleAttributeInvalidValue, { at: this.state.startLoc });
			(s.value = this.parseStringLiteral(this.state.value)), e.push(this.finishNode(s, 'ImportAttribute'));
		} while (this.eat(12));
		return e;
	}
	maybeParseImportAttributes(e) {
		let t,
			s = !1;
		if (this.match(76)) {
			if (this.hasPrecedingLineBreak() && 40 === this.lookaheadCharCode()) return;
			this.next(), this.hasPlugin('moduleAttributes') ? (t = this.parseModuleAttributes()) : (this.expectImportAttributesPlugin(), (t = this.parseImportAttributes())), (s = !0);
		} else if (this.isContextual(94) && !this.hasPrecedingLineBreak()) this.hasPlugin('importAttributes') ? (!0 !== this.getPluginOption('importAttributes', 'deprecatedAssertSyntax') && this.raise(Errors.ImportAttributesUseAssert, { at: this.state.startLoc }), this.addExtra(e, 'deprecatedAssertSyntax', !0)) : this.expectOnePlugin(['importAttributes', 'importAssertions']), this.next(), (t = this.parseImportAttributes());
		else if (this.hasPlugin('importAttributes') || this.hasPlugin('importAssertions')) t = [];
		else {
			if (!this.hasPlugin('moduleAttributes')) return;
			t = [];
		}
		!s && this.hasPlugin('importAssertions') ? (e.assertions = t) : (e.attributes = t);
	}
	maybeParseDefaultImportSpecifier(e, t) {
		if (t) {
			const s = this.startNodeAtNode(t);
			return (s.local = t), e.specifiers.push(this.finishImportSpecifier(s, 'ImportDefaultSpecifier')), !0;
		}
		return !!tokenIsKeywordOrIdentifier(this.state.type) && (this.parseImportSpecifierLocal(e, this.startNode(), 'ImportDefaultSpecifier'), !0);
	}
	maybeParseStarImportSpecifier(e) {
		if (this.match(55)) {
			const t = this.startNode();
			return this.next(), this.expectContextual(93), this.parseImportSpecifierLocal(e, t, 'ImportNamespaceSpecifier'), !0;
		}
		return !1;
	}
	parseNamedImportSpecifiers(e) {
		let t = !0;
		for (this.expect(5); !this.eat(8); ) {
			if (t) t = !1;
			else {
				if (this.eat(14)) throw this.raise(Errors.DestructureNamedImport, { at: this.state.startLoc });
				if ((this.expect(12), this.eat(8))) break;
			}
			const s = this.startNode(),
				r = this.match(131),
				i = this.isContextual(128);
			s.imported = this.parseModuleExportName();
			const a = this.parseImportSpecifier(s, r, 'type' === e.importKind || 'typeof' === e.importKind, i, void 0);
			e.specifiers.push(a);
		}
	}
	parseImportSpecifier(e, t, s, r, i) {
		if (this.eatContextual(93)) e.local = this.parseIdentifier();
		else {
			const { imported: s } = e;
			if (t) throw this.raise(Errors.ImportBindingIsString, { at: e, importName: s.value });
			this.checkReservedWord(s.name, e.loc.start, !0, !0), e.local || (e.local = cloneIdentifier(s));
		}
		return this.finishImportSpecifier(e, 'ImportSpecifier', i);
	}
	isThisParam(e) {
		return 'Identifier' === e.type && 'this' === e.name;
	}
}
class Parser extends StatementParser {
	constructor(e, t) {
		super((e = getOptions(e)), t), (this.options = e), this.initializeScopes(), (this.plugins = pluginsMap(this.options.plugins)), (this.filename = e.sourceFilename);
	}
	getScopeHandler() {
		return ScopeHandler;
	}
	parse() {
		this.enterInitialScopes();
		const e = this.startNode(),
			t = this.startNode();
		return this.nextToken(), (e.errors = null), this.parseTopLevel(e, t), (e.errors = this.state.errors), e;
	}
}
function pluginsMap(e) {
	const t = new Map();
	for (const s of e) {
		const [e, r] = Array.isArray(s) ? s : [s, {}];
		t.has(e) || t.set(e, r || {});
	}
	return t;
}
function parse(e, t) {
	var s;
	if ('unambiguous' !== (null == (s = t) ? void 0 : s.sourceType)) return getParser(t, e).parse();
	t = Object.assign({}, t);
	try {
		t.sourceType = 'module';
		const s = getParser(t, e),
			r = s.parse();
		if (s.sawUnambiguousESM) return r;
		if (s.ambiguousScriptDifferentAst)
			try {
				return (t.sourceType = 'script'), getParser(t, e).parse();
			} catch (e) {}
		else r.program.sourceType = 'script';
		return r;
	} catch (s) {
		try {
			return (t.sourceType = 'script'), getParser(t, e).parse();
		} catch (e) {}
		throw s;
	}
}
function parseExpression(e, t) {
	const s = getParser(t, e);
	return s.options.strictMode && (s.state.strict = !0), s.getExpression();
}
function generateExportedTokenTypes(e) {
	const t = {};
	for (const s of Object.keys(e)) t[s] = getExportedToken(e[s]);
	return t;
}
const tokTypes = generateExportedTokenTypes(tt);
function getParser(e, t) {
	let s = Parser;
	return null != e && e.plugins && (validatePlugins(e.plugins), (s = getParserClass(e.plugins))), new s(e, t);
}
const parserClassCache = {};
function getParserClass(e) {
	const t = mixinPluginNames.filter((t) => hasPlugin(e, t)),
		s = t.join('/');
	let r = parserClassCache[s];
	if (!r) {
		r = Parser;
		for (const e of t) r = mixinPlugins[e](r);
		parserClassCache[s] = r;
	}
	return r;
}

export default parse;
// (exports.parse = parse), (exports.parseExpression = parseExpression), (exports.tokTypes = tokTypes);
//# sourceMappingURL=/sm/22fb47d97f8ed344ecdb365d75c5926e9afa1757feb69b0bab9faccfcc8c15c6.map
