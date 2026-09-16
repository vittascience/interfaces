/**
 * Trace turtle executions by listening to instrumented Skulpt turtle
 * instructions and converting them into a geometry scene.
 */

export default class TurtleRenderTracer {
    constructor(containerSelector = '#canvas-turtle') {
        this._containerSelector = containerSelector;
        this._reset();
    }

    /**
     * Capture one reference execution with its geometry scene.
     * @public
     * @param {Function} runCallback - The execution callback
     * @returns {Promise<object>} The captured snapshot
     */
    captureReference(runCallback) {
        return this.captureExecution(runCallback);
    }

    /**
     * Capture one execution with its geometry scene.
     * @public
     * @param {Function} runCallback - The execution callback
     * @returns {Promise<object>} The captured snapshot
     */
    async captureExecution(runCallback) {
        if (typeof runCallback !== 'function') {
            throw new Error('The turtle render callback must be a function.');
        }

        this._beginSceneCapture();

        try {
            await runCallback();
        } finally {
            this._endSceneCapture();
        }

        return this._buildSnapshot(true);
    }

    /**
     * Capture the currently rendered turtle layers without replaying code.
     * @public
     * @returns {Promise<object|null>} The current render snapshot
     */
    async captureCurrentSnapshot() {
        return this._buildSnapshot(false);
    }

    /**
     * Receive one scene command emitted by the Skulpt override.
     * @public
     * @param {object} payload - The emitted scene command
     * @returns {void}
     */
    handleInstruction(payload) {
        if (!this._shouldTraceScene || !payload) {
            return;
        }

        if (payload.viewport) {
            this._updateSceneViewport(payload.viewport);
        }

        if (payload.type === 'viewport') {
            return;
        }

        if (payload.type === 'unsupported') {
            this._markSceneUnsupported(payload.instruction || 'unsupported');
            return;
        }

        this._scenePrimitives.push(this._cloneSceneValue(payload));
    }

    /**
     * Reset the internal tracing state.
     * @private
     * @returns {void}
     */
    _reset() {
        this._previousInstructionTracer = null;
        this._shouldTraceScene = false;
        this._scenePrimitives = [];
        this._sceneSupported = true;
        this._unsupportedInstructions = [];
        this._sceneViewport = null;
    }

    /**
     * Start one traced capture.
     * @private
     * @returns {void}
     */
    _beginSceneCapture() {
        this._reset();
        this._shouldTraceScene = true;
        this._attachInstructionHook();
    }

    /**
     * End one traced capture.
     * @private
     * @returns {void}
     */
    _endSceneCapture() {
        this._detachInstructionHook();
        this._shouldTraceScene = false;
    }

    /**
     * Attach this instance as the active global instruction sink.
     * @private
     * @returns {void}
     */
    _attachInstructionHook() {
        if (typeof globalThis === 'undefined') {
            return;
        }

        this._previousInstructionTracer = globalThis.__VittaTurtleInstructionTracer ?? null;
        globalThis.__VittaTurtleInstructionPatchStatus = {
            overrideLoaded: true,
            originalSourceFound: true,
            helperInjected: true,
            geometryPayloadsEnabled: true,
            patchedMethods: ['primitive-commands'],
            tracedInstructionCount: 0,
            lastInstruction: null,
            instrumentationMode: 'primitive-commands'
        };
        globalThis.__VittaTurtleTraceExecution = true;
        globalThis.__VittaTurtleInstructionTracer = this;
    }

    /**
     * Restore the previous global instruction sink.
     * @private
     * @returns {void}
     */
    _detachInstructionHook() {
        if (typeof globalThis === 'undefined') {
            return;
        }

        if (this._previousInstructionTracer) {
            globalThis.__VittaTurtleInstructionTracer = this._previousInstructionTracer;
        } else {
            delete globalThis.__VittaTurtleInstructionTracer;
        }

        delete globalThis.__VittaTurtleTraceExecution;
    }

    /**
     * Mark the scene as unsupported for one instruction.
     * @private
     * @param {string} instruction - The unsupported instruction
     * @returns {void}
     */
    _markSceneUnsupported(instruction) {
        this._sceneSupported = false;
        this._unsupportedInstructions.push(instruction);
    }

