/**
 * Manage the turtle autocorrector system for the python interface
 */

import TurtleRenderTracer from './TurtleRenderTracer.js';

class TurtleAutocorrector {
    constructor() {
        if (TurtleAutocorrector._instance) return TurtleAutocorrector._instance;
        TurtleAutocorrector._instance = this;
        this._currentProjectStorageId = null;
        this._referenceAutocorrection = null;
        this._referenceImage = null;
        this._pendingReferenceAutocorrection = null;
        this._pendingReferenceImage = null;
        this._isBlankProjectCheckboxListenerSet = false;
        this._renderTracer = new TurtleRenderTracer();
        this._lastComparisonFailure = null;
        this._lastReferenceState = null;
    }

    /**
     * Tell whether turtle persistence must bypass backend calls
     * @private
     * @returns {boolean} True on a local host
     */
    _shouldUseLocalPersistence() {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
    }

    /**
     * Get the local storage manager instance
     * @private
     * @returns {LocalStorageManager} The shared local storage manager
     */
    _getLocalStorageManager() {
        return CodeManager.getSharedInstance().localStorageManager;
    }

    /**
     * Get the storage identifier for the current project
     * @private
     * @param {object} [project=projectManager.getCurrentProject()] - The project to identify
     * @returns {string|null} The project identifier
     */
    _getProjectStorageId(project = projectManager.getCurrentProject()) {
        return project?.link || $_GET('link') || $_GET('localId') || null;
    }

    /**
     * Clear the in-memory turtle state for the current project context
     * @private
     * @returns {void}
     */
    _resetProjectState() {
        this._referenceAutocorrection = null;
        this._referenceImage = null;
        this._pendingReferenceAutocorrection = null;
        this._pendingReferenceImage = null;
    }

    /**
     * Synchronize the in-memory turtle state with the currently opened project
     * @private
     * @param {object} [project=projectManager.getCurrentProject()] - The project to synchronize
     * @returns {string|null} The current project identifier
     */
    _synchronizeProjectContext(project = projectManager.getCurrentProject()) {
        const projectStorageId = this._getProjectStorageId(project);
        if (projectStorageId !== this._currentProjectStorageId) {
            this._currentProjectStorageId = projectStorageId;
            this._resetProjectState();
        }
        return projectStorageId;
    }

    /**
     * Build the turtle local state for one project
     * @private
     * @param {object} project - The project to serialize
     * @returns {object} The turtle local state
     */
    _buildLocalTurtleState(project) {
        return {
            showBlankProject: Boolean(project?.options?.showBlankProject),
            turtleAutocorrection: project?.options?.turtleAutocorrection ?? null
        };
    }

    /**
     * Read the local turtle state for one project
     * @private
     * @param {object} [project=projectManager.getCurrentProject()] - The project to read
     * @returns {object|null} The stored local turtle state
     */
    _getLocalTurtleState(project = projectManager.getCurrentProject()) {
        const projectId = this._getProjectStorageId(project);
        if (!projectId) {
            return null;
        }
        return this._getLocalStorageManager().getProjectScopedData('turtleAutocorrection', projectId);
    }

    /**
     * Persist the local turtle state for one project
     * @private
     * @param {object} project - The project to persist
     * @returns {boolean} True if the local persistence succeeded
     */
    _saveLocalTurtleState(project) {
        const projectId = this._getProjectStorageId(project);
        if (!projectId) {
            return false;
        }

        const saved = this._getLocalStorageManager().setProjectScopedData(
            'turtleAutocorrection',
            this._buildLocalTurtleState(project),
            projectId
        );

        if (saved) {
            projectManager._projectLoader_setCurrentProject(project);
        }

        return saved;
    }

    /**
     * Persist the current project state either locally or through the backend.
     * @private
     * @param {object} project - The project to persist
     * @returns {Promise<boolean>} True when the persistence succeeded
     */
    async _persistProjectState(project) {
        if (this._shouldUseLocalPersistence()) {
            return this._saveLocalTurtleState(project);
        }

        projectManager._projectLoader_setCurrentProject(project);
        await projectManager.uploadProjectUpdate(projectManager);
        return true;
    }

    /**
     * Get the effective options of the current project, including local turtle overrides
     * @private
     * @param {object} [project=projectManager.getCurrentProject()] - The project to read
     * @returns {object} The effective options
     */
    _getEffectiveProjectOptions(project = projectManager.getCurrentProject()) {
        const effectiveOptions = { ...(project?.options || {}) };
        const localTurtleState = this._getLocalTurtleState(project);

        if (!localTurtleState) {
            return effectiveOptions;
        }

        if (Object.prototype.hasOwnProperty.call(localTurtleState, 'showBlankProject')) {
            effectiveOptions.showBlankProject = Boolean(localTurtleState.showBlankProject);
        }

        if (Object.prototype.hasOwnProperty.call(localTurtleState, 'turtleAutocorrection')) {
            if (localTurtleState.turtleAutocorrection) {
                effectiveOptions.turtleAutocorrection = localTurtleState.turtleAutocorrection;
            } else {
                delete effectiveOptions.turtleAutocorrection;
            }
        }

        return effectiveOptions;
    }

