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
	'#64c3dd',
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
		this.lastBlockId = null;
		this.cpp2Blocks = null;
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
			if (this.cpp2Blocks.requireLastBlockId) {
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

	storeVariable(left, right, type) {
		const variables = this.cpp2Blocks._variables;
		if (left.type === 'identifier' && this.RESERVED_WORD.includes(left.text)){
			if (this.prototypeBlocks[left.text]) {
				variables[left.text] = { variable: right, rowStart: left.start.row, colStart: left.start.column, type: type };
				return this.prototypeBlocks[left.text](right);
			}
		}
		if (left.type === 'identifier' && !variables[left.text]) {
			variables[left.text] = { variable: right, rowStart: left.start.row, colStart: left.start.column, type: type };
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
		for (const paramChild of node.children) {
			if (paramChild.type === 'identifier') {
				name = paramChild.text;
			} else if (paramChild.type === 'primitive_type' || paramChild.type === 'sized_type_specifier' || paramChild.type === 'type_identifier') {
				type = paramChild.text;
			}
		}
		return { type, name, id: Blockly.utils.genUid() };
	}

	/**
	 * @description retrieves the argument of a function call or method call
	 * @param {Array} nodes
	 * @returns {Array} list of arguments
	 * */
	getArgumentList(nodes) {
		const argumentTypes = ['pointer_expression', 'number_literal', 'string_literal', 'binary_expression', 'identifier', 'subscript_expression', 'call_expression', 'field_expression'];
		for (const node of nodes) {
			if (node.type === 'parenthesized_expression') {
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
		let onlyString = true;
		let stringsNodes = [];
		for (const nodeChild of node.children) {
			if (nodeChild.type === 'binary_expression') {
				const stringsNodesChild = this.checkForStringLiteralOnly(nodeChild);
				if (stringsNodesChild.length === 0) {
					return [];
				} else {
					stringsNodes = stringsNodesChild.concat(stringsNodes);
				}
			} else if (nodeChild.type !== 'string_literal' && nodeChild.type !== '+' && nodeChild.type !== 'call_expression') {
				return [];
			} else if (nodeChild.type === 'call_expression') {
				if (!nodeChild.text.match(/String/g)) {
					return [];
				} else {
					stringsNodes.push(nodeChild);
				}
			} else if (nodeChild.type === 'string_literal') {
				stringsNodes.push(nodeChild);
			}
		}
		return stringsNodes;
	}

    extractStringLiterals(nodes) {
        for (const node of nodes) {
            if (node.type === 'string_content') {
                return node.text;
            }
        }
    }

	/**
	 * @description Simple function to remove spaces from a string
	 * @param {string} str
	 * @returns {string} string without spaces
	 * */
	rmSpaces(str) {
		return str.replace(/\s+/g, '');
	}

	convertRBGtoHex(rbg) {
		const rbgValues = [];
		for (let i = 0; i < 3; i++) {
			console.log('rbg[i]', rbg[i]);
			if (typeof rbg[i] === 'undefined' && rbg[i].type !== 'number_literal') {
				return null;
			}
			rbgValues.push(Number(rbg[i].text));
		}

		const hex = rbgValues.map((color) => {
			const hexColor = color.toString(16);
			return hexColor.length === 1 ? `0${hexColor}` : hexColor;
		});
		if (blocklyColors.includes(`#${hex.join('')}`)) {
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
		for (const child of nodes) {
			if (child.type === type) {
				return child;
			} else if (child.children.length > 0) {
				const result = this.returnFirstExpression(child.children, type);
				if (result) {
					return result;
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
		this.RESERVED_WORD = imports.default.RESERVED_WORD || [];
		// this.CLASS_METHODS = imports.default.CLASS_METHODS;
		this.EXCLUDED_COMMENTS = imports.default.EXCLUDED_COMMENTS || [];
	}
}

const utils = new Utils();
export default utils;