    /**
     * Build the current snapshot with merged and per-layer images.
     * @private
     * @param {boolean} includeDrawingScene - Whether the drawing scene must be included
     * @returns {object|null} The captured snapshot
     */
    _buildSnapshot(includeDrawingScene) {
        const layers = this._getLayerCanvases();
        if (!layers) {
            return null;
        }

        const mergedCanvas = this._mergeCanvases(layers.allCanvases);
        const backgroundCanvas = this._mergeCanvases(layers.backgroundCanvases);
        const drawingCanvas = this._mergeCanvases(layers.drawingCanvases);
        const turtleCanvas = this._mergeCanvases(layers.turtleCanvases);

        return {
            image: mergedCanvas ? mergedCanvas.toDataURL('image/png') : null,
            layers: {
                background: backgroundCanvas ? backgroundCanvas.toDataURL('image/png') : null,
                drawing: drawingCanvas ? drawingCanvas.toDataURL('image/png') : null,
                turtle: turtleCanvas ? turtleCanvas.toDataURL('image/png') : null
            },
            drawingScene: includeDrawingScene ? this._serializeDrawingScene() : null
        };
    }

    /**
     * Serialize the recorded drawing scene.
     * @private
     * @returns {object} The serialized scene
     */
    _serializeDrawingScene() {
        return {
            version: 1,
            supported: this._sceneSupported,
            unsupportedInstructions: [...new Set(this._unsupportedInstructions)],
            viewport: this._cloneSceneValue(this._sceneViewport),
            primitives: this._scenePrimitives.map(primitive => this._cloneSceneValue(primitive))
        };
    }

    /**
     * Get the turtle canvases split into logical layers.
     * @private
     * @returns {object|null} The logical turtle layers
     */
    _getLayerCanvases() {
        const container = document.querySelector(this._containerSelector);
        if (!container) {
            return null;
        }

        const visibleCanvases = [...container.querySelectorAll('canvas')]
            .filter(canvas => getComputedStyle(canvas).display !== 'none')
            .sort((canvasA, canvasB) => {
                const zIndexDifference = this._getCanvasZIndex(canvasA) - this._getCanvasZIndex(canvasB);
                if (zIndexDifference !== 0) {
                    return zIndexDifference;
                }

                const siblings = [...canvasA.parentNode.children];
                return siblings.indexOf(canvasA) - siblings.indexOf(canvasB);
            });

        if (!visibleCanvases.length) {
            return null;
        }

        const backgroundCanvases = visibleCanvases.filter(canvas => this._getCanvasZIndex(canvas) === 1);
        const drawingCanvases = visibleCanvases.filter(canvas => this._getCanvasZIndex(canvas) === 2);
        const turtleCanvases = visibleCanvases.filter(canvas => this._getCanvasZIndex(canvas) >= 3);
        const allCanvases = [...backgroundCanvases, ...drawingCanvases, ...turtleCanvases];

        return allCanvases.length
            ? { allCanvases, backgroundCanvases, drawingCanvases, turtleCanvases }
            : null;
    }

    /**
     * Read the numeric z-index of one canvas.
     * @private
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @returns {number} The numeric z-index
     */
    _getCanvasZIndex(canvas) {
        return parseInt(getComputedStyle(canvas).zIndex, 10) || 0;
    }

    /**
     * Merge a list of canvases into one canvas.
     * @private
     * @param {HTMLCanvasElement[]} canvases - The canvases to merge
     * @returns {HTMLCanvasElement|null} The merged canvas
     */
    _mergeCanvases(canvases) {
        if (!Array.isArray(canvases) || !canvases.length) {
            return null;
        }

        const mergedCanvas = document.createElement('canvas');
        mergedCanvas.width = Math.max(...canvases.map(canvas => canvas.width));
        mergedCanvas.height = Math.max(...canvases.map(canvas => canvas.height));

        const mergedContext = mergedCanvas.getContext('2d');
        for (const canvas of canvases) {
            mergedContext.drawImage(canvas, 0, 0);
        }

        return mergedCanvas;
    }

    /**
     * Update the current scene viewport from one turtle state snapshot.
     * @private
     * @param {object|null} state - The turtle state snapshot
     * @returns {void}
     */
    _updateSceneViewport(state) {
        if (!state || typeof state !== 'object') {
            return;
        }

        this._sceneViewport = this._cloneSceneValue(state);
    }

    /**
     * Clone one scene payload value.
     * @private
     * @param {*} value - The value to clone
     * @returns {*} The cloned value
     */
    _cloneSceneValue(value) {
        if (value === null || value === undefined) {
            return null;
        }

        return JSON.parse(JSON.stringify(value));
    }
}
