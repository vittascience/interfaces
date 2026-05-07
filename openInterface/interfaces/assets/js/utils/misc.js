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
 * @return {Promise}
 */
function waitFor(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) {
            resolve();
        } else {
            setTimeout(_ => poll(resolve), 5);
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
