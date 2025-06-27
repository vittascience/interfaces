// main utils functions
import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

import '/openInterface/interfaces/assets/js/code2blocks/cpp/ast/ast_math.js'; // math blocks
import '/openInterface/interfaces/assets/js/code2blocks/cpp/ast/ast_communication.js'; // communication blocks => need to decentralize the blocks to the corresponding interface (to risky to keep it in the main cppCode2Blocks.js)
import '/openInterface/interfaces/assets/js/code2blocks/cpp/ast/ast_text.js'; // text blocks

//interceptors : may be specific to a certain interfaces. Need to refine the logic to be imported with the corresponding interface
import '/openInterface/interfaces/assets/js/code2blocks/cpp/blockInterceptor/io_blocks.js'; // io blocks
import '/openInterface/interfaces/assets/js/code2blocks/cpp/blockInterceptor/list_blocks.js'; // list blocks
import '/openInterface/interfaces/assets/js/code2blocks/cpp/blockInterceptor/math_blocks.js'; // math blocks

// generic and prototype blocks
import '/openInterface/interfaces/assets/js/code2blocks/cpp/prototypeBlocks/call_expression.js'; // call expression blocks definitions
import '/openInterface/interfaces/assets/js/code2blocks/cpp/prototypeBlocks/control_blocks.js'; // control blocks definitions
import '/openInterface/interfaces/assets/js/code2blocks/cpp/prototypeBlocks/preproc_blocks.js'; // preprocessor blocks definitions
import '/openInterface/interfaces/assets/js/code2blocks/cpp/prototypeBlocks/pin_blocks.js'; // pin blocks definitions

// constants
const authorizedConnectors = ['procedures_defnoreturn', 'procedures_defreturn', 'forever', 'on_start', 'scratch_on_start'];
const untanslatableFunctions = ['serial_setupConnection', 'sgp30_readCO2'];

let arduinoFunctions;

switch (INTERFACE_NAME) {
	case 'arduino':
		arduinoFunctions = FUNCTIONS_ARDUINO;
		break;
	case 'mBot':
		arduinoFunctions = FUNCTIONS_MBOT;
		break;
	default:
		arduinoFunctions = FUNCTIONS_ARDUINO;
		break;
}

// debug purpose no function exclusion
// const arduinoFunctions = {};
// const untanslatableFunctions = [];
const arduinoClasses = ['rgb_lcd', 'LiquidCrystal_I2C', 'Adafruit_NeoPixel', 'MeRGBLed'];
const arduinoLibraries = ['Servo.h','Wire.h', 'Arduino.h', 'MeMCore.h', 'SoftwareSerial.h', 'LiquidCrystal_I2C.h', 'Adafruit_SGP30.h', 'rgb_lcd.h', 'Adafruit_NeoPixel.h'];

const cppTypes = {
	int: 'NUMBER',
	char: 'CHARACTER',
	float: 'DECIMAL',
	boolean: 'BOOLEAN',
	short: 'SHORT_NUMBER',
	long: 'LARGE_NUMBER',
	String: 'TEXT',
};

// unused for now
const pinAnalogDeclaration = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const pinDeclaration = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];

const exludedTypes = ['comment', '{', '}', '(', ')'];

const arduinoBuilinFunctions = ["length"]

/**
 * The purpose of this class is to convert C++ code to Blockly blocks. It is mainly used for the Arduino Vittascience interface and its associated blockly toolbox.
 */

/** 
 * @fileoverview cppCode2Blocks.js
 * @author: Nixoals (Nicolas G.)
 */
export default class Cpp2Blocks {
	static instance;

	/**
	 * @param {workspace} workspace - The workspace to convert
	 * @param {object} Parser - The parser instance
	 * @param {boolean} initialized - The initialization state of the parser
	 * @param {object} declarationEntities - The declaration entities
	 * @param {object} _variableNodes - The variable nodes xml => if a variable is declared in the code, it will be stored in this object and appended to the workspace
	 * @param {object} _variables - The blockly variables defined in the code (id, type, name)
	 * @param {object} _functions - The functions defined in the code
	 * @param {object} _includes - The includes statements defined in the code
	 * @param {object} _defines - The define statements defined in the code
	 * @param {object} _classes - The classes defined in the code
	 * @param {object} vittaFunctions - The vitta functions (custom functions) used in the code. Should not be translated
	 * @param {object} pinModes - The pin modes defined in the code. Used to check if the pinMode is defined in the setup function. If not the digital of analog block will be treated as generic blocks
	 * @param {object} setupMode - The setup mode. Used to check if the block is within the setup function for certain blocks (XXX.begin, etc)
	 * @param {boolean} isWithinSetup - The setup state. Used to check if the block is within the setup function for certain blocks (pinMode, XXX.begin, etc)
	 * @param {object} codeManager - The code manager instance. Used to get the code from the editor
	 * @param {object} instance - The instance of the class. Used to check if the class is already instantiated => singleton pattern
	 */
	constructor() {
		if (Cpp2Blocks.instance) {
			return Cpp2Blocks.instance;
		}
		Cpp2Blocks.compteurInstances++;
		this.Parser = window.TreeSitter;
		this.workspace = null;
		this.initialized = false;
		this.declarationEntities = [];
		this._variableNodes = null;
		this._variables = {};
		this._functions = {};
		this._includes = new Set();
		this._defines = new Set();
		this._classes = {};
		this.vittaFunctions = new Set();
		this.pinModes = {};
		this.setupMode = {};
		this.isWithinSetup = false;
		this.codeManager = null;
		this.requireLastBlockId = false;
		this.blockToRemove = [];
		this.storedDisabledBlocks = [];
		this.debug = false;
		this.previousXml = [];
		this.indexPreviousXml = null;

		this.utils = utils;

		Cpp2Blocks.instance = this;
	}

	/**
	 * Compare the workspace tree with the AST (only for debug purpose)
	 * @returns {void}
	 **/
	compareTreeWorkspace() {
		const workspace = Blockly.getMainWorkspace();
		const xml = Blockly.Xml.workspaceToDom(workspace);
		const parsedCode = this.parseCode();

		console.log(xml);
		console.log(parsedCode);
	}

	/**
	 * Initialize the parser (Tree-sitter with the corresponding language)
	 * @description The parser is initialized asynchronously in ProjectManager in _setupArduinoInterfaceParameters(). The function will wait until the parser is initialized
	 * @returns {Promise<void>}
	 **/
	async initParser() {
		return new Promise(async (resolve, reject) => {
			const workspace = Blockly.getMainWorkspace();
			if (workspace === null) {
				setTimeout(() => {
					this.initParser();
				}, 100);
			} else {
				this.workspace = workspace;
				this.codeManager = CodeManager.getSharedInstance();
				await this.Parser.init();
				this.parserTS = new this.Parser();
				const Lang = await this.Parser.Language.load('/openInterface/interfaces/assets/js/external/tree-sitter/tree-sitter-cpp.wasm');
				this.parserTS.setLanguage(Lang);
				this.debug && console.log('Cpp2Blocks initialized');
				this.initialized = true;

				utils.cpp2Blocks = this;

				this.retreive_all_blocks();
				resolve();
			}
		});
	}

	/**
	 * Retrieve all blocks from the toolbox and add the ones that are not in the authorized blocks to the excluded blocks for traduction
	 */
	retreive_all_blocks = () => {
		const toolboxContent = Main.getToolboxManager().getToolboxBase().content;
		const allCat = Object.keys(toolboxContent);
		for (const cat of allCat) {
			if (!excludedCategories.includes(cat)) {
				const catContent = toolboxContent[cat];
				for (const cat of catContent) {
					if (cat.blocks) {
						EXCLUDED_BLOCKS_FOR_TRADUCTION.push(...cat.blocks.filter((block) => !AUTHORIZED_BLOCKS.includes(block)));
					}
				}
			}
		}
		const allBlocks = Main.getWorkSpace().getAllBlocks()
		for (let i = 0; i < allBlocks.length; i++) {
			if (typeof EXCLUDED_BLOCKS_FOR_TRADUCTION !== 'undefined' && EXCLUDED_BLOCKS_FOR_TRADUCTION.includes(allBlocks[i].type)) {
				if (!allBlocks[i].disabled) {
					Main.lockEditor(true);
				}
			}
		}
	};

	/**
	 * Get text code from the code manager (only for debug purpose)
	 * @returns {string}
	 * */
	getTextCode() {
		return Main.getCodeEditor().container.getSession().getValue();
	}

	storeXml() {
		this.previousXml.push(Blockly.Xml.workspaceToDom(this.workspace));
		if (this.previousXml.length > 30) {
			this.previousXml.shift();
		}
	}

