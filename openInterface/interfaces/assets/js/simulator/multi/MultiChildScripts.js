/**
 * The purpose of this class is to allow the communication between the current page as the child interface (in iframe) for Duo Mode
 */
import { CommunicationManager } from '/openInterface/interfaces/assets/js/simulator/multi/CommunicationManager.js';

class MultiChildScripts {
    constructor() {
        this._communicationManager = new CommunicationManager(window.parent);
        this.init();
    }

    /**
     * Setup all the event listeners for the Duo Mode communication
     * @public
     */
    init() {
        window.isMultiChild = true;
        this._communicationManager.addListener('toggleSimulator', () => {
            this._triggerFunctionWhenAvailable(() => window.toggleSimulator);
        });
        this._communicationManager.addListener('switchBlockMode', () => {
            this._triggerFunctionWhenAvailable(() => window.switchBlockMode);
        });
        this._communicationManager.addListener('switchMixedMode', () => {
            this._triggerFunctionWhenAvailable(() => window.switchMixedMode);
        });
        this._communicationManager.addListener('switchCodeMode', () => {
            this._triggerFunctionWhenAvailable(() => window.switchCodeMode);
        });
        this._communicationManager.addListener('updateWebsiteAccessibility', (formEvent) => {
            formEvent.serializeArray = function() {
                return this.inputArray;
            }
            updateWebsiteAcessibility(formEvent);
        });
        this._communicationManager.addListener('setBlocksAndCode', async (project) => {
            this._setBlocksAndCode(project);
            return true;
        });
        this._awaitInterfaceProjectLoaded();
    }

    /**
     * Execute the provided function after waiting for it to be defined
     * @private
     * @param {function} getFunctionToTrigger - The function to be executed
     * @returns {Promise} Resolve a soon as the provided function has been executed
     */
    async _triggerFunctionWhenAvailable(getFunctionToTrigger) {
        let functionToTrigger;
        while ((functionToTrigger = getFunctionToTrigger()) === undefined) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        functionToTrigger();
        return true;
    }

    /**
     * Inject a project in blockly/ace workspaces
     * @private
     * @param {object} project - The project to be injected in blockly/ace workspaces
     * @returns {Promise} - Resolve true in success, false otherwise
     */
    async _setBlocksAndCode(project) {
        if (typeof projectManager === 'undefined' || !projectManager) return false;
        projectManager._projectLoader_setCurrentProject(project);
        await projectManager._projectLoader_updateAndRefreshDOM();
        return true;
    }

    /**
     * Await the project to be fully loaded
     * @private
     * @returns {Promise} - When the project has been fully loaded
     */
    async _awaitInterfaceProjectLoaded() {
        if (typeof projectManager === 'undefined' || !projectManager || !projectManager.getIsLoadedProject()) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            await this._awaitInterfaceProjectLoaded();
        }
        this._communicationManager.sendEvent('interfaceProjectLoaded');
        return true;
    }
}

window.multiChildScripts = new MultiChildScripts();