var AutoCorrector = {

    MAX_FRAME: 500,
    DURATION: 10000,
    ERROR_MARGIN: 200,

    exerciseFrames: [],
    exerciseFramesOptimized: [],
    exerciseFramesIds: [],
    recordedFrames: [],
    recordedFramesOptimized: [],
    svgModules: [],
    userMargin: {},
    currentError: null,
    recordIntervalId: null,
    comparingInterval: null,
    frameCounter: 0,
    isRunning: false,
    isFalse: false,
    isValidating: false,
    isRecording: false,
    outputValues: {},
    exerciseCreationRequest: false,
    wrongFrameId: null,
    displayChonogram: false,
    loader_link: `${CDN_PATH}/public/content/img/spinning-loader.svg`,

    /**
     * Initialize AutoCorrector buttons.
     * @public
     */
    init: function () {
        if (document.querySelector('.auto-corrector-buttons') === null) {
            this.addAutoCorrectorButtonsToDom();
        }

        $("body").on("click", "#record-exercise", () => {
            $("#exercise-mode").prop('disabled', true);
            $("#save-exercise").prop('disabled', true);
            pseudoModal.newBlocker("modals.simulator.auto-corrector.record_simulator_wait_message", 'record-container', '1.5rem');
            this.isRecording = true;
            Simulator.replay();
        });

        /**
         * Save recorded exercise and update exercise project.
         */
        $("body").on("click", "#save-exercise", async () => {
            pseudoModal.newBlocker("modals.simulator.auto-corrector.save_exercise_wait_message", 'simulator-modules', '1rem');
            const exerciseId = await projectManager.exercises_create();
            if (typeof exerciseId != 'undefined') {
                await projectManager.exercises_saveFrames(this.recordedFramesOptimized, exerciseId);
                document.getElementById('save-exercise').textContent = jsonPath('modals.simulator.auto-corrector.update-exercice');
                await this.importExerciseInSimulator(projectManager._currentExercise);
            }
            pseudoModal.endBlocker('simulator-modules');
            pseudoModal.closeModal("modal-auto-corrector-creation");
            $("#exercise-mode").prop('disabled', false);
        });

        $("body").on("click", "#auto-corrector-creation-cancel", () => {
            pseudoModal.closeModal("modal-auto-corrector-creation");
            $("#exercise-mode").prop('disabled', false);
        });

        $("body").on("click", "#auto-corrector-incorrect-cancel", () => {
            pseudoModal.closeModal("modal-auto-corrector-incorrect");
        });

        $("body").on("click", "#auto-corrector-correct-cancel", () => {
            pseudoModal.closeModal("modal-auto-corrector-correct");
        });

        $("body").on("click", "#training-mode", function () {
            $("#simulator").removeClass("visualizer");
            $("#simulator-modules").removeClass("visualizer-mode");
            $(".simulator-buttons")[0].style.setProperty('display', 'block', 'important');
            $(".auto-corrector-buttons")[0].style.setProperty('display', 'none', 'important');
            $('#training-mode').addClass("active");
            $('#exercise-mode').removeClass("active");
            $('.has-interaction').addClass('pulse-circle');
            $('#auto-corrector-draw-chronogram').hide();
            if (!Simulator.isRunning && !projectManager.isOpeningProject) {
                Simulator.replay();
            }
        });

        $("body").on("click", "#exercise-mode", () => {
            if (Simulator.isRunning) {
                Simulator.pause();
            }
            $("#simulator").addClass("visualizer");
            $("#simulator-modules").addClass("visualizer-mode");
            $(".simulator-buttons")[0].style.setProperty('display', 'none', 'important');
            $(".auto-corrector-buttons")[0].style.setProperty('display', 'block', 'important');
            $('.visualizer-right-svg').removeClass("visualizer-frame")
            $(".visualizer-frame").remove();
            $('#training-mode').removeClass("active");
            $('#exercise-mode').addClass("active");
            this.checkModulesInExercise();
            if ($("#simulator-modules").hasClass('visualizer-mode')) {
                this.sortRightModules();
            }
        });

        // Ajouter un gestionnaire d'événements au clic du bouton
        $("body").on("click", "#copy-code", function () {
            var inputElement = document.getElementById("code-value");
            var checkIcon = document.getElementById("check-icon");
            // Copier le contenu de l'input dans le presse-papiers
            inputElement.select();
            document.execCommand("copy");

            // Afficher l'icône de la coche
            checkIcon.style.visibility = "visible";

            // Masquer l'icône après une seconde
            setTimeout(function () {
                checkIcon.style.visibility = "hidden";
            }, 1000);
        });
    },

    addAutoCorrectorButtonsToDom() {
        const autoCorrectorButtonsHtml = 
        `<div class="auto-corrector-buttons d-flex justify-content-center my-2" style="display: none !important;">
            <div class="btn-group oi-btn-group-simulator oi-simulation-activated">
                <button id="auto-corrector-validate" class="btn oi-btn-simulator fw-bold px-2" data-i18n="[title]code.simulator.buttons.auto-corrector.validate"
                        data-toggle="tooltip" data-placement="top" title="Valider l'exercice" onclick="AutoCorrector.validate()">
                    <i class="fas fa-play"></i> Valider
                </button>
            </div>
            <div class="btn-group oi-btn-group-simulator oi-option-activated">
                <button id="auto-corrector-draw-chronogram" class="btn oi-btn-simulator" style='display:none' data-i18n="[title]code.simulator.buttons.auto-corrector.chronogram" 
                        data-toggle="tooltip" data-placement="top" title="Afficher le chronogramme" onclick="AutoCorrector.drawCorrection()">
                        <i class="fa-solid fa-wave-square"></i></button>
            </div>
            <div class="btn-group oi-btn-group-simulator oi-option-activated">
                <button id="simulator_fullscreen" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.base.fullscreen" 
                        data-toggle="tooltip" data-placement="top" title="Plein écran" onclick="Simulator.toggleFullscreen()">
                    <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-fullscreen.svg" alt="Fullscreen icon"></button>
            </div>
        </div>`;
        document.querySelector(".simulator-buttons").insertAdjacentHTML('afterend', autoCorrectorButtonsHtml);
    },

    /**
     * Reset AutoCorrector.
     * @public
     */
    reset: function () {
        this.exerciseFrames = new Array();
        this.exerciseFramesOptimized = new Array();
        this.exerciseFramesIds = new Array();
        this.recordedFrames = new Array();
        this.recordedFramesOptimized = new Array();
        this.svgModules = new Array();
        this.userMargin = Object.create(null);
        this.currentError = null;
        this.frameCounter = 0;
        this.isRunning = false;
        this.isFalse = false;
        this.isValidating = false;
        this.isRecording = false;
        clearInterval(this.recordIntervalId);
        clearInterval(this.comparingInterval);
        this.recordIntervalId = null;
        this.comparingInterval = null;
        this.wrongFrameId = null;
        this.cleanupExercisePanel();
        $(".chronogram-body").html(
            `<p class="chronogram-paragraph">
                ${jsonPath('modals.simulator.auto-corrector.explanations')}
            </p>`
        );
        $('#record-exercise').html(jsonPath('modals.simulator.auto-corrector.recording'));
    },

    /**
     * Cleanup exercise panel by removing SVG from simulator.
     * @public
     */
    cleanupExercisePanel: function () {
        $(".visualizer-right-svg").remove();
        $(".visualizer-left-svg").remove();
    },

    /**
     * Open exercise creator modal.
     * @public
     */
    openExerciseCreator: function () {
        if (!$("#simulator").is(":visible") && !$("#simulator-wires").is(":visible")) {
            toggleSimulator();
        }
        pseudoModal.openModal('modal-auto-corrector-creation', false);
        $("#modal-auto-corrector-creation").find(".vitta-modal-exit-btn").on('click', function () {
            $("#exercise-mode").prop('disabled', false);
        });
        if (this.exerciseFrames == this.recordedFrames || this.recordedFrames.length == 0) {
            $("#save-exercise").prop('disabled', true);
        }
        $("#training-mode").click();
        $("#exercise-mode").prop('disabled', true);
        this.showChronogram();
    },

    /**
     * Start recording exercise during simulator running.
     * @public
     * @param {NodeList} modules 
     */
    recordExercise: function (modules) {
        $("#simulator_replay").prop('disabled', true);
        $("#simulator_play").prop('disabled', true);
        $("#simulator_pause").prop('disabled', true);
        let counter = 0;
        this.recordedFrames = [];
        this.recordedFramesOptimized = [];
        console.time("record");
        var that = this;
        this.blockUserInteractions();
        this.recordIntervalId = setInterval(() => {
            if (Simulator.mainExecutionStarted) {
                that.recordedFrames.push(
                    [...modules].map((module) => {
                        const data = {
                            frame: counter,
                            id_component: module.id
                        };
                        const mod = Simulator.getModuleByKey(module.id.split('_')[0]);
                        if (mod.type == 'output') {
                            const value = that.outputValues[String(module.id)];
                            data.value = value ? value : (mod.value ? mod.value : 0);
                        } else {
                            if (mod.listeners.length > 1) {
                                const currentGauge = $('#' + module.id).find('.slide-display:not(.not-shown)')[0];
                                const suffix = currentGauge.id.split('_gauge')[1];
                                data.value = suffix + ';' + Simulator.getSliderValue(module.id, suffix);
                            } else {
                                data.value = Simulator.getSliderValue(module.id, mod.listeners[0].suffix);
                            }
                        }
                        return data;
                    }),
                );
                counter++;
                const chrono = Math.round((that.DURATION - counter * Math.round((that.DURATION / that.MAX_FRAME))) / 1000);
                pseudoModal.setMessage("modal-auto-corrector-creation",
                    jsonPath('modals.simulator.auto-corrector.record-exercise.title') + chrono + jsonPath('modals.simulator.auto-corrector.record-exercise.unit') + '...',
                    "success");
                if (counter > that.MAX_FRAME - 1) {
                    that.isRecording = false;
                    pseudoModal.endBlocker('record-container');
                    that.blockUserInteractions(false);
                    $("#save-exercise").prop('disabled', false);
                    $("#simulator_replay").prop('disabled', false);
                    $("#simulator_play").prop('disabled', false);
                    $("#simulator_pause").prop('disabled', false);
                    that._optimizeRecordedFrames(that.recordedFrames);
                    pseudoModal.setMessage(
                        "modal-auto-corrector-creation",
                        "Enregistrement effectué avec succès",
                        "success",
                    );
                    console.timeEnd("record");
                    that.showChronogram();
                    clearInterval(that.recordIntervalId);
                    that.outputValues = {};
                }
            }
        }, Math.round(that.DURATION / that.MAX_FRAME));
    },

    /**
     * Show chronogram inside the modal 'Create an exercise'.
     * @public
     */
    showChronogram: function () {
        if (this.recordedFrames.length !== 0) {
            $(".chronogram-body").html('<div class="svg-container"></div>');
            this._displayExerciseSVG(this.recordedFrames, '.svg-container');
            $('#record-exercise').html(jsonPath('modals.simulator.auto-corrector.recordingAgain'));
        }
    },

    /**
     * Get exercise frames from database.
     * @param {Object} currentExercise 
     * @returns 
     */
    getExerciseFrames: async function (currentExercise) {
        if (currentExercise == 'no-exercise' || !currentExercise) {
            return false;
        } else {
            $("#auto-corrector-validate").prop('disabled', true);
            this.exerciseFramesOptimized = await projectManager.exercises_getFrames(currentExercise.exercise.id);
            this.exerciseFrames = this._createArray(this.exerciseFramesOptimized);
            this.recordedFrames = this.exerciseFrames;
            $("#auto-corrector-validate").prop('disabled', false);
            this.showChronogram();
            document.getElementById('save-exercise').textContent = jsonPath('modals.simulator.auto-corrector.update-exercice');
            this.exerciseFramesIds = [];
            var that = this;
            this.exerciseFrames[0].forEach(function (frame) {
                that.exerciseFramesIds.push(frame.id_component);
            });
            return true;
        }
    },

    /**
     * Import exercise into simulator.
     * @param {Object} currentExercise 
     */
    importExerciseInSimulator: async function (currentExercise) {
        if (await this.getExerciseFrames(currentExercise)) {
            this.cleanupExercisePanel();
            if (this.exerciseFrames.length !== 0) {
                this._displayExerciseSVG(this.exerciseFrames, "#simulator-modules");
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
        $("#simulator-switcher").show();
    },

    /**
     * Start validation of exercise.
     * @public
     */
    validate: function () {
        $('#auto-corrector-draw-chronogram').show();
        // TO BE REMOVED
        this.addLoader();
        const rightModules = $(".simulator-module:not(.exercise-module):not(.empty-module):not('visualizer-module-unpresent')");
        let rightModuleIds = [];
        for (var i = 0; i < rightModules.length; i++) {
            rightModuleIds.push(rightModules[i].id);
        }
        if (rightModuleIds.length === this.exerciseFramesIds.length
            && rightModuleIds.every((val, index) => val === this.exerciseFramesIds[index])) {
            $("#training-mode").prop('disabled', true);
            FramesVisualizer.resetValidator();
            this.isValidating = true;
            Simulator.replay();
        } else {
            $('#auto-corrector-loader').remove();
            pseudoModal.openModal("modal-auto-corrector-incorrect");
            $("#incorrect-error").html(`<p>
                ${jsonPath('modals.simulator.auto-corrector.missingComponents')}
            </p>`);
            if (typeof xapiAutocorrection != 'undefined') {
                xapiAutocorrection.sendFailTrace();
            }

            if (typeof lti13Controller != 'undefined' && lti13Controller.isSubmitting == true) {
                const gradeData = {
                    launchId: ltiVariables13.launchId,
                    gradingProgress: 'FullyGraded',
                    scoreMaximum: 3,
                    scoreGiven: 0.001,
                    interface: projectManager.getInterface(),
                    projectLink: projectManager._currentProject.link
                };
                lti13Controller.manager.submitGradeToLMS(gradeData)
                    .then((responseFromApi) => {
                        if (typeof responseFromApi.returnUrl === 'undefined') {
                            lti13Controller.isSubmitting = false;
                            return;
                        }
                        if (lti13Controller.getIsRpc()) {
                            if (typeof lti13Controller.studentSubmissionResolve === 'function') {
                                lti13Controller.studentSubmissionResolve(lti13Controller.studentSubmissionUpdatedProject);
                            } else if (lti13Controller.studentSubmissionReject === 'function') {
                                lti13Controller.studentSubmissionReject();
                            } else {
                                console.error('Error while using studentSubmissionResolve/Reject!');
                            }
                        } else {
                            location.replace(responseFromApi.returnUrl);
                        }
                        lti13Controller.isSubmitting = false;
                        lti13Controller.studentSubmissionResolve = false;
                        lti13Controller.studentSubmissionReject = false;
                        lti13Controller.studentSubmissionUpdatedProject = false;
                    });
            }
        }
        /**
          * There are big problems with the MOOC, so the chronogram will not be displayed until a viable fix is found
          */
        // var codeSleep = Simulator.code.match(/sleep_(ms|us)\([0-9]+\)/gi);
        // if (codeSleep !== null && codeSleep.length > 0) {
        //     for (let i = 0; i < codeSleep.length; i++) {
        //         const sleepTime = parseInt(codeSleep[i].match(/\d+/gi));
        //         if ((sleepTime <= 100 && codeSleep[i].match(/ms/gi).length > 0) || (sleepTime <= 1000 && codeSleep[i].match(/us/gi).length > 0)) {
        //             this.displayChonogram = false;
        //             this.addLoader();
        //             break;
        //         }
        //     }
        // } else {
        //     this.displayChonogram = true;
        // }
    },

    /**
     * Compare exercise frames and user simulator.
     * @public
     */
    startValidation: function () {
        try {
            $("#auto-corrector-validate").prop('disabled', true);
            $("#exercise-mode").prop('disabled', true);
            console.time("timer");
            var timer = new Date().getTime();
            this._compareLogic(this.exerciseFrames[0]);
            this.blockUserInteractions();
            if (!this.displayChonogram) {
                $('#auto-corrector-draw-chronogram').show();
            } else {
                $('#auto-corrector-draw-chronogram').hide();
            }
            this.comparingInterval = setInterval(() => {
                if (Simulator.mainExecutionStarted) {
                    this._compareLogic(this.exerciseFrames[this.frameCounter]);
                    this.isRunning = true;
                    if (this.frameCounter >= this.MAX_FRAME || this.isFalse) {
                        $("#auto-corrector-validate").prop('disabled', false);
                        $("#training-mode").prop('disabled', false);
                        $("#exercise-mode").prop('disabled', false);
                        Simulator.pause();
                        clearInterval(this.comparingInterval);
                        console.timeEnd("timer");
                        this.isRunning = false;
                        this.isValidating = false;
                        this.frameCounter = 0;
                        this.userMargin = {};
                        this.outputValues = {};
                        this.blockUserInteractions(false);
                        if (this.displayChonogram === false) {
                            $('#auto-corrector-loader').remove();
                        }
                        if (this.isFalse) {
                            this.currentError.time = new Date().getTime() - timer;
                            pseudoModal.openModal("modal-auto-corrector-incorrect");
                            $("#incorrect-error").html(`<p>
                            ${jsonPath('modals.simulator.auto-corrector.detectedError')} <b>${this.currentError.module}</b> ${jsonPath('modals.simulator.auto-corrector.isNotCorrect')} <b>t = ${this.currentError.time} ms<br>
                        </p>`);
                            this.isFalse = false;
                            if (typeof xapiAutocorrection != 'undefined') {
                                xapiAutocorrection.sendFailTrace();
                            }

                            if (typeof lti13Controller != 'undefined' && lti13Controller.isSubmitting == true) {
                                const gradeData = {
                                    launchId: ltiVariables13.launchId,
                                    gradingProgress: 'FullyGraded',
                                    scoreMaximum: 3,
                                    scoreGiven: 0.001,
                                    interface: projectManager.getInterface(),
                                    projectLink: projectManager._currentProject.link
                                };
                                lti13Controller.manager.submitGradeToLMS(gradeData)
                                    .then((responseFromApi) => {
                                        if (typeof responseFromApi.returnUrl === 'undefined') {
                                            lti13Controller.isSubmitting = false;
                                            return;
                                        }
                                        if (lti13Controller.getIsRpc()) {
                                            if (typeof lti13Controller.studentSubmissionResolve === 'function') {
                                                lti13Controller.studentSubmissionResolve(lti13Controller.studentSubmissionUpdatedProject);
                                            } else if (lti13Controller.studentSubmissionReject === 'function') {
                                                lti13Controller.studentSubmissionReject();
                                            } else {
                                                console.error('Error while using studentSubmissionResolve/Reject!');
                                            }
                                        } else {
                                            location.replace(responseFromApi.returnUrl);
                                        }
                                        lti13Controller.isSubmitting = false;
                                        lti13Controller.studentSubmissionResolve = false;
                                        lti13Controller.studentSubmissionReject = false;
                                        lti13Controller.studentSubmissionUpdatedProject = false;
                                    });
                            }
                        } else {
                            pseudoModal.openModal("modal-auto-corrector-correct");
                            /**
                             * There are big problems with the MOOC, so it doesn't matter if it is an iframe for the MOOC or directly the Galaxia interface, we display the code 
                             */
                            if ((typeof httpReferrer != "undefined" && httpReferrer.includes('fun-mooc')) || INTERFACE_NAME === 'galaxia') {
                                $('#code-value').val(this.generateExerciseCode());
                            } else {
                                $('.auto-corrector-exercise-code').hide();
                            }

                            if (typeof xapiAutocorrection != 'undefined') {
                                xapiAutocorrection.sendSuccessTrace();
                            }
                        }

                        if (typeof lti13Controller != 'undefined' && lti13Controller.isSubmitting == true) {
                            const gradeData = {
                                launchId: ltiVariables13.launchId,
                                gradingProgress: 'FullyGraded',
                                scoreMaximum: 3,
                                scoreGiven: 3,
                                interface: projectManager.getInterface(),
                                projectLink: projectManager._currentProject.link
                            };
                            lti13Controller.manager.submitGradeToLMS(gradeData)
                                .then((responseFromApi) => {
                                    if (typeof responseFromApi.returnUrl === 'undefined') {
                                        lti13Controller.isSubmitting = false;
                                        return;
                                    }
                                    if (lti13Controller.getIsRpc()) {
                                        if (typeof lti13Controller.studentSubmissionResolve === 'function') {
                                            lti13Controller.studentSubmissionResolve(lti13Controller.studentSubmissionUpdatedProject);
                                        } else if (lti13Controller.studentSubmissionReject === 'function') {
                                            lti13Controller.studentSubmissionReject();
                                        } else {
                                            console.error('Error while using studentSubmissionResolve/Reject!');
                                        }
                                    } else {
                                        location.replace(responseFromApi.returnUrl);
                                    }
                                    lti13Controller.isSubmitting = false;
                                    lti13Controller.studentSubmissionResolve = false;
                                    lti13Controller.studentSubmissionReject = false;
                                    lti13Controller.studentSubmissionUpdatedProject = false;
                                });
                        }
                    }
                }
            }, Math.round(this.DURATION / this.MAX_FRAME));
        } catch (e) {
            console.error(e)
        }
    },

    /**
     * Transform optimized frames from database into exercise frames.
     * @private
     * @param {Array<Object>} frames 
     * @returns allFrames
     */
    _createArray: function (frames) {
        var components = {};
        // separate modules
        frames.forEach(function (x) {
            const obj = {
                frame: x.frame,
                value: x.value,
            };
            if (components[x.component]) {
                components[x.component].push(obj);
            } else {
                components[x.component] = [obj];
            }
        });
        // generate the 500 frames for each module
        var componentsArray = {};
        for (var c in components) {
            componentsArray[c] = new Array(this.MAX_FRAME);
            const currentCompFrames = components[c];
            for (var f = 0; f < currentCompFrames.length; f++) {
                const currentChangingFrame = currentCompFrames[f].frame;
                const fillComponentArray = function (len) {
                    for (var k = currentChangingFrame; k < len; k++) {
                        componentsArray[c][k] = {
                            frame: k,
                            id_component: c,
                            value: currentCompFrames[f].value,
                        };
                    }
                };
                if (currentCompFrames[f + 1] !== undefined) {
                    fillComponentArray(currentCompFrames[f + 1].frame);
                } else {
                    fillComponentArray(this.MAX_FRAME);
                }
            }
        }
        // merge 500 frames of components in 1 array
        var allFrames = [];
        for (var i = 0; i < this.MAX_FRAME; i++) {
            let subArray = [];
            for (let c in componentsArray) {
                subArray.push(componentsArray[c][i]);
            }
            allFrames.push(subArray);
        }
        return allFrames;
    },

    sortFrame(f) {
        return f.reduce(
            (arrays, frameModule) => {
                const mod = Simulator.getModuleByKey(frameModule.id_component.split('_')[0]);
                return (arrays[mod.type === 'input' ? 0 : 1].push(frameModule), arrays)
            },
            [[], []]
        ).flat();
    },

    /**
     * Compare frame from exercise and simulator value.
     * @private
     * @param {Array<Object>} f 
     */
    _compareLogic: function (f) {
        const frame = this.sortFrame(f);
        var that = this;
        frame.forEach(function (frameModule) {
            if (!that.isFalse) {
                const id = frameModule.id_component;
                let frameModuleValue = null;
                try {
                    frameModuleValue = JSON.parse(frameModule.value);
                } catch (error) {
                    console.warn(error);
                    frameModuleValue = frameModule.value;
                }
                const mod = Simulator.getModuleByKey(id.split('_')[0]);
                if (mod.type == 'output') {
                    const simulatorValue = that.outputValues[String(id)];
                    // console.log([frameModuleValue, simulatorValue]) // Debug!
                    var isEqual = true;
                    if (typeof simulatorValue !== 'undefined') {
                        if (typeof frameModuleValue === 'object') {
                            isEqual = frameModuleValue.every((valeur, index) => valeur === simulatorValue[index]);
                        } else {
                            isEqual = (frameModuleValue == simulatorValue);
                        }
                        if (!isEqual) {
                            if (that.userMargin[id] !== undefined) {
                                that.userMargin[id] += Math.round(that.DURATION / that.MAX_FRAME)
                            } else {
                                that.userMargin[id] = Math.round(that.DURATION / that.MAX_FRAME)
                            }
                        } else {
                            that.userMargin[id] = 0;
                        }
                    }
                } else {
                    if (frameModule.value.includes(';')) {
                        const suffix = frameModuleValue.split(';')[0];
                        const currentGauge = $("#simulator-modules.visualizer-mode").find('.slide-display:not(.not-shown)');
                        const currentGaugeSuffix = currentGauge[0].id.split('_gauge')[1];
                        if (currentGaugeSuffix !== suffix) {
                            currentGauge.addClass('not-shown');
                            $('#' + id + '_gauge' + suffix).removeClass('not-shown');
                            $('#' + id + '_select')[0].value = suffix;
                        }
                        Simulator.setSliderValue(id, parseFloat(frameModuleValue.split(';')[1]), suffix);
                        frameModule.value = frameModuleValue.split(';')[1];
                    } else {
                        Simulator.setSliderValue(id, parseFloat(frameModuleValue), mod.listeners[0].suffix);
                    }
                }
                for (var i in that.userMargin) {
                    if (that.userMargin[i] > that.ERROR_MARGIN) {
                        that.currentError = {
                            "module": mod.title,
                            "rightValue": frameModule.value
                        };
                        that.isFalse = true;
                        that.wrongFrameId = that.frameCounter;
                        if (that.displayChonogram) {
                            FramesVisualizer.drawDotFrame(frameModule, false);
                        }
                    } else if (that.displayChonogram) {
                        that.wrongFrameId = null;
                        FramesVisualizer.drawDotFrame(frameModule, true);
                    }
                }
            }
        });
        this.frameCounter++;
    },

    /**
     * Draw the chronogram
     */
    drawCorrection: function () {
        var frame_counter = 0,
            that = this;
        this.blockUserInteractions();
        FramesVisualizer.resetValidator();
        const drawCorrectionInterval = setInterval(() => {
            const frame = that.sortFrame(that.exerciseFrames[frame_counter]);
            frame.forEach(function (frameModule) {
                if (that.wrongFrameId !== null && that.wrongFrameId === frame_counter) {
                    FramesVisualizer.drawDotFrame(frameModule, false);
                } else {
                    FramesVisualizer.drawDotFrame(frameModule, true);
                }
            });
            if (that.exerciseFrames.length === frame_counter + 1 || (that.wrongFrameId !== null && that.wrongFrameId === frame_counter)) {
                this.blockUserInteractions(false);
                clearInterval(drawCorrectionInterval);
            }
            frame_counter++;
        }, Math.round(this.DURATION / this.MAX_FRAME));
    },

    /**
     * Optimize frames to register in database.
     * @private
     * @param {Array<Array<Object>>} frames
     */
    _optimizeRecordedFrames: function (frames) {
        const modulesLength = frames[0].length;
        for (var i = 0; i < modulesLength; i++) {
            let currentValue = undefined;
            frames.forEach(function (f) {
                if (typeof currentValue == 'undefined' || currentValue != f[i].value) {
                    AutoCorrector.recordedFramesOptimized.push(f[i]);
                    currentValue = f[i].value;
                }
            });
        }
    },

    /**
     * Display the exercise into container.
     * @param {Array<Array<Object>>} frames 
     * @param {string} container 
     */
    _displayExerciseSVG: function (frames, container) {
        try {
            const framesCopy = JSON.parse(JSON.stringify(frames));
            framesCopy.forEach((f) => {
                f.forEach((frameModule) => {
                    const mod = Simulator.getModuleByKey(frameModule.id_component.split('_')[0]);
                    if (mod.type == 'input' && String(frameModule.value).includes(';')) {
                        frameModule.value = frameModule.value.split(';')[1];
                    }
                });
            });
            this.svgModules = FramesVisualizer.generateExerciseSVG(framesCopy);
            this.svgModules.forEach(function (svg) {
                SVG(svg).addTo(container);
            });
        } catch (e) {
            console.error(e)
        }
    },

    /**
     * Check if at least one module is a right module for exercise.
     * Hide left SVG (modules div) in this case.
     */
    checkModulesInExercise: function () {
        if (this.exerciseFramesIds.length !== 0) {
            var isInExercise = false;
            var that = this;
            Simulator.getSimulatedModules().each(function () {
                if ($(this).attr('id')) {
                    $(this).removeClass('visualizer-module-unpresent');
                    const moduleInExercise = that.exerciseFramesIds.includes($(this).attr('id'));
                    if (moduleInExercise) {
                        isInExercise = true;
                    } else {
                        $(this).addClass('visualizer-module-unpresent');
                    }
                }
            });
            if (isInExercise) {
                $("#simulator-modules.visualizer-mode").find(".visualizer-left-svg").hide();
            } else {
                $("#simulator-modules.visualizer-mode").find(".visualizer-left-svg").show();
            }
        }
    },

    /**
     * Sort the simulated modules by exercise list.
     */
    sortRightModules: function () {
        $('.empty-module').remove();
        if (this.exerciseFramesIds.length !== 0 && !$(".visualizer-left-svg").is(":visible")) {
            for (var i = 0; i < this.exerciseFramesIds.length; i++) {
                const html = $("#" + this.exerciseFramesIds[i]).detach().get(0);
                if (html !== undefined) {
                    $("#simulator-modules.visualizer-mode").append(html);
                } else {
                    $("#simulator-modules.visualizer-mode").append(Simulator.generateEmptyModuleDiv());
                }
            }
        }
        $('.has-interaction').removeClass('pulse-circle');
    },

    /**
     * Blocks all user interactions except in mosaic
     * @param {Boolean} noInteractions 
     */
    blockUserInteractions: function (noInteractions = true) {
        const elements = ['.ide-editor', '.ide-navbar ', '#main-navbar', '.monitor', '.simulator-board-buttons', '.simulator-buttons', '#auto-corrector-validate', '#auto-corrector-draw-chronogram'];
        elements.forEach(function (element) {
            const selectedElement = document.querySelector(element);
            if (selectedElement) {
                selectedElement.style.filter = (noInteractions ? 'blur(3px)' : 'unset');
                selectedElement.style.pointerEvents = (noInteractions ? 'none' : 'unset');
            }
        });
        if (document.querySelector('.visualizer-right-svg')) {
            document.querySelector('.visualizer-right-svg').style.pointerEvents = (noInteractions ? 'none' : 'unset');
        }
        const boardContainer = document.querySelector('#board-container');
        if (boardContainer) {
            boardContainer.style.pointerEvents = ((this.isValidating || (!this.isRecording && boardContainer.style.pointerEvents === 'unset')) ? 'none' : 'unset');
        }
    },

    /**
     * Add loader during the recording of an exercise or during correction
     */
    addLoader: function () {
        let html = `<div id="auto-corrector-loader"><div id="loader-content"><img src="${this.loader_link}"><span>${jsonPath('modals.simulator.auto-corrector.correction')}</span></div></div>`;
        $('#simulator-modules').append(html);
    },

    /**
     * Generates a unique code based on the timestamp
     * @returns {String} Code
     */
    generateExerciseCode: function () {
        const now = new Date().getTime();
        let dateString = now.toString();
        const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * randomChars.length);
            dateString = randomChars.charAt(randomIndex) + dateString;
        }
        return btoa(dateString);
    }
};