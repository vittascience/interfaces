Blockly.defineBlocksWithJsonArray([
	{
		type: 'call_expression',

		message0: '%1 %2',
		args0: [
			{
				type: 'field_input',
				name: 'NAME',
				text: 'field1',
			},
			{
				type: 'input_value',
				name: 'chain',
				// "check": null
			},
		],
		previousStatement: null,
		nextStatement: null,
		style: 'procedure_blocks',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'call_expression_return',
		message0: '%1 %2',
		args0: [
			{
				type: 'field_input',
				name: 'NAME',
				text: 'field1',
			},
			{
				type: 'input_value',
				name: 'chain',
			},
		],
		output: null,
		style: 'procedure_blocks',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'call_expression_editable',
		message0: '%1 ',
		args0: [
			{
				type: 'field_input',
				name: 'NAME',
				text: 'fcall1',
			},
		],
		previousStatement: null,
		nextStatement: null,
		style: 'procedure_blocks',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
		extensions: ['block_buttons_plus_minus', 'call_editable_return_extension'],
		mutator: 'call_editable_return_mutator',
	},
	{
		type: 'call_expression_editable_return',
		message0: '%1',
		args0: [
			{
				type: 'field_input',
				name: 'NAME',
			},
		],
		output: null,
		style: 'procedure_blocks',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
		extensions: ['block_buttons_plus_minus', 'call_editable_return_extension'],
		mutator: 'call_editable_return_mutator',
	},
	{
		type: 'keyword_argument',
		message0: '%1= %2',
		args0: [
			{
				type: 'field_input',
				name: 'NAME',
				text: 'name',
			},
			{
				type: 'input_value',
				name: 'VALUE',
			},
		],
		output: 'null',
		style: 'keyword_blocks',
		tooltip: 'Keyword argument',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'comment_docstrings',
		message0: 'docstrings %1',
		args0: [
			{
				type: 'field_input',
				name: 'COMMENT',
				text: 'comment',
			},
		],
		previousStatement: null,
		nextStatement: null,
		style: 'comment_block',
		tooltip: "Permet d'ajouter des commentaires dans le code",
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'untranslatable_block',
		message0: 'Code non traduit \n %1',
		args0: [
			{
				type: 'field_input',
				name: 'CODE',
				text: 'code',
			},
		],
		previousStatement: null,
		nextStatement: null,
		style: 'comment_block',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'define_class_declaration',
		message0: '%1 = classe %2',
		args0: [
			{
				type: 'field_variable',
				name: 'VAR',
				variable: 'class_var',
			},
			{
				type: 'field_input',
				name: 'NAME',
			},
			// {
			// 	type: 'input_value',
			// 	name: 'items0',
			// },
		],
		previousStatement: null,
		nextStatement: null,
		style: 'procedure_blocks',
		extensions: ['block_buttons_plus_minus', 'class_declaration_extension'],
		mutator: 'class_declaration_mutator',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'define_i2c_declaration',
		message0: 'i2c: SCL %1 SDA %2',
		args0: [
			{
				type: 'input_value',
				name: 'SCL',
			},
			{
				type: 'input_value',
				name: 'SDA',
			},
		],
		output: null,
		inputsInline: true,
		style: 'procedure_blocks',
		tooltip: '',
		helpUrl: 'http://www.example.com/',
	},
	{
		type: 'print_with_separator',
		message0: '%{BKY_COMMUNICATION_SERIAL_WRITE_SEPARATOR_TITLE}',
		previousStatement: null,
		nextStatement: null,
		style: 'communication_blocks',
		extensions: ['block_buttons_plus_minus', 'communication_serialWrite_separator_init_extension'],
		mutator: 'communication_serialWrite_separator_mutator',
		"tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_SEPARATOR_TOOLTIP}",
		helpUrl: 'http://www.example.com/',
	},
]); // BEGIN JSON EXTRACT

