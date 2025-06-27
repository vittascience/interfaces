

Blockly.defineBlocksWithJsonArray([
    {
        "type": "switch_case",
        "message0": "switch %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "SWITCH_VAR",
                // "check": "Number"
            },
            {
                "type": "input_dummy"
            }
        ],
        "message1": "case %1 : %2",
        "args1": [
            {
                "type": "input_value",
                "name": "CASE0",
                // "check": "Number"
            },
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color",
            "block_buttons_plus_minus",
            "switch_case_init"
        ],
        "mutator": "switch_case_mutator",
        "tooltip": "",
        "helpUrl": ""
    }
]); // BEGIN JSON EXTRACT

Blockly.Arduino.switch_case = function (block) {
    var variable_switch_var = Blockly.Arduino.valueToCode(block, 'SWITCH_VAR', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'switch(' + variable_switch_var + ') {\n';
    for (var i = 0; i < block.caseCount_; i++) {
        var argument = Blockly.Arduino.valueToCode(block, 'CASE' + i, Blockly.Arduino.ORDER_NONE);
        var branch = Blockly.Arduino.statementToCode(block, 'DO' + i);
        code += '  case ' + argument + ':\n' + branch + '    break;\n';
    }
    code += '}\n';
    return code;
};

Blockly.Constants.switch_case = Object.create(null);

Blockly.Constants.switch_case.SWITCH_CASE_INIT_EXTENSION = function () {
    this.caseCount_ = 0;
    this.updateShape_();
};

Blockly.Constants.switch_case.SWITCH_CASE_MUTATOR_MIXIN = {
    mutationToDom: function () {
        if (!this.caseCount_) {
            return null;
        }
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('case', this.caseCount_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.caseCount_ = parseInt(xmlElement.getAttribute('case'), 10) || 0;
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('switch_case_mutator');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.caseCount_; i++) {
            var caseBlock = workspace.newBlock('case_in_switch');
            caseBlock.initSvg();
            connection.connect(caseBlock.previousConnection);
            connection = caseBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        this.caseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'case_in_switch':
                    this.caseCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections);
    },
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'case_in_switch':
                    var inputCase = this.getInput('CASE' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ = inputCase && inputCase.connection.targetConnection;
                    clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function () {
        var that = this;
        var i = 0;

        // Delete existing inputs.
        while (this.getInput('CASE' + i)) {
            this.removeInput('CASE' + i);
            this.removeInput('DO' + i);
            if (this.getInput('CASE_BUTTONS' + i)) {
                this.removeInput('CASE_BUTTONS' + i);
            }
            i++;
        }
        if (this.getInput('ADD_CASE')) {
            this.removeInput('ADD_CASE');
        }

        // Rebuild block.
        for (i = 0; i < this.caseCount_; i++) {
            this.appendValueInput('CASE' + i)
                .appendField('case');
            this.appendStatementInput('DO' + i)
                .appendField('do');
            if (this.caseCount_ > 1) {
                var removeCase = (function (index) {
                    return function () {
                        that.removeCase_(index);
                    };
                })(i);
                this.appendDummyInput('CASE_BUTTONS' + i)
                    .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", removeCase));
            }
        }

        // Add "+" button (and optionally "-" button if there are multiple cases).
        var addCase = function () {
            that.addCase_();
        };
        var dummyInput = this.appendDummyInput('ADD_CASE');
        dummyInput.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", addCase));
        if (this.caseCount_ > 0) {
            var removeLastCase = function () {
                that.removeCase_(that.caseCount_ - 1);
            };
            dummyInput.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                this.buttonSize, "*", removeLastCase));
        }
    },
    addCase_: function () {
        this.saveConnections_();
        this.caseCount_++;
        this.updateShape_();
        this.restoreConnections_();
    },
    removeCase_: function (index) {
        this.saveConnections_();
        this.caseCount_--;
        this.updateShape_();
        this.restoreConnections_();
    },
    saveConnections_: function () {
        this.valueConnections_ = [null];
        this.statementConnections_ = [null];
        for (var i = 0; i < this.caseCount_; i++) {
            var inputCase = this.getInput('CASE' + i);
            var inputDo = this.getInput('DO' + i);
            this.valueConnections_.push(inputCase && inputCase.connection.targetConnection);
            this.statementConnections_.push(inputDo && inputDo.connection.targetConnection);
        }
    },
    restoreConnections_: function () {
        for (var i = 0; i < this.caseCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'CASE' + i);
            Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
        }
    },
    reconnectChildBlocks_: function (valueConnections, statementConnections) {
        for (var i = 0; i < this.caseCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'CASE' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
    },
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var i = 0;
        while (this.getInput('CASE' + i)) {
            var inputCase = this.getInput('CASE' + i);
            var inputDo = this.getInput('DO' + i);
            valueConnections.push(inputCase.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections);
    }
};

Blockly.Extensions.register('switch_case_init',
    Blockly.Constants.switch_case.SWITCH_CASE_INIT_EXTENSION);

Blockly.Extensions.registerMutator('switch_case_mutator',
    Blockly.Constants.switch_case.SWITCH_CASE_MUTATOR_MIXIN);
