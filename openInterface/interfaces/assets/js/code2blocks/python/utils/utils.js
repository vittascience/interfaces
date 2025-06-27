const blocklyColors = [
	'#ffffff',
	'#cccccc',
	'#c0c0c0',
	'#999999',
	'#666666',
	'#333333',
	'#000000',
	'#ffcccc',
	'#ff6666',
	'#ff0000',
	'#cc0000',
	'#990000',
	'#660000',
	'#330000',
	'#ffcc99',
	'#ff9966',
	'#ff9900',
	'#ff6600',
	'#cc6600',
	'#993300',
	'#663300',
	'#ffff99',
	'#ffff66',
	'#ffcc66',
	'#ffcc33',
	'#cc9933',
	'#996633',
	'#663333',
	'#ffffcc',
	'#ffff33',
	'#ffff00',
	'#ffcc00',
	'#999900',
	'#666600',
	'#333300',
	'#99ff99',
	'#66ff99',
	'#33ff33',
	'#33cc00',
	'#009900',
	'#006600',
	'#003300',
	'#99ffff',
	'#33ffff',
	'#66cccc',
	'#00cccc',
	'#339999',
	'#336666',
	'#003333',
	'#ccffff',
	'#66ffff',
	'#33ccff',
	'#3366ff',
	'#3333ff',
	'#000099',
	'#000066',
	'#ccccff',
	'#9999ff',
	'#6666cc',
	'#6633ff',
	'#6600cc',
	'#333399',
	'#330099',
	'#ffccff',
	'#ff99ff',
	'#cc66cc',
	'#cc33cc',
	'#993399',
	'#663366',
	'#330033',
	'#22b573',
];

class Utils {
	constructor() {
		if (Utils.instance) {
			return Utils.instance;
		}

		this.blockLoc = {};
		this.comments = [];
		this.lastComment = 0;
		this.authorizedConnectors = ['procedures_defnoreturn', 'procedures_defreturn', 'forever', 'on_start'];
		this.prototypeBlocks = {};
		this.interceptors = {};
		this._variables = {};
		this.lastBlockId = null;
		this.binaryInterceptors = {};
		// worst practice ever => need to find a better way to access the python2Blocks object
		this.python2Blocks = null;

		this.interfaceImports();

		Utils.instance = this;
	}

	/**
	 * @param {string} name
	 * @param {Object} attrs
	 * @param {string} text
	 * @param {Object} astNode
	 * @returns {Element} xml block
	 * */
	newNode(name, attrs, text, astNode) {
		let block1;
		if (name === 'block') {
			const id = Blockly.utils.genUid();
			// usefull to suppress the last block if necessary (exemple for the thymio interface single motor speed or both motors speed)
			if (this.python2Blocks.requireLastBlockId) {
				this.lastBlockId = id;
			}
			if (astNode) {
				this.blockLoc[id] = astNode.loc;
			}
			attrs.id = id;
			block1 = document.createElement('block');
		} else if (name === 'xml') {
			block1 = document.createElement(name);
			block1.setAttribute('xmlns', 'https://developers.google.com/blockly/xml');
		} else {
			block1 = document.createElement(name);
		}
		for (let key in attrs) {
			block1.setAttribute(key, attrs[key]);
		}
		if (text) block1.textContent = text;
		return block1;
	}

	/**
	 * Check if there's a binary expression interceptor for the given pattern
	 * @param {object} left - Left operand
	 * @param {string} operator - Operator ('EQ', 'NEQ', etc.)
	 * @param {object} right - Right operand
	 * @returns {object|null} - Block definition or null
	 */
	checkBinaryInterceptor(left, operator, right) {
		// Try to find an interceptor key based on the left operand
		let interceptorKey = null;

		if (left.type === 'call') {
			// Extract function name from call expression
			for (const child of left.children) {
				if (child.type === 'attribute') {
					// For patterns like mbuild.quad_rgb_sensor.get_line_sta
					interceptorKey = `${child.text}_${operator}`;
					break;
				} else if (child.type === 'identifier') {
					// For simple function calls
					interceptorKey = `${child.text}_${operator}`;
					break;
				}
			}
		}

		// Check if we have an interceptor for this pattern
		if (interceptorKey && this.binaryInterceptors[interceptorKey]) {
			return this.binaryInterceptors[interceptorKey](left, operator, right);
		}

		// Check for generic pattern interceptors
		if (this.binaryInterceptors[`_${operator}`]) {
			return this.binaryInterceptors[`_${operator}`](left, operator, right);
		}

		return null;
	}

