function jsonPath(stringPath) {
    if (typeof i18next === 'undefined' || typeof i18next.store === 'undefined' || !i18next.store.data[i18next.language]) {
        console.error(`[jsonPath] i18next isn't already initialized, use awaitJsonPath()!`);
        return '';
    }
    const i18nextOutput = i18next.t(stringPath);
    if (typeof i18nextOutput !== 'undefined') {
        return i18nextOutput;
    }
    const pathArray = stringPath.split('.');
    let currentStore = i18next.store.data[i18next.language].translation;
    pathArray.map((currentPath) => {
        currentStore = currentStore[currentPath];
    });
    if (typeof currentStore === 'undefined') {
        console.error(`${stringPath} doesn't exist for the current language!`);
        return;
    }
    return currentStore;
};

/**
 * Resolve when i18next is fully loaded
 */
async function awaitJsonPath() {
    while (typeof i18next === 'undefined' || typeof i18next.store === 'undefined' || !i18next.store.data[i18next.language]) {
        await new Promise(r => setTimeout(r, 100));
    }
    return true;
}