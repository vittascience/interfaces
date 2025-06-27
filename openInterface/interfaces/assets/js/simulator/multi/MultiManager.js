/**
 * This class is responsible of the multi interface management (AKA Duo mode)
 */

import { CommunicationManager } from '/openInterface/interfaces/assets/js/simulator/multi/CommunicationManager.js';

export class MultiManager {
    constructor() {
        if (MultiManager._instance) {
            return MultiManager._instance;
        }
        MultiManager._instance = this;
        this._started = false;
        this._iframe = null;
        this._communicationManager = null;
        this._isChildInterfaceProjectLoaded = false;
    }

    /**
     * Start the multi mode
     * @public
     * @returns {promise} true
     */
    async startMulti() {
        this._setMultiQueryParam();
        this._hideMultiButton();
        await this._loadIframe();
        await this._setIframeCommunication();
        this._setIframeMiscListeners();
        this._setIframeLocalStorageListener();
        this._setIframeStartingState();
        return true;
    }

    /**
     * Create the iframe and the related DOM elements. Also add styles and size interactions
     * @private
     * @returns {promise} true
     */
    async _loadIframe() {
        this._iframe = document.createElement('iframe');
        this._iframe.classList.add('multi-iframe');
        this._iframe.id = 'multi-iframe';
        this._iframeWrapper = document.createElement('div');
        this._iframeWrapper.id = 'multi-iframe-wrapper';
        this._iframeWrapper.classList.add('multi-iframe-wrapper');
        const multiMenu = document.createElement('div');
        multiMenu.classList.add('multi-menu-wrapper');
        multiMenu.innerHTML = `
        <div class="multi-menu">
            <div class="multi-menu-controls">
                <span class="resize-handle" id="resize-handle">
                    <i class="fas fa-arrows-alt-h"></i>
                </span>
                <div class="multi-menu-separator"></div>
                <span class="multi-options" id="multi-options" data-toggle="modal" data-target="#optionModal">
                    <i class="fas fa-cog"></i>
                </span>
            </div>
        </div>`;
        const ideContentElt = document.querySelector('#ide-content');
        const blockStyle = Main.getWorkSpace().renderer_.name;
        await new Promise((resolve) => {
            const iframeId = projectManager.localStorageManager.uniqid('multi');
            this._setIframeStartingBlocksAndCode(iframeId);
            this._iframe.src = `${CDN_PATH}/${INTERFACE_NAME}/?renderer=${blockStyle}&localId=${iframeId}`;
            this._iframe.addEventListener('load', () => {
                resolve(); 
            });
            ideContentElt.appendChild(this._iframeWrapper);
            this._iframeWrapper.appendChild(multiMenu);
            this._iframeWrapper.appendChild(this._iframe);
            const isSimulatorOpened = document.querySelector('.ide-simulator').style.display != 'none';
            if (isSimulatorOpened) {
                document.querySelector('.ide-simulator').style.width = '25%';
                document.querySelector('.ide-base').style.width = '25%';
            } else {
                document.querySelector('.ide-base').style.width = '50%';
            }
            this._setInitialIframeSize();
        });
        this._styleIframe();
        this._setIframeInteractions();
        return true;
    }

    /**
     * Add a class to the iframe ide-absolute-container element to style the iframe
     * @private
     */
    _styleIframe() {
        this._iframeDocumentElt = this._iframe.contentWindow.document;
        const iframeIdeContainer = this._iframeDocumentElt.querySelector('#ide-absolute-container');
        iframeIdeContainer.classList.add('multi-iframe-child');
    }

    /**
     * Set the communication management between the current javascript and the iframe
     * @private
     * @returns {boolean} true in success, false otherwise
     */
    async _setIframeCommunication() {
        this._communicationManager = new CommunicationManager(this._iframe.contentWindow);
        const currentScriptElt = document.createElement('script');
        await new Promise((resolve, reject) => {
            try {
                currentScriptElt.addEventListener('load', () => { resolve(); });
                currentScriptElt.type = 'module';
                currentScriptElt.src = `${CDN_PATH}/openInterface/interfaces/assets/js/simulator/multi/MultiChildScripts.js`;
                this._iframeDocumentElt.head.appendChild(currentScriptElt);
            } catch(error) {
                reject(error);
                return false;
            }
        });
        return true;
    }

    /**
     * Set the iframe starting state by toggling the iframe simulator if necessary
     * @private
     */
    _setIframeStartingState() {
        this._setStartingCodeMode();
        if (typeof Simulator !== 'undefined' && Simulator.isOpen) this.toggleChildSimulator();
    }