// generator
Blockly.Python['define_class_declaration'] = function (block) {
	const name = block.getFieldValue('NAME');
	var codeArr = new Array(block.itemCount_);
	for (var n = 0; n < block.itemCount_; n++) {
		codeArr[n] = Blockly.Python.valueToCode(block, 'items' + n, Blockly.Python.ORDER_NONE) || 'None';
	}
	const varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	const trimmedName = name.replaceAll('"', '').replaceAll("'", '');
	Blockly.Python.addInit(trimmedName.toLowerCase(), `${varName} = ${trimmedName}(${codeArr.join(', ')})`);

	return '';
};

Blockly.Python['define_i2c_declaration'] = function (block) {
	const scl = Blockly.Python.valueToCode(block, 'SCL', Blockly.Python.ORDER_NONE);
	const sda = Blockly.Python.valueToCode(block, 'SDA', Blockly.Python.ORDER_NONE);
	return [`i2c = I2C(scl=Pin(${scl}), sda=Pin(${sda}))`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['call_expression'] = function (block) {
	const name = block.getFieldValue('NAME');
	const chain = Blockly.Python.valueToCode(block, 'chain', Blockly.Python.ORDER_NONE);
	return `${name}.${chain}\n`;
};

Blockly.Python['call_expression_editable'] = function (block) {
	var text_name = block.getFieldValue('NAME');
	var value_chain = Blockly.Python.valueToCode(block, 'chain', Blockly.Python.ORDER_NONE);
	var codeArr = new Array(block.itemCount_);
	for (var n = 0; n < block.itemCount_; n++) {
		codeArr[n] = Blockly.Python.valueToCode(block, 'items' + n, Blockly.Python.ORDER_NONE) || 'None';
	}
	var chain = '';
	if (value_chain !== '') {
		chain = '\n  .' + value_chain.trim();
	}
	var code = text_name + '(' + codeArr.join(', ') + ')' + chain + '\n';
	return code;
};

Blockly.Python['call_expression_editable_return'] = function (block) {
	var text_name = block.getFieldValue('NAME');
	var value_chain = Blockly.Python.valueToCode(block, 'chain', Blockly.Python.ORDER_NONE);
	var codeArr = new Array(block.itemCount_); // block.itemCount_);
	for (var n = 0; n < block.itemCount_; n++) {
		codeArr[n] = Blockly.Python.valueToCode(block, 'items' + n, Blockly.Python.ORDER_NONE) || 'None';
	}
	var chain = '';
	if (value_chain !== '') {
		chain = '\n  .' + value_chain.trim();
	}
	var code = text_name + '(' + codeArr.join(', ') + ')' + chain;
	return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['comment_docstrings'] = function (block) {
	const comment = block.getFieldValue('COMMENT');
	return `"""${comment}"""\n`;
};

Blockly.Python['untranslatable_block'] = function (block) {
	const code = block.getFieldValue('CODE');
	return `${code}\n`;
};

Blockly.Python['call_expression_return'] = function (block) {
	const name = block.getFieldValue('NAME');
	const chain = Blockly.Python.valueToCode(block, 'chain', Blockly.Python.ORDER_NONE);
	return [`${name}.${chain}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['keyword_argument'] = function (block) {
	const name = block.getFieldValue('NAME');
	const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
	return [`${name}=${value}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Constants.add_items = Object.create(null);

Blockly.Constants.add_items.CALL_RETURN_EXTENSION = function () {
	this.itemCount_ = 0;
	this.updateShape_();
};

Blockly.Python['print_with_separator'] = function (block) {
	var codeArr = new Array(block.itemCount_); // block.itemCount_);
	for (var n = 0; n < block.itemCount_; n++) {
		codeArr[n] = Blockly.Python.valueToCode(block, 'items' + n, Blockly.Python.ORDER_NONE) || 'None';
	}
	return `print(${codeArr.join(', ')})\n`;
};


Blockly.Extensions.register('call_editable_return_extension', Blockly.Constants.add_items.CALL_RETURN_EXTENSION);

/**
 * Mixin for mutator functions in the 'bi_call' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */

Blockly.Constants.add_items.CALL_MUTATOR_MIXIN = {
	/**
	 * Create XML to represent number of text inputs.
	 * @return {!Element} XML storage element.
	 * @this Blockly.Block
	 */
	mutationToDom: function () {
		if (!this.itemCount_) {
			return null;
		}
		var container = Blockly.utils.xml.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	},
	/**
	 * Parse XML to restore the text inputs.
	 * @param {!Element} xmlElement XML storage element.
	 * @this {Blockly.Block}
	 */
	domToMutation: function (xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
		this.updateShape_();
	},
	/**
	 * Store pointers to any connected child blocks.
	 * @param {!Blockly.Block} containerBlock Root block in mutator.
	 * @this {Blockly.Block}
	 */
	saveConnections: function (containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (itemBlock) {
			var input = this.getInput('items' + i);
			itemBlock.valueConnection_ = input && input.connection.targetConnection;
			i++;
			itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
		}
	},
	storeValueConnections_: function () {
		this.valueConnections_ = [];
		for (var i = 0; i < this.itemCount_; i++) {
			this.valueConnections_.push(this.getInput('items' + i).connection.targetConnection);
		}
	},
	restoreValueConnections_: function () {
		for (var i = 0; i < this.itemCount_; i++) {
			Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'items' + i);
		}
	},
	addItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_++;
		};
		this.update_(update);
		// Add text block
		if (this.itemCount_ > 1) {
			const dataBlockName = 'text';
			if (Blockly.Blocks[dataBlockName]) {
				const newBlock = Blockly.utils.xml.createElement('block');
				newBlock.setAttribute('type', dataBlockName);
				if (newBlock) {
					const id = Blockly.utils.genUid();
					newBlock.setAttribute('id', id);
					Blockly.Xml.domToBlock(newBlock, this.workspace);
					const block = this.workspace.getBlockById(id);
					// block.setFieldValue("Label" + this.itemCount_, "TEXT");
					this.valueConnections_.push(block.outputConnection);
				}
			}
		}
		this.restoreValueConnections_();
	},
	removeItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_--;
		};
		this.update_(update);
		this.restoreValueConnections_();
	},
	update_: function (update) {
		return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
	},
	/**
	 * Modify this block to have the correct number of inputs.
	 * @private
	 * @this {Blockly.Block}
	 */

	updateShape_: function () {
		var that = this;
		var remove = function () {
			that.removeItem_();
		};
		var add = function () {
			that.addItem_();
		};
		// Remove all inputs
		var inputNames = ['LEFT_PAREN', 'TOP', 'RIGHT_PAREN', 'CHAIN'];
		for (var i = 0; i < this.itemCount_; i++) {
			inputNames.push('items' + i);
		}

		for (var i = 0; i < inputNames.length; i++) {
			if (this.getInput(inputNames[i])) {
				this.removeInput(inputNames[i]);
			}
		}
		// Update inputs
		this.appendDummyInput('LEFT_PAREN').appendField('(');

		if (this.itemCount_ > 0) {
			for (var i = 0; i < this.itemCount_; i++) {
				this.appendValueInput('items' + i);
			}
		}
		let right = this.appendDummyInput('RIGHT_PAREN');
		right.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', add, false));
		if (this.itemCount_ > 1) {
			right.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', remove, false));
		}
		right.appendField(')');

		/* Switch to vertical list when the list is too long */
		var showHorizontalList = this.itemCount_ <= 4;
		this.setInputsInline(showHorizontalList);
		this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
	},
};