	/**
	 * Parse the code and reconstrut the AST recursively
	 * @returns {object} - The AST in json format
	 * */
	parseCode() {
		this.code = this.getTextCode();
		const time = new Date().getTime();
		let tree;
		try {
			tree = this.parserTS.parse(this.code);
		} catch (error) {
			console.error('Error parsing code:', error);
			return null;
		}

		function nodeToJson(node) {
			return {
				type: node.type,
				text: node.text,
				children: node.children ? node.children.map((child) => nodeToJson(child)) : [],
				start: {
					row: node.startPosition.row,
					column: node.startPosition.column,
				},
				end: {
					row: node.endPosition.row,
					column: node.endPosition.column,
				},
			};
		}
		const astJson = nodeToJson(tree.rootNode);
		this.debug && console.log(`Parsing time: ${new Date().getTime() - time}ms`);
		return astJson;
	}

	/**
	 * @description Create a new xml node and recursively serialize the AST inside the node if needed
	 * @param {object} node - The node to create
	 * @param {string} type - The type of the node
	 * @param {object} fields - The fields of the block
	 * @param {object} values - The values of the block (if null the child block will be serialized as a statementsNode)
	 * @param {object} mutations - The mutations of the block
	 * @param {object} statementNode - The child node of the block that correspond to the value (if any)
	 * @param {string} element - The element to create // unused for now
	 * @param {object} statements - The statements of the block (if any) ex: DO statement (void loop, void setup, functions, if while statements, etc)
	 * @returns {object} - The block xml node appended to the parent node
	 * */
	createBlocklyBlockXml(node, type, fields, values, mutations, statementNode, element = 'block', statements = null) {
		let statement = null;
		let blockXml = utils.newNode(element, { type: type }, null, node);
		this.requireLastBlockId = false;
		if (fields !== null) {
			for (const key in fields) {
				if (key === 'VAR') {
					const field = utils.newNode('field', { name: key, id: fields[key].id }, fields[key].value, node);
					blockXml.append(field);
				} else {
					const field = utils.newNode('field', { name: key }, fields[key], node);
					blockXml.append(field);
				}
			}
		}

		if (values !== null) {
			for (const key in values) {
				const valueKey = values[key];
				const value = utils.newNode('value', { name: key }, valueKey, node);

				if (statementNode !== null) {
					const nodeValue = this.serializeNode(statementNode[key], node);
					if (nodeValue) {
						value.append(nodeValue);
					}
				}
				blockXml.append(value);
			}
		}
		// Function mutator
		if (mutations !== null && (type === 'procedures_defnoreturn' || type === 'procedures_defreturn')) {
			const mutationNode = utils.newNode('mutation', { name: fields.NAME }, null, node);
			blockXml.append(mutationNode);
			// maybe useless now - need to check
			for (const mutation of mutations) {
				const argName = mutation.name;
				const argType = cppTypes[mutation.type];

				const variableId = this.declareBlocklyVariable(argName, argType);
			}
		} else if (mutations !== null) {
			const attributes = {};
			let args = [];
			for (const key in mutations) {
				if (key === 'args') {
					args = [...mutations[key]];
				} else {
					attributes[key] = mutations[key];
				}
			}
			const mutationNode = utils.newNode('mutation', attributes, null, node);
			if (args.length > 0) {
				for (const arg of args) {
					const argNode = utils.newNode('arg', { name: arg }, null, node);
					mutationNode.append(argNode);
				}
			}
			blockXml.append(mutationNode);
		}

		if (statements !== null) {
			for (const key in statements) {
				let statementName = key;
				const statement = utils.newNode('statement', { name: statementName }, null, node);

				const statementNode = statements[key];

				this.parent = { type: 'statement', parent: statement };
				const parent = { type: 'statement', parent: statement };
				const childXml = this.serializeNode(statementNode, parent, type);
				if (childXml) {
					statement.append(childXml);
				}
				blockXml.append(statement);
			}
			return blockXml;
		}

		if (node.children && node.children.length > 0 && authorizedConnectors.includes(type)) {

			const statementName = type === 'procedures_defnoreturn' || type === 'procedures_defreturn' ? 'STACK' : 'DO';
			if (type === 'scratch_on_start') {
				// skip the first child (on_start)
				const parent = { type: 'block', parent: blockXml };
				const childXml = this.serializeMultipleNodes(node.children[2].children, parent, type, blockXml);
				if (childXml) {
					blockXml.append(childXml);
					return blockXml;
				}

			} else {

				statement = utils.newNode('statement', { name: statementName }, null, node);
				node.children.forEach((child) => {
					this.parent = { type: 'statement', parent: statement };
					const parent = { type: 'statement', parent: statement };
					const childXml = this.serializeNode(child, parent);
					if (childXml) {
						statement.append(childXml);
					}
				});
				blockXml.append(statement);
				return blockXml;
			}
		}

		return blockXml;
	}

