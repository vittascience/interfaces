function dateAsText(date = '') {
    return "<span data-i18n='[html]code.popups.openProject.categories.projectsList.modify'> Modifié le </span>" + new Date(date).toLocaleDateString(getCookie('lng'), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function generateRandomString(length = 10) {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(getRandomInt(characters.length - 1));
    }
    return randomString;
};

function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};

/**
 * Promise for waiting during condition.
 * @param {Boolean} conditionFunction
 * @param {int} [delay=5] delay
 * @return {Promise}
 */
function waitFor(conditionFunction, delay = 5) {
    // console.log(conditionFunction.toString()) //! debug
    const poll = resolve => {
        if (conditionFunction()) {
            resolve();
        } else {
            setTimeout(_ => poll(resolve), delay);
        }
    }
    return new Promise(poll);
};

/**
 * Promise for waiting (in seconds).
 * @param {int} s
 * @return {Promise}
 */
function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
};

/**
 * Promise for waiting (in milliseconds).
 * @param {int} ms
 * @return {Promise}
 */
function sleep_ms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Round value with specified decimals.
 * @param {number} value
 * @param {int} digits
 * @return {number}
 */
function roundFloat(value, digits = 2) {
    const f = Math.pow(10, digits);
    return Math.round(value * f) / f;
};

/**
 * Round value with specified decimals.
 * @param {Uint8Array} u8
 * @return {string} base64
 */
function uint8ToBase64(u8) {
    let s = "";
    const chunk = 0x8000;
    for (let i = 0; i < u8.length; i += chunk) {
        const part = u8.subarray(i, i + chunk);
        s += String.fromCharCode(...part);
    }
    return btoa(s);
};

/**
* Generate clickable link.
* @param {string} url
* @param {string} text
* @return {string} element
*/
function setClickableLink(url, text) {
    return `<b><a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--vitta-blue-dark);">${text}</a></b>`;
}

/**
 * Blockly messages of an interface for a language, in loading order. common: Blockly's own messages (the next files
 * override them), the categories and the basic blocks. specific: the interface's own, after those of the interfaces
 * it borrows blocks from. Shared by the interfaces (events/load.js) and the wiki (wiki/load.js): both load the same.
 * @param {string} interfaceName
 * @param {string} language
 * @return {{common: Array<{id: string, src: string}>, specific: Array<{id: string, src: string}>}}
 */
function getBlocklyMsgScripts(interfaceName, language) {
    const COMMON_PATH = `${CDN_PATH}/openInterface/interfaces/assets/js/msg`;
    const SPECIFIC_PATH = `${_PATH}/${interfaceName}/assets/js/blocks/msg`;
    // interfaces using blocks of other interfaces (unihiker: micro:bit modules and AI blocks of Python)
    const BORROWED = { steami: ['wb55'], unihiker: ['microbit', 'python'], arduinoq: ['arduino', 'python', 'web'] };
    const common = [{ id: "blockly_core_msg", src: `${CDN_PATH}/openInterface/interfaces/assets/js/external/blockly/msg/${language}.js` }];
    if (interfaceName != 'web') {
        common.push({ id: "common_block_msg", src: `${COMMON_PATH}/blocks/basic/${language}.js` });
    }
    common.push({ id: "common_cat_msg", src: `${COMMON_PATH}/categories/${language}.js` });
    if (['arduino', 'esp32', 'galaxia', 'pico', 'm5stack'].includes(interfaceName)) {
        common.push({ id: "common_esp32_block_msg", src: `${COMMON_PATH}/blocks/esp32/${language}.js` });
    }
    const specific = [];
    if (['web', 'TI-83'].includes(interfaceName)) {
        specific.push({ id: "cat_msg", src: `${SPECIFIC_PATH}/categories/js/${language}.js` });
    }
    for (const other of BORROWED[interfaceName] || []) {
        specific.push({ id: other + "_block_msg", src: `${CDN_PATH}/openInterface/${other}/assets/js/blocks/msg/blocks/js/${language}.js` });
    }
    specific.push({ id: "block_msg", src: `${SPECIFIC_PATH}/blocks/js/${language}.js` });
    return { common, specific };
}
