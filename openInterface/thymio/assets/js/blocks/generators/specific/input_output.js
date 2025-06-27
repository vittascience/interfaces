/**
 * @fileoverview Input/Output generators for Thymio.
 */

// Thymio

Blockly.Python.regexVarGlobals_ = /(motor_left_target|motor_right_target|prox_ground_delta|prox_horizontal)/g;

Blockly.Python.io_pause = function (block) {
	Blockly.Python.addImport('time', IMPORT_TIME);
	const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '0';
	switch (block.getFieldValue('UNIT')) {
		case 'SEC':
			return 'time.sleep(' + duration + ')' + NEWLINE;
		case 'MILLI':
			return 'time.sleep_ms(' + duration + ')' + NEWLINE;
		case 'MICRO':
			return 'time.sleep_us(' + duration + ')' + NEWLINE;
		default:
			return 'sleep(' + duration + ')' + NEWLINE;
	}
};

Blockly.Python.io_waitUntil = function (block) {
	const condition = Blockly.Python.valueToCode(block, 'UNTIL', Blockly.Python.ORDER_ATOMIC);
	return 'while not ' + condition + ':' + NEWLINE + '  pass' + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
	Blockly.Python.addImport('time', IMPORT_TIME);
	Blockly.Python.addConstant('chronometer', 't0 = time.ticks_ms()');
	block.workspace.createVariable('t0');
	return 't0 = time.ticks_ms()' + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
	Blockly.Python.addImport('time', IMPORT_TIME);
	Blockly.Python.addConstant('chronometer', 't0 = time.ticks_ms()');
	block.workspace.createVariable('t0');
	switch (block.getFieldValue('UNIT')) {
		case 'SEC':
			return ['time.ticks_diff(time.ticks_ms(), t0)/1e3', Blockly.Python.ORDER_ATOMIC];
		case 'MILLI':
			return ['time.ticks_diff(time.ticks_ms(), t0)', Blockly.Python.ORDER_ATOMIC];
		case 'MICRO':
			return ['time.ticks_diff(time.ticks_ms(), t0)/1e-3', Blockly.Python.ORDER_ATOMIC];
	}
};

Blockly.Python.io_timer_ms = function (block) {
	const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
	const timer = block.getFieldValue('TIMER');
	return `timer_period[${timer}] = ${duration}` + NEWLINE;
};

