var UserManager = (function () {
    var Manager = {};
    Manager.user = null;
    Manager.isLoadedUser = false

    function awaitLti13Controller() {
        return new Promise((resolve, reject) => {
            if (typeof lti13Controller === 'undefined') {
                setTimeout(() => {
                    resolve(awaitLti13Controller());
                }, 50);
                return;
            }
            resolve();
        });
    }

    /**
     * Offline (interface from the cache of /interfaces-sw.js): badge next to the project name, the actions needing an
     * account hidden (css: body.interface-offline)
     */
    function showOffline() {
        document.body.classList.add('interface-offline');
        const name = document.querySelector('#project-name');
        if (name && !document.querySelector('#offline-badge')) {
            const label = typeof i18next !== 'undefined' ? i18next.t('code.topbar.label.offline') : 'Offline';
            const tooltip = typeof i18next !== 'undefined' ? i18next.t('notifications.offline') : '';
            name.parentElement.insertAdjacentHTML('beforeend', `<span id="offline-badge" class="badge rounded-pill bg-secondary ms-1" role="img" aria-label="${label}" title="${label} : ${tooltip}"><i class="fas fa-wifi" aria-hidden="true"></i></span>`);
        }
    }
    window.addEventListener('offline', showOffline);
    window.addEventListener('online', () => {
        if (Manager.offline) {
            // opened offline, as a visitor: the account and its projects come back with a reload
            if (typeof VittaNotif !== 'undefined') new VittaNotif().displayNotification(null, i18next.t('notifications.backOnline'), 'bg-success');
            return;
        }
        document.body.classList.remove('interface-offline');
        document.querySelector('#offline-badge')?.remove();
    });

    function init() {
        var promiseToGetUser = new Promise(async function (resolve, reject) {
            let ltiSessionParam = '';
            if (typeof ltiVariables13 !== 'undefined' ) {
                await awaitLti13Controller();
                ltiSessionParam = lti13Controller.getSessionParameter();
            }
            if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
                Manager.user = null;
                Manager.isLoadedUser = true;
                resolve("done");
                return;
            }
            $.ajax({
                type: "GET",
                url: `/routing/Routing.php?controller=session${ltiSessionParam}`,
                success: function (response) {
                    if (response != "null") {
                        try {
                            Manager.user = JSON.parse(response); 
                            Manager.isLoadedUser = true;
                        } catch (e) {
                            Manager.user = null
                            Manager.isLoadedUser = true;
                        }
                    }
                    Manager.isLoadedUser = true;
                    resolve("done");
                },
                error: function (response) {
                    Manager.isLoadedUser = true;
                    // server unreachable (interface from the cache of /interfaces-sw.js): as a visitor.
                    // navigator.onLine is not enough: it stays true on a network without internet
                    if (response.status === 0) {
                        Manager.user = null;
                        Manager.offline = true;
                        showOffline();
                        resolve("offline");
                        return;
                    }
                    reject(response.status);
                }
            });
        });
        return promiseToGetUser;
    }

    return {
        /**
         * Init the user manager.
         * @returns {Promise}
         */
        init: function () {
            return init();
        },
        /**
         * Gets the signed in user.
         * @returns {User}
         */
        getUser: function () {
            return Manager.user;
        },
        isLoadedUser: function(){
            return Manager.isLoadedUser
        },
        /**
         * Whether the server is unreachable: interface opened offline (from the cache of /interfaces-sw.js)
         * @returns {boolean}
         */
        isOffline: function () {
            return !navigator.onLine || Manager.offline === true;
        }
    }

}());