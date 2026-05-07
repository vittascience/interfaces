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
        for (let i = 0; i < currentLocalProjects.length; i++) {
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

        return this._evictUntilFits(currentLocalProjects, currentProjectId);
    }

    /**
     * Remove the oldest projects from the current interface until the serialized data
     * fits in the localStorage quota, then persist.
     * If the current interface alone is not enough, evicts projects from other interfaces
     * by ascending lastUpdated order.
     * The current project (currentProjectId) is never evicted.
     * @private
     * @param {Array} projects - Projects array of the current interface (oldest first)
     * @param {string} currentProjectId - Project ID to protect from eviction
     * @returns {boolean} false if the current project alone exceeds the quota
     */
    _evictUntilFits(projects, currentProjectId) {
        const storageKey = `${INTERFACE_NAME}Projects`;

        // Phase 1 : evict from the current interface
        while (projects.length > 0) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(projects));
                return true;
            } catch (e) {
                if (!this._isQuotaExceeded(e)) {
                    console.error('localStorage: unexpected error', e);
                    return false;
                }
            }

            const evictIndex = projects.findIndex(p => p.id !== currentProjectId);
            if (evictIndex === -1) break; // Only the current project remains, move to phase 2

            console.warn(`localStorage: quota exceeded, deleting project "${projects[evictIndex].id}" from "${INTERFACE_NAME}".`);
            projects.splice(evictIndex, 1);
        }

        // Phase 2 : evict from other interfaces, oldest project first across all of them
        return this._evictFromOtherInterfaces(storageKey, projects, currentProjectId);
    }

    /**
     * Evict projects from other interfaces in the localStorage, picking the oldest
     * project across all other interfaces at each step, until the current interface
     * data fits or no more candidates remain.
     * @private
     * @param {string} storageKey - The localStorage key of the current interface
     * @param {Array} projects - Projects array of the current interface (may be reduced to current project only)
     * @param {string} currentProjectId - Project ID to protect from eviction
     * @returns {boolean} false if even after full eviction the current project does not fit
     */
    _evictFromOtherInterfaces(storageKey, projects, currentProjectId) {
        // Build a map of { key, projects[] } for every other interface found in localStorage
        const otherInterfaces = this._getOtherInterfacesProjects(storageKey);

        while (true) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(projects));
                return true;
            } catch (e) {
                if (!this._isQuotaExceeded(e)) {
                    console.error('localStorage: unexpected error', e);
                    return false;
                }
            }

            // Find the oldest project across all other interfaces
            let oldestEntry = null; // { interfaceKey, projectIndex, lastUpdated }
            for (const [interfaceKey, interfaceProjects] of Object.entries(otherInterfaces)) {
                if (interfaceProjects.length === 0) continue;
                const candidate = interfaceProjects[0]; // Already sorted oldest-first
                if (!oldestEntry || candidate.lastUpdated < oldestEntry.lastUpdated) {
                    oldestEntry = { interfaceKey, projectIndex: 0, lastUpdated: candidate.lastUpdated };
                }
            }

            if (!oldestEntry) {
                // Nothing left to evict anywhere
                console.error('localStorage: current project exceeds the total localStorage quota, skipping save.');
                return false;
            }

            const { interfaceKey } = oldestEntry;
            const evicted = otherInterfaces[interfaceKey].shift();
            console.warn(`localStorage: quota exceeded, deleting project "${evicted.id}" from "${interfaceKey}".`);
            localStorage.setItem(interfaceKey, JSON.stringify(otherInterfaces[interfaceKey]));
        }
    }

    /**
     * Retrieve and parse all localStorage keys that belong to other interfaces
     * (keys ending with "Projects" excluding the current interface key),
     * with their projects sorted by ascending lastUpdated.
     * @private
     * @param {string} currentStorageKey - The localStorage key of the current interface to exclude
     * @returns {Object} A map of { [interfaceKey]: sortedProjects[] }
     */
    _getOtherInterfacesProjects(currentStorageKey) {
        const result = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === currentStorageKey || !key.endsWith('Projects')) continue;
            try {
                const parsed = JSON.parse(localStorage.getItem(key));
                if (Array.isArray(parsed)) {
                    result[key] = parsed.sort((a, b) => (a.lastUpdated ?? 0) - (b.lastUpdated ?? 0));
                }
            } catch(e) {
                // Ignore malformed keys
                console.warn(`localStorage: skipping malformed entry "${key}".`, e);
            }
        }
        return result;
    }

    /**
     * Check whether a caught error is a localStorage quota exceeded error
     * @private
     * @param {Error} e - The caught error
     * @returns {boolean}
     */
    _isQuotaExceeded(e) {
        return e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED';
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