Blockly.Python.io_isButtonPressed = function (block) {
	const button = block.getFieldValue('BUTTON');
	return [`${button} == 1`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_onButtonPressed = function (block) {
	const button = block.getFieldValue('BUTTON');
	const state = block.getFieldValue('STATE');
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	return `if ${button} == ${state}:${NEWLINE}${branchCode}`;
};

Blockly.Python.io_onButtonPressed_event = function (block) {
	const button = block.getFieldValue('BUTTON');
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = branchCode.match(regexGlobals);
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	// console.log(Blockly.Python.variables_);
	if (detectGlobalVar && Blockly.Python.variables_.length > 0) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	Blockly.Python.addPowerOnEvent(`${button}`, `@onevent\ndef ${button}():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
	return '';
};

// proximity event

Blockly.Python.io_onProximity_event = function (block) {
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ? branchCode.match(regexGlobals): false
	const proxSensor = block.getFieldValue('PROXIMITY');
	const operator = block.getFieldValue('OPERATOR');
	const initStatement = `if prox_horizontal[${proxSensor}] ${operator}:`;
	const indentInitStatement = Blockly.Python.prefixLines(initStatement, Blockly.Python.INDENT);
	const indentBranchCode = Blockly.Python.prefixLines(branchCode, Blockly.Python.INDENT);
	Blockly.Python.onEvents_ += indentInitStatement + NEWLINE + indentBranchCode;
	const onEventBlock = Blockly.Python.onEvents_;
	const globals = ['prox_horizontal'];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	if (globals.length > 0) {
		Blockly.Python.globals_.push(globals);
		Blockly.Python.globals_ = Blockly.Python.globals_.flat();
	}
	const getGlobals = [...new Set(Blockly.Python.globals_)];
	const codeToParse = getGlobals.length > 0 ? '  global ' + getGlobals.join(', ') + NEWLINE + onEventBlock : onEventBlock;
	//old method
	// Blockly.Python.codeFunctions_['onEventProx'] = '@onevent\ndef prox():' + NEWLINE + codeToParse;
	Blockly.Python.powersEvents_[`onEventProx`] =  `@onevent\ndef prox():${NEWLINE}${codeToParse}`;
	return '';
};

// proximity line event
Blockly.Python.io_onProximityLine_event = function (block) {
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ? branchCode.match(regexGlobals): false
	const proxSensor = block.getFieldValue('DIRECTION');
	const operator = block.getFieldValue('VALUE');
	let initStatement = '';
	if (proxSensor === '2') {
		initStatement = `if prox_ground_delta[0] ${operator === 'something' || operator === 'white'  ? '> 450' : '< 400'} and prox_ground_delta[1] ${operator === 'something' || operator === 'white'  ? '> 450' : '< 400'}:`;
	} else {
		initStatement = `if prox_ground_delta[${proxSensor}] ${operator === 'something' || operator === 'white'  ? '> 450' : '< 400'}:`;
	}
	const indentInitStatement = Blockly.Python.prefixLines(initStatement, Blockly.Python.INDENT);
	const indentBranchCode = Blockly.Python.prefixLines(branchCode, Blockly.Python.INDENT);
	Blockly.Python.onEvents_ += indentInitStatement + NEWLINE + indentBranchCode;
	const onEventBlock = Blockly.Python.onEvents_;
	const globals = ["prox_ground_delta"];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	if (globals.length > 0) {
		Blockly.Python.globals_.push(globals);
		Blockly.Python.globals_ = Blockly.Python.globals_.flat();
	}
	const getGlobals = [...new Set(Blockly.Python.globals_)];
	const codeToParse = getGlobals.length > 0 ? '  global ' + getGlobals.join(', ') + NEWLINE + onEventBlock : '' + onEventBlock;
	//old method
	// Blockly.Python.codeFunctions_['onEventProx'] = '@onevent\ndef prox():' + NEWLINE + codeToParse;
	Blockly.Python.powersEvents_[`onEventProx`] =  `@onevent\ndef prox():${NEWLINE}${codeToParse}`;
	return '';
};

// timer event
Blockly.Python.io_onTimer_event = function (block) {
	const timer = block.getFieldValue('TIMER');
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ?  branchCode.match(regexGlobals) : [];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	Blockly.Python.addPowerOnEvent(`timer${timer}`, `@onevent\ndef timer${timer}():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
	return '';
};

//onEvent tap
Blockly.Python.io_onTap_event = function (block) {
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ?  branchCode.match(regexGlobals) : [];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	Blockly.Python.addPowerOnEvent(`tap`, `@onevent\ndef tap():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
	return '';
};

//rc5 event
Blockly.Python.io_communication_event = function (block) {
	const comType = block.getFieldValue('COM');
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ?  branchCode.match(regexGlobals) : [];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}

	Blockly.Python.addPowerOnEvent(`${comType}`, `@onevent\ndef ${comType}():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
	return '';
};

// event
Blockly.Python.io_event_basic = function (block) {
	const eventType = block.getFieldValue('EVENT');
	const checkProx = Blockly.Python.onEvents_
	let branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ?  branchCode.match(regexGlobals) : [];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	if (globals.length > 0) {
		Blockly.Python.globals_.push(globals.join(', '));
	}
	if (eventType === 'prox') {
		Blockly.Python.onEvents_ += branchCode;
		let onEventProxBlock = Blockly.Python.onEvents_;
		const getGlobals = [...new Set(Blockly.Python.globals_)];
		const codeToParse = getGlobals.length > 0 ? '  global ' + getGlobals + NEWLINE + onEventProxBlock : onEventProxBlock;
		Blockly.Python.codeFunctions_['onEventProx'] = '@onevent\ndef prox():' + NEWLINE + codeToParse;
		return '';
	} else {
		Blockly.Python.addPowerOnEvent(`${eventType}`, `@onevent\ndef ${eventType}():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
		return '';
	}
};

// sounds

Blockly.Python.io_sound_mic_threshold = function (block) {
	const threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_NONE) || '0';
	return 'mic_threshold = ' + threshold + NEWLINE;
};

Blockly.Python.io_event_microphone = function (block) {
	const event = block.getFieldValue('EVENT');
	const branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	const globals = [];
	const detectVar = branchCode.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = Blockly.Python.variables_.length > 0 ?  branchCode.match(regexGlobals) : [];
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	if (detectGlobalVar) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
	Blockly.Python.addPowerOnEvent(`mic`, `@onevent\ndef ${event}():${NEWLINE}${globals.length > 0 ? '  global ' + globals.join(', ') + '\n' + branchCode : branchCode}`);
	return '';
};