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

            // Same messages, in the same order, as the interface (utils/misc.js, also used by events/load.js).
            const COMMON_LANG_SCRIPTS = getBlocklyMsgScripts(interfaceName, lng).common;
            const FALLBACK_COMMON_LANG_SCRIPTS = getBlocklyMsgScripts(interfaceName, 'en').common;
            const LANG_SCRIPTS = getBlocklyMsgScripts(interfaceName, lng).specific;
            const FALLBACK_LANG_SCRIPTS = getBlocklyMsgScripts(interfaceName, 'en').specific;

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