    /**
     * Toggle the iframe simulator
     * @public
     * @returns {undefined} Early return case
     */
    toggleChildSimulator() {
        if (!this._communicationManager) return;
        this._communicationManager.sendEvent('toggleSimulator');
    }

    /**
     * Switch the iframe to block mode
     * @public
     * @returns {undefined} Early return case
     */
    switchChildBlockMode() {
        if (!this._communicationManager) return;
        this._communicationManager.sendEvent('switchBlockMode');
    }

    /**
     * Switch the iframe to mixed mode
     * @public
     * @returns {undefined} Early return case
     */
    switchChildMixedMode() {
        if (!this._communicationManager) return;
        this._communicationManager.sendEvent('switchMixedMode');
    }

    /**
     * Switch the iframe to code mode
     * @public
     * @returns {undefined} Early return case
     */
    switchChildCodeMode() {
        if (!this._communicationManager) return;
        this._communicationManager.sendEvent('switchCodeMode');
    }

    /**
     * Update the iframe accessibility state
     * @public
     * @param {object} jqueryFormElement - The accessibily jquery form element
     */
    updateWebsiteAccessibility(jqueryFormElement) {
        const replacedFormElement = {
            inputArray: jqueryFormElement.serializeArray()
        };
        this._communicationManager.sendEvent('updateWebsiteAccessibility', replacedFormElement);
    }

    /**
     * Switch the iframe code mode according to the current one
     * @private
     */
    _setStartingCodeMode() {
        const codeMode = Main.getCodeMode();
        switch (codeMode) {
            case 'block':
                this.switchChildBlockMode();
                break;
            case 'mixed':
                this.switchChildMixedMode();
                break;
            case 'code':
                this.switchChildCodeMode();
                break;
        }
    }

    /**
     * Set the localStorage listener to watch the changes from iframe localStorage
     * @private
     */
    _setIframeLocalStorageListener() {
        window.addEventListener("storage", (event) => {
            if (event.key !== `${INTERFACE_NAME}Projects`) return;
            const iframeProjectId = new URLSearchParams(this._iframe.contentWindow.location.search).get('localId');
            if (!iframeProjectId) return;
            const iframeProject = projectManager.localStorageManager.getLocalProjectContent(iframeProjectId);
            this._saveChildCurrentProject(iframeProject);
        });
    }

    /**
     * Save the iframe project in the current project options in localStorage
     * @private
     * @param {object} iframeProject - The project saved in localStorage within iframe
     * @returns {undefined} Early return case
     */
    _saveChildCurrentProject(iframeProject) {
        if (!this._isChildInterfaceProjectLoaded) return;
        if (iframeProject.codeText.includes(DEFAULT_CODE_START)) return;
        const currentProjectLS = projectManager.localStorageManager.getLocalProjectContent();
        if (!currentProjectLS.options) currentProjectLS.options = {};
        currentProjectLS.options.multiChildProject = iframeProject;
        projectManager.localStorageManager.setLocalProject(currentProjectLS);
        if (projectManager._capytaleManager && projectManager._capytaleManager.contentChanged) {
            projectManager._capytaleManager.contentChanged();
        }
    }

    /**
     * Save the child project from current project into it's own localStorage to be used by the iframe
     * @private
     * @param {string} localId - The iframe localId
     * @returns {undefined} Early return case
     */
    _setIframeStartingBlocksAndCode(localId) {
        const currentLS = projectManager.localStorageManager.getLocalProjectContent();
        if (!currentLS.options) return;
        const multiChildProject = currentLS.options.multiChildProject;
        if (!multiChildProject) return;
        projectManager.localStorageManager.setLocalProject(multiChildProject, localId);
    }

    /**
     * The the various iframe event listeners
     * @private
     */
    _setIframeMiscListeners() {
        this._communicationManager.addListener('interfaceProjectLoaded', () => {
            this._isChildInterfaceProjectLoaded = true;
        });
        document.querySelector('#multi-options').addEventListener('click', () => {
            pseudoModal.openModal('modal-duo-settings');
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#close-duo-btn')) return;
            this.closeDuo();
        });
    }

    /**
     * Set the iframe resize interactions
     * @private
     */
    _setIframeInteractions() {
        interact('#multi-iframe-wrapper')
        .resizable({
            edges: { left: '.resize-handle', right: false, top: false, bottom: false },
            listeners: {
                start: (event) => { // Prevent the iframe from capturing the move event
                    this._iframe.style.pointerEvents = 'none';
                },
                move: (event) => {
                    this._resizeIdeContent(event.rect.width);
                    this._iframe.style.transform = '';
                    this._iframe.setAttribute('data-x', 0);
                    this._iframe.setAttribute('data-y', 0);
                },
                end: (event) => {
                    this._iframe.style.pointerEvents = 'auto';
                }
            }
        })
    }