	/**
	 * Serialize function block type
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineFunctionBlockType(node, parent = null) {
		// Check first if the block is a function declaration

		let declarator,
			args = [];
		let primiType = '';
		for (const elements of node.children) {
			if (elements.type === 'primitive_type' || elements.type === 'type_identifier') {
				primiType = elements.text;
			} else if (elements.type === 'function_declarator') {
				for (const child of elements.children) {
					if (child.type === 'identifier') {
						declarator = child.text;
					} else if (child.type === 'parameter_list') {
						for (const param of child.children) {
							if (param.type === 'parameter_declaration') {
								const getArgs = utils.getParameterList(param);
								args.push(getArgs);
							}
						}
					}
				}
			}
		}

		const checkForReturn = (node) => {
			let index = null;
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				let foundReturn;
				if (child.type === 'return_statement') {
					index = i;
					foundReturn = child.children.filter((childEl) => childEl.type === 'return');
					if (foundReturn.length > 0) {
						// Suppress the child node from the parent node to avoid double block creation if the fonction is a def_return
						if (index !== null) {
							node.children.splice(index, 1);
						}
						return child.children[1];
					} else {
						return null;
					}
				} else if (child.type === 'compound_statement') {
					const returnNode = checkForReturn(child);
					if (returnNode) {
						return returnNode;
					}
				}
			}
			return null;
		};

		this._functions[declarator] = { args, type: primiType };

		for (const func in arduinoFunctions) {
			if (utils.rmSpaces(arduinoFunctions[func]) === utils.rmSpaces(node.text)) {
				this.vittaFunctions.add(declarator);
				return '';
			} else {
			}
		}

		let returnNode = null;
		if (primiType !== 'void') {
			returnNode = checkForReturn(node);
			if (returnNode !== null && returnNode.type === 'call_expression') {
				returnNode.type = returnNode.type + '_for_return';
			}
		}

		// do not return block for untranslatable functions like the custom ones generated by blockly blocks
		if (untanslatableFunctions.includes(declarator)) return;

		if (declarator === 'setup' || declarator === 'onSetupScratch') {
			this.isWithinSetup = true;
		} else {
			this.isWithinSetup = false;
		}

		if (declarator === 'setup' || declarator === 'onSetupScratch') {
			if (declarator === 'onSetupScratch') {
				return {
					type: 'scratch_on_start',
					fields: null,
					values: {},
					mutations: null,
					statementsNode: null,
					statement: null,
				};
			} else {
				return {
					type: 'on_start',
					fields: null,
					values: {},
					mutations: null,
					statementsNode: null,
					statement: null,
				};
			}
		} else if (declarator === 'loop') {
			return {
				type: 'forever',
				fields: null,
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else if (returnNode !== null && primiType !== 'void') {
			return {
				type: 'procedures_defreturn',
				fields: { NAME: declarator },
				values: { RETURN: null },
				mutations: null,
				statementsNode: { RETURN: returnNode !== null ? returnNode : { type: 'string_literal', text: '' } },
				statement: null,
			};
		} else {
			return {
				type: 'procedures_defnoreturn',
				fields: { NAME: declarator },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
	}

	/**
	 * Serialize expression statement block type (manipulate this node with caution due to the possibility of nested blocks)
	 * @description Expression statement can generate multiple in case of generic call expressions (2 levels of nested expression_fields)
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineCallExpressionBlockType(node, parent = null) {
		let identifier = '';
		let statementsNode;
		let callEditable = true;
		let mutations = {};
		let mutationValues = {};
		let mutationStatementNodes = {};
		let nestedFieldExpressionNode = null;
		let needNestedFieldExpression = false;
		let newNode = {};
		let editableReturn = false;

		// add chain of arguments in case of call_expression_editable
		const addChain = (args) => {
			const argzNumber = args.length;
			mutations = { items: argzNumber };
			for (let i = 0; i < argzNumber; i++) {
				mutationValues[`items${i}`] = null;
				mutationStatementNodes[`items${i}`] = args[i];
			}
		};

		// generate a nested field expression block by creating a new custom node with a cutstom type => {type: "nestedFieldExpression"}
		const addNestedFieldExpression = () => {
			newNode = {
				type: 'call_expression',
				children: [],
			};
			for (const child of nestedFieldExpressionNode.children) {
				if (child.type === 'identifier') {
					identifier = child.text;
				} else if (child.type === 'call_expression') {
					identifier = child;
				} else if (child.type === 'field_identifier') {
					if (arduinoBuilinFunctions.includes(child.text) && utils.prototypeBlocks[`.${child.text}`]) {
						return utils.prototypeBlocks[`.${child.text}`](identifier);
					}
					newNode.children.push({ type: 'identifier', text: child.text });
				}
			}
			newNode.children.push({ type: 'argument_list', children: statementsNode });
			newNode.children.push({ type: 'nestedFieldExpression' });
			return null;
		};

		for (const child of node.children) {
			if (child.type === 'argument_list') {
				statementsNode = utils.getArgumentList(child.children);
			} else if (child.type === 'identifier') {
				identifier = child.text;
				needNestedFieldExpression = false;
			} else if (child.type === 'field_expression') {
				identifier = child.text;
				callEditable = false;
				nestedFieldExpressionNode = child;
				needNestedFieldExpression = true;
			} else if (child.type === 'nestedFieldExpression') {
				needNestedFieldExpression = false;
				callEditable = true;
				editableReturn = true;
			}
		}

		// console.log('identifier: ', identifier, "needNestedFieldExpression: ", needNestedFieldExpression);

		if (utils.prototypeBlocks[identifier]) {
			if (identifier === 'String') {
				for (const child of statementsNode) {
					if (child.type === 'call_expression') {
						return this.determineCallExpressionBlockType(child, node);
					}
				}
			}
			// avoid forcing the type of the variable in case of Serial.print or Serial.println, maybe redondant with the previous condition - need to check
			if (identifier === 'String' && parent.text.match(/Serial\.(print|println)/g)) {
				return this.getBlockType(statementsNode[0], node);
			}
			// case of pinMode for example (the pinMode should be declared in the setup function)
			const isAuthorized = utils.prototypeBlocks[identifier](node, null, null, null, statementsNode, null, parent);
			if (isAuthorized !== null) {
				return isAuthorized;
			}
		}

		if (callEditable) {
			if (statementsNode && statementsNode.length > 0) {
				addChain(statementsNode);
			}
		}
		if (needNestedFieldExpression) {
			const checkPrototypeBlock = addNestedFieldExpression();
			if (checkPrototypeBlock !== null) {
				return checkPrototypeBlock;
			}
		}
		// console.log('identifier: ', identifier);
		if (Object.keys(this._functions).includes(identifier)) {
			if (untanslatableFunctions.includes(identifier) || this.vittaFunctions.has(identifier)) return;
			const functionToCall = this._functions[identifier];
			const procedureCallBlock = {
				type: '',
				fields: {},
				values: {},
				mutations: {},
				statementsNode: {},
				statement: null,
			};
			procedureCallBlock.mutations = { name: identifier, args: [] };

			if (functionToCall.args.length > 0) {
				for (let i = 0; i < functionToCall.args.length; i++) {
					const argType = functionToCall.args[i].type;
					const argReturn = argType === 'int' ? { type: 'number_literal', text: '0' } : { type: 'string_literal', text: '' };
					procedureCallBlock.values[`ARG${i}`] = null;
					procedureCallBlock.statementsNode[`ARG${i}`] = statementsNode[i] !== undefined ? statementsNode[i] : argReturn;
					procedureCallBlock.mutations.args.push(functionToCall.args[i].name);
				}
			}

			if (this._functions[identifier].type === 'void') {
				procedureCallBlock.type = 'procedures_callnoreturn';
				return procedureCallBlock;
			} else {
				procedureCallBlock.type = 'procedures_callreturn';
				return procedureCallBlock;
			}
		}

		// if not in common blocks generate a call expression block (with chained arguments if fall within field_expression)
		// console.log("editableReturn: ", editableReturn);
		if (callEditable) {
			// console.log('parent of editable: ', parent, 'editableReturn: ', editableReturn);
			if (editableReturn || (parent !== null && (node.type.match(/_for_return/gi) || parent.type === 'call_expression' || parent.type === 'expression_statement' || parent.type === 'if_statement' || parent.type === 'declaration' || parent.type === 'binary_expression'))) {
				return {
					type: 'call_expression_editable_return',
					fields: { NAME: identifier },
					values: mutationValues,
					mutations: mutations,
					statementsNode: mutationStatementNodes,
					statement: null,
				};
			} else {
				return {
					type: 'call_expression_editable',
					fields: { NAME: identifier },
					values: mutationValues,
					mutations: mutations,
					statementsNode: mutationStatementNodes,
					statement: null,
				};
			}
		} else {
			// console.log('parent of call: ', parent);
			if (parent !== null && (node.type.match(/_for_return/gi) || parent.type === 'call_expression' || parent.type === 'expression_statement' || parent.type === 'if_statement' || parent.type === 'while_statement' || parent.type === 'unary_expression' || parent.type === 'binary_expression' || parent.type === 'for_statement' || parent.type === 'return_statement')) {
				return {
					type: 'call_expression_return',
					fields: { NAME: identifier },
					values: { chain: null },
					mutations: null,
					statementsNode: { chain: newNode },
					statement: null,
				};
			}
			return {
				type: 'call_expression',
				fields: { NAME: identifier },
				values: { chain: null },
				mutations: null,
				statementsNode: { chain: newNode },
				statement: null,
			};
		}
	}

	/**
	 * Serialize Number literal block type
	 * @description Number literal return a simple math_number block with the value of the number literal
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineNumberLiteralBlockType(node) {
		return {
			type: 'math_number',
			fields: { NUM: node.text },
			values: {},
			mutations: null,
			statementNode: null,
		};
	}

	/**
	 * Serialize Binary expression block type
	 * @description Binary expression can generate multiple blocks and may need interceptors to avoid simple math_arithmetic blocks (ex: string concatenation, array length, M_PI and constants, etc)
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineBinaryExpressionBlockType(node) {
		// debug  => maybe check if interceptor[...] is not null or undefined
		if (utils.interceptors[utils.rmSpaces(node.text)]) {
			return utils.interceptors[utils.rmSpaces(node.text)](node);
		}

		const operatorType = {
			'+': 'ADD',
			'-': 'MINUS',
			'*': 'MULTIPLY',
			'/': 'DIVIDE',
			'%': 'MODULO',
			'==': 'EQ',
			'!=': 'NEQ',
			'>': 'GT',
			'<': 'LT',
			'>=': 'GTE',
			'<=': 'LTE',
			'&&': 'AND',
			'||': 'OR',
		};

		const operatorText = node.children[1].text;
		const operator = operatorType[operatorText];

		if (operator === 'ADD') {
			let stringNodes = utils.checkForStringLiteralOnly(node);
			if (stringNodes.length > 0) {
				return utils.prototypeBlocks['text_join']('text_join', null, null, null, stringNodes, null);
			}
		}
		const checkType = ['number_literal', 'identifier', 'subscript_expression', 'binary_expression', 'string_literal', 'cast_expression', 'call_expression', 'field_expression'];
		let left = node.children[0];
		if (left.type === 'parenthesized_expression') {
			left = utils.checkForNested('parenthesized_expression', checkType, node.children[0]);
		}
		let right = node.children[2];
		if (right.type === 'parenthesized_expression') {
			right = utils.checkForNested('parenthesized_expression', checkType, node.children[2]);
		}

		const comparisonOperators = ['EQ', 'NEQ', 'GT', 'LT', 'GTE', 'LTE', 'AND', 'OR'];

		// not the proper way to handle this kind of interceptors - need to find a way to avoid hardcoded interceptors, but need functions like getVariableID from the utils.js
		if (node.text.match(/^sizeof\(\s*(\w+)\s*\)\s*\/\s*sizeof\(\s*\1\[\s*0\s*\]\s*\)$/)) {
			const varName = node.text.match(/^sizeof\(\s*(\w+)\s*\)\s*\/\s*sizeof\(\s*\1\[\s*0\s*\]\s*\)$/)[1];
			let varId = this.getVariableID(varName);
			if (varId === null) {
				this.declareBlocklyVariable(varName, 'array');
				varId = this.getVariableID(varName);
			}
			return utils.interceptors['array_length'](varName);
		}

		if (comparisonOperators.includes(operator)) {
			if (operator === 'AND' || operator === 'OR') {
				return {
					type: 'logic_operation',
					fields: { OP: operator },
					values: {
						A: null,
						B: null,
					},
					mutations: null,
					statementsNode: { A: left, B: right },
					statement: null,
				};
			} else {

				return {
					type: 'logic_compare',
					fields: { OP: operator },
					values: {
						A: null,
						B: null,
					},
					mutations: null,
					statementsNode: { A: left, B: right },
					statement: null,
				};
			}
		} else if (operator === 'MODULO') {
			return {
				type: 'math_modulo',
				fields: {},
				values: {
					DIVIDEND: null,
					DIVISOR: null,
				},
				mutations: null,
				statementsNode: { DIVIDEND: left, DIVISOR: right },
				statement: null,
			};
		} else {
			return {
				type: 'math_arithmetic',
				fields: { OP: operator },
				values: {
					A: null,
					B: null,
				},
				mutations: null,
				statementsNode: { A: left, B: right },
				statement: null,
			};
		}
	}

	/**
	 * Serialize Unary expression block type - only used for for statement, increment, decrement, not, etc
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineUnaryExpressionBlockType(node) {
		// unsed for now - need to find a way to include decrement in the block (not possible with the current block implementation)
		const operatorType = {
			'++': 'INCREMENT',
			'--': 'DECREMENT',
			'!': 'NOT',
		};

		const checkType = ['number_literal', 'identifier', 'subscript_expression', 'binary_expression', 'string_literal', 'call_expression', 'false', 'true'];
		let argument;
		for (const child of node.children) {
			if (child.type === '!') {
			} else if (checkType.includes(child.type)) {
				argument = child;
			}
		}

		if (utils.prototypeBlocks[node.children[1].text]) {
			return utils.prototypeBlocks[node.children[1].text](node);
		}
		

		return {
			type: 'logic_negate',
			values: {
				BOOL: null,
			},
			mutations: null,
			statementsNode: { BOOL: argument },
			statement: null,
		};
	}

	/**
	 * Serialize if statement block type
	 * @description If statement may need a lot of recursive call to serialize nested if statements inside else clauses in order to get if statement inside if statements inside if statements, etc
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	detectIfStatementBlockType(node) {
		const ifBlock = {
			type: 'controls_if',
			fields: {},
			values: {},
			mutations: {
				elseif: 0,
				else: 0,
			},
			statementsNode: {},
			statements: {},
		};

		let conditionIndex = 0;
		let doIndex = 0;

		let conditionClause = null;

		const extractCondition = (node) => {
			for (const child of node.children) {
				if (child.type === 'call_expression' || child.type === 'binary_expression' || child.type === 'unary_expression' || child.type === 'identifier' || child.type === 'number_literal' || child.type === 'string_literal') {
					return child;
				}
			}
		}

		function parseIfStatement(node) {
			for (const child of node.children) {
				if (child.type === 'condition_clause') {
					ifBlock.values[`IF${conditionIndex}`] = null;
					conditionClause = extractCondition(child);
					ifBlock.statementsNode[`IF${conditionIndex}`] = child.children.filter((child) => !exludedTypes.includes(child.type))[0];
					conditionIndex++;
				} else if (child.type === 'compound_statement') {
					ifBlock.statements[`DO${doIndex}`] = child;
					doIndex++;
				} else if (child.type === 'else_clause') {
					for (const elseChild of child.children) {
						if (elseChild.type === 'compound_statement') {
							if (elseChild.children.filter((child) => child.type === 'if_statement').length > 0) {
								parseIfStatement(elseChild.children);
							} else {
								ifBlock.statements['ELSE'] = elseChild;
								ifBlock.mutations.else += 1;
							}
						} else if (elseChild.type === 'if_statement') {
							ifBlock.mutations.elseif += 1;
							parseIfStatement(elseChild);
						}
					}
				}
			}
		}

		parseIfStatement(node);
		// console.log(ifBlock);
		const regex = /if\s*\(\s*Serial\.available\s*\(\s*\)\s*\)\s*{\s*(\w+)\s*=\s*Serial\.readString\s*\(\s*\)\s*;\s*}/;
		if (node.text.match(regex)) {
		}

		if (utils.prototypeBlocks[`${utils.rmSpaces(conditionClause.text)}_string`]){
			const check = utils.prototypeBlocks[`${utils.rmSpaces(conditionClause.text)}_string`](conditionClause, null, null, null, ifBlock.statements[`DO0`], null);
			if (check !== null) {
				return check;
			}
		}

		return ifBlock;
	}

	/**
	 * Serialize for statement block type
	 * @description For statement need to be handled with caution as it may contain multiple statements
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	detectForStatementBlockType(node) {
		const forBlock = {
			type: 'controls_for',
			fields: {},
			values: {},
			mutations: null,
			statementsNode: {},
			statements: {},
		};

		for (const child of node.children) {
			if (child.type === 'declaration') {
				const declaration = this.determineDeclarationBlockType(child, null, false);
				const varId = declaration.variableID;
				const varIdentifier = declaration.identifier;
				const varNode = declaration.node;
				forBlock.fields['VAR'] = { name: 'VAR', id: varId, value: varIdentifier };
				forBlock.values['FROM'] = null;
				forBlock.statementsNode['FROM'] = varNode;
			} else if (child.type === 'assignment_expression') {
				if (forBlock.values['FROM'] !== null) {
					const varId = this.getVariableID(child.children[0].text, child);
					forBlock.fields['VAR'] = { name: 'VAR', id: varId, value: child.children[0].text };
					forBlock.values['FROM'] = null;
					forBlock.statementsNode['FROM'] = child.children[2];
				} else {
					forBlock.values['BY'] = null;
					forBlock.statementsNode['BY'] = child.children[2];
				}
			} else if (child.type === 'binary_expression') {
				forBlock.values['TO'] = null;
				forBlock.statementsNode['TO'] = child.children[2];
			} else if (child.type === 'update_expression') {
				forBlock.values['BY'] = null;
				if (child.children[1].type === '++' || child.children[1].type === '--') {
					forBlock.statementsNode['BY'] = { type: 'number_literal', text: '1' };
				}
			} else if (child.type === 'compound_statement') {
				forBlock.statements['DO'] = child;
			}
		}
		// console.log(forBlock);
		return forBlock;
	}

	/**
	 * Serialize declaration block type
	 * @description declaration block can generate multiple blocks especially in case of nested filed expressions, and may or may not return something
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @param {object} standalone - standalone flag (ex : for declaration block)
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineDeclarationBlockType(node, parent = null, standalone = true) {
		// Logique pour déterminer le type de bloc pour une déclaration
		if (this._variableNodes === null) {
			const variableNode = utils.newNode('variables', {}, null, null);
			this._variableNodes = variableNode;
			this.xml.prepend(variableNode);
		}

		let identifier = null;
		let type = null;
		let value = null;
		let childNode = null;
		let functionDeclaratorFlag = false;
		let argumentList = null;
		for (const child of node.children) {
			if (child.type === 'init_declarator') {
				for (const initChild of child.children) {
					switch (initChild.type) {
						case 'function_declarator':
							functionDeclaratorFlag = true;
						case 'identifier':
							if (identifier === null) {
								identifier = initChild.text;
							} else {
								type = initChild.text;
								value = initChild;
								childNode = initChild;
								if (pinAnalogDeclaration.includes(String(initChild.text))) {
									childNode.type = 'pin_declaration';
								}
							}
							break;
						case 'argument_list':
							argumentList = utils.getArgumentList(initChild.children);
							break;
						case 'number_literal':
						case 'string_literal':
						case 'char_literal':
						case 'call_expression':
						case 'binary_expression':
						case 'unary_expression':
						case 'cast_expression':
						case 'new_expression':
							type = initChild.type;
							value = initChild;
							childNode = initChild;
							break;
						case 'array_declarator':
							for (const arrayChild of initChild.children) {
								if (arrayChild.type === 'identifier') {
									identifier = arrayChild.text;
								}
							}
							break;
						case 'initializer_list':
							if (functionDeclaratorFlag) {
								return {
									type: 'untranslatable_block',
									fields: { CODE: node.text.replace('//', '') },
									values: {},
									mutations: null,
									statementsNode: null,
									statement: null,
								};
							} else {
								childNode = initChild;
							}
						case 'subscript_expression':
							childNode = initChild;
							break;
					}
				}
			} else {
				if (child.type === 'identifier') {
					identifier = child.text;
				} else if (child.type === 'primitive_type' || child.type === 'sized_type_specifier' || child.type === 'type_identifier') {
					type = child.text;
				}
			}
		}

		const variableID = Blockly.utils.genUid();
		if (identifier !== null && type !== null) {
			const newVariable = utils.newNode('variable', { id: variableID }, identifier, null);
			if (this._variables[identifier] === undefined) {
				this._variableNodes.appendChild(newVariable);
			}
			this._variables[identifier] = { type: type, id: variableID, value, argument: argumentList || childNode };
		}

		if (parent !== null && parent.type === 'translation_unit') {
			if (arduinoClasses.includes(type) && this._includes.has(`${type}.h`)) {
				this._classes[identifier] = argumentList ? { argumentList } : {};
			}
			return;
		}

		if (childNode !== null && standalone) {
			if (childNode === null) return { variableID, value, node: childNode };
			return {
				type: 'variables_set',
				fields: { VAR: { name: 'VAR', id: variableID, value: identifier } },
				values: {
					VALUE: null,
				},
				mutations: null,
				statementsNode: { VALUE: childNode },
			};
		} else {
			return { variableID, identifier, node: childNode };
		}
	}

	/**
	 * Serialize subscript expression block type
	 * @description Subscript expression used to get an element from an array
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineSubscriptExpressionBlockType(node) {
		let identifier = null;
		let index = null;

		for (const child of node.children) {
			if (child.type === 'identifier') {
				identifier = child;
			} else if (child.type === 'subscript_argument_list') {
				for (const subChild of child.children) {
					if (subChild.type === 'number_literal' || child.type === 'identifier') {
						index = subChild;
					}
				}
			}
		}

		return {
			type: 'lists_getIndex',
			fields: { WHERE: 'FROM_START' },
			values: {
				LIST: null,
				AT: null,
			},
			mutations: null,
			statementsNode: { LIST: identifier, AT: index },
			statement: null,
		};
	}

	/**
	 * Serialize initializer list block type
	 * @description Initializer list block
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineInitializerListBlockType(node) {
		const initializerListBlock = {
			type: 'lists_create_with',
			fields: {},
			values: {},
			mutations: {},
			statementsNode: {},
			statement: null,
		};

		let index = 0;
		for (let i = 0; i < node.children.length; i++) {
			const child = node.children[i];
			// console.log('child: ', child);
			if (child.type === 'number_literal' || child.type === 'string_literal' || child.type === 'identifier') {
				initializerListBlock.values[`ADD${index}`] = null;
				initializerListBlock.statementsNode[`ADD${index}`] = child;
				index++;
			} else {
				// unused for now but may be interesting to handle the case
				// return {
				// 	type: 'untranslatable_block',
				// 	fields: { CODE: node.text.replace('//', '') },
				// 	values: {},
				// 	mutations: null,
				// 	statementsNode: null,
				// 	statement: null,
				// };
			}
		}

		const addMutations = () => {
			initializerListBlock.mutations = { items: Object.keys(initializerListBlock.values).length };
		};

		addMutations();
		return initializerListBlock;
	}

	/**
	 * Serialize string literal block type
	 * @description String literal block => return a simple text block with the value of the string literal
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineStringLiteralBlockType(node) {
		const beautifyString = (str) => {
			return str.replace(/"/g, '');
		};
		return {
			type: 'text',
			fields: { TEXT: beautifyString(node.text) },
			values: {},
			mutations: null,
			statementNode: null,
		};
	}

	/**
	 * @description Get the id of a Blockly variable => to put in utils if possible but requires constants from the current class
	 * @param {string} variableName - The name of the variable
	 * @param {object} node - The node to serialize
	 * @returns {string} - The id of the variable
	 * */
	getVariableID(variableName, node = null) {
		if (this._variableNodes === null) {
			if (node === null) {
				return null;
			} else {
				let type;
				for (const child of node.children) {
					if (child.type === 'number_literal' || child.type === 'string_literal') {
						switch (child.type) {
							case 'number_literal':
								type = 'int';
								break;
							case 'string_literal':
								type = 'String';
								break;
							case 'char_literal':
								type = 'CHARACTER';
								break;
						}
					}
				}
				this.declareBlocklyVariable(variableName, type);
			}
		}
		const variablesID = this._variableNodes.querySelectorAll('variable');
		for (const variable of variablesID) {
			if (variable.textContent === variableName) {
				return variable.getAttribute('id');
			}
		}
		return null;
	}

