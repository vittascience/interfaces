/**
 * Workspace ProjectManager: ProjectManager
 * Copyright 2019 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is vittascience's intellectual property.
 * 
 * This class purpose to persist the user's workspace in the suitable storage.
 */

/**
 * @class ProjectManager
 * @refers ProjectManagerUser for signed up users.
 * @refers ProjectManagerVisitor for non signed up users.
 */
class ProjectManager {
    /**
     * Creates an instance of ProjectManager.
     * @public
     */
    constructor() {
        $(".ide-btn-pythtest").hide(); // hiding the validate button (the one in python interface)
        this.localStorageManager = new LocalStorageManager();
        this.setInterface();
        this._currentProject = {};
        this._pastedProject = {};
        this._myProjects = [];
        this._allPublicProjects = [];
        this._allExampleProjects = [];
        this._rpc = null;
        this.requiresSetupBlocks = false;
        this.myProjectsLoaded = false;
        this.publicProjectsLoaded = false;
        this.exampleProjectsLoaded = false;
        this.exerciseLoaded = false;
        this.isOpeningProject = false;
        this.isVisitor = false;
        this.isLocalAiModel = false;
        this.localStorageManager.addLocalId();
        this._setupWebInterfaceParameters();
        this._setupArduinoInterfaceParameters();
        this._setupPythonInterfaceParameters();
        this._setupEvidenceBRPC();
        this._setupTiRPC();
        this._setExerciseStatement();
        this._hideAutocorrectorButton();
        this._checkAdacraftError();
        this._initializeCurrentProject();
        this._projectsFinder_getAll();
        this._initializeInteroperability();
        this._setupLocalCompilation();
    };

    /**
     * Get current interface name.
     * @returns {string} interface
     */
    getInterface() {
        return this._interface;
    };

    // ================================ PROJECTS FINDER ================================

