/**
 * This class is responsible of the interaction with the localStorage for local project saving
 */

class LocalStorageManager {
    constructor() {
        if (LocalStorageManager._instance) return LocalStorageManager._instance;
        LocalStorageManager._instance = this;
        this._MAX_HISTORY = 50;
    }


    /**
     * Generate and add the local project id to the url if there isn't already one - Doesn't apply to linked projects
     * @private
     * @returns {undefined} In early return case
     */
    addLocalId() {
        const newUrl = new URL(window.location.href);
        if ($_GET('link')) {
            newUrl.searchParams.delete('localId');
        } else if ($_GET('localId')) {
            return;
        } else {
            const currentId = this.uniqid('loc');
            newUrl.searchParams.set('localId', currentId);
        }
        window.history.pushState({}, '', newUrl);
    }

    /**
     * Generate a unique ID exactly as php's uniqid function would
     * @public
     * @param {String} prefix - A string that is prefixed to the generated id
     * @param {boolean} random - [Optional] Improves the unicity of the result, false by default
     * @returns {String} - The generated ID
     */
    uniqid(prefix = '', random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:''}`;
    };

    /**
     * Remove the localId parameter in URL query string
     * @public
     * @returns {undefined} Early return case
     */
    removeLocalId() {
        if (!$_GET('localId')) return;
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('localId');
        window.history.pushState({}, '', newUrl);
    }

    /**
     * Save a project in the localStorage
     * @public
     * @param {object} project - The project to save in localStorage
     * @param {string} id [OPTIONAL] - The local id of the project to save in localStorage (The current project id by default)
     * @returns {boolean} false if the process failed
     */
    setLocalProject(project, id = false) {
        const projectType = typeof project;
        if (projectType !== 'object') {
            console.error(`The provided argument must be an object, ${projectType} provided!`);
            return false;
        }
        let currentProjectId = $_GET('link') || $_GET('localId');
        if (id) currentProjectId = id;
        if (currentProjectId === null) {
            console.warn('No link or localId! Skipping localStorage synchronization...');
            return false;
        }
        const currentLocalProjects = this.getLocalProjects();
        let currentLocalProject;
        for (let i = 0; i<currentLocalProjects.length; i++) {
            if (currentLocalProjects[i].id === currentProjectId) {
                currentLocalProject = currentLocalProjects.splice(i, 1)[0];
                break;
            }
        }
        if (!currentLocalProject) currentLocalProject = {};
        currentLocalProject.id = currentProjectId;
        currentLocalProject.project = project;
        currentLocalProject.lastUpdated = Date.now();
        currentLocalProjects.push(currentLocalProject);
        if (currentLocalProjects.length > this._MAX_HISTORY) currentLocalProjects.shift();
        localStorage.setItem(`${INTERFACE_NAME}Projects`, JSON.stringify(currentLocalProjects));
    }

    /**
     * Get a local project from the database
     * @public
     * @param {string} id [OPTIONAL] - The id of the project (the current localId by default)
     * @returns {object|boolean} The project found, false otherwise
     */
    getLocalProject(id = false) {
        if (!id) id = $_GET('link') || $_GET('localId');
        const currentLocalProjects = this.getLocalProjects();
        let foundProject = false;
        for (let i = 0; i<currentLocalProjects.length; i++) {
            if (currentLocalProjects[i].id === id) {
                foundProject = currentLocalProjects[i];
                break;
            }
        }
        return foundProject;
    }

    /**
     * Get a project from the localStorage (the pure interface project)
     * @public
     * @param {string} id [OPTIONAL] - The id of the project (the current localId by default) 
     * @returns {object|boolean} The project found, false otherwise
     */
    getLocalProjectContent(id = false) {
        const localProject = this.getLocalProject(id);
        if (!localProject) return false;
        return localProject.project;
    }

    /**
     * Remove a project from the localStorage
     * @public
     * @param {string} id [OPTIONAL] - The id of the project (the current localId by default)
     * @returns {boolean} true in success, false otherwise
     */
    deleteLocalProject(id = false) {
        if (!id) id = $_GET('link') || $_GET('localId');
        const currentLocalProjects = this.getLocalProjects();
        for (let i = 0; i<currentLocalProjects.length; i++) {
            if (currentLocalProjects[i].id === id) {
                currentLocalProjects.splice(i, 1)[0];
                localStorage.setItem(`${INTERFACE_NAME}Projects`, JSON.stringify(currentLocalProjects));
                return true;
            }
        }
        return false;
    }


    /**
     * Get all the projects for the current interface from the localstorage
     * @public
     * @returns {array} All the projects for the current interface from the localstorage
     */
    getLocalProjects() {
        let currentLocalProjects;
        try {
            currentLocalProjects = JSON.parse(localStorage.getItem(`${INTERFACE_NAME}Projects`));
        } catch (error) {
            console.error(error);
            console.warn('Erasing compromised localStorage...');
            currentLocalProjects = null;
        }
        if (!currentLocalProjects) {
            currentLocalProjects = [];
            localStorage.setItem(`${INTERFACE_NAME}Projects`, JSON.stringify(currentLocalProjects));
        }
        return currentLocalProjects;
    }

    /**
     * Convert the localProject (saved only in localStorage) in linked one (saved in backend)
     * @public
     * @param {string} projectLink - The project link
     * @returns {undefined} Early return case
     */
    convertLocalProjectToLink(projectLink) {
        const projectLinkType = typeof projectLink;
        if (projectLinkType !== 'string') {
            console.error(`The provided argument must be a string, ${projectLinkType} provided!`);
            return;
        }
        const localId = $_GET('localId');
        if (!localId) return;
        const oldLocalProject = this.getLocalProject(localId);
        this.deleteLocalProject(localId);
        this.removeLocalId();
        this.setLocalProject(oldLocalProject.project, projectLink);
    }
}