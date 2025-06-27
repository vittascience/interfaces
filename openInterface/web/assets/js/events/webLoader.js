class WebLoader {
    constructor() {
        this._interfaceLoaded = false;
        this._userLoaded = false;
        // this._modalsLoaded = false;
    }

    init() {
        this.loadUser();
        this.loadInterface();
        // this._setupModals();
    }

    loadUser() {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof UserManager === 'undefined') {
                    setTimeout(() => {
                        resolve(this.loadUser());
                    }, 50);
                    console.warn(`The UserManager class isn't already available. Delaying it's initialization...`);
                    return;
                }
                await UserManager.init();
                this._userLoaded = true;
                resolve();
            } catch(error) {
                console.error(error);
                reject(error);
            }
        });
    }

    loadInterface() {
        return new Promise(async (resolve, reject) => {
            try {
                await loadInterface('web');
                this._interfaceLoaded = true;
                resolve();
            } catch(error) {
                console.error(error);
                reject(error);
            }
        });
    }

    checkDomLoaded() {
        return document.readyState === "interactive" || document.readyState === "complete";
    }

    // async _setupModals() {
    //     await awaitJsonPath();
    //     if (typeof backModals === 'undefined' || typeof stdModals === 'undefined') {
    //         setTimeout(() => {
    //             this._setupModals();
    //         }, 50);
    //         return;
    //     }
    //     $.each(backModals, (element, modal) => {
    //         document.querySelector('body').appendChild(new Modal(element, modal));
    //     });
    //     $.each(stdModals, (element, modal) => {
    //         document.querySelector('body').appendChild(new Modal(element, modal));
    //     });
    //     $(".vitta-modal").draggable();
    //     this._modalsLoaded = true;
    //     return true;
    // }
}

window.webLoader = new WebLoader();
window.webLoader.init();