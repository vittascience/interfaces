// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
// settings modal: only the Vittascience toolbox
const specific_toolboxToggler = () => '';
const specific_boardSelector = function () {
    return `<div class="ide-modal-section mt-3">
        <h5>${jsonPath('modals.standard.settings.content.board.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.board.notice')}</p>
        <button type="button" class="btn v-btn board-choice-select-btn" onclick="VittaInterface.openBoardSelector();">
            ${jsonPath('modals.board-selector.buttons.setting')}
        </button>
    </div>`;
};
