class ProjectManagerUser extends ProjectManager {
    /**
     * Creates an instance of ProjectManagerUser.
     * @public
     * @param {*} user
     */
    constructor(user) {
        super();
        this._user = user;
        this._savingQueue = Promise.resolve();
        this._setupUnsavedChangesGuard();
    }
    /**
     * Initialize user saved projects.
     * @private
     */
    _setMyProjects(container) {
        return new Promise((resolve, reject) => {
            var callBack = function (thisInstance, response) {
                // Backend failure.
                if (response === null || response.error_message != undefined) {
                    thisInstance._errors[GET_USER_PROJECTS_ERROR] = "error";
                    thisInstance._myProjects = Array();
                } else {
                    thisInstance._myProjects = (response.length == 0) ? Array() : response;
                }
                resolve();
            };
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=get_by_user",
                data: {
                    "interface": container._interface
                },
                dataType: "JSON",
                success: function (response) {
                    callBack(container, response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    _writeProjectToDataBase(container, project, isCopy = false) {
        return new Promise((resolve, reject) => {
            const callback = (response, project) => {
                project.link = response.link;
                project.id = response.id;
                project.user = response.user;
                project.dateUpdated = response.dateUpdated;
                const projectAlreadyExists = this.getProjectAlreadyExistLocally(project);
                this.localStorageManager.convertLocalProjectToLink(project.link);
                if (!projectAlreadyExists) {
                    this._myProjects.push(project);
                }
                if (INTERFACE_NAME === 'ai') {
                    return;
                }
                if (Main.inIframe()) {
                    window.localStorage.saveProject = JSON.stringify(response)
                }
                this.localStorageManager.setLocalProject(project);
            };
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=add",
                data: {
                    'name': decodeURI(project.name),
                    'description': decodeURI(project.description),
                    'code': project.code,
                    'dateUpdated': new Date(),
                    'codeText': project.codeText,
                    'codeManuallyModified': project.codeManuallyModified ? project.codeManuallyModified : false,
                    'public': project.public,
                    'mode': project.mode,
                    'interface': INTERFACE_NAME === 'ai' ? 'ai' : (window.location.pathname).split('/')[1],
                    'sharedStatus': 0,
                    'options': JSON.stringify(project.options)
                },
                dataType: "JSON",
                success: function (response) {
                    const errorStatus = container._getSaveErrorStatusFromResponse(response);
                    if (errorStatus) {
                        console.error(response);
                        return reject(errorStatus);
                    }
                    if (isCopy) {
                        callback(response, container._pastedProject);
                    } else {
                        callback(response, container._currentProject);
                    }
                    resolve(response);
                },
                error: function (error) {
                    reject(container._getSaveErrorStatusFromRequest(error, this));
                }
            });
        });
    };

    _syncProjectDateUpdated(project) {
        if (!project || !project.dateUpdated) {
            return;
        }
        this._currentProject.dateUpdated = project.dateUpdated;
        const index = this._myProjects.findIndex((myProject) => myProject.id === this._currentProject.id);
        if (index !== -1) {
            this._myProjects[index].dateUpdated = project.dateUpdated;
        }
    };

    _handleUpdateConflict(error) {
        let serverProject = null;
        try {
            serverProject = JSON.parse(error.responseText).serverProject;
        } catch (parsingError) {
            serverProject = null;
        }
        this._syncProjectDateUpdated(serverProject);
        const message = i18next.t('notifications.projectSaveConflict', {
            defaultValue: 'Your project has NOT been saved: it was modified elsewhere. Save again to overwrite the version stored on the server.'
        });
        if (typeof VittaNotif !== 'undefined') {
            new VittaNotif().displayNotification(null, message, 'bg-danger');
        } else if (typeof displayNotification !== 'undefined') {
            displayNotification('#notif-div', message, 'error');
        } else {
            alert(message);
        }
    };

    /**
     * Detect a refused save in a successful response: the server may answer errors with an HTTP 200 status
     * @private
     * @param {object} response - The server response
     * @returns {string|null} A ProjectManager.STATUS.SAVING status, null if the project has been saved
     */
    _getSaveErrorStatusFromResponse(response) {
        if (!response || typeof response !== 'object') {
            return ProjectManager.STATUS.SAVING.serverError;
        }
        const errorTypes = Array.isArray(response.errors) ? response.errors.map((error) => error.errorType) : [];
        if (response.error === 'user_not_connected' || response.errorType === 'NotAuthenticated' || errorTypes.includes('noUserId')) {
            return ProjectManager.STATUS.SAVING.notConnected;
        }
        if (response.status === false || response.errorType === 'notProjectOwner') {
            return ProjectManager.STATUS.SAVING.forbidden;
        }
        if (response.errorType === 'projectNotFound' || errorTypes.includes('projectNotFound')) {
            return ProjectManager.STATUS.SAVING.notFound;
        }
        if (errorTypes.length > 0 || response.error === 'missing_data') {
            return ProjectManager.STATUS.SAVING.invalidProject;
        }
        if (response.error || !response.link || !response.id) {
            return ProjectManager.STATUS.SAVING.serverError;
        }
        return null;
    };

    /**
     * Get the saving status of a failed request, and report the unexpected errors
     * @private
     * @param {object} error - The jQuery ajax error
     * @param {object} ajaxSettings - The settings of the failed request
     * @returns {string} A ProjectManager.STATUS.SAVING status
     */
    _getSaveErrorStatusFromRequest(error, ajaxSettings) {
        const statusByHttpCode = {
            401: ProjectManager.STATUS.SAVING.notConnected,
            403: ProjectManager.STATUS.SAVING.forbidden,
            404: ProjectManager.STATUS.SAVING.notFound,
            409: ProjectManager.STATUS.SAVING.conflict,
            422: ProjectManager.STATUS.SAVING.invalidProject
        };
        if (statusByHttpCode[error.status]) {
            return statusByHttpCode[error.status];
        }
        new VittaControllerNotif().manageError(error, ajaxSettings);
        return error.status === 0 ? ProjectManager.STATUS.SAVING.networkError : ProjectManager.STATUS.SAVING.serverError;
    };

    /**
     * Update the project in database. The current project is only replaced by the server response once the update succeeded.
     * @public
     * @param {object} container - The project manager
     * @param {object} project - [OPTIONAL] The project data to upload, the current project by default
     * @returns {Promise} Resolves the saved project, rejects a ProjectManager.STATUS.SAVING status
     */
    uploadProjectUpdate(container, project = container._currentProject) {
        return new Promise((resolve, reject) => {
            const callback = (response) => {
                const responseProject = {
                    ...response,
                    exerciseStatement: typeof response.exerciseStatement !== 'undefined'
                        ? response.exerciseStatement
                        : container._currentProject.exerciseStatement
                };
                this._currentProject = responseProject;
                const existingProjectIndex = this._myProjects.findIndex((project) => project.id === responseProject.id);
                if (existingProjectIndex === -1) {
                    this._myProjects.push(responseProject);
                } else {
                    this._myProjects[existingProjectIndex] = responseProject;
                }
                if (typeof Main !== 'undefined' && Main.inIframe()) {
                    window.localStorage.saveProject = JSON.stringify(responseProject)
                }
                this.localStorageManager.setLocalProject(responseProject);
            };
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=update_my_project",
                data: {
                    "project": JSON.stringify(project),
                    "requesterLink": project.link,
                    "requesterId": UserManager.getUser().id
                },
                dataType: "JSON",
                success: function (response) {
                    const errorStatus = container._getSaveErrorStatusFromResponse(response);
                    if (errorStatus) {
                        console.error(response);
                        return reject(errorStatus);
                    }
                    if (INTERFACE_NAME == 'adacraft') {
                        window.localStorage[CodeManager.getSharedInstance()._lStorage] = JSON.stringify(response);
                        container._syncProjectDateUpdated(response);
                        adacraft.askLoadingOfProjectById(container._currentProject.link);
                    } else {
                        callback(response);
                    }
                    return resolve(response);
                },
                error: function (error) {
                    if (error.status === 409) {
                        container._handleUpdateConflict(error);
                    }
                    reject(container._getSaveErrorStatusFromRequest(error, this));
                }
            });
        });
    };

    _updateProjects(container = this, project = this._currentProject, isCopy = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (project.link == null || UserManager.getUser().id != project.user?.id) {
                    if (container._myProjects.length >= 1000) {
                        return reject(USER_PROJECTS_SIZE_ERROR);
                    }
                    await container._writeProjectToDataBase(container, project, isCopy);
                    if (INTERFACE_NAME !== 'adacraft') {
                        return resolve();
                    }
                    adacraftBinding.createNewProject();
                    return resolve();
                }
                if (INTERFACE_NAME === 'ai') {
                    await this.uploadProjectUpdate(container);
                    return resolve();
                }
                if (this._interface === 'adacraft') {
                    // In case of adacraft, we inform the editor that we want it to
                    // save this project.
                    adacraft.storage.saveCurrentProject(resolve);
                    // At some later point the adacraft editor will call some
                    // binding functions, that will call this.uploadProjectUpdate.
                    return resolve();
                }
                const projectToUpload = {
                    ...project,
                    'codeText': CodeManager.getSharedInstance().getTextCode(),
                    'code': CodeManager.getSharedInstance().getXml(),
                    'codeManuallyModified': CodeManager.getSharedInstance().isCodeManuallyModified(),
                    'mode': CodeManager.getSharedInstance()._getSelectedMode(),
                    'options': this.getCurrentOptionsStatus()
                };
                await this.uploadProjectUpdate(container, projectToUpload);
                return resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * Run a saving task once the previous ones are over, so that two saves never run at the same time
     * (which would create duplicated projects or false conflicts). A failure is displayed in the project status.
     * @private
     * @param {function} savingTask - Async function performing the save
     * @returns {Promise} Resolves the task result, rejects a ProjectManager.STATUS.SAVING status (or another saving error)
     */
    _queueSave(savingTask) {
        const saving = this._savingQueue.then(savingTask).catch((error) => {
            this.setSaveFailure(error || ProjectManager.STATUS.SAVING.serverError);
            throw error;
        });
        this._savingQueue = saving.catch(() => { });
        return saving;
    };

    /**
     * Save project in database, if projectName null save the current project.
     * @public
     * @param {string} [projectName=null]
     * @param {string} [projectDescription=null]
     * @returns {Promise} Rejects a ProjectManager.STATUS.SAVING status (or another saving error) if the project hasn't been saved
     */
    saveProject(projectName = null, projectDescription = null, isPublic = false) {
        if (projectName === null) {
            return Promise.reject();
        }
        return this._queueSave(async () => {
            this._currentProject.name = projectName;
            this._currentProject.description = projectDescription;
            this._currentProject.public = isPublic;
            await this.projectsFinder_updateProject(projectName, projectDescription, isPublic);
            await this._updateProjects();
            this._saveFailureStatus = null;
            await this._refreshProjectStatus();
        });
    };

    /**
     * Save the current workspace as a copy of the current project (exercise and statement included),
     * then keep working on this copy in the same workspace.
     * If the copy is created but its content can't be updated, the workspace still switches to the copy and shows the failed save.
     * @public
     * @param {string} projectName - The copy name
     * @param {string} projectDescription - The copy description
     * @param {boolean} isPublic - Whether the copy is shared with the community
     * @returns {Promise<object>} The saved copy
     */
    saveProjectAs(projectName, projectDescription, isPublic) {
        return this._queueSave(async () => {
            const originalProjectLink = this._currentProject.link;
            const copy = await this.duplicateProject(originalProjectLink, projectName, projectDescription, isPublic);
            this._projectLoader_setCurrentProject(copy);
            this.addToProjects(copy);
            this.localStorageManager.setLocalProjectDraft(null, originalProjectLink);
            this.updateUrl();
            await this._projectLoader_refreshExercise();
            await this._updateProjects();
            this._saveFailureStatus = null;
            await this._refreshProjectStatus();
            return this.getCurrentProject();
        });
    };

    /**
     * Ask for a confirmation before leaving the page while the project has unsaved changes
     * @private
     */
    _setupUnsavedChangesGuard() {
        window.addEventListener('beforeunload', (event) => {
            if (this.isLeavingPage || !this._isLocalDraftEnabled()) return;
            if ($_GET('nocloud') || typeof Main === 'undefined' || Main.inIframe()) return;
            if (!this.needSaving()) return;
            event.preventDefault();
            event.returnValue = '';
        });
    };

    /**
     * Return true if project was successfully deleted from user saved projects
     * @private
     * @param {string} projectLink
     * @returns {boolean} True if deleted, false if not.
     */
    deleteProject(projectLink) {
        return new Promise((resolve, reject) => {
            if (projectLink != this._currentProject.link) {
                $.ajax({
                    type: "POST",
                    url: "/routing/Routing.php?controller=project&action=delete_project",
                    data: {
                        link: projectLink
                    },
                    dataType: "JSON",
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        new VittaControllerNotif().manageError(error, this);
                        reject();
                    }
                });
            } else {
                resolve(DELETE_OPENED_PROJECT_ERROR);
            }
        })
    };


    duplicateProject(projectLink, projectName = false, projectDescription = false, projectIsPublic = null) {
        return new Promise((resolve, reject) => {
            const projectData = {
                link: projectLink
            };
            if (projectName) projectData.name = projectName;
            if (projectDescription) projectData.description = projectDescription;
            if (projectIsPublic !== null) projectData.isPublic = projectIsPublic;
            const container = this;
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=duplicate",
                data: projectData,
                dataType: "JSON",
                success: (response) => {
                    const errorStatus = this._getSaveErrorStatusFromResponse(response);
                    if (errorStatus) {
                        console.error(response);
                        return reject(errorStatus);
                    }
                    this._pastedProject.link = response.link;
                    resolve(response);
                },
                error: function (error) {
                    reject(container._getSaveErrorStatusFromRequest(error, this));
                }
            });
        });
    }

    getProjectAlreadyExistLocally(project) {
        if (typeof project === 'undefined' || typeof project !== 'object' || !project.id) {
            console.error(`The provided project doesn't meet the requirements!`);
            return;
        }
        const existingProject = this._myProjects.filter((currentProject) => {
            return currentProject.id === project.id;
        });
        return existingProject.length !== 0;
    }

    /**
     * Return true if user has reached his quota of saved projects 
     * @public
     * @return {bool}
     */
    hasReachedQuota() {
        return (this._myProjects.length >= 1000);
    };

}
