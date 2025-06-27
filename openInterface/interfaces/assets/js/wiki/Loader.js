const WikiLoader = (function () {
    const LOADED_LIBRARIES = [];

    function registerLibraryLoaded(id) {
        // record the libs only if the array doesn't contain the same already
        if (LOADED_LIBRARIES.indexOf(id) === -1) {
            LOADED_LIBRARIES.push(id)
        }
    }

    function getScriptLoadingPromise({ id, src, defer = false, module = false }) {
        var script = document.createElement('script');
        return new Promise((resolve, reject) => {
            // once the lib is registered you can resolve immediatelly
            // because it means that is fully loaded
            if (LOADED_LIBRARIES.indexOf(id) != -1) {
                resolve(`${id} was loaded before`)
                return;
            }

            script.onerror = function onErrorLoadingScript() {
                reject(id);
            };

            script.addEventListener('load', function onLoadScript() {
                script.removeEventListener('load', onLoadScript);
                registerLibraryLoaded(id);
                resolve(id);
            });

            if (defer) script.setAttribute('defer', 'defer');
            if (module) script.setAttribute('type', 'module');
            script.id = id;
            script.src = src;
            document.head.appendChild(script);
        });
    }

    function checkLocalStorage() {
        const isInterface = document.querySelector('script[src="/interfaces/assets/js/main/ProjectManager.js"]') !== null;
        if (!isInterface) return;
        if (isLocalStorageAvailable()) return;
        location.href = `${location.origin}/public/noCookie.php`;
    }

    function isLocalStorageAvailable() {
        const test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    function loadScripts(scripts) {
        return new Promise(async (resolve, reject) => {
            checkLocalStorage();
            for (let script of scripts) {
                try {
                    await getScriptLoadingPromise(script);
                } catch (e) {
                    reject(e);
                    return;
                }
            }
            resolve();
        });
    }

    return {
        /**
         * Load scripts
         * @param {Array[{integer, string}]} scripts
         * @returns {Pormise}
         */
        loadScripts: function (scripts) {
            return loadScripts(scripts);
        }
    }
}());