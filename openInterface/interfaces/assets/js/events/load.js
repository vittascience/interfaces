var projectManager = null;
var rtcManager = null;
var VittaInterface = null;
var SerialAPI = null;
var Repl = null;

/**
 * Standard programming interfaces that use the common accessibility module
 * Excludes: ia, adacraft (non-standard structure)
 */
const STANDARD_A11Y_INTERFACES = [
    'arduino', 'bluebot', 'buddy', 'codey', 'cyberpi', 'eliobot', 'esp32',
    'galaxia', 'GalaxiaCircuitPython', 'l476', 'letsstartcoding', 'lotibot',
    'm5stack', 'mBot', 'microbit', 'nao', 'niryo', 'photon', 'pico', 'python',
    'raspberrypi', 'sphero', 'spike', 'thymio', 'TI-83', 'wb55', 'web', 'winky',
    'steami', 'alphai'
];

/**
 * Load interface.
 * @param {string} interfaceName 
 */
async function loadInterface(interfaceName) {

    let lng = 'en';
    if (getCookie('lng').length > 0) {
        lng = getCookie('lng');
    }

    const COMMON_BKY_MSG_PATH = `${CDN_PATH}/openInterface/interfaces/assets/js/msg`;
    const GET_COMMON_BKY_LANG_SCRIPTS = (language) => {
        let scripts;
        if (interfaceName == 'web') {
            scripts = [{
                id: "common_cat_msg",
                src: `${COMMON_BKY_MSG_PATH}/categories/${language}.js`
            }];
        } else {
            scripts = [{
                id: "common_block_msg",
                src: `${COMMON_BKY_MSG_PATH}/blocks/basic/${language}.js`
            }, {
                id: "common_cat_msg",
                src: `${COMMON_BKY_MSG_PATH}/categories/${language}.js`
            }];
            if (['arduino', 'esp32', 'galaxia', 'pico', 'm5stack'].includes(interfaceName)) {
                scripts.push({
                    id: "common_esp32_block_msg",
                    src: `${COMMON_BKY_MSG_PATH}/blocks/esp32/${language}.js`
                })
            }
        }
        return scripts;
    };

    const COMMON_BKY_LANG_SCRIPTS = GET_COMMON_BKY_LANG_SCRIPTS(lng);
    const FALLBACK_COMMON_BKY_LANG_SCRIPTS = GET_COMMON_BKY_LANG_SCRIPTS('en');

    const COMMON_ACE_MSG_PATH = `${CDN_PATH}/openInterface/interfaces/assets/js/autocomplete`;
    const GET_COMMON_ACE_LANG_SCRIPTS = (language) => {
        let scripts = [];
        if (['cyberpi', 'esp32', 'esp8266', 'galaxia', 'l476', 'm5stack', 'microbit', 'pico', 'wb55'].includes(interfaceName)) {
            scripts.push({
                id: "common_ace_msg",
                src: `${COMMON_ACE_MSG_PATH}/mpy/${language}.js`
            });
            if (['cyberpi', 'esp32', 'esp8266', 'galaxia', 'm5stack', 'pico'].includes(interfaceName)) {
                scripts.push({
                    id: "common_esp32_ace_msg",
                    src: `${COMMON_ACE_MSG_PATH}/esp32/${language}.js`
                });
            }
            if (['l476', 'wb55'].includes(interfaceName)) {
                scripts.push({
                    id: "common_stm32_ace_msg",
                    src: `${COMMON_ACE_MSG_PATH}/stm32/${language}.js`
                });
            }
        } else if (['arduino', 'mBot', 'letsstartcoding'].includes(interfaceName)) {
            scripts.push({
                id: "common_ace_msg",
                src: `${COMMON_ACE_MSG_PATH}/arduino/${language}.js`
            });
        }
        return scripts;
    }

    const COMMON_ACE_LANG_SCRIPTS = GET_COMMON_ACE_LANG_SCRIPTS(lng);
    const FALLBACK_COMMON_ACE_LANG_SCRIPTS = GET_COMMON_ACE_LANG_SCRIPTS('en');

    const SPECIFIC_MSG_PATH = `/openInterface/${interfaceName}/assets/js/blocks/msg`;
    const GET_BKY_LANG_SCRIPTS = (language) => {
        let scripts = [];
        if (['web', 'TI-83'].includes(interfaceName)) {
            scripts.push({
                id: "cat_msg",
                src: `${SPECIFIC_MSG_PATH}/categories/js/${language}.js`
            });
        }
        if (interfaceName == 'steami') {
            scripts.push({
                id: "block_msg",
                src: `/openInterface/wb55/assets/js/blocks/msg/blocks/js/${language}.js`
            });
        }
        scripts.push({
            id: "block_msg",
            src: `${SPECIFIC_MSG_PATH}/blocks/js/${language}.js`
        });
        return scripts;
    };

    const LANG_SCRIPTS = GET_BKY_LANG_SCRIPTS(lng);
    const FALLBACK_LANG_SCRIPTS = GET_BKY_LANG_SCRIPTS('en');

    const SPECIFIC_ACE_MSG_PATH = `${CDN_PATH}/openInterface/${interfaceName}/assets/js/autocomplete`;
    const GET_ACE_LANG_SCRIPTS = (language) => {
        let scripts = [];
        if (['microbit', 'galaxia', 'steami'].includes(interfaceName)) {
            scripts.push({
                id: "specific_ace_msg",
                src: `${SPECIFIC_ACE_MSG_PATH}/${language}.js`
            });
        }
        return scripts;
    };

    const ACE_LANG_SCRIPTS = GET_ACE_LANG_SCRIPTS(lng);
    const FALLBACK_ACE_LANG_SCRIPTS = GET_ACE_LANG_SCRIPTS('en');

    // Fill this array with all the scripts that are common in all the interfaces. Feal free to add module and/or defer property to true to add those properties to the script tag (it is not mandatory to add those two properties)
    const COMMON_SCRIPTS = [
        {
            id: "vitta_storage",
            src: `${CDN_PATH}/interfaces/assets/js/utils/VittaStorage.js`,
            defer: false,
            module: false,
        }
    ];

    const UTILS_SCRIPTS = [{
        id: "public_converter",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/styling/converter.js`
    }, {
        id: "access_styling",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/styling/accessibility.js`
    }];

    const EVENTS_SCRIPTS = [
        {
            id: "public_styling",
            src: `${CDN_PATH}/openInterface/interfaces/assets/js/styling/style.js`
        },
        {
            id: "public_buttons",
            src: `${CDN_PATH}/openInterface/interfaces/assets/js/events/buttons.js`,
        }
    ];

    const ACE_AUTOCOMPLETE_SCRIPTS = [{
        id: "interface_autocomplete",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/autocomplete/InterfaceAutocomplete.js`
    }];

    try {
        await Loader.loadScripts(COMMON_BKY_LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_COMMON_BKY_LANG_SCRIPTS);
    }

    try {
        await Loader.loadScripts(ACE_AUTOCOMPLETE_SCRIPTS);
    } catch (e) {
        console.error("ACE Autocomplete scripts failed to load: " + e);
        failedToLoad();
        return;
    }

    try {
        await Loader.loadScripts(COMMON_ACE_LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_COMMON_ACE_LANG_SCRIPTS);
    }

    if (INTERFACE_NAME == 'web') {
        try {
            await Loader.loadScripts([{
                id: 'web_message_script',
                src: `${CDN_PATH}/openInterface/web/assets/js/external/blockly/msg/js/${lng}.js`
            }]);
        } catch (e) {
            console.error("Web message script failed to load: " + e);
            failedToLoad();
            return;
        }
    }

    try {
        await Loader.loadScripts(LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_LANG_SCRIPTS);
    }

    try {
        await Loader.loadScripts(ACE_LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_ACE_LANG_SCRIPTS);
    }

    try {
        await UIManager.init();
    } catch (e) {
        console.error("UIManager failed to load: " + e);
        failedToLoad();
        return;
    }

    try {
        await Loader.loadScripts(UTILS_SCRIPTS);
    } catch (e) {
        console.error("Utils scripts failed to load: " + e);
        failedToLoad();
        return;
    }

    try {
        await Main.init(interfaceName);
    } catch (e) {
        console.error(e);
        console.error(`Main interface ${interfaceName} failed to load: ` + e);
        failedToLoad();
        return;
    }

    try {
        await Loader.loadScripts(EVENTS_SCRIPTS);
    } catch (e) {
        // In LTI, on Firefox, the scripts loaded by loadScripts raise onerror, so we escape the page reload
        if (typeof ltiVariables13 === 'undefined') {
            console.error("Events scripts failed to load: " + e);
            failedToLoad();
            return;
        }
        console.warn('LTI Issue — escaping error for ' + e);
    }

    // Loading all the scripts that are shared by all the interfaces (TO BE FILLED WITH ALL THE COMMON SCRIPTS)
    try {
        await Loader.loadScripts(COMMON_SCRIPTS);
    } catch (e) {
        console.error(`CommonScripts loading error: ${e}`);
    }

    // Load standard accessibility module for programming interfaces
    if (STANDARD_A11Y_INTERFACES.includes(interfaceName)) {
        try {
            await import(`${CDN_PATH}/openInterface/interfaces/assets/js/utils/accessibility/std-a11y.js`);
        } catch (e) {
            console.error(`Accessibility module loading error: ${e}`);
        }
    }

    //updateTooltips();
    await loadingPrivate(interfaceName);
    VittaInterface = new InterfaceInit(interfaceName);
    await VittaInterface.init();
    window.VittaInterface = VittaInterface;
    //checkBlockMsg();
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

/**
 * Check the right definition of all blocks messages.
 */
function checkBlockMsg() {
    if (Blockly.vittaBlocks) {
        for (var cat in Blockly.vittaBlocks) {
            const blocks = Blockly.vittaBlocks[cat]
            for (var i in blocks) {
                if (blocks[i].message0) {
                    const id_msg = blocks[i].message0.slice(6, blocks[i].message0.length - 1)
                    const msg = Blockly.Msg[id_msg];
                    if (!msg) {
                        console.warn("No entry for message '" + id_msg + "'");
                    }
                }
            }
        }
    }
}

function updateTooltips() {
    // select the target node
    var target = document.querySelectorAll(`.project-data span[data-bs-toggle="tooltip"]`);
    // create an observer instance
    function callback(mutations) {
        for (let mutation of mutations) {
            if (mutation.attributeName != "data-bs-title") continue;
            // We need only first event and only new value of the title
            let elm = mutation.target.id;
            let content = mutation.target.attributes["data-bs-title"].value;
            $("#" + elm).tooltip("dispose").tooltip({ title: content })
        }
    }
    var observer0 = new MutationObserver(callback);
    var observer1 = new MutationObserver(callback);

    // configuration of the observer:
    var config = { attributes: true };

    // pass in the target node, as well as the observer options
    observer0.observe(target[0], config);
    observer1.observe(target[1], config);
}