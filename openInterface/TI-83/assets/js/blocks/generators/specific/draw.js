/**
 * @fileoverview Graph generators for Texas Instruments mode.
 */

// CONFIGURATION
Blockly.Python.ti_draw_set_window = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || '0';
	const height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || '0';
	return 'set_window(' + width + ', ' + height + ')' + NEWLINE;
};

Blockly.Python.ti_draw_get_window = function () {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	return ['get_screen_dim()', Blockly.Python.ORDER_NONE];
};

Blockly.Python.ti_draw_set_color = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const red = Blockly.Python.valueToCode(block, 'COLOR_RED', Blockly.Python.ORDER_NONE) || '255';
	const green = Blockly.Python.valueToCode(block, 'COLOR_GREEN', Blockly.Python.ORDER_NONE) || '255';
	const blue = Blockly.Python.valueToCode(block, 'COLOR_BLUE', Blockly.Python.ORDER_NONE) || '255';
	return `set_color(${red}, ${green}, ${blue})` + NEWLINE;
};

Blockly.Python.ti_draw_set_pen = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const thickness = block.getFieldValue('THICKNESS');
	const style = block.getFieldValue('STYLE');
	return `set_pen("${thickness}", "${style}")` + NEWLINE;
};

// DRAWING
Blockly.Python.ti_draw_draw_line = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_NONE) || '0';
	const y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_NONE) || '0';
	const x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_NONE) || '0';
	const y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_NONE) || '0';
	return 'draw_line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ')' + NEWLINE;
};

Blockly.Python.ti_draw_draw_circle = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const r = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_NONE) || '0';
	return 'draw_circle(' + x + ', ' + y + ', ' + r + ')' + NEWLINE;
};

Blockly.Python.ti_draw_fill_circle = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const r = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_NONE) || '0';
	return 'fill_circle(' + x + ', ' + y + ', ' + r + ')' + NEWLINE;
};

Blockly.Python.ti_draw_draw_rect = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const w = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || '0';
	const h = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || '0';
	return 'draw_rect(' + x + ', ' + y + ', ' + w + ', ' + h + ')' + NEWLINE;
};

Blockly.Python.ti_draw_fill_rect = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const w = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || '0';
	const h = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE) || '0';
	return 'fill_rect(' + x + ', ' + y + ', ' + w + ', ' + h + ')' + NEWLINE;
};

Blockly.Python.ti_draw_draw_text = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "''";
	return 'draw_text(' + x + ', ' + y + ', ' + text + ')' + NEWLINE;
};

Blockly.Python.ti_draw_draw_poly = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const listX = Blockly.Python.valueToCode(block, 'LISTX', Blockly.Python.ORDER_NONE) || '[135, 198, 173, 97, 72]';
	const listY = Blockly.Python.valueToCode(block, 'LISTY', Blockly.Python.ORDER_NONE) || '[70, 116, 173, 173, 116]';
	return 'draw_poly(' + listX + ', ' + listY + ')' + NEWLINE;
};

Blockly.Python.ti_draw_fill_poly = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const listX = Blockly.Python.valueToCode(block, 'LISTX', Blockly.Python.ORDER_NONE) || '[135, 198, 173, 97, 72]';
	const listY = Blockly.Python.valueToCode(block, 'LISTY', Blockly.Python.ORDER_NONE) || '[70, 116, 173, 173, 116]';
	return 'fill_poly(' + listX + ', ' + listY + ')' + NEWLINE;
};

Blockly.Python.ti_draw_plot_xy = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE) || '0';
	const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE) || '0';
	const shape = block.getFieldValue('SHAPE');
	return 'plot_xy(' + x + ', ' + y + ', ' + shape + ')' + NEWLINE;
};

//DRAW show
Blockly.Python.ti_draw_show = function (block) {
	Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
	return 'show_draw()' + NEWLINE;
};
