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
                        id: interfaceName + '-functions',
                        src: `/openInterface/${interfaceName}/assets/js/constants/generators/functions.js`
                    });
                    if (interfaceName == 'steami') {
                        COMMON_CONSTANTS_SCRIPTS.push({
                            id: 'wb55-functions',
                            src: `/openInterface/wb55/assets/js/constants/generators/functions.js`
                        });
                    }
                }
                COMMON_CONSTANTS_SCRIPTS.push({
                    id: interfaceName + '-imports',
                    src: `/openInterface/${interfaceName}/assets/js/constants/generators/imports.js`
                });
                if (interfaceName == 'steami') {
                    COMMON_CONSTANTS_SCRIPTS.push({
                        id: 'wb55-imports',
                        src: `/openInterface/wb55/assets/js/constants/generators/imports.js`
                    });
                }
            } else {
                COMMON_CONSTANTS_SCRIPTS.push({
                    id: 'includes',
                    src: `/openInterface/${interfaceName}/assets/js/constants/generators/includes.js`
                });
            }

            const lng = (getCookie('lng').length > 0 ? getCookie('lng') : 'en');

            const COMMON_MSG_PATH = `/openInterface/interfaces/assets/js/msg`;
            const GET_COMMON_LANG_SCRIPTS = (_language) => {
                let scripts;
                if (interfaceName == 'web') {
                    scripts = [{
                        id: "common_cat_msg",
                        src: `${COMMON_MSG_PATH}/categories/${_language}.js`
                    }];
                } else {
                    scripts = [{
                        id: "common_block_msg",
                        src: `${COMMON_MSG_PATH}/blocks/basic/${_language}.js`
                    }, {
                        id: "common_cat_msg",
                        src: `${COMMON_MSG_PATH}/categories/${_language}.js`
                    }];
                    if (['arduino', 'esp32', 'galaxia', 'pico', 'm5stack'].includes(interfaceName)) {
                        scripts.push({
                            id: "common_esp32_block_msg",
                            src: `${COMMON_MSG_PATH}/blocks/esp32/${_language}.js`
                        })
                    }
                }
                return scripts;
            };

            const COMMON_LANG_SCRIPTS = GET_COMMON_LANG_SCRIPTS(lng);
            const FALLBACK_COMMON_LANG_SCRIPTS = GET_COMMON_LANG_SCRIPTS('en');

            const SPECIFIC_MSG_PATH = `/openInterface/${interfaceName}/assets/js/blocks/msg`;
            const GET_LANG_SCRIPTS = (_language) => {
                let scripts = [];
                if (['web', 'TI-83'].includes(interfaceName)) {
                    scripts.push({
                        id: "_cat_msg",
                        src: `${SPECIFIC_MSG_PATH}/categories/js/${_language}.js`
                    });
                }
                if (interfaceName == 'steami') {
                    scripts.push({
                        id: "wb55_block_msg",
                        src: `/openInterface/wb55/assets/js/blocks/msg/blocks/js/${_language}.js`
                    });
                }
                scripts.push({
                    id: interfaceName + "_block_msg",
                    src: `${SPECIFIC_MSG_PATH}/blocks/js/${_language}.js`
                });
                return scripts;
            };

            const LANG_SCRIPTS = GET_LANG_SCRIPTS(lng);
            const FALLBACK_LANG_SCRIPTS = GET_LANG_SCRIPTS('en');

            // Common block definitions

            let blockCategories = ['logic', 'loops', 'math', 'variables', 'procedures',]
            if (interface_type !== 'letsstartcoding') {
                blockCategories = blockCategories.concat(['colour', 'text', 'lists']);
            }
            if (interface_type === 'interfaces') {
                blockCategories.push('exceptions');
            }
            if (['python', 'microbit'].includes(interfaceName)) {
                blockCategories.push('dictionaries');
            }
            const COMMON_INTERFACES_BLOCKS_PATH = '/openInterface/interfaces/assets/js/blocks/';
            const COMMON_BLOCKS_DEFINITIONS_PATH = `/openInterface/${interface_type}/assets/js/blocks/definitions/`;
            const COMMON_BLOCKS_DEFINITIONS_SCRIPTS = blockCategories.map(cat => {
                return {
                    id: 'blocks-' + cat,
                    src: COMMON_BLOCKS_DEFINITIONS_PATH + 'basic/' + cat + '.js'
                }
            });
            COMMON_BLOCKS_DEFINITIONS_SCRIPTS.unshift({
                id: 'blocks-constants',
                src: COMMON_INTERFACES_BLOCKS_PATH + 'definitions/constants.js'
            });

            // Python generators

            let pythonCategories = ['colour', 'logic', 'loops', 'math', 'text', 'variables', 'lists', 'procedures', 'exceptions'];
            if (['python', 'microbit'].includes(interfaceName)) {
                pythonCategories.push('dictionaries');
            }
            const COMMON_PYTHON_GENERATORS_PATH = COMMON_INTERFACES_BLOCKS_PATH + 'generators/python/';
            const COMMON_PYTHON_BLOCKS_GENERATORS = pythonCategories.map(cat => {
                return {
                    id: 'python-' + cat,
                    src: COMMON_PYTHON_GENERATORS_PATH + 'basic/' + cat + '.js'
                }
            });
            COMMON_PYTHON_BLOCKS_GENERATORS.unshift({
                id: 'python-init',
                src: COMMON_PYTHON_GENERATORS_PATH + 'init.js'
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
                src: COMMON_INTERFACES_BLOCKS_PATH + 'generators/arduino/init.js'
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

            const SPECIFIC_BLOCKS_PATH = (_interface = interfaceName) => `/openInterface/${_interface}/assets/js/blocks/definitions/specific/`;
            const SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS = [];

            const SPECIFIC_GENERATORS_PATH = (_interface = interfaceName) => `/openInterface/${_interface}/assets/js/blocks/generators/specific/`;
            const SPECIFIC_BLOCKS_GENERATORS_SCRIPTS = [];

            const addBlockAndGeneratorScripts = function (files, commonDefinitions = false, needSpecificDefinitions = true, _interface = interfaceName) {
                for (const file of files) {
                    // Warning: It is important to load common block definitions before interface specific. Cause of double definitions.
                    if (commonDefinitions) {
                        SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                            id: 'common-definitions/' + file,
                            src: COMMON_INTERFACES_BLOCKS_PATH + 'definitions/common/' + file
                        });
                    }
                    if (needSpecificDefinitions) {
                        SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                            id: _interface + '-definitions/' + file,
                            src: SPECIFIC_BLOCKS_PATH(_interface) + file
                        });
                    }
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: _interface + '-generators/' + file,
                        src: SPECIFIC_GENERATORS_PATH(_interface) + file
                    });
                }
            };

            const SPECIFIC_CONSTANTS_PATH = `/openInterface/${interfaceName}/assets/js/constants/`;
            const SPECIFIC_CONSTANTS_SCRIPTS = [];

            const addConstantScript = function (files, path) {
                for (const file of files) {
                    SPECIFIC_CONSTANTS_SCRIPTS.push({
                        id: path + '/' + file,
                        src: SPECIFIC_CONSTANTS_PATH + path + '/' + file
                    });
                }
            };

            const COMMON_BLOCKS_PATH = `/openInterface/interfaces/assets/js/blocks/definitions/common/`;

            const addBlockScripts = function (files) {
                for (const file of files) {
                    SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                        id: 'common-definitions/' + file,
                        src: COMMON_BLOCKS_PATH + file
                    });
                }
            };

            // blockly_constants.js
            if (!['niryo', 'web'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                    id: 'blockly_constants.js',
                    src: `/openInterface/${interfaceName}/assets/js/blocks/definitions/blockly_constants.js`
                });
            }

            // generator.js
            // Note: Add interface name if it IS required.
            if (['arduino', 'letsstartcoding', 'esp32', 'pico', 'm5stack', 'galaxia', 'GalaxiaCircuitPython', 'wb55', 'l476', 'mBot', 'cyberpi',
                'raspberrypi', 'TI-83', 'eliobot', 'codey', 'steami'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                    id: 'generator.js',
                    src: `/openInterface/${interfaceName == 'steami' ? 'wb55' : interfaceName}/assets/js/blocks/generators/generator.js`
                });
            }

            // start.js
            if (!['python'].includes(interfaceName)) {
                if (['arduino', 'mBot', 'letsstartcoding'].includes(interfaceName)) {
                    addBlockAndGeneratorScripts(['start.js']);
                } else {
                    if (interfaceName == 'steami') {
                        addBlockAndGeneratorScripts(['start.js'], true, false, 'wb55');
                    } else {
                        addBlockAndGeneratorScripts(['start.js'], true, false);
                    }
                }
            }

            // common block scripts

            // display.js | input_output.js | communication.js | actuators.js | sensors.js
            // Note: Add interface name on each file if it IS required.
            const interfacesForScripts = {
                'display.js': ['esp32', 'microbit', 'galaxia', 'raspberrypi'],
                'input_output.js': ['esp32', 'microbit', 'galaxia', 'raspberrypi'],
                'communication.js': ['esp32', 'microbit', 'galaxia'],
                'actuators.js': ['esp32', 'microbit', 'galaxia', 'raspberrypi'],
                'sensors.js': ['esp32', 'microbit', 'galaxia', 'raspberrypi']
            };

            for (const file in interfacesForScripts) {
                if (interfacesForScripts[file].includes(interfaceName)) {
                    addBlockScripts([file]);
                }
            }

            // specific block scripts

            // display.js | input_output.js | communication.js | actuators.js | sensors.js
            // Note: Add interface name on each file if it IS NOT required.
            const excludedInterfacesForScripts = {
                'display.js': ['TI-83', 'letsstartcoding', 'bluebot'],
                'input_output.js': ['python', 'TI-83', 'niryo', 'nao'],
                'communication.js': ['python', 'TI-83', 'letsstartcoding', 'niryo', 'buddy', 'steami', 'bluebot'],
                'actuators.js': ['python', 'TI-83', 'niryo', 'nao', 'steami'],
                'sensors.js': ['python', 'TI-83', 'letsstartcoding', 'niryo', 'bluebot']
            };

            // interfaces with only the common block definitions
            const noSpecificBlocksDefinitions = {
                'actuators.js': ['esp32']
            };

            for (const file in excludedInterfacesForScripts) {
                if (!excludedInterfacesForScripts[file].includes(interfaceName)) {
                    const commonInterfaces = interfacesForScripts[file];
                    const noSpecificDefinitions = noSpecificBlocksDefinitions[file]
                    addBlockAndGeneratorScripts([file],
                        commonInterfaces ? commonInterfaces.includes(interfaceName) : false,
                        noSpecificDefinitions ? !noSpecificDefinitions.includes(interfaceName) : true
                    );
                }
                console.log(file)
                if (interfaceName == 'steami') {
                    addBlockAndGeneratorScripts([file], false, true, 'wb55');
                }
            }

            // robots.js
            if (['microbit', 'esp32', 'pico', 'wb55', 'l476', 'cyberpi', 'GalaxiaCircuitPython', 'codey', 'raspberrypi'].includes(interfaceName)) {
                addBlockAndGeneratorScripts(['robots.js']);
            }

            // network.js 
            if (['esp32', 'm5stack', 'galaxia', 'pico', 'arduino'].includes(interfaceName)) {
                SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                    id: 'definitions/network.js',
                    src: COMMON_INTERFACES_BLOCKS_PATH + 'definitions/python/esp32/network.js'
                });
                if (!['pico', 'arduino'].includes(interfaceName)) {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators/network.js',
                        src: COMMON_INTERFACES_BLOCKS_PATH + 'generators/python/esp32/network.js'
                    });
                } else {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators/network.js',
                        src: SPECIFIC_GENERATORS_PATH() + 'network.js'
                    });
                    console.log(SPECIFIC_BLOCKS_GENERATORS_SCRIPTS)
                }
            }

            // cameras.js 
            if (['arduino', 'esp32', 'galaxia', 'l476', 'microbit', 'wb55',].includes(interfaceName == 'steami' ? 'wb55' : interfaceName)) {
                SPECIFIC_BLOCKS_DEFINITIONS_SCRIPTS.push({
                    id: 'common-definitions/cameras.js',
                    src: COMMON_INTERFACES_BLOCKS_PATH + 'definitions/common/cameras.js'
                });
                if (['l476', 'wb55'].includes(interfaceName == 'steami' ? 'wb55' : interfaceName)) {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators/cameras.js',
                        src: COMMON_INTERFACES_BLOCKS_PATH + 'generators/python/stm32/cameras.js'
                    });
                } else if (['esp32'].includes(interfaceName)) {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators/cameras.js',
                        src: COMMON_INTERFACES_BLOCKS_PATH + 'generators/python/esp32/cameras.js'
                    });
                } else if (['arduino', 'microbit', 'galaxia'].includes(interfaceName)) {
                    SPECIFIC_BLOCKS_GENERATORS_SCRIPTS.push({
                        id: 'generators/cameras.js',
                        src: SPECIFIC_GENERATORS_PATH() + 'cameras.js'
                    });
                }
            }

            // vittaia.js 
            if (['arduino', 'galaxia', 'microbit'].includes(interfaceName)) {
                addBlockAndGeneratorScripts(['vittaia.js'], true, false);
            }

            // bitmap.js (constant)
            if (['arduino'].includes(interfaceName)) {
                addConstantScript(['bitmap.js'], 'generators');
            }

            // specific
            // Note: Add specific files here if it IS required.
            switch (interfaceName) {
                case 'microbit':
                    addBlockAndGeneratorScripts(['tello.js']);
                    break;
                case 'esp32':
                    addBlockAndGeneratorScripts(['esp32cam.js']);
                    break;
                case 'm5stack':
                    addBlockAndGeneratorScripts(['screen.js']);
                    break;
                case 'pico':
                    addBlockAndGeneratorScripts(['process.js', 'cameras.js']);
                    break;
                case 'python':
                    addBlockAndGeneratorScripts(['graph.js', 'numpy.js', 'turtle.js', 'vittaia.js']);
                    break;
                case 'TI-83':
                    addBlockAndGeneratorScripts(['ce.js', 'devices.js', 'draw.js', 'io.js', 'microbit.js', 'plotlib.js', 'random.js', 'rover.js', 'tello.js', 'turtle.js']);
                    addConstantScript(['texas_instruments.js', 'texas_instruments_code.js'], 'toolbox');
                    break;
                case 'mBot':
                    addBlockAndGeneratorScripts(['mCore.js']);
                    break;
                case 'cyberpi':
                    addBlockAndGeneratorScripts(['network.js']);
                    break;
                case 'thymio':
                    addBlockAndGeneratorScripts(['math.js']);
                    break;
                case 'winky':
                    addBlockAndGeneratorScripts(['network.js', 'sounds.js']);
                    break;
                case 'GalaxiaCircuitPython':
                    addBlockAndGeneratorScripts(['network.js']);
                    break;
                case 'niryo':
                    addBlockAndGeneratorScripts(['movements.js', 'tools.js', 'utility.js', 'network.js']);
                    break;
                case 'nao':
                    addBlockAndGeneratorScripts(['movements.js', 'time.js', 'games.js', 'network.js', 'communication.js', 'sensors.js']);
                    break;
                case 'raspberrypi':
                    addBlockAndGeneratorScripts(['network.js']);
                    addConstantScript(['pixel-images.js'], 'generators');
                    break;
                case 'buddy':
                    addBlockAndGeneratorScripts(['vocal_interactions.js', 'vittaia.js']);
                    break;
                case 'photon':
                    addBlockAndGeneratorScripts(['sound.js']);
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