	/**
	 * @description retrieves the parameters of a function (list of parameters)
	 * @param {Object} node
	 * @returns {Array} list of parameters
	 * */
	getParameterList(node) {
		let args = [];
		let type, name;
		if (node.type === 'identifier') {
			name = node.text;
		}
		return { type, name, id: Blockly.utils.genUid() };
	}

	/**
	 * @description retrieves the argument of a function call or method call
	 * @param {Array} nodes
	 * @returns {Array} list of arguments
	 * */
	getArgumentList(nodes, allNode = false) {
		const argumentTypes = ["comparison_operator", 'subscript', 'conditional_expression', 'not_operator', 'none', 'integer', 'float', 'string', 'identifier', 'binary_operator', 'unary_operator', 'call', 'parenthesized_expression', 'attribute', 'list', 'keyword_argument', 'false', 'true', 'keyword_argument', 'tuple', 'block'];
		for (const node of nodes) {
			if (node.type === 'parenthesized_expression' && !allNode) {
				return this.getArgumentList(node.children);
			}
		}
		return nodes.filter((node) => argumentTypes.includes(node.type));
	}

	/**
	 * @description Check if the node is nested in another node
	 * @param {string} type
	 * @param {String[]} checkedType
	 * @param {Object} node
	 * @returns {Object} node
	 * */
	checkForNested(type, checkedType, node) {
		for (const nodeChild of node.children) {
			if (nodeChild.type === type) {
				return this.checkForNested(type, checkedType, nodeChild);
			} else if (checkedType.includes(nodeChild.type)) {
				return nodeChild;
			}
		}
	}

