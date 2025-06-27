/**
 * Load interface.
 * @param {string} interfaceName 
 */
function loadInterface(interfaceName) {
    return new Promise(async (resolve, reject) => {
        try {
            const EXTERNAL_SCRIPTS = [
                {
                    id: 'blockly_compressed',
                    src: '/openInterface/interfaces/assets/js/external/blockly/blockly_compressed.js'
                },
                {
                    id: 'field_date_compressed',
                    src: '/openInterface/interfaces/assets/js/external/blockly/extensions/field_date_compressed.js'
                },
                {
                    id: 'field_grid_dropdown_compressed',
                    src: '/openInterface/interfaces/assets/js/external/blockly/extensions/field_grid_dropdown_compressed.js'
                },
                {
                    id: 'field_slider_compressed',
                    src: '/openInterface/interfaces/assets/js/external/blockly/extensions/field_slider_compressed.js'
                },
                {
                    id: 'html2canvas',
                    src: '/openInterface/interfaces/assets/js/external/html2canvas.min.js'
                },
                {
                    id: 'wiki',
                    src: '/openInterface/interfaces/assets/js/wiki/Wiki.js'
                }
            ];

            const toolboxes_src = (['python', 'TI-83'].includes(interfaceName) ? `openInterface/${interfaceName}/assets/js/constants/toolbox/toolboxes.js` : '/openInterface/interfaces/assets/js/constants/toolbox/toolboxes.js');
            const interface_type = (['arduino', 'mBot', 'letsstartcoding'].includes(interfaceName) ? interfaceName : 'interfaces');


            let COMMON_CONSTANTS_SCRIPTS = [
                {
                    id: 'init',
                    src: `/openInterface/${interfaceName}/assets/js/constants/main/init.js`
                },
                {
                    id: 'vittascience',
                    src: `/openInterface/${interfaceName}/assets/js/constants/toolbox/vittascience.js`
                },
                {
                    id: 'styles',
                    src: `/openInterface/${interfaceName}/assets/js/constants/toolbox/styles.js`
                },
                {
                    id: 'scratch',
                    src: `/openInterface/${interfaceName}/assets/js/constants/toolbox/scratch.js`
                },
                {
                    id: 'toolboxes',
                    src: toolboxes_src
                },
                {
                    id: 'LedMatrixModalManager',
                    src: '/openInterface/interfaces/assets/js/constants/modals/LedMatrixModalManager.js'
                },
                {
                    id: 'imageTooltip',
                    src: '/openInterface/interfaces/assets/js/constants/tooltip/image.js'
                },
                {
                    id: 'generatorsFunctions',
                    src: `/openInterface/${interface_type}/assets/js/constants/generators/functions.js`
                },
                {
                    id: 'generatorsEsp32Functions',
                    src: `/openInterface/interfaces/assets/js/constants/generators/esp32_functions.js`
                },
                {
                    id: 'generatorsConstants',
                    src: '/openInterface/interfaces/assets/js/constants/generators/constants.js'
                },
                {
                    id: 'blocksHelpUrl',
                    src: '/openInterface/interfaces/assets/js/constants/blocks/helpurl.js'
                },
                {
                    id: 'blockDB',
                    src: `/openInterface/${interfaceName}/assets/js/constants/toolbox/blockDB.js`
                },
                {
                    id: 'mainInterface',
                    src: '/openInterface/interfaces/assets/js/constants/main/interface.js'
                }
            ];

            if (interface_type === 'interfaces') {
                if (interfaceName === 'python') {
                    COMMON_CONSTANTS_SCRIPTS = COMMON_CONSTANTS_SCRIPTS.filter(script => script.id !== 'scratch');
                } else {
                    COMMON_CONSTANTS_SCRIPTS.push({
                        id: 'functions',
                        src: `/openInterface/${interfaceName}/assets/js/constants/generators/functions.js`
                    });
                }
                COMMON_CONSTANTS_SCRIPTS.push({
                    id: 'imports',
                    src: `/openInterface/${interfaceName}/assets/js/constants/generators/imports.js`
                });
            } else {
                COMMON_CONSTANTS_SCRIPTS.push({
                    id: 'includes',
                    src: `/openInterface/${interfaceName}/assets/js/constants/generators/includes.js`
                });
            }

            const lng = (getCookie('lng').length > 0 ? getCookie('lng') : 'en');

            const LANG_SCRIPTS = [
                {
                    id: "cat_msg",
                    src: `/openInterface/${interfaceName}/assets/js/blocks/msg/categories/js/${lng}.js`
                },
                {
                    id: "block_msg",
                    src: `/openInterface/${interfaceName}/assets/js/blocks/msg/blocks/js/${lng}.js`
                }
            ];

            const FALLBACK_LANG_SCRIPTS = [
                {
                    id: "cat_msg",
                    src: `/openInterface/${interfaceName}/assets/js/blocks/msg/categories/js/en.js`
                },
                {
                    id: "block_msg",
                    src: `/openInterface/${interfaceName}/assets/js/blocks/msg/blocks/js/en.js`
                }
            ];

            const COMMON_LANG_SCRIPTS = [
                {
                    id: "common_block_msg",
                    src: `/openInterface/interfaces/assets/js/msg/blocks/${lng}.js`
                }
            ];

            const FALLBACK_COMMON_LANG_SCRIPTS = [
                {
                    id: "common_block_msg",
                    src: `/openInterface/interfaces/assets/js/msg/blocks/en.js`
                }
            ];

            const COMMON_ESP32_LANG_SCRIPTS = [
                {
                    id: "common_esp32_block_msg",
                    src: `/openInterface/interfaces/assets/js/msg/blocks/esp32/${lng}.js`
                }
            ];

            const FALLBACK_COMMON_ESP32_LANG_SCRIPTS = [
                {
                    id: "common_esp32_block_msg",
                    src: `/openInterface/interfaces/assets/js/msg/blocks/esp32/en.js`
                }
            ];

            // Common block definitions

            let blockCategories = ['logic', 'loops', 'math', 'variables', 'procedures',]
            if (interface_type !== 'letsstartcoding') {
                blockCategories = blockCategories.concat(['colour', 'text', 'lists']);
            }
            if (interface_type === 'interfaces') {
                blockCategories.push('exceptions');
            }
            if (['python', 'microbit'].includes(interfaceName)) {
                blockCategories.push('dictionaries')
            }
            const pathCommonBlockDefinitions = `/openInterface/${interface_type}/assets/js/blocks/definitions/basic/`;
            const COMMON_BLOCKS_DEFINITIONS_SCRIPTS = blockCategories.map(cat => {
                return {
                    id: 'blocks-' + cat,
                    src: pathCommonBlockDefinitions + cat + '.js'
                }
            });
            COMMON_BLOCKS_DEFINITIONS_SCRIPTS.unshift({
                id: 'blocks-constants',
                src: '/openInterface/interfaces/assets/js/blocks/definitions/constants.js'
            });

            // Python generators

            let pythonCategories = ['colour', 'logic', 'loops', 'math', 'text', 'variables', 'lists', 'procedures', 'exceptions'];
            if (['python', 'microbit'].includes(interfaceName)) {
                pythonCategories.push('dictionaries')
            }
            const pathCommonPythonGenerators = '/openInterface/interfaces/assets/js/blocks/generators/python/';
            const COMMON_PYTHON_BLOCKS_GENERATORS = pythonCategories.map(cat => {
                return {
                    id: 'python-' + cat,
                    src: pathCommonPythonGenerators + 'basic/' + cat + '.js'
                }
            });
            COMMON_PYTHON_BLOCKS_GENERATORS.unshift({
                id: 'python-init',
                src: pathCommonPythonGenerators + 'init.js'
            });

            // Arduino generators

            let arduinoCategories = ['logic', 'loops', 'math', 'variables', 'procedures'];
            if (interface_type !== 'letsstartcoding') {
                arduinoCategories = arduinoCategories.concat(['colour', 'text', 'lists']);
            }
            const pathCommonArduinoGenerators = `/openInterface/${interface_type}/assets/js/blocks/generators/`;
            const COMMON_ARDUINO_BLOCKS_GENERATORS = arduinoCategories.map(cat => {
                return {
                    id: 'arduino-' + cat,
                    src: pathCommonArduinoGenerators + 'basic/' + cat + '.js'
                }
            });
            COMMON_ARDUINO_BLOCKS_GENERATORS.unshift({
                id: 'arduino-generator',
                src: pathCommonArduinoGenerators + 'generator.js'
            });
            COMMON_ARDUINO_BLOCKS_GENERATORS.unshift({
                id: 'arduino-init',
                src: '/openInterface/interfaces/assets/js/blocks/generators/arduino/init.js'
            });

            const COMMON_SCRIPTS = [
                {
                    id: "vitta_storage",
                    src: "/interfaces/assets/js/utils/VittaStorage.js",
                    module: false,
                    defer: false
                },
                {
                    id: "toolbox_manager",
                    src: "/openInterface/interfaces/assets/js/main/ToolboxManager.js"
                },
                {
                    id: 'themes',
                    src: '/openInterface/interfaces/assets/js/themes/themes.js'
                }
            ];

            const SPECIFIC_BLOCKS_PATH = `/openInterface/${interfaceName}/assets/js/blocks/definitions/specific/`;
            const SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS = [];

            const SPECIFIC_GENERATORS_PATH = `/openInterface/${interfaceName}/assets/js/blocks/generators/specific/`;
            const SPECIFIC_BLOCKS_GENERATORS_SCRIPTS = [];

            const addBlockScripts = function (files) {
                for (const file of files) {
                    SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                        id: 'definitions-' + file + '.js',
                        src: SPECIFIC_BLOCKS_PATH + file + '.js'
                    });
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators-' + file + '.js',
                        src: SPECIFIC_GENERATORS_PATH + file + '.js'
                    });
                }
            };

            const SPECIFIC_CONSTANTS_PATH = `/openInterface/${interfaceName}/assets/js/constants/`;
            const SPECIFIC_CONSTANTS_SCRIPTS = [];

            const addConstantScript = function (files, path) {
                for (const file of files) {
                    SPECIFIC_CONSTANTS_SCRIPTS.push({
                        id: 'constants-' + file + '.js',
                        src: SPECIFIC_CONSTANTS_PATH + path + '/' + file + '.js'
                    });
                }
            };

            // blockly_constants.js
            if (!['niryo'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                    id: 'blockly_constants.js',
                    src: `/openInterface/${interfaceName}/assets/js/blocks/definitions/blockly_constants.js`
                });
            }

            // generator.js
            // Note: Add interface name if it IS required.
            if (['arduino', 'letsstartcoding', 'esp32', 'pico', 'm5stack', 'galaxia', 'GalaxiaCircuitPython', 'wb55', 'l476', 'mBot', 'cyberpi', 
                'raspberrypi', 'TI-83', 'eliobot'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                    id: 'generator.js',
                    src: `/openInterface/${interfaceName}/assets/js/blocks/generators/generator.js`
                });
            }

            // start.js
            if (!['python'].includes(interfaceName)) {
                addBlockScripts(['start']);
            }

            // display.js | input_output.js | communication.js | actuators.js | sensors.js
            // Note: Add interface name on each file if it IS NOT required.
            const excludedInterfacesForScripts = {
                'display': ['TI-83', 'letsstartcoding'],
                'input_output': ['python', 'TI-83', 'niryo', 'nao'],
                'communication': ['python', 'TI-83', 'letsstartcoding', 'niryo', 'buddy'],
                'actuators': ['python', 'TI-83', 'niryo', 'nao'],
                'sensors': ['python', 'TI-83', 'letsstartcoding', 'niryo',]
            };

            for (const file in excludedInterfacesForScripts) {
                if (!excludedInterfacesForScripts[file].includes(interfaceName)) {
                    addBlockScripts([file]);
                }
            }

            // robots.js
            if (['microbit', 'esp32', 'pico', 'wb55', 'l476', 'cyberpi', 'GalaxiaCircuitPython'].includes(interfaceName)) {
                addBlockScripts(['robots']);
            }

            // network.js 
            if (['esp32', 'm5stack', 'galaxia', 'pico'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                    id: 'definitions-network.js',
                    src: '/openInterface/interfaces/assets/js/blocks/definitions/python/esp32/network.js'
                });
                if (interfaceName !== 'pico') {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators-network.js',
                        src: '/openInterface/interfaces/assets/js/blocks/generators/python/esp32/network.js'
                    })
                } else {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators-network.js',
                        src: SPECIFIC_GENERATORS_PATH + 'network.js'
                    })
                }
            }

            // bitmap.js (constant)
            if (['arduino', 'microbit', 'mBot', 'letsstartcoding'].includes(interfaceName)) {
                addConstantScript(['bitmap'], 'generators');
            }

            // specific
            // Note: Add specific files here if it IS required.
            switch (interfaceName) {
                case 'arduino':
                    addConstantScript(['struct'], 'generators');
                    break;
                case 'microbit':
                    addBlockScripts(['tello', 'cameras']);
                    break;
                case 'm5stack':
                    addBlockScripts(['screen']);
                    break;
                case 'pico':
                    addBlockScripts(['process']);
                    break;
                case 'python':
                    addBlockScripts(['graph', 'numpy', 'turtle', 'vittaia']);
                    break;
                case 'TI-83':
                    addBlockScripts(['ce', 'devices', 'draw', 'io', 'microbit', 'plotlib', 'random', 'rover', 'tello', 'turtle']);
                    addConstantScript(['texas_instruments', 'texas_instruments_code'], 'toolbox');
                    break;
                case 'wb55':
                case 'l476':
                    addBlockScripts(['cameras']);
                    break;
                case 'mBot':
                    addBlockScripts(['mCore']);
                    break;
                case 'cyberpi':
                    addBlockScripts(['network']);
                    break;
                case 'thymio':
                    addBlockScripts(['math']);
                    break;
                case 'winky':
                    addBlockScripts(['network', 'sounds']);
                    break;
                case 'GalaxiaCircuitPython':
                    addBlockScripts(['network']);
                    break;
                case 'niryo':
                    addBlockScripts(['movements', 'tools', 'utility', 'network']);
                    break;
                case 'nao':
                    addBlockScripts(['movements', 'time', 'games', 'network', "communication", 'sensors']);
                    break;
                case 'raspberrypi':
                    addBlockScripts(['network', 'senseHat']);
                    addConstantScript(['pixel-images'], 'generators');
                    break;
                case 'buddy':
                    addBlockScripts(['vocal_interactions', 'vittaia']);
                    break;
                case 'photon':
                    addBlockScripts(['sound']);
                    break;
            }

            try {
                await WikiLoader.loadScripts(EXTERNAL_SCRIPTS);
            } catch (e) {
                console.error(`ExternalScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(SPECIFIC_CONSTANTS_SCRIPTS);
            } catch (e) {
                console.error(`SpecificConstansScript loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(COMMON_CONSTANTS_SCRIPTS);
            } catch (e) {
                console.error(`CommonConstansScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(LANG_SCRIPTS);
            } catch (e) {
                await WikiLoader.loadScripts(FALLBACK_LANG_SCRIPTS);
            }

            try {
                await WikiLoader.loadScripts(COMMON_BLOCKS_DEFINITIONS_SCRIPTS);
            } catch (e) {
                console.error(`CommonBlocksDefinitionsScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS);
            } catch (e) {
                console.error(`SpecificBlocksDefinitionsScripts loading error: ${e}`);
            }

            try {
                if (interface_type === 'interfaces') {
                    await WikiLoader.loadScripts(COMMON_PYTHON_BLOCKS_GENERATORS)
                } else {
                    await WikiLoader.loadScripts(COMMON_ARDUINO_BLOCKS_GENERATORS);
                }
            } catch (e) {
                console.error(`CommonBlocksGeneratorsScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(SPECIFIC_BLOCKS_GENERATORS_SCRIPTS);
            } catch (e) {
                console.error(`specificBlocksGeneratorScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(COMMON_SCRIPTS);
            } catch (e) {
                console.error(`CommonScripts loading error: ${e}`);
            }

            try {
                await WikiLoader.loadScripts(COMMON_LANG_SCRIPTS);
            } catch (e) {
                await WikiLoader.loadScripts(FALLBACK_COMMON_LANG_SCRIPTS);
            }

            try {
                await WikiLoader.loadScripts(COMMON_ESP32_LANG_SCRIPTS);
            } catch (e) {
                await WikiLoader.loadScripts(FALLBACK_COMMON_ESP32_LANG_SCRIPTS);
            }

            resolve();
        } catch (e) {
            console.error(e)
        }
    });

};

/**
 * Generate an hexadecimal number. Used as an id.
 * @param {int} [len=8]
 */
function randHex(len = 8) {
    const maxlen = 8;
    const min = Math.pow(16, Math.min(len, maxlen) - 1),
        max = Math.pow(16, Math.min(len, maxlen)) - 1,
        n = Math.floor(Math.random() * (max - min + 1)) + min;
    let r = n.toString(16);
    while (r.length < len) {
        r = r + randHex(len - maxlen);
    }
    return r;
};