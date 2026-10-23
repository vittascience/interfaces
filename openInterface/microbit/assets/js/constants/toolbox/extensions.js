/**
 * Catalog of the block extensions of the micro:bit interface (format described in BlockExtensions.js).
 * The A4 Technologie microSySTEM blocks are ported from their MakeCode extensions (github.com/A4-TECHNOLOGIE),
 * their Python libraries are in assets/lib/a4. The block names are saved in the projects: never rename them.
 * The texts are i18n keys of code.blockExtensions.catalog (public/content/lang/<lang>/ns.json).
 */
const BLOCK_EXTENSIONS_CATALOG = (() => {
    const t = (key) => ({ i18n: 'catalog.' + key });
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

    const catalog = [
        {
            id: 'a4_access',
            name: 'Access microSySTEM',
            description: t('a4_access.description'),
            image: 'a4_access.jpg',
            logo: 'a4_logo.png',
            colour: '#00838F',
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
            image: 'a4_parking.jpg',
            logo: 'a4_logo.png',
            colour: '#0FBC11',
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
            image: 'a4_barrier.jpg',
            logo: 'a4_logo.png',
            colour: '#F29C00',
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
            image: 'a4_weight.jpg',
            logo: 'a4_logo.png',
            colour: '#F2B705',
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
            image: 'a4_shifumi.jpg',
            logo: 'a4_logo.png',
            colour: '#003CFF',
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
            image: 'a4_ai_vision.jpg',
            logo: 'a4_logo.png',
            colour: '#5B3FE8',
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
            image: 'dfr0997.jpg',
            logo: 'dfrobot_logo.png',
            colour: '#E8601C',
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
        }
    ];
    // Each block imports the modules (A4, DFR0997) used by its code.
    for (const block of catalog.flatMap(ext => ext.blocks)) {
        block.args = block.args || [];
        block.imports = [...new Set(block.code.match(/\b(?:a4_\w+|dfr0997)(?=\.)/g))].map(module => 'import ' + module).join('\n');
    }
    return catalog;
})();
