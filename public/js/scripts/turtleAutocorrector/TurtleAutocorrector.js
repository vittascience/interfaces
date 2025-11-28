/**
 * Manage the turtle autocorrector system for the python interface
 */

class TurtleAutocorrector {
    constructor() {
        if (TurtleAutocorrector._instance) return TurtleAutocorrector._instance;
        TurtleAutocorrector._instance = this;
        this._referenceImage = null;
        this._pendingReferenceImage = null;
        this._isBlankProjectCheckboxListenerSet = false;
    }

    /**
     * Set the state of the turtle exercise creation modal and open it
     * @public
     */
    async openTurtleExerciseCreationModal() {
        this._loadReferenceImage();
        this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.mustExecute'));
        if (!this._pendingReferenceImage && this.isEnabled()){
            this.setButtonDisabled(document.querySelector('#save-turtle-exercise'), true, i18next.t('modals.turtleCorrection.currentlyUpToDate'));
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
        await PythonRun.start(CodeManager.getSharedInstance().getCode(), "console");
        this._pendingReferenceImage = this._mergeTurtleCanvases().toDataURL('image/png');
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
     * Merge the turtle canvases by keeping their z-index order
     * @private
     * @returns {string} the base64 of the merged image
     */
    _mergeTurtleCanvases() {
        const canvases = document.querySelectorAll('#canvas-turtle canvas');
        if (!canvases.length) {
            console.warn('No turtle canvas to be merged!');
            return false;
        }
        const w = Math.max(...[...canvases].map(c => c.width));
        const h = Math.max(...[...canvases].map(c => c.height));
        const out = document.createElement('canvas');
        out.width = w;
        out.height = h;
        const ctx = out.getContext('2d');
        const sorted = [...canvases].sort((a, b) => {
            const za = parseInt(getComputedStyle(a).zIndex) || 0;
            const zb = parseInt(getComputedStyle(b).zIndex) || 0;
            if (za === zb) {
                const siblings = [...a.parentNode.children];
                return siblings.indexOf(a) - siblings.indexOf(b);
            }
            return za - zb;
        });
        for (const c of sorted) ctx.drawImage(c, 0, 0);
        return out;
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
            projectManager._projectLoader_setCurrentProject(currentProject);
            await projectManager.uploadProjectUpdate(projectManager);
            document.querySelector('#save-turtle-exercise').textContent = i18next.t('modals.turtleCorrection.updateExercise');
            this._referenceImage = this._pendingReferenceImage;
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
        const currentProject = projectManager.getCurrentProject();
        if (currentProject.options && currentProject.options.turtleAutocorrection) return true;
        return false;
    }

    /**
     * Get the the turtle exercise image from the project options field
     * @public
     * @returns {string} the base64 of the image
     */
    getCurrentProjectAutocorrectionImage() {
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options || !currentProject.options.turtleAutocorrection || !currentProject.options.turtleAutocorrection.image) {
            console.warn('No turtle autocorrection found!');
            return false;
        }
        return currentProject.options.turtleAutocorrection.image;
    }

    /**
     * Load the reference image from the project
     * @private
     * @returns {undefined} Early return cases
     */
    _loadReferenceImage() {
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options) return console.error('No options for current project') && false;
        if (!currentProject.options.turtleAutocorrection) return console.error('No turtleAutocorrection for current project') && false;
        if (!currentProject.options.turtleAutocorrection.image) return console.error('No turtleAutocorrection image for current project') && false;
        this._referenceImage = currentProject.options.turtleAutocorrection.image;
    }

    /**
     * Run the autocorrection testing by comparing the current turtle images with the reference image
     * public
     * @returns {Promise} resolve true if the tests succeeded, false otherwise
     */
    async runAutocorrection() {
        this._loadReferenceImage();
        await PythonRun.start(CodeManager.getSharedInstance().getCode(), "console");

        const testedImageCanvas = this._mergeTurtleCanvases();

        const testedImage = testedImageCanvas ? testedImageCanvas.toDataURL('image/png') : false;
        const success = testedImage ? await this._compareCurrentImageWithReference(testedImageCanvas) : false;
        
        this._displayResults(success, testedImage);
        if (success) {
            projectManager.pythonAutocorrectionInteroperabilitySuccess();
        }
        return true;
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
        if (!this._pendingReferenceImage) return true;
        const testedImageCanvas = this._mergeTurtleCanvases();
        return await this._compareCurrentImageWithReference(testedImageCanvas);
    }

    /**
     * Removes the turtle exercise from the current project
     * @public
     * @returns {true|undefined} True if removed, false otherwise
     */
    async removeTurtleExercise() {
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options || !currentProject.options.turtleAutocorrection) return false;
        delete currentProject.options.turtleAutocorrection;
        projectManager._projectLoader_setCurrentProject(currentProject);
        await projectManager.uploadProjectUpdate(projectManager);
        return true;
    }
    
    /**
     * Check or uncheck the blank project checkbox in the exercise creation modal according to the project options value
     * @private
     * @returns {undefined} Early return
     */
    _updateBlankProjectCheckbox() {
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options) return;
        const blankProjectCheckBoxElt = document.querySelector('#checkbox-turtle-exercise-blank-project');
        if (currentProject.options.showBlankProject) {
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
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options) return false;
        const blankProjectCheckboxStatus = document.querySelector('#checkbox-turtle-exercise-blank-project').checked;
        return currentProject.options.showBlankProject == blankProjectCheckboxStatus;
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
     * Compare the provided canvas image with the reference image
     * @private
     * @param {HTMLCanvasElement} testedImageCanvas - The canvas to compare with the reference image
     * @returns {Promise}
     */
    async _compareCurrentImageWithReference(testedImageCanvas) {
        if (!testedImageCanvas) return true;
        if (!this._referenceImage) return false;
    
        // Image décodée depuis le PNG de référence
        const refBitmap = await this._toBitmapFromDataURL(this._referenceImage);
    
        // Canonicalisation (fond blanc + lecture brute des pixels)
        const refID    = this._getCanonicalImageDataFromBitmap(refBitmap);
        const testID   = this._getCanonicalImageDataFromCanvas(testedImageCanvas);
    
        // Compare avec tolérance
        return this._areImageDatasClose(refID, testID, this._tolerance);
    }

    /**
     * Get the project current state with turtle exercice parameters
     * @private
     * @returns {object} The project current state with exercise parameters
     */
    _getProjectCurrentState() {
        const currentProject = projectManager.getCurrentProject();
        if (!currentProject.options) currentProject.options = {};
        currentProject.options.showBlankProject = document.querySelector('#checkbox-turtle-exercise-blank-project').checked ? true : false;
        currentProject.options.turtleAutocorrection = { image: this._pendingReferenceImage };
        currentProject.codeText = CodeManager.getSharedInstance().getTextCode();
        currentProject.code = CodeManager.getSharedInstance().getXml();
        currentProject.codeManuallyModified = CodeManager.getSharedInstance().isCodeManuallyModified();
        currentProject.mode = CodeManager.getSharedInstance()._getSelectedMode();
        currentProject.options = projectManager.getCurrentOptionsStatus();
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

globalThis.turtleAutocorrector = new TurtleAutocorrector();