    /**
     * Get all the user/public/example projects from database
     * @public
     * @returns {Promise}
     */
    _projectsFinder_getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') return resolve();
                const allProjectPromises = [];
                allProjectPromises.push(
                    new Promise(async (resolve, reject) => {
                        if (this.myProjectsLoaded) return resolve();
                        await this._setMyProjects(this);
                        this.populateAllProjects();
                        if (!this.isVisitor) {
                            this.myProjectsLoaded = true;
                        }
                        resolve();
                    })
                );
                allProjectPromises.push(
                    new Promise(async (resolve, reject) => {
                        await this._projectsFinder_getPublics();
                        this.populateAllProjects();
                        this.publicProjectsLoaded = true;
                        pseudoModal.endBlocker('modal-openproject');
                        resolve();
                    })
                );
                allProjectPromises.push(
                    new Promise(async (resolve, reject) => {
                        if (this.exampleProjectsLoaded) return resolve();
                        await this._projectsFinder_getExamples();
                        this.populateAllProjects();
                        this.exampleProjectsLoaded = true;
                        resolve();
                    })
                );
                await Promise.all(allProjectPromises);
                pseudoModal.endBlocker('modal-openproject');
                resolve();
            } catch (error) {
                console.error(error);
                pseudoModal.endBlocker('modal-openproject');
                reject();
            }
        });
    };

    /**
     * Populate user projects, public projects and example projects for mal.
     * @public
     * @param {function} callback [OPTIONAL] Callback function to filter projects.
     */
    populateAllProjects(callback = (projects) => projects) {
        if (this._interface === 'ai') {
            this._myProjects = this._filterProjectsByAiType(this._myProjects);
            this._allPublicProjects = this._filterProjectsByAiType(this._allPublicProjects);
            this._allExampleProjects = this._filterProjectsByAiType(this._allExampleProjects);
        }
        populateProjects(callback(this._myProjects), "my-projects");
        populateProjects(callback(this._allPublicProjects), "shared-projects");
        populateProjects(callback(this._allExampleProjects), "example-projects");
    };

    /**
     * Init public projects using call back.
     * @private
     */
    _projectsFinder_getPublics() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=get_all_public",
                data: {
                    "interface": this._interface
                },
                dataType: "JSON",
                success: (response) => {
                    this._allPublicProjects = response;
                    resolve();
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Init example projects using call back.
     * @private
     * @returns {Promise}
     */
    _projectsFinder_getExamples() {
        const getExamples = async (links, category = null) => {
            for (var link of links) {
                const project = await this.ajax_getProjectByLinkFromDB(link, this._interface);
                if (project && project.interface == this._interface) {
                    project.exampleCategory = category;
                    this._allExampleProjects.push(project);
                }
            }
        };
        return new Promise(async (resolve, reject) => {
            // check if the example projects are a simple array of links or an object with categories
            if (Array.isArray(EXAMPLE_PROJECT_LINKS)) {
                const links = EXAMPLE_PROJECT_LINKS;
                await getExamples(links);
                return resolve();
            }
            for (var category in EXAMPLE_PROJECT_LINKS) {
                const links = EXAMPLE_PROJECT_LINKS[category];
                await getExamples(links, category);
            }
            resolve();
        });
    };

    /**
     * Update myProjects list with current project from DB or update the _currentProject with data from workspace. Update the unitests if relevant and refresh project DOM. (This method purpose is not very clear)
     * @private
     */
    async projectsFinder_updateProject(name = this._currentProject.name, desc = this._currentProject.description, isPublic = this._currentProject.public) {
        if (this._currentProject.link) {
            let myProject;
            if (this._interface == 'ai') {
                myProject = await this.getProjectByLink(this._currentProject.link, true);
            } else {
                myProject = await this.getProjectByLink(this._currentProject.link, false);
            }
            const index = myProject.index;
            if (this._myProjects[index] != null) {
                if (this._interface == 'adacraft') {
                    this._currentProject.code = adacraft.getCurrentProjectJson();
                }
                this._myProjects[index] = this._currentProject;
            }
        } else {
            let codeValue, codeTextValue, codeManuallyModifiedValue, modeValue, sharedUsers, sharedStatus, options;
            switch (this._interface) {
                case 'adacraft':
                    codeValue = adacraft.getCurrentProjectJson();
                    codeTextValue = '';
                    codeManuallyModifiedValue = false;
                    modeValue = 'mixed';
                    break;

                case 'ai':
                    codeValue = this._currentProject.code;
                    codeTextValue = '';
                    codeManuallyModifiedValue = false;
                    modeValue = aiMain._model.getAiInterfaceType();
                    break;

                default:
                    if (!Main.getIsXmlBasedInterface()) {
                        codeValue = CodeManager.getSharedInstance().getCode();
                    } else {
                        codeValue = CodeManager.getSharedInstance().getXml();
                    }
                    codeTextValue = CodeManager.getSharedInstance().getCode();
                    codeManuallyModifiedValue = CodeManager.getSharedInstance().isCodeManuallyModified();
                    modeValue = CodeManager.getSharedInstance()._getSelectedMode();
                    sharedUsers = this._currentProject.sharedUsers;
                    sharedStatus = this._currentProject.sharedStatus;
                    options = this.getCurrentOptionsStatus();
                    break;
            }
            this._currentProject = {
                'name': name,
                'dateUpdated': Math.floor(new Date() / 1000),
                'description': desc,
                'code': codeValue,
                'codeText': codeTextValue,
                'codeManuallyModified': codeManuallyModifiedValue,
                'public': isPublic,
                'link': null,
                'user': UserManager.getUser(),
                'mode': modeValue,
                'sharedUsers': sharedUsers,
                'sharedStatus': sharedStatus,
                'options': options
            }
        }
        if (this._interface == "python") {
            if (window.localStorage.pythonCurrentProject === undefined || JSON.parse(window.localStorage.pythonCurrentProject).id != this._currentProject.id) {
                if (this._currentProject.id) {
                    UnitTests.init(this._currentProject);
                } else {
                    window.localStorage.PythonUnitTests = "";
                    this._currentExercise = "";
                    $(".ide-btn-pythtest").hide();
                }
            }
        }


        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                await this._refreshProjectStatus();
                resolve();
            }, 100);
        });
    };

    /**
     * Filter an array of projects using a keyword
     * @public
     * @param {Array} projects - An array of projects
     * @param {string} keyword - The searched string
     * @returns {Array} matchProjects
     */
    projectsFinder_search(projects, keyword) {
        const cleanText = function (text) {
            if (typeof text !== 'string') return '';
            let normString = text.normalize("NFD"); // Decomposes combined graphemes ("è" becomes "e"+" ̀")
            normString = normString.replace(/\p{Diacritic}/gu, ''); // Removing the diacritics
            return normString.toLowerCase();
        };
        const isMatching = function (textArray, keyword) {
            for (let text of textArray) {
                if (cleanText(text).indexOf(keyword) > -1) return true;
            }
            return false;
        };
        keyword = cleanText(keyword).replace(/\s+$/, '');
        if (projects.length == 0) {
            return projects;
        } else {
            const matchProjects = [];
            for (let i = 0; i < projects.length - 1; i++) {
                const project = projects[i];
                if (project.user !== null && project.user !== undefined && project.user.firstname !== null && project.user.firstname !== undefined) {
                    if (isMatching([project.name, project.description, project.user.firstname, project.user.surname], keyword)) {
                        matchProjects.push(project);
                    }
                } else {
                    if (isMatching([project.name, project.description], keyword)) {
                        matchProjects.push(project);
                    }
                }
            }
            return matchProjects;
        }
    };

    /**
     * Get a project by its link from projects
     * @public
     * @param {string} projectLink - The project link
     * @param {boolean} callToDB - [OPTIONAL] get the project data from database, true by default
     * @returns {Object} Project, null if not found.
     */
    async getProjectByLink(projectLink, callToDB = true) {
        const userProject = await this._browseProjects(projectLink, callToDB, '_myProjects');
        if (userProject) return userProject;

        const publicProject = await this._browseProjects(projectLink, callToDB, '_allPublicProjects');
        if (publicProject) return publicProject;

        const exampleProject = await this._browseProjects(projectLink, callToDB, '_allExampleProjects');
        if (exampleProject) return exampleProject;

        return {
            "list": null
        };
    };

    /**
     * Browse a project category to find a project using its link
     * @param {string} link - The project link
     * @param {boolean} callToDB - Do we need to fetch project data from database
     * @param {string} list - The project category (myProjects, allPublicProjects)
     * @returns {object} - The project data or null if not found
     */
    async _browseProjects(link, callToDB, list) {
        for (var i = 0; i < this[list].length; i++) {
            if (this[list][i].link === link) {
                if (callToDB && this[list][i].code == undefined) {
                    const projectToLoad = await this.ajax_getProjectByLinkFromDB(link, this._interface);
                    if (projectToLoad) {
                        this[list][i] = projectToLoad;
                    }
                }
                return {
                    'project': this[list][i],
                    'index': i,
                    'list': list
                };
            }
        }
        return null;
    };

    // ================================ PROJECT LOADER ================================

    /**
     * Load a project by link from DB, inject it in interface.
     * @private
     * @param {string} link - The link of the project to load
     * @returns {Promise}
     */
    _projectLoader_loadFromDB(link) {
        return new Promise(async (resolve, reject) => {
            const project = await this.ajax_getProjectByLinkFromDB(link, this._interface);
            if (project) {
                await this.projectLoader_injectInInterface(project);
                resolve(true);
            } else {
                pseudoModal.openModal('modal-warningWrongLink');
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('link');
                window.history.pushState({}, '', newUrl);
                this._addLocalId();
                if (this._interface == "ai") {
                    this._createNewAiProject();
                } else {
                    await this._createNewProject();
                    this._projectLoader_setInterfaceMode(false);
                }
                resolve(false);
            }
        });
    };

    /**
     * Update the interface with a project data.
     * @public
     * @param {Object} project - The project data
     * @returns {undefined} if an early return has been triggered
     */
    async projectLoader_injectInInterface(project) {
        const validProject = this._projectLoader_check(project);
        if (!validProject) return false;
        const rtcCheck = this._projectLoader_checkRTCAccess(project);
        if (!rtcCheck) return false;

        this._projectLoader_setCurrentProject(project);
        this.updateUrl();
        switch (this._interface) {
            case 'ai':
                // 21/03/23 The line below doesn't seem to be useful anymore -> @TOBEREMOVED 
                this.localStorageManager.setLocalProject(this._currentProject);
                this._refreshAiProjectDOM();
                break;
            case 'adacraft':
                this.localStorageManager.setLocalProject(this._currentProject);
                window.localStorage["adacraftCurrentCode"] = this._currentProject.code;
                await this._refreshProjectStatus();
                adacraft.askLoadingOfProjectById(this._currentProject.link);
                this._exercises_populateStatement();
                break;
            case 'python':
                PythonRun.resetUnitTests();
            default:
                this.localStorageManager.setLocalProject(this._currentProject);
                await this._projectLoader_updateSwitchingOptions(false);
                await this._refreshProjectStatus();
                await this._projectLoader_updateAndRefreshDOM();
                this._projectLoader_setupRTCSharedStatus();
        }
        if (typeof Main !== 'undefined' && !Main.getIsXmlBasedInterface()) {
            if (this._interface == 'web') {
                this._loadCodeToBlockWeb();
            } else {
                // HERE ADD the code to blocks event(s) for python based interfaces
            }
            this.loadCodeForCodeBasedInterface(this._currentProject.code);
        }
        return true;
    };

    /**
     * Check the validity of the project received from the backend and create a brand new one if necessary
     * @private
     * @param {object} project - The project received from the backend
     * @returns {boolean} true if the project passes the check, false otherwise
     */
    async _projectLoader_check(project) {
        const invalidProject = project == null || project.error_message != undefined || project.interface !== this._interface;
        if (!invalidProject) return true;
        if (this._interface == "ai") {
            aiMain._notif.displayNotification('#global-notifications-area', i18next.t('notifications.loadedProjectNotFound'), 'bg-danger');
            this._createNewAiProject();
            return false;
        }
        pseudoModal.openModal('modal-warningWrongLink');
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('link');
        window.history.pushState({}, '', newUrl);
        this._addLocalId();
        await this._createNewProject();
        return false;
    };

    /**
     * Check if the user is allowed to view the project in RTC context
     * @private
     * @param {object} project - The project to be checked with RTC
     * @returns {boolean} True if the user can have access to the project, false otherwise
     */
    _projectLoader_checkRTCAccess(project) {
        if (typeof IS_CAPYTALE_CONTEXT !== 'undefined' || typeof rtcInterfaces === 'undefined' || !rtcInterfaces.includes(this._interface)) return true;
        if (project.sharedStatus == 0) {
            const createBlurDiv = () => {
                const blurDiv = document.createElement('div');
                blurDiv.id = 'blur-div';
                document.getElementById('ide').prepend(blurDiv);
                pseudoModal.openModal('modal-private-project');
            }
            if (UserManager.getUser() == null) {
                createBlurDiv();
                return false;
            }
            if (project.sharedUsers != null) {
                const sharedUsers = JSON.parse(project.sharedUsers);
                const sharedUserId = [];
                for (let i = 0; i < sharedUsers.length; i++) {
                    sharedUserId.push(sharedUsers[i].userId);
                }
                if (UserManager.getUser().id != project.user.id) {
                    if (!sharedUserId.includes(UserManager.getUser().id)) {
                        createBlurDiv();
                        return false;
                    }
                }
            }
        }
        if (project.sharedStatus == 1 && document.referrer.match('/learn') == null && (UserManager.getUser() == null || UserManager.getUser().id != project.user.id)) {
            const readOnlyAlert = `
                <div id="readOnlyAlert">
                    <div>
                        <p data-i18n="modals.warning.project.readOnlyAlert">Ce projet est accessible en lecture seule. Vous ne pouvez pas effectuer de modifications.</p>
                        <button id="readOnlyAlertButton" class="btn btn-orange">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mt-2">
                        <p data-i18n="modals.warning.project.readOnlyAlert2">Si vous souhaitez le modifier, cliquez sur le bouton ci-après afin d'en créer une copie</p>
                        <button id='readOnlyCopyBtn' class="btn btn-sm btn-orange" data-i18n="[html]modals.warning.project.readOnlyCopyBtn">Editer une copie</button>
                    </div>
                </div>`;
            $('.ide-editor').prepend(readOnlyAlert);
        }
        return true;
    };

    /**
     * Load a project into workspace
     * @public
     * @param {string} projectLink - The project to load in the workspace, null by default
     * @return {boolean} Wether project has been successfully loaded or not.
     */
    async projectLoader_loadFromFinder(projectLink) {
        if (!projectLink) return false;
        const result = await this.getProjectByLink(projectLink);
        if (result.list === null) {
            return false;
        }
        this._projectLoader_setCurrentProject(result.project);
        this.updateUrl(true);
        this.localStorageManager.removeLocalId(result.project.link);
        this.localStorageManager.setLocalProject(result.project, result.project.link);
        switch (this._interface) {
            case 'ai':
                this._refreshAiProjectDOM();
                const trainingDataBlocker = aiMain._model.getAiInterfaceType() == 'text' ? new VittaBlocker(i18next.t('notifications.loadingTrainingData'), '#content-container') : new VittaBlocker(i18next.t('notifications.loadingTrainingData'), '#data')
                await this._injectProjectInAiInterface(trainingDataBlocker);
                break;
            case 'adacraft':
                await this._refreshProjectStatus();
                adacraft.askLoadingOfProjectById(projectLink);
                this._exercises_populateStatement();
                break;
            default:
                await this._projectLoader_updateSwitchingOptions(true);
                await this._projectLoader_updateAndRefreshDOM();
                await this._refreshProjectStatus();
        }
        return true;
    };

    /**
     * Load an adacraft project into workspace.
     * @public
     * @param {string} projectLink - [OPTIONAL] The project to load in the workspace, null by default
     * @param {boolean} userLoad - [OPTIONAL] The project load is initiated by the user, true by default
     * @return {boolean} Wether project has been successfully loaded or not.
     */
    async projectLoader_loadAdacraft(projectLink = null, userLoad = true) {
        if (userLoad === false) {
            const state = adacraft.appStateStore.getState();
            state.scratchGui.vm.loadProject(this._currentProject.code);
            this._refreshProjectStatus();
            this.updateUrl();
            return true;
        }
        if (projectLink === null) return false;
        const result = await this.getProjectByLink(projectLink);
        if (result.list === null) {
            return false;
        }
        this._projectLoader_setCurrentProject(result.project);
        this.updateUrl();
        await this._refreshProjectStatus();
        return true;
    };

    /**
     * Setter for _currentProject parameter
     * @private
     * @param {object} project - An object containing all the project data
     * @param {string} mode - [OPTIONAL] The display mode for the interface, false by default (it will use project.mode)
     */
    _projectLoader_setCurrentProject(project) {
        this._currentProject = {
            'name': this.decodeSanitizedString(project.name),
            'dateUpdated': project.dateUpdated,
            'description': project.description != null ? this.decodeSanitizedString(project.description) : "No-description",
            'code': project.code,
            'codeText': project.codeText,
            'codeManuallyModified': project.codeManuallyModified,
            'public': project.public,
            'link': project.link,
            'id': project.id,
            'user': project.user,
            'mode': project.mode,
            'exerciseStatement': project.exerciseStatement,
            'sharedUsers': project.sharedUsers,
            'sharedStatus': project.sharedStatus,
            'options': project.options,
        };
    };

    /**
     * Update user interface switching value of project options.
     * @param {boolean} finderLoading [OPTIONAL] update toolbox or console mode only if user load a project from his finder.
     */
    async _projectLoader_updateSwitchingOptions(finderLoading = false) {
        if (this._currentProject.options) {
            if (finderLoading) {
                // Option : toolbox
                if (this._currentProject.options.toolbox) {
                    updateToolbox(this._currentProject.options.toolbox);
                }
                // Option : console
                if (this._currentProject.options.console) {
                    rotateConsole(this._currentProject.options.console);
                }
            } else {
                // Option : console (when url loading)
                if (this._interface !== "web") {
                    rotateConsole(InterfaceMonitor.getPosition());
                }
            }
            if (typeof Main !== 'undefined') {
                if (Main.hasRobotSimulator()) {
                    // Option : simulator robot background
                    const robotBackground = this._currentProject.options.robotBackground;
                    if (robotBackground) {
                        if (RobotSimulator.isRunning) {
                            SimulatorLS.setData(RobotSimulator.currentRobotName, 'backgrounds', robotBackground, SimulatorLS.backgroundFormat);
                            RobotSimulator.img.background.src = robotBackground;
                            SimulatorModals.backgroundChoice = robotBackground;
                            SimulatorModals.useBackground();
                        } else {
                            SimulatorLS.projectOptions.backgrounds = SimulatorLS.backgroundFormat(robotBackground);
                        }
                    }
                    // Option : simulator robot angle
                    const robotInitialAngle = this._currentProject.options.robotInitialAngle;
                    if (robotInitialAngle) {
                        const initialAngle = parseInt(robotInitialAngle);
                        if (RobotSimulator.isRunning) {
                            RobotSimulator.setInitialRobotAngle(initialAngle);
                        } else {
                            SimulatorLS.projectOptions.initialAngles = initialAngle;
                        }
                    }
                    // Option : simulator robot position
                    const robotInitialPosition = this._currentProject.options.robotInitialPosition;
                    if (robotInitialPosition) {
                        const initialPosition = JSON.parse(robotInitialPosition);
                        if (RobotSimulator.isRunning) {
                            RobotSimulator.setInitialRobotPosition(initialPosition);
                        } else {
                            SimulatorLS.projectOptions.initialPositions = JSON.stringify(initialPosition);
                        }
                    }
                    // Option : simulator robot zoom
                    const robotInitialZoom = this._currentProject.options.robotInitialZoom;
                    if (robotInitialZoom) {
                        const projectZoom = parseInt(robotInitialZoom);
                        if (RobotSimulator.isRunning) {
                            SimulatorLS.setData(RobotSimulator.currentRobotName, 'initialZooms', projectZoom);
                            const zoomToDo = projectZoom - RobotSimulator.robot.zoom;
                            RobotSimulator.zoomFor(zoomToDo);
                            RobotSimulator.robot.zoom = projectZoom;
                        } else {
                            SimulatorLS.projectOptions.initialZooms = projectZoom;
                        }
                    }
                    // Option : simulator robot obstacles
                    const obstaclesDB = this._currentProject.options.obstaclesDB;
                    if (obstaclesDB) {
                        if (RobotSimulator.isRunning || typeof Simulator3D !== 'undefined') {
                            SimulatorLS.set('obstaclesDB', obstaclesDB);
                            RobotSimulator.Obstacle.setFromLS();
                        } else {
                            SimulatorLS.projectOptions.obstaclesDB = obstaclesDB;
                        }
                    }
                }
                // Option : board
                if (Main.hasBoardSelector()) {
                    const board = this._currentProject.options.board;
                    if (board) {
                        SimulatorLS.projectOptions.board = board;
                    } else {
                        SimulatorLS.projectOptions.board = BOARD_DEFAULT;
                    }
                }
            }

            if (typeof Main !== 'undefined' && Main.has3DRobotSimulator() && typeof Simulator3D !== 'undefined') {
                const robotBackground = this._currentProject.options.robotBackground;
                if (robotBackground) {
                    Simulator3D.updateBackground(robotBackground);
                }

                const robotInitialPosition = this._currentProject.options.robotInitialPosition;
                if (robotInitialPosition) {
                    SimulatorLS.setData(RobotSimulator3D.currentRobotName, 'initialPositions', robotInitialPosition);
                    const initialPosition = JSON.parse(robotInitialPosition);
                    RobotSimulator3D.initPos = initialPosition;
                }

                const robotInitialAngle = this._currentProject.options.robotInitialAngle;
                if (robotInitialAngle) {
                    const initialAngle = parseInt(robotInitialAngle);
                    SimulatorLS.setData(RobotSimulator3D.currentRobotName, 'initialAngles', initialAngle);
                }

                const robotInitialZoom = this._currentProject.options.robotInitialZoom;
                if (robotInitialZoom) {
                    const projectZoom = parseInt(robotInitialZoom);
                    RobotSimulator3D.setZoom(projectZoom);
                }

                const obstaclesDB = this._currentProject.options.obstaclesDB;
                if (obstaclesDB) {
                    SimulatorLS.set('obstaclesDB', obstaclesDB);
                }

                if (typeof Simulator3D.resetPosition === 'function') {
                    Simulator3D.resetPosition();
                }
            }

            // Option : block types of toolbox
            if (this._currentProject.options.reducedToolbox) {
                const reducedToolbox = JSON.parse(this._currentProject.options.reducedToolbox);
                if (reducedToolbox) {
                    Main.restrictToolbox(reducedToolbox);
                }
            }
        }
    };

    /**
     * Update the xml and the code with the project data and refresh the interface
     * @private
     * @returns {Promise} false if the interface loading stop there, true otherwise
     */
    _projectLoader_updateAndRefreshDOM() {
        return new Promise(async (resolve, reject) => {
            CodeManager.getSharedInstance().codeWasManuallyModified = this._currentProject.codeManuallyModified;
            if (!Main.getIsXmlBasedInterface()) {
                CodeManager.getSharedInstance().convertOldWebProjectCode();
                this.loadCodeForCodeBasedInterface(this._currentProject.code);
            } else {
                if (Main.hasToolboxModes()) {
                    const modes = [TOOLBOX_STYLE_SCRATCH, TOOLBOX_STYLE_VITTA];
                    if (this._interface === "TI-83") modes.push(TOOLBOX_STYLE_TI);
                    for (var mode of modes) {
                        if (this.getToolboxMode() == mode && this._currentProject.options && this._currentProject.options.toolbox !== mode) {
                            this._currentProject.options.toolbox = mode;
                            this._currentProject.code = replaceXmlCode(mode);
                        }
                    }
                }
                CodeManager.getSharedInstance().setXml(this._currentProject.code);
                CodeManager.getSharedInstance().setTextCode(this._currentProject.codeText);
                CodeManager.getSharedInstance().loadBlocks();
            }
            this._projectLoader_setInterfaceMode();
            if (this._interface == 'python') {
                UnitTests.init(this._currentProject);
            }
            this._exercises_populateStatement();
            try {
                if (Main.hasAutoCorrector()) {
                    await this.ajax_searchForExercise();
                    if (typeof Simulator !== 'undefined') {
                        Simulator.updateExercisePanel();
                    }
                }
            } catch (error) {
                console.error(error);
                pseudoModal.endBlocker('modal-auto-corrector-creation');
            }
            this.updateMultiEditorLS(this._currentProject.link, this._interface);
            resolve();
        });
    };

    /**
     * Switch the interface into current project mode.
     * @private
     * @param {string} animation - Animate the code mode switching.
     */
    _projectLoader_setInterfaceMode(animation = true) {
        if (["adacraft", "ai"].includes(this._interface)) return;
        if ([MODE_CONSOLE_ONLY, MODE_SIMU_ONLY].includes(Main.forcedCodeMode)) return;
        const mode = this.getCodeMode();
        CodeManager.getSharedInstance().setCodeMode(mode);
        if (getParamValue('preview')) {
            togglePreview(true);
        }
        if (getParamValue('previewOnly')) {
            this.refreshWebPreview();
            togglePreview(true);
            this.showPreviewOnly();
        }
        switch (mode) {
            case 'codeOnly':
                CodeManager.getSharedInstance().updateTextCode(this._currentProject.codeText);
                return switchCodeOnlyMode();
            case 'blocks':
                switchBlockMode(animation);
                break;
            case 'code':
            case 'python':
                if (this._currentProject.codeManuallyModified) {
                    CodeManager.getSharedInstance().updateTextCode(this._currentProject.codeText);
                    switchCodeMode(animation);
                } else {
                    switchCodeMode(animation);
                    setTimeout(function () {
                        Main.synchronizeCode();
                    }, 200);
                }
                break;
            default:
                switchMixedMode();
        }
        UIManager.enableSwitchingButtons(mode);
    };

    /**
     * Switch the sharedStatus inputs according to the current project shared status
     * @private
     */
    _projectLoader_setupRTCSharedStatus() {
        if (typeof rtcInterfaces === 'undefined' || !rtcInterfaces.includes(this._interface)) return;
        let rightValue = 0;
        switch (this._currentProject.sharedStatus) {
            case 0:
                rightValue = 'private';
                break;
            case 1:
                rightValue = 'read';
                break;
            case 2:
                rightValue = 'write';
                break;
        }
        $("input[name='shareLinkRights'][value=" + rightValue + "]").attr('checked', 'checked');
        $("input[name='right-select-control'][value=" + rightValue + "]").attr('checked', 'checked');
    };

    // ================================ PROJECT CREATOR ================================

    /**
     * Create new project in workspace
     * @public
     * @param {object} project - The project to create
     * @return {boolean} status of creation 
     */
    async newProject(project) {
        if (this._interface === 'ai') return this._createNewAiProject(project.name, project.description);
        const newProject = await this._createNewProject({
            'name': project.name,
            'description': project.description,
            'code': typeof project.code !== 'undefined' ? project.code : null,
            'codeText': typeof project.codeText !== 'undefined' ? project.codeText : null,
            'isPublic': typeof project.isPublic !== 'undefined' ? project.isPublic : false
        });
        return newProject;
    };

    /**
     * Create a new project.
     * @private
     * @param {string} project - The project object to create.
     * @return {boolean}
     */
    async _createNewProject(project) {
        if (this._interface === 'python') PythonRun.resetUnitTests();
        const projectCode = !Main.getIsXmlBasedInterface() ? CodeManager.getSharedInstance().getDefaultCodeStart() : CodeManager.getSharedInstance().getDefaultXmlStart();
        this._currentProject = {
            'name': encodeURI(i18next.t('code.newProject')),
            'dateUpdated': new Date(),
            'description': "",
            'code': projectCode,
            'codeText': CodeManager.getSharedInstance().getDefaultCodeStart(),
            'codeManuallyModified': false,
            'mode': this.getCodeMode(),
            'public': false,
            'link': null,
            'user': UserManager.getUser(),
            'sharedUsers': null,
            'sharedStatus': 0,
            'options': {
                'toolbox': this.getToolboxMode(),
                'console': this._interface !== "web" && this._interface !== "adacraft" ? InterfaceMonitor.getPosition() : '',
            }
        };
        if (project) {
            if (project.name) {
                this._currentProject.name = encodeURI(project.name);
            }
            if (project.description) {
                this._currentProject.description = encodeURI(project.description);
            }
            if (typeof project.code !== 'undefined' && project.code !== null) {
                this._currentProject.code = project.code;
            }
            if (typeof project.codeText !== 'undefined' && project.codeText !== null) {
                this._currentProject.codeText = project.codeText;
            }
            if (typeof project.isPublic !== 'undefined') {
                this._currentProject.isPublic = project.isPublic;
            }
        }
        if (this._interface == 'adacraft') {
            this.localStorageManager.setLocalProject(this._currentProject);
            window.localStorage["adacraftCurrentCode"] = this._currentProject.code;
            adacraft.appStateStore.getState().scratchGui.vm.loadProject(this._currentProject.code);
        } else {
            CodeManager.getSharedInstance().codeWasManuallyModified = false;
            CodeManager.getSharedInstance().setTextCode(this._currentProject.codeText);
            if (!Main.getIsXmlBasedInterface()) {
                CodeManager.getSharedInstance().setXml(this._currentProject.code);
                this.loadCodeForCodeBasedInterface(this._currentProject.code);
            } else {
                CodeManager.getSharedInstance().setXml(this._currentProject.code);
                CodeManager.getSharedInstance().loadBlocks();
            }
            if (this._interface == 'ai') {
                this.localStorageManager.setLocalProject(this._currentProject);
            }
        }
        $('#project-name').html(decodeURI(this._currentProject.name));
        let userInformations = '';
        if (UserManager.getUser() !== null) {
            userInformations = `<span class="tooltip-author">${UserManager.getUser().firstname} ${UserManager.getUser().surname}</span>`;
        }
        $('#project-name').attr("data-bs-title", `<span class="tooltip-title">${decodeURI(this._currentProject.name)}</span>${userInformations}<span class="tooltip-description">${decodeURI(this._currentProject.description)}</span>`);
        this.updateUrl();
        await this.projectsFinder_updateProject();
        this._currentExercise = "";
        return true;
    };

    /**
     * Get current options status in user interface.
     * @returns {object} options
     */
    getCurrentOptionsStatus() {
        const options = this._createCopy(this._currentProject.options); // ! important copy 
        if (typeof Main !== 'undefined') {
            // Option : toolbox
            if (Main.hasToolboxModes()) {
                options.toolbox = this.getToolboxMode();
            }
            // Option : console
            if (this._interface !== 'web' && this._interface !== 'adacraft') {
                options.console = InterfaceMonitor.getPosition();
            } else {
                options.console = '';
            }
            // Option : data from robot simulator
            if (Main.hasRobotSimulator() && Simulator._classicRobotSimulatorPrepareForRun) {
                const backgroundSrc = SimulatorLS.getData(RobotSimulator.currentRobotName, 'backgrounds');
                if (backgroundSrc) {
                    options.robotBackground = backgroundSrc;
                }

                const robotInitialAngle = SimulatorLS.getData(RobotSimulator.currentRobotName, 'initialAngles');
                if (robotInitialAngle) {
                    options.robotInitialAngle = robotInitialAngle;
                } else {
                    options.robotInitialAngle = "0";
                }

                const robotInitialPosition = SimulatorLS.getData(RobotSimulator.currentRobotName, 'initialPositions');
                if (typeof robotInitialPosition !== 'undefined') {
                    options.robotInitialPosition = robotInitialPosition;
                } else {
                    options.robotInitialPosition = JSON.stringify({x: 73, y: 137});
                }

                const robotInitialZoom = SimulatorLS.getData(RobotSimulator.currentRobotName, 'initialZooms');
                if (robotInitialZoom) {
                    options.robotInitialZoom = robotInitialZoom;
                } else {
                    options.robotInitialZoom = "0";
                }

                const obstaclesDB = SimulatorLS.get('obstaclesDB');
                if (obstaclesDB) {
                    options.obstaclesDB = obstaclesDB;
                }
            } else if (Main.has3DRobotSimulator() && Simulator._3DRobotSimulatorPrepareForRun){
                
                const backgroundSrc = SimulatorLS.getData(RobotSimulator3D.currentRobotName, 'backgrounds');
                if (backgroundSrc) {
                    options.robotBackground = backgroundSrc;
                }

                const robotInitialAngle = SimulatorLS.getData(RobotSimulator3D.currentRobotName, 'initialAngles');
                if (robotInitialAngle) {
                    options.robotInitialAngle = robotInitialAngle;
                } else {
                    options.robotInitialAngle = "0";
                }

                const robotInitialPosition = SimulatorLS.getData(RobotSimulator3D.currentRobotName, 'initialPositions');
                if (typeof robotInitialPosition !== 'undefined') {
                    options.robotInitialPosition = robotInitialPosition;
                } else {
                    options.robotInitialPosition = JSON.stringify({x: 0, y: 0});
                }

                const robotInitialZoom = SimulatorLS.getData(RobotSimulator3D.currentRobotName, 'initialZooms');
                if (robotInitialZoom) {
                    options.robotInitialZoom = robotInitialZoom;
                } else {
                    options.robotInitialZoom = "0";
                }

                const obstaclesDB = SimulatorLS.get('obstaclesDB');
                if (obstaclesDB) {
                    options.obstaclesDB = obstaclesDB;
                }
            }
            // Option : block types of toolbox
            if (Main.getToolboxManager().getToolboxRestricted()) {
                const reducedToolbox = {
                    'blocks': Main.getToolboxManager().getToolboxRestricted(),
                }
                const variables = Main.getWorkSpace().getAllVariables();
                if (variables.length) {
                    reducedToolbox['variables'] = variables.map(variable => variable.name);
                }
                options.reducedToolbox = JSON.stringify(reducedToolbox);
            }
            // Option : board
            if (Main.hasBoardSelector()) {
                const board = SimulatorLS.get('board');
                options.board = board;
            }
            // Option : multiChildProject
            if (Main.hasSimulator()) {
                const currentProjectLS = this.localStorageManager.getLocalProjectContent();
                if (currentProjectLS.options && currentProjectLS.options.multiChildProject) options.multiChildProject = currentProjectLS.options.multiChildProject;
            }
        }
        return options;
    };

    /**
     * Set this._currentProject parameters individually
     * @public
     * @param {object} currentProjectParameters - an object that assign value to keys. Keys that matches to this._currentProject properties
     */
    setCurrentProjectParameters(currentProjectParameters) {
        for (let projectParameter in currentProjectParameters) {
            switch (String(projectParameter)) {
                case 'link':
                    this._currentProject.link = currentProjectParameters[projectParameter];
                    break;

                case 'id':
                    this._currentProject.id = currentProjectParameters[projectParameter];
                    break;

                case 'dateUpdated':
                    this._currentProject.dateUpdated = currentProjectParameters[projectParameter];
                    break;

                default:
                    break;
            }
        }
    };

    /**
     * Push the provided project to the _myProjects array
     * @public
     * @param {object} project - The project to add
     */
    addToProjects(project) {
        this._myProjects.push(project);
    }

    /**
     * Get a copy from project passed as argument.
     * @private
     * @param {Object} projectParam
     * @returns {Object} A copy of the projectParam.
     */
    _createCopy(projectParam) {
        return Object.assign({}, projectParam);
    };

    /**
     * Copy one project changeable attributes into the other
     * @private
     * @param {Object} projectCopyTo
     * @param {Object} projectCopyFrom
     * @return {Object} projectCopyTo
     */
    _copyTo(projectCopyTo, projectCopyFrom) {
        projectCopyTo.dateUpdated = projectCopyFrom.dateUpdated;
        projectCopyTo.description = projectCopyFrom.description;
        projectCopyTo.code = projectCopyFrom.code;
        projectCopyTo.codeText = projectCopyFrom.codeText;
        projectCopyTo.codeManuallyModified = projectCopyFrom.codeManuallyModified;
        projectCopyTo.exercise = projectCopyFrom.exercise;
        projectCopyTo.public = projectCopyFrom.public;
        return projectCopyTo;
    };

    /**
     * Is the project up to date with its saved version?
     * @private
     * @return {boolean} True if up to date, false otherwise.
     */
    _isUpToDate() {
        try {
            if (typeof ltiVariables13 === 'undefined' && (this._interface === 'ai' || (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(this._interface) && this.getCurrentProject().sharedStatus != 0))) {
                // TEMPORARY -> TO BE MANAGED !
                return true;
            }
            // Be cautious when changing/adding properties to be checked below (It can breaks the checks under Capytale context)
            if (this._interface == "adacraft") {
                return this._equals({
                    'codeText': "",
                    'code': adacraft.getCurrentProjectJson(),
                    'sharedStatus': Number($("#shareProjectSave").is(':checked')),
                }, this._currentProject);
            } else {
                const updates = {
                    'codeText': CodeManager.getSharedInstance().getTextCode(),
                    'code': Main.getIsXmlBasedInterface() ? CodeManager.getSharedInstance().getXml() : CodeManager.getSharedInstance().getCode(),
                    'codeManuallyModified': CodeManager.getSharedInstance().isCodeManuallyModified(),
                    'mode': CodeManager.getSharedInstance()._getSelectedMode(),
                    'sharedStatus': Number($("#shareProjectSave").is(':checked')),
                    'options': this.getCurrentOptionsStatus()
                }
                return this._equals(updates, this._currentProject);
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    /**
     * Refresh project's DOM.
     * @private
     * @param {boolean} skipRpcEdited - [OPTIONAL] If true, that will skip the edited LTI/RPC event
     * @returns {Promise}
     */
    _refreshProjectStatus(skipRpcEdited = false) {
        return new Promise(async (resolve, reject) => {
            await new Promise((resoolve) => { setTimeout(resoolve, 100); }); // resoolve to avoid conflict with the main resolve
            const currentProjectName = typeof this._currentProject.name !== 'undefined' ? this.decodeSanitizedString(this._currentProject.name) : i18next.t('code.newProject');
            const currentProjectAuthor = typeof this._currentProject.user !== 'undefined' && this._currentProject.user !== null ? (this._currentProject.user.firstname + " " + this._currentProject.user.surname) : i18next.t('code.tooltip.anonymousAuthor');
            const currentProjectDescription = typeof this._currentProject.description != 'undefined' ? this.decodeSanitizedString(this._currentProject.description) : '';

            $("#project-name").text(decodeURI(currentProjectName));
            $('#project-name').attr('data-bs-title', `<span class="tooltip-title">${decodeURI(currentProjectName)}</span><span class="tooltip-author">${currentProjectAuthor}</span><span class="tooltip-description">${decodeURI(currentProjectDescription)}</span>`);

            if (this._isUpToDate() === false) {
                $("#project-is-saved").css('color', 'var(--vitta-orange)').html('<i class="fas fa-save"></i>');
                // In LTI context, we inform the parent window that the project isn't up to date
                if (typeof ltiVariables13 !== 'undefined' && !skipRpcEdited) {
                    lti13Controller.setprojectStatusToEdited();
                }
                if (this._rpc) {
                    this.setprojectStatusToEdited();
                }
                if (this._capytaleManager && this._capytaleManager.contentChanged && !this._capytaleManager.getInitialLoading()) {
                    this._capytaleManager.contentChanged();
                }
            } else {
                this._setProjectStatusAsSaved();
            }
            const noSynchroInterfaces = ['adacraft', 'ai', 'web', 'python'];
            if (!noSynchroInterfaces.includes(this._interface)) {
                //Disable synchro button
                const currentProject = this.localStorageManager.getLocalProjectContent();
                if (currentProject) {
                    if (!currentProject.codeManuallyModified) {
                        $(".sync-code").css({
                            'cursor': 'initial',
                            'pointer-events': 'none'
                        }).parent().attr('data-original-title', i18next.t('code.topbar.tooltips.disableSynchronize', 'neutral'));
                    } else {
                        $(".sync-code").css({
                            'cursor': 'pointer',
                            'pointer-events': 'auto'
                        }).parent().attr('data-original-title', i18next.t('code.topbar.tooltips.synchronizePython', 'neutral'));
                        $(".sync-code").hover(function () {
                            $(this).css('background-color', 'var(--vitta-orange)');
                        }, function () {
                            $(this).css('background-color', 'var(--bg-1)');
                        });
                    }
                }
            }
            resolve();
        });
    };

    /**
     * Set the project status as saved: green checkmark under the project Name and dynamic title "last saved on..."
     * @private
     */
    _setProjectStatusAsSaved() {
        $("#project-is-saved").css('color', 'var(--vitta-green)').html('<i class="fas fa-check"></i>');
        let titledate = null;
        const undefinedDate = typeof this._currentProject.dateUpdated === 'undefined';
        if (!undefinedDate && typeof this._currentProject.dateUpdated === 'string') {
            titledate = this._currentProject.dateUpdated;
        } else if (!undefinedDate && this._currentProject.dateUpdated.date !== undefined) {
            titledate = this._currentProject.dateUpdated.date;
        } else {
            titledate = new Date(Date.now()); // This fallback occurs for new project that hasn't already been saved in database. Maybe we should display a custom text to avoid misunderstanding.
        }
        let currentLang = 'fr';
        if (getCookie('lng') != '') {
            currentLang = getCookie('lng');
        }
        const localHumanReadableDate = new Date(titledate).toLocaleDateString(currentLang, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        document.querySelector('#project-is-saved').setAttribute('data-bs-title', `${i18next.t('code.topbar.tooltips.lastSaveOn')}${localHumanReadableDate}`);
    }

    /**
     * Get an object representing the data in project passed as argument or current
     * project if no argument is provided.
     * @private
     * @param {object} project [OPTIONAL] the project to "clone", null if not provided
     * @returns {Object} Object representing the data of a project.
     */
    _projectData(project = null) {
        if (project === null) {
            return Object.assign({}, this._currentProject);
        } else {
            return Object.assign({}, project);
        }
    };

    /**
     * @public
     * Return current project name
     * @return {string} The current project Name
     */
    getCurrentProjectName() {
        return decodeURI(this._currentProject.name);
    };

    /**
     * Return the user's saved projects.
     * @public
     * @returns {Array}
     */
    getMyProjects() {
        return this._myProjects;
    };

    /**
     * Return the public projects shared by the community.
     * @public
     * @returns {Array}
     */
    getAllPublicProjects() {
        return this._allPublicProjects;
    };

    /**
     * Return the shared example projects.
     * @public
     * @returns {Array}
     */
    getAllExampleProjects() {
        return this._allExampleProjects;
    };

    /**
     * Return a copy of this._currentProject
     * @public
     * @return {object} object representation of this._currentProject
     */
    getCurrentProject() {
        return this._projectData();
    };

    /**
     * Change the project name and description in currentProject and in localStorage
     * @public
     * @param {string} projectName - The project name
     * @param {string} projectDescription - The project description
     * @returns {undefined} undefined in early return case (ai context)
     */
    editCurrentProject(projectName, projectDescription = 'No-description') {
        this._currentProject.name = projectName;
        this._currentProject.description = projectDescription;
        if (this._interface === "ai") return;
        let currentProjectLS = this.localStorageManager.getLocalProjectContent();
        currentProjectLS.name = projectName;
        currentProjectLS.description = projectDescription;
        this.localStorageManager.setLocalProject(currentProjectLS);
    };

    /**
     * Return true if the current project exists in the user's saved projects.
     * @public
     * @return {boolean} Whether the current project is owned by the user
     */
    async projectExists() {
        if (!this._currentProject.link) {
            console.warn(`The current project doesn't have a link!`);
            return false;
        }
        const result = await this.getProjectByLink(this._currentProject.link, false);
        return result.list == "myProjects";
    };

    /**
     * Return true if the project needs to be saved.
     * @public
     * @return {boolean} Whether the project is up to date or not
     */
    needSaving() {
        if (this._interface == 'ai') return true;
        return !this._isUpToDate();
    };

    getCodeMode(fromFinder = false) {
        let codeMode = null;
        if (fromFinder && this._currentProject) {
            codeMode = this._currentProject.mode;
        }
        if (!codeMode && $_GET("mode")) {
            codeMode = $_GET("mode");
        }
        if (!codeMode && this._currentProject) {
            codeMode = this._currentProject.mode;
        }
        if (!codeMode && $(window).width() < 600) {
            codeMode = MODE_BLOCKS;
        }
        if (!codeMode) {
            codeMode = MODE_MIXED;
        }
        return codeMode;
    };

    getToolboxMode() {
        let toolboxMode = null;
        if ($_GET("toolbox")) {
            toolboxMode = $_GET("toolbox");
        }
        if (!toolboxMode && localStorage.toolbox) {
            toolboxMode = JSON.parse(localStorage.toolbox)[this._interface];
        }
        if (!toolboxMode && typeof TOOLBOX_STYLE_DEFAULT !== 'undefined') {
            toolboxMode = TOOLBOX_STYLE_DEFAULT;
        }
        return toolboxMode;
    };

    /**
     * Update project url.
     * @public
     * @param {boolean} fromFinder - [OPTIONAL] If we are loading project from finder, false by default
     */
    updateUrl(fromFinder = false) {
        const getURLparam = (param) => $_GET(param) ? $_GET(param) : '';
        const link = (this._currentProject.link && this._currentProject.link != null) ? this._currentProject.link : ($_GET("link") ? $_GET("link") : '');
        let mode = "";
        let consolePos = "";
        let toolbox = "";
        let simu = "";
        let board = "";
        let robot = "";
        let multi = "";
        let model = "";
        let poseModel = "";
        let soundModel = "";
        let textModel = "";
        let player = false;
        if (this._interface !== 'ai') {
            if (this._interface === 'adacraft' || this._interface === 'python') {
                model = getURLparam("model");
                poseModel = getURLparam("poseModel");
                soundModel = getURLparam("soundModel");
                textModel = getURLparam("textModel");
                player = getURLparam("player");
            }
            if (this._interface !== 'adacraft') {
                mode = this.getCodeMode(fromFinder);
                consolePos = this._interface !== 'web' ? InterfaceMonitor.getPosition() : '';
                if (Main.hasToolboxModes()) {
                    toolbox = this.getToolboxMode();
                }
                if (Main.hasSimulator()) {
                    simu = getURLparam("simu");
                    if (Main.hasBoardSelector()) {
                        board = getURLparam("board");
                    }
                    if (Main.hasRobotSimulator()) {
                        robot = getURLparam("robot");
                    }
                }
                multi = getURLparam("multi");
            }
        }
        const compiler = $_GET("compiler") ? $_GET("compiler") : ''; 
        const nocloud = $_GET("nocloud") ? $_GET("nocloud") : '';
        const projectManagement = $_GET("projectManagement") ? $_GET("projectManagement") : '';
        const nonew = $_GET("nonew") ? $_GET("nonew") : '';
        const noopen = $_GET("noopen") ? $_GET("noopen") : '';
        const nosave = $_GET("nosave") ? $_GET("nosave") : '';
        const primaryColor = $_GET("primaryColor") ? $_GET("primaryColor") : '';
        const secondaryColor = $_GET("secondaryColor") ? $_GET("secondaryColor") : '';
        const action = $_GET("action") ? $_GET("action") : '';
        const from = $_GET("from") ? $_GET("from") : '';
        const previewOnly = $_GET("previewOnly") ? $_GET("previewOnly") : '';
        const preview = $_GET("preview") ? $_GET("preview") : '';
        const localId = $_GET("localId") ? $_GET("localId") : ''; 
        const duo = $_GET("duo") ? $_GET("duo") : ''; 
        const linkStruct = {
            base: `${window.location.origin}${window.location.pathname}`,
            args: {
                link: link,
                model: model,
                poseModel: poseModel,
                soundModel: soundModel,
                textModel: textModel,
                mode: mode,
                console: consolePos,
                toolbox: toolbox,
                simu: simu,
                board: board,
                robot: robot,
                action: action,
                from: from,
                multi: multi,
                compiler: compiler,
                localId: localId,
                nocloud: nocloud,
                projectmanagement: projectManagement,
                nonew: nonew,
                noopen: noopen,
                nosave: nosave,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                previewOnly: previewOnly,
                preview: preview,
                duo: duo,
                player: player
            }
        };
        history.pushState({}, "", stringifyLinkShare(linkStruct));
    };


    // ===================================== EXERCISES =====================================

    /**
     * Search exercise for current project in database
     * @private
     * @returns {Promise} resolve false if there is no project link
     */
    ajax_searchForExercise() {
        return new Promise((resolve, reject) => {
            if (typeof this._currentProject === 'undefined' || !this._currentProject.link) {
                console.error(`The current project doesn't have any link!`);
                return resolve(false);
            }
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=exercise&action=get_by_project",
                data: {
                    "project": this._currentProject
                },
                success: async (response) => {
                    if (response != 'null' || typeof response.errorType != 'undefined') {
                        this._currentExercise = {
                            "exercise": {
                                "id": JSON.parse(response).id
                            }
                        };
                        if (typeof AutoCorrector != 'undefined') {
                            await AutoCorrector.importExerciseInSimulator(this._currentExercise);
                        }
                    } else {
                        $("#simulator-switcher").hide();
                        this._currentExercise = 'no-exercise';
                    }
                    this.exerciseLoaded = true;
                    resolve();
                },
                error: function (error) {
                    this.exerciseLoaded = true;
                    $("#simulator-switcher").hide();
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Create an exercise for current project.
     * @public
     * @return {string} id
     */
    async exercises_create() {
        const pythonExercice = await fetch('/routing/Routing.php?controller=exercise&action=update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `exercise[project]=${projectManager._currentProject.id}`
        });
        const response = await pythonExercice.json();
        if (response.errors) {
            const errorList = {
                projectIdInvalid: () => {
                    pseudoModal.openModal("modal-auto-corrector-no-project-opened");
                },
                notProjectOwner: () => {
                    pseudoModal.openModal("modal-auto-corrector-no-project-owner");
                }
            };
            for (let error in response.errors) {
                if (errorList[error] instanceof Function) errorList[error]();
            }
            return;
        }
        projectManager._currentExercise = {
            "exercise": {
                "id": response.id
            }
        };
        return response.id;
    };

    /**
     * Get exercise frames by id
     * @public
     * @param {string} exerciseId - The exercise ID
     * @returns {Promise} resolve the exercise frames
     */
    async exercises_getFrames(exerciseId) {
        const response = await fetch(
            "/routing/Routing.php?controller=exercise_frames&action=get_exercise_frames", {
            method: "POST",
            body: JSON.stringify({
                exerciseId: exerciseId
            }),
        },
        );
        return response.json();
    };

    /**
     * Save exercise frames by id
     * @public
     * @param {Array} optimizedFrames - The exercise frames reduced to those that change
     * @param {string} exerciseId - The exercise ID
     */
    async exercises_saveFrames(optimizedFrames, exerciseId) {
        const data = new URLSearchParams();
        data.append('frames', JSON.stringify({
            optimizedFrames: optimizedFrames,
            exerciseId: exerciseId
        }));
        await (await fetch(
            "/routing/Routing.php?controller=exercise_frames&action=create_exercise_frames", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: data,
        })).json();
    };

    /**
     * Populate and display the exercise statement if existing
     * @private
     */
    _exercises_populateStatement() {
        if (typeof ExerciseStatement !== 'undefined') {
            let isExerciseStatement = typeof this._currentProject.exerciseStatement !== 'undefined';
            isExerciseStatement = isExerciseStatement ? this._currentProject.exerciseStatement !== null : false;
            const currentStatement = isExerciseStatement
                ? this._currentProject.exerciseStatement.statementContent
                : '';
            this._exerciseStatement.setStatementContent(currentStatement);
            if (this._exerciseStatement.getStatementContent()) {
                document.querySelector('#exercise-statement-input').value = this._exerciseStatement.getStatementContent();
            }
            this._exerciseStatement.displayStatement();
        }
    };

    /**
     * Add or update the exercise statement for the current project
     * @public
     * @param {string} exercise_statement - [OPTIONAL] The exercise statement, empty string by default
     * @returns {Promise} resolve the server response
     */
    exercises_setStatement(exercise_statement = '') {
        return new Promise(async (resolve, reject) => {
            const urlParams = new URLSearchParams();
            urlParams.append('project_id', this._currentProject.id);
            urlParams.append('exercise_statement', exercise_statement);
            const response = await fetch(
                "/routing/Routing.php?controller=project&action=add_or_update_exercise_statement",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: urlParams
                }
            );
            resolve(response.json());
        });
    };

    /**
     * exerciceStatement property getter
     * @public
     * @returns {object} instanceof ExerciseStatement - The exercise statement object
     */
    getExerciseStatement() {
        if (typeof this._exerciseStatement === 'undefined') {
            return false;
        }
        return this._exerciseStatement;
    }


    // ================================ AI TRAINING INTERFACE ================================

    /**
     * Create a new empty AI project
     * @private
     * @param {string} projectName - [OPTIONAL] The project name, empty string by default
     * @param {string} projectDescription - [OPTIONAL] The project description, empty string by default
     * @param {boolean} isPublic - [OPTIONAL] Displayed in shared library, false by default 
     * @returns {boolean} true when completed
     */
    _createNewAiProject(projectName = "", projectDescription = "", isPublic = false) {
        projectName = (projectName.length == 0) ? i18next.t('code.newProject') : projectName;
        projectDescription = (projectDescription.length == 0) ? '' : projectDescription;

        this._currentProject = {
            'name': encodeURI(projectName),
            'dateUpdated': new Date(),
            'description': encodeURI(projectDescription),
            'code': null,
            'codeText': null,
            'codeManuallyModified': false,
            'public': isPublic,
            'link': null,
            'user': UserManager.getUser(),
            'sharedUsers': null,
            'sharedStatus': 0
        };

        this.updateUrl();
        this._currentExercise = "";
        this._refreshAiProjectDOM();
        return true;
    };

    /**
     * Update the projectName area by updating the name, description and date updated
     */
    _refreshAiProjectDOM() {
        const currentLang = getCookie('lng') ? getCookie('lng') : 'fr';
        const projectNameElt = document.querySelector('#project-name');
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const updatedDate = typeof this._currentProject.dateUpdated.date !== 'undefined'
            ? new Date(this._currentProject.dateUpdated.date)
            : this._currentProject.dateUpdated;
        const readableUpdatedDate = updatedDate.toLocaleDateString(currentLang, dateOptions);
        projectNameElt.innerHTML = decodeURI(this._currentProject.name);
        projectNameElt.setAttribute('data-bs-title', `Titre : ` + this._currentProject.name + `\n${i18next.t('code.topbar.tooltips.description')} ${decodeURI(this._currentProject.description)}`);
        document.querySelector("#project-is-saved").setAttribute('data-bs-title', `${i18next.t('code.topbar.tooltips.lastSaveOn')}${readableUpdatedDate}`);
    };

    /**
     * Filter the projects according to their ai type (mode property of the projects)
     */
    _filterProjectsByAiType(projects) {
        return projects.filter((project) => (project.mode === aiMain._model.getAiInterfaceType() || project.mode === null));
    };

    // ================================ AJAX REQUESTS ================================

    /**
     * Get a project from database by providing its interface and its link
     * @public
     * @param {string} projectLink - The link of the project
     * @param {string} projectInterface - The interface of the project
     * @returns {Promise} Project from response, null if not found
     */
    ajax_getProjectByLinkFromDB(projectLink, projectInterface) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=get_by_link",
                data: {
                    'link': projectLink,
                    'interface': projectInterface
                },
                dataType: "JSON",
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject(null);
                }
            });
        })
    };

    /**
     * Update the shared status for a project
     * @param {number} id - The project ID
     * @param {string} right - The project shared status right
     * @returns {Promise}
     */
    ajax_updateSharedStatusForProject(id, right) {
        return new Promise((resolve, reject) => {
            switch (right) {
                case 'private':
                    right = '0';
                    break;
                case 'read':
                    right = '1';
                    break;
                case 'write':
                    right = '2';
                    break;
                default:
                    console.error(`${String(right)} isn't a relevant right!`);
                    return reject();
            }
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=update_shared_status_for_project",
                data: {
                    "project_id": id,
                    "shared_status": right,
                },
                dataType: "JSON",
                success: function (response) {
                    //affichage message de succès
                    resolve();
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Update the shared user right for a project
     * @param {number} projectId - The project ID
     * @param {number} userId - The user ID
     * @param {string} right - The project shared user right
     * @returns {Promise}
     */
    ajax_updateSharedUserRight(projectId, userId, right) {
        return new Promise((resolve, reject) => {
            switch (right) {
                case 'read':
                    right = '1';
                    break;
                case 'write':
                    right = '2';
                    break;
                default:
                    console.error(`${String(right)} isn't a relevant right!`);
                    return reject();
            }
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=update_shared_users_right",
                data: {
                    "project_id": projectId,
                    "shared_users_id": userId,
                    "shared_users_right": right
                },
                dataType: "JSON",
                success: function (response) {
                    //affichage message de succès
                    resolve();
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Delete a shared user for a project
     * @param {number} projectId - The project ID
     * @param {number} userId - The user ID
     * @returns {Promise}
     */
    ajax_deleteSharedUser(projectId, userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=delete_shared_user",
                data: {
                    "project_id": projectId,
                    "shared_user_id": userId,
                },
                dataType: "JSON",
                success: function (response) {
                    //affichage message de succès
                    resolve();
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Generate a signed JWT containing the project link
     * @public
     * @param {string} link - The project link
     * @returns {Promise} resolve the backend response
     */
    ajax_getSignedLink(link) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=project&action=get_signed_link",
                data: {
                    'link': link
                },
                dataType: "JSON",
                success: function (response) {
                    //affichage message de succès
                    resolve(response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject();
                }
            });
        });
    };

    /**
     * Wait until the Lti13Controller has been instanciated
     * @returns {Promise} Fullfilled when Lti13Controller has been instanciated
     */
    _waitForLti13ControllerLoaded() {
        return new Promise((resolve, reject) => {
            try {
                if (typeof lti13Controller === 'undefined') {
                    setTimeout(() => {
                        resolve(this._waitForLti13ControllerLoaded());
                    }, 100);
                    return;
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Load AI project assets (training data and model) after some checks
     * @private
     * @param {object} trainingDataBlocker - A training data blocker, instance of VittaBlocker
     * @returns {Promise}
     */
    async _injectProjectInAiInterface(trainingDataBlocker) {
        const isAiProjectChecked = this._checkAiProject();
        if (!isAiProjectChecked) {
            console.error('Not the right interface for this project!');
            aiMain._notif.displayNotification('#global-notifications-area', i18next.t('notifications.badAiInterfaceForProject'), 'bg-danger');
            trainingDataBlocker.end();
            return;
        }
        if (isAiProjectChecked === 'bad_json') {
            trainingDataBlocker.end();
            console.error('Bad JSON received from backend!');
            return;
        }
        if (aiMain._model.getAiInterfaceType() !== "text") {
            await aiMain._model.waitIndexedDbFullyLoaded();
            await aiMain._tensorFlow.loadSavedProjectModel();
            await aiMain._model.loadSavedProjectTrainingData();
        }
        if (aiMain._model.getAiInterfaceType() == "text") {
            aiMain._model.loadSavedProjectModel()
        }
        
        trainingDataBlocker.end();
        this.updateUrl();
        return;
    }

    /**
     * Check if the current project is relevant to the current interface
     * @private
     * @returns {boolean} Whether the current project is relevant to the current interface
     */
    _checkAiProject() {
        let currentProjectCode,
            isImageProject = false,
            currentInterfaceType = aiMain._model.getAiInterfaceType();
        try {
            currentProjectCode = JSON.parse(projectManager.getCurrentProject().code);
        } catch (error) {
            return 'bad_json';
        }
        if (!currentProjectCode.categories && ['sound', 'images', 'pose', 'edge'].includes(projectManager.getCurrentProject().mode)) {
            return false;
        }
        if (typeof currentProjectCode.categories[0] !== 'undefined' && currentProjectCode.categories[0].images && projectManager.getCurrentProject().mode !== 'text' && projectManager.getCurrentProject().mode !== 'pose' && currentInterfaceType !== 'pose') {
            isImageProject = true;
        }
        if (projectManager.getCurrentProject().mode == 'image') isImageProject = true;
        if (isImageProject && currentInterfaceType === 'image') return true;
        if (isImageProject && currentInterfaceType === 'edge') return true;
        if (!isImageProject && currentInterfaceType === 'sound') return true;
        if (!isImageProject && currentInterfaceType === 'text') return true;
        if (!isImageProject && currentInterfaceType === 'pose') return true;


        return false;
    }

    /**
     * Hide the autocorrector (validate) button
     * @private 
     * @returns {undefined} undefined In early return case
     */
    _hideAutocorrectorButton() {
        if (typeof AUTOCORRECTOR_DISABLED === 'undefined' || !AUTOCORRECTOR_DISABLED) {
            return;
        }
        const autoCorrectorModalButtonElt = document.querySelector('#autocorrector-modal-button');
        if (autoCorrectorModalButtonElt === null) {
            setTimeout(() => {
                this._hideAutocorrectorButton();
            }, 100);
            return;
        }
        autoCorrectorModalButtonElt.parentElement.style.display = 'none';
    }

    /**
     * Await the currentProject to get its link parameter to be sure that the project is fully loaded
     * @returns {Promise}
     */
    awaitForProjectLoad() {
        return new Promise((resolve, reject) => {
            try {
                if (typeof projectManager.getCurrentProject().link === 'undefined') {
                    return setTimeout(() => {
                        resolve(this.awaitForProjectLoad());
                    }, 100);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Check if the current user is the owner of the current project
     * @public
     * @returns {boolean} Whether the current user is the owner of the current project
     */
    getIsCurrentProjectOwner() {
        if (UserManager.getUser() === null) return false;
        if (!projectManager.getCurrentProject().user) return false;
        if (UserManager.getUser().id !== projectManager.getCurrentProject().user.id) return false;
        return true;
    }

    /**
     * Assign the value to this._interface
     * @public
     * @returns {undefined} undefined in early return cases
     */
    setInterface() {
        if (typeof ltiVariables13 !== 'undefined' && typeof ltiVariables13.interface !== 'undefined' && ltiVariables13.interface !== null) {
            this._interface = ltiVariables13.interface;
            return;
        }
        switch (INTERFACE_NAME) {
            case 'adacraft':
                this._interface = INTERFACE_NAME;
                break;
            case 'ai':
                this._interface = INTERFACE_NAME;
                break;
            case 'web':
                this._interface = INTERFACE_NAME;
                break;
            default:
                this._interface = window.location.pathname.replace(CodeManager.getSharedInstance().REGEXP_INTERFACES, "$1");
                break;
        }
    }

    /**
     * Setup the RPC for interoperability with EvidenceB
     * @private
     * @returns false if we aren't in EvidenceB context
     */
    async _setupEvidenceBRPC() {
        if (getParamValue("evidenceB") !== 'true') return false;
        await this._loadRPCScript();
        this._rpc = new RPC({
            target: window.parent,
            serviceId: "evidenceb-activite"
        });
        this._rpc.expose("autocorrectionPython", autocorrectionPython);
        this._rpc.expose("getPythonCode", () => { return CodeManager.getSharedInstance().getCode() });
        this._evidenceBContext = true;
        return true;
    }

    _setupTiRPC() {
        if (INTERFACE_NAME == "TI-83") {
            window.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                window.localStorage.setItem("theme", data.theme);
                window.localStorage.setItem("contrast", data.contrast);
                window.localStorage.setItem("font", data.font);
                setAccessibility();
            });
        }
    }

    /**
     * Assign an instance of ExerciseStatement to this._exerciseStatement if the class is available
     * @private
     */
    _setExerciseStatement() {
        if (typeof ExerciseStatement !== 'undefined') this._exerciseStatement = new ExerciseStatement();
    }

    /**
     * Clear current adacraft project if the page has reloaded due to an error
     * @private
     * @returns {undefined} undefined in early return case
     */
    _checkAdacraftError() {
        if (getParamValue("adaError") !== 'true') return;
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];
        const nextURL = location.href.replace("adaError=true", "");
        const nextTitle = 'Vittascience';
        const nextState = { additionalInformation: 'Page reload because of project incorrect in adacraft' };
        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
    }

    /**
     * Initialize the current project depending on the interface and the query parameters/context
     * @private
     */
    async _initializeCurrentProject() {
        // In Capytale context, we will load the project later
        if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
            this.setIsLoadedProject(true);
            return;
        }
        // LTI 1.3 management (LTI Advantage => OpenSTEAM-LMS, Canvas, Moodle)
        if (typeof ltiVariables13 != 'undefined') {
            this._initializeProjectForLTI();
        } else if (typeof ltiVariables != 'undefined') { // LTI 1.00 management (Tactileo)
            this._initializeProjectForLegacyLTI();
        } else if (getParamValue("model") != null) {
            if (this._interface === 'adacraft') {
                this._initializeImageModelProjectForAdacraft();
            } else if (this._interface === 'python') {
                await this._initializeImageModelProjectForPython();
            } else if (this._interface === 'buddy') {
                this._initializeImageModelProjectForBuddy();
            } else if (this._interface === 'microbit') {
                this._initializeEdgeModelProjectMicrobit();
            } else if (this._interface === 'galaxia'){
                this._initializeEdgeModelProjectGalaxia();
            } else if (this._interface === 'arduino') {
                this._initializeEdgeModelProjectArduino();
            }
        } else if (getParamValue("poseModel") != null) {
            if (this._interface === 'adacraft') {
                await this._initializePoseModelProjectForAdacraft()
                    ;
            } else if (this._interface === 'python') {
                await this._initializePoseModelProjectForPython();
            }
        } else if (getParamValue("soundModel") !== null) {
            if (this._interface === 'adacraft') {
                this._initializeSoundModelProjectForAdacraft();
            } else if (this._interface === 'python') {
                await this._initializeSoundModelProjectForPython();
            }
        } else if (getParamValue("textModel") !== null) {
            if (this._interface === 'adacraft') {
                this._initializeTextModelProjectForAdacraft();
            } else if (this._interface === 'python') {
                await this._initializeTextModelProjectForPython();
            }
        } else if (getParamValue("generationImage") !== null) {
            if (this._interface === 'adacraft') {
                this._initializeImageGenerateForAdacraft();
            } else if (this._interface === 'python') {
                await this._initializeTextModelProjectForPython();
            }
        } else if (getParamValue("link") !== null) {
            await this._initializeStandardLinkedProject();
        } else {
            await this._initializeInterfaceProject();
            this.setIsLoadedProject(true);
            this._setDuoMode();
        }
        if (document.referrer === 'https://fr.vittascience.com/metaplayer-capytale') {
            await this._setupRPC();
            this.interfaceLoaded();
        }
        if (document.referrer.includes('testIframe') || document.referrer.includes('winkyverse.io')) {
            await this._setupWinkyRPC();
        }
    }

    /**
     * Initialize the current project depending on the interface and the content of localStorage.
     * @private
     */
    async _initializeInterfaceProject() {
        switch (this._interface) {
            case 'ai':
                this._createNewAiProject();
                if (aiMain._model.getAiInterfaceType() !== "text" && aiMain._model.getAiInterfaceType() !== "image-generate") {
                    aiMain._model._tensorFlow.loadModelFromLocalDb();
                } else {
                    aiMain._model._loadProjetFromLocalStorage();
                }
                break;
            case 'adacraft':
                if (getParamValue("action") == "new") {
                    this.localStorageManager.deleteLocalProject();
                    delete window.localStorage["adacraftCurrentCode"];
                    this._createNewProject();
                } else if (typeof window.localStorage["adacraftCurrentCode"] != 'undefined' && this.localStorageManager.getLocalProjectContent()) {
                    await this._loadProjectFromLocalStorage();
                } else {
                    this._createNewProject();
                    this.requiresSetupBlocks = true;
                }
                break;
            default:
                if (getParamValue("action") == "new") {
                    this.localStorageManager.deleteLocalProject();
                    this._createNewProject();
                } else if (this.localStorageManager.getLocalProjectContent()) {
                    await this._loadProjectFromLocalStorage();
                } else {
                    this._createNewProject();
                    this.requiresSetupBlocks = true;
                }
                if (!Main.getIsXmlBasedInterface()) {
                    if (this._interface == 'web') {
                        this._loadCodeToBlockWeb();
                    } else {
                        // HERE ADD the code to blocks event(s) for python based interfaces
                    }
                    this.loadCodeForCodeBasedInterface(this._currentProject.code);
                }
                this._projectLoader_updateSwitchingOptions(false);
                this._projectLoader_setInterfaceMode(false);
        }
    };

    /**
     * Load the current project from localStorage.
     * @private
     */
    async _loadProjectFromLocalStorage() {
        this._currentProject = this.localStorageManager.getLocalProjectContent();
        updateToolbox(this.getToolboxMode());
        if (this._interface == 'python') {
            UnitTests.init(this._currentProject);
        }
        if (this._interface == 'adacraft') {
            this._currentProject.code = window.localStorage["adacraftCurrentCode"];
            const state = adacraft.appStateStore.getState();
            state.scratchGui.vm.loadProject(this._currentProject.code);
        }
        this.updateUrl();
    };

    /**
     * Initialize the project for LTI context
     * @private
     */
    async _initializeProjectForLTI() {
        await this._waitForLti13ControllerLoaded();
        lti13Controller.hideDefaultPrivateButtons();
        if (ltiVariables13.isDeepLink) {
            if (ltiVariables13.updateLink && ltiVariables13.updateLink != 'null') {
                let trainingDataBlocker;
                if (this._interface === 'ai') {
                    trainingDataBlocker = new VittaBlocker(i18next.t('notifications.loadingTrainingData'), '#data');
                }
                await this._projectLoader_loadFromDB(ltiVariables13.updateLink);
                if (this._interface == 'ai') {
                    this._injectProjectInAiInterface(trainingDataBlocker);
                }
                pseudoModal.endBlocker('modal-auto-corrector-creation');
            } else {
                if (this._interface === 'web') {
                    this._createNewProject();
                }
            }
            // Loaded event for RPC
            lti13Controller.interfaceLoaded();
            lti13Controller.createAndAppendLtiButtons('teacher');
        } else {
            const link = ltiVariables13.projectLink;
            let trainingDataBlocker;
            if (this._interface === 'ai') {
                trainingDataBlocker = new VittaBlocker(i18next.t('notifications.loadingTrainingData'), '#data');
            }
            await this._projectLoader_loadFromDB(link);
            if (this._interface == 'ai') {
                this._injectProjectInAiInterface(trainingDataBlocker);
            }
            pseudoModal.endBlocker('modal-auto-corrector-creation');
            // Loaded event for RPC
            lti13Controller.interfaceLoaded();
            if (ltiVariables13.isTeacher) {
                lti13Controller.createAndAppendLtiButtons('teacher');
            } else {
                lti13Controller.createAndAppendLtiButtons('student');
            }
        }
        if (typeof Main !== 'undefined' && !Main.getIsXmlBasedInterface()) {
            if (this._interface == 'web') {
                this._loadCodeToBlockWeb();
            } else {
                // HERE ADD the code to blocks event(s) for python based interfaces
            }
            this.loadCodeForCodeBasedInterface(this._currentProject.code);
        }
        this._setupReporterForLTI();
    };

    /**
     * Initialize the project for legacy LTI context mixed with xapi
     * @private
     */
    async _initializeProjectForLegacyLTI() {
        this._interface = ltiVariables.interface;
        if (!ltiVariables.link) {
            this._createNewProject();
            this._projectLoader_setInterfaceMode(false);
            this.requiresSetupBlocks = true;
        }
        let link = ltiVariables.link;
        await this._projectLoader_loadFromDB(link);
        pseudoModal.endBlocker('modal-auto-corrector-creation');
        if (this._currentExercise == 'no-exercise') {
            xapiAutocorrection.alertNoUnitTest();
        }
    };

    /**
     * Initialize the Adacraft project that loads an image ai model
     * @private
     */
    _initializeImageModelProjectForAdacraft() {
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];
        const model = String(getParamValue("model"));
        let fullLink;
        let xml_ia_start = '';
        if (model === 'local') {
            fullLink = model;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"fARNt$;z6UX0Rj^i7)VX","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":187,"y":123},"m8WkZVjyTR,?Y[+lF6:S":{"opcode":"iaimage_turnOnWebcamAndRunPrediction","next":"Zg*e_rGyt61Qg3*S-+vC","parent":"fARNt$;z6UX0Rj^i7)VX","inputs":{},"fields":{},"shadow":false,"topLevel":false},"Zg*e_rGyt61Qg3*S-+vC":{"opcode":"looks_sayforsecs","next":null,"parent":"m8WkZVjyTR,?Y[+lF6:S","inputs":{"MESSAGE":[3,"}8NH-J6dgsYzEZ[w)p7,",[10,"Bonjour !"]],"SECS":[1,[4,"2"]]},"fields":{},"shadow":false,"topLevel":false},"}8NH-J6dgsYzEZ[w)p7,":{"opcode":"iaimage_getBestDetectionClass","next":null,"parent":"Zg*e_rGyt61Qg3*S-+vC","inputs":{},"fields":{},"shadow":false,"topLevel":false},"fARNt$;z6UX0Rj^i7)VX":{"opcode":"iaimage_selectModelFromLocalStorage","next":"m8WkZVjyTR,?Y[+lF6:S","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iaimage"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"}}'
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"GX~8]h`oI%c1{K^hwRu+","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":187,"y":123},"GX~8]h`oI%c1{K^hwRu+":{"opcode":"iaimage_selectModelByUrlOrKey","next":"m8WkZVjyTR,?Y[+lF6:S","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{"MODEL_KEY_URL":[1,[10,"' + fullLink + '"]]},"fields":{},"shadow":false,"topLevel":false},"Zg*e_rGyt61Qg3*S-+vC":{"opcode":"looks_sayforsecs","next":null,"parent":"m8WkZVjyTR,?Y[+lF6:S","inputs":{"MESSAGE":[3,"}8NH-J6dgsYzEZ[w)p7,",[10,"Bonjour !"]],"SECS":[1,[4,"2"]]},"fields":{},"shadow":false,"topLevel":false},"m8WkZVjyTR,?Y[+lF6:S":{"opcode":"iaimage_turnOnWebcamAndRunPrediction","next":"Zg*e_rGyt61Qg3*S-+vC","parent":"GX~8]h`oI%c1{K^hwRu+","inputs":{},"fields":{},"shadow":false,"topLevel":false},"}8NH-J6dgsYzEZ[w)p7,":{"opcode":"iaimage_getBestDetectionClass","next":null,"parent":"Zg*e_rGyt61Qg3*S-+vC","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iaimage"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"}}'
        }
        adacraft.appStateStore.getState().scratchGui.vm.loadProject(xml_ia_start);
        this._currentProject.code = xml_ia_start;
        window.localStorage["adacraftCurrentCode"] = xml_ia_start;
    };


    _initializePoseModelProjectForAdacraft() {
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];
        const model = String(getParamValue("poseModel"));
        let fullLink;
        let xml_ia_start;
        if (model === 'local') {
            fullLink = model;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":";Moob|?7csnh2YGa/o}2","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":365,"y":1018},"jIxf6gC7Ou#`$de:9vDy":{"opcode":"iaposture_turnOnWebcamAndRunPrediction","next":";T%Bf_u%9?9/s8^z,G!T","parent":"CVXoQW1XqzUs7Z/NqRR8","inputs":{},"fields":{},"shadow":false,"topLevel":false},"?(O%OBy4}gCzoktGm2B0":{"opcode":"iaposture_getBestDetectionClass","next":null,"parent":";T%Bf_u%9?9/s8^z,G!T","inputs":{},"fields":{},"shadow":false,"topLevel":false},"CVXoQW1XqzUs7Z/NqRR8":{"opcode":"control_forever","next":null,"parent":";Moob|?7csnh2YGa/o}2","inputs":{"SUBSTACK":[2,"jIxf6gC7Ou#`$de:9vDy"]},"fields":{},"shadow":false,"topLevel":false},";Moob|?7csnh2YGa/o}2":{"opcode":"iaposture_selectModelFromLocalStorage","next":"CVXoQW1XqzUs7Z/NqRR8","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{},"fields":{},"shadow":false,"topLevel":false},";T%Bf_u%9?9/s8^z,G!T":{"opcode":"looks_say","next":null,"parent":"jIxf6gC7Ou#`$de:9vDy","inputs":{"MESSAGE":[3,"?(O%OBy4}gCzoktGm2B0",[10,"Bonjour !"]]},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iaposture"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"}}'
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"]2bkH:g=UqR$$Jy*eRkY","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":641,"y":288},"CVXoQW1XqzUs7Z/NqRR8":{"opcode":"control_forever","next":null,"parent":"]2bkH:g=UqR$$Jy*eRkY","inputs":{"SUBSTACK":[2,"jIxf6gC7Ou#`$de:9vDy"]},"fields":{},"shadow":false,"topLevel":false},"jIxf6gC7Ou#`$de:9vDy":{"opcode":"iaposture_turnOnWebcamAndRunPrediction","next":";T%Bf_u%9?9/s8^z,G!T","parent":"CVXoQW1XqzUs7Z/NqRR8","inputs":{},"fields":{},"shadow":false,"topLevel":false},";T%Bf_u%9?9/s8^z,G!T":{"opcode":"looks_say","next":null,"parent":"jIxf6gC7Ou#`$de:9vDy","inputs":{"MESSAGE":[3,"?(O%OBy4}gCzoktGm2B0",[10,"Bonjour !"]]},"fields":{},"shadow":false,"topLevel":false},"?(O%OBy4}gCzoktGm2B0":{"opcode":"iaposture_getBestDetectionClass","next":null,"parent":";T%Bf_u%9?9/s8^z,G!T","inputs":{},"fields":{},"shadow":false,"topLevel":false},"]2bkH:g=UqR$$Jy*eRkY":{"opcode":"iaposture_selectModelByUrlOrKey","next":"CVXoQW1XqzUs7Z/NqRR8","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{"MODEL_KEY_URL":[1,[10,"' + fullLink + '"]]},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iaposture"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"}}'
        }
        adacraft.appStateStore.getState().scratchGui.vm.loadProject(xml_ia_start);
        this._currentProject.code = xml_ia_start;
        window.localStorage["adacraftCurrentCode"] = xml_ia_start;
    };

    /**
     * Initialize the python project that loads an image ai model
     * @private
     */
    async _initializeImageModelProjectForPython() {
        const model = String(getParamValue("model"));
        let fullLink = model;
        let xml_ia_start = `<xml xmlns="https://developers.google.com/blockly/xml">`;
        if (model === 'local') {
            xml_ia_start += `<block type="vittaia_load_local_model" id="gL#Y,U5u3fYktjrcfIO_" x="0" y="0"><next><block type="vittaia_make_predictions_webcam" id="\`~9bXA-i-b,S@,Ytp^]f"><next>`;
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start += `<block type="vittaia_load_model" id="*6_s2MN5CdY8;X$\`fzL4" x="0" y="0"><value name="MODEL_URL"><shadow type="text" id="[[0iWHmgY4]Ci2%{j+}u"><field name="TEXT">${fullLink}</field></shadow></value><next><block type="vittaia_make_predictions_webcam" id="\`~9bXA-i-b,S@,Ytp^]f"><next>`;
        }
        xml_ia_start += `<block type="display_print" id="%i*3hjC~~cc.s?:eP/mX"><value name="TEXT"><shadow type="text" id="R#9rYe,oIPRyxjzP_Gfg"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="}PQnWvYhjz#]V0_iAp1N"></block></value></block></next></block></next></block></xml>`;
        await this._createNewProject({
            code: xml_ia_start,
            name: "Modèle d'images IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('model', window.location.href));
    };

    async _initializeEdgeModelProjectMicrobit() {
        
        const model = String(getParamValue("model"));
        let fullLink = model;
        let xml_ia_start = `<xml xmlns="https://developers.google.com/blockly/xml">`;
        if (model === 'local') {
            const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
            let labels = "";
            let firstLabel = ""
            if (metadataFromLocalStorage) {
                const parsedMetaData = JSON.parse(metadataFromLocalStorage);
                firstLabel = typeof parsedMetaData.labels[0] === "string" ? parsedMetaData.labels[0] : "";
                labels = parsedMetaData.labels.join(', ');
                if (Array.isArray(parsedMetaData.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_local_model" id="hikMn16RDpL9hln}J@{*"><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block>`;
        } else {
            const metadataContent = await fetch(`${location.origin}/ia/model/${model}/metadata.json`);
            const metadata = await metadataContent.json();
            let labels = "";
            let firstLabel = ""
            if (metadata) {
                firstLabel = typeof metadata.labels[0] === "string" ? metadata.labels[0] : "";
                labels = metadata.labels.join(', ');
                if (Array.isArray(metadata.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_cloud_model" id="hikMn16RDpL9hln}J@{*"><value name="MODEL_ID"><shadow type="text" id="h!osJX)K3_bz5FtI*#Ct"><field name="TEXT">${fullLink}</field></shadow></value><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block>`;
        }
        xml_ia_start += `</xml>`;
        await this._createNewProject({
            code: xml_ia_start,
            name: "Modèle IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('model', window.location.href));

    };

    async _initializeEdgeModelProjectGalaxia() {
        const model = String(getParamValue("model"));
        let fullLink = model;
        let xml_ia_start = `<xml xmlns="https://developers.google.com/blockly/xml">`;
        if (model === 'local') {
            const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
            let labels = "";
            let firstLabel = ""
            if (metadataFromLocalStorage) {
                const parsedMetaData = JSON.parse(metadataFromLocalStorage);
                firstLabel = typeof parsedMetaData.labels[0] === "string" ? parsedMetaData.labels[0] : "";
                labels = parsedMetaData.labels.join(', ');
                if (Array.isArray(parsedMetaData.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_local_model" id="hikMn16RDpL9hln}J@{*"><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block>`;
        } else {
            const metadataContent = await fetch(`${location.origin}/ia/model/${model}/metadata.json`);
            const metadata = await metadataContent.json();
            let labels = "";
            let firstLabel = ""
            if (metadata) {
                firstLabel = typeof metadata.labels[0] === "string" ? metadata.labels[0] : "";
                labels = metadata.labels.join(', ');
                if (Array.isArray(metadata.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_cloud_model" id="hikMn16RDpL9hln}J@{*"><value name="MODEL_ID"><shadow type="text" id="h!osJX)K3_bz5FtI*#Ct"><field name="TEXT">${fullLink}</field></shadow></value><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block>`;
        }
        xml_ia_start += `</xml>`;
        await this._createNewProject({
            code: xml_ia_start,
            name: "Modèle IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('model', window.location.href));

    };

    async _initializeEdgeModelProjectArduino() {
        const model = String(getParamValue("model"));
        let fullLink = model;
        let xml_ia_start = `<xml xmlns="https://developers.google.com/blockly/xml">`;
        if (model === 'local') {
            const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
            let labels = "";
            let firstLabel = ""
            if (metadataFromLocalStorage) {
                const parsedMetaData = JSON.parse(metadataFromLocalStorage);
                firstLabel = typeof parsedMetaData.labels[0] === "string" ? parsedMetaData.labels[0] : "";
                labels = parsedMetaData.labels.join(', ');
                if (Array.isArray(parsedMetaData.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_local_model" id="hikMn16RDpL9hln}J@{*"><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block><block type="forever" id="r~ko;~xOERc,$21]fNVM" x="137" y="263"></block>`;
        } else {
            const metadataContent = await fetch(`${location.origin}/ia/model/${model}/metadata.json`);
            const metadata = await metadataContent.json();
            let labels = "";
            let firstLabel = ""
            if (metadata) {
                firstLabel = typeof metadata.labels[0] === "string" ? metadata.labels[0] : "";
                labels = metadata.labels.join(', ');
                if (Array.isArray(metadata.labels)) {
                    labels = labels.replaceAll('"', '&quot;');
                    labels = labels.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
            }
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start += `<block type="on_start" id="G[=T#8yqB7A0NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO"><block type="text_comment" id="P-,]_aaOoWOhM#VQ]TZV"><field name="TEXT">Categories: ${labels}</field><next><block type="vittaia_load_cloud_model" id="hikMn16RDpL9hln}J@{*"><value name="MODEL_ID"><shadow type="text" id="h!osJX)K3_bz5FtI*#Ct"><field name="TEXT">${fullLink}</field></shadow></value><next><block type="vittaia_make_prediction" id="3X6;iV,73Pq+zjhm03|%"><next><block type="communication_serialWrite" id="ct~8CDW#NGQ.plGza@9!"><mutation newlines="false"></mutation><value name="TEXT"><shadow type="text" id="e/ljd(yX61r[_:ALtoZ3"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_get_highest_probability_class" id="viapM;qvsI.}G|*G-#Pq"></block></value></block></next></block></next></block></next></block></statement></block><block type="forever" id="r~ko;~xOERc,$21]fNVM" x="137" y="263"></block>`;
        }
        xml_ia_start += `</xml>`;
        await this._createNewProject({
            code: xml_ia_start,
            name: "Modèle IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('model', window.location.href));
    }

    /**
     * Initialize the buddy project that loads an image ai model
     * @private
     */
    _initializeImageModelProjectForBuddy() {
        let XML_PYTHON_IA_START = `<xml xmlns="https://developers.google.com/blockly/xml"><block type="on_start" id="G[=T#8yqB70\`NFgYq}GP" deletable="false" x="0" y="0"><statement name="DO">`;
        XML_PYTHON_IA_START += `<block type="vittaia_load_local_model" id="gL#Y,U5u3fYktjrcfIO_"><next><block type="vittaia_make_predictions_webcam" id="\`~9bXA-i-b,S@,Ytp^]f"><next>`;
        XML_PYTHON_IA_START += '<block type="vi_startSpeaking" id="V{P^2w4kJ,[ejuK{N{1I"><field name="EXPRESSION">SPEAK_HAPPY</field><field name="LOCK">True</field><value name="TEXT"><shadow type="text" id="4?{l_}nWl$(rxsf1,_5q"><field name="TEXT">Bonjour</field></shadow><block type="vittaia_get_highest_probability_class" id="0%y%v?wX#pD%h9b-d}Nc"></block></value></block>';
        XML_PYTHON_IA_START += `</next></block></next></block></statement></block><block type="forever" id="o[WN]+eeF.OUxGch67@8" deletable="false" x="200" y="0"></block></xml>`;
        this._currentProject.code = XML_PYTHON_IA_START;
        this._projectLoader_updateAndRefreshDOM();
    };

    /**
     * Initialize the Adacraft project that loads a sound ai model
     * @private
     */
    _initializeSoundModelProjectForAdacraft() {
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];
        const soundModel = String(getParamValue("soundModel"));
        let fullLink;
        let xml_ia_start;
        if (soundModel === 'local') {
            fullLink = soundModel;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"VittaBot","variables":{},"lists":{},"broadcasts":{},"blocks":{"9Cl(PsnZ]]$^~:6xbcpR":{"opcode":"iason_runPredictionOnMic","next":"z5M:W0~.*5:PEvu;XZ,]","parent":"wL.wobj*)ZDHqk@X6tFU","inputs":{},"fields":{},"shadow":false,"topLevel":false},"wL.wobj*)ZDHqk@X6tFU":{"opcode":"iason_selectModelFromLocalStorage","next":"9Cl(PsnZ]]$^~:6xbcpR","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{},"fields":{},"shadow":false,"topLevel":false},"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"wL.wobj*)ZDHqk@X6tFU","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":187,"y":123},"z5M:W0~.*5:PEvu;XZ,]":{"opcode":"looks_sayforsecs","next":null,"parent":"9Cl(PsnZ]]$^~:6xbcpR","inputs":{"MESSAGE":[3,"gY`L9XJxQp,qnI+|}Zfc",[10,"Bonjour !"]],"SECS":[1,[4,"2"]]},"fields":{},"shadow":false,"topLevel":false},"gY`L9XJxQp,qnI+|}Zfc":{"opcode":"iason_getBestDetectionClass","next":null,"parent":"z5M:W0~.*5:PEvu;XZ,]","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"VittaBot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":24,"rotationCenterY":23}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[{"id":"iason_getBestDetectionClass","mode":"default","opcode":"iason_getBestDetectionClass","params":{},"spriteName":null,"value":0,"width":0,"height":0,"x":5,"y":5,"visible":false,"sliderMin":0,"sliderMax":100,"isDiscrete":true}],"extensions":["iason"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"}}';
        } else {
            fullLink = `${location.origin}/ia/model/${soundModel}/`;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"VittaBot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"5E)xZ9h2C(5RYLYbm-,E","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":187,"y":123},"5E)xZ9h2C(5RYLYbm-,E":{"opcode":"iason_selectModelByUrlOrKey","next":"9Cl(PsnZ]]$^~:6xbcpR","parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{"MODEL_KEY_URL":[1,[10,"' + fullLink + '"]]},"fields":{},"shadow":false,"topLevel":false},"9Cl(PsnZ]]$^~:6xbcpR":{"opcode":"iason_runPredictionOnMic","next":"d:lUP|U`h?A+*:4;pT/g","parent":"5E)xZ9h2C(5RYLYbm-,E","inputs":{},"fields":{},"shadow":false,"topLevel":false},"d:lUP|U`h?A+*:4;pT/g":{"opcode":"looks_sayforsecs","next":null,"parent":"9Cl(PsnZ]]$^~:6xbcpR","inputs":{"MESSAGE":[3,":1lt!+OV(5-0a-}Dx/[(",[10,"Bonjour !"]],"SECS":[1,[4,"2"]]},"fields":{},"shadow":false,"topLevel":false},":1lt!+OV(5-0a-}Dx/[(":{"opcode":"iason_getBestDetectionClass","next":null,"parent":"d:lUP|U`h?A+*:4;pT/g","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"VittaBot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":24,"rotationCenterY":23}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[{"id":"iason_getBestDetectionClass","mode":"default","opcode":"iason_getBestDetectionClass","params":{},"spriteName":null,"value":0,"width":0,"height":0,"x":5,"y":5,"visible":false,"sliderMin":0,"sliderMax":100,"isDiscrete":true}],"extensions":["iason"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"}}';
        }
        adacraft.appStateStore.getState().scratchGui.vm.loadProject(xml_ia_start);
        this._currentProject.code = xml_ia_start;
        window.localStorage["adacraftCurrentCode"] = xml_ia_start;
    }

    /**
     * Initialize the python project that loads a pose ai model
     * @private
     */
    async _initializePoseModelProjectForPython() {
        const model = String(getParamValue("poseModel"));
        let fullLink;
        if (model === 'local') {
            fullLink = model;
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
        }
        await this._createNewProject({
            code: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="vittaia_load_posture_model" id="GF1HZ[FE5~/28)y$4oBz" x="38" y="138"><value name="MODEL_URL"><shadow type="text" id="U/*9.oN2pa]nd;[rnRh="><field name="TEXT">' + fullLink + '</field></shadow></value><next><block type="vittaia_init_posture_webcam" id="[[X.Q3flgp=a}y};Mn~@"><next><block type="display_print" id="|aE%B`eV@y[1Ud=|vi%R"><value name="TEXT"><shadow type="text" id="z=E3%1JcH|nzXQ6t^~~n"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_make_posture_predictions" id="QJkQ0L/AOoRd~1e{)w$$"></block></value></block></next></block></next></block></xml>',
            name: "Modèle de postures IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('poseModel', window.location.href));
    }

    /**
 * Initialize the python project that loads a sound ai model
 * @private
 */
    async _initializeSoundModelProjectForPython() {
        const model = String(getParamValue("soundModel"));
        let fullLink;
        if (model === 'local') {
            fullLink = model;
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
        }
        await this._createNewProject({
            code: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="vittaia_load_sound_model" id="byw]Pa^W8t_lK`6(8CF(" x="38" y="-13"><value name="MODEL_URL"><shadow type="text" id="-%Mf{=;W68[oqO!{X8:j"><field name="TEXT">' + fullLink + '</field></shadow></value><next><block type="vittaia_init_microphone" id="fx%!~WMx[Tkjmy2I1Gxj"><next><block type="display_print" id="2]PSPX:X|L=e%j%I/lIB"><value name="TEXT"><shadow type="text" id="TgD]`0w#3V6,l_5*=!|O"><field name="TEXT">Bonjour !</field></shadow><block type="vittaia_make_sound_predictions" id="/}W8tx26I(K(C]~F?Q(X"></block></value></block></next></block></next></block></xml>',
            name: "Modèle de sons IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('soundModel', window.location.href));
    };
    _initializeImageGenerateForAdacraft() {
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];

    };
    /**
     * Initialize the Adacraft project that loads a text ai model
     * @private
     */
    _initializeTextModelProjectForAdacraft() {
        this.localStorageManager.deleteLocalProject();
        delete window.localStorage["adacraftCurrentCode"];
        const model = String(getParamValue("textModel"));
        let fullLink;
        let xml_ia_start;
        if (model === 'local') {
            fullLink = model;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"BokP[0./UyQxC,SJ5/[R":{"opcode":"event_whenflagclicked","next":"Gg!_,d,e`9vv{T3!B@W)","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":407,"y":250},"Gg!_,d,e`9vv{T3!B@W)":{"opcode":"iatext_selectConversation","next":"}XV5)UI@|*mc0LKFKZ:y","parent":"BokP[0./UyQxC,SJ5/[R","inputs":{"CONV_URL":[1,[10,"local"]]},"fields":{},"shadow":false,"topLevel":false},"}XV5)UI@|*mc0LKFKZ:y":{"opcode":"iatext_selectModel","next":"?Tu`sC7qLIf+K|}vr[a7","parent":"Gg!_,d,e`9vv{T3!B@W)","inputs":{},"fields":{"MODEL":["gpt-4o-mini"]},"shadow":false,"topLevel":false},"?Tu`sC7qLIf+K|}vr[a7":{"opcode":"iatext_setRandomRate","next":"%/bgimq27,i%TI]j5?U+","parent":"}XV5)UI@|*mc0LKFKZ:y","inputs":{"RANDOM_RATE":[1,[4,"50"]]},"fields":{},"shadow":false,"topLevel":false},"%/bgimq27,i%TI]j5?U+":{"opcode":"sensing_askandwait","next":"9r{alFUH}dmZDVv{Wex;","parent":"?Tu`sC7qLIf+K|}vr[a7","inputs":{"QUESTION":[1,[10,"Que puis-je faire pour vous?"]]},"fields":{},"shadow":false,"topLevel":false},"9r{alFUH}dmZDVv{Wex;":{"opcode":"looks_say","next":null,"parent":"%/bgimq27,i%TI]j5?U+","inputs":{"MESSAGE":[3,"lWmaG=?~-/vG?Dw,z`DG",[10,"Bonjour !"]]},"fields":{},"shadow":false,"topLevel":false},"lWmaG=?~-/vG?Dw,z`DG":{"opcode":"iatext_launchPredictionOnText","next":null,"parent":"9r{alFUH}dmZDVv{Wex;","inputs":{"TEXT":[3,"wOm7re4W+};z!m.+0)Q,",[10,"Hello"]]},"fields":{},"shadow":false,"topLevel":false},"wOm7re4W+};z!m.+0)Q,":{"opcode":"sensing_answer","next":null,"parent":"lWmaG=?~-/vG?Dw,z`DG","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iatext"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"}}';
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
            xml_ia_start = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Vittabot","variables":{},"lists":{},"broadcasts":{},"blocks":{"BokP[0./UyQxC,SJ5/[R":{"opcode":"event_whenflagclicked","next":"Gg!_,d,e`9vv{T3!B@W)","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":407,"y":250},"Gg!_,d,e`9vv{T3!B@W)":{"opcode":"iatext_selectConversation","next":"}XV5)UI@|*mc0LKFKZ:y","parent":"BokP[0./UyQxC,SJ5/[R","inputs":{"CONV_URL":[1,[10,"' + fullLink + '"]]},"fields":{},"shadow":false,"topLevel":false},"}XV5)UI@|*mc0LKFKZ:y":{"opcode":"iatext_selectModel","next":"?Tu`sC7qLIf+K|}vr[a7","parent":"Gg!_,d,e`9vv{T3!B@W)","inputs":{},"fields":{"MODEL":["gpt-4o-mini"]},"shadow":false,"topLevel":false},"?Tu`sC7qLIf+K|}vr[a7":{"opcode":"iatext_setRandomRate","next":"%/bgimq27,i%TI]j5?U+","parent":"}XV5)UI@|*mc0LKFKZ:y","inputs":{"RANDOM_RATE":[1,[4,"50"]]},"fields":{},"shadow":false,"topLevel":false},"%/bgimq27,i%TI]j5?U+":{"opcode":"sensing_askandwait","next":"9r{alFUH}dmZDVv{Wex;","parent":"?Tu`sC7qLIf+K|}vr[a7","inputs":{"QUESTION":[1,[10,"Que puis-je faire pour vous?"]]},"fields":{},"shadow":false,"topLevel":false},"9r{alFUH}dmZDVv{Wex;":{"opcode":"looks_say","next":null,"parent":"%/bgimq27,i%TI]j5?U+","inputs":{"MESSAGE":[3,"lWmaG=?~-/vG?Dw,z`DG",[10,"Bonjour !"]]},"fields":{},"shadow":false,"topLevel":false},"lWmaG=?~-/vG?Dw,z`DG":{"opcode":"iatext_launchPredictionOnText","next":null,"parent":"9r{alFUH}dmZDVv{Wex;","inputs":{"TEXT":[3,"wOm7re4W+};z!m.+0)Q,",[10,"Hello"]]},"fields":{},"shadow":false,"topLevel":false},"wOm7re4W+};z!m.+0)Q,":{"opcode":"sensing_answer","next":null,"parent":"lWmaG=?~-/vG?Dw,z`DG","inputs":{},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"Vittabot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":45,"rotationCenterY":83}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":["iatext"],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"}}';
        }
        adacraft.appStateStore.getState().scratchGui.vm.loadProject(xml_ia_start);
        this._currentProject.code = xml_ia_start;
        window.localStorage["adacraftCurrentCode"] = xml_ia_start;
    };

    /**
     * Initialize the python project that loads a text ai model
     * @private
     */
    async _initializeTextModelProjectForPython() {
        const model = String(getParamValue("textModel"));
        let fullLink;
        if (model === 'local') {
            fullLink = model;
        } else {
            fullLink = `${location.origin}/ia/model/${model}/`;
        }
        await this._createNewProject({
            code: '<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"vittaia_load_discussion\" id=\"Ix]VGvWFQw;AhXSb,~A=\" x=\"63\" y=\"88\"><value name=\"MODEL_URL\"><shadow type=\"text\" id=\"~Qc:Lakt7$F(Is=A6k(3\"><field name=\"TEXT\">local</field></shadow></value><next><block type=\"vittaia_set_randomness\" id=\"bVBWA)?1gZyhtq0n_NVE\"><value name=\"TEMPERATURE\"><block type=\"math_number\" id=\"o2PE@8O^8gp7;)Q5-!bv\"><field name=\"NUM\">50</field></block></value><next><block type=\"vittaia_set_model_ia\" id=\"8`/[Uy4b{e[?r`(kfy.-\"><field name=\"MODEL\">mixtral-8x7b-instruct</field><next><block type=\"display_print\" id=\"*ru=|mc*RkX;qT`/FEU5\"><value name=\"TEXT\"><shadow type=\"text\" id=\"zdMsNBW^nihP,ui[20:O\"><field name=\"TEXT\">Bonjour !</field></shadow><block type=\"vittaia_model_text_predict\" id=\"+!y9i3iPy.0j;Dy?3qe)\"><value name=\"MESSAGE\"><block type=\"display_input\" id=\"ohy}6Wu0@w4}m=;4|8k$\"><value name=\"TEXT\"><shadow type=\"text\" id=\"sM;5N_gA^fqEG*6]IC(m\"><field name=\"TEXT\">Entrer un texte :</field></shadow></value></block></value></block></value></block></next></block></next></block></next></block></xml>',
            name: "Modèle de textes IA (" + model + ")"
        });
        this._projectLoader_setInterfaceMode(false);
        history.pushState({}, '', removeParam('textModel', window.location.href));
    };

    /**
     * Initialize the current project using the link in the query parameters
     * @private
     */
    async _initializeStandardLinkedProject() {
        const link = String(getParamValue("link"));
        let trainingDataBlocker;
        if (this._interface == 'ai') {
            if (aiMain._model.getAiInterfaceType() !== "text") trainingDataBlocker = new VittaBlocker(i18next.t('notifications.loadingTrainingData'), '#data');
        }
        await this._projectLoader_loadFromDB(link);
        pseudoModal.endBlocker('modal-auto-corrector-creation');
        if (this._interface == 'ai') {
            await this._initializeLinkedAiProject(trainingDataBlocker);
        }
        this._setupSharedUsers();
        this.setIsLoadedProject(true);
        this._setDuoMode();
    };

    /**
     * Check and load all the various elements for the ai interface
     * @private
     * @param {Object} trainingDataBlocker - The current training data blocker (VittaBlocker instance)
     * @returns {Promise}
     */
    async _initializeLinkedAiProject(trainingDataBlocker) {
        return new Promise(async (resolve, reject) => {
            try {
                const isAiProjectChecked = this._checkAiProject();
                if (!isAiProjectChecked) {
                    console.error('Not the right interface for this project!');
                    aiMain._notif.displayNotification('#global-notifications-area', i18next.t('notifications.badAiInterfaceForProject'), 'bg-danger');
                    trainingDataBlocker.end();
                    return resolve();
                }
                if (isAiProjectChecked === 'bad_json') {
                    if (aiMain._model.getAiInterfaceType() !== "text") trainingDataBlocker.end();
                    return resolve();
                }
                if (aiMain._model.getAiInterfaceType() !== "text") {
                    await aiMain._model.waitIndexedDbFullyLoaded();
                    aiMain._tensorFlow.loadSavedProjectModel();
                    await aiMain._model.loadSavedProjectTrainingData();
                    trainingDataBlocker.end();
                }
                if (aiMain._model.getAiInterfaceType() == "text") aiMain._model.loadSavedProjectModel()
                this.updateUrl();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * Manage the project shared users if any
     * @private
     * @returns {boolean} false if we aren't in sharedUsers context
     */
    _setupSharedUsers() {
        if (this._currentProject.sharedUsers === null) return false;
        let tabSharedUsers = JSON.parse(this._currentProject.sharedUsers);
        document.querySelector('#share-tab-invited-users').innerHTML = '';
        document.querySelector('#panelsStayOpen-collapseTwo .accordion-body').innerHTML = '';
        for (let index = 0; index < tabSharedUsers.length; index++) {
            let verboseRight = "default";
            switch (tabSharedUsers[index].right) {
                case 1:
                case '1':
                    verboseRight = "read";
                    break;
                case 2:
                case '2':
                    verboseRight = "write";
                    break;
            }
            const readSelected = (verboseRight == "read") ? "selected" : "";
            const writeSelected = (verboseRight == "write") ? "selected" : "";
            let divToAdd = `<div class="card-item">
                <div class='card-item-user-infos'>
                    <div class='card-item-letter'><span>`+ tabSharedUsers[index].name.charAt(0).toUpperCase() + `</span><span class='round-online' data-idRound='round-online-` + tabSharedUsers[index].userId + `'>.</span></div>
                    <span class='card-item-name'>`+ tabSharedUsers[index].name + `</span>
                </div>
                <select name="card-mail-right-select" class="card-mail-right-select" data-i="`+ tabSharedUsers[index].userId + `">
                    <option value="read" ${readSelected}>Lecture seule</option>
                    <option value="write" ${writeSelected}>Ecriture</option>
                    <option value="delete">Supprimer l'accès</option>
                </select>
                </div>
                `;

            document.querySelector('#share-tab-invited-users').innerHTML += divToAdd;
            document.querySelector('#panelsStayOpen-collapseTwo .accordion-body').innerHTML += divToAdd;
        }
    }

    /**
     * Setup the activity reporter for LTI
     * @private
     */
    async _setupReporterForLTI() {
        try {
            await Loader.loadScripts([{
                id: "activity-tracker",
                src: `${CDN_PATH}/public/js/scripts/activityTracker/ActivityTracker.js`
            }]);
            window.activityTracker = new ActivityTracker();
            activityTracker.startActivityTracker({
                controller: 'lti_consumer_report',
                action: 'save_user_connection_duration',
                options: {
                    interface: ltiVariables13.interface
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Convert the html entities into human readable characters
     * @public
     * @param {string} sanitizedString 
     * @returns {string|false} The decoded string. False if the provided argument isn't a string
     */
    decodeSanitizedString(sanitizedString) {
        const sanitizedStringType = typeof sanitizedString;
        if (sanitizedStringType !== 'string') {
            console.error(`${String(sanitizedString)} must be a string, ${sanitizedStringType} provided!`);
            return "";
        }
        const textAreaDecoderElt = document.createElement('textarea');
        let previousState = sanitizedString,
            decodedString = previousState,
            securityCount = 0;
        do {
            previousState = decodedString;
            textAreaDecoderElt.innerHTML = previousState;
            decodedString = textAreaDecoderElt.value;
            securityCount++;
        } while (previousState !== decodedString && securityCount < 20);
        return decodedString;
    };

    _setupArduinoInterfaceParameters() {
        if (typeof Main === 'undefined' || !Main.hasCpp2Blocks()) return;
        const Cpp2Blocks = window.Cpp2Blocks;
        Cpp2Blocks.initParser();
    }

    _setupPythonInterfaceParameters() {
        if (typeof Main === 'undefined' || !Main.hasPython2Blocks()) return;
        const PythonToBlocks = window.Python2Blocks
        PythonToBlocks.initParser();
    }

    /**
     * Add properties to projectManager for the web interface
     * @private
     * @returns {undefined} In early return context
     */
    _setupWebInterfaceParameters() {
        if (this._interface !== 'web') return;
        this.toolboxHtml = document.getElementById('toolboxHtml');
        this.timeoutChange = true;
        this.lStorage = "webCurrentProject";
        this.codeToBlocks = new CodeToBlocks(Main.getWorkSpace(), Main.getCodeEditor());
        this._setupJs2Block();
        this.isUpdating = false;
    }

    /**
     * Load the provided code into Ace and trigger the code to block prodedure
     * @public
     * @param {String} code - The code to be loaded in Ace
     */
    loadCodeForCodeBasedInterface(code) {
        if (typeof Main === 'undefined' || !Main.getCodeEditor() || !Main.getCodeEditor().container) return false;
        Main.getCodeEditor().container.setValue(code);
        if (this._interface === 'web') {
            this.executeCodeToBlock(true);
        } else {
            // HERE ADD the python based code to block procedure

        }
    }

    //maybe useless @Nicolas Godeau
    _setupJs2Block() {
        return new Promise((resolve, reject) => {
            if (typeof Js2Block === 'undefined') {
                setTimeout(() => {
                    resolve(this.setupJs2Block());
                }, 10);
                return;
            }
            this.jsToBlocks = new Js2Block(Main.getWorkSpace(), this.editorHtml);
            resolve();
        });
    }

    /**
     * Set Blockly Theme for web interface
     */
    setBlocklyTheme() {
        const themeLabel = localStorage.getItem('theme') || "light";
        const font = localStorage.getItem('font') || "basic";
        let theme = Blockly.Themes[THEMES[themeLabel][font]] || Blockly.Themes.ClassicBase;
        Main.getWorkSpace().setTheme(theme);
        //Overwriting the default theme for the JS workspace because default blockly blocks are not compatible with Vittascience's themes
        let fontFamily = "";
        switch (font) {
            case "basic":
            case "arial":
            case "verdana":
                fontFamily = '"Helvetica Neue", "Segoe UI", "Helvetica", "sans-serif"';
                break;

            case "dys":
                fontFamily = "OpenDyslexic";
                break;

            case "luciole":
                fontFamily = "Luciole";
                break;
        }
        Blockly.Themes["Classic"].setFontStyle({ family: fontFamily, weight: null, size: 12 });
        if (themeLabel == "dark") {
            $("#blocklyDivJs .blocklySvg").css("background-color", "#1e1e1e");
            $("#blocklyDivJs .blocklyFlyoutBackground").css("fill", "rgb(37, 37, 38)");
            $("#blocklyDivJs .blocklyFlyoutBackground").css("fill-opacity", "1");
            $("#blocklyDivJs .blocklyScrollbarHandle").css("fill", "rgb(121, 121, 121)");
            $("#blocklyDivJs .blocklyScrollbarHandle").css("fill-opacity", "0.4");
        } else {
            $("#blocklyDivJs .blocklySvg").css("background-color", "#fff");
            $("#blocklyDivJs .blocklyFlyoutBackground").css("fill", "rgb(255, 255, 255)");
            $("#blocklyDivJs .blocklyFlyoutBackground").css("fill-opacity", "1");
            $("#blocklyDivJs .blocklyScrollbarHandle").css("fill", "rgb(121, 121, 121)");
            $("#blocklyDivJs .blocklyScrollbarHandle").css("fill-opacity", "0.4");
        }
    };

    /**
     * Resize the Blockly workspace to 100% width and height in web interface
     * @public
     */
    webBlocklyResize() {
        window.dispatchEvent(new Event('resize'));
        $(".blocklySvg").attr("width", "100%")
        $(".blocklySvg").attr("height", "100%")
    }

    /**
     * Execute the code in the preview iframe
     * @param {Object} code - HTML code and JS script code (<script></script> is automatically added in body tag)
     */
    executeCode(code) {
        // suppress the old iframe to avoid script kept in memory for the next execution
        let oldIframe = document.getElementById('hcjPreview');
        let container = oldIframe.parentElement;
        let newIframe = document.createElement('iframe');
        newIframe.id = 'hcjPreview';
        newIframe.sandbox = 'allow-scripts allow-modals';

        container.replaceChild(newIframe, oldIframe);
        newIframe.srcdoc = `<html>${code.html}\n${this._scriptConsole()}\n<script>${code.js}</script>\n</html>`;

        // fake url field (change to vannilla js)
        $("#fake-url-field").val($("#hcjPreview").contents().find("title").html());
    }

    /**
     * Generate the code to be insterted in preview iframe to display the preview console
     * @private
     * @returns {String} The code to be insterted in preview iframe to display the preview console
     */
    _scriptConsole() {
        const newConsole = `
            <script>
            // Création du bouton
            const button = document.createElement('button');
            button.id = 'consoleButton';
            button.innerHTML = 'Afficher la console';
            button.style.position = 'fixed';
            button.style.bottom = '15px';
            button.style.right = '10px';
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#22b573';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.padding = '10px 15px';
            button.style.borderRadius = '5px';
            button.style.transition = 'background-color 0.3s';
            button.style.zIndex = '9999';
            
            button.onmouseover = function() {
                this.style.backgroundColor = '#008447';
            }

            button.onmouseout = function() {
                this.style.backgroundColor = '#22b573';
            }
            

            // Création de la div pour la console
            const logDiv = document.createElement('div');
            logDiv.id = 'logDiv';
            logDiv.style.borderTop = '1px solid black';
            logDiv.style.height = '200px';
            logDiv.style.width = '100%';
            logDiv.style.overflow = 'auto';
            logDiv.style.display = 'none'; // cache la console par défaut
            logDiv.style.position = 'fixed';
            logDiv.style.bottom = '2px'; // hauteur du bouton
            logDiv.style.backgroundColor = '#fafafa';
            logDiv.style.color = '#000';
            logDiv.style.fontFamily = 'monospace';
            logDiv.style.padding = '10px';
            logDiv.style.textAlign = 'left';

            // Ajout du bouton et de la console au corps de la page
            document.body.appendChild(button);
            document.body.appendChild(logDiv);

            // Affiche/cache la console au clic
            button.addEventListener('click', function() {
                logDiv.style.display = logDiv.style.display === 'none' ? 'block' : 'none';
                document.getElementById('consoleButton').innerText = logDiv.style.display === 'none' ? 'Afficher la console' : 'Cacher la console';
            });

            // Interception de console.log
            const originalConsoleLog = console.log;
            console.log = function(...args) {
                // Utilisez la console log originale
                originalConsoleLog.apply(console, args);
                
                // Ajoutez le message à la div logDiv
                logDiv.innerHTML += "&gt;&nbsp;" + args.join(' ') + '<br>';

                // Faites défiler la div pour afficher le dernier message
                logDiv.scrollTop = logDiv.scrollHeight;
            };
            </script>
        `
        return newConsole;
    }

    /**
     * Clear all blocks from the workspace without further confirmation
     * @private
     * @param {boolean} [trashItems=true] - Whether to move deleted items to the trashcan storage. Default
     * @param {object} customWorkspace - The Blockly workspace to be cleared
     */
    _clearWorkspace(trashItems, customWorkspace) {
        if (trashItems === false) {
            Blockly.Events.disable();
        }
        customWorkspace.clear();
        if (trashItems === false) {
            Blockly.Events.enable();
        }
    }

    /**
     * Get the xml from Blockly workspace
     * @public
     * @returns {object} The xml from Blockly workspace
     */
    getBlocklyXmlFromWebInterface() {
        var xmlHtml = Blockly.Xml.workspaceToDom(Main.getWorkSpace());
        var xmlTextHtml = Blockly.Xml.domToText(xmlHtml);
        let xmlTextBlockly = {
            html: xmlTextHtml,
        }
        return xmlTextBlockly;
    }

    /**
     * Get the complete code from Ace
     * @returns {string} The complete code
     */
    getCodeFromWebInterface() {
        const [codeHtml, codeJs] = this._extractScriptFromHtml(Main.getCodeEditor().container.getValue());
        const completeCode = {
            html: codeHtml,
            js: codeJs
        }
        return completeCode;
    }

    /**
     * Extract javascript code from html code
     * @private
     * @param {String} html The html code to be parsed
     * @returns {Array} An array with html code as first element and javascript code as second one
     */
    _extractScriptFromHtml(html) {
        const regex = /<script>([\s\S]*?)<\/script>/g;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const scripts = [];
        let scriptOutput = '';

        // get all script tags
        const scriptElements = doc.querySelectorAll('script');
        scriptElements.forEach(script => {
            // check if script is in head or body
            if (script.parentElement.tagName === 'HEAD' || script.parentElement.tagName === 'BODY') {
                scripts.push(script.textContent);
            }
        });
        if (scripts.length > 0) {
            // Suppress script tags for Js2Block
            html = html.replace(regex, '<script></script>');
            scriptOutput = scripts.join('');

        }
        // return scripts as string and html without inner script tags (to avoid html parsing scripts)
        return [html, scriptOutput !== "" ? scriptOutput : null];;
    }

    /**
     * Setup the event listener on Ace to enable code to block workflow
     * @private
     */
    _loadCodeToBlockWeb() {
        Main.getCodeEditor().container.on('change', () => {
            this.executeCodeToBlock();
        });
    }

    /**
     * Generate blocks in Blockly workspace according to the code from Ace
     * @public
     * @param {Boolean} forceRun - Force the codeToBlock process event if ace isn't focused
     * @returns {undefined} in early return context
     */
    executeCodeToBlock(forceRun = false) {
        if (!forceRun && !this.isUpdating && !Main.getCodeEditor().container.isFocused()) {
            this._refreshProjectStatus();
            return;
        }
        if (forceRun || Main.getCodeEditor().container.isFocused()) {
            this._runCodeToBlocks();
        }
        // update local storage after code change
        const lStorageProject = this.localStorageManager.getLocalProjectContent();
        const updatedCode = Main.getCodeEditor().container.getValue();
        lStorageProject.code = updatedCode;
        this.localStorageManager.setLocalProject(lStorageProject);
        CodeManager.getSharedInstance().setGeneratedCode();
        CodeManager.getSharedInstance().setXml(CodeManager.getSharedInstance().getCode());
        this._refreshProjectStatus();
    }

    /**
     * Disable JS blocks if they are not in the script tag branch code and disable All other blocks if they are in the script tag branch code
     * @public
     * @param {Object} event - The event that triggered the renderContent
     * @param {Object} workspace - A Blockly workspace
     * @returns {undefined} In early return case
     * @example : renderContent(event, workspace)
     */
    renderContent(event, workspace) {
        if (event === null || event === undefined) return;
        // const ALL_BLOCKS = workspace.getAllBlocks().map(block => block.type); /* ALL_BLOCKS ISN'T USED */
        if (event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_DELETE || event.type == Blockly.Events.BLOCK_MOVE) {
            const currentBlocks = workspace.getAllBlocks();
            currentBlocks.forEach(block => {
                const isEnabledHtml = this._isWithinSpecificBranch(block, 'html');
                block.setEnabled(isEnabledHtml);
                if (JS_BLOCKS.includes(block.type)) {
                    const isEnabled = this._isWithinSpecificBranch(block, "script_tag");
                    block.setEnabled(isEnabled);
                }
            });
        } else if (event.type == Blockly.Events.BLOCK_CHANGE && this.timeoutChange == true) {
            // maybe useless
            this.timeoutChange = false;
            setTimeout(function () {
                this.timeoutChange = true;
            }, 40);
        }
    }

    /**
     * Recursive check if the block and their childs are in the script tag branch code
     * @private
     * @param {Object} block - A Blockly block
     * @param {String} element - Is html or script_tag
     * @returns {Boolean} Whether the block is in the script tag branch code
     */
    _isWithinSpecificBranch(block, element) {
        if (!block) return false;
        if (block.type === element) return true; // is a script_tag
        let parentBlock = block.getSurroundParent();
        while (parentBlock) {
            if (parentBlock.type === element) {
                return true; // isin branchCode
            }
            block = parentBlock;
            parentBlock = block.getSurroundParent();
        }
        if (block.type === element) return true; // don't know why but it's needed :-)
        return false;
    }

    /**
     * Main process for code <-> block system. Extract scripts if present and check if in "script_tag" and generate blocks from  HTML/CSS code first and then JS scripts. Reorganize blocks after that.
     * @private
     * @return {void}
     */
    _runCodeToBlocks() {
        this.isUpdating = true;
        const workspace = Main.getWorkSpace();
        const ALL_DISABLED_BLOCKS = workspace.getAllBlocks().filter(block => block.disabled === true);
        this.disabledBlocksXml = ALL_DISABLED_BLOCKS.filter(block => !block.getParent()).map(block => Blockly.Xml.blockToDomWithXY(block));
        const codeHtml = Main.getCodeEditor().container.getValue();
        // separate html and script (only works properly if there is only one script tag)
        const [html, script] = this._extractScriptFromHtml(codeHtml);
        this.htmlCode = html;
        this.jsCode = script;

        Blockly.Events.disable();
        try {
            this.codeToBlocks.addHtmlBlocks(html);
            if (script != null && script.length > 0) {
                this.jsToBlocks.addJsBlocks(script);
            }

            // launch code organization after adding all blocks (HTML/CSS && JS)
            this.codeToBlocks.organizePrototypeBlocks(workspace);

            if (this.disabledBlocksXml.length > 0) {
                this.disabledBlocksXml.forEach(blockXml => {
                    try {
                        let block = Blockly.Xml.domToBlock(blockXml, workspace);
                        let x = parseInt(blockXml.getAttribute('x'), 10);
                        let y = parseInt(blockXml.getAttribute('y'), 10);
                        if (!isNaN(x) && !isNaN(y)) {
                            block.moveBy(x, y);
                        }
                    } catch (error) {
                        console.error("Erreur lors de l'ajout du bloc:", error);
                    }
                });
            }
            this.isUpdating = false;
        } catch (error) {
            console.warn(error);
        }
        Blockly.Events.enable();
    }
    // ============================== RPC PREVIEW START ===============================

    /**
     * Create the RPC service and setup its exposed actions
     * @returns {undefined} - If not in RPC context
     */
    async _setupRPC() {
        // if (!this._isRPC) return;
        await this._loadRPCScript();
        const rpcServiceId = 'capytale-player';
        this._rpc = new RPC({
            target: window.parent,
            serviceId: rpcServiceId
        });
        this._rpcContractId = 'lti.vs:2';
        this._isRpcContractSynchro = false;
        // this._rpc.expose('save', this._rpcSave);
        this._rpc.expose('ping', this._rpcPing);
        // this._rpc.expose('reset', this._rpcReset);
        // this._rpc.expose('exportBase64', this._rpcExport);
        return true;
    }

    /**
     * Create the RPC service and setup its exposed actions
     * @returns {undefined} - If not in RPC context
     */
    async _setupWinkyRPC() {
        console.log('Setup Winky interface RPC');
        await this._loadRPCScript();
        const rpcServiceId = 'winky-rpc';
        this._rpc = new RPC({
            target: window.parent,
            serviceId: rpcServiceId
        });
        return true;
    }

    /**
     * Load the rpc javascript library
     * @private
     * @returns {Promise}
     */
    _loadRPCScript() {
        return new Promise((resolve, reject) => {
            try {
                const scriptElt = document.createElement('script');
                scriptElt.src = `${CDN_PATH}/lti13/js/rpc.js`;
                scriptElt.addEventListener('load', () => {
                    resolve();
                });
                document.head.appendChild(scriptElt);
            } catch (error) {
                console.error(error);
                reject();
            }
        });
    };

    /**
     * Return the string pong in response to the ping
     * @param {object} data - The optional parameter provided by the Platform during the RPC call 
     * @returns {string} - pong
     */
    _rpcPing = (data) => {
        return 'pong';
    }

    /**
     * Send an "edited" postMessage or message with RPC if the project has been edited
     * @returns {undefined} - Early return if we aren't in RPC context
     */
    setprojectStatusToEdited() {
        if (typeof this._rpc === 'undefined' || this._evidenceBContext) {
            window.parent.postMessage(JSON.stringify({ type: 'lti-edited' }), '*');
            return;
        }
        this._rpc.call('contentChanged');
    }

    /**
     * Inform the platform that the interface is loaded using rpc interoperability
     * @public
     * @returns {undefined} Early return outside of rpc context
     */
    async interfaceLoaded() {
        if (typeof this._rpc === 'undefined') return;
        const remoteContractId = await this._rpc.call('appReady', [this._rpcContractId]);
        this._isRpcContractSynchro = this._rpcContractId === remoteContractId;
    };

    // ============================== RPC PREVIEW END =================================

    tiInterfaceEvents(action) {
        switch (action) {
            case "newPythonProjects200124":
                //check for observer
                this.tiProjectsEvents(true);
                break;
            case "newPythonEditor200124":
                document.querySelector('.blocklyTreeRow#math').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                setTimeout(() => {
                    $(".blocklyTreeRow#math").click()
                }, 500);
                break;
        }
    };

    tiProjectsEvents(first) {
        if (first) {
            openProjectBtn();
        }
        setTimeout(() => {
            if (this.exampleProjectsLoaded) {
                $("#example-projects-list .openproject-subtitle").click();
                setTimeout(() => {
                    $("#essentials-content").prev().click();
                }, 1000);
            } else {
                this.tiProjectsEvents(false);
            }
        }, 500);
    };

    /**
     * Check if the provided project name isn't already used amongst the user's projects
     * @public
     * @param {string} name - A project name
     * @returns {Promise} Resolve true if the project name is available, false otherwise
     */
    async isProjectNameAvailable(name) {
        if (!UserManager.getUser()) return true;
        if (!this.myProjectsLoaded) {
            await this._setMyProjects(this);
            this.populateAllProjects();
            if (!this.isVisitor) {
                this.myProjectsLoaded = true;
            }
        }
        const myProjects = this.getMyProjects();
        const isProjectNameUsed = myProjects.filter((project) => {
            return project.name === name;
        });
        if (isProjectNameUsed.length === 0) return true;
        return false;
    };

    // ============================== UTILS ===============================

    /**
     * Return true if the two provided projects have same code.
     * @private
     * @param {Object} parameters
     * @param {Object} project
     * @returns {boolean} equals
     */
    _equals(parameters, project) {
        const isObject = (obj) => obj !== null && typeof obj == 'object';
        const isEquals = function (obj1, obj2, objKey) {
            if (obj1 === null || obj2 === null) {
                return false;
            } else if (isObject(obj1) && isObject(obj2)) {
                if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
                for (const key of Object.keys(obj1)) {
                    const areObj = isObject(obj1[key]) && isObject(obj2[key]);
                    if (areObj && !isEquals(obj1[key], obj2[key]) || !areObj && obj1[key] !== obj2[key]) return false;
                }
                return true;
            } else if (!isObject(obj1) && !isObject(obj2)) {
                if (objKey === 'code') {
                    obj1 = obj1.replace(/deletable="false" x="[0-9]{1,4}" y="[0-9]{1,4}"/g, 'deletable="false"');
                    obj2 = obj2.replace(/deletable="false" x="[0-9]{1,4}" y="[0-9]{1,4}"/g, 'deletable="false"');
                }
                return obj1 === obj2;
            } else {
                //console.error(`Parameters ${objKey} may have same types.`)
            }
        };
        for (var i in parameters) {
            if (!isEquals(parameters[i], project[i], i)) {
                return false;
            }
        }
        return true;
    };

    /**
     * Update multiEditor of localStorage.
     * @public
     * @param {string} link - The project link
     * @returns {boolean} false if we aren't in multi editor context (multi parameter missing in url query string)
     */
    updateMultiEditorLS(link, interfaceName) {
        const multiParam = getParamValue("multi");
        if (multiParam === null) return false;
        const iframe = String(multiParam);
        const multiEditorLS = localStorage.getItem('multiEditor');
        if (multiEditorLS) {
            const multiEditor = JSON.parse(multiEditorLS);
            const editor = {
                'link': link,
                'interface': interfaceName
            };
            multiEditor.multi[iframe] = editor;
            localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
            this.updateMultiUrl(multiEditor.multi);
        }
    };

    /**
     * Update multi page url
     * @public
     * @param {object} multiPage - The interfaces and links for the multiEditor iframes
     */
    updateMultiUrl(multiPage) {
        const iframe1 = multiPage.first.interface;
        const iframe2 = multiPage.second.interface;
        const link1 = multiPage.first.link;
        const link2 = multiPage.second.link;
        const simu = $_GET("simu") ? '1' : '';
        const linkStruct = {
            base: window.location.origin + window.parent.location.pathname.split('?')[0],
            args: {
                iframe1: iframe1,
                link1: link1 ? link1 : '',
                iframe2: iframe2,
                link2: link2 ? link2 : '',
                simu: simu
            }
        };
        const url = stringifyLinkShare(linkStruct);
        window.parent.window.postMessage('url-for-multi=' + url, '*');
    };

    async _initializeInteroperability() {
        if (typeof IS_CAPYTALE_CONTEXT === 'undefined') return;
        const appAgentUrl = '/openInterface/interfaces/assets/js/events/CapytaleManager.js';
        const appAgentScriptElt = document.createElement('script');
        appAgentScriptElt.type = 'module';
        document.querySelector('head').appendChild(appAgentScriptElt);
        const appAgentLoaded = await new Promise((resolve) => {
            try {
                appAgentScriptElt.addEventListener('load', () => {
                    resolve(true);
                });
                appAgentScriptElt.addEventListener('error', () => {
                    console.error(`Failed to load script: ${appAgentUrl}`);
                    resolve(false);
                });
                appAgentScriptElt.src = appAgentUrl;
            } catch (error) {
                console.error(error);
                resolve(false);
            }
        });
        if (!appAgentLoaded) {
            console.error('Capytale app-agent failed loading...');
            return false;
        }
        this._capytaleManager = capytaleManager;
        return true;
    }

    /**
     * Get the current project data for appAgent
     * @returns {object} The current project data
     */
    getCurrentProjectDataForAppAgent() {
        const dynamicProperties = this._getDynamicProjectProperties();

        const currentProjectData = {
            'code': dynamicProperties.code,
            'codeText': dynamicProperties.codeText,
            'codeManuallyModified': dynamicProperties.codeManuallyModified,
            'mode': dynamicProperties.mode,
            'interface': this._interface,
            'options': dynamicProperties.options,
            'exercise': null // TO BE CHANGED WHEN AUTOCORRECTOR WILL WORK ON FRONT END
        };
        return currentProjectData;
    }

    _getDynamicProjectProperties() {
        let dynamicProperties;

        if (projectManager.getInterface() == 'adacraft') {
            dynamicProperties = {
                'code': adacraft.getCurrentProjectJson(),
                'codeText': '',
                'codeManuallyModified': false,
                'mode': projectManager._currentProject.mode,
                'options': null
            };
        } else {
            dynamicProperties = {
                'code': CodeManager.getSharedInstance().getXml(),
                'codeText': CodeManager.getSharedInstance().getTextCode(),
                'codeManuallyModified': CodeManager.getSharedInstance().codeWasManuallyModified,
                'mode': CodeManager.getSharedInstance()._getSelectedMode(),
                'options': projectManager.getCurrentOptionsStatus()
            };
        }
        return dynamicProperties;
    }

    /**
     * Display the page preview in "fullscreen" (web interface)
     * @public
     */
    showPreviewOnly() {
        $('#executeRight').toggleClass('fullscreen-mode');
        history.pushState({}, '', removeParam("previewOnly", window.location.href));
        if ($('#executeRight').hasClass('fullscreen-mode')) {
            history.pushState({}, '', window.location.href + "&previewOnly=true");
        }
    }

    /**
     * Refresh the page preview content according to the code/blocks (web interface)
     * @public
     */
    refreshWebPreview() {
        let code = projectManager.getCodeFromWebInterface();
        projectManager.executeCode(code);
    }

    async initializeMultiInterfaces() {
        if (!this._multiManager) {
            await this.loadJavascriptFile(`/openInterface/interfaces/assets/js/simulator/multi/MultiManager.js`, 'module');
            this._multiManager = multiManager;
        }
        await this._multiManager.startMulti();
        return;
    }

    multiToggleSimulator() {
        if (!this._multiManager) return;
        this._multiManager.toggleChildSimulator();
    }

    multiSwitchBlockMode() {
        if (!this._multiManager) return;
        this._multiManager.switchChildBlockMode();
    }

    multiSwitchMixedMode() {
        if (!this._multiManager) return;
        this._multiManager.switchChildMixedMode();
    }

    multiSwitchCodeMode() {
        if (!this._multiManager) return;
        this._multiManager.switchChildCodeMode();
    }

    multiUpdateWebsiteAccessibility(formElement) {
        if (!this._multiManager) return;
        this._multiManager.updateWebsiteAccessibility(formElement);
    }

    /**
     * Import the provided javascript file to the document body
     * @public
     * @param {String} filePath - The javascript file path
     * @param {String} type - The javascript type (eg: module)
     * @returns {Promise} When the file is fully loaded
     */
    async loadJavascriptFile(filePath, type=undefined) {
        const currentScript = document.createElement('script');
        await new Promise((resolve, reject) => {
            try {
                currentScript.addEventListener('load', ()=> {
                    resolve();
                });
                if (type) currentScript.type = type;
                currentScript.src = `${CDN_PATH}${filePath}`;
                document.body.appendChild(currentScript);
            } catch(error) {
                reject();
            }
        });
        return true;
    }

    /**
     * IsLoadedProject property setter
     * @public
     * @param {boolean} isLoaded 
     */
    setIsLoadedProject(isLoaded) {
        this._isLoadedProject = isLoaded;
    }

    /**
     * IsLoadedProject property getter
     * @public
     * @returns {boolean} IsLoadedProject value
     */
    getIsLoadedProject() {
        return this._isLoadedProject;
    }

    async awaitInitialProjectLoaded() {
        if (!this.getIsLoadedProject()) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            await this.awaitForProjectLoad();
        }
        return true;
    }

    /**
     * Load RTC related files, instanciate and initialize RtcManager
     * @public
     * @returns {Promise} false if RTC hasn't been initialized, true otherwise
     */
    async initializeRtc() {
        await this.awaitInitialProjectLoaded();
        if (this.getCurrentProject().sharedStatus === 3) return false;
        if (!this._rtcLoaded) {
            const rtcFiles = [
                '/openInterface/interfaces/assets/js/rtc/RtcManager.js',
                '/openInterface/interfaces/assets/js/rtc/AceCursorMarker.js',
                '/openInterface/interfaces/assets/js/rtc/AceMultiCursorManager.js',
                '/openInterface/interfaces/assets/js/rtc/AceMultiSelectionManager.js',
                '/openInterface/interfaces/assets/js/rtc/AceSelectionMarker.js',
                '/python/assets/js/vittapyther/socket.io.min.js'
            ];
            const fileLoadPromises = [];
            for (const file of rtcFiles) {
                fileLoadPromises.push(this.loadJavascriptFile(`${file}`));
            }
            await Promise.all(fileLoadPromises);
            this._rtcLoaded = true;
        }
        rtcManager = new RtcManager();
        rtcManager.init();
        return true;
    }

    async _setupLocalCompilation() {
        const localCompilationInterfaces = ['arduino', 'mBot'];
        if (!localCompilationInterfaces.includes(INTERFACE_NAME)) return;
        await this.loadJavascriptFile(`${CDN_PATH}/public/js/scripts/vittaCompilation/VittaCompilator.js`, 'module');
        return;
    }

    _setDuoMode() {
        if (!$_GET('duo')) return;
        this.initializeMultiInterfaces();
    }
}