Blockly.Extensions.registerMutator('call_editable_return_mutator', Blockly.Constants.add_items.CALL_MUTATOR_MIXIN);

Blockly.Constants.add_items.CLASS_DECLARATION_EXTENSION = function () {
	this.itemCount_ = 0;
	this.updateShape_();
};

Blockly.Extensions.register('class_declaration_extension', Blockly.Constants.add_items.CLASS_DECLARATION_EXTENSION);

Blockly.Constants.add_items.CLASS_MUTATOR_MIXIN = {
	/**
	 * Create XML to represent number of text inputs.
	 * @return {!Element} XML storage element.
	 * @this Blockly.Block
	 */
	mutationToDom: function () {
		if (!this.itemCount_) {
			return null;
		}
		var container = Blockly.utils.xml.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	},
	/**
	 * Parse XML to restore the text inputs.
	 * @param {!Element} xmlElement XML storage element.
	 * @this {Blockly.Block}
	 */
	domToMutation: function (xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
		this.updateShape_();
	},
	/**
	 * Store pointers to any connected child blocks.
	 * @param {!Blockly.Block} containerBlock Root block in mutator.
	 * @this {Blockly.Block}
	 */
	saveConnections: function (containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (itemBlock) {
			var input = this.getInput('items' + i);
			itemBlock.valueConnection_ = input && input.connection.targetConnection;
			i++;
			itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
		}
	},
	storeValueConnections_: function () {
		this.valueConnections_ = [];
		for (var i = 0; i < this.itemCount_; i++) {
			this.valueConnections_.push(this.getInput('items' + i).connection.targetConnection);
		}
	},
	restoreValueConnections_: function () {
		for (var i = 0; i < this.itemCount_; i++) {
			Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'items' + i);
		}
	},
	addItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_++;
		};
		this.update_(update);
		// Add text block
		if (this.itemCount_ > 1) {
			const dataBlockName = 'text';
			if (Blockly.Blocks[dataBlockName]) {
				const newBlock = Blockly.utils.xml.createElement('block');
				newBlock.setAttribute('type', dataBlockName);
				if (newBlock) {
					const id = Blockly.utils.genUid();
					newBlock.setAttribute('id', id);
					Blockly.Xml.domToBlock(newBlock, this.workspace);
					const block = this.workspace.getBlockById(id);
					this.valueConnections_.push(block.outputConnection);
				}
			}
		}
		this.restoreValueConnections_();
	},
	removeItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_--;
		};
		this.update_(update);
		this.restoreValueConnections_();
	},
	update_: function (update) {
		return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
	},
	/**
	 * Modify this block to have the correct number of inputs.
	 * @private
	 * @this {Blockly.Block}
	 */

	updateShape_: function () {
		var that = this;
		var remove = function () {
			that.removeItem_();
		};
		var add = function () {
			that.addItem_();
		};
		// Remove all inputs
		var inputNames = ['LEFT_PAREN', 'TOP', 'RIGHT_PAREN', 'CHAIN'];
		for (var i = 0; i < this.itemCount_; i++) {
			inputNames.push('items' + i);
		}

		for (var i = 0; i < inputNames.length; i++) {
			if (this.getInput(inputNames[i])) {
				this.removeInput(inputNames[i]);
			}
		}
		// Update inputs
		this.appendDummyInput('LEFT_PAREN').appendField('(');

		if (this.itemCount_ > 0) {
			for (var i = 0; i < this.itemCount_; i++) {
				this.appendValueInput('items' + i);
			}
		}
		let right = this.appendDummyInput('RIGHT_PAREN');
		right.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', add, false));
		if (this.itemCount_ > 1) {
			right.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', remove, false));
		}
		right.appendField(')');

		/* Switch to vertical list when the list is too long */
		var showHorizontalList = this.itemCount_ <= 4;
		this.setInputsInline(showHorizontalList);
		this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
	},
};