    /**
     * Set the state of the turtle exercise creation modal and open it
     * @public
     */
    async openTurtleExerciseCreationModal() {
        const saveButton = document.querySelector('#save-turtle-exercise');
        this._synchronizeProjectContext();
        saveButton.textContent = i18next.t('modals.turtleCorrection.saveExercise');
        this._loadReferenceImage();
        this.setButtonDisabled(saveButton, true, i18next.t('modals.turtleCorrection.mustExecute'));
        if (!this._pendingReferenceImage && this.isEnabled()){
            this.setButtonDisabled(saveButton, true, i18next.t('modals.turtleCorrection.currentlyUpToDate'));
        }
        document.querySelector('#turtle-exercise-creation-explanations').style.display = 'block';
        document.querySelector('#turtle-exercise-creation-image').style.display = 'none';
        this._updateImageOpeningExerciseCreationModal();
        this._updateBlankProjectCheckbox();
        await this._manageUpToDateNotice();
        this._setBlankProjectCheckboxListener();
        if (this._pendingReferenceImage && !(await this._getIsReferenceImageSaved())){
            this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), false, i18next.t('modals.turtleCorrection.canSave'));
        }
        pseudoModal.openModal('modal-turtle-auto-corrector-creation');
    }

    /**
     * Record the turtle course for the exercise creation while handling modal buttons
     * @public
     * @returns {Promise} resolve true when finished
     */
    async recordExercise() {
        this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.currentlyBusy'));
        this.setButtonDisabled(document.querySelector('#record-turtle-exercise-btn'), true, i18next.t('modals.turtleCorrection.currentlyBusy'));
        document.querySelector('#turtle-exercise-creation-explanations').style.display = 'none';
        document.querySelector('#turtle-exercise-creation-image').style.display = 'none';
        this._moveTurtleCanvasesToModal(true);
        const capturedReference = await this._renderTracer.captureReference(async () => {
            await PythonRun.start(CodeManager.getSharedInstance().getCode(), "console");
        });
        this._pendingReferenceAutocorrection = this._cloneAutocorrectionData(capturedReference);
        this._pendingReferenceImage = this._pendingReferenceAutocorrection?.image || null;
        this._moveTurtleCanvasesToModal(false);
        this._appendMergedCanvasesInModal(true);
        if (await this._getIsReferenceImageSaved() && this._getIsBlankProjectStatusSaved()) {
            this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.currentlyUpToDate'));
        } else {
            this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), false, i18next.t('modals.turtleCorrection.canSaveExercise'));
        }
        this.setButtonDisabled(document.querySelector('#record-turtle-exercise-btn'), false, i18next.t('modals.turtleCorrection.canRecordExercise'));
        await this._manageUpToDateNotice();
        return true;
    }

    /**
     * Save the turtle exercise (reference image) in the database using the project options
     * @public
     * @returns {Promise} resolve true when finished
     */
    async saveTurtleExercise() {
        const vittaNotif = new VittaNotif();
        try {
            const currentProject = this._getProjectCurrentState();
            if (!(await this._persistProjectState(currentProject))) {
                throw new Error('Turtle autocorrection persistence failed.');
            }
            document.querySelector('#save-turtle-exercise').textContent = i18next.t('modals.turtleCorrection.updateExercise');
            this._referenceAutocorrection = this._cloneAutocorrectionData(this._pendingReferenceAutocorrection);
            this._referenceImage = this._referenceAutocorrection?.image || this._pendingReferenceImage;
            this._storeReferenceState(this._referenceAutocorrection, { reason: null });
            this._pendingReferenceAutocorrection = null;
            this._pendingReferenceImage = null;
            await this._manageUpToDateNotice();
            this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.currentlyUpToDate'));
            this.displayValidationButton();
            vittaNotif.displayNotification(null, i18next.t('notifications.turtleExerciseSaved'), 'bg-success');
            return true;
        } catch(error) {
            console.error(error);
            vittaNotif.displayNotification(null, i18next.t('notifications.turtleExerciseSaveFailed'), 'bg-danger');
            return false;
        }
    }

    /**
     * Tells if the current project gets a turtle autocorrection
     * @public
     * @returns {boolean} true if the project gets a turtle autocorrection, false otherwise
     */
    isEnabled() {
        if (typeof projectManager === 'undefined' || !projectManager) {
            console.warn('projectManager not available, skipping turtle autocorrection check...');
            return;
        }
        const currentProjectOptions = this._getEffectiveProjectOptions();
        if (currentProjectOptions.turtleAutocorrection) return true;
        return false;
    }

    /**
     * Get the the turtle exercise image from the project options field
     * @public
     * @returns {string} the base64 of the image
     */
    getCurrentProjectAutocorrectionImage() {
        const currentProjectOptions = this._getEffectiveProjectOptions();
        if (!currentProjectOptions.turtleAutocorrection || !currentProjectOptions.turtleAutocorrection.image) {
            console.warn('No turtle autocorrection found!');
            return false;
        }
        return currentProjectOptions.turtleAutocorrection.image;
    }

    /**
     * Load the reference image from the project
     * @private
     * @returns {undefined} Early return cases
     */
    _loadReferenceImage() {
        const currentProject = projectManager.getCurrentProject();
        this._synchronizeProjectContext(currentProject);
        this._referenceAutocorrection = null;
        this._referenceImage = null;

        const currentProjectOptions = this._getEffectiveProjectOptions(currentProject);
        if (!currentProjectOptions) {
            this._storeReferenceState(null, { reason: 'missing-options' });
            return console.error('No options for current project') && false;
        }
        if (!currentProjectOptions.turtleAutocorrection) {
            this._storeReferenceState(null, { reason: 'missing-turtle-autocorrection' });
            return console.error('No turtleAutocorrection for current project') && false;
        }
        if (!currentProjectOptions.turtleAutocorrection.image) {
            this._storeReferenceState(currentProjectOptions.turtleAutocorrection, { reason: 'missing-reference-image' });
            return console.error('No turtleAutocorrection image for current project') && false;
        }
        this._referenceAutocorrection = this._cloneAutocorrectionData(currentProjectOptions.turtleAutocorrection);
        this._referenceImage = this._referenceAutocorrection.image;
        this._storeReferenceState(this._referenceAutocorrection, { reason: null });
    }

    /**
     * Run the autocorrection testing by comparing the current turtle images with the reference image
     * public
     * @returns {Promise} resolve true if the tests succeeded, false otherwise
     */
    async runAutocorrection() {
        this._loadReferenceImage();
        const currentRender = await this._renderTracer.captureExecution(async () => {
            await PythonRun.start(CodeManager.getSharedInstance().getCode(), "console");
        });
        const testedImage = currentRender?.image || false;
        const success = testedImage ? await this._compareCurrentImageWithReference(currentRender) : false;
        
        this._displayResults(success, testedImage);
        if (success) {
            projectManager.pythonAutocorrectionInteroperabilitySuccess();
        }
        return success;
    }

    /**
     * Display the turtle autocorrection results to the user
     * @private
     * @param {boolean} success - Whether the result was a success or not
     * @param {string | boolean} testedImage - The base64 of the tested turtle image or false
     */
    _displayResults(success, testedImage) {
        const passedNoticeElt = document.querySelector('#turtle-validation-modal-notice-passed'),
            failedNoticeElt = document.querySelector('#turtle-validation-modal-notice-failed'),
            noTurtleCourseNoticeElt = document.querySelector('#turtle-validation-modal-notice-no-turtle-course'),
            referenceImageElt = document.querySelector('#turtle-validation-modal-reference-image'),
            userImageElt = document.querySelector('#turtle-validation-modal-user-image'),
            continueBtnElt = document.querySelector('#modal-turtle-validation-continue-btn');

        passedNoticeElt.style.display = 'none';
        failedNoticeElt.style.display = 'none';
        noTurtleCourseNoticeElt.style.display = 'none';
        continueBtnElt.style.display = 'none';
        if (success) {
            passedNoticeElt.style.display = 'flex';
            // continueBtnElt.style.display = 'block'; TEMPORARY DISABLED UNTIL INTEROPERABILITY WILL BE IMPLEMENTED
        } else if (!testedImage) {
            noTurtleCourseNoticeElt.style.display = 'flex';
        } else {
            failedNoticeElt.style.display = 'flex';
        }
        referenceImageElt.src = this._referenceImage;
        if (!testedImage) {
            userImageElt.src = `${CDN_PATH}/public/content/img/robot_warning.svg`;
        } else {
            userImageElt.src = testedImage;
        }
        pseudoModal.openModal('modal-turtle-auto-corrector-validation');
    }

    /**
     * Enable/disable a button with accessibility
     * @param {HTMLButtonElement} button - The button to enable/disable
     * @param {boolean} disabled - Whether the button must disabled or not
     * @param {string} [message] - Message to describe the state of the button
     */
    setButtonDisabled(button, disabled, message = '') {
        if (!(button instanceof HTMLButtonElement)) {
            throw new Error('The element must be a <button>.');
        }

        let wrapper = button.closest('.btn-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.classList.add('btn-wrapper');
            button.insertAdjacentElement('beforebegin', wrapper);
            this._transferButtonStyleToWrapper(button, wrapper);
            wrapper.appendChild(button);

            const overlay = document.createElement('div');
            overlay.classList.add('btn-overlay');
            Object.assign(overlay.style, {
                position: 'absolute',
                inset: '0',
                background: 'transparent',
                cursor: 'not-allowed',
                display: 'none'
            });
            overlay.setAttribute('data-bs-toggle', 'tooltip');
            wrapper.appendChild(overlay);

            const desc = document.createElement('span');
            desc.id = button.id ? `${button.id}-desc` : `btn-desc-${Math.random().toString(36).slice(2)}`;
            desc.setAttribute('role', 'status');
            desc.setAttribute('aria-live', 'polite');
            Object.assign(desc.style, {
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: '-1px',
                padding: '0',
                border: '0',
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(100%)',
                whiteSpace: 'nowrap',
            });
            wrapper.appendChild(desc);

            button.setAttribute('aria-describedby', desc.id);
        }

        const overlay = wrapper.querySelector('.btn-overlay');
        const desc = document.getElementById(button.getAttribute('aria-describedby'));

        button.disabled = disabled;

        $(overlay).tooltip('dispose');
        if (disabled) {
            overlay.style.display = 'block';
            overlay.setAttribute('title', message);
            button.style.opacity = '0.6';

        } else {
            overlay.style.display = 'none';
            overlay.removeAttribute('title');
            button.style.opacity = '';
        }
        desc.textContent = message;
        $(overlay).tooltip();
    }

    /**
     * Transfer the layout style from a button to its wrapper
     * @private
     * @param {HTMLButtonElement} button - The button HTML element
     * @param {HTMLDivElement} wrapper - The wrapper HTML element
     */
    _transferButtonStyleToWrapper(button, wrapper) {
        const computedButtonStyle = getComputedStyle(button);
        wrapper.style.display = computedButtonStyle.display === 'inline' ? 'inline-block' : computedButtonStyle.display;
        const parentDisplay = getComputedStyle(wrapper.parentElement).display;
        const isFlexOrGrid = parentDisplay.includes('flex') || parentDisplay.includes('grid');
        if (isFlexOrGrid) {
            wrapper.style.order = computedButtonStyle.order;
            wrapper.style.flexGrow = computedButtonStyle.flexGrow;
            wrapper.style.flexShrink = computedButtonStyle.flexShrink;
            wrapper.style.flexBasis = computedButtonStyle.flexBasis;
            wrapper.style.alignSelf = computedButtonStyle.alignSelf;
        }
        wrapper.style.marginTop = computedButtonStyle.marginTop;
        wrapper.style.marginRight = computedButtonStyle.marginRight;
        wrapper.style.marginBottom = computedButtonStyle.marginBottom;
        wrapper.style.marginLeft = computedButtonStyle.marginLeft;
        button.style.margin = '0';
        wrapper.style.verticalAlign = computedButtonStyle.verticalAlign;
        wrapper.style.position = 'relative';

        if (isFlexOrGrid) {
            button.style.display = 'block';
            button.style.width = '100%';
            button.style.height = '100%';
            button.style.boxSizing = 'border-box';
        }
    }

    /**
     * Move the turtle canvases to the creation modal or to it's original position
     * @private
     * @param {boolean} moveToModal - Whether moving the turtle canvases to the modal or not
     * @returns {undefined} Early return case
     */
    _moveTurtleCanvasesToModal(moveToModal) {
        const turtleCanvasElt = document.querySelector('#canvas-turtle');
        if (moveToModal) {
            turtleCanvasElt.style.position = 'initial';
            const modalCanvasWrapper = document.querySelector('#turtle-record-container');
            modalCanvasWrapper.appendChild(turtleCanvasElt);
            return;
        }
        turtleCanvasElt.style.position = 'absolute';
        const originalCanvasWrapper = document.querySelector('#canvas-wrapper');
        originalCanvasWrapper.appendChild(turtleCanvasElt);
    }

    /**
     * Display or hide the turtle course image in the creation modal
     * @private
     * @param {boolean} isDisplayed - Whether displaying the image or hiding it
     * @returns {undefined} Early return case
     */
    _appendMergedCanvasesInModal(isDisplayed) {
        let imageInModal = document.querySelector('#turtle-exercise-creation-image');
        if (!isDisplayed) {
            imageInModal.style.display = 'none';
            return;
        }
        imageInModal.src = this._pendingReferenceImage;
        imageInModal.style.display = 'block';
    }

    /**
     * Display the image on exercise creation modal opening if necessary
     * @private
     * @returns {undefined} Early return case
     */
    _updateImageOpeningExerciseCreationModal() {
        if (!this._pendingReferenceImage && !this.isEnabled()) return;
        let exerciseImageToDisplay = this._pendingReferenceImage ? this._pendingReferenceImage : this.getCurrentProjectAutocorrectionImage();
        document.querySelector('#save-turtle-exercise').textContent = i18next.t('modals.turtleCorrection.updateExercise');
        document.querySelector('#turtle-exercise-creation-explanations').style.display = 'none';
        const imageInModal = document.querySelector('#turtle-exercise-creation-image');
        imageInModal.src = exerciseImageToDisplay;
        imageInModal.style.display = 'block';
    }

    /**
     * Display the notice indicating whether the current exercise is saved in database
     * @private
     * @returns {Promise} Early return case
     */
    async _manageUpToDateNotice() {
        const isReferenceImageSaved = await this._getIsReferenceImageSaved();
        const isBlankProjectStatusSaved = this._getIsBlankProjectStatusSaved();
        const noticeElt = document.querySelector('#turtle-autocorrector-uptodate-notice');
        if (isReferenceImageSaved && isBlankProjectStatusSaved) {
            noticeElt.style.display = 'none';
            return true;
        }
        noticeElt.style.display = 'block';
        return false;
    }

    /**
     * Tells whether the current exercise is saved in database
     * @private
     * @returns {Promise} - resolve true if the exercise is saved, false otherwise
     */
    async _getIsReferenceImageSaved() {
        if (!this._pendingReferenceAutocorrection?.image) return true;
        return await this._compareCurrentImageWithReference(this._pendingReferenceAutocorrection);
    }

    /**
     * Removes the turtle exercise from the current project
     * @public
     * @returns {true|undefined} True if removed, false otherwise
     */
    async removeTurtleExercise() {
        const currentProject = projectManager.getCurrentProject();
        currentProject.options = this._getEffectiveProjectOptions(currentProject);
        if (!currentProject.options || !currentProject.options.turtleAutocorrection) return false;
        delete currentProject.options.turtleAutocorrection;
        if (!(await this._persistProjectState(currentProject))) {
            return false;
        }
        this._referenceAutocorrection = null;
        this._referenceImage = null;
        this._storeReferenceState(null, { reason: 'removed-turtle-autocorrection' });
        return true;
    }
    
    /**
     * Check or uncheck the blank project checkbox in the exercise creation modal according to the project options value
     * @private
     * @returns {undefined} Early return
     */
    _updateBlankProjectCheckbox() {
        const currentProjectOptions = this._getEffectiveProjectOptions();
        if (!currentProjectOptions) return;
        const blankProjectCheckBoxElt = document.querySelector('#checkbox-turtle-exercise-blank-project');
        if (currentProjectOptions.showBlankProject) {
            blankProjectCheckBoxElt.checked = true;
        } else {
            blankProjectCheckBoxElt.checked = false;
        }
    }

    /**
     * Add the listener to the blank project checkbox in the exercise creation modal
     * @private
     * @returns {undefined} Early return
     */
    _setBlankProjectCheckboxListener() {
        if (this._isBlankProjectCheckboxListenerSet) return;
        document.querySelector('#checkbox-turtle-exercise-blank-project').addEventListener('change', async (event) => {
            const isUpToDate = await this._manageUpToDateNotice();
            if (isUpToDate) {
                this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.currentlyUpToDate'));
            } else {
                this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), false, '');
            }
        });
        this._isBlankProjectCheckboxListenerSet = true;
    }

    /**
     * Check if the blank project status is up to date with the project saved in the database
     * @private
     * @returns {boolean} Return true if the status is up to date, false otherwise
     */
    _getIsBlankProjectStatusSaved() {
        if (!this._pendingReferenceImage) return true;
        const currentProjectOptions = this._getEffectiveProjectOptions();
        if (!currentProjectOptions) return false;
        const blankProjectCheckboxStatus = document.querySelector('#checkbox-turtle-exercise-blank-project').checked;
        return currentProjectOptions.showBlankProject == blankProjectCheckboxStatus;
    }

    /**
     * Display the autocorrection validation button
     * @public
     * @returns {undefined} Early return
     */
    displayValidationButton() {
        if (document.querySelector('.ide-btn-pythtest').style.display === 'block') return;
        document.querySelector('.ide-btn-pythtest').style.display = 'block';
        Object.assign(document.querySelector('#runButtonPython').style, {
            'borderTopRightRadius': '0',
            'borderBottomRightRadius': '0'
        });
    }

    /**
     * Load an image from a source
     * @private
     * @param {string} src - The image source
     * @returns {Promise} resolve the image
     */
    _loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Clone a turtle autocorrection payload.
     * @private
     * @param {object|null} autocorrection - The payload to clone
     * @returns {object|null} The cloned payload
     */
    _cloneAutocorrectionData(autocorrection) {
        if (!autocorrection) {
            return null;
        }

        const clonedAutocorrection = JSON.parse(JSON.stringify(autocorrection));

        if (clonedAutocorrection.drawingScene) {
            clonedAutocorrection.drawingScene = this._buildStoredDrawingScene(clonedAutocorrection.drawingScene);
        }

        return clonedAutocorrection;
    }

    /**
     * Convert one raw drawing scene into a canonical stored scene.
     * @private
     * @param {object|null} drawingScene - The raw scene
     * @returns {object|null} The canonical stored scene
     */
    _buildStoredDrawingScene(drawingScene) {
        if (!drawingScene) {
            return null;
        }

        const normalizedDrawingScene = this._normalizeDrawingScene(drawingScene);

        return {
            version: 1,
            supported: normalizedDrawingScene.supported,
            unsupportedInstructions: [...normalizedDrawingScene.unsupportedInstructions],
            viewport: normalizedDrawingScene.viewport ? { ...normalizedDrawingScene.viewport } : null,
            primitives: normalizedDrawingScene.primitives.map(({ key, ...primitive }) => ({ ...primitive }))
        };
    }

    /**
     * Get the reference autocorrection payload currently stored in memory.
     * @private
     * @returns {object|null} The effective reference payload
     */
    _getReferenceAutocorrection() {
        if (this._referenceAutocorrection) {
            return this._referenceAutocorrection;
        }

        return this._referenceImage ? { image: this._referenceImage } : null;
    }

    /**
     * Compare the current render snapshot with the stored reference.
     * @private
     * @param {object|null} currentRender - The current turtle render snapshot
     * @returns {Promise<boolean>} True when the autocorrection succeeds
     */
    async _compareCurrentImageWithReference(currentRender) {
        this._storeComparisonFailure(null);

        if (!currentRender || !currentRender.image) return false;
        const referenceAutocorrection = this._getReferenceAutocorrection();
        if (!referenceAutocorrection?.image) return false;

        if (referenceAutocorrection.layers?.drawing) {
            return await this._compareLayeredReferenceWithCurrent(referenceAutocorrection, currentRender);
        }

        const [referenceImageData, currentImageData] = await Promise.all([
            this._getCanonicalImageDataFromDataURL(referenceAutocorrection.image),
            this._getCanonicalImageDataFromDataURL(currentRender.image)
        ]);

        return this._areImageDatasClose(referenceImageData, currentImageData, this._tolerance);
    }

    /**
     * Compare layered turtle renders.
     * @private
     * @param {object} referenceAutocorrection - The stored reference payload
     * @param {object} currentRender - The current turtle render snapshot
     * @returns {Promise<boolean>} True when the autocorrection succeeds
     */
    async _compareLayeredReferenceWithCurrent(referenceAutocorrection, currentRender) {
        const [referenceBackground, referenceDrawing, referenceTurtle, currentBackground, currentDrawing, currentTurtle] = await Promise.all([
            this._getCanonicalImageDataFromDataURL(referenceAutocorrection.layers?.background),
            this._getCanonicalImageDataFromDataURL(referenceAutocorrection.layers?.drawing),
            this._getCanonicalImageDataFromDataURL(referenceAutocorrection.layers?.turtle),
            this._getCanonicalImageDataFromDataURL(currentRender.layers?.background),
            this._getCanonicalImageDataFromDataURL(currentRender.layers?.drawing),
            this._getCanonicalImageDataFromDataURL(currentRender.layers?.turtle)
        ]);

        if (!this._compareOptionalLayer(referenceBackground, currentBackground, 'background')) {
            return false;
        }

        if (!this._compareOptionalLayer(referenceTurtle, currentTurtle, 'turtle')) {
            return false;
        }

        if (referenceAutocorrection.drawingScene && currentRender.drawingScene) {
            const drawingScenesComparison = this._compareDrawingScenes(
                referenceAutocorrection.drawingScene,
                currentRender.drawingScene
            );

            if (drawingScenesComparison !== null) {
                return drawingScenesComparison;
            }
        }

        return this._compareDrawingLayersPrecisely(referenceDrawing, currentDrawing);
    }

    /**
     * Compare one optional render layer and store a precise mismatch on failure.
     * @private
     * @param {ImageData|null} referenceLayer - The reference layer
     * @param {ImageData|null} currentLayer - The current layer
     * @param {string} layerName - The logical layer name
     * @returns {boolean} True when both optional layers match
     */
    _compareOptionalLayer(referenceLayer, currentLayer, layerName) {
        if (this._areOptionalImageDatasEqual(referenceLayer, currentLayer)) {
            return true;
        }

        this._storeComparisonFailure({
            layer: layerName,
            mismatch: this._findFirstImageDataDifference(referenceLayer, currentLayer)
        });
        return false;
    }

    /**
     * Compare two drawing layers strictly.
     * @private
     * @param {ImageData|null} referenceDrawing - The reference drawing layer
     * @param {ImageData|null} currentDrawing - The current drawing layer
     * @returns {boolean} True when both drawing layers are identical
     */
    _compareDrawingLayersPrecisely(referenceDrawing, currentDrawing) {
        if (!referenceDrawing && !currentDrawing) {
            return true;
        }

        if (!referenceDrawing || !currentDrawing) {
            this._storeComparisonFailure({
                layer: 'drawing',
                reason: 'missing-layer'
            });
            return false;
        }

        if (referenceDrawing.width !== currentDrawing.width || referenceDrawing.height !== currentDrawing.height) {
            this._storeComparisonFailure({
                layer: 'drawing',
                reason: 'size-mismatch',
                referenceSize: { width: referenceDrawing.width, height: referenceDrawing.height },
                currentSize: { width: currentDrawing.width, height: currentDrawing.height }
            });
            return false;
        }

        if (!this._areImageDatasEqual(referenceDrawing, currentDrawing)) {
            this._storeComparisonFailure({
                layer: 'drawing',
                reason: 'pixel-mismatch',
                mismatch: this._findFirstImageDataDifference(referenceDrawing, currentDrawing)
            });
            return false;
        }

        return true;
    }

    /**
     * Compare two geometry scenes describing the drawing layer.
     * @private
     * @param {object|null} referenceScene - The stored reference scene
     * @param {object|null} currentScene - The current execution scene
     * @returns {boolean|null} True when both scenes are equivalent, false when they differ,
     * or null when a pixel fallback must be used instead
     */
    _compareDrawingScenes(referenceScene, currentScene) {
        const normalizedReferenceScene = this._normalizeDrawingScene(referenceScene);
        const normalizedCurrentScene = this._normalizeDrawingScene(currentScene);

        if (!normalizedReferenceScene.supported || !normalizedCurrentScene.supported) {
            return null;
        }

        if (
            normalizedReferenceScene.viewportKey
            && normalizedCurrentScene.viewportKey
            && normalizedReferenceScene.viewportKey !== normalizedCurrentScene.viewportKey
        ) {
            this._storeComparisonFailure({
                layer: 'drawing',
                reason: 'scene-viewport-mismatch',
                referenceViewport: normalizedReferenceScene.viewport,
                currentViewport: normalizedCurrentScene.viewport
            });
            return false;
        }

        if (normalizedReferenceScene.primitives.length !== normalizedCurrentScene.primitives.length) {
            this._storeComparisonFailure({
                layer: 'drawing',
                reason: 'scene-primitive-count-mismatch',
                referencePrimitiveCount: normalizedReferenceScene.primitives.length,
                currentPrimitiveCount: normalizedCurrentScene.primitives.length,
                referencePrimitiveKeys: normalizedReferenceScene.primitives.map(primitive => primitive.key),
                currentPrimitiveKeys: normalizedCurrentScene.primitives.map(primitive => primitive.key)
            });
            return false;
        }

        for (let index = 0; index < normalizedReferenceScene.primitives.length; index++) {
            const referencePrimitive = normalizedReferenceScene.primitives[index];
            const currentPrimitive = normalizedCurrentScene.primitives[index];

            if (referencePrimitive.key !== currentPrimitive.key) {
                this._storeComparisonFailure({
                    layer: 'drawing',
                    reason: 'scene-primitive-mismatch',
                    primitiveIndex: index,
                    referencePrimitive,
                    currentPrimitive
                });
                return false;
            }
        }

        return true;
    }

    /**
     * Normalize one drawing scene into canonical comparable primitives.
     * @private
     * @param {object|null} scene - The input scene
     * @returns {{supported: boolean, unsupportedInstructions: string[], primitives: object[]}} The normalized scene
     */
    _normalizeDrawingScene(scene) {
        const rawPrimitives = Array.isArray(scene?.primitives) ? scene.primitives : [];
        const normalizedViewport = this._normalizeSceneViewport(scene?.viewport);
        const normalizedPrimitives = this._normalizeRawScenePrimitives(rawPrimitives);
        const deduplicatedPrimitives = this._buildComparableScenePrimitives(normalizedPrimitives);

        return {
            supported: scene?.supported !== false,
            unsupportedInstructions: Array.isArray(scene?.unsupportedInstructions) ? [...scene.unsupportedInstructions] : [],
            viewport: normalizedViewport,
            viewportKey: this._getSceneViewportKey(normalizedViewport),
            primitives: deduplicatedPrimitives
        };
    }

    /**
     * Normalize one raw primitive list while honoring scene resets.
     * @private
     * @param {object[]} rawPrimitives - The raw primitives
     * @returns {object[]} The normalized primitives
     */
    _normalizeRawScenePrimitives(rawPrimitives) {
        let normalizedPrimitives = [];

        for (const primitive of rawPrimitives) {
            const normalizedPrimitive = this._normalizeScenePrimitive(primitive);
            if (!normalizedPrimitive) {
                continue;
            }

            if (normalizedPrimitive.type === 'clear') {
                normalizedPrimitives = [];
                continue;
            }

            normalizedPrimitives.push(normalizedPrimitive);
        }

        return normalizedPrimitives;
    }

    /**
     * Build the comparable primitive list used for scene equality.
     * @private
     * @param {object[]} normalizedPrimitives - The normalized primitives
     * @returns {object[]} The sorted deduplicated comparable primitives
     */
    _buildComparableScenePrimitives(normalizedPrimitives) {
        const linePrimitives = normalizedPrimitives.filter(primitive => primitive.type === 'line');
        const arcPrimitives = normalizedPrimitives.filter(primitive => primitive.type === 'arc');
        const otherPrimitives = normalizedPrimitives.filter(primitive => primitive.type !== 'line' && primitive.type !== 'arc');

        return this._sortAndDeduplicateScenePrimitives([
            ...this._mergeCollinearLinePrimitives(linePrimitives),
            ...this._mergeContiguousArcPrimitives(arcPrimitives),
            ...otherPrimitives
        ]);
    }

    /**
     * Sort one primitive list by comparable key and drop exact duplicates.
     * @private
     * @param {object[]} primitives - The primitives to sort
     * @returns {object[]} The sorted unique primitives
     */
    _sortAndDeduplicateScenePrimitives(primitives) {
        const keyedPrimitives = primitives
            .map(primitive => ({
                ...primitive,
                key: this._getScenePrimitiveKey(primitive)
            }))
            .sort((primitiveA, primitiveB) => primitiveA.key.localeCompare(primitiveB.key));

        const deduplicatedPrimitives = [];
        for (const primitive of keyedPrimitives) {
            if (!deduplicatedPrimitives.length || deduplicatedPrimitives[deduplicatedPrimitives.length - 1].key !== primitive.key) {
                deduplicatedPrimitives.push(primitive);
            }
        }

        return deduplicatedPrimitives;
    }

    /**
     * Normalize one drawing primitive.
     * @private
     * @param {object|null} primitive - The primitive to normalize
     * @returns {object|null} The normalized primitive
     */
    _normalizeScenePrimitive(primitive) {
        if (!primitive || typeof primitive !== 'object' || typeof primitive.type !== 'string') {
            return null;
        }

        switch (primitive.type) {
            case 'line': {
                const from = this._normalizeScenePoint(primitive.from);
                const to = this._normalizeScenePoint(primitive.to);

                if (!from || !to || this._areScenePointsEqual(from, to)) {
                    return null;
                }

                const [canonicalFrom, canonicalTo] = this._getCanonicalLineEndpoints(from, to);
                return {
                    type: 'line',
                    from: canonicalFrom,
                    to: canonicalTo,
                    color: String(primitive.color || 'black'),
                    size: this._roundSceneNumber(primitive.size)
                };
            }
            case 'arc':
                return this._normalizeArcPrimitive(primitive);
            case 'fill': {
                const points = this._normalizePolygonPoints(primitive.points);
                if (points.length < 3) {
                    return null;
                }

                return {
                    type: 'fill',
                    points,
                    color: String(primitive.color || 'black')
                };
            }
            case 'dot': {
                const center = this._normalizeScenePoint(primitive.center);
                if (!center) {
                    return null;
                }

                return {
                    type: 'dot',
                    center,
                    size: this._roundSceneNumber(primitive.size),
                    color: String(primitive.color || 'black')
                };
            }
            case 'text': {
                const position = this._normalizeScenePoint(primitive.position);
                if (!position) {
                    return null;
                }

                return {
                    type: 'text',
                    position,
                    message: String(primitive.message ?? ''),
                    align: String(primitive.align || 'left'),
                    font: primitive.font ? String(primitive.font) : null,
                    color: String(primitive.color || 'black')
                };
            }
            case 'stamp': {
                const position = this._normalizeScenePoint(primitive.position);
                if (!position) {
                    return null;
                }

                return {
                    type: 'stamp',
                    position,
                    angle: this._roundSceneNumber(primitive.angle),
                    radians: this._roundSceneNumber(primitive.radians),
                    shape: String(primitive.shape || 'classic'),
                    color: String(primitive.color || 'black'),
                    fill: String(primitive.fill || 'black')
                };
            }
            case 'clear':
                return { type: 'clear' };
            default:
                return null;
        }
    }

    /**
     * Normalize one arc primitive so its visible interval becomes canonical.
     * @private
     * @param {object} primitive - The arc primitive to normalize
     * @returns {object|null} The normalized arc primitive
     */
    _normalizeArcPrimitive(primitive) {
        const center = this._normalizeScenePoint(primitive.center);
        if (!center) {
            return null;
        }

        const radius = this._roundSceneNumber(Math.abs(primitive.radius));
        if (!radius) {
            return null;
        }

        let startAngle = this._normalizeSceneAngle(primitive.startAngle);
        let sweepAngle = this._roundSceneNumber(primitive.sweepAngle);
        if (!sweepAngle) {
            return null;
        }

        if (Math.abs(sweepAngle) >= TurtleAutocorrector._FULL_RADIANS - TurtleAutocorrector._SCENE_EPSILON) {
            startAngle = 0;
            sweepAngle = TurtleAutocorrector._FULL_RADIANS;
        } else if (sweepAngle < 0) {
            startAngle = this._normalizeSceneAngle(startAngle + sweepAngle);
            sweepAngle = Math.abs(sweepAngle);
        }

        return {
            type: 'arc',
            center,
            radius,
            startAngle,
            sweepAngle: this._roundSceneNumber(sweepAngle),
            color: String(primitive.color || 'black'),
            size: this._roundSceneNumber(primitive.size)
        };
    }

    /**
     * Merge collinear touching line primitives sharing the same style.
     * @private
     * @param {object[]} linePrimitives - The line primitives to merge
     * @returns {object[]} The merged lines
     */
    _mergeCollinearLinePrimitives(linePrimitives) {
        const mergedLinePrimitives = linePrimitives.map(primitive => ({
            ...primitive,
            from: { ...primitive.from },
            to: { ...primitive.to }
        }));

        let hasMergedOnePair = true;
        while (hasMergedOnePair) {
            hasMergedOnePair = false;

            for (let firstIndex = 0; firstIndex < mergedLinePrimitives.length; firstIndex++) {
                for (let secondIndex = firstIndex + 1; secondIndex < mergedLinePrimitives.length; secondIndex++) {
                    const mergedPrimitive = this._tryMergeLinePrimitives(
                        mergedLinePrimitives[firstIndex],
                        mergedLinePrimitives[secondIndex]
                    );

                    if (!mergedPrimitive) {
                        continue;
                    }

                    mergedLinePrimitives.splice(secondIndex, 1);
                    mergedLinePrimitives.splice(firstIndex, 1, mergedPrimitive);
                    hasMergedOnePair = true;
                    break;
                }

                if (hasMergedOnePair) {
                    break;
                }
            }
        }

        return mergedLinePrimitives.map(primitive => {
            const [from, to] = this._getCanonicalLineEndpoints(primitive.from, primitive.to);
            return {
                ...primitive,
                from,
                to
            };
        });
    }

    /**
     * Merge contiguous arc primitives sharing the same circle and style.
     * @private
     * @param {object[]} arcPrimitives - The arc primitives to merge
     * @returns {object[]} The merged arcs
     */
    _mergeContiguousArcPrimitives(arcPrimitives) {
        const mergedArcPrimitives = arcPrimitives.map(primitive => ({ ...primitive, center: { ...primitive.center } }));

        let hasMergedOnePair = true;
        while (hasMergedOnePair) {
            hasMergedOnePair = false;

            for (let firstIndex = 0; firstIndex < mergedArcPrimitives.length; firstIndex++) {
                for (let secondIndex = firstIndex + 1; secondIndex < mergedArcPrimitives.length; secondIndex++) {
                    const mergedPrimitive = this._tryMergeArcPrimitives(
                        mergedArcPrimitives[firstIndex],
                        mergedArcPrimitives[secondIndex]
                    );

                    if (!mergedPrimitive) {
                        continue;
                    }

                    mergedArcPrimitives.splice(secondIndex, 1);
                    mergedArcPrimitives.splice(firstIndex, 1, mergedPrimitive);
                    hasMergedOnePair = true;
                    break;
                }

                if (hasMergedOnePair) {
                    break;
                }
            }
        }

        return mergedArcPrimitives.map(primitive => ({
            ...primitive,
            startAngle: this._normalizeSceneAngle(primitive.startAngle),
            sweepAngle: Math.min(primitive.sweepAngle, TurtleAutocorrector._FULL_RADIANS)
        }));
    }

    /**
     * Try to merge two touching collinear line primitives.
     * @private
     * @param {object} firstLine - The first line
     * @param {object} secondLine - The second line
     * @returns {object|null} The merged line when possible
     */
    _tryMergeLinePrimitives(firstLine, secondLine) {
        if (
            firstLine.color !== secondLine.color
            || !this._areSceneNumbersEqual(firstLine.size, secondLine.size)
        ) {
            return null;
        }

        if (firstLine.from.x === secondLine.from.x && firstLine.from.y === secondLine.from.y && firstLine.to.x === secondLine.to.x && firstLine.to.y === secondLine.to.y) {
            return firstLine;
        }

        const pointPairs = [
            [firstLine.from, firstLine.to, secondLine.from, secondLine.to],
            [firstLine.from, firstLine.to, secondLine.to, secondLine.from],
            [firstLine.to, firstLine.from, secondLine.from, secondLine.to],
            [firstLine.to, firstLine.from, secondLine.to, secondLine.from]
        ];

        for (const [sharedPointA, otherPointA, sharedPointB, otherPointB] of pointPairs) {
            if (!this._areScenePointsEqual(sharedPointA, sharedPointB)) {
                continue;
            }

            if (!this._areScenePointsCollinear(otherPointA, sharedPointA, otherPointB)) {
                continue;
            }

            return {
                type: 'line',
                from: otherPointA,
                to: otherPointB,
                color: firstLine.color,
                size: firstLine.size
            };
        }

        return null;
    }

    /**
     * Try to merge two touching arc primitives belonging to the same circle.
     * @private
     * @param {object} firstArc - The first arc
     * @param {object} secondArc - The second arc
     * @returns {object|null} The merged arc when possible
     */
    _tryMergeArcPrimitives(firstArc, secondArc) {
        if (
            firstArc.color !== secondArc.color
            || !this._areSceneNumbersEqual(firstArc.size, secondArc.size)
            || !this._areSceneNumbersEqual(firstArc.radius, secondArc.radius)
            || !this._areScenePointsEqual(firstArc.center, secondArc.center)
        ) {
            return null;
        }

        if (
            this._areSceneNumbersEqual(firstArc.startAngle, secondArc.startAngle)
            && this._areSceneNumbersEqual(firstArc.sweepAngle, secondArc.sweepAngle)
        ) {
            return firstArc;
        }

        const firstEndAngle = this._getArcEndAngle(firstArc);
        const secondEndAngle = this._getArcEndAngle(secondArc);

        if (
            this._areSceneNumbersEqual(firstEndAngle, secondArc.startAngle)
            && firstArc.sweepAngle + secondArc.sweepAngle <= TurtleAutocorrector._FULL_RADIANS + TurtleAutocorrector._SCENE_EPSILON
        ) {
            return {
                ...firstArc,
                sweepAngle: this._roundSceneNumber(firstArc.sweepAngle + secondArc.sweepAngle)
            };
        }

        if (
            this._areSceneNumbersEqual(secondEndAngle, firstArc.startAngle)
            && firstArc.sweepAngle + secondArc.sweepAngle <= TurtleAutocorrector._FULL_RADIANS + TurtleAutocorrector._SCENE_EPSILON
        ) {
            return {
                ...secondArc,
                sweepAngle: this._roundSceneNumber(firstArc.sweepAngle + secondArc.sweepAngle)
            };
        }

        return null;
    }

    /**
     * Build one stable comparable key for one normalized primitive.
     * @private
     * @param {object} primitive - The normalized primitive
     * @returns {string} The comparable primitive key
     */
    _getScenePrimitiveKey(primitive) {
        switch (primitive.type) {
            case 'line':
                return `line|${primitive.color}|${primitive.size}|${this._serializeScenePoint(primitive.from)}|${this._serializeScenePoint(primitive.to)}`;
            case 'arc':
                return `arc|${primitive.color}|${primitive.size}|${this._serializeScenePoint(primitive.center)}|${primitive.radius}|${primitive.startAngle}|${primitive.sweepAngle}`;
            case 'fill':
                return `fill|${primitive.color}|${primitive.points.map(point => this._serializeScenePoint(point)).join(';')}`;
            case 'dot':
                return `dot|${primitive.color}|${primitive.size}|${this._serializeScenePoint(primitive.center)}`;
            case 'text':
                return `text|${primitive.color}|${primitive.align}|${primitive.font || ''}|${primitive.message}|${this._serializeScenePoint(primitive.position)}`;
            case 'stamp':
                return `stamp|${primitive.shape}|${primitive.color}|${primitive.fill}|${primitive.angle}|${primitive.radians}|${this._serializeScenePoint(primitive.position)}`;
            default:
                return primitive.type;
        }
    }

    /**
     * Normalize one free point-like object.
     * @private
     * @param {object|null} point - The point to normalize
     * @returns {{x: number, y: number}|null} The normalized point
     */
    _normalizeScenePoint(point) {
        if (!point || typeof point !== 'object') {
            return null;
        }

        return {
            x: this._roundSceneNumber(point.x),
            y: this._roundSceneNumber(point.y)
        };
    }

    /**
     * Normalize one turtle viewport descriptor.
     * @private
     * @param {object|null} viewport - The viewport descriptor
     * @returns {object|null} The normalized viewport
     */
    _normalizeSceneViewport(viewport) {
        if (!viewport || typeof viewport !== 'object') {
            return null;
        }

        const normalizedViewport = {
            llx: this._roundSceneNumber(viewport.llx),
            lly: this._roundSceneNumber(viewport.lly),
            urx: this._roundSceneNumber(viewport.urx),
            ury: this._roundSceneNumber(viewport.ury),
            xScale: this._roundSceneNumber(viewport.xScale),
            yScale: this._roundSceneNumber(viewport.yScale)
        };

        return normalizedViewport;
    }

    /**
     * Build one stable key for a normalized viewport.
     * @private
     * @param {object|null} viewport - The normalized viewport
     * @returns {string|null} The comparable viewport key
     */
    _getSceneViewportKey(viewport) {
        if (!viewport) {
            return null;
        }

        return [
            viewport.llx,
            viewport.lly,
            viewport.urx,
            viewport.ury,
            viewport.xScale,
            viewport.yScale
        ].join('|');
    }

    /**
     * Normalize one angle into the [0, 2pi) interval.
     * @private
     * @param {number} angle - The angle to normalize
     * @returns {number} The normalized angle
     */
    _normalizeSceneAngle(angle) {
        let normalizedAngle = this._roundSceneNumber(angle % TurtleAutocorrector._FULL_RADIANS);
        if (normalizedAngle < 0) {
            normalizedAngle = this._roundSceneNumber(normalizedAngle + TurtleAutocorrector._FULL_RADIANS);
        }

        if (this._areSceneNumbersEqual(normalizedAngle, TurtleAutocorrector._FULL_RADIANS)) {
            return 0;
        }

        return normalizedAngle;
    }

    /**
     * Normalize one polygon by removing duplicate vertices and making
     * start point and winding direction canonical.
     * @private
     * @param {object[]|null} points - The input polygon points
     * @returns {object[]} The normalized polygon points
     */
    _normalizePolygonPoints(points) {
        if (!Array.isArray(points) || !points.length) {
            return [];
        }

        const normalizedPoints = [];
        for (const point of points) {
            const normalizedPoint = this._normalizeScenePoint(point);
            if (!normalizedPoint) {
                continue;
            }

            if (!normalizedPoints.length || !this._areScenePointsEqual(normalizedPoints[normalizedPoints.length - 1], normalizedPoint)) {
                normalizedPoints.push(normalizedPoint);
            }
        }

        if (
            normalizedPoints.length > 1
            && this._areScenePointsEqual(normalizedPoints[0], normalizedPoints[normalizedPoints.length - 1])
        ) {
            normalizedPoints.pop();
        }

        if (normalizedPoints.length < 3) {
            return [];
        }

        let hasRemovedOnePoint = true;
        while (hasRemovedOnePoint && normalizedPoints.length >= 3) {
            hasRemovedOnePoint = false;

            for (let index = 0; index < normalizedPoints.length; index++) {
                const previousPoint = normalizedPoints[(index - 1 + normalizedPoints.length) % normalizedPoints.length];
                const currentPoint = normalizedPoints[index];
                const nextPoint = normalizedPoints[(index + 1) % normalizedPoints.length];

                if (
                    this._areScenePointsCollinear(previousPoint, currentPoint, nextPoint)
                    && this._isScenePointBetween(previousPoint, currentPoint, nextPoint)
                ) {
                    normalizedPoints.splice(index, 1);
                    hasRemovedOnePoint = true;
                    break;
                }
            }
        }

        if (normalizedPoints.length < 3) {
            return [];
        }

        const forwardOrdering = this._rotatePointListToSmallestStart(normalizedPoints);
        const reversedOrdering = this._rotatePointListToSmallestStart([...normalizedPoints].reverse());

        return this._comparePointOrderings(forwardOrdering, reversedOrdering) <= 0
            ? forwardOrdering
            : reversedOrdering;
    }

    /**
     * Rotate one point list so that the smallest point comes first.
     * @private
     * @param {object[]} points - The point list to rotate
     * @returns {object[]} The rotated list
     */
    _rotatePointListToSmallestStart(points) {
        let bestIndex = 0;

        for (let index = 1; index < points.length; index++) {
            if (this._isPointLexicographicallyBefore(points[index], points[bestIndex])) {
                bestIndex = index;
            }
        }

        return points.slice(bestIndex).concat(points.slice(0, bestIndex));
    }

    /**
     * Compare two point orderings lexicographically.
     * @private
     * @param {object[]} firstOrdering - The first ordering
     * @param {object[]} secondOrdering - The second ordering
     * @returns {number} Negative when firstOrdering is smaller, 0 when equal, positive otherwise
     */
    _comparePointOrderings(firstOrdering, secondOrdering) {
        const length = Math.min(firstOrdering.length, secondOrdering.length);
        for (let index = 0; index < length; index++) {
            if (firstOrdering[index].x !== secondOrdering[index].x) {
                return firstOrdering[index].x - secondOrdering[index].x;
            }

            if (firstOrdering[index].y !== secondOrdering[index].y) {
                return firstOrdering[index].y - secondOrdering[index].y;
            }
        }

        return firstOrdering.length - secondOrdering.length;
    }

    /**
     * Canonicalize one line endpoint order.
     * @private
     * @param {{x: number, y: number}} from - The first endpoint
     * @param {{x: number, y: number}} to - The second endpoint
     * @returns {Array<{x: number, y: number}>} The canonical endpoint pair
     */
    _getCanonicalLineEndpoints(from, to) {
        return this._isPointLexicographicallyBefore(to, from) ? [to, from] : [from, to];
    }

    /**
     * Tell whether one point must sort before another.
     * @private
     * @param {{x: number, y: number}} pointA - The first point
     * @param {{x: number, y: number}} pointB - The second point
     * @returns {boolean} True when pointA comes before pointB
     */
    _isPointLexicographicallyBefore(pointA, pointB) {
        return pointA.x < pointB.x || (pointA.x === pointB.x && pointA.y < pointB.y);
    }

    /**
     * Compare two scene points after normalization.
     * @private
     * @param {{x: number, y: number}} pointA - The first point
     * @param {{x: number, y: number}} pointB - The second point
     * @returns {boolean} True when both points are equal
     */
    _areScenePointsEqual(pointA, pointB) {
        return pointA.x === pointB.x && pointA.y === pointB.y;
    }

    /**
     * Tell whether three points are collinear.
     * @private
     * @param {{x: number, y: number}} pointA - The first point
     * @param {{x: number, y: number}} pointB - The second point
     * @param {{x: number, y: number}} pointC - The third point
     * @returns {boolean} True when the three points are collinear
     */
    _areScenePointsCollinear(pointA, pointB, pointC) {
        const determinant = (pointB.x - pointA.x) * (pointC.y - pointA.y) - (pointB.y - pointA.y) * (pointC.x - pointA.x);
        return this._areSceneNumbersEqual(determinant, 0);
    }

    /**
     * Tell whether one point lies between two others on the same segment.
     * @private
     * @param {{x: number, y: number}} pointA - The first endpoint
     * @param {{x: number, y: number}} pointB - The intermediate point
     * @param {{x: number, y: number}} pointC - The second endpoint
     * @returns {boolean} True when pointB lies on segment AC
     */
    _isScenePointBetween(pointA, pointB, pointC) {
        const minX = Math.min(pointA.x, pointC.x) - TurtleAutocorrector._SCENE_EPSILON;
        const maxX = Math.max(pointA.x, pointC.x) + TurtleAutocorrector._SCENE_EPSILON;
        const minY = Math.min(pointA.y, pointC.y) - TurtleAutocorrector._SCENE_EPSILON;
        const maxY = Math.max(pointA.y, pointC.y) + TurtleAutocorrector._SCENE_EPSILON;

        return pointB.x >= minX
            && pointB.x <= maxX
            && pointB.y >= minY
            && pointB.y <= maxY;
    }

    /**
     * Compare two scene numbers with an epsilon.
     * @private
     * @param {number} valueA - The first number
     * @param {number} valueB - The second number
     * @returns {boolean} True when both numbers are effectively equal
     */
    _areSceneNumbersEqual(valueA, valueB) {
        return Math.abs(valueA - valueB) <= TurtleAutocorrector._SCENE_EPSILON;
    }

    /**
     * Get the normalized end angle of one arc primitive.
     * @private
     * @param {object} arcPrimitive - The input arc
     * @returns {number} The end angle
     */
    _getArcEndAngle(arcPrimitive) {
        return this._normalizeSceneAngle(arcPrimitive.startAngle + arcPrimitive.sweepAngle);
    }

    /**
     * Round one scene number for comparisons.
     * @private
     * @param {number} value - The value to round
     * @returns {number} The rounded value
     */
    _roundSceneNumber(value) {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) {
            return 0;
        }

        const roundedValue = Number(numericValue.toFixed(4));
        return Object.is(roundedValue, -0) ? 0 : roundedValue;
    }

    /**
     * Serialize one point into one stable string.
     * @private
     * @param {{x: number, y: number}} point - The point to serialize
     * @returns {string} The serialized point
     */
    _serializeScenePoint(point) {
        return `${point.x},${point.y}`;
    }

    /**
     * Store the latest comparison failure for debugging.
     * @private
     * @param {object|null} failure - The failure details
     * @returns {void}
     */
    _storeComparisonFailure(failure) {
        this._lastComparisonFailure = failure;
        if (typeof globalThis !== 'undefined') {
            globalThis.__VittaTurtleAutocorrectorDebug = failure;
        }
    }

    /**
     * Store the currently loaded reference state for debugging.
     * @private
     * @param {object|null} autocorrection - The loaded turtle autocorrection
     * @param {object} [extraState={}] - Extra state details
     * @returns {void}
     */
    _storeReferenceState(autocorrection, extraState = {}) {
        const referenceState = {
            currentProjectStorageId: this._currentProjectStorageId,
            usesLocalPersistence: this._shouldUseLocalPersistence(),
            hasReference: Boolean(autocorrection),
            hasReferenceImage: Boolean(autocorrection?.image),
            hasLayeredReference: Boolean(autocorrection?.layers?.drawing),
            hasDrawingScene: Boolean(autocorrection?.drawingScene),
            drawingSceneSupported: autocorrection?.drawingScene?.supported !== false,
            drawingSceneUnsupportedInstructions: Array.isArray(autocorrection?.drawingScene?.unsupportedInstructions)
                ? autocorrection.drawingScene.unsupportedInstructions
                : [],
            drawingScenePrimitivesCount: Array.isArray(autocorrection?.drawingScene?.primitives)
                ? autocorrection.drawingScene.primitives.length
                : 0,
            sampleDrawingPrimitive: Array.isArray(autocorrection?.drawingScene?.primitives) && autocorrection.drawingScene.primitives.length
                ? autocorrection.drawingScene.primitives[0]
                : null,
            drawingSceneViewport: autocorrection?.drawingScene?.viewport || null,
            ...extraState
        };

        this._lastReferenceState = referenceState;

        if (typeof globalThis !== 'undefined') {
            globalThis.__VittaTurtleAutocorrectorState = referenceState;
        }
    }

    /**
     * Find the first differing pixel between two optional image layers.
     * @private
     * @param {ImageData|null} referenceImageData - The reference image data
     * @param {ImageData|null} currentImageData - The current image data
     * @returns {object|null} The first mismatch details
     */
    _findFirstImageDataDifference(referenceImageData, currentImageData) {
        if (!referenceImageData || !currentImageData) {
            return null;
        }

        if (referenceImageData.width !== currentImageData.width || referenceImageData.height !== currentImageData.height) {
            return null;
        }

        const pixelsCount = referenceImageData.width * referenceImageData.height;
        for (let pixelIndex = 0; pixelIndex < pixelsCount; pixelIndex++) {
            const referenceColor = this._getPackedColorAt(referenceImageData.data, pixelIndex);
            const currentColor = this._getPackedColorAt(currentImageData.data, pixelIndex);

            if (referenceColor !== currentColor) {
                const pixelCoordinates = this._getPixelCoordinates(pixelIndex, referenceImageData.width);
                return {
                    pixelIndex,
                    x: pixelCoordinates.x,
                    y: pixelCoordinates.y,
                    referenceColor,
                    currentColor
                };
            }
        }

        return null;
    }

    /**
     * Convert one linear pixel index into x/y canvas coordinates.
     * @private
     * @param {number} pixelIndex - The pixel index
     * @param {number} width - The image width
     * @returns {{x: number, y: number}} The pixel coordinates
     */
    _getPixelCoordinates(pixelIndex, width) {
        return {
            x: pixelIndex % width,
            y: Math.floor(pixelIndex / width)
        };
    }

    /**
     * Compare two optional image data objects strictly.
     * @private
     * @param {ImageData|null} referenceImageData - The reference image data
     * @param {ImageData|null} currentImageData - The current image data
     * @returns {boolean} True when both are strictly identical or both absent
     */
    _areOptionalImageDatasEqual(referenceImageData, currentImageData) {
        if (!referenceImageData && !currentImageData) {
            return true;
        }

        if (!referenceImageData || !currentImageData) {
            return false;
        }

        return this._areImageDatasEqual(referenceImageData, currentImageData);
    }

    /**
     * Convert one dataURL into canonical image data.
     * @private
     * @param {string|null} dataURL - The dataURL to decode
     * @returns {Promise<ImageData|null>} The canonical image data
     */
    async _getCanonicalImageDataFromDataURL(dataURL) {
        if (!dataURL) {
            return null;
        }

        const bitmap = await this._toBitmapFromDataURL(dataURL);
        return this._getCanonicalImageDataFromBitmap(bitmap);
    }

    /**
     * Read one packed RGBA color at a pixel index.
     * @private
     * @param {Uint8ClampedArray} data - The image data buffer
     * @param {number} pixelIndex - The pixel index
     * @returns {number} The packed RGBA color
     */
    _getPackedColorAt(data, pixelIndex) {
        const offset = pixelIndex * 4;
        return this._packColor(
            data[offset],
            data[offset + 1],
            data[offset + 2],
            data[offset + 3]
        );
    }

    /**
     * Pack one RGBA color into one comparable integer.
     * @private
     * @param {number} red - Red channel
     * @param {number} green - Green channel
     * @param {number} blue - Blue channel
     * @param {number} alpha - Alpha channel
     * @returns {number} The packed RGBA color
     */
    _packColor(red, green, blue, alpha) {
        return ((((red * 256) + green) * 256 + blue) * 256 + alpha) >>> 0;
    }

    /**
     * Compare two image data objects strictly.
     * @private
     * @param {ImageData} firstImageData - The first image data
     * @param {ImageData} secondImageData - The second image data
     * @returns {boolean} True when both are identical
     */
    _areImageDatasEqual(firstImageData, secondImageData) {
        if (!firstImageData || !secondImageData) {
            return false;
        }

        if (firstImageData.width !== secondImageData.width || firstImageData.height !== secondImageData.height) {
            return false;
        }

        const firstData = firstImageData.data;
        const secondData = secondImageData.data;

        if (firstData.length !== secondData.length) {
            return false;
        }

        for (let index = 0; index < firstData.length; index++) {
            if (firstData[index] !== secondData[index]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the project current state with turtle exercice parameters
     * @private
     * @returns {object} The project current state with exercise parameters
     */
    _getProjectCurrentState() {
        const currentProject = projectManager.getCurrentProject();
        currentProject.options = projectManager.getCurrentOptionsStatus() || {};
        currentProject.options.showBlankProject = document.querySelector('#checkbox-turtle-exercise-blank-project').checked ? true : false;
        currentProject.options.turtleAutocorrection = this._cloneAutocorrectionData(this._pendingReferenceAutocorrection)
            || { image: this._pendingReferenceImage };
        currentProject.codeText = CodeManager.getSharedInstance().getTextCode();
        currentProject.code = CodeManager.getSharedInstance().getXml();
        currentProject.codeManuallyModified = CodeManager.getSharedInstance().isCodeManuallyModified();
        currentProject.mode = CodeManager.getSharedInstance()._getSelectedMode();
        return currentProject;
    }

    /**
     * Convert dataURL to Blob
     * @private
     * @param {String} dataURL - The dataURL to be converted
     * @returns {Blob} The converted blob
     */
    _dataURLToBlob(dataURL) {
        const [meta, b64] = dataURL.split(',');
        const mime = (meta.match(/data:([^;]+)/) || [])[1] || 'image/png';
        const bin = atob(b64);
        const len = bin.length;
        const u8  = new Uint8Array(len);
        for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
        return new Blob([u8], { type: mime });
    }
    
    /**
     * Convert dataURL to Bitmap
     * @private
     * @param {String} dataURL - The dataURL to be converted
     * @returns {Image} The converted image
     */
    async _toBitmapFromDataURL(dataURL) {
        if ('createImageBitmap' in self) {
            const blob = this._dataURLToBlob(dataURL);
            try {
                // Avoid colorSpaceConversion and prémultiplication if supported
                return await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' });
            } catch {
                return await createImageBitmap(blob);
            }
        } else {
            return await this._loadImage(dataURL);
        }
    }
    
    /**
     * Return an image with a white background from a canvas (avoid surprises from alpha and transparences)
     * @private
     * @param {HTMLCanvasElement} canvas - The canvas to be converted
     * @returns {ImageData} - The converted image
     */
    _getCanonicalImageDataFromCanvas(canvas) {
        const w = canvas.width, h = canvas.height;
        const out = document.createElement('canvas');
        out.width = w; out.height = h;
        const ctx = out.getContext('2d', { willReadFrequently: true });
    
        // Fond blanc "copy" pour initialiser tous les pixels
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    
        return ctx.getImageData(0, 0, w, h);
    }
    
    /**
     * Return an image with a white background from a bitmap image (avoid surprises from alpha and transparences)
     * @private
     * @param {HTMLCanvasElement} bitmap - The bitmap image to be converted
     * @returns {ImageData} - The converted image
     */
    _getCanonicalImageDataFromBitmap(bitmap) {
        const w = bitmap.width || bitmap.naturalWidth || bitmap.videoWidth;
        const h = bitmap.height || bitmap.naturalHeight || bitmap.videoHeight;
        const out = document.createElement('canvas');
        out.width = w; out.height = h;
        const ctx = out.getContext('2d', { willReadFrequently: true });
    
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(bitmap, 0, 0);
        ctx.restore();
    
        return ctx.getImageData(0, 0, w, h);
    }
    
    /**
     * Compare two ImageData with a tolerance
     * @private
     * @param {ImageData} id1 - The first image to be compared
     * @param {ImageData} id2 - The second image to be compared
     * @param {Object} param2 - The tolerance parameters
     * @returns {boolean} true if the images are (nearly) identical, false otherwise
     */
    _areImageDatasClose(id1, id2, { perChannel = 2, maxDifferentRatio = 0.0005, ignoreAlpha = true } = {}) {
        if (!id1 || !id2) return false;
        if (id1.width !== id2.width || id1.height !== id2.height) return false;
    
        const d1 = id1.data, d2 = id2.data;
        const nPix = id1.width * id1.height;
        const maxDiff = Math.ceil(nPix * maxDifferentRatio);
        let diffCount = 0;
    
        for (let i = 0; i < d1.length; i += 4) {
            const dr = Math.abs(d1[i]   - d2[i]);
            const dg = Math.abs(d1[i+1] - d2[i+1]);
            const db = Math.abs(d1[i+2] - d2[i+2]);
            const da = ignoreAlpha ? 0 : Math.abs(d1[i+3] - d2[i+3]);
        
            if (dr > perChannel || dg > perChannel || db > perChannel || da > perChannel) {
                diffCount++;
                if (diffCount > maxDiff) return false;
            }
        }
        return true;
    }
}

TurtleAutocorrector._SCENE_EPSILON = 1e-4;
TurtleAutocorrector._FULL_RADIANS = 2 * Math.PI;

globalThis.turtleAutocorrector = new TurtleAutocorrector();
