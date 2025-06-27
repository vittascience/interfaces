// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
const specific_toolboxInterfaceOption = toolboxInterfaceOption;
const specific_boardInterfaceOption = 
`<div id="modal-share-options-board" class="flex-column" style="display:flex;">
    <span class="text-center" data-i18n="modals.standard.share.content.options.board.title">Carte</span>
    <div class="switcher">

        <input type="radio" name="boardSelector" value="basic-pico" id="board_basic-pico_Share" class="switcher__input switcher__input--yin" checked>
        <label for="board_basic-pico_Share" class="switcher__label">Raspberry Pi Pico</label>

        <input type="radio" name="boardSelector" value="shield-grove" id="board_shield-grove_Share" class="switcher__input switcher__input--right">
        <label for="board_shield-grove_Share" class="switcher__label">Shield Grove</label>

        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const specific_toolboxToggler = toolboxToggler;
const specific_boardSelector = function () {
    return `<div class="ide-modal-section" style="margin-top: 10px;">
        <h5>${jsonPath('modals.standard.settings.content.board.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.board.notice')}</p>
        <div class="d-flex">
            <div class="switcher">

                <input type="radio" name="boardSelector" value="basic-pico" id="board_basic-pico_Set" class="switcher__input switcher__input--yin" checked>
                <label for="board_basic-pico_Set" class="switcher__label">Raspberry Pi Pico</label>
            
                <input type="radio" name="boardSelector" value="shield-grove" id="board_shield-grove_Set" class="switcher__input switcher__input--right">
                <label for="board_shield-grove_Set" class="switcher__label">Shield Grove</label>

                <span class="switcher__toggle"></span>
            </div>
        </div>
    </div>`;
};