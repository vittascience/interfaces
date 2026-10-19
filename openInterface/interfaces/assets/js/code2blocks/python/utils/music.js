/**
 * @fileoverview Reverse translation of the notes block (actuators_music_playNotes): "buzzer_playNotes(p26, ['c1', 'e:2'])".
 */
import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// pin option of the board whose variable is the given one (ex: "p26" => 'p26', "d0" => "'D0'")
const pinOption = (variable) => {
    const board = Blockly.Constants.getSelectedBoard();
    const options = Object.values(Blockly.Constants.Pins || {}).flatMap((pins) => (Array.isArray(pins?.[board]) ? pins[board] : []));
    const values = options.map(([, value]) => value);
    // variable given by the pin generator of the interface (ex: Galaxia 'p2' => p1), or the same name
    const generated = values.find((value) => {
        try {
            return String(Blockly.Python.Generators.digital_write(value, '')).toLowerCase() === variable.toLowerCase();
        } catch (error) {
            return false;
        }
    });
    return generated ?? values.find((value) => String(value).replace(/'/g, '').toLowerCase() === variable.toLowerCase());
};

utils.prototypeBlocks['buzzer_playNotes'] = function (type, identifier, values, mutations, statementsNode) {
    const [pin, notes] = statementsNode || [];
    if (statementsNode?.length !== 2 || pin.type !== 'identifier' || notes.type !== 'list') return null;
    const pinValue = pinOption(pin.text);
    if (pinValue === undefined) return null;
    // initializations generated again by the block (ex: "__PWM = {}", pin declaration)
    utils.python2Blocks.learned?.recognize('actuators_music_playNotes', { PIN: pinValue });
    const items = utils.getArgumentList(notes.children);
    const block = {
        type: 'actuators_music_playNotes',
        fields: { PIN: pinValue },
        values: {},
        mutations: { items: items.length },
        statementsNode: {},
        statement: null
    };
    items.forEach((item, i) => {
        block.values[`ADD${i}`] = null;
        // note block learned from its generator (ex: 'c1', 'e:2'), or the value itself
        const note = utils.python2Blocks.learned?.match(item, 'value');
        block.statementsNode[`ADD${i}`] = note?.type === 'actuators_music_note' ? { type: 'learned_block', block: note } : item;
    });
    return block;
};
