import { getSocket } from 'https://cdn.ac-paris.fr/capytale/contracts/1.0/app-agent.min.js';


class CapytaleManager {
    constructor() {
        this._socket = getSocket();
        globalThis.appSocket = this._socket;
        this._project = null;
        this._initialLoading = false;
        this._capytaleDocumentationUrl = 'https://capytale.forge.apps.education.fr/documentation/';
        this._capytaleInterfacesDocSlug = {
            arduino: 'Arduino', 
            bluebot: 'Bluebot', 
            buddy: 'Buddy', 
            cyberpi: 'Cyberpi', 
            eliobot: 'Eliobot', 
            esp32: 'ESP32', 
            galaxia: 'Galaxia', 
            l476: 'L476', 
            lotibot: 'Lotibot', 
            m5stack: 'M5stack', 
            mBot: 'Mbot', 
            microbit: 'Microbit', 
            nao: '', 
            niryo: '', 
            pico: 'Pipico', 
            photon: 'Photon', 
            python: 'Bloc_python', 
            raspberrypi: '', 
            sphero: 'Sphero', 
            spike: 'Lego', 
            thymio: 'Thymio', 
            wb55: 'Wb55', 
            web: '', 
            winky: ''
        };
    }

    init() {
        this._socket.plug(
            ['simple-content(json):1', 'reload:1'],
            ([mp_sc, mp_r]) => {     
                return [
                {
                    loadContent: (c) => {
                        this._loadProject(c);
                    },
                    getContent() {      
                        return projectManager.getCurrentProjectDataForAppAgent();
                    },
                    contentSaved() {
                        // console.log('Content saved in platform!');
                    }
                },
                {
                    reloaded: (state) => {
                        this._loadProject(state.project);
                    }
                }
                ];
            }
        );
        this._feedbackSetup();
        this._socket.plugsDone();
    }

    _feedbackSetup() {
        try {
            this._socket.use(
                ['simple-content(json)', 'reload'],
                ([mp_sc, mp_r]) => {
                    this.contentChanged = () => {
                        mp_sc.i.contentChanged();
                    };
                    this.reload = (newUrl = null, reloadArgument) => {
                        mp_r.i.reload(newUrl, reloadArgument);
                    };
                }
            );
        } catch(error) {
            console.error(error);
        }
    }

    async _loadProject(project) {
        this._initialLoading = true;
        if (project) {
            this._project = project;
            project.name = 'capytale-project';
            project.description = 'capytale-project';
            project.sharedStatus = 0;
        }
        if (!projectManager || !projectManager.projectLoader_injectInInterface) {
            this._initialLoading = false;
            return false;
        }
        // localStorage.removeItem(`${INTERFACE_NAME}CurrentProject`); // TEMPORARY COMMENTED, TO BE DELETED AFTER LOCALSTORAGE REWORK
        if (project) {
            projectManager._currentProject = project;
            await projectManager.projectLoader_injectInInterface(project);
        } else {
            projectManager._initializeInterfaceProject();
        }
        this.setInitialLoading(false);
        return true;
    }

    getInitialLoading() {
        return this._initialLoading;
    }

    setInitialLoading(isInitialLoading) {
        const isInitialLoadingType = typeof isInitialLoading;
        if (isInitialLoadingType !== 'boolean') {
            console.error(`The provided argument must be a boolean, ${isInitialLoadingType} provided!`);
            return;
        }
        this._initialLoading = isInitialLoading;
    }

    getWelcomeMessage() {
        const fullLink = this._getWikiUrl();
        let defaultWelcomeMessage = i18next.t(`code.welcome.${INTERFACE_NAME}`);
        let replacedMessage = defaultWelcomeMessage.replace(/href="[^"]*"/g, `href="${fullLink}"`);
        if (defaultWelcomeMessage !== replacedMessage) return replacedMessage;
        replacedMessage = `${defaultWelcomeMessage} <a href="${fullLink}" target="_blank" rel="noopener noreferrer">${i18next.t('code.topbar.label.help')}</a>`;
        return replacedMessage;
    }

    openInterfaceHelp() {
        const wikiUrl = this._getWikiUrl();
        window.open(wikiUrl, '_blank').focus();
    }

    _getWikiUrl() {
        let currentInterfaceDocSlug = this._capytaleInterfacesDocSlug[INTERFACE_NAME];
        if (!currentInterfaceDocSlug || currentInterfaceDocSlug === '') currentInterfaceDocSlug = 'Activites';
        return `${this._capytaleDocumentationUrl}${currentInterfaceDocSlug}`;
    }
}

globalThis.capytaleManager = new CapytaleManager();
globalThis.capytaleManager.init();
