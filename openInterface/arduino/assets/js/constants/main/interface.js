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
        <label for="board_mega_Share" class="switcher__label">Arduino Méga</label>
        <!--
        <input type="radio" name="shareOptionsBoard" value="unor4wifi" id="board_unor4wifi_Share" class="switcher__input switcher__input--right">
        <label for="board_unor4wifi_Share" class="switcher__label">Arduino R4 WiFi</label>
        -->
        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const specific_toolboxToggler = toolboxToggler;
