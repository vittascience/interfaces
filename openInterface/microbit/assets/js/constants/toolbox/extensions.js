/**
 * Catalog of the block extensions of the micro:bit interface (format described in BlockExtensions.js).
 * The A4 Technologie microSySTEM blocks are ported from their MakeCode extensions (github.com/A4-TECHNOLOGIE),
 * their Python libraries are in assets/lib/a4. The block names are saved in the projects: never rename them.
 */
const BLOCK_EXTENSIONS_CATALOG = (() => {
    const COLOURS = {
        red: [{ fr: 'rouge', en: 'red' }, 255, 0, 0],
        green: [{ fr: 'vert', en: 'green' }, 0, 255, 0],
        blue: [{ fr: 'bleu', en: 'blue' }, 0, 0, 255],
        yellow: [{ fr: 'jaune', en: 'yellow' }, 255, 255, 0],
        cyan: [{ fr: 'cyan', en: 'cyan' }, 0, 255, 255],
        magenta: [{ fr: 'magenta', en: 'magenta' }, 255, 0, 255],
        orange: [{ fr: 'orange', en: 'orange' }, 255, 80, 0],
        purple: [{ fr: 'violet', en: 'purple' }, 120, 0, 255],
        white: [{ fr: 'blanc', en: 'white' }, 255, 255, 255],
        off: [{ fr: 'éteint', en: 'off' }, 0, 0, 0],
        black: [{ fr: 'noir', en: 'black' }, 0, 0, 0]
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
        { name: 'battery', kind: 'number', text: { fr: 'niveau de batterie (%)', en: 'battery level (%)' }, code: 'a4_board.battery()' },
        {
            name: 'leds_colour', kind: 'statement', text: { fr: 'mettre RGB0 en {C0} et RGB1 en {C1}', en: 'set RGB0 to {C0} and RGB1 to {C1}' },
            args: [lightColour('C0'), lightColour('C1')], code: 'a4_board.set_leds({C0}, {C1})'
        },
        {
            name: 'leds_rgb', kind: 'statement',
            text: { fr: 'mettre RGB0 en R {R0} V {G0} B {B0} et RGB1 en R {R1} V {G1} B {B1}', en: 'set RGB0 to R {R0} G {G0} B {B0} and RGB1 to R {R1} G {G1} B {B1}' },
            args: [number('R0', 255), number('G0', 0), number('B0', 0), number('R1', 0), number('G1', 0), number('B1', 255)],
            code: 'a4_board.set_leds(({R0}, {G0}, {B0}), ({R1}, {G1}, {B1}))'
        },
        {
            name: 'leds_brightness', kind: 'statement', text: { fr: 'régler la luminosité RGB à {B} (0-255)', en: 'set RGB brightness to {B} (0-255)' },
            args: [number('B', 255)], code: 'a4_board.set_brightness({B})'
        },
        { name: 'leds_off', kind: 'statement', text: { fr: 'éteindre les LED RGB', en: 'turn off RGB LEDs' }, code: 'a4_board.set_leds((0, 0, 0), (0, 0, 0))' }
    ];

    const screenBlocks = (initBlock) => [
        initBlock,
        { name: 'screen_clear', kind: 'statement', text: { fr: 'écran effacer tout', en: 'screen clear all' }, code: 'a4_screen.clear()' },
        {
            name: 'screen_background', kind: 'statement', text: { fr: 'écran définir couleur de fond {C}', en: 'screen set background colour {C}' },
            args: [screenColour('C')], code: 'a4_screen.background_color({C})'
        },
        {
            name: 'screen_background_image', kind: 'statement', text: { fr: 'écran définir image de fond {NAME}', en: 'screen set background image {NAME}' },
            args: [text('NAME')], code: 'a4_screen.background_image({NAME})'
        },
        {
            name: 'screen_text', kind: 'statement',
            text: { fr: 'écran afficher texte {TEXT} numéro {ID} position x {X} y {Y} taille {SIZE} couleur {C}', en: 'screen show text {TEXT} id {ID} at x {X} y {Y} size {SIZE} colour {C}' },
            args: [text('TEXT', 'Bonjour'), number('ID', 1), number('X', 120), number('Y', 120),
                dropdown('SIZE', [[{ fr: 'grande', en: 'large' }, '1'], [{ fr: 'petite', en: 'small' }, '2']]), screenColour('C')],
            code: 'a4_screen.text({TEXT}, {ID}, {X}, {Y}, {SIZE}, {C})'
        },
        {
            name: 'screen_image', kind: 'statement',
            text: { fr: 'écran afficher image numéro {ID} nom {NAME} position x {X} y {Y} taille {ZOOM}', en: 'screen show image id {ID} name {NAME} at x {X} y {Y} size {ZOOM}' },
            args: [number('ID', 1), text('NAME'), number('X', 120), number('Y', 120), number('ZOOM', 256)],
            code: 'a4_screen.image({ID}, {NAME}, {X}, {Y}, {ZOOM})'
        },
        {
            name: 'screen_rotate', kind: 'statement', text: { fr: 'écran rotation image numéro {ID} angle {ANGLE}', en: 'screen rotate image id {ID} angle {ANGLE}' },
            args: [number('ID', 1), number('ANGLE', 180)], code: 'a4_screen.rotate_image({ID}, {ANGLE})'
        },
        {
            name: 'screen_remove', kind: 'statement', text: { fr: 'écran supprimer {KIND} numéro {ID}', en: 'screen remove {KIND} id {ID}' },
            args: [dropdown('KIND', [[{ fr: 'texte', en: 'text' }, '0x18'], [{ fr: 'image', en: 'image' }, '0x08']]), number('ID', 1)],
            code: 'a4_screen.remove({KIND}, {ID})'
        }
    ];
    const SCREEN_I2C_INIT = { name: 'screen_init', kind: 'statement', text: { fr: 'écran initialiser en I2C', en: 'screen initialize in I2C' }, code: 'a4_screen.init_i2c()' };

    const catalog = [
        {
            id: 'a4_access',
            name: 'Access microSySTEM',
            description: {
                fr: 'Contrôle d’accès d’un bâtiment : un clavier capacitif déverrouille une porte à ventouse magnétique.',
                en: 'Building access control: a capacitive keypad unlocks a door held by a magnetic lock.'
            },
            image: 'a4_access.jpg',
            logo: 'a4_logo.png',
            colour: '#00838F',
            blocks: [
                {
                    name: 'lock', kind: 'statement', text: { fr: 'mettre la porte en position {STATE}', en: 'set door lock to {STATE}' },
                    args: [dropdown('STATE', [[{ fr: 'verrouillée', en: 'locked' }, '1'], [{ fr: 'déverrouillée', en: 'unlocked' }, '0']])],
                    code: 'a4_board.write_port(0, {STATE})'
                },
                {
                    name: 'door_is', kind: 'boolean', text: { fr: 'la porte est {STATE}', en: 'door is {STATE}' },
                    args: [dropdown('STATE', [[{ fr: 'fermée', en: 'closed' }, 'True'], [{ fr: 'ouverte', en: 'open' }, 'False']])],
                    code: 'a4_access.door_is({STATE})'
                },
                { name: 'wait_key', kind: 'text', text: { fr: 'attendre une touche du clavier', en: 'wait for keypad key' }, code: 'a4_access.wait_key()' },
                { name: 'read_key', kind: 'text', text: { fr: 'dernière touche appuyée du clavier', en: 'last keypad key pressed' }, code: 'a4_access.read_key()' },
                { name: 'entered_code', kind: 'text', text: { fr: 'code saisi', en: 'entered code' }, code: 'a4_access.entered_code()' },
                {
                    name: 'code_is', kind: 'boolean', text: { fr: 'le code saisi est {CODE}', en: 'entered code is {CODE}' },
                    args: [text('CODE', '1234')], code: 'a4_access.entered_code() == {CODE}'
                },
                {
                    name: 'code_length', kind: 'boolean', text: { fr: 'le code saisi comporte {N} chiffres', en: 'entered code has {N} digits' },
                    args: [number('N', 4)], code: 'len(a4_access.entered_code()) == {N}'
                },
                { name: 'clear_code', kind: 'statement', text: { fr: 'effacer le code saisi', en: 'clear entered code' }, code: 'a4_access.clear_code()' },
                { name: 'delete_last', kind: 'statement', text: { fr: 'effacer le dernier chiffre du code', en: 'delete last code digit' }, code: 'a4_access.delete_last()' }
            ]
        },
        {
            id: 'a4_parking',
            name: 'Parking microSySTEM',
            description: {
                fr: 'Borne de stationnement limité : un capteur détecte la présence d’un véhicule et un écran couleur affiche le temps restant.',
                en: 'Limited parking station: a sensor detects vehicles and a colour screen shows the remaining time.'
            },
            image: 'a4_parking.jpg',
            logo: 'a4_logo.png',
            colour: '#0FBC11',
            blocks: [
                { name: 'vehicle', kind: 'boolean', text: { fr: 'présence d’un véhicule', en: 'vehicle present' }, code: 'a4_board.read_port(0) == 1' },
                ...LED_BLOCKS,
                ...screenBlocks(SCREEN_I2C_INIT),
                {
                    name: 'time', kind: 'text', text: { fr: 'heure {H} h {M} min {S} s', en: 'time {H} h {M} min {S} s' },
                    args: [number('H', 12), number('M', 40), number('S', 30)], code: "'%02d:%02d:%02d' % (int({H}), int({M}), int({S}))"
                }
            ]
        },
        {
            id: 'a4_barrier',
            name: 'Barrier microSySTEM',
            description: {
                fr: 'Barrière automatique de parking ou de péage avec servomoteur, feu RVB, capteur infrarouge et lecteur RFID.',
                en: 'Car park or toll barrier with a servo motor, RGB light, infrared sensor and RFID reader.'
            },
            image: 'a4_barrier.jpg',
            logo: 'a4_logo.png',
            colour: '#F29C00',
            blocks: [
                { name: 'read_tag', kind: 'number', text: { fr: 'lire badge RFID', en: 'read RFID tag' }, code: 'a4_barrier.read_tag()' },
                {
                    name: 'move', kind: 'statement', text: { fr: '{ACTION} la barrière', en: '{ACTION} barrier' },
                    args: [dropdown('ACTION', [[{ fr: 'ouvrir', en: 'open' }, '115'], [{ fr: 'fermer', en: 'close' }, '5']])],
                    code: 'a4_barrier.servo({ACTION})'
                },
                {
                    name: 'servo', kind: 'statement', text: { fr: 'fixer l’angle du servomoteur à {ANGLE}', en: 'set servo angle {ANGLE}' },
                    args: [number('ANGLE', 90)], code: 'a4_barrier.servo({ANGLE})'
                },
                { name: 'vehicle', kind: 'boolean', text: { fr: 'véhicule détecté', en: 'vehicle detected' }, code: 'a4_board.read_port(0) != 0' },
                {
                    name: 'light_colour', kind: 'statement', text: { fr: 'allumer le feu en {C}', en: 'set signal light to {C}' },
                    args: [lightColour('C')], code: 'a4_barrier.set_light({C})'
                },
                {
                    name: 'light_rgb', kind: 'statement', text: { fr: 'allumer le feu en rouge {R} vert {G} bleu {B}', en: 'set signal light red {R} green {G} blue {B}' },
                    args: RGB_ARGS, code: 'a4_barrier.set_light(({R}, {G}, {B}))'
                },
                { name: 'light_off', kind: 'statement', text: { fr: 'éteindre le feu', en: 'turn signal light off' }, code: 'a4_barrier.set_light((0, 0, 0))' }
            ]
        },
        {
            id: 'a4_weight',
            name: 'Weight microSySTEM',
            description: {
                fr: 'Balance automatisée à jauge de contrainte avec clavier 4x4 et écran couleur, pour peser, compter ou tarifer des articles.',
                en: 'Automated strain gauge scale with a 4x4 keypad and a colour screen, to weigh, count or price items.'
            },
            image: 'a4_weight.jpg',
            logo: 'a4_logo.png',
            colour: '#F2B705',
            blocks: [
                { name: 'init', kind: 'statement', text: { fr: 'initialiser la balance', en: 'initialize scale' }, code: 'a4_weight.init()' },
                { name: 'tare', kind: 'statement', text: { fr: 'effectuer la tare', en: 'tare scale' }, code: 'a4_weight.tare()' },
                { name: 'mass', kind: 'number', text: { fr: 'masse (g)', en: 'mass (g)' }, code: 'a4_weight.mass()' },
                { name: 'connected', kind: 'boolean', text: { fr: 'balance connectée', en: 'scale connected' }, code: 'a4_weight.connected()' },
                { name: 'start_calibration', kind: 'statement', text: { fr: 'commencer l’étalonnage de la balance', en: 'start scale calibration' }, code: 'a4_weight.start_calibration()' },
                {
                    name: 'calibrate', kind: 'boolean', text: { fr: 'étalonner la balance avec une masse étalon de {MASS} g', en: 'calibrate scale with a reference mass of {MASS} g' },
                    args: [number('MASS', 100)], code: 'a4_weight.calibrate({MASS})'
                },
                { name: 'pressed_key', kind: 'text', text: { fr: 'touche appuyée du clavier', en: 'pressed keypad key' }, code: 'a4_weight.pressed_key()' },
                { name: 'wait_key', kind: 'text', text: { fr: 'attendre l’appui sur une touche', en: 'wait for keypad key' }, code: 'a4_weight.wait_key()' },
                {
                    name: 'key_is_pressed', kind: 'boolean', text: { fr: 'la touche {KEY} du clavier est appuyée', en: 'keypad key {KEY} is pressed' },
                    args: [dropdown('KEY', [...'123A456B789C*0#D'].map(key => [key, `'${key}'`]))], code: 'a4_weight.pressed_key() == {KEY}'
                },
                {
                    name: 'set_factor', kind: 'statement', text: { fr: 'régler le facteur d’étalonnage à {VALUE}', en: 'set scale calibration factor to {VALUE}' },
                    args: [number('VALUE', 2236)], code: 'a4_weight.factor = {VALUE}'
                },
                { name: 'factor', kind: 'number', text: { fr: 'facteur d’étalonnage de la balance', en: 'scale calibration factor' }, code: 'a4_weight.factor' },
                {
                    name: 'raw_average', kind: 'number', text: { fr: 'valeur brute moyenne sur {N} mesures', en: 'average raw scale value with {N} samples' },
                    args: [number('N', 10)], code: 'a4_weight.raw_average({N})'
                },
                ...screenBlocks(SCREEN_I2C_INIT)
            ]
        },
        {
            id: 'a4_shifumi',
            name: 'ShiFuMi microSySTEM',
            description: {
                fr: 'Jeu de pierre-feuille-ciseaux : un servomoteur fait tourner un disque rétroéclairé, un capteur à ultrasons détecte la main.',
                en: 'Rock-paper-scissors game: a servo turns a backlit disc and an ultrasonic sensor detects the hand.'
            },
            image: 'a4_shifumi.jpg',
            logo: 'a4_logo.png',
            colour: '#003CFF',
            blocks: [
                {
                    name: 'disc_angle', kind: 'statement', text: { fr: 'fixer l’angle du disque à {ANGLE} °', en: 'set disc servo angle to {ANGLE} °' },
                    args: [number('ANGLE', 90)], code: 'a4_shifumi.servo({ANGLE})'
                },
                { name: 'distance', kind: 'number', text: { fr: 'distance ultrason (cm)', en: 'ultrasonic distance (cm)' }, code: 'a4_shifumi.distance()' },
                {
                    name: 'hand_detected', kind: 'boolean', text: { fr: 'main détectée à moins de {D} cm', en: 'hand detected under {D} cm' },
                    args: [number('D', 12)], code: 'a4_shifumi.hand_detected({D})'
                },
                {
                    name: 'backlight_brightness', kind: 'statement', text: { fr: 'régler la luminosité sous le disque à {B} %', en: 'set disc backlight brightness to {B} %' },
                    args: [number('B', 30)], code: 'a4_shifumi.set_brightness({B})'
                },
                {
                    name: 'backlight_colour', kind: 'statement', text: { fr: 'rétroéclairer le disque en {C}', en: 'set disc backlight to {C}' },
                    args: [lightColour('C')], code: 'a4_shifumi.set_backlight({C})'
                },
                {
                    name: 'backlight_rgb', kind: 'statement', text: { fr: 'rétroéclairer le disque en rouge {R} vert {G} bleu {B}', en: 'set disc backlight red {R} green {G} blue {B}' },
                    args: RGB_ARGS, code: 'a4_shifumi.set_backlight(({R}, {G}, {B}))'
                },
                { name: 'backlight_off', kind: 'statement', text: { fr: 'éteindre le rétroéclairage du disque', en: 'turn disc backlight off' }, code: 'a4_shifumi.set_backlight((0, 0, 0))' },
                { name: 'lcd_init', kind: 'statement', text: { fr: 'initialiser l’écran LCD', en: 'initialize LCD' }, code: 'a4_shifumi.lcd_init()' },
                { name: 'lcd_clear', kind: 'statement', text: { fr: 'effacer l’écran LCD', en: 'clear LCD' }, code: 'a4_shifumi.lcd_clear()' },
                {
                    name: 'lcd_text', kind: 'statement', text: { fr: 'LCD afficher {TEXT} sur la ligne {LINE}', en: 'LCD show {TEXT} on line {LINE}' },
                    args: [text('TEXT', 'PRÊT'), dropdown('LINE', ['1', '2'])], code: 'a4_shifumi.lcd_show({TEXT}, {LINE})'
                },
                {
                    name: 'lcd_number', kind: 'statement', text: { fr: 'LCD afficher le nombre {VALUE} sur la ligne {LINE}', en: 'LCD show number {VALUE} on line {LINE}' },
                    args: [number('VALUE', 0), dropdown('LINE', ['2', '1'])], code: 'a4_shifumi.lcd_show({VALUE}, {LINE})'
                }
            ]
        },
        {
            id: 'a4_ai_vision',
            name: 'AI Vision microSySTEM',
            description: {
                fr: 'Support de caméra IA HuskyLens 2.0 avec écran couleur et LED RVB, pour reconnaître visages, objets, couleurs ou gestes.',
                en: 'HuskyLens 2.0 AI camera mount with a colour screen and RGB LEDs, to recognize faces, objects, colours or gestures.'
            },
            image: 'a4_ai_vision.jpg',
            logo: 'a4_logo.png',
            colour: '#5B3FE8',
            blocks: [
                ...LED_BLOCKS,
                ...screenBlocks({ name: 'screen_init', kind: 'statement', text: { fr: 'initialiser l’écran LCD', en: 'initialize the LCD screen' }, code: 'a4_screen.init_uart()' })
            ]
        }
    ];
    // Each block imports the A4 modules used by its code.
    for (const block of catalog.flatMap(ext => ext.blocks)) {
        block.args = block.args || [];
        block.imports = [...new Set(block.code.match(/\ba4_\w+(?=\.)/g))].map(module => 'import ' + module).join('\n');
    }
    return catalog;
})();
