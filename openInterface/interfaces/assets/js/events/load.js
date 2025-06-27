var projectManager = null;
var rtcManager = null;
var VittaInterface = null;
var SerialAPI = null;
var Repl = null;

/**
 * Load interface.
 * @param {string} interfaceName 
 */
async function loadInterface(interfaceName) {

    let lng = 'en';
    if (getCookie('lng').length > 0) {
        lng = getCookie('lng');
    }

    let COMMON_LANG_SCRIPTS = [{
        id: "common_block_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/blocks/${lng}.js`
    }, {
        id: "common_cat_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/categories/${lng}.js`
    }];

    let FALLBACK_COMMON_LANG_SCRIPTS = [{
        id: "common_block_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/blocks/en.js`
    }, {
        id: "common_cat_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/categories/en.js`
    }];

    if (INTERFACE_NAME == 'web') {
        COMMON_LANG_SCRIPTS = [{
            id: "common_cat_msg",
            src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/categories/${lng}.js`
        }];
    
        FALLBACK_COMMON_LANG_SCRIPTS = [{
            id: "common_cat_msg",
            src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/categories/en.js`
        }];
    }

    const COMMON_ESP32_LANG_SCRIPTS = [{
        id: "common_esp32_block_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/blocks/esp32/${lng}.js`
    }];

    const FALLBACK_COMMON_ESP32_LANG_SCRIPTS = [{
        id: "common_esp32_block_msg",
        src: `${CDN_PATH}/openInterface/interfaces/assets/js/msg/blocks/esp32/en.js`
    }];

    const LANG_SCRIPTS = [{
        id: "cat_msg",
        src: `${CDN_PATH}/openInterface/${interfaceName}/assets/js/blocks/msg/categories/js/${lng}.js`
    }, {
        id: "block_msg",
        src: `${CDN_PATH}/openInterface/${interfaceName}/assets/js/blocks/msg/blocks/js/${lng}.js`
    }];

    const FALLBACK_LANG_SCRIPTS = [{
        id: "cat_msg",
        src: `${CDN_PATH}/openInterface/${interfaceName}/assets/js/blocks/msg/categories/js/en.js`
    }, {
        id: "block_msg",
        src: `${CDN_PATH}/openInterface/${interfaceName}/assets/js/blocks/msg/blocks/js/en.js`
    }];

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

    try {
        await Loader.loadScripts(COMMON_LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_COMMON_LANG_SCRIPTS);
    }

    if (INTERFACE_NAME == 'web') {
        await Loader.loadScripts([{id: 'web_message_script', src: `${CDN_PATH}/openInterface/web/assets/js/external/blockly/msg/js/${lng}.js`}]);
    }

    try {
        await Loader.loadScripts(COMMON_ESP32_LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_COMMON_ESP32_LANG_SCRIPTS);
    }

    try {
        await Loader.loadScripts(LANG_SCRIPTS);
    } catch (e) {
        await Loader.loadScripts(FALLBACK_LANG_SCRIPTS);
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
    //updateTooltips();
    loadingPrivate(interfaceName);
    VittaInterface = new InterfaceInit(interfaceName);
    VittaInterface.init();
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