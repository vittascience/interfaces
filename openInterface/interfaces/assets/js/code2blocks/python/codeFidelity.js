/**
 * @fileoverview codeFidelity.js
 * Check that the blocks of a statement generate the code of the statement (interfaces with
 * STRICT_REVERSE_TRANSLATION, where the code is written freely, ex: Python). The statements whose blocks would change
 * the code are kept as code by the translation.
 *
 * The codes are compared on their syntax tree, with the differences of the generators that do not change the program:
 * parentheses, quotes, number formats, "range(n)" / "range(0, n, 1)", "range(int(n))", "x += 1" / "x = x + 1" and the
 * name of a loop variable not used in the loop. In C++ (Arduino), a local declaration "int x = 1;" is compared to the
 * assignment "x = 1;" of the variable block (the blocks declare the variables globally).
 */
import { PYTHON } from '/openInterface/interfaces/assets/js/code2blocks/python/learnedTranslations.js';

const PUNCTUATION = new Set(['(', ')', ',', ':', '[', ']', '{', '}', ';']);

export default class CodeFidelity {
	/**
	 * @param {object} parser - tree-sitter parser
	 */
	/**
	 * @param {object} parser - tree-sitter parser
	 * @param {function} getFunctions - functions of the program (name => { args, return }), defined in the check
	 *     workspace for their calls
	 */
	constructor(parser, getFunctions, language = PYTHON) {
		this.parser = parser;
		this.getFunctions = getFunctions;
		this.generator = language.generator();
		this.language = language;
		this.workspace = new Blockly.Workspace();
	}

	addFunctionDefinitions(checkedName = null) {
		for (const [name, definition] of Object.entries(this.getFunctions() || {})) {
			if (name === checkedName) continue;
			const block = this.workspace.newBlock(definition.return ? 'procedures_defreturn' : 'procedures_defnoreturn');
			block.setFieldValue(name, 'NAME');
			const mutation = Blockly.utils.xml.createElement('mutation');
			for (const arg of definition.args || []) {
				const argXml = Blockly.utils.xml.createElement('arg');
				argXml.setAttribute('name', typeof arg === 'string' ? arg : arg.name || arg.text);
				mutation.append(argXml);
			}
			block.domToMutation(mutation);
		}
	}

	/**
	 * True if the block of the xml generates the code of the statement.
	 * @param {string} code - code of the statement
	 * @param {Element} blockXml - xml of the block (without next block)
	 * @param {string} program - code of the program (C++): the block may generate the following statements too, or
	 *     generate the statement in the setup
	 * @returns {boolean}
	 */
	sameCode(code, blockXml, program = null) {
		let generated;
		let setup = [];
		this.workspace.clear();
		const checker = this.workspace.connectionChecker;
		const doTypeChecks = checker.doTypeChecks;
		checker.doTypeChecks = () => true;
		try {
			// the definition being checked is not added twice (it would be renamed)
			const checkedName = blockXml.getAttribute('type')?.startsWith('procedures_def') ? blockXml.querySelector(':scope > field[name="NAME"]')?.textContent : null;
			this.addFunctionDefinitions(checkedName);
			const xml = Blockly.utils.xml.createElement('xml');
			xml.append(blockXml.cloneNode(true));
			const [blockId] = Blockly.Xml.domToWorkspace(xml, this.workspace);
			const block = this.workspace.getBlockById(blockId);
			if (block.type.startsWith('procedures_def')) {
				// function definitions are generated with the definitions of the program
				const name = block.getFieldValue('NAME');
				for (const other of this.workspace.getTopBlocks()) if (other !== block) other.dispose();
				const program = this.parser.parse(this.generator.workspaceToCode(this.workspace)).rootNode;
				generated = program.namedChildren.find((child) => child.type === 'function_definition' && child.childForFieldName('name')?.text === name)?.text || '';
			} else {
				this.generator.init(this.workspace);
				generated = this.generator.blockToCode(block, true);
				if (Array.isArray(generated)) generated = generated[0];
				setup = (this.language.setup || []).flatMap((store) => Object.values(this.generator[store] || {})).filter((line) => typeof line === 'string');
			}
		} catch (error) {
			console.debug('[Code2Blocks] code check failed:', error, error.stack);
			return false;
		} finally {
			checker.doTypeChecks = doTypeChecks;
		}
		if (this.canonical(code) === this.canonical(generated || '')) return true;
		if (program === null) return false;
		const compact = (text) => text.replace(/\s+/g, '');
		// block generating the previous or following statements of the program too (ex: "lcd.setCursor(0, 0); lcd.print(x);",
		// "strip.setPixelColor(...); strip.show();")
		const block = compact(generated || '');
		if ((block.startsWith(compact(code)) || block.endsWith(compact(code))) && compact(program).includes(block)) return true;
		// statement generated in the setup by the block (ex: "strip.begin();")
		return !compact(generated || '') && setup.some((line) => compact(line) === compact(code));
	}