    /**
     * Add the duo parameter into the url query string
     * @private
     */
    _setMultiQueryParam() {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('duo', true);
        window.history.pushState({}, '', newUrl);
    }

    /**
     * Remove the duo parameter from the url query string
     * @private
     */
    _removeMultiQueryParam() {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('duo');
        window.history.pushState({}, '', newUrl);
    }

    /**
     * Hide the duo button and its related tooltip
     * @private
     */
    _hideMultiButton() {
        const multiBtnElt = document.querySelector('#simulator-multi-info');
        const multiBtnTooltipElt = document.querySelector('#simulator-multi-tooltip');
        if (multiBtnTooltipElt) multiBtnTooltipElt.style.display = 'none';
        if (multiBtnElt) multiBtnElt.style.display = 'none';
    }

    /**
     * Show the duo button
     * @private
     */
    _showMultiButton() {
        const multiBtnElt = document.querySelector('#simulator-multi-info');
        if (multiBtnElt) multiBtnElt.style.display = 'block';
    }

    /**
     * Resize the Iframe to its initial size (50%)
     * @private
     */
    _setInitialIframeSize() {
        const container = document.querySelector('#ide-content');
        const totalWidth = container.clientWidth;
        const newIframeWidth = totalWidth / 2;
        this._resizeIdeContent(newIframeWidth);
    }

    /**
     * Resize the iframe and all its siblings by providing the iframe width
     * @private
     * @param {number} iframeWidth - The iframe width
     */
    _resizeIdeContent(iframeWidth) {
        const container = document.querySelector('#ide-content');
        const simulator = document.querySelector('.ide-simulator');
        const base = document.querySelector('.ide-base');
        const totalWidth = container.clientWidth;
        this._iframe.style.width = `${iframeWidth}px`;
        const remainingWidth = totalWidth - iframeWidth;
        const simulatorVisible = simulator && getComputedStyle(simulator).display !== 'none';
        if (simulatorVisible) {
            const half = remainingWidth / 2;
            const simulatorWidth = half <= 500 ? half : 500;
            const baseWidth = remainingWidth - simulatorWidth;
            simulator.style.width = `${simulatorWidth}px`;
            base.style.width = `${baseWidth}px`;
        } else {
            simulator.style.width = `0px`;
            base.style.width = `${remainingWidth}px`;
        }
        Main.resizeWorkSpace();
    }

    /**
     * Close the duo mode by removing the iframe and reseting some parameters/elements
     * @public
     */
    closeDuo() {
        this._removeMultiQueryParam();
        this._iframeWrapper.remove();
        this._showMultiButton();
        document.querySelector('.ide-base').style.width = '100%';
        document.querySelector('.ide-simulator').style.width = '100%';
        Main.resizeWorkSpace();
        pseudoModal.closeLatestModal();
    }

    /**
     * Tell if the multi iframe is "running"
     * @public
     * @returns {boolean} true if the iframe is running, false otherwise
     */
    isIframe() {
        return this._iframe ? true : false;
    }

    /**
     * Remove the multi related options from localStorage
     * @public
     * @returns {undefined} Early return case
     */
    deleteMultiOptions() {
        const currentProjectLS = projectManager.localStorageManager.getLocalProjectContent();
        if (!currentProjectLS.options || !currentProjectLS.options.multiChildProject) return;
        delete currentProjectLS.options.multiChildProject;
        projectManager.localStorageManager.setLocalProject(currentProjectLS);
    }

    /**
     * Get the iframe localId
     * @private
     * @returns {string|boolean} The iframe localId or false if there is no iframe
     */
    _getIframeId() {
        if (!this._iframe) return false;
        const iframeUrl = this._iframe.src;
        return new URLSearchParams(iframeUrl).get('localId');
    }

    refreshIframeContent() {
        const iframeLocalId = this._getIframeId();
        if (!iframeLocalId) return false;
        let updatedProject = null;
        if (projectManager.getCurrentProject() && projectManager.getCurrentProject().options && projectManager.getCurrentProject().options.multiChildProject) {
            updatedProject = projectManager.getCurrentProject().options.multiChildProject;
        } else {
            updatedProject = {
                code: DEFAULT_XML_START[Blockly.Constants.getToolboxStyle()],
                codeText: DEFAULT_CODE_START,
                name: 'no name'
            };
        }
        this._communicationManager.sendEvent('setBlocksAndCode', updatedProject);
    }
}

window.multiManager = new MultiManager();