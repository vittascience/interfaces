// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
const specific_toolboxInterfaceOption = toolboxInterfaceOption;
const specific_boardInterfaceOption =
`<div id="modal-share-options-board" class="flex-column" style="display:flex;">
    <span class="text-center" data-i18n="modals.standard.share.content.options.board.title">Carte</span>
    <div class="switcher">

        <input type="radio" name="shareOptionsBoard" value="uno" id="board_uno_Share" class="switcher__input switcher__input--yin" checked>
        <label for="board_uno_Share" class="switcher__label">Arduino UNO</label>

        <input type="radio" name="shareOptionsBoard" value="nano" id="board_nano_Share" class="switcher__input switcher__input--middle1">
        <label for="board_nano_Share" class="switcher__label">Arduino Nano</label>

        <input type="radio" name="shareOptionsBoard" value="mega" id="board_mega_Share" class="switcher__input switcher__input--middle2">
        <label for="board_mega_Share" class="switcher__label">Arduino Mega</label>
        <!--
        <input type="radio" name="shareOptionsBoard" value="unor4wifi" id="board_unor4wifi_Share" class="switcher__input switcher__input--right">
        <label for="board_unor4wifi_Share" class="switcher__label">Arduino R4 WiFi</label>
        -->
        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const specific_toolboxToggler = toolboxToggler;
const specific_boardSelector = function () {
    return `<div class="ide-modal-section mt-3">
        <h5>${jsonPath('modals.standard.settings.content.board.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.board.notice')}</p>
        <button type="button" class="btn v-btn board-choice-select-btn" onclick="VittaInterface.openBoardSelector();">
            ${jsonPath('modals.board-selector.buttons.setting')}
        </button>
    </div>`;
};
