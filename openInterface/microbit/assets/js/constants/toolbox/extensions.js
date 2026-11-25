/**
 * Catalog of the block extensions of the micro:bit interface (format described in BlockExtensions.js).
 * The A4 Technologie microSySTEM blocks are ported from their MakeCode extensions (github.com/A4-TECHNOLOGIE),
 * their Python libraries are in assets/lib/a4. The block names are saved in the projects: never rename them.
 * The texts are Blockly messages of the interface (assets/js/blocks/msg/blocks/js/<lang>.js): t('a4_leds.blocks.battery')
 * is Blockly.Msg['EXT_A4_LEDS_BLOCKS_BATTERY'].
 */
const BLOCK_EXTENSIONS_CATALOG = (() => {
    const t = (key) => ({ msg: 'EXT_' + key.toUpperCase().replace(/\./g, '_') });
    const COLOURS = {
        red: [t('colours.red'), 255, 0, 0],
        green: [t('colours.green'), 0, 255, 0],
        blue: [t('colours.blue'), 0, 0, 255],
        yellow: [t('colours.yellow'), 255, 255, 0],
        cyan: [t('colours.cyan'), 0, 255, 255],
        magenta: [t('colours.magenta'), 255, 0, 255],
        orange: [t('colours.orange'), 255, 80, 0],
        purple: [t('colours.purple'), 120, 0, 255],
        white: [t('colours.white'), 255, 255, 255],
        off: [t('colours.off'), 0, 0, 0],
        black: [t('colours.black'), 0, 0, 0]
    };
    const LIGHT_COLOURS = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'purple', 'white', 'off'];
    const SCREEN_COLOURS = ['black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'purple'];
    const number = (name, value) => ({ name, type: 'number', default: String(value) });
    const text = (name, value = '') => ({ name, type: 'text', default: value });
    const dropdown = (name, options) => ({ name, type: 'dropdown', options });
    // Light colours are (r, g, b) tuples, screen colours 0xRRGGBB numbers.
    const lightColour = (name) => dropdown(name, LIGHT_COLOURS.map((key) => {
        const [label, ...rgb] = COLOURS[key];
        return [label, `(${rgb.join(', ')})`];
    }));
    const screenColour = (name) => dropdown(name, SCREEN_COLOURS.map((key) => {
        const [label, ...rgb] = COLOURS[key];
        return [label, '0x' + rgb.map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase()];
    }));
    const RGB_ARGS = [number('R', 255), number('G', 100), number('B', 0)];

    const LED_BLOCKS = [
        { name: 'battery', kind: 'number', text: t('a4_leds.blocks.battery'), code: 'a4_board.battery()' },
        {
            name: 'leds_colour', kind: 'statement', text: t('a4_leds.blocks.leds_colour'),
            args: [lightColour('C0'), lightColour('C1')], code: 'a4_board.set_leds({C0}, {C1})'
        },
        {
            name: 'leds_rgb', kind: 'statement',
            text: t('a4_leds.blocks.leds_rgb'),
            args: [number('R0', 255), number('G0', 0), number('B0', 0), number('R1', 0), number('G1', 0), number('B1', 255)],
            code: 'a4_board.set_leds(({R0}, {G0}, {B0}), ({R1}, {G1}, {B1}))'
        },
        {
            name: 'leds_brightness', kind: 'statement', text: t('a4_leds.blocks.leds_brightness'),
            args: [number('B', 255)], code: 'a4_board.set_brightness({B})'
        },
        { name: 'leds_off', kind: 'statement', text: t('a4_leds.blocks.leds_off'), code: 'a4_board.set_leds((0, 0, 0), (0, 0, 0))' }
    ];

    const screenBlocks = (initBlock) => [
        initBlock,
        { name: 'screen_clear', kind: 'statement', text: t('a4_screen.blocks.screen_clear'), code: 'a4_screen.clear()' },
        {
            name: 'screen_background', kind: 'statement', text: t('a4_screen.blocks.screen_background'),
            args: [screenColour('C')], code: 'a4_screen.background_color({C})'
        },
        {
            name: 'screen_background_image', kind: 'statement', text: t('a4_screen.blocks.screen_background_image'),
            args: [text('NAME')], code: 'a4_screen.background_image({NAME})'
        },
        {
            name: 'screen_text', kind: 'statement',
            text: t('a4_screen.blocks.screen_text'),
            args: [text('TEXT', t('a4_screen.defaults.screen_text')), number('ID', 1), number('X', 120), number('Y', 120),
                dropdown('SIZE', [[t('a4_screen.options.screen_text_size.large'), '1'], [t('a4_screen.options.screen_text_size.small'), '2']]), screenColour('C')],
            code: 'a4_screen.text({TEXT}, {ID}, {X}, {Y}, {SIZE}, {C})'
        },
        {
            name: 'screen_image', kind: 'statement',
            text: t('a4_screen.blocks.screen_image'),
            args: [number('ID', 1), text('NAME'), number('X', 120), number('Y', 120), number('ZOOM', 256)],
            code: 'a4_screen.image({ID}, {NAME}, {X}, {Y}, {ZOOM})'
        },
        {
            name: 'screen_rotate', kind: 'statement', text: t('a4_screen.blocks.screen_rotate'),
            args: [number('ID', 1), number('ANGLE', 180)], code: 'a4_screen.rotate_image({ID}, {ANGLE})'
        },
        {
            name: 'screen_remove', kind: 'statement', text: t('a4_screen.blocks.screen_remove'),
            args: [dropdown('KIND', [[t('a4_screen.options.screen_remove_kind.text'), '0x18'], [t('a4_screen.options.screen_remove_kind.image'), '0x08']]), number('ID', 1)],
            code: 'a4_screen.remove({KIND}, {ID})'
        }
    ];
    const SCREEN_I2C_INIT = { name: 'screen_init', kind: 'statement', text: t('a4_screen.blocks.screen_init_i2c'), code: 'a4_screen.init_i2c()' };

    // Extension of blocks already defined by the interface ("toolbox" format of BlockExtensions.js).
    const legacy = (id, name, image, tags, style, svgIcon, toolbox, logo) => ({
        id, name, description: t(id + '.description'), image, logo, tags, style, svgIcon, toolbox
    });

    const catalog = [
        {
            id: 'a4_access',
            name: 'Access microSySTEM',
            description: t('a4_access.description'),
            image: 'a4_access.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'sensors', 'actuators'],
            blocks: [
                {
                    name: 'lock', kind: 'statement', text: t('a4_access.blocks.lock'),
                    args: [dropdown('STATE', [[t('a4_access.options.lock_state.locked'), '1'], [t('a4_access.options.lock_state.unlocked'), '0']])],
                    code: 'a4_board.write_port(0, {STATE})'
                },
                {
                    name: 'door_is', kind: 'boolean', text: t('a4_access.blocks.door_is'),
                    args: [dropdown('STATE', [[t('a4_access.options.door_is_state.closed'), 'True'], [t('a4_access.options.door_is_state.open'), 'False']])],
                    code: 'a4_access.door_is({STATE})'
                },
                { name: 'wait_key', kind: 'text', text: t('a4_access.blocks.wait_key'), code: 'a4_access.wait_key()' },
                { name: 'read_key', kind: 'text', text: t('a4_access.blocks.read_key'), code: 'a4_access.read_key()' },
                { name: 'entered_code', kind: 'text', text: t('a4_access.blocks.entered_code'), code: 'a4_access.entered_code()' },
                {
                    name: 'code_is', kind: 'boolean', text: t('a4_access.blocks.code_is'),
                    args: [text('CODE', '1234')], code: 'a4_access.entered_code() == {CODE}'
                },
                {
                    name: 'code_length', kind: 'boolean', text: t('a4_access.blocks.code_length'),
                    args: [number('N', 4)], code: 'len(a4_access.entered_code()) == {N}'
                },
                { name: 'clear_code', kind: 'statement', text: t('a4_access.blocks.clear_code'), code: 'a4_access.clear_code()' },
                { name: 'delete_last', kind: 'statement', text: t('a4_access.blocks.delete_last'), code: 'a4_access.delete_last()' }
            ]
        },
        {
            id: 'a4_parking',
            name: 'Parking microSySTEM',
            description: t('a4_parking.description'),
            image: 'a4_parking.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'sensors', 'display'],
            blocks: [
                { name: 'vehicle', kind: 'boolean', text: t('a4_parking.blocks.vehicle'), code: 'a4_board.read_port(0) == 1' },
                ...LED_BLOCKS,
                ...screenBlocks(SCREEN_I2C_INIT),
                {
                    name: 'time', kind: 'text', text: t('a4_parking.blocks.time'),
                    args: [number('H', 12), number('M', 40), number('S', 30)], code: "'%02d:%02d:%02d' % (int({H}), int({M}), int({S}))"
                }
            ]
        },
        {
            id: 'a4_barrier',
            name: 'Barrier microSySTEM',
            description: t('a4_barrier.description'),
            image: 'a4_barrier.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'sensors', 'actuators', 'lights'],
            blocks: [
                { name: 'read_tag', kind: 'number', text: t('a4_barrier.blocks.read_tag'), code: 'a4_barrier.read_tag()' },
                {
                    name: 'move', kind: 'statement', text: t('a4_barrier.blocks.move'),
                    args: [dropdown('ACTION', [[t('a4_barrier.options.move_action.open'), '115'], [t('a4_barrier.options.move_action.close'), '5']])],
                    code: 'a4_barrier.servo({ACTION})'
                },
                {
                    name: 'servo', kind: 'statement', text: t('a4_barrier.blocks.servo'),
                    args: [number('ANGLE', 90)], code: 'a4_barrier.servo({ANGLE})'
                },
                { name: 'vehicle', kind: 'boolean', text: t('a4_barrier.blocks.vehicle'), code: 'a4_board.read_port(0) != 0' },
                {
                    name: 'light_colour', kind: 'statement', text: t('a4_barrier.blocks.light_colour'),
                    args: [lightColour('C')], code: 'a4_barrier.set_light({C})'
                },
                {
                    name: 'light_rgb', kind: 'statement', text: t('a4_barrier.blocks.light_rgb'),
                    args: RGB_ARGS, code: 'a4_barrier.set_light(({R}, {G}, {B}))'
                },
                { name: 'light_off', kind: 'statement', text: t('a4_barrier.blocks.light_off'), code: 'a4_barrier.set_light((0, 0, 0))' }
            ]
        },
        {
            id: 'a4_weight',
            name: 'Weight microSySTEM',
            description: t('a4_weight.description'),
            image: 'a4_weight.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'sensors', 'display'],
            blocks: [
                { name: 'init', kind: 'statement', text: t('a4_weight.blocks.init'), code: 'a4_weight.init()' },
                { name: 'tare', kind: 'statement', text: t('a4_weight.blocks.tare'), code: 'a4_weight.tare()' },
                { name: 'mass', kind: 'number', text: t('a4_weight.blocks.mass'), code: 'a4_weight.mass()' },
                { name: 'connected', kind: 'boolean', text: t('a4_weight.blocks.connected'), code: 'a4_weight.connected()' },
                { name: 'start_calibration', kind: 'statement', text: t('a4_weight.blocks.start_calibration'), code: 'a4_weight.start_calibration()' },
                {
                    name: 'calibrate', kind: 'boolean', text: t('a4_weight.blocks.calibrate'),
                    args: [number('MASS', 100)], code: 'a4_weight.calibrate({MASS})'
                },
                { name: 'pressed_key', kind: 'text', text: t('a4_weight.blocks.pressed_key'), code: 'a4_weight.pressed_key()' },
                { name: 'wait_key', kind: 'text', text: t('a4_weight.blocks.wait_key'), code: 'a4_weight.wait_key()' },
                {
                    name: 'key_is_pressed', kind: 'boolean', text: t('a4_weight.blocks.key_is_pressed'),
                    args: [dropdown('KEY', [...'123A456B789C*0#D'].map(key => [key, `'${key}'`]))], code: 'a4_weight.pressed_key() == {KEY}'
                },
                {
                    name: 'set_factor', kind: 'statement', text: t('a4_weight.blocks.set_factor'),
                    args: [number('VALUE', 2236)], code: 'a4_weight.factor = {VALUE}'
                },
                { name: 'factor', kind: 'number', text: t('a4_weight.blocks.factor'), code: 'a4_weight.factor' },
                {
                    name: 'raw_average', kind: 'number', text: t('a4_weight.blocks.raw_average'),
                    args: [number('N', 10)], code: 'a4_weight.raw_average({N})'
                },
                ...screenBlocks(SCREEN_I2C_INIT)
            ]
        },
        {
            id: 'a4_shifumi',
            name: 'ShiFuMi microSySTEM',
            description: t('a4_shifumi.description'),
            image: 'a4_shifumi.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'games', 'sensors', 'actuators', 'lights'],
            blocks: [
                {
                    name: 'disc_angle', kind: 'statement', text: t('a4_shifumi.blocks.disc_angle'),
                    args: [number('ANGLE', 90)], code: 'a4_shifumi.servo({ANGLE})'
                },
                { name: 'distance', kind: 'number', text: t('a4_shifumi.blocks.distance'), code: 'a4_shifumi.distance()' },
                {
                    name: 'hand_detected', kind: 'boolean', text: t('a4_shifumi.blocks.hand_detected'),
                    args: [number('D', 12)], code: 'a4_shifumi.hand_detected({D})'
                },
                {
                    name: 'backlight_brightness', kind: 'statement', text: t('a4_shifumi.blocks.backlight_brightness'),
                    args: [number('B', 30)], code: 'a4_shifumi.set_brightness({B})'
                },
                {
                    name: 'backlight_colour', kind: 'statement', text: t('a4_shifumi.blocks.backlight_colour'),
                    args: [lightColour('C')], code: 'a4_shifumi.set_backlight({C})'
                },
                {
                    name: 'backlight_rgb', kind: 'statement', text: t('a4_shifumi.blocks.backlight_rgb'),
                    args: RGB_ARGS, code: 'a4_shifumi.set_backlight(({R}, {G}, {B}))'
                },
                { name: 'backlight_off', kind: 'statement', text: t('a4_shifumi.blocks.backlight_off'), code: 'a4_shifumi.set_backlight((0, 0, 0))' },
                { name: 'lcd_init', kind: 'statement', text: t('a4_shifumi.blocks.lcd_init'), code: 'a4_shifumi.lcd_init()' },
                { name: 'lcd_clear', kind: 'statement', text: t('a4_shifumi.blocks.lcd_clear'), code: 'a4_shifumi.lcd_clear()' },
                {
                    name: 'lcd_text', kind: 'statement', text: t('a4_shifumi.blocks.lcd_text'),
                    args: [text('TEXT', t('a4_shifumi.defaults.lcd_text')), dropdown('LINE', ['1', '2'])], code: 'a4_shifumi.lcd_show({TEXT}, {LINE})'
                },
                {
                    name: 'lcd_number', kind: 'statement', text: t('a4_shifumi.blocks.lcd_number'),
                    args: [number('VALUE', 0), dropdown('LINE', ['2', '1'])], code: 'a4_shifumi.lcd_show({VALUE}, {LINE})'
                }
            ]
        },
        {
            id: 'a4_ai_vision',
            name: 'AI Vision microSySTEM',
            description: t('a4_ai_vision.description'),
            image: 'a4_ai_vision.webp',
            logo: 'a4_logo.webp',
            tags: ['model', 'ai', 'display', 'lights'],
            blocks: [
                ...LED_BLOCKS,
                ...screenBlocks({ name: 'screen_init', kind: 'statement', text: t('a4_screen.blocks.screen_init_uart'), code: 'a4_screen.init_uart()' })
            ]
        },
        {
            id: 'dfr0997',
            name: t('dfr0997.name'),
            description: t('dfr0997.description'),
            image: 'dfr0997.webp',
            logo: 'dfrobot_logo.webp',
            tags: ['display'],
            blocks: (() => {
                const colour = (name, value) => ({ name, type: 'colour', default: value });
                const fill = dropdown('FILL', [[t('dfr0997.options.fill.filled'), '1'], [t('dfr0997.options.fill.not_filled'), '0']]);
                const position = [number('X', 120), number('Y', 120)];
                return [
                    { name: 'clear', kind: 'statement', text: t('dfr0997.blocks.clear'), code: 'dfr0997.clear()' },
                    {
                        name: 'background', kind: 'statement', text: t('dfr0997.blocks.background'),
                        args: [colour('C', '#000000')], code: 'dfr0997.background_color({C})'
                    },
                    {
                        name: 'background_image', kind: 'statement', text: t('dfr0997.blocks.background_image'),
                        args: [text('NAME', 'bg.png')], code: 'dfr0997.background_image({NAME})'
                    },
                    {
                        name: 'rgb', kind: 'any', text: t('dfr0997.blocks.rgb'),
                        args: RGB_ARGS, code: 'dfr0997.rgb({R}, {G}, {B})'
                    },
                    {
                        name: 'text', kind: 'statement',
                        text: t('dfr0997.blocks.text'),
                        args: [text('TEXT', t('dfr0997.defaults.text')), number('ID', 1), number('X', 10), number('Y', 10),
                            dropdown('SIZE', [[t('dfr0997.options.text_size.large'), '1'], [t('dfr0997.options.text_size.small'), '2']]), colour('C', '#ffffff')],
                        code: 'dfr0997.text({TEXT}, {ID}, {X}, {Y}, {SIZE}, {C})'
                    },
                    {
                        name: 'image', kind: 'statement', text: t('dfr0997.blocks.image'),
                        args: [text('NAME', 'Cat.png'), number('ID', 1), ...position, number('ZOOM', 256)], code: 'dfr0997.image({ID}, {NAME}, {X}, {Y}, {ZOOM})'
                    },
                    {
                        name: 'rotate_image', kind: 'statement', text: t('dfr0997.blocks.rotate_image'),
                        args: [number('ID', 1), number('ANGLE', 180)], code: 'dfr0997.rotate_image({ID}, {ANGLE})'
                    },
                    {
                        name: 'gif', kind: 'statement', text: t('dfr0997.blocks.gif'),
                        args: [text('NAME', 'Cloudy.gif'), number('ID', 1), ...position, number('ZOOM', 256)], code: 'dfr0997.gif({ID}, {NAME}, {X}, {Y}, {ZOOM})'
                    },
                    {
                        name: 'line', kind: 'statement',
                        text: t('dfr0997.blocks.line'),
                        args: [number('ID', 1), number('X1', 10), number('Y1', 10), number('X2', 200), number('Y2', 100), number('W', 2), colour('C', '#ffffff')],
                        code: 'dfr0997.line({ID}, {X1}, {Y1}, {X2}, {Y2}, {W}, {C})'
                    },
                    {
                        name: 'rect', kind: 'statement',
                        text: t('dfr0997.blocks.rect'),
                        args: [number('ID', 1), number('X', 20), number('Y', 20), number('WIDTH', 100), number('HEIGHT', 60), number('W', 2), colour('C', '#ffffff'), fill, colour('FC', '#ff0000'),
                            dropdown('ROUND', [[t('dfr0997.options.rect_round.rounded'), '1'], [t('dfr0997.options.rect_round.square'), '0']])],
                        code: 'dfr0997.rect({ID}, {X}, {Y}, {WIDTH}, {HEIGHT}, {W}, {C}, {FILL}, {FC}, {ROUND})'
                    },
                    {
                        name: 'circle', kind: 'statement',
                        text: t('dfr0997.blocks.circle'),
                        args: [number('ID', 1), number('X', 160), number('Y', 120), number('R', 40), number('W', 2), colour('C', '#ffffff'), fill, colour('FC', '#ff0000')],
                        code: 'dfr0997.circle({ID}, {X}, {Y}, {R}, {W}, {C}, {FILL}, {FC})'
                    },
                    {
                        name: 'triangle', kind: 'statement',
                        text: t('dfr0997.blocks.triangle'),
                        args: [number('ID', 1), number('X1', 160), number('Y1', 40), number('X2', 100), number('Y2', 160), number('X3', 220), number('Y3', 160),
                            number('W', 2), colour('C', '#ffffff'), fill, colour('FC', '#ff0000')],
                        code: 'dfr0997.triangle({ID}, {X1}, {Y1}, {X2}, {Y2}, {X3}, {Y3}, {W}, {C}, {FILL}, {FC})'
                    },
                    {
                        name: 'slider', kind: 'statement', text: t('dfr0997.blocks.slider'),
                        args: [number('ID', 1), number('X', 20), number('Y', 120), number('WIDTH', 200), number('HEIGHT', 30), colour('C', '#0000ff')],
                        code: 'dfr0997.slider({ID}, {X}, {Y}, {WIDTH}, {HEIGHT}, {C})'
                    },
                    {
                        name: 'bar', kind: 'statement', text: t('dfr0997.blocks.bar'),
                        args: [number('ID', 1), number('X', 20), number('Y', 20), number('WIDTH', 200), number('HEIGHT', 25), colour('C', '#0000ff')],
                        code: 'dfr0997.bar({ID}, {X}, {Y}, {WIDTH}, {HEIGHT}, {C})'
                    },
                    {
                        name: 'compass', kind: 'statement', text: t('dfr0997.blocks.compass'),
                        args: [number('ID', 1), number('X', 80), number('Y', 40), number('D', 160)], code: 'dfr0997.compass({ID}, {X}, {Y}, {D})'
                    },
                    {
                        name: 'gauge', kind: 'statement',
                        text: t('dfr0997.blocks.gauge'),
                        args: [number('ID', 1), number('X', 80), number('Y', 40), number('D', 160), number('MIN', 0), number('MAX', 100), colour('C', '#ff0000'), colour('BG', '#ffffff')],
                        code: 'dfr0997.gauge({ID}, {X}, {Y}, {D}, {MIN}, {MAX}, {C}, {BG})'
                    },
                    {
                        name: 'line_meter', kind: 'statement',
                        text: t('dfr0997.blocks.line_meter'),
                        args: [number('ID', 1), number('X', 80), number('Y', 40), number('SIZE', 160), number('MIN', 0), number('MAX', 100), colour('C', '#ff0000'), colour('BG', '#ffffff')],
                        code: 'dfr0997.line_meter({ID}, {X}, {Y}, {SIZE}, {MIN}, {MAX}, {C}, {BG})'
                    },
                    {
                        name: 'set_value', kind: 'statement', text: t('dfr0997.blocks.set_value'),
                        args: [dropdown('KIND', [[t('dfr0997.options.set_value_kind.progress_bar'), '0x0B'], [t('dfr0997.options.set_value_kind.slider'), '0x0D'],
                            [t('dfr0997.options.set_value_kind.compass'), '0x0F'], [t('dfr0997.options.set_value_kind.gauge'), '0x13'], [t('dfr0997.options.set_value_kind.line_meter'), '0x11']]),
                        number('ID', 1), number('VALUE', 50)],
                        code: 'dfr0997.set_value({KIND}, {ID}, {VALUE})'
                    },
                    {
                        name: 'chart', kind: 'statement',
                        text: t('dfr0997.blocks.chart'),
                        args: [number('ID', 1), text('XAXIS', t('dfr0997.defaults.chart_x_axis')), text('YAXIS', '100 75 50 25 0'), colour('C', '#ffffff'),
                            dropdown('STYLE', [[t('dfr0997.options.chart_style.line'), '3'], [t('dfr0997.options.chart_style.bars'), '2'], [t('dfr0997.options.chart_style.shaded_line'), '1']])],
                        code: 'dfr0997.chart({ID}, {XAXIS}, {YAXIS}, {C}, {STYLE})'
                    },
                    {
                        name: 'chart_series', kind: 'statement', text: t('dfr0997.blocks.chart_series'),
                        args: [number('ID', 1), colour('C', '#ff0000')], code: 'dfr0997.chart_series({ID}, {C})'
                    },
                    {
                        name: 'chart_point', kind: 'statement', text: t('dfr0997.blocks.chart_point'),
                        args: [number('ID', 1), text('X', t('dfr0997.defaults.chart_point_x')), number('VALUE', 50)], code: 'dfr0997.chart_point({ID}, {X}, {VALUE})'
                    },
                    {
                        name: 'remove', kind: 'statement', text: t('dfr0997.blocks.remove'),
                        args: [dropdown('KIND', [[t('dfr0997.options.remove_kind.text'), '0x18'], [t('dfr0997.options.remove_kind.image'), '0x08'], ['GIF', '0x1F'],
                            [t('dfr0997.options.remove_kind.line'), '0x03'], [t('dfr0997.options.remove_kind.rectangle'), '0x04'], [t('dfr0997.options.remove_kind.circle'), '0x06'],
                            [t('dfr0997.options.remove_kind.triangle'), '0x07'], [t('dfr0997.options.remove_kind.slider'), '0x0C'], [t('dfr0997.options.remove_kind.progress_bar'), '0x0A'],
                            [t('dfr0997.options.remove_kind.compass'), '0x0E'], [t('dfr0997.options.remove_kind.gauge'), '0x12'], [t('dfr0997.options.remove_kind.line_meter'), '0x10'],
                            [t('dfr0997.options.remove_kind.chart'), '0x14']]),
                        number('ID', 1)],
                        code: 'dfr0997.remove({KIND}, {ID})'
                    }
                ];
            })()
        },
        {
            id: 'tpbot',
            name: 'TPBot',
            description: t('tpbot.description'),
            image: 'tpbot.webp',
            logo: 'elecfreaks_logo.webp',
            style: 'robots_category',
            svgIcon: 'tpbot_subcategory',
            tags: ['robotics', 'sensors', 'actuators', 'lights'],
            blocks: [
                {
                    name: 'wheels', kind: 'statement', text: t('tpbot.blocks.wheels'),
                    args: [number('L', 50), number('R', 50)], code: 'tpbot.set_wheels({L}, {R})'
                },
                { name: 'stop', kind: 'statement', text: t('tpbot.blocks.stop'), code: 'tpbot.stop()' },
                {
                    name: 'track', kind: 'boolean', text: t('tpbot.blocks.track'),
                    args: [dropdown('SIDE', [[t('tpbot.options.side.left'), '0'], [t('tpbot.options.side.right'), '1']]),
                        dropdown('STATE', [[t('tpbot.options.state.black'), '0'], [t('tpbot.options.state.white'), '1']])],
                    code: 'tpbot.track({SIDE}) == {STATE}'
                },
                {
                    name: 'distance', kind: 'number', text: t('tpbot.blocks.distance'),
                    args: [dropdown('UNIT', [['cm', "'cm'"], [t('tpbot.options.unit.inch'), "'inch'"]])], code: 'tpbot.distance({UNIT})'
                },
                {
                    name: 'headlights_colour', kind: 'statement', text: t('tpbot.blocks.headlights_colour'),
                    args: [{ name: 'C', type: 'colour', default: '#ff0000' }], code: 'tpbot.headlights({C})'
                },
                {
                    name: 'headlights_rgb', kind: 'statement', text: t('tpbot.blocks.headlights_rgb'),
                    args: RGB_ARGS, code: 'tpbot.headlights(({R}, {G}, {B}))'
                },
                { name: 'headlights_off', kind: 'statement', text: t('tpbot.blocks.headlights_off'), code: 'tpbot.headlights((0, 0, 0))' },
                {
                    name: 'servo', kind: 'statement', text: t('tpbot.blocks.servo'),
                    args: [dropdown('S', ['1', '2', '3', '4']), number('ANGLE', 90)], code: 'tpbot.servo({S}, {ANGLE})'
                }
            ]
        },
        {
            id: 'tinybit',
            name: 'Tiny:bit',
            description: t('tinybit.description'),
            image: 'tinybit.webp',
            logo: 'yahboom_logo.webp',
            style: 'robots_category',
            svgIcon: 'tinybit_subcategory',
            tags: ['robotics', 'sensors', 'actuators', 'lights'],
            blocks: (() => {
                const SIDES = [[t('tinybit.options.side.left'), '0'], [t('tinybit.options.side.right'), '1']];
                const LEDS = [[t('tinybit.options.led.both'), '2'], [t('tinybit.options.led.left'), '0'], [t('tinybit.options.led.right'), '1']];
                const TURNS = (prefix) => [[t('tinybit.options.side.left'), prefix + '_left'], [t('tinybit.options.side.right'), prefix + '_right']];
                const MELODIES = ['DADADADUM', 'ENTERTAINER', 'PRELUDE', 'ODE', 'NYAN', 'RINGTONE', 'FUNK', 'BLUES', 'BIRTHDAY', 'WEDDING',
                    'FUNERAL', 'PUNCHLINE', 'BADDY', 'CHASE', 'BA_DING', 'WAWAWAWAA', 'JUMP_UP', 'JUMP_DOWN', 'POWER_UP', 'POWER_DOWN'];
                // Codes of the Yahboom remote.
                const KEYS = [[t('tinybit.options.key.power'), '0x00'], [t('tinybit.options.key.up'), '0x01'], [t('tinybit.options.key.light'), '0x02'],
                    [t('tinybit.options.key.left'), '0x04'], [t('tinybit.options.key.buzzer'), '0x05'], [t('tinybit.options.key.right'), '0x06'],
                    [t('tinybit.options.key.spin_left'), '0x08'], [t('tinybit.options.key.down'), '0x09'], [t('tinybit.options.key.spin_right'), '0x0A'],
                    ['+', '0x0C'], ['-', '0x0E'], ['0', '0x0D'], ['1', '0x10'], ['2', '0x11'], ['3', '0x12'], ['4', '0x14'], ['5', '0x15'],
                    ['6', '0x16'], ['7', '0x18'], ['8', '0x19'], ['9', '0x1A']];
                return [
                    {
                        name: 'go', kind: 'statement', text: t('tinybit.blocks.go'),
                        args: [dropdown('DIR', [[t('tinybit.options.direction.forward'), 'go_forward'], [t('tinybit.options.direction.backward'), 'go_backward']]),
                            number('SPEED', 150)],
                        code: 'tinybit.{DIR}({SPEED})'
                    },
                    {
                        name: 'turn', kind: 'statement', text: t('tinybit.blocks.turn'),
                        args: [dropdown('DIR', TURNS('turn')), number('SPEED', 150)], code: 'tinybit.{DIR}({SPEED})'
                    },
                    {
                        name: 'spin', kind: 'statement', text: t('tinybit.blocks.spin'),
                        args: [dropdown('DIR', TURNS('spin')), number('SPEED', 150)], code: 'tinybit.{DIR}({SPEED})'
                    },
                    {
                        name: 'motor', kind: 'statement', text: t('tinybit.blocks.motor'),
                        args: [dropdown('MOTOR', [[t('tinybit.options.led.both'), '3'], [t('tinybit.options.side.left'), '1'], [t('tinybit.options.side.right'), '2']]),
                            dropdown('DIR', [[t('tinybit.options.direction.forward'), '1'], [t('tinybit.options.direction.backward'), '2']]),
                            number('SPEED', 150)],
                        code: 'tinybit.set_motor({MOTOR}, {DIR}, {SPEED})'
                    },
                    {
                        name: 'wheels', kind: 'statement', text: t('tinybit.blocks.wheels'),
                        args: [number('L', 150), number('R', 150)], code: 'tinybit.set_motors_speed({L}, {R})'
                    },
                    {
                        name: 'follow_line', kind: 'statement', text: t('tinybit.blocks.follow_line'),
                        args: [number('SPEED', 80)], code: 'tinybit.follow_line({SPEED})'
                    },
                    { name: 'stop', kind: 'statement', text: t('tinybit.blocks.stop'), code: 'tinybit.stop()' },
                    {
                        name: 'track', kind: 'boolean', text: t('tinybit.blocks.track'),
                        args: [dropdown('SIDE', SIDES), dropdown('STATE', [[t('tinybit.options.state.black'), '1'], [t('tinybit.options.state.white'), '0']])],
                        code: 'tinybit.track({SIDE}) == {STATE}'
                    },
                    { name: 'tracking_state', kind: 'number', text: t('tinybit.blocks.tracking_state'), code: 'tinybit.get_tracking_state()' },
                    { name: 'distance', kind: 'number', text: t('tinybit.blocks.distance'), code: 'tinybit.get_distance()' },
                    { name: 'sound', kind: 'number', text: t('tinybit.blocks.sound'), code: 'tinybit.get_sound()' },
                    {
                        name: 'headlights_colour', kind: 'statement', text: t('tinybit.blocks.headlights_colour'),
                        args: [{ name: 'C', type: 'colour', default: '#ff0000' }], code: 'tinybit.set_headlights({C})'
                    },
                    {
                        name: 'headlights_rgb', kind: 'statement', text: t('tinybit.blocks.headlights_rgb'),
                        args: RGB_ARGS, code: 'tinybit.set_headlights(({R}, {G}, {B}))'
                    },
                    { name: 'headlights_off', kind: 'statement', text: t('tinybit.blocks.headlights_off'), code: 'tinybit.set_headlights((0, 0, 0))' },
                    {
                        name: 'leds_colour', kind: 'statement', text: t('tinybit.blocks.leds_colour'),
                        args: [dropdown('LED', LEDS), { name: 'C', type: 'colour', default: '#00ff00' }], code: 'tinybit.set_neopixel({LED}, {C})'
                    },
                    {
                        name: 'leds_rgb', kind: 'statement', text: t('tinybit.blocks.leds_rgb'),
                        args: [dropdown('LED', LEDS), ...RGB_ARGS], code: 'tinybit.set_neopixel({LED}, ({R}, {G}, {B}))'
                    },
                    { name: 'leds_off', kind: 'statement', text: t('tinybit.blocks.leds_off'), code: 'tinybit.set_neopixel(2, (0, 0, 0))' },
                    {
                        name: 'tone', kind: 'statement', text: t('tinybit.blocks.tone'),
                        args: [number('F', 440), number('T', 500)], code: 'music.pitch({F}, {T}, tinybit.BUZZER)'
                    },
                    {
                        name: 'melody', kind: 'statement', text: t('tinybit.blocks.melody'),
                        args: [dropdown('M', MELODIES.map(name => [name.replace(/_/g, ' ').toLowerCase(), 'music.' + name]))], code: 'music.play({M}, tinybit.BUZZER)'
                    },
                    { name: 'ir_read', kind: 'statement', text: t('tinybit.blocks.ir_read'), code: 'tinybit.ir_read()' },
                    {
                        name: 'ir_key', kind: 'boolean', text: t('tinybit.blocks.ir_key'),
                        args: [dropdown('KEY', KEYS)], code: 'tinybit.ir_code() == {KEY}'
                    },
                    { name: 'ir_code', kind: 'number', text: t('tinybit.blocks.ir_code'), code: 'tinybit.ir_code()' }
                ];
            })()
        },
        // Blocks of the interface moved from its toolbox categories (their generators are kept).
        legacy('kitronik_zip_halo', 'Kitronik ZIP Halo HD', 'kitronik_zip_halo.webp', ['display', 'lights'], 'display_category', 'display_kitronik_subcategory', [
            { blocks: [
                'display_controlColorZipHaloLed',
                'display_controlZipHaloLed',
                'display_ZipHaloLed_controlAllLedPalette',
                'display_ZipHaloLed_controlAllLedRGB',
                'display_ZipHaloLed_rainbow'
            ] }
        ], 'kitronik_logo.webp'),
        legacy('uart', 'UART', 'uart.webp', ['communication'], 'communication_category', null, [
            { blocks: [
                'communication_serialInit',
                'communication_serialRedirectUSB',
                'communication_uart_writeData',
                'communication_uart_isDataAvailable',
                'communication_uart_readData',
                'communication_uart_readLineData'
            ] }
        ]),
        legacy('i2c', 'I2C', 'i2c.webp', ['communication'], 'communication_category', null, [
            { blocks: [
                'communication_i2c_init',
                'communication_i2c_scan',
                'communication_i2c_read',
                'communication_i2c_write'
            ] }
        ]),
        legacy('envirobit', 'Enviro:bit', 'envirobit.webp', ['sensors'], 'sensors_category', null, [
            { blocks: [
                'sensors_envirobit_tcs3472_getRGB',
                'sensors_envirobit_tcs3472_getBrightness',
                'sensors_envirobit_tcs3472_setLED',
                'sensors_envirobit_bme280_getData',
                'sensors_envirobit_getSoundLevel',
                'sensors_envirobit_waitForClaps'
            ] }
        ], 'pimoroni_logo.webp'),
        legacy('weatherbit', 'Weather:bit', 'weatherbit.webp', ['sensors'], 'sensors_category', null, [
            { blocks: [
                'sensors_weatherbit_bme280_getData',
                'sensors_weatherbit_anemometer_getSpeed',
                'sensors_weatherbit_weathercock_getDirection',
                'sensors_weatherbit_rainGauge_getDumps',
                'sensors_weatherbit_getSoilMoisture'
            ] }
        ], 'sparkfun_logo.webp'),
        legacy('kitronik_env', { msg: 'SUBCATEGORY_SHORT_KITRONIK_ENV' }, 'kitronik_env.webp', ['sensors', 'actuators'], 'sensors_category', 'sensors_kitronik_env_subcategory', [
            { blocks: [
                'sensors_kitronik_bme280_getData',
                'sensors_kitronik_klimate_bme280_getData',
                'actuators_kitronik_playFrequency'
            ] }
        ], 'kitronik_logo.webp'),
        legacy('accessbit', 'ACCESS:bit', 'accessbit.webp', ['actuators'], 'actuators_category', 'actuators_kitronik_subcategory', [
            { blocks: [
                'actuators_controlAccessBitBarrier',
                'actuators_controlAccessBitBuzzer'
            ] }
        ], 'kitronik_logo.webp'),
        legacy('kitronik_motors', 'Kitronik Motors', 'kitronik_motors.webp', ['actuators'], 'actuators_category', 'actuators_kitronik_subcategory', [
            { blocks: [
                'actuators_kitronik_controlMotor',
                'actuators_kitronik_stopMotor'
            ] }
        ], 'kitronik_logo.webp'),
        { ...legacy('rekabit', 'Reka:Bit', 'rekabit.webp', ['actuators'], 'actuators_category', null, [
            { blocks: [
                'actuators_rekabit_runMotor',
                'actuators_rekabit_setServoPosition'
            ] }
        ]), logo: 'cytron_logo.webp' },
        { ...legacy('microdriver', { msg: 'SUBCATEGORY_SHORT_MICRODRIVER' }, 'microdriver.webp', ['actuators'], 'actuators_category', null, [
            { blocks: [
                'actuators_dfr0548_setServoAngle',
                'actuators_dfr0548_runMotor',
                'actuators_dfr0548_stopMotor',
                'actuators_dfr0548_stepper',
                'actuators_dfr0548_stepperDual'
            ] }
        ]), logo: 'dfrobot_logo.webp' },
        legacy('cutebot', 'Cutebot', 'cutebot.webp', ['robotics'], 'robots_category', 'cutebot_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_getCutebotUltrasonicRanger',
                    'robots_readCutebotPatrol'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_setCutebotGo',
                    'robots_setCutebotTurn',
                    'robots_controlCutebotMotors',
                    'robots_setCutebotStop',
                    'robots_moveCutebotOneSquareForward',
                    'robots_moveCutebotOneSquareBackward',
                    'robots_turnCutebotLeft',
                    'robots_turnCutebotRight'
                ] },
                { label: '%{BKY_SUBCATEGORY_CONTROL}', blocks: [
                    'robots_setCutebotBuzzer',
                    'robots_playCutebotMusic',
                    'robots_setCutebotServoAngle'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED}', blocks: [
                    'robots_blinkCutebotRobot',
                    'robots_controlCutebotRGBLedPalette',
                    'robots_controlCutebotRGBLed',
                    'robots_setCutebotNeopixelPalette',
                    'robots_setCutebotNeopixel'
                ] },
                { label: '%{BKY_SUBCATEGORY_REMOTE_CONTROL}', blocks: [
                    'robots_cutebot_onRemoteCommandReceived',
                    'robots_cutebot_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeCutebotIRreceiver',
                    'robots_getCutebotIRcode'
                ] }
            ], 'elecfreaks_logo.webp'),
        legacy('cutebot_pro', 'Cutebot Pro', 'cutebot_pro.webp', ['robotics'], 'robots_category', 'cutebotpro_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_CutebotPro_getUltrasonicDistance',
                    'robots_CutebotPro_getLineState',
                    'robots_CutebotPro_isSpecificState',
                    'robots_CutebotPro_getLineOffset',
                    'robots_CutebotPro_isSensorAboveLine',
                    'robots_getGrayscaleTrackingValue',
                    'robots_CutebotPro_readVersion'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_CutebotPro_setGo',
                    'robots_CutebotPro_turn',
                    'robots_CutebotPro_stop',
                    'robots_CutebotPro_controlMotors',
                    'robots_CutebotPro_getMotorSpeed',
                    'robots_CutebotPro_getAngularDistance',
                    'robots_CutebotPro_initializeAngularDistance'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED}', blocks: [
                    'robots_CutebotPro_controlHeadlightsPalette',
                    'robots_CutebotPro_controlHeadlights',
                    'robots_CutebotPro_switchOffHeadlights',
                    'robots_CutebotPro_setNeopixelPalette',
                    'robots_CutebotPro_setNeopixel',
                    'robots_CutebotPro_switchOffNeopixel'
                ] },
                { label: '%{BKY_SUBCATEGORY_PID}', blocks: [
                    'robots_CutebotPro_runWithSpeed',
                    'robots_CutebotPro_setMotorsSpeed',
                    'robots_CutebotPro_runWithRadius',
                    'robots_CutebotPro_runDistance',
                    'robots_CutebotPro_turnWithAngle',
                    'robots_CutebotPro_defineSquare',
                    'robots_CutebotPro_runSquare',
                    'robots_CutebotPro_placeWithAngle',
                    'robots_CutebotPro_turnWheel',
                    'robots_CutebotPro_computePD'
                ] },
                { label: '%{BKY_SUBCATEGORY_SERVOMOTORS}', blocks: [
                    'robots_CutebotPro_setServoAngle',
                    'robots_CutebotPro_setServoSpeed'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOTOR_PORT}', blocks: [
                    'robots_CutebotPro_setExtendedMotorSpeed',
                    'robots_CutebotPro_stopExtendedMotor'
                ] },
                { label: '%{BKY_SUBCATEGORY_REMOTE_CONTROL}', blocks: [
                    'robots_CutebotPro_onRemoteCommandReceived',
                    'robots_CutebotPro_onRemoteCommandReceived_car_mp3_gray',
                    'robots_CutebotPro_decodeIRreceiver',
                    'robots_CutebotPro_getIRcode'
                ] }
            ], 'elecfreaks_logo.webp'),
        legacy('maqueen', 'Maqueen', 'maqueen.webp', ['robotics'], 'robots_category', 'maqueen_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_getMaqueenUltrasonicRanger',
                    'robots_readMaqueenPatrol',
                    'robots_maqueenV5_readPatrol',
                    'robots_maqueenV5_batteryLevel'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_setMaqueenGo',
                    'robots_rotateMaqueen',
                    'robots_controlMaqueenMotor',
                    'robots_stopMaqueenMotors',
                    'robots_moveOneSquareForward',
                    'robots_moveOneSquareBackward',
                    'robots_turnLeft',
                    'robots_turnRight',
                    'robots_stopRobot'
                ] },
                { label: '%{BKY_SUBCATEGORY_CONTROL}', blocks: [
                    'robots_controlMaqueenLed',
                    'robots_setMaqueenBuzzer',
                    'robots_playMaqueenMusic',
                    'robots_setMaqueenServoAngle',
                    'robots_maqueenV5_patrolling'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED}', blocks: [
                    'robots_blinkRobot',
                    'robots_setMaqueenNeopixelPalette',
                    'robots_setMaqueenNeopixel',
                    'robots_setMaqueenRainbow'
                ] },
                { label: '%{BKY_SUBCATEGORY_REMOTE_CONTROL}', blocks: [
                    'robots_maqueen_onRemoteCommandReceived',
                    'robots_maqueen_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeMaqueenIRreceiver',
                    'robots_getMaqueenIRcode'
                ] }
            ], 'dfrobot_logo.webp'),
        legacy('maqueen_plus', 'Maqueen Plus', 'maqueen_plus.webp', ['robotics'], 'robots_category', 'maqueen-plus_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_getMaqueenPlusUltrasonicRangerTrigEcho',
                    'robots_getMaqueenPlusV2UltrasonicRanger',
                    'robots_readMaqueenPlusPatrol',
                    'robots_maqueenPlusV3_readLightIntensity'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_setMaqueenPlusGo',
                    'robots_rotateMaqueenPlus',
                    'robots_controlMaqueenPlusMotor',
                    'robots_stopMaqueenPlusMotors'
                ] },
                { label: '%{BKY_SUBCATEGORY_CONTROL}', blocks: [
                    'robots_controlMaqueenPlusLed',
                    'robots_maqueenPlusV3_setRGBLed',
                    'robots_setMaqueenPlusBuzzer',
                    'robots_setMaqueenPlusServoAngle'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED} (V2 & V3)', blocks: [
                    'robots_maqueenPlusBlinkRobot',
                    'robots_setMaqueenPlusNeopixelPalette',
                    'robots_setMaqueenPlusNeopixel',
                    'robots_setMaqueenPlusRainbow'
                ] },
                { label: '%{BKY_SUBCATEGORY_REMOTE_CONTROL}', blocks: [
                    'robots_maqueenPlus_onRemoteCommandReceived',
                    'robots_maqueenPlus_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeMaqueenPlusIRreceiver',
                    'robots_getMaqueenPlusIRcode'
                ] },
                { label: '%{BKY_SUBCATEGORY_LINE_FINDER} (V3)', blocks: [
                    'robots_maqueenPlusV3_setPatrolSpeed',
                    'robots_maqueenPlusV3_setIntersectionRunMode',
                    'robots_maqueenPlusV3_setLeftOrRightIntersectionRunMode',
                    'robots_maqueenPlusV3_setPatrollingState',
                    'robots_maqueenPlusV3_intersectionDetected',
                    'robots_maqueenPlusV3_intersectionDetectedIs'
                ] },
                { label: '%{BKY_SUBCATEGORY_PID} (V3)', blocks: [
                    'robots_maqueenPlusV3_runDistance',
                    'robots_maqueenPlusV3_turnWithAngle',
                    'robots_maqueenPlusV3_readRealTimeSpeed',
                    'robots_maqueenPlusV3_stopPID'
                ] },
                { label: '%{BKY_SUBCATEGORY_LIDAR} (V3)', blocks: [
                    'robots_maqueenPlusV3_lidar_configMatrix',
                    'robots_maqueenPlusV3_lidar_getData',
                    'robots_maqueenPlusV3_lidar_getFixedPoint',
                    'robots_maqueenPlusV3_lidar_configAvoidance',
                    'robots_maqueenPlusV3_lidar_isSignalActivated',
                    'robots_maqueenPlusV3_lidar_dirToFollow',
                    'robots_maqueenPlusV3_lidar_isDirToFollow',
                    'robots_maqueenPlusV3_lidar_getObstacleDistance'
                ] }
            ], 'dfrobot_logo.webp'),
        legacy('bitcar', 'BitCar', 'bitcar.webp', ['robotics'], 'robots_category', 'bitcar_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_getBitCarUltrasonicRanger',
                    'robots_readBitCarPatrol'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_setBitCarGo',
                    'robots_rotateBitCar',
                    'robots_controlBitCarMotor',
                    'robots_stopBitCarMotors'
                ] },
                { label: '%{BKY_SUBCATEGORY_CONTROL}', blocks: [
                    'robots_setBitCarBuzzer'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED}', blocks: [
                    'robots_setBitCarNeopixelPalette',
                    'robots_setBitCarNeopixel',
                    'robots_setBitCarRainbow'
                ] },
                { label: '%{BKY_SUBCATEGORY_REMOTE_CONTROL}', blocks: [
                    'robots_bitcar_onRemoteCommandReceived',
                    'robots_bitcar_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeBitCarIRreceiver',
                    'robots_getBitCarIRcode'
                ] }
            ], 'tinkergen_logo.webp'),
        legacy('kitrobot', 'Kitro:bot v2', 'kitrobot.webp', ['robotics'], 'robots_category', 'kitrobot_subcategory', [
                { label: '%{BKY_SUBCATEGORY_DETECTION}', blocks: [
                    'robots_getKitrobotUltrasonicRanger',
                    'robots_readKitrobotPatrol'
                ] },
                { label: '%{BKY_SUBCATEGORY_MOVING}', blocks: [
                    'robots_setKitrobotGo',
                    'robots_rotateKitrobot',
                    'robots_controlKitrobotMotor',
                    'robots_stopKitrobotMotors',
                    'robots_kitrobotMoveOneSquareForward',
                    'robots_kitrobotMoveOneSquareBackward',
                    'robots_kitrobotTurnLeft',
                    'robots_kitrobotTurnRight',
                    'robots_kitrobotStopRobot'
                ] },
                { label: '%{BKY_SUBCATEGORY_CONTROL}', blocks: [
                    'robots_setKitrobotBuzzer'
                ] },
                { label: '%{BKY_SUBCATEGORY_RGB_LED}', blocks: [
                    'robots_kitrobotBlinkRobot',
                    'robots_setKitrobotNeopixelPalette',
                    'robots_setKitrobotNeopixel',
                    'robots_setKitrobotRainbow'
                ] }
            ], 'technologie_services_logo.webp'),
        legacy('codo', 'Codok', 'codok.webp', ['robotics'], 'robots_category', 'codo_subcategory', [
                { blocks: [
                    'robots_setCodoGo',
                    'robots_setCodoTurn',
                    'robots_setCodoStop',
                    'robots_controlCodoMotors'
                ] }
            ], 'a4_logo.webp'),
        legacy('oobybot', 'Oobybot', 'oobybot.webp', ['robotics'], 'robots_category', 'oobybot_subcategory', [
                { blocks: [
                    'robots_controlOobybotLed',
                    'robots_setOobybotGo',
                    'robots_setOobybotTurn',
                    'robots_setOobybotStop',
                    'robots_controlOobybotMotors'
                ] }
            ], 'i2form_logo.webp'),
        legacy('buggy', 'Buggy', 'buggy.webp', ['robotics'], 'robots_category', 'buggy_subcategory', [
                { blocks: [
                    'robots_setBuggyGo',
                    'robots_setBuggyTurn',
                    'robots_setBuggyStop',
                    'robots_controlBuggyMotors'
                ] }
            ], 'kitronik_logo.webp'),
        legacy('bitbot', 'Bit:Bot', 'bitbot.webp', ['robotics'], 'robots_category', 'bitbot_subcategory', [
                { blocks: [
                    'robots_readBitBotLightSensor',
                    'robots_readBitBotPatrol',
                    'robots_setBitbotGo',
                    'robots_controlBitBotMotor',
                    'robots_stopBitBotMotors',
                    'robots_setBitBotNeopixelPalette',
                    'robots_setBitBotNeopixel',
                    'robots_setBitBotRainbow'
                ] }
            ], '4tronix_logo.webp'),
        legacy('gamepad', 'Gamepad', 'gamepad.webp', ['robotics'], 'robots_category', 'gamepad_subcategory', [
                { label: 'BitPlayer', blocks: [
                    'robots_onBitPlayerButtonEvent',
                    'robots_getBitPlayerJoystick'
                ] },
                { label: '%{BKY_SUBCATEGORY_GAMEPAD} V4', blocks: [
                    'robots_onGamepadV4ButtonEvent',
                    'robots_getGamepadV4Joystick',
                    'robots_setGamepadV4LEDMotor'
                ] },
                { label: 'Joystick:bit V2', blocks: [
                    'robots_onJoystickBitV2ButtonEvent',
                    'robots_getJoystickBitV2Axis',
                    'robots_setJoystickBitV2BuzzerFreq',
                    'robots_setJoystickBitV2MotorVibration'
                ] },
                { label: '%{BKY_SUBCATEGORY_GAMEPAD}', blocks: [
                    'robots_onGamepadButtonEvent',
                    'robots_setGamepadLED',
                    'robots_setGamepadMotorVibration',
                    'robots_setGamepadBuzzerFreq',
                    'robots_playGamepadMusic'
                ] }
            ], 'dfrobot_logo.webp'),
        legacy('uhandbit', 'uHandbit', 'uhandbit.webp', ['robotics'], 'robots_category', 'uhandbit_subcategory', [
                { blocks: [
                    'robots_uhandbit_controlServo',
                    'robots_uhandbit_colorSensor_read_rgb',
                    'robots_uhandbit_colorSensor_get_color',
                    'robots_uhandbit_ultrasonic_get_distance',
                    'robots_uhandbit_setNeopixelPalette',
                    'robots_uhandbit_setNeopixel',
                    'robots_uhandbit_setNeopixelRainbow'
                ] }
            ], 'hiwonder_logo.webp'),
        legacy('wukong', 'Wonder Building Kit - WuKong', 'wukong.webp', ['robotics'], 'robots_category', 'wukong_subcategory', [
                { blocks: [
                    'robots_wukong_setLightMode',
                    'robots_wukong_setLightIntensity',
                    'robots_wukong_controlMotors',
                    'robots_wukong_stopMotors',
                    'robots_wukong_setServoAngle',
                    'robots_wukong_setServoSpeed'
                ] }
            ], 'elecfreaks_logo.webp'),
        legacy('superbit', 'Building:bit Super', 'superbit.webp', ['robotics'], 'robots_category', 'superbit_subcategory', [
                { label: '%{BKY_SUBCATEGORY_SUPERBIT_BASIC}', blocks: [
                    'robots_buildingBit_setNeopixel',
                    'robots_buildingBit_setNeopixelPalette',
                    'robots_buildingBit_setServoAngle',
                    'robots_buildingBit_controlMotors',
                    'robots_buildingBit_stopMotors',
                    'robots_buildingBit_controlStepperMotors'
                ] },
                { label: '%{BKY_SUBCATEGORY_SUPERBIT_SENSORS}', blocks: [
                    'robots_buildingBit_getUltrasonicDistance',
                    'robots_buildingBit_getPotentiometerValue',
                    'robots_buildingBit_getLightLevel',
                    'robots_buildingBit_isObstacleDetected',
                    'robots_buildingBit_getPIRstate',
                    'robots_buildingBit_dht11_redData',
                    'robots_buildingBit_getColor',
                    'robots_buildingBitonJoystickDir'
                ] }
            ], 'yahboom_logo.webp'),
        legacy('tello', 'Tello', 'tello.webp', ['robotics'], 'tello_category', 'tello_tello_subcategory', [
                { label: '%{BKY_SUBCATEGORY_SHORT_TELLO_BASICS}', blocks: [
                    'drone_init',
                    'tello_takeoff',
                    'tello_land',
                    'tello_emergency',
                    'tello_stop'
                ] },
                { label: '%{BKY_SUBCATEGORY_SHORT_TELLO_COMMANDS}', blocks: [
                    'tello_flip',
                    'tello_move_up_down',
                    'tello_move',
                    'tello_rectangle_form',
                    'tello_square_form',
                    'tello_rotate',
                    'tello_go',
                    'tello_stream_on',
                    'tello_stream_off'
                ] },
                { label: '%{BKY_SUBCATEGORY_SHORT_TELLO_DATA}', blocks: [
                    'tello_speed',
                    'tello_battery',
                    'tello_flight_time'
                ] }
            ], 'dji_logo.webp')
    ];
    // Each block imports the modules (A4, DFR0997, TPBot, Tiny:bit, music) used by its code.
    for (const block of catalog.flatMap(ext => ext.blocks || [])) {
        block.args = block.args || [];
        block.imports = [...new Set(block.code.match(/\b(?:a4_\w+|dfr0997|tpbot|tinybit|music)(?=\.)/g))].map(module => 'import ' + module).join('\n');
        // Like the other robots, the docstring starts the robot simulator (CODE_REGEXP of Robots.TPBot and Robots.Tinybit).
        if (block.imports.includes('import tpbot')) block.imports = '""" TPBot robot """\n' + block.imports;
        if (block.imports.includes('import tinybit')) block.imports = '""" Tiny:bit robot """\n' + block.imports;
    }
    return catalog;
})();
