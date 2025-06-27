// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
const specific_toolboxInterfaceOption = toolboxInterfaceOption;
// settings modal
const specific_toolboxToggler = function () {
    return `<div class="ide-modal-section">
        <h5>${jsonPath('modals.standard.settings.content.toolbox.title')}</h5>
        <p class="mb-1">${jsonPath('modals.standard.settings.content.toolbox.notice')}</p>
        <div class="d-flex">
            <div class="switcher">

                <input type="radio" name="toolboxMode" value="vittascience" id="toolboxModeVittascience" class="switcher__input switcher__input--yin" checked="">
                <label for="toolboxModeVittascience" class="switcher__label" >Vittascience</label>
                   
                <input type="radio" name="toolboxMode" value="scratch" id="toolboxModeScratch" class="switcher__input switcher__input--middle1">
                <label for="toolboxModeScratch" class="switcher__label" >Scratch</label>

                <span class="switcher__toggle"></span>
            </div>
        </div>
        <p class="mb-1 mt-1 hidden-capytale"><i class="fa fa-exclamation-circle"></i> ${jsonPath('modals.standard.settings.content.toolbox.texas')} <a href=\"${window.location.origin + "/TI-83/"}\">${jsonPath('modals.standard.settings.content.toolbox.ti-83')}</a></p>
    </div>`;
};