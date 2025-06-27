class ProjectManagerVisitor extends ProjectManager {
    /**
     * Creates an instance of ProjectManagerVisitor.
     * @public
     */
    constructor() {
        super();
    }
    /**
     * Initialize local storage saved projects. 
     * [! NOT USED: Visitor need account to save his projects]
     * @private
     */
    _setMyProjects(container) {
        return new Promise((resolve, reject) => {
            if (!UserManager.getUser()) return resolve();
            if (window.localStorage[CodeManager.getSharedInstance()._lSaveStorage] === undefined) {
                this._myProjects = Array();
            } else if (this._lSaveStorage) {
                this._myProjects = JSON.parse(window.localStorage[this._lSaveStorage]);
            }
            resolve();
        });
    };
    /**
     * Update visitor projects in the localStorage. 
     * [! NOT USED: Visitor need account to save his projects]
     * @private
     */
    _updateProjects() {
        window.localStorage[CodeManager.getSharedInstance()._lSaveStorage] = JSON.stringify(this._myProjects);
    };
    /**
     * Save project in local storage, if projectName null save the current project.
     * [! NOT USED: Visitor need account to save his projects]
     * @public
     * @param {string} [projectName=null] 
     * @param {string} [projectDescription=null]
     * @returns {boolean}
     */
    saveProject(projectName = null, projectDescription = null) {
        if (projectName === null) {
            this.projectsFinder_updateProject();
            const result = this._getProjectByName(this._currentProject.name);
            if (result === null) {//It is not saved on local storage
                if (this._myProjects.length >= 10)
                    return VISITOR_PROJECTS_SIZE_ERROR;
                this._myProjects.push(this._createCopy(this._currentProject));
            } else
                this._myProjects[result.index] = this._createCopy(this._currentProject);
        } else {
            const matches = REG_PROJECT_NAME.test(projectName);
            const project = {
                'name': encodeURI(projectName),
                'dateUpdated': Math.floor(new Date() / 1000),
                'description': encodeURI(projectDescription),
                'code': CodeManager.getSharedInstance().getXml(),
                'codeText': CodeManager.getSharedInstance().getTextCode(),
                'codeManuallyModified': CodeManager.getSharedInstance().isCodeManuallyModified(),
                'public': false,
                'link': null,
                'user': null
            };
            const result = this._getProjectByName(project.name);
            if (matches != true)
                return PROJECT_NAME_ERROR;
            else if (result !== null)
                this._myProjects[result.index] = this._copyTo(this._myProjects[result.index], project);
            else if (this._myProjects.length >= 10)
                return VISITOR_PROJECTS_SIZE_ERROR;
            else
                this._myProjects.push(project);
            this._currentProject = this._createCopy(project);
        }
        this.projectsFinder_updateProject();
        this._updateProjects();
        return true;
    };
    /**
     * Return true if visitor has reached his quota of saved projects 
     * @public
     * @return {bool}
     */
    hasReachedQuota() {
        return (this._myProjects.length >= 10);
    };

}