	canonical(code) {
		if (this.language === PYTHON) return this.canonicalNode(this.parser.parse(code).rootNode);
		// C++ statements are parsed in a function body
		const body = this.parser.parse(`void vittaCheck() {\n${code}\n}`).rootNode.namedChildren[0]?.childForFieldName('body');
		return body ? this.canonicalNode(body) : code.replace(/\s+/g, '');
	}

	canonicalNode(node) {
		const named = (child) => (typeof child.isNamed === 'function' ? child.isNamed() : child.isNamed);
		switch (node.type) {
			case 'comment':
				return '';
			case 'parenthesized_expression':
				return this.canonicalNode(node.namedChildren[0]);
			case 'string_literal':
				// C++: content between the quotes, escape sequences included
				return 'S:' + node.text.slice(1, -1);
			case 'number_literal': {
				// C++: "5.0" is a decimal (5 / 2 = 2, 5.0 / 2 = 2.5)
				const decimal = /[.eE]/.test(node.text) && !/^0[xX]/.test(node.text);
				return (decimal ? 'D:' : 'N:') + Number(node.text.replace(/[uUlLfF]+$/, ''));
			}
			case 'call_expression': {
				// C++: "Serial.println(String(x))" => "Serial.println(x)" (same display)
				const [callee, args] = node.namedChildren;
				const [arg] = args?.namedChildren || [];
				if (/\.print(ln)?$/.test(callee?.text || '') && args.namedChildren.length === 1 && arg.type === 'call_expression' && arg.namedChildren[0]?.text === 'String' && arg.namedChildren[1]?.namedChildren.length === 1) {
					return `call_expression(${this.canonicalNode(callee)},argument_list(${this.canonicalNode(arg.namedChildren[1].namedChildren[0])}))`;
				}
				break;
			}
			case 'declaration': {
				// C++: "int x = 1;" => "x = 1;" (single variable with a value, of a type declared by the variable blocks)
				const declarators = node.namedChildren.filter((child) => child.type === 'init_declarator');
				const [name, value] = declarators[0]?.namedChildren || [];
				const type = node.childForFieldName('type')?.text;
				if (declarators.length === 1 && node.namedChildren.length === 2 && name?.type === 'identifier' && value && this.language.declarationTypes?.includes(type)) {
					return `expression_statement(assignment_expression(${this.canonicalNode(name)},=,${this.canonicalNode(value)}))`;
				}
				break;
			}
			case 'string':
				return 'S:' + node.namedChildren.filter((child) => child.type === 'string_content').map((child) => child.text).join('');
			case 'integer':
			case 'float':
				return 'N:' + Number(node.text.replaceAll('_', ''));
			case 'augmented_assignment': {
				// "x += 1" => "x = x + 1"
				const [left, operator, right] = node.children;
				return `assignment(${this.canonicalNode(left)},=,binary_operator(${this.canonicalNode(left)},${operator.text.slice(0, -1)},${this.canonicalNode(right)}))`;
			}
			case 'call': {
				// "range(n)" / "range(a, b)" => "range(0, n, 1)" / "range(a, b, 1)", "range(int(n))" => "range(n)"
				if (node.namedChildren[0]?.text === 'range') {
					let args = node.namedChildren[1].namedChildren.map((arg) => this.canonicalNode(arg));
					args = args.map((arg) => arg.replace(/^call\(identifier:int,argument_list\((.*)\)\)$/, '$1'));
					if (args.length === 1) args = ['N:0', args[0], 'N:1'];
					if (args.length === 2) args.push('N:1');
					return `range(${args.join(',')})`;
				}
				break;
			}
			case 'for_statement': {
				// loop variable not used in the loop
				const variable = node.namedChildren[0];
				const body = node.namedChildren[node.namedChildren.length - 1];
				if (variable?.type === 'identifier' && !new RegExp(`\\b${variable.text}\\b`).test(body?.text || '')) {
					return 'for(_,' + node.namedChildren.slice(1).map((child) => this.canonicalNode(child)).join(',') + ')';
				}
				break;
			}
		}
		if (!node.childCount) return node.type + ':' + node.text;
		const children = [];
		for (let i = 0; i < node.childCount; i++) {
			const child = node.child(i);
			if (named(child)) {
				const canonical = this.canonicalNode(child);
				if (canonical) children.push(canonical);
			} else if (!PUNCTUATION.has(child.type)) {
				children.push(child.type);
			}
		}
		return node.type + '(' + children.join(',') + ')';
	}
}