Blockly.Extensions.registerMutator('class_declaration_mutator', Blockly.Constants.add_items.CLASS_MUTATOR_MIXIN);


Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_SEPARATOR_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
	this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'communication_serialWrite' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_SEPARATOR_MUTATOR_MIXIN = {
    /**
	 * Create XML to represent number of text inputs.
	 * @return {!Element} XML storage element.
	 * @this Blockly.Block
	 */
	mutationToDom: function () {
		if (!this.itemCount_) {
			return null;
		}
		var container = Blockly.utils.xml.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	},
	/**
	 * Parse XML to restore the text inputs.
	 * @param {!Element} xmlElement XML storage element.
	 * @this {Blockly.Block}
	 */
	domToMutation: function (xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
		this.updateShape_();
	},
	/**
	 * Store pointers to any connected child blocks.
	 * @param {!Blockly.Block} containerBlock Root block in mutator.
	 * @this {Blockly.Block}
	 */
	saveConnections: function (containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (itemBlock) {
			var input = this.getInput('items' + i);
			itemBlock.valueConnection_ = input && input.connection.targetConnection;
			i++;
			itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
		}
	},
	storeValueConnections_: function () {
		this.valueConnections_ = [];
		for (var i = 0; i < this.itemCount_; i++) {
			this.valueConnections_.push(this.getInput('items' + i).connection.targetConnection);
		}
	},
	restoreValueConnections_: function () {
		for (var i = 0; i < this.itemCount_; i++) {
			Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'items' + i);
		}
	},
	addItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_++;
		};
		this.update_(update);
		// Add text block
		if (this.itemCount_ > 1) {
			const dataBlockName = 'text';
			if (Blockly.Blocks[dataBlockName]) {
				const newBlock = Blockly.utils.xml.createElement('block');
				newBlock.setAttribute('type', dataBlockName);
				if (newBlock) {
					const id = Blockly.utils.genUid();
					newBlock.setAttribute('id', id);
					Blockly.Xml.domToBlock(newBlock, this.workspace);
					const block = this.workspace.getBlockById(id);
					// block.setFieldValue("Label" + this.itemCount_, "TEXT");
					this.valueConnections_.push(block.outputConnection);
				}
			}
		}
		this.restoreValueConnections_();
	},
	removeItem_: function () {
		this.storeValueConnections_();
		var update = function () {
			this.itemCount_--;
		};
		this.update_(update);
		this.restoreValueConnections_();
	},
	update_: function (update) {
		return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
	},
	/**
	 * Modify this block to have the correct number of inputs.
	 * @private
	 * @this {Blockly.Block}
	 */

	updateShape_: function () {
		var that = this;
		var remove = function () {
			that.removeItem_();
		};
		var add = function () {
			that.addItem_();
		};
		// Remove all inputs
		var inputNames = ['LEFT_PAREN', 'TOP', 'RIGHT_PAREN', 'CHAIN'];
		for (var i = 0; i < this.itemCount_; i++) {
			inputNames.push('items' + i);
		}

		for (var i = 0; i < inputNames.length; i++) {
			if (this.getInput(inputNames[i])) {
				this.removeInput(inputNames[i]);
			}
		}
		// Update inputs
		// this.appendDummyInput('LEFT_PAREN').appendField('(');

		if (this.itemCount_ > 0) {
			for (var i = 0; i < this.itemCount_; i++) {
				this.appendValueInput('items' + i);
			}
		}
		let right = this.appendDummyInput('RIGHT_PAREN');
		right.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', add, false));
		if (this.itemCount_ > 1) {
			right.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, '*', remove, false));
		}
		// right.appendField(')');

		/* Switch to vertical list when the list is too long */
		var showHorizontalList = this.itemCount_ <= 4;
		this.setInputsInline(showHorizontalList);
		this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
	},
};

Blockly.Extensions.register("communication_serialWrite_separator_init_extension",
    Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_SEPARATOR_INIT_EXTENSION);

Blockly.Extensions.registerMutator('communication_serialWrite_separator_mutator',
    Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_SEPARATOR_MUTATOR_MIXIN);