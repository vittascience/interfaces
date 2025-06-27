/**
 * @fileoverview Numpy blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Array and matrix creation */

    // Block for creating an array of N values by specified step (np.arange).
    {
        "type": "numpy_arange",
        "message0": "%{BKY_NUMPY_ARANGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STEP",
            "check": "Number"
        }],
        "output": "Array",
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_ARANGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for creating an array of N values between min and max (np.linspace).
    {
        "type": "numpy_linspace",
        "message0": "%{BKY_NUMPY_LINSPACE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }],
        "output": "Array",
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_LINSPACE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for creating a matrix by shape with one value.
    {
        "type": "numpy_table_with_shape",
        "message0": "%{BKY_NUMPY_TABLE_WITH_SHAPE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COL",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "ROW",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "VALUE",
        }],
        "output": "Array",
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_TABLE_WITH_SHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for creating an array of numbers by inputs.
    {
        "type": "numpy_create_table_with",
        "output": "Array",
        "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_CREATE_TABLE_WITH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "numpy_create_table_with_init"
        ],
        "mutator": "numpy_create_table_with_mutator"
    },

    // Block for initializing a square matrix.
    {
        "type": "numpy_square_matrix",
        "output": "Array",
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_SQUARE_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "numpy_square_matrix_init"
        ],
        "mutator": "numpy_square_matrix_mutator"
    },
    /* Operators on numpy array */

    // Block for getting shape of array.
    {
        "type": "numpy_getSizeShape",
        "message0": "%{BKY_NUMPY_SIZESHAPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_NUMPY_SIZE}", "size"],
                ["%{BKY_NUMPY_SHAPE}", "shape"]
            ]
        }, {
            "type": "input_value",
            "name": "LIST",
            "check": "Array"
        }],
        "output": null,
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_SIZESHAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for getting element of matrix with i and j.
    {
        "type": "numpy_getElement_matrix",
        "message0": "%{BKY_NUMPY_GET_ELEMENT_MATRIX_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "I",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "J",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "LIST"
        }],
        "output": null,
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_GET_ELEMENT_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for getting element of array with i.
    {
        "type": "numpy_getElement_list",
        "message0": "%{BKY_NUMPY_GET_ELEMENT_LIST_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "I",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "LIST"
        }],
        "output": null,
        "inputsInline": true,
        "style": "numpy_blocks",
        "tooltip": "%{BKY_NUMPY_GET_ELEMENT_LIST_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for operating on each item of array.
    {
        "type": "numpy_single",
        "message0": "%1 %2",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "OP",
            "options": [
                ["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"],
                ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"],
                ["e^", "EXP"]
            ]
        }, {
            "type": "input_value",
            "name": "NUM",
            "check": "Array"
        }],
        "output": "Array",
        "style": "numpy_blocks",
        "extensions": [
            "block_init_helpurl",
            "math_op_tooltip"
        ]
    },

    // Block for trigonometric operation on each item of array.
    {
        "type": "numpy_trig",
        "message0": "%1 %2",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "OP",
            "options": [
                ["%{BKY_MATH_TRIG_SIN}", "SIN"],
                ["%{BKY_MATH_TRIG_COS}", "COS"],
                ["%{BKY_MATH_TRIG_TAN}", "TAN"],
                ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
                ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
                ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
            ]
        }, {
            "type": "input_value",
            "name": "NUM",
            "check": "Array"
        }],
        "output": "Array",
        "style": "numpy_blocks",
        "extensions": [
            "block_init_helpurl",
            "math_op_tooltip"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Numpy = Object.create(null);

/**
 * Performs final setup of 'numpy_create_table_with' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Numpy.NUMPY_CREATE_TABLE_WITH_INIT_EXTENSION = function () {
    this.itemCount_ = 3;
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'numpy_create_table_with_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Numpy.NUMPY_CREATE_TABLE_WITH_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     */
    storeConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
        // Add shadow block
        if (this.itemCount_ > 1) {
            // Find shadow type
            var firstInput = this.getInput('ADD' + 0);
            if (firstInput && firstInput.connection.targetConnection) {
                // Create a new shadow DOM with the same type as the first input
                // but with an empty default value
                var newInput = this.getInput('ADD' + (this.itemCount_ - 1));
                var shadowInputDom = firstInput.connection.getShadowDom();
                if (shadowInputDom) {
                    var shadowDom = Blockly.utils.xml.createElement('shadow');
                    var shadowInputType = shadowInputDom.getAttribute('type');
                    shadowDom.setAttribute('type', shadowInputType);
                    var shadowDomField = Blockly.utils.xml.createElement('field');
                    shadowDomField.setAttribute('name', 'NUM');
                    shadowDom.appendChild(shadowDomField);
                    if (shadowDom) {
                        shadowDom.setAttribute('id', Blockly.utils.genUid());
                        newInput.connection.setShadowDom(shadowDom);
                        newInput.connection.respawnShadow_();
                    }
                }
            }
        }
    },
    removeItem_: function () {
        this.storeConnections_();
        var update = function () {
            this.itemCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
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
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        var top = this.appendDummyInput('TOP');
        if (this.itemCount_ > 0) {
            // Case list have at least one item
            top.appendField(Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TITLE']);
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }
        } else {
            // Case of empty list
            top.appendField(Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TITLE']);
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        }
        // Switch to vertical list when the list is too long
        var showHorizontalList = this.itemCount_ <= 5;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ?
            Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

/**
 * Performs final setup of 'numpy_square_matrix' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Numpy.NUMPY_SQUARE_MATRIX_INIT_EXTENSION = function () {
    this.dim_ = 3;
    this.line = new Array();
    this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'numpy_square_matrix_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Numpy.NUMPY_SQUARE_MATRIX_MUTATOR_MIXIN = {
    /**
     * Create XML to represent matrix inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('dim', this.dim_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.dim_ = parseInt(xmlElement.getAttribute("dim"));
        this.updateShape_();
    },
    raiseMatrixSize: function () {
        var update = function () {
            this.addColumnFields();
            this.addLineFields();
            this.dim_++;
        };
        this.update_(update);
    },
    reduceMatrixSize: function () {
        var update = function () {
            this.removeColumnFields();
            this.removeInput('line_' + (this.dim_ - 1));
            this.dim_--;
        };
        this.update_(update);
    },
    addLineFields: function () {
        this.line[this.dim_] = this.appendDummyInput('line_' + this.dim_);
        for (var i = 0; i < this.dim_ + 1; i++) {
            this.line[this.dim_].appendField(new Blockly.FieldTextInput("0"), 'element_' + this.dim_ + i);
        }
    },
    removeColumnFields: function () {
        for (var j = this.dim_ - 1; j >= 0; j--) {
            this.line[j].removeField('element_' + j + (this.dim_ - 1));
        }

    },
    addColumnFields: function () {
        for (var j = 0; j < this.dim_; j++) {
            this.line[j].appendField(new Blockly.FieldTextInput("0"), 'element_' + j + this.dim_);
        }
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct matrix dimension.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.reduceMatrixSize();
        };
        var add = function () {
            that.raiseMatrixSize();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('line_' + i)) {
            this.removeInput('line_' + i);
            i++;
        }
        var top = this.appendDummyInput('TOP');
        top.appendField(Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE']);
        if (this.dim_ > 2 && this.dim_ < 10) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        } else if (this.dim_ == 2) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        } else {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var j = 0; j < this.dim_; j++) {
            this.line[j] = this.appendDummyInput('line_' + j);
            for (var i = 0; i < this.dim_; i++) {
                this.line[j].appendField(new Blockly.FieldTextInput("0"), 'element_' + j + i);
            }
            this.line[j].setAlign(Blockly.ALIGN_CENTRE);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("numpy_create_table_with_init",
    Blockly.Constants.Numpy.NUMPY_CREATE_TABLE_WITH_INIT_EXTENSION);

Blockly.Extensions.register("numpy_square_matrix_init",
    Blockly.Constants.Numpy.NUMPY_SQUARE_MATRIX_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('numpy_create_table_with_mutator',
    Blockly.Constants.Numpy.NUMPY_CREATE_TABLE_WITH_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator("numpy_square_matrix_mutator",
    Blockly.Constants.Numpy.NUMPY_SQUARE_MATRIX_MUTATOR_MIXIN);