	/**
	 * @description Check if the node contains only string literals and nested calls to the String function
	 * @param {Object} node
	 * @returns {Array} list of nodes
	 * */
	checkForStringLiteralOnly(node) {
		let stringsNodes = [];

		for (const nodeChild of node.children) {
			if (nodeChild.type === 'binary_operator') {
				const stringsNodesChild = this.checkForStringLiteralOnly(nodeChild);

				if (stringsNodesChild.length === 0) {
					return [];
				} else {
					stringsNodes = stringsNodes.concat(stringsNodesChild);
				}
			} else if (nodeChild.type === 'call') {
				if (!nodeChild.text.match(/(str|format)\(/g)) {
					return [];
				} else {
					stringsNodes.push(nodeChild);
				}
			} else if (nodeChild.type === 'string') {
				stringsNodes.push(nodeChild);
			} else if (nodeChild.type !== '+') {
				return [];
			}
		}
		return stringsNodes;
	}

	extractString(node) {
		let stringNode = null;
		for (const nodeChild of node.children) {
			if (nodeChild.type === 'string_content' || nodeChild.type === 'string') {
				stringNode = nodeChild;
				stringNode.type = 'string';
				return stringNode;
			}
		}
		if (stringNode === null) {
			return { type: 'string', text: '' };
		}
	}

	extractKeyWordArgument(node) {
		let key, value;
		if (node.type !== 'keyword_argument' || node.children.length !== 3) return { key: null, value: null };
		key = node.children[0];
		value = node.children[2];
		return { key, value };
	}

	/**
	 * @description Simple function to remove spaces from a string
	 * @param {string} str
	 * @returns {string} string without spaces
	 * */
	rmSpaces(str) {
		return str.replace(/\s+/g, '');
	}

	checkImportStatement(importStatement) {
		const declaredLIBS = Object.keys(this.LIBS);
		for (let i = 0; i < declaredLIBS.length; i++) {
			if (importStatement === this.LIBS[declaredLIBS[i]]) {
				return declaredLIBS[i];
			}
		}
		return false;
	}

	storeVariable(left, right) {
		for (let excluded_var of this.PYTHON_EXCLUDED_VARIABLES) {
			const regex = new RegExp(excluded_var);
			if (regex.test(left.text)) {
				this._variables[left.text] = { variable: right, rowStart: left.start.row, colStart: left.start.column };
				return '';
			}
		}
		if (left.type === 'identifier' && this.RESERVED_WORDS.includes(left.text)) {
			if (this.prototypeBlocks[left.text]) {
				this._variables[left.text] = { variable: right, rowStart: left.start.row, colStart: left.start.column };
				return this.prototypeBlocks[left.text](right);
			}
		} else if (left.type === 'identifier') {
			this._variables[left.text] = { variable: right };
		} else if (left.type === 'subscript') {
			// for neopixel library => need to find a better way to handle this and hardcoded values
			if (left.children[0].type === 'identifier' && this.python2Blocks._classes[left.children[0].text] && this.python2Blocks._classes[left.children[0].text]?.className !== 'undefined') {
				const methode = this.CLASS_METHODS[this.python2Blocks._classes[left.children[0].text]?.className] || null;
				if (methode !== null) {
					const index = left.children[2];

					try {
						return this.prototypeBlocks[methode[left.type].astCallBack](index, right, left.children[0].text);
					} catch (error) {
						console.log('error', error);
						return null;
					}
				}
			} else if (left.children[0].type === 'identifier' && this.prototypeBlocks[left.children[0].text]) {
				return this.prototypeBlocks[left.children[0].text](left, right);
			} else {
				const checkDict = this.checkDictionarySubscription(left, right);
				if (checkDict !== null) {
					return checkDict;
				}
			}
		} else if (left.type === 'pattern_list') {
			for (const child of left.children) {
				if (child.type === 'identifier') {
					console.log('child', child);
					this._variables[child.text] = { variable: right, rowStart: left.start.row, colStart: left.start.column };
				}
			}
			if (right.type === 'call' && this.RESERVED_WORDS.includes(right.text)) {
				return '';
			}
		}
		if (right.type === 'call') {
			for (const node of right.children) {
				// goes here if we can not call Pin alone for example (ex: machine.Pin && pyb.Pin on the same board). In the imports.js file, we have to declare the class with the method we want to call if necessary
				if (node.type === 'attribute' && node.children[0].type === 'identifier' && this.python2Blocks._imports.has(node.children[0].text) && this.CLASS_METHODS[`${node.children[0].text}.${node.children[2].text}`]) {
					this.declareClasses(`${node.children[0].text}.${node.children[2].text}`, left.text);
					return right;
					// goes here if we can call class and don't require to pay attention of the method (ex: neopixel.NeoPixel)
				} else if (node.type === 'attribute' && node.children[0].type === 'identifier' && this.python2Blocks._imports.has(node.children[0].text) && this.CLASS_METHODS[node.children[0].text]) {
					this.declareClasses(node.children[0].text, left.text);
					return right;
					// random class that we can call directly (ex: LCD1602 => lcd1602 = LCD1602(argz))
				} else if (node.type === 'identifier' && this.CLASS_METHODS[node.text]) {
					this.declareClasses(node.text, left.text);
					const methode = this.CLASS_METHODS[node.text];
					try {
						if (typeof this.prototypeBlocks[methode[right.type].astCallBack] !== 'undefined') {
							return this.prototypeBlocks[methode[right.type].astCallBack](right, left.text);
						}
					} catch (error) {
						console.error('error', error);
					}
					// goes here if we can call class directly (ex: Pin => from machine import *)
				} else if (node.type === 'identifier' && this.MICROPYTHON_CLASSES[node.text]) {
					this.declareClasses(node.text, left.text);
					const methode = this.MICROPYTHON_CLASSES[node.text];
					try {
						if (typeof this.prototypeBlocks[methode[right.type].astCallBack] !== 'undefined') {
							return this.prototypeBlocks[methode[right.type].astCallBack](right, left.text);
						}
					} catch (error) {
						console.error('error', error);
					}
				}
			}
		} else if (right.type === 'dictionary') {
			this.declareDictionary(left.text, right.text.replace(/'/g, '"'));
			return 'dictionary';
		}
		return null;
	}

	// Only for m5stack => M5Objects["Title"]['0'] => subscript and assign a call expression to the dictionary
	checkDictionarySubscription(left, right) {
		let chainedKeys = [];
		let foundDictionary = false;
		let dict = null;
		let dictName = null;
		const getChainedKeys = (node) => {
			for (const child of node.children) {
				if (child.type === 'subscript') {
					getChainedKeys(child);
				} else if (child.type === 'identifier') {
					if (this.python2Blocks._dictionary[child.text]) {
						dict = this.python2Blocks._dictionary[child.text];
						dictName = child.text;
						foundDictionary = true;
					}
				} else if (child.type === 'string' && foundDictionary) {
					chainedKeys.push(child.text.replace(/['"]/g, '')); // Enlève les guillemets de la clé
				}
			}
		};

		getChainedKeys(left);
		if (chainedKeys.length === 0) {
			return null;
		}

		// Keep this logic just in case we need to store a real object of the dictionary in _dicctionary
		const createNestedObject = (rootObject, keys, value) => {
			let current = rootObject;
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				if (!current[key]) {
					current[key] = {};
				}
				current = current[key];
			}
			current[keys[keys.length - 1]] = value !== '{}' ? value : {};
		};
		if (right.text !== '{}') {
			// createNestedObject(dict, chainedKeys, right.text);
			dict[chainedKeys.join('_')] = right.text !== '{}' ? right.text : {};
			for (const child of right.children) {
				if (child.type === 'argument_list') {
					// retreive the keys of the dictionary => because the keys will not be accessible during the call of right element in the block
					// So create a new child as a keyword_argument with all the necessary information => need to refine this logic
					child.children.push({ type: 'keyword_argument', text: dictName + '_element_' + chainedKeys.join('_'), children: [] });
				}
			}
			return right;
		} else {
			return 'dictionary';
		}
	}

	resetVariables() {
		this._variables = {};
	}

	declareClasses(className, instanceName) {
		this.python2Blocks._classes[instanceName] = { className: className, pin: null };
	}

	declareDictionary(dictionaryName, dictionary) {
		if (!this.python2Blocks._dictionary[dictionaryName]) {
			this.python2Blocks._dictionary[dictionaryName] = JSON.parse(dictionary);
		} else {
			this.python2Blocks._dictionary[dictionaryName] = JSON.parse(dictionary);
		}
	}

	checkImport(importStatement) {
		if (this.python2Blocks._imports.has(importStatement)) {
			return true;
		} else {
			return false;
		}
	}

	checkCodeFlag(pin) {
		const comments = this.python2Blocks._storedExcludedComments;

		for (const comment of comments) {
			if (comment.includes(pin)) {
				return comment.replace(pin, '').replaceAll(' ', '');
			}
		}
		return null;
	}

	convertRBGtoHex(rbg, needHex = false) {
		const rbgValues = [];
		for (let i = 0; i < 3; i++) {
			if (typeof rbg[i] === 'undefined' && rbg[i].type !== 'integer') {
				return null;
			}
			rbgValues.push(Number(rbg[i].text));
		}

		const hex = rbgValues.map((color) => {
			const hexColor = color.toString(16);
			return hexColor.length === 1 ? `0${hexColor}` : hexColor;
		});

		if (blocklyColors.includes(`#${hex.join('')}`) || needHex) {
			return `#${hex.join('')}`;
		} else {
			return null;
		}
	}

	convertHexToRgb(hex) {
		const hexColor = hex.replace('#', '');
		const r = parseInt(hexColor.substring(0, 2), 16);
		const g = parseInt(hexColor.substring(2, 4), 16);
		const b = parseInt(hexColor.substring(4, 6), 16);
		return [r, g, b];
	}

	checkBlocklyColor(hexColor) {
		return blocklyColors.includes(hexColor);
	}

	returnFirstExpression(nodes, type) {
		console.log('nodes', nodes);
		for (const child of nodes) {
			console.log('child', child.type);
			if (child.type === type) {
				return child;
			} else {
				const result = this.returnFirstExpression(child.children, type);
				if (result) {
					return result;
				} else {
					return this.returnFirstExpression(child.children, type);
				}
			}
		}
		return null;
	}

	/**
	 * @description import all the libraries and modules needed for the interface
	 * @returns {void}
	 * */
	async interfaceImports() {
		const path = `/openInterface/${INTERFACE_NAME}/assets/js/blocks/code2Blocks/imports.js`;
		const imports = await import(path);
		this.LIBS = imports.default.LIB_IMPORT;
		this.CLASS_METHODS = imports.default.CLASS_METHODS;
		this.EXCLUDED_COMMENTS = imports.default.EXCLUDED_COMMENTS;
		this.MICROPYTHON_CLASSES = imports.default.MICROPYTHON_CLASSES ? imports.default.MICROPYTHON_CLASSES : [];
		this.SPECIFIC_INIT = imports.default.SPECIFIC_INIT ? imports.default.SPECIFIC_INIT : {};
		this.RESERVED_WORDS = imports.default.RESERVED_WORDS ? imports.default.RESERVED_WORDS : [];
		this.PYTHON_MICROCONTROLER_BUILTIN = imports.default.PYTHON_MICROCONTROLER_BUILTIN ? imports.default.PYTHON_MICROCONTROLER_BUILTIN : [];
		this.PYTHON_EXCLUDED_VARIABLES = imports.default.PYTHON_EXCLUDED_VARIABLES ? imports.default.PYTHON_EXCLUDED_VARIABLES : [];
		this.EXCLUDED_DOCSTRINGS = imports.default.EXCLUDED_DOCSTRINGS ? imports.default.EXCLUDED_DOCSTRINGS : [];
	}
}

const utils = new Utils();
export default utils;
