// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
const specific_toolboxInterfaceOption = toolboxInterfaceOption;
const specific_boardInterfaceOption = 
`<div id="modal-share-options-board" class="d-flex flex-column">
    <span class="text-center" data-i18n="modals.standard.share.content.options.board.title">Carte</span>
    <div class="switcher">

        <input type="radio" name="shareOptionsBoard" value="wemos-d1r32" id="board_wemos-d1r32_Share" class="switcher__input switcher__input--yin">
        <label for="board_wemos-d1r32_Share" class="switcher__label">Wemos D1R32</label>

        <input type="radio" name="shareOptionsBoard" value="edu-esp32" id="board_edu-esp32_Share" class="switcher__input switcher__input--middle1" checked>
        <label for="board_edu-esp32_Share" class="switcher__label">EDU ESP32</label>

        <input type="radio" name="shareOptionsBoard" value="shield-grove" id="board_shield-grove_Share" class="switcher__input switcher__input--middle2">
        <label for="board_shield-grove_Share" class="switcher__label">Shield Grove</label>

        <input type="radio" name="shareOptionsBoard" value="shield-grove-edu-esp32" id="board_shield-grove-edu-esp32_Share" class="switcher__input switcher__input--middle3">
        <label for="board_shield-grove-edu-esp32_Share" class="switcher__label">Shield Grove EDU ESP32</label>

        <input type="radio" name="shareOptionsBoard" value="basic-esp32" id="board_basic-esp32_Share" class="switcher__input switcher__input--right">
        <label for="board_basic-esp32_Share" class="switcher__label">ESP32 WROOM-32D</label>

        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const specific_toolboxToggler = toolboxToggler;
const specific_boardSelector = function () {
    return `<div class="ide-modal-section mt-3">
        <h5>${jsonPath('modals.standard.settings.content.board.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.board.notice')}</p>
        <div class="d-flex">
            <div class="switcher">

                <input type="radio" name="boardSelector" value="wemos-d1r32" id="board_wemos-d1r32_Set" class="switcher__input switcher__input--yin">
                <label for="board_wemos-d1r32_Set" class="switcher__label esp32-switcher">Wemos D1R32</label>

                <input type="radio" name="boardSelector" value="edu-esp32" id="board_edu-esp32_Set" class="switcher__input switcher__input--middle1" checked>
                <label for="board_edu-esp32_Set" class="switcher__label esp32-switcher">EDU ESP32</label>

                <input type="radio" name="boardSelector" value="shield-grove" id="board_shield-grove_Set" class="switcher__input switcher__input--middle2">
                <label for="board_shield-grove_Set" class="switcher__label esp32-switcher">Shield Grove</label>

                <input type="radio" name="boardSelector" value="shield-grove-edu-esp32" id="board_shield-grove-edu-esp32_Set" class="switcher__input switcher__input--middle3">
                <label for="board_shield-grove-edu-esp32_Set" class="switcher__label esp32-switcher">Shield Grove EDU</label>

                <input type="radio" name="boardSelector" value="basic-esp32" id="board_basic-esp32_Set" class="switcher__input switcher__input--right">
                <label for="board_basic-esp32_Set" class="switcher__label esp32-switcher">ESP32 WROOM-32D</label>

                <span class="switcher__toggle esp32-switcher esp32-switcher-toggle"></span>
            </div>
        </div>
    </div>`;
};