class ProjectManagerUser extends ProjectManager {
    /**
     * Creates an instance of ProjectManagerUser.
     * @public
     * @param {*} user
     */
    constructor(user) {
        super();
        this._user = user;
        this._ajaxLocked = false;
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
                    container._ajaxLocked = false;
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
            if (container._ajaxLocked == false) {
                const callback = (response, project) => {
                    project.link = response.link;
                    project.id = response.id;
                    project.dateUpdated = response.dateUpdated;
                    const projectAlreadyExists = this.getProjectAlreadyExistLocally(project);
                    this.localStorageManager.convertLocalProjectToLink(project.link);
                    if (!projectAlreadyExists) {
                        this._myProjects.push(project);
                    }
                    if (INTERFACE_NAME === 'ai') {
                        this._ajaxLocked = false;
                        return;
                    }
                    if (Main.inIframe()) {
                        window.localStorage.saveProject = JSON.stringify(response)
                    }
                    if (INTERFACE_NAME == 'adacraft') {
                        this.localStorageManager.setLocalProject(project);
                    } else {
                        this.localStorageManager.setLocalProject(project);
                    }
                    this._ajaxLocked = false;
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
                        if (isCopy) {
                            callback(response, container._pastedProject);
                        } else {
                            callback(response, container._currentProject);
                        }
                        resolve(response);
                    },
                    error: function (error) {
                        new VittaControllerNotif().manageError(error, this);
                        // TODO: Refactor error handling for user_not_connected case.
                        if (error.status === 401 && error.responseJSON && error.responseJSON.error === "user_not_connected") {
                            const notificationText = i18next.t('notifications.notConnected');
                            const vittaNotif = new VittaNotif();
			                vittaNotif.displayNotification(null, notificationText, 'bg-danger');
                        }
                        reject();
                    }
                });
            } else {
                UIManager.showErrorMessage('error-display', AJAX_LOCKED[getCookie('lng')]);
                reject();
            }
        });
    };

    uploadProjectUpdate(container) {
        return new Promise((resolve, reject) => {
            const callback = (response) => {
                this._currentProject = response;
                const projectAlreadyExists = this.getProjectAlreadyExistLocally(response);
                if (!projectAlreadyExists) {
                    this._myProjects.push(response);
                }
                if (typeof Main !== 'undefined' && Main.inIframe()) {
                    window.localStorage.saveProject = JSON.stringify(response)
                }
                if (INTERFACE_NAME == 'adacraft') {
                    this.localStorageManager.setLocalProject(response);
                } else if (INTERFACE_NAME === 'ai') {
                    this.localStorageManager.setLocalProject(response);
                } else {
                    this.localStorageManager.setLocalProject(response);
                }
                this._ajaxLocked = false;
            };
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=update_my_project",
                data: {
                    "project": JSON.stringify(container._currentProject),
                    "requesterLink": container._currentProject.link,
                    "requesterId": UserManager.getUser().id
                },
                dataType: "JSON",
                success: function (response) {
                    if (INTERFACE_NAME == 'adacraft') {
                        window.localStorage[CodeManager.getSharedInstance()._lStorage] = JSON.stringify(response);
                        adacraft.askLoadingOfProjectById(container._currentProject.link)
                    } else {
                        callback(response);
                    }
                    return resolve(response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    _updateProjects(container = this, project = this._currentProject, isCopy = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (project.link == null || UserManager.getUser().id != project.user.id) {
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
                project.codeText = CodeManager.getSharedInstance().getTextCode();
                project.code = CodeManager.getSharedInstance().getXml();
                project.codeManuallyModified = CodeManager.getSharedInstance().isCodeManuallyModified();
                project.mode = CodeManager.getSharedInstance()._getSelectedMode();
                project.options = this.getCurrentOptionsStatus();
                await this.uploadProjectUpdate(container);
                return resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * Save project in database, if projectName null save the current project.
     * @public
     * @param {string} [projectName=null] 
     * @param {string} [projectDescription=null]
     * @returns {boolean}
     * redo
     */
    saveProject(projectName = null, projectDescription = null, isPublic = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (projectName === null) {
                    return reject();
                }
                this._currentProject.name = projectName;
                this._currentProject.description = projectDescription;
                this._currentProject.public = isPublic;
                await this.projectsFinder_updateProject(projectName, projectDescription, isPublic);
                await this._updateProjects();
                await this._refreshProjectStatus();
                return resolve();
            } catch (error) {
                reject(error);
            }
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
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=duplicate",
                data: projectData,
                dataType: "JSON",
                success: (response) => {
                    this._pastedProject.link = response.link;
                    resolve(response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
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