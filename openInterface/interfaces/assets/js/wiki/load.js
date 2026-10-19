/**
 * Load interface.
 * @param {string} interfaceName
 * @param {Array<string>} interfaceScripts Blockly, block definitions, generators and their constants of the
 *     interface, in the order of its prodBody.html (listed by wiki.php).
 */
function loadInterface(interfaceName, interfaceScripts) {
    return new Promise(async (resolve, reject) => {
        try {
            const INTERFACE_SCRIPTS = interfaceScripts.map(src => ({ id: src, src }));

            const WIKI_SCRIPTS = [
                {
                    id: 'html2canvas',
                    src: '/openInterface/interfaces/assets/js/external/html2canvas.min.js'
                },
                {
                    id: 'wiki',
                    src: '/openInterface/interfaces/assets/js/wiki/Wiki.js'
                }
            ];

            const lng = (getCookie('lng').length > 0 ? getCookie('lng') : 'en');

            // Same messages, in the same order, as the interface (interfaces/assets/js/events/load.js).
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
                // Blockly's own messages first (translations of the core UI, including the
                // messages added by recent Blockly versions): the interfaces' files override them.
                scripts.unshift({
                    id: "blockly_core_msg",
                    src: `/openInterface/interfaces/assets/js/external/blockly/msg/${_language}.js`
                });
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
                if (interfaceName == 'arduinoq') {
                    for (const _interface of ['arduino', 'python', 'web']) {
                        scripts.push({
                            id: _interface + "_block_msg",
                            src: `/openInterface/${_interface}/assets/js/blocks/msg/blocks/js/${_language}.js`
                        });
                    }
                }
                scripts.push({
                    id: interfaceName + "_block_msg",
                    src: `${SPECIFIC_MSG_PATH}/blocks/js/${_language}.js`
                });
                return scripts;
            };

            const LANG_SCRIPTS = GET_LANG_SCRIPTS(lng);
            const FALLBACK_LANG_SCRIPTS = GET_LANG_SCRIPTS('en');

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
                },
                {
                    id: "code_manager",
                    src: "/openInterface/interfaces/assets/js/main/CodeManager.js"
                },
            ];

            if (interfaceName == 'arduinoq') {
                COMMON_SCRIPTS.push({
                    id: "multi_code_manager",
                    src: "/openInterface/arduinoq/assets/js/main/MultiCodeManager.js"
                });
            }

            await WikiLoader.loadScripts(INTERFACE_SCRIPTS, 'InterfaceScripts');

            await WikiLoader.loadScripts(WIKI_SCRIPTS, 'WikiScripts');

            try {
                await WikiLoader.loadScripts(COMMON_LANG_SCRIPTS);
            } catch (e) {
                await WikiLoader.loadScripts(FALLBACK_COMMON_LANG_SCRIPTS);
            }

            try {
                await WikiLoader.loadScripts(LANG_SCRIPTS);
            } catch (e) {
                await WikiLoader.loadScripts(FALLBACK_LANG_SCRIPTS);
            }

            await WikiLoader.loadScripts(COMMON_SCRIPTS, 'CommonScripts');

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