	/**
	 * @description Declare a Blockly variable
	 * @param {string} variableName - The name of the variable
	 * @param {string} variableType - The type of the variable
	 * @returns {string} - The id of the variable
	 * */
	declareBlocklyVariable(variableName, variableType) {
		if (this._variableNodes === null) {
			const variableNode = utils.newNode('variables', {}, null, null);
			this._variableNodes = variableNode;
			this.xml.prepend(variableNode);
		}

		const variableID = Blockly.utils.genUid();
		if (this._variables[variableName] === undefined) {
			this._variables[variableName] = { type: variableType, id: variableID };
		}
		this._variables[variableName].id = variableID;
		const newVariable = utils.newNode('variable', { id: variableID }, variableName, null);
		this._variableNodes.appendChild(newVariable);
		return variableID;
	}

	/**
	 * Serialize assignment block type
	 * @description Assignment block can generate either variables_set block or variables_increment block (in case of increment)
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineAssignmentBlockType(node, parent = null) {
		let left,
			right,
			type = 'all';
		let operator = null;
		let stringIncrement = false;

		const typeMappings = {
			number_literal: 'int',
			string_literal: 'String',
			char_literal: 'CHARACTER',
			call_expression: 'function',
			subscript_expression: 'array',
			binary_expression: 'all',
			unary_expression: 'all',
			parenthesized_expression: 'all',
			cast_expression: 'all',
			false : 'all',
			true : 'all',
			call_expression: 'function',
			new_expression: 'all',

		};

		for (const child of node.children) {
			if (child.type === 'identifier') {
				if (left === undefined) {
					left = child;
				} else {
					right = child;
					// maybe useless
					if (pinAnalogDeclaration.includes(String(child.text))) {
						right.type = 'pin_declaration';
					}
				}
			} else if (Object.keys(typeMappings).includes(child.type)) {
				right = child;
				type = typeMappings[child.type] || type;
			} else if (child.type === '+=' || child.type === '-=' || child.type === '*=' || child.type === '/=') {
				operator = child.text;
			}
		}

		const checkClasses = utils.storeVariable(left, right, type);
		if (checkClasses !== null){
			return checkClasses;
		}
		const varID = this.getVariableID(left.text) || this.declareBlocklyVariable(left.text, type);
		if (parent !== null && parent.type === 'translation_unit') return;

		if (utils.interceptors[utils.rmSpaces(node.text)]) {
			return utils.interceptors[utils.rmSpaces(node.text)](node);
		}

		if (operator !== null) {
			if (type === "function" && right.children[0].text === "String") {
				const stringNodes = utils.getArgumentList(right.children[1].children);
				return {
					type: 'text_append',
					fields: { VAR: { name: 'VAR', id: varID, value: left.text } },
					values: {TEXT: null},
					mutations: null,
					statementsNode: {TEXT: stringNodes[0] || { type: 'string_literal', text: '' }},
				}
			} else {
			
				return {
					type: 'variables_increment',
					fields: { VAR: { name: 'VAR', id: varID, value: left.text } },
					values: { DELTA: null },
					mutations: null,
					statementsNode: { DELTA: right },
					statement: null,
				};
			}
		} else {
			return {
				type: 'variables_set',
				fields: { VAR: { name: 'VAR', id: varID, value: left.text } },
				values: { VALUE: null },
				mutations: null,
				statementsNode: { VALUE: right },
				statement: null,
			};
		}
	}

	/**
	 * Serialize expression statement block type
	 * @description Expression statement block can generate either call expression block or assignment block
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineExpressionStatementBlockType(node, parent = null) {
		for (const child of node.children) {
			if (child.type === 'call_expression') {
				const callExpressionBlock = this.determineCallExpressionBlockType(child, parent);
				return callExpressionBlock;
			} else if (child.type === 'assignment_expression') {
				return this.determineAssignmentBlockType(child);
			}
		}
	}

	/**
	 * Serialize identifier block type
	 * @description Identifier block are used to get the value of a variable and create it if not already declared
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineIdentifierBlockType(node) {
		let varId;
		varId = this.getVariableID(node.text, node);
		if (varId === null) {
			const declaration = this.determineDeclarationBlockType(node, null, false);
			varId = declaration.variableID;
		}

		// add variable to variableNodes if not already declared
		if (this._variables[node.text] === undefined) {
			this.declareBlocklyVariable(node.text, 'int');
		}

		// forBlock.fields['VAR'] = { name: 'VAR', id: varId, value: varValue };
		if (utils.prototypeBlocks[node.text]) {
			return utils.prototypeBlocks[node.text](node.text, null, null, null, null, null);
		}
		return {
			type: 'variables_get',
			fields: { VAR: { name: 'VAR', id: varId, value: node.text } },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}

	/**
	 * Serialize Comment block type
	 * @description Comment block are used to add comments to the code (not in the original toolbox)
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineCommentBlockType(node, parent = null) {

		const excludedComments = utils.EXCLUDED_COMMENTS;
		for (const com of excludedComments) {
			if (node.text.match(com)) {
				return '';
			}
		}

		if (parent !== null && parent.type === 'translation_unit') {
			return {
				type: 'comment_block_standalone',
				fields: { COMMENT: node.text.replace('//', '') },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else {

			return {
				type: 'comment_block',
				fields: { COMMENT: node.text.replace('//', '') },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
	}

	/**
	 * Serialize While statement block type
	 * @description While statement block are used to create while loops in the code. It may contain nested blocks in the condition clause and the compound statement
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	detectWhileStatementBlockType(node) {
		// check if the while statement is an arduino function generated by blockly
		for (const func in arduinoFunctions) {
			if (arduinoFunctions[func].split(' ').join('') === node.text.split(' ').join('')) {
				this.vittaFunctions.add(func);
				return '';
			}
		}
		let whileBlock

		whileBlock = {
			type: 'controls_whileUntil',
			fields: {},
			values: {},
			mutations: null,
			statementsNode: {},
			statements: {},
		};

		const conditionType = ['unary_expression', 'parenthesized_expression', 'binary_expression', 'identifier', 'call_expression', "false", "true"];

		let checkForUnary = false;

		// skip normal while statement if we are in void loop (scratch_forever)
		if (node.type === "while_statement_forever") {
			whileBlock.type= "scratch_forever";
			for (const child of node.children) {
				if (child.type === 'compound_statement') {
					whileBlock.statements['DO'] = child;
				}
			}
			return whileBlock;
		}

		for (const child of node.children) {
			if (child.type === 'condition_clause') {
				// whileBlock.values['MODE'] = 'UNTIL';
				whileBlock.values['BOOL'] = null;
				let statement = child.children.filter((child) => conditionType.includes(child.type))[0];
				if (statement.type === 'parenthesized_expression') {
					statement = utils.checkForNested('parenthesized_expression', ['unary_expression', 'binary_expression'], statement);
				} else if (statement.type === 'unary_expression') {
					checkForUnary = true;
					statement = utils.checkForNested('parenthesized_expression', ['binary_expression', 'identifier', 'call_expression'], statement);
				}
				whileBlock.fields['MODE'] = checkForUnary ? 'UNTIL' : 'WHILE';
				whileBlock.statementsNode['BOOL'] = statement;
			} else if (child.type === 'compound_statement') {
				whileBlock.statements['DO'] = child;
			}
		}
		
		return whileBlock;
	}

	/**
	 * Break and continue statement block type for loops
	 * @description Break and continue statement block are used to break or continue a loop. It will check the grand parent node to determine if the block is authorized => should not be used outside of a loop
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @param {object} grandParent - The grand parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineContinueBreakStatementBlockType = (node, parent, grandParent) => {
		const grandParentAuthorised = ['forever', 'controls_repeat', 'controls_whileUntil', 'controls_for', 'controls_forEach', 'controls_flow_statements'];
		if (!grandParentAuthorised.includes(grandParent)) return;
		let statementType = '';
		for (const child of node.children) {
			if (child.type === 'continue') {
				statementType = 'CONTINUE';
			} else if (child.type === 'break') {
				statementType = 'BREAK';
			}
		}
		
		return {
			type: 'controls_flow_statements',
			fields: { FLOW: statementType },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}

	/**
	 * Serialize Cast expression block type
	 * @description Cast expression block are used to cast a variable to a specific type. See cppTypes
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineCastExpressionBlockType(node) {
		let typeDescriptor = '';
		let expression = null;
		const checkType = ['number_literal', 'identifier', 'subscript_expression', 'binary_expression', 'string_literal', 'call_expression'];

		for (const child of node.children) {
			if (child.type === 'type_descriptor') {
				typeDescriptor = cppTypes[child.text];
			} else if (checkType.includes(child.type)) {
				expression = child;
			}
		}

		return {
			type: 'variables_force_type',
			fields: { TYPE: typeDescriptor },
			values: { VALUE: null },
			mutations: null,
			statementsNode: { VALUE: expression },
			statement: null,
		};
	}

	/**
	 * Serialize Return statement block type
	 * @description Return statement block are used to return a value from a function. If a return statement is found at the first level of the function, it will return a procedures_defnoreturn block, otherwise it will return a procedures_simple_return block. This block is not present in the toolbox but can be generated by the code
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineReturnStatementBlockType(node, parent = null) {
		let returnNode;
		for (const child of node.children) {
			if (child.type === 'identifier' || child.type === 'number_literal' || child.type === 'string_literal' || child.type === 'call_expression' || child.type === 'binary_expression' || child.type === 'unary_expression' || child.type === 'cast_expression' || child.type === 'subscript_expression') {
				returnNode = child;
			}
		}
		return {
			type: 'procedures_simple_return',
			fields: {},
			values: { VALUE: null },
			mutations: null,
			statementsNode: { VALUE: returnNode },
			statement: null,
		};
	}

	/**
	 * Serialize Switch case statement block type
	 * @description Switch case statement block are used to create switch case statements in the code. It is not présent in the toolbox but can be generated by the code
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineSwitchStatementBlockType(node) {
		const switchBlock = {
			type: 'switch_case',
			fields: {},
			values: {},
			mutations: null,
			statementsNode: {},
			statements: {},
		};

		let caseIndex = 0;
		let defaultIndex = 0;
		const checkType = ['number_literal', 'identifier', 'subscript_expression', 'binary_expression', 'string_literal', 'call_expression'];

		function createCompoundStatement(children) {
			const compoundStatement = { type: 'compound_statement', children };
			return compoundStatement;
		}

		function parseSwitchStatement(node) {
			for (const child of node.children) {
				if (child.type === 'condition_clause') {
					switchBlock.values['SWITCH_VAR'] = null;
					switchBlock.statementsNode['SWITCH_VAR'] = child.children.filter((child) => checkType.includes(child.type))[0];
				} else if (child.type === 'compound_statement') {
					for (const compoundChild of child.children) {
						if (compoundChild.type === 'case_statement') {
							switchBlock.values[`CASE${caseIndex}`] = null;
							switchBlock.statementsNode[`CASE${caseIndex}`] = compoundChild.children[1];
							switchBlock.statements[`DO${caseIndex}`] = createCompoundStatement(compoundChild.children.slice(2));
							caseIndex++;
						}
					}
				}
			}
		}
		parseSwitchStatement(node);
		switchBlock.mutations = { case: caseIndex };
		// console.log(switchBlock);
		return switchBlock;
	}

	/**
	 * Serialize Include block type
	 * @description Include block are used to include libraries in the code. It is not présent in the toolbox but can be generated by the code. Depending on the name of the include, if it is used for a custom vittascience block, it will not be added to the workspace, but added to Blockly.Arduino.include
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineIncludeBlockType(node) {
		let includeName = null;
		let type = null;
		for (const child of node.children) {
			if (child.type === 'system_lib_string') {
				includeName = child.text;
				type = 'system';
			} else if (child.type === 'string_literal') {
				includeName = child.text;
				type = 'local';
			}
		}

		includeName = includeName.replace(/"/g, '').replace(/</g, '').replace(/>/g, '');

		if (!this._includes.has(includeName)) {
			this._includes.add(includeName);
			if (arduinoLibraries.includes(includeName)) return;
			return {
				type: 'preproc_include',
				fields: { LIBRARY: includeName, TYPE: type },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}

		return '';
	}

	/**
	 * Serialize Define block type
	 * @description Define block are used to define constants in the code. It is not présent in the toolbox but can be generated by the code. Depending on the type of define, if it is used for a custom vittascience block, it will not be added to the workspace, but added to Blockly.Arduino.definitions_ with Blockly.Arduino.addDefine function to avoid duplicate defines
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineDefineBlockType(node) {
		let defineName = null;
		let defineValue = null;
		for (const child of node.children) {
			if (child.type === 'identifier') {
				defineName = child.text;
			} else if (child.type === 'preproc_arg') {
				defineValue = child.text;
			}
		}
		if (!this._defines.has(defineName)) {
			this._defines.add(defineName);

			// Avoid adding pin generic bloc that correspond to a specific block (ex: simple button) => TO REFINE for multi INTERFACES USE 🔧🔧🔧🔧🔧
			const checkPin = defineName.match(/^(PIN_SIMPLE_BUTTON|PIN_LED_MODULE|NP_LED_COUNT)_(\d+|[A-Z]\d)$/);
			// console.log('checkPin: ', checkPin);
			if (checkPin && pinDeclaration.includes(checkPin[2])) {
				if (checkPin[2].match(/[A-Z]\d/)) {
					switch (checkPin[1]) {
						case 'PIN_SIMPLE_BUTTON':
							return Blockly.Arduino.addDefine(checkPin[2] + '-Simple Button', '#define ' + defineName + ' ' + defineValue);
						case 'PIN_LED_MODULE':
							return Blockly.Arduino.addDefine(checkPin[2] + '-LED Module', '#define ' + defineName + ' ' + defineValue);
						case 'NP_LED_COUNT':
							return Blockly.Arduino.addDefine(`def_led_count_${checkPin[2]}`, '#define ' + defineName + ' ' + defineValue);
					}
				} else {
					switch (checkPin[1]) {
						case 'PIN_SIMPLE_BUTTON':
							return Blockly.Arduino.addDefine('D' + checkPin[2] + '-Simple Button', '#define ' + defineName + ' ' + defineValue);
						case 'PIN_LED_MODULE':
							return Blockly.Arduino.addDefine('D' + checkPin[2] + '-LED Module', '#define ' + defineName + ' ' + defineValue);
						case 'NP_LED_COUNT':
							return Blockly.Arduino.addDefine(`def_led_count_${checkPin[2]}`, '#define ' + defineName + ' ' + defineValue);
					}
				}
			}
			return {
				type: 'preproc_define',
				fields: { NAME: defineName, VALUE: defineValue },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
	}

	/**
	 * Serialize Pin declaration block type. Not used for now
	 * @param {object} node - The node to serialize
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determinePinDeclarationBlockType(node) {
		let pinNumber = node.text;
		return {
			type: 'define_pin',
			fields: { PIN: pinNumber },
			values: {},
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}

	/**
	 * Shortcut to determine the block type of a bypass node witch is a custom node that can be used to bypass the serialization of a node and pass directly to the next node
	 * example: the method write_digital can call the bypass node to pass directly io_digital_signal that should normally be serialized as an integer (0 or 1) but instead call the state block HIGHT or LOW => pin0.write_digital(1)
	 * example 2: music.play will call music_note_single which will be called as mutator block instead of a text block
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - The block xml node with child nodes (if any)
	 * */
	determineBypassBlockType = (node, parent) => {
		// Maybe add the possibility to add children to the bypass node
		if (utils.prototypeBlocks[node.block]) {
			return utils.prototypeBlocks[node.block](node.text, parent);
		} else {
			return '';
		}
	};

	determineBooleanBlockType = (node, parent) => {
		if (node.text === 'true') {
			return {
				type: 'logic_boolean',
				fields: { BOOL: 'TRUE' },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		} else if (node.text === 'false') {
			return {
				type: 'logic_boolean',
				fields: { BOOL: 'FALSE' },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		}
	};

	/**
	 * Get the block type of a node depending on the type of the node from the AST. Kind of the crossroad of the serialization
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {func} - Call the appropriate function to serialize the node
	 * */
	getBlockType(node, parent = null, grandParent = null) {
		switch (node.type) {
			case 'function_definition':
				return this.determineFunctionBlockType(node, parent);
			case 'expression_statement':
				return this.determineExpressionStatementBlockType(node, parent);
			case 'compound_statement':
				return 'multiNode';
			case 'field_expression':
			case 'call_expression_for_return':
			case 'call_expression':
				return this.determineCallExpressionBlockType(node, parent);
			case 'number_literal':
				return this.determineNumberLiteralBlockType(node, parent);
			case 'char_literal':
				// TODO: handle char literal
			// return this.determineCharLiteralBlockType(node);
			case 'string_literal':
				return this.determineStringLiteralBlockType(node, parent);
			case 'binary_expression':
				return this.determineBinaryExpressionBlockType(node, parent);
			case 'unary_expression':
				return this.determineUnaryExpressionBlockType(node, parent);
			case 'if_statement':
				return this.detectIfStatementBlockType(node, parent);
			case 'for_statement':
				return this.detectForStatementBlockType(node, parent);
			case 'continue_statement':
			case 'break_statement':
				return this.determineContinueBreakStatementBlockType(node, parent, grandParent);
			case 'declaration':
				return this.determineDeclarationBlockType(node, parent);
			case 'assignment_expression':
				return this.determineAssignmentBlockType(node, parent);
			case 'identifier':
				return this.determineIdentifierBlockType(node, parent);
			case 'comment':
				return this.determineCommentBlockType(node, parent);
			case 'initializer_list':
				return this.determineInitializerListBlockType(node, parent);
			case 'subscript_expression':
				return this.determineSubscriptExpressionBlockType(node, parent);
			case 'while_statement_forever':
			case 'while_statement':
				return this.detectWhileStatementBlockType(node, parent);
			case 'cast_expression':
				return this.determineCastExpressionBlockType(node, parent);
			case 'return_statement':
				return this.determineReturnStatementBlockType(node, parent);
			case 'switch_statement':
				return this.determineSwitchStatementBlockType(node, parent);
			case 'preproc_include':
				return this.determineIncludeBlockType(node, parent);
			case 'preproc_def':
				return this.determineDefineBlockType(node, parent);
			case 'pin_declaration':
				return this.determinePinDeclarationBlockType(node, parent);
			case 'false':
			case 'true':
				return this.determineBooleanBlockType(node, parent);
			case 'bypass':
				return this.determineBypassBlockType(node, parent);
			default:
				return '';
		}
	}

	/**
	 * Serialize multiple nodes
	 * @param {object} nodes - The nodes to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - xml node with child nodes (if any) and next statements if in compound statement
	 * */
	serializeMultipleNodes(nodes, parent, grandParent = null, skipNext = false) {
		let previousBlock = skipNext;
		let parentNode = null;
		let next = null;

		nodes.forEach((node) => {
			this.requireLastBlockId = true;
			const xml = this.serializeNode(node, parent, grandParent);
			const blockElement = parent.parent.querySelector("block");
			const nextBlockElement = next?.querySelector("block");

			if (blockElement) {
				const blockId = blockElement.getAttribute('id');
				if (this.blockToRemove.includes(blockId)) {
					blockElement.remove();
					parent.parent.append(xml);
					previousBlock = xml;
					parent.type = 'block';
					return; 
				}
			}

			if (nextBlockElement) {
				const blockId = nextBlockElement.getAttribute('id');
				if (this.blockToRemove.includes(blockId)) {
					nextBlockElement.remove();

					next.append(xml);

					previousBlock = xml;
					parent.type = 'block';
	
					return; 
				}
			}


			if (xml) {
				if (parent.type === 'statement') {
					parent.parent.append(xml);
					previousBlock = xml;
					parent.type = 'block';
				} else if (parent.type === 'block') {
					if (previousBlock) {
						next = utils.newNode('next', {}, null, null);
						previousBlock.append(next);
						next.append(xml);
						previousBlock = xml;
					}
				}
				parentNode = node;
			}
		});
	}

	/**
	 * Serialize a node
	 * @param {object} node - The node to serialize
	 * @param {object} parent - The parent node
	 * @returns {object} - xml node with child nodes (if any)
	 * */
	serializeNode(node, parent = null, type = null) {
		try {
			const blockType = this.getBlockType(node, parent, type);
			if (blockType === 'multiNode') {
				return this.serializeMultipleNodes(node.children, parent, type);
			} else if (typeof blockType === 'object' && blockType.type !== undefined) {
				return this.createBlocklyBlockXml(node, blockType.type, blockType.fields, blockType.values, blockType.mutations, blockType.statementsNode, blockType.element, blockType.statements);
			}
			return '';
		} catch (error) {
			if (node.start !== undefined && node.start.row !== undefined) {
				console.error(`Error serializing node (line ${node.start.row+1}):`, error);
			} else {
				console.error(`Error serializing node:`, error);
			}
			return '';
		}
	}

	/**
	 * Create the AST from the code
	 * @param {string} firstPass - Flag to indicate if it is the first pass and retreive the functions name from the code
	 * @param {object} ast - The AST to serialize
	 * @returns {object} - The AST in json format
	 * */
	convertAstToXml(firstPass = true, ast = null) {
		let astJson;

		if (firstPass) {
			astJson = this.parseCode();
			try {
				// doesn't work for now but need something more efficient than parsing the entire AST to get functions names 😅
				// this.collectFunctionDefinitions(astJson);
				return this.convertAstToXml(false, astJson);
			} catch (error) {
				console.error('Error collecting function definitions:', error);
			}
		} else {
			astJson = ast;
		}

		/**
		 * @description ONLY FOR SCRATCH TOOLBOX: convert the AST to fit with scratch requirements => on_start block does not contain DO statement (all blocks should be connected as next statement). Void Loop should be connected as next statement of on_start block after all setup instructions
		 * @param {Object} astJson 
		 */
		const reworkAst =  (astJson) => {
			const onSetup = [];
			const other = [];
			for (const child of astJson.children) {

				if (child.type === 'function_definition') {
					if (child.children[1].children[0].text === 'setup') {
						onSetup.push(...child.children[2].children);
					} else if (child.children[1].children[0].text === 'loop'){
						const newWhileTrue = {type: 'while_statement_forever', "text": child.children[2].text, children: [{type: "compound_statement", children: child.children[2].children}]};
						onSetup.push(newWhileTrue);
					} else {
						other.push(child);
					}
				} else {
					other.push(child);
				}
			}
			astJson.children = [
				...other,
				{
					type: 'function_definition',
					text: "",
					children: [
						{type: "primitive_type", text: "void"},
						{type: "function_declarator", text: "onSetupScratch", children: [{type: "identifier", text: "onSetupScratch", children: []}]},
						{type: "compound_statement", children: [...onSetup]},
					],
				}
			];
		};

		
		const toolboxMode = Blockly.Constants.getToolboxStyle();
		if (toolboxMode === 'scratch'){
			reworkAst(astJson);
		}


		this.debug && console.log(astJson);
		this.xml = utils.newNode('xml', { xmlns: 'https://developers.google.com/blockly/xml' }, null, null);
		astJson.children.forEach((node) => {
			const blockXml = this.serializeNode(node, astJson);
			if (blockXml) {
				this.xml.append(blockXml);
			}
		});

		let xmlString = new XMLSerializer().serializeToString(this.xml);
		xmlString = xmlString.replace(/a0:/g, '');
		xmlString = xmlString.replace(/xmlns(:\w+)?="http:\/\/www.w3.org\/1999\/xhtml"/g, '');
		return xmlString;
	}

	/**
	 * Collect function definitions - unused for now
	 * @param {object} astJson - The AST in json format
	 * */
	collectFunctionDefinitions(astJson) {
		this._functions = {}; // Reset function definitions

		function traverse(node) {
			if (node.type === 'function_definition') {
				let functionName = node.children[1].text.replace('(', '').replace(')', '');
				if (functionName === 'setup' || functionName === 'loop') {
					this._functions[functionName] = node;
				}
			}

			if (node.children) {
				node.children.forEach((child) => traverse.call(this, child));
			}
		}
		traverse.call(this, astJson);
	}

	/**
	 * Reset all properties in the class
	 * @returns {void}
	 * */
	resetBlocks() {
		Blockly.Arduino.definitions_ = Object.create(null);
		this._variableNodes = null;
		this._variables = {};
		this._includes.clear();
		this._defines.clear();
		this.blockToRemove = [];
		this._classes = {};
		this.pinModes = {};
		this.setupMode = {};
	}

	/**
	 * Organize prototype blocks
	 * @description Organize the blocks in the workspace by moving them to the best readable position. Void setup and loop blocks are moved to the top of the workspace. Custom function blocks are moved to the right of the workspace. Define and include blocks are moved to the top of the workspace (if any) and before the setup block
	 * @returns {void}
	 * */
	organizePrototypeBlocks() {
		try {
			const workspace = this.workspace;
			let x = 10;
			let y = 10;
			let functionX = 350;
			let functionY = 0;
			const allBlocks = workspace.getAllBlocks();
			const untranslatableBlocks = allBlocks.filter((block) => block.type === 'untranslatable_block');
			// const commentBlocks = allBlocks.filter((block) => block.type === 'comment_block_standalone');
			const setupBlock = allBlocks.find((block) => block.type === 'on_start' || block.type === 'scratch_on_start');
			const loopBlock = allBlocks.find((block) => block.type === 'forever');
			const functionBlocks = allBlocks.filter((block) => block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn');

			// preproc includes and defines
			const preprocBlocks = allBlocks.filter((block) => block.type === 'preproc_include' || block.type === 'preproc_define' || block.type === 'comment_block_standalone');

			// get setup block height
			let setupBlockHeight = 0;

			if (preprocBlocks.length > 0) {
				preprocBlocks.forEach((block) => {
					block.moveBy(x, y);
					y += block.height + 5;
				});
			}

			if (untranslatableBlocks.length > 0) {
				untranslatableBlocks.forEach((block) => {
					block.moveBy(x, y);
					y += block.height + 10;
				});
			}

			if (setupBlock) {
				setupBlock.moveBy(x, y);
				setupBlockHeight = setupBlock.height + y;
			}
			if (loopBlock) {
				loopBlock.moveBy(0, setupBlockHeight + 10);
			}

			if (functionBlocks.length > 0) {
				functionBlocks.forEach((block) => {
					this.fillProcedureArgs(block);
					block.moveBy(functionX, functionY);
					functionY += block.height + 10;
				});
			}
		} catch (error) {
			console.error('Error organizing blocks:', error);
		}
	}

	/**
	 * @description Fill procedure arguments in procedure blocks - it is the only way to add arguments with their types in the block.
	 * @param {object} block - The xml block to fill
	 * @returns {void}
	 * */
	fillProcedureArgs(block) {
		const name = block.getFieldValue('NAME');
		const args = this._functions[name].args;
		// reset blocks arguments, otherwise it will duplicate the arguments infinitely
		block.arguments_ = [];
		block.paramIds_ = [];
		block.argumentVarModels_ = [];
		for (const arg of args) {
			block.addParam_(arg.name, false, cppTypes[arg.type]);
		}
	}


	/**
	 * Store disabled blocks in an array
	 * @returns {void}
	 * */
	setBlockStore(){
		try {
			const ALL_DISABLED_BLOCKS = this.workspace.getAllBlocks().filter(block => block.disabled === true);
			this.storedDisabledBlocks = ALL_DISABLED_BLOCKS
				.filter(block => !block.getParent())
				.map(block => Blockly.Xml.blockToDomWithXY(block));

		} catch (error) {
			console.error('Error storing blocks:', error);
		}
	}

	/**
	 * Retreive stored disabled blocks
	 * @returns {void}
	 * */
	retrieveBlocksStored(){
		try {
			if (this.storedDisabledBlocks.length > 0) {
				this.storedDisabledBlocks.forEach(blockXml => {
					let block = Blockly.Xml.domToBlock(blockXml, this.workspace);
					let x = parseInt(blockXml.getAttribute('x'), 10);
					let y = parseInt(blockXml.getAttribute('y'), 10);
					if (!isNaN(x) && !isNaN(y)) {
						block.moveBy(x, y);
					}
					
				});
			}
			
		} catch (error) {
			console.error('Error restoring blocks:', error);
		}
	}


	/**
	 * Inject blocks in the workspace
	 * @description The main function of the class. It converts the code to an AST (first pass to retreive function names, reset all other objects) and then convert AST to xml blocks. It then injects the blocks (main XML) in the workspace and organizes them properly
	 * @returns {void}
	 * */
	injectBlocks() {
		this.setBlockStore();
		this.resetBlocks();
		this._functions = {};
		this.vittaFunctions.clear();
		const time = new Date().getTime();

		let xmlCode;
		try {
			// first pass to get all the functions
			xmlCode = this.convertAstToXml();

			//only reset defines and includes stat
			this.resetBlocks();

			xmlCode = this.convertAstToXml();
		} catch (error) {
			this.codeManager.updateTextCode(this.code);
			this.codeManager.setXml();
			console.error(error);
			return;
		}

		Blockly.Events.disable();
		const workspace = Blockly.getMainWorkspace();

		// Convert the string to a DOM object
		const xml = Blockly.Xml.textToDom(xmlCode);
		this.debug && console.log(xml);

		this.indexPreviousXml = null;
		this.storeXml();

		// Clear workspace
		workspace.clear();
		try {
			Blockly.Xml.domToWorkspace(xml, workspace);
		} catch (error) {
			// Blockly error here if the xml is not correct
			console.error('Error injecting blocks:', error);
		}
		this.codeManager.setGeneratedCode(this.code);
		
		this.organizePrototypeBlocks();

		this.codeManager.setXml();

		// Retreive stored disabled blocks
		this.retrieveBlocksStored();
		this.storedDisabledBlocks = [];

		Blockly.Events.enable();

		this.debug && console.log(`Injection time: ${new Date().getTime() - time}ms`);
	}
}

window.Cpp2Blocks = new Cpp2Blocks();
