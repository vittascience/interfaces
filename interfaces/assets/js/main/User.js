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
        }
    }

}());