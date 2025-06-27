

Blockly.Python.display_led_ring_colors = function(block) {
    Blockly.Python.niryo_initialization();
    const value_red = Blockly.Python.valueToCode(block, 'RED', Blockly.Python.ORDER_ATOMIC);
    const value_green = Blockly.Python.valueToCode(block, 'GREEN', Blockly.Python.ORDER_ATOMIC);
    const value_blue = Blockly.Python.valueToCode(block, 'BLUE', Blockly.Python.ORDER_ATOMIC);
    return [`[${value_red}, ${value_green}, ${value_blue}]`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.display_led_ring_colors_picker = function(block) {
    Blockly.Python.niryo_initialization();
    let value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    value_color = value_color.replace('(', '').replace(')', '');
    value_color.split(',');
    return [`[${value_color}]`,Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.display_led_ring_solid_color = function(block) {
    Blockly.Python.niryo_initialization();
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const wait = block.getFieldValue('WAIT');
    return `niryo_robot.led_ring.solid(${value_color}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_flashing_color = function(block) {
    Blockly.Python.niryo_initialization();
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    return `niryo_robot.led_ring.flashing(${value_color}, period=${time}, iterations=${repetition}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_breathing_color = function(block) {
    Blockly.Python.niryo_initialization();
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    return `niryo_robot.led_ring.breathing(${value_color}, period=${time}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_chase_color = function(block) {
    Blockly.Python.niryo_initialization();
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    return `niryo_robot.led_ring.chase(${value_color}, period=${time}, iterations=${repetition}, wait=${wait})\n`;
}

Blockly.Python.display_led_ring_set_led = function(block) {
    Blockly.Python.niryo_initialization();
    const value_led = Blockly.Python.valueToCode(block, 'LED', Blockly.Python.ORDER_ATOMIC);
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const value = [...JSON.parse(value_color), 0];
    return `niryo_robot.led_ring.set_led_color(${value_led}, [${value}])\n`;
};

Blockly.Python.display_led_ring_wipe_color = function(block) {
    Blockly.Python.niryo_initialization();
    const value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    const value = [...JSON.parse(value_color), 0];
    return `niryo_robot.led_ring.wipe([${value}], period= ${duration},  wait=${wait})\n`;
};

Blockly.Python.display_led_ring_rainbow_pattern = function(block) {
    Blockly.Python.niryo_initialization();
    const wait = block.getFieldValue('WAIT');
    const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    return `niryo_robot.led_ring.rainbow(period=${duration}, iterations=${repetition}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_rainbow_cycle = function(block) {
    Blockly.Python.niryo_initialization();
    const wait = block.getFieldValue('WAIT');
    const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    return `niryo_robot.led_ring.rainbow_cycle(period=${duration}, iterations=${repetition}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_go_up = function(block) {
    Blockly.Python.niryo_initialization();
    const color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const value = [...JSON.parse(color), 0];
    return `niryo_robot.led_ring.go_up([${value}], period=${duration}, iterations=${repetition}, wait=${wait})\n`;
};

Blockly.Python.display_led_ring_go_up_down = function(block) {
    Blockly.Python.niryo_initialization();
    const color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    const repetition = Blockly.Python.valueToCode(block, 'REPETITION', Blockly.Python.ORDER_ATOMIC) || 1;
    const wait = block.getFieldValue('WAIT');
    const duration = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || 1;
    const value = [...JSON.parse(color), 0];
    return `niryo_robot.led_ring.go_up_down([${value}], period=${duration}, iterations=${repetition}, wait=${wait